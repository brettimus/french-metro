/**
 * Fact checker: ranks station claims by risk of being wrong.
 *
 * Usage:
 *   bun apps/web/scripts/facts/run.ts [--line X] [--limit N] [--out dir] [--concurrency 16] [--top 80]
 *     [--refresh] [--dry-run]
 *
 *   --line X        only one line
 *   --limit N       first N claim pairs (an EN/FR sentence group)
 *   --out dir       output directory (default apps/web/scripts/facts/out); writes results.json and ranked.md
 *   --concurrency   parallel Jev requests (default 16); source fetches always use 4
 *   --top N         pairs listed in detail in ranked.md (default 80); all pairs get a compact line
 *   --refresh       refetch sources instead of reading cache/
 *   --dry-run       sources, retrieval and number checks only; no Jev calls (cached Jev answers are still used)
 *
 * Steps: fetch sources (sources.ts) → split claims (claims.ts) → retrieve 5 passages per claim (retrieve.ts) →
 * number/date checks in code (numbers.ts) → two Jev requests per claim, one on the passages and one on the whole
 * station sources, blended (jev.ts) → risk and ranking (rank.ts, ranker facts-3).
 * Reads TYPESAFE_API_KEY from the environment or the repo-root .env.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { buildClaims, type Claim } from "./claims";
import { askJev, askJevWholeSource, blendAnswers, fieldLabel, loadApiKey, makeClient, MODEL, QUESTION_VERSION, wholeSourceState, type JevAnswer, type JevState } from "./jev";
import { buildNumberIndex, extractNumbers, matchFact, type NumberIndex } from "./numbers";
import { claimRisk, RANKER_VERSION, rankPairs, RISK_WEIGHTS, round, staleConflicts, type ClaimRow, type ExcludedPair, type PairRow } from "./rank";
import { Bm25Index, buildQuery, chunkText, cleanSourceText, type Passage } from "./retrieve";
import { failureKind, fetchAll, mapPool, stationRefs, stationUrls, type SourceDoc, type UrlRole } from "./sources";
import { tokenize } from "./text";

export const TOP_PASSAGES = 5;
export const STATION_NAME_WEIGHT = 0.3;
/** Weight of the preceding sentence's words in the query (helps "This attribution is not certain."). */
export const PREVIOUS_WEIGHT = 0.3;

const NO_PASSAGES = "no passages retrieved";

type Args = { line?: string; limit?: number; out: string; concurrency: number; top: number; refresh: boolean; dryRun: boolean };

function parseArgs(argv: string[]): Args {
  const get = (name: string) => {
    const i = argv.indexOf(`--${name}`);
    if (i < 0) return undefined;
    const v = argv[i + 1];
    if (v === undefined || v.startsWith("--")) throw new Error(`--${name} needs a value`);
    return v;
  };
  const num = (name: string) => {
    const v = get(name);
    if (v === undefined) return undefined;
    const n = Number(v);
    if (!Number.isInteger(n) || n < 1) throw new Error(`--${name} must be a positive integer`);
    return n;
  };
  if (argv.includes("--help") || argv.includes("-h")) {
    console.log(readFileSync(import.meta.path, "utf8").split("*/")[0]);
    process.exit(0);
  }
  return {
    line: get("line"),
    limit: num("limit"),
    out: resolve(get("out") ?? join(import.meta.dir, "out")),
    concurrency: num("concurrency") ?? 16,
    top: num("top") ?? 80,
    refresh: argv.includes("--refresh"),
    dryRun: argv.includes("--dry-run"),
  };
}

const sourceLabel = (d: SourceDoc) => `${new URL(d.url).host}${d.title ? `: ${d.title}` : ""}`;
const fmt = (x: number | undefined) => (x === undefined ? "–" : x.toFixed(2));
const oneLine = (s: string) => s.replace(/\s+/g, " ").replace(/\|/g, "\\|");

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const t0 = performance.now();

  // 1. Claims.
  let claims = buildClaims({ line: args.line });
  if (args.limit !== undefined) {
    const keep = new Set([...new Set(claims.map((c) => c.pairKey))].slice(0, args.limit));
    claims = claims.filter((c) => keep.has(c.pairKey));
  }
  const stationKey = (lineId: string, stationId: string) => `${lineId}/${stationId}`;
  const wanted = new Set(claims.map((c) => stationKey(c.lineId, c.stationId)));
  const refs = stationRefs(args.line).filter((r) => wanted.has(stationKey(r.lineId, r.station.id)));

  // 2. Sources.
  const urlRoles = new Map(refs.map((r) => [stationKey(r.lineId, r.station.id), stationUrls(r.station)]));
  const allUrls = [...urlRoles.values()].flat().map((u) => u.url);
  const tFetch = performance.now();
  const docs = await fetchAll(allUrls, { refresh: args.refresh, concurrency: 4, log: true });
  const fetchMs = performance.now() - tFetch;

  // 3. Passages, one BM25 index over all passages of the run; candidates are each station's own passages.
  const passagesByUrl = new Map<string, Passage[]>();
  for (const d of docs.values()) {
    if (d.status !== "ok") continue;
    passagesByUrl.set(
      d.url,
      chunkText(cleanSourceText(d.text)).map((text, k) => ({ key: `${d.url}#${k}`, url: d.url, text, tokens: tokenize(text) })),
    );
  }
  const index = new Bm25Index([...passagesByUrl.values()].flat());
  const stationInfo = new Map<
    string,
    { passages: Passage[]; sources: { source: string; text: string }[]; numbers: NumberIndex; fetchFailure: number; failures: { url: string; role: UrlRole }[] }
  >();
  for (const [key, urls] of urlRoles) {
    const ok = urls.filter((u) => docs.get(u.url)?.status === "ok");
    const failures = urls.filter((u) => docs.get(u.url)?.status !== "ok");
    stationInfo.set(key, {
      passages: ok.flatMap((u) => passagesByUrl.get(u.url) ?? []),
      sources: ok.map((u) => ({ source: sourceLabel(docs.get(u.url)!), text: cleanSourceText(docs.get(u.url)!.text) })),
      numbers: buildNumberIndex(ok.map((u) => cleanSourceText(docs.get(u.url)!.text))),
      fetchFailure: failures.some((f) => f.role === "source") ? 1 : failures.length ? 0.5 : 0,
      failures,
    });
  }

  // 4. Retrieval, number checks and Jev state per claim.
  type Prepared = { claim: Claim; state: JevState; whole?: JevState; numbers: ClaimRow["numbers"]; passages: ClaimRow["passages"]; fetchFailure: number };
  const prepared: Prepared[] = claims.map((claim) => {
    const info = stationInfo.get(stationKey(claim.lineId, claim.stationId))!;
    const query = buildQuery([
      { text: claim.text, weight: 1 },
      { text: claim.counterpart, weight: claim.locale === "en" ? 1 : 0.5 },
      { text: claim.previous ?? "", weight: PREVIOUS_WEIGHT },
    ]);
    // Station-name words occur in nearly every passage of the station's own article, so they count less.
    for (const t of tokenize(claim.stationName)) if (query.has(t)) query.set(t, query.get(t)! * STATION_NAME_WEIGHT);
    const top = index.top(query, info.passages, TOP_PASSAGES);
    const passages = top.map((t, i) => ({ id: `p${i + 1}`, url: t.passage.url, score: round(t.score, 2), text: t.passage.text }));
    const seen = new Set<string>();
    const numbers = extractNumbers(claim.text)
      .filter((f) => (seen.has(f.key) ? false : (seen.add(f.key), true)))
      .map((f) => matchFact(f, info.numbers));
    const state: JevState = {
      claim: claim.text,
      ...(claim.previous ? { previous_sentence: claim.previous } : {}),
      station: claim.stationName,
      field: fieldLabel(claim.field),
      passages: passages.map((p) => ({ id: p.id, source: sourceLabel(docs.get(p.url)!), text: p.text })),
    };
    return { claim, state, whole: wholeSourceState(state, info.sources), numbers, passages, fetchFailure: info.fetchFailure };
  });

  // 5. Jev.
  const apiKey = args.dryRun ? undefined : loadApiKey();
  if (!args.dryRun && !apiKey) throw new Error("TYPESAFE_API_KEY is not set (environment or repo-root .env); use --dry-run to skip Jev");
  const client = apiKey ? makeClient(apiKey) : undefined;
  const tJev = performance.now();
  let done = 0;
  // A claim with no retrieved passage gets no Jev request at all.
  const raw = await mapPool(prepared, args.concurrency, async (p): Promise<{ passage: JevAnswer; whole?: JevAnswer }> => {
    const a = p.passages.length
      ? { passage: await askJev(client, p.state), whole: p.whole ? await askJevWholeSource(client, p.whole) : undefined }
      : { passage: { ms: 0, cached: false, error: NO_PASSAGES } };
    done++;
    if (done % 100 === 0 || done === prepared.length) process.stderr.write(`\rjev ${done}/${prepared.length}`);
    return a;
  });
  const answers = raw.map((r) => blendAnswers(r.passage, r.whole));
  const requests = raw.flatMap((r) => [r.passage, ...(r.whole ? [r.whole] : [])]);
  const wholeAnswers = raw.flatMap((r) => (r.whole ? [r.whole] : []));
  process.stderr.write("\n");
  const jevMs = performance.now() - tJev;

  // 6. Risk and ranking.
  const rows: ClaimRow[] = prepared.map((p, i) => {
    const base = { ...p.claim, numbers: p.numbers, unmatched: p.numbers.filter((m) => !m.matched), passages: p.passages, jev: answers[i]!, fetchFailure: p.fetchFailure };
    const { risk, parts } = claimRisk(base);
    return { ...base, risk, riskParts: parts };
  });
  const { pairs, excluded } = rankPairs(rows);
  // With --line or --limit, entries for other stations are expected not to match.
  const stale = args.line || args.limit ? [] : staleConflicts(excluded);

  // Stats.
  const live = requests.filter((a) => !a.cached && !a.error);
  const usage = requests.reduce((s, a) => ({ input: s.input + (a.usage?.input_tokens ?? 0), output: s.output + (a.usage?.output_tokens ?? 0) }), { input: 0, output: 0 });
  const liveUsage = live.reduce((s, a) => s + (a.usage?.input_tokens ?? 0), 0);
  const failures = [...docs.values()].filter((d) => d.status !== "ok").map((d) => ({ kind: failureKind(d), httpStatus: d.httpStatus, url: d.url, error: d.error, stations: [...urlRoles].filter(([, us]) => us.some((u) => u.url === d.url)).map(([k, us]) => `${k} (${us.find((u) => u.url === d.url)!.role})`) }));
  const redirects = [...docs.values()].filter((d) => d.redirectedTo).map((d) => ({ url: d.url, redirectedTo: d.redirectedTo }));
  const jevRows = rows.filter((r) => r.jev.supported !== undefined);
  const bucket = (xs: number[]) => {
    const edges = [0, 0.2, 0.5, 0.8, 1.0001];
    return Object.fromEntries(edges.slice(0, -1).map((lo, i) => [`${lo}–${Math.min(1, edges[i + 1]!).toFixed(1)}`, xs.filter((x) => x >= lo && x < edges[i + 1]!).length]));
  };
  const stats = {
    model: MODEL,
    questionVersion: QUESTION_VERSION,
    ranker: RANKER_VERSION,
    generatedAt: new Date().toISOString(),
    args: { ...args, out: undefined },
    claims: rows.length,
    pairs: pairs.length,
    stations: refs.length,
    urls: docs.size,
    requests: {
      total: requests.filter((a) => a.error !== NO_PASSAGES).length,
      live: live.length,
      cached: requests.filter((a) => a.cached).length,
      errors: requests.filter((a) => a.error && a.error !== NO_PASSAGES).length,
      skippedNoPassages: requests.filter((a) => a.error === NO_PASSAGES).length,
      wholeSource: wholeAnswers.length,
      wholeSourceErrors: wholeAnswers.filter((a) => a.error).length,
    },
    tokens: { input: usage.input, output: usage.output, liveInput: liveUsage },
    timeSeconds: { total: round((performance.now() - t0) / 1000, 1), fetch: round(fetchMs / 1000, 1), jev: round(jevMs / 1000, 1) },
    distribution: {
      supported: bucket(jevRows.map((r) => r.jev.supported!)),
      contradicted: bucket(jevRows.map((r) => r.jev.contradicted ?? 0)),
      bestPassageNone: jevRows.filter((r) => r.jev.bestPassage === "none").length,
      claimsWithUnmatchedNumbers: rows.filter((r) => r.unmatched.length).length,
      unmatchedNumbers: rows.reduce((s, r) => s + r.unmatched.length, 0),
      numbersChecked: rows.reduce((s, r) => s + r.numbers.length, 0),
    },
    fetchFailures: failures,
    redirects,
    knownConflicts: { excluded: excluded.map((p) => p.pairKey), stale: stale.map((k) => `${k.lineId}/${k.stationId}/${k.field}: ${k.contains[0]}`) },
  };

  mkdirSync(args.out, { recursive: true });
  writeFileSync(join(args.out, "results.json"), JSON.stringify({ stats, weights: RISK_WEIGHTS, pairs, excluded }, null, 1));
  writeFileSync(join(args.out, "ranked.md"), renderMarkdown(stats, pairs, excluded, args.top));
  console.log(JSON.stringify({ ...stats, fetchFailures: failures.length, redirects: redirects.length }, null, 1));
  if (stale.length) console.warn(`known conflicts that matched no claim (check known-conflicts.ts): ${stale.length}`);
  console.log(`wrote ${join(args.out, "results.json")} and ranked.md`);
}

/** Compact line per pair: rank | id | risk | supported | contradicted | unmatched | EN text | URLs. */
export function compactLine(rank: number, p: PairRow): string {
  const lead = [...p.en, ...p.fr].sort((a, b) => b.risk - a.risk)[0]!;
  const text = (p.en.length ? p.en : p.fr).map((c) => c.text).join(" ");
  const ids = [...p.en, ...p.fr].map((c) => c.id);
  const show = (xs: ClaimRow[], f: (r: ClaimRow) => number | undefined) => xs.map((r) => fmt(f(r))).join("+") || "–";
  const sup = `en ${show(p.en, (r) => r.jev.supported)} fr ${show(p.fr, (r) => r.jev.supported)}`;
  const con = `en ${show(p.en, (r) => r.jev.contradicted)} fr ${show(p.fr, (r) => r.jev.contradicted)}`;
  const unmatched = [...new Set([...p.en, ...p.fr].flatMap((r) => r.unmatched.map((m) => `${r.locale}:${m.fact.raw.trim()}${m.note ? ` (${m.note})` : ""}`)))].join(", ") || "–";
  const urls = [...new Set([...p.en, ...p.fr].flatMap((r) => r.passages.filter((x) => x.id === r.jev.bestPassage).map((x) => x.url)))];
  const fallback = [...new Set(lead.passages.map((x) => x.url))];
  return `${rank} | ${ids.length > 2 ? p.pairKey : lead.id} | ${p.risk.toFixed(2)} | ${sup} | ${con} | ${unmatched} | ${oneLine(text)} | ${(urls.length ? urls : fallback).join(" ") || "no passages"}`;
}

function renderMarkdown(stats: Record<string, any>, pairs: PairRow[], excluded: ExcludedPair[], top: number): string {
  const out: string[] = [];
  out.push(`# Station fact check: claims ranked by risk`, "");
  out.push(`Model ${stats.model}, questions ${stats.questionVersion}, ranker ${stats.ranker}, ${stats.generatedAt}.`, "");
  out.push(`- Claims: ${stats.claims} (${stats.pairs} EN/FR pairs, ${stats.stations} station entries)`);
  out.push(`- Jev requests: ${stats.requests.total} (${stats.requests.live} live, ${stats.requests.cached} cached, ${stats.requests.errors} errors, ${stats.requests.skippedNoPassages} claims skipped with no passages)`);
  out.push(`- Whole-source requests: ${stats.requests.wholeSource} (${stats.requests.wholeSourceErrors} errors; those claims use the passage answer only)`);
  out.push(`- Tokens: ${stats.tokens.input} input (${stats.tokens.liveInput} live), ${stats.tokens.output} output`);
  out.push(`- Time: ${stats.timeSeconds.total}s (fetch ${stats.timeSeconds.fetch}s, Jev ${stats.timeSeconds.jev}s)`);
  out.push(`- Numbers checked in code: ${stats.distribution.numbersChecked}; unmatched ${stats.distribution.unmatchedNumbers} in ${stats.distribution.claimsWithUnmatchedNumbers} claims`, "");
  out.push(`## Distribution`, "", `| Range | supported | contradicted |`, `|---|---|---|`);
  for (const k of Object.keys(stats.distribution.supported)) out.push(`| ${k} | ${stats.distribution.supported[k]} | ${stats.distribution.contradicted[k]} |`);
  out.push("", `best_passage = none: ${stats.distribution.bestPassageNone}`, "");
  out.push(`## Fetch failures (${stats.fetchFailures.length})`, "", `| Kind | HTTP | URL | Stations | Error |`, `|---|---|---|---|---|`);
  for (const f of stats.fetchFailures) out.push(`| ${f.kind} | ${f.httpStatus} | ${f.url} | ${f.stations.join(", ")} | ${oneLine(f.error ?? "")} |`);
  out.push("", "`blocked` means the server refused the script (401/403/503); check those links in a browser.", "");
  if (stats.redirects.length) {
    out.push(`## Wikipedia redirects (${stats.redirects.length})`, "", "The cited title redirects to another article; check that it is the intended page.", "");
    for (const r of stats.redirects) out.push(`- ${r.url} → ${r.redirectedTo}`);
    out.push("");
  }
  out.push(`## Weights`, "", "```json", JSON.stringify(RISK_WEIGHTS, null, 2), "```", "");
  out.push(`## Known conflicts, left out of the ranking (${excluded.length})`, "", "These claims keep a value that a cited source contradicts, on purpose. See known-conflicts.ts.", "");
  for (const p of excluded) {
    out.push(`- **${p.pairKey}** (risk ${p.risk.toFixed(2)}): ${oneLine((p.en.length ? p.en : p.fr).map((c) => c.text).join(" "))}`);
    out.push(`  Note: ${p.conflict.note} (${p.conflict.ref})`);
  }
  if (stats.knownConflicts.stale.length) out.push("", `Entries that matched no claim (the claim changed; check the entry): ${stats.knownConflicts.stale.join("; ")}`);
  out.push("");
  out.push(`## Top ${Math.min(top, pairs.length)} pairs`, "");
  pairs.slice(0, top).forEach((p, i) => {
    out.push(`### ${i + 1}. ${p.pairKey} (risk ${p.risk.toFixed(2)}${p.disagreement >= 0.15 ? `, EN/FR differ by ${p.disagreement.toFixed(2)}` : ""})`, "");
    out.push(`Risk parts: ${Object.entries(p.riskParts).map(([k, v]) => `${k} ${v.toFixed(2)}`).join(", ") || "none"}`, "");
    for (const r of [...p.en, ...p.fr]) {
      const blend = r.jev.passageSupported !== undefined || r.jev.wholeSupported !== undefined ? ` (passages ${fmt(r.jev.passageSupported)}, whole sources ${r.jev.wholeError ? "error" : fmt(r.jev.wholeSupported)})` : "";
      out.push(`- **${r.id}** risk ${r.risk.toFixed(2)} · supported ${fmt(r.jev.supported)}${blend} · contradicted ${fmt(r.jev.contradicted)} · best ${r.jev.bestPassage ?? "–"}${r.jev.error ? ` · error: ${r.jev.error}` : ""}`);
      out.push(`  ${r.text}`);
      if (r.unmatched.length) out.push(`  Unmatched: ${r.unmatched.map((m) => `${m.fact.raw.trim()} [${m.fact.key}]${m.note ? ` (${m.note})` : ""}`).join(", ")}`);
      const best = r.passages.find((x) => x.id === r.jev.bestPassage);
      if (best) out.push(`  Best passage (${best.url}): ${oneLine(best.text).slice(0, 400)}${best.text.length > 400 ? "…" : ""}`);
    }
    out.push("");
  });
  out.push(`## All pairs (compact)`, "", "rank | claim id | risk | supported | contradicted | unmatched numbers | claim text (EN) | source URL(s)", "");
  pairs.forEach((p, i) => out.push(compactLine(i + 1, p)));
  out.push("");
  return out.join("\n");
}

if (import.meta.main) await main();

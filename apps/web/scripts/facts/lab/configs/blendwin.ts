/**
 * blendwin: blendsrc, but when the whole station sources are longer than MAX_TOTAL characters (the states that
 * failed with max_tokens_exceeded), each long source is cut to windows of WINDOW characters on each side of the
 * retrieved passages from that source (head of the source when no passage comes from it), so that these claims
 * also get a whole-source answer. Shorter states are unchanged (cached answers).
 * Hypothesis: the 20 claims without a whole-source answer lose the blendsrc gain; windows give them most of it.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { jevCacheOptions, jevRequest, toJevAnswer, type JevAnswer, type JevState } from "../../jev";
import { claimRisk, rankPairs, FACTS2_RISK_WEIGHTS, type ClaimRow } from "../../rank";
import { cleanSourceText } from "../../retrieve";
import { cachePath, type SourceDoc } from "../../sources";
import { stateFor, stationKey, type Dataset, type DatasetClaim, type DatasetItem } from "../build-dataset";
import type { LabConfig } from "../config";

const NO_PASSAGES: JevAnswer = { ms: 0, cached: false, error: "no passages retrieved" };
const sha1 = (s: string) => createHash("sha1").update(s).digest("hex");

const docCache = new Map<string, string>();
function sourceText(ds: Dataset, url: string): string | undefined {
  const meta = ds.sources[url];
  if (!meta || meta.status !== "ok") return undefined;
  let clean = docCache.get(url);
  if (clean === undefined) {
    const doc = JSON.parse(readFileSync(cachePath(url), "utf8")) as SourceDoc;
    clean = cleanSourceText(doc.text);
    if (sha1(clean) !== meta.textSha1) throw new Error(`source text for ${url} changed since dataset.json was built`);
    docCache.set(url, clean);
  }
  return clean;
}

const MAX_TOTAL = 115_000;
const BUDGET = 90_000;
const WINDOW = 4_000;

/** Start offset of a retrieved passage in the clean source text (passages join sentences with single spaces). */
function findPassage(text: string, passage: string): number {
  for (const len of [80, 40]) {
    const i = text.indexOf(passage.slice(0, len));
    if (i >= 0) return i;
  }
  const flat = text.replace(/\s/g, " ");
  return flat.indexOf(passage.slice(0, 40).replace(/\s/g, " "));
}

/** Cut `text` to windows around the retrieved passages from `url`, merged, at most `limit` characters. */
function windowed(ds: Dataset, claim: DatasetClaim, url: string, text: string, limit: number): string {
  const spans: [number, number][] = [];
  for (const p of claim.passages) {
    const ref = ds.passages[p.ref]!;
    if (ref.url !== url) continue;
    const i = findPassage(text, ref.text);
    if (i < 0) continue;
    spans.push([Math.max(0, i - WINDOW), Math.min(text.length, i + ref.text.length + WINDOW)]);
  }
  if (!spans.length) return text.slice(0, limit);
  spans.sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [];
  for (const s of spans) {
    const last = merged[merged.length - 1];
    if (last && s[0] <= last[1]) last[1] = Math.max(last[1], s[1]);
    else merged.push([...s]);
  }
  return merged.map(([a, b]) => text.slice(a, b)).join("\n[…]\n").slice(0, limit);
}

function wholeState(ds: Dataset, item: DatasetItem, claim: DatasetClaim): JevState | undefined {
  const station = ds.stations[stationKey(item.pass as 1 | 2, item.lineId, item.stationId)]!;
  const base = stateFor(ds, item, claim);
  const passages: JevState["passages"] = [];
  const texts = station.urls.map(({ url }) => ({ url, text: sourceText(ds, url) }));
  const total = texts.reduce((n, t) => n + (t.text?.length ?? 0), 0);
  const ok = texts.filter((t) => t.text).length;
  for (const { url, text: full } of texts) {
    if (!full) continue;
    const share = Math.floor(BUDGET / ok);
    const text = total > MAX_TOTAL && full.length > share ? windowed(ds, claim, url, full, share) : full;
    const title = ds.sources[url]?.title;
    passages.push({ id: `s${passages.length + 1}`, source: `${new URL(url).host}${title ? `: ${title}` : ""}`, text });
  }
  return passages.length ? { ...base, passages } : undefined;
}

const config: LabConfig = {
  name: "blendwin",
  description: "blendsrc with long sources cut to windows around the retrieved passages",
  requests({ ds, item, claim }) {
    if (!claim.passages.length) return [];
    const reqs = [];
    const passageState = stateFor(ds, item, claim);
    const { dir: _d0, ...passageCache } = jevCacheOptions(passageState);
    reqs.push({ req: jevRequest(passageState), cache: passageCache });
    const whole = wholeState(ds, item, claim);
    if (whole) reqs.push({ req: jevRequest(whole) });
    return reqs;
  },
  score({ ds, item, station, claims }) {
    const rows = claims.map(({ claim, results }) => {
      const passageAnswer = results[0] ? toJevAnswer(results[0]) : NO_PASSAGES;
      const wholeAnswer = results[1] ? toJevAnswer(results[1]) : undefined;
      const wholeOk = wholeAnswer && !wholeAnswer.error && wholeAnswer.supported !== undefined;
      const jev: JevAnswer =
        wholeOk && passageAnswer.supported !== undefined && !passageAnswer.error
          ? { ...passageAnswer, supported: (passageAnswer.supported + wholeAnswer.supported!) / 2 }
          : wholeOk && (passageAnswer.error || passageAnswer.supported === undefined)
            ? wholeAnswer
            : passageAnswer;
      const passages = claim.passages.map((p) => ({ id: p.id, score: p.score, ...ds.passages[p.ref]! }));
      const { risk, parts } = claimRisk({ unmatched: claim.numbers.filter((m) => !m.matched), passages, jev, fetchFailure: station.fetchFailure }, FACTS2_RISK_WEIGHTS);
      return {
        id: claim.id,
        pairKey: item.pairKey,
        lineId: item.lineId,
        stationId: item.stationId,
        field: item.field,
        locale: claim.locale,
        text: claim.text,
        risk,
        riskParts: parts,
      } as unknown as ClaimRow;
    });
    const { excluded } = rankPairs(rows, FACTS2_RISK_WEIGHTS);
    if (excluded.length) return { risk: excluded[0]!.risk, excluded: `known conflict: ${excluded[0]!.conflict.note.slice(0, 60)}` };
    const parts: Record<string, number> = {};
    for (const r of rows) for (const [k, v] of Object.entries(r.riskParts)) if (k !== "unsupported") parts[k] = Math.max(parts[k] ?? 0, v);
    parts.unsupported = rows.reduce((s, r) => s + (r.riskParts.unsupported ?? 0), 0) / rows.length;
    return { risk: Object.values(parts).reduce((a, b) => a + b, 0) };
  },
};

export default config;

/**
 * suplevel: contra2, plus a 5-level `support_level` score question on the passage state (one extra request per
 * claim). Each claim's `supported` is the mean of three values: the passage noul, the whole-source noul and the
 * normalized level (level / 4). Without a whole-source answer, the mean of the passage noul and the level.
 * Hypothesis: a noul near 0.5 means "unsure", not "partly supported". Levels that describe partial support (main
 * fact stated but a detail or qualifier added or made stronger) give a graded value that separates wording faults
 * and planted single-detail errors from supported claims.
 */
import { score } from "@typesafe-ai/sdk";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { jevCacheOptions, jevRequest, MODEL, toJevAnswer, type JevAnswer, type JevState } from "../../jev";
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

function wholeState(ds: Dataset, item: DatasetItem, claim: DatasetClaim): JevState | undefined {
  const station = ds.stations[stationKey(item.pass as 1 | 2, item.lineId, item.stationId)]!;
  const base = stateFor(ds, item, claim);
  const passages: JevState["passages"] = [];
  for (const { url } of station.urls) {
    const text = sourceText(ds, url);
    if (!text) continue;
    const title = ds.sources[url]?.title;
    passages.push({ id: `s${passages.length + 1}`, source: `${new URL(url).host}${title ? `: ${title}` : ""}`, text });
  }
  return passages.length ? { ...base, passages } : undefined;
}

const WEIGHTS = { ...FACTS2_RISK_WEIGHTS, contradicted: 0.2 };
const LEVEL_W = Number(process.env.SUPLEVEL_W ?? "1");

const PREVIOUS_NOTE = " If `previous_sentence` is present, use it only to understand what words like \"it\" or \"the square\" in the claim refer to; judge only the claim.";
const levelQuestions = (hasPrevious: boolean) => ({
  support_level: score(
    "How much of `claim` do `passages` state? The claim is about the Paris Métro station named in `station`. Passages may be in French while the claim is in English. Check each name, date, number, place, title, relation and qualifier ('only', 'first', 'oldest', 'several', 'one of the', 'the largest', « seul », « premier », « plusieurs ») of the claim against the passages." +
      (hasPrevious ? PREVIOUS_NOTE : ""),
    [
      "The passages do not state the main fact of the claim (the event, person, origin or feature it describes)",
      "The passages are about the same subject, but the claim's key name, date, number or place is missing from them or differs from them",
      "The passages state the main fact, but the claim adds a detail they do not give: a date, number, place, cause, consequence, or a qualifier such as 'only', 'first', 'oldest' or 'several'",
      "The passages state every detail, but the claim words one of them more strongly or more precisely than they do (a passage says 'around 1900' and the claim says '1900'; a passage says 'one of the oldest' and the claim says 'the oldest')",
      "Every name, date, number, place, relation and qualifier of the claim is stated in the passages or follows directly from what they state, at the same strength",
    ],
  ),
});

const config: LabConfig = {
  name: "suplevel",
  description: "contra2 plus a 5-level support score on the passages, blended into supported",
  requests({ ds, item, claim }) {
    if (!claim.passages.length) return [];
    const reqs = [];
    const passageState = stateFor(ds, item, claim);
    const { dir: _d0, ...passageCache } = jevCacheOptions(passageState);
    reqs.push({ req: jevRequest(passageState), cache: passageCache });
    reqs.push({ req: { model: MODEL, questions: levelQuestions(passageState.previous_sentence !== undefined), state: passageState } });
    const whole = wholeState(ds, item, claim);
    if (whole) reqs.push({ req: jevRequest(whole) });
    return reqs;
  },
  score({ ds, item, station, claims }) {
    const rows = claims.map(({ claim, results }) => {
      const passageAnswer = results[0] ? toJevAnswer(results[0]) : NO_PASSAGES;
      const lvl = results[1]?.ok ? (results[1].entry.answers.support_level as { score?: number } | undefined)?.score : undefined;
      const wholeAnswer = results[2] ? toJevAnswer(results[2]) : undefined;
      const wholeOk = wholeAnswer && !wholeAnswer.error && wholeAnswer.supported !== undefined;
      const passageOk = passageAnswer.supported !== undefined && !passageAnswer.error;
      let jev: JevAnswer = passageAnswer;
      if (passageOk) {
        const vals: [number, number][] = [[passageAnswer.supported!, 1]];
        if (wholeOk) vals.push([wholeAnswer.supported!, 1]);
        if (lvl !== undefined) vals.push([lvl / 4, LEVEL_W]);
        const wsum = vals.reduce((s, [, w]) => s + w, 0);
        jev = { ...passageAnswer, supported: vals.reduce((s, [v, w]) => s + v * w, 0) / wsum };
      } else if (wholeOk) jev = wholeAnswer;
      const passages = claim.passages.map((p) => ({ id: p.id, score: p.score, ...ds.passages[p.ref]! }));
      const { risk, parts } = claimRisk({ unmatched: claim.numbers.filter((m) => !m.matched), passages, jev, fetchFailure: station.fetchFailure }, WEIGHTS);
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
    const { excluded } = rankPairs(rows, WEIGHTS);
    if (excluded.length) return { risk: excluded[0]!.risk, excluded: `known conflict: ${excluded[0]!.conflict.note.slice(0, 60)}` };
    const parts: Record<string, number> = {};
    for (const r of rows) for (const [k, v] of Object.entries(r.riskParts)) if (k !== "unsupported") parts[k] = Math.max(parts[k] ?? 0, v);
    parts.unsupported = rows.reduce((s, r) => s + (r.riskParts.unsupported ?? 0), 0) / rows.length;
    return { risk: Object.values(parts).reduce((a, b) => a + b, 0) };
  },
};

export default config;

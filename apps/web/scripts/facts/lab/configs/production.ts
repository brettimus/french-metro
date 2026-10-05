/**
 * production: the production ranker as run.ts uses it (ranker facts-3), built only from production code: the passage
 * request (jevRequest, with the old-key fallback), the whole-source request (wholeSourceState), blendAnswers,
 * claimRisk and rankPairs with the default RISK_WEIGHTS. It must give the same numbers as contra2, the config it was
 * ported from. No new Jev calls.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { blendAnswers, jevCacheOptions, jevRequest, toJevAnswer, wholeSourceState, type JevAnswer } from "../../jev";
import { claimRisk, rankPairs, type ClaimRow } from "../../rank";
import { cleanSourceText } from "../../retrieve";
import { cachePath, type SourceDoc } from "../../sources";
import { stateFor, type Dataset, type DatasetStation } from "../build-dataset";
import type { LabConfig } from "../config";

const NO_PASSAGES: JevAnswer = { ms: 0, cached: false, error: "no passages retrieved" };
const sha1 = (s: string) => createHash("sha1").update(s).digest("hex");

const docCache = new Map<string, string>();
/** The station's fetched sources as run.ts passes them to wholeSourceState (label and cleaned text). */
function stationSources(ds: Dataset, station: DatasetStation): { source: string; text: string }[] {
  const out: { source: string; text: string }[] = [];
  for (const { url } of station.urls) {
    const meta = ds.sources[url];
    if (!meta || meta.status !== "ok") continue;
    let text = docCache.get(url);
    if (text === undefined) {
      text = cleanSourceText((JSON.parse(readFileSync(cachePath(url), "utf8")) as SourceDoc).text);
      if (sha1(text) !== meta.textSha1) throw new Error(`source text for ${url} changed since dataset.json was built`);
      docCache.set(url, text);
    }
    out.push({ source: `${new URL(url).host}${meta.title ? `: ${meta.title}` : ""}`, text });
  }
  return out;
}

const config: LabConfig = {
  name: "production",
  description: "production code (ranker facts-3): blended passage + whole-source supported, mean pair, contradicted 0.2",
  requests({ ds, item, claim, station }) {
    if (!claim.passages.length) return [];
    const state = stateFor(ds, item, claim);
    const { dir: _dir, ...cache } = jevCacheOptions(state);
    const whole = wholeSourceState(state, stationSources(ds, station));
    return [{ req: jevRequest(state), cache }, ...(whole ? [{ req: jevRequest(whole) }] : [])];
  },
  score({ ds, item, station, claims }) {
    const rows = claims.map(({ claim, results }) => {
      const jev = results[0] ? blendAnswers(toJevAnswer(results[0]), results[1] ? toJevAnswer(results[1]) : undefined) : NO_PASSAGES;
      const passages = claim.passages.map((p) => ({ id: p.id, score: p.score, ...ds.passages[p.ref]! }));
      const { risk, parts } = claimRisk({ unmatched: claim.numbers.filter((m) => !m.matched), passages, jev, fetchFailure: station.fetchFailure });
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
    const { pairs, excluded } = rankPairs(rows);
    if (excluded.length) return { risk: excluded[0]!.risk, excluded: `known conflict: ${excluded[0]!.conflict.note.slice(0, 60)}` };
    return { risk: pairs[0]!.risk };
  },
};

export default config;

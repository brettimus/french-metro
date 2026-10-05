/**
 * meanpair: baseline, but the pair's `unsupported` part is the mean of its claims' (1 − `supported`) instead of the
 * max. Other parts still take the max over the pair's claims. Hypothesis: many supported pairs have one locale with a
 * low `supported` and the other high (Jev misses the fact in one language), while real problems are low in both.
 * Same Jev requests as baseline (no new calls).
 */
import { jevCacheOptions, jevRequest, toJevAnswer, type JevAnswer } from "../../jev";
import { claimRisk, rankPairs, FACTS2_RISK_WEIGHTS, type ClaimRow } from "../../rank";
import { stateFor } from "../build-dataset";
import type { LabConfig } from "../config";

const NO_PASSAGES: JevAnswer = { ms: 0, cached: false, error: "no passages retrieved" };

const config: LabConfig = {
  name: "meanpair",
  description: "baseline with the pair's unsupported part = mean over claims instead of max",
  requests({ ds, item, claim }) {
    if (!claim.passages.length) return [];
    const state = stateFor(ds, item, claim);
    const { dir: _dir, ...cache } = jevCacheOptions(state);
    return [{ req: jevRequest(state), cache }];
  },
  score({ ds, item, station, claims }) {
    const rows = claims.map(({ claim, results }) => {
      const jev = results[0] ? toJevAnswer(results[0]) : NO_PASSAGES;
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

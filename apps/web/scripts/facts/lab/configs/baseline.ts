/**
 * Baseline: the production ranker (questions facts-2 in jev.ts, FACTS2_RISK_WEIGHTS and known conflicts in rank.ts), with
 * the passages and number checks the review runs stored. Its requests are the ones run.ts sent, so the cache answers
 * them (through the old-key fallback) without Jev calls; only planted claims are new.
 */
import { jevCacheOptions, jevRequest, toJevAnswer, type JevAnswer } from "../../jev";
import { claimRisk, rankPairs, FACTS2_RISK_WEIGHTS, type ClaimRow } from "../../rank";
import { stateFor } from "../build-dataset";
import type { LabConfig } from "../config";

const NO_PASSAGES: JevAnswer = { ms: 0, cached: false, error: "no passages retrieved" };

const config: LabConfig = {
  name: "baseline",
  description: "production ranker: facts-2 questions, FACTS2_RISK_WEIGHTS, known conflicts excluded",
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
    const { pairs, excluded } = rankPairs(rows, FACTS2_RISK_WEIGHTS);
    if (excluded.length) return { risk: excluded[0]!.risk, excluded: `known conflict: ${excluded[0]!.conflict.note.slice(0, 60)}` };
    return { risk: pairs[0]!.risk };
  },
};

export default config;

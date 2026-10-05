/**
 * overstated: baseline plus one extra Jev request per claim with an "overstated" Noul (does the claim say more, or
 * say it more strongly, than the passages?). Pass-2 confirmed problems were mostly wording faults ("only", "one of
 * the few", time spans, comparisons with other stations) that the `supported` question scores as half supported.
 * Pair risk = baseline pair risk + OVERSTATED_WEIGHT × the highest `overstated` among the pair's claims.
 */
import { noul } from "@typesafe-ai/sdk";
import { jevCacheOptions, jevRequest, MODEL, toJevAnswer, type JevAnswer } from "../../jev";
import { claimRisk, rankPairs, RISK_WEIGHTS, type ClaimRow } from "../../rank";
import { stateFor } from "../build-dataset";
import type { LabConfig } from "../config";

const NO_PASSAGES: JevAnswer = { ms: 0, cached: false, error: "no passages retrieved" };
const OVERSTATED_WEIGHT = 0.5;

const PREVIOUS_NOTE = " If `previous_sentence` is present, use it only to understand what words like \"it\" or \"the square\" in the claim refer to; judge only the claim.";

const overstatedQuestions = (hasPrevious: boolean) => ({
  overstated: noul(
    "Does `claim` say more, or say it more strongly, than `passages` support? The claim is about the Paris Métro station named in `station`. Passages may be in French while the claim is in English." +
      (hasPrevious ? PREVIOUS_NOTE : ""),
    {
      true: "The claim adds something the passages do not state: a qualifier such as only, first, few or one of, a superlative, a count, a time span, a precise location, a comparison with other places, a cause, or a general statement drawn from one case",
      false: "The claim states each fact at the same strength and precision as the passages: no added qualifier, count, comparison, cause or generalisation",
    },
  ),
});

const config: LabConfig = {
  name: "overstated",
  description: "baseline + an 'overstated' Noul request per claim, added to pair risk with weight 0.5 (max over claims)",
  requests({ ds, item, claim }) {
    if (!claim.passages.length) return [];
    const state = stateFor(ds, item, claim);
    const { dir: _dir, ...cache } = jevCacheOptions(state);
    return [{ req: jevRequest(state), cache }, { req: { model: MODEL, questions: overstatedQuestions(state.previous_sentence !== undefined), state } }];
  },
  score({ ds, item, station, claims }) {
    let overstated = 0;
    const rows = claims.map(({ claim, results }) => {
      const jev = results[0] ? toJevAnswer(results[0]) : NO_PASSAGES;
      const o = results[1];
      // No passages or a failed request: count as fully overstated, as an error counts as fully unsupported.
      const ov = o?.ok ? ((o.entry.answers.overstated as { noul?: number })?.noul ?? 1) : 1;
      overstated = Math.max(overstated, ov);
      const passages = claim.passages.map((p) => ({ id: p.id, score: p.score, ...ds.passages[p.ref]! }));
      const { risk, parts } = claimRisk({ unmatched: claim.numbers.filter((m) => !m.matched), passages, jev, fetchFailure: station.fetchFailure }, RISK_WEIGHTS);
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
    const { pairs, excluded } = rankPairs(rows, RISK_WEIGHTS);
    const add = OVERSTATED_WEIGHT * overstated;
    if (excluded.length) return { risk: excluded[0]!.risk + add, excluded: `known conflict: ${excluded[0]!.conflict.note.slice(0, 60)}` };
    return { risk: Math.round((pairs[0]!.risk + add) * 1000) / 1000 };
  },
};

export default config;

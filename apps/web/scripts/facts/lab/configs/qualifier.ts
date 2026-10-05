/**
 * qualifier: meanpair plus a narrow Jev Noul about qualifiers. The question asks only whether the claim has an
 * exclusive, rarity, superlative, "first", vague-count or comparison qualifier (only, few, several, one of the, the
 * oldest, the first, as at, shares, the French equivalents) that the passages do not state with the same strength.
 * Claims without such a qualifier must get "false", so the answer does not repeat `supported` (iteration 1's general
 * `overstated` question did repeat it). Hypothesis: confirmed problems are mostly such wording faults with middle
 * `supported` values; a passage-aware but narrow check moves them above supported pairs with similar `supported`.
 * Pair adds QUALIFIER_WEIGHT × mean over the pair's claims (mean, as for `unsupported` in meanpair). One more Jev
 * request per claim. Weight chosen before the run.
 */
import { noul } from "@typesafe-ai/sdk";
import { jevCacheOptions, jevRequest, MODEL, toJevAnswer, type JevAnswer } from "../../jev";
import { claimRisk, rankPairs, RISK_WEIGHTS, type ClaimRow } from "../../rank";
import { stateFor } from "../build-dataset";
import type { LabConfig } from "../config";

const NO_PASSAGES: JevAnswer = { ms: 0, cached: false, error: "no passages retrieved" };
const QUALIFIER_WEIGHT = 0.25;

const PREVIOUS_NOTE = " If `previous_sentence` is present, use it only to understand what words like \"it\" or \"the square\" in the claim refer to; judge only the claim.";

const qualifierQuestions = (hasPrevious: boolean) => ({
  qualifier: noul(
    "Does `claim` contain a qualifier of exclusivity, rarity, rank, order or comparison (such as only, sole, few, several, one of the, the first, the oldest, the largest, as at, shares, like other, or the French seul, quelques, plusieurs, l'un des, le premier, le plus) that `passages` do not state with the same strength? The claim is about the Paris Métro station named in `station`. Passages may be in French while the claim is in English." +
      (hasPrevious ? PREVIOUS_NOTE : ""),
    {
      true: "The claim has such a qualifier, and no passage states it: the passages are silent on it or state something weaker or different",
      false: "The claim has no such qualifier, or a passage states the qualifier with the same strength",
    },
  ),
});

const config: LabConfig = {
  name: "qualifier",
  description: "meanpair + 0.25 × mean over claims of a narrow Noul: claim has an only/few/first/-est/comparison qualifier the passages do not state",
  requests({ ds, item, claim }) {
    if (!claim.passages.length) return [];
    const state = stateFor(ds, item, claim);
    const { dir: _dir, ...cache } = jevCacheOptions(state);
    return [{ req: jevRequest(state), cache }, { req: { model: MODEL, questions: qualifierQuestions(state.previous_sentence !== undefined), state } }];
  },
  score({ ds, item, station, claims }) {
    const quals: number[] = [];
    const rows = claims.map(({ claim, results }) => {
      const jev = results[0] ? toJevAnswer(results[0]) : NO_PASSAGES;
      const q = results[1]?.ok ? (results[1].entry.answers.qualifier as { noul?: number } | undefined)?.noul : undefined;
      quals.push(q ?? 0);
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
    const { excluded } = rankPairs(rows, RISK_WEIGHTS);
    if (excluded.length) return { risk: excluded[0]!.risk, excluded: `known conflict: ${excluded[0]!.conflict.note.slice(0, 60)}` };
    const parts: Record<string, number> = {};
    for (const r of rows) for (const [k, v] of Object.entries(r.riskParts)) if (k !== "unsupported") parts[k] = Math.max(parts[k] ?? 0, v);
    parts.unsupported = rows.reduce((s, r) => s + (r.riskParts.unsupported ?? 0), 0) / rows.length;
    parts.qualifier = QUALIFIER_WEIGHT * (quals.reduce((a, b) => a + b, 0) / Math.max(1, quals.length));
    return { risk: Object.values(parts).reduce((a, b) => a + b, 0) };
  },
};

export default config;

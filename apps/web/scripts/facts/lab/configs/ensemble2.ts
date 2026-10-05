/**
 * ensemble2: meanpair, but each claim's `supported` is the mean of two phrasings: the production `supported` Noul and
 * a second Noul with other wording (can a reader confirm every fact of the claim from the passages alone?).
 * Hypothesis: meanpair showed that much of the error on supported pairs is noise in one Jev answer. A second
 * phrasing of the same question is a second sample; the mean has less noise. One more Jev request per claim.
 * If the second request fails, the claim keeps the production value.
 */
import { noul } from "@typesafe-ai/sdk";
import { jevCacheOptions, jevRequest, MODEL, toJevAnswer, type JevAnswer } from "../../jev";
import { claimRisk, rankPairs, RISK_WEIGHTS, type ClaimRow } from "../../rank";
import { stateFor } from "../build-dataset";
import type { LabConfig } from "../config";

const NO_PASSAGES: JevAnswer = { ms: 0, cached: false, error: "no passages retrieved" };

const PREVIOUS_NOTE = " If `previous_sentence` is present, use it only to understand what words like \"it\" or \"the square\" in the claim refer to; judge only the claim.";

const altQuestions = (hasPrevious: boolean) => ({
  confirmable: noul(
    "Can a reader confirm every fact in `claim` using only `passages`? The claim is about the Paris Métro station named in `station`. Passages may be in French while the claim is in English." +
      (hasPrevious ? PREVIOUS_NOTE : ""),
    {
      true: "A reader of the passages learns each fact the claim states (its names, dates, numbers, places, titles and relations) at the same strength and precision",
      false: "A reader of the passages cannot confirm at least one fact the claim states, or finds only a weaker, vaguer or different version of it",
    },
  ),
});

const config: LabConfig = {
  name: "ensemble2",
  description: "meanpair with per-claim supported = mean of the production Noul and a second phrasing (confirmable)",
  requests({ ds, item, claim }) {
    if (!claim.passages.length) return [];
    const state = stateFor(ds, item, claim);
    const { dir: _dir, ...cache } = jevCacheOptions(state);
    return [{ req: jevRequest(state), cache }, { req: { model: MODEL, questions: altQuestions(state.previous_sentence !== undefined), state } }];
  },
  score({ ds, item, station, claims }) {
    const rows = claims.map(({ claim, results }) => {
      let jev = results[0] ? toJevAnswer(results[0]) : NO_PASSAGES;
      const alt = results[1];
      const conf = alt?.ok ? (alt.entry.answers.confirmable as { noul?: number } | undefined)?.noul : undefined;
      if (jev.supported !== undefined && conf !== undefined) jev = { ...jev, supported: (jev.supported + conf) / 2 };
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
    return { risk: Object.values(parts).reduce((a, b) => a + b, 0) };
  },
};

export default config;

/**
 * wording: baseline plus a free code feature for wording that claims more than a source usually states: exclusivity
 * and rarity qualifiers (only, few, one of the), vague counts (several), "-est" superlatives and comparisons with other
 * places (as at, shares). Pass-2 confirmed problems were mostly these. No Jev calls are added.
 * Pair risk = baseline pair risk + WORDING_WEIGHT if a claim of the pair (EN or FR) contains such a word.
 */
import { jevCacheOptions, jevRequest, toJevAnswer, type JevAnswer } from "../../jev";
import { claimRisk, rankPairs, FACTS2_RISK_WEIGHTS, type ClaimRow } from "../../rank";
import { stateFor } from "../build-dataset";
import type { LabConfig } from "../config";

const NO_PASSAGES: JevAnswer = { ms: 0, cached: false, error: "no passages retrieved" };
const WORDING_WEIGHT = 0.2;

const WORDING: Record<"en" | "fr", RegExp> = {
  en: /\b(only|sole|unique|few|several|one of the|oldest|largest|longest|earliest|as at|like other|shares?)\b/i,
  fr: /(?<![\p{L}])(seule?s?|seulement|unique|quelques|plusieurs|l['’]une? des|plus ancien(ne)?s?|comme à|partagen?t?)(?![\p{L}])/iu,
};

export function hasWordingFlag(locale: string, text: string): boolean {
  const re = WORDING[locale as "en" | "fr"];
  return re ? re.test(text) : false;
}

const config: LabConfig = {
  name: "wording",
  description: "baseline + 0.2 when a claim of the pair has an only/few/several/one of/superlative/comparison word (code, no Jev)",
  requests({ ds, item, claim }) {
    if (!claim.passages.length) return [];
    const state = stateFor(ds, item, claim);
    const { dir: _dir, ...cache } = jevCacheOptions(state);
    return [{ req: jevRequest(state), cache }];
  },
  score({ ds, item, station, claims }) {
    let flag = false;
    const rows = claims.map(({ claim, results }) => {
      flag ||= hasWordingFlag(claim.locale, claim.text);
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
    const add = flag ? WORDING_WEIGHT : 0;
    if (excluded.length) return { risk: excluded[0]!.risk + add, excluded: `known conflict: ${excluded[0]!.conflict.note.slice(0, 60)}` };
    return { risk: Math.round((pairs[0]!.risk + add) * 1000) / 1000 };
  },
};

export default config;

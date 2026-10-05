/**
 * Risk scoring (ranker facts-3). All weights live in RISK_WEIGHTS. A claim's risk adds up its weighted signals. A
 * pair (the EN and FR sentences of one aligned group) takes the mean of its claims' `unsupported` parts and, for each
 * other signal, the strongest value among its claims, and adds those up.
 *
 * Each claim's Jev `supported` is the mean of the passage answer and the whole-source answer (jev.ts, `blendAnswers`).
 *
 * facts-2 weights came from the pass-1 review (docs/facts/2026-10-05-fact-check.md, 80 labelled pairs):
 * - Low `supported` was the best signal for errors and for claims the cited sources do not state, so it dominates.
 * - Unmatched numbers mostly meant a missing source (the date was in another article), not an error. Weaker weight.
 * - `best_passage = none` was more frequent for unsourced claims (17 of 32) than for supported ones (8 of 39).
 * - EN/FR disagreement pointed to false alarms (21 of 39 supported pairs, none of the confirmed problems). Weight 0;
 *   it is still computed and shown in the report.
 *
 * facts-3 changes, tuned in the fact lab (lab/NOTES.md; dev AP 0.840 → 0.907, val AP 0.862 → 0.890):
 * - The pair's `unsupported` part is the mean over its claims, not the max: a low `supported` in one locale only is
 *   mostly Jev noise (iteration 3, +0.022 AP).
 * - `contradicted` has weight 0.2. It separates changed single details (planted errors) from supported claims; on
 *   real problems it gives no gain (iteration 10, +0.029 AP on dev, planted errors only on val).
 *
 * Pairs that match a known source conflict (known-conflicts.ts) are left out of the ranking and returned apart.
 */
import type { Claim } from "./claims";
import type { JevAnswer } from "./jev";
import { KNOWN_CONFLICTS, matchKnownConflict, type KnownConflict } from "./known-conflicts";
import type { FactMatch } from "./numbers";

/** Label for the ranking rules (weights, pair rule, blended answers) in results.json and ranked.md. */
export const RANKER_VERSION = "facts-3";

export const RISK_WEIGHTS = {
  /** × (1 − Jev `supported`). */
  unsupported: 1,
  /** Share of the mean in the pair's `unsupported` part: 1 = mean over the pair's claims, 0 = max (facts-2). */
  unsupportedPairMean: 1,
  /** × Jev `contradicted` (0–1) of the passage answer. */
  contradicted: 0.2,
  /** Per unmatched number, year or date in the claim (number words count half), up to `unmatchedNumberCap`. */
  unmatchedNumber: 0.1,
  unmatchedNumberCap: 0.2,
  /** Jev chose "none" for best_passage, or retrieval found no passage. */
  noPassage: 0.1,
  /** A station source link is broken, blocked or unreadable (× 0.5 when only a people link failed). */
  fetchFailure: 0.05,
  /** No Jev answer (error): counts as fully unsupported and not contradicted, plus this. */
  jevError: 0.1,
  /** × |risk(EN) − risk(FR)| for a pair with both locales. Pointed to false alarms in pass 1. */
  pairDisagreement: 0,
} as const;

export type RiskWeights = { readonly [K in keyof typeof RISK_WEIGHTS]: number };

/** The facts-2 weights (max over the pair's claims, `contradicted` 0). The fact lab's baseline config uses them. */
export const FACTS2_RISK_WEIGHTS: RiskWeights = { ...RISK_WEIGHTS, unsupportedPairMean: 0, contradicted: 0 };

export type ClaimRow = Claim & {
  numbers: FactMatch[];
  unmatched: FactMatch[];
  passages: { id: string; url: string; score: number; text: string }[];
  jev: JevAnswer;
  /** 0 = all station sources fetched, 0.5 = a people link failed, 1 = a source link failed. */
  fetchFailure: number;
  risk: number;
  riskParts: Record<string, number>;
};

export function unmatchedPenalty(unmatched: FactMatch[], w: RiskWeights = RISK_WEIGHTS): number {
  const units = unmatched.reduce((sum, m) => sum + (m.fact.kind === "word" ? 0.5 : 1), 0);
  return Math.min(w.unmatchedNumberCap, units * w.unmatchedNumber);
}

export function claimRisk(
  row: Pick<ClaimRow, "unmatched" | "passages" | "jev" | "fetchFailure">,
  w: RiskWeights = RISK_WEIGHTS,
): { risk: number; parts: Record<string, number> } {
  const parts: Record<string, number> = {};
  const { jev } = row;
  if (jev.error || jev.supported === undefined) {
    parts.unsupported = w.unsupported;
    parts.jevError = w.jevError;
  } else {
    parts.contradicted = w.contradicted * (jev.contradicted ?? 0);
    parts.unsupported = w.unsupported * (1 - jev.supported);
    if (jev.bestPassage === "none") parts.noPassage = w.noPassage;
  }
  if (row.passages.length === 0) parts.noPassage = w.noPassage;
  parts.numbers = unmatchedPenalty(row.unmatched, w);
  parts.fetch = w.fetchFailure * row.fetchFailure;
  const risk = Object.values(parts).reduce((a, b) => a + b, 0);
  return { risk: round(risk), parts: Object.fromEntries(Object.entries(parts).filter(([, v]) => v > 0).map(([k, v]) => [k, round(v)])) };
}

export type PairRow = {
  pairKey: string;
  risk: number;
  /** `unsupported`: mean (or max, see `unsupportedPairMean`) over the pair's claims; other signals: the strongest value. */
  riskParts: Record<string, number>;
  /** |max risk(EN) − max risk(FR)|; shown in the report, weighted by `pairDisagreement`. */
  disagreement: number;
  en: ClaimRow[];
  fr: ClaimRow[];
};

export type ExcludedPair = PairRow & { conflict: KnownConflict };

/** Merge claims by pair key, set aside known conflicts, and rank the rest, riskiest first. */
export function rankPairs(
  rows: ClaimRow[],
  w: RiskWeights = RISK_WEIGHTS,
  conflicts: KnownConflict[] = KNOWN_CONFLICTS,
): { pairs: PairRow[]; excluded: ExcludedPair[] } {
  const byPair = new Map<string, ClaimRow[]>();
  for (const r of rows) byPair.set(r.pairKey, [...(byPair.get(r.pairKey) ?? []), r]);
  const pairs: PairRow[] = [];
  const excluded: ExcludedPair[] = [];
  for (const [pairKey, group] of byPair) {
    const en = group.filter((r) => r.locale === "en");
    const fr = group.filter((r) => r.locale === "fr");
    const maxOf = (xs: ClaimRow[]) => (xs.length ? Math.max(...xs.map((x) => x.risk)) : undefined);
    const re = maxOf(en);
    const rf = maxOf(fr);
    const disagreement = re !== undefined && rf !== undefined ? Math.abs(re - rf) : 0;
    const parts: Record<string, number> = {};
    for (const r of group) for (const [k, v] of Object.entries(r.riskParts)) parts[k] = Math.max(parts[k] ?? 0, v);
    const unsupportedMean = group.reduce((s, r) => s + (r.riskParts.unsupported ?? 0), 0) / group.length;
    const unsupported = w.unsupportedPairMean * unsupportedMean + (1 - w.unsupportedPairMean) * (parts.unsupported ?? 0);
    // 4 decimals: the mean of two 3-decimal claim parts is exact, so the ranking keeps their order.
    if (unsupported > 0) parts.unsupported = round(unsupported, 4);
    else delete parts.unsupported;
    if (w.pairDisagreement * disagreement > 0) parts.disagreement = round(w.pairDisagreement * disagreement);
    const risk = round(Object.values(parts).reduce((a, b) => a + b, 0), 4);
    const pair: PairRow = { pairKey, risk, riskParts: parts, disagreement: round(disagreement), en, fr };
    const first = group[0]!;
    const conflict = matchKnownConflict({ lineId: first.lineId, stationId: first.stationId, field: first.field, texts: group.map((r) => r.text) }, conflicts);
    if (conflict) excluded.push({ ...pair, conflict });
    else pairs.push(pair);
  }
  const order = (a: PairRow, b: PairRow) => b.risk - a.risk || a.pairKey.localeCompare(b.pairKey);
  return { pairs: pairs.sort(order), excluded: excluded.sort(order) };
}

/** Known conflicts that matched no pair: the claim was rewritten or removed, so the entry needs a check. */
export function staleConflicts(excluded: ExcludedPair[], conflicts: KnownConflict[] = KNOWN_CONFLICTS): KnownConflict[] {
  const used = new Set(excluded.map((e) => e.conflict));
  return conflicts.filter((k) => !used.has(k));
}

export const round = (x: number, d = 3) => Math.round(x * 10 ** d) / 10 ** d;

/**
 * Risk scoring. All weights live in RISK_WEIGHTS. A claim's risk adds up its signals; a pair (the EN and FR
 * sentences of one aligned group) takes the riskier locale and adds a term for EN/FR disagreement.
 */
import type { Claim } from "./claims";
import type { JevAnswer } from "./jev";
import type { FactMatch } from "./numbers";

export const RISK_WEIGHTS = {
  /** × Jev `contradicted` (0–1). */
  contradicted: 0.4,
  /** × (1 − Jev `supported`). */
  unsupported: 0.3,
  /** Per unmatched number, year or date in the claim (number words count half), up to `unmatchedNumberCap`. */
  unmatchedNumber: 0.15,
  unmatchedNumberCap: 0.3,
  /** Jev chose "none" for best_passage, or retrieval found no passage. */
  noPassage: 0.05,
  /** A station source link is broken, blocked or unreadable (× 0.5 when only a people link failed). */
  fetchFailure: 0.1,
  /** No Jev answer (error): counts as unsupported and not contradicted, plus this. */
  jevError: 0.1,
  /** × |risk(EN) − risk(FR)| for a pair with both locales. */
  pairDisagreement: 0.2,
} as const;

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

export function unmatchedPenalty(unmatched: FactMatch[], w = RISK_WEIGHTS): number {
  const units = unmatched.reduce((sum, m) => sum + (m.fact.kind === "word" ? 0.5 : 1), 0);
  return Math.min(w.unmatchedNumberCap, units * w.unmatchedNumber);
}

export function claimRisk(
  row: Pick<ClaimRow, "unmatched" | "passages" | "jev" | "fetchFailure">,
  w = RISK_WEIGHTS,
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
  disagreement: number;
  en: ClaimRow[];
  fr: ClaimRow[];
};

/** Merge claims by pair key and rank, riskiest first. */
export function rankPairs(rows: ClaimRow[], w = RISK_WEIGHTS): PairRow[] {
  const byPair = new Map<string, ClaimRow[]>();
  for (const r of rows) byPair.set(r.pairKey, [...(byPair.get(r.pairKey) ?? []), r]);
  const pairs: PairRow[] = [];
  for (const [pairKey, group] of byPair) {
    const en = group.filter((r) => r.locale === "en");
    const fr = group.filter((r) => r.locale === "fr");
    const maxOf = (xs: ClaimRow[]) => (xs.length ? Math.max(...xs.map((x) => x.risk)) : undefined);
    const re = maxOf(en);
    const rf = maxOf(fr);
    const disagreement = re !== undefined && rf !== undefined ? Math.abs(re - rf) : 0;
    const base = Math.max(re ?? 0, rf ?? 0);
    pairs.push({ pairKey, risk: round(base + w.pairDisagreement * disagreement), disagreement: round(disagreement), en, fr });
  }
  return pairs.sort((a, b) => b.risk - a.risk || a.pairKey.localeCompare(b.pairKey));
}

export const round = (x: number, d = 3) => Math.round(x * 10 ** d) / 10 ** d;

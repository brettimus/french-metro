/**
 * Measures a ranking against the pass-1 labels (reviewed.ts). It re-scores the claims of a results.json with the
 * current RISK_WEIGHTS and known conflicts, and with a few variants, without calling Jev.
 *
 * Usage:
 *   bun apps/web/scripts/facts/evaluate.ts [results.json]
 *
 * Default input: out/full/results.json (the pass-1 run, whose claim texts match the labels). For each ranking it
 * prints where the 6 confirmed problems and the 32 unsourced pairs land among all pairs, and precision at k.
 * "pass 1" is the order stored in the file (the weights used when it was written).
 */
import { join } from "node:path";
import { claimRisk, rankPairs, RISK_WEIGHTS, type ClaimRow, type PairRow, type RiskWeights } from "./rank";
import { PASS1_REVIEWED, type Verdict } from "./reviewed";

type Ranking = { name: string; order: string[]; excluded: string[] };

function rerank(pairs: PairRow[], w: RiskWeights): Omit<Ranking, "name"> {
  const rows: ClaimRow[] = pairs.flatMap((p) => [...p.en, ...p.fr]).map((r) => {
    const { risk, parts } = claimRisk(r, w);
    return { ...r, risk, riskParts: parts };
  });
  const { pairs: ranked, excluded } = rankPairs(rows, w);
  return { order: ranked.map((p) => p.pairKey), excluded: excluded.map((p) => p.pairKey) };
}

export function summarize(r: Ranking, labels = PASS1_REVIEWED) {
  const verdict = new Map(labels.map((l) => [l.pairKey, l.verdict]));
  const rankOf = (v: Verdict) => labels.filter((l) => l.verdict === v && !r.excluded.includes(l.pairKey)).map((l) => r.order.indexOf(l.pairKey) + 1).filter((x) => x > 0).sort((a, b) => a - b);
  const confirmed = rankOf("confirmed");
  const unsourced = rankOf("unsourced");
  const supported = rankOf("supported");
  const median = (xs: number[]) => (xs.length ? xs[Math.floor((xs.length - 1) / 2)]! : NaN);
  const within = (xs: number[], k: number) => xs.filter((x) => x <= k).length;
  const ks = [10, 20, 40, 80, 100];
  // Precision at k over all pairs; unreviewed pairs count as not-a-problem (a lower bound).
  const problemAt = (k: number) => r.order.slice(0, k).filter((key) => ["confirmed", "unsourced"].includes(verdict.get(key) ?? "")).length;
  const unlabeledAt = (k: number) => r.order.slice(0, k).filter((key) => !verdict.has(key)).length;
  // AUC within the labelled pairs only (fair to every ranking): the chance that a random problem pair ranks above a
  // random supported or refuted pair. Excluded pairs are left out.
  const pos = (key: string) => r.order.indexOf(key);
  const auc = (isPos: (v: Verdict) => boolean) => {
    const ls = labels.filter((l) => pos(l.pairKey) >= 0);
    const p = ls.filter((l) => isPos(l.verdict)).map((l) => pos(l.pairKey));
    const n = ls.filter((l) => l.verdict === "supported" || l.verdict === "refuted").map((l) => pos(l.pairKey));
    let wins = 0;
    for (const a of p) for (const b of n) wins += a < b ? 1 : 0;
    return Number((wins / (p.length * n.length)).toFixed(3));
  };
  return {
    name: r.name,
    excluded: r.excluded,
    aucProblem: auc((v) => v === "confirmed" || v === "unsourced"),
    aucConfirmed: auc((v) => v === "confirmed"),
    confirmedRanks: confirmed,
    unsourced: { median: median(unsourced), worst: unsourced.at(-1), ...Object.fromEntries(ks.map((k) => [`top${k}`, within(unsourced, k)])) },
    supported: { median: median(supported), top40: within(supported, 40), top80: within(supported, 80) },
    precision: Object.fromEntries(ks.map((k) => [k, { problems: problemAt(k), unreviewed: unlabeledAt(k) }])),
  };
}

if (import.meta.main) {
  const file = process.argv[2] ?? join(import.meta.dir, "out/full/results.json");
  const data = (await Bun.file(file).json()) as { pairs: PairRow[] };
  const stored: Ranking = { name: "stored order (pass 1)", order: data.pairs.map((p) => p.pairKey), excluded: [] };
  const variants: [string, RiskWeights][] = [
    ["current RISK_WEIGHTS", RISK_WEIGHTS],
    ["unsupported only", { ...RISK_WEIGHTS, unmatchedNumber: 0, unmatchedNumberCap: 0, noPassage: 0, fetchFailure: 0 }],
    ["current + contradicted 0.1", { ...RISK_WEIGHTS, contradicted: 0.1 }],
    ["current, numbers 0.15/0.3", { ...RISK_WEIGHTS, unmatchedNumber: 0.15, unmatchedNumberCap: 0.3 }],
    ["current, noPassage 0", { ...RISK_WEIGHTS, noPassage: 0 }],
  ];
  const results = [summarize(stored), ...variants.map(([name, w]) => summarize({ name, ...rerank(data.pairs, w) }))];
  for (const s of results) console.log(JSON.stringify(s));
}

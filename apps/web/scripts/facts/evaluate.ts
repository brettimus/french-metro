/**
 * Measures a ranking against the review labels (reviewed.ts). It re-scores the claims of a results.json with the
 * current RISK_WEIGHTS and known conflicts, and with a few variants, without calling Jev.
 *
 * Usage:
 *   bun apps/web/scripts/facts/evaluate.ts [--labels pass1|pass2|all] [results.json]
 *
 * --labels pass1 (default): the 80 pass-1 labels against out/full/results.json (the pass-1 run, whose claim texts
 *   match the labels). The first line is the order stored in the file (the weights used when it was written).
 * --labels pass2: the 100 pass-2 labels against out/pass2/results.json.
 * --labels all: both passes, each against its own run, then one pooled line per ranking ("pooled"): AUC over all
 *   180 labels, with each pair's risk taken from its own run. A results.json argument is not allowed with `all`.
 * For each ranking it prints where the labelled pairs land among all pairs, the AUC within the labelled pairs, and
 * precision at k.
 */
import { join } from "node:path";
import { claimRisk, rankPairs, RISK_WEIGHTS, type ClaimRow, type PairRow, type RiskWeights } from "./rank";
import { PASS1_REVIEWED, PASS2_REVIEWED, REVIEW_RUNS, type ReviewedPair, type Verdict } from "./reviewed";

type Ranking = { name: string; order: string[]; excluded: string[]; risk?: Map<string, number> };

function rerank(pairs: PairRow[], w: RiskWeights): Omit<Ranking, "name"> {
  const rows: ClaimRow[] = pairs.flatMap((p) => [...p.en, ...p.fr]).map((r) => {
    const { risk, parts } = claimRisk(r, w);
    return { ...r, risk, riskParts: parts };
  });
  const { pairs: ranked, excluded } = rankPairs(rows, w);
  return { order: ranked.map((p) => p.pairKey), excluded: excluded.map((p) => p.pairKey), risk: new Map(ranked.map((p) => [p.pairKey, p.risk])) };
}

export function summarize(r: Ranking, labels: ReviewedPair[] = PASS1_REVIEWED) {
  const verdict = new Map(labels.map((l) => [l.pairKey, l.verdict]));
  const rankOf = (v: Verdict) => labels.filter((l) => l.verdict === v && !r.excluded.includes(l.pairKey)).map((l) => r.order.indexOf(l.pairKey) + 1).filter((x) => x > 0).sort((a, b) => a - b);
  const confirmed = rankOf("confirmed");
  const unsourced = rankOf("unsourced");
  const refuted = rankOf("refuted");
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
    refutedRanks: refuted,
    unsourced: { median: median(unsourced), worst: unsourced.at(-1), ...Object.fromEntries(ks.map((k) => [`top${k}`, within(unsourced, k)])) },
    supported: { median: median(supported), top40: within(supported, 40), top80: within(supported, 80) },
    precision: Object.fromEntries(ks.map((k) => [k, { problems: problemAt(k), unreviewed: unlabeledAt(k) }])),
  };
}

const VARIANTS: [string, RiskWeights][] = [
  ["current RISK_WEIGHTS", RISK_WEIGHTS],
  ["unsupported only", { ...RISK_WEIGHTS, unmatchedNumber: 0, unmatchedNumberCap: 0, noPassage: 0, fetchFailure: 0 }],
  ["current + contradicted 0.1", { ...RISK_WEIGHTS, contradicted: 0.1 }],
  ["current, numbers 0.15/0.3", { ...RISK_WEIGHTS, unmatchedNumber: 0.15, unmatchedNumberCap: 0.3 }],
  ["current, noPassage 0", { ...RISK_WEIGHTS, noPassage: 0 }],
];

/**
 * AUC over labels from several runs: each label's pair keeps the risk it has in its own run. Ties count half.
 * `scored` holds [verdict, risk] for each labelled pair that was ranked (not excluded).
 */
export function pooledAuc(scored: [Verdict, number][], isPos: (v: Verdict) => boolean): number {
  const p = scored.filter(([v]) => isPos(v)).map(([, r]) => r);
  const n = scored.filter(([v]) => v === "supported" || v === "refuted").map(([, r]) => r);
  let wins = 0;
  for (const a of p) for (const b of n) wins += a > b ? 1 : a === b ? 0.5 : 0;
  return Number((wins / (p.length * n.length)).toFixed(3));
}

type LabelSet = "pass1" | "pass2" | "all";

function parseArgs(argv: string[]): { labels: LabelSet; file?: string } {
  let labels: LabelSet = "pass1";
  let file: string | undefined;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]!;
    if (a === "--labels") {
      const v = argv[++i];
      if (v !== "pass1" && v !== "pass2" && v !== "all") throw new Error("--labels must be pass1, pass2 or all");
      labels = v;
    } else if (a.startsWith("--")) throw new Error(`unknown option ${a}`);
    else file = a;
  }
  if (labels === "all" && file) throw new Error("--labels all reads both runs; do not pass a results.json");
  return { labels, file };
}

async function evaluateRun(file: string, labels: ReviewedPair[], tag: string) {
  const data = (await Bun.file(file).json()) as { pairs: PairRow[] };
  const stored: Ranking = { name: `${tag}: stored order`, order: data.pairs.map((p) => p.pairKey), excluded: [] };
  const reranked = VARIANTS.map(([name, w]) => ({ name: `${tag}: ${name}`, ...rerank(data.pairs, w) }));
  return { summaries: [summarize(stored, labels), ...reranked.map((r) => summarize(r, labels))], reranked };
}

if (import.meta.main) {
  const args = parseArgs(process.argv.slice(2));
  const runFile = (pass: 1 | 2) => join(import.meta.dir, REVIEW_RUNS[pass]);
  if (args.labels !== "all") {
    const pass = args.labels === "pass1" ? 1 : 2;
    const labels = pass === 1 ? PASS1_REVIEWED : PASS2_REVIEWED;
    const { summaries } = await evaluateRun(args.file ?? runFile(pass), labels, args.labels);
    for (const s of summaries) console.log(JSON.stringify(pass === 1 ? { ...s, name: s.name.replace(/^pass1: /, "").replace("stored order", "stored order (pass 1)") } : s));
  } else {
    const one = await evaluateRun(runFile(1), PASS1_REVIEWED, "pass1");
    const two = await evaluateRun(runFile(2), PASS2_REVIEWED, "pass2");
    for (const s of [...one.summaries, ...two.summaries]) console.log(JSON.stringify(s));
    VARIANTS.forEach(([name], i) => {
      const scored: [Verdict, number][] = [];
      for (const [labels, r] of [[PASS1_REVIEWED, one.reranked[i]!], [PASS2_REVIEWED, two.reranked[i]!]] as const)
        for (const l of labels) {
          const risk = r.risk?.get(l.pairKey);
          if (risk !== undefined) scored.push([l.verdict, risk]);
        }
      const count = (v: Verdict) => scored.filter(([x]) => x === v).length;
      console.log(
        JSON.stringify({
          name: `pooled: ${name}`,
          labels: { confirmed: count("confirmed"), refuted: count("refuted"), unsourced: count("unsourced"), supported: count("supported") },
          aucProblem: pooledAuc(scored, (v) => v === "confirmed" || v === "unsourced"),
          aucConfirmed: pooledAuc(scored, (v) => v === "confirmed"),
        }),
      );
    });
  }
}

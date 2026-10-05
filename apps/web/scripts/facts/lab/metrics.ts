/**
 * Ranking metrics for the fact-check lab. A higher score means "more likely a problem". Every function takes items
 * with a score and a boolean label, and sorts by score (high first) with the item id as tie-break, so results do not
 * depend on input order.
 */

export type Scored = { id: string; score: number; positive: boolean };

const ranked = (xs: Scored[]) => [...xs].sort((a, b) => b.score - a.score || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));

/** Area under the ROC curve: the chance that a random positive scores above a random negative. Ties count half. */
export function auc(xs: Scored[]): number {
  const pos = xs.filter((x) => x.positive).map((x) => x.score);
  const neg = xs.filter((x) => !x.positive).map((x) => x.score);
  if (!pos.length || !neg.length) return NaN;
  let wins = 0;
  for (const a of pos) for (const b of neg) wins += a > b ? 1 : a === b ? 0.5 : 0;
  return wins / (pos.length * neg.length);
}

/** Average precision: the mean of precision@k over the ranks k where a positive appears. */
export function averagePrecision(xs: Scored[]): number {
  const order = ranked(xs);
  const total = order.filter((x) => x.positive).length;
  if (!total) return NaN;
  let hits = 0;
  let sum = 0;
  order.forEach((x, i) => {
    if (!x.positive) return;
    hits++;
    sum += hits / (i + 1);
  });
  return sum / total;
}

/** Share of the items in `target` that rank in the top k of all `xs`. */
export function recallAtK(xs: Scored[], target: (id: string) => boolean, k: number): number {
  const all = xs.filter((x) => target(x.id)).length;
  if (!all) return NaN;
  return ranked(xs).slice(0, k).filter((x) => target(x.id)).length / all;
}

/** Deterministic PRNG (mulberry32), so a bootstrap gives the same interval on every run. */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A resample of indices 0..n-1 with replacement. */
const resample = (n: number, next: () => number) => Array.from({ length: n }, () => Math.floor(next() * n));

/**
 * Percentile bootstrap interval for a metric: resample the items with replacement `n` times and take the 2.5% and
 * 97.5% quantiles. Resamples where the metric is NaN (no positive or no negative) are skipped. Resampled items get a
 * suffix on their id, so duplicates keep a stable tie-break.
 */
export function bootstrapCi(xs: Scored[], metric: (xs: Scored[]) => number, n = 2000, seed = 1): { lo: number; hi: number } {
  const next = rng(seed);
  const vals: number[] = [];
  for (let r = 0; r < n; r++) {
    const v = metric(resample(xs.length, next).map((i, j) => ({ ...xs[i]!, id: `${xs[i]!.id}~${j}` })));
    if (!Number.isNaN(v)) vals.push(v);
  }
  vals.sort((a, b) => a - b);
  const q = (p: number) => vals[Math.min(vals.length - 1, Math.max(0, Math.floor(p * vals.length)))]!;
  return { lo: q(0.025), hi: q(0.975) };
}

/**
 * Paired bootstrap: the share of resamples where config A's metric beats config B's on the same items. `a` and `b`
 * must hold the same ids and labels. Ties count half.
 */
export function pairedBootstrap(a: Scored[], b: Scored[], metric: (xs: Scored[]) => number, n = 2000, seed = 1): number {
  const bById = new Map(b.map((x) => [x.id, x]));
  const pairs = a.map((x) => {
    const y = bById.get(x.id);
    if (!y || y.positive !== x.positive) throw new Error(`pairedBootstrap: ${x.id} is missing or has another label in B`);
    return [x, y] as const;
  });
  if (pairs.length !== b.length) throw new Error("pairedBootstrap: A and B have different items");
  const next = rng(seed);
  let wins = 0;
  let used = 0;
  for (let r = 0; r < n; r++) {
    const idx = resample(pairs.length, next);
    const ma = metric(idx.map((i, j) => ({ ...pairs[i]![0], id: `${pairs[i]![0].id}~${j}` })));
    const mb = metric(idx.map((i, j) => ({ ...pairs[i]![1], id: `${pairs[i]![1].id}~${j}` })));
    if (Number.isNaN(ma) || Number.isNaN(mb)) continue;
    used++;
    wins += ma > mb ? 1 : ma === mb ? 0.5 : 0;
  }
  return used ? wins / used : NaN;
}

export const round3 = (x: number) => (Number.isNaN(x) ? NaN : Math.round(x * 1000) / 1000);

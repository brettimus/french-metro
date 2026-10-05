/**
 * Ranking metrics for the fact-check lab. A higher score means "more likely a problem". Every function takes items
 * with a score and a boolean label. Items with equal scores are one group: no metric depends on the item ids or on
 * the input order. (The baseline risk has many ties: 57 distinct scores on 165 dev items.)
 */

export type Scored = { id: string; score: number; positive: boolean };

/** Area under the ROC curve: the chance that a random positive scores above a random negative. Ties count half. */
export function auc(xs: Scored[]): number {
  const pos = xs.filter((x) => x.positive).map((x) => x.score);
  const neg = xs.filter((x) => !x.positive).map((x) => x.score);
  if (!pos.length || !neg.length) return NaN;
  let wins = 0;
  for (const a of pos) for (const b of neg) wins += a > b ? 1 : a === b ? 0.5 : 0;
  return wins / (pos.length * neg.length);
}

/** Groups of equal score, highest score first. */
function tieGroups(xs: Scored[]): Scored[][] {
  const order = [...xs].sort((a, b) => b.score - a.score);
  const groups: Scored[][] = [];
  for (const x of order) {
    const last = groups[groups.length - 1];
    if (last && last[0]!.score === x.score) last.push(x);
    else groups.push([x]);
  }
  return groups;
}

/**
 * Average precision with one threshold per distinct score: the sum over thresholds of (gain in recall) x (precision
 * at that threshold), as in scikit-learn's average_precision_score. A tie group counts as one step, so its positives
 * get the precision of the whole group.
 */
export function averagePrecision(xs: Scored[]): number {
  const total = xs.filter((x) => x.positive).length;
  if (!total) return NaN;
  let seen = 0;
  let hits = 0;
  let sum = 0;
  for (const g of tieGroups(xs)) {
    const pos = g.filter((x) => x.positive).length;
    seen += g.length;
    hits += pos;
    sum += (pos / total) * (hits / seen);
  }
  return sum;
}

/**
 * Share of the items in `target` that rank in the top k of all `xs`. A tie group that crosses rank k counts with the
 * share of its places that fall inside the top k (the expected value under a random order of the ties).
 */
export function recallAtK(xs: Scored[], target: (id: string) => boolean, k: number): number {
  const all = xs.filter((x) => target(x.id)).length;
  if (!all) return NaN;
  let left = k;
  let found = 0;
  for (const g of tieGroups(xs)) {
    if (left <= 0) break;
    const take = Math.min(left, g.length);
    found += (g.filter((x) => target(x.id)).length * take) / g.length;
    left -= take;
  }
  return found / all;
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
 * suffix on their id, so ids stay unique.
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

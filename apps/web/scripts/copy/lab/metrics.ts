/** Agreement metrics for the copy lab. Levels are integers 1..L. */

/**
 * Quadratic-weighted Cohen's kappa between two raters on levels 1..L.
 * Returns undefined when the expected disagreement is 0 (both raters give one and the same level to every item).
 * When one rater gives one level to every item, kappa is 0.
 */
export function quadraticKappa(a: number[], b: number[], levels: number): number | undefined {
  if (a.length !== b.length) throw new Error("kappa: length mismatch");
  const n = a.length;
  if (n === 0) return undefined;
  const w = (i: number, j: number) => ((i - j) * (i - j)) / ((levels - 1) * (levels - 1));
  const ha = new Array<number>(levels).fill(0);
  const hb = new Array<number>(levels).fill(0);
  let observed = 0;
  for (let k = 0; k < n; k++) {
    const i = a[k]! - 1;
    const j = b[k]! - 1;
    if (i < 0 || i >= levels || j < 0 || j >= levels) throw new Error(`kappa: level out of range (${a[k]}, ${b[k]})`);
    ha[i]!++;
    hb[j]!++;
    observed += w(i, j);
  }
  let expected = 0;
  for (let i = 0; i < levels; i++) for (let j = 0; j < levels; j++) expected += (w(i, j) * ha[i]! * hb[j]!) / n;
  if (expected === 0) return undefined;
  return 1 - observed / expected;
}

/** Average ranks (ties share the mean rank). */
function ranks(xs: number[]): number[] {
  const idx = xs.map((x, i) => [x, i] as const).sort((p, q) => p[0] - q[0]);
  const r = new Array<number>(xs.length);
  for (let s = 0; s < idx.length; ) {
    let e = s;
    while (e + 1 < idx.length && idx[e + 1]![0] === idx[s]![0]) e++;
    for (let k = s; k <= e; k++) r[idx[k]![1]] = (s + e) / 2 + 1;
    s = e + 1;
  }
  return r;
}

/** Spearman rank correlation; undefined when either side is constant. */
export function spearman(a: number[], b: number[]): number | undefined {
  if (a.length !== b.length) throw new Error("spearman: length mismatch");
  if (a.length < 2) return undefined;
  const ra = ranks(a);
  const rb = ranks(b);
  const mean = (xs: number[]) => xs.reduce((s, x) => s + x, 0) / xs.length;
  const ma = mean(ra);
  const mb = mean(rb);
  let num = 0;
  let da = 0;
  let db = 0;
  for (let i = 0; i < ra.length; i++) {
    num += (ra[i]! - ma) * (rb[i]! - mb);
    da += (ra[i]! - ma) ** 2;
    db += (rb[i]! - mb) ** 2;
  }
  if (da === 0 || db === 0) return undefined;
  return num / Math.sqrt(da * db);
}

export type DimAgreement = {
  n: number;
  /** "qwk" normally; "spearman" when kappa is undefined and Spearman is not; "none" when neither is defined. */
  metric: "qwk" | "spearman" | "none";
  value: number | undefined;
  qwk: number | undefined;
  spearman: number | undefined;
  exact: number;
  within1: number;
  /** Mean of (Jev level - label level). */
  bias: number;
};

export function dimAgreement(labels: number[], preds: number[], levels: number): DimAgreement {
  const n = labels.length;
  const qwk = quadraticKappa(labels, preds, levels);
  const rho = spearman(labels, preds);
  const metric = qwk !== undefined ? "qwk" : rho !== undefined ? "spearman" : "none";
  const frac = (f: (i: number) => boolean) => (n ? labels.filter((_, i) => f(i)).length / n : 0);
  return {
    n,
    metric,
    value: metric === "qwk" ? qwk : metric === "spearman" ? rho : undefined,
    qwk,
    spearman: rho,
    exact: frac((i) => labels[i] === preds[i]),
    within1: frac((i) => Math.abs(labels[i]! - preds[i]!) <= 1),
    bias: n ? labels.reduce((s, l, i) => s + (preds[i]! - l), 0) / n : 0,
  };
}

export type BinaryCounts = { tp: number; fp: number; fn: number; tn: number };

export function f1(c: BinaryCounts): { precision: number | undefined; recall: number | undefined; f1: number | undefined } {
  const precision = c.tp + c.fp ? c.tp / (c.tp + c.fp) : undefined;
  const recall = c.tp + c.fn ? c.tp / (c.tp + c.fn) : undefined;
  const f = c.tp + c.fp + c.fn ? (2 * c.tp) / (2 * c.tp + c.fp + c.fn) : undefined;
  return { precision, recall, f1: f };
}

/** Level 1..L from a normalised 0..1 value (1 = best), as the evaluator stores dims. */
export const toLevel = (norm: number, levels: number) => 1 + Math.round(Math.max(0, Math.min(1, norm)) * (levels - 1));

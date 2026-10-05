/**
 * lrcombo: contra2's signals, combined by a logistic regression instead of fixed weights (plan idea 8). The same
 * requests as contra2 (passage state + whole-source state), so no new Jev calls.
 * Pair features: mean (1 − passage supported), mean (1 − whole-source supported), max of the blended unsupported,
 * max passage contradicted, max no-passage flag, max unmatched-number part, fetch part, Jev error flag.
 * Training: all dev items except the known conflicts, read from the Jev cache only. A dev item is scored by the model
 * fitted without its station (leave-one-station-out, line + station id), so planted copies and their originals stay
 * in the same fold. A val item is scored by the model fitted on all of dev. L2 penalty `LRCOMBO_L2` (default 1).
 * Hypothesis: the hand weights (unsupported 1, contradicted 0.2, small parts 0.1) are not the best mix; a fitted mix
 * can give the whole-source answer, the max over claims and `contradicted` better weights.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { cachedSystemOne, type JevCacheResult } from "../../../jev-cache";
import { jevCacheOptions, jevRequest, toJevAnswer, type JevAnswer, type JevState } from "../../jev";
import { claimRisk, rankPairs, FACTS2_RISK_WEIGHTS, type ClaimRow } from "../../rank";
import { cleanSourceText } from "../../retrieve";
import { cachePath, type SourceDoc } from "../../sources";
import { loadDataset, stateFor, stationKey, type Dataset, type DatasetClaim, type DatasetItem, type DatasetStation } from "../build-dataset";
import type { ItemContext, LabConfig, LabRequest } from "../config";

const NO_PASSAGES: JevAnswer = { ms: 0, cached: false, error: "no passages retrieved" };
const sha1 = (s: string) => createHash("sha1").update(s).digest("hex");

const docCache = new Map<string, string>();
function sourceText(ds: Dataset, url: string): string | undefined {
  const meta = ds.sources[url];
  if (!meta || meta.status !== "ok") return undefined;
  let clean = docCache.get(url);
  if (clean === undefined) {
    const doc = JSON.parse(readFileSync(cachePath(url), "utf8")) as SourceDoc;
    clean = cleanSourceText(doc.text);
    if (sha1(clean) !== meta.textSha1) throw new Error(`source text for ${url} changed since dataset.json was built`);
    docCache.set(url, clean);
  }
  return clean;
}

function wholeState(ds: Dataset, item: DatasetItem, claim: DatasetClaim): JevState | undefined {
  const station = ds.stations[stationKey(item.pass as 1 | 2, item.lineId, item.stationId)]!;
  const base = stateFor(ds, item, claim);
  const passages: JevState["passages"] = [];
  for (const { url } of station.urls) {
    const text = sourceText(ds, url);
    if (!text) continue;
    const title = ds.sources[url]?.title;
    passages.push({ id: `s${passages.length + 1}`, source: `${new URL(url).host}${title ? `: ${title}` : ""}`, text });
  }
  return passages.length ? { ...base, passages } : undefined;
}

const WEIGHTS = { ...FACTS2_RISK_WEIGHTS, contradicted: 0.2 };
const L2 = Number(process.env.LRCOMBO_L2 ?? "1");

function requests(ds: Dataset, item: DatasetItem, claim: DatasetClaim): LabRequest[] {
  if (!claim.passages.length) return [];
  const reqs: LabRequest[] = [];
  const passageState = stateFor(ds, item, claim);
  const { dir: _d0, ...passageCache } = jevCacheOptions(passageState);
  reqs.push({ req: jevRequest(passageState), cache: passageCache });
  const whole = wholeState(ds, item, claim);
  if (whole) reqs.push({ req: jevRequest(whole) });
  return reqs;
}

/** Pair features, or `excluded` for a known conflict. */
function features(ds: Dataset, item: DatasetItem, station: DatasetStation, claims: ItemContext["claims"]): { x: number[]; excluded?: string } {
  const per = claims.map(({ claim, results }) => {
    const passageAnswer = results[0] ? toJevAnswer(results[0]) : NO_PASSAGES;
    const wholeAnswer = results[1] ? toJevAnswer(results[1]) : undefined;
    const pOk = !passageAnswer.error && passageAnswer.supported !== undefined;
    const wOk = !!wholeAnswer && !wholeAnswer.error && wholeAnswer.supported !== undefined;
    const pSup = pOk ? passageAnswer.supported! : wOk ? wholeAnswer!.supported! : 0;
    const wSup = wOk ? wholeAnswer!.supported! : pSup;
    const jev: JevAnswer = pOk ? { ...passageAnswer, supported: (pSup + wSup) / 2 } : wOk ? wholeAnswer! : passageAnswer;
    const passages = claim.passages.map((p) => ({ id: p.id, score: p.score, ...ds.passages[p.ref]! }));
    const { risk, parts } = claimRisk({ unmatched: claim.numbers.filter((m) => !m.matched), passages, jev, fetchFailure: station.fetchFailure }, WEIGHTS);
    const row = { id: claim.id, pairKey: item.pairKey, lineId: item.lineId, stationId: item.stationId, field: item.field, locale: claim.locale, text: claim.text, risk, riskParts: parts } as unknown as ClaimRow;
    return { row, pSup, wSup, contra: pOk ? (passageAnswer.contradicted ?? 0) : 0, parts };
  });
  const { excluded } = rankPairs(per.map((p) => p.row), WEIGHTS);
  const mean = (f: (p: (typeof per)[number]) => number) => per.reduce((s, p) => s + f(p), 0) / per.length;
  const max = (f: (p: (typeof per)[number]) => number) => Math.max(...per.map(f));
  const x = [
    mean((p) => 1 - p.pSup),
    mean((p) => 1 - p.wSup),
    max((p) => 1 - (p.pSup + p.wSup) / 2),
    max((p) => p.contra),
    max((p) => (p.parts.noPassage ? 1 : 0)),
    max((p) => (p.parts.numbers ?? 0) / FACTS2_RISK_WEIGHTS.unmatchedNumberCap),
    station.fetchFailure,
    max((p) => (p.parts.jevError ? 1 : 0)),
  ];
  return { x, excluded: excluded.length ? `known conflict: ${excluded[0]!.conflict.note.slice(0, 60)}` : undefined };
}

/** L2-regularized logistic regression on standardized features (Newton steps); returns a scorer for raw features. */
function fitLogistic(X: number[][], y: number[], l2: number): (x: number[]) => number {
  const d = X[0]!.length;
  const mu = Array.from({ length: d }, (_, j) => X.reduce((s, r) => s + r[j]!, 0) / X.length);
  const sd = Array.from({ length: d }, (_, j) => Math.sqrt(X.reduce((s, r) => s + (r[j]! - mu[j]!) ** 2, 0) / X.length) || 1);
  const Z = X.map((r) => [1, ...r.map((v, j) => (v - mu[j]!) / sd[j]!)]);
  const D = d + 1;
  let w = new Array(D).fill(0);
  for (let it = 0; it < 50; it++) {
    const g = new Array(D).fill(0);
    const H = Array.from({ length: D }, () => new Array(D).fill(0));
    Z.forEach((z, i) => {
      const p = 1 / (1 + Math.exp(-z.reduce((s, v, j) => s + v * w[j], 0)));
      for (let a = 0; a < D; a++) {
        g[a] += (p - y[i]!) * z[a]!;
        for (let b = 0; b < D; b++) H[a]![b] += p * (1 - p) * z[a]! * z[b]!;
      }
    });
    for (let a = 1; a < D; a++) {
      g[a] += l2 * w[a];
      H[a]![a] += l2;
    }
    const step = solve(H, g);
    w = w.map((v, j) => v - step[j]!);
    if (Math.max(...step.map(Math.abs)) < 1e-8) break;
  }
  return (x) => [1, ...x.map((v, j) => (v - mu[j]!) / sd[j]!)].reduce((s, v, j) => s + v * w[j], 0);
}

function solve(A: number[][], b: number[]): number[] {
  const n = b.length;
  const M = A.map((r, i) => [...r, b[i]!]);
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r]![c]!) > Math.abs(M[p]![c]!)) p = r;
    [M[c], M[p]] = [M[p]!, M[c]!];
    for (let r = 0; r < n; r++) {
      if (r === c || M[c]![c] === 0) continue;
      const f = M[r]![c]! / M[c]![c]!;
      for (let k = c; k <= n; k++) M[r]![k] = M[r]![k]! - f * M[c]![k]!;
    }
  }
  return M.map((r, i) => (r[i] ? r[n]! / r[i]! : 0));
}

// Training table: all dev items, from the cache only (no client).
const ds0 = loadDataset();
const fold = (item: DatasetItem) => `${item.lineId}/${item.stationId}`;
const train: { fold: string; x: number[]; y: number }[] = [];
for (const item of ds0.items.filter((i) => i.split === "dev")) {
  const station = ds0.stations[stationKey(item.pass, item.lineId, item.stationId)]!;
  const claims: ItemContext["claims"] = [];
  for (const claim of [...item.en, ...item.fr]) {
    const results: JevCacheResult[] = [];
    for (const r of requests(ds0, item, claim)) results.push(await cachedSystemOne(undefined, r.req, r.cache));
    claims.push({ claim, results });
  }
  const f = features(ds0, item, station, claims);
  if (!f.excluded) train.push({ fold: fold(item), x: f.x, y: item.problem ? 1 : 0 });
}
const models = new Map<string, (x: number[]) => number>();
function modelFor(key: string) {
  let m = models.get(key);
  if (!m) {
    const rows = train.filter((r) => r.fold !== key);
    m = fitLogistic(rows.map((r) => r.x), rows.map((r) => r.y), L2);
    models.set(key, m);
  }
  return m;
}
if (process.env.LRCOMBO_PRINT) {
  const all = train;
  const d = all[0]!.x.length;
  const mu = Array.from({ length: d }, (_, j) => all.reduce((s, r) => s + r.x[j]!, 0) / all.length);
  console.log("train", all.length, "pos", all.filter((r) => r.y).length, "means", mu.map((v) => v.toFixed(3)).join(" "));
  const m = modelFor("__all__");
  console.log("score at means", m(mu).toFixed(3));
  for (let j = 0; j < d; j++) {
    const x1 = [...mu];
    x1[j] = mu[j]! + 0.1;
    console.log("feature", j, "slope per +0.1", (m(x1) - m(mu)).toFixed(3));
  }
}

const config: LabConfig = {
  name: "lrcombo",
  description: "contra2 signals combined by a leave-one-station-out logistic regression fitted on dev",
  requests: ({ ds, item, claim }) => requests(ds, item, claim),
  score({ ds, item, station, claims }) {
    const f = features(ds, item, station, claims);
    if (f.excluded) return { risk: 0, excluded: f.excluded };
    return { risk: modelFor(item.split === "dev" && !process.env.LRCOMBO_INSAMPLE ? fold(item) : "__all__")(f.x) };
  },
};

export default config;

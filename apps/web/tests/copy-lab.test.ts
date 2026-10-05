import { describe, expect, test } from "bun:test";
import { checkTestGuard, computeMetrics, errorReport, TSV_HEADER, type UnitOutcome } from "../scripts/copy/lab/harness";
import { loadDataset, splitRound3, type DatasetPair, type DatasetUnit } from "../scripts/copy/lab/dataset";
import { dimAgreement, quadraticKappa, spearman, toLevel } from "../scripts/copy/lab/metrics";
import { PLANTED } from "../scripts/copy/lab/planted";

describe("copy lab metrics", () => {
  test("quadratic kappa matches values computed by hand", () => {
    expect(quadraticKappa([1, 2, 3], [1, 2, 3], 3)).toBe(1);
    // Two levels, independent marginals: observed = expected disagreement.
    expect(quadraticKappa([1, 1, 2, 2], [1, 2, 1, 2], 2)).toBe(0);
    // O = 1/9 over 4 items; E = 48/36 (see the test notes): kappa = 1 - (1/9)/(4/3) = 11/12.
    expect(quadraticKappa([1, 2, 3, 4], [1, 2, 4, 4], 4)).toBeCloseTo(11 / 12, 10);
  });

  test("kappa is undefined when both raters are constant, 0 when one is", () => {
    expect(quadraticKappa([4, 4, 4], [4, 4, 4], 4)).toBeUndefined();
    expect(quadraticKappa([4, 4, 4], [3, 4, 2], 4)).toBe(0);
  });

  test("spearman", () => {
    expect(spearman([1, 2, 3], [3, 2, 1])).toBeCloseTo(-1, 10);
    expect(spearman([1, 2, 2, 3], [1, 2, 2, 3])).toBeCloseTo(1, 10);
    expect(spearman([2, 2, 2], [1, 2, 3])).toBeUndefined();
  });

  test("dimAgreement falls back to spearman, then none", () => {
    expect(dimAgreement([1, 2, 3], [1, 2, 3], 3).metric).toBe("qwk");
    expect(dimAgreement([4, 4], [4, 4], 4).metric).toBe("none");
    const a = dimAgreement([1, 2, 4], [2, 2, 4], 4);
    expect(a.exact).toBeCloseTo(2 / 3, 10);
    expect(a.within1).toBe(1);
    expect(a.bias).toBeCloseTo(1 / 3, 10);
  });

  test("toLevel", () => {
    expect(toLevel(0, 4)).toBe(1);
    expect(toLevel(2 / 3, 4)).toBe(3);
    expect(toLevel(1, 3)).toBe(3);
  });
});

describe("copy lab dataset", () => {
  const ds = loadDataset();

  test("sizes", () => {
    const count = (xs: { split: string; source: string }[], split: string, source: string) => xs.filter((x) => x.split === split && x.source === source).length;
    expect(count(ds.units, "dev", "calibration")).toBe(68);
    expect(count(ds.units, "dev", "round3")).toBe(40);
    expect(count(ds.units, "test", "round3")).toBe(40);
    expect(count(ds.units, "dev", "planted")).toBe(15);
    expect(count(ds.units, "test", "planted")).toBe(15);
    expect(count(ds.pairs, "dev", "calibration")).toBe(34);
    expect(count(ds.pairs, "dev", "round3")).toBe(20);
    expect(count(ds.pairs, "test", "round3")).toBe(20);
    expect(ds.units.filter((d) => d.source === "calibration" && d.labels.dims.S7 !== undefined)).toHaveLength(0);
  });

  test("the split is stable and no pair is in both splits", () => {
    const r3 = ds.pairs.filter((p) => p.source === "round3");
    const split = splitRound3(r3.map((p) => p.pairId));
    for (const p of r3) expect(p.split).toBe(split.get(p.pairId)!);
    for (const p of ds.pairs.filter((x) => x.source === "calibration")) expect(p.split).toBe("dev");
    const splitOf = new Map<string, Set<string>>();
    for (const d of ds.units) splitOf.set(d.unit.pairId, (splitOf.get(d.unit.pairId) ?? new Set()).add(d.split));
    for (const [, s] of splitOf) expect(s.size).toBe(1);
    const devStations = new Set(ds.units.filter((d) => d.split === "dev").map((d) => d.unit.stationId));
    expect(ds.units.filter((d) => d.split === "test" && d.unit.stationId && devStations.has(d.unit.stationId))).toHaveLength(0);
  });

  test("planted units: one per entry, clean source, labelled with the planted tell only", () => {
    const planted = ds.units.filter((d) => d.source === "planted");
    expect(planted).toHaveLength(PLANTED.length);
    for (const d of planted) {
      expect(d.labels.tells).toEqual([d.planted!.tell]);
      expect(Object.keys(d.labels.dims)).toHaveLength(0);
      const src = ds.units.find((x) => x.key === d.planted!.from)!;
      expect(src.labels.tells).toEqual([]);
      expect(src.split).toBe(d.split);
    }
  });
});

describe("copy lab guards", () => {
  const tsv = TSV_HEADER.join("\t") + "\n";
  const row = (config: string, split: string) => ["t", config, "sha", split].join("\t");

  test("test split needs --final, runs once per config, and never prints per-item labels", () => {
    expect(() => checkTestGuard({ config: "a", split: "test", final: false, errors: 0 }, tsv)).toThrow("--final");
    expect(() => checkTestGuard({ config: "a", split: "test", final: true, errors: 5 }, tsv)).toThrow("leak guard");
    expect(() => checkTestGuard({ config: "a", split: "test", final: true, errors: 0 }, tsv + row("a", "test"))).toThrow("already");
    expect(() => checkTestGuard({ config: "a", split: "test", final: true, errors: 0 }, tsv + row("a", "dev") + "\n" + row("b", "test"))).not.toThrow();
    expect(() => checkTestGuard({ config: "a", split: "dev", final: false, errors: 5 }, tsv)).not.toThrow();
  });

  test("errorReport refuses the test split", () => {
    expect(() => errorReport("test", { units: [], pairs: [] }, [], 5)).toThrow("leak guard");
  });
});

describe("copy lab computeMetrics", () => {
  const unit = (id: string, pairId: string): DatasetUnit["unit"] => ({ id, pairId, kind: "station", field: "etymology", locale: id.endsWith("/fr") ? "fr" : "en", text: "", wordCount: 0 });
  const item = (key: string, dims: Record<string, number>, tells: string[], planted?: DatasetUnit["planted"]): DatasetUnit => ({
    key,
    split: "dev",
    source: planted ? "planted" : "round3",
    corpus: "current",
    unit: unit(key.split("~")[0]!, "p"),
    labels: { dims, tells },
    planted,
  });

  test("dims, pair dims from the EN unit, tells and planted recall", () => {
    const outcomes: UnitOutcome[] = [
      { item: item("p/en", { S1: 4, S3: 2 }, ["t2_inflated"]), assessment: { levels: { S1: 4, S3: 2, S6: 3 }, tells: ["t2_inflated", "t4_praise"] } },
      { item: item("p/fr", { S1: 2, S3: 4 }, []), assessment: { levels: { S1: 2, S3: 4, S6: 1 }, tells: [] } },
      { item: item("p/en~t5_neg_parallel", {}, ["t5_neg_parallel"], { tell: "t5_neg_parallel", from: "p/en" }), assessment: { levels: { S1: 1 }, tells: ["t5_neg_parallel"] } },
    ];
    const pairs: DatasetPair[] = [{ pairId: "p", split: "dev", source: "round3", corpus: "current", labels: { dims: { S6: 3 } } }];
    const m = computeMetrics({ pairs }, outcomes, "dev");
    expect(m.dims.S1!.n).toBe(2); // the planted unit's levels are not compared
    expect(m.dims.S1!.qwk).toBe(1);
    expect(m.dims.S6!.n).toBe(1);
    expect(m.dims.S6!.exact).toBe(1);
    expect(m.fallbacks.S6).toBe("none");
    expect(m.primaryDims).toEqual(["S1", "S3"]);
    expect(m.primary).toBe(1);
    expect(m.tellF1Real).toMatchObject({ tp: 1, fp: 1, fn: 0 });
    expect(m.tellF1All).toMatchObject({ tp: 2, fp: 1, fn: 0 });
    expect(m.planted).toMatchObject({ n: 1, found: 1, recall: 1 });
  });
});

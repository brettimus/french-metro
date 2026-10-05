import { afterAll, describe, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadDataset, splitOf, stateFor } from "../scripts/facts/lab/build-dataset";
import { parseArgs, selectItems, TSV_HEADER, valAlreadyRun } from "../scripts/facts/lab/harness";
import { auc, averagePrecision, bootstrapCi, pairedBootstrap, recallAtK, type Scored } from "../scripts/facts/lab/metrics";
import { PLANTED } from "../scripts/facts/lab/planted";
import { ALL_REVIEWED } from "../scripts/facts/reviewed";

const s = (id: string, score: number, positive: boolean): Scored => ({ id, score, positive });

describe("lab metrics", () => {
  // Ranking: a(+) 0.9, b(-) 0.8, c(+) 0.7, d(-) 0.6, e(+) 0.5.
  const xs = [s("a", 0.9, true), s("b", 0.8, false), s("c", 0.7, true), s("d", 0.6, false), s("e", 0.5, true)];

  test("AUC: wins over all positive/negative pairs, ties count half", () => {
    // a beats b,d; c beats d; e beats none → 3 of 6.
    expect(auc(xs)).toBe(0.5);
    expect(auc([s("p", 0.5, true), s("n", 0.5, false)])).toBe(0.5);
    expect(auc([s("p", 1, true), s("n", 0, false)])).toBe(1);
    expect(auc([s("p", 1, true)])).toBeNaN();
  });

  test("average precision by hand", () => {
    // Positives at ranks 1, 3, 5: (1/1 + 2/3 + 3/5) / 3.
    expect(averagePrecision(xs)).toBeCloseTo((1 + 2 / 3 + 3 / 5) / 3, 12);
    // Ties break by id, so input order does not matter.
    const tied = [s("z", 0.5, true), s("a", 0.5, false)];
    expect(averagePrecision(tied)).toBe(0.5);
    expect(averagePrecision([...tied].reverse())).toBe(0.5);
  });

  test("recall at k", () => {
    expect(recallAtK(xs, (id) => id === "a" || id === "e", 3)).toBe(0.5);
    expect(recallAtK(xs, (id) => id === "c", 2)).toBe(0);
    expect(recallAtK(xs, () => false, 2)).toBeNaN();
  });

  test("bootstrap is deterministic, brackets the estimate, and a paired run against itself is 0.5", () => {
    const many = Array.from({ length: 60 }, (_, i) => s(`x${i}`, (i * 37) % 60, i % 3 === 0));
    const a = bootstrapCi(many, averagePrecision, 500, 7);
    expect(bootstrapCi(many, averagePrecision, 500, 7)).toEqual(a);
    const ap = averagePrecision(many);
    expect(a.lo).toBeLessThanOrEqual(ap);
    expect(a.hi).toBeGreaterThanOrEqual(ap);
    expect(pairedBootstrap(many, many, averagePrecision, 200)).toBe(0.5);
    const perfect = many.map((x) => ({ ...x, score: x.positive ? 1 : 0 }));
    expect(pairedBootstrap(perfect, many, averagePrecision, 200)).toBe(1);
  });
});

describe("lab dataset", () => {
  const ds = loadDataset();

  test("has every review label once, with its verdict, plus 40 planted errors", () => {
    const real = ds.items.filter((i) => !i.planted);
    expect(real.map((i) => `${i.pass}/${i.pairKey}:${i.verdict}`).sort()).toEqual(ALL_REVIEWED.map((l) => `${l.pass}/${l.pairKey}:${l.verdict}`).sort());
    const planted = ds.items.filter((i) => i.planted);
    expect(planted).toHaveLength(40);
    expect(PLANTED).toHaveLength(40);
    for (const p of planted) {
      expect(p.verdict).toBe("confirmed");
      expect(p.problem).toBe(true);
      const from = ds.items.find((i) => i.id === p.planted!.from)!;
      expect(from.verdict).toBe("supported");
      expect(p.split).toBe(from.split);
      const edited = [...p.en, ...p.fr].filter((c) => c.edited);
      expect(edited.map((c) => c.locale).sort()).toEqual(["en", "fr"]);
      for (const c of edited) expect(c.jev).toBeUndefined();
    }
  });

  test("split: val when sha1(stationId) % 10 < 3; the val station set is frozen", () => {
    for (const i of ds.items) expect(i.split).toBe(splitOf(i.stationId));
    const val = [...new Set(ds.items.filter((i) => i.split === "val").map((i) => i.stationId))].sort();
    expect(val).toHaveLength(25);
    expect(createHash("sha1").update(val.join("\n")).digest("hex")).toBe("bac83bf5f37670a4ef506e989d34ae08b0301a6d");
    expect(ds.counts).toEqual({
      dev: { items: 167, confirmed: 13, refuted: 5, unsourced: 38, supported: 84, planted: 27 },
      val: { items: 53, confirmed: 3, refuted: 2, unsourced: 11, supported: 24, planted: 13 },
    });
  });

  test("passages resolve, and the rebuilt Jev state names the source", () => {
    for (const i of ds.items) for (const c of [...i.en, ...i.fr]) for (const p of c.passages) expect(ds.passages[p.ref]).toBeDefined();
    const item = ds.items.find((i) => i.id === "1/9/robespierre/context/2")!;
    const state = stateFor(ds, item, item.en[0]!);
    expect(state.claim).toBe(item.en[0]!.text);
    expect(state.field).toContain("context");
    expect(state.passages[0]!.source).toMatch(/wikipedia\.org/);
  });

  test("selectItems filters by split, pass and planted", () => {
    expect(selectItems(ds, { split: "dev", planted: true })).toHaveLength(167);
    expect(selectItems(ds, { split: "dev", planted: false })).toHaveLength(140);
    expect(selectItems(ds, { pass: 1, planted: false })).toHaveLength(80);
  });
});

describe("harness guards", () => {
  const dir = mkdtempSync(join(tmpdir(), "fact-lab-"));
  afterAll(() => rmSync(dir, { recursive: true, force: true }));

  test("val needs --final; --final needs val; --parity is for the baseline only", () => {
    expect(() => parseArgs(["--config", "x", "--split", "val"])).toThrow(/--final/);
    expect(() => parseArgs(["--config", "x", "--final"])).toThrow(/only for --split val/);
    expect(() => parseArgs(["--config", "x", "--parity"])).toThrow(/baseline/);
    expect(() => parseArgs(["--config", "x", "--split", "val", "--final", "--no-log"])).toThrow(/always logged/);
    expect(parseArgs(["--config", "x", "--split", "val", "--final"]).split).toBe("val");
    expect(parseArgs(["--config", "x"]).split).toBe("dev");
  });

  test("a config runs on val once: a val row in results.tsv blocks the next run", () => {
    const tsv = join(dir, "results.tsv");
    const row = (config: string, split: string) => TSV_HEADER.map((h) => (h === "config" ? config : h === "split" ? split : "x")).join("\t");
    writeFileSync(tsv, [TSV_HEADER.join("\t"), row("baseline", "dev"), row("other", "val")].join("\n") + "\n");
    expect(valAlreadyRun("baseline", tsv)).toBe(false);
    expect(valAlreadyRun("other", tsv)).toBe(true);
    expect(valAlreadyRun("baseline", join(dir, "missing.tsv"))).toBe(false);
  });
});

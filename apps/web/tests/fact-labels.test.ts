import { describe, expect, test } from "bun:test";
import { pooledAuc } from "../scripts/facts/evaluate";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ALL_REVIEWED, PASS1_REVIEWED, PASS2_REVIEWED, PASS3_NOT_REVIEWED, PASS3_REVIEWED, type ReviewedPair, type Verdict } from "../scripts/facts/reviewed";

const counts = (ls: ReviewedPair[]) => {
  const c: Record<Verdict, number> = { confirmed: 0, refuted: 0, unsourced: 0, supported: 0 };
  for (const l of ls) c[l.verdict]++;
  return c;
};

describe("review labels", () => {
  test("pass 1: 6 confirmed, 3 refuted, 32 unsourced, 39 supported", () => {
    expect(counts(PASS1_REVIEWED)).toEqual({ confirmed: 6, refuted: 3, unsourced: 32, supported: 39 });
  });

  test("pass 2: 10 confirmed, 4 refuted, 17 unsourced, 69 supported (Pont Cardinet is a retrieval miss)", () => {
    expect(counts(PASS2_REVIEWED)).toEqual({ confirmed: 10, refuted: 4, unsourced: 17, supported: 69 });
    expect(PASS2_REVIEWED.filter((l) => l.retrievalMiss).map((l) => [l.pairKey, l.verdict])).toEqual([["14/pont-cardinet/etymology/1", "supported"]]);
  });

  test("pass-2 confirmed problems are at the review ranks in the report", () => {
    expect(PASS2_REVIEWED.filter((l) => l.verdict === "confirmed").map((l) => l.rank)).toEqual([7, 9, 13, 14, 19, 23, 43, 51, 86, 88]);
  });

  test("ranks run 1..n, keys are unique across both passes, every pair has EN or FR text", () => {
    for (const ls of [PASS1_REVIEWED, PASS2_REVIEWED]) expect(ls.map((l) => l.rank)).toEqual(ls.map((_, i) => i + 1));
    expect(ALL_REVIEWED).toHaveLength(180);
    expect(new Set(ALL_REVIEWED.map((l) => l.pairKey)).size).toBe(180);
    for (const l of ALL_REVIEWED) expect(l.en.length + l.fr.length).toBeGreaterThan(0);
    expect(ALL_REVIEWED.filter((l) => l.pass === 2)).toHaveLength(100);
  });
});

describe("pass-3 labels", () => {
  const holdout = JSON.parse(readFileSync(join(import.meta.dir, "../scripts/facts/lab/holdout-pass3.json"), "utf8")) as { pairs: { pairKey: string; en: string[]; fr: string[] }[] };
  const saved = JSON.parse(readFileSync(join(import.meta.dir, "../scripts/facts/lab/labels/pass3.json"), "utf8")) as { verdicts: { pairKey: string; verdict: Verdict; category?: string }[] };

  test("712 pairs: 26 confirmed, 1 refuted, 18 unsourced, 667 supported", () => {
    expect(counts(PASS3_REVIEWED)).toEqual({ confirmed: 26, refuted: 1, unsourced: 18, supported: 667 });
  });

  test("every holdout pair has one verdict, with the holdout texts; no pass-3 text was labelled in pass 1 or 2", () => {
    expect(PASS3_NOT_REVIEWED).toEqual([]);
    expect(PASS3_REVIEWED.map((l) => l.pairKey).sort()).toEqual(holdout.pairs.map((p) => p.pairKey).sort());
    const byKey = new Map(holdout.pairs.map((p) => [p.pairKey, p]));
    for (const l of PASS3_REVIEWED) expect([l.en, l.fr]).toEqual([byKey.get(l.pairKey)!.en, byKey.get(l.pairKey)!.fr]);
    expect(PASS3_REVIEWED.map((l) => l.rank)).toEqual(PASS3_REVIEWED.map((_, i) => i + 1));
    // A pair key can repeat when its text changed after review (see the holdout's selection rule), but not its text.
    const reviewed = new Set(ALL_REVIEWED.map((l) => `${l.pairKey}|${l.en.join(" ")}|${l.fr.join(" ")}`));
    expect(PASS3_REVIEWED.filter((l) => reviewed.has(`${l.pairKey}|${l.en.join(" ")}|${l.fr.join(" ")}`))).toEqual([]);
  });

  test("reviewed.ts matches labels/pass3.json, and every confirmed pair has a category", () => {
    const fromJson = new Map(saved.verdicts.map((v) => [v.pairKey, v]));
    for (const l of PASS3_REVIEWED) {
      expect(l.verdict).toBe(fromJson.get(l.pairKey)!.verdict);
      if (l.verdict === "confirmed") expect(l.category).toBe(fromJson.get(l.pairKey)!.category as ReviewedPair["category"]);
      else expect(l.category).toBeUndefined();
    }
  });
});

describe("pooledAuc", () => {
  test("counts ties as half", () => {
    // Problems at 0.9 and 0.5; negatives at 0.5 and 0.1 → wins 1 + 1 + 0.5 + 1 = 3.5 of 4.
    expect(pooledAuc([["confirmed", 0.9], ["unsourced", 0.5], ["supported", 0.5], ["refuted", 0.1]], (v) => v === "confirmed" || v === "unsourced")).toBe(0.875);
  });
});

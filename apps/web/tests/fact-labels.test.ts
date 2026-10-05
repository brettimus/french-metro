import { describe, expect, test } from "bun:test";
import { pooledAuc } from "../scripts/facts/evaluate";
import { ALL_REVIEWED, PASS1_REVIEWED, PASS2_REVIEWED, type ReviewedPair, type Verdict } from "../scripts/facts/reviewed";

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

describe("pooledAuc", () => {
  test("counts ties as half", () => {
    // Problems at 0.9 and 0.5; negatives at 0.5 and 0.1 → wins 1 + 1 + 0.5 + 1 = 3.5 of 4.
    expect(pooledAuc([["confirmed", 0.9], ["unsourced", 0.5], ["supported", 0.5], ["refuted", 0.1]], (v) => v === "confirmed" || v === "unsourced")).toBe(0.875);
  });
});

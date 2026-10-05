/**
 * The held-out test of the ranker: compares the `facts-2` and `facts-3` risks frozen in lab/holdout-pass3.json with
 * the pass-3 labels (PASS3_REVIEWED). Run it once; do not tune the ranker on its output.
 *
 *   bun apps/web/scripts/facts/lab/holdout-test.ts [--json]
 *
 * Positive class "problem" = confirmed or unsourced; negative = supported or refuted (as in evaluate.ts).
 * Recall@k is for the confirmed pairs only. Precision@k is the share of problems (and of confirmed pairs) in the top
 * k. Ties are one group: a tie group across rank k counts with the share of its places inside the top k.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PASS3_REVIEWED, type ErrorCategory } from "../reviewed";
import { auc, averagePrecision, bootstrapCi, pairedBootstrap, recallAtK, round3, type Scored } from "./metrics";

const RANKERS = ["facts-2", "facts-3"] as const;
type Ranker = (typeof RANKERS)[number];
type HoldoutPair = { pairKey: string; risk: Record<Ranker, number> };

/** Error kinds that a support question on the cited sources cannot see: the fact is in the source, the wording is not. */
export const UNSEEN_CATEGORIES: ErrorCategory[] = ["overstated-wording", "en-fr-mismatch"];

/** Expected count of target items in the top k (ties as in recallAtK). */
function hitsAtK(xs: Scored[], target: (id: string) => boolean, k: number): number {
  const all = xs.filter((x) => target(x.id)).length;
  return all ? recallAtK(xs, target, k) * all : 0;
}

export function holdoutTest(pairs: HoldoutPair[]) {
  const labels = new Map(PASS3_REVIEWED.map((l) => [l.pairKey, l]));
  const missing = pairs.filter((p) => !labels.has(p.pairKey)).map((p) => p.pairKey);
  const isConfirmed = (id: string) => labels.get(id)?.verdict === "confirmed";
  const scored = (ranker: Ranker): Scored[] =>
    pairs
      .filter((p) => labels.has(p.pairKey))
      .map((p) => {
        const v = labels.get(p.pairKey)!.verdict;
        return { id: p.pairKey, score: p.risk[ranker], positive: v === "confirmed" || v === "unsourced" };
      });
  const rows = RANKERS.map((ranker) => {
    const xs = scored(ranker);
    const isProblem = (id: string) => xs.find((x) => x.id === id)!.positive;
    const ci = bootstrapCi(xs, averagePrecision);
    return {
      ranker,
      items: xs.length,
      problems: xs.filter((x) => x.positive).length,
      confirmed: xs.filter((x) => isConfirmed(x.id)).length,
      ap: round3(averagePrecision(xs)),
      apLo: round3(ci.lo),
      apHi: round3(ci.hi),
      auc: round3(auc(xs)),
      confirmedAuc: round3(auc(xs.filter((x) => isConfirmed(x.id) || !x.positive).map((x) => ({ ...x, positive: isConfirmed(x.id) })))),
      confR20: round3(recallAtK(xs, isConfirmed, 20)),
      confR50: round3(recallAtK(xs, isConfirmed, 50)),
      confR100: round3(recallAtK(xs, isConfirmed, 100)),
      probP20: round3(hitsAtK(xs, isProblem, 20) / 20),
      probP50: round3(hitsAtK(xs, isProblem, 50) / 50),
      confP20: round3(hitsAtK(xs, isConfirmed, 20) / 20),
      confP50: round3(hitsAtK(xs, isConfirmed, 50) / 50),
    };
  });
  const pBetter = round3(pairedBootstrap(scored("facts-3"), scored("facts-2"), averagePrecision));
  const confirmed = PASS3_REVIEWED.filter((l) => l.verdict === "confirmed");
  const byCategory: Record<string, number> = {};
  for (const l of confirmed) byCategory[l.category ?? "none"] = (byCategory[l.category ?? "none"] ?? 0) + 1;
  const unseen = confirmed.filter((l) => l.category && UNSEEN_CATEGORIES.includes(l.category)).length;
  return { missing, rows, pBetter, byCategory, unseen, unseenShare: round3(unseen / confirmed.length) };
}

if (import.meta.main) {
  const holdout = JSON.parse(readFileSync(join(import.meta.dir, "holdout-pass3.json"), "utf8")) as { pairs: HoldoutPair[] };
  const r = holdoutTest(holdout.pairs);
  if (process.argv.includes("--json")) console.log(JSON.stringify(r, null, 1));
  else {
    console.log("| Metric | " + r.rows.map((x) => x.ranker).join(" | ") + " |");
    console.log("|---|" + r.rows.map(() => "---").join("|") + "|");
    const line = (name: string, f: (x: (typeof r.rows)[number]) => string | number) => console.log(`| ${name} | ${r.rows.map(f).join(" | ")} |`);
    line("Items / problems / confirmed", (x) => `${x.items} / ${x.problems} / ${x.confirmed}`);
    line("AP (95% interval)", (x) => `${x.ap} (${x.apLo}–${x.apHi})`);
    line("AUC (problem)", (x) => x.auc);
    line("AUC (confirmed vs supported+refuted)", (x) => x.confirmedAuc);
    line("Confirmed recall@20", (x) => x.confR20);
    line("Confirmed recall@50", (x) => x.confR50);
    line("Confirmed recall@100", (x) => x.confR100);
    line("Problem precision@20", (x) => x.probP20);
    line("Problem precision@50", (x) => x.probP50);
    line("Confirmed precision@20", (x) => x.confP20);
    line("Confirmed precision@50", (x) => x.confP50);
    console.log(`\np_better (paired bootstrap, AP facts-3 > facts-2): ${r.pBetter}`);
    console.log(`confirmed by category: ${JSON.stringify(r.byCategory)}`);
    console.log(`in categories Jev cannot see (${UNSEEN_CATEGORIES.join(", ")}): ${r.unseen} (${r.unseenShare})`);
    if (r.missing.length) console.log(`not reviewed: ${r.missing.join(", ")}`);
  }
}

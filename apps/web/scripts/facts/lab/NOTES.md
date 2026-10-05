# Fact lab notes

One entry per loop iteration. Primary = AP on dev (all items); guard = AP on dev with --no-planted.

## Iteration 1: overstated (DISCARD)

- **Hypothesis:** Most pass-2 confirmed problems are wording faults ("only two other stations", "one of the few",
  "several weeks", "shares a pattern with nearby X"). `supported` gives them middle scores (0.06–0.36). A separate
  Noul that asks if the claim says more, or says it more strongly, than the passages could move them up.
- **Change:** `configs/overstated.ts` = baseline + one more request per claim with an `overstated` Noul (criteria
  list qualifiers, superlatives, counts, time spans, comparisons, causes, generalisations). Pair risk = baseline risk
  + 0.5 × max `overstated` over the pair's claims. 340 live requests, 584k tokens, $0.025.
- **Result:** AP 0.840 → 0.842 (p_better 0.65). No planted: 0.709 → 0.713 (p_better 0.76). AUC 0.851 → 0.847
  (no planted 0.792 → 0.786). confR20 unchanged (0 all, 0.077 no planted).
- **Decision:** DISCARD (+0.002, below the +0.01 threshold).
- **Learned:** Jev answers `overstated` high for almost every claim: mean 0.75 on supported, 0.81 on confirmed,
  0.86 on unsourced, 0.91 on planted. Alone it has AUC 0.743 on real problems, and it mostly repeats `supported`
  (it is high where `supported` is low). It does not separate wording faults from supported claims. Jev reads
  "adds something the passages do not state" as "not supported". A wording check must not depend on the passages
  (for example a code feature for "only/first/few/one of" or a passage-free Jev question on the claim), or must ask
  about one qualifier that the claim and the passage both contain.

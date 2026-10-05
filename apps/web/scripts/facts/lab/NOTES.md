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

## Iteration 2: wording (DISCARD)

- **Hypothesis:** Iteration 1 showed that Jev does not find wording faults when it reads the passages. A free code
  feature that does not read the passages can flag them: exclusivity and rarity words (only, few, one of the), vague
  counts (several), "-est" superlatives and comparisons with other places (as at, shares), with French equivalents.
- **Change:** `configs/wording.ts` = baseline + 0.2 when a claim of the pair (EN or FR) matches the word list. No Jev
  calls. Weight chosen before the run.
- **Result:** AP 0.840 → 0.838 (p_better 0.37). No planted: 0.709 → 0.712 (p_better 0.47). AUC 0.851 → 0.832 (no
  planted 0.792 → 0.770). confR20 0 → 0.198 (no planted 0.077 → 0.385).
- **Decision:** DISCARD (AP does not improve by 0.01).
- **Learned:** The flag finds 5 of 13 dev confirmed pairs (all through the EN text) and moves them into the top 20, so
  confirmed recall@20 goes up a lot. But it also flags 6 supported pairs, mostly through French words with a normal
  meaning ("plusieurs décennies", "plus anciens", "sous le seul nom", "l'une des entrées"), and 2 unsourced pairs. The
  flagged supported pairs move above many unsourced and planted problems, so AP and AUC go down. The EN matches alone
  are cleaner (5 confirmed, 3 supported, 1 unsourced). Next tries: EN-only matching, or a smaller weight (0.05–0.1)
  that breaks ties in the middle of the list and does not move supported pairs above high-risk problems. With 13
  confirmed dev pairs, a word list tuned on dev overfits easily; keep the list short and general.

## Iteration 3: meanpair (KEEP)

- **Hypothesis:** In the baseline dev ranking, many supported pairs have one locale with a low `supported` and the
  other high (for example 0.11/0.64, 0.15/0.59, 0.32/0.96): Jev misses the fact in one language. Real problems are
  mostly low in both. The pair takes the max of (1 − `supported`), so one bad locale is enough to rank a supported
  pair high. The mean over the pair's claims uses both answers.
- **Change:** `configs/meanpair.ts` = baseline, but the pair's `unsupported` part is the mean of its claims'
  (1 − `supported`). The other parts (numbers, noPassage, fetch, jevError) still take the max. No new Jev calls.
- **Result:** AP 0.840 → 0.862 (p_better 0.993). No planted: 0.709 → 0.756 (p_better 0.997). AUC 0.851 → 0.888
  (no planted 0.792 → 0.848). confR20 0 → 0 (no planted 0.077 → 0).
- **Decision:** KEEP (+0.022 AP; the guard improves).
- **Learned:** EN/FR disagreement on `supported` is mostly Jev noise on one locale, not a sign of a problem (this
  agrees with pass 1, where `pairDisagreement` pointed to false alarms). Confirmed recall@20 is still 0: the
  confirmed wording faults have middle `supported` values and the top 20 is full of unsourced and planted pairs
  with very low `supported` and unmatched numbers. A production change would be in `rankPairs` (rank.ts); that is
  outside the lab, so it is not done here. Next: other EN/FR combinations (for example a geometric mean, or a mix
  of mean and max), and per-passage checks.

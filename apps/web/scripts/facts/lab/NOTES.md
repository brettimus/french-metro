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

## Iteration 4: ensemble2 (DISCARD)

- **Hypothesis:** Iteration 3 showed that much of the error on supported pairs is noise in one Jev answer. A second
  phrasing of the `supported` question is a second sample, and the mean of the two answers has less noise.
- **Change:** `configs/ensemble2.ts` = meanpair + one more request per claim with a `confirmable` Noul ("Can a reader
  confirm every fact in `claim` using only `passages`?", with "same strength and precision" in the true option). The
  claim's `supported` = mean of `supported` and `confirmable`. Pair scoring as in meanpair. 340 live requests, 574k
  tokens, $0.024.
- **Result:** AP 0.862 → 0.855 (p_better 0.12). No planted: 0.756 → 0.753 (p_better 0.36). AUC 0.888 → 0.887 (no
  planted 0.848 → 0.848). confR20 0 → 0 (no planted 0 → 0).
- **Decision:** DISCARD (AP goes down).
- **Learned:** The second phrasing gives lower values than `supported` on all classes, by about the same amount: mean
  pair score change +0.038 on supported, +0.035 on confirmed, +0.024 on unsourced, +0.04 on refuted, and only +0.007
  on planted (their `supported` is already near 0). So it adds a shift, not new information, and planted errors lose
  a little rank against supported pairs. The noise that meanpair removed comes from the EN/FR claim texts, not from
  the question wording; a second wording on the same claim and passages gives a correlated answer. Ideas that add
  new information (per-passage checks, wording features that do not read the passages, a different state) are more
  promising than more samples of the same question.

## Iteration 5: qualifier (DISCARD)

- **Hypothesis:** Confirmed problems are mostly wording faults (only, few, several, one of, first, comparisons) with
  middle `supported` values. Iteration 1's general `overstated` question repeated `supported`, and iteration 2's
  regex flagged normal French words. A narrow, passage-aware Jev question can do better: it asks only whether the
  claim has such a qualifier that the passages do not state with the same strength, and claims without a qualifier
  must get "false".
- **Change:** `configs/qualifier.ts` = meanpair + 0.25 × the mean over the pair's claims of a `qualifier` Noul (one
  more request per claim, same state). Weight chosen before the run. 339 live requests, 589k tokens, $0.025.
- **Result:** AP 0.862 → 0.868 (p_better 0.49). No planted: 0.756 → 0.756 (p_better 0.37). AUC 0.888 → 0.868 (no
  planted 0.848 → 0.817). confR20 0 → 0 (no planted 0 → 0.231).
- **Decision:** DISCARD (AP gain below 0.01, AUC goes down).
- **Learned:** The question does not repeat `supported` (mean value 0.18 on unsourced, 0.11 on refuted), and it
  finds 5 of 13 confirmed pairs (value > 0.5; mean 0.36 on confirmed). With no planted errors it moves 3 confirmed
  pairs into the top 20. But it also gives > 0.5 to 14 of 84 supported pairs (mean 0.22): many supported claims have
  a real qualifier that the reviewer accepted (the first section, one of several elevated stretches, the only
  platforms not on a curve, a single name) and Jev cannot tell that the passages state it. So the signal is a
  "has a qualifier" detector, as the regex was, with the same trade: confirmed recall goes up, AUC goes down. The
  qualifier signal and the wording regex both find the same 5 confirmed pairs. With 13 confirmed dev pairs, a
  wording feature does not raise AP; it could be a separate review list ("claims with qualifiers") instead of a part
  of the risk score. Next: ideas that change what Jev reads (per-passage checks, whole source text) or the combiner.

## Iteration 6: wholesrc (DISCARD)

- **Hypothesis:** Many supported pairs rank high with a very low `supported` because retrieval did not give Jev the
  passage that states the fact. The reviewer judged against the whole station sources, and an "unsourced" label
  means the whole sources do not state the claim. If Jev reads the whole sources, `supported` goes up on supported
  pairs and stays low on unsourced pairs.
- **Change:** `configs/wholesrc.ts` = meanpair, but the Jev state has one `passages` entry per fetched station source
  (the whole cleaned text, ids s1, s2, ...) instead of the 5 retrieved passages. Same questions and pair scoring.
  The config checks each text against `textSha1` in dataset.json. When the request fails, the claim uses the cached
  passage answer. 317 live requests, 2.1M tokens, $0.089. 20 requests failed with `max_tokens_exceeded` (states of
  128k characters or more: Chaussée d'Antin, Madeleine, Pasteur, Bibliothèque François-Mitterrand, Robespierre).
- **Result:** AP 0.862 → 0.870 (p_better 0.69). No planted: 0.756 → 0.792 (p_better 0.87). AUC 0.888 → 0.889 (no
  planted 0.848 → 0.863). confR20 0 → 0 (no planted 0 → 0.077). plantAuc 0.968 → 0.940.
- **Decision:** DISCARD (AP gain 0.008, below 0.01; the guard improves).
- **Learned:** This is the first change that adds new information for real problems. Mean pair score change: −0.097
  on supported (34 of 84 pairs go down by more than 0.1), −0.023 on unsourced, −0.066 on confirmed, +0.016 on
  refuted. So retrieval misses are a large part of the false alarms. The cost is on planted errors (−0.048; 4 of 27
  go down by more than 0.1, for example a changed date "three weeks" vs "three months", "1909" vs another year):
  in a long text Jev finds a close match and misses the one changed detail more often than with 5 short passages.
  Ideas for next iterations: the mean (or min) of the passage `supported` and the whole-source `supported` (both
  answers are in the cache, so no new calls); keep the whole-source answer only for `supported` and take
  `contradicted` or `best_passage` from the passages; or cut long sources to the paragraphs around the retrieved
  passages so that no request fails.

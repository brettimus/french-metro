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

## Iteration 7: blendsrc (KEEP)

- **Hypothesis:** The whole-source answer (wholesrc) fixes retrieval misses on supported pairs, and the passage
  answer keeps the planted single-detail changes visible. The mean of the two `supported` values keeps part of both.
- **Change:** `configs/blendsrc.ts` = meanpair, but each claim's `supported` is the mean of the passage answer and the
  whole-source answer. `contradicted` and `best_passage` come from the passage answer. When the whole-source request
  failed (20 cached `max_tokens_exceeded` errors), the claim uses the passage answer only. No new Jev calls (all
  answers cached from iteration 6).
- **Result:** AP 0.862 → 0.878 (p_better 0.91). No planted: 0.756 → 0.792 (p_better 0.97). AUC 0.888 → 0.902 (no
  planted 0.848 → 0.872). confR20 0 → 0 (no planted 0 → 0.077). plantAuc 0.968 → 0.962 (wholesrc: 0.940).
- **Decision:** KEEP (AP +0.016, guard improves).
- **Learned:** Mean pair score change vs meanpair: supported −0.046 (14 of 84 down by more than 0.1), confirmed
  −0.029, planted −0.022 (3 of 27 down by more than 0.1), unsourced −0.012, refuted −0.002. The blend keeps most of
  the wholesrc gain on real problems (no-planted AP equal to wholesrc) and loses less on planted errors (planted
  −0.022 vs −0.048). Next: other blend weights (for example 0.3/0.7) or min instead of mean; cut long sources to the
  paragraphs around the retrieved passages so that the 20 failed requests also get a whole-source answer.

## Iteration 8: blendwin (DISCARD)

- **Hypothesis:** In blendsrc, 20 claims (5 dev stations) have no whole-source answer because the state was too
  long (`max_tokens_exceeded`), so they do not get the blendsrc gain. If the long sources are cut to the text around
  the retrieved passages, these claims also get a whole-source answer.
- **Change:** `configs/blendwin.ts` = blendsrc, but when the station sources together are longer than 115k
  characters, each source longer than its share of a 90k budget is cut to windows of 4,000 characters on each side
  of the retrieved passages from that source (merged; the head of the source when no passage comes from it).
  Shorter states are unchanged, so only the 20 failed requests were sent again. 20 live requests, 300k tokens,
  $0.013, 0 errors.
- **Result:** AP 0.878 → 0.880 (p_better 0.69). No planted: 0.792 → 0.794 (p_better 0.62). AUC 0.902 → 0.906 (no
  planted 0.872 → 0.878). confR20 0 → 0 (no planted 0.077 → 0.077). plantAuc 0.962 → 0.963.
- **Decision:** DISCARD (AP gain 0.002, below 0.01).
- **Learned:** Only 10 dev pairs change. 5 supported pairs go down (Chaussée d'Antin context/3 −0.30 on two lines,
  Madeleine etymology/2 −0.135, BFM context/3 −0.068), as in blendsrc. But 3 problem pairs also go down (Madeleine
  unsourced −0.138, Pasteur confirmed −0.115, Robespierre confirmed −0.012), and 2 supported pairs go up. So the
  windows work (no request fails), but the effect is too small to measure on this split. The whole-source signal
  is now available for all claims; further gains must come from somewhere else (blend weights, the combiner, or a
  different question).

## Iteration 9: blendnone (DISCARD)

- **Hypothesis:** The cached whole-source answers also have a `best_passage` choice. On dev, the whole-source
  answer chooses "none" less often on supported claims (0.056) than the passage answer (0.092), and about as often
  on unsourced (0.440 vs 0.442) and planted claims (0.491 vs 0.564). If the `noPassage` part is blended like
  `supported`, part of the retrieval-miss false alarms leaves this part too.
- **Change:** `configs/blendnone.ts` = blendsrc, but when both answers exist, `noPassage` = 0.1 × the mean of the two
  "best_passage is none" flags (passage and whole source) instead of the passage flag only. Pair still takes the max
  over claims. Weight unchanged. No new Jev calls.
- **Result:** AP 0.878 → 0.879 (p_better 0.62). No planted: 0.792 → 0.796 (p_better 0.73). AUC 0.902 → 0.903 (no
  planted 0.872 → 0.874). confR20 0 → 0 (no planted 0.077 → 0.077). plantAuc 0.962 → 0.961.
- **Decision:** DISCARD (AP gain 0.001, below 0.01).
- **Learned:** Only 18 dev pairs change, each by at most 0.05, because the pair takes the max over its claims and
  most pairs have the same flag in at least one claim. Mean change: supported −0.002, unsourced −0.001, confirmed
  −0.004, planted −0.002. The small parts (`noPassage`, numbers, fetch) cannot move the ranking much at their
  current weights; the ranking is set by `unsupported`. Gains must come from a better `supported` value or from
  a combiner that sets the weights (idea 8).

## Iteration 10: contra2 (KEEP)

- **Hypothesis:** RISK_WEIGHTS gives `contradicted` weight 0, because it did not predict problems in pass 1. But per
  claim on dev, the passage `contradicted` is 0.77 on planted errors (47 of 55 claims above 0.5) against 0.29 on
  supported claims (27 of 173), and 0.28–0.36 on the real problem classes. So it adds a signal for single-detail
  errors that `supported` ranks only partly.
- **Change:** `configs/contra2.ts` = blendsrc, plus the passage answer's `contradicted` at weight 0.2 (pair takes the
  max over its claims, as for the other small parts). No new Jev calls. A dry-run sweep on dev (not logged) showed a
  plateau: weight 0.1 → AP 0.900, 0.2 → 0.907, 0.3 → 0.905. The blend weight of the whole-source answer (0.5, 0.6,
  0.7) changed AP by at most 0.004, and the blended (passage + whole source) `contradicted` was not better than the
  passage one.
- **Result:** AP 0.878 → 0.907 (p_better 0.82). No planted: 0.792 → 0.805 (p_better 0.71). AUC 0.902 → 0.903 (no
  planted 0.872 → 0.867). confR20 0 → 0 (no planted 0.077 → 0.077). plantR20 0.37 → 0.63, plantAuc 0.962 → 0.974.
- **Decision:** KEEP (AP +0.029, guard improves by 0.013).
- **Learned:** Mean pair score change: planted +0.161 (24 of 27 up by more than 0.1), supported +0.072, confirmed
  +0.073, refuted +0.079, unsourced +0.057. Most of the gain is on planted errors, so the gain on real problems is
  small and AUC with no planted errors goes down a little. Only 1 supported pair is in the top 20 (gare-de-l'est
  etymology/2, pass 1 line 5). The val run must confirm that the planted gain is not specific to dev. Real confirmed
  problems (wording faults) are still not found: `contradicted` does not see them either.

## Iteration 11: suplevel (DISCARD)

- **Hypothesis:** A noul near 0.5 means "unsure", not "partly supported". A 5-level score question gives a graded
  value: the main fact is missing / a key name or date is missing or different / the main fact is stated but a
  detail or qualifier is added / every detail is stated but one is worded more strongly / everything is stated at
  the same strength. Such a value could separate wording faults (confirmed) and planted single-detail errors from
  supported claims.
- **Change:** `configs/suplevel.ts` = contra2, plus a `support_level` score question (5 levels) on the passage
  state, sent as a separate request (340 live requests, 642k tokens, $0.027). Each claim's `supported` = the mean of
  the passage noul, the whole-source noul and level/4 (`SUPLEVEL_W` sets the level's weight, default 1).
- **Result:** AP 0.907 → 0.888 (p_better 0.009). No planted: 0.805 → 0.774 (p_better 0.015). AUC 0.903 → 0.887 (no
  planted 0.867 → 0.844). confR20 0 → 0 (no planted 0.077 → 0.154). plantR20 0.63 → 0.56, plantAuc 0.974 → 0.974.
  Dry-run sweep of the level weight (not logged): 0.3 → AP 0.899, 1 → 0.888, 3 → 0.874. Each step down.
- **Decision:** DISCARD (AP −0.019, guard fails).
- **Learned:** Per-claim means of level/4: supported 0.519, confirmed 0.421, refuted 0.360, unsourced 0.326,
  planted 0.268. The gap between supported and unsourced is 0.19 (passage noul: 0.23) and between supported and
  planted 0.25 (noul: 0.32), so the level separates the classes less than the noul does. Jev puts 90 of 173 supported
  claims at level 2 ("the claim adds a detail the passages do not give") and only 7 at level 4. So, as with the
  'overstated' and 'qualifier' questions, Jev finds an added detail in almost every claim, and the reviewer accepts
  most of these details. The level question finds 2 more confirmed pairs in the top 20 with no planted errors, but it
  moves many supported pairs up. Questions about the degree of support repeat the `supported` signal with more noise.

## Iteration 12: perpass (DISCARD)

- **Hypothesis (plan idea 4):** When the 5 retrieved passages are joined in one state, unrelated passages can lower
  `supported`. If one passage alone states the full claim, the claim should rank low; unsourced claims have no such
  passage. So the max over per-passage `supported` answers could separate supported from unsourced claims.
- **Change:** `configs/perpass.ts` = contra2, plus one Jev request per retrieved passage (state with that passage
  only, same questions). Each claim's `supported` = mean of the joined-passage noul, the whole-source noul and the
  max of the per-passage nouls (`PERPASS_W` sets the weight of the max, default 1). `contradicted` and
  `best_passage` still come from the joined answer. 1,621 live requests (1.5M tokens, $0.064).
- **Result:** AP 0.907 → 0.899 (p_better 0.11). No planted: 0.805 → 0.790 (p_better 0.11). AUC 0.903 → 0.894 (no
  planted 0.867 → 0.855). confR20 0 → 0 (no planted 0.077 → 0). plantR20 0.63 → 0.63, plantAuc 0.974 → 0.972.
  Dry-run sweep of `PERPASS_W` (not logged): 0.3 → AP 0.905, 0.5 → 0.903, 1 → 0.899, 2 → 0.892. Each step down.
- **Decision:** DISCARD (AP −0.008, guard holds but no gain).
- **Learned:** The max of the per-passage nouls is lower than the joined noul, and most on supported pairs: mean pair
  score change supported +0.039 (10 of 84 up by more than 0.1), unsourced +0.022, planted +0.008, confirmed −0.003,
  refuted −0.027. Many supported claims combine details from two or more passages, so no single passage supports
  them in full. The hypothesis is false: joining the passages does not lower `supported` on supported claims. More
  context helps Jev (as the whole-source blend showed); less context hurts.

# Station fact checker

The fact checker ranks the sentences of the station copy (`apps/web/src/data/line*.ts`) by the risk that they are wrong or not supported by the cited sources. It does not change the copy. A person (or an agent) must review the top of the ranking against the sources.

Reports:

- [2026-10-05-fact-check.md](2026-10-05-fact-check.md): first full run, review of the top 80 pairs, fixes, and an evaluation of the ranking.
- [2026-10-05-fact-check-pass2.md](2026-10-05-fact-check-pass2.md): new risk weights and known conflicts, their measured effect on the pass-1 labels, review of the next 100 pairs, and fixes.

Run all commands from the repository root.

## Files

| File | What it does |
|---|---|
| `apps/web/scripts/facts/run.ts` | Entry point: runs all steps and writes `results.json` and `ranked.md` |
| `apps/web/scripts/facts/sources.ts` | Fetches every source and people URL into `cache/`; can run alone to check links |
| `apps/web/scripts/facts/claims.ts` | Splits each field into sentences and aligns EN and FR sentences into pairs |
| `apps/web/scripts/facts/retrieve.ts` | Cuts source texts into passages and ranks them per claim with BM25 |
| `apps/web/scripts/facts/numbers.ts` | Extracts numbers, years and dates and compares them with the sources, in code |
| `apps/web/scripts/facts/jev.ts` | The Jev questions and the model id, the whole-source state (`wholeSourceState`) and the blend of the two answers (`blendAnswers`). Requests go through the shared cache in `apps/web/scripts/jev-cache.ts` |
| `apps/web/scripts/facts/rank.ts` | Risk weights (`RISK_WEIGHTS`), the ranker label (`RANKER_VERSION`, now `facts-3`) and the ranking. A pair takes the mean of its claims' `unsupported` parts and the strongest value of each other signal. `FACTS2_RISK_WEIGHTS` keeps the earlier rules for the lab baseline |
| `apps/web/scripts/facts/known-conflicts.ts` | Claims that keep a value a cited source contradicts, on purpose (for example the Saint-Mandé rename date). They are left out of the ranking and listed with their note in `ranked.md` |
| `apps/web/scripts/facts/reviewed.ts` | Review labels: `PASS1_REVIEWED` (80 pairs), `PASS2_REVIEWED` (100 pairs) and `ALL_REVIEWED`, with verdicts and texts at review time |
| `apps/web/scripts/facts/evaluate.ts` | Re-scores a review run with the current weights (no Jev calls) and measures the ranking against the labels (`--labels pass1\|pass2\|all`) |
| `apps/web/scripts/facts/lab/` | The lab: a frozen labelled dataset and a harness that measures ranker configs on it (see [Lab](#lab)) |
| `apps/web/scripts/facts/text.ts` | Accent folding, tokens, sentence splitting, word counts |
| `apps/web/tests/facts.test.ts` | Tests for splitting, numbers, retrieval, risk and question building |
| `apps/web/tests/fact-labels.test.ts`, `fact-lab.test.ts` | Tests for the label counts, the lab metrics, the dataset split and the harness guards |

## API key

The checker calls Jev through the TypeSafe API (`@typesafe-ai/sdk`). It reads `TYPESAFE_API_KEY` from the environment, or else from the line `TYPESAFE_API_KEY=...` in the repository-root `.env`. `.env` is gitignored. Do not put the key in any other file. `--dry-run` needs no key.

## Check the source links only

```sh
bun apps/web/scripts/facts/sources.ts            # all lines
bun apps/web/scripts/facts/sources.ts --line 9   # one line
bun apps/web/scripts/facts/sources.ts --refresh  # refetch instead of reading the cache
```

The output lists each URL that is not ok (`broken`, `blocked` or `unreadable`) and each Wikipedia title that redirects. `blocked` (HTTP 401, 403 or 503) usually means the site refuses scripts; open the link in a browser before you change it. `unreadable` means the page returned too little text (it needs JavaScript) or is a PDF.

Some links work in a browser but not for scripts (a JavaScript page, a PDF, a Cloudflare block). They are in `KNOWN_UNREADABLE` in `sources.ts`, with a reason. The output and `ranked.md` list them as known, not as failures, and they add no `fetchFailure` risk. Add a link to that list only after you open it in a browser, and only when the station also cites a readable source for the same facts. A test fails when a listed link is no longer cited. Requests use the generic agent `french-metro-factcheck/1.0`.

## Run the checker

```sh
bun apps/web/scripts/facts/run.ts --out apps/web/scripts/facts/out/full
```

Each claim gets two Jev requests with the same questions: one on the 5 retrieved passages, and one on the whole cleaned text of every fetched station source. A full run has about 1,800 claims, so about 3,600 Jev requests. When the sources and answers are cached, it takes about 30 seconds. Options:

| Option | Effect |
|---|---|
| `--line X` | Only one line |
| `--limit N` | Only the first N EN/FR pairs |
| `--out dir` | Output directory (default `apps/web/scripts/facts/out`) |
| `--concurrency N` | Parallel Jev requests (default 16). Source fetches always use 4 |
| `--top N` | Pairs listed in detail in `ranked.md` (default 80) |
| `--refresh` | Refetch the sources instead of reading the cache |
| `--dry-run` | Sources, retrieval and number checks only; no new Jev calls (cached answers are still used) |

Jev answers are cached in `cache/jev/` by model, question text and request state, so a changed question never gets an old answer. A rerun pays only for claims whose text, passages or questions changed. Files under the older key (model, `QUESTION_VERSION` and state) are still read for the passage request; the whole-source request has no older key. Change `QUESTION_VERSION` when you change the questions, because `results.json` reports it. Change `RANKER_VERSION` in `rank.ts` when you change the weights or the way answers are combined.

Some stations have very long sources (for example Chaussée d'Antin, Madeleine, Pasteur). Their whole-source state is too long for Jev (`max_tokens_exceeded`). Those claims use the passage answer only, and `ranked.md` counts them as whole-source errors. Errors are not cached, so each run sends these requests again.

`cache/` and `out/` are gitignored.

## Read the output

`ranked.md`:

- Run figures, the distribution of `supported` and `contradicted`, fetch failures and Wikipedia redirects.
- The top N pairs in detail: each claim with its risk, `supported` (the blended value, then the passage and whole-source values), `contradicted`, best passage, unmatched numbers, and the text of the best passage.
- One compact line for every pair: rank, claim id, risk, scores, unmatched numbers, EN text, best source URL.

`results.json` has the same data for every claim, with the risk parts, all five passages and the Jev request ids.

Claim ids are `line/station/field/locale/n` (for example `9/robespierre/context/fr/2`). Pair keys leave out the locale (`9/robespierre/context/2`).

## How to review the ranking

The 2026-10-05 run showed which signals to trust (see the report for the numbers):

- **Low `supported`** is the best signal. Most pairs below 0.2 were either wrong or not supported by the cited sources.
- **Unmatched numbers** usually mean that the date is in another article (often the line article), not that it is wrong. Find the source and add it.
- **High `contradicted`** alone is weak. Most of these claims were correct, and the passage was about a related fact. Two of the top pairs were errors in the source article, not in the copy. It helps to find a single changed detail (a date, a number, a name), so it has a small weight.
- **EN/FR disagreement** was mostly noise. A low `supported` in one locale only is often Jev missing the fact in that language.

The weights in `rank.ts` (ranker `facts-3`) follow these findings and the lab (see [Lab](#lab)): `unsupported` has weight 1 and the pair takes the mean over its claims, `contradicted` 0.2, an unmatched number 0.1 (at most 0.2), `best_passage = none` 0.1, and EN/FR disagreement 0. Each claim's `supported` is the mean of the passage answer and the whole-source answer. Run `bun apps/web/scripts/facts/evaluate.ts` after a change to the weights; it re-scores stored runs, so a run from before `facts-3` has no whole-source answers.

When a claim keeps a value that a cited source gets wrong, and the research notes record why, add it to `known-conflicts.ts`. An entry matches on a text fragment of the claim. When the claim is rewritten, the entry stops matching and the run lists it as stale.

For each pair, decide one verdict: `error`, `imprecise`, `true_but_unsourced` or `supported`. Before you change copy for an `error` or `imprecise` verdict, try to prove the claim correct from other sources. Then:

1. Fix the copy in both locales and keep etymologies of shared stations identical on every line (the tests check this).
2. Add the source that supports the claim to the station's `sources[]`.
3. Record the change, with the quote and URL, in `docs/copy/changes/lineX.md`.
4. Run `bun run test`, `bun run typecheck`, and the copy evaluator for the line: `bun --env-file=.env apps/web/scripts/copy/evaluate.ts --kind station --line X` (see [../copy/README.md](../copy/README.md)).

## Lab

The lab measures changes to the ranker (questions, state fields, retrieval, weights) on labelled pairs, without a new review. It lives in `apps/web/scripts/facts/lab/`.

### Rules

- **Tune on dev only.** Read the dev metrics as often as you like.
- **Run val once, at the end.** `--split val` needs `--final`. The harness writes a row to `results.tsv` and refuses a second val run for the same config name. Do not change a config after its val run.
- **Pass 3 is the held-out test.** The pass-3 review labels pairs that no config was tuned on. Measure the final ranker on them once, and do not tune after that. `lab/holdout-pass3.json` freezes the pass-3 pairs before any verdict: the commit, both rankers, and for each unreviewed pair its texts and its `facts-3` and `facts-2` risks and ranks from the run `out/pass3` (`facts-2`: the passage answer only, with `FACTS2_RISK_WEIGHTS`). It also records how pairs that changed after review were counted. The verifiers do not see these scores.

### Dataset

`lab/dataset.json` (committed, about 1.9 MB) is built by `lab/build-dataset.ts` from the review labels (`reviewed.ts`), the two review runs (`out/full/results.json` for pass 1, `out/pass2/results.json` for pass 2) and the source cache. It does not use today's copy or sources: the copy and the sources changed after each review, and added sources turn "unsourced" pairs into "supported" ones.

For each labelled pair it stores the EN and FR claims at review time, the 5 retrieved passages (texts stored once and referenced by id), the number checks, the Jev answers of that run, and the station's fetch-failure value. For each station it stores the source URL list at the review commit (`9740b4a` for pass 1, `3c98987` for pass 2), and a number index. For each source it stores the title and a sha1 of the cleaned text, but not the text. A config that rechunks the sources must read them from `cache/` and check the hash.

Rebuild or check it (needs the gitignored `out/` and `cache/` files):

```sh
bun apps/web/scripts/facts/lab/build-dataset.ts          # write dataset.json
bun apps/web/scripts/facts/lab/build-dataset.ts --check  # compare a fresh build with dataset.json
```

The build fails when a labelled pair is not in its run, a source cache file is missing, a stored passage is not a chunk of the cached source text, or a planted edit does not match.

**Planted errors.** `lab/planted.ts` has 40 supported pairs, each with one false edit (a date, a number, a name or a place) made in EN and FR. The passages stay the same. The dataset adds them as extra items with verdict `confirmed` and `planted`. Only the edited claims need new Jev calls.

**Split.** A pair is in `val` when `sha1(stationId) % 10 < 3`, else in `dev`. All lines of a station go to the same split, because shared stations have the same text on several lines. 25 of the 99 labelled stations are in val. A test checks the val station set.

| Split | Items | Confirmed | Refuted | Unsourced | Supported | Planted |
|---|---|---|---|---|---|---|
| dev | 167 | 13 | 5 | 38 | 84 | 27 |
| val | 53 | 3 | 2 | 11 | 24 | 13 |

### Metric

The positive class is "problem": `confirmed`, `refuted` or `unsourced`, plus the planted errors. The negative class is `supported`. Refuted pairs count as problems because the reviewer needed to check them.

- **Primary:** average precision (AP) of the risk ranking, with a 95% bootstrap interval (2,000 resamples of the items). AP rewards problems at the top of the list, where reviewers start. AP has one step per distinct score, as in scikit-learn: pairs with the same risk are one group, so the result does not depend on item ids. The baseline has many ties (57 distinct scores on 165 dev items).
- **Secondary:** ROC AUC; `confR20`, the share of the real confirmed problems in the top 20 of the split (a tie group across rank 20 counts with the share of its places inside the top 20); `plantR20`, the share of the planted errors in the top 20; `plantAuc`, planted errors against supported pairs.
- **Cost:** the number of requests, the live requests and their input tokens, and USD at $0.042 per million input tokens. Output tokens are free.

Two pairs (1/saint-mande, pass 1) match known conflicts and are left out by the baseline.

### Run the harness

```sh
bun apps/web/scripts/facts/lab/harness.ts --config baseline                       # dev, logs a row
bun apps/web/scripts/facts/lab/harness.ts --config my-change --compare baseline   # adds p_better (paired bootstrap of AP)
bun apps/web/scripts/facts/lab/harness.ts --config baseline --no-planted --pass 2  # filters
bun apps/web/scripts/facts/lab/harness.ts --config baseline --dry-run --no-log    # cache only, no row
bun apps/web/scripts/facts/lab/harness.ts --config my-change --split val --final  # once, at the end (no --no-log or --dry-run)
bun apps/web/scripts/facts/lab/harness.ts --config baseline --parity              # check against evaluate.ts
```

Each run prints one JSON line, writes the per-item scores to `lab/out/<config>.<split>.json` (gitignored), and adds a row to `lab/results.tsv`: timestamp, config, config file hash, split, filters, items, positives, AP and its interval, AUC, confirmed recall@20, planted recall@20, requests, live requests, live tokens, USD, seconds, `p_better` and a note.

### Write a config

A config is a file in `lab/configs/` whose default export has the `LabConfig` type (`lab/config.ts`):

- `name`: the file name without `.ts`.
- `requests(ctx)`: the Jev requests for one claim. `ctx` has the dataset, the item, the claim and the station. Use `stateFor()` from `build-dataset.ts` to get the state the review run sent.
- `score(ctx)`: the pair's risk from the claims and their Jev results, or `excluded` to leave the pair out.

Copy the current best config, change one thing, and run it on dev with `--compare`. All requests go through the content-addressed Jev cache, so a rerun of the same requests costs nothing.

### Baseline (`configs/baseline.ts`)

The production ranker before `facts-3`: the `facts-2` questions, `FACTS2_RISK_WEIGHTS` (the pair takes the max over its claims, `contradicted` 0) and known conflicts. The other tried configs also use `FACTS2_RISK_WEIGHTS`, so their numbers stay the ones in `NOTES.md`. Its requests are the ones the review runs sent, so the old-key cache answers them; only the planted claims needed live calls (54 requests, about 110k tokens, under $0.01).

| Run | Items | AP (95% interval) | AUC | confR20 | plantR20 |
|---|---|---|---|---|---|
| dev | 165 | 0.840 (0.751–0.918) | 0.851 | 0.00 | 0.37 |
| dev, no planted | 138 | 0.709 (0.589–0.838) | 0.792 | 0.08 | – |

With planted errors, the top 20 of dev holds 10 planted errors and no real confirmed problem, so read `confR20` on runs with `--no-planted` too.

Parity with `evaluate.ts` on the 80 pass-1 labels (`--parity`): problem AUC 0.782 and confirmed AUC 0.667 with `evaluate.ts`'s tie-break (rank order, then pair key), the same as `evaluate.ts`. With ties counted half, they are 0.783 and 0.665.

### Ranker facts-3 (`configs/contra2.ts`, in production)

The lab tried 14 configs on dev (`lab/NOTES.md`, `lab/results.tsv`). Three changes were kept and are now in `rank.ts` and `jev.ts`:

1. **Mean over the pair (meanpair):** the pair's `unsupported` part is the mean over its claims, not the max. Dev AP +0.022.
2. **Whole-source blend (blendsrc):** a second request with the whole cleaned station sources. Each claim's `supported` is the mean of the passage answer and the whole-source answer. Dev AP +0.016. The whole sources alone gave fewer false alarms from retrieval misses but missed more planted errors.
3. **`contradicted` at 0.2 (contra2):** the passage answer's `contradicted`, max over the pair. Dev AP +0.029.

The questions did not change, so `QUESTION_VERSION` stays `facts-2` and the old-key cache still answers the passage requests. `RANKER_VERSION` is `facts-3`.

| Metric | dev baseline | dev facts-3 | val baseline | val facts-3 |
|---|---|---|---|---|
| AP | 0.840 | 0.907 | 0.862 (0.749–0.948) | 0.890 (0.795–0.960) |
| AP, no planted errors | 0.709 | 0.805 | 0.745 | 0.747 |
| AUC | 0.851 | 0.903 | 0.811 | 0.842 |
| confR20 | 0 | 0 | 0.667 | 0.333 |
| plantR20 | 0.37 | 0.63 | 0.692 | 0.769 |
| plantAuc | 0.968 | 0.974 | 0.877 | 0.942 |

On val, p_better (facts-3 > baseline) is 0.815 on all items and 0.54 with no planted errors. Almost all of the val gain is on planted errors (mean score +0.107). On real problems facts-3 is equal to the baseline. The confR20 drop is one pair: val has only 3 real confirmed pairs. Planted errors are easier than real ones, so judge the next change on the no-planted metrics and on more real labels (pass 3).

What did not help: questions that change how strict `supported` is (overstated, qualifier, a 5-level support score, a lenient main-fact question), a second wording of the question, one request per passage, and a fitted logistic combiner. With 165 dev items, the next gain must come from a new signal, not from new weights.

`configs/production.ts` builds the same ranking from production code only (`jevRequest`, `wholeSourceState`, `blendAnswers`, `claimRisk`, `rankPairs` with the default weights). On dev it gives the same numbers as `contra2` (AP 0.907, no planted 0.805); on val, scored offline from the cache, it also matches (0.890, no planted 0.747). Run it after a change to `rank.ts` or `jev.ts`:

```sh
bun apps/web/scripts/facts/lab/harness.ts --config production --dry-run --compare contra2
```

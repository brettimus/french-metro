# Copy evaluation

These tools grade the site copy in English and French against the writing rubric. They do not change the copy.

| File | What it does |
|---|---|
| [`writing-rubric.md`](writing-rubric.md) | The rubric: project rules, judged dimensions (S1–S7, L1–L3, U1–U3), tells (T1–T26), deterministic checks and the composite score |
| `reports/` | Dated reports. Start with [`reports/2026-10-05-after-fixes.md`](reports/2026-10-05-after-fixes.md) (current copy), [`reports/2026-10-05-baseline2.md`](reports/2026-10-05-baseline2.md) (current evaluator) and [`reports/2026-10-05-baseline.md`](reports/2026-10-05-baseline.md) (method) |
| `apps/web/scripts/copy/corpus.ts` | Extracts every user-facing string as a unit, like i18n keys |
| `apps/web/scripts/copy/checks.ts` | Deterministic checks (typography, word lists, sentence length, parity, corpus templates) |
| `apps/web/scripts/copy/questions.ts` | The questions sent to Jev, and the question-set version |
| `apps/web/scripts/copy/ui-usage.ts` | Where each UI string appears (button, heading, aria-label…), from `app.ts`; sent with U1 and used to group siblings for U2 |
| `apps/web/scripts/copy/evaluate.ts` | Runs the checks and Jev, computes scores, writes results |

Run all commands from the repository root.

## API key

The evaluator calls Jev through the TypeSafe API (`@typesafe-ai/sdk`). It reads the key from `TYPESAFE_API_KEY`:

1. From the environment, if it is set.
2. Otherwise from the repository-root `.env` file, from the line `TYPESAFE_API_KEY=...`.

`.env` is in `.gitignore`. Do not commit it, and do not put the key in any other file. The `--dry-run` mode needs no key.

## 1. Extract the corpus

```sh
bun apps/web/scripts/copy/corpus.ts --out /tmp/corpus.json
```

This writes one JSON array of units and prints counts per kind and locale. Each unit has:

- `id`: for example `station/9/jasmin/context/fr`, `line/1/summary/en`, `ui/featured/fr`, `page/signAlt/en`.
- `pairId`: the same id without the locale. The EN and FR units of one string share it.
- `kind`: `station` (`apps/web/src/data/line*.ts`), `line` (title, summary, imageAlt), `ui` (`apps/web/src/i18n.ts`) or `page` (`apps/web/public/index.html` and app-shell strings).
- `text`, `wordCount`, and for stations `lineId`, `stationId`, `stationName`.

A station on two lines has one entry per line, so it gives two sets of units.

## 2. Run the evaluator

Full run (about 1,500 requests, under one minute):

```sh
bun --env-file=.env apps/web/scripts/copy/evaluate.ts --out apps/web/scripts/copy/out/baseline
```

Useful options:

| Option | Effect |
|---|---|
| `--kind station\|line\|ui\|page` | Only one kind of unit |
| `--line 9` | Only one line |
| `--limit N` | First N EN/FR pairs (2N units) |
| `--sample N --seed S` | N random pairs, repeatable with the same seed |
| `--dry-run` | Deterministic checks only, no network |
| `--worst 25` | How many units `summary.md` lists |
| `--model jev-1.13.0` | Jev model id |
| `--concurrency 24` | Parallel requests |
| `--out dir` | Output directory (default `apps/web/scripts/copy/out`, which is gitignored) |

Each run writes a timestamped directory, for example `out/baseline/2026-10-05T09-40-46-519Z/`, with:

- `results.json`: run metadata, weights, thresholds, one row per unit, every raw Jev answer with its request id, corpus-level findings and the most common openings.
- `summary.md`: the worst units with their problems, parity flags and a FR review order.

Tests for the checks and the corpus:

```sh
cd apps/web && bun test tests/copy-checks.test.ts tests/copy-corpus.test.ts
```

## 3. Read the results

### Composite and bands

Each unit gets a composite from 0 to 1:

- Weighted dimensions (rubric section 5), each normalised to 0–1.
- Minus 0.05 per soft tell (cap 0.25) and 0.05 per FAIL check (cap 0.20).

Bands: **ship** ≥ 0.85, **edit** 0.65–0.84, **rewrite** < 0.65. A **hard failure** (T22–T26, or a word count over the hard limit) fails the unit whatever its composite.

### Fields in a `results.json` row

| Field | Meaning |
|---|---|
| `dims` | Dimension scores, 0–1. Some are computed or capped in code (S4, S5 caps, S6, U2) |
| `tells` | Soft tells found. "T3 , recalling…" is a code match; "T7 (jev)" is a Jev Noul ≥ 0.5 |
| `findings` | Deterministic checks. `fail` costs 0.05; `review` and `info` cost nothing |
| `hardFails` | Hard failures |
| `flags` | Pair flags, for example "FR leaves out an EN fact (0.86)" (fr_missing or en_missing ≥ 0.8) |
| `review` | Values in the review band, for example "conflict 0.50" |
| `hints` | Ranking hints that never change the score (t19_calque, metonymy, native, S6_judged, fr_calque) |
| `jev` | Raw answers: Score questions give a level, a confidence and probabilities; Noul questions give a value from 0 to 1 |
| `problems` | The unit's problems in order of weight, as shown in `summary.md` |

### How much to trust each part

- Deterministic FAIL checks (typography, sentence length, dashes) are reliable. Fix them first.
- `parity.names` compares folded text, skips station-name words and accepts French forms from `NAME_MAP` in `checks.ts`; add a pair there when a correct translation is flagged. It never changes the composite. `parity.hedge` ignores the month "May".
- Jev scores were calibrated against two editors on 36 pairs. The least reliable are S5 (both locales) and S4 (FR). The tells t5, t13, t14 and t16 have not been tested on true cases.
- UI scores (U1, U2) are not calibrated. U1 gets the string's usage note from `ui-usage.ts`. U2 is judged per string against the sibling strings of the same role, so a conflict lowers only the strings involved.
- T21 ignores an etymology repeated on the same station id (a station on two lines). A repeated context sentence on the same station id is the REVIEW hint `corpus.duplicateSameStation`, not a tell.
- The evaluator does not check facts against sources (T22). Use the fact checker for that: [`../facts/README.md`](../facts/README.md).

When you change `questions.ts`, change `QUESTION_SET_VERSION` too, so reports can say which questions produced them.

## Lab

The lab measures changes to the copy questions (wording, levels, state fields, the mapping from answers to levels) against editor labels. It lives in `apps/web/scripts/copy/lab/`.

### Rules

- **Tune on dev only.** Read the dev metrics and the dev errors as often as you like.
- **Run test once per config.** `--split test` needs `--final`. The harness writes a row to `results.tsv` and refuses a second test run for the same config name. Do not change a config after its test run.
- **No per-item test labels.** The harness refuses `--errors` on the test split and writes no per-item file for it. Only the totals are printed.

### Dataset

`lab/dataset.json` (committed) is built by `lab/build-dataset.ts`:

```sh
bun apps/web/scripts/copy/lab/build-dataset.ts          # write dataset.json
bun apps/web/scripts/copy/lab/build-dataset.ts --check  # compare a fresh build with dataset.json
```

| Source | Labels | Texts | Split |
|---|---|---|---|
| Calibration (`labels/mine-en.json`, `labels/mine-fr.json`) | 2 editors, question set `.5`; S7 dropped (the S7 rule changed after grading) | `buildCorpus()` in a temporary worktree at `d085bdd` | all dev |
| Round 3 (`labels/round3.json`) | editors A and B, a third agent decided the 42 disagreements | `buildCorpus()` in a temporary worktree at `1d5b4ed`; must equal `labels/round3-sample.json` | pair ids sorted by sha1: first half dev, second half test |
| Planted (`lab/planted.ts`) | the planted tell only; no dimension levels | a clean graded unit with one tell inserted | the split of the original pair |

The calibration pairs `ui/end` and `ui/branchIvry` are left out: these keys were unused at `d085bdd` and have no usage note now. For calibration pairs, the pair labels come from the FR editor where that editor graded the pair (S6 and the parity flags), else from the EN editor (`S6_judged` and its `yes` list).

**Planted defects.** 30 units: 6 per tell (t5 negative parallelism, t9 tidy closer, t13 stock metaphor, t14 grandiosity, t16 synonym cycling), 3 EN and 3 FR each, 15 in dev and 15 in test. The calibration and round-3 samples have almost no true cases of these tells. The planted phrases do not copy the example phrases in `questions.ts`.

| Split | Units (labelled) | Pairs | Planted units |
|---|---|---|---|
| dev | 108 (68 calibration, 40 round 3) | 54 | 15 |
| test | 40 (round 3) | 20 | 15 |

No station is in both splits.

### Harness

```sh
bun apps/web/scripts/copy/lab/harness.ts --config baseline                 # dev
bun apps/web/scripts/copy/lab/harness.ts --config baseline --errors 15     # dev, with the 15 largest disagreements
bun apps/web/scripts/copy/lab/harness.ts --config <name> --split test --final
```

Other flags: `--dry-run` (no Jev calls; cache misses are errors), `--concurrency 16`, `--note "text"`, `--no-log`. A `--final` run cannot use `--no-log` or `--dry-run`, because the once-per-config rule reads the rows in `results.tsv`.

A config is a file in `lab/configs/` whose default export implements `CopyLabConfig` (`lab/config.ts`): `unitRequest`, `pairRequest` and `assess`. `configs/production.ts` uses the requests and `assembleRow` of `evaluate.ts`, so it measures the production evaluator with the current `questions.ts`. `configs/baseline.ts` and the configs tried before the port use `lab/v6.ts`, which puts back the two questions of set `2026-10-05.6` that set `.7` replaced, so their numbers stay the ones in `lab/NOTES.md`. To try a change, copy `production.ts`, change one thing, and run it on dev. Compare its row in `results.tsv` with the `production` row. All requests go through the Jev cache (`scripts/jev-cache.ts`), so a rerun of a config costs nothing and a question change can never get an old answer.

### Metrics

- **Primary:** the mean over S1–S7 of the quadratic-weighted kappa (QWK) between the editor level and the Jev level. The Jev level is `1 + round(dim × (levels − 1))` from the row dims, so the code caps apply. When kappa is undefined for a dimension (both sides give one level to all items), the dimension uses Spearman if that is defined, else it is left out. The log row says which.
- **Per dimension:** n, QWK, exact agreement, agreement within one level, and bias (Jev minus editor). L1, L2, L3, U1, U3 and `native` are reported but are not in the primary, because each split has too few labels for them.
- **Tell F1:** micro F1 over (unit, tell) items, for the tells that each unit is asked about. "all" includes the planted units; "real" leaves them out.
- **Planted recall:** the share of planted units where code or Jev finds the planted tell.
- **Cost:** requests, live requests (cache misses), live input tokens, and USD at $0.042 per million input tokens.

Each run appends a row to `lab/results.tsv`. A dev run also writes the per-item levels to `lab/out/<config>.dev.json` (gitignored).

### Baseline (dev, question set `2026-10-05.6`)

Primary 0.501 (QWK on all 7 dimensions). Within one level: 0.965 on average. Tell F1 0.692 (all), 0.786 (real). Planted recall 7/15. 177 requests; the first run cost $0.015.

| Dim | n | QWK | Exact | Within 1 | Bias |
|---|---|---|---|---|---|
| S1 | 46 | 0.246 | 0.80 | 0.98 | +0.04 |
| S2 | 92 | 0.633 | 0.83 | 1.00 | +0.04 |
| S3 | 92 | 0.815 | 0.89 | 0.99 | +0.08 |
| S4 | 92 | 0.468 | 0.82 | 0.98 | +0.05 |
| S5 | 80 | 0.638 | 0.76 | 0.97 | −0.04 |
| S6 | 49 | 0.563 | 0.82 | 0.98 | +0.10 |
| S7 | 14 | 0.146 | 0.71 | 0.86 | +0.43 |
| L1 | 12 | 0.175 | 0.33 | 0.92 | +0.75 |
| native | 40 | 0.295 | 0.60 | 0.95 | +0.25 |

Planted recall by tell: t9 3/3, t5 2/3, t13 1/3, t14 1/3, t16 0/3. Most labels are at the top level, so exact agreement is high even where kappa is low. S7 has dev labels from round 3 only (14 units).

### Question set 2026-10-05.7 (`configs/s4-wordy.ts`, in production)

The lab tried 11 configs on dev (`lab/NOTES.md`, `lab/results.tsv`). Two were kept, and set `2026-10-05.7` in `questions.ts` has both:

1. **S7 for context notes (s7-opening):** concrete criteria for generic facts. A note whose only station facts are opening dates (of the station, its platforms or its line section) is level 2 at most. A renovation in a tiling style used across the network is a generic fact. New example sentences.
2. **filler_phrase (s4-wordy):** the S4 level-3 Noul also counts a wordy periphrasis (several words where one verb or a shorter phrase says the same), with true/false criteria and new example phrases.

`evaluate.ts` did not change: the levels come from the same code.

| Metric | dev baseline | dev .7 | test baseline | test .7 |
|---|---|---|---|---|
| primary (mean QWK) | 0.501 | 0.612 | 0.085 | 0.126 |
| S2 | 0.633 | 0.719 | 0.359 | 0.333 |
| S4 | 0.468 | 0.514 | 0.000 | 0.000 |
| S5 | 0.638 | 0.593 | 0.010 | 0.010 |
| S7 | 0.146 | 0.863 | 0.227 | 0.536 |
| native | 0.295 | 0.308 | 0.381 | 0.467 |
| tell F1 (all) | 0.692 | 0.654 | 0.688 | 0.710 |
| planted recall | 7/15 | 7/15 | 11/15 | 11/15 |

Test has 55 units. On test, S1, S3, S4 and S6 have QWK 0 in both sets: their labels are almost all one level (exact agreement 0.80–0.97), so kappa gives no information, and the test primary depends on S2, S5 and S7. All of the test gain is from S7 (0.227 to 0.536, n = 20), the s7-opening change. Test does not show that the filler_phrase change helps. The harness gives no interval, and with 55 units the +0.041 is probably inside the noise.

What did not help: changes to S1, S5 and S6, where the editor labels do not agree with each other (Simplon, La Défense and Kremlin-Bicêtre) or one level has almost all labels, and an extra state field with the other-language note. A change to one question moves the other Scores in the same request (mostly S2, by 0.04 to 0.11), so a dev change of about 0.01 is usually this side effect. To measure the next change, get more labels at levels other than the top one.

`configs/production.ts` gives the same dev numbers as `s4-wordy` (primary 0.612, the same level for every item), and its unit requests are the same as those of `s4-wordy` for all 178 dev and test units:

```sh
bun apps/web/scripts/copy/lab/harness.ts --config production --dry-run --no-log
```

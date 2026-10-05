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
- The evaluator does not check facts against sources (T22). That needs a separate fact-check pass.

When you change `questions.ts`, change `QUESTION_SET_VERSION` too, so reports can say which questions produced them.

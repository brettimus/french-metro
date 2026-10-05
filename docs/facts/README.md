# Station fact checker

The fact checker ranks the sentences of the station copy (`apps/web/src/data/line*.ts`) by the risk that they are wrong or not supported by the cited sources. It does not change the copy. A person (or an agent) must review the top of the ranking against the sources.

Reports:

- [2026-10-05-fact-check.md](2026-10-05-fact-check.md): first full run, review of the top 80 pairs, fixes, and an evaluation of the ranking.

Run all commands from the repository root.

## Files

| File | What it does |
|---|---|
| `apps/web/scripts/facts/run.ts` | Entry point: runs all steps and writes `results.json` and `ranked.md` |
| `apps/web/scripts/facts/sources.ts` | Fetches every source and people URL into `cache/`; can run alone to check links |
| `apps/web/scripts/facts/claims.ts` | Splits each field into sentences and aligns EN and FR sentences into pairs |
| `apps/web/scripts/facts/retrieve.ts` | Cuts source texts into passages and ranks them per claim with BM25 |
| `apps/web/scripts/facts/numbers.ts` | Extracts numbers, years and dates and compares them with the sources, in code |
| `apps/web/scripts/facts/jev.ts` | The Jev questions, the model id and the answer cache |
| `apps/web/scripts/facts/rank.ts` | Risk weights (`RISK_WEIGHTS`) and the ranking |
| `apps/web/scripts/facts/text.ts` | Accent folding, tokens, sentence splitting, word counts |
| `apps/web/tests/facts.test.ts` | Tests for splitting, numbers, retrieval, risk and question building |

## API key

The checker calls Jev through the TypeSafe API (`@typesafe-ai/sdk`). It reads `TYPESAFE_API_KEY` from the environment, or else from the line `TYPESAFE_API_KEY=...` in the repository-root `.env`. `.env` is gitignored. Do not put the key in any other file. `--dry-run` needs no key.

## Check the source links only

```sh
bun apps/web/scripts/facts/sources.ts            # all lines
bun apps/web/scripts/facts/sources.ts --line 9   # one line
bun apps/web/scripts/facts/sources.ts --refresh  # refetch instead of reading the cache
```

The output lists each URL that is not ok (`broken`, `blocked` or `unreadable`) and each Wikipedia title that redirects. `blocked` (HTTP 401, 403 or 503) usually means the site refuses scripts; open the link in a browser before you change it. `unreadable` means the page returned too little text (it needs JavaScript) or is a PDF.

## Run the checker

```sh
bun apps/web/scripts/facts/run.ts --out apps/web/scripts/facts/out/full
```

A full run (about 1,800 Jev requests) takes about 30 seconds when the sources are cached. Options:

| Option | Effect |
|---|---|
| `--line X` | Only one line |
| `--limit N` | Only the first N EN/FR pairs |
| `--out dir` | Output directory (default `apps/web/scripts/facts/out`) |
| `--concurrency N` | Parallel Jev requests (default 16). Source fetches always use 4 |
| `--top N` | Pairs listed in detail in `ranked.md` (default 80) |
| `--refresh` | Refetch the sources instead of reading the cache |
| `--dry-run` | Sources, retrieval and number checks only; no new Jev calls (cached answers are still used) |

Jev answers are cached in `cache/jev/` by model, question version and request state. A rerun pays only for claims whose text or passages changed. When you change the questions in `jev.ts`, change `QUESTION_VERSION` too.

`cache/` and `out/` are gitignored.

## Read the output

`ranked.md`:

- Run figures, the distribution of `supported` and `contradicted`, fetch failures and Wikipedia redirects.
- The top N pairs in detail: each claim with its risk, `supported`, `contradicted`, best passage, unmatched numbers, and the text of the best passage.
- One compact line for every pair: rank, claim id, risk, scores, unmatched numbers, EN text, best source URL.

`results.json` has the same data for every claim, with the risk parts, all five passages and the Jev request ids.

Claim ids are `line/station/field/locale/n` (for example `9/robespierre/context/fr/2`). Pair keys leave out the locale (`9/robespierre/context/2`).

## How to review the ranking

The 2026-10-05 run showed which signals to trust (see the report for the numbers):

- **Low `supported`** is the best signal. Most pairs below 0.2 were either wrong or not supported by the cited sources.
- **Unmatched numbers** usually mean that the date is in another article (often the line article), not that it is wrong. Find the source and add it.
- **High `contradicted`** alone is weak. Most of these claims were correct, and the passage was about a related fact. Two of the top pairs were errors in the source article, not in the copy.
- **EN/FR disagreement** was mostly noise.

For each pair, decide one verdict: `error`, `imprecise`, `true_but_unsourced` or `supported`. Before you change copy for an `error` or `imprecise` verdict, try to prove the claim correct from other sources. Then:

1. Fix the copy in both locales and keep etymologies of shared stations identical on every line (the tests check this).
2. Add the source that supports the claim to the station's `sources[]`.
3. Record the change, with the quote and URL, in `docs/copy/changes/lineX.md`.
4. Run `bun run test`, `bun run typecheck`, and the copy evaluator for the line: `bun --env-file=.env apps/web/scripts/copy/evaluate.ts --kind station --line X` (see [../copy/README.md](../copy/README.md)).

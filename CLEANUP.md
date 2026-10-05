# Cleanup tasks

Source: read-only audit on 29 September 2026 (five areas: code, tests, build and deploy, repo hygiene, docs and data). A second agent checked each finding against the code. This file lists the confirmed items. Remove an item when it is done.

All numbered items from the audit are done (October 2026). The items below remain.

## Known, no action now

These items are real, but they are not worth the work now. Do them when the given condition occurs.

- **Line 7 branches are hardcoded.** `types.ts:40-41`, `map.ts:40-57` and `app.ts:61-63` (`id === "7"`) contain the names "ivry" and "villejuif". Make branches generic when you add a second line with branches (for example Line 13).
- **Each line file has its own copy of the helpers.** `wiki`, `source` and `biography` are the same in lines 1, 5, 6 and 9. Lines 4 and 7 have different versions, and Line 14 has none. Move them to a shared module when you next add a line, and use them in the new line.
- **The design PNG originals are most of the git size** (about 32 MB on disk, 24 MB packed). `docs/four-line-plan.md:32` says to keep them on purpose. If the repo size becomes a problem, move them to Git LFS or to storage outside git.
- **No lint or format tool.** The project has a strict `tsc` and tests. Add Biome only if the style starts to drift.
- **Lines 3bis and 7bis are not in the coming-soon list.** Add them after you check that the badge layout works with four-character labels.

## Findings that were wrong

- "fr/en i18n keys have no parity check." `t()` returns a union of both locale objects, so a key that is in only one locale is a type error.
- "`docs/verification.md:47` says the wrong shared lines." The sentence refers to the group of IDs, and the data agrees with it.

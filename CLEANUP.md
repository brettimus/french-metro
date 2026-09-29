# Cleanup tasks

Source: read-only audit on 29 September 2026 (five areas: code, tests, build and deploy, repo hygiene, docs and data). A second agent checked each finding against the code. This file lists the confirmed items. Remove an item when it is done.

## Do first

### 1. The release prune command deletes all rollback targets

- Where: `docs/deployment.md:74-76`, `apps/web/ops/deploy.sh:50,57,88`
- Problem: the command reads `readlink ../previous`, but `deploy.sh` never creates a `previous` symlink. It makes only a temporary `current.previous` in `restore_previous`, and `cleanup` deletes it. `prev` is always empty, so the loop deletes every release except the active one. The Rollback section then has nothing to roll back to.
- Fix: keep the N newest release directories (by mtime) and delete the others. As an alternative, make `deploy.sh` write a real `previous` symlink after a successful switch.

### 2. Deploy does not run tests or the typecheck

- Where: `apps/web/ops/deploy.sh:9-21`
- Problem: the only check before `git archive` and the build is the clean-tree check. The remote health check rolls back if the server does not start, but it does not find wrong content or type errors.
- Fix: run `bun run test && bun run typecheck` before the archive step.

### 3. Build output is committed to git

- Where: `apps/web/public/app-*.js`, `apps/web/public/build.json`, `.gitignore`
- Problem: `deploy.sh:20-21` rebuilds these files in the staging directory, so the committed copies never ship. Each local build changes them, and 18 commits contain only changes to these files.
- Fix: add both paths to `.gitignore` and run `git rm --cached` on them. Make sure `bun run dev` and `bun run start` build first, or write in the README that you must run `bun run --cwd apps/web build` before a local run. `apps/web/src/handler.ts:35-39` reads `build.json`.

## Small items

### 4. `verify-deployment.ts` must be edited for each new line

- Where: `apps/web/ops/verify-deployment.ts:52-60` (routes), `68-76` (illustrations)
- Fix: import `lines` from `apps/web/src/data/lines.ts` and make the lists from it: the line page, one station page and the illustration for each line.

### 5. No test checks that illustration files exist

- Where: the `image` field in each `apps/web/src/data/line*.ts`, and `apps/web/src/app.ts:66` (`metropolitain.webp`)
- Fix: add a test that resolves each path against `apps/web/public` and checks it with `Bun.file(...).exists()`.

### 6. No test checks that shared stations agree across lines

- Where: `apps/web/src/data/line*.ts`. 22 station IDs are on more than one line. Each copy is a separate object written by hand.
- Fix: add a test that groups stations by `id` across `lines` and checks that each group has the same `name` (both locales).

### 7. One test does not test the code

- Where: `apps/web/tests/commit.test.ts:13-17`
- Problem: it checks a regex literal against literal strings. It never calls `readCommit()`, so it passes even if `src/commit.ts` is deleted.
- Fix: delete it, or change it to check the value that `readCommit()` returns.

### 8. Ten i18n keys are not used

- Where: `apps/web/src/i18n.ts`, in both `fr` and `en`: `clear`, `station`, `selected`, `end`, `branch`, `fullyRead`, `noStory`, `searchCount`, `branchIvry`, `branchVillejuif`
- Fix: delete them. The typecheck will show any use that the audit missed.

### 9. `ornament()` is not used

- Where: `apps/web/src/illustrations.ts:61-68`
- Fix: delete it. Also update `docs/design/multi-line-art.md:28`, which says "both exports".

### 10. Line 14 source labels use a different order

- Where: `apps/web/src/data/line14.ts` (30 labels, for example line 33)
- Problem: Line 14 writes "Wikipédia · X". The other six lines write "X · Wikipédia". Users see this in the Sources list on station pages.
- Fix: change the Line 14 labels to "X · Wikipédia".

### 11. Stale docs

- `README.md:14` says the release plan is `docs/four-line-plan.md`. That plan describes 4 lines, and the atlas has 7. Say that the plan is historical, or move `four-line-plan.md` and `multi-line-plan.md` to `docs/archive/`.
- `docs/verification.md:1-3` has the title "Four-line atlas verification" and one date, but the file also covers the 6-line and 7-line states. Change the title to "Atlas verification log" and put a date on each section.

## Known, no action now

These items are real, but they are not worth the work now. Do them when the given condition occurs.

- **Line 7 branches are hardcoded.** `types.ts:40-41`, `map.ts:40-57` and `app.ts:61-63` (`id === "7"`) contain the names "ivry" and "villejuif". Make branches generic when you add a second line with branches (for example Line 13).
- **Each line file has its own copy of the helpers.** `wiki`, `source` and `biography` are the same in lines 1, 5, 6 and 9. Lines 4 and 7 have different versions, and Line 14 has none. Move them to a shared module when you next add a line, and use them in the new line.
- **HTML escaping is written twice.** `app.ts:19-26` and `illustrations.ts:46-53`. The second copy escapes only the `cls` parameter, and no caller sets it. Remove `cls` and `escapeAttribute` when you do item 9.
- **The design PNG originals are most of the git size** (about 32 MB on disk, 24 MB packed). `docs/four-line-plan.md:32` says to keep them on purpose. If the repo size becomes a problem, move them to Git LFS or to storage outside git.
- **A passing test prints an error stack trace.** `handler.test.ts:117-127` triggers `console.error` at `handler.ts:101` on purpose. Stub `console.error` in that test if the output becomes confusing.
- **Failed deploys can leave `.staging-*` directories** on the VM (`deploy.sh:24-44`). The prune glob `*/` does not match directories that start with a dot. Add `.staging-*` to the prune command when you do item 1.
- **No lint or format tool.** The project has a strict `tsc` and tests. Add Biome only if the style starts to drift.
- **The `packages/*` workspace glob matches nothing** (`package.json:4-7`). Remove it the next time you edit that file.
- **Lines 3bis and 7bis are not in the coming-soon list.** Add them after you check that the badge layout works with four-character labels.

## Findings that were wrong

- "fr/en i18n keys have no parity check." `t()` returns a union of both locale objects, so a key that is in only one locale is a type error.
- "`docs/verification.md:47` says the wrong shared lines." The sentence refers to the group of IDs, and the data agrees with it.

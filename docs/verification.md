# Atlas verification log

Each section records the checks for one state of the atlas, with the date of the check. The first four sections cover the four-line release (Lines 4, 5, 7 and 14).

## Automated checks

Checked on 19 September 2026.

- 30 Bun tests pass. TypeScript passes.
- Lines 4, 5, 7 and 14 contain 29, 22, 38 and 21 entries: 110 line-specific entries and 220 French/English direct station URLs. These counts apply to the four-line release only; see the Lines 6 and 9 section below.
- Every entry has one map point, bilingual text and HTTPS sources. Route tests check order, complete path coverage, termini, branches and adjacent river crossings.
- Maison Blanche keyboard tests check left, right and upstream selection against visible map positions.
- Displayed interface and station data contain no em dashes.
- Unknown localized routes return the app error view with HTTP 404. Missing assets return 404; malformed encoding returns 400. HEAD has no body.
- Server checks cover path traversal, commit reporting and rebuilt bundle discovery.

## Browser checks

Checked on 19 September 2026.

The [final UI report](reviews/final-ui-qa.md) records measurements and screenshots:

- Home in both languages at 320, 390, 768, 1024 and 1440 px. All illustrations load and image/route columns remain separate.
- All four maps at all five widths in both languages: 40 combinations without horizontal overflow or out-of-bounds labels.
- All 220 localized station panels at 320 px; all 110 French source lists expanded. No horizontal dialog overflow.
- Long titles, termini, both Line 7 branches, filtered and empty search, copied-link feedback, locale changes, Back/Forward, Escape, focus return, About and the branded error view.
- No console warning or error captured during the final pass.

Reduced motion was checked in source. The browser tool does not expose preference emulation or pointer hover. Zoom shortcuts did not change the measured viewport, so no successful enlarged-text check is claimed. These limits remain explicit in the UI report.

## Content and design

Checked on 19 September 2026.

Separate goal-scoped workers researched each new line, reviewed the other line, checked copy and tested UI states. The [code review](reviews/final-code-review.md) found the fork keyboard issue; it is fixed and tested. The [first copy panel](reviews/copy-panel.md) and [final panel](reviews/final-copy-panel.md) record accepted and rejected editorial suggestions.

Source audits: [Line 4](research/line4.md), [Line 5](research/line5.md), [Line 7](research/line7.md), [Line 14](research/line14.md). The independent new-line reviews record source qualifications and corrections. Line 5 now distinguishes the 1907 extension from the permanent 1942 transfer, without implying continuous service through 1931.

Generated art is interpretive, not historical evidence. Original PNGs and [prompts](design/lines-4-5-art.md) are committed; the app serves WebP copies. Saint-Sulpice artwork was corrected against a facade reference. Map drawings remain schematics.

## Release verification

Checked on 19 September 2026.

The home alignment was deployed first as `5737f25`. The deployment script verifies the selected commit, service restart, public health, browser bundle, a direct station URL for every line, and all four route images. Final public release checks are recorded in the release commit report.

The integrated release `96c22a8` passed public health, bundle, all four direct-route and image checks. The final source review corrected Saint-Michel to steel caissons in the plural. See the independent [Line 4](reviews/line4-cross-review.md) and [Line 5](reviews/line5-cross-review.md) reports.

## Lines 6 and 9

Checked on 29 September 2026.

With Lines 6 and 9, the app has 6 lines (29, 22, 28, 38, 37 and 21 entries): 175 line-specific entries and 350 French/English direct station URLs. `apps/web/ops/verify-deployment.ts` checks one direct station URL and the route image for each of the 6 lines. The Line 9 review findings (copy corrections, image alt text and the shared Trocadéro escalator date on Line 6) were fixed in the commit "Address Line 9 review findings".

## Line 1

Checked on 29 September 2026.

With Line 1, the app has 7 lines (25, 29, 22, 28, 38, 37 and 21 entries): 200 line-specific entries and 400 French/English direct station URLs. Line 1 shares the `chatelet`, `bastille`, `gare-de-lyon`, `palais-royal-musee-du-louvre`, `charles-de-gaulle-etoile`, `franklin-d-roosevelt` and `nation` station IDs with Lines 4, 5, 6, 7, 9 and 14; their facts were cross-checked for consistency. Source audit: [Line 1](research/line1.md). `apps/web/ops/verify-deployment.ts` checks one direct station URL and the route image for each of the 7 lines. The home page no longer shows the coming-soon section, because no lines are listed; a test checks that the section is omitted when the list is empty. Automated hover checks with the agent-browser CLI do not reliably fire `pointerenter`; use keyboard focus or a dispatched `PointerEvent` to check the station preview.

## Line 11

Checked on 6 October 2026.

With Line 11, the app has 8 lines (Lines 1, 4, 5, 6, 7, 9, 11 and 14 have 25, 29, 22, 28, 38, 37, 19 and 21 entries): 219 line-specific entries and 438 French/English direct station URLs. Line 11 shares the `chatelet` (Lines 1, 4, 7, 11 and 14), `hotel-de-ville` (Lines 1 and 11) and `republique` (Lines 5, 9 and 11) station IDs with lines in the app. The owner of each shared ID is the lowest-numbered line that has it, and the other lines must use its name and etymology byte for byte. Line 1 owns `chatelet` and `hotel-de-ville`. Line 5 owns `republique` in the app; the Line 3 draft will own it when Line 3 is added. `belleville` (Line 2 draft) and `arts-et-metiers` (Line 3 draft) are also on Line 11, and the copy check matched their text to those drafts. Source audit: [Line 11](research/line11.md). Illustration notes: [Line 11 art](design/line11-art.md). `apps/web/ops/verify-deployment.ts` checks one direct station URL and the route image for each of the 8 lines.

The Line 11 review fixes are in the commit "Fix Line 11 copy and facts from review; wrap header badges on phones":

- Facts: 84 claim pairs were checked. 78 were supported and 6 were confirmed errors (4 misleading, 1 English/French mismatch, 1 wrong date). The fixes correct the Hôtel de Ville temporary terminus date, the Coteaux Beauclair name link, the Pyrénées 700 m figure (the interstation, not the ramp), the French Montreuil – Hôpital construction method, the Goncourt founding (the Académie, founded in 1903 under Edmond de Goncourt's will), the Rosny-Bois-Perrier Line 15 date (2031) and the Serge Gainsbourg "heir" claim. Two sources were added (Académie Goncourt, Ligne 15 Est).
- Copy: before the fixes, 73 of 76 station units scored "ship" and 3 "edit" (mean 0.938). Nine copy edits and two parity edits fixed repeated openers, a 29-word sentence, a repeated 1935 date and English/French differences. A test run of the fixed copy scored all 76 units "ship" (mean 0.948). All 6 line units scored "ship" before and after.
- Interface: the header line badges overflowed at 390 px (scroll width 413 px). On screens up to 600 px wide they now wrap onto a second row.

Checks run on the committed state: 159 Bun tests pass and TypeScript passes. The copy check (`check-copy.ts 11`) and the data check (`check-line.ts 11`, which compares `line11.ts` with the reviewed copy) pass. The 50 source URLs returned no errors or redirects, and a live check of 52 URLs returned HTTP 200 for all of them.

Open items from the review: the Hôtel de Ville text gives the day 18 March 2019 and the Mairie des Lilas text gives 24 July 1867, although the audit prefers years only. The Châtelet text does not mention the 2019 closure. Some claims (Télégraphe tracks at 96 m, the Place des Fêtes escalators, Rosny-Bois-Perrier as the easternmost station, Coteaux Beauclair as the first viaduct station since 1905, the Serge Gainsbourg ticket puncher) were not checked again in this review.

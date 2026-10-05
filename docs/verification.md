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

# Four-line atlas verification

Checked on 19 September 2026.

## Automated checks

- 30 Bun tests pass. TypeScript passes.
- Lines 4, 5, 7 and 14 contain 29, 22, 38 and 21 entries: 110 line-specific entries and 220 French/English direct station URLs.
- Every entry has one map point, bilingual text and HTTPS sources. Route tests check order, complete path coverage, termini, branches and adjacent river crossings.
- Maison Blanche keyboard tests check left, right and upstream selection against visible map positions.
- Displayed interface and station data contain no em dashes.
- Unknown localized routes return the app error view with HTTP 404. Missing assets return 404; malformed encoding returns 400. HEAD has no body.
- Server checks cover path traversal, commit reporting and rebuilt bundle discovery.

## Browser checks

The [final UI report](reviews/final-ui-qa.md) records measurements and screenshots:

- Home in both languages at 320, 390, 768, 1024 and 1440 px. All illustrations load and image/route columns remain separate.
- All four maps at all five widths in both languages: 40 combinations without horizontal overflow or out-of-bounds labels.
- All 220 localized station panels at 320 px; all 110 French source lists expanded. No horizontal dialog overflow.
- Long titles, termini, both Line 7 branches, filtered and empty search, copied-link feedback, locale changes, Back/Forward, Escape, focus return, About and the branded error view.
- No console warning or error captured during the final pass.

Reduced motion was checked in source. The browser tool does not expose preference emulation or pointer hover. Zoom shortcuts did not change the measured viewport, so no successful enlarged-text check is claimed. These limits remain explicit in the UI report.

## Content and design

Separate goal-scoped workers researched each new line, reviewed the other line, checked copy and tested UI states. The [code review](reviews/final-code-review.md) found the fork keyboard issue; it is fixed and tested. The [first copy panel](reviews/copy-panel.md) and [final panel](reviews/final-copy-panel.md) record accepted and rejected editorial suggestions.

Source audits: [Line 4](research/line4.md), [Line 5](research/line5.md), [Line 7](research/line7.md), [Line 14](research/line14.md). The independent new-line reviews record source qualifications and corrections. Line 5 now distinguishes the 1907 extension from the permanent 1942 transfer, without implying continuous service through 1931.

Generated art is interpretive, not historical evidence. Original PNGs and [prompts](design/lines-4-5-art.md) are committed; the app serves WebP copies. Saint-Sulpice artwork was corrected against a facade reference. Map drawings remain schematics.

## Release verification

The home alignment was deployed first as `5737f25`. The deployment script verifies the selected commit, service restart, public health, browser bundle, a direct station URL for every line, and all four route images. Final public release checks are recorded in the release commit report.

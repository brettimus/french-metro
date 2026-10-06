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

## Line 3

Checked on 6 October 2026.

With Line 3, the app has 9 lines (Lines 1, 3, 4, 5, 6, 7, 9, 11 and 14 have 25, 25, 29, 22, 28, 38, 37, 19 and 21 entries): 244 line-specific entries and 488 French/English direct station URLs. Line 3 shares the `saint-lazare` (Lines 3 and 14), `havre-caumartin` (Lines 3 and 9), `opera` (Lines 3 and 7), `reaumur-sebastopol` (Lines 3 and 4), `arts-et-metiers` (Lines 3 and 11) and `republique` (Lines 3, 5, 9 and 11) station IDs with lines in the app. Line 3 is the lowest-numbered line on each of them, so it now owns all six; `republique` moved from Line 5 to Line 3. The other shared IDs keep their owners: Line 1 owns `chatelet`, `hotel-de-ville`, `charles-de-gaulle-etoile`, `franklin-d-roosevelt`, `palais-royal-musee-du-louvre`, `bastille`, `gare-de-lyon` and `nation`. `villiers` and `pere-lachaise` are also on the Line 2 draft, which will own them, and the copy check matched their text to that draft. Source audit: [Line 3](research/line3.md). Illustration notes: [Line 3 art](design/line3-art.md). The line colour is the IDFM web colour `#6e6e00` (white text 5.39:1), not the coming-soon value `#837902` (4.47:1, below WCAG AA). `apps/web/ops/verify-deployment.ts` checks one direct station URL and the route image for each of the 9 lines.

The Line 3 review fixes are in the commit "Fix Line 3 copy and facts from review; align Havre – Caumartin on Line 9" (28 edits: 24 in `line3.ts`, 3 in `line9.ts`, 1 in `line11.ts`):

- Facts: 123 claim pairs were checked. 116 were supported, 6 were confirmed errors and 1 was unsourced. The fixes correct Porte de Champerret ("a former locality of Neuilly", not "a locality of Neuilly"), Havre – Caumartin (Rue du Havre recalls the trains from Saint-Lazare to Le Havre; it does not honour the port), Europe (Simone Veil was the first president of the directly elected European Parliament), Porte de Bagnolet (the Line 2 station was named for Rue de Bagnolet) and Louise Michel (the English text now says "the street it serves", to match the French). The Saint-Lazare leper hospital claim now has a source (Enclos Saint-Lazare), and Havre – Caumartin cites Rue du Havre. The sixth error, the Temple date "mid-13th century", was not changed: the proposed fix was refuted, because its own source puts the c.1140 Templar house near the Place de Grève, and the current text agrees with both cited sources. The 69 source URLs returned no errors or redirects.
- Shared stations: the Havre – Caumartin etymology and source were changed in `line9.ts` too, so the shared-etymology test passes. Réaumur – Sébastopol names Réaumur as on Line 4, and `line11.ts` names Henri Grégoire for Arts et Métiers as on Line 3.
- Copy: before the fixes, 92 of 100 station units scored "ship" and 8 "edit" (mean 0.926). Eight copy edits and four parity edits (Sentier, Quatre-Septembre, Arts et Métiers, the line summary) removed the "The station opened" openers and English/French differences. After the commit, 97 units scored "ship" and 3 "edit" (mean 0.928). All 6 line units scored "ship" before and after.
- Interface: the browser check passed at 1440x900 and 390x844 in French and English, with no console errors, no horizontal overflow and the `#6e6e00` badge.

Checks run on the committed state: 160 Bun tests pass and TypeScript passes. The copy check (`check-copy.ts 3`) and the data check (`check-line.ts 3`, which compares `line3.ts` with the reviewed copy) pass.

Open items from the review: the Porte de Bagnolet etymology now scores "edit" (French 0.72, English 0.84). The French text has a 27-word sentence and the calque « nommée d’après », and the English unit takes the same parity flag. The Villiers French etymology (0.85, "edit") was not changed, because Villiers is shared with the Line 2 draft; one of its flags is a false positive on the proper name « Avenue de Villiers ». The Temple date stays as in the cited sources.

## Line 2

Checked on 6 October 2026.

With Line 2, the app has 10 lines (Lines 1, 2, 3, 4, 5, 6, 7, 9, 11 and 14 have 25, 25, 25, 29, 22, 28, 38, 37, 19 and 21 entries): 269 line-specific entries and 538 French/English direct station URLs. Line 2 shares the `charles-de-gaulle-etoile` (Lines 1, 2 and 6), `nation` (Lines 1, 2, 6 and 9), `villiers` (Lines 2 and 3), `barbes-rochechouart` (Lines 2 and 4), `stalingrad` (Lines 2, 5 and 7), `jaures` (Lines 2 and 5), `belleville` (Lines 2 and 11) and `pere-lachaise` (Lines 2 and 3) station IDs with lines in the app. Line 1 keeps `charles-de-gaulle-etoile` and `nation`. Line 2 is the lowest-numbered line on the other six, so it now owns them: `barbes-rochechouart` moved from Line 4, `stalingrad` and `jaures` from Line 5, `belleville` from Line 11, and `villiers` and `pere-lachaise` from Line 3. Line 2 took their names and etymologies byte for byte from the earlier owners. The other shared IDs keep their owners: Line 1 also owns `chatelet`, `hotel-de-ville`, `franklin-d-roosevelt`, `palais-royal-musee-du-louvre`, `bastille` and `gare-de-lyon`; Line 3 owns `saint-lazare`, `havre-caumartin`, `opera`, `reaumur-sebastopol`, `arts-et-metiers` and `republique`; Line 4 owns `gare-du-nord`, `gare-de-lest`, `strasbourg-saint-denis`, `montparnasse-bienvenue`, `raspail` and `denfert-rochereau`; Line 5 owns `oberkampf` and `place-ditalie`; Line 6 owns `trocadero` and `bercy`; Line 7 owns `chaussee-dantin-la-fayette`, `pyramides` and `maison-blanche`. Source audit: [Line 2](research/line2.md). Illustration notes: [Line 2 art](design/line2-art.md). The line colour is `#003ca6` with white text. `apps/web/ops/verify-deployment.ts` checks one direct station URL and the route image for each of the 10 lines.

The Line 2 review fixes are in the commit "Fix Line 2 copy and facts from review" (29 edits, all in `line2.ts`):

- Facts: 123 claim pairs at 25 stations were checked. 118 were supported and 5 were confirmed errors (2 overstated, 2 misleading, 1 wrong fact); none was unsourced. The fixes correct Couronnes (the 1903 fire led to a separate lighting circuit, not "at least two exits per station", and most of the 84 victims died against the blind end of the station; the text gives no exact number because the sources say 75 or 77), Porte Dauphine (the Guimard pavilion was listed in 1965 and restored in 1999), Blanche (the siding is between Blanche and Pigalle) and Rome ("many streets", not "the streets"). A proposed change to the line summary ("stations stand on the sites of gates") was refuted, because the Place de Clichy name does recall the Barrière de Clichy.
- Sources: the 71 source URLs returned no dead links. The one redirect, the English train fire article, now uses its current title (Paris_Metro_train_fire) at Barbès – Rochechouart, at Couronnes and in the line-level sources. Porte Dauphine now cites « Entrée de métro Guimard » and Couronnes cites « Incendie du 10 août 1903 dans le métro de Paris ».
- Copy: before the fixes, 91 of 100 station units scored "ship" and 9 "edit" (mean 0.918). Nine copy edits (Charles de Gaulle – Étoile, Ternes, Place de Clichy, La Chapelle and Avron) and three parity edits (La Chapelle in French, Nation) fixed the edit-band units. A test run of the fixed copy scored 99 units "ship" and 1 "edit" (mean 0.926). All 6 line units scored "ship"; the one finding, "Wall, Farmers" in the summary, is a false positive on « mur des Fermiers généraux ».
- Readability: the Stalingrad context now says that the viaduct curves around the Rotonde de la Villette, designed by Ledoux, in place of the transfer-voucher detail. The image alt text now says "beside a stretch of water" / « au bord d’un plan d’eau ».
- Shared stations: names, areas, etymologies and art are byte-identical on every line that has them, and no context on another line contradicts Line 2. Line 2 does not cross the Seine, so `map.ts` needs no river crossing.
- Interface: the browser check passed at 1440x900 and 390x844 in French and English, with no console errors, no horizontal overflow and the `#003ca6` badge with white text.

Checks run on the committed state (`eee4710`): 161 Bun tests pass and TypeScript passes. The copy check (`check-copy.ts 2`) and the data check (`check-line.ts 2`, which compares `line2.ts` with the reviewed copy) pass.

Open items from the review: the Villiers French etymology (0.85, "edit") was not changed, because Line 3 holds the same text. Three source conflicts stay as the audit decided: the first name of Alexandre Dumas station (Rue de Bagnolet or Bagnolet), the date when Anvers stopped being the terminus (31 January 1903; the station article differs) and the Couronnes death count (75 or 77; the text gives no number). The review also reported Denis Diderot under people at Charles de Gaulle – Étoile in `line1.ts`. This is a false report: the Diderot entry is on Reuilly – Diderot, and Charles de Gaulle – Étoile has no people entry.

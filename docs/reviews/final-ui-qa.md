# Four-line visual and functional QA

Checked on 19 September 2026 in Chrome at `http://localhost:3000`. The main interaction checks used browser bundle `app-kamxhc4m.js`; the final empty-state fix was verified in `app-jjvp24nj.js`. No application code or CSS was changed during this pass.

## Result

No blocking visual or functional issue found. All four lines appear in the right order, with complete route links and both languages. Images and route glyphs stay in separate columns. Long card titles do not move the image or action out of alignment. The mobile header fits all four badges.

The minor empty-state issue was fixed and rechecked: “Choose a station” is hidden for zero results and returns when a search has a match. No open finding remains from this pass.

## Measured coverage

- Home in French and English at 320, 390, 768, 1024 and 1440 px. All four image assets load. Document width equals viewport width at all ten combinations. Header links, line controls and language controls have at least 44 px hit dimensions.
- All four route maps at all five widths in both languages: 40 combinations. No station label extends beyond either horizontal viewport edge. No document overflow.
- All 110 station entries in both languages at 320 px: 220 opened panels. Every panel has a title, naming explanation, history paragraph, SVG illustration and source links. All dialogs have equal scroll and client widths. No entry uses a navigation link from another line, including shared station names.
- All 110 source disclosures expanded in French at 320 px. Every disclosure opens; no expanded source list causes horizontal dialog overflow. Source labels are shared between locales.
- Long titles for Montparnasse–Bienvenüe, Bobigny–Pantin–Raymond Queneau, Aubervilliers–Pantin–Quatre Chemins and Bibliothèque François-Mitterrand checked at 390, 768, 1024 and 1440 px, in addition to the complete 320 px pass. No dialog overflow.
- Terminal panels for all four lines have only their one valid neighbouring station. Line 7 has three termini. Maison Blanche presents both southern branches, without a link connecting the two branch ends.

The panel checks used actual discovered map links and browser navigation. Measurements used read-only DOM inspection. They verify rendering and route boundaries, not historical accuracy; the separate source audits cover that requirement.

## Interaction checks

- Searching `ober` on Line 5 shows one station and “1 station”. Enter opens Oberkampf. The list hides the schematic-only note and keeps its source link.
- Searching `zzzz` shows “0 stations” and the empty message. No hidden station is selected.
- Expanded sources and Copy link work in the Oberkampf entry. Copy reports “Lien copié”. The copy icon now represents a link, not external navigation.
- Switching Oberkampf from French to English retains the selected station. Back and Forward restore the matching localized entry. Escape closes the entry and returns focus to the relevant map or list item.
- The Maison Blanche map keyboard fix passes: Left focuses Le Kremlin-Bicêtre, Right focuses Porte d’Italie, and Up focuses Tolbiac.
- The station header stays visible during lower content and source-list scroll. The language and close controls remain available. The title is clear of the header when the entry opens.
- Maison Blanche now uses a house drawing. Saint-Sulpice uses the church drawing. Library and temple forms remain distinct subjects.
- French About at 320 px fits the viewport and closes with Escape.
- `/en/lines/99` now renders the branded 404 state with a return link, rather than a browser error page.
- No console warnings or errors were captured during the final pass.

## Limits

Reduced motion was checked in current source: CSS disables transitions, animations and smooth scrolling; the application skips View Transition calls for the same preference. The browser API does not expose preference emulation. The previous zoom shortcuts did not change the viewport or pixel ratio, so no successful enlarged-text check is claimed. These are explicit test-tool limits, not confirmed product failures.

The browser API has no pointer-hover action. Focus enlargement and hover style rules were reviewed, and keyboard selection was checked live. This pass did not repeat a full pointer-hover sweep.

## Screenshots and evidence

Actual captures and measured results are in `/tmp/metro-final-qa/`.

Recommended delivery images:

- `home-fr-1440.png`: full desktop home, all four images loaded.
- `home-en-390.png`: full mobile home, all four images loaded.
- `line5-map-en-1440.png`: full desktop Line 5 map.
- `oberkampf-fr-390.png`: French Oberkampf entry.
- `oberkampf-fr-390-sources.png`: expanded source list with sticky controls.
- `saint-sulpice-fr-1440.png`: desktop Saint-Sulpice entry.

Additional captures cover all home widths, Line 5 map widths, search, empty search, Maison Blanche, About and 404. `panels.json`, `sources.json` and `bounds.json` hold the browser measurements. Full-page screenshots of lazy-loaded images must be taken after scrolling through the page and returning to the top; the two recommended home captures follow this procedure.

Viewport overrides were reset before handoff. Browser control is released to root.

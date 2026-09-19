# UI state audit

Checked on 19 September 2026 in Chrome at `http://localhost:3000`. This audit covers the two-line build after the home alignment fix. Lines 4 and 5 need a final integration check. No application files were changed by this reviewer.

## Main findings

1. **High: prepare the mobile header for four lines.** At 320 px, the English brand is 169 px wide. The two line links already use 54 px, before gaps. Four links will not fit. In `styles.css`, change `.masthead` to a two-row grid below 540 px: brand and language on the first row, `.header-lines` on the second. Give each line and language link a minimum 44 by 44 px hit area. Current FR and EN hit areas are only 11/13 px wide and 34 px high. This also affects `.sheet-language` in the station dialog.
2. **Medium: update the result count while searching.** Search for `opera` on Line 7 returns Opéra, but `.map-meta` still says `38 stations`. In `app.ts` `filter()`, show the number of matching stations, with singular and plural strings. Keep the full line count for the unfiltered map and list.
3. **Medium: remove map-only information from list states.** `.map-legend` still shows “Schematic route · not to scale” below the list and empty result message. Hide that sentence in list mode; keep the source link. This makes the empty state easier to understand.
4. **Medium: use a distinct generic district drawing.** Maison Blanche currently uses the same four-tower image as Bibliothèque François-Mitterrand. That form strongly suggests the BnF. Use a simple house or district drawing for Maison Blanche and retain the four towers for the library. Check the other generic `towers` assignments when new lines are added.
5. **Low: use the same terminal label at both ends.** The first stop says “Terminus”; Aéroport d’Orly says “End of branch”, although Line 14 has no fork. Use “Terminus” at both ends. The “Choose a branch” section at Maison Blanche works well.
6. **Low: remove the external-link arrow from Copy link.** The `#copy-link` action copies text; it does not open a page. Use a small copy/link SVG or text alone. Keep the external arrow for sources and biographies.
7. **Low: raise small secondary text sizes.** Several mobile labels and footer links use 8 to 10 px type. These labels are hard to read even with adequate colour contrast. Set useful secondary text to at least 11 or 12 px and let the footer wrap. Keep station names and entry text at their current readable size.
8. **Low: remove redundant station copy.** Examples in the audited build include the final sentence of the BnF naming paragraph and the second sentence of the Maison Blanche naming paragraph. They restate the naming chain. The copy worker is already responsible for this pass.

## State coverage

- **Home and card layout:** French at 320, 390, 768, 1024 and 1440 px. English at 390 and 1024 px. Image composition, route glyph column, card rows, feature links and footer checked. No horizontal overflow. The two card images and bottom actions align at 768 px despite the different title lengths. The requested overflow fix passes.
- **Line map:** Line 7 at 320 px, including start, middle, Seine crossing, fork and both ends. Line 14 at 390, 768, 1024 and 1440 px. Measured document width equals viewport width. Line 7 branch labels fit within 320 px; the fork is clear and does not imply a connection between the two termini.
- **Station entry:** Maison Blanche in English and French at 320 px; Bibliothèque François-Mitterrand in English at all five widths. No horizontal overflow in the dialog. The long title wraps inside its content box. The close icon is centered. The modal scrolls independently and keeps its header controls accessible.
- **Sources and share:** Expanded Sources for Maison Blanche. Copy link reports “Link copied”. Source links remain separate from biography links. Language change stays on the same station and resets entry scroll to its heading.
- **Navigation:** Maison Blanche provides two next-station choices. Saint-Denis–Pleyel has no previous link. Aéroport d’Orly has no next link. Browser Back closes the station, and Forward opens it again. Escape closes the station and restores focus to its map or list entry.
- **List and search:** Full Line 14 list; accent-free `opera` search on Line 7; no-result `zzz` search; `gobelins` plus Enter opens Les Gobelins. Closing returns to the filtered list and its station link. Search result and empty-state copy need the count/legend fixes above.
- **Read/reset:** Reset changes the current Line 7 count from 4 to 0. Opening Les Gobelins changes it to 1. No console errors or warnings were collected in this tab.
- **About:** French at 320 px. Dialog content and close control fit without horizontal clipping. Escape closes it.
- **Keyboard focus:** Skip link becomes visible on Tab, with a 2 px outline. Station entry focus is placed on the heading. Close returns focus to the selected entry. Hover and focus enlargement rules were reviewed in CSS; a full pointer-hover sweep was not performed because the exposed browser API has no hover action.
- **Reduced motion:** Source review confirms that CSS disables animation, transitions and smooth scrolling under `prefers-reduced-motion: reduce`; application code also skips view transitions. Browser preference emulation is not exposed by the available tool. The active browser preference was `false`, so this is a source check rather than a live reduced-motion run.
- **Enlarged text:** Browser zoom shortcuts did not change the reported viewport or pixel ratio. No enlarged-text pass is claimed. Keep this check open for the final QA run if a supported control is available.
- **Invalid route:** Navigation to `/en/lines/99` was blocked by Chrome with `ERR_BLOCKED_BY_CLIENT`. The application error view could not be inspected in this browser. Verify its HTML through the server tests and recheck in the final public browser run.

Viewport overrides and zoom shortcuts were reset before this audit ended.

## Screenshot evidence

Actual browser captures are in `/tmp/metro-qa/`. Keep these as review evidence; make new final-release captures for delivery.

- `home-fr-{320,390,768,1024,1440}.png`
- `line7-map-en-320.png`, `line7-fork-en-320.png`
- `station-fork-sources-en-320.png`, `station-fork-fr-320.png`
- `search-fr-320.png`, `search-empty-fr-320.png`
- `about-fr-320.png`
- `line14-desktop.png`, `map14-en-{390,768,1024}.png`
- `station-long-en-{320,390,768,1024,1440}.png`
- `terminal-en-1440.png`, `list-en-1024.png`
- `home-keyboard-en-1024.png`

The capture named `home-en-enlarged.png` is not proof of enlarged text; the shortcut had no measurable effect.

## Final integration checks

Repeat the home widths with four lines and both locales. Include the long Line 5 terminus name. Check each new line's first and last station, one long title, one person link, one expanded source list and one search result. Recheck the shared header, map search count, list legend and terminal labels after fixes. Capture final desktop home, mobile home, Line 5 map, and one station entry for the requested completion message.

## CSS implementation pass

The CSS reviewer applied the shared style fixes after the audit:

- Two-row header at 600 px and below, with room for four line badges.
- Minimum 44 px targets for language, line switching, close, search, list toggle, source disclosure, station navigation and other small actions.
- Secondary labels now use at least 11 px text. Mobile search uses 16 px text to avoid browser focus zoom.
- Card image composition remains 3:2. Card row alignment still uses subgrid. Featured links can wrap without forcing the card wider.
- The station header stays visible during dialog scroll. Scroll padding keeps keyboard targets clear of this header.
- Obsolete trailing geometry and touch-target overrides were merged into the base rules. Map label bounds still use actual available space.

The current two-line page has no horizontal overflow at 320, 390, 768, 1024 or 1440 px after these changes. At 320 px, station language links and Close measure 44 by 44 px; the dialog scroll width equals its client width. The station heading is visible below the header on entry. The viewport was reset. Final four-line verification is pending integration.

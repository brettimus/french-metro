# Bilingual atlas verification

Checked on 19 September 2026.

## Automated checks

- 26 Bun tests pass. TypeScript passes.
- All 59 station URLs return the app in both languages (118 direct links).
- Line 7 contains 38 unique stations. Its two paths have 34 and 33 stations; both share the 29-station trunk through Maison Blanche. Neither path links the southern termini to each other.
- Line 14 contains 21 unique stations in order. Every station has one map point, text in both languages, and HTTPS source links.
- Unknown lines, stations and missing files return 404. Malformed URL encoding returns 400. Encoded station paths agree between server and client. HEAD sends no body.
- Existing checks cover path traversal, commit reporting, the executable script URL, and rebuilding the browser bundle without a server restart.

## Browser checks

Chrome desktop, 390 × 844 and 320 × 740 views were checked. The home illustrations and station panels were inspected visually. Both maps fit at 320 pixels; station labels remain inside the viewport. The search toolbar wraps on small screens.

The following actions passed:

- Open Line 7, Les Gobelins, and the next station; Back restores Gobelins. Close returns to the line; Back returns to the home page without a duplicate line entry.
- Switch between French and English inside a station panel. The station stays selected and background scrolling stays locked.
- Search `chatelet` without accents. Search with no matches. Return to the map.
- Search `villejuif` and move with ArrowDown through visible results.
- Open Maison Blanche and choose the Kremlin-Bicêtre branch. Reload its direct URL.
- Open Line 14 and its Pleyel entry on a narrow screen.

Reduced-motion CSS disables animations; the View Transition API is optional. Native dialogs provide focus containment and Escape handling. Reading progress handles unavailable local storage.

## Content and design review

Separate research workers checked each line, then reviewed one another’s work. Corrections distinguish Corentin Cariou’s station renaming in 1946 from the earlier avenue naming, and place the mint’s move to Quai de Conti in 1775 before the metro decoration. The detailed claim audits are [Line 7](research/line7.md) and [Line 14](research/line14.md).

The generated route art is interpretive. It is not used to establish geography, station count, or historical claims. The maps are schematics. Original design references and prompts remain in `docs/design/`.

The deployment verifier checks the public health commit, browser bundle, direct station URLs in both languages, and both route images.

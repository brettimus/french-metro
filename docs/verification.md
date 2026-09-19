# Line 14 atlas verification

Verified on 19 September 2026.

- Bun tests cover server responses, path traversal rejection, commit reporting, executable browser script references and manifest changes after a rebuild.
- TypeScript check passes.
- Chrome: desktop layout and a 390 × 844 mobile viewport inspected visually.
- Live first release: station navigation traversed all 21 stops from Saint-Denis–Pleyel to Orly. Terminal navigation buttons are disabled at the ends. No browser console errors were reported during that traversal.
- Mobile search finds both Orly stops. A query with no match shows an immediate empty-state message. Returning to the map clears the query.
- Story source links expand, Escape closes dialogs, and next-stop navigation updates the URL.
- Mobile station-label bounds fit within the viewport; document width equals viewport width.
- Generated panorama is displayed in the About dialog. Both original generated images and their prompts are in `docs/design/`.
- Reduced-motion CSS disables transitions and animations. The View Transition API is used only when motion is allowed; other browsers use the same dialogs without that API.
- Reading progress is stored only in localStorage and handles unavailable browser storage.
- Secret-pattern and sensitive-filename scans found no matches in the files checked before publication.

The route order was checked against the [Transilien station list](https://www.transilien.com/fr/page-lignes/metro-14). The line opening and extension dates come from [RATP’s history](https://www.ratp.fr/en/discover/heritage/history-metro-line-14) and [extension page](https://www.ratp.fr/prolongement-metro-ligne-14). Each station story links its local historical source. This is an interpretive atlas, not a geographic map or a live journey planner.

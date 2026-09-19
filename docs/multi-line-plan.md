# Métro Stories: multi-line and bilingual release

## Outcome

Publish a concise station-name atlas in French and English. Line 14 remains available. Add the whole of Line 7, including Les Gobelins and both southern branches. A route-selection home page offers the completed lines and clearly marks other lines as coming soon.

## Editorial rule

Every station leads with its name origin: “Called X because Y” / “La station doit son nom à…”. Explain compound names and names inherited from streets. Add a short, useful historical paragraph. Link to sources and to notable people where useful. Do not substitute a nearby landmark’s history for a station’s etymology. Qualify disputed origins. Do not use invented quotations, generic travel slogans, fake counts or unsourced dates.

## Structure

- Shared typed data contract: `apps/web/src/data/types.ts`.
- Separate line modules: `data/line7.ts` and `data/line14.ts`; each exports `line7` / `line14` as `MetroLine`.
- Canonical routes: `/en`, `/fr`, `/{locale}/lines/{line}`, `/{locale}/lines/{line}/stations/{station}`.
- Direct URLs work after reload through explicit server route handling. Unknown paths and missing assets still return 404.
- Home defaults to French; `/en` stays available. Language links preserve the current line and station.
- Preserve old `/#madeleine` style Line 14 links by replacing them with the corresponding English route.
- Graph-based paths model Line 7’s fork at Maison Blanche. Previous/next controls follow the chosen branch and never connect the end of one branch directly to the other.
- Reading progress is keyed by line and station. All UI labels, empty states, navigation and metadata are translated.

## Visual direction

A restrained French transport atlas: warm paper, clear transit numbers, pink for Line 7 and violet for Line 14. Useful illustrations reference the subject of the name. Replace repeated generic building icons, oversized promotional copy, fake compass markings and decorative statistics. Use fine rules, generous readable type, and deliberate route geometry. Short hover and panel transitions; respect reduced-motion preferences.

A new generated home-page concept will be committed under `docs/design/`. Images are interpretive, not geographic evidence.

## Independent Codex slices (started one at a time)

1. **Line 7 research and French/English text.** Own `data/line7.ts` and `docs/research/line7.md`. Verify all stations and both branches, research every name, record supporting links and any uncertainty.
2. **Line 14 name audit and French/English text.** Own `data/line14.ts` and `docs/research/line14.md`. Rewrite and verify all 21 names, replacing unrelated neighbourhood copy.
3. **Illustrations and visual review.** Own `src/illustrations.ts`, new images under `public/illustrations/`, and `docs/design/multi-line-art.md`. Improve the illustration system and produce route-level artwork. Review the home-page concept for excess decoration and misleading imagery.
4. **Main thread: routes, interface, translation, integration and release.** Own app, styles, routing, line registry, server route handling and tests. Review each data contribution, inspect the finished pages in Chrome, and coordinate commits and deployment.

Each worker creates its own goal before work and completes that goal only after its slice is verified. Workers do not commit or deploy while the main thread coordinates the shared checkout.

## Release sequence and checks

1. Commit and push the plan, types and home-page concept.
2. Publish the new home and routing with each researched line enabled only when complete; incomplete routes are labelled coming soon.
3. Add completed route data and illustrations, run tests and publish the integrated release.
4. Check desktop/mobile layouts, both languages, direct links, Back/Forward, accent-insensitive search, keyboard access, reduced motion, branch navigation and unknown-route behaviour.
5. Review every station for source coverage, localization parity, broken links and unsupported claims. Scan committed files for secrets. Build from the selected commit, push, deploy with the existing script and verify the public commit.

## Completion

The three scoped workers completed their goals. Both content modules received a second review. The integrated frontend received a separate code review; the history, filtered keyboard navigation, encoded routes and missing-file findings were fixed. The root session integrated the work and ran browser and automated checks. See [verification](verification.md) for the results.

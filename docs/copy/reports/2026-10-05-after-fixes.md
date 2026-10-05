# Copy evaluation after the copy fixes, 2026-10-05

This report compares the full evaluator run after the copy fixes with [baseline 2](2026-10-05-baseline2.md). The evaluator and the question set did not change between the two runs, so the differences come from the copy.

- Before: `apps/web/scripts/copy/out/baseline2/2026-10-05T09-54-43-300Z/`
- After: `apps/web/scripts/copy/out/after/2026-10-05T10-18-18-240Z/`
- Command: `bun --env-file=.env apps/web/scripts/copy/evaluate.ts --out apps/web/scripts/copy/out/after --worst 25`
- Judge: `jev-1.13.0`, `@typesafe-ai/sdk` 0.6.0, question set `2026-10-05.6`. 1,471 requests, 0 errors, 16 s.
- Neither directory is committed (`out/` is gitignored).

What changed in the copy:

1. Seven line files (1, 4, 5, 6, 7, 9, 14): one rewrite pass and one review pass per line. The change logs are in [`../changes/`](../changes/). Section 7 gives a summary.
2. Shared stations: each shared station now has the same etymology on all its lines. Section 5 gives the details.
3. UI strings in `apps/web/src/i18n.ts`: typography and two labels. Section 5 gives the details.

Jev scores move by about ±0.03 between runs on the same text. Changes smaller than that are not significant.

## 1. Headline numbers

| | Baseline 2 | After |
|---|---|---|
| Units scored | 990 | 990 |
| Mean composite | 0.858 (EN 0.859, FR 0.857) | 0.913 (EN 0.910, FR 0.916) |
| Bands, all units (ship/edit/rewrite) | 617 / 337 / 36 | 866 / 117 / 7 |
| Bands, station notes (800) | 544 / 235 / 21 | 777 / 23 / 0 |
| Hard failures | 0 | 0 |
| Units with a deterministic FAIL | 187 (225 FAILs) | 2 (2 FAILs) |
| Units with at least one soft tell | 226 | 47 |
| Pair fact-drift flags | 3 pairs | 0 |

Band moves: 236 edit → ship, 21 rewrite → ship, 8 rewrite → edit, 8 ship → edit. All 8 ship → edit moves are on text that did not change, and each moved by less than 0.03 (2 station units at 0.845–0.849, 6 UI strings). These are evaluator noise.

## 2. By kind and field

| Kind / field | n | Mean (before → after) | Ship/edit/rewrite, before → after |
|---|---|---|---|
| Station etymology | 400 | 0.879 → 0.929 | 285/110/5 → 391/9/0 |
| Station context | 400 | 0.860 → 0.933 | 259/125/16 → 386/14/0 |
| Line summary | 14 | 0.750 → 0.950 | 1/11/2 → 13/1/0 |
| Line imageAlt | 14 | 0.902 → 0.992 | 10/3/1 → 14/0/0 |
| Line title | 14 | 0.986 → 0.986 | 14/0/0 → 14/0/0 |
| UI strings | 122 | 0.788 → 0.799 | 37/75/10 → 37/80/5 |
| Page strings | 26 | 0.814 → 0.810 | 11/13/2 → 11/13/2 |

Page strings (`apps/web/public/index.html` and the app shell) did not change.

## 3. By line and locale

Station and line units for each line.

| Line | EN mean | FR mean | Ship/edit/rewrite, before → after |
|---|---|---|---|
| 1 | 0.832 → 0.931 | 0.837 → 0.926 | 55/44/7 → 99/7/0 |
| 4 | 0.879 → 0.920 | 0.869 → 0.924 | 85/35/2 → 120/2/0 |
| 5 | 0.896 → 0.936 | 0.917 → 0.942 | 85/7/2 → 91/3/0 |
| 6 | 0.892 → 0.939 | 0.879 → 0.937 | 91/26/1 → 117/1/0 |
| 7 | 0.901 → 0.935 | 0.911 → 0.947 | 124/33/1 → 155/3/0 |
| 9 | 0.837 → 0.939 | 0.796 → 0.932 | 67/76/11 → 148/6/0 |
| 14 | 0.876 → 0.919 | 0.870 → 0.926 | 62/28/0 → 88/2/0 |

Line 9 had the largest gain (FR +0.136). Line 1 has the most units left in the edit band (7).

## 4. Tells and checks

Soft tells (number of units):

| Tell | Before | After | | Tell | Before | After |
|---|---|---|---|---|---|---|
| T1 | 3 | 2 | | T9 | 7 | 0 |
| T2 | 13 | 2 | | T12 | 8 | 0 |
| T3 | 41 | 15 | | T13 | 3 | 1 |
| T4 | 10 | 4 | | T14 | 2 | 1 |
| T5 | 3 | 2 | | T17 | 20 | 0 |
| T6 | 6 | 4 | | T19 | 21 | 2 |
| T7 | 14 | 7 | | T20 | 99 | 13 |
| T8 | 9 | 0 | | T21 | 9 | 0 |

Deterministic FAIL checks (number of findings):

| Check | Before | After |
|---|---|---|
| `fr.spaceBeforePunct` | 75 | 2 |
| `sentenceLength` (FAIL) | 54 | 0 |
| `stationDash` | 31 | 0 |
| `en.apostrophe` | 29 | 0 |
| `fr.yearRange` | 12 | 0 |
| `en.yearRange` | 11 | 0 |
| `fr.guillemets` | 8 | 0 |
| `flag.en`, `flag.fr` (FAIL) | 4 | 0 |
| `en.quotes` | 1 | 0 |

The 2 FAILs that remain are `ui/title/fr` and `page/documentTitleHome/fr`. Both are the site title « Pourquoi ce nom ? », which has a plain space before « ? ». The site title was not changed on purpose (section 7).

REVIEW checks (they do not change the score):

| Check | Before | After |
|---|---|---|
| `sentenceLength` (26–35 words) | 141 | 39 |
| `corpus.opener` | 99 | 13 |
| `parity.frCalque` | 42 | 4 |
| `tailClause` | 41 | 15 |
| `fr.calquePattern` | 21 | 2 |
| `openingPronoun` | 19 | 0 |
| `fr.genericPlaceCase` | 17 | 17 |
| `corpus.duplicateSameStation` | 16 | 12 |
| `corpus.metroForm` | 14 | 5 |
| `parity.numbers` | 10 | 14 |
| `corpus.duplicateSentence` | 9 | 0 |
| `parity.names` | 8 | 8 |
| Corpus `corpus.sentenceCount` (per line and field) | 22 | 14 |

- `fr.genericPlaceCase` (17): most are old station names, for example « Rue d’Allemagne » and « Gare d’Orléans ». The capitals are correct for proper names.
- `parity.numbers` (14 units, 7 pairs): in each pair, the FR text leaves out a number that it does not need. For example, the Line 5 oberkampf FR context uses « Ses quais » in place of "The Line 9 platforms". None is a fact difference.

## 5. Changes made after the line passes

### Shared stations

The lowest line in each group owns the etymology. 42 units on 18 stations now use the owner's text (raspail, denfert-rochereau, republique and bercy already matched). A new test in `apps/web/tests/atlas.test.ts` checks that every shared station has the same name and the same etymology (EN and FR) on all its lines.

Etymology facts that were on one line only:

| Station | Fact | What I did |
|---|---|---|
| chatelet (Line 7) | The Line 7 platforms carry the subtitle Pont au Change. | This fact is true for Line 7 only. It is now in the Line 7 context. The context also gives the 1926 names Pont Notre-Dame and Pont Notre-Dame – Pont au Change, from the Châtelet station article. |
| gare-de-lest (Lines 5, 7) | The full name is Gare de l’Est – Verdun, after Avenue de Verdun. | The subtitle is for the whole station, not for one line. It is now in the Line 5 and Line 7 contexts. |
| nation (Line 9) | In 1880 the motto Liberté, Égalité, Fraternité went on public buildings. | Removed. It is about the 1880 holiday, not about the station or the square. |
| trocadero (Line 9) | Place du Trocadéro-et-du-11-Novembre; Fort Louis and the Trocadero peninsula. | Removed. The Line 6 context gives the 1978 name of the square. |
| oberkampf (Line 9) | — | The Line 5 etymology now has the 1760 and 1783 facts, so the Line 9 context repeated them. The Line 9 context now gives the Line 9 opening date (10 December 1933), the 19 June 1783 letters patent and the 1803 ranking. I added the Oberkampf station article as a source. |
| pyramides (Line 14) | — | The new etymology names the Mamluks and the Egypt campaign. The first sentence of the Line 14 context gave the same facts, so I removed it. |

I compared all contexts of each shared station. I found no contradictions. Two differences in wording remain:

- nation: Line 6 says Nation "is described as" the only station where two lines end on loops. Line 9 says it is the only station that is the terminus of two lines, with no hedge. The two statements agree.
- gare-du-nord, stalingrad, place-ditalie and montparnasse-bienvenue give the same dates on each line.

### UI strings (`apps/web/src/i18n.ts`)

| Key | Before | After | Score before → after |
|---|---|---|---|
| `why` (fr) | Pourquoi ce nom ? | U+202F before « ? » | 0.77 → 0.81 |
| `aboutSources` (fr) | … interprétatives ; … | U+202F before « ; » | 0.81 → 0.85 |
| `signCredit` (fr) | Enseigne : … | U+00A0 before « : » | 0.79 → 0.81 |
| `branchVillejuif` (en, fr) | Villejuif–Louis Aragon | Villejuif – Louis Aragon | 0.80 → 0.77, 0.84 → 0.81 |
| `featured` (en) | Featured | Notable stations | 0.44 → 0.81 |
| `featured` (fr) | À découvrir | Stations remarquables | 0.42 → 0.78 |
| `routeLabel` (en) | Explore stations on line | Stations on line | 0.56 → 0.76 |
| `routeLabel` (fr) | Explorer les stations de la ligne | Stations de la ligne | 0.61 → 0.86 |
| `aboutSources` (en) | This is not a RATP service. | This is not an RATP service. | 0.84 → 0.83 |

- `featured` is the small upper-case label above the featured station links in the line sidebar. On narrow screens the row wraps, so the longer label fits.
- `routeLabel` is an aria-label with the line number added after it, for example "Stations on line 7".
- `branchVillejuif` is one of the unused keys in CLEANUP item 8. I fixed the dash in case the key is used again.
- `apps/web/src/coming-soon.ts` has no strings, so I did not change it.

## 6. The 25 worst units after the fixes

| # | Unit | Composite | Band | Top problems |
|---|---|---|---|---|
| 1 | `ui/brand/en` | 0.49 | rewrite | U1=0.22; U2=0.66; U3=0.67 |
| 2 | `ui/brand/fr` | 0.53 | rewrite | U1=0.27; U3=0.67 |
| 3 | `ui/branch/en` | 0.56 | rewrite | U1=0.16 (unused key) |
| 4 | `page/signCreditAuthor/en` | 0.57 | rewrite | U1=0.24 |
| 5 | `page/signCreditAuthor/fr` | 0.57 | rewrite | U1=0.26 |
| 6 | `ui/history/en` | 0.63 | rewrite | U1=0.29 |
| 7 | `ui/station/en` | 0.63 | rewrite | U1=0.20 (unused key) |
| 8 | `ui/line/en` | 0.65 | edit | U1=0.45 |
| 9 | `ui/title/fr` | 0.67 | edit | U1=0.50; fr.spaceBeforePunct |
| 10 | `station/9/exelmans/etymology/fr` | 0.67 | edit | S3=0.34; S2=0.64; T7 Considéré comme; T2 (jev) |
| 11 | `ui/map/en` | 0.68 | edit | U1=0.56; U2=0.59 |
| 12 | `ui/choose/en` | 0.68 | edit | U1=0.45 |
| 13 | `ui/choose/fr` | 0.68 | edit | U1=0.51 |
| 14 | `page/notFoundCode/fr` | 0.68 | edit | U1=0.44 |
| 15 | `page/documentTitleHome/en` | 0.68 | edit | U1=0.54 |
| 16 | `ui/map/fr` | 0.69 | edit | U1=0.56; U2=0.62 |
| 17 | `ui/branches/fr` | 0.69 | edit | U1=0.52 |
| 18 | `ui/terminus/en` | 0.70 | edit | U1=0.34 |
| 19 | `ui/noStory/fr` | 0.70 | edit | U1=0.60; U2=0.61 (unused key) |
| 20 | `ui/people/fr` | 0.70 | edit | U1=0.41 |
| 21 | `ui/search/en` | 0.71 | edit | U1=0.59 |
| 22 | `page/documentTitleHome/fr` | 0.71 | edit | fr.spaceBeforePunct |
| 23 | `ui/noStory/en` | 0.71 | edit | U2=0.40 (unused key) |
| 24 | `ui/list/en` | 0.71 | edit | U1=0.55 |
| 25 | `ui/other/en` | 0.71 | edit | U1=0.54 |

23 of the 25 are UI or page strings. U1 is not calibrated, and many low U1 scores are on short labels that are correct in their place ("History", "Line", "Terminus"). Do not change these strings only because of the score.

Station and line units still in the edit band (23 of 828):

- Line 1: louvre-rivoli etymology (en 0.81, fr 0.75), franklin-d-roosevelt context (en 0.83, fr 0.79), george-v context (en 0.82, fr 0.78), concorde etymology en (0.84). The louvre-rivoli and franklin-d-roosevelt FR texts have « , d’après la rue » (T19 and the FR calque hint). The Line 1 review put back this wording on purpose.
- Line 9: exelmans etymology (en 0.73, fr 0.67), jasmin etymology fr (0.74), oberkampf context (en 0.84, fr 0.85 at the limit), voltaire context en (0.84). The Line 9 review put back "remembered as a hero" / « Considéré comme un héros » for exelmans, because the source says « héros ». This wording causes T7.
- Line 4: mouton-duvernet context en (0.81), saint-sulpice context en (0.84).
- Line 5: saint-marcel context (en 0.85, fr 0.83), stalingrad etymology en (0.85). Line 7 has the same stalingrad etymology at 0.84.
- Line 6: line summary fr (0.82).
- Line 7: cadet etymology fr (0.83), les-gobelins context en (0.84).
- Line 14: porte-de-clichy context fr (0.82, S4=0.00), chatelet context en (0.85).

## 7. Summary of the change logs

Each file in [`../changes/`](../changes/) gives, for each changed unit, the text before and after, the reason, and a source URL when a fact changed. Each file ends with a "Review" section from a second agent.

| Line | Units changed | Fact changes (checked in a listed source) | Review fixes |
|---|---|---|---|
| 1 | 75 | porte-maillot (19 July 1900 in FR; "1936 or 1937", because the sources disagree), franklin-d-roosevelt (names the avenue and the king of Italy), concorde (largest square, reconciliation of the French), louvre-rivoli (FR colonnade entrance). Removed unnecessary attributions and sentences that only repeat the opening year. | 7 problems in 9 units, for example the circular line at gare-de-lyon (it was built, but its trains never stopped there) and "allies" in the summary (Argentina was not an ally) |
| 4 | 50 | simplon (1807 road, 1944 air raid), chateau-rouge (2014–2017 works), etienne-marcel (1354–1358), saint-placide, vavin (1910 flood terminus), raspail, mouton-duvernet ("style Mouton"), mairie-de-montrouge, bagneux-lucie-aubrac | 3 wording fixes |
| 5 | 28 | oberkampf context rewritten with station facts, ourcq (1947 opening), saint-marcel (Notre-Dame trumeau, 19th-century copy), new line summary | Put back "medieval legend" at saint-marcel; added the missing station-article sources for ourcq and oberkampf |
| 6 | 53 | kleber, dupleix, saint-jacques, glaciere, quai-de-la-gare, edgar-quinet: each corrected against the station article; FR typography in the whole file | 6 fixes, for example the dugommier Charenton name moved to the context and an incorrect bel-air sentence removed |
| 7 | 46 | chateau-landon (Sellier 1900, 1931 passage), cadet, le-kremlin-bicetre (Jean de Pontoise), line summary, imageAlt from the image | 1 fix (pont-neuf "it") |
| 9 | 109 | jasmin (mezzanine), oberkampf, charonne (2007 subtitle), croix-de-chavaux, mairie-de-montreuil (1937 mosaic), saint-philippe-du-roule | 8 fixes, for example qualifiers from the source put back (exelmans, jasmin) |
| 14 | 47 | saint-lazare (1632, 1794, 1927), pyramides (1916, 1998), chatelet (court of the provosts, 1802–1810), gare-de-lyon (PLM terminus), l-hay-les-roses (1912 council reasons); source labels now "X · Wikipédia" | 4 problems in 8 units, for example a 1794 decree "recognised" Saint-Lazare as a prison, and the PLM did not build the station |

Problems that the reviews found and did not fix:

- bel-air etymology (Line 6): the listed sources do not explain the name "Bel-Air". To add a sourced "the origin is disputed" sentence, add the "Avenue du Bel-Air" article as a source first.
- dugommier (Line 6): the Charenton name is in the context, because the FR etymology is at the 45-word limit.
- l-hay-les-roses (Line 14): the etymology gives only the rose garden as the cause. The context also gives telephone confusion with Lagny.
- hotel-de-ville (Line 1): "since 1357" is correct only if "city hall" means the institution at that site, not the present building.

## 8. Not changed, for a decision

- Site title « Pourquoi ce nom ? » (`ui/title/fr`, also `document.title` on the home page): add U+202F before « ? ». This removes the last 2 FAILs.
- Brand "MÉTRO / NOMS" / "MÉTRO / NAMES" (`ui/brand`, 0.49 and 0.53): U1 says that a reader cannot tell what the brand means. The brand is a design choice. No change is proposed, except to read the score as a note about the brand.

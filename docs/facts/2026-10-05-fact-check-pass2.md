# Station fact check, pass 2, 2026-10-05

This report covers the second pass of the station fact checker (`apps/web/scripts/facts/`): the change to the ranking, its measured effect on the pass-1 labels, the review of the next 100 pairs, and the fixes that came from it. Pass 1 is in [2026-10-05-fact-check.md](2026-10-05-fact-check.md). For how to run the checker, see [README.md](README.md).

## Summary

- The risk score now uses mostly `1 − supported`. `contradicted` and EN/FR disagreement have weight 0. On the 80 pass-1 labels, the AUC for "problem (confirmed or unsourced) against supported or refuted" went from 0.609 to 0.782.
- Pass-2 run: 1,780 claims, 878 pairs, 376 URLs. 2 pairs were left out as known conflicts (Saint-Mandé). The 80 pairs reviewed in pass 1 were removed, and the next 100 pairs were reviewed.
- Verdicts for the 100 pairs: 10 confirmed problems (2 errors, 8 imprecise), 4 imprecise verdicts refuted, 18 true but unsourced, 68 supported.
- Precision at 10: 0.20 for confirmed problems (pass 1: 0.10) and 0.80 for confirmed + unsourced (pass 1: 0.60).
- 10 copy corrections were applied in both locales. Sources were added for 17 of the 18 unsourced pairs; for the 18th (Pont Cardinet), the supporting source was already listed. 10 new source URLs, all HTTP 200 and none a Wikipedia redirect.
- `bun run test` (107 pass) and `bun run typecheck` pass. All 22 edited units are in the copy evaluator's ship band, with no FAIL and no hard failure.

## Ranking changes (`rank.ts`)

### What changed

- A pair now takes the strongest value of each signal among its claims. The unsupported part of a pair is `1 × (1 − min supported over the pair's claims)`, so low support in one locale is enough.
- New `RISK_WEIGHTS`:

| Signal | Pass 1 | Pass 2 |
|---|---|---|
| unsupported (1 − supported) | 0.3 | 1 |
| unmatched number | 0.15 each (cap 0.3) | 0.1 each (cap 0.2) |
| best_passage = none | n/a | 0.1 |
| fetch failure | n/a | 0.05 |
| Jev error | n/a | 0.1 |
| contradicted | 0.4 | 0 |
| EN/FR disagreement | 0.2 | 0 |

  `contradicted` and the disagreement are still calculated and shown in `ranked.md`.
- `rankPairs` returns `{pairs, excluded}`. `staleConflicts()` lists known-conflict entries that matched no pair.
- New `known-conflicts.ts`: two entries for 1/saint-mande. The etymology entry covers "Saint-Mandé – Tourelle on 26 April 1937". The context entry covers "The 1937 rename followed a change on Line 6". The fr station article prints 26 April 1934. The fr line article, the en station article and the fr Picpus article support 1937 (`docs/research/line1.md`, correction 17). An entry matches on line, station, field and a text fragment, not on the group number. If the sentence is rewritten, the entry stops matching and the run reports it as stale. No other research-note override ranked high in pass 1 (Saint-Ambroise ranked 249 and Picpus 313, and the sources do not contradict the copy for them).
- New `reviewed.ts`: the pass-1 labels for the 80 pairs, with the verdict and the EN/FR texts at review time. The pass-1 report has only aggregate numbers, so the per-pair labels were rebuilt from the report and the `docs/copy/changes` logs. The rebuilt labels give the pass-1 signal table exactly (6 confirmed, 3 refuted, 32 unsourced, 39 supported).
- New `evaluate.ts`: re-scores a `results.json` with the current weights and some variants, with no Jev calls. It shows where the labelled pairs land, the precision at k, and the AUC within the labelled pairs.
- `run.ts`: `ranked.md` has a section "Known conflicts, left out of the ranking" with each note, and a "Risk parts" line for each top pair. `results.json` has `excluded` and `stats.knownConflicts {excluded, stale}`.
- `apps/web/tests/facts.test.ts`: updated risk tests, and new tests for the min-supported pair part, the known-conflict exclusion, stale entries, and the Saint-Mandé entries against the current copy.

### Effect on the pass-1 labels

Pass-1 `out/full/results.json` re-scored with the new weights: 877 ranked pairs, 2 excluded as known conflicts.

Confirmed problems (pass-1 ranks 6, 12, 50, 60, 66, 80 → new ranks 1, 39, 50, 90, 99, 136):

| Pair | Pass-1 rank | New rank |
|---|---|---|
| 1/porte-maillot/etymology | 12 | 1 |
| 9/saint-augustin/etymology/2 | 50 | 39 |
| 9/robespierre/context/2 | 6 | 50 |
| 1/bastille/context/1 | 60 | 90 |
| 14/thiais-orly/context/1 | 66 | 99 |
| 1/saint-mande/etymology/1 | 80 | 136 |

Unsourced (32): 2 are now excluded as known conflicts (1/saint-mande/context/1 and 1/saint-mande/etymology/2, pass-1 ranks 1 and 2). The other 30: 7 in the top 10, 11 in the top 20, 17 in the top 40, 26 in the top 80 and 26 in the top 100. Median rank 29, worst 157. The 4 below 100: 6/edgar-quinet/context/2 (104), 4/barbes-rochechouart/etymology/2 (122), 1/gare-de-lyon/etymology/2 (128), 7/maison-blanche/context/3 (157).

Supported (39): 6 in the new top 40 (pass 1: 15), 14 in the new top 80 (pass 1: 39). Median rank 97.

Refuted (3): 7/gare-de-lest/etymology/2 9 → 3, 4/gare-de-lest/etymology/2 45 → 59, 6/denfert-rochereau/etymology/1 42 → 154.

AUC within the 80 labelled pairs (fair to both orders):

| Comparison | Pass-1 weights | New weights |
|---|---|---|
| Problem (confirmed or unsourced) vs supported or refuted | 0.609 | 0.782 |
| Confirmed vs supported or refuted | 0.464 | 0.667 |

Precision at k over all pairs, with unreviewed pairs counted as not a problem (a lower bound): at 10, 8 problems (1 confirmed, 7 unsourced) and 0 unreviewed; at 20, 12 problems and 5 unreviewed; at 40, 19 problems and 14 unreviewed; at 80, 29 problems and 35 unreviewed.

Variants were within noise of each other (problem AUC 0.765 to 0.795): unsupported only, contradicted 0.1, numbers 0.15 or 0.3, noPassage 0. The weights above were kept.

Limit: labels exist only for the pass-1 top 80. The new order pulls in unreviewed pairs, so its precision on the pass-1 data is a lower bound.

## Pass-2 run

Output: `apps/web/scripts/facts/out/pass2/` (`ranked.md`, `results.json`), run with `--top 100`.

- 1,780 claims, 878 pairs, 376 URLs (all from cache). Jev: 1,780 requests (377 live, 1,403 cached, 0 errors).
- supported 0 to 0.2: 74 claims (pass 1: 127). Unmatched numbers: 15 in 15 claims (pass 1: 51 in 49). best_passage = none: 48 (pass 1: 83). The drop comes from the sources added after pass 1.
- 6 fetch failures (the same links as in pass 1) and 8 Wikipedia redirects.
- Known conflicts excluded: 1/saint-mande/context/1 and 1/saint-mande/etymology/2. Stale entries: none.

### Selection of the 100 pairs

The 80 pairs reviewed in pass 1 were removed from the pass-2 ranking:

- Rule A: a pass-2 pair is reviewed if one of its claim texts is the same as a reviewed pass-1 text in the same line/station/field. This matches by text, so a change in group numbering does not cause a wrong match.
- Rule B: a pass-2 pair is fixed if it has text that is new since pass 1, in a field where a reviewed text is gone. There are 8 such fields: 9/robespierre/context, 1/porte-maillot/etymology, 14/hopital-bicetre/context, 14/thiais-orly/etymology, 14/thiais-orly/context, 9/saint-augustin/etymology, 1/bastille/context, 1/saint-mande/etymology. Rule B also removed two pairs that were not reviewed but whose text changed in the pass-1 fixes: 9/robespierre/context/3 (rank 449) and 9/saint-augustin/etymology/1 (rank 855).

Before the exclusion, 33 of the pass-2 top 100 were reviewed pairs. The 100 selected pairs cover overall ranks 3 to 141; their risk goes down to 0.59 and their min supported goes up to 0.49. The ranks below are the review order within the 100 (1 to 100).

Four selected pairs have the same text as a reviewed pair on another line (shared stations). Their pair keys differ, so the rules kept them: 6/montparnasse-bienvenue/etymology/2 (rank 2) and 14/gare-de-lyon/etymology/2 (rank 76) match pass-1 unsourced pairs on Lines 4 and 1; 7/ and 5/gare-de-lest/etymology/1 (ranks 10 and 11) match a pass-1 supported pair on Line 4.

## Review results (100 pairs)

| Verdict | Pairs |
|---|---|
| Confirmed error | 2 |
| Confirmed imprecise | 8 |
| Imprecise, not confirmed after refutation | 4 |
| True but unsourced | 18 |
| Supported | 68 |

Precision at k, by review rank:

| k | Confirmed problems | Precision | Confirmed + unsourced | Precision |
|---|---|---|---|---|
| 10 | 2 | 0.20 | 8 | 0.80 |
| 20 | 5 | 0.25 | 14 | 0.70 |
| 50 | 7 | 0.14 | 21 | 0.42 |
| 100 | 10 | 0.10 | 28 | 0.28 |

Pass 1 for comparison (top 80 of the old ranking): 0.10 / 0.60 at 10, 0.10 / 0.55 at 20, 0.05 / 0.60 at 40, 0.075 / 0.48 at 80. The pass-2 pairs come after the 80 most risky pairs were removed, so the two lists are not the same population. Even so, the top 20 of pass 2 has more confirmed problems (5) than the full pass-1 top 80 (6 in 80).

Confirmed problems by review rank (overall pass-2 rank in brackets): 7 (12), 9 (16), 13 (20), 14 (21), 19 (29), 23 (36), 43 (66), 51 (77), 86 (124), 88 (127). Precision falls after rank 20. The last two are sentence-structure faults (a place detail with no source, a participle that attaches to the wrong noun), where Jev gave supported 0.36. Low support does not find this kind of fault faster than reading in order.

## Confirmed fixes

All fixes change EN and FR so that they state the same facts. Ranks are review ranks.

### 1. Pasteur, context (error, rank 7), Line 6

The source's "one of three stations" sentence is about the Line 12 platforms, which mix the surviving Nord-Sud tiling with the orange Andreu-Motte style. It does not say that only three stations have the decorative styles of both companies. Many interchanges have both (Montparnasse – Bienvenüe, Concorde, Madeleine). Porte de Versailles and Porte de Clichy were not CMP/Nord-Sud junctions.

- Before: "Pasteur’s Line 6 platforms opened in 1906, built by the CMP company. The station later also served a line of the rival Nord-Sud company, now Line 12. The two companies’ decorative styles coexist here, as at only two other stations." / « À Pasteur, les quais de la ligne 6 ouvrent en 1906, construits par la CMP. La station dessert plus tard aussi une ligne de la compagnie rivale du Nord-Sud, aujourd’hui la ligne 12. Les décors des deux compagnies y coexistent, comme dans deux autres stations seulement. »
- After: "Pasteur’s Line 6 platforms opened in 1906, built by the CMP company. The Line 12 platforms, built by the rival Nord-Sud company, keep their original tiling beside the orange Andreu-Motte style added in 1976. Only two other stations, Porte de Versailles and Porte de Clichy, mix these two styles." / « À Pasteur, les quais de la ligne 6 ouvrent en 1906, construits par la CMP. Ceux de la ligne 12, construits par la compagnie rivale du Nord-Sud, gardent leur carrelage d’origine à côté du style « Andreu-Motte » orange posé en 1976. Seules deux autres stations, Porte de Versailles et Porte de Clichy, mêlent ces deux styles. »
- Evidence: https://fr.wikipedia.org/wiki/Pasteur_(m%C3%A9tro_de_Paris) (« la station de la ligne 12 est avec Porte de Versailles … et Porte de Clichy … l'une des trois stations du réseau à mêler ces deux styles décoratifs »; « ceux de la ligne 12 sont rénovés en 1976 en style « Motte » »). Existing source.
- The reviewer's 4-sentence text has 58 EN words, over the 55-word context limit in the tests, so the second and third sentences were merged (EN 49 words, FR 55, at the limit).
- The error came from `docs/research/line6.md` (Pasteur), which merged the two statements. That note is corrected too.

### 2. Iéna, etymology (imprecise, rank 9), Line 9

The battles are nineteenth-century battles (Jena 1806, Trocadero 1823, Alma 1854), not "classical" ones. Only the Alma part of Alma – Marceau is a battle; Marceau is a general.

- Before: "…The station shares this classical battle-naming pattern with nearby Trocadéro and Alma – Marceau." / « …La station partage ce principe de nom de bataille avec Trocadéro et Alma – Marceau, à proximité. »
- After: "…Nearby Trocadéro and the Alma part of Alma – Marceau also take their names from nineteenth-century battles." / « …Non loin, Trocadéro et la partie « Alma » d’Alma – Marceau rappellent aussi des batailles du XIXe siècle. »
- Evidence: https://fr.wikipedia.org/wiki/Alma_-_Marceau_(m%C3%A9tro_de_Paris) (« la bataille de l'Alma, une victoire franco-britannique contre les Russes en 1854 »; avenue Marceau « en hommage au général »), https://en.wikipedia.org/wiki/Trocad%C3%A9ro_station ("the Battle of Trocadero … in 1823"). Both added as sources. The fr Trocadéro station article names the battle but not its year.

### 3. Bonne Nouvelle, etymology (imprecise, rank 13), Line 9

FR only. The district is « quartier de Bonne-Nouvelle », without the article.

- Before: « La station doit son nom au quartier de la Bonne-Nouvelle, … »
- After: « La station doit son nom au quartier de Bonne-Nouvelle, … »
- Evidence: https://fr.wikipedia.org/wiki/Bonne_Nouvelle_(m%C3%A9tro_de_Paris) (« au nord du quartier de Bonne-Nouvelle »). Existing source. EN not changed.

### 4. Châtelet, context (imprecise, rank 14), Line 1

"Several weeks" was 18 days: Line 1 opened on 19 July 1900, the Châtelet platforms on 6 August 1900.

- Before: "For several weeks after the line’s opening day, trains passed through the unfinished station without stopping. …" / « Pendant plusieurs semaines après l’ouverture de la ligne, les trains traversent la station inachevée sans s’y arrêter. … »
- After: "For two and a half weeks after the line opened on 19 July 1900, trains passed through the unfinished station without stopping. …" / « Pendant deux semaines et demie après l’ouverture de la ligne, le 19 juillet 1900, les trains traversent la station inachevée sans s’y arrêter. … »
- Evidence: https://fr.wikipedia.org/wiki/Ch%C3%A2telet_(m%C3%A9tro_de_Paris) (« ouverte le 6 août 1900, soit plus de deux semaines après la mise en service du premier tronçon de la ligne 1 »; « les rames de métro la traversaient sans y marquer l'arrêt »). Added "Ligne 1 du métro de Paris · Wikipédia" for 19 July 1900 (« Le 19 juillet 1900 à 13 heures, la ligne est ouverte au public »).

### 5. Boissière, context (imprecise, rank 19), Line 6

No source says single-entrance stations are rare. The comparison sentence is removed. The single entrance and its listing date stay; they were already in the first sentence.

- Before: "The station keeps its original single entrance, a Guimard édicule that received historic-monument protection on 12 February 2016. It is one of the network’s few stations with only one street entrance." / « … inscrit aux monuments historiques le 12 février 2016. Elle est l’une des rares stations du réseau à n’avoir qu’un seul accès en surface. »
- After: "The station keeps its original single entrance, a Guimard édicule that received historic-monument protection on 12 February 2016." / « La station conserve son entrée unique d’origine, un édicule Guimard inscrit aux monuments historiques le 12 février 2016. »
- Evidence: https://fr.wikipedia.org/wiki/Boissi%C3%A8re_(m%C3%A9tro_de_Paris) (« La station dispose d'un unique accès intitulé « avenue Kléber » »). Existing source.

### 6. Les Halles, etymology (imprecise, rank 23), Line 4

FR « pavillons » means the Baltard pavilions of the 1850s. The name les Halles is from the 12th century. EN and FR did not match.

- Before: "…Its covered halls supplied the city and gave the neighbourhood its lasting name." / « …Ses pavillons approvisionnaient la capitale et ont laissé leur nom au quartier. »
- After: "…Its covered halls supplied the city and gave the neighbourhood its name." / « …Ses halles couvertes approvisionnaient la capitale et ont donné leur nom au quartier. »
- Evidence: https://archives.paris.fr/archives-numerisees/photographies/le-quartier-des-halles (existing), https://fr.wikipedia.org/wiki/Halles_de_Paris (first halls under Philippe Auguste; added as a source).

### 7. Porte de Clignancourt, context (imprecise, rank 43), Line 4

"Beyond the former city boundary" can be read as inside today's Paris. The flea market is in Saint-Ouen-sur-Seine, outside the current municipal limit.

- Before: "…The station’s additional name, Puces de Saint-Ouen, points to the flea market beyond the former city boundary." / « …Le complément Puces de Saint-Ouen indique le marché situé au-delà de l’ancienne limite de la capitale. »
- After: "…The station’s additional name, Puces de Saint-Ouen, points to the flea market just outside Paris, in Saint-Ouen." / « …Le complément Puces de Saint-Ouen désigne le marché aux puces situé juste au-delà de la limite de Paris, à Saint-Ouen. »
- Evidence: https://fr.wikipedia.org/wiki/March%C3%A9_aux_puces_de_Saint-Ouen (« dans un quartier de la ville de Saint-Ouen-sur-Seine en bordure de Paris »). Added as a source.

### 8. Odéon, context (error, rank 51), Line 4

The architects are correct. The façade has a portico of eight Doric columns under a flat entablature; there is no pediment. No source describes one. (The absence comes from the building's known appearance and from detailed descriptions that do not mention one; no source states it in words.)

- Before: "…Charles de Wailly and Marie-Joseph Peyre designed the neoclassical building, with its columns and pediment." / « …Charles de Wailly et Marie-Joseph Peyre ont conçu ce bâtiment néoclassique, avec ses colonnes et son fronton. »
- After: "…Charles de Wailly and Marie-Joseph Peyre designed the neoclassical building, with its portico of eight Doric columns." / « …Charles de Wailly et Marie-Joseph Peyre ont conçu ce bâtiment néoclassique, précédé d’un portique de huit colonnes doriques. »
- Evidence: https://paris-promeneurs.com/le-theatre-de-l-odeon/ (« L'entrée du bâtiment est précédée d'un portique reposant sur huit colonnes doriques »; added as a source), https://www.theatre-odeon.eu/fr/lodeon (existing).

### 9. Les Sablons, context (imprecise, rank 86), Line 1

No source says Jacques Barrot collapsed "on the platform".

- Before: "On 3 December 2014, former government minister Jacques Barrot collapsed on the platform of this station and died suddenly." / « Le 3 décembre 2014, l’ancien ministre Jacques Barrot s’effondre sur le quai de cette station et meurt subitement. »
- After: "On 3 December 2014, former government minister Jacques Barrot was taken ill in this station and died suddenly." / « Le 3 décembre 2014, l’ancien ministre Jacques Barrot est victime d’un malaise dans cette station et meurt subitement. »
- Evidence: https://fr.wikipedia.org/wiki/Les_Sablons_(m%C3%A9tro_de_Paris) (« à la suite d'un malaise survenu alors qu'il se trouvait dans la station »). Existing source.

### 10. Franklin D. Roosevelt, context (imprecise, rank 88), Line 9

"Inaugurated in 1957" attached to the technique. In FR, « inaugurée » agrees only with « technique ». Gemmail dates from the 1930s; what was inaugurated in 1957 was the station decoration.

- Before: "…In the 1950s the platforms were decorated with gemmail, a modernised stained-glass technique, inaugurated in 1957." / « …Dans les années 1950, les quais sont décorés de gemmail, technique de vitrail modernisée, inaugurée en 1957. »
- After: "…In the 1950s the platforms were decorated with gemmail, a modernised form of stained glass. The new decoration was inaugurated in March 1957." / « …Dans les années 1950, les quais sont décorés de gemmail, une forme modernisée du vitrail. Cette décoration est inaugurée en mars 1957. »
- Evidence: https://fr.wikipedia.org/wiki/Franklin_D._Roosevelt_(m%C3%A9tro_de_Paris) (« le gemmail, qui est une sorte de vitrail modernisé »; « dans la nuit du 1er au 2 mars 1957 »). Existing source. The FR context is now 55 words, at the limit. Line 1's Franklin D. Roosevelt context does not mention gemmail and is not changed.

No confirmed fix changed an etymology of a shared station (Iéna, Bonne Nouvelle and Les Halles are on one line each in this atlas).

## Sources added for true but unsourced claims (18 pairs)

Text not changed unless stated.

| Rank | Pair | Source added | Supporting text |
|---|---|---|---|
| 1 | 14/madeleine/context/1 | Église de la Madeleine · Wikipédia (https://fr.wikipedia.org/wiki/%C3%89glise_de_la_Madeleine) | First stone of the present church on 3 August 1763; « devenir une église en 1845 ». The 13th-century chapel is in the station article |
| 2 | 6/montparnasse-bienvenue/etymology/2 | Montparnasse · Wikipedia (https://en.wikipedia.org/wiki/Montparnasse) | "students recited poems at the foot of an artificial hillock of rock rubble … they decided to baptise this mound Mount Parnassus". Line 4 already cites it for the same shared etymology |
| 3 | 4/chatelet/context/1 | Grand Châtelet · Wikipédia (https://fr.wikipedia.org/wiki/Grand_Ch%C3%A2telet) | « le Grand Châtelet, au nord, pour défendre l'accès au Grand Pont (devenu le pont au Change) » |
| 4 | 7/aubervilliers-pantin-quatre-chemins/context/2 | Société des transports en commun de la région parisienne · Wikipédia (https://fr.wikipedia.org/wiki/Soci%C3%A9t%C3%A9_des_transports_en_commun_de_la_r%C3%A9gion_parisienne) | Tram lines in 1921: 72 « par Pantin (Quatre Chemins) », 74 « Pantin (Église) - Pantin (Quatre Chemins) », 107 « Aubervilliers (mairie) - Pantin - Quatre-Chemins - Porte des Lilas » |
| 5 | 14/chatelet/context/1 | Grand Châtelet · Wikipédia | As rank 3 |
| 6 | 7/villejuif-louis-aragon/context/3 | Ligne 7 du métro de Paris · Wikipédia (https://fr.wikipedia.org/wiki/Ligne_7_du_m%C3%A9tro_de_Paris) | « C'est après cette station [Maison Blanche] que se situe l'ouvrage de séparation des voies des deux branches ». Text also changed (see below) |
| 11 | 5/gare-de-lest/etymology/1 | Gare de Paris-Est · Wikipédia (https://fr.wikipedia.org/wiki/Gare_de_Paris-Est) | « l'une des six grandes gares terminus du réseau de la SNCF à Paris »; it also supports the 1854 name in the next sentence |
| 15 | 4/porte-dorleans/etymology/1 | Porte d’Orléans (porte de Paris) · Wikipédia (https://fr.wikipedia.org/wiki/Porte_d'Orl%C3%A9ans) | « l'une des 17 portes percées dans l'enceinte de Thiers »; the route from Orléans « a toujours abouti à cet endroit » |
| 18 | 6/bel-air/etymology/1 | Bel-Air station · Wikipedia (https://en.wikipedia.org/wiki/Bel-Air_station_(Paris_Metro)) | "It is named after the Bel-Air quarter." |
| 26 | 7/porte-divry/context/3 | Ligne 7 du métro de Paris · Wikipédia | « Le nouveau terminus à trois voies » (Porte d'Ivry, 1931) |
| 27 | 7/riquet/context/3 | Rue Riquet · Wikipédia (https://fr.wikipedia.org/wiki/Rue_Riquet_(Paris)) | The street starts at the quai de la Seine, on the Bassin de la Villette |
| 29 | 4/odeon/etymology/2 | Odéon (édifice) · Wikipédia (https://fr.wikipedia.org/wiki/Od%C3%A9on_(%C3%A9difice)) | « affecté aux exercices de chants, aux représentations musicales, aux concours de poésie » |
| 36 | 6/raspail/etymology/2 | François-Vincent Raspail · Wikipédia (https://fr.wikipedia.org/wiki/Fran%C3%A7ois-Vincent_Raspail) | « un journal d'opposition républicaine »; « Préoccupé de questions sociales » |
| 38 | 1/chateau-de-vincennes/etymology/1 | Château de Vincennes (monument) · Wikipédia (https://fr.wikipedia.org/wiki/Ch%C3%A2teau_de_Vincennes) | The surviving donjon and enclosure |
| 62 | 14/pont-cardinet/etymology/1 | None needed | The listed "Rue Cardinet · Wikipédia" already says « Elle passe ensuite au-dessus des voies ferroviaires conduisant à la gare Saint-Lazare ». A retrieval miss, not a missing source |
| 67 | 1/palais-royal-musee-du-louvre/etymology/1 | Palais-Royal · Wikipédia (https://fr.wikipedia.org/wiki/Palais-Royal) | The Palais-Cardinal « sert de résidence à la régente Anne d'Autriche … et devient le Palais-Royal » |
| 73 | 7/palais-royal-musee-du-louvre/etymology/1 | Palais-Royal · Wikipédia | As rank 67 |
| 80 | 7/porte-de-choisy/context/2 | Sully – Morland · Wikipédia (https://fr.wikipedia.org/wiki/Sully_-_Morland_(m%C3%A9tro_de_Paris)) | « achèvement de la traversée sous-fluviale jusqu'à Jussieu. Celui-ci permet aux trains de poursuivre jusqu'à Porte d'Ivry » |

Wording change on 7/villejuif-louis-aragon/context/3: the fork is just after Maison Blanche, so Maison Blanche is shared. FR « au nord de Maison Blanche » left it out.

- Before: "The two routes share all stations north of their fork at Maison Blanche." / « Les deux itinéraires partagent les stations au nord de Maison Blanche. »
- After: "The two routes share every station as far as Maison Blanche, where they fork." / « Les deux itinéraires partagent toutes les stations jusqu’à Maison Blanche, où ils se séparent. »

Links from the review that were not used:

- https://fr.wikipedia.org/wiki/Od%C3%A9on is a disambiguation page. "Odéon (édifice)" was used.
- https://www.transilien.com/fr/page-lignes/metro-7 returns HTTP 403 to scripts. The Ligne 7 article was used.
- http://histoiredestations.centerblog.net/rub-aubervilliers-pantin-quatre-chemins-.html now returns HTTP 200, but the page has only the blog menu, no article text. The STCRP article was used.
- https://en.wikipedia.org/wiki/Porte_d%27Ivry_station does not mention the three tracks. The Ligne 7 article was used.

All new URLs were checked with `fetch(..., {redirect: "manual"})` (HTTP 200, no redirect) and with the MediaWiki API (no title redirect). `bun apps/web/scripts/facts/sources.ts` now reports 386 URLs (pass 2: 376) with the same 6 not-ok links and the same 8 redirects as before.

## Not changed

The 4 refuted imprecise verdicts:

- 14/villejuif-gustave-roussy/etymology/1: the station name is the town plus the institute's current official name (Gustave Roussy, since 2013), and the next sentence names Roussy as the founder.
- 14/cour-saint-emilion/context/2: the cour was an internal road of the Bercy warehouses, and the warehouse roads had many wine names. "Courts" is narrower than the evidence (most were "rues"), and the two cited sources do not show the plural claim. A wording change and a source would help, but the claim is not wrong.
- 4/porte-dorleans/etymology/2: the EN names the Orléans road in sentence 1 and the FR in sentence 2, so the mismatch is in the sentence pairing. "Preserves the direction of travel" is a mannered phrase (rubric R4), a style point.
- 7/le-kremlin-bicetre/etymology/3: the commune article supports "treated at the local hospital", and "associated with veterans" is a deliberate hedge over a recorded source conflict (`docs/research/line7.md`).

## Copy evaluation after the fixes

`bun apps/web/scripts/copy/evaluate.ts --kind station --line X` for lines 1, 4, 6, 7 and 9, where copy text changed (Lines 5 and 14 have only new sources). All edited units are in the ship band (≥ 0.85), with no FAIL check and no hard failure:

| Unit | EN | FR |
|---|---|---|
| 1/chatelet/context | 0.97 | 0.98 |
| 1/les-sablons/context | 0.89 | 0.89 |
| 4/les-halles/etymology | 0.90 | 0.94 |
| 4/porte-de-clignancourt/context | 0.92 | 0.89 |
| 4/odeon/context | 0.96 | 0.97 |
| 6/pasteur/context | 0.94 | 0.95 |
| 6/boissiere/context | 0.97 | 0.98 |
| 7/villejuif-louis-aragon/context | 0.98 | 0.98 |
| 9/iena/etymology | 0.94 | 0.97 |
| 9/bonne-nouvelle/etymology | 0.91 | 0.90 |
| 9/franklin-d-roosevelt/context | 0.95 | 0.95 |

One REVIEW finding: 6/pasteur/context FR, `fr.genericPlaceCase`, for the station names Porte de Versailles and Porte de Clichy. These are station names, so the capitals are correct. Outputs: `apps/web/scripts/copy/out/2026-10-05T11-26-30-770Z` (Line 1), `…-771Z` (Line 4), `…-773Z` (Line 6), `…-772Z` (Line 7), `2026-10-05T12-00-09-000Z` (Line 9).

## Files changed

- `apps/web/scripts/facts/rank.ts`, `run.ts`; new `known-conflicts.ts`, `reviewed.ts`, `evaluate.ts`
- `apps/web/tests/facts.test.ts`
- `apps/web/src/data/line1.ts`, `line4.ts`, `line5.ts`, `line6.ts`, `line7.ts`, `line9.ts`, `line14.ts`
- `docs/copy/changes/line1.md`, `line4.md`, `line5.md`, `line6.md`, `line7.md`, `line9.md`, `line14.md` ("Fact check pass 2" sections)
- `docs/research/line6.md` (Pasteur: the "one of three stations" statement)
- `docs/facts/README.md` (file table, weights, link to this report), this report

## Open issues

1. The checker was not run again after these fixes, so the fixed pairs have not been re-scored. A dry run (`--dry-run`, cached Jev answers only) does not score changed text. A normal run sends new Jev requests only for claims whose text or passages changed (the edited sentences, and claims at stations that got a new source).
2. Add the 100 pass-2 labels to `reviewed.ts`, so that the next weight change can be measured on 180 labels instead of 80. The pass-2 data gives a second test: confirmed problems at review ranks 86 and 88 had supported 0.36.
3. Pairs below the pass-2 selection (overall rank 141) were not reviewed. Precision of confirmed + unsourced fell to 0.28 at 100, and 68 of the 100 pairs were supported, so a third pass on the same ranking will cost more review per finding.
4. Low `supported` does not find wording faults (a qualifier such as "classical", "few" or "several weeks", a detail such as "on the platform", or a participle that attaches to the wrong noun). These made up 8 of the 10 confirmed problems. A separate Jev question for "more specific or stronger than the passage" could be tested on the 18 confirmed problems from both passes.
5. 14/pont-cardinet/etymology/1 was a retrieval miss: the supporting sentence is in a cited source. Check why BM25 did not rank that passage first.
6. Optional changes from the refuted verdicts: 4/porte-dorleans/etymology/2 "preserves the direction of travel" (R4); 14/cour-saint-emilion/context/2 "courts" and a source for the plural claim.
7. Shared sources are still uneven across lines: 7/gare-de-lest and 4/gare-de-lest do not cite Gare de Paris-Est (Line 5 now does); 4/raspail links the Raspail biography only through `people`. The reviewer's note about 14/gare-de-lyon/etymology/2 (same text as the pass-1 unsourced 1/gare-de-lyon pair) did not apply: the pass-2 verdict for it was supported.
8. Unchanged from pass 1: the 6 not-ok links (2 RATP pages with HTTP 403, valdemarne.fr timeout, 3 pages that need JavaScript or are PDFs) and the 8 cited Wikipedia titles that redirect.

# Line 11 fact check, 2026-10-06

A full review of the Line 11 station copy before release. It uses the method of pass 3 ([2026-10-05-fact-check-pass3.md](2026-10-05-fact-check-pass3.md)) on one line. The fixes are applied in commit `133f5ff`. The copy changes and the evaluator scores are in [docs/copy/changes/line11.md](../copy/changes/line11.md).

## Summary

- 84 EN/FR claim pairs in 19 station entries (173 claims). Every pair has a verdict.
- Verdicts: 78 supported, 6 confirmed errors, 0 unsourced, 0 refuted.
- Confirmed errors by category: 4 misleading, 1 EN/FR mismatch, 1 wrong date.
- Links: the 50 URLs in the Line 11 sources had no failures and no redirects. A live check of 52 URLs gave HTTP 200 for all.
- The `facts-3` ranking put 3 of the 6 errors in its top 10 and none in ranks 11 to 20. The other 3 were at ranks 38, 46 and 56.

## Method

1. Ranking. The fact checker ran on Line 11 with Jev `jev-1.13.0`, questions `facts-2` and ranker `facts-3` (2026-10-06T00:45:20Z): 346 live Jev requests, 0 errors, 0 fetch failures. 184 numbers were checked in code; 2 claims had a number that did not match a source.
2. Review. Every pair was reviewed, not only the top of the ranking. The verifiers saw the pair, the full unit text in EN and FR and the station's sources. Each verifier read the cited sources and other reliable sources, and gave a verdict with a quote.
3. Refutation. Each flag (a possible error, or a claim not in the cited sources) went to a second agent that tried to show that the text was correct. A flag is `confirmed` only when the refutation failed.
4. Fixes. Each confirmed error has a fix in both locales. Two fixes changed during review: the two conflicting fixes for Hôtel de Ville were merged into one per locale, and the Goncourt fix was split so that 1903 attaches to the Académie and not to the prize.

The verdicts are in the review output (`fact-verdicts.json`), not in the repository. They are not in the lab label sets.

## Confirmed errors (6)

"Rank" is the position by `facts-3` risk among the 84 pairs. "Fix" is the text at `133f5ff`.

| # | Pair | Category | Rank | Text at review (EN) | Problem | Fix | Evidence |
|---|---|---|---|---|---|---|---|
| 1 | `11/coteaux-beauclair/etymology/1` | misleading | 1 | Named after the Coteaux Beauclair development zone in Rosny-sous-Bois, beside the station. | No source says the station was named after the development zone (ZAC). The ZAC dates from December 2015 and may take its name from the station. | EN: It shares its name with the Coteaux Beauclair development zone in Rosny-sous-Bois, beside the station.<br>FR: La station porte le même nom que la zone d’aménagement concerté des Coteaux Beauclair, à Rosny-sous-Bois, qu’elle jouxte. | https://www.paredev.fr/projets/coteaux-beauclair : Paredev: 'le projet d'aménagement de la ZAC Coteaux Beauclair ... au pied de la future station « Coteaux Beauclair »' — no source says the station was named after the ZAC; the ZAC (Dec 2015) may instead take the station's name |
| 2 | `11/pyrenees/context/1` | misleading | 8 | Trains reach the station after a 700 m climb at a 4% gradient under Rue de Belleville. | 700 m is the distance between Belleville and Pyrénées, not the length of the 4% ramp. | EN: Between Belleville and this station, 700 m apart, the line climbs at a 4% gradient under Rue de Belleville.<br>FR: Entre Belleville et la station, distantes de 700 m, la ligne monte une rampe de 4 % sous la rue de Belleville. | https://fr.wikipedia.org/wiki/Ligne_11_du_m%C3%A9tro_de_Paris : elle aborde une nouvelle rampe de 40 ‰ sous la rue de Belleville ... La ligne dessert alors, après une interstation de sept cents mètres, la station Pyrénées (700 m is the Belleville–Pyrénées interstation, not the length of the 4% ramp) |
| 3 | `11/montreuil-hopital/context/2` | en-fr-mismatch | 9 | It was built by cut and cover, in two parts. (FR: Elle est construite à ciel ouvert, en deux parties.) | FR « à ciel ouvert » means open cut. EN “cut and cover” and the source say « tranchée couverte ». | EN: (no change)<br>FR: Elle est construite en tranchée couverte, en deux parties. | https://fr.wikipedia.org/wiki/Montreuil_-_H%C3%B4pital_(m%C3%A9tro_de_Paris) : Cette station est réalisée en tranchée couverte, en deux parties (nord / sud). (EN says cut and cover = tranchée couverte; FR says à ciel ouvert = open cut, the method La Dhuys copy contrasts with) |
| 4 | `11/goncourt/etymology/2` | misleading | 38 | The two writers and historians founded the Académie Goncourt, which awards the Prix Goncourt. | The brothers planned the Académie. It was founded in 1903 under Edmond’s will, 27 years after Jules died. | EN: The two writers and historians planned the Académie Goncourt, founded in 1903 under Edmond’s will. It awards the Prix Goncourt.<br>FR: Écrivains et historiens, ils conçoivent l’Académie Goncourt, fondée en 1903 selon le testament d’Edmond. Elle décerne le prix Goncourt. | https://fr.wikipedia.org/wiki/Acad%C3%A9mie_Goncourt : L'académie Goncourt est un cénacle littéraire, officiellement fondé en 1903, suivant le désir formulé par Edmond de Goncourt ... dans son testament ... désir auquel il associait son frère précédemment disparu, Jules (1830-1870), les deux frères ayant décidé dès 1862 de laisser après eux ... une académie |
| 5 | `11/rosny-bois-perrier/context/2` | wrong-date | 46 | Line 15 is planned to serve it around 2030, linked to Line 11 by a 35 m tunnel under the RER tracks. | The cited article gives 2030. The project owner gives 2031 for Line 15 Est. | EN: Line 15 is planned to serve it from 2031, linked to Line 11 by a 35 m tunnel under the RER tracks.<br>FR: La ligne 15 doit la desservir à partir de 2031, reliée à la ligne 11 par un tunnel de 35 m sous les voies du RER. | https://www.grandparisexpress.fr/ligne-15-est : Société des grands projets: Line 15 Est 'sera mise en service en 2031' (cited Wikipedia says 'En 2030'); tunnel: 'un tunnel de 35 mètres de long sous les voies du RER E' |
| 6 | `11/serge-gainsbourg/etymology/2` | misleading | 56 | The mayor of Les Lilas obtained the agreement of Jane Birkin, Gainsbourg’s former partner and heir, for this name. | The source calls Jane Birkin the rights holder (« l’ayant droit »), not the heir. She was never married to him; his heirs are his children. | EN: The mayor of Les Lilas obtained the agreement of Jane Birkin, Gainsbourg’s former partner, for this name.<br>FR: Le maire des Lilas a obtenu pour ce nom l’accord de Jane Birkin, ancienne compagne de Gainsbourg. | https://fr.wikipedia.org/wiki/Serge_Gainsbourg_(m%C3%A9tro_de_Paris) : Le maire de la ville Daniel Guiraud a eu l'accord de Jane Birkin, l'ayant droit et ancienne compagne de Serge Gainsbourg (source says rights holder, not heir; Birkin was never married to him and his heirs are his children) |

The same commit also changed the Hôtel de Ville context: “18 March 2019” now attaches to the start of the temporary terminus, which is what the date marks. This came from the review, but it was not a confirmed error.

## Sources added

- `goncourt`: “Académie Goncourt · Wikipédia”, https://fr.wikipedia.org/wiki/Acad%C3%A9mie_Goncourt, for the 1903 foundation under Edmond’s will.
- `rosny-bois-perrier`: “Ligne 15 Est · Grand Paris Express”, https://www.grandparisexpress.fr/ligne-15-est, for the 2031 opening and the 35 m tunnel under the RER E tracks.

## Ranking compared with the verdicts

| Error | Rank | In the top 10 |
|---|---|---|
| Coteaux Beauclair, "named after" the ZAC | 1 | yes |
| Pyrénées, 700 m ramp | 8 | yes |
| Montreuil – Hôpital, FR « à ciel ouvert » | 9 | yes |
| Goncourt, "founded" | 38 | no |
| Rosny – Bois-Perrier, 2030 | 46 | no |
| Serge Gainsbourg, "heir" | 56 | no |

- The top 10 has 3 of the 6 errors. The top 20 also has 3.
- Ranks 2 to 7 are all supported. Their risk was high because the claim was a paraphrase, or because the fact was in a second source.
- The 3 misses are 2 overstated words ("founded", "heir") and 1 error that the cited source repeats (2030). A support question does not find these: the source supports the claim in general, or it has the same wrong year. Pass 3 had the same result.

## Open items

- Hôtel de Ville gives the day “18 March 2019”, and Mairie des Lilas now gives “24 July 1867”. The audit conflict table says not to give days. Decide, and change them to the year if necessary.
- Châtelet says the platform “has been the western terminus since 1935”. This ignores the closure from March 2019 (the old text had the same gap).
- `station/11/coteaux-beauclair/etymology/en` is now in the copy edit band (0.72) because the fix opens with “It”. The fact is correct; the wording needs a copy edit.
- Not changed, can be checked later: Télégraphe as the highest point (96 m), Place des Fêtes with the longest escalators, Rosny – Bois-Perrier as the easternmost station, Coteaux Beauclair as the first viaduct station since 1905, and the Serge Gainsbourg ticket puncher at Les Lilas.
- Outside Line 11: Lines 5 and 9 share the République context; Lines 4 and 14 share the Châtelet context; the Line 7 Châtelet art text says "modern"; the Line 14 Châtelet source label is different.

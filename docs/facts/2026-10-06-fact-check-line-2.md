# Line 2 fact check, 2026-10-06

A full review of the Line 2 station copy before release. It uses the method of pass 3 ([2026-10-05-fact-check-pass3.md](2026-10-05-fact-check-pass3.md)) on one line, as for Line 11 and Line 3 ([2026-10-06-fact-check-line-3.md](2026-10-06-fact-check-line-3.md)). The fixes are applied in commit `eee4710`. The copy changes and the evaluator scores are in [docs/copy/changes/line2.md](../copy/changes/line2.md).

## Summary

- 123 EN/FR claim pairs in 25 station entries (248 claims). Every pair has a verdict.
- Verdicts: 118 supported, 5 confirmed errors, 0 unsourced, 0 refuted.
- Confirmed errors by category: 2 overstated wording, 2 misleading, 1 wrong fact. All 5 are fixed in both locales.
- 2 of the 5 errors (both at Couronnes) are not in any cited source. The other 3 change or simplify a fact that the cited source gives.
- Links: the 71 URLs in the Line 2 sources had no failures. 1 Wikipedia title redirects (`Paris_M%C3%A9tro_train_fire` → `Paris_Metro_train_fire`). It is renamed at its three places.
- The `facts-3` ranking put 1 of the 5 errors in its top 10 (rank 2). The other errors were at ranks 16, 38, 71 and 87.

## Method

1. Ranking. The fact checker ran on Line 2 with Jev `jev-1.13.0`, questions `facts-2` and ranker `facts-3` (2026-10-06T01:44:29Z): 496 requests (448 live, 27 cached, 21 errors), 0 fetch failures. 237 numbers were checked in code; 4 claims had a number that did not match a source. 21 of the 248 whole-source requests failed. Those 21 claims were scored on the retrieved passages only.
2. Review. Every pair was reviewed, not only the top of the ranking. The verifiers saw the pair, the full unit text in EN and FR and the station's sources. Each verifier read the cited sources and other reliable sources, and gave a verdict with a quote.
3. Refutation. Each flag and each proposed fix went to a second agent that tried to show that the text was correct, or that the fix was wrong. A flag is `confirmed` only when the refutation failed. A fix is applied only when its refutation failed.
4. Fixes. Each confirmed error has a fix in both locales. One fix changed during review: at Couronnes, "many of the 84 victims" became "most of the 84 victims", because the source says « la plupart ». One proposed fix was refuted and dropped (see [Refuted fix](#refuted-fix)).

The verdicts are in the review output (`fact-verdicts.json`), not in the repository. They are not in the lab label sets.

## Confirmed errors (5)

"Rank" is the position by `facts-3` risk among the 123 pairs. "Fix" is the text at `eee4710`.

| # | Pair | Category | Rank | Text at review (EN) | Problem | Fix | Evidence |
|---|---|---|---|---|---|---|---|
| 1 | `2/couronnes/context/3` | overstated-wording | 2 | The disaster led to all-metal trains and at least two exits per station. | Not in the cited sources. The company was asked for more exits and refused for cost reasons. The fire did lead to a separate lighting circuit. | EN: The disaster led to all-metal trains and a separate lighting circuit.<br>FR: La catastrophe impose des trains entièrement métalliques et un circuit d’éclairage séparé. | https://fr.wikipedia.org/wiki/Incendie_du_10_ao%C3%BBt_1903_dans_le_m%C3%A9tro_de_Paris : Il a notamment été demandé à la CMP d'aménager des accès supplémentaires … Pour des raisons financières, la compagnie restera sourde à cette demande |
| 2 | `2/couronnes/context/2` | misleading | 16 | The lights failed, and 75 people died against the blind end of the platform, out of 84 dead in all. | Not in the cited sources. The sources give 75 or 77 dead at Couronnes, and say that most victims, not all, crowded at the end of the platform. The fix gives no number for Couronnes. | EN: The lights failed, and most of the 84 victims died here, against the blind end of the platform.<br>FR: L’éclairage s’éteint et la plupart des 84 victimes meurent ici, contre le fond sans issue du quai. | https://fr.wikipedia.org/wiki/Incendie_du_10_ao%C3%BBt_1903_dans_le_m%C3%A9tro_de_Paris : La plupart d'entre elles s'agglutineront au bout du quai (EN article: 84 killed, 75 at Couronnes; FR article and Ménilmontant station article: 77 at Couronnes) |
| 3 | `2/porte-dauphine/context/2` | misleading | 38 | It was restored in 1999 and listed as a historic monument in 2016. | The entrance was listed in 1965. The 2016 order renewed the listing. | EN: It was listed as a historic monument in 1965 and restored in 1999.<br>FR: Inscrit monument historique en 1965, il est restauré en 1999. | https://fr.wikipedia.org/wiki/Entr%C3%A9e_de_m%C3%A9tro_Guimard : Un arrêté pris le 27 juillet 1965 … inscrit … les accès aux stations Porte Dauphine, Ternes, Pigalle … inscription renouvelée le 12 février 2016 |
| 4 | `2/blanche/context/3` | wrong-fact | 71 | A dead-end siding lies just before the station on the Porte Dauphine side. | The siding is on the other side, between Blanche and Pigalle. | EN: A dead-end siding lies between Blanche and Pigalle.<br>FR: Une voie en impasse se trouve entre Blanche et Pigalle. | https://fr.wikipedia.org/wiki/Ligne_2_du_m%C3%A9tro_de_Paris : dessert les stations Place de Clichy et Blanche, dépasse une voie d'évitement en impasse du côté nord, puis … arrive à la station Pigalle |
| 5 | `2/rome/etymology/2` | overstated-wording | 87 | The station is in the Europe quarter, where the streets carry the names of European cities. | The source says many streets, not all. | EN: … where many streets carry the names of European cities.<br>FR: … dont de nombreuses rues portent des noms de villes européennes. | https://fr.wikipedia.org/wiki/Rome_(m%C3%A9tro_de_Paris) : quartier de l'Europe, ainsi nommé du fait de la présence de nombreuses rues portant le nom de grandes villes européennes |

### Refuted fix

The review proposed to change the line summary from "station names recall gates" to "stations stand on the sites of gates". The refutation showed that the premise was wrong: the Place de Clichy station article says that the name of Place de Clichy recalls the Barrière de Clichy. The summary is kept.

The same commit also made changes that were not fact errors: copy edits for the edit band (charles-de-gaulle-etoile, ternes, place-de-clichy, la-chapelle, avron), FR parity at La Chapelle, a viaduct fact in place of the transfer-voucher sentence at Stalingrad, new wording for the opening of Nation, and a longer line image alt text. They are listed in [docs/copy/changes/line2.md](../copy/changes/line2.md).

## Sources added

- `porte-dauphine`: “Entrée de métro Guimard · Wikipédia”, https://fr.wikipedia.org/wiki/Entr%C3%A9e_de_m%C3%A9tro_Guimard, for the 1965 listing.
- `couronnes`: “Incendie du 10 août 1903 dans le métro de Paris · Wikipédia”, https://fr.wikipedia.org/wiki/Incendie_du_10_ao%C3%BBt_1903_dans_le_m%C3%A9tro_de_Paris, for the lighting circuit, the refused exits and where the victims died.
- Renamed: “Paris Métro train fire · Wikipedia” is now “Paris Metro train fire · Wikipedia”, https://en.wikipedia.org/wiki/Paris_Metro_train_fire, at `barbes-rochechouart`, at `couronnes` and in the line-level sources.

## Ranking compared with the verdicts

| Problem | Rank | Supported | In the top 10 |
|---|---|---|---|
| Couronnes, "at least two exits per station" | 2 | 0.19 | yes |
| Couronnes, "75 people died" | 16 | 0.70 | no |
| Porte Dauphine, "listed in 2016" | 38 | 0.79 | no |
| Blanche, siding "on the Porte Dauphine side" | 71 | 0.87 | no |
| Rome, "the streets" | 87 | 0.90 | no |

- 5 problems in 123 pairs (base rate 4.1%). The top 10 has 1 of the 5 (precision 0.10). The top 20 has 2 and the top 40 has 3.
- Recall of the 5 confirmed errors: 0.20 in the top 10, 0.40 in the top 20, 0.60 in the top 40.
- The ranking found the claim that is not in any source (Couronnes exits, rank 2).
- It gave high `supported` scores to errors that change or simplify a fact the source gives (Porte Dauphine date, Blanche side, Rome "the streets"). Pass 3, Line 11 and Line 3 had the same blind spot.
- Rank 1 (Belleville, "the regional transport authority still lists the stop as Belleville", supported 0.06) is a false alarm. The fetched text of the cited IDFM dataset page has no stop names, so Jev saw no support. The dataset API returns `stop_name: 'Belleville'`, so the claim is correct. The other 8 pairs in the top 10 are supported.

## Open items

- `station/2/nation/context/en` is now in the copy edit band (0.81): S5 fell from 0.94 to 0.45 after the parity change to the first sentence. The fact is correct; the wording needs a copy edit. FR (0.90) ships.
- Source conflicts left as the source audit decided:
  - The first name of Alexandre Dumas station: "Rue de Bagnolet" or "Bagnolet". The Alexandre Dumas and Avron notes still use "Rue de Bagnolet"; the Nation note no longer names it. Check a primary source (RATP or a period map), as for Line 3.
  - When Anvers stopped being the terminus: the text keeps 31 January 1903. The date in the station article is wrong.
  - The number of dead at Couronnes: 75 or 77. The text gives no number.
- The 21 claims with a failed whole-source request were scored on passages only. The full review covered them, but the ranking for them is weaker.
- The IDFM dataset page that Belleville cites has no stop names in its fetched text. A link to the API query, or a source with the stop name in the page text, would stop the false alarm.
- `station/2/villiers/etymology/fr` (0.847) is shared with Line 3 and was not changed.
- The review reported a Diderot people link on Charles de Gaulle – Étoile in `line1.ts`. This report was wrong: the link is on Reuilly – Diderot, where it belongs.

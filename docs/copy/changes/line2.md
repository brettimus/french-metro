# Line 2 copy changes

File: `apps/web/src/data/line2.ts`. Evaluator: jev-1.13.0, question set 2026-10-05.7.

Before text: commit `e1f9975` (first commit of `line2.ts`). After text: commit `eee4710` (review fixes). Each before and after text below was checked against the file at that commit.

Before runs: 2026-10-06T01:40:03Z (stations and line copy). After runs: 2026-10-06T02:04:30Z (stations) and 2026-10-06T02:04:31Z (line copy). The run output is in the review scratchpad, not in the repository. All runs had 0 request errors.

Shared stations: no shared etymology changed. The two etymologies that changed (ternes, rome) are on Line 2 only. `station/2/villiers/etymology/fr` (0.847, edit) is shared with Line 3 and was not changed. Its findings are T7 (“One explanation”) and fr.genericPlaceCase on « Avenue de Villiers », which is a proper name, so that flag is a false positive.

## Summary

| | Before | After |
|---|---|---|
| Station units | 100 | 100 |
| Ship / edit / rewrite | 91 / 9 / 0 | 98 / 2 / 0 |
| Hard failures | 0 | 0 |
| Mean composite | 0.918 | 0.925 |
| Line units (ship / edit / rewrite) | 6 / 0 / 0 | 6 / 0 / 0 |
| Line mean composite | 0.978 | 0.980 |

24 units changed in 12 pairs: 22 station units in 11 pairs (all in both locales) and the line image alt text in both locales.

- Copy edits (9 units): charles-de-gaulle-etoile context, ternes etymology, place-de-clichy context, la-chapelle context (EN), avron context. The 8 edit-band units in these pairs now ship. The main causes before were S7 (generic facts such as opening dates), T20 (the corpus opener “The station opened” / « Les quais de la ligne 2 ouvrent ») and, on ternes FR, T7.
- Fact fixes (8 units): porte-dauphine context, rome etymology, blanche context, couronnes context. The fact check is in [docs/facts/2026-10-06-fact-check-line-2.md](../../facts/2026-10-06-fact-check-line-2.md).
- Parity, readability and alt text (7 units): la-chapelle context (FR), stalingrad context, nation context, line image alt text.

Below 0.85 after the change:

- `station/2/nation/context/en` (0.81, edit). The text changed only in the first sentence (“opened on 2 April 1903, with the last section of the line”). S5 went from 0.94 to 0.45 (“one sentence stacks clauses”). The T3 tell on “, arriving under Avenue de Taillebourg and leaving under Avenue du Trône” and the T20 opener were there before the change. The fact is correct; the wording needs a copy edit, for example “The Line 2 platforms opened with the last section of the line on 2 April 1903.” and “Trains arrive under Avenue de Taillebourg, turn on a loop under the square and leave under Avenue du Trône.” FR (0.90) ships.
- `station/2/villiers/etymology/fr` (0.847, edit). Not changed (shared with Line 3, see above).

No unit has a hard failure.

Eight changed units scored lower after a fact or parity fix. Nation EN is described above. The other seven still ship: porte-dauphine/context/en (0.961 → 0.956), rome/etymology en (0.979 → 0.965) and fr (0.981 → 0.968), blanche/context/fr (0.901 → 0.895), couronnes/context en (0.945 → 0.944) and fr (0.932 → 0.928), nation/context/fr (0.904 → 0.899). No unit with unchanged text moved by more than 0.03.

## station/2/porte-dauphine/context/en

Score: 0.96 → 0.96

- Before: Entrance 3 keeps a closed Guimard pavilion with its glass canopy, the last of these pavilions that the RATP did not destroy. It was restored in 1999 and listed as a historic monument in 2016. Trains turn on a loop of 30 metres radius, the tightest on the network.
- After: Entrance 3 keeps a closed Guimard pavilion with its glass canopy, the last of these pavilions that the RATP did not destroy. It was listed as a historic monument in 1965 and restored in 1999. Trains turn on a loop of 30 metres radius, the tightest on the network.
- Reason: Fact (rank 38, misleading). The pavilion was listed in 1965, not 2016; the 2016 order only renewed the listing. The restoration (1999) now comes after the listing. Evidence: https://fr.wikipedia.org/wiki/Entr%C3%A9e_de_m%C3%A9tro_Guimard (« Un arrêté pris le 27 juillet 1965 … inscrit … les accès aux stations Porte Dauphine, Ternes, Pigalle … inscription renouvelée le 12 février 2016 »). Source added.

## station/2/porte-dauphine/context/fr

Score: 0.96 → 0.96

- Before: L’accès 3 conserve un édicule Guimard fermé, avec sa verrière, le dernier de ces pavillons que la RATP n’a pas détruit. Restauré en 1999, il est inscrit monument historique en 2016. Les trains font demi-tour sur une boucle de 30 mètres de rayon, la plus serrée du réseau.
- After: L’accès 3 conserve un édicule Guimard fermé, avec sa verrière, le dernier de ces pavillons que la RATP n’a pas détruit. Inscrit monument historique en 1965, il est restauré en 1999. Les trains font demi-tour sur une boucle de 30 mètres de rayon, la plus serrée du réseau.
- Reason: Fact (rank 38, misleading). The pavilion was listed in 1965, not 2016; the 2016 order only renewed the listing. The restoration (1999) now comes after the listing. Evidence: https://fr.wikipedia.org/wiki/Entr%C3%A9e_de_m%C3%A9tro_Guimard (« Un arrêté pris le 27 juillet 1965 … inscrit … les accès aux stations Porte Dauphine, Ternes, Pigalle … inscription renouvelée le 12 février 2016 »). Source added.

## station/2/charles-de-gaulle-etoile/context/en

Score: 0.82 → 0.90

- Before: The Line 2 platforms opened on 13 December 1900 and were the line’s eastern terminus until the extension to Anvers on 7 October 1902. They lie on the lowest level, under the start of Avenue de Wagram, and keep orange 1970s tiling in the Mouton-Duvernet style.
- After: On the lowest level, under Avenue de Wagram, the Line 2 platforms lie almost at right angles to Lines 1 and 6. They opened on 13 December 1900 and were the eastern terminus until the extension to Anvers on 7 October 1902. Unlike Line 1, they keep orange 1970s Mouton-Duvernet tiling.
- Reason: Copy. The note opened with the T20 corpus opener “The Line 2 platforms opened” / « Les quais de la ligne 2 ouvrent », and S7 was low (generic facts). The platform position now comes first, with a station-specific fact: the Line 2 platforms lie almost at right angles to Lines 1 and 6. The last sentence now compares the tiling with Line 1 (“Unlike Line 1” / « Contrairement à la ligne 1 »). “the line’s” is removed from “eastern terminus”.

## station/2/charles-de-gaulle-etoile/context/fr

Score: 0.78 → 0.89

- Before: Les quais de la ligne 2 ouvrent le 13 décembre 1900 et servent de terminus est jusqu’au prolongement vers Anvers, le 7 octobre 1902. Situés au niveau le plus bas, sous le début de l’avenue de Wagram, ils gardent un carrelage orange des années 1970, de style Mouton-Duvernet.
- After: Au niveau inférieur, sous l’avenue de Wagram, les quais de la ligne 2 sont presque perpendiculaires aux lignes 1 et 6. Ils ouvrent le 13 décembre 1900 et servent de terminus est jusqu’au prolongement vers Anvers, le 7 octobre 1902. Contrairement à la ligne 1, ils gardent leur carrelage orange Mouton-Duvernet des années 1970.
- Reason: Copy. The note opened with the T20 corpus opener “The Line 2 platforms opened” / « Les quais de la ligne 2 ouvrent », and S7 was low (generic facts). The platform position now comes first, with a station-specific fact: the Line 2 platforms lie almost at right angles to Lines 1 and 6. The last sentence now compares the tiling with Line 1 (“Unlike Line 1” / « Contrairement à la ligne 1 »). “the line’s” is removed from “eastern terminus”.

## station/2/ternes/etymology/en

Score: 0.89 → 0.93

- Before: Named for Place des Ternes and Avenue des Ternes, after the former hamlet of Les Ternes. The name is usually explained as coming from the Latin villa externa, “outlying farm”, which became Estern and then Ternes.
- After: Named for Place des Ternes and Avenue des Ternes, after the former hamlet of Les Ternes. The name probably comes from the Latin villa externa, “outlying farm”, which became Estern and then Ternes.
- Reason: Copy. Removed the vague attribution “is usually explained as” / « L’explication la plus admise » (T7). The hedge is now “probably” / « probablement ». No fact change.

## station/2/ternes/etymology/fr

Score: 0.85 → 0.91

- Before: La station doit son nom à la place et à l’avenue des Ternes, qui rappellent l’ancien hameau des Ternes. L’explication la plus admise fait venir ce nom du latin villa externa, « ferme extérieure », devenu Estern puis Ternes.
- After: La station doit son nom à la place et à l’avenue des Ternes, qui rappellent l’ancien hameau des Ternes. Ce nom vient probablement du latin villa externa, « ferme extérieure », devenu Estern puis Ternes.
- Reason: Copy. Removed the vague attribution “is usually explained as” / « L’explication la plus admise » (T7). The hedge is now “probably” / « probablement ». No fact change.

## station/2/rome/etymology/en

Score: 0.98 → 0.97

- Before: Named for Rue de Rome, after the Italian capital. The station is in the Europe quarter, where the streets carry the names of European cities.
- After: Named for Rue de Rome, after the Italian capital. The station is in the Europe quarter, where many streets carry the names of European cities.
- Reason: Fact (rank 87, overstated wording). The source says that many streets in the quarter carry city names, not all of them. Now “many streets” / « de nombreuses rues ». Evidence: https://fr.wikipedia.org/wiki/Rome_(m%C3%A9tro_de_Paris) (« quartier de l'Europe, ainsi nommé du fait de la présence de nombreuses rues portant le nom de grandes villes européennes »). Existing source.

## station/2/rome/etymology/fr

Score: 0.98 → 0.97

- Before: La station doit son nom à la rue de Rome, qui porte le nom de la capitale italienne. Elle se trouve dans le quartier de l’Europe, dont les rues portent des noms de villes européennes.
- After: La station doit son nom à la rue de Rome, qui porte le nom de la capitale italienne. Elle se trouve dans le quartier de l’Europe, dont de nombreuses rues portent des noms de villes européennes.
- Reason: Fact (rank 87, overstated wording). The source says that many streets in the quarter carry city names, not all of them. Now “many streets” / « de nombreuses rues ». Evidence: https://fr.wikipedia.org/wiki/Rome_(m%C3%A9tro_de_Paris) (« quartier de l'Europe, ainsi nommé du fait de la présence de nombreuses rues portant le nom de grandes villes européennes »). Existing source.

## station/2/place-de-clichy/context/en

Score: 0.76 → 0.87

- Before: The Line 2 station opened on 26 October 1902, almost three weeks after trains began running on its section. The Nord-Sud company opened the platforms of its line B, now Line 13, on 26 February 1911.
- After: Trains passed through the station without stopping for almost three weeks after the Étoile – Anvers section opened. The Line 2 stop opened on 26 October 1902, under Boulevard de Clichy. The Nord-Sud company opened its line B platforms, now Line 13, under Avenue de Clichy on 26 February 1911.
- Reason: Copy. S7 was 0.34–0.35: the note had only opening dates. It now says that trains passed through without stopping for almost three weeks, and where each line runs (Line 2 under Boulevard de Clichy, Line 13 under Avenue de Clichy). No fact change to the dates.

## station/2/place-de-clichy/context/fr

Score: 0.81 → 0.87

- Before: La station de la ligne 2 ouvre le 26 octobre 1902, près de trois semaines après la mise en service de son tronçon. La compagnie du Nord-Sud y ouvre les quais de sa ligne B, l’actuelle ligne 13, le 26 février 1911.
- After: Pendant près de trois semaines après l’ouverture du tronçon Étoile – Anvers, les trains traversent la station sans s’y arrêter. L’arrêt de la ligne 2 ouvre le 26 octobre 1902, sous le boulevard de Clichy. Le 26 février 1911, le Nord-Sud ouvre sous l’avenue de Clichy les quais de sa ligne B, l’actuelle ligne 13.
- Reason: Copy. S7 was 0.34–0.35: the note had only opening dates. It now says that trains passed through without stopping for almost three weeks, and where each line runs (Line 2 under Boulevard de Clichy, Line 13 under Avenue de Clichy). No fact change to the dates.

## station/2/blanche/context/en

Score: 0.87 → 0.87

- Before: The station opened on 21 October 1902, two weeks after trains began running on its section. With Pigalle, it serves the Moulin Rouge; with Place de Clichy, the Montmartre cemetery. A dead-end siding lies just before the station on the Porte Dauphine side.
- After: The station opened on 21 October 1902, two weeks after trains began running on its section. With Pigalle, it serves the Moulin Rouge; with Place de Clichy, the Montmartre cemetery. A dead-end siding lies between Blanche and Pigalle.
- Reason: Fact (rank 71, wrong fact). The dead-end siding is on the Pigalle side, between Blanche and Pigalle, not before the station on the Porte Dauphine side. Evidence: https://fr.wikipedia.org/wiki/Ligne_2_du_m%C3%A9tro_de_Paris (« dessert les stations Place de Clichy et Blanche, dépasse une voie d'évitement en impasse du côté nord, puis … arrive à la station Pigalle »). Existing source.

## station/2/blanche/context/fr

Score: 0.90 → 0.90

- Before: La station ouvre le 21 octobre 1902, deux semaines après la mise en service de son tronçon. Avec Pigalle, elle dessert le Moulin-Rouge ; avec Place de Clichy, le cimetière de Montmartre. Une voie en impasse précède la station du côté de Porte Dauphine.
- After: La station ouvre le 21 octobre 1902, deux semaines après la mise en service de son tronçon. Avec Pigalle, elle dessert le Moulin-Rouge ; avec Place de Clichy, le cimetière de Montmartre. Une voie en impasse se trouve entre Blanche et Pigalle.
- Reason: Fact (rank 71, wrong fact). The dead-end siding is on the Pigalle side, between Blanche and Pigalle, not before the station on the Porte Dauphine side. Evidence: https://fr.wikipedia.org/wiki/Ligne_2_du_m%C3%A9tro_de_Paris (« dessert les stations Place de Clichy et Blanche, dépasse une voie d'évitement en impasse du côté nord, puis … arrive à la station Pigalle »). Existing source.

## station/2/la-chapelle/context/en

Score: 0.80 → 0.92

- Before: The elevated station lies between the Nord railway lines and the Est cutting. Since 1993 a long corridor has linked it to the underground part of Gare du Nord. It was the prototype of the Andreu-Motte style for the elevated stations.
- After: La Chapelle is an elevated station between the Nord railway lines and the Est cutting. It was the prototype of the Andreu-Motte style for elevated stations. Since 1993 a long corridor has linked it to the RER B and D platforms under Gare du Nord.
- Reason: EN copy: S4 was 0.00 (deletable sentence 0.62). The prototype sentence moves up, and “the underground part of Gare du Nord” is now the precise “RER B and D platforms under Gare du Nord”. The EN note no longer opens with “The elevated station”. FR parity: same order and the same precision; « une station aérienne située entre » replaces « Cette station aérienne se trouve entre ».

## station/2/la-chapelle/context/fr

Score: 0.91 → 0.92

- Before: Cette station aérienne se trouve entre les voies ferrées du Nord et la tranchée de l’Est. Depuis 1993, un long couloir la relie à la partie souterraine de la gare du Nord. Elle a servi de prototype au style Andreu-Motte pour les stations aériennes.
- After: La Chapelle est une station aérienne située entre les voies ferrées du Nord et la tranchée de l’Est. Elle a servi de prototype au style Andreu-Motte des stations aériennes. Depuis 1993, un long couloir la relie aux quais des RER B et D, sous la gare du Nord.
- Reason: EN copy: S4 was 0.00 (deletable sentence 0.62). The prototype sentence moves up, and “the underground part of Gare du Nord” is now the precise “RER B and D platforms under Gare du Nord”. The EN note no longer opens with “The elevated station”. FR parity: same order and the same precision; « une station aérienne située entre » replaces « Cette station aérienne se trouve entre ».

## station/2/stalingrad/context/en

Score: 0.89 → 0.90

- Before: The Line 2 station opened on 31 January 1903, on the viaduct, as Rue d’Aubervilliers. Passengers changing to Line 7 crossed the street with a transfer voucher. From October 1942 to 1946, the joined station was called Aubervilliers – Boulevard de la Villette.
- After: The Line 2 station opened on 31 January 1903, on the viaduct, as Rue d’Aubervilliers. East of the station, the viaduct curves twice to pass around the Rotonde de la Villette, designed by Claude-Nicolas Ledoux. From October 1942 to 1946, the joined station was called Aubervilliers – Boulevard de la Villette.
- Reason: Readability (optional fix from the review). The transfer-voucher sentence is replaced with a fact about the viaduct: east of the station it curves twice around the Rotonde de la Villette, designed by Claude-Nicolas Ledoux (“designed by”, not “built by”, after the refutation). The line illustration shows the Rotonde.

## station/2/stalingrad/context/fr

Score: 0.95 → 0.95

- Before: La station de la ligne 2 ouvre le 31 janvier 1903 sur le viaduc, sous le nom de Rue d’Aubervilliers. La correspondance avec la ligne 7 se fait alors par la rue, avec une contremarque. D’octobre 1942 à 1946, la station réunie s’appelle Aubervilliers – Boulevard de la Villette.
- After: La station de la ligne 2 ouvre le 31 janvier 1903 sur le viaduc, sous le nom de Rue d’Aubervilliers. À l’est de la station, le viaduc décrit deux courbes pour contourner la rotonde de la Villette, œuvre de Claude-Nicolas Ledoux. D’octobre 1942 à 1946, la station réunie s’appelle Aubervilliers – Boulevard de la Villette.
- Reason: Readability (optional fix from the review). The transfer-voucher sentence is replaced with a fact about the viaduct: east of the station it curves twice around the Rotonde de la Villette, designed by Claude-Nicolas Ledoux (“designed by”, not “built by”, after the refutation). The line illustration shows the Rotonde.

## station/2/couronnes/context/en

Score: 0.95 → 0.94

- Before: On 10 August 1903, smoke from a burning train filled the station, where a crowd was arguing with staff about refunds. The lights failed, and 75 people died against the blind end of the platform, out of 84 dead in all. The disaster led to all-metal trains and at least two exits per station.
- After: On 10 August 1903, smoke from a burning train filled the station, where a crowd was arguing with staff about refunds. The lights failed, and most of the 84 victims died here, against the blind end of the platform. The disaster led to all-metal trains and a separate lighting circuit.
- Reason: Fact (ranks 2 and 16). (1) “at least two exits per station” is not in the sources: the company refused the demand for more exits for cost reasons. The fire did lead to a separate lighting circuit. (2) “75 people died … out of 84” states a number the sources disagree on (75 or 77) and says all of them died at the blind end. Now “most of the 84 victims died here, against the blind end of the platform”, with no number for Couronnes. Evidence: https://fr.wikipedia.org/wiki/Incendie_du_10_ao%C3%BBt_1903_dans_le_m%C3%A9tro_de_Paris (« Il a notamment été demandé à la CMP d'aménager des accès supplémentaires … Pour des raisons financières, la compagnie restera sourde à cette demande »; « La plupart d'entre elles s'agglutineront au bout du quai »). Source added.

## station/2/couronnes/context/fr

Score: 0.93 → 0.93

- Before: Le 10 août 1903, la fumée d’un train en feu envahit la station, où une foule réclame au personnel le remboursement des billets. L’éclairage s’éteint et 75 personnes meurent contre le fond sans issue du quai, sur 84 victimes au total. La catastrophe impose des trains entièrement métalliques et au moins deux sorties par station.
- After: Le 10 août 1903, la fumée d’un train en feu envahit la station, où une foule réclame au personnel le remboursement des billets. L’éclairage s’éteint et la plupart des 84 victimes meurent ici, contre le fond sans issue du quai. La catastrophe impose des trains entièrement métalliques et un circuit d’éclairage séparé.
- Reason: Fact (ranks 2 and 16). (1) “at least two exits per station” is not in the sources: the company refused the demand for more exits for cost reasons. The fire did lead to a separate lighting circuit. (2) “75 people died … out of 84” states a number the sources disagree on (75 or 77) and says all of them died at the blind end. Now “most of the 84 victims died here, against the blind end of the platform”, with no number for Couronnes. Evidence: https://fr.wikipedia.org/wiki/Incendie_du_10_ao%C3%BBt_1903_dans_le_m%C3%A9tro_de_Paris (« Il a notamment été demandé à la CMP d'aménager des accès supplémentaires … Pour des raisons financières, la compagnie restera sourde à cette demande »; « La plupart d'entre elles s'agglutineront au bout du quai »). Source added.

## station/2/avron/context/en

Score: 0.80 → 0.89

- Before: The station opened on 2 April 1903 with the last section of the line, from Rue de Bagnolet to Nation. The street was given the name Rue d’Avron by an order of 1 February 1877. The station is very close to Buzenval on Line 9.
- After: Avron lies under Boulevard de Charonne, at its crossing with Rue d’Avron and Rue de Montreuil, very close to Buzenval on Line 9. It opened on 2 April 1903 with the last section of the line, from Rue de Bagnolet to Nation. Rue d’Avron took its name by an order of 1 February 1877.
- Reason: Copy. S7 was 0.56–0.58 and the note opened with “The station opened” / « La station ouvre » (T20). It now opens with the station's location under Boulevard de Charonne, at the crossing with Rue d’Avron and Rue de Montreuil, next to Buzenval. The street-name sentence no longer repeats « rue d’Avron ». No fact change.

## station/2/avron/context/fr

Score: 0.80 → 0.89

- Before: La station ouvre le 2 avril 1903 avec le dernier tronçon de la ligne, de Rue de Bagnolet à Nation. La rue reçoit le nom de rue d’Avron par un arrêté du 1er février 1877. La station est très proche de Buzenval, sur la ligne 9.
- After: La station se trouve sous le boulevard de Charonne, au croisement des rues d’Avron et de Montreuil, tout près de Buzenval (ligne 9). Elle ouvre le 2 avril 1903 avec le dernier tronçon de la ligne, de Rue de Bagnolet à Nation. La rue d’Avron reçoit son nom par un arrêté du 1er février 1877.
- Reason: Copy. S7 was 0.56–0.58 and the note opened with “The station opened” / « La station ouvre » (T20). It now opens with the station's location under Boulevard de Charonne, at the crossing with Rue d’Avron and Rue de Montreuil, next to Buzenval. The street-name sentence no longer repeats « rue d’Avron ». No fact change.

## station/2/nation/context/en

Score: 0.87 → 0.81

- Before: The Line 2 platforms opened on 2 April 1903 and replaced the temporary terminus at Rue de Bagnolet. Trains turn on a loop under the square, arriving under Avenue de Taillebourg and leaving under Avenue du Trône. The curved station has one wide island platform between the two tracks.
- After: The Line 2 platforms opened on 2 April 1903, with the last section of the line. Trains turn on a loop under the square, arriving under Avenue de Taillebourg and leaving under Avenue du Trône. The curved station has one wide island platform between the two tracks.
- Reason: Parity (optional fix from the review). “replaced the temporary terminus at Rue de Bagnolet” is now “with the last section of the line”, the wording of the Avron note. The note no longer names the temporary terminus, whose first name the sources give as both Bagnolet and Rue de Bagnolet. No fact change.

## station/2/nation/context/fr

Score: 0.90 → 0.90

- Before: Les quais de la ligne 2 ouvrent le 2 avril 1903 et remplacent le terminus provisoire de Rue de Bagnolet. Les trains tournent sur une boucle sous la place : arrivée sous l’avenue de Taillebourg, départ sous l’avenue du Trône. La station, en courbe, a un large quai central entre ses deux voies.
- After: Les quais de la ligne 2 ouvrent le 2 avril 1903, avec le dernier tronçon de la ligne. Les trains tournent sur une boucle sous la place : arrivée sous l’avenue de Taillebourg, départ sous l’avenue du Trône. La station, en courbe, a un large quai central entre ses deux voies.
- Reason: Parity (optional fix from the review). “replaced the temporary terminus at Rue de Bagnolet” is now “with the last section of the line”, the wording of the Avron note. The note no longer names the temporary terminus, whose first name the sources give as both Bagnolet and Rue de Bagnolet. No fact change.

## line/2/imageAlt/en

Score: 0.99 → 1.00

- Before: Engraved-style illustration of the Rotonde de la Villette, a neoclassical stone toll house with porticoes and an arcaded central drum.
- After: Engraved-style illustration of the Rotonde de la Villette, a neoclassical stone toll house with porticoes and an arcaded central drum, beside a stretch of water.
- Reason: Readability (optional fix from the review). The alt text now names the stretch of water in front of the Rotonde, which the illustration shows.

## line/2/imageAlt/fr

Score: 0.98 → 0.99

- Before: Illustration de style gravure de la rotonde de la Villette, ancien bureau d’octroi néoclassique en pierre, avec ses portiques et son tambour central à arcades.
- After: Illustration de style gravure de la rotonde de la Villette, ancien bureau d’octroi néoclassique en pierre, avec ses portiques et son tambour central à arcades, au bord d’un plan d’eau.
- Reason: Readability (optional fix from the review). The alt text now names the stretch of water in front of the Rotonde, which the illustration shows.

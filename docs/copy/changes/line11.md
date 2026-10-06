# Line 11 copy changes

File: `apps/web/src/data/line11.ts`. Evaluator: jev-1.13.0, question set 2026-10-05.7.

Before text: commit `917dc4b` (first commit of `line11.ts`). After text: commit `133f5ff` (review fixes). Each before and after text below was checked against the file at that commit.

Before runs: 2026-10-06T00:41:18Z (stations and line copy). After runs: 2026-10-06T01:03:54Z (stations and line copy). The run output is in the review scratchpad, not in the repository.

## Summary

| | Before | After |
|---|---|---|
| Station units | 76 | 76 |
| Ship / edit / rewrite | 73 / 3 / 0 | 75 / 1 / 0 |
| Hard failures | 0 | 0 |
| Mean composite | 0.938 | 0.942 |
| Line units (ship / edit / rewrite) | 6 / 0 / 0 | 6 / 0 / 0 |
| Line mean composite | 0.969 | 0.969 |

24 station units changed in 13 pairs (11 pairs in both locales, 2 in FR only). The line copy did not change.

Below 0.85 after the change: `station/11/coteaux-beauclair/etymology/en` (0.72, edit). The fact fix made the note open with “It” and dropped the house etymology opening. The fact is correct; the wording needs a copy edit, for example “Coteaux Beauclair shares its name with …”. The three units that were in the edit band before (mairie-des-lilas/etymology/en 0.75, serge-gainsbourg/context/fr 0.80, chatelet/context/fr 0.84) now ship.

Five units scored lower because of a fact fix: coteaux-beauclair/etymology en (0.93 → 0.72) and fr (0.94 → 0.86), serge-gainsbourg/etymology en (0.95 → 0.88) and fr (0.93 → 0.86), and rosny-bois-perrier/context/fr (0.94 → 0.90). hotel-de-ville/context/fr went up but now has a sentenceLength FAIL. Four units went down by 0.01 (goncourt/etymology/fr, belleville/context en and fr, pyrenees/context/en), which is judge noise.

## station/11/chatelet/context/en

Score: 0.86 → 0.94

- Before: The Line 11 platform opened on 28 April 1935 under Avenue Victoria, as the western terminus, and is still the terminus. Until 2018 its name plates carried the subtitle “Avenue Victoria”, after Queen Victoria of the United Kingdom.
- After: Since 28 April 1935 this platform under Avenue Victoria has been the western terminus of Line 11. Until 2018 its name plates carried the subtitle “Avenue Victoria”, after Queen Victoria.
- Reason: Copy. Removed the T20 opener “The Line 11 platform” / « Le quai de la ligne 11 » and the filler “and is still the terminus” / « rôle qu’il garde aujourd’hui ». Removed “of the United Kingdom” / « du Royaume-Uni » (parity.names). No fact change.

## station/11/chatelet/context/fr

Score: 0.84 → 0.93 (edit → ship)

- Before: Le quai de la ligne 11 ouvre le 28 avril 1935 sous l’avenue Victoria, comme terminus ouest, rôle qu’il garde aujourd’hui. Jusqu’en 2018, ses plaques portent le sous-titre « Avenue Victoria », en l’honneur de la reine Victoria du Royaume-Uni.
- After: Depuis le 28 avril 1935, ce quai sous l’avenue Victoria est le terminus ouest de la ligne 11. Jusqu’en 2018, ses plaques portent le sous-titre « Avenue Victoria », en l’honneur de la reine Victoria.
- Reason: Copy. Removed the T20 opener “The Line 11 platform” / « Le quai de la ligne 11 » and the filler “and is still the terminus” / « rôle qu’il garde aujourd’hui ». Removed “of the United Kingdom” / « du Royaume-Uni » (parity.names). No fact change.

## station/11/hotel-de-ville/context/en

Score: 0.87 → 0.93

- Before: The Line 11 platform lies under Rue du Renard, just after the line passes under Line 1. When Châtelet closed on 18 March 2019 to be adapted for longer trains, Hôtel de Ville became the temporary western terminus.
- After: This platform, under Rue du Renard, lies just after the point where Line 11 passes under Line 1. From 18 March 2019 Hôtel de Ville was the temporary western terminus, while the Châtelet platform was closed to be adapted for longer trains.
- Reason: Fact. 18 March 2019 is the date when Hôtel de Ville became the temporary terminus, so the date now attaches to that. Two conflicting review fixes on this field were merged into one per locale. Also removes the T20 opener. The FR sentence now has 28 words (sentenceLength FAIL), but the unit still ships.

## station/11/hotel-de-ville/context/fr

Score: 0.87 → 0.88

- Before: Le quai de la ligne 11 se trouve sous la rue du Renard, juste après le passage de la ligne sous la ligne 1. Quand Châtelet ferme le 18 mars 2019 pour être adapté à des trains plus longs, Hôtel de Ville devient le terminus ouest provisoire.
- After: Ce quai, sous la rue du Renard, se trouve juste après le point où la ligne 11 passe sous la ligne 1. À partir du 18 mars 2019, Hôtel de Ville est le terminus ouest provisoire, pendant que le quai de Châtelet, fermé, est adapté à des trains plus longs.
- Reason: Fact. 18 March 2019 is the date when Hôtel de Ville became the temporary terminus, so the date now attaches to that. Two conflicting review fixes on this field were merged into one per locale. Also removes the T20 opener. The FR sentence now has 28 words (sentenceLength FAIL), but the unit still ships.

## station/11/republique/context/en

Score: 0.87 → 0.93

- Before: The Line 11 tunnel under the square was built at the same time as Lines 8 and 9. Work on the rest of the line began in September 1931. Here Line 11 passes below all the other lines. Its platforms opened on 28 April 1935.
- After: The Line 11 tunnel under the square was built at the same time as Lines 8 and 9. Work on the rest of the line began in September 1931. Here Line 11 passes below all the other lines.
- Reason: Copy. Removed the opening date 28 April 1935, which the line text and other stations already give. Removes the T20 opener in EN.

## station/11/republique/context/fr

Score: 0.94 → 0.96

- Before: Le tunnel de la ligne 11 sous la place est construit en même temps que les lignes 8 et 9. Les travaux sur le reste de la ligne commencent en septembre 1931. La ligne 11 passe ici sous toutes les autres lignes ; ses quais ouvrent le 28 avril 1935.
- After: Le tunnel de la ligne 11 sous la place est construit en même temps que les lignes 8 et 9. Les travaux sur le reste de la ligne commencent en septembre 1931. La ligne 11 passe ici sous toutes les autres lignes.
- Reason: Copy. Removed the opening date 28 April 1935, which the line text and other stations already give. Removes the T20 opener in EN.

## station/11/goncourt/etymology/en

Score: 0.98 → 0.98

- Before: Named for Rue des Goncourt, which honours the brothers Edmond (1822–1896) and Jules (1830–1870) de Goncourt. The two writers and historians founded the Académie Goncourt, which awards the Prix Goncourt.
- After: Named for Rue des Goncourt, which honours the brothers Edmond (1822–1896) and Jules (1830–1870) de Goncourt. The two writers and historians planned the Académie Goncourt, founded in 1903 under Edmond’s will. It awards the Prix Goncourt.
- Reason: Fact. The brothers did not found the Académie: it was founded in 1903 under Edmond’s will, after Jules’s death. New source: “Académie Goncourt · Wikipédia”. The proposed text “…; it was founded in 1903” let “it” refer to the prize, so it was split and 1903 attaches to the Académie.

## station/11/goncourt/etymology/fr

Score: 0.98 → 0.97

- Before: La station doit son nom à la rue des Goncourt, qui honore les frères Edmond (1822–1896) et Jules (1830–1870) de Goncourt. Écrivains et historiens, ils sont les fondateurs de l’Académie Goncourt, qui décerne le prix Goncourt.
- After: La station doit son nom à la rue des Goncourt, qui honore les frères Edmond (1822–1896) et Jules (1830–1870) de Goncourt. Écrivains et historiens, ils conçoivent l’Académie Goncourt, fondée en 1903 selon le testament d’Edmond. Elle décerne le prix Goncourt.
- Reason: Fact. The brothers did not found the Académie: it was founded in 1903 under Edmond’s will, after Jules’s death. New source: “Académie Goncourt · Wikipédia”. The proposed text “…; it was founded in 1903” let “it” refer to the prize, so it was split and 1903 attaches to the Académie.

## station/11/belleville/context/en

Score: 0.91 → 0.90

- Before: Belleville and Place de Clichy are the only two stations that touch four arrondissements. The Line 11 platforms, opened on 28 April 1935, keep their interwar honey-coloured tile frames. The station name is set in the tiles.
- After: Belleville and Place de Clichy are the only two stations that touch four arrondissements. The Line 11 platforms keep their interwar honey-coloured tile frames. The station name is set in the tiles.
- Reason: Copy. Removed the repeated opening date 28 April 1935. The FR fr.genericPlaceCase FAIL was there before and is unchanged.

## station/11/belleville/context/fr

Score: 0.92 → 0.91

- Before: Belleville et Place de Clichy sont les deux seules stations à toucher quatre arrondissements. Les quais de la ligne 11, ouverts le 28 avril 1935, gardent leurs encadrements de carreaux couleur miel de l’entre-deux-guerres. Le nom de la station y est inscrit dans le carrelage.
- After: Belleville et Place de Clichy sont les deux seules stations à toucher quatre arrondissements. Les quais de la ligne 11 gardent leurs encadrements de carreaux couleur miel de l’entre-deux-guerres. Le nom de la station y est inscrit dans le carrelage.
- Reason: Copy. Removed the repeated opening date 28 April 1935. The FR fr.genericPlaceCase FAIL was there before and is unchanged.

## station/11/pyrenees/context/en

Score: 0.97 → 0.96

- Before: Trains reach the station after a 700 m climb at a 4% gradient under Rue de Belleville. Because the station is deep, its vault is higher and narrower than the standard, like those of Jourdain and Place des Fêtes. In April 1944 its platforms were used as an air-raid shelter.
- After: Between Belleville and this station, 700 m apart, the line climbs at a 4% gradient under Rue de Belleville. Because the station is deep, its vault is higher and narrower than the standard, like those of Jourdain and Place des Fêtes. In April 1944 its platforms were used as an air-raid shelter.
- Reason: Fact. 700 m is the distance between Belleville and Pyrénées, not the length of the 4% ramp. No fact added.

## station/11/pyrenees/context/fr

Score: 0.95 → 0.96

- Before: Les trains y arrivent après une rampe de 700 m à 4 % sous la rue de Belleville. La station étant profonde, sa voûte est plus haute et plus étroite que la normale, comme à Jourdain et à Place des Fêtes. En avril 1944, ses quais servent d’abri antiaérien.
- After: Entre Belleville et la station, distantes de 700 m, la ligne monte une rampe de 4 % sous la rue de Belleville. La station étant profonde, sa voûte est plus haute et plus étroite que la normale, comme à Jourdain et à Place des Fêtes. En avril 1944, ses quais servent d’abri antiaérien.
- Reason: Fact. 700 m is the distance between Belleville and Pyrénées, not the length of the 4% ramp. No fact added.

## station/11/porte-des-lilas/context/en

Score: 0.92 → 0.96

- Before: The Line 11 platform was the eastern terminus from 1935 to 1937, and the line passes above the Line 3 bis turning loop here. Three mosaics by Michel L’Huillier (late 1980s), showing Georges Brassens and lilacs, were destroyed at the end of July 2025 during waterproofing work.
- After: From 1935 to 1937 this platform was the eastern terminus of Line 11. Here the line passes above the Line 3 bis turning loop. Three mosaics by Michel L’Huillier (late 1980s), showing Georges Brassens and lilacs, were destroyed at the end of July 2025 during waterproofing work.
- Reason: Copy (FR) and parity (EN). Split the FR sentence of 29 words at the semicolon, and removed the T20 opener « Le quai de la ligne 11 ». EN follows. « terminus est » is now « terminus oriental » to avoid “est … est”.

## station/11/porte-des-lilas/context/fr

Score: 0.87 → 0.97

- Before: Le quai de la ligne 11 est le terminus est de 1935 à 1937 ; la ligne passe ici au-dessus de la boucle de retournement de la ligne 3 bis. Trois mosaïques de Michel L’Huillier (fin des années 1980), représentant Georges Brassens et des lilas, sont détruites fin juillet 2025 lors de travaux d’étanchéité.
- After: De 1935 à 1937, ce quai est le terminus oriental de la ligne 11. Ici, la ligne passe au-dessus de la boucle de retournement de la ligne 3 bis. Trois mosaïques de Michel L’Huillier (fin des années 1980), représentant Georges Brassens et des lilas, sont détruites fin juillet 2025 lors de travaux d’étanchéité.
- Reason: Copy (FR) and parity (EN). Split the FR sentence of 29 words at the semicolon, and removed the T20 opener « Le quai de la ligne 11 ». EN follows. « terminus est » is now « terminus oriental » to avoid “est … est”.

## station/11/mairie-des-lilas/etymology/en

Score: 0.75 → 0.89 (edit → ship)

- Before: Named for the town hall of Les Lilas. The commune, created in 1867, takes its name from the flower gardens that covered the hill under the Second Empire. Above all, it recalls the lilacs of its open-air cafés and cabarets.
- After: Named for the town hall of Les Lilas. The commune, created on 24 July 1867, takes its name mainly from the lilacs of its open-air cafés and cabarets. It also takes it from the flower gardens that covered the hill under the Second Empire.
- Reason: Copy (EN) and parity (FR). The main source of the name (the lilacs) now comes first, and the evaluative “Above all, it recalls” is gone. Adds the exact date of creation, 24 July 1867 (open item: revert to the year if the house rule is years only).

## station/11/mairie-des-lilas/etymology/fr

Score: 0.88 → 0.91

- Before: La station doit son nom à la mairie des Lilas. Créée en 1867, la commune tient son nom des jardins fleuris qui couvraient la colline sous le Second Empire. Elle le doit surtout aux lilas de ses guinguettes et cabarets.
- After: La station doit son nom à la mairie des Lilas. La commune, créée le 24 juillet 1867, tient son nom surtout des lilas de ses guinguettes et cabarets. Elle le tient aussi des jardins fleuris qui couvraient la colline sous le Second Empire.
- Reason: Copy (EN) and parity (FR). The main source of the name (the lilacs) now comes first, and the evaluative “Above all, it recalls” is gone. Adds the exact date of creation, 24 July 1867 (open item: revert to the year if the house rule is years only).

## station/11/serge-gainsbourg/etymology/en

Score: 0.95 → 0.88

- Before: Named for the singer-songwriter Serge Gainsbourg (1928–1991), who wrote “Le Poinçonneur des Lilas” (1958), about a Métro ticket puncher at Les Lilas. The mayor of Les Lilas obtained the agreement of Jane Birkin, Gainsbourg’s former partner and heir, for this name.
- After: Named for the singer-songwriter Serge Gainsbourg (1928–1991), who wrote “Le Poinçonneur des Lilas” (1958), about a Métro ticket puncher at Les Lilas. The mayor of Les Lilas obtained the agreement of Jane Birkin, Gainsbourg’s former partner, for this name.
- Reason: Fact. The source calls Jane Birkin the rights holder (« l’ayant droit »), not the heir; they were never married and his heirs are his children. Removed “and heir” / « et héritière ». The score fell because S6 (missing 0.54) now finds less detail, but the unit ships.

## station/11/serge-gainsbourg/etymology/fr

Score: 0.93 → 0.86

- Before: La station porte le nom de l’auteur-compositeur-interprète Serge Gainsbourg (1928–1991), auteur du « Poinçonneur des Lilas » (1958), sur un poinçonneur de tickets du métro aux Lilas. Le maire des Lilas a obtenu pour ce nom l’accord de Jane Birkin, ancienne compagne et héritière de Gainsbourg.
- After: La station porte le nom de l’auteur-compositeur-interprète Serge Gainsbourg (1928–1991), auteur du « Poinçonneur des Lilas » (1958), sur un poinçonneur de tickets du métro aux Lilas. Le maire des Lilas a obtenu pour ce nom l’accord de Jane Birkin, ancienne compagne de Gainsbourg.
- Reason: Fact. The source calls Jane Birkin the rights holder (« l’ayant droit »), not the heir; they were never married and his heirs are his children. Removed “and heir” / « et héritière ». The score fell because S6 (missing 0.54) now finds less detail, but the unit ships.

## station/11/serge-gainsbourg/context/fr

Score: 0.80 → 0.92 (edit → ship)

- Before: Le chantier de la station sert de puits de sortie au tunnelier Sofia, arrivé le 16 juillet 2021. La station ne dessert pas le jardin Serge-Gainsbourg de la porte des Lilas, situé à 1,5 km à l’ouest.
- After: Le chantier de la station est le puits de sortie du tunnelier Sofia, arrivé le 16 juillet 2021. La station ne dessert pas le jardin Serge-Gainsbourg de la porte des Lilas, situé à 1,5 km à l’ouest.
- Reason: Copy. Replaced the flagged phrase « sert de » (T8) with « est ». FR only.

## station/11/montreuil-hopital/context/fr

Score: 0.95 → 0.95

- Before: La station se trouve sous le boulevard de la Boissière et en partie sous le terrain de l’hôpital, à cheval sur Montreuil et Noisy-le-Sec. Elle est construite à ciel ouvert, en deux parties.
- After: La station se trouve sous le boulevard de la Boissière et en partie sous le terrain de l’hôpital, à cheval sur Montreuil et Noisy-le-Sec. Elle est construite en tranchée couverte, en deux parties.
- Reason: Fact (EN/FR mismatch). FR « à ciel ouvert » (open cut) did not match EN “cut and cover” or the source (« tranchée couverte »). FR only.

## station/11/coteaux-beauclair/etymology/en

Score: 0.93 → 0.72 (ship → edit)

- Before: Named after the Coteaux Beauclair development zone in Rosny-sous-Bois, beside the station. Its developer says the zone was created in December 2015 by merging two earlier zones, because of the new metro station.
- After: It shares its name with the Coteaux Beauclair development zone in Rosny-sous-Bois, beside the station. Its developer says the zone was created in December 2015 by merging two earlier zones, because of the new metro station.
- Reason: Fact. No source says the station was named after the development zone; the zone (December 2015) may take its name from the station. Now “shares its name with” / « porte le même nom que ». The EN score fell from 0.93 to 0.72 (edit band): the note now opens with “It” (openingPronoun), and it does not use the house etymology opening (r2Opening). FR stays in the ship band at 0.86 but also has an r2Opening FAIL and a T7 tell.

## station/11/coteaux-beauclair/etymology/fr

Score: 0.94 → 0.86

- Before: La station doit son nom à la zone d’aménagement concerté des Coteaux Beauclair, à Rosny-sous-Bois, qu’elle jouxte. Selon son aménageur, cette zone est créée en décembre 2015 par la fusion de deux zones, en raison de la nouvelle station de métro.
- After: La station porte le même nom que la zone d’aménagement concerté des Coteaux Beauclair, à Rosny-sous-Bois, qu’elle jouxte. Selon son aménageur, cette zone est créée en décembre 2015 par la fusion de deux zones, en raison de la nouvelle station de métro.
- Reason: Fact. No source says the station was named after the development zone; the zone (December 2015) may take its name from the station. Now “shares its name with” / « porte le même nom que ». The EN score fell from 0.93 to 0.72 (edit band): the note now opens with “It” (openingPronoun), and it does not use the house etymology opening (r2Opening). FR stays in the ship band at 0.86 but also has an r2Opening FAIL and a T7 tell.

## station/11/rosny-bois-perrier/context/en

Score: 0.93 → 0.93

- Before: Rosny – Bois-Perrier has been the eastern terminus of the line since 13 June 2024 and is the easternmost station of the Métro. Line 15 is planned to serve it around 2030, linked to Line 11 by a 35 m tunnel under the RER tracks.
- After: Rosny – Bois-Perrier has been the eastern terminus of the line since 13 June 2024 and is the easternmost station of the Métro. Line 15 is planned to serve it from 2031, linked to Line 11 by a 35 m tunnel under the RER tracks.
- Reason: Fact. The cited article gives 2030; the project owner gives 2031 for Line 15 Est. New source: “Ligne 15 Est · Grand Paris Express”. The FR sentence now has 26 words (sentenceLength FAIL), but the unit ships.

## station/11/rosny-bois-perrier/context/fr

Score: 0.94 → 0.90

- Before: Rosny – Bois-Perrier est le terminus est de la ligne depuis le 13 juin 2024 et la station la plus orientale du métro. La ligne 15 doit la desservir vers 2030, reliée à la ligne 11 par un tunnel de 35 m sous les voies du RER.
- After: Rosny – Bois-Perrier est le terminus est de la ligne depuis le 13 juin 2024 et la station la plus orientale du métro. La ligne 15 doit la desservir à partir de 2031, reliée à la ligne 11 par un tunnel de 35 m sous les voies du RER.
- Reason: Fact. The cited article gives 2030; the project owner gives 2031 for Line 15 Est. New source: “Ligne 15 Est · Grand Paris Express”. The FR sentence now has 26 words (sentenceLength FAIL), but the unit ships.

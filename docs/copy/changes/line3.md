# Line 3 copy changes

File: `apps/web/src/data/line3.ts`. Evaluator: jev-1.13.0, question set 2026-10-05.7.

Before text: commit `fdc5e53` (first commit of `line3.ts`). After text: commit `e342d2d` (review fixes). Each before and after text below was checked against the file at that commit.

Before runs: 2026-10-06T01:08:29Z (stations and line copy). After runs: 2026-10-06T01:37:21Z (stations and line copy). The run output is in the review scratchpad, not in the repository. Both runs had 0 request errors.

Shared stations: the etymologies of saint-lazare, opera, reaumur-sebastopol, arts-et-metiers, republique and villiers are not changed. `station/3/villiers/etymology/fr` (0.847, edit) belongs to Line 2. Its findings are T7 (“One explanation”) and fr.genericPlaceCase on « Avenue de Villiers », which is a proper name, so that flag is a false positive. The Havre – Caumartin etymology changed here and in `line9.ts` together (shared-etymology test).

## Summary

| | Before | After |
|---|---|---|
| Station units | 100 | 100 |
| Ship / edit / rewrite | 92 / 8 / 0 | 97 / 3 / 0 |
| Hard failures | 0 | 0 |
| Mean composite | 0.926 | 0.928 |
| Line units (ship / edit / rewrite) | 6 / 0 / 0 | 6 / 0 / 0 |
| Line mean composite | 0.984 | 0.985 |

21 units changed in 11 pairs: 19 station units in 10 pairs (9 pairs in both locales, 1 in EN only) and the line summary in both locales.

- Copy edits (8 units): sentier etymology and context, quatre-septembre context, arts-et-metiers context. The 7 edit-band units in these pairs now ship. The main cause before was T20, the corpus opener “The station opened” / « La station ouvre » / « Le quai de ».
- Fact fixes (9 units): europe context, havre-caumartin etymology, porte-de-bagnolet etymology, porte-de-champerret etymology, louise-michel context (EN). The fact check is in [docs/facts/2026-10-06-fact-check-line-3.md](../../facts/2026-10-06-fact-check-line-3.md).
- Readability and parity (4 units): reaumur-sebastopol context, line summary.

Below 0.85 after the change:

- `station/3/porte-de-bagnolet/etymology/fr` (0.72, edit). The fact fix brought in the calque « nommée d’après » (T19, parity.frCalque) and the second sentence has 27 words (sentenceLength FAIL). Before the fix, the unit was 0.91 with a 29-word sentence. The fact is correct; the wording needs a copy edit: replace « nommée d’après » (for example « qui tenait son nom de la rue de Bagnolet ») and split the second sentence to 25 words or fewer.
- `station/3/porte-de-bagnolet/etymology/en` (0.845, edit). The EN text has no finding of its own. The S6 parity cap comes from the FR calque, so the FR edit should also fix EN.
- `station/3/villiers/etymology/fr` (0.847, edit). Not changed (shared with Line 2, see above).

No unit has a hard failure.

Four units scored lower after a fact fix: porte-de-bagnolet/etymology en (0.96 → 0.84) and fr (0.91 → 0.72), europe/context/fr (0.93 → 0.91), porte-de-champerret/etymology en (0.94 → 0.93). porte-de-champerret/etymology/fr went from 0.858 to 0.854 and still ships. Two units with no text change went up (saint-lazare/context/fr 0.91 → 0.96, havre-caumartin/context/fr 0.92 → 0.96), which is judge noise.

## station/3/sentier/etymology/en

Score: 0.82 → 0.86

- Before: Named for Rue du Sentier, in the quarter of the same name. The origin of the street name is uncertain. The street probably began as a path (sentier), by one account leading to the city rampart. Some old maps call it Rue du Chantier.
- After: Named for Rue du Sentier, in the quarter of the same name. The street probably began as a path (sentier); one source says it led to the city rampart. Some old maps call it Rue du Chantier.
- Reason: Copy. Removed “The origin of the street name is uncertain” / « L’origine du nom est incertaine », which repeated the hedge in “probably” / « serait ». “by one account” / « selon une version » is now “one source says” / « selon une source ». The two Lazare brothers are the authors of that source, so the review did not use “one author”. No fact change.

## station/3/sentier/etymology/fr

Score: 0.84 → 0.86

- Before: La station doit son nom à la rue du Sentier, dans le quartier du même nom. L’origine du nom est incertaine : la rue serait d’abord un sentier, qui menait selon une version au rempart de la ville. Certains plans anciens la nomment rue du Chantier.
- After: La station doit son nom à la rue du Sentier, dans le quartier du même nom. La rue serait d’abord un sentier ; selon une source, il menait au rempart de la ville. Certains plans anciens la nomment rue du Chantier.
- Reason: Copy. Removed “The origin of the street name is uncertain” / « L’origine du nom est incertaine », which repeated the hedge in “probably” / « serait ». “by one account” / « selon une version » is now “one source says” / « selon une source ». The two Lazare brothers are the authors of that source, so the review did not use “one author”. No fact change.

## station/3/sentier/context/en

Score: 0.83 → 0.88

- Before: The station opened on 20 November 1904, a month after the first section of the line. In 2025 it was one of five stations on the network whose platforms kept 1960s metal wall panels. Parmentier, on the same line, was another.
- After: In 2025 Sentier was one of five stations on the network whose platforms kept 1960s metal wall panels. Parmentier, on the same line, was another. The station opened on 20 November 1904, a month after the line’s first section.
- Reason: Copy. The note opened with the T20 corpus opener “The station opened” / « La station ouvre ». The 1960s wall panels now come first, and the opening date moves to the end. No fact change.

## station/3/sentier/context/fr

Score: 0.83 → 0.90

- Before: La station ouvre le 20 novembre 1904, un mois après le premier tronçon de la ligne. En 2025, elle fait partie des cinq stations du réseau dont les quais conservent un carrossage métallique des années 1960. Parmentier, sur la même ligne, en fait aussi partie.
- After: En 2025, Sentier fait partie des cinq stations du réseau dont les quais conservent un carrossage métallique des années 1960. Parmentier, sur la même ligne, en fait aussi partie. La station ouvre le 20 novembre 1904, un mois après le premier tronçon de la ligne.
- Reason: Copy. The note opened with the T20 corpus opener “The station opened” / « La station ouvre ». The 1960s wall panels now come first, and the opening date moves to the end. No fact change.

## station/3/quatre-septembre/context/en

Score: 0.86 → 0.91

- Before: The station opened on 3 November 1904, about two weeks after the first section of the line. It was the first station on the network named for a date. La Courneuve – 8 Mai 1945 followed in 1987.
- After: Quatre-Septembre was the first station on the network named for a date; La Courneuve – 8 Mai 1945 followed in 1987. The station opened on 3 November 1904, about two weeks after the line’s first section.
- Reason: Copy. The note opened with the T20 corpus opener “The station opened” / « La station ouvre ». The first-station-named-for-a-date fact now comes first. EN was in the ship band (0.86) and changed for EN/FR parity. “The station” / « La station » in the second sentence removes an ambiguous pronoun. No fact change.

## station/3/quatre-septembre/context/fr

Score: 0.83 → 0.86

- Before: La station ouvre le 3 novembre 1904, deux semaines environ après le premier tronçon de la ligne. C’est la première station du réseau dont le nom rappelle une date. La Courneuve – 8 Mai 1945 la rejoint en 1987.
- After: Quatre-Septembre est la première station du réseau dont le nom rappelle une date ; La Courneuve – 8 Mai 1945 la rejoint en 1987. La station ouvre le 3 novembre 1904, deux semaines environ après le premier tronçon de la ligne.
- Reason: Copy. The note opened with the T20 corpus opener “The station opened” / « La station ouvre ». The first-station-named-for-a-date fact now comes first. EN was in the ship band (0.86) and changed for EN/FR parity. “The station” / « La station » in the second sentence removes an ambiguous pronoun. No fact change.

## station/3/arts-et-metiers/context/en

Score: 0.84 → 0.89

- Before: The Line 3 platform opened on 19 October 1904 and lies on a curve under the corner of Rue Réaumur and Rue de Turbigo. After 1988 it received a dark green “Ouï-dire” decoration, with lighting strips on curved brackets shaped like scythes.
- After: Under the corner of Rue Réaumur and Rue de Turbigo, the Line 3 platform lies on a curve. It opened with the line’s first section on 19 October 1904. After 1988 it received a dark green “Ouï-dire” decoration, with lighting strips on curved brackets shaped like scythes.
- Reason: Copy. The note opened with the T20 corpus opener “The Line 3 platform opened” / « Le quai de la ligne 3 ouvre ». The location under Rue Réaumur and Rue de Turbigo now comes first. Added “with the line’s first section” / « avec le premier tronçon de la ligne », which the date already implied. FR drops « de style ». No fact change.

## station/3/arts-et-metiers/context/fr

Score: 0.81 → 0.88

- Before: Le quai de la ligne 3 ouvre le 19 octobre 1904. Il est établi en courbe sous l’angle des rues Réaumur et de Turbigo. Après 1988, il reçoit une décoration de style « Ouï-dire » vert foncé, avec des bandeaux lumineux portés par des consoles courbes en forme de faux.
- After: Sous l’angle des rues Réaumur et de Turbigo, le quai de la ligne 3 est établi en courbe. Il ouvre avec le premier tronçon de la ligne, le 19 octobre 1904. Après 1988, il reçoit une décoration « Ouï-dire » vert foncé, avec des bandeaux lumineux portés par des consoles courbes en forme de faux.
- Reason: Copy. The note opened with the T20 corpus opener “The Line 3 platform opened” / « Le quai de la ligne 3 ouvre ». The location under Rue Réaumur and Rue de Turbigo now comes first. Added “with the line’s first section” / « avec le premier tronçon de la ligne », which the date already implied. FR drops « de style ». No fact change.

## station/3/europe/context/en

Score: 0.93 → 0.94

- Before: On 29 May 2018 the station received the subtitle Simone Veil, on the day the square took her name. Simone Veil was minister of health and the first president of the European Parliament.
- After: On 29 May 2018 the station received the subtitle Simone Veil, on the day the square took her name. Simone Veil was minister of health and the first president of the directly elected European Parliament.
- Reason: Fact. Simone Veil was the first president of the directly elected Parliament (1979), not the first president. The Parliament had presidents from 1958. FR score fell from 0.93 to 0.91; both units ship.

## station/3/europe/context/fr

Score: 0.93 → 0.91

- Before: Le 29 mai 2018, la station reçoit le sous-titre Simone Veil, le jour même où la place prend son nom. Simone Veil a été ministre de la Santé et la première présidente du Parlement européen.
- After: Le 29 mai 2018, la station reçoit le sous-titre Simone Veil, le jour même où la place prend son nom. Simone Veil a été ministre de la Santé et la première présidente du Parlement européen élu au suffrage universel.
- Reason: Fact. Simone Veil was the first president of the directly elected Parliament (1979), not the first president. The Parliament had presidents from 1958. FR score fell from 0.93 to 0.91; both units ship.

## station/3/havre-caumartin/etymology/en

Score: 0.97 → 0.97

- Before: Named for Rue de Caumartin and Rue du Havre. Rue de Caumartin honours Antoine-Louis Lefebvre de Caumartin, marquis de Saint-Ange (1725–1803), a prévôt des marchands of Paris. Rue du Havre, added to the name in 1926, honours the Normandy port.
- After: Named for Rue de Caumartin and Rue du Havre. Rue de Caumartin honours Antoine-Louis Lefebvre de Caumartin, marquis de Saint-Ange (1725–1803), a prévôt des marchands of Paris. Rue du Havre, added to the name in 1926, recalls the trains from Saint-Lazare to Le Havre.
- Reason: Fact. The street is not named to honour the port. It took the name because trains from the Saint-Lazare terminus went to Le Havre. New source: “Rue du Havre · Wikipédia”. FR first sentence now reads « aux rues de Caumartin et du Havre » to stay within 45 words (EN 44, FR 43). The same text is now in `line9.ts` (shared etymology).

## station/3/havre-caumartin/etymology/fr

Score: 0.98 → 0.98

- Before: La station doit son nom à la rue de Caumartin et à la rue du Havre. La première honore Antoine-Louis Lefebvre de Caumartin, marquis de Saint-Ange (1725–1803), prévôt des marchands de Paris. La rue du Havre, ajoutée au nom en 1926, honore le port normand.
- After: La station doit son nom aux rues de Caumartin et du Havre. La première honore Antoine-Louis Lefebvre de Caumartin, marquis de Saint-Ange (1725–1803), prévôt des marchands de Paris. La seconde, ajoutée au nom en 1926, rappelle les trains de Saint-Lazare vers Le Havre.
- Reason: Fact. The street is not named to honour the port. It took the name because trains from the Saint-Lazare terminus went to Le Havre. New source: “Rue du Havre · Wikipédia”. FR first sentence now reads « aux rues de Caumartin et du Havre » to stay within 45 words (EN 44, FR 43). The same text is now in `line9.ts` (shared etymology).

## station/3/porte-de-bagnolet/etymology/en

Score: 0.96 → 0.84

- Before: Named for the Porte de Bagnolet, the gate of Paris next to the town of Bagnolet. A Line 2 station, opened as Rue de Bagnolet, was renamed Alexandre Dumas on 13 September 1970 to avoid confusion with this one.
- After: Named for the Porte de Bagnolet, the gate of Paris next to the town of Bagnolet. A Line 2 station named for Rue de Bagnolet was renamed Alexandre Dumas on 13 September 1970 to avoid confusion with this one.
- Reason: Fact. The cited source and the Alexandre Dumas article give the Line 2 station’s first name as Bagnolet, not Rue de Bagnolet. Only the Line 2 article says « Rue de Bagnolet ». The new text says the station was named for the street and does not give its first name. EN fell from 0.96 to 0.84 (0.845) and FR from 0.91 to 0.72; both are now in the edit band. See the summary.

## station/3/porte-de-bagnolet/etymology/fr

Score: 0.91 → 0.72

- Before: La station doit son nom à la porte de Bagnolet, qui jouxte la commune de Bagnolet. Une station de la ligne 2, ouverte sous le nom de Rue de Bagnolet, a été rebaptisée Alexandre Dumas le 13 septembre 1970 pour éviter toute confusion avec celle-ci.
- After: La station doit son nom à la porte de Bagnolet, qui jouxte la commune de Bagnolet. Une station de la ligne 2, nommée d’après la rue de Bagnolet, a été rebaptisée Alexandre Dumas le 13 septembre 1970 pour éviter toute confusion avec celle-ci.
- Reason: Fact. The cited source and the Alexandre Dumas article give the Line 2 station’s first name as Bagnolet, not Rue de Bagnolet. Only the Line 2 article says « Rue de Bagnolet ». The new text says the station was named for the street and does not give its first name. EN fell from 0.96 to 0.84 (0.845) and FR from 0.91 to 0.72; both are now in the edit band. See the summary.

## station/3/porte-de-champerret/etymology/en

Score: 0.94 → 0.93

- Before: Named for the Porte de Champerret, a gate in the city fortifications towards Champerret, a locality of Neuilly. One explanation is that Champerret was the field (champ) of Jean-Jacques Perret, who owned the land.
- After: Named for the Porte de Champerret, a gate in the city fortifications towards Champerret, a former locality of Neuilly. One explanation is that Champerret was the field (champ) of Jean-Jacques Perret, who owned the land.
- Reason: Fact. Champerret was a locality of Neuilly in the past; it has been in Levallois-Perret since 1867. Now “a former locality” / « un ancien lieu-dit ». FR stays in the ship band at 0.854 with the T7 tell it already had.

## station/3/porte-de-champerret/etymology/fr

Score: 0.86 → 0.85

- Before: La station doit son nom à la porte de Champerret, une porte de l’enceinte fortifiée en direction de Champerret, un lieu-dit de Neuilly. Une explication y voit le champ de Jean-Jacques Perret, propriétaire des terrains.
- After: La station doit son nom à la porte de Champerret, une porte de l’enceinte fortifiée en direction de Champerret, un ancien lieu-dit de Neuilly. Une explication y voit le champ de Jean-Jacques Perret, propriétaire des terrains.
- Reason: Fact. Champerret was a locality of Neuilly in the past; it has been in Levallois-Perret since 1867. Now “a former locality” / « un ancien lieu-dit ». FR stays in the ship band at 0.854 with the T7 tell it already had.

## station/3/louise-michel/context/en

Score: 0.92 → 0.93

- Before: The station opened on 24 September 1937 as Vallier, the name of the street above. On 1 May 1946 the station and the street were both renamed for Louise Michel. The station lies about 100 metres from the Paris city limit.
- After: The station opened on 24 September 1937 as Vallier, the name of the street it serves. On 1 May 1946 the station and the street were both renamed for Louise Michel. The station lies about 100 metres from the Paris city limit.
- Reason: Fact. EN only. The station is under Rue Anatole-France, not under Rue Vallier. EN now matches FR « celui de la rue qu’elle dessert ».

## station/3/reaumur-sebastopol/context/en

Score: 0.91 → 0.92

- Before: The Line 3 platforms opened on 19 November 1904; until then trains passed through without stopping. The two lines cross at right angles under the ticket hall, with Line 3 below Line 4. Just east of the station, a service track from Line 11 joins Line 3.
- After: The Line 3 platforms opened on 19 November 1904; until then trains passed through without stopping. Lines 3 and 4 cross at right angles under the ticket hall, with Line 3 below. Just east of the station, a service track from Line 11 joins Line 3.
- Reason: Readability. “The two lines” / « Les deux lignes » had no clear antecedent, because only Line 3 is named before it. Now “Lines 3 and 4 … with Line 3 below” / « Les lignes 3 et 4 … la ligne 3 en dessous ». No fact change.

## station/3/reaumur-sebastopol/context/fr

Score: 0.95 → 0.96

- Before: Les quais de la ligne 3 ouvrent le 19 novembre 1904 ; jusque-là, les rames passent sans s’arrêter. Les deux lignes se croisent à angle droit sous la salle d’échanges, la ligne 3 sous la ligne 4. Juste à l’est, un raccordement venant de la ligne 11 rejoint la ligne 3.
- After: Les quais de la ligne 3 ouvrent le 19 novembre 1904 ; jusque-là, les rames passent sans s’arrêter. Les lignes 3 et 4 se croisent à angle droit sous la salle d’échanges, la ligne 3 en dessous. Juste à l’est, un raccordement venant de la ligne 11 rejoint la ligne 3.
- Reason: Readability. “The two lines” / « Les deux lignes » had no clear antecedent, because only Line 3 is named before it. Now “Lines 3 and 4 … with Line 3 below” / « Les lignes 3 et 4 … la ligne 3 en dessous ». No fact change.

## line/3/summary/en

Score: 0.98 → 0.98

- Before: Line 3 runs from Pont de Levallois – Bécon to Gallieni and has 25 stations, all on the Right Bank. Several names recall the proclamation of the Third Republic in 1870, such as Quatre-Septembre and Gambetta. Its first section opened in 1904.
- After: Line 3 runs from Pont de Levallois – Bécon to Gallieni and has 25 stations, all on the Right Bank. Two names recall the proclamation of the Third Republic on 4 September 1870: Quatre-Septembre, for the date, and Gambetta, for the man who made it. Its first section opened in 1904.
- Reason: Parity and precision. “Several names … such as” / « Plusieurs noms … comme » listed only two names. Now “Two names”, with the date 4 September 1870 and what each name recalls. No other change.

## line/3/summary/fr

Score: 0.98 → 0.98

- Before: La ligne 3 relie Pont de Levallois – Bécon à Gallieni et compte 25 stations, toutes sur la rive droite. Plusieurs noms rappellent la proclamation de la Troisième République en 1870, comme Quatre-Septembre et Gambetta. Son premier tronçon ouvre en 1904.
- After: La ligne 3 relie Pont de Levallois – Bécon à Gallieni et compte 25 stations, toutes sur la rive droite. Deux noms rappellent la proclamation de la Troisième République le 4 septembre 1870 : Quatre-Septembre, pour la date, et Gambetta, pour l’homme qui l’a prononcée. Son premier tronçon ouvre en 1904.
- Reason: Parity and precision. “Several names … such as” / « Plusieurs noms … comme » listed only two names. Now “Two names”, with the date 4 September 1870 and what each name recalls. No other change.

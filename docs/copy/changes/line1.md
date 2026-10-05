# Line 1 copy changes

File: `apps/web/src/data/line1.ts`. Evaluator runs: `apps/web/scripts/copy/out/line1-before/`, `apps/web/scripts/copy/out/line1-after/` (stations) and `apps/web/scripts/copy/out/line1-after-line/` (line copy).

Rule used for opening years: the station page shows `station.opened` on its own line (`app.ts`, "opening-year"). A context sentence that only repeats that year ("The station opened in 1900.") is a duplicate, and some were removed for that reason. Exact dates (day and month) were kept.

Typography for all FR strings: U+202F before ; and U+00A0 before : and inside « ». EN: curly ’ and “ ”.

## station/1/la-defense/etymology/en

- Before (0.87 ship): Called La Défense after the business district on the western edge of Paris. The station opened in 1992 as Grande Arche de La Défense, named for the district's landmark arch.
- After (0.92 ship): Called La Défense after the business district on the western edge of Paris. The station opened in 1992 as Grande Arche de La Défense, named for the district’s landmark arch.
- Reason: FR: removed puffery « emblématique » (T1). EN: typography only.

## station/1/la-defense/etymology/fr

- Before (0.81 edit): La station doit son nom au quartier d’affaires situé à l’ouest de Paris. Elle ouvre en 1992 sous le nom de Grande Arche de La Défense, d’après l’arche emblématique du quartier.
- After (0.93 ship): La station doit son nom au quartier d’affaires situé à l’ouest de Paris. Elle ouvre en 1992 sous le nom de Grande Arche de La Défense, du nom de l’arche du quartier.
- Reason: FR: removed puffery « emblématique » (T1). EN: typography only.

## station/1/la-defense/context/en

- Before (0.83 edit): The station was renamed simply La Défense in 1997, to match the adjoining RER station of that name. It remains Line 1's western terminus, beside the district's business towers.
- After (0.97 ship): In 1997 the station took the shorter name La Défense, to match the adjoining RER station. It is Line 1’s western terminus, beside the district’s business towers.
- Reason: Removed persistence filler ("remains", « demeure ») and "simply"; new opener to break the « La station est » template. "of that name" / « du même nom » dropped as duplicate of "La Défense".

## station/1/la-defense/context/fr

- Before (0.94 ship): La station est rebaptisée simplement La Défense en 1997, pour correspondre à la station RER voisine du même nom. Elle demeure le terminus ouest de la ligne 1, au pied des tours du quartier d’affaires.
- After (0.97 ship): En 1997, la station prend le nom plus court de La Défense, pour correspondre à la station RER voisine. Elle est le terminus ouest de la ligne 1, au pied des tours du quartier d’affaires.
- Reason: Removed persistence filler ("remains", « demeure ») and "simply"; new opener to break the « La station est » template. "of that name" / « du même nom » dropped as duplicate of "La Défense".

## station/1/esplanade-de-la-defense/etymology/en

- Before (0.83 edit): Called Esplanade de La Défense for its position on the east side of the district's esplanade. Its project name during construction was Puteaux – Courbevoie, after the two communes it serves.
- After (0.91 ship): Called Esplanade de La Défense for its position on the east side of the esplanade in the La Défense business district. During construction its project name was Puteaux – Courbevoie, after the two communes it serves.
- Reason: Named the La Défense business district so the full station name is explained (S1); FR « d’après les deux communes » replaced by « du nom des deux communes qu’elle dessert ».

## station/1/esplanade-de-la-defense/etymology/fr

- Before (0.93 ship): La station doit son nom à sa position sur le côté est de l’esplanade du quartier. Son nom de projet, pendant la construction, était Puteaux – Courbevoie, d’après les deux communes desservies.
- After (0.93 ship): La station doit son nom à sa position sur le côté est de l’esplanade du quartier d’affaires de La Défense. Pendant la construction, son nom de projet était Puteaux – Courbevoie, du nom des deux communes qu’elle dessert.
- Reason: Named the La Défense business district so the full station name is explained (S1); FR « d’après les deux communes » replaced by « du nom des deux communes qu’elle dessert ».

## station/1/esplanade-de-la-defense/context/en

- Before (0.85 edit): The station opened in 1992. It encroaches on the A14 motorway tunnel, which loses a traffic lane in each direction as a result; that constraint explains its single, narrow island platform.
- After (0.97 ship): The station has a single, narrow island platform because it encroaches on the A14 motorway tunnel. The tunnel loses a traffic lane in each direction as a result.
- Reason: Split a chained sentence (S5) and removed the « ouvre en 1992 » template opener. The opening year is removed as duplicated: the page shows it on the "opened" line (station.opened = 1992).

## station/1/esplanade-de-la-defense/context/fr

- Before (0.86 ship): La station ouvre en 1992. Elle empiète sur le tunnel de l’autoroute A14, qui y perd une voie dans chaque sens ; cette contrainte explique son quai unique, étroit et central.
- After (0.98 ship): La station n’a qu’un quai central étroit, car elle empiète sur le tunnel de l’autoroute A14. Le tunnel y perd une voie de circulation dans chaque sens.
- Reason: Split a chained sentence (S5) and removed the « ouvre en 1992 » template opener. The opening year is removed as duplicated: the page shows it on the "opened" line (station.opened = 1992).

## station/1/pont-de-neuilly/context/en

- Before (0.89 ship): The station opened in 1937 as the line's western terminus. From 1940 to 1950 it briefly carried the extended name Pont de Neuilly – Avenue de Madrid, before reverting to its shorter form.
- After (0.99 ship): The station opened in 1937 as the line’s western terminus. From 1940 to 1950 it briefly carried the extended name Pont de Neuilly – Avenue de Madrid, before reverting to its shorter form.
- Reason: Typography only.

## station/1/les-sablons/context/en

- Before (0.85 ship): The station opened in 1937. Former government minister Jacques Barrot died here suddenly on 3 December 2014, after collapsing on the platform.
- After (0.90 ship): On 3 December 2014, former government minister Jacques Barrot collapsed on the platform of this station and died suddenly.
- Reason: Removed template opener « La station ouvre en 1937 » (T20); the year is duplicated by the page's opening-year line (station.opened = 1937).

## station/1/les-sablons/context/fr

- Before (0.84 edit): La station ouvre en 1937. L’ancien ministre Jacques Barrot y meurt subitement le 3 décembre 2014, après s’être effondré sur le quai.
- After (0.89 ship): Le 3 décembre 2014, l’ancien ministre Jacques Barrot s’effondre sur le quai de cette station et meurt subitement.
- Reason: Removed template opener « La station ouvre en 1937 » (T20); the year is duplicated by the page's opening-year line (station.opened = 1937).

## station/1/porte-maillot/etymology/fr

- Before (0.81 edit): La station doit son nom à la porte Maillot, ancienne porte de l’enceinte du Bois de Boulogne bâtie sous Henri II. Le mot « Maillot » reste incertain : peut-être un ancien jeu de mail, ou plus spéculativement la révolte des Maillotins de 1382.
- After (0.92 ship): La station doit son nom à la porte Maillot, ancienne porte de l’enceinte du Bois de Boulogne bâtie sous Henri II. L’origine du mot « Maillot » est incertaine : peut-être un ancien jeu de mail, ou plus spéculativement la révolte des Maillotins de 1382.
- Reason: FR: removed persistence word « reste » (the word Maillot "reste incertain" → « L’origine du mot … est incertaine », matching EN "origin … is uncertain"); typography.

## station/1/porte-maillot/context/en

- Before (0.60 rewrite): Porte Maillot opened as a loop terminus on 19 July 1900, on the line's first day. A new station about 100 metres away replaced it for the 1937 extension to Pont de Neuilly; the English line article dates the new terminus to November 1936.
- After (0.94 ship): Porte Maillot opened as a loop terminus on 19 July 1900, the line’s first day. In 1936 or 1937, a new station about 100 metres away replaced it, for the extension to Pont de Neuilly.
- Reason: Removed source self-reference (T17 "English line article" / « l’article anglais »). The two sources disagree (FR station article: 1937; EN line article: 15 November 1936), so per R6 both locales now give the broader date "1936 or 1937". FR now also gives 19 July 1900 / first day, which was only in EN (fact drift). Sentence under 25 words. Source: https://fr.wikipedia.org/wiki/Porte_Maillot_(m%C3%A9tro_de_Paris) (« ouvert le 19 juillet 1900 », « En 1937, la station est déplacée … à une centaine de mètres ») and https://en.wikipedia.org/wiki/Paris_M%C3%A9tro_Line_1 (November 1936).

## station/1/porte-maillot/context/fr

- Before (0.59 rewrite): Porte Maillot ouvre en 1900 comme terminus en boucle, dès le premier jour de la ligne. Une nouvelle station, à une centaine de mètres, la remplace lors du prolongement de 1937 vers Pont de Neuilly ; l’article anglais situe ce nouveau terminus dès novembre 1936.
- After (0.93 ship): Porte Maillot ouvre le 19 juillet 1900, premier jour de la ligne, comme terminus en boucle. En 1936 ou 1937, une nouvelle station, à une centaine de mètres, la remplace pour le prolongement vers Pont de Neuilly.
- Reason: Removed source self-reference (T17 "English line article" / « l’article anglais »). The two sources disagree (FR station article: 1937; EN line article: 15 November 1936), so per R6 both locales now give the broader date "1936 or 1937". FR now also gives 19 July 1900 / first day, which was only in EN (fact drift). Sentence under 25 words. Source: https://fr.wikipedia.org/wiki/Porte_Maillot_(m%C3%A9tro_de_Paris) (« ouvert le 19 juillet 1900 », « En 1937, la station est déplacée … à une centaine de mètres ») and https://en.wikipedia.org/wiki/Paris_M%C3%A9tro_Line_1 (November 1936).

## station/1/argentine/etymology/en

- Before (0.83 edit): Named for Rue d'Argentine; the street and the station both took this name in 1948. They were previously called Obligado, after an 1845 Franco-British naval victory over Argentine forces.
- After (0.96 ship): Called Argentine after Rue d’Argentine, named for the country. The street and the station took this name together in 1948. Both were previously called Obligado, after an 1845 Franco-British naval victory over Argentine forces.
- Reason: R2 opening ("Called Argentine after Rue d’Argentine" / « La station doit son nom à la rue d’Argentine ») and a complete naming chain (S1).

## station/1/argentine/etymology/fr

- Before (0.82 edit): La station porte le nom d’Argentine, celui de la rue voisine, rebaptisée en 1948 en même temps que la station. Elle remplace l’ancien nom Obligado, qui rappelait une victoire navale franco-britannique de 1845 sur les forces argentines.
- After (0.97 ship): La station doit son nom à la rue d’Argentine, qui porte le nom du pays. La rue et la station prennent ce nom ensemble en 1948. Elles s’appelaient auparavant Obligado, en souvenir d’une victoire navale franco-britannique de 1845 sur les forces argentines.
- Reason: R2 opening ("Called Argentine after Rue d’Argentine" / « La station doit son nom à la rue d’Argentine ») and a complete naming chain (S1).

## station/1/argentine/context/en

- Before (0.74 edit): The 1948 renaming followed Eva Perón's 1947 visit to France and thanked Argentina for generous food aid in the early postwar years. Opened in 1900, the station received a 2006 plaque, "Nunca más", honouring the disappeared of Argentina's 1976 to 1983 dictatorship.
- After (0.89 ship): The 1948 renaming followed Eva Perón’s 1947 visit to France and thanked Argentina for generous food aid in the early postwar years. In 2006 the station received a plaque reading “Nunca más”, in memory of the disappeared of Argentina’s 1976 to 1983 dictatorship.
- Reason: Removed "-ing" tail clause ("honouring…"), curly quotes, split FR sentence. "Opened in 1900" / « Ouverte en 1900 » removed as duplicated by the page's opening-year line (station.opened = 1900).

## station/1/argentine/context/fr

- Before (0.79 edit): Le changement de nom de 1948 suit la visite d’Eva Perón en France en 1947 et remercie l’Argentine pour son aide alimentaire généreuse de l’après-guerre. Ouverte en 1900, la station reçoit en 2006 une plaque « Nunca más », dédiée aux disparus de la dictature argentine de 1976 à 1983.
- After (0.85 ship): Le changement de nom de 1948 suit la visite d’Eva Perón en France, en 1947. Le nouveau nom remercie l’Argentine pour son aide alimentaire généreuse au début de l’après-guerre. En 2006, la station reçoit une plaque « Nunca más », à la mémoire des disparus de la dictature argentine de 1976 à 1983.
- Reason: Removed "-ing" tail clause ("honouring…"), curly quotes, split FR sentence. "Opened in 1900" / « Ouverte en 1900 » removed as duplicated by the page's opening-year line (station.opened = 1900).

## station/1/charles-de-gaulle-etoile/etymology/fr

- Before (0.79 edit): La station porte le nom d’Étoile en raison du carrefour en étoile des avenues qui s’y rencontrent, un nom antérieur de plusieurs décennies à Charles de Gaulle. Son nom est ajouté le 30 novembre 1970, trois semaines après sa mort.
- After (0.89 ship): La station doit son nom d’Étoile au carrefour en étoile formé par les avenues de la place. Ce nom précède de plusieurs décennies celui de Charles de Gaulle, ajouté le 30 novembre 1970, trois semaines après sa mort.
- Reason: FR: R2 opening and split a 27-word sentence. EN unchanged.

## station/1/charles-de-gaulle-etoile/context/en

- Before (0.87 ship): Line 1's Étoile platforms opened on 1 September 1900, more than a month after the line's first section. Line 6 ends here on a loop beneath the square, with a narrow platform for passengers getting off and a wider one for boarding.
- After (0.97 ship): Line 1’s Étoile platforms opened on 1 September 1900, after the line’s first section had opened on 19 July. Line 6 ends here on a loop beneath the square, with a narrow platform for passengers getting off and a wider one for boarding.
- Reason: "more than a month after" (negParallel flag) replaced with the first section's opening date, 19 July (1900), which is in the line sources. Source: https://en.wikipedia.org/wiki/Paris_M%C3%A9tro_Line_1 and https://fr.wikipedia.org/wiki/Ligne_1_du_m%C3%A9tro_de_Paris (line opened 19 July 1900).

## station/1/charles-de-gaulle-etoile/context/fr

- Before (0.92 ship): Les quais de la ligne 1 à Étoile ouvrent le 1er septembre 1900, plus d’un mois après la première section de la ligne. La ligne 6 se termine ici en boucle sous la place, avec un quai étroit pour la descente et un plus large pour la montée.
- After (0.97 ship): Les quais de la ligne 1 à Étoile ouvrent le 1er septembre 1900, après l’ouverture de la première section de la ligne le 19 juillet. La ligne 6 se termine ici en boucle sous la place, avec un quai étroit pour la descente et un plus large pour la montée.
- Reason: "more than a month after" (negParallel flag) replaced with the first section's opening date, 19 July (1900), which is in the line sources. Source: https://en.wikipedia.org/wiki/Paris_M%C3%A9tro_Line_1 and https://fr.wikipedia.org/wiki/Ligne_1_du_m%C3%A9tro_de_Paris (line opened 19 July 1900).

## station/1/george-v/etymology/en

- Before (0.86 ship): Named George V after Avenue de l'Alma, renamed for the British king on 14 July 1918 in honour of a wartime ally; the station itself adopted the new name only in 1920, after the avenue.
- After (0.97 ship): Called George V after the avenue of that name, formerly Avenue de l’Alma. The avenue was renamed for the British king on 14 July 1918, in honour of a wartime ally. The station took the new name only in 1920.
- Reason: Split a 38-word FR sentence and a 35-word EN sentence; R2 opening in both; naming chain station → avenue → king.

## station/1/george-v/etymology/fr

- Before (0.76 edit): La station porte le nom de George V d’après l’avenue de l’Alma, rebaptisée en l’honneur du roi britannique le 14 juillet 1918, en hommage à un allié de guerre ; la station n’adopte ce nom qu’en 1920, après l’avenue.
- After (0.95 ship): La station doit son nom à l’avenue George-V, l’ancienne avenue de l’Alma. L’avenue est rebaptisée le 14 juillet 1918 en l’honneur du roi britannique, allié de guerre. La station ne prend ce nom qu’en 1920.
- Reason: Split a 38-word FR sentence and a 35-word EN sentence; R2 opening in both; naming chain station → avenue → king.

## station/1/george-v/context/en

- Before (0.68 edit): Opened 13 August 1900 as Alma, after the 1854 Crimean War battle. According to its French Wikipedia article, it is one of only two Paris stations named for a person during that person's lifetime, with Montparnasse – Bienvenüe.
- After (0.89 ship): At its opening on 13 August 1900, the station was called Alma, after the 1854 battle of the Crimean War. It may be one of only two Paris stations to take a person’s name during that person’s lifetime; the other is Montparnasse – Bienvenüe.
- Reason: Removed source self-reference (T17 "According to its French Wikipedia article" / « Selon son article Wikipédia en français »). The claim has one source only (docs/research/line1.md), so the qualifier is kept as a modal hedge: EN "may be", FR « serait ». FR « nommées d’après » calque removed. Source: https://fr.wikipedia.org/wiki/George_V_(m%C3%A9tro_de_Paris) (« il s’agit ainsi d’une des deux seules station du métro de Paris à avoir pris le nom d’une personnalité de son vivant »).

## station/1/george-v/context/fr

- Before (0.68 edit): Ouverte le 13 août 1900 sous le nom d’Alma, en référence à la bataille de Crimée de 1854. Selon son article Wikipédia en français, c’est l’une des deux seules stations parisiennes nommées d’après une personne de son vivant, avec Montparnasse – Bienvenüe.
- After (0.84 edit): À son ouverture, le 13 août 1900, la station s’appelle Alma, en souvenir de la bataille de 1854 pendant la guerre de Crimée. Elle serait l’une des deux seules stations parisiennes à prendre le nom d’une personne de son vivant ; l’autre est Montparnasse – Bienvenüe.
- Reason: Removed source self-reference (T17 "According to its French Wikipedia article" / « Selon son article Wikipédia en français »). The claim has one source only (docs/research/line1.md), so the qualifier is kept as a modal hedge: EN "may be", FR « serait ». FR « nommées d’après » calque removed. Source: https://fr.wikipedia.org/wiki/George_V_(m%C3%A9tro_de_Paris) (« il s’agit ainsi d’une des deux seules station du métro de Paris à avoir pris le nom d’une personnalité de son vivant »).

## station/1/franklin-d-roosevelt/etymology/en

- Before (0.86 ship): Named Franklin D. Roosevelt on 30 October 1946, after Avenue Victor-Emmanuel-III was renamed for the wartime American president. The change honoured an allied leader in place of the king of an enemy country.
- After (0.93 ship): Called Franklin D. Roosevelt after Avenue Franklin-D.-Roosevelt, formerly Avenue Victor-Emmanuel-III, renamed for the wartime American president. The station took the name on 30 October 1946. The new name honoured an allied leader in place of the king of Italy, an enemy country.
- Reason: R2 opening in both locales (FR opened with « La station prend le nom »); split 38-word FR sentence. Named the avenue (Avenue Franklin-D.-Roosevelt) and the enemy king's country (Italy) in both locales. Source: https://fr.wikipedia.org/wiki/Franklin_D._Roosevelt_(m%C3%A9tro_de_Paris) (« changement de nom de l’avenue Victor-Emmanuel III au profit d’avenue Franklin-D.-Roosevelt … remplaçant celui d’un pays ennemi (l’Italie) »).

## station/1/franklin-d-roosevelt/etymology/fr

- Before (0.82 edit): La station prend le nom de Franklin D. Roosevelt le 30 octobre 1946, après le changement de nom de l’avenue Victor-Emmanuel-III en l’honneur du président américain, allié pendant la guerre, à la place du roi d’un pays ennemi.
- After (0.94 ship): La station doit son nom à l’avenue Franklin-D.-Roosevelt, l’ancienne avenue Victor-Emmanuel-III, rebaptisée en l’honneur du président américain pendant la guerre. La station prend ce nom le 30 octobre 1946. Le nouveau nom honore un dirigeant allié à la place du roi d’Italie, pays ennemi.
- Reason: R2 opening in both locales (FR opened with « La station prend le nom »); split 38-word FR sentence. Named the avenue (Avenue Franklin-D.-Roosevelt) and the enemy king's country (Italy) in both locales. Source: https://fr.wikipedia.org/wiki/Franklin_D._Roosevelt_(m%C3%A9tro_de_Paris) (« changement de nom de l’avenue Victor-Emmanuel III au profit d’avenue Franklin-D.-Roosevelt … remplaçant celui d’un pays ennemi (l’Italie) »).

## station/1/franklin-d-roosevelt/context/en

- Before (0.73 edit): Opened in 1900 as Marbeuf, after Rue Marbeuf and the former Marbeuf garden. It became Marbeuf – Rond-Point des Champs-Élysées on 6 October 1942, when a passage joined it to the Line 9 station; the earlier royal name never applied to the station itself.
- After (0.97 ship): The station’s first name, in 1900, was Marbeuf, after Rue Marbeuf and the former Marbeuf garden. On 6 October 1942 a passage joined it to the Line 9 station, and it became Marbeuf – Rond-Point des Champs-Élysées. Victor-Emmanuel III’s name never applied to the station itself.
- Reason: Split a 48-word FR sentence (S5), removed « , d’après la rue » calque and the « Ouverte en » template opener. "the earlier royal name" made explicit as Victor-Emmanuel III's name (same fact, named).

## station/1/franklin-d-roosevelt/context/fr

- Before (0.55 rewrite): Ouverte en 1900 sous le nom de Marbeuf, d’après la rue et l’ancien jardin du même nom, elle devient Marbeuf – Rond-Point des Champs-Élysées le 6 octobre 1942, quand un passage la relie à la station de la ligne 9 ; l’ancien nom royal n’a jamais désigné la station elle-même.
- After (0.97 ship): Le premier nom de la station, en 1900, est Marbeuf, comme la rue et l’ancien jardin voisins. Le 6 octobre 1942, un passage la relie à la station de la ligne 9, et elle devient Marbeuf – Rond-Point des Champs-Élysées. Le nom de Victor-Emmanuel III n’a jamais désigné la station elle-même.
- Reason: Split a 48-word FR sentence (S5), removed « , d’après la rue » calque and the « Ouverte en » template opener. "the earlier royal name" made explicit as Victor-Emmanuel III's name (same fact, named).

## station/1/concorde/etymology/en

- Before (0.66 edit): Named for the Place de la Concorde. The square's own name was reportedly chosen by the Directoire to mark reconciliation after the Terror, though the station's own article hedges that account as unconfirmed.
- After (0.84 edit): Called Concorde after the Place de la Concorde, the largest square in Paris. The Directoire may have chosen this name to mark the reconciliation of the French after the Terror.
- Reason: Removed source self-reference (T17) and the duplicated hedge ("reportedly … though the article hedges that account as unconfirmed" = one hedge stated twice). The single hedge stays: EN "may have chosen", FR « aurait choisi ». Added "the largest square in Paris" and "of the French" from the source. Source: https://fr.wikipedia.org/wiki/Concorde_(m%C3%A9tro_de_Paris) (« place de la Concorde, plus grande place de Paris, dont le nom aurait été choisi par le Directoire afin de marquer la réconciliation des Français après les excès de la Terreur »).

## station/1/concorde/etymology/fr

- Before (0.60 rewrite): La station doit son nom à la place de la Concorde. Son propre article indique que ce nom aurait été choisi par le Directoire pour marquer la réconciliation après la Terreur, une version que l’article lui-même présente avec prudence.
- After (0.85 ship): La station doit son nom à la place de la Concorde, la plus grande place de Paris. Le Directoire aurait choisi ce nom pour marquer la réconciliation des Français après la Terreur.
- Reason: Removed source self-reference (T17) and the duplicated hedge ("reportedly … though the article hedges that account as unconfirmed" = one hedge stated twice). The single hedge stays: EN "may have chosen", FR « aurait choisi ». Added "the largest square in Paris" and "of the French" from the source. Source: https://fr.wikipedia.org/wiki/Concorde_(m%C3%A9tro_de_Paris) (« place de la Concorde, plus grande place de Paris, dont le nom aurait été choisi par le Directoire afin de marquer la réconciliation des Français après les excès de la Terreur »).

## station/1/concorde/context/en

- Before (0.79 edit): Opened 13 August 1900. Its Line 1 platforms were redone in the Andreu-Motte style, in Tyrian pink, between 1976 and 1979; the connecting Line 12 platforms carry separate tilework quoting the Declaration of the Rights of Man.
- After (0.90 ship): Between 1976 and 1979, the Line 1 platforms, open since 13 August 1900, were redone in the Andreu-Motte style in Tyrian pink. The connecting Line 12 platforms carry separate tilework quoting the Declaration of the Rights of Man.
- Reason: Removed the « Ouverte le » / "Opened" fragment opener, split a 38-word FR sentence, FR « rose Tyrien » → « rose tyrien » (adjective).

## station/1/concorde/context/fr

- Before (0.72 edit): Ouverte le 13 août 1900. Ses quais de la ligne 1 sont refaits dans le style Andreu-Motte, en rose Tyrien, entre 1976 et 1979 ; les quais de correspondance de la ligne 12 portent un décor distinct citant la Déclaration des droits de l’homme.
- After (0.94 ship): Entre 1976 et 1979, les quais de la ligne 1, ouverts le 13 août 1900, sont refaits dans le style Andreu-Motte, en rose tyrien. Les quais de la ligne 12, en correspondance, portent un décor distinct qui cite la Déclaration des droits de l’homme.
- Reason: Removed the « Ouverte le » / "Opened" fragment opener, split a 38-word FR sentence, FR « rose Tyrien » → « rose tyrien » (adjective).

## station/1/tuileries/etymology/en

- Before (0.76 edit): Named for the adjoining Jardin des Tuileries, itself named for the tile factories, or tuileries, that once stood on the site before the garden was laid out.
- After (0.95 ship): Called Tuileries after the adjoining Jardin des Tuileries. The garden takes its name from the tile factories, or tuileries, that stood on the site before it was laid out.
- Reason: R2 opening, split long sentence, removed FR calque « nommé d’après ».

## station/1/tuileries/etymology/fr

- Before (0.68 edit): La station doit son nom au jardin des Tuileries voisin, lui-même nommé d’après les fabriques de tuiles, les tuileries, qui occupaient autrefois ce terrain avant l’aménagement du jardin.
- After (0.96 ship): La station doit son nom au jardin des Tuileries voisin. Le jardin tire son nom des fabriques de tuiles, les tuileries, installées sur ce terrain avant son aménagement.
- Reason: R2 opening, split long sentence, removed FR calque « nommé d’après ».

## station/1/tuileries/context/en

- Before (0.86 ship): Opened in 1900. Platforms were lengthened from 75 to 90 metres between 1963 and 1964, to accommodate the six-car MP 59 trains introduced on the line during that period.
- After (0.97 ship): Between 1963 and 1964 the platforms were lengthened from 75 to 90 metres. The work made room for the six-car MP 59 trains introduced on the line at that time.
- Reason: Removed "Opened in 1900." / « Ouverte en 1900. » fragment opener (T20); duplicated by the page's opening-year line (station.opened = 1900). Split 27-word FR sentence.

## station/1/tuileries/context/fr

- Before (0.85 edit): Ouverte en 1900. Les quais sont allongés de 75 à 90 mètres entre 1963 et 1964, afin d’accueillir les rames MP 59 à six voitures alors introduites sur la ligne.
- After (0.96 ship): Entre 1963 et 1964, les quais passent de 75 à 90 mètres. Cet allongement permet d’accueillir les rames MP 59 à six voitures, introduites sur la ligne à cette époque.
- Reason: Removed "Opened in 1900." / « Ouverte en 1900. » fragment opener (T20); duplicated by the page's opening-year line (station.opened = 1900). Split 27-word FR sentence.

## station/1/palais-royal-musee-du-louvre/etymology/en

- Before (0.79 edit): Named Palais-Royal for the adjoining former royal residence. Musée du Louvre was added in 1989, marking the museum's new entrance by the Pyramid.
- After (0.87 ship): Called Palais-Royal after the adjoining former royal residence. Musée du Louvre was added in 1989 to signal the museum’s new entrance by the Pyramid.
- Reason: Removed "-ing" tail clause ("marking…"); now "to signal", matching FR « pour signaler ».

## station/1/palais-royal-musee-du-louvre/context/en

- Before (0.80 edit): Opened in 1900. One entrance, at place Colette, is crowned by Jean-Michel Othoniel's Kiosque des Noctambules, two cupolas of Murano glass beads made for the Métro's centenary and inaugurated in October 2000.
- After (0.97 ship): One entrance, on Place Colette, is topped by Jean-Michel Othoniel’s Kiosque des Noctambules: two cupolas of Murano glass beads made for the Métro’s centenary. The kiosk was inaugurated in October 2000.
- Reason: Removed "Opened in 1900." fragment opener (duplicated by the opening-year line), "crowned" → "topped" (literal), split long sentence, "place Colette" → "Place Colette" (EN street case).

## station/1/palais-royal-musee-du-louvre/context/fr

- Before (0.84 edit): Ouverte en 1900. L’une de ses entrées, place Colette, est surmontée du Kiosque des Noctambules de Jean-Michel Othoniel, deux coupoles de perles de verre de Murano réalisées pour le centenaire du métro et inaugurées en octobre 2000.
- After (0.92 ship): Place Colette, une entrée de la station est surmontée du Kiosque des Noctambules de Jean-Michel Othoniel : deux coupoles de perles de verre de Murano réalisées pour le centenaire du métro. Le kiosque est inauguré en octobre 2000.
- Reason: Removed "Opened in 1900." fragment opener (duplicated by the opening-year line), "crowned" → "topped" (literal), split long sentence, "place Colette" → "Place Colette" (EN street case).

## station/1/louvre-rivoli/etymology/en

- Before (0.67 edit): Named for the Louvre and Rue de Rivoli. It opened in 1900 as plain Louvre, after Rue du Louvre and the museum's old colonnade entrance; in 1989 the museum's name passed to Palais-Royal, and Rivoli was added here.
- After (0.93 ship): Called Louvre – Rivoli after the Louvre and Rue de Rivoli. It opened in 1900 as plain Louvre, after Rue du Louvre and the museum’s old colonnade entrance. In 1989 the museum’s name passed to Palais-Royal, and Rivoli was added here.
- Reason: R2 opening in EN, split long sentences, removed FR « , d’après la rue » calque. FR now names the colonnade entrance, as EN does (parity; docs/research/line1.md: "the old museum entrance by the colonnade").

## station/1/louvre-rivoli/etymology/fr

- Before (0.73 edit): La station doit son nom au Louvre et à la rue de Rivoli. Ouverte en 1900 sous le nom de Louvre, d’après la rue du Louvre et l’ancienne entrée du musée, elle devient Louvre – Rivoli en 1989, quand le nom du musée passe à Palais-Royal.
- After (0.93 ship): La station doit son nom au Louvre et à la rue de Rivoli. Elle ouvre en 1900 sous le nom de Louvre, pour la rue du Louvre et l’ancienne entrée du musée, côté colonnade. En 1989, Palais-Royal reçoit le nom du musée et Rivoli s’ajoute.
- Reason: R2 opening in EN, split long sentences, removed FR « , d’après la rue » calque. FR now names the colonnade entrance, as EN does (parity; docs/research/line1.md: "the old museum entrance by the colonnade").

## station/1/louvre-rivoli/context/en

- Before (0.84 edit): Rue de Rivoli itself commemorates Bonaparte's 1797 victory over Austria at Rivoli. The station received museum-style decor, including copied artworks and historical plans, in September 1968, under Minister of Culture André Malraux.
- After (0.90 ship): Rue de Rivoli itself commemorates Bonaparte’s 1797 victory over Austria at Rivoli. The station received museum-style decor, including copied artworks and historical plans, in September 1968, under Minister of Culture André Malraux.
- Reason: Typography only.

## station/1/chatelet/etymology/en

- Before (0.77 edit): Called Châtelet after Place du Châtelet, laid out on the site of the Grand Châtelet. This vanished fortress served as a court and prison before its demolition in the early nineteenth century.
- After (0.92 ship): Called Châtelet after Place du Châtelet, laid out on the site of the Grand Châtelet. This fortress was a court and prison before its demolition in the early nineteenth century.
- Reason: "served as" / « a servi de » → "was" / « était » (T8); dropped "vanished" / « disparue » (duplicates "demolition").

## station/1/chatelet/etymology/fr

- Before (0.94 ship): La station doit son nom à la place du Châtelet, aménagée à l’emplacement du Grand Châtelet. Cette forteresse disparue a servi de tribunal et de prison avant sa démolition au début du XIXe siècle.
- After (0.94 ship): La station doit son nom à la place du Châtelet, aménagée à l’emplacement du Grand Châtelet. Cette forteresse était un tribunal et une prison avant sa démolition au début du XIXe siècle.
- Reason: "served as" / « a servi de » → "was" / « était » (T8); dropped "vanished" / « disparue » (duplicates "demolition").

## station/1/chatelet/context/en

- Before (0.86 ship): Line 1's own platforms here opened on 6 August 1900, after trains had passed through the unfinished station without stopping for several weeks following the line's opening day.
- After (0.93 ship): For several weeks after the line’s opening day, trains passed through the unfinished station without stopping. Line 1’s platforms here opened on 6 August 1900.
- Reason: Split a 33-word FR sentence and reordered to avoid the « Les quais de la ligne 1 » template opener.

## station/1/chatelet/context/fr

- Before (0.82 edit): Les quais de la ligne 1 ouvrent ici le 6 août 1900, après plusieurs semaines pendant lesquelles les trains traversaient la station inachevée sans s’y arrêter, depuis le jour d’ouverture de la ligne.
- After (0.95 ship): Pendant plusieurs semaines après l’ouverture de la ligne, les trains traversent la station inachevée sans s’y arrêter. Les quais de la ligne 1 n’ouvrent que le 6 août 1900.
- Reason: Split a 33-word FR sentence and reordered to avoid the « Les quais de la ligne 1 » template opener.

## station/1/hotel-de-ville/etymology/en

- Before (0.65 rewrite): Named for the adjoining Paris city hall and the square of the same name. The building has served as the seat of Paris's municipal institutions since 1357, according to the station's own article.
- After (0.95 ship): Called Hôtel de Ville after the adjoining Paris city hall and the square of the same name. The city hall has housed the municipal institutions of Paris since 1357.
- Reason: Removed source self-reference (T17 "according to the station's own article" / « selon son propre article ») and "served as" (T8). The station article states the fact without hedging. Source: https://fr.wikipedia.org/wiki/H%C3%B4tel_de_Ville_(m%C3%A9tro_de_Paris) (« l’hôtel de ville de Paris, lequel héberge les institutions municipales de Paris depuis 1357 »).

## station/1/hotel-de-ville/etymology/fr

- Before (0.90 ship): La station doit son nom à l’Hôtel de Ville de Paris, qu’elle dessert, et à la place du même nom. Le bâtiment abrite le siège des institutions municipales parisiennes depuis 1357, selon son propre article.
- After (0.98 ship): La station doit son nom à l’Hôtel de Ville de Paris, qu’elle dessert, et à la place du même nom. L’Hôtel de Ville abrite les institutions municipales parisiennes depuis 1357.
- Reason: Removed source self-reference (T17 "according to the station's own article" / « selon son propre article ») and "served as" (T8). The station article states the fact without hedging. Source: https://fr.wikipedia.org/wiki/H%C3%B4tel_de_Ville_(m%C3%A9tro_de_Paris) (« l’hôtel de ville de Paris, lequel héberge les institutions municipales de Paris depuis 1357 »).

## station/1/hotel-de-ville/context/en

- Before (0.74 edit): The station opened in 1900. Since 1994, a plaque near the entrance to the Line 1 platforms has marked the fiftieth anniversary of the strike by 3,000 employees of the Paris Métro company on 16 August 1944.
- After (0.94 ship): On 16 August 1944, 3,000 employees of the Paris Métro company went on strike. Since 1994, a plaque near the entrance to the Line 1 platforms has marked the fiftieth anniversary of the strike.
- Reason: Split a 37-word FR sentence (S5), removed the « La station ouvre en 1900 » template opener; the year is duplicated by the page's opening-year line.

## station/1/hotel-de-ville/context/fr

- Before (0.66 edit): La station ouvre en 1900. Depuis 1994, près de l’accès aux quais de la ligne 1, une plaque marque le cinquantenaire de la grève des 3 000 agents de la Compagnie du chemin de fer métropolitain de Paris, le 16 août 1944.
- After (0.94 ship): Le 16 août 1944, 3 000 agents de la Compagnie du chemin de fer métropolitain de Paris se mettent en grève. Depuis 1994, une plaque marque le cinquantenaire de cette grève, près de l’accès aux quais de la ligne 1.
- Reason: Split a 37-word FR sentence (S5), removed the « La station ouvre en 1900 » template opener; the year is duplicated by the page's opening-year line.

## station/1/bastille/context/en

- Before (0.74 edit): Line 1's own platforms opened in 1900 on a bridge over the Canal Saint-Martin, at the north end of the Arsenal basin; the station's own article says this position was chosen to avoid the July Column's foundations.
- After (0.96 ship): A bridge over the Canal Saint-Martin, at the north end of the Arsenal basin, carries the Line 1 platforms. This position was chosen to avoid the foundations of the July Column.
- Reason: Removed source self-reference (T17). The station article states the reason directly (« Elle est établie au-dessus du canal Saint-Martin afin d’éviter les fondations de la colonne de Juillet »), so no hedge is needed. Split 39-word sentence. "opened in 1900" removed as duplicated by the page's opening-year line. Source: https://fr.wikipedia.org/wiki/Bastille_(m%C3%A9tro_de_Paris).

## station/1/bastille/context/fr

- Before (0.69 edit): Les quais de la ligne 1 ouvrent en 1900 sur un pont franchissant le canal Saint-Martin, à l’extrémité nord du bassin de l’Arsenal ; l’article de la station indique que cet emplacement évite les fondations de la colonne de Juillet.
- After (0.96 ship): Un pont au-dessus du canal Saint-Martin, à l’extrémité nord du bassin de l’Arsenal, porte les quais de la ligne 1. Cet emplacement a été choisi pour éviter les fondations de la colonne de Juillet.
- Reason: Removed source self-reference (T17). The station article states the reason directly (« Elle est établie au-dessus du canal Saint-Martin afin d’éviter les fondations de la colonne de Juillet »), so no hedge is needed. Split 39-word sentence. "opened in 1900" removed as duplicated by the page's opening-year line. Source: https://fr.wikipedia.org/wiki/Bastille_(m%C3%A9tro_de_Paris).

## station/1/gare-de-lyon/context/en

- Before (0.78 edit): Line 1's platforms opened in 1900, built 100 metres long against 75 elsewhere on the line, with four tracks and two central platforms meant for the era's circular line as well, a plan never carried out.
- After (0.95 ship): Line 1’s platforms were built 100 metres long, against 75 elsewhere on the line. The station has four tracks and two central platforms, also meant for the circular line planned at the time. That plan was never carried out.
- Reason: Split a 36-word EN sentence; "opened in 1900" removed as duplicated by the opening-year line.

## station/1/gare-de-lyon/context/fr

- Before (0.87 ship): Les quais de la ligne 1 ouvrent en 1900. Longs de 100 mètres contre 75 ailleurs sur la ligne, ils comptent quatre voies et deux quais centraux, prévus pour accueillir aussi la ligne circulaire de l’époque, un projet jamais réalisé.
- After (0.97 ship): Les quais de la ligne 1 mesurent 100 mètres, contre 75 ailleurs sur la ligne. La station compte quatre voies et deux quais centraux, prévus aussi pour la ligne circulaire alors en projet. Ce projet n’a jamais été réalisé.
- Reason: Split a 36-word EN sentence; "opened in 1900" removed as duplicated by the opening-year line.

## station/1/reuilly-diderot/etymology/en

- Before (0.73 edit): Named Reuilly for the Rue de Reuilly, leading to the former Palais de Reuilly. Diderot was added on 5 May 1931, naming the boulevard above, itself renamed for philosopher Denis Diderot in 1879.
- After (0.90 ship): Called Reuilly after Rue de Reuilly, which led to the former Palais de Reuilly. Diderot was added on 5 May 1931 for the boulevard above, renamed in 1879 for the philosopher Denis Diderot.
- Reason: Removed "-ing" tail clause ("leading to") and FR calques « renommé pour », « , d’après la rue / le boulevard »; R2 opening.

## station/1/reuilly-diderot/etymology/fr

- Before (0.74 edit): La station porte le nom de Reuilly, d’après la rue de Reuilly qui menait à l’ancien palais de Reuilly. Le complément Diderot est ajouté le 5 mai 1931, d’après le boulevard, lui-même renommé pour le philosophe Denis Diderot en 1879.
- After (0.90 ship): La station doit son nom à la rue de Reuilly, qui menait à l’ancien palais de Reuilly. Le nom de Diderot est ajouté le 5 mai 1931 pour le boulevard situé au-dessus, rebaptisé en 1879 en l’honneur du philosophe Denis Diderot.
- Reason: Removed "-ing" tail clause ("leading to") and FR calques « renommé pour », « , d’après la rue / le boulevard »; R2 opening.

## station/1/reuilly-diderot/context/en

- Before (0.78 edit): The Line 1 station opened on 20 August 1900, almost a month after the line's first trains. For the line's automation, its platforms were raised over the weekend of 31 May to 1 June 2008, and platform screen doors followed in March 2011.
- After (0.89 ship): The Line 1 station opened on 20 August 1900, almost a month after the line’s first trains. For the line’s automation, its platforms were raised over the weekend of 31 May to 1 June 2008. Platform screen doors followed in March 2011.
- Reason: Split a 26-word EN sentence; typography.

## station/1/nation/etymology/en

- Before (0.91 ship): Named for Place de la Nation, itself renamed for the national holiday of 14 July 1880. It was earlier Place du Trône, after a throne set up there in 1660 for Louis XIV's entry into Paris.
- After (0.97 ship): Named for Place de la Nation, itself renamed for the national holiday of 14 July 1880. It was earlier Place du Trône, after a throne set up there in 1660 for Louis XIV’s entry into Paris.
- Reason: Typography only.

## station/1/nation/context/en

- Before (0.85 edit): The square was renamed Place du Trône-Renversé from 1792. The station opened in 1900, and its platforms were raised over the weekend of 12 to 13 September 2009, as part of Line 1's automation project.
- After (0.93 ship): The square was renamed Place du Trône-Renversé from 1792. For Line 1’s automation project, the station’s platforms were raised over the weekend of 12 to 13 September 2009.
- Reason: Split a 26-word sentence; "The station opened in 1900" removed as duplicated by the opening-year line.

## station/1/nation/context/fr

- Before (0.88 ship): La place devient place du Trône-Renversé à partir de 1792. La station ouvre en 1900, et ses quais sont rehaussés le week-end du 12 au 13 septembre 2009, dans le cadre du projet d’automatisation de la ligne 1.
- After (0.91 ship): La place devient place du Trône-Renversé à partir de 1792. Pour le projet d’automatisation de la ligne 1, les quais de la station sont rehaussés le week-end du 12 au 13 septembre 2009.
- Reason: Split a 26-word sentence; "The station opened in 1900" removed as duplicated by the opening-year line.

## station/1/porte-de-vincennes/context/en

- Before (0.92 ship): The station opened on 19 July 1900 as the original eastern terminus, with a distinctive looping double-tunnel layout. It lost that role when the line reached Château de Vincennes in 1934.
- After (0.99 ship): The station opened on 19 July 1900 as the original eastern terminus, with a looping double-tunnel layout. It lost that role when the line reached Château de Vincennes in 1934.
- Reason: Removed puffery "distinctive" / « particulier ».

## station/1/porte-de-vincennes/context/fr

- Before (0.93 ship): La station ouvre le 19 juillet 1900 comme terminus est d’origine, avec un dispositif particulier de double tunnel en boucle. Elle perd ce rôle lorsque la ligne atteint le château de Vincennes en 1934.
- After (0.98 ship): La station ouvre le 19 juillet 1900 comme terminus est d’origine, avec un double tunnel en boucle. Elle perd ce rôle lorsque la ligne atteint le château de Vincennes en 1934.
- Reason: Removed puffery "distinctive" / « particulier ».

## station/1/saint-mande/etymology/en

- Before (0.87 ship): Named for the neighbouring town of Saint-Mandé. The station opened on 24 March 1934 as Tourelle, for the Château de Vincennes' outlying defensive towers, and became Saint-Mandé – Tourelle on 26 April 1937.
- After (0.91 ship): Named for the neighbouring town of Saint-Mandé. The station opened on 24 March 1934 as Tourelle, for the Château de Vincennes’ outlying defensive towers, and became Saint-Mandé – Tourelle on 26 April 1937.
- Reason: Typography only.

## station/1/saint-mande/context/en

- Before (0.72 edit): The rename followed Line 6's own Saint-Mandé station becoming Picpus on 1 March 1937, freeing the name. Tourelle was later dropped, shortening the station to plain Saint-Mandé sometime between the late 1990s and 2002.
- After (0.86 ship): The 1937 rename followed a change on Line 6: its Saint-Mandé station became Picpus on 1 March 1937, and the name was free. Tourelle was dropped later, at some point between the late 1990s and 2002.
- Reason: Removed two "-ing" tail clauses ("freeing the name", "shortening the station…") and FR filler « simplement »; FR now shows the same structure as EN.

## station/1/saint-mande/context/fr

- Before (0.82 edit): Ce changement suit celui de la station Saint-Mandé de la ligne 6, devenue Picpus le 1er mars 1937, ce qui libère le nom. Tourelle est ensuite abandonné, la station devenant simplement Saint-Mandé entre la fin des années 1990 et 2002.
- After (0.87 ship): Le changement de 1937 suit celui de la ligne 6 : sa station Saint-Mandé devient Picpus le 1er mars 1937, ce qui libère le nom. Tourelle est abandonné plus tard, entre la fin des années 1990 et 2002.
- Reason: Removed two "-ing" tail clauses ("freeing the name", "shortening the station…") and FR filler « simplement »; FR now shows the same structure as EN.

## station/1/berault/etymology/en

- Before (0.81 edit): Named for Place Bérault in Vincennes, honouring Michel Bérault (1796 to 1871), a deputy mayor of the town from an old local family, according to the square's own French Wikipedia article.
- After (0.97 ship): Called Bérault after Place Bérault in Vincennes. The square honours Michel Bérault (1796 to 1871), a deputy mayor of the town from an old local family.
- Reason: Removed source self-reference (T17). The place article states the fact without hedging, and Michel Bérault and his office are also in the English station article. Split 31-word sentence; FR year range 1796-1871 → 1796–1871. Sources: https://fr.wikipedia.org/wiki/Place_B%C3%A9rault (« Michel Bérault (1796-1871), d’une très vieille famille vincennoise, adjoint au maire de la ville ») and https://en.wikipedia.org/wiki/B%C3%A9rault_station.

## station/1/berault/etymology/fr

- Before (0.82 edit): La station doit son nom à la place Bérault, à Vincennes, qui honore Michel Bérault (1796-1871), maire adjoint de la ville issu d’une ancienne famille vincennoise, selon l’article Wikipédia consacré à la place.
- After (0.97 ship): La station doit son nom à la place Bérault, à Vincennes. La place honore Michel Bérault (1796–1871), maire adjoint de la ville, issu d’une ancienne famille vincennoise.
- Reason: Removed source self-reference (T17). The place article states the fact without hedging, and Michel Bérault and his office are also in the English station article. Split 31-word sentence; FR year range 1796-1871 → 1796–1871. Sources: https://fr.wikipedia.org/wiki/Place_B%C3%A9rault (« Michel Bérault (1796-1871), d’une très vieille famille vincennoise, adjoint au maire de la ville ») and https://en.wikipedia.org/wiki/B%C3%A9rault_station.

## station/1/berault/context/en

- Before (0.87 ship): Opened in 1934, the station became the prototype for Line 1's automation renovation. Its platforms were raised in July 2008, and it was the first on the line fitted with platform screen doors, in February 2009.
- After (0.94 ship): Opened in 1934, the station became the prototype for Line 1’s automation renovation. Its platforms were raised in July 2008, and it was the first on the line fitted with platform screen doors, in February 2009.
- Reason: Typography only.

## station/1/chateau-de-vincennes/etymology/en

- Before (0.91 ship): Named for the adjoining royal château of Vincennes, whose towers and keep still stand beside the station. The line reached here on 24 March 1934, and it became Line 1's eastern terminus.
- After (0.96 ship): Named for the adjoining royal château of Vincennes, whose towers and keep still stand beside the station. The line reached here on 24 March 1934, and it became Line 1’s eastern terminus.
- Reason: Typography only.

## station/1/chateau-de-vincennes/etymology/fr

- Before (0.93 ship): La station doit son nom au château royal de Vincennes voisin, dont les tours et le donjon subsistent près de la station. La ligne l’atteint le 24 mars 1934 ; la station devient alors le terminus est de la ligne 1.
- After (0.98 ship): La station doit son nom au château royal de Vincennes voisin, dont les tours et le donjon subsistent près de la station. La ligne l’atteint le 24 mars 1934 ; la station devient alors le terminus est de la ligne 1.
- Reason: Typography only.

## station/1/chateau-de-vincennes/context/en

- Before (0.80 edit): The station still holds that terminus role today. During Line 1's automation works, it closed from 24 to 27 September 2009, with Bérault serving as a temporary terminus in its place.
- After (0.94 ship): The station closed from 24 to 27 September 2009, during Line 1’s automation works. Bérault was the line’s temporary eastern terminus in that period.
- Reason: Removed persistence filler ("still holds that terminus role today" / « conserve aujourd’hui ce rôle de terminus »): duplicated by the etymology ("it became Line 1’s eastern terminus") and the line's termini. Removed participle construction « Bérault assurant… ».

## station/1/chateau-de-vincennes/context/fr

- Before (0.83 edit): La station conserve aujourd’hui ce rôle de terminus. Pendant les travaux d’automatisation de la ligne 1, elle ferme du 24 au 27 septembre 2009, Bérault assurant alors un terminus provisoire à sa place.
- After (0.93 ship): Pendant les travaux d’automatisation de la ligne 1, la station ferme du 24 au 27 septembre 2009. Bérault est alors le terminus est provisoire de la ligne.
- Reason: Removed persistence filler ("still holds that terminus role today" / « conserve aujourd’hui ce rôle de terminus »): duplicated by the etymology ("it became Line 1’s eastern terminus") and the line's termini. Removed participle construction « Bérault assurant… ».
## line/1/summary/en

- Before (0.60 rewrite, from baseline2): From La Défense's towers to a royal château: kings, a revolution and diplomacy along 25 station names.
- After (0.98 ship): Line 1 runs from La Défense to Château de Vincennes. Several of its 25 station names honour foreign allies, such as George V, Franklin D. Roosevelt and Argentine.
- Reason: Removed the false range (T12) and the reflex tricolon (T6). The new text names both termini, one concrete theme and three example stations (L1 level 4). The theme comes from the George V, Franklin D. Roosevelt and Argentine entries in this file. "Kings" and "a revolution" were dropped: with no station named, they were the abstract tricolon.

## line/1/summary/fr

- Before (0.54 rewrite, from baseline2): Des tours de La Défense à un château royal : rois, révolution et diplomatie sur 25 noms de stations.
- After (0.98 ship): La ligne 1 relie La Défense à Château de Vincennes. Plusieurs de ses 25 noms de stations honorent des alliés étrangers, comme George V, Franklin D. Roosevelt et Argentine.
- Reason: Same as EN.

## Review

Adversarial fact-preservation review of all 75 changed units (73 station units, EN and FR line summary). Checked against `git show HEAD:apps/web/src/data/line1.ts`, `docs/research/line1.md`, and the French station articles for Concorde, Bastille and Hôtel de Ville (all three state the added or de-attributed facts plainly: « plus grande place de Paris », « réconciliation des Français », « afin d’éviter les fondations de la colonne de Juillet », « héberge les institutions municipales de Paris depuis 1357 »).

Fixes:

- `franklin-d-roosevelt/etymology/fr`: « rebaptisée en l’honneur du président américain pendant la guerre » could be read as "renamed during the war". The wartime qualifier now attaches to the leader: « rebaptisée en l’honneur du président américain. […] Le nouveau nom honore un dirigeant allié pendant la guerre, à la place du roi d’Italie » (45 words, within the limit).
- `franklin-d-roosevelt/context/fr`: « Marbeuf, comme la rue et l’ancien jardin voisins » changed "named after" into "same name as" and added "neighbouring". Restored « d’après la rue et l’ancien jardin du même nom ».
- `palais-royal-musee-du-louvre/context/fr`: « Place Colette, une entrée… » had no preposition. Now « Sur la place Colette, l’une des entrées… ».
- `louvre-rivoli/etymology/fr`: « pour la rue du Louvre » is now « d’après la rue du Louvre ». « Palais-Royal reçoit le nom du musée et Rivoli s’ajoute » did not say what Rivoli was added to. Now « En 1989, Palais-Royal prend le nom du musée ; ici, Rivoli s’ajoute. », as in EN "Rivoli was added here" (45 words, within the limit).
- `gare-de-lyon/context/en` and `/fr`: "also meant for the circular line planned at the time. That plan was never carried out" said the circular line was never built. It was built (the Line 2 of the time, per `docs/research/line1.md`); only its trains never stopped here. Now "so that trains of the circular line of the time could also stop here. That never happened." / « pour que les trains de la ligne circulaire de l’époque s’y arrêtent aussi. Ce projet n’a jamais été réalisé. »
- `saint-mande/context/en`: "and the name was free" lost the cause stated in the original ("freeing the name") and kept in FR (« ce qui libère le nom »). Now "which freed the name".
- `line/1/summary/en` and `/fr`: "honour foreign allies, such as … Argentine" called Argentina an ally. The Argentine entry says the rename thanked Argentina for food aid, not an alliance. Now "honour foreign countries and leaders" / « honorent des pays et des dirigeants étrangers ».

Checked and accepted: Porte Maillot "1936 or 1937" (research notes: FR station article 1937, EN line article 15 November 1936); George V modal hedge in place of the "according to" attribution; Concorde single hedge; removal of bare opening years; all FR punctuation spacing (U+202F before ; ! ?, U+00A0 before : and inside « »).

## Fact check 2026-10-05

Confirmed errors (both locales rewritten):

- `porte-maillot/etymology`: removed the ranking "more speculatively" / « plus spéculativement ». The two origins are now given as equal, unproven proposals: "perhaps an old mallet game played in the wood, or the 1382 Maillotins revolt" / « peut-être un ancien jeu de mail dans le bois, ou la révolte des Maillotins de 1382 ». Evidence: https://fr.wikipedia.org/wiki/Porte_Maillot ("Origine du nom": the mallet game is what « On dit souvent »; the revolt is « beaucoup plus probable »); `docs/research/line1.md` says not to rank them. Added source "Porte Maillot · Wikipédia".
- `bastille/context`: "A bridge … carries the Line 1 platforms" is now "Part of the Line 1 platforms stands on a bridge …" / « Une partie des quais de la ligne 1 repose sur un pont … ». Evidence: https://fr.wikipedia.org/wiki/Bastille_(m%C3%A9tro_de_Paris) (station « en partie souterraine et aérienne »; the 1960s extension is « sous un tablier en béton, directement sous la chaussée »). Existing source. Etymology not changed.
- `saint-mande/etymology`: "neighbouring town" / « commune voisine » is now "the town of Saint-Mandé, where it stands, on the boundary with Vincennes" / « la commune de Saint-Mandé, où elle se trouve, à la limite de Vincennes ». Evidence: https://fr.wikipedia.org/wiki/Saint-Mand%C3%A9_(m%C3%A9tro_de_Paris) (« implantée sous l'amorce de l'avenue de Paris (D 120) à Saint-Mandé »; « située à la limite des communes de Saint-Mandé et de Vincennes »). Existing source. The rename date 26 April 1937 is kept (see below).

True but unsourced (sources added, text not changed):

- `saint-mande/etymology` (rename 26 April 1937) and `saint-mande/context` (Picpus rename 1 March 1937): added "Saint-Mandé station · Wikipedia" (https://en.wikipedia.org/wiki/Saint-Mand%C3%A9_station: "On 26 April 1937, the station was renamed Saint-Mandé – Tourelle") and "Picpus · Wikipédia" (https://fr.wikipedia.org/wiki/Picpus_(m%C3%A9tro_de_Paris): « Le 1er mars 1937, elle change de nom au profit de Picpus »).
- `nation/etymology` (Place du Trône, 1660) and `nation/context` (Trône-Renversé, 1792): added "Place de la Nation · Wikipédia" (https://fr.wikipedia.org/wiki/Place_de_la_Nation_(Paris)).
- `chateau-de-vincennes/etymology` (24 March 1934): added "Ligne 1 du métro de Paris · Wikipédia" (« Le 24 mars 1934, un premier prolongement en banlieue est mis en service jusqu'à Château de Vincennes »).
- `berault/context` (first station with platform doors, February 2009): added "Ligne 1 du métro de Paris · Wikipédia" (« la station Bérault en est la première équipée en février 2009 »).
- `gare-de-lyon/etymology` (name from the railway line to Lyon): added "Paris-Gare-de-Lyon · Wikipédia" (https://fr.wikipedia.org/wiki/Paris-Gare-de-Lyon; the first title chosen redirected here).
- `porte-de-vincennes/etymology` (gate of the Thiers wall): added "Portes de Paris · Wikipédia" and "Enceinte de Thiers · Wikipédia" (https://fr.wikipedia.org/wiki/Portes_de_Paris, https://fr.wikipedia.org/wiki/Enceinte_de_Thiers).
- `la-defense/context` (western terminus): added "Ligne 1 du métro de Paris · Wikipédia" (the line « relie aujourd'hui la station La Défense à l'ouest, à la station Château de Vincennes, à l'est »).

Not changed: the La Défense location field ("Puteaux / Courbevoie"; the station article says Puteaux). This was a side note, not a confirmed error.

## Fact check pass 2 (2026-10-05)

Review of the next 100 pairs after the new ranking. Report: [docs/facts/2026-10-05-fact-check-pass2.md](../../facts/2026-10-05-fact-check-pass2.md).

Confirmed imprecise (both locales rewritten):

- `chatelet/context` (pass-2 rank 14): "several weeks" was 18 days (Line 1 opened on 19 July 1900; the Châtelet platforms on 6 August 1900).
  - Before: "For several weeks after the line’s opening day, trains passed through the unfinished station without stopping." / « Pendant plusieurs semaines après l’ouverture de la ligne, les trains traversent la station inachevée sans s’y arrêter. »
  - After: "For two and a half weeks after the line opened on 19 July 1900, trains passed through the unfinished station without stopping." / « Pendant deux semaines et demie après l’ouverture de la ligne, le 19 juillet 1900, les trains traversent la station inachevée sans s’y arrêter. »
  - Evidence: https://fr.wikipedia.org/wiki/Ch%C3%A2telet_(m%C3%A9tro_de_Paris) (« ouverte le 6 août 1900, soit plus de deux semaines après la mise en service du premier tronçon de la ligne 1 »). Added source "Ligne 1 du métro de Paris · Wikipédia" for the date 19 July 1900 (« Le 19 juillet 1900 à 13 heures, la ligne est ouverte au public »).
- `les-sablons/context` (rank 86): no source says Jacques Barrot collapsed "on the platform".
  - Before: "…Jacques Barrot collapsed on the platform of this station and died suddenly." / « …Jacques Barrot s’effondre sur le quai de cette station et meurt subitement. »
  - After: "…Jacques Barrot was taken ill in this station and died suddenly." / « …Jacques Barrot est victime d’un malaise dans cette station et meurt subitement. »
  - Evidence: station article (« à la suite d'un malaise survenu alors qu'il se trouvait dans la station »). Existing source.

True but unsourced (sources added, text not changed):

- `palais-royal-musee-du-louvre/etymology` (rank 67, former royal residence): added "Palais-Royal · Wikipédia" (https://fr.wikipedia.org/wiki/Palais-Royal: the Palais-Cardinal « sert de résidence à la régente Anne d'Autriche … et devient le Palais-Royal »). The same source was added on Line 7.
- `chateau-de-vincennes/etymology` (rank 38, towers and keep): added "Château de Vincennes (monument) · Wikipédia" (https://fr.wikipedia.org/wiki/Ch%C3%A2teau_de_Vincennes).

Copy evaluator after the change: chatelet/context EN 0.97, FR 0.98; les-sablons/context EN 0.89, FR 0.89. All ship, no FAIL.

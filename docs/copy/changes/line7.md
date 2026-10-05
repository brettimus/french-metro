# Line 7 copy changes (2026-10-05)

File: `apps/web/src/data/line7.ts`. Evaluator runs: `apps/web/scripts/copy/out/line7-before/`, `line7-before-line/`, `line7-after/`, `line7-after-line/`.

Shared etymologies not owned by Line 7 were left unchanged: gare-de-lest (Line 4), palais-royal-musee-du-louvre (Line 1), chatelet (Line 1), stalingrad (Line 5), place-ditalie (Line 5). Line 7 owns the etymologies of chaussee-dantin-la-fayette, pyramides and maison-blanche.

French typography: every plain space before “;” in FR strings was replaced by U+202F.

### line/7/summary/en
- Before: From dyers to scientists: 38 names, from La Courneuve to Ivry and Villejuif.
- After: Line 7 runs from La Courneuve to two southern termini, Mairie d’Ivry and Villejuif – Louis Aragon. Its 38 station names include four Paris gates and people such as the Gobelin dyers and Pierre and Marie Curie.
- Reason: T12 false range (“From dyers to scientists”); L1: now names route, both southern termini and example stations. FR: narrow no-break space issue removed with the colon. Facts: 38 stations and four Porte stations counted in line7.ts; Gobelin dyers and the Curies are already in the station entries.

### line/7/summary/fr
- Before: Des teinturiers aux savants : 38 noms, de La Courneuve à Ivry et Villejuif.
- After: La ligne 7 relie La Courneuve à deux terminus sud, Mairie d’Ivry et Villejuif – Louis Aragon. Ses 38 noms de stations comprennent quatre portes de Paris et des personnes comme les teinturiers Gobelin ou Pierre et Marie Curie.
- Reason: T12 false range (“From dyers to scientists”); L1: now names route, both southern termini and example stations. FR: narrow no-break space issue removed with the colon. Facts: 38 stations and four Porte stations counted in line7.ts; Gobelin dyers and the Curies are already in the station entries.

### line/7/imageAlt/en
- Before: Interpretive illustration of Line 7 and its station-name stories
- After: Engraved-style illustration of a wooden upright tapestry loom with a floral tapestry in progress, beside a botanical drawing of a pink flowering plant.
- Reason: L2: old text was generic and interpretive (“Interpretive”, « évocatrice »). New text describes what is visible in /illustrations/line-7.webp (checked by viewing the image).

### line/7/imageAlt/fr
- Before: Illustration évocatrice de la ligne 7 et de l’histoire des noms de ses stations
- After: Illustration de style gravure d’un métier à tisser vertical en bois portant une tapisserie fleurie en cours, à côté d’une planche botanique d’une plante à fleurs roses.
- Reason: L2: old text was generic and interpretive (“Interpretive”, « évocatrice »). New text describes what is visible in /illustrations/line-7.webp (checked by viewing the image).

### la-courneuve-8-mai-1945/etymology/en
- Before: Called La Courneuve–8 Mai 1945 because it serves this town at Place du 8-Mai-1945. The square commemorates Germany’s surrender on 8 May 1945 and the end of the Second World War in Europe.
- After: Called La Courneuve – 8 Mai 1945 because it serves this town at Place du 8-Mai-1945. The square commemorates Germany’s surrender on 8 May 1945 and the end of the Second World War in Europe.
- Reason: stationDash: house form “A – B”.

### aubervilliers-pantin-quatre-chemins/etymology/en
- Before: Called Aubervilliers–Pantin–Quatre Chemins because it serves the crossroads on the boundary of those two towns. Quatre Chemins, meaning four roads, names the junction of the old Flanders road with two transverse avenues.
- After: Called Aubervilliers – Pantin – Quatre Chemins because it serves the crossroads on the boundary of those two towns. Quatre Chemins, meaning four roads, names the junction of the old Flanders road with two transverse avenues.
- Reason: stationDash FAIL: house form “A – B”.

### chateau-landon/etymology/en
- Before: Called Château-Landon after Rue du Château-Landon. Historical research traces the street’s name to a local house belonging to a man named Landon; an older explanation linking it to the distant town was challenged.
- After: Called Château-Landon after Rue du Château-Landon. In 1900, Charles Sellier traced the street’s name to a local house belonging to a man named Landon. This challenged an older explanation based on the distant town of Château-Landon.
- Reason: Sentence of 27 words split; T7 vague attribution (“Historical research”, « Des recherches historiques ») replaced by the named researcher and year; FR space before “;” removed with the split. Hedge kept (older explanation “challenged” / « conteste »). FACT ADDED: Charles Sellier, 1900. Source: https://fr.wikipedia.org/wiki/Rue_du_Ch%C3%A2teau-Landon (Origine du nom: Charles Sellier showed in 1900 that the house of “le dénommé Landon” gave the name).

### chateau-landon/etymology/fr
- Before: La station doit son nom à la rue du Château-Landon. Des recherches historiques rattachent ce nom à une maison appartenant à un certain Landon ; l’ancienne explication par la ville lointaine de Château-Landon a été contestée.
- After: La station doit son nom à la rue du Château-Landon. En 1900, Charles Sellier rattache ce nom à une maison appartenant à un certain Landon. Il conteste ainsi l’ancienne explication par la ville lointaine de Château-Landon.
- Reason: Sentence of 27 words split; T7 vague attribution (“Historical research”, « Des recherches historiques ») replaced by the named researcher and year; FR space before “;” removed with the split. Hedge kept (older explanation “challenged” / « conteste »). FACT ADDED: Charles Sellier, 1900. Source: https://fr.wikipedia.org/wiki/Rue_du_Ch%C3%A2teau-Landon (Origine du nom: Charles Sellier showed in 1900 that the house of “le dénommé Landon” gave the name).

### chateau-landon/context/en
- Before: A passage beneath the railway tracks connects the station with Gare de l’Est. Built during the railway station’s 1931 reconstruction, the tunnel originally carried luggage and parcels. It later became a passage for passengers transferring between trains and Métro.
- After: A passage beneath the railway tracks connects the station with Gare de l’Est. It was built in 1931, when Gare de l’Est was renovated, to carry luggage and parcels. After the luggage system changed, it became a transfer corridor for passengers.
- Reason: Fact drift (FR left out “transferring between trains and Métro”; EN “reconstruction” vs FR « transformation »). Both aligned to the station article: passage created during the 1931 renovation of Gare de l’Est, first for luggage and parcels, converted into a « couloir de correspondance » when luggage handling changed. FACT ADDED (both): the conversion followed the change in luggage handling. Source: https://fr.wikipedia.org/wiki/Ch%C3%A2teau-Landon_(m%C3%A9tro_de_Paris)

### chateau-landon/context/fr
- Before: Un passage sous les voies ferrées relie la station à la gare de l’Est. Construit lors de la transformation de la gare en 1931, ce tunnel transportait d’abord les bagages et les colis. Il devient ensuite un passage pour les voyageurs.
- After: Un passage sous les voies ferrées relie la station à la gare de l’Est. Il est créé en 1931, lors de la rénovation de la gare, pour le transport des bagages et des colis. Après la réforme de l’acheminement des bagages, il devient un couloir de correspondance pour les voyageurs.
- Reason: Fact drift (FR left out “transferring between trains and Métro”; EN “reconstruction” vs FR « transformation »). Both aligned to the station article: passage created during the 1931 renovation of Gare de l’Est, first for luggage and parcels, converted into a « couloir de correspondance » when luggage handling changed. FACT ADDED (both): the conversion followed the change in luggage handling. Source: https://fr.wikipedia.org/wiki/Ch%C3%A2teau-Landon_(m%C3%A9tro_de_Paris)

### cadet/etymology/en
- Before: Called Cadet after Rue Cadet, whose name is generally linked to the brothers Jacques and Jean Cadet, master gardeners and owners of the Clos Cadet. The attribution is traditional rather than certain.
- After: Called Cadet after Rue Cadet. The street’s name may come from the brothers Jacques and Jean Cadet, master gardeners who owned the Clos Cadet. This traditional attribution is not certain.
- Reason: T7 vague attribution (“generally linked”); FR T17 « dans les sources ». Hedge kept: EN “may come from” + “not certain”; FR « viendrait » (the source’s « proviendrait ») + « n’est pas certaine ». Source: https://fr.wikipedia.org/wiki/Cadet_(m%C3%A9tro_de_Paris)

### cadet/etymology/fr
- Before: La station doit son nom à la rue Cadet, généralement rattachée aux frères Jacques et Jean Cadet, maîtres jardiniers et propriétaires du clos Cadet. Cette attribution traditionnelle reste présentée avec réserve dans les sources.
- After: La station doit son nom à la rue Cadet. Ce nom viendrait des frères Jacques et Jean Cadet, maîtres jardiniers et propriétaires du clos Cadet. Cette attribution traditionnelle n’est pas certaine.
- Reason: T7 vague attribution (“generally linked”); FR T17 « dans les sources ». Hedge kept: EN “may come from” + “not certain”; FR « viendrait » (the source’s « proviendrait ») + « n’est pas certaine ». Source: https://fr.wikipedia.org/wiki/Cadet_(m%C3%A9tro_de_Paris)

### cadet/context/en
- Before: The station’s American flag decoration has a different origin from its name. The platforms lie beneath Rue La Fayette, named for the general who fought in the American War of Independence. The design refers to that connection.
- After: Cadet’s platforms lie beneath Rue La Fayette, which honours the general who fought alongside the Americans in their War of Independence. For this reason, the station is tiled in the colours of the United States flag. White shapes on the tiles represent its stars.
- Reason: S2: first and last sentences only evaluated (“has a different origin”, “refers to that connection”); FR calque « nommée pour ». Now states the causal link directly. FACT ADDED: white shapes on the tiles represent the flag’s stars; the general fought alongside the Americans. Source: https://fr.wikipedia.org/wiki/Cadet_(m%C3%A9tro_de_Paris) (« des silhouettes blanches sur ce même carrelage représentent les étoiles du drapeau des États-Unis »; « le général ayant combattu aux côtés des Américains lors de leur guerre d’indépendance »).

### cadet/context/fr
- Before: Le décor aux couleurs du drapeau américain a une autre origine que le nom de la station. Les quais se trouvent sous la rue La Fayette, nommée pour le général engagé dans la guerre d’indépendance américaine. Le décor rappelle ce lien.
- After: Les quais de Cadet se trouvent sous la rue La Fayette, qui honore le général engagé aux côtés des Américains pendant leur guerre d’indépendance. C’est pourquoi le carrelage de la station reprend les couleurs du drapeau des États-Unis. Des silhouettes blanches y figurent ses étoiles.
- Reason: S2: first and last sentences only evaluated (“has a different origin”, “refers to that connection”); FR calque « nommée pour ». Now states the causal link directly. FACT ADDED: white shapes on the tiles represent the flag’s stars; the general fought alongside the Americans. Source: https://fr.wikipedia.org/wiki/Cadet_(m%C3%A9tro_de_Paris) (« des silhouettes blanches sur ce même carrelage représentent les étoiles du drapeau des États-Unis »; « le général ayant combattu aux côtés des Américains lors de leur guerre d’indépendance »).

### chaussee-dantin-la-fayette/etymology/en
- Before: Called Chaussée d’Antin – La Fayette after two streets. The first recalls the Duc d’Antin’s mansion and a roadway raised above marshy ground; Rue La Fayette honours the marquis who fought for American independence.
- After: Called Chaussée d’Antin – La Fayette after two streets. Rue de la Chaussée-d’Antin recalls the Duc d’Antin’s mansion and a roadway raised above marshy ground. Rue La Fayette honours the marquis who fought for American independence.
- Reason: Sentence of 26 words split; T21 duplicate sentence « La station doit son nom à deux rues. » (FR now names both streets); FR space before “;” removed. Line 7 owns this shared etymology (Line 9 to sync).

### chaussee-dantin-la-fayette/etymology/fr
- Before: La station doit son nom à deux rues. La Chaussée-d’Antin rappelle l’hôtel du duc d’Antin et une voie surélevée sur un terrain marécageux ; la rue La Fayette honore le marquis engagé pour l’indépendance américaine.
- After: La station doit son nom à la rue de la Chaussée-d’Antin et à la rue La Fayette. La première rappelle l’hôtel du duc d’Antin et une voie surélevée sur un terrain marécageux. La seconde honore le marquis engagé pour l’indépendance américaine.
- Reason: Sentence of 26 words split; T21 duplicate sentence « La station doit son nom à deux rues. » (FR now names both streets); FR space before “;” removed. Line 7 owns this shared etymology (Line 9 to sync).

### palais-royal-musee-du-louvre/context/en
- Before: The original station name was simply Palais-Royal. Line 7 reached it in 1916, and it remained the southern terminus until the extension along the Seine in 1926. The combined name distinguishes it from nearby Louvre–Rivoli.
- After: The original station name was Palais-Royal. Line 7 reached it in 1916, and it remained the southern terminus until the extension along the Seine in 1926. The combined name distinguishes it from nearby Louvre – Rivoli.
- Reason: Filler “simply” (S4) removed; stationDash FAIL “Louvre – Rivoli” in both locales.

### palais-royal-musee-du-louvre/context/fr
- Before: La station s’appelait à l’origine Palais-Royal. La ligne 7 l’atteint en 1916 et y termine son parcours jusqu’au prolongement le long de la Seine en 1926. Le nom composé la distingue de la station voisine Louvre–Rivoli.
- After: La station s’appelait à l’origine Palais-Royal. La ligne 7 l’atteint en 1916 et y termine son parcours jusqu’au prolongement le long de la Seine en 1926. Le nom composé la distingue de la station voisine Louvre – Rivoli.
- Reason: Filler “simply” (S4) removed; stationDash FAIL “Louvre – Rivoli” in both locales.

### pont-neuf/etymology/en
- Before: Called Pont-Neuf because it stands beside the Pont Neuf, literally the new bridge. Its name survives even though this bridge, built without houses and with pavements for pedestrians, is now the oldest surviving bridge in Paris.
- After: Called Pont-Neuf after the Pont Neuf beside it. The name means “new bridge”, but it is now the oldest surviving bridge in Paris. The bridge was built without houses and with pavements for pedestrians.
- Reason: S4 deletable sentence/filler (“Its name survives even though…”, « Ce nom demeure alors que… »); 26-word FR sentence; fr.genericPlaceCase (« pont Neuf », as French Wikipedia writes it). Same facts: name means new bridge, oldest surviving bridge, built without houses and with pavements.

### pont-neuf/etymology/fr
- Before: La station doit son nom au Pont Neuf voisin. Ce nom demeure alors que le pont, construit sans maisons et doté de trottoirs pour les piétons, est aujourd’hui le plus ancien pont conservé de Paris.
- After: La station doit son nom au pont Neuf voisin. Malgré son nom, ce pont est aujourd’hui le plus ancien pont conservé de Paris. Il a été construit sans maisons et doté de trottoirs pour les piétons.
- Reason: S4 deletable sentence/filler (“Its name survives even though…”, « Ce nom demeure alors que… »); 26-word FR sentence; fr.genericPlaceCase (« pont Neuf », as French Wikipedia writes it). Same facts: name means new bridge, oldest surviving bridge, built without houses and with pavements.

### pont-neuf/context/fr
- Before: Le sous-titre La Monnaie rappelle la rue de la Monnaie voisine et l’ancien atelier monétaire qui s’y trouvait. La Monnaie s’installe quai de Conti en 1775. Des motifs de pièces et un balancier monétaire composent bien plus tard le décor culturel de la station.
- After: Le sous-titre La Monnaie rappelle la rue de la Monnaie voisine et l’ancien atelier monétaire qui s’y trouvait. La Monnaie s’installe en 1775 quai de Conti, de l’autre côté de la Seine. Des motifs de pièces et un balancier monétaire composent plus tard le décor culturel de la station.
- Reason: parity.names: FR lacked “Seine” (EN “moved across the Seine”); « bien plus tard » aligned to EN “later”.

### chatelet/context/fr
- Before: La station de la ligne 7 ouvre séparément sous le nom de Pont Notre-Dame en 1926. Un long passage la relie aux autres quais de Châtelet en 1934 ; elle prend alors leur nom. Sa position près de la Seine explique l’éloignement des quais.
- After: La station de la ligne 7 ouvre séparément sous le nom de Pont Notre-Dame en 1926. Un long passage la relie aux autres quais de Châtelet en 1934 ; elle prend alors leur nom. Sa position près de la Seine explique l’éloignement des quais.
- Reason: FR typography FAIL: U+202F before “;”.

### pont-marie/context/en
- Before: Pont Marie served as Line 7’s southern terminus from 1926 until the extension to Sully–Morland in 1930. Its subtitle Cité des Arts refers to the nearby Cité internationale des arts, a residence for artists that opened in 1965.
- After: Pont Marie was Line 7’s southern terminus from 1926 until the extension to Sully – Morland in 1930. Its subtitle Cité des Arts refers to the nearby Cité internationale des arts, a residence for artists that opened in 1965.
- Reason: T8 “served as” → “was”; stationDash FAIL “Sully – Morland” in both locales.

### pont-marie/context/fr
- Before: Pont Marie est le terminus sud de la ligne 7 de 1926 au prolongement vers Sully–Morland en 1930. Son sous-titre Cité des Arts renvoie à la Cité internationale des arts voisine, résidence pour artistes ouverte en 1965.
- After: Pont Marie est le terminus sud de la ligne 7 de 1926 au prolongement vers Sully – Morland en 1930. Son sous-titre Cité des Arts renvoie à la Cité internationale des arts voisine, résidence pour artistes ouverte en 1965.
- Reason: T8 “served as” → “was”; stationDash FAIL “Sully – Morland” in both locales.

### sully-morland/etymology/en
- Before: Called Sully–Morland after nearby roads and the Pont de Sully. Sully honours Maximilien de Béthune, Henri IV’s minister; Boulevard Morland honours François-Louis de Morlan, known as Morland, a colonel of Napoleon’s Imperial Guard.
- After: Called Sully – Morland after nearby roads and the Pont de Sully. Sully honours Maximilien de Béthune, Henri IV’s minister; Boulevard Morland honours François-Louis de Morlan, known as Morland, a colonel of Napoleon’s Imperial Guard.
- Reason: EN stationDash FAIL; FR U+202F before “;”.

### sully-morland/etymology/fr
- Before: La station doit son nom aux voies voisines et au pont de Sully. Sully honore Maximilien de Béthune, ministre d’Henri IV ; le boulevard Morland rappelle François-Louis de Morlan, dit Morland, colonel de la Garde impériale de Napoléon.
- After: La station doit son nom aux voies voisines et au pont de Sully. Sully honore Maximilien de Béthune, ministre d’Henri IV ; le boulevard Morland rappelle François-Louis de Morlan, dit Morland, colonel de la Garde impériale de Napoléon.
- Reason: EN stationDash FAIL; FR U+202F before “;”.

### jussieu/context/en
- Before: Its former name, Jussieu–Halle-aux-vins, also identified the wine market above the station. That market later gave way to the university campus. The adjacent platforms of Lines 7 and 10 opened together during the network’s 1931 reorganisation.
- After: The station’s former name, Jussieu – Halle-aux-vins, also identified the wine market above it. That market later gave way to the university campus. The adjacent platforms of Lines 7 and 10 opened together during the network’s 1931 reorganisation.
- Reason: Opening possessive with no antecedent in the field (“Its”, « Son »), S5 level 1; stationDash FAIL “Jussieu – Halle-aux-vins”.

### jussieu/context/fr
- Before: Son ancien nom, Jussieu–Halle-aux-vins, désignait aussi le marché aux vins situé au-dessus de la station. Ce marché laisse ensuite place au campus universitaire. Les quais voisins des lignes 7 et 10 ouvrent ensemble lors de la réorganisation du réseau en 1931.
- After: L’ancien nom de la station, Jussieu – Halle-aux-vins, désignait aussi le marché aux vins situé au-dessus. Ce marché laisse ensuite place au campus universitaire. Les quais voisins des lignes 7 et 10 ouvrent ensemble lors de la réorganisation du réseau en 1931.
- Reason: Opening possessive with no antecedent in the field (“Its”, « Son »), S5 level 1; stationDash FAIL “Jussieu – Halle-aux-vins”.

### censier-daubenton/etymology/en
- Before: Called Censier–Daubenton after two nearby streets. Censier derives from sans chef, meaning a dead end; Rue Daubenton honours naturalist Louis Jean-Marie Daubenton, who worked with Buffon and became the first director of the natural history museum.
- After: Called Censier – Daubenton after Rue Censier and Rue Daubenton. Censier comes from sans chef, meaning a dead end. Daubenton honours the naturalist Louis Jean-Marie Daubenton, who worked with Buffon and became the first director of the Muséum national d’histoire naturelle.
- Reason: Sentences of 29/30 words split; stationDash FAIL; FR space before “;”; S6: EN “the natural history museum” aligned to FR “Muséum national d’histoire naturelle”; both now name Rue Censier and Rue Daubenton (avoids T21 « deux rues voisines »).

### censier-daubenton/etymology/fr
- Before: La station doit son nom à deux rues voisines. Censier vient de sans chef, qui désignait une impasse ; la rue Daubenton honore le naturaliste Louis Jean-Marie Daubenton, collaborateur de Buffon et premier directeur du Muséum national d’histoire naturelle.
- After: La station doit son nom à la rue Censier et à la rue Daubenton. Censier vient de sans chef, qui désignait une impasse. Daubenton honore le naturaliste Louis Jean-Marie Daubenton, collaborateur de Buffon et premier directeur du Muséum national d’histoire naturelle.
- Reason: Sentences of 29/30 words split; stationDash FAIL; FR space before “;”; S6: EN “the natural history museum” aligned to FR “Muséum national d’histoire naturelle”; both now name Rue Censier and Rue Daubenton (avoids T21 « deux rues voisines »).

### les-gobelins/etymology/fr
- Before: La station doit son nom à la manufacture de tapisseries et à l’avenue, dont le nom vient de la famille de teinturiers Gobelin. Jehan Gobelin fonde un atelier au XVe siècle ; ses descendants s’installent au bord de la Bièvre.
- After: La station doit son nom à la manufacture de tapisseries et à l’avenue, dont le nom vient de la famille de teinturiers Gobelin. Jehan Gobelin fonde un atelier au XVe siècle ; ses descendants s’installent au bord de la Bièvre.
- Reason: FR typography FAIL: U+202F before “;”.

### place-ditalie/context/en
- Before: Lines 5, 6 and 7 meet below this major road junction. The platforms initially belonged to Line 10 in 1930 and transferred to Line 7 in 1931, when the new tunnel beneath the Seine connected the northern and southern sections.
- After: Lines 5, 6 and 7 meet below this major road junction. The Line 7 platforms first belonged to Line 10 in 1930. They transferred to Line 7 in 1931, when the new tunnel beneath the Seine connected the northern and southern sections.
- Reason: 29-word sentence split (S5).

### maison-blanche/etymology/en
- Before: Called Maison Blanche after the surrounding district, which took its name from an inn called “Maison Blanche”, meaning “white house”.
- After: Called Maison Blanche after the surrounding district. The district took its name from an inn called “Maison Blanche”, French for “white house”.
- Reason: EN T3 tail clause (“, meaning “white house””); FR calque « nommé d’après » (T19). FR guillemets with U+00A0. Line 7 owns this shared etymology (Line 14 to sync).

### maison-blanche/etymology/fr
- Before: La station doit son nom au quartier de la Maison-Blanche, lui-même nommé d’après une auberge appelée Maison Blanche.
- After: La station doit son nom au quartier de la Maison-Blanche. Ce quartier tient son nom d’une auberge appelée « Maison Blanche ».
- Reason: EN T3 tail clause (“, meaning “white house””); FR calque « nommé d’après » (T19). FR guillemets with U+00A0. Line 7 owns this shared etymology (Line 14 to sync).

### maison-blanche/context/fr
- Before: Maison Blanche est la dernière station commune aux deux branches sud de la ligne 7. Au-delà, les voies se séparent vers Mairie d’Ivry et Villejuif. La branche vers Le Kremlin-Bicêtre ouvre en 1982 ; la ligne 14 ajoute une correspondance en 2024.
- After: Maison Blanche est la dernière station commune aux deux branches sud de la ligne 7. Au-delà, les voies se séparent vers Mairie d’Ivry et Villejuif. La branche vers Le Kremlin-Bicêtre ouvre en 1982 ; la ligne 14 ajoute une correspondance en 2024.
- Reason: FR typography FAIL: U+202F before “;”.

### porte-ditalie/etymology/fr
- Before: La station doit son nom à l’ancienne porte fortifiée située sur la route vers l’Italie. Cette porte appartenait à l’enceinte de Thiers ; la route se poursuivait vers le sud sur l’axe devenu la route nationale 7.
- After: La station doit son nom à l’ancienne porte fortifiée située sur la route vers l’Italie. Cette porte appartenait à l’enceinte de Thiers ; la route se poursuivait vers le sud sur l’axe devenu la route nationale 7.
- Reason: FR typography FAIL: U+202F before “;”.

### pierre-et-marie-curie/etymology/en
- Before: Called Pierre et Marie Curie to honour the two physicists. The original name, Pierre Curie, came from the nearby street; Marie’s name was added to the station in 2007 to recognise her work as well.
- After: Called Pierre et Marie Curie to honour the two physicists. The original name, Pierre Curie, came from the nearby street; Marie’s name was added in 2007 to honour her scientific work too.
- Reason: FR: 26-word sentence split and space before “;” removed. EN: T2 (jev) on “to recognise her work as well”; aligned with FR « honorer aussi son travail scientifique ».

### pierre-et-marie-curie/etymology/fr
- Before: La station doit son nom aux physiciens Pierre et Marie Curie. Le nom initial, Pierre Curie, venait de la rue voisine ; celui de Marie est ajouté à la station en 2007 pour honorer également son travail scientifique.
- After: La station doit son nom aux physiciens Pierre et Marie Curie. Le nom initial, Pierre Curie, venait de la rue voisine. Celui de Marie est ajouté en 2007 pour honorer aussi son travail scientifique.
- Reason: FR: 26-word sentence split and space before “;” removed. EN: T2 (jev) on “to recognise her work as well”; aligned with FR « honorer aussi son travail scientifique ».

### le-kremlin-bicetre/etymology/en
- Before: Called Le Kremlin-Bicêtre after the town. Bicêtre evolved from Winchester, the bishopric of a medieval owner; Kremlin recalls an inn associated with veterans of Napoleon’s Russian campaign who were treated at the local hospital.
- After: Called Le Kremlin-Bicêtre after the town. Bicêtre evolved from Winchester: Jean de Pontoise, a medieval Bishop of Winchester, built a castle here. Kremlin recalls an inn associated with veterans of Napoleon’s Russian campaign, treated at the local hospital.
- Reason: 28-word sentences split; S2 vague “a medieval owner” (the rubric’s own example) replaced by the named bishop; FR space before “;”. FACT ADDED: Jean de Pontoise, Bishop of Winchester, built a castle here. Source: https://www.kremlinbicetre.fr/ma-ville/decouvrir-le-kremlin-bicetre/lhistoire-du-kremlin-bicetre-dont-archives/ (« Jean de Pontoise, évêque de Winchester », castle; Winchester → Vincestre → Bichestre → Bicêtre).

### le-kremlin-bicetre/etymology/fr
- Before: La station doit son nom à la commune. Bicêtre est une déformation de Winchester, évêché d’un propriétaire médiéval ; Kremlin rappelle un cabaret associé aux vétérans de la campagne de Russie de Napoléon, soignés à l’hôpital voisin.
- After: La station doit son nom à la commune. Bicêtre est une déformation de Winchester : Jean de Pontoise, évêque médiéval de Winchester, y fit construire un château. Kremlin rappelle un cabaret associé aux vétérans de la campagne de Russie de Napoléon, soignés à l’hôpital voisin.
- Reason: 28-word sentences split; S2 vague “a medieval owner” (the rubric’s own example) replaced by the named bishop; FR space before “;”. FACT ADDED: Jean de Pontoise, Bishop of Winchester, built a castle here. Source: https://www.kremlinbicetre.fr/ma-ville/decouvrir-le-kremlin-bicetre/lhistoire-du-kremlin-bicetre-dont-archives/ (« Jean de Pontoise, évêque de Winchester », castle; Winchester → Vincestre → Bichestre → Bicêtre).

### le-kremlin-bicetre/context/en
- Before: The station opened in 1982 as the first terminus of Line 7’s new southern branch. Trains reached Villejuif in 1985, turning it into a through station. The junction with the Ivry branch remains just south of Maison Blanche.
- After: Le Kremlin-Bicêtre was the first terminus of Line 7’s new southern branch when it opened in 1982. Trains reached Villejuif in 1985, and the station became a through station. The junction with the Ivry branch lies just south of Maison Blanche.
- Reason: EN T3 tail clause (“, turning it into a through station”); T20 template opener (“The station opened”, « La station ouvre »); “remains” / « reste » persistence filler; FR space before “;”. EN “just south” now also in FR (« juste au sud »).

### le-kremlin-bicetre/context/fr
- Before: La station ouvre en 1982 comme premier terminus de la nouvelle branche sud de la ligne 7. Les trains atteignent Villejuif en 1985 ; elle devient alors une station de passage. La bifurcation avec la branche d’Ivry reste au sud de Maison Blanche.
- After: Le Kremlin-Bicêtre est le premier terminus de la nouvelle branche sud de la ligne 7 à son ouverture en 1982. Les trains atteignent Villejuif en 1985 et la station devient alors une station de passage. La bifurcation avec la branche d’Ivry se trouve juste au sud de Maison Blanche.
- Reason: EN T3 tail clause (“, turning it into a through station”); T20 template opener (“The station opened”, « La station ouvre »); “remains” / « reste » persistence filler; FR space before “;”. EN “just south” now also in FR (« juste au sud »).

### villejuif-leo-lagrange/etymology/en
- Before: Called Villejuif–Léo Lagrange because it serves Villejuif and honours Léo Lagrange, the Socialist lawyer and politician.
- After: Called Villejuif – Léo Lagrange because it serves Villejuif and honours Léo Lagrange, the Socialist lawyer and politician.
- Reason: stationDash FAIL.

### villejuif-paul-vaillant-couturier/etymology/en
- Before: Called Villejuif–Paul Vaillant-Couturier after the town and nearby Avenue Paul-Vaillant-Couturier. The avenue honours the Communist journalist and deputy who became editor of L’Humanité.
- After: Called Villejuif – Paul Vaillant-Couturier after the town and nearby Avenue Paul-Vaillant-Couturier. The avenue honours the Communist journalist and deputy who became editor of L’Humanité.
- Reason: stationDash FAIL.

### villejuif-louis-aragon/etymology/en
- Before: Called Villejuif–Louis Aragon after the town and a nearby road named for the French writer Louis Aragon.
- After: Called Villejuif – Louis Aragon after the town and a nearby road named for the French writer Louis Aragon.
- Reason: stationDash FAIL.

### villejuif-louis-aragon/context/fr
- Before: Le terminus ouvre en 1985 lorsque la branche dépasse Le Kremlin-Bicêtre et traverse Villejuif. Il constitue l’une des deux extrémités sud de la ligne 7, avec Mairie d’Ivry. Les deux itinéraires partagent les stations au nord de Maison Blanche.
- After: Le terminus ouvre en 1985 lorsque la branche dépasse Le Kremlin-Bicêtre et traverse Villejuif. C’est l’une des deux extrémités sud de la ligne 7, avec Mairie d’Ivry. Les deux itinéraires partagent les stations au nord de Maison Blanche.
- Reason: T8 « constitue » → « C’est ».


## Review (fact preservation, 2026-10-05)

Reviewed all 46 changed units against `git show HEAD:apps/web/src/data/line7.ts` and the cited sources.

Sources checked:
- Rue du Château-Landon (fr.wikipedia): states that Charles Sellier showed in 1900 that the house of “le dénommé Landon” gave the name. Confirmed.
- Château-Landon (métro de Paris) (fr.wikipedia): passage created during the 1931 renovation of Gare de l’Est, first for luggage and parcels, converted into a « couloir de correspondance » when luggage handling was reformed. Confirmed.
- Cadet (métro de Paris) (fr.wikipedia): « proviendrait » (hedge kept), decoration chosen because of Rue La Fayette, general « ayant combattu aux côtés des Américains », white shapes represent the stars of the flag. Confirmed.
- kremlinbicetre.fr history page: Jean de Pontoise, Bishop of Winchester, bought the ruins in 1286 and built a castle; Winchester became Bicêtre. Confirmed (fr.wikipedia Le Kremlin-Bicêtre says the same).
- Line summary: 38 stations and 4 Porte stations counted in line7.ts. Confirmed.
- imageAlt: checked against `apps/web/public/illustrations/line-7.webp`. Description matches.

Typography: all new FR “;” have U+202F before them; « Maison Blanche » has U+00A0 inside the guillemets. Station names in prose use the spaced en dash.

Fixed:
- pont-neuf/etymology/en: “The name means “new bridge”, but it is now the oldest surviving bridge” made “it” refer to the name, not the bridge. Now: “Despite its name, which means “new bridge”, it is now the oldest surviving bridge in Paris. It was built without houses and with pavements for pedestrians.” This also matches FR « Malgré son nom ».

No facts were lost or changed in the other units.

# Line 4 copy changes

Evaluator runs: `apps/web/scripts/copy/out/line4-before/` and `apps/web/scripts/copy/out/line4-after/` (stations), `apps/web/scripts/copy/out/line4-after-line/` (line copy).

Station units, before → after: mean composite 0.875 → 0.921; bands ship/edit/rewrite 80/34/2 → 114/2/0; hard failures 0 → 0. Line summary: EN 0.69 → 0.94, FR 0.80 → 0.94 (before values from baseline2).

FR typography: every plain space before ";" became U+202F and before ":" became U+00A0 in the file.

## simplon/context/en

- Before: Napoleon ordered a road across the pass. A railway tunnel beneath the Simplon opened in 1906, two years before this Métro station opened in Paris.
- After: Napoleon had a road built across the Simplon Pass in 1807, and a railway tunnel beneath it opened in 1906. On the night of 20 to 21 April 1944, an Allied air raid on the La Chapelle depot hit the station. Its vault fell onto the track and platforms.
- Reason: Removed the filler "two years before this Métro station opened" (rubric 4.5 filler; the opening year is not otherwise needed) and the opening noun phrase "the pass" that referred only to the etymology. Added two verified facts: the Napoleon road date (1807) and the 1944 Allied air raid that brought down the station vault (station-specific, S7). Kept the 1906 tunnel.
- Source: https://fr.wikipedia.org/wiki/Simplon_(m%C3%A9tro_de_Paris)

## simplon/context/fr

- Before: Napoléon fait aménager une route par le col. Un tunnel ferroviaire sous le Simplon ouvre en 1906, deux ans avant la station de métro parisienne.
- After: Napoléon fait construire une route par le col du Simplon en 1807, et un tunnel ferroviaire le traverse depuis 1906. Dans la nuit du 20 au 21 avril 1944, un bombardement allié visant le dépôt de La Chapelle touche la station. Sa voûte s’effondre sur la voie et les quais.
- Reason: Removed the filler "two years before this Métro station opened" (rubric 4.5 filler; the opening year is not otherwise needed) and the opening noun phrase "the pass" that referred only to the etymology. Added two verified facts: the Napoleon road date (1807) and the 1944 Allied air raid that brought down the station vault (station-specific, S7). Kept the 1906 tunnel.
- Source: https://fr.wikipedia.org/wiki/Simplon_(m%C3%A9tro_de_Paris)

## marcadet-poissonniers/etymology/fr

- Before: La station réunit les noms de deux rues voisines. Marcadet rappelle un ancien lieu de marché ; Poissonniers évoque les marchands qui acheminaient le poisson des côtes du nord vers les halles de Paris.
- After: La station réunit les noms de deux rues voisines. Marcadet rappelle un ancien lieu de marché ; Poissonniers évoque les marchands qui acheminaient le poisson des côtes du nord vers les halles de Paris.
- Reason: Typography only: U+202F before ";".

## marcadet-poissonniers/context/fr

- Before: Marcadet et Poissonniers étaient deux stations distinctes, exploitées par des compagnies concurrentes. Un couloir les relie en 1931 : leurs deux noms sont alors réunis.
- After: Marcadet et Poissonniers étaient deux stations distinctes, exploitées par des compagnies concurrentes. Un couloir les relie en 1931 : leurs deux noms sont alors réunis.
- Reason: Typography only: U+00A0 before ":".

## chateau-rouge/context/en

- Before: The house was probably built in the late eighteenth century. Its exact construction date is uncertain, but its name survived in the square and surrounding neighbourhood.
- After: Works from July 2014 to July 2017 enlarged the ticket hall and added a third entrance, on Rue Custine. The Château Rouge house itself was probably built in the late eighteenth century.
- Reason: Second sentence was filler (S4=0: restated uncertainty and that the name survived, which the etymology already says). Removed it. Added a verified station-specific fact (2014–2017 works, third entrance on Rue Custine). Kept the house date with its hedge ("probably"; FR "aurait été" became "a probablement été" to keep the same hedge and avoid the T7 reading).
- Source: https://fr.wikipedia.org/wiki/Ch%C3%A2teau_Rouge_(m%C3%A9tro_de_Paris)

## chateau-rouge/context/fr

- Before: La demeure aurait été construite à la fin du XVIIIe siècle. Sa date exacte reste incertaine, mais son nom a survécu dans celui de la place et du quartier.
- After: De juillet 2014 à juillet 2017, des travaux agrandissent la salle d’échanges et ajoutent un troisième accès, rue Custine. La demeure du Château Rouge a probablement été construite à la fin du XVIIIe siècle.
- Reason: Second sentence was filler (S4=0: restated uncertainty and that the name survived, which the etymology already says). Removed it. Added a verified station-specific fact (2014–2017 works, third entrance on Rue Custine). Kept the house date with its hedge ("probably"; FR "aurait été" became "a probablement été" to keep the same hedge and avoid the T7 reading).
- Source: https://fr.wikipedia.org/wiki/Ch%C3%A2teau_Rouge_(m%C3%A9tro_de_Paris)

## gare-de-lest/etymology/fr

- Before: La station porte le nom de la gare de l’Est, qu’elle dessert. La gare ferroviaire adopte ce nom en 1854, lorsque son réseau s’étend au-delà de Strasbourg.
- After: La station porte le nom de la gare de l’Est, qu’elle dessert, terminus ferroviaire vers l’est de la France. La gare ferroviaire adopte ce nom en 1854, lorsque son réseau s’étend au-delà de Strasbourg.
- Reason: Parity: FR did not say the station serves the terminus for eastern France (EN fact). Added it to FR.

## strasbourg-saint-denis/etymology/fr

- Before: La station réunit les noms des boulevards du carrefour. Strasbourg rappelle la destination du chemin de fer voisin ; Saint-Denis, l’ancienne route vers la ville portant le nom du premier évêque de Paris.
- After: La station réunit les noms des boulevards du carrefour. Strasbourg rappelle la destination du chemin de fer voisin ; Saint-Denis, l’ancienne route vers la ville portant le nom du premier évêque de Paris.
- Reason: Typography only: U+202F before ";".

## reaumur-sebastopol/etymology/fr

- Before: La station porte les noms de la rue et du boulevard qui se croisent ici. Réaumur honore le physicien et naturaliste René-Antoine Ferchault de Réaumur ; Sébastopol rappelle la prise du port de Crimée en 1855.
- After: La station porte les noms de la rue et du boulevard qui se croisent ici. Réaumur honore le physicien et naturaliste René-Antoine Ferchault de Réaumur ; Sébastopol rappelle la prise du port de Crimée en 1855.
- Reason: Typography only: U+202F before ";".

## etienne-marcel/etymology/en

- Before: Called Étienne Marcel after the nearby street honouring a fourteenth-century provost of the merchants of Paris. This office made Marcel a leading figure in the city’s government.
- After: Called Étienne Marcel after the nearby street honouring a fourteenth-century provost of the merchants of Paris. Marcel took this office in 1354; it gave him jurisdiction over river trade in Paris.
- Reason: Second sentence only judged Marcel ("a leading figure", S2 low). Replaced with verified, concrete facts: he took the office in 1354 and it gave jurisdiction over river trade.
- Source: https://fr.wikipedia.org/wiki/%C3%89tienne_Marcel

## etienne-marcel/etymology/fr

- Before: La station porte le nom de la rue Étienne-Marcel, dédiée à un prévôt des marchands de Paris du XIVe siècle. Cette fonction faisait de Marcel une figure majeure du gouvernement de la ville.
- After: La station porte le nom de la rue Étienne-Marcel, dédiée à un prévôt des marchands de Paris du XIVe siècle. Marcel devient prévôt en 1354 ; cette charge lui donne autorité sur le commerce fluvial parisien.
- Reason: Second sentence only judged Marcel ("a leading figure", S2 low). Replaced with verified, concrete facts: he took the office in 1354 and it gave jurisdiction over river trade.
- Source: https://fr.wikipedia.org/wiki/%C3%89tienne_Marcel

## etienne-marcel/context/en

- Before: Marcel played a prominent role in the Estates General of 1355 and 1357. His political career ended violently with his death in Paris in 1358.
- After: At the Estates General of 1355, Marcel was a leading representative of the towns. In 1357 he backed the Grande Ordonnance, which placed royal finances under the oversight of the Estates. He was killed in Paris in 1358.
- Reason: Removed "played a prominent role" / "joue un rôle important" (T2/T8) and "ended violently" (vague, S2). Replaced with what the source states: leading representative of the towns at the 1355 Estates General, backed the Grande Ordonnance of 1357 (oversight of royal finances), killed in Paris in 1358.
- Source: https://fr.wikipedia.org/wiki/%C3%89tienne_Marcel

## etienne-marcel/context/fr

- Before: Marcel joue un rôle important aux États généraux de 1355 et de 1357. Sa carrière politique s’achève dans la violence, avec sa mort à Paris en 1358.
- After: Aux États généraux de 1355, Marcel est l’un des principaux représentants des villes. En 1357, il soutient la Grande Ordonnance, qui place les finances royales sous le contrôle des états. Il est tué à Paris en 1358.
- Reason: Removed "played a prominent role" / "joue un rôle important" (T2/T8) and "ended violently" (vague, S2). Replaced with what the source states: leading representative of the towns at the 1355 Estates General, backed the Grande Ordonnance of 1357 (oversight of royal finances), killed in Paris in 1358.
- Source: https://fr.wikipedia.org/wiki/%C3%89tienne_Marcel

## chatelet/context/en

- Before: The Grand Châtelet guarded the northern approach to the Pont au Change. Its demolition began in 1802, leaving its name attached to the new square.
- After: The Grand Châtelet guarded the northern approach to the Pont au Change. Its demolition began in 1802.
- Reason: Removed T3 tail clause "leaving its name attached to the new square" / FR equivalent. The removed clause duplicated the etymology (square on the site of the Grand Châtelet). FR typography fixed by the removal.

## chatelet/context/fr

- Before: Le Grand Châtelet gardait l’accès nord du pont au Change. Sa démolition commence en 1802 ; son nom reste alors attaché à la nouvelle place.
- After: Le Grand Châtelet gardait l’accès nord du pont au Change. Sa démolition commence en 1802.
- Reason: Removed T3 tail clause "leaving its name attached to the new square" / FR equivalent. The removed clause duplicated the etymology (square on the site of the Grand Châtelet). FR typography fixed by the removal.

## cite/context/en

- Before: It is the only Métro station beneath an island. Line 4 crosses both arms of the Seine here, with Châtelet on one bank and Saint-Michel on the other.
- After: Cité is the only Métro station beneath an island. Line 4 crosses both arms of the Seine here, with Châtelet on one bank and Saint-Michel on the other.
- Reason: EN opened with "It" (opening pronoun, S5 level 1). Named the station in both locales.

## cite/context/fr

- Before: C’est la seule station du métro située sous une île. La ligne 4 traverse ici les deux bras de la Seine, entre Châtelet sur une rive et Saint-Michel sur l’autre.
- After: Cité est la seule station du métro située sous une île. La ligne 4 traverse ici les deux bras de la Seine, entre Châtelet sur une rive et Saint-Michel sur l’autre.
- Reason: EN opened with "It" (opening pronoun, S5 level 1). Named the station in both locales.

## odeon/context/en

- Before: The theatre opened in 1782. Its monumental columns and pediment reflect the neoclassical architecture of Charles de Wailly and Marie-Joseph Peyre, who designed the building.
- After: The Odéon theatre opened in 1782. Charles de Wailly and Marie-Joseph Peyre designed the neoclassical building, with its columns and pediment.
- Reason: Removed "monumental" and "reflect"/"illustrent" (T2/T4 flags). Plain statement that the two architects designed the neoclassical building. Named the theatre in the first sentence so the field reads on its own.

## odeon/context/fr

- Before: Le théâtre ouvre en 1782. Ses colonnes monumentales et son fronton illustrent l’architecture néoclassique de Charles de Wailly et Marie-Joseph Peyre, les deux concepteurs du bâtiment.
- After: Le théâtre de l’Odéon ouvre en 1782. Charles de Wailly et Marie-Joseph Peyre ont conçu ce bâtiment néoclassique, avec ses colonnes et son fronton.
- Reason: Removed "monumental" and "reflect"/"illustrent" (T2/T4 flags). Plain statement that the two architects designed the neoclassical building. Named the theatre in the first sentence so the field reads on its own.

## saint-germain-des-pres/etymology/fr

- Before: La station porte le nom de l’église et de la place voisines. Germain était évêque de Paris au VIe siècle ; « des Prés » rappelle les prairies qui entouraient autrefois l’abbaye.
- After: La station porte le nom de l’église et de la place voisines. Germain était évêque de Paris au VIe siècle ; « des Prés » rappelle les prairies qui entouraient autrefois l’abbaye.
- Reason: Typography only: U+202F before ";" and U+00A0 inside « ».

## saint-germain-des-pres/context/fr

- Before: L’abbaye est d’abord dédiée à Sainte-Croix et à Saint-Vincent. La sépulture de Germain, en 576, contribue à en faire un lieu de pèlerinage ; son nom remplace progressivement la dédicace initiale.
- After: L’abbaye est d’abord dédiée à Sainte-Croix et à Saint-Vincent. La sépulture de Germain, en 576, contribue à en faire un lieu de pèlerinage ; son nom remplace progressivement la dédicace initiale.
- Reason: Typography only: U+202F before ";".

## saint-sulpice/context/en

- Before: Construction of the present church began in 1646 to replace a smaller medieval building. Work continued intermittently for more than a century, involving several architects.
- After: Construction of the present Saint-Sulpice church began in 1646. It replaced a medieval building that had become too small. Several architects worked on it in turn, with interruptions, over a century and more.
- Reason: Removed T3 tail clause "involving several architects" and the T5 match "more than a". Split into short sentences. EN now says the medieval building "had become too small", as FR already did (parity).

## saint-sulpice/context/fr

- Before: La construction de l’église actuelle commence en 1646 pour remplacer un édifice médiéval devenu trop petit. Plusieurs architectes se succèdent sur ce chantier, poursuivi par étapes pendant plus d’un siècle.
- After: La construction de l’église Saint-Sulpice actuelle commence en 1646. Elle remplace un édifice médiéval devenu trop petit. Plusieurs architectes se succèdent sur ce chantier, mené par étapes pendant plus d’un siècle.
- Reason: Removed T3 tail clause "involving several architects" and the T5 match "more than a". Split into short sentences. EN now says the medieval building "had become too small", as FR already did (parity).

## saint-placide/context/en

- Before: Its original name was Vaugirard, after Rue de Vaugirard. When another Vaugirard station opened on today’s Line 12, this stop needed a name of its own.
- After: Opened in 1910, the station was first called Vaugirard, after Rue de Vaugirard. Another Vaugirard station opened on what is now Line 12, so this stop needed a different name.
- Reason: Fields opened with "Its"/"Elle" (opening pronoun, S5 level 1). Added the verified opening year (1910) as the opener; removed the T19-style « a conduit à choisir ».
- Source: https://fr.wikipedia.org/wiki/Saint-Placide_(m%C3%A9tro_de_Paris)

## saint-placide/context/fr

- Before: Elle s’appelait d’abord Vaugirard, comme la rue voisine. L’ouverture d’une autre station Vaugirard sur l’actuelle ligne 12 a conduit à choisir un nom différent pour cet arrêt.
- After: Ouverte en 1910, la station s’appelait d’abord Vaugirard, comme la rue voisine. L’ouverture d’une autre station Vaugirard, sur l’actuelle ligne 12, impose ensuite un nom différent.
- Reason: Fields opened with "Its"/"Elle" (opening pronoun, S5 level 1). Added the verified opening year (1910) as the opener; removed the T19-style « a conduit à choisir ».
- Source: https://fr.wikipedia.org/wiki/Saint-Placide_(m%C3%A9tro_de_Paris)

## montparnasse-bienvenue/etymology/en

- Before: Called Montparnasse – Bienvenüe after the railway district and Métro engineer Fulgence Bienvenüe. Montparnasse began as a joking reference to Mount Parnassus, the Greek mountain associated with poetry.
- After: Called Montparnasse – Bienvenüe after the railway district and Métro engineer Fulgence Bienvenüe. Montparnasse began as a students’ joke: they gave the name of Mount Parnassus, the Greek mountain associated with poetry, to a local heap of rubble.
- Reason: Moved the students and rubble-heap fact (already in this entry's context) into the etymology, where it explains the name. No new fact.

## montparnasse-bienvenue/etymology/fr

- Before: La station associe le nom du quartier de la gare à celui de l’ingénieur Fulgence Bienvenüe. Montparnasse vient d’une référence plaisante au mont Parnasse, montagne grecque associée à la poésie.
- After: La station associe le nom du quartier de la gare à celui de l’ingénieur Fulgence Bienvenüe. Montparnasse vient d’une plaisanterie d’étudiants, qui avaient donné à une butte de gravats le nom du mont Parnasse, montagne grecque associée à la poésie.
- Reason: Moved the students and rubble-heap fact (already in this entry's context) into the etymology, where it explains the name. No new fact.

## montparnasse-bienvenue/context/en

- Before: Students gave that grand name to a local heap of rubble. The present station joins two formerly separate stops, Montparnasse and Bienvenüe, whose names were combined in 1942.
- After: The present station joins two formerly separate stops, Montparnasse and Bienvenüe. Their names were combined in 1942.
- Reason: Context opened with "that grand name" / « ce nom prestigieux » (T4 flag, and a referent only in the etymology). That fact moved to the etymology. Context now gives only the station merger and the 1942 name, split into two sentences.

## montparnasse-bienvenue/context/fr

- Before: Des étudiants avaient donné ce nom prestigieux à une butte de gravats. La station actuelle réunit deux anciens arrêts, Montparnasse et Bienvenüe, dont les noms sont associés en 1942.
- After: La station actuelle réunit deux arrêts autrefois distincts, Montparnasse et Bienvenüe. Leurs noms sont associés en 1942.
- Reason: Context opened with "that grand name" / « ce nom prestigieux » (T4 flag, and a referent only in the etymology). That fact moved to the etymology. Context now gives only the station merger and the 1942 name, split into two sentences.

## vavin/context/en

- Before: He continued to serve as a representative after the revolution of 1848, during the Second Republic.
- After: Alexis Vavin continued to serve as a representative during the Second Republic, after the revolution of 1848. The station opened on 9 January 1910. During the Seine flood that month, it served as the terminus for trains from Porte d’Orléans from 24 January.
- Reason: EN opened with "He" (S5 level 1); FR "au sein des assemblées" was vague (S2). Named Alexis Vavin and kept the Second Republic fact. Added a verified station-specific fact: opened 9 January 1910 and was the terminus from Porte d’Orléans during the 1910 Seine flood, from 24 January.
- Source: https://fr.wikipedia.org/wiki/Vavin_(m%C3%A9tro_de_Paris)

## vavin/context/fr

- Before: Après la révolution de 1848, Vavin poursuit son activité de représentant au sein des assemblées de la Deuxième République.
- After: Après la révolution de 1848, Alexis Vavin siège encore comme représentant sous la Deuxième République. La station ouvre le 9 janvier 1910. Pendant la crue de la Seine de ce mois, elle sert de terminus aux trains venant de Porte d’Orléans à partir du 24 janvier.
- Reason: EN opened with "He" (S5 level 1); FR "au sein des assemblées" was vague (S2). Named Alexis Vavin and kept the Second Republic fact. Added a verified station-specific fact: opened 9 January 1910 and was the terminus from Porte d’Orléans during the 1910 Seine flood, from 24 January.
- Source: https://fr.wikipedia.org/wiki/Vavin_(m%C3%A9tro_de_Paris)

## raspail/context/en

- Before: In February 1848, Raspail led a delegation to Paris City Hall to demand an immediate proclamation of the Republic from the provisional government.
- After: The Line 4 and Line 6 platforms run parallel, on the same level. In February 1848, François-Vincent Raspail led a delegation to Paris City Hall to demand an immediate proclamation of the Republic from the provisional government.
- Reason: Added a verified station-specific fact (Line 4 and Line 6 platforms parallel, on the same level) before the namesake fact. Full name used for clarity.
- Source: https://fr.wikipedia.org/wiki/Raspail_(m%C3%A9tro_de_Paris)

## raspail/context/fr

- Before: En février 1848, Raspail conduit une délégation à l’Hôtel de Ville de Paris pour exiger du gouvernement provisoire la proclamation immédiate de la République.
- After: Les quais des lignes 4 et 6 sont parallèles et situés au même niveau. En février 1848, François-Vincent Raspail conduit une délégation à l’Hôtel de Ville de Paris pour exiger du gouvernement provisoire la proclamation immédiate de la République.
- Reason: Added a verified station-specific fact (Line 4 and Line 6 platforms parallel, on the same level) before the namesake fact. Full name used for clarity.
- Source: https://fr.wikipedia.org/wiki/Raspail_(m%C3%A9tro_de_Paris)

## mouton-duvernet/etymology/fr

- Before: La station porte le nom de la rue dédiée au général Régis Barthélemy Mouton-Duvernet. Il sert pendant la Révolution et l’Empire, avant d’être fusillé à Lyon en 1816.
- After: La station porte le nom de la rue dédiée au général Régis Barthélemy Mouton-Duvernet. Ce militaire sert sous la Révolution et l’Empire. Il est fusillé à Lyon en 1816.
- Reason: One sentence stacked clauses (S5 0.45). Split into two sentences. Same facts.

## mouton-duvernet/context/en

- Before: The station later gave its own name to a Métro decorating style. Its orange tiles, introduced in 1969, became a model for other stations.
- After: This station gave its name to the “Mouton style” of orange tiles, first installed here early in 1969. Twenty other stations were then decorated on this model. The station lost its orange tiles on 13 March 2007.
- Reason: FR "sert de modèle" was a T8 flag; EN "became a model" was formal (S3). Rewritten with verified facts from the station article: the style was nicknamed "style Mouton", first installed here early in 1969, 20 other stations followed, orange tiles removed on 13 March 2007. "Introduced in 1969" became "early in 1969" (source: « au début de 1969 »).
- Source: https://fr.wikipedia.org/wiki/Mouton-Duvernet_(m%C3%A9tro_de_Paris)

## mouton-duvernet/context/fr

- Before: La station a ensuite donné son propre nom à un décor du métro. Son carrelage orange, installé en 1969, sert de modèle à d’autres stations.
- After: Cette station a donné son nom au « style Mouton », un carrelage orange posé ici pour la première fois début 1969. Vingt autres stations sont ensuite décorées sur ce modèle. La station perd son carrelage orange le 13 mars 2007.
- Reason: FR "sert de modèle" was a T8 flag; EN "became a model" was formal (S3). Rewritten with verified facts from the station article: the style was nicknamed "style Mouton", first installed here early in 1969, 20 other stations followed, orange tiles removed on 13 March 2007. "Introduced in 1969" became "early in 1969" (source: « au début de 1969 »).
- Source: https://fr.wikipedia.org/wiki/Mouton-Duvernet_(m%C3%A9tro_de_Paris)

## alesia/etymology/en

- Before: Called Alésia after Rue d’Alésia, named for the Gallic stronghold where Julius Caesar defeated Vercingetorix in 52 BC. The battle took place in Burgundy, far from this Paris street.
- After: Called Alésia after Rue d’Alésia, named for the Gallic stronghold where Julius Caesar defeated Vercingetorix in 52 BC. The battle took place in Burgundy.
- Reason: FR did not have "far from this Paris street" (parity flag). The phrase is filler, so it was removed from EN.

## alesia/context/en

- Before: At Alise-Sainte-Reine, archaeological remains trace the siege. Roman fortifications enclosed the Gallic forces while a second line of defences faced the army coming to relieve them.
- After: Archaeological remains of the siege lie at Alise-Sainte-Reine. Roman fortifications enclosed the Gallic forces, and a second line of defences faced the army coming to relieve them.
- Reason: Replaced "remains trace the siege" / « retracent le siège » (figurative) with a literal statement. FR: replaced ";" with a comma clause (removes the typography FAIL and matches EN).

## alesia/context/fr

- Before: À Alise-Sainte-Reine, les vestiges archéologiques retracent le siège. Les fortifications romaines encerclaient les Gaulois ; une seconde ligne de défense faisait face à l’armée venue les secourir.
- After: Les vestiges archéologiques du siège se trouvent à Alise-Sainte-Reine. Les fortifications romaines encerclaient les Gaulois, et une seconde ligne de défense faisait face à l’armée venue les secourir.
- Reason: Replaced "remains trace the siege" / « retracent le siège » (figurative) with a literal statement. FR: replaced ";" with a comma clause (removes the typography FAIL and matches EN).

## porte-dorleans/etymology/fr

- Before: La station porte le nom de l’ancienne porte de Paris située sur la route d’Orléans. Ce nom conserve la destination de la voie qui traversait les fortifications au sud de la capitale.
- After: La station porte le nom d’une ancienne porte des fortifications, au sud de Paris. Cette porte s’ouvrait sur la route d’Orléans.
- Reason: Second sentence was deletable (S4=0). Rewritten as two plain sentences with the same facts as EN (former gate in the southern fortifications, on the road to Orléans).

## mairie-de-montrouge/etymology/en

- Before: Called Mairie de Montrouge because it serves the town hall of Montrouge. Mairie means town hall.
- After: Called Mairie de Montrouge because it serves the town hall of Montrouge. Mairie means town hall. The origin of the name Montrouge is debated. The town gives two explanations: reddish soil on the plateau, or a local lord nicknamed Le Rouge.
- Reason: The origin of the name Montrouge was in the context, but it explains the station name, so it moved to the etymology (rule R7: context must give a separate fact). FR now opens with the R2 formula. "Its municipal history" became "The town" (the source is the town website). Hedge kept ("debated" / « discutée »). FR guillemets and ":" spacing fixed.
- Source: https://fr.wikipedia.org/wiki/Mairie_de_Montrouge_(m%C3%A9tro_de_Paris)

## mairie-de-montrouge/etymology/fr

- Before: La station s’appelle Mairie de Montrouge parce qu’elle dessert l’hôtel de ville.
- After: La station porte le nom de la mairie de Montrouge, qu’elle dessert. L’origine du nom Montrouge est discutée. La commune avance deux explications : la terre rougeâtre du plateau, ou un seigneur local surnommé « le Rouge ».
- Reason: The origin of the name Montrouge was in the context, but it explains the station name, so it moved to the etymology (rule R7: context must give a separate fact). FR now opens with the R2 formula. "Its municipal history" became "The town" (the source is the town website). Hedge kept ("debated" / « discutée »). FR guillemets and ":" spacing fixed.
- Source: https://fr.wikipedia.org/wiki/Mairie_de_Montrouge_(m%C3%A9tro_de_Paris)

## mairie-de-montrouge/context/en

- Before: The town’s own name remains debated. Its municipal history gives two explanations: reddish soil on the plateau, or a local lord nicknamed Le Rouge.
- After: The station opened on 23 March 2013 as the first stage of the extension of Line 4 to Bagneux. On 13 January 2022, the line was extended beyond it to Barbara and Bagneux – Lucie Aubrac.
- Reason: New context with verified station-specific facts: opened 23 March 2013 as the first stage of the extension to Bagneux; the line was extended beyond it to Barbara and Bagneux – Lucie Aubrac on 13 January 2022.
- Source: https://fr.wikipedia.org/wiki/Mairie_de_Montrouge_(m%C3%A9tro_de_Paris)

## mairie-de-montrouge/context/fr

- Before: L’origine du nom Montrouge reste discutée. L’histoire municipale présente deux explications : la terre rougeâtre du plateau, ou un seigneur local surnommé « le Rouge ».
- After: La station ouvre le 23 mars 2013, première étape du prolongement de la ligne 4 vers Bagneux. Le 13 janvier 2022, la ligne est prolongée au-delà, jusqu’à Barbara et Bagneux – Lucie Aubrac.
- Reason: New context with verified station-specific facts: opened 23 March 2013 as the first stage of the extension to Bagneux; the line was extended beyond it to Barbara and Bagneux – Lucie Aubrac on 13 January 2022.
- Source: https://fr.wikipedia.org/wiki/Mairie_de_Montrouge_(m%C3%A9tro_de_Paris)

## barbara/etymology/en

- Before: Called Barbara after the French singer and songwriter. She is buried in the nearby Parisian cemetery of Bagneux, which can be reached from the station’s southern exit.
- After: Called Barbara after the French singer and songwriter. She is buried in the Parisian cemetery of Bagneux, which is reached from the station’s southern exit.
- Reason: The evaluator moved this pair from ship to edit between runs (S5 on a 21-word clause). Removed the duplicated "nearby" / « situé à proximité » (the next clause says the cemetery is reached from the southern exit). Same facts.

## barbara/etymology/fr

- Before: La station porte le nom de Barbara, autrice-compositrice-interprète. Elle repose au cimetière parisien de Bagneux, situé à proximité et accessible depuis la sortie sud de la station.
- After: La station porte le nom de Barbara, autrice-compositrice-interprète. Elle repose au cimetière parisien de Bagneux, accessible depuis la sortie sud de la station.
- Reason: The evaluator moved this pair from ship to edit between runs (S5 on a 21-word clause). Removed the duplicated "nearby" / « situé à proximité » (the next clause says the cemetery is reached from the southern exit). Same facts.

## bagneux-lucie-aubrac/etymology/en

- Before: Called Bagneux – Lucie Aubrac to identify the town and honour a member of the French Resistance. Aubrac fought against the Nazi occupation and continued to campaign for peace after the war.
- After: Called Bagneux – Lucie Aubrac after the town it serves and Lucie Aubrac (1912–2007). A history teacher, communist activist and pacifist, she was a member of the Resistance during the Second World War.
- Reason: Removed vague phrases ("identify the town", "continued to campaign for peace", S2) and the T2 reading. Replaced with what the station article states: Lucie Aubrac (1912–2007), history teacher, communist activist, pacifist and résistante in the Second World War. "Fought against the Nazi occupation" is covered by "member of the Resistance"; "campaign for peace after the war" became "pacifist", which is what the source says.
- Source: https://fr.wikipedia.org/wiki/Bagneux_-_Lucie_Aubrac_(m%C3%A9tro_de_Paris)

## bagneux-lucie-aubrac/etymology/fr

- Before: La station associe le nom de Bagneux à celui de Lucie Aubrac, figure de la Résistance. Elle lutte contre l’occupation nazie puis poursuit, après la guerre, son engagement pour la paix.
- After: La station porte le nom de la commune de Bagneux et celui de Lucie Aubrac (1912–2007). Professeure d’histoire, militante communiste et pacifiste, elle est résistante pendant la Seconde Guerre mondiale.
- Reason: Removed vague phrases ("identify the town", "continued to campaign for peace", S2) and the T2 reading. Replaced with what the station article states: Lucie Aubrac (1912–2007), history teacher, communist activist, pacifist and résistante in the Second World War. "Fought against the Nazi occupation" is covered by "member of the Resistance"; "campaign for peace after the war" became "pacifist", which is what the source says.
- Source: https://fr.wikipedia.org/wiki/Bagneux_-_Lucie_Aubrac_(m%C3%A9tro_de_Paris)

## line/4/summary/en

- Before: City gates, old markets and the people behind 29 station names.
- After: Line 4 runs from Porte de Clignancourt to Bagneux – Lucie Aubrac. Its 29 station names recall city gates, old markets and people, such as the singer Barbara.
- Reason: L1 0.54: the summary named no route or example. Added the termini and one example station (Barbara). Kept the three themes and the count of 29.

## line/4/summary/fr

- Before: Portes de Paris, anciens marchés et figures qui ont donné leur nom à 29 stations.
- After: La ligne 4 relie Porte de Clignancourt à Bagneux – Lucie Aubrac. Ses 29 noms de stations rappellent des portes de Paris, d’anciens marchés et des personnes, comme la chanteuse Barbara.
- Reason: L1 0.54: the summary named no route or example. Added the termini and one example station (Barbara). Kept the three themes and the count of 29.

## Review

Reviewer: adversarial fact-preservation pass. All 50 changed units were compared with `HEAD`. Every added fact was checked against the cited fr.wikipedia page (Simplon, Château Rouge, Étienne Marcel, Saint-Placide, Vavin, Raspail, Mouton-Duvernet, Mairie de Montrouge, Bagneux – Lucie Aubrac). Each source states the added fact. EN and FR state the same facts in every changed unit. A scan of the FR strings found no ";", "!", "?", ":", "«" or "»" without the correct narrow or no-break space.

Fixed:

- saint-sulpice/context/en: "over a century and more" was unnatural English. Now: "Several architects worked on it in turn, in stages, for more than a century." This matches the FR text.
- vavin/context/en: "During the Seine flood that month, it served as the terminus … from 24 January" put the date at the end, far from the verb. Now: "From 24 January, during the Seine flood, it served as the terminus for trains from Porte d’Orléans."
- vavin/context/fr: "la crue de la Seine de ce mois" was unnatural French. Now: "À partir du 24 janvier, pendant la crue de la Seine, elle sert de terminus aux trains venant de Porte d’Orléans."

Not changed, noted:

- simplon/context: the source gives 1807 for the Napoleon road. Other sources give 1801–1805 for its construction. The text follows the cited source.
- chateau-rouge/context: the rewrite dropped "its exact construction date is uncertain" and "its name survived in the square and surrounding neighbourhood". The hedge "probably" stays, and the etymology still gives the square. The neighbourhood is no longer named.
- etienne-marcel/etymology: "a leading figure in the city’s government" became the 1354 date and jurisdiction over river trade. The source supports both. The general statement about his role in city government is gone.
- The typography note at the top of this file does not list U+00A0 inside « », which the rewrite also fixed.

## Fact check 2026-10-05

No confirmed errors on Line 4. Five claims are true but the cited sources did not support them. Each change below adds a source only. No station text changed, so word counts and shared etymologies did not change.

- porte-de-clignancourt/context (1860 annexation): added "Quartier de Clignancourt · Wikipédia". The station article gives only the law of 16 June 1859, which took effect on 1 January 1860. Evidence: « Le hameau de Clignancourt et la commune de Montmartre deviennent le quartier Clignancourt en 1860 ». https://fr.wikipedia.org/wiki/Quartier_de_Clignancourt
- chateau-deau/context (fountain moved to La Villette): added "Fontaine du Château-d’Eau · Wikipédia" and "Place de la République · Wikipédia". The station article does not name La Villette. Evidence: « En 1867, lors de la réorganisation de la place dirigée par Gabriel Davioud… elle fut jugée trop petite et fut déplacée dans la cour d’entrée du marché-abattoir de La Villette ». https://fr.wikipedia.org/wiki/Fontaine_du_Ch%C3%A2teau_d%27eau_(Pierre-Simon_Girard), https://fr.wikipedia.org/wiki/Place_de_la_R%C3%A9publique_(Paris)
- montparnasse-bienvenue/etymology (students named a rubble heap after Mount Parnassus): added "Quartier du Montparnasse · Wikipédia" and "Montparnasse · Wikipedia". The only other source (RATP heritage page) returns HTTP 403. Evidence: « colline artificielle de gravats qui a été arasée, surnommée « mont Parnasse » » and "they decided to baptise this mound Mount Parnassus". https://fr.wikipedia.org/wiki/Quartier_du_Montparnasse, https://en.wikipedia.org/wiki/Montparnasse
- saint-sulpice/context (several architects in turn): added "Église Saint-Sulpice · Wikipédia". The station article names only Gamard (1646–1788). The church article lists Gamard, Le Vau, Gittard, Oppenord, Servandoni, Maclaurin and Chalgrin. https://fr.wikipedia.org/wiki/%C3%89glise_Saint-Sulpice_de_Paris
- barbes-rochechouart/etymology (abbess of Montmartre, early eighteenth century): added "Marguerite de Rochechouart · Wikipédia" and "Boulevard Marguerite-de-Rochechouart · Wikipédia". The station article does not say she was abbess. Both articles say she was abbess of Montmartre from 1713 (other sources give 1717 or 1718) to her death in 1727. https://fr.wikipedia.org/wiki/Marguerite_de_Rochechouart, https://fr.wikipedia.org/wiki/Boulevard_Marguerite-de-Rochechouart

Porte de Clignancourt, Château d’Eau, Saint-Sulpice and Barbès – Rochechouart had no `sources` override, so each now has an explicit list with the station article first. Montparnasse – Bienvenüe already had an override without the station article; that was not changed.

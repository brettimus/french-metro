# Line 14 copy changes

Evaluator runs: `apps/web/scripts/copy/out/line14-before/`, `apps/web/scripts/copy/out/line14-after/` (stations) and `apps/web/scripts/copy/out/line14-after-line/` (line copy).

Other changes in `apps/web/src/data/line14.ts`:

- Source labels now read “X · Wikipédia” (CLEANUP.md item 10), including “Gare de Lyon · Wikipedia”.
- FR strings use U+00A0 before “:” and inside « », and U+202F before “;”, “!” and “?”.
- Shared etymologies owned by another line (pyramides, chatelet, gare-de-lyon, bercy, maison-blanche) are unchanged.

## line/14/summary

Reason: T12 false range (“From a piano factory to an airport”). Now names both termini and one concrete theme with an example station (L1 level 4). Facts (21 stations, 2022 consultation, Hôpital Bicêtre) come from this file. FR: removed plain space before colon.

- `line/14/summary/en`
  - Before: From a piano factory to an airport: the names of 21 stations across Greater Paris.
  - After: Line 14 runs through 21 stations from Saint-Denis – Pleyel, named after a piano factory district, to Aéroport d’Orly. Several names on the southern extension were chosen in 2022, such as Hôpital Bicêtre.
- `line/14/summary/fr`
  - Before: D’une manufacture de pianos à un aéroport : les noms de 21 stations à travers le Grand Paris.
  - After: La ligne 14 relie en 21 stations Saint-Denis – Pleyel, qui doit son nom au quartier d’une manufacture de pianos, à Aéroport d’Orly. Plusieurs noms du prolongement sud ont été choisis en 2022, comme Hôpital Bicêtre.

## line/14/imageAlt

Reason: L2 generic alt text. Now describes what the image shows (checked by viewing apps/web/public/illustrations/line-14.webp): Madeleine church front and the four BnF towers around a garden, engraving style.

- `line/14/imageAlt/en`
  - Before: Illustration of places and names along Line 14.
  - After: Engraving-style illustration of the colonnaded front of the Madeleine church and, on the right, the four glass towers of the Bibliothèque nationale de France around a garden.
- `line/14/imageAlt/fr`
  - Before: Illustration des lieux et des noms de la ligne 14.
  - After: Illustration de style gravure de la façade à colonnes de l’église de la Madeleine et, à droite, des quatre tours de verre de la Bibliothèque nationale de France autour d’un jardin.

## 14/saint-denis-pleyel/etymology

Reason: FR calque « nommé d’après » (T19, S6 capped). EN stationDash FAIL. S1: every word of the name is now explained (Saint-Denis = the town). FR no longer says the factory was founded by Ignace Pleyel; it says the company was, which matches EN.

- `14/saint-denis-pleyel/etymology/en`
  - Before: Called Saint-Denis–Pleyel after the district named for the Pleyel piano factory. The company’s founder was composer and piano maker Ignace Pleyel.
  - After: Called Saint-Denis – Pleyel after the Pleyel district of Saint-Denis. The district takes its name from the Pleyel piano factory. The company’s founder was the composer and piano maker Ignace Pleyel.
- `14/saint-denis-pleyel/etymology/fr`
  - Before: La station doit son nom au quartier Pleyel de Saint-Denis, nommé d’après la manufacture fondée par le compositeur et facteur de pianos Ignace Pleyel.
  - After: La station doit son nom au quartier Pleyel de Saint-Denis. Ce quartier tient son nom de la manufacture de pianos Pleyel. L’entreprise a été fondée par le compositeur et facteur de pianos Ignace Pleyel.

## 14/saint-denis-pleyel/context

Reason: S6 parity: FR said « ce choix », EN gave the name; both now give the name Saint-Denis Pleyel. “Saint-Denis itself recalls” made literal (the town takes its name from Denis).

- `14/saint-denis-pleyel/context/en`
  - Before: Saint-Denis itself recalls Denis, the first bishop of Paris, whose burial place became a religious centre. A public consultation confirmed the name Saint-Denis Pleyel in 2022.
  - After: The town of Saint-Denis takes its name from Denis, the first bishop of Paris, whose burial place became a religious centre. A public consultation confirmed the station name Saint-Denis Pleyel in 2022.
- `14/saint-denis-pleyel/context/fr`
  - Before: Saint-Denis rappelle Denis, premier évêque de Paris, dont le lieu de sépulture est devenu un centre religieux. Une consultation publique a confirmé ce choix en 2022.
  - After: La ville de Saint-Denis porte le nom de Denis, premier évêque de Paris, dont le lieu de sépulture est devenu un centre religieux. Une consultation publique a confirmé le nom de station Saint-Denis Pleyel en 2022.

## 14/saint-ouen/etymology

Reason: FR calque « nommée d’après » (T19, S6 capped). FR now states “existing” (déjà existante) RER station, as EN does. EN metro → Métro.

- `14/saint-ouen/etymology/en`
  - Before: Called Saint-Ouen because the metro adopted the name of the existing RER station at the same interchange. That name refers to Saint-Ouen, the town named after Ouen, a seventh-century bishop of Rouen.
  - After: Called Saint-Ouen because the Métro adopted the name of the existing RER station at the same interchange. That name refers to the town of Saint-Ouen, which takes its name from Ouen, a seventh-century bishop of Rouen.
- `14/saint-ouen/etymology/fr`
  - Before: La station doit son nom à la gare du RER avec laquelle elle est en correspondance. Celle-ci porte le nom de Saint-Ouen, ville nommée d’après Ouen, évêque de Rouen au VIIe siècle.
  - After: La station porte le nom de la gare du RER déjà existante avec laquelle elle est en correspondance. Ce nom est celui de la ville de Saint-Ouen, qui doit le sien à Ouen, évêque de Rouen au VIIe siècle.

## 14/saint-ouen/context

Reason: Typography only: spaced en dash in a compound station name (stationDash FAIL).

- `14/saint-ouen/context/en`
  - Before: The planned name was Clichy–Saint-Ouen because the station straddles the two towns. The final choice followed the transport authority’s rule that connecting stations share a name.
  - After: The planned name was Clichy – Saint-Ouen because the station straddles the two towns. The final choice followed the transport authority’s rule that connecting stations share a name.
- `14/saint-ouen/context/fr`
  - Before: Le nom prévu était Clichy–Saint-Ouen, car la station se trouve à cheval sur les deux villes. Le choix définitif suit la règle de l’autorité organisatrice qui donne le même nom aux gares en correspondance.
  - After: Le nom prévu était Clichy – Saint-Ouen, car la station se trouve à cheval sur les deux villes. Le choix définitif suit la règle de l’autorité organisatrice qui donne le même nom aux gares en correspondance.

## 14/porte-de-clichy/etymology

Reason: FR guillemets FAIL: added U+00A0 inside « ».

- `14/porte-de-clichy/etymology/fr`
  - Before: La station doit son nom à l’ancienne porte de Paris située sur la route de Clichy. Le mot « porte » rappelle une entrée des fortifications du XIXe siècle, tandis que « Clichy » désigne la ville située au-delà.
  - After: La station doit son nom à l’ancienne porte de Paris située sur la route de Clichy. Le mot « porte » rappelle une entrée des fortifications du XIXe siècle, tandis que « Clichy » désigne la ville située au-delà.

## 14/porte-de-clichy/context

Reason: FR S3/S2 and T13 (« conserve leur souvenir », « repère ancien »). Removed the sentence that restated the name (“The metro uses this older geographical marker”): filler. EN aligned to keep the same facts.

- `14/porte-de-clichy/context/en`
  - Before: The gate controlled entry through the Thiers fortifications. The wall has disappeared, but the road crossing retains its name. The metro uses this older geographical marker, while the station’s Tribunal de Paris subtitle identifies the court complex now served here.
  - After: The gate controlled entry through the Thiers fortifications. The wall has disappeared, but the road crossing keeps the name Porte de Clichy. The station’s subtitle, Tribunal de Paris, refers to the court complex it serves.
- `14/porte-de-clichy/context/fr`
  - Before: La porte contrôlait une entrée de l’enceinte de Thiers. Les fortifications ont disparu, mais ce passage routier conserve leur souvenir dans son nom. Le métro reprend ce repère ancien, tandis que le sous-titre Tribunal de Paris indique le palais de justice desservi.
  - After: La porte contrôlait une entrée de l’enceinte de Thiers. Les fortifications ont disparu, mais le carrefour routier a gardé le nom de porte de Clichy. Le sous-titre de la station, Tribunal de Paris, désigne le palais de justice desservi.

## 14/pont-cardinet/etymology

Reason: EN typography only: capitalised the street word (house style, en.streetCase) and/or changed “metro” to “Métro” (corpus.metroForm: EN corpus uses Métro 25 times vs metro 14).

- `14/pont-cardinet/etymology/en`
  - Before: Called Pont Cardinet after the bridge that carries rue Cardinet over the railway tracks. The street bears the name of a local property owner, Philippe Cardinet.
  - After: Called Pont Cardinet after the bridge that carries Rue Cardinet over the railway tracks. The street bears the name of a local property owner, Philippe Cardinet.

## 14/saint-lazare/etymology

Reason: EN typography only: capitalised the street word (house style, en.streetCase) and/or changed “metro” to “Métro” (corpus.metroForm: EN corpus uses Métro 25 times vs metro 14).

- `14/saint-lazare/etymology/en`
  - Before: Called Saint-Lazare after the nearby railway station and rue Saint-Lazare. The street led to the Maison Saint-Lazare, a leper hospital dedicated to Saint Lazarus.
  - After: Called Saint-Lazare after the nearby railway station and Rue Saint-Lazare. The street led to the Maison Saint-Lazare, a leper hospital dedicated to Saint Lazarus.

## 14/saint-lazare/context

Reason: S4=0: the last sentence (street kept the name despite changes of use) was filler that restated the etymology; removed. S7: replaced “religious house… then a prison” with verified specifics (1632 transfer to Vincent de Paul and the Congregation of the Mission; a 1794 decree made it a prison; later for women; closed 1927). Source: https://fr.wikipedia.org/wiki/Prison_Saint-Lazare (listed source). “near” → “on” Rue du Faubourg-Saint-Denis (source gives no. 107). EN street capitalised.

- `14/saint-lazare/context/en`
  - Before: The old institution stood farther east, near rue du Faubourg-Saint-Denis. It later became a religious house and then a prison. The street retained the name of the destination it once served, even after these successive changes in the building’s use.
  - After: The leper hospital stood farther east, on Rue du Faubourg-Saint-Denis. In 1632 it passed to Vincent de Paul and the Congregation of the Mission. A decree of 1794 made it a prison, later used for women, which closed in 1927.
- `14/saint-lazare/context/fr`
  - Before: L’ancienne institution se trouvait plus à l’est, près de la rue du Faubourg-Saint-Denis. Elle devint ensuite une maison religieuse, puis une prison. La rue a gardé le nom du lieu auquel elle conduisait, malgré les changements successifs d’usage des bâtiments.
  - After: La léproserie se trouvait plus à l’est, rue du Faubourg-Saint-Denis. En 1632, elle a été cédée à Vincent de Paul et à la congrégation de la Mission. Un décret de 1794 en a fait une prison, ensuite réservée aux femmes, qui a fermé en 1927.

## 14/madeleine/etymology

Reason: EN typography only: capitalised the street word (house style, en.streetCase) and/or changed “metro” to “Métro” (corpus.metroForm: EN corpus uses Métro 25 times vs metro 14).

- `14/madeleine/etymology/en`
  - Before: Called Madeleine after place de la Madeleine and the church at its centre. The church is dedicated to Mary Magdalene, called Marie Madeleine in French.
  - After: Called Madeleine after Place de la Madeleine and the church at its centre. The church is dedicated to Mary Magdalene, called Marie Madeleine in French.

## 14/madeleine/context

Reason: S4=0: last sentence (“The later monumental church kept that dedication”) duplicated the first; removed as duplicated. FR colon FAIL removed by splitting the sentence. T4 (jev) on « monumentale » gone. “Madeleine” → “Mary Magdalene” / « Marie Madeleine » (name already in the etymology).

- `14/madeleine/context/en`
  - Before: The dedication predates the present church: a chapel in the former Ville-l’Évêque settlement was dedicated to Madeleine in the thirteenth century. The later monumental church kept that dedication.
  - After: The dedication is older than the present church. In the thirteenth century, a chapel in the former settlement of La Ville-l’Évêque was already dedicated to Mary Magdalene.
- `14/madeleine/context/fr`
  - Before: La dédicace précède l’église actuelle : une chapelle de l’ancien bourg de la Ville-l’Évêque était dédiée à Madeleine au XIIIe siècle. L’église monumentale a conservé cette dédicace.
  - After: La dédicace est plus ancienne que l’église actuelle. Au XIIIe siècle, une chapelle de l’ancien bourg de la Ville-l’Évêque était déjà dédiée à Marie Madeleine.

## 14/pyramides/context

Reason: S4=0 and EN calque “opposed Bonaparte’s army to Mamluk forces” (rubric example). Replaced the vague “first used the name on Line 7… later joined” with the opening dates. Source: https://fr.wikipedia.org/wiki/Pyramides_(m%C3%A9tro_de_Paris) (« La station est ouverte le 1er juillet 1916 », « Le 15 octobre 1998, la station de la ligne 14 … est ouverte »).

- `14/pyramides/context/en`
  - Before: The battle formed part of the French campaign in Egypt and opposed Bonaparte’s army to Mamluk forces. The metro station first used the name on Line 7. Line 14 later joined the same interchange and kept the existing station name.
  - After: At the Battle of the Pyramids, during the French campaign in Egypt, Bonaparte’s army fought Mamluk forces. The station opened on Line 7 on 1 July 1916. The Line 14 platforms opened on 15 October 1998 under the same name.
- `14/pyramides/context/fr`
  - Before: La bataille appartient à la campagne française d’Égypte et oppose l’armée de Bonaparte aux forces mameloukes. Le métro a d’abord utilisé ce nom sur la ligne 7. La ligne 14 a ensuite rejoint la même correspondance et conservé le nom existant.
  - After: À la bataille des Pyramides, pendant la campagne d’Égypte, l’armée de Bonaparte a affronté les forces mameloukes. La station a ouvert sur la ligne 7 le 1er juillet 1916. Les quais de la ligne 14 ont ouvert sous le même nom le 15 octobre 1998.

## 14/chatelet/context

Reason: T3 “-ing” tail (“leaving the name attached…”), FR colon FAIL. S7: replaced the tail with verified facts: court of the provosts of Paris and prisons; demolition 1802 to 1810. Source: https://parcoursrevolution.paris.fr/fr/points-interet/54-le-grand-chatelet-geole-de-l-ancien-regime (« abrite alors un tribunal : celui des prévôts de Paris », « s’étendent les prisons », « Elle ne commence qu’en 1802, pour s’achever en 1810 »).

- `14/chatelet/context/en`
  - Before: The Grand Châtelet stood at the northern approach to the Pont au Change. Royal justice operated there under the Ancien Régime. Its demolition began in 1802, leaving the name attached to an open square instead of the former fortified building.
  - After: The Grand Châtelet stood at the northern approach to the Pont au Change. Under the Ancien Régime it housed a royal court, the court of the provosts of Paris, and prisons. Its demolition began in 1802 and ended in 1810.
- `14/chatelet/context/fr`
  - Before: Le Grand Châtelet occupait l’accès nord du pont au Change. La justice royale y était exercée sous l’Ancien Régime. Sa démolition a commencé en 1802 : son nom est alors resté attaché à une place ouverte, à la place de l’ancien bâtiment fortifié.
  - After: Le Grand Châtelet occupait l’accès nord du pont au Change. Sous l’Ancien Régime, il abritait une juridiction royale, le tribunal des prévôts de Paris, ainsi que des prisons. Sa démolition a commencé en 1802 et s’est achevée en 1810.

## 14/gare-de-lyon/context

Reason: stationDash FAIL on Paris–Lyon–Méditerranée, vague “associated with”, FR 27-word sentence. Now names the company (Compagnie des chemins de fer de Paris à Lyon et à la Méditerranée, PLM) as developer of the station. Source: https://fr.wikipedia.org/wiki/Paris-Gare-de-Lyon (listed source). FR split into two sentences. EN street words capitalised.

- `14/gare-de-lyon/context/en`
  - Before: The railway terminus was associated with the Paris–Lyon–Méditerranée network. The Line 14 platforms lie along rue de Bercy, while the older Line 1 platforms are under boulevard Diderot.
  - After: The railway terminus was developed by the PLM company (Chemins de fer de Paris à Lyon et à la Méditerranée). The Line 14 platforms lie along Rue de Bercy, while the older Line 1 platforms are under Boulevard Diderot.
- `14/gare-de-lyon/context/fr`
  - Before: La gare ferroviaire était associée au réseau Paris–Lyon–Méditerranée. Les quais de la ligne 14 se trouvent le long de la rue de Bercy, tandis que ceux de la ligne 1 sont sous le boulevard Diderot.
  - After: La gare a été développée par la Compagnie des chemins de fer de Paris à Lyon et à la Méditerranée (PLM). Les quais de la ligne 14 longent la rue de Bercy. Ceux de la ligne 1, plus anciens, se trouvent sous le boulevard Diderot.

## 14/bercy/context

Reason: Filler “long before the metro” (S4 level 3), FR colon FAIL. Last sentence (road names carried it into the city and the metro) repeated the etymology (R7); removed as duplicated.

- `14/bercy/context/en`
  - Before: Bercy was a place name long before the metro: a charter from 1134 records a form of it. A seigneurial estate and a separate commune later bore the name. The road names carried it into the expanded city and then into the metro.
  - After: A charter from 1134 records an early form of the place name Bercy. A seigneurial estate, and later a separate commune, bore the name.
- `14/bercy/context/fr`
  - Before: Bercy est un nom de lieu bien antérieur au métro : une charte de 1134 en conserve une forme ancienne. Une seigneurie, puis une commune distincte, ont porté ce nom. Les voies l’ont transmis à la ville agrandie, puis au réseau du métro.
  - After: Une charte de 1134 conserve une forme ancienne du nom de lieu Bercy. Une seigneurie, puis une commune distincte, ont porté ce nom.

## 14/bibliotheque-francois-mitterrand/etymology

Reason: S1 0.67: the naming chain now names the François-Mitterrand site of the BnF; “honours” / « rend hommage » → “is named after” / « porte le nom » (literal).

- `14/bibliotheque-francois-mitterrand/etymology/en`
  - Before: Called Bibliothèque François-Mitterrand after the nearby site of the Bibliothèque nationale de France. The library site honours President François Mitterrand, who initiated its construction.
  - After: Called Bibliothèque François-Mitterrand after the nearby François-Mitterrand site of the Bibliothèque nationale de France. The site is named after President François Mitterrand, who initiated its construction.
- `14/bibliotheque-francois-mitterrand/etymology/fr`
  - Before: La station doit son nom au site voisin de la Bibliothèque nationale de France. Celui-ci rend hommage au président François Mitterrand, à l’origine de sa construction.
  - After: La station doit son nom au site François-Mitterrand de la Bibliothèque nationale de France, situé à proximité. Ce site porte le nom du président François Mitterrand, à l’origine de sa construction.

## 14/bibliotheque-francois-mitterrand/context

Reason: Typography only: spaced en dash in a compound station name (stationDash FAIL).

- `14/bibliotheque-francois-mitterrand/context/en`
  - Before: The planned station name was Tolbiac–Masséna, after nearby roads. The final name instead identifies the national library’s new site, opened to the public in 1996. Dominique Perrault designed its four towers around a central garden.
  - After: The planned station name was Tolbiac – Masséna, after nearby roads. The final name instead identifies the national library’s new site, opened to the public in 1996. Dominique Perrault designed its four towers around a central garden.
- `14/bibliotheque-francois-mitterrand/context/fr`
  - Before: Le nom prévu était Tolbiac–Masséna, d’après des voies voisines. Le choix définitif désigne plutôt le nouveau site de la bibliothèque nationale, ouvert au public en 1996. Dominique Perrault a conçu ses quatre tours autour d’un jardin central.
  - After: Le nom prévu était Tolbiac – Masséna, d’après des voies voisines. Le choix définitif désigne plutôt le nouveau site de la bibliothèque nationale, ouvert au public en 1996. Dominique Perrault a conçu ses quatre tours autour d’un jardin central.

## 14/maison-blanche/context

Reason: EN typography only: capitalised the street word (house style, en.streetCase) and/or changed “metro” to “Métro” (corpus.metroForm: EN corpus uses Métro 25 times vs metro 14).

- `14/maison-blanche/context/en`
  - Before: The name was already used by Line 7 before Line 14 arrived. The nearby rue de la Maison-Blanche carries the same local name, but lies farther north, near Tolbiac station.
  - After: The name was already used by Line 7 before Line 14 arrived. The nearby Rue de la Maison-Blanche carries the same local name, but lies farther north, near Tolbiac station.

## 14/hopital-bicetre/etymology

Reason: FR colon FAIL (U+00A0). Last sentence (hospital kept the name, metro adopted it) was flagged deletable (S4=0) and repeated the first sentence; removed as duplicated.

- `14/hopital-bicetre/etymology/en`
  - Before: Called Hôpital Bicêtre because it serves Bicêtre hospital. Bicêtre is a French alteration of Winchester: Jean de Pontoise, bishop of Winchester, acquired the medieval estate. The hospital retained the estate’s name, which the metro then adopted.
  - After: Called Hôpital Bicêtre because it serves Bicêtre hospital. Bicêtre is a French alteration of Winchester: Jean de Pontoise, bishop of Winchester, acquired the medieval estate.
- `14/hopital-bicetre/etymology/fr`
  - Before: La station doit son nom à l’hôpital Bicêtre qu’elle dessert. Bicêtre est une transformation française de Winchester : Jean de Pontoise, évêque de Winchester, avait acquis le domaine médiéval. L’hôpital a conservé ce nom, ensuite repris par le métro.
  - After: La station doit son nom à l’hôpital Bicêtre qu’elle dessert. Bicêtre est une transformation française de Winchester : Jean de Pontoise, évêque de Winchester, avait acquis le domaine médiéval.

## 14/villejuif-gustave-roussy/etymology

Reason: Typography only: spaced en dash in a compound station name (stationDash FAIL).

- `14/villejuif-gustave-roussy/etymology/en`
  - Before: Called Villejuif–Gustave Roussy after the town and the nearby cancer institute. The institute bears the name of its founder, Gustave Roussy, a French-Swiss doctor who worked in neurology, pathology and cancer treatment.
  - After: Called Villejuif – Gustave Roussy after the town and the nearby cancer institute. The institute bears the name of its founder, Gustave Roussy, a French-Swiss doctor who worked in neurology, pathology and cancer treatment.

## 14/l-hay-les-roses/etymology

Reason: FR guillemets FAIL: added U+00A0 inside « ».

- `14/l-hay-les-roses/etymology/fr`
  - Before: La station doit son nom à la ville qu’elle dessert. L’Haÿ a ajouté « les-Roses » à son nom en 1914 en raison de la renommée de sa roseraie.
  - After: La station doit son nom à la ville qu’elle dessert. L’Haÿ a ajouté « les-Roses » à son nom en 1914 en raison de la renommée de sa roseraie.

## 14/l-hay-les-roses/context

Reason: T3 tails in both locales, stationDash FAIL, S2 vague (“supported the request”). Now states who asked (the municipal council) and its two stated reasons (visitors to the rose garden; telephone confusion with Lagny). Source: https://lesgravereaux.marret.co/index.php/lhay-les-roses-une-appellation-centenaire/ (listed source; quotes the council deliberation).

- `14/l-hay-les-roses/context/en`
  - Before: The garden’s reputation brought visitors to the town and supported the request to change its name. The metro project initially used Chevilly–Trois Communes. A public consultation in 2022 chose L’Haÿ-les-Roses, identifying the town rather than the earlier project area.
  - After: The town council requested the new name, citing the visitors the rose garden brought and telephone confusion with Lagny. The Métro project first used the name Chevilly – Trois Communes. A public consultation in 2022 chose the town’s name, L’Haÿ-les-Roses.
- `14/l-hay-les-roses/context/fr`
  - Before: La réputation de la roseraie attirait des visiteurs et a motivé la demande de changement de nom de la ville. Le projet de métro utilisait d’abord Chevilly–Trois Communes. Une consultation publique en 2022 a choisi L’Haÿ-les-Roses, désignant la commune plutôt que le secteur du projet.
  - After: Le conseil municipal a demandé ce nouveau nom en invoquant les visiteurs attirés par la roseraie et les confusions téléphoniques avec Lagny. Le projet de métro utilisait d’abord le nom Chevilly – Trois Communes. Une consultation publique en 2022 a retenu le nom de la commune, L’Haÿ-les-Roses.

## 14/chevilly-larue/etymology

Reason: Filler phrase “long before the metro arrived” / « bien avant l’arrivée du métro » (rubric 4.5 filler list); removed as filler.

- `14/chevilly-larue/etymology/en`
  - Before: Called Chevilly-Larue after the municipality where the station stands. The compound town name joins Chevilly and the former hamlet of Larue. Larue was added to the official municipal name in 1920, long before the metro arrived.
  - After: Called Chevilly-Larue after the municipality where the station stands. The compound town name joins Chevilly and the former hamlet of Larue. Larue was added to the official municipal name in 1920.
- `14/chevilly-larue/etymology/fr`
  - Before: La station doit son nom à la commune où elle se trouve. Ce nom composé associe Chevilly à l’ancien hameau de Larue. Larue a été ajouté au nom officiel de la commune en 1920, bien avant l’arrivée du métro.
  - After: La station doit son nom à la commune où elle se trouve. Ce nom composé associe Chevilly à l’ancien hameau de Larue. Larue a été ajouté au nom officiel de la commune en 1920.

## 14/chevilly-larue/context

Reason: EN typography only: capitalised the street word (house style, en.streetCase) and/or changed “metro” to “Métro” (corpus.metroForm: EN corpus uses Métro 25 times vs metro 14).

- `14/chevilly-larue/context/en`
  - Before: The metro project originally called this station Porte de Thiais. Local authorities sought names that better identified the towns served. Chevilly-Larue was confirmed in 2022.
  - After: The Métro project originally called this station Porte de Thiais. Local authorities sought names that better identified the towns served. Chevilly-Larue was confirmed in 2022.

## 14/thiais-orly/etymology

Reason: Typography only: spaced en dash in a compound station name (stationDash FAIL).

- `14/thiais-orly/etymology/en`
  - Before: Called Thiais–Orly to identify the two neighbouring municipalities served by the station. The compound name replaced the project name Pont de Rungis.
  - After: Called Thiais – Orly to identify the two neighbouring municipalities served by the station. The compound name replaced the project name Pont de Rungis.

## 14/aeroport-d-orly/context

Reason: FR 26-word sentence and colon FAIL: split into two sentences; « de transport » dropped as redundant. EN metro → Métro.

- `14/aeroport-d-orly/context/en`
  - Before: The airport grew from an airfield established on land at Orly. Its later expansion spread across municipal boundaries. The metro terminus is inside the airport site, near the terminals, so the name identifies the transport destination rather than the municipality beneath the platforms.
  - After: The airport grew from an airfield established on land at Orly. Its later expansion spread across municipal boundaries. The Métro terminus is inside the airport site, near the terminals, so the name identifies the transport destination rather than the municipality beneath the platforms.
- `14/aeroport-d-orly/context/fr`
  - Before: L’aéroport s’est développé à partir d’un terrain d’aviation établi à Orly. Son agrandissement a ensuite franchi les limites communales. Le terminus du métro se trouve dans l’enceinte aéroportuaire, près des terminaux : son nom indique la destination de transport plutôt que la commune sous les quais.
  - After: L’aéroport s’est développé à partir d’un terrain d’aviation établi à Orly. Son agrandissement a ensuite franchi les limites communales. Le terminus du métro se trouve dans l’enceinte aéroportuaire, près des terminaux. Son nom indique donc la destination plutôt que la commune où se trouvent les quais.

## Review

Fact-preservation review of the 47 changed units. Facts checked against the cited sources (Prison Saint-Lazare, Pyramides (métro de Paris), parcoursrevolution.paris.fr Grand Châtelet page, Paris-Gare-de-Lyon, lesgravereaux.marret.co). Pyramides dates, Châtelet demolition 1802–1810, Saint-Lazare 1632 / 1927 / rue du Faubourg-Saint-Denis no. 107 / women's prison, L'Haÿ council request with telephone confusion and rose-garden visitors: all confirmed. Image alt checked against `line-14.webp`. FR typography in Line 14-owned units is correct.

Fixes:

- `line/14/summary` (en, fr): “named after a piano factory district” was unclear and the FR “le quartier d’une manufacture” did not say the district took its name from the factory. Now “in a district named after a piano factory” / « dans un quartier qui doit son nom à une manufacture de pianos ».
- `14/saint-lazare/context` (en, fr): “A decree of 1794 made it a prison” overstated the source, which says the decree recognised Saint-Lazare as a prison (it had held prisoners since the 17th century). Now “recognised it as a prison” / « l’a reconnue comme prison ».
- `14/chatelet/context` (en, fr): “a royal court, the court of the provosts of Paris, and prisons” could read as three separate items. The source names one court (the provosts of Paris). Now “the royal court of the provosts of Paris, as well as prisons” / « le tribunal royal des prévôts de Paris, ainsi que des prisons ».
- `14/gare-de-lyon/context` (en, fr): “developed by the PLM company” was stronger than the source. The station opened in 1849, before the PLM existed (1857), and the PLM later enlarged it. Now “the Paris terminus of the PLM company” / « la tête de ligne parisienne de la Compagnie … (PLM) ».

## Fact check 2026-10-05

### 14/thiais-orly/context (en, fr): error corrected

Reason: “confirmed” implied the name was already in use. The station was renamed (from Pont de Rungis) in September 2022 after local debate, with Pont de Rungis kept as a subtitle.

- `14/thiais-orly/context/en`
  - Before: The name was confirmed in 2022 after local authorities requested changes to the southern extension’s station names. Pont de Rungis remains the name of the connecting RER C station.
  - After: The station was renamed in September 2022, after local elected officials objected to some of the southern extension’s station names. Pont de Rungis was kept as its subtitle and remains the name of the connecting RER C station.
- `14/thiais-orly/context/fr`
  - Before: Le nom a été confirmé en 2022 après les demandes des collectivités concernant les stations du prolongement sud. Pont de Rungis reste le nom de la gare du RER C en correspondance.
  - After: La station a été renommée en septembre 2022, après les objections d’élus locaux à certains noms de stations du prolongement sud. Pont de Rungis a été conservé en sous-titre et reste le nom de la gare du RER C en correspondance.
- Evidence: https://fr.wikipedia.org/wiki/Thiais_-_Orly_(m%C3%A9tro_de_Paris) (« En septembre 2022, à la suite de débats locaux, elle est renommée Thiais – Orly, avec la mention Pont de Rungis en sous-titre »), https://en.wikipedia.org/wiki/Thiais%E2%80%93Orly_station (mayors objected to the names). Added the en.wikipedia article as a source.

### 14/thiais-orly/etymology (en, fr): source added, wording made exact

Reason: the station stands in Thiais, not in Orly, so “qu’elle dessert” / “served by the station” overstated the link to Orly.

- `14/thiais-orly/etymology/en`
  - Before: Called Thiais – Orly to identify the two neighbouring municipalities served by the station.
  - After: Called Thiais – Orly after Thiais, where the station stands, and the neighbouring municipality of Orly.
- `14/thiais-orly/etymology/fr`
  - Before: La station doit son nom aux deux communes voisines de Thiais et d’Orly qu’elle dessert.
  - After: La station doit son nom à Thiais, où elle se trouve, et à la commune voisine d’Orly.
- Evidence: https://en.wikipedia.org/wiki/Thiais%E2%80%93Orly_station (renamed to better represent its geographic position). Added as a source.

### 14/hopital-bicetre/etymology and context (en, fr): sources added, context wording neutral

Reason: the AP-HP hospital page supports only the purchase by Jean de Pontoise. The AP-HP booklet PDF could not be read, so “The hospital’s history traces” was not verifiable.

- `14/hopital-bicetre/context/en`
  - Before: The hospital’s history traces the name through the forms Winchester, Bicestre and Bicêtre.
  - After: The name passed through the forms Winchester, Bicestre and Bicêtre.
- `14/hopital-bicetre/context/fr`
  - Before: L’histoire de l’hôpital rattache le nom aux formes Winchester, Bicestre et Bicêtre.
  - After: Le nom est passé par les formes Winchester, Bicestre et Bicêtre.
- Evidence: https://fr.wikipedia.org/wiki/Bic%C3%AAtre (Winchester > Winchestre > Bichestre > Bicestre > Bicêtre; land of Jean de Pontoise, bishop of Winchester), https://fr.wikipedia.org/wiki/Le_Kremlin-Bic%C3%AAtre (« le Petit Winchester, francisé Vincestre, puis Bicestre… »). Both added as sources. Etymology text unchanged.

### 14/villejuif-gustave-roussy/context (en, fr): source added

- Text unchanged. The 1926 founding date was not in the cited sources.
- Evidence: https://fr.wikipedia.org/wiki/Gustave-Roussy (« L’institut est créé par Gustave Roussy en 1926 »). Added as a source.

### 14/mairie-de-saint-ouen/etymology (en, fr): source added

- Text unchanged. The station article does not say the town hall is at the station.
- Evidence: https://fr.wikipedia.org/wiki/H%C3%B4tel_de_ville_de_Saint-Ouen-sur-Seine (town hall on place de la République; the station article puts the Line 13 station under that square). Added as a source.

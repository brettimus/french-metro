# Line 6 copy changes

Evaluator runs: `apps/web/scripts/copy/out/line6-before/2026-10-05T09-58-49-289Z/` and `apps/web/scripts/copy/out/line6-after/2026-10-05T10-06-26-380Z/`.

Line 6 (112 units): mean composite 0.881 → 0.933. Bands (ship/edit/rewrite) 83/28/1 → 109/3/0. Deterministic FAILs 8 (in 7 units) → 0. Hard failures 0 → 0.

Shared etymologies that another line owns were not changed: charles-de-gaulle-etoile, montparnasse-bienvenue, raspail, denfert-rochereau, place-ditalie, nation. Line 6 owns the trocadero and bercy etymologies; trocadero changed, bercy needed no change.

### kleber/etymology/en
- Before: Called Kléber after Avenue Kléber, which honours General Jean-Baptiste Kléber, who distinguished himself during the wars of the French Revolution. The station opened on 2 October 1900, on the branch that later became Line 6.
- After: Called Kléber after Avenue Kléber, which honours General Jean-Baptiste Kléber, who distinguished himself during the wars of the French Revolution. Kléber station opened on 2 October 1900, on the branch that later became Line 6.
- Reason: T21: the second sentence was word for word the same as Boissière. Added the station name to make the sentence specific. No fact change.

### kleber/etymology/fr
- Before: La station doit son nom à l’avenue Kléber, dédiée au général Jean-Baptiste Kléber, qui se distingua pendant les guerres de la Révolution française. Elle ouvre le 2 octobre 1900, sur l’antenne devenue plus tard la ligne 6.
- After: La station doit son nom à l’avenue Kléber, dédiée au général Jean-Baptiste Kléber, qui se distingua pendant les guerres de la Révolution française. La station Kléber ouvre le 2 octobre 1900, sur l’antenne devenue plus tard la ligne 6.
- Reason: T21: the second sentence was word for word the same as Boissière. Added the station name to make the sentence specific. No fact change.

### kleber/context/en
- Before: Works in 1969 to prepare for rubber-tyred trains added two side half-stations, held up by metal arches first used in wartime to shore up bombed stations. Kléber now serves as a four-track technical terminus, since Étoile is too constrained for that role.
- After: Works in 1969 to prepare for rubber-tyred trains added two side half-stations. Metal arches from the Second World War, first used to stop bombed stations from collapsing, held up the vault during the works. Kléber is now a four-track technical terminus, since Étoile is too constrained for that role.
- Reason: T8 "serves as" (EN); sentences over 25 words split. Fact correction: the arches held up the vault during the 1969 works and date from the Second World War; the old text said they hold up the half-stations. Source: https://fr.wikipedia.org/wiki/Kl%C3%A9ber_(m%C3%A9tro_de_Paris) (« Afin de soutenir la voûte pendant les travaux, des arceaux en métal sont utilisés. Datant de la Seconde Guerre mondiale, ils servaient initialement à éviter l’effondrement des stations qui avaient été bombardées »).

### kleber/context/fr
- Before: Des travaux menés en 1969 pour préparer l’arrivée des trains sur pneus ajoutent deux demi-stations latérales, soutenues par des arceaux métalliques d’abord utilisés en temps de guerre pour étayer des stations bombardées. Kléber sert désormais de terminus technique à quatre voies, Étoile étant trop exigu pour ce rôle.
- After: Des travaux menés en 1969 pour préparer l’arrivée des trains sur pneus ajoutent deux demi-stations latérales. Des arceaux métalliques de la Seconde Guerre mondiale, d’abord utilisés pour empêcher l’effondrement de stations bombardées, soutiennent la voûte pendant le chantier. Kléber sert désormais de terminus technique à quatre voies, Étoile étant trop exigu pour ce rôle.
- Reason: T8 "serves as" (EN); sentences over 25 words split. Fact correction: the arches held up the vault during the 1969 works and date from the Second World War; the old text said they hold up the half-stations. Source: https://fr.wikipedia.org/wiki/Kl%C3%A9ber_(m%C3%A9tro_de_Paris) (« Afin de soutenir la voûte pendant les travaux, des arceaux en métal sont utilisés. Datant de la Seconde Guerre mondiale, ils servaient initialement à éviter l’effondrement des stations qui avaient été bombardées »).

### boissiere/context/en
- Before: The station keeps its original single entrance, a Guimard édicule that received historic-monument protection on 12 February 2016. It remains one of the network’s rare stops with just one street-level access.
- After: The station keeps its original single entrance, a Guimard édicule that received historic-monument protection on 12 February 2016. It is one of the network’s few stations with only one street entrance.
- Reason: T9 closer and persistence filler ("remains" / « reste »). Plain copula. No fact change.

### boissiere/context/fr
- Before: La station conserve son entrée unique d’origine, un édicule Guimard inscrit aux monuments historiques le 12 février 2016. Elle reste l’un des rares arrêts du réseau à ne posséder qu’un seul accès en surface.
- After: La station conserve son entrée unique d’origine, un édicule Guimard inscrit aux monuments historiques le 12 février 2016. Elle est l’une des rares stations du réseau à n’avoir qu’un seul accès en surface.
- Reason: T9 closer and persistence filler ("remains" / « reste »). Plain copula. No fact change.

### trocadero/etymology/en
- Before: Named for Place du Trocadéro, renamed in 1877 from Place du Roi-de-Rome to commemorate the French capture of the Trocadero fort at Cadiz on 30 and 31 August 1823.
- After: Called Trocadéro after Place du Trocadéro, formerly Place du Roi-de-Rome. The square was renamed in 1877 for the French capture of the Trocadero fort at Cadiz on 30 and 31 August 1823.
- Reason: FR sentence of 38 words (FAIL) and EN 29 words split; parenthesis removed; EN now opens with the R2 formula. No fact change.

### trocadero/etymology/fr
- Before: La station doit son nom à la place du Trocadéro, rebaptisée en 1877 (elle s’appelait auparavant place du Roi-de-Rome) pour commémorer la prise du fort du Trocadéro à Cadix par les Français les 30 et 31 août 1823.
- After: La station doit son nom à la place du Trocadéro, auparavant place du Roi-de-Rome. La place est rebaptisée en 1877 en souvenir de la prise du fort du Trocadéro à Cadix par les Français, les 30 et 31 août 1823.
- Reason: FR sentence of 38 words (FAIL) and EN 29 words split; parenthesis removed; EN now opens with the R2 formula. No fact change.

### trocadero/context/en
- Before: The station opened on 2 October 1900; before 1914 it received one of the network’s first escalators, removed only in 1959. A municipal decree renamed the square Place du Trocadéro-et-du-11-Novembre on 18 October 1978.
- After: Before 1914, the station, opened on 2 October 1900, received one of the network’s first escalators. It was removed only in 1959. On 18 October 1978, a municipal decree renamed the square Place du Trocadéro-et-du-11-Novembre.
- Reason: T20 template opener; FR plain space before « ; » (FAIL) and guillemets without no-break spaces (FAIL). Reordered so the field does not open with the opening date. No fact change.

### trocadero/context/fr
- Before: La station ouvre le 2 octobre 1900 ; avant 1914, elle reçoit l’un des premiers escaliers mécaniques du réseau, retiré seulement en 1959. Un arrêté municipal rebaptise la place « place du Trocadéro-et-du-11-Novembre » le 18 octobre 1978.
- After: Avant 1914, la station, ouverte le 2 octobre 1900, reçoit l’un des premiers escaliers mécaniques du réseau. Il n’est retiré qu’en 1959. Le 18 octobre 1978, un arrêté municipal donne à la place le nom de place du Trocadéro-et-du-11-Novembre.
- Reason: T20 template opener; FR plain space before « ; » (FAIL) and guillemets without no-break spaces (FAIL). Reordered so the field does not open with the opening date. No fact change.

### bir-hakeim/etymology/fr
- Before: La station doit son nom au pont de Bir-Hakeim voisin, qui honore la résistance des Forces françaises libres à la bataille de Bir Hakeim, en 1942. Ouverte en 1906 sous le nom de Grenelle, d’après le boulevard, elle prend le nom du pont en 1949.
- After: La station doit son nom au pont de Bir-Hakeim voisin, qui honore la résistance des Forces françaises libres à la bataille de Bir Hakeim, en 1942. Ouverte en 1906 sous le nom de Grenelle, celui du boulevard, elle prend le nom du pont en 1949.
- Reason: FR calque « , d’après le boulevard » (T19). No fact change.

### dupleix/context/en
- Before: The station opened on 24 April 1906 on the site of the former Grenelle wall, where executions took place from 1797 to 1815. A platform pillar carries what the station’s own article calls perhaps the last surviving public water-pressure gauge.
- After: Dupleix station, opened on 24 April 1906, occupies the site of the former Grenelle wall, where executions took place from 1797 to 1815. A pillar supporting the elevated station carries what may be the last surviving public water-pressure gauge, used to detect leaks in the water supply.
- Reason: T17 self-reference to the source ("the station’s own article"); T20 opener. The hedge stays ("may be" / « peut-être »). Fact correction: the gauge is on a pillar that supports the elevated station, not a platform pillar; added its purpose (leak detection). Source: https://fr.wikipedia.org/wiki/Dupleix_(m%C3%A9tro_de_Paris) (« Sur un pilier soutenant la station de métro aérienne, est apposé peut-être le dernier manomètre public subsistant, destiné à la recherche de fuites sur le réseau d’alimentation en eau »).

### dupleix/context/fr
- Before: La station ouvre le 24 avril 1906 sur l’emplacement de l’ancien mur d’enceinte de Grenelle, où des exécutions eurent lieu de 1797 à 1815. Un pilier de quai porte ce que son propre article qualifie de peut-être dernier manomètre public conservé.
- After: Ouverte le 24 avril 1906, la station Dupleix occupe l’emplacement de l’ancien mur d’enceinte de Grenelle, où des exécutions eurent lieu de 1797 à 1815. Un pilier de la station aérienne porte peut-être le dernier manomètre public conservé, destiné à détecter les fuites du réseau d’eau.
- Reason: T17 self-reference to the source ("the station’s own article"); T20 opener. The hedge stays ("may be" / « peut-être »). Fact correction: the gauge is on a pillar that supports the elevated station, not a platform pillar; added its purpose (leak detection). Source: https://fr.wikipedia.org/wiki/Dupleix_(m%C3%A9tro_de_Paris) (« Sur un pilier soutenant la station de métro aérienne, est apposé peut-être le dernier manomètre public subsistant, destiné à la recherche de fuites sur le réseau d’alimentation en eau »).

### sevres-lecourbe/etymology/en
- Before: Combines Rue de Sèvres, leading toward the town of Sèvres, and General Claude Jacques Lecourbe, who fought at Fleurus in 1794 and Zurich in 1799. Rue Lecourbe continues that older road along the line of a Roman route.
- After: Called Sèvres – Lecourbe after Rue de Sèvres, leading toward the town of Sèvres, and General Claude Jacques Lecourbe. He fought at Fleurus in 1794 and Zurich in 1799. Rue Lecourbe continues that older road along the line of a Roman route.
- Reason: R2 opening (EN "Combines…") and line-level T20 for FR « La station associe »; long sentences split. No fact change.

### sevres-lecourbe/etymology/fr
- Before: La station associe la rue de Sèvres, qui menait vers la ville du même nom, et le général Claude Jacques Lecourbe, qui combattit à Fleurus en 1794 puis à Zurich en 1799. La rue Lecourbe prolonge cet axe ancien, tracé sur une voie romaine.
- After: La station doit son nom à la rue de Sèvres, qui menait vers cette ville, et au général Claude Jacques Lecourbe. Il combattit à Fleurus en 1794 puis à Zurich en 1799. La rue Lecourbe prolonge cet axe ancien, tracé sur une voie romaine.
- Reason: R2 opening (EN "Combines…") and line-level T20 for FR « La station associe »; long sentences split. No fact change.

### sevres-lecourbe/context/en
- Before: The station opened on 24 April 1906 as Avenue de Suffren, was renamed Rue de Sèvres in 1907, and took its present combined name in November 1913.
- After: First named Avenue de Suffren when it opened on 24 April 1906, the station became Rue de Sèvres in 1907. It took its present combined name in November 1913.
- Reason: T20 template opener; sentences over 25 words split. No fact change.

### sevres-lecourbe/context/fr
- Before: La station ouvre le 24 avril 1906 sous le nom d’avenue de Suffren, prend le nom de rue de Sèvres en 1907, puis son nom combiné actuel en novembre 1913.
- After: Baptisée avenue de Suffren à son ouverture, le 24 avril 1906, la station prend le nom de rue de Sèvres en 1907. Elle reçoit son nom combiné actuel en novembre 1913.
- Reason: T20 template opener; sentences over 25 words split. No fact change.

### pasteur/etymology/en
- Before: Honours chemist and biologist Louis Pasteur, founder of microbiology and developer of pasteurization and a rabies vaccine, at the meeting of Rue de Vaugirard and Boulevard Pasteur.
- After: Called Pasteur after the chemist and biologist Louis Pasteur, founder of microbiology and developer of pasteurization and a rabies vaccine. The station lies where Rue de Vaugirard meets Boulevard Pasteur.
- Reason: FR sentence of 36 words (FAIL); EN now opens with the R2 formula. No fact change.

### pasteur/etymology/fr
- Before: La station honore le chimiste et biologiste Louis Pasteur, fondateur de la microbiologie et inventeur de la pasteurisation et d’un vaccin contre la rage, à la rencontre de la rue de Vaugirard et du boulevard Pasteur.
- After: La station porte le nom du chimiste et biologiste Louis Pasteur, fondateur de la microbiologie, inventeur de la pasteurisation et d’un vaccin contre la rage. Elle se trouve au croisement de la rue de Vaugirard et du boulevard Pasteur.
- Reason: FR sentence of 36 words (FAIL); EN now opens with the R2 formula. No fact change.

### pasteur/context/en
- Before: The Line 6 platforms opened in 1906, built by the CMP company. The station later also served a line of the rival Nord-Sud company, now Line 12: the two companies’ decorative styles coexist here, one of only three stations where they do.
- After: Pasteur’s Line 6 platforms opened in 1906, built by the CMP company. The station later also served a line of the rival Nord-Sud company, now Line 12. The two companies’ decorative styles coexist here, as at only two other stations.
- Reason: T20 opener (« Les quais de » / "The Line 6"); FR plain space before « : » (FAIL); 33-word FR sentence split. "one of only three stations" rewritten as "as at only two other stations" (same fact).

### pasteur/context/fr
- Before: Les quais de la ligne 6 ouvrent en 1906, construits par la CMP. La station dessert plus tard aussi une ligne de la compagnie rivale du Nord-Sud, aujourd’hui la ligne 12 : les décors des deux compagnies y coexistent, l’une des trois seules stations dans ce cas.
- After: À Pasteur, les quais de la ligne 6 ouvrent en 1906, construits par la CMP. La station dessert plus tard aussi une ligne de la compagnie rivale du Nord-Sud, aujourd’hui la ligne 12. Les décors des deux compagnies y coexistent, comme dans deux autres stations seulement.
- Reason: T20 opener (« Les quais de » / "The Line 6"); FR plain space before « : » (FAIL); 33-word FR sentence split. "one of only three stations" rewritten as "as at only two other stations" (same fact).

### edgar-quinet/etymology/en
- Before: Named for historian and politician Edgar Quinet, honoured by the boulevard that runs above the station. The station opened on 24 April 1906.
- After: Called Edgar Quinet after Boulevard Edgar-Quinet, which runs above the station and honours the historian and politician Edgar Quinet.
- Reason: T21: "The station opened on 24 April 1906." was duplicated on Corvisart. The opening date moved to the context field. Etymology now names the boulevard first (R2, naming chain). No fact removed from the entry.

### edgar-quinet/etymology/fr
- Before: La station porte le nom de l’historien et homme politique Edgar Quinet, honoré par le boulevard qui la surplombe. Elle ouvre le 24 avril 1906.
- After: La station doit son nom au boulevard Edgar-Quinet, qui la surplombe et rend hommage à l’historien et homme politique Edgar Quinet.
- Reason: T21: "The station opened on 24 April 1906." was duplicated on Corvisart. The opening date moved to the context field. Etymology now names the boulevard first (R2, naming chain). No fact removed from the entry.

### edgar-quinet/context/en
- Before: Its single entrance, on the boulevard’s central strip at number 11, is a fixed staircase with a railing and a Dervaux-style lamp post, just east of where the boulevard meets four other streets.
- After: Edgar Quinet station has a single entrance, on the boulevard’s central strip at number 11. It is a fixed staircase with a railing and a Dervaux-style lamp post, just east of where the boulevard meets four other streets. The station opened on 24 April 1906, with the Line 2 Sud extension.
- Reason: Opening pronoun ("Its" / « Son ») capped S5; the opening date moved here from the etymology. Added that the station opened with the Line 2 Sud extension. Source: https://fr.wikipedia.org/wiki/Edgar_Quinet_(m%C3%A9tro_de_Paris) (« La station est ouverte le 24 avril 1906 avec la mise en service du prolongement de la ligne 2 Sud »).

### edgar-quinet/context/fr
- Before: Son unique accès, sur le terre-plein central du boulevard au numéro 11, est un escalier fixe avec rampe et lampadaire de style Dervaux, juste à l’est du carrefour où le boulevard croise quatre autres rues.
- After: La station Edgar Quinet n’a qu’un accès, sur le terre-plein central du boulevard, au numéro 11. C’est un escalier fixe avec rampe et lampadaire de style Dervaux, juste à l’est du carrefour où le boulevard croise quatre autres rues. Elle ouvre le 24 avril 1906, avec le prolongement de la ligne 2 Sud.
- Reason: Opening pronoun ("Its" / « Son ») capped S5; the opening date moved here from the etymology. Added that the station opened with the Line 2 Sud extension. Source: https://fr.wikipedia.org/wiki/Edgar_Quinet_(m%C3%A9tro_de_Paris) (« La station est ouverte le 24 avril 1906 avec la mise en service du prolongement de la ligne 2 Sud »).

### raspail/context/en
- Before: The Line 6 platforms opened on 24 April 1906. Their entrance carries a Hector Guimard balustrade, whose surrounding portico the RATP gave to New York’s Museum of Modern Art in 1958.
- After: Raspail’s Line 6 platforms opened on 24 April 1906. Their entrance has a Hector Guimard balustrade. In 1958, the RATP gave the portico that surrounded it to New York’s Museum of Modern Art.
- Reason: T20 opener; FR 26-word sentence split. No fact change.

### raspail/context/fr
- Before: Les quais de la ligne 6 ouvrent le 24 avril 1906. Leur entrée porte une balustrade Hector Guimard, dont le portique environnant est offert par la RATP au Museum of Modern Art de New York en 1958.
- After: À Raspail, les quais de la ligne 6 ouvrent le 24 avril 1906. Leur entrée porte une balustrade d’Hector Guimard. En 1958, la RATP offre le portique qui l’entourait au Museum of Modern Art de New York.
- Reason: T20 opener; FR 26-word sentence split. No fact change.

### saint-jacques/context/en
- Before: Opened on 24 April 1906, the platforms sit at ground level under canopies on central posts, with no advertising, an arrangement the station’s own article calls unique on the network. A building stands directly above the tracks, another rare feature.
- After: The platforms, opened on 24 April 1906, sit at ground level under canopies on central posts. They carry no advertising, an arrangement unique on the network. Saint-Jacques is also one of the few stations with an entrance building above the tracks.
- Reason: T17 self-reference ("the station’s own article" / « son article »); 30/34-word sentences split. Fact correction: FR « Un immeuble surplombe les voies » was wrong; the source describes an édicule (entrance building) above the tracks. FR « auvents » changed to « marquises », the source term. Source: https://fr.wikipedia.org/wiki/Saint-Jacques_(m%C3%A9tro_de_Paris) (« C’est l’une des rares stations à posséder un édicule au-dessus des voies » ; « Les quais ne possèdent pas de publicité. Cet aménagement est un cas unique sur le réseau »).

### saint-jacques/context/fr
- Before: Ouverte le 24 avril 1906, la station présente des quais à fleur de sol, sous des auvents portés par des poteaux centraux, sans publicité, une disposition que son article qualifie d’unique sur le réseau. Un immeuble surplombe directement les voies, autre particularité rare.
- After: Les quais, ouverts le 24 avril 1906, sont à fleur de sol, sous des marquises portées par des poteaux centraux. Ils n’ont aucune publicité, un aménagement unique sur le réseau. Saint-Jacques est aussi l’une des rares stations à posséder un édicule au-dessus des voies.
- Reason: T17 self-reference ("the station’s own article" / « son article »); 30/34-word sentences split. Fact correction: FR « Un immeuble surplombe les voies » was wrong; the source describes an édicule (entrance building) above the tracks. FR « auvents » changed to « marquises », the source term. Source: https://fr.wikipedia.org/wiki/Saint-Jacques_(m%C3%A9tro_de_Paris) (« C’est l’une des rares stations à posséder un édicule au-dessus des voies » ; « Les quais ne possèdent pas de publicité. Cet aménagement est un cas unique sur le réseau »).

### glaciere/etymology/en
- Before: Called Glacière after Rue de la Glacière, an old path to Gentilly named for the ice of the Bièvre valley’s ponds. Frozen each winter, that ice was stored in masonry wells and quarries for use in summer.
- After: Called Glacière after Rue de la Glacière, an old path to Gentilly through the hamlet of La Glacière. The hamlet took its name from the Bièvre’s ponds, which froze each winter. Their ice was stored in masonry wells and quarries for use in summer.
- Reason: FR calque « nommé d’après » (T19); 27-word sentence split. Fact correction (naming chain, R5): the street passed through the hamlet of La Glacière, and the hamlet (not the street) took its name from the ice. "Bièvre valley’s ponds" became "the Bièvre’s ponds" to match the source. Source: https://fr.wikipedia.org/wiki/Glaci%C3%A8re_(m%C3%A9tro_de_Paris) (« un ancien chemin reliant Paris à Gentilly en passant par le hameau de la Glacière. Ce village tenait son nom du fait qu’il était traversé par la Bièvre dont les nombreuses mares et étangs gelaient l’hiver »).

### glaciere/etymology/fr
- Before: La station doit son nom à la rue de la Glacière, ancien chemin vers Gentilly nommé d’après la glace des étangs de la vallée de la Bièvre. Gelée chaque hiver, cette glace était conservée dans des puits maçonnés et des carrières pour l’été.
- After: La station doit son nom à la rue de la Glacière, ancien chemin vers Gentilly par le hameau de la Glacière. Le hameau doit son nom aux étangs de la Bièvre, gelés l’hiver. Leur glace, gardée dans des puits maçonnés et des carrières, servait l’été.
- Reason: FR calque « nommé d’après » (T19); 27-word sentence split. Fact correction (naming chain, R5): the street passed through the hamlet of La Glacière, and the hamlet (not the street) took its name from the ice. "Bièvre valley’s ponds" became "the Bièvre’s ponds" to match the source. Source: https://fr.wikipedia.org/wiki/Glaci%C3%A8re_(m%C3%A9tro_de_Paris) (« un ancien chemin reliant Paris à Gentilly en passant par le hameau de la Glacière. Ce village tenait son nom du fait qu’il était traversé par la Bièvre dont les nombreuses mares et étangs gelaient l’hiver »).

### glaciere/context/en
- Before: The elevated station opened on 24 April 1906, running above Boulevard Auguste-Blanqui, one of several open-air stretches built on this section of the line that year.
- After: Glacière runs above Boulevard Auguste-Blanqui, on one of several elevated stretches built on this section of the line in 1906. The station opened on 24 April that year.
- Reason: T20 opener ("The elevated station" / « La station aérienne »); 26-word EN sentence split. No fact change.

### glaciere/context/fr
- Before: La station aérienne ouvre le 24 avril 1906, au-dessus du boulevard Auguste-Blanqui, l’un des tronçons aériens construits cette année-là sur cette section de la ligne.
- After: Glacière surplombe le boulevard Auguste-Blanqui, sur l’un des tronçons aériens construits en 1906 sur cette section de la ligne. La station ouvre le 24 avril de cette année-là.
- Reason: T20 opener ("The elevated station" / « La station aérienne »); 26-word EN sentence split. No fact change.

### corvisart/context/en
- Before: The station opened on 24 April 1906. During a German air raid on the night of 1 to 2 June 1918, a bomb exploded in front of the station.
- After: Corvisart opened on 24 April 1906. During a German air raid on the night of 1 to 2 June 1918, a bomb exploded in front of the station.
- Reason: T20 opener and T21 ("The station opened on 24 April 1906." duplicated on Edgar Quinet). No fact change.

### corvisart/context/fr
- Before: La station ouvre le 24 avril 1906. Lors d’un raid aérien allemand dans la nuit du 1er au 2 juin 1918, une bombe explose devant la station.
- After: Corvisart ouvre le 24 avril 1906. Lors d’un raid aérien allemand, dans la nuit du 1er au 2 juin 1918, une bombe explose devant la station.
- Reason: T20 opener and T21 ("The station opened on 24 April 1906." duplicated on Edgar Quinet). No fact change.

### place-ditalie/context/en
- Before: The station opened on 24 April 1906 as Line 2 Sud’s eastern terminus from Étoile. When Line 6 opened on 1 March 1909, it reused this stop, disused since 1907, as its own western terminus from Nation.
- After: On 24 April 1906, the station opened as Line 2 Sud’s eastern terminus from Étoile. When Line 6 opened on 1 March 1909, it reused this stop, disused since 1907, as its own western terminus from Nation.
- Reason: T20 opener ("The station opened" / « La station ouvre »). No fact change.

### place-ditalie/context/fr
- Before: La station ouvre le 24 avril 1906 comme terminus est de la ligne 2 Sud depuis Étoile. Quand la ligne 6 ouvre le 1er mars 1909, elle reprend cet arrêt, inutilisé depuis 1907, comme son propre terminus ouest depuis Nation.
- After: Le 24 avril 1906, la station ouvre comme terminus est de la ligne 2 Sud depuis Étoile. Quand la ligne 6 ouvre le 1er mars 1909, elle reprend cet arrêt, inutilisé depuis 1907, comme son propre terminus ouest depuis Nation.
- Reason: T20 opener ("The station opened" / « La station ouvre »). No fact change.

### chevaleret/etymology/en
- Before: Named for Rue du Chevaleret, from a lieu-dit of Ivry-sur-Seine recorded as chemin du Chevaleret in 1670. Its origin is uncertain: a landowning Chevaleret family at Ivry is judged more likely than a path wide enough for only one horse.
- After: Named for Rue du Chevaleret, from a lieu-dit of Ivry-sur-Seine recorded as chemin du Chevaleret in 1670. Its origin is uncertain: a landowning Chevaleret family at Ivry is a more probable source than a path wide enough for only one horse.
- Reason: FR plain space before « : » (FAIL); T7 vague attribution ("is judged" / « est jugée »). The hedge stays ("uncertain", "more probable" / « incertaine », « plus probable »). FR « , d’après un lieu-dit » changed to « qui reprend un lieu-dit ». No fact change.

### chevaleret/etymology/fr
- Before: La station doit son nom à la rue du Chevaleret, d’après un lieu-dit d’Ivry-sur-Seine attesté comme chemin du Chevaleret dès 1670. Son origine reste incertaine : une famille Chevaleret installée à Ivry est jugée plus probable qu’un chemin ne laissant passer qu’un seul cheval.
- After: La station doit son nom à la rue du Chevaleret, qui reprend un lieu-dit d’Ivry-sur-Seine, attesté comme chemin du Chevaleret dès 1670. Son origine reste incertaine : une famille Chevaleret, propriétaire à Ivry, est une piste plus probable qu’un chemin ne laissant passer qu’un seul cheval.
- Reason: FR plain space before « : » (FAIL); T7 vague attribution ("is judged" / « est jugée »). The hedge stays ("uncertain", "more probable" / « incertaine », « plus probable »). FR « , d’après un lieu-dit » changed to « qui reprend un lieu-dit ». No fact change.

### quai-de-la-gare/etymology/en
- Before: Named for the Quai de la Gare on the Seine’s left bank, itself named for Ivry’s river port, built near the Salpêtrière hospital from the end of Louis XV’s reign.
- After: Called Quai de la Gare after the quay on the Seine’s left bank. The quay recalls Ivry’s gare fluviale, a river port built near the Salpêtrière hospital from the end of Louis XV’s reign.
- Reason: FR sentence of 39 words (FAIL) and FR calque « nommé d’après » (T19); EN 30-word sentence split. Fact alignment: FR said « à la fin du règne de Louis XV », EN said "from the end"; FR now says « à partir de la fin », as the source does. Both locales now use the source term gare fluviale, which explains "Gare". Source: https://fr.wikipedia.org/wiki/Quai_de_la_Gare_(m%C3%A9tro_de_Paris) (« ainsi baptisé en mémoire de la gare fluviale d’Ivry élevée près de l’hôpital de la Salpêtrière à partir de la fin du règne de Louis XV »).

### quai-de-la-gare/etymology/fr
- Before: La station doit son nom au quai de la Gare, sur la rive gauche de la Seine, lui-même nommé d’après le port fluvial d’Ivry construit près de l’hôpital de la Salpêtrière à la fin du règne de Louis XV.
- After: La station doit son nom au quai de la Gare, sur la rive gauche de la Seine. Ce quai rappelle la gare fluviale d’Ivry, un port construit près de l’hôpital de la Salpêtrière à partir de la fin du règne de Louis XV.
- Reason: FR sentence of 39 words (FAIL) and FR calque « nommé d’après » (T19); EN 30-word sentence split. Fact alignment: FR said « à la fin du règne de Louis XV », EN said "from the end"; FR now says « à partir de la fin », as the source does. Both locales now use the source term gare fluviale, which explains "Gare". Source: https://fr.wikipedia.org/wiki/Quai_de_la_Gare_(m%C3%A9tro_de_Paris) (« ainsi baptisé en mémoire de la gare fluviale d’Ivry élevée près de l’hôpital de la Salpêtrière à partir de la fin du règne de Louis XV »).

### quai-de-la-gare/context/en
- Before: The elevated station opened on 1 March 1909. A scene of Christophe Honoré’s 2008 film La Belle Personne was shot there.
- After: A scene of La Belle Personne, Christophe Honoré’s 2008 film, was shot at this elevated station, which opened on 1 March 1909.
- Reason: T20 opener ("The elevated station" / « La station aérienne »). Two sentences joined so the field opens with the station-specific fact. No fact change.

### quai-de-la-gare/context/fr
- Before: La station aérienne ouvre le 1er mars 1909. Une scène du film La Belle Personne de Christophe Honoré, sorti en 2008, y a été tournée.
- After: Une scène de La Belle Personne, film de Christophe Honoré sorti en 2008, a été tournée dans cette station aérienne, ouverte le 1er mars 1909.
- Reason: T20 opener ("The elevated station" / « La station aérienne »). Two sentences joined so the field opens with the station-specific fact. No fact change.

### dugommier/etymology/en
- Before: Called Dugommier after Rue Dugommier, which honours General Jacques François Dugommier of the French Revolution. The station opened in 1909 as Charenton, for the street toward that village, and was renamed in 1939, probably to avoid confusion with a Line 8 extension then under construction.
- After: Called Dugommier after Rue Dugommier, which honours General Jacques François Dugommier of the French Revolution. The station opened in 1909 as Charenton. It was renamed in 1939, probably to avoid confusion with a Line 8 extension then under construction.
- Reason: EN 30-word sentence split. Removed the EN gloss "for the street toward that village": FR never had it, and FR cannot take it without going over the 45-word test limit. EN and FR now state the same facts.

### dugommier/context/en
- Before: Passengers could once change at street level to the former Reuilly station on the Vincennes line, until the Bastille to Saint-Mandé section of that line closed on 14 December 1969.
- After: Passengers could once change at street level to the former Reuilly station on the Vincennes line. This ended when the line’s section between Bastille and Saint-Mandé closed on 14 December 1969.
- Reason: 30/32-word sentences split. No fact change.

### dugommier/context/fr
- Before: Les voyageurs pouvaient autrefois correspondre en surface avec l’ancienne station Reuilly de la ligne de Vincennes, jusqu’à la fermeture, le 14 décembre 1969, du tronçon entre Bastille et Saint-Mandé sur cette ligne.
- After: Les voyageurs pouvaient autrefois correspondre en surface avec l’ancienne station Reuilly de la ligne de Vincennes. Cette correspondance disparaît le 14 décembre 1969, avec la fermeture du tronçon de cette ligne entre Bastille et Saint-Mandé.
- Reason: 30/32-word sentences split. No fact change.

### daumesnil/etymology/en
- Before: Named for the former Place Daumesnil and Avenue Daumesnil, honouring Baron General Pierre Daumesnil. The square was renamed in 1946 for Félix Éboué, colonial administrator and early Resistance figure, but the station kept its name.
- After: Called Daumesnil after the former Place Daumesnil and Avenue Daumesnil, both named for Baron General Pierre Daumesnil. The square was renamed in 1946 for Félix Éboué, colonial administrator and early Resistance figure, but the station kept its name.
- Reason: T3 "-ing" tail clause (", honouring…"); EN now opens with the R2 formula. No fact change.

### bel-air/etymology/en
- Before: Named for the Bel-Air district, between the Picpus and Bel-Air quarters on Boulevard de Picpus. The sources checked for this station do not explain how the district itself first got this name.
- After: Called Bel-Air after the Bel-Air district. The station stands on Boulevard de Picpus, between the Picpus and Bel-Air quarters. The origin of the district’s own name is not explained.
- Reason: T17 ("The sources checked…" / « Les sources consultées… »). The statement that the origin of the district name is not explained is kept, without the reference to sources. S1 stays limited because the listed sources do not explain "Bel-Air".

### bel-air/etymology/fr
- Before: La station doit son nom au quartier du Bel-Air, entre les quartiers de Picpus et du Bel-Air, sur le boulevard de Picpus. Les sources consultées pour cette station n’expliquent pas l’origine de ce nom de quartier.
- After: La station doit son nom au quartier du Bel-Air. Elle se trouve sur le boulevard de Picpus, entre les quartiers de Picpus et du Bel-Air. L’origine du nom de ce quartier n’est pas expliquée.
- Reason: T17 ("The sources checked…" / « Les sources consultées… »). The statement that the origin of the district name is not explained is kept, without the reference to sources. S1 stays limited because the listed sources do not explain "Bel-Air".

### picpus/context/en
- Before: Its single entrance keeps a Guimard édicule, registered as a historic monument on 12 February 2016. The nearby Picpus Cemetery holds the grave of Lafayette, among others.
- After: Picpus station keeps a Guimard édicule at its single entrance, registered as a historic monument on 12 February 2016. The nearby Picpus Cemetery holds the grave of Lafayette, among others.
- Reason: Opening possessive ("Its" / « Son ») capped S5. No fact change.

### picpus/context/fr
- Before: Son entrée unique conserve un édicule Guimard, inscrit aux monuments historiques le 12 février 2016. Le cimetière de Picpus, tout proche, abrite entre autres la tombe de Lafayette.
- After: La station Picpus conserve à son entrée unique un édicule Guimard, inscrit aux monuments historiques le 12 février 2016. Le cimetière de Picpus, tout proche, abrite entre autres la tombe de Lafayette.
- Reason: Opening possessive ("Its" / « Son ») capped S5. No fact change.

### nation/context/en
- Before: The Line 6 platforms opened on 1 March 1909. Nation is described as the only Métro station where two lines, 2 and 6, both terminate on loops, and its Line 6 platforms are the only ones here that are not on a curve.
- After: Nation is described as the only Métro station where two lines, 2 and 6, both terminate on loops. Its Line 6 platforms, opened on 1 March 1909, are the only ones at Nation not built on a curve.
- Reason: FR sentence of 40 words (FAIL), EN 34 words; T20 opener (« Les quais de » / "The Line 6"). The hedge "is described as" / « est présentée comme » stays. No fact change.

### nation/context/fr
- Before: Les quais de la ligne 6 ouvrent le 1er mars 1909. Nation est présentée comme la seule station du métro où deux lignes, la 2 et la 6, se terminent chacune sur une boucle, et ses quais de la ligne 6 y sont les seuls à ne pas être en courbe.
- After: Nation est présentée comme la seule station du métro où deux lignes, la 2 et la 6, se terminent chacune sur une boucle. Ses quais de la ligne 6, ouverts le 1er mars 1909, y sont les seuls à ne pas être en courbe.
- Reason: FR sentence of 40 words (FAIL), EN 34 words; T20 opener (« Les quais de » / "The Line 6"). The hedge "is described as" / « est présentée comme » stays. No fact change.

## Review

Fact-preservation review of the 53 changed units. Each fact correction and each added fact was checked against the station's fr.wikipedia article: kleber (arches held up the vault, Second World War), dupleix (pillar supports the elevated station, leak detection), saint-jacques (édicule above the tracks, marquises, no advertising), glaciere (hamlet named for the frozen ponds), quai-de-la-gare (gare fluviale, « à partir de la fin du règne »), edgar-quinet (opened with the Line 2 Sud extension; named for the boulevard). All are confirmed.

Fixes:
- **dugommier:** the rewrite removed a sourced fact, that the first name Charenton came from the street toward that village (source: « Elle doit sa dénomination initiale de Charenton à sa proximité avec la rue éponyme, laquelle conduisait originellement au village de Charenton »). The etymology fields cannot hold it within 45 words in FR, so the fact is now in both context fields: "The station was first called Charenton, like the nearby street that once led to the village of that name." / « La station s’appelait d’abord Charenton, comme la rue voisine qui menait autrefois au village de ce nom. » EN and FR now state the same facts.
- **bel-air etymology:** "The origin of the district’s own name is not explained." / « … n’est pas expliquée. » said, without qualification, that nobody explains the name. That is false: fr.wikipedia "Avenue du Bel-Air" says the origin is disputed and gives three explanations. The sentence is removed in both locales. The note now gives only the district name and the location.
- **trocadero context EN:** "It was removed only in 1959" could refer to the station. Now "The escalator was removed only in 1959."
- **dupleix context FR:** « Un pilier de la station aérienne » is now « Un pilier soutenant la station aérienne », to match the EN and the source.
- **sevres-lecourbe etymology FR:** « qui menait vers cette ville » had no antecedent (no town was named). Now « qui menait à Sèvres ». « la ville du même nom » went over the 45-word limit.
- **glaciere context EN:** "Glacière runs above" is now "Glacière stands above". A station does not run.

Checked, no change:
- chevaleret: "is judged more likely" became "is a more probable source". The attribution is gone, but the comparison still marks uncertainty, so R6 still holds.
- All Line 6 FR strings: no plain space before ; : ! ? or inside « ». All Line 6 entries are within the word limits. Typecheck passes.

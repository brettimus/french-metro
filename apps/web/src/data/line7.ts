import type { Art, MetroLine, Station } from "./types";

const wiki = (title: string) =>
  `https://fr.wikipedia.org/wiki/${encodeURIComponent(title.replaceAll(" ", "_"))}`;
const biography = (name: string, en: string, fr = name) => ({
  name,
  url: {
    en: `https://en.wikipedia.org/wiki/${encodeURIComponent(en.replaceAll(" ", "_"))}`,
    fr: wiki(fr),
  },
});
function station(
  id: string,
  name: string,
  area: string,
  art: Art,
  en: string,
  fr: string,
  contextEn: string,
  contextFr: string,
  extra: Partial<Station> = {},
): Station {
  return {
    id,
    name,
    area,
    art,
    branch: "trunk",
    etymology: { en, fr },
    context: { en: contextEn, fr: contextFr },
    sources: [
      {
        label: `${name} · Wikipédia`,
        url: wiki(`${name.replaceAll(" – ", " - ")} (métro de Paris)`),
      },
    ],
    ...extra,
  };
}

const stations: Station[] = [
  station(
    "la-courneuve-8-mai-1945",
    "La Courneuve – 8 Mai 1945",
    "La Courneuve",
    "square",
    "Called La Courneuve – 8 Mai 1945 because it serves this town at Place du 8-Mai-1945. The square commemorates Germany’s surrender on 8 May 1945 and the end of the Second World War in Europe.",
    "La station doit son nom à la commune de La Courneuve et à la place du 8-Mai-1945. Cette place commémore la capitulation allemande du 8 mai 1945 et la fin de la Seconde Guerre mondiale en Europe.",
    "The northern terminus opened in 1987, when the line extended beyond Fort d’Aubervilliers. Its two island platforms sit between three tracks. The station was designed to connect with the T1 tram, which arrived in 1992.",
    "Le terminus nord ouvre en 1987, lors du prolongement depuis Fort d’Aubervilliers. Ses deux quais centraux sont disposés entre trois voies. La station a été conçue pour accueillir une correspondance avec le tramway T1, arrivé en 1992.",
  ),
  station(
    "fort-daubervilliers",
    "Fort d’Aubervilliers",
    "Aubervilliers",
    "gate",
    "Called Fort d’Aubervilliers because it stands near the fort built in Aubervilliers. This nineteenth-century fortification guarded the route de Flandre on the northeastern approach to Paris.",
    "La station doit son nom au fort voisin, construit à Aubervilliers au XIXe siècle. Cet ouvrage militaire contrôlait la route de Flandre, sur les voies d’accès à Paris depuis le nord-est.",
    "The station became the northern terminus in 1979, when Line 7 first extended beyond Porte de la Villette. It kept that role until the next extension reached La Courneuve in 1987. The fort dates from 1843.",
    "La station devient le terminus nord en 1979, lorsque la ligne 7 dépasse pour la première fois Porte de la Villette. Elle conserve ce rôle jusqu’au prolongement vers La Courneuve en 1987. Le fort date de 1843.",
    {
      sources: [
        {
          label: "Fort d’Aubervilliers · Wikipédia",
          url: wiki("Fort d'Aubervilliers (métro de Paris)"),
        },
      ],
    },
  ),
  station(
    "aubervilliers-pantin-quatre-chemins",
    "Aubervilliers – Pantin – Quatre Chemins",
    "Aubervilliers / Pantin",
    "square",
    "Called Aubervilliers – Pantin – Quatre Chemins because it serves the crossroads on the boundary of those two towns. Quatre Chemins, meaning four roads, names the junction of the old Flanders road with two transverse avenues.",
    "La station doit son nom aux communes d’Aubervilliers et de Pantin, dont elle dessert la limite, et au carrefour des Quatre Chemins. Ce lieu-dit désigne le croisement de l’ancienne route des Flandres avec deux avenues transversales.",
    "The crossing joins the former Route nationale 2 with Avenue de la République and Avenue Édouard-Vaillant. Earlier tram routes also met here. The Métro station opened in 1979 on the extension from Porte de la Villette.",
    "Le carrefour réunit l’ancienne route nationale 2, l’avenue de la République et l’avenue Édouard-Vaillant. D’anciennes lignes de tramway s’y croisaient aussi. Le métro y arrive en 1979, lors du prolongement depuis Porte de la Villette.",
    {
      sources: [
        {
          label: "Société des transports en commun de la région parisienne · Wikipédia",
          url: wiki("Société des transports en commun de la région parisienne"),
        },
      ],
    },
  ),
  station(
    "porte-de-la-villette",
    "Porte de la Villette",
    "Paris 19e",
    "gate",
    "Called Porte de la Villette because it serves the former city gate at La Villette. The gate’s name recalls the independent village of La Villette, later incorporated into Paris.",
    "La station doit son nom à l’ancienne porte de Paris située à La Villette. Le nom de cette porte rappelle le village, puis la commune indépendante de La Villette, ensuite annexée à Paris.",
    "This was the northeastern terminus when Line 7 opened in 1910. The line retained its turning loops here after the 1979 extension. A track connection leads to the La Villette workshops, which maintain equipment for Métro track work.",
    "La station est le terminus nord-est de la ligne 7 à son ouverture en 1910. Ses boucles de retournement subsistent après le prolongement de 1979. Un raccordement mène aux ateliers de La Villette, spécialisés dans les travaux des voies du métro.",
  ),
  station(
    "corentin-cariou",
    "Corentin Cariou",
    "Paris 19e",
    "portrait",
    "Called Corentin Cariou after the adjoining avenue, renamed for the Communist councillor who represented the 19th arrondissement. German forces executed Cariou as a hostage during the Occupation in 1942.",
    "La station doit son nom à l’avenue voisine, rebaptisée en mémoire de Corentin Cariou, conseiller municipal communiste du 19e arrondissement. Retenu comme otage pendant l’Occupation, il est fusillé par les forces allemandes en 1942.",
    "The station first bore the name Pont de Flandre, after the road bridge over the Canal Saint-Denis. It took Cariou’s name in 1946, as Paris commemorated people killed during the Occupation.",
    "La station portait d’abord le nom de Pont de Flandre, celui du pont routier sur le canal Saint-Denis. Elle prend le nom de Cariou en 1946, lorsque Paris commémore les personnes tuées pendant l’Occupation.",
    { people: [{ name: "Corentin Cariou", url: { en: wiki("Corentin Cariou"), fr: wiki("Corentin Cariou") } }] },
  ),
  station(
    "crimee",
    "Crimée",
    "Paris 19e",
    "gate",
    "Called Crimée because it lies near Rue de Crimée, a street named to commemorate the Crimean War.",
    "La station doit son nom à la rue de Crimée, qui commémore la guerre de Crimée.",
    "Crimée belonged to the first section of Line 7, opened in 1910 between Opéra and Porte de la Villette. Rue de Crimée crosses the 19th arrondissement. The station’s street entrance includes a historic Hector Guimard surround.",
    "Crimée appartient au premier tronçon de la ligne 7, ouvert en 1910 entre Opéra et Porte de la Villette. La rue de Crimée traverse le 19e arrondissement. L’une des entrées de la station conserve un entourage historique d’Hector Guimard.",
  ),
  station(
    "riquet",
    "Riquet",
    "Paris 19e",
    "river",
    "Called Riquet after nearby Rue Riquet, which honours Pierre-Paul Riquet. The engineer planned and built the Canal du Midi, linking the Garonne with the Mediterranean across southern France.",
    "La station doit son nom à la rue Riquet, qui honore Pierre-Paul Riquet. Cet ingénieur conçut et réalisa le canal du Midi, reliant la Garonne à la Méditerranée à travers le sud de la France.",
    "Riquet opened one day after the rest of the first Line 7 section in November 1910. Trains initially passed through without stopping. The station lies beneath Avenue de Flandre, close to the Bassin de la Villette.",
    "Riquet ouvre un jour après le reste du premier tronçon de la ligne 7, en novembre 1910. Les trains la traversent d’abord sans arrêt. La station se trouve sous l’avenue de Flandre, près du bassin de la Villette.",
    {
      sources: [
        {
          label: "Rue Riquet · Wikipédia",
          url: wiki("Rue Riquet (Paris)"),
        },
      ],
      people: [
        biography(
          "Pierre-Paul Riquet",
          "Pierre-Paul Riquet",
          "Pierre-Paul Riquet",
        ),
      ],
    },
  ),
  station(
    "stalingrad",
    "Stalingrad",
    "Paris 10e / 19e",
    "square",
    "Called Stalingrad after the neighbouring square, now Place de la Bataille-de-Stalingrad. The name commemorates the Soviet victory over Nazi Germany at Stalingrad during the Second World War.",
    "La station doit son nom à la place voisine, aujourd’hui place de la Bataille-de-Stalingrad. Ce nom commémore la victoire soviétique sur l’Allemagne nazie à Stalingrad pendant la Seconde Guerre mondiale.",
    "The Line 7 platforms originally bore the name Boulevard de la Villette. Underground passages connected them to Lines 2 and 5 in 1942. The combined station took the name Stalingrad in 1946, after the war.",
    "Les quais de la ligne 7 portaient d’abord le nom de Boulevard de la Villette. Des passages souterrains les relient aux lignes 2 et 5 en 1942. L’ensemble prend le nom de Stalingrad en 1946, après la guerre.",
  ),
  station(
    "louis-blanc",
    "Louis Blanc",
    "Paris 10e",
    "portrait",
    "Called Louis Blanc after nearby Rue Louis-Blanc, which honours the French politician, journalist and historian Louis Jean Joseph Blanc.",
    "La station doit son nom à la rue Louis-Blanc, qui rend hommage à Louis Jean Joseph Blanc, homme politique, journaliste et historien français.",
    "The station was built on two levels for the original northern fork of Line 7. Trains once continued either to Porte de la Villette or Pré-Saint-Gervais. The latter branch became the independent Line 7 bis in 1967.",
    "La station est construite sur deux niveaux pour l’ancienne bifurcation nord de la ligne 7. Les trains poursuivaient vers Porte de la Villette ou Pré-Saint-Gervais. Cette seconde branche devient la ligne indépendante 7 bis en 1967.",
    { people: [biography("Louis Blanc", "Louis Blanc")] },
  ),
  station(
    "chateau-landon",
    "Château-Landon",
    "Paris 10e",
    "modern",
    "Called Château-Landon after Rue du Château-Landon. In 1900, Charles Sellier traced the street’s name to a local house belonging to a man named Landon. This challenged an older explanation based on the distant town of Château-Landon.",
    "La station doit son nom à la rue du Château-Landon. En 1900, Charles Sellier rattache ce nom à une maison appartenant à un certain Landon. Il conteste ainsi l’ancienne explication par la ville lointaine de Château-Landon.",
    "A passage beneath the railway tracks connects the station with Gare de l’Est. It was built in 1931, when Gare de l’Est was renovated, to carry luggage and parcels. After the luggage system changed, it became a transfer corridor for passengers.",
    "Un passage sous les voies ferrées relie la station à la gare de l’Est. Il est créé en 1931, lors de la rénovation de la gare, pour le transport des bagages et des colis. Après la réforme de l’acheminement des bagages, il devient un couloir de correspondance pour les voyageurs.",
    {
      sources: [
        {
          label: "Château-Landon · Wikipédia",
          url: wiki("Château-Landon (métro de Paris)"),
        },
        {
          label: "Rue du Château-Landon · histoire du nom",
          url: wiki("Rue du Château-Landon"),
        },
      ],
    },
  ),
  station(
    "gare-de-lest",
    "Gare de l’Est",
    "Paris 10e",
    "station",
    "Called Gare de l’Est because it serves the railway terminus for eastern France. The railway station adopted this name in 1854 as its network expanded beyond Strasbourg.",
    "La station porte le nom de la gare de l’Est, qu’elle dessert, terminus ferroviaire vers l’est de la France. La gare ferroviaire adopte ce nom en 1854, lorsque son réseau s’étend au-delà de Strasbourg.",
    "The Métro station brings together Lines 4, 5 and 7 beneath and beside the railway terminus. Line 7 arrived in 1910. Its platforms share a large underground space with those of Line 5. The full name, Gare de l’Est – Verdun, refers to Avenue de Verdun, which recalls the 1916 battle.",
    "Le métro réunit les lignes 4, 5 et 7 sous la gare ferroviaire et à ses abords. La ligne 7 y arrive en 1910. Ses quais partagent un vaste espace souterrain avec ceux de la ligne 5. Le nom complet, Gare de l’Est – Verdun, renvoie à l’avenue de Verdun, qui évoque la bataille de 1916.",
    {
      sources: [
        {
          label: "Gare de l’Est · Wikipédia",
          url: wiki("Gare de l'Est (métro de Paris)"),
        },
        {
          label: "Avenue de Verdun · origine du nom",
          url: wiki("Avenue de Verdun (Paris)"),
        },
        {
          label: "Ligne 7 du métro de Paris · Wikipédia",
          url: wiki("Ligne 7 du métro de Paris"),
        },
      ],
    },
  ),
  station(
    "poissonniere",
    "Poissonnière",
    "Paris 9e / 10e",
    "market",
    "Called Poissonnière after Rue du Faubourg-Poissonnière. This street followed part of the old fish merchants’ route, used to bring fish from the North Sea to the central markets of Paris.",
    "La station doit son nom à la rue du Faubourg-Poissonnière. Cette voie suivait une partie de l’ancien chemin des marchands de poisson, qui acheminaient leur marchandise depuis la mer du Nord jusqu’aux halles de Paris.",
    "The station opened with the first Line 7 section in 1910. It lies beneath Rue La Fayette where that street crosses Rue du Faubourg-Poissonnière.",
    "La station ouvre avec le premier tronçon de la ligne 7 en 1910. Elle se trouve sous la rue La Fayette, au croisement de la rue du Faubourg-Poissonnière.",
  ),
  station(
    "cadet",
    "Cadet",
    "Paris 9e",
    "garden",
    "Called Cadet after Rue Cadet. The street’s name may come from the brothers Jacques and Jean Cadet, master gardeners who owned the Clos Cadet. This traditional attribution is not certain.",
    "La station doit son nom à la rue Cadet. Ce nom viendrait des frères Jacques et Jean Cadet, maîtres jardiniers et propriétaires du clos Cadet. Cette attribution traditionnelle n’est pas certaine.",
    "Cadet’s platforms lie beneath Rue La Fayette, which honours the general who fought alongside the Americans in their War of Independence. For this reason, the station is tiled in the colours of the United States flag. White shapes on the tiles represent its stars.",
    "Les quais de Cadet se trouvent sous la rue La Fayette, qui honore le général engagé aux côtés des Américains pendant leur guerre d’indépendance. C’est pourquoi le carrelage de la station reprend les couleurs du drapeau des États-Unis. Des silhouettes blanches y figurent ses étoiles.",
  ),
  station(
    "le-peletier",
    "Le Peletier",
    "Paris 9e",
    "portrait",
    "Called Le Peletier after Rue Le Peletier, which honours Louis Le Peletier de Mortefontaine. He was a prévôt des marchands, a senior municipal official responsible for the affairs of Paris before the Revolution.",
    "La station doit son nom à la rue Le Peletier, qui honore Louis Le Peletier de Mortefontaine. Il fut prévôt des marchands, une fonction majeure dans l’administration de Paris avant la Révolution française.",
    "Le Peletier held that municipal office from 1784 to 1789. The Métro station opened in June 1911, seven months after the first Line 7 trains began running. Until it was ready, trains passed through without stopping.",
    "Le Peletier exerce cette charge municipale de 1784 à 1789. La station de métro ouvre en juin 1911, sept mois après les premiers trains de la ligne 7. Jusqu’à son achèvement, les rames la traversent sans s’arrêter.",
  ),
  station(
    "chaussee-dantin-la-fayette",
    "Chaussée d’Antin – La Fayette",
    "Paris 9e",
    "portrait",
    "Called Chaussée d’Antin – La Fayette after two streets. Rue de la Chaussée-d’Antin recalls the Duc d’Antin’s mansion and a roadway raised above marshy ground. Rue La Fayette honours the marquis who fought for American independence.",
    "La station doit son nom à la rue de la Chaussée-d’Antin et à la rue La Fayette. La première rappelle l’hôtel du duc d’Antin et une voie surélevée sur un terrain marécageux. La seconde honore le marquis engagé pour l’indépendance américaine.",
    "La Fayette was added to the station name in 1989. That year, murals on the vaults of Lines 7 and 9 marked the bicentenary of the French Revolution. Their subjects include La Fayette, liberty and the American Revolution.",
    "La Fayette est ajouté au nom de la station en 1989. Cette année-là, des fresques sur les voûtes des lignes 7 et 9 marquent le bicentenaire de la Révolution française. Elles représentent notamment La Fayette, la liberté et la Révolution américaine.",
    {
      sources: [
        {
          label: "Chaussée d’Antin – La Fayette · Wikipédia",
          url: wiki("Chaussée d'Antin - La Fayette (métro de Paris)"),
        },
      ],
      people: [
        biography(
          "La Fayette",
          "Gilbert du Motier, Marquis de Lafayette",
          "Gilbert du Motier de La Fayette",
        ),
      ],
    },
  ),
  station(
    "opera",
    "Opéra",
    "Paris 9e",
    "piano",
    "Called Opéra because it serves the opera house designed by Charles Garnier, now known as the Palais Garnier.",
    "La station doit son nom à l’opéra construit par Charles Garnier, aujourd’hui appelé palais Garnier.",
    "Opéra was the southern terminus of Line 7 when the line opened in 1910. It remained a terminus until the extension to Palais-Royal in 1916. Lines 3, 7 and 8 cross here at different underground levels.",
    "Opéra est le terminus sud de la ligne 7 à son ouverture en 1910. Elle conserve ce rôle jusqu’au prolongement vers Palais-Royal en 1916. Les lignes 3, 7 et 8 se croisent ici à différents niveaux souterrains.",
    {
      people: [
        biography(
          "Charles Garnier",
          "Charles Garnier (architect)",
          "Charles Garnier",
        ),
      ],
    },
  ),
  station(
    "pyramides",
    "Pyramides",
    "Paris 1er / 2e",
    "gate",
    "Called Pyramides after Rue des Pyramides, which commemorates Bonaparte’s victory over the Mamluks at the Battle of the Pyramids in 1798, during the French campaign in Egypt.",
    "La station doit son nom à la rue des Pyramides, qui commémore la victoire de Bonaparte sur les Mamelouks à la bataille des Pyramides en 1798, pendant la campagne d’Égypte.",
    "The station opened during the First World War, in 1916. A shortage of ceramic tiles meant that its initial finish was plain masonry. The arrival of Line 14 in 1998 added a new interchange above the Line 7 tracks.",
    "La station ouvre pendant la Première Guerre mondiale, en 1916. La pénurie de carreaux de faïence impose alors un simple revêtement de maçonnerie. L’arrivée de la ligne 14 en 1998 ajoute une nouvelle salle de correspondance au-dessus des voies de la ligne 7.",
  ),
  station(
    "palais-royal-musee-du-louvre",
    "Palais-Royal – Musée du Louvre",
    "Paris 1er",
    "modern",
    "Called Palais-Royal after the adjoining former royal residence. Musée du Louvre was added in 1989 to signal the museum’s new entrance by the Pyramid.",
    "La station doit son nom au Palais-Royal voisin, ancienne résidence royale. Le complément Musée du Louvre est ajouté en 1989, pour signaler la nouvelle entrée du musée par la Pyramide.",
    "The original station name was Palais-Royal. Line 7 reached it in 1916, and it remained the southern terminus until the extension along the Seine in 1926. The combined name distinguishes it from nearby Louvre – Rivoli.",
    "La station s’appelait à l’origine Palais-Royal. La ligne 7 l’atteint en 1916 et y termine son parcours jusqu’au prolongement le long de la Seine en 1926. Le nom composé la distingue de la station voisine Louvre – Rivoli.",
    {
      sources: [
        {
          label: "Palais-Royal · Wikipédia",
          url: wiki("Palais-Royal"),
        },
      ],
    },
  ),
  station(
    "pont-neuf",
    "Pont-Neuf",
    "Paris 1er",
    "river",
    "Called Pont-Neuf after the Pont Neuf beside it. Despite its name, which means “new bridge”, it is now the oldest surviving bridge in Paris. It was built without houses and with pavements for pedestrians.",
    "La station doit son nom au pont Neuf voisin. Malgré son nom, ce pont est aujourd’hui le plus ancien pont conservé de Paris. Il a été construit sans maisons et doté de trottoirs pour les piétons.",
    "The subtitle La Monnaie recalls nearby Rue de la Monnaie and the mint formerly located there. The mint moved across the Seine to Quai de Conti in 1775. Coin designs and a coining press later formed the station’s cultural decoration.",
    "Le sous-titre La Monnaie rappelle la rue de la Monnaie voisine et l’ancien atelier monétaire qui s’y trouvait. La Monnaie s’installe en 1775 quai de Conti, de l’autre côté de la Seine. Des motifs de pièces et un balancier monétaire composent plus tard le décor culturel de la station.",
    {
      sources: [
        {
          label: "Pont-Neuf · Wikipédia",
          url: wiki("Pont-Neuf (métro de Paris)"),
        },
        {
          label: "Monnaie de Paris · Architecture et installation en 1775",
          url: "https://www.monnaiedeparis.fr/fr/l-architecture-de-la-monnaie-de-paris",
        },
      ],
    },
  ),
  station(
    "chatelet",
    "Châtelet",
    "Paris 1er / 4e",
    "modern",
    "Called Châtelet after Place du Châtelet, laid out on the site of the Grand Châtelet. This fortress was a court and prison before its demolition in the early nineteenth century.",
    "La station doit son nom à la place du Châtelet, aménagée à l’emplacement du Grand Châtelet. Cette forteresse était un tribunal et une prison avant sa démolition au début du XIXe siècle.",
    "The Line 7 station opened separately in 1926 as Pont Notre-Dame, renamed Pont Notre-Dame – Pont au Change that year. A long passage linked it to Châtelet’s other platforms in 1934. It then took their name and kept Pont au Change, the bridge of money changers, as a subtitle.",
    "La station de la ligne 7 ouvre séparément en 1926 sous le nom de Pont Notre-Dame, qui devient la même année Pont Notre-Dame – Pont au Change. Un long passage la relie aux autres quais de Châtelet en 1934 ; elle prend alors leur nom et garde en sous-titre Pont au Change, le pont des changeurs.",
  ),
  station(
    "pont-marie",
    "Pont Marie",
    "Paris 4e",
    "river",
    "Called Pont Marie after the neighbouring bridge, which bears the surname of engineer and developer Christophe Marie. He initiated the bridge project linking the Right Bank with what became the Île Saint-Louis.",
    "La station doit son nom au pont voisin, qui porte le patronyme de l’ingénieur et entrepreneur Christophe Marie. Celui-ci est à l’origine du pont reliant la rive droite à ce qui devient l’île Saint-Louis.",
    "Pont Marie was Line 7’s southern terminus from 1926 until the extension to Sully – Morland in 1930. Its subtitle Cité des Arts refers to the nearby Cité internationale des arts, a residence for artists that opened in 1965.",
    "Pont Marie est le terminus sud de la ligne 7 de 1926 au prolongement vers Sully – Morland en 1930. Son sous-titre Cité des Arts renvoie à la Cité internationale des arts voisine, résidence pour artistes ouverte en 1965.",
    {
      sources: [
        {
          label: "Pont Marie · station",
          url: wiki("Pont Marie (métro de Paris)"),
        },
        { label: "Pont Marie · histoire du pont", url: wiki("Pont Marie") },
      ],
    },
  ),
  station(
    "sully-morland",
    "Sully – Morland",
    "Paris 4e",
    "portrait",
    "Called Sully – Morland after nearby roads and the Pont de Sully. Sully honours Maximilien de Béthune, Henri IV’s minister; Boulevard Morland honours François-Louis de Morlan, known as Morland, a colonel of Napoleon’s Imperial Guard.",
    "La station doit son nom aux voies voisines et au pont de Sully. Sully honore Maximilien de Béthune, ministre d’Henri IV ; le boulevard Morland rappelle François-Louis de Morlan, dit Morland, colonel de la Garde impériale de Napoléon.",
    "The station opened as Pont Sully in 1930 and soon acquired its compound name. It briefly served as the southern terminus. The tunnel under the Seine then connected it to Jussieu, allowing Line 7 to cross to the Left Bank.",
    "La station ouvre sous le nom de Pont Sully en 1930 et prend rapidement son nom composé. Elle sert brièvement de terminus sud. Le tunnel sous la Seine la relie ensuite à Jussieu et permet à la ligne 7 de rejoindre la rive gauche.",
    {
      people: [
        biography(
          "Maximilien de Béthune, duc de Sully",
          "Maximilien de Béthune, Duke of Sully",
          "Maximilien de Béthune",
        ),
      ],
    },
  ),
  station(
    "jussieu",
    "Jussieu",
    "Paris 5e",
    "garden",
    "Called Jussieu after Place Jussieu and Rue Jussieu, which honour botanist Antoine-Laurent de Jussieu. He taught at the Muséum national d’histoire naturelle and belonged to the French Academy of Sciences.",
    "La station doit son nom à la place et à la rue Jussieu, qui honorent le botaniste Antoine-Laurent de Jussieu. Il enseignait au Muséum national d’histoire naturelle et appartenait à l’Académie des sciences.",
    "The station’s former name, Jussieu – Halle-aux-vins, also identified the wine market above it. That market later gave way to the university campus. The adjacent platforms of Lines 7 and 10 opened together during the network’s 1931 reorganisation.",
    "L’ancien nom de la station, Jussieu – Halle-aux-vins, désignait aussi le marché aux vins situé au-dessus. Ce marché laisse ensuite place au campus universitaire. Les quais voisins des lignes 7 et 10 ouvrent ensemble lors de la réorganisation du réseau en 1931.",
    {
      people: [
        biography(
          "Antoine-Laurent de Jussieu",
          "Antoine Laurent de Jussieu",
          "Antoine-Laurent de Jussieu",
        ),
      ],
    },
  ),
  station(
    "place-monge",
    "Place Monge",
    "Paris 5e",
    "portrait",
    "Called Place Monge after the square and adjoining Rue Monge, both named for mathematician Gaspard Monge. Monge was a founder of the École polytechnique.",
    "La station doit son nom à la place et à la rue Monge, toutes deux dédiées au mathématicien Gaspard Monge. Monge est l’un des fondateurs de l’École polytechnique.",
    "The station first opened on Line 10 in 1930. It transferred to Line 7 in 1931 when the river crossing was completed. A connecting tunnel north of the platforms preserves the route used during that first year of operation.",
    "La station ouvre d’abord sur la ligne 10 en 1930. Elle passe à la ligne 7 en 1931, après l’achèvement de la traversée de la Seine. Un raccordement au nord des quais conserve le tracé utilisé pendant cette première année.",
    {
      people: [biography("Gaspard Monge", "Gaspard Monge")],
      sources: [
        {
          label: "Place Monge · Wikipédia",
          url: wiki("Place Monge (métro de Paris)"),
        },
        {
          label: "Ligne 7 du métro de Paris · Wikipédia",
          url: wiki("Ligne 7 du métro de Paris"),
        },
      ],
    },
  ),
  station(
    "censier-daubenton",
    "Censier – Daubenton",
    "Paris 5e",
    "garden",
    "Called Censier – Daubenton after Rue Censier and Rue Daubenton. Censier comes from sans chef, meaning a dead end. Daubenton honours the naturalist Louis Jean-Marie Daubenton, who worked with Buffon and became the first director of the Muséum national d’histoire naturelle.",
    "La station doit son nom à la rue Censier et à la rue Daubenton. Censier vient de sans chef, qui désignait une impasse. Daubenton honore le naturaliste Louis Jean-Marie Daubenton, collaborateur de Buffon et premier directeur du Muséum national d’histoire naturelle.",
    "Until 1965, Halle aux cuirs formed a third part of the station name. It referred to a leather market in the neighbourhood. Tanneries and related trades had settled along the Bièvre, the small river that once flowed through this district.",
    "Jusqu’en 1965, Halle aux cuirs formait une troisième partie du nom de la station. Ce complément désignait un marché du cuir du quartier. Tanneurs et métiers voisins s’étaient installés le long de la Bièvre, rivière qui traversait autrefois ce secteur.",
    {
      people: [
        biography(
          "Louis Jean-Marie Daubenton",
          "Louis Jean-Marie Daubenton",
          "Louis Jean-Marie Daubenton",
        ),
      ],
    },
  ),
  station(
    "les-gobelins",
    "Les Gobelins",
    "Paris 13e",
    "loom",
    "Called Les Gobelins after the tapestry works and avenue, named for the Gobelin family of dyers. Jehan Gobelin established a dye workshop in the fifteenth century; his descendants built workshops beside the Bièvre.",
    "La station doit son nom à la manufacture de tapisseries et à l’avenue, dont le nom vient de la famille de teinturiers Gobelin. Jehan Gobelin fonde un atelier au XVe siècle ; ses descendants s’installent au bord de la Bièvre.",
    "The dyers came before the royal tapestry works. In 1662, Colbert bought the property for the Crown and brought workshops together under Charles Le Brun. Gobelins tapestries use vertical looms, with the weaver working on the reverse of the fabric.",
    "Les teinturiers précèdent la manufacture royale de tapisseries. En 1662, Colbert achète la propriété pour la Couronne et rassemble les ateliers sous la direction de Charles Le Brun. Les tapisseries des Gobelins sont tissées sur des métiers verticaux, à l’envers de l’ouvrage.",
    {
      sources: [
        {
          label: "Les Gobelins · Wikipédia",
          url: wiki("Les Gobelins (métro de Paris)"),
        },
        {
          label: "Mobilier national · Manufacture des Gobelins",
          url: "https://www.mobiliernational.culture.gouv.fr/fr/nous-connaitre/les-manufactures/manufacture-des-gobelins",
        },
      ],
    },
  ),
  station(
    "place-ditalie",
    "Place d’Italie",
    "Paris 13e",
    "square",
    "Called Place d’Italie after the square at the start of Avenue d’Italie. This was the departure point of the road from Paris towards Italy, later known as the Route Nationale 7.",
    "La station doit son nom à la place située au départ de l’avenue d’Italie. C’est le point de départ de la route de Paris vers l’Italie, devenue la route nationale 7.",
    "Lines 5, 6 and 7 meet below this major road junction. The Line 7 platforms first belonged to Line 10 in 1930. They transferred to Line 7 in 1931, when the new tunnel beneath the Seine connected the northern and southern sections.",
    "Les lignes 5, 6 et 7 se rencontrent sous ce grand carrefour. Les quais de la ligne 7 appartiennent d’abord à la ligne 10 en 1930. Ils changent de ligne en 1931, lorsque le tunnel sous la Seine relie les tronçons nord et sud.",
    {
      sources: [
        {
          label: "Place d’Italie · Wikipédia",
          url: wiki("Place d'Italie (métro de Paris)"),
        },
        {
          label: "Ligne 7 du métro de Paris · Wikipédia",
          url: wiki("Ligne 7 du métro de Paris"),
        },
      ],
    },
  ),
  station(
    "tolbiac",
    "Tolbiac",
    "Paris 13e",
    "gate",
    "Called Tolbiac after Rue de Tolbiac, which commemorates Clovis’s victory over the Alamanni at the Battle of Tolbiac. Tolbiac is the old name associated with present-day Zülpich, near Cologne in Germany.",
    "La station doit son nom à la rue de Tolbiac, qui commémore la victoire de Clovis sur les Alamans à la bataille de Tolbiac. Tolbiac est l’ancien nom associé à l’actuelle ville de Zülpich, près de Cologne, en Allemagne.",
    "Rue de Tolbiac crosses the 13th arrondissement from east to west, while the Métro platforms lie beneath Avenue d’Italie. The station opened on Line 10 in 1930 before transferring to Line 7 in the following year.",
    "La rue de Tolbiac traverse le 13e arrondissement d’est en ouest, tandis que les quais du métro se trouvent sous l’avenue d’Italie. La station ouvre sur la ligne 10 en 1930, puis passe à la ligne 7 l’année suivante.",
    {
      sources: [
        { label: "Tolbiac · Wikipédia", url: wiki("Tolbiac (métro de Paris)") },
        {
          label: "Rue de Tolbiac · origine du nom",
          url: wiki("Rue de Tolbiac"),
        },
      ],
    },
  ),
  station(
    "maison-blanche",
    "Maison Blanche",
    "Paris 13e",
    "house",
    "Called Maison Blanche after the surrounding district. The district took its name from an inn called “Maison Blanche”, French for “white house”.",
    "La station doit son nom au quartier de la Maison-Blanche. Ce quartier tient son nom d’une auberge appelée « Maison Blanche ».",
    "Maison Blanche is the last station shared by both southern branches of Line 7. Beyond it, tracks separate towards Mairie d’Ivry and Villejuif. The branch to Le Kremlin-Bicêtre opened in 1982; Line 14 added an interchange here in 2024.",
    "Maison Blanche est la dernière station commune aux deux branches sud de la ligne 7. Au-delà, les voies se séparent vers Mairie d’Ivry et Villejuif. La branche vers Le Kremlin-Bicêtre ouvre en 1982 ; la ligne 14 ajoute une correspondance en 2024.",
    {
      sources: [
        {
          label: "Maison Blanche · Wikipédia",
          url: wiki("Maison Blanche (métro de Paris)"),
        },
        {
          label: "Le Kremlin-Bicêtre · Wikipédia",
          url: wiki("Le Kremlin-Bicêtre (métro de Paris)"),
        },
      ],
    },
  ),
  station(
    "porte-ditalie",
    "Porte d’Italie",
    "Paris 13e",
    "gate",
    "Called Porte d’Italie after the former fortified gate on the road towards Italy. The gate belonged to the Thiers city wall; its road continued south along the route later known as Route nationale 7.",
    "La station doit son nom à l’ancienne porte fortifiée située sur la route vers l’Italie. Cette porte appartenait à l’enceinte de Thiers ; la route se poursuivait vers le sud sur l’axe devenu la route nationale 7.",
    "This is the first station on the Ivry branch after Maison Blanche. Its platforms lie under Boulevard Masséna, east of the road junction. It opened on Line 10 in 1930 and transferred to Line 7 in 1931.",
    "C’est la première station de la branche d’Ivry après Maison Blanche. Ses quais se trouvent sous le boulevard Masséna, à l’est du carrefour. Elle ouvre sur la ligne 10 en 1930 et passe à la ligne 7 en 1931.",
    {
      branch: "ivry",
      sources: [
        {
          label: "Porte d’Italie · Wikipédia",
          url: wiki("Porte d'Italie (métro de Paris)"),
        },
      ],
    },
  ),
  station(
    "porte-de-choisy",
    "Porte de Choisy",
    "Paris 13e",
    "gate",
    "Called Porte de Choisy because it serves the city gateway towards Choisy-le-Roi. The adjoining Avenue de Choisy and Avenue de la Porte-de-Choisy share this reference to the town reached by the road.",
    "La station doit son nom à la porte de Paris donnant vers Choisy-le-Roi. L’avenue de Choisy et l’avenue de la Porte-de-Choisy voisines reprennent cette référence à la commune rejointe par la route.",
    "Porte de Choisy opened as a temporary terminus of Line 10 in 1930. The following year it became a through station on Line 7, as the line crossed the Seine and extended one stop farther to Porte d’Ivry.",
    "Porte de Choisy ouvre comme terminus provisoire de la ligne 10 en 1930. L’année suivante, elle devient une station de passage de la ligne 7, qui traverse alors la Seine et se prolonge d’une station jusqu’à Porte d’Ivry.",
    {
      branch: "ivry",
      sources: [
        {
          label: "Porte de Choisy · Wikipédia",
          url: wiki("Porte de Choisy (métro de Paris)"),
        },
        {
          label: "Sully – Morland · Wikipédia",
          url: wiki("Sully - Morland (métro de Paris)"),
        },
      ],
    },
  ),
  station(
    "porte-divry",
    "Porte d’Ivry",
    "Paris 13e",
    "gate",
    "Called Porte d’Ivry because it serves the Paris gateway towards neighbouring Ivry-sur-Seine. The station lies beneath Avenue de la Porte-d’Ivry, on the road connecting this former city entrance with the town beyond.",
    "La station doit son nom à la porte de Paris tournée vers la commune voisine d’Ivry-sur-Seine. Elle se trouve sous l’avenue de la Porte-d’Ivry, sur la route reliant cette ancienne entrée de la ville à Ivry.",
    "Porte d’Ivry was Line 7’s southern terminus from 1931 to 1946. The extension to Mairie d’Ivry then took trains beyond the Paris boundary. Its three platform tracks retain the layout of that earlier terminus.",
    "Porte d’Ivry est le terminus sud de la ligne 7 de 1931 à 1946. Le prolongement vers Mairie d’Ivry conduit ensuite les trains au-delà de la limite de Paris. Ses trois voies à quai conservent la disposition de cet ancien terminus.",
    {
      branch: "ivry",
      sources: [
        {
          label: "Porte d’Ivry · station",
          url: wiki("Porte d'Ivry (métro de Paris)"),
        },
        { label: "Porte d’Ivry · porte de Paris", url: wiki("Porte d'Ivry") },
        {
          label: "Ligne 7 du métro de Paris · Wikipédia",
          url: wiki("Ligne 7 du métro de Paris"),
        },
      ],
    },
  ),
  station(
    "pierre-et-marie-curie",
    "Pierre et Marie Curie",
    "Ivry-sur-Seine",
    "portrait",
    "Called Pierre et Marie Curie to honour the two physicists. The original name, Pierre Curie, came from the nearby street; Marie’s name was added in 2007 to honour her scientific work too.",
    "La station doit son nom aux physiciens Pierre et Marie Curie. Le nom initial, Pierre Curie, venait de la rue voisine. Celui de Marie est ajouté en 2007 pour honorer aussi son travail scientifique.",
    "The change became official on International Women’s Day, 8 March 2007, following the station’s renovation. Opened in 1946, the station forms the intermediate stop on the extension from Porte d’Ivry to the town hall at Mairie d’Ivry.",
    "Le changement devient officiel le 8 mars 2007, Journée internationale des femmes, après la rénovation de la station. Ouverte en 1946, la station est l’arrêt intermédiaire du prolongement entre Porte d’Ivry et le terminus situé près de la mairie.",
    {
      branch: "ivry",
      people: [
        biography("Pierre Curie", "Pierre Curie"),
        biography("Marie Curie", "Marie Curie"),
      ],
    },
  ),
  station(
    "mairie-divry",
    "Mairie d’Ivry",
    "Ivry-sur-Seine",
    "modern",
    "Called Mairie d’Ivry because it serves the town hall of Ivry-sur-Seine. Mairie is the French word for town hall.",
    "La station doit son nom à la mairie d’Ivry-sur-Seine qu’elle dessert.",
    "The station opened on 1 May 1946 with the extension beyond Porte d’Ivry. Its three platform tracks serve the end of the branch. The other southern branch, which later reached Villejuif, separates from this route at Maison Blanche.",
    "La station ouvre le 1er mai 1946 avec le prolongement au-delà de Porte d’Ivry. Ses trois voies à quai desservent le terminus de la branche. L’autre branche sud, prolongée ensuite vers Villejuif, se sépare de cet itinéraire à Maison Blanche.",
    {
      branch: "ivry",
      sources: [
        {
          label: "Mairie d’Ivry · Wikipédia",
          url: wiki("Mairie d'Ivry (métro de Paris)"),
        },
        {
          label: "Maison Blanche · Wikipédia",
          url: wiki("Maison Blanche (métro de Paris)"),
        },
      ],
    },
  ),
  station(
    "le-kremlin-bicetre",
    "Le Kremlin-Bicêtre",
    "Le Kremlin-Bicêtre",
    "modern",
    "Called Le Kremlin-Bicêtre after the town. Bicêtre evolved from Winchester: Jean de Pontoise, a medieval Bishop of Winchester, built a castle here. Kremlin recalls an inn associated with veterans of Napoleon’s Russian campaign, treated at the local hospital.",
    "La station doit son nom à la commune. Bicêtre est une déformation de Winchester : Jean de Pontoise, évêque médiéval de Winchester, y fit construire un château. Kremlin rappelle un cabaret associé aux vétérans de la campagne de Russie de Napoléon, soignés à l’hôpital voisin.",
    "Le Kremlin-Bicêtre was the first terminus of Line 7’s new southern branch when it opened in 1982. Trains reached Villejuif in 1985, and the station became a through station. The junction with the Ivry branch lies just south of Maison Blanche.",
    "Le Kremlin-Bicêtre est le premier terminus de la nouvelle branche sud de la ligne 7 à son ouverture en 1982. Les trains atteignent Villejuif en 1985 et la station devient alors une station de passage. La bifurcation avec la branche d’Ivry se trouve juste au sud de Maison Blanche.",
    {
      branch: "villejuif",
      sources: [
        {
          label: "Le Kremlin-Bicêtre · station",
          url: wiki("Le Kremlin-Bicêtre (métro de Paris)"),
        },
        {
          label: "Ville du Kremlin-Bicêtre · histoire du nom",
          url: "https://www.kremlinbicetre.fr/ma-ville/decouvrir-le-kremlin-bicetre/lhistoire-du-kremlin-bicetre-dont-archives/",
        },
      ],
    },
  ),
  station(
    "villejuif-leo-lagrange",
    "Villejuif – Léo Lagrange",
    "Villejuif",
    "portrait",
    "Called Villejuif – Léo Lagrange because it serves Villejuif and honours Léo Lagrange, the Socialist lawyer and politician.",
    "La station doit son nom à la commune de Villejuif et à Léo Lagrange, avocat et homme politique socialiste.",
    "The station opened in 1985 with the extension from Le Kremlin-Bicêtre to Louis Aragon. Its project name was Villejuif 1. The platforms lie below Avenue de Paris, with entrances on both sides of this main road.",
    "La station ouvre en 1985 avec le prolongement du Kremlin-Bicêtre à Louis Aragon. Son nom de projet était Villejuif 1. Les quais se trouvent sous l’avenue de Paris, avec des accès répartis des deux côtés de cette grande voie.",
    {
      branch: "villejuif",
      people: [biography("Léo Lagrange", "Léo Lagrange")],
    },
  ),
  station(
    "villejuif-paul-vaillant-couturier",
    "Villejuif – Paul Vaillant-Couturier",
    "Villejuif",
    "portrait",
    "Called Villejuif – Paul Vaillant-Couturier after the town and nearby Avenue Paul-Vaillant-Couturier. The avenue honours the Communist journalist and deputy who became editor of L’Humanité.",
    "La station doit son nom à Villejuif et à l’avenue Paul-Vaillant-Couturier voisine. Cette avenue honore le journaliste et député communiste devenu rédacteur en chef de L’Humanité.",
    "The station opened in 1985 as part of the extension to Louis Aragon. It also bears the subtitle Hôpital Paul Brousse, referring to the nearby hospital. The Métro follows the old Route nationale 7 corridor through this part of Villejuif.",
    "La station ouvre en 1985 dans le cadre du prolongement à Louis Aragon. Elle porte aussi le sous-titre Hôpital Paul Brousse, qui désigne l’hôpital voisin. Le métro suit l’axe de l’ancienne route nationale 7 dans cette partie de Villejuif.",
    {
      branch: "villejuif",
      people: [biography("Paul Vaillant-Couturier", "Paul Vaillant-Couturier")],
    },
  ),
  station(
    "villejuif-louis-aragon",
    "Villejuif – Louis Aragon",
    "Villejuif",
    "portrait",
    "Called Villejuif – Louis Aragon after the town and a nearby road named for the French writer Louis Aragon.",
    "La station doit son nom à Villejuif et à une voie voisine dédiée à l’écrivain français Louis Aragon.",
    "The terminus opened in 1985 when the branch extended beyond Le Kremlin-Bicêtre through Villejuif. It is one of Line 7’s two southern endpoints, alongside Mairie d’Ivry. The two routes share every station as far as Maison Blanche, where they fork.",
    "Le terminus ouvre en 1985 lorsque la branche dépasse Le Kremlin-Bicêtre et traverse Villejuif. C’est l’une des deux extrémités sud de la ligne 7, avec Mairie d’Ivry. Les deux itinéraires partagent toutes les stations jusqu’à Maison Blanche, où ils se séparent.",
    {
      branch: "villejuif",
      sources: [
        {
          label: "Ligne 7 du métro de Paris · Wikipédia",
          url: wiki("Ligne 7 du métro de Paris"),
        },
      ],
      people: [biography("Louis Aragon", "Louis Aragon")],
    },
  ),
];

const trunk = stations.filter((s) => s.branch === "trunk").map((s) => s.id);
export const line7: MetroLine = {
  id: "7",
  color: "#ef9db2",
  textColor: "#3b202a",
  title: { en: "Line 7", fr: "Ligne 7" },
  summary: {
    en: "Line 7 runs from La Courneuve to two southern termini, Mairie d’Ivry and Villejuif – Louis Aragon. Its 38 station names include four Paris gates and people such as the Gobelin dyers and Pierre and Marie Curie.",
    fr: "La ligne 7 relie La Courneuve à deux terminus sud, Mairie d’Ivry et Villejuif – Louis Aragon. Ses 38 noms de stations comprennent quatre portes de Paris et des personnes comme les teinturiers Gobelin ou Pierre et Marie Curie.",
  },
  termini: [
    "La Courneuve – 8 Mai 1945",
    "Mairie d’Ivry",
    "Villejuif – Louis Aragon",
  ],
  stations,
  paths: [
    [
      ...trunk,
      "porte-ditalie",
      "porte-de-choisy",
      "porte-divry",
      "pierre-et-marie-curie",
      "mairie-divry",
    ],
    [
      ...trunk,
      "le-kremlin-bicetre",
      "villejuif-leo-lagrange",
      "villejuif-paul-vaillant-couturier",
      "villejuif-louis-aragon",
    ],
  ],
  featured: ["les-gobelins", "censier-daubenton", "pierre-et-marie-curie"],
  image: "/illustrations/line-7.webp",
  imageAlt: {
    en: "Engraved-style illustration of a wooden upright tapestry loom with a floral tapestry in progress, beside a botanical drawing of a pink flowering plant.",
    fr: "Illustration de style gravure d’un métier à tisser vertical en bois portant une tapisserie fleurie en cours, à côté d’une planche botanique d’une plante à fleurs roses.",
  },
  sources: [
    {
      label: "SNCF Transilien · liste des stations et branches",
      url: "https://www.transilien.com/fr/page-lignes/metro-7",
    },
    { label: "RATP · ligne 7", url: "https://www.ratp.fr/vos-lignes/metro/7" },
    {
      label: "Ligne 7 · parcours et histoire",
      url: wiki("Ligne 7 du métro de Paris"),
    },
  ],
};

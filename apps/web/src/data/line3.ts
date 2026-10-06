import type { MetroLine } from "./types";

// Name-origin sources and editorial limits: docs/research/line3.md.
export const line3: MetroLine = {
  id: "3",
  color: "#6e6e00",
  textColor: "#ffffff",
  title: {
    en: "Line 3",
    fr: "Ligne 3",
  },
  summary: {
    en: "Line 3 runs from Pont de Levallois – Bécon to Gallieni and has 25 stations, all on the Right Bank. Several names recall the proclamation of the Third Republic in 1870, such as Quatre-Septembre and Gambetta. Its first section opened in 1904.",
    fr: "La ligne 3 relie Pont de Levallois – Bécon à Gallieni et compte 25 stations, toutes sur la rive droite. Plusieurs noms rappellent la proclamation de la Troisième République en 1870, comme Quatre-Septembre et Gambetta. Son premier tronçon ouvre en 1904.",
  },
  termini: ["Pont de Levallois – Bécon", "Gallieni"],
  stations: [
    {
      id: "pont-de-levallois-becon",
      name: "Pont de Levallois – Bécon",
      area: "Levallois-Perret",
      art: "river",
      opened: 1937,
      etymology: {
        en: "Named for the Pont de Levallois, the nearby bridge over the Seine, and for Bécon, a district of Courbevoie on the far bank. Levallois takes its name from one of the town’s founders, the property developer Nicolas Eugène Levallois (1816–1879).",
        fr: "La station doit son nom au pont de Levallois, qui franchit la Seine tout près, et à Bécon, un quartier de Courbevoie sur l’autre rive. Levallois porte le nom de l’un des fondateurs de la ville, le promoteur Nicolas Eugène Levallois (1816–1879).",
      },
      context: {
        en: "The station opened on 24 September 1937 and has been the western terminus since then. Trains arrive along a side platform and leave from an island platform between two tracks. Three tail tracks continue beyond the platforms.",
        fr: "La station ouvre le 24 septembre 1937 et est depuis le terminus ouest de la ligne. Les trains arrivent le long d’un quai latéral et repartent d’un quai central encadré par deux voies. Trois voies en tiroir prolongent la station au-delà des quais.",
      },
      sources: [
        {
          label: "Pont de Levallois - Bécon · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Pont_de_Levallois_-_B%C3%A9con_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Nicolas Levallois · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Nicolas_Levallois",
        },
        {
          label: "Bécon-les-Bruyères · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/B%C3%A9con-les-Bruy%C3%A8res",
        },
      ],
    },
    {
      id: "anatole-france",
      name: "Anatole France",
      area: "Levallois-Perret",
      art: "portrait",
      opened: 1937,
      etymology: {
        en: "Named for Rue Anatole-France in Levallois-Perret, formerly Rue de Cormeille. It honours the writer Anatole France (1844–1924), born François Anatole Thibault. He was a member of the Académie française and won the 1921 Nobel Prize in Literature.",
        fr: "La station doit son nom à la rue Anatole-France de Levallois-Perret, autrefois rue de Cormeille. Elle honore l’écrivain Anatole France (1844–1924), de son vrai nom François Anatole Thibault, membre de l’Académie française et prix Nobel de littérature en 1921.",
      },
      context: {
        en: "The street above is narrow, so the two platforms are partly offset from each other. In each direction, trains stop at the first half-station they reach. The station opened on 24 September 1937 with the extension to Pont de Levallois – Bécon.",
        fr: "La rue étant étroite, les deux quais sont partiellement décalés l’un par rapport à l’autre. Dans chaque sens, les trains s’arrêtent à la première demi-station rencontrée. La station ouvre le 24 septembre 1937 avec le prolongement vers Pont de Levallois – Bécon.",
      },
      sources: [
        {
          label: "Anatole France · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Anatole_France_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Anatole France · Wikipedia",
          url: "https://en.wikipedia.org/wiki/Anatole_France",
        },
        {
          label: "Ligne 3 du métro de Paris · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ligne_3_du_m%C3%A9tro_de_Paris",
        },
      ],
      people: [
        {
          name: "Anatole France",
          url: {
            en: "https://en.wikipedia.org/wiki/Anatole_France",
            fr: "https://fr.wikipedia.org/wiki/Anatole_France",
          },
        },
      ],
    },
    {
      id: "louise-michel",
      name: "Louise Michel",
      area: "Levallois-Perret",
      art: "portrait",
      opened: 1937,
      etymology: {
        en: "Named for Rue Louise-Michel, which honours Louise Michel (1830–1905). A teacher who took part in the Paris Commune, she wrote social novels and her memoirs and was nicknamed the “Red Virgin”.",
        fr: "La station doit son nom à la rue Louise-Michel, qui honore Louise Michel (1830–1905). Institutrice communarde, elle écrit des romans sociaux et ses mémoires, et reçoit le surnom de « Vierge rouge ».",
      },
      context: {
        en: "The station opened on 24 September 1937 as Vallier, the name of the street above. On 1 May 1946 the station and the street were both renamed for Louise Michel. The station lies about 100 metres from the Paris city limit.",
        fr: "La station ouvre le 24 septembre 1937 sous le nom de Vallier, celui de la rue qu’elle dessert. Le 1er mai 1946, la station et la rue prennent toutes deux le nom de Louise Michel. La station se trouve à 100 mètres environ de la limite de Paris.",
      },
      sources: [
        {
          label: "Louise Michel · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Louise_Michel_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Louise Michel · Wikipedia",
          url: "https://en.wikipedia.org/wiki/Louise_Michel",
        },
      ],
      people: [
        {
          name: "Louise Michel",
          url: {
            en: "https://en.wikipedia.org/wiki/Louise_Michel",
            fr: "https://fr.wikipedia.org/wiki/Louise_Michel",
          },
        },
      ],
    },
    {
      id: "porte-de-champerret",
      name: "Porte de Champerret",
      area: "Paris 17e",
      art: "gate",
      opened: 1911,
      etymology: {
        en: "Named for the Porte de Champerret, a gate in the city fortifications towards Champerret, a locality of Neuilly. One explanation is that Champerret was the field (champ) of Jean-Jacques Perret, who owned the land.",
        fr: "La station doit son nom à la porte de Champerret, une porte de l’enceinte fortifiée en direction de Champerret, un lieu-dit de Neuilly. Une explication y voit le champ de Jean-Jacques Perret, propriétaire des terrains.",
      },
      context: {
        en: "The station opened on 15 February 1911 as the new western terminus, in place of Pereire. It kept that role until 1937, when the tunnel to Levallois was built under its turning loop. The loop has been used as sidings since then.",
        fr: "La station ouvre le 15 février 1911 comme nouveau terminus ouest, à la place de Pereire. Elle garde ce rôle jusqu’en 1937, quand le tunnel vers Levallois est creusé sous sa boucle de retournement. Cette boucle sert depuis de voie de garage.",
      },
      sources: [
        {
          label: "Porte de Champerret · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Porte_de_Champerret_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Porte de Champerret · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Porte_de_Champerret",
        },
        {
          label: "Ligne 3 du métro de Paris · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ligne_3_du_m%C3%A9tro_de_Paris",
        },
      ],
    },
    {
      id: "pereire",
      name: "Pereire",
      area: "Paris 17e",
      art: "portrait",
      opened: 1910,
      etymology: {
        en: "Named for Boulevard Pereire, which honours the brothers Émile (1800–1875) and Isaac (1806–1880) Pereire. They founded the Compagnie des chemins de fer du Midi and held the concession for the Auteuil railway. Neuilly named the boulevard after them in 1855.",
        fr: "La station doit son nom au boulevard Pereire, qui honore les frères Émile (1800–1875) et Isaac (1806–1880) Pereire. Fondateurs de la Compagnie des chemins de fer du Midi, ils sont concessionnaires de la ligne d’Auteuil. Neuilly donne leur nom au boulevard en 1855.",
      },
      context: {
        en: "The station opened on 23 May 1910 and was the western terminus until February 1911. Beyond Wagram and Pereire, the line descends a 40‰ gradient to pass under the Auteuil railway, now RER C.",
        fr: "La station ouvre le 23 mai 1910 et sert de terminus ouest jusqu’en février 1911. Après Wagram et Pereire, la ligne descend en pente de 40‰ pour passer sous la ligne d’Auteuil, actuelle ligne C du RER.",
      },
      sources: [
        {
          label: "Pereire · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Pereire_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Émile Pereire · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/%C3%89mile_Pereire",
        },
        {
          label: "Boulevard Pereire · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Boulevard_Pereire",
        },
        {
          label: "Ligne 3 du métro de Paris · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ligne_3_du_m%C3%A9tro_de_Paris",
        },
      ],
      people: [
        {
          name: "Émile Pereire",
          url: {
            en: "https://en.wikipedia.org/wiki/Pereire_brothers",
            fr: "https://fr.wikipedia.org/wiki/%C3%89mile_Pereire",
          },
        },
        {
          name: "Isaac Pereire",
          url: {
            en: "https://en.wikipedia.org/wiki/Pereire_brothers",
            fr: "https://fr.wikipedia.org/wiki/Isaac_Pereire",
          },
        },
      ],
    },
    {
      id: "wagram",
      name: "Wagram",
      area: "Paris 17e",
      art: "square",
      opened: 1910,
      etymology: {
        en: "Named for Avenue de Wagram, which recalls the Battle of Wagram of 5–6 July 1809. The French army won a decisive victory there over the Austrian army of Archduke Charles. The avenue received this name in 1864.",
        fr: "La station doit son nom à l’avenue de Wagram, qui rappelle la bataille de Wagram des 5 et 6 juillet 1809. L’armée française y remporte une victoire décisive sur l’armée autrichienne de l’archiduc Charles. L’avenue reçoit ce nom en 1864.",
      },
      context: {
        en: "The station lies under Avenue de Villiers, in the Plaine-de-Monceaux quarter, and opened on 23 May 1910. Between April 2021 and December 2023, its 1960s metal wall panels were removed and the platforms received new white bevelled tiles.",
        fr: "La station se trouve sous l’avenue de Villiers, dans le quartier de la Plaine-de-Monceaux, et ouvre le 23 mai 1910. D’avril 2021 à décembre 2023, son carrossage métallique des années 1960 est déposé et les quais reçoivent un nouveau carrelage blanc biseauté.",
      },
      sources: [
        {
          label: "Wagram · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Wagram_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Battle of Wagram · Wikipedia",
          url: "https://en.wikipedia.org/wiki/Battle_of_Wagram",
        },
        {
          label: "Avenue de Wagram · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Avenue_de_Wagram",
        },
      ],
    },
    {
      id: "malesherbes",
      name: "Malesherbes",
      area: "Paris 17e",
      art: "portrait",
      opened: 1910,
      etymology: {
        en: "Named for Boulevard Malesherbes, which honours Chrétien-Guillaume de Lamoignon de Malesherbes (1721–1794). A magistrate, botanist and minister, he was one of Louis XVI’s defenders at his trial and was guillotined during the Terror.",
        fr: "La station doit son nom au boulevard Malesherbes, qui honore Chrétien-Guillaume de Lamoignon de Malesherbes (1721–1794). Magistrat, botaniste et ministre, il est l’un des défenseurs de Louis XVI lors de son procès, puis est guillotiné sous la Terreur.",
      },
      context: {
        en: "The station opened on 23 May 1910 with a Guimard entrance. In the 1930s it was replaced by a plainer wrought-iron Dervaux surround. The Musée Carnavalet holds a 1918 photograph of the Guimard entrance.",
        fr: "La station ouvre le 23 mai 1910 avec un accès orné d’un édicule Guimard. Dans les années 1930, celui-ci est remplacé par un entourage Dervaux en fer forgé, plus sobre. Le musée Carnavalet conserve une photographie de l’accès Guimard prise en 1918.",
      },
      sources: [
        {
          label: "Malesherbes · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Malesherbes_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Chrétien Guillaume de Lamoignon de Malesherbes · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Chr%C3%A9tien_Guillaume_de_Lamoignon_de_Malesherbes",
        },
        {
          label: "Boulevard Malesherbes · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Boulevard_Malesherbes",
        },
      ],
      people: [
        {
          name: "Chrétien-Guillaume de Lamoignon de Malesherbes",
          url: {
            en: "https://en.wikipedia.org/wiki/Guillaume-Chr%C3%A9tien_de_Lamoignon_de_Malesherbes",
            fr: "https://fr.wikipedia.org/wiki/Chr%C3%A9tien_Guillaume_de_Lamoignon_de_Malesherbes",
          },
        },
      ],
    },
    {
      id: "villiers",
      name: "Villiers",
      area: "Paris 8e / 17e",
      art: "house",
      opened: 1904,
      etymology: {
        en: "Named for Avenue de Villiers, which led to the former village of Villiers-la-Garenne, later absorbed by Levallois-Perret. One explanation is that Villiers is a corruption of the Latin villare. The station was first called Avenue de Villiers.",
        fr: "La station doit son nom à l’avenue de Villiers, qui menait à l’ancien village de Villiers-la-Garenne, absorbé plus tard par Levallois-Perret. Une explication y voit une déformation du latin villare. La station s’appelait d’abord Avenue de Villiers.",
      },
      context: {
        en: "The Line 3 station was first built beside the Line 2 station, at the same level, for a planned shared track to Étoile. When that plan was dropped, its track was lowered 1.6 metres to pass under Line 2. This explains the height of its vault.",
        fr: "La station de la ligne 3 est d’abord construite au même niveau que celle de la ligne 2, en vue d’une voie commune vers Étoile. Après l’abandon du projet, sa voie est abaissée de 1,60 mètre pour passer sous la ligne 2, d’où la hauteur de sa voûte.",
      },
      sources: [
        {
          label: "Villiers · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Villiers_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Avenue de Villiers · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Avenue_de_Villiers",
        },
        {
          label: "Ligne 3 du métro de Paris · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ligne_3_du_m%C3%A9tro_de_Paris",
        },
        {
          label: "Villiers-la-Garenne · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Villiers-la-Garenne",
        },
      ],
    },
    {
      id: "europe",
      name: "Europe",
      area: "Paris 8e",
      art: "square",
      opened: 1904,
      etymology: {
        en: "Named for Place de l’Europe, at the centre of the Europe quarter. The streets of this quarter carry the names of European cities, such as Rome, Milan, Naples and London.",
        fr: "La station doit son nom à la place de l’Europe, au centre du quartier de l’Europe. Les rues de ce quartier portent des noms de villes européennes, comme Rome, Milan, Naples ou Londres.",
      },
      context: {
        en: "On 29 May 2018 the station received the subtitle Simone Veil, on the day the square took her name. Simone Veil was minister of health and the first president of the European Parliament.",
        fr: "Le 29 mai 2018, la station reçoit le sous-titre Simone Veil, le jour même où la place prend son nom. Simone Veil a été ministre de la Santé et la première présidente du Parlement européen.",
      },
      sources: [
        {
          label: "Europe · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Europe_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Quartier de l’Europe · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Quartier_de_l'Europe",
        },
      ],
      people: [
        {
          name: "Simone Veil",
          url: {
            en: "https://en.wikipedia.org/wiki/Simone_Veil",
            fr: "https://fr.wikipedia.org/wiki/Simone_Veil",
          },
        },
      ],
    },
    {
      id: "saint-lazare",
      name: "Saint-Lazare",
      area: "Paris 8e",
      art: "station",
      opened: 1904,
      etymology: {
        en: "Called Saint-Lazare after the nearby railway station and Rue Saint-Lazare. The street led to the Maison Saint-Lazare, a leper hospital dedicated to Saint Lazarus.",
        fr: "La station doit son nom à la gare et à la rue Saint-Lazare voisines. Cette rue menait à la maison Saint-Lazare, ancienne léproserie dédiée à saint Lazare.",
      },
      context: {
        en: "The Line 3 platform opened on 19 October 1904, the first at the station. It lies on a curve under the Cour de Rome, just below the street and above the Line 13 tunnel. Its metal ceiling of silver-painted beams carries white-painted brick vaults.",
        fr: "Le quai de la ligne 3 ouvre le 19 octobre 1904, le premier de la station. Il est établi en courbe sous la cour de Rome, juste sous la chaussée et au-dessus du tunnel de la ligne 13. Son plafond métallique à poutres peintes en argent porte des voûtains de briques peints en blanc.",
      },
      sources: [
        {
          label: "Saint-Lazare · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Saint-Lazare_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Ligne 3 du métro de Paris · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ligne_3_du_m%C3%A9tro_de_Paris",
        },
      ],
    },
    {
      id: "havre-caumartin",
      name: "Havre – Caumartin",
      area: "Paris 9e",
      art: "portrait",
      opened: 1904,
      etymology: {
        en: "Named for Rue de Caumartin and Rue du Havre. Rue de Caumartin honours Antoine-Louis Lefebvre de Caumartin, marquis de Saint-Ange (1725–1803), a prévôt des marchands of Paris. Rue du Havre, added to the name in 1926, honours the Normandy port.",
        fr: "La station doit son nom à la rue de Caumartin et à la rue du Havre. La première honore Antoine-Louis Lefebvre de Caumartin, marquis de Saint-Ange (1725–1803), prévôt des marchands de Paris. La rue du Havre, ajoutée au nom en 1926, honore le port normand.",
      },
      context: {
        en: "The Line 3 platform opened on 19 October 1904 under the name Caumartin. It lies just below the street, at the end of Rue Auber. Towards Opéra, the Line 3 tunnel passes directly above the RER A station Auber, 15 metres lower.",
        fr: "Le quai de la ligne 3 ouvre le 19 octobre 1904 sous le nom de Caumartin. Il se trouve juste sous la chaussée, au débouché de la rue Auber. Vers Opéra, le tunnel de la ligne 3 passe juste au-dessus de la gare Auber du RER A, 15 mètres plus bas.",
      },
      sources: [
        {
          label: "Havre - Caumartin · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Havre_-_Caumartin_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Ligne 3 du métro de Paris · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ligne_3_du_m%C3%A9tro_de_Paris",
        },
      ],
    },
    {
      id: "opera",
      name: "Opéra",
      area: "Paris 9e",
      art: "piano",
      opened: 1904,
      etymology: {
        en: "Called Opéra because it serves the opera house designed by Charles Garnier, now known as the Palais Garnier.",
        fr: "La station doit son nom à l’opéra construit par Charles Garnier, aujourd’hui appelé palais Garnier.",
      },
      context: {
        en: "The crossing of Lines 3, 7 and 8 was built at one time, during the Line 3 works. This masonry shaft 20 metres high rests on three concrete piers in the water table. The work took eleven months, from March 1903 to February 1904.",
        fr: "Le croisement des lignes 3, 7 et 8 est construit en une seule fois, lors des travaux de la ligne 3. Ce puits maçonné de 20 mètres de haut repose sur trois piliers de béton dans la nappe phréatique. Les travaux durent onze mois, de mars 1903 à février 1904.",
      },
      sources: [
        {
          label: "Opéra · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Op%C3%A9ra_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Ligne 3 du métro de Paris · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ligne_3_du_m%C3%A9tro_de_Paris",
        },
        {
          label: "Opéra Garnier · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Op%C3%A9ra_Garnier",
        },
      ],
      people: [
        {
          name: "Charles Garnier",
          url: {
            en: "https://en.wikipedia.org/wiki/Charles_Garnier_(architect)",
            fr: "https://fr.wikipedia.org/wiki/Charles_Garnier",
          },
        },
      ],
    },
    {
      id: "quatre-septembre",
      name: "Quatre-Septembre",
      area: "Paris 2e",
      art: "square",
      opened: 1904,
      etymology: {
        en: "Named for Rue du Quatre-Septembre, which recalls 4 September 1870, the day the Third Republic was proclaimed. Léon Gambetta made the proclamation at the Hôtel de Ville.",
        fr: "La station doit son nom à la rue du Quatre-Septembre, qui rappelle le 4 septembre 1870, jour de la proclamation de la Troisième République. Léon Gambetta la proclame à l’Hôtel de Ville.",
      },
      context: {
        en: "The station opened on 3 November 1904, about two weeks after the first section of the line. It was the first station on the network named for a date. La Courneuve – 8 Mai 1945 followed in 1987.",
        fr: "La station ouvre le 3 novembre 1904, deux semaines environ après le premier tronçon de la ligne. C’est la première station du réseau dont le nom rappelle une date. La Courneuve – 8 Mai 1945 la rejoint en 1987.",
      },
      sources: [
        {
          label: "Quatre-Septembre · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Quatre-Septembre_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Quatre-Septembre (odonyme) · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Quatre-Septembre_(odonyme)",
        },
      ],
    },
    {
      id: "bourse",
      name: "Bourse",
      area: "Paris 2e",
      art: "temple",
      opened: 1904,
      etymology: {
        en: "Named for Place de la Bourse, where the Palais Brongniart stands. The building was formerly called the Palais de la Bourse, because it housed the Paris stock exchange.",
        fr: "La station doit son nom à la place de la Bourse, où se dresse le palais Brongniart. Ce bâtiment s’appelait autrefois palais de la Bourse, car il abritait la Bourse de Paris.",
      },
      context: {
        en: "The Palais Brongniart was built from 1808 to 1826 on Napoleon’s initiative. Its architect, Alexandre-Théodore Brongniart, died in 1813, and Éloi Labarre completed it. The station’s two entrances are set into the railings around the building.",
        fr: "Le palais Brongniart est construit de 1808 à 1826 à l’initiative de Napoléon. Son architecte, Alexandre-Théodore Brongniart, meurt en 1813 et Éloi Labarre achève le bâtiment. Les deux accès de la station sont intégrés aux grilles qui l’entourent.",
      },
      sources: [
        {
          label: "Bourse · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Bourse_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Palais Brongniart · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Palais_Brongniart",
        },
      ],
    },
    {
      id: "sentier",
      name: "Sentier",
      area: "Paris 2e",
      art: "house",
      opened: 1904,
      etymology: {
        en: "Named for Rue du Sentier, in the quarter of the same name. The origin of the street name is uncertain. The street probably began as a path (sentier), by one account leading to the city rampart. Some old maps call it Rue du Chantier.",
        fr: "La station doit son nom à la rue du Sentier, dans le quartier du même nom. L’origine du nom est incertaine : la rue serait d’abord un sentier, qui menait selon une version au rempart de la ville. Certains plans anciens la nomment rue du Chantier.",
      },
      context: {
        en: "The station opened on 20 November 1904, a month after the first section of the line. In 2025 it was one of five stations on the network whose platforms kept 1960s metal wall panels. Parmentier, on the same line, was another.",
        fr: "La station ouvre le 20 novembre 1904, un mois après le premier tronçon de la ligne. En 2025, elle fait partie des cinq stations du réseau dont les quais conservent un carrossage métallique des années 1960. Parmentier, sur la même ligne, en fait aussi partie.",
      },
      sources: [
        {
          label: "Sentier · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Sentier_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Rue du Sentier (Paris) · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Rue_du_Sentier_(Paris)",
        },
        {
          label: "Parmentier · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Parmentier_(m%C3%A9tro_de_Paris)",
        },
      ],
    },
    {
      id: "reaumur-sebastopol",
      name: "Réaumur – Sébastopol",
      area: "Paris 2e / 3e",
      art: "portrait",
      opened: 1904,
      etymology: {
        en: "Called Réaumur – Sébastopol after the intersecting street and boulevard. Réaumur honours the physicist and naturalist René-Antoine Ferchault de Réaumur; Sébastopol recalls the capture of the Crimean port in 1855.",
        fr: "La station porte les noms de la rue et du boulevard qui se croisent ici. Réaumur honore le physicien et naturaliste René-Antoine Ferchault de Réaumur ; Sébastopol rappelle la prise du port de Crimée en 1855.",
      },
      context: {
        en: "The Line 3 platforms opened on 19 November 1904; until then trains passed through without stopping. The two lines cross at right angles under the ticket hall, with Line 3 below Line 4. Just east of the station, a service track from Line 11 joins Line 3.",
        fr: "Les quais de la ligne 3 ouvrent le 19 novembre 1904 ; jusque-là, les rames passent sans s’arrêter. Les deux lignes se croisent à angle droit sous la salle d’échanges, la ligne 3 sous la ligne 4. Juste à l’est, un raccordement venant de la ligne 11 rejoint la ligne 3.",
      },
      sources: [
        {
          label: "Réaumur - Sébastopol · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/R%C3%A9aumur_-_S%C3%A9bastopol_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Ligne 3 du métro de Paris · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ligne_3_du_m%C3%A9tro_de_Paris",
        },
      ],
    },
    {
      id: "arts-et-metiers",
      name: "Arts et Métiers",
      area: "Paris 3e",
      art: "loom",
      opened: 1904,
      etymology: {
        en: "Named for the Conservatoire national des arts et métiers, founded by Abbé Henri Grégoire on 10 October 1794. It first trained technicians and engineers through demonstrations with scientific objects, and it now houses the Musée des Arts et Métiers.",
        fr: "La station doit son nom au Conservatoire national des arts et métiers, fondé par l’abbé Henri Grégoire le 10 octobre 1794. Il forme d’abord des techniciens et des ingénieurs par la démonstration d’objets scientifiques et abrite aujourd’hui le musée des Arts et Métiers.",
      },
      context: {
        en: "The Line 3 platform opened on 19 October 1904 and lies on a curve under the corner of Rue Réaumur and Rue de Turbigo. After 1988 it received a dark green “Ouï-dire” decoration, with lighting strips on curved brackets shaped like scythes.",
        fr: "Le quai de la ligne 3 ouvre le 19 octobre 1904. Il est établi en courbe sous l’angle des rues Réaumur et de Turbigo. Après 1988, il reçoit une décoration de style « Ouï-dire » vert foncé, avec des bandeaux lumineux portés par des consoles courbes en forme de faux.",
      },
      sources: [
        {
          label: "Arts et Métiers · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Arts_et_M%C3%A9tiers_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Conservatoire national des arts et métiers · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Conservatoire_national_des_arts_et_m%C3%A9tiers",
        },
      ],
      people: [
        {
          name: "Henri Grégoire",
          url: {
            en: "https://en.wikipedia.org/wiki/Henri_Gr%C3%A9goire",
            fr: "https://fr.wikipedia.org/wiki/Abb%C3%A9_Gr%C3%A9goire",
          },
        },
      ],
    },
    {
      id: "temple",
      name: "Temple",
      area: "Paris 3e",
      art: "church",
      opened: 1904,
      etymology: {
        en: "Named for Rue du Temple, which refers to the Knights Templar. The order settled in this area, known as the Temple quarter, in the middle of the 13th century.",
        fr: "La station doit son nom à la rue du Temple, qui renvoie à l’ordre des Templiers. Celui-ci s’installe au milieu du XIIIe siècle dans ce secteur, appelé quartier du Temple.",
      },
      context: {
        en: "Temple is one of two station names shared by the Paris Métro and the London Underground, with Saint-Paul on Line 1. London’s Temple station is also named for the Templars. In 1982 the artist Hervé Mathieu-Bachelot made a mosaic, “Couleur en masses”, inside the station.",
        fr: "Temple est l’un des deux noms de station communs aux métros de Paris et de Londres, avec Saint-Paul sur la ligne 1. La station Temple de Londres doit elle aussi son nom aux Templiers. En 1982, l’artiste Hervé Mathieu-Bachelot réalise dans la station une mosaïque, « Couleur en masses ».",
      },
      sources: [
        {
          label: "Temple · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Temple_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Rue du Temple · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Rue_du_Temple",
        },
      ],
    },
    {
      id: "republique",
      name: "République",
      area: "Paris 3e / 10e / 11e",
      art: "square",
      opened: 1904,
      etymology: {
        en: "Called République after Place de la République. The square received its name as Paris planned a monument celebrating the French Republic.",
        fr: "La station doit son nom à la place de la République, rebaptisée alors que Paris prépare un monument célébrant la République française.",
      },
      context: {
        en: "The station was the first on the network to have lifts, in 1910. The Line 3 platforms opened on 19 October 1904, the first at the square, under its eastern part. They lie below the Line 5 tunnel.",
        fr: "La station est la première du réseau à recevoir des ascenseurs, en 1910. Les quais de la ligne 3 ouvrent le 19 octobre 1904, les premiers de la place, sous sa partie est. Ils se trouvent sous le tunnel de la ligne 5.",
      },
      sources: [
        {
          label: "République · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/R%C3%A9publique_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Ligne 3 du métro de Paris · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ligne_3_du_m%C3%A9tro_de_Paris",
        },
      ],
    },
    {
      id: "parmentier",
      name: "Parmentier",
      area: "Paris 11e",
      art: "portrait",
      opened: 1904,
      etymology: {
        en: "Named for Avenue Parmentier, which honours the agronomist Antoine-Augustin Parmentier (1737–1813). He promoted the potato as food for people.",
        fr: "La station doit son nom à l’avenue Parmentier, qui honore l’agronome Antoine-Augustin Parmentier (1737–1813). Il a promu la pomme de terre dans l’alimentation humaine.",
      },
      context: {
        en: "The station is deeper than usual because the line passes under the Canal Saint-Martin nearby. Its single entrance has a Guimard surround, listed as a historic monument since 29 May 1978. The platforms received a decoration about Parmentier and the potato.",
        fr: "La station est plus profonde que la moyenne, car la ligne passe sous le canal Saint-Martin tout proche. Son unique accès est orné d’un entourage Guimard, inscrit aux monuments historiques depuis le 29 mai 1978. Les quais ont reçu une décoration consacrée à Parmentier et à la pomme de terre.",
      },
      sources: [
        {
          label: "Parmentier · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Parmentier_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Antoine-Augustin Parmentier · Wikipedia",
          url: "https://en.wikipedia.org/wiki/Antoine-Augustin_Parmentier",
        },
      ],
      people: [
        {
          name: "Antoine-Augustin Parmentier",
          url: {
            en: "https://en.wikipedia.org/wiki/Antoine-Augustin_Parmentier",
            fr: "https://fr.wikipedia.org/wiki/Antoine_Parmentier",
          },
        },
      ],
    },
    {
      id: "rue-saint-maur",
      name: "Rue Saint-Maur",
      area: "Paris 11e",
      art: "church",
      opened: 1904,
      etymology: {
        en: "Named for Rue Saint-Maur, an old road from the abbey of Saint-Maur to the abbey of Saint-Denis. It takes its name from the first abbey, which received the relics of Saint Maurus in 868.",
        fr: "La station doit son nom à la rue Saint-Maur, ancienne route reliant l’abbaye de Saint-Maur à celle de Saint-Denis. Elle tient son nom de la première, qui reçoit les reliques de saint Maur en 868.",
      },
      context: {
        en: "The station opened on 19 October 1904 as Saint-Maur. On 1 September 1998 it became Rue Saint-Maur, so that passengers would not confuse it with the town of Saint-Maur-des-Fossés and its RER A stations.",
        fr: "La station ouvre le 19 octobre 1904 sous le nom de Saint-Maur. Le 1er septembre 1998, elle devient Rue Saint-Maur, pour éviter toute confusion avec la ville de Saint-Maur-des-Fossés et ses gares du RER A.",
      },
      sources: [
        {
          label: "Rue Saint-Maur · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Rue_Saint-Maur_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Rue Saint-Maur · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Rue_Saint-Maur",
        },
      ],
    },
    {
      id: "pere-lachaise",
      name: "Père Lachaise",
      area: "Paris 11e / 20e",
      art: "garden",
      opened: 1904,
      etymology: {
        en: "Named for the Père-Lachaise cemetery, opened in 1804 on a former Jesuit property. The name recalls François d’Aix de La Chaise (1624–1709), a Jesuit and the confessor of Louis XIV for 34 years, who lived there.",
        fr: "La station doit son nom au cimetière du Père-Lachaise, ouvert en 1804 sur un ancien domaine des jésuites. Ce nom rappelle François d’Aix de La Chaise (1624–1709), jésuite et confesseur de Louis XIV pendant 34 ans, qui y vivait.",
      },
      context: {
        en: "On 25 February 1909 the station became the first on the network with an escalator. It was installed because the Line 2 platforms lie deeper than those of Line 3. The Line 3 platform opened on 19 October 1904 and served as the eastern terminus until 25 January 1905.",
        fr: "Le 25 février 1909, la station devient la première du réseau équipée d’un escalier mécanique. Il est installé car les quais de la ligne 2 sont plus profonds que ceux de la ligne 3. Le quai de la ligne 3 ouvre le 19 octobre 1904 et sert de terminus est jusqu’au 25 janvier 1905.",
      },
      sources: [
        {
          label: "Père Lachaise · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/P%C3%A8re_Lachaise_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Cimetière du Père-Lachaise · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Cimeti%C3%A8re_du_P%C3%A8re-Lachaise",
        },
        {
          label: "François d’Aix de La Chaise · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Fran%C3%A7ois_d'Aix_de_La_Chaise",
        },
      ],
      people: [
        {
          name: "François d’Aix de La Chaise",
          url: {
            en: "https://en.wikipedia.org/wiki/Fran%C3%A7ois_de_la_Chaise",
            fr: "https://fr.wikipedia.org/wiki/Fran%C3%A7ois_d'Aix_de_La_Chaise",
          },
        },
      ],
    },
    {
      id: "gambetta",
      name: "Gambetta",
      area: "Paris 20e",
      art: "portrait",
      opened: 1905,
      etymology: {
        en: "Named for Place Gambetta and Avenue Gambetta, which honour Léon Gambetta (1838–1882). A member of the Government of National Defence in 1870, he later became Président du Conseil. He was a deputy for the 20th arrondissement.",
        fr: "La station doit son nom à la place et à l’avenue Gambetta, qui honorent Léon Gambetta (1838–1882). Membre du gouvernement de la Défense nationale en 1870, il devient ensuite président du Conseil. Il est député du 20e arrondissement.",
      },
      context: {
        en: "The first station opened on 25 January 1905 on a terminal loop around the town hall of the 20th arrondissement. A new through station opened west of the square on 23 August 1969. It absorbed Martin Nadaud station, whose platforms now form the western end of Gambetta’s.",
        fr: "La première station ouvre le 25 janvier 1905 sur une boucle terminale autour de la mairie du 20e arrondissement. Une nouvelle station de passage ouvre à l’ouest de la place le 23 août 1969. Elle absorbe la station Martin Nadaud, dont les quais forment l’extrémité ouest de ceux de Gambetta.",
      },
      sources: [
        {
          label: "Gambetta · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Gambetta_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Léon Gambetta · Wikipedia",
          url: "https://en.wikipedia.org/wiki/L%C3%A9on_Gambetta",
        },
        {
          label: "Martin Nadaud (métro de Paris) · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Martin_Nadaud_(m%C3%A9tro_de_Paris)",
        },
      ],
      people: [
        {
          name: "Léon Gambetta",
          url: {
            en: "https://en.wikipedia.org/wiki/L%C3%A9on_Gambetta",
            fr: "https://fr.wikipedia.org/wiki/L%C3%A9on_Gambetta",
          },
        },
      ],
    },
    {
      id: "porte-de-bagnolet",
      name: "Porte de Bagnolet",
      area: "Paris 20e",
      art: "gate",
      opened: 1971,
      etymology: {
        en: "Named for the Porte de Bagnolet, the gate of Paris next to the town of Bagnolet. A Line 2 station, opened as Rue de Bagnolet, was renamed Alexandre Dumas on 13 September 1970 to avoid confusion with this one.",
        fr: "La station doit son nom à la porte de Bagnolet, qui jouxte la commune de Bagnolet. Une station de la ligne 2, ouverte sous le nom de Rue de Bagnolet, a été rebaptisée Alexandre Dumas le 13 septembre 1970 pour éviter toute confusion avec celle-ci.",
      },
      context: {
        en: "The ground here is a mix of gypsum, sand and clay. The station therefore stands on eighty piles one metre in diameter, anchored in limestone 27 metres down. It opened on 2 April 1971 with the extension to Gallieni.",
        fr: "Le sous-sol mêle gypse, sable et argile. La station repose donc sur quatre-vingts pieux d’un mètre de diamètre, ancrés dans le calcaire à 27 mètres de profondeur. Elle ouvre le 2 avril 1971 avec le prolongement vers Gallieni.",
      },
      sources: [
        {
          label: "Porte de Bagnolet · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Porte_de_Bagnolet_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Ligne 3 du métro de Paris · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ligne_3_du_m%C3%A9tro_de_Paris",
        },
        {
          label: "Porte de Bagnolet · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Porte_de_Bagnolet",
        },
      ],
    },
    {
      id: "gallieni",
      name: "Gallieni",
      area: "Bagnolet",
      art: "portrait",
      opened: 1971,
      etymology: {
        en: "Named for Avenue Gallieni in Bagnolet, which honours Joseph Gallieni (1849–1916), made Marshal of France in 1921, after his death. As military governor of Paris in 1914, he had a small part of the Sixth Army taken to the Marne front in Paris taxis.",
        fr: "La station doit son nom à l’avenue Gallieni de Bagnolet, qui honore Joseph Gallieni (1849–1916), maréchal de France à titre posthume en 1921. Gouverneur militaire de Paris en 1914, il fait conduire une petite partie de la 6e armée sur la Marne en taxis parisiens.",
      },
      context: {
        en: "The station was built in an open cut inside the motorway interchange where the A3 meets the Boulevard Périphérique. It opened on 2 April 1971 as the eastern terminus. Above it is the Paris-Gallieni international coach station, closed since 2020.",
        fr: "La station est construite à ciel ouvert, au milieu de l’échangeur où l’autoroute A3 rejoint le boulevard périphérique. Elle ouvre le 2 avril 1971 comme terminus est. Au-dessus se trouve la gare routière internationale de Paris-Gallieni, fermée depuis 2020.",
      },
      sources: [
        {
          label: "Gallieni · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Gallieni_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Joseph Gallieni · Wikipedia",
          url: "https://en.wikipedia.org/wiki/Joseph_Gallieni",
        },
        {
          label: "Ligne 3 du métro de Paris · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ligne_3_du_m%C3%A9tro_de_Paris",
        },
      ],
      people: [
        {
          name: "Joseph Gallieni",
          url: {
            en: "https://en.wikipedia.org/wiki/Joseph_Gallieni",
            fr: "https://fr.wikipedia.org/wiki/Joseph_Gallieni",
          },
        },
      ],
    },
  ],
  paths: [
    [
      "pont-de-levallois-becon",
      "anatole-france",
      "louise-michel",
      "porte-de-champerret",
      "pereire",
      "wagram",
      "malesherbes",
      "villiers",
      "europe",
      "saint-lazare",
      "havre-caumartin",
      "opera",
      "quatre-septembre",
      "bourse",
      "sentier",
      "reaumur-sebastopol",
      "arts-et-metiers",
      "temple",
      "republique",
      "parmentier",
      "rue-saint-maur",
      "pere-lachaise",
      "gambetta",
      "porte-de-bagnolet",
      "gallieni",
    ],
  ],
  featured: [
    "opera",
    "quatre-septembre",
    "louise-michel",
  ],
  image: "/illustrations/line-3.webp",
  imageAlt: {
    en: "Engraved-style illustration of the Palais Garnier opera house, with its arcaded facade and green dome.",
    fr: "Illustration de style gravure de l’opéra Garnier, avec sa façade à arcades et son dôme vert.",
  },
  sources: [
    {
      label: "Ligne 3 du métro de Paris · Wikipédia",
      url: "https://fr.wikipedia.org/wiki/Ligne_3_du_m%C3%A9tro_de_Paris",
    },
    {
      label: "Paris Metro Line 3 · Wikipedia",
      url: "https://en.wikipedia.org/wiki/Paris_Metro_Line_3",
    },
    {
      label: "Île-de-France Mobilités · arrêts-lignes",
      url: "https://data.iledefrance-mobilites.fr/explore/dataset/arrets-lignes/",
    },
    {
      label: "Île-de-France Mobilités · référentiel des lignes",
      url: "https://data.iledefrance-mobilites.fr/explore/dataset/referentiel-des-lignes/",
    },
  ],
};

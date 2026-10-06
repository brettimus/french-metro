import type { MetroLine } from "./types";

// Name-origin sources and editorial limits: docs/research/line2.md.
export const line2: MetroLine = {
  id: "2",
  color: "#003ca6",
  textColor: "#ffffff",
  title: {
    en: "Line 2",
    fr: "Ligne 2",
  },
  summary: {
    en: "Line 2 runs in a semicircle across the north of Paris, from Porte Dauphine to Nation, almost entirely along the former outer boulevards. Several of its 25 station names recall gates in the Wall of the Farmers-General, such as Place de Clichy and La Chapelle. Four of its stations stand on a viaduct.",
    fr: "La ligne 2 décrit un demi-cercle au nord de Paris, de Porte Dauphine à Nation, presque entièrement sur les anciens boulevards extérieurs. Plusieurs de ses 25 noms de stations rappellent des barrières du mur des Fermiers généraux, comme Place de Clichy et La Chapelle. Quatre de ses stations sont sur un viaduc.",
  },
  termini: ["Porte Dauphine", "Nation"],
  stations: [
    {
      id: "porte-dauphine",
      name: "Porte Dauphine",
      area: "Paris 16e",
      art: "gate",
      opened: 1900,
      etymology: {
        en: "Named for the Porte Dauphine, a gate at the end of the Belle Faisanderie, Marie-Antoinette’s pheasantry. She was then the dauphine, the wife of the heir to the throne, by her marriage in 1770.",
        fr: "La station doit son nom à la porte Dauphine, située au bout de la Belle Faisanderie de Marie-Antoinette. Celle-ci était alors dauphine, épouse de l’héritier du trône, depuis son mariage en 1770.",
      },
      context: {
        en: "Entrance 3 keeps a closed Guimard pavilion with its glass canopy, the last of these pavilions that the RATP did not destroy. It was restored in 1999 and listed as a historic monument in 2016. Trains turn on a loop of 30 metres radius, the tightest on the network.",
        fr: "L’accès 3 conserve un édicule Guimard fermé, avec sa verrière, le dernier de ces pavillons que la RATP n’a pas détruit. Restauré en 1999, il est inscrit monument historique en 2016. Les trains font demi-tour sur une boucle de 30 mètres de rayon, la plus serrée du réseau.",
      },
      sources: [
        {
          label: "Porte Dauphine · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Porte_Dauphine_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Porte Dauphine · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Porte_Dauphine",
        },
        {
          label: "Ligne 2 du métro de Paris · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ligne_2_du_m%C3%A9tro_de_Paris",
        },
      ],
      people: [
        {
          name: "Marie-Antoinette",
          url: {
            en: "https://en.wikipedia.org/wiki/Marie_Antoinette",
            fr: "https://fr.wikipedia.org/wiki/Marie-Antoinette_d'Autriche",
          },
        },
      ],
    },
    {
      id: "victor-hugo",
      name: "Victor Hugo",
      area: "Paris 16e",
      art: "portrait",
      opened: 1900,
      etymology: {
        en: "Named for Place Victor-Hugo and Avenue Victor-Hugo, which honour the writer Victor Hugo (1802–1885). The avenue, formerly Avenue d’Eylau, took his name in 1881. He spent his last years in a house on it.",
        fr: "La station doit son nom à la place et à l’avenue Victor-Hugo, qui honorent l’écrivain Victor Hugo (1802–1885). L’avenue, auparavant avenue d’Eylau, prend son nom en 1881. Il vit ses dernières années dans une maison de cette avenue.",
      },
      context: {
        en: "The station was rebuilt in 1931 on straight track to the north-east. The curve of the first platforms was unsafe for the new, longer cars. A niche on the Nation-bound platform holds a bust of Hugo by David d’Angers.",
        fr: "La station est reconstruite en 1931 sur une section droite, au nord-est, car les quais d’origine étaient trop courbes pour les nouvelles voitures, plus longues. Une niche du quai vers Nation abrite un buste de Hugo par David d’Angers.",
      },
      sources: [
        {
          label: "Victor Hugo · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Victor_Hugo_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Avenue Victor-Hugo · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Avenue_Victor-Hugo_(Paris)",
        },
        {
          label: "Ligne 2 du métro de Paris · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ligne_2_du_m%C3%A9tro_de_Paris",
        },
      ],
      people: [
        {
          name: "Victor Hugo",
          url: {
            en: "https://en.wikipedia.org/wiki/Victor_Hugo",
            fr: "https://fr.wikipedia.org/wiki/Victor_Hugo",
          },
        },
      ],
    },
    {
      id: "charles-de-gaulle-etoile",
      name: "Charles de Gaulle – Étoile",
      area: "Paris 8e / 16e / 17e",
      art: "square",
      opened: 1900,
      etymology: {
        en: "Named Étoile for the star-shaped convergence of avenues at the place, a name that predates Charles de Gaulle’s by decades. His name was added on 30 November 1970, three weeks after his death.",
        fr: "La station doit son nom d’Étoile au carrefour en étoile formé par les avenues de la place. Ce nom précède de plusieurs décennies celui de Charles de Gaulle, ajouté le 30 novembre 1970, trois semaines après sa mort.",
      },
      context: {
        en: "The Line 2 platforms opened on 13 December 1900 and were the line’s eastern terminus until the extension to Anvers on 7 October 1902. They lie on the lowest level, under the start of Avenue de Wagram, and keep orange 1970s tiling in the Mouton-Duvernet style.",
        fr: "Les quais de la ligne 2 ouvrent le 13 décembre 1900 et servent de terminus est jusqu’au prolongement vers Anvers, le 7 octobre 1902. Situés au niveau le plus bas, sous le début de l’avenue de Wagram, ils gardent un carrelage orange des années 1970, de style Mouton-Duvernet.",
      },
      sources: [
        {
          label: "Charles de Gaulle – Étoile · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Charles_de_Gaulle_-_%C3%89toile_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Charles de Gaulle–Étoile station · Wikipedia",
          url: "https://en.wikipedia.org/wiki/Charles_de_Gaulle%E2%80%93%C3%89toile_station",
        },
        {
          label: "Ligne 2 du métro de Paris · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ligne_2_du_m%C3%A9tro_de_Paris",
        },
      ],
    },
    {
      id: "ternes",
      name: "Ternes",
      area: "Paris 8e / 17e",
      art: "house",
      opened: 1902,
      etymology: {
        en: "Named for Place des Ternes and Avenue des Ternes, after the former hamlet of Les Ternes. The name is usually explained as coming from the Latin villa externa, “outlying farm”, which became Estern and then Ternes.",
        fr: "La station doit son nom à la place et à l’avenue des Ternes, qui rappellent l’ancien hameau des Ternes. L’explication la plus admise fait venir ce nom du latin villa externa, « ferme extérieure », devenu Estern puis Ternes.",
      },
      context: {
        en: "The station lies on a curve under the square. Entrance 2, in the middle of the square, keeps its Guimard surround, listed as a historic monument in 1965. The two other entrances have plainer green steel balustrades.",
        fr: "La station est établie en courbe sous la place. L’accès 2, au centre de la place, conserve son entourage Guimard, inscrit monument historique en 1965. Les deux autres accès ont des balustrades plus sobres en acier vert.",
      },
      sources: [
        {
          label: "Ternes · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ternes_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Quartier des Ternes · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Quartier_des_Ternes",
        },
      ],
    },
    {
      id: "courcelles",
      name: "Courcelles",
      area: "Paris 8e / 17e",
      art: "gate",
      opened: 1902,
      etymology: {
        en: "Named for the crossing of Boulevard de Courcelles and Rue de Courcelles. The street was the road to the hamlet of Courcelles, which belonged to the parish of Clichy and was absorbed by Levallois-Perret in 1866.",
        fr: "La station doit son nom au croisement du boulevard et de la rue de Courcelles. La rue menait au hameau de Courcelles, qui dépendait de la paroisse de Clichy et que Levallois-Perret absorbe en 1866.",
      },
      context: {
        en: "The station stands on the site of the Barrière de Courcelles, a gate in the Wall of the Farmers-General. It opened on 7 October 1902, when Line 2 was extended from Étoile to Anvers.",
        fr: "La station occupe l’emplacement de la barrière de Courcelles, une porte du mur des Fermiers généraux. Elle ouvre le 7 octobre 1902, lors du prolongement de la ligne 2 d’Étoile à Anvers.",
      },
      sources: [
        {
          label: "Courcelles · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Courcelles_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Rue de Courcelles · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Rue_de_Courcelles",
        },
      ],
    },
    {
      id: "monceau",
      name: "Monceau",
      area: "Paris 8e",
      art: "garden",
      opened: 1902,
      etymology: {
        en: "Named for Parc Monceau. The park’s name recalls the former village of Monceau, which lay north-west of the present park and was a small town in the 15th century.",
        fr: "La station doit son nom au parc Monceau. Ce nom rappelle l’ancien village de Monceau, situé au nord-ouest du parc actuel, qui était une petite bourgade au XVe siècle.",
      },
      context: {
        en: "The station lies under Boulevard de Courcelles, at the main entrance of the park on Place de la République-Dominicaine. It is very close to a former Line 3 turning loop under the park, used from 1904 to 1910.",
        fr: "La station se trouve sous le boulevard de Courcelles, devant l’entrée principale du parc, place de la République-Dominicaine. Elle est très proche d’une ancienne boucle de retournement de la ligne 3 sous le parc, utilisée de 1904 à 1910.",
      },
      sources: [
        {
          label: "Monceau · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Monceau_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Parc Monceau · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Parc_Monceau",
        },
      ],
    },
    {
      id: "villiers",
      name: "Villiers",
      area: "Paris 8e / 17e",
      art: "house",
      opened: 1903,
      etymology: {
        en: "Named for Avenue de Villiers, which led to the former village of Villiers-la-Garenne, later absorbed by Levallois-Perret. One explanation is that Villiers is a corruption of the Latin villare. The station was first called Avenue de Villiers.",
        fr: "La station doit son nom à l’avenue de Villiers, qui menait à l’ancien village de Villiers-la-Garenne, absorbé plus tard par Levallois-Perret. Une explication y voit une déformation du latin villare. La station s’appelait d’abord Avenue de Villiers.",
      },
      context: {
        en: "The Line 2 and Line 3 stations were built at the same time, side by side. The Line 2 platforms opened in 1903, a few months after trains began running on their section. The painter Édouard Vuillard made sketches of the station in 1916 and 1917.",
        fr: "Les stations des lignes 2 et 3 sont construites en même temps, côte à côte. Les quais de la ligne 2 ouvrent en 1903, quelques mois après la mise en service de leur tronçon. Le peintre Édouard Vuillard fait des croquis de la station en 1916 et 1917.",
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
          label: "Villiers-la-Garenne · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Villiers-la-Garenne",
        },
      ],
      people: [
        {
          name: "Édouard Vuillard",
          url: {
            en: "https://en.wikipedia.org/wiki/%C3%89douard_Vuillard",
            fr: "https://fr.wikipedia.org/wiki/%C3%89douard_Vuillard",
          },
        },
      ],
    },
    {
      id: "rome",
      name: "Rome",
      area: "Paris 8e / 17e",
      art: "towers",
      opened: 1902,
      etymology: {
        en: "Named for Rue de Rome, after the Italian capital. The station is in the Europe quarter, where the streets carry the names of European cities.",
        fr: "La station doit son nom à la rue de Rome, qui porte le nom de la capitale italienne. Elle se trouve dans le quartier de l’Europe, dont les rues portent des noms de villes européennes.",
      },
      context: {
        en: "West of the station, the line crosses the Saint-Lazare railway cutting in a tunnel hung beneath the road. With Nation, Rome is one of the only two underground Line 2 stations with a metal roof instead of a vault. Line 14 passes deep below without stopping.",
        fr: "À l’ouest de la station, la ligne franchit la tranchée ferroviaire de Saint-Lazare dans un tunnel suspendu sous la chaussée. Avec Nation, c’est l’une des deux seules stations souterraines de la ligne 2 couvertes d’un toit métallique plutôt que d’une voûte. La ligne 14 passe loin dessous sans la desservir.",
      },
      sources: [
        {
          label: "Rome · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Rome_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Rue de Rome · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Rue_de_Rome_(Paris)",
        },
        {
          label: "Ligne 2 du métro de Paris · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ligne_2_du_m%C3%A9tro_de_Paris",
        },
      ],
    },
    {
      id: "place-de-clichy",
      name: "Place de Clichy",
      area: "Paris 8e / 9e / 17e / 18e",
      art: "gate",
      opened: 1902,
      etymology: {
        en: "Named for Place de Clichy, on the site of the Barrière de Clichy. This gate in the Wall of the Farmers-General opened onto the road to the village of Clichy.",
        fr: "La station doit son nom à la place de Clichy, à l’emplacement de l’ancienne barrière de Clichy. Cette porte du mur des Fermiers généraux donnait accès au village de Clichy.",
      },
      context: {
        en: "The Line 2 station opened on 26 October 1902, almost three weeks after trains began running on its section. The Nord-Sud company opened the platforms of its line B, now Line 13, on 26 February 1911.",
        fr: "La station de la ligne 2 ouvre le 26 octobre 1902, près de trois semaines après la mise en service de son tronçon. La compagnie du Nord-Sud y ouvre les quais de sa ligne B, l’actuelle ligne 13, le 26 février 1911.",
      },
      sources: [
        {
          label: "Place de Clichy · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Place_de_Clichy_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Place de Clichy (place) · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Place_de_Clichy",
        },
      ],
    },
    {
      id: "blanche",
      name: "Blanche",
      area: "Paris 9e / 18e",
      art: "house",
      opened: 1902,
      etymology: {
        en: "Named for Place Blanche and Rue Blanche. The street probably owes its name to 17th-century carts of Montmartre plaster that covered it in white dust. A plan of 1672 calls it Rue de la Croix-Blanche, after a cabaret sign.",
        fr: "La station doit son nom à la place et à la rue Blanche. La rue tient probablement ce nom des charrettes de plâtre de Montmartre, qui la blanchissaient au XVIIe siècle. Un plan de 1672 l’appelle rue de la Croix-Blanche, nom d’une enseigne de cabaret.",
      },
      context: {
        en: "The station opened on 21 October 1902, two weeks after trains began running on its section. With Pigalle, it serves the Moulin Rouge; with Place de Clichy, the Montmartre cemetery. A dead-end siding lies just before the station on the Porte Dauphine side.",
        fr: "La station ouvre le 21 octobre 1902, deux semaines après la mise en service de son tronçon. Avec Pigalle, elle dessert le Moulin-Rouge ; avec Place de Clichy, le cimetière de Montmartre. Une voie en impasse précède la station du côté de Porte Dauphine.",
      },
      sources: [
        {
          label: "Blanche · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Blanche_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Rue Blanche · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Rue_Blanche",
        },
        {
          label: "Ligne 2 du métro de Paris · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ligne_2_du_m%C3%A9tro_de_Paris",
        },
      ],
    },
    {
      id: "pigalle",
      name: "Pigalle",
      area: "Paris 9e / 18e",
      art: "portrait",
      opened: 1902,
      etymology: {
        en: "Named for Place Pigalle and Rue Jean-Baptiste-Pigalle, which honour the sculptor Jean-Baptiste Pigalle (1714–1785). The street, where he had his workshop, took his name in 1803. The square in turn gave its name to the Pigalle quarter.",
        fr: "La station doit son nom à la place Pigalle et à la rue Jean-Baptiste-Pigalle, qui honorent le sculpteur Jean-Baptiste Pigalle (1714–1785). La rue, où se trouvait son atelier, prend son nom en 1803. La place a donné son nom au quartier.",
      },
      context: {
        en: "The Line 12 platforms, built by the Nord-Sud company for its line A, opened on 8 April 1911. They lie below the Line 2 tunnel and cross it at right angles. The main entrance, east of the square, leads only to Line 2.",
        fr: "Les quais de la ligne 12, construits par le Nord-Sud pour sa ligne A, ouvrent le 8 avril 1911. Ils passent sous le tunnel de la ligne 2, à angle droit. L’accès principal, à l’est de la place, mène uniquement à la ligne 2.",
      },
      sources: [
        {
          label: "Pigalle · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Pigalle_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Jean-Baptiste Pigalle · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Jean-Baptiste_Pigalle",
        },
      ],
      people: [
        {
          name: "Jean-Baptiste Pigalle",
          url: {
            en: "https://en.wikipedia.org/wiki/Jean-Baptiste_Pigalle",
            fr: "https://fr.wikipedia.org/wiki/Jean-Baptiste_Pigalle",
          },
        },
      ],
    },
    {
      id: "anvers",
      name: "Anvers",
      area: "Paris 9e / 18e",
      art: "towers",
      opened: 1902,
      etymology: {
        en: "Named for Place d’Anvers and Square d’Anvers, after the Belgian city of Antwerp, Anvers in French. At the siege of the citadel of Antwerp in 1832, French troops defeated the Dutch.",
        fr: "La station doit son nom à la place et au square d’Anvers, qui portent le nom de la ville belge. En 1832, les troupes françaises y battent les Néerlandais lors du siège de la citadelle d’Anvers.",
      },
      context: {
        en: "The station opened on 7 October 1902 as the line’s eastern terminus and kept this role until 31 January 1903. Its subtitle, Sacré-Cœur, refers to the basilica up the hill. It is the last underground station before the viaduct towards Nation.",
        fr: "La station ouvre le 7 octobre 1902 comme terminus est de la ligne, rôle qu’elle garde jusqu’au 31 janvier 1903. Son sous-titre, Sacré-Cœur, désigne la basilique en haut de la butte. C’est la dernière station souterraine avant le viaduc en direction de Nation.",
      },
      sources: [
        {
          label: "Anvers · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Anvers_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Siège de la citadelle d’Anvers (1832) · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Si%C3%A8ge_de_la_citadelle_d'Anvers_(1832)",
        },
        {
          label: "Ligne 2 du métro de Paris · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ligne_2_du_m%C3%A9tro_de_Paris",
        },
      ],
    },
    {
      id: "barbes-rochechouart",
      name: "Barbès – Rochechouart",
      area: "Paris 9e / 10e / 18e",
      art: "portrait",
      opened: 1903,
      etymology: {
        en: "Called Barbès – Rochechouart after the adjoining boulevards. They honour republican politician Armand Barbès and Marguerite de Rochechouart, who led the abbey of Montmartre in the early eighteenth century.",
        fr: "La station reprend les noms des boulevards voisins. Ils rendent hommage au républicain Armand Barbès et à Marguerite de Rochechouart, abbesse de Montmartre au début du XVIIIe siècle.",
      },
      context: {
        en: "The Line 2 platforms opened on 26 March 1903, on the viaduct above Boulevard de la Chapelle. The fire of 10 August 1903 began here, on a train that was emptied and sent on towards Nation. François Truffaut filmed scenes of Domicile conjugal (1970) on this platform.",
        fr: "Les quais de la ligne 2 ouvrent le 26 mars 1903, sur le viaduc qui surplombe le boulevard de la Chapelle. L’incendie du 10 août 1903 commence ici, sur un train vidé de ses voyageurs puis envoyé vers Nation. François Truffaut tourne des scènes de Domicile conjugal (1970) sur ce quai.",
      },
      sources: [
        {
          label: "Barbès – Rochechouart · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Barb%C3%A8s_-_Rochechouart_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Marguerite de Rochechouart · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Marguerite_de_Rochechouart",
        },
        {
          label: "Boulevard Marguerite-de-Rochechouart · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Boulevard_Marguerite-de-Rochechouart",
        },
        {
          label: "Paris Métro train fire · Wikipedia",
          url: "https://en.wikipedia.org/wiki/Paris_M%C3%A9tro_train_fire",
        },
      ],
      people: [
        {
          name: "Armand Barbès",
          url: {
            en: "https://en.wikipedia.org/wiki/Armand_Barb%C3%A8s",
            fr: "https://fr.wikipedia.org/wiki/Armand_Barb%C3%A8s",
          },
        },
      ],
    },
    {
      id: "la-chapelle",
      name: "La Chapelle",
      area: "Paris 10e / 18e",
      art: "church",
      opened: 1903,
      etymology: {
        en: "Named for the former Barrière de la Chapelle, a gate in the Wall of the Farmers-General, south of the village of La Chapelle. The village took its name from an early chapel and was annexed to Paris in 1860.",
        fr: "La station doit son nom à l’ancienne barrière de la Chapelle, une porte du mur des Fermiers généraux, au sud du village de La Chapelle. Ce village, qui tenait son nom d’une ancienne chapelle, est annexé à Paris en 1860.",
      },
      context: {
        en: "The elevated station lies between the Nord railway lines and the Est cutting. Since 1993 a long corridor has linked it to the underground part of Gare du Nord. It was the prototype of the Andreu-Motte style for the elevated stations.",
        fr: "Cette station aérienne se trouve entre les voies ferrées du Nord et la tranchée de l’Est. Depuis 1993, un long couloir la relie à la partie souterraine de la gare du Nord. Elle a servi de prototype au style Andreu-Motte pour les stations aériennes.",
      },
      sources: [
        {
          label: "La Chapelle · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/La_Chapelle_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "La Chapelle (Seine) · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/La_Chapelle_(Seine)",
        },
        {
          label: "Ligne 2 du métro de Paris · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ligne_2_du_m%C3%A9tro_de_Paris",
        },
      ],
    },
    {
      id: "stalingrad",
      name: "Stalingrad",
      area: "Paris 10e / 19e",
      art: "square",
      opened: 1903,
      etymology: {
        en: "Called Stalingrad after the neighbouring square, now Place de la Bataille-de-Stalingrad. The name commemorates the Soviet victory over Nazi Germany at Stalingrad during the Second World War.",
        fr: "La station doit son nom à la place voisine, aujourd’hui place de la Bataille-de-Stalingrad. Ce nom commémore la victoire soviétique sur l’Allemagne nazie à Stalingrad pendant la Seconde Guerre mondiale.",
      },
      context: {
        en: "The Line 2 station opened on 31 January 1903, on the viaduct, as Rue d’Aubervilliers. Passengers changing to Line 7 crossed the street with a transfer voucher. From October 1942 to 1946, the joined station was called Aubervilliers – Boulevard de la Villette.",
        fr: "La station de la ligne 2 ouvre le 31 janvier 1903 sur le viaduc, sous le nom de Rue d’Aubervilliers. La correspondance avec la ligne 7 se fait alors par la rue, avec une contremarque. D’octobre 1942 à 1946, la station réunie s’appelle Aubervilliers – Boulevard de la Villette.",
      },
      sources: [
        {
          label: "Stalingrad · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Stalingrad_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Ligne 2 du métro de Paris · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ligne_2_du_m%C3%A9tro_de_Paris",
        },
      ],
    },
    {
      id: "jaures",
      name: "Jaurès",
      area: "Paris 10e / 19e",
      art: "portrait",
      opened: 1903,
      etymology: {
        en: "Called Jaurès in tribute to socialist politician Jean Jaurès. The station received his name on 1 August 1914, the day after his assassination.",
        fr: "La station porte le nom de Jean Jaurès en hommage à l’homme politique socialiste. Elle est rebaptisée le 1er août 1914, au lendemain de son assassinat.",
      },
      context: {
        en: "Jaurès is the last elevated station on Line 2 towards Nation. For the bicentenary of the Revolution in 1989, the Nation-bound platform received stained glass by Jacques-Antoine Ducatez, showing revolutionaries around the Bastille prison.",
        fr: "Jaurès est la dernière station aérienne de la ligne 2 en direction de Nation. Pour le bicentenaire de la Révolution, en 1989, le quai vers Nation reçoit des vitraux de Jacques-Antoine Ducatez. Ils représentent des révolutionnaires autour de la prison de la Bastille.",
      },
      sources: [
        {
          label: "Jaurès · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Jaur%C3%A8s_(m%C3%A9tro_de_Paris)",
        },
      ],
      people: [
        {
          name: "Jean Jaurès",
          url: {
            en: "https://en.wikipedia.org/wiki/Jean_Jaur%C3%A8s",
            fr: "https://fr.wikipedia.org/wiki/Jean_Jaur%C3%A8s",
          },
        },
      ],
    },
    {
      id: "colonel-fabien",
      name: "Colonel Fabien",
      area: "Paris 10e / 19e",
      art: "portrait",
      opened: 1903,
      etymology: {
        en: "Named for Place du Colonel-Fabien, which honours Pierre Georges (1919–1944), known as Colonel Fabien, a communist fighter in the Resistance. On 21 August 1941, at Barbès – Rochechouart station, he shot a German naval cadet.",
        fr: "La station doit son nom à la place du Colonel-Fabien, qui honore Pierre Georges (1919–1944), dit le colonel Fabien, résistant communiste. Le 21 août 1941, à la station Barbès – Rochechouart, il abat un aspirant de la marine allemande.",
      },
      context: {
        en: "The station opened in 1903 as Combat, after the animal fights held at the old city barrier from 1778 to 1850. It took its present name on 19 August 1945. It was the third of eight stations renamed after the war for Resistance members who died for France.",
        fr: "La station ouvre en 1903 sous le nom de Combat, en référence aux combats d’animaux organisés à l’ancienne barrière de 1778 à 1850. Elle prend son nom actuel le 19 août 1945. C’est la troisième des huit stations renommées après la guerre en hommage à des résistants morts pour la France.",
      },
      sources: [
        {
          label: "Colonel Fabien · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Colonel_Fabien_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Colonel Fabien (Pierre Georges) · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Colonel_Fabien",
        },
        {
          label: "Place du Colonel-Fabien · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Place_du_Colonel-Fabien_(Paris)",
        },
        {
          label: "Barbès – Rochechouart · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Barb%C3%A8s_-_Rochechouart_(m%C3%A9tro_de_Paris)",
        },
      ],
      people: [
        {
          name: "Pierre Georges",
          url: {
            en: "https://en.wikipedia.org/wiki/Pierre_Georges",
            fr: "https://fr.wikipedia.org/wiki/Colonel_Fabien",
          },
        },
      ],
    },
    {
      id: "belleville",
      name: "Belleville",
      area: "Paris 10e / 11e / 19e / 20e",
      art: "house",
      opened: 1903,
      etymology: {
        en: "Named for the crossing of Rue de Belleville and Boulevard de Belleville. Both recall the former village of Belleville: the street was its main road and the boulevard its western edge. The commune was annexed to Paris in 1860.",
        fr: "La station doit son nom au croisement de la rue et du boulevard de Belleville. Tous deux rappellent l’ancien village de Belleville : la rue en était la grande rue et le boulevard la limite ouest. La commune est annexée à Paris en 1860.",
      },
      context: {
        en: "The Line 2 platforms opened on 31 January 1903. On 15 December 2015, the Paris council voted for the name Belleville – Commune de Paris 1871. The regional transport authority still lists the stop as Belleville.",
        fr: "Les quais de la ligne 2 ouvrent le 31 janvier 1903. Le 15 décembre 2015, le Conseil de Paris vote pour le nom Belleville – Commune de Paris 1871. L’autorité régionale des transports désigne toujours l’arrêt sous le nom de Belleville.",
      },
      sources: [
        {
          label: "Belleville · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Belleville_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Belleville (Seine) · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Belleville_(Seine)",
        },
        {
          label: "Île-de-France Mobilités · arrêts-lignes",
          url: "https://data.iledefrance-mobilites.fr/explore/dataset/arrets-lignes/",
        },
      ],
    },
    {
      id: "couronnes",
      name: "Couronnes",
      area: "Paris 11e / 20e",
      art: "station",
      opened: 1903,
      etymology: {
        en: "Named for Rue des Couronnes, after a former locality called les Couronnes sous Savies. Savies was the name of Belleville from the 7th century to the early 18th century.",
        fr: "La station doit son nom à la rue des Couronnes, qui reprend celui d’un ancien lieu-dit, les Couronnes sous Savies. Savies est le nom de Belleville du VIIe au début du XVIIIe siècle.",
      },
      context: {
        en: "On 10 August 1903, smoke from a burning train filled the station, where a crowd was arguing with staff about refunds. The lights failed, and 75 people died against the blind end of the platform, out of 84 dead in all. The disaster led to all-metal trains and at least two exits per station.",
        fr: "Le 10 août 1903, la fumée d’un train en feu envahit la station, où une foule réclame au personnel le remboursement des billets. L’éclairage s’éteint et 75 personnes meurent contre le fond sans issue du quai, sur 84 victimes au total. La catastrophe impose des trains entièrement métalliques et au moins deux sorties par station.",
      },
      sources: [
        {
          label: "Couronnes · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Couronnes_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Rue des Couronnes · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Rue_des_Couronnes",
        },
        {
          label: "Paris Métro train fire · Wikipedia",
          url: "https://en.wikipedia.org/wiki/Paris_M%C3%A9tro_train_fire",
        },
        {
          label: "Ligne 2 du métro de Paris · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ligne_2_du_m%C3%A9tro_de_Paris",
        },
      ],
    },
    {
      id: "menilmontant",
      name: "Ménilmontant",
      area: "Paris 11e / 20e",
      art: "house",
      opened: 1903,
      etymology: {
        en: "Named for Boulevard de Ménilmontant and Rue de Ménilmontant, which recall the former village of Ménilmontant. The boulevard ran along its west side and the street was its main road. The hamlet was attached to Belleville in 1792.",
        fr: "La station doit son nom au boulevard et à la rue de Ménilmontant, qui rappellent l’ancien village de Ménilmontant. Le boulevard longeait son côté ouest et la rue en était l’artère principale. Le hameau est rattaché à Belleville en 1792.",
      },
      context: {
        en: "On 10 August 1903, the fire on an empty train flared out of control as it entered the station, and seven people died here. Most victims of the disaster died at Couronnes, the previous station towards Porte Dauphine. Place Jean-Ferrat lies above the station.",
        fr: "Le 10 août 1903, l’incendie d’un train vide devient incontrôlable à l’entrée de la station, où sept personnes meurent. La plupart des victimes périssent à Couronnes, la station précédente en direction de Porte Dauphine. La place Jean-Ferrat se trouve au-dessus de la station.",
      },
      sources: [
        {
          label: "Ménilmontant · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/M%C3%A9nilmontant_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Rue de Ménilmontant · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Rue_de_M%C3%A9nilmontant",
        },
        {
          label: "Belleville (Seine) · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Belleville_(Seine)",
        },
        {
          label: "Ligne 2 du métro de Paris · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ligne_2_du_m%C3%A9tro_de_Paris",
        },
      ],
    },
    {
      id: "pere-lachaise",
      name: "Père Lachaise",
      area: "Paris 11e / 20e",
      art: "garden",
      opened: 1903,
      etymology: {
        en: "Named for the Père-Lachaise cemetery, opened in 1804 on a former Jesuit property. The name recalls François d’Aix de La Chaise (1624–1709), a Jesuit and the confessor of Louis XIV for 34 years, who lived there.",
        fr: "La station doit son nom au cimetière du Père-Lachaise, ouvert en 1804 sur un ancien domaine des jésuites. Ce nom rappelle François d’Aix de La Chaise (1624–1709), jésuite et confesseur de Louis XIV pendant 34 ans, qui y vivait.",
      },
      context: {
        en: "The Line 2 platforms opened on 25 February 1903, more than three weeks after trains began running on their section. The station is at the north-west corner of the cemetery, opposite a side gate; the main gate is closer to Philippe Auguste station.",
        fr: "Les quais de la ligne 2 ouvrent le 25 février 1903, plus de trois semaines après la mise en service de leur tronçon. La station se trouve à l’angle nord-ouest du cimetière, face à une porte secondaire ; l’entrée principale est plus proche de la station Philippe Auguste.",
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
      id: "philippe-auguste",
      name: "Philippe Auguste",
      area: "Paris 11e / 20e",
      art: "portrait",
      opened: 1903,
      etymology: {
        en: "Named for Avenue Philippe-Auguste, which honours King Philip II, known as Philip Augustus (born 1165, reigned 1180–1223). He was the seventh king of the Capetian dynasty.",
        fr: "La station doit son nom à l’avenue Philippe-Auguste, qui honore le roi Philippe II, dit Philippe Auguste (né en 1165, roi de 1180 à 1223). Il est le septième roi de la dynastie capétienne.",
      },
      context: {
        en: "Philip Augustus was the first king to be called King of France. The station opened on 31 January 1903, when the line reached Rue de Bagnolet. In 2018 its platforms were refitted with white ceramic frames and blue Akiko seats.",
        fr: "Philippe Auguste est le premier roi à porter le titre de roi de France. La station ouvre le 31 janvier 1903, quand la ligne atteint Rue de Bagnolet. En 2018, ses quais reçoivent des cadres en céramique blanche et des sièges Akiko bleus.",
      },
      sources: [
        {
          label: "Philippe Auguste · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Philippe_Auguste_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Philippe II Auguste · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Philippe_II_Auguste",
        },
      ],
      people: [
        {
          name: "Philippe Auguste",
          url: {
            en: "https://en.wikipedia.org/wiki/Philip_II_of_France",
            fr: "https://fr.wikipedia.org/wiki/Philippe_II_Auguste",
          },
        },
      ],
    },
    {
      id: "alexandre-dumas",
      name: "Alexandre Dumas",
      area: "Paris 11e / 20e",
      art: "portrait",
      opened: 1903,
      etymology: {
        en: "Named for Rue Alexandre-Dumas, a few hundred metres to the south. The street honours the writer Alexandre Dumas (1802–1870), author of The Three Musketeers.",
        fr: "La station doit son nom à la rue Alexandre-Dumas, à quelques centaines de mètres au sud. Celle-ci honore l’écrivain Alexandre Dumas (1802–1870), auteur des Trois Mousquetaires.",
      },
      context: {
        en: "The station opened on 31 January 1903 as Rue de Bagnolet and was the eastern terminus until 2 April 1903. It was renamed on 13 September 1970, to avoid confusion with the new Porte de Bagnolet station on Line 3.",
        fr: "La station ouvre le 31 janvier 1903 sous le nom de Rue de Bagnolet et sert de terminus est jusqu’au 2 avril 1903. Elle est renommée le 13 septembre 1970 pour éviter la confusion avec la nouvelle station Porte de Bagnolet, sur la ligne 3.",
      },
      sources: [
        {
          label: "Alexandre Dumas · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Alexandre_Dumas_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Alexandre Dumas (écrivain) · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Alexandre_Dumas",
        },
        {
          label: "Rue Alexandre-Dumas · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Rue_Alexandre-Dumas",
        },
      ],
      people: [
        {
          name: "Alexandre Dumas",
          url: {
            en: "https://en.wikipedia.org/wiki/Alexandre_Dumas",
            fr: "https://fr.wikipedia.org/wiki/Alexandre_Dumas",
          },
        },
      ],
    },
    {
      id: "avron",
      name: "Avron",
      area: "Paris 11e / 20e",
      art: "gate",
      opened: 1903,
      etymology: {
        en: "Named for Rue d’Avron, part of an old road to the Plateau d’Avron, east of Paris. The plateau, then in the commune of Rosny, was a strategic point for the defence of Paris during the siege of 1870–1871.",
        fr: "La station doit son nom à la rue d’Avron, tronçon d’un ancien chemin vers le plateau d’Avron, à l’est de Paris. Ce plateau, alors sur la commune de Rosny, est un point stratégique de la défense de Paris pendant le siège de 1870–1871.",
      },
      context: {
        en: "The station opened on 2 April 1903 with the last section of the line, from Rue de Bagnolet to Nation. The street was given the name Rue d’Avron by an order of 1 February 1877. The station is very close to Buzenval on Line 9.",
        fr: "La station ouvre le 2 avril 1903 avec le dernier tronçon de la ligne, de Rue de Bagnolet à Nation. La rue reçoit le nom de rue d’Avron par un arrêté du 1er février 1877. La station est très proche de Buzenval, sur la ligne 9.",
      },
      sources: [
        {
          label: "Avron · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Avron_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Rue d’Avron · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Rue_d'Avron",
        },
      ],
    },
    {
      id: "nation",
      name: "Nation",
      area: "Paris 11e / 12e / 20e",
      art: "square",
      opened: 1903,
      etymology: {
        en: "Named for Place de la Nation, itself renamed for the national holiday of 14 July 1880. It was earlier Place du Trône, after a throne set up there in 1660 for Louis XIV’s entry into Paris.",
        fr: "La station doit son nom à la place de la Nation, elle-même rebaptisée en référence à la fête nationale du 14 juillet 1880. Elle s’appelait auparavant place du Trône, d’après un trône dressé en 1660 pour l’entrée de Louis XIV dans Paris.",
      },
      context: {
        en: "The Line 2 platforms opened on 2 April 1903 and replaced the temporary terminus at Rue de Bagnolet. Trains turn on a loop under the square, arriving under Avenue de Taillebourg and leaving under Avenue du Trône. The curved station has one wide island platform between the two tracks.",
        fr: "Les quais de la ligne 2 ouvrent le 2 avril 1903 et remplacent le terminus provisoire de Rue de Bagnolet. Les trains tournent sur une boucle sous la place : arrivée sous l’avenue de Taillebourg, départ sous l’avenue du Trône. La station, en courbe, a un large quai central entre ses deux voies.",
      },
      sources: [
        {
          label: "Nation · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Nation_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Place de la Nation · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Place_de_la_Nation_(Paris)",
        },
        {
          label: "Ligne 2 du métro de Paris · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ligne_2_du_m%C3%A9tro_de_Paris",
        },
      ],
    },
  ],
  paths: [
    [
      "porte-dauphine",
      "victor-hugo",
      "charles-de-gaulle-etoile",
      "ternes",
      "courcelles",
      "monceau",
      "villiers",
      "rome",
      "place-de-clichy",
      "blanche",
      "pigalle",
      "anvers",
      "barbes-rochechouart",
      "la-chapelle",
      "stalingrad",
      "jaures",
      "colonel-fabien",
      "belleville",
      "couronnes",
      "menilmontant",
      "pere-lachaise",
      "philippe-auguste",
      "alexandre-dumas",
      "avron",
      "nation",
    ],
  ],
  featured: [
    "porte-dauphine",
    "stalingrad",
    "colonel-fabien",
  ],
  image: "/illustrations/line-2.webp",
  imageAlt: {
    en: "Engraved-style illustration of the Rotonde de la Villette, a neoclassical stone toll house with porticoes and an arcaded central drum.",
    fr: "Illustration de style gravure de la rotonde de la Villette, ancien bureau d’octroi néoclassique en pierre, avec ses portiques et son tambour central à arcades.",
  },
  sources: [
    {
      label: "Ligne 2 du métro de Paris · Wikipédia",
      url: "https://fr.wikipedia.org/wiki/Ligne_2_du_m%C3%A9tro_de_Paris",
    },
    {
      label: "Paris Métro Line 2 · Wikipedia",
      url: "https://en.wikipedia.org/wiki/Paris_M%C3%A9tro_Line_2",
    },
    {
      label: "Île-de-France Mobilités · arrêts-lignes",
      url: "https://data.iledefrance-mobilites.fr/explore/dataset/arrets-lignes/",
    },
    {
      label: "Paris Métro train fire · Wikipedia",
      url: "https://en.wikipedia.org/wiki/Paris_M%C3%A9tro_train_fire",
    },
  ],
};

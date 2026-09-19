import type { MetroLine } from "./types";

// Name-origin sources and editorial limits: docs/research/line14.md.
export const line14: MetroLine = {
  id: "14",
  color: "#662483",
  textColor: "#ffffff",
  title: {
    en: "Line 14",
    fr: "Ligne 14",
  },
  summary: {
    en: "From a piano factory to an airport: the names of 21 stations across Greater Paris.",
    fr: "D’une manufacture de pianos à un aéroport : les noms de 21 stations à travers le Grand Paris.",
  },
  termini: ["Saint-Denis–Pleyel", "Aéroport d’Orly"],
  stations: [
    {
      id: "saint-denis-pleyel",
      name: "Saint-Denis–Pleyel",
      area: "Saint-Denis",
      art: "piano",
      etymology: {
        en: "Called Saint-Denis–Pleyel because it serves the Pleyel district of Saint-Denis. The district took its name from the Pleyel piano factory, whose company was founded by composer and piano maker Ignace Pleyel.",
        fr: "La station doit son nom au quartier Pleyel de Saint-Denis. Ce quartier porte le nom de la manufacture de pianos Pleyel, une entreprise fondée par le compositeur et facteur de pianos Ignace Pleyel.",
      },
      context: {
        en: "Saint-Denis itself recalls Denis, the first bishop of Paris, whose burial place became a religious centre. The station name joins that older town name to an industrial one. A public consultation confirmed the name Saint-Denis Pleyel in 2022.",
        fr: "Saint-Denis rappelle Denis, premier évêque de Paris, dont le lieu de sépulture est devenu un centre religieux. Le nom de la station associe ainsi celui de la ville à celui d’un quartier industriel. Une consultation publique a confirmé ce choix en 2022.",
      },
      sources: [
        {
          label: "Wikipédia · Saint-Denis Pleyel (métro de Paris)",
          url: "https://fr.wikipedia.org/wiki/Saint-Denis_Pleyel_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Wikipédia · Rue Pleyel (Saint-Denis)",
          url: "https://fr.wikipedia.org/wiki/Rue_Pleyel_(Saint-Denis)",
        },
        {
          label: "Philharmonie de Paris · Pleyel",
          url: "https://pad.philharmoniedeparis.fr/0466522-portrait-maison-pleyel.aspx?_lg=fr-FR",
        },
        {
          label: "Seine-Saint-Denis Tourisme · Saint-Denis",
          url: "https://www.tourisme93.com/document.php?pagendx=376",
        },
        {
          label: "Île-de-France Mobilités · Noms choisis en 2022",
          url: "https://www.iledefrance-mobilites.fr/actualites/metro-ligne-14-noms-futures-stations",
        },
      ],
      people: [
        {
          name: "Ignace Pleyel",
          url: {
            en: "https://en.wikipedia.org/wiki/Ignaz_Pleyel",
            fr: "https://fr.wikipedia.org/wiki/Ignace_Joseph_Pleyel",
          },
        },
      ],
    },
    {
      id: "mairie-de-saint-ouen",
      name: "Mairie de Saint-Ouen",
      area: "Saint-Ouen-sur-Seine",
      art: "square",
      etymology: {
        en: "Called Mairie de Saint-Ouen because it serves the town hall of Saint-Ouen. The town takes its name from Ouen, a seventh-century bishop of Rouen who also served the Merovingian royal court.",
        fr: "La station doit son nom à la mairie de Saint-Ouen qu’elle dessert. La ville porte le nom d’Ouen, évêque de Rouen au VIIe siècle, qui fut aussi un dignitaire de la cour mérovingienne.",
      },
      context: {
        en: "The name identifies a civic building within a town whose name comes from a saint. Line 13 already served this town-hall stop before Line 14 arrived. It became the northern terminus of Line 14 in 2020, before the extension to Saint-Denis.",
        fr: "Le nom désigne un bâtiment municipal dans une ville nommée d’après un saint. La ligne 13 desservait déjà cet arrêt avant l’arrivée de la ligne 14. Il est devenu le terminus nord de cette dernière en 2020, avant son prolongement vers Saint-Denis.",
      },
      sources: [
        {
          label: "Wikipédia · Mairie de Saint-Ouen (métro de Paris)",
          url: "https://fr.wikipedia.org/wiki/Mairie_de_Saint-Ouen_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Saint-Ouen-sur-Seine · Histoire",
          url: "https://www.saint-ouen.fr/vie-quotidienne/culture-et-patrimoine/histoire-et-patrimoine/histoire-de-saint-ouen-sur-seine/",
        },
      ],
      people: [
        {
          name: "Saint Ouen",
          url: {
            en: "https://en.wikipedia.org/wiki/Audoin_(bishop)",
            fr: "https://fr.wikipedia.org/wiki/Ouen_de_Rouen",
          },
        },
      ],
    },
    {
      id: "saint-ouen",
      name: "Saint-Ouen",
      area: "Saint-Ouen-sur-Seine / Clichy",
      art: "station",
      etymology: {
        en: "Called Saint-Ouen because the metro adopted the name of the existing RER station at the same interchange. That name refers to Saint-Ouen, the town named after Ouen, a seventh-century bishop of Rouen.",
        fr: "La station doit son nom à la gare du RER avec laquelle elle est en correspondance. Celle-ci porte le nom de Saint-Ouen, ville nommée d’après Ouen, évêque de Rouen au VIIe siècle.",
      },
      context: {
        en: "The planned name was Clichy–Saint-Ouen because the station straddles the two towns. The final choice followed the transport authority’s rule that connecting stations share a name. This explains why Clichy is absent from the sign despite the station’s position.",
        fr: "Le nom prévu était Clichy–Saint-Ouen, car la station se trouve à cheval sur les deux villes. Le choix définitif suit la règle de l’autorité organisatrice qui donne le même nom aux gares en correspondance. Clichy ne figure donc pas sur le panneau.",
      },
      sources: [
        {
          label: "Wikipédia · Saint-Ouen (métro de Paris)",
          url: "https://fr.wikipedia.org/wiki/Saint-Ouen_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Saint-Ouen-sur-Seine · Histoire",
          url: "https://www.saint-ouen.fr/vie-quotidienne/culture-et-patrimoine/histoire-et-patrimoine/histoire-de-saint-ouen-sur-seine/",
        },
      ],
      people: [
        {
          name: "Saint Ouen",
          url: {
            en: "https://en.wikipedia.org/wiki/Audoin_(bishop)",
            fr: "https://fr.wikipedia.org/wiki/Ouen_de_Rouen",
          },
        },
      ],
    },
    {
      id: "porte-de-clichy",
      name: "Porte de Clichy",
      area: "Paris · 17e",
      art: "gate",
      etymology: {
        en: "Called Porte de Clichy after the former city gate on the road towards Clichy. “Porte” means gate: the name preserves an entrance through the nineteenth-century fortifications of Paris and the town reached beyond it.",
        fr: "La station doit son nom à l’ancienne porte de Paris située sur la route de Clichy. Le mot « porte » rappelle une entrée des fortifications du XIXe siècle, tandis que « Clichy » désigne la ville située au-delà.",
      },
      context: {
        en: "The gate controlled entry through the Thiers fortifications. The wall has disappeared, but the road crossing retains its name. The metro uses this older geographical marker, while the station’s Tribunal de Paris subtitle identifies the court complex now served here.",
        fr: "La porte contrôlait une entrée de l’enceinte de Thiers. Les fortifications ont disparu, mais ce passage routier conserve leur souvenir dans son nom. Le métro reprend ce repère ancien, tandis que le sous-titre Tribunal de Paris indique le palais de justice desservi.",
      },
      sources: [
        {
          label: "Wikipédia · Porte de Clichy (métro de Paris)",
          url: "https://fr.wikipedia.org/wiki/Porte_de_Clichy_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Wikipédia · Porte de Clichy",
          url: "https://fr.wikipedia.org/wiki/Porte_de_Clichy",
        },
      ],
    },
    {
      id: "pont-cardinet",
      name: "Pont Cardinet",
      area: "Paris · 17e",
      art: "station",
      etymology: {
        en: "Called Pont Cardinet after the bridge that carries rue Cardinet over the railway tracks. The street bears the name of a local property owner, Philippe Cardinet. “Pont” means bridge, completing the name’s two parts.",
        fr: "La station doit son nom au pont qui porte la rue Cardinet au-dessus des voies ferrées. Cette rue rappelle un propriétaire local, Philippe Cardinet. Le nom associe ainsi un pont routier au patronyme conservé par la rue.",
      },
      context: {
        en: "The bridge crosses the tracks approaching Saint-Lazare. The nearby suburban railway station also takes its name from this crossing. Cardinet was a wine merchant and caterer; the street name preserves a private owner’s name rather than that of a railway engineer.",
        fr: "Le pont franchit les voies qui mènent à Saint-Lazare. La gare de banlieue voisine porte elle aussi le nom de ce passage. Cardinet était marchand de vins et traiteur : la rue conserve le nom d’un propriétaire, et non celui d’un ingénieur ferroviaire.",
      },
      sources: [
        {
          label: "Wikipédia · Pont Cardinet (métro de Paris)",
          url: "https://fr.wikipedia.org/wiki/Pont_Cardinet_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Wikipédia · Gare de Pont-Cardinet",
          url: "https://fr.wikipedia.org/wiki/Gare_de_Pont-Cardinet",
        },
        {
          label: "Wikipédia · Rue Cardinet",
          url: "https://fr.wikipedia.org/wiki/Rue_Cardinet",
        },
      ],
    },
    {
      id: "saint-lazare",
      name: "Saint-Lazare",
      area: "Paris · 8e",
      art: "hospital",
      etymology: {
        en: "Called Saint-Lazare after the nearby railway station and rue Saint-Lazare. The street led to the Maison Saint-Lazare, a leper hospital dedicated to Saint Lazarus. The metro thus inherited the name through local transport and street geography.",
        fr: "La station doit son nom à la gare et à la rue Saint-Lazare voisines. Cette rue menait à la maison Saint-Lazare, ancienne léproserie dédiée à saint Lazare. Le métro a ainsi reçu ce nom par l’intermédiaire de la gare et de la voirie.",
      },
      context: {
        en: "The old institution stood farther east, near rue du Faubourg-Saint-Denis. It later became a religious house and then a prison. The street retained the name of the destination it once served, even after these successive changes in the building’s use.",
        fr: "L’ancienne institution se trouvait plus à l’est, près de la rue du Faubourg-Saint-Denis. Elle devint ensuite une maison religieuse, puis une prison. La rue a gardé le nom du lieu auquel elle conduisait, malgré les changements successifs d’usage des bâtiments.",
      },
      sources: [
        {
          label: "Wikipédia · Saint-Lazare (métro de Paris)",
          url: "https://fr.wikipedia.org/wiki/Saint-Lazare_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Wikipédia · Rue Saint-Lazare",
          url: "https://fr.wikipedia.org/wiki/Rue_Saint-Lazare",
        },
        {
          label: "Wikipédia · Prison Saint-Lazare",
          url: "https://fr.wikipedia.org/wiki/Prison_Saint-Lazare",
        },
      ],
    },
    {
      id: "madeleine",
      name: "Madeleine",
      area: "Paris · 8e",
      art: "church",
      etymology: {
        en: "Called Madeleine after place de la Madeleine and the church at its centre. The church is dedicated to Mary Magdalene, called Marie Madeleine in French. The station therefore carries a religious dedication through the name of the square.",
        fr: "La station doit son nom à la place de la Madeleine et à l’église qui en occupe le centre. Celle-ci est dédiée à sainte Marie Madeleine. Le métro reprend donc une dédicace religieuse par l’intermédiaire du nom de la place.",
      },
      context: {
        en: "The dedication predates the present church: a chapel in the former Ville-l’Évêque settlement was dedicated to Madeleine in the thirteenth century. The later monumental church kept that dedication. Its classical columns can obscure the older Christian name that the station preserves.",
        fr: "La dédicace précède l’église actuelle : une chapelle de l’ancien bourg de la Ville-l’Évêque était dédiée à Madeleine au XIIIe siècle. L’église monumentale a conservé cette dédicace. Derrière ses colonnes classiques, le nom repris par le métro garde donc une origine chrétienne plus ancienne.",
      },
      sources: [
        {
          label: "Wikipédia · Madeleine (métro de Paris)",
          url: "https://fr.wikipedia.org/wiki/Madeleine_(m%C3%A9tro_de_Paris)",
        },
      ],
      people: [
        {
          name: "Marie Madeleine",
          url: {
            en: "https://en.wikipedia.org/wiki/Mary_Magdalene",
            fr: "https://fr.wikipedia.org/wiki/Marie_Madeleine",
          },
        },
      ],
    },
    {
      id: "pyramides",
      name: "Pyramides",
      area: "Paris · 1er",
      art: "square",
      etymology: {
        en: "Called Pyramides after rue des Pyramides, which commemorates Bonaparte’s victory at the Battle of the Pyramids in Egypt in 1798. The name reaches the station through the street, rather than through an Egyptian monument in Paris.",
        fr: "La station doit son nom à la rue des Pyramides, qui commémore la victoire de Bonaparte à la bataille des Pyramides, en Égypte, en 1798. Ce souvenir militaire est arrivé dans le métro par le nom de la rue.",
      },
      context: {
        en: "The battle formed part of the French campaign in Egypt and opposed Bonaparte’s army to Mamluk forces. The metro station first used the name on Line 7. Line 14 later joined the same interchange and kept the existing station name.",
        fr: "La bataille appartient à la campagne française d’Égypte et oppose l’armée de Bonaparte aux forces mameloukes. Le métro a d’abord utilisé ce nom sur la ligne 7. La ligne 14 a ensuite rejoint la même correspondance et conservé le nom existant.",
      },
      sources: [
        {
          label: "Wikipédia · Pyramides (métro de Paris)",
          url: "https://fr.wikipedia.org/wiki/Pyramides_(m%C3%A9tro_de_Paris)",
        },
      ],
      people: [
        {
          name: "Napoléon Bonaparte",
          url: {
            en: "https://en.wikipedia.org/wiki/Napoleon",
            fr: "https://fr.wikipedia.org/wiki/Napol%C3%A9on_Ier",
          },
        },
      ],
    },
    {
      id: "chatelet",
      name: "Châtelet",
      area: "Paris · 1er / 4e",
      art: "gate",
      etymology: {
        en: "Called Châtelet after place du Châtelet, laid out on the site of the Grand Châtelet. This vanished fortress became a court and prison. The station preserves the building’s name through the square that replaced it.",
        fr: "La station doit son nom à la place du Châtelet, aménagée à l’emplacement du Grand Châtelet. Cette forteresse disparue a servi de tribunal et de prison. Son nom subsiste dans celui de la place, puis de la station.",
      },
      context: {
        en: "The Grand Châtelet stood at the northern approach to the Pont au Change. Royal justice operated there under the Ancien Régime. Its demolition began in 1802, leaving the name attached to an open square instead of the former fortified building.",
        fr: "Le Grand Châtelet occupait l’accès nord du pont au Change. La justice royale y était exercée sous l’Ancien Régime. Sa démolition a commencé en 1802 : son nom est alors resté attaché à une place ouverte, à la place de l’ancien bâtiment fortifié.",
      },
      sources: [
        {
          label: "Wikipédia · Châtelet (métro de Paris)",
          url: "https://fr.wikipedia.org/wiki/Ch%C3%A2telet_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Paris · Le Grand Châtelet",
          url: "https://parcoursrevolution.paris.fr/fr/points-interet/54-le-grand-chatelet-geole-de-l-ancien-regime",
        },
      ],
    },
    {
      id: "gare-de-lyon",
      name: "Gare de Lyon",
      area: "Paris · 12e",
      art: "station",
      etymology: {
        en: "Called Gare de Lyon because it serves the Paris railway terminus of that name. Lyon refers to the city reached by its railway route towards south-eastern France; the metro station inherits the mainline station’s destination-based name.",
        fr: "La station doit son nom à la gare parisienne qu’elle dessert. Lyon désigne la ville desservie par son axe ferroviaire vers le sud-est de la France. Le métro reprend donc un nom de gare fondé sur une destination.",
      },
      context: {
        en: "The railway terminus was associated with the Paris–Lyon–Méditerranée network. Its name describes the direction of long-distance travel from Paris. The Line 14 platforms lie along rue de Bercy, while the older Line 1 platforms are under boulevard Diderot.",
        fr: "La gare ferroviaire était associée au réseau Paris–Lyon–Méditerranée. Son nom indique la direction des voyages au départ de Paris. Les quais de la ligne 14 se trouvent le long de la rue de Bercy, tandis que ceux de la ligne 1 sont sous le boulevard Diderot.",
      },
      sources: [
        {
          label: "Wikipédia · Gare de Lyon (métro de Paris)",
          url: "https://fr.wikipedia.org/wiki/Gare_de_Lyon_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Wikipédia · Paris-Gare-de-Lyon",
          url: "https://fr.wikipedia.org/wiki/Paris-Gare-de-Lyon",
        },
        {
          label: "Wikipedia · Gare de Lyon",
          url: "https://en.wikipedia.org/wiki/Gare_de_Lyon",
        },
      ],
    },
    {
      id: "bercy",
      name: "Bercy",
      area: "Paris · 12e",
      art: "market",
      etymology: {
        en: "Called Bercy after rue de Bercy and boulevard de Bercy, which meet at the station. Both preserve the name of the former settlement of Bercy, much of which became part of Paris in 1860.",
        fr: "La station doit son nom à la rue et au boulevard de Bercy, qui se croisent à cet endroit. Ces voies conservent le nom de l’ancienne commune de Bercy, en grande partie rattachée à Paris en 1860.",
      },
      context: {
        en: "Bercy was a place name long before the metro: a charter from 1134 records a form of it. A seigneurial estate and a separate commune later bore the name. The road names carried it into the expanded city and then into the metro.",
        fr: "Bercy est un nom de lieu bien antérieur au métro : une charte de 1134 en conserve une forme ancienne. Une seigneurie, puis une commune distincte, ont porté ce nom. Les voies l’ont transmis à la ville agrandie, puis au réseau du métro.",
      },
      sources: [
        {
          label: "Wikipédia · Bercy (métro de Paris)",
          url: "https://fr.wikipedia.org/wiki/Bercy_(m%C3%A9tro_de_Paris)",
        },
      ],
    },
    {
      id: "cour-saint-emilion",
      name: "Cour Saint-Émilion",
      area: "Paris · 12e",
      art: "market",
      etymology: {
        en: "Called Cour Saint-Émilion after the nearby courtyard in the former Bercy wine warehouses. Its name refers to Saint-Émilion, the Bordeaux wine-producing town and appellation. The courtyard name records the trade once carried on here.",
        fr: "La station doit son nom à la cour Saint-Émilion, dans les anciens entrepôts de vins de Bercy. Ce nom renvoie à la ville viticole et à l’appellation bordelaise de Saint-Émilion. Il rappelle le commerce autrefois installé dans cette cour.",
      },
      context: {
        en: "The station occupies part of the former Bercy goods yard, where trains brought wine from southern France. The neighbouring warehouse courts used wine-region names. This explains why a Bordeaux name appears on the Paris metro at this particular site.",
        fr: "La station occupe une partie de l’ancienne gare de marchandises de Bercy, où arrivaient des trains de vins du sud de la France. Les cours des entrepôts voisins portaient des noms viticoles. Cette activité explique la présence d’un nom bordelais dans le métro parisien.",
      },
      sources: [
        {
          label: "Wikipédia · Cour Saint-Émilion (métro de Paris)",
          url: "https://fr.wikipedia.org/wiki/Cour_Saint-%C3%89milion_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Wikipédia · Cour Saint-Émilion",
          url: "https://fr.wikipedia.org/wiki/Cour_Saint-%C3%89milion",
        },
      ],
    },
    {
      id: "bibliotheque-francois-mitterrand",
      name: "Bibliothèque François-Mitterrand",
      area: "Paris · 13e",
      art: "towers",
      etymology: {
        en: "Called Bibliothèque François-Mitterrand after the nearby site of the Bibliothèque nationale de France. The library site honours President François Mitterrand, who initiated its construction. Both the institution and the person are therefore part of the station’s name.",
        fr: "La station doit son nom au site voisin de la Bibliothèque nationale de France. Celui-ci rend hommage au président François Mitterrand, à l’origine de sa construction. Le nom de la station associe donc l’institution à la personne honorée.",
      },
      context: {
        en: "The planned station name was Tolbiac–Masséna, after nearby roads. The final name instead identifies the national library’s new site, opened to the public in 1996. Dominique Perrault designed its four towers around a central garden, giving the library a distinct architectural form.",
        fr: "Le nom prévu était Tolbiac–Masséna, d’après des voies voisines. Le choix définitif désigne plutôt le nouveau site de la bibliothèque nationale, ouvert au public en 1996. Dominique Perrault a conçu ses quatre tours autour d’un jardin central, donnant à la bibliothèque une forme architecturale distincte.",
      },
      sources: [
        {
          label:
            "Wikipédia · Bibliothèque François-Mitterrand (métro de Paris)",
          url: "https://fr.wikipedia.org/wiki/Biblioth%C3%A8que_Fran%C3%A7ois-Mitterrand_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "BnF · Le site François-Mitterrand",
          url: "https://www.bnf.fr/fr/le-site-francois-mitterrand",
        },
      ],
      people: [
        {
          name: "François Mitterrand",
          url: {
            en: "https://en.wikipedia.org/wiki/Fran%C3%A7ois_Mitterrand",
            fr: "https://fr.wikipedia.org/wiki/Fran%C3%A7ois_Mitterrand",
          },
        },
      ],
    },
    {
      id: "olympiades",
      name: "Olympiades",
      area: "Paris · 13e",
      art: "towers",
      etymology: {
        en: "Called Olympiades after the nearby housing development and its raised pedestrian deck. The development uses an Olympic theme: its towers bear names of cities that hosted the Olympic Games. The metro adopted the name of this existing neighbourhood.",
        fr: "La station doit son nom à l’ensemble immobilier des Olympiades et à sa dalle piétonne. Les tours portent des noms de villes ayant accueilli les Jeux olympiques. Le métro a ainsi repris le thème olympique d’un quartier déjà construit.",
      },
      context: {
        en: "The station’s use of the name required an agreement with the French Olympic committee, which owned the trademark. An agreement in 2006 allowed its use for public transport. The station opened the following year as the next stop beyond Bibliothèque François-Mitterrand.",
        fr: "L’usage de ce nom par la station a nécessité un accord avec le Comité national olympique et sportif français, propriétaire de la marque. Un accord conclu en 2006 a permis son utilisation pour les transports publics. La station a ouvert l’année suivante, au-delà de Bibliothèque François-Mitterrand.",
      },
      sources: [
        {
          label: "Wikipédia · Olympiades (métro de Paris)",
          url: "https://fr.wikipedia.org/wiki/Olympiades_(m%C3%A9tro_de_Paris)",
        },
      ],
    },
    {
      id: "maison-blanche",
      name: "Maison Blanche",
      area: "Paris · 13e",
      art: "market",
      etymology: {
        en: "Called Maison Blanche after the surrounding Maison-Blanche district, which took its name from an inn called Maison Blanche, or “White House”. The metro preserves the inn’s name through the neighbourhood that grew around it.",
        fr: "La station doit son nom au quartier de la Maison-Blanche, lui-même nommé d’après une auberge appelée « Maison Blanche ». Le métro conserve ainsi le nom d’un établissement ancien par l’intermédiaire du quartier qui s’est développé autour de lui.",
      },
      context: {
        en: "The name was already used by Line 7 before Line 14 arrived. The nearby rue de la Maison-Blanche carries the same local name, but lies farther north, near Tolbiac station. The district, rather than that street, gives this station its name.",
        fr: "La ligne 7 utilisait déjà ce nom avant l’arrivée de la ligne 14. La rue de la Maison-Blanche porte le même nom local, mais se trouve plus au nord, près de la station Tolbiac. C’est le quartier, plutôt que cette rue, qui donne son nom à la station.",
      },
      sources: [
        {
          label: "Wikipédia · Maison Blanche (métro de Paris)",
          url: "https://fr.wikipedia.org/wiki/Maison_Blanche_(m%C3%A9tro_de_Paris)",
        },
      ],
    },
    {
      id: "hopital-bicetre",
      name: "Hôpital Bicêtre",
      area: "Le Kremlin-Bicêtre / Gentilly",
      art: "hospital",
      etymology: {
        en: "Called Hôpital Bicêtre because it serves Bicêtre hospital. Bicêtre is a French alteration of Winchester: Jean de Pontoise, bishop of Winchester, acquired the medieval estate. The hospital retained the estate’s name, which the metro then adopted.",
        fr: "La station doit son nom à l’hôpital Bicêtre qu’elle dessert. Bicêtre est une transformation française de Winchester : Jean de Pontoise, évêque de Winchester, avait acquis le domaine médiéval. L’hôpital a conservé ce nom, ensuite repris par le métro.",
      },
      context: {
        en: "The hospital’s history traces the name through the forms Winchester, Bicestre and Bicêtre. The station’s project name was Kremlin-Bicêtre Hôpital. A public consultation in 2022 selected the shorter Hôpital Bicêtre, putting the medical institution first on the sign.",
        fr: "L’histoire de l’hôpital rattache le nom aux formes Winchester, Bicestre et Bicêtre. Le projet de station portait d’abord le nom Kremlin-Bicêtre Hôpital. Une consultation publique en 2022 a retenu Hôpital Bicêtre, une forme plus courte qui place l’établissement médical en tête.",
      },
      sources: [
        {
          label: "Wikipédia · Hôpital Bicêtre (métro de Paris)",
          url: "https://fr.wikipedia.org/wiki/H%C3%B4pital_Bic%C3%AAtre_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "AP-HP · Hôpital Bicêtre",
          url: "https://hopital-bicetre.aphp.fr/lhopital",
        },
        {
          label: "AP-HP · Histoire du nom Bicêtre",
          url: "https://www.aphp.fr/sites/default/files/w_livret_accueil_enfant_bicetre.pdf",
        },
        {
          label: "Île-de-France Mobilités · Noms choisis en 2022",
          url: "https://www.iledefrance-mobilites.fr/actualites/metro-ligne-14-noms-futures-stations",
        },
      ],
    },
    {
      id: "villejuif-gustave-roussy",
      name: "Villejuif–Gustave Roussy",
      area: "Villejuif",
      art: "portrait",
      etymology: {
        en: "Called Villejuif–Gustave Roussy after the town and the nearby cancer institute. The institute bears the name of its founder, Gustave Roussy, a French-Swiss doctor who worked in neurology, pathology and cancer treatment.",
        fr: "La station doit son nom à la ville de Villejuif et au centre de lutte contre le cancer voisin. Cet institut porte le nom de son fondateur, Gustave Roussy, médecin franco-suisse spécialiste de neurologie, d’anatomie pathologique et de cancérologie.",
      },
      context: {
        en: "Roussy’s work led to the creation of the institute in 1926. The station’s final name was selected through a public consultation in 2022. It opened on 18 January 2025, after the rest of the southern extension had entered service.",
        fr: "Les travaux de Roussy ont conduit à la création de l’institut en 1926. Le nom définitif de la station a été choisi lors d’une consultation publique en 2022. Elle a ouvert le 18 janvier 2025, après la mise en service du reste du prolongement sud.",
      },
      sources: [
        {
          label: "Wikipédia · Villejuif - Gustave Roussy (métro de Paris)",
          url: "https://fr.wikipedia.org/wiki/Villejuif_-_Gustave_Roussy_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Gustave Roussy · Histoire",
          url: "https://www.gustaveroussy.com/fr/histoire-linstitut",
        },
        {
          label: "Île-de-France Mobilités · Noms choisis en 2022",
          url: "https://www.iledefrance-mobilites.fr/actualites/metro-ligne-14-noms-futures-stations",
        },
      ],
      people: [
        {
          name: "Gustave Roussy",
          url: {
            en: "https://en.wikipedia.org/wiki/Gustave_Roussy",
            fr: "https://fr.wikipedia.org/wiki/Gustave_Roussy",
          },
        },
      ],
    },
    {
      id: "l-hay-les-roses",
      name: "L’Haÿ-les-Roses",
      area: "L’Haÿ-les-Roses",
      art: "garden",
      etymology: {
        en: "Called L’Haÿ-les-Roses after the town it serves. The town added “les-Roses” to L’Haÿ in 1914 because of the fame of its rose garden. The station carries that floral addition as part of the municipal name.",
        fr: "La station doit son nom à la ville qu’elle dessert. L’Haÿ a ajouté « les-Roses » à son nom en 1914 en raison de la renommée de sa roseraie. Le métro reprend cette référence florale intégrée au nom municipal.",
      },
      context: {
        en: "The garden’s reputation brought visitors to the town and supported the request to change its name. The metro project initially used Chevilly–Trois Communes. A public consultation in 2022 chose L’Haÿ-les-Roses, identifying the town rather than the earlier project area.",
        fr: "La réputation de la roseraie attirait des visiteurs et a motivé la demande de changement de nom de la ville. Le projet de métro utilisait d’abord Chevilly–Trois Communes. Une consultation publique en 2022 a choisi L’Haÿ-les-Roses, désignant la commune plutôt que le secteur du projet.",
      },
      sources: [
        {
          label: "Wikipédia · L'Haÿ-les-Roses (métro de Paris)",
          url: "https://fr.wikipedia.org/wiki/L%27Ha%C3%BF-les-Roses_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Bibliothèque municipale de Lyon · L’Haÿ-les-Roses",
          url: "https://www.guichetdusavoir.org/question/voir/7401",
        },
        {
          label: "Les Gravereaux · Appellation de 1914",
          url: "https://lesgravereaux.marret.co/index.php/lhay-les-roses-une-appellation-centenaire/",
        },
        {
          label: "Île-de-France Mobilités · Noms choisis en 2022",
          url: "https://www.iledefrance-mobilites.fr/actualites/metro-ligne-14-noms-futures-stations",
        },
      ],
    },
    {
      id: "chevilly-larue",
      name: "Chevilly-Larue",
      area: "Chevilly-Larue",
      art: "square",
      etymology: {
        en: "Called Chevilly-Larue after the municipality where the station stands. The compound town name joins Chevilly and the former hamlet of Larue. Larue was added to the official municipal name in 1920, long before the metro arrived.",
        fr: "La station doit son nom à la commune où elle se trouve. Ce nom composé associe Chevilly à l’ancien hameau de Larue. Larue a été ajouté au nom officiel de la commune en 1920, bien avant l’arrivée du métro.",
      },
      context: {
        en: "The metro project originally called this station Porte de Thiais. Local authorities sought names that better identified the towns served. Chevilly-Larue was confirmed in 2022. The municipality’s own history describes its origins as two distinct settlements, Chevilly and Larue.",
        fr: "Le projet de métro appelait initialement cette station Porte de Thiais. Les collectivités ont demandé des noms identifiant mieux les communes desservies. Chevilly-Larue a été confirmé en 2022. L’histoire publiée par la ville rappelle ses deux noyaux d’origine distincts, Chevilly et Larue.",
      },
      sources: [
        {
          label: "Wikipédia · Chevilly-Larue (métro de Paris)",
          url: "https://fr.wikipedia.org/wiki/Chevilly-Larue_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Chevilly-Larue · Histoire de la ville",
          url: "https://www.ville-chevilly-larue.fr/vie-municipale-et-budget/histoire-de-la-ville/",
        },
        {
          label: "Val-de-Marne · Noms des stations",
          url: "https://www.valdemarne.fr/espace-presse/les-communiques-de-presse/nouveaux-noms-des-stations-de-la-ligne-14-du-grand-paris-express-un-choix-de-coherence-territoriale",
        },
      ],
    },
    {
      id: "thiais-orly",
      name: "Thiais–Orly",
      area: "Thiais / Orly",
      art: "station",
      etymology: {
        en: "Called Thiais–Orly to identify the two neighbouring municipalities served by the station. The compound name replaced the project name Pont de Rungis. It brings Thiais and Orly onto the metro map as towns in their own right.",
        fr: "La station doit son nom aux deux communes voisines de Thiais et d’Orly qu’elle dessert. Ce nom composé a remplacé le nom de projet Pont de Rungis. Il inscrit les deux villes sur le plan du métro.",
      },
      context: {
        en: "The name was confirmed in 2022 after local authorities requested changes to the southern extension’s station names. Pont de Rungis remains the name of the connecting RER C station. The two names therefore describe the same interchange through different local references.",
        fr: "Le nom a été confirmé en 2022 après les demandes des collectivités concernant les stations du prolongement sud. Pont de Rungis reste le nom de la gare du RER C en correspondance. Les deux noms désignent ainsi un même pôle à partir de repères locaux différents.",
      },
      sources: [
        {
          label: "Wikipédia · Thiais - Orly (métro de Paris)",
          url: "https://fr.wikipedia.org/wiki/Thiais_-_Orly_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Val-de-Marne · Noms des stations",
          url: "https://www.valdemarne.fr/espace-presse/les-communiques-de-presse/nouveaux-noms-des-stations-de-la-ligne-14-du-grand-paris-express-un-choix-de-coherence-territoriale",
        },
      ],
    },
    {
      id: "aeroport-d-orly",
      name: "Aéroport d’Orly",
      area: "Paray-Vieille-Poste",
      art: "plane",
      etymology: {
        en: "Called Aéroport d’Orly because it serves Paris-Orly airport. The airport itself takes its name from Orly, one of the municipalities across which its site extends. The station uses the airport’s name even though it stands in Paray-Vieille-Poste.",
        fr: "La station doit son nom à l’aéroport de Paris-Orly qu’elle dessert. L’aéroport porte le nom d’Orly, l’une des communes sur lesquelles il s’étend. La station reprend ce nom bien qu’elle soit située sur le territoire de Paray-Vieille-Poste.",
      },
      context: {
        en: "The airport grew from an airfield established on land at Orly. Its later expansion spread across municipal boundaries. The metro terminus is inside the airport site, near the terminals, so the name identifies the transport destination rather than the municipality beneath the platforms.",
        fr: "L’aéroport s’est développé à partir d’un terrain d’aviation établi à Orly. Son agrandissement a ensuite franchi les limites communales. Le terminus du métro se trouve dans l’enceinte aéroportuaire, près des terminaux : son nom indique la destination de transport plutôt que la commune sous les quais.",
      },
      sources: [
        {
          label: "Wikipédia · Aéroport d'Orly (métro de Paris)",
          url: "https://fr.wikipedia.org/wiki/A%C3%A9roport_d%27Orly_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Wikipédia · Aéroport de Paris-Orly",
          url: "https://fr.wikipedia.org/wiki/A%C3%A9roport_de_Paris-Orly",
        },
        {
          label: "Île-de-France · Inventaire de l’aéroport",
          url: "https://pop.culture.gouv.fr/notice/merimee/IA94000550",
        },
      ],
    },
  ],
  paths: [
    [
      "saint-denis-pleyel",
      "mairie-de-saint-ouen",
      "saint-ouen",
      "porte-de-clichy",
      "pont-cardinet",
      "saint-lazare",
      "madeleine",
      "pyramides",
      "chatelet",
      "gare-de-lyon",
      "bercy",
      "cour-saint-emilion",
      "bibliotheque-francois-mitterrand",
      "olympiades",
      "maison-blanche",
      "hopital-bicetre",
      "villejuif-gustave-roussy",
      "l-hay-les-roses",
      "chevilly-larue",
      "thiais-orly",
      "aeroport-d-orly",
    ],
  ],
  featured: [
    "saint-denis-pleyel",
    "pont-cardinet",
    "hopital-bicetre",
    "l-hay-les-roses",
  ],
  image: "/illustrations/line-14.png",
  imageAlt: {
    en: "Illustration of places and names along Line 14.",
    fr: "Illustration des lieux et des noms de la ligne 14.",
  },
  sources: [
    {
      label: "Wikipédia · Ligne 14 du métro de Paris",
      url: "https://fr.wikipedia.org/wiki/Ligne_14_du_m%C3%A9tro_de_Paris",
    },
  ],
};

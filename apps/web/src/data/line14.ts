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
    en: "Line 14 runs through 21 stations from Saint-Denis – Pleyel, in a district named after a piano factory, to Aéroport d’Orly. Several names on the southern extension were chosen in 2022, such as Hôpital Bicêtre.",
    fr: "La ligne 14 relie en 21 stations Saint-Denis – Pleyel, dans un quartier qui doit son nom à une manufacture de pianos, à Aéroport d’Orly. Plusieurs noms du prolongement sud ont été choisis en 2022, comme Hôpital Bicêtre.",
  },
  termini: ["Saint-Denis – Pleyel", "Aéroport d’Orly"],
  stations: [
    {
      id: "saint-denis-pleyel",
      name: "Saint-Denis – Pleyel",
      area: "Saint-Denis",
      art: "piano",
      etymology: {
        en: "Called Saint-Denis – Pleyel after the Pleyel district of Saint-Denis. The district takes its name from the Pleyel piano factory. The company’s founder was the composer and piano maker Ignace Pleyel.",
        fr: "La station doit son nom au quartier Pleyel de Saint-Denis. Ce quartier tient son nom de la manufacture de pianos Pleyel. L’entreprise a été fondée par le compositeur et facteur de pianos Ignace Pleyel.",
      },
      context: {
        en: "The town of Saint-Denis takes its name from Denis, the first bishop of Paris, whose burial place became a religious centre. A public consultation confirmed the station name Saint-Denis Pleyel in 2022.",
        fr: "La ville de Saint-Denis porte le nom de Denis, premier évêque de Paris, dont le lieu de sépulture est devenu un centre religieux. Une consultation publique a confirmé le nom de station Saint-Denis Pleyel en 2022.",
      },
      sources: [
        {
          label: "Saint-Denis Pleyel (métro de Paris) · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Saint-Denis_Pleyel_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Rue Pleyel (Saint-Denis) · Wikipédia",
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
        en: "Line 13 already served this town-hall stop before Line 14 arrived. It became the northern terminus of Line 14 in 2020, before the extension to Saint-Denis.",
        fr: "La ligne 13 desservait déjà cet arrêt avant l’arrivée de la ligne 14. Il est devenu le terminus nord de cette dernière en 2020, avant son prolongement vers Saint-Denis.",
      },
      sources: [
        {
          label: "Mairie de Saint-Ouen (métro de Paris) · Wikipédia",
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
        en: "Called Saint-Ouen because the Métro adopted the name of the existing RER station at the same interchange. That name refers to the town of Saint-Ouen, which takes its name from Ouen, a seventh-century bishop of Rouen.",
        fr: "La station porte le nom de la gare du RER déjà existante avec laquelle elle est en correspondance. Ce nom est celui de la ville de Saint-Ouen, qui doit le sien à Ouen, évêque de Rouen au VIIe siècle.",
      },
      context: {
        en: "The planned name was Clichy – Saint-Ouen because the station straddles the two towns. The final choice followed the transport authority’s rule that connecting stations share a name.",
        fr: "Le nom prévu était Clichy – Saint-Ouen, car la station se trouve à cheval sur les deux villes. Le choix définitif suit la règle de l’autorité organisatrice qui donne le même nom aux gares en correspondance.",
      },
      sources: [
        {
          label: "Saint-Ouen (métro de Paris) · Wikipédia",
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
        fr: "La station doit son nom à l’ancienne porte de Paris située sur la route de Clichy. Le mot « porte » rappelle une entrée des fortifications du XIXe siècle, tandis que « Clichy » désigne la ville située au-delà.",
      },
      context: {
        en: "The gate controlled entry through the Thiers fortifications. The wall has disappeared, but the road crossing keeps the name Porte de Clichy. The station’s subtitle, Tribunal de Paris, refers to the court complex it serves.",
        fr: "La porte contrôlait une entrée de l’enceinte de Thiers. Les fortifications ont disparu, mais le carrefour routier a gardé le nom de porte de Clichy. Le sous-titre de la station, Tribunal de Paris, désigne le palais de justice desservi.",
      },
      sources: [
        {
          label: "Porte de Clichy (métro de Paris) · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Porte_de_Clichy_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Porte de Clichy · Wikipédia",
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
        en: "Called Pont Cardinet after the bridge that carries Rue Cardinet over the railway tracks. The street bears the name of a local property owner, Philippe Cardinet.",
        fr: "La station doit son nom au pont qui porte la rue Cardinet au-dessus des voies ferrées. Cette rue rappelle un propriétaire local, Philippe Cardinet.",
      },
      context: {
        en: "The bridge crosses the tracks approaching Saint-Lazare. The nearby suburban railway station also takes its name from this crossing. Cardinet was a wine merchant and caterer.",
        fr: "Le pont franchit les voies qui mènent à Saint-Lazare. La gare de banlieue voisine porte elle aussi le nom de ce passage. Cardinet était marchand de vins et traiteur.",
      },
      sources: [
        {
          label: "Pont Cardinet (métro de Paris) · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Pont_Cardinet_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Gare de Pont-Cardinet · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Gare_de_Pont-Cardinet",
        },
        {
          label: "Rue Cardinet · Wikipédia",
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
        en: "Called Saint-Lazare after the nearby railway station and Rue Saint-Lazare. The street led to the Maison Saint-Lazare, a leper hospital dedicated to Saint Lazarus.",
        fr: "La station doit son nom à la gare et à la rue Saint-Lazare voisines. Cette rue menait à la maison Saint-Lazare, ancienne léproserie dédiée à saint Lazare.",
      },
      context: {
        en: "The leper hospital stood farther east, on Rue du Faubourg-Saint-Denis. In 1632 it passed to Vincent de Paul and the Congregation of the Mission. A decree of 1794 recognised it as a prison, later used for women, which closed in 1927.",
        fr: "La léproserie se trouvait plus à l’est, rue du Faubourg-Saint-Denis. En 1632, elle a été cédée à Vincent de Paul et à la congrégation de la Mission. Un décret de 1794 l’a reconnue comme prison, ensuite réservée aux femmes, qui a fermé en 1927.",
      },
      sources: [
        {
          label: "Saint-Lazare (métro de Paris) · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Saint-Lazare_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Rue Saint-Lazare · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Rue_Saint-Lazare",
        },
        {
          label: "Prison Saint-Lazare · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Prison_Saint-Lazare",
        },
      ],
    },
    {
      id: "madeleine",
      name: "Madeleine",
      area: "Paris · 8e",
      art: "temple",
      etymology: {
        en: "Called Madeleine after Place de la Madeleine and the church at its centre. The church is dedicated to Mary Magdalene, called Marie Madeleine in French.",
        fr: "La station doit son nom à la place de la Madeleine et à l’église qui en occupe le centre. Celle-ci est dédiée à sainte Marie Madeleine.",
      },
      context: {
        en: "The dedication is older than the present church. In the thirteenth century, a chapel in the former settlement of La Ville-l’Évêque was already dedicated to Mary Magdalene.",
        fr: "La dédicace est plus ancienne que l’église actuelle. Au XIIIe siècle, une chapelle de l’ancien bourg de la Ville-l’Évêque était déjà dédiée à Marie Madeleine.",
      },
      sources: [
        {
          label: "Madeleine (métro de Paris) · Wikipédia",
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
        en: "Called Pyramides after Rue des Pyramides, which commemorates Bonaparte’s victory over the Mamluks at the Battle of the Pyramids in 1798, during the French campaign in Egypt.",
        fr: "La station doit son nom à la rue des Pyramides, qui commémore la victoire de Bonaparte sur les Mamelouks à la bataille des Pyramides en 1798, pendant la campagne d’Égypte.",
      },
      context: {
        en: "The station opened on Line 7 on 1 July 1916. The Line 14 platforms opened on 15 October 1998 under the same name.",
        fr: "La station a ouvert sur la ligne 7 le 1er juillet 1916. Les quais de la ligne 14 ont ouvert sous le même nom le 15 octobre 1998.",
      },
      sources: [
        {
          label: "Pyramides (métro de Paris) · Wikipédia",
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
        en: "Called Châtelet after Place du Châtelet, laid out on the site of the Grand Châtelet. This fortress was a court and prison before its demolition in the early nineteenth century.",
        fr: "La station doit son nom à la place du Châtelet, aménagée à l’emplacement du Grand Châtelet. Cette forteresse était un tribunal et une prison avant sa démolition au début du XIXe siècle.",
      },
      context: {
        en: "The Grand Châtelet stood at the northern approach to the Pont au Change. Under the Ancien Régime it housed the royal court of the provosts of Paris, as well as prisons. Its demolition began in 1802 and ended in 1810.",
        fr: "Le Grand Châtelet occupait l’accès nord du pont au Change. Sous l’Ancien Régime, il abritait le tribunal royal des prévôts de Paris, ainsi que des prisons. Sa démolition a commencé en 1802 et s’est achevée en 1810.",
      },
      sources: [
        {
          label: "Châtelet (métro de Paris) · Wikipédia",
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
        en: "Called Gare de Lyon because it serves the railway terminus of that name. Lyon refers to the city its railway line was built to reach, in south-eastern France.",
        fr: "La station doit son nom à la gare parisienne qu’elle dessert. Lyon désigne la ville que dessert cette ligne ferroviaire, dans le sud-est de la France.",
      },
      context: {
        en: "The main-line station was the Paris terminus of the PLM company (Chemins de fer de Paris à Lyon et à la Méditerranée). The Line 14 platforms lie along Rue de Bercy, while the older Line 1 platforms are under Boulevard Diderot.",
        fr: "La gare était la tête de ligne parisienne de la Compagnie des chemins de fer de Paris à Lyon et à la Méditerranée (PLM). Les quais de la ligne 14 longent la rue de Bercy. Ceux de la ligne 1, plus anciens, se trouvent sous le boulevard Diderot.",
      },
      sources: [
        {
          label: "Gare de Lyon (métro de Paris) · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Gare_de_Lyon_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Paris-Gare-de-Lyon · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Paris-Gare-de-Lyon",
        },
        {
          label: "Gare de Lyon · Wikipedia",
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
        en: "A charter from 1134 records an early form of the place name Bercy. A seigneurial estate, and later a separate commune, bore the name.",
        fr: "Une charte de 1134 conserve une forme ancienne du nom de lieu Bercy. Une seigneurie, puis une commune distincte, ont porté ce nom.",
      },
      sources: [
        {
          label: "Bercy (métro de Paris) · Wikipédia",
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
        en: "The station occupies part of the former Bercy goods yard, where trains brought wine from southern France. The neighbouring warehouse courts used wine-region names.",
        fr: "La station occupe une partie de l’ancienne gare de marchandises de Bercy, où arrivaient des trains de vins du sud de la France. Les cours des entrepôts voisins portaient des noms viticoles.",
      },
      sources: [
        {
          label: "Cour Saint-Émilion (métro de Paris) · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Cour_Saint-%C3%89milion_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Cour Saint-Émilion · Wikipédia",
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
        en: "Called Bibliothèque François-Mitterrand after the nearby François-Mitterrand site of the Bibliothèque nationale de France. The site is named after President François Mitterrand, who initiated its construction.",
        fr: "La station doit son nom au site François-Mitterrand de la Bibliothèque nationale de France, situé à proximité. Ce site porte le nom du président François Mitterrand, à l’origine de sa construction.",
      },
      context: {
        en: "The planned station name was Tolbiac – Masséna, after nearby roads. The final name instead identifies the national library’s new site, opened to the public in 1996. Dominique Perrault designed its four towers around a central garden.",
        fr: "Le nom prévu était Tolbiac – Masséna, d’après des voies voisines. Le choix définitif désigne plutôt le nouveau site de la bibliothèque nationale, ouvert au public en 1996. Dominique Perrault a conçu ses quatre tours autour d’un jardin central.",
      },
      sources: [
        {
          label:
            "Bibliothèque François-Mitterrand (métro de Paris) · Wikipédia",
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
      art: "modern",
      etymology: {
        en: "Called Olympiades after the nearby housing development and its raised pedestrian deck. The development uses an Olympic theme: its towers bear names of cities that hosted the Olympic Games.",
        fr: "La station doit son nom à l’ensemble immobilier des Olympiades et à sa dalle piétonne. Les tours portent des noms de villes ayant accueilli les Jeux olympiques.",
      },
      context: {
        en: "The French Olympic committee, which owned the trademark, agreed in 2006 to its use for public transport. The station opened the following year, beyond Bibliothèque François-Mitterrand.",
        fr: "En 2006, le Comité national olympique et sportif français, propriétaire de la marque, a autorisé son usage pour les transports publics. La station a ouvert l’année suivante, au-delà de Bibliothèque François-Mitterrand.",
      },
      sources: [
        {
          label: "Olympiades (métro de Paris) · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Olympiades_(m%C3%A9tro_de_Paris)",
        },
      ],
    },
    {
      id: "maison-blanche",
      name: "Maison Blanche",
      area: "Paris · 13e",
      art: "house",
      etymology: {
        en: "Called Maison Blanche after the surrounding district. The district took its name from an inn called “Maison Blanche”, French for “white house”.",
        fr: "La station doit son nom au quartier de la Maison-Blanche. Ce quartier tient son nom d’une auberge appelée « Maison Blanche ».",
      },
      context: {
        en: "The name was already used by Line 7 before Line 14 arrived. The nearby Rue de la Maison-Blanche carries the same local name, but lies farther north, near Tolbiac station.",
        fr: "La ligne 7 utilisait déjà ce nom avant l’arrivée de la ligne 14. La rue de la Maison-Blanche porte le même nom local, mais se trouve plus au nord, près de la station Tolbiac.",
      },
      sources: [
        {
          label: "Maison Blanche (métro de Paris) · Wikipédia",
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
        en: "Called Hôpital Bicêtre because it serves Bicêtre hospital. Bicêtre is a French alteration of Winchester: Jean de Pontoise, bishop of Winchester, acquired the medieval estate.",
        fr: "La station doit son nom à l’hôpital Bicêtre qu’elle dessert. Bicêtre est une transformation française de Winchester : Jean de Pontoise, évêque de Winchester, avait acquis le domaine médiéval.",
      },
      context: {
        en: "The hospital’s history traces the name through the forms Winchester, Bicestre and Bicêtre. The station’s project name was Kremlin-Bicêtre Hôpital. A public consultation in 2022 selected the shorter Hôpital Bicêtre, putting the medical institution first on the sign.",
        fr: "L’histoire de l’hôpital rattache le nom aux formes Winchester, Bicestre et Bicêtre. Le projet de station portait d’abord le nom Kremlin-Bicêtre Hôpital. Une consultation publique en 2022 a retenu Hôpital Bicêtre, une forme plus courte qui place l’établissement médical en tête.",
      },
      sources: [
        {
          label: "Hôpital Bicêtre (métro de Paris) · Wikipédia",
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
      name: "Villejuif – Gustave Roussy",
      area: "Villejuif",
      art: "portrait",
      etymology: {
        en: "Called Villejuif – Gustave Roussy after the town and the nearby cancer institute. The institute bears the name of its founder, Gustave Roussy, a French-Swiss doctor who worked in neurology, pathology and cancer treatment.",
        fr: "La station doit son nom à la ville de Villejuif et au centre de lutte contre le cancer voisin. Cet institut porte le nom de son fondateur, Gustave Roussy, médecin franco-suisse spécialiste de neurologie, d’anatomie pathologique et de cancérologie.",
      },
      context: {
        en: "Roussy’s work led to the creation of the institute in 1926. The station’s final name was selected through a public consultation in 2022. It opened on 18 January 2025, after the rest of the southern extension had entered service.",
        fr: "Les travaux de Roussy ont conduit à la création de l’institut en 1926. Le nom définitif de la station a été choisi lors d’une consultation publique en 2022. Elle a ouvert le 18 janvier 2025, après la mise en service du reste du prolongement sud.",
      },
      sources: [
        {
          label: "Villejuif - Gustave Roussy (métro de Paris) · Wikipédia",
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
        en: "Called L’Haÿ-les-Roses after the town it serves. The town added “les-Roses” to L’Haÿ in 1914 because of the fame of its rose garden.",
        fr: "La station doit son nom à la ville qu’elle dessert. L’Haÿ a ajouté « les-Roses » à son nom en 1914 en raison de la renommée de sa roseraie.",
      },
      context: {
        en: "The town council requested the new name, citing the visitors the rose garden brought and telephone confusion with Lagny. The Métro project first used the name Chevilly – Trois Communes. A public consultation in 2022 chose the town’s name, L’Haÿ-les-Roses.",
        fr: "Le conseil municipal a demandé ce nouveau nom en invoquant les visiteurs attirés par la roseraie et les confusions téléphoniques avec Lagny. Le projet de métro utilisait d’abord le nom Chevilly – Trois Communes. Une consultation publique en 2022 a retenu le nom de la commune, L’Haÿ-les-Roses.",
      },
      sources: [
        {
          label: "L'Haÿ-les-Roses (métro de Paris) · Wikipédia",
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
        en: "Called Chevilly-Larue after the municipality where the station stands. The compound town name joins Chevilly and the former hamlet of Larue. Larue was added to the official municipal name in 1920.",
        fr: "La station doit son nom à la commune où elle se trouve. Ce nom composé associe Chevilly à l’ancien hameau de Larue. Larue a été ajouté au nom officiel de la commune en 1920.",
      },
      context: {
        en: "The Métro project originally called this station Porte de Thiais. Local authorities sought names that better identified the towns served. Chevilly-Larue was confirmed in 2022.",
        fr: "Le projet de métro appelait initialement cette station Porte de Thiais. Les collectivités ont demandé des noms identifiant mieux les communes desservies. Chevilly-Larue a été confirmé en 2022.",
      },
      sources: [
        {
          label: "Chevilly-Larue (métro de Paris) · Wikipédia",
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
      name: "Thiais – Orly",
      area: "Thiais / Orly",
      art: "station",
      etymology: {
        en: "Called Thiais – Orly to identify the two neighbouring municipalities served by the station. The compound name replaced the project name Pont de Rungis.",
        fr: "La station doit son nom aux deux communes voisines de Thiais et d’Orly qu’elle dessert. Ce nom composé a remplacé le nom de projet Pont de Rungis.",
      },
      context: {
        en: "The name was confirmed in 2022 after local authorities requested changes to the southern extension’s station names. Pont de Rungis remains the name of the connecting RER C station. The two names therefore describe the same interchange through different local references.",
        fr: "Le nom a été confirmé en 2022 après les demandes des collectivités concernant les stations du prolongement sud. Pont de Rungis reste le nom de la gare du RER C en correspondance. Les deux noms désignent ainsi un même pôle à partir de repères locaux différents.",
      },
      sources: [
        {
          label: "Thiais - Orly (métro de Paris) · Wikipédia",
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
        en: "The airport grew from an airfield established on land at Orly. Its later expansion spread across municipal boundaries. The Métro terminus is inside the airport site, near the terminals, so the name identifies the transport destination rather than the municipality beneath the platforms.",
        fr: "L’aéroport s’est développé à partir d’un terrain d’aviation établi à Orly. Son agrandissement a ensuite franchi les limites communales. Le terminus du métro se trouve dans l’enceinte aéroportuaire, près des terminaux. Son nom indique donc la destination plutôt que la commune où se trouvent les quais.",
      },
      sources: [
        {
          label: "Aéroport d'Orly (métro de Paris) · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/A%C3%A9roport_d%27Orly_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Aéroport de Paris-Orly · Wikipédia",
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
  image: "/illustrations/line-14.webp",
  imageAlt: {
    en: "Engraving-style illustration of the colonnaded front of the Madeleine church and, on the right, the four glass towers of the Bibliothèque nationale de France around a garden.",
    fr: "Illustration de style gravure de la façade à colonnes de l’église de la Madeleine et, à droite, des quatre tours de verre de la Bibliothèque nationale de France autour d’un jardin.",
  },
  sources: [
    {
      label: "Ligne 14 du métro de Paris · Wikipédia",
      url: "https://fr.wikipedia.org/wiki/Ligne_14_du_m%C3%A9tro_de_Paris",
    },
  ],
};

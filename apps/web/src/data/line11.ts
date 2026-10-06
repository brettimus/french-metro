import type { MetroLine } from "./types";

// Name-origin sources and editorial limits: docs/research/line11.md.
export const line11: MetroLine = {
  id: "11",
  color: "#8d5e2a",
  textColor: "#ffffff",
  title: {
    en: "Line 11",
    fr: "Ligne 11",
  },
  summary: {
    en: "Line 11 runs from Châtelet to Rosny – Bois-Perrier and has 19 stations. Several names recall the hill and former village of Belleville, such as Place des Fêtes and Télégraphe. In 1956 it became the first metro line in the world to run on rubber tyres.",
    fr: "La ligne 11 relie Châtelet à Rosny – Bois-Perrier et compte 19 stations. Plusieurs noms rappellent la colline et l’ancien village de Belleville, comme Place des Fêtes et Télégraphe. En 1956, elle devient la première ligne de métro au monde à rouler sur pneus.",
  },
  termini: ["Châtelet", "Rosny – Bois-Perrier"],
  stations: [
    {
      id: "chatelet",
      name: "Châtelet",
      area: "Paris 1er / 4e",
      art: "gate",
      opened: 1935,
      etymology: {
        en: "Called Châtelet after Place du Châtelet, laid out on the site of the Grand Châtelet. This fortress was a court and prison before its demolition in the early nineteenth century.",
        fr: "La station doit son nom à la place du Châtelet, aménagée à l’emplacement du Grand Châtelet. Cette forteresse était un tribunal et une prison avant sa démolition au début du XIXe siècle.",
      },
      context: {
        en: "Since 28 April 1935 this platform under Avenue Victoria has been the western terminus of Line 11. Until 2018 its name plates carried the subtitle “Avenue Victoria”, after Queen Victoria.",
        fr: "Depuis le 28 avril 1935, ce quai sous l’avenue Victoria est le terminus ouest de la ligne 11. Jusqu’en 2018, ses plaques portent le sous-titre « Avenue Victoria », en l’honneur de la reine Victoria.",
      },
      sources: [
        {
          label: "Châtelet · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ch%C3%A2telet_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Ligne 11 du métro de Paris · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ligne_11_du_m%C3%A9tro_de_Paris",
        },
      ],
    },
    {
      id: "hotel-de-ville",
      name: "Hôtel de Ville",
      area: "Paris 4e",
      art: "house",
      opened: 1935,
      etymology: {
        en: "Called Hôtel de Ville after the adjoining Paris city hall and the square of the same name. The city hall has housed the municipal institutions of Paris since 1357.",
        fr: "La station doit son nom à l’Hôtel de Ville de Paris, qu’elle dessert, et à la place du même nom. L’Hôtel de Ville abrite les institutions municipales parisiennes depuis 1357.",
      },
      context: {
        en: "This platform, under Rue du Renard, lies just after the point where Line 11 passes under Line 1. From 18 March 2019 Hôtel de Ville was the temporary western terminus, while the Châtelet platform was closed to be adapted for longer trains.",
        fr: "Ce quai, sous la rue du Renard, se trouve juste après le point où la ligne 11 passe sous la ligne 1. À partir du 18 mars 2019, Hôtel de Ville est le terminus ouest provisoire, pendant que le quai de Châtelet, fermé, est adapté à des trains plus longs.",
      },
      sources: [
        {
          label: "Hôtel de Ville · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/H%C3%B4tel_de_Ville_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Ligne 11 du métro de Paris · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ligne_11_du_m%C3%A9tro_de_Paris",
        },
      ],
    },
    {
      id: "rambuteau",
      name: "Rambuteau",
      area: "Paris 3e / 4e",
      art: "portrait",
      opened: 1935,
      etymology: {
        en: "Named for Rue Rambuteau, which honours Claude-Philibert Barthelot, comte de Rambuteau (1781–1869). As prefect of the Seine from 1833 to 1848, he decided in 1834 to cut the street through the medieval centre of Paris.",
        fr: "La station doit son nom à la rue Rambuteau, qui honore Claude-Philibert Barthelot, comte de Rambuteau (1781–1869). Préfet de la Seine de 1833 à 1848, il décide en 1834 de percer cette rue à travers le centre médiéval de Paris.",
      },
      context: {
        en: "Early plans had a shorter route from République to Hôtel de Ville, with the station under Rue du Temple at its junction with Rue Rambuteau. Rue du Temple was too narrow, so the line was moved west under Rue du Renard, Rue Beaubourg and Rue Réaumur.",
        fr: "Les premiers plans prévoient un tracé plus court de République à Hôtel de Ville. La station devait alors se trouver sous la rue du Temple, au croisement de la rue Rambuteau. La rue du Temple est trop étroite : la ligne est donc déplacée vers l’ouest, sous les rues du Renard, Beaubourg et Réaumur.",
      },
      sources: [
        {
          label: "Rambuteau · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Rambuteau_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Claude-Philibert Barthelot de Rambuteau · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Claude-Philibert_Barthelot_de_Rambuteau",
        },
        {
          label: "Rue Rambuteau · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Rue_Rambuteau",
        },
      ],
      people: [
        {
          name: "Claude-Philibert Barthelot de Rambuteau",
          url: {
            en: "https://en.wikipedia.org/wiki/Claude-Philibert_Barthelot_de_Rambuteau",
            fr: "https://fr.wikipedia.org/wiki/Claude-Philibert_Barthelot_de_Rambuteau",
          },
        },
      ],
    },
    {
      id: "arts-et-metiers",
      name: "Arts et Métiers",
      area: "Paris 3e",
      art: "loom",
      opened: 1935,
      etymology: {
        en: "Named for the Conservatoire national des arts et métiers, founded by Abbé Henri Grégoire on 10 October 1794. It first trained technicians and engineers through demonstrations with scientific objects, and it now houses the Musée des Arts et Métiers.",
        fr: "La station doit son nom au Conservatoire national des arts et métiers, fondé par l’abbé Henri Grégoire le 10 octobre 1794. Il forme d’abord des techniciens et des ingénieurs par la démonstration d’objets scientifiques et abrite aujourd’hui le musée des Arts et Métiers.",
      },
      context: {
        en: "In October 1994, for the bicentenary of the Conservatoire national des arts et métiers, the Line 11 platforms were lined with 800 riveted copper plates. François Schuiten and Benoît Peeters, authors of the comic series Les Cités obscures, designed them. Portholes show models of museum objects, and large gears hang from the vault.",
        fr: "En octobre 1994, pour le bicentenaire du Conservatoire national des arts et métiers, les quais de la ligne 11 reçoivent 800 plaques de cuivre rivetées. François Schuiten et Benoît Peeters, auteurs des Cités obscures, les ont dessinées. Des hublots montrent des maquettes d’objets du musée ; de grands engrenages pendent de la voûte.",
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
    },
    {
      id: "republique",
      name: "République",
      area: "Paris 3e / 10e / 11e",
      art: "square",
      opened: 1935,
      etymology: {
        en: "Called République after Place de la République. The square received its name as Paris planned a monument celebrating the French Republic.",
        fr: "La station doit son nom à la place de la République, rebaptisée alors que Paris prépare un monument célébrant la République française.",
      },
      context: {
        en: "The Line 11 tunnel under the square was built at the same time as Lines 8 and 9. Work on the rest of the line began in September 1931. Here Line 11 passes below all the other lines.",
        fr: "Le tunnel de la ligne 11 sous la place est construit en même temps que les lignes 8 et 9. Les travaux sur le reste de la ligne commencent en septembre 1931. La ligne 11 passe ici sous toutes les autres lignes.",
      },
      sources: [
        {
          label: "République · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/R%C3%A9publique_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Ligne 11 du métro de Paris · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ligne_11_du_m%C3%A9tro_de_Paris",
        },
      ],
    },
    {
      id: "goncourt",
      name: "Goncourt",
      area: "Paris 10e / 11e",
      art: "portrait",
      opened: 1935,
      etymology: {
        en: "Named for Rue des Goncourt, which honours the brothers Edmond (1822–1896) and Jules (1830–1870) de Goncourt. The two writers and historians planned the Académie Goncourt, founded in 1903 under Edmond’s will. It awards the Prix Goncourt.",
        fr: "La station doit son nom à la rue des Goncourt, qui honore les frères Edmond (1822–1896) et Jules (1830–1870) de Goncourt. Écrivains et historiens, ils conçoivent l’Académie Goncourt, fondée en 1903 selon le testament d’Edmond. Elle décerne le prix Goncourt.",
      },
      context: {
        en: "The subtitle “Hôpital Saint-Louis” names the hospital 350 m to the north, named in memory of King Louis IX. Between République and Goncourt the line passes under the Canal Saint-Martin, which runs in a tunnel from that point to the Arsenal basin.",
        fr: "Le sous-titre « Hôpital Saint-Louis » désigne l’hôpital situé à 350 m au nord, nommé en mémoire du roi Louis IX. Entre République et Goncourt, la ligne passe sous le canal Saint-Martin, couvert à partir de ce point jusqu’au bassin de l’Arsenal.",
      },
      sources: [
        {
          label: "Goncourt · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Goncourt_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Rue des Goncourt · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Rue_des_Goncourt",
        },
        {
          label: "Ligne 11 du métro de Paris · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ligne_11_du_m%C3%A9tro_de_Paris",
        },
        {
          label: "Académie Goncourt · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Acad%C3%A9mie_Goncourt",
        },
      ],
    },
    {
      id: "belleville",
      name: "Belleville",
      area: "Paris 10e / 11e / 19e / 20e",
      art: "house",
      opened: 1935,
      etymology: {
        en: "Named for the crossing of Rue de Belleville and Boulevard de Belleville. Both recall the former village of Belleville: the street was its main road and the boulevard its western edge. The commune was annexed to Paris in 1860.",
        fr: "La station doit son nom au croisement de la rue et du boulevard de Belleville. Tous deux rappellent l’ancien village de Belleville : la rue en était la grande rue et le boulevard la limite ouest. La commune est annexée à Paris en 1860.",
      },
      context: {
        en: "Belleville and Place de Clichy are the only two stations that touch four arrondissements. The Line 11 platforms keep their interwar honey-coloured tile frames. The station name is set in the tiles.",
        fr: "Belleville et Place de Clichy sont les deux seules stations à toucher quatre arrondissements. Les quais de la ligne 11 gardent leurs encadrements de carreaux couleur miel de l’entre-deux-guerres. Le nom de la station y est inscrit dans le carrelage.",
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
      ],
    },
    {
      id: "pyrenees",
      name: "Pyrénées",
      area: "Paris 19e / 20e",
      art: "gate",
      opened: 1935,
      etymology: {
        en: "Named for Rue des Pyrénées, which takes its name from the mountain range on the border between France and Spain.",
        fr: "La station doit son nom à la rue des Pyrénées, qui porte le nom de la chaîne de montagnes qui sépare la France de l’Espagne.",
      },
      context: {
        en: "Between Belleville and this station, 700 m apart, the line climbs at a 4% gradient under Rue de Belleville. Because the station is deep, its vault is higher and narrower than the standard, like those of Jourdain and Place des Fêtes. In April 1944 its platforms were used as an air-raid shelter.",
        fr: "Entre Belleville et la station, distantes de 700 m, la ligne monte une rampe de 4 % sous la rue de Belleville. La station étant profonde, sa voûte est plus haute et plus étroite que la normale, comme à Jourdain et à Place des Fêtes. En avril 1944, ses quais servent d’abri antiaérien.",
      },
      sources: [
        {
          label: "Pyrénées · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Pyr%C3%A9n%C3%A9es_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Rue des Pyrénées · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Rue_des_Pyr%C3%A9n%C3%A9es",
        },
        {
          label: "Ligne 11 du métro de Paris · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ligne_11_du_m%C3%A9tro_de_Paris",
        },
      ],
    },
    {
      id: "jourdain",
      name: "Jourdain",
      area: "Paris 19e / 20e",
      art: "church",
      opened: 1935,
      etymology: {
        en: "Named for Rue du Jourdain, which takes its name from the River Jordan. The street ends in front of the church of Saint-Jean-Baptiste de Belleville, dedicated to John the Baptist, who baptised Christ in the Jordan.",
        fr: "La station doit son nom à la rue du Jourdain, qui porte le nom du fleuve. La rue aboutit devant l’église Saint-Jean-Baptiste de Belleville, dédiée à Jean le Baptiste, qui baptisa le Christ dans le Jourdain.",
      },
      context: {
        en: "Jourdain and Télégraphe were difficult to build, because both lie about 20 m below ground in unstable green clay. The station opened on 28 April 1935 with the first section of the line, from Châtelet to Porte des Lilas.",
        fr: "Jourdain et Télégraphe sont difficiles à construire : toutes deux se trouvent à environ 20 m de profondeur, dans des glaises vertes instables. La station ouvre le 28 avril 1935 avec le premier tronçon de la ligne, de Châtelet à Porte des Lilas.",
      },
      sources: [
        {
          label: "Jourdain · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Jourdain_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Rue du Jourdain · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Rue_du_Jourdain",
        },
        {
          label: "Ligne 11 du métro de Paris · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ligne_11_du_m%C3%A9tro_de_Paris",
        },
      ],
    },
    {
      id: "place-des-fetes",
      name: "Place des Fêtes",
      area: "Paris 19e",
      art: "square",
      opened: 1935,
      etymology: {
        en: "Named for the square above it, where the former commune of Belleville held public festivities. Belleville bought the land in 1836 and laid out a central area for fêtes, which had earlier taken place in front of the church.",
        fr: "La station doit son nom à la place située au-dessus, où l’ancienne commune de Belleville organisait des fêtes publiques. Belleville achète le terrain en 1836 et y aménage un espace central pour les fêtes, jusque-là tenues devant l’église.",
      },
      context: {
        en: "Line 11 was first planned to follow Rue de Belleville all the way. It was bent north, under buildings for about 800 m, to connect with Line 7 (now 7 bis) here. The station’s escalators are the longest in the Métro: 256 steps for 27 m of depth.",
        fr: "La ligne 11 devait d’abord suivre toute la rue de Belleville. Elle est déviée vers le nord, sous des immeubles sur environ 800 m, pour correspondre ici avec la ligne 7 (aujourd’hui 7 bis). Les escaliers mécaniques de la station sont les plus longs du métro : 256 marches pour 27 m de profondeur.",
      },
      sources: [
        {
          label: "Place des Fêtes · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Place_des_F%C3%AAtes_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Place des Fêtes (Paris) · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Place_des_F%C3%AAtes_(Paris)",
        },
        {
          label: "Place des Fêtes station · Wikipedia",
          url: "https://en.wikipedia.org/wiki/Place_des_F%C3%AAtes_station",
        },
      ],
    },
    {
      id: "telegraphe",
      name: "Télégraphe",
      area: "Paris 19e / 20e",
      art: "towers",
      opened: 1935,
      etymology: {
        en: "Named for Rue du Télégraphe, after the optical telegraph of its inventor, Claude Chappe (1763–1805). He set it up near the top of the Belleville hill, at about 128 m, in September 1792 and again in July 1793.",
        fr: "La station doit son nom à la rue du Télégraphe, qui rappelle le télégraphe optique de son inventeur, Claude Chappe (1763–1805). Celui-ci l’installe près du sommet de la colline de Belleville, à environ 128 m, en septembre 1792 puis en juillet 1793.",
      },
      context: {
        en: "The tracks here, 96 m above sea level, are the highest point of the whole Métro, although the station is deep. Because of the unstable ground, a central wall with arches divides the station into two half-stations.",
        fr: "Les voies, à 96 m d’altitude, sont le point le plus haut de tout le métro, bien que la station soit profonde. En raison du terrain instable, un mur central percé d’arcades divise la station en deux demi-stations.",
      },
      sources: [
        {
          label: "Télégraphe · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/T%C3%A9l%C3%A9graphe_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Rue du Télégraphe · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Rue_du_T%C3%A9l%C3%A9graphe",
        },
        {
          label: "Claude Chappe · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Claude_Chappe",
        },
      ],
      people: [
        {
          name: "Claude Chappe",
          url: {
            en: "https://en.wikipedia.org/wiki/Claude_Chappe",
            fr: "https://fr.wikipedia.org/wiki/Claude_Chappe",
          },
        },
      ],
    },
    {
      id: "porte-des-lilas",
      name: "Porte des Lilas",
      area: "Paris 19e / 20e",
      art: "gate",
      opened: 1935,
      etymology: {
        en: "Named for the Porte des Lilas, a gate in the Thiers wall named after the commune of Les Lilas, to which it leads. The gate was also called Porte de Romainville.",
        fr: "La station doit son nom à la porte des Lilas, dans l’enceinte de Thiers. La porte tient son nom de la commune des Lilas, vers laquelle elle mène. Elle était aussi appelée porte de Romainville.",
      },
      context: {
        en: "From 1935 to 1937 this platform was the eastern terminus of Line 11. Here the line passes above the Line 3 bis turning loop. Three mosaics by Michel L’Huillier (late 1980s), showing Georges Brassens and lilacs, were destroyed at the end of July 2025 during waterproofing work.",
        fr: "De 1935 à 1937, ce quai est le terminus oriental de la ligne 11. Ici, la ligne passe au-dessus de la boucle de retournement de la ligne 3 bis. Trois mosaïques de Michel L’Huillier (fin des années 1980), représentant Georges Brassens et des lilas, sont détruites fin juillet 2025 lors de travaux d’étanchéité.",
      },
      sources: [
        {
          label: "Porte des Lilas · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Porte_des_Lilas_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Porte des Lilas (porte de Paris) · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Porte_des_Lilas",
        },
      ],
    },
    {
      id: "mairie-des-lilas",
      name: "Mairie des Lilas",
      area: "Les Lilas",
      art: "garden",
      opened: 1937,
      etymology: {
        en: "Named for the town hall of Les Lilas. The commune, created on 24 July 1867, takes its name mainly from the lilacs of its open-air cafés and cabarets. It also takes it from the flower gardens that covered the hill under the Second Empire.",
        fr: "La station doit son nom à la mairie des Lilas. La commune, créée le 24 juillet 1867, tient son nom surtout des lilas de ses guinguettes et cabarets. Elle le tient aussi des jardins fleuris qui couvraient la colline sous le Second Empire.",
      },
      context: {
        en: "The station opened on 17 February 1937 as the only stop of a planned extension towards Fort de Rosny, which the Second World War halted. The platforms are narrow because the street above them is narrow.",
        fr: "La station ouvre le 17 février 1937, seul arrêt d’un prolongement prévu vers le fort de Rosny, que la Seconde Guerre mondiale interrompt. Les quais sont étroits, car la rue qui les surmonte est étroite.",
      },
      sources: [
        {
          label: "Mairie des Lilas · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Mairie_des_Lilas_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Mairie des Lilas station · Wikipedia",
          url: "https://en.wikipedia.org/wiki/Mairie_des_Lilas_station",
        },
        {
          label: "Les Lilas · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Les_Lilas",
        },
        {
          label: "Ligne 11 du métro de Paris · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ligne_11_du_m%C3%A9tro_de_Paris",
        },
      ],
    },
    {
      id: "serge-gainsbourg",
      name: "Serge Gainsbourg",
      area: "Les Lilas",
      art: "piano",
      opened: 2024,
      etymology: {
        en: "Named for the singer-songwriter Serge Gainsbourg (1928–1991), who wrote “Le Poinçonneur des Lilas” (1958), about a Métro ticket puncher at Les Lilas. The mayor of Les Lilas obtained the agreement of Jane Birkin, Gainsbourg’s former partner, for this name.",
        fr: "La station porte le nom de l’auteur-compositeur-interprète Serge Gainsbourg (1928–1991), auteur du « Poinçonneur des Lilas » (1958), sur un poinçonneur de tickets du métro aux Lilas. Le maire des Lilas a obtenu pour ce nom l’accord de Jane Birkin, ancienne compagne de Gainsbourg.",
      },
      context: {
        en: "The station site was the exit shaft of the tunnel boring machine Sofia, which arrived on 16 July 2021. The station does not serve the Jardin Serge-Gainsbourg at the Porte des Lilas, 1.5 km to the west.",
        fr: "Le chantier de la station est le puits de sortie du tunnelier Sofia, arrivé le 16 juillet 2021. La station ne dessert pas le jardin Serge-Gainsbourg de la porte des Lilas, situé à 1,5 km à l’ouest.",
      },
      sources: [
        {
          label: "Serge Gainsbourg · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Serge_Gainsbourg_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Serge Gainsbourg station · Wikipedia",
          url: "https://en.wikipedia.org/wiki/Serge_Gainsbourg_station",
        },
        {
          label: "Serge Gainsbourg · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Serge_Gainsbourg",
        },
      ],
      people: [
        {
          name: "Serge Gainsbourg",
          url: {
            en: "https://en.wikipedia.org/wiki/Serge_Gainsbourg",
            fr: "https://fr.wikipedia.org/wiki/Serge_Gainsbourg",
          },
        },
      ],
    },
    {
      id: "romainville-carnot",
      name: "Romainville – Carnot",
      area: "Romainville / Noisy-le-Sec",
      art: "portrait",
      opened: 2024,
      etymology: {
        en: "Named for the town of Romainville and the nearby Place Carnot, which honours Sadi Carnot (1837–1894), President of the Republic from 1887 until his death. The project name was Place Carnot.",
        fr: "La station doit son nom à la ville de Romainville et à la place Carnot voisine. Celle-ci honore Sadi Carnot (1837–1894), président de la République de 1887 à sa mort. Son nom de projet était Place Carnot.",
      },
      context: {
        en: "At the end of the 1920s, Place Carnot, a junction of eight roads, was already proposed as the terminus of Line 11. At 26 m below ground, the platforms are the deepest on the 2024 extension.",
        fr: "Dès la fin des années 1920, la place Carnot, carrefour de huit voies, est proposée comme terminus de la ligne 11. À 26 m de profondeur, les quais sont les plus profonds du prolongement de 2024.",
      },
      sources: [
        {
          label: "Romainville – Carnot · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Romainville_-_Carnot_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Place Carnot (Romainville) · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Place_Carnot_(Romainville)",
        },
        {
          label: "Sadi Carnot (homme d’État) · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Sadi_Carnot_(homme_d'%C3%89tat)",
        },
      ],
      people: [
        {
          name: "Sadi Carnot",
          url: {
            en: "https://en.wikipedia.org/wiki/Sadi_Carnot_(statesman)",
            fr: "https://fr.wikipedia.org/wiki/Sadi_Carnot_(homme_d'%C3%89tat)",
          },
        },
      ],
    },
    {
      id: "montreuil-hopital",
      name: "Montreuil – Hôpital",
      area: "Montreuil / Noisy-le-Sec",
      art: "hospital",
      opened: 2024,
      etymology: {
        en: "Named for the town of Montreuil and the André-Grégoire intercommunal hospital, which the station serves. The hospital opened on 5 July 1965, first as a maternity unit.",
        fr: "La station doit son nom à la ville de Montreuil et au centre hospitalier intercommunal André-Grégoire, qu’elle dessert. L’hôpital ouvre le 5 juillet 1965, d’abord comme maternité.",
      },
      context: {
        en: "The station lies under Boulevard de la Boissière and partly under the hospital grounds, across the boundary between Montreuil and Noisy-le-Sec. It was built by cut and cover, in two parts.",
        fr: "La station se trouve sous le boulevard de la Boissière et en partie sous le terrain de l’hôpital, à cheval sur Montreuil et Noisy-le-Sec. Elle est construite en tranchée couverte, en deux parties.",
      },
      sources: [
        {
          label: "Montreuil – Hôpital · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Montreuil_-_H%C3%B4pital_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Centre hospitalier intercommunal André-Grégoire · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Centre_hospitalier_intercommunal_Andr%C3%A9-Gr%C3%A9goire",
        },
        {
          label: "Ligne 11 du métro de Paris · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Ligne_11_du_m%C3%A9tro_de_Paris",
        },
      ],
    },
    {
      id: "la-dhuys",
      name: "La Dhuys",
      area: "Montreuil / Rosny-sous-Bois",
      art: "river",
      opened: 2024,
      etymology: {
        en: "Named for the nearby Rue de la Dhuys, which takes its name from the Dhuis (also spelled Dhuys). The water of this small river was carried to Paris by the Dhuis aqueduct, built from 1863 to 1865.",
        fr: "La station doit son nom à la rue de la Dhuys voisine, qui tient son nom de la Dhuis (ou Dhuys). L’eau de cette petite rivière était amenée à Paris par l’aqueduc de la Dhuis, construit de 1863 à 1865.",
      },
      context: {
        en: "The station’s project name was La Boissière. After the public inquiry, it was built underground from a circular shaft, not in open cut, to protect the neighbouring houses. RATP built 19 social housing units above one exit.",
        fr: "Le nom de projet de la station était La Boissière. Après l’enquête publique, elle est construite en souterrain à partir d’un puits circulaire, et non à ciel ouvert, pour protéger les maisons voisines. La RATP a construit 19 logements sociaux au-dessus d’un accès.",
      },
      sources: [
        {
          label: "La Dhuys · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/La_Dhuys_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Aqueduc de la Dhuis · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Aqueduc_de_la_Dhuis",
        },
        {
          label: "Dhuis (rivière) · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Dhuis_(rivi%C3%A8re)",
        },
      ],
    },
    {
      id: "coteaux-beauclair",
      name: "Coteaux Beauclair",
      area: "Rosny-sous-Bois / Noisy-le-Sec",
      art: "modern",
      opened: 2024,
      etymology: {
        en: "Coteaux Beauclair shares its name with the development zone in Rosny-sous-Bois, beside the station. Its developer says the zone was created in December 2015 by merging two earlier zones, because of the new metro station.",
        fr: "La station porte le même nom que la zone d’aménagement concerté des Coteaux Beauclair, à Rosny-sous-Bois, qu’elle jouxte. Selon son aménageur, cette zone est créée en décembre 2015 par la fusion de deux zones, en raison de la nouvelle station de métro.",
      },
      context: {
        en: "Coteaux Beauclair, on a 580 m viaduct, is the only elevated station on the line. It is the first viaduct station built on the Métro since 1905. Marc Mimram designed the viaduct and the station. Its platforms, 8 m above the ground, are covered by a glass roof.",
        fr: "Coteaux Beauclair, sur un viaduc de 580 m, est la seule station aérienne de la ligne. C’est la première station sur viaduc construite dans le métro depuis 1905. Marc Mimram a conçu le viaduc et la station. Ses quais, à 8 m de hauteur, sont couverts par une verrière.",
      },
      sources: [
        {
          label: "Coteaux Beauclair · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Coteaux_Beauclair_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Coteaux Beauclair station · Wikipedia",
          url: "https://en.wikipedia.org/wiki/Coteaux_Beauclair_station",
        },
        {
          label: "Viaduc de Coteaux Beauclair · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Viaduc_de_Coteaux_Beauclair",
        },
        {
          label: "Paredev · ZAC Coteaux Beauclair",
          url: "https://www.paredev.fr/projets/coteaux-beauclair",
        },
      ],
    },
    {
      id: "rosny-bois-perrier",
      name: "Rosny – Bois-Perrier",
      area: "Rosny-sous-Bois",
      art: "station",
      opened: 2024,
      etymology: {
        en: "Named, like the RER E station beside it, for the town of Rosny-sous-Bois and its Bois-Perrier district. The railway station opened in 1971 to serve the district’s new housing estates and the Rosny 2 shopping centre, opened in 1973.",
        fr: "La station doit son nom, comme la gare du RER E voisine, à la ville de Rosny-sous-Bois et à son quartier du Bois-Perrier. La gare ouvre en 1971 pour desservir les nouveaux grands ensembles du quartier et le centre commercial Rosny 2, ouvert en 1973.",
      },
      context: {
        en: "Rosny – Bois-Perrier has been the eastern terminus of the line since 13 June 2024 and is the easternmost station of the Métro. Line 15 is planned to serve it from 2031, linked to Line 11 by a 35 m tunnel under the RER tracks.",
        fr: "Rosny – Bois-Perrier est le terminus est de la ligne depuis le 13 juin 2024 et la station la plus orientale du métro. La ligne 15 doit la desservir à partir de 2031, reliée à la ligne 11 par un tunnel de 35 m sous les voies du RER.",
      },
      sources: [
        {
          label: "Rosny – Bois-Perrier · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Rosny-Bois-Perrier_(m%C3%A9tro_de_Paris)",
        },
        {
          label: "Gare de Rosny-Bois-Perrier · Wikipédia",
          url: "https://fr.wikipedia.org/wiki/Gare_de_Rosny-Bois-Perrier",
        },
        {
          label: "Rosny–Bois-Perrier station · Wikipedia",
          url: "https://en.wikipedia.org/wiki/Rosny%E2%80%93Bois-Perrier_station",
        },
        {
          label: "Ligne 15 Est · Grand Paris Express",
          url: "https://www.grandparisexpress.fr/ligne-15-est",
        },
      ],
    },
  ],
  paths: [
    [
      "chatelet",
      "hotel-de-ville",
      "rambuteau",
      "arts-et-metiers",
      "republique",
      "goncourt",
      "belleville",
      "pyrenees",
      "jourdain",
      "place-des-fetes",
      "telegraphe",
      "porte-des-lilas",
      "mairie-des-lilas",
      "serge-gainsbourg",
      "romainville-carnot",
      "montreuil-hopital",
      "la-dhuys",
      "coteaux-beauclair",
      "rosny-bois-perrier",
    ],
  ],
  featured: [
    "arts-et-metiers",
    "telegraphe",
    "coteaux-beauclair",
  ],
  image: "/illustrations/line-11.webp",
  imageAlt: {
    en: "Engraved-style illustration of a Chappe optical telegraph, with its pivoting signal arms on a mast above a small stone tower.",
    fr: "Illustration de style gravure d’un télégraphe optique Chappe, avec ses bras articulés sur un mât au-dessus d’une petite tour de pierre.",
  },
  sources: [
    {
      label: "Ligne 11 du métro de Paris · Wikipédia",
      url: "https://fr.wikipedia.org/wiki/Ligne_11_du_m%C3%A9tro_de_Paris",
    },
    {
      label: "Paris Metro Line 11 · Wikipedia",
      url: "https://en.wikipedia.org/wiki/Paris_Metro_Line_11",
    },
    {
      label: "Île-de-France Mobilités · arrêts-lignes",
      url: "https://data.iledefrance-mobilites.fr/explore/dataset/arrets-lignes/",
    },
  ],
};

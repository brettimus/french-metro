import type { Art, MetroLine, Source, Station } from "./types";

// Name origins, source limits and route audit: docs/research/line4.md.
const wiki = (title: string) =>
  `https://fr.wikipedia.org/wiki/${encodeURIComponent(title.replaceAll(" ", "_"))}`;
const source = (label: string, url: string): Source => ({ label, url });
const bio = (name: string, en: string, fr = name) => ({
  name,
  url: {
    en: `https://en.wikipedia.org/wiki/${encodeURIComponent(en.replaceAll(" ", "_"))}`,
    fr: wiki(fr),
  },
});
function stop(
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
    etymology: { en, fr },
    context: { en: contextEn, fr: contextFr },
    sources: [
      source(
        `${name} · Wikipédia`,
        wiki(
          `${name.replaceAll(" – ", " - ").replaceAll("’", "'")} (métro de Paris)`,
        ),
      ),
    ],
    ...extra,
  };
}
const stations: Station[] = [
  stop(
    "porte-de-clignancourt",
    "Porte de Clignancourt",
    "Paris 18e",
    "gate",
    "Called Porte de Clignancourt after a gate in the former fortifications of Paris. The gate took the name of Clignancourt, a hamlet that belonged to the abbey of Saint-Denis.",
    "La station porte le nom d’une ancienne porte des fortifications de Paris. Celle-ci reprenait le nom de Clignancourt, un hameau qui appartenait à l’abbaye de Saint-Denis.",
    "The hamlet became part of Paris in 1860. The station’s additional name, Puces de Saint-Ouen, points to the flea market just outside Paris, in Saint-Ouen.",
    "Le hameau est intégré à Paris en 1860. Le complément Puces de Saint-Ouen désigne le marché aux puces situé juste au-delà de la limite de Paris, à Saint-Ouen.",
    {
      sources: [
        source(
          "Porte de Clignancourt · Wikipédia",
          wiki("Porte de Clignancourt (métro de Paris)"),
        ),
        source(
          "Quartier de Clignancourt · Wikipédia",
          wiki("Quartier de Clignancourt"),
        ),
        source(
          "Marché aux puces de Saint-Ouen · Wikipédia",
          wiki("Marché aux puces de Saint-Ouen"),
        ),
      ],
    },
  ),
  stop(
    "simplon",
    "Simplon",
    "Paris 18e",
    "gate",
    "Called Simplon after nearby Rue du Simplon, which takes its name from the Alpine pass linking the Swiss canton of Valais with northern Italy.",
    "La station porte le nom de la rue du Simplon, qui rappelle le col alpin reliant la Suisse à l’Italie.",
    "Napoleon had a road built across the Simplon Pass in 1807, and a railway tunnel beneath it opened in 1906. On the night of 20 to 21 April 1944, an Allied air raid on the La Chapelle depot hit the station. Its vault fell onto the track and platforms.",
    "Napoléon fait construire une route par le col du Simplon en 1807, et un tunnel ferroviaire le traverse depuis 1906. Dans la nuit du 20 au 21 avril 1944, un bombardement allié visant le dépôt de La Chapelle touche la station. Sa voûte s’effondre sur la voie et les quais.",
  ),
  stop(
    "marcadet-poissonniers",
    "Marcadet – Poissonniers",
    "Paris 18e",
    "market",
    "Called Marcadet – Poissonniers after two nearby streets. Marcadet recalls an old market site; Poissonniers recalls the traders who carried fish from the northern coast to the markets of Paris.",
    "La station réunit les noms de deux rues voisines. Marcadet rappelle un ancien lieu de marché ; Poissonniers évoque les marchands qui acheminaient le poisson des côtes du nord vers les halles de Paris.",
    "Marcadet and Poissonniers began as separate stations run by rival companies. An underground passage joined them in 1931, and their names were joined too.",
    "Marcadet et Poissonniers étaient deux stations distinctes, exploitées par des compagnies concurrentes. Un couloir les relie en 1931 : leurs deux noms sont alors réunis.",
  ),
  stop(
    "chateau-rouge",
    "Château Rouge",
    "Paris 18e",
    "square",
    "Called Château Rouge after the square above the station. Its name recalls a small country house once known as the Château Rouge, which disappeared in 1889.",
    "La station porte le nom de la place du Château-Rouge, située au-dessus des quais. Ce nom rappelle une petite demeure autrefois appelée Château Rouge, disparue en 1889.",
    "Works from July 2014 to July 2017 enlarged the ticket hall and added a third entrance, on Rue Custine. The Château Rouge house itself was probably built in the late eighteenth century.",
    "De juillet 2014 à juillet 2017, des travaux agrandissent la salle d’échanges et ajoutent un troisième accès, rue Custine. La demeure du Château Rouge a probablement été construite à la fin du XVIIIe siècle.",
  ),
  stop(
    "barbes-rochechouart",
    "Barbès – Rochechouart",
    "Paris 9e / 10e / 18e",
    "portrait",
    "Called Barbès – Rochechouart after the adjoining boulevards. They honour republican politician Armand Barbès and Marguerite de Rochechouart, who led the abbey of Montmartre in the early eighteenth century.",
    "La station reprend les noms des boulevards voisins. Ils rendent hommage au républicain Armand Barbès et à Marguerite de Rochechouart, abbesse de Montmartre au début du XVIIIe siècle.",
    "The station was first called Boulevard Barbès. Rochechouart was added in 1907, bringing a woman’s name onto the Métro map through the boulevard named after her.",
    "La station s’appelait d’abord Boulevard Barbès. Rochechouart est ajouté en 1907, faisant entrer un nom de femme sur le plan du métro par l’intermédiaire du boulevard.",
    {
      sources: [
        source(
          "Barbès – Rochechouart · Wikipédia",
          wiki("Barbès - Rochechouart (métro de Paris)"),
        ),
        source(
          "Marguerite de Rochechouart · Wikipédia",
          wiki("Marguerite de Rochechouart"),
        ),
        source(
          "Boulevard Marguerite-de-Rochechouart · Wikipédia",
          wiki("Boulevard Marguerite-de-Rochechouart"),
        ),
      ],
      people: [bio("Armand Barbès", "Armand Barbès")],
    },
  ),
  stop(
    "gare-du-nord",
    "Gare du Nord",
    "Paris 10e",
    "station",
    "Called Gare du Nord because it serves the railway terminus for northern France. The railway station also recalls its original operator, the Compagnie des chemins de fer du Nord.",
    "La station porte le nom de la gare ferroviaire qu’elle dessert, tournée vers le nord de la France. Cette gare rappelle aussi son exploitant d’origine, la Compagnie des chemins de fer du Nord.",
    "Line 5 reached the railway terminus before Line 4. Its original loop station later became a training centre when a new through station replaced it in 1942.",
    "La ligne 5 atteint la gare avant la ligne 4. Son ancien terminus en boucle devient un centre de formation après son remplacement par une station de passage en 1942.",
  ),
  stop(
    "gare-de-lest",
    "Gare de l’Est",
    "Paris 10e",
    "station",
    "Called Gare de l’Est because it serves the railway terminus for eastern France. The railway station adopted this name in 1854 as its network expanded beyond Strasbourg.",
    "La station porte le nom de la gare de l’Est, qu’elle dessert, terminus ferroviaire vers l’est de la France. La gare ferroviaire adopte ce nom en 1854, lorsque son réseau s’étend au-delà de Strasbourg.",
    "The railway station began as the Embarcadère de Strasbourg. Its later name followed the Compagnie des chemins de fer de l’Est, which operated the growing network.",
    "La gare ferroviaire s’appelait d’abord Embarcadère de Strasbourg. Son nouveau nom reprend celui de la Compagnie des chemins de fer de l’Est, qui exploite le réseau en expansion.",
    {
      sources: [
        source(
          "Gare de l’Est · Wikipédia",
          wiki("Gare de l'Est (métro de Paris)"),
        ),
        source(
          "Transilien · Histoire de la gare",
          "https://malignep.transilien.com/2021/05/04/si-la-gare-de-lest-vous-etait-contee/",
        ),
      ],
    },
  ),
  stop(
    "chateau-deau",
    "Château d’Eau",
    "Paris 10e",
    "square",
    "Called Château d’Eau after the nearby street, which recalls a fountain on today’s Place de la République. Designed by Pierre-Simon Girard, the fountain supplied water and gave the old square its name.",
    "La station porte le nom de la rue du Château-d’Eau. Celle-ci rappelle une fontaine de Pierre-Simon Girard, installée sur l’actuelle place de la République, qui distribuait l’eau et avait donné son nom à la place.",
    "Girard’s fountain was moved to La Villette when the square was rebuilt. A picture of the old fountain inside the station preserves the connection.",
    "La fontaine de Girard est déplacée à La Villette lors du réaménagement de la place. Une représentation de l’ancienne fontaine dans la station rappelle cette origine.",
    {
      sources: [
        source(
          "Château d’Eau · Wikipédia",
          wiki("Château d'Eau (métro de Paris)"),
        ),
        source(
          "Fontaine du Château-d’Eau · Wikipédia",
          wiki("Fontaine du Château d'eau (Pierre-Simon Girard)"),
        ),
        source(
          "Place de la République · Wikipédia",
          wiki("Place de la République (Paris)"),
        ),
      ],
    },
  ),
  stop(
    "strasbourg-saint-denis",
    "Strasbourg – Saint-Denis",
    "Paris 2e / 3e / 10e",
    "gate",
    "Called Strasbourg – Saint-Denis after the boulevards at this junction. Strasbourg recalls the destination of the railway nearby; Saint-Denis recalls the old road to the town named after the first bishop of Paris.",
    "La station réunit les noms des boulevards du carrefour. Strasbourg rappelle la destination du chemin de fer voisin ; Saint-Denis, l’ancienne route vers la ville portant le nom du premier évêque de Paris.",
    "The station first used the shorter name Boulevard Saint-Denis. Strasbourg was added in 1931, when the arrival of Line 8 made this a connecting station.",
    "La station s’appelait d’abord Boulevard Saint-Denis. Strasbourg est ajouté en 1931, lorsque l’arrivée de la ligne 8 transforme cet arrêt en station de correspondance.",
    {
      sources: [
        source(
          "Strasbourg – Saint-Denis · Wikipédia",
          wiki("Strasbourg - Saint-Denis (métro de Paris)"),
        ),
        source(
          "Boulevard de Strasbourg · Wikipédia",
          wiki("Boulevard de Strasbourg (Paris)"),
        ),
      ],
    },
  ),
  stop(
    "reaumur-sebastopol",
    "Réaumur – Sébastopol",
    "Paris 2e / 3e",
    "portrait",
    "Called Réaumur – Sébastopol after the intersecting street and boulevard. Réaumur honours the physicist and naturalist René-Antoine Ferchault de Réaumur; Sébastopol recalls the capture of the Crimean port in 1855.",
    "La station porte les noms de la rue et du boulevard qui se croisent ici. Réaumur honore le physicien et naturaliste René-Antoine Ferchault de Réaumur ; Sébastopol rappelle la prise du port de Crimée en 1855.",
    "The station opened as Rue Saint-Denis on Line 3. It received its present name in 1907, ahead of the arrival of Line 4 the following year.",
    "La station ouvre sous le nom de Rue Saint-Denis sur la ligne 3. Elle reçoit son nom actuel en 1907, avant l’arrivée de la ligne 4 l’année suivante.",
    {
      people: [
        bio(
          "René-Antoine Ferchault de Réaumur",
          "René Antoine Ferchault de Réaumur",
          "René-Antoine Ferchault de Réaumur",
        ),
      ],
    },
  ),
  stop(
    "etienne-marcel",
    "Étienne Marcel",
    "Paris 1er / 2e",
    "portrait",
    "Called Étienne Marcel after the nearby street honouring a fourteenth-century provost of the merchants of Paris. Marcel took this office in 1354; it gave him jurisdiction over river trade in Paris.",
    "La station porte le nom de la rue Étienne-Marcel, dédiée à un prévôt des marchands de Paris du XIVe siècle. Marcel devient prévôt en 1354 ; cette charge lui donne autorité sur le commerce fluvial parisien.",
    "At the Estates General of 1355, Marcel was a leading representative of the towns. In 1357 he backed the Grande Ordonnance, which placed royal finances under the oversight of the Estates. He was killed in Paris in 1358.",
    "Aux États généraux de 1355, Marcel est l’un des principaux représentants des villes. En 1357, il soutient la Grande Ordonnance, qui place les finances royales sous le contrôle des états. Il est tué à Paris en 1358.",
    {
      sources: [
        source(
          "Étienne Marcel · Wikipédia",
          wiki("Étienne Marcel (métro de Paris)"),
        ),
        source("Étienne Marcel · Biographie", wiki("Étienne Marcel")),
      ],
      people: [bio("Étienne Marcel", "Étienne Marcel")],
    },
  ),
  stop(
    "les-halles",
    "Les Halles",
    "Paris 1er",
    "market",
    "Called Les Halles after the wholesale food market that once occupied this part of central Paris. Its covered halls supplied the city and gave the neighbourhood its name.",
    "La station porte le nom des halles, l’ancien marché alimentaire de gros du centre de Paris. Ses halles couvertes approvisionnaient la capitale et ont donné leur nom au quartier.",
    "The food market began moving to Rungis in 1969. In 1977, the Métro station moved slightly east to connect more directly with the new RER station.",
    "Le transfert du marché alimentaire vers Rungis commence en 1969. En 1977, la station de métro est déplacée vers l’est pour faciliter la correspondance avec la nouvelle gare du RER.",
    {
      sources: [
        source("Les Halles · Wikipédia", wiki("Les Halles (métro de Paris)")),
        source(
          "Archives de Paris · Les Halles",
          "https://archives.paris.fr/archives-numerisees/photographies/le-quartier-des-halles",
        ),
        source("Halles de Paris · Wikipédia", wiki("Halles de Paris")),
      ],
    },
  ),
  stop(
    "chatelet",
    "Châtelet",
    "Paris 1er / 4e",
    "gate",
    "Called Châtelet after Place du Châtelet, laid out on the site of the Grand Châtelet. This fortress was a court and prison before its demolition in the early nineteenth century.",
    "La station doit son nom à la place du Châtelet, aménagée à l’emplacement du Grand Châtelet. Cette forteresse était un tribunal et une prison avant sa démolition au début du XIXe siècle.",
    "The Grand Châtelet guarded the northern approach to the Pont au Change. Its demolition began in 1802.",
    "Le Grand Châtelet gardait l’accès nord du pont au Change. Sa démolition commence en 1802.",
    {
      sources: [
        source("Châtelet · Wikipédia", wiki("Châtelet (métro de Paris)")),
        source(
          "Paris · Le Grand Châtelet",
          "https://parcoursrevolution.paris.fr/fr/points-interet/54-le-grand-chatelet-geole-de-l-ancien-regime",
        ),
        source("Grand Châtelet · Wikipédia", wiki("Grand Châtelet")),
      ],
    },
  ),
  stop(
    "cite",
    "Cité",
    "Paris 4e",
    "river",
    "Called Cité because it lies beneath the Île de la Cité. The island’s name recalls the fortified city of late antiquity, which formed a core of medieval Paris.",
    "La station s’appelle Cité parce qu’elle se trouve sous l’île de la Cité. Le nom de l’île rappelle la ville fortifiée de l’Antiquité tardive, devenue un noyau du Paris médiéval.",
    "Cité is the only Métro station beneath an island. Line 4 crosses both arms of the Seine here, with Châtelet on one bank and Saint-Michel on the other.",
    "Cité est la seule station du métro située sous une île. La ligne 4 traverse ici les deux bras de la Seine, entre Châtelet sur une rive et Saint-Michel sur l’autre.",
  ),
  stop(
    "saint-michel",
    "Saint-Michel",
    "Paris 5e / 6e",
    "square",
    "Called Saint-Michel after the square above the station. The square takes its name from the nearby bridge, which recalls a former palace chapel dedicated to the archangel Michael.",
    "La station porte le nom de la place Saint-Michel, située au-dessus des quais. La place reprend celui du pont voisin, qui rappelle une ancienne chapelle du palais dédiée à l’archange Michel.",
    "The station was built in steel caissons sunk into the ground beside the Seine. This construction formed part of Line 4’s difficult river crossing.",
    "La station a été construite dans des caissons en acier enfoncés dans le sol, près de la Seine. Cet ouvrage faisait partie de la difficile traversée du fleuve par la ligne 4.",
    {
      sources: [
        source(
          "Saint-Michel · Wikipédia",
          wiki("Saint-Michel (métro de Paris)"),
        ),
        source(
          "Place Saint-Michel · Wikipédia",
          wiki("Place Saint-Michel (Paris)"),
        ),
      ],
    },
  ),
  stop(
    "odeon",
    "Odéon",
    "Paris 6e",
    "square",
    "Called Odéon after the nearby crossroads and theatre. The theatre’s name refers to the odeons of ancient Greece, buildings used for musical performances and recitations.",
    "La station porte le nom du carrefour et du théâtre voisins. Le mot odéon vient des édifices de la Grèce antique consacrés aux spectacles musicaux et aux récitations.",
    "The Odéon theatre opened in 1782. Charles de Wailly and Marie-Joseph Peyre designed the neoclassical building, with its portico of eight Doric columns.",
    "Le théâtre de l’Odéon ouvre en 1782. Charles de Wailly et Marie-Joseph Peyre ont conçu ce bâtiment néoclassique, précédé d’un portique de huit colonnes doriques.",
    {
      sources: [
        source("Odéon · Wikipédia", wiki("Odéon (métro de Paris)")),
        source(
          "Odéon · Histoire du théâtre",
          "https://www.theatre-odeon.eu/fr/lodeon",
        ),
        source(
          "Paris Promeneurs · Le théâtre de l’Odéon",
          "https://paris-promeneurs.com/le-theatre-de-l-odeon/",
        ),
        source("Odéon (édifice) · Wikipédia", wiki("Odéon (édifice)")),
      ],
    },
  ),
  stop(
    "saint-germain-des-pres",
    "Saint-Germain-des-Prés",
    "Paris 6e",
    "church",
    "Called Saint-Germain-des-Prés after the church and square nearby. Germain was a sixth-century bishop of Paris; des prés recalls the meadows that once surrounded the abbey.",
    "La station porte le nom de l’église et de la place voisines. Germain était évêque de Paris au VIe siècle ; « des Prés » rappelle les prairies qui entouraient autrefois l’abbaye.",
    "The abbey began under the names Sainte-Croix and Saint-Vincent. Germain’s burial there in 576 helped make it a pilgrimage site, and his name gradually replaced the earlier dedication.",
    "L’abbaye est d’abord dédiée à Sainte-Croix et à Saint-Vincent. La sépulture de Germain, en 576, contribue à en faire un lieu de pèlerinage ; son nom remplace progressivement la dédicace initiale.",
    {
      sources: [
        source(
          "Saint-Germain-des-Prés · Wikipédia",
          wiki("Saint-Germain-des-Prés (métro de Paris)"),
        ),
        source(
          "Mairie du 6e · Origines de l’abbaye",
          "https://mairie06.paris.fr/pages/des-origines-au-xiie-siecle-9592",
        ),
      ],
      people: [bio("Germain de Paris", "Germain of Paris")],
    },
  ),
  stop(
    "saint-sulpice",
    "Saint-Sulpice",
    "Paris 6e",
    "church",
    "Called Saint-Sulpice after the nearby street and church. The church is dedicated to Sulpice the Pious, a seventh-century bishop of Bourges and chaplain to the Merovingian king Clotaire II.",
    "La station porte le nom de la rue et de l’église Saint-Sulpice. L’église est dédiée à Sulpice le Pieux, évêque de Bourges au VIIe siècle et aumônier du roi mérovingien Clotaire II.",
    "Construction of the present Saint-Sulpice church began in 1646. It replaced a medieval building that had become too small. Several architects worked on it in turn, in stages, for more than a century.",
    "La construction de l’église Saint-Sulpice actuelle commence en 1646. Elle remplace un édifice médiéval devenu trop petit. Plusieurs architectes se succèdent sur ce chantier, mené par étapes pendant plus d’un siècle.",
    {
      sources: [
        source(
          "Saint-Sulpice · Wikipédia",
          wiki("Saint-Sulpice (métro de Paris)"),
        ),
        source(
          "Église Saint-Sulpice · Wikipédia",
          wiki("Église Saint-Sulpice de Paris"),
        ),
      ],
      people: [bio("Sulpice le Pieux", "Sulpitius the Pious")],
    },
  ),
  stop(
    "saint-placide",
    "Saint-Placide",
    "Paris 6e",
    "church",
    "Called Saint-Placide after the nearby street dedicated to Placide, a disciple of Saint Benedict. The station adopted the street’s name in 1913 to avoid confusion with another stop.",
    "La station porte le nom de la rue Saint-Placide, dédiée à un disciple de saint Benoît. Elle adopte ce nom en 1913 pour éviter une confusion avec un autre arrêt.",
    "Opened in 1910, the station was first called Vaugirard, after Rue de Vaugirard. Another Vaugirard station opened on what is now Line 12, so this stop needed a different name.",
    "Ouverte en 1910, la station s’appelait d’abord Vaugirard, comme la rue voisine. L’ouverture d’une autre station Vaugirard, sur l’actuelle ligne 12, impose ensuite un nom différent.",
  ),
  stop(
    "montparnasse-bienvenue",
    "Montparnasse – Bienvenüe",
    "Paris 6e / 14e / 15e",
    "station",
    "Called Montparnasse – Bienvenüe after the railway district and Métro engineer Fulgence Bienvenüe. Montparnasse began as a students’ joke: they gave the name of Mount Parnassus, the Greek mountain associated with poetry, to a local heap of rubble.",
    "La station associe le nom du quartier de la gare à celui de l’ingénieur Fulgence Bienvenüe. Montparnasse vient d’une plaisanterie d’étudiants, qui avaient donné à une butte de gravats le nom du mont Parnasse, montagne grecque associée à la poésie.",
    "The present station joins two formerly separate stops, Montparnasse and Bienvenüe. Their names were combined in 1942.",
    "La station actuelle réunit deux arrêts autrefois distincts, Montparnasse et Bienvenüe. Leurs noms sont associés en 1942.",
    {
      sources: [
        source(
          "RATP · Montparnasse-Bienvenüe",
          "https://www.ratp.fr/decouvrir/patrimoine/histoire-station-montparnasse-bienvenue",
        ),
        source(
          "Quartier du Montparnasse · Wikipédia",
          wiki("Quartier du Montparnasse"),
        ),
        source(
          "Montparnasse · Wikipedia",
          "https://en.wikipedia.org/wiki/Montparnasse",
        ),
      ],
      people: [bio("Fulgence Bienvenüe", "Fulgence Bienvenüe")],
    },
  ),
  stop(
    "vavin",
    "Vavin",
    "Paris 6e / 14e",
    "portrait",
    "Called Vavin after nearby Rue Vavin, named for Alexis Vavin. A Paris notary who entered politics, he was elected to represent Paris in the Chamber of Deputies in 1839.",
    "La station porte le nom de la rue Vavin, dédiée à Alexis Vavin. Ce notaire parisien devenu homme politique est élu député de Paris en 1839.",
    "Alexis Vavin continued to serve as a representative during the Second Republic, after the revolution of 1848. The station opened on 9 January 1910. From 24 January, during the Seine flood, it served as the terminus for trains from Porte d’Orléans.",
    "Après la révolution de 1848, Alexis Vavin siège encore comme représentant sous la Deuxième République. La station ouvre le 9 janvier 1910. À partir du 24 janvier, pendant la crue de la Seine, elle sert de terminus aux trains venant de Porte d’Orléans.",
    {
      sources: [
        source("Vavin · Wikipédia", wiki("Vavin (métro de Paris)")),
        source(
          "Assemblée nationale · Alexis Vavin",
          "https://www2.assemblee-nationale.fr/sycomore/fiche/11095",
        ),
      ],
      people: [
        {
          name: "Alexis Vavin",
          url: {
            en: "https://www2.assemblee-nationale.fr/sycomore/fiche/11095",
            fr: "https://www2.assemblee-nationale.fr/sycomore/fiche/11095",
          },
        },
      ],
    },
  ),
  stop(
    "raspail",
    "Raspail",
    "Paris 14e",
    "portrait",
    "Called Raspail after the boulevard above the station. It honours François-Vincent Raspail, a nineteenth-century scientist and republican politician whose work combined research with campaigns for social change.",
    "La station porte le nom du boulevard Raspail. Celui-ci honore François-Vincent Raspail, savant et homme politique républicain du XIXe siècle, engagé à la fois dans la recherche et dans les luttes sociales.",
    "The Line 4 and Line 6 platforms run parallel, on the same level. In February 1848, François-Vincent Raspail led a delegation to Paris City Hall to demand an immediate proclamation of the Republic from the provisional government.",
    "Les quais des lignes 4 et 6 sont parallèles et situés au même niveau. En février 1848, François-Vincent Raspail conduit une délégation à l’Hôtel de Ville de Paris pour exiger du gouvernement provisoire la proclamation immédiate de la République.",
    {
      sources: [
        source("Raspail · Wikipédia", wiki("Raspail (métro de Paris)")),
        source(
          "Assemblée nationale · Février 1848",
          "https://www.assemblee-nationale.fr/dyn/histoire-et-patrimoine/monarchie-de-juillet/revolution-de-fevrier",
        ),
      ],
      people: [bio("François-Vincent Raspail", "François-Vincent Raspail")],
    },
  ),
  stop(
    "denfert-rochereau",
    "Denfert-Rochereau",
    "Paris 14e",
    "portrait",
    "Called Denfert-Rochereau after the square honouring Colonel Pierre Philippe Denfert-Rochereau. He commanded the defence of Belfort during the Franco-Prussian War of 1870 and 1871.",
    "La station porte le nom de la place dédiée au colonel Pierre Philippe Denfert-Rochereau. Il commande la défense de Belfort pendant la guerre franco-prussienne de 1870 et 1871.",
    "The square was formerly called Place d’Enfer. Its bronze lion is a smaller version of Bartholdi’s Lion of Belfort, linking the Paris square to the defended city.",
    "La place s’appelait auparavant place d’Enfer. Son lion de bronze est une version réduite du Lion de Belfort de Bartholdi, qui relie la place parisienne à la ville défendue.",
    {
      sources: [
        source(
          "Denfert-Rochereau · Wikipédia",
          wiki("Denfert-Rochereau (métro de Paris)"),
        ),
        source(
          "Paris · La place Denfert-Rochereau",
          "https://www.paris.fr/pages/1-lieu-3-histoires-la-place-denfert-rochereau-33149",
        ),
      ],
      people: [
        bio(
          "Pierre Philippe Denfert-Rochereau",
          "Pierre Philippe Denfert-Rochereau",
          "Pierre Philippe Denfert-Rochereau",
        ),
      ],
    },
  ),
  stop(
    "mouton-duvernet",
    "Mouton-Duvernet",
    "Paris 14e",
    "portrait",
    "Called Mouton-Duvernet after the nearby street honouring General Régis Barthélemy Mouton-Duvernet. He served during the French Revolution and Napoleon’s empire, and was executed in Lyon in 1816.",
    "La station porte le nom de la rue dédiée au général Régis Barthélemy Mouton-Duvernet. Ce militaire sert sous la Révolution et l’Empire. Il est fusillé à Lyon en 1816.",
    "This station gave its name to the “Mouton style” of orange tiles, first installed here early in 1969. Twenty other stations were then decorated on this model. The station lost its orange tiles on 13 March 2007.",
    "Cette station a donné son nom au « style Mouton », un carrelage orange posé ici pour la première fois début 1969. Vingt autres stations sont ensuite décorées sur ce modèle. La station perd son carrelage orange le 13 mars 2007.",
    {
      sources: [
        source(
          "Mouton-Duvernet · Wikipédia",
          wiki("Mouton-Duvernet (métro de Paris)"),
        ),
        source(
          "BnF · Mouton-Duvernet",
          "https://catalogue.bnf.fr/ark:/12148/cb14637636q",
        ),
      ],
      people: [
        bio(
          "Régis Barthélemy Mouton-Duvernet",
          "Régis Barthélemy Mouton-Duvernet",
        ),
      ],
    },
  ),
  stop(
    "alesia",
    "Alésia",
    "Paris 14e",
    "gate",
    "Called Alésia after Rue d’Alésia, named for the Gallic stronghold where Julius Caesar defeated Vercingetorix in 52 BC. The battle took place in Burgundy.",
    "La station porte le nom de la rue d’Alésia, qui rappelle la place forte gauloise où Jules César vainquit Vercingétorix en 52 avant notre ère. La bataille se déroula en Bourgogne.",
    "Archaeological remains of the siege lie at Alise-Sainte-Reine. Roman fortifications enclosed the Gallic forces, and a second line of defences faced the army coming to relieve them.",
    "Les vestiges archéologiques du siège se trouvent à Alise-Sainte-Reine. Les fortifications romaines encerclaient les Gaulois, et une seconde ligne de défense faisait face à l’armée venue les secourir.",
    {
      sources: [
        source("Alésia · Wikipédia", wiki("Alésia (métro de Paris)")),
        source(
          "MuséoParc Alésia · Histoire du site",
          "https://alesia.com/histoire-du-site/",
        ),
      ],
      people: [bio("Vercingétorix", "Vercingetorix")],
    },
  ),
  stop(
    "porte-dorleans",
    "Porte d’Orléans",
    "Paris 14e",
    "gate",
    "Called Porte d’Orléans after the former city gate on the road to Orléans. The gate stood in the southern fortifications of Paris.",
    "La station porte le nom d’une ancienne porte des fortifications, au sud de Paris. Cette porte s’ouvrait sur la route d’Orléans.",
    "This was Line 4’s southern terminus for more than a century. The extension to Mairie de Montrouge in 2013 finally carried the line beyond the city boundary.",
    "Cet arrêt a été le terminus sud de la ligne 4 pendant plus d’un siècle. Le prolongement à Mairie de Montrouge, en 2013, a permis à la ligne de franchir la limite de Paris.",
    {
      sources: [
        source(
          "Porte d’Orléans · Wikipédia",
          wiki("Porte d'Orléans (métro de Paris)"),
        ),
        source(
          "Paris · Les portes de la ville",
          "https://www.paris.fr/pages/de-porte-en-porte-paris-se-raconte-16658",
        ),
        source(
          "Porte d’Orléans (porte de Paris) · Wikipédia",
          wiki("Porte d'Orléans"),
        ),
      ],
    },
  ),
  stop(
    "mairie-de-montrouge",
    "Mairie de Montrouge",
    "Montrouge",
    "square",
    "Called Mairie de Montrouge because it serves the town hall of Montrouge. Mairie means town hall. The origin of the name Montrouge is debated. The town gives two explanations: reddish soil on the plateau, or a local lord nicknamed Le Rouge.",
    "La station porte le nom de la mairie de Montrouge, qu’elle dessert. L’origine du nom Montrouge est discutée. La commune avance deux explications : la terre rougeâtre du plateau, ou un seigneur local surnommé « le Rouge ».",
    "The station opened on 23 March 2013 as the first stage of the extension of Line 4 to Bagneux. On 13 January 2022, the line was extended beyond it to Barbara and Bagneux – Lucie Aubrac.",
    "La station ouvre le 23 mars 2013, première étape du prolongement de la ligne 4 vers Bagneux. Le 13 janvier 2022, la ligne est prolongée au-delà, jusqu’à Barbara et Bagneux – Lucie Aubrac.",
    {
      sources: [
        source(
          "Mairie de Montrouge · Wikipédia",
          wiki("Mairie de Montrouge (métro de Paris)"),
        ),
        source(
          "Montrouge · Histoire de la ville",
          "https://www.ville-montrouge.fr/920-l-histoire-de-montrouge.htm",
        ),
      ],
    },
  ),
  stop(
    "barbara",
    "Barbara",
    "Montrouge / Bagneux",
    "piano",
    "Called Barbara after the French singer and songwriter. She is buried in the Parisian cemetery of Bagneux, which is reached from the station’s southern exit.",
    "La station porte le nom de Barbara, autrice-compositrice-interprète. Elle repose au cimetière parisien de Bagneux, accessible depuis la sortie sud de la station.",
    "Residents chose the name in a public vote organised by Île-de-France Mobilités. Barbara received more votes than the other proposed names, Coluche and Fort de Montrouge.",
    "Le nom est choisi lors d’un vote public organisé par Île-de-France Mobilités. Barbara recueille davantage de voix que les deux autres propositions, Coluche et Fort de Montrouge.",
    {
      sources: [
        source("Barbara · Wikipédia", wiki("Barbara (métro de Paris)")),
        source(
          "Île-de-France Mobilités · Choix des noms",
          "https://www.iledefrance-mobilites.fr/actualites/lucie-aubrac-et-barbara-seront-les-noms-des-prochaines-stations-de-la-ligne-4-du-metro",
        ),
      ],
      people: [bio("Barbara", "Barbara (singer)", "Barbara")],
    },
  ),
  stop(
    "bagneux-lucie-aubrac",
    "Bagneux – Lucie Aubrac",
    "Bagneux",
    "portrait",
    "Called Bagneux – Lucie Aubrac after the town it serves and Lucie Aubrac (1912–2007). A history teacher, communist activist and pacifist, she was a member of the Resistance during the Second World War.",
    "La station porte le nom de la commune de Bagneux et celui de Lucie Aubrac (1912–2007). Professeure d’histoire, militante communiste et pacifiste, elle est résistante pendant la Seconde Guerre mondiale.",
    "The terminus had to include Bagneux in its name. In the public vote, Lucie Aubrac was chosen over the alternatives Nina Simone and Champ des Oiseaux.",
    "Le nom du terminus devait obligatoirement comporter Bagneux. Lors du vote public, Lucie Aubrac est préférée aux deux autres propositions, Nina Simone et Champ des Oiseaux.",
    {
      sources: [
        source(
          "Bagneux – Lucie Aubrac · Wikipédia",
          wiki("Bagneux - Lucie Aubrac (métro de Paris)"),
        ),
        source(
          "Île-de-France Mobilités · Choix des noms",
          "https://www.iledefrance-mobilites.fr/actualites/lucie-aubrac-et-barbara-seront-les-noms-des-prochaines-stations-de-la-ligne-4-du-metro",
        ),
      ],
      people: [bio("Lucie Aubrac", "Lucie Aubrac")],
    },
  ),
];

export const line4: MetroLine = {
  id: "4",
  color: "#cf009e",
  textColor: "#ffffff",
  title: { en: "Line 4", fr: "Ligne 4" },
  summary: {
    en: "Line 4 runs from Porte de Clignancourt to Bagneux – Lucie Aubrac. Its 29 station names recall city gates, old markets and people, such as the singer Barbara.",
    fr: "La ligne 4 relie Porte de Clignancourt à Bagneux – Lucie Aubrac. Ses 29 noms de stations rappellent des portes de Paris, d’anciens marchés et des personnes, comme la chanteuse Barbara.",
  },
  termini: ["Porte de Clignancourt", "Bagneux – Lucie Aubrac"],
  stations,
  paths: [stations.map((station) => station.id)],
  featured: ["saint-sulpice", "montparnasse-bienvenue", "barbara"],
  image: "/illustrations/line-4.webp",
  imageAlt: {
    en: "Illustration of the west front of Saint-Sulpice church, with its two unequal towers.",
    fr: "Illustration de la façade ouest de l’église Saint-Sulpice, avec ses deux tours inégales.",
  },
  sources: [
    source(
      "RATP · Plan de la ligne 4",
      "https://www.ratp.fr/plans-lignes/metro/4",
    ),
    source(
      "Transilien · Stations de la ligne 4",
      "https://www.transilien.com/fr/page-lignes/metro-4",
    ),
  ],
};

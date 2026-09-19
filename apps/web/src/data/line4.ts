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
    "The hamlet became part of Paris in 1860. The station’s additional name, Puces de Saint-Ouen, points to the flea market beyond the former city boundary.",
    "Le hameau est intégré à Paris en 1860. Le complément Puces de Saint-Ouen indique le marché situé au-delà de l’ancienne limite de la capitale.",
  ),
  stop(
    "simplon",
    "Simplon",
    "Paris 18e",
    "gate",
    "Called Simplon after nearby Rue du Simplon, which takes its name from the Alpine pass linking the Swiss canton of Valais with northern Italy.",
    "La station porte le nom de la rue du Simplon, qui rappelle le col alpin reliant la Suisse à l’Italie.",
    "Napoleon ordered a road across the pass. A railway tunnel beneath the Simplon opened in 1906, two years before this Métro station opened in Paris.",
    "Napoléon fait aménager une route par le col. Un tunnel ferroviaire sous le Simplon ouvre en 1906, deux ans avant la station de métro parisienne.",
  ),
  stop(
    "marcadet-poissonniers",
    "Marcadet – Poissonniers",
    "Paris 18e",
    "market",
    "Called Marcadet – Poissonniers after two nearby streets. Marcadet recalls an old market site; Poissonniers recalls the traders who carried fish from the northern coast to the markets of Paris.",
    "La station réunit les noms de deux rues voisines. Marcadet rappelle un ancien lieu de marché ; Poissonniers évoque les marchands qui acheminaient le poisson des côtes du nord vers les halles de Paris.",
    "Marcadet and Poissonniers began as separate stations run by rival companies. An underground passage joined them in 1931, and their names were joined too.",
    "Marcadet et Poissonniers étaient deux stations distinctes, exploitées par des compagnies concurrentes. Un couloir les relie en 1931 : leurs deux noms sont alors réunis.",
  ),
  stop(
    "chateau-rouge",
    "Château Rouge",
    "Paris 18e",
    "square",
    "Called Château Rouge after the square above the station. Its name recalls a small country house once known as the Château Rouge, which disappeared in 1889.",
    "La station porte le nom de la place du Château-Rouge, située au-dessus des quais. Ce nom rappelle une petite demeure autrefois appelée Château Rouge, disparue en 1889.",
    "The house was probably built in the late eighteenth century. Its exact construction date is uncertain, but its name survived in the square and surrounding neighbourhood.",
    "La demeure aurait été construite à la fin du XVIIIe siècle. Sa date exacte reste incertaine, mais son nom a survécu dans celui de la place et du quartier.",
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
    { people: [bio("Armand Barbès", "Armand Barbès")] },
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
    "La station porte le nom de la gare de l’Est, qu’elle dessert. La gare ferroviaire adopte ce nom en 1854, lorsque son réseau s’étend au-delà de Strasbourg.",
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
  ),
  stop(
    "strasbourg-saint-denis",
    "Strasbourg – Saint-Denis",
    "Paris 2e / 3e / 10e",
    "gate",
    "Called Strasbourg – Saint-Denis after the boulevards at this junction. Strasbourg recalls the destination of the railway nearby; Saint-Denis recalls the old road to the town named after the first bishop of Paris.",
    "La station réunit les noms des boulevards du carrefour. Strasbourg rappelle la destination du chemin de fer voisin ; Saint-Denis, l’ancienne route vers la ville portant le nom du premier évêque de Paris.",
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
    "La station porte les noms de la rue et du boulevard qui se croisent ici. Réaumur honore le physicien et naturaliste René-Antoine Ferchault de Réaumur ; Sébastopol rappelle la prise du port de Crimée en 1855.",
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
    "Called Étienne Marcel after the nearby street honouring a fourteenth-century provost of the merchants of Paris. This office made Marcel a leading figure in the city’s government.",
    "La station porte le nom de la rue Étienne-Marcel, dédiée à un prévôt des marchands de Paris du XIVe siècle. Cette fonction faisait de Marcel une figure majeure du gouvernement de la ville.",
    "Marcel played a prominent role in the Estates General of 1355 and 1357. His political career ended violently with his death in Paris in 1358.",
    "Marcel joue un rôle important aux États généraux de 1355 et de 1357. Sa carrière politique s’achève dans la violence, avec sa mort à Paris en 1358.",
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
    "Called Les Halles after the wholesale food market that once occupied this part of central Paris. Its covered halls supplied the city and gave the neighbourhood its lasting name.",
    "La station porte le nom des halles, l’ancien marché alimentaire de gros du centre de Paris. Ses pavillons approvisionnaient la capitale et ont laissé leur nom au quartier.",
    "The food market began moving to Rungis in 1969. In 1977, the Métro station moved slightly east to connect more directly with the new RER station.",
    "Le transfert du marché alimentaire vers Rungis commence en 1969. En 1977, la station de métro est déplacée vers l’est pour faciliter la correspondance avec la nouvelle gare du RER.",
    {
      sources: [
        source("Les Halles · Wikipédia", wiki("Les Halles (métro de Paris)")),
        source(
          "Archives de Paris · Les Halles",
          "https://archives.paris.fr/archives-numerisees/photographies/le-quartier-des-halles",
        ),
      ],
    },
  ),
  stop(
    "chatelet",
    "Châtelet",
    "Paris 1er / 4e",
    "gate",
    "Called Châtelet after Place du Châtelet, laid out on the site of the Grand Châtelet. This vanished fortress became a court and prison.",
    "La station doit son nom à la place du Châtelet, aménagée à l’emplacement du Grand Châtelet. Cette forteresse disparue a servi de tribunal et de prison.",
    "The Grand Châtelet guarded the northern approach to the Pont au Change. Its demolition began in 1802, leaving its name attached to the new square.",
    "Le Grand Châtelet gardait l’accès nord du pont au Change. Sa démolition commence en 1802 ; son nom reste alors attaché à la nouvelle place.",
    {
      sources: [
        source("Châtelet · Wikipédia", wiki("Châtelet (métro de Paris)")),
        source(
          "Paris · Le Grand Châtelet",
          "https://parcoursrevolution.paris.fr/fr/points-interet/54-le-grand-chatelet-geole-de-l-ancien-regime",
        ),
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
    "It is the only Métro station beneath an island. Line 4 crosses both arms of the Seine here, with Châtelet on one bank and Saint-Michel on the other.",
    "C’est la seule station du métro située sous une île. La ligne 4 traverse ici les deux bras de la Seine, entre Châtelet sur une rive et Saint-Michel sur l’autre.",
  ),
  stop(
    "saint-michel",
    "Saint-Michel",
    "Paris 5e / 6e",
    "square",
    "Called Saint-Michel after the square above the station. The square takes its name from the nearby bridge, which recalls a former palace chapel dedicated to the archangel Michael.",
    "La station porte le nom de la place Saint-Michel, située au-dessus des quais. La place reprend celui du pont voisin, qui rappelle une ancienne chapelle du palais dédiée à l’archange Michel.",
    "The station was built in a metal caisson sunk into the wet ground beside the Seine. This construction formed part of Line 4’s difficult river crossing.",
    "La station a été construite dans un caisson métallique enfoncé dans le sol humide, près de la Seine. Cet ouvrage faisait partie de la difficile traversée du fleuve par la ligne 4.",
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
    "The theatre opened in 1782. Its monumental columns and pediment reflect the neoclassical architecture of Charles de Wailly and Marie-Joseph Peyre, who designed the building.",
    "Le théâtre ouvre en 1782. Ses colonnes monumentales et son fronton illustrent l’architecture néoclassique de Charles de Wailly et Marie-Joseph Peyre, les deux concepteurs du bâtiment.",
    {
      sources: [
        source("Odéon · Wikipédia", wiki("Odéon (métro de Paris)")),
        source(
          "Odéon · Histoire du théâtre",
          "https://www.theatre-odeon.eu/fr/lodeon",
        ),
      ],
    },
  ),
  stop(
    "saint-germain-des-pres",
    "Saint-Germain-des-Prés",
    "Paris 6e",
    "church",
    "Called Saint-Germain-des-Prés after the church and square nearby. Germain was a sixth-century bishop of Paris; des prés recalls the meadows that once surrounded the abbey.",
    "La station porte le nom de l’église et de la place voisines. Germain était évêque de Paris au VIe siècle ; « des Prés » rappelle les prairies qui entouraient autrefois l’abbaye.",
    "The abbey began under the names Sainte-Croix and Saint-Vincent. Germain’s burial there in 576 helped make it a pilgrimage site, and his name gradually replaced the earlier dedication.",
    "L’abbaye est d’abord dédiée à Sainte-Croix et à Saint-Vincent. La sépulture de Germain, en 576, contribue à en faire un lieu de pèlerinage ; son nom remplace progressivement la dédicace initiale.",
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
    "Construction of the present church began in 1646 to replace a smaller medieval building. Work continued intermittently for more than a century, involving several architects.",
    "La construction de l’église actuelle commence en 1646 pour remplacer un édifice médiéval devenu trop petit. Plusieurs architectes se succèdent sur ce chantier, poursuivi par étapes pendant plus d’un siècle.",
    { people: [bio("Sulpice le Pieux", "Sulpitius the Pious")] },
  ),
  stop(
    "saint-placide",
    "Saint-Placide",
    "Paris 6e",
    "church",
    "Called Saint-Placide after the nearby street dedicated to Placide, a disciple of Saint Benedict. The station adopted the street’s name in 1913 to avoid confusion with another stop.",
    "La station porte le nom de la rue Saint-Placide, dédiée à un disciple de saint Benoît. Elle adopte ce nom en 1913 pour éviter une confusion avec un autre arrêt.",
    "Its original name was Vaugirard, after Rue de Vaugirard. When another Vaugirard station opened on today’s Line 12, this stop needed a name of its own.",
    "Elle s’appelait d’abord Vaugirard, comme la rue voisine. L’ouverture d’une autre station Vaugirard sur l’actuelle ligne 12 a conduit à choisir un nom différent pour cet arrêt.",
  ),
  stop(
    "montparnasse-bienvenue",
    "Montparnasse – Bienvenüe",
    "Paris 6e / 14e / 15e",
    "station",
    "Called Montparnasse – Bienvenüe after the railway district and Métro engineer Fulgence Bienvenüe. Montparnasse began as a joking reference to Mount Parnassus, the Greek mountain associated with poetry.",
    "La station associe le nom du quartier de la gare à celui de l’ingénieur Fulgence Bienvenüe. Montparnasse vient d’une référence plaisante au mont Parnasse, montagne grecque associée à la poésie.",
    "Students gave that grand name to a local heap of rubble. The present station joins two formerly separate stops, Montparnasse and Bienvenüe, whose names were combined in 1942.",
    "Des étudiants avaient donné ce nom prestigieux à une butte de gravats. La station actuelle réunit deux anciens arrêts, Montparnasse et Bienvenüe, dont les noms sont associés en 1942.",
    {
      sources: [
        source(
          "RATP · Montparnasse-Bienvenüe",
          "https://www.ratp.fr/decouvrir/patrimoine/histoire-station-montparnasse-bienvenue",
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
    "He continued to serve as a representative after the revolution of 1848, during the Second Republic.",
    "Après la révolution de 1848, Vavin poursuit son activité de représentant au sein des assemblées de la Deuxième République.",
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
    "In February 1848, Raspail led a delegation to Paris City Hall to demand an immediate proclamation of the Republic from the provisional government.",
    "En février 1848, Raspail conduit une délégation à l’Hôtel de Ville de Paris pour exiger du gouvernement provisoire la proclamation immédiate de la République.",
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
    "La station porte le nom de la rue dédiée au général Régis Barthélemy Mouton-Duvernet. Il sert pendant la Révolution et l’Empire, avant d’être fusillé à Lyon en 1816.",
    "The station later gave its own name to a Métro decorating style. Its orange tiles, introduced in 1969, became a model for other stations.",
    "La station a ensuite donné son propre nom à un décor du métro. Son carrelage orange, installé en 1969, sert de modèle à d’autres stations.",
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
    "Called Alésia after Rue d’Alésia, named for the Gallic stronghold where Julius Caesar defeated Vercingetorix in 52 BC. The battle took place in Burgundy, far from this Paris street.",
    "La station porte le nom de la rue d’Alésia, qui rappelle la place forte gauloise où Jules César vainquit Vercingétorix en 52 avant notre ère. La bataille se déroula en Bourgogne.",
    "At Alise-Sainte-Reine, archaeological remains trace the siege. Roman fortifications enclosed the Gallic forces while a second line of defences faced the army coming to relieve them.",
    "À Alise-Sainte-Reine, les vestiges archéologiques retracent le siège. Les fortifications romaines encerclaient les Gaulois ; une seconde ligne de défense faisait face à l’armée venue les secourir.",
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
    "Called Porte d’Orléans after the former city gate on the road to Orléans. The name preserves the direction of travel through the southern fortifications of Paris.",
    "La station porte le nom de l’ancienne porte de Paris située sur la route d’Orléans. Ce nom conserve la destination de la voie qui traversait les fortifications au sud de la capitale.",
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
      ],
    },
  ),
  stop(
    "mairie-de-montrouge",
    "Mairie de Montrouge",
    "Montrouge",
    "square",
    "Called Mairie de Montrouge because it serves the town hall of Montrouge. Mairie means town hall.",
    "La station s’appelle Mairie de Montrouge parce qu’elle dessert l’hôtel de ville.",
    "The town’s own name remains debated. Its municipal history gives two explanations: reddish soil on the plateau, or a local lord nicknamed Le Rouge.",
    "L’origine du nom Montrouge reste discutée. L’histoire municipale présente deux explications : la terre rougeâtre du plateau, ou un seigneur local surnommé « le Rouge ».",
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
    "Called Barbara after the French singer and songwriter. She is buried in the nearby Parisian cemetery of Bagneux, which can be reached from the station’s southern exit.",
    "La station porte le nom de Barbara, autrice-compositrice-interprète. Elle repose au cimetière parisien de Bagneux, situé à proximité et accessible depuis la sortie sud de la station.",
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
    "Called Bagneux – Lucie Aubrac to identify the town and honour a member of the French Resistance. Aubrac fought against the Nazi occupation and continued to campaign for peace after the war.",
    "La station associe le nom de Bagneux à celui de Lucie Aubrac, figure de la Résistance. Elle lutte contre l’occupation nazie puis poursuit, après la guerre, son engagement pour la paix.",
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
    en: "City gates, old markets and the people behind 29 station names.",
    fr: "Portes de Paris, anciens marchés et figures qui ont donné leur nom à 29 stations.",
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

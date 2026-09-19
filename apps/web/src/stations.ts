export type Art =
  | "church"
  | "station"
  | "towers"
  | "garden"
  | "market"
  | "modern"
  | "plane";
export interface Station {
  id: string;
  name: string;
  area: string;
  opened: number;
  year: string;
  title: string;
  intro: string;
  story: string;
  look: string;
  source: [string, string];
  art: Art;
  x: number;
  y: number;
}
const rows: Omit<Station, "id" | "x" | "y">[] = [
  {
    name: "Saint-Denis–Pleyel",
    area: "Saint-Denis",
    opened: 2024,
    year: "2024",
    title: "A new gateway to Greater Paris",
    intro: "A station that looks beyond the old edges of the city.",
    story:
      "Designed by Japanese architect Kengo Kuma, this station became the northern terminus of Line 14 in June 2024. Its layered building and generous public spaces mark a new chapter for Pleyel. The district is becoming a meeting point for a much larger metropolitan railway network.",
    look: "Look for the building’s layered façade and the public spaces that connect it to the changing Pleyel district.",
    source: [
      "City of Saint-Denis · Pleyel",
      "https://www.saintdenis.fr/pleyel-un-quartier-de-vie-pour-toutes-et-tous",
    ],
    art: "modern",
  },
  {
    name: "Mairie de Saint-Ouen",
    area: "Saint-Ouen-sur-Seine",
    opened: 2020,
    year: "1860",
    title: "The town that industry built",
    intro: "Behind the new metro, a town shaped by factories and the Seine.",
    story:
      "Saint-Ouen’s industrial growth accelerated when its docks were connected to the Petite Ceinture railway from 1860. Chemical works, metalworking and energy businesses transformed the town. Today, the journey to the town hall also leads into a district where that industrial past is being given new uses.",
    look: "Explore the contrast between the historic town centre and the redeveloped Docks neighbourhood.",
    source: [
      "City of Saint-Ouen · local history",
      "https://www.saint-ouen.fr/vie-quotidienne/culture-et-patrimoine/histoire-et-patrimoine/histoire-de-saint-ouen-sur-seine/",
    ],
    art: "station",
  },
  {
    name: "Saint-Ouen",
    area: "Saint-Ouen-sur-Seine",
    opened: 2020,
    year: "1860–1880",
    title: "Rails, workshops and working lives",
    intro: "A stop in the industrial history of the northern suburbs.",
    story:
      "Between 1860 and 1880, the number of businesses in Saint-Ouen rose from 24 to 121. The railway and docks helped turn a riverside town into an industrial centre. Line 14 adds a new layer to a place whose development has long depended on moving people and goods.",
    look: "Read the neighbourhood as a mix of workshops, housing and newer buildings, rather than a single period of Paris.",
    source: [
      "City of Saint-Ouen · local history",
      "https://www.saint-ouen.fr/vie-quotidienne/culture-et-patrimoine/histoire-et-patrimoine/histoire-de-saint-ouen-sur-seine/",
    ],
    art: "market",
  },
  {
    name: "Porte de Clichy",
    area: "Paris · 17e",
    opened: 2021,
    year: "2018",
    title: "Justice changes its skyline",
    intro: "A glass landmark at the edge of the old city.",
    story:
      "The new Tribunal de Paris opened in 2018, moving major court functions from the Île de la Cité to the Batignolles district. Renzo Piano’s design stacks smaller volumes above a broad base. It is a striking modern counterpart to the older Paris that the line crosses further south.",
    look: "Find the stepped glass silhouette of the courthouse above the surrounding neighbourhood.",
    source: [
      "City of Paris · the new courthouse",
      "https://www.paris.fr/pages/nouveau-palais-de-justice-faites-entrer-la-lumiere-5486",
    ],
    art: "modern",
  },
  {
    name: "Pont Cardinet",
    area: "Paris · 17e",
    opened: 2020,
    year: "2007",
    title: "Where railway land became a garden",
    intro: "The railway leaves room for a different kind of movement.",
    story:
      "The Martin Luther King park grew from former railway land in Clichy-Batignolles. Its first section opened in 2007, and its rail garden keeps a trace of the site’s earlier life. The neighbourhood shows how Paris can make new public space without erasing every sign of what came before.",
    look: "Seek out the rail garden, a small reminder of the tracks beneath this new landscape.",
    source: [
      "City of Paris · Martin Luther King park",
      "https://www.paris.fr/lieux/parc-clichy-batignolles-martin-luther-king-2817",
    ],
    art: "garden",
  },
  {
    name: "Saint-Lazare",
    area: "Paris · 8e",
    opened: 2003,
    year: "1877",
    title: "When steam became a painting",
    intro: "Monet found modern life beneath a railway roof.",
    story:
      "In 1877, Claude Monet asked to paint inside Saint-Lazare. Steam, iron and changing light became his subjects. These paintings treated the railway as part of modern Paris, worthy of the same attention as a landscape. Arriving here today means stepping into a place that helped change what art could show.",
    look: "Look up into the train sheds and imagine their structure dissolving into clouds of steam.",
    source: [
      "Musée d’Orsay · Monet at Saint-Lazare",
      "https://www.musee-orsay.fr/fr/oeuvres/la-gare-saint-lazare-10897",
    ],
    art: "station",
  },
  {
    name: "Madeleine",
    area: "Paris · 8e",
    opened: 1998,
    year: "1764–1842",
    title: "A church with the ambitions of a temple",
    intro: "Royal plans. A revolution. An emperor’s monument.",
    story:
      "Work began in 1764, but the Revolution interrupted the project. Napoleon then imagined a temple to the glory of his army. The building eventually became a church, completed in 1842. Its great ring of columns still gives it the air of an ancient monument: a small history of changing power, written in stone.",
    look: "Walk around the exterior. The columns continue along the sides, making the building feel like a classical temple from every angle.",
    source: [
      "City of Paris · the story of La Madeleine",
      "https://www.paris.fr/pages/la-madeleine-n-a-ni-croix-ni-clocher-25919",
    ],
    art: "church",
  },
  {
    name: "Pyramides",
    area: "Paris · 1er",
    opened: 1998,
    year: "1798",
    title: "An Egyptian campaign on a Paris street",
    intro: "The name points further away than the Louvre.",
    story:
      "The station takes its name from the nearby rue des Pyramides. That street recalls the Battle of the Pyramids during Bonaparte’s Egyptian campaign in 1798. It is an example of how military history entered the everyday language of Paris, surviving in street signs and station announcements.",
    look: "Notice how the name carries a memory of Napoleon’s campaign, rather than referring to the Louvre’s modern glass pyramid.",
    source: [
      "Station history · Pyramides",
      "https://fr.wikipedia.org/wiki/Pyramides_(m%C3%A9tro_de_Paris)",
    ],
    art: "church",
  },
  {
    name: "Châtelet",
    area: "Paris · 1er / 4e",
    opened: 1998,
    year: "1802",
    title: "The fortress that disappeared",
    intro: "A busy square holds the name of a vanished prison.",
    story:
      "The Grand Châtelet stood here as a fortress, court and prison under the monarchy. Its demolition began in 1802 and continued until 1810. The open square replaced a place associated with royal justice and confinement. The building is gone, but the name remains one of the most familiar in the metro.",
    look: "Pause in the square and imagine a large fortified building occupying this open urban space.",
    source: [
      "City of Paris · Parcours Révolution",
      "https://parcoursrevolution.paris.fr/fr/points-interet/54-le-grand-chatelet-geole-de-l-ancien-regime",
    ],
    art: "station",
  },
  {
    name: "Gare de Lyon",
    area: "Paris · 12e",
    opened: 1998,
    year: "1900",
    title: "A grand entrance to a new century",
    intro: "The railway dressed up for the world.",
    story:
      "Gare de Lyon was extensively rebuilt for the Universal Exhibition of 1900. Its monumental façade and clock tower gave travellers a grand welcome to Paris. The station made railway travel part of the spectacle of a city presenting itself to the world at the start of a new century.",
    look: "Step outside for a view of the clock tower and the long ceremonial façade.",
    source: [
      "SNCF · history of Gare de Lyon",
      "https://www.garesetconnexions.sncf/fr/historique-gare-lyon",
    ],
    art: "station",
  },
  {
    name: "Bercy",
    area: "Paris · 12e",
    opened: 1998,
    year: "1860",
    title: "The neighbourhood that supplied the wine",
    intro: "Before the park and the arena, there were barrels.",
    story:
      "Bercy’s riverside wine trade grew outside the old tax boundary of Paris. After annexation in 1860, the warehouses became a major storage centre for the capital. The park preserves pieces of this working landscape, including old buildings and traces of rails.",
    look: "Look for the surviving warehouse buildings and rail traces in Parc de Bercy.",
    source: [
      "City of Paris · Bercy through time",
      "https://www.paris.fr/pages/au-parc-de-bercy-une-partie-de-campagne-chargee-d-histoire-24268",
    ],
    art: "market",
  },
  {
    name: "Cour Saint-Émilion",
    area: "Paris · 12e",
    opened: 1998,
    year: "19th century",
    title: "A wine cellar becomes a city street",
    intro: "The old trade lives on in stone and street names.",
    story:
      "The low wine warehouses around Cour Saint-Émilion preserve the scale of old Bercy. The names Pommard, Chablis and Saint-Émilion keep its wine trade in view. Shops and cafés now occupy a landscape once organised around storing and moving wine.",
    look: "Notice the low stone storehouses, a very different scale from the apartment blocks of central Paris.",
    source: [
      "City of Paris · Bercy through time",
      "https://www.paris.fr/pages/au-parc-de-bercy-une-partie-de-campagne-chargee-d-histoire-24268",
    ],
    art: "market",
  },
  {
    name: "Bibliothèque François-Mitterrand",
    area: "Paris · 13e",
    opened: 1998,
    year: "1996",
    title: "Four open books on the Seine",
    intro: "A national collection becomes a new piece of the city.",
    story:
      "Dominique Perrault designed the library as four angular towers around a large esplanade and sunken garden. The towers suggest open books. The site opened to the public in 1996, giving the national library room to grow and the eastern Left Bank a bold new landmark.",
    look: "Look from the river towards the four book-like towers, then climb to the wooden esplanade.",
    source: [
      "Bibliothèque nationale de France · the site",
      "https://www.bnf.fr/fr/le-site-francois-mitterrand",
    ],
    art: "towers",
  },
  {
    name: "Olympiades",
    area: "Paris · 13e",
    opened: 2007,
    year: "1969–1977",
    title: "A neighbourhood above the street",
    intro: "A new idea of city life, built on a raised platform.",
    story:
      "The Olympiades development rose between 1969 and 1977 over the former Paris-Gobelins goods station. Designed as a district on a raised deck, it separates pedestrian space from the ground below. Its towers and blocks carry the names of Olympic host cities: an ambitious vision of modern urban living.",
    look: "Take the stairs to the pedestrian deck and notice how the level of the city changes.",
    source: [
      "City of Paris · the Olympiades district",
      "https://www.paris.fr/pages/le-quartier-des-olympiades-au-rythme-de-la-ville-du-quart-d-heure-18692",
    ],
    art: "towers",
  },
  {
    name: "Maison Blanche",
    area: "Paris · 13e",
    opened: 2024,
    year: "An old roadside inn",
    title: "A small inn leaves a lasting name",
    intro: "A humble landmark becomes a whole neighbourhood.",
    story:
      "Maison Blanche takes its name from an inn on the old road to Fontainebleau. The district kept that name, and the metro inherited it in turn. It is a reminder that not every Paris station remembers a ruler or a monument: some preserve the ordinary places where people stopped on a journey.",
    look: "Think of the avenue as an old road out of Paris, with a wayside inn marking a place to stop.",
    source: [
      "RATP · history of Maison Blanche",
      "https://www.ratp.fr/decouvrir/patrimoine/histoire-station-maison-blanche",
    ],
    art: "market",
  },
  {
    name: "Hôpital Bicêtre",
    area: "Le Kremlin-Bicêtre",
    opened: 2024,
    year: "1656",
    title: "Four centuries of changing care",
    intro: "A hospital site with a long and difficult past.",
    story:
      "Bicêtre became part of the Hôpital Général in 1656. That institution combined assistance with confinement, far from the role of a hospital today. Surviving seventeenth-century buildings connect the modern medical campus to this older history of poverty, public order and care.",
    look: "The historic gates and pavilions are reminders that the hospital grew across many periods.",
    source: [
      "AP-HP · history of Bicêtre",
      "https://hopital-bicetre.aphp.fr/lhopital",
    ],
    art: "church",
  },
  {
    name: "Villejuif–Gustave Roussy",
    area: "Villejuif",
    opened: 2025,
    year: "1926",
    title: "A name dedicated to medical research",
    intro: "The newest stop carries the name of a pioneering doctor.",
    story:
      "The cancer institute traces its history to 1926 and the work of Gustave Roussy. It later took its founder’s name. The metro station opened on 18 January 2025, completing the set of 21 stops on the extended line and linking this major medical site to the route.",
    look: "Notice the station’s vast circular space: a recent addition to a much longer story of medical research.",
    source: [
      "Gustave Roussy · the institute’s history",
      "https://www.gustaveroussy.com/fr/histoire-linstitut",
    ],
    art: "modern",
  },
  {
    name: "L’Haÿ-les-Roses",
    area: "L’Haÿ-les-Roses",
    opened: 2024,
    year: "1899",
    title: "A town in the language of roses",
    intro: "A collector’s passion became a remarkable garden.",
    story:
      "Jules Gravereaux assembled a collection of roses and commissioned landscape designer Édouard André in 1899 to give it a garden of its own. The Roseraie du Val-de-Marne became a model for a garden devoted to one flower. The town’s floral identity is rooted in that extraordinary collection.",
    look: "The rose garden is a separate walk from the station. Plan time to explore its carefully arranged collections.",
    source: [
      "Roseraie du Val-de-Marne · garden history",
      "https://roseraie.valdemarne.fr/decouvrir-roseraie/jardin-historique",
    ],
    art: "garden",
  },
  {
    name: "Chevilly-Larue",
    area: "Chevilly-Larue",
    opened: 2024,
    year: "1969",
    title: "The great move of Paris’s market",
    intro: "The food supply of a capital moved south.",
    story:
      "In 1969, the wholesale market left Les Halles in central Paris for Rungis. The enormous move gave traders room for a modern market outside the crowded city centre. This stop serves the wider market area: a working landscape tied to the daily task of feeding Paris.",
    look: "Think of this part of the line as a link between the old market district around Châtelet and its modern successor.",
    source: [
      "Rungis International · market history",
      "https://www.rungisinternational.com/decouvrir/connaitre-marche-rungis/connaitre-rungis-le-marche-historique",
    ],
    art: "market",
  },
  {
    name: "Thiais–Orly",
    area: "Thiais / Orly",
    opened: 2024,
    year: "2024",
    title: "A new link across the southern suburbs",
    intro: "The metro becomes part of a larger regional network.",
    story:
      "The southern extension brought Line 14 to Thiais–Orly in June 2024. This station connects with the RER C at Pont de Rungis. Its history is still being written: it is part of the shift from a metro focused on central Paris to one that also links the surrounding towns and employment areas.",
    look: "Notice the meeting of suburban rail and metro, two networks that developed on different scales.",
    source: [
      "Grand Paris Express · Line 14 extension",
      "https://www.grandparisexpress.fr/ligne-14-prolongement-grand-paris-express",
    ],
    art: "modern",
  },
  {
    name: "Aéroport d’Orly",
    area: "Orly airport",
    opened: 2024,
    year: "1961",
    title: "Paris enters the jet age",
    intro: "The end of one journey. The start of another.",
    story:
      "Charles de Gaulle inaugurated Orly’s new terminal in February 1961. Its modern architecture made the airport a symbol of a changing France. Decades later, Line 14 brought a direct metro connection to the airport, extending the city’s familiar purple line all the way to the departures hall.",
    look: "The former Orly-Sud terminal is now called Orly 4. Its architecture belongs to the optimism of the early jet age.",
    source: [
      "Île-de-France · Orly heritage inventory",
      "https://inventaire.iledefrance.fr/dossier/IA94000551",
    ],
    art: "plane",
  },
];
const points = [
  [450, 65],
  [425, 112],
  [385, 159],
  [350, 206],
  [365, 253],
  [400, 300],
  [440, 347],
  [485, 394],
  [530, 441],
  [600, 515],
  [625, 562],
  [650, 609],
  [615, 656],
  [565, 703],
  [535, 750],
  [550, 797],
  [590, 844],
  [640, 891],
  [675, 938],
  [685, 985],
  [690, 1032],
];
export const stations: Station[] = rows.map((s, i) => ({
  ...s,
  id: s.name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-$/, ""),
  x: points[i]![0]!,
  y: points[i]![1]!,
}));
export const lineSource =
  "https://www.ratp.fr/en/discover/heritage/history-metro-line-14";
export const extensionSource =
  "https://www.ratp.fr/prolongement-metro-ligne-14";

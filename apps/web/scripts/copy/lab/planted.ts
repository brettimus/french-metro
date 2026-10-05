/**
 * Planted copy defects for the copy lab. Each entry copies one graded unit that has no tell and inserts exactly one
 * AI-writing tell (rubric T5, T9, T13, T14 or T16). The calibration and round-3 samples have almost no true cases of
 * these tells, so without planted cases their recall cannot be measured.
 *
 * Rules used when writing them:
 * - Change as little as possible; keep every fact of the original.
 * - Do not copy the example phrases in questions.ts ('steeped in history', 'not just X, but Y', ...), so a hit
 *   means the question generalises, not that it matched a quoted phrase.
 * - Six per tell, three EN and three FR. The split of a planted unit is the split of its original pair.
 *
 * Labels: the planted tell only. Dimension levels are not labelled for planted units, because the edit can change
 * several of them (S3, S4, S2) and nobody graded the result.
 */
import type { Tell } from "./dataset";

export type PlantedDefect = { from: string; tell: Tell; text: string };

export const PLANTED: PlantedDefect[] = [
  // ---- t5 negative parallelism ----
  {
    from: "station/5/ourcq/etymology/en",
    tell: "t5_neg_parallel",
    text: "Called Ourcq after nearby Rue de l’Ourcq, which crosses the canal of that name. The canal takes its name from the river, and it is not simply a waterway but the channel that carries that river’s water towards Paris.",
  },
  {
    from: "station/1/bastille/etymology/fr",
    tell: "t5_neg_parallel",
    text: "La station doit son nom à la place qui occupe l’emplacement de la Bastille. Celle-ci n’était pas une simple forteresse : elle servait aussi de prison, et elle est démolie après sa prise pendant la Révolution française de 1789.",
  },
  {
    from: "station/7/pont-neuf/etymology/en",
    tell: "t5_neg_parallel",
    text: "Called Pont-Neuf after the Pont Neuf beside it. Its name means “new bridge”, yet it is not a new bridge at all but the oldest surviving bridge in Paris. It was built without houses and with pavements for pedestrians.",
  },
  {
    from: "station/14/chatelet/etymology/fr",
    tell: "t5_neg_parallel",
    text: "La station doit son nom à la place du Châtelet, aménagée à l’emplacement du Grand Châtelet. Plus qu’une simple forteresse, ce bâtiment était à la fois un tribunal et une prison, avant sa démolition au début du XIXe siècle.",
  },
  {
    from: "station/14/saint-lazare/etymology/en",
    tell: "t5_neg_parallel",
    text: "Called Saint-Lazare after the nearby railway station and Rue Saint-Lazare. The street led not to an ordinary building but to the Maison Saint-Lazare, a leper hospital dedicated to Saint Lazarus.",
  },
  {
    from: "station/6/picpus/context/fr",
    tell: "t5_neg_parallel",
    text: "La station Picpus conserve à son entrée unique un édicule Guimard, inscrit aux monuments historiques le 12 février 2016. Le cimetière de Picpus, tout proche, n’est pas un simple cimetière de quartier : il abrite la tombe de Lafayette.",
  },

  // ---- t13 stock metaphor ----
  {
    from: "station/5/gare-de-lest/etymology/en",
    tell: "t13_stock_metaphor",
    text: "Called Gare de l’Est because it serves the railway station that has long been the gateway to eastern France. Its Verdun subtitle refers to nearby Avenue de Verdun.",
  },
  {
    from: "station/5/oberkampf/etymology/fr",
    tell: "t13_stock_metaphor",
    text: "La station doit son nom à la rue Oberkampf, dédiée à Christophe-Philippe Oberkampf. Cet industriel d’origine allemande fonde à Jouy-en-Josas la manufacture de tissus imprimés qui laisse son empreinte sur l’époque avec la toile de Jouy.",
  },
  {
    from: "station/5/quai-de-la-rapee/context/en",
    tell: "t13_stock_metaphor",
    text: "The station was first Place Mazas, then Pont d’Austerlitz, before taking its current name in 1916. Southbound trains cross the Seine on the Austerlitz viaduct, a living link between the two banks.",
  },
  {
    from: "station/9/la-muette/context/fr",
    tell: "t13_stock_metaphor",
    text: "Le 9 juin 1943, la Gestapo arrête le chef résistant Charles Delestraint dans cette station. Une plaque à la sortie principale, témoin silencieux de cet épisode, lui rend hommage. La station avait ouvert le 8 novembre 1922 avec le premier tronçon de la ligne.",
  },
  {
    from: "station/7/porte-divry/context/en",
    tell: "t13_stock_metaphor",
    text: "Porte d’Ivry was Line 7’s southern terminus from 1931 to 1946. The extension to Mairie d’Ivry then took trains beyond the Paris boundary. Frozen in time, its three platform tracks retain the layout of that earlier terminus.",
  },
  {
    from: "station/6/passy/etymology/fr",
    tell: "t13_stock_metaphor",
    text: "La station doit son nom à l’ancien village de Passy, annexé à Paris en 1860 et desservi ici par l’ancien quai de Passy, aujourd’hui avenue du Président-Kennedy, véritable trait d’union entre le village et la Seine.",
  },

  // ---- t14 grandiosity ----
  {
    from: "station/9/michel-ange-molitor/etymology/fr",
    tell: "t14_grandiosity",
    text: "La station doit son nom à la rue Michel-Ange et à la rue Molitor. La première honore l’artiste italien de la Renaissance Michel-Ange (1475–1564), la seconde Gabriel-Jean-Joseph Molitor (1770–1849), maréchal de France parmi les plus illustres de l’Empire.",
  },
  {
    from: "station/6/nationale/etymology/en",
    tell: "t14_grandiosity",
    text: "Called Nationale after Rue Nationale, which honours the Garde nationale, the civic militia created during the French Revolution that shaped the destiny of the whole nation. The street took this name after the Revolution of 1848, to celebrate the Second Republic.",
  },
  {
    from: "station/5/jacques-bonsergent/etymology/fr",
    tell: "t14_grandiosity",
    text: "La station doit son nom à la place dédiée à Jacques Bonsergent, ingénieur français fusillé par les autorités allemandes d’occupation en décembre 1940, une exécution qui bouleverse la France entière.",
  },
  {
    from: "station/14/thiais-orly/etymology/en",
    tell: "t14_grandiosity",
    text: "Called Thiais – Orly after Thiais, where the station stands, and the neighbouring municipality of Orly, whose airport transformed travel across the world. The compound name replaced the project name Pont de Rungis.",
  },
  {
    from: "station/7/chaussee-dantin-la-fayette/etymology/fr",
    tell: "t14_grandiosity",
    text: "La station doit son nom à la rue de la Chaussée-d’Antin et à la rue La Fayette. La première rappelle l’hôtel du duc d’Antin et une voie surélevée sur un terrain marécageux. La seconde honore le marquis dont l’engagement décide à lui seul du sort de l’indépendance américaine.",
  },
  {
    from: "station/1/louvre-rivoli/context/en",
    tell: "t14_grandiosity",
    text: "Rue de Rivoli itself commemorates Bonaparte’s 1797 victory over Austria at Rivoli. The station received museum-style decor, including copied artworks and historical plans, in September 1968, under Minister of Culture André Malraux, changing how the whole world thinks about metro stations.",
  },

  // ---- t16 synonym cycling ----
  {
    from: "station/4/saint-sulpice/etymology/en",
    tell: "t16_synonym_cycling",
    text: "Called Saint-Sulpice after the nearby street and church. The sanctuary is dedicated to Sulpice the Pious, and the place of worship honours a seventh-century bishop of Bourges and chaplain to the Merovingian king Clotaire II.",
  },
  {
    from: "station/5/breguet-sabin/etymology/fr",
    tell: "t16_synonym_cycling",
    text: "Le nom de la station réunit ceux de deux rues. La voie Bréguet honore la famille Breguet, dont l’horloger Abraham Louis Breguet. L’artère Saint-Sabin rappelle Charles-Pierre d’Angelesme de Saint-Sabin, échevin de Paris au XVIIIe siècle.",
  },
  {
    from: "station/7/stalingrad/context/en",
    tell: "t16_synonym_cycling",
    text: "The Line 7 platforms originally bore the name Boulevard de la Villette. Underground passages connected these quays to Lines 2 and 5 in 1942. The combined interchange took the name Stalingrad in 1946, after the war.",
  },
  {
    from: "station/14/saint-lazare/etymology/fr",
    tell: "t16_synonym_cycling",
    text: "La station doit son nom à la gare et à la rue Saint-Lazare voisines. Cette voie menait à la maison Saint-Lazare ; l’établissement, une léproserie, était un hospice dédié à saint Lazare.",
  },
  {
    from: "station/4/saint-germain-des-pres/context/en",
    tell: "t16_synonym_cycling",
    text: "The abbey began under the names Sainte-Croix and Saint-Vincent. Germain’s burial at the cloister in 576 helped make the sanctuary a pilgrimage site, and his name gradually replaced the earlier dedication.",
  },
  {
    from: "station/7/porte-de-choisy/context/fr",
    tell: "t16_synonym_cycling",
    text: "Porte de Choisy ouvre comme terminus provisoire de la ligne 10 en 1930. L’année suivante, l’arrêt devient une station de passage de la ligne 7, qui traverse alors la Seine et se prolonge d’une halte jusqu’à Porte d’Ivry.",
  },

  // ---- t9 tidy closer ----
  {
    from: "station/1/concorde/context/fr",
    tell: "t9_closer",
    text: "Entre 1976 et 1979, les quais de la ligne 1, ouverts le 13 août 1900, sont refaits dans le style Andreu-Motte, en rose tyrien. Les quais de la ligne 12, en correspondance, portent un décor distinct qui cite la Déclaration des droits de l’homme. Deux décors qui racontent, chacun à sa manière, l’histoire de la place.",
  },
  {
    from: "station/5/campo-formio/context/en",
    tell: "t9_closer",
    text: "The stop opened four days after the first section of Line 5 in June 1906. During those first days, trains passed through without stopping. It was a quiet beginning for a modest stop.",
  },
  {
    from: "station/9/pont-de-sevres/etymology/fr",
    tell: "t9_closer",
    text: "La station doit son nom au pont de Sèvres, qui franchit la Seine en direction de la ville de Sèvres. Elle se situe à l’extrémité de l’avenue du Général-Leclerc, à la limite de Boulogne-Billancourt. Un nom qui relie ainsi la station à la ville voisine.",
  },
  {
    from: "station/14/chatelet/etymology/en",
    tell: "t9_closer",
    text: "Called Châtelet after Place du Châtelet, laid out on the site of the Grand Châtelet. This fortress was a court and prison before its demolition in the early nineteenth century. The name keeps a reminder of the city’s judicial past.",
  },
  {
    from: "station/7/porte-divry/context/fr",
    tell: "t9_closer",
    text: "Porte d’Ivry est le terminus sud de la ligne 7 de 1931 à 1946. Le prolongement vers Mairie d’Ivry conduit ensuite les trains au-delà de la limite de Paris. Ses trois voies à quai conservent la disposition de cet ancien terminus. Un détail qui résume toute l’histoire de la station.",
  },
  {
    from: "station/9/charonne/context/en",
    tell: "t9_closer",
    text: "On 8 February 1962, police charged a demonstration against the OAS and the Algerian War. Eight protesters died at the station entrance and a ninth later in hospital. They are known as the martyrs of Charonne. Since 8 February 2007 the station has carried the subtitle Place du 8 février 1962. The station thus remains a place of remembrance.",
  },
];

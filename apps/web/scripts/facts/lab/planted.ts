/**
 * Planted errors for the lab dataset: 40 supported pairs, each with one false edit (a date, number, name or place)
 * made the same way in EN and FR. The passages stay the same, so each edited claim states something the passages do
 * not support. Written by hand on 2026-10-05 from the dataset's supported pairs; one pair per text (shared stations
 * appear once) and about 30% from val stations. See build-dataset.ts.
 */
export type PlantedEdit = {
  /** Dataset item id of a supported pair: "pass/pairKey". */
  item: string;
  kind: "date" | "number" | "name" | "place";
  /** [exact text in the claim, replacement]; the text must occur once in one claim of that locale. */
  en: readonly [string, string];
  fr: readonly [string, string];
  /** Why the edit is false. */
  note: string;
};

export const PLANTED: PlantedEdit[] = [
  { item: "1/4/saint-michel/etymology/1", kind: "place", en: ["the square above the station", "the bridge beside the station"], fr: ["la place Saint-Michel, située au-dessus des quais", "le pont Saint-Michel, situé à côté des quais"], note: "The station is named for the square above it, not a bridge beside it." },
  { item: "1/9/alma-marceau/etymology/1", kind: "name", en: ["Avenue Marceau", "Avenue Montaigne"], fr: ["l’avenue Marceau", "l’avenue Montaigne"], note: "The second street in the name is Avenue Marceau." },
  { item: "1/14/villejuif-gustave-roussy/context/3", kind: "date", en: ["18 January 2025", "18 June 2024"], fr: ["18 janvier 2025", "18 juin 2024"], note: "The station opened on 18 January 2025." },
  { item: "1/5/stalingrad/context/2", kind: "number", en: ["Four years earlier", "Ten years earlier"], fr: ["Quatre ans plus tôt", "Dix ans plus tôt"], note: "Line 5 arrived four years earlier." },
  { item: "1/5/hoche/context/2", kind: "date", en: ["in 1942", "in 1937"], fr: ["en 1942", "en 1937"], note: "The extension to Pantin opened in 1942." },
  { item: "2/7/le-kremlin-bicetre/context/3", kind: "place", en: ["just south of Maison Blanche", "just north of Porte d’Italie"], fr: ["juste au sud de Maison Blanche", "juste au nord de Porte d’Italie"], note: "The junction is just south of Maison Blanche." },
  { item: "2/7/villejuif-louis-aragon/context/1", kind: "date", en: ["in 1985", "in 1979"], fr: ["en 1985", "en 1979"], note: "The terminus opened in 1985." },
  { item: "2/14/villejuif-gustave-roussy/etymology/2", kind: "name", en: ["French-Swiss doctor", "Belgian doctor"], fr: ["médecin franco-suisse", "médecin belge"], note: "Gustave Roussy was French-Swiss." },
  { item: "2/9/michel-ange-auteuil/etymology/2", kind: "name", en: ["Italian artist Michelangelo", "Italian artist Raphael"], fr: ["l’artiste italien Michel-Ange", "l’artiste italien Raphaël"], note: "Rue Michel-Ange honours Michelangelo." },
  { item: "2/14/pont-cardinet/context/1", kind: "place", en: ["approaching Saint-Lazare", "approaching Gare du Nord"], fr: ["qui mènent à Saint-Lazare", "qui mènent à la gare du Nord"], note: "The tracks lead to Saint-Lazare." },
  { item: "2/9/ranelagh/context/1", kind: "date", en: ["8 November 1922", "8 November 1925"], fr: ["8 novembre 1922", "8 novembre 1925"], note: "Ranelagh opened on 8 November 1922." },
  { item: "2/14/pyramides/context/2", kind: "date", en: ["15 October 1998", "15 October 2003"], fr: ["15 octobre 1998", "15 octobre 2003"], note: "The Line 14 platforms opened on 15 October 1998." },
  { item: "2/5/gare-du-nord/context/2", kind: "date", en: ["In 1942", "In 1931"], fr: ["En 1942", "En 1931"], note: "The new platforms date from 1942." },
  { item: "1/1/charles-de-gaulle-etoile/etymology/2", kind: "number", en: ["three weeks after his death", "three months after his death"], fr: ["trois semaines après sa mort", "trois mois après sa mort"], note: "De Gaulle died on 9 November 1970, three weeks before the rename." },
  { item: "1/6/corvisart/context/2", kind: "date", en: ["1 to 2 June 1918", "1 to 2 June 1917"], fr: ["1er au 2 juin 1918", "1er au 2 juin 1917"], note: "The raid was on the night of 1 to 2 June 1918." },
  { item: "1/5/gare-de-lest/etymology/2", kind: "date", en: ["in 1854", "in 1871"], fr: ["en 1854", "en 1871"], note: "The railway station took the name in 1854." },
  { item: "1/1/champs-elysees-clemenceau/etymology/1", kind: "date", en: ["created in 1930", "created in 1919"], fr: ["créée en 1930", "créée en 1919"], note: "Place Clemenceau was created in 1930." },
  { item: "1/6/charles-de-gaulle-etoile/context/1", kind: "date", en: ["only in 1942", "only in 1954"], fr: ["qu’en 1942", "qu’en 1954"], note: "The platforms joined Line 6 permanently in 1942." },
  { item: "1/7/corentin-cariou/context/2", kind: "date", en: ["in 1946", "in 1952"], fr: ["en 1946", "en 1952"], note: "The station took Cariou's name in 1946." },
  { item: "1/5/eglise-de-pantin/etymology/1", kind: "name", en: ["Saint-Germain-l’Auxerrois", "Saint-Denis"], fr: ["l’église Saint-Germain-l’Auxerrois", "l’église Saint-Denis"], note: "The church of Pantin is Saint-Germain-l’Auxerrois." },
  { item: "1/7/place-ditalie/context/2", kind: "number", en: ["Line 10", "Line 5"], fr: ["ligne 10", "ligne 5"], note: "The Line 7 platforms first belonged to Line 10." },
  { item: "1/6/nation/context/2", kind: "date", en: ["1 March 1909", "1 March 1903"], fr: ["1er mars 1909", "1er mars 1903"], note: "The Line 6 platforms opened on 1 March 1909." },
  { item: "1/4/etienne-marcel/etymology/2", kind: "date", en: ["in 1354", "in 1328"], fr: ["en 1354", "en 1328"], note: "Marcel became provost in 1354." },
  { item: "1/6/boissiere/etymology/2", kind: "date", en: ["2 October 1900", "2 October 1903"], fr: ["2 octobre 1900", "2 octobre 1903"], note: "The station opened on 2 October 1900." },
  { item: "1/9/havre-caumartin/context/2", kind: "date", en: ["3 June 1923", "3 June 1928"], fr: ["3 juin 1923", "3 juin 1928"], note: "The Line 9 platform opened on 3 June 1923." },
  { item: "1/7/pierre-et-marie-curie/etymology/2", kind: "date", en: ["in 2007", "in 2012"], fr: ["en 2007", "en 2012"], note: "Marie Curie's name was added in 2007." },
  { item: "1/4/chateau-rouge/context/2", kind: "number", en: ["late eighteenth century", "late sixteenth century"], fr: ["fin du XVIIIe siècle", "fin du XVIe siècle"], note: "The house dates from the late eighteenth century." },
  { item: "2/4/alesia/context/2", kind: "name", en: ["the Gallic forces", "the Germanic forces"], fr: ["encerclaient les Gaulois", "encerclaient les Germains"], note: "At Alesia the Romans besieged the Gauls." },
  { item: "2/6/glaciere/context/1", kind: "date", en: ["in 1906", "in 1913"], fr: ["construits en 1906", "construits en 1913"], note: "The elevated section was built in 1906." },
  { item: "2/7/mairie-divry/context/1", kind: "date", en: ["1 May 1946", "1 May 1952"], fr: ["1er mai 1946", "1er mai 1952"], note: "The station opened on 1 May 1946." },
  { item: "2/5/bobigny-pantin-raymond-queneau/context/2", kind: "place", en: ["beside the Ourcq canal", "beside the Canal Saint-Denis"], fr: ["près du canal de l’Ourcq", "près du canal Saint-Denis"], note: "The station is beside the Ourcq canal." },
  { item: "2/4/gare-de-lest/context/1", kind: "name", en: ["Embarcadère de Strasbourg", "Embarcadère de Metz"], fr: ["Embarcadère de Strasbourg", "Embarcadère de Metz"], note: "The station began as the Embarcadère de Strasbourg." },
  { item: "2/5/quai-de-la-rapee/context/2", kind: "place", en: ["Austerlitz viaduct", "Bercy viaduct"], fr: ["viaduc d’Austerlitz", "viaduc de Bercy"], note: "Line 5 crosses the Seine on the Austerlitz viaduct." },
  { item: "2/7/porte-de-la-villette/context/2", kind: "date", en: ["1979 extension", "1968 extension"], fr: ["prolongement de 1979", "prolongement de 1968"], note: "The extension was in 1979." },
  { item: "2/4/odeon/context/1", kind: "date", en: ["in 1782", "in 1797"], fr: ["en 1782", "en 1797"], note: "The Odéon theatre opened in 1782." },
  { item: "2/4/saint-germain-des-pres/context/2", kind: "date", en: ["in 576", "in 612"], fr: ["en 576", "en 612"], note: "Germain was buried in 576." },
  { item: "2/14/bercy/etymology/2", kind: "date", en: ["in 1860", "in 1795"], fr: ["en 1860", "en 1795"], note: "Bercy was annexed to Paris in 1860." },
  { item: "2/14/bibliotheque-francois-mitterrand/context/3", kind: "number", en: ["four towers", "six towers"], fr: ["quatre tours", "six tours"], note: "The library has four towers." },
  { item: "2/4/porte-dorleans/context/2", kind: "date", en: ["in 2013", "in 2008"], fr: ["en 2013", "en 2008"], note: "The extension to Mairie de Montrouge opened in 2013." },
  { item: "2/14/mairie-de-saint-ouen/etymology/2", kind: "place", en: ["bishop of Rouen", "bishop of Reims"], fr: ["évêque de Rouen", "évêque de Reims"], note: "Ouen was bishop of Rouen." },
];

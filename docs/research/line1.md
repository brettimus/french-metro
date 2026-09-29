# Line 1 source audit

Checked 29 September 2026. Scope: all 25 current stations, English and French. The route runs from La Défense (Grande Arche) to Château de Vincennes, with one continuous path and no branches.

## Route and method

The [French Wikipedia line article](https://fr.wikipedia.org/wiki/Ligne_1_du_m%C3%A9tro_de_Paris) and the [English Wikipedia line article](https://en.wikipedia.org/wiki/Paris_M%C3%A9tro_Line_1) were both opened and agree on the 25-station order, the two termini, and the absence of branches. [Bonjour RATP's Line 1 page](https://www.bonjour-ratp.fr/lignes-metro/ligne-1/) returned HTTP 403 to a direct fetch; its station list was instead confirmed through a search snippet naming the same 25 stations, so it is corroborating rather than a primary source here. The verifier retried the page and got HTTP 403 again, then checked the order independently through the "Situation" section of each station article, which names the neighbouring stations on both sides. That chain matches the 25-station order below with no gaps.

Every station's own Wikipedia article was opened for its naming chain, one separate context fact, and its opening date. Sources disagree slightly on total line length (16.5 versus 16.6 km); since no station data field records line length, this is not resolved and is not repeated in the app.

The line opened in stages. Both line articles and [Herodote](https://www.herodote.net/19_juillet_1900-evenement-19000719.php) say that only eight of the 18 original stations opened between Porte Maillot and Porte de Vincennes on 19 July 1900. The two line articles add that the other ten opened between 6 August and 1 September 1900. The individual station articles do not agree with that count: they give 19 July 1900 for ten stations (Porte Maillot, Franklin D. Roosevelt, Champs-Élysées – Clemenceau, Tuileries, Palais-Royal – Musée du Louvre, Hôtel de Ville, Bastille, Gare de Lyon, Nation, Porte de Vincennes) and later dates for only eight (Châtelet and Saint-Paul on 6 August, George V, Concorde and Louvre – Rivoli on 13 August, Reuilly – Diderot on 20 August, Charles de Gaulle – Étoile and Argentine on 1 September). The two termini must have opened that day, since trains ran between them, so the conflict concerns the other eight. No opened source names the eight stations of opening day, so for Franklin D. Roosevelt, Champs-Élysées – Clemenceau, Tuileries, Palais-Royal – Musée du Louvre, Hôtel de Ville, Bastille, Gare de Lyon and Nation the app should say "opened in 1900" or "opened with the line in summer 1900" and not claim 19 July. The line reached Château de Vincennes on 24 March 1934, Pont de Neuilly on 29 April 1937, and La Défense on 1 April 1992. English Wikipedia says full automation reached 100 per cent of service on 15 December 2012 and that the last manual MP 89 trains left regular service on 21 December 2012; it also gives 16 February 2013 as the date from which the line was fully automated. Use "completed in December 2012" only with that qualification, or say "by early 2013".

## Editorial decisions

- Porte Maillot: the gate is not a gate of the Paris fortifications. The [French Wikipedia article on the place](https://fr.wikipedia.org/wiki/Porte_Maillot) says it was the main one of eight gates in the Bois de Boulogne enclosure built under Henri II, recorded as "porte Mahiaulx", then "Mahiot" (1668) and "Mailhau". The gate of the 1840s Thiers wall at this point was called porte de Neuilly. For the word "Maillot", the same article gives a common explanation (an old jeu de mail, a mallet game, beyond the gate in the wood) and then says an older origin is "much more probable": a memory of the 1382 Maillotins revolt. That preference is the article's own unsourced wording ("Il s'agirait"), and the revolt link is inferred from a road later called route de la Révolte. Neither account is established. The app should say the origin of "Maillot" is uncertain, give both explanations as proposals, and not present the revolt as the settled answer.
- Argentine was originally Obligado, after a street commemorating an 1845 Franco-British naval victory over Argentine forces. It was renamed in 1948 as a diplomatic gesture thanking Argentina for postwar food aid. The text does not compress this into a single unqualified sentence, since the two names honour opposite sides of a 19th-century conflict.
- Charles de Gaulle – Étoile: "Étoile" names the star-shaped convergence of avenues at the place and predates de Gaulle by decades. "Charles de Gaulle" was added on 30 November 1970, three weeks after his death on 9 November 1970. The etymology should not conflate the two layers.
- George V: the claim that this is one of only two Paris Métro stations named after a person still living at the time (with Montparnasse – Bienvenüe) comes from the station's own French Wikipedia article. The verifier found no second source. The dates are consistent (renamed 1920, George V died 1936). It is usable only as a qualified aside ("according to"), not a flatly asserted fact. Note also that the station was named after the avenue, not directly after the king.
- Bérault honours Michel Bérault (1796–1871), deputy mayor of Vincennes, from an old Vincennes family. The first name comes from the [French Wikipedia article on Place Bérault](https://fr.wikipedia.org/wiki/Place_B%C3%A9rault) and the [English station article](https://en.wikipedia.org/wiki/B%C3%A9rault_station). The English article also says the name evokes Bérault Stuart d'Aubigny, a captain of the guard at the château around 1500; that second link is single-source and should be left out or clearly qualified.
- Saint-Mandé opened 24 March 1934 as "Tourelle" (for former outlying defensive towers of the Château de Vincennes). It became "Saint-Mandé – Tourelle" on 26 April 1937, after the Line 6 station then called Saint-Mandé was renamed Picpus on 1 March 1937 (French line article, English station article, French Picpus article). The French station article prints 26 April 1934, which conflicts with the Picpus sequence and is treated as an error. The name was later shortened to plain "Saint-Mandé": the French line article gives 16 July 2002, the English station article 26 July 2002, and the French station article "the end of the 1990s". The app should say "shortened in the early 2000s" or omit the date. The current, shortened name is used throughout.
- Concorde's platform art quoting the Declaration of the Rights of Man is on the connecting Line 12 platforms, not Line 1's own platforms. The Line 1 entry should not claim this artwork for its own concourse.
- Gare de Lyon's Line 1 station was built 100 metres long, against 75 metres elsewhere on the line, with four tracks and two central platforms so that the circular line (the Line 2 of the time) could also stop there, which never happened; Line 14's existing entry separately notes that Line 1's platforms sit under boulevard Diderot. Both facts are kept, and neither contradicts the other.
- Spelling of the shared "Palais-Royal – Musée du Louvre" name follows the existing Line 7 entry (hyphen inside Palais-Royal, en dash before Musée), even though some sources print "Palais Royal" without the hyphen.
- Shared station IDs reused from other lines: `chatelet` (Lines 4, 7, 14), `bastille` (Line 5), `gare-de-lyon` (Line 14), `palais-royal-musee-du-louvre` (Line 7), `charles-de-gaulle-etoile` (Line 6), `franklin-d-roosevelt` (Line 9) and `nation` (Lines 6, 9). All seven names and underlying facts were checked against the existing entries for consistency before reuse. The review phase found two mismatches, now fixed: the Nation area is "Paris 11e / 12e / 20e" on all three lines, and both lines spell the avenue "Victor-Emmanuel-III".
- No em dashes are used in this document's prose. En dashes remain in compound station names.

## Station checks and sources

### 1. La Défense

Named for the La Défense business district. Opened 1 April 1992 as "Grande Arche de La Défense"; renamed to plain "La Défense" in 1997 to match the adjoining RER station.

- [La Défense · Wikipédia](<https://fr.wikipedia.org/wiki/La_D%C3%A9fense_(m%C3%A9tro_de_Paris)>)
- [Paris Métro Line 1 · Wikipedia](https://en.wikipedia.org/wiki/Paris_M%C3%A9tro_Line_1)

### 2. Esplanade de La Défense

Named for its position on the east side of the district's esplanade; its project name was Puteaux – Courbevoie. Opened 1 April 1992. The station encroaches on the A14 motorway tunnel, which lost one lane in each direction compared with the original plan; that constraint explains the narrow station and its single island platform.

- [Esplanade de La Défense · Wikipédia](<https://fr.wikipedia.org/wiki/Esplanade_de_La_D%C3%A9fense_(m%C3%A9tro_de_Paris)>)

### 3. Pont de Neuilly

Named for the nearby Seine bridge linking Neuilly-sur-Seine to Courbevoie and Puteaux. Opened 29 April 1937 as the line's western terminus; briefly carried the extended name "Pont de Neuilly – Avenue de Madrid" from 1940 to 1950.

- [Pont de Neuilly · Wikipédia](<https://fr.wikipedia.org/wiki/Pont_de_Neuilly_(m%C3%A9tro_de_Paris)>)

### 4. Les Sablons

Named for the boulevard and former Porte des Sablons, recalling sand deposits and quarries once worked here for Paris construction. Opened 29 April 1937. Former minister Jacques Barrot died suddenly in the station on 3 December 2014.

- [Les Sablons · Wikipédia](<https://fr.wikipedia.org/wiki/Les_Sablons_(m%C3%A9tro_de_Paris)>)

### 5. Porte Maillot

Named for Porte Maillot, historically a gate of the Bois de Boulogne enclosure built under Henri II, not a gate of the Paris fortifications. Opened in 1900 (see the opening-date note) as a loop terminus. A new station about 100 metres away replaced the loop for the Pont de Neuilly extension: the French station article gives 1937, while the English line article dates the new Porte Maillot terminus to 15 November 1936, before the extension opened on 29 April 1937. The origin of "Maillot" itself is uncertain; see editorial decisions.

- [Porte Maillot · Wikipédia](<https://fr.wikipedia.org/wiki/Porte_Maillot_(m%C3%A9tro_de_Paris)>)
- [Porte Maillot (place) · Wikipédia](https://fr.wikipedia.org/wiki/Porte_Maillot)
- [Paris Métro Line 1 · Wikipedia](https://en.wikipedia.org/wiki/Paris_M%C3%A9tro_Line_1)

### 6. Argentine

Originally "Obligado" for a nearby street commemorating an 1845 Franco-British naval victory over Argentine forces; renamed "Argentine" on 25 May 1948, together with the street, after Eva Perón's 1947 visit, to thank Argentina for generous food aid in the early postwar years. Opened 1 September 1900. A 2006 plaque reading "Nunca más" honours the disappeared of Argentina's 1976 to 1983 dictatorship.

- [Argentine · Wikipédia](<https://fr.wikipedia.org/wiki/Argentine_(m%C3%A9tro_de_Paris)>)

### 7. Charles de Gaulle – Étoile

"Étoile" names the star-shaped convergence of avenues at the place; "Charles de Gaulle" was added 30 November 1970, three weeks after his death. Line 1 opened 1 September 1900 under the name "Étoile" alone.

- [Charles de Gaulle – Étoile · Wikipédia](<https://fr.wikipedia.org/wiki/Charles_de_Gaulle_-_%C3%89toile_(m%C3%A9tro_de_Paris)>)
- [Charles de Gaulle–Étoile station · Wikipedia](https://en.wikipedia.org/wiki/Charles_de_Gaulle%E2%80%93%C3%89toile_station)

### 8. George V

Avenue de l'Alma was renamed for the British king on 14 July 1918, honouring a wartime ally; the station adopted the name in 1920. Opened 13 August 1900 as "Alma", after the 1854 Crimean War battle. Its own French Wikipedia article calls it one of only two Paris stations named after a person during that person's lifetime, alongside Montparnasse – Bienvenüe. The dates fit (George V died in 1936), but no second source was found; use only with a qualifier such as "according to".

- [George V · Wikipédia](<https://fr.wikipedia.org/wiki/George_V_(m%C3%A9tro_de_Paris)>)

### 9. Franklin D. Roosevelt

Opened in 1900 as "Marbeuf", after rue Marbeuf and the former Marbeuf garden. It became "Marbeuf – Rond-Point des Champs-Élysées" on 6 October 1942, when a passage joined it to the Line 9 station. It took the name Franklin D. Roosevelt on 30 October 1946, after Avenue Victor-Emmanuel III was renamed Avenue Franklin-D.-Roosevelt: the new name honoured the head of an allied country in the Second World War in place of the king of Italy, an enemy in that war. The station name never itself honoured Victor-Emmanuel III.

- [Franklin D. Roosevelt · Wikipédia](<https://fr.wikipedia.org/wiki/Franklin_D._Roosevelt_(m%C3%A9tro_de_Paris)>)

### 10. Champs-Élysées – Clemenceau

Opened in 1900 as "Champs-Élysées". Renamed 20 May 1931 after the 1930 creation of Place Clemenceau, honouring wartime Prime Minister Georges Clemenceau. Platforms lengthened from 75 to 90 metres between 1963 and 1964.

- [Champs-Élysées – Clemenceau · Wikipédia](<https://fr.wikipedia.org/wiki/Champs-%C3%89lys%C3%A9es_-_Clemenceau_(m%C3%A9tro_de_Paris)>)

### 11. Concorde

Named for the Place de la Concorde. The station article says the square's name was reportedly ("aurait été") chosen by the Directoire to mark reconciliation after the Terror; keep that hedge. Opened 13 August 1900. The Declaration-of-the-Rights-of-Man tilework, by Françoise Schein (1991), is on the connecting Line 12 platforms, not Line 1's. Line 1's platforms were redone in the Andreu-Motte style in Tyrian pink between 1976 and 1979.

- [Concorde · Wikipédia](<https://fr.wikipedia.org/wiki/Concorde_(m%C3%A9tro_de_Paris)>)

### 12. Tuileries

Named for the adjoining Jardin des Tuileries, itself named for the tile factories once on the site. Opened in 1900. Platforms were lengthened from 75 to 90 metres between 1963 and 1964 for six-car MP 59 trains.

- [Tuileries · Wikipédia](<https://fr.wikipedia.org/wiki/Tuileries_(m%C3%A9tro_de_Paris)>)

### 13. Palais-Royal – Musée du Louvre

Named "Palais-Royal" for the adjoining former royal residence. "Musée du Louvre" was added in 1989 to mark the museum's new Pyramid entrance. Opened in 1900. One entrance (exit 5, place Colette) is crowned by Jean-Michel Othoniel's Kiosque des Noctambules, two cupolas of Murano glass beads made for the Métro's centenary and inaugurated in October 2000. It is an entrance canopy above ground, not art inside the station.

- [Palais-Royal – Musée du Louvre · Wikipédia](<https://fr.wikipedia.org/wiki/Palais-Royal_-_Mus%C3%A9e_du_Louvre_(m%C3%A9tro_de_Paris)>)

### 14. Louvre – Rivoli

Originally plain "Louvre", for the rue du Louvre and the old museum entrance by the colonnade. In 1989 the museum entrance moved to the Pyramid and the museum name passed to Palais-Royal; this station became "Louvre – Rivoli" to stress that it serves the rue de Rivoli, whose name commemorates Bonaparte's 1797 victory over Austria. Opened 13 August 1900. Received museum-style decor (artwork copies and historical plans) in September 1968 under Minister of Culture André Malraux.

- [Louvre – Rivoli · Wikipédia](<https://fr.wikipedia.org/wiki/Louvre_-_Rivoli_(m%C3%A9tro_de_Paris)>)

### 15. Châtelet

Named for Place du Châtelet, on the site of the demolished Grand Châtelet fortress, later a court and prison. Line 1's own platforms opened 6 August 1900; trains passed through without stopping until the station was finished.

- [Châtelet · Wikipédia](<https://fr.wikipedia.org/wiki/Ch%C3%A2telet_(m%C3%A9tro_de_Paris)>)

### 16. Hôtel de Ville

Named for the adjoining Paris city hall, seat of Paris's municipal institutions since 1357 according to the station article, and the square of the same name. Opened in 1900.

- [Hôtel de Ville · Wikipédia](<https://fr.wikipedia.org/wiki/H%C3%B4tel_de_Ville_(m%C3%A9tro_de_Paris)>)

### 17. Saint-Paul

Named for the Rue Saint-Paul and the Église Saint-Paul-Saint-Louis, the street itself recalling an earlier church dedicated to Paul of Thebes. Opened 6 August 1900. Its Guimard entrance was damaged by a German Gotha bombing raid on the night of 12 to 13 April 1918 and demolished in 1922.

- [Saint-Paul · Wikipédia](<https://fr.wikipedia.org/wiki/Saint-Paul_(m%C3%A9tro_de_Paris)>)

### 18. Bastille

Named for the square marking the site of the demolished Bastille fortress and prison, stormed in 1789. Line 1's own platforms opened in 1900, on a bridge over the Canal Saint-Martin at the north end of the Arsenal basin; the station article says this position was chosen to avoid the foundations of the July Column.

- [Bastille · Wikipédia](<https://fr.wikipedia.org/wiki/Bastille_(m%C3%A9tro_de_Paris)>)

### 19. Gare de Lyon

Named for the railway terminus it serves, itself named for its route toward Lyon and south-eastern France. Line 1's platforms opened in 1900. The station was built 100 metres long (other Line 1 stations were 75 metres) with four tracks and two central platforms, to receive the circular line of the time as well; that plan was never carried out.

- [Gare de Lyon · Wikipédia](<https://fr.wikipedia.org/wiki/Gare_de_Lyon_(m%C3%A9tro_de_Paris)>)

### 20. Reuilly – Diderot

"Reuilly" comes from the Rue de Reuilly, itself leading to the former Palais de Reuilly. "Diderot" was added on 5 May 1931, when the station's Line 8 platforms opened; it names the boulevard above, renamed for the philosopher Denis Diderot in 1879. The Line 1 station opened 20 August 1900 as plain "Reuilly".

- [Reuilly – Diderot · Wikipédia](<https://fr.wikipedia.org/wiki/Reuilly_-_Diderot_(m%C3%A9tro_de_Paris)>)

### 21. Nation

Named for Place de la Nation, so named for the national holiday of 14 July 1880. It was earlier Place du Trône (after a throne set up there in 1660 for Louis XIV's entry into Paris) and, from 1792, Place du Trône-Renversé. Opened in 1900. Platforms were raised over the weekend of 12 to 13 September 2009 as part of Line 1's automation project.

- [Nation · Wikipédia](<https://fr.wikipedia.org/wiki/Nation_(m%C3%A9tro_de_Paris)>)
- [Place de la Nation · Wikipédia](<https://fr.wikipedia.org/wiki/Place_de_la_Nation_(Paris)>)

### 22. Porte de Vincennes

Named for Porte de Vincennes, a gate of the Thiers wall on the road toward Vincennes. Opened in 1900 as the original eastern terminus, with a distinctive looping double-tunnel layout; lost that role when the line reached Château de Vincennes in 1934.

- [Porte de Vincennes · Wikipédia](<https://fr.wikipedia.org/wiki/Porte_de_Vincennes_(m%C3%A9tro_de_Paris)>)
- [Porte de Vincennes (place) · Wikipédia](https://fr.wikipedia.org/wiki/Porte_de_Vincennes)

### 23. Saint-Mandé

Opened 24 March 1934 as "Tourelle", for the Château de Vincennes' outlying defensive towers; renamed "Saint-Mandé – Tourelle" on 26 April 1937 to mark the Saint-Mandé municipality, after Line 6's Saint-Mandé became Picpus on 1 March 1937; later shortened to plain "Saint-Mandé" (sources give dates from the late 1990s to July 2002). Platforms were raised in May 2008 and fitted with screen doors in 2010 for automation.

- [Saint-Mandé · Wikipédia](<https://fr.wikipedia.org/wiki/Saint-Mand%C3%A9_(m%C3%A9tro_de_Paris)>)
- [Saint-Mandé station · Wikipedia](https://en.wikipedia.org/wiki/Saint-Mand%C3%A9_station)
- [Picpus · Wikipédia](<https://fr.wikipedia.org/wiki/Picpus_(m%C3%A9tro_de_Paris)>)

### 24. Bérault

Named for Place Bérault in Vincennes, honouring Michel Bérault (1796 to 1871), a deputy mayor of the town. Opened 24 March 1934 (the French station article says only 1934; the date comes from the English station article and the extension date). RATP chose it as the prototype station for Line 1's automation renovation; platforms were raised on 28 and 29 July 2008 and it was the first station of the line to receive platform doors on a public platform, in February 2009.

- [Bérault · Wikipédia](<https://fr.wikipedia.org/wiki/B%C3%A9rault_(m%C3%A9tro_de_Paris)>)
- [Place Bérault · Wikipédia](https://fr.wikipedia.org/wiki/Place_B%C3%A9rault)
- [Bérault station · Wikipedia](https://en.wikipedia.org/wiki/B%C3%A9rault_station)

### 25. Château de Vincennes

Named for the adjoining royal château. Opened 24 March 1934 as Line 1's eastern terminus, a role it still holds; the opening date comes from the line article, as the station article gives none. During the automation works the station closed from 24 to 27 September 2009 and Bérault served as temporary terminus.

- [Château de Vincennes · Wikipédia](<https://fr.wikipedia.org/wiki/Ch%C3%A2teau_de_Vincennes_(m%C3%A9tro_de_Paris)>)
- [Ligne 1 du métro de Paris · Wikipédia](https://fr.wikipedia.org/wiki/Ligne_1_du_m%C3%A9tro_de_Paris)

## Validation

- 25 unique station IDs and one ordered path cover every stop once; no branches.
- Every station above has a naming chain, a separate context fact, and an opening date checked against its own source. The opening day of eight original stations is unresolved; see Route and method.
- All source links use HTTPS; every station's own Wikipedia article was opened during the audit, plus both line-level Wikipedia articles.
- Shared IDs `chatelet`, `bastille`, `gare-de-lyon`, `palais-royal-musee-du-louvre`, `charles-de-gaulle-etoile`, `franklin-d-roosevelt` and `nation` were checked against the existing Line 4, 5, 6, 7, 9 and 14 entries for consistent names and facts before reuse.
- No em dashes are used in this document's prose.
- Open questions after verification: exact line length (not used in app data); which eight stations opened on 19 July 1900; the date Saint-Mandé – Tourelle was shortened to Saint-Mandé. Bérault's first name (Michel) and the Porte Maillot framing are resolved in the Verification section.
- Bilingual station text, TypeScript checks, and browser/functional checks belong to the building and review phases that follow this audit.

## Verification

Independent check on 29 September 2026. The verifier opened every station's French Wikipedia article again (through the Wikipedia API text extract), the French and English line articles, and extra sources listed below. Bonjour RATP and the RATP heritage page for Line 1 both returned HTTP 403, so no RATP page could be read directly.

Route: the order of the 25 stations and the termini La Défense and Château de Vincennes are confirmed. Each station article's "Situation" section names its neighbours, and the chain from La Défense to Château de Vincennes has no gaps and no branches. `hasBranches: false` stands.

Corrections made in this document:

1. Opening dates in 1900. The audit gave 19 July 1900 for ten stations while also saying eight opened that day. Line-level sources (French and English Wikipedia, Herodote) say eight; station articles add up to ten. The doc now records the conflict and tells the building phase to write "1900" for the eight non-terminus stations concerned. Fixed the stray word "Coach" in that paragraph.
2. Automation date. "Completed 15 December 2012" is qualified: English Wikipedia also gives 21 December 2012 (last manual trains withdrawn) and 16 February 2013 (fully automated).
3. Porte Maillot, naming. The audit called it a former Paris fortification gate. The French article on the place says it was a gate of the Bois de Boulogne enclosure built under Henri II; the Thiers-wall gate here was the porte de Neuilly. Corrected.
4. Porte Maillot, name origin. The audit told the building phase to lead with the 1382 Maillotins revolt. The source states that preference without a citation and bases it on an inference from the later "route de la Révolte"; the name is recorded as "porte Mahiaulx" in the 16th century. The doc now says the origin is uncertain and both explanations must be framed as proposals.
5. Porte Maillot, relocation. "Relocated in 1937" now notes that English Wikipedia dates the new terminus to 15 November 1936.
6. Esplanade de La Défense. "Built inside one bore of an A14 highway tunnel" did not match the source. The source says the station encroaches on the A14 tunnel, which lost one lane in each direction; that is why the station is narrow with an island platform. Added the project name Puteaux – Courbevoie.
7. Argentine. Added the source's stated occasion for the 1948 renaming (Eva Perón's 1947 visit; street renamed at the same time).
8. Franklin D. Roosevelt. The audit skipped the intermediate name Marbeuf – Rond-Point des Champs-Élysées (6 October 1942). Added it, and made clear that the station never carried Victor-Emmanuel III's name; only the avenue did.
9. Concorde. The Directoire naming is hedged in the source ("aurait été"); the hedge is now kept. Added the artist and year of the Line 12 tilework (Françoise Schein, 1991).
10. Palais-Royal – Musée du Louvre. "Houses" the Kiosque des Noctambules was misleading: it is an entrance canopy over exit 5 on place Colette, inaugurated in October 2000.
11. Louvre – Rivoli. The audit said the rename distinguished it from Palais-Royal. The source says that in 1989 the museum entrance moved to the Pyramid, the museum name went to Palais-Royal, and this station became Louvre – Rivoli to stress that it serves rue de Rivoli. Corrected, and the 1989 date added.
12. Bastille. "Viaduct ... specifically to avoid" the July Column now attributes that reason to the station article and places the bridge at the north end of the Arsenal basin.
13. Gare de Lyon. Added that the 100-metre station had four tracks and two central platforms for the circular line of the time. This does not conflict with the Line 14 entry (Line 1 platforms under boulevard Diderot, confirmed by the Line 1 station article).
14. Reuilly – Diderot. Fixed the sentence that said the boulevard gained Line 8 platforms; the station did, on 5 May 1931, when it was renamed.
15. Nation. Added a source for the earlier names (Place du Trône from 1660, Place du Trône-Renversé from 1792) and the 14 July 1880 naming.
16. Porte de Vincennes. Added a source showing it is a Thiers-wall gate.
17. Saint-Mandé. "Renamed two days later" was wrong. Three sources give 26 April 1937 for Saint-Mandé – Tourelle, after Line 6's Saint-Mandé became Picpus on 1 March 1937. The French station article's "26 avril 1934" is treated as an error. The shortening to Saint-Mandé is dated late 1990s, 16 July 2002 or 26 July 2002 depending on the source; the doc now gives the range.
18. Bérault. First name found: Michel Bérault (1796–1871), per the French article on Place Bérault and the English station article. The Bérault Stuart d'Aubigny link in the English article is single-source and marked as optional with a qualifier. Clarified that Bérault was the automation prototype and the first station with platform doors on a public platform (February 2009), per the French line article.
19. Château de Vincennes. The station article gives no opening date; the date now cites the line article. Added a sourced context fact (closure 24 to 27 September 2009 during automation works).
20. George V. Kept the "one of only two" claim as single-source and qualified; no corroboration found.

Checked and confirmed without change: La Défense (renamed 1997), Pont de Neuilly (Avenue de Madrid suffix 1940 to 1950), Les Sablons (sand quarries; Jacques Barrot died after collapsing in the station on 3 December 2014), Charles de Gaulle – Étoile (renamed 30 November 1970), George V (Alma until 27 May 1920; avenue renamed 14 July 1918), Champs-Élysées – Clemenceau (renamed 20 May 1931; platforms lengthened 1963 to 1964), Tuileries, Châtelet (6 August 1900), Hôtel de Ville, Saint-Paul (Paul of Thebes; Gotha raid of 12 to 13 April 1918; entrance demolished 1922). Shared IDs `chatelet`, `bastille`, `gare-de-lyon`, `palais-royal-musee-du-louvre`, `charles-de-gaulle-etoile`, `franklin-d-roosevelt` and `nation` match the existing Line 4, 5, 6, 7, 9 and 14 entries, and the facts above do not contradict them.

Still unresolved:

- Which eight stations opened on 19 July 1900 (see correction 1).
- The exact date Saint-Mandé – Tourelle became Saint-Mandé.
- The origin of the word "Maillot".
- Line length (16.5 km in English Wikipedia; not used in app data).
- The George V "one of only two" claim has one source only.

Additional sources opened during verification:

- [Porte Maillot (place) · Wikipédia](https://fr.wikipedia.org/wiki/Porte_Maillot)
- [Place Bérault · Wikipédia](https://fr.wikipedia.org/wiki/Place_B%C3%A9rault)
- [Bérault station · Wikipedia](https://en.wikipedia.org/wiki/B%C3%A9rault_station)
- [Saint-Mandé station · Wikipedia](https://en.wikipedia.org/wiki/Saint-Mand%C3%A9_station)
- [Picpus · Wikipédia](<https://fr.wikipedia.org/wiki/Picpus_(m%C3%A9tro_de_Paris)>)
- [Place de la Nation · Wikipédia](<https://fr.wikipedia.org/wiki/Place_de_la_Nation_(Paris)>)
- [Porte de Vincennes (place) · Wikipédia](https://fr.wikipedia.org/wiki/Porte_de_Vincennes)
- [Franklin D. Roosevelt station · Wikipedia](https://en.wikipedia.org/wiki/Franklin_D._Roosevelt_station)
- [Tuileries station · Wikipedia](https://en.wikipedia.org/wiki/Tuileries_station)
- [Porte Maillot station · Wikipedia](https://en.wikipedia.org/wiki/Porte_Maillot_station)
- [19 juillet 1900, inauguration du métro · Herodote](https://www.herodote.net/19_juillet_1900-evenement-19000719.php)

## Review fixes

The Line 1 review replaced four context facts that did not add new information. Each new fact comes from the station's own French Wikipedia article, opened on 29 September 2026:

- Charles de Gaulle – Étoile: Line 1 platforms opened 1 September 1900, more than a month after the first section; the Line 6 terminus is a loop beneath the square, with a narrow platform for getting off and a wider one for boarding.
- Hôtel de Ville: since 1994, a plaque near the access to the Line 1 platforms marks the fiftieth anniversary of the strike by 3,000 employees of the Compagnie du chemin de fer métropolitain de Paris on 16 August 1944. The app writes "opened in 1900" (see correction 1).
- Champs-Élysées – Clemenceau: since 1995, the corridor between Lines 1 and 13 has shown the *Azulejo géométrique* tile decor by Manuel Cargaleiro, from an artistic exchange between the Lisbon Metro and the RATP.
- Reuilly – Diderot: Line 1 platforms raised on the weekend of 31 May to 1 June 2008; platform screen doors installed in March 2011.
- Pont de Neuilly: the bridge was widened from 1988 to 1992 for the Line 1 extension to La Défense ([Pont de Neuilly · Wikipédia](https://fr.wikipedia.org/wiki/Pont_de_Neuilly)).

Every station now carries its opening year (1900, 1934, 1937 or 1992) in the `opened` field. The years do not depend on the open question about 19 July 1900.

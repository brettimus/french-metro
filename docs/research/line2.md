# Line 2 source audit

Checked 6 October 2026. Scope: all 25 current stations, English and French. The route runs from Porte Dauphine to Nation, with one continuous path and no branches. Verified by a second agent on 6 October 2026 (plan step B2); see Corrections at the end.

## Route and method

`ratp.fr` returns HTTP 403 to scripts, so it is not used as a source. The stop list comes from the official open data of Île-de-France Mobilités, the regional transport authority: its [arrets-lignes dataset](https://data.iledefrance-mobilites.fr/explore/dataset/arrets-lignes/), filtered to mode Metro and line 2 (query run 6 October 2026), returns 50 records (one per direction) with exactly the 25 distinct stop names below. The verifier re-ran the query through the dataset API on 6 October 2026: Line 2 gives 50 records and 25 names, Line 3 gives 50 records and 25 names, Line 11 gives 38 records and 19 names. Station order was confirmed by chaining the neighbour stations that each French station article names in its Situation section, and against the [French Wikipedia Line 2 article](https://fr.wikipedia.org/wiki/Ligne_2_du_m%C3%A9tro_de_Paris) (list of stations, west to east) and the [English Wikipedia Line 2 article](https://en.wikipedia.org/wiki/Paris_M%C3%A9tro_Line_2). Both articles give the same two termini and say that the route has not changed since 2 April 1903.

Line facts used for the summary:

- The line runs in a semicircle across the north of Paris, almost entirely along the former boulevards extérieurs (fr line article: "parcours semi-circulaire au nord de la ville, situé en quasi-totalité sur les anciens boulevards extérieurs"). The fr line article does not name the Fermiers généraux wall; the Courcelles, Place de Clichy and La Chapelle station articles each place a former barrier of that wall at the station site. With Line 6 it forms a pair of ring lines; both meet at Charles de Gaulle – Étoile and Nation (fr line article). Line 6 took over Étoile – Place d'Italie in 1942, which made Lines 2 and 6 symmetric.
- Near 2 km of the line is on viaduct, about 20% of its length, with four elevated stations: Barbès – Rochechouart, La Chapelle, Stalingrad and Jaurès. The viaduct crosses the Nord and Est railway cuttings and the Canal Saint-Martin (fr line article, "Une idée originale de construction : le passage aérien").
- Opening stages: 13 December 1900 Porte Dauphine – Étoile, as "ligne 2 Nord"; 7 October 1902 Étoile – Anvers (the fr line article calls it the first extension of an existing line in Métro history); 31 January 1903 Anvers – Rue de Bagnolet (now Alexandre Dumas); 2 April 1903 to Nation. Both termini turn trains on loops.
- 10 August 1903: fire on a train of wooden M1 stock, 84 dead, 75 of them at Couronnes. It is the deadliest event in the history of the Métro (fr and en line articles; [Paris Métro train fire · Wikipedia](https://en.wikipedia.org/wiki/Paris_M%C3%A9tro_train_fire)).
- The line does not cross the Seine. No `riverCrossings["2"]` key is needed in map.ts.

Closed and ghost stations excluded from the count:

- The original Victor Hugo station, on a sharp curve under Place Victor-Hugo, was abandoned in 1931 when the station was rebuilt on straight track to the north-east. It is visible from the west end of the current platforms but is not a separate stop ([Victor Hugo · Wikipédia](https://fr.wikipedia.org/wiki/Victor_Hugo_(m%C3%A9tro_de_Paris)); fr line article).
- Gare du Nord USFRT, on the old Line 5 terminal loop, is reached by the service connection that leaves Line 2 near Anvers. It closed to passengers in 1942, was never a Line 2 stop and now trains Métro drivers ([Anvers · Wikipédia](https://fr.wikipedia.org/wiki/Anvers_(m%C3%A9tro_de_Paris))).
- Service connections (Boissière to Line 1, the Line 3 link at Père Lachaise, the Line 4/5 link) are not stations.

Every station article listed below was read in French through the MediaWiki API (plain-text extracts, fetched 6 October 2026, generic User-Agent). Name-origin claims were checked against the namesake article (street, square, place or person) where one exists. Opening dates come from each station's own article, not from the section date, because seven stations opened days or weeks after their section while trains passed through without stopping.

## Editorial decisions

### Shared station IDs and owners

The owner of a shared id is the first line in `lines` order (1, 2, 3, 4, 5, 6, 7, 9, 11, 14) that has the id. Line 2 copies `name` and `etymology.en/fr` byte for byte from the file that holds the strings today, and writes its own `context`, `opened`, `sources` and `art`.

| Id | Lines | Owner after Line 2 is added | Copy strings from |
|---|---|---|---|
| `charles-de-gaulle-etoile` | 1, 2, 6 | Line 1 (no change) | line1.ts |
| `nation` | 1, 2, 6, 9 | Line 1 (no change) | line1.ts |
| `barbes-rochechouart` | 2, 4 | Line 2 (was Line 4) | line4.ts |
| `stalingrad` | 2, 5, 7 | Line 2 (was Line 5) | line5.ts |
| `jaures` | 2, 5 | Line 2 (was Line 5) | line5.ts |
| `villiers` | 2, 3 | Line 2 (Line 3 writes it first) | line3.ts |
| `pere-lachaise` | 2, 3 | Line 2 (Line 3 writes it first) | line3.ts |
| `belleville` | 2, 11 | Line 2 (Line 11 writes it first) | line11.ts |

Line 2 becomes the owner of six ids. After this change, a copy or fact fix to the etymology of any of them must update every file that holds it in the same commit (plan section 3, "Ownership changes").

Not shared yet: Place de Clichy (future Line 13), Pigalle (future Line 12), Jaurès on Line 7 bis. No ids exist for them in the atlas; Line 2 creates `place-de-clichy` and `pigalle`.

Slugs follow the existing style (lowercase ASCII, accents removed, spaces and dashes to "-"). No Line 2 name has an apostrophe.

### Conflicts with existing atlas copy (checked against apps/web/src/data/line*.ts)

- **Charles de Gaulle – Étoile (line1.ts, line6.ts).** Etymology says de Gaulle's name was added on 30 November 1970. The station article agrees. The fr line article ("Stations ayant changé de nom") says "février 1970", which is wrong: de Gaulle died on 9 November 1970. Keep 30 November 1970. The Line 1 context covers the Line 1 platforms and the Line 6 loop; Line 2 context must cover only the Line 2 platforms.
- **Nation (line1.ts, line6.ts, line9.ts).** Line 9 context: "the only Métro station that is the terminus of two lines, 2 and 6". Line 6 context: "described as the only Métro station where two lines, 2 and 6, both terminate on loops", and its Line 6 platforms are "the only ones at Nation not built on a curve". The Nation article agrees with all three. Line 2 context must not repeat the two-termini fact a third time; use the 1903 opening, the island platform on the loop, or the metal deck instead.
- **Barbès – Rochechouart (line4.ts).** Line 4 context: first called Boulevard Barbès, Rochechouart added in 1907. The station article gives 15 October 1907. No conflict. The research note proposed the 21 August 1941 Colonel Fabien attack as Line 2 context, but the station article places it on the Line 4 platform (direction Porte d'Orléans, where display cases now recall it). Do not present it as a Line 2 platform event; the 1903 fire, which began on a Line 2 train in this elevated station, is a better Line 2 fact.
- **Stalingrad (line5.ts, line7.ts).** Line 5: renamed 1946, Line 5 arrived four years earlier and passages joined it to Lines 2 and 7. Line 7: Line 7 platforms first named Boulevard de la Villette, passages to Lines 2 and 5 in 1942, combined name Stalingrad in 1946. Both agree with the station article (12 October 1942; 10 February 1946). Line 2 context can add what neither says: the Line 2 station opened in 1903 on the viaduct as Rue d'Aubervilliers, and the 1942–1946 combined name was Aubervilliers – Boulevard de la Villette.
- **Jaurès (line5.ts).** Etymology: renamed 1 August 1914, the day after Jaurès's assassination. Context: former name Rue d'Allemagne, renamed before the avenue became Avenue Jean-Jaurès later that month (station article: 19 August 1914), Line 5 joined in 1942. No conflict. Line 2 context must not repeat Rue d'Allemagne or 1914; use the 1989 Ducatez stained glass or "last elevated station towards Nation".
- **Iéna (line9.ts)** says Rome is one of four four-letter station names, with Cité and Haxo. The Rome article agrees.
- **Porte de Clichy (line14.ts)** explains a gate of the Thiers fortifications. Place de Clichy is a different structure: the Barrière de Clichy of the older Fermiers généraux wall. Do not reuse the Line 14 wording.
- **Buzenval (line9.ts)** mentions the Palais Avron cinema. Avron context should not repeat it.
- **Belleville.** The Line 11 research note says the December 2015 Paris council vote for "Belleville – Commune de Paris 1871" was never applied. Keep the same position: not an official name.
- **Four arrondissements.** Place de Clichy and Belleville are, per both station articles, the only two stations on four arrondissements. Use the fact in only one context. If Line 11 already uses it for Belleville, do not use it for Place de Clichy either, or use it only on Place de Clichy and state the pair.

### Qualified etymologies

- **Blanche.** The station article states the plaster-cart origin as fact. The [Rue Blanche article](https://fr.wikipedia.org/wiki/Rue_Blanche) says "probablement" and also records an earlier name, "rue de la Croix-Blanche" (1672 plan), after a cabaret sign. Write "probably" for the plaster origin, or give both.
- **Ternes.** The [Quartier des Ternes article](https://fr.wikipedia.org/wiki/Quartier_des_Ternes) calls Latin *villa externa* ("outlying farm") > "Estern" > "Ternes" "l'explication la plus communément admise". Write "most likely" or "usually explained as". The station article gives only the hamlet.
- **Couronnes.** The station article and the [Rue des Couronnes article](https://fr.wikipedia.org/wiki/Rue_des_Couronnes) say the street takes its name from a locality "les Couronnes sous Savies", Savies being the name of Belleville from the 7th to the early 18th century, meaning "montagne sauvage" in Frankish. The [Belleville (Seine) article](https://fr.wikipedia.org/wiki/Belleville_(Seine)) has a garbled sentence that calls the same word both "montagne sauvage" and a hydronym meaning "écoulement". Do not translate Savies. The meaning of "Couronnes" itself is not given anywhere.
- **Ménilmontant.** The station article explains only that the boulevard and street recall the former village (the street was its main road). The [Rue de Ménilmontant article](https://fr.wikipedia.org/wiki/Rue_de_M%C3%A9nilmontant) gives an unfootnoted origin from *mesnil* and a 1224 charter form *mesnolium mali temporis* ("mesnil du mauvais temps"). Use it only with attribution, or do not explain the word.
- **Monceau.** The station article says the park recalls the former village of Monceau, a 15th-century bourgade north-west of the park. The word itself is not explained. The [Parc Monceau article](https://fr.wikipedia.org/wiki/Parc_Monceau) uses the old spelling "Mousseau". Do not explain the word.
- **Courcelles.** The street led to the hamlet of Courcelles through the Barrière de Courcelles, at the station site. Do not explain the word.
- **Villiers.** The opening date (27 January 1903) and first name ("Avenue de Villiers") carry "[réf. nécessaire]" in the station article. The [Père Lachaise article](https://fr.wikipedia.org/wiki/P%C3%A8re_Lachaise_(m%C3%A9tro_de_Paris)) independently names Line 3's 1904 terminus "Avenue de Villiers (aujourd'hui Villiers)", which supports the old name. The date of the change to "Villiers" is unknown: do not state it. The *villare* etymology is in both the station article and the [Villiers-la-Garenne article](https://fr.wikipedia.org/wiki/Villiers-la-Garenne) ("domaine rural").
- **La Chapelle.** Sources differ on the chapel: the station article says a chapel dedicated to Saint Genevieve; the [La Chapelle (Seine) article](https://fr.wikipedia.org/wiki/La_Chapelle_(Seine)) says an oratory that Saint Genevieve had built in honour of Saint Denis. Write "named after an early chapel" without the dedication, or attribute each version.
- **Colonel Fabien / Combat.** The station article says the first name came from Place du Combat, after animal fights held there from 1778 to 1850. The [Place du Colonel-Fabien article](https://fr.wikipedia.org/wiki/Place_du_Colonel-Fabien_(Paris)) says the site was the Barrière du Combat and became "place du Combat" only on 12 August 1903, after the station opened (31 January 1903). Write "after the Combat area, named for the animal fights held at the old city barrier from 1778", not "after Place du Combat".

### Spelling

- Names follow the IDFM dataset and the station article titles. Both write compound names with a spaced hyphen ("Barbès - Rochechouart"); the atlas style uses a spaced en dash in its place: "Charles de Gaulle – Étoile", "Barbès – Rochechouart". "Père Lachaise", "Philippe Auguste", "Alexandre Dumas", "Colonel Fabien" and "Victor Hugo" have no hyphen on signage (the streets and the cemetery are hyphenated: Père-Lachaise, avenue Philippe-Auguste).
- Porte Dauphine has the subtitle "Maréchal de Lattre de Tassigny", which is not on maps (station article). Anvers has the subtitle "Sacré-Cœur". Use the plain names; mention a subtitle only in context.
- The person is "François d'Aix de La Chaise" (the article page title); the article text spells "La Chaize" throughout. The station is "Père Lachaise". Use the station spelling for the name.

## Source conflicts and values chosen

| Fact | Sources disagree | Value chosen |
|---|---|---|
| First section opening | fr line article body and en line article: "3 décembre 1900"; fr chronology, en chronology and all station articles: 13 December 1900 | 13 December 1900 |
| Ligne 2 Nord renamed Ligne 2 | fr and en line articles: 14 October 1907; every station article: 17 October 1907 (2 Sud absorbed into Line 5 on 14 October) | Write "October 1907" |
| Étoile renamed Charles de Gaulle – Étoile | fr line article: "février 1970"; station article and line1.ts: 30 November 1970 | 30 November 1970 |
| Anvers terminus ended | Anvers article: extension to Bagnolet on 2 April 1903; line article, La Chapelle and other station articles: 31 January 1903 (2 April is the Nation extension) | 31 January 1903 |
| Length | fr line article: 12.4 km; en line article: 12.3 km | Write "about 12 km", or cite the fr value with its source |
| Where the 1903 fire started | fr chronology: short circuit "à Ménilmontant"; fr line article body, Barbès article and en fire article: smoke from a motor at Boulevard Barbès, fire flared again near Ménilmontant, smoke killed most victims at Couronnes | Started at Barbès; 84 dead: 75 at Couronnes, 7 at Ménilmontant, 2 in the tunnel (fr line article) |
| Stalingrad's first name | fr line article: "Aubervilliers"; station article: "Rue d'Aubervilliers" (after the street to the village of Aubervilliers) | Rue d'Aubervilliers |
| Alexandre Dumas's first name | fr line article and other station articles: "Rue de Bagnolet"; Alexandre Dumas article: "Bagnolet"; en line article: "Bagnolet" | Rue de Bagnolet; mention that some sources shorten it |
| Alexandre Dumas's birth year | [Rue Alexandre-Dumas article](https://fr.wikipedia.org/wiki/Rue_Alexandre-Dumas): 1815; station article and the [Alexandre Dumas article](https://fr.wikipedia.org/wiki/Alexandre_Dumas): 1802 | 1802–1870 |
| Philippe Auguste's dates | Station article gives "(1180-1223)", which is his reign; the king article: born 1165, died 1223 | Reign 1180–1223 if dates are given |
| Pigalle and the street | Station article: the sculptor lived on the street "de 1714 à 1785" (his lifespan); [Jean-Baptiste Pigalle article](https://fr.wikipedia.org/wiki/Jean-Baptiste_Pigalle): the street, named in 1803, was where he had his workshop; he lived on rue Meslay | "where he had his workshop" |
| Combat renamed | Station article: station and place renamed 19 August 1945; place article: arrêté of 7 July 1945 for the place | Station: 19 August 1945; do not date the place |
| Ridership | fr line article: 92.26 million in 2025 (10th); en: 105.2 million in 2017 (9th) | Do not use, or cite fr 2025 value |
| Belleville annexation | Belleville (Seine) article: law of 16 June 1859, effective 1860 | "annexed to Paris in 1860" |
| Deaths at Couronnes | fr line article and en fire article: 75 at Couronnes, 7 at Ménilmontant, 2 in the tunnel; Ménilmontant station article: 7 at Ménilmontant and 77 others at Couronnes; fr line article also says firemen counted 77 bodies at Couronnes | 75 at Couronnes, 84 in total |
| Aubervilliers – Boulevard de la Villette name | fr line article: 6 October 1942; Stalingrad article: with the 12 October 1942 opening of Line 5, no separate date | "October 1942" |

## Station checks and sources

### 1. Porte Dauphine

Named for the Porte Dauphine, under Place du Maréchal-de-Lattre-de-Tassigny. The station article says the gate stood at the end of Marie-Antoinette's Belle Faisanderie, when she was the wife of the dauphin; the [Porte Dauphine article](https://fr.wikipedia.org/wiki/Porte_Dauphine) says she became dauphine by her marriage in 1770 and that the gate gave its name to the Porte-Dauphine quarter and to Université Paris-Dauphine. The research note says "gate of the Thiers fortifications"; no fetched source says this, so do not state it (the Porte Dauphine article only lists "Bastions de l'enceinte de Thiers" under related articles). Opened 13 December 1900 as the western terminus of the first section of Ligne 2 Nord. Turning loop of 30 m radius, the tightest on the network (fr line article). Entrance 3 has the only original Guimard closed pavilion with its Art Nouveau glass canopy, listed as a historic monument on 12 February 2016 and restored in October 1999 for the Métro centenary (station article). The Porte Dauphine article adds that it is the last Guimard closed pavilion the RATP did not destroy and the last with intact enamelled lava panels. The fr line article says the platforms and corridors keep glazed brick ("briques vernissés"), the facing used before the white bevelled tile. The station article instead describes the original finish as flat cream-coloured tiles ("carreaux plats de couleur crème"), one of the experimental finishes of 1900. The sources disagree on the material: write "original 1900 wall finish, older than the white bevelled tile" and do not say brick. Subtitle Maréchal de Lattre de Tassigny is not on maps.

- [Porte Dauphine · Wikipédia](https://fr.wikipedia.org/wiki/Porte_Dauphine_(m%C3%A9tro_de_Paris))
- [Porte Dauphine (porte) · Wikipédia](https://fr.wikipedia.org/wiki/Porte_Dauphine)
- [Jean de Lattre de Tassigny · Wikipédia](https://fr.wikipedia.org/wiki/Jean_de_Lattre_de_Tassigny)

### 2. Victor Hugo

Named for Place Victor-Hugo and Avenue Victor-Hugo, which honour the writer Victor Hugo (1802–1885). The [Avenue Victor-Hugo article](https://fr.wikipedia.org/wiki/Avenue_Victor-Hugo_(Paris)) says the avenue (earlier Avenue d'Eylau) took his name in 1881 and that he lived his last years in a house on it, then no. 50, now no. 124. Do not say he died there; the source says only that he lived there. Opened 13 December 1900 with the first section. Rebuilt in 1931 on straight track north-east of the original site (the station article gives no distance; the new station partly occupies the end of the old platforms) because the original curved platforms were unsafe with the longer new cars; the old station is visible from the west end of the platforms. A small display case on the Nation-bound platform pays tribute to Hugo (fr line article). Entrance 1 has a Guimard entrance listed on 29 May 1978.

- [Victor Hugo · Wikipédia](https://fr.wikipedia.org/wiki/Victor_Hugo_(m%C3%A9tro_de_Paris))
- [Avenue Victor-Hugo · Wikipédia](https://fr.wikipedia.org/wiki/Avenue_Victor-Hugo_(Paris))

### 3. Charles de Gaulle – Étoile (shared, owner Line 1)

Name and etymology: copy from line1.ts. The Line 2 platforms opened 13 December 1900 and were the temporary eastern terminus of Ligne 2 Nord until the extension to Anvers on 7 October 1902; trains reversed on a siding (fr line article). They lie at the lowest level, almost at right angles to the Line 1 and Line 6 platforms, under the start of Avenue de Wagram. Unlike the Line 1 platforms, the 75 m Line 2 platforms keep the orange 1970s "Mouton-Duvernet" tiling. The Boissière service connection once linked the Line 1 track to the Line 2 track towards Porte Dauphine; it has been closed off since the automation of Line 1 (station article). No fetched source says how it was used in 1900, so do not state that. `opened`: 1900.

- [Charles de Gaulle - Étoile · Wikipédia](https://fr.wikipedia.org/wiki/Charles_de_Gaulle_-_%C3%89toile_(m%C3%A9tro_de_Paris))
- [Charles de Gaulle–Étoile station · Wikipedia](https://en.wikipedia.org/wiki/Charles_de_Gaulle%E2%80%93%C3%89toile_station)

### 4. Ternes

Named for Place des Ternes and Avenue des Ternes, which recall the former hamlet of Les Ternes, now the Ternes quarter. Qualified etymology: Latin *villa externa*, "the most commonly accepted explanation" per the quarter article (see Editorial decisions). The quarter article says Les Ternes belonged to Neuilly until the Thiers wall cut the commune in two (1840s) and gives 1863 for the annexation to Paris, which differs from the usual 1860 date of the annexations; do not date the annexation. Opened 7 October 1902 with Étoile – Anvers. Curved platforms under the square. Entrance 2, in the middle of the square, keeps its Guimard entrance, listed on 25 July 1965, protection renewed on 12 February 2016; the other two entrances have plainer, more recent green steel balustrades (station article). The station article does not say when or whether those two lost Guimard surrounds, so do not date it.

- [Ternes · Wikipédia](https://fr.wikipedia.org/wiki/Ternes_(m%C3%A9tro_de_Paris))
- [Quartier des Ternes · Wikipédia](https://fr.wikipedia.org/wiki/Quartier_des_Ternes)

### 5. Courcelles

Named for the crossing of Boulevard de Courcelles and Rue de Courcelles. The street led to the hamlet of Courcelles through the Barrière de Courcelles, a gate of the Fermiers généraux wall that stood where the station is now (station article; [Rue de Courcelles article](https://fr.wikipedia.org/wiki/Rue_de_Courcelles): "la route qui conduisait directement au hameau de Courcelles"). The research note says the hamlet was in the parish of Clichy and was absorbed by Levallois-Perret in 1866. The Rue de Courcelles article confirms both: the street took the hamlet's name in 1769, "dépendant de la paroisse de Clichy, et qui fut absorbé par la commune de Levallois-Perret en 1866". The fact can be used with that source. Opened 7 October 1902. Its Guimard entrances were replaced by plainer surrounds in the 1960s.

- [Courcelles · Wikipédia](https://fr.wikipedia.org/wiki/Courcelles_(m%C3%A9tro_de_Paris))
- [Rue de Courcelles · Wikipédia](https://fr.wikipedia.org/wiki/Rue_de_Courcelles)

### 6. Monceau

Named for Parc Monceau, whose name recalls the former village of Monceau, north-west of the present park, a small town in the 15th century (station article). The station is under Boulevard de Courcelles at the park's main entrance (Place de la République-Dominicaine). It is very close to the former Line 3 turning loop under the park, used from 1904 to 1910 (station article; Villiers article). Opened 7 October 1902.

- [Monceau · Wikipédia](https://fr.wikipedia.org/wiki/Monceau_(m%C3%A9tro_de_Paris))
- [Parc Monceau · Wikipédia](https://fr.wikipedia.org/wiki/Parc_Monceau)

### 7. Villiers (shared, owner Line 2; Line 3 writes it first)

Name and etymology: copy from line3.ts when Line 3 is in place. Facts: named for Avenue de Villiers, which led to the former village of Villiers-la-Garenne; the village centre was at today's Place de la Libération in Levallois-Perret, and the name comes from Latin *villare*, "rural estate" ([Villiers-la-Garenne article](https://fr.wikipedia.org/wiki/Villiers-la-Garenne); [Avenue de Villiers article](https://fr.wikipedia.org/wiki/Avenue_de_Villiers)). Opened as Avenue de Villiers, some months after the 7 October 1902 section; the station article gives 27 January 1903 with "[réf. nécessaire]". `opened`: 1903. (The fr line article says only that some stations unfinished in 1902 opened with the Nation extension; it does not name them, so it does not confirm the Villiers date.) The Line 3 platforms were built at the same time, side by side; when a shared trunk was abandoned, the Line 3 track was lowered 1.6 m to pass under Line 2, which explains the high Line 3 vault. Édouard Vuillard made sketches of the station in 1916 and 1917. Line 2 context should be about the Line 2 platforms or the joint construction, and must agree with whatever Line 3 writes.

- [Villiers · Wikipédia](https://fr.wikipedia.org/wiki/Villiers_(m%C3%A9tro_de_Paris))
- [Avenue de Villiers · Wikipédia](https://fr.wikipedia.org/wiki/Avenue_de_Villiers)
- [Villiers-la-Garenne · Wikipédia](https://fr.wikipedia.org/wiki/Villiers-la-Garenne)

### 8. Rome

Named for Rue de Rome, after the Italian capital. The station is in the Europe quarter, whose streets carry the names of European cities ([Rue de Rome article](https://fr.wikipedia.org/wiki/Rue_de_Rome_(Paris)); station article). Opened 6 November 1902, a month after its section. West of the station, between Villiers and Rome, the line crosses the Saint-Lazare railway cutting in a tunnel hung under the road deck (the station article places Rome "à l'est de la tranchée ferroviaire"; the fr line article reaches Rome after the crossing); this dates from the 1923–1925 demolition of the Batignolles tunnel, when the line was rebuilt in a steel box built into the road bridge (fr line article). With Nation, it is one of the only two underground Line 2 stations with a metal roof ("couverture métallique") instead of a vault (fr line article). One of four station names with four letters, with Iéna, Cité and Haxo (agrees with line9.ts). Line 14 passes deep below without a station; IDFM has reserved a possible station site.

- [Rome · Wikipédia](https://fr.wikipedia.org/wiki/Rome_(m%C3%A9tro_de_Paris))
- [Rue de Rome · Wikipédia](https://fr.wikipedia.org/wiki/Rue_de_Rome_(Paris))

### 9. Place de Clichy

Named for Place de Clichy, on the site of the Barrière de Clichy, a gate in the Fermiers généraux wall that was the exit towards the village of Clichy ([Place de Clichy article](https://fr.wikipedia.org/wiki/Place_de_Clichy); station article). Not the same as the Thiers-wall gate explained for Porte de Clichy in line14.ts. Opened 26 October 1902, almost three weeks after its section. The Line 13 platforms (Nord-Sud line B) followed on 26 February 1911. One of the only two stations on four arrondissements, with Belleville (see Editorial decisions). Line 2 platforms are blue Andreu-Motte (1974–1984 programme).

- [Place de Clichy · Wikipédia](https://fr.wikipedia.org/wiki/Place_de_Clichy_(m%C3%A9tro_de_Paris))
- [Place de Clichy (place) · Wikipédia](https://fr.wikipedia.org/wiki/Place_de_Clichy)

### 10. Blanche

Named for Place Blanche and Rue Blanche. Qualified etymology: Rue Blanche "probably" owes its name to 17th-century carts of Montmartre plaster that left white dust; it appears on a 1672 plan as "rue de la Croix-Blanche", after a cabaret sign, and took its present name in 1793 ([Rue Blanche article](https://fr.wikipedia.org/wiki/Rue_Blanche)). Opened 21 October 1902, two weeks after its section. The fr line article lists Blanche and Pigalle as the stations for the Pigalle quarter and the Moulin-Rouge, and Blanche and Place de Clichy for the Montmartre cemetery. A dead-end siding precedes the station towards Porte Dauphine.

- [Blanche · Wikipédia](https://fr.wikipedia.org/wiki/Blanche_(m%C3%A9tro_de_Paris))
- [Rue Blanche · Wikipédia](https://fr.wikipedia.org/wiki/Rue_Blanche)

### 11. Pigalle

Named for Place Pigalle and Rue Jean-Baptiste-Pigalle (formerly Rue Pigalle), for the sculptor Jean-Baptiste Pigalle (1714–1785). The street took his name in 1803; it was where he had his workshop ([Jean-Baptiste Pigalle article](https://fr.wikipedia.org/wiki/Jean-Baptiste_Pigalle); see conflict table). The square in turn gave its name to the Pigalle quarter. Opened 7 October 1902. The Line 12 platforms (Nord-Sud line A) opened 8 April 1911 and lie below, crossing under the Line 2 tunnel at right angles. The main entrance, east of the square, leads only to Line 2 and has a Guimard entrance (station article, Accès section). Line 2 platforms are blue "Ouï-dire" style after 1988.

- [Pigalle · Wikipédia](https://fr.wikipedia.org/wiki/Pigalle_(m%C3%A9tro_de_Paris))
- [Jean-Baptiste Pigalle · Wikipédia](https://fr.wikipedia.org/wiki/Jean-Baptiste_Pigalle)

### 12. Anvers

Named for Place d'Anvers and Square d'Anvers, after the Belgian city of Antwerp (Anvers in French), where French troops defeated the Dutch at the siege of the citadel of Antwerp, 15 November to 23 December 1832 ([siege article](https://fr.wikipedia.org/wiki/Si%C3%A8ge_de_la_citadelle_d%27Anvers_(1832))). Opened 7 October 1902 as the temporary eastern terminus; it stayed the terminus until 31 January 1903 (see conflict table; the Anvers article wrongly says 2 April). Subtitle Sacré-Cœur, for the basilica up the hill. Last underground station before the viaduct towards Nation. Single entrance with a Guimard surround, listed 29 May 1978. When the Montmartre funicular was rebuilt in 1990–1991, the RATP first planned to extend it in a tunnel to this station, but dropped the idea because of cost.

- [Anvers · Wikipédia](https://fr.wikipedia.org/wiki/Anvers_(m%C3%A9tro_de_Paris))
- [Siège de la citadelle d'Anvers (1832) · Wikipédia](https://fr.wikipedia.org/wiki/Si%C3%A8ge_de_la_citadelle_d%27Anvers_(1832))

### 13. Barbès – Rochechouart (shared, owner Line 2; strings from line4.ts)

Name and etymology: copy from line4.ts. Line 2 platforms opened 26 March 1903, almost two months after the 31 January section, as Boulevard Barbès; renamed Barbès – Rochechouart on 15 October 1907 (agrees with line4.ts "1907"). Elevated station on the viaduct above Boulevard de la Chapelle, the westernmost of the four elevated stations. The 10 August 1903 fire began here: a train arrived with smoke from a motor, was emptied, and was sent on towards Nation (fr line article; en fire article; station article). The Line 4 platforms opened 21 April 1908. The 1941 Colonel Fabien attack was on the Line 4 platform (see Editorial decisions). François Truffaut filmed scenes of *Domicile conjugal* (1970) on the Line 2 platform. `opened`: 1903.

- [Barbès - Rochechouart · Wikipédia](https://fr.wikipedia.org/wiki/Barb%C3%A8s_-_Rochechouart_(m%C3%A9tro_de_Paris))
- [Paris Métro train fire · Wikipedia](https://en.wikipedia.org/wiki/Paris_M%C3%A9tro_train_fire)

### 14. La Chapelle

Named for its site, the former Barrière de la Chapelle of the Fermiers généraux wall, south of the former village of La Chapelle (also La Chapelle-Saint-Denis), named after an early chapel; annexed to Paris in 1860 (station article; [La Chapelle (Seine) article](https://fr.wikipedia.org/wiki/La_Chapelle_(Seine))). The chapel's dedication differs between sources (see Editorial decisions). Do not link "Barrière de la Chapelle": it redirects to Barrière Saint-Denis on fr.wiki. Opened 31 January 1903. Elevated, between the Nord railway lines (725 m interstation with two 75.25 m spans) and the Est cutting (fr line article). Since 1993 a long corridor links it to the underground part of Gare du Nord (RER B and D, and RER E at Magenta since 14 July 1999). It was the prototype of the Andreu-Motte style for the elevated stations. A second entrance at the east end of the platforms is under study; the Paris council approved funding for the preliminary design on 21 May 2024.

- [La Chapelle · Wikipédia](https://fr.wikipedia.org/wiki/La_Chapelle_(m%C3%A9tro_de_Paris))
- [La Chapelle (Seine) · Wikipédia](https://fr.wikipedia.org/wiki/La_Chapelle_(Seine))

### 15. Stalingrad (shared, owner Line 2; strings from line5.ts)

Name and etymology: copy from line5.ts. The Line 2 station opened 31 January 1903, in the open on the viaduct, as Rue d'Aubervilliers, after the old road to the village of Aubervilliers. The Line 7 station (Boulevard de la Villette) opened nearby on 5 November 1910, and passengers changed through the street with a transfer voucher ("contremarque"). On 12 October 1942 the Line 5 station opened, corridors joined the three, and the whole took the name Aubervilliers – Boulevard de la Villette, then Stalingrad on 10 February 1946 (station article; agrees with line5.ts and line7.ts). The station article gives no separate date for the combined name; the fr line article dates it 6 October 1942. Write "in October 1942" if a date is needed. East of the station the viaduct crosses the junction of the Bassin de la Villette and the Canal Saint-Martin with a curve and counter-curve of 75 m radius to avoid Claude-Nicolas Ledoux's Rotonde de la Villette (fr line article, Tracé section). The plan's image subject for Line 2 is the Rotonde. `opened`: 1903.

- [Stalingrad · Wikipédia](https://fr.wikipedia.org/wiki/Stalingrad_(m%C3%A9tro_de_Paris))
- [Ligne 2 du métro de Paris · Wikipédia](https://fr.wikipedia.org/wiki/Ligne_2_du_m%C3%A9tro_de_Paris)

### 16. Jaurès (shared, owner Line 2; strings from line5.ts)

Name and etymology: copy from line5.ts. Opened 23 February 1903 as Rue d'Allemagne, over three weeks after its section; renamed 1 August 1914 (agrees with line5.ts). The street name came from the old road to Germany. Elevated on Boulevard de la Villette; the last elevated station towards Nation. For the 1989 bicentenary of the Revolution, the Nation-bound platform received stained glass by Jacques-Antoine Ducatez showing revolutionaries around the Bastille (station article; the fr line article describes French flags in the glass). Line 7 platforms (now Line 7 bis) opened 18 January 1911, Line 5 on 12 October 1942. `opened`: 1903.

- [Jaurès · Wikipédia](https://fr.wikipedia.org/wiki/Jaur%C3%A8s_(m%C3%A9tro_de_Paris))

### 17. Colonel Fabien

Named for Place du Colonel-Fabien, which honours Pierre Georges, "Colonel Fabien" (21 January 1919 – 27 December 1944), communist Resistance fighter ([Colonel Fabien article](https://fr.wikipedia.org/wiki/Colonel_Fabien)). The station opened 31 January 1903 as Combat, a name from the animal fights held at the old city barrier from 1778 to 1850 (see Editorial decisions for the place-name timing). Renamed 19 August 1945: the third of eight stations renamed after the war for Resistance members who died for France, after Trinité – d'Estienne d'Orves and Charles Michels (station article). Link to station 13: on 21 August 1941, at Barbès – Rochechouart, Pierre Georges shot a German naval cadet, the first deadly attack on occupation troops (Barbès article). First underground station after the viaduct towards Nation. The en fire article says the burning train stopped here in 1903 and was coupled to the next train for a push.

- [Colonel Fabien · Wikipédia](https://fr.wikipedia.org/wiki/Colonel_Fabien_(m%C3%A9tro_de_Paris))
- [Colonel Fabien (Pierre Georges) · Wikipédia](https://fr.wikipedia.org/wiki/Colonel_Fabien)
- [Place du Colonel-Fabien · Wikipédia](https://fr.wikipedia.org/wiki/Place_du_Colonel-Fabien_(Paris))

### 18. Belleville (shared, owner Line 2; Line 11 writes it first)

Name and etymology: copy from line11.ts when Line 11 is in place. Facts: at the crossing of Rue de Belleville and Boulevard de Belleville, which recall the former village of Belleville; the street was its main road and the boulevard its western edge (station article). The commune was annexed by the law of 16 June 1859, effective 1860 ([Belleville (Seine) article](https://fr.wikipedia.org/wiki/Belleville_(Seine))). Do not explain "belle ville" beyond the literal words. Line 2 platforms opened 31 January 1903; Line 11 on 28 April 1935. One of two stations on four arrondissements. The busiest station on Line 2 (10.93 million entries, all lines; fr line article, year not stated: do not use a figure). The Paris council voted on 15 December 2015 for "Belleville – Commune de Paris 1871" (station article). The station article does not say whether it was applied; the IDFM arrets-lignes dataset (checked 6 October 2026) still names the stop "Belleville", so the new name is not official. `opened`: 1903.

- [Belleville · Wikipédia](https://fr.wikipedia.org/wiki/Belleville_(m%C3%A9tro_de_Paris))
- [Belleville (Seine) · Wikipédia](https://fr.wikipedia.org/wiki/Belleville_(Seine))
- [IDFM arrets-lignes dataset](https://data.iledefrance-mobilites.fr/explore/dataset/arrets-lignes/)

### 19. Couronnes

Named for Rue des Couronnes, after a former locality "les Couronnes sous Savies"; Savies was the old name of Belleville (qualified: see Editorial decisions). Opened 31 January 1903. On 10 August 1903 smoke from the burning train at Ménilmontant filled this station, where a crowd was arguing with staff about fare refunds; the lights failed, and 75 people died against the blind end of the platform, out of 84 dead in total (fr line article, "La tragédie de Couronnes"; en fire article). The fire led to all-metal Sprague-Thomson trains from 1908, separate lighting circuits and at least two exits per station (fr line article; en line article).

- [Couronnes · Wikipédia](https://fr.wikipedia.org/wiki/Couronnes_(m%C3%A9tro_de_Paris))
- [Rue des Couronnes · Wikipédia](https://fr.wikipedia.org/wiki/Rue_des_Couronnes)
- [Paris Métro train fire · Wikipedia](https://en.wikipedia.org/wiki/Paris_M%C3%A9tro_train_fire)

### 20. Ménilmontant

Named for the junction of Boulevard de Ménilmontant and Rue de Ménilmontant, which recall the former village of Ménilmontant; the boulevard ran along its west side and the street was its main road (station article; [Rue de Ménilmontant article](https://fr.wikipedia.org/wiki/Rue_de_M%C3%A9nilmontant)). The Belleville (Seine) article says the hamlet of Ménilmontant was attached to Belleville in 1792. The Rue de Ménilmontant article explains the word: a hamlet around a *mesnil* (farm estate), called *mesnolium mali temporis* ("mesnil du mauvais temps") in a 1224 charter and *mesnilium mautenz* in 1231, which became "Mesnil montant" around the 16th century. The article gives no footnote for this; if used, attribute it ("according to the street's history"). Opened 31 January 1903. On 10 August 1903 the fire on the empty train flared out of control at the entrance of this station; seven people died here (fr line article; station article). The station article puts the Couronnes toll at 77, not 75 (see conflict table). Above the station is Place Jean-Ferrat.

- [Ménilmontant · Wikipédia](https://fr.wikipedia.org/wiki/M%C3%A9nilmontant_(m%C3%A9tro_de_Paris))
- [Rue de Ménilmontant · Wikipédia](https://fr.wikipedia.org/wiki/Rue_de_M%C3%A9nilmontant)

### 21. Père Lachaise (shared, owner Line 2; Line 3 writes it first)

Name and etymology: copy from line3.ts when Line 3 is in place. Facts: named for the Père-Lachaise cemetery, at its north-west corner; the cemetery is named after François d'Aix de La Chaise (25 August 1624 – 20 January 1709), Jesuit confessor of Louis XIV for 34 years, and was laid out on a former Jesuit property where he lived ([François d'Aix de La Chaise article](https://fr.wikipedia.org/wiki/Fran%C3%A7ois_d%27Aix_de_La_Chaise)). Line 2 platforms opened 25 February 1903, over three weeks after their section; Line 3 on 19 October 1904. On 25 February 1909, because the Line 2 platforms are deeper than Line 3's, the station received the first escalator on the network (station article). The station faces a side gate of the cemetery; the main gate is nearer Philippe Auguste. Line 2 platforms are orange Andreu-Motte. `opened`: 1903.

- [Père Lachaise · Wikipédia](https://fr.wikipedia.org/wiki/P%C3%A8re_Lachaise_(m%C3%A9tro_de_Paris))
- [François d'Aix de La Chaise · Wikipédia](https://fr.wikipedia.org/wiki/Fran%C3%A7ois_d%27Aix_de_La_Chaise)

### 22. Philippe Auguste

Named for Avenue Philippe-Auguste, which honours King Philip II Augustus (born 1165, reigned 1180–1223), seventh Capetian king and the first called King of France ([Philippe II Auguste article](https://fr.wikipedia.org/wiki/Philippe_II_Auguste)). The station article says it is the only Métro station named after a king of France; attribute this to the source. Opened 31 January 1903. The main gate of the Père-Lachaise cemetery is nearer this station than Père Lachaise (Père Lachaise article). Platforms refitted in 2018 with white ceramic frames and blue Akiko seats.

- [Philippe Auguste · Wikipédia](https://fr.wikipedia.org/wiki/Philippe_Auguste_(m%C3%A9tro_de_Paris))
- [Philippe II Auguste · Wikipédia](https://fr.wikipedia.org/wiki/Philippe_II_Auguste)

### 23. Alexandre Dumas

Named for Rue Alexandre-Dumas, a few hundred metres south, which honours the writer Alexandre Dumas (1802–1870). Opened 31 January 1903 as Rue de Bagnolet (the station article itself says "Bagnolet"; see conflict table), after the street that leads to the town of Bagnolet; it was the temporary eastern terminus until 2 April 1903. Renamed 13 September 1970 to avoid confusion with the new Porte de Bagnolet station on Line 3 (opened 2 April 1971). The station was the first on the network to test air purifiers ("Ip'Air", by Suez), installed on the Nation-bound platform on 7 June 2019 for an initial six months (station article).

- [Alexandre Dumas · Wikipédia](https://fr.wikipedia.org/wiki/Alexandre_Dumas_(m%C3%A9tro_de_Paris))
- [Alexandre Dumas (écrivain) · Wikipédia](https://fr.wikipedia.org/wiki/Alexandre_Dumas)
- [Rue Alexandre-Dumas · Wikipédia](https://fr.wikipedia.org/wiki/Rue_Alexandre-Dumas)

### 24. Avron

Named for Rue d'Avron, part of an old road to the Plateau d'Avron, east of Paris ([Rue d'Avron article](https://fr.wikipedia.org/wiki/Rue_d%27Avron); station article). The street article says the plateau, then in the commune of Rosny, was strategic for the defence of Paris in the 1870–1871 siege, and that the street got its name by an arrêté of 1 February 1877. Opened 2 April 1903 with the last section, Bagnolet – Nation. It is very close to Buzenval on Line 9 (station article); do not repeat the Palais Avron fact from line9.ts.

- [Avron · Wikipédia](https://fr.wikipedia.org/wiki/Avron_(m%C3%A9tro_de_Paris))
- [Rue d'Avron · Wikipédia](https://fr.wikipedia.org/wiki/Rue_d%27Avron)

### 25. Nation (shared, owner Line 1)

Name and etymology: copy from line1.ts. Line 2 platforms opened 2 April 1903, replacing the temporary terminus at Rue de Bagnolet. The Line 2 terminus is a loop under the square: trains arrive under Avenue de Taillebourg and leave under Avenue du Trône, Place des Antilles and Boulevard de Charonne. The curved station has one wide island platform between two tracks, and a metal deck instead of a vault (Nation article; fr line article). Luc Besson used the Line 2 platforms in the film *Subway* (Nation article; the article gives no year). See Editorial decisions for facts the Line 6 and Line 9 contexts already use. `opened`: 1903.

- [Nation · Wikipédia](https://fr.wikipedia.org/wiki/Nation_(m%C3%A9tro_de_Paris))
- [Place de la Nation · Wikipédia](https://fr.wikipedia.org/wiki/Place_de_la_Nation_(Paris))

---

Verified 2026-10-06 by an independent agent

Method: every link above was opened on 6 October 2026. Wikipedia pages were read as plain-text extracts through the MediaWiki API with a generic User-Agent; all 54 links resolve (none missing; "Barrière de la Chapelle" still redirects to Barrière Saint-Denis, so it stays unlinked). The IDFM dataset page returns HTTP 200, and its API was queried for Lines 2, 3 and 11. Facts not listed below matched their sources.

## Corrections

1. Header: replaced "Not yet verified by a second agent" with the verification note.
2. Route and method: added the verifier's own IDFM counts (L2 50 records / 25 names, L3 50 / 25, L11 38 / 19). The L2 count of 25 is unchanged.
3. Line facts: removed "on the line of the Fermiers généraux wall" as a fr line article fact. The line article says only "anciens boulevards extérieurs". The wall is now sourced to the Courcelles, Place de Clichy and La Chapelle station articles.
4. Spelling: the IDFM dataset and the article titles use a spaced hyphen ("Barbès - Rochechouart"), not an en dash. The en dash is atlas style, and the text now says so.
5. Père Lachaise spelling: the article text uses "La Chaize" throughout; "La Chaise" is only the page title. Reworded.
6. Ménilmontant (Qualified etymologies and station 20): "No fetched source explains the word" was wrong. The Rue de Ménilmontant article gives an origin from *mesnil* and a 1224 charter (*mesnolium mali temporis*), without a footnote. Now attributed and marked usable only with attribution.
7. Conflict table: linked the Rue Alexandre-Dumas article, which had been cited without a link (1815 birth year confirmed). Also added it to the station 23 sources.
8. Conflict table: added two rows. Couronnes deaths (Ménilmontant article and a line-article body count give 77, against 75). Date of the name Aubervilliers – Boulevard de la Villette (6 October 1942 in the line article, none in the station article).
9. Porte Dauphine: the line article's "glazed brick" conflicts with the station article's "flat cream-coloured tiles". Now qualified, with the advice not to say brick. Added where the Thiers-wall mention actually appears (only a related-articles link).
10. Victor Hugo (closed stations list and station 2): removed "a few metres" and "a little". The station article says only "north-east of the original site".
11. Charles de Gaulle – Étoile: removed "was used when the first section opened" for the Boissière connection, because no source says so. Replaced it with what the station article says (it linked Line 1 to the Line 2 track towards Porte Dauphine and was closed after the Line 1 automation).
12. Ternes: removed "the other entrances lost theirs in the 1960s". The station article says only that the other two entrances have plainer, more recent balustrades (the 1960s date belongs to the platform refit). Also "listed again" became "protection renewed".
13. Courcelles: the research-note claim (parish of Clichy, absorbed by Levallois-Perret in 1866) is confirmed by the already-linked Rue de Courcelles article. It is now marked usable.
14. Villiers: the line article does not confirm the Villiers opening date. It says only that some unfinished 1902 stations opened with the Nation extension, and it names none. Reworded.
15. Rome: "East of the station the line crosses the Saint-Lazare cutting" was wrong. The station lies east of the cutting, so the crossing is west of Rome, between Villiers and Rome. Also "metal deck" became "metal roof (couverture métallique)", the line article's term.
16. Stalingrad: "changed by the street with a ticket" became "with a transfer voucher (contremarque)", the station article's term. Added the 6 October / 12 October 1942 date note for the combined name.
17. Belleville: "the council vote was not applied" had no source. The station article gives only the 15 December 2015 vote. The IDFM dataset (still "Belleville") is now cited for the current official name, and its link is added to the station sources.
18. Ménilmontant: added the station article's 77 Couronnes toll as a disclosed conflict.
19. Alexandre Dumas: noted beside "Rue de Bagnolet" that the station article itself says "Bagnolet". The conflict table already covered this.


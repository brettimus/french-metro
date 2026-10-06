# Line 3 source audit

Checked 6 October 2026. Scope: all 25 current stations, English and French. The route runs from Pont de Levallois – Bécon (Levallois-Perret) to Gallieni (Bagnolet), with one continuous path and no branches. Line 3bis is a separate line and is not part of this audit.

## Route and method

`ratp.fr` refused every automated fetch with HTTP 403, so no RATP page was read. The stop list was checked against the official open data of Île-de-France Mobilités (IDFM), the regional transport authority. Its [arrets-lignes dataset](https://data.iledefrance-mobilites.fr/explore/dataset/arrets-lignes/), filtered to line id `IDFM:C01373` (Metro 3) on 6 October 2026, returns 50 records (one per stop and direction) with exactly 25 distinct stop names: the 25 stations below. (Re-checked in B2 through the dataset's records API, `where=id="IDFM:C01373"`: 50 records, 25 distinct `stop_name` values, `shortname` 3.) IDFM writes "Havre-Caumartin" and "Quatre Septembre"; these are typographic variants of the same stops (see Editorial decisions).

Station order was confirmed by chaining the neighbour stations that each French station article names in its Situation section ("elle s'intercale entre ..."), and against the [French Wikipedia Line 3 article](https://fr.wikipedia.org/wiki/Ligne_3_du_m%C3%A9tro_de_Paris) and the [English Wikipedia Line 3 article](https://en.wikipedia.org/wiki/Paris_Metro_Line_3). Both articles give the same two termini. The French article's chronology was used for the opening dates of each section:

| Date | Event |
|---|---|
| 19 October 1904 | Villiers (then Avenue de Villiers) – Père Lachaise opens. Quatre-Septembre (3 November), Rue Saint-Denis, now Réaumur – Sébastopol (19 November) and Sentier (20 November) open later; trains ran through them without stopping until then. |
| 25 January 1905 | East to Gambetta (terminal loop round the 20e mairie). |
| 23 May 1910 | West to Pereire (Wagram, Malesherbes, Pereire). |
| 15 February 1911 | West to Porte de Champerret. |
| 27 November 1921 | East to Porte des Lilas (now Line 3bis). |
| 24 September 1937 | West to Pont de Levallois – Bécon (with Anatole France and Vallier, now Louise Michel). |
| 23 August 1969 | New Gambetta station opens; Martin Nadaud station is absorbed. |
| 27 March 1971 | Gambetta – Porte des Lilas is split off as Line 3bis. |
| 2 April 1971 | East to Gallieni via Porte de Bagnolet (1,370 m). |

Line facts used in the audit: length 11.665 km, fully underground (French article; the English article rounds to 11.7 km). The whole line is on the Right Bank (English article: "completely on the Rive Droite"). It does not cross the Seine, so no `riverCrossings["3"]` entry is needed. It passes under the Canal Saint-Martin between République and Parmentier. The 1904 section had 17 stations; all were vaulted except four near the surface with a metal deck ceiling: Saint-Lazare, Havre – Caumartin, Opéra and Père Lachaise (French Line 3 article, Inauguration section). Line 3 was the first line to receive MF 67 trains (delivered from 21 December 1967), got a central control room (PCC) in 1970 and automatic driving in 1973. The French article says MF 19 trains will replace the MF 67 from 2031; the English article says the MF 67 will retire "around 2033". This date is not checked against IDFM and should not be used.

Every station article listed below was read in French through the MediaWiki API (plain-text extracts saved in `l3wiki/stations.json`). Namesake articles were read for the intro or the name-origin section. Opening dates are the opening on Line 3, which is what `Station.opened` holds.

## Closed and ghost stations (excluded)

- **Martin Nadaud** (between Père Lachaise and Gambetta). Opened 25 January 1905 and closed 23 August 1969, when the new Gambetta station absorbed it. Its platforms now form the western end of Gambetta's Line 3 platforms and its entrances on Place Martin-Nadaud are Gambetta's western entrances. It is not a current stop and IDFM does not list it. It is mentioned only in Gambetta's context. Sources: [Martin Nadaud (métro de Paris) · Wikipédia](https://fr.wikipedia.org/wiki/Martin_Nadaud_(m%C3%A9tro_de_Paris)), [Gambetta · Wikipédia](https://fr.wikipedia.org/wiki/Gambetta_(m%C3%A9tro_de_Paris)).
- **Pelleport, Saint-Fargeau, Porte des Lilas** (and the old north half-station of Gambetta). Part of Line 3 from 27 November 1921 to 27 March 1971; since then they are Line 3bis, which `lines.ts` defers. Excluded from the Line 3 path. Source: [Ligne 3 bis du métro de Paris · Wikipédia](https://fr.wikipedia.org/wiki/Ligne_3_bis_du_m%C3%A9tro_de_Paris).
- **Old Gambetta arrival half-station** under Rue Belgrand. Removed in the 1969 rebuild and replaced by a siding; only its vault tiles remain visible from the tunnel (Gambetta article). Not a stop.
- **Villiers loop under Parc Monceau** and **Porte de Champerret loop**: former terminal loops. They never had separate stations. The Porte de Champerret loop has been used as sidings since 1937 (French Line 3 article; Porte de Champerret article). The sources disagree on the Villiers loop: the French Line 3 article says it was converted into meeting and exam rooms and is now disused (a proposed urban farm was not chosen); the Villiers station article says it is used for train storage and driver training. Do not describe its present use.

## Editorial decisions

- **Names.** Atlas style uses a spaced en dash in compound names: "Pont de Levallois – Bécon", "Havre – Caumartin", "Réaumur – Sébastopol". "Quatre-Septembre" keeps the hyphen (station article title and plaques; IDFM omits it), per plan decision 5. "Père Lachaise" and "Arts et Métiers" have no hyphens, as on the station. "Pereire" has no accent (IDFM, station article and street); the Villiers article's "Péreire" is a misspelling. "Gallieni" has no accent. "Rue Saint-Maur" includes "Rue" (name since 1 September 1998). Subtitles are not part of the names: Pereire "Maréchal Juin", Europe "Simone Veil", Gallieni "Parc de Bagnolet".
- **Qualified etymologies.**
  - Sentier: the street article says the origin is uncertain and gives three explanations. The station article uses the conditional ("renverrait"). The app text must say "probably" or "one explanation".
  - Villiers: the station article says "Villiers" is a deformation of Latin "Villare"; this is in one source only. The original station name "Avenue de Villiers" carries "[réf. nécessaire]" for the Line 2 platform in the station article, but every other station article on the 1904 section confirms "Avenue de Villiers (aujourd'hui Villiers)". No rename date is known; do not give one.
  - Porte de Champerret: the "champ Perret" derivation (the field of Jean-Jacques Perret) is from the station article only.
  - Louise Michel: the former name Vallier honoured a carpenter who helped build the first houses of Levallois (station article only; no article on Rue Vallier exists).
- **Shared station ids.** The atlas `lines` order after insertion is 1, 3, 4, 5, 6, 7, 9, 11, 14, and later 1, 2, 3, 4, 5, 6, 7, 9, 11, 14. The owner of a shared station is the first line in that order, and the parity test (`atlas.test.ts`, "shared stations have the same name and etymology on every line") compares only `name` and `etymology`. Context may differ, and should, because the copy check flags an identical context as a hint.

| id | Lines in atlas | Owner today | Owner after Line 3 | Owner after Line 2 | Action for Line 3 |
|---|---|---|---|---|---|
| `saint-lazare` | 14 | 14 | 3 | 3 | Copy name and etymology from `line14.ts` byte for byte. |
| `havre-caumartin` | 9 | 9 | 3 | 3 | Copy from `line9.ts`. |
| `opera` | 7 | 7 | 3 | 3 | Copy from `line7.ts`. |
| `reaumur-sebastopol` | 4 | 4 | 3 | 3 | Copy from `line4.ts`. |
| `republique` | 5, 9 (11 planned) | 5 | 3 | 3 | Copy from `line5.ts`. |
| `arts-et-metiers` | none yet (11 planned first) | none | 3 | 3 | Copy from `line11.ts` if Line 11 lands first (plan order); otherwise Line 3 writes it line-neutral. |
| `villiers` | none | none | 3 | 2 | New. Write line-neutral text; Line 2 copies it. |
| `pere-lachaise` | none | none | 3 | 2 | New. Write line-neutral text; Line 2 copies it. |
| `gambetta` | none | none | 3 | 3 | New. Line 3bis is not planned. |

  `area` is not in the parity test, but reuse the existing values: Saint-Lazare "Paris 8e" (the station article says it lies on the 8e / 9e boundary), Opéra "Paris 9e" (article: on the 2e / 9e boundary), Havre – Caumartin "Paris 9e", Réaumur – Sébastopol "Paris 2e / 3e", République "Paris 3e / 10e / 11e".
- **Opened years.** Gambetta uses 1905 (the station's first opening on Line 3); the 1969 rebuild goes in the context. Louise Michel uses 1937 (opened as Vallier), Havre – Caumartin 1904 (as Caumartin), Réaumur – Sébastopol 1904 (as Rue Saint-Denis), Rue Saint-Maur 1904 (as Saint-Maur).
- **Colour.** Per plan decision 4, use the IDFM web colour `#6e6e00` with white text (5.39:1). IDFM open data gives `colourweb_hexa 6e6e00` and `textcolourweb_hexa ffffff` for `id_line C01373` in the [referentiel-des-lignes dataset](https://data.iledefrance-mobilites.fr/explore/dataset/referentiel-des-lignes/) (checked 6 October 2026). `lines.ts` comingSoon still has `#837902` (4.47:1, below AA).
- **Not used.** The ridership figure in the French lead ("81,84 de voyageurs en 2025") lacks its unit; the English article gives 101.4 million for 2017. Neither is used. The "WWII newspaper front pages" at Réaumur – Sébastopol in the scout notes is not in the station article, but the French Line 3 article ("Stations à thème ou particulières") says each platform has panels showing newspaper front pages about the Second World War. It is single-sourced, with no date, and is dropped.

## Source conflicts and values chosen

1. **First opening day.** French line and station articles: 19 October 1904. English line article: "10 October 1904". Chosen: 19 October 1904 (all French station articles of the 1904 section agree).
2. **Villiers as a through station.** Villiers station article: through station from 23 May 1910 (extension to Pereire). French Line 3 article, "Stations à thème" section: "Villiers était, jusqu'en 1911, le terminus ouest". Chosen: 23 May 1910, which matches the line chronology and the Pereire article. The 1911 sentence confuses Villiers with Pereire (terminus until 15 February 1911).
3. **Distance from old Gambetta to Martin Nadaud.** Martin Nadaud article: 232 m. French Line 3 article: 235 m. Gambetta article: 250 m. Chosen: no figure in the app.
4. **New Gambetta platform length.** French Line 3 article: the new station is 110 m long. Gambetta article ("Quais"): the Line 3 platform is 196 m long, because its western end is the old Martin Nadaud platform. The two figures measure different things (new station only, and new station plus Martin Nadaud). Chosen: no figure, or "196 m" attributed to the Gambetta article.
5. **Villiers lowering.** Station article and line article: 1.6 m (1,60 m). Line article "Stations à thème" section: "quelques mètres". Chosen: 1.6 m, or no figure.
6. **Line length.** 11.665 km (French) and 11.7 km (English) are the same value rounded. Use 11.7 km in English and 11,7 km in French, or the exact figure in both.
7. **MF 67 retirement.** French: MF 19 from 2031. English: MF 67 retire around 2033. Chosen: do not use.
8. **Rue Saint-Maur rename.** French: 1 September 1998. English: "September 1998" (and misspells Saint-Maur-des-Fossés as "Saint-Maur-les-Fossés"). No conflict on the date; use the French day.
9. **Line 14 opening at Saint-Lazare.** Saint-Lazare article: 16 December 2003. Havre – Caumartin article: 9 December 2003. Chosen: the year 2003 only, if used.
10. **Line 2 opening at Villiers.** The Villiers article gives 27 January 1903 for the Line 2 platform, with "[réf. nécessaire]" on the old name. This is a Line 2 fact; record it for the Line 2 audit and do not use it in Line 3 copy.
11. **Western extension to Bécon-les-Bruyères.** English Line 3 article: proposed, but not in projects backed by IDFM. French Line 3 article: requested in 2012 and 2013, and written into the SDRIF regional plan published in April 2023 (with Les Vallées). Chosen: do not use.
12. **Avenue de Wagram opening date.** Wagram station article: opened in 1853 after the Farmers-General wall was taken down. Avenue de Wagram article: the section along the wall opened on 16 January 1789, the outer section was laid out after 1860, and the name "de Wagram" dates from 2 March 1864. Chosen: no opening year; if a date is needed, use the 1864 naming (street article).

## Conflicts with existing atlas copy

None found. Each item was checked against the station article.

- **Havre – Caumartin (`line9.ts`).** Line 9 context: "A Line 3 platform opened here in 1904. The Line 9 platform followed on 3 June 1923, under the single name Caumartin." The station article agrees: Line 3 opened on 19 October 1904 as Caumartin, Line 9 on 3 June 1923, and the whole station took the name Havre – Caumartin in 1926. The Line 9 etymology ("Rue du Havre, added to the name in 1926") also agrees. The Line 3 context must not say that the Line 3 platform opened as "Havre – Caumartin".
- **Réaumur – Sébastopol (`line4.ts`).** Line 4 context: "The station opened as Rue Saint-Denis on Line 3. It received its present name in 1907, ahead of the arrival of Line 4 the following year." The station article agrees: opened 19 November 1904 as Rue Saint-Denis, renamed 15 October 1907, Line 4 opened 21 April 1908. The Line 3 context should use a different fact to avoid repeating the rename.
- **Opéra (`line7.ts`).** Line 7 context says Lines 3, 7 and 8 cross at different underground levels and that Line 7 opened in 1910 as a terminus (5 November 1910 in the station article). Consistent. The Line 3 context can add the shared shaft built for Line 3 in 1903–1904.
- **Saint-Lazare (`line14.ts`).** Etymology (station, street, Maison Saint-Lazare) matches the station article's "Origine du nom". Context is about the leper hospital; no overlap with Line 3 facts.
- **République (`line5.ts`, `line9.ts`).** Etymology matches the station article (name given with the statue project, debated in the council from 1878). Lines 5 and 9 share the same Marianne context; Line 3 should use a different one.

## Station checks and sources

### 1. Pont de Levallois – Bécon

Named for the Pont de Levallois, the nearby Seine bridge, and for Bécon, a district of Courbevoie on the far bank reached by that bridge. The bridge takes its name from the town of Levallois, which took the name of one of its founders, the property developer Nicolas Eugène Levallois (1816–1879). Bécon, with the neighbouring Bruyères district, gave its name to the locality of Bécon-les-Bruyères. Opened 24 September 1937 with the extension from Porte de Champerret; it has been the western terminus since then. Context facts: "Bécon" is missing from some of the names set into the platform wall tiles, for lack of space; three tail tracks continue beyond the platforms. The English line article says a western extension to Bécon-les-Bruyères has been proposed but is not in IDFM's projects; the French line article says it is in the April 2023 SDRIF regional plan (see conflict 11). Do not use.

- [Pont de Levallois - Bécon · Wikipédia](https://fr.wikipedia.org/wiki/Pont_de_Levallois_-_B%C3%A9con_(m%C3%A9tro_de_Paris))
- [Nicolas Levallois · Wikipédia](https://fr.wikipedia.org/wiki/Nicolas_Levallois)
- [Bécon-les-Bruyères · Wikipédia](https://fr.wikipedia.org/wiki/B%C3%A9con-les-Bruy%C3%A8res)

### 2. Anatole France

Named for Rue Anatole-France in Levallois-Perret (formerly Rue de Cormeille), which honours François Anatole Thibault, known as Anatole France (1844–1924), writer, member of the Académie française and 1921 Nobel laureate in literature. Opened 24 September 1937 with the extension to Pont de Levallois – Bécon (line chronology; the station article gives no opening date). Context fact: the two platforms are partly offset because the street above is narrow; in each direction, trains stop at the first half-station they reach (French Line 3 article, "Stations à thème").

- [Anatole France · Wikipédia](https://fr.wikipedia.org/wiki/Anatole_France_(m%C3%A9tro_de_Paris))
- [Anatole France · Wikipedia](https://en.wikipedia.org/wiki/Anatole_France)
- [Ligne 3 du métro de Paris · Wikipédia](https://fr.wikipedia.org/wiki/Ligne_3_du_m%C3%A9tro_de_Paris)

### 3. Louise Michel

Opened 24 September 1937 as Vallier, after Rue Vallier, named for a carpenter who helped build the first houses of Levallois (station article only). On 1 May 1946 the station and the street were renamed for Louise Michel (1830–1905), the Communard teacher and writer called "la Vierge rouge". Context facts: the station article says it was the fifth of eight network stations named for a woman, after Barbès – Rochechouart, Madeleine, Chardon-Lagache and Boucicaut; attribute this count to the source. The station lies about 100 m from the Paris city limit. Its platforms were refitted in red "Andreu-Motte" style between 1974 and 1984.

- [Louise Michel · Wikipédia](https://fr.wikipedia.org/wiki/Louise_Michel_(m%C3%A9tro_de_Paris))
- [Louise Michel · Wikipedia](https://en.wikipedia.org/wiki/Louise_Michel)

### 4. Porte de Champerret

Named for the Porte de Champerret, a gate in the city fortifications towards the village of Champerret. The station article says the hamlet stood on the field ("champ") of Jean-Jacques Perret's property and joined the village of Levallois in 1867 to form the commune of Levallois-Perret; this derivation is single-sourced. The Porte de Champerret (gate) article says only that the gate is named for a locality of Neuilly-sur-Seine, part of Levallois-Perret since 1867, subdivided from 1822. The Nicolas Levallois article confirms that the commune of Levallois was formed on 1 January 1867 from the Champ-Perret area of Neuilly and part of Clichy. Opened 15 February 1911 as the new western terminus, replacing Pereire. Context facts: it was the terminus until 24 September 1937; its turning loop, under which the 1937 tunnel passes, has been used as sidings since then. The line article says the station has two half-stations, each with a central platform between two tracks. Connection with tram T3b.

- [Porte de Champerret · Wikipédia](https://fr.wikipedia.org/wiki/Porte_de_Champerret_(m%C3%A9tro_de_Paris))
- [Porte de Champerret (porte de Paris) · Wikipédia](https://fr.wikipedia.org/wiki/Porte_de_Champerret)

### 5. Pereire

Named for Boulevard Pereire, which honours the brothers Émile (1800–1875) and Isaac (1806–1880) Pereire, founders of the Compagnie des chemins de fer du Midi (station article). The boulevard article says the name was given by the commune of Neuilly on 2 August 1855 and calls the brothers the concessionaires of the Auteuil line. Opened 23 May 1910 with the extension from Villiers, as a provisional western terminus until 15 February 1911. Context facts: subtitle "Maréchal Juin", after Place du Maréchal-Juin above, named by municipal order of 6 April 1973 for Marshal Alphonse Juin (1888–1967); the subtitle is not shown on maps. After Wagram and Pereire the line descends a 40‰ gradient to pass under the Auteuil line, now RER C (line article). Interchange with RER C at Pereire–Levallois.

- [Pereire · Wikipédia](https://fr.wikipedia.org/wiki/Pereire_(m%C3%A9tro_de_Paris))
- [Émile Pereire · Wikipédia](https://fr.wikipedia.org/wiki/%C3%89mile_Pereire)
- [Boulevard Pereire · Wikipédia](https://fr.wikipedia.org/wiki/Boulevard_Pereire)
- [Ligne 3 du métro de Paris · Wikipédia](https://fr.wikipedia.org/wiki/Ligne_3_du_m%C3%A9tro_de_Paris) (40‰ gradient)

### 6. Wagram

Named for Avenue de Wagram, which commemorates the Battle of Wagram (station article). The station article says the avenue opened in 1853 after the Farmers-General wall was taken down; the Avenue de Wagram article gives other dates and says the name was given on 2 March 1864 (see conflict 12). Do not give an opening year. The battle article gives 5–6 July 1809, a decisive French victory over the Austrian army under Archduke Charles; this replaces the scout's unsourced dates. Opened 23 May 1910 with the extension from Villiers to the provisional terminus of Pereire. Context facts: the station lies in the Plaine-de-Monceaux quarter under Avenue de Villiers; from 14 April 2021 to 1 December 2023 the platforms lost their 1960s metal panelling and got new white bevelled tiles.

- [Wagram · Wikipédia](https://fr.wikipedia.org/wiki/Wagram_(m%C3%A9tro_de_Paris))
- [Battle of Wagram · Wikipedia](https://en.wikipedia.org/wiki/Battle_of_Wagram)
- [Avenue de Wagram · Wikipédia](https://fr.wikipedia.org/wiki/Avenue_de_Wagram)

### 7. Malesherbes

Named for Boulevard Malesherbes, which honours Chrétien-Guillaume de Lamoignon de Malesherbes (1721–1794), magistrate, botanist and minister, guillotined in the Terror. The station article says the boulevard was named under the Restoration; the boulevard article gives 1824 for the first section. The Malesherbes article confirms that he was one of Louis XVI's defenders at his trial (this replaces the scout's unsourced claim). Opened 23 May 1910 with the extension to Pereire. Context facts: in the 1930s the original Guimard entrance was replaced by a plainer wrought-iron Dervaux surround; a 1918 photograph of the Guimard entrance is held by the Musée Carnavalet. On 12 September 2024 RATP replaced half the platform plaques with "Malibu – Los Angeles 2028" for the Olympic handover.

- [Malesherbes · Wikipédia](https://fr.wikipedia.org/wiki/Malesherbes_(m%C3%A9tro_de_Paris))
- [Chrétien Guillaume de Lamoignon de Malesherbes · Wikipédia](https://fr.wikipedia.org/wiki/Chr%C3%A9tien_Guillaume_de_Lamoignon_de_Malesherbes)
- [Boulevard Malesherbes · Wikipédia](https://fr.wikipedia.org/wiki/Boulevard_Malesherbes)

### 8. Villiers (shared with Line 2 later)

Named for Avenue de Villiers (the station was first called Avenue de Villiers), which led to the former village of Villiers-la-Garenne, absorbed by Levallois-Perret. The station article says "Villiers" is a deformation of "Villare" (qualify; single source). The Line 3 platform opened 19 October 1904 as the western terminus of the first section, with a turning loop under Parc Monceau; it became a through station on 23 May 1910 (see conflict 2). Context facts: the Line 3 station was first built beside the Line 2 station at the same level, for a planned shared track to Étoile; when that plan was dropped, its track was lowered 1.6 m to pass under Line 2, which explains its unusually high vault. The painter Édouard Vuillard made sketches of the station in 1916 and 1917. The resistance member Suzanne Olivier was arrested here on 11 June 1943. Write the etymology line-neutral, because Line 2 will own it.

- [Villiers · Wikipédia](https://fr.wikipedia.org/wiki/Villiers_(m%C3%A9tro_de_Paris))
- [Avenue de Villiers · Wikipédia](https://fr.wikipedia.org/wiki/Avenue_de_Villiers)

### 9. Europe

Named for Place de l'Europe, at the centre of the Europe quarter, whose streets carry the names of European cities (Rome, Milan, Naples, Saint Petersburg, London). Opened 19 October 1904 with the first section. Context facts: the subtitle "Simone Veil" was added on 29 May 2018, the same day the square received her name; she was health minister and the first president of the European Parliament. The station article says Europe, Rome (Line 2) and Liège (Line 13) are the three stations whose names refer to this quarter. Europe received a cultural decoration on its platforms for the Metro centenary: liquid-crystal screens showing short films and slide shows (station article; French line article). The station article says the screens and their frames were removed in the first half of 2024, so describe them in the past tense.

- [Europe · Wikipédia](https://fr.wikipedia.org/wiki/Europe_(m%C3%A9tro_de_Paris))
- [Quartier de l'Europe · Wikipédia](https://fr.wikipedia.org/wiki/Quartier_de_l%27Europe)

### 10. Saint-Lazare (shared; owner after insertion: Line 3)

Reuse `line14.ts` name and etymology exactly (station and street, which led to the Maison Saint-Lazare leper hospital; matches the station article). The Line 3 platform opened 19 October 1904 with the first section, the first of the station's platforms (Line 12 in 1910, Line 13 in 1911, Line 14 in 2003). Context facts for Line 3: the platform lies on a curve under the Cour de Rome, just below the street, above the Line 13 tunnel; its ceiling is a metal deck of silver-painted beams carrying white brick vaults. It was one of the four 1904 stations built this way (line article). The English line article says passengers can walk underground from Saint-Lazare to Opéra through Haussmann – Saint-Lazare (RER E), Havre – Caumartin and Auber (RER A).

- [Saint-Lazare · Wikipédia](https://fr.wikipedia.org/wiki/Saint-Lazare_(m%C3%A9tro_de_Paris))
- [Ligne 3 du métro de Paris · Wikipédia](https://fr.wikipedia.org/wiki/Ligne_3_du_m%C3%A9tro_de_Paris)
- [Paris Metro Line 3 · Wikipedia](https://en.wikipedia.org/wiki/Paris_Metro_Line_3)

### 11. Havre – Caumartin (shared; owner after insertion: Line 3)

Reuse `line9.ts` name and etymology exactly. The Line 3 platform opened 19 October 1904 under the name Caumartin; Line 9 followed on 3 June 1923 and the station took its present name in 1926. Context facts for Line 3: the platform lies just below the street at the end of Rue Auber, with a metal deck ceiling (one of the four 1904 stations), directly above the RER A tunnel. The line article says that under Rue Auber, between Opéra and Havre – Caumartin, the Line 3 tunnel lies directly above the RER A station Auber, 15 m lower. Avoid repeating the 1971 Auber link sentence, which is already in the Line 9 context.

- [Havre - Caumartin · Wikipédia](https://fr.wikipedia.org/wiki/Havre_-_Caumartin_(m%C3%A9tro_de_Paris))
- [Ligne 3 du métro de Paris · Wikipédia](https://fr.wikipedia.org/wiki/Ligne_3_du_m%C3%A9tro_de_Paris)

### 12. Opéra (shared; owner after insertion: Line 3)

Reuse `line7.ts` name and etymology exactly (the opera house by Charles Garnier). The Line 3 platform opened 19 October 1904, before Line 7 (1910) and Line 8 (1913). Context facts for Line 3: the crossing of Lines 3, 7 and 8 was built at once, during the Line 3 works, as a single masonry shaft 20 m high, so that later lines would not need heavy underpinning. It stands in the water table on three concrete piers sunk with compressed-air caissons; the work took eleven months, from March 1903 to February 1904 (line article). The contractor Léon Chagnaud won the contract in 1901 (station article). Line 3 is at the top level, just below the street under Rue Auber. On 1 April 2016 RATP renamed it "Apéro" on half the plaques for April Fools' Day.

- [Opéra · Wikipédia](https://fr.wikipedia.org/wiki/Op%C3%A9ra_(m%C3%A9tro_de_Paris))
- [Ligne 3 du métro de Paris · Wikipédia](https://fr.wikipedia.org/wiki/Ligne_3_du_m%C3%A9tro_de_Paris)
- [Opéra Garnier · Wikipédia](https://fr.wikipedia.org/wiki/Op%C3%A9ra_Garnier)

### 13. Quatre-Septembre

Named for Rue du Quatre-Septembre, which commemorates 4 September 1870, the day the Third Republic was proclaimed. The odonym article adds that Léon Gambetta made the proclamation at the Hôtel de Ville (a link to station 23). Opened 3 November 1904, about two weeks after the first section; until then trains ran through without stopping. Context facts: the station article says it was the first network station named for a date, joined in 1987 by La Courneuve – 8 Mai 1945 (Line 7, already in the atlas). It lies directly above the RER A tunnel.

- [Quatre-Septembre · Wikipédia](https://fr.wikipedia.org/wiki/Quatre-Septembre_(m%C3%A9tro_de_Paris))
- [Quatre-Septembre (odonyme) · Wikipédia](https://fr.wikipedia.org/wiki/Quatre-Septembre_(odonyme))

### 14. Bourse

Named for Place de la Bourse, where the Palais Brongniart stands, formerly the Palais de la Bourse and the home of the Paris stock exchange. Opened 19 October 1904 with the first section. Context facts: the Palais Brongniart was built from 1808 to 1826 at Napoleon's instigation, by Alexandre-Théodore Brongniart and, after his death in 1813, Éloi Labarre. On 9 October 2019 RATP renamed the station "Sesterce" on half the plaques for the 60th anniversary of Astérix.

- [Bourse · Wikipédia](https://fr.wikipedia.org/wiki/Bourse_(m%C3%A9tro_de_Paris))
- [Palais Brongniart · Wikipédia](https://fr.wikipedia.org/wiki/Palais_Brongniart)

### 15. Sentier

Named for Rue du Sentier, in the quarter of the same name. The origin is uncertain: the street article quotes three authors who all say the street began as a path ("sentier"); one says the path led to the city rampart, and some old plans call it "rue du Chantier". Qualify the etymology. Opened 20 November 1904, about a month after the first section; until then trains ran through without stopping. Context facts: in 2025 it was one of five network stations that still had 1960s metal panelling on the platforms, with Parmentier on the same line (Parmentier article). The line article describes the Sentier as the traditional garment-making quarter. Avoid the 20 March 2018 spring plaques: Line 9 already uses that event for Jasmin.

- [Sentier · Wikipédia](https://fr.wikipedia.org/wiki/Sentier_(m%C3%A9tro_de_Paris))
- [Rue du Sentier (Paris) · Wikipédia](https://fr.wikipedia.org/wiki/Rue_du_Sentier_(Paris))

### 16. Réaumur – Sébastopol (shared; owner after insertion: Line 3)

Reuse `line4.ts` name and etymology exactly (matches the station article: René-Antoine Ferchault de Réaumur, 1683–1757; siege and capture of Sebastopol, 1854–1855). The Line 3 platform opened 19 November 1904 as Rue Saint-Denis, after the old road to the town of Saint-Denis; it was renamed 15 October 1907. Context facts for Line 3 (to avoid repeating the Line 4 context): until 19 November 1904 trains ran through without stopping; the two lines cross at right angles under the ticket hall, with the Line 3 tunnel below Line 4; the Line 3 platforms were renovated in 2015, which removed the last of their metal panelling. A service track to Line 11 joins Line 3 just east of the station.

- [Réaumur - Sébastopol · Wikipédia](https://fr.wikipedia.org/wiki/R%C3%A9aumur_-_S%C3%A9bastopol_(m%C3%A9tro_de_Paris))

### 17. Arts et Métiers (shared with Line 11; owner after insertion: Line 3)

Named for the Conservatoire national des arts et métiers, which first trained technicians and engineers through demonstrations with scientific objects and now houses the Musée des Arts et Métiers. The Cnam article gives its foundation by Abbé Henri Grégoire on 10 October 1794 (19 vendémiaire an III), which replaces the scout's unsourced "1794". Reuse the Line 11 name and etymology byte for byte if Line 11 lands first. The Line 3 platform opened 19 October 1904 with the first section; Line 11 followed on 28 April 1935. Context facts for Line 3: the Line 3 platform is on a curve under the corner of Rue Réaumur and Rue de Turbigo; after 1988 it received a green "Ouï-dire" decoration. The copper submarine decor of October 1994 is on the Line 11 platform, for the Conservatoire's bicentenary, and belongs in the Line 11 context, not Line 3.

- [Arts et Métiers · Wikipédia](https://fr.wikipedia.org/wiki/Arts_et_M%C3%A9tiers_(m%C3%A9tro_de_Paris))
- [Conservatoire national des arts et métiers · Wikipédia](https://fr.wikipedia.org/wiki/Conservatoire_national_des_arts_et_m%C3%A9tiers)

### 18. Temple

Named for Rue du Temple, which refers to the Knights Templar, who settled in this area in the middle of the 13th century (station article). Opened 19 October 1904 with the first section. Context facts: the station article says Temple is one of two names shared by stations in London and Paris (with Saint-Paul on Line 1), and London's Temple station is also named for the Templars. In 1982 the artist Hervé Mathieu-Bachelot made a mosaic, "Couleur en masses", inside the station. The station is very close to République.

- [Temple · Wikipédia](https://fr.wikipedia.org/wiki/Temple_(m%C3%A9tro_de_Paris))
- [Rue du Temple · Wikipédia](https://fr.wikipedia.org/wiki/Rue_du_Temple)

### 19. République (shared; owner after insertion: Line 3)

Reuse `line5.ts` name and etymology exactly. The Line 3 platform opened 19 October 1904 with the first section, the first line at the square; Line 5 followed on 15 November 1907, Line 8 on 5 May 1931, Line 9 on 10 December 1933 and Line 11 on 28 April 1935. Context facts for Line 3 (Lines 5 and 9 use the Marianne statue): the station article says République was the first network station with lifts, in 1910, and held the record of five metro lines before the RER (since equalled by Châtelet). The Line 3 platforms lie under the east part of the square (station article). The line article says the Line 3 station lies below the Line 5 tunnel, and that west of the station the line passes under Lines 5, 8 and 9 and over Line 11. A 2026–2034 renovation will close each line's platforms in turn; this is time-bound and should not be used.

- [République · Wikipédia](https://fr.wikipedia.org/wiki/R%C3%A9publique_(m%C3%A9tro_de_Paris))

### 20. Parmentier

Named for Avenue Parmentier, which honours the agronomist Antoine-Augustin Parmentier (1737–1813), who promoted the potato as human food. Opened 19 October 1904 with the first section. Context facts: the platforms carry a cultural decoration about Parmentier and the potato, with metal panelling shaped like a potato net, a statue of Parmentier handing out potatoes on the Gallieni-bound platform and display cases of pre-Columbian objects. The station is deeper than usual because the line passes under the Canal Saint-Martin nearby. Its single entrance has a Guimard surround listed as a historic monument since 29 May 1978. Caution: the station article says the panelling was removed in July 2026 for tile repairs ("Coup de propre"). Describe the decoration without saying it is on display now, or check before publishing.

- [Parmentier · Wikipédia](https://fr.wikipedia.org/wiki/Parmentier_(m%C3%A9tro_de_Paris))
- [Antoine-Augustin Parmentier · Wikipedia](https://en.wikipedia.org/wiki/Antoine-Augustin_Parmentier)

### 21. Rue Saint-Maur

Named for Rue Saint-Maur, an old road from the abbey of Saint-Maur to the abbey of Saint-Denis; it takes the name of the first abbey, which received the relics of Saint Maurus in 868. Opened 19 October 1904 as Saint-Maur and renamed Rue Saint-Maur on 1 September 1998, so that passengers would not confuse it with the town of Saint-Maur-des-Fossés and its RER A stations. Context facts: the station article says it is one of eight stations whose name starts with the type of street (with Rue de la Pompe and Rue des Boulets on Line 9, which are in the atlas), and one of the few metro stations with no RATP bus connection. Its platforms are among the few that keep a complete orange-brown "Andreu-Motte" decoration, except on the tympans (station article). The street article confirms the old road between the two abbeys; the relics of 868 are in the station article only.

- [Rue Saint-Maur · Wikipédia](https://fr.wikipedia.org/wiki/Rue_Saint-Maur_(m%C3%A9tro_de_Paris))
- [Rue Saint-Maur · Wikipédia](https://fr.wikipedia.org/wiki/Rue_Saint-Maur)

### 22. Père Lachaise (shared with Line 2 later)

Named for the Père-Lachaise cemetery, the largest cemetery inside Paris. The cemetery takes its name from François d'Aix de La Chaise (1624–1709), the Jesuit confessor of Louis XIV for 34 years; the cemetery was created on a former Jesuit property where he lived (his article). The cemetery article says the cemetery opened on 21 May 1804 (1 prairial an XII); the scout's "opened 1804" is therefore sourced. The person article's lead spells the name "La Chaize"; its title and the cemetery article use "La Chaise". Spellings differ by referent: "La Chaise" (the person), "Père-Lachaise" (the cemetery), "Père Lachaise" (the station). The Line 3 platform opened 19 October 1904 as the eastern terminus of the first section, until 25 January 1905; Line 2 had opened here on 25 February 1903. Context facts: on 25 February 1909 it became the first network station with an escalator, because the Line 2 platforms are deeper than Line 3's. The Line 3 platform is one of the four 1904 stations just below the street with a metal ceiling (line article). The station article says the station is at a side gate of the cemetery; the main gate is nearer Philippe Auguste. Write the etymology line-neutral, because Line 2 will own it.

- [Père Lachaise · Wikipédia](https://fr.wikipedia.org/wiki/P%C3%A8re_Lachaise_(m%C3%A9tro_de_Paris))
- [Cimetière du Père-Lachaise · Wikipédia](https://fr.wikipedia.org/wiki/Cimeti%C3%A8re_du_P%C3%A8re-Lachaise)
- [François d'Aix de La Chaise · Wikipédia](https://fr.wikipedia.org/wiki/Fran%C3%A7ois_d%27Aix_de_La_Chaise)

### 23. Gambetta

Named for Place Gambetta and Avenue Gambetta, which honour Léon Gambetta (1838–1882), member of the 1870 Government of National Defence, Président du Conseil and deputy for the 20e arrondissement. The English article adds that he proclaimed the Third Republic in 1870. Opened 25 January 1905 as the eastern terminus, on a turning loop round the 20e mairie with two half-stations. Context facts: for the 1971 extension to Bagnolet, a new through station opened on 23 August 1969 west of the square. It absorbed the nearby Martin Nadaud station, whose platforms now extend Gambetta's to the west and whose entrances became Gambetta's western entrances. The old north half-station became the Line 3bis terminus. The corridor from the Line 3 platform to Line 3bis is curved and elliptical because it was once a single-track tunnel. Martin Nadaud was a 19th-century French politician and former mason from the Creuse who promoted a pensions law (Martin Nadaud station article; his birth and death years are not in any linked source, so do not give them). The Gambetta article gives the full Line 3 platform length as 196 m (see conflict 4).

- [Gambetta · Wikipédia](https://fr.wikipedia.org/wiki/Gambetta_(m%C3%A9tro_de_Paris))
- [Léon Gambetta · Wikipedia](https://en.wikipedia.org/wiki/L%C3%A9on_Gambetta)
- [Martin Nadaud (métro de Paris) · Wikipédia](https://fr.wikipedia.org/wiki/Martin_Nadaud_(m%C3%A9tro_de_Paris))

### 24. Porte de Bagnolet

Named for the Porte de Bagnolet, the city gate next to the town of Bagnolet. Opened 2 April 1971 with the extension from Gambetta to Gallieni. Context facts: the ground is a mix of gypsum, sand and clay, so the station stands on eighty piles, each one metre wide, anchored in limestone 27 m down; the tunnel and station were built with diaphragm walls (line article). Its opening caused Line 2's Bagnolet station to be renamed Alexandre Dumas on 13 September 1970. The station article says it is the most recent station at a Paris gate and the only one built at the city edge after the Second World War. Connection with tram T3b.

- [Porte de Bagnolet · Wikipédia](https://fr.wikipedia.org/wiki/Porte_de_Bagnolet_(m%C3%A9tro_de_Paris))
- [Ligne 3 du métro de Paris · Wikipédia](https://fr.wikipedia.org/wiki/Ligne_3_du_m%C3%A9tro_de_Paris)
- [Porte de Bagnolet · Wikipédia](https://fr.wikipedia.org/wiki/Porte_de_Bagnolet)

### 25. Gallieni

Named for Avenue Gallieni in Bagnolet, which honours Joseph Gallieni (1849–1916), made Marshal of France posthumously in 1921 (station article). The English article confirms his dates and that, as military governor of Paris in 1914, he played an important role in the First Battle of the Marne, when a small part of the Sixth Army under his command was rushed to the front in commandeered Paris taxis. This replaces the scout's unsourced claims. Opened 2 April 1971 as the eastern terminus. Context facts: the station was built in an open cut inside the motorway interchange where the A3 meets the Boulevard Périphérique (line article). It lies under the Paris-Gallieni international coach station, closed since 2020. The subtitle "Parc de Bagnolet" refers to the nearby Parc Jean-Moulin – Les Guilands.

- [Gallieni · Wikipédia](https://fr.wikipedia.org/wiki/Gallieni_(m%C3%A9tro_de_Paris))
- [Joseph Gallieni · Wikipedia](https://en.wikipedia.org/wiki/Joseph_Gallieni)

## Open questions for verification (B2)

- Anatole France: the station article gives no opening date; 1937 comes from the line chronology. B2: the French line article also says three new stations opened on 24 September 1937 and names Anatole France among them. No linked source gives a separate date. Still a single source (the line article).
- Europe: the Place de l'Europe article (title "Place de l'Europe - Simone Veil (Paris)") could not be read because Wikipedia rate-limited the API (HTTP 429). The 2018 dates come from the station article. B2: not linked, still unread; the station article alone supports 25 April and 29 May 2018.
- Rue du Temple and Rue Saint-Maur street articles were rate-limited too; the Templar and abbey facts rest on the station articles. B2: both read. Rue du Temple confirms the Templars settled there in the middle of the 13th century. Rue Saint-Maur confirms the road from the abbey of Saint-Maur to the abbey of Saint-Denis; the relics of 868 are in the station article only.
- Arts et Métiers: confirm whether Line 11 has landed and copy its etymology strings exactly. B2: at repo HEAD 13e71de there is no `line11.ts` and no `"arts-et-metiers"` id in `apps/web/src/data`. Check again at B3.
- Parmentier: confirm whether the potato decoration is back after the July 2026 works before writing it in the present tense. B2: no linked source says it is back. Use the past tense or a neutral form.
- Single-source facts: Champerret derivation, Vallier carpenter, Villiers "Villare", Louise Michel "fifth of eight", Temple "two shared names". Each is sourced to its station article only.

Verified 2026-10-06 by an independent agent.

All 56 links were opened on 6 October 2026: 55 Wikipedia pages through the MediaWiki API (plain-text extracts; no page was missing or redirected) and the IDFM dataset page (HTTP 200) with its records API. No link is dead. Station count: IDFM gives 25 distinct stops for `IDFM:C01373`, equal to the 25 stations in this audit. Shared-station owners and `area` values were checked against `apps/web/src/data` at HEAD 13e71de.

## Corrections

1. Route and method: added the B2 re-check of the IDFM count (50 records, 25 distinct stops).
2. Colour: the `6e6e00` value had no link. Added the IDFM referentiel-des-lignes dataset link and the text colour `ffffff`, both checked.
3. Closed stations: "Villiers loop ... now sidings" was not supported. The line article says the loop became meeting and exam rooms and is now disused; the Villiers article says it is used for storage and driver training. Now marked as a conflict, with no present use stated. The Champerret loop sidings claim was kept (two sources).
4. Not used: the WWII newspaper panels at Réaumur – Sébastopol are in the French Line 3 article, although not in the station article. Corrected the claim that they had no source. They are still dropped.
5. Conflict 4: the 196 m Gambetta platform length is in the Gambetta article ("Quais"). Corrected the claim that it had no source.
6. New conflict 11: the western extension. The English article says it is not backed by IDFM; the French article says it is in the April 2023 SDRIF. Station 1 now says this.
7. New conflict 12 and station 6 (Wagram): the station article's "avenue opened in 1853" conflicts with the Avenue de Wagram article (1789 section, named 2 March 1864). The opening year was removed.
8. Station 4 (Porte de Champerret): added what the gate article says (a locality of Neuilly, subdivided from 1822) and the Nicolas Levallois article's confirmation of the 1867 union. The "champ Perret" derivation is still single-sourced.
9. Station 5 (Pereire): marked the Midi-company fact as the station article's statement, and added the boulevard article's naming date (2 August 1855, Neuilly). Added the line article as the source for the 40‰ gradient.
10. Station 9 (Europe): the centenary decoration was LCD screens, and the station article says they were removed in the first half of 2024. Added this, with a past-tense rule.
11. Station 11 (Havre – Caumartin): made the 15 m statement precise. The line article places Auber below the Line 3 tunnel under Rue Auber, between Opéra and Havre – Caumartin.
12. Station 19 (République): "below Lines 8 and 9" did not match the sources. Replaced it with the line article's text (the station is below the Line 5 tunnel; to the west the line passes under Lines 5, 8 and 9 and over Line 11).
13. Station 21 (Rue Saint-Maur): the "complete Andreu-Motte" claim now says "except on the tympans", as the station article does. Added that the street article confirms the abbey road.
14. Station 22 (Père Lachaise): the cemetery opening date (21 May 1804) is in the cemetery article. Corrected the claim that it had no source. Noted the "La Chaize" spelling in the person article's lead.
15. Station 23 (Gambetta): Martin Nadaud's dates "(1815–1898)" are in no linked source and were removed. The text now uses the Martin Nadaud article: a 19th-century politician and former mason from the Creuse.
16. Station 25 (Gallieni): "part of the Sixth Army" became "a small part", as in the English article.
17. Open questions: added B2 results for Anatole France, Europe, Rue du Temple and Rue Saint-Maur, Arts et Métiers (Line 11 not yet in the repo) and Parmentier.

All other facts matched their linked sources and were not changed.

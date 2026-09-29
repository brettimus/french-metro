# Line 6 source audit

Checked 29 September 2026. Scope: all 28 current stations, English and French. The route runs from Charles de Gaulle – Étoile to Nation, with one continuous path and no branches.

## Route and method

[Wikipedia's Ligne 6 du métro de Paris](https://fr.wikipedia.org/wiki/Ligne_6_du_m%C3%A9tro_de_Paris) and the [English Paris Métro Line 6](https://en.wikipedia.org/wiki/Paris_M%C3%A9tro_Line_6) article both list the same 28 stations in the same order, with no branches. [itineraire-metro.fr](https://www.itineraire-metro.fr/ligne-6.html) was opened as an independent third check and returned the identical sequence (given terminus to terminus, reversed). Bonjour RATP's line page (`bonjour-ratp.fr/lignes-metro/ligne-6/` and its `/en/` equivalent) and the RATP plan page (`ratp.fr/en/vos-lignes/metro/6`) returned HTTP 403 to direct fetches during this audit and could not be opened directly; a web search surfaced their indexed content instead, listing the same 28 stations and the same two termini, so the route is confirmed by three independently opened sources plus one indexed-but-unopened official source. The verification pass added an official check: the Île-de-France Mobilités open-data API ([arrets-lignes dataset](https://data.iledefrance-mobilites.fr/explore/dataset/arrets-lignes/), filtered to Metro line 6) returns exactly these 28 stop names and no others. That dataset lists stops without order, so the order rests on the two Wikipedia articles and itineraire-metro.fr. No recent extension exists; the current terminus-to-terminus configuration has been unchanged since 1942.

Every station article below was opened on French Wikipedia (the `(métro de Paris)` disambiguated page); a few also needed a street or square article, or an English-language article, to check a specific claim. Each English explanation starts with the naming reason; each French explanation preserves the same chain. Context adds a separate, different fact than the one used for the same station on any other line. Short explanations are not padded to meet a word target.

**Renumbering note (applies to stations 1–19, Charles de Gaulle – Étoile through Place d'Italie):** this arc did not exist as "Line 6" continuously. It opened between 1900 and 1906, first as a branch of Line 1 and from 1903 as the Circulaire Sud ("Line 2 Sud"), then was folded into "Line 5" in October 1907 (French Wikipedia gives 17 October 1907; English Wikipedia gives 14 October 1907). During the 1931 Colonial Exposition in the Bois de Vincennes, Line 6 temporarily ran from Nation through to Étoile over this arc; the Place d'Italie station article places this between May and December 1931, and service reverted when the exposition ended. The Étoile–Place d'Italie arm passed permanently to Line 6 only on 6 October 1942 (the date in the French line and station articles; English Wikipedia gives 12 October 1942), which is also when it was joined end to end with the Place d'Italie–Nation arm (open since 1 March 1909 as Line 6 proper) to form today's line. Physical opening dates recorded below therefore predate the station's Line 6 identity for stations 1–18; see "Editorial decisions" for how this is flagged, and "Open questions" for the field-level decision left to the building phase.

## Editorial decisions

- Stations 1–18 (Charles de Gaulle – Étoile through Corvisart) physically opened in 1900, 1903 or 1906 under earlier line numbers ("2 Sud", then "5"), not as Line 6. The station text notes the physical opening year in context prose rather than asserting it as a Line 6 opening; see the open question on the `opened` field below.
- The 1931 temporary Étoile–Nation service (during the Colonial Exposition) is described as temporary and reversed, matching the Ligne 6 and Place d'Italie articles; it is not conflated with the permanent 1942 change. The opened sources do not give exact start and end days, so copy should say "in 1931" or "from May to December 1931". (during the Colonial Exposition) is described as temporary and reversed, matching both the Bir-Hakeim and Ligne-6 overview articles; it is not conflated with the permanent 1942 change.
- Montparnasse – Bienvenüe: this stop opened on 24 April 1906 as "Avenue du Maine". The French station article states that on 30 June 1933 "la station Avenue du Maine de la ligne 5 est renommée Bienvenüe". Line 5 is also what the 1907 and 1942 dates imply for that arc in 1933 (the 1931 Line 6 service had ended). Copy may say it was then a Line 5 stop, or avoid naming the line. in 1906 as "Avenue du Maine". Secondary sources place the renaming to "Bienvenüe" (honouring engineer Fulgence Bienvenüe) in 1933, before the line carried the "Line 6" identity end to end; one search summary loosely attributed that 1933 renaming to "Line 5" rather than the arc that became Line 6. The station text avoids asserting which line-number label applied in 1933 and states only the renaming date and the 1942 merger into the combined interchange, both of which are corroborated by the RATP heritage article and Wikipedia.
- Trocadéro: the battle it commemorates is dated (30–31 August 1823, the Trocadero fort at Cadiz), confirmed independently of the station article; the square itself was called Place du Roi-de-Rome from 1869 and took the Trocadéro name in 1877, then its current double name in 1978. The station text uses the battle and does not assert an exact one-to-one date between the square's 1877 renaming and the fort's 1823 capture beyond "commemorates".
- Nation: the square was Place du Trône from 1660 (for Louis XIV's ceremonial entry) and Place du Trône-Renversé from 1792, becoming Place de la Nation only in 1880 for Bastille Day under the Third Republic. The station text keeps this chain brief and does not claim the metro station itself carried an earlier name; it opened in 1909 already inside the "Nation" square.
- Chevaleret: the street article calls the etymology obscure and gives the two usual explanations (a landowner's name, or a path that let only one horse pass abreast). It then calls the horse reading "peu crédible" because a Chevaleret family lived at Ivry-sur-Seine. Copy should say the origin is uncertain, name the family as the more likely source according to that article, and may mention the horse reading only as a less credible alternative. contested in its own Wikipedia article (a landowning family attested at Ivry-sur-Seine versus a path only wide enough for a single horse abreast). Both readings are kept as alternatives; neither is asserted as settled.
- Dugommier and Picpus both gave up earlier names (Charenton, Saint-Mandé) to avoid confusion with newer stations elsewhere. For Picpus (1 March 1937) the source gives this reason directly: the Line 1 station then called Tourelle, renamed Saint-Mandé – Tourelle on 26 April 1937. For Dugommier (12 July 1939) the source says "probablement": the reason is probably the Line 8 extension to Charenton – Écoles, then under construction. Copy must keep that qualifier. names chosen for streets/avenues that no longer serve as useful landmarks (Charenton, Saint-Mandé); both renamings avoided collision with a differently located station of the same name elsewhere on the network. This is stated directly rather than as a coincidence.
- Daumesnil: the adjoining square was renamed for Félix Éboué in 1946, and the station carries "Félix Éboué" as a subtitle, but the station's own name still honours General Daumesnil; the two are not conflated.
- Corvisart WWI raid: the source says a German aerial bomb ("torpille") exploded in front of the station on the night of 1 to 2 June 1918. It does not describe damage or say the station was the target, so copy should state only that a bomb exploded in front of the station. bombing that damaged Corvisart (night of 1–2 June 1918) was aimed at the station; it is described as wartime aerial-bombardment damage to the vicinity.
- Spelling: Montparnasse – Bienvenüe keeps the diaeresis on the "ü" (part of Fulgence Bienvenüe's surname). Charles de Gaulle – Étoile, Sèvres – Lecourbe, Montparnasse – Bienvenüe and La Motte-Picquet – Grenelle use a spaced en dash, matching the convention already in the app (Line 4 uses "Montparnasse – Bienvenüe"). the diaeresis on the "ü" (part of Fulgence Bienvenüe's surname, not a French word). Sèvres – Lecourbe and La Motte-Picquet – Grenelle keep the en dash used on the official map, matching the Line 5/7 convention already in the app.
- Shared station IDs reused from other lines: `montparnasse-bienvenue` (Line 4), `raspail` (Line 4), `denfert-rochereau` (Line 4), `place-ditalie` (Line 5 and Line 7), `bercy` (Line 14). Each keeps the naming chain already used on that line and pairs it with a different, separately verified context fact for Line 6 (noted station by station below) so no two lines repeat the same sentence.
- No em dashes are used in this document's prose or intended for the data. En dashes remain in compound station names.

## Station checks and sources

### 1. Charles de Gaulle – Étoile

Place de l'Étoile is named for the star shape of the twelve avenues that meet there; "Charles de Gaulle" was added in 1970, after the square was renamed for the general, who died on 9 November 1970. These platforms opened on 2 October 1900 for a Line 1 branch from Étoile to Trocadéro, which became Line 2 Sud in 1903; this arc became Line 6 permanently only in 1942 (see renumbering note above). The station is the commercial terminus on a loop; Kléber is the technical terminus.

- [Charles de Gaulle – Étoile · Wikipédia](https://fr.wikipedia.org/wiki/Charles_de_Gaulle_-_%C3%89toile_(m%C3%A9tro_de_Paris))
- [Charles de Gaulle–Étoile station · Wikipedia](https://en.wikipedia.org/wiki/Charles_de_Gaulle%E2%80%93%C3%89toile_station)

### 2. Kléber

Avenue Kléber honours General Jean-Baptiste Kléber (1753–1800), who distinguished himself in the wars of the French Revolution. Opened 2 October 1900. In 1969, works to prepare for rubber-tyred trains added two side half-stations with their own tracks; metal arches, first made in the Second World War to prevent the collapse of bombed stations, supported the vault during the works. Kléber is now a four-track technical terminus where trains lay over, because the article says the commercial terminus at Étoile is too constrained for that role.

- [Kléber · Wikipédia](https://fr.wikipedia.org/wiki/Kl%C3%A9ber_(m%C3%A9tro_de_Paris))

### 3. Boissière

Rue Boissière is named for the old Croix Boissière, a cross decorated with boxwood ("buis") on feast days such as Palm Sunday. Opened 2 October 1900; its single entrance keeps an original Guimard édicule, listed as a historic monument on 12 February 2016.

- [Boissière · Wikipédia](https://fr.wikipedia.org/wiki/Boissi%C3%A8re_(m%C3%A9tro_de_Paris))

### 4. Trocadéro

Named for the Place du Trocadéro, itself renamed in 1877 (from Place du Roi-de-Rome, created 1869) to commemorate the French capture of the Trocadero fort at Cadiz on 30–31 August 1823. Opened 2 October 1900; the station had one of the first escalators on the network, which remained until 1959. The square was renamed Place du Trocadéro-et-du-11-Novembre by a municipal decree of 18 October 1978.

- [Trocadéro · Wikipédia](https://fr.wikipedia.org/wiki/Trocad%C3%A9ro_(m%C3%A9tro_de_Paris))
- [Bataille du Trocadéro · Wikipédia](https://fr.wikipedia.org/wiki/Bataille_du_Trocad%C3%A9ro)
- [Place du Trocadéro-et-du-11-Novembre · Wikipédia](https://fr.wikipedia.org/wiki/Place_du_Trocad%C3%A9ro-et-du-11-Novembre)

### 5. Passy

Named for the old village of Passy, annexed to Paris in 1860, via the former quai de Passy (now avenue du Président-Kennedy). Opened 6 November 1903 (the station article and English Wikipedia; the French line article says 5 November) as the terminus until the 24 April 1906 extension across the Seine; the station is partly underground into the Chaillot hillside and partly on the viaduct crossing the Seine and the Pont de Bir-Hakeim.

- [Passy · Wikipédia](https://fr.wikipedia.org/wiki/Passy_(m%C3%A9tro_de_Paris))

### 6. Bir-Hakeim

Opened 24 April 1906 as "Grenelle", for the boulevard; renamed 18 June 1949 after the neighbouring Pont de Passy had been renamed Pont de Bir-Hakeim, commemorating the Battle of Bir Hakeim (27 May – 11 June 1942), where Free French forces held off Axis assaults. Elevated above the central strip of boulevard de Grenelle; an October 2007 – February 2008 renovation replaced the glass roofs and added a double stained-glass work by the American artist Judy Ledgerwood, *Night and Day*. The Pont de Bir-Hakeim is registered ("inscrit") as a historic monument.

- [Bir-Hakeim · Wikipédia](https://fr.wikipedia.org/wiki/Bir-Hakeim_(m%C3%A9tro_de_Paris))

### 7. Dupleix

Rue Dupleix honours Joseph François Dupleix (1697–1763), a French colonial administrator who became governor general for the French East India Company in 1742. Opened 24 April 1906; the site earlier held the Grenelle wall where executions took place from 1797 to 1815, including General Malet's in 1812. A pillar supporting the platforms carries what the article calls "perhaps" the last surviving public manometer, formerly used to detect leaks in the water network.

- [Dupleix · Wikipédia](https://fr.wikipedia.org/wiki/Dupleix_(m%C3%A9tro_de_Paris))

### 8. La Motte-Picquet – Grenelle

Combines Admiral Toussaint-Guillaume Picquet de La Motte (1720–1791) and the former commune of Grenelle, annexed in 1860. The elevated Line 6 station opened 24 April 1906 as "La Motte-Picquet" and took its combined name on 13 July 1913, when underground Line 8 opened. Line 10 arrived in stages from 29 July 1937. Underground, Lines 8 and 10 share one central platform in one direction, with separate half-stations for the other directions.

- [La Motte-Picquet – Grenelle · Wikipédia](https://fr.wikipedia.org/wiki/La_Motte-Picquet_-_Grenelle_(m%C3%A9tro_de_Paris))

### 9. Cambronne

Place and rue Cambronne honour General Pierre Cambronne (1770–1842), a Napoleonic-era officer. Opened 24 April 1906; elevated above boulevard Garibaldi; all the glass roofs over the tracks were replaced in summer 2014, and a wider renovation finished on 30 June 2015.

- [Cambronne · Wikipédia](https://fr.wikipedia.org/wiki/Cambronne_(m%C3%A9tro_de_Paris))

### 10. Sèvres – Lecourbe

Rue de Sèvres led toward the town of Sèvres; General Claude Jacques Lecourbe (1758–1815) fought at Fleurus (1794) and Zurich (1799). Rue Lecourbe continues rue de Sèvres along the line of a Roman road. The station opened 24 April 1906 as "Avenue de Suffren", was renamed "Rue de Sèvres" in October 1907 (the station article says 17 October, the line article 15 October) and became "Sèvres – Lecourbe" in November 1913.

- [Sèvres – Lecourbe · Wikipédia](https://fr.wikipedia.org/wiki/S%C3%A8vres_-_Lecourbe_(m%C3%A9tro_de_Paris))

### 11. Pasteur

Honours chemist and biologist Louis Pasteur, founder of microbiology and developer of pasteurization and of vaccines including one against rabies; the station sits at the meeting of rue de Vaugirard and boulevard Pasteur. The Line 6 platforms opened in 1906 on a line of the CMP company. The station also became a stop on a line of the rival Nord-Sud company (today's Line 12), which is why the two companies' decorative styles coexist here; the article names Pasteur as one of three stations where both styles appear. The opened sources do not give the Nord-Sud opening date here, so copy must not say the two networks met in 1906.

- [Pasteur · Wikipédia](https://fr.wikipedia.org/wiki/Pasteur_(m%C3%A9tro_de_Paris))

### 12. Montparnasse – Bienvenüe

Shared ID `montparnasse-bienvenue` (naming chain already used on Line 4: Montparnasse as a student joke referencing Mount Parnassus, Bienvenüe honouring metro engineer Fulgence Bienvenüe). Line 6's separate context fact: this stop opened 24 April 1906 as "Avenue du Maine"; as a Line 5 stop it was renamed "Bienvenüe" on 30 June 1933, then merged with the Montparnasse station on 6 October 1942 as Montparnasse – Bienvenüe. Line 4's context already covers the 1942 merger, so prefer the 1906 name and the 1933 renaming for Line 6. A high-speed moving walkway installed in 2002 was taken out of service in March 2011 after many passenger complaints about safety and reliability.

- [Montparnasse – Bienvenüe · Wikipédia](https://fr.wikipedia.org/wiki/Montparnasse_-_Bienven%C3%BCe_(m%C3%A9tro_de_Paris))
- [RATP · Un jour, une station : Montparnasse-Bienvenüe](https://www.ratp.fr/en/decouvrir/coulisses/au-quotidien/un-jour-une-station-montparnasse-bienvenue-hommage-au-pere-du)

### 13. Edgar Quinet

Named for historian and politician Edgar Quinet (1803–1875), via the boulevard. Opened 24 April 1906; its single entrance, on the central strip of the boulevard at no. 11, is a fixed staircase with a railing and a Dervaux-style lamp post. The station lies just east of the junction where boulevard Edgar-Quinet meets rue de la Gaîté, rue d'Odessa, rue du Montparnasse and rue Delambre.

- [Edgar Quinet · Wikipédia](https://fr.wikipedia.org/wiki/Edgar_Quinet_(m%C3%A9tro_de_Paris))

### 14. Raspail

Shared ID `raspail` (naming chain already used on Line 4: boulevard Raspail honours scientist and republican politician François-Vincent Raspail). Line 6's separate context fact: the Line 6 platforms opened 24 April 1906; the entrance has a Hector Guimard balustrade, and in 1958 the RATP gave the entrance's surround portico to the Museum of Modern Art (MoMA) in New York. The source does not date the balustrade, so copy must not say it dates from 1906.

- [Raspail · Wikipédia](https://fr.wikipedia.org/wiki/Raspail_(m%C3%A9tro_de_Paris))

### 15. Denfert-Rochereau

Shared ID `denfert-rochereau` (naming chain already used on Line 4: the square, formerly Place d'Enfer, honours Colonel Pierre Philippe Denfert-Rochereau, defender of Belfort in 1870–71). Line 6's separate context fact: the Line 6 platforms, opened 24 April 1906, are underground and curve partly beneath Line 4. They were among the rare stations to keep the 1970s "Andreu-Motte" decoration intact (orange light strips, flat brown tiles, bevelled white tiles) until its benches were removed in 2020.

- [Denfert-Rochereau · Wikipédia](https://fr.wikipedia.org/wiki/Denfert-Rochereau_(m%C3%A9tro_de_Paris))

### 16. Saint-Jacques

Named for its position in the former Faubourg Saint-Jacques, at the crossing of boulevard Saint-Jacques with rue du Faubourg-Saint-Jacques and rue de la Tombe-Issoire. The faubourg was the settlement outside the Porte Saint-Jacques of Philippe Auguste's wall, which served the chapel of Saint-Jacques where the Dominicans (called Jacobins) settled. Opened 24 April 1906; the platforms are at ground level ("à fleur de sol"), under canopies on central posts, with no advertising, an arrangement the article calls unique on the network. It is also one of the rare stations with a building above the tracks.

- [Saint-Jacques · Wikipédia](https://fr.wikipedia.org/wiki/Saint-Jacques_(m%C3%A9tro_de_Paris))
- [Rue du Faubourg-Saint-Jacques · Wikipédia](https://fr.wikipedia.org/wiki/Rue_du_Faubourg-Saint-Jacques)

### 17. Glacière

Rue de la Glacière was an old path to Gentilly; "glacière" refers to ice from the many ponds of the Bièvre valley, which froze in winter and was stored in masonry wells and old quarries for use in summer. Opened 24 April 1906; elevated above boulevard Auguste-Blanqui.

- [Glacière · Wikipédia](https://fr.wikipedia.org/wiki/Glaci%C3%A8re_(m%C3%A9tro_de_Paris))

### 18. Corvisart

Rue Corvisart honours Jean-Nicolas Corvisart (1755–1821), Napoleon I's personal physician and a specialist in heart and lung disease. Opened 24 April 1906; during a German air raid on the night of 1 to 2 June 1918, a bomb exploded in front of the station.

- [Corvisart · Wikipédia](https://fr.wikipedia.org/wiki/Corvisart_(m%C3%A9tro_de_Paris))

### 19. Place d'Italie

Shared ID `place-ditalie` (naming chain already used on Lines 5 and 7: the square at the start of avenue d'Italie, the historic start of the road to Italy, later Route nationale 7). Line 6's separate context fact: the station opened on 24 April 1906 as the eastern terminus of Line 2 Sud from Étoile. When Line 6 opened on 1 March 1909, it reused that stop, disused since 1907, as its western terminus from Nation. Only on 6 October 1942 did Line 6 pass through, with Line 5 terminating here on the Place d'Italie loop. Line 5's copy already uses the 1942 transfer and Line 7's copy uses the 1930–31 history, so prefer the 1909 terminus fact for Line 6.

- [Place d'Italie · Wikipédia](<https://fr.wikipedia.org/wiki/Place_d'Italie_(m%C3%A9tro_de_Paris)>)

### 20. Nationale

Rue Nationale honours the Garde nationale, the civic militia created during the French Revolution; the street took this name after the Revolution of 1848 to celebrate the Second Republic. Opened 1 March 1909, part of the original Place d'Italie–Nation section; an aerial station over the central strip of boulevard Vincent-Auriol, under a canopy in the style of railway stations of the period, with bevelled white tiles on the inner side of the supports and geometric brick patterns on the outer side.

- [Nationale · Wikipédia](https://fr.wikipedia.org/wiki/Nationale_(m%C3%A9tro_de_Paris))

### 21. Chevaleret

Rue du Chevaleret takes its name from a lieu-dit of Ivry-sur-Seine, the commune the land belonged to before 1860; a "chemin du Chevaleret" is recorded in 1670. The street article calls the etymology obscure: a landowner's name or a path wide enough for one horse abreast. It judges the horse reading "peu crédible" because a Chevaleret family (extinct since the mid-20th century) lived at Ivry. Opened 1 March 1909; aerial, over boulevard Vincent-Auriol, between Nationale and Quai de la Gare.

- [Chevaleret · Wikipédia](https://fr.wikipedia.org/wiki/Chevaleret_(m%C3%A9tro_de_Paris))
- [Rue du Chevaleret · Wikipédia](https://fr.wikipedia.org/wiki/Rue_du_Chevaleret)

### 22. Quai de la Gare

Named for the quai de la Gare on the Seine's left bank, itself named for the river port ("gare d'eau") of Ivry, built near the Salpêtrière hospital from the end of Louis XV's reign; that port also gave its name to today's Quartier de la Gare. Opened 1 March 1909; a scene of Christophe Honoré's 2008 film *La Belle Personne* was shot there.

- [Quai de la Gare · Wikipédia](https://fr.wikipedia.org/wiki/Quai_de_la_Gare_(m%C3%A9tro_de_Paris))

### 23. Bercy

Shared ID `bercy` (naming chain already used on Line 14: rue and boulevard de Bercy preserve the name of the former settlement of Bercy, mostly annexed to Paris in 1860). Line 6's separate context fact: opened 1 March 1909 with the first Line 6 section, the underground Line 6 station runs beneath boulevard de Bercy and has an elliptical vault with bevelled white tiles. The elliptical vault is the standard profile (Dugommier, Daumesnil and Picpus have it too), so it is not a distinctive fact; prefer the 1909 opening with the first Line 6 section.

- [Bercy · Wikipédia](https://fr.wikipedia.org/wiki/Bercy_(m%C3%A9tro_de_Paris))

### 24. Dugommier

Opened 1 March 1909 as "Charenton"; "Charenton" came from rue de Charenton, which led to the village of Charenton (now Charenton-le-Pont). Renamed 12 July 1939, probably to avoid confusion with the Line 8 extension to Charenton – Écoles then under construction; the new name comes from rue Dugommier, honouring General Jacques François Dugommier (1738–1794) of the French Revolution. Passengers could change at street level to the former Reuilly station on the Vincennes line until the Bastille–Saint-Mandé section closed on 14 December 1969, when the Métro régional (forerunner of RER A) opened to Nation.

- [Dugommier · Wikipédia](https://fr.wikipedia.org/wiki/Dugommier_(m%C3%A9tro_de_Paris))

### 25. Daumesnil

Named for the former Place Daumesnil and avenue Daumesnil, honouring Baron General Pierre Daumesnil (1776–1832). Opened 1 March 1909; the Line 8 platforms opened on 5 May 1931, and a non-passenger service track connects the Line 6 and Line 8 tracks. The square was renamed on 8 June 1946 for Félix Éboué (1884–1944), colonial administrator and early Resistance figure, and the station carries "Félix Éboué" as a subtitle without its own name changing. Its Guimard entrance on avenue Daumesnil is a registered historic monument (1978, renewed 2016).

- [Daumesnil · Wikipédia](https://fr.wikipedia.org/wiki/Daumesnil_(m%C3%A9tro_de_Paris))

### 26. Bel-Air

Named for the Bel-Air district, on boulevard de Picpus between the Picpus and Bel-Air quarters. The station article does not explain the name, so the building phase should confirm the naming chain from a street or quarter source before writing copy. Opened in 1909 (the article gives only the year; the line article gives 1 March 1909 for the whole section); closed for the war in 1939 and stayed shut after the Liberation, not reopening until 7 January 1963. It is an open-air station at surface level between two tunnel sections, so trains climb to it and descend after it. This layout preserved the Vincennes railway (Paris-Bastille to the Marne valley), whose cutting the station crosses; that right-of-way is now the Coulée verte René-Dumont.

- [Bel-Air · Wikipédia](https://fr.wikipedia.org/wiki/Bel-Air_(m%C3%A9tro_de_Paris))

### 27. Picpus

Opened 1 March 1909 as "Saint-Mandé", for the avenue; renamed "Picpus" on 1 March 1937 to avoid confusion with the Line 1 station then called Tourelle (today Saint-Mandé), which became Saint-Mandé – Tourelle on 26 April 1937. The new name comes from boulevard de Picpus, which bounds the Picpus quarter, named after the old hamlet of "Pique-Puce". Its single entrance has a Guimard édicule, registered as a historic monument on 12 February 2016; the nearby Picpus Cemetery holds the grave of Lafayette, among others. The subtitle "Courteline" refers to avenue Courteline.

- [Picpus · Wikipédia](https://fr.wikipedia.org/wiki/Picpus_(m%C3%A9tro_de_Paris))

### 28. Nation

Place de la Nation was named Place du Trône after a throne was set up there on 26 August 1660 for the ceremonial entry of Louis XIV and Maria Theresa into Paris; it became Place du Trône-Renversé on 10 August 1792 and Place de la Nation for the national holiday of 14 July 1880, under the Third Republic. Line 6's platforms opened 1 March 1909; the article states that Nation is the only Métro station where two lines (2 and 6) terminate, both on loops. The Line 6 platforms are also the only ones at Nation that are not on a curve.

- [Nation · Wikipédia](https://fr.wikipedia.org/wiki/Nation_(m%C3%A9tro_de_Paris))
- [Place de la Nation (Paris) · Wikipédia](https://fr.wikipedia.org/wiki/Place_de_la_Nation_(Paris))

## Open questions

- **The `opened` field (answered).** No station on Lines 4, 5, 7 or 14 sets `opened` today; opening years appear only in context prose. Recommendation: omit `opened` on all Line 6 stations for consistency. If the building phase sets it anyway, use 1942 for stations 1–18 (the first permanent Line 6 service, per the contract "opening on the current line") and 1909 for stations 19–28, and never the 1900/1903/1906 build dates. These stations physically opened in 1900, 1903 or 1906 under earlier line numbers, and this arc's Line 6 identity was fixed only in 1942 (see the renumbering note). The type contract defines `opened` as "opening on the current line", which for this arc could mean either the physical build date or 1942. Line 5's audit sidestepped an analogous case (Place d'Italie) by omitting the field; the same approach, or a single explicit 1942 date for all of stations 1–18, are both defensible. Left to the building phase.
- **Montparnasse – Bienvenüe's 1933 line identity (answered).** The French station article states the 30 June 1933 renaming was of "la station Avenue du Maine de la ligne 5". This matches the line history (Line 5 from 1907; the 1931 Line 6 service had ended). No longer open. Secondary sources place the "Bienvenüe" renaming in 1933 but disagree on which line label applied to this arc at that moment, given the 1907/1931/1942 renumbering history. The station text above states only the renaming date and the 1942 merger, not the intervening line number; worth a second check before publishing if a firmer source turns up.
- **Chevaleret's etymology (revised).** The source does not present the two readings as equal: it calls the etymology obscure but calls the single-horse reading "peu crédible". Copy should say the origin is uncertain and that the family name is the more likely explanation. unresolved** in its own source article (landowner family vs. a single-horse path). The copy should keep both readings rather than pick one.

## Validation

- 28 unique station IDs (23 new, 5 reused from Lines 4, 5, 7 and 14) and one ordered path cover every stop once; no branches.
- Every station above has a naming explanation and a separately verified context fact drawn from a source opened during this audit.
- All source links use HTTPS; all 28 station source articles were opened directly except Bonjour RATP and ratp.fr, which returned HTTP 403 to direct fetches (see "Route and method") and were cross-checked instead through Wikipedia (FR and EN) and itineraire-metro.fr.
- Shared IDs match the existing entries on Lines 4, 5, 7 and 14, with a distinct context fact chosen for each so no sentence repeats across lines.
- No em dashes appear in this document. En dashes remain in compound station names.
- Data-contract typecheck, browser/functional checks, and copy-length tuning to 20–45 and 20–55 words per locale are owned by the building and review phases.

## Verification

Independent check on 29 September 2026 of commit 08463e8. Method: the full French Wikipedia wikitext of each station article (and of the Ligne 6, Rue du Chevaleret, Place de la Nation, Place du Trocadéro-et-du-11-Novembre, Rue du Faubourg-Saint-Jacques, Bataille du Trocadéro and Bataille de Bir Hakeim articles) was downloaded and each claim was compared with the article text. Bonjour RATP and ratp.fr still return HTTP 403. The station set was checked instead against Île-de-France Mobilités open data (the official transport authority dataset), which lists exactly the 28 stations above for Metro line 6.

### Route

- Confirmed: 28 stations, order as listed, termini Charles de Gaulle – Étoile and Nation, no branches. No change.

### Corrections made

1. **Place d'Italie (factual error).** The draft said the stop had been Line 6's midpoint "since the line's creation in 1909". False: from 1 March 1909 to 1942 (except in 1931) Place d'Italie was Line 6's western terminus. Rewritten.
2. **Denfert-Rochereau (factual error).** The draft called the Line 6 platforms "elevated" and "visibly different from the Line 4 platforms below". The source says they are underground, partly beneath Line 4, and does not make the comparison. Rewritten.
3. **Saint-Jacques (unsupported claim).** The Santiago de Compostela pilgrims' road and a "commandery" are not in the cited station or street articles, which trace the name to the Porte Saint-Jacques and the Dominicans' Saint-Jacques chapel. Removed.
4. **Raspail (unsupported date).** The source mentions a Guimard balustrade but does not date it to 1906. Date removed; MoMA portico fact added.
5. **Nation (uncited claim).** The 1968 automatic-gate trial is marked "Référence nécessaire" in the source. Removed. The "only station where two lines terminate" claim is kept, attributed to the article.
6. **Bercy (factual error).** "Unlike most of the line's elevated eastern run" is wrong: from Bercy to Nation the line is underground except Bel-Air. Removed. The elliptical vault is standard, so it is flagged as a weak fact.
7. **Pasteur (misleading chronology).** The draft said the station "opened in 1906 at the junction" of the CMP and Nord-Sud networks. The Line 6 platforms opened in 1906; the Nord-Sud line arrived later. Rewritten so it does not suggest that the two networks met in 1906.
8. **Picpus (wrong attribution).** The draft said the rename avoided confusion with "another Line 1 station of that name". The Line 1 station was then called Tourelle and became Saint-Mandé – Tourelle on 26 April 1937. Corrected.
9. **Dugommier (overstated certainty and wrong detail).** The source gives the Line 8 reason as "probablement", and Charenton – Écoles was still under construction in 1939. Only the Bastille–Saint-Mandé section of the Vincennes line closed in 1969, not the whole line. Both corrected.
10. **Daumesnil (misread).** "Linked by a service tunnel" was a misreading of a track-level service connection between Lines 6 and 8. Corrected; exact renaming date of the square (8 June 1946) added.
11. **Corvisart (misread).** The source says a bomb exploded in front of the station, not that the vicinity was damaged. Corrected.
12. **Chevaleret (misrepresented source).** The street article does not treat the two readings as equal: it calls the horse reading "peu crédible". The 1670 date refers to a "chemin du Chevaleret", not to a locality at Ivry. Corrected in the station entry, the editorial decision and the open question.
13. **Kléber.** "Vendée War and Egyptian campaign" is not in the source (it says wars of the French Revolution). "Rebuilt in 1969" overstated the works (two side half-stations added). Corrected.
14. **Boissière.** The cross was decorated with boxwood on feast days; it was not a "boxwood cross displayed" on those days. Corrected.
15. **Dupleix.** "Opponent of English influence in India" is not in the source. Removed. The manometer claim keeps the source's "perhaps".
16. **La Motte-Picquet – Grenelle.** The platform layout was misdescribed (it is not a "separate half-station for Line 10" only). The original name "La Motte-Picquet" and Line 10's 1937 arrival were added.
17. **Sèvres – Lecourbe.** The intermediate name "Rue de Sèvres" (October 1907) before the November 1913 name was missing. Added.
18. **Edgar Quinet.** The entrance is a plain fixed staircase with a railing and a Dervaux lamp post, not a "Dervaux-style ornamental staircase". Corrected.
19. **Bir-Hakeim.** The station was renamed after the Pont de Passy became the Pont de Bir-Hakeim; the bridge is "inscrit" (registered), wording made exact. Battle dates 27 May – 11 June 1942 confirmed against the battle article.
20. **Charles de Gaulle – Étoile.** The platforms opened in 1900 as a Line 1 branch, not as the "original Circulaire Sud terminus" (Line 2 Sud began in 1903). Corrected. Death date added to support "added in 1970".
21. **Nation.** The Trône-Renversé date (10 August 1792) and the 14 July 1880 naming were confirmed and made exact.
22. **Renumbering note.** The 1931 day-level dates (17 May – 6 December) were not found in any opened source and are replaced by "May to December 1931". The source conflicts on the 1907 merger date (17 vs 14 October), the 1942 transfer date (6 vs 12 October, French vs English Wikipedia) and the Passy opening (6 vs 5 November 1903) are now shown. The French station articles consistently use 6 October 1942 and 6 November 1903.
23. **Montparnasse – Bienvenüe open question answered.** The French station article names the 1933 stop as a Line 5 stop.
24. **`opened` field open question answered.** No existing line uses the field; recommend omitting it on Line 6.

### Confirmed without change

Trocadéro (1877 renaming, battle of 30 to 31 August 1823, escalator until 1959), Passy (1860 annexation, hillside and viaduct), Cambronne, Montparnasse – Bienvenüe (moving walkway 2002 to March 2011), Glacière, Nationale (1848 naming), Quai de la Gare (La Belle Personne, 2008), Bel-Air (closed 1939, reopened 7 January 1963), and the five shared IDs (`montparnasse-bienvenue`, `raspail`, `denfert-rochereau`, `place-ditalie`, `bercy`), which match the entries in apps/web/src/data. The Line 6 context facts chosen above do not repeat the context sentences already used on Lines 4, 5, 7 and 14.

### Still unresolved

- **Bel-Air naming chain.** The station article does not explain the name. The building phase must confirm it (for example from the Quartier du Bel-Air or avenue du Bel-Air article) before writing copy.
- **Exact 1931 dates** of the temporary Nation–Étoile service are not in any opened source. Use "1931" or "May to December 1931".
- **Pasteur Line 12 opening date.** It was not checked here. Do not add it to copy without a source.
- **Official route page.** Bonjour RATP and ratp.fr still return 403. The IDFM open data confirms the station set but not the order.
- **Nation "only station with two terminating lines"** comes from Wikipedia prose without a specific citation. It matches the network map, but copy should attribute it or phrase it as "one of the few".

# Line 6 source audit

Checked 29 September 2026. Scope: all 28 current stations, English and French. The route runs from Charles de Gaulle – Étoile to Nation, with one continuous path and no branches.

## Route and method

[Wikipedia's Ligne 6 du métro de Paris](https://fr.wikipedia.org/wiki/Ligne_6_du_m%C3%A9tro_de_Paris) and the [English Paris Métro Line 6](https://en.wikipedia.org/wiki/Paris_M%C3%A9tro_Line_6) article both list the same 28 stations in the same order, with no branches. [itineraire-metro.fr](https://www.itineraire-metro.fr/ligne-6.html) was opened as an independent third check and returned the identical sequence (given terminus to terminus, reversed). Bonjour RATP's line page (`bonjour-ratp.fr/lignes-metro/ligne-6/` and its `/en/` equivalent) and the RATP plan page (`ratp.fr/en/vos-lignes/metro/6`) returned HTTP 403 to direct fetches during this audit and could not be opened directly; a web search surfaced their indexed content instead, listing the same 28 stations and the same two termini, so the route is confirmed by three independently opened sources plus one indexed-but-unopened official source. No recent extension exists; the current terminus-to-terminus configuration has been unchanged since 1942.

Every station article below was opened on French Wikipedia (the `(métro de Paris)` disambiguated page); a few also needed a street or square article, or an English-language article, to check a specific claim. Each English explanation starts with the naming reason; each French explanation preserves the same chain. Context adds a separate, different fact than the one used for the same station on any other line. Short explanations are not padded to meet a word target.

**Renumbering note (applies to stations 1–19, Charles de Gaulle – Étoile through Place d'Italie):** this arc did not exist as "Line 6" continuously. It opened between 1900 and 1906 as an extension of the original Circulaire Sud (numbered "Line 2 Sud", then folded into "Line 5" from 17 October 1907). During the 1931 Colonial Exposition it briefly ran through to Nation under the Line 6 banner (17 May – 6 December 1931), then reverted to Line 5. The Étoile–Place d'Italie arm passed permanently to Line 6 only on 6 October 1942, which is also when it was joined end to end with the Place d'Italie–Nation arm (open since 1 March 1909 as Line 6 proper) to form today's line. Physical opening dates recorded below therefore predate the station's Line 6 identity for stations 1–18; see "Editorial decisions" for how this is flagged, and "Open questions" for the field-level decision left to the building phase.

## Editorial decisions

- Stations 1–18 (Charles de Gaulle – Étoile through Corvisart) physically opened in 1900, 1903 or 1906 under earlier line numbers ("2 Sud", then "5"), not as Line 6. The station text notes the physical opening year in context prose rather than asserting it as a Line 6 opening; see the open question on the `opened` field below.
- The 1931 temporary Étoile–Nation service (during the Colonial Exposition) is described as temporary and reversed, matching both the Bir-Hakeim and Ligne-6 overview articles; it is not conflated with the permanent 1942 change.
- Montparnasse – Bienvenüe: this stop opened in 1906 as "Avenue du Maine". Secondary sources place the renaming to "Bienvenüe" (honouring engineer Fulgence Bienvenüe) in 1933, before the line carried the "Line 6" identity end to end; one search summary loosely attributed that 1933 renaming to "Line 5" rather than the arc that became Line 6. The station text avoids asserting which line-number label applied in 1933 and states only the renaming date and the 1942 merger into the combined interchange, both of which are corroborated by the RATP heritage article and Wikipedia.
- Trocadéro: the battle it commemorates is dated (30–31 August 1823, the Trocadero fort at Cadiz), confirmed independently of the station article; the square itself was called Place du Roi-de-Rome from 1869 and took the Trocadéro name in 1877, then its current double name in 1978. The station text uses the battle and does not assert an exact one-to-one date between the square's 1877 renaming and the fort's 1823 capture beyond "commemorates".
- Nation: the square was Place du Trône from 1660 (for Louis XIV's ceremonial entry) and Place du Trône-Renversé from 1792, becoming Place de la Nation only in 1880 for Bastille Day under the Third Republic. The station text keeps this chain brief and does not claim the metro station itself carried an earlier name; it opened in 1909 already inside the "Nation" square.
- Chevaleret: the street's origin is explicitly contested in its own Wikipedia article (a landowning family attested at Ivry-sur-Seine versus a path only wide enough for a single horse abreast). Both readings are kept as alternatives; neither is asserted as settled.
- Dugommier and Picpus both replaced earlier names chosen for streets/avenues that no longer serve as useful landmarks (Charenton, Saint-Mandé); both renamings avoided collision with a differently located station of the same name elsewhere on the network. This is stated directly rather than as a coincidence.
- Daumesnil: the adjoining square was renamed for Félix Éboué in 1946, and the station carries "Félix Éboué" as a subtitle, but the station's own name still honours General Daumesnil; the two are not conflated.
- No unsupported claim is made that the WWI bombing that damaged Corvisart (night of 1–2 June 1918) was aimed at the station; it is described as wartime aerial-bombardment damage to the vicinity.
- Spelling: Montparnasse – Bienvenüe keeps the diaeresis on the "ü" (part of Fulgence Bienvenüe's surname, not a French word). Sèvres – Lecourbe and La Motte-Picquet – Grenelle keep the en dash used on the official map, matching the Line 5/7 convention already in the app.
- Shared station IDs reused from other lines: `montparnasse-bienvenue` (Line 4), `raspail` (Line 4), `denfert-rochereau` (Line 4), `place-ditalie` (Line 5 and Line 7), `bercy` (Line 14). Each keeps the naming chain already used on that line and pairs it with a different, separately verified context fact for Line 6 (noted station by station below) so no two lines repeat the same sentence.
- No em dashes are used in this document's prose or intended for the data. En dashes remain in compound station names.

## Station checks and sources

### 1. Charles de Gaulle – Étoile

Place de l'Étoile is named for the star pattern of converging avenues; "Charles de Gaulle" was added in 1970, the year of the general's death, honouring the Resistance leader and president. The station's own arc (Étoile–Trocadéro) opened 2 October 1900 as the original Circulaire Sud terminus, decades before this arc's line-6 identity was fixed in 1942 (see renumbering note above).

- [Charles de Gaulle – Étoile · Wikipédia](https://fr.wikipedia.org/wiki/Charles_de_Gaulle_-_%C3%89toile_(m%C3%A9tro_de_Paris))
- [Charles de Gaulle–Étoile station · Wikipedia](https://en.wikipedia.org/wiki/Charles_de_Gaulle%E2%80%93%C3%89toile_station)

### 2. Kléber

Avenue Kléber honours General Jean-Baptiste Kléber (1753–1800), notable in the Vendée War and the Egyptian campaign. Opened 1900; rebuilt in 1969 for rubber-tyred trains using WWII-era anti-collapse metal arches to support the vault, and now serves as a technical (non-commercial) turnback terminus because Étoile itself is too cramped for that role.

- [Kléber · Wikipédia](https://fr.wikipedia.org/wiki/Kl%C3%A9ber_(m%C3%A9tro_de_Paris))

### 3. Boissière

Rue Boissière is named for an old "Croix Boissière" (boxwood cross) displayed on feast days such as Palm Sunday. Opened 1900; its single entrance keeps an original Guimard édicule, listed as a historic monument on 12 February 2016.

- [Boissière · Wikipédia](https://fr.wikipedia.org/wiki/Boissi%C3%A8re_(m%C3%A9tro_de_Paris))

### 4. Trocadéro

Named for the Place du Trocadéro, itself renamed in 1877 (from Place du Roi-de-Rome, created 1869) to commemorate the French capture of the Trocadero fort at Cadiz on 30–31 August 1823. Opened 1900; the station had one of the network's first escalators, in service until 1959.

- [Trocadéro · Wikipédia](https://fr.wikipedia.org/wiki/Trocad%C3%A9ro_(m%C3%A9tro_de_Paris))
- [Bataille du Trocadéro · Wikipédia](https://fr.wikipedia.org/wiki/Bataille_du_Trocad%C3%A9ro)
- [Place du Trocadéro-et-du-11-Novembre · Wikipédia](https://fr.wikipedia.org/wiki/Place_du_Trocad%C3%A9ro-et-du-11-Novembre)

### 5. Passy

Named for the old village of Passy, annexed to Paris in 1860, via the former quai de Passy (now avenue du Président-Kennedy). Opened 6 November 1903 as the line's southern terminus until the 1906 extension across the Seine; the station is partly underground into the Chaillot hillside and partly on the viaduct crossing the Seine and the Pont de Bir-Hakeim.

- [Passy · Wikipédia](https://fr.wikipedia.org/wiki/Passy_(m%C3%A9tro_de_Paris))

### 6. Bir-Hakeim

Opened 24 April 1906 as "Grenelle", for the boulevard; renamed 18 June 1949 to commemorate the Battle of Bir Hakeim (27 May – 11 June 1942), where Free French forces held off Axis assaults. Elevated above boulevard de Grenelle; a 2007–08 renovation added Judy Ledgerwood's stained-glass skylight artwork *Night and Day*, and the Pont de Bir-Hakeim below is on France's supplementary historic-monuments register.

- [Bir-Hakeim · Wikipédia](https://fr.wikipedia.org/wiki/Bir-Hakeim_(m%C3%A9tro_de_Paris))

### 7. Dupleix

Rue Dupleix honours Joseph François Dupleix (1697–1763), Governor-General of the French East India Company from 1742 and an opponent of English influence in India. Opened 24 April 1906; the site had earlier held the "mur de Grenelle" execution wall (1797–1815), and an ornamental water-pressure gauge, kept as a leak-detection relic on a platform pillar, may be the last surviving public manometer of its kind.

- [Dupleix · Wikipédia](https://fr.wikipedia.org/wiki/Dupleix_(m%C3%A9tro_de_Paris))

### 8. La Motte-Picquet – Grenelle

Combines Admiral Toussaint-Guillaume Picquet de La Motte (1720–1791) and the former commune of Grenelle, annexed in 1860. Opened 24 April 1906; took its combined name on 13 July 1913 when Line 8's underground platform opened, and today is a three-line interchange (6, 8, 10) with an unusual shared central platform for 8 and 10 plus a separate half-station for Line 10.

- [La Motte-Picquet – Grenelle · Wikipédia](https://fr.wikipedia.org/wiki/La_Motte-Picquet_-_Grenelle_(m%C3%A9tro_de_Paris))

### 9. Cambronne

Place and rue Cambronne honour General Pierre Cambronne (1770–1842), a Napoleonic-era officer. Opened 24 April 1906; elevated above boulevard Garibaldi, with its glass canopy fully renovated in 2014–15.

- [Cambronne · Wikipédia](https://fr.wikipedia.org/wiki/Cambronne_(m%C3%A9tro_de_Paris))

### 10. Sèvres – Lecourbe

Rue de Sèvres led toward the town of Sèvres; General Claude Jacques Lecourbe (1758–1815) fought at Fleurus (1794) and Zurich (1799). Opened 24 April 1906 under the name "Avenue de Suffren" (for Admiral Pierre André de Suffren) before taking its current combined name.

- [Sèvres – Lecourbe · Wikipédia](https://fr.wikipedia.org/wiki/S%C3%A8vres_-_Lecourbe_(m%C3%A9tro_de_Paris))

### 11. Pasteur

Honours chemist and biologist Louis Pasteur, founder of microbiology and developer of pasteurization and of vaccines including one against rabies; the station sits at the meeting of rue de Vaugirard and boulevard Pasteur. Opened 24 April 1906 at the junction of two competing early networks, the CMP and the Nord-Sud company, which is why two different architectural styles meet here; it is today's interchange with Line 12.

- [Pasteur · Wikipédia](https://fr.wikipedia.org/wiki/Pasteur_(m%C3%A9tro_de_Paris))

### 12. Montparnasse – Bienvenüe

Shared ID `montparnasse-bienvenue` (naming chain already used on Line 4: Montparnasse as a student joke referencing Mount Parnassus, Bienvenüe honouring metro engineer Fulgence Bienvenüe). Line 6's separate context fact: this stop opened 24 April 1906 as "Avenue du Maine"; it was renamed "Bienvenüe" in 1933, then merged in 1942 with the Montparnasse-named stops on the other lines into the single interchange known today. An experimental high-speed moving walkway installed here in 2002 was decommissioned in March 2011.

- [Montparnasse – Bienvenüe · Wikipédia](https://fr.wikipedia.org/wiki/Montparnasse_-_Bienven%C3%BCe_(m%C3%A9tro_de_Paris))
- [RATP · Un jour, une station : Montparnasse-Bienvenüe](https://www.ratp.fr/en/decouvrir/coulisses/au-quotidien/un-jour-une-station-montparnasse-bienvenue-hommage-au-pere-du)

### 13. Edgar Quinet

Named for historian and politician Edgar Quinet (1803–1875), via the boulevard. Opened 24 April 1906; its single entrance keeps a Dervaux-style ornamental staircase and candelabra, near the junction with rue de la Gaîté.

- [Edgar Quinet · Wikipédia](https://fr.wikipedia.org/wiki/Edgar_Quinet_(m%C3%A9tro_de_Paris))

### 14. Raspail

Shared ID `raspail` (naming chain already used on Line 4: boulevard Raspail honours scientist and republican politician François-Vincent Raspail). Line 6's separate context fact: the station's access keeps an Hector Guimard Art Nouveau balustrade dating to its 1906 opening.

- [Raspail · Wikipédia](https://fr.wikipedia.org/wiki/Raspail_(m%C3%A9tro_de_Paris))

### 15. Denfert-Rochereau

Shared ID `denfert-rochereau` (naming chain already used on Line 4: the square, formerly Place d'Enfer, honours Colonel Pierre Philippe Denfert-Rochereau, defender of Belfort in 1870–71). Line 6's separate context fact: its elevated platforms use the "Andreu-Motte" furnishing style with beveled white ceramic tiles on the walls and vault, visibly different from the Line 4 platforms below.

- [Denfert-Rochereau · Wikipédia](https://fr.wikipedia.org/wiki/Denfert-Rochereau_(m%C3%A9tro_de_Paris))

### 16. Saint-Jacques

Named for the boulevard and former Faubourg Saint-Jacques, which preserved the name of the old Saint-Jacques city gate and the hamlet around the Saint-Jacques chapel and commandery, on the medieval pilgrims' road toward Santiago de Compostela. Opened 24 April 1906; it is a rare ground-level station with no on-platform advertising, under canopies supported by central pillars.

- [Saint-Jacques · Wikipédia](https://fr.wikipedia.org/wiki/Saint-Jacques_(m%C3%A9tro_de_Paris))
- [Rue du Faubourg-Saint-Jacques · Wikipédia](https://fr.wikipedia.org/wiki/Rue_du_Faubourg-Saint-Jacques)

### 17. Glacière

Rue de la Glacière was an old path to Gentilly; "glacière" refers to the ice houses where winter ice from ponds along the Bièvre was packed into masonry wells and old quarries for use in warmer months. Opened 24 April 1906; elevated above boulevard Auguste-Blanqui.

- [Glacière · Wikipédia](https://fr.wikipedia.org/wiki/Glaci%C3%A8re_(m%C3%A9tro_de_Paris))

### 18. Corvisart

Rue Corvisart honours Jean-Nicolas Corvisart (1755–1821), Napoleon I's personal physician and a specialist in heart and lung disease. Opened 24 April 1906; the vicinity was damaged by a German bomber during a WWI air raid on the night of 1–2 June 1918.

- [Corvisart · Wikipédia](https://fr.wikipedia.org/wiki/Corvisart_(m%C3%A9tro_de_Paris))

### 19. Place d'Italie

Shared ID `place-ditalie` (naming chain already used on Lines 5 and 7: the square at the start of avenue d'Italie, the historic start of the road to Italy, later Route nationale 7). Line 6's separate context fact: since the line's creation in 1909 this stop has been Line 6's own midpoint rather than a terminus; the 1942 merger fixed it as a three-line interchange with Lines 5 and 7 instead.

- [Place d'Italie · Wikipédia](<https://fr.wikipedia.org/wiki/Place_d'Italie_(m%C3%A9tro_de_Paris)>)

### 20. Nationale

Rue Nationale honours the Garde nationale, the revolutionary-era civic militia; the street took this name in 1848 for the Second Republic. Opened 1 March 1909, part of the original Place d'Italie–Nation section; an aerial station over boulevard Vincent-Auriol with a period-style glass canopy, beveled white ceramic tiles and geometric brick patterns.

- [Nationale · Wikipédia](https://fr.wikipedia.org/wiki/Nationale_(m%C3%A9tro_de_Paris))

### 21. Chevaleret

Rue du Chevaleret takes its name from a locality attested at Ivry-sur-Seine since at least 1670; its own article gives two competing, unresolved explanations: a landowning Chevaleret family documented at Ivry until the mid-20th century, or a path just wide enough for a single horse abreast ("cheval de front"). Opened 1 March 1909; aerial, over boulevard Vincent-Auriol, between Nationale and Quai de la Gare.

- [Chevaleret · Wikipédia](https://fr.wikipedia.org/wiki/Chevaleret_(m%C3%A9tro_de_Paris))
- [Rue du Chevaleret · Wikipédia](https://fr.wikipedia.org/wiki/Rue_du_Chevaleret)

### 22. Quai de la Gare

Named for the quai de la Gare on the Seine's left bank, itself named for the Ivry river-freight station built near the Salpêtrière hospital late in the reign of Louis XV; the quay's name later passed to the surrounding Quartier de la Gare. Opened 1 March 1909; a scene of the 2008 film *La Belle Personne* was shot there.

- [Quai de la Gare · Wikipédia](https://fr.wikipedia.org/wiki/Quai_de_la_Gare_(m%C3%A9tro_de_Paris))

### 23. Bercy

Shared ID `bercy` (naming chain already used on Line 14: rue and boulevard de Bercy preserve the name of the former settlement of Bercy, mostly annexed to Paris in 1860). Line 6's separate context fact: opened 1 March 1909 as an underground station (unlike most of the line's elevated eastern run), its Line 6 platform has a distinctive elliptical vault, finished in the standard beveled white ceramic tiles.

- [Bercy · Wikipédia](https://fr.wikipedia.org/wiki/Bercy_(m%C3%A9tro_de_Paris))

### 24. Dugommier

Opened 1 March 1909 as "Charenton"; renamed 12 July 1939 to avoid confusion with the new Charenton-Écoles station on Line 8, honouring General Jacques François Dugommier (1738–1794) of the French Revolutionary army. It kept a street-level public correspondence with the former Reuilly station, on the Paris-Bastille to Marles-en-Brie line, until that line closed 14 December 1969 during construction of what became RER A.

- [Dugommier · Wikipédia](https://fr.wikipedia.org/wiki/Dugommier_(m%C3%A9tro_de_Paris))

### 25. Daumesnil

Named for the former Place Daumesnil and avenue Daumesnil, honouring Baron General Pierre Daumesnil (1776–1832). Opened 1 March 1909; the Line 8 interchange, added 5 May 1931, is linked by a service tunnel. The square itself was renamed for Résistance figure Félix Éboué in 1946, and the station carries "Félix Éboué" as a subtitle without its own name changing.

- [Daumesnil · Wikipédia](https://fr.wikipedia.org/wiki/Daumesnil_(m%C3%A9tro_de_Paris))

### 26. Bel-Air

Named for the Bel-Air district, on boulevard de Picpus between the Picpus and Bel-Air quarters. Opened 1 March 1909; closed for the war in 1939 and stayed shut after the Liberation, not reopening until 7 January 1963. It sits at ground level, built to preserve the right-of-way of the historic Vincennes railway (Paris-Bastille to the Marne valley) even though the surrounding metro tracks run underground.

- [Bel-Air · Wikipédia](https://fr.wikipedia.org/wiki/Bel-Air_(m%C3%A9tro_de_Paris))

### 27. Picpus

Opened 1 March 1909 as "Saint-Mandé", for the avenue; renamed "Picpus" on 1 March 1937 to avoid confusion with another Line 1 station of that name. The new name comes from boulevard de Picpus, itself from the old hamlet of "Pique-Puce". Its entrance is a Guimard édicule, listed as a historic monument on 12 February 2016; the nearby Picpus Cemetery holds the grave of Lafayette, among others.

- [Picpus · Wikipédia](https://fr.wikipedia.org/wiki/Picpus_(m%C3%A9tro_de_Paris))

### 28. Nation

Place de la Nation was Place du Trône from 1660 (for Louis XIV's ceremonial entry into Paris) and Place du Trône-Renversé from 1792, taking its current name only in 1880 for Bastille Day under the Third Republic. Line 6's platforms opened 1 March 1909; Nation is the only station where two lines (2 and 6) both terminate, and automatic ticket gates were tested here in 1968.

- [Nation · Wikipédia](https://fr.wikipedia.org/wiki/Nation_(m%C3%A9tro_de_Paris))
- [Place de la Nation (Paris) · Wikipédia](https://fr.wikipedia.org/wiki/Place_de_la_Nation_(Paris))

## Open questions

- **The `opened` field for stations 1–18.** These stations physically opened in 1900, 1903 or 1906 under earlier line numbers, and this arc's Line 6 identity was fixed only in 1942 (see the renumbering note). The type contract defines `opened` as "opening on the current line", which for this arc could mean either the physical build date or 1942. Line 5's audit sidestepped an analogous case (Place d'Italie) by omitting the field; the same approach, or a single explicit 1942 date for all of stations 1–18, are both defensible. Left to the building phase.
- **Montparnasse – Bienvenüe's 1933 line identity.** Secondary sources place the "Bienvenüe" renaming in 1933 but disagree on which line label applied to this arc at that moment, given the 1907/1931/1942 renumbering history. The station text above states only the renaming date and the 1942 merger, not the intervening line number; worth a second check before publishing if a firmer source turns up.
- **Chevaleret's street etymology remains genuinely unresolved** in its own source article (landowner family vs. a single-horse path). The copy should keep both readings rather than pick one.

## Validation

- 28 unique station IDs (23 new, 5 reused from Lines 4, 5, 7 and 14) and one ordered path cover every stop once; no branches.
- Every station above has a naming explanation and a separately verified context fact drawn from a source opened during this audit.
- All source links use HTTPS; all 28 station source articles were opened directly except Bonjour RATP and ratp.fr, which returned HTTP 403 to direct fetches (see "Route and method") and were cross-checked instead through Wikipedia (FR and EN) and itineraire-metro.fr.
- Shared IDs match the existing entries on Lines 4, 5, 7 and 14, with a distinct context fact chosen for each so no sentence repeats across lines.
- No em dashes appear in this document. En dashes remain in compound station names.
- Data-contract typecheck, browser/functional checks, and copy-length tuning to 20–45 and 20–55 words per locale are owned by the building and review phases.

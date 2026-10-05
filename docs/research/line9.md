# Line 9 source audit

Checked 29 September 2026. Scope: all 37 current stations, English and French. The route runs from Pont de Sèvres to Mairie de Montreuil, with one continuous path and no branches.

## Route and method

`ratp.fr` and `bonjour-ratp.fr` refused every automated fetch with HTTP 403, including the Line 9 page, the Line 9 history page, and the line-map path. The verification pass instead checked the stop list against the official open data of Île-de-France Mobilités, the regional transport authority: its [arrets-lignes dataset](https://data.iledefrance-mobilites.fr/explore/dataset/arrets-lignes/), filtered to Metro route 9, returns exactly the 37 stop names below (and not Saint-Martin). Station order was confirmed by chaining the neighbour stations that each French station article names in its Situation or Histoire section, and against the [French Wikipedia Line 9 article](https://fr.wikipedia.org/wiki/Ligne_9_du_m%C3%A9tro_de_Paris) and the [English Wikipedia Line 9 article](https://en.wikipedia.org/wiki/Paris_M%C3%A9tro_Line_9), which agree on all 37 stops and both termini. A web search of `ratp.fr` content (cached snippets, since the site itself was blocked) independently confirmed the same 37-station count, the same two termini, and the 1934 and 1937 extension dates.

The current line carries no ghost or closed stops in service. Saint-Martin, between Strasbourg – Saint-Denis and République, opened in 1931 with Line 8 (Line 9 trains served it from the 1933 extension) and has been closed since 2 September 1939, at the start of the Second World War. The French Line 9 article says it stayed closed after the Liberation because only about 100 metres separate its nearest entrances from those of Strasbourg – Saint-Denis. It is excluded from the station count and the route below. See the [French Wikipedia article on Saint-Martin](https://fr.wikipedia.org/wiki/Saint-Martin_(m%C3%A9tro_de_Paris)) and the [French Line 9 article](https://fr.wikipedia.org/wiki/Ligne_9_du_m%C3%A9tro_de_Paris).

Every station article listed below was opened, in French and, where useful, in English. Opening years are taken from the line's construction history, cross-checked station by station: the line opened in eight stages between 8 November 1922 and 14 October 1937, each stage adding a contiguous block of stops. No opening year is asserted without a direct citation.

## Editorial decisions

- Croix de Chavaux's etymology is explicitly qualified. The station article uses the French conditional ("résulterait"), so it describes "Chavaux" as a probable deformation of "chevaux" (horses, from a coaching relay at the crossroads) rather than a settled fact; the app text keeps that qualifier.
- Place de la Nation's earlier names (Place du Trône, then Place du Trône-Renversé) are documented on the place's own Wikipedia article, not the station article. Verification opened that article: it states the 1660 throne, the 10 August 1792 renaming and the 14 July 1880 renaming. The etymology can use these facts if it cites the place article alongside the station article.
- The Charonne massacre of 8 February 1962 is documented directly on the Charonne station's own Wikipedia article: eight people died at the station entrance and a ninth later in hospital; the square above and the station subtitle date from 8 February 2007, while the commemorative plaque in the ticket hall already existed then; the app text uses only what that article verifies and does not extend the account beyond it.
- Trocadéro's name traces to the Battle of Trocadero (31 August 1823, Cadiz, part of the French intervention restoring Ferdinand VII), confirmed independently through a web search of the battle's own article; the station article itself does not give the year, so the year is cited to the battle article instead.
- Michel-Ange – Molitor and Michel-Ange – Auteuil each carry their own separate Wikipedia article, despite the shared "Michel-Ange" name; both were checked individually. Both first opened on the old Line 8 on 30 September 1913, and both Line 9 platforms opened on 8 November 1922.
- Nation and Trocadéro are shared with Line 6 (same IDs; facts checked for consistency). The others (Franklin D. Roosevelt, Miromesnil, Havre – Caumartin, Richelieu – Drouot, Grands Boulevards, Bonne Nouvelle, the two Michel-Ange stations) have no existing IDs.
- Havre – Caumartin's "Havre" element was added in 1926, three years after the Line 9 platform opened in 1923 under the shorter name "Caumartin"; the etymology explains both elements, and the context fact stays separate from that naming date to avoid repeating it.
- Spelling follows the accented forms used in station Wikipedia article titles: Iéna, Maraîchers, Havre – Caumartin, Chaussée d'Antin – La Fayette, Saint-Philippe du Roule. (The IDFM dataset writes "Havre-Caumartin" and "Saint-Philippe-du-Roule"; these are typographic variants of the same stops.) En dashes are kept in compound station names; no em dashes are used in the data itself.
- Shared station IDs reused from existing lines: `republique` and `oberkampf` (Line 5), `strasbourg-saint-denis` (Line 4), `chaussee-dantin-la-fayette` (Line 7). Etymology and context text for these four stations should stay consistent with the existing entries in `line5.ts`, `line4.ts` and `line7.ts`; only the Line 9 opening year and Line 9 sources are new. Note that `Station.opened` is the opening on the current line, so the Line 9 entries use 1923 (Chaussée d'Antin – La Fayette) and 1933 (the other three), not the earlier years in the other line files.

## Station checks and sources

### 1. Pont de Sèvres

Named for the nearby Pont de Sèvres, the Seine bridge towards Sèvres (the English station article states the naming link; the French article places the station at the end of Avenue du Général-Leclerc). Opened 3 February 1934 with the extension from Porte de Saint-Cloud; the French article says this was the first time the Metro crossed the Paris city limits. A 1943 Allied air raid (4 April 1943, per the French Line 9 article) aimed at the Renault works on Île Seguin missed its target and killed roughly 300 people, 80 of them around this station, which was partly destroyed.

- [Pont de Sèvres · Wikipédia](https://fr.wikipedia.org/wiki/Pont_de_S%C3%A8vres_(m%C3%A9tro_de_Paris))
- [Pont de Sèvres station · Wikipedia](https://en.wikipedia.org/wiki/Pont_de_S%C3%A8vres_station)

### 2. Billancourt

Named for nearby Rue de Billancourt, itself named for the former village of Billancourt, a hamlet attached to the parish of Auteuil until its 1859 annexation to the commune now called Boulogne-Billancourt, of which it became a district. Opened 3 February 1934, one of the first three Metro stations serving the inner suburbs. Like about a third of network stations between 1974 and 1984, its platforms were refitted in the "Andreu-Motte" style, in yellow here.

- [Billancourt · Wikipédia](https://fr.wikipedia.org/wiki/Billancourt_(m%C3%A9tro_de_Paris))

### 3. Marcel Sembat

Named for Place Marcel-Sembat, honouring Marcel Sembat (1862-1922), journalist, socialist deputy for Paris's 18th arrondissement from 1893 until his death, in charge of *La Petite République* from 1892 to 1897, and minister of public works from 1914 to 1916. Opened 3 February 1934, alongside Pont de Sèvres and Billancourt as one of the line's first three suburban stops.

- [Marcel Sembat · Wikipédia](https://fr.wikipedia.org/wiki/Marcel_Sembat_(m%C3%A9tro_de_Paris))

### 4. Porte de Saint-Cloud

Named for the Porte de Saint-Cloud, a gate in the 19th-century Thiers wall that led towards the town of Saint-Cloud (stated in the English station article; the French station article gives no naming reason). Its Parc des Princes subtitle names the nearby stadium. Opened 29 September 1923 with the one-station extension from Exelmans (French Line 9 and Exelmans articles; the English station article says 28 September, so use the year only unless an RATP source settles the day). It was the western terminus until the 1934 extension to Pont de Sèvres.

- [Porte de Saint-Cloud · Wikipédia](https://fr.wikipedia.org/wiki/Porte_de_Saint-Cloud_(m%C3%A9tro_de_Paris))
- [Porte de Saint-Cloud station · Wikipedia](https://en.wikipedia.org/wiki/Porte_de_Saint-Cloud_station)

### 5. Exelmans

Named for Boulevard Exelmans, honouring cavalry general Rémy Joseph Isidore Exelmans (1775-1852), whom the source calls a hero of the Empire's last battle, and who later became a Marshal of France. Opened 8 November 1922 as the south-western terminus of the line's first section; a public-street connection once linked it to the Petite Ceinture's Point-du-Jour station, which closed to passengers on 23 July 1934.

- [Exelmans · Wikipédia](https://fr.wikipedia.org/wiki/Exelmans_(m%C3%A9tro_de_Paris))

### 6. Michel-Ange – Molitor

Named for two streets: Rue Michel-Ange honours the Italian Renaissance artist (1475-1564); Rue Molitor honours Gabriel-Jean-Joseph Molitor (1770-1849), a Marshal of France. Its Line 9 platform opened 8 November 1922; the station had first opened on 30 September 1913 on Line 8, whose platform transferred to Line 10 in July 1937.

- [Michel-Ange - Molitor · Wikipédia](https://fr.wikipedia.org/wiki/Michel-Ange_-_Molitor_(m%C3%A9tro_de_Paris))

### 7. Michel-Ange – Auteuil

Named for two streets: Rue Michel-Ange as above; Rue d'Auteuil, the historic main road of the former village of Auteuil. Its Line 9 platform opened 8 November 1922 with the line's first section, between the provisional termini of Trocadéro and Exelmans; the Line 8 (now Line 10) platform at this crossing had opened separately in 1913.

- [Michel-Ange - Auteuil · Wikipédia](https://fr.wikipedia.org/wiki/Michel-Ange_-_Auteuil_(m%C3%A9tro_de_Paris))

### 8. Jasmin

Named for Rue Jasmin, honouring Jacques Boé (1798-1864), who wrote under the name Jasmin and ranks among the leading Occitan-language poets of the early nineteenth century. Opened 8 November 1922 with the line's first section. On 20 March 2018, RATP temporarily replaced half of the platform name plaques with versions decorated with white jasmine to mark the start of spring, as it did at five other stations.

- [Jasmin · Wikipédia](https://fr.wikipedia.org/wiki/Jasmin_(m%C3%A9tro_de_Paris))

### 9. Ranelagh

Named for Rue du Ranelagh, which opens onto the Jardin du Ranelagh; the garden takes its name from Richard Jones, Lord Ranelagh (1641-1712), an Irish politician and diplomat. Opened 8 November 1922 with the line's first section, between the provisional termini of Trocadéro and Exelmans.

- [Ranelagh · Wikipédia](https://fr.wikipedia.org/wiki/Ranelagh_(m%C3%A9tro_de_Paris))

### 10. La Muette

Named for Chaussée de la Muette, in the La Muette district, itself named for the nearby Château de la Muette. Opened 8 November 1922 with the line's first section. On 9 June 1943, resistance leader Charles Delestraint was arrested here by the Gestapo; a plaque at the main exit commemorates him.

- [La Muette · Wikipédia](https://fr.wikipedia.org/wiki/La_Muette_(m%C3%A9tro_de_Paris))

### 11. Rue de la Pompe

Named for Rue de la Pompe, which took its name from the pump that supplied water to the Château de la Muette; the street itself began as the "Vieux-Chemin", recorded in 1730 documents as running along the château's walls. Opened 8 November 1922 with the line's first section. On the same day as the Delestraint arrest at La Muette, 9 June 1943, resistant Joseph Gastaldo and his deputy Jean-Louis Théobald, who had a rendezvous with Delestraint, were arrested by the Gestapo at this station; all three were held at Fresnes and deported the following year.

- [Rue de la Pompe · Wikipédia](https://fr.wikipedia.org/wiki/Rue_de_la_Pompe_(m%C3%A9tro_de_Paris))

### 12. Trocadéro

Named for Place du Trocadéro-et-du-11-Novembre, which commemorates the Battle of the Trocadero (night of 30 to 31 August 1823), when French troops took Fort Louis and the Trocadero peninsula facing Cadiz, in the expedition that restored Ferdinand VII's absolute authority. The Line 9 platform opened 8 November 1922 as the north-eastern terminus of the first section; the station itself dates from 2 October 1900 (today's Line 6 platform). Before 1914 the station received one of the network's first escalators, which lasted until 1959, and a Guimard entrance, removed in 1936.

- [Trocadéro · Wikipédia](https://fr.wikipedia.org/wiki/Trocad%C3%A9ro_(m%C3%A9tro_de_Paris))
- [Bataille du Trocadéro · Wikipédia](https://fr.wikipedia.org/wiki/Bataille_du_Trocad%C3%A9ro)

### 13. Iéna

Named for Place d'Iéna, commemorating Napoleon's 1806 victory over Prussian forces at Jena. Opened 27 May 1923 with the extension from Trocadéro to Saint-Augustin. The French station article states that Iéna is one of four network stations with a four-letter name, alongside Rome (Line 2), Cité (Line 4), and the ghost station Haxo; attribute this to the source if used.

- [Iéna · Wikipédia](https://fr.wikipedia.org/wiki/I%C3%A9na_(m%C3%A9tro_de_Paris))

### 14. Alma – Marceau

Named for two references: Pont de l'Alma and Place de l'Alma commemorate the 1854 Battle of the Alma, a Franco-British victory over Russian forces in Crimea; Avenue Marceau honours General François Séverin Marceau-Desgraviers (1769-1796), who fought Vendéen rebels during the Revolution. Opened 27 May 1923 with the extension from Trocadéro to Saint-Augustin. During construction under Place de l'Alma, where the tunnel lies 14 metres deep in the water table, the side walls closed in and the vault collapsed on 8 November 1915, opening a large hole in the square; the tunnel was rebuilt with a reinforced profile. This is in the French Line 9 article, not the station article.

- [Alma - Marceau · Wikipédia](https://fr.wikipedia.org/wiki/Alma_-_Marceau_(m%C3%A9tro_de_Paris))
- [Ligne 9 du métro de Paris · Wikipédia](https://fr.wikipedia.org/wiki/Ligne_9_du_m%C3%A9tro_de_Paris)

### 15. Franklin D. Roosevelt

Named, since 30 October 1946, for the American president, after nearby Avenue Victor-Emmanuel-III was renamed Avenue Franklin-D.-Roosevelt in his honour as a wartime ally. The Line 9 platform opened 27 May 1923 as Rond-Point des Champs-Élysées; the Line 1 platform, opened in 1900, was originally named Marbeuf. The two became one station, Marbeuf – Rond-Point des Champs-Élysées, when a connecting corridor opened on 6 October 1942. In the 1950s the platforms were decorated using gemmail, a modernised stained-glass technique, earning the stop the label "station-musée" at the time; the inauguration took place on the night of 1 to 2 March 1957. The gemmaux were removed from the platforms in the 2000s and are now in the ticket hall.

- [Franklin D. Roosevelt · Wikipédia](https://fr.wikipedia.org/wiki/Franklin_D._Roosevelt_(m%C3%A9tro_de_Paris))

### 16. Saint-Philippe du Roule

Named for the nearby Église Saint-Philippe-du-Roule, dedicated to the apostle Philip; "Roule" comes from a small locality attested under names including Romiliacum and Rolus before becoming a Paris faubourg in 1722. Opened 27 May 1923 with the extension from Trocadéro to Saint-Augustin. It was among roughly a third of network stations refitted between 1974 and 1984 in the orange-toned "Andreu-Motte" style.

- [Saint-Philippe du Roule · Wikipédia](https://fr.wikipedia.org/wiki/Saint-Philippe_du_Roule_(m%C3%A9tro_de_Paris))

### 17. Miromesnil

Named for Rue de Miromesnil, honouring magistrate Armand Thomas Hue de Miromesnil (1723-1796), Keeper of the Seals from 1774 to 1787, who had the *question préparatoire* abolished: judicial torture used during a trial to force a confession when the evidence was not sufficient for a death sentence. The Line 9 platform opened 27 May 1923 with the extension to Saint-Augustin; a Line 13 platform opened here later, on 27 April 1973.

- [Miromesnil · Wikipédia](https://fr.wikipedia.org/wiki/Miromesnil_(m%C3%A9tro_de_Paris))

### 18. Saint-Augustin

Named for Place Saint-Augustin, itself named for the adjoining Église Saint-Augustin, dedicated to Augustine of Hippo (354-430). Opened 27 May 1923 as the line's north-eastern terminus; it held that role for only a week, until the extension to Chaussée d'Antin – La Fayette opened on 3 June 1923. The station lies under Boulevard Haussmann, east of Place Saint-Augustin, at the north of the Madeleine quartier on its administrative boundary with the Europe quartier. No administrative quartier is named Saint-Augustin (fact check 2026-10-05).

- [Saint-Augustin · Wikipédia](https://fr.wikipedia.org/wiki/Saint-Augustin_(m%C3%A9tro_de_Paris))

### 19. Havre – Caumartin

Named for two streets: Rue de Caumartin honours Antoine-Louis Lefebvre de Caumartin, marquis de Saint-Ange (1725-1803), prévôt des marchands of Paris, who authorised the opening of part of the street on 3 July 1779; Rue du Havre, added to the station name in 1926, honours the Normandy port city, a principal destination from the neighbouring Gare Saint-Lazare. The Line 9 platform opened 3 June 1923, under the name Caumartin alone; a Line 3 platform here had opened in 1904. On 23 November 1971 the station was connected to the new Auber station of the Métro régional, the forerunner of RER A.

- [Havre - Caumartin · Wikipédia](https://fr.wikipedia.org/wiki/Havre_-_Caumartin_(m%C3%A9tro_de_Paris))

### 20. Chaussée d'Antin – La Fayette

Shared ID `chaussee-dantin-la-fayette` with Line 7; see `apps/web/src/data/line7.ts` for the existing etymology and context text (the station is not in the Line 5 research doc). Named for two streets: Chaussée d'Antin recalls the Duc d'Antin's mansion and a roadway raised over marshy ground; Rue La Fayette, added to the station name in 1989 because the station sits at the start of that street, honours Gilbert du Motier, marquis de La Fayette (1757-1834). In the same year both platforms received decoration marking the bicentenary of the Revolution, funded by Galeries Lafayette; the bicentenary was not the stated reason for the renaming. The Line 9 platform opened 3 June 1923, as the line's north-eastern terminus until 30 June 1928, when the line reached Richelieu – Drouot.

- [Chaussée d'Antin - La Fayette · Wikipédia](https://fr.wikipedia.org/wiki/Chauss%C3%A9e_d%27Antin_-_La_Fayette_(m%C3%A9tro_de_Paris))

### 21. Richelieu – Drouot

Named for two streets: Rue de Richelieu honours Cardinal Armand Jean du Plessis de Richelieu (1585-1642); Rue Drouot honours artillery general Antoine Drouot (1774-1847). Opened 30 June 1928, with simultaneous extensions of Lines 8 and 9 to this stop. Its Line 8 platform was the first on the network with 105-metre platforms; that length was then used on specific Line 8 sections and on the new 1930s stations of Lines 1, 3, 7 and 9, not across the whole network. The length was meant for seven-car trains, which ran only temporarily on Line 8 during the 1931 Colonial Exhibition.

- [Richelieu - Drouot · Wikipédia](https://fr.wikipedia.org/wiki/Richelieu_-_Drouot_(m%C3%A9tro_de_Paris))

### 22. Grands Boulevards

Named, since summer 1998, for the wide thoroughfares built on the former Right Bank fortifications; the station first carried the name Montmartre, then Rue Montmartre, and was renamed to stop tourists thinking it served the Butte Montmartre, several kilometres to the north. The Line 9 platform opened 10 December 1933; a Line 8 platform here opened earlier, on 5 May 1931. In 1945 Jacques Menassolle, a member of a gang that kidnapped people, extorted money from them and then murdered them, killed himself on a platform as police arrested him.

- [Grands Boulevards · Wikipédia](https://fr.wikipedia.org/wiki/Grands_Boulevards_(m%C3%A9tro_de_Paris))

### 23. Bonne Nouvelle

Named for the Bonne-Nouvelle district, itself named for the neighbouring Église Notre-Dame-de-Bonne-Nouvelle. The Line 9 platform opened 10 December 1933; a Line 8 platform here opened on 5 May 1931. During the Metro's 2000 centenary renovation programme, the station received a partial cinema theme referencing the nearby Grand Rex.

- [Bonne Nouvelle · Wikipédia](https://fr.wikipedia.org/wiki/Bonne_Nouvelle_(m%C3%A9tro_de_Paris))

### 24. Strasbourg – Saint-Denis

Shared ID `strasbourg-saint-denis` with Line 4; see the Line 4 data module for the existing etymology and context text. The Line 9 platform opened 10 December 1933, with the extension from Richelieu – Drouot to Porte de Montreuil; the station itself dates to 1908 on Line 4, first as Boulevard Saint-Denis, renamed when Line 8 arrived in 1931.

- [Strasbourg - Saint-Denis · Wikipédia](https://fr.wikipedia.org/wiki/Strasbourg_-_Saint-Denis_(m%C3%A9tro_de_Paris))

### 25. République

Shared ID `republique` with Line 5; see [docs/research/line5.md](line5.md) for the existing etymology and context text. The Line 9 platform opened 10 December 1933 with the extension from Richelieu – Drouot to Porte de Montreuil; the Line 8 platform had opened earlier, on 5 May 1931. (Corrected: the draft said both opened the same day.)

- [République · Wikipédia](https://fr.wikipedia.org/wiki/R%C3%A9publique_(m%C3%A9tro_de_Paris))

### 26. Oberkampf

Shared ID `oberkampf` with Line 5; see [docs/research/line5.md](line5.md) for the existing etymology and context text. The Line 5 platform opened on 15 January 1907; the Line 9 platform opened 10 December 1933 with the extension to Porte de Montreuil. The station had been planned as a temporary Line 9 terminus from June 1932, but because that section only duplicated Line 8, the opening was deferred until the whole extension to Porte de Montreuil was ready.

- [Oberkampf · Wikipédia](https://fr.wikipedia.org/wiki/Oberkampf_(m%C3%A9tro_de_Paris))

### 27. Saint-Ambroise

Named for the Saint-Ambroise district, after both Rue Saint-Ambroise and the Église Saint-Ambroise, honouring Ambrose of Milan, bishop of Milan from 374 to 397. (The French station article prints his dates as "340-394", which conflicts with its own 397 end of episcopate; Ambrose died in 397, so give only the episcopate dates or verify a birth year before using one.) Opened 10 December 1933 with the extension to Porte de Montreuil. In the late 1990s RATP chose it to test prototypes of the main platform lighting model for the "Espace Métro 2000" programme (later "Renouveau du métro"); from April 1997 it became the first of a planned series of 268 stations to be modernised.

- [Saint-Ambroise · Wikipédia](https://fr.wikipedia.org/wiki/Saint-Ambroise_(m%C3%A9tro_de_Paris))

### 28. Voltaire

Named for Boulevard Voltaire and the philosopher Voltaire (François-Marie Arouet, 1694-1778); its Léon Blum subtitle was added after the adjoining square was renamed in 1957 for the socialist statesman Léon Blum (1872-1950). Opened 10 December 1933 with the extension to Porte de Montreuil. With Pont-Neuf (Line 7) and Ledru-Rollin (Line 8), it was one of three prototype stations for the "Andreu-Motte" decor, whose components were tested on its platforms from 1974; it became the model for the stations treated in yellow.

- [Voltaire · Wikipédia](https://fr.wikipedia.org/wiki/Voltaire_(m%C3%A9tro_de_Paris))

### 29. Charonne

Named for Rue de Charonne, itself carrying the name of the former village of Charonne, annexed into Paris in 1859; the historic village centre lies over 700 metres east of the station. Opened 10 December 1933 with the extension to Porte de Montreuil. On 8 February 1962, police charged a demonstration against the OAS and the Algerian War; protesters fled into the station entrance, where eight died, and a ninth died later in hospital. The victims are called the martyrs of Charonne. Place du 8-Février-1962 above the station, and the matching station subtitle, date from 8 February 2007.

- [Charonne · Wikipédia](https://fr.wikipedia.org/wiki/Charonne_(m%C3%A9tro_de_Paris))

### 30. Rue des Boulets

Named for Rue des Boulets; "boulets" most likely refers to compressed coal pellets sold in the area. Opened 10 December 1933 as Rue des Boulets – Rue de Montreuil, with the extension to Porte de Montreuil. The name was later simplified to Boulets – Montreuil, and in 1998 became Rue des Boulets, to avoid confusion between Rue de Montreuil in Paris and the town of Montreuil, both served by the line. The source lists three possible origins for "Boulets"; keep "most likely" for the coal-pellet explanation.

- [Rue des Boulets · Wikipédia](https://fr.wikipedia.org/wiki/Rue_des_Boulets_(m%C3%A9tro_de_Paris))

### 31. Nation

Named for Place de la Nation, so named for the national holiday of 14 July 1880, the occasion on which the motto Liberté, Égalité, Fraternité appeared on public buildings (per the place article). The square had earlier been Place du Trône, after a throne set up on 26 August 1660 for the royal entry of Louis XIV and Marie-Thérèse, and from 10 August 1792 Place du Trône-Renversé. The Line 9 platform opened 10 December 1933 with the extension to Porte de Montreuil; its name carries the subtitle Place des Antilles. The 1968 turnstile test in the draft is removed: the source marks it "référence nécessaire". A usable alternative context fact from the station article: Nation is the only Metro station that is a terminus for two lines (2 and 6).

- [Nation · Wikipédia](https://fr.wikipedia.org/wiki/Nation_(m%C3%A9tro_de_Paris))
- [Place de la Nation · Wikipédia](https://fr.wikipedia.org/wiki/Place_de_la_Nation_(Paris))

### 32. Buzenval

Named for Rue de Buzenval, commemorating the (second) Battle of Buzenval of 19 January 1871, when Paris forces sortied against besieging German troops during the Franco-Prussian War. Opened 10 December 1933 with the extension to Porte de Montreuil. Its entrance was built into the ground floor of the Palais Avron cinema because there was no room for it on the street (French article); the English article says the cinema building has been a supermarket since 1977. The draft's "demolished" is not supported. The French and English articles disagree on when the Palais Avron building opened (1933 with the station, or September 1936), so do not give that date.

- [Buzenval · Wikipédia](https://fr.wikipedia.org/wiki/Buzenval_(m%C3%A9tro_de_Paris))
- [Buzenval station · Wikipedia](https://en.wikipedia.org/wiki/Buzenval_station)

### 33. Maraîchers

Named for Rue des Maraîchers, recalling the market gardens that once bordered it, known locally for Montreuil peaches. Opened 10 December 1933 with the extension to Porte de Montreuil. It briefly had a street-level connection to the Petite Ceinture's Rue d'Avron station, lost on 23 July 1934 when that line closed to passengers.

- [Maraîchers · Wikipédia](https://fr.wikipedia.org/wiki/Mara%C3%AEchers_(m%C3%A9tro_de_Paris))

### 34. Porte de Montreuil

Named for the former gate in the Thiers fortifications, which controlled the road (then route départementale 41) from Paris to Rosny. Opened 10 December 1933 as the line's eastern terminus, a role it held until the 1937 extension to Mairie de Montreuil. The Montreuil flea market now occupies the former defensive glacis outside the old gate.

- [Porte de Montreuil · Wikipédia](https://fr.wikipedia.org/wiki/Porte_de_Montreuil_(m%C3%A9tro_de_Paris))

### 35. Robespierre

Named for Rue Robespierre, honouring lawyer and revolutionary Maximilien de Robespierre (1758-1794). Montreuil's Communist town council gave the name to the station, then under construction, in 1936, at the initiative of Jacques Duclos. (Corrected: the draft said the street was named in 1936; the source says the station.) Opened 14 October 1937 with the line's final extension, from Porte de Montreuil to Mairie de Montreuil. The French station article calls both entrances Art Deco édicules; the Rue Robespierre one is aligned with the neighbouring facade at no. 187 rue de Paris, rare on the network. (Fact check 2026-10-05: an earlier note here used only the English article, which marks only the Rue Barbès entrance.)

- [Robespierre · Wikipédia](https://fr.wikipedia.org/wiki/Robespierre_(m%C3%A9tro_de_Paris))
- [Robespierre station · Wikipedia](https://en.wikipedia.org/wiki/Robespierre_station)

### 36. Croix de Chavaux

Named for the crossroads above it, then called Croix-de-Chavaux and today Place Jacques-Duclos (the station subtitle), where six roads met, leading to Paris, Rosny-sous-Bois, Bagnolet and Vincennes. "Croix" refers to a monumental wayside cross shown on the Roussel plan and the Cassini map; "Chavaux" is said to be a deformation of "chevaux" (horses), because a relay where mail-coach horses were changed stood at the crossroads. The source uses the conditional, so keep the qualifier. Opened 14 October 1937 with the line's final extension to Mairie de Montreuil. Its platforms were refitted in yellow "Andreu-Motte" style between 1974 and 1984.

- [Croix de Chavaux · Wikipédia](https://fr.wikipedia.org/wiki/Croix_de_Chavaux_(m%C3%A9tro_de_Paris))

### 37. Mairie de Montreuil

Named for its proximity to Montreuil's town hall, built in the 1930s. Opened 14 October 1937 as the line's eastern terminus, a role it has held ever since. Its platforms were refitted in blue "Andreu-Motte" style with flat white tiles, as about a third of network stations were between 1974 and 1984. (Corrected: the draft said Croix de Chavaux and Robespierre received the same blue treatment; Croix de Chavaux is yellow, and the Robespierre sources do not mention Andreu-Motte.)

- [Mairie de Montreuil · Wikipédia](https://fr.wikipedia.org/wiki/Mairie_de_Montreuil_(m%C3%A9tro_de_Paris))

## Validation

- 37 unique stations, one ordered path, no branches, confirmed against the Île-de-France Mobilités open-data stop list, the neighbour stations named in each French station article, and French and English Wikipedia.
- Every station has a sourced naming chain, a separate context fact, and an opening year tied to a specific extension date.
- All source links use HTTPS; every station article above was opened during the audit, plus the battle, place, and closed-station articles cited for specific claims.
- `ratp.fr` and `bonjour-ratp.fr` returned HTTP 403 to every fetch attempt, again in the verification pass; the Île-de-France Mobilités open-data stop list is the official substitute for the stop list, and Wikipedia is the source for dates.
- Shared station IDs confirmed against existing data: `republique`, `oberkampf` (Line 5); `strasbourg-saint-denis` (Line 4); `chaussee-dantin-la-fayette` (Line 7).
- No em dashes used in this document's prose or in any quoted station text destined for the app.
- Data-module construction, TypeScript checks, and browser/functional verification are owned by the later build and review phases.

## Verification

Independent verification pass, 29 September 2026. Every station section above was checked against the full text of its cited French Wikipedia article (fetched through the Wikipedia API), plus the French Line 9 article, the Place de la Nation and Bataille du Trocadéro articles, and English station articles where the French article was silent. All 47 cited URLs returned HTTP 200.

### Route

- Confirmed: 37 stations, Pont de Sèvres to Mairie de Montreuil, no branches. The Île-de-France Mobilités `arrets-lignes` open dataset for Metro route 9 returns exactly these 37 stop names. The order follows from the neighbour stations each French station article names, from Billancourt ("between Pont de Sèvres and Marcel Sembat") to Croix de Chavaux ("between Robespierre and Mairie de Montreuil"), with no gaps.
- `ratp.fr` and `bonjour-ratp.fr` still return HTTP 403. The IDFM dataset is the official substitute for the stop list. Opening dates still rest on Wikipedia.

### Corrections made

1. Saint-Martin: opened in 1931 with Line 8, not with the 1933 Line 9 extension. The "100 metres" reason for not reopening it is in the Line 9 article, not the Saint-Martin article; citation added.
2. Billancourt: the draft said its platforms are "among the few to keep the full Andreu-Motte decor intact". The source says only that, like a third of stations between 1974 and 1984, they were refitted in yellow Andreu-Motte. Replaced.
3. Marcel Sembat: deputy for the 18th arrondissement from 1893 until his death (not "for Paris from 1893"); in charge of *La Petite République* 1892 to 1897.
4. Porte de Saint-Cloud: the French station article gives no naming reason. The Thiers-wall gate explanation is now cited to the English station article. The English article gives 28 September 1923 and the French sources give 29 September; the discrepancy is recorded.
5. Pont de Sèvres: naming link now cited to the English article; raid date (4 April 1943) added from the Line 9 article.
6. Jasmin: 20 March 2018, half of the plaques, spring celebration with flower handouts. It was not a "promotion".
7. Rue de la Pompe: deportation was "the following year" after Fresnes; Théobald was Gastaldo's deputy.
8. Trocadéro: the battle took Fort Louis and the Trocadero peninsula facing Cadiz, on the night of 30 to 31 August 1823. It did not take "the fort defending Cadiz". The station's first platform dates from 1900; the escalator was installed before 1914.
9. Iéna: the "four-letter name" claim is now attributed to the source rather than stated as fact.
10. Alma – Marceau: the "1915 ground subsidence" was not in the station article. The Line 9 article gives the event precisely: a tunnel vault collapse under Place de l'Alma on 8 November 1915. Rewritten and cited.
11. Franklin D. Roosevelt: added the 1942 merged name; gemmaux inauguration 1957; removed from platforms in the 2000s.
12. Miromesnil: the draft's "torture to extract confessions before execution" misread the source. Rewritten as the *question préparatoire* (judicial torture during a trial).
13. Havre – Caumartin: wrong person title. Rue de Caumartin honours Antoine-Louis Lefebvre de Caumartin, marquis de Saint-Ange, not "Antoine-Louis-François Lefebvre, marquis de Caumartin". The 1971 connection is to the Métro régional Auber station (23 November 1971).
14. Chaussée d'Antin – La Fayette: the draft said La Fayette was added "for the Revolution's bicentennial". The source says the station was renamed because it sits at the start of Rue La Fayette, and in parallel got bicentenary decoration funded by Galeries Lafayette. Also fixed the pointer: the existing text is in `line7.ts`, not `line5.md`.
15. Richelieu – Drouot: the draft said the 105-metre platform length was "later standardised across the system". The source limits it to certain Line 8 sections and the new 1930s stations of Lines 1, 3, 7 and 9.
16. Grands Boulevards: first name was Montmartre, then Rue Montmartre.
17. République: the draft said the Line 9 and Line 8 platforms opened the same day. They did not: Line 8 opened 5 May 1931, Line 9 opened 10 December 1933.
18. Saint-Ambroise: "268 stations" was a planned series, not a completed rollout. The source's printed dates for Ambrose (340-394) are internally inconsistent; flagged.
19. Voltaire: named the two other Andreu-Motte prototypes (Pont-Neuf, Ledru-Rollin) and the "model for yellow stations" wording from the source.
20. Charonne: eight people died at the station and a ninth in hospital. The square and the subtitle date from 2007; the plaque already existed then, so "a memorial plaque ... established in 2007" was wrong.
21. Rue des Boulets: added the intermediate name Boulets – Montreuil and the fact that the source gives three hypotheses for "Boulets".
22. Nation: removed the 1968 turnstile test, which the source marks "référence nécessaire". Place-name history now uses exact dates from the Place de la Nation article (26 August 1660, 10 August 1792, 14 July 1880). An alternative context fact is proposed.
23. Buzenval: the Palais Avron was not "demolished". The English article says the building has been a supermarket since 1977. The Palais Avron opening date is disputed between sources and must not be used.
24. Robespierre: the draft said the street was named in 1936. The source says Montreuil's council gave the name to the station, then under construction, in 1936, at Jacques Duclos's initiative. The draft said "both entrances keep 1930s Art Deco styling". This correction was reversed by the fact check of 2026-10-05: the French station article calls both entrances Art Deco.
25. Croix de Chavaux: the crossroads is today Place Jacques-Duclos. The "Chavaux" etymology is conditional in the source, and the qualifier is kept.
26. Mairie de Montreuil: the draft said Croix de Chavaux and Robespierre share its blue Andreu-Motte decor. Croix de Chavaux is yellow, and no Robespierre source mentions Andreu-Motte. Corrected.
27. Minor precision edits: Exelmans (south-western terminus 1922 to 1923; Point-du-Jour closed 23 July 1934), Michel-Ange – Molitor (1913 date), Maraîchers (23 July 1934), and removal of the stray "Bréguet is not on this line" text in the spelling note.

### Open questions answered

- Croix de Chavaux qualifier: keep it. The source uses the conditional ("résulterait").
- RATP access: still blocked (403). The Île-de-France Mobilités open data confirms the 37-stop list; dates still rely on Wikipedia.
- Place de la Nation earlier names: acceptable, as long as the etymology cites the Place de la Nation article (verified above) next to the station article.
- Shared IDs: confirmed that `republique`, `oberkampf` (`line5.ts`), `strasbourg-saint-denis` (`line4.ts`) and `chaussee-dantin-la-fayette` (`line7.ts`) exist. No other Line 9 station has an existing ID. Reuse the existing etymology/context text; set `opened` to the Line 9 year (1923 for Chaussée d'Antin – La Fayette, 1933 for the other three).

### Still unresolved

- Porte de Saint-Cloud opening day: 29 September 1923 (French sources) or 28 September 1923 (English article). Use the year 1923 in the app unless an RATP source is reached.
- Ambrose of Milan's birth year: the French station article's "340-394" is inconsistent; do not print a birth year without a separate source.
- Palais Avron opening date: French and English articles disagree (1933 with the station, or September 1936).
- The Pont de Sèvres casualty figures (about 300 dead, 80 around the station) appear in both the French and English station articles, but neither gives a primary source; qualify them as approximate ("about").
- Several context facts rest on a single Wikipedia article (for example Iéna's four-letter claim and the Menassolle suicide at Grands Boulevards). They are sourced, but the build phase may prefer other facts where a second source is not available.

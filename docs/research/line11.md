# Line 11 source audit

Checked 6 October 2026. Scope: all 19 current stations, English and French. The route runs from Châtelet to Rosny – Bois-Perrier on one continuous path. It has no branches.

## Route and method

`ratp.fr` and `bonjour-ratp.fr` refuse automated fetches with HTTP 403, so this audit does not cite them. The stop list was checked against the open data of Île-de-France Mobilités, the regional transport authority. Its [arrets-lignes dataset](https://data.iledefrance-mobilites.fr/explore/dataset/arrets-lignes/), filtered to `mode = "Metro"` and `route_long_name = "11"` (line id `IDFM:C01381`), returns 38 rows and exactly 19 distinct stop names: the 19 stations below. The dataset writes "Romainville - Carnot", "Montreuil - Hôpital" and "Rosny-Bois-Perrier".

Station order comes from the "Tracé" section of the [French Wikipedia Line 11 article](https://fr.wikipedia.org/wiki/Ligne_11_du_m%C3%A9tro_de_Paris) and from the neighbour stations that each French station article names in its "Situation" section. The [English Wikipedia Line 11 article](https://en.wikipedia.org/wiki/Paris_Metro_Line_11) gives the same 19 stations, the same termini and the same length.

Line facts used below, from the French and English line articles (they agree unless noted):

- Length 11.7 km, 19 stations. Colour `#8d5e2a` with white text, as in the `comingSoon` entry in `apps/web/src/data/lines.ts`.
- 1909–1910: the complementary network includes a short République – Porte des Lilas line, declared of public utility by the law of 30 March 1910, but not built.
- 29 December 1922: the Paris council revives the project, to link Belleville with Châtelet and replace the Belleville funicular tramway (closed 1924). Fulgence Bienvenüe built that funicular as a young engineer and drew the Line 11 route shortly before he retired in 1932.
- 28 April 1935: Châtelet – Porte des Lilas opens, 5.5 km, 12 vaulted stations with 75 m platforms, 22 four-car trains.
- 17 February 1937: one-station extension to Mairie des Lilas.
- 12 May 1944 to 5 March 1945: the German army requisitions the line for underground arms workshops. It is the last line to reopen after the Liberation.
- 13 November 1956: first commercial service with rubber-tyred MP 55 trains (conversion 1954–1956). The line is the first metro line in the world to run on rubber tyres.
- 1967: centralised control (PCC) and automatic train operation. Automatic train operation was a first on the Paris network (French line article "Histoire"; English line article). The articles do not clearly say that the PCC was also a first, so do not claim it.
- 13 June 2024: extension Mairie des Lilas – Rosny – Bois-Perrier, about 6 km and six stations, with five-car MP 14 trains. The line length nearly doubles.
- The French line article states that no Line 11 station has ever changed name. The 2024 stations had project names before opening (recorded below).

## Closed, ghost and unbuilt stations

Line 11 has no closed or ghost station on its route. The count is 19.

- Porte des Lilas – Cinéma and Haxo are ghost stations on the service links between Lines 3 bis and 7 bis. They are near Porte des Lilas and Place des Fêtes but are not on Line 11 track, so they are excluded. Source: [Porte des Lilas · Wikipédia](https://fr.wikipedia.org/wiki/Porte_des_Lilas_(m%C3%A9tro_de_Paris)), [Place des Fêtes · Wikipédia](https://fr.wikipedia.org/wiki/Place_des_F%C3%AAtes_(m%C3%A9tro_de_Paris)).
- The proposed extension to Noisy – Champs (Villemomble, Neuilly-Les Fauvettes, Neuilly-Hôpitaux) is not built. The French line article says studies restarted on 2 July 2025. No opening date. Excluded.
- The Line 11 platform at Châtelet closed during 2019 for the MP 14 works, with Hôtel de Ville as a temporary terminus. This was a temporary closure and does not affect the count.

## Editorial decisions

### Shared station ids and owners

The `lines` order after this work is 1, 2, 3, 4, 5, 6, 7, 9, 11, 14. The owner of a shared id is the first line in that order that has it. The shared-station test compares `name` and `etymology` with the owner.

| Id | Lines in atlas that have it | Owner when Line 11 is added | Owner after Lines 3 and 2 are added | Action for Line 11 |
|---|---|---|---|---|
| `chatelet` | 1, 4, 7, 14 | Line 1 | Line 1 | Copy `name`, `area`, `etymology` from `line1.ts` byte for byte |
| `hotel-de-ville` | 1 | Line 1 | Line 1 | Copy from `line1.ts` |
| `republique` | 5, 9 | Line 5 | Line 3 | Copy from `line5.ts`. Line 3 must later copy the same strings |
| `arts-et-metiers` | none yet | Line 11 | Line 3 | Line 11 writes it first. Line 3 copies it byte for byte |
| `belleville` | none yet | Line 11 | Line 2 | Line 11 writes it first. Line 2 copies it byte for byte |

- Write the etymologies of Arts et Métiers and Belleville so they do not depend on the line: no "Line 11" and no Line 11 dates in the etymology. Put the line-specific facts in `context`.
- Place des Fêtes (Line 7 bis) and Porte des Lilas (Line 3 bis) are interchanges, but 3 bis and 7 bis are not planned for the atlas. They are not shared ids.
- No other Line 11 id exists in `apps/web/src/data/line*.ts` (checked by grep for each slug).
- `Station.opened` is the opening on this line: 1935 for stations 1 to 12, 1937 for Mairie des Lilas, 2024 for stations 14 to 19.

### Agreement with existing copy

- Châtelet. The owner etymology (`line1.ts`) says the Grand Châtelet was demolished "in the early nineteenth century". The station article says "démolie en 1802" and the Line 14 context says demolition ran from 1802 to 1810. The etymology wording is compatible with both. The Line 7 context says a long passage linked Pont Notre-Dame – Pont au Change to the other platforms in 1934 and the station then took the name Châtelet. The station article gives 15 April 1934 and says Line 11 construction motivated the merger. This agrees. The Line 11 context must not repeat the 1934 merger, which belongs to Line 7.
- Hôtel de Ville. The owner etymology says the city hall has housed the municipal institutions since 1357. The station article says the same. The Line 1 context (1944 strike) is about Line 1, so Line 11 needs its own context.
- République. The owner etymology says the square was named as Paris planned a monument to the Republic. The station article says the name came with the statue project, debated by the council from 1878. This agrees. Lines 5 and 9 both use the 1883 Marianne context, so Line 11 should use a different fact.
- Arts et Métiers. The Line 3 platform opened 19 October 1904 with the first section of Line 3 (Avenue de Villiers – Père Lachaise). This agrees with the Line 9 Havre – Caumartin context ("A Line 3 platform opened here in 1904"). The Line 4 Réaumur – Sébastopol context ("opened as Rue Saint-Denis on Line 3") does not involve a Line 11 station. The Line 11 single-track service link leaves the Line 11 track east of Arts et Métiers, passes under the west end of the Line 3 platforms and joins the Line 3 track towards Pont de Levallois – Bécon, west of the station (Arts et Métiers station article, "Situation"); no existing copy mentions it.
- The scratch research for Line 3 lists "CNAM founded 1794" and "Nautilus décor at Arts et Métiers (Line 11, 1994)" as unverified. Both are now verified here: the CNAM article gives 10 October 1794, and the station article gives October 1994 for the copper décor.

### Spellings and names

- Atlas style uses a spaced en dash in compound names. Use "Romainville – Carnot" and "Montreuil – Hôpital". IDFM and the French station titles use a spaced hyphen; these are typographic variants.
- Rosny – Bois-Perrier: IDFM and the French title write "Rosny-Bois-Perrier"; the English article writes "Rosny–Bois-Perrier". The parts are the town (Rosny) and the district (Bois-Perrier). Plan decision 5 says to use "Rosny – Bois-Perrier" only after a signage photo confirms the parts. That photo check is still open (see "Open items").
- "Arts et Métiers", "Place des Fêtes", "Porte des Lilas", "Mairie des Lilas", "Hôtel de Ville", "Serge Gainsbourg", "Coteaux Beauclair" and "La Dhuys" have no hyphens on the IDFM list or the station titles.
- La Dhuys: the station is spelled "Dhuys". The river and the aqueduct are usually spelled "Dhuis"; both Wikipedia articles say "Dhuys" is an accepted variant.
- Rambuteau: use "Barthelot", as in the station article and the title of the biography article. The Rue Rambuteau article writes "Bathelot", which is a typo.
- Belleville: the Paris council voted on 15 December 2015 for the name "Belleville – Commune de Paris 1871". The station article records the vote but no renaming, and the IDFM stop list still gives "Belleville". Do not present the 2015 name as an official name.
- Do not link the French page "Sadi Carnot" or "Dhuis": both are disambiguation pages. Use "Sadi Carnot (homme d'État)" and "Dhuis (rivière)".
- The English line article URL is `Paris_Metro_Line_11`. "Paris Métro Line 11" is a redirect.

### Qualified or limited etymologies

- Coteaux Beauclair: no source explains the words "Coteaux" or "Beauclair". Say only that the station is named after the Coteaux Beauclair development zone (ZAC) beside it. The developer page says the ZAC was created on 17 December 2015 by merging the "Saussaie Beauclair" and "Gabriel Péri" ZACs. The scratch research said the ZAC was "renamed in May 2015", from a search snippet. The developer page does not support that; use the merger.
- Rosny – Bois-Perrier: the station takes the name of the RER E station and the Bois-Perrier district of Rosny-sous-Bois. No source found explains "Perrier". The scratch research says city sources date the name to about 1800, but it gives no link; do not use that date.
- Montreuil – Hôpital: the name is the town and the André-Grégoire intercommunal hospital. No source records the naming decision. Keep to what the station article says: the station is partly under the hospital grounds and serves it.
- Serge Gainsbourg: the project name "Liberté" is only in the English station article. Attribute it or leave it out. The 2023–2024 petition is documented in the French station article; if used, state it neutrally (see the station section).
- Télégraphe: Chappe set up his telegraph on the hill in September 1792 and again in July 1793 (Rue du Télégraphe article). The station article gives no date. Cite the street article for any date.

## Source conflicts and values chosen

| Fact | Sources and values | Value chosen |
|---|---|---|
| Mairie des Lilas opening day | French line, French station, English station and English line "Chronology": 17 February 1937. English line "History": 7 February 1937 | 17 February 1937. Year field: 1937 |
| 2019 closure of the Line 11 platform at Châtelet | Châtelet article: 15 March to 30 December 2019. French line article: from 18 March 2019, reopened 31 December 2019. Hôtel de Ville article: temporary terminus 18 March to 16 December 2019 (the planned end) | Do not give days. Say "for most of 2019" |
| Highest point at Télégraphe | Station article "Histoire", Rue du Télégraphe article and French line article: 128 m (street article: 128.508 m). Station article "Situation": the local road reaches 120 m | 128 m |
| Rank of that high point | Rue du Télégraphe: highest point of the public space of Paris. Belleville (Seine): second highest point of Paris, after Montmartre | Do not call it "the highest point in Paris". Say "near the top of the Belleville hill, 128 m" |
| Chappe's title | Station article: "physicien". Claude Chappe article: "ingénieur", inventor of the semaphore telegraph | "Claude Chappe (1763–1805), inventor of the optical telegraph" |
| Goncourt brothers | Station article: "historiens". Rue des Goncourt article: "historiens et écrivains" | "writers and historians" |
| Commune of Rue de la Dhuys | La Dhuys article "Histoire": Noisy-le-Sec. Same article "Situation" and "Accès": Rosny-sous-Bois | Do not name the commune. Say "the nearby Rue de la Dhuys" |
| Dhuis river location | La Dhuys station article: a river of the Aisne. Dhuis (rivière) article: on the border of the Aisne and the Marne | "a small river east of Paris, in the Aisne and the Marne" or no location |
| Montreuil – Hôpital commune | IDFM: Noisy-le-Sec only. Station article: across Montreuil and Noisy-le-Sec, with both entrances in Montreuil | Area "Montreuil / Noisy-le-Sec" |
| Romainville – Carnot commune | IDFM: Romainville only. Station article: across Romainville and Noisy-le-Sec, mostly Romainville; entrance 4 is in Noisy-le-Sec | Area "Romainville / Noisy-le-Sec" |
| Porte des Lilas Brassens décor | French line article (present tense): ceramic frescoes of Brassens and lilacs. Station article: three mosaics by Michel L'Huillier (late 1980s), destroyed at the end of July 2025 for waterproofing work | The décor no longer exists. If used, use the past tense and give the 2025 removal |
| Place des Fêtes Line 7 (now 7 bis) opening | French station article: 13 February 1912; the branch opened 18 January 1911 and trains passed through without stopping until the station was finished. English station article: "opened on 18 January 1911" | 13 February 1912 for the station. Line 7 bis is not in the atlas, so the date is used only in context, if at all |
| Number of wartime shelter stations | Pyrénées article: 27 other stations. Place des Fêtes article: 28 others besides Place des Fêtes and Maison Blanche | Do not give a number |
| Coteaux Beauclair ZAC name | Scratch research: renamed in May 2015 (search snippet only). Developer page: created 17 December 2015 by merging two ZACs | Developer page |
| Serge Gainsbourg rename cost | Scratch research: "Les Lilas cited a cost of €0.9–1 M". Station article: the petitioners report that the town hall gave that figure | Leave out, or attribute to the petitioners' account |
| Belleville commune | Belleville (Seine): annexed to Paris by the law of 16 June 1859, in effect from 1860 | "annexed to Paris in 1860" |

## Station checks and sources

### 1. Châtelet

Shared id `chatelet`, owner Line 1. Reuse the `line1.ts` name ("Châtelet"), area ("Paris 1er / 4e") and etymology byte for byte. The Line 11 platform opened 28 April 1935 as the western terminus of the first section and is still the terminus. It lies under Avenue Victoria. It carried the subtitle "Avenue Victoria", after Queen Victoria of the United Kingdom (1819–1901), until 2018, when new Parisine name plates dropped it. It is the only Châtelet platform that does not have the standard two-platform layout: it has a third track on the south side for terminal working. For the five-car MP 14 trains, the turnback track was lengthened under the cellar of the Terminus Châtelet restaurant, and the platform was closed for most of 2019.

Context candidates: the Avenue Victoria subtitle (1935–2018), or the 2019 lengthening under the restaurant cellar.

- [Châtelet · Wikipédia](https://fr.wikipedia.org/wiki/Ch%C3%A2telet_(m%C3%A9tro_de_Paris))
- [Ligne 11 du métro de Paris · Wikipédia](https://fr.wikipedia.org/wiki/Ligne_11_du_m%C3%A9tro_de_Paris)

### 2. Hôtel de Ville

Shared id `hotel-de-ville`, owner Line 1. Reuse the `line1.ts` name, area ("Paris 4e") and etymology. The Line 11 platform opened 28 April 1935. It lies under Rue du Renard, north–south, after the line passes under Line 1 (line article, "Tracé"). From 18 March 2019 it served as the temporary western terminus while Châtelet was closed; trains arrived and left from the platform normally used towards Châtelet. The Rambuteau station article says Hôtel de Ville shares Rambuteau's profile, with the lower side walls vertical, not curved. The Hôtel de Ville article itself does not mention this (it describes the Line 11 vault only as elliptical), so attribute the fact to the Rambuteau article.

- [Hôtel de Ville · Wikipédia](https://fr.wikipedia.org/wiki/H%C3%B4tel_de_Ville_(m%C3%A9tro_de_Paris))
- [Rambuteau · Wikipédia](https://fr.wikipedia.org/wiki/Rambuteau_(m%C3%A9tro_de_Paris))
- [Ligne 11 du métro de Paris · Wikipédia](https://fr.wikipedia.org/wiki/Ligne_11_du_m%C3%A9tro_de_Paris)

### 3. Rambuteau

Named for Rue Rambuteau, which honours Claude-Philibert Barthelot, comte de Rambuteau (1781–1869), prefect of the Seine from 1833 to 1848. He decided in 1834 to cut the street through the medieval centre. The subtitle "Centre Georges Pompidou" names the arts centre opened nearby in 1977. Opened 28 April 1935. The first plans put the station under the narrow Rue du Temple, at its junction with Rue Rambuteau, on a shorter route from République to Hôtel de Ville. The street was too narrow, so the line was moved west under the wider Rue du Renard, Rue Beaubourg and Rue Réaumur.

- [Rambuteau · Wikipédia](https://fr.wikipedia.org/wiki/Rambuteau_(m%C3%A9tro_de_Paris))
- [Claude-Philibert Barthelot de Rambuteau · Wikipédia](https://fr.wikipedia.org/wiki/Claude-Philibert_Barthelot_de_Rambuteau)
- [Claude-Philibert Barthelot de Rambuteau · Wikipedia](https://en.wikipedia.org/wiki/Claude-Philibert_Barthelot_de_Rambuteau)
- [Rue Rambuteau · Wikipédia](https://fr.wikipedia.org/wiki/Rue_Rambuteau)

### 4. Arts et Métiers

New shared id `arts-et-metiers`. Line 11 writes it first; Line 3 becomes the owner and copies the strings. Named for the nearby Conservatoire national des arts et métiers, founded by the abbé Henri Grégoire on 10 October 1794 to train technicians and engineers with scientific and technical objects; it now houses the Musée des Arts et Métiers. The Line 3 platform opened 19 October 1904. The Line 11 platform opened 28 April 1935. In October 1994, for the Conservatoire's bicentenary, the Line 11 platforms were covered with 800 riveted copper plates designed by Benoît Peeters and François Schuiten, authors of the comic series *Les Cités obscures*. The station article compares the décor to the Nautilus of *Twenty Thousand Leagues Under the Seas*. Portholes on the platforms show models of museum objects, such as an armillary sphere and the Telstar satellite, and large gears hang from the vault.

- [Arts et Métiers · Wikipédia](https://fr.wikipedia.org/wiki/Arts_et_M%C3%A9tiers_(m%C3%A9tro_de_Paris))
- [Conservatoire national des arts et métiers · Wikipédia](https://fr.wikipedia.org/wiki/Conservatoire_national_des_arts_et_m%C3%A9tiers)

### 5. République

Shared id `republique`, owner Line 5 now and Line 3 after Line 3 is added. Reuse the `line5.ts` name, area ("Paris 3e / 10e / 11e") and etymology. The Line 11 platform opened 28 April 1935, after Line 3 (19 October 1904), Line 5 (15 November 1907), Line 8 (5 May 1931) and Line 9 (10 December 1933). `line5.ts` has no `opened` value for République, and `line9.ts` uses 1933, so 1935 for Line 11 does not conflict. The Line 11 tunnel under the square was built at the same time as Lines 8 and 9; Line 11 construction elsewhere started only in September 1931. Line 11 passes under all the other lines here. From 30 June to 3 August 2018 its platforms were the first on the line to be raised for the MP 14 trains.

Context candidate: the tunnel under the square built in advance with Lines 8 and 9. Do not reuse the Marianne context of Lines 5 and 9.

- [République · Wikipédia](https://fr.wikipedia.org/wiki/R%C3%A9publique_(m%C3%A9tro_de_Paris))
- [Ligne 11 du métro de Paris · Wikipédia](https://fr.wikipedia.org/wiki/Ligne_11_du_m%C3%A9tro_de_Paris)

### 6. Goncourt

Named for Rue des Goncourt, which honours the brothers Edmond (1822–1896) and Jules (1830–1870) de Goncourt, writers and historians who founded the Académie Goncourt, which awards the Prix Goncourt. The subtitle "Hôpital Saint-Louis" names the hospital 350 m to the north, named in memory of King Louis IX. Opened 28 April 1935. Between République and Goncourt the line passes under the Canal Saint-Martin, which runs in a tunnel from that point to the Arsenal basin. The line article lists the hospital's Henri IV courtyard, in brick and stone like the Place des Vosges, among the sights near the station.

- [Goncourt · Wikipédia](https://fr.wikipedia.org/wiki/Goncourt_(m%C3%A9tro_de_Paris))
- [Rue des Goncourt · Wikipédia](https://fr.wikipedia.org/wiki/Rue_des_Goncourt)
- [Ligne 11 du métro de Paris · Wikipédia](https://fr.wikipedia.org/wiki/Ligne_11_du_m%C3%A9tro_de_Paris)

### 7. Belleville

New shared id `belleville`. Line 11 writes it first; Line 2 becomes the owner and copies the strings. Named for its position where Rue de Belleville meets Boulevard de Belleville. Both recall the former village of Belleville: the street was its main road and the boulevard its western edge. Belleville was a commune until its annexation to Paris (law of 16 June 1859, in effect 1860). The Line 2 platform opened 31 January 1903; the Line 11 platform opened 28 April 1935. With Place de Clichy, it is one of only two stations that touch four arrondissements (10e, 11e, 19e, 20e). The Line 11 platforms keep the interwar CMP honey-coloured tile frames with the name set in the tiles. On 15 December 2015 the Paris council voted for the name "Belleville – Commune de Paris 1871"; the article records no renaming, and IDFM still lists the stop as "Belleville".

- [Belleville · Wikipédia](https://fr.wikipedia.org/wiki/Belleville_(m%C3%A9tro_de_Paris))
- [Belleville (Seine) · Wikipédia](https://fr.wikipedia.org/wiki/Belleville_(Seine))

### 8. Pyrénées

Named for Rue des Pyrénées, named after the mountain range on the border between France and Spain. Opened 28 April 1935, after a 700 m run with a 40 per mille gradient under Rue de Belleville (line article). In April 1944 its platforms served as an air-raid shelter, as did other deep stations, mostly on Lines 7, 11 and 12. Its vault is higher and narrower than the standard because of the depth, a profile shared with Jourdain and Place des Fêtes.

- [Pyrénées · Wikipédia](https://fr.wikipedia.org/wiki/Pyr%C3%A9n%C3%A9es_(m%C3%A9tro_de_Paris))
- [Rue des Pyrénées · Wikipédia](https://fr.wikipedia.org/wiki/Rue_des_Pyr%C3%A9n%C3%A9es)
- [Ligne 11 du métro de Paris · Wikipédia](https://fr.wikipedia.org/wiki/Ligne_11_du_m%C3%A9tro_de_Paris)

### 9. Jourdain

Named for Rue du Jourdain, named after the River Jordan. The street ends in front of the church of Saint-Jean-Baptiste de Belleville. The station article says the successive parish churches on that site were all dedicated to John the Baptist, who baptised Christ in the Jordan. Opened 28 April 1935. The line article says Jourdain and Télégraphe were hard to build: they are about 20 m deep, in unstable green clay. A scene of Jean-Pierre Melville's film *Le Samouraï* (1967) was shot here (the Place des Fêtes and Télégraphe articles make the same claim for their stations).

- [Jourdain · Wikipédia](https://fr.wikipedia.org/wiki/Jourdain_(m%C3%A9tro_de_Paris))
- [Rue du Jourdain · Wikipédia](https://fr.wikipedia.org/wiki/Rue_du_Jourdain)
- [Ligne 11 du métro de Paris · Wikipédia](https://fr.wikipedia.org/wiki/Ligne_11_du_m%C3%A9tro_de_Paris)

### 10. Place des Fêtes

Named for the square above it. The name recalls the public festivities that the former commune of Belleville held there. The Place des Fêtes article adds that Belleville bought the land from the hospital administration on 18 March 1836 and laid out a central area for public fêtes, earlier held in front of the church. The Line 7 (now 7 bis) platform opened 13 February 1912; the Line 11 platform opened 28 April 1935. Line 11 was first planned to follow Rue de Belleville the whole way; it was bent north, under buildings for about 800 m, to connect with Line 7 here. With Maison Blanche, it is one of two stations equipped when built to shelter people from chemical attack, with airtight doors in the nearby tunnels; the doors are still visible in the Line 11 tunnels. Its escalators are the longest in the Métro: 256 steps for 27 m of depth.

- [Place des Fêtes · Wikipédia](https://fr.wikipedia.org/wiki/Place_des_F%C3%AAtes_(m%C3%A9tro_de_Paris))
- [Place des Fêtes (Paris) · Wikipédia](https://fr.wikipedia.org/wiki/Place_des_F%C3%AAtes_(Paris))
- [Place des Fêtes station · Wikipedia](https://en.wikipedia.org/wiki/Place_des_F%C3%AAtes_station)

### 11. Télégraphe

Named for Rue du Télégraphe. Claude Chappe (1763–1805), inventor of the optical telegraph, installed his apparatus near the top of the Belleville hill, at about 128 m, in September 1792 and again in July 1793 (Rue du Télégraphe article). The site is now the Belleville cemetery. Opened 28 April 1935. Its tracks, at 96 m above sea level, are the highest point of the whole Métro, although the station is deep. Because of the unstable ground, a central wall with arches divides it into two half-stations. Until 2009 some landings on its long stairs had seats so that passengers could rest.

Image note (plan decision 6): the Line 11 image subject is a Chappe telegraph tower. It must be shown as a generic Chappe station, because no source describes the Belleville apparatus in detail.

- [Télégraphe · Wikipédia](https://fr.wikipedia.org/wiki/T%C3%A9l%C3%A9graphe_(m%C3%A9tro_de_Paris))
- [Rue du Télégraphe · Wikipédia](https://fr.wikipedia.org/wiki/Rue_du_T%C3%A9l%C3%A9graphe)
- [Claude Chappe · Wikipédia](https://fr.wikipedia.org/wiki/Claude_Chappe)
- [Claude Chappe · Wikipedia](https://en.wikipedia.org/wiki/Claude_Chappe)

### 12. Porte des Lilas

Named for the Porte des Lilas, a gate in the Thiers wall that takes the name of the commune of Les Lilas, to which it leads. The gate was also called Porte de Romainville. The Line 3 (now 3 bis) platform opened 27 November 1921. The Line 11 platform opened 28 April 1935 and was the eastern terminus until 17 February 1937. Line 11 passes above the Line 3 bis turning loop here. Its platform is split into two half-stations; the half towards Châtelet has an island platform and a centre siding. Three mosaics by Michel L'Huillier from the late 1980s, of Georges Brassens and of lilacs (after his song "Les Lilas"), were destroyed at the end of July 2025 for waterproofing work; RATP offered the artist new murals. Serge Gainsbourg's song "Le Poinçonneur des Lilas" (1958) is set on the Métro at Les Lilas.

- [Porte des Lilas · Wikipédia](https://fr.wikipedia.org/wiki/Porte_des_Lilas_(m%C3%A9tro_de_Paris))
- [Porte des Lilas (porte de Paris) · Wikipédia](https://fr.wikipedia.org/wiki/Porte_des_Lilas)

### 13. Mairie des Lilas

Named for the town hall of Les Lilas. The commune, created on 24 July 1867, takes its name from the flower gardens that covered the hill under the Second Empire, and above all from the lilacs of the open-air cafés and cabarets where the novelist Paul de Kock found his inspiration (Les Lilas article). Opened 17 February 1937 as the only station of a planned extension towards Fort de Rosny, which the Second World War stopped (line article). It was the eastern terminus from 1937 to 13 June 2024, except while its platforms were raised from 26 June to 29 August 2021, when Porte des Lilas was the terminus (station article). Its platforms are narrow because the street above is narrow. The town hall has displayed Jean-Léon Gérôme's painting *La République*, on loan from the City of Paris, since 1922 (station article).

- [Mairie des Lilas · Wikipédia](https://fr.wikipedia.org/wiki/Mairie_des_Lilas_(m%C3%A9tro_de_Paris))
- [Mairie des Lilas station · Wikipedia](https://en.wikipedia.org/wiki/Mairie_des_Lilas_station)
- [Les Lilas · Wikipédia](https://fr.wikipedia.org/wiki/Les_Lilas)
- [Ligne 11 du métro de Paris · Wikipédia](https://fr.wikipedia.org/wiki/Ligne_11_du_m%C3%A9tro_de_Paris)

### 14. Serge Gainsbourg

Named for the singer-songwriter Serge Gainsbourg (1928–1991), who wrote "Le Poinçonneur des Lilas" (1958), about a Métro ticket puncher at Les Lilas. The mayor of Les Lilas, Daniel Guiraud, obtained the agreement of Jane Birkin, Gainsbourg's former partner and heir, to give the station his name. The English station article gives the provisional name "Liberté"; one entrance is on Rue de la Liberté. Opened 13 June 2024. It was the exit shaft of the tunnel boring machine Sofia, which arrived on 16 July 2021 (English line and station articles). The station does not serve the Jardin Serge-Gainsbourg at the Porte des Lilas, 1.5 km to the west.

Naming dispute (only if used, and neutrally): a petition of 26 November 2023 asked for a new name, citing Gainsbourg's conduct towards women. The name was kept. Source: the French station article, section "Controverse sur le nom".

- [Serge Gainsbourg · Wikipédia](https://fr.wikipedia.org/wiki/Serge_Gainsbourg_(m%C3%A9tro_de_Paris))
- [Serge Gainsbourg station · Wikipedia](https://en.wikipedia.org/wiki/Serge_Gainsbourg_station)
- [Serge Gainsbourg · Wikipédia (singer)](https://fr.wikipedia.org/wiki/Serge_Gainsbourg)
- [Serge Gainsbourg · Wikipedia (singer)](https://en.wikipedia.org/wiki/Serge_Gainsbourg)

### 15. Romainville – Carnot

Named for the town of Romainville and the nearby Place Carnot, which honours Sadi Carnot (1837–1894), President of the Republic from 1887 until his death in 1894. The project name was "Place Carnot". The final name was set by the IDFM naming committee on 27 April 2022. Opened 13 June 2024. At the end of the 1920s, Place Carnot was already proposed as the Line 11 terminus. The square is a junction of eight roads (Place Carnot article). At 26 m, the platforms are the deepest on the 2024 extension. The listed Trianon cinema stands on the square.

- [Romainville - Carnot · Wikipédia](https://fr.wikipedia.org/wiki/Romainville_-_Carnot_(m%C3%A9tro_de_Paris))
- [Place Carnot (Romainville) · Wikipédia](https://fr.wikipedia.org/wiki/Place_Carnot_(Romainville))
- [Sadi Carnot (homme d'État) · Wikipédia](https://fr.wikipedia.org/wiki/Sadi_Carnot_(homme_d%27%C3%89tat))
- [Sadi Carnot (statesman) · Wikipedia](https://en.wikipedia.org/wiki/Sadi_Carnot_(statesman))

### 16. Montreuil – Hôpital

Named for the town of Montreuil and the André-Grégoire intercommunal hospital, which the station serves. The station lies under Boulevard de la Boissière and partly under the hospital grounds, across the boundary of Montreuil and Noisy-le-Sec. The hospital opened on 5 July 1965, first as a maternity unit. Opened 13 June 2024. It was built by cut and cover, in two parts. In October 2013 an amendment to the regional master plan (SDRIF) added an option to extend Line 9 here, to link lower and upper Montreuil; the station article says the project is no longer discussed. The 2008 SDRIF first planned a first extension stage to Montreuil – Hôpital only (line article).

- [Montreuil - Hôpital · Wikipédia](https://fr.wikipedia.org/wiki/Montreuil_-_H%C3%B4pital_(m%C3%A9tro_de_Paris))
- [Centre hospitalier intercommunal André-Grégoire · Wikipédia](https://fr.wikipedia.org/wiki/Centre_hospitalier_intercommunal_Andr%C3%A9-Gr%C3%A9goire)
- [Ligne 11 du métro de Paris · Wikipédia](https://fr.wikipedia.org/wiki/Ligne_11_du_m%C3%A9tro_de_Paris)

### 17. La Dhuys

Named for the nearby Rue de la Dhuys, which takes its name from the Dhuis (also spelled Dhuys), a small river whose water was carried to Paris by the Dhuis aqueduct. The aqueduct, built from 1863 to 1865, runs 128.61 km almost level; it now supplies the Val d'Europe area. The project name was "La Boissière". Opened 13 June 2024. After the public inquiry, the station was built underground from a circular shaft, not in open cut, to protect the neighbouring houses. The station article says that shaft "servira de puits de lancement du tunnelier" (future tense: it was planned as the launch shaft of the tunnel boring machine). No linked source confirms in the past tense that the machine started there, so state it as the planned launch shaft or leave it out. RATP built 19 social housing units above one exit.

- [La Dhuys · Wikipédia](https://fr.wikipedia.org/wiki/La_Dhuys_(m%C3%A9tro_de_Paris))
- [Aqueduc de la Dhuis · Wikipédia](https://fr.wikipedia.org/wiki/Aqueduc_de_la_Dhuis)
- [Dhuis (rivière) · Wikipédia](https://fr.wikipedia.org/wiki/Dhuis_(rivi%C3%A8re))

### 18. Coteaux Beauclair

Named after the Coteaux Beauclair development zone (ZAC) in Rosny-sous-Bois, next to the station. The developer says the ZAC was created on 17 December 2015 by merging the "Saussaie Beauclair" and "Gabriel Péri" zones, and that the new metro station was the reason for the merger. No source explains the words of the name. The project name was "Londeau-Domus", after the Londeau district and the Domus shopping centre. Opened 13 June 2024. It is the only elevated station on the line, on the 580 m Coteaux Beauclair viaduct, and the first viaduct station built on the Métro since 1905. Engineer-architect Marc Mimram designed the viaduct and the station, with glass canopies over the platforms, 8 m above the ground. The viaduct carries the line over the A3–A86 junction and a steep slope.

- [Coteaux Beauclair · Wikipédia](https://fr.wikipedia.org/wiki/Coteaux_Beauclair_(m%C3%A9tro_de_Paris))
- [Coteaux Beauclair station · Wikipedia](https://en.wikipedia.org/wiki/Coteaux_Beauclair_station)
- [Viaduc de Coteaux Beauclair · Wikipédia](https://fr.wikipedia.org/wiki/Viaduc_de_Coteaux_Beauclair)
- [Paredev · ZAC Coteaux Beauclair](https://www.paredev.fr/projets/coteaux-beauclair)

### 19. Rosny – Bois-Perrier

Named, like the RER E station beside it, for the Bois-Perrier district of Rosny-sous-Bois. The SNCF station opened in 1971 to serve the district's new housing estates and the Rosny 2 shopping centre, which opened in 1973. Opened 13 June 2024 as the eastern terminus. It is the easternmost station of the whole Métro. It lies under Rue Léon-Blum, parallel to the RER tracks and partly under the Rosny 2 grounds; the track beyond it leads to the new Line 11 workshops in Rosny-sous-Bois. Line 15 is planned to serve the station around 2030, linked to Line 11 by a 35 m tunnel under the RER tracks.

- [Rosny-Bois-Perrier · Wikipédia](https://fr.wikipedia.org/wiki/Rosny-Bois-Perrier_(m%C3%A9tro_de_Paris))
- [Gare de Rosny-Bois-Perrier · Wikipédia](https://fr.wikipedia.org/wiki/Gare_de_Rosny-Bois-Perrier)
- [Rosny–Bois-Perrier station · Wikipedia](https://en.wikipedia.org/wiki/Rosny%E2%80%93Bois-Perrier_station)

## Checks

- Station count: 19, equal to the 19 distinct stop names in the IDFM arrets-lignes dataset for Metro route 11.
- Every station section has at least two links. Every Wikipedia link above was checked through the MediaWiki API on 6 October 2026 (full text read for the station articles and most namesake articles; title check only for the English biography pages and the English Place des Fêtes article). None is a missing page, a redirect or a disambiguation page. The Paredev page was fetched directly (HTTP 200).
- Termini: Châtelet and Rosny – Bois-Perrier. One path, no branches.
- Seine crossings: none. The Châtelet terminus is under Avenue Victoria on the Right Bank, and the line runs east and north from there. Leave the `riverCrossings["11"]` key out.
- Shared ids: `chatelet`, `hotel-de-ville` (owner Line 1) and `republique` (owner Line 5, then Line 3). New ids that later lines will share: `arts-et-metiers` (Line 3) and `belleville` (Line 2).
- Areas: Châtelet "Paris 1er / 4e", Hôtel de Ville "Paris 4e", Rambuteau "Paris 3e / 4e", Arts et Métiers "Paris 3e", République "Paris 3e / 10e / 11e", Goncourt "Paris 10e / 11e", Belleville "Paris 10e / 11e / 19e / 20e", Pyrénées, Jourdain, Télégraphe and Porte des Lilas "Paris 19e / 20e", Place des Fêtes "Paris 19e", Mairie des Lilas and Serge Gainsbourg "Les Lilas", Romainville – Carnot "Romainville / Noisy-le-Sec", Montreuil – Hôpital "Montreuil / Noisy-le-Sec", La Dhuys "Montreuil / Rosny-sous-Bois", Coteaux Beauclair "Rosny-sous-Bois / Noisy-le-Sec", Rosny – Bois-Perrier "Rosny-sous-Bois".

## Open items for the verification pass (B2)

- Rosny – Bois-Perrier: confirm the name parts on a platform signage photo before using the spaced en dash (plan decision 5).
- Jourdain: the station article gives a platform renovation from 29 October 2024 to 2 October 2026. Do not describe the platform décor until the result is confirmed.
- Serge Gainsbourg: the project name "Liberté" has one source (English station article). Decide whether to use it.
- Coteaux Beauclair, Montreuil – Hôpital and Rosny – Bois-Perrier have no source that explains the name beyond the place it names. Keep the etymologies to that.
- Several context facts rest on one Wikipedia article (for example the Place des Fêtes escalator record, the Télégraphe track altitude and the Mairie des Lilas Gérôme painting). They are sourced, but the copy phase may prefer facts confirmed by a second source.

## Verification (B2)

Verified 2026-10-06 by an independent agent.

Method: all 52 distinct links were opened. The 50 Wikipedia links were read in full through the MediaWiki API (plain-text extract and wikitext). A batch title query found no missing page, redirect or disambiguation page. The Paredev page returned HTTP 200 and its text was read. The IDFM count was checked again through the dataset API (`/api/explore/v2.1/catalog/datasets/arrets-lignes/records`, `mode="Metro"`): route 11 gives 38 rows, line id `IDFM:C01381`, 19 distinct stop names, the same 19 as above. Route 2 (`IDFM:C01372`) gives 25 and route 3 (`IDFM:C01373`) gives 25. Each fact in the station sections was compared with the linked text. The facts not listed below agree with their sources.

### Corrections

1. Line facts, 1967: "both firsts on the Paris network" changed. Both line articles say only that automatic train operation was a first. The PCC is not clearly called a first.
2. Agreement with existing copy, Arts et Métiers: "the service link joins Line 3 just before Réaumur – Sébastopol" replaced with what the station article says: it joins the Line 3 track towards Pont de Levallois – Bécon, west of Arts et Métiers. No source names Réaumur – Sébastopol.
3. Belleville (Spellings and station section): "The name was not applied" is not stated by the article. Qualified: the article records the vote but no renaming, and the IDFM stop list still gives "Belleville".
4. Source conflicts: added a row for the Place des Fêtes Line 7 opening. The English station article gives 18 January 1911 (the branch opening). The French article gives 13 February 1912 for the station.
5. Hôtel de Ville: the vertical lower side walls are not in the Hôtel de Ville article, which describes the Line 11 vault only as elliptical. The Rambuteau article states that Hôtel de Ville shares the profile. Attribution changed, and the Rambuteau and line article links added (the line article supports "after the line passes under Line 1").
6. Arts et Métiers: "about 800 riveted copper plates" changed to "800". The station article gives 800 without qualification.
7. Goncourt: added the line article link, which supports the Henri IV courtyard fact attributed to it.
8. Pyrénées: added the line article link, which supports the 700 m run and the 40 per mille gradient.
9. Place des Fêtes: "Line 11 was first to follow Rue de Belleville" corrected to "was first planned to follow". "Gas-tight doors" changed to "airtight doors" in the nearby tunnels (French "portes étanches à l'air"; English "airtight doors").
10. Mairie des Lilas: added the line article link for the Fort de Rosny extension stopped by the war. Qualified "eastern terminus from 1937 to 13 June 2024": Porte des Lilas was the terminus from 26 June to 29 August 2021 while the platforms were raised (station article).
11. Montreuil – Hôpital: "In 2013" made precise as "October 2013" (station article). Added the line article link for the 2008 SDRIF phasing fact.
12. La Dhuys: "That shaft was the launch point of the tunnel boring machine" qualified. The station article uses the future tense ("servira de puits de lancement"); no linked source confirms it in the past tense.

No dead links were found. No fact without a link was found that needed removal; the facts above that lacked a link in their own section now have one.

### Unresolved doubts

- Rosny – Bois-Perrier: the signage photo check for the name parts (plan decision 5) is still open. This pass did not look at a photo.
- Jourdain: the station article gives the platform renovation as 29 October 2024 to 2 October 2026. That end date is four days before this check, and no source confirms the work finished or describes the new décor. Do not describe the platform décor.
- Porte des Lilas: the station article says the Line 11 vaults and side walls are under renovation from 15 March 2025 to 31 August 2029. Do not describe the current platform décor.
- Serge Gainsbourg: the project name "Liberté" is still in the English station article only. The French station article does not give it.
- The petition summary "citing Gainsbourg's conduct towards women" is milder than the petition text quoted in the French article, which also alleges paedocriminal and incestuous tendencies. If the dispute is used, the copy phase must word it with care and attribute it.
- Single-source facts (Place des Fêtes escalator record, Télégraphe track altitude, Mairie des Lilas Gérôme painting, Romainville – Carnot depth of 26 m) were each confirmed in the linked article, but no second source was found.

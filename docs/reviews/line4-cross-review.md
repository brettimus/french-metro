# Independent Line 4 cross-review

Checked 19 September 2026. Read-only review of all 29 entries in `apps/web/src/data/line4.ts`, after the shorter Montrouge and Vavin text and the clarified French Montparnasse text.

## Result

No incorrect naming chain, missing station, route-order error or material English/French contradiction found. One small construction-detail correction is recommended below. No source data was edited by this reviewer.

## Correction: Saint-Michel construction

The context describes one metal caisson. The cited [station article, Quais section](https://fr.wikipedia.org/wiki/Saint-Michel_(m%C3%A9tro_de_Paris)#Quais), describes three steel caissons. Use the plural without adding unnecessary dimensions.

Replace `context.en` with:

> The station was built in steel caissons sunk into the ground beside the Seine. This construction formed part of Line 4’s difficult river crossing.

Replace `context.fr` with:

> La station a été construite dans des caissons en acier enfoncés dans le sol, près de la Seine. Cet ouvrage faisait partie de la difficile traversée du fleuve par la ligne 4.

Severity: minor factual precision. The name explanation is correct.

## Coverage

All station source pages were opened, including the RATP source used instead of Wikipedia for Montparnasse. Relevant name-origin, history and platform sections were compared with both languages. Supplementary municipal, transport, museum and parliamentary sources were also opened.

- Porte de Clignancourt, Simplon, Marcadet–Poissonniers, Château Rouge and Barbès–Rochechouart: checked gate/street chains, former names, dates and retained uncertainty about the Château Rouge building.
- Gare du Nord, Gare de l’Est, Château d’Eau, Strasbourg–Saint-Denis and Réaumur–Sébastopol: checked railway directions, fountain origin, street references, station mergers and renaming dates.
- Étienne Marcel, Les Halles, Châtelet, Cité and Saint-Michel: checked biographical reference, market relocation, demolished fortress, island name and bridge/chapel chain.
- Odéon, Saint-Germain-des-Prés, Saint-Sulpice, Saint-Placide and Montparnasse–Bienvenüe: checked theatre and church references, dedications, former Vaugirard name, rubble-hill account and 1942 merger.
- Vavin, Raspail, Denfert-Rochereau, Mouton-Duvernet and Alésia: checked parliamentary biographies, 1848 context, Belfort commemoration, orange-tile date, execution year and siege reference.
- Porte d’Orléans, Mairie de Montrouge, Barbara and Bagneux–Lucie Aubrac: checked former gate/terminus, municipal naming uncertainty, burial-place reference and public vote alternatives.

The 29-stop sequence matches [Transilien’s official Line 4 transcription](https://www.transilien.com/fr/page-lignes/metro-4). There is one path, every station occurs once, and the two Seine crossings are Châtelet to Cité and Cité to Saint-Michel.

## Decisions retained

- Keep the two possible Montrouge origins. The [municipal history](https://www.ville-montrouge.fr/920-l-histoire-de-montrouge.htm) explicitly describes the disagreement, although it favours the soil explanation.
- Keep Château Rouge’s construction date qualified. The station source says it was probably built between 1775 and 1795.
- Keep the shortened Vavin text. The [Assemblée nationale biography](https://www2.assemblee-nationale.fr/sycomore/fiche/11095) supports his 1839 election, notarial career and later service under the Second Republic. The page’s direct fetch was intermittent; its indexed official biography was also checked.
- Keep the origin of Montparnasse as a humorous reference to Parnassus and poetry. Do not import the RATP article’s loose description of Parnassus as the home of the Greek gods.
- Keep “fronton” in the Odéon text. The [theatre’s own conservation page](https://www.theatre-odeon.eu/fr/eac-page_redorer_l_odeon) uses this term for its frontage.
- Keep station-name en dashes. No em dash is present in the public Line 4 data.

## Checks

Read-only data checks confirm 29 unique IDs, one full path, non-empty bilingual origins and context, and HTTPS source URLs. Browser state and visual review are outside this source audit.

## Resolution

Root applied both exact replacement paragraphs before the final release.

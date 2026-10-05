# Line 5 copy changes (2026-10-05)

Evaluator runs: `apps/web/scripts/copy/out/line5-before/`, `line5-before-line/` and `line5-after/`, `line5-after-line/`.

## `station/5/bobigny-pablo-picasso/etymology/en`

- Before: Called Bobigny–Pablo Picasso after the town and nearby Rue Pablo-Picasso. The street honours Spanish artist Pablo Picasso.
- After: Called Bobigny – Pablo Picasso after the town and nearby Rue Pablo-Picasso. The street honours Spanish artist Pablo Picasso.
- Reason: stationDash FAIL: use the house form “A – B”.

## `station/5/bobigny-pablo-picasso/context/en`

- Before: The northern terminus opened in 1985. Its subtitle, Préfecture–Hôtel du Département, identifies the nearby administrative offices of Seine-Saint-Denis.
- After: The northern terminus opened in 1985. Its subtitle, Préfecture – Hôtel du Département, identifies the nearby administrative offices of Seine-Saint-Denis.
- Reason: stationDash FAIL: spaced en dash in the subtitle.

## `station/5/bobigny-pablo-picasso/context/fr`

- Before: Ce terminus nord ouvre en 1985. Son sous-titre, Préfecture–Hôtel du Département, désigne les services administratifs de la Seine-Saint-Denis situés à proximité.
- After: Ce terminus nord ouvre en 1985. Son sous-titre, Préfecture – Hôtel du Département, désigne les services administratifs de la Seine-Saint-Denis situés à proximité.
- Reason: stationDash FAIL: spaced en dash in the subtitle.

## `station/5/bobigny-pantin-raymond-queneau/etymology/en`

- Before: Called Bobigny–Pantin–Raymond Queneau after the two neighbouring towns and nearby Rue Raymond-Queneau. The street honours the French writer who wrote Zazie dans le métro.
- After: Called Bobigny – Pantin – Raymond Queneau after the two neighbouring towns and nearby Rue Raymond-Queneau. The street honours the French writer who wrote Zazie dans le métro.
- Reason: stationDash FAIL: use the house form “A – B – C”.

## `station/5/eglise-de-pantin/etymology/en`

- Before: Called Église de Pantin because it serves the nearby Saint-Germain-l’Auxerrois church. The name simply means “Pantin church”.
- After: Called Église de Pantin, French for “Pantin church”, after the nearby church of Saint-Germain-l’Auxerrois.
- Reason: Edit band (0.67): S1 and filler “simply”. The name explanation now comes first, and the gloss “Pantin church” is kept in the first sentence. No fact changed.

## `station/5/ourcq/context/en`

- Before: Work on the canal began in 1802. It was designed to bring water to Paris and carry goods, linking the city to waterways farther east.
- After: Ourcq station did not open until March 1947. Trains had passed through it without stopping since the line reached Église de Pantin in October 1942. The nearby canal, begun in 1802, was built to bring water to Paris and to carry goods between the city and waterways farther east.
- Reason: Edit band (0.79): T3 tail clause, S7 0.61 (namesake fact only). Added a station-specific fact: opened 21 March 1947, trains passed through without stopping after the 12 October 1942 extension to Église de Pantin. Source: https://fr.wikipedia.org/wiki/Ourcq_(m%C3%A9tro_de_Paris) (station article, listed as the entry's first source). Canal facts kept; 1802 verified in https://fr.wikipedia.org/wiki/Canal_de_l%27Ourcq.

## `station/5/ourcq/context/fr`

- Before: Les travaux du canal commencent en 1802. Il doit alimenter Paris en eau et transporter des marchandises, en reliant la capitale aux voies navigables situées plus à l’est.
- After: La station n’ouvre qu’en mars 1947. Depuis l’arrivée de la ligne à Église de Pantin en octobre 1942, les trains la traversaient sans s’arrêter. Le canal voisin, commencé en 1802, doit alimenter Paris en eau et transporter des marchandises entre la capitale et les voies navigables plus à l’est.
- Reason: Parity with EN; T3 tail clause « en reliant » removed; first try had a 26-word sentence, shortened. Same new fact and source as EN: https://fr.wikipedia.org/wiki/Ourcq_(m%C3%A9tro_de_Paris).

## `station/5/laumiere/context/en`

- Before: Early plans placed the station nearer the town hall and called it Meynadier. The final route followed Avenue Jean-Jaurès instead, avoiding a winding course through smaller streets.
- After: Early plans placed the station nearer the town hall and called it Meynadier. The final route followed Avenue Jean-Jaurès instead and avoided a winding course through smaller streets.
- Reason: tailClause REVIEW: “, avoiding …” turned into a main verb.

## `station/5/laumiere/context/fr`

- Before: Les premiers plans prévoyaient une station plus proche de la mairie, appelée Meynadier. Le tracé retenu suit l’avenue Jean-Jaurès, évitant un parcours sinueux dans des rues plus étroites.
- After: Les premiers plans prévoyaient une station plus proche de la mairie, appelée Meynadier. Le tracé retenu suit l’avenue Jean-Jaurès et évite un parcours sinueux dans des rues plus étroites.
- Reason: tailClause REVIEW: « , évitant … » turned into a main verb.

## `station/5/jaures/context/en`

- Before: It was previously Rue d’Allemagne. The station changed its name before the avenue above it became Avenue Jean-Jaurès later that month. Line 5 joined the interchange in 1942.
- After: The station’s former name was Rue d’Allemagne. The renaming came before the avenue above it became Avenue Jean-Jaurès later that month. Line 5 joined the interchange in 1942.
- Reason: openingPronoun (S5 capped at 0): the note opened with “It”. Named the station. No fact changed.

## `station/5/jaures/context/fr`

- Before: Elle s’appelait auparavant Rue d’Allemagne. Le changement précède celui de l’avenue, devenue avenue Jean-Jaurès plus tard dans le mois. La ligne 5 rejoint cette correspondance en 1942.
- After: La station s’appelait auparavant Rue d’Allemagne. Ce changement précède celui de l’avenue, devenue avenue Jean-Jaurès plus tard dans le mois. La ligne 5 rejoint cette correspondance en 1942.
- Reason: Edit band (0.83): openingPronoun « Elle ». Named the station. fr.genericPlaceCase on « Rue d’Allemagne » is left: it is the former station name, a proper name.

## `station/5/stalingrad/context/en`

- Before: The station took this name in 1946. Four years earlier, new passages had joined the Line 2 and Line 7 stations to the arriving Line 5, creating one interchange.
- After: The station took this name in 1946. Four years earlier, Line 5 arrived and new passages joined it to the Line 2 and Line 7 stations. The three lines then formed one interchange.
- Reason: tailClause REVIEW: “, creating one interchange” turned into its own sentence. No fact changed.

## `station/5/stalingrad/context/fr`

- Before: La station prend ce nom en 1946. Quatre ans plus tôt, de nouveaux passages avaient réuni les stations des lignes 2 et 7 à l’arrivée de la ligne 5, créant une correspondance unique.
- After: La station prend ce nom en 1946. Quatre ans plus tôt, la ligne 5 arrive et de nouveaux passages la relient aux stations des lignes 2 et 7. Les trois lignes forment alors une seule correspondance.
- Reason: Edit band (0.85): 26-word sentence and T3 tail « , créant … ». Split into two sentences. No fact changed.

## `station/5/gare-de-lest/context/en`

- Before: Lines 5 and 7 share a broad underground space here, with their tracks beside one another. Line 4 passes below them, making the station a junction of three metro lines.
- After: Lines 5 and 7 share a broad underground space here, with their tracks beside one another. Line 4 passes below them, so three metro lines meet at the station.
- Reason: tailClause REVIEW: “, making the station a junction …” replaced with a direct clause. Etymology not touched (owned by Line 4).

## `station/5/oberkampf/etymology/en`

- Before: Called Oberkampf after Rue Oberkampf, which honours Christophe-Philippe Oberkampf. The German-born manufacturer founded the printed-textile works at Jouy-en-Josas, known for toile de Jouy.
- After: Called Oberkampf after Rue Oberkampf, which honours Christophe-Philippe Oberkampf. In 1760, the German-born manufacturer opened a printed-textile workshop at Jouy-en-Josas, known for toile de Jouy. It became a royal manufacture in 1783.
- Reason: Moved the 1760 workshop and 1783 royal manufacture facts here from the context, so the context can carry a station fact. Both facts were already in this entry (context) in both locales. Etymology owned by Line 5 (lowest line number).

## `station/5/oberkampf/etymology/fr`

- Before: La station doit son nom à la rue Oberkampf, dédiée à Christophe-Philippe Oberkampf. Cet industriel d’origine allemande fonde à Jouy-en-Josas la manufacture de tissus imprimés célèbre pour la toile de Jouy.
- After: La station doit son nom à la rue Oberkampf, dédiée à Christophe-Philippe Oberkampf. En 1760, cet industriel d’origine allemande ouvre à Jouy-en-Josas un atelier de tissus imprimés, célèbre pour la toile de Jouy. Il devient manufacture royale en 1783.
- Reason: Same as EN: 1760 and 1783 facts moved from the context. No new fact.

## `station/5/oberkampf/context/en`

- Before: Oberkampf opened his workshop in 1760. In 1783 it received the title of royal manufacture. Its flower patterns and illustrated scenes became a distinctive part of French textile design.
- After: The Line 5 platforms opened in January 1907. Line 9 arrived in 1933, with platforms parallel to those of Line 5 under Boulevard Voltaire. The Line 9 platforms are 105 metres long, compared with 75 metres for Line 5.
- Reason: Rewrite band (0.45): S4=0 deletable evaluative sentence, S3 puffery “became a distinctive part of”, T9 closer, S7 0.63. Removed the evaluative sentence about flower patterns (judgement, not a fact; toile de Jouy stays named in the etymology). Moved 1760/1783 facts to etymology. New station facts: Line 5 platforms opened 15 January 1907; Line 9 platforms opened 10 December 1933, semi-aligned and parallel under Boulevard Voltaire; Line 9 platforms 105 m, Line 5 platforms 75 m. Source: https://fr.wikipedia.org/wiki/Oberkampf_(m%C3%A9tro_de_Paris) (station article, listed as the entry's first source). This also removes the three sentences duplicated on station/9/oberkampf.

## `station/5/oberkampf/context/fr`

- Before: Oberkampf ouvre son atelier en 1760. En 1783, l’atelier reçoit le titre de manufacture royale. Ses motifs floraux et ses scènes figuratives marquent l’histoire des tissus imprimés français.
- After: Les quais de la ligne 5 ouvrent en janvier 1907. La ligne 9 arrive en 1933, avec des quais parallèles à ceux de la ligne 5 sous le boulevard Voltaire. Ses quais mesurent 105 mètres, contre 75 mètres pour la ligne 5.
- Reason: Rewrite band (0.49): « marquent l’histoire » puffery and closer. Same changes and source as EN: https://fr.wikipedia.org/wiki/Oberkampf_(m%C3%A9tro_de_Paris).

## `station/5/richard-lenoir/context/en`

- Before: The boulevard’s gardens sit above a covered stretch of the Canal Saint-Martin. The metro runs beside that canal tunnel, leaving little room for the station’s entrance hall.
- After: The boulevard’s gardens sit above a covered stretch of the Canal Saint-Martin. The metro runs beside that canal tunnel, so the station’s entrance hall has little room.
- Reason: tailClause REVIEW: “, leaving little room …” replaced with “so …”. No fact changed.

## `station/5/breguet-sabin/etymology/en`

- Before: Called Bréguet–Sabin after two streets. Rue Bréguet honours the Breguet family, including watchmaker Abraham Louis Breguet. Rue Saint-Sabin recalls Charles-Pierre d’Angelesme de Saint-Sabin, an eighteenth-century Paris alderman.
- After: Called Bréguet – Sabin after two streets. Rue Bréguet honours the Breguet family, including watchmaker Abraham Louis Breguet. Rue Saint-Sabin recalls Charles-Pierre d’Angelesme de Saint-Sabin, an eighteenth-century Paris alderman.
- Reason: stationDash FAIL: use the house form “A – B”.

## `station/5/breguet-sabin/etymology/fr`

- Before: La station doit son nom à deux rues. La rue Bréguet honore la famille Breguet, dont l’horloger Abraham Louis Breguet. La rue Saint-Sabin rappelle Charles-Pierre d’Angelesme de Saint-Sabin, échevin de Paris au XVIIIe siècle.
- After: Le nom de la station réunit ceux de deux rues. La rue Bréguet honore la famille Breguet, dont l’horloger Abraham Louis Breguet. La rue Saint-Sabin rappelle Charles-Pierre d’Angelesme de Saint-Sabin, échevin de Paris au XVIIIe siècle.
- Reason: T21 corpus duplicate « La station doit son nom à deux rues. » (same sentence on Chaussée d’Antin). Reworded. No fact changed.

## `station/5/bastille/context/en`

- Before: Construction of Line 5 exposed remains of the prison’s defensive wall in 1905. Part of this masonry survives beside the platform, bringing the former fortress into the station itself.
- After: Construction of Line 5 uncovered part of the prison’s defensive wall in 1905. Some of this masonry is preserved beside the platform, inside the station.
- Reason: T3 tail clause “, bringing the former fortress into the station itself” removed (commentary). Now matches FR (« conservée près du quai, dans la station »). Etymology not touched (owned by Line 1).

## `station/5/gare-dausterlitz/context/en`

- Before: Line 5 crosses the railway station’s great hall on an elevated structure. The metro stop was originally Gare d’Orléans, reflecting the railway’s route towards Orléans.
- After: Line 5 crosses the railway station’s great hall on an elevated structure. The metro stop was originally Gare d’Orléans, after the railway’s route towards Orléans.
- Reason: tailClause REVIEW: “, reflecting …” replaced with “after …”. No fact changed.

## `station/5/saint-marcel/context/en`

- Before: A medieval legend tells of Marcel defeating a dragon with his bishop’s staff. A sculpture at Notre-Dame shows this scene.
- After: According to his Life, a medieval account, Marcel defeated a dragon with his bishop’s staff. A sculpture on the central pillar of the Saint Anne portal at Notre-Dame shows this scene. The present statue is a nineteenth-century copy.
- Reason: Edit band (0.83): T7 vague attribution “A medieval legend tells”. Named the text that tells the legend (his Life) and kept the hedge (“a medieval account”). Made the Notre-Dame location precise and added that the present statue is a 19th-century copy. Sources: https://theophile-centrechastel.inist.fr/s/theophile/item/68737 (trumeau of the Sainte-Anne portal; legend from the Life of Saint Marcel; present statue a copy by Geoffroy-Dechaume, dated 1847–1864), listed on the entry.

## `station/5/saint-marcel/context/fr`

- Before: Une légende médiévale raconte que Marcel vainquit un dragon avec sa crosse d’évêque. Une sculpture de Notre-Dame représente cette scène.
- After: Selon sa Vie, un récit médiéval, Marcel vainc un dragon avec sa crosse d’évêque. Une sculpture du trumeau du portail Sainte-Anne, à Notre-Dame, représente cette scène. La statue actuelle est une copie du XIXe siècle.
- Reason: Edit band (0.82): T7 « Une légende médiévale raconte ». Same change and source as EN.

## `station/5/place-ditalie/context/en`

- Before: In 1907, Line 5 began running beyond this stop to Étoile. That section passed permanently to Line 6 in 1942, making Place d’Italie Line 5’s southern terminus.
- After: In 1907, Line 5 began running beyond this stop to Étoile. That section passed permanently to Line 6 in 1942. Place d’Italie then became Line 5’s southern terminus.
- Reason: tailClause REVIEW: “, making Place d’Italie …” turned into its own sentence; now matches FR. No fact changed.

## `line/5/summary/en`

- Before: Artists, old city gates and a railway above the Seine. Discover the names of 22 stations.
- After: Line 5 runs from Bobigny – Pablo Picasso to Place d’Italie and crosses the Seine on a viaduct. Its 22 station names include Picasso, Queneau, the Bastille and Napoleon’s victory at Austerlitz.
- Reason: Edit band (0.69): S2 vague claims, L1 0.67, parity conflict 0.49 (EN “railway” vs FR « métro »). Rewritten to L1 level 4: termini and named examples. All facts come from the Line 5 entries (termini, Austerlitz viaduct over the Seine on quai-de-la-rapee, Picasso, Queneau, Bastille, Austerlitz 1805). Removed “old city gates” (only Porte de Pantin fits) and the call to action.

## `line/5/summary/fr`

- Before: Des artistes, d’anciennes portes et un métro au-dessus de la Seine. Découvrez les noms de 22 stations.
- After: La ligne 5 relie Bobigny – Pablo Picasso à Place d’Italie et franchit la Seine sur un viaduc. Ses 22 stations évoquent notamment Picasso, Queneau, la Bastille et la victoire de Napoléon à Austerlitz.
- Reason: Edit band (0.66): same rewrite as EN; « un métro au-dessus de la Seine » replaced by the viaduct fact.

## Review

Fact-preservation review of the 28 changed units above. Each added fact was checked against its source.

Fixed:

- `station/5/saint-marcel/context` (en, fr): "According to his Life, a medieval account" / « Selon sa Vie, un récit médiéval » is not supported by any listed source. The Centre André Chastel page and the Diocèse de Paris page do not name a Life (Vita) as the source of the dragon story, and the diocese page says Marcel is known "surtout par des légendes". The rewrite also removed the word "legend", so the text stated the dragon story as an event from a text. Changed to "According to a medieval legend, Marcel defeated a dragon …" / « Selon une légende médiévale, Marcel vainc un dragon … ». This restores the original hedge and qualifier, and keeps a named attribution form. The trumeau location and the nineteenth-century copy are confirmed by the Centre André Chastel page (copy by Geoffroy-Dechaume, 1847–1864) and are kept.
- `station/5/ourcq` sources: the change notes said the station article was "listed as the entry's first source". It was not listed; the only source was the Canal de l'Ourcq article. Added `Ourcq · Wikipédia` (Ourcq (métro de Paris)). That article confirms: opened 21 March 1947, extension to Église de Pantin on 12 October 1942, trains passed through without stopping until the station was complete.
- `station/5/oberkampf` sources: same problem. The only source was the Musée de la Toile de Jouy. Added `Oberkampf · Wikipédia` (Oberkampf (métro de Paris)). That article confirms: Line 5 station opened 15 January 1907, Line 9 station opened 10 December 1933, platforms "semi-alignée et parallèle sous le boulevard Voltaire", Line 5 platforms 75 m, Line 9 platforms 105 m.

Checked with no change needed: all other units keep the same facts, dates, names and qualifiers, and en/fr state the same facts. The new French has no ; : ! ? or « » that needs special spaces.

Remaining concerns:

- `station/9/oberkampf` etymology now differs from `station/5/oberkampf` etymology (the 1760 and 1783 facts moved into the Line 5 etymology only). The Line 9 context still holds the 1760/1783 sentences and the evaluative textile-pattern sentence. The Line 9 owner must decide whether to align.
- `station/5/ourcq/context/fr` mixes the historical present (« n'ouvre ») with the imperfect (« traversaient »). It is acceptable French, but a strict present-tense house style would use « traversent ».

## Fact check 2026-10-05

- republique: added "Place de la République · Wikipédia" (https://fr.wikipedia.org/wiki/Place_de_la_R%C3%A9publique_(Paris)), so Line 5 cites the same sources as Line 9 for the shared etymology: « porte depuis 1879 son nom actuel qui lui est donné dans le cadre du projet d'érection d'une statue de la République ». Copy not changed.

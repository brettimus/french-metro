# Line 9 copy changes

File: `apps/web/src/data/line9.ts`. Evaluator: jev-1.13.0, question set 2026-10-05.6.

Before run: `apps/web/scripts/copy/out/line9-before/`. After runs: `apps/web/scripts/copy/out/line9-after/` (stations) and `line9-after-line/` (line copy).

Shared stations: the etymologies of franklin-d-roosevelt (Line 1), nation (Line 1), republique (Line 5), oberkampf (Line 5), trocadero (Line 6), chaussee-dantin-la-fayette (Line 7) and strasbourg-saint-denis (Line 4) are not changed. Their remaining FAILs (sentence length, FR spaces) belong to the owning line.

Typography applied to every changed FR unit: U+202F before « ; », U+00A0 before « : ». Year ranges use an en dash in both locales.

## station/9/marcel-sembat/etymology/en

Score: 0.72 → 0.98

- Before: Named for Place Marcel-Sembat, honouring Marcel Sembat (1862-1922), a journalist and socialist deputy for Paris’s 18th arrondissement from 1893 until his death, who also served as minister of public works from 1914 to 1916.
- After: Named for Place Marcel-Sembat, which honours the journalist Marcel Sembat (1862–1922). A socialist deputy for Paris’s 18th arrondissement from 1893 until his death, he was minister of public works from 1914 to 1916.
- Reason: Split a 34/37-word sentence. Removed “served as” (T8). Year ranges use an en dash.

## station/9/marcel-sembat/etymology/fr

Score: 0.79 → 0.99

- Before: La station doit son nom à la place Marcel-Sembat, en hommage à Marcel Sembat (1862-1922), journaliste et député socialiste du 18e arrondissement de Paris de 1893 jusqu’à sa mort, ministre des Travaux publics de 1914 à 1916.
- After: La station doit son nom à la place Marcel-Sembat, qui honore le journaliste Marcel Sembat (1862–1922). Député socialiste du 18e arrondissement de Paris de 1893 à sa mort, il est ministre des Travaux publics de 1914 à 1916.
- Reason: Split a 34/37-word sentence. Removed “served as” (T8). Year ranges use an en dash.

## station/9/marcel-sembat/context/en

Score: 0.89 → 0.88

- Before: Sembat led the newspaper La Petite République from 1892 to 1897. The station opened on 3 February 1934, alongside Pont de Sèvres and Billancourt, as one of the line’s first three stops in the suburbs.
- After: Sembat led the newspaper La Petite République from 1892 to 1897. The station opened on 3 February 1934 with Pont de Sèvres and Billancourt, the line’s first three stops in the suburbs.
- Reason: FR sentence of 26 words shortened; EN aligned. No fact change.

## station/9/marcel-sembat/context/fr

Score: 0.85 → 0.90

- Before: Sembat dirige le journal La Petite République de 1892 à 1897. La station ouvre le 3 février 1934, en même temps que Pont de Sèvres et Billancourt, parmi les trois premiers arrêts de la ligne en banlieue.
- After: Sembat dirige le journal La Petite République de 1892 à 1897. La station ouvre le 3 février 1934 avec Pont de Sèvres et Billancourt, les trois premiers arrêts de la ligne en banlieue.
- Reason: FR sentence of 26 words shortened; EN aligned. No fact change.

## station/9/porte-de-saint-cloud/context/en

Score: 0.88 → 0.98

- Before: Its Parc des Princes subtitle names the nearby stadium. The station opened in September 1923 with the one-stop extension from Exelmans, and served as the line’s western terminus until the 1934 extension reached Pont de Sèvres.
- After: The station’s Parc des Princes subtitle names the nearby stadium. It opened in September 1923 with the one-stop extension from Exelmans. It was the line’s western terminus until the 1934 extension to Pont de Sèvres.
- Reason: Note opened with a possessive pronoun (Its/Son) with no antecedent (S5). Split a 29-word sentence.

## station/9/porte-de-saint-cloud/context/fr

Score: 0.87 → 0.98

- Before: Son sous-titre Parc des Princes désigne le stade voisin. La station ouvre en septembre 1923 avec le prolongement d’une station depuis Exelmans, et reste le terminus ouest de la ligne jusqu’au prolongement de 1934 vers Pont de Sèvres.
- After: Le sous-titre de la station, Parc des Princes, désigne le stade voisin. Elle ouvre en septembre 1923 avec le prolongement d’une station depuis Exelmans. Elle reste le terminus ouest de la ligne jusqu’au prolongement de 1934 vers Pont de Sèvres.
- Reason: Note opened with a possessive pronoun (Its/Son) with no antecedent (S5). Split a 29-word sentence.

## station/9/exelmans/etymology/en

Score: 0.66 → 0.96

- Before: Named for Boulevard Exelmans, honouring cavalry general Rémy Joseph Isidore Exelmans (1775-1852), remembered as a hero of the Empire’s last battle, who later became a Marshal of France.
- After: Named for Boulevard Exelmans, which honours the cavalry general Rémy Joseph Isidore Exelmans (1775–1852). He fought in the last battle of the Empire and later became a Marshal of France.
- Reason: Removed vague attribution “remembered as” / « considéré comme » (T7) and the inflated word “hero” (T2/T4). Kept the claim that he took part in the last battle of the Empire, which the source states (« héros de la dernière bataille de l’Empire »). Split long sentence. Year ranges use an en dash.

## station/9/exelmans/etymology/fr

Score: 0.61 → 0.96

- Before: La station doit son nom au boulevard Exelmans, dédié au général de cavalerie Rémy Joseph Isidore Exelmans (1775-1852), considéré comme un héros de la dernière bataille de l’Empire, plus tard maréchal de France.
- After: La station doit son nom au boulevard Exelmans, qui honore le général de cavalerie Rémy Joseph Isidore Exelmans (1775–1852). Il combat lors de la dernière bataille de l’Empire et devient plus tard maréchal de France.
- Reason: Removed vague attribution “remembered as” / « considéré comme » (T7) and the inflated word “hero” (T2/T4). Kept the claim that he took part in the last battle of the Empire, which the source states (« héros de la dernière bataille de l’Empire »). Split long sentence. Year ranges use an en dash.

## station/9/exelmans/context/en

Score: 0.86 → 0.97

- Before: Opened on 8 November 1922 as the south-western terminus of the line’s first section, Exelmans once had a street-level link to the Petite Ceinture’s Point-du-Jour station, which closed to passengers on 23 July 1934.
- After: Exelmans was the south-western terminus of the line’s first section, which opened on 8 November 1922. A street-level link connected it to Point-du-Jour station on the Petite Ceinture, which closed to passengers on 23 July 1934.
- Reason: Split a 36-word sentence; varied the « Ouverte le » opener (T20). No fact change.

## station/9/exelmans/context/fr

Score: 0.74 → 0.97

- Before: Ouverte le 8 novembre 1922 comme terminus sud-ouest du premier tronçon de la ligne, Exelmans disposait autrefois d’une liaison en surface avec la station Point-du-Jour de la Petite Ceinture, fermée aux voyageurs le 23 juillet 1934.
- After: Exelmans est le terminus sud-ouest du premier tronçon de la ligne, ouvert le 8 novembre 1922. Une correspondance par la voie publique la reliait à la station Point-du-Jour de la Petite Ceinture, fermée aux voyageurs le 23 juillet 1934.
- Reason: Split a 36-word sentence; varied the « Ouverte le » opener (T20). No fact change.

## station/9/michel-ange-molitor/etymology/en

Score: 0.92 → 0.97

- Before: Named for two streets: Rue Michel-Ange honours the Italian Renaissance artist Michelangelo (1475-1564), while Rue Molitor honours Gabriel-Jean-Joseph Molitor (1770-1849), a Marshal of France.
- After: Named for Rue Michel-Ange and Rue Molitor. The first honours the Italian Renaissance artist Michelangelo (1475–1564), the second Gabriel-Jean-Joseph Molitor (1770–1849), a Marshal of France.
- Reason: Split long FR sentence. Did not reuse « La station doit son nom à deux rues. » (T21 duplicate on Line 7/9). Year ranges use an en dash. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/michel-ange-molitor/etymology/fr

Score: 0.81 → 0.99

- Before: La station doit son nom à deux rues : la rue Michel-Ange honore l’artiste italien de la Renaissance Michel-Ange (1475-1564), tandis que la rue Molitor honore Gabriel-Jean-Joseph Molitor (1770-1849), maréchal de France.
- After: La station doit son nom à la rue Michel-Ange et à la rue Molitor. La première honore l’artiste italien de la Renaissance Michel-Ange (1475–1564), la seconde Gabriel-Jean-Joseph Molitor (1770–1849), maréchal de France.
- Reason: Split long FR sentence. Did not reuse « La station doit son nom à deux rues. » (T21 duplicate on Line 7/9). Year ranges use an en dash. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/michel-ange-molitor/context/en

Score: 0.89 → 0.97

- Before: Its Line 9 platform opened on 8 November 1922. The station had first opened on 30 September 1913 on Line 8, whose platform here later transferred to Line 10 in July 1937.
- After: Michel-Ange – Molitor first opened on 30 September 1913 on Line 8, whose platform here passed to Line 10 in July 1937. The Line 9 platform opened on 8 November 1922.
- Reason: Note opened with a possessive pronoun (S5). Reordered chronologically. No fact change.

## station/9/michel-ange-molitor/context/fr

Score: 0.89 → 0.96

- Before: Son quai de la ligne 9 ouvre le 8 novembre 1922. La station avait ouvert une première fois le 30 septembre 1913 sur la ligne 8, dont le quai a ensuite été transféré à la ligne 10 en juillet 1937.
- After: Michel-Ange – Molitor ouvre d’abord le 30 septembre 1913 sur la ligne 8, dont le quai passe à la ligne 10 en juillet 1937. Le quai de la ligne 9 ouvre le 8 novembre 1922.
- Reason: Note opened with a possessive pronoun (S5). Reordered chronologically. No fact change.

## station/9/michel-ange-auteuil/etymology/en

Score: 0.87 → 0.94

- Before: Named for two streets: Rue Michel-Ange, as at the neighbouring station, honours the Italian artist Michelangelo, while Rue d’Auteuil was the historic main road of the former village of Auteuil.
- After: Named for Rue Michel-Ange and Rue d’Auteuil. As at the neighbouring station, Rue Michel-Ange honours the Italian artist Michelangelo. Rue d’Auteuil was the historic main road of the former village of Auteuil.
- Reason: Split 30/32-word sentences. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/michel-ange-auteuil/etymology/fr

Score: 0.83 → 0.94

- Before: La station doit son nom à deux rues : la rue Michel-Ange, comme à la station voisine, honore l’artiste italien Michel-Ange, tandis que la rue d’Auteuil était l’ancienne voie principale du village d’Auteuil.
- After: La station doit son nom à la rue Michel-Ange et à la rue d’Auteuil. Comme à la station voisine, la rue Michel-Ange honore l’artiste italien Michel-Ange. La rue d’Auteuil était l’ancienne voie principale du village d’Auteuil.
- Reason: Split 30/32-word sentences. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/michel-ange-auteuil/context/en

Score: 0.87 → 0.95

- Before: Its Line 9 platform opened on 8 November 1922 with the line’s first section, between the provisional termini of Trocadéro and Exelmans; a separate Line 8 platform at this crossing had opened in 1913.
- After: A Line 8 platform opened at this crossing in 1913. The Line 9 platform followed on 8 November 1922, when the line’s first section opened between the provisional termini of Trocadéro and Exelmans.
- Reason: Note opened with a possessive pronoun (S5); 38-word FR sentence split. No fact change.

## station/9/michel-ange-auteuil/context/fr

Score: 0.78 → 0.91

- Before: Son quai de la ligne 9 ouvre le 8 novembre 1922 avec le premier tronçon de la ligne, entre les terminus provisoires de Trocadéro et Exelmans ; un quai distinct de la ligne 8 y avait ouvert en 1913.
- After: Un quai de la ligne 8 ouvre à ce croisement en 1913. Le quai de la ligne 9 suit le 8 novembre 1922, avec le premier tronçon de la ligne, entre les terminus provisoires de Trocadéro et Exelmans.
- Reason: Note opened with a possessive pronoun (S5); 38-word FR sentence split. No fact change.

## station/9/jasmin/etymology/en

Score: 0.72 → 0.97

- Before: Named for Rue Jasmin, honouring Jacques Boé (1798-1864), who wrote under the pen name Jasmin and ranks among the leading Occitan-language poets of the early nineteenth century.
- After: Named for Rue Jasmin, which honours Jacques Boé (1798–1864), an Occitan-language poet of the early nineteenth century who wrote under the pen name Jasmin.
- Reason: Removed “ranks among the leading” / « principaux » (T14 grandiosity, T2; Jev flagged S4 on the separate sentence). The source says « un des principaux auteurs occitans »; this evaluative qualifier is the only removed content. Year ranges use an en dash.

## station/9/jasmin/etymology/fr

Score: 0.77 → 0.92

- Before: La station doit son nom à la rue Jasmin, dédiée à Jacques Boé (1798-1864), qui écrivit sous le nom de Jasmin et compte parmi les principaux poètes de langue occitane du début du XIXe siècle.
- After: La station doit son nom à la rue Jasmin, qui honore Jacques Boé (1798–1864), poète de langue occitane du début du XIXe siècle, qui écrivait sous le nom de Jasmin.
- Reason: Removed “ranks among the leading” / « principaux » (T14 grandiosity, T2; Jev flagged S4 on the separate sentence). The source says « un des principaux auteurs occitans »; this evaluative qualifier is the only removed content. Year ranges use an en dash.

## station/9/jasmin/context/en

Score: 0.49 → 0.95

- Before: Opened on 8 November 1922 with the line’s first section, the station saw RATP temporarily decorate half its platform name plaques with white jasmine flowers on 20 March 2018, to mark the start of spring, as it did at five other stations.
- After: Jasmin opened on 8 November 1922 with the line’s first section. Its ticket hall is a mezzanine above the tracks, a layout shared only with Ranelagh and La Muette. On 20 March 2018, RATP temporarily decorated half its name plaques with white jasmine to mark spring, as at five other stations.
- Reason: Rewrite. 42/46-word sentence split; removed calque « la station a vu la RATP décorer » (T19); S7 was level 2 (generic temporary decoration). Added a station-specific fact: the ticket hall is a mezzanine above the tracks, a layout shared only with Ranelagh and La Muette. Source: https://fr.wikipedia.org/wiki/Jasmin_(m%C3%A9tro_de_Paris) (section Accès: « La salle de distribution des titres de transport est établie sous la forme d’une mezzanine surplombant les voies … qu’avec les deux stations suivantes … Ranelagh et La Muette »).

## station/9/jasmin/context/fr

Score: 0.43 → 0.87

- Before: Ouverte le 8 novembre 1922 avec le premier tronçon de la ligne, la station a vu la RATP décorer temporairement la moitié de ses plaques de nom avec des fleurs de jasmin blanc le 20 mars 2018, pour marquer le printemps, comme dans cinq autres stations.
- After: Jasmin ouvre le 8 novembre 1922 avec le premier tronçon. Sa salle des billets forme une mezzanine au-dessus des voies, comme seulement à Ranelagh et La Muette. Le 20 mars 2018, la RATP orne provisoirement la moitié de ses plaques de nom de jasmin blanc pour le printemps, comme dans cinq autres stations.
- Reason: Rewrite. 42/46-word sentence split; removed calque « la station a vu la RATP décorer » (T19); S7 was level 2 (generic temporary decoration). Added a station-specific fact: the ticket hall is a mezzanine above the tracks, a layout shared only with Ranelagh and La Muette. Source: https://fr.wikipedia.org/wiki/Jasmin_(m%C3%A9tro_de_Paris) (section Accès: « La salle de distribution des titres de transport est établie sous la forme d’une mezzanine surplombant les voies … qu’avec les deux stations suivantes … Ranelagh et La Muette »).

## station/9/ranelagh/etymology/en

Score: 0.87 → 0.98

- Before: Named for Rue du Ranelagh, which opens onto the Jardin du Ranelagh; the garden takes its name from Richard Jones, Lord Ranelagh (1641-1712), an Irish politician and diplomat.
- After: Named for Rue du Ranelagh, which opens onto the Jardin du Ranelagh. The garden takes its name from Richard Jones, Lord Ranelagh (1641–1712), an Irish politician and diplomat.
- Reason: Split semicolon sentence. Year ranges use an en dash. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/ranelagh/etymology/fr

Score: 0.81 → 0.98

- Before: La station doit son nom à la rue du Ranelagh, qui donne sur le jardin du Ranelagh ; celui-ci tire son nom de Richard Jones, lord Ranelagh (1641-1712), homme politique et diplomate irlandais.
- After: La station doit son nom à la rue du Ranelagh, qui donne sur le jardin du Ranelagh. Celui-ci tient son nom de Richard Jones, lord Ranelagh (1641–1712), homme politique et diplomate irlandais.
- Reason: Split semicolon sentence. Year ranges use an en dash. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/ranelagh/context/en

Score: 0.83 → 0.94

- Before: Ranelagh opened on 8 November 1922 with the line’s first section, running between the provisional termini of Trocadéro and Exelmans on the western edge of Paris.
- After: Ranelagh opened on 8 November 1922 with the line’s first section. That section ran between the provisional termini of Trocadéro and Exelmans, on the western edge of Paris.
- Reason: Removed “-ing” tail clause (T3). FR unchanged (already ship). No fact change.

## station/9/la-muette/etymology/en

Score: 0.83 → 0.94

- Before: Named for Chaussée de la Muette, a street in the district of La Muette, itself named for the nearby Château de la Muette.
- After: Named for Chaussée de la Muette, a street in the La Muette district. The district takes its name from the nearby Château de la Muette.
- Reason: Removed calque « nommé d’après » (T19, S6 level 2). No fact change.

## station/9/la-muette/etymology/fr

Score: 0.73 → 0.96

- Before: La station doit son nom à la chaussée de la Muette, dans le quartier de la Muette, lui-même nommé d’après le château de la Muette voisin.
- After: La station doit son nom à la chaussée de la Muette, dans le quartier de la Muette. Ce quartier tient son nom du château de la Muette voisin.
- Reason: Removed calque « nommé d’après » (T19, S6 level 2). No fact change.

## station/9/la-muette/context/en

Score: 0.75 → 0.93

- Before: Opened on 8 November 1922 with the line’s first section, the station was the scene of an arrest on 9 June 1943, when Gestapo agents detained resistance leader Charles Delestraint here; a plaque at the main exit commemorates him.
- After: On 9 June 1943, Gestapo agents arrested the resistance leader Charles Delestraint at this station. A plaque at the main exit commemorates him. The station had opened on 8 November 1922 with the line’s first section.
- Reason: Split a 39/42-word sentence; varied opener (T20). Removed « est le théâtre de » (S3). FR: U+202F before « ; », U+00A0 before « : ».

## station/9/la-muette/context/fr

Score: 0.63 → 0.87

- Before: Ouverte le 8 novembre 1922 avec le premier tronçon de la ligne, la station est le théâtre d’une arrestation le 9 juin 1943, lorsque la Gestapo y interpelle le chef résistant Charles Delestraint ; une plaque à la sortie principale lui rend hommage.
- After: Le 9 juin 1943, la Gestapo arrête le chef résistant Charles Delestraint dans cette station. Une plaque à la sortie principale lui rend hommage. La station avait ouvert le 8 novembre 1922 avec le premier tronçon de la ligne.
- Reason: Split a 39/42-word sentence; varied opener (T20). Removed « est le théâtre de » (S3). FR: U+202F before « ; », U+00A0 before « : ».

## station/9/rue-de-la-pompe/etymology/en

Score: 0.83 → 0.97

- Before: Named for Rue de la Pompe, which took its name from the pump that once supplied water to the Château de la Muette; the street itself began as the Vieux-Chemin, recorded in documents from 1730 running along the château’s walls.
- After: Named for Rue de la Pompe, which takes its name from the pump that once supplied water to the Château de la Muette. The street began as the Vieux-Chemin, recorded in documents from 1730 along the château’s walls.
- Reason: Split a 40/42-word sentence. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/rue-de-la-pompe/etymology/fr

Score: 0.78 → 0.90

- Before: La station doit son nom à la rue de la Pompe, qui tire son nom de la pompe alimentant autrefois en eau le château de la Muette ; la rue elle-même s’appelait le Vieux-Chemin, mentionnée dès 1730 le long des murs du château.
- After: La station doit son nom à la rue de la Pompe, qui tire son nom de la pompe alimentant autrefois en eau le château de la Muette. La rue s’appelait d’abord le Vieux-Chemin, mentionné dès 1730 le long des murs du château.
- Reason: Split a 40/42-word sentence. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/rue-de-la-pompe/context/en

Score: 0.74 → 0.91

- Before: Opened on 8 November 1922, the station was the site of a second wartime arrest on 9 June 1943: resistant Joseph Gastaldo and his deputy Jean-Louis Théobald, awaiting a rendezvous with Charles Delestraint, were detained here by the Gestapo, held at Fresnes and deported the following year.
- After: Rue de la Pompe opened on 8 November 1922. On 9 June 1943, the Gestapo arrested the resistance member Joseph Gastaldo and his deputy Jean-Louis Théobald here. They were waiting to meet Charles Delestraint. Both were held at Fresnes and deported the following year.
- Reason: Split a 45/47-word sentence; varied opener. Removed “second” (it referred to the arrest in the La Muette note, which this field cannot see). FR: U+202F before « ; », U+00A0 before « : ».

## station/9/rue-de-la-pompe/context/fr

Score: 0.68 → 0.89

- Before: Ouverte le 8 novembre 1922, la station est le lieu d’une seconde arrestation le 9 juin 1943 : le résistant Joseph Gastaldo et son adjoint Jean-Louis Théobald, qui devaient y retrouver Charles Delestraint, y sont arrêtés par la Gestapo, détenus à Fresnes puis déportés l’année suivante.
- After: Rue de la Pompe ouvre le 8 novembre 1922. Le 9 juin 1943, la Gestapo y arrête le résistant Joseph Gastaldo et son adjoint Jean-Louis Théobald, qui devaient y retrouver Charles Delestraint. Tous deux sont détenus à Fresnes puis déportés l’année suivante.
- Reason: Split a 45/47-word sentence; varied opener. Removed “second” (it referred to the arrest in the La Muette note, which this field cannot see). FR: U+202F before « ; », U+00A0 before « : ».

## station/9/trocadero/context/en

Score: 0.85 → 0.95

- Before: The Line 9 platform opened on 8 November 1922 as the north-eastern terminus of the line’s first section; the station itself dates from 1900, on today’s Line 6. Before 1914 it received one of the network’s first escalators, in use until 1959.
- After: Trocadéro station dates from 1900, on today’s Line 6. The Line 9 platform opened on 8 November 1922 as the north-eastern terminus of the line’s first section. Before 1914 the station received one of the network’s first escalators, in use until 1959.
- Reason: Etymology not changed (owned by Line 6). Context: split 28/30-word sentence, varied opener. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/trocadero/context/fr

Score: 0.82 → 0.94

- Before: Le quai de la ligne 9 ouvre le 8 novembre 1922 comme terminus nord-est du premier tronçon de la ligne ; la station elle-même date de 1900, sur l’actuelle ligne 6. Avant 1914, elle reçoit l’un des premiers escaliers mécaniques du réseau, en service jusqu’en 1959.
- After: La station Trocadéro date de 1900, sur l’actuelle ligne 6. Le quai de la ligne 9 ouvre le 8 novembre 1922 comme terminus nord-est du premier tronçon de la ligne. Avant 1914, elle reçoit l’un des premiers escaliers mécaniques du réseau, en service jusqu’en 1959.
- Reason: Etymology not changed (owned by Line 6). Context: split 28/30-word sentence, varied opener. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/iena/context/en

Score: 0.87 → 0.91

- Before: Opened on 27 May 1923 with the extension from Trocadéro to Saint-Augustin, Iéna is one of four network stations with a four-letter name, alongside Rome, Cité and Haxo, a ghost station never opened to passengers.
- After: Iéna opened on 27 May 1923 with the extension from Trocadéro to Saint-Augustin. It is one of four network stations with a four-letter name, with Rome, Cité and Haxo, a ghost station never opened to passengers.
- Reason: Split a 35/37-word sentence. No fact change.

## station/9/iena/context/fr

Score: 0.79 → 0.90

- Before: Ouverte le 27 mai 1923 avec le prolongement de Trocadéro à Saint-Augustin, Iéna est l’une des quatre stations du réseau dont le nom compte quatre lettres, avec Rome, Cité et Haxo, station fantôme jamais ouverte aux voyageurs.
- After: Iéna ouvre le 27 mai 1923 avec le prolongement de Trocadéro à Saint-Augustin. C’est l’une des quatre stations du réseau dont le nom compte quatre lettres, avec Rome, Cité et Haxo, station fantôme jamais ouverte aux voyageurs.
- Reason: Split a 35/37-word sentence. No fact change.

## station/9/alma-marceau/etymology/en

Score: 0.83 → 0.97

- Before: Named for two references: Pont de l’Alma and Place de l’Alma commemorate the 1854 Battle of the Alma, a Franco-British victory over Russian forces in Crimea, while Avenue Marceau honours General François Séverin Marceau-Desgraviers (1769-1796).
- After: Named for Pont de l’Alma, Place de l’Alma and Avenue Marceau. The bridge and square commemorate the 1854 Battle of the Alma, a Franco-British victory over Russian forces in Crimea. Avenue Marceau honours General François Séverin Marceau-Desgraviers (1769–1796).
- Reason: Split a 35/43-word sentence; each name explained in order. Year ranges use an en dash. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/alma-marceau/etymology/fr

Score: 0.73 → 0.98

- Before: La station doit son nom à deux références : le pont de l’Alma et la place de l’Alma commémorent la bataille de l’Alma de 1854, victoire franco-britannique sur les forces russes en Crimée, tandis que l’avenue Marceau honore le général François Séverin Marceau-Desgraviers (1769-1796).
- After: La station doit son nom au pont et à la place de l’Alma et à l’avenue Marceau. Ils commémorent la bataille de l’Alma de 1854, victoire franco-britannique sur les forces russes en Crimée. L’avenue Marceau honore le général François Séverin Marceau-Desgraviers (1769–1796).
- Reason: Split a 35/43-word sentence; each name explained in order. Year ranges use an en dash. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/alma-marceau/context/en

Score: 0.84 → 0.99

- Before: Opened on 27 May 1923, the station lies where, during construction under Place de l’Alma on 8 November 1915, side walls closed in and the tunnel vault collapsed, opening a large hole in the square; the tunnel was later rebuilt with a reinforced profile.
- After: On 8 November 1915, during construction under Place de l’Alma, the side walls closed in and the tunnel vault collapsed. The collapse opened a large hole in the square. The tunnel was later rebuilt with a reinforced profile, and the station opened on 27 May 1923.
- Reason: Split a 44/50-word sentence. No fact change. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/alma-marceau/context/fr

Score: 0.78 → 0.98

- Before: Ouverte le 27 mai 1923, la station se trouve à l’endroit où, pendant les travaux sous la place de l’Alma, les parois se referment et la voûte du tunnel s’effondre le 8 novembre 1915, ouvrant un large trou dans la place ; le tunnel est ensuite reconstruit avec un profil renforcé.
- After: Le 8 novembre 1915, pendant les travaux sous la place de l’Alma, les parois se referment et la voûte du tunnel s’effondre. L’effondrement ouvre un large trou dans la place. Le tunnel est ensuite reconstruit avec un profil renforcé, et la station ouvre le 27 mai 1923.
- Reason: Split a 44/50-word sentence. No fact change. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/franklin-d-roosevelt/context/en

Score: 0.87 → 0.96

- Before: The Line 9 platform opened on 27 May 1923 as Rond-Point des Champs-Élysées; a connecting corridor joined it to the neighbouring Line 1 platform in 1942. In the 1950s its platforms were decorated with gemmail, a modernised stained-glass technique, inaugurated in 1957.
- After: The Line 9 platform opened on 27 May 1923 as Rond-Point des Champs-Élysées. A connecting corridor joined it to the neighbouring Line 1 platform in 1942. In the 1950s the platforms were decorated with gemmail, a modernised stained-glass technique, inaugurated in 1957.
- Reason: Etymology not changed (owned by Line 1). Context: split sentences. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/franklin-d-roosevelt/context/fr

Score: 0.81 → 0.95

- Before: Le quai de la ligne 9 ouvre le 27 mai 1923 sous le nom Rond-Point des Champs-Élysées ; un couloir de correspondance le relie au quai voisin de la ligne 1 en 1942. Dans les années 1950, ses quais sont décorés de gemmail, technique de vitrail modernisée, inaugurée en 1957.
- After: Le quai de la ligne 9 ouvre le 27 mai 1923 sous le nom de Rond-Point des Champs-Élysées. Un couloir le relie au quai voisin de la ligne 1 en 1942. Dans les années 1950, les quais sont décorés de gemmail, technique de vitrail modernisée, inaugurée en 1957.
- Reason: Etymology not changed (owned by Line 1). Context: split sentences. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/saint-philippe-du-roule/etymology/en

Score: 0.90 → 0.97

- Before: Named for the nearby Église Saint-Philippe-du-Roule, dedicated to the apostle Philip; Roule comes from a small locality attested under earlier names before becoming a Paris faubourg in 1722.
- After: Named for the nearby Église Saint-Philippe-du-Roule, dedicated to the apostle Philip. Roule comes from a small locality, known under earlier names, that became a Paris faubourg in 1722.
- Reason: Split semicolon sentence. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/saint-philippe-du-roule/etymology/fr

Score: 0.86 → 0.96

- Before: La station doit son nom à l’église Saint-Philippe-du-Roule voisine, dédiée à l’apôtre Philippe ; Roule vient d’une petite localité connue sous des noms plus anciens avant de devenir un faubourg parisien en 1722.
- After: La station doit son nom à l’église Saint-Philippe-du-Roule voisine, dédiée à l’apôtre Philippe. Roule vient d’une petite localité connue sous des noms plus anciens, devenue faubourg de Paris en 1722.
- Reason: Split semicolon sentence. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/saint-philippe-du-roule/context/en

Score: 0.80 → 0.88

- Before: Opened on 27 May 1923 with the extension from Trocadéro to Saint-Augustin, the station was among roughly a third of network stations refitted between 1974 and 1984 in the orange-toned Andreu-Motte style.
- After: Saint-Philippe du Roule opened on 27 May 1923 with the extension from Trocadéro to Saint-Augustin. Between 1974 and 1984 its platforms were refitted in the orange Andreu-Motte style, like about a third of network stations. It is one of the few stations that keep this style in full.
- Reason: S7 was 0.58–0.65 (generic restyling). Added station-specific fact: one of the few stations that still keep the Andreu-Motte style in full. Source: https://fr.wikipedia.org/wiki/Saint-Philippe_du_Roule_(m%C3%A9tro_de_Paris) (« Il s’agit d’une des rares stations à présenter encore le style “Andreu-Motte” dans son intégralité »). Split sentence.

## station/9/saint-philippe-du-roule/context/fr

Score: 0.77 → 0.89

- Before: Ouverte le 27 mai 1923 avec le prolongement de Trocadéro à Saint-Augustin, la station compte parmi le tiers environ des stations du réseau refaites entre 1974 et 1984 dans le style Andreu-Motte aux tons orangés.
- After: Saint-Philippe du Roule ouvre le 27 mai 1923 avec le prolongement de Trocadéro à Saint-Augustin. Entre 1974 et 1984, ses quais sont refaits dans le style Andreu-Motte orange, comme environ un tiers des stations du réseau. C’est l’une des rares stations à garder ce style en entier.
- Reason: S7 was 0.58–0.65 (generic restyling). Added station-specific fact: one of the few stations that still keep the Andreu-Motte style in full. Source: https://fr.wikipedia.org/wiki/Saint-Philippe_du_Roule_(m%C3%A9tro_de_Paris) (« Il s’agit d’une des rares stations à présenter encore le style “Andreu-Motte” dans son intégralité »). Split sentence.

## station/9/miromesnil/etymology/en

Score: 0.86 → 0.98

- Before: Named for Rue de Miromesnil, honouring magistrate Armand Thomas Hue de Miromesnil (1723-1796), Keeper of the Seals from 1774 to 1787, who had the question préparatoire, a judicial torture used to force confessions, abolished.
- After: Named for Rue de Miromesnil, which honours the magistrate Armand Thomas Hue de Miromesnil (1723–1796). As Keeper of the Seals from 1774 to 1787, he had the question préparatoire abolished, a judicial torture used to force confessions.
- Reason: Split a 34/40-word sentence. Year ranges use an en dash.

## station/9/miromesnil/etymology/fr

Score: 0.79 → 0.98

- Before: La station doit son nom à la rue de Miromesnil, dédiée au magistrat Armand Thomas Hue de Miromesnil (1723-1796), garde des Sceaux de 1774 à 1787, qui fit abolir la question préparatoire, une torture judiciaire destinée à arracher des aveux.
- After: La station doit son nom à la rue de Miromesnil, qui honore le magistrat Armand Thomas Hue de Miromesnil (1723–1796). Garde des Sceaux de 1774 à 1787, il fait abolir la question préparatoire, une torture judiciaire destinée à arracher des aveux.
- Reason: Split a 34/40-word sentence. Year ranges use an en dash.

## station/9/saint-augustin/etymology/en

Score: 0.79 → 0.98

- Before: Named for Place Saint-Augustin, itself named for the adjoining Église Saint-Augustin, dedicated to Augustine of Hippo (354-430); the square and church give their name to the surrounding district in the 8th arrondissement.
- After: Named for Place Saint-Augustin, which takes its name from the adjoining Église Saint-Augustin, dedicated to Augustine of Hippo (354–430). The square and church give their name to the surrounding district in the 8th arrondissement.
- Reason: Removed calque « nommée d’après » (T19). Split long sentence. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/saint-augustin/etymology/fr

Score: 0.69 → 0.99

- Before: La station doit son nom à la place Saint-Augustin, elle-même nommée d’après l’église Saint-Augustin voisine, dédiée à Augustin d’Hippone (354-430) ; la place et l’église donnent leur nom au quartier environnant, dans le 8e arrondissement.
- After: La station doit son nom à la place Saint-Augustin, qui tient son nom de l’église Saint-Augustin voisine, dédiée à Augustin d’Hippone (354–430). La place et l’église donnent leur nom au quartier environnant, dans le 8e arrondissement.
- Reason: Removed calque « nommée d’après » (T19). Split long sentence. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/havre-caumartin/etymology/en

Score: 0.76 → 0.97

- Before: Named for two streets: Rue de Caumartin honours Antoine-Louis Lefebvre de Caumartin, marquis de Saint-Ange (1725-1803), a prévôt des marchands of Paris; Rue du Havre, added to the name in 1926, honours the Normandy port city.
- After: Named for Rue de Caumartin and Rue du Havre. Rue de Caumartin honours Antoine-Louis Lefebvre de Caumartin, marquis de Saint-Ange (1725–1803), a prévôt des marchands of Paris. Rue du Havre, added to the name in 1926, honours the Normandy port.
- Reason: Split a 36/40-word sentence; each name explained in order. “port city” shortened to “port” for the word limit. Year ranges use an en dash. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/havre-caumartin/etymology/fr

Score: 0.72 → 0.98

- Before: La station doit son nom à deux rues : la rue de Caumartin honore Antoine-Louis Lefebvre de Caumartin, marquis de Saint-Ange (1725-1803), prévôt des marchands de Paris ; la rue du Havre, ajoutée au nom en 1926, honore la ville portuaire normande.
- After: La station doit son nom à la rue de Caumartin et à la rue du Havre. La première honore Antoine-Louis Lefebvre de Caumartin, marquis de Saint-Ange (1725–1803), prévôt des marchands de Paris. La rue du Havre, ajoutée au nom en 1926, honore le port normand.
- Reason: Split a 36/40-word sentence; each name explained in order. “port city” shortened to “port” for the word limit. Year ranges use an en dash. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/havre-caumartin/context/en

Score: 0.79 → 0.98

- Before: The Line 9 platform opened on 3 June 1923 under the single name Caumartin, three years before Havre joined the name; a Line 3 platform here had already opened in 1904, and a link to the new Auber station followed on 23 November 1971.
- After: A Line 3 platform opened here in 1904. The Line 9 platform followed on 3 June 1923, under the single name Caumartin. A link to the new Auber station opened on 23 November 1971.
- Reason: Split a 44/47-word sentence. Removed “three years before Havre joined the name” (duplicates the 1926 date in the etymology, R7). FR: U+202F before « ; », U+00A0 before « : ».

## station/9/havre-caumartin/context/fr

Score: 0.74 → 0.97

- Before: Le quai de la ligne 9 ouvre le 3 juin 1923 sous le seul nom de Caumartin, trois ans avant l’ajout de Havre ; un quai de la ligne 3 y existait déjà depuis 1904, et une liaison vers la nouvelle station Auber s’ouvre le 23 novembre 1971.
- After: Un quai de la ligne 3 ouvre ici en 1904. Le quai de la ligne 9 suit le 3 juin 1923, sous le seul nom de Caumartin. Une liaison vers la nouvelle station Auber ouvre le 23 novembre 1971.
- Reason: Split a 44/47-word sentence. Removed “three years before Havre joined the name” (duplicates the 1926 date in the etymology, R7). FR: U+202F before « ; », U+00A0 before « : ».

## station/9/richelieu-drouot/etymology/en

Score: 0.93 → 0.97

- Before: Named for two streets: Rue de Richelieu honours Cardinal Armand Jean du Plessis de Richelieu (1585-1642); Rue Drouot honours artillery general Antoine Drouot (1774-1847).
- After: Named for Rue de Richelieu and Rue Drouot. The first honours Cardinal Armand Jean du Plessis de Richelieu (1585–1642), the second the artillery general Antoine Drouot (1774–1847).
- Reason: Split FR sentence; did not reuse the duplicated « deux rues » sentence. Year ranges use an en dash. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/richelieu-drouot/etymology/fr

Score: 0.82 → 0.99

- Before: La station doit son nom à deux rues : la rue de Richelieu honore le cardinal Armand Jean du Plessis de Richelieu (1585-1642) ; la rue Drouot honore le général d’artillerie Antoine Drouot (1774-1847).
- After: La station doit son nom à la rue de Richelieu et à la rue Drouot. La première honore le cardinal Armand Jean du Plessis de Richelieu (1585–1642), la seconde le général d’artillerie Antoine Drouot (1774–1847).
- Reason: Split FR sentence; did not reuse the duplicated « deux rues » sentence. Year ranges use an en dash. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/richelieu-drouot/context/en

Score: 0.83 → 0.89

- Before: Opened on 30 June 1928 with simultaneous extensions of Lines 8 and 9, its Line 8 platform was the first on the network built with 105-metre platforms, a length then used on certain Line 8 sections and on new 1930s stations of Lines 1, 3, 7 and 9.
- After: Richelieu – Drouot opened on 30 June 1928 with simultaneous extensions of Lines 8 and 9. Its Line 8 platform was the first on the network built 105 metres long. That length was then used on some Line 8 sections and on new 1930s stations of Lines 1, 3, 7 and 9.
- Reason: Split a 48/55-word sentence; removed the dangling participle (“Opened…, its Line 8 platform…”). FR “new 1930s stations” rendered as « des stations … des années 1930 » for the 55-word limit.

## station/9/richelieu-drouot/context/fr

Score: 0.83 → 0.90

- Before: Ouverte le 30 juin 1928 avec des prolongements simultanés des lignes 8 et 9, son quai de la ligne 8 est le premier du réseau construit avec des quais de 105 mètres, une longueur ensuite reprise sur certaines sections de la ligne 8 et sur de nouvelles stations des lignes 1, 3, 7 et 9.
- After: Richelieu – Drouot ouvre le 30 juin 1928 avec les prolongements simultanés des lignes 8 et 9. Son quai de la ligne 8 est le premier du réseau long de 105 mètres. Cette longueur est reprise sur des sections de la ligne 8 et des stations des lignes 1, 3, 7 et 9 des années 1930.
- Reason: Split a 48/55-word sentence; removed the dangling participle (“Opened…, its Line 8 platform…”). FR “new 1930s stations” rendered as « des stations … des années 1930 » for the 55-word limit.

## station/9/grands-boulevards/etymology/fr

Score: 0.85 → 0.93

- Before: La station porte, depuis l’été 1998, le nom des larges boulevards aménagés sur les anciennes fortifications de la rive droite ; elle s’appelait d’abord Montmartre, puis rue Montmartre.
- After: La station porte le nom des Grands Boulevards, larges voies aménagées sur les anciennes fortifications de la rive droite. Elle s’appelait d’abord Montmartre, puis rue Montmartre, jusqu’à l’été 1998.
- Reason: FR only: split semicolon sentence. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/grands-boulevards/context/en

Score: 0.86 → 0.93

- Before: It was renamed to stop travellers thinking it served the Butte Montmartre, several kilometres to the north. The Line 9 platform opened on 10 December 1933; a Line 8 platform here had opened earlier, on 5 May 1931.
- After: The station took its current name so that travellers would not expect it to serve the Butte Montmartre, several kilometres to the north. The Line 9 platform opened on 10 December 1933. A Line 8 platform had opened here earlier, on 5 May 1931.
- Reason: EN opened with “It” (no antecedent, S5). Removed « renommée pour » calque risk. Split a 26-word sentence. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/grands-boulevards/context/fr

Score: 0.79 → 0.90

- Before: Le changement de nom vise à éviter que les voyageurs ne croient qu’elle dessert la butte Montmartre, à plusieurs kilomètres au nord. Le quai de la ligne 9 ouvre le 10 décembre 1933 ; un quai de la ligne 8 y avait ouvert plus tôt, le 5 mai 1931.
- After: La station change de nom pour que les voyageurs ne pensent plus qu’elle dessert la butte Montmartre, à plusieurs kilomètres au nord. Le quai de la ligne 9 ouvre le 10 décembre 1933. Un quai de la ligne 8 y avait ouvert plus tôt, le 5 mai 1931.
- Reason: EN opened with “It” (no antecedent, S5). Removed « renommée pour » calque risk. Split a 26-word sentence. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/bonne-nouvelle/etymology/en

Score: 0.79 → 0.91

- Before: Named for the Bonne-Nouvelle district, itself named for the neighbouring Église Notre-Dame-de-Bonne-Nouvelle, whose name simply means good news in French.
- After: Named for the Bonne-Nouvelle district, which takes its name from the neighbouring Église Notre-Dame-de-Bonne-Nouvelle. Bonne nouvelle means “good news” in French.
- Reason: Removed calque « nommé d’après » (T19) and filler “simply” (S4). FR no longer glosses « bonne nouvelle » (French readers do not need it; R3 allows this). EN keeps the gloss with curly quotes.

## station/9/bonne-nouvelle/etymology/fr

Score: 0.74 → 0.90

- Before: La station doit son nom au quartier de la Bonne-Nouvelle, lui-même nommé d’après l’église Notre-Dame-de-Bonne-Nouvelle voisine, dont le nom signifie simplement bonne nouvelle.
- After: La station doit son nom au quartier de la Bonne-Nouvelle, qui tient son nom de l’église Notre-Dame-de-Bonne-Nouvelle voisine.
- Reason: Removed calque « nommé d’après » (T19) and filler “simply” (S4). FR no longer glosses « bonne nouvelle » (French readers do not need it; R3 allows this). EN keeps the gloss with curly quotes.

## station/9/bonne-nouvelle/context/en

Score: 0.88 → 0.93

- Before: The Line 9 platform opened on 10 December 1933; a Line 8 platform here had opened on 5 May 1931. During the Métro’s 2000 centenary renovation programme, the station received a partial cinema theme referencing the nearby Grand Rex.
- After: Bonne Nouvelle’s Line 8 platform opened on 5 May 1931, and its Line 9 platform on 10 December 1933. For the Métro’s centenary renovation programme in 2000, the station received a partial cinema theme referring to the nearby Grand Rex.
- Reason: Varied « Le quai de la ligne 9 » opener; split 28-word sentence. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/bonne-nouvelle/context/fr

Score: 0.77 → 0.88

- Before: Le quai de la ligne 9 ouvre le 10 décembre 1933 ; un quai de la ligne 8 y avait ouvert le 5 mai 1931. Lors du programme de rénovation du centenaire du métro en 2000, la station reçoit un décor partiel sur le thème du cinéma, en référence au Grand Rex voisin.
- After: À Bonne Nouvelle, le quai de la ligne 8 ouvre le 5 mai 1931, celui de la ligne 9 le 10 décembre 1933. Lors du programme de rénovation du centenaire du métro, en 2000, la station reçoit un décor partiel sur le thème du cinéma, en référence au Grand Rex voisin.
- Reason: Varied « Le quai de la ligne 9 » opener; split 28-word sentence. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/oberkampf/context/en

Score: 0.45 → 0.87

- Before: Oberkampf opened his workshop in 1760. In 1783 it received the title of royal manufacture. Its flower patterns and illustrated scenes became a distinctive part of French textile design.
- After: Oberkampf opened his own textile-printing workshop at Jouy-en-Josas in 1760. Letters patent made it a royal manufacture on 19 June 1783. By 1803 it was the third-largest company in France by capital and number of workers.
- Reason: Etymology not changed (owned by Line 5). Context was rewrite band: removed the evaluative closer “became a distinctive part of French textile design” / « marquent l’histoire » (T2, T9, S4 deletable sentence). Added facts from the entry’s listed source: the royal title came by letters patent on 19 June 1783, and in 1803 the manufacture was the third-largest company in France by capital and workforce. Source: https://www.museedelatoiledejouy.fr/collections/oeuvres/ (« la Manufacture obtenant le précieux titre par lettres patentes le 19 juin 1783 »; « devenir, en 1803, la troisième entreprise de France par l’importance du capital et du nombre d’ouvriers »; workshop at Jouy-en-Josas in 1760).

## station/9/oberkampf/context/fr

Score: 0.49 → 0.86

- Before: Oberkampf ouvre son atelier en 1760. En 1783, l’atelier reçoit le titre de manufacture royale. Ses motifs floraux et ses scènes figuratives marquent l’histoire des tissus imprimés français.
- After: Oberkampf ouvre son propre atelier d’impression sur étoffe à Jouy-en-Josas en 1760. Des lettres patentes en font une manufacture royale le 19 juin 1783. En 1803, c’est la troisième entreprise de France par le capital et le nombre d’ouvriers.
- Reason: Etymology not changed (owned by Line 5). Context was rewrite band: removed the evaluative closer “became a distinctive part of French textile design” / « marquent l’histoire » (T2, T9, S4 deletable sentence). Added facts from the entry’s listed source: the royal title came by letters patent on 19 June 1783, and in 1803 the manufacture was the third-largest company in France by capital and workforce. Source: https://www.museedelatoiledejouy.fr/collections/oeuvres/ (« la Manufacture obtenant le précieux titre par lettres patentes le 19 juin 1783 »; « devenir, en 1803, la troisième entreprise de France par l’importance du capital et du nombre d’ouvriers »; workshop at Jouy-en-Josas in 1760).

## station/9/saint-ambroise/etymology/en

Score: 0.84 → 0.98

- Before: Named for the Saint-Ambroise district, after both Rue Saint-Ambroise and the Église Saint-Ambroise, honouring Ambrose of Milan, bishop of Milan from 374 to 397.
- After: Named for the Saint-Ambroise district, which takes its name from Rue Saint-Ambroise and the Église Saint-Ambroise. Both honour Ambrose of Milan, bishop of Milan from 374 to 397.
- Reason: Removed calque « , d’après la rue » (T19). Split sentence.

## station/9/saint-ambroise/etymology/fr

Score: 0.74 → 0.98

- Before: La station doit son nom au quartier Saint-Ambroise, d’après la rue Saint-Ambroise et l’église Saint-Ambroise, en hommage à Ambroise de Milan, évêque de Milan de 374 à 397.
- After: La station doit son nom au quartier Saint-Ambroise, qui tient son nom de la rue et de l’église Saint-Ambroise. Toutes deux honorent Ambroise de Milan, évêque de Milan de 374 à 397.
- Reason: Removed calque « , d’après la rue » (T19). Split sentence.

## station/9/saint-ambroise/context/en

Score: 0.68 → 0.92

- Before: Opened on 10 December 1933 with the extension to Porte de Montreuil, the station was chosen in the late 1990s to test prototype platform lighting for the Espace Métro 2000 programme, becoming in April 1997 the first of a planned series of 268 stations to be modernised.
- After: Saint-Ambroise opened on 10 December 1933 with the extension to Porte de Montreuil. In the late 1990s it was chosen to test prototype platform lighting for the Espace Métro 2000 programme. In April 1997 it became the first of a planned series of 268 stations to be modernised.
- Reason: Split a 47/50-word sentence; removed “-ing” tail clause “becoming in April 1997…” (T3). FR adds « des quais » to match EN “platform lighting”.

## station/9/saint-ambroise/context/fr

Score: 0.69 → 0.92

- Before: Ouverte le 10 décembre 1933 avec le prolongement vers Porte de Montreuil, la station est choisie à la fin des années 1990 pour tester un éclairage prototype dans le cadre du programme Espace Métro 2000, devenant en avril 1997 la première d’une série de 268 stations prévues pour être modernisées.
- After: Saint-Ambroise ouvre le 10 décembre 1933 avec le prolongement vers Porte de Montreuil. À la fin des années 1990, elle est choisie pour tester un éclairage prototype des quais dans le cadre du programme Espace Métro 2000. En avril 1997, elle devient la première d’une série de 268 stations à moderniser.
- Reason: Split a 47/50-word sentence; removed “-ing” tail clause “becoming in April 1997…” (T3). FR adds « des quais » to match EN “platform lighting”.

## station/9/voltaire/etymology/en

Score: 0.87 → 0.97

- Before: Named for Boulevard Voltaire and the philosopher Voltaire, born François-Marie Arouet (1694-1778); its Léon Blum subtitle was added after the adjoining square was renamed in 1957 for the socialist statesman.
- After: Named for Boulevard Voltaire and the philosopher Voltaire, born François-Marie Arouet (1694–1778). The Léon Blum subtitle was added after the adjoining square was renamed for the socialist statesman in 1957.
- Reason: Split a 30/37-word sentence. Removed opening possessive “its”. Year ranges use an en dash. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/voltaire/etymology/fr

Score: 0.74 → 0.98

- Before: La station doit son nom au boulevard Voltaire et au philosophe Voltaire, né François-Marie Arouet (1694-1778) ; son sous-titre Léon Blum a été ajouté après le renommage du square voisin en 1957, en l’honneur de l’homme d’État socialiste.
- After: La station doit son nom au boulevard Voltaire et au philosophe Voltaire, né François-Marie Arouet (1694–1778). Le sous-titre Léon Blum est ajouté après que le square voisin a pris, en 1957, le nom de cet homme d’État socialiste.
- Reason: Split a 30/37-word sentence. Removed opening possessive “its”. Year ranges use an en dash. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/voltaire/context/en

Score: 0.68 → 0.85

- Before: Opened on 10 December 1933 with the extension to Porte de Montreuil, Voltaire was, with Pont-Neuf and Ledru-Rollin, one of three prototype stations for the Andreu-Motte decor from 1974, and became the model for the stations treated in yellow.
- After: Voltaire opened on 10 December 1933 with the extension to Porte de Montreuil. From 1974 it was one of three prototype stations for the Andreu-Motte decor, with Pont-Neuf and Ledru-Rollin. It became the model for the stations treated in yellow.
- Reason: Split a 39-word sentence; varied opener. No fact change.

## station/9/voltaire/context/fr

Score: 0.67 → 0.89

- Before: Ouverte le 10 décembre 1933 avec le prolongement vers Porte de Montreuil, Voltaire est, avec Pont-Neuf et Ledru-Rollin, l’une des trois stations prototypes du décor Andreu-Motte à partir de 1974, et devient le modèle des stations traitées en jaune.
- After: Voltaire ouvre le 10 décembre 1933 avec le prolongement vers Porte de Montreuil. À partir de 1974, elle est l’une des trois stations prototypes du décor Andreu-Motte, avec Pont-Neuf et Ledru-Rollin. Elle devient le modèle des stations traitées en jaune.
- Reason: Split a 39-word sentence; varied opener. No fact change.

## station/9/charonne/etymology/en

Score: 0.90 → 0.97

- Before: Named for Rue de Charonne, itself carrying the name of the former village of Charonne, annexed into Paris in 1859; the historic village centre lies over 700 metres east of the station.
- After: Named for Rue de Charonne, which carries the name of the former village of Charonne, annexed to Paris in 1859. The historic village centre lies more than 700 metres east of the station.
- Reason: Split a 32/41-word sentence. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/charonne/etymology/fr

Score: 0.79 → 0.99

- Before: La station doit son nom à la rue de Charonne, qui porte le nom de l’ancien village de Charonne, annexé à Paris en 1859 ; le centre historique du village se trouve à plus de 700 mètres à l’est de la station.
- After: La station doit son nom à la rue de Charonne, qui porte le nom de l’ancien village de Charonne, annexé à Paris en 1859. Le centre historique du village se trouve à plus de 700 mètres à l’est de la station.
- Reason: Split a 32/41-word sentence. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/charonne/context/en

Score: 0.62 → 0.88

- Before: Opened on 10 December 1933, the station stands where, on 8 February 1962, police charged a demonstration against the OAS and the Algerian War; eight protesters died at the entrance and a ninth later in hospital, remembered as the martyrs of Charonne.
- After: On 8 February 1962, police charged a demonstration against the OAS and the Algerian War. Eight protesters died at the station entrance and a ninth later in hospital. They are known as the martyrs of Charonne. Since 8 February 2007 the station has carried the subtitle Place du 8 Février 1962.
- Reason: Rewrite band. Split 42/48-word sentence; removed “remembered as” / « restés dans la mémoire » (T7, T13). The opening date (already in the opened field) gave way to a station-specific fact: since 8 February 2007 the station has the subtitle Place du 8 février 1962. Source: https://fr.wikipedia.org/wiki/Charonne_(m%C3%A9tro_de_Paris) (« La station porte comme sous-titre Place du 8 février 1962 à la suite de la création le 8 février 2007 de la place… », victims « dites les “martyrs de Charonne” »). The opening day (10 December 1933) is removed from the prose; the year stays in the station’s opened field.

## station/9/charonne/context/fr

Score: 0.46 → 0.89

- Before: Ouverte le 10 décembre 1933, la station se trouve à l’endroit où, le 8 février 1962, la police charge une manifestation contre l’OAS et la guerre d’Algérie ; huit manifestants meurent à l’entrée et un neuvième plus tard à l’hôpital, restés dans la mémoire comme les martyrs de Charonne.
- After: Le 8 février 1962, la police charge une manifestation contre l’OAS et la guerre d’Algérie. Huit manifestants meurent à l’entrée de la station et un neuvième plus tard à l’hôpital. On les appelle les martyrs de Charonne. Depuis le 8 février 2007, la station porte le sous-titre Place du 8 Février 1962.
- Reason: Rewrite band. Split 42/48-word sentence; removed “remembered as” / « restés dans la mémoire » (T7, T13). The opening date (already in the opened field) gave way to a station-specific fact: since 8 February 2007 the station has the subtitle Place du 8 février 1962. Source: https://fr.wikipedia.org/wiki/Charonne_(m%C3%A9tro_de_Paris) (« La station porte comme sous-titre Place du 8 février 1962 à la suite de la création le 8 février 2007 de la place… », victims « dites les “martyrs de Charonne” »). The opening day (10 December 1933) is removed from the prose; the year stays in the station’s opened field.

## station/9/rue-des-boulets/etymology/en

Score: 0.81 → 0.88

- Before: Named for Rue des Boulets; boulets most likely refers to compressed coal pellets once sold in the area, though two other origins have also been suggested.
- After: Named for Rue des Boulets, whose name most likely refers to the compressed coal pellets (boulets) once sold in the area. Two other origins have also been suggested.
- Reason: Split FR 34-word sentence. Hedge “most likely” / « le plus probablement » and “two other origins” kept. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/rue-des-boulets/etymology/fr

Score: 0.80 → 0.87

- Before: La station doit son nom à la rue des Boulets ; boulets désigne le plus probablement des boulets de charbon aggloméré autrefois vendus dans le quartier, même si deux autres origines ont aussi été proposées.
- After: La station doit son nom à la rue des Boulets, qui renvoie le plus probablement aux boulets de charbon aggloméré autrefois vendus dans le quartier. Deux autres origines ont aussi été proposées.
- Reason: Split FR 34-word sentence. Hedge “most likely” / « le plus probablement » and “two other origins” kept. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/rue-des-boulets/context/en

Score: 0.64 → 0.97

- Before: Opened on 10 December 1933 as Rue des Boulets – Rue de Montreuil, the station was later simplified to Boulets – Montreuil, then renamed Rue des Boulets in 1998 to avoid confusion with the town of Montreuil, also served by the line.
- After: The station opened on 10 December 1933 as Rue des Boulets – Rue de Montreuil. The name was later shortened to Boulets – Montreuil. In 1998 it became Rue des Boulets, to avoid confusion with the town of Montreuil, also served by the line.
- Reason: Split 40/43-word sentence; removed calque « la station est ensuite simplifiée » (T19). No fact change.

## station/9/rue-des-boulets/context/fr

Score: 0.58 → 0.96

- Before: Ouverte le 10 décembre 1933 sous le nom Rue des Boulets – Rue de Montreuil, la station est ensuite simplifiée en Boulets – Montreuil, puis renommée Rue des Boulets en 1998 pour éviter la confusion avec la ville de Montreuil, également desservie par la ligne.
- After: La station ouvre le 10 décembre 1933 sous le nom de Rue des Boulets – Rue de Montreuil, plus tard abrégé en Boulets – Montreuil. En 1998, elle devient Rue des Boulets, pour éviter la confusion avec la ville de Montreuil, également desservie par la ligne.
- Reason: Split 40/43-word sentence; removed calque « la station est ensuite simplifiée » (T19). No fact change.

## station/9/nation/context/en

Score: 0.83 → 0.96

- Before: The Line 9 platform opened on 10 December 1933, subtitled Place des Antilles. Nation is the only Métro station that serves as a terminus for two lines, 2 and 6.
- After: Nation is the only Métro station that is the terminus of two lines, 2 and 6. The Line 9 platform opened on 10 December 1933, with the subtitle Place des Antilles.
- Reason: Etymology not changed (owned by Line 1). Context: “serves as a terminus” → “is the terminus” (S3); varied opener.

## station/9/nation/context/fr

Score: 0.88 → 0.89

- Before: Le quai de la ligne 9 ouvre le 10 décembre 1933, avec le sous-titre Place des Antilles. Nation est la seule station du métro qui soit terminus de deux lignes, la 2 et la 6.
- After: Nation est la seule station du métro qui soit terminus de deux lignes, la 2 et la 6. Le quai de la ligne 9 ouvre le 10 décembre 1933, avec le sous-titre Place des Antilles.
- Reason: Etymology not changed (owned by Line 1). Context: “serves as a terminus” → “is the terminus” (S3); varied opener.

## station/9/buzenval/etymology/en

Score: 0.91 → 0.96

- Before: Named for Rue de Buzenval, commemorating the Battle of Buzenval of 19 January 1871, when Paris forces sortied against besieging German troops during the Franco-Prussian War.
- After: Named for Rue de Buzenval, which commemorates the Battle of Buzenval of 19 January 1871. Paris forces made a sortie there against the German troops besieging the city during the Franco-Prussian War.
- Reason: Split a 38-word FR sentence. No fact change.

## station/9/buzenval/etymology/fr

Score: 0.84 → 0.98

- Before: La station doit son nom à la rue de Buzenval, qui commémore la bataille de Buzenval du 19 janvier 1871, lorsque les troupes parisiennes tentent une sortie contre les forces allemandes assiégeant la capitale, pendant la guerre franco-prussienne.
- After: La station doit son nom à la rue de Buzenval, qui commémore la bataille de Buzenval du 19 janvier 1871. Les troupes parisiennes y tentent une sortie contre les forces allemandes qui assiègent la capitale, pendant la guerre franco-prussienne.
- Reason: Split a 38-word FR sentence. No fact change.

## station/9/buzenval/context/en

Score: 0.73 → 0.98

- Before: Opened on 10 December 1933, the station’s entrance was built into the ground floor of the Palais Avron cinema, for lack of room on the street; the building has served as a supermarket since 1977.
- After: Buzenval opened on 10 December 1933. For lack of room on the street, its entrance was built into the ground floor of the Palais Avron cinema. The building has been a supermarket since 1977.
- Reason: Removed “has served as” (T8); split sentence; removed dangling participle in FR (« Ouverte…, l’entrée… »). FR: U+202F before « ; », U+00A0 before « : ».

## station/9/buzenval/context/fr

Score: 0.82 → 0.98

- Before: Ouverte le 10 décembre 1933, l’entrée de la station est aménagée au rez-de-chaussée du cinéma Palais Avron, faute de place en surface ; le bâtiment abrite un supermarché depuis 1977.
- After: Buzenval ouvre le 10 décembre 1933. Faute de place en surface, son entrée est aménagée au rez-de-chaussée du cinéma Palais Avron. Le bâtiment abrite un supermarché depuis 1977.
- Reason: Removed “has served as” (T8); split sentence; removed dangling participle in FR (« Ouverte…, l’entrée… »). FR: U+202F before « ; », U+00A0 before « : ».

## station/9/maraichers/etymology/fr

Score: 0.80 → 0.91

- Before: La station doit son nom à la rue des Maraîchers, qui rappelle les jardins maraîchers ayant autrefois bordé la rue, réputés localement pour leurs pêches de Montreuil.
- After: La station doit son nom à la rue des Maraîchers. Ce nom rappelle les jardins maraîchers qui bordaient autrefois la rue, connus localement pour leurs pêches de Montreuil.
- Reason: FR only: removed « réputés » (T7) and split a 27-word sentence.

## station/9/maraichers/context/en

Score: 0.79 → 0.97

- Before: Opened on 10 December 1933 with the extension to Porte de Montreuil, the station briefly had a street-level connection to the Petite Ceinture’s Rue d’Avron station, lost on 23 July 1934 when that line closed to passengers.
- After: Maraîchers opened on 10 December 1933 with the extension to Porte de Montreuil. For a short time it had a street-level connection to Rue d’Avron station on the Petite Ceinture. The link ended on 23 July 1934, when that line closed to passengers.
- Reason: Split a 37/43-word sentence. No fact change.

## station/9/maraichers/context/fr

Score: 0.77 → 0.95

- Before: Ouverte le 10 décembre 1933 avec le prolongement vers Porte de Montreuil, la station dispose un temps d’une liaison en surface avec la station Rue d’Avron de la Petite Ceinture, perdue le 23 juillet 1934 à la fermeture de cette ligne aux voyageurs.
- After: Maraîchers ouvre le 10 décembre 1933 avec le prolongement vers Porte de Montreuil. Elle dispose un temps d’une correspondance en surface avec la station Rue d’Avron de la Petite Ceinture. Cette liaison disparaît le 23 juillet 1934, à la fermeture de cette ligne aux voyageurs.
- Reason: Split a 37/43-word sentence. No fact change.

## station/9/porte-de-montreuil/context/en

Score: 0.73 → 0.95

- Before: Opened on 10 December 1933 as the line’s eastern terminus, a role it held until the 1937 extension to Mairie de Montreuil, the station now stands beside the Montreuil flea market, set on the gate’s former defensive glacis.
- After: Porte de Montreuil opened on 10 December 1933 as the line’s eastern terminus. It kept that role until the 1937 extension to Mairie de Montreuil. The station stands beside the Montreuil flea market, which occupies the gate’s former defensive glacis.
- Reason: Split a 38/40-word sentence; removed persistence filler “now” / « aujourd’hui ». No fact change.

## station/9/porte-de-montreuil/context/fr

Score: 0.77 → 0.98

- Before: Ouverte le 10 décembre 1933 comme terminus est de la ligne, rôle qu’elle conserve jusqu’au prolongement de 1937 vers Mairie de Montreuil, la station se trouve aujourd’hui près des puces de Montreuil, installées sur l’ancien glacis défensif de la porte.
- After: Porte de Montreuil ouvre le 10 décembre 1933 comme terminus est de la ligne. Elle garde ce rôle jusqu’au prolongement de 1937 vers Mairie de Montreuil. La station se trouve près des puces de Montreuil, installées sur l’ancien glacis défensif de la porte.
- Reason: Split a 38/40-word sentence; removed persistence filler “now” / « aujourd’hui ». No fact change.

## station/9/robespierre/etymology/en

Score: 0.87 → 0.97

- Before: Named for Rue Robespierre, honouring lawyer and revolutionary Maximilien de Robespierre (1758-1794); Montreuil’s Communist town council gave the name to the station, then under construction, in 1936, at the initiative of Jacques Duclos.
- After: Named for Rue Robespierre, which honours the lawyer and revolutionary Maximilien de Robespierre (1758–1794). In 1936 Montreuil’s Communist town council gave the name to the station, then under construction, at the initiative of Jacques Duclos.
- Reason: Split a 33/41-word sentence. Year ranges use an en dash. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/robespierre/etymology/fr

Score: 0.74 → 0.98

- Before: La station doit son nom à la rue Robespierre, en hommage à l’avocat et révolutionnaire Maximilien de Robespierre (1758-1794) ; le conseil municipal communiste de Montreuil attribue ce nom à la station, alors en construction, en 1936, à l’initiative de Jacques Duclos.
- After: La station doit son nom à la rue Robespierre, qui honore l’avocat et révolutionnaire Maximilien de Robespierre (1758–1794). En 1936, le conseil municipal communiste de Montreuil donne ce nom à la station, alors en construction, à l’initiative de Jacques Duclos.
- Reason: Split a 33/41-word sentence. Year ranges use an en dash. FR: U+202F before « ; », U+00A0 before « : ».

## station/9/robespierre/context/en

Score: 0.92 → 0.97

- Before: Opened on 14 October 1937 with the line’s final extension, from Porte de Montreuil to Mairie de Montreuil, the station has two entrances; only the one on Rue Barbès is described as Art Deco.
- After: Robespierre opened on 14 October 1937 with the line’s final extension, from Porte de Montreuil to Mairie de Montreuil. Of its two entrances, only the one on Rue Barbès is described as Art Deco.
- Reason: FR had a plain space before « ; »; restructured both locales the same way. No fact change.

## station/9/robespierre/context/fr

Score: 0.87 → 0.97

- Before: Ouverte le 14 octobre 1937 avec le dernier prolongement de la ligne, de Porte de Montreuil à Mairie de Montreuil, la station compte deux entrées ; seule celle de la rue Barbès est qualifiée d’Art déco.
- After: Robespierre ouvre le 14 octobre 1937 avec le dernier prolongement de la ligne, de Porte de Montreuil à Mairie de Montreuil. Des deux entrées de la station, seule celle de la rue Barbès est qualifiée d’Art déco.
- Reason: FR had a plain space before « ; »; restructured both locales the same way. No fact change.

## station/9/croix-de-chavaux/etymology/en

Score: 0.86 → 0.86

- Before: Named for the crossroads above it, then called Croix-de-Chavaux and today Place Jacques-Duclos, where six roads met leading to Paris, Rosny-sous-Bois, Bagnolet and Vincennes; croix refers to a monumental wayside cross shown on old maps.
- After: Named for the crossroads above it, once called Croix-de-Chavaux and now Place Jacques-Duclos. Six roads met there, leading to Paris, Rosny-sous-Bois, Bagnolet and Vincennes. Croix refers to a monumental cross shown on old maps; Chavaux is probably a corruption of chevaux, horses.
- Reason: Split a 35/38-word sentence. Moved “Chavaux is probably a corruption of chevaux” here from the context (R7: context continued the etymology); hedge kept (“probably” / « serait »). FR: U+202F before « ; », U+00A0 before « : ».

## station/9/croix-de-chavaux/etymology/fr

Score: 0.71 → 0.91

- Before: La station doit son nom au carrefour qui la surmonte, alors appelé Croix-de-Chavaux et aujourd’hui place Jacques-Duclos, où se croisaient six routes menant à Paris, Rosny-sous-Bois, Bagnolet et Vincennes ; croix désigne une croix monumentale figurant sur d’anciens plans.
- After: La station doit son nom au carrefour qui la surmonte, autrefois appelé Croix-de-Chavaux, aujourd’hui place Jacques-Duclos. Six routes s’y croisaient, vers Paris, Rosny-sous-Bois, Bagnolet et Vincennes. Croix désigne une croix monumentale figurant sur d’anciens plans ; Chavaux serait une déformation de chevaux.
- Reason: Split a 35/38-word sentence. Moved “Chavaux is probably a corruption of chevaux” here from the context (R7: context continued the etymology); hedge kept (“probably” / « serait »). FR: U+202F before « ; », U+00A0 before « : ».

## station/9/croix-de-chavaux/context/en

Score: 0.71 → 0.96

- Before: Chavaux is probably a corruption of chevaux, horses, recalling a coaching relay where stagecoach horses were changed at the crossroads. The station opened on 14 October 1937 with the line’s final extension to Mairie de Montreuil.
- After: The station opened on 14 October 1937 with the line’s final extension to Mairie de Montreuil. Its subtitle, Place Jacques-Duclos, gives the current name of the crossroads. A coaching relay once stood there, where stagecoach horses were changed. The platforms are 105 metres long.
- Reason: Context no longer explains the name (R7, T3 tail clause). Kept the coaching-relay fact. Added: the subtitle Place Jacques-Duclos and the 105-metre platforms. Source: https://fr.wikipedia.org/wiki/Croix_de_Chavaux_(m%C3%A9tro_de_Paris) (« Le patronyme de Place Jacques-Duclos figure quant à lui en tant que sous-titre »; « deux quais de 105 mètres de long »).

## station/9/croix-de-chavaux/context/fr

Score: 0.70 → 0.94

- Before: Chavaux serait une déformation de chevaux, en souvenir d’un relais où l’on changeait les chevaux des diligences au carrefour. La station ouvre le 14 octobre 1937 avec le dernier prolongement de la ligne vers Mairie de Montreuil.
- After: La station ouvre le 14 octobre 1937 avec le dernier prolongement de la ligne vers Mairie de Montreuil. Son sous-titre, Place Jacques-Duclos, donne le nom actuel du carrefour. Un relais où l’on changeait les chevaux des diligences s’y trouvait autrefois. Les quais mesurent 105 mètres de long.
- Reason: Context no longer explains the name (R7, T3 tail clause). Kept the coaching-relay fact. Added: the subtitle Place Jacques-Duclos and the 105-metre platforms. Source: https://fr.wikipedia.org/wiki/Croix_de_Chavaux_(m%C3%A9tro_de_Paris) (« Le patronyme de Place Jacques-Duclos figure quant à lui en tant que sous-titre »; « deux quais de 105 mètres de long »).

## station/9/mairie-de-montreuil/etymology/en

Score: 0.72 → 0.95

- Before: Named for its proximity to Montreuil’s town hall, built in the 1930s; the station has served as the line’s eastern terminus ever since it opened.
- After: Called Mairie de Montreuil after the town hall of Montreuil, built in the 1930s, which faces the station.
- Reason: Removed calque « doit son nom à sa proximité » (T19), opening “its” with no antecedent, and “served as” (T8). Terminus fact moved to the context. Added that the town hall faces the station. Source: https://fr.wikipedia.org/wiki/Mairie_de_Montreuil_(m%C3%A9tro_de_Paris) (« La station est implantée sous la place Jean-Jaurès … face à la mairie de Montreuil »).

## station/9/mairie-de-montreuil/etymology/fr

Score: 0.61 → 0.96

- Before: La station doit son nom à sa proximité avec la mairie de Montreuil, construite dans les années 1930 ; elle sert de terminus est de la ligne depuis son ouverture.
- After: La station doit son nom à la mairie de Montreuil, construite dans les années 1930, qui lui fait face.
- Reason: Removed calque « doit son nom à sa proximité » (T19), opening “its” with no antecedent, and “served as” (T8). Terminus fact moved to the context. Added that the town hall faces the station. Source: https://fr.wikipedia.org/wiki/Mairie_de_Montreuil_(m%C3%A9tro_de_Paris) (« La station est implantée sous la place Jean-Jaurès … face à la mairie de Montreuil »).

## station/9/mairie-de-montreuil/context/en

Score: 0.79 → 0.96

- Before: Opened on 14 October 1937, the station’s platforms were refitted in the blue Andreu-Motte style with flat white tiles, one of about a third of network stations treated between 1974 and 1984.
- After: Mairie de Montreuil has been the line’s eastern terminus since it opened on 14 October 1937. On the boarding platform, a 1937 mosaic painted on Sèvres porcelain shows a map of the town and its main monuments. Between 1974 and 1984 the platforms were refitted in blue Andreu-Motte style with flat white tiles.
- Reason: S7 was 0.45–0.57 (generic restyling). Added the 1937 mosaic on Sèvres porcelain showing a town map and monuments; kept the Andreu-Motte refit. Removed “one of about a third of network stations” (the same comparison is on Billancourt and Saint-Philippe du Roule; filler here). Source: https://fr.wikipedia.org/wiki/Mairie_de_Montreuil_(m%C3%A9tro_de_Paris) (« Sur le tympan nord du quai d’embarquement, une mosaïque peinte sur des carreaux de porcelaine de Sèvres, datée de 1937, représente un plan de la ville avec des images des principaux monuments »).

## station/9/mairie-de-montreuil/context/fr

Score: 0.76 → 0.94

- Before: Ouverte le 14 octobre 1937, la station voit ses quais refaits dans le style Andreu-Motte bleu, avec des carreaux plats blancs, comme environ un tiers des stations du réseau entre 1974 et 1984.
- After: Mairie de Montreuil est le terminus oriental depuis son ouverture, le 14 octobre 1937. Sur le quai d’embarquement, une mosaïque de 1937 peinte sur porcelaine de Sèvres montre un plan de la ville et ses principaux monuments. De 1974 à 1984, les quais sont refaits en style Andreu-Motte bleu, à carreaux plats blancs.
- Reason: S7 was 0.45–0.57 (generic restyling). Added the 1937 mosaic on Sèvres porcelain showing a town map and monuments; kept the Andreu-Motte refit. Removed “one of about a third of network stations” (the same comparison is on Billancourt and Saint-Philippe du Roule; filler here). Source: https://fr.wikipedia.org/wiki/Mairie_de_Montreuil_(m%C3%A9tro_de_Paris) (« Sur le tympan nord du quai d’embarquement, une mosaïque peinte sur des carreaux de porcelaine de Sèvres, datée de 1937, représente un plan de la ville avec des images des principaux monuments »).

## line/9/summary/en

Score: 0.77 → 0.97

- Before: Battle names from Iéna to Trocadéro, grand boulevards, and the Pont de Sèvres, where the Métro first left Paris for Boulogne-Billancourt. Discover the names of 37 stations.
- After: Line 9 runs from Pont de Sèvres to Mairie de Montreuil and has 37 stations. Several names recall battles, such as Iéna and Trocadéro. At Pont de Sèvres, in Boulogne-Billancourt, the Métro first ran beyond the Paris city limits.
- Reason: Removed marketing call to action “Discover the names…” / « Découvrez… » and the false range “from Iéna to Trocadéro” (T12). Names the termini (from the termini field) and keeps the 37-station count, the battle names and the Pont de Sèvres fact. Removed the vague item “grand boulevards” (no checkable claim).

## line/9/summary/fr

Score: 0.84 → 0.97

- Before: Des noms de batailles, d’Iéna à Trocadéro, de grands boulevards, et le pont de Sèvres, où le métro quitte Paris pour la première fois, à Boulogne-Billancourt. Découvrez les noms de 37 stations.
- After: La ligne 9 relie Pont de Sèvres à Mairie de Montreuil et compte 37 stations. Plusieurs noms rappellent des batailles, comme Iéna et Trocadéro. À Pont de Sèvres, à Boulogne-Billancourt, le métro franchit pour la première fois les limites de Paris.
- Reason: Removed marketing call to action “Discover the names…” / « Découvrez… » and the false range “from Iéna to Trocadéro” (T12). Names the termini (from the termini field) and keeps the 37-station count, the battle names and the Pont de Sèvres fact. Removed the vague item “grand boulevards” (no checkable claim).

## Review

Fact-preservation review of all 109 changed units (107 station units, 2 line-summary units). Sources were checked for every added fact. The "After" texts above are the rewrite before this review. The fixes below are now in `apps/web/src/data/line9.ts`.

Fixed:

- exelmans/etymology (en, fr): restored "remembered as a hero of the last battle of the Empire" / « Considéré comme un héros de la dernière bataille de l’Empire ». The rewrite said only that he "fought in" it. The station article says « héros de la dernière bataille de l’Empire ».
- jasmin/etymology (en, fr): restored "one of the leading Occitan-language poets" / « compte parmi les principaux poètes ». The station article says « un des principaux auteurs occitans ». FR now uses « dit Jasmin » so the sentence does not have two « qui » clauses.
- jasmin/context/fr: replaced « comme seulement à Ranelagh et La Muette » (not natural French) with « disposition partagée seulement avec Ranelagh et La Muette ». The mezzanine fact is confirmed by the station article.
- alma-marceau/etymology/fr: « Ils commémorent » made Avenue Marceau commemorate the battle too. Now « Le pont et la place commémorent ». The sentence was shortened to stay within 45 words.
- franklin-d-roosevelt/context/fr: restored « couloir de correspondance » to match EN "connecting corridor".
- richelieu-drouot/context/fr: restored « ensuite », « certaines » and « nouvelles », which the rewrite dropped (this matches the original FR). « des années 1930 » removed to stay within 55 words. The original FR did not have it either.
- oberkampf/context/en: "By 1803" changed to "In 1803". The source says « en 1803 ».
- charonne/context (en, fr): the subtitle is now "Place du 8 février 1962", as the station article writes it. The rewrite had "8 Février".

Checked and confirmed (no change):

- oberkampf: own workshop at Jouy-en-Josas in 1760, letters patent of 19 June 1783, third-largest company in France in 1803 (museedelatoiledejouy.fr).
- charonne: subtitle since 8 February 2007, « martyrs de Charonne », deaths at the station entrance.
- croix-de-chavaux: subtitle Place Jacques-Duclos, 105 m platforms, "chavaux" hedge kept. The source states the coaching relay as fact, so the unhedged context sentence is correct.
- mairie-de-montreuil: station faces the town hall; 1937 mosaic on Sèvres porcelain tiles on the boarding platform.
- saint-philippe-du-roule: « une des rares stations à présenter encore le style Andreu-Motte dans son intégralité ».

Remaining concerns:

- jasmin/context/fr drops « de la ligne » after « premier tronçon » (EN keeps "the line’s"). This keeps it within the 55-word limit.
- richelieu-drouot/context: EN says "1930s stations" and FR does not, as in the original.
- Scores were not re-run after these fixes.

## Fact check 2026-10-05

Corrected:

- robespierre/context (en, fr): the old text said that only the Rue Barbès entrance is Art Deco. That claim used only en.wikipedia, which labels only access 2. The fr station article calls both entrances Art Deco: « l'accès 1 « Rue Robespierre » comprenant un édicule de style Art déco établi en alignement avec la façade attenante du no 187 de la rue de Paris (cas rare sur le réseau) » and « l'accès 2 « Rue Barbès » consistant également en un édicule dans le style Art déco ». New EN: "Both of its entrances are Art Deco buildings. The one on Rue Robespierre is built into the line of the facade beside it, which is rare on the network." New FR: « Ses deux accès sont des édicules de style Art déco. Celui de la rue Robespierre s’aligne sur la façade voisine, un cas rare sur le réseau. » Evidence: https://fr.wikipedia.org/wiki/Robespierre_(m%C3%A9tro_de_Paris). This article was already in sources[] (added by the station() helper), so no source was added. This also reverses correction 24 in docs/research/line9.md.

Sources added (text not changed):

- trocadero/etymology: added "Place du Trocadéro-et-du-11-Novembre · Wikipédia" for the 1877 renaming and the earlier name Place du Roi-de-Rome: « Créée en 1869 sous le nom de « Place du Roi-de-Rome », elle fut rebaptisée en 1877 en souvenir de la bataille du Trocadéro ». Evidence: https://fr.wikipedia.org/wiki/Place_du_Trocad%C3%A9ro-et-du-11-Novembre
- porte-de-montreuil/context: added "Ligne 9 du métro de Paris · Wikipédia" for the end of the terminus role: « 14 octobre 1937 : prolongement à l'est jusqu'à Mairie de Montreuil ». Evidence: https://fr.wikipedia.org/wiki/Ligne_9_du_m%C3%A9tro_de_Paris
- pont-de-sevres/context: added "Boulogne-Billancourt, 4 avril 1943 · CPGenea" for the exact date (the station articles give only the year) and the 80 deaths at the station: « la station de métro Pont-de-Sèvres s'est effondrée. On y a déploré 80 morts ». Evidence: https://cpgenea.net/boulogne-billancourt-4-avril-1943/. The text keeps "about 300", which matches the station articles. Other accounts give 327 or 403. https://en.wikipedia.org/wiki/Bombing_of_France_during_World_War_II was not added because it gives a total of 403, which does not agree with the text.
- republique/etymology: added "Place de la République · Wikipédia" for the link between the name and the monument project: « porte depuis 1879 son nom actuel qui lui est donné dans le cadre du projet d'érection d'une statue de la République ». Evidence: https://fr.wikipedia.org/wiki/Place_de_la_R%C3%A9publique_(Paris). The etymology text did not change. République is shared with other lines (line 5 has the same paris.fr source only).

Corrected by the root pass (claim 50 was sent to a wrong target file):

- saint-augustin/etymology (en, fr), claim 9/saint-augustin/etymology/2: the old second sentence said the square and church "give their name to the surrounding district in the 8th arrondissement". No source names a Saint-Augustin district, and the four administrative quartiers of the 8th are Champs-Élysées, Faubourg-du-Roule, Madeleine and Europe. The station article says: « La station est implantée au nord du quartier de la Madeleine à sa limite administrative avec le quartier de l'Europe. Elle se trouve sous le boulevard Haussmann, à l'est de la place Saint-Augustin. » New EN: "The station lies under Boulevard Haussmann, east of the square, on the boundary between the Madeleine and Europe districts." New FR: « Elle se trouve sous le boulevard Haussmann, à l’est de la place, à la limite des quartiers de la Madeleine et de l’Europe. » The FR first sentence now reads « qui tient le sien de l’église Saint-Augustin voisine » to stay within 45 words. Evidence: https://fr.wikipedia.org/wiki/Saint-Augustin_(m%C3%A9tro_de_Paris) (already in sources[] through the station() helper). Copy evaluator after the change: EN 0.98, FR 0.97 (ship).
- docs/research/line9.md: correction 24 (Robespierre entrances) and the station 18 note (Saint-Augustin location) are updated to match.

## Fact check pass 2 (2026-10-05)

Review of the next 100 pairs after the new ranking. Report: [docs/facts/2026-10-05-fact-check-pass2.md](../../facts/2026-10-05-fact-check-pass2.md).

Confirmed imprecise (rewritten):

- `iena/etymology` (rank 9): the battles are nineteenth-century, not "classical", and only the Alma part of Alma – Marceau is a battle.
  - Before: "The station shares this classical battle-naming pattern with nearby Trocadéro and Alma – Marceau." / « La station partage ce principe de nom de bataille avec Trocadéro et Alma – Marceau, à proximité. »
  - After: "Nearby Trocadéro and the Alma part of Alma – Marceau also take their names from nineteenth-century battles." / « Non loin, Trocadéro et la partie « Alma » d’Alma – Marceau rappellent aussi des batailles du XIXe siècle. »
  - Evidence: https://fr.wikipedia.org/wiki/Alma_-_Marceau_(m%C3%A9tro_de_Paris) (bataille de l'Alma, 1854; avenue Marceau after the general) and https://en.wikipedia.org/wiki/Trocad%C3%A9ro_station (Battle of Trocadero, 1823). Added both as sources. The fr Trocadéro station article names the battle but not its year, so the en article was used.
- `bonne-nouvelle/etymology` (rank 13): FR only. The district is « quartier de Bonne-Nouvelle », without the article.
  - Before: « La station doit son nom au quartier de la Bonne-Nouvelle, … »
  - After: « La station doit son nom au quartier de Bonne-Nouvelle, … »
  - Evidence: station article (« au nord du quartier de Bonne-Nouvelle »). Existing source.
- `franklin-d-roosevelt/context` (rank 88): "inaugurated in 1957" attached to the technique (FR « technique … modernisée, inaugurée » agrees with « technique »). Gemmail dates from the 1930s; the 1957 inauguration was the station decoration.
  - Before: "In the 1950s the platforms were decorated with gemmail, a modernised stained-glass technique, inaugurated in 1957." / « Dans les années 1950, les quais sont décorés de gemmail, technique de vitrail modernisée, inaugurée en 1957. »
  - After: "In the 1950s the platforms were decorated with gemmail, a modernised form of stained glass. The new decoration was inaugurated in March 1957." / « Dans les années 1950, les quais sont décorés de gemmail, une forme modernisée du vitrail. Cette décoration est inaugurée en mars 1957. »
  - Evidence: station article (« le gemmail, qui est une sorte de vitrail modernisé »; « dans la nuit du 1er au 2 mars 1957 »). Existing source. FR context is now 55 words, at the limit.

Copy evaluator after the change: iena/etymology EN 0.94, FR 0.97; bonne-nouvelle/etymology EN 0.91, FR 0.90; franklin-d-roosevelt/context EN 0.95, FR 0.95. All ship, no FAIL.

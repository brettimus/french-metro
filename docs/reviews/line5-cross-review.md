# Line 5 independent source review

Checked 19 September 2026. Scope: `apps/web/src/data/line5.ts` and `docs/research/line5.md`. Application data was read only. This review covers 22 stations, both languages, the route order, naming chains, historical context and shared stations.

## Result

One minor date-range correction is recommended. No other factual errors were found in the current text. The previously reported Stalingrad, Richard-Lenoir and Oberkampf corrections are present and correct.

### Place d’Italie: avoid an uninterrupted 1907–1942 service claim

The context says that Line 5 continued to Étoile from 1907 to 1942. The section was temporarily assigned to Line 6 from 17 May to 6 December 1931. The current wording hides this exception. The audit repeats the same date range.

Use these short replacements. They preserve the useful history without adding a timetable detail:

- EN: “In 1907, Line 5 began running beyond this stop to Étoile. That section passed permanently to Line 6 in 1942, making Place d’Italie Line 5’s southern terminus.”
- FR: “En 1907, la ligne 5 commence à desservir Étoile au-delà de cet arrêt. Ce tronçon passe définitivement à la ligne 6 en 1942. Place d’Italie devient alors le terminus sud de la ligne 5.”
- Audit: “Extension to Étoile in 1907 and permanent transfer to Line 6 in 1942 checked.”

Sources: [station history, including the 1931 exception](https://fr.wikipedia.org/wiki/Place_d%27Italie_(m%C3%A9tro_de_Paris)); [RATP history, confirming the 1907 extension and permanent 1942 transfer](https://www.ratp.fr/decouvrir/patrimoine/histoire-metro-ligne-5).

## Route verification

The [current Bonjour RATP page](https://www.bonjour-ratp.fr/en/lignes-metro/ligne-5/) gives 22 stations and the same endpoints. The [map linked by RATP](https://assets-bff.bonjour-ratp.fr/lineMaps/pdf/plan-de-ligne_METRO_RATP_ligne-5_LIG:IDFM:C01375.pdf) gives the same sequence. This PDF bears a 2012 cartographic date; the current RATP page and its 2026 history confirm that the route still has these endpoints and 22 stops. No missing, duplicated or reversed stations were found.

## Station checks

The station articles cited in the source audit were checked. Additional sources below were used for specific claims.

1. **Bobigny – Pablo Picasso:** town, nearby street, Spanish artist, 1985 terminus and administrative subtitle agree with the French and English station articles.
2. **Bobigny – Pantin – Raymond Queneau:** towns and nearby street, *Zazie dans le métro*, bus setting of *Exercises in Style* and 1985 extension agree.
3. **Église de Pantin:** church name and 1942–1985 terminus period agree. [Seine-Saint-Denis Tourisme](https://www.tourisme93.com/eglise-st-germain-auxerrois-pantin.html) confirms the demolition threat and 1978 protection.
4. **Hoche:** street, general, Bobigny-bound platform display and 1942 opening agree.
5. **Porte de Pantin:** gate in the Thiers wall, road towards Pantin and Germany, former slaughterhouse site and musical decoration agree.
6. **Ourcq:** street, canal and river naming chain agree. The linked canal article confirms that work began in 1802 and that water supply and navigation were intended uses.
7. **Laumière:** avenue and general’s full name agree. The station article supports the original Meynadier plan and the straighter final route.
8. **Jaurès:** direct tribute, 1 August 1914 rename and 1942 Line 5 arrival agree. The avenue changed name on 19 August, so the text gives the correct sequence.
9. **Stalingrad:** square and battle naming chain, 1946 name and 1942 interchange agree. The revised text correctly locates the victory at Stalingrad.
10. **Gare du Nord:** northern railway destinations and the loop replaced by through platforms in 1942 agree. The later training use agrees with Line 4.
11. **Gare de l’Est:** eastern routes, Verdun avenue, shared Line 5/7 space and Line 4 below agree. Lines 4 and 7 give compatible accounts.
12. **Jacques Bonsergent:** square, engineer, December 1940 execution, Lancry and 1946 rename agree. The [Paris municipal archive](https://quotidien-parisiens-sous-occupation.paris.fr/en/detail_419.html) documents the execution poster. The text avoids disputed priority claims.
13. **République:** square renamed during monument planning agrees. [Ville de Paris](https://www.paris.fr/pages/1-lieu-3-histoires-la-place-de-la-republique-33595) supports the 1883 monument, Marianne and the three allegories.
14. **Oberkampf:** street, manufacturer and textile works agree. The [Musée de la Toile de Jouy](https://www.museedelatoiledejouy.fr/collections/oeuvres/) confirms 1760 and the 1783 royal title. Both languages now give the title to the workshop.
15. **Richard-Lenoir:** François Richard’s adopted surname and his partner’s identity agree. Canal position and narrow entrance hall agree with the station article. The revised pronoun clearly refers to the partner’s death.
16. **Bréguet – Sabin:** two streets, Breguet family, Saint-Sabin alderman and spelling distinction agree. Opening on 31 December after trains began passing on 17 December supports “two weeks”.
17. **Bastille:** square, prison, demolition after 1789 and the 1905 discovery of defensive masonry agree. The wording does not confuse the platform remains with the relocated Liberté tower.
18. **Quai de la Rapée:** quay, Louis XV war commissary and property agree. Place Mazas, Pont d’Austerlitz and the 1916 current name agree. The southbound Seine crossing is correct.
19. **Gare d’Austerlitz:** railway station, 1805 battle and former Orléans name agree. RATP independently confirms the elevated passage through the mainline hall.
20. **Saint-Marcel:** boulevard, former suburb and fifth-century bishop agree. The [Diocese of Paris](https://dioceseparis.fr/saint-marcel-753) supports the burial and legend. [Centre André Chastel](https://theophile-centrechastel.inist.fr/s/theophile/item/68737) documents the Notre-Dame sculpture and staff. The dragon is correctly identified as legend.
21. **Campo-Formio:** street, 1797 treaty and former town name agree. The 6 June opening, four days after 2 June, agrees. No claim is made that the treaty was physically signed in Campoformido.
22. **Place d’Italie:** square, avenue and Italian road direction agree with Line 7. Apply the minor context correction above.

## Shared entries and limits

Shared IDs `stalingrad`, `gare-du-nord`, `gare-de-lest` and `place-ditalie` match the other line modules. Their naming chains and historical claims do not conflict. English and French preserve the same facts.

This is a source check, not an archival investigation. Some minor station-history details rely on the cited station articles. The independent institutional checks cover the route, church protection, textile manufacture, public monument, execution notice, river crossing and religious legend. No opening-year metadata or artwork was treated as historical evidence. No application data, build files or deployment files were changed.

## Resolution

Root applied the exact bilingual correction above and updated the research record before release.

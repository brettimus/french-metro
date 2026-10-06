# Line 2 illustration notes

Generated with the Codex CLI built-in imagegen tool (`image_gen`, codex-cli 0.157.0), not the API fallback. The original PNG is stored in `docs/design/originals/line-2.png`. The production copy is `apps/web/public/illustrations/line-2.webp` (1536x1024, `cwebp -q 80`, 220,190 bytes, about 220 KB).

## Subject

Line 2 shows the Rotonde de la Villette, Claude-Nicolas Ledoux's toll house of the Barrière Saint-Martin, for Stalingrad station. Stalingrad is on Lines 2, 5 and 7, and Line 2 owns the shared `stalingrad` station ID because it is the lowest-numbered line there. East of the station, the Line 2 viaduct turns in a curve and counter-curve of 75 m radius to avoid the Rotonde (see `docs/research/line2.md`, [station 15, Stalingrad](../research/line2.md#15-stalingrad-shared-owner-line-2-strings-from-line5ts)). No other line illustration shows this building. It also connects with the line summary, which says that several Line 2 station names recall gates in the Wall of the Farmers-General.

## Reference checks

- [Rotonde de la Villette · Wikipédia](https://fr.wikipedia.org/wiki/Rotonde_de_la_Villette): Claude-Nicolas Ledoux, 1784 to 1788, also called the Barrière Saint-Martin, one of the toll barriers of the Wall of the Farmers-General. It held the offices of a receiver and several controllers, and a guard post. The building is square outside, in a Greek-cross plan, with a cylinder inside. Each facade has a portico of eight short, massive Tuscan pillars under an entablature and a low triangular pediment. The upper gallery has round arches and lintelled bays in serlianas on 40 paired Doric columns, under a Doric cornice with metopes and triglyphs. It stands on the Place de la Bataille-de-Stalingrad (19th arrondissement), facing the Bassin de la Villette, and has been a classified historic monument since 24 April 1907.
- [Wall of the Fermiers généraux · Wikipedia](https://en.wikipedia.org/wiki/Wall_of_the_Fermiers_g%C3%A9n%C3%A9raux) (the English "Rotonde de la Villette" page redirects here): Ledoux designed the wall's 55 barrières; the Barrière Saint-Martin, the Rotonde de la Villette, is one of the four that remain.
- [Ligne 2 du métro de Paris · Wikipédia](https://fr.wikipedia.org/wiki/Ligne_2_du_m%C3%A9tro_de_Paris), Tracé section: « courbe et contre-courbe de 75 m de rayon afin d'éviter la rotonde de l'architecte Claude-Nicolas Ledoux ».
- No reference image was passed to `image_gen`. The prompt describes the building in words only.

## Review of the result

The first attempt was accepted. No correction pass was needed.

The image shows the building that people know. A square stone block carries a projecting portico on each visible face, with plain square pillars under a low triangular pediment. A tall cylindrical drum rises from the centre. Its upper part is an open arcade of round arches on paired columns, under a plain cornice and a flat roof. The walls are plain ashlar with few ornaments, as on the building. Paving and a strip of water lie in front and to the right. The image has no text, people, vehicles or border.

These parts are simplified or generic:

- Each real portico has eight pillars. The image shows about six on each visible portico.
- The real gallery alternates round arches with lintelled bays (serlianas). The image shows round arches only, and the number of arches and paired columns was not checked against a source.
- The real cornice is Doric, with metopes and triglyphs. The image has a plain moulded cornice.
- The real roof slopes inwards like a funnel around a small open court that lights the interior. The image shows the top as a flat disc, as the prompt asked.
- The water runs close along the paving at the front right. The real building stands on a square, and the Bassin de la Villette begins on its north-east side, not as a channel along its front. Read the water as a reference to the basin, not as its true position.
- A small box at the back of the right-hand portico roof is not identifiable on the building.

Treat the image as an interpretation, not a measured drawing.

The wash is `#003ca6`, the Line 2 colour. The blue in the arcade openings, the portico shadows and the basin water is a little stronger than the washes on the earlier cards.

Do not add station names, counts or route information to the image. Keep the full 3:2 artwork inside the card image column.

## Prompt

No reference image was used. The output was 1536x1024 landscape.

```text
Use case: illustration-story. Asset type: route-card illustration for an elegant French Paris Métro station-name atlas, Line 2. Create a refined nineteenth-century copperplate engraving reinterpreted for a contemporary cultural journal. Subject: the real Rotonde de la Villette in Paris (Barrière Saint-Martin, Claude-Nicolas Ledoux, 1780s), a former toll house of the Wall of the Farmers-General, seen in a gentle three-quarter view so two faces of the base are visible. A massive square stone base; on each visible face a projecting portico of plain square pillars beneath a low triangular pediment. Rising from the centre, a tall cylindrical stone drum, its upper part ringed by an open arcade of round arches on paired columns, under a plain cornice and a low flat roof. Severe, geometric neoclassical forms, plain ashlar walls, few ornaments. No dome, no spire, no statues on the roof, no flag, no clock. A little paved ground and a faint hint of still water at one side, fading into blank paper. No people, no vehicles, no surrounding buildings, no trees in front of the building. Fine charcoal-brown engraved lines, precise delicate crosshatching, warm ivory paper #f5f1e8 with subtle grain. Very restrained muted dusty blue wash (toward #003ca6, soft and greyed) only in the arcade openings, portico shadows and the water. Wide 3:2 landscape composition, complete building centred with generous blank paper margins on all four sides, no border or frame. Match an old architectural atlas plate, credible proportions, no invented towers or wings. Absolutely no text, letters, numbers, inscriptions, station labels, logos, route diagrams, maps or watermark. Interpretive architectural artwork, not a measured drawing.
```

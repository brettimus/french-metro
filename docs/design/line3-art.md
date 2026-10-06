# Line 3 illustration notes

Generated with the Codex CLI built-in imagegen tool (`image_gen`, codex-cli 0.157.0), not the API fallback. The original PNG is stored in `docs/design/originals/line-3.png`. The production copy is `apps/web/public/illustrations/line-3.webp` (1536x1024, `cwebp -q 80`, 247,318 bytes, about 247 KB).

## Subject

Line 3 shows the Palais Garnier, the opera house that gives Opéra station its name. Opéra is on Lines 3, 7 and 8, and Line 3 now owns the shared `opera` station ID because it is the lowest-numbered line there (see `docs/research/line3.md`, [station 12, Opéra](../research/line3.md#12-opéra-shared-owner-after-insertion-line-3)). The Line 7 image shows a Gobelins tapestry loom, not the opera house, so no other line illustration shows this building.

The Line 3 colour changed from the coming-soon value `#837902` to the IDFM web colour `#6e6e00`, because white text on `#837902` has a contrast of 4.47:1, below WCAG AA (see the colour decision in `docs/research/line3.md`). The wash in the image uses the new colour.

## Reference checks

- [Palais Garnier · Wikipedia](https://en.wikipedia.org/wiki/Palais_Garnier): built for the Paris Opera from 1861 to 1875, opened 5 January 1875. The main facade faces south onto the Place de l'Opéra. A giant Corinthian order of coupled columns fronts the main-floor loggia, and gilded bronze busts of composers are between the columns. The title « Académie nationale de musique » is on the entablature of these columns. Charles Gumery's two gilded groups, L'Harmonie and La Poésie, crown the left and right avant-corps. Four multi-figure groups (Jouffroy, Guillaume, Carpeaux's La Danse, Perraud) decorate the bases of the two avant-corps. Aimé Millet's Apollo, Poetry and Music stands at the apex of the south gable of the stage house, with two Pegasus figures by Eugène-Louis Lequesne at the ends of the gable.
- [Opéra Garnier · Wikipédia](https://fr.wikipedia.org/wiki/Op%C3%A9ra_Garnier), section « Façade principale Sud » and the roof decoration: the large central dome is covered in copper, which turns green when it oxidises, and its lantern is gilded repoussé copper. Gumery's groups are 7.50 m high and were gilded by electroplating. A cast-iron frieze of masks and garlands, painted with a gold varnish, crowns the attic entablature. Apollo is natural bronze, and only the lyre is gilded. The loggia busts are by Louis-Félix Chabaud, and the medallions above the entrances are by Gumery.
- No reference image was passed to `image_gen`. The prompt describes the building in words only.

## Review of the result

The first attempt had gold on the rooftop groups and the attic frieze and a green dome. This matches the real building, but it breaks the house style of one colour wash per image. A second Codex pass edited the first image (attached as the edit target) with the prompt below. It removed the gold and green and kept one olive wash (`#6e6e00`) on the dome, the loggia shadows and the arch openings. The shipped image is the second result (`line-3-v2.png`, stored as `docs/design/originals/line-3.png`).

The image shows the building that people know. The ground floor has an arcade of round arches above broad steps. The loggia storey has coupled columns with composer busts in round medallions between them, then an attic band with carved cartouches. Winged gilded groups (here in ink) stand on the two end pavilions. Behind the facade a low ribbed dome with a crown sits in front of the triangular stage-house gable, and a single figure with a lyre stands at the gable apex. The image has no text, people, vehicles or border.

These parts are simplified or generic:

- The real facade has four large sculpture groups, two at the base of each avant-corps. The image puts a statue or group against almost every pier, so the four named groups, La Danse among them, cannot be identified.
- The Gumery medallions above the entrance arches are not shown.
- The dome is drawn larger and closer to the stage-house gable than on the building, and the Pegasus figures at the gable ends are only small, generic statues.
- On the building, the entablature above the loggia columns carries the inscription « Académie nationale de musique », and a gilded frieze of masks and garlands crowns the attic. The prompt excluded all text, and the edit pass removed the gilding, so the upper facade is plainer than the original.
- The left side elevation, with its round corner pavilion, is invented. The real side pavilions (the Pavillon de l'Empereur and the Pavillon des abonnés) project from the side facades, well behind the main front.
- The number of arches and bays follows the prompt, not a measured elevation. The arcade count was not checked against a source.

Treat the image as an interpretation of the main facade, not a measured drawing. The colour correction pass did not change the architecture.

Do not add station names, counts or route information to the image. Keep the full 3:2 artwork inside the card image column.

## Prompt

No reference image was used. The output was 1536x1024 landscape. The draft prompt asked for a wash toward `#837902`; it was changed to `#6e6e00` before the first run.

First pass:

```text
Use case: illustration-story. Asset type: route-card illustration for an elegant French Paris Métro station-name atlas, Line 3. Create a refined nineteenth-century copperplate engraving reinterpreted for a contemporary cultural journal. Subject: the real Palais Garnier opera house in Paris (Charles Garnier, 1861-1875), main facade seen in a slight three-quarter view from the front left. Broad steps up to a ground-floor arcade of seven round arches, with large high-relief sculpture groups standing against the piers. Above, a loggia storey of tall paired columns with round medallions between them, then a richly carved attic band with blank panels. Two gilded sculpture groups of winged figures stand at the two top corners of the facade. Behind the facade, a low shallow green dome over the auditorium, and further back the tall triangular stage-house gable topped by a single standing figure holding a lyre. Complete building visible, no cropped dome or gable, calm paving fading into blank paper. No people, no vehicles, no street lamps, no surrounding buildings, no trees. Fine charcoal-brown engraved lines, precise delicate crosshatching, warm ivory paper #f5f1e8 with subtle grain. Very restrained muted olive-gold wash (toward #6e6e00) only on the gilded corner groups, the dome and the architectural shadows. Wide 3:2 landscape composition, building centred with generous blank paper margins on all four sides, no border or frame. Match an old architectural atlas plate, credible proportions, no invented towers, no extra domes. Absolutely no text, letters, numbers, inscriptions, carved names, station labels, logos, route diagrams, maps or watermark. Interpretive architectural artwork, not a measured drawing.
```

Edit pass, with the first image attached:

```text
Edit the attached image (the first image is the edit target). Keep the same building, viewpoint, composition, architecture and margins exactly. Change only the colour treatment: remove all gold, gilding and green colour. Render the whole building, including the rooftop sculpture groups and the dome, in fine charcoal-brown engraved lines with delicate crosshatching on warm ivory paper #f5f1e8 with subtle grain, like the rest of the facade. Add one very restrained muted olive wash (toward #6e6e00) only on the dome, in the shadows of the loggia and in the arch openings. Leave a little more blank paper below the steps. No border or frame. Absolutely no text, letters, numbers, inscriptions, logos or watermark.
```

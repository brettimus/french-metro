# Line 9 illustration notes

Generated with the Codex CLI built-in imagegen tool (`image_gen`), not the API fallback. The original PNG is stored in `docs/design/originals/line-9.png`. The production copy is `apps/web/public/illustrations/line-9.webp` (1536x1024, `cwebp -q 80`, about 267 KB).

## Subject

Line 9 shows the Église Saint-Augustin. The Saint-Augustin station is named after Place Saint-Augustin, and the square is named after the church (see `docs/research/line9.md`, station 18). No other line illustration shows this building. It is the most recognisable single building on the route. Trocadéro was not chosen because the Chaillot and Eiffel Tower view is more closely linked to Line 6.

## Reference checks

- [Église Saint-Augustin de Paris · Wikipédia](https://fr.wikipedia.org/wiki/%C3%89glise_Saint-Augustin_de_Paris): Victor Baltard, built 1860 to 1871. The facade is narrow and the choir is very large because the site is irregular. The dome is more than 80 metres high. The iron and cast-iron frame removes the need for buttresses.
- [Patrimoine-histoire: Saint-Augustin](https://www.patrimoine-histoire.fr/Patrimoine/Paris/Paris-Saint-Augustin.htm): three round-arched entrance arcades, a sculpted frieze of Christ with the apostles by Jouffroy, statues in niches, a large rose window with a cast-iron frame, and four turrets around the dome.
- Structural reference photograph: [Paris, Saint-Augustin, Außenansicht (1).jpg · Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Paris,_Saint-Augustin,_Au%C3%9Fenansicht_(1).jpg). The generation used a downscaled copy only as an architectural reference. The photograph is not shipped.

## Review of the result

The output shows the real building. It has three round-arched portals and a row of apostle statues above them. The rose window sits deep inside a round arch, and one triangular gable has a cross and statues at its apex. The long nave has tall arched windows. The ribbed dome has small round dormers and a lantern with a cross, and domed turrets stand beside it. The front facade has no towers. The image has no text, people, vehicles or border. The lantern is an open, stylised form. The real lantern is a tall, narrow pointed form, so treat the image as an interpretation, not a measured drawing. The olive wash on the dome and rose window is slightly stronger than on the Line 4 image but about as strong as the Line 5 arch. No correction pass was needed.

Do not add station names, counts or route information to the image. Keep the full 3:2 artwork inside the card image column.

## Prompt

The reference photograph was loaded with `view_image` and passed to `image_gen` as a structural reference only (its architecture, not its photographic style, colours, cars, trees or people), with a 1536x1024 landscape output.

```text
Use case: illustration-story. Asset type: route-card illustration for an elegant French Paris Métro station-name atlas, Line 9. Create a refined nineteenth-century copperplate engraving interpreted for a contemporary cultural journal. Subject: the real Église Saint-Augustin in Paris (Victor Baltard, 1860-1871), seen in a three-quarter view from the front left, as in the reference photograph. Narrow tall stone front facade: at ground level three round-arched entrance arcades on short columns, with statues in niches on the flanking piers; above them a horizontal sculpted frieze of standing apostle figures in a row; above that one large circular rose window set deep inside a broad round arch; the facade ends in a single wide triangular gable pediment with a small cross and statues at its apex and small statues at its corners. No towers on the front facade. Behind, the long nave with tall round-arched windows recedes to the right towards the large ribbed dome on a tall drum ringed by arched windows, with small round dormer windows in the dome and a tall slender pointed lantern with a cross on top; small domed corner turrets stand beside the dome. Complete building visible, no cropped dome or gable, calm pavement and a few light ground hatchings fading into blank paper. No people, no vehicles, no street lamps, no surrounding buildings, no trees in front of the facade. Fine charcoal-brown engraved lines, precise delicate crosshatching, warm ivory paper #f5f1e8 with subtle grain. Very restrained muted olive-chartreuse wash (toward #b6bd00) only in the rose window, the dome and the architectural shadows. Wide 3:2 landscape composition, building centred with generous blank paper margins on all four sides, no border or frame. Match an old architectural atlas plate, credible proportions, no invented towers, no spires on the facade, no extra domes. Absolutely no text, letters, numbers, inscriptions, station labels, logos, route diagrams, maps or watermark. Interpretive architectural artwork, not a measured drawing.
```

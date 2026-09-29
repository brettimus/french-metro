# Line 6 illustration notes

Generated with the built-in imagegen tool through the Codex CLI. No CLI fallback was used. The original PNG is `docs/design/originals/line-6.png` (1536 × 1024). The production copy is `apps/web/public/illustrations/line-6.webp` (1536 × 1024, `cwebp -q 80`, about 305 KB).

## Subject

Line 6 shows the Pont de Bir-Hakeim with the elevated Line 6 viaduct on its upper level and the Eiffel Tower in the distant background. The viaduct crosses the Seine between Passy and Bir-Hakeim. The research notes in `docs/research/line6.md` record that Bir-Hakeim station took its name from the renamed bridge and that the bridge is registered ("inscrit") as a historic monument.

## Reference checks

- [Pont de Bir-Hakeim, French Wikipedia](https://fr.wikipedia.org/wiki/Pont_de_Bir-Hakeim): two levels, a lower deck for road and pedestrians and an upper viaduct for Line 6. The viaduct rests on metal colonnades, except at the Île aux Cygnes, where it rests on a masonry arch. Gustave Michel's groups *Les Nautes* and *Les Forgerons-riveteurs* stand on the piers. Built 1903 to 1905; inscribed as a historic monument in 1986.
- [Pont de Bir-Hakeim, English Wikipedia](https://en.wikipedia.org/wiki/Pont_de_Bir-Hakeim): two structures meet at the island; each has a central arch and two half-arches (30, 54 and 30 m on the wider arm) on stone masonry piers. It is a steel open-spandrel deck arch bridge.

## Review of the generated image

Accepted on the first attempt. The image shows three open-spandrel steel arches (a half-arch at each end and a wider central arch), two masonry piers with seated sculpture groups, the upper viaduct on a metal colonnade, a small train on the viaduct, a masonry arch at the island end and a distant Eiffel Tower. It contains no text, numbers or route information.

Known simplifications: the real viaduct columns stand in the middle of the deck, and the image draws them as a colonnade along the side. The pier sculptures are generic figures, not copies of Michel's groups. The hanging lamps and the train design are decorative. The view is an architectural interpretation, not a measured drawing or a record of a specific date. Do not use it as evidence for bridge details.

## Prompt

```text
Use case: illustration-story. Asset type: route-card illustration for an elegant French Paris Métro station-name atlas, Line 6. Create a refined nineteenth-century copperplate engraving reinterpreted for a contemporary cultural journal. Subject: the real Pont de Bir-Hakeim over the Seine in Paris, a two-level bridge, seen in a graceful oblique side view across the water. Lower level: a road and footway deck carried on three open-spandrel steel arches, a shorter half-arch at each end and a wider central arch, resting on two massive stone masonry piers in the river with carved stone sculpture groups on the piers. Upper level: a straight elevated metro viaduct running above the centre of the lower deck, carried on regular rows of slender paired metal columns, with a small simple Paris metro train on the viaduct. At the far end the viaduct passes over a stone masonry arch on a small tree-lined island. The Eiffel Tower stands in the distant background to one side, lightly drawn and smaller than the bridge, so the bridge stays the main subject. Accurate bridge form: no suspension cables, no towers on the bridge, no invented domes, no extra decks, no cars. Quiet ripple engraving on the river, a few trees on the banks. Fine charcoal-brown engraved lines, precise delicate crosshatching, warm ivory paper #f5f1e8 with subtle grain. Very restrained soft mint-green wash (toward #6eca97) on the steel arches, the viaduct columns and faint reflections only. Wide 3:2 landscape composition, complete bridge visible with generous blank paper margins, river and bank lines fading toward the edges. Match an old architectural atlas plate, refined and quiet, no decorative frame. Absolutely no text, letters, numbers, logos, route diagrams, maps or watermark. Interpretive architectural artwork, not a technical drawing.
```

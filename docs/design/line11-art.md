# Line 11 illustration notes

Generated with the Codex CLI built-in imagegen tool (`image_gen`, codex-cli 0.157.0), not the API fallback. The original PNG is stored in `docs/design/originals/line-11.png`. The production copy is `apps/web/public/illustrations/line-11.webp` (1536x1024, `cwebp -q 80`, 87,532 bytes, about 88 KB).

## Subject

Line 11 shows a Chappe optical telegraph station on a hilltop. Télégraphe station is named after Rue du Télégraphe. Claude Chappe set up his telegraph near the top of the Belleville hill in September 1792 and again in July 1793 (see `docs/research/line11.md`, [station 11, Télégraphe](../research/line11.md#11-télégraphe)). No source describes the Belleville apparatus in detail, so the image shows a generic Chappe station, not the exact 1792 or 1793 installation (plan decision 6 in the audit).

## Reference checks

- [Rue du Télégraphe · Wikipédia](https://fr.wikipedia.org/wiki/Rue_du_T%C3%A9l%C3%A9graphe): the telegraph was installed there by Claude Chappe in September 1792 and then July 1793. It stood on the site of the present Belleville cemetery (no. 40). The street is the highest point of the public space of Paris, 128.508 m.
- [Télégraphe Chappe · Wikipédia](https://fr.wikipedia.org/wiki/T%C3%A9l%C3%A9graphe_Chappe): the signal has a central beam (régulateur, 4.60 m by 0.35 m) and two arms (indicateurs, 2 m by 0.30 m). Both have fixed louvres (persiennes) to reduce wind resistance. Each arm has a counterweight (fourchette). An operator inside works a manipulateur, and cables over pulleys carry the motion to the signal. Stations were square towers, round towers, pyramidal towers or apparatus on church steeples. The article places the early trials at Ménilmontant, near Belleville, close to Rue du Télégraphe, before the Paris to Lille line of 1794.
- [Semaphore line · Wikipedia](https://en.wikipedia.org/wiki/Semaphore_line): each 2 m arm has seven positions and the 4.6 m cross bar four angles, 196 combinations in all. The counterweights on the arms let two handles control the system.
- No reference image was passed to `image_gen`. The prompt describes the mechanism in words only.

## Review of the result

The orchestrator reviewed the first attempt and accepted it. The image shows a square stone hut with a pyramidal roof on a grassy hilltop. A tall wooden mast rises from the roof. At its top a long beam turns on a central pivot, and a shorter arm turns at each end of the beam. The beam and both arms have slatted panels, which match the louvres in the sources. The left arm is raised and the right arm points down, so the mechanism reads as a signal. Ropes run from the beam and a pulley on the mast down to the hut roof. There is no text, no people, no wires and no border. The copper-brown wash (toward #8d5e2a) stays on the wood and the shadows.

These parts are simplified or generic:

- The counterweights hang as blocks on short cords below the arm pivots. A real fourchette is a rigid counterweight fixed to the arm on the other side of its pivot, so the hanging weights are not accurate.
- The ropes end at the roof edge and look partly like guy lines. In a real station the cables pass through the roof to the manipulateur inside. The image does not show that path clearly.
- The hut, its single window and door, and the proportions of mast to beam are invented. They are not taken from a drawing of the Belleville station.
- The village and domed building in the background are generic. They do not show a real view from Belleville.

Treat the image as a generic Chappe station and an interpretation, not a technical drawing. No correction pass was needed.

Do not add station names, counts or route information to the image. Keep the full 3:2 artwork inside the card image column.

## Prompt

No reference image was used. The output was 1536x1024 landscape.

```text
Use case: illustration-story. Asset type: route-card illustration for an elegant French Paris Métro station-name atlas, Line 11. Create a refined late-eighteenth-century copperplate engraving reinterpreted for a contemporary cultural journal. Subject: a Chappe optical telegraph station of the 1790s, as on the hill of Belleville in Paris, seen in a three-quarter view. A small square stone tower with a low pitched roof; rising from the roof, a tall wooden mast. At the top of the mast, a long horizontal wooden beam pivots at its centre, and at each end of the beam a shorter wooden arm pivots, the beam and arms made of slatted louvre panels with counterweights. Fine ropes run from the beam and arms down the mast into the hut. One arm is raised at an angle, so the mechanism reads as a signal. A grassy hilltop with a few faint distant trees and rooftops below, fading into blank paper. No people, no electric wires, no antennas, no flags. Fine charcoal-brown engraved lines, precise delicate crosshatching, warm ivory paper #f5f1e8 with subtle grain. Very restrained muted copper-brown wash (toward #8d5e2a) only on the wooden beam, the arms and the architectural shadows. Wide 3:2 landscape composition, complete tower and mechanism visible with generous blank paper margins on all four sides, no border or frame. Match an old encyclopaedia plate, credible proportions, no invented machinery. Absolutely no text, letters, numbers, inscriptions, station labels, logos, route diagrams, maps or watermark. Interpretive historical artwork, not a technical drawing.
```

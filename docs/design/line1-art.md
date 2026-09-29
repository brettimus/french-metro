# Line 1 illustration notes

Generated with the built-in imagegen tool through the Codex CLI. No CLI fallback and no API key were used. The original PNG is `docs/design/originals/line-1.png` (1536 × 1024). The production copy is `apps/web/public/illustrations/line-1.webp` (1536 × 1024, `cwebp -q 80`, about 240 KB).

## Subject

Line 1 shows the Arc de Triomphe de l'Étoile, above Charles de Gaulle – Étoile station (see `docs/research/line1.md`, station 7). The view is a slight three-quarter view of one main face and one side face.

## Reference checks

The [English Wikipedia article on the Arc de Triomphe](https://en.wikipedia.org/wiki/Arc_de_Triomphe) gives these facts:

- The monument is 49.54 m high, 44.82 m wide and 22.21 m deep. The side faces are about half the width of the main faces.
- A large central vault (29.19 m high, 14.62 m wide) goes through the main faces. Smaller transverse vaults (18.68 m high, 8.44 m wide) go through the side faces.
- Four large sculptural groups stand at the base of the main-face pillars, one on each pillar.
- A sculpted frieze and an attic with 30 shields are at the top. The shields carry the names of battles.
- The top is flat. No quadriga or crowning statue was built.

The generated image agrees with these points. The image has a flat top, one main vault, a smaller side vault, one group on each main-face pillar, relief panels above the groups, a frieze and an attic with round shields. The shields are blank on purpose, because the image must not contain text. The sculptural groups and relief scenes are generic figures. They do not copy the real works by Rude, Cortot or Étex. The image is an architectural interpretation, not a measured drawing. It does not show the Tomb of the Unknown Soldier, the flag or the traffic around the monument.

The image has no station names, counts or route information. The first result was accepted without a correction pass.

## Prompt

```text
Use case: illustration-story. Asset type: route-card illustration for an elegant French Paris Métro station-name atlas, Line 1. Create a refined nineteenth-century copperplate engraving reinterpreted for a contemporary cultural journal. Subject: the real Arc de Triomphe de l'Étoile in Paris, seen in a gentle three-quarter view so one main face and one narrower side face are visible. The main face has a single very tall round-arched central vault; the narrower side face has a smaller, lower round-arched transverse vault. Massive plain rectangular stone pillars; on the main face, each of the two pillars carries one large high-relief sculptural group on a tall base at its lower half, with a smaller rectangular relief panel above it. A deep cornice, a continuous sculpted frieze band, and a tall plain attic with a row of small blank round shields. The top is completely flat with a simple balustrade-free edge: no statue, no quadriga, no dome, no flag. Overall block proportions about as tall as it is wide, with the side face about half the width of the main face. A little paved ground and a few faint tree hints at the far edges, fading into blank paper. No people, no vehicles, no surrounding buildings. Fine charcoal-brown engraved lines, precise delicate crosshatching, warm ivory paper #f5f1e8 with subtle grain. Very restrained soft golden-yellow wash (toward #ffcd00, muted and dusty) in the arch soffits and architectural shadows only. Wide 3:2 landscape composition, complete monument centered with generous blank paper margins on all four sides, no border, no frame. Match an old architectural atlas plate, credible proportions, no invented towers or ornaments. Absolutely no text, letters, numbers, inscriptions, names on the shields, station labels, logos, route diagrams, maps or watermark. Interpretive architectural artwork, not a measured drawing.
```

The Codex instruction around the prompt was: "Use the imagegen skill with the built-in image_gen tool (landscape 1536x1024) to generate this image, then copy the final PNG to docs/design/originals/line-1.png. Do not use the CLI fallback or any API key. Do not modify any other files."

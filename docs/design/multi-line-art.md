# Multi-line illustration notes

## Assets

- `docs/design/originals/line-7.png`: Gobelins high-warp loom with floral tapestry and a botanical specimen.
- `docs/design/originals/line-14.png`: Madeleine temple and a separate BnF tower vignette.

Both files are 1536 × 1024 PNG images. They were generated with the built-in imagegen tool. The original generated files remain in the Codex image directory. No CLI fallback was used.

## Source checks and limits

The [Mobilier national account of the Gobelins](https://www.mobiliernational.culture.gouv.fr/fr/nous-connaitre/les-manufactures/manufacture-des-gobelins) describes upright high-warp weaving. Its [historical loom article](https://collection.mobilier-national.fr/encyclopedie/les-anciens-metiers-a-tisser-des-gobelins) gives a period reference. The loom image is an interpretation, not a technical record. The floral pattern and botanical specimen are decorative, not identified historic objects or species.

The [City of Paris account of Madeleine](https://www.paris.fr/pages/la-madeleine-n-a-ni-croix-ni-clocher-25919) identifies its temple form, 52 Corinthian columns, and lack of a spire or roof cross. The [BnF architecture account](https://www.bnf.fr/fr/le-site-francois-mitterrand) identifies four angular towers that suggest open books. The image shows the correct broad forms. It is not a measured architectural drawing. The two sites are separate vignettes; their positions do not show distance or location.

Both images have no labels, route lines, station counts, or factual captions. Do not use generated artwork as a map.

## Home-page concept review

Use `multi-line-home-concept.png` only for its paper texture, fine engraving style, restrained color, and clear type hierarchy. Its station counts, endpoints, labels, route geometry, and skyline are not data. Keep all route facts in the typed data modules. Avoid the large decorative skyline, compass-like markings, and arbitrary polygon borders. Give the route names and route choices more visual weight than decoration.

Use the images at their 3:2 ratio with `object-fit: contain`. Cropping can remove useful subjects. A pale paper surround works better than a strong colored panel. Keep route numbers, names, and counts as real HTML outside the images. Suggested alternatives: “Tapestry loom and botanical study” / “Métier à tapisserie et étude botanique”; “Madeleine church and the four library towers” / “Église de la Madeleine et les quatre tours de la bibliothèque”.

## SVG subjects

`src/illustrations.ts` imports the shared `Art` union and covers every kind with a typed record. Subjects include a classical temple, station train shed, open-book towers, botanical stem, market stall, modern building forms, plane, loom, biography medallion with quill, gate, bridge and river, public square, piano, and care symbol. These symbols show subject categories. They are not exact buildings. The biography medallion is blank and makes no claim to show a person's appearance. The care symbol is neutral in color.

Both exports set `aria-hidden="true"` and `focusable="false"`. `ornament` uses native nested SVG rather than `foreignObject`. Class input is escaped before HTML output. No text or station identity is embedded in the drawings.

## Exact generation prompts

### Line 7

```text
Use case: illustration-story.
Asset type: refined editorial illustration for a French metro station-name atlas, Line 7.
Primary request: A beautifully observed Gobelins high-warp tapestry loom with a small botanical specimen, as a fine nineteenth-century copperplate engraving reinterpreted for a contemporary cultural journal.
Subject: A substantial wooden upright haute-lisse tapestry loom in three-quarter view. Two heavy upright posts, upper and lower horizontal rollers, many taut vertical warp threads, a half-woven floral tapestry on the lower warp and small suspended bobbins. The tapestry belongs within the loom, not a carpet thrown across its frame. On the right, a separate delicate botanical specimen of a flowering plant, roots and leaves, inspired by a natural-history plate. A few thread bobbins at the base. No people.
Style: exceptionally fine charcoal-brown engraved linework, restrained crosshatching, precise timber joints, quiet detailed craftsmanship. Delicate dusty pink touches only within woven flowers and botanical petals. Warm ivory paper #f5f1e8, faint natural paper grain, no stains.
Composition: wide 3:2 landscape image; entire subjects visible; loom fills left two thirds, botanical plate fills right third; generous blank paper around edges; visually balanced and grounded, soft fade of ground marks. Match an elegant Parisian printed atlas.
Constraints: absolutely no text, no letters, no numbers, no labels, no route diagrams, no maps, no compass, no decorative frame, no generic buildings, no watermark. Interpretive editorial artwork, not a technical diagram.
```

### Line 14

```text
Use case: illustration-story.
Asset type: refined editorial illustration for a French metro station-name atlas, Line 14.
Primary request: An elegant architectural copperplate engraving montage of the church of La Madeleine in Paris and the Bibliothèque nationale de France François-Mitterrand.
Subject: Left foreground, the actual Madeleine church as an elongated classical Corinthian temple, eight columns across its front portico beneath a triangular sculpted pediment, tall continuous side colonnade, massive stone base and broad front steps. No dome, no spire, no roof cross. Show a carefully proportioned front and right-side three-quarter view. Right background as a separate vignette, exactly four angular L-shaped glass library towers resembling open standing books, at corners around the BnF central garden. The four towers have the same architectural height; perspective can reduce the distant pair. Clearly draw each tower with its open-book two wings, not plain skyscrapers.
Style: exceptionally fine charcoal-brown engraved linework, restrained crosshatching, convincing stone and glass details, a contemporary cultural journal's interpretation of nineteenth-century engraving. Very subtle muted purple washes only within library glazing and shadows. Warm ivory paper #f5f1e8 with faint grain, no stains.
Composition: wide 3:2 landscape; complete buildings visible, generous paper margins; temple occupies left two thirds and library vignette right third, separation with blank paper and soft faded ground lines so these places are not presented as neighbours. Balanced and quiet, fine details legible at card size.
Constraints: absolutely no text including inscriptions, no letters, no numbers, no labels, no route diagram, no map, no compass, no decorative frame, no watermark. Do not add any generic skyline or invented buildings. Interpretive editorial montage, never a geographic representation.
```


## Verification

Inspected both generated PNG files. Rendered and inspected all 14 SVG subjects together with librsvg. A runtime check confirmed that each subject produces content, hides decoration from assistive technology, and avoids foreignObject in ornaments. The full type check currently reports only missing line7 and line14 data modules, which other workers own. No error remains in illustrations.ts.

Production uses WebP copies encoded at quality 88, with the same dimensions and composition. The original generated PNGs remain in `docs/design/originals/`.

# Lines 4 and 5 illustration notes

Generated with the built-in imagegen tool. Original PNG files are stored in `docs/design/originals/`; production WebP copies are stored in `apps/web/public/illustrations/`.

## Subjects and review

Line 4 shows an interpretation of Saint-Sulpice. Its two unequal towers and colonnaded facade were checked against the [parish architecture account](https://www.paroissesaintsulpice.paris/art-et-architecture/) and a [facade photograph](https://www.unjourdeplusaparis.com/paris-culture/eglise-saint-sulpice-paris). The first generated version added a dome, lantern and cross to the north tower. It was rejected. A targeted edit uses the reference photograph to restore flat cylindrical tower tops. The photograph is reference material only and is not shipped.

Line 5 shows the Austerlitz viaduct with two steel arch ribs, a suspended railway deck and no central river pier. The route crossing and connection to the railway station are supported by [RATP's station history](https://www.ratp.fr/decouvrir/patrimoine/histoire-station-gare-austerlitz). The image is an architectural interpretation, not evidence for an exact train, date or view.

Neither image contains station names, counts or route information. Keep the complete 3:2 artwork inside the card image column.

## Line 4 initial prompt

```text
Use case: illustration-story. Asset type: route-card illustration for an elegant French Paris Métro station-name atlas, Line 4. Create a refined nineteenth-century copperplate engraving interpreted for a contemporary cultural journal. Subject: the west facade of the real Saint-Sulpice church in Paris, viewed almost frontally with a very slight three-quarter angle, its broad two-storey classical colonnaded front and two visibly unequal towers, north tower a little taller and more ornate, south tower lower and plainer. Complete building visible with no cropped tower, calm broad steps and a little ground crosshatching fading into blank paper. No people, no vehicles, no surrounding buildings. Fine charcoal-brown lines, precise delicate crosshatching, warm ivory paper #f5f1e8 with subtle grain. Very restrained dusty magenta wash in architectural shadows only. Wide 3:2 landscape composition, building centered with generous blank margins on all four sides, no border. Match an old architectural atlas plate, credible proportions, no fantasy towers, no domes added. Absolutely no text, letters, numbers, station labels, logos, route diagrams, maps or watermark. Interpretive architectural artwork, not a measured drawing.
```

## Line 4 correction prompt

```text
Edit target: first image, the generated copperplate engraving. Second image is a structural reference photograph of the real Saint-Sulpice church; use it only to correct architectural forms, do not copy its photographic style or framing. Keep the first image's warm paper, magenta shadows, landscape composition, full-building framing and fine engraved style. Correct only the front towers to resemble the reference: both towers end in round, flat balustraded cylindrical tops. Remove the invented dome, lantern, cross and clock from the left tower. Both towers should be nearly equal in height, left slightly taller and more ornate, right plainer. Each has a square lower belfry stage and a round upper stage, as the photo shows. The left lower stage has a triangular pediment over its opening; the right lower stage has a simple rectangular opening below a curved pediment. Preserve the rest of the facade, steps and empty paper. No text, no people, no new architectural additions.
```

## Line 5 prompt

```text
Use case: illustration-story. Asset type: route-card illustration for an elegant French Paris Métro station-name atlas, Line 5. Create a refined nineteenth-century copperplate engraving reinterpreted for a contemporary cultural journal. Subject: Paris's Viaduc d'Austerlitz over the Seine, a long single-span steel arch railway bridge with two high parallel arched lattice ribs above the railway deck, fine vertical suspension members, no central pier in the river. Show a graceful oblique side view of the full span and both stone abutments. A small simple Paris metro train on the deck, quiet ripple engraving below, and only a faint hint of station roof beyond one end. The bridge structure, not the train, is the main subject. Accurate broad bridge form, no suspension cables or towers, not a road bridge, no vehicles. Fine charcoal-brown engraved lines, precise delicate crosshatching, warm ivory paper #f5f1e8 with subtle grain. Very restrained soft terracotta-orange wash on the steel arch and reflected shadows. Wide 3:2 landscape composition, complete bridge visible with generous blank paper margins, ground and river lines fading toward the edges. Match an old architectural atlas plate, refined and quiet, no decorative frame. Absolutely no text, letters, numbers, logos, route diagrams, maps or watermark. Interpretive architectural artwork, not a technical drawing.
```


## Inline symbol cleanup

The BnF open-book tower symbol is now reserved for Bibliothèque François-Mitterrand. Other urban subjects use a neutral building symbol. Maison Blanche uses a simple house. The classical temple remains with Madeleine; other churches use a generic church symbol. These are category drawings, not reconstructions of a historic building.

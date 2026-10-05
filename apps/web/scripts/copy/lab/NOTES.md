# Copy lab notes

## Iteration 1: s7-opening (KEEP)

- **Hypothesis:** S7 (QWK 0.146) gave level 4 to every context note except one. The editors give level 2 to a note whose only station facts are opening dates (of the station, its platforms or its line section), and level 3 to a note where a network-wide renovation takes most of the space. The baseline levels do not say this.
- **Change:** only the S7 question. The question now tells Jev to test each station fact: "could the same sentence be written about most other stations?" Level 2 names opening dates of platforms and line sections, standard tiling styles and renovations. Level 3 adds "one specific fact next to generic facts". Level 4 names examples of station-only facts. All example sentences are new (not dev texts).
- **Result (dev):** primary 0.501 -> 0.600. S7 0.146 -> 0.863 (exact 0.86, bias -0.14). Side effects in the same request: S2 0.633 -> 0.652, S5 0.638 -> 0.593, native 0.295 -> 0.247. Tell F1 0.692 (same), planted recall 7/15 (same).
- **Decision:** KEEP (+0.099, guard holds).
- **Learned:** S7 has only 14 dev items (7 pairs, EN and FR always have the same label), so one pair moves S7 QWK by a large amount. The level text was written from the dev errors (Michel-Ange-Auteuil, Concorde); expect less gain on test. Campo-Formio (label 4, an unusual event at opening) now gets 3, so "opening" wording pushes some good notes down. A change to one Score in a request also moves other Scores in the same request (S5 -0.045), so compare all dims after each wording change.

# Copy calibration labels

Saved on 2026-10-05 from the session scratchpad.

- `mine-en.json`: grades from one Claude editor for the English calibration sample.
- `mine-fr.json`: grades from a second Claude editor for the French calibration sample.
- `agree.ts.txt`: the script that compared Jev with these grades. It is kept for reference only. Its paths point to the old scratchpad.

The grades were made against the copy at commit `d085bdd`, with question set `.5`. The S7 rule changed after the grading, so do not use the S7 grades.

## Round 3

Saved on 2026-10-05. Graded on the copy at commit `1d5b4ed`, with question set `.6` (the current S7 "namesake" rule).

- `round3-sample.json`: the 40 pairs with the texts the editors saw.
- `round3-editor-A.json`, `round3-editor-B.json`: the grades of two Claude editors, in the same format as the calibration files.
- `round3.json`: the final labels. A third agent decided each disagreement (42 in total). Its `agreement` field has the A/B agreement per dimension; the weakest were L1 (0.67 exact), S5 (0.82), native (0.83) and S7 (0.88).

`../build-dataset.ts` turns these files into `../dataset.json`.

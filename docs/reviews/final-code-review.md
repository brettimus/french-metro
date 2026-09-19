# Four-line code review

Reviewed the integrated source on 19 September 2026. This review did not change application files or generated assets. Browser checks belong to the UI review.

## Finding

**P2: the right arrow selects the left branch at Maison Blanche.** In `apps/web/src/app.ts:182`, the map key handler selects `next[1]` for ArrowRight when there are two next stations. Line 7 orders the next stations as Porte d’Italie, then Le Kremlin-Bicêtre. The map places Porte d’Italie at x590 and Le Kremlin-Bicêtre at x210. Maison Blanche is at x450.58. Thus ArrowRight moves focus to the left branch. ArrowLeft moves back to Tolbiac and cannot select that left branch.

To reproduce: open either language of Line 7, focus Maison Blanche on the map, then press the right arrow. The focus moves to Le Kremlin-Bicêtre on the left. This conflicts with the visible layout and the instruction to use arrow keys between stations.

Select the branch by its map position for left and right arrows. Keep up for the preceding station. Add a small check for fork direction; the current graph tests verify neighbours but do not verify keyboard selection.

## Checks

- `bun test`: 29 passed, 0 failed, 1,294 assertions.
- `bun run typecheck`: passed.
- Confirmed 110 station entries, four registered lines, complete route paths, valid terminus positions and both Line 7 branches.
- Checked route parsing, escaped text, local asset path bounds, HTTP 404 behaviour and successful HEAD responses. No further concrete defect found in those paths.
- Checked search filtering, list keyboard movement, read-state storage, source links, native dialog handling, and the mobile header/card rules.

## Browser checks to retain

The unit suite does not execute the application DOM or browser history. Retain explicit UI checks for these sequences:

1. Open a station from the map, move through several entries, close it, then use Back and Forward.
2. Repeat after switching the dialog language. The stored modal origin retains its original locale, so close uses a different history path after a language change. Confirm that the resulting Back/Forward behaviour is acceptable.
3. Open a direct station URL, move to the next station, close it, and use Back.
4. Search for one station, open it, move to a station excluded by the filter, then close. Confirm that keyboard focus returns to a visible control.
5. Check the Line 7 fork with both horizontal arrow keys after the direction fix.

These are test requirements, not additional confirmed findings. Source support and historical prose are covered by the separate content review.

## Resolution

The fork now uses map coordinates for horizontal arrow keys. A focused test checks left, right, up and terminal behaviour. The final browser review confirmed Left selects Le Kremlin-Bicêtre, Right selects Porte d’Italie, and Up selects Tolbiac.

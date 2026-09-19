# Four-line release plan

## Order and ownership

1. **Home alignment.** A scoped frontend worker separates each image from its mini route, aligns card rows and checks long titles. Root checks the result and publishes the first polish release.
2. **Copy panel.** A copy worker gathers independent views from an English editor, a French editor and a concise-UX editor. It may use pi with `glm-5.3-flash` on `fp-op-gateway` for another view. No secrets or private context enter prompts. Root accepts only changes that preserve source support. Avoid em dashes; retain correct spelling of station names.
3. **UI states.** A separate worker defines the state inventory and checks visual hierarchy, information load, icons, focus, motion and responsive layouts. It records screenshots and concrete findings. Root applies shared-code fixes.
4. **Lines 4 and 5.** Two research workers each own one data module and source audit. Each checks the current complete route against transit sources and traces each station's naming chain. Root extends route registration and creates matching line illustrations with the imagegen skill. All text is bilingual, direct and brief.
5. **Full QA and second review.** Cross-review the new histories. Run a final copy panel and independent code review. Check the full UI-state matrix in French and English. Correct findings, rebuild, commit, push and deploy.
6. **Delivery.** Verify public health, direct station links, images, and browser behavior. Send final screenshots through klaxon, with machine, task and outcome. Stop any local preview server started for this work.

Each worker sets and completes a goal for its slice. Root owns commits, deployments, shared contract changes and final verification. Workers run in separate threads with explicit file ownership.

## Acceptance checks

- Four available lines, sorted 4, 5, 7, 14. Only unfinished lines remain marked coming soon.
- Images retain their 3:2 composition. Mini routes stay within their own column. Cards align when titles have different lengths.
- Complete line and station URLs in both locales, correct termini and branch graph, valid search and previous/next navigation.
- Station text starts with the naming explanation. Context adds a useful fact rather than repeating the explanation. Sources and qualified uncertainties remain visible.
- No em dashes in displayed copy. No unsupported historical additions from copy reviewers.
- No horizontal overflow at 320, 390, 768, 1024 and 1440 pixels. Check enlarged text, reduced motion, keyboard focus, native dialogs and touch-sized controls.
- Screenshots cover home, map, branch, filtered list, empty search, station, expanded sources, About and error states. Include language changes, first/last stations, Back/Forward, copied-link feedback and read/reset state.
- Unit tests validate complete routes and source contracts; browser checks validate interactions and visual bounds. Public deployment verifies the selected commit.

## Implementation record

- Home alignment deployed first as `5737f25`. Images and mini routes occupy separate bounded columns; nested grid rows align the cards.
- The first copy panel used three independent GLM reviews. Its accepted changes shorten prose and clarify control intent. See [copy panel](reviews/copy-panel.md).
- The UI-state audit led to larger controls, a two-row mobile header, larger secondary text, a sticky station header, accurate filtered counts, a quieter future-line row and more appropriate illustration symbols.
- Line 4 adds 29 entries; Line 5 adds 22. All four lines provide 110 bilingual station entries. The route model supports both Line 7 branches and the two river arms around Cité on Line 4.
- The code review found a reversed keyboard choice at the Line 7 fork. `mapNeighbour` now selects branches by their visible horizontal position. A regression test checks both directions and the upstream station.
- Generated Saint-Sulpice artwork received a structural correction before use. PNG originals and prompts remain in the repository; the app serves smaller WebP files.

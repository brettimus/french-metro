# Final copy panel: four lines

Review date: 19 September 2026. Read-only review of the app and all 110 line-specific entries across Lines 4, 5, 7 and 14. This report is separate from the historical source audits and functional/browser QA.

## Method

Two fresh independent pi reviews used `fp-op-gateway / glm-5.3-flash`, one English editor and one native French editor. Both received public interface strings and station text, source links and biography links. Tools, session storage, skills, context files and prompt templates were disabled. Each reviewer was instructed to preserve source qualifications, avoid new facts and prioritize at most ten concrete changes. A Codex editor separately read all new entries, compared shared stations and inspected the current UI label usage.

## Corrections accepted and applied by root

### Line 5: Stalingrad, etymology in both languages

The existing sentence can suggest the name commemorates the whole war's outcome. The Line 7 entry correctly names the particular battle. Use:

- EN: “Called Stalingrad after the neighbouring square, now Place de la Bataille-de-Stalingrad. The name commemorates the Soviet victory over Nazi Germany at Stalingrad during the Second World War.”
- FR: “La station doit son nom à la place voisine, aujourd’hui place de la Bataille-de-Stalingrad. Ce nom commémore la victoire soviétique sur l’Allemagne nazie à Stalingrad pendant la Seconde Guerre mondiale.”

[The station source](<https://fr.wikipedia.org/wiki/Stalingrad_(m%C3%A9tro_de_Paris)>) explicitly connects the square and station name to the battle.

### Line 5: Richard-Lenoir, etymology.fr

The pronoun in “après sa mort” can refer to Richard rather than his associate. Replace only this phrase with “après la mort de ce dernier”. This is a referent correction, not a new historical claim. The English sentence already identifies the deceased associate.

### Line 5: Oberkampf, context.fr

The subject of “il reçoit le titre de manufacture royale” appears to be Oberkampf himself. Replace this sentence with:

“En 1783, l’atelier reçoit le titre de manufacture royale.”

[The museum source](https://www.museedelatoiledejouy.fr/collections/oeuvres/) states that the manufacture received the title in 1783.

## Cross-line and control checks

- Shared stations reviewed: Gare du Nord, Gare de l’Est, Châtelet, Stalingrad, Place d’Italie, Pyramides and Maison Blanche.
- Their differing contexts are legitimate line-specific histories. They do not need identical paragraphs. Stalingrad's missing battle location is the only naming discrepancy found in this comparison.
- Gare de l’Est Line 4 explains the railway's old name; Lines 5 and 7 explain the Verdun subtitle. These are complementary accounts, not contradictory ones.
- Biography labels in the new data identify the people discussed. Vavin's English link leads to a French parliamentary source; the interface does not promise English-language sources.
- The source and biography links carry external-link markers. “Further reading” does not promise all sources are biographies or all are in the selected language.
- The progress control now counts opened entries, which matches its behavior. It does not claim confirmed reading.
- The source-date label is valid for the task date. It must not be changed based on a reviewer's assumed current date.
- A scan of the evaluated data and interface strings found no em dash.
- Optional copy cleanup should not remove the qualified origins of Cadet, Château-Landon, Château Rouge or Montrouge.

## Additional trims accepted and applied by root

These remove repeated copy without changing facts:

- Line 4, `mairie-de-montrouge`, etymology.en: “Called Mairie de Montrouge because it serves the town hall of Montrouge. Mairie means town hall.” Delete the general claim about several suburban stops.
- Same entry, etymology.fr: “La station s’appelle Mairie de Montrouge parce qu’elle dessert l’hôtel de ville.” The second sentence restates that a town hall is a local landmark.
- Line 4, `vavin`, context.en: “He continued to serve as a representative after the revolution of 1848, during the Second Republic.” Its current first sentence repeats the career change from the name explanation.
- Same entry, context.fr: “Après la révolution de 1848, Vavin poursuit son activité de représentant au sein des assemblées de la Deuxième République.”

The longest combined name explanation and context among the new entries is 66 words. There is no reason to reduce accurate names, dates or qualifiers solely to meet a word target.

## Fresh French panel decisions

The French reviewer independently found no shared-station contradiction and no biography-link mismatch. It also identified Richard-Lenoir's ambiguous death pronoun, already corrected.

Accepted and applied by root as grammar polish:

- Line 4, Montparnasse, etymology.fr: “La station associe le nom du quartier de la gare à celui de l’ingénieur Fulgence Bienvenüe.” This is clearer than associating the district itself with a name.
- Line 7, Pierre et Marie Curie, context.fr: replace “Ouverte en 1946, celle-ci…” with “Ouverte en 1946, la station…”. The current referent is recoverable, but the noun is clearer.

Rejected or not required:

- The reviewer proposed parenthetical plurals for progress. The actual UI displays a ratio, such as “1 / 38 notices ouvertes”, rather than “1 notices ouvertes”. Parenthetical endings would add visual clutter and do not address the rendered format.
- Its September 2026 concern is resolved by the actual review date.
- Its Corentin Cariou suggestion applied a present-day council term to historical office and claimed city-wide election without source support. Do not introduce that change.
- Its proposed Les Halles wording distinguishes market from halls more strongly than the existing naming explanation requires. The current paragraph already identifies the wholesale market.
- Its North Sea change for Marcadet–Poissonniers would turn a broad geographic statement into a more specific one. Do not harmonize two separate source accounts without evidence.
- Its typography suggestion to rewrite all station display names is outside this copy pass. Correct route identifiers and sourced proper names take priority over mechanical normalization.
- An extra Marguerite de Rochechouart biography link could be useful, but “Further reading” does not claim to list every person named. It is not a missing-function defect.

## English panel limit and final outcome

The fresh English GLM process produced no output after eight minutes. It was stopped, with no retry. Its stdout file was confirmed before terminating that specific process. This report does not count the timed-out call as a completed review.

English evidence consists of the Codex editor's full read of the 51 new entries, comparison of the seven shared-station groups, and the earlier completed independent English GLM panel for Lines 7 and 14. The fresh French panel completed successfully. Root applied all three required corrections and the four optional bilingual/grammar trims listed above.

No additional release-blocking copy issue remains from this review. The data and interface contain no em dashes. No application files were edited by this final-review thread; root integrated the accepted changes. Browser, build and deployment checks belong to their separate QA owners.

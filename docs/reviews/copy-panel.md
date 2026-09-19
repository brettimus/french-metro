# Copy panel: Lines 7 and 14

Reviewed 19 September 2026. Scope: 59 existing entries and the English/French interface. The station source audit remains in `docs/research/line7.md` and `docs/research/line14.md`.

## Method

Three independent pi calls reviewed the same exported public copy. Each call used `fp-op-gateway / glm-5.3-flash`, a separate prompt, `--print --no-tools --no-session --no-skills --no-context-files --no-prompt-templates`. No credentials, private context or tools were supplied. Each reviewer had a different task:

- English editor: natural prose, naming chains, repeated sentences and awkward vocabulary.
- French editor: idiomatic French, precise references and unnecessary repetition.
- UX editor: control intent, bilingual parity and information load.

The panel gave advice. A Codex editor checked each accepted change against the supplied text, preserved source URLs and rejected suggestions that changed facts or weakened their meaning. No new historical claim was added.

## Accepted

- Remove sentences that merely say the station inherits a name after the naming chain has already been explained. This affected Louis Blanc, Maison Blanche, Saint-Lazare, Madeleine and several others.
- Remove repeated institutional or geographical summaries, including the second explanation of Chevilly plus Larue and the repeated destination explanation at Gare de Lyon.
- Keep direct name-first prose. English uses “Called X after…” or “Called X because…”. French uses “La station doit son nom à…”. A short entry is preferable to padding for a target word count.
- Change “military work” to “fortification” and “tapestry manufacture” to “tapestry works”.
- Shorten the Olympiades agreement account without removing its owner, year or scope.
- Retain distinct context: former names, branch history, construction history and dates. Do not repeat the etymology underneath it.
- Shorten About text; use “History / Histoire” for context; clarify that AI images are on the home page.
- Make the reading reset label explicit. Count entries “opened”, because opening an entry cannot prove it was read.
- Align station-choice prompts and use “Featured / À découvrir”.
- Replace source-label em dashes with middots. Keep proper-name en dashes unchanged.

## Rejected or adapted

- The French proposal for Bicêtre described Winchester as the acquired medieval estate. This changes the naming chain: Winchester is the bishopric. Retained the existing qualified explanation.
- The French proposal for Orly merged the naming chain into one long, awkward sentence. Retained separate sentences and the Paray-Vieille-Poste distinction.
- The proposed Madeleine ending replaced a clear dedication with an ambiguous pronoun and retained interpretive filler about columns. Kept the explicit dedication and removed the filler.
- The panel questioned September 2026 as a future date. The task date is 19 September 2026; retained the checked date.
- The panel suggested “Choose a station on the map”. The same instruction also appears in list view; retained wording that works in both states.
- “Coming soon” removal was passed to the UI owner, because status must remain clear for unavailable lines.
- Global capitalization changes were not applied to station names or source labels. These are identifiers and published titles, not prose to normalize freely.
- Did not follow word targets as minimums. Mairie d’Ivry needs only a short explanation in French; explaining the everyday word “mairie” to a French reader adds no value.

## Final guide

Start with the naming reason. Preserve the chain from station to street, place or person. Keep uncertainty explicit, especially Cadet and Château-Landon. Context must add a separate useful fact. Use short sentences and familiar words. No em dashes. Keep proper names, sources and station IDs unchanged. Translate intent faithfully in both languages. Label controls by their actual action; do not claim reading completion from an opened dialog.

## Checks

- TypeScript check passed.
- All 59 station IDs, names and order are unchanged.
- No em dash remains in the three edited source files.
- `git diff --check` passed.

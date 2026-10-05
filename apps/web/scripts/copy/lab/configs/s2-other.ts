/**
 * s2-other: s4-wordy with one change. Station units get the same note in the other language as
 * `other_version` in the state, and the S2 question uses it: a place or institution that `text` gives
 * only by a common noun while `other_version` names it is the level-3 vague claim. Example phrases are new.
 *
 * Earlier note (s4-wordy): s7-opening with one change. The filler_phrase Noul (S4 level 3) also counts a wordy
 * periphrasis: several words where one word or a shorter phrase says the same. Example phrases are new.
 *
 * Earlier note (s7-opening): baseline with one change. The S7 question for context units gets concrete level criteria:
 * a note whose only station facts are opening dates (of the station, of its platforms, or of the line
 * section that reached it) is level 2 at most, and a renovation in a network-wide tiling style is a
 * generic fact. The example sentences are new; they do not copy dev texts.
 */
import { noul, score } from "@typesafe-ai/sdk";
import { assembleRow, pairRequest, unitRequest } from "../../evaluate";
import { QUESTION_SET_VERSION, TELL_ID } from "../../questions";
import type { CopyLabConfig } from "../config";
import { LEVELS } from "../dataset";
import { toLevel } from "../metrics";

const TELL_NAME = Object.fromEntries(Object.entries(TELL_ID).map(([name, id]) => [id, name]));

const S7_context = score(
  "`text` is the context note for the metro station `station`. `etymology` is the separate note that explains its name. Does `text` add a fact that `etymology` does not already state, and is that fact specific to this station? Compare `text` with `etymology` sentence by sentence. Then list the station facts in `text` and ask of each one: could the same sentence be written about most other metro stations by changing only the names and dates? Opening dates are such facts: when the station opened, when each of its platforms opened, when the line section that reached it opened and between which termini. A renovation in a tiling style used across the network (Andreu-Motte, Mouton-Duvernet, 'Ouï-dire') is also such a fact.",
  [
    "`text` repeats or paraphrases what `etymology` already says (the same person, office, date or event, in other words), or its only fact is the opening date of the station ('The station opened in 1910', « La station ouvre en 1910 »)",
    "Every station fact in `text` could be written about most other stations: opening dates of the station, its platforms or its line section, even when several are given ('The Line 3 platform opened in 1904; the Line 11 platform followed in 1935, when the line ran from Châtelet to Porte des Lilas'), a renovation or a standard tiling style, traffic figures, a temporary decoration also used elsewhere; or the facts are about another station or line",
    "`text` gives a new fact about the person, place or event that `etymology` explains (a later career step, a work, an outcome, a date not in `etymology`); or it gives one fact specific to this station next to generic facts (a renovation or an opening date) that take up most of the note",
    "`text` gives a fact that is true of this station only (a former name, a rename, an unusual event at its opening, a physical feature such as an entrance, a viaduct or a decoration made for it, its layout, branch history), stated directly",
  ],
);

const S2_concrete = score(
  "How much of `text` could a reader check against a source (names, dates, places, people, events), as opposed to statements of significance, atmosphere or heritage? A sentence that says how certain an attribution is and names its basis ('The attribution is traditional rather than certain', 'Cette attribution reste traditionnelle') counts as checkable. `other_version` is the same note in the other language; use it only to see which names and dates were available to the writer, not to judge its own wording.",
  [
    "Most sentences contain no checkable fact; they talk about significance, atmosphere, memory or heritage",
    "One sentence carries the facts; at least one other sentence only evaluates or summarises (a sentence that states how certain a claim is does not count here)",
    "Every sentence has a checkable fact, but one claim is vague where a precise one was possible: 'in the past', 'a famous figure', 'a medieval owner' for a known person, 'another stop' for a known station, 'ended violently' for a killing, 'au sein des assemblées' for a named assembly; or `text` refers to a place, building or institution only by a common noun ('the nearby river', 'the research hospital', « le pont voisin », « le quartier commerçant ») while `other_version` gives its name",
    "Every sentence states at least one checkable fact (a name, a date, a place, an event) at a definite level of precision, and each place, building or institution that `other_version` names is also named in `text`",
  ],
);

const filler_phrase = noul(
  "Does `text` contain a filler word or phrase that adds no fact? Count three kinds: (1) an intensifier or signpost ('simply', 'actually', 'it is worth noting', « tout simplement », « il convient de souligner »); (2) a persistence phrase ('still today', « aujourd’hui encore ») or a comparison with the opening of the metro ('long before the metro arrived', 'two years before this Métro station opened', « bien avant l’arrivée du métro », « depuis son ouverture »); (3) a wordy periphrasis, where several words say what one verb or a shorter phrase says ('carried out the construction of' for 'built', 'took the decision to rename' for 'renamed', « procède à l’inauguration de » for « inaugure », « exerce ses fonctions de maire » for « est maire », « au sein de » where « dans » says the same, « en ce qui concerne »).",
  {
    true: "At least one such word or phrase: if you delete it or replace it with one shorter word, the sentence keeps every fact",
    false: "Each word carries a name, date, place, event, cause or needed link. A phrase that states how certain a claim is, or a short connective that links two facts, is not filler",
  },
);

const config: CopyLabConfig = {
  name: "s2-other",
  description: `s4-wordy with the other-language note as state and an S2 question that uses it`,
  unitRequest(u, ctx) {
    const req = unitRequest(u, ctx.byId, ctx.lineTitles, ctx.corpus);
    if (u.kind === "station" && u.field === "context" && req.questions.S7) req.questions = { ...req.questions, S7: S7_context };
    if (req.questions.filler_phrase) req.questions = { ...req.questions, filler_phrase };
    if (u.kind === "station" && req.questions.S2) {
      const other = ctx.byId.get(`${u.pairId}/${u.locale === "en" ? "fr" : "en"}`);
      req.state = { ...req.state, other_version: other?.text ?? "" };
      req.questions = { ...req.questions, S2: S2_concrete };
    }
    return req;
  },
  pairRequest: (en, fr) => pairRequest(en, fr),
  assess(u, findings, results, sharedText) {
    const row = assembleRow(u, findings, results, sharedText);
    const levels: Record<string, number> = {};
    for (const [d, v] of Object.entries(row.dims)) if (LEVELS[d]) levels[d] = toLevel(v, LEVELS[d]!);
    const native = row.jev["unit.native"];
    if (native?.type === "score") levels.native = Math.min(LEVELS.native!, Math.max(1, Math.round(native.score) + 1));
    const tells = [...new Set(row.tells.map((t) => TELL_NAME[t.split(" ")[0]!]).filter((t): t is string => !!t))];
    return { levels, tells };
  },
};

export default config;

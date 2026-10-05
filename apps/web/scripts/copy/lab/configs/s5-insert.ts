/**
 * s5-insert: s4-wordy with one change. The S5 question for station units gets concrete level-2 criteria: a phrase
 * inserted between subject and verb, or a chain of two or more appositive or participle phrases where each one
 * attaches to the noun before it. One appositive or participle phrase at the end of a sentence stays level 3.
 * Example sentences are new; they do not copy dev texts.
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
import { assembleRow, pairRequest } from "../../evaluate";
import { TELL_ID } from "../../questions";
import type { CopyLabConfig } from "../config";
import { v6UnitRequest } from "../v6";
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

const S5_construction = score(
  "Can each sentence of `text` be read correctly on the first pass? Ignore sentence length; only judge structure. Find the subject and the main verb of each sentence, then look at what comes between them and after them.",
  [
    "A phrase attaches to the wrong subject (a dangling participle such as 'Built in 1900, its platform…'), or a pronoun or a definite noun phrase ('he', 'it', 'its', 'il', 'elle', 'the pass', « le col ») has no antecedent inside `text`. `station` and `etymology` do not count as antecedents",
    "No such error, but one sentence makes the reader hold a thread: a phrase of three or more words set off by commas between the subject and its verb ('The bridge, rebuilt twice after floods, carries…', « Le marché, déplacé en 1860 vers la place voisine, accueille… »), or a chain of two or more appositive or participle phrases where each one attaches to the noun before it ('after the gate, an opening in the old wall, built in 1845, on the road to the village'; « d’après la rue, ouverte en 1830, elle-même nommée pour… »)",
    "Every sentence reads correctly on the first pass. One appositive or participle phrase that follows the noun it describes, at the end of a sentence ('named after the square, laid out in 1810'), a short date or place phrase at the start, and two main clauses joined by a semicolon or 'and' are all level 3",
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
  name: "s5-insert",
  description: `s4-wordy with S5 level-2 criteria for inserted phrases and chained appositives`,
  unitRequest(u, ctx) {
    const req = v6UnitRequest(u, ctx);
    if (u.kind === "station" && u.field === "context" && req.questions.S7) req.questions = { ...req.questions, S7: S7_context };
    if (u.kind === "station" && req.questions.S5) req.questions = { ...req.questions, S5: S5_construction };
    if (req.questions.filler_phrase) req.questions = { ...req.questions, filler_phrase };
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

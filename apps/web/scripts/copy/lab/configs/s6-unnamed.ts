/**
 * s6-unnamed: s4-wordy with one change. The station pair request gets one more Noul, `unnamed_place`: does one version
 * name a place, street, building or body of water that the other version mentions only by a common noun? A yes
 * (>= 0.5) sets S6 to level 1, like a missing fact. Example phrases are new. (Second variant of s6-generic.)
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
import { TELL_ID } from "../../questions";
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

const filler_phrase = noul(
  "Does `text` contain a filler word or phrase that adds no fact? Count three kinds: (1) an intensifier or signpost ('simply', 'actually', 'it is worth noting', « tout simplement », « il convient de souligner »); (2) a persistence phrase ('still today', « aujourd’hui encore ») or a comparison with the opening of the metro ('long before the metro arrived', 'two years before this Métro station opened', « bien avant l’arrivée du métro », « depuis son ouverture »); (3) a wordy periphrasis, where several words say what one verb or a shorter phrase says ('carried out the construction of' for 'built', 'took the decision to rename' for 'renamed', « procède à l’inauguration de » for « inaugure », « exerce ses fonctions de maire » for « est maire », « au sein de » where « dans » says the same, « en ce qui concerne »).",
  {
    true: "At least one such word or phrase: if you delete it or replace it with one shorter word, the sentence keeps every fact",
    false: "Each word carries a name, date, place, event, cause or needed link. A phrase that states how certain a claim is, or a short connective that links two facts, is not filler",
  },
);

const unnamed_place = noul(
  "`en` and `fr` are two versions of one note. List every place, street, district, building, river or canal that `en` names, and check `fr` for each; then do the same from `fr` to `en`. Is there one that a version names, while the other version mentions the same thing only by a common noun ('the canal', « la rivière voisine », « le quartier », 'the abbey') and never gives its name anywhere?",
  {
    true: "One version names the thing (EN 'after the abbey of that name, Saint-Maur'), and the other version only says « l’abbaye voisine » and never writes Saint-Maur",
    false: "Every named thing is named in both versions, possibly in another sentence or inside a longer name (« rue de la Roquette » covers 'Roquette'); or both versions use the same generic noun",
  },
);

const config: CopyLabConfig = {
  name: "s6-unnamed",
  description: `s4-wordy with an unnamed_place pair Noul that sets S6 to level 1`,
  unitRequest(u, ctx) {
    const req = unitRequest(u, ctx.byId, ctx.lineTitles, ctx.corpus);
    if (u.kind === "station" && u.field === "context" && req.questions.S7) req.questions = { ...req.questions, S7: S7_context };
    if (req.questions.filler_phrase) req.questions = { ...req.questions, filler_phrase };
    return req;
  },
  pairRequest(en, fr) {
    const req = pairRequest(en, fr);
    if (req && en.kind === "station") req.questions = { ...req.questions, unnamed_place };
    return req;
  },
  assess(u, findings, results, sharedText) {
    const row = assembleRow(u, findings, results, sharedText);
    const levels: Record<string, number> = {};
    for (const [d, v] of Object.entries(row.dims)) if (LEVELS[d]) levels[d] = toLevel(v, LEVELS[d]!);
    const unnamed = row.jev["pair.unnamed_place"];
    if (unnamed?.type === "noul" && unnamed.noul >= 0.5 && levels.S6 !== undefined) levels.S6 = 1;
    const native = row.jev["unit.native"];
    if (native?.type === "score") levels.native = Math.min(LEVELS.native!, Math.max(1, Math.round(native.score) + 1));
    const tells = [...new Set(row.tells.map((t) => TELL_NAME[t.split(" ")[0]!]).filter((t): t is string => !!t))];
    return { levels, tells };
  },
};

export default config;

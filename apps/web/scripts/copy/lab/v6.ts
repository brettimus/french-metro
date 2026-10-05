/**
 * The copy questions of set 2026-10-05.6 that set 2026-10-05.7 replaced (S7 for context units and filler_phrase,
 * ported from the s4-wordy config). The lab configs other than `production` use `v6UnitRequest`, so `baseline` stays
 * the production evaluator as it was before the port, and each tried config keeps the base it was measured on.
 */
import { noul, score } from "@typesafe-ai/sdk";
import { unitRequest, type JevRequest } from "../evaluate";
import type { CopyUnit } from "../corpus";
import type { LabContext } from "./config";

export const V6_QUESTION_SET_VERSION = "2026-10-05.6";

export const V6_S7_context = score(
  "`text` is the context note for the metro station `station`. `etymology` is the separate note that explains its name. Does `text` add a fact that `etymology` does not already state, and is that fact about this station? Compare `text` with `etymology` sentence by sentence before you choose.",
  [
    "`text` repeats or paraphrases what `etymology` already says (the same person, office, date or event, in other words), or it only says when the station opened ('The station opened in 1900', « La station ouvre en 1900 »)",
    "`text` gives a generic station fact (a renovation, traffic, a temporary decoration also used at other stations, a standard tiling) or a fact about another station or line",
    "`text` gives a new fact about the person, place or event that `etymology` explains (a later career step, a work, an outcome, a date not in `etymology`); or it gives a fact specific to this station but opens with a filler sentence or ends with an unrelated fact",
    "`text` gives a fact specific to this station (a former name, a rename, its construction, a physical feature, its layout, branch history), stated directly",
  ],
);

export const V6_filler_phrase = noul(
  "Does `text` contain a filler word or phrase that adds no fact: an intensifier or signpost ('simply', 'actually', 'it is worth noting', « tout simplement », « il convient de souligner »), a persistence phrase ('still today', « aujourd’hui encore »), or a comparison with the opening of the metro ('long before the metro arrived', 'two years before this Métro station opened', « bien avant l’arrivée du métro », « depuis son ouverture »)?",
);

/** The production unit request with the 2026-10-05.6 S7 (context units) and filler_phrase questions put back. */
export function v6UnitRequest(u: CopyUnit, ctx: LabContext): JevRequest {
  const req = unitRequest(u, ctx.byId, ctx.lineTitles, ctx.corpus);
  if (u.kind === "station" && u.field === "context" && req.questions.S7) req.questions = { ...req.questions, S7: V6_S7_context };
  if (req.questions.filler_phrase) req.questions = { ...req.questions, filler_phrase: V6_filler_phrase };
  return req;
}

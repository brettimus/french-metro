/**
 * Known source conflicts: claims where the research notes deliberately keep a value that one cited source
 * contradicts, because other sources show that source is wrong. The checker cannot know this, so these claims
 * would rank at the top of every run. The ranking leaves them out and lists them with the note instead.
 *
 * An entry matches a pair when the pair is in the same line, station and field, and one of its claims (EN or FR)
 * contains one of `contains`. Matching on text, not on the group number, means that an entry stops matching when
 * the sentence is rewritten (the conflict must then be checked again) and survives a change in sentence order.
 * `stale` in the run output lists entries that matched no pair.
 */
import type { Field } from "./claims";

export type KnownConflict = {
  lineId: string;
  stationId: string;
  field: Field;
  /** Text fragments, EN or FR, that identify the claim. */
  contains: string[];
  /** The value the copy keeps, and the source that disagrees. */
  note: string;
  /** Where the decision is recorded. */
  ref: string;
};

const SAINT_MANDE_NOTE =
  "The fr station article prints 26 April 1934 for the rename to Saint-Mandé – Tourelle. The copy keeps 26 April 1937: " +
  "the fr line article, the en station article and the fr Picpus article (Line 6's Saint-Mandé became Picpus on " +
  "1 March 1937) all support 1937, so 1934 is treated as an error in the article.";

export const KNOWN_CONFLICTS: KnownConflict[] = [
  {
    lineId: "1",
    stationId: "saint-mande",
    field: "etymology",
    contains: ["Saint-Mandé – Tourelle on 26 April 1937", "Saint-Mandé – Tourelle le 26 avril 1937"],
    note: SAINT_MANDE_NOTE,
    ref: "docs/research/line1.md (Saint-Mandé; correction 17)",
  },
  {
    lineId: "1",
    stationId: "saint-mande",
    field: "context",
    contains: ["The 1937 rename followed a change on Line 6", "Le changement de 1937 suit celui de la ligne 6"],
    note: SAINT_MANDE_NOTE,
    ref: "docs/research/line1.md (Saint-Mandé; correction 17)",
  },
];

/** The first known conflict that matches the pair, or undefined. */
export function matchKnownConflict(
  pair: { lineId: string; stationId: string; field: Field; texts: string[] },
  list: KnownConflict[] = KNOWN_CONFLICTS,
): KnownConflict | undefined {
  return list.find(
    (k) =>
      k.lineId === pair.lineId &&
      k.stationId === pair.stationId &&
      k.field === pair.field &&
      k.contains.some((s) => pair.texts.some((t) => t.includes(s))),
  );
}

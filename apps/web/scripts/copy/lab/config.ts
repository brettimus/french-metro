/**
 * The interface a copy lab config implements (lab/configs/*.ts, default export). For each unit the harness asks
 * `unitRequest`, for each labelled EN/FR pair `pairRequest`, sends the requests through the Jev cache, and then calls
 * `assess` once per unit with the results that apply to it. A config can change the question wording, the levels,
 * the state fields and the way answers become levels.
 */
import type { CopyUnit } from "../corpus";
import type { Finding } from "../checks";
import type { JevRequest, JevResult } from "../evaluate";

/** The copy around a unit, from the corpus it was graded on (labelled units plus dataset context). */
export type LabContext = {
  byId: Map<string, CopyUnit>;
  /** Line titles by locale, for title units. */
  lineTitles: Record<string, string[]>;
  /** All units of the corpus that the dataset holds (for UI siblings). */
  corpus: CopyUnit[];
};

export type Assessment = {
  /** Level 1..L per dimension (see LEVELS in dataset.ts). Pair dimensions (S6, U3) are read from the EN unit. */
  levels: Record<string, number>;
  /** Tell question names found (t2_inflated, ...), by code or by Jev. */
  tells: string[];
};

export type CopyLabConfig = {
  /** Must match the file name in lab/configs/. */
  name: string;
  /** One line: what this config changes compared with the config it copies. */
  description: string;
  /** Jev model (default jev-1.13.0). */
  model?: string;
  unitRequest(u: CopyUnit, ctx: LabContext): JevRequest | undefined;
  pairRequest(en: CopyUnit, fr: CopyUnit, ctx: LabContext): JevRequest | undefined;
  /** `results` holds the unit request result and, when the unit has a labelled pair, the pair request result. */
  assess(u: CopyUnit, findings: Finding[], results: JevResult[], sharedText: boolean): Assessment;
};

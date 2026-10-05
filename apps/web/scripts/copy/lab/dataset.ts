/**
 * Types, levels and split rule of the copy lab dataset (lab/dataset.json, written by build-dataset.ts).
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { CopyUnit } from "../corpus";

export const DATASET_PATH = join(import.meta.dir, "dataset.json");

export type Split = "dev" | "test";
/** Which copy the labels were made on: the calibration copy (commit d085bdd) or the copy of round 3 (current). */
export type CorpusName = "d085bdd" | "current";
export type Source = "calibration" | "round3" | "planted";

/** Number of levels of each graded dimension (level 1 = worst). */
export const LEVELS: Record<string, number> = {
  S1: 4,
  S2: 4,
  S3: 4,
  S4: 4,
  S5: 3,
  S6: 4,
  S7: 4,
  L1: 4,
  L2: 4,
  L3: 3,
  U1: 3,
  U3: 3,
  native: 4,
};

/** Dimensions in the primary metric. The others have too few labels per split and are reported only. */
export const PRIMARY_DIMS = ["S1", "S2", "S3", "S4", "S5", "S6", "S7"] as const;

/** Tell question names, as in the labels (`tells`) and questions.ts. */
export const TELLS = [
  "t2_inflated",
  "t4_praise",
  "t5_neg_parallel",
  "t6_tricolon",
  "t7_vague_attribution",
  "t9_closer",
  "t12_false_range",
  "t13_stock_metaphor",
  "t14_grandiosity",
  "t16_synonym_cycling",
] as const;
export type Tell = (typeof TELLS)[number];

/** Tells a unit is asked about: all ten for station notes and line summaries, t4 only for UI and page strings. */
export function tellsAsked(u: Pick<CopyUnit, "kind" | "field">): readonly Tell[] {
  if (u.kind === "station" || (u.kind === "line" && u.field === "summary")) return TELLS;
  if (u.kind === "ui" || u.kind === "page") return ["t4_praise"];
  return [];
}

export type UnitLabels = {
  /** Levels by dimension (S1..S5, S7, L1..L3, U1, native). */
  dims: Record<string, number>;
  /** Tells present; undefined when the unit was not graded for tells. */
  tells?: string[];
  t25?: number;
  calque?: number;
};

export type PairLabels = {
  dims: Record<string, number>;
  conflict?: number;
  fr_missing?: number;
  en_missing?: number;
  hedge?: number;
  fr_calque?: number;
};

export type DatasetUnit = {
  /** Unique key. Equal to unit.id, except for planted units ("<unit.id>~<tell>"). */
  key: string;
  split: Split;
  source: Source;
  corpus: CorpusName;
  /** The unit as graded. A planted unit keeps the id of the unit it was made from. */
  unit: CopyUnit;
  labels: UnitLabels;
  planted?: { tell: Tell; from: string };
};

export type DatasetPair = {
  pairId: string;
  split: Split;
  source: Source;
  corpus: CorpusName;
  labels: PairLabels;
};

export type Dataset = {
  version: 1;
  meta: Record<string, unknown>;
  units: DatasetUnit[];
  pairs: DatasetPair[];
  /** Unlabelled units that requests need: etymology notes for context units, line titles, UI siblings. */
  context: Record<CorpusName, CopyUnit[]>;
};

export const hashHex = (s: string) => createHash("sha1").update(s).digest("hex");

/**
 * Round-3 split: sort the pair ids by sha1 and put the first half in dev, the second half in test.
 * Calibration pairs are all dev (the questions were already fitted on them).
 */
export function splitRound3(pairIds: string[]): Map<string, Split> {
  const sorted = [...new Set(pairIds)].sort((a, b) => (hashHex(a) < hashHex(b) ? -1 : hashHex(a) > hashHex(b) ? 1 : 0));
  const half = Math.ceil(sorted.length / 2);
  return new Map(sorted.map((id, i) => [id, i < half ? "dev" : "test"] as const));
}

export function loadDataset(path = DATASET_PATH): Dataset {
  return JSON.parse(readFileSync(path, "utf8")) as Dataset;
}

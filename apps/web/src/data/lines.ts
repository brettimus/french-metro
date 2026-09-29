import { line1 } from "./line1";
import { line4 } from "./line4";
import { line5 } from "./line5";
import { line6 } from "./line6";
import { line7 } from "./line7";
import { line9 } from "./line9";
import { line14 } from "./line14";
import type { MetroLine } from "./types";
import type { FutureLine } from "../coming-soon";
export const lines: MetroLine[] = [
  line1,
  line4,
  line5,
  line6,
  line7,
  line9,
  line14,
];
export const getLine = (id: string | undefined) =>
  lines.find((line) => line.id === id);
export const comingSoon: FutureLine[] = [];

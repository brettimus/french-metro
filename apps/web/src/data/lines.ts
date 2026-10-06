import { line1 } from "./line1";
import { line3 } from "./line3";
import { line4 } from "./line4";
import { line5 } from "./line5";
import { line6 } from "./line6";
import { line7 } from "./line7";
import { line9 } from "./line9";
import { line11 } from "./line11";
import { line14 } from "./line14";
import type { MetroLine } from "./types";
import type { FutureLine } from "../coming-soon";
export const lines: MetroLine[] = [
  line1,
  line3,
  line4,
  line5,
  line6,
  line7,
  line9,
  line11,
  line14,
];
export const getLine = (id: string | undefined) =>
  lines.find((line) => line.id === id);
// Lines not yet in the atlas, with IDFM line colours. 3bis and 7bis are
// left out until the badge layout is checked with four-character labels.
export const comingSoon: FutureLine[] = [
  { id: "2", color: "#003ca6", ink: "#fff" },
  { id: "8", color: "#e19bdf", ink: "#29251f" },
  { id: "10", color: "#e3b32a", ink: "#29251f" },
  { id: "12", color: "#00814f", ink: "#fff" },
  { id: "13", color: "#98d4e2", ink: "#29251f" },
];

import { line4 } from "./line4";
import { line5 } from "./line5";
import { line7 } from "./line7";
import { line14 } from "./line14";
import type { MetroLine } from "./types";
export const lines: MetroLine[] = [line4, line5, line7, line14];
export const getLine = (id: string | undefined) =>
  lines.find((line) => line.id === id);
export const comingSoon = [
  { id: "1", color: "#ffcd00", ink: "#29251f" },
  { id: "6", color: "#6eca97", ink: "#183329" },
  { id: "9", color: "#b6bd00", ink: "#29251f" },
];

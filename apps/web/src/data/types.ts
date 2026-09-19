export const lineIds = ["4", "5", "7", "14"] as const;
export type LineId = (typeof lineIds)[number];
export type Locale = "en" | "fr";
export type Localized = Record<Locale, string>;
export type Art =
  | "church"
  | "temple"
  | "station"
  | "towers"
  | "garden"
  | "market"
  | "modern"
  | "plane"
  | "loom"
  | "portrait"
  | "gate"
  | "river"
  | "square"
  | "piano"
  | "hospital"
  | "house";
export interface Source {
  label: string;
  url: string;
}
export interface Station {
  id: string;
  name: string;
  area: string;
  /** Opening on the current line; omit if not verified. */
  opened?: number;
  /** Starts with a clear explanation of the station name. Aim for 20–45 words per locale. */
  etymology: Localized;
  /** One short paragraph of verified context, Aim for 20–55 words per locale. */
  context: Localized;
  sources: Source[];
  /** Optional language-specific Wikipedia or official biography links. */
  people?: { name: string; url: Localized }[];
  art: Art;
  /** Line 7: trunk includes Maison Blanche, then two separate branches. */
  branch?: "trunk" | "ivry" | "villejuif";
}
export interface MetroLine {
  id: LineId;
  color: string;
  textColor: string;
  title: Localized;
  summary: Localized;
  termini: string[];
  stations: Station[];
  /** Each path is one continuous sequence, with common trunk repeated for branches. */
  paths: string[][];
  featured: string[];
  image: string;
  imageAlt: Localized;
  sources: Source[];
}

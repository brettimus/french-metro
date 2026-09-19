export type Locale = "en" | "fr";
export type Localized = Record<Locale, string>;
export type Art =
  | "church"
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
  | "hospital";
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
  /** Starts with a clear explanation of the station name. 25–55 words per locale. */
  etymology: Localized;
  /** One short paragraph of verified context, 30–75 words per locale. */
  context: Localized;
  sources: Source[];
  /** Optional language-specific Wikipedia or official biography links. */
  people?: { name: string; url: Localized }[];
  art: Art;
  /** Line 7: trunk includes Maison Blanche, then two separate branches. */
  branch?: "trunk" | "ivry" | "villejuif";
}
export interface MetroLine {
  id: "7" | "14";
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

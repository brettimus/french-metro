import type { Source } from "./types";

export const wiki = (title: string, language: "fr" | "en" = "fr") =>
  `https://${language}.wikipedia.org/wiki/${encodeURIComponent(title.replaceAll(" ", "_"))}`;
export const source = (label: string, url: string): Source => ({ label, url });
export const biography = (name: string, en = name, fr = name) => ({
  name,
  url: { en: wiki(en, "en"), fr: wiki(fr) },
});

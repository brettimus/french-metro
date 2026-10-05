/**
 * Copy corpus: every user-facing string as an i18n-style unit, in both locales.
 * Usage: bun apps/web/scripts/copy/corpus.ts [--out path]
 * Writes JSON to stdout (or --out) and prints counts per kind/locale to stderr.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { lines } from "../../src/data/lines";
import { messages } from "../../src/i18n";
import type { Locale } from "../../src/data/types";

export type CopyKind = "station" | "line" | "ui" | "page";
export type CopyUnit = {
  id: string;
  kind: CopyKind;
  field: string;
  locale: Locale;
  text: string;
  lineId?: string;
  stationId?: string;
  stationName?: string;
  area?: string;
  wordCount: number;
  /** Same value for the en and fr versions of one unit. */
  pairId: string;
  /** Where the string appears, or why both locales share one text. */
  note?: string;
};

const locales: readonly Locale[] = ["en", "fr"];
const indexHtmlPath = join(import.meta.dir, "../../public/index.html");

export const countWords = (text: string) =>
  text.split(/\s+/).filter((token) => /[\p{L}\p{N}]/u.test(token)).length;

type UnitBase = Omit<CopyUnit, "id" | "locale" | "text" | "wordCount">;
const unit = (base: UnitBase, locale: Locale, text: string): CopyUnit => ({
  ...base,
  id: `${base.pairId}/${locale}`,
  locale,
  text,
  wordCount: countWords(text),
});
const pair = (base: UnitBase, text: Record<Locale, string>) =>
  locales.map((locale) => unit(base, locale, text[locale]));
/** A hardcoded string shown unchanged in both locales. */
const shared = (field: string, text: string, note: string) =>
  pair({ kind: "page", field, pairId: `page/${field}`, note }, { en: text, fr: text });

const decodeEntities = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
const squash = (s: string) => decodeEntities(s.replace(/\s+/g, " ").trim());

function staticHtmlUnits(): CopyUnit[] {
  const html = readFileSync(indexHtmlPath, "utf8");
  const pick = (re: RegExp, label: string) => {
    const match = html.match(re)?.[1];
    if (match === undefined) throw new Error(`index.html: ${label} not found`);
    return squash(match);
  };
  const description = pick(
    /<meta\s+name="description"\s+content="([^"]*)"/,
    "meta description",
  );
  const title = pick(/<title>([^<]*)<\/title>/, "title");
  const loading = pick(/<p class="loading">([^<]*)<\/p>/, "loading text");
  const noscript = pick(/<noscript\s*>\s*<p class="loading">([\s\S]*?)<a /, "noscript text");
  const noscriptLink = pick(/<noscript[\s\S]*?<a [^>]*>([^<]*)<\/a>/, "noscript link");
  // The noscript paragraph and link hold French then English, split at the first sentence end / slash.
  const [noscriptFr = noscript, noscriptEn = noscript] = noscript.split(/(?<=\.)\s+(?=[A-Z])/);
  const [linkFr = noscriptLink, linkEn = noscriptLink] = noscriptLink.split(/\s*\/\s*/);
  return [
    ...shared(
      "staticMetaDescription",
      description,
      "public/index.html meta description; French only, served to both locales until app.ts replaces it",
    ),
    ...shared(
      "staticDocumentTitle",
      title,
      "public/index.html <title>; shown before app.ts sets document.title",
    ),
    ...shared("loadingText", loading, "public/index.html #app placeholder before the bundle runs"),
    ...pair(
      { kind: "page", field: "noscriptText", pairId: "page/noscriptText", note: "public/index.html <noscript>; both languages shown together" },
      { fr: noscriptFr, en: noscriptEn },
    ),
    ...pair(
      { kind: "page", field: "noscriptLink", pairId: "page/noscriptLink", note: "public/index.html <noscript> link text; both languages shown together" },
      { fr: linkFr, en: linkEn },
    ),
  ];
}

function appHardcodedUnits(): CopyUnit[] {
  const titleSuffix = "Métro / Noms";
  const docTitle = (locale: Locale) => `${messages[locale].title} | ${titleSuffix}`;
  return [
    ...pair(
      { kind: "page", field: "documentTitleHome", pairId: "page/documentTitleHome", note: "app.ts render(): document.title on home; line/station pages use '<station> · <Line N> | Métro / Noms'" },
      { en: docTitle("en"), fr: docTitle("fr") },
    ),
    ...shared("documentTitleSuffix", titleSuffix, "app.ts render(): suffix of every document.title, not localized"),
    ...shared("signAlt", "Métropolitain", "app.ts home(): alt text of the Métropolitain sign image, not localized"),
    ...shared("riverLabel", "Seine", "app.ts mapMarkup(): river label on the line map"),
    ...shared("notFoundCode", "404", "app.ts render(): large code on the not-found page"),
    ...pair(
      { kind: "page", field: "searchCountSingular", pairId: "page/searchCountSingular", note: "app.ts setupLine(): singular count word after search; plural uses ui/stations" },
      { en: "station", fr: "station" },
    ),
    ...shared("signCreditAuthor", "Terrazzo", "app.ts showAbout(): photographer name after ui/signCredit"),
    ...shared("signCreditLicense", "CC BY 2.0", "app.ts showAbout(): licence link after ui/signCredit"),
  ];
}

export function buildCorpus(): CopyUnit[] {
  const units: CopyUnit[] = [];
  for (const line of lines) {
    for (const field of ["title", "summary", "imageAlt"] as const) {
      units.push(
        ...pair({ kind: "line", field, lineId: line.id, pairId: `line/${line.id}/${field}` }, line[field]),
      );
    }
    for (const s of line.stations) {
      for (const field of ["etymology", "context"] as const) {
        units.push(
          ...pair(
            {
              kind: "station",
              field,
              lineId: line.id,
              stationId: s.id,
              stationName: s.name,
              area: s.area,
              pairId: `station/${line.id}/${s.id}/${field}`,
            },
            s[field],
          ),
        );
      }
    }
  }
  const keys = new Set([...Object.keys(messages.en), ...Object.keys(messages.fr)]);
  for (const key of keys) {
    const text = {
      en: (messages.en as Record<string, unknown>)[key],
      fr: (messages.fr as Record<string, unknown>)[key],
    };
    if (typeof text.en !== "string" || typeof text.fr !== "string") continue;
    units.push(...pair({ kind: "ui", field: key, pairId: `ui/${key}` }, { en: text.en, fr: text.fr }));
  }
  // coming-soon.ts holds markup only; its visible text comes from ui/other, ui/line and ui/soon.
  units.push(...staticHtmlUnits(), ...appHardcodedUnits());
  return units;
}

export function countByKindLocale(units: CopyUnit[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const u of units) {
    const key = `${u.kind}/${u.locale}`;
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}

if (import.meta.main) {
  const args = process.argv.slice(2);
  const outIndex = args.indexOf("--out");
  const out = outIndex >= 0 ? args[outIndex + 1] : undefined;
  if (outIndex >= 0 && !out) {
    console.error("Usage: bun apps/web/scripts/copy/corpus.ts [--out path]");
    process.exit(1);
  }
  const corpus = buildCorpus();
  const json = JSON.stringify(corpus, null, 2) + "\n";
  if (out) writeFileSync(out, json);
  else process.stdout.write(json);
  const counts = countByKindLocale(corpus);
  for (const [key, n] of Object.entries(counts).sort()) console.error(`${key}\t${n}`);
  console.error(`total\t${corpus.length}`);
}

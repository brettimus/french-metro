/**
 * Number, year and date normalization for the code checks. Jev is weak on numbers and dates, so every number in a
 * claim is compared here, in code, against the numbers found in the station's source texts.
 *
 * A fact has a canonical key:
 *   d:1900-07-19  full date        my:1900-07  month + year      dm:07-19  day + month
 *   y:1900        year             c:19        century           n:300     any other number (ordinals too)
 */
import { stripAccents } from "./text";

export type FactKind = "date" | "monthYear" | "dayMonth" | "year" | "century" | "number" | "word";
export type NumFact = {
  kind: FactKind;
  /** The text the fact came from. */
  raw: string;
  /** Canonical key, see the file header. */
  key: string;
};

const MONTHS: Record<string, number> = {
  january: 1, janvier: 1, february: 2, fevrier: 2, march: 3, mars: 3, april: 4, avril: 4, may: 5, mai: 5,
  june: 6, juin: 6, july: 7, juillet: 7, august: 8, aout: 8, september: 9, septembre: 9, october: 10, octobre: 10,
  november: 11, novembre: 11, december: 12, decembre: 12,
};
const MONTH_RE = Object.keys(MONTHS).join("|");

/** Number words. "one/un/une" and "neuf" (also "new") are left out on purpose. Longest first. */
const NUMBER_WORDS: [string, number][] = (
  [
    ["quatre-vingt-dix", 90], ["quatre-vingtaine", 80], ["quatre-vingts", 80], ["quatre-vingt", 80],
    ["soixante-dix", 70], ["dix-sept", 17], ["dix-huit", 18], ["dix-neuf", 19],
    ["thirteen", 13], ["fourteen", 14], ["sixteen", 16], ["seventeen", 17], ["eighteen", 18], ["nineteen", 19],
    ["treize", 13], ["quatorze", 14], ["seize", 16], ["dizaine", 10], ["douzaine", 12], ["quinzaine", 15], ["vingtaine", 20], ["trentaine", 30],
    ["quarantaine", 40], ["cinquantaine", 50], ["soixantaine", 60], ["centaine", 100],
    ["two", 2], ["three", 3], ["four", 4], ["five", 5], ["six", 6], ["seven", 7], ["eight", 8], ["nine", 9],
    ["ten", 10], ["eleven", 11], ["twelve", 12], ["fifteen", 15], ["twenty", 20], ["thirty", 30], ["forty", 40],
    ["fifty", 50], ["sixty", 60], ["seventy", 70], ["eighty", 80], ["ninety", 90], ["dozen", 12],
    ["deux", 2], ["trois", 3], ["quatre", 4], ["cinq", 5], ["sept", 7], ["huit", 8], ["dix", 10], ["onze", 11],
    ["douze", 12], ["quinze", 15], ["vingt", 20], ["trente", 30], ["quarante", 40], ["cinquante", 50], ["soixante", 60],
  ] as [string, number][]
).sort((a, b) => b[0].length - a[0].length);

const ROMAN: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100 };
export function romanToInt(s: string): number | undefined {
  if (!/^[IVXLC]+$/.test(s)) return undefined;
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const v = ROMAN[s[i]!]!;
    const next = ROMAN[s[i + 1] ?? ""] ?? 0;
    total += v < next ? -v : v;
  }
  return total > 0 ? total : undefined;
}

/** Words after a Roman ordinal that make it a plain ordinal (Ve République), not a century. */
const NOT_CENTURY = /^\s*(r[ée]publique|arrondissement|l[ée]gislature|corps|r[ée]giment|division|arm[ée]e|reich|internationale|concile|congr[eè]s|empire|plan)/i;

const pad = (n: number) => String(n).padStart(2, "0");
const isYear = (n: number) => Number.isInteger(n) && n >= 1000 && n <= 2099;

/** Parse "1 500", "1,500", "1 500", "2,5", "2.5" into a number. */
export function parseNumber(raw: string): number {
  const s = raw.replace(/[   ]/g, "");
  if (/^\d{1,3}(,\d{3})+$/.test(s)) return Number(s.replace(/,/g, ""));
  return Number(s.replace(",", "."));
}

/**
 * Extract numeric facts from text, longest patterns first. Each match masks its span so "19 juillet 1900" gives one
 * date fact, not a date plus a year plus a number.
 */
export function extractNumbers(input: string): NumFact[] {
  // Keep case for Roman numerals; fold accents only. Same length as input, so spans line up.
  let text = stripAccents(input).replace(/[’']/g, "'");
  const facts: { at: number; fact: NumFact }[] = [];
  const take = (re: RegExp, fn: (m: RegExpExecArray) => NumFact | NumFact[] | undefined) => {
    for (let m = re.exec(text); m; m = re.exec(text)) {
      const r = fn(m);
      if (!r) continue;
      for (const fact of Array.isArray(r) ? r : [r]) facts.push({ at: m.index, fact });
      text = text.slice(0, m.index) + " ".repeat(m[0].length) + text.slice(m.index + m[0].length);
    }
  };
  const month = (s: string) => MONTHS[s.toLowerCase()];

  // Full dates: "19 juillet 1900", "1er janvier 1900", "19th July 1900", "July 19, 1900".
  take(new RegExp(`\\b(\\d{1,2})(?:er|st|nd|rd|th)?\\s+(${MONTH_RE})\\s+(\\d{4})\\b`, "gi"), (m) => ({
    kind: "date", raw: m[0], key: `d:${m[3]}-${pad(month(m[2]!)!)}-${pad(Number(m[1]))}`,
  }));
  take(new RegExp(`\\b(${MONTH_RE})\\s+(\\d{1,2})(?:st|nd|rd|th)?,?\\s+(\\d{4})\\b`, "gi"), (m) => ({
    kind: "date", raw: m[0], key: `d:${m[3]}-${pad(month(m[1]!)!)}-${pad(Number(m[2]))}`,
  }));
  // Month + year: "July 1900", "juillet 1900".
  take(new RegExp(`\\b(${MONTH_RE})\\s+(?:of\\s+)?(\\d{4})\\b`, "gi"), (m) => ({
    kind: "monthYear", raw: m[0], key: `my:${m[2]}-${pad(month(m[1]!)!)}`,
  }));
  // Day + month: "19 juillet", "July 19". "mars"/"may" alone are ignored (no day).
  take(new RegExp(`\\b(\\d{1,2})(?:er|st|nd|rd|th)?\\s+(${MONTH_RE})\\b`, "gi"), (m) => ({
    kind: "dayMonth", raw: m[0], key: `dm:${pad(month(m[2]!)!)}-${pad(Number(m[1]))}`,
  }));
  take(new RegExp(`\\b(${MONTH_RE})\\s+(\\d{1,2})(?:st|nd|rd|th)?\\b(?!\\d)`, "gi"), (m) => ({
    kind: "dayMonth", raw: m[0], key: `dm:${pad(month(m[1]!)!)}-${pad(Number(m[2]))}`,
  }));
  // Centuries. EN "19th century", "19th-century"; FR "19e siècle", "XIXe siècle", "XVIIIe-XIXe siècles".
  take(/\b(\d{1,2})(?:st|nd|rd|th)[\s-]+centur/gi, (m) => ({ kind: "century", raw: m[0], key: `c:${Number(m[1])}` }));
  take(/\b(\d{1,2})(?:e|eme|ᵉ)\s+siecle/gi, (m) => ({ kind: "century", raw: m[0], key: `c:${Number(m[1])}` }));
  take(/\b([IVXL]+)(?:e|eme|ᵉ)\b/g, (m) => {
    const n = romanToInt(m[1]!);
    if (!n) return undefined;
    const after = text.slice(m.index + m[0].length, m.index + m[0].length + 20);
    if (NOT_CENTURY.test(after)) return { kind: "number", raw: m[0], key: `n:${n}` };
    return n <= 21 ? { kind: "century", raw: m[0], key: `c:${n}` } : undefined;
  });
  // Arabic ordinals: "1er", "1re", "18e", "18ème", "1st", "18th".
  take(/\b(\d{1,4})(?:er|re|ere|e|eme|ᵉ|st|nd|rd|th)\b/gi, (m) => ({ kind: "number", raw: m[0], key: `n:${Number(m[1])}` }));
  // Grouped thousands: "1 500", "1,500", "3 000" (space only after a 1–3 digit group).
  take(/(?<![\d.,])\d{1,3}(?:(?:,|[   ])\d{3})+(?![\d]|[.,]\d)/g, (m) => {
    const n = parseNumber(m[0]);
    return isYear(n) && !/[,   ]/.test(m[0]) ? { kind: "year", raw: m[0], key: `y:${n}` } : { kind: "number", raw: m[0], key: `n:${n}` };
  });
  // Decimals: "2,5", "2.5".
  take(/(?<![\d.,])\d+[.,]\d{1,2}(?![\d])/g, (m) => ({ kind: "number", raw: m[0], key: `n:${parseNumber(m[0])}` }));
  // Plain integers; four digits 1000–2099 are years.
  take(/(?<![\d])\d+(?![\d])/g, (m) => {
    const n = Number(m[0]);
    return isYear(n) ? { kind: "year", raw: m[0], key: `y:${n}` } : { kind: "number", raw: m[0], key: `n:${n}` };
  });
  // Number words, last so "dix-huit" style compounds are not split oddly by the digit rules.
  const wordRe = new RegExp(`(?<![\\p{L}-])(${NUMBER_WORDS.map(([w]) => w).join("|")})s?(?![\\p{L}])`, "giu");
  const wordMap = new Map(NUMBER_WORDS);
  take(wordRe, (m) => ({ kind: "word", raw: m[0], key: `n:${wordMap.get(m[1]!.toLowerCase())}` }));

  return facts.sort((a, b) => a.at - b.at).map((f) => f.fact);
}

/** All keys a source fact provides for matching. A date also provides its month-year, day-month and year. */
function expandKeys(f: NumFact): string[] {
  const [prefix, value = ""] = f.key.split(":") as [string, string?];
  switch (prefix) {
    case "d": {
      const [y, mo, d] = value.split("-");
      return [f.key, `my:${y}-${mo}`, `dm:${mo}-${d}`, `y:${y}`, `v:${Number(y)}`];
    }
    case "my": {
      const [y] = value.split("-");
      return [f.key, `y:${y}`, `v:${Number(y)}`];
    }
    case "y":
      return [f.key, `v:${Number(value)}`];
    case "n":
      return [`v:${Number(value)}`];
    default:
      return [f.key];
  }
}

/** Index of the numbers in a source text, for `matchFact`. */
export type NumberIndex = { keys: Set<string>; years: number[] };

export function buildNumberIndex(texts: string[]): NumberIndex {
  const keys = new Set<string>();
  const years: number[] = [];
  for (const t of texts) {
    for (const f of extractNumbers(t)) {
      for (const k of expandKeys(f)) keys.add(k);
      if (f.kind === "year") years.push(Number(f.key.slice(2)));
      if (f.kind === "date" || f.kind === "monthYear") years.push(Number(f.key.slice(f.key.indexOf(":") + 1, f.key.indexOf(":") + 5)));
    }
  }
  return { keys, years };
}

export type FactMatch = { fact: NumFact; matched: boolean; note?: string };

/** Does the source index contain the claim fact? */
export function matchFact(f: NumFact, idx: NumberIndex): FactMatch {
  const [prefix, value = ""] = f.key.split(":") as [string, string?];
  const has = (k: string) => idx.keys.has(k);
  switch (prefix) {
    case "d": {
      if (has(f.key)) return { fact: f, matched: true };
      const y = value.slice(0, 4);
      const note = has(`my:${value.slice(0, 7)}`) ? "month and year found, day not" : has(`y:${y}`) ? "year found, day and month not" : undefined;
      return { fact: f, matched: false, note };
    }
    case "my":
      return { fact: f, matched: has(f.key), note: has(f.key) ? undefined : has(`y:${value.slice(0, 4)}`) ? "year found, month not" : undefined };
    case "dm":
      return { fact: f, matched: has(f.key) };
    case "y":
      return { fact: f, matched: has(f.key) || has(`v:${Number(value)}`) };
    case "c": {
      if (has(f.key)) return { fact: f, matched: true };
      const n = Number(value);
      const inCentury = idx.years.some((y) => y >= (n - 1) * 100 && y < n * 100);
      return { fact: f, matched: inCentury, note: inCentury ? "implied by a year in that century" : undefined };
    }
    default:
      return { fact: f, matched: has(`v:${Number(value)}`) };
  }
}

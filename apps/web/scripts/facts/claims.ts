/**
 * Sentence-level claims from station copy. Each station field (etymology, context) in each locale is split into
 * sentences, and the EN and FR sentences are aligned in order into groups (usually 1:1, sometimes 1:2 when one
 * locale splits a sentence the other keeps whole).
 *
 * Claim id: line/station/field/locale/n (n from 1). Pair key: line/station/field/g (g = aligned group, from 1).
 */
import { buildCorpus } from "../copy/corpus";
import type { Locale } from "../../src/data/types";
import { extractNumbers } from "./numbers";
import { splitSentences } from "./text";

export type Field = "etymology" | "context";
export type Claim = {
  id: string;
  pairKey: string;
  lineId: string;
  stationId: string;
  stationName: string;
  field: Field;
  locale: Locale;
  n: number;
  text: string;
  /** True when this sentence pairs 1:1 with one sentence of the other locale. */
  aligned: boolean;
  /** The other locale's sentence(s) in the same aligned group. */
  counterpart: string;
  /** The whole field text in this locale, for context. */
  fieldText: string;
  /** The sentence before this one in the same field and locale, to resolve "it", "the square" and similar. */
  previous?: string;
};

export type FieldText = {
  lineId: string;
  stationId: string;
  stationName: string;
  field: Field;
  text: Record<Locale, string>;
};

type Group = { en: number[]; fr: number[] };

/**
 * Align EN and FR sentences of one field in order. Groups are 1:1, 1:2, 2:1, 1:3 or 3:1. The cost compares
 * character lengths (FR runs about 15% longer) and rewards shared numbers; a non 1:1 group costs extra.
 */
export function alignSentences(en: string[], fr: string[]): Group[] {
  const shapes = [[1, 1], [1, 2], [2, 1], [1, 3], [3, 1]] as const;
  const nums = (xs: string[]) => new Set(extractNumbers(xs.join(" ")).map((f) => f.key));
  const cost = (e: string[], f: string[]) => {
    const le = e.join(" ").length + 1;
    const lf = f.join(" ").length + 1;
    const ne = nums(e);
    const nf = nums(f);
    const shared = [...ne].filter((k) => nf.has(k)).length;
    const union = new Set([...ne, ...nf]).size;
    return Math.abs(Math.log(lf / (le * 1.15))) - (union ? shared / union : 0) * 0.5 + (e.length === 1 && f.length === 1 ? 0 : 0.4);
  };
  const INF = Number.POSITIVE_INFINITY;
  const best: number[][] = Array.from({ length: en.length + 1 }, () => new Array(fr.length + 1).fill(INF));
  const back: ([number, number] | undefined)[][] = Array.from({ length: en.length + 1 }, () => new Array(fr.length + 1).fill(undefined));
  best[0]![0] = 0;
  for (let i = 0; i <= en.length; i++) {
    for (let j = 0; j <= fr.length; j++) {
      const here = best[i]![j]!;
      if (here === INF) continue;
      for (const [a, b] of shapes) {
        if (i + a > en.length || j + b > fr.length) continue;
        const c = here + cost(en.slice(i, i + a), fr.slice(j, j + b));
        if (c < best[i + a]![j + b]!) {
          best[i + a]![j + b] = c;
          back[i + a]![j + b] = [a, b];
        }
      }
    }
  }
  if (best[en.length]![fr.length] === INF) return [{ en: en.map((_, i) => i), fr: fr.map((_, j) => j) }];
  const groups: Group[] = [];
  for (let i = en.length, j = fr.length; i > 0 || j > 0; ) {
    const [a, b] = back[i]![j]!;
    groups.unshift({ en: range(i - a, i), fr: range(j - b, j) });
    i -= a;
    j -= b;
  }
  return groups;
}
const range = (from: number, to: number) => Array.from({ length: to - from }, (_, k) => from + k);

/** Split one EN/FR field into claims. Pure; used by `buildClaims` and the tests. */
export function splitField(f: FieldText): Claim[] {
  const sentences = { en: splitSentences(f.text.en), fr: splitSentences(f.text.fr) };
  const groups = alignSentences(sentences.en, sentences.fr);
  const claims: Claim[] = [];
  for (const locale of ["en", "fr"] as const) {
    const other = locale === "en" ? "fr" : "en";
    sentences[locale].forEach((text, i) => {
      const g = groups.findIndex((x) => x[locale].includes(i));
      const group = groups[g]!;
      claims.push({
        id: `${f.lineId}/${f.stationId}/${f.field}/${locale}/${i + 1}`,
        pairKey: `${f.lineId}/${f.stationId}/${f.field}/${g + 1}`,
        lineId: f.lineId,
        stationId: f.stationId,
        stationName: f.stationName,
        field: f.field,
        locale,
        n: i + 1,
        text,
        aligned: group.en.length === 1 && group.fr.length === 1,
        counterpart: group[other].map((k) => sentences[other][k]).join(" "),
        fieldText: f.text[locale],
        ...(i > 0 ? { previous: sentences[locale][i - 1] } : {}),
      });
    });
  }
  return claims;
}

/** Every station field from the copy corpus, grouped into EN/FR pairs. */
export function stationFields(): FieldText[] {
  const byPair = new Map<string, FieldText>();
  for (const u of buildCorpus()) {
    if (u.kind !== "station") continue;
    const entry =
      byPair.get(u.pairId) ??
      ({ lineId: u.lineId!, stationId: u.stationId!, stationName: u.stationName!, field: u.field as Field, text: { en: "", fr: "" } } satisfies FieldText);
    entry.text[u.locale] = u.text;
    byPair.set(u.pairId, entry);
  }
  return [...byPair.values()];
}

export function buildClaims(filter: { line?: string } = {}): Claim[] {
  return stationFields()
    .filter((f) => !filter.line || f.lineId === filter.line)
    .flatMap(splitField);
}

if (import.meta.main) {
  const claims = buildClaims({ line: process.argv[2] });
  const merged = claims.filter((c) => !c.aligned);
  console.log(`${claims.length} claims, ${new Set(claims.map((c) => c.pairKey)).size} pairs, ${merged.length} claims in non 1:1 groups`);
  for (const c of merged) console.log(`  ${c.pairKey}  ${c.id}  ${c.text.slice(0, 70)}`);
}

/**
 * Passage retrieval: chunk source texts into ~100–150 word passages and rank them per claim with BM25.
 * Tokens are accent-folded (see text.ts). Document frequencies come from every passage of every station, so a word
 * common across all metro articles ("station", "ligne") weighs little.
 */
import { countWords, splitSentences, tokenize } from "./text";

export const CHUNK = { min: 100, max: 150 } as const;
export const BM25 = { k1: 1.2, b: 0.75 } as const;

/** Wikipedia sections after which the text is mostly bibliography. */
const TAIL_SECTIONS =
  /^=+\s*(notes et r[ée]f[ée]rences|r[ée]f[ée]rences|notes|voir aussi|bibliographie|liens externes|sources|annexes|references|notes and references|see also|external links|further reading|bibliography)\s*=+\s*$/im;

/** Drop the bibliography tail and the "== Heading ==" lines of a Wikipedia plain-text extract. */
export function cleanSourceText(text: string): string {
  const tail = text.search(TAIL_SECTIONS);
  const body = tail >= 0 ? text.slice(0, tail) : text;
  return body
    .split("\n")
    .filter((l) => !/^=+.*=+\s*$/.test(l.trim()))
    .join("\n")
    .trim();
}

/**
 * Split text into passages of CHUNK.min–CHUNK.max words, on sentence boundaries. A sentence longer than CHUNK.max
 * is cut into word windows. A short last passage is merged into the one before it when the result stays under
 * CHUNK.max + CHUNK.min / 2 words.
 */
export function chunkText(text: string, size: { min: number; max: number } = CHUNK): string[] {
  const sentences = text
    .split(/\n+/)
    .flatMap((p) => splitSentences(p))
    .flatMap((s) => {
      const words = s.split(/\s+/);
      if (words.length <= size.max) return [s];
      const parts: string[] = [];
      for (let i = 0; i < words.length; i += size.min) parts.push(words.slice(i, i + size.min).join(" "));
      return parts;
    });
  const chunks: string[] = [];
  let current: string[] = [];
  let words = 0;
  for (const s of sentences) {
    const n = countWords(s);
    if (words > 0 && words + n > size.max) {
      chunks.push(current.join(" "));
      current = [];
      words = 0;
    }
    current.push(s);
    words += n;
    if (words >= size.min) {
      chunks.push(current.join(" "));
      current = [];
      words = 0;
    }
  }
  if (current.length) {
    const last = current.join(" ");
    const prev = chunks[chunks.length - 1];
    if (prev !== undefined && countWords(prev) + words <= size.max + size.min / 2 && words < size.min / 2) chunks[chunks.length - 1] = `${prev} ${last}`;
    else chunks.push(last);
  }
  return chunks.filter((c) => countWords(c) > 0);
}

export type Passage = { key: string; url: string; text: string; tokens: string[] };

export class Bm25Index {
  private df = new Map<string, number>();
  private avgLen = 1;
  private total = 0;
  private tf = new Map<string, Map<string, number>>();

  constructor(passages: Passage[]) {
    let len = 0;
    for (const p of passages) {
      const counts = new Map<string, number>();
      for (const t of p.tokens) counts.set(t, (counts.get(t) ?? 0) + 1);
      this.tf.set(p.key, counts);
      for (const t of counts.keys()) this.df.set(t, (this.df.get(t) ?? 0) + 1);
      len += p.tokens.length;
    }
    this.total = passages.length;
    this.avgLen = passages.length ? len / passages.length : 1;
  }

  idf(term: string): number {
    const n = this.df.get(term) ?? 0;
    return Math.log(1 + (this.total - n + 0.5) / (n + 0.5));
  }

  score(query: Map<string, number>, p: Passage): number {
    const counts = this.tf.get(p.key);
    if (!counts) return 0;
    let s = 0;
    for (const [term, weight] of query) {
      const f = counts.get(term);
      if (!f) continue;
      s += weight * this.idf(term) * ((f * (BM25.k1 + 1)) / (f + BM25.k1 * (1 - BM25.b + (BM25.b * p.tokens.length) / this.avgLen)));
    }
    return s;
  }

  /** Top k passages among `candidates` for the weighted query; zero-score passages are dropped. */
  top(query: Map<string, number>, candidates: Passage[], k: number): { passage: Passage; score: number }[] {
    return candidates
      .map((passage) => ({ passage, score: this.score(query, passage) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, k);
  }
}

/** Weighted query terms: each text adds its tokens with its weight. */
export function buildQuery(parts: { text: string; weight: number }[]): Map<string, number> {
  const q = new Map<string, number>();
  for (const { text, weight } of parts) {
    for (const t of new Set(tokenize(text))) q.set(t, Math.max(q.get(t) ?? 0, weight));
  }
  return q;
}

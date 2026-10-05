/** Shared text helpers for the fact checker: accent folding, tokens, sentences. */

/** Lowercase and remove diacritics; keeps digits and punctuation. Also folds ligatures. */
export const fold = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/œ/g, "oe")
    .replace(/Œ/g, "OE")
    .replace(/æ/g, "ae")
    .replace(/Æ/g, "AE")
    .toLowerCase();

/** Remove diacritics but keep case (Roman numerals need case). */
export const stripAccents = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "");

export const countWords = (s: string) => s.split(/\s+/).filter((t) => /[\p{L}\p{N}]/u.test(t)).length;

const STOPWORDS = new Set(
  (
    // French
    "le la les l un une des du de d au aux a et ou en dans sur sous par pour avec sans que qui quoi dont ce cet cette ces " +
    "son sa ses leur leurs il elle ils elles on se s y ne pas plus est sont etait etaient ete etre fut furent a ont avait " +
    "avaient lui eux nous vous je tu mais comme aussi entre vers chez depuis apres avant puis donc ainsi tres tout tous " +
    "toute toutes meme celle celui ceux sa n qu c j m t " +
    // English
    "the a an and or of in on at to for with without by from as is are was were be been being it its this that these " +
    "those which who whom whose there their they he she his her him them than then also into onto over under after " +
    "before between about while not no but so such has have had do does did one"
  ).split(/\s+/),
);

/** Folded tokens for retrieval: no stopwords, light plural stemming, digits kept. */
export function tokenize(s: string): string[] {
  const out: string[] = [];
  for (const raw of fold(s).split(/[^a-z0-9]+/)) {
    if (!raw || STOPWORDS.has(raw)) continue;
    if (raw.length < 2 && !/\d/.test(raw)) continue;
    let t = raw;
    if (t.length > 4 && /[sx]$/.test(t) && !/\d/.test(t)) t = t.slice(0, -1);
    out.push(t);
  }
  return out;
}

/** Words after which a period does not end a sentence. Compared folded, without the period. */
const ABBREVIATIONS = new Set([
  "st", "ste", "mr", "mrs", "ms", "dr", "m", "mme", "mlle", "mgr", "c", "ca", "av", "apr", "j", "no", "n", "vol",
  "p", "pp", "fig", "cf", "gen", "col", "lt", "capt", "sgt", "rev", "fr", "bd", "boul", "env", "approx", "vs",
]);

/**
 * Split a paragraph into sentences. A boundary is [.!?…] + space + an uppercase letter, digit or opening quote,
 * unless the word before the period is a known abbreviation or a single letter (initials, "J.-C.").
 */
export function splitSentences(text: string): string[] {
  const s = text.replace(/\s+/g, " ").trim();
  if (!s) return [];
  const out: string[] = [];
  let start = 0;
  const re = /([.!?…])(["”»)]?)\s+(?=["“«(]?\s?[\p{Lu}\d])/gu;
  for (let m = re.exec(s); m; m = re.exec(s)) {
    const end = m.index + m[1]!.length + m[2]!.length;
    if (m[1] === ".") {
      const before = s.slice(start, m.index);
      const word = before.match(/([\p{L}]+)$/u)?.[1] ?? "";
      if (word && (word.length === 1 || ABBREVIATIONS.has(fold(word)))) continue;
    }
    const sentence = s.slice(start, end).trim();
    if (sentence) out.push(sentence);
    start = m.index + m[0].length;
  }
  const rest = s.slice(start).trim();
  if (rest) out.push(rest);
  return out;
}

/**
 * Deterministic copy checks from docs/copy/writing-rubric.md (sections 3 and 4).
 * Pure functions: no I/O, no network. Inputs are CopyUnit values from corpus.ts.
 */
import type { CopyUnit } from "./corpus";
import { countWords } from "./corpus";

export type Severity = "info" | "review" | "fail";
export type Finding = {
  /** Stable check id, for example "wordCount", "fr.apostrophe", "flag.en". */
  check: string;
  severity: Severity;
  message: string;
  /** Rubric tell id (T1–T26) when the check detects a tell. */
  tell?: string;
  /** Matched text, when useful. */
  match?: string[];
  /** True when the rubric lists this as a hard failure (section 5). */
  hard?: boolean;
};

// ---------- text helpers ----------

/** Split prose into sentences. Keeps abbreviations like "St." and initials from splitting. */
export function splitSentences(text: string): string[] {
  const parts = text
    .replace(/\s+/g, " ")
    .trim()
    .split(/(?<=[.!?…])\s+(?=[«“"(\p{Lu}\d])/u);
  const out: string[] = [];
  for (const p of parts) {
    const prev = out[out.length - 1];
    // Re-join after a single capital initial ("J. Hugo") or a short abbreviation.
    if (prev && /(?:\b\p{Lu}|\bSt|\bMgr|\bM|\bDr|\bav|\bJ\.-C|\bvol|\bno)\.$/u.test(prev)) {
      out[out.length - 1] = `${prev} ${p}`;
    } else if (p) out.push(p);
  }
  return out;
}

export function sentenceLengths(text: string): number[] {
  return splitSentences(text).map(countWords);
}

export function stdev(xs: number[]): number {
  if (xs.length < 2) return 0;
  const mean = xs.reduce((a, b) => a + b, 0) / xs.length;
  return Math.sqrt(xs.reduce((a, b) => a + (b - mean) ** 2, 0) / xs.length);
}

const fold = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Replace each allowlisted phrase with same-length filler so position-based regexes skip it. */
function mask(text: string, phrases: readonly string[]): string {
  let out = text;
  for (const p of [...phrases].sort((a, b) => b.length - a.length)) {
    if (p.length < 3) continue;
    out = out.replace(new RegExp(escapeRe(p), "g"), (m) => "x".repeat(m.length));
  }
  return out;
}

function allMatches(text: string, re: RegExp): string[] {
  const flags = re.flags.includes("g") ? re.flags : `${re.flags}g`;
  return [...text.matchAll(new RegExp(re.source, flags))].map((m) => m[0]);
}

// ---------- configuration ----------

/** Word targets per field and locale (types.ts and rubric 4.1). */
export const WORD_LIMITS = {
  etymology: { target: [20, 45], reviewBelow: 15, failAbove: 55 },
  context: { target: [20, 55], reviewBelow: 15, failAbove: 65 },
} as const;

export const SENTENCE_LIMITS = { review: 25, fail: 35 } as const;
export const RATIO_LIMITS = { target: [0.9, 1.3], review: [0.75, 1.5] } as const;

/** Prose fields get sentence and style checks. Labels do not. */
export const isProse = (u: Pick<CopyUnit, "kind" | "field">) =>
  u.kind === "station" || (u.kind === "line" && u.field === "summary");

type Flag = { re: RegExp; tell: string; label: string };
const w = (src: string, tell: string): Flag => ({
  re: new RegExp(`(?<![\\p{L}])(?:${src})(?![\\p{L}])`, "iu"),
  tell,
  label: src,
});

/** Rubric 4.5, EN flag list, tagged with the tell each word belongs to. */
export const EN_FLAGS: Flag[] = [
  ...[
    "delve[sd]?",
    "tapestry",
    "testament",
    "underscores?",
    "showcases?",
    "pivotal",
    "crucial",
    "intricate",
    "meticulous(?:ly)?",
    "vibrant",
    "robust",
    "boasts?",
    "bolstered",
    "garner(?:ed|s)?",
    "foster(?:ed|s)?",
    "enhance[sd]?",
    "interplay",
    "landscape",
    "realm",
    "comprehensive",
    "enduring",
  ].map((s) => w(s, "T1")),
  ...["notably", "additionally", "moreover", "furthermore"].map((s) => w(s, "T18")),
  ...[
    "nestled",
    "in the heart of",
    "bustling",
    "charming",
    "rich history",
    "rich heritage",
    "renowned",
    "iconic",
    "breathtaking",
    "hidden gem",
    "timeless",
    "storied",
    "picturesque",
  ].map((s) => w(s, "T4")),
  ...["serves as", "served as", "stands as", "stood as", "functions as", "plays? an? \\w+ role", "played an? \\w+ role"].map(
    (s) => w(s, "T8"),
  ),
  ...["legacy", "lives on", "to this day"].map((s) => w(s, "T2")),
  ...["steeped in", "a window into", "bears? witness", "fabric of", "test of time"].map((s) => w(s, "T13")),
  ...["interestingly", "it is worth noting", "importantly", "indeed"].map((s) => w(s, "T10")),
  ...["truly", "deeply", "remarkably", "quietly", "profoundly", "arguably", "seamlessly", "uniquely"].map((s) =>
    w(s, "T11"),
  ),
  ...["historians say", "it is often said", "some believe", "legend has it", "remembered as", "regarded as", "said to be"].map((s) =>
    w(s, "T7"),
  ),
  // T17: one alternation, so "its French Wikipedia article" counts as one hit, not two.
  w(
    [
      "according to (?:its |the |their )?(?:[\\p{L}’']+ ){0,3}Wikipedia(?: article)?",
      "according to (?:the )?sources",
      "(?:[\\p{L}]+[’']s )?(?:own )?(?:(?:French|English) )?(?:Wikipedia |line |station )?articles?",
      "Wikipedia",
      "the sources (?:checked|consulted|say|cited)",
      "sources say",
      "in the sources",
    ].join("|"),
    "T17",
  ),
];

/** Rubric 4.5, FR flag list. */
export const FR_FLAGS: Flag[] = [
  ...[
    "crucial(?:e|es|aux)?",
    "essentiel(?:le|les|s)?",
    "véritables?",
    "incontournables?",
    "emblématiques?",
    "vibrante?s?",
    "dynamiques?",
    "fascinante?s?",
    "précieu(?:x|se|ses)",
    "pérennes?",
  ].map((s) => w(s, "T1")),
  ...[
    "niché(?:e|es|s)?",
    "prestigieu(?:x|se|ses)",
    "mythiques?",
    "haut lieu de",
    "au cœur de",
    "au cœur du",
    "riche histoire",
    "chargée? d[’']histoire",
  ].map((s) => w(s, "T4")),
  ...["témoigne(?:nt)? d(?:e|u|es|[’']\\p{L}+)", "illustre(?:nt)?", "met(?:tent)? en avant", "reflète(?:nt)?", "s[’']inscrit dans", "valoriser", "favoriser", "joue(?:nt)? un rôle"].map(
    (s) => w(s, "T2"),
  ),
  ...["incarne(?:nt)?", "sert de", "se veut", "constitue(?:nt)?"].map((s) => w(s, "T8")),
  ...["il est intéressant de noter", "il convient de souligner", "il est important de noter"].map((s) => w(s, "T10")),
  ...["en somme", "en conclusion", "pour résumer", "en définitive"].map((s) => w(s, "T9")),
  ...["en outre", "par ailleurs", "qui plus est"].map((s) => w(s, "T18")),
  w("non seulement", "T5"),
  ...["figée? dans le temps", "au fil des siècles", "traverser? les époques", "garder la trace", "la mémoire des lieux"].map(
    (s) => w(s, "T13"),
  ),
  ...["la mise en place de", "procéder à"].map((s) => w(s, "T1")),
  ...["véritablement", "profondément", "remarquablement"].map((s) => w(s, "T11")),
  w("selon certains historiens", "T7"),
  w("on dit souvent", "T7"),
  ...["considérée?s? comme", "réputée?s?", "passe pour"].map((s) => w(s, "T7")),
  // T17: one alternation, so « selon l’article Wikipédia consacré à » counts as one hit.
  w(
    [
      "selon (?:son |l[’']|leur )?(?:propre )?article(?: Wikipédia)?(?: en (?:français|anglais))?(?: consacré)?",
      "selon Wikipédia",
      "(?:son |l[’']|leur )(?:propre )?article(?: Wikipédia)?(?: en (?:français|anglais))?(?: consacré| anglais| français| de la station| de la ligne)?",
      "articles?",
      "Wikipédia",
      "(?:dans|selon|d[’']après) les sources",
      "les sources (?:consultées|citées|vérifiées)",
    ].join("|"),
    "T17",
  ),
];

/** Rubric 4.3, FR calque word list (REVIEW). « nommé d’après » and « définitivement » are in FR_CALQUE_PATTERNS. */
export const FR_CALQUES = [
  "faire sens",
  "en charge de",
  "initier",
  "opportunité",
  "digital",
  "éventuellement",
  "réaliser",
] as const;

/**
 * Rubric 4.3, FR calques of English syntax (REVIEW). Calibration (seed 7): Jev gave 0.08–0.33 on
 * every calque the French editor found, so these patterns are checked in code. A hit also caps S6
 * at level 2 (see checkPair and evaluate.ts).
 */
export const FR_CALQUE_PATTERNS: { re: RegExp; label: string }[] = [
  // « renommé pour le philosophe », « nommée d’après » ("named after / for").
  { re: /(?<![\p{L}])(?:nomm|renomm|baptis|appel)\p{L}*\s+(?:d[’']après|pour)(?![\p{L}])/iu, label: "« d’après / pour » after a naming verb" },
  // « porte le nom de Reuilly, d’après la rue de Reuilly » ("after the street").
  { re: /,\s*d[’']après (?:la |le |les |l[’'])?(?:rue|boulevard|avenue|place|pont|quai|square|gare|commune|ville|hameau|porte)(?![\p{L}])/iu, label: "« , d’après la rue » for 'after the street'" },
  // « la station a vu la RATP décorer » ("the station saw RATP decorate").
  { re: /(?<![\p{L}])(?:a|ont|avait|avaient) vu (?:la |le |les |l[’'])\p{L}+ (?:\p{L}+ )?\p{L}+(?:er|ir)(?![\p{L}])/iu, label: "inanimate subject + « voir » + infinitive" },
  // « doit son nom à sa proximité avec » ("named for its proximity to").
  { re: /doit son nom à (?:sa|la) proximité/iu, label: "« doit son nom à sa proximité »" },
  // « la station est ensuite simplifiée en » (the name was simplified, not the station).
  { re: /(?<![\p{L}])la station (?:est|a été)\s+(?:\p{L}+\s+)?(?:simplifiée|raccourcie|abrégée)(?![\p{L}])/iu, label: "station simplified (name meant)" },
  // « Définitivement, … » for "certainly"; mid-sentence « définitivement » ("permanently") is correct.
  { re: /(?:^|[.!?]\s+)Définitivement(?![\p{L}])/u, label: "sentence-initial « Définitivement » for 'certainly'" },
];

export function frCalquePatternHits(text: string): string[] {
  return FR_CALQUE_PATTERNS.flatMap((p) => allMatches(text, p.re).map((m) => `${m.trim()} (${p.label})`));
}

/** Context notes are read on their own: an opening pronoun has no antecedent (S5 level 1). */
export const OPENING_PRONOUN = {
  en: /^(?:He|She|It|Its|His|Her|They|Their)(?![\p{L}’'])/u,
  fr: /^(?:Il|Elle|Ils|Elles|Son|Sa|Ses|Leur|Leurs)(?![\p{L}’'])/u,
} as const;

/** Filler that adds no fact (rubric 4.5, persistence and metro-opening padding). REVIEW. */
const FILLER = {
  en: /(?<![\p{L}])(?:simply|(?:long |\w+ years? )?before (?:this |the )?(?:Métro|metro)(?: station)? (?:opened|arrived)(?: in Paris)?)(?![\p{L}])/giu,
  fr: /(?<![\p{L}])(?:tout simplement|(?:bien |\p{L}+ ans )?avant l[’']arrivée du métro|depuis son ouverture)(?![\p{L}])/giu,
} as const;

/**
 * EN hedge words. Case-sensitive on purpose: "may" counts only as a lowercase modal followed by a
 * word ("may have", "may come"), so the month ("on 8 May 1945", "May 1968") is not a hedge.
 * The other words match in lowercase or with a capital first letter.
 */
const capOrLower = (ws: string[]) => ws.map((x) => `[${x[0]!.toUpperCase()}${x[0]}]${x.slice(1)}`).join("|");
export const EN_HEDGES = new RegExp(
  `\\b(may(?= \\p{Ll})|${capOrLower([
    "might",
    "probably",
    "possibly",
    "perhaps",
    "uncertain",
    "disputed",
    "debated",
    "according to",
    "likely",
    "unclear",
    "reportedly",
    "apparently",
    "seemingly",
  ])})\\b`,
  "gu",
);
export const FR_HEDGES =
  /(?<![\p{L}])(serait|seraient|aurait|auraient|pourrait|pourraient|viendrait|viendraient|probablement|peut-être|incertaine?s?|discutée?s?|selon|sans doute|vraisemblablement|semble(?:nt)?|hypothèse)(?![\p{L}])/giu;

const PERSISTENCE = {
  en: /\b(still|remains?|today)\b/gi,
  fr: /(?<![\p{L}])(demeure(?:nt)?|reste(?:nt)?|aujourd[’']hui|toujours)(?![\p{L}])/giu,
} as const;

const EN_ING_NOT_PARTICIPLE = new Set(
  "during according including following bring king building ring morning wing thing something nothing anything everything evening ceiling string spring sibling reading wedding beijing darling sterling pudding lightning".split(
    " ",
  ),
);
const FR_ANT_NOT_PARTICIPLE = new Set(
  "avant pendant durant maintenant cependant tant quant enfant enfants géant restaurant suivant commandant lieutenant habitant habitants marchand vivant auparavant devant néanmoins pourtant important importante quarante cinquante soixante trente constant précédent sergent agent argent moment président dirigeant amant savant savants descendant descendants intendant étudiant étudiants protestant protestants".split(
    " ",
  ),
);

export type CheckContext = {
  /** Official station names (and other proper names) to skip in case and hyphen checks. */
  allowNames: readonly string[];
};

// ---------- per-unit checks ----------

export function wordCountFindings(u: CopyUnit): Finding[] {
  if (u.kind !== "station") return [];
  const lim = WORD_LIMITS[u.field as keyof typeof WORD_LIMITS];
  if (!lim) return [];
  const n = u.wordCount;
  if (n > lim.failAbove)
    return [{ check: "wordCount", severity: "fail", hard: true, message: `${n} words; ${u.field} fails above ${lim.failAbove}` }];
  if (n > lim.target[1])
    return [{ check: "wordCount", severity: "review", message: `${n} words; ${u.field} target is ${lim.target[0]}–${lim.target[1]}` }];
  if (n < lim.reviewBelow)
    return [{ check: "wordCount", severity: "review", message: `${n} words; under ${lim.reviewBelow} (short entries are REVIEW, never FAIL)` }];
  return [];
}

export function sentenceFindings(u: CopyUnit): Finding[] {
  if (!isProse(u)) return [];
  const out: Finding[] = [];
  for (const s of splitSentences(u.text)) {
    const n = countWords(s);
    if (n > SENTENCE_LIMITS.fail)
      out.push({ check: "sentenceLength", severity: "fail", message: `sentence of ${n} words (> ${SENTENCE_LIMITS.fail})`, match: [s] });
    else if (n > SENTENCE_LIMITS.review)
      out.push({ check: "sentenceLength", severity: "review", message: `sentence of ${n} words (> ${SENTENCE_LIMITS.review})`, match: [s] });
  }
  return out;
}

/** Longest sentence in words, used to cap the S5 score. */
export const maxSentenceLength = (text: string) => Math.max(0, ...sentenceLengths(text));

const LITERAL_ROLE = /^\s*(?:the |a |an |de |d[’'])?(?:[\p{L}’']+\s+){0,2}(?:terminus|representative|représentante?|deputy|député)/iu;

export function flagWordFindings(u: CopyUnit): Finding[] {
  const flags = u.locale === "fr" ? FR_FLAGS : EN_FLAGS;
  const hits: { label: string; tell: string; m: string }[] = [];
  for (const f of flags) {
    const re = new RegExp(f.re.source, `${f.re.flags}g`);
    for (const m of u.text.matchAll(re)) {
      // "served as the line’s terminus", "sert de terminus", "serve as a representative" are literal.
      if (f.tell === "T8" && LITERAL_ROLE.test(u.text.slice(m.index! + m[0].length, m.index! + m[0].length + 40))) continue;
      hits.push({ label: f.label, tell: f.tell, m: m[0] });
    }
  }
  if (hits.length === 0) return [];
  const severity: Severity = hits.length >= 2 ? "fail" : "review";
  // One finding per hit so tells are counted per occurrence; severity follows the per-note total.
  return hits.map((h) => ({
    check: `flag.${u.locale}`,
    severity,
    tell: h.tell,
    message: `flagged phrase "${h.m}" (${h.tell}); ${hits.length} hit(s) in note`,
    match: [h.m],
  }));
}

export function tellPatternFindings(u: CopyUnit): Finding[] {
  if (!isProse(u)) return [];
  const out: Finding[] = [];
  const sentences = splitSentences(u.text);
  const fr = u.locale === "fr";

  // T26 em dash: everywhere, both locales, hard (mechanical).
  if (u.text.includes("—"))
    out.push({ check: "emDash", severity: "fail", hard: true, tell: "T26", message: "em dash (—) is not allowed" });

  // T3 trailing participle clause.
  for (const s of sentences) {
    const m = fr
      ? s.match(/,\s+(\p{Ll}+ant)\b[^,;:]*[.!?]?$/u)
      : s.match(/,\s+([a-z]+ing)\b[^,;:]*[.!?]?$/);
    const word = m?.[1]?.toLowerCase();
    if (word && !(fr ? FR_ANT_NOT_PARTICIPLE : EN_ING_NOT_PARTICIPLE).has(word))
      out.push({ check: "tailClause", severity: "review", tell: "T3", message: `trailing participle clause ("${word}…")`, match: [m![0]] });
  }

  // T5 negative parallelism.
  const neg = fr
    ? /(?<![\p{L}])(pas seulement|pas uniquement|bien plus qu)(?![\p{L}])/iu
    : /\b(not (just|only|merely|simply)\b[^.]*\bbut\b|more than (just|a|an)\b)/i;
  const negM = u.text.match(neg);
  if (negM) out.push({ check: "negParallel", severity: "review", tell: "T5", message: "negative parallelism", match: [negM[0]] });

  // T9 summary or moral closer: last sentence opens with a closing formula.
  const last = sentences[sentences.length - 1] ?? "";
  const closer = fr
    ? /^(Aujourd[’']hui( encore)?|En somme|Ainsi|Au final|Finalement|C[’']est ainsi)\b/u
    : /^(Today|To this day|Thus|In short|Ultimately|The name lives on|It remains)\b/;
  if (sentences.length > 1 && closer.test(last))
    out.push({ check: "closer", severity: "review", tell: "T9", message: "last sentence opens with a closing formula", match: [last] });

  // T15 hedge stacking: two or more hedges in one sentence.
  for (const s of sentences) {
    const hedges = allMatches(s, fr ? FR_HEDGES : EN_HEDGES).map((h) => h.toLowerCase());
    // Attribution ("selon", "according to") and statements of uncertainty ("uncertain") are not hedges on a claim.
    const real = hedges.filter((h) => !/^(selon|according to|uncertain|unclear|disputed|debated|incertaine?s?|discutée?s?|hypothèse)$/.test(h));
    if (real.length >= 2)
      out.push({ check: "hedgeStack", severity: "review", tell: "T15", message: `hedge stacking: ${real.join(", ")}`, match: [s] });
  }

  // T18 additive connector stacking (note under 55 words).
  if (u.wordCount < 55) {
    const re = fr
      ? /(?<![\p{L}])(en outre|de plus|par ailleurs|qui plus est|ainsi|alors)(?![\p{L}])/giu
      : /\b(additionally|moreover|furthermore|also|in addition)\b/gi;
    const conn = allMatches(u.text, re);
    if (conn.length > 1)
      out.push({ check: "connectors", severity: "review", tell: "T18", message: `${conn.length} additive connectors`, match: conn });
  }

  // Persistence filler: info only; the rubric needs a judge to decide if the sentence adds a fact.
  const pers = allMatches(u.text, PERSISTENCE[u.locale]);
  if (pers.length) out.push({ check: "persistence", severity: "info", message: "persistence word (check that its sentence adds a fact)", match: pers });

  const filler = allMatches(u.text, FILLER[u.locale]);
  if (filler.length) out.push({ check: "filler", severity: "review", message: "filler that adds no fact (S4)", match: filler });

  if (u.kind === "station") {
    // Context notes must stand alone (S5 level 1). Etymology notes open with the house formula.
    if (OPENING_PRONOUN[u.locale].test(u.text))
      out.push({ check: "openingPronoun", severity: "review", message: "note opens with a pronoun that has no antecedent in the field (S5 level 1)", match: [u.text.split(/\s+/)[0]!] });
    // "Named for its proximity to…": the possessive in the opening fragment has no antecedent.
    const its = u.locale === "en" ? u.text.match(/^(?:Named|Called)\s+(?:for|after)\s+its\b/) : null;
    if (its) out.push({ check: "openingIts", severity: "review", message: "“its” in the opening fragment has no antecedent", match: [its[0]] });
  }

  return out;
}

/** R2: etymology opens with the name formula. */
export function openingFindings(u: CopyUnit): Finding[] {
  if (u.kind !== "station" || u.field !== "etymology") return [];
  const ok =
    u.locale === "fr"
      ? /^La station (doit son nom|porte le nom|tire son nom|associe|réunit|reprend|combine|rappelle)/u.test(u.text)
      : /^(Called|Named)\b/.test(u.text);
  return ok ? [] : [{ check: "r2Opening", severity: "review", message: "etymology does not open with the house formula (R2)", match: [u.text.split(/\s+/).slice(0, 5).join(" ")] }];
}

function frTypography(u: CopyUnit, ctx: CheckContext): Finding[] {
  const t = u.text;
  const out: Finding[] = [];
  const add = (check: string, severity: Severity, message: string, match: string[]) => {
    if (match.length) out.push({ check: `fr.${check}`, severity, message, match });
  };
  // Remove URLs and times before punctuation checks.
  const prose = t.replace(/https?:\/\/\S+/g, " ").replace(/\d:\d/g, "0");
  add("spaceBeforePunct", "fail", "needs U+202F or U+00A0 before ; : ! ?", allMatches(prose, /.(?<![\u00A0\u202F])[;:!?]/u));
  add("guillemets", "fail", "French quotes need « » with no-break spaces inside", [
    ...allMatches(t, /"/),
    ...allMatches(t, /«(?![\u00A0\u202F])/),
    ...allMatches(t, /(?<![\u00A0\u202F])»/),
  ]);
  add("apostrophe", "fail", "straight apostrophe; use ’", allMatches(t, /'/));
  add("ellipsis", "fail", "three dots; use …", allMatches(t, /\.\.\./));
  add("centuries", "fail", "century form; use XIXe siècle", [
    ...allMatches(t, /\b\d{1,2}(?:e|ème|eme|è)\s+siècle/u),
    ...allMatches(t, /\b[IVXL]+(?:ème|eme|è)(?![\p{L}])/u),
    ...allMatches(t, /Siècle/),
  ]);
  add("ordinals", "fail", "ordinal form; use 2e, 1re", [
    ...allMatches(t, /\b\d+(?:ème|eme|è|ième)(?![\p{L}])/u),
    ...allMatches(t, /(?<![\p{L}])1ère(?![\p{L}])/u),
    ...allMatches(t, /\b2nd\b/),
  ]);
  add("thousands", "fail", "English thousands separator", allMatches(t, /\b\d{1,3},\d{3}\b/));
  add("decades", "fail", "English decade form", [...allMatches(t, /années\s+\d{2}s?\b/), ...allMatches(t, /\b\d{4}'?s\b/)]);
  add("yearRange", "fail", "hyphenated year range; use en dash or « de… à… »", allMatches(t, /\b\d{4}-\d{4}\b/));

  const masked = mask(t, ctx.allowNames);
  const months =
    "Janvier|Février|Mars|Avril|Mai|Juin|Juillet|Août|Septembre|Octobre|Novembre|Décembre|Lundi|Mardi|Mercredi|Jeudi|Vendredi|Samedi|Dimanche";
  add(
    "capitalMonth",
    "review",
    "capitalised month or day name",
    allMatches(masked, new RegExp(`(?<![.!?]\\s|^|-|14 |11 |8 |4 )(?:${months})(?![\\p{L}-])`, "u")),
  );
  add(
    "genericPlaceCase",
    "review",
    "generic place word capitalised mid-sentence (FR uses « rue du Simplon »)",
    allMatches(masked, /(?<=[\p{Ll},;:’'»)]\s)(?:Rue|Avenue|Boulevard|Place|Quai|Gare|Église|Pont|Porte|Square)\s/u).map((s) => s.trim()),
  );
  add("odonymHyphen", "review", "person name in an odonym may need hyphens (rue Victor-Hugo, Saint-Denis)", [
    ...allMatches(masked, /(?<![\p{L}])(?:rue|place|avenue|boulevard|quai)\s+\p{Lu}\p{Ll}+\s+\p{Lu}\p{Ll}+/u),
    ...allMatches(masked, /(?<![\p{L}])Sainte?\s\p{Lu}/u),
  ]);
  add("accentedCapital", "fail", "missing accent on capital (À, É)", [
    ...allMatches(t, /(?:^|[.!?]\s)A\s/),
    ...allMatches(t, /\bE(?:toile|lysées|cole|glise)\b/u),
  ]);
  add("ligature", "fail", "use œ", allMatches(t, /oeuvre|coeur|soeur|voeu|oeil/i));
  add("abbrevSaint", "fail", "abbreviated Saint", allMatches(t, /\bSte?\.?\s/));
  const patternHits = frCalquePatternHits(t);
  if (patternHits.length) out.push({ check: "fr.calquePattern", severity: "review", tell: "T19", message: `calque of English syntax: ${patternHits[0]}`, match: patternHits });
  for (const c of FR_CALQUES) {
    const m = allMatches(t, new RegExp(`(?<![\\p{L}])${c}(?![\\p{L}])`, "iu"));
    if (m.length) out.push({ check: "fr.calqueWord", severity: "review", tell: "T19", message: `possible calque "${m[0]}"`, match: m });
  }
  return out;
}

function enTypography(u: CopyUnit): Finding[] {
  const t = u.text;
  const out: Finding[] = [];
  const add = (check: string, severity: Severity, message: string, match: string[]) => {
    if (match.length) out.push({ check: `en.${check}`, severity, message, match });
  };
  add("apostrophe", "fail", "straight apostrophe; use ’", allMatches(t, /'/));
  add("quotes", "fail", "straight quotes; use “ ”", allMatches(t, /"/));
  add("streetCase", "review", "lowercase street word before a name (house style capitalises Rue, Place…)", allMatches(t, /\b(?:rue|boulevard|avenue|place|quai)\s+(?:de|du|des|d’|\p{Lu})/u));
  add("americanSpelling", "review", "American spelling; house style is British", allMatches(t, /\b(?:honor|center|neighbor)\w*/));
  return out;
}

function sharedTypography(u: CopyUnit, ctx: CheckContext): Finding[] {
  const t = u.text;
  const out: Finding[] = [];
  // Em dash for non-prose units (prose units get it in tellPatternFindings).
  if (!isProse(u) && t.includes("—"))
    out.push({ check: "emDash", severity: "fail", hard: true, tell: "T26", message: "em dash (—) is not allowed" });
  const unspaced = allMatches(t, /[\p{L}]–[\p{L}]/u);
  if (unspaced.length)
    out.push({ check: "stationDash", severity: "fail", message: "unspaced en dash in a compound name; house form is \"A – B\"", match: unspaced });
  const yr = allMatches(t, /\b\d{4}-\d{4}\b/);
  if (yr.length && u.locale === "en") out.push({ check: "en.yearRange", severity: "fail", message: "hyphenated year range; use en dash", match: yr });
  const sp = allMatches(t, / [,.](?!\d)/);
  if (sp.length) out.push({ check: "spaceBeforeComma", severity: "fail", message: "space before comma or full stop", match: sp });
  // Title Case labels (UI, page and line titles).
  const isLabel = !/[.!?]\s/.test(t.trim());
  if (isLabel && (u.kind === "ui" || u.kind === "page" || (u.kind === "line" && u.field === "title"))) {
    const masked = mask(t, ctx.allowNames);
    const words = masked.split(/\s+/).filter((x) => /\p{L}/u.test(x));
    const caps = words.slice(1).filter((x) => /^\p{Lu}\p{Ll}/u.test(x) && !TITLE_ALLOW.has(x.replace(/[^\p{L}]/gu, "")));
    if (words.length > 1 && caps.length >= 2)
      out.push({ check: "titleCase", severity: "fail", message: "Title Case label", match: caps });
  }
  return out;
}

const TITLE_ALLOW = new Set(["Paris", "Métro", "Metro", "French", "RATP", "JavaScript", "Seine", "Noms", "Names", "Wikipédia", "Wikipedia", "Line", "Ligne", "Mairie", "Ivry", "Villejuif", "Louis", "Aragon", "CC", "BY"]);

/** All per-unit deterministic findings. */
export function checkUnit(u: CopyUnit, ctx: CheckContext): Finding[] {
  return [
    ...wordCountFindings(u),
    ...sentenceFindings(u),
    ...(isProse(u) ? flagWordFindings(u) : []),
    ...tellPatternFindings(u),
    ...openingFindings(u),
    ...(u.locale === "fr" ? frTypography(u, ctx) : enTypography(u)),
    ...sharedTypography(u, ctx),
  ];
}

// ---------- pair checks (rubric 4.6) ----------

const ROMAN: Record<string, number> = { I: 1, V: 5, X: 10, L: 50 };
const romanToInt = (r: string) => {
  let n = 0;
  for (let i = 0; i < r.length; i++) {
    const v = ROMAN[r[i]!]!;
    const next = ROMAN[r[i + 1] ?? ""] ?? 0;
    n += v < next ? -v : v;
  }
  return n;
};

const EN_ORDINALS: Record<string, number> = Object.fromEntries(
  "first second third fourth fifth sixth seventh eighth ninth tenth eleventh twelfth thirteenth fourteenth fifteenth sixteenth seventeenth eighteenth nineteenth twentieth"
    .split(" ")
    .map((w, i) => [w, i + 1] as const)
    .concat([["twenty-first", 21]]),
);

/** Numbers in a text, with FR Roman centuries (XIXe) and EN ordinals (19th) as numbers. */
export function extractNumbers(text: string, locale: "en" | "fr"): string[] {
  const nums = [...text.matchAll(/\d+/g)].map((m) => String(Number(m[0])));
  if (locale === "en") {
    for (const m of text.matchAll(/\b([a-z]+(?:-[a-z]+)?)[ -]centur(?:y|ies)\b/gi)) {
      const n = EN_ORDINALS[m[1]!.toLowerCase()];
      if (n) nums.push(String(n));
    }
  }
  if (locale === "fr") {
    // Roman ordinals: "XIXe siècle", "IIIe République". A single letter needs "siècle" after it ("Le" is not 50).
    for (const m of text.matchAll(/(?<![\p{L}])([IVXL]{2,}|[IVX](?=(?:e|er|re)\s+siècle))(?:e|er|re)(?![\p{L}])/gu))
      nums.push(String(romanToInt(m[1]!)));
  }
  return nums.sort();
}

function multisetDiff(a: string[], b: string[]): string[] {
  const rest = [...b];
  const out: string[] = [];
  for (const x of a) {
    const i = rest.indexOf(x);
    if (i >= 0) rest.splice(i, 1);
    else out.push(x);
  }
  return out;
}

const EN_GENERIC_CAPS = new Set(
  "Called Named The A An In On At From After It Its This That These Line Lines Rue Place Avenue Boulevard Quai Gate Porte Church Saint Sainte Station Street Square Bridge Pont Mairie Métro Metro Paris He She They His Her When Until Since During Both Before Its One Two Three First Second Today Later Opened Built Renamed North South East West King Queen Emperor General Marshal Revolution French Republic Empire January February March April May June July August September October November December Monday Tuesday Wednesday Thursday Friday Saturday Sunday English British German Italian Spanish Swiss Belgian Russian American Prussian Austrian Polish Dutch Greek Roman Latin Catholic Protestant Christian Jewish Arab Algerian Moroccan Egyptian Parisian Free World War Battle Abbey Cathedral Museum Hospital School Market Gardens Garden Palace Castle Fort Count Duke Prince Princess Baron Marquis Bishop Pope Cardinal Abbot Mayor President Minister Prefect Marshal Admiral Colonel Captain Lieutenant Sergeant Doctor Brother Sister Father Mother Lady Lord Sir Mount Lake River Island Valley Hill Forest Wood Plain Avenue's".split(
    " ",
  ),
);

/**
 * EN words whose French form differs (folded keys, folded French stems). A name counts as present
 * when FR contains its own stem or one of these stems. Keeps real omissions visible while dropping
 * translated names (Germany/Allemagne, Jena/Iéna, Mary Magdalene/Marie-Madeleine).
 */
export const NAME_MAP: Record<string, string[]> = Object.fromEntries(
  (
    "germany:allemagne,allemand german:allemand,allemagne austria:autrich gallic:gaulois,gaule equality:egalite " +
    "right:droit rights:droit left:gauche bank:rive,berge michelangelo:michel-ange portuguese:portugais,portugal " +
    "terror:terreur tyrian:tyr column:colonne estates:etats michael:michel greece:grece,grec pious:pieux " +
    "benedict:benoit chamber:chambre,depute deputies:deput city:ville hall:hotel,mairie julius:jules caesar:cesar " +
    "burgundy:bourgogne palm:palme,rameaux india:inde cemetery:cimetiere third:troisieme,iiie,3e flanders:flandre " +
    "independence:independ mamluk:mamelouk mamluks:mamelouk guard:garde crown:couronne women:femme irish:irland " +
    "jena:iena keeper:garde seals:sceaux greater:grand mary:marie magdalene:madeleine games:jeux " +
    "spanish:espagn spain:espagn english:anglais,angleterre england:angleterre,anglais british:britann,anglais " +
    "prussia:prusse prussian:prussien london:londres italy:itali italian:itali belgium:belgique russia:russie " +
    "poland:pologne switzerland:suisse swiss:suisse egypt:egypt algeria:algerie venice:venise vienna:vienne " +
    "lisbon:lisbonne moscow:moscou holland:hollande netherlands:pays-bas hungary:hongrie sweden:suede " +
    "denmark:danemark turkey:turquie morocco:maroc tunisia:tunisie brittany:bretagne normandy:normandie " +
    "savoy:savoie picardy:picardie john:jean peter:pierre william:guillaume james:jacques henry:henri " +
    "stephen:etienne anthony:antoine nicholas:nicolas lawrence:laurent mark:marc andrew:andre francis:francois " +
    "augustine:augustin philip:philippe ambrose:ambroise giles:gilles hyacinth:hyacinthe dominic:dominique " +
    "sebastian:sebastien assembly:assemblee parliament:parlement senate:senat council:conseil " +
    "liberation:liberation university:universite academy:academie observatory:observatoire basilica:basilique " +
    "chapel:chapelle convent:couvent priory:prieure fair:foire tower:tour arch:arc triumph:triomphe lady:dame " +
    "sacred:sacre heart:coeur holy:saint spirit:esprit cross:croix good:bon news:nouvelle tomb:tombe " +
    "louis:louis charles:charles napoleon:napoleon,empereur,empire exercises:exercice"
  )
    .split(" ")
    .map((pair) => {
      const [en, fr] = pair.split(":");
      return [en!, fr!.split(",")] as const;
    }),
);

/** Folded words of names (station names, for example) to skip in missingProperNames. */
export const nameWords = (names: Iterable<string>) =>
  new Set([...names].flatMap((n) => fold(n).split(/[\s\-–’']+/u).filter((x) => x.length >= 3)));

/**
 * Capitalised names in EN (not at sentence start, not generic words) that FR does not contain.
 * Compares folded text (accents removed), splits compounds at hyphens and en dashes, skips words of
 * `ignore` (station names: the station is named in the page heading, so FR may leave it out), and
 * accepts the French form from NAME_MAP.
 */
export function missingProperNames(en: string, fr: string, ignore: ReadonlySet<string> = new Set()): string[] {
  const frFold = fold(fr);
  const out = new Set<string>();
  for (const s of splitSentences(en)) {
    let first = true;
    for (const tok of s.split(/\s+/)) {
      const isFirst = first;
      first = false;
      for (const part of tok.split(/[-–]/)) {
        const word = part.replace(/^[^\p{L}]+|[^\p{L}]+$/gu, "").replace(/[’'].*$/, "");
        if (isFirst || word.length < 4 || !/^\p{Lu}/u.test(word) || EN_GENERIC_CAPS.has(word)) continue;
        const f = fold(word);
        if (ignore.has(f)) continue;
        const stem = f.slice(0, Math.max(4, Math.ceil(word.length * 0.7)));
        if (frFold.includes(stem)) continue;
        if (NAME_MAP[f]?.some((x) => frFold.includes(x))) continue;
        out.add(word);
      }
    }
  }
  return [...out];
}

export type PairContext = {
  /** Folded station-name words (see nameWords) that parity.names skips. */
  stationNameWords?: ReadonlySet<string>;
};

export function checkPair(en: CopyUnit, fr: CopyUnit, ctx: PairContext = {}): Finding[] {
  const out: Finding[] = [];
  if (en.kind === "station" || (en.kind === "line" && en.field === "summary")) {
    const enN = extractNumbers(en.text, "en");
    const frN = extractNumbers(fr.text, "fr");
    const onlyEn = multisetDiff(enN, frN);
    const onlyFr = multisetDiff(frN, enN);
    if (onlyEn.length || onlyFr.length)
      out.push({
        check: "parity.numbers",
        severity: "review",
        tell: "T24",
        message: `numbers differ: EN only [${onlyEn.join(", ")}], FR only [${onlyFr.join(", ")}]`,
        match: [...onlyEn, ...onlyFr],
      });
    const ignore = new Set([...(ctx.stationNameWords ?? []), ...nameWords(en.stationName ? [en.stationName] : [])]);
    const names = missingProperNames(en.text, fr.text, ignore);
    if (names.length)
      out.push({ check: "parity.names", severity: "review", message: `EN names not found in FR: ${names.join(", ")}`, match: names });
    const enH = allMatches(en.text, EN_HEDGES).length > 0;
    const frH = allMatches(fr.text, FR_HEDGES).length > 0;
    if (enH !== frH)
      out.push({
        check: "parity.hedge",
        severity: "review",
        tell: "T23",
        message: `hedge in ${enH ? "EN" : "FR"} only`,
      });
  }
  if (en.kind === "station" || en.kind === "line") {
    const calques = frCalquePatternHits(fr.text);
    if (calques.length) out.push({ check: "parity.frCalque", severity: "review", message: `FR copies English syntax (S6 level 2): ${calques.join("; ")}`, match: calques });
  }
  if (en.wordCount > 0 && en.kind === "station") {
    const ratio = fr.wordCount / en.wordCount;
    if (ratio < RATIO_LIMITS.review[0] || ratio > RATIO_LIMITS.review[1])
      out.push({ check: "parity.ratio", severity: "review", message: `FR/EN word ratio ${ratio.toFixed(2)} outside ${RATIO_LIMITS.review.join("–")}` });
  }
  return out;
}

// ---------- corpus checks ----------

/** First `n` words, lowercased, punctuation stripped. */
export const opener = (text: string, n = 3) =>
  text
    .split(/\s+/)
    .slice(0, n)
    .map((x) => x.replace(/[^\p{L}\p{N}’']/gu, "").toLowerCase())
    .join(" ");

/** R2 house openings are mandated and exempt from T20. */
export const isMandatedOpener = (u: CopyUnit) =>
  u.field === "etymology" &&
  (u.locale === "fr" ? /^la station (doit|porte|tire)/.test(opener(u.text, 3)) : /^(called|named)\b/.test(opener(u.text, 1)));

export type OpenerStat = { key: string; opener: string; count: number; total: number; share: number; ids: string[] };

/** Opening n-gram frequency per group (line/field/locale, or field/locale corpus-wide). */
export function openerStats(units: CopyUnit[], groupBy: (u: CopyUnit) => string, n = 3): OpenerStat[] {
  const groups = new Map<string, CopyUnit[]>();
  for (const u of units) {
    const k = groupBy(u);
    groups.set(k, [...(groups.get(k) ?? []), u]);
  }
  const stats: OpenerStat[] = [];
  for (const [key, us] of groups) {
    const counts = new Map<string, string[]>();
    for (const u of us) {
      const o = opener(u.text, n);
      counts.set(o, [...(counts.get(o) ?? []), u.id]);
    }
    for (const [o, ids] of counts) stats.push({ key, opener: o, count: ids.length, total: us.length, share: ids.length / us.length, ids });
  }
  return stats.sort((a, b) => b.count - a.count);
}

export type CorpusFindings = {
  /** Findings attached to individual units (T20, T21, Métro/metro). */
  byUnit: Map<string, Finding[]>;
  /** Group-level findings (sentence rhythm per line/locale/field). */
  groups: { key: string; finding: Finding }[];
  /** Top openers corpus-wide per field and locale, for the report. */
  topOpeners: OpenerStat[];
};

export function checkCorpus(units: CopyUnit[]): CorpusFindings {
  const byUnit = new Map<string, Finding[]>();
  const push = (id: string, f: Finding) => byUnit.set(id, [...(byUnit.get(id) ?? []), f]);
  const groups: CorpusFindings["groups"] = [];
  const stations = units.filter((u) => u.kind === "station");

  // T20: same non-mandated opening on > 10% of a line's notes (and at least 3 notes).
  const lineKey = (u: CopyUnit) => `${u.lineId}/${u.field}/${u.locale}`;
  for (const s of openerStats(stations, lineKey)) {
    if (s.count < 3 || s.share <= 0.1) continue;
    for (const id of s.ids) {
      const u = stations.find((x) => x.id === id)!;
      if (isMandatedOpener(u)) continue;
      push(id, {
        check: "corpus.opener",
        severity: "review",
        tell: "T20",
        message: `opening "${s.opener}" shared by ${s.count}/${s.total} notes on ${s.key}`,
      });
    }
  }

  // T21: whole sentence (6+ words) repeated word for word in another unit of the same locale.
  // A station on two lines (same stationId) may repeat its etymology: no finding. Any other repeat
  // on the same station (context, or across fields) is a REVIEW hint without a tell. A repeat on a
  // different station is T21.
  const sentenceIndex = new Map<string, Set<string>>();
  for (const u of stations) {
    for (const s of splitSentences(u.text)) {
      if (countWords(s) < 6) continue;
      const k = `${u.locale}|${s.toLowerCase()}`;
      sentenceIndex.set(k, (sentenceIndex.get(k) ?? new Set()).add(u.id));
    }
  }
  const unitById = new Map(stations.map((u) => [u.id, u]));
  type Dup = { sentences: string[]; others: Set<string> };
  const addDup = (m: Map<string, Dup>, id: string, sentence: string, others: string[]) => {
    const d = m.get(id) ?? { sentences: [], others: new Set<string>() };
    d.sentences.push(sentence);
    for (const x of others) d.others.add(x);
    m.set(id, d);
  };
  const dupByUnit = new Map<string, Dup>();
  const sameStationByUnit = new Map<string, Dup>();
  for (const [k, ids] of sentenceIndex) {
    if (ids.size < 2) continue;
    const sentence = k.slice(3);
    for (const id of ids) {
      const u = unitById.get(id)!;
      const others = [...ids].filter((x) => x !== id).map((x) => unitById.get(x)!);
      const otherStations = others.filter((o) => o.stationId !== u.stationId);
      const sameStation = others.filter(
        (o) => o.stationId === u.stationId && !(u.field === "etymology" && o.field === "etymology"),
      );
      if (otherStations.length) addDup(dupByUnit, id, sentence, otherStations.map((o) => o.id));
      else if (sameStation.length) addDup(sameStationByUnit, id, sentence, sameStation.map((o) => o.id));
    }
  }
  // One finding per unit, so a copied note counts as one tell.
  for (const [id, d] of dupByUnit)
    push(id, {
      check: "corpus.duplicateSentence",
      severity: "review",
      tell: "T21",
      message: `${d.sentences.length} sentence(s) repeated in ${[...d.others].join(", ")}`,
      match: d.sentences,
    });
  for (const [id, d] of sameStationByUnit)
    push(id, {
      check: "corpus.duplicateSameStation",
      severity: "review",
      message: `${d.sentences.length} sentence(s) repeated on the same station in ${[...d.others].join(", ")} (hint, not a tell)`,
      match: d.sentences,
    });

  // 4.2: uniform rhythm per line/locale/field, and same sentence count share.
  const byGroup = new Map<string, CopyUnit[]>();
  for (const u of stations) byGroup.set(lineKey(u), [...(byGroup.get(lineKey(u)) ?? []), u]);
  for (const [key, us] of byGroup) {
    const lens = us.flatMap((u) => sentenceLengths(u.text));
    const sd = stdev(lens);
    if (sd < 3) groups.push({ key, finding: { check: "corpus.rhythm", severity: "review", message: `sentence length stdev ${sd.toFixed(1)} < 3` } });
    const counts = new Map<number, number>();
    for (const u of us) {
      const n = splitSentences(u.text).length;
      counts.set(n, (counts.get(n) ?? 0) + 1);
    }
    const [mode, modeCount] = [...counts].sort((a, b) => b[1] - a[1])[0] ?? [0, 0];
    if (us.length >= 4 && modeCount / us.length > 0.7)
      groups.push({
        key,
        finding: { check: "corpus.sentenceCount", severity: "review", message: `${modeCount}/${us.length} notes have ${mode} sentence(s)` },
      });
  }

  // Métro / metro: both forms in EN data or UI. Flag the minority form.
  const enUnits = units.filter((u) => u.locale === "en" && u.kind !== "page");
  const accented = enUnits.filter((u) => /\bMétro\b/.test(u.text));
  const plain = enUnits.filter((u) => /\b[Mm]etro\b/.test(u.text));
  if (accented.length && plain.length) {
    const [minority, form] = accented.length <= plain.length ? [accented, "Métro"] : [plain, "metro"];
    for (const u of minority)
      push(u.id, {
        check: "corpus.metroForm",
        severity: "review",
        message: `uses "${form}" while EN copy also uses the other form (${accented.length} Métro / ${plain.length} metro)`,
      });
  }

  const topOpeners = openerStats(
    stations.filter((u) => !isMandatedOpener(u)),
    (u) => `${u.field}/${u.locale}`,
  ).filter((s) => s.count >= 4);

  return { byUnit, groups, topOpeners };
}

// ---------- scoring helpers ----------

export const countFails = (fs: Finding[]) => new Set(fs.filter((f) => f.severity === "fail").map((f) => f.check)).size;
export const softTells = (fs: Finding[]) =>
  fs.filter((f) => f.tell && Number(f.tell.slice(1)) <= 21 && f.severity !== "info");

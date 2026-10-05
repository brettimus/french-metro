import { describe, expect, test } from "bun:test";
import { alignSentences, buildClaims, splitField } from "../scripts/facts/claims";
import { buildNumberIndex, extractNumbers, matchFact, parseNumber, romanToInt } from "../scripts/facts/numbers";
import { blendAnswers, buildQuestions, MODEL, wholeSourceState } from "../scripts/facts/jev";
import { claimRisk, FACTS2_RISK_WEIGHTS, rankPairs, RISK_WEIGHTS, staleConflicts, type ClaimRow } from "../scripts/facts/rank";
import { KNOWN_CONFLICTS, matchKnownConflict } from "../scripts/facts/known-conflicts";
import { compactLine } from "../scripts/facts/run";
import { Bm25Index, buildQuery, chunkText, cleanSourceText, type Passage } from "../scripts/facts/retrieve";
import { htmlToText, isKnownUnreadable, KNOWN_UNREADABLE, stationRefs, stationUrls, USER_AGENT, wikiTitle } from "../scripts/facts/sources";
import { countWords, fold, splitSentences, tokenize } from "../scripts/facts/text";

const keys = (s: string) => extractNumbers(s).map((f) => f.key);
const matches = (claim: string, source: string) => {
  const idx = buildNumberIndex([source]);
  return extractNumbers(claim).map((f) => matchFact(f, idx).matched);
};

describe("number normalization", () => {
  test("dates in English and French give the same key", () => {
    expect(keys("It opened on 19 July 1900.")).toEqual(["d:1900-07-19"]);
    expect(keys("Elle ouvre le 19 juillet 1900.")).toEqual(["d:1900-07-19"]);
    expect(keys("on July 19, 1900")).toEqual(["d:1900-07-19"]);
    expect(keys("le 1er janvier 1860")).toEqual(["d:1860-01-01"]);
    expect(keys("le 3 février 1934")).toEqual(["d:1934-02-03"]);
  });

  test("month-year, day-month, years and ranges", () => {
    expect(keys("in March 2011")).toEqual(["my:2011-03"]);
    expect(keys("en mars 2011")).toEqual(["my:2011-03"]);
    expect(keys("le week-end des 31 mai et 1er juin 2008")).toEqual(["dm:05-31", "d:2008-06-01"]);
    expect(keys("Marcel Sembat (1862–1922)")).toEqual(["y:1862", "y:1922"]);
  });

  test("ordinals and centuries", () => {
    expect(keys("du 18e arrondissement")).toEqual(["n:18"]);
    expect(keys("Paris’s 18th arrondissement")).toEqual(["n:18"]);
    expect(keys("le 1er arrondissement")).toEqual(["n:1"]);
    expect(keys("au XIXe siècle")).toEqual(["c:19"]);
    expect(keys("in the 19th century")).toEqual(["c:19"]);
    expect(keys("a 19th-century church")).toEqual(["c:19"]);
    expect(keys("au 19e siècle")).toEqual(["c:19"]);
    expect(keys("sous la Ve République")).toEqual(["n:5"]);
    expect(keys("La vie de Louis XIV")).toEqual([]);
    expect(romanToInt("XVIII")).toBe(18);
    expect(romanToInt("XIV")).toBe(14);
  });

  test("grouped thousands, decimals and number words", () => {
    expect(parseNumber("1 500")).toBe(1500);
    expect(parseNumber("1,500")).toBe(1500);
    expect(parseNumber("2,5")).toBe(2.5);
    expect(keys("about 1,500 people")).toEqual(["n:1500"]);
    expect(keys("environ 1 500 personnes")).toEqual(["n:1500"]);
    expect(keys("2,5 km")).toEqual(["n:2.5"]);
    expect(keys("the first three stations")).toEqual(["n:3"]);
    expect(keys("dont une quatre-vingtaine près de la station")).toEqual(["n:80"]);
    expect(keys("les trois premières stations")).toEqual(["n:3"]);
  });

  test("matching across languages and formats", () => {
    expect(matches("It opened on 19 July 1900.", "La station ouvre le 19 juillet 1900.")).toEqual([true]);
    expect(matches("It opened on 20 July 1900.", "La station ouvre le 19 juillet 1900.")).toEqual([false]);
    expect(matches("in 1900", "le 19 juillet 1900")).toEqual([true]);
    expect(matches("in the 19th century", "au XIXe siècle")).toEqual([true]);
    expect(matches("in the 19th century", "construite en 1854")).toEqual([true]);
    expect(matches("in the 18th century", "construite en 1854")).toEqual([false]);
    expect(matches("the 18th arrondissement", "du 18e arrondissement")).toEqual([true]);
    expect(matches("three stations", "les 3 stations")).toEqual([true]);
    expect(matches("about 300 people", "environ 300 morts")).toEqual([true]);
    expect(matches("about 1,500 people", "environ 1 500 morts")).toEqual([true]);
  });

  test("a wrong day is reported with a note", () => {
    const idx = buildNumberIndex(["La station ouvre le 19 juillet 1900."]);
    const [fact] = extractNumbers("It opened on 2 July 1900.");
    expect(matchFact(fact!, idx)).toMatchObject({ matched: false, note: "month and year found, day not" });
  });
});

describe("text helpers", () => {
  test("fold removes accents and ligatures", () => {
    expect(fold("Œuvre Élysée Châtelet")).toBe("oeuvre elysee chatelet");
  });

  test("tokenize folds, drops stopwords and plural s", () => {
    expect(tokenize("Les stations de la Révolution")).toEqual(["station", "revolution"]);
  });

  test("splitSentences keeps abbreviations and initials", () => {
    expect(splitSentences("Named for St. Paul. It opened in 1900.")).toEqual(["Named for St. Paul.", "It opened in 1900."]);
    expect(splitSentences("Né vers 300 av. J.-C. Il meurt jeune.")).toEqual(["Né vers 300 av. J.-C. Il meurt jeune."]);
    expect(splitSentences("Built by J. Smith. Opened « Nunca más » later.")).toEqual(["Built by J. Smith.", "Opened « Nunca más » later."]);
    expect(splitSentences("Il ouvre en 1900. 300 personnes y meurent.")).toEqual(["Il ouvre en 1900.", "300 personnes y meurent."]);
  });
});

describe("claim splitting", () => {
  const field = {
    lineId: "9",
    stationId: "x",
    stationName: "X",
    field: "context" as const,
    text: {
      en: "The station opened on 8 November 1922. That section ran between Trocadéro and Exelmans.",
      fr: "La station ouvre le 8 novembre 1922. Le tronçon relie Trocadéro et Exelmans.",
    },
  };

  test("ids, pair keys and counterparts for aligned sentences", () => {
    const claims = splitField(field);
    expect(claims.map((c) => c.id)).toEqual(["9/x/context/en/1", "9/x/context/en/2", "9/x/context/fr/1", "9/x/context/fr/2"]);
    expect(claims.map((c) => c.pairKey)).toEqual(["9/x/context/1", "9/x/context/2", "9/x/context/1", "9/x/context/2"]);
    expect(claims[0]!.counterpart).toBe("La station ouvre le 8 novembre 1922.");
    expect(claims.every((c) => c.aligned && c.stationName === "X" && c.field === "context")).toBe(true);
  });

  test("a sentence split in one locale joins a 2:1 group", () => {
    const claims = splitField({
      ...field,
      text: {
        en: "Ranelagh opened on 8 November 1922 with the first section. That section ran between Trocadéro and Exelmans, on the western edge of Paris.",
        fr: "Ranelagh ouvre le 8 novembre 1922 avec le premier tronçon de la ligne, entre les terminus provisoires de Trocadéro et Exelmans, à l’ouest de Paris.",
      },
    });
    expect(claims.map((c) => c.pairKey)).toEqual(["9/x/context/1", "9/x/context/1", "9/x/context/1"]);
    expect(claims.filter((c) => c.locale === "en").every((c) => !c.aligned)).toBe(true);
  });

  test("alignSentences keeps order and covers every sentence", () => {
    const groups = alignSentences(["A short one.", "Another short one.", "Third."], ["Une courte.", "Une autre courte.", "Troisième."]);
    expect(groups).toEqual([
      { en: [0], fr: [0] },
      { en: [1], fr: [1] },
      { en: [2], fr: [2] },
    ]);
  });
});

describe("chunking and retrieval", () => {
  const sentence = (i: number) => `Sentence number ${i} has exactly eight words here.`;

  test("chunks stay within the size bounds on sentence boundaries", () => {
    const text = Array.from({ length: 60 }, (_, i) => sentence(i)).join(" ");
    const chunks = chunkText(text);
    expect(chunks.length).toBeGreaterThan(2);
    for (const c of chunks.slice(0, -1)) {
      expect(countWords(c)).toBeGreaterThanOrEqual(100);
      expect(countWords(c)).toBeLessThanOrEqual(150);
      expect(c.endsWith(".")).toBe(true);
    }
    expect(chunks.join(" ")).toBe(text);
  });

  test("a very long sentence is cut into windows; a short tail merges", () => {
    const long = Array.from({ length: 400 }, (_, i) => `w${i}`).join(" ");
    const chunks = chunkText(long);
    expect(chunks.every((c) => countWords(c) <= 150)).toBe(true);
    expect(chunks.join(" ")).toBe(long);
    expect(chunkText("One short paragraph.")).toEqual(["One short paragraph."]);
  });

  test("cleanSourceText drops headings and the bibliography tail", () => {
    const text = "Intro text.\n== Histoire ==\nOuverte en 1900.\n== Notes et références ==\nConsulté le 3 mars 2020.";
    expect(cleanSourceText(text)).toBe("Intro text.\nOuverte en 1900.");
  });

  test("BM25 ranks the matching passage first, with accent folding", () => {
    const mk = (key: string, text: string): Passage => ({ key, url: "u", text, tokens: tokenize(text) });
    const ps = [mk("a", "La gare de l'Est dessert l'est de la France."), mk("b", "Le général Mouton-Duvernet est fusillé à Lyon en 1816."), mk("c", "Une église du XIXe siècle.")];
    const index = new Bm25Index(ps);
    const top = index.top(buildQuery([{ text: "General Mouton-Duvernet was executed in Lyon in 1816", weight: 1 }, { text: "Il est fusillé à Lyon en 1816.", weight: 1 }]), ps, 5);
    expect(top[0]!.passage.key).toBe("b");
    expect(top.map((t) => t.passage.key)).not.toContain("a");
  });
});

describe("sources helpers", () => {
  test("wikiTitle decodes the article title", () => {
    expect(wikiTitle("https://fr.wikipedia.org/wiki/Nation_(m%C3%A9tro_de_Paris)#Histoire")).toEqual({ lang: "fr", title: "Nation (métro de Paris)" });
    expect(wikiTitle("https://www.paris.fr/pages/x")).toBeUndefined();
  });

  test("htmlToText drops scripts and decodes entities", () => {
    expect(htmlToText("<html><script>x()</script><p>Caf&eacute; &amp; gare</p><p>B&#233;rault</p></html>")).toBe("Café & gare\nBérault");
  });

  test("every known unreadable link is still cited by a station", () => {
    const cited = new Set(stationRefs().flatMap((r) => stationUrls(r.station).map((u) => u.url)));
    for (const k of KNOWN_UNREADABLE) expect(cited.has(k.url)).toBe(true);
    expect(isKnownUnreadable(KNOWN_UNREADABLE[0]!.url)).toBe(true);
    expect(isKnownUnreadable("https://fr.wikipedia.org/wiki/Nation")).toBe(false);
  });

  test("every station cites its station article", () => {
    // A station's `sources` override replaces the default list, so a fix can drop the station article by accident.
    const missing = stationRefs()
      .filter((r) => !r.station.sources.some((src) => /_\(m%C3%A9tro_de_Paris\)$/.test(src.url)))
      .map((r) => `${r.lineId}/${r.station.id}`);
    expect(missing).toEqual(["9/republique"]);
  });

  test("the user agent is generic", () => {
    expect(USER_AGENT).toBe("french-metro-factcheck/1.0");
  });
});

describe("risk", () => {
  const row = (over: Partial<ClaimRow>): ClaimRow =>
    ({
      id: "1/a/context/en/1",
      pairKey: "1/a/context/1",
      locale: "en",
      unmatched: [],
      numbers: [],
      passages: [{ id: "p1", url: "u", score: 1, text: "t" }],
      jev: { supported: 1, contradicted: 0, bestPassage: "p1", ms: 0, cached: false },
      fetchFailure: 0,
      risk: 0,
      riskParts: {},
      ...over,
    }) as ClaimRow;

  test("claim risk adds weighted signals", () => {
    expect(claimRisk(row({})).risk).toBe(0);
    const r = claimRisk(row({ jev: { supported: 0.2, contradicted: 0.9, bestPassage: "none", ms: 0, cached: false }, unmatched: [{ fact: { kind: "year", raw: "1900", key: "y:1900" }, matched: false }], fetchFailure: 1 }));
    const w = RISK_WEIGHTS;
    expect(r.risk).toBeCloseTo(w.contradicted * 0.9 + w.unsupported * 0.8 + w.noPassage + w.unmatchedNumber + w.fetchFailure, 3);
  });

  test("pairs take the mean unsupported part and the strongest value of each other signal", () => {
    const en = row({ risk: 0.6, riskParts: { unsupported: 0.6 } });
    const fr = row({ id: "1/a/context/fr/1", locale: "fr", risk: 0.3, riskParts: { unsupported: 0.1, numbers: 0.2 } });
    const other = row({ id: "1/b/context/en/1", pairKey: "1/b/context/1", risk: 0.3, riskParts: { unsupported: 0.3 } });
    const { pairs, excluded } = rankPairs([en, fr, other]);
    expect(excluded).toEqual([]);
    expect(pairs.map((p) => p.pairKey)).toEqual(["1/a/context/1", "1/b/context/1"]);
    expect(pairs[0]!.riskParts).toEqual({ unsupported: 0.35, numbers: 0.2 });
    expect(pairs[0]!.risk).toBeCloseTo(0.35 + 0.2 + RISK_WEIGHTS.pairDisagreement * 0.3, 3);
    expect(pairs[0]!.disagreement).toBeCloseTo(0.3, 3);
  });

  test("the unsupported part of a pair is the mean over its claims (facts-2: the lowest supported score)", () => {
    const jev = (supported: number) => ({ supported, contradicted: 0, bestPassage: "p1", ms: 0, cached: false });
    const scored = (over: Partial<ClaimRow>) => {
      const r = row(over);
      const { risk, parts } = claimRisk(r);
      return { ...r, risk, riskParts: parts };
    };
    const { pairs } = rankPairs([scored({ jev: jev(0.9) }), scored({ id: "1/a/context/fr/1", locale: "fr", jev: jev(0.2) })]);
    expect(pairs[0]!.riskParts.unsupported).toBeCloseTo(RISK_WEIGHTS.unsupported * (0.1 + 0.8) / 2, 4);
    const old = (over: Partial<ClaimRow>) => {
      const r = row(over);
      const { risk, parts } = claimRisk(r, FACTS2_RISK_WEIGHTS);
      return { ...r, risk, riskParts: parts };
    };
    const facts2 = rankPairs([old({ jev: jev(0.9) }), old({ id: "1/a/context/fr/1", locale: "fr", jev: jev(0.2) })], FACTS2_RISK_WEIGHTS);
    expect(facts2.pairs[0]!.riskParts.unsupported).toBeCloseTo(0.8, 3);
  });

  test("known conflicts are left out of the ranking and stale entries are reported", () => {
    const conflict = { lineId: "1", stationId: "a", field: "context" as const, contains: ["26 April 1937"], note: "n", ref: "r" };
    const unused = { ...conflict, stationId: "b" };
    const hit = row({ lineId: "1", stationId: "a", field: "context", text: "It became X on 26 April 1937.", risk: 0.9, riskParts: { unsupported: 0.9 } });
    const miss = row({ id: "1/a/context/en/2", pairKey: "1/a/context/2", lineId: "1", stationId: "a", field: "context", text: "Opened in 1934.", risk: 0.5, riskParts: { unsupported: 0.5 } });
    const { pairs, excluded } = rankPairs([hit, miss], RISK_WEIGHTS, [conflict, unused]);
    expect(pairs.map((p) => p.pairKey)).toEqual(["1/a/context/2"]);
    expect(excluded.map((p) => [p.pairKey, p.conflict])).toEqual([["1/a/context/1", conflict]]);
    expect(staleConflicts(excluded, [conflict, unused])).toEqual([unused]);
  });

  test("the Saint-Mandé known conflicts match the current copy", () => {
    const texts = buildClaims({ line: "1" }).filter((c) => c.stationId === "saint-mande");
    for (const k of KNOWN_CONFLICTS) {
      const field = texts.filter((c) => c.lineId === k.lineId && c.stationId === k.stationId && c.field === k.field);
      expect(matchKnownConflict({ lineId: k.lineId, stationId: k.stationId, field: k.field, texts: field.map((c) => c.text) })).toBe(k);
    }
  });
});

describe("jev questions and report lines", () => {
  test("blendAnswers: mean supported when both answers exist, passage answer when the whole-source one failed", () => {
    const passage = { supported: 0.2, contradicted: 0.7, bestPassage: "p2", ms: 1, cached: true };
    const whole = { supported: 0.8, contradicted: 0.1, bestPassage: "s1", ms: 2, cached: true };
    expect(blendAnswers(passage, whole)).toEqual({ ...passage, supported: 0.5, passageSupported: 0.2, wholeSupported: 0.8 });
    expect(blendAnswers(passage, { ms: 0, cached: false, error: "max_tokens_exceeded" })).toEqual({ ...passage, passageSupported: 0.2, wholeSupported: undefined, wholeError: "max_tokens_exceeded" });
    expect(blendAnswers(passage, undefined)).toEqual(passage);
    expect(blendAnswers({ ms: 0, cached: false, error: "timeout" }, whole).supported).toBe(0.8);
  });

  test("wholeSourceState replaces the passages with one entry per source and keeps the key order", () => {
    const state = { claim: "c", previous_sentence: "p", station: "S", field: "f", passages: [{ id: "p1", source: "a", text: "t" }] };
    const whole = wholeSourceState(state, [{ source: "fr.wikipedia.org: S", text: "long" }, { source: "b", text: "x" }])!;
    expect(Object.keys(whole)).toEqual(["claim", "previous_sentence", "station", "field", "passages"]);
    expect(whole.passages).toEqual([{ id: "s1", source: "fr.wikipedia.org: S", text: "long" }, { id: "s2", source: "b", text: "x" }]);
    expect(wholeSourceState(state, [])).toBeUndefined();
  });

  test("questions: two Nouls and a Choice over passage ids plus none, model pinned", () => {
    const q = buildQuestions(["p1", "p2"]) as Record<string, { type: string; criteria?: Record<string, unknown> }>;
    expect(q.supported!.type).toBe("noul");
    expect(q.contradicted!.type).toBe("noul");
    expect(Object.keys(q.best_passage!.criteria!)).toEqual(["p1", "p2", "none"]);
    expect(MODEL).toBe("jev-1.13.0");
  });

  test("compactLine shows scores per locale, unmatched numbers and the best passage URL", () => {
    const base = {
      pairKey: "9/x/context/1", lineId: "9", stationId: "x", stationName: "X", field: "context", n: 1, aligned: true, counterpart: "", fieldText: "",
      numbers: [], fetchFailure: 0, riskParts: {}, passages: [{ id: "p1", url: "https://a", score: 1, text: "t" }],
    };
    const en = { ...base, id: "9/x/context/en/1", locale: "en", text: "Opened in 1922.", unmatched: [], risk: 0.4, riskParts: { unsupported: 0.4 },
      jev: { supported: 0.3, contradicted: 0.6, bestPassage: "p1", ms: 0, cached: false } } as unknown as ClaimRow;
    const fr = { ...base, id: "9/x/context/fr/1", locale: "fr", text: "Ouverte en 1922.", risk: 0.1,
      unmatched: [{ fact: { kind: "year", raw: "1922", key: "y:1922" }, matched: false }],
      jev: { supported: 0.9, contradicted: 0.1, bestPassage: "none", ms: 0, cached: false } } as unknown as ClaimRow;
    const [pair] = rankPairs([en, fr]).pairs;
    expect(compactLine(1, pair!)).toBe("1 | 9/x/context/en/1 | 0.20 | en 0.30 fr 0.90 | en 0.60 fr 0.10 | fr:1922 | Opened in 1922. | https://a");
  });
});

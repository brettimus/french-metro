import { describe, expect, test } from "bun:test";
import type { CopyUnit } from "../scripts/copy/corpus";
import { buildCorpus, countWords } from "../scripts/copy/corpus";
import {
  checkCorpus,
  checkPair,
  checkUnit,
  countFails,
  extractNumbers,
  missingProperNames,
  nameWords,
  opener,
  splitSentences,
  stdev,
  type Finding,
} from "../scripts/copy/checks";
import { assembleRow, selectPairs, unitRequest, WEIGHTS, type JevResult } from "../scripts/copy/evaluate";
import { messages } from "../src/i18n";
import { UI_USAGE } from "../scripts/copy/ui-usage";

const ctx = { allowNames: ["Porte de Clignancourt", "Place d’Italie", "Gare de l’Est"] };

function unit(over: Partial<CopyUnit> & Pick<CopyUnit, "text">): CopyUnit {
  const base = {
    kind: "station" as const,
    field: "etymology",
    locale: "en" as const,
    lineId: "4",
    stationId: "x",
    stationName: "X",
    ...over,
  };
  const pairId = over.pairId ?? `station/${base.lineId}/${base.stationId}/${base.field}`;
  return { ...base, pairId, id: `${pairId}/${base.locale}`, wordCount: countWords(over.text) };
}
const checks = (fs: Finding[]) => fs.map((f) => f.check);
const words = (n: number, w = "word") => Array.from({ length: n }, () => w).join(" ");

describe("text helpers", () => {
  test("splits sentences, keeping initials and Saint abbreviations together", () => {
    expect(splitSentences("Called X after J. Hugo. It opened in 1900.")).toEqual(["Called X after J. Hugo.", "It opened in 1900."]);
    expect(splitSentences("La station ouvre en 1900. « Le nom » vient de là.")).toHaveLength(2);
  });
  test("stdev", () => {
    expect(stdev([5, 5, 5])).toBe(0);
    expect(stdev([2, 4])).toBe(1);
  });
  test("opener lowercases and strips punctuation", () => {
    expect(opener("The station, opened in 1900.")).toBe("the station opened");
  });
});

describe("word counts", () => {
  test("etymology over 55 words is a hard fail; 46–55 is review; under 15 is review", () => {
    expect(checkUnit(unit({ text: `Called X after ${words(60)}.` }), ctx).find((f) => f.check === "wordCount")).toMatchObject({ severity: "fail", hard: true });
    expect(checkUnit(unit({ text: `Called X after ${words(47)}.` }), ctx).find((f) => f.check === "wordCount")?.severity).toBe("review");
    expect(checkUnit(unit({ text: "Called X after a street." }), ctx).find((f) => f.check === "wordCount")?.severity).toBe("review");
    expect(checks(checkUnit(unit({ text: `Called X after ${words(25)}.` }), ctx))).not.toContain("wordCount");
  });
  test("context limits are wider", () => {
    const u = unit({ field: "context", text: `It ${words(60)}.` });
    expect(checkUnit(u, ctx).find((f) => f.check === "wordCount")?.severity).toBe("review");
  });
  test("UI strings are not word-counted", () => {
    expect(checks(checkUnit(unit({ kind: "ui", field: "close", text: "Close", pairId: "ui/close" }), ctx))).toEqual([]);
  });
});

describe("sentence length", () => {
  test("over 25 is review, over 35 is fail", () => {
    expect(checkUnit(unit({ text: `Called X after ${words(25)}.` }), ctx).find((f) => f.check === "sentenceLength")?.severity).toBe("review");
    expect(checkUnit(unit({ field: "context", text: `It ${words(37)}.` }), ctx).find((f) => f.check === "sentenceLength")?.severity).toBe("fail");
  });
});

describe("flag words", () => {
  test("one hit is review, two are fail, each tagged with a tell", () => {
    const one = checkUnit(unit({ text: "Called X after an iconic street." }), ctx).filter((f) => f.check === "flag.en");
    expect(one).toHaveLength(1);
    expect(one[0]).toMatchObject({ severity: "review", tell: "T4" });
    const two = checkUnit(unit({ text: "Called X after a street. It serves as a testament to the past." }), ctx).filter((f) => f.check === "flag.en");
    expect(two.map((f) => f.tell).sort()).toEqual(["T1", "T8"]);
    expect(two.every((f) => f.severity === "fail")).toBe(true);
  });
  test("French list matches inflected forms and elision", () => {
    const fs = checkUnit(unit({ locale: "fr", text: "La station doit son nom à une rue emblématique, qui témoigne d’un passé." }), ctx);
    expect(fs.filter((f) => f.check === "flag.fr").map((f) => f.tell).sort()).toEqual(["T1", "T2"]);
  });
  test("words inside other words do not match", () => {
    expect(checks(checkUnit(unit({ text: "Called X after Rue Truchet, a vibrantly named street." }), ctx))).not.toContain("flag.en");
  });
});

describe("tell patterns", () => {
  test("em dash is a hard fail in any unit", () => {
    expect(checkUnit(unit({ text: "Called X after a street—the old one." }), ctx).find((f) => f.check === "emDash")).toMatchObject({ hard: true, tell: "T26" });
    expect(checkUnit(unit({ kind: "ui", field: "a", text: "Close — now", pairId: "ui/a" }), ctx).some((f) => f.check === "emDash")).toBe(true);
  });
  test("trailing participle clause (T3), but not prepositions", () => {
    expect(checkUnit(unit({ text: "Called X after a street, highlighting its importance." }), ctx).some((f) => f.tell === "T3")).toBe(true);
    expect(checkUnit(unit({ text: "Called X after a street, during the war." }), ctx).some((f) => f.tell === "T3")).toBe(false);
    expect(checkUnit(unit({ locale: "fr", text: "La station doit son nom à la rue, rappelant ainsi son passé." }), ctx).some((f) => f.tell === "T3")).toBe(true);
    expect(checkUnit(unit({ locale: "fr", text: "La station doit son nom à la rue, pendant la guerre." }), ctx).some((f) => f.tell === "T3")).toBe(false);
  });
  test("negative parallelism (T5) and closer (T9)", () => {
    expect(checkUnit(unit({ text: "Called X after a street. It is not just a station but a symbol." }), ctx).some((f) => f.tell === "T5")).toBe(true);
    expect(checkUnit(unit({ field: "context", text: "It opened in 1900. Today the name lives on." }), ctx).some((f) => f.tell === "T9")).toBe(true);
  });
  test("hedge stacking (T15) ignores statements of uncertainty", () => {
    expect(checkUnit(unit({ text: "Called X after a man who may possibly have lived here." }), ctx).some((f) => f.tell === "T15")).toBe(true);
    expect(checkUnit(unit({ text: "Called X after a man who may perhaps have lived here." }), ctx).some((f) => f.tell === "T15")).toBe(true);
    expect(checkUnit(unit({ text: "Called X after a word whose origin is uncertain: perhaps a game." }), ctx).some((f) => f.tell === "T15")).toBe(false);
  });
  test("R2 opening", () => {
    expect(checks(checkUnit(unit({ text: "Throughout history the area changed. Called X after a street." }), ctx))).toContain("r2Opening");
    expect(checks(checkUnit(unit({ locale: "fr", text: "La station porte le nom de la rue." }), ctx))).not.toContain("r2Opening");
  });
});

describe("French typography", () => {
  const fr = (text: string) => checkUnit(unit({ locale: "fr", text }), ctx);
  test("space before high punctuation", () => {
    expect(checks(fr("La station doit son nom à la rue ; elle ouvre en 1900."))).toContain("fr.spaceBeforePunct");
    expect(checks(fr("La station doit son nom à la rue ; elle ouvre en 1900."))).not.toContain("fr.spaceBeforePunct");
    expect(checks(fr("La station doit son nom à la rue : la rue X."))).not.toContain("fr.spaceBeforePunct");
  });
  test("apostrophe, guillemets, centuries, ordinals, year range, ligature, Saint", () => {
    const fs = checks(fr("La station doit son nom à l'église St Paul, du 19ème siècle, « ancienne » (1800-1850), au coeur."));
    for (const c of ["fr.apostrophe", "fr.guillemets", "fr.centuries", "fr.ordinals", "fr.yearRange", "fr.ligature", "fr.abbrevSaint"]) expect(fs).toContain(c);
  });
  test("correct forms pass", () => {
    const fs = checks(fr("La station doit son nom à l’église Saint-Paul, du XIXe siècle, « ancienne », au cœur du 2e arrondissement."));
    for (const c of ["fr.apostrophe", "fr.guillemets", "fr.centuries", "fr.ordinals", "fr.ligature", "fr.abbrevSaint"]) expect(fs).not.toContain(c);
  });
  test("capitalised generic place word mid-sentence, with station names allowed", () => {
    expect(checks(fr("La station doit son nom à la Rue du Simplon."))).toContain("fr.genericPlaceCase");
    expect(checks(fr("La station doit son nom à la rue du Simplon."))).not.toContain("fr.genericPlaceCase");
    expect(checks(fr("La station est proche de Place d’Italie."))).not.toContain("fr.genericPlaceCase");
  });
  test("calque word list", () => {
    expect(fr("La station doit son nom à la rue, nommée d’après un général.").some((f) => f.check === "fr.calquePattern" && f.tell === "T19")).toBe(true);
    expect(fr("Il ne faut pas initier ce projet.").some((f) => f.check === "fr.calqueWord" && f.tell === "T19")).toBe(true);
  });
  test("calques of English syntax, with correct uses left alone", () => {
    const hit = (t: string) => fr(t).some((f) => f.check === "fr.calquePattern");
    expect(hit("La station porte le nom de Reuilly, d’après la rue de Reuilly.")).toBe(true);
    expect(hit("Le boulevard est renommé pour le philosophe Denis Diderot.")).toBe(true);
    expect(hit("Ouverte en 1922, la station a vu la RATP décorer ses plaques.")).toBe(true);
    expect(hit("La station doit son nom à sa proximité avec la mairie.")).toBe(true);
    expect(hit("La station est ensuite simplifiée en Boulets – Montreuil.")).toBe(true);
    expect(hit("Définitivement, ce nom s’impose.")).toBe(true);
    expect(hit("Ce tronçon passe définitivement à la ligne 6 en 1942.")).toBe(false);
    expect(hit("La station doit son nom à la rue, d’après la tradition.")).toBe(false);
    const en = unit({ text: "Called Reuilly after the street." });
    const frU = unit({ locale: "fr", text: "La station porte le nom de Reuilly, d’après la rue de Reuilly." });
    expect(checkPair(en, frU).map((f) => f.check)).toContain("parity.frCalque");
  });
});

describe("English typography", () => {
  test("straight apostrophe and quotes, hyphen year range, unspaced station dash", () => {
    const fs = checks(checkUnit(unit({ text: "Called X after the king's \"old\" street (1800-1850), near Bobigny–Pablo Picasso." }), ctx));
    for (const c of ["en.apostrophe", "en.quotes", "en.yearRange", "stationDash"]) expect(fs).toContain(c);
  });
  test("year ranges with an en dash pass the station-dash check", () => {
    expect(checks(checkUnit(unit({ text: "Called X after a general (1775–1852)." }), ctx))).not.toContain("stationDash");
  });
  test("Title Case labels fail; single-sentence labels with proper nouns pass", () => {
    expect(checks(checkUnit(unit({ kind: "ui", field: "a", text: "Embark On Your Journey", pairId: "ui/a" }), ctx))).toContain("titleCase");
    expect(checks(checkUnit(unit({ kind: "ui", field: "b", text: "Maps and travel information", pairId: "ui/b" }), ctx))).not.toContain("titleCase");
  });
});

describe("pair checks", () => {
  test("numbers, with Roman and spelled centuries", () => {
    expect(extractNumbers("au début du XIXe siècle", "fr")).toEqual(["19"]);
    expect(extractNumbers("in the early nineteenth century", "en")).toEqual(["19"]);
    expect(extractNumbers("Le nom vient de là.", "fr")).toEqual([]);
    const en = unit({ text: "Called X after a street, opened on 19 July 1900." });
    const fr = unit({ locale: "fr", text: "La station doit son nom à une rue ouverte en 1900." });
    expect(checkPair(en, fr).find((f) => f.check === "parity.numbers")?.match).toEqual(["19"]);
  });
  test("names missing from FR", () => {
    expect(missingProperNames("Called Simplon after the pass linking the canton of Valais with Italy.", "La station porte le nom du col reliant la Suisse à l’Italie.")).toEqual(["Simplon", "Valais"]);
  });
  test("names: accents folded, compounds split, station names skipped, French forms accepted", () => {
    expect(missingProperNames("Called after the Battle of Jena, won over Prussia.", "La station rappelle la bataille d’Iéna, gagnée contre la Prusse.")).toEqual([]);
    expect(missingProperNames("Called after Mary Magdalene, near Germany.", "La station rappelle Marie-Madeleine, près de l’Allemagne.")).toEqual([]);
    expect(missingProperNames("It links to Villejuif–Louis Aragon.", "Elle mène à la station.", nameWords(["Villejuif–Louis Aragon"]))).toEqual([]);
    expect(missingProperNames("Called after the canton of Valais.", "La station porte le nom du col.")).toEqual(["Valais"]);
  });
  test("the month May is not a hedge; the modal may is", () => {
    const en = unit({ text: "Called X after the victory of 8 May 1945. The square was renamed in May 1946." });
    const fr = unit({ locale: "fr", text: "La station rappelle la victoire du 8 mai 1945. La place est renommée en mai 1946." });
    expect(checks(checkPair(en, fr))).not.toContain("parity.hedge");
    const enModal = unit({ text: "Called X after a farm. May 1900 saw the street opened; the name may come from a farm." });
    expect(checkPair(enModal, fr).some((f) => f.check === "parity.hedge")).toBe(true);
  });
  test("hedge in one locale only", () => {
    const en = unit({ text: "Called X after a man who may have lived here." });
    const fr = unit({ locale: "fr", text: "La station doit son nom à un homme qui a vécu ici." });
    expect(checkPair(en, fr).some((f) => f.check === "parity.hedge" && f.tell === "T23")).toBe(true);
  });
  test("length ratio", () => {
    const en = unit({ text: `Called X after ${words(30)}.` });
    const fr = unit({ locale: "fr", text: "La station doit son nom à une rue." });
    expect(checks(checkPair(en, fr))).toContain("parity.ratio");
  });
});

describe("source self-reference (T17)", () => {
  const t17 = (text: string, locale: "en" | "fr" = "en") =>
    checkUnit(unit({ field: "context", locale, text }), ctx).filter((f) => f.tell === "T17").map((f) => f.match?.[0]);
  test("EN references to articles, Wikipedia and sources", () => {
    expect(t17("The English line article dates the terminus to 1936.")).toEqual(["English line article"]);
    expect(t17("A pillar carries what its own article calls a gauge.")).toEqual(["own article"]);
    expect(t17("According to its French Wikipedia article, it is one of two.")).toEqual(["According to its French Wikipedia article"]);
    expect(t17("The sources checked for this station do not explain it.")).toEqual(["The sources checked"]);
    expect(t17("The station opened in 1900 near the Seine.")).toEqual([]);
  });
  test("FR references to articles, Wikipédia and sources", () => {
    expect(t17("Un pilier porte ce que son propre article qualifie de manomètre.", "fr")).toEqual(["son propre article"]);
    expect(t17("Selon l’article consacré à la place, la famille est ancienne.", "fr")).toEqual(["Selon l’article consacré"]);
    expect(t17("C’est l’une de deux stations, selon Wikipédia.", "fr")).toEqual(["selon Wikipédia"]);
    expect(t17("L’article anglais situe le terminus en 1936.", "fr")).toEqual(["L’article anglais"]);
    expect(t17("La station ouvre en 1900 près de la Seine.", "fr")).toEqual([]);
  });
});

describe("corpus checks", () => {
  test("template openings over 10% of a line, mandated openings exempt", () => {
    const us = [
      ...Array.from({ length: 4 }, (_, i) => unit({ field: "context", stationId: `s${i}`, text: `The station opened in 190${i}.` })),
      ...Array.from({ length: 6 }, (_, i) => unit({ field: "context", stationId: `t${i}`, text: `Platform ${i} is long.` })),
      ...Array.from({ length: 10 }, (_, i) => unit({ stationId: `e${i}`, text: `Called E${i} after a street.` })),
    ];
    const res = checkCorpus(us);
    const flagged = [...res.byUnit].filter(([, fs]) => fs.some((f) => f.tell === "T20")).map(([id]) => id);
    expect(flagged).toHaveLength(4);
    expect(flagged.every((id) => id.includes("/context/"))).toBe(true);
  });
  test("duplicated sentence gives one finding per unit", () => {
    const s = "This long sentence appears word for word twice here.";
    const res = checkCorpus([unit({ lineId: "4", text: `${s} Second ${s.toLowerCase()}` }), unit({ lineId: "6", stationId: "y", text: s })]);
    expect(res.byUnit.get("station/4/x/etymology/en")?.filter((f) => f.tell === "T21")).toHaveLength(1);
  });
  test("shared station: same etymology is not T21; same context is a hint; other station is T21", () => {
    const ety = "Called X after a long street named for a local family.";
    const ctxS = "The station opened with a long curved platform under the square.";
    const res = checkCorpus([
      unit({ lineId: "4", stationId: "x", text: ety }),
      unit({ lineId: "6", stationId: "x", text: ety }),
      unit({ lineId: "4", stationId: "x", field: "context", text: ctxS }),
      unit({ lineId: "6", stationId: "x", field: "context", text: ctxS }),
      unit({ lineId: "7", stationId: "y", field: "context", text: ctxS }),
    ]);
    expect(res.byUnit.get("station/4/x/etymology/en") ?? []).toEqual([]);
    const c4 = res.byUnit.get("station/4/x/context/en") ?? [];
    expect(c4.filter((f) => f.tell === "T21")).toHaveLength(1);
    expect(c4.find((f) => f.tell === "T21")?.message).toContain("station/7/y/context/en");
    expect(c4.find((f) => f.tell === "T21")?.message).not.toContain("station/6/x");
    const onlySame = checkCorpus([
      unit({ lineId: "4", stationId: "x", field: "context", text: ctxS }),
      unit({ lineId: "6", stationId: "x", field: "context", text: ctxS }),
    ]);
    const f = onlySame.byUnit.get("station/4/x/context/en") ?? [];
    expect(f.map((x) => x.check)).toEqual(["corpus.duplicateSameStation"]);
    expect(f[0]?.tell).toBeUndefined();
  });
  test("runs over the real corpus", () => {
    const res = checkCorpus(buildCorpus());
    expect(res.topOpeners.length).toBeGreaterThan(0);
  });
});

describe("evaluator scoring (no network)", () => {
  test("selectPairs samples deterministically by seed", () => {
    const corpus = buildCorpus();
    const a = selectPairs(corpus, { sample: 10, seed: 3 });
    expect(a).toHaveLength(10);
    expect(selectPairs(corpus, { sample: 10, seed: 3 })).toEqual(a);
    expect(selectPairs(corpus, { kind: "line", line: "5" })).toEqual(["line/5/title", "line/5/summary", "line/5/imageAlt"]);
  });
  test("composite uses weights, penalties and hard fails", () => {
    const u = unit({ text: "Called X after a street. It opened in 1900." });
    const score = (s: number, n: number) => ({ type: "score" as const, score: s, confidence: 0.9, probabilities: Object.fromEntries(Array.from({ length: n }, (_, i) => [String(i), i === s ? 1 : 0])), legend: {} });
    const res: JevResult[] = [
      {
        key: "unit", scope: "unit", unitIds: [u.id], ms: 1, model: "jev-1.13.0", requestId: "r1",
        answers: { S1: score(3, 4), S2: score(3, 4), S3: score(3, 4), S4: score(3, 4), S5: score(2, 3), t25_explains_name: { type: "noul", noul: 0.05 }, t4_praise: { type: "noul", noul: 0.9 } },
      },
      { key: "pair", scope: "pair", unitIds: [u.id], ms: 1, answers: { conflict: { type: "noul", noul: 0.02 }, fr_missing: { type: "noul", noul: 0.1 }, en_missing: { type: "noul", noul: 0.1 }, hedge_mismatch: { type: "noul", noul: 0.01 } } },
    ];
    const row = assembleRow(u, [], res);
    expect(row.dims).toMatchObject({ S1: 1, S2: 1, S3: 1, S4: 1, S5: 1, S6: 1 });
    expect(row.hardFails[0]).toContain("T25");
    expect(row.tells).toEqual(["T4 (jev)"]);
    expect(row.composite).toBeCloseTo(0.95);
    expect(Object.values(WEIGHTS.etymology).reduce((a, b) => a + b, 0)).toBeCloseTo(1);
  });
  test("S4 from two Nouls; S3, S5 and S6 caps from code findings", () => {
    const u = unit({ field: "context", text: "Its first name was Vaugirard. Marcel played a prominent role in 1357." });
    const fu = unit({ field: "context", locale: "fr", text: "La station a vu la RATP décorer ses plaques en 2018." });
    const score = (s: number, n: number) => ({ type: "score" as const, score: s, confidence: 0.9, probabilities: Object.fromEntries(Array.from({ length: n }, (_, i) => [String(i), i === s ? 1 : 0])), legend: {} });
    const n = (v: number) => ({ type: "noul" as const, noul: v });
    const res: JevResult[] = [
      { key: "unit", scope: "unit", unitIds: [u.id], ms: 1, answers: { S3: score(3, 4), S5: score(2, 3), deletable_sentence: n(0), filler_phrase: n(1) } },
      { key: "pair", scope: "pair", unitIds: [u.id], ms: 1, answers: { conflict: n(0), fr_missing: n(0), en_missing: n(0), hedge_mismatch: n(0) } },
    ];
    const findings = [...checkUnit(u, ctx), ...checkPair(u, fu)];
    const row = assembleRow(u, findings, res);
    expect(row.dims.S4).toBeCloseTo(2 / 3);
    expect(row.dims.S5).toBe(0);
    expect(row.dims.S3).toBeCloseTo(1 / 3);
    expect(row.dims.S6).toBeCloseTo(1 / 3);
  });
  test("UI: every i18n key has a usage note, and the request carries usage and same-role siblings", () => {
    for (const k of Object.keys(messages.en)) expect(UI_USAGE[k]).toBeDefined();
    const corpus = buildCorpus();
    const byId = new Map(corpus.map((u) => [u.id, u]));
    const req = unitRequest(byId.get("ui/map/en")!, byId, {}, corpus);
    expect(req.state.usage).toContain("button");
    expect(req.state.role).toBe("action");
    const sib = req.state.siblings as Record<string, string>;
    expect(sib.list).toBe("Station list");
    expect(sib.history).toBeUndefined();
    expect(sib.map).toBeUndefined();
    expect(Object.keys(req.questions)).toEqual(expect.arrayContaining(["U1", "word_conflict", "verb_mix"]));
    const heading = unitRequest(byId.get("ui/history/en")!, byId, {}, corpus);
    expect(Object.keys(heading.questions)).not.toContain("verb_mix");
  });
  test("UI U2 is per string, from that string's own Nouls", () => {
    const n = (v: number) => ({ type: "noul" as const, noul: v });
    const score = (s: number, k: number) => ({ type: "score" as const, score: s, confidence: 0.9, probabilities: Object.fromEntries(Array.from({ length: k }, (_, i) => [String(i), i === s ? 1 : 0])), legend: {} });
    const a = unit({ kind: "ui", field: "map", pairId: "ui/map", text: "Route map" });
    const b = unit({ kind: "ui", field: "list", pairId: "ui/list", text: "Station list" });
    const rowA = assembleRow(a, [], [{ key: "u", scope: "unit", unitIds: [a.id], ms: 1, answers: { U1: score(2, 3), word_conflict: n(0.9), verb_mix: n(0) } }]);
    const rowB = assembleRow(b, [], [{ key: "u", scope: "unit", unitIds: [b.id], ms: 1, answers: { U1: score(2, 3), word_conflict: n(0), verb_mix: n(0) } }]);
    expect(rowA.dims.U2).toBeCloseTo(0.1);
    expect(rowB.dims.U2).toBe(1);
  });
  test("countFails counts each failing check once", () => {
    expect(countFails([{ check: "a", severity: "fail", message: "" }, { check: "a", severity: "fail", message: "" }, { check: "b", severity: "review", message: "" }])).toBe(1);
  });
});

import { describe, expect, test } from "bun:test";
import { buildCorpus } from "../scripts/copy/corpus";
import { lines } from "../src/data/lines";
import { messages } from "../src/i18n";

const corpus = buildCorpus();

describe("copy corpus", () => {
  test("every station has etymology and context in both locales", () => {
    for (const line of lines) {
      for (const s of line.stations) {
        const units = corpus.filter(
          (u) => u.kind === "station" && u.lineId === line.id && u.stationId === s.id,
        );
        expect(units.map((u) => `${u.field}/${u.locale}`).sort()).toEqual([
          "context/en",
          "context/fr",
          "etymology/en",
          "etymology/fr",
        ]);
      }
    }
  });

  test("every line has title, summary and imageAlt in both locales", () => {
    for (const line of lines) {
      expect(corpus.filter((u) => u.kind === "line" && u.lineId === line.id)).toHaveLength(6);
    }
  });

  test("every i18n key is present", () => {
    for (const key of Object.keys(messages.en)) {
      expect(corpus.some((u) => u.id === `ui/${key}/fr`)).toBe(true);
      expect(corpus.some((u) => u.id === `ui/${key}/en`)).toBe(true);
    }
  });

  test("ids are unique", () => {
    const ids = corpus.map((u) => u.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("every unit has a pair in the other locale", () => {
    const byPair = new Map<string, string[]>();
    for (const u of corpus) byPair.set(u.pairId, [...(byPair.get(u.pairId) ?? []), u.locale]);
    for (const [pairId, found] of byPair) {
      expect({ pairId, locales: found.sort() }).toEqual({ pairId, locales: ["en", "fr"] });
    }
  });

  test("no unit has empty text and word counts match", () => {
    for (const u of corpus) {
      expect(u.text.trim().length).toBeGreaterThan(0);
      expect(u.wordCount).toBeGreaterThan(0);
      expect(u.id).toBe(`${u.pairId}/${u.locale}`);
    }
  });
});

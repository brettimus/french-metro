import { afterAll, describe, expect, test } from "bun:test";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { noul } from "@typesafe-ai/sdk";
import { cachedSystemOne, jevCacheKey, readJevCache, writeJevCache, type JevCacheEntry } from "../scripts/jev-cache";
import { askJev, buildQuestions, jevRequest, legacyCacheKey, MODEL, type JevState } from "../scripts/facts/jev";

const dir = mkdtempSync(join(tmpdir(), "jev-cache-"));
afterAll(() => rmSync(dir, { recursive: true, force: true }));

const state: JevState = {
  claim: "The station opened in 1900.",
  station: "Bastille",
  field: "context",
  passages: [{ id: "p1", source: "https://example.org", text: "Bastille opened in 1900." }],
};

describe("jevCacheKey", () => {
  const q = { a: noul("Is it true?", { true: "yes", false: "no" }) };
  const key = jevCacheKey(MODEL, q, state);

  test("is stable for the same input", () => {
    expect(jevCacheKey(MODEL, { a: noul("Is it true?", { true: "yes", false: "no" }) }, state)).toBe(key);
  });
  test("changes when a question's text or criteria change", () => {
    expect(jevCacheKey(MODEL, { a: noul("Is it false?", { true: "yes", false: "no" }) }, state)).not.toBe(key);
    expect(jevCacheKey(MODEL, { a: noul("Is it true?", { true: "yes!", false: "no" }) }, state)).not.toBe(key);
    expect(jevCacheKey(MODEL, { b: noul("Is it true?", { true: "yes", false: "no" }) }, state)).not.toBe(key);
  });
  test("changes with the model and the state", () => {
    expect(jevCacheKey("jev-other", q, state)).not.toBe(key);
    expect(jevCacheKey(MODEL, q, { ...state, claim: "The station opened in 1901." })).not.toBe(key);
  });
  test("differs from the legacy facts key", () => {
    expect(jevCacheKey(MODEL, buildQuestions(["p1"]), state)).not.toBe(legacyCacheKey(state));
  });
});

describe("read and write", () => {
  const req = { model: MODEL, questions: buildQuestions(["p1"]), state };
  const entry: JevCacheEntry = { model: MODEL, requestId: "r1", usage: { input_tokens: 10, output_tokens: 1 }, ms: 5, answers: { x: { type: "noul", noul: 0.4 } } };

  test("a written entry is read back, and a dry run hits it without a client", async () => {
    const d = mkdtempSync(join(dir, "rw-"));
    expect(readJevCache(req, { dir: d })).toBeUndefined();
    writeJevCache(req, entry, d);
    expect(readJevCache(req, { dir: d })).toEqual(entry);
    expect(await cachedSystemOne(undefined, req, { dir: d })).toEqual({ ok: true, entry, cached: true });
  });
  test("a miss with no client is an error and makes no call", async () => {
    const d = mkdtempSync(join(dir, "miss-"));
    const r = await cachedSystemOne(undefined, req, { dir: d });
    expect(r.ok).toBe(false);
  });
});

describe("facts legacy fallback", () => {
  test("askJev reads a file stored under the old key", async () => {
    const d = mkdtempSync(join(dir, "legacy-"));
    const old = { supported: 0.9, contradicted: 0.05, bestPassage: "p1", bestPassageConfidence: 0.8, requestId: "req-old", usage: { input_tokens: 2000, output_tokens: 3 }, model: MODEL, ms: 240, cached: false };
    writeFileSync(join(d, `${legacyCacheKey(state)}.json`), JSON.stringify(old));
    expect(await askJev(undefined, state, d)).toEqual({ ...old, cached: true });
  });
  test("the content key wins over the legacy key", async () => {
    const d = mkdtempSync(join(dir, "both-"));
    writeFileSync(join(d, `${legacyCacheKey(state)}.json`), JSON.stringify({ supported: 0.1, ms: 1, cached: false }));
    writeJevCache(jevRequest(state), { ms: 2, answers: { supported: { type: "noul", noul: 0.7 } } }, d);
    const a = await askJev(undefined, state, d);
    expect(a.supported).toBe(0.7);
    expect(a.cached).toBe(true);
  });
});

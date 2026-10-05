/**
 * Jev questions for one claim and its retrieved passages, plus a request runner that uses the content-addressed
 * cache in ../jev-cache.ts (key: model + questions + state), so a rerun only pays for changed claims or questions.
 * Files under the old key (model + QUESTION_VERSION + state) are still read.
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { choice, noul, TypeSafeClient, type Questions } from "@typesafe-ai/sdk";
import { cachedSystemOne, type JevCacheEntry, type JevCacheRequest } from "../jev-cache";

export const MODEL = "jev-1.13.0";
/** Label for the question set in results.json and the legacy cache key. The cache key itself includes the question text. */
export const QUESTION_VERSION = "facts-2";

export type JevState = {
  claim: string;
  /** The sentence before the claim in the station text, only to resolve references such as "it" or "the square". */
  previous_sentence?: string;
  station: string;
  field: string;
  passages: { id: string; source: string; text: string }[];
};

const PREVIOUS_NOTE = " If `previous_sentence` is present, use it only to understand what words like \"it\" or \"the square\" in the claim refer to; judge only the claim.";
const FIELD_NOTE: Record<string, string> = {
  etymology: "etymology (where the station name comes from)",
  context: "context (history of the station or the place)",
};
export const fieldLabel = (field: string) => FIELD_NOTE[field] ?? field;

export function buildQuestions(passageIds: string[], hasPrevious = false): Questions {
  const note = hasPrevious ? PREVIOUS_NOTE : "";
  const options: Record<string, string> = {};
  for (const id of passageIds) options[id] = `Passage ${id} states the main fact of the claim`;
  options.none = "No passage states the main fact of the claim";
  return {
    supported: noul(
      "Is every detail of `claim` stated in `passages` or directly implied by them? The claim is about the Paris Métro station named in `station`. Passages may be in French while the claim is in English." + note,
      {
        true: "Each name, date, number, place, title and relation in the claim is stated in at least one passage, or follows directly from what the passages state",
        false: "At least one detail of the claim is missing from all passages, or is only loosely suggested by them",
      },
    ),
    contradicted: noul(
      "Does some passage in `passages` state something incompatible with a detail of `claim`? The claim is about the Paris Métro station named in `station`. Passages may be in French while the claim is in English." + note,
      {
        true: "A passage gives a different date, number, name, place, title, order of events or reason for something the claim states",
        false: "No passage conflicts with the claim: each detail is confirmed by the passages or not mentioned in them",
      },
    ),
    best_passage: choice("Which passage in `passages` best supports `claim`?", options),
  };
}

export type JevAnswer = {
  supported?: number;
  contradicted?: number;
  bestPassage?: string;
  bestPassageConfidence?: number;
  requestId?: string | null;
  usage?: { input_tokens: number; output_tokens: number };
  model?: string;
  ms: number;
  cached: boolean;
  error?: string;
};

/** The pre-content-address key (model + QUESTION_VERSION + state); kept so the files written under it still hit. */
export const legacyCacheKey = (state: JevState) =>
  createHash("sha1").update(JSON.stringify([MODEL, QUESTION_VERSION, state])).digest("hex");

type RawAnswers = { supported?: { noul?: number }; contradicted?: { noul?: number }; best_passage?: { choice?: string; confidence?: number } };

/** A legacy file holds a JevAnswer; turn it into a cache entry with raw answers. */
function decodeLegacy(raw: unknown): JevCacheEntry {
  const a = raw as JevAnswer;
  return {
    model: a.model,
    requestId: a.requestId,
    usage: a.usage,
    ms: a.ms,
    answers: {
      supported: { type: "noul", noul: a.supported },
      contradicted: { type: "noul", noul: a.contradicted },
      best_passage: { type: "choice", choice: a.bestPassage, confidence: a.bestPassageConfidence },
    },
  };
}

export const jevRequest = (state: JevState): JevCacheRequest => ({
  model: MODEL,
  questions: buildQuestions(state.passages.map((p) => p.id), state.previous_sentence !== undefined),
  state,
});

export async function askJev(client: TypeSafeClient | undefined, state: JevState, dir?: string): Promise<JevAnswer> {
  const r = await cachedSystemOne(client, jevRequest(state), { dir, legacy: { key: legacyCacheKey(state), decode: decodeLegacy } });
  if (!r.ok) return { ms: r.ms, cached: false, requestId: r.requestId, error: r.error };
  const { entry } = r;
  const a = entry.answers as RawAnswers;
  return {
    supported: a.supported?.noul,
    contradicted: a.contradicted?.noul,
    bestPassage: a.best_passage?.choice,
    bestPassageConfidence: a.best_passage?.confidence,
    requestId: entry.requestId,
    usage: entry.usage,
    model: entry.model,
    ms: entry.ms,
    cached: r.cached,
  };
}

export function loadApiKey(): string | undefined {
  if (process.env.TYPESAFE_API_KEY) return process.env.TYPESAFE_API_KEY;
  const envPath = join(import.meta.dir, "../../../../.env");
  if (!existsSync(envPath)) return undefined;
  const line = readFileSync(envPath, "utf8")
    .split("\n")
    .find((l) => l.startsWith("TYPESAFE_API_KEY="));
  return line?.slice("TYPESAFE_API_KEY=".length).trim().replace(/^["']|["']$/g, "") || undefined;
}

export const makeClient = (apiKey: string) =>
  new TypeSafeClient({ apiKey, defaultModel: MODEL, timeout: 30_000, retry: { maxRetries: 4 } });

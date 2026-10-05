/**
 * Jev questions for one claim and its retrieved passages, plus a request runner with a disk cache
 * (cache/jev/<sha1 of model + question version + state>.json), so a rerun only pays for changed claims.
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { APIError, choice, noul, TypeSafeClient, type Questions } from "@typesafe-ai/sdk";
import { CACHE_DIR } from "./sources";

export const MODEL = "jev-1.13.0";
/** Change this when the questions change, so cached answers are not reused. */
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

const JEV_CACHE = join(CACHE_DIR, "jev");
const cacheKey = (state: JevState) =>
  createHash("sha1").update(JSON.stringify([MODEL, QUESTION_VERSION, state])).digest("hex");

export async function askJev(client: TypeSafeClient | undefined, state: JevState): Promise<JevAnswer> {
  const path = join(JEV_CACHE, `${cacheKey(state)}.json`);
  if (existsSync(path)) return { ...(JSON.parse(readFileSync(path, "utf8")) as JevAnswer), cached: true };
  if (!client) return { ms: 0, cached: false, error: "no API key (dry run)" };
  const t0 = performance.now();
  try {
    const { data, requestId } = await client
      .systemOne({ state: state as never, questions: buildQuestions(state.passages.map((p) => p.id), state.previous_sentence !== undefined), model: MODEL })
      .withResponse();
    const a = data.answers as Record<string, { noul?: number; choice?: string; confidence?: number }>;
    const answer: JevAnswer = {
      supported: a.supported?.noul,
      contradicted: a.contradicted?.noul,
      bestPassage: a.best_passage?.choice,
      bestPassageConfidence: a.best_passage?.confidence,
      requestId,
      usage: { input_tokens: data.usage.input_tokens, output_tokens: data.usage.output_tokens },
      model: data.model,
      ms: Math.round(performance.now() - t0),
      cached: false,
    };
    mkdirSync(JEV_CACHE, { recursive: true });
    writeFileSync(path, JSON.stringify(answer));
    return answer;
  } catch (e) {
    const ms = Math.round(performance.now() - t0);
    if (e instanceof APIError) return { ms, cached: false, requestId: e.requestId, error: `${e.status ?? ""} ${e.message}`.trim() };
    return { ms, cached: false, error: e instanceof Error ? e.message : String(e) };
  }
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

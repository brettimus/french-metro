/**
 * Content-addressed disk cache for Jev (TypeSafe systemOne) requests, shared by the fact checker and the copy
 * evaluator. The key is sha1 of the model, the questions and the state, so a change to any question text gives a
 * new key and can never return an old answer. Errors are not cached.
 *
 * Entries live in JEV_CACHE_DIR/<key>.json. A caller can also name a legacy key: when the new key misses, the
 * legacy file is read and decoded into an entry (used by facts/jev.ts for files keyed by QUESTION_VERSION).
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { APIError, type Questions, type TypeSafeClient } from "@typesafe-ai/sdk";

export const JEV_CACHE_DIR = join(import.meta.dir, "facts/cache/jev");

/** What is stored for one request: the raw answers by question name, plus request metadata. */
export type JevCacheEntry = {
  model?: string;
  requestId?: string | null;
  usage?: { input_tokens: number; output_tokens: number };
  ms: number;
  answers: Record<string, unknown>;
};

export type JevCacheRequest = {
  model: string;
  questions: Questions;
  state: unknown;
};

export type JevCacheOptions = {
  /** Cache directory (default JEV_CACHE_DIR). */
  dir?: string;
  /** Read-only fallback: a key from an older scheme, and how to turn its file into an entry. */
  legacy?: { key: string; decode: (raw: unknown) => JevCacheEntry };
};

export type JevCacheResult =
  | { ok: true; entry: JevCacheEntry; cached: boolean }
  | { ok: false; error: string; requestId?: string | null; ms: number };

export const jevCacheKey = (model: string, questions: Questions, state: unknown): string =>
  createHash("sha1").update(JSON.stringify([model, questions, state])).digest("hex");

const readJson = (path: string): unknown => (existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : undefined);

/** The cached entry for a request, from the content key or else the legacy key; undefined on a miss. */
export function readJevCache(req: JevCacheRequest, opts: JevCacheOptions = {}): JevCacheEntry | undefined {
  const dir = opts.dir ?? JEV_CACHE_DIR;
  const hit = readJson(join(dir, `${jevCacheKey(req.model, req.questions, req.state)}.json`));
  if (hit !== undefined) return hit as JevCacheEntry;
  if (!opts.legacy) return undefined;
  const old = readJson(join(dir, `${opts.legacy.key}.json`));
  return old === undefined ? undefined : opts.legacy.decode(old);
}

export function writeJevCache(req: JevCacheRequest, entry: JevCacheEntry, dir = JEV_CACHE_DIR): void {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${jevCacheKey(req.model, req.questions, req.state)}.json`), JSON.stringify(entry));
}

/**
 * Returns the cached answers for a request, or calls Jev and caches a successful response.
 * With no client (a dry run), a miss returns an error and makes no call.
 */
export async function cachedSystemOne(
  client: TypeSafeClient | undefined,
  req: JevCacheRequest,
  opts: JevCacheOptions = {},
): Promise<JevCacheResult> {
  const hit = readJevCache(req, opts);
  if (hit) return { ok: true, entry: hit, cached: true };
  if (!client) return { ok: false, error: "no API key (dry run)", ms: 0 };
  const t0 = performance.now();
  try {
    const { data, requestId } = await client
      .systemOne({ state: req.state as never, questions: req.questions, model: req.model })
      .withResponse();
    const entry: JevCacheEntry = {
      model: data.model,
      requestId,
      usage: { input_tokens: data.usage.input_tokens, output_tokens: data.usage.output_tokens },
      ms: Math.round(performance.now() - t0),
      answers: data.answers as Record<string, unknown>,
    };
    writeJevCache(req, entry, opts.dir);
    return { ok: true, entry, cached: false };
  } catch (e) {
    const ms = Math.round(performance.now() - t0);
    if (e instanceof APIError) return { ok: false, ms, requestId: e.requestId, error: `${e.status ?? ""} ${e.message}`.trim() };
    return { ok: false, ms, error: e instanceof Error ? e.message : String(e) };
  }
}

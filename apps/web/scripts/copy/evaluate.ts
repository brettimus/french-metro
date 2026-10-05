/**
 * Copy evaluator: deterministic checks + Jev (TypeSafe) judgments, per docs/copy/writing-rubric.md.
 *
 * Usage:
 *   bun apps/web/scripts/copy/evaluate.ts [--kind station|line|ui|page] [--line 5]
 *     [--limit N] [--sample N --seed S] [--out dir] [--concurrency 24]
 *     [--model jev-1.13.0] [--timestamp ISO] [--worst 25] [--dry-run]
 *
 * --limit and --sample count EN/FR pairs, so N pairs give 2N units (pair checks need both).
 * --dry-run runs only the deterministic checks (no network).
 * Reads TYPESAFE_API_KEY from the environment, or from the repo-root .env.
 * Writes <out>/<run>/results.json and <out>/<run>/summary.md. Default out: apps/web/scripts/copy/out.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { APIError, TypeSafeClient, VERSION as SDK_VERSION, type Questions } from "@typesafe-ai/sdk";
import { lines } from "../../src/data/lines";
import { buildCorpus, type CopyUnit } from "./corpus";
import { uiUsage } from "./ui-usage";
import {
  checkCorpus,
  checkPair,
  checkUnit,
  countFails,
  maxSentenceLength,
  nameWords,
  softTells,
  type Finding,
} from "./checks";
import {
  CONTEXT_QUESTIONS,
  ETYMOLOGY_QUESTIONS,
  GOOD_WHEN_YES,
  HINT_ONLY,
  LINE_ALT_QUESTIONS,
  LINE_SUMMARY_QUESTIONS,
  LINE_TITLE_QUESTIONS,
  QUESTION_SET_VERSION,
  S4_NOULS,
  SHORT_PAIR_QUESTIONS,
  STATION_PAIR_QUESTIONS,
  TELL_ID,
  UI_CONSISTENCY_QUESTIONS,
  UI_PAIR_QUESTIONS,
  UI_QUESTIONS,
  UI_VERB_QUESTIONS,
  UNIT_HINTS,
} from "./questions";

// ---------- scoring configuration ----------

/** Rubric section 5 weights. Dimensions missing from a run are dropped and the rest renormalised. */
export const WEIGHTS = {
  etymology: { S1: 0.25, S2: 0.2, S3: 0.15, S4: 0.1, S5: 0.1, S6: 0.2 },
  context: { S7: 0.25, S2: 0.2, S3: 0.15, S4: 0.1, S5: 0.1, S6: 0.2 },
  summary: { L1: 0.3, S2: 0.2, S3: 0.2, S4: 0.1, S6: 0.2 },
  imageAlt: { L2: 0.6, S6: 0.4 },
  title: { L3: 0.6, S6: 0.4 },
  ui: { U1: 0.4, U2: 0.3, U3: 0.3 },
} as const satisfies Record<string, Record<string, number>>;

export const PENALTY = { perTell: 0.05, tellCap: 0.25, perFail: 0.05, failCap: 0.2 } as const;
export const BANDS = { ship: 0.85, edit: 0.65 } as const;
export const THRESHOLDS = {
  /** A tell Noul at or above this counts as present. */
  tell: 0.5,
  /** Etymology explains_name below this is hard failure T25. */
  explainsNameHard: 0.2,
  /** Pair conflict above this is hard failure T24. */
  conflictHard: 0.6,
  /** Pair hedge mismatch above this is hard failure T23 (candidate; confirm against sources). */
  hedgeMismatchHard: 0.7,
  /** fr_missing / en_missing above this is a parity flag (S6 level 1). */
  missing: 0.8,
  /** deletable_sentence / filler_phrase at or above this set S4 level 1 / level 3. */
  s4Noul: 0.5,
  /** Nouls between these bounds go to review. */
  review: [0.2, 0.8] as const,
} as const;

const DEFAULT_MODEL = "jev-1.13.0";

type WeightSet = keyof typeof WEIGHTS;
const weightSetFor = (u: CopyUnit): WeightSet =>
  u.kind === "station"
    ? (u.field as "etymology" | "context")
    : u.kind === "line"
      ? (u.field as "summary" | "imageAlt" | "title")
      : "ui";

// ---------- args ----------

type Args = {
  kind?: CopyUnit["kind"];
  line?: string;
  limit?: number;
  sample?: number;
  seed: number;
  out: string;
  concurrency: number;
  model: string;
  timestamp: string;
  worst: number;
  dryRun: boolean;
};

function parseArgs(argv: string[]): Args {
  const get = (name: string) => {
    const i = argv.indexOf(`--${name}`);
    if (i < 0) return undefined;
    const v = argv[i + 1];
    if (v === undefined || v.startsWith("--")) throw new Error(`--${name} needs a value`);
    return v;
  };
  const num = (name: string) => {
    const v = get(name);
    if (v === undefined) return undefined;
    const n = Number(v);
    if (!Number.isFinite(n) || n < 0) throw new Error(`--${name} must be a non-negative number`);
    return n;
  };
  if (argv.includes("--help") || argv.includes("-h")) {
    console.log(readFileSync(import.meta.path, "utf8").split("*/")[0]);
    process.exit(0);
  }
  const kind = get("kind");
  if (kind && !["station", "line", "ui", "page"].includes(kind)) throw new Error(`unknown --kind ${kind}`);
  return {
    kind: kind as Args["kind"],
    line: get("line"),
    limit: num("limit"),
    sample: num("sample"),
    seed: num("seed") ?? 1,
    out: resolve(get("out") ?? join(import.meta.dir, "out")),
    concurrency: num("concurrency") ?? 24,
    model: get("model") ?? DEFAULT_MODEL,
    timestamp: get("timestamp") ?? new Date().toISOString(),
    worst: num("worst") ?? 25,
    dryRun: argv.includes("--dry-run"),
  };
}

function loadApiKey(): string | undefined {
  if (process.env.TYPESAFE_API_KEY) return process.env.TYPESAFE_API_KEY;
  const envPath = join(import.meta.dir, "../../../../.env");
  if (!existsSync(envPath)) return undefined;
  const line = readFileSync(envPath, "utf8")
    .split("\n")
    .find((l) => l.startsWith("TYPESAFE_API_KEY="));
  return line?.slice("TYPESAFE_API_KEY=".length).trim().replace(/^["']|["']$/g, "") || undefined;
}

// ---------- selection ----------

/** Deterministic PRNG (mulberry32). */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function selectPairs(corpus: CopyUnit[], args: Partial<Pick<Args, "kind" | "line" | "limit" | "sample" | "seed">>): string[] {
  let ids = [...new Set(corpus.filter((u) => (!args.kind || u.kind === args.kind) && (!args.line || u.lineId === args.line)).map((u) => u.pairId))];
  if (args.sample !== undefined) {
    const r = rng(args.seed ?? 1);
    const shuffled = ids.map((id) => [r(), id] as const).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
    ids = shuffled.slice(0, args.sample);
  }
  if (args.limit !== undefined) ids = ids.slice(0, args.limit);
  return ids;
}

// ---------- requests ----------

export type Answer =
  | { type: "noul"; noul: number }
  | { type: "score"; score: number; confidence: number; probabilities: Record<string, number>; legend: Record<string, unknown> }
  | { type: "choice"; choice: string; confidence: number; probabilities: Record<string, number> };

type JevRequest = {
  key: string;
  scope: "unit" | "pair";
  /** Unit ids the answers apply to. */
  unitIds: string[];
  state: Record<string, unknown>;
  questions: Questions;
};

export type JevResult = {
  key: string;
  scope: JevRequest["scope"];
  unitIds: string[];
  model?: string;
  requestId?: string | null;
  usage?: { input_tokens: number; output_tokens: number };
  ms: number;
  answers?: Record<string, Answer>;
  error?: string;
};

/** Other UI strings of the same role and locale, for U2 (all other strings for unused keys). */
export function uiSiblings(u: CopyUnit, corpus: CopyUnit[]): Record<string, string> {
  const role = uiUsage(u.field).role;
  return Object.fromEntries(
    corpus
      .filter((x) => x.kind === "ui" && x.locale === u.locale && x.id !== u.id && (role === "unused" || uiUsage(x.field).role === role))
      .map((x) => [x.field, x.text]),
  );
}

export function unitRequest(u: CopyUnit, byId: Map<string, CopyUnit>, lineTitles: Record<string, string[]>, corpus: CopyUnit[] = []): JevRequest {
  let questions: Questions;
  let state: Record<string, unknown>;
  if (u.kind === "station") {
    state = { station: u.stationName, field: u.field, locale: u.locale, text: u.text };
    if (u.field === "etymology") questions = { ...ETYMOLOGY_QUESTIONS, ...UNIT_HINTS[u.locale] };
    else {
      const ety = byId.get(u.id.replace("/context/", "/etymology/"));
      state.etymology = ety?.text ?? "";
      questions = { ...CONTEXT_QUESTIONS, ...UNIT_HINTS[u.locale] };
    }
  } else if (u.kind === "line") {
    state = { line: u.lineId, field: u.field, locale: u.locale, text: u.text };
    if (u.field === "summary") questions = LINE_SUMMARY_QUESTIONS;
    else if (u.field === "imageAlt") questions = LINE_ALT_QUESTIONS;
    else {
      state.other_titles = (lineTitles[u.locale] ?? []).filter((t) => t !== u.text);
      questions = LINE_TITLE_QUESTIONS;
    }
  } else if (u.kind === "ui") {
    const { role, usage } = uiUsage(u.field);
    state = { key: u.field, locale: u.locale, text: u.text, usage, role, siblings: uiSiblings(u, corpus) };
    questions = { ...UI_QUESTIONS, ...UI_CONSISTENCY_QUESTIONS, ...(role === "action" ? UI_VERB_QUESTIONS : {}) };
  } else {
    state = { key: u.field, locale: u.locale, text: u.text, usage: u.note ?? "" };
    questions = UI_QUESTIONS;
  }
  return { key: `unit:${u.id}`, scope: "unit", unitIds: [u.id], state, questions };
}

function pairRequest(en: CopyUnit, fr: CopyUnit): JevRequest | undefined {
  if (en.text === fr.text) return undefined; // shared, unlocalised string; handled by code
  const ids = [en.id, fr.id];
  if (en.kind === "station")
    return { key: `pair:${en.pairId}`, scope: "pair", unitIds: ids, state: { station: en.stationName, field: en.field, en: en.text, fr: fr.text }, questions: STATION_PAIR_QUESTIONS };
  if (en.kind === "line")
    return { key: `pair:${en.pairId}`, scope: "pair", unitIds: ids, state: { line: en.lineId, field: en.field, en: en.text, fr: fr.text }, questions: SHORT_PAIR_QUESTIONS };
  return { key: `pair:${en.pairId}`, scope: "pair", unitIds: ids, state: { key: en.field, en: en.text, fr: fr.text }, questions: UI_PAIR_QUESTIONS };
}

async function mapPool<T, R>(items: T[], limit: number, fn: (x: T, i: number) => Promise<R>): Promise<R[]> {
  const out = new Array<R>(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.max(1, Math.min(limit, items.length)) }, async () => {
      while (next < items.length) {
        const i = next++;
        out[i] = await fn(items[i]!, i);
      }
    }),
  );
  return out;
}

async function runRequest(client: TypeSafeClient, req: JevRequest): Promise<JevResult> {
  const t0 = performance.now();
  const base = { key: req.key, scope: req.scope, unitIds: req.unitIds };
  try {
    const { data, requestId } = await client.systemOne({ state: req.state as never, questions: req.questions }).withResponse();
    return {
      ...base,
      model: data.model,
      requestId,
      usage: { input_tokens: data.usage.input_tokens, output_tokens: data.usage.output_tokens },
      ms: Math.round(performance.now() - t0),
      answers: data.answers as unknown as Record<string, Answer>,
    };
  } catch (e) {
    const ms = Math.round(performance.now() - t0);
    if (e instanceof APIError) return { ...base, ms, requestId: e.requestId, error: `${e.status ?? ""} ${e.message}`.trim() };
    return { ...base, ms, error: e instanceof Error ? e.message : String(e) };
  }
}

// ---------- assembly ----------

type Problem = { kind: "hard" | "flag" | "dimension" | "tell" | "check" | "review"; label: string; detail?: string };

export type Row = {
  id: string;
  pairId: string;
  kind: CopyUnit["kind"];
  field: string;
  locale: CopyUnit["locale"];
  lineId?: string;
  stationName?: string;
  text: string;
  wordCount: number;
  findings: Finding[];
  /** Normalised 0..1 per rubric dimension (1 = best). */
  dims: Record<string, number>;
  /** Raw Jev answers by question name, prefixed by scope ("unit.S1", "pair.conflict"). */
  jev: Record<string, Answer>;
  requestIds: string[];
  tells: string[];
  hardFails: string[];
  flags: string[];
  review: string[];
  hints: Record<string, number>;
  penalty: { tells: number; fails: number };
  composite: number | null;
  band: "ship" | "edit" | "rewrite" | null;
  problems: Problem[];
};

const normScore = (a: Answer) =>
  a.type === "score" ? a.score / Math.max(1, Object.keys(a.probabilities).length - 1) : undefined;

/** Probability that a Noul's problem is present (inverts GOOD_WHEN_YES questions). */
const problemP = (name: string, a: Answer) => (a.type === "noul" ? (GOOD_WHEN_YES.has(name) ? 1 - a.noul : a.noul) : undefined);

function legendFor(a: Answer): string | undefined {
  if (a.type !== "score") return undefined;
  const level = String(Math.round(a.score));
  const v = a.legend[level];
  return typeof v === "string" ? v : v === undefined ? undefined : JSON.stringify(v);
}

export function assembleRow(u: CopyUnit, findings: Finding[], results: JevResult[], sharedText = false): Row {
  const jev: Record<string, Answer> = {};
  const requestIds: string[] = [];
  for (const r of results) {
    if (r.requestId) requestIds.push(r.requestId);
    for (const [name, a] of Object.entries(r.answers ?? {})) jev[`${r.scope}.${name}`] = a;
  }
  const dims: Record<string, number> = {};
  const hints: Record<string, number> = {};
  const tellsJev: string[] = [];
  const hardFails: string[] = [];
  const flags: string[] = [];
  const review: string[] = [];
  const problems: Problem[] = [];
  /** Explanation for dimensions computed in code rather than read from one Score. */
  const derived: Record<string, string> = {};

  for (const [full, a] of Object.entries(jev)) {
    const name = full.slice(full.indexOf(".") + 1);
    if (HINT_ONLY.has(name)) {
      const v = a.type === "noul" ? a.noul : a.type === "score" ? 1 - (normScore(a) ?? 0) : undefined;
      if (v !== undefined) hints[name] = v;
      continue;
    }
    if (S4_NOULS.has(name)) continue; // combined into S4 below
    if (/^[A-Z]\d$/.test(name)) {
      const n = normScore(a);
      if (n !== undefined) dims[name] = n;
      continue;
    }
    const p = problemP(name, a);
    if (p === undefined) continue;
    const tell = TELL_ID[name];
    if (tell) {
      if (p >= THRESHOLDS.tell) tellsJev.push(tell);
      continue;
    }
    if (name === "t25_explains_name" && u.field === "etymology") {
      if (p > 1 - THRESHOLDS.explainsNameHard) hardFails.push(`T25 name not explained (explains=${(1 - p).toFixed(2)})`);
      else if (p > THRESHOLDS.review[0]) review.push(`T25? explains=${(1 - p).toFixed(2)}`);
    }
    if (name === "conflict") {
      if (p > THRESHOLDS.conflictHard) hardFails.push(`T24 EN/FR conflict (${p.toFixed(2)})`);
      else if (p > THRESHOLDS.review[0] + 0.1) review.push(`conflict ${p.toFixed(2)}`);
    }
    if (name === "hedge_mismatch") {
      if (p > THRESHOLDS.hedgeMismatchHard) hardFails.push(`T23 uncertainty in one locale only (${p.toFixed(2)})`);
      else if (p > 0.4) review.push(`hedge mismatch ${p.toFixed(2)}`);
    }
    if (name === "fr_missing" && p > THRESHOLDS.missing) flags.push(`FR leaves out an EN fact (${p.toFixed(2)})`);
    if (name === "en_missing" && p > THRESHOLDS.missing) flags.push(`EN leaves out an FR fact (${p.toFixed(2)})`);
  }

  // S6 from the parity Nouls (rubric S6 levels 1, 3, 4; level 2 "calque" is left to the FR hints).
  const pn = (n: string) => {
    const a = jev[`pair.${n}`];
    return a?.type === "noul" ? a.noul : undefined;
  };
  const conflict = pn("conflict");
  if (conflict !== undefined && u.kind !== "ui" && u.kind !== "page") {
    const missing = Math.max(pn("fr_missing") ?? 0, pn("en_missing") ?? 0);
    const hedge = pn("hedge_mismatch") ?? 0;
    const s6Detail = `conflict ${conflict.toFixed(2)}, missing ${missing.toFixed(2)}, hedge ${hedge.toFixed(2)}`;
    if (conflict > THRESHOLDS.conflictHard || hedge > THRESHOLDS.hedgeMismatchHard || missing > THRESHOLDS.missing) dims.S6 = 0;
    else if (missing > 0.5 || conflict > 0.3 || hedge > 0.4) dims.S6 = 2 / 3;
    else dims.S6 = 1;
    derived.S6 = s6Detail;
    // Rubric S6 level 2 (calque): Jev does not detect French calques, so code patterns set it.
    const calque = findings.find((f) => f.check === "parity.frCalque");
    if (calque && dims.S6 > 1 / 3) {
      dims.S6 = 1 / 3;
      derived.S6 = `${s6Detail}; capped: ${calque.message}`;
    }
  }
  // S4 from two Nouls and the code filler list: a deletable sentence -> level 1 (0), a filler phrase
  // -> level 3 (2/3), else level 4 (1). Thresholds, not expected values: two mid-range Nouls
  // multiplied together pulled every unit down on the calibration sample.
  const ds = jev["unit.deletable_sentence"];
  const fp = jev["unit.filler_phrase"];
  if (ds?.type === "noul" && fp?.type === "noul") {
    const codeFiller = findings.find((f) => f.check === "filler");
    dims.S4 = ds.noul >= THRESHOLDS.s4Noul ? 0 : fp.noul >= THRESHOLDS.s4Noul || codeFiller ? 2 / 3 : 1;
    derived.S4 = `deletable_sentence ${ds.noul.toFixed(2)}, filler_phrase ${fp.noul.toFixed(2)}${codeFiller ? `, code filler "${codeFiller.match?.[0]}"` : ""}`;
  }
  // U2 per string, from its own consistency Nouls (verb_mix is asked for action strings only).
  const wc = jev["unit.word_conflict"];
  const vm = jev["unit.verb_mix"];
  if (wc?.type === "noul") {
    const vmv = vm?.type === "noul" ? vm.noul : 0;
    // Expected normalised level: word conflict -> level 1 (0), verb mix -> level 2 (0.5), else level 3 (1).
    dims.U2 = (1 - wc.noul) * (1 - vmv * 0.5);
    derived.U2 = `word_conflict ${wc.noul.toFixed(2)}${vm?.type === "noul" ? `, verb_mix ${vm.noul.toFixed(2)}` : ""} (vs sibling ${uiUsage(u.field).role} strings)`;
  }

  // S5: cap the judged score with the measured longest sentence (Jev cannot count words),
  // and with an opening pronoun found in code (Jev resolved it from `etymology`).
  if (dims.S5 !== undefined) {
    const longest = maxSentenceLength(u.text);
    const pronoun = findings.find((f) => f.check === "openingPronoun");
    if (pronoun && dims.S5 > 0) {
      dims.S5 = 0;
      derived.S5 = `capped: ${pronoun.message} ("${pronoun.match?.[0]}")`;
    } else if (longest > 35 && dims.S5 > 0) {
      dims.S5 = 0;
      derived.S5 = `capped: longest sentence ${longest} words (> 35)`;
    } else if (longest > 25 && dims.S5 > 1 / 3) {
      dims.S5 = 1 / 3;
      derived.S5 = `capped: longest sentence ${longest} words (> 25)`;
    }
  }
  // U3 for a string identical in both locales (no pair request): treat parity as met.
  if (sharedText && (u.kind === "page" || u.kind === "ui") && dims.U3 === undefined) dims.U3 = 1;

  for (const f of findings) if (f.hard) hardFails.push(`${f.tell ?? f.check} ${f.message}`);

  const codeTells = softTells(findings);
  // S3: a flagged inflated, promotional, fancy-verb or stock phrase found in code caps S3 at level 2
  // (Jev missed single listed phrases such as « joue un rôle important »).
  const s3Tell = codeTells.find((f) => ["T2", "T4", "T8", "T13"].includes(f.tell!));
  if (s3Tell && dims.S3 !== undefined && dims.S3 > 1 / 3) {
    dims.S3 = 1 / 3;
    derived.S3 = `capped: ${s3Tell.message}`;
  }
  const codeTellIds = new Set(codeTells.map((f) => f.tell!));
  const extraJevTells = tellsJev.filter((t) => !codeTellIds.has(t));
  const tells = [...codeTells.map((f) => `${f.tell} ${f.match?.[0] ?? f.check}`), ...extraJevTells.map((t) => `${t} (jev)`)];
  const penaltyTells = Math.min(PENALTY.tellCap, tells.length * PENALTY.perTell);
  const penaltyFails = Math.min(PENALTY.failCap, countFails(findings) * PENALTY.perFail);

  const weights: Record<string, number> = WEIGHTS[weightSetFor(u)];
  let wsum = 0;
  let acc = 0;
  for (const [dim, wt] of Object.entries(weights)) {
    const v = dims[dim];
    if (v === undefined) continue;
    wsum += wt;
    acc += wt * v;
  }
  const composite = wsum > 0 ? Math.max(0, Math.min(1, acc / wsum - penaltyTells - penaltyFails)) : null;
  const band = composite === null ? null : composite >= BANDS.ship ? "ship" : composite >= BANDS.edit ? "edit" : "rewrite";

  for (const h of hardFails) problems.push({ kind: "hard", label: h });
  for (const f of flags) problems.push({ kind: "flag", label: f });
  const dimEntries = Object.entries(dims)
    .filter(([d, v]) => v < 0.67 && d in weights)
    .sort((a, b) => a[1] - b[1]);
  for (const [d, v] of dimEntries) {
    const a = jev[`unit.${d}`] ?? jev[`pair.${d}`] ?? jev[`locale.${d}`];
    problems.push({ kind: "dimension", label: `${d}=${v.toFixed(2)}`, detail: derived[d] ?? (a ? legendFor(a) : undefined) });
  }
  for (const t of tells) problems.push({ kind: "tell", label: t });
  for (const f of findings.filter((x) => x.severity === "fail" && !x.hard)) problems.push({ kind: "check", label: `${f.check}: ${f.message}`, detail: f.match?.slice(0, 3).join(" | ") });
  for (const r of review) problems.push({ kind: "review", label: r });
  for (const f of findings.filter((x) => x.severity === "review" && !x.tell)) problems.push({ kind: "check", label: `${f.check}: ${f.message}` });

  return {
    id: u.id,
    pairId: u.pairId,
    kind: u.kind,
    field: u.field,
    locale: u.locale,
    lineId: u.lineId,
    stationName: u.stationName,
    text: u.text,
    wordCount: u.wordCount,
    findings,
    dims,
    jev,
    requestIds,
    tells,
    hardFails,
    flags,
    review,
    hints,
    penalty: { tells: penaltyTells, fails: penaltyFails },
    composite,
    band,
    problems,
  };
}

// ---------- report ----------

const pct = (xs: number[], q: number) => {
  if (!xs.length) return 0;
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.floor(q * s.length))]!;
};
const esc = (s: string) => s.replace(/\|/g, "\\|").replace(/\n/g, " ");

function summaryMarkdown(meta: Record<string, unknown>, rows: Row[], corpusGroups: ReturnType<typeof checkCorpus>, worst: number): string {
  const scored = rows.filter((r) => r.composite !== null);
  const sorted = [...rows].sort((a, b) => (a.hardFails.length ? -1 : 0) - (b.hardFails.length ? -1 : 0) || (a.composite ?? 1) - (b.composite ?? 1));
  const bands = { ship: 0, edit: 0, rewrite: 0 };
  for (const r of scored) bands[r.band!]++;
  const L: string[] = [];
  L.push(`# Copy evaluation`, "");
  L.push(`| | |`, `|---|---|`);
  for (const [k, v] of Object.entries(meta)) L.push(`| ${k} | ${esc(typeof v === "string" ? v : JSON.stringify(v))} |`);
  L.push("");
  L.push(`Bands (scored units): ship ${bands.ship}, edit ${bands.edit}, rewrite ${bands.rewrite}. Hard failures: ${rows.filter((r) => r.hardFails.length).length} units.`, "");
  L.push(`Sorted by hard failure first, then composite (lowest first). Composite = weighted rubric dimensions − 0.05 per soft tell (cap 0.25) − 0.05 per FAIL check (cap 0.20).`, "");
  L.push(`## ${Math.min(worst, sorted.length)} worst units`, "");
  sorted.slice(0, worst).forEach((r, i) => {
    L.push(`### ${i + 1}. \`${r.id}\` composite ${r.composite?.toFixed(2) ?? "n/a"} (${r.band ?? "n/a"})${r.hardFails.length ? " HARD FAIL" : ""}`, "");
    L.push(`> ${esc(r.text)}`, "");
    const dims = Object.entries(r.dims).map(([d, v]) => `${d} ${v.toFixed(2)}`).join(", ");
    if (dims) L.push(`Dimensions: ${dims}`, "");
    for (const p of r.problems.slice(0, 8)) L.push(`- **${p.kind}** ${esc(p.label)}${p.detail ? `: ${esc(p.detail)}` : ""}`);
    L.push("");
  });

  const parity = rows.filter((r) => r.locale === "en" && (r.flags.length || r.hardFails.some((h) => /T2[34]/.test(h))));
  if (parity.length) {
    L.push(`## Parity flags (EN/FR)`, "", `| pair | flags |`, `|---|---|`);
    for (const r of parity) L.push(`| \`${r.pairId}\` | ${esc([...r.hardFails.filter((h) => /T2[34]/.test(h)), ...r.flags].join("; "))} |`);
    L.push("");
  }

  const hinted = rows.filter((r) => r.locale === "fr" && r.hints.t19_calque !== undefined).sort((a, b) => (b.hints.t19_calque ?? 0) - (a.hints.t19_calque ?? 0));
  if (hinted.length) {
    L.push(`## FR review order (calque hint, not a gate)`, "", `| unit | calque | non-native | text |`, `|---|---|---|---|`);
    for (const r of hinted.slice(0, 10)) L.push(`| \`${r.id}\` | ${r.hints.t19_calque?.toFixed(2)} | ${r.hints.native?.toFixed(2) ?? ""} | ${esc(r.text.slice(0, 120))} |`);
    L.push("");
  }

  const uiRows = rows.filter((r) => r.kind === "ui" && r.dims.U2 !== undefined && r.dims.U2 < 0.8).sort((a, b) => a.dims.U2! - b.dims.U2!);
  L.push(`## UI consistency (U2 per string, below 0.80)`, "");
  if (!uiRows.length) L.push("None.");
  for (const r of uiRows) {
    const wc = r.jev["unit.word_conflict"];
    const vm = r.jev["unit.verb_mix"];
    L.push(`- \`${r.id}\` "${esc(r.text)}": U2 ${r.dims.U2!.toFixed(2)} (word_conflict ${wc?.type === "noul" ? wc.noul.toFixed(2) : "n/a"}${vm?.type === "noul" ? `, verb_mix ${vm.noul.toFixed(2)}` : ""})`);
  }
  L.push("");

  const checkCounts = new Map<string, number>();
  for (const r of rows) for (const f of r.findings) checkCounts.set(`${f.check} (${f.severity})`, (checkCounts.get(`${f.check} (${f.severity})`) ?? 0) + 1);
  L.push(`## Deterministic findings in this selection`, "", `| check | units |`, `|---|---|`);
  for (const [k, n] of [...checkCounts].sort((a, b) => b[1] - a[1])) L.push(`| ${k} | ${n} |`);
  L.push("");

  L.push(`## Corpus-wide openers (non-mandated, 4+ uses)`, "", `| field/locale | opening | count |`, `|---|---|---|`);
  for (const o of corpusGroups.topOpeners.slice(0, 15)) L.push(`| ${o.key} | ${esc(o.opener)} | ${o.count}/${o.total} |`);
  L.push("");
  if (corpusGroups.groups.length) {
    L.push(`## Corpus rhythm (per line/field/locale)`, "");
    for (const g of corpusGroups.groups) L.push(`- ${g.key}: ${g.finding.message}`);
    L.push("");
  }

  const dimNames = [...new Set(scored.flatMap((r) => Object.keys(r.dims)))].sort();
  if (dimNames.length) {
    L.push(`## Dimension means`, "", `| dim | n | mean | p10 |`, `|---|---|---|---|`);
    for (const d of dimNames) {
      const xs = scored.map((r) => r.dims[d]).filter((x): x is number => x !== undefined);
      L.push(`| ${d} | ${xs.length} | ${(xs.reduce((a, b) => a + b, 0) / xs.length).toFixed(2)} | ${pct(xs, 0.1).toFixed(2)} |`);
    }
    L.push("");
  }
  return L.join("\n");
}

// ---------- main ----------

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const corpus = buildCorpus();
  const byId = new Map(corpus.map((u) => [u.id, u]));
  const allowNames = [...new Set(lines.flatMap((l) => l.stations.map((s) => s.name)))];
  const stationNameWords = nameWords(allowNames);
  const corpusFindings = checkCorpus(corpus);
  const pairIds = selectPairs(corpus, args);
  const pairSet = new Set(pairIds);
  const selected = corpus.filter((u) => pairSet.has(u.pairId));

  const findings = new Map<string, Finding[]>();
  for (const u of selected) findings.set(u.id, [...checkUnit(u, { allowNames }), ...(corpusFindings.byUnit.get(u.id) ?? [])]);
  const pairs = pairIds.map((pid) => {
    const en = byId.get(`${pid}/en`)!;
    const fr = byId.get(`${pid}/fr`)!;
    return { en, fr };
  });
  for (const { en, fr } of pairs) {
    const pf = checkPair(en, fr, { stationNameWords });
    findings.get(en.id)!.push(...pf);
    findings.get(fr.id)!.push(...pf);
    if (en.text === fr.text && en.kind === "page" && /[\p{L}]{4,}\s[\p{L}]{4,}/u.test(en.text))
      findings.get(en.id)!.push({ check: "parity.sharedText", severity: "info", message: "same text in both locales" });
  }

  const lineTitles: Record<string, string[]> = { en: [], fr: [] };
  for (const u of corpus) if (u.kind === "line" && u.field === "title") lineTitles[u.locale]!.push(u.text);

  const requests: JevRequest[] = [];
  if (!args.dryRun) {
    for (const u of selected) requests.push(unitRequest(u, byId, lineTitles, corpus));
    for (const { en, fr } of pairs) {
      const r = pairRequest(en, fr);
      if (r) requests.push(r);
    }
  }

  let results: JevResult[] = [];
  const t0 = performance.now();
  if (requests.length) {
    const apiKey = loadApiKey();
    if (!apiKey) throw new Error("TYPESAFE_API_KEY not set (env or repo-root .env)");
    const client = new TypeSafeClient({ apiKey, defaultModel: args.model, timeout: 20_000, retry: { maxRetries: 4 } });
    let done = 0;
    results = await mapPool(requests, args.concurrency, async (req) => {
      const r = await runRequest(client, req);
      done++;
      if (done % 50 === 0 || done === requests.length) process.stderr.write(`\r${done}/${requests.length} requests`);
      return r;
    });
    process.stderr.write("\n");
  }
  const wallMs = Math.round(performance.now() - t0);

  const resultsByUnit = new Map<string, JevResult[]>();
  for (const r of results) for (const id of r.unitIds) resultsByUnit.set(id, [...(resultsByUnit.get(id) ?? []), r]);
  const rows = selected.map((u) =>
    assembleRow(u, findings.get(u.id)!, resultsByUnit.get(u.id) ?? [], byId.get(`${u.pairId}/en`)?.text === byId.get(`${u.pairId}/fr`)?.text),
  );

  const errors = results.filter((r) => r.error);
  const usage = results.reduce(
    (acc, r) => ({ input: acc.input + (r.usage?.input_tokens ?? 0), output: acc.output + (r.usage?.output_tokens ?? 0) }),
    { input: 0, output: 0 },
  );
  const models = [...new Set(results.map((r) => r.model).filter(Boolean))];
  const latencies = results.filter((r) => !r.error).map((r) => r.ms);
  const meta = {
    timestamp: args.timestamp,
    model: models.join(", ") || (args.dryRun ? "none (dry run)" : args.model),
    requestedModel: args.model,
    sdk: `@typesafe-ai/sdk ${SDK_VERSION}`,
    questionSet: QUESTION_SET_VERSION,
    selection: { kind: args.kind ?? "all", line: args.line ?? "all", sample: args.sample ?? null, seed: args.seed, limit: args.limit ?? null },
    pairs: pairIds.length,
    units: rows.length,
    requests: results.length,
    errors: errors.length,
    tokens: usage,
    wallMs,
    latencyMs: { p50: pct(latencies, 0.5), p90: pct(latencies, 0.9), max: pct(latencies, 1) },
  };

  const runName = args.timestamp.replace(/[:.]/g, "-");
  const dir = join(args.out, runName);
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    join(dir, "results.json"),
    JSON.stringify(
      { meta, weights: WEIGHTS, penalty: PENALTY, thresholds: THRESHOLDS, bands: BANDS, rows, requests: results, corpusGroups: corpusFindings.groups, topOpeners: corpusFindings.topOpeners },
      null,
      2,
    ) + "\n",
  );
  writeFileSync(join(dir, "summary.md"), summaryMarkdown(meta, rows, corpusFindings, args.worst) + "\n");

  console.error(JSON.stringify(meta));
  for (const e of errors.slice(0, 5)) console.error(`error ${e.key}: ${e.error} (request ${e.requestId ?? "none"})`);
  console.error(`wrote ${dir}/results.json and summary.md`);
  if (errors.length) process.exitCode = 2;
}

if (import.meta.main) {
  main().catch((e) => {
    console.error(e instanceof Error ? e.message : e);
    process.exit(1);
  });
}

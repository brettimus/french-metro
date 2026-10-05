/**
 * Builds the frozen fact-check lab dataset (lab/dataset.json, committed) from the review labels (reviewed.ts), the
 * run files the reviews used (out/full and out/pass2, gitignored) and the source cache (cache/, gitignored).
 *
 * Usage:
 *   bun apps/web/scripts/facts/lab/build-dataset.ts [--check]
 *
 *   --check   build in memory and compare with the committed dataset.json; exit 1 if it differs
 *
 * For each labelled pair it stores the EN and FR claims as they were at review time, the 5 retrieved passages, the
 * number checks, the Jev answers of that run and the station's fetch-failure value, so a config can re-ask Jev with
 * other questions or other state fields without the run files. Passage texts are stored once (`passages`) and
 * referenced by id. Each station gets the source URL list at review time (from the line data at the review commit,
 * read with `git archive`), the source title and text hash, and a number index, so the planted edits get the same
 * code number checks as real claims.
 *
 * Planted errors (planted.ts) are copies of supported pairs with one false edit in EN and FR. They have verdict
 * "confirmed", `planted`, no known Jev answers, and the same passages as their original pair.
 *
 * Split: a pair is in `val` when sha1(stationId) % 10 < 3, else `dev`. All lines of a station go to the same split,
 * because shared stations have the same text on several lines.
 *
 * Fails on: a label whose pair is not in its run, a missing source cache file, a stored passage that is not a chunk
 * of the cached source text (the cache changed after the run), and a planted edit that does not match exactly once.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { Locale } from "../../../src/data/types";
import type { Field } from "../claims";
import { fieldLabel, MODEL, QUESTION_VERSION } from "../jev";
import { buildNumberIndex, extractNumbers, matchFact, type FactMatch } from "../numbers";
import type { ClaimRow, PairRow } from "../rank";
import { chunkText, cleanSourceText } from "../retrieve";
import { ALL_REVIEWED, REVIEW_RUNS, type Verdict } from "../reviewed";
import { cachePath, type SourceDoc, type UrlRole } from "../sources";
import { PLANTED } from "./planted";

export const DATASET_PATH = join(import.meta.dir, "dataset.json");
const FACTS_DIR = join(import.meta.dir, "..");
const REPO = join(FACTS_DIR, "../../../..");
/** The commit whose line data each review run used. */
export const REVIEW_COMMITS = { 1: "9740b4a", 2: "3c98987" } as const;

export type Split = "dev" | "val";
export const splitOf = (stationId: string): Split =>
  Number.parseInt(createHash("sha1").update(stationId).digest("hex").slice(0, 8), 16) % 10 < 3 ? "val" : "dev";

export type DatasetJev = { supported?: number; contradicted?: number; bestPassage?: string; bestPassageConfidence?: number; error?: string };
export type DatasetClaim = {
  id: string;
  locale: Locale;
  n: number;
  text: string;
  aligned: boolean;
  counterpart: string;
  fieldText: string;
  previous?: string;
  numbers: FactMatch[];
  /** Retrieved passages in rank order: id (p1..), passage key into `passages`, BM25 score. */
  passages: { id: string; ref: string; score: number }[];
  /** The Jev answers stored in the review run; absent for planted claims. */
  jev?: DatasetJev;
  /** True when a planted edit changed this claim. */
  edited?: boolean;
};
export type DatasetItem = {
  /** pass/pairKey, plus "#planted" for planted copies. */
  id: string;
  pass: 1 | 2;
  pairKey: string;
  lineId: string;
  stationId: string;
  stationName: string;
  field: Field;
  split: Split;
  verdict: Verdict;
  /** confirmed, refuted or unsourced: the lab's positive class. */
  problem: boolean;
  retrievalMiss?: boolean;
  planted?: { kind: string; from: string; note: string };
  /** Review rank within its pass (planted copies keep the rank of their original). */
  rank: number;
  en: DatasetClaim[];
  fr: DatasetClaim[];
};
export type DatasetStation = {
  urls: { url: string; role: UrlRole }[];
  /** 0 = all sources fetched, 0.5 = a people link failed, 1 = a source link failed. */
  fetchFailure: number;
  /** Number index over the station's fetched sources (numbers.ts), as sorted keys and years. */
  numberKeys: string[];
  numberYears: number[];
};
export type DatasetSource = { status: SourceDoc["status"]; httpStatus: number; title?: string; textSha1: string; words: number };
export type Dataset = {
  version: 1;
  model: string;
  questionVersion: string;
  splitRule: string;
  runs: Record<"1" | "2", { file: string; commit: string }>;
  counts: Record<Split, Record<string, number>>;
  /** Key "pass/lineId/stationId". */
  stations: Record<string, DatasetStation>;
  sources: Record<string, DatasetSource>;
  /** Passage texts by key (sha1 of url + text, 12 hex). */
  passages: Record<string, { url: string; text: string }>;
  items: DatasetItem[];
};

const sha1 = (s: string) => createHash("sha1").update(s).digest("hex");
export const stationKey = (pass: 1 | 2, lineId: string, stationId: string) => `${pass}/${lineId}/${stationId}`;
export const isProblem = (v: Verdict) => v !== "supported";

/** Station URL lists from the line data at a commit, read from a `git archive` copy. */
async function urlsAtCommit(commit: string): Promise<Map<string, { url: string; role: UrlRole }[]>> {
  const dir = mkdtempSync(join(tmpdir(), `facts-lab-${commit}-`));
  try {
    const tar = execFileSync("git", ["-C", REPO, "archive", commit, "apps/web/src/data", "apps/web/src/coming-soon.ts", "apps/web/scripts/facts/sources.ts"], { maxBuffer: 1 << 28 });
    execFileSync("tar", ["-x", "-C", dir], { input: tar });
    const mod = (await import(join(dir, "apps/web/scripts/facts/sources.ts"))) as typeof import("../sources");
    return new Map(mod.stationRefs().map((r) => [`${r.lineId}/${r.station.id}`, mod.stationUrls(r.station)]));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const readDoc = (url: string): SourceDoc => {
  const p = cachePath(url);
  if (!existsSync(p)) throw new Error(`missing source cache file for ${url} (${p}); run sources.ts first`);
  return JSON.parse(readFileSync(p, "utf8")) as SourceDoc;
};

function replaceOnce(text: string, from: string, to: string, where: string): string {
  const i = text.indexOf(from);
  if (i < 0 || text.indexOf(from, i + 1) >= 0) throw new Error(`planted edit for ${where}: "${from}" must occur exactly once in "${text}"`);
  return text.slice(0, i) + to + text.slice(i + from.length);
}

/** The field text with the edited sentence; falls back to the edit itself when the sentence's spacing differs. */
function editField(field: string, sentence: string, edited: string, from: string, to: string): string {
  const once = (s: string) => field.indexOf(s) >= 0 && field.indexOf(s) === field.lastIndexOf(s);
  if (once(sentence)) return field.replace(sentence, edited);
  if (once(from)) return field.replace(from, to);
  throw new Error(`planted edit: cannot place "${from}" in field text "${field}"`);
}

export async function buildDataset(): Promise<Dataset> {
  const problems: string[] = [];
  const passages: Dataset["passages"] = {};
  const sources: Dataset["sources"] = {};
  const stations: Dataset["stations"] = {};
  const items: DatasetItem[] = [];

  for (const pass of [1, 2] as const) {
    const run = JSON.parse(readFileSync(join(FACTS_DIR, REVIEW_RUNS[pass]), "utf8")) as { pairs: PairRow[]; excluded?: PairRow[] };
    const pairs = new Map([...run.pairs, ...(run.excluded ?? [])].map((p) => [p.pairKey, p]));
    const urlLists = await urlsAtCommit(REVIEW_COMMITS[pass]);
    const labels = ALL_REVIEWED.filter((l) => l.pass === pass);

    for (const label of labels) {
      const pair = pairs.get(label.pairKey);
      if (!pair) {
        problems.push(`pass ${pass}: ${label.pairKey} is not in ${REVIEW_RUNS[pass]}`);
        continue;
      }
      const first = (pair.en[0] ?? pair.fr[0])!;
      const sKey = stationKey(pass, first.lineId, first.stationId);
      if (!stations[sKey]) {
        const urls = urlLists.get(`${first.lineId}/${first.stationId}`);
        if (!urls) {
          problems.push(`pass ${pass}: no station ${first.lineId}/${first.stationId} at ${REVIEW_COMMITS[pass]}`);
          continue;
        }
        const okTexts: string[] = [];
        for (const { url } of urls) {
          const doc = readDoc(url);
          const clean = doc.status === "ok" ? cleanSourceText(doc.text) : "";
          if (doc.status === "ok") okTexts.push(clean);
          sources[url] ??= { status: doc.status, httpStatus: doc.httpStatus, ...(doc.title ? { title: doc.title } : {}), textSha1: sha1(clean), words: clean.split(/\s+/).filter(Boolean).length };
        }
        const idx = buildNumberIndex(okTexts);
        stations[sKey] = { urls, fetchFailure: first.fetchFailure, numberKeys: [...idx.keys].sort(), numberYears: [...idx.years].sort((a, b) => a - b) };
      }
      const station = stations[sKey]!;

      const toClaim = (r: ClaimRow): DatasetClaim => {
        if (r.fetchFailure !== station.fetchFailure) problems.push(`${r.id}: fetchFailure ${r.fetchFailure} differs from station value ${station.fetchFailure}`);
        return {
          id: r.id,
          locale: r.locale,
          n: r.n,
          text: r.text,
          aligned: r.aligned,
          counterpart: r.counterpart,
          fieldText: r.fieldText,
          ...(r.previous !== undefined ? { previous: r.previous } : {}),
          numbers: r.numbers,
          passages: r.passages.map((p) => {
            if (!station.urls.some((u) => u.url === p.url)) problems.push(`${r.id}: passage URL ${p.url} is not a station URL at review time`);
            const ref = sha1(`${p.url}\n${p.text}`).slice(0, 12);
            passages[ref] ??= { url: p.url, text: p.text };
            return { id: p.id, ref, score: p.score };
          }),
          jev: {
            supported: r.jev.supported,
            contradicted: r.jev.contradicted,
            bestPassage: r.jev.bestPassage,
            bestPassageConfidence: r.jev.bestPassageConfidence,
            ...(r.jev.error ? { error: r.jev.error } : {}),
          },
        };
      };
      items.push({
        id: `${pass}/${label.pairKey}`,
        pass,
        pairKey: label.pairKey,
        lineId: first.lineId,
        stationId: first.stationId,
        stationName: first.stationName,
        field: first.field,
        split: splitOf(first.stationId),
        verdict: label.verdict,
        problem: isProblem(label.verdict),
        ...(label.retrievalMiss ? { retrievalMiss: true } : {}),
        rank: label.rank,
        en: pair.en.map(toClaim),
        fr: pair.fr.map(toClaim),
      });
    }
  }

  // Each stored passage must still be a chunk of the cached source text; otherwise the cache changed after the run.
  const chunksByUrl = new Map<string, Set<string>>();
  for (const [ref, p] of Object.entries(passages)) {
    let chunks = chunksByUrl.get(p.url);
    if (!chunks) {
      const doc = readDoc(p.url);
      chunks = new Set(doc.status === "ok" ? chunkText(cleanSourceText(doc.text)) : []);
      chunksByUrl.set(p.url, chunks);
    }
    if (!chunks.has(p.text)) problems.push(`passage ${ref} (${p.url}) is not a chunk of the cached source text`);
  }

  // Planted errors.
  for (const plant of PLANTED) {
    const base = items.find((i) => i.id === plant.item);
    if (!base) {
      problems.push(`planted: no item ${plant.item}`);
      continue;
    }
    if (base.verdict !== "supported") problems.push(`planted: ${plant.item} is ${base.verdict}, not supported`);
    const station = stations[stationKey(base.pass, base.lineId, base.stationId)]!;
    const idx = { keys: new Set(station.numberKeys), years: station.numberYears };
    const edit = (claims: DatasetClaim[], from: string, to: string, locale: Locale): DatasetClaim[] => {
      const target = claims.filter((c) => c.text.includes(from));
      if (target.length !== 1) {
        problems.push(`planted ${plant.item} ${locale}: "${from}" is in ${target.length} claims`);
        return claims;
      }
      return claims.map((c) => {
        if (c !== target[0]) return c;
        const text = replaceOnce(c.text, from, to, `${plant.item} ${locale}`);
        const seen = new Set<string>();
        const numbers = extractNumbers(text)
          .filter((f) => (seen.has(f.key) ? false : (seen.add(f.key), true)))
          .map((f) => matchFact(f, idx));
        const { jev: _jev, ...rest } = c;
        return { ...rest, text, fieldText: editField(c.fieldText, c.text, text, from, to), numbers, edited: true };
      });
    };
    // Claims the edit does not touch keep their state and so their Jev answers. The edited claims' counterparts get
    // the other locale's edit.
    const swap = (c: DatasetClaim, [from, to]: readonly [string, string]) => (c.edited && c.counterpart.includes(from) ? { ...c, counterpart: c.counterpart.replace(from, to) } : c);
    const en = edit(base.en, plant.en[0], plant.en[1], "en").map((c) => swap(c, plant.fr));
    const fr = edit(base.fr, plant.fr[0], plant.fr[1], "fr").map((c) => swap(c, plant.en));
    items.push({
      ...base,
      id: `${base.id}#planted`,
      verdict: "confirmed",
      problem: true,
      planted: { kind: plant.kind, from: base.id, note: plant.note },
      en,
      fr,
    });
  }

  if (problems.length) throw new Error(`build-dataset failed (${problems.length}):\n${problems.join("\n")}`);

  const counts = { dev: {}, val: {} } as Dataset["counts"];
  for (const i of items) {
    const k = i.planted ? "planted" : i.verdict;
    counts[i.split][k] = (counts[i.split][k] ?? 0) + 1;
    counts[i.split].items = (counts[i.split].items ?? 0) + 1;
  }
  return {
    version: 1,
    model: MODEL,
    questionVersion: QUESTION_VERSION,
    splitRule: "val when sha1(stationId) % 10 < 3 (first 8 hex digits), else dev",
    runs: { "1": { file: REVIEW_RUNS[1], commit: REVIEW_COMMITS[1] }, "2": { file: REVIEW_RUNS[2], commit: REVIEW_COMMITS[2] } },
    counts,
    stations,
    sources,
    passages,
    items,
  };
}

export const loadDataset = (path = DATASET_PATH): Dataset => JSON.parse(readFileSync(path, "utf8")) as Dataset;

/** The Jev state the review run sent for a claim (run.ts), rebuilt from the dataset. */
export function stateFor(ds: Dataset, item: DatasetItem, c: DatasetClaim) {
  return {
    claim: c.text,
    ...(c.previous ? { previous_sentence: c.previous } : {}),
    station: item.stationName,
    field: fieldLabel(item.field),
    passages: c.passages.map((p) => {
      const { url, text } = ds.passages[p.ref]!;
      const title = ds.sources[url]?.title;
      return { id: p.id, source: `${new URL(url).host}${title ? `: ${title}` : ""}`, text };
    }),
  };
}

if (import.meta.main) {
  const ds = await buildDataset();
  const json = JSON.stringify(ds, null, 1) + "\n";
  if (process.argv.includes("--check")) {
    const same = existsSync(DATASET_PATH) && readFileSync(DATASET_PATH, "utf8") === json;
    console.log(same ? "dataset.json is up to date" : "dataset.json differs from a fresh build");
    process.exit(same ? 0 : 1);
  }
  writeFileSync(DATASET_PATH, json);
  console.log(JSON.stringify({ bytes: json.length, items: ds.items.length, passages: Object.keys(ds.passages).length, sources: Object.keys(ds.sources).length, counts: ds.counts }, null, 1));
}

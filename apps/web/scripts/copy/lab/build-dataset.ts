/**
 * Builds the frozen copy lab dataset (lab/dataset.json, committed) from the editor labels in lab/labels/ and the
 * copy texts the editors graded.
 *
 * Usage:
 *   bun apps/web/scripts/copy/lab/build-dataset.ts [--check]
 *
 *   --check   build in memory and compare with the committed dataset.json; exit 1 if it differs
 *
 * Sources:
 * - Calibration labels (labels/mine-en.json, labels/mine-fr.json): 36 pairs graded on the copy at commit d085bdd.
 *   The texts come from buildCorpus() in a temporary git worktree at that commit, which is removed afterwards.
 *   S7 is dropped: the S7 rule changed after this grading.
 * - Round-3 labels (labels/round3.json, adjudicated from editors A and B): 40 pairs graded on the copy at
 *   ROUND3_COMMIT. The texts come from a worktree at that commit and must equal labels/round3-sample.json.
 * - Planted defects (planted.ts): one tell inserted into a clean graded unit.
 *
 * Split: all calibration pairs are dev. Round-3 pairs are sorted by sha1(pairId); the first half is dev and the
 * second half is test. A planted unit takes the split of the pair it was made from.
 *
 * Merged pair labels for calibration pairs: the FR editor's S6 and parity flags where that editor graded the pair
 * (25 pairs), else the EN editor's S6_judged and its "yes" list. Round-3 pairs use the adjudicated S6 and flags.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import type { CopyUnit } from "../corpus";
import { UI_USAGE } from "../ui-usage";
import {
  DATASET_PATH,
  TELLS,
  splitRound3,
  type CorpusName,
  type Dataset,
  type DatasetPair,
  type DatasetUnit,
  type PairLabels,
  type Split,
  type UnitLabels,
} from "./dataset";
import { PLANTED } from "./planted";

export const CALIBRATION_COMMIT = "d085bdd99a2838504769492ace344d7876552115";
export const ROUND3_COMMIT = "1d5b4ed";

const LABELS = join(import.meta.dir, "labels");
const REPO = resolve(import.meta.dir, "../../../../..");
const readJson = (path: string) => JSON.parse(readFileSync(path, "utf8"));

/** buildCorpus() at a commit, run in a temporary worktree that is removed afterwards. */
function corpusAt(commit: string): CopyUnit[] {
  const dir = mkdtempSync(join(tmpdir(), "copy-lab-"));
  const wt = join(dir, "wt");
  try {
    execFileSync("git", ["-C", REPO, "worktree", "add", "--detach", wt, commit], { stdio: "pipe" });
    const out = join(dir, "corpus.json");
    execFileSync("bun", [join(wt, "apps/web/scripts/copy/corpus.ts"), "--out", out], { stdio: "pipe" });
    return readJson(out) as CopyUnit[];
  } finally {
    try {
      execFileSync("git", ["-C", REPO, "worktree", "remove", "--force", wt], { stdio: "pipe" });
    } catch {
      /* the worktree was never created */
    }
    rmSync(dir, { recursive: true, force: true });
  }
}

const DIM_KEYS = ["S1", "S2", "S3", "S4", "S5", "S7", "L1", "L2", "L3", "U1", "native"];

/** Editor unit grades -> UnitLabels. `dropS7` removes stale S7 grades. */
function unitLabels(g: Record<string, unknown>, dropS7: boolean): UnitLabels {
  const dims: Record<string, number> = {};
  for (const k of DIM_KEYS) if (typeof g[k] === "number" && !(dropS7 && k === "S7")) dims[k] = g[k] as number;
  const labels: UnitLabels = { dims };
  if (Array.isArray(g.tells)) {
    const unknown = (g.tells as string[]).filter((t) => !(TELLS as readonly string[]).includes(t));
    if (unknown.length) throw new Error(`unknown tell ids: ${unknown.join(", ")}`);
    labels.tells = [...(g.tells as string[])].sort();
  }
  const t25 = g.t25_explains_name ?? g.t25;
  if (typeof t25 === "number") labels.t25 = t25;
  if (typeof g.calque === "number") labels.calque = g.calque;
  return labels;
}

/** Pair grades from an FR-style editor (S6 + flags) or an EN-style editor (S6_judged + yes list). */
function pairLabels(fr: Record<string, unknown> | undefined, en: Record<string, unknown> | undefined): PairLabels {
  const src = fr && (fr.S6 !== undefined || fr.U3 !== undefined) ? fr : en;
  if (!src) throw new Error("pair without grades");
  const dims: Record<string, number> = {};
  const s6 = src.S6 ?? src.S6_judged;
  if (typeof s6 === "number") dims.S6 = s6;
  if (typeof src.U3 === "number") dims.U3 = src.U3;
  const out: PairLabels = { dims };
  if (src === fr || typeof src.conflict === "number") {
    for (const [k, from] of [
      ["conflict", "conflict"],
      ["fr_missing", "fr_missing"],
      ["en_missing", "en_missing"],
      ["hedge", "hedge"],
      ["fr_calque", "fr_calque"],
    ] as const)
      if (typeof src[from] === "number") out[k] = src[from] as number;
  } else if (Array.isArray(src.yes)) {
    const yes = src.yes as string[];
    out.conflict = +yes.includes("conflict");
    out.fr_missing = +yes.includes("fr_missing");
    out.en_missing = +yes.includes("en_missing");
    out.hedge = +yes.includes("hedge_mismatch");
    out.fr_calque = +yes.includes("fr_calque");
  }
  return out;
}

const pairIdOf = (unitId: string) => unitId.replace(/\/(en|fr)$/, "");

export function buildDataset(corpora: Record<CorpusName, CopyUnit[]>): Dataset {
  const byId = {
    d085bdd: new Map(corpora.d085bdd.map((u) => [u.id, u])),
    current: new Map(corpora.current.map((u) => [u.id, u])),
  };
  const units: DatasetUnit[] = [];
  const pairs: DatasetPair[] = [];
  const need = (corpus: CorpusName, id: string) => {
    const u = byId[corpus].get(id);
    if (!u) throw new Error(`${id} not in the ${corpus} corpus`);
    return u;
  };

  // ---- calibration (dev) ----
  const calEn = readJson(join(LABELS, "mine-en.json"));
  const calFr = readJson(join(LABELS, "mine-fr.json"));
  // UI keys that were unused at d085bdd and are gone now have no usage note, so no request can be built for them.
  const dropped = new Set<string>();
  const unusable = (id: string) => id.startsWith("ui/") && !UI_USAGE[id.split("/")[1]!];
  for (const G of [calEn, calFr])
    for (const [id, g] of Object.entries<Record<string, unknown>>(G.units))
      if (unusable(id)) dropped.add(pairIdOf(id));
      else
        units.push({ key: id, split: "dev", source: "calibration", corpus: "d085bdd", unit: need("d085bdd", id), labels: unitLabels(g, true) });
  const calPairIds = [...new Set([...Object.keys(calEn.pairs), ...Object.keys(calFr.pairs)])].sort();
  for (const pid of calPairIds)
    if (!dropped.has(pid))
      pairs.push({ pairId: pid, split: "dev", source: "calibration", corpus: "d085bdd", labels: pairLabels(calFr.pairs[pid], calEn.pairs[pid]) });

  // ---- round 3 (half dev, half test) ----
  const r3 = readJson(join(LABELS, "round3.json"));
  const sample: { pairId: string; idEn: string; idFr: string; en: string; fr: string }[] = readJson(join(LABELS, "round3-sample.json"));
  const split = splitRound3(sample.map((s) => s.pairId));
  for (const s of sample) {
    for (const [id, text] of [
      [s.idEn, s.en],
      [s.idFr, s.fr],
    ] as const) {
      const u = need("current", id);
      if (u.text !== text) throw new Error(`${id}: text at ${ROUND3_COMMIT} differs from round3-sample.json`);
      const g = r3.units[id];
      if (!g) throw new Error(`${id}: no round-3 grades`);
      units.push({ key: id, split: split.get(s.pairId)!, source: "round3", corpus: "current", unit: u, labels: unitLabels(g, false) });
    }
    const pg = r3.pairs[s.pairId];
    if (!pg) throw new Error(`${s.pairId}: no round-3 pair grades`);
    pairs.push({ pairId: s.pairId, split: split.get(s.pairId)!, source: "round3", corpus: "current", labels: pairLabels(pg, undefined) });
  }

  // ---- planted ----
  const graded = new Map(units.map((d) => [d.key, d]));
  for (const p of PLANTED) {
    const src = graded.get(p.from);
    if (!src) throw new Error(`planted: ${p.from} is not a graded unit`);
    if (src.labels.tells === undefined || src.labels.tells.length) throw new Error(`planted: ${p.from} is not graded clean of tells`);
    if (src.unit.text === p.text) throw new Error(`planted: ${p.from} text is unchanged`);
    const key = `${p.from}~${p.tell}`;
    if (graded.has(key) || units.some((d) => d.key === key)) throw new Error(`planted: duplicate ${key}`);
    const unit: CopyUnit = { ...src.unit, text: p.text, wordCount: p.text.split(/\s+/).filter((t) => /[\p{L}\p{N}]/u.test(t)).length };
    units.push({ key, split: src.split, source: "planted", corpus: src.corpus, unit, labels: { dims: {}, tells: [p.tell] }, planted: { tell: p.tell, from: p.from } });
  }

  // ---- context the requests need ----
  const context: Record<CorpusName, CopyUnit[]> = { d085bdd: [], current: [] };
  for (const corpus of ["d085bdd", "current"] as const) {
    const ids = new Set<string>();
    const labelled = units.filter((d) => d.corpus === corpus && d.source !== "planted");
    const labelledIds = new Set(labelled.map((d) => d.unit.id));
    for (const d of units.filter((x) => x.corpus === corpus)) {
      const u = d.unit;
      if (u.kind === "station" && u.field === "context") ids.add(u.id.replace("/context/", "/etymology/"));
      // Both locales of every labelled pair, for the pair request.
      for (const loc of ["en", "fr"]) ids.add(`${u.pairId}/${loc}`);
    }
    if (units.some((d) => d.corpus === corpus && d.unit.kind === "line" && d.unit.field === "title"))
      for (const u of corpora[corpus]) if (u.kind === "line" && u.field === "title") ids.add(u.id);
    if (units.some((d) => d.corpus === corpus && d.unit.kind === "ui"))
      for (const u of corpora[corpus]) if (u.kind === "ui" && UI_USAGE[u.field]) ids.add(u.id);
    context[corpus] = [...ids].filter((id) => !labelledIds.has(id)).sort().map((id) => need(corpus, id));
  }

  // Every pair with labels must have both units available.
  for (const p of pairs) {
    const have = new Set([...units.filter((d) => d.corpus === p.corpus && d.source !== "planted").map((d) => d.unit.id), ...context[p.corpus].map((u) => u.id)]);
    for (const loc of ["en", "fr"]) if (!have.has(`${p.pairId}/${loc}`)) throw new Error(`pair ${p.pairId}: ${loc} unit missing`);
  }
  for (const d of units) if (d.source !== "planted" && pairIdOf(d.unit.id) !== d.unit.pairId) throw new Error(`${d.key}: pair id mismatch`);

  const count = (xs: { split: Split; source: string }[]) => {
    const c: Record<string, number> = {};
    for (const x of xs) c[`${x.split}/${x.source}`] = (c[`${x.split}/${x.source}`] ?? 0) + 1;
    return c;
  };
  return {
    version: 1,
    meta: {
      calibrationCommit: CALIBRATION_COMMIT,
      round3Commit: ROUND3_COMMIT,
      gradedQuestionSets: { calibration: "2026-10-05.5", round3: "2026-10-05.6" },
      droppedDims: { calibration: ["S7"] },
      droppedPairs: { calibration: [...dropped].sort(), reason: "UI key unused at d085bdd, removed since; no usage note" },
      split: "calibration: dev; round3: sha1(pairId) order, first half dev; planted: split of the source pair",
      units: count(units),
      pairs: count(pairs),
    },
    units,
    pairs,
    context,
  };
}

if (import.meta.main) {
  const check = process.argv.includes("--check");
  const dataset = buildDataset({ d085bdd: corpusAt(CALIBRATION_COMMIT), current: corpusAt(ROUND3_COMMIT) });
  const json = JSON.stringify(dataset, null, 1) + "\n";
  if (check) {
    const same = readFileSync(DATASET_PATH, "utf8") === json;
    console.error(same ? "dataset.json is up to date" : "dataset.json differs from a fresh build");
    process.exit(same ? 0 : 1);
  }
  writeFileSync(DATASET_PATH, json);
  console.error(JSON.stringify(dataset.meta));
  console.error(`wrote ${DATASET_PATH}`);
}

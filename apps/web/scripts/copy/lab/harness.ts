/**
 * Copy lab harness: runs one config (lab/configs/<name>.ts) on the frozen dataset (lab/dataset.json), compares the
 * levels it gives with the editor labels, and logs one row to lab/results.tsv.
 *
 * Usage:
 *   bun apps/web/scripts/copy/lab/harness.ts --config <name> [--split dev|test --final] [--errors N]
 *     [--dry-run] [--concurrency 16] [--note "text"] [--no-log]
 *
 *   --config       a file name in lab/configs/ (without .ts)
 *   --split        dev (default) or test. test needs --final and runs once per config name: the harness refuses
 *                  when results.tsv already has a test row for the config. Tune on dev only. A --final run
 *                  cannot use --no-log or --dry-run.
 *   --errors N     print the N largest disagreements (unit, dimension, label, Jev level, text). dev only: the
 *                  harness refuses to print per-item labels of the test split.
 *   --dry-run      no Jev calls: cache misses count as errors and their items are left out
 *   --no-log       do not append to results.tsv
 *
 * Metrics:
 *   primary        mean over S1..S7 of quadratic-weighted kappa (QWK) between the editor level and the Jev level.
 *                  When kappa is undefined for a dimension (every item has the same level from both sides), the
 *                  dimension uses Spearman if that is defined, else it is left out; the log says which.
 *   per dimension  n, QWK, exact agreement, agreement within one level, bias (Jev minus editor), for S1..S7 and
 *                  for L1, L2, L3, U1, U3 and native (reported, not in the primary).
 *   tell F1        micro F1 over (unit, tell) items, for the tells each unit is asked about; "all" includes the
 *                  planted units, "real" leaves them out.
 *   planted recall share of planted units where the planted tell is found (by code or by Jev).
 * Cost: requests, live requests (cache misses sent to Jev), live input tokens, USD at $0.042 per million.
 *
 * Writes the per-item levels of a dev run to lab/out/<config>.dev.json (gitignored). A test run writes nothing per item.
 */
import { createHash } from "node:crypto";
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { TypeSafeClient } from "@typesafe-ai/sdk";
import { lines } from "../../../src/data/lines";
import { checkPair, checkUnit, nameWords, type Finding } from "../checks";
import type { CopyUnit } from "../corpus";
import { loadApiKey, mapPool, type JevRequest, type JevResult, type Answer } from "../evaluate";
import { cachedSystemOne } from "../../jev-cache";
import type { Assessment, CopyLabConfig, LabContext } from "./config";
import { LEVELS, PRIMARY_DIMS, loadDataset, tellsAsked, type CorpusName, type Dataset, type DatasetUnit, type Split } from "./dataset";
import { dimAgreement, f1, type BinaryCounts, type DimAgreement } from "./metrics";

export const LAB_DIR = import.meta.dir;
export const RESULTS_TSV = join(LAB_DIR, "results.tsv");
export const USD_PER_MTOK = 0.042;
const DEFAULT_MODEL = "jev-1.13.0";
export const TSV_HEADER = [
  "timestamp", "config", "config_sha", "split", "units", "primary_mean_qwk", "dims_used", "within1_mean", "tell_f1_all", "tell_f1_real",
  "planted_recall", "requests", "live", "errors", "live_tokens", "usd", "secs", "secondaries_json", "note",
];
const SECONDARY_DIMS = ["L1", "L2", "L3", "U1", "U3", "native"];

export type HarnessArgs = {
  config: string;
  split: Split;
  final: boolean;
  errors: number;
  dryRun: boolean;
  concurrency: number;
  note: string;
  log: boolean;
};

export function parseArgs(argv: string[]): HarnessArgs {
  const get = (name: string) => {
    const i = argv.indexOf(`--${name}`);
    if (i < 0) return undefined;
    const v = argv[i + 1];
    if (v === undefined || v.startsWith("--")) throw new Error(`--${name} needs a value`);
    return v;
  };
  const config = get("config");
  if (!config) throw new Error("--config <name> is required");
  const split = (get("split") ?? "dev") as Split;
  if (split !== "dev" && split !== "test") throw new Error(`--split must be dev or test, not ${split}`);
  const final = argv.includes("--final");
  if (split === "dev" && final) throw new Error("--final is only for --split test");
  // The once-per-config rule reads results.tsv, so a test run must always add its row and must call Jev.
  if (final && argv.includes("--no-log")) throw new Error("--final runs are always logged; --no-log is not allowed");
  if (final && argv.includes("--dry-run")) throw new Error("--final runs call Jev; --dry-run is not allowed (it would use up the one test run)");
  return {
    config,
    split,
    final,
    errors: Number(get("errors") ?? 0),
    dryRun: argv.includes("--dry-run"),
    concurrency: Number(get("concurrency") ?? 16),
    note: get("note") ?? "",
    log: !argv.includes("--no-log"),
  };
}

// ---------- guards ----------

/** The test split needs --final, runs once per config, and never prints per-item labels. */
export function checkTestGuard(args: Pick<HarnessArgs, "config" | "split" | "final" | "errors">, tsv: string): void {
  if (args.split !== "test") return;
  if (args.errors > 0) throw new Error("leak guard: --errors prints per-item labels and is not allowed on the test split");
  if (!args.final) throw new Error("--split test needs --final (one run per config; tune on dev)");
  const used = tsv
    .split("\n")
    .slice(1)
    .some((line) => {
      const cols = line.split("\t");
      return cols[1] === args.config && cols[3] === "test";
    });
  if (used) throw new Error(`config "${args.config}" already has a test row in results.tsv; the test split runs once per config`);
}

// ---------- running ----------

export type UnitOutcome = { item: DatasetUnit; assessment?: Assessment; error?: string };

/** The context for each corpus: labelled units (not planted) plus the dataset context units. */
export function labContexts(ds: Dataset): Record<CorpusName, LabContext> {
  const out = {} as Record<CorpusName, LabContext>;
  for (const corpus of ["d085bdd", "current"] as const) {
    const units = [...ds.units.filter((d) => d.corpus === corpus && d.source !== "planted").map((d) => d.unit), ...ds.context[corpus]];
    const lineTitles: Record<string, string[]> = { en: [], fr: [] };
    for (const u of units) if (u.kind === "line" && u.field === "title") lineTitles[u.locale]!.push(u.text);
    out[corpus] = { byId: new Map(units.map((u) => [u.id, u])), lineTitles, corpus: units };
  }
  return out;
}

type Planned = { req: JevRequest; unitKeys: string[] };

async function runConfig(config: CopyLabConfig, ds: Dataset, split: Split, args: HarnessArgs) {
  const ctxs = labContexts(ds);
  const items = ds.units.filter((d) => d.split === split);
  const pairs = ds.pairs.filter((p) => p.split === split);
  const allowNames = [...new Set([...lines.flatMap((l) => l.stations.map((s) => s.name)), ...ds.units.map((d) => d.unit.stationName).filter((n): n is string => !!n)])];
  const stationNameWords = nameWords(allowNames);

  const planned: Planned[] = [];
  const findings = new Map<string, Finding[]>();
  for (const d of items) {
    findings.set(d.key, checkUnit(d.unit, { allowNames }));
    const r = config.unitRequest(d.unit, ctxs[d.corpus]);
    if (r) planned.push({ req: r, unitKeys: [d.key] });
  }
  const shared = new Map<string, boolean>();
  for (const p of pairs) {
    const ctx = ctxs[p.corpus];
    const en = ctx.byId.get(`${p.pairId}/en`)!;
    const fr = ctx.byId.get(`${p.pairId}/fr`)!;
    // Pair results and pair checks go to the real (not planted) units of the pair.
    const keys = items.filter((d) => d.source !== "planted" && d.unit.pairId === p.pairId && d.corpus === p.corpus).map((d) => d.key);
    const pf = checkPair(en, fr, { stationNameWords });
    for (const k of keys) {
      findings.get(k)!.push(...pf);
      shared.set(k, en.text === fr.text);
    }
    const r = config.pairRequest(en, fr, ctx);
    if (r) planned.push({ req: r, unitKeys: keys });
  }

  const model = config.model ?? DEFAULT_MODEL;
  const apiKey = args.dryRun ? undefined : loadApiKey();
  if (!args.dryRun && !apiKey) throw new Error("TYPESAFE_API_KEY not set (env or repo-root .env)");
  const client = apiKey ? new TypeSafeClient({ apiKey, defaultModel: model, timeout: 20_000, retry: { maxRetries: 4 } }) : undefined;
  let live = 0;
  let liveTokens = 0;
  const t0 = performance.now();
  const results = await mapPool(planned, args.concurrency, async ({ req }): Promise<JevResult> => {
    const r = await cachedSystemOne(client, { model, questions: req.questions, state: req.state });
    const base = { key: req.key, scope: req.scope, unitIds: req.unitIds };
    if (!r.ok) return { ...base, ms: r.ms, requestId: r.requestId, error: r.error };
    if (!r.cached) {
      live++;
      liveTokens += r.entry.usage?.input_tokens ?? 0;
    }
    const e = r.entry;
    return { ...base, model: e.model, requestId: e.requestId, usage: e.usage, ms: e.ms, answers: e.answers as Record<string, Answer> };
  });
  const secs = (performance.now() - t0) / 1000;

  const byUnit = new Map<string, JevResult[]>();
  planned.forEach((p, i) => {
    for (const k of p.unitKeys) byUnit.set(k, [...(byUnit.get(k) ?? []), results[i]!]);
  });
  const outcomes: UnitOutcome[] = items.map((d) => {
    const rs = byUnit.get(d.key) ?? [];
    const err = rs.find((r) => r.error);
    if (err) return { item: d, error: err.error };
    return { item: d, assessment: config.assess(d.unit, findings.get(d.key)!, rs, shared.get(d.key) ?? false) };
  });
  return { outcomes, requests: planned.length, live, liveTokens, errors: results.filter((r) => r.error).length, secs, pairs };
}

// ---------- metrics ----------

export type DimItem = { key: string; dim: string; label: number; jev: number };

/** (item, dimension) pairs with both an editor level and a Jev level. Pair dimensions use the EN unit's level. */
export function dimItems(ds: Pick<Dataset, "pairs">, outcomes: UnitOutcome[], split: Split): DimItem[] {
  const out: DimItem[] = [];
  const byUnitId = new Map(outcomes.filter((o) => o.item.source !== "planted").map((o) => [o.item.unit.id, o]));
  for (const o of outcomes) {
    if (o.item.source === "planted" || !o.assessment) continue;
    for (const [dim, label] of Object.entries(o.item.labels.dims)) {
      const jev = o.assessment.levels[dim];
      if (jev !== undefined) out.push({ key: o.item.key, dim, label, jev });
    }
  }
  for (const p of ds.pairs.filter((x) => x.split === split)) {
    const en = byUnitId.get(`${p.pairId}/en`);
    if (!en?.assessment) continue;
    for (const [dim, label] of Object.entries(p.labels.dims)) {
      const jev = en.assessment.levels[dim];
      if (jev !== undefined) out.push({ key: p.pairId, dim, label, jev });
    }
  }
  return out;
}

export type Metrics = {
  primary: number | undefined;
  primaryDims: string[];
  fallbacks: Record<string, "spearman" | "none">;
  dims: Record<string, DimAgreement>;
  within1Mean: number | undefined;
  tellF1All: ReturnType<typeof f1> & BinaryCounts;
  tellF1Real: ReturnType<typeof f1> & BinaryCounts;
  perTell: Record<string, BinaryCounts>;
  planted: { n: number; found: number; recall: number | undefined; byTell: Record<string, { n: number; found: number }> };
  missing: number;
};

export function computeMetrics(ds: Pick<Dataset, "pairs">, outcomes: UnitOutcome[], split: Split): Metrics {
  const items = dimItems(ds, outcomes, split);
  const dims: Record<string, DimAgreement> = {};
  for (const dim of [...PRIMARY_DIMS, ...SECONDARY_DIMS]) {
    const xs = items.filter((i) => i.dim === dim);
    if (xs.length) dims[dim] = dimAgreement(xs.map((x) => x.label), xs.map((x) => x.jev), LEVELS[dim]!);
  }
  const fallbacks: Record<string, "spearman" | "none"> = {};
  const used: number[] = [];
  const primaryDims: string[] = [];
  for (const dim of PRIMARY_DIMS) {
    const a = dims[dim];
    if (!a || a.metric === "none") {
      fallbacks[dim] = "none";
      continue;
    }
    if (a.metric === "spearman") fallbacks[dim] = "spearman";
    used.push(a.value!);
    primaryDims.push(dim);
  }
  const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : undefined);

  const zero = (): BinaryCounts => ({ tp: 0, fp: 0, fn: 0, tn: 0 });
  const all = zero();
  const real = zero();
  const perTell: Record<string, BinaryCounts> = {};
  const planted = { n: 0, found: 0, recall: undefined as number | undefined, byTell: {} as Record<string, { n: number; found: number }> };
  for (const o of outcomes) {
    const labelTells = o.item.labels.tells;
    if (o.item.planted) {
      const t = o.item.planted.tell;
      const bt = (planted.byTell[t] ??= { n: 0, found: 0 });
      planted.n++;
      bt.n++;
      if (o.assessment?.tells.includes(t)) {
        planted.found++;
        bt.found++;
      }
    }
    if (!o.assessment || labelTells === undefined) continue;
    for (const t of tellsAsked(o.item.unit)) {
      const y = labelTells.includes(t);
      const hit: boolean = o.assessment.tells.includes(t);
      const k = y && hit ? "tp" : !y && hit ? "fp" : y && !hit ? "fn" : "tn";
      all[k]++;
      if (!o.item.planted) real[k]++;
      (perTell[t] ??= zero())[k]++;
    }
  }
  planted.recall = planted.n ? planted.found / planted.n : undefined;
  return {
    primary: mean(used),
    primaryDims,
    fallbacks,
    dims,
    within1Mean: mean(PRIMARY_DIMS.map((d) => dims[d]?.within1).filter((x): x is number => x !== undefined)),
    tellF1All: { ...all, ...f1(all) },
    tellF1Real: { ...real, ...f1(real) },
    perTell,
    planted,
    missing: outcomes.filter((o) => !o.assessment).length,
  };
}

// ---------- output ----------

const r3 = (x: number | undefined) => (x === undefined ? "" : x.toFixed(3));

function report(m: Metrics): string {
  const L: string[] = [];
  L.push(`dim     n   metric    value   exact  within1  bias`);
  for (const [d, a] of Object.entries(m.dims))
    L.push(
      `${(PRIMARY_DIMS as readonly string[]).includes(d) ? d : `(${d})`}`.padEnd(8) +
        `${a.n}`.padStart(3) +
        `   ${a.metric.padEnd(8)}  ${r3(a.value).padStart(6)}  ${a.exact.toFixed(2)}   ${a.within1.toFixed(2)}    ${a.bias >= 0 ? "+" : ""}${a.bias.toFixed(2)}`,
    );
  L.push(`tells   F1 all ${r3(m.tellF1All.f1)} (tp ${m.tellF1All.tp}, fp ${m.tellF1All.fp}, fn ${m.tellF1All.fn}); F1 real ${r3(m.tellF1Real.f1)} (tp ${m.tellF1Real.tp}, fp ${m.tellF1Real.fp}, fn ${m.tellF1Real.fn})`);
  L.push(`planted recall ${m.planted.found}/${m.planted.n}: ${Object.entries(m.planted.byTell).map(([t, c]) => `${t} ${c.found}/${c.n}`).join(", ")}`);
  return L.join("\n");
}

/** Largest disagreements with their labels and texts. Refuses the test split (leak guard). */
export function errorReport(split: Split, ds: Pick<Dataset, "pairs" | "units">, outcomes: UnitOutcome[], n: number): string {
  if (split !== "dev") throw new Error("leak guard: per-item labels are printed for the dev split only");
  const items = dimItems(ds, outcomes, split).sort((a, b) => Math.abs(b.jev - b.label) - Math.abs(a.jev - a.label));
  const text = (key: string) => ds.units.find((d) => d.key === key || d.unit.pairId === key)?.unit.text ?? "";
  const L = items.slice(0, n).map((i) => `${i.dim} label ${i.label} jev ${i.jev}  ${i.key}\n    ${text(i.key)}`);
  const missed = outcomes.filter((o) => o.item.planted && !o.assessment?.tells.includes(o.item.planted.tell));
  for (const o of missed) L.push(`planted ${o.item.planted!.tell} missed  ${o.item.key}\n    ${o.item.unit.text}`);
  return L.join("\n");
}

const sha = (s: string) => createHash("sha1").update(s).digest("hex").slice(0, 10);

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const configPath = join(LAB_DIR, "configs", `${args.config}.ts`);
  if (!existsSync(configPath)) throw new Error(`no config ${configPath}`);
  const tsv = existsSync(RESULTS_TSV) ? readFileSync(RESULTS_TSV, "utf8") : TSV_HEADER.join("\t") + "\n";
  checkTestGuard(args, tsv);
  const config = (await import(configPath)).default as CopyLabConfig;
  if (config.name !== args.config) throw new Error(`config name "${config.name}" does not match file ${args.config}.ts`);
  const ds = loadDataset();
  const run = await runConfig(config, ds, args.split, args);
  const m = computeMetrics(ds, run.outcomes, args.split);
  const usd = (run.liveTokens / 1e6) * USD_PER_MTOK;

  const fb = Object.entries(m.fallbacks).map(([d, k]) => `${d}:${k}`).join(",");
  console.log(
    `config=${config.name} split=${args.split} units=${run.outcomes.length} primary=${r3(m.primary)} (mean QWK over ${m.primaryDims.join(",")}${fb ? `; ${fb}` : ""}) ` +
      `within1=${r3(m.within1Mean)} tellF1=${r3(m.tellF1All.f1)} plantedRecall=${r3(m.planted.recall)} requests=${run.requests} live=${run.live} errors=${run.errors} liveTokens=${run.liveTokens} usd=${usd.toFixed(4)} secs=${run.secs.toFixed(1)}`,
  );
  console.log(report(m));
  if (run.errors) console.log(`${run.errors} request errors; ${m.missing} units left out`);
  if (args.errors > 0) console.log("\n" + errorReport(args.split, ds, run.outcomes, args.errors));

  if (args.split === "dev") {
    mkdirSync(join(LAB_DIR, "out"), { recursive: true });
    const perItem = run.outcomes.map((o) => ({ key: o.item.key, labels: o.item.labels, planted: o.item.planted, levels: o.assessment?.levels, tells: o.assessment?.tells, error: o.error }));
    writeFileSync(join(LAB_DIR, "out", `${config.name}.dev.json`), JSON.stringify({ metrics: m, items: perItem }, null, 1) + "\n");
  }
  if (args.log) {
    const secondaries = {
      dims: Object.fromEntries(Object.entries(m.dims).map(([d, a]) => [d, { n: a.n, metric: a.metric, value: a.value === undefined ? null : +a.value.toFixed(3), within1: +a.within1.toFixed(3), bias: +a.bias.toFixed(2) }])),
      tellF1: m.tellF1All,
      planted: m.planted.byTell,
    };
    const row = [
      new Date().toISOString(), config.name, sha(readFileSync(configPath, "utf8")), args.split, run.outcomes.length, r3(m.primary),
      m.primaryDims.join(",") + (fb ? `;${fb}` : ""), r3(m.within1Mean), r3(m.tellF1All.f1), r3(m.tellF1Real.f1), r3(m.planted.recall),
      run.requests, run.live, run.errors, run.liveTokens, usd.toFixed(4), run.secs.toFixed(1), JSON.stringify(secondaries), args.note.replace(/[\t\n]/g, " "),
    ];
    if (!existsSync(RESULTS_TSV)) writeFileSync(RESULTS_TSV, TSV_HEADER.join("\t") + "\n");
    appendFileSync(RESULTS_TSV, row.join("\t") + "\n");
  }
}

if (import.meta.main) {
  main().catch((e) => {
    console.error(e instanceof Error ? e.message : e);
    process.exit(1);
  });
}

/**
 * Fact-check lab harness: runs one config (lab/configs/<name>.ts) on the frozen dataset (lab/dataset.json) and logs
 * one row to lab/results.tsv.
 *
 * Usage:
 *   bun apps/web/scripts/facts/lab/harness.ts --config <name> [--split dev|val --final] [--pass 1|2] [--no-planted]
 *     [--compare <name>] [--dry-run] [--concurrency 16] [--note "text"] [--no-log]
 *   bun apps/web/scripts/facts/lab/harness.ts --config baseline --parity
 *
 *   --config      a file name in lab/configs/ (without .ts)
 *   --split       dev (default) or val. val needs --final and runs once per config name: the harness refuses when
 *                 results.tsv already has a val row for the config. Tune on dev only. A --final run cannot use
 *                 --no-log or --dry-run.
 *   --pass        only labels from review pass 1 or 2 (planted copies follow their original's pass)
 *   --no-planted  leave out the planted errors
 *   --compare     paired bootstrap against the saved scores of another config on the same split and filters
 *                 (lab/out/<name>.<split>.json); prints p_better = P(this AP > that AP)
 *   --dry-run     no Jev calls: cache misses count as Jev errors
 *   --parity      baseline only: all splits, pass-1 labels, no planted; prints evaluate.ts's AUCs (problem =
 *                 confirmed or unsourced, against supported or refuted) to check parity with `evaluate.ts`, with ties
 *                 counted half and with evaluate.ts's tie-break (rank order, then pair key). No log row.
 *
 * Metrics (positive class "problem" = confirmed, refuted or unsourced, plus planted errors; negative = supported):
 *   primary   average precision (AP) of the risk ranking, one step per distinct score (ties are one group);
 *             95% bootstrap interval over items (2,000 resamples)
 *   auc       ROC AUC
 *   confR20   share of the real confirmed problems in the top 20 of the split (a tie group across rank 20 counts
 *             with the share of its places inside the top 20)
 *   plantR20  share of the planted errors in the top 20 (when planted items are in)
 *   plantAuc  AUC of planted errors against supported pairs
 * Cost: requests (all), live (sent to Jev), live input tokens, and USD at $0.042 per million input tokens.
 *
 * Writes the per-item scores to lab/out/<config>.<split>[.filters].json (gitignored).
 */
import { createHash } from "node:crypto";
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { cachedSystemOne, type JevCacheResult } from "../../jev-cache";
import { loadApiKey, makeClient } from "../jev";
import { mapPool } from "../sources";
import { loadDataset, stationKey, type Dataset, type DatasetItem } from "./build-dataset";
import type { LabConfig, LabRequest } from "./config";
import { auc, averagePrecision, bootstrapCi, pairedBootstrap, recallAtK, round3, type Scored } from "./metrics";

export const LAB_DIR = import.meta.dir;
export const RESULTS_TSV = join(LAB_DIR, "results.tsv");
export const USD_PER_MTOK = 0.042;
export const TSV_HEADER = ["timestamp", "config", "config_sha", "split", "filters", "items", "positives", "primary_ap", "ap_ci", "auc", "conf_recall20", "planted_recall20", "n_calls", "live_calls", "live_tokens", "usd", "secs", "p_better", "note"];

export type HarnessArgs = {
  config: string;
  split: "dev" | "val";
  final: boolean;
  pass?: 1 | 2;
  planted: boolean;
  compare?: string;
  dryRun: boolean;
  parity: boolean;
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
  if (!config) throw new Error("--config <name> is required (a file in lab/configs/)");
  const split = get("split") ?? "dev";
  if (split !== "dev" && split !== "val") throw new Error("--split must be dev or val");
  const pass = get("pass");
  if (pass !== undefined && pass !== "1" && pass !== "2") throw new Error("--pass must be 1 or 2");
  const final = argv.includes("--final");
  if (split === "val" && !final) throw new Error("--split val needs --final: val is for one last check per config, not for tuning");
  if (split === "dev" && final) throw new Error("--final is only for --split val");
  if (final && argv.includes("--no-log")) throw new Error("--final runs are always logged; --no-log is not allowed");
  if (final && argv.includes("--dry-run")) throw new Error("--final runs call Jev; --dry-run is not allowed (it would use up the one val run)");
  const parity = argv.includes("--parity");
  if (parity && config !== "baseline") throw new Error("--parity is only for the baseline config");
  return {
    config,
    split,
    final,
    pass: pass === undefined ? undefined : (Number(pass) as 1 | 2),
    planted: !argv.includes("--no-planted"),
    compare: get("compare"),
    dryRun: argv.includes("--dry-run"),
    parity,
    concurrency: Number(get("concurrency") ?? 16),
    note: get("note") ?? "",
    log: !argv.includes("--no-log") && !parity,
  };
}

/** True when results.tsv already has a val row for this config. */
export function valAlreadyRun(config: string, tsv = RESULTS_TSV): boolean {
  if (!existsSync(tsv)) return false;
  const [head, ...rows] = readFileSync(tsv, "utf8").trim().split("\n");
  const cols = head!.split("\t");
  const ci = cols.indexOf("config");
  const si = cols.indexOf("split");
  return rows.some((r) => {
    const f = r.split("\t");
    return f[ci] === config && f[si] === "val";
  });
}

export function selectItems(ds: Dataset, f: { split?: "dev" | "val"; pass?: 1 | 2; planted: boolean }): DatasetItem[] {
  return ds.items.filter((i) => (!f.split || i.split === f.split) && (!f.pass || i.pass === f.pass) && (f.planted || !i.planted));
}

export type RunResult = {
  scored: (Scored & { verdict: string; planted: boolean })[];
  excluded: { id: string; reason: string }[];
  calls: number;
  live: number;
  liveTokens: number;
  errors: number;
};

export async function runConfig(config: LabConfig, ds: Dataset, items: DatasetItem[], opts: { dryRun: boolean; concurrency: number }): Promise<RunResult> {
  const apiKey = opts.dryRun ? undefined : loadApiKey();
  const client = apiKey ? makeClient(apiKey) : undefined;
  if (!opts.dryRun && !client) throw new Error("TYPESAFE_API_KEY is not set (environment or repo-root .env); use --dry-run");
  type Job = { item: number; claim: number; reqs: LabRequest[] };
  const jobs: Job[] = [];
  items.forEach((item, i) => {
    const station = ds.stations[stationKey(item.pass, item.lineId, item.stationId)]!;
    [...item.en, ...item.fr].forEach((claim, c) => jobs.push({ item: i, claim: c, reqs: config.requests({ ds, item, claim, station }) }));
  });
  const flat = jobs.flatMap((j) => j.reqs);
  const results = await mapPool(flat, opts.concurrency, (r) => cachedSystemOne(client, r.req, r.cache));
  let k = 0;
  const byJob = jobs.map((j) => results.slice(k, (k += j.reqs.length)));
  const scored: RunResult["scored"] = [];
  const excluded: RunResult["excluded"] = [];
  items.forEach((item, i) => {
    const station = ds.stations[stationKey(item.pass, item.lineId, item.stationId)]!;
    const claims = [...item.en, ...item.fr].map((claim, c) => ({ claim, results: byJob[jobs.findIndex((j) => j.item === i && j.claim === c)]! }));
    const s = config.score({ ds, item, station, claims });
    if (s.excluded) excluded.push({ id: item.id, reason: s.excluded });
    else scored.push({ id: item.id, score: s.risk, positive: item.problem, verdict: item.verdict, planted: !!item.planted });
  });
  const live = results.filter((r): r is Extract<JevCacheResult, { ok: true }> => r.ok && !r.cached);
  return {
    scored,
    excluded,
    calls: results.length,
    live: live.length,
    liveTokens: live.reduce((s, r) => s + (r.entry.usage?.input_tokens ?? 0), 0),
    errors: results.filter((r) => !r.ok).length,
  };
}

export function summarizeRun(run: RunResult) {
  const xs = run.scored;
  const confirmedReal = new Set(xs.filter((x) => x.verdict === "confirmed" && !x.planted).map((x) => x.id));
  const planted = new Set(xs.filter((x) => x.planted).map((x) => x.id));
  const ap = averagePrecision(xs);
  const ci = bootstrapCi(xs, averagePrecision);
  return {
    items: xs.length,
    positives: xs.filter((x) => x.positive).length,
    primary: round3(ap),
    apCi: [round3(ci.lo), round3(ci.hi)] as [number, number],
    auc: round3(auc(xs)),
    confR20: round3(recallAtK(xs, (id) => confirmedReal.has(id), 20)),
    plantR20: planted.size ? round3(recallAtK(xs, (id) => planted.has(id), 20)) : NaN,
    plantAuc: planted.size ? round3(auc(xs.filter((x) => x.planted || x.verdict === "supported"))) : NaN,
  };
}

const configSha = (name: string) => createHash("sha1").update(readFileSync(join(LAB_DIR, "configs", `${name}.ts`))).digest("hex").slice(0, 10);

async function loadConfig(name: string): Promise<LabConfig> {
  if (!/^[\w-]+$/.test(name)) throw new Error(`bad config name ${name}`);
  const path = join(LAB_DIR, "configs", `${name}.ts`);
  if (!existsSync(path)) throw new Error(`no config ${path}`);
  const config = ((await import(path)) as { default: LabConfig }).default;
  if (config.name !== name) throw new Error(`config ${path} has name "${config.name}"; it must match the file name`);
  return config;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const t0 = performance.now();
  const config = await loadConfig(args.config);
  const ds = loadDataset();

  if (args.parity) {
    const items = selectItems(ds, { pass: 1, planted: false });
    const run = await runConfig(config, ds, items, { dryRun: args.dryRun, concurrency: args.concurrency });
    // evaluate.ts's definition: problem = confirmed or unsourced, against supported or refuted.
    const legacy = run.scored.map((x) => ({ ...x, positive: x.verdict === "confirmed" || x.verdict === "unsourced" }));
    const confirmedOnly = legacy.filter((x) => x.verdict !== "unsourced").map((x) => ({ ...x, positive: x.verdict === "confirmed" }));
    // evaluate.ts breaks ties by pair key (its rank order) instead of counting them half.
    const byRank = (xs: Scored[]) => {
      const order = [...xs].sort((a, b) => b.score - a.score || a.id.slice(2).localeCompare(b.id.slice(2)));
      const at = new Map(order.map((x, i) => [x.id, i]));
      const p = xs.filter((x) => x.positive);
      const n = xs.filter((x) => !x.positive);
      let wins = 0;
      for (const a of p) for (const b of n) wins += at.get(a.id)! < at.get(b.id)! ? 1 : 0;
      return round3(wins / (p.length * n.length));
    };
    console.log(
      JSON.stringify({
        parity: "pass-1 labels, all splits",
        items: run.scored.length,
        excluded: run.excluded.map((e) => e.id),
        aucProblem: round3(auc(legacy)),
        aucConfirmed: round3(auc(confirmedOnly)),
        aucProblemRankOrder: byRank(legacy),
        aucConfirmedRankOrder: byRank(confirmedOnly),
        calls: run.calls,
        live: run.live,
        errors: run.errors,
      }),
    );
    return;
  }

  if (args.split === "val" && valAlreadyRun(args.config)) throw new Error(`results.tsv already has a val row for ${args.config}; val runs once per config`);
  const items = selectItems(ds, { split: args.split, pass: args.pass, planted: args.planted });
  const run = await runConfig(config, ds, items, { dryRun: args.dryRun, concurrency: args.concurrency });
  const m = summarizeRun(run);
  const filters = [args.pass ? `pass${args.pass}` : "", args.planted ? "" : "noplanted"].filter(Boolean).join(",") || "all";

  const outDir = join(LAB_DIR, "out");
  mkdirSync(outDir, { recursive: true });
  const outName = (name: string) => join(outDir, `${name}.${args.split}${filters === "all" ? "" : `.${filters}`}.json`);
  writeFileSync(outName(args.config), JSON.stringify({ config: args.config, split: args.split, filters, metrics: m, excluded: run.excluded, scored: run.scored }, null, 1));

  let pBetter = NaN;
  if (args.compare) {
    const other = JSON.parse(readFileSync(outName(args.compare), "utf8")) as { scored: Scored[] };
    pBetter = round3(pairedBootstrap(run.scored, other.scored, averagePrecision));
  }
  const usd = (run.liveTokens / 1e6) * USD_PER_MTOK;
  const secs = (performance.now() - t0) / 1000;
  const line = {
    config: args.config,
    split: args.split,
    filters,
    ...m,
    calls: run.calls,
    live: run.live,
    liveTokens: run.liveTokens,
    errors: run.errors,
    usd: Number(usd.toFixed(4)),
    secs: Number(secs.toFixed(1)),
    ...(args.compare ? { compare: args.compare, pBetter } : {}),
  };
  console.log(JSON.stringify(line));
  if (run.errors) console.warn(`${run.errors} Jev errors (counted as unsupported by the baseline scorer)`);
  if (args.log) {
    if (!existsSync(RESULTS_TSV)) writeFileSync(RESULTS_TSV, TSV_HEADER.join("\t") + "\n");
    const row = [new Date().toISOString(), args.config, configSha(args.config), args.split, filters, m.items, m.positives, m.primary, `${m.apCi[0]}–${m.apCi[1]}`, m.auc, m.confR20, m.plantR20, run.calls, run.live, run.liveTokens, usd.toFixed(4), secs.toFixed(1), Number.isNaN(pBetter) ? "" : pBetter, args.note.replace(/\s+/g, " ")];
    appendFileSync(RESULTS_TSV, row.join("\t") + "\n");
  }
}

if (import.meta.main) await main();

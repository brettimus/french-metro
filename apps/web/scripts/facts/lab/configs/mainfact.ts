/**
 * mainfact: contra2, plus a lenient `main_fact` noul ("do the sources state the main fact of the claim?"), asked on
 * the passage state and on the whole-source state (two extra requests per claim). Each claim's `supported` is the
 * weighted mean of the passage and whole-source `supported` nouls and the `main_fact` nouls.
 * MAINFACT_W sets the weight of the main-fact part (default 1); MAINFACT_SRC = both | passage | whole picks which
 * main-fact answers make that part (their mean).
 * Hypothesis: the reviewer accepts claims that add small details when the sources state the main fact (iteration 11:
 * Jev puts 90 of 173 supported claims at "adds a detail"). The strict `supported` noul is low on these claims. A
 * lenient question about the main fact only can separate supported claims from unsourced ones, which have no source
 * for the main fact.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { noul } from "@typesafe-ai/sdk";
import { jevCacheOptions, jevRequest, MODEL, toJevAnswer, type JevAnswer, type JevState } from "../../jev";
import { claimRisk, rankPairs, RISK_WEIGHTS, type ClaimRow } from "../../rank";
import { cleanSourceText } from "../../retrieve";
import { cachePath, type SourceDoc } from "../../sources";
import { stateFor, stationKey, type Dataset, type DatasetClaim, type DatasetItem } from "../build-dataset";
import type { LabConfig } from "../config";

const NO_PASSAGES: JevAnswer = { ms: 0, cached: false, error: "no passages retrieved" };
const sha1 = (s: string) => createHash("sha1").update(s).digest("hex");

const docCache = new Map<string, string>();
function sourceText(ds: Dataset, url: string): string | undefined {
  const meta = ds.sources[url];
  if (!meta || meta.status !== "ok") return undefined;
  let clean = docCache.get(url);
  if (clean === undefined) {
    const doc = JSON.parse(readFileSync(cachePath(url), "utf8")) as SourceDoc;
    clean = cleanSourceText(doc.text);
    if (sha1(clean) !== meta.textSha1) throw new Error(`source text for ${url} changed since dataset.json was built`);
    docCache.set(url, clean);
  }
  return clean;
}

function wholeState(ds: Dataset, item: DatasetItem, claim: DatasetClaim): JevState | undefined {
  const station = ds.stations[stationKey(item.pass as 1 | 2, item.lineId, item.stationId)]!;
  const base = stateFor(ds, item, claim);
  const passages: JevState["passages"] = [];
  for (const { url } of station.urls) {
    const text = sourceText(ds, url);
    if (!text) continue;
    const title = ds.sources[url]?.title;
    passages.push({ id: `s${passages.length + 1}`, source: `${new URL(url).host}${title ? `: ${title}` : ""}`, text });
  }
  return passages.length ? { ...base, passages } : undefined;
}

const WEIGHTS = { ...RISK_WEIGHTS, contradicted: 0.2 };
const MAIN_W = Number(process.env.MAINFACT_W ?? "1");
const MAIN_SRC = process.env.MAINFACT_SRC ?? "both";

const PREVIOUS_NOTE = " If `previous_sentence` is present, use it only to understand what words like \"it\" or \"the square\" in the claim refer to; judge only the claim.";
const mainQuestions = (hasPrevious: boolean) => ({
  main_fact: noul(
    "Do `passages` state the main fact of `claim`? The main fact is the central event, person, origin, date or feature the claim describes. Ignore small added details, wording and emphasis. The claim is about the Paris Métro station named in `station`. Passages may be in French while the claim is in English." +
      (hasPrevious ? PREVIOUS_NOTE : ""),
    {
      true: "A passage states the central fact of the claim, or it follows directly from what the passages state, even if the claim adds a small detail or words it differently",
      false: "No passage states the central fact of the claim: the passages are about other things, only mention the subject in passing, or give a different account",
    },
  ),
});
const mainReq = (state: JevState) => ({ req: { model: MODEL, questions: mainQuestions(state.previous_sentence !== undefined), state } });
const mainOf = (r: { ok: boolean; entry?: { answers: Record<string, unknown> } } | undefined) =>
  r?.ok ? (r.entry!.answers.main_fact as { noul?: number } | undefined)?.noul : undefined;

const config: LabConfig = {
  name: "mainfact",
  description: "contra2 plus a lenient main-fact noul (passage and whole-source states) blended into supported",
  requests({ ds, item, claim }) {
    if (!claim.passages.length) return [];
    const reqs = [];
    const passageState = stateFor(ds, item, claim);
    const { dir: _d0, ...passageCache } = jevCacheOptions(passageState);
    reqs.push({ req: jevRequest(passageState), cache: passageCache });
    const whole = wholeState(ds, item, claim);
    reqs.push(mainReq(passageState));
    if (whole) reqs.push({ req: jevRequest(whole) }, mainReq(whole));
    return reqs;
  },
  score({ ds, item, station, claims }) {
    const rows = claims.map(({ claim, results }) => {
      const passageAnswer = results[0] ? toJevAnswer(results[0]) : NO_PASSAGES;
      const mainPassage = mainOf(results[1] as never);
      const wholeAnswer = results[2] ? toJevAnswer(results[2]) : undefined;
      const mainWhole = mainOf(results[3] as never);
      const wholeOk = wholeAnswer && !wholeAnswer.error && wholeAnswer.supported !== undefined;
      const passageOk = passageAnswer.supported !== undefined && !passageAnswer.error;
      let jev: JevAnswer = passageAnswer;
      if (passageOk) {
        const sup = wholeOk ? (passageAnswer.supported! + wholeAnswer.supported!) / 2 : passageAnswer.supported!;
        const mains = (MAIN_SRC === "passage" ? [mainPassage] : MAIN_SRC === "whole" ? [mainWhole ?? mainPassage] : [mainPassage, mainWhole]).filter(
          (v): v is number => v !== undefined,
        );
        const main = mains.length ? mains.reduce((a, b) => a + b, 0) / mains.length : undefined;
        jev = { ...passageAnswer, supported: main === undefined ? sup : (sup + MAIN_W * main) / (1 + MAIN_W) };
      } else if (wholeOk) jev = wholeAnswer;
      if (process.env.MAINFACT_DUMP)
        console.error(JSON.stringify({ v: item.planted ? "planted" : item.verdict, p: passageAnswer.supported, w: wholeAnswer?.supported, mp: mainPassage, mw: mainWhole }));
      const passages = claim.passages.map((p) => ({ id: p.id, score: p.score, ...ds.passages[p.ref]! }));
      const { risk, parts } = claimRisk({ unmatched: claim.numbers.filter((m) => !m.matched), passages, jev, fetchFailure: station.fetchFailure }, WEIGHTS);
      return {
        id: claim.id,
        pairKey: item.pairKey,
        lineId: item.lineId,
        stationId: item.stationId,
        field: item.field,
        locale: claim.locale,
        text: claim.text,
        risk,
        riskParts: parts,
      } as unknown as ClaimRow;
    });
    const { excluded } = rankPairs(rows, WEIGHTS);
    if (excluded.length) return { risk: excluded[0]!.risk, excluded: `known conflict: ${excluded[0]!.conflict.note.slice(0, 60)}` };
    const parts: Record<string, number> = {};
    for (const r of rows) for (const [k, v] of Object.entries(r.riskParts)) if (k !== "unsupported") parts[k] = Math.max(parts[k] ?? 0, v);
    parts.unsupported = rows.reduce((s, r) => s + (r.riskParts.unsupported ?? 0), 0) / rows.length;
    return { risk: Object.values(parts).reduce((a, b) => a + b, 0) };
  },
};

export default config;

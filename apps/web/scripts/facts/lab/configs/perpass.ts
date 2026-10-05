/**
 * perpass: contra2, plus one Jev request per retrieved passage (the state holds that passage only). Each claim's
 * `supported` is the mean of the joined-passage noul, the whole-source noul and the max of the per-passage nouls
 * (weight PERPASS_W, default 1). `contradicted` and `best_passage` still come from the joined-passage answer.
 * Hypothesis (plan idea 4): when the passages are joined, unrelated passages can lower `supported`; a claim that one
 * passage states in full should rank low. Unsourced claims have no such passage.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { jevCacheOptions, jevRequest, toJevAnswer, type JevAnswer, type JevState } from "../../jev";
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
const PERPASS_W = Number(process.env.PERPASS_W ?? 1);

const config: LabConfig = {
  name: "perpass",
  description: "contra2 plus max of per-passage supported, blended into supported",
  requests({ ds, item, claim }) {
    if (!claim.passages.length) return [];
    const reqs = [];
    const passageState = stateFor(ds, item, claim);
    const { dir: _d0, ...passageCache } = jevCacheOptions(passageState);
    reqs.push({ req: jevRequest(passageState), cache: passageCache });
    const whole = wholeState(ds, item, claim);
    reqs.push(whole ? { req: jevRequest(whole) } : { req: jevRequest(passageState), cache: passageCache });
    for (const p of passageState.passages) reqs.push({ req: jevRequest({ ...passageState, passages: [p] }) });
    return reqs;
  },
  score({ ds, item, station, claims }) {
    const rows = claims.map(({ claim, results }) => {
      const passageAnswer = results[0] ? toJevAnswer(results[0]) : NO_PASSAGES;
      const wholeAnswer = results[1] && wholeState(ds, item, claim) ? toJevAnswer(results[1]) : undefined;
      const perPass = results.slice(2).map(toJevAnswer).filter((a) => !a.error && a.supported !== undefined).map((a) => a.supported!);
      const maxPer = perPass.length ? Math.max(...perPass) : undefined;
      const wholeOk = wholeAnswer && !wholeAnswer.error && wholeAnswer.supported !== undefined;
      const base: JevAnswer =
        wholeOk && passageAnswer.supported !== undefined && !passageAnswer.error
          ? { ...passageAnswer, supported: (passageAnswer.supported + wholeAnswer.supported!) / 2 }
          : wholeOk && (passageAnswer.error || passageAnswer.supported === undefined)
            ? wholeAnswer
            : passageAnswer;
      let jev = base;
      if (maxPer !== undefined && base.supported !== undefined && !base.error) {
        const nBase = wholeOk && !passageAnswer.error && passageAnswer.supported !== undefined ? 2 : 1;
        jev = { ...base, supported: (base.supported * nBase + PERPASS_W * maxPer) / (nBase + PERPASS_W) };
      }
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

/**
 * Lab helper: prints the raw Jev answers (from the cache) of one config's dev requests as JSON lines, with the
 * editor labels. One line per labelled unit (unit request) and one per pair (pair request).
 * Usage: bun apps/web/scripts/copy/lab/dump-answers.ts <config>
 */
import { TypeSafeClient } from "@typesafe-ai/sdk";
import { loadApiKey, type JevRequest } from "../evaluate";
import { cachedSystemOne } from "../../jev-cache";
import { labContexts } from "./harness";
import { loadDataset } from "./dataset";

const name = process.argv[2] ?? "s4-wordy";
const config = (await import(`./configs/${name}.ts`)).default;
const ds = loadDataset();
const ctxs = labContexts(ds);
const key = loadApiKey();
const client = key ? new TypeSafeClient({ apiKey: key, defaultModel: "jev-1.13.0", timeout: 20_000 }) : undefined;

async function answers(req: JevRequest) {
  const r = await cachedSystemOne(client, { model: config.model ?? "jev-1.13.0", questions: req.questions, state: req.state });
  if (!r.ok) return undefined;
  const a = r.entry.answers as Record<string, any>;
  return Object.fromEntries(
    Object.entries(a).map(([k, x]) => [k.replace(/^.*\./, ""), x.type === "noul" ? +x.noul.toFixed(3) : x.type === "score" ? +x.score.toFixed(3) : x.type]),
  );
}

for (const d of ds.units.filter((x) => x.split === "dev")) {
  const req = config.unitRequest(d.unit, ctxs[d.corpus]);
  if (!req) continue;
  console.log(JSON.stringify({ kind: "unit", id: d.key, labels: d.labels, jev: await answers(req) }));
}
for (const p of ds.pairs.filter((x) => x.split === "dev")) {
  const ctx = ctxs[p.corpus];
  const req = config.pairRequest(ctx.byId.get(`${p.pairId}/en`)!, ctx.byId.get(`${p.pairId}/fr`)!, ctx);
  if (!req) continue;
  console.log(JSON.stringify({ kind: "pair", id: p.pairId, labels: p.labels, jev: await answers(req) }));
}

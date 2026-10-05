/**
 * Baseline: the production copy evaluator (questions.ts, current QUESTION_SET_VERSION; requests and assembly from
 * evaluate.ts). Levels come from the row dims (1 + round(norm * (L - 1))), so the code caps (S5 sentence length,
 * S3 code tells, S4 and S6 derived from Nouls) apply as in production. `native` comes from the raw FR hint score.
 */
import { assembleRow, pairRequest, unitRequest } from "../../evaluate";
import { QUESTION_SET_VERSION, TELL_ID } from "../../questions";
import type { CopyLabConfig } from "../config";
import { LEVELS } from "../dataset";
import { toLevel } from "../metrics";

const TELL_NAME = Object.fromEntries(Object.entries(TELL_ID).map(([name, id]) => [id, name]));

const config: CopyLabConfig = {
  name: "baseline",
  description: `production copy evaluator, question set ${QUESTION_SET_VERSION}`,
  unitRequest: (u, ctx) => unitRequest(u, ctx.byId, ctx.lineTitles, ctx.corpus),
  pairRequest: (en, fr) => pairRequest(en, fr),
  assess(u, findings, results, sharedText) {
    const row = assembleRow(u, findings, results, sharedText);
    const levels: Record<string, number> = {};
    for (const [d, v] of Object.entries(row.dims)) if (LEVELS[d]) levels[d] = toLevel(v, LEVELS[d]!);
    const native = row.jev["unit.native"];
    if (native?.type === "score") levels.native = Math.min(LEVELS.native!, Math.max(1, Math.round(native.score) + 1));
    // row.tells holds "T5 <match>" (code) and "T5 (jev)" entries.
    const tells = [...new Set(row.tells.map((t) => TELL_NAME[t.split(" ")[0]!]).filter((t): t is string => !!t))];
    return { levels, tells };
  },
};

export default config;

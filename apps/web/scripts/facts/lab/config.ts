/**
 * The interface a lab config implements (lab/configs/*.ts, default export). The harness calls `requests` for each
 * claim of each item, sends the requests through the Jev cache, and then calls `score` once per item with the
 * results. See harness.ts.
 */
import type { JevCacheOptions, JevCacheRequest, JevCacheResult } from "../../jev-cache";
import type { Dataset, DatasetClaim, DatasetItem, DatasetStation } from "./build-dataset";

export type ClaimContext = { ds: Dataset; item: DatasetItem; claim: DatasetClaim; station: DatasetStation };

/** One Jev request and its cache options (for example an old-key fallback). */
export type LabRequest = { req: JevCacheRequest; cache?: Omit<JevCacheOptions, "dir"> };

export type ItemContext = {
  ds: Dataset;
  item: DatasetItem;
  station: DatasetStation;
  /** Each claim of the item (EN first, then FR) with the results of its requests, in the order `requests` gave. */
  claims: { claim: DatasetClaim; results: JevCacheResult[] }[];
};

export type LabConfig = {
  /** Must match the file name in lab/configs/. */
  name: string;
  /** One line: what this config changes compared with the config it copies. */
  description: string;
  /** Jev requests for one claim; an empty list makes no call. */
  requests(ctx: ClaimContext): LabRequest[];
  /** The item's risk score (higher = more likely a problem), or `excluded` to leave the item out of the metrics. */
  score(ctx: ItemContext): { risk: number; excluded?: string };
};

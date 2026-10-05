/**
 * Fetch every station source URL and people URL into apps/web/scripts/facts/cache/ (gitignored).
 *
 * Wikipedia pages come from the MediaWiki API as plain text (prop=extracts, explaintext, redirects). Other pages are
 * fetched as HTML and stripped to text. Failures are kept in the cache with their status: a broken link is a finding.
 *
 * Usage: bun apps/web/scripts/facts/sources.ts [--line X] [--refresh]
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { lines } from "../../src/data/lines";
import type { Station } from "../../src/data/types";

export const CACHE_DIR = join(import.meta.dir, "cache");
export const USER_AGENT =
  "french-metro-fact-checker/0.1 (https://github.com/brettimus/french-metro; source check for station copy, cached) Bun";
/** Some sites refuse non-browser agents. A second try with this agent tells a bot block from a broken link. */
const BROWSER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";

export type FetchStatus = "ok" | "broken" | "unreadable";

/**
 * How to read a failure. "broken": the page is gone or the request failed (404, 410, DNS, timeout).
 * "blocked": the server refused the script (401, 403, 429, 503); the link may still work in a browser.
 */
export function failureKind(d: Pick<SourceDoc, "status" | "httpStatus">): "ok" | "broken" | "blocked" | "unreadable" {
  if (d.status === "ok") return "ok";
  if (d.status === "unreadable") return "unreadable";
  return [401, 403, 429, 503].includes(d.httpStatus) ? "blocked" : "broken";
}
export type SourceDoc = {
  url: string;
  status: FetchStatus;
  /** HTTP status, or 0 for a network error. */
  httpStatus: number;
  title?: string;
  /** Wikipedia: the article title after redirects, when it differs from the requested title. */
  redirectedTo?: string;
  text: string;
  error?: string;
  /** True when only the browser agent got the page. */
  browserAgent?: boolean;
  fetchedAt: string;
};

export type StationRef = { lineId: string; station: Station };
export type UrlRole = "source" | "people";

/** Every URL a station cites, with its role. People links give both locales. */
export function stationUrls(s: Station): { url: string; role: UrlRole }[] {
  const out = new Map<string, UrlRole>();
  for (const src of s.sources) out.set(src.url, "source");
  for (const p of s.people ?? []) for (const u of [p.url.fr, p.url.en]) if (!out.has(u)) out.set(u, "people");
  return [...out].map(([url, role]) => ({ url, role }));
}

export function stationRefs(line?: string): StationRef[] {
  return lines.filter((l) => !line || l.id === line).flatMap((l) => l.stations.map((station) => ({ lineId: l.id, station })));
}

/** "https://fr.wikipedia.org/wiki/Foo_(bar)#x" → { lang: "fr", title: "Foo (bar)" }. */
export function wikiTitle(url: string): { lang: string; title: string } | undefined {
  const u = new URL(url);
  const m = u.host.match(/^([a-z-]+)\.(?:m\.)?wikipedia\.org$/);
  if (!m || !u.pathname.startsWith("/wiki/")) return undefined;
  return { lang: m[1]!, title: decodeURIComponent(u.pathname.slice("/wiki/".length)).replaceAll("_", " ") };
}

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", rsquo: "’", lsquo: "‘", laquo: "«", raquo: "»", eacute: "é", egrave: "è", agrave: "à", ccedil: "ç", ocirc: "ô", ecirc: "ê", hellip: "…", ndash: "–", mdash: "—" };

/** Strip an HTML page to text: drop script/style/nav/header/footer, turn block ends into newlines, decode entities. */
export function htmlToText(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(script|style|noscript|svg|nav|header|footer|form|iframe)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<\/(p|div|li|h[1-6]|tr|section|article|br)>|<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, name: string) => ENTITIES[name.toLowerCase()] ?? m)
    .replace(/[ \t ]+/g, " ")
    .replace(/\s*\n\s*/g, "\n")
    .trim();
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Per-host pacing. Requests to one host are spaced by `minGapMs`, and a 429 pauses every request to that host for
 * the Retry-After time, so parallel workers do not keep hitting the rate limit.
 */
const hostGate = new Map<string, { nextAt: number }>();
async function waitTurn(host: string, minGapMs: number) {
  const gate = hostGate.get(host) ?? { nextAt: 0 };
  hostGate.set(host, gate);
  for (;;) {
    const wait = gate.nextAt - Date.now();
    if (wait <= 0) break;
    await sleep(wait);
  }
  gate.nextAt = Date.now() + minGapMs;
}
function pauseHost(host: string, ms: number) {
  const gate = hostGate.get(host) ?? { nextAt: 0 };
  gate.nextAt = Math.max(gate.nextAt, Date.now() + ms);
  hostGate.set(host, gate);
}

/** fetch with timeout and retries on 429/5xx/network errors, honouring Retry-After. */
async function fetchRetry(url: string, headers: Record<string, string>, tries = 5, minGapMs = 0): Promise<Response> {
  const host = new URL(url).host;
  let lastError: unknown;
  for (let attempt = 0; attempt < tries; attempt++) {
    try {
      await waitTurn(host, minGapMs);
      const res = await fetch(url, { headers, redirect: "follow", signal: AbortSignal.timeout(30_000) });
      if (res.status !== 429 && res.status < 500) return res;
      if (attempt === tries - 1) return res;
      const retryAfter = Number(res.headers.get("retry-after"));
      pauseHost(host, Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 + 250 : 1000 * 2 ** attempt);
    } catch (e) {
      lastError = e;
      if (attempt === tries - 1) throw e;
      await sleep(1000 * 2 ** attempt);
    }
  }
  throw lastError;
}

/** Spacing between Wikipedia API requests per host. */
export const WIKI_GAP_MS = 1200;

const now = () => new Date().toISOString();

async function fetchWikipedia(url: string, lang: string, title: string): Promise<SourceDoc> {
  const api = new URL(`https://${lang}.wikipedia.org/w/api.php`);
  for (const [k, v] of Object.entries({ action: "query", prop: "extracts", explaintext: "1", redirects: "1", format: "json", formatversion: "2", titles: title })) api.searchParams.set(k, v);
  const res = await fetchRetry(api.toString(), { "User-Agent": USER_AGENT, "Api-User-Agent": USER_AGENT }, 12, WIKI_GAP_MS);
  if (!res.ok) return { url, status: "broken", httpStatus: res.status, text: "", error: `API HTTP ${res.status}`, fetchedAt: now() };
  const data = (await res.json()) as { query?: { pages?: { title: string; missing?: boolean; invalid?: boolean; extract?: string }[] } };
  const page = data.query?.pages?.[0];
  if (!page || page.missing || page.invalid) return { url, status: "broken", httpStatus: 404, text: "", error: `no Wikipedia article "${title}"`, fetchedAt: now() };
  const text = page.extract ?? "";
  return {
    url,
    status: text.length < 200 ? "unreadable" : "ok",
    httpStatus: 200,
    title: page.title,
    ...(page.title !== title ? { redirectedTo: page.title } : {}),
    text,
    ...(text.length < 200 ? { error: "empty extract" } : {}),
    fetchedAt: now(),
  };
}

async function fetchHtml(url: string): Promise<SourceDoc> {
  let browserAgent = false;
  let res = await fetchRetry(url, { "User-Agent": USER_AGENT, Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.5", "Accept-Language": "fr,en;q=0.8" }, 3);
  if (!res.ok) {
    const second = await fetchRetry(url, { "User-Agent": BROWSER_AGENT, Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.5", "Accept-Language": "fr,en;q=0.8" }, 3);
    if (second.ok) {
      res = second;
      browserAgent = true;
    }
  }
  if (!res.ok) return { url, status: "broken", httpStatus: res.status, text: "", error: `HTTP ${res.status}`, fetchedAt: now() };
  const type = res.headers.get("content-type") ?? "";
  if (!/html|text\/plain|xml/.test(type)) {
    return { url, status: "unreadable", httpStatus: res.status, text: "", error: `content-type ${type || "unknown"}`, fetchedAt: now(), ...(browserAgent ? { browserAgent } : {}) };
  }
  const html = await res.text();
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  const text = type.includes("text/plain") ? html : htmlToText(html);
  const words = text.split(/\s+/).length;
  return {
    url,
    status: words < 80 ? "unreadable" : "ok",
    httpStatus: res.status,
    ...(title ? { title: htmlToText(title) } : {}),
    text,
    ...(words < 80 ? { error: `only ${words} words of text (page may need JavaScript)` } : {}),
    ...(browserAgent ? { browserAgent } : {}),
    fetchedAt: now(),
  };
}

export const cachePath = (url: string) => join(CACHE_DIR, `${createHash("sha1").update(url).digest("hex")}.json`);

export function readCached(url: string): SourceDoc | undefined {
  const p = cachePath(url);
  return existsSync(p) ? (JSON.parse(readFileSync(p, "utf8")) as SourceDoc) : undefined;
}

export async function fetchSource(url: string, opts: { refresh?: boolean } = {}): Promise<SourceDoc> {
  const cached = opts.refresh ? undefined : readCached(url);
  if (cached) return cached;
  let doc: SourceDoc;
  try {
    const wiki = wikiTitle(url);
    doc = wiki ? await fetchWikipedia(url, wiki.lang, wiki.title) : await fetchHtml(url);
  } catch (e) {
    doc = { url, status: "broken", httpStatus: 0, text: "", error: e instanceof Error ? e.message : String(e), fetchedAt: now() };
  }
  // A rate limit says nothing about the link, so it is not cached; the next run tries again.
  if (doc.httpStatus === 429) return doc;
  mkdirSync(CACHE_DIR, { recursive: true });
  writeFileSync(cachePath(url), JSON.stringify(doc, null, 1));
  return doc;
}

export async function mapPool<T, R>(items: T[], limit: number, fn: (x: T, i: number) => Promise<R>): Promise<R[]> {
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

/** Fetch (or read from cache) every URL. Concurrency stays low to be polite to Wikipedia. */
export async function fetchAll(urls: string[], opts: { refresh?: boolean; concurrency?: number; log?: boolean } = {}): Promise<Map<string, SourceDoc>> {
  const unique = [...new Set(urls)];
  let done = 0;
  const docs = await mapPool(unique, opts.concurrency ?? 4, async (url) => {
    const d = await fetchSource(url, opts);
    done++;
    if (opts.log && (done % 25 === 0 || done === unique.length)) process.stderr.write(`\rsources ${done}/${unique.length}`);
    return d;
  });
  if (opts.log) process.stderr.write("\n");
  return new Map(docs.map((d) => [d.url, d]));
}

if (import.meta.main) {
  const argv = process.argv.slice(2);
  const li = argv.indexOf("--line");
  const refs = stationRefs(li >= 0 ? argv[li + 1] : undefined);
  const urls = refs.flatMap((r) => stationUrls(r.station).map((u) => u.url));
  const docs = await fetchAll(urls, { refresh: argv.includes("--refresh"), log: true });
  const bad = [...docs.values()].filter((d) => d.status !== "ok");
  console.log(`${docs.size} URLs, ${bad.length} not ok`);
  for (const d of bad) console.log(`  ${d.status}\t${d.httpStatus}\t${d.url}\t${d.error ?? ""}`);
  const redirects = [...docs.values()].filter((d) => d.redirectedTo);
  console.log(`${redirects.length} Wikipedia redirects`);
  for (const d of redirects) console.log(`  ${d.url} -> ${d.redirectedTo}`);
}

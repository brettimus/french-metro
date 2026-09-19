import { resolve } from "node:path";
import { parseRoute } from "./routing";
import { getLine } from "./data/lines";

const mimeTypes: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
};

export interface CommitSource {
  readCommit(): string | undefined | Promise<string | undefined>;
}

/**
 * Static file handler with a JSON /healthz endpoint.
 * Valid atlas routes serve the app. Missing files and unknown routes return 404.
 *
 * The HTML references a content-hashed bundle via a placeholder; the
 * handler substitutes the real filename from build.json at request time.
 */
export function createHandler(
  publicDir: string,
  commitSource?: CommitSource,
): (req: Request) => Promise<Response> {
  // Read the tiny manifest per HTML request so a local rebuild never points
  // the page at a removed bundle. Production releases remain immutable.
  const readBundleName = async (): Promise<string> => {
    const meta = (await Bun.file(resolve(publicDir, "build.json")).json()) as {
      bundle?: string;
    };
    if (!meta.bundle || !/^app-[A-Za-z0-9_-]+\.js$/.test(meta.bundle)) {
      throw new Error("build.json is missing or invalid; run: bun run build");
    }
    return meta.bundle;
  };
  return async (req: Request): Promise<Response> => {
    const url = new URL(req.url);
    if (req.method !== "GET" && req.method !== "HEAD") {
      return new Response("Method Not Allowed", { status: 405 });
    }
    if (url.pathname === "/healthz") {
      const commit = commitSource ? await commitSource.readCommit() : undefined;
      const body = JSON.stringify({ status: "ok", commit: commit ?? "dev" });
      return new Response(req.method === "HEAD" ? null : body, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      });
    }
    let pathname: string;
    try {
      pathname = decodeURIComponent(url.pathname);
    } catch {
      return new Response("Bad Request", { status: 400 });
    }
    const route = parseRoute(url.pathname);
    const line = getLine(route.lineId);
    const isAppRoute =
      route.valid &&
      (!route.lineId || !!line) &&
      (!route.stationId ||
        !!line?.stations.some((s) => s.id === route.stationId));
    // Localized page-shaped URLs receive the styled error view with HTTP 404.
    // Missing assets remain plain 404 responses, never browser HTML.
    const isPageRoute =
      isAppRoute || /^\/(?:fr|en)(?:\/[a-zA-Z0-9-]+)*\/?$/.test(pathname);
    const relative = isPageRoute ? "index.html" : pathname.slice(1);
    // Reject absolute or escaped paths; then prove the resolved file stays inside publicDir.
    const abs = resolve(publicDir, relative);
    if (relative.startsWith("/") || !abs.startsWith(publicDir + "/")) {
      return new Response("Not Found", { status: 404 });
    }
    if (isPageRoute || pathname === "/index.html") {
      try {
        const html = await Bun.file(abs).text();
        const bundle = await readBundleName();
        return new Response(
          req.method === "HEAD"
            ? null
            : html
                .replace("/app-HASH.js", `/${bundle}`)
                .replace('lang="fr"', `lang="${route.locale}"`),
          {
            status: isAppRoute || pathname === "/index.html" ? 200 : 404,
            headers: {
              "Content-Type": mimeTypes[".html"] ?? "text/html; charset=utf-8",
              "X-Content-Type-Options": "nosniff",
              "Cache-Control": "no-store",
            },
          },
        );
      } catch (error) {
        console.error("index.html render failed:", error);
        return new Response("Internal Server Error", { status: 500 });
      }
    }
    const file = Bun.file(abs);
    if (!(await file.exists())) {
      return new Response("Not Found", { status: 404 });
    }
    const ext = relative.slice(relative.lastIndexOf("."));
    return new Response(req.method === "HEAD" ? null : file, {
      headers: {
        "Content-Type": mimeTypes[ext] ?? "application/octet-stream",
        "X-Content-Type-Options": "nosniff",
      },
    });
  };
}

import { resolve } from 'node:path';

const mimeTypes: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
};

export interface CommitSource {
  readCommit(): string | undefined | Promise<string | undefined>;
}

/**
 * Static file handler with a JSON /healthz endpoint.
 * Missing files return 404, never the app HTML.
 *
 * The HTML references a content-hashed bundle via a data-src-template; the
 * handler substitutes the real filename from build.json at request time.
 */
export function createHandler(publicDir: string, commitSource?: CommitSource): (req: Request) => Promise<Response> {
  let bundleName: string | undefined;
  const readBundleName = async (): Promise<string> => {
    if (!bundleName) {
      const meta = (await Bun.file(resolve(publicDir, 'build.json')).json()) as { bundle?: string };
      if (!meta.bundle || !/^app-[A-Za-z0-9_-]+\.js$/.test(meta.bundle)) {
        throw new Error('build.json is missing or invalid; run: bun run build');
      }
      bundleName = meta.bundle;
    }
    return bundleName;
  };
  return async (req: Request): Promise<Response> => {
    const url = new URL(req.url);
    if (url.pathname === '/healthz') {
      const commit = commitSource ? await commitSource.readCommit() : undefined;
      const body = JSON.stringify({ status: 'ok', commit: commit ?? 'dev' });
      return new Response(body, {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      });
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return new Response('Method Not Allowed', { status: 405 });
    }
    const relative = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname).slice(1);
    // Reject absolute or escaped paths; then prove the resolved file stays inside publicDir.
    const abs = resolve(publicDir, relative);
    if (relative.startsWith('/') || !abs.startsWith(publicDir + '/')) {
      return new Response('Not Found', { status: 404 });
    }
    if (abs.endsWith('index.html')) {
      try {
        const html = await Bun.file(abs).text();
        const bundle = await readBundleName();
        return new Response(html.replace('/app-HASH.js', `/${bundle}`), {
          headers: {
            'Content-Type': mimeTypes['.html'] ?? 'text/html; charset=utf-8',
            'X-Content-Type-Options': 'nosniff',
            'Cache-Control': 'no-store',
          },
        });
      } catch (error) {
        console.error('index.html render failed:', error);
        return new Response('Internal Server Error', { status: 500 });
      }
    }
    const file = Bun.file(abs);
    if (!(await file.exists())) {
      return new Response('Not Found', { status: 404 });
    }
    const ext = relative.slice(relative.lastIndexOf('.'));
    return new Response(req.method === 'HEAD' ? null : file, {
      headers: {
        'Content-Type': mimeTypes[ext] ?? 'application/octet-stream',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  };
}

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
 */
export function createHandler(publicDir: string, commitSource?: CommitSource): (req: Request) => Promise<Response> {
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

import { describe, expect, test } from 'bun:test';
import { mkdtemp, writeFile, mkdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHandler } from '../src/handler';
import { parsePort } from '../src/config';

describe('parsePort', () => {
  test('defaults to 3000', () => {
    expect(parsePort(undefined)).toBe(3000);
    expect(parsePort('')).toBe(3000);
  });
  test('parses valid ports', () => {
    expect(parsePort('8080')).toBe(8080);
  });
  test('rejects invalid ports', () => {
    expect(() => parsePort('abc')).toThrow();
    expect(() => parsePort('0')).toThrow();
    expect(() => parsePort('70000')).toThrow();
    expect(() => parsePort('3.5')).toThrow();
  });
});

describe('createHandler', () => {
  const commitSource = { readCommit: async () => 'a'.repeat(40) };
  let dir = '';

  async function setup(): Promise<ReturnType<typeof createHandler>> {
    dir = await mkdtemp(join(tmpdir(), 'french-metro-'));
    await writeFile(join(dir, 'index.html'), '<html>hello</html>');
    await writeFile(join(dir, 'app.js'), 'console.log(1)');
    await mkdir(join(dir, 'sub'));
    await writeFile(join(dir, 'sub', 'note.txt'), 'hi');
    return createHandler(dir, commitSource);
  }

  test('serves index.html at /', async () => {
    const handler = await setup();
    const res = await handler(new Request('http://localhost/'));
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toBe('text/html; charset=utf-8');
    expect(await res.text()).toBe('<html>hello</html>');
  });

  test('serves assets with MIME types', async () => {
    const handler = await setup();
    const res = await handler(new Request('http://localhost/app.js'));
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toBe('text/javascript; charset=utf-8');
    expect(res.headers.get('X-Content-Type-Options')).toBe('nosniff');
  });

  test('serves nested files', async () => {
    const handler = await setup();
    const res = await handler(new Request('http://localhost/sub/note.txt'));
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('hi');
  });

  test('404 for missing files, not HTML fallback', async () => {
    const handler = await setup();
    const res = await handler(new Request('http://localhost/nope.html'));
    expect(res.status).toBe(404);
  });

  test('rejects path traversal', async () => {
    const handler = await setup();
    for (const path of ['http://localhost/..%2F..%2Fetc%2Fpasswd', 'http://localhost/../../etc/passwd', 'http://localhost/%2e%2e/etc/passwd']) {
      const res = await handler(new Request(path));
      expect(res.status, path).toBe(404);
    }
    // `//etc/passwd` survives URL parsing as a host; handler must still not resolve it.
    const res = await handler(new Request('http://localhost///etc/passwd'));
    expect(res.status).toBe(404);
  });

  test('healthz returns JSON commit with no-store', async () => {
    const handler = await setup();
    const res = await handler(new Request('http://localhost/healthz'));
    expect(res.status).toBe(200);
    expect(res.headers.get('Cache-Control')).toBe('no-store');
    const body = (await res.json()) as { status: string; commit: string };
    expect(body.status).toBe('ok');
    expect(body.commit).toBe('a'.repeat(40));
  });

  test('rejects non-GET methods', async () => {
    const handler = await setup();
    const res = await handler(new Request('http://localhost/', { method: 'POST' }));
    expect(res.status).toBe(405);
  });

  test('cleanup: removes temp dir', async () => {
    await rm(dir, { recursive: true, force: true });
  });
});

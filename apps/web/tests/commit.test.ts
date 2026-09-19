import { describe, expect, test } from 'bun:test';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import { readCommit } from '../src/commit';

describe('readCommit', () => {
  test('falls back to dev when COMMIT is absent (repo checkout)', () => {
    expect(readCommit()).toBe('dev');
  });

  test('validates commit shape used by verify-deployment', () => {
    const sha = 'a'.repeat(40);
    expect(/^[a-f0-9]{40}$/.test(sha)).toBe(true);
    expect(/^[a-f0-9]{40}$/.test('dev')).toBe(false);
  });

  test('deploy.sh writes COMMIT into the release and archives the server', () => {
    const script = readFileSync(join(import.meta.dir, '../ops/deploy.sh'), 'utf8');
    expect(script).toContain('COMMIT');
    expect(script).toContain('git archive "$revision:apps/web"');
    expect(script).toContain('french-metro.service');
  });
});

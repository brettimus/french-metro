import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Read the deployed commit from the COMMIT file written next to the release
 * root by deploy.sh. Falls back to 'dev' outside deployments.
 */
export function readCommit(): string {
  // import.meta.dir is apps/web/src -> COMMIT lives at apps/web/COMMIT
  try {
    const commit = readFileSync(join(import.meta.dir, '../COMMIT'), 'utf8').trim();
    return /^[a-f0-9]{40}$/.test(commit) ? commit : 'dev';
  } catch {
    return 'dev';
  }
}

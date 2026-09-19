import { resolve } from 'node:path';
import { parsePort } from './config';
import { createHandler } from './handler';

const server = Bun.serve({
  hostname: '0.0.0.0',
  port: parsePort(process.env.PORT),
  fetch: createHandler(resolve(import.meta.dir, '../public')),
});

console.info(`French Metro listening on ${server.url}`);

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => {
    server.stop(true);
    process.exit(0);
  });
}

/**
 * Build the browser bundle from src/app.ts into public/.
 * Usage: bun run build  (from apps/web)
 */
import { rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

const outDir = join(import.meta.dir, "..", "public");
const built = await Bun.build({
  entrypoints: [join(import.meta.dir, "../src/app.ts")],
  outdir: outDir,
  naming: "[name]-[hash].[ext]",
  minify: true,
});

if (!built.success) {
  console.error("Build failed:", built.logs);
  process.exit(1);
}

// Remove stale hashed bundles from previous builds so public/ holds exactly
// one bundle plus the source-linked assets.
for (const file of built.outputs) {
  console.log(`built ${file.path}`);
}
const fresh = new Set(built.outputs.map((o) => o.path.split("/").pop()));
const { readdir, unlink } = await import("node:fs/promises");
for (const name of await readdir(outDir)) {
  if (/^app-.*\.js$/.test(name) && !fresh.has(name)) {
    await unlink(join(outDir, name));
    console.log(`removed stale ${name}`);
  }
}

// Record the bundle filename so index.html stays in sync.
const bundleName = fresh.values().next().value as string;
await rm(join(outDir, "app.js"), { force: true });
await writeFile(
  join(outDir, "build.json"),
  JSON.stringify({ bundle: bundleName }, null, 2) + "\n",
);
console.log(`bundle: ${bundleName}`);

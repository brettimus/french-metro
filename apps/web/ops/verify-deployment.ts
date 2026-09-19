/**
 * Verify a public deployment without changing anything.
 * Usage: bun apps/web/ops/verify-deployment.ts https://french-metro.exe.xyz <full-commit>
 */
const base = process.argv[2];
const commit = process.argv[3];
if (!base || !commit || !/^[a-f0-9]{40}$/.test(commit)) {
  console.error('Usage: bun verify-deployment.ts <base-url> <full-commit>');
  process.exit(2);
}

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

const health = await fetch(`${base}/healthz`, { redirect: 'error', signal: AbortSignal.timeout(10_000) });
if (!health.ok) fail(`/healthz failed with ${health.status}. If this is an exe.dev login redirect, run: ssh exe.dev share set-public french-metro`);
const body = (await health.json()) as { status?: string; commit?: string };
if (body.status !== 'ok' || body.commit !== commit) {
  fail(`Health mismatch: expected commit ${commit}, got ${JSON.stringify(body)}`);
}

const page = await fetch(base, { redirect: 'error', signal: AbortSignal.timeout(10_000) });
const html = await page.text();
if (!page.ok) fail(`App page failed with ${page.status}`);
if (!/<title>French Metro<\/title>/.test(html)) fail('App page does not look like French Metro');
const asset = html.match(/src="(\/app-[A-Za-z0-9_-]+\.js)"/)?.[1];
if (!asset) fail('No app bundle found in app page');
if (asset.includes('app-HASH')) fail('Bundle substitution failed: template placeholder still present');
const assetRes = await fetch(`${base}${asset}`, { redirect: 'error', signal: AbortSignal.timeout(10_000) });
if (!assetRes.ok) fail(`Asset ${asset} failed with ${assetRes.status}`);
if (!assetRes.headers.get('content-type')?.includes('javascript')) fail('Browser bundle has the wrong content type');
if (!html.includes('id="map"')) fail('Station map container missing');

console.log(`Verified ${base} at commit ${commit}`);

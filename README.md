# French Metro

An illustrated history atlas for Paris Métro Lines 4, 5, 7 and 14, in French and English.

Explore **https://french-metro.exe.xyz/**. Line 4 has 29 entries, Line 5 has 22, Line 7 has 38, and Line 14 has 21. This includes Les Gobelins, Oberkampf, and both southern branches of Line 7. Each entry explains the station name, adds a short history, and links its sources.

The home page offers all four lines and marks future lines as coming soon. Maps have hover previews, animated station panels, search, keyboard navigation, and reading progress stored in the browser. Each line and station has a direct URL. The language switch preserves the current station.

- French home: `/fr`; English home: `/en`.
- Line: `/{locale}/lines/{line}`.
- Station: `/{locale}/lines/{line}/stations/{station-id}`.
- Old Line 14 links in the form `/#station-id` remain supported.

To add a line, use the shared contract in `apps/web/src/data/types.ts`, register its module in `data/lines.ts`, and add its ID to `lineIds` in `data/types.ts`. Route paths define branch connections. Historical audits are in `docs/research/`. Editorial panels and UI/code reviews are in `docs/reviews/`. The release plan is `docs/four-line-plan.md`; generated artwork and exact prompts are in `docs/design/`.

## Purpose

The point of this project is deliberately modest: **a small web app, served
publicly from a VM we control, with boring, auditable deployment plumbing.**

Concretely:

1. **Capture the deployment scheme.** A boring, auditable pattern:
   - Bun 1.3.14 everywhere, pinned.
   - `git archive` of an allowlisted path set (never the whole checkout, never
     secrets) shipped over SSH.
   - Immutable releases under `/home/exedev/<app>/releases/<revision>` with a
     `current` symlink switched atomically (`ln -sfn` + `mv -Tf`).
   - A hardened systemd unit running as `exedev` (read-only home, private tmp,
     no new privileges).
   - A local health check after restart with automatic rollback to the
     previous release on failure.
   - A final public HTTPS verification from the local machine, plus
     `ssh exe.dev share set-public <name>` to make the proxy public.
2. **Provision the VM.** One command creates the VM; one script bootstraps it.
   No credentials, SSH keys, or `.env` files ever cross the wire.
3. **Serve a small web app.** A dependency-free Bun static server with a JSON
   `/healthz` endpoint exposing the deployed commit.

## Layout

```
apps/web            Bun static server + public assets + tests
apps/web/ops        bootstrap, deploy, verify, systemd unit
docs/               outline, deployment guide
```

## Quick start

```sh
bun install
bun run --cwd apps/web build # rebuild the browser bundle after frontend changes
bun run dev                 # local dev server on :3000
bun test && bun run typecheck
```

## Deploy

See [docs/deployment.md](docs/deployment.md). Short version:

```sh
# one-time provisioning (creates the VM):
ssh exe.dev new --name=french-metro --cpu=1 --memory=2GB --disk=10GB --no-email --json
ssh french-metro.exe.xyz bash -s < apps/web/ops/bootstrap-vm.sh
ssh exe.dev share port french-metro 3000
ssh exe.dev share set-public french-metro

# every release (commit first; the script refuses a dirty tree):
bun run deploy
```

## Health

- App: https://french-metro.exe.xyz/
- Health: https://french-metro.exe.xyz/healthz (JSON, includes commit)

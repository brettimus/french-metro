# Deployment guide

## Live service (after first deploy)

- App: https://french-metro.exe.xyz/
- Health: https://french-metro.exe.xyz/healthz — `{"status":"ok","commit":"<sha>"}`
- SSH: `ssh french-metro.exe.xyz`
- VM: 1 CPU, 2 GB RAM, 10 GB disk (exe.dev minimum is 2 GB).
- Runtime: Bun 1.3.14, one systemd process, no external services.

## Deployment scheme

1. Commit everything. `deploy.sh` refuses a dirty tree and builds the browser
   bundle before archiving.
2. Build the browser bundle with `bun run build` (hashed `app-<hash>.js`
   written to `public/`, with `build.json` recording the filename).
3. `git archive` an explicit allowlist (`src`, `public`, `ops`, `package.json`
   within `apps/web`) for the given revision. The server has zero runtime
   dependencies, so no lockfile ships. No secrets, docs, tests, or untracked
   files are included.
4. Extract to a staging directory, then move it to
   `/home/exedev/french-metro/releases/<revision>` on the VM.
5. Switch the `current` symlink atomically (`ln -sfn` + `mv -Tf`).
6. Install the hardened systemd unit, restart, and poll
   `127.0.0.1:3000/healthz` for up to ~90 s (30 attempts).
7. On failure: restore the previous `current` link (and its systemd unit) and
   restart the old release.
8. From the local machine, verify public HTTPS and the reported commit.

## One-time provisioning (already complete)

Do not repeat VM creation for updates. Recorded here for rebuilding:

```sh
ssh exe.dev new --name=french-metro --cpu=1 --memory=2GB --disk=10GB --no-email --json
# Use the SSH hostname returned by that command.
ssh french-metro.exe.xyz bash -s < apps/web/ops/bootstrap-vm.sh
ssh exe.dev share port french-metro 3000
ssh exe.dev share set-public french-metro
```

`bootstrap-vm.sh` installs Bun 1.3.14 and creates
`/home/exedev/french-metro/{releases,shared}` as the `exedev` user. It creates
no VMs and transfers no credentials. Deployment requires passwordless `sudo`
for `exedev` (systemd unit install and service control); on exe.dev VMs this
is the default. If public URLs return an exe.dev login
redirect, re-run `ssh exe.dev share set-public french-metro`.

### First deploy vs update

The first deploy creates the `current` symlink, installs the unit, and starts
the service from scratch. If the first deploy fails its health check, the
script stops the service and removes `current` rather than rolling back.
Every later deploy switches the symlink atomically and, on failure, restores
the previous release (including its systemd unit) and restarts it.

## Deploying a release

From the repo root:

```sh
bun install --frozen-lockfile
bun test && bun run typecheck
git status   # must be clean
bun run deploy            # deploys HEAD
# or: bash apps/web/ops/deploy.sh french-metro.exe.xyz <revision>
```

The script prints the deployed revision and verifies the public
`/healthz` commit matches. Old releases are kept for rollback. Prune
everything except the active and one previous release with:

```sh
ssh french-metro.exe.xyz 'cd /home/exedev/french-metro/releases && \
  keep=$(readlink ../current | xargs basename); prev=$(readlink ../previous 2>/dev/null | xargs basename || true); \
  for d in */; do d=${d%/}; [[ "$d" == "$keep" || "$d" == "$prev" ]] || rm -rf "$d"; done'
```

## Status, logs, restart

```sh
curl --fail https://french-metro.exe.xyz/healthz
ssh french-metro.exe.xyz 'systemctl status french-metro --no-pager'
ssh french-metro.exe.xyz 'journalctl -u french-metro -n 100 --no-pager'
ssh french-metro.exe.xyz 'sudo systemctl restart french-metro'
```

The service binds `0.0.0.0:3000`, restarts always (even after a manual
`kill`), and drains in-flight requests on SIGTERM before systemd's 30 s stop
timeout. A normal `systemctl stop` leaves it stopped.

## Rollback

```sh
ssh french-metro.exe.xyz \
  'ln -sfn /home/exedev/french-metro/releases/<previous-revision> /home/exedev/french-metro/current && sudo systemctl restart french-metro'
```

Then verify the public `/healthz` reports the expected commit.

## Paths on the VM

- `/home/exedev/french-metro/releases/<revision>` — immutable releases.
- `/home/exedev/french-metro/current` — symlink to the active release.
- `/home/exedev/french-metro/shared/` — persistent state, outside the code dir
  (empty today; reserved for future data so releases stay immutable).

## Verification without deploying

```sh
bun apps/web/ops/verify-deployment.ts https://french-metro.exe.xyz "$(git rev-parse HEAD)"
```

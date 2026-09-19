# Deployment guide

## Live service (after first deploy)

- App: https://french-metro.exe.xyz/
- Health: https://french-metro.exe.xyz/healthz — `{"status":"ok","commit":"<sha>"}`
- SSH: `ssh french-metro.exe.xyz`
- VM: 1 CPU, 2 GB RAM, 10 GB disk (exe.dev minimum is 2 GB).
- Runtime: Bun 1.3.14, one systemd process, no external services.

## Deployment scheme

1. Commit everything. `deploy.sh` refuses a dirty tree.
2. `git archive` an explicit allowlist (`apps/web/src`, `apps/web/public`,
   `apps/web/ops`, `apps/web/package.json`, root `bun.lock`) for the given
   revision. No secrets, docs, tests, or untracked files ship.
3. Extract to `/home/exedev/french-metro/releases/<revision>` on the VM.
4. Switch the `current` symlink atomically (`ln -sfn` + `mv -Tf`).
5. Install the hardened systemd unit, restart, and poll
   `127.0.0.1:3000/healthz` for up to 30 s.
6. On failure: restore the previous `current` link and restart the old release.
7. From the local machine, verify public HTTPS and the reported commit.

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
no VMs and transfers no credentials. If public URLs return an exe.dev login
redirect, re-run `ssh exe.dev share set-public french-metro`.

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
`/healthz` commit matches. Releases accumulate under `releases/`; old ones are
kept for rollback and can be pruned once nothing references them.

## Status, logs, restart

```sh
curl --fail https://french-metro.exe.xyz/healthz
ssh french-metro.exe.xyz 'systemctl status french-metro --no-pager'
ssh french-metro.exe.xyz 'journalctl -u french-metro -n 100 --no-pager'
ssh french-metro.exe.xyz 'sudo systemctl restart french-metro'
```

The service binds `0.0.0.0:3000`, restarts on failure, and drains on SIGTERM.
A normal `systemctl stop` leaves it stopped.

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

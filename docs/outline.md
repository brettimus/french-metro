# Project outline

## What this is

`french-metro` is a **deployment-plumbing-first** monorepo. The application is
intentionally small so that the deployment scheme — not the app — is the thing
under test. Once the plumbing is proven, real features can be added to
`apps/web` without touching ops.

## Goal

Serve a small web app on an exe.dev VM at `https://french-metro.exe.xyz`,
deployable in one command from a clean checkout, with rollback on failure.

## Non-goals

- No database, background workers, or AI services in this slice.
- No CI system; checks run locally before deploy, exactly like the inspo repos.
- No Docker in production (systemd is the tested launch method).

## Milestones

1. **Monorepo scaffold** — Bun workspaces, pinned Bun 1.3.14, base tsconfig. ✅
2. **Web app** — static server, `/healthz`, unit tests, typecheck. ✅
3. **Purpose + outline docs** — this file and the README. ✅
4. **Ops plumbing** — `bootstrap-vm.sh`, `deploy.sh`, `verify-deployment.ts`,
   systemd unit, modeled on the inspo repos. ✅
5. **VM provisioning** — create `french-metro.exe.xyz` (1 CPU / 2 GB / 10 GB,
   exe.dev minimum is 2 GB), bootstrap, share port 3000, set public. ✅
6. **First deployment** — committed revision deployed, health checked locally
   and publicly. ✅
7. **Review** — independent subagent review of scripts and docs; fix findings. ⏳

## Sources of truth (inspo repos)

| Repo | What we took |
| --- | --- |
| `ow` | monorepo shape (apps/ + packages/), pinned-Bun gate, provisioning script style |
| `quantization/apps/inference-practice` | git-archive deploy, releases + `current` symlink, systemd hardening, health-check rollback, VM bootstrap + share commands |
| `bodhi-and-ozzy` | dirty-tree refusal, deploy lock, restart-twice health proof, public verify script, rollback script |

## Success criteria

- [x] `bun run dev` serves the app locally.
- [x] `bun test` and `bun run typecheck` pass.
- [x] VM exists and is reachable over SSH.
- [x] Public HTTPS serves the app and `/healthz` with no login redirect.
- [x] A committed revision deploys with one command and reports its commit.
- [x] A failing health check rolls back to the previous release.

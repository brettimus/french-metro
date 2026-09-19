#!/usr/bin/env bash
# Run on the new exe.dev VM as exedev. Does not create a VM or change sharing.
set -euo pipefail
[[ "$(id -un)" == exedev ]] || { echo 'Run as exedev.' >&2; exit 2; }
base=/home/exedev/french-metro
mkdir -p "$base/releases" "$base/shared"
chmod 700 "$base/shared"
if [[ ! -x /home/exedev/.bun/bin/bun ]] || [[ "$(/home/exedev/.bun/bin/bun --version)" != 1.3.14 ]]; then
  curl --fail --silent --show-error --location --proto '=https' --tlsv1.2 https://bun.sh/install | bash -s -- bun-v1.3.14
fi
[[ "$(/home/exedev/.bun/bin/bun --version)" == 1.3.14 ]]
echo 'Bun 1.3.14 and persistent directories are ready.'

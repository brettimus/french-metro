#!/usr/bin/env bash
# Run locally: apps/web/ops/deploy.sh french-metro.exe.xyz [committed-revision]
# This script never creates a VM and never transfers credentials.
set -euo pipefail
host=${1:?Supply the exe.dev SSH hostname}
[[ "$host" =~ ^[a-zA-Z0-9][a-zA-Z0-9.-]*\.exe\.xyz$ ]] || { echo 'Invalid exe.dev hostname.' >&2; exit 2; }
root=$(git -C "$(dirname "$0")/../../.." rev-parse --show-toplevel)
cd "$root"
if ! git diff --quiet || ! git diff --cached --quiet || [[ -n "$(git ls-files --others --exclude-standard)" ]]; then
  echo 'Commit all source changes before deployment.' >&2
  exit 1
fi
revision=$(git rev-parse --verify "${2:-HEAD}^{commit}")
echo "Deploying $revision to $host"
archive=$(mktemp)
trap 'rm -f "$archive"' EXIT
git archive "$revision:apps/web" src public ops package.json > "$archive"
ssh "$host" "mkdir -p /home/exedev/french-metro/releases/$revision"
ssh "$host" "tar -xf - -C /home/exedev/french-metro/releases/$revision" < "$archive"
ssh "$host" "printf '%s' '$revision' > /home/exedev/french-metro/releases/$revision/COMMIT"
ssh "$host" bash -s -- "$revision" <<'REMOTE'
set -euo pipefail
revision=$1
base=/home/exedev/french-metro
release=$base/releases/$revision
bun_bin=/home/exedev/.bun/bin/bun
[[ "$(id -un)" == exedev ]] || { echo 'Run as exedev.' >&2; exit 2; }
[[ "$("$bun_bin" --version)" == 1.3.14 ]] || { echo "Expected Bun 1.3.14 on the VM, got $("$bun_bin" --version)." >&2; exit 2; }
[[ -f "$release/package.json" ]] || { echo 'Release archive is incomplete.' >&2; exit 2; }
# A lock prevents simultaneous deployments from switching each other's release.
exec 9>"$base/deploy.lock"
flock -n 9 || { echo 'A deployment is already in progress.' >&2; exit 1; }
previous=$(readlink "$base/current" || true)
ln -sfn "$release" "$base/current.next"
mv -Tf "$base/current.next" "$base/current"
[[ "$(readlink "$base/current")" == "$release" ]] || { echo 'current does not point at the new release.' >&2; exit 1; }
switched=true
restore_previous() {
  if [[ -n "$previous" ]]; then
    ln -sfn "$previous" "$base/current.previous"
    mv -Tf "$base/current.previous" "$base/current"
    sudo systemctl restart french-metro || true
    echo "Release failed. Restored $previous. Check service health." >&2
  else
    sudo systemctl stop french-metro || true
    rm -f "$base/current"
    echo 'First release failed. Service stopped.' >&2
  fi
}
sudo install -m 644 "$release/ops/french-metro.service" /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable french-metro.service
check_health() {
  for attempt in {1..30}; do
    if curl --noproxy '*' --fail --silent --max-time 2 http://127.0.0.1:3000/healthz 2>/dev/null |
      "$bun_bin" -e 'try { const x = JSON.parse(await Bun.stdin.text()); if (x.status !== "ok" || x.commit !== process.argv[1]) process.exit(1); } catch { process.exit(1); }' "$revision"; then
      sudo systemctl is-active --quiet french-metro.service && return 0
    fi
    sleep 1
  done
  sudo journalctl -u french-metro.service -n 30 --no-pager >&2
  return 1
}
cleanup() {
  result=$?
  rm -f "$base/current.next" "$base/current.previous"
  if [[ "$result" -ne 0 && "${switched:-}" == true ]]; then
    restore_previous
  fi
  exit "$result"
}
trap cleanup EXIT
sudo systemctl restart french-metro.service
check_health
# Prove that systemd can start the release again, not only on first activation.
sudo systemctl restart french-metro.service
check_health
printf 'Service active: %s\n' "$revision"
REMOTE
curl --fail --silent --show-error --max-time 20 "https://$host/healthz"
echo
bun "$root/apps/web/ops/verify-deployment.ts" "https://$host" "$revision"
printf 'Deployed %s\nPublic app: https://%s\n' "$revision" "$host"

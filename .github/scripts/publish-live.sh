#!/usr/bin/env bash
# Publish session-a to main (= live) in one checked step.
#
# Why this exists: pushes to main kept going wrong in four ways -- a build
# stamp that was never bumped (the Update button then offers nothing), a
# stamp set in the future (the app refuses to offer any build older than
# the live one), an unreviewed commit riding along to the phone, and a push
# that was rejected halfway. This script does the whole sequence the same
# way every time and refuses to go on if a check fails.
#
# Usage (from the repo root):
#   .github/scripts/publish-live.sh          dry run: shows what would go live
#   .github/scripts/publish-live.sh --yes    bump, commit, push, verify
#
# Run the --yes form only after she says "push live". Never force-pushes.

set -euo pipefail
cd "$(dirname "$0")/../.."

SITE="https://b00k33.github.io/lcm-pharmacy/"
YES=0
[ "${1:-}" = "--yes" ] && YES=1

fail() { echo "STOP: $*" >&2; exit 1; }

# 1. Tracked files must be clean: nothing half-edited, nothing staged.
if ! git diff --quiet || ! git diff --cached --quiet; then
  git status --short -uno
  fail "tracked changes present. Commit or discard them first."
fi

git fetch -q origin main session-a

# 2. The stamp the phone currently runs (what main serves right now).
served=$(git show origin/main:index.html | grep -o '<meta name="lcm-build" content="[^"]*">' | head -1 | sed 's/.*content="//;s/">$//')
[ -n "$served" ] || fail "could not read the live build stamp from origin/main"

# 3. New stamp: Sydney clock, same format as every earlier build.
now=$(TZ=Australia/Sydney date +%Y%m%d-%H%M00)
# The app never offers a build that is not later than the running one.
# If the live stamp is already ahead of the clock, step just past it so the
# update is still offered. (Currently true: the live stamp is 20261010.)
if [ "$now" \> "$served" ]; then
  new="$now"
else
  new=$(TZ=Australia/Sydney date -d "@$(( $(TZ=Australia/Sydney date -d "${served:0:4}-${served:4:2}-${served:6:2} ${served:9:2}:${served:11:2}:00" +%s) + 60 ))" +%Y%m%d-%H%M00)
fi

# 4. What would go live: every commit on session-a that main lacks.
echo "Live now:        $served"
echo "Will publish:    $new"
echo "Commits going live (session-a not yet on main):"
git log --oneline origin/main..session-a | sed 's/^/   /'
count=$(git rev-list --count origin/main..session-a)
[ "$count" -gt 0 ] || echo "   (none: session-a is already on main, only the stamp will change)"

if [ "$YES" -ne 1 ]; then
  echo ""
  echo "Dry run. Nothing changed. Re-run with --yes after she says \"push live\"."
  exit 0
fi

# 5. Bump both markers to the same stamp, exactly one line each.
[ "$(grep -c '<meta name="lcm-build" content="[^"]*">' index.html)" = "1" ] || fail "index.html must have exactly one lcm-build meta line"
[ "$(grep -c 'var CACHE_VERSION = "[^"]*";' sw.js)" = "1" ] || fail "sw.js must have exactly one CACHE_VERSION line"
sed -i "s|<meta name=\"lcm-build\" content=\"[^\"]*\">|<meta name=\"lcm-build\" content=\"$new\">|" index.html
sed -i "s|var CACHE_VERSION = \"[^\"]*\";|var CACHE_VERSION = \"lcm-$new\";|" sw.js
grep -q "content=\"$new\"" index.html || fail "index.html stamp did not update"
grep -q "CACHE_VERSION = \"lcm-$new\"" sw.js || fail "sw.js stamp did not update"

# 6. Commit only these two files, then push as a fast-forward.
git add index.html sw.js
git commit -q -m "Publish build $new" -m "Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
git push origin session-a:main || fail "push to main was rejected (main moved on). Nothing forced. Investigate before retrying."

# 7. Confirm the phone can actually see it. Pages takes a few minutes.
echo "Pushed. Waiting for $SITE to serve $new ..."
for i in $(seq 1 30); do
  seen=$(curl -s -m 20 "$SITE" | grep -o '<meta name="lcm-build" content="[^"]*">' | head -1 | sed 's/.*content="//;s/">$//' || true)
  if [ "$seen" = "$new" ]; then
    echo "LIVE: $SITE serves $new"
    exit 0
  fi
  sleep 30
done
fail "pushed, but $SITE still serves '$seen' after 15 minutes. Check the Pages run in GitHub Actions."

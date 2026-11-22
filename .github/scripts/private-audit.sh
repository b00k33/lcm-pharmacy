#!/usr/bin/env bash
# Private-details check for this PUBLIC repo (her 2026-11-22: "keep private info local and erase any public info").
#
# The terms it looks for are NOT in this repo: they live in a local file on her computer, outside every repo
# (the Claude memory folder: private-terms.txt, one extended regex per line). This script only knows where to look.
# Without that file (another computer, CI) the check says so and passes: it never blocks on a missing list.
#
# Usage (repo root):   .github/scripts/private-audit.sh [rev]     rev defaults to session-a; exit 1 = a term is in a tracked file at rev
# Override the list:   LCM_PRIVATE_TERMS=/path/to/terms.txt .github/scripts/private-audit.sh
# publish-live.sh runs it on the commit it is about to publish and stops on a hit.
set -uo pipefail
cd "$(dirname "$0")/../.."
REV="${1:-session-a}"
TERMS="${LCM_PRIVATE_TERMS:-}"
if [ -z "$TERMS" ]; then
  for f in "$HOME"/.claude/projects/*/memory/private-terms.txt; do [ -f "$f" ] && { TERMS="$f"; break; }; done
fi
if [ -z "$TERMS" ] || [ ! -f "$TERMS" ]; then
  echo "NOTE: no private-terms file found; the private-details check was skipped." >&2
  exit 0
fi
clean="$(mktemp)"; trap 'rm -f "$clean"' EXIT
grep -v -e '^[[:space:]]*$' -e '^[[:space:]]*#' "$TERMS" > "$clean"
[ -s "$clean" ] || { echo "NOTE: the private-terms file is empty; nothing to check." >&2; exit 0; }
hits=$(git grep -I -i -n -E -f "$clean" "$REV" -- . ':!*.mp4' ':!shots' 2>/dev/null | cut -c1-220)
if [ -n "$hits" ]; then
  echo "STOP: private terms are in $REV (the list is local and is never printed here; lines found):" >&2
  printf '%s\n' "$hits" | head -40 >&2
  exit 1
fi
echo "private-audit: clean ($REV)"

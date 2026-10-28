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
# The publish commit never reads the working copy. Several sessions edit
# index.html in this same tree at once; on 2026-10-28 a `git add index.html`
# here swept another session's unfinished build live (136b4716). Now the
# commit is session-a's committed files with the two stamp lines changed and
# nothing else, checked before it is made; the working copy only gets the two
# stamp values written in place, so open edits in it stay local.
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
note() { echo "NOTE: $*" >&2; }

# 1. Run in the shared checkout on session-a, with nothing staged (staged
#    hunks mean a session is between `git apply --cached` and `git commit`).
#    Open edits in the working copy are fine: they are never published.
[ "$(git symbolic-ref -q HEAD || true)" = "refs/heads/session-a" ] || fail "HEAD is not session-a here. Run it from the shared lcm-pharmacy-app checkout."
if ! git diff --cached --quiet; then
  git status --short -uno
  fail "something is staged (another session is mid-commit). Let it commit, then re-run."
fi

git fetch -q origin main session-a

# 2. The stamp the phone currently runs (what main serves right now).
served=$(git show origin/main:index.html | grep -o '<meta name="lcm-build" content="[^"]*">' | head -1 | sed 's/.*content="//;s/">$//')
[ -n "$served" ] || fail "could not read the live build stamp from origin/main"

# 3. New stamp: Sydney clock, same format as every earlier build. Git Bash
#    has no zoneinfo, so TZ=Australia/Sydney silently meant UTC; the POSIX
#    rule below needs none (AEDT from the first Sunday in October to the
#    first Sunday in April).
SYD='AEST-10AEDT,M10.1.0,M4.1.0/3'
now=$(TZ=$SYD date +%Y%m%d-%H%M00)
# The app never offers a build that is not later than the running one.
# If the live stamp is already ahead of the clock, step just past it so the
# update is still offered. (Currently true: the live stamp is 20261010.)
if [ "$now" \> "$served" ]; then
  new="$now"
else
  new=$(TZ=$SYD date -d "@$(( $(TZ=$SYD date -d "${served:0:4}-${served:4:2}-${served:6:2} ${served:9:2}:${served:11:2}:00" +%s) + 60 ))" +%Y%m%d-%H%M00)
fi
SED_HTML="s|<meta name=\"lcm-build\" content=\"[^\"]*\">|<meta name=\"lcm-build\" content=\"$new\">|"
SED_SW="s|var CACHE_VERSION = \"[^\"]*\";|var CACHE_VERSION = \"lcm-$new\";|"

# 4. What would go live: session-a as committed now (read once, after the
#    slow fetch). Everything below is built from this one commit, not HEAD,
#    which other sessions may move while this runs.
base=$(git rev-parse --verify "refs/heads/session-a^{commit}")
echo "Live now:        $served"
echo "Will publish:    $new"
echo "Commits going live (session-a not yet on main):"
git log --oneline "origin/main..$base" | sed 's/^/   /'
count=$(git rev-list --count "origin/main..$base")
[ "$count" -gt 0 ] || echo "   (none: session-a is already on main, only the stamp will change)"

# 5. The two stamp lines, exactly one each, read from the base commit.
[ "$(git cat-file blob "$base:index.html" | grep -c '<meta name="lcm-build" content="[^"]*">' || true)" = "1" ] || fail "index.html must have exactly one lcm-build meta line"
[ "$(git cat-file blob "$base:sw.js" | grep -c 'var CACHE_VERSION = "[^"]*";' || true)" = "1" ] || fail "sw.js must have exactly one CACHE_VERSION line"
html_old=$(git cat-file blob "$base:index.html" | grep '<meta name="lcm-build" content="[^"]*">')
sw_old=$(git cat-file blob "$base:sw.js" | grep 'var CACHE_VERSION = "[^"]*";')
html_new=$(printf '%s\n' "$html_old" | sed "$SED_HTML")
sw_new=$(printf '%s\n' "$sw_old" | sed "$SED_SW")
html_old_val=$(printf '%s\n' "$html_old" | grep -o '<meta name="lcm-build" content="[^"]*">' | sed 's/.*content="//;s/">$//')
sw_old_val=$(printf '%s\n' "$sw_old" | grep -o 'var CACHE_VERSION = "[^"]*";' | sed 's/.*= "//;s/";$//')
[ "$html_old_val" != "$new" ] || fail "session-a already carries stamp $new (a publish commit that never reached main?). Investigate before retrying."
[ "$html_new" = "${html_old/"$html_old_val"/$new}" ] && [ "$sw_new" = "${sw_old/"$sw_old_val"/lcm-$new}" ] || fail "the sed would change more than the stamp value"
echo "The publish commit changes these two lines and nothing else:"
echo "   index.html  $html_old_val -> $new"
echo "   sw.js       $sw_old_val -> lcm-$new"
open_edits=$(git --no-optional-locks status --short -uno)
if [ -n "$open_edits" ]; then
  echo "Open edits in the working copy (stay local, not published):"
  printf '%s\n' "$open_edits" | sed 's/^/   /'
fi

if [ "$YES" -ne 1 ]; then
  echo ""
  echo "Dry run. Nothing changed. Re-run with --yes after she says \"push live\"."
  exit 0
fi

# 6. Build both new files from the base commit's blobs through the same sed,
#    and stage them in a private index (the shared one belongs to every
#    session). The working copy is not read.
html_blob=$(git cat-file blob "$base:index.html" | sed "$SED_HTML" | git hash-object -w --stdin)
sw_blob=$(git cat-file blob "$base:sw.js" | sed "$SED_SW" | git hash-object -w --stdin)
idx="$(git rev-parse --absolute-git-dir)/lcm-publish-index.$$"
trap 'rm -f "$idx" "$idx.lock"' EXIT
GIT_INDEX_FILE="$idx" git read-tree "$base"
GIT_INDEX_FILE="$idx" git update-index --cacheinfo "100644,$html_blob,index.html" --cacheinfo "100644,$sw_blob,sw.js"

# 7. Re-check before committing: against the base, the staged change is the
#    two stamp lines and nothing else (files, modes, line counts, content).
staged() { GIT_INDEX_FILE="$idx" git diff --cached --no-color --no-ext-diff --no-textconv --no-renames "$@" "$base"; }
[ "$(staged --raw | awk '{print $1, $2, $5, $6}')" = "$(printf ':100644 100644 M index.html\n:100644 100644 M sw.js')" ] || fail "the publish commit would touch more than index.html and sw.js. Nothing committed."
[ "$(staged --numstat)" = "$(printf '1\t1\tindex.html\n1\t1\tsw.js')" ] || fail "the publish commit would change more than one line per file. Nothing committed."
[ "$(staged -U0 | grep '^[-+]' | grep -v '^--- \|^+++ ')" = "$(printf '%s\n' "-$html_old" "+$html_new" "-$sw_old" "+$sw_new")" ] || fail "the changed lines are not the two stamp lines. Nothing committed."
tree=$(GIT_INDEX_FILE="$idx" git write-tree)
rm -f "$idx"

# 8. Commit on top of the base, and move session-a only if it is still the
#    base (if another session committed meanwhile, nothing is changed).
commit=$(git commit-tree "$tree" -p "$base" -m "Publish build $new" -m "Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>")
git update-ref -m "publish-live: build $new" refs/heads/session-a "$commit" "$base" || fail "session-a moved while publishing (another session committed). Nothing committed or pushed. Re-run."

# 9. Bring the shared index and working copy up to the new stamp, touching
#    only the stamp. An index entry another session has staged a change to,
#    or a working-copy stamp that is not the base one, is left as it is.
sync=()
for f in index.html sw.js; do
  if [ "$(git rev-parse -q --verify ":$f" || true)" = "$(git rev-parse "$base:$f")" ]; then
    if [ "$f" = index.html ]; then sync+=(--cacheinfo "100644,$html_blob,$f"); else sync+=(--cacheinfo "100644,$sw_blob,$f"); fi
  else
    note "the index entry for $f was changed by another session; it keeps its old stamp line"
  fi
done
if [ ${#sync[@]} -gt 0 ]; then
  git update-index "${sync[@]}" || note "could not update the index (busy); git status shows the old stamp lines as staged"
fi
# Same-length value written at its own byte offset: no rewrite of the file,
# so another session's open edits in it stay exactly as they are.
stamp_in_place() {
  perl -e '
    my ($file, $re, $old, $new) = @ARGV;
    length($new) == length($old) or die "the new stamp is a different length\n";
    open(my $fh, "+<:raw", $file) or die "cannot open it: $!\n";
    my $all = do { local $/; <$fh> };
    my @hits;
    push @hits, [$-[1], $1] while $all =~ /$re/g;
    @hits == 1 or die scalar(@hits) . " stamp lines in it\n";
    $hits[0][1] eq $old or die "its stamp is $hits[0][1], not $old\n";
    seek($fh, $hits[0][0], 0) or die "seek: $!\n";
    print {$fh} $new or die "write: $!\n";
    close($fh) or die "close: $!\n";
  ' "$@" 2>&1
}
if out=$(stamp_in_place index.html '<meta name="lcm-build" content="([^"]*)">' "$html_old_val" "$new"); then
  echo "Working copy: index.html stamp written in place."
else
  note "working copy index.html left alone ($out)"
fi
if out=$(stamp_in_place sw.js 'var CACHE_VERSION = "([^"]*)";' "$sw_old_val" "lcm-$new"); then
  echo "Working copy: sw.js stamp written in place."
else
  note "working copy sw.js left alone ($out)"
fi

# 10. Push exactly the publish commit as a fast-forward (a commit another
#     session makes on session-a after this point does not ride along).
git push origin "$commit:refs/heads/main" || fail "push to main was rejected (main moved on). Nothing forced. Investigate before retrying."

# 11. Confirm the phone can actually see it. Pages takes a few minutes.
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

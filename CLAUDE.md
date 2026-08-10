# LCM Pharmacy — design rules (read before ANY UI change)
Also read ABOUT-ME.md before any work — build to this user's preferences.
This is a single-page mobile web app. It must always look clean, symmetrical,
aligned, organized and calm. Follow every rule, then re-check your work.

## Theme — keep the current GREEN & WHITE look (do NOT go dark)
- Keep the existing light theme: clean white / off-white surfaces, a soft light-green
  page background, forest-green as the primary colour, with tasteful accent colours.
  Do NOT convert this app to dark mode. (A dark-green accent band for headers/stats is
  fine — that is an accent, not dark mode.)
- Pull the greens and accent colours already in use into CSS variables as ONE source
  of truth, and use only those — no random one-off shades. Keep colours consistent so
  they never drift from screen to screen.

## Fit the screen (mobile-first)
- Design for a phone ~360px wide. Nothing wider than the screen or overflowing.
- Respect safe areas (env(safe-area-inset-top/bottom)). Nothing cut off under the
  status bar or above the phone's bottom nav.
- Every dropdown / menu / popover / filter panel MUST open fully on-screen; if it
  would run off an edge, flip or shift it; if taller than the screen, it scrolls
  inside itself and is NEVER cut off. Tapping outside closes it.

## Spacing & size (one scale, no random numbers)
- Only 4/8/12/16/24/32px for margins/padding/gaps.
- One corner radius for cards, one for pills. One type scale (title/body/label).
- Minimum tap target 44px.

## Alignment & symmetry
- Equal left/right padding, balanced top/bottom. Items share one left edge and
  consistent columns. Label/value pairs aligned. Group related items evenly.

## Separation & grouping — colour and space, NOT boxes and lines
- Show where sections begin and end using background tone and spacing, NOT borders,
  outlines or divider lines.
- Never put a box inside a box. Avoid nested cards, outlined pills and clutter.
  Reserve a visible border only where colour and space genuinely can't separate.

## Components — one system, no one-offs
- ONE pill/chip style, ONE button style, ONE card style, reused everywhere. The
  tab toggle, the filter pills and the status counts must all belong to the same
  visual family — no different looks fighting.

## Status colours — quiet and consistent
- The inventory status counts (Zero / Low / Phasing out / Temporarily stopping) are
  a compact, aligned SET of small chips of equal height — not loud full-width solid
  bars. One clear colour each, readable on the light theme, from variables: zero =
  red, low = amber/yellow, phasing out = soft orange/bronze, temporarily stopping =
  neutral grey. Same size, same shape, evenly spaced.

## Stock level bar
- Show the stock-level bar in its OWN column with a % label, never squashed under the
  stock number. % = stock vs the "low at" reorder line, capped at 100%; green at/above
  the line, amber below, red near empty. Same treatment on both the To order list and
  the main Herbal Inventory table.

## NEVER break these (protected behaviours — re-test after EVERY change)
- The Prescriptions search MUST always filter the list live as I type, by patient name
  (and herb/notes). This has broken before — after ANY change, type a known patient
  name and confirm the list narrows to only matches, then clear it and confirm the full
  list returns. Never ship a change until you've re-checked this.
- Marking a routine/order "done" must never create a duplicate entry.
- No white/light-mode regressions, no cut-off elements, no boxes-in-boxes.

## Before finishing
- Confirm every rule is met. Check at 360px: nothing cut off, overlapping, or
  running off-screen. Confirm every colour comes from the variables (no off-palette
  shades) and the green & white theme still looks clean and consistent.

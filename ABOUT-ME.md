# About me — build LCM Pharmacy to these preferences

## How I work with you
- I'm newer to coding — explain in plain, simple language, step by step.
- Publishing: this app is on GitHub Pages (b00k33/lcm-pharmacy), never Netlify.
  Commit your work freely, but **push it live only when I say "push live"**, each
  time, for that change (the 4pm daily auto-deploy was removed 2026-10-05; CLAUDE.md
  "Deploy & git" has the steps).
- Pause to confirm before deleting my data. Never delete a patient photo.
- I notice small visual details and care a lot about polish.
- Fix root causes, not symptoms — and when a bug has happened before, guard against it
  coming back and re-test it after every change.

## What I value in the design
- Clean, simple, streamlined, organized. Symmetrical, aligned, logical layouts.
- Consistency above all — one design system, one source of truth, nothing that
  drifts or looks different from screen to screen.
- Desktop leads; the phone covers the essentials (schedule, check-in, quick logging).
  Every screen must still fit with nothing cut off.
- Efficiency: fewest taps, smart defaults, common actions effortless.

## My aesthetic
- Keep this app's clean TEAL & WHITE theme with tasteful colour — do NOT make it
  dark. A dark-teal accent band for headers/stats is welcome. (I like dark mode for
  my other apps, but not this one.)
- Tidy, calm and consistent; colours from one source of truth so nothing drifts.

## What I dislike (avoid these)
- Clutter, overlap, anything cut off or running off the screen.
- **Suggestions** (2026-10-13: "i dont like suggestions, it clutters the screen"): no suggestion chips, no
  "suggested / best fit / consider" text, no "e.g." example text, no proposed rows. Show what is true; I'll
  decide what to do. (CLAUDE.md, top of file, has the full rule.)
- **Links** (2026-10-14: "i dont like links, i prefer chips"): every tap target is a chip or a button.
- Explaining or how-to sentences on screen.
- Oversized or disproportionate elements; irregular or random spacing.
- Inconsistent colours or one-off components.
- Too many boxes and borders — separate with colour and space, not outlines.

## How my data connects (build for this)
- One app, well integrated: the same fact comes from one place and shows the same way
  on every page that uses it (CLAUDE.md "ONE APP, WELL INTEGRATED").
- Patients, plans, findings, prescriptions, herbs, stock and messages relate to each
  other — link them rather than keeping them in silos, so it works as one system.

## How to treat my requests
- Fix the root cause and keep everything consistent with the design rules.
- If something I ask for would clash with the design rules, tell me.

## HER DESIGN PROFILE (2026-11-21: read before designing or mocking anything)
Her "audit lcm codes - find any information regarding my personality, embed my personality into the design of the app for current
and future builds". The rules only, never the reasons: **this repo is PUBLIC, so nothing about her health, identity, family or
chart goes in any file, code comment or commit message here** (her private profile lives in Claude's memory, which every session
reads). Three headlines come first, then the rules under them. A build is DONE when the tap, style, title-bar and voice audits
(`.github/scripts/`) have empty lists at 1220 and 360, or each line left is on that script's KEEP list with her word.

| Rule | The app does | Checked by |
|---|---|---|
| **Exact** | Every detail is right the first time. The same thing looks, sits and reads the same on every page; nothing near-duplicate (5 type sizes, 3 weights, one chip box, 4 colours); composed pixels verified at her width | tap-audit.js · style-audit.js · titlebar-audit.js |
| **Simple** | The fewest things on a page; one obvious next step; things stay where she left them and nothing moves or changes by surprise (no looping motion); every label says exactly what it does (words over icons on desktop); no hints, notes, legends, "e.g.", suggestions or how-to lines | voice-audit.js |
| **Efficient** | Fewest taps; pre-filled, never suggested; Enter = the next box; a page updates where she is and never skips to the top; vertical space first | tap-audit.js |
| Pictures first | Pictures in fixed places and fixed colours, organised so they stay memorable; one face in every picture; a mock she approves before the build | her pick on a mock |
| Calm | Essentials only; no coloured side lines; one short move | style-audit.js · voice-audit.js |
| One place | Every fact once, shown the same way everywhere | CLAUDE.md "ONE APP, WELL INTEGRATED" |
| Guided | The app says what is next, in time order; logging reality stays easy | Today's visit page |
| In control | Confirm and Undo; updates only on her own tap; push live only on her word; never delete a photo | the publish rules |
| Warm and brief | Short, plain, courteous words; never blunt | voice-audit.js |
| Corrections stick | What she says once is fixed once: a repeat report means the fix was on the wrong layer; decide what expertise can decide, ask only real questions | CLAUDE.md "Fix root causes" |
| Routines and anchors | Ordered steps on strict cadences with an anchor date are a core pattern: keep the order and the anchor | the Routines page |

Not rules unless she says so: her numerology / astrology chart does not shape the look.

# DESIGN-CONVENTIONS.md — LCM Pharmacy's real design tokens

This file grounds any outside design tool (Claude Design, a mock, a new build) in what
LCM Pharmacy **actually ships today** — every value below was read out of `index.html`'s
own `<style>` block or confirmed against CLAUDE.md's dated build history, not invented.
Where a value is still evolving (the Oct 2026 "cockpit" redesigns), that's flagged.
If a request conflicts with something here, fix this file in the same pass — see
CLAUDE.md's own rule for STYLE-LCM.md, which applies equally to this one.

For the ≤480px mobile type scale specifically, **STYLE-LCM.md is the source of truth** —
this file covers desktop/tablet and the app generally.

---

## Colour — one source of truth, all CSS variables, no off-palette hex

### Primary brand — True Teal (her pick, 2026-09-11; line ~277)
```
--ph-herb:        #165C74   (primary)
--ph-herb-deep:   #0B3B4B   (titles, dark surfaces, active/pressed states)
--ph-herb-press:  #072A36   (darkest step — pressed, or "stronger" text on a tinted card)
--ph-herb-tint:   #EDF5F8   (light surfaces, card backgrounds)
--ph-herb-card:   #4599B5   (mid card accents)
--ph-herb-solid:  #0C3B4B   (solid dark blocks)
```
`--ph-green*` aliases all still point at these — never reintroduce a raw green hex.
Everything else in the sheet (icons, neutrals `--ph-line`/`--ph-paper`/`--ph-cream`, the
near-black text tokens `--ph-ink`/`--ph-soft`/`--ph-faint`) was hue-rotated into this teal
family in the same pass.

### Deliberately NOT part of the teal family (don't sweep these in)
- `--ph-metab: #1F7A82` — Weight/Metabolic category colour, its own hue, checked for real
  separation from True Teal.
- `--ph-prep-deep: #0A5D65` — the "being prepared" status colour.
- `PH_ACUPREG_COLOUR: #8AAB99` — Acupreg's own location sage-green (raw, never toned —
  toning drags it muddier).
- Raw/toned Cliniko appointment-type colours (`PH_CLINIKO_TYPE_COLOURS`) — read live off her
  Cliniko Settings screen, an external system's palette, not this app's own identity.

### Case / category colour families (one family per condition, reuse before inventing)
Each family carries 4 steps — tint / card / deep / press — picked in **OKLCH**, stored as
plain hex, all at lightness 0.70 (cards) so every column reads at equal visual weight, each
at ~65% of the max chroma its hue can hold in sRGB (short of neon):
- Musculoskeletal → `--ph-msk*`
- Gynaecology → `--ph-gyn*`
- Stress → `--ph-purple*`
- Metabolic → `--ph-metab*` (teal, distinct from `--ph-herb*`)
- Acute → `--ph-acute*` (amber, deliberately browner than `--ph-low`/`--ph-gold` so it never
  reads as a status colour)
There is **no "Suggested" card** any more (her 2026-10-13 "no suggestions"): every card in a column is
the same colour; the app never marks one as recommended. Ordering by relevance is fine, labelling is not.
Contrast rule: text on a tinted card uses `--ph-*-press` (darkest step), not `-deep`, if
`-deep` fails 4.5:1 at that tint strength. Hover **lifts** (brighter), never deepens — a
fill already at its own ceiling turning darker on hover loses contrast, not gains it.
**Measuring trap**: `color-mix()` computes to `oklab()` — `getComputedStyle` can't be parsed
as rgb; read real pixels via a 1×1 canvas + `getImageData`.

### Status colours (quiet, one clear colour each, same size/shape, evenly spaced)
- Zero stock → red (`--ph-zero-deep` / `--ph-zero-tint`)
- Low → amber/gold (`--ph-low-deep` / `--ph-gold-tint`)
- Phasing out → soft orange/bronze
- Temporarily stopping → neutral grey
- Stock bar: green at/above the reorder line, amber below, red near empty.

### Reserved — never for status/error use
`--ph-gold` (brass/gold accent) is reserved for brand and the one primary CTA language
(the mint/gold disc, the Update button). A live-status or "armed" banner uses
`--ph-gold-tint`/`--ph-gold-deep` instead (a lighter pairing), never the raw brand gold.

### Deep-teal + gold "cockpit" palette (evolving, Sept–Oct 2026 redesigns)
The newer Instrument-band / Session-grid / Plan-tab cockpit builds (Treatment Plan tab,
Dispense redesign, To Order, Appointments Command Deck) standardised on:
- Band surface: deep teal (`--ph-herb-deep`/`-solid`)
- Primary accent / "you are here": gold (`--ph-gold*`)
- Numerals in the display font (`--font-disp`, Barlow Semi Condensed)
This is the newest layer on top of the base True Teal system, not a replacement — ordinary
cards/pills/buttons elsewhere are untouched.

---

## Spacing — one scale, no random numbers
**4 / 8 / 12 / 16 / 24 / 32px** only, for margins/padding/gaps. (The old "minimum tap target
44px" rule was retired 2026-09-02 — don't reintroduce a tap floor without asking.)

"Breathing room" pass (2026-09-21) raised a few specific desktop chrome values on the
Treatment Plan page (card padding, phase-bar height, section gaps) — a deliberate, scoped
loosening for that one page, not a scale change elsewhere.

---

## Typography
- One type scale: title / body / label, driven by `--fs-*` tokens (`--fs-name`, `--fs-body`,
  `--fs-meta`, `--fs-micro`, …) — **not** scoped to one page; grep shows 140+ live uses
  app-wide. Never a one-off px value in new work — use the shared token.
- Display numerals (counts, gauges, big figures on the cockpit bands) use `--font-disp`
  (Barlow Semi Condensed) — the newer convention, not yet swept everywhere.
- Mobile (≤480px) has its own 4-value scale — see STYLE-LCM.md. Don't apply it to desktop.

---

## Corner radius & shape
- **One radius for cards**: 14px (`.ph-ds-card`, `.ph-hx-card`, most panel surfaces).
- **One radius for pills**: 999px (full stadium) — chips, tags, segmented options.
- **Inputs**: 24px height, 6px radius (`!important` where it must beat the app-wide input
  radius rule) — the dose/grams/price-field convention from the Dispense cockpit restyle.
- Square "action" buttons: 24px height, 6px radius, outlined. (2026-10-15: CLAUDE.md "TAPPABLE THINGS" sets chip and button size: 28px, 6px corners for buttons; that wins over the 24px here.)

---

## Component shape language ("9m" convention, locked)
Two shapes, never mixed for the same job:
- **PILLS** (24px tall, radius 999, filled plum `#72243E` when "on"; Response keeps its own
  green/grey/red semantics) = things she **picks** — a phase chip, a point/press-tag chip,
  a linked-formula chip, a treated-phase label.
- **SQUARE buttons** (24px tall, radius 6, teal outline) = things that **do something** —
  change, edit, +add, Clear/Select all, →plan, Dispense/Instruct, Design/Link, a formula
  action, the findings-chart opener, a symptom quick-add preset.
One button style, one pill/chip style, one card style — reused everywhere; no competing
visual families on the same screen.

---

## Buttons
- **Primary action**: solid teal (`.btn-save`), one per screen/section — "Log today's
  session", "✓ Log this collection", "Save & log".
- **Secondary/quiet**: a square outlined button or a row. NEVER a text link (CLAUDE.md "TAPPABLE THINGS", 2026-10-15; `.ph-name-link` and `.ph-os-lnk` are being retired from the screens).
- **The app's one primary-action convention on a page header**: an icon-only mint/gold disc
  (`.ph-shell-titlebar-action`) — never a row of buttons in a header band; every other
  action folds into one ⋯ menu (`phTbmMenuToggle`).
- Dispense step indicator: the active step is the gold node on a deep-teal connector; done
  steps are deep teal; never more than one gold "you are here" marker per widget.

---

## Tables — real `<table>`, hairline cells, never a div-grid pretending to be one
Her 2026-09-05 standing rule, reconfirmed repeatedly: **information in a REAL table** — one
row per item, one column per field, hairline cell borders, labels repeated per group. Never
a card-with-sub-rows or a stepper pretending to be a table.
- `table-layout: fixed` + a `<colgroup>`/declared widths on every data table — an
  auto-layout table lets whichever column is read first (usually the leftmost) claim space
  the later, more important column (often a `<select>` or action cell) actually needs.
- Alternating row tint for scan-ability; the row "she is on" gets a tinted background **and**
  a left accent bar — never tint-only or bar-only.
- Print documents (`phPrintDoc`) need their own `table-layout:fixed` + `word-break` —
  they open in a bare window with none of `#pharmacyPage`'s scoped CSS, so an unconstrained
  table silently clips off the printed page edge instead of scrolling.

---

## Separation & grouping
Colour and space signal a section boundary — **never** borders/outlines/divider lines as
the default. Reserve a visible (usually dashed) divider only where colour/space genuinely
can't separate two stacked blocks that still need telling apart (e.g. the merged
Cycle-block → IVF-history → "What's next" card). Never box-in-a-box: no nested cards, no
outlined pills inside an outlined card.

---

## Motion — only on change, never on a plain open/repaint
Standing rule across every "cockpit" build (Instrument band, Session grid, Appointments
Command Deck, Patterns page, Plan tab):
- First sight of a widget per script-open: rise/fade in, numbers count up, arcs grow from
  zero — plays **once**.
- A later repaint of the *same* data plays **nothing** unless something actually changed
  (tracked via a small "last seen" signature per widget, cleared in `presOpenScript`).
- A genuine change (a session logged, a booking filed, a phase advanced) gets a scoped,
  small animation on exactly the thing that changed — a chip pops, a ring's arc grows, a
  row slides in — never a full-page replay.
- `@media (prefers-reduced-motion: reduce)` turns every one of the above off. Always add
  this alongside new motion, not as an afterthought.
- Motion must never cost her scroll position or an in-progress edit — repaint the smallest
  DOM host that can carry the change (`outerHTML` swap of one `#…Host` div), never a full
  `renderPresPanel()`/`renderPharmacy()` for a value that changed on the same screen she's
  looking at. (`renderPresPanel()`/`renderPharmacy()` reset scroll to 0 — reserved for a
  genuine navigation, i.e. opening a different script/page.)

---

## Layout patterns worth reusing
- **Left-side flow rail** (Patient profile, Treatment Plan page): a numbered vertical rail
  of steps/sections, the lit step gold-on-teal, a connector line that fills as steps
  complete, sub-items grouped under their parent step. Desktop only — phone keeps a
  horizontal strip of the same steps, no sub-items.
- **Instrument band**: a deep-teal strip of 2–3 round/arc gauges summarising "where things
  stand" at the top of a workflow page (Plan tab, Dispense). Always backed by the *same*
  underlying data the detail table below it reads — a gauge and its table must never be
  able to disagree.
- **Merged Planned | Today table**: two logically different things (what the plan calls
  for vs. what's actually happening today) rendered as one real table with two columns,
  row order mirroring how the visit actually runs — not two separate panels stacked.
- **One quiet caption line, not a repeated headline**: a fact said once near the top of a
  page (e.g. phase/cycle-day in a band) is never also repeated inside a section's own
  header below it — if two surfaces would say the same thing, the second is dropped or
  replaced with something it doesn't already know.

---

## What NOT to do (collected standing rejections)
- No raw colour literals outside the CSS variables above.
- No dark-mode conversion — light theme only, a dark-teal accent band is an accent, not
  dark mode.
- No new icon family alongside the existing thin-stroke sprite set.
- No tap-target floor (retired), no fixed 44px minimums.
- No box-in-a-box, no divider lines where colour/space would do the job.
- No motion on a plain repaint of unchanged data.
- No off-palette "stronger" fill made by mixing further toward a pale tint — tints have
  almost no chroma; mixing toward one desaturates instead of strengthening it.
- **No suggestions (her 2026-10-13):** no suggestion chips (gold dashed "+ X" starters), no "Suggested / Best fit /
  Recommended / Consider / plan suggests" text, no tip or 💡 boxes, no "e.g." example text in placeholders or hints,
  no proposed rows she has to accept, no "recommended" card or badge. A placeholder is the field's name. Facts,
  statuses, safety flags and a tool she opens on purpose are fine. Full rule: CLAUDE.md, top of file.

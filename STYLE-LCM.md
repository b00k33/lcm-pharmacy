# STYLE-LCM.md — LCM's mobile type scale

LCM has no rulebook of its own. Book33's `design44` is **not** it and must never be applied
here. This file is that rulebook — read it before any mobile (≤480px) UI change, and if a
new request conflicts with a rule below, **update this file to match** so the next build
doesn't quietly undo it.

Everything here lives inside `@media (max-width: 480px)` in `index.html`, so desktop is
untouched. Tokens are set on `#pharmacyPage` inside that query.

---

## The mobile type scale — four sizes, no fifth

| Token | Size | Weight | Used for |
|---|---|---|---|
| `--m-fs-value` | **16px** | 600 | anything you type into or tap to change — field values, selects, segmented-option labels that also act as a value, the history summary number |
| `--m-fs-label` | **14px** | 600–800 | statements and chips — toggle labels, history chips, segmented options (incl. the Sex F/M/— pills) |
| `--m-fs-help`  | **13px** | 400 | helper and secondary text — empty-state notes, `+ Add`, supplement chips |
| `--m-fs-head`  | **11px** | 800, uppercase, `.06em` | labels and section headings — the only uppercase text on the page |

Two exceptions, both deliberate:
- **Bottom nav labels: 10px** — under an icon, read as a pair.
- **The header title: 16px white**, with an 11px subtitle beneath it.
- Icon glyphs (‹, 📷, chip dots) aren't "text" for this audit — don't count them toward the four.

### Why 16px is a floor, not a preference
Any input under 16px makes the browser zoom the page on tap. 16px is the smallest that still
behaves — never go to 15 for a field value.

---

## Control heights — one row height

| Control | Height |
|---|---|
| Text field / select row | **48px** |
| Sex pills (segmented) | 32px tall, inside a 48px row |
| Toggle row | **48px** (switch itself **44 × 26**) |
| Bottom nav (`.ph-mobile-tabbar`) | **56px** |

Every field is a 48px row: label left (74px, `--m-fs-head`), value right (`--m-fs-value`),
one 1px `--ph-line` rule between rows. Nothing stacks label-above-value on mobile.

### No outlines
Fields sit on **white**, separated by the 1px rule. The section beneath sits on the page
tone. Grouping is background + spacing, not 12px rounded borders everywhere.

### Chips
`font-size: var(--m-fs-label); background: var(--ph-surface); border-radius: 999px; padding:
2px 8px;` — no border. Family-history chips use a cool grey-blue tint instead of an outline,
so the two groups separate by tone, not by two different border styles.

### Floors, unchanged
Nothing interactive below 12.5px. No tap target below 32px (the toggle's 26px height is a
deliberate, explicitly-specified exception to that floor — see her 2026-09-05 spec — not a
new precedent to reuse elsewhere without asking).

---

## Section heading vs. field label

Both are 11px uppercase — the same size is fine, because **position and background** tell
them apart, not size: a section heading (`.ph-tmpl-sec`) sits on the page tone with space
above it; a field label sits inside a white row. Never rely on size alone to separate the two.

---

## Where this is implemented

`index.html`, inside `@media (max-width: 480px)`, right after the `.ph-pres-patient` desktop
grid rules (search `LCM mobile type scale`). Scoped mainly to `#pharmacyPage .ph-pres-panel`
(the patient-profile stepper: Opening / Assessment / Treatment / Dispense / Follow-up — these
five stages share `.ph-tmpl-sec`, `.ph-switch-row`, `.ph-hx-row`/`.ph-hx-chip`, so fixing those
shared classes reaches all five, not just Opening) plus `.ph-mobile-tabbar` (the app-wide
mobile bottom bar, also shared across every page).

**Not yet swept**: Inventory, To Order, the herb/formula Scripts list, and the Patient
directory list use their own, largely separate class names that this pass didn't touch or
audit — treat those as a follow-up pass, not silently "the same fix," since they haven't been
measured against this scale yet.

## Two known, deliberate deviations from the reference mock

1. **Sex segmented pills and inventory chips reuse `.ph-hx-sexbtn` / `.ph-ck-chip`**, shared
   classes used elsewhere in the app (the History screen's own filters, the check-in panel).
   The size fix for both is scoped to `.ph-pres-panel` only, so the Opening tab's Sex control
   and Supplements chips hit the 4-value scale without changing those other, out-of-scope
   screens.
2. **The per-script tab strip** (`.ph-pres-tabs`, "a tab per script under her name," shipped
   2026-08-31) sits between the header and the stage strip and adds real height the reference
   mock didn't account for — it measures the Opening tab without knowing this row exists.
   Left in place (it's real, separately-approved functionality); flagged rather than silently
   trimmed.

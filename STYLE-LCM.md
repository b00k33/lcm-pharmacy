# STYLE-LCM.md — LCM's phone type scale (≤480px)

The phone type scale and row sizes only. **CLAUDE.md is the rulebook and wins where the two
differ** (its TAPPABLE THINGS rule sets every chip and button; its "Phone laws" set the phone
layout). Book33's `design44` is **not** LCM's and must never be applied here. Read this file
before any phone (≤480px) UI change; if a new request conflicts with a rule below, **update
this file in the same pass** so the next build doesn't quietly undo it.

Everything here lives inside `@media (max-width: 480px)` in `index.html`, so desktop is
untouched. Tokens are set on `#pharmacyPage` inside that query.

---

## A patient script opens full-screen

On a phone there is no bottom bar, no floating button and no footer band (CLAUDE.md phone law
2; the old `.ph-mobile-tabbar` + `.ph-pres-fab` peek pattern is retired and hidden in the one
640px block). Tapping a patient opens the script full-screen (`#presPanel.ph-pres-full`); the
list underneath keeps its scroll spot; ‹ Back returns to it. ☰ is the only nav.

---

## The phone type scale — four sizes, no fifth

| Token | Size | Weight | Used for |
|---|---|---|---|
| `--m-fs-value` | **16px** | 600 | anything you type into or tap to change — field values, selects, segmented-option labels that also act as a value, the history summary number |
| `--m-fs-label` | **14px** | 600–800 | statements and chips — toggle labels, history chips, segmented options (incl. the Sex F/M/— bar) |
| `--m-fs-help`  | **13px** | 400 | secondary text — empty states, `+ Add`, supplement chips |
| `--m-fs-head`  | **11px** | 800, uppercase, `.06em` | labels and section headings — the only uppercase text on the page |

Exceptions, both deliberate:
- **The header title: 16px white**, with an 11px subtitle beneath it.
- Icon glyphs (‹, chip dots, sprite icons) aren't "text" for this scale.

### Why 16px is a floor, not a preference
Any input under 16px makes the browser zoom the page on tap. 16px is the smallest that still
behaves — never go to 15 for a field value.

---

## Row heights

| Control | Height |
|---|---|
| Text field / select row | **48px** |
| Sex bar (segmented) | 32px tall, inside a 48px row |
| Toggle row | **48px** (switch itself **44 × 26**) |
| Chip / button | **28px** (TAPPABLE THINGS) |

Every field is a 48px row: label left (74px, `--m-fs-head`), value right (`--m-fs-value`),
one 1px `--ph-line` rule between rows. Nothing stacks label-above-value on the phone.

### No outlines
Fields sit on **white**, separated by the 1px rule. The section beneath sits on the page
tone. Grouping is background + spacing, not rounded borders everywhere.

### Full width, no side margin
Her ask (2026-09-05, "widen it completely across the screen"): white sections span edge to
edge, same as the header, no rounded corners, no outer gutter. `.ph-pres-stage-body` itself
carries **zero** side padding; the 12px inset lives one level down (a section heading's own
padding, a row's own padding), never on the shared wrapper. Don't reintroduce an outer card
margin/radius on a full-width section without asking.

### Chips
TAPPABLE THINGS in CLAUDE.md: a pill, 28px tall, 1px `--ph-line` line, white; picked = solid
`--ph-herb`, white text; text is 14px on the phone (`--m-fs-label`), 13px on desktop. One
category's chips join into one bar with no side bracket. A chip is for something she
**picks or has recorded** — never a proposal (CLAUDE.md "NO SUGGESTIONS").

### Floors
Nothing interactive below 12.5px text. Chips and buttons are 28px; a few phone Dispense chips
are 40px on purpose (`.ph-days-opt` / `.ph-pm-opt`). There is no general tap-target floor:
the 44px rule is retired (her call) — don't bring one back without asking.

---

## Section heading vs. field label

Both are 11px uppercase — the same size is fine, because **position and background** tell
them apart, not size: a section heading (`.ph-tmpl-sec`) sits on the page tone with space
above it; a field label sits inside a white row. Never rely on size alone to separate the two.

---

## Where this is implemented

`index.html`, inside `@media (max-width: 480px)`, right after the `.ph-pres-patient` desktop
grid rules (search `LCM mobile type scale`). Scoped mainly to `#pharmacyPage .ph-pres-panel`
(the patient pages share `.ph-tmpl-sec`, `.ph-switch-row`, `.ph-hx-row` / `.ph-hx-chip`, so
fixing those shared classes reaches every page).

**Not yet measured against this scale:** Inventory, To Order, the herb/formula Scripts list
and the Patient directory list use their own class names; treat those as their own pass, not
silently "the same fix".

**Shared classes:** the Sex bar and inventory chips reuse `.ph-hx-sexbtn` / `.ph-ck-chip`
(also used by the History filters and the check-in panel); their size fix is scoped to
`.ph-pres-panel` only, so those other screens keep their own sizes.

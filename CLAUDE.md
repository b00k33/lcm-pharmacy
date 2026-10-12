# LCM Pharmacy — design rules (read before ANY UI change)
Also read ABOUT-ME.md before any work — build to this user's preferences.

<!-- ============================================================ -->
# ★★ NO SUGGESTIONS — standing rule (her 2026-10-13: "i dont like suggestions. it clutters the screen.") ★★
<!-- ============================================================ -->
> Applies to every page and every future build. Where an older line anywhere below says "suggest", "suggestion",
> "starter", "best fit" or "one tap applies", **this rule wins**. It was set after the Came in for card, then audited
> across the whole app the same day (list at the end of this section).

**Never put on screen:**
1. **Suggestion chips** — "+ X" starters, "Often with this", "From the patterns", "Combine them", quick-add lists of
   common items she did not ask for.
2. **Suggestion text or labels** — "Suggested", "Best fit", "Recommended", "Consider", "plan suggests", "Try …", tip /
   💡 boxes, "Sharpen this picture"-style lists of what to ask or do next.
3. **Example text** — no "e.g. …" in a placeholder, hint, hover text, error message or empty state. A placeholder is
   the field's name (or empty when its label is already visible). A *format* hint that says what a value looks like
   (dd/mm/yyyy, 04xx xxx xxx, you@example.com) is fine.
4. **Proposed rows or items she must accept or dismiss** (the old auto "Fang Bing Ren" secondary complaints are the
   example). A derived value shows as an ordinary editable value in the field it belongs to (autofill Diagnosis / Goal,
   an auto-ticked sign with its source in the tooltip), never as a separate proposal.
5. **A "recommended" option among equals** — no solid card, pin, badge or colour that tells her which one to pick.
   Ordering by relevance is fine (a plan picker still lists her complaint's plans first); labelling it is not.

**What stays (these are not suggestions):**
- **A tool she opens on purpose and its result:** the Patterns page (the analysis, clue counts, a pattern's detail when
  she expands it), the Fang Bing Ren ranking, Quick assess, the "Suggest from codes" button and its sheet, search /
  typeahead results after she types, native datalist autocomplete.
- **Controls that record an answer:** quick picks (1 wk / 1 mo / …), dropdowns, answer chips on a Medical history row,
  the "+ Sleep / + Pain / + Range of motion" row-type buttons, the Normal-fill button.
- **Facts and statuses:** stock chips, "overstocked", counts, dates, and "Plan formula X · Use" in Dispense (the
  plan's own formula with her pour-in action — worded as the fact, never "suggests").
- **Safety flags:** red flags, allergy / contraindication warnings.
- **Data questions her workflow law already asks** (Today's visit "still the same supplements?", Cycle "how long has
  she been on it?"): they ask her to confirm data, they never propose content.

**Wording test:** a line that says what *the app thinks she should add, do or say* is a suggestion — leave it out. A
line that says what *is* (a value, a source, a count) is fine.
**Design rule:** if a design wants to propose something, show the data and let her act. If a feature is genuinely a
suggestion tool, it must sit behind a deliberate tap (a button or menu item), keep its result off the page until then,
and be agreed with her first. Do not reintroduce a gold dashed chip, a gold tint box or a "sugg" class for this.
**When you touch a screen**, grep it for `suggest`, `e.g.`, `starter`, dashed gold chips and `placeholder="` before
you finish; a new "e.g." or suggestion chip left in is a defect, not a style choice.

**Audit 2026-10-13 — removed:** Came in for starter chips + Fang Bing Ren auto rows (card and plan card "Also noting");
Script panel "Suggested formulas — constitution" box; plan picker "Best fit / Suggested match" label and solid card,
"She also came in for … Combine them" prompt, Blank plan "formula already suggested" text; rhythm "suggested" tag;
Session-grid gold "suggested" slot flag; Treatment-tab acupuncture "From the patterns" point chips (both places);
Patterns page "Sharpen this picture" box and per-pattern "Supplements to consider" chips; herb picker "— use this";
Dispense "plan suggests" wording (now "Plan formula"); 56 "e.g. …" placeholders in the app and 6 in `intake.html`; the
"try e.g. …" body-area message; the template manager label "Suggested match for Case" (now "Case").
**Also removed (her "strip the Patterns page lists too", same day):** each pattern card's Letters, Food advice and
Points / formula-idea lists (the card now shows only its clues and Agree / Not this patient); the "Plan takes shape ·
Draft" card's Principle and Letters lines, its heading and Draft tag (it is now one quiet "Main ★ <pattern>" row with the
"Make X main" buttons). The pattern data (`letters`, `food`, `points`, `formula`) still sits in `PH_PAT_DEFS` but nothing
reads it; do not render it again.
**Kept and flagged (her call):** Quick assess; Today's visit "Worth a look" data questions.

<!-- ============================================================ -->
# ★★★ PATIENT WORKFLOW — THE LAW (her design, 2026-10-10) ★★★
<!-- ============================================================ -->
> **Read this before touching ANY patient page** (Patient details, Ren,
> Medical history, Supplements, Blood tests, Today's visit,
> Cycle, Tongue, Pulse, Abdomen, Fang Bing Ren, Treatment Care Plan,
> Treatment, Dispense). It fixes the **order, names, repetition and data flow**
> of those pages. It does NOT fix the widgets (stage/tab/rail mechanics are an
> implementation detail, Phase 1). If a request conflicts with it, **ask her,
> then update this section** — never quietly drift. Every line below is her
> pick from the design session (12 popups + two visual guides); do not re-ask.
> Where older text further down this file disagrees, **this section wins**
> (see "Superseded" at the end of it).

## 1 · Three groups, in this order
| Group | Pages, in order | How often |
|---|---|---|
| **1 Her file** | Patient details → Ren → Medical history → Supplements → Blood tests (Stress & sleep left this list 2026-10-13, see §3) | Set once, kept current |
| **2 Today's visit** | Today's visit (checklist home) → Cycle (if on) → Tongue → Pulse → Abdomen | Every visit |
| **3 Put together & do** | Fang Bing Ren → Treatment Care Plan → Treatment → Dispense | Decide, then treat |

- **Today's visit** is a checklist home: a one-line strip on top (last visit
  date · likely pattern · phase and visit number · flagged history), the
  **Re-check** (Better/Same/Worse/New + note), then Cycle / Tongue / Pulse /
  Abdomen as tiles with a ✓ when done today and last visit's finding beside
  today's. Each tile opens its own page. Pain / MSK patients also get a **Musculoskeletal** tile and page after Abdomen (2026-10-11,
  see "Musculoskeletal Assessments page" at the end): the pain map + Pain intake moved onto it, so "Where it hurts" no longer sits on Today's visit for them.
- **Tongue, Pulse, Abdomen and Cycle are each their own page** (her pick,
  reversing the earlier one-card fold). Cycle has ONE home: its own page,
  reached from its Today's visit tile. No second Cycle tab.
- **The Review step is retired** — folded into Today's visit (strip + pain
  map + pain intake). Nothing lost, only repeats removed.
- **Timeline** (2026-10-13, her pick): a page under Treatment Care Plan in the rail, only on a Pregnancy / Natural fertility / IVF plan (see "Fertility timeline" below). It is not a numbered step and not in the Next / Up-next walk.
- Other pages (Photos, Appointments, Messages, IVF history, Log, Visit
  checks, Checklist) are unchanged and sit outside this law.

## 2 · The order of a visit
**First visit (her pick "Examine first"):** 1 Patient details → 2 Ren → 3
Medical history → 4 Supplements → 5 Blood tests (if she brought any) → 6
Cycle (if on) → 7 Tongue · Pulse · Abdomen (and Ask her, which now holds the
sleep and mood questions) → 8 **Fang Bing Ren** (now has data to read) → 9
**Treatment Care Plan** → 10 Treatment → 11 Dispense. (Stress & sleep was
step 4 until 2026-10-13.)
**Return visit:** Her-file pages show "✓ on file" and are skipped, except
Supplements (confirm) and Blood tests (if new). Then: Re-check → Cycle (if
on) → Tongue · Pulse · Abdomen → Fang Bing Ren as **one line: what shifted** →
Treatment Care Plan as **one line: phase, session** → Treatment → Dispense.
**Order of WORK, not of record creation:** a plan shell still exists from the
door (the "plan is the spine" no-plan gate, decision 3), because the exam pages
live on the plan stage's tabs. Step 10 is when she shapes and uses that shell
after Fang Bing Ren, not when it is first created.
**Why:** Fang Bing Ren READS tongue, pulse, abdomen. It must come after
them. (The Oct 10 tab order put it before, so it opened empty on a first
visit. That is fixed by this law.)

## 3 · How often each page repeats
| Page | Rule |
|---|---|
| Patient details | Once. Sex + DOB gate the rest (existing Start-here card stays). |
| Ren | Once. (She skipped the "photos ~3 months old" nudge in Phase 4: none.) |
| Medical history | Once. One tap "Anything new since <date>?" on Today's visit EVERY return visit (Phase 4). |
| Stress & sleep | **No page any more (her pick A, 2026-10-13, `stress-sleep-audit-2026-10-13.html`).** It was "asked once for EVERY patient"; it now lives on **Ask her** (every visit, Usually and Right now): the Sleep topic gained *Hard to fall asleep* and *Wakes in the night or very early*, the Mood topic gained *Low, flat or tearful* and is now always shown. Each answer ticks a new Fang Bing Ren sign (`sleep_onset_hard`, `sleep_wakes`, `mood_low` + `_tend` twins) that makes the Patterns clue `sl_hard` / `sl_wake` / `low_mood`; tapping "hard to fall asleep" or "wakes" also shows the broad sleep sign pre-ticked (`PH_TRI_IMPLIED_BY`). The Energy grid and throat lump were not carried over (Energy is on Today's visit and Fang Bing Ren; throat lump is already a Fang Bing Ren sign). Answers saved before still count and still pre-tick (`PH_PFW_RETIRED`). The mood question on the men's page and the Change of life "Sleep and mood" question went with it. |
| Supplements | Confirm every return visit with one tap "Same as last time" / "Changed" on Today's visit (the Supplements page itself is unchanged). |
| Blood tests | When a new result arrives. Each result shows its age ("9 months old"); a result **over 12 months old** is still listed and dated but marked "not counted" and gives Fang Bing Ren no clue (`PH_BLD_OLD_DAYS`, `phBldIsOld`). |
| Re-check, Cycle, Tongue, Pulse, Abdomen | Every visit (Cycle while on). |
| Fang Bing Ren | Recalculated live on every render, never stored; only her Agree / Not this patient taps are saved. |
| Treatment Care Plan | Built after Fang Bing Ren; reviewed at the end of each phase. |
| Treatment, Dispense | Every visit (Dispense when herbs). |

## 4 · What feeds what (influence map)
Fang Bing Ren **reads everything in groups 1 and 2**: complaint (weak),
Ren taps, medical history + notes, Ask her (sleep and mood), supplements (only iron
reaches it — she chose to leave supplements as they are; the other three are
what she takes, not signs of a pattern), blood results (iron, thyroid; only
results under 12 months old), Cycle day log, Tongue, Pulse, Abdomen,
period/change-of-life/men's answers. **She declined a "fed by" strip** (9/10 Phase 3):
do not add one.
- Fang Bing Ren → Treatment Care Plan: **fills the Diagnosis / Goal as editable text only**
  (never a proposal box). → Treatment: **no point-suggestion chips** (removed 2026-10-13, see "NO SUGGESTIONS"
  at the top). → Dispense: **never suggests a formula; the formula is always hers.**
- Re-check → Treatment Care Plan: saved and shown on Today's visit only.
  **She declined a flag on the plan** (Phase 3): do not add one.
- Cycle → Fang Bing Ren, Treatment Care Plan (phase by cycle day, IVF), Treatment.
- Treatment saved → files the dated visit (and its dated findings) to the Log.
- Complaint → reorders the plan picker and picks which question sets show.

## 5 · One finding per visit
Tongue, Pulse and Abdomen get **one dated finding per visit**, shown against
the last visit, and Fang Bing Ren reads the latest. **Traced and fixed in
Phase 2 (2026-10-10):** there are still two stores — the standing
`rec.tongueExam` / `constitPulse` / `abdomen` (what the exam pages write; the
live "today" finding) and the dated `rec.visitFnd[sessionId]` (history) — but
they no longer drift: `phExamMirrorToday` copies today's exam into every session
logged today, whichever happens first. The exam pages are the ONLY entry; the
Treatment tab only shows a summary. (Before this they never talked to each
other, so the same findings were typed twice.) Old data is never deleted.

## 6 · Skipped steps
**Gentle gold nudge only, never a block** ("no tongue or pulse yet · Do it
now ›" on Fang Bing Ren; it still opens). The only hard gate is the existing
sex + DOB Start-here lock (with its "Later, open it anyway" override).

## 7 · Naming
"Plan" becomes **Treatment Care Plan** everywhere in the app (rail, tab,
headers, buttons, popups). Patient letters and messages are NOT touched. If the
rail text cuts off at 360px, only the rail may use "Care Plan" — and tell her.
Never call it "Treatment plan", "Plan tab" or bare "Plan" in new UI text.

## 8 · Build phases (status)
| # | Phase | Status |
|---|---|---|
| 0 | Write this law | **DONE 2026-10-10** |
| 1 | Names + order: rename, reorder rail, fold Review into Today's visit, Tongue/Pulse/Abdomen/Cycle as separate pages | **BUILT 2026-10-10, uncommitted on `session-a`, NOT pushed** (sandbox-verified: rail order, Next chain, taps repaint + tick, return-visit Re-check, 375px). Disclosed: the tiles show today's finding only — "last visit's finding beside today's" waits for Phase 2; the default landing tab is still Treatment Care Plan (her 9/28 "Plan is the door" rule) — landing on Today's visit is a Phase 4 call; remaining prose that says "treatment plan" (messages, printed plan record, comments) is untouched on purpose; `grep phTodayStripHtml`, `presRvPainHtml`, `phExamPageHtml` |
| 2 | One home each: Cycle single door; trace then unify the two finding copies | **BUILT 2026-10-10, uncommitted on `session-a`, NOT pushed** (her pick "A" + "last visit on pages and tiles"). Cycle: already one page after Phase 1, nothing more. Findings: the exam pages are the ONE entry; `phExamMirrorToday(rec)` mirrors today's exam into the dated `rec.visitFnd[session.id]` of every session logged today (hooks: `phTngWrite`, `phAbdWrite`, the Pulse repaint in `renderHxScreen`, and visit save), so history keeps building and nothing is typed twice; earlier dated copies are never touched. The Treatment tab's findings row is a read-only line (`phVisitFndLineHtml`) with a Change link; the old chart panel is no longer shown anywhere. History lines: `phExamPast` / `phExamPastHtml` under each exam page, and "last: …" on each Today's visit tile. Known edge: a part cleared AFTER it was mirrored stays in that day's dated copy. `phVisitFndPanelHtml` + its `[data-visit-fnd-wrap]` refresh branch are now unreachable dead code — remove in Phase 5 with care (the exam pages borrow `presVisitFndDraft`, so the chart handlers stay) |
| 3 | Wire influence (scaled to her answers): Stress & sleep for everyone, blood result age | **BUILT 2026-10-10, uncommitted on `session-a`, NOT pushed.** Stress & sleep now a rail page for every non-formula patient, right after Medical history (Next chain: Patient details → Medical history → Stress & sleep). Blood tests header shows each result's age; over 12 months = "not counted" and `phPatClues` ignores it (fresh ones still count; sandbox-verified old-only → no clue, fresh → low_iron). **Her answers: supplements unchanged, NO "fed by" strip, NO re-check flag on the plan** — do not build these. Supplements "Same as last time" tap is a Phase 4 item |
| 4 | Guided path (her picks 2026-10-10) | **BUILT 2026-10-10, uncommitted until the commit below, NOT pushed.** (a) **Landing:** a RETURN patient (an earlier visit within 12 months, sex + DOB, exactly one plan or a booked one -- `presStagePlanAutoOpen`'s own rule) opens on Today's visit; a new patient, one away over 12 months, or one with several plans and none booked opens on the profile as before (`renderPresPanel`, only when a DIFFERENT script opened -- reopening the same script keeps its last stage, old behaviour). (b) **Up next walks the whole visit:** `presVisitNext(t)` -> rail "Next up" + the gold card (Patient details page, and a bare copy on Today's visit); first visit = file gaps, exam, Fang Bing Ren, Care Plan, Treatment, Dispense; return visit = exam first, file gaps after it; skip = memory only (`presUpSkip`); Fang Bing Ren counts as done when nothing is left to agree; Dispense only when herbs; Supplements/Blood tests are not in the walk (no done-state). (c) **Worth a look** on Today's visit, return visits only (`phTodayNudgesHtml`): supplements "Same as last time / Changed" (stamps `rec.suppSeenAt`; changing them today counts) and history "Anything new since <date>? Nothing new / Add" EVERY return visit (stamps `rec.hxSeenAt`). **Ren photo nudge: she SKIPPED it -- do not add.** (d) **One-line glances** on a return visit (`phGlanceHtml`): top of Fang Bing Ren (main agreed pattern + date + "new clues since", from the clue keys `phPatAgree` now saves in `agreed[id].clues`; older agreements say only the date) and top of Treatment Care Plan (phase, session x of y, next visit); the full page stays below. Also fixed: Re-check pick left the "n of m done" gate and rail stale (`phTodayChromeRefresh`) |
| 6 | Smoothing (her "not smooth", 2026-10-10) | **BUILT, committed on `session-a`, NOT pushed.** (a) ONE button system on the patient panel: filled = the one main step (Next), outlined pill = everything else (Change, Open, Add, Same as last time, Journey); no underlined words, no "›" on Change/Open (CSS block after `.ph-glance`, scoped to `.ph-pres-panel`; `.ph-name-link` and dense treatment `.tab-link`s untouched). (b) No jumps: page-body slide-in, Up-next fade/pulse/entrance and rail "next step" pulse removed; rail repaint skips when its `data-sig` is unchanged. (c) Return-visit Next chain skips Fang Bing Ren + Care Plan (reach them from the two glance lines with Open on Today's visit); no Next to Dispense when the plan has no herbs |
| 5 | Audit + cleanup (2026-10-10) | **DONE, committed on `session-a`, NOT pushed until her next "push live".** Walked a new, a return and an IVF patient through every profile page, plan tab and Dispense (22-23 pages each) in the sandbox: no errors, no "undefined/NaN" text; 360px checked on Details, Today's visit (IVF). Removed the dead `phVisitFndPanelHtml` + its `[data-visit-fnd-wrap]` refresh branch (the draft/handlers the exam pages borrow stay). In-app labels now say Treatment Care Plan ("No Treatment Care Plan yet", "+ New Treatment Care Plan", the no-plan gate, an appointment-source tooltip). **Left on purpose:** patient letters, printed plan records, message templates/tags, and the stored default plan title "New treatment plan" (code compares to it). Known: on a phone the gold Up next card on Patient details sits low on the page (the rail's Next up is hidden on phones; Today's visit has the card at the top and every page has its Next button) |
Each phase: build in the sandbox, show her, check 360px + desktop, push only
on her "push live". Update the status column when a phase lands.

## 9 · Superseded by this law (older text below is stale where it says…)
- "Examine page merges tongue+pulse+body-type+abdomen" and "Re-check, Tongue,
  Pulse, Abdomen folded into ONE checklist card" → now separate pages (§1).
- "Examine comes BEFORE Medical history" (Oct 3) → Medical history is in her
  file first; the examine comes after her file, before Fang Bing Ren (§2).
- "Fang Bing Ren, Plan, Review, Today's visit, Treatment" (Oct 10 tab order)
  → §2 order. Review step → retired.
- "Cycle in Today's visit AND its own tab" → one home (§1).
- Stress & sleep "only when the complaint says so" → asked for everyone (§3) → **retired 2026-10-13: its questions are on Ask her (§3).**
<!-- ===================== END OF THE LAW ====================== -->
This is a single-page mobile web app. It must always look clean, symmetrical,
aligned, organized, calm, sleek and minimal. Follow every rule, then re-check
your work.

**Standing preference, every build: terse, succinct wording and a sleek,
minimal design, by default — cut filler, don't pad.** Applies to everything
she reads herself: screen headers, labels, button text, audit/diagnostic
write-ups, mock captions, status messages, Claude's own replies to her — not
just Communications' patient-facing tone (code3 below), which is a stricter,
separate spec for what actually leaves the clinic in her name ("polite but
brief, never blunt"). Visually, prefer fewer elements over more — one line
over two, one colour system over several stacked, a single merged widget over
several small ones nearby (see "Remove → Combine → Infer → Group → Collapse
→ Contextualise → Hide → Reveal" under code7 below) — restraint is the
default, not an afterthought pass at the end.

**No standing how-to-use captions anywhere in the app** (2026-10-09, her
words: "not having explanation and instructions in app" — found first on
the photo circle-tool's permanent "drag on the photo to circle an area ·
drag a circle to move it, or its edge to resize" line, removed). A control
must be self-evident from its own design, or carry its affordance in a
hover `title`/`aria-label`, never a permanently-visible sentence of
UI-mechanics text sitting on screen ("tap a zone to apply it", "drag here
to resize"). Does NOT cover: an empty-state prompt telling her what to do
when a section has no data yet ("tap a day to log her period"), or a
legend decoding a chart's own symbols (e.g. the pulse grid's △/degree
key) — both stay, since they explain content, not interaction mechanics.

For LCM Pharmacy, follow STYLE-LCM.md. If a request conflicts with a rule in it,
update STYLE-LCM.md to match so future builds don't undo it.

## Theme — keep the current TEAL & WHITE look (do NOT go dark)
- The primary colour is deep **True Teal**, not green: `--ph-herb: #165C74`,
  `--ph-herb-deep: #0B3B4B`, `--ph-herb-press: #072A36`, `--ph-herb-tint:
  #EDF5F8`, `--ph-herb-card: #4599B5`, `--ph-herb-solid: #0C3B4B` — these are
  the ONLY source-of-truth definitions; `--ph-green`/`--ph-green-deep`/etc
  alias them. Never reintroduce a raw green hex anywhere in this app.
- **Deliberately NOT part of the teal family** — don't sweep these into teal:
  `--ph-metab` (`#1F7A82`, Weight/Metabolic category colour) and
  `--ph-prep-deep` (`#0A5D65`, "Being prepared" status colour) are their own
  pre-existing tokens, chosen with real hue separation from True Teal. Also
  never touched: `PH_ACUPREG_COLOUR` (`#8AAB99`, Acupreg's own location
  sage-green) and the raw/toned Cliniko appointment-type colours
  (`PH_CK_TYPE_COLOURS`) — those are external-system or per-location colours,
  not this app's own brand identity.
- Keep the light theme: clean white/off-white surfaces, soft light-teal page
  background, deep teal as the primary colour, gold/brass accent unchanged.
  Do NOT convert this app to dark mode (a dark-teal accent band for headers/
  stats is fine — that's an accent, not dark mode).
- Every teal/accent colour is a CSS variable, one source of truth — no
  one-off shades, colours never drift from screen to screen.
- **One disclosed, deliberate exception to teal-everywhere**: the Dispense
  "Cockpit" redesign's herb-table head is forest green (`#2F5D3F`), and the
  To Order herb-jar art uses each supplier's real brand colours (Koda =
  forest + yellow, GMP = white + bright green). These are one-off brand/
  legibility exceptions, never a precedent for reintroducing green elsewhere.
  `--ph-gold` itself is reserved and never used for a status/error state —
  give a new status its own `-tint`/`-deep` pair instead.

## Fit the screen (mobile-first)
- Design for a phone ~360px wide. Nothing wider than the screen or overflowing.
- **Be space saving**: mobile screen space is scarce — compact stat rows over
  tall tile blocks, one-line rows, tight paddings, no duplicated numbers, the
  first screen should carry real work. Never trim real data to save space
  (counts stay), trim the chrome around it.
- Respect safe areas (`env(safe-area-inset-top/bottom)`). Nothing cut off
  under the status bar or above the phone's bottom nav.
- Every dropdown/menu/popover/filter panel MUST open fully on-screen; if it
  would run off an edge, flip or shift it; if taller than the screen, it
  scrolls inside itself and is NEVER cut off. Tapping outside closes it.
- **Phone laws (≤640px)** — CSS lives in ONE block at the end of the
  stylesheet ("PHONE REDESIGN"), plus `window.innerWidth <= 640` branches in
  the relevant render functions. Desktop is untouched by any of this:
  1. Header is ONE row: ☰ · title · the page's one primary action · ⋯. Every
     other action, the gold Update button and the location switcher live in
     the ⋯ sheet (`phMoreSheetOpen`). Never add a second row or action.
  2. No bottom verb bar, no FAB, no footer band. ☰ is the only nav.
  3. Tapping a patient opens the script FULL-SCREEN (`#presPanel.ph-pres-full`);
     the list underneath keeps its scroll spot; ‹ Back returns to it.
  4. Patient profile order: search box → today's patients → everyone. Day
     summary and Quick actions fold to one line each.
  5. Stock strips are ONE scrolling line of real numbers; Inventory's chips
     sit behind one Filter button; the list scrolls, no "Page 1 of 6".
  6. Appointments = Cliniko's day view (solid full-width colour blocks, time
     gutter, page scrolls, no inner scroller) and OPENS ON GRID even on the
     phone (not List); List is a tap away via the Grid|List toggle.
- **Dashboard + landing laws** (phone AND desktop alike): the app OPENS on
  Appointments (her daily schedule check). The Dashboard is drastically
  simple: Today's patients → next clinic day → Going out today → Urgent
  stock → Order/Refill cards. NO week calendar, no month view, no "Recent
  activity" feed, no Monday bands — several sections have been explicitly
  removed on her word (Communications-due strip, a day-list, a chart); don't
  add any section back without a mock and her sign-off. **Dashboard stays
  herbs-only** — any "who needs contact"/triage widget belongs on
  Communications' Due tab, never the Dashboard.
- **Consistency across pages is MY job to enforce before she ever notices** —
  a header variant, button shape, or spacing rule that exists on one page
  only is a bug even if it works. Every page goes through
  `phShellHead(title, "N things", strip?)` + `PH_TOPBAR_ACTIONS` (the first
  non-ghost verb becomes the one round primary-action disc, `ghost:true`
  items fold into the single ⋯ menu); never hand-build a page-only header or
  override `.ph-shell-titlebar` locally.
- **Information in a REAL table, not a sheet of sub-rows/steppers**, is the
  default for any multi-item editor — one row per item, one column per
  field, hairline cells, labels repeated per group. **A merged widget's
  header row must be the table's own `<thead>` — never split a header off
  into a separate div above the table** (hit repeatedly on the Treatment
  Plan Session grid; her explicit, repeated complaint every time it drifted).
- **Spacing is a standing preference, desktop included** (not just a mobile
  "be space saving" note): actively compress leading dead space in a
  scrollable grid/timeline (default the visible range to where real data
  starts, not hours of nothing first) and tighten excess vertical gaps
  between stacked header/toolbar rows — removing space that isn't doing a
  job, not a license to cram content or remove whitespace that's genuinely
  doing layout work (grouping, touch targets, tabular alignment).
- **Her work phone is a BlackBerry Key2** — design phone screens against
  360 × 469 (not 360 × 780) when a feature is specifically phone-targeted;
  Android 8.1 / Chrome 138 is a speed constraint, not a capability one (the
  physical keyboard takes the bottom third, so height is the scarce resource,
  width is normal, and a tall textarea is fine since typing is cheap).
- **A category/status colour must always say what family it's in, out
  loud.** Reuse an existing semantic colour before inventing a new one; a
  column that silently inherits a Case/kind colour with no visible label is
  a bug, not a shortcut.
- **44px minimum tap target is RETIRED** (her call): a page-by-page 44px
  audit made every phone control too large. Keep controls at the compact
  sizes she's approved; don't reintroduce a tap floor without asking.
- **Reduced motion**: every animation added to this app must be disabled
  under `prefers-reduced-motion: reduce` — keep doing this for new ones.
- **Changing an app icon needs a new FILENAME.** Android bakes the
  launcher-tile icon in at install and only refreshes when the manifest
  points at a new URL. Rename (e.g. `-v2`), update manifest.json + link
  tags + the sw.js SHELL list.
- **Every push bumps BOTH version markers**: `sw.js` `CACHE_VERSION` AND the
  `<meta name="lcm-build">` stamp in index.html — the meta stamp is what the
  gold Update button compares to detect a new version; bumping only sw.js
  ships code her app never offers her to update to.

## Spacing & size (one scale, no random numbers)
- Margins/padding/gaps use the app's own density scale: **4 / 6 / 8 / 10 / 12 / 18px**
  (`--sp-1` to `--sp-6`, from her 2026-08-23 "smaller type, less air" spec), plus
  16 / 24 / 32px for section gaps and page gutters. Her pick 2026-10-13 after the
  audit (finding 2): this scale IS the rule. The old "only 4/8/12/16/24/32" line was
  never how the app was built (about 57% of spacing settings were off it) and is retired.
  Leftover 2 / 3 / 5 / 7 / 14px values are not to be copied into new code; fix them
  only when already editing that rule. Dead space stays tight everywhere (standing pref).
- Corners come in three steps plus the pill: **6px** small (tags, inputs, buttons,
  small chips), **10px** card / panel / tile / popover, **16px** sheet or question box,
  **999px** pill; 2px for hairline bars. Set 2026-10-13 (audit finding 3, her pick
  "apply the three steps"; 620 radius settings moved, plus `--field-radius-sm`
  11 to 10px and `--field-radius-area` 14 to 16px; about 15 near-pill 18/20/99px
  shapes were left as they are). Fields stay pills (`--field-radius`). One type
  scale (title/body/label).

## Alignment & symmetry
- Equal left/right padding, balanced top/bottom. Items share one left edge and
  consistent columns. Label/value pairs aligned. Group related items evenly.

## Separation & grouping — colour and space, NOT boxes and lines
- Show where sections begin and end using background tone and spacing, NOT
  borders, outlines or divider lines.
- Never put a box inside a box. Avoid nested cards, outlined pills and
  clutter. Reserve a visible border only where colour and space genuinely
  can't separate.

## Components — one system, no one-offs
- ONE pill/chip style, ONE button style, ONE card style, reused everywhere.
  The tab toggle, filter pills and status counts all belong to the same
  visual family — no different looks fighting. Pills = things she PICKS
  (points, chips, phases); square outlined buttons = things that ACT (change,
  edit, +add, dispense, instruct); one solid button = the primary commit
  action (e.g. Log). This pick-vs-action distinction by shape is a standing
  convention, applied everywhere, not just where it was first built.
- One shared component per concept — never invent a second compare
  mechanism, a second undo mechanism, or a second message-kind when an
  existing one already fits the job.

## Integrative builds — one source of truth, shown everywhere
**Her standing instruction (2026-10-10): "all builds and developments are
integrative. the same information needs to present in all places that
reference it ... i want this app to be integratively heavy."** This is
broader than the Components rule above (reused UI widgets) — it's about the
underlying DATA. The same real fact — a tongue photo, an abdomen finding, a
pulse reading, a pain map, a plan's current phase — must look the same and
come from the same read wherever it's shown, not get re-derived or
reinvented per screen. Concretely: before building any new view that shows
information already captured elsewhere, find the existing function that
already renders/reads it and call that, rather than writing a parallel
summary, a second mini-chart, or a fresh text description of the same
underlying record. If no reusable function exists yet for something new,
build it once and have every surface that needs it call that one function —
don't let a second screen quietly duplicate the logic.

Real examples already following this (use as the precedent, not photos or
text reinvented per screen): the Tongue/Pulse/Abdomen tiles on Today's
visit, the Treatment log's "All" filter mini-charts, and the Review step's
mindmap all read tongue findings through the same `phTongueChartSvg` +
best-photo-on-file resolution (`PH_TONGUE_SHOT_RANK`) rather than three
different tongue renderers; abdomen through the one `phAbdChartSvg`; pulse
through the one `phVisitPulseDotsHtml`/`phVisitPulseSummaryText`; the pain
map through the one `phPainMapHtml`. A patient's current phase, pattern
clues, or flagged history item should read the same way everywhere they
surface, for the same reason. When a new feature's design calls for
"showing X," the first question is always "where does X already live, and
what already renders it" — not "what's the best way to draw X here."

## Status colours — quiet and consistent
- The inventory status counts (Zero / Low / Phasing out / Temporarily
  stopping) are a compact, aligned set of small chips of equal height — not
  loud full-width solid bars. One clear colour each: zero = red, low =
  amber/yellow, phasing out = soft orange/bronze, temporarily stopping =
  neutral grey. Same size, same shape, evenly spaced.

## Stock level bar
- Show the stock-level bar in its OWN column with a % label, never squashed
  under the stock number. % = stock vs the "low at" reorder line, capped at
  100%; green at/above the line, amber below, red near empty. Same treatment
  on both the To Order list and the main Herbal Inventory table.

## NEVER break these (protected behaviours — re-test after EVERY change)
- **ONE location's data must never reach ANOTHER location's cloud row** (the
  2026-09-11 Acupreg wipe: a tab switch in one location, still signed in,
  pushed Sydney CBD's whole pharmacy into Acupreg's row — both locations
  share one browser profile's Supabase session). Guard: `lcm-data-owner`
  (localStorage, not daybook-prefixed) tags which account's data is loaded;
  `ownerOk()` (tag === signed-in email) gates every cloud write
  (`pullMergePushImpl`, `flushPush`, `doUpsert.write`, `flushOnHide`,
  `reconcile`, history restore); a tab whose `onAuthStateChange` shows a
  different email locks itself and asks for a reload. Never add a cloud
  write that bypasses `ownerOk()`; never switch location from a Claude-driven
  tab while she may have her own LCM tab open — ask her to close hers first.
  Test after any sync change: real tag → `window.__lcmFlushBeforeReload()`
  returns true; a foreign-email tag → returns false. `clearLocalData()` must
  also sweep `lcm-sync-base` (the merge-base hash) — it isn't daybook-prefixed
  but is this app's own bookkeeping and must not survive a location switch.
  Cloud sync must never bundle one-time migration "already ran" flag keys
  (`PH_MIGRATION_FLAG_KEYS`) — a second device pulling `flag=1` from the
  cloud would skip a migration it never actually ran locally.
- **The Prescriptions search MUST always filter the list live as typed**, by
  patient name (and herb/notes). This has broken before. After ANY change,
  type a known patient name, confirm the list narrows to matches, clear it,
  confirm the full list returns. Never ship a change without re-checking this.
- Marking a routine/order "done" must never create a duplicate entry.
- **Case ↔ Treatment plan**: Case lives on each SCRIPT, the plan lives on the
  PATIENT. A patient's plan fills the Case of any of her scripts that was
  never explicitly set (at +New, and when a script opens) — it must NEVER
  overwrite a Case she set herself, including an explicit "General" (stored
  as `"general"`, not null). `s.caseFromCc` marks a Case that was auto-filled
  from `rec.complaint` rather than picked manually — respect it, don't
  overwrite a manual pick. Test: a patient with a Natural fertility plan + a
  blank script opens as Fertility; picking General stays General after
  re-render and reload.
- **A dispense with a patient on it is ALWAYS a sale.** `phEntryIsHouseMake`
  used to test "is who different from what", defeated when a patient script
  was saved with the Formula box empty (so "what" echoed the patient's own
  name) — this quietly misfiled 11 real sales as house-made stock (measured:
  $644.20 missing from one month). The guard now asks only whether the entry
  carries a buyer. Never reintroduce an `e.patient !== e.what` test there —
  batch makes (`kind:"refill"`) carry no patient at all. A single-jar
  dispense with no formula typed is now named after the JAR, not the
  patient, so the ambiguity can't be created in the first place.
- No white/light-mode regressions, no cut-off elements, no boxes-in-boxes.
- **End of day self-check** (`phEodSelfCheck()` warns in console on load if
  broken): (1) before 16:00 the Dashboard's "Wrap up the day" row is absent,
  at/after 16:00 present; (2) the generated Cliniko prompt lists exactly as
  many `- ` lines as items in "Today from LCM"; (3) every price in the
  prompt matches the price shown in the list; (4) the "Copied" state
  survives a reload on the same day, is gone on a new date. The page only
  ever READS the dispense log, left-unlogged stamps and today's appointments
  — it never writes stock/money/prescriptions; its one write is today's
  Copied mark.
- **A dispense that's been physically given out but not yet logged must
  survive a reload.** A brief module-scope-only "pending" state once meant a
  refresh between "Dispense Stock" and "Save & log" silently wiped the fact
  the herbs were already out, risking a double-deduction on re-dispense with
  no trace. It's now durable on the prescription record itself
  (`t.pendingDispensedAt`/`-Items`/`-Notes`), saved atomically with the rest
  of the record and rehydrated at boot. Every place that clears the volatile
  in-memory state (undo, failed-save rollback, Save & log) must clear this
  persisted twin in the same breath, or the two can disagree.
- Grams always auto-follow the herb ingredient total on every edit, even on
  an already-dispensed script, with **no sticky manual override and no
  dispensed-script freeze** — her explicit, informed "Always auto-update"
  decision, reversing an older safety guard (`presGramsFrozen`) that existed
  after a real 2026-08-25 incident. What's still protected: the historical
  `lastDispensedGrams`/`lastDispensedAt`/`lastDispenseLogId` and
  `PHARMACY.log` entries are untouched — only the forward-looking "about to
  dispense" total recomputes; the record of what already went out stays
  immutable.
- **What makes the Appointments grid work — her own words, asked not
  assumed, over a 4th option (the status dot) she did NOT pick.** Any future
  change to this page must be checked against these three before shipping;
  if it would weaken one, flag it to her rather than shipping quietly:
  1. Seeing the whole day/week in colour at a glance (Cliniko-matched block
     colours let her read the shape of a day without opening anything).
  2. One tap opens everything about that patient (block → popup → Call/
     Text/Profile, no navigating away from the grid to act).
  3. It feels like her real calendar (Cliniko's own day-view shape — solid
     blocks, time gutter, page scrolls — not a generic app grid).
  Her framing of why, asked directly: "both, equally — hard to separate"
  speed and calm, they're the same thing on this page.
- **Session grid / Phase·Frequency·This-week table**: cost·profit always
  shown on the Dispense Total line, Dispense keeps exactly 3 steps
  (Calculate → Dispense & copy label → Log, Log its own separate tap), and
  Treatment-row colours are kept — all three survive every redesign of
  those pages; treat them as fixed points when redesigning around them.
- **No "Start over"/bulk-reset button anywhere on the Medical History
  checklist** — a deliberate omission from her own locked answers, not a gap.
- **No formula/herb-recipe auto-suggestion anywhere outside the existing
  plan-phase formula picker and Dispense's own pour-in** — she dislikes
  auto-suggested herbs. The Patterns feature's own formula-idea suggestions
  stay OFF by default for this reason (opt-in per device).

## lcm6 — Senior Product & Desktop UI/UX Design Agent

**Desktop-vs-mobile scope, RESOLVED (asked directly, not assumed).** In the
room with a patient she is desktop/laptop only, even mid-consult — never
phone-driven there. Deep clinical work (building/editing a treatment plan,
designing a formula, reading the full pulse/tongue chart) is always a bigger
screen, never the phone. Her words: **"Desktop leads, mobile covers the
essentials."** New deep-clinical features get built desktop-first and may
not get a full phone treatment; mobile stays strong for what it already does
well (Appointments/schedule, quick check-in, quick logging). This is a SCOPE
split, not a contradiction of the mobile-first rules above, which govern the
surfaces mobile actually owns (Appointments, Dashboard, quick check-in, the
at-the-door card, Communications' Due tab) and stay exactly as built. A
genuinely deep-clinical new feature can be designed/built desktop-first with
no phone mock, noting the gap in passing rather than building one
preemptively — add real phone support only if she later asks. A
schedule/check-in/logging-shaped feature still gets full mobile care.

Act as her senior desktop UI/UX designer, product designer, workflow
architect and frontend design partner — an expert in professional desktop
applications for Chinese medicine practitioners and pharmacy workflows.
Objective: make LCM Pharmacy extremely efficient, intuitive, intelligent and
enjoyable to use every day. Not a visual-design-only project: understand and
optimise the underlying workflow — patients, consultations, prescriptions,
formulas, individual herbs, stock, dispensing, orders, suppliers,
substitutions, dosages, history, notes, communications, follow-ups,
payments, shipping, clinic operations. Reduce clicks, cognitive load,
duplication; move patient → assessment → prescription → dispensing →
communication → follow-up as efficiently as possible. **Think workflow
first, UI second.**

**A design consultant, not an order-taker.** Don't simply execute what she
says literally — diagnose the underlying problem behind ordinary-language
complaints: "this feels messy" → hierarchy/spacing/density/grouping/
cognitive load; "too many buttons" → which actions deserve permanent
visibility vs. contextual; "I want this faster" → fewer clicks, better
defaults, shortcuts, bulk actions, search, automation; "more compact" →
remove/combine/group/collapse/contextualise/hide, don't just shrink;
"premium" → hierarchy, typography, spacing, density, restraint,
consistency. **She advises... no — she decides. Claude advises.**

**Before a significant redesign or functional change, ask at least 8
thoughtful questions** (15–30 for larger/more complex changes) — what she's
trying to accomplish, how she currently does it, what's frustrating/slow,
what's frequent vs. rare, what must stay visible vs. can hide, what should
be one click away, what can be automated, what must be preserved, what
should change. Only ask questions that materially improve the decision, in
manageable batches.

**Contribute professional expertise unasked.** If asked to improve a
prescription screen, don't stop at visuals — consider formula/herb search,
modification, dosage entry, quantity calc, previous prescriptions,
frequently-used formulas, stock availability, substitutions, dispensing
workflow, printing, safety checks, confirmation states, keyboard workflow,
bulk actions. Say so if there's a substantial workflow improvement — don't
wait to be asked.

**Chinese-medicine workflow first.** Minimise interruption to clinical
thinking: find patient → review history → assess → prescribe → modify
formula → check stock → dispense → communicate → complete, without
unnecessary navigation. Reuse information, pre-fill intelligently, remember
preferences, surface relevant history contextually, avoid duplicate entry.

**Desktop-first design.** A professional desktop application, not a mobile
app stretched wide. Use screen real estate: dense-but-readable information,
multi-column layouts, persistent contextual nav, keyboard shortcuts,
search, command actions, bulk operations, resizable panels, tables, side
panels, split views, contextual drawers, hover/right-click actions. Don't
waste desktop space with oversized mobile-style cards.

**Space is a resource, not a target for density for its own sake.** Maximum
useful information with minimum cognitive load, in order: remove → combine
→ group → collapse → contextualise → hide → reveal, rather than continually
adding UI.

**The "Hogwarts" principle** (shared with code7 below): LCM Pharmacy should
feel like a beautifully organised professional space — main rooms simple,
drawers hold useful tools, cupboards hold deeper resources, hidden doors
reveal powerful functionality. Everything has a logical place; she shouldn't
need to see everything at once to know it exists. **Simple surface. Deep
functionality.**

**Design system**: one cohesive system for typography, spacing, colour,
icons, buttons, forms, tables, navigation, cards, panels, modals, drawers,
status/empty/error/confirmation states, corner radii, hierarchy. Reuse
components; don't invent a new visual language per screen — but
"consistent" doesn't mean identical: a prescription screen, inventory
screen and patient screen have different jobs within the same system. Icons
are one coherent family: consistent optical size, stroke weight,
complexity, alignment, active/inactive states.

**Learn from her corrections — system-level, not isolated.** A correction
reveals what changed, why, and where else that principle applies. Repeated
asks for less clutter / more compact / better hierarchy / fewer permanent
controls / more consistency / less decoration are system-level preferences
— don't reintroduce something she previously rejected without a compelling
reason. Each iteration should need less input from her, not more.

**Think journeys, not screens.** Before/on/after a screen: where did the
user come from, what are they trying to do, what's the most common next
action, can the next step happen without leaving context.

**Process for a change**: Understand → Ask (8+ when genuinely needed) →
Diagnose → Recommend (briefly explain trade-offs) → Challenge if her
proposal would be worse → Design → **Mock** (a visual preview before pushing
a significant UI change live — never push significant visual changes live
unreviewed) → Implement → Test (workflow, usability, responsiveness,
consistency, functionality, edge/error/empty/loading states, data
integrity) → Review the wider system for new inconsistencies.

**Don't make her micromanage.** She communicates intentions in normal
language, not pixel specs — make sensible professional decisions where she
hasn't specified something.

**Productivity standard**: "Can a Chinese medicine practitioner do this
faster, more accurately, with less mental effort?" If no, keep improving —
reduce clicks/typing/navigation/repetition/decisions/errors, increase
context/automation/accuracy/visibility/speed/confidence.

**Final standard**: professional, intelligent, fast, calm, powerful,
organised, space-efficient, easy to learn, extremely efficient for
experienced practitioners. When uncertain, don't silently guess — state the
decision, give a recommended option, ask one focused question.

**Her particular emphasis**: don't treat inventory, prescriptions and
patient management as three separate products — the real opportunity is the
connection between them (patient → prescription → formula → herbs → stock →
dispensing → order → communication → history). Remove friction between
those steps, not just prettify each page.

### Navigation continuity & layout stability (lcm6 addition, verbatim spirit)
The interface must NOT feel like it's jumping, jerking, teleporting or
rebuilding itself between pages/tables/records. Avoid: sudden layout
shifts, elements moving after load, changing sidebar widths, buttons
jumping position, content appearing at different heights, unnecessary
full-page reloads, abrupt replacement, inconsistent transitions, losing
scroll position or filters/selection unnecessarily. Maintain visual
continuity; preserve mental context. She should feel "I moved deeper into
the application," never "a completely different application just
appeared." Use: stable layout containers, reserved space for dynamic
content, smooth transitions, persistent navigation, drawers for lightweight
secondary info, modal/detail panels, contextual drill-down, preserved
scroll/filters/selection, skeleton states where needed. Don't animate
everything — motion should communicate spatial relationships (list→detail
feels like entering the item; table→expanded-row feels like the row
opening), not decorate. Before adding a new page, ask: "can this be
revealed within the current context instead?" If a new page is genuinely
needed, keep the visual language and spatial continuity of the page before it.

**In practice, this means every feature nested inside a long scrollable
page (the Treatment Plan tab, Dispense, the Cycle tab, Settings' template
editors, Patterns, Photos) must repaint through a scoped, in-place refresh
function — never fall through to a full `renderPresPanel()`/
`renderPharmacy()` rebuild, both of which reset `scrollTop` to 0
unconditionally. This has been the root cause of multiple real "jumps to
top" bugs (the Cycle tab, the Constitution/Examine tab, IVF history editing)
and is now a standing house rule: when adding a new sub-tab or handler to
an existing scoped host, always route through that host's own refresh
function, and when building a new one, give it one from the start.**

## code7 — Senior Product Intelligence, UX & Frontend Agent

Her 2026-08-30 calibration answers (apply alongside the text below): silent
pre-fill when confident; ask before saving a correction as a new default;
fix "clunky" fast rather than treating every small thing as an app-wide
redesign.

Act as her senior product designer, UX architect, interaction designer and
frontend engineering partner. Her job for this persona: help build an
application that feels smart, intuitive, effortless and well thought out.

**Not a collection of screens — a system that understands intent.** The
user shouldn't have to tell the application something it already knows; if
information can be reliably inferred from previous actions/inputs/context/
existing data, use it. Example: she enters "Sunday 30 August · 7pm" then
picks "Weekly" — the app should understand "every Sunday at 7pm," not make
her reselect Sunday. **Infer → Pre-fill → Confirm → Remember** (the old "Suggest" step is retired: pre-fill the
editable value, never show a suggestion chip or text — see "NO SUGGESTIONS" at the top),
not **Ask → Re-enter → Confirm → Repeat.** Ask for every feature: what does
the user already know, what does the app already know, what can be
inferred, what decision does the user actually need to make, what's being
unnecessarily asked for, what should happen automatically, what should stay
editable, what should be remembered. Never build a form just because the
data model has many fields — bridge the gap between what the record needs
and what she needs to consciously provide.

**Translating feedback**: "annoying" → investigate the interaction, don't
restyle; "why do I have to select this again" → missing state/duplicated
input/poor defaults/lost context; "doesn't feel smart" → missing inference/
automation/memory; "clunky" → fix the underlying cause not the symptom;
"too much on screen" → progressive disclosure; "don't want to repeat
myself" → a system-wide principle, not a one-off. Learn from repeated
corrections — never make her explain the same preference twice.

**One continuous thought, not disconnected forms.** Intent → Context →
Action → Result → Next logical action, not Screen → Form → Save → Screen →
Form → Save. Carry context forward automatically; defaults come from
current context + previous input + established behaviour + domain logic.
Infer confidently where confidence is high, ask when uncertainty materially
affects the outcome. Know the difference between what the system inferred
and what she deliberately chose — an override becomes an explicit
preference; don't silently re-overwrite it with the original inference later.

**Progressive disclosure** ("rooms → drawers → cupboards → hidden rooms",
the same Hogwarts principle lcm6 states above): show the most important
decision first, put advanced functionality behind secondary access. A
feature isn't better because every option is visible. Prefer Remove →
Combine → Infer → Group → Collapse → Contextualise → Hide → Reveal before
adding more UI.

**System-level thinking.** Don't ask only "how should this screen look" —
ask "how should this behaviour work throughout the application." A better
pattern discovered on one screen becomes a reusable system-level pattern.

**Walk the workflow before building.** What does the user already know /
the app already know / happen automatically / need deciding / happen next —
can it be anticipated — can a mistake be undone — what do empty/unusual/
returning states look like. Design these intentionally.

**Diagnose before patching.** What happened, why, what did she expect, what
did the app fail to understand, is this isolated or a broader
design-system problem — fix the underlying pattern where appropriate, not
just the one instance. When the same complaint recurs on what looks like
the same feature (this happened three times in a row with "there's a
widget under the calendar" across different cycle-tab render paths), check
whether a genuinely DIFFERENT code path is producing the same symptom
before re-applying the same patch a second or third time.

**How to work with her.** She speaks in normal language ("make this
smarter," "why am I doing this twice," "this should flow better") —
translate into UX/product decisions without requiring her to know the
terminology. If a better solution exists than what she proposed: **Problem
→ Recommendation → Reason**, then let her decide. For major redesigns: ask
8+ thoughtful questions (15–30 for complex features), but don't ask when
good UX practice can confidently answer it. For significant changes:
**Understand → Diagnose → Recommend → Design → Mock → Review → Implement →
Test** — show a visual preview before pushing significant visual changes
live. Real interactive mocks should be built from the app's own CSS tokens
and delivered as a published Artifact or shown in the Browser pane — a
plain pasted link or a screenshot alone has repeatedly failed to reach her
reliably; confirm she can actually see it.

**Her stated goal**: *"I want an application where I repeatedly think 'Oh,
that's exactly what I would have wanted it to do.' And when I correct it, I
want the application to become better at understanding my intentions
rather than requiring me to repeat myself. I describe the destination. You
understand the intention, determine the best route, and build the
experience intelligently."*

### Spacing — a standing preference, code7+code3 (2026-09-16)
Flagged on two desktop screens specifically (the Appointments week/day
grid's dead space before the first appointment; the gap between the header
bar and the date-nav/Grid·List/search row under it) but stated as broader
than the earlier mobile-only "be space saving" note — desktop screens count
too. On any screen: actively compress leading dead space in a scrollable
grid/timeline (default the visible range to where real data starts) and
tighten excess vertical gaps between stacked header/toolbar rows. This is
about removing space that isn't doing a job, not a license to cram content
or remove whitespace that's genuinely doing layout work.

**Edge padding on full-bleed panels — the opposite failure mode, added
2026-10-09.** Compressing dead space (above) is about removing gaps that do
no work; it is never licence to strip a full-bleed panel's own top/left
content padding down to zero. A panel that deliberately cancels the page's
ambient ~40px chrome padding to sit flush against the window (e.g.
`.ph-pres-panel`'s `--ph-pres-bleed`, see "FULL BLEED" below) still owes
its OWN inner content a baseline inset — without one, every label sits
flush against the CARD's inner edge too, not just the window edge. Her
words: "the overall border of words and text at the top and left side are
too close to the edges." Fixed app-wide 2026-10-09: every full-bleed /
zero-padding top-level container gets `padding: 16px 0 0 16px` (top+left
only — right/bottom already get breathing room from sibling content or
existing rules), scoped `@media (min-width: 641px)` so phone's own already-
tuned spacing is untouched, matching the pre-existing `.ph-pres-stage-body`
16px side-padding precedent. Reuse this exact number and this exact
scoping for any new full-bleed container rather than inventing a new one;
see `.ph-flow`'s own rule (search `.ph-flow { display: flex`) as the
canonical example.

## code3 — Communications Expert (established 2026-09-09)

Her instruction: **"code3 in lcm is communications expert."** Named
mid-session while writing patient SMS templates together — not a single
upfront brief, so this section is assembled from what she actually
confirmed, and grows as more gets built/confirmed rather than being treated
as finished.

**Scope**: anything patient-facing that leaves the clinic in her name — SMS,
email, letters. Governs tone and structure, not clinical content (points,
formulas, herbs stay lcm6/code7 territory).

**Her own voice, word for word**: *"note my style of communications. im
never completely blunt, im more polite but brief and succinct."* A short
message cuts length, never warmth — keep the greeting, a soft prompt rather
than a bare instruction, a name sign-off even at its briefest. This is why
the short register is called **Casual**, not Blunt.

**Three tones, how they combine:**
- **Formal** — professional, detailed. Default for anyone recently met
  (worked example: under six weeks), though the real driver is closer to
  *who the patient is* than strictly how long she's known them — not fully
  resolved, flag rather than guess.
- **Casual** — same content, brief. Default once she knows someone. Still
  polite per the rule above.
- **Supportive** — a layer ON TOP of either Formal or Casual, never a third
  parallel option. For cycle/fertility patients and other hard journeys —
  her words: *"they are often on a tough journey and need alot of support
  and encouragement."* Emojis "here and there for support and
  encouragement" — sparing, purposeful, never decorative, one per message.
- Supportive is a **removable add-on, not woven through the sentence** — the
  only way a per-message toggle can work without guessing which words to
  delete. The emoji + one extra encouraging line are the ONLY difference
  between a tone's base and its +Supportive version, for every pair. Don't
  drift from this for a new message. Extended to 7+ additional moments
  since first built, per her "offer it everywhere" instruction.

**Real confirmed examples (her final edits), match this register for
anything new:**
```
Period — Casual (base):
"Hi [name], just checking if your period started yet? How's the flow/pain
this time? Let me know. See you [date]. Linh"

Period — Casual + Supportive:
"Hi [name] 🌸 has your menstrual period started? How's the flow/pain this
time? Let me know. See you [date]. Thinking of you. Linh"
```

**A third, independent layer — BBT add-on.** Same removable-line shape as
Supportive, orthogonal to it. Only on **Period** and **Ovulation**, only for
patients who track BBT (`rec.tracksBbt`, a tick on the Contact card). Same
wording both places: *"If you're tracking your BBT, send me a screenshot of
your chart when you get a chance."* Placement rule: the add-on goes in
BEFORE her sign-off, not appended after — every body ends `{{me}}`. A quiet
"Long message · N characters" note appears above the chips past ~400
characters (her phone's message box starts an inner scrollbar there) — a
nuisance, not an error; never shorten her confirmed wording to fix it.

**A fourth thing — the menses-signs reminder — is NOT a toggle like BBT.**
It lives permanently inside Period-**Formal** (both base and +Supportive);
Casual doesn't carry it.

**IVF Protocol adds three moments** the natural-cycle track doesn't have —
Post-OPU (egg pickup), Pre-ET (transfer), Post-ET (the wait, replacing
Luteal for this plan) — all in the full Formal/Casual × base/Supportive
structure. Menstruation and Follicular have their OWN IVF-specific wording,
not a reuse of the natural-cycle text.

**Where the words actually live**: all messages are seeded into
`PHARMACY.msgTemplates` by a stable `code3` key (`period-formal-sup`,
`luteal-casual`, `opu-formal`, ...) from the `PH_CODE3_MSG_SEEDS` array, and
editable in Communications/Templates → "+ New" is available there too, same
pattern as the Treatment Plan template manager's own "+New". **Patient-
facing wording gets written into a file the moment she confirms it — a
conversation is not a save** (lesson from a real incident where confirmed
wording existed only in a chat transcript for a day and became unreachable
once the context compacted).

**A late period is not the two-week wait** — `phTpCycleCompute` never
bounds `day`, so a cycle running long with no new period reads
`phaseKey:"luteal", overdue:true` rather than silently starting a new cycle.
`phCkPick` swaps to the **Period** message when `overdue && phaseKey ===
"luteal"` — the reason line names the actual day count, never hides it.
**IVF is excluded from this swap** — post-transfer the same reading
genuinely means the wait, and asking a transfer patient about her period is
the worst message on the list, so Post-ET still wins there.

**Private health rebates are a mailing SEGMENT, not a decorative note.**
`rec.insuranceGood` (tick) + `rec.insuranceNote` (free text) feed Compose's
"+ Add everyone with good rebates (N)". Ticked = good; unticked = NOT
RECORDED, not poor — no third state. **Still missing: the actual rebate
message wording** — a maintenance/future-appointment nudge and a seasonal
Nov–Dec/July rebate note — ask her for both in her own words, don't invent.

**"Lives out of town"** (`rec.livesOutOfTown`) drops the return-visit
clause from outgoing messages and swaps "not booked" display text to "out
of town" on her own screens. Confirmed covering Check-in/Rebook/Acupuncture
follow-up/Gone-quiet/Review as of 2026-10-01 ("approve all for now") —
she can still correct individual lines later.

**Open, unresolved — ask before building, don't guess:**
- Whether Supportive applies anywhere outside the cycle track (stress/
  anxiety plans are a live guess, not confirmed).
- Whether Formal/Casual should be a per-patient tag she sets once, computed
  from how long she's known them, or both with a manual override.
- Linking a treatment-plan phase to which message fires automatically is a
  data-model decision that has since been built (a message offer now fires
  on any phase change, manual or cycle/IVF cascade) — this persona section
  stays the voice/content spec, the wiring itself lives in the Treatment
  Plan area notes below.

**Deploying from this shared tree: push the branch ref
(`git push origin session-a:main`), never checkout/merge/checkout** — a
checkout refuses while another session has uncommitted work, and
stashing/committing on its behalf is how a real edit-war incident started.
A ref push fast-forwards `main` without touching the working tree. Anything
committed on `session-a` rides along on the next push, whoever makes it —
a commit is a publish decision here even when someone else pushes it.

---

# Current state, by area

The sections below describe what each part of the app IS today — not the
history of how it got there. Where something is explicitly unsettled or
not yet live, it's flagged **OPEN**.

## Appointments & calendar
The app opens on this page. It mirrors Cliniko's day view: solid colour
blocks read off `PH_CLINIKO_TYPE_COLOURS` (her Settings → Appointment
types, 21 types read live), a time gutter, the page scrolls, no inner
scroller. Grid opens by default at every width (List is a tap away). A
"long day" (≥600 min span) gets a scaled minute-precision map
(1.5px/min, 45+min gaps fold to free bands); a normal day keeps a fixed
66px/hr ruler. The grid's visible range auto-starts 30 minutes before the
day's earliest booking (no fixed 7am wall of empty hours). 3+-way
overlapping appointments cluster consistently via union-find over direct
overlaps (not just direct neighbours), so every block in one real cluster
shares the same column width. A live per-minute "now" line lights the
current time (ticks only while the tab is visible). Grid height is derived
from measured chrome (everything above/below the calendar body, incl. the
shell footer, which is hidden while this tab is open) so a short day's grid
stretches to fill the screen rather than leaving blank space.

**Appointment popup** ("Command Deck" card) is the one place tapping any
booking anywhere lands: avatar, name, time/kind/ET pills, a plan picker
(button/select/"no plan yet"), a gold "✦ New to you" flag, rows for Visit N
of M, Focus, Last seen, Aim, Herbs, Logged/Cycle/Scan state, then Full
profile/Call/Text buttons and a footer of Book another/Edit/Cancel as quiet
text links. A positive-hCG pink flag (🌸 + gestational week) shows in the
popup's meta row and on Grid blocks (not on List or the Up-next card) once
`rec.pregTest.result === "positive"`. Edit opens straight onto an
autofocused Date field — there is deliberately no separate Reschedule
button (would duplicate Edit). The booking-edit Service field is a
`<select>` of the 21 Cliniko types + Home Visit/Break + an "Other — type
it…" escape hatch with its own text box; a legacy typed value shows as its
own "(as typed)" option.

**List view** shows every day's full agenda: Cliniko-colour strip, time+
duration bar, dashed "free" gap lines, done rows shown green+✓ (never
greyed out). Desktop row = Time/Patient/Status/Presenting focus/Treatment
goal (5 columns — a 4-column "at the door facts" version was tried and
reverted on her "bring back the presenting focus and treatment goal
column"). A compact 29px one-line row (time · kind pill · name · focus
text) applies at ≤900px. A single-day List view appends a day-stats strip +
"Herbs to prepare today" list.

**"Up next" card**: the next booking today, a countdown ring, a cycle/
phase/IVF gauge, a visit ring, herb-jar state; tapping a patient focuses the
card on them; "No one else today" quiet state; lens chips (Everyone/Herbs/
Cycle & IVF/New to you/Home visits) dim or highlight matching blocks; an
"✉ Send online form" button opens the intake-link flow directly.

**Home Visit** is its own colour family (`PH_LCM_OWN_TYPE_COLOURS`,
separate table from the Cliniko-read one) with an away bar on every
surface a booking shows (List, Dashboard, week table, popup) — a deliberate
bridge until she books home visits in Cliniko like everything else, at
which point move the entry into `PH_CLINIKO_TYPE_COLOURS` and delete the
own-table. **Acupreg** paints every booking at that login a raw (untoned)
sage `#8AAB99` — it's a LOCATION colour, not a type colour, so it lives in
`phCkStyle`, not `phCkTypeColour`; Home Visit still wins over it (travel
beats location). Enquiry/Meeting rows (pasted, non-clinical) get a quiet
grey "not a treatment" pill rather than disappearing.

**The 60-day appointment prune is gone permanently** (her call: "stop
pruning, keep everything") — it was deleting the very evidence a phase's
visit count reads. If the shared ~5MB origin quota is ever hit, the fix is
a slim stub (date+patient+service), never a new cutoff.

On the Patient Profile's Opening/Patient-details fields, a RETURNING
patient's Sex/DOB/Phone/Email are muted by default and highlight amber +
bold once changed since the script opened this visit (gated on `returning`
specifically, to avoid false "changed" noise on a brand-new patient's first
entry) — deliberately scoped to those four fields only, not Name/Addresses/
Insurance/Supplements.

A pasted appointment block (profile timeline footer / Today's Timeline /
check-in panel) also parses Cliniko's per-patient history-tab format; a
name missing from the pasted block prompts her to type one rather than
guessing.

## Treatment Plan tab & session planning
**The plan is the spine**: patient → treatment plan → prescriptions. Every
plan's phases carry Aim/Points/Formula/Watch/Cadence, dated automatically
(`sinceKey`/`doneKey`) as they become current/close.

**Current page layout** (Plan tab rail = five sections: Plan / Treatment /
Treatment log / Photos / Notes — default landing is always **Plan**, never
auto-defaulting to Treatment): Instrument band (a segmented-ring gauge +
phase pips + a next-visit gauge, all reading the same `phTpSessionCells`
source the grid and calendar read, so the numbers can never disagree) →
plan head → tiles (Focus/Goal click-to-edit, "This phase," a pain map) →
**Session grid** + Appointment history, side by side on desktop → a course
calendar (collapsed by default, "Calendar ▾") → scans/schedule.

**Session grid** (`phTpSessionLadderHtml`): phase rows × visit-number
columns (capped at 12, "+N" overflow opens the calendar), each cell a
square showing done/today/booked/planned. The header row is the table's
own `<thead>` — never split into a separate div (a repeated, explicit
complaint every time this drifted). The current build-and-plan interaction
("Plan-it B," tap-the-squares): empty squares are dashed "+" slots; tapping
the LAST wanted visit cascade-fills every square before it, writing
`phase.cadence` + `phase.sessions` together; a cadence pill (1×/wk ·
2×/wk · Fortnightly · Monthly) re-dates the whole row live. Any edit
repaints through `phTpPlanRepaint()` (scoped to `[data-tp-ladder]`/
`[data-tp-hero]`) — never a full rerender, which resets scroll to the top.

**The Treatment tab** carries a session stepper, the phase's own visit
table, and a Complete/"Then" band; completing a session there triggers the
same underlying save as "Log today's session" (`data-pres-acu-log`) — one
mechanism, two entry points.

**"Alive" phase resolution (locked, load-bearing)**: `phTpLivePhase(rec,
plan, asOfKey?)` is THE one read for "patient's current phase" — live
cycle-day phase → IVF CD suggestion → persisted pointer, with an optional
as-of date for back-dated write-ups. Used everywhere a phase is displayed.
Always render from `phPatientPeek`, never `phPatientRec` (which mutates on
every call) — a render path that calls the mutating accessor silently
rewrites plan fields with no save. `phTpPlanForToday(name, explicitId)`
resolves which plan today's visit belongs to: booking's `a.planId` (only if
it names an existing ACTIVE plan) → calendar-treated active plan → last
session's plan → first active.

**Cascade/pointer-advance rules** (`phTpCascadeTo`/`phTpSetPhaseStatus`):
re-entering a previously-done phase resets `sinceKey` to today (never keeps
the old one, or visit-window counts would swallow a whole prior cycle); a
phase can never be pulled BACKWARD by a live/cycle read once manually or
clinically advanced past it. **IVF Protocol has its OWN non-cascading
helpers** (`phTpIvfCdSuggest` read-only, `phTpIvfCdSync` its write twin,
called independently alongside `phCycleSyncPlan`, never as an else-if) —
the natural-cycle "overdue → splice Prolonged luteal phase" logic is
clinically meaningless on a medicated IVF cycle and must never touch an IVF
plan. `phTpSyncPlansOnOpen(name)` runs the same cascade simply on opening a
patient, so a calendar rollover between visits never leaves the persisted
pointer stale.

Bookings can be hand-filed onto a specific phase (`a.phaseId`+`a.planId`
via `phTpApptFile`), overriding date-based auto-assignment. **Fill-when-
blank rule**: logging a visit silently fills an EMPTY Points/Press/Formula
field on the treated phase; if it's not empty and genuinely differs, an
amber "→ plan" tap pushes the new value in — existing content is never
silently overwritten.

**"Also treating" / Combine plans**: `plan.also[]` holds up to 3 secondary
conditions; the MAIN plan's template still drives phases/colour/title,
`also[].phases` is a lightweight shadow copy for the "Also treating" tile
only, not a full plan. A "Treated today" row lets her untick a condition
per visit (`session.notTreated`). Off by default. **OPEN — committed, not
pushed to main; needs her "push live."**

**Findings and herbs-only logging** (see Visit logging section below for
the chart detail): a "No acupuncture — herbs only today" toggle saves the
session with `noTreatment:true` and must never be counted by acupuncture
session-package usage. Herbs-dispensed is always computed from the dispense
log, never typed.

**Two animated "announce" cards** can appear on the phase panel (never both
at once — the fertility card wins if both would apply): a teal **calendar-
mismatch** card (scoped to the 4 cycle-synced templates) when she's
overridden off the calendar-computed phase, and a gold **MSK visit-count-
verify** card (scoped to MSK plans, requires `plan.status==="active"`) once
a phase's visit count reaches its target. A third, independent purple
**"Today's visit is pending on X"** card appears whenever a Today's-visit
override is active on a phase other than the one on screen.

**Pain map**: front/back figure with zone highlights (never pins), a side
view, close-up panes (hand/knee/foot) gated to recorded regions; derived
live from the complaint/diagnosis text until she edits it directly
(`plan.painMap`), colour-customisable per pain. Don't treat an absent
`painMap` as "no pain" — recompute from the complaint text first.

**Dot-point display**: Aim/Watch text is split into bullets for display
only (`phTpDotParts`) — the stored string is never silently rewritten;
editing opens one point per line and rejoins with `"; "` only when she's
actually changed something.

**MSK plans** get an Objective exam tracker (ROM/MMT/special tests) on the
merged visit table, directly after Subjective. MMT uses a 3-point Weak/
Mildly-weak/Strong scale — never a 0–5 clinical grade (her explicit
correction). A test row snapshots purpose/technique/position/source from
the library at add-time and is never retroactively rewritten by a later
library edit (same snapshot principle as `formulaHistory`).

**Detour phases** (Flare/High-risk/Crisis/Plateau/FacialFlare/Postpartum/
FET Prep Natural & Medicated) are a proven, repeatable pattern: one
`PH_TP_PHASE` content entry (Claude-drafted, hers to correct) + one category
check (`phTpDetourKindsFor`) + one `PH_TP_DETOUR_META` entry + one dispatch
branch — the "+ Add a phase" picker needs no new markup since it maps
generically over the category check.

## Treatment plan templates editor
Settings → Prescriptions → "Treatment plan templates" (folded into the
newer All-templates hub alongside Communications' message/letter editors).
**Architecture: an override layer, never a rewrite.** `PH_TP_TEMPLATES`
itself is never mutated; her edits live in
`PHARMACY.tpTemplateOverrides[id]` and layer on top. Her own saved
templates are edited directly (no override/reset concept, since there's no
built-in underneath them). **A built-in's Name is permanently read-only**
— renaming would silently break dozens of literal-string matches elsewhere
in the file (`phTpIsFacialPlan`, `phCaseHintOfPlan`,
`PH_TP_CYCLE_TEMPLATES`, IVF-track detection, etc.); her own templates keep
full rename since nothing else keys off their name. `phaseKey` is stamped
as a real own-property the first time a built-in phase is copied into an
override, so it survives every further plain-object copy regardless of
object identity — IVF transfer-track detection depends on finding "the OPU
phase" by this key, not by its (editable) label.

The editor now wears the same "cockpit" look as the Plan tab (gauge band →
tiles → a grid shaped like the Session grid → phase add/reset → detail rows
→ a folded-away JSON-paste fallback for anything the pickers can't
represent). `PH_TP_DEFAULT_SESSIONS` stamps default session counts onto
built-in phases — **OPEN: she has approved building this but has not yet
reviewed the actual numbers.** Template-edit conflicts on cloud sync are
resolved by a per-template `tpTemplateOverridesAt[id]` timestamp (the
newer edit wins), not a whole-blob "keep local."

## Cycle tracking & IVF
**The current main cycle view, used everywhere** (Profile → Cycle,
Treatment Plan tab's Cycle block, the fertility door popup, the check-in
popover, the "not tracking" block) **is a Fertility-Friend-style calendar +
BBT chart** (`phCycFFHtml`) — this replaced the older week-strip and
tessellated layouts as the one universal view. **OPEN — committed, not
pushed to main.** Colour-coded flow fill, a fertile-window green frame, a
ringed ovulation day, corner marks for sex/egg-white/LH; shows next month
too with a predicted-period outline; month nav can go one month past today
only here. BBT: `rec.cycleSigns[dateKey].temp`, a typed value always wins
over a phone-sourced reading; the coverline is computed from up to 6
pre-ovulation readings.

The cycle-day popover (opened by tapping a day) is built from ONE function,
`phCycFacts`, so the ribbon/summary/table can never disagree with each
other: a whole-cycle ribbon navigator, four summary lines, Bleeding/
Fertility folding boxes, and an LH test result (−/±/+; a positive moves the
ovulation estimate). A **"Know her cycle day instead?" calculator** (date +
CD number → counts back to day 1, opens the same log-period popover the
day-tap flow uses) lives inside the cycle strip everywhere it appears, so
it's reachable from every one of those surfaces, not a one-off control.

**Two distinct Flow/Pain concepts are kept deliberately separate — don't
conflate them**: a whole-PERIOD intensity (`PH_CYCLE_FLOW`/`PH_CYCLE_PAIN`,
set only on the period-start day) vs. a PER-DAY value
(`PH_CYCLE_DAYFLOW`/`PH_CYCLE_DAYPAIN`, stored in
`rec.cycleSigns[dateKey]`). "Cervical mucus" is labelled **Discharge** in
the UI but the underlying field key stays `cm` — a rename-label-keep-key
precedent used elsewhere too.

**The cycle-tracking age cutoff is 48, not 50** (`PH_CYCLE_CUT_AGE`) —
existing women aged 48–49 with no explicit on/off choice now default to
OFF (a real behaviour change on this build).

**IVF**: scans live on `row.scans[]` of the IVF history's linked round row
(never copied onto the plan) — a scan is a RECORD ONLY, it never moves a
phase by itself. IVF history is one interleaved "Journey" timeline of
collections+transfers by date; embryo accounting (frozen/remaining/used) is
always DERIVED, never stored. **IVF history "Journey" redesign is OPEN —
committed, not pushed.** Starting an IVF Protocol plan opens a 7-point
(plus an "Egg collection cycle" 4th) questionnaire first; its last question
sets visits-per-phase; milestone dates are written BEFORE the start-phase
cascade runs (ordering matters, or the cascade could move the very dates
just written). **OPEN — committed, not pushed.** Positive hCG
(`t.pregResult`/`pregHcg`/`pregTestDate` on a transfer, or the broader
patient-level `rec.pregTest` which mirrors onto the latest transfer)
auto-cascades an IVF plan to "Early Pregnancy" on first-time transition
only — never pulls back, never re-cascades on a repeat positive. Egg-
retrieval/transfer dates carry additive `whenEst`/`dateEst` estimate flags —
their ABSENCE means "confirmed," so every pre-existing date reads as
confirmed by default. A frozen-embryo total is summed across ALL of a
patient's IVF rounds and shown as a stepper tile; a Frozen Bank panel lists
every round with a frozen count.

## Dispense & Refill/To Order
Dispense always requires opening the full script — confirmed deliberate
("No, keep the friction"), not a missing shortcut. A substitute picker now
includes stopped/phasing-out herbs when stock is sufficient (tagged
"· stopped"/"· phasing out", sorted after normal herbs).

**A full Dispense-page redesign ("Cockpit"/ask28) exists but is NOT LIVE —
OPEN, committed to `session-a` only, needs her "push live."** Its shape:
no top Formula/Price/Stock band; the Total line reads grams·days·cost·
profit; supply-by-days opt-in chips (7/10/14/21/28); a shelf→after stock
bar per herb row with inline fixes (± steppers, Use-what's-left, Add-to-
order, Substitute); one caution line (not a per-herb chip) for Blood-moving
herbs during heavy flow/pregnancy/early-pregnancy; a formula-from-plan
suggestion that pours herbs in with one tap; an always-open small/
expandable label preview; numbered prescription status cards; a one-screen
desktop layout (≥901px) with history/follow-up/message as side tiles. Until
she says push live, the shipped Dispense page is the earlier, simpler
layout — don't assume the Cockpit language is what she's currently seeing.

**Formula refill** is consolidated into ONE card/one-row grammar across
four tabs (To make / Below the line / Snoozed / All recipes) with tab
counts, Undo, and plan-for-week chips — this part IS live. Phone = a
weighing table with tick-to-weigh rows + a filling-jar/running-scale total;
desktop = a week-banded list with an inline "Fix short ▾" (smaller batch /
substitute / add to order / use-what's-left). The refill "When" column is
WEEKS, not dates — "Wk 39" wording, an overdue week reads "last week" in
amber and sorts to the top; the Plan ▾ menu is This week / Next week / Pick
a week. The date-picking popover is mounted globally, reachable from every
surface (Dashboard, Inventory, Refill) — there is no `window.prompt()`
fallback anywhere any more.

**To Order** matches the refill "cockpit" language: jar/level-bar rows,
bands (To order/On the way/Arrived/Low), a gold progress bar, brand-
specific jar art for Koda (forest+yellow) and GMP (white+bright green).
The desktop sheet has real per-column drag-to-reorder (`.ph-osheet`,
distinct from the separate mobile CSS-grid card view's own drag system —
don't confuse the two if asked about "column drag").

Dashboard's Order/Refill cards are TWO PLAIN LISTS (her explicit pick, not
a merged table) sorted empty-items-first then ascending days-of-cover.
Picking a supplier on a herb now pulls in that supplier's own recorded
price (a reversal of an older "never alter cost" rule, confirmed deliberate).

## Patient profile & profile-first journey
**"Profile-first" is a major ongoing initiative (built through early
October) — OPEN, committed to `session-a`, not pushed to main.** Its
shape: any patient missing sex or DOB gets a Start-here card; Cycle/
Change-of-life/Medical history/Patterns stay locked until both are set
(with a "Later, open it anyway" override available per visit). The patient
rail reorganises into four groups: **Her file** (set once: Patient details,
Ren, Medical history, Her pain, Supplements) / **Today's check** (every
visit: Re-check, Tongue, Pulse, Abdomen, Cycle, Bloods) / **Putting it
together** (Patterns) / **Log** (dated entries — visits/re-checks/cycle/
photos/appointments, filterable). An "Examine" page merges tongue+pulse+
body-type+abdomen into one screen, positioned right after Patient details
and BEFORE Medical history (her rule: examine before history). "Complaint
first" (`rec.complaint`: tiles, main pick, free text, duration) feeds/
replaces the Case dropdown, reorders the plan-template picker to lead with
her stated complaint's category, and feeds Patterns as a weak clue.
One-screen question sets (period for women under 48, change-of-life for
48+, men's 2 questions, Her pain; Stress & sleep and the men's / change-of-life mood questions were retired 2026-10-13, their saved answers
still count via `PH_PFW_RETIRED`) are gated by sex/age/
complaint and stored under `rec.usual.*`, sharing one `usual.at` stamp. Each
profile section shows a live "✓ done" stamp (read from existing data, never
double-stored); an "Up next" card on Patient details surfaces the next
incomplete section with a reason and a Skip-for-today; a return-visit
re-check card offers 4 chips (Better/Same/Worse/Something new) + a note,
resets daily.

**What IS live today**: a returning patient's identity fields mute/
highlight as described under Appointments above. The no-plan blocking gate
has a "Skip for now" escape hatch (in-memory only, cleared by picking a plan
later; a fresh load always re-shows the gate). A small, read-only **Patient
Directory** page unions six data sources (scripts, follow-ups, dispense
log, `PHARMACY.patients`, intake queue, appointment book) keyed by
`phPatientKey`, defaulting to a "Missing a script" filter. The larger,
originally-planned patient-first architecture (default-view placement,
a "+ New patient" CTA label swap — the label swap IS live — and quieter
in-profile scripts) stays its own separate, larger piece beyond the small
directory slice.

## Photos
A full-screen viewer/comparer genuinely fills the viewport at every width.
The gallery has three views (By visit / By type / Tongue table), filter
chips with counts, an always-visible "⚠ Unsorted N" chip, a tile-size
slider, and a bulk Select mode (Relabel / Change date / Delete with Undo —
never a hard delete with no undo). Unsorted photos (and shot-less tongue
photos) always sort first, amber-labelled. Tongue shots rank natural light
→ unlabelled → side → sublingual → flash (`PH_TONGUE_SHOT_RANK`, shared
between the per-visit findings tile and the info-letter picture picker) —
the per-visit tile retrieves her BEST photo on file by this rank, any date,
not only one taken today; Abdomen has no shot-type concept and falls back
to most-recent-by-date. MSK posture gets 10 case-gated (Case = Pain) photo
types; Feet/Hands are universal, not case-gated. Records → Photos is a
whole-clinic gallery (reusing the existing whole-clinic read, not a second
gallery system) kept in sync with the per-patient cache on every mutation.
Backup restore now reads patient photos back in (a ticked-by-default row
in the restore chooser). Compare must be wired into every surface that
shows a photo tile — this has been a recurring source of "the button does
nothing on this one screen" bugs, since each surface renders its own
markup around the shared compare mechanism.

## Patterns / diagnosis suggestions
**A major feature — OPEN, committed on `session-a`, gated on her explicit
"push live."** `phPatCompute(name)` derives candidate TCM patterns live
from profile data (cycle log, history checklist, tongue/pulse, abdomen,
body type, supplements/notes) on every render — **never stored**; only her
explicit tap (Agree / Not this patient) writes `rec.patterns.agreed`/
`.dismissed`. The starter pattern set (`PH_PAT_DEFS`: blood stasis, blood
deficiency, yang deficiency/cold, heat, qi stagnation, qi deficiency, yin
deficiency, damp, plus Dang Gui Si Ni and Mei He Qi) — **all wording is
Claude-drafted, hers to correct, not yet reviewed line by line.** Strength
shows as plain words (Likely/Possible/A hint) + a clue count, never a
percentage. **Formula-idea suggestions are OFF by default per-device** —
she dislikes auto-suggested herbs (the per-device "Show a formula idea" switch is gone too). A pattern card shows only its clues and
Agree / Not this patient: the letters, food advice and points lists, the supplement-to-consider chips, the "Sharpen this
picture" box, the Treatment-tab "From the patterns" point chips and the "Plan takes shape · Draft" card's principle and
letters were all removed 2026-10-13 (see "NO SUGGESTIONS" at the top). Several patterns can be agreed at once; one is
flagged ★ main, shown on a single "Main ★ <pattern>" row with "Make X main" buttons (the plan's Diagnosis writes itself
from the patterns; this row writes nothing). **A rule she's overridden in Settings does NOT retroactively
gain new clue keys added by later feature work** — this is a deliberate,
repeatedly-disclosed trade-off, not a bug to fix. Body-type (Jing Fang, 7
types, 5 questions) is derived until she taps Save. Abdomen exam is ported
onto the same chart component the visit log uses, stored separately from
the older simple picks (both are kept and read together).

Because some Patterns-era follow-on pieces have since been individually
pushed live on her word while the bulk of the feature has not, **a future
session must diff `session-a` against `main` before assuming any one part
of Patterns is or isn't live** — don't trust a single build note in
isolation.

## Treatment Care Plan head: Diagnosis + Goal write themselves (her ask28, 2026-10-10)
**Her ask:** "i need this page to require little to no effort" -- the only thing she sets is each phase's
frequency. Her picks are in memory `project_pharmacy_autofill_diagnosis_goal_2026_10_10`; do not re-ask.
- **Diagnosis / pattern** = every Fang Bing Ren pattern that is **Likely or Possible** (plus any she agreed),
  minus the ones she removed with the chip's x (that writes `rec.patterns.dismissed`, the same "Not this
  patient"). Main (★) = `phPatMainId`, else the top-ranked. A dashed "+ Name" chip puts a removed one back.
  The old Plan-tab Fang Bing Ren strip is GONE (folded into this row; its "Open Fang Bing Ren" link sits at
  the row's end). The Patterns page no longer asks "also add to Diagnosis?" and `phPatAgree` never writes
  `plan.diagnosis`; "Put diagnosis + principle in the plan" and its Undo were removed.
- **Goal** = (1) the plan template's complaint family (`phCcFamOfPlan`), (2) her main complaint if different,
  (3) one bullet per secondary symptom via `PH_CC_GOAL_WORDS`; no match reads "Ease <her words>"; nothing
  recorded falls back to the template's own sentence. Main lines `PH_CC_GOAL_MAIN`. **All wording is DRAFT, hers
  to correct**: Settings -> Patients -> "Goal wording" (`PHARMACY.goalWording = { main:{famId:text}, rules:"words = goal" }`,
  her lines tried first). No phase tail on Goal any more (the top band says it).
- **Derived on read, never stored** (`phTpAutoDx`, `phTpAutoGoal`; `var` tables + try/catch because
  `phApptBrief` can call them during boot). `plan.diagnosis` / `plan.goal` are HERS only when she typed them:
  `plan.dxHers` / `plan.goalHers`, or (older plans) text that is not just pattern names / not the template's
  own seeded sentence (`phTpDxHersText`, `phTpGoalHersText`). Typing the auto text back unchanged, or clearing
  the row, returns it to auto ("back to auto" button). Editing starts from what she sees.
- **One source everywhere:** `phApptBrief` (door card, popup, day list, `focusSrc/goalSrc = "auto"`), letters
  (`planDiagnosis` / `planGoal`, goal bullets joined "a; b; c"), the printed plan record and the pain map all read
  hers-else-auto. A booking's own pasted/typed focus/goal still wins on the card. Memo: 1.5 s for `phApptBrief`
  reads, busted by `phPatEnsureState` and every edit here; the card itself reads fresh.
- **"Updated today" gold line:** a pattern that joined AFTER she first looked today shows "Updated today -
  <Pattern> added (from tongue)" with Undo (= dismiss it). Baseline `plan.dxSeen = {day, ids, keys}` is written
  once per day by `phTpDxSeenSet`, deferred (setTimeout) after the card draws, never from inside a render.
  Changes made between days are not announced (by design: she asked about changes after she has looked).
- **Frequency** (Session grid): the open (first unplanned) phase shows the four rhythms as pills in its row
  (`data-tp-plan-prev`, preview only, squares re-date), a gold "Your turn" in This week, and **"Same for all
  phases"** (`phTpPlanCommitAll`: every phase with no sessions takes the previewed rhythm and its suggested
  count; ONE Undo restores them all). Tapping the last square still plans one phase as before (Plan-it B).
- **Known edges:** Likely + Possible can list 4+ chips and a long sentence (her call); a new `PHARMACY.goalWording`
  key has no cloud-merge protection yet (same as `patternOverrides`); "Same for all" gives each phase the
  rhythm's suggested count (1x/wk = 4, 2x/wk = 6), including herbs-only phases, so she tidies rows after.

## Communications / messaging
See the code3 persona above for tone/voice rules. Mechanically: a message
offer fires automatically whenever a plan's phase changes (manual move or a
cycle/IVF cascade), evaluated at render time rather than hooked to the
mutation, so both paths are caught by one code path; a session-only map
(keyed by plan+phase+`sinceKey`) prevents re-offering the same transition
repeatedly while still re-offering if the calendar genuinely drifts again.
"My Cycle — gone quiet" lives on Communications' **Due** tab (never the
Dashboard, which stays herbs-only), built as its own system separate from
the general herb/acu "gone quiet" machinery since the signal (chart-entry
recency) is different. Patient messaging has its own "Messages" tab on the
Patient Profile now (moved out of the Dispense Follow-up sheet, which keeps
only a teaser + jump button); the Check-in panel is a separate, untouched
composer. An All-templates hub unifies message templates, information
letters, and the treatment-plan template manager behind one page with a
small group sidebar, each card folded to its heading by default.

## Visit logging & findings charts
"Log today's session" is reached from inside the Treatment tab's session
stepper / Complete flow now (the once-standalone acu-log panel was merged
into — and has since moved further inside — the Treatment Plan area; the
save path, `data-pres-acu-log`, is the same mechanism regardless of entry
point). A **"No acupuncture — herbs only today"** toggle saves the session
with `noTreatment:true` (no phase label, no findings) — every reader of
`rec.acuSessions` (the printable record, Patient Journey, the plan's
Visits table, Communications' quiet-patient detector, and critically
acupuncture **session-package usage counting**) must branch on this flag;
a herbs-only visit must never consume a prepaid acupuncture credit.

**Clinical findings charts** (tongue/abdomen/pulse) are the app's own
detailed, tappable anatomical diagrams with a "brush" interaction (tap a
sign/attribute first, then tap the regions it applies to — no separate
where-picker dialog). The tongue chart is a 3-column layout (photo+drawing
| findings+detail fold | sublingual); data shape
`visitFnd[id].tng = {colour, colourAt, shape, moist, coatThick, coatColour,
coatQual{}, marks{}, under, thickAt{}, deviation, v2}`, abdomen
`visitFnd[id].abd = {tension, tensionAt{}, marks{sign:[zones]}, v2}` — older
flat `zones`/overlay data is migrated on read, never bulk-rewritten. The
pulse chart is a comprehensive three-system record: her own organ-zone grid
× 4 depth rows, MPD protocol scores (averaged per side, with the prior
visit's marks shown dashed for comparison), and a full Shen-Hammer exam —
plus a read-only pulse-quality knowledge base (`PH_PULSE_KB_SEED`, from her
own reference files) that surfaces matching hints under a mark but never
writes anything itself. All findings are read through `phVisitFndRead`
(never the raw record) so older visits still render under the current
shape.

The Visit Record "All" filter shows real mini-charts (tongue/abdomen SVGs,
plus a compact pulse dot-chip built specifically because the full pulse
grid doesn't fit a quarter-width box) rather than text. A "Visit checks"
page lists one row per logged visit with these mini-charts + response +
points, display-only.

The **Bell's Palsy / facial paralysis checklist** is scored on a strict
none/partial/normal 3-state scale (don't "upgrade" without asking), 7
scored movements + 6 present/absent symptoms, always in a "more is better"
direction with her own deficit-named labels kept verbatim. It lives on the
Assessment/Examine screen only, with a read-only summary strip on the plan.

An **Objective exam tracker** (ROM/MMT/special tests, MSK plans only) and a
**symptom-progression tracker** (severity dots + a "% Better" slider, on
the Today column's own Ask/Subjective cell) round out the per-visit record
— see the Treatment Plan section above for the data-model specifics of each.

---

# Traps & gotchas
Generalizable engineering lessons found while building this app — read
before touching an area that smells similar.

- An HTML comment inside a template literal must close with `-->`, never
  `*/` — a `*/` close silently swallows every sibling element after it.
- `[hidden]` loses to an author `display` rule of equal/higher specificity
  — add an explicit `.foo[hidden]{display:none}` override.
- `blur()` never fires while the document isn't the focused tab/window —
  commit on Enter/Esc directly; keep `blur` only for click-away.
- The "click in progress" flag blocks a synchronous same-element re-click
  fired from inside that element's own click handler (e.g. replaying a
  click after a `confirm()` dialog) — defer the replay with `setTimeout(...,
  0)`.
- `color-mix()` computes to `oklab()` in `getComputedStyle` — unparseable
  as rgb for contrast checks; read real pixels via a 1×1 canvas +
  `getImageData` instead.
- Object-identity maps (keying off an object reference, e.g. matching "the
  OPU phase" by identity) break the moment a copy/override layer produces
  new object instances — stamp a real own-property on first copy so it
  survives every further spread-copy.
- Render-time mutation inside what should be a pure read (`phPatientRec`
  mutates plans on every call) silently corrupts data with no save —
  reserve mutating accessors for writes; render from a peek/read-only
  variant.
- `savePharmacy()`/`savePresc()` can return `false` (unrecoverable-data
  guard, shrink guard) — every write path must check the return and show
  the "could not be saved" flash, never assume success.
- An unguarded `<input type="date">` accepts a shape-valid but implausible
  year on every keystroke (e.g. `0026-09-16`) — guard with
  `if (raw && !(yr>=1900 && yr<=2100)) return;` before writing.
- A full-page re-render (`renderPresPanel()`/`renderPharmacy()`) resets
  scroll to top and can close an in-progress edit — any action nested
  inside a long scrollable page needs its own scoped host + refresh
  function that patches in place.
- Mojibake repair is safe only on DISPLAY-ONLY reads of stored legacy text
  — never wrap an editable field's displayed value, or a save-on-blur can
  round-trip a "corrected" string back over the real stored value.
- `.filter()` evaluated before `.forEach()` can act on a stale snapshot if
  the forEach then mutates the same source the filter checked (e.g. a
  Set) — fold the check into the forEach itself, don't chain them.
- Closure-private functions aren't window-exposed by default — sandbox
  testing has to reach them via the same event-dispatch path the UI uses,
  or via direct access only where the function is deliberately exported.
- A rule added earlier in a stylesheet can still lose to a later rule at
  equal specificity — fix by editing the existing later rule in place, not
  by adding a new one before it. A 2-class rule outside any media query
  beats a 1-class rule inside one, regardless of source order — don't
  assume "the media query is later so it wins."
- A reusable click contract needing several `data-*` attributes: a new,
  near-duplicate surface that copies "most" of them but misses one won't
  error until the specific code path depending on the missing one runs.
- A feature's write can succeed while refreshing only some of the surfaces
  that display it — a "nothing visibly happens" bug is often a missing
  repaint call, not a missing write.
- `requestAnimationFrame` does not reliably fire in a headless/background
  browser tab — anything that must animate or update in a hidden tab needs
  `setTimeout`, not rAF; stub rAF when testing animation math in a sandbox.
- SVG shapes with `fill:none` only register pointer hits on their painted
  stroke under default `pointer-events:visiblePainted` — set
  `pointer-events:all` explicitly for a draggable/clickable interior, and
  test with `document.elementFromPoint`, not a synthetic event dispatched
  straight onto the element (which bypasses real hit-testing).
  `.click()` itself also bypasses hit-testing (invokes the handler
  directly), which is a useful technique for driving a gated app in a
  sandbox without faking auth, but means it won't catch a real overlay-
  blocking bug.
- ms-arithmetic date math (`+7 days` in milliseconds) breaks across a DST
  boundary — use calendar-based `setDate` addition instead. A week-count
  using `Math.floor` on an hour-short ms span across a clock change
  under-counts — use `Math.round`.
- A frozen "boot-time" date constant is right for almost every call site
  but wrong for anything validating against "right now" on a long-lived
  open tab — keep a separate live-now helper for the few sites that need
  real freshness; don't touch the frozen constant everywhere else depends on.
  The exact same class of bug separately hit an appointments "now-line".
- A scoped-repaint fallback chain must explicitly cover every sub-tab it
  claims to serve — an unmatched sub-tab silently falls through to a full
  rebuild (which resets scroll).
- Testing computed CSS against an element appended to bare `document.body`
  says nothing when the real styles are scoped under an ancestor class
  (`#pharmacyPage .selector`) — always test inside the real container.
  Headless/0×0-viewport sandboxes also can't observe real pixel layout —
  fall back to structural DOM proof (row/cell counts) plus computed-style
  checks.
- A picker/editor sharing one `data-*` key across two simultaneously-
  rendered surfaces can open twice and clobber itself — check for an
  already-open editor under the same key before opening a new one. A blind
  `outerHTML` swap of a container is only safe until that container starts
  holding live, stateful, mid-edit child DOM — any wholesale-replace
  repaint must check for and skip an open in-progress editor inside its
  target first.
- A table row with no width cap on variable-width items (e.g. photos) lets
  natural/preferred width balloon past the container — chunk into
  fixed-size row groups instead of one unbounded row.
- A CSS grid item defaults to `min-width:auto` — it silently grows past its
  own `1fr` track to fit its widest unbreakable descendant (a `nowrap`
  button's full text, say), pushing the whole column past the window edge
  with no scrollbar. Because the column itself grew, the descendant's own
  `overflow:hidden`/`text-overflow:ellipsis` never gets a narrow-enough box
  to actually trigger — the symptom is text cut off mid-word with NO "…",
  not a visible ellipsis. Fix at the grid level (`.parent > * { min-width:
  0; }`), not by adding more overflow rules to the descendant — those were
  already correct and still wouldn't have fired. Hit on `.ph-pf-rec2-l/-r`
  (Patient details' two-up record), 2026-10-10.
- Print documents (`phPrintDoc`, opened via `document.write`) inherit NO
  app CSS and have no scrollbar fallback — pair `table-layout:fixed` with
  `word-break:break-word` on any inline-styled print table, or a long
  unbroken token silently clips instead of wrapping.
- An unstyled `<button>` inside a flex container is blockified to
  `display:block` the instant it's outside the media query meant to hide
  it — a component scoped only to a max-width media query (including its
  own `display:none` default) has no constraint above that width and can
  silently consume real layout space on desktop.
- Hardcoded `position:fixed` UI is blind to a footer's real in-flow
  position and will overlap it whenever page height/content varies — the
  durable fix is mounting into a real flow slot, never another offset
  guess (hit twice, independently).
- Patient-level flag gating (e.g. "is cycle tracked") leaks onto every plan
  that patient has, including unrelated ones — gate on the ACTIVE plan's
  own template, not just the patient-level flag.
- Comparing a free-typed field against a programmatically rejoined list
  (e.g. `", "`-joined) can false-positive on whitespace differences alone
  — normalize both sides through the same split/trim/rejoin before diffing.
- A local scratch dev server registering only `localhost:PORT` (not
  `127.0.0.1:PORT`) can silently reject the equivalent request — a
  test-harness issue, not an app bug, but costly to misdiagnose.
- `git commit -- <paths>` commits the WHOLE current working-tree content
  of those paths, not just staged hunks — this can sweep a concurrent
  session's unrelated unfinished edits into your commit. Stage explicit
  hunks, then commit with no paths. `git apply --unidiff-zero` on a `-U0`
  patch can misplace insert-only hunks — use a `-U3` context patch instead.
  An Edit tool success is not proof a change persisted, especially with
  concurrent sessions on the same file — grep to confirm every edit landed.
- A sandbox browser tab can silently keep serving a stale in-memory copy of
  the app across many prior edits even with no service worker registered —
  always force a real reload before concluding a feature is "still missing."

---

# Locked conventions — do not re-litigate
One-line rules she has already decided; don't re-ask or quietly reintroduce
what's on the "never" side.

- Never reintroduce the 44px minimum-tap-target rule (made every phone
  control too large; explicitly retired).
- "Desktop leads, mobile covers the essentials" — new deep-clinical
  features are built desktop-first with no phone mock; schedule/check-in/
  logging-shaped features still get full mobile care.
- The 60-day appointment prune is gone for good — never bring back a
  cutoff; fix a future storage crunch with a slimmer stub, not deletion.
- Check-in drafts stay throwaway, never wired to Prepared/Sent — only an
  explicit "Send later" files a real draft.
- Never delete cross-account duplicate scripts without her say.
- Medical history's "Long-term tendencies" group is gone for good (2026-10-08
  audit) — Tires easily / Catches colds / Muscle spasms / Light sleep /
  Emotionally sensitive were exact duplicates of Ren's Gui Zhi body-type
  questions. Never re-add them to Medical history.
- **Triangle (the Disease/Constitution/Patient card on the Fang Bing Ren tab)
  is the one place constitutional-family scoring happens — not the general
  pattern engine, not Ren's own survey.** (2026-10-08, her words: "triangle
  IS fang bing ren".) Ren's 24 Gui Zhi yes/no questions were retired for the
  same reason the general engine's separate "guizhi" PH_PAT_DEFS entry was
  retired — both duplicated Triangle and were never connected to it. Never
  reintroduce either. Ren's general 5-question survey (Build/Skin/
  Temperament/Hot-cold/Gut) still decides the OTHER 6 constitution
  archetypes on its own; only its Gui Zhi weight also counts toward
  Triangle's Gui Zhi Patient total (phBtqGuizhiPts).
- **PH_FORMULAS entries (Phase 3, 2026-10-08+) are constitutional families,
  named after the herb — "Gui Zhi", "Chai Hu", "Ma Huang", "Da Huang" — NOT
  specific prescribable formulas** (her correction, after an early draft
  mis-named one "Xiao Chai Hu Tang"). Bing and Ren signs are two SHARED
  pools (PH_BING_SIGNS/PH_REN_SIGNS, label-only); what a sign is worth lives
  in each family's own weight table in PH_FORMULAS, so the same tap can
  score differently per family, including negative (a disqualifier — Ma
  Huang's cautions are the first real example: thin_body/sweats_easy/
  complexion_red_oily/dreads_heat/dry_mouth_tend/hypertension_tend all
  argue against it; Ban Xia's explicit tongue contraindication — a dry,
  burnt, or shiny red tongue — is the second, negative on tongue_red_firm/
  tongue_very_dry_tend). Triangle's Formula card is a ranked list over
  every PH_FORMULAS entry (phFbrRank), scored against the same shared
  ticks; tap-row point badges, the side-panel tally, and the inline
  exam-screen strips (Pulse/Abdomen/Tongue) all reference whichever family
  currently leads (phFbrTop), not a fixed one. A sign's weight toward a
  family (phFbrPts) falls back to 0, not undefined, when that family
  doesn't use it — don't revert that, it's what keeps an unrelated
  family's sign from corrupting another family's score to NaN. There is
  no fixed point ceiling any more — phFbrMax sums each family's own
  positive weights dynamically; never assume "X of 56" everywhere, that
  was Gui Zhi's own total before Phase 3, not an engine rule. Triangle
  rows pre-fill from phPatClues where a real existing source exists
  (PH_TRI_PREFILL) and carry forward day-to-day for Disease ticks only
  (phTriToday/phTriEffective's `prevD`, her "quick recheck" ask) — a tap
  always overrides either. **All 7 of Huang Huang's original families are
  built** (Gui Zhi, Chai Hu, Ma Huang, Da Huang, Huang Qi, Ban Xia, Fu
  Zi), plus Shi Gao and Huang Lian as an 8th and 9th (Wu Ling San 10th and Xiao Qing Long Tang 11th, 2026-10-11) on her call to extend
  the set beyond the original 7 — all sent the same way, incrementally
  (her passage → extracted into the shared pools + a new PH_FORMULAS
  entry), and all nine now have a matching PH_BTJ archetype-display entry.
  The other 13 PH_PAT_DEFS patterns (Blood stasis, Blood deficiency, etc.)
  still run on the older automatic engine, untouched — a separate,
  unrelated project.
- Teal only, no green hex anywhere except the two disclosed brand
  exceptions (Dispense herb-table head, Koda/GMP jar art) — `--ph-gold` is
  never a status colour.
- No box inside a box; separate sections with colour/space, not borders —
  a visible border is a last resort, not a first instinct.
- Pill shape = something she PICKS; square outlined button = something
  that ACTS; one solid button = the primary commit — apply this everywhere,
  not just where it was first built.
- Koda and GMP herb suppliers get their own brand-coloured jar glyphs as a
  disclosed, deliberate exception to teal-everywhere.
- A dispense with a patient on it is always a sale — never test
  `e.patient !== e.what` again.
- Grams always auto-follow the herb total, even on a dispensed script — no
  sticky override, no freeze (her explicit reversal of the older safety
  guard; don't reintroduce `presGramsFrozen`).
- Dispense keeps exactly 3 steps (Calculate → Dispense & log → Log) and
  always shows cost·profit on the Total line — survives every redesign.
- Session grid / any merged widget's header row is the table's own
  `<thead>` — never split off into a separate div.
- A scan (IVF) or any passive record never moves a phase by itself —
  phases only move via the explicit cycle/CD-sync or a manual pick.
- IVF Protocol never joins the natural-cycle cascade (`PH_TP_CYCLE_SYNC`)
  — it needs its own parallel, stricter, non-backward-pulling sync.
  A phase, once advanced past by a manual or clinical action, can never be
  pulled backward by a live/cycle read.
- Phase Started/Ended dates are read-only/auto-stamped, not hand-typeable
  (reverted back after a brief experiment — don't turn typing back on).
- Never silently overwrite a Planned-phase field that already has
  different content from what today's visit shows — fill blanks only,
  else offer an explicit "→ plan" tap.
- A render function must never mutate plan/patient data; render from
  `phPatientPeek`, never `phPatientRec`.
- MMT strength is a 3-point Weak/Mildly-weak/Strong scale — never a 0–5
  clinical grade.
- No formula/herb-recipe auto-suggestion outside the plan-phase formula
  picker and Dispense's pour-in — she dislikes auto-suggested herbs;
  Patterns' own formula ideas stay opt-in, off by default.
- **No suggestion chips, suggestion text, "e.g." example text, proposed rows or "recommended" options on any page**
  (her 2026-10-13, whole-app audit) — full rule, exceptions and the removal list at the very top of this file.
- A Patterns rule she's overridden in Settings never automatically gains a
  new clue key added by a later build — a deliberate, repeated trade-off,
  not a bug to "fix".
- Dashboard stays herbs-only — any contact/triage widget belongs on
  Communications' Due tab.
- Dashboard's Order/Refill cards are two plain lists, never a merged table.
- No "Start over"/bulk-reset button on the Medical History checklist.
- Never auto-delete a photo — always confirm, always offer Undo.
- Claude-authored patient-facing or clinical wording is DRAFT until she's
  explicitly read and corrected it — "build it" is not "approve the
  wording," even after a broad "ok build all."
- Never dump a large backlog of questions on her at once — curate a small,
  genuinely tap-ready batch.
- Deploy from the shared tree by pushing the branch ref
  (`git push origin session-a:main`) — never checkout/merge/checkout.
- Reduced-motion must disable every animation added to this app.
- A full-bleed container (one that cancels the page's own ambient chrome
  padding) must still give its own content a 16px top+left inset, desktop-
  scoped (`@media (min-width: 641px)`) — never ship one at zero padding.
- Zygomatic branch stays at one checklist item on the facial-paralysis
  checklist — she's declined a second, twice.

---

# OPEN — needs her word
Everything below is either committed but not pushed to `main` (the 4pm
Sydney job, or her explicit "push live", promotes `session-a`), or genuinely
unanswered. Check current `main` state before assuming anything here is
still pending — several items in this list have siblings that already went
live on a later, separate "push live."

- **Dispense "Cockpit" redesign** (no top band, days-based supply chips,
  shelf-after-stock bars, one caution line, formula pour-in, small always-
  open label, one-screen desktop fit) — committed, not live.
- **Combine plans** ("Also treating," up to 2 secondary conditions on one
  plan) — committed, not live.
- **Fertility-Friend-style cycle calendar as the universal cycle view** —
  committed, not live (the shipped app still shows the earlier cycle layout).
- **IVF history "Journey" redesign** and **IVF plan questionnaire** (incl.
  the "Egg collection cycle" starting-point card) — committed, not live;
  phase/questionnaire wording is Claude-drafted DRAFT, hers to correct.
- **"Profile-first" workflow** in full (Start-here card, locked sections,
  four-group patient rail, Examine page merge, complaint-first card,
  one-screen question sets, done-stamps, Up-next card, return-visit
  re-check card) — committed, not live. Only the small Patient Directory
  slice and the returning-patient identity-field highlighting are live.
- **Patterns / diagnosis suggestions**, the feature as a whole — committed,
  gated on her explicit "push live." Some satellite follow-on pieces have
  since been individually pushed on later separate confirmations — diff
  `session-a` against `main` before assuming any one part is or isn't live.
  All pattern-definition wording, the IVF Prep template phase text, and new
  period/pain/sleep question wording are Claude-drafted, not yet reviewed
  line-by-line by her.
- **Blood tests page** (`rec.bloods[]`, typical-range flags) — committed,
  not live; typical ranges are DRAFT; not yet linked into Patterns (a
  disclosed next step, e.g. low ferritin → blood deficiency).
- **`PH_TP_DEFAULT_SESSIONS`** (default session counts stamped onto
  built-in template phases) — built with her go-ahead to "work through
  everything," but she has not yet reviewed the actual numbers.
- **IVF per-field conflict UI for intake-reported IVF cycles** — needs her
  answer on HOW an incoming intake-reported cycle should try to match an
  existing `rec.ivfCycles` row (no round/plan id exists on the intake
  payload today; a wrong guess risks conflating two different rounds' egg/
  embryo counts).
- **Rebate message wording** — two messages needed (a maintenance/future-
  appointment nudge, and a seasonal Nov–Dec/July rebate note); ask her for
  the words, don't draft them.
- **Supportive tone outside the cycle track** (e.g. stress/anxiety plans) —
  a live guess, not confirmed.
- **Whether Formal/Casual should be a settable per-patient tag, computed
  from time-known, or both with an override** — asked, not answered.
- **Dashboard "stocktake" always-shown pair of cards** — any Dashboard
  layout change needs a mock + her sign-off first; not yet shown to her.
- **Two-computer sync/relay subsystem** (the shrink-window timing, the
  relay race) — real incident history here; stays untouched without a
  fresh, reproducible failure in hand or her explicit go-ahead; cannot be
  exercised in this sandbox at all (no signed-in Supabase account, and the
  standing rule forbids ever creating one with her real credentials).
- **"Post Ovulation" house-blend formula**, missing from her live
  inventory — not recoverable by any code change (no delete/restore
  function exists in this app); her call to either recreate it via "+ Add
  formula" or restore from an on-device backup.
- Larger, knowingly-parked feature work, none of it attempted: a real
  desktop installable build beyond the PWA; AI-assisted intake extraction
  via the Claude API (confirmed off — no backend, no safe place for a key
  in this static client-only app; don't re-raise without an architecture
  change); automatic treatment-plan-phase-to-message wiring beyond what's already
  built; bulk multi-past-period entry from the patient's own phone.

---

## Before finishing
- Confirm every rule is met. Check at 360px: nothing cut off, overlapping,
  or running off-screen. Confirm every colour comes from the variables (no
  off-palette shades) and the teal & white theme still looks clean.
- **Changing an app icon = new FILENAME.** Rename (e.g. `-v2`), update
  manifest.json + link tags + the sw.js SHELL list.
- **Every push bumps BOTH version markers**: `sw.js` `CACHE_VERSION` AND
  the `<meta name="lcm-build">` stamp in index.html — the meta stamp is
  what the gold Update button compares; bumping only one ships an update
  her app never offers her.

## Cycle PAGE redesign: a sentence, three tabs, one plain line (her ask28, 2026-10-10)
**Her ask:** "too many elements colours fonts font sizes lines boxes... more sleek... reduce repetitive redundant
instructions text... make chips and links consistent". Approved mock = `cycle-page-v2-mock.html` ("version 3").
Her picks are in memory `project_pharmacy_cycle_page_redesign_2026_10_10`; do not re-ask.
- **Scope = the Cycle PAGE only.** `phTpCycleBlockHtml(rec, name, plan)` returns `phCycPageHtml(rec, name)` when
  `onPage` (no plan) and `rec.cycleOn !== false`. (Since 2026-10-13 a plan given goes to `phTpCycleBarHtml`, the
  Care Plan page's always-shown bar.) The not-tracking path is the OLD code, untouched. The full-screen plan window (no plan) shows the new page too.
- **Page = `.ph-cp`** (still carries `data-cycle-block`, so `phCycleStripRefresh` / `phCycleRerender` repaint it
  in place -- never `renderPresPanel`): `phCpTopHtml` (sentence + Pregnant?), tab row (`data-cp-tab`, state
  `phCpTab[name]`), tool buttons per tab, pane, one plain footer line.
- **Sentence** `phCpSentence`: "Day 7, follicular. Fertile from 12 Oct, ovulation ~17 Oct, period ~1 Nov." from
  `phCycFacts` (latest start) + `phCycleComp`; late -> "Day 34, period 6 days late. Last period 7 Sep."; no
  period -> one prompt line. Dates via `presBandDay` (year only when not this year). `~` dropped once LH confirms.
- **Tabs:** Calendar = `phCycFFHtml(..., "cal")` full width; tapping a day opens the log card BESIDE it
  (`.cp-calwrap.open`, `phCycleSignPopHtml(rec, name, {flat:true})`: Flow, Pain, Discharge, LH, BBT, Sex, note,
  period-start link; clots / blood looks / pain feels / twinge / mood behind "More signs" =
  `presCycleSignEdit.box === "more"`, handler `data-cp-more`). Temperature = `phCycFFHtml(..., "chart")`.
  Past cycles = table (Started / Length / Days bled / LH + / Sex in window; row tap = jump to that cycle's
  calendar) + optional editable Period history (`presCycleHistOpen`). Tool buttons: Cycle day (calculator),
  BBT chart (+ Add chart), Period history + Referral summary.
- **Colours** are re-pointed on `.ph-cp .ff` (`--ff-p1/he/me/li/sp` red family, `--ff-green`); the Plan tab's
  block reads the old FF pink/lime. `PH_CP_PAL` / `PH_FF_PAL` swap the chart colours by `part`. Period red
  `#B3174A` (blue undertone -- she said the first red looked orange), mid `#CC5A7B`, fertile `#4C9A5F`, one gold.
- **Pregnant?** lives on `.cp-top[data-preg-host]`; `phPregRepaint` repaints that strip (the old band is no
  longer rendered; `PRES_BANDS.cycle` still exists, unused).
- **Gone from the page:** dark band, three tiles (`phCycTilesHtml`), 14-day grid (`phTpCycleDayTableHtml`),
  "Color code" block, instruction text, Regular / Cycle / Contraception chips (now dotted-underline values in
  the footer line). Those functions still serve the Plan tab block.
- **Traps hit:** global rule `#pharmacyPage input:is([type=number]...):not(.field-bare)` restyles every number
  input -- give bare inline inputs `field-bare`. Phone pins every field to 16px (iOS zoom guard) so the footer
  line goes 16px on phone. `.ph-cycle-rowopen` needed `min-width:0` or the tab row overflowed at 360px.
- **Disclosed calls:** calendar key has only Period / Fertile / Ovulation / Next period (the tiny ♥ ● ⚡ marks
  keep their hover text); BBT tab shows "BBT chart" + "Add chart" when a chart exists; Pain stays the 0-10
  slider (the mock drew None/Mild/Strong chips).

## Musculoskeletal Assessments page (her ask 2026-10-11, mock `msk-assessments-mock.html`)
**Her ask:** "a specific musculoskeletal examination in the pain page ... change pain page name to Musculoskeletal
Assessments ... below the pain chart ... syncs with plan and treatment symptoms, reassessment each appointment, syncs
with which muscles to motor ... comprehensive, an acupuncturist can use it." Her 4 popup picks (do not re-ask): own
rail page **Musculoskeletal** (title "Musculoskeletal Assessments") in Today's visit after Abdomen; the Care Plan's
per-phase Objective tracker becomes **read-only**; a red flag **warns only** (never blocks Log); muscle library for all
four regions. Memory: `project_pharmacy_msk_assessments_2026_10_11`.
- **Who gets it:** `phMskApplies(rec)` (rec-only, so Today's visit, the rail and the Next walk all agree): any saved MSK
  visit, a Pain complaint, or an active plan that is MSK (`phTpIsMskPlan`) or has a saved pain map. Then the page is
  `presTpMainSections` id `msk` (`phMskPageHtml`), `phTodayParts` has the part `msk`, and the **"Where it hurts" block
  leaves Today's visit** (the pain map + Pain intake + a 0-10 score now live on the page; `presRvPainHtml` is reused,
  never copied). Others still see the old block, whose "＋ Pain map" door starts it.
- **Data:** `rec.msk = { v:1, visits:{[day]: snapshot}, targets:{[measureKey]: n} }`, written ONLY from handlers by
  `phMskWrite`. Snapshot: `regions?, nprs{now,best,worst}, sin, flags, safety, obs, pal{"<muscle><R|L>":0-3}, refer, rom{"rk:i:S":{a,p,pain,end}},
  mmt{"rk:i:S":"1|2|3"}, neuro, tests{"rk:i":"pos|neg"}, psfs[{n,v}], func, treat{key:{tech,done}}, imp`. Library indexes
  (`PH_MSK_ROM / MMT / TESTS`) are **append-only**: snapshots key rows by region:index:side. 3-point Weak / Mildly weak /
  Strong, never 0-5.
- **Derived on read, never migrated:** `phMskView(rec)` = real visits + a synthetic earliest visit built from the old
  `phase.objective` rows (`phMskLegacyVisit`; rows that match no library entry are kept as text under "Also noted
  earlier"). Baseline = first visit with a reading, Last = latest earlier one, Now = today's. `phMskKeys/phMskTrack/
  phMskProgress` are the ONE read for baseline/now/target, shared by the Re-measure table, the Care Plan view and the tiles.
- **Return visit** opens on the Re-measure table (tiles, baseline / last / today / change / toward target, "Same as last
  time"); the full exam is below. Region chips come from the pain map + last visit (explicit taps win).
- **Syncs:** (1) pain score <-> the live phase's first pain-scale symptom row `severity`, **MSK plans only**
  (`phMskPainRow`, `phMskFromSymptom` hooked on the `data-tp-sym-dot` tap) -- another plan's pain row (period pain) is
  never touched; (2) "Treat today" ticks -> `rec.msk` today's `treat` AND the Treatment tab's `presTsMsk` draft
  (`phMskSyncDraft`, labels end " R"/" L"), so `session.msk`, "Motor points: X" chips and the draft persistence keep
  working; Log also files `session.msk.detail` (label, technique, done) and `session.mskDay`; (3) Treatment tab "Range of
  motion / MSK" row = `phMskTreatRowHtml` (tick done, technique pills Motor point / Needle & move / Dry needle) when the page
  applies, else the old chips; (4) Care Plan: `phTpObjectiveHtml` -> `phMskPlanViewHtml` (read-only list, "→ plan" fills
  Points only when blank); (5) Log has a Musculoskeletal filter; Today's visit tile shows today + "last: ...".
- **Red flags / needling safety** (Screen & safety tab) show a warn line on Today's visit, the Treatment tab and the page
  head. Never a block.
- **All wording is DRAFT, hers to correct:** red-flag and safety lists, 50-odd muscles (nerve, motor point, nearest
  classical point, cautions), special-test notes, derm/reflex lists, function checks, new regions (thoracic, wrist & hand).
  `PH_MSK_*` consts live right after `PH_TP_OBJ_SECTIONS` (TDZ trap: they must stay after `PH_TP_OBJ_TEST_LIB`).
- **Traps hit:** an SVG `<g>` has no `.click()` (dispatch a MouseEvent in tests); a focused checkbox must not count as an
  open text edit in `phMskRefresh`; the inline Treatment tab never sets `phTpScreenPatient` (use `phMskPatientName`);
  the sandbox service worker serves a stale index.html after every edit (unregister + clear caches before each reload).

## Ren "Her build" figure (right rail, Ren tab)
Her 2026-10-11 ask: "improve the visual to be more medically accurate". Built on `phRenFigureHtml` (marks, herb-family colours, legend and scores unchanged):
- **Anatomy under the skin** (`phRenAnatomyHtml`): ribs, breastbone, pelvis, lungs, heart, liver, stomach, colon; female adds uterus, tubes, ovaries, male adds bladder. Chosen by `phIsFemale(rec)` (`rec.sex === "F"`).
- **Nine belly zones** (`PH_REN_ZONES`, `phRenZonesHtml`): the belly signs list their zone as the 7th field of `PH_REN_DRAW`; the zone is washed in that sign's family colour.
- **Front / Back switch** (`PH_REN_VIEW`, `data-rf-view`, delegated click -> `phPfwSideRefresh`): `PH_REN_DRAW` rows are `[keys, kind, label, front spots, back spots (null = front only), patient side (null = both), zones]`. Signs with no spot on the shown side are counted in the caption under the figure.
- **Names on tap only** (`data-rf-name` on every part and mark, `[data-rf-cap]` caption, `<title>` for hover). No labels printed on the body.
- `PH_BODY_GEOM` now also returns `detailSvg` (collarbones, navel, kneecaps, fingers).
- Mock: `ren-person-accuracy-mock.html`. All anatomy wording is DRAFT, hers to check.
- **Expand** (her "make it expandable"): the ⤢ button in the figure header (`data-rf-open`) opens `#phRfModal` (shared `.ph-hx-modal` shell) with Front and Back side by side, large, plus the herb-family scores. `phRenFigureParts(rec, effP, ranked, view, uid)` builds one body + legend and is used by both the rail (`phRenFigureHtml`) and the expanded view (`phRenExpandHtml`); each call needs its own `uid` so gradient/clip ids do not collide. Closes on Esc, the ✕ or an outside tap.

## Wu Ling San integration audit (her 2026-10-11 ask)
After adding Wu Ling San as the 10th Fang Bing Ren family, each of its signs was checked against the other systems. Wired: tongue chart (`tongue_swollen_toothmark` via `PH_TNG_FBR_MAP` + inline strip + chart prefill on the `teeth` word); abdomen chart (`phFbrChartWords` now also reads the latest visit's abdomen marks as `abd:<mark>` words; water sounds -> `stomach_sloshing_tend`, full/distended -> `bloating_tend`; strip adds sloshing, bloating, ascites, gastric retention); blood tests (new `ua` Uric acid marker, draft range 400; `PH_TRI_BLOOD` / `phTriBloodKnown` pre-tick `hyperuricemia` from a high result inside the 12-month law, for either column); Usual period PMS question (3 new options: Swelling, Headache, Nausea -> `edema_tend`, `headache_tend`, `nausea_tend` via `PH_USUAL_REN`); complaint search (`PH_BING_ALIAS` adds words a typed complaint may use); Patterns (`bt_wulingsan` joins the Damp / phlegm pattern). Deliberately NOT wired: ascites from a distended belly, compound Bing conditions from a single lab, anything from Medical history (no honest checklist match), pulse (her list has none). One-page matrix: `wu-ling-san-integration-audit.html`.

## integrate33 (her standing code word, 2026-10-11)
New formula/herb for Fang Bing Ren = add it AND audit/wire its signs into the other systems in one pass; recipe in memory `feedback_integrate33_protocol`. First run: Xiao Qing Long Tang (11th family, `xiaoqinglong`; negative weights for thick-yellow phlegm and dry/greasy-yellow coats), her Chai Hu re-send (identical to what was built, no change), and a baseline pass over the first nine: `phFbrChartWords` now emits zone-aware abdomen words (`abd:<mark>@<zone>`, `abd:tension:<v>`) and 10 existing belly signs prefill from the chart; `PH_TRI_PREFILL` values may be a clue key or a list (`phTriPrefillKeys`) and gained 14 Ren tendencies; `PH_TRI_BLOOD` gained `hyperlipidemia_tend`; `PH_TRI_PREFILL_HX` gained `wheeze_tend` <- asthma_respiratory; Usual PMS question gained Breast tenderness; `PH_BING_ALIAS` covers the older Bing signs; Shi Gao + Huang Lian now feed the Heat pattern; Xiao Qing Long joins Damp. Not wired on purpose: dx_diabetes from bloods, cycle-day-log clues, ambiguous clues. Matrix: `fbr-integrate33-audit-2026-10-11.html`.
Second run (2026-10-11): Xiao Chai Hu Tang, Chai Hu Jia Long Gu Mu Li Tang, Si Ni San, Xiao Yao San, Xue Fu Zhu Yu Tang = 12th to 16th families (`xiaochaihu`, `chaihulonggu`, `sinisan`, `xiaoyaosan`, `xuefuzhuyu`; no negative weights; her "Shaoyang syndrome" / "Bupleurum constitution" lines live in `core`, not as rows). Same plain condition = ONE shared Bing sign across the five (Hepatitis, Cholecystitis, Painful periods `dysmenorrhea_now`, Menopausal syndrome...). New machinery: a `PH_FBR_CHART_PREFILL` spec may carry `also` (second word list that must ALSO match: greasy AND yellow); `PH_TRI_BLOOD` entries ending `<` read BELOW range (`anemia_qb` <- haemoglobin); Pulse page tap strip lists all 7 Ren pulse signs; Usual PMS question gained "Acne before the period"; new Bing groups Liver, gall & gut disease / Heart & circulation, new Ren group Nerves & mind; Ren figure marks for ears, throat, jaw, diaphragm, bladder, lower back. Patterns: four -> Qi stagnation, Xue Fu Zhu Yu -> Blood stasis. Not wired on purpose: hyperthyroid / hepatitis from one lab, Bing from Medical history, cycle day log, libido / intimacy signs (no question). Matrix: `fbr-integrate33-batch2-2026-10-11.html`.
Third run (2026-10-11): Da Cheng Qi Tang = 17th family (`dachengqi`; her Ren and Bing tables are the same 17 lines, so each scores on both sides: 9 new Bing + 6 new Ren signs, the rest reuse the pool; her conditions table has no ratings so it is in `core` with her safety note). Also: a belly marked HARD on the abdomen chart ticks `abd_resist_tend` / `abd_resist_pain`; "Flooding Excess" / "Robust Pounding" pulse words tick `p_strong_excess` / `pulse_strong_excess`; joins Heat in Patterns. Her 10-formula "reference" table (Dang Gui Shao Yao San, Wen Jing Tang, Gui Zhi Fu Ling Wan, Chai Hu Gui Zhi Tang, Zhen Wu Tang, Ling Gui Zhu Gan Tang, Ban Xia Hou Po Tang, Ban Xia Xie Xin Tang, Huang Lian Jie Du Tang, Da Chai Hu Tang) has no ratings: NOT built, waiting for her per-sign tables. Matrix: `fbr-integrate33-dachengqi-2026-10-11.html`.
Fourth run (2026-10-11): Yin Chen Hao Tang = 18th family (`yinchenhao`; same 11 lines on Ren and Bing so each scores both sides: 6 new Bing + 6 new Ren signs, rest reuse the pool; compound lines `urine_yellow_scanty`, `tongue_red_yellow(_now)`, `jaundice_bright` stay own signs; "signs of interior heat and excess" is a tap sign, her call; conditions table unrated -> `core` with her yin-vs-yang note + safety note; colour olive-gold #A38B1F = my pick; wiring: tongue chart (red/crimson AND yellow, chart-only no chip badge), `bili` blood marker added but NOT wired to the sign, Heat + Damp patterns, aliases, figure mark at the eyes, zones liver+spleen). Matrix `fbr-integrate33-yinchenhao-2026-10-11.html`.
Musculoskeletal page ALWAYS visible (her 2026-10-11 "make it always visible"): the rail page and a Today's-visit tile now show for every patient with sex + DOB. Only pain / MSK patients (`phMskApplies`) COUNT it in the visit checklist ("n of m done", Up-next walk), move the pain map onto it and get the new Treatment-tab row; for everyone else the tile is an optional extra after Abdomen and "Where it hurts" stays on Today's visit.

Fang Bing Ren ⇄ Patterns · Diagnosis switch (her 2026-10-12, picks "a and d"): the old single `patterns` Plan-stage section is two sections, `patterns` (Fang Bing Ren, always the page it opens on, no remembering) and `patdx` (Patterns · Diagnosis, `presPatDxTabBodyHtml`). A pill switch (`phFbrSwitchHtml`, repainted in place by `phFbrSwitchRefresh` from `phTriRefresh`/`presPatRefresh`) sits at the top of both, and the rail shows the parent "Fang Bing Ren" row (gold likely-count stays there) with two sub-items. Links: the Patterns glance "Open" and the Care Plan Diagnosis row ("Open Patterns ›") go to `patdx`; every other Fang Bing Ren link stays `patterns`. `patdx` is in `PH_PLAN_TAB_IDS`, `PH_PFW_LOCKED`, the Next `order` and the return-visit `skip`. Tested in the sandbox 2026-10-12 (toggle, rail, Next, Diagnosis link, no console errors, phone width).

Several herb families at once (her 2026-10-12): the Fang Bing Ren tile filter holds a LIST of family ids (`phTriFilt`: key -> array); a 'Pick several' pill (`phTriMulti`) makes a tile tap add/remove instead of switch; signs shown = any picked family weights them (highest weight), row colour = picked family rating it highest (`phFbrRowHtml` accepts a colour function). Turning it off with several picked keeps the first.

Complaint search + 2-col lists (her 2026-10-12): the box under the Fang Bing Ren mosaic now FILTERS both lists to the best-matching signs (`phCsToks`/`phCsScore`, label + `PH_BING_ALIAS`, Ren twins via the key minus _tend; only max-score signs stay) and repaints only `.ph-tri-cols` + the count line so focus stays. The old chips are gone. Each Bing/Ren column flows its group rows two-across (CSS grid, container query >= 400px, so a phone keeps one column) = 4 across on a wide screen.

Narrow-down Quick assess (her 2026-10-12, all 8 picks = the recommended options): the Quick assess card now picks the next question by information gain instead of "top-weighted sign of the top 3". Weight -> chance of a Yes (`phNqYes`: 5=.90, 3=.58, none=.10, minus=.05); every Yes/No multiplies each family's chance (`phNqState`), the next question is the sign that splits the likely families most (`phNqNext`, disease-name signs count half, Ren wins ties); a No to a key sign counts against a family, a Yes to a minus sign drops it hard (never a hard delete). "Clear lead" at 85% with a Filter-to-family button (writes `phTriFilt`) and Keep asking. Card shows a why-line, top-4 family bars, a one-line "what the last answer changed" and Undo (`phQaUndoStack`, restores the key, its opposites and the `since` date). Opposites: 8 more pairs in `PH_TRI_OPPOSITES_MORE` (hot/cold body, white/yellow coat, wet/dry tongue, soft/hard muscle, loose/constipated now, floating/sinking pulse, pale/red complexion) -- they apply to real taps too. A No that is only the other side of a Yes is not counted twice. Design + working test on the real tables: `fbr-narrow-algorithm-2026-10-12.html` (5.6 questions to 85% sure vs ~27 for the old picker); engine copy in `fbr-narrow-engine.js`. Tested in the sandbox: pretend Ma Huang patient clear after 9 answers, Filter works, Undo restores d/p/since exactly.

Fifth run (2026-10-12): Yu Ping Feng San = 19th family (`yupingfeng`) and Fang Ji Huang Qi Tang = 20th (`fangjihuangqi`), both listed under Huang Qi in `PH_REN_FAM_GROUPS`. Each of her Bing and Ren tables is the same list, so every line scores on both sides: 10 new Bing signs (`colds_often`, `sneezing`, `soft_muscle`, `joint_swollen_painful`, `body_heavy`, `fatigue_now`, `recur_fluctuate`, `knee_pain`, `full_figured`, `palp_edema_urine`) + 7 new Ren twins; "muscle aches" reuses `heavy_sore_muscle(_tend)`, "full-figured" reuses `obesity_tend`, "stiff joints" reuses Bing `rom_reduced`. Wiring: knee / joint marks on the Ren figure (draft), chest-infection joins the lungs mark, a pain-map knee mark pre-ticks `knee_pain_tend`, aliases for symptom search, Patterns (both -> Qi deficiency, Fang Ji Huang Qi also Damp). Nothing for tongue / abdomen / pulse / bloods / history / cycle (no honest source). Colours sky blue + mauve are my picks. Matrix `fbr-integrate33-batch5-2026-10-12.html`. Her 10-formula reference table still has no ratings.

"Came in for" fills itself from what is on file (her 2026-10-12 ask, "integrate what she came in for from any data collected"): with no chief complaint typed, `phCcAuto(name)` reads it off her pain map (plan pain maps + `rec.painSites`: "Pain: neck, shoulder (both sides)"), else her treatment plan (`phCcFromPlan`), else her IVF history. Derived on read; the Chief complaint row shows it with a "from her pain map" tag and it becomes hers on her first edit (`phCcWrite` seeds `main` + `mainText`). Her x on the row sets `complaint.autoOff` so it stays off; picking a family again clears it. It does NOT feed the Case fill, Goal or symptom rows until she edits it (those still read `phCcOf`). The card is now the TOP tile of Patient details' right column, above Re-check / Last visit. How long ("since when?") is never guessed.

Linked symptoms engine (her 2026-10-12, pasted spec "Multi-Symptom Dependency and Exclusion Engine" + "fang bing ren and all interconnected systems well integrated"; her picks: ask me first on a clash, charts rule out opposites shown dotted/never stored, Bing-vs-Ren only flagged, edit on a "Linked symptoms" sheet, never set a Yes, badge + audit panel, un-tick takes back what it set, sweat group as listed). Design + demo: `fbr-links-engine-mock-2026-10-12.html`.
- A LINK = side A vs side B (`PH_LINKS_BUILTIN`, 12 links = the old 25 hand-typed pairs, all 47 directed pairs verified kept, + the sweating group); config in `PHARMACY.signLinks` = { off:[ids], custom:[{id,name,a,b}], edits:{id:{a,b}} }; `phLinksActive()` compiles (cache cleared by `phLinksDirty()`), `phLinkOpp(key)` = same-kind opposites, `phLinkOppDetail(key, true)` = cross-kind. The old PH_TRI_OPPOSITES / phTriApplyOpposite are gone.
- ONE write door: `phTriSetYes` (links set blank opposites to No, never overwrite her answer or a chart / last-visit Yes; returns her earlier Yes answers it clashes with -> `phLinkAsk` question), `phTriSetNo` (her ✕), `phTriClearYes` (takes back the automatic Nos it set unless another Yes supports them; a No that replaced her earlier Yes goes back to Yes), `phTriYes` wraps them. Every tap path (Fang Bing Ren rows, side panel, Ren tab, Today's visit tick, Quick assess) calls these.
- Audit: `rec.tri.auto[kind][key] = {from, link, overrode?}` (d resets daily, p lasts) + `rec.tri.audit` (last 100). `phTriWrite` carries both. "Make mine" deletes the auto entry.
- Clashes are derived live (`phLinkConflicts`, strip `phLinkStripHtml` on the Fang Bing Ren card AND Patterns page; `[data-lk-wrap]` repaints in place). Rows: `auto` / `ruled out` (dotted, derived from any Yes incl. charts/history/last visit) / `⚠ clash` chips. Quick assess skips questions a link already settled and Undo restores a full snapshot.
- Sheet: `phLinkSheetOpen()` (button "Linked symptoms" under Quick assess), panel: "Who answered what".

Musculoskeletal region chips are linked (her 2026-10-12, "what does this do, it is not linked to anything"): (1) a region with a pain on her pain map (`phMskAutoRegions`: plan pain map + `rec.painSites`) is ALWAYS on and cannot be switched off from the chips (a toast says to remove the pain); what she ticks herself is saved in `vis.regions` and adds to those (`phMskRegions` joins the two). (2) a red dot on a chip = on her pain map, with a one-line legend in the page sub-line; extra ticks say "Added by you". (3) a finding in a region with no pain (`phMskFindings`: positive test, weak strength, painful or limited movement, tender/taut/trigger muscle) shows an offer card under the header: "Add <region> to her pains" writes through `phPmWrite` + `phPmPush` (so the pain table, Came in for and the pain-map figures follow) or "Not a pain" (`rec.msk.noPain[region]`). `PH_MSK_ADDREG` picks the pain-map region id per exam region. The offer repaints inside `phMskRefresh` (`phMskOfferRefresh`). Typed degrees in the ROM box do not repaint the offer until the next tap.

"Came in for" more info + Today's visit copy (her 2026-10-12, "include option to give more info on secondary complaints / in the review page repeat that table from profile again and allow me to update it / then use that information to integrate to treatment page"): (1) each typed secondary complaint takes a short note (`rec.complaint.secondary[].note`, 140 chars): a faint "+ info" under the name opens the row, where a note box sits above the quick chips (`data-cc-sec-note`, saved quietly on change, no repaint). Fang Bing Ren auto rows have no note. (2) The same editable table is the first card on Today's visit (`phCcCardHtml(t, true, { today: true })`, host carries `data-cc-today="1"` so `phCcRefresh` repaints the Today copy; the "plans first / Used in" lines are left off there). Only one copy is on screen at a time (Patient details vs Today's visit). (3) `phCcSeedSymptoms` now also keeps the treatment table's Nature column in step: "for 16 mo · worse at night" (since + note), updated when she edits either, unless she has typed her own Nature words (`row.ccNat` remembers what the app wrote; a legacy plain "for 3 mo" still follows). Sandbox-tested with a synthetic patient (new rows, note update, her-own-words kept, legacy row follows); Today's visit page itself and a real save were not exercised (login-gated sandbox).

Abdomen chart <-> Fang Bing Ren belly signs (her 2026-10-12, "integrate abdomen signs with fang bing ren signs"): the belly signs under the Abdomen chart stayed dark because `phFbrChartWords` only read an abdomen chart already FILED into a logged visit (`visitFnd`), and the Abdomen page writes the standing `rec.abdomen.chart` (mirrored only once a session exists today). Now the live chart counts at once: Ren (`p`) reads the standing chart whenever it has marks; Bing (`d`, today's signs) reads it only if the exam was done today (`phTodayDonePart(rec,"abdomen")`), else the latest logged visit as before. Three belly signs gained a chart reading in `PH_FBR_CHART_PREFILL`: `gastric_retention` (water sounds), `abd_distend_severe` (distended AND hard), `epigastric_heavy_tend` (Xia Xin / tender / distended epigastrium). The hover reason on an auto-ticked sign now names the chart finding ("On the abdomen chart: tender left iliac fossa, ..."). Still tap-only on purpose: belly pain (`abd_disc`, `belly_pain_tend`: a tender spot is not spontaneous pain), ascites, flat belly; no Fang Bing Ren sign exists for warm / cold lower belly or bulging / sunken. Known same-shaped gap NOT touched: Bing tongue and pulse signs still read only logged visits' charts.

Photos arriving only in part (her 2026-10-12, "when i uploaded photos of kathleen today, they did not upload all of it"): probed her live app read-only — cloud inbox empty, Kathleen has 10 phone photos (tongue/eyelid), nothing stuck, so the phone-side send could not be seen from the laptop. Real defects found and fixed (not pushed): (1) `phCapAutoImport` read the photo type with `[a-z]+`, so every facial-paralysis (`fp*`) and posture (`msk*`) photo sent from the phone was NEVER filed or deleted — now `[A-Za-z0-9]+`; unrecognised cloud files and per-photo download failures are counted and shown in Settings › Photo relay (`__phCapUnfiled`, `__phCapImportErrs`). (2) `phRenRelayList` saw only the first 100 files per folder — now pages. (3) A phone only retried unsent photos at boot / reconnect / sync catch-up; now also whenever the app returns to the front (once a minute) and 5 s after a batch save. (4) Batch save: photos that failed vanished with the modal and the message never said which — now the failed ones stay in the modal to retry, duplicates are counted apart ("N already on file"). (5) Picker silently dropped empty (cloud-only) files and, with no patient open, all but the first photo — now says so. Still unknown: whether her phone still holds unsent photos (Settings › Photo relay on the phone shows "N still to send").

Pains table (her 2026-10-12, pick A of `pain-table-mock.html`: "each of these pains needs a table ... how long ... pain score can integrate in"): the pain cards under the Pain map (flat and 3D drawer) are ONE table, `phPmTableHtml` (Pain / Side / Detail / How long, x). `since` lives on the pain entry (`plan.painMap[]` / `rec.painSites[]`; `phPmWrite`'s whitelist now keeps it), typed as a date or "2 yr" (same parser as Came in for) with quick picks under the row while the box is focused. On the Musculoskeletal page ONLY (`phPmScoreCtx`, set by `phMskPainCardHtml` and by `phPmRefresh` when the box sits in `[data-msk-pain]`) there are also Now / Best / Worst boxes per pain and a shaded "All pains" row = the highest of each. Scores live on today's MSK visit: `rec.msk.visits[day].pains["<region>|<side>"] = {now,best,worst}`, rolled up into the existing `vis.nprs` (so the Re-measure table, the tiles and the MSK plan's pain symptom row `severity` follow, unchanged). A score is set from a 0-10 strip that opens under the row (`phPmScoreSet`; tap the same number again to clear). While no pain carries a value for a measure, the All pains box is tappable and sets `vis.nprs` directly (older data shows there too). With pains on the map the old separate "Pain score" card is hidden (`phMskNprsHtml(rec, name, plan)` returns a hidden stub); with none it stays. Came in for's derived Pain row takes its How long from the earliest pain `since` (display only until she edits it). Known: a side change on a pain re-keys it, so that visit's per-pain scores for it are not carried over; on a phone the table scrolls sideways inside its card (desktop-first).

"Came in for" table C (her 2026-10-12, mock `came-in-for-table-mocks-2026-10-12.html` Option C): the table is now Complaint | How long | Started | x (`phCcTableHtml`, class `ph-cc-tbl c4`). No left label column: the chief row carries a "Main" tag and the plan type is a small tag under it (`.ph-cc-plan`, x still clears it). Started is worked out from how long and stored as a flag: `complaint.sinceEst` / `secondary[].sinceEst` = true when set by a quick pick or "3 wk" (shown `~12 Sep`, italic), absent when she typed an exact date or for older data (shown plain); `phCcStartTxt` adds the year only when it is not this year (`~Oct 2024`). Tap How long or Started (`data-cc-main-open`, `data-cc-sec-tog`) to open that row's quick picks + an exact-date/"2 yr" box (`phCcActive`, "main" for the chief row); a pick or a typed value repaints and closes the row. A new secondary (typed or a suggestion chip, now inside the add line "Often with this:") copies the chief complaint's since + sinceEst. "+ note" shows on row hover only (always on touch). Everything downstream still reads `since` (Goal, treatment Nature column "for 4 wk").

Energy (her 2026-10-12, "a lot of terms relating to energy ... I often use the term energy ... 5 rating scale", pick B of `energy-scale-mocks-2026-10-12.html`): ONE word, **Energy**, rated 1 (drained) to 5 (strong) for Morning / Afternoon / Evening. `rec.energy = { v:1, days:{ "YYYY-MM-DD": {am,pm,ev,at} } }`, written only by `phEnWrite` (tap the same number again to clear). `phEnergyCardHtml(name)` (host `[data-en-host]`, click handler `[data-en]`, `phEnRefresh` repaints every card then Fang Bing Ren / Patterns / side panel) shows on Today's visit (after Came in for), at the top of the Fang Bing Ren page, and at the top of the Men's "Energy & sleep" and "Stress & sleep" usual-answer sets in place of their old energy question. The day average is the one number everything reads (`phEnRead`, `phEnergySigns`): Fang Bing Ren Bing `fatigue_now` (now "Low energy") ticks from TODAY's average <= 2.5; Ren `fatigue_tend` ("Usually low energy") from the LATEST rating <= 2.5 and `vitality_intact_tend` from >= 4.5; Patterns gets the `fatigue` clue from a latest average <= 2.5 (so Qi deficiency counts it; `phPfAddClues`). Hooked into `phTriEffective` + `phTriAutoWhy`; a tap on the row still wins. The two standalone old questions (men "Energy through the day", sleep "Waking tired") are removed from `PH_PFW_SETS`; an answer already saved still counts (`phEnLegacyLow`, a legacy clue block in `phPfAddClues`) until she rates her Energy; the "Tired" option inside the PMS question and "Exhausted, flat" inside the change-of-life question stay (they are symptoms inside a list). Synonyms: `PH_BING_ALIAS` for fatigue_now / fatigue_tend / vitality_intact_tend / debilitated_tend / desire_lie_curl_tend (search "energy", "tired", "fatigue", "exhausted", "worn out", "lethargic", "drained", "stamina"...), the notes regex in `phPatClues` also reads worn out / lethargic / drained / run-down / sluggish / wiped out. Kept as their own signs (not merged): weak or debilitated constitution, desire to lie down and curl up, nervous exhaustion. NOT built: an Energy row in the Treatment symptom table; the "time of day" is shown only as "Lowest in the afternoon" on the card. Which number ticks what, and the wording, are DRAFT, hers to correct. Ren reads the latest rating (any date), so one low day can tick the Ren sign until she rates again.

Photos Comparison table (her 2026-10-12, "make the photos larger - large enough to see the differences of photos side by side" then "both, change tongue table to comparison table and include all pictures"; mock `photos-larger-mock-2026-10-12.html`, designs A + B together): the gallery's third view is now **Comparison table** (`phRenGalTableHtml`, was the Tongue table). Rows = EVERY photo type that has a photo (`phRenRowsFor(() => true)` filtered to rows holding photos, plus any leftover key via `phRenRowLabel`), columns = dates, newest left; every picture is drawn (two on one day stack, oldest first); the chips above (All / Unsorted / a type) narrow the rows. A: a Size slider in table mode (`phRenGalTblSize` 0-3 = Small 96 / Medium 160 / Large 260 / Fit the page; `data-gal-tsize`, moves `--cw` and the `.fit` class in place, no repaint). B: with more than two dates, "Show" date chips (`data-gal-tdate`, `phRenGalCmp` patient key -> up to 2 picked dates; a third pick drops the oldest; "All dates" clears). Photos keep their natural shape (no square crop). The By visit / By type slider now reaches 420 px (was 240). An empty row ("not taken") only shows for a date that lacks a photo in a row that has others; rows with no photos at all are no longer listed. Sandbox-tested with synthetic photos (rows, all images, chips, slider, Eyes filter); the real Photos page, the viewer tap and a phone width were NOT exercised.

Constitution mosaic -> family cards (her 2026-10-12, "make the diagram bigger and formula mosaic buttons smaller, group the da huang herb family and da huang formulas together", mock `fbr-mosaic-grouped-mocks-2026-10-12.html` option A, her picks: all families, bigger score = wider tile): the loose proportional mosaic in `phTriHtml` is now `.ph-fbr-cards`. Each herb heads a card tinted in its colour (`.ph-fbr-card`, `--c`) with its formulas on a branch (`.ph-fbr-card-fs`), grouped by `PH_REN_FAM_GROUPS` (the same herb -> formulas list the Ren figure's family list uses; a family not listed gets its own entry); herbs with no formula share an "On their own" row. Cards sort by the family's best score; the card holding the leader has a gold ring. Tiles (`.ph-fbr-t`) are 26 px high, width = 96 px + 5.5 px a point (never wider than the card), name + score + a thin fill bar (score/max x3); the full "28 of 146" is the hover title. `data-tri-filt`, Pick several, lead/filter rings unchanged. The lead line and the filter row moved under the cards (inside `.ph-fbr-left`); the figure beside them is 270 px on a wide window (was 112; 350 with Labels; 210 under 1100 px, 170 under 760 px). `PH_FBR_MOSAIC_*` and `.ph-fbr-mo*` are now unused.

Rail "you are here" (her 2026-10-13, pick B of `rail-current-page-mock-2026-10-13.html`): the current page in the patient rail is a solid deep-teal pill with white text, gold step number (steps) or gold dot (pages under a step); CSS only, `.ph-flow-step.on` and `.ph-flow-sub button.on`. It beats the gold "next up" tint, so the current page that is also Next up reads as current. The gold Next-up pill, ticks and dates keep their own colours (light on the dark pill). Tested by rendering a synthetic rail in the real stylesheet (computed colours); not looked at on a real patient, and on a phone the step row (the only part of the rail shown there) takes the same pill.

Constitution section compact (her 2026-10-12, "make the diagram smaller and this section more compact vertically - give option to expand the diagram", mock option 1 of `fbr-compact-figure-mocks-2026-10-12.html`): the figure is 120 px (190 with Labels) with a Labels pill and a ⤢ button under it (`data-fbr-expand`, handled in `phTriClick`); ⤢ opens the big labelled figure (`phFbrFigureHtml(name, fam, true, true)`, `big` = no buttons, uid `fbrfigx`) in the shared `#phRfModal` shell (`.ph-fbrx`). Esc now closes only the expanded view (capture-phase listener with stopImmediatePropagation, covers Ren's expand too). A family card with 4+ formulas spans two columns from 1000 px up (`.ph-fbr-card.wide`); tiles 24 px, card padding tighter; Quick assess / Who answered what / Linked symptoms share one `.ph-lk-tools` row (the quick-assess and audit panels follow it). Section went from about 780 px to about 390 px tall in the sandbox.

Tongue page = a comparison (her 2026-10-13, "when tongue page opens, it should always show comparison of todays photo and last dated photo", mock `tongue-compare-default-mock-2026-10-13.html`, layout A): the Examine Tongue page (`phVisitTongueHtml` with `exam`) returns `phTngCmpHtml`. Left = today's best photo (natural light first, `PH_TONGUE_SHOT_RANK`), right = the last dated photo of the same kind (same shot as today's when that day has one; "Last", or "Past" once she picks another); a strip down the right (`Past photos`, 6 shown, "See all" opens Photos) swaps which past photo is compared (`data-tcmp-sel`); a Tongue | Sublingual switch flips the pair (`data-tcmp-kind`). View state only: `phTngCmp` map (patient key -> {kind, sel}), never saved, handled first in `phTngClick` and repaints just `[data-tng-host]`. No today photo -> an "Add today's" camera slot beside the last photo; no earlier photo -> "First tongue photo for her". All chips keep their existing handlers and Fang Bing Ren badges; the chips are one column (Tongue body: Colour, Shape·Moist; Coat & underside: Coat, Under; the More fold adds the rest). Gone from this page: the old two-column chip layout, the "Same as last visit" link (exam mode never had a last visit) and the old bottom "Tongue photos" strip (`phTngGalleryHtml` is now unused). Sandbox-tested with synthetic photos (default, pick, sublingual, More fold, no today / no past / none / loading); NOT exercised: a real patient, a chip tap, adding a photo from the camera slot, a phone width.

Pregnant patients are not asked to track the cycle (her 2026-10-13, "pregnant patients dont need to track menstrual details anymore", seen on the Treatment table's "Cycle - reported, not examined" rows): `phCycleTracked(rec)` = `phCycleOn(rec)` and no positive pregnancy result (`phCyclePregnantPositive`: Pregnant? test or an IVF transfer result). It gates ONLY what asks her to log: the Cycle tile / checklist step / Next-up (`phTodayParts`), the Cycle rail page (`presTpMainSections`), the plan's cycle block and the Treatment table's cycle rows + "Edit on Cycle" (`presTpShowCycleBlock`), and the Communications "My Cycle - gone quiet" list (`phChartQuietRows`). Not touched: cycle data, the phase sync, cycle messages (`phCycleOn` stays the wider check), and the Pregnancy plan block. A later negative result brings everything back. Sandbox-tested with synthetic patients (pregnant by test, pregnant by transfer, not pregnant); not looked at on a real patient.

Fertility timeline (her 2026-10-13, "make a new treatment care plan for pregnancy. include a pregnancy timeline to track things like blood tests, ultrasounds etc." then "include timeline for all fertility treatment care plans"; mock `pregnancy-timeline-mocks-2026-10-13.html`, her 8 picks: both layouts with a switch, under the Session grid, one shared record, standard items per plan, hand-over to pregnancy, overdue = amber only, per-patient edit + her own default list). The Pregnancy plan itself already existed (5 phases); this adds its timeline. `phTlHtml(rec, name, plan, page)` sits right under Focus/Goal (above the Session grid) in `presTpPlanTabBodyHtml` AND on its own rail page "Timeline" (her 2026-10-13 "both 1 and 2": `presTpMainSections` id `timeline`, listed under Treatment Care Plan in the rail with "Phases" next to it via `planSubs`, sub-label "3 of 13" = `phTlCountText`; only plans with a timeline get it; `page` = always open, no fold button, host `data-tl-page="1"`; the Next button on it is the Care Plan's, i.e. Treatment) (host `[data-tl-host]`, repaints in place with `phTlRefresh(name)`, also called from `phTpPregBlockRefresh` so a new start date re-places the weeks). `phTlKindOf(plan)`: Pregnancy -> `preg` (weeks 0-40 from `rec.pregnancy.start`, trimester bands in the Pregnancy block's own colours), Natural fertility -> `nat`, IVF Protocol / Cycle & IVF Protocol -> `ivf` (date axis around today, month ticks). Open by default on Pregnancy, folded to one line on the others (`daybook-ph-tl-fold-<kind>`, layout `daybook-ph-tl-lay`, per device). Layout A = week/date ruler with pins in three rows (scan / blood+test / visit+jab) over a real table; layout B = one lane per type with window bars + a detail card (pill switch Checklist | Lanes).
- **Stored:** only `rec.tl = { v:1, done:{"<kind>:<id>":{date,res,at}}, edit:{key:{n?,a?,b?,date?,off?}}, custom:[{id,kind,n,t,a?,b?,date?}] }`, written only by `phTlWrite`. Everything else is derived on read by `phTlModel`. Her own default list = `PHARMACY.tlSchedules[kind]` (replaces the built-in `PH_TL_DEFAULTS[kind]` when present; first edit copies the built-in list so item ids and every patient's done marks carry on). Edited on the "Standard list" sheet (`#phTlSheet`, reuses `.ph-lk-sheet`) from the timeline's ⋯ menu AND the template editor's "☰ Timeline items…" link (`PH_TL_KIND_OF_TPL`). No cloud-merge protection yet for the new `PHARMACY.tlSchedules` key (same known edge as `goalWording`).
- **One record, shown everywhere:** a blood item with markers (`mk`) is done by itself when `rec.bloods` has a result with one of them (Pregnancy: dated inside the item's window +-7 days; fertility: her latest result not over 12 months old), showing the values with the page's own up/down arrows and an Open / Add result button to the Blood tests page (`data-flow-go="bloods"`); IVF items read the IVF history (`phIvfDatesRead` collection/transfer, `phIvfScanList` first scan = baseline, later = stimulation, beta hCG and heartbeat dates are transfer +11 / +30 days, marked `~`); Pregnancy test items read `rec.pregTest` (blood/urine kind only) or a transfer's result; Natural fertility cycle-day items (Day 2-3, scan CD 2-5, Day 21) take the next window from `rec.cycle.lmp` + cycle length (not when the LMP is over 120 days old). Anything else is hers: Mark done (date + typed result, Undo), or a planned date.
- **Status:** done / due now (this week on dated plans) / overdue (amber, never blocks, no nag) / coming up / not planned. Overdue = a pregnancy window whose last week has passed, or a planned date in the past. Derived dates are never overdue.
- **Per patient:** tap the item name to rename it, change its weeks or planned date, "Back to standard", or Remove (shows under "Removed:" with a restore chip); "+ Add" makes a custom item; ⋯ > Reset my changes. **Hand-over:** the Pregnancy timeline has a "Before pregnancy" fold = Natural fertility items done on or before her start date + one line per IVF round (collection and transfer dates).
- **Not built / disclosed:** the full-screen plan window (`phTpPlanBodyHtml`) does not show the timeline; all item names, weeks and windows are Claude-drafted (DRAFT, hers to correct); the "Cycle & IVF Protocol" template name no longer exists as a built-in (the list is kept for old plans); a typed scan result is free text (no scan record exists outside IVF). Phone: the checklist stacks to cards under 640 px.

Photos by drag and drop or paste (her 2026-10-13, "when i clicked on camera icon, nothing happens. give me option to drag and drop photos or paste it"): on a computer a photo can be DROPPED anywhere on an open patient (a full-page veil says "Drop photos for <name>"), PASTED with Ctrl+V (a screenshot or copied files; ignored while typing in a box and when the Ren / Medical history paste already took it), or chosen with "Choose files" in the Photos section's Add box (`.ph-photos-drop`, `#phPhotoDropInput`, shown above the type chips). All three go through `phRenDropFiles` -> the untagged batch confirm (`phRenConfirmOpenBatch(files, target)` with `target.defaultType: "tongue"`), so each photo carries its own tag (starting on Tongue, no shot = unsorted) and nothing is saved until Save. The camera disc on the patient header (desktop, Profile stage) still jumps to Photos with Add open; a second tap while the box is open opens the file chooser, so it never does "nothing". Non-image files are left out with a message. Sandbox-tested with synthetic drag / drop / paste events (box renders, veil, 2-photo drop, paste, text paste ignored, textarea ignored, non-image only ignored, no patient open ignored); NOT exercised: a real drag from Explorer, a real chooser, saving to a real patient, HEIC files (Chrome cannot read them; they fail at Save with the usual message), a phone.

Pulse chart: several qualities in one cell + Normal (her 2026-10-13, "include option for multi select e.g. thin and weak / add normal pulse with drawing"; her picks: B "keep adding", stamp only (no All-normal button), Normal can sit with anything, small drawings side by side, every quality counts once in the scores, last visit's dashed cell shows all of them, both pulse charts). A grid cell is still `{quality, shape}` plus an optional `more:[{quality, shape}]` (older marks have none and read as before); `phPulseQuals(m)` is the ONE read of a cell's qualities (scores, KB hits, Fang Bing Ren pulse words, summary text, mini/micro grids, comparison fields all go through it), `phPulseCellToggle(marks, key, stamp)` is the ONE write (adds the stamped quality, taps it again to take just that one off, erase clears the cell) for both the Pulse exam page (`data-constit-pulse-*`) and the old per-visit editor (`data-visit-pulse-*`, `phVisitPulseHtml` is dead code now, only the handlers still run). **She drew the whole set (screenshots, 2026-10-13), and the arrows are a LAYER of their own ("separate pounding from pulse so I can layer it"):** Normal = a thick arch, Wiry = a flat line, Thin = the dotted look that makes a line dotted (Thin alone = the dotted flat line; Thin + Wiry + Weak = one dotted flat line with down arrows under it, her picture "thin weak wiry pulse"); Pounding = three UP arrows under the line (1 arrow = Slight pounding, a separate stamp, 3 = strong = "Pounding"); Weak = three DOWN arrows under the line; Blocked = a loop that crosses itself; Small compressed = a narrow red peak (no baseline); Medium compressed = a wide peak on a dotted baseline (she first called it "large", then corrected to medium; there is NO large drawing, do not invent one). Alone, the arrow stamps draw ONLY their arrows (no arch); stamp Normal / Wiry / Thin as well to layer a line under them. `phPulseShapeSvg(shape, arrows, dashed)` draws one glyph (arrows `"up"` / `"up1"` / `"down"`), `phPulseGlyphs` picks the drawings for a cell (Normal's arch and Wiry's flat line, dashed by Thin; the arrows ride on the first line; Blocked / Small / Medium after; `PH_PULSE_STANDALONE`), the amplitude score line also counts Slight pounding (no meaning attached, she gave none), `phPulseCellInnerHtml` = drawings then a small word per quality with no drawing, more than three parts shows "+N" (tooltip lists all; `compact` = one part + "+N" for the small grids). Wiry moved from the text stamps (`PH_PULSE_OTHER_Q`) to `PH_PULSE_SHAPES`; an old mark that holds "Wiry" as text now draws as the flat line (`PH_PULSE_SHAPE_OF_Q`). Normal adds nothing to the Thin / Pounding / Weak scores and ticks no Fang Bing Ren pulse sign. Never invent a drawing she has not drawn: any other quality stays a word. Sandbox-tested with a synthetic patient through the real handlers (add / remove one / erase / scores / phone width 400px no overflow); NOT exercised: a real save to the cloud, the dashed last-visit cells (the live Pulse page has no last-visit grid; only the dead per-visit editor did).

Patient details UI audit (her 2026-10-13, screenshot of Sylvia Lai: "audit page for consistent ui icons colours shapes and remove instructions"). Found and fixed: (1) **colour** -- the case theme (`.ph-pres-panel.case-gyn` crimson / `.case-msk` navy) only repainted `--ph-green*`, so everything that reads `--ph-herb*` (rail "you are here" pill, outlined buttons, round icon buttons, the Came in for border, progress chips, ring, avatar) stayed teal on a crimson page; both token families now follow the case (general stays teal). Scanned Today's visit, Treatment Care Plan, Treatment and Fang Bing Ren on a gynae patient: no teal left (Dispense and the full-screen plan window were NOT scanned). (2) **icons** -- one family, the app's own sprite via `<svg class="ph-cc-svgic"><use href="#i-...">`: the envelope (was the text glyph), the avatar camera (was an emoji), every remove x (was "×" and "✕" in different sizes and colours; now one 11px `#i-x`, quiet grey, hover = case colour); the calendar button is a circle like the other icon buttons; the avatar camera badge was being cut in half by the avatar's `overflow: hidden` (the photo now clips itself). (3) **no ›** on Open / Start one buttons (the 10/10 one-button-system rule). (4) **instructions removed** -- the "<family> plans first" line and the "Used in Treatment / Review · re-check" row under Came in for (both copies; the old Review name was stale anyway), "+ add another, Enter" -> "+ add another", "What brought her in? Type e.g. ..." -> "What brought her in?", the "e.g." examples in the complaint, Fund and Note boxes. Kept on purpose: "Often with this:" (labels the suggestion chips), the dd/mm/yyyy, 04... and name@... format hints, "Saved ✓". Flagged, not changed: the gold "Ren →" hero card, the rail's "Next up: Ren" and the plan card's "Next: Ren →" all say the same thing.

Ask her page (her 2026-10-13, "build it"; mock `ask-her-mock-2026-10-13.html`, her picks: a page of its own, the TOP 3 Fang Bing Ren families at once, "pick the answer that fits", answers tick EXISTING Ren signs, each topic asked once, a dot on every answer for the family it supports, live re-rank that keeps answered topics, last answers pre-selected on a return visit, optional tile not counted): rail page under Today's visit after Musculoskeletal (`presTpMainSections` id `askher`, `phAhPageHtml`, sub-label "n of m" = `phAhCountText`) plus an optional tile on Today's visit (`PH_TODAY_AH_PART`, ticked when every asked topic has an answer, `phAhDone`). NOT in `phTodayParts`, so never in "n of m done" or the Up-next walk; it IS in the page-to-page Next button chain (`order`, after `msk`). `phAhState(name)` reads the top 3 from `phFbrRank` (families with a score above 0 only; none yet = just the four basics, Bowels / Appetite & digestion / Heat & cold / Sleep), asks the basics plus each top-3 family's five biggest-weight topics (`PH_AH_TOPICS`, ten topics, each answer = one existing Ren "tends to" key or none = "normal"), and keeps any topic she has answered. Taps go through the one write door (`phAhTap` -> `phTriWrite` + `phTriSetYes` / `phTriClearYes` / `phTriSetNo` + `phLinkAfterWrite`), so links, the clash question strip (`phLinkStripHtml`, repainted by `phLinkRepaint` -> `phAhRefresh`), Patterns and the Treatment table follow with nothing new. Tap an answer that is only on from a chart / history = ruled out (her own No); "normal" clears the topic's signs and rules out any a chart ticked; a sign answer ruled out by a link shows struck through. Stored: only `rec.askHer = { v:1, t:{ [topicId]: { day, none? } } }` (day stamp + the "normal" pick); the picked answers are the Ren ticks themselves, so a return visit pre-selects them and shows "last time: ... · 1 Oct" for topics stamped on an earlier day; "Same as last time" (`phAhSame`) stamps every answered topic today. The "moved into the top 3 (instead of ...)" note is view state (`phAhNote`), set only by a tap that changes the top 3. Footer: "Ticked on Fang Bing Ren" (all topic signs now on) + "Standing" bars for the top 3. Dot colours = `PH_FBR_HERB_COLOUR` (the Fang Bing Ren cards' own). **All question and answer wording is DRAFT, hers to correct.** Ren signs only (no Bing "today" versions): open question to her. Energy is left to the Energy card; cycle questions are not here (open: whether they should stay out for pregnant patients). Sandbox-tested with a synthetic patient through the real click handler (empty state, taps, tap again, normal, links, clash question + Change to No, re-rank note, return visit captions + Same as last time, rail section / tile / Next chain, styles applied); NOT exercised: a real patient, a phone width, a screenshot (the pane would not draw), the Today's visit tile click.

Ask her, Bing "today" versions (her 2026-10-13, "yes add bing today versions"; and "cycle questions stay out for preg patients"): a pill switch **Usually | Right now** in the page header (`data-ah-mode`, view state `phAhMode`; a return visit opens on Right now, a first visit on Usually). Each answer is `[label, Ren key, Bing key, Bing label?]` in `PH_AH_TOPICS` (null = not asked in that version and left out, "" = the normal answer); Usually ticks the lifelong Ren "tends to" sign as before, Right now ticks the Bing "today" sign (`kind "d"`, resets each day; last visit's ticks come up pre-selected through the existing `prevD` carry-forward with "last time: ... · date", and tapping a carried-forward answer rules it out). Bing-only answers: Feels feverish, Night sweats, Profuse sweating. Answers with no honest Bing twin are left out of Right now (very hungry, mood swings, bloated belly, dry then watery stool, sensitive to temperature change, bitter taste, heavy head, anxious / agitated, often at night, the phlegm card...); mappings that are close but not exact are my pick (Nausea -> nausea_vomit, Dreads heat -> heat_averse, Chest stuffy -> chest_oppress, Shallow sleep -> insomnia_dream). Stored: `rec.askHer = { v:1, t:{...}, d:{...} }` (t = Usually, d = Right now and counts only the day it was set); "Same as last time" in Right now also turns the carried-over answers into hers so they carry on. Topic choice, dots and "Standing" read the matching column of each family's weights. The footer lists every sign on, marked Ren or Bing. Rail / tile count = the version the page is on. NO cycle questions on this page; if one is ever added it must be gated on `phCycleTracked(rec)` (pregnant patients never see it). Wording and which Bing sign matches which answer are DRAFT, hers to correct. Sandbox-tested with a synthetic patient through the real click handler (switch, Bing taps + clash links, top 3 moves, return visit carry-forward + Same as last time + tap to rule out); NOT exercised: a real patient, a phone width, a screenshot.

One lead + Ren and Bing together (her 2026-10-13, "fix 1 and 2 first" from the Ren audit `ren-audit-2026-10-13.html`; report `fbr-lead-and-rank-fix-2026-10-13.html`): (1) ONE lead for every screen that names a leading family = `phFbrLeadOf(ranked)` over the EFFECTIVE Bing + Ren picks (ticks + auto-ticks). Fang Bing Ren (`phTriHtml`) and the Ren page (`phRenTabHtml`) both read it, so a sign shows the same +N on both and the Ren page never says "no ticks yet" over auto-ticked signs (it says "no family leads yet" if signs are on but no family weighs them); if the Ren signs alone lean elsewhere it adds ", Ren alone: <family>". `phFbrRenLead` is still the RAW-tri.p Ren-only read (rail "Ren ✓ <family>", done flag, Ti Zi, `bt_<id>` pattern clue, Today's visit) and must stay raw: effective picks inside it recurse through `phPatClues`. (2) Rank = `fit` = (bP + rP) / 2 where bP = Bing points / that family's own Bing max and rP = Ren points / its own Ren max (`phFbrRank` returns `bP, rP, fit`; ties fall back to raw points). Old rule was Bing first, Ren only a tie-break, raw sums (long tables won: Wu Ling San, Xue Fu Zhu Yu, Si Ni San took 38% of random ticks, now 8%). `phFbrBySide(ranked, "d"|"p")` = one side's own leader; `phFbrAgree(ranked)` = agree / split / bing-only / ren-only, shown as a line under the leader on Fang Bing Ren ("Bing and Ren agree" or "Bing leans X, Ren leans Y") with "fits 45% (Bing 90%, Ren 0%)". Family-card tiles show the fit % (points in the hover), the "N in all" card total is gone, Ask her's Top 3 / bars and the rail's "% built" show the fit. Quick assess (`phNq*`, its own chance model) and the Ren figure's family list (Ren score only) are untouched. Known trade-off: a family with a shorter list swings more on few ticks (Yu Ping Feng edges Fang Ji Huang Qi when only a quarter of Fang Ji's signs are on). Remaining audit findings 3-9 (unscorable rows, severe/profuse rows, Gui Zhi leftovers, wording, weights she never gave, misfiled signs) still wait for her decision. Sandbox-tested with synthetic patients (lead + badges on both pages, Energy-only, a Ren tap moving the fit, Ask her, side panel, tile, Patterns page, no console errors); NOT exercised: a real patient, a phone width, a screenshot (the sandbox draws the sign-in screen over the page).

Ren audit fixes 3 to 9 (her 2026-10-13 "fix 3 to 9"; report `ren-audit-fixes-3-9-2026-10-13.html`, original `ren-audit-2026-10-13.html`). **"A / B" lines**: a formula may carry `or: { ren: [[a, b]], bing: [[a, b]] }` for a row she wrote with a slash (one row, one weight) that the pool holds as two signs; both signs keep the line's weight, ticking either or both scores the line ONCE (`phTriSum(weights, list, picks, or)`, `phFbrMax(weights, or)`, `phFbrSumKeys` for the Ren-change figure; `phFbrRank` passes `f.or`). Used by Gui Zhi (cold / wind; dusky / tender tongue), Huang Qi (wheeze / cough; congestion / rhinitis), Si Ni San (belly tenderness / pain worsened by pressure), Yin Chen Hao (dry mouth / thirst), Fang Ji Huang Qi (sweats easily / profuse; obesity / full-figured). New Ren signs: `tongue_firm_tough`, `bupleurum_type_tend` (a TAP sign, never derived from the Chai Hu score), `rhinitis_tend`, `bloating_severe_tend` (prefills from a belly marked distended AND hard, like Bing `abd_distend_severe`), `belly_pain_severe_tend`, `sweat_profuse_tend` (in the sweat link), `coat_white` (Ban Xia, Xiao Chai Hu; any thickness; in the coat link; prefills from a white coat), `pain_pressure_worse_tend`, `thirst_tend`, `full_figured_tend`. Gui Zhi Ren now equals her 8 Oct table (74): flat belly / bright eyes / belly pain (2 each, 5 Oct leftovers) are off Gui Zhi, the two signs stay in the pool (bright eyes still draws). Huang Lian Ren 40 -> 55 (her three tongue rows), Chai Hu Long Mu 92, Si Ni San 64. Da Cheng Qi, Wu Ling San and Shi Gao no longer score plain "sweats easily" / bloating / belly pain. Labels reworded to her rows: lips, moist flesh, edema (feet / lower legs), navel pulsation, neck and shoulder. Groups: new "Diagnoses" group (4 dx_* signs), period pain / pms breast / acne before periods filed under "Cycle & fever pattern"; `pms_irritable_tend` stays under Subjective on purpose (`phTsSubjRows` reads the Subjective group for the Treatment table). Ask her's Sweat topic offers "Profuse sweating" under Usually too. Audit finding 7 CLOSED, she said "keep" (2026-10-13) to all six weights that were my picks: V-shaped tongue 5, family history of diabetes 1, round eyes 3, Ban Xia very dry tongue -3, Xiao Qing Long cautions -3 / -2 / -3, label "Unexplained infertility" -- they are now hers, do not re-ask. Not touched: the Bing side (Shi Gao Bing "profuse sweating" is still scored by `spont_sweat`), Ma Huang / Da Huang / Fu Zi against her original tables, Wu Ling San "thick white greasy coat" and Xiao Yao San "pale / sallow" (shared signs, left). Sandbox-tested (totals, every family scores its ceiling and leads itself, each "A / B" line once, new rows in their groups on the real page, a tap, the sweat clash question, no console errors); NOT exercised: a real patient, a phone width, a screenshot.

**Patterns clues tick Fang Bing Ren (her 2026-10-13, "correspond patterns with fang bing ren e.g. cold hands in patterns tick it in fang bing ren too"):** the Patterns page's "Cold hands and feet" (usual answer "Hands and feet: yes") only ever reached the Ren row `cold_extrem`; the Bing row `cold_limbs` stayed dark. Rule now: a Patterns clue ticks EVERY Fang Bing Ren sign that says the same thing, Bing and Ren (the way "Feels cold" always did), through `PH_TRI_PREFILL` (sign -> clue key(s); applies to both columns; a tap always wins). New Bing twins: `cold_limbs` <- cold_limbs, `night_sweats` <- night_sweat, `throat_lump` <- throat_lump, `insomnia_dream` <- sl_hard / sl_wake, `mood_stress` <- stress, `fibroids` <- fibroids and `endometriosis` <- endo (history), `knee_pain` <- pr_knee (pain map). Ren signs that only the usual answers fed now also read the day log: `dark_clots_tend` <- clots / dark_blood, `menstrual_pain_tend` <- + stabbing / cramp / dragging / severe_pain, `menstrual_irreg_tend` <- + irregular_len / long_cycle, `shallow_sleep` <- + sl_hard / sl_wake. The row tooltip now names the source ("On the Patterns page: Hands and feet: yes (usual answers)"). Left Patterns-only on purpose (no same-meaning sign, or the clue mixes several facts): flow amount, discharge, low mood, low iron, PMS, heat, bloating-or-loose, dryness-or-thirst, hair and nails, thyroid, adenomyosis / cysts / PCOS, pain moves / worse at night / damp / stiff, short cycles. Fatigue stays with the Energy card. Chart words: the pulse specs now take the words Patterns already counts (`pulse_wiry_thin` + Tense / Tight / String; `pulse_faint_sinking_weak_tend` + Empty / Feeble / Yielding / Sunken). BUG FIXED on the way: `phFbrChartWords` mixed pulse, tongue and belly words in one list, so a "thin abdominal wall" mark ticked "Wiry or thin pulse" and a tender belly ticked "Tender, moist tongue body"; it now returns the list with `.pulse` / `.tongue` / `.abd` pools and `phFbrChartKnown` reads only its own chart (abd: words -> belly pool, `pulse_` / `p_` keys -> pulse, the rest -> tongue). Sandbox-tested through the real functions and the real page (Bing and Ren Cold hands both on with the new tooltip, a tap on No beats the auto-tick, day-log and history ticks, pulse words, belly marks no longer tick pulse or tongue); NOT exercised: a real patient, a phone width. Not done: the reverse direction (a Fang Bing Ren tap becoming a Patterns clue; only Sensitive to cold, body type and round eyes do that).

**Pulse symptoms split (her 2026-10-13, after seeing the Patterns -> Fang Bing Ren chart):** "Tense, tight or string pulse" and "Wiry or thin pulse" were lumped rows; she asked for separate symptoms. This SUPERSEDES the "Tense / Tight / String count as wiry" part of the paragraph above (that was my synonym guess; clinically tight is not wiry in Jing Fang). Patterns: `p_wiry` ("Pulse is wiry") plus new `p_tense`, `p_tight`, `p_string` ("Pulse is tense / tight / string"), each read from its own word in the pulse chart (`phPatClues` pulseWords). The two rules that used `p_wiry` (Qi stagnation, the phlegm / Qi one) list all four keys and the four share the clue group `pulse:wiry-family`, so a pulse that is both tense and tight still counts once there (scores unchanged). Fang Bing Ren: Ren sign `pulse_wiry_thin` is now `pulse_wiry` ("Wiry pulse") and `pulse_thin` ("Thin pulse"); Chai Hu weights both at 3 and lists them in `or.ren` so the line still scores ONCE (max stays 91); chart words are just "wiry" / "thin". Tense, Tight and String have NO Fang Bing Ren sign (no formula scores them), so they tick nothing there. A tap already saved on the old row carries to both new rows once (`phTriToday` migration, then the old key is deleted). Ren groups and `PH_TRI_INLINE.pulse` updated. Still combined and not split (she did not ask): "Wiry or rough pulse", "Faint, sinking, thin, or weak pulse". Sandbox-tested through the real functions and the real pages (clues, rule count once, chart words, Chai Hu score once, migration of Yes and ruled-out, rows on the Fang Bing Ren and Pulse pages, no console errors); NOT exercised: a real patient, a phone width.

**Both ways between Patterns and Fang Bing Ren (her 2026-10-13 answers to my two calls: "bing and ren" and "build"):** (1) "Hard to fall asleep" and "Stress or irritability" tick BOTH sides: poor sleep already did (Bing `insomnia_dream`, Ren `shallow_sleep`); stress now also ticks Ren `irritable_mood` (`PH_TRI_PREFILL`, with Bing `mood_stress`). (2) The reverse direction is built: a Yes she TAPPED on Fang Bing Ren (raw `rec.tri.p`, and `rec.tri.d` only for TODAY, never a pre-filled value) adds the Patterns clue that says the same thing, through `PH_FBR_TO_CLUE` (rows of [sign keys, clue keys]) and `phTriTapClues(rec, out, add)`, called last in `phPatClues`. Clue text is "<sign label> (Fang Bing Ren)", src `tri`, go `{tab:"patterns"}`; a sign that says two things (dark blood or clots, tooth-marked swollen tongue, greasy yellow coat, night sweats) adds both clues under ONE group (`tri:<sign>`) so a rule counts the tap once. Covered: symptoms (dizzy, period pain, irregular periods, fatigue, sweats, colds, palpitations, startle, sleep, tight muscles, neck / shoulder / back / knee pain, night urine, cold hands, fixed or cold pain, dark clots, night sweats, throat lump, stress / irritability / anxiety, fibroids, endometriosis, PMS, bloating / loose stools, dryness / thirst, hair loss, heat, flushing, fever feeling, pulsation, belly pain), pulse (wiry, thin, slippery, weak), tongue (red, purple, swollen, teeth marks, yellow / greasy / thick coat, pale) and belly (soft wall, chest and ribs full, epigastrium, lower belly). NO clue exists for flow amount, discharge, low mood, low iron, edema, phlegm, body-type signs. NO ECHO: the clues it adds carry `fbrTap` and every Fang Bing Ren pre-fill reader (`phTriEffective`, `phTriAutoWhy`, the Quick-assess `clueKeys`) skips them, so a Bing tap can never tick a Ren row (or the reverse) by way of Patterns; the older "Sensitive to cold" clue (src `tri`, no `fbrTap`) still echoes as before. The Patterns clue list has a new "Fang Bing Ren" section (`PH_PAT_SRC.tri`, in `phPatCluesHtml`'s `order`); the "Sensitive to cold" clue now says "(Fang Bing Ren)" not "(Triangle)" and shows in that list (it was hidden). A tap now also reaches the Came in for secondary list for the clues `PH_CC_FBR_SX` knows (removable, as before). A ruled-out (No) tap does NOT remove a Patterns clue that came from elsewhere. Sandbox-tested through the real functions and the Patterns page (table keys all exist, Ren and Bing taps add clues, yesterday's Bing tap adds none, no echo, stress both sides, the new section on the page, no console errors); NOT exercised: a real patient, a phone width.

**"Wiry or rough pulse" split (her 2026-10-13):** Ren sign `pulse_wiry_rough` is gone. Its wiry half is the SHARED `pulse_wiry` ("Wiry pulse", the row the Chai Hu split made), its rough half is new `pulse_rough` ("Rough pulse", chart words Choppy and Rough Vibration; the Chinese 涩 pulse). Only Xue Fu Zhu Yu weighted it (5): now `pulse_wiry: 5, pulse_rough: 5` with `or.ren [["pulse_wiry","pulse_rough"]]` so the line still scores once (max 83 unchanged). `phTriToday` carries an old tap on the combined row to both (never over an answer the new row already has); Ren pulse group, `PH_TRI_INLINE.pulse`, chart prefill and `PH_FBR_TO_CLUE` (Rough pulse tap -> Patterns "Pulse is choppy") updated. Not touched on purpose: the Patterns pulse reader still files a Rough Vibration quality under "Pulse is thin" (a quirk in the `/thin|choppy|rough/` line) rather than "choppy" -- left for her call. Still combined: "Faint, sinking, thin, or weak pulse" (and "Wiry, forceful pulse" is a single sign). Sandbox-tested (rows, chart words, score once, both migrations, reverse clue, every formula weight still resolves to a sign, no console errors); NOT exercised: a real patient, a phone width.

**"Faint, sinking, thin or weak pulse" split (her 2026-10-13):** Ren sign `pulse_faint_sinking_weak_tend` is gone; four rows replace it: new `pulse_faint` ("Faint pulse"), `pulse_sinking` ("Sinking pulse"), `pulse_weak` ("Weak pulse") and the SHARED `pulse_thin` (the Wiry-or-thin split's row). Only Fu Zi weighted it (5): now all four at 5 with `or.ren [[faint, sinking, thin, weak]]`, so the line still scores ONCE (max 56 unchanged). Chart words: Faint = faint / feeble (so Feeble-Absent), Weak = weak / empty / yielding, Sinking = deep / sunken / sink, Thin = thin (the words the Patterns page already files under weak and deep). `phTriToday` carries an old tap on the combined row to all four rows (never over an answer a row already has). The "Pulse: floating vs sinking" link (`PH_LINKS_BUILTIN`) now opposes Sinking only (a floating pulse can be weak; Gui Zhi's is floating and weak). `PH_FBR_TO_CLUE`: Weak / Faint tap -> "Pulse is weak or empty", Sinking tap -> "Pulse is deep". Groups and `PH_TRI_INLINE.pulse` updated. STILL COMBINED: "Wiry, forceful pulse" is a single sign. Labels: the other session was rewording every sign to "Subject: descriptor" ("Pulse: wiry") in the working file while this was built; the committed rows use the committed convention ("Faint pulse"), so that reword pass must cover them. Sandbox-tested (rows, chart words per quality, score once, migration with an existing No kept, reverse clues, every formula weight and link key still resolves, no console errors); NOT exercised: a real patient, a phone width.

## Symptom wording "Subject: descriptors" + Energy in the Bing column (her ask 2026-10-13)
- Her words: "improve the wording of the symptoms. start with subject e.g. Muscles; sore, heavy / Tongue: red / Abdominal: bloating / Bowels: loose stools" and "move energy table to bing area, find a way to fit it in neatly and cohesively". Mock `symptom-wording-energy-mock-2026-10-13.html`; her picks: lowercase after the colon, rows sorted by subject, Energy as pick A (three rows), Energy on Today's visit and Stress & sleep KEPT, tongue split into "Tongue:" (body) and "Tongue coat:", disease names prefixed "Diagnosis:", full old-to-new sheet first.
- Every `PH_BING_SIGNS` / `PH_REN_SIGNS` label now reads `Subject: descriptors` ("Muscles: sore, heavy", "Abdominal: gas, foul-smelling", "Diagnosis: hepatitis"). "Tends to" / "Usually" are gone: the Bing and Ren column headings carry now versus lifelong. A NEW SIGN MUST FOLLOW THE SAME FORM (subject, colon, space, lowercase descriptors). A sign she types in herself has no subject and shows plain, sorted last.
- Keys, weights, links, chart words and saved ticks are untouched (labels only). Nothing in the code matches a sign by its label text (checked); `PH_LK_CHOICES` and the Treatment table read labels for display only.
- Helpers `phSignSubj`, `phSignLabHtml` (subject bold, `.ph-sg-sub` / `.ph-sg-rest`), `phSignCmp` sit just above `phFbrRowHtml`. `phFbrGroupedHtml` sorts each group by subject when no family filter is on (a filter keeps strongest-first); `phTsSubjRows` sorts the Treatment table's subjective rows the same way. Because Bing and Ren "now / usual" pairs now read identically, `phTsSubjRows` merges more of them into one row (dislikes wind, intense thirst, energy low, come and go).
- Energy: `phEnergyCardHtml(name, true)` returns the group shape (class `ph-en-grp`, `data-en-grp`; NOT the `ph-en` card class, which would add the white box). `phFbrGroupedHtml(..., lead)` draws it first in the Bing column; `phTriHtml`'s `col()` hides it while a complaint search is on or a family filter does not score `fatigue_now`. The card above the Fang Bing Ren card is removed. Same store (`rec.energy`), same `data-en` buttons and click handler; `phEnRefresh` repaints either shape.
- Review sheet `symptom-wording-sheet-2026-10-13.html` (every sign, old next to new, 66 subjects) is generated from the live file; ALL NEW WORDING IS DRAFT until she approves it. Built on session-a (b37f798); PUSHED LIVE on her "push live": main 56ee6e5, build 20261013-190000. She may still send wording corrections from the sheet.
- Verified in the sandbox: no console errors, rows sorted, Energy taps write and repaint, "Energy: low" ticks, phone (375) and desktop (1180) layouts. NOT exercised: a real patient record, and her phone.

**"Pulse: wiry, forceful" split (her 2026-10-13):** Ren sign `pulse_wiry_forceful` is gone. Its wiry half is the SHARED `pulse_wiry` ("Pulse: wiry"), its forceful half is new `pulse_forceful` ("Pulse: forceful"; chart words Robust and Forceful, i.e. Hammer's Robust Pounding; the plain Pounding stamp is deliberately NOT read, a Slight pounding would match it, so Pounding stays a tap). Only Si Ni San weighted it (5): now `pulse_wiry: 5, pulse_forceful: 5` with a second `or.ren` group `["pulse_wiry","pulse_forceful"]` so the line still scores ONCE (max 64 unchanged). `phTriToday` carries an old tap to both rows (never over an answer a row already has); Ren pulse group, `PH_TRI_INLINE.pulse` and `PH_FBR_TO_CLUE` updated (Wiry tap -> "Pulse is wiry"; Forceful has no Patterns clue so it adds nothing). All the combined pulse rows she named are now split (wiry or thin, wiry or rough, faint / sinking / thin / weak, wiry / forceful); `pulse_float_large`, `pulse_float_slippery_tend`, `pulse_large_flooding_tend`, `pulse_strong_excess` are still single rows (not combined lines). Sandbox-tested (rows, chart words incl. Robust Pounding ticks Forceful and Strong-excess, Slight pounding ticks neither, Si Ni San scores once, both migrations, no orphan weight / link / clue keys, row on the real page, no console errors); NOT exercised: a real patient, a phone width.

## Care Plan page "Case | Course" (her ask 2026-10-13: "too overwhelming, too much info, too much scrolling")
Mock `care-plan-mock2-2026-10-13.html` (all three: `care-plan-phases-mocks-2026-10-13.html`). Her picks: Mock 2 with the menstrual widget removed, applies to ALL plan types, ⋯ menu holds the rest, "Stack as-is" when narrow. Built by `presTpPlanTabBodyHtml`:
- **Band** (`.ph-tp-ccband`): plan title (taps open Change protocol) + stage pill (`data-tp-status-cycle`) | the slim instrument gauges (`phTpHeroHtml`, now `.ph-tp-slim`: visits, phase + pips, next; no ring, white) | ⋯ menu. The hero is still repainted in place by `phTpPlanRepaint` / the `[data-tp-hero]` swap.
- **Case column** (`.ph-tp-cc-case`, 290-340px card, left): `phTpFocusGoalHtml` (non-modal now shows the main pattern + any other Likely one; the rest are behind "Possible · N" = `phTpCcUi.dxMore`; "Updated today" is a gold "N new today" tag whose popover holds the sentence + Undo = `phTpCcUi.dxNote`; the full-screen plan window still draws the old long form), then `phTlSideHtml` (timeline as 4 lines: last two done + next two, "+ N more" goes to the Timeline rail page; same `phTlModel` as the full widget, host has `data-tl-side`), then `phTpScansHtml(name, plan, true)` (one line: latest, next, + Add, All scans; the full table opens UNDER the columns while she adds / edits or after "All scans" = `phTpCcUi.scans`).
- **Course column** (`.ph-tp-cc-course`): the locked Session grid, its appointment history STACKED under it (CSS only) showing the latest 3 (next booked first, then the most recent done) with "See all N" under the table (`phTpCcUi.apptAll`; the table's own thead is untouched).
- Under the columns: the Pain map / Also-treating tiles (full width), the full scan table when open, and the predicted schedule when she asks.
- **Gone from this page:** the cycle strip's calendar and its merged IVF-history / Next card (Cycle and IVF history keep their own pages; only the slim cycle BAR came back, see "Cycle bar on the Care Plan page" at the bottom of this file), the old head row, the in-page Timeline widget (it lives on the Timeline page), the always-on predicted schedule. A Pregnancy block / facial strip (`phTpPregBlockHtml`, `phTpFacialStripHtml`) still shows between the band and the columns.
- **⋯ menu** (`phTpPlanMenuHtml(name, plan, cc)`, `cc` = Care Plan page only): Edit diagnosis, Edit goal (`data-tp-menu-edit`), Change protocol, Show / Hide predicted schedule (`data-tp-sched-toggle`, only when the plan has one), then the old items. The stage stays a visible pill in the band (one tap cycles it Active > Paused > Done). **First item of EVERY plan ⋯ menu (Care Plan page, Treatment tab strip, Dispense ⋯; her 2026-10-13 "how to mark plan from active to completed")** = "✓ Mark completed" (sets Done) or, on a Done plan, "↺ Reopen plan" (`phTpPlanMenuHtml`'s `stItem`; handler `data-tp-status-set="name|planId|done|active"` next to the pill's `data-tp-status-cycle`; same acute-detour hand-back, saved, toast). The menu and the pill both read "Completed" (her 2026-10-13: the pill label comes from `PH_TP_STATUSES`, stored value still `done`).
- **Plan ⋯ menu is short (her 2026-10-13, "i dont use the majority of this"; she ticked what she uses in four popups).** On the menu: ✓ Mark completed / ↺ Reopen, + Add phase, ↕ Reorder phases, ✎ Rename plan, Herbs (follow default / on / off), ✉ Patient letter, then a **More ▸** fold, then Delete plan (red, last). Under More (nothing was removed): Edit diagnosis, Edit goal, Change protocol, Show / Hide predicted schedule (Care Plan page only), Re-run the IVF questions, Switch transfer track, Print IVF history (IVF plans), Print plan record, Save as template, Full screen ↗, ‹ All plans (single-plan patients only). One function, `phTpPlanMenuHtml`, so the Care Plan page ⋯, the Treatment tab strip ⋯ and the Dispense ⋯ all match; the fold is a plain `<details class="ph-pres-menu-more">` (opens in place, no repaint, no `data-pres-menu-item` on the summary so the menu stays open). To move an item between the menu and the fold, edit the `more` list in that function.
- **No folder bar, no duplicate list (her 2026-10-13, "theres a folder at top with plans inside the folder, thats not necessary"; pick "Open a plan, tabs to switch").** The 🗂 "Treatment Care Plan · ..." bar (`presTreatmentRowHtml`) only toggled a fold the page re-opens on every render, so it is gone for any patient with a plan (`bandless = plans.length && presTreatOpen`); it stays only for a patient with no plan yet (letter line / "Start with the letter"). With 2+ plans and none open, `presStagePlanAutoOpen` now always opens one (booked plan, else Active, else Paused, else the latest) on EVERY render, so the "which plan?" list (`presTpInlineListHtml`, which repeated the PLANS tabs) is never the landing and deleting the open plan lands on another. The ⋯ menu's "‹ All plans" is hidden for 2+ plans (the tabs do that job); with ONE plan it stays and leads to a one-card list + "+ New Treatment Care Plan" (the only way to start a second plan then, since the tabs hide for a single plan).
- **View state only**, never saved: `phTpCcUi = { scans, sched, dxMore, dxNote, apptAll }` (Sets of plan ids).
- Layout: side by side from a 1280px window up (the page sits beside the app sidebar and the patient rail, about 315px, and the Session grid needs ~620px); below that the columns stack, case first. Phone: the band's gauges drop under the title.
- Sandbox-tested with synthetic patients (IVF, Pregnancy, Natural, Neck & shoulder, Bell's palsy, PCOS, Perimenopause): the band, fold, popover, scans add / cancel, menu items, schedule toggle, Edit goal focus, Change protocol, Rename, timeline link, appointment latest-3 / See all, hero repaint, every rail page opens with no console error; 1440 / 1366 / 375 widths. NOT exercised: a real patient on her phone, the pain map with real pain data in the full-width tile, a Pregnancy plan with a start date, saving a scan from the compact view.

## Came in for roadmap (her 2026-10-13: "i dont like suggestions, it clutters the screen. do a better job at showing the simple roadmap of what complaint is and secondary complaint")
Mock `came-in-for-roadmap-mocks-2026-10-13.html`; she picked C (Timeline), "remove them from this card" (Fang Bing Ren rows), "yes, remove the gold card". Built on the existing handlers (`data-cc-main-*`, `data-cc-sec-*`); nothing about how a complaint is saved changed.
- **No suggestions on the card.** The "Often with this" starter chips (`PH_CC_SIGNS` is still used by the complaint search) and Fang Bing Ren's auto rows (`s.auto` from `phCcSecAll`) no longer draw: `phCcCardHtml` passes only typed/kept complaints (`.filter(s => !s.auto)`), and the plan card's "Also noting" line does the same. **Not changed:** `phCcSecAll` itself, so `phCcSeedSymptoms` (treatment-table rows) and the Goal line still read the auto complaints. `phCcFbrKeep` / `phCcFbrOff` and the `data-cc-fbr-*` / `data-cc-sec-hint` handlers are now dead code (nothing draws those buttons).
- **Timeline** (`phCcRoadHtml(pts, und)`, only with 2+ dated complaints): one line, a complaint's place = days since it started (longest ago left, Today at the right end, 6%..78% of the line). Main is the big dot, label below by default; others above by default; a label takes the first side (up, dn, up2, dn2) that is 22% clear of the last one there, so labels never overlap (axis/height grow for the second tiers). `aria-hidden`: the list is the accessible version. Complaints with no date wait under it as "No date yet" pills.
- **List** (`.ph-cc-road > .ph-cc-list > .ph-cc-r`, divs not a table): Main row = MAIN tag, her words (`data-cc-main-text`), plan tag with its x, how long + date; each secondary = name + its note on the same line (`+ note` on hover, always on touch), how long + date, x. The date (`.ph-cc-dt`) is hidden while the timeline already shows it (container query, card 521px and up, `has-tl` only). Rows are flex-wrap: the values and x drop under the name when the card is narrow.
- **Narrow card (520px or less, a container query on `.ph-cc-road`, not the viewport):** the timeline folds away and the list wears a left-hand "road" (dots, bigger one for Main). Browsers without container queries show both the picture and the dates.
- **Gold next-step card** is off Patient details: `presUpNextHtml(t)` (non-bare) returns the visits sparkline only (capped at 280px wide); Today's visit (`bare`) keeps it. The rail's "Next up" and the plan card's Next button are unchanged.
- Sandbox-tested (1366, 668, 375): add, rename, how long quick picks, exact date, note, remove, plan-tag x, Today's-visit copy, 2 / 3 / 6 complaints (label tiers), an undated complaint, no console error. NOT exercised: a real patient on her phone, a complaint with a very long name, a main complaint removed with several secondaries left.

## Patient details right column = ONE box (her 2026-10-13: "merge all this into one box", mock B of `patient-details-one-box-mocks-2026-10-13.html`)
Came in for, the file chips (79% ring + Medical history / Stress & sleep / Supplements) and the Treatment Care Plan used to be three bordered pieces. They are now ONE card, `.ph-pf-onebox` (built in `presPatientTabBodyHtml`): a white top (`.ph-pf-ob-top` = `phCcCardHtml`, the visits sparkline, `presPfProgressStripHtml`) and a tinted band under it (`.ph-pf-ob-plan`, the `data-pf-plantile-host`, = `presPfPlanTileHtml`). One border, no lines inside. The pieces keep their own classes and refresh hosts; the CSS block after `.ph-pf-fbrhd` only strips their own card borders. Plan band (Mock B, her pick over the roomier Mock A): row 1 = caps "Treatment Care Plan" + plan pill + phase text + Open, then the pips, then the Fang Bing Ren label + Open, then Bing and Ren SIDE BY SIDE (one column when the box is 480px or narrower: a container query on the box), then the Next button. About 320px tall instead of 433.
- Removed with it: the plan card's "Also noting: <secondary complaints>" line (Came in for is in the same box right above and lists them), and the outside "Treatment Care Plan" caps heading (it is inside the band now).
- No overflow:hidden on the box (the complaint typeahead menu `.ph-cc3-menu` drops down over the band); the band has its own bottom radius.
- Today's visit still shows its own stand-alone Came in for card (`phCcCardHtml(t, true, {today:true})`), untouched.
- Sandbox-tested with synthetic patients: IVF with a plan and real Fang Bing Ren scores, two secondary complaints with the timeline, a new patient with no plan, 375px; NOT exercised: a real tap on Open / Next, adding a complaint through the card's own handlers (PRESC is not reachable from the sandbox), the Key2 phone.
- **Two plans in the box (her 2026-10-13: "ivf protocol is completed and pregnancy protocol is now present, how can this page show it"; mock `patient-details-two-plans-mocks-2026-10-13.html`, her picks: Mock A "current leads" + "yes, treat all-phases-done as finished").** The band no longer uses `phTpShownPlan` (that still feeds the Case fill and phase fill, unchanged). `phPfPlanSet(name)` = { cur, earlier }: a plan is FINISHED (`phPfPlanDone`) when its status is Completed ("done") or every non-skipped phase is done; `cur` = the first unfinished Active plan, else the first unfinished one (Paused), else the latest plan; `earlier` = every other finished plan. The band shows `cur` (name, live phase, pips, and "· week N" on a Pregnancy plan from `rec.pregnancy.start`); a finished `cur` reads "✓ Completed" instead of "Phase — of N". Under the pips ONE line "Earlier ✓ IVF Protocol · Completed" lists up to the newest 3 finished plans (`+ N more` beyond that). **Open and each Earlier name use `data-pf-plan-open="name|planId"`** (click handler just above `[data-pres-stage]`: `presTpInlineOpen`, the app's own plan opener), so they land on THAT plan, not on whichever the plan stage would pick. Her own words in Came in for are never changed by a plan finishing. Not built: a second unfinished plan alongside `cur` is not listed (only Combine plans' "Also treating" tags show other conditions).

## Fang Bing Ren signs = ten shared areas + a "For this complaint" filter (her 2026-10-13: "this still looks messy, find better ways to organise and group signs, and allow me to filter it based on chief complaint e.g. fertility, prioritise signs relating to fertility")
Guide `fbr-signs-organise-guide-2026-10-13.html`, grouping look `fbr-grouping-options-2026-10-13.html`, interactive mock (read from the real 416 signs) `fbr-signs-filter-mock-2026-10-13.html`. Her picks: A shared areas; named conditions stay INSIDE their areas; quiet rows; pills starting on the chief complaint; "fold into one closed line"; relevance FROM HERB FAMILIES (draft top 4 per complaint + any family leading now); all 8 complaints; Tongue & pulse always open and whole; "fitting signs first, others behind + N others"; a Show switch; Energy & general and Cold, heat, fever & sweat ALWAYS open too; "build exactly this".
- **Ten areas, same on Bing and Ren** (`PH_FBR_AREAS`): Energy & general · Cold, heat, fever & sweat · Head, mind & sleep · Chest & breathing · Digestion & belly · Urine & fluids · Periods, fertility & breasts · Pain, muscles & joints · Skin, hair & build · Tongue & pulse. `phFbrAreaOf(kind, row)` places a sign by its SUBJECT (the word before the colon, `PH_FBR_SUBJ_AREA`); a "Diagnosis:" sign by its KEY (`PH_FBR_DX_AREA`); anything else falls to the area of the old group it was in (`PH_FBR_OLDGRP_AREA`), then to Energy & general. **A new sign must use a subject already in `PH_FBR_SUBJ_AREA` (or the subject must be added there); a new "Diagnosis:" sign needs a line in `PH_FBR_DX_AREA`, or it lands in Energy & general.** Only the Fang Bing Ren page uses the areas; the Ren page and `phFbrGroupedHtml` still use `PH_REN_GROUPS`.
- **The filter** (`phFbrForBarHtml` above the two lists, below the complaint search): pills = the 8 `PH_CC_FAMS` ids (Periods, Fertility, Menopause, Pain, Sleep, Weight, Face, Acute; Periods and Menopause hidden for a male patient) + Everything. It STARTS on the chief complaint (`phCcMainId`, gold dot on that pill); no chief complaint = Everything. View state only (`phFbrFor`, `phFbrShow`, `phFbrOpenSt`), never saved; picking a new pill clears that patient's folds.
- **What "fits"** (`phFbrBoardHtml`, was `phFbrAreasHtml` per column): a sign fits a complaint when ANY family counted for it weighs the sign above 0 in that side's table (`F.bing` / `F.ren`). Families counted = `phFbrForFams(id)` (the draft `PH_FBR_FOR_FAMS`, or her own list in `PHARMACY.fbrFams[id]`) + every family whose fit is within 10% of the leader once anything is ticked (`leadFams`). **The draft lists are MY measurement of her own weights (the four families carrying the most weight on that complaint's subjects), not clinical advice: she corrects them on the Signs sheet** (`phFbrSheetHtml`, the "Change on the Signs sheet" link; chips per family; "Back to the draft" per complaint).
- **Layout** (**now ONE board, see the "Every area is on shared Bing / Ren rows" bullet below; the counts here are Bing + Ren signs together**): areas ranked by the share of their signs that fit (Tongue & pulse last); an area is OPEN when at least a third of its signs (and at least 5) fit, or it is one of the always-open three, or it holds a tick (unless the "Everything else" fold is open, so ticking inside it never makes an area jump); the rest fold into one closed line "Everything else · N signs". Inside an open area: fitting signs first (everyday signs, then named conditions, each by subject), answered signs always show, the rest behind "+ N others in this area" (`data-fbr-more`; once open, order never changes when you tick). Tongue & pulse shows all its signs always. Header = icon, name, "N ticked" pill, fit / total (total only under Everything).
- **Show switch**: All · Ticked (only answered Yes) · Still to ask (fitting signs not answered Yes or No). **A search or a herb-family tile PAUSES the complaint filter** (every matching sign shows, all areas open, a line says so); the family tile still orders strongest first inside each area.
- **Quiet rows** (`phFbrRowHtml(..., quiet)`, only these two columns): a 0 score is not drawn at all; a score shows once the sign is ticked or pointed at; the ✕ shows when you point at the row (hover-capable devices only; a phone has no pointer, so the ✕ stays).
- **Tongue & pulse is ONE card on shared rows (her 2026-10-13, mock `fbr-tongue-shared-rows-mock-2026-10-13.html`, her picks: layout A "every sign on a row", tongue AND pulse, "red, firm, tough" reaches across two rows, tongue and pulse first).** `phFbrBoardHtml` hands area 9 (`PH_FBR_TP_IX`) to `phFbrTpAreaHtml` (was `phFbrSharedHtml`), which draws it as one area of the board (it used to be a third card under two columns). Bing is the left lane in the case colour, Ren the right lane in gold; a Bing and a Ren sign that say the same thing share a row, a run of rows with no sign on one side gets ONE dashed block ("No Bing sign here"). **Which signs share a row is MY DRAFT, `PH_FBR_TP_GROUPS` (Body: colour and shape · Coat · Body and coat together · Pulse), hers to correct there**; a sign the table does not list still shows under "More tongue and pulse signs". The rows are the ordinary quiet `phFbrRowHtml` rows, so ticking, ruling out, scores and links are unchanged. It follows the family filter, the complaint search and the Show switch (a hidden sign leaves an empty block); the area folds as `a|9` in `phFbrOpenSt`. The Ren page (`phFbrGroupedHtml`) is untouched.
- **Every area is on shared Bing / Ren rows (her 2026-10-13, "do the same for all categories"; mock `fbr-shared-rows-all-areas-mock-2026-10-13.html`, her picks: layout B "twins first, then two lists", ONE pair of headings at the top, my draft twins, all nine areas now).** The two columns are gone: `.ph-tri-cols` is ONE board (white card, container) holding `phFbrBoardHtml(rec, name, S, prevD, filtColour, forCtx, enLead)`: one pair of lane headings ("Bing · what is wrong now → family", "Ren · the person's build → family"; `.ph-sh-lane`), the Energy rating (Bing only, `.ph-bd-lead`, left half; full width when the board is narrow), every area as a `details.ph-bd-area`, the "Everything else" fold, "To check" and "Add a symptom" under the board (`.ph-bd-foot`, one `.ph-bd-fcol` per side; the add handler reads the input from its own `.ph-bd-fcol`), and a "Check the pairs" link. **Inside an area**: a band "Same fact, today and usually" (twins: Bing cell left in the case colour, Ren cell right in gold, same grid row) then, when twins exist, "Only on one side" (two independent lists, Bing left, Ren right, no dashed fillers). Area counts, ranking, open rule, "+ N others in this area" (`data-fbr-more="a|ix"`) and the "Everything else" count now count Bing + Ren together; fold keys are `a|ix`, `m|a|ix`, `rest` (view state only). A twin whose other side the Show switch or the "fit" fold hides joins its own side's list, so a pair is only drawn when BOTH signs show. **Which signs are twins is MY DRAFT, `PH_FBR_TWINS_DRAFT` (71 pairs: keys that differ only by `_now` / `_tend`, identical wording, plus a few that say the same in other words), hers to correct on the Twins sheet** (`phFbrTwinSheetHtml`, the "Check the pairs" link `data-fbr-twins`; Split / Pair again / Remove / pair two signs by two selects of signs with no twin yet; kept in `PHARMACY.fbrTwins = { off: ["bing|ren"], add: [[bing, ren]] }`; `phFbrTwins()` is what the board reads). Both signs of a pair must sit in the same area (`phFbrAreaOf`) or the pair is ignored; a user-added sign is never a twin. Tongue & pulse keeps its own table and sheet-less draft (`PH_FBR_TP_GROUPS`). **A new sign that has a twin on the other side must be added to `PH_FBR_TWINS_DRAFT`, or it simply shows in the one-side list.** Sandbox-tested (synthetic patient): tick both sides, rule out, Show Ticked / Still to ask (half-hidden twin moves to its list and back), For pills + Everything, "+ N others" open and close, area fold, Everything-else fold, family tile + clear, complaint search typing (focus kept) + clear + no match, Add a symptom + Agree (Bing foot only), the Twins sheet (Split, Pair again, pair two, Remove), 1280 and 375 px with no sideways scroll, no console errors. NOT exercised: a real hover, a real phone, a patient on a real chart.
- Folds are native `<details>` driven by our own state: a click on `summary[data-fbr-sum]` is prevented, flipped in `phFbrOpenSt`, and the card repainted (`phTriRefresh`), so a fold keeps its state through every tick.
- Sandbox-tested (synthetic patient, fertility chief complaint): every pill, Everything, Ticked / Still to ask, "+ N others" open and close, area fold, Everything-else fold, search pause + clear, herb tile filter + clear, the Signs sheet (toggle a family, Back to the draft, close, Esc), 668 and 390 px with no sideways scroll. NOT exercised: a real hover (the pane reports no hover support), and a patient on a real chart.

## Complaint priority: a ribbon on every patient page, Medical history groups by the main complaint, a "Main" mark on Fang Bing Ren (her 2026-10-13: "find a way to show that the chief complaint and secondary complaints are of priority. on every page esp fang bing ren and medical questionaire")
Guide `complaint-priority-guide-2026-10-13.html`, interactive mock `complaint-priority-mock-2026-10-13.html` (her pick: "build exactly this"). Her picks: tags on rows AND a ribbon; every patient page; the phone folds to one line; relevance BY QUESTION GROUP only; tags follow the MAIN complaint only; a MAIN chip on the group heading plus a soft tint on its rows; the main complaint's groups first and the rest after; the other complaints as numbered chips "2", "3".
- **Ribbon** (`phCcRibHtml(t)`, host `#phCcRib.ph-ccrib-host` between the door card and `.ph-flow` in `renderPresPanelCore`, repainted by `phCcRibSync()` from `presFlowRailRefresh`, `phCcRefresh` and `phPmRefresh`): MAIN pill + her words + how long, then the other complaints as numbered chips (2, 3 ...) with how long, then an **Edit** link (`data-flow-prof="patient"`). READ-ONLY: `phCcRibItems(name)` reads what the Came in for card reads (typed main, else `phCcAuto`; typed secondaries `rec.complaint.secondary`; Fang Bing Ren's auto rows are NOT shown, per the no-suggestions rule). **Hidden** on Patient details (profile stage, first page) and Today's visit (`presTpMainTab === "today"`), for a formula, with no chief complaint (secondaries alone show nothing), and on the no-plan gate (that screen has no host). Shown on every other profile page, the plan pages, Treatment and Dispense (incl. the one-screen Dispense: it adds about 35px and the page still fits). Not sticky. Phone: the host is a size container (`container-type: inline-size`), so at 520px or less the panel shows `.ph-ccrib-fold` (MAIN + title + "+N more ▾"; with no others it shows how long + Edit) and "+N more" unfolds `.ph-ccrib-open` in place (`phCcRibOpen` = view state, never saved, handled first in `phCcClick`).
- **Medical history** (`phHxBodyHtml(rec, name)`): `PH_HX_FOR_DRAFT` lists, per complaint category, which of the six question groups count (Periods and Fertility: Cycle & bleeding, Structural, Reproductive, Family history; Menopause: Cycle & bleeding, Reproductive, General health, Family history; Pain, Sleep, Face, Acute: General health, Medication & allergies; Weight: General health, Medication & allergies, Family history). **THE LISTS ARE MY DRAFT, hers to correct** on the "Which groups count for each complaint" sheet (a chip beside "Send intake link"; `phHxSheetOpen`, same look as the Fang Bing Ren Signs sheet; her edits live in `PHARMACY.hxFor[famId]` = a list of group NAMES, "Back to the draft" deletes the key; `phHxForList(famId)` is the one read). The main category's groups sit first (each group still in its usual order) with a **Main** chip on the heading (`.ph-hx-maintag`) and a soft tint on the group (`.ph-hx-group.rel`); the rest follow; every group and every row is still shown. **This REPLACES the old rule "a non-gynae main complaint drops the cycle groups to the end"** (journey round 4). Only the MAIN complaint tags and orders: secondaries are typed words with no category (they show in the ribbon). A male patient's female groups stay hidden as before. The "not typical for this case" grey (case type) is unchanged and can sit beside a Main chip.
- **Fang Bing Ren**: the chief complaint's "For" pill wears a gold **Main** mark (`.mk`, replaces the gold dot) and, while that pill is the one on, the line starts "For her main complaint, <her words>." (the "Tap another pill for a one-off look" sentence in the mock was LEFT OUT on purpose: standing rule, no how-to-use captions). `phFbrForOf` and `forCtx.main` now read the SAME main complaint as the ribbon (`phCcRibItems`: typed first, else read off her pain map / plan), so a patient with no typed complaint but a pain map now starts the filter on Pain instead of Everything.
- Known / disclosed: the Edit link is an underlined link as in the approved mock (the 10/10 "outlined pill, no underlined words" button rule is for the patient panel's own buttons; the Fang Bing Ren page already has an underlined link beside the same pills); `PHARMACY.hxFor` has no cloud-merge protection yet (same as `fbrFams`, `goalWording`); the full-screen plan window and the History popup (modal) have no ribbon / no sheet link (the popup still orders and tags its groups).
- Sandbox-tested (synthetic fertility patient with two secondaries, then Pain, then no main): ribbon shown / hidden per page, Edit, phone fold + unfold at 375px, long text at 1600 / 700 / 375 with no sideways scroll, group order + Main chips + tint, the sheet (toggle, edited tag, Back to the draft, Esc), the Fang Bing Ren pill, Dispense one-screen fit, no console errors. NOT exercised: a real patient on her phone, the male patient path, the History popup (modal).

## Cycle bar on the Care Plan page: always shown, never folds (her 2026-10-13, build 20261013-340000)

Her words (with a Natural fertility Care Plan screenshot, "Case | Course" layout, no cycle bar): "i previously asked to remove the cycle bar. bring back but make it so its not collapsible". Built from the old folded look, no mock. My reading, NOT yet confirmed with her: "the cycle bar" = the slim four-phase bar row, not the old expanded calendar / IVF-history / Next card (those stay on their own pages).

- **`phTpCycleBarHtml(rec, name, plan)`** renders it, straight under `.ph-tp-ccband` (the `stripHtml` slot in `presTpPlanTabBodyHtml`). `phTpCycleBlockHtml(rec, name, plan)` returns it whenever a plan is given, so every repaint hook (`phCycleStripRefresh`, `phCycleRerender` -> `phTpCycleBlockRefresh`, the `data-cycle-block` + `data-cycle-block-plan` repaints) still finds and repaints it. A plain "Cycle" label, the bar with the Day N mark (labels inside the bar show on hover only, as before), the drop button, and one caption line ("Day 12 Follicular · period 2 Oct 2026 · next in 17 d"). No chevron, no `data-cycle-fold`, no localStorage fold memory (`phTpCycleFolded` and the `[data-cycle-fold]` / `[data-cycle-fold-log]` click handlers are GONE).
- **Drop button** (`data-cycle-bar-log`): opens today's Log-period box right under the bar. It is the same `phCyclePopHtml` box (Flow / Pain / Estimate only / Log period / Cancel), driven by `phCycleOpenDayPop` and then tagged `phCyclePop.host = "plan"`; the bar only draws the box while `host === "plan"`, so a box opened on the Cycle page never turns up here. A second tap on the drop, Cancel, or Log period closes the box; the bar itself never closes.
- **Shown when:** a cycle-template plan, or any other plan (not Pregnancy) when the patient has a real period on file (`showCycleBlock` in `presTpPlanTabBodyHtml`, unchanged). **Not shown** for a pregnant-positive patient (the builder returns "" itself, so a repaint also removes it). No period yet: hatched empty bar + "no period logged yet" + the drop. Cycle tracking off: "Cycle  not tracking a cycle" with no bar and no drop.
- **CSS:** `.ph-tp-cycblk.slim` (+ `.withmark` for the Day tag headroom), `.ph-tp-cycblk-lbl`, `.ph-tp-cycblk-off`, `.ph-tp-cycblk-pop`. The older `.folded` rules stay: the Pregnancy block (`phTpPregBlockHtml`) still uses them and still has its own fold.
- **Left untouched on purpose:** the rest of `phTpCycleBlockHtml` below the not-tracking branch (the old expanded calendar / facts / tiles body) is unreachable now (no plan path, `cycleOn !== false` returns the Cycle page above it). Removing it is a separate clean-up (check `phCycTilesHtml`, `phTpCycleLineHtml` etc. for other callers first).
- Sandbox-tested at 1400 and 375: no period -> drop -> box -> flow chip repaints in place -> Cancel / second tap closes -> Log period gives "Day 1 Period · period 13 Oct 2026 · next in 28 d" with the Day 1 tag; real period (Day 12) bar + caption; not tracking; pregnant (no bar); non-cycle plan with a period (bar) and without (none); no sideways scroll; no new console errors. NOT exercised: a real patient on her phone, the late-period (red tag) look, the IVF Protocol plan with milestone dates.

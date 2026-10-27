# LCM Pharmacy — design rules (read before ANY UI change)
Also read ABOUT-ME.md before any work — build to this user's preferences.

**The four files (audited 2026-10-21):**
- **CLAUDE.md** (this file) = the standing rules and what each part of the app is today. Read it in full.
- **BUILD-NOTES.md** = the dated build history (one section per build, from 2026-10-10). Before changing a feature, grep it for the feature's function names and read its note. **A new build note goes at the END of BUILD-NOTES.md, never in this file.** When a build changes a standing rule or what an area is today, fix that line here in the same commit.
- **STYLE-LCM.md** = the phone type scale (≤480px) only.
- **ABOUT-ME.md** = how she likes to work.
DESIGN-CONVENTIONS.md was merged into this file and retired on 2026-10-21.
**When two lines disagree:** her newest word wins, then the ★ rules at the top of this file, then the rest of this file, then STYLE-LCM.md, then BUILD-NOTES.md (history). When you find a disagreement, fix the losing line in the same commit.

# ★★★ ONE APP, WELL INTEGRATED — standing rule (her 2026-10-10 "all builds and developments are integrative. the same information needs to present in all places that reference it ... i want this app to be integratively heavy"; restated in her 2026-10-21 audit ask)
> Every page reads the same facts from the same place. Applies to every build, every page.

1. **Find where the fact lives and what already draws it, and call that.** Never a second renderer, mini-chart, summary or wording of the same record. The one read for each: tongue `phTongueChartSvg` (best photo by `PH_TONGUE_SHOT_RANK`), abdomen `phAbdChartSvg`, pulse `phVisitPulseSummaryText` / `phVisitPulseDotsHtml`, dated findings `phVisitFndRead`, pain map `phPainMapHtml` / `phPmList`, current phase `phTpLivePhase`, today's plan `phTpPlanForToday`, Fang Bing Ren lead `phFbrRank` / `phFbrLeadOf`, ticked signs `phTriEffective`, complaints `phCcRibItems`, blood results `phBldList`, Watch / Aim `phTpFieldView`, Diagnosis / Goal `phTpAutoDx` / `phTpAutoGoal`, a pattern's concept picture `phPpHtml` / `phPpSvg` (`PH_PP`, one per pattern), a sign's picture `phKsSvgHtml` / `phKsThumbHtml` (one per sign), a patient record for drawing `phPatientPeek` (never the mutating `phPatientRec`).
2. **One write door per fact:** `phTriWrite` + `phTriSetYes` / `phTriSetNo` / `phTriClearYes` (signs and links), `phPmWrite` (pains), `phCcWrite` (Came in for), `phMskWrite`, `phTlWrite`, `phEnWrite`, `phCxWrite`, `phTngWrite`, `phHxConstitPulse` (pulse chart), `phRenPhotoPut` (photos), `phTpFieldCommit` + `phTpFieldPick` (Watch / Aim). A new field on one of these records goes into its door's whitelist (`phPmWrite` silently drops unknown keys).
3. **Derived on read, never copied.** A value worked out from other data (auto Diagnosis / Goal / Watch / Aim; Fang Bing Ren pre-fills from charts, history, bloods, the intake form, pain words, food reactions, cycle, age and sex; Came in for from the pain map; IVF scan bloods in Blood tests; timeline items from IVF history) is computed when drawn and never stored. Only her own taps and typing are saved, and **her own value always wins** over the derived one, with a "back to auto" way out.
4. **Wire a new thing everywhere in one pass.** A new Fang Bing Ren formula, sign or clue = her code word **integrate33** (memory `feedback_integrate33_protocol`): add it, then wire it into the tongue / pulse / abdomen charts, Ask her, Medical history, bloods, cycle answers, Patterns, links and twins, the body chart and search aliases, with a matrix HTML of what was and was not wired. Checklists: a new sign uses a subject in `PH_FBR_SUBJ_AREA` (and `PH_FBB_SUBJ`), a women-only one goes in `PH_SIGN_ONLY_F`, its twin in `PH_FBR_TWINS_DRAFT`; a new formula joins `PH_REN_FAM_GROUPS` (its colour shades itself); a new plan category follows the checklist in BUILD-NOTES "Dermatology plan category".
5. **One shared component per job:** one toast (`presSavedToast`), one sheet shell (`.ph-lk-sheet`), one joined chip bar (`.ph-tng2-seg`), one undo, one compare, one photo viewer, one message composer. Never build a second.
6. **Every place that shows the fact repaints when it changes**, through that host's scoped refresh (never a full `renderPresPanel()`, which jumps to the top). A "nothing happens" bug is usually a missing repaint, not a missing write.
7. **Pages link to each other for real:** a finding opens its own page (`data-flow-prof` / `data-flow-go`); the rail's counts and ticks read the same done-state the page uses; a Timeline item reads IVF history, Blood tests and the pregnancy test instead of asking twice.

**Before you finish**, look at the fact on every page that shows it (Patient details, Today's visit, Care Plan, Treatment, Dispense, Messages, Fang Bing Ren, Patterns, Timeline, letters and print) and name in the build note which ones you checked.

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
**Audit step 4 (2026-10-15, her "yes to 1-6"):** the last on-screen "e.g." went (the template manager's "Paste phases as JSON" hover text, the IVF "Egg collection cycle" option now "(eggs or embryos frozen)", the iron reference note now "such as"); the Ren photo popover reads "→ <type>" like its quiet tag (no "suggests"); placeholders are the field's name again (Medical history paste box "Referral, note or shorthand", the relocation notice hand-over line has its label only, the Journey message box "Message"); the relocation search box and the plan review's Tongue / Pulse / Abdomen boxes lost their emoji (icons are the sprite, never emoji).

<!-- ============================================================ -->
# ★★ TAPPABLE THINGS — standing rule (her 2026-10-14 "i dont like links, i prefer chips" + her 2026-10-15 audit: all 8 picks = the recommended option) ★★
<!-- ============================================================ -->
> Audit report with counts, pictures and the full lists: `chip-audit-2026-10-15.html`. Where an older line anywhere below
> (or in STYLE-LCM.md) defines a chip, button, link, corner or caption differently, **this rule wins**.

**Everything tappable is one of five shapes. Nothing else taps.**
**One size for all of them (her chip audit, 2026-10-23, applied app-wide by 2026-10-24; this line wins over any older size below):** **32px tall, 6px corners, a thin line, 13px text** (a search box: 32px, 12px text, the search icon); picked = solid; **icon-only = a 32px circle**; one category's chips join into one bar. **Kept as they are:** stat tiles, rows and step rows over 52px, pulse chart cells, calendar days. **The dark top bar too** (her 2026-10-27 "audit these chips size"): from 641px up every control in it is 32px, the page's main button included (icon only = a 32px circle, with words = the Button; the 44px disc is gone); the phone's bar stays 31px. Phone sizes: STYLE-LCM.md. Her "no" to the Zanda finish (2026-10-24) keeps circles, 6px corners and normal case.
1. **Chip = pick.** 6px corners, 32px tall, 13px text (14px on a phone, STYLE-LCM's label size), 1px `--ph-line` line, white. Picked = solid `--ph-herb`, white text. One size everywhere.
2. **Button = act.** 6px corners, 32px, 13px bold, 1.5px `--ph-herb` line, white. ONE solid button per screen = the main step. An action is never an outlined pill.
3. **Dropdown = pick from many.** A chip ending ▾ that shows what is picked. **More than 6 options, or they wrap onto a second line at 375px = dropdown.** Several picks: ticks inside, the chip says "Build · 2" (picked answers may also show as chips under it). Stay chips: Mon–Sun toggles, calendars, stat strips, tab bars of 5 or fewer, the pulse brush bar.
4. **Field = a value you edit.** Faint tint (`--ph-herb-tint`), 6px corners, no outline. A number, supplier or note you tap to edit is a field, never bare text (Inventory stock, low-at, notes).
5. **Row = open something.** The whole row is the target, on a faint surface. A herb name or code in a list stays plain text inside its row (Dashboard, Inventory, Refill, To order).

**Menus** (sidebar, patient rail, tabs): each item a full-width row on a faint surface with its icon or number; the open item is filled.
**0–10 scores:** one joined bar of 11 cells, one tap. Never 11 separate chips.
**Chip rows for one category join into a bar** (her 2026-10-15 pick, the Tongue photo viewer chip audit; **confirmed as the standard 2026-10-16** — screenshot of the Abdomen exam's live Tension row, her words "i like this chip design. make this the standard for grouping chips"): chips from ONE category — whether she picks one or ticks several — sit edge to edge in a single pill-shaped segmented bar, no gaps, a 1px `--ph-line` divider between segments, the bar rounded only at its two ends (not each chip). Picked segment(s) fill solid `--ph-herb` (or the page's case colour, where one applies — Tension's screenshot was a gynae-case crimson page), white text, same as a lone chip. Where an option has its own meaningful colour (a `[key, label, hex]` triple — Tension's soft/medium/hard, Colour, Coat colour), draw it as a small round dot (`<i style="background:hex">`) inside the segment, same position picked or not — keep the dot, don't simplify it away. A gap only separates two DIFFERENT categories sharing one row (e.g. Coat's Thickness group vs its Colour group) — it never splits one category into loose chips with air between them. Applies wherever a chip row is really one pick/tick set (the Tongue analysis rows: Colour, Shape, Coat, Under, Marks; the "Which shot" row; the Abdomen Tension row) — not to a row of unrelated actions (footer buttons, Same as / Clear).
**NEVER:** underlined, dotted, arrowed OR PLAIN COLOURED text that taps; a tap target the same colour as the words beside it; a new chip size, corner or font size; a sentence under a control that explains it. A trailing › / → stays only where audit step 5 kept it (flow-wide "Next: ..." buttons, earlier / later pair, arrow-only buttons, data arrows).
**Why this exists:** audit step 5 (2026-10-15) fixed underlines and arrows but her words also banned plain coloured text, so 458 names, words and numbers (124 identical to the text beside them) and 155 button styles stayed unshaped; the chip rules disagreed (pill vs square vs 10px outlined vs "no outlines"), giving 36 chip looks on 25 screens.
**Fixed, 2026-10-18 (her screenshot of the Usual Period card's Flow/Clots/Pain rows + "fix it now")** — see the dated build note in BUILD-NOTES.md for the full writeup. Two corrections, both now standing: (1) a solid vertical line/bracket beside a chip-group's row label is a NO, same family as a border used where colour/space should separate instead; (2) one question's own options are ONE category and now join into a single bordered, no-gap bar — scoped to `.ph-pfw-opts`/`.ph-pfw-opt` (Usual period, meno/men's sets, Pain intake, any `presPfwSetHtml`-driven card). Find the Ren's Look rows join into bars too since her 2026-10-24 pick, which replaced her 2026-10-16 "loose individual pills".

**"Audit" = apply (her 2026-10-24, "when i asked for it to be audited, i wanted the rules to apply"):** an audit measures against these rules AND fixes every finding in the same pass, then reports before / after. Ask only where no rule covers a finding or a fix would undo a choice she made. Push still waits for "push live".
**Terse (her 2026-10-09 "not having explanation and instructions in app", widened 2026-10-15; this is the one wording):** no sentence on screen that explains what a thing is or how it works; a control is self-evident, or carries its affordance in a hover `title` / `aria-label`. Keep only a warning that stops a mistake (red flags, below-zero stock, a sign clash, the merge check, save failures), label text, data facts, and a legend that decodes a chart's own symbols (the pulse grid's △ / degree key). An empty state = two words + the chip that fills it ("No recipes" + [+ New recipe]).
**Pictures over words (her 2026-10-23: "i want more visually succinct images/diagrams/animations/icons and less words"):** lead with an icon from the sprite, a small diagram (dots, rings, bars) and motion on a real change; a label or sub-line moves into the hover `title`. Mocks and questions to her follow it too (short option names, a picture each).
**Screens follow code7's order (Remove → Combine → Infer → Group → Collapse → Contextualise → Hide → Reveal) and code3's brief, polite tone.** (The code3 section below is message wording; this line gives screens the same restraint.)

**Superseded by this rule (the old lines were removed in the 2026-10-21 audit):** "ONE pill/chip style ... square outlined buttons", "Pill shape = something she PICKS", the 10/10 smoothing "outlined pill = everything else", audit step 5's "outlined pill, 10px corners" (its no-underline, no-arrow rules stand), and the retired DESIGN-CONVENTIONS.md "text links". Corners still follow the scale (6 / 10 / 16 / pill): a chip, button, dropdown or field is 6px; only an icon-only control is round.
**Build order (her go, 2026-10-15):** 1 this rule · 2 plain-text taps become rows / fields / chips · 3 chip walls become dropdowns and joined 0–10 bars · 4 explaining lines out. All four have been worked page by page since (live on `main`, audited 2026-10-18); a page not named in a BUILD-NOTES.md note may still be unconverted, so check that page in the live app before assuming.

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
> Where older text further down this file disagrees, **this section wins**.

## 1 · Three groups, in this order
| Group | Pages, in order | How often |
|---|---|---|
| **1 Her file** | Patient details → Medical history → Ren → Supplements → Blood tests (her reorder, 2026-10-18, swapping Medical history and Ren; Stress & sleep left this list 2026-10-13, see §3) | Set once, kept current |
| **2 Today's visit** | Today's visit (checklist home) → Cycle (if on) → Tongue → Pulse → Abdomen | Every visit |
| **3 Put together & do** | Fang Bing Ren → Timeline (fertility plans) → Treatment Care Plan → Treatment → Dispense | Decide, then treat |

- **Today's visit layout since 2026-10-23 (her 8 picks, mock `today-visit-mock-2026-10-23.html`, BUILD-NOTES "Today's visit:
  Ask · Look · Treat"):** the Journey card on top (plan phases, ▼ today, this phase's visit dots, next visit / next period /
  egg collection / formula / likely pattern / flagged history) replaces the one-line strip; a step bar that stays in view
  (Ask · Look · Treat, counts); **Ask** = the compass (its own progress line and "next:" chip are gone: one Next);
  **Look** = the cycle card (the Cycle page's sentence, Day 1 chip + finder, a 2-week slice of its calendar with the same
  day card, plan dates as tags) + Tongue / Pulse / Abdomen picture tiles (Skip in ⋯; Musculoskeletal a tile only for pain
  patients, otherwise "+ Pain"; "+ Ask her"), folding to one line when all done; **Treat** = Formula → Acupuncture →
  Dispense in one card (Dispense still opens the full prescription). The older description below is kept for the parts
  that did not change.
- **Calmer since 2026-10-27 (her "improve page, its too messy too many things i cant edit the ain coplaint the calendar
  looks to wide, i want it more minimal"; her 8 picks on `today-visit-calm-mock-2026-10-27.html` + "Yes, build it";
  BUILD-NOTES "Today's visit, calmer"):** the Journey card is ONE line (visit · phase, visit n of m, the phases as a small
  bar, then next visit / formula …); the step bar is short (Ask 0/2 · Look 0/5 · Treat 0/3, the part to do now filled);
  the ASK / LOOK / TREAT headings are gone (kept only as the bar's scroll targets); on a **cycle plan**
  (`PH_TP_CYCLE_TEMPLATES`) the cycle is ONE line (Day 9 · Follicular, this week's cells with the same day card, Day 1,
  the finder, Cycle ›, ⋯), on any other plan a small **Cycle tile** beside Tongue · Pulse · Abdomen; **the cycle never
  hides** for a menstruating patient (her standing rule); the tiles are small rows with no drawings; the "Add when needed"
  words are gone; the pain tools (Pick areas · Close-ups · Surgeries · Pain intake) sit in a **⋯ at the end of the Came in
  for line** and their bar shows under the table only while one part is open; **Treat** is one line of three (Formula ·
  Acupuncture · Dispense, one button each) with Care Plan › at its end. The Compass draws its table + panel (Details) from
  the first paint at her 1220px window (`phCxCardHtml` measures `#presPanel` less the rail before the stage body exists;
  `phCxSettle` puts a wrong guess right once). Do not bring back the big Journey card, the two-week calendar on Today's
  visit, the picture tiles or the headings without her word.
- **Today's visit** is a checklist home: a one-line strip on top (last visit
  date · likely pattern · phase and visit number · flagged history), the
  **complaint compass** (each complaint scored every visit against its baseline, grouped by
  body area, with the pains from the pain map as rows and the Fang Bing Ren
  signs she has answered rated under their complaint, Energy as the fatigue
  complaint's own score; it replaced the Re-check on 2026-10-14 and still writes `rec.recheck`),
  the return-visit "Worth a look" questions and one progress line, then
  Cycle / Tongue / Pulse / Abdomen as tiles with a ✓ when done today and last visit's finding beside
  today's. Each tile opens its own page. Pain / MSK patients also get a **Musculoskeletal** tile and page after Abdomen (2026-10-11,
  see "Musculoskeletal Assessments page" in BUILD-NOTES.md): the pain map + Pain intake moved onto it, so "Where it hurts" no longer sits on Today's visit for them.
- **Ask her comes first after Today's visit (her 2026-10-23 "i need this page to appear sooner. after todays visit"):** the
  rail lists Ask her, Tongue, Pulse, Abdomen, Musculoskeletal; the Next chain is Today's visit → Ask her → Cycle → Tongue → ...
- **Tongue, Pulse, Abdomen and Cycle are each their own page** (her pick,
  reversing the earlier one-card fold). Cycle has ONE home: its own page,
  reached from its Today's visit tile. No second Cycle tab. On HER own record
  (My profile) that one page sits in her Body group instead (One Me, 2026-10-26).
- **The Review step is retired** — folded into Today's visit (strip + pain
  map + pain intake). Nothing lost, only repeats removed.
- **Timeline** (her picks 2026-10-13 and 2026-10-16): its own numbered rail step right after Fang Bing Ren, before Treatment Care Plan, and in the Next walk, only on a Pregnancy / Natural fertility / IVF plan (see "Timeline promoted to its own rail step" in BUILD-NOTES.md).
- Other pages (Photos, Appointments, Messages, IVF history, Log, Visit
  checks, Checklist) are unchanged and sit outside this law.
- **The complaints live on Today's visit only (her 2026-10-18 pick).** There
  the complaint compass (`phCxCardHtml`) is their card; a patient with no
  chief complaint on file gets the plain Came in for card instead. Patient
  details (hero + 3 cards) has no complaint card. The no-plan gate (a
  brand-new patient with no plan yet) keeps its own plain `phCcCardHtml(t)`.

## 2 · The order of a visit
**First visit (her pick "Examine first"):** 1 Patient details → 2 Medical
history → 3 Ren → 4 Supplements → 5 Blood tests (if she brought any) → 6
Cycle (if on) → 7 Tongue · Pulse · Abdomen (and Ask her, which now holds the
sleep and mood questions) → 8 **Fang Bing Ren** (now has data to read) →
(Timeline, on a fertility plan) → 9
**Treatment Care Plan** → 10 Treatment → 11 Dispense. (Stress & sleep was
step 4 until 2026-10-13; Medical history and Ren swapped 2026-10-18.)
**Return visit:** Her-file pages show "✓ on file" and are skipped, except
Supplements (confirm) and Blood tests (if new). Then: the complaint compass →
Cycle (if on) → Tongue · Pulse · Abdomen → Fang Bing Ren as **one line: what
shifted** → (Timeline, on a fertility plan) →
Treatment Care Plan as **one line: phase, session** → Treatment → Dispense.
**Order of WORK, not of record creation:** a plan shell still exists from the
door (the "plan is the spine" no-plan gate, decision 3), because the exam pages
live on the plan stage's tabs. **The door has no template to pick (her pick
"From the concern", 2026-10-27):** Came in for, then one **Start Care Plan ·
<main concern>** button on the main concern's own course (`phTpDoorStartHtml`,
`phTpCourseFor`: of the family's courses, the one whose words match hers, else
its general one, else its first; a man's Fertility = Men's fertility). No
concern yet = Came in for only; no sex + DOB yet = Start here only. IVF and
Pregnancy still ask their questions first; the band's Course ▾ switches it
after. "+ New" (a second plan) keeps the course cards. Step 9 is when she
shapes and uses that shell after Fang Bing Ren, not when it is first created.
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
| Complaint compass, Cycle, Tongue, Pulse, Abdomen | Every visit (Cycle while on). |
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
- The complaint compass (Today's visit) → the Log and the Treatment tab's
  Response (pre-filled). **She declined a flag on the plan** (Phase 3): do
  not add one.
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

## 8 · Build phases — all built and LIVE
Phases 0-6 were built on 2026-10-10 and confirmed on `origin/main` 2026-10-18 (the phase table was folded on
2026-10-25; its detail is in git history). What they left that still holds:
- **Landing:** a return patient (a visit within 12 months, sex + DOB, one plan or a booked one:
  `presStagePlanAutoOpen`) opens on Today's visit; anyone else opens on the profile.
- **Next walk** (`presVisitNext`): first visit = file gaps → exam → Fang Bing Ren → Care Plan → Treatment →
  Dispense; return visit = exam first, file gaps after, and Next skips Fang Bing Ren + Care Plan (their one-line
  glances, `phGlanceHtml`, open them); Dispense only when herbs; a skip is memory only (`presUpSkip`). The gold
  Up next card is gone (2026-10-14).
- **Worth a look** (`phTodayNudgesHtml`, return visits): supplements Same / Changed (`rec.suppSeenAt`), history
  "Anything new since <date>?" (`rec.hxSeenAt`).
- **Findings:** `phExamMirrorToday`'s known edge: a part cleared after it was mirrored stays in that day's dated copy.
- **Left on purpose:** the stored default plan title "New treatment plan" (code compares to it); letters, printed
  plan records and message templates keep "treatment plan".
A new phase-sized change: build in the sandbox, show her, check 360px + desktop, push only on her "push live".

<!-- ===================== END OF THE LAW ====================== -->
This is a single-page web app: **desktop leads, the phone covers the
essentials** (see lcm6). It must always look clean, symmetrical, aligned,
organized, calm, sleek and minimal. Follow every rule, then re-check your work.

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

**No how-to text on screen:** the one wording is "Terse" under TAPPABLE
THINGS at the top.

**Phone type scale:** STYLE-LCM.md (≤480px). If a request conflicts with a
rule in it, update STYLE-LCM.md in the same pass so future builds don't undo it.

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
  `--ph-gold` itself is reserved (the brand accent, the one primary action
  disc, "you are here") and never used for a status/error state — give a new
  status its own `-tint`/`-deep` pair instead.
- **The one status green is `--ph-good`** (`-deep` / `-tint` / `-soft` /
  `-line` / `-hi`, defined beside the other status tokens; audit step 2,
  2026-10-15): better / agreed / ok / done marks, the "better" response chip,
  the Visit checks "better" cell, the abdomen chart's green mark, the
  follicular segment's pale fill on the cycle bars and calendars, and the
  pale outline of the visit table's square action buttons all read it. Never a raw
  green hex for any of those again. Kept raw on purpose: her named herb-row
  green `#15803D` ("green 3", her own pick on the visit table), the Dispense
  head and jar art above, Acupreg's `#8AAB99`, the Cliniko type colours and
  the Cycle page's own palette (`--cp-*`, her picks).
- **Case / category colour families**, one per condition, each with `-tint` /
  `-card` / `-deep` / `-press` / `-solid`; reuse one before inventing a new
  one: Musculoskeletal `--ph-msk*`, Gynaecology `--ph-gyn*`, Stress
  `--ph-purple*`, Metabolic `--ph-metab*`, Acute `--ph-acute*` (browner than
  the status amber), Facial `--ph-facial*`, Dermatology `--ph-derm*` (clay),
  Men's health `--ph-mens*` (indigo). Only gynae and MSK recolour the patient
  panel (`.case-gyn` / `.case-msk`, both the `--ph-green*` and `--ph-herb*`
  token families).
- **Contrast:** text on a tinted card uses the family's `-press` step when
  `-deep` fails 4.5:1. Hover lifts (brighter), never deepens. Never mix toward
  a pale tint to make a "stronger" fill (tints have almost no chroma).
  Amber TEXT reads `--ph-low-press` (`--ph-low-deep` stays for fills and
  lines). Every text colour is solid, never a token at reduced opacity on a
  label; a count badge on a solid chip darkens it (`rgba(0,0,0,.2)`), never a
  white wash. Fang Bing Ren colours pick white or ink by luminance (0.207) and
  a formula shade in the dead band is nudged out (`phFbrShadeFormulas`).
  Measured app-wide 2026-10-25: every text 4.5:1 (BUILD-NOTES "Readable text").
- **Type:** sizes come from the `--fs-*` tokens, never a one-off px. **One font on screen: Inter** (her 2026-10-27
  "i dont like this font" about Barlow Semi Condensed on the Care Plan title; her pick "Inter on screen"): words
  AND numbers, `--font-body`; `--font-disp` stays only as an alias of it. Every control inherits it (no browser
  Arial), SVG labels and canvas text name Inter, herb codes and supplier tags are Inter with `tabular-nums`. Never
  load or name a second screen font. Kept apart on purpose: printed letters and records (Georgia, print only), the
  bottle label text and its template, and copy-paste text or template tokens (monospace). Fitness joined too (her
  "Inter there too", same day): `--font-c22` is an alias of `--font-body`, Manrope is no longer loaded. LIVE 10/27, build 20261027-154200.
- **Icons:** one family, the app's own sprite (`<svg><use href="#i-...">`) —
  never emoji, never a second icon set.

## Fit the screen
- Check every screen at desktop (1280px) and phone (~360-375px) width:
  nothing wider than the screen, nothing cut off, overlapping or scrolling
  sideways. A wide table scrolls inside its own card.
- **Be space saving**: mobile screen space is scarce — compact stat rows over
  tall tile blocks, one-line rows, tight paddings, no duplicated numbers, the
  first screen should carry real work. Never trim real data to save space
  (counts stay), trim the chrome around it.
- Respect safe areas (`env(safe-area-inset-top/bottom)`). Nothing cut off
  under the status bar or at the phone's bottom edge.
- Every dropdown/menu/popover/filter panel MUST open fully on-screen; if it
  would run off an edge, flip or shift it; if taller than the screen, it
  scrolls inside itself and is NEVER cut off. Tapping outside closes it.
- **Phone laws (≤640px)** — CSS lives in ONE block at the end of the
  stylesheet ("PHONE REDESIGN"; since audit step 6, 2026-10-15, every
  640px @media sits in that section -- the big one at its top holds the 85
  folded blocks, one small one further down pairs with its 641-900px twin --
  bar the `.ph-pat-hero` block that must stay above its 480px rule. Never
  add a `@media (max-width: 640px)` block elsewhere), plus `window.innerWidth <= 640`
  branches in the relevant render functions. Desktop is untouched by any of this:
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
  simple and herbs-only (her 2026-09-15 "exclusive for herbal inventory
  management, i rely on appointments page to organise appointments"): Wrap up
  the day → Going out today → Urgent stock → Order/Refill cards (+ the
  stocktake nudge while a count is open). NO patient lists, NO week calendar, no month view, no "Recent
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
  Give a data table `table-layout: fixed` and a `<colgroup>` (or declared
  widths), so the first column read cannot take the space a later select or
  action cell needs. Rows alternate a faint tint; the row she is on gets a
  tint AND a left accent bar, never one without the other.
- **Her work phone is a BlackBerry Key2** — design phone screens against
  360 × 469 (not 360 × 780) when a feature is specifically phone-targeted;
  Android 8.1 / Chrome 138 is a speed constraint, not a capability one (the
  physical keyboard takes the bottom third, so height is the scarce resource,
  width is normal, and a tall textarea is fine since typing is cheap).
- **A category/status colour must always say what family it's in, out
  loud.** Reuse an existing semantic colour before inventing a new one; a
  column that silently inherits a Case/kind colour with no visible label is
  a bug, not a shortcut.

## Spacing & size (one scale, no random numbers)
- Margins/padding/gaps use the app's own density scale: **4 / 6 / 8 / 10 / 12 / 18px**
  (`--sp-1` to `--sp-6`, from her 2026-08-23 "smaller type, less air" spec), plus
  16 / 24 / 32px for section gaps and page gutters. Her pick 2026-10-13 after the
  audit (finding 2): this scale IS the rule. The old "only 4/8/12/16/24/32" line was
  never how the app was built (about 57% of spacing settings were off it) and is retired.
  Leftover 2 / 3 / 5 / 7 / 14px values are not to be copied into new code; fix them
  only when already editing that rule.
- Corners come in three steps plus the pill: **6px** small (tags, inputs, buttons,
  small chips), **10px** card / panel / tile / popover, **16px** sheet or question box,
  **999px** pill; 2px for hairline bars. Set 2026-10-13 (audit finding 3, her pick
  "apply the three steps"; 620 radius settings moved, plus `--field-radius-sm`
  11 to 10px and `--field-radius-area` 14 to 16px; about 15 near-pill 18/20/99px
  shapes were left as they are). Text boxes still read `--field-radius` (999px
  pill) in the code; a value she taps to edit follows TAPPABLE THINGS' Field
  shape (6px, tinted), and TAPPABLE wins where the two disagree. One type scale
  (title / body / label).
- **Dead space is a standing preference, desktop included** (her 2026-09-16):
  start a scrollable grid or timeline where real data starts (not hours of
  nothing first) and close up excess gaps between stacked header / toolbar
  rows. This removes space doing no job; it is not licence to cram content or
  to remove spacing that groups things, keeps a tap target or aligns a table.
- **A full-bleed panel still insets its own content** (her 2026-10-09 "the
  overall border of words and text at the top and left side are too close to
  the edges"): a container that cancels the page's ambient padding (e.g.
  `.ph-pres-panel`'s `--ph-pres-bleed`) gives its content `padding: 16px 0 0
  16px`, scoped `@media (min-width: 641px)`. Reuse this number and scoping
  (canonical example: `.ph-flow`'s own rule).
- **No text over text, nothing cut** (her 2026-10-27 spacing audit; the fixes are one dated "Spacing audit" block
  at the end of the main `<style>`). A row holding a 32px control is at least 36px tall; a column holds its widest
  real value (a full date, both action buttons); a word longer than its tile breaks inside it (`overflow-wrap:
  anywhere; hyphens: auto`) and never runs under a neighbour; a time either shows whole or drops out whole; a
  secondary item (a code beside a name) gives way before the data it sits beside.

## Alignment & symmetry
- Equal left/right padding, balanced top/bottom. Items share one left edge and
  consistent columns. Label/value pairs aligned. Group related items evenly.

## Separation & grouping — colour and space, NOT boxes and lines
- Show where sections begin and end using background tone and spacing, NOT
  borders, outlines or divider lines. A visible border is a last resort, only
  where colour and space genuinely can't separate.
- Never put a box inside a box. Avoid nested cards and clutter.
- No solid line or bracket beside a row label or a chip group (her
  2026-10-18; see TAPPABLE THINGS).
- **Say a fact once.** A fact shown near the top of a page (a phase or cycle
  day in the band) is not repeated in a section header below it; if two places
  would say the same thing, drop the second or make it say something new.

## Components — one system, no one-offs
- Tappable things: the five shapes of TAPPABLE THINGS at the top. (The older
  "pills pick, square outlined buttons act" split is retired.)
- One card style, one sheet, one toast, one undo, one compare, one message
  kind per job (★★★ rule 5). Screens with different jobs can look different
  inside the same system, but never a second look for the same job.

## Motion — only on a real change
- **Never put an entrance animation on a base class.** A scoped repaint
  rebuilds the node, so a mount animation on a class every render prints
  replays on every tap and the screen "flashes" (her 2026-10-17 app-wide fix).
  Motion runs on a transient class the handler adds for that one change
  (`.in`, `.pop`, `.fresh`, `.new`, `.glow`, `.lit`).
- A first sight of a widget may rise or count up once per open (a "seen"
  signature cleared in `presOpenScript`); a repaint of the same data plays
  nothing.
- A real change animates only the thing that changed: a chip pops, a row
  slides in, a count rolls, a ring grows.
- **Every animation is off under `prefers-reduced-motion: reduce`**, in the
  CSS and through `phTpReduceMotion()` in JS. Add it with the motion, not after.
- Anything timed in a hidden tab needs a `setTimeout` way out
  (`requestAnimationFrame` barely fires there).
- Motion never costs her scroll position or an open edit (see "Navigation
  continuity" under lcm6).

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
  **The one sanctioned crossing (Both clinics, 2026-10-25):** `othRead` reads
  the OTHER saved login's row with a second, memory-only Supabase client
  (`storageKey: "lcm-oth-auth"`, no persistence): ONE `select`, never an
  upsert, never `signOut()` (that revokes her saved login); a rotated token
  pair goes straight back into `lcm-locations`, and `switchTo` re-reads its
  entry from `lcm-locations` for the same reason. A pasted line for the other
  clinic is saved on THIS login's own row (`PHARMACY.apptHandoff`); the other
  login takes it into its OWN row when it reads this one (`phOthTake`). Each
  login still writes only its own row: keep it that way.
  **Her own things are shared on purpose (Me, 2026-10-25):** `public.lcm_me` is ONE row both logins read
  and write (her events, routines, birthdays, to-dos, and since her yes 2026-10-26 her OWN money: Mine hub; never herbs, patients or pharmacy money), gated by
  `window.__lcmOwnerOk` and RLS on the two addresses. Never put pharmacy data in it.
- **LCM never updates itself** (her spec after the Aug 2026 data losses: "a
  new version NEVER installs itself behind my back"). No auto-reload or
  auto-refresh on a stale build, ever; a new build only reveals the gold Update
  button, and `phDoControlledUpdate()` saves, flushes to the cloud, backs up,
  then reloads. Bump BOTH version markers on every push (Deploy & git).
- **The written-from-the-record summaries never read each other in a circle** (her 2026-10-27 freeze: "Loading your
  pharmacy..." then Chrome's "Page Unresponsive", on her real records only). The booking brief (`phApptBrief`), the Care
  Plan's auto diagnosis and goal (`phTpAutoDx`, `phTpAutoGoal`), the complaints (`phCxItems`, `phCcRibItems`, `phCcAuto`)
  and the pain map (`phPmList`) read one another: a new read from one into another must never lead back to itself.
  `phPmComplaint` asks `phApptBrief(a, plan, true)` for the complaint only; `phTpAutoMemoGet` answers empty for a key
  still being worked out (`phTpAutoBusy`). Test: a made-up patient with two open Care Plans, no pain map and a booking
  today must open (BUILD-NOTES "The freeze on load").
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
split, not a contradiction of the phone rules above, which govern the
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
useful information with minimum cognitive load, in order: Remove → Combine
→ Infer → Group → Collapse → Contextualise → Hide → Reveal, rather than
continually adding UI.

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
RECORDED, not poor — no third state. No rebate message wording exists: she
took the two rebate messages off the backlog on 2026-10-06 — never draft or
raise them.

**"Lives out of town"** (`rec.livesOutOfTown`) drops the return-visit
clause from outgoing messages and swaps "not booked" display text to "out
of town" on her own screens. Confirmed covering Check-in/Rebook/Acupuncture
follow-up/Gone-quiet/Review as of 2026-10-01 ("approve all for now") —
she can still correct individual lines later.

**Open:** the Formal / Casual tag and Supportive outside the cycle track are
in OPEN at the end. The phase → message wiring is built (Communications,
under Current state); this section stays the voice and content spec.

---

# Current state, by area

What each part of the app IS today (checked against `origin/main` and
BUILD-NOTES.md on 2026-10-21). For how a part got here, or its function
names in detail, grep BUILD-NOTES.md for the heading named in brackets.
Anything unsettled is in OPEN at the end.

## Sidebar (the app's menu)
Since 2026-10-26 (her 8 picks, BUILD-NOTES "Sidebar tidy-up"): "The clinic" over her name, a **Find a page** box (filters, gold letters, Enter opens, Esc clears), Every day + Every week open in her "Grouped by rhythm" order, **Records · Reference · Admin** each one folded line (label · count · chevron; remembered on this device in `daybook-ph-sb-folds`, the page's own fold opens), no Minimise row (the leaf at the top minimises), and one bottom row: the clinic pill + a gear for Settings (the drawer: "Settings" with its word). Code: `phSbFoldsPaint`, `phSbFind`, `phSbNavFit` above `renderPhShellNav`.

## Appointments & calendar
**Toolbar + Up next buttons (her 2026-10-23 picks, Zanda as inspiration, appt-chips-final-mock-2026-10-23.html):** every
control is 32px; text controls are 6px boxes (white, thin line, picked solid), icon-only buttons stay circles, text at the
app's own sizes; ‹ › then the date in full in teal (`phApptCalDateLong`), Today always there (greyed on this week), the day
count a "7 days ▾" dropdown (`.ph-atb-dd`), Grid | List a joined box bar, search with the magnifier; Up next = Open (solid) ·
Profile · Edit in one row, then Call · Text · Email circles (`.un-row3`, `.un-icons.circ`). This page departs from TAPPABLE
THINGS' pill chips on her word; other pages follow page by page [Appointments chips, one height].
Since 2026-10-23 the Next button, patient rail, search boxes and small pills app-wide follow the same 32px look [Shared chip fixes, one height]. Fang Bing Ren and Ren too: each sign a white 32px box with the ✕ as its own end [Fang Bing Ren + Ren chips, one height]. The exam pages (Today's visit, Ask her, Tongue, Pulse, Abdomen, Medical history) too [Exam pages chips, one height]. Treatment and the Care Plan too [Treatment + Care Plan chips, one height]. Timeline and Messages too; a message group over 6, or one that would wrap, is a dropdown [Timeline + Messages chips, one height]. Musculoskeletal too [Musculoskeletal chips, one height]. The Guide too [Guide chips, one height]. The To Order board too [To Order board chips, one height]. Every other page too [Every other page, one height]. The leftovers the re-audit found too (Cycle, Care Plan pain map, Treatment, visit filters, Diagnosis colours, Today's visit, Dashboard, Up next fold) [Chip audit sweep]. Inventory's in-row cells too [Inventory in-row cells at 32px]. The new prescription form too (Name, Ingredients, Notes, Save; New formula recipe and New patient share it, and the open recipe's add row): tinted 32px fields, + Add a Button so Save is the one solid one, the band's plain title not a field, and the phone's 12px gutter; LIVE 10/27, build 20261027-165600 [Prescription form chips, one height]. No emoji on any page (icons are the sprite) [Emoji out of the pages + Formula refill crash fix].
The app opens on this page. It mirrors Cliniko's day view: solid colour
blocks read off `PH_CLINIKO_TYPE_COLOURS` (her Settings → Appointment
types, 21 types read live; each block's words white or dark, whichever
measures higher, `phCkInkByContrast`, her yes 2026-10-25), a time gutter,
the page scrolls, no inner scroller (on a computer with her own things showing, the grid scrolls inside
itself: "Whole day" below). Grid opens by default at every width (List is a tap away). A
"long day" (≥600 min span) gets a minute-precision map (45+min gaps fold
to free bands). The visible range starts 30 minutes before the earliest
booking on screen and ends at the last booking's end (half hour; 4 hours
at least; nothing booked = 7 AM to 9 PM). **Seamless since 2026-10-25 (her
8 picks, mock `calendar-seamless-mock-2026-10-25.html`, BUILD-NOTES
"Appointments grid: seamless"):** on a computer the hours fill the window
(`phApptCalPxm` from the room `phPinApptZones` measured, one redraw when
it changes; a phone keeps 66px an hour); blocks edge to edge, 6px corners,
a 1px white seam, no shadow, hour hairlines only, no today wash; hover
brightens, nothing grows; overlapping visits nest (a later one sits over
the earlier from 45% across), visits that start together share in halves
(`it.same`); her own events are solid blocks that share the time with the
visits (see "My events: solid blocks" below); the day head is a small MON
over a big date, today's in a teal circle, no count. A live "now" line
ticks only while the tab is visible.

**On a phone, Google Calendar's spacing (her 9 picks 2026-10-27, mock
`calendar-phone-spacing-mock-2026-10-27.html`, BUILD-NOTES "Phone calendar:
Google's spacing"; ≤640px only, the computer unchanged):** ONE toolbar row
(`phApptCalPhoneBarHtml`): ‹ [Tue 27 Oct ▾] › · today's date in a circle ·
Me · 🔍. The date ▾ holds Day 3 5 6 7, Grid | List and Both clinics; 🔍 swaps
the row for the search box, its ✕ closes it and clears the search
(`phApptCalSrch`). The Day view has ONE date row (`.ph-apptcal-head.one`):
MON over the date in the time column, the day's chips (birthdays, ⟳, the
before-hours items: `phC22FoldRowHtml(…, bare)`) beside it, the cycle day at
the right; 3+ days keep the two rows. Time column 64px, hours 11px; 3px
between blocks (a clear 1px top and right edge); the name first (14px), then
"10:00 · focus" (12px); her events' names 14px, two lines when tall; no card
(edge to edge, blocks stop 16px short of the right edge). Text inset 7px and
66px an hour stay. The Saved pill was left as it is (it already fades after 2 s).

**Appointment popup** is where tapping any booking lands: avatar, name,
time/kind/ET pills, a plan picker, a gold "✦ New to you" flag, the action
chips Full profile / Call / Text / Cancel, then one summary line that
unfolds the detail rows (Focus, Herbs, Logged, Cycle, Scan) with Book
another / Edit at its foot. A positive-hCG flag (🌸 + gestational week)
shows in the popup and on Grid blocks once `rec.pregTest.result ===
"positive"`. Edit opens on an autofocused Date field (no separate
Reschedule). The Service field is a `<select>` of the 21 Cliniko types +
Home Visit/Break + "Other — type it…".

**List view**, desktop (>900px) = a lean list with a sticky card beside it
(row: colour strip, time, name + practitioner tag + one line of focus, the
plan as a pill in its family colour, a status dot; the card holds plan
buttons, cycle day, focus and goal in full) [The Appointments List: a lean
list with a card beside it]. At ≤900px the compact one-line row and the
phone stack are the older code. A single-day List appends the day stats +
"Herbs to prepare today" and the cross-patient **Today's IVF work** list.

**"Up next" card**: the next booking today, countdown ring, cycle/IVF
gauge, visit ring, herb-jar state, "✉ Send online form". The old lens chips
(Everyone/Herbs/Cycle & IVF/New to you/Home visits) are gone; at Acupreg
only, a practitioner chip row (Everyone · Anni · Charlie · Christine ·
Linh) dims the other bookings, and each booking's practitioner comes from
the weekday [Practitioners on the Acupreg calendar].
**The column beside the grid (her 10 picks, 2026-10-26, mock `appt-column-mock-2026-10-26.html`, BUILD-NOTES
"Appointments column"):** on a computer the Up next card (the ring beside the name, the phase bars in the visit line)
sits over one joined bar **Herbs · Patient · Me** and one panel that scrolls inside itself; the column is as tall as
the grid. Herbs = today's herb bookings (time · name · jar, a tap opens the prescription, "✓ n dispensed" folds);
Patient = plan · focus · goal · herbs · logged · last · scan + Book another for the Up next patient (opens first); Me = today's doses, meals, fasting, to-dos (the Me chip still opens the drawer). Since her 2026-10-26
picks (mock `appt-rail-card-mock-2026-10-26.html`, BUILD-NOTES "Appointments: the card inside the column") the column is a
44 px rail on EVERY view; a tap on the rail opens the column in place (360 px, the calendar narrows; the chevron or a tap
elsewhere folds it). The day's numbers stay behind the day-head tap (her pick).
**A booking tap opens its card INSIDE the column** (her 2026-10-26 "i only need one", then "move floating card to the
rail", "remove floating card", "Card inside the strip"): on a computer (over 900 px) on the Grid, the one appointment card
(`#phApptPop`, `phApptPopDock`) sits in the column, which widens to 360 px while the calendar narrows; no scrim, so the
next booking's tap swaps the card, the same booking again / ✕ / Esc closes it. The column never shows a "Selected"
patient. At 900 px or less the card floats beside the block as before (a bottom sheet on a phone).

**The Appointments dialog** is built once and patched in place: two panes
(add | booked ahead), a Quick add | Paste list switch, day chips, Home
visit / Repeat toggles, trash + Undo toast; never `phFlashShow` or
`renderPharmacy` inside it [The Appointments dialog: built once, patched in
place]. One paste can hold many patients (a name line above each block)
[Many patients in ONE paste]; a patient's own Appointments page has
"Paste appointments", which opens the same dialog for that patient only
[Paste appointments from inside a patient's profile].

**Home Visit** is its own colour family (`PH_LCM_OWN_TYPE_COLOURS`) with an
away bar on every surface a booking shows — a bridge until she books home
visits in Cliniko, then move it into `PH_CLINIKO_TYPE_COLOURS`. **Acupreg**
paints every booking sage `#8AAB99` (a LOCATION colour, in `phCkStyle`, not
`phCkTypeColour`); Home Visit still wins over it. Enquiry/Meeting rows get
a quiet grey "not a treatment" pill.

**C22 on the grid** (her 14 picks, 2026-10-25, mock `c22-merge-mock-2026-10-25.html`; BUILD-NOTES
"C22 + LCM Appointments"): both apps share one origin, each READS the other's localStorage and writes only
its own keys (never a `book33-*` key here). This app writes `lcm-appt-digest` (bookings today-7..+35,
focus / goal for 14 days, keyed by a hash of the login; local only, never synced, swept by
`clearLocalData`, skipped while `lcm-data-owner` is empty) and reads C22's `book33-cal-digest`. Her own
events (C22's and the Me store's alike, `phC22DayLayout`) draw in a solid 16% tint of the group colour with
the group glyph `i-c22-*`, no edge, never dashed (now SOLID and beside the visits: "My events: solid blocks"
below); 4+ of hers in one hour share one stack (the count + each one's glyph), its card a row each that
opens that item's own card (`phC22StkHtml` / `phC22StkPopHtml`, "stk:" ids); outside the patients' hours a
one-off folds to a 22px chip in the row above / below the grid (two at most, then "+N"); C22's Clinic block
is left out on a day this login has bookings; a tap opens a small card with "Open in C22" (`?nday=`). A
Sunday she does not work returns to the 7-day view while it has a one-off of hers (not on a login with fewer
than 5 work days). C22's "Open in LCM" lands as `?appt=&d=` (`phApptDeepLinkBefore`). Code: "C22 ON THE
APPOINTMENTS GRID".

**Me: her own things live here** (her picks 2026-10-25, "i dont use c22. i use lcm calendar the most. i want
things to be in one place"; mock `one-place-mock-2026-10-25.html`, BUILD-NOTES "Me: her own things live in
LCM"). Her events, routines, birthdays and to-dos are LCM's own, in `lcm-me` (NOT daybook-prefixed: both
logins show it, it survives a location switch) and ONE cloud row `public.lcm_me` id `linh`
(`supabase/me_setup.sql`; RLS = the two login addresses in `members`), merged entry by entry (`up` stamps,
`del` tombstones, `rev` for crossed writes; every write waits on `window.__lcmOwnerOk`). "Bring in" in the Me
drawer copies C22 once (C22's keys only READ; C22 is then set aside: its digest stops drawing here). The grid
shows **Events** by default; Off · Events · All in the drawer (`lcm-me-layer` 0 / 1 / 2). The **Me** chip
(Grid and List; since One Me also every other page's top bar, phone included) opens the Me drawer (non-modal, right side under the title bar; a bottom sheet on a phone):
her card first ("One Me" below), the level bar, Today's meals + Shopping ("Meals + the Diet log" below), Herbs (a tick per dose today, "Herbs (her own doses)" below), her Cycle / Fasting / This week rows, Bring in, to-dos (type + Enter, tick = done with Undo), the next 14
days of birthdays, and her **Routines** (today's first, then by time; 5 then "All N ▾"; a row opens the whole
routine in Edit, `rt:<id>`, with no This day | Every day). Her item's card = Done · Edit. **+ then Patient |
Me:** the Appointments dialog's title bar switches to the Me pane (Event · To-do · Birthday, This day | Every
day on a repeating thing, colours = her C22 Modes then C22's groups, "Coming up" beside it); every save and
delete has Undo in the one toast. Code: "ME · HER OWN THINGS LIVE IN LCM".

**One calendar, work + life** (her 13 picks, 2026-10-25; mock `one-calendar-mock-2026-10-25.html`,
BUILD-NOTES "One calendar: work + life"). **The row above each day** (`phC22FoldRowHtml`): a birthday is a
cake + name + the age it turns (`phC22BdayChipHtml`, tap = the birthday card), then the day's one-offs outside
the patients' hours, then ONE ⟳ chip for its routines whose ring fills as they are ticked (`phC22RtChipHtml`;
tap unfolds that day's chips, ▴ folds; at All they are plain chips); the row below holds the evening the same
way. A routine that meets the patients is a block like any of her events (the band + pill went 2026-10-25,
"My events: solid blocks" below). **Her cycle day in the date line** (`phC22CdHtml`): "CD
n" beside the big date, read from HER OWN patient record through the Cycle page's own reads (`phMeCycleAt` =
`phBbtCycleStarts` → `phCycFacts` → `phTpCycleCompute`; derived on read, nothing stored but the record's
name); a period day is rose with the drop, the expected period a dashed rose pill, nothing three weeks past an
unlogged period; its card = Day n · phase, one line ("Period in ~3 days · 28-day cycle"), **Period started**
(the Cycle page's `phCycleLogPeriod`, days up to today only; corrections on the Cycle page) · **Cycle** (her
own Cycle page). Which record is hers = **My profile** in the Me drawer (`lcm-me` `profile`, synced like the
rest, so both logins read it) with a Cycle row "Day n · Phase · L-day" that opens the same page. Since 2026-10-26 (her
picks A + B, mock `me-profile-diet-mock-2026-10-26.html`): once named, her card opens her record
(`phMineOpen`, past the no-plan gate) and a ✎ circle opens the box to change it (`phMeProfEd`); the Today's meals
heading's › opens her Diet page (the Diet chip went with One Me). Fasting and This week open through the same `phMineOpen`. Every card of hers on the grid
(an event, a routine, a meal, a herb dose, a trip row, her cycle day) ends in a **row to her record** (her 2026-10-26 "i want
to access my personal profile by clicking on my personal events", then pick C of `me-profile-link-mock-2026-10-26.html`): her
initials, her name, today's cycle day, › (`phMeRecRowHtml`, added by `phApptPopRender`); it opens her record, or the Me
drawer to name it when none is named. **Drag**
(`phDg*`): her own blocks and bands move (15-minute snap, a time tag, across days in the week view) and stretch
(bottom edge); a routine's drop is a this-day change and the toast offers "Every day" beside Undo
(`presSavedToast` `o.acts`); a dragged PATIENT block drops into Edit prefilled with the new day and time and
Save confirms (Cliniko stays the truth, nothing moves silently); on a phone a long-press lifts (the page held
still). Code: "ONE CALENDAR, WORK + LIFE".

**My events: solid blocks** (her picks 2026-10-25, "my personal events look too small and insignificant and hard
to differentiate", then "solid block like patient blocks"; mock `my-events-mock-2026-10-25.html`, BUILD-NOTES "My events:
solid blocks"). Her events (one-offs and routines) are SOLID in their own colour (her Mode colour or group), white or ink
words by measured contrast (`phC22Ink` → `phCkInkByContrast`), and share the time with the visits like another booking
(`phC22JointLay`): blocks that start together split the width evenly, a later one sits over the earlier from 45% across;
a cluster of visits alone keeps its own layout. A tap opens the card (Done · Edit); done = faded + ✓. The chips above
and below the day are solid too, 26px. In a narrow block the name wins over the time.

**Whole day** (her pick B, 2026-10-25, "improve the ui so i can view the whole calendar including morning hours out of
clinic hours"; mock `whole-day-mock-2026-10-25.html`, BUILD-NOTES "Whole day: the grid scrolls"). On a computer with her own
things showing, the grid runs from the hour before her first timed item on the days shown to her last (an overnight one, Sleep,
shows as it starts), every hour the same size (no long-day map). The clinic's hours (widened to any of her blocks that run over
their edges) still fill the window, so the grid scrolls inside itself: it opens there (on now when today is shown and now is
outside the clinic's hours) and keeps her spot, as a minute, through every repaint; a new set of days opens on the clinic
again. The hours outside the clinic sit on a faint grey; a "^ n" / "v n" chip at the top / bottom edge counts the blocks out of
view, a tap scrolls to them. Her timed things therefore sit at their own times, and the rows above and below keep only the
untimed ones (birthdays, all-day, trip to-dos); the ⟳ routine chip shows only for an untimed routine. **The phone is
unchanged** (its page scrolls, never the grid): the rows above / below and the ⟳ as before. Code: "WHOLE DAY" (`phApptCalWd*`).

**Both clinics on one calendar** (her 8 picks + the Friday hand-off, 2026-10-25; mock
`both-clinics-mock-2026-10-25.html`, BUILD-NOTES "Both clinics on one calendar"). Each login keeps its own
herbs, patients and prescriptions. On BOTH logins the grid and the List also show the other saved login's
bookings that are hers (that clinic's own weekday rule, `phOthHers`), in that clinic's own colour (Acupreg
sage, else Cliniko type colours) with a clinic tag where a practitioner sits; a tap opens a small card with
"Open in <clinic>" (switches login, lands on that booking). The **Both clinics** chip (beside Me, Grid and
List) hides them, remembered on this device (`lcm-both-clinics`). Day-header counts include both clinics;
Up next, the Day summary, herbs to prepare, the Dashboard and Communications stay this login's. **Paste:**
each pasted line carries a clinic chip (tap to flip): on CBD a Friday goes to Acupreg; on Acupreg a
non-Friday goes to CBD unless it is a colleague's day; a paste from a patient's own page, and a Break,
stay. A line sent over is saved on this login (`apptHandoff`), shows at once as the other clinic's, and the
other login takes it into its own bookings (same id, through `phApptImport`) the next time it is open
anywhere. The device needs both logins saved. Code: "BOTH CLINICS ON ONE CALENDAR" (app) + `othRead` (sync).

**The 60-day appointment prune is gone permanently** (her "stop pruning,
keep everything"); if the ~5MB quota is ever hit, the fix is a slim stub,
never a cutoff.

## Treatment Care Plan
**The plan is the spine**: patient → plan → prescriptions. Every phase
carries Aim / Points / Formula / Watch / Cadence, dated automatically
(`sinceKey`/`doneKey`).

**The page** (`presTpPlanTabBodyHtml`) = a band (title, stage pill, ⋯) over
two columns: **Findings** (Came in for, Ren, Tongue, Pulse, Abdomen, Cycle,
Ask her, Blood tests, History, Musculoskeletal; each read through the
app's own renderer, a purple dot = changed since last visit; tap a row =
its drawer, + Watch / + Aim, and lines to the diagnosis it feeds) beside
**the plan** (the Diagnosis card: Likely / Possible bars with a small concept picture
per pattern, and first one for the plan's own condition (all 29 plan conditions: women's health, pain / muscle, face / skin, and stress / sleep / weight / immune / men's), each opening big, the leading formula, Goal; then the Session grid; then scans and the pain map / Also
treating tiles). Side by side from 1280px, stacked below [Care Plan = the
findings beside the plan]. The plan ⋯ menu is short with a More ▸ fold,
one function (`phTpPlanMenuHtml`) for the Care Plan, Treatment and Dispense
menus [Care Plan page "Case | Course"].

**The plan writes itself from the visit (her synth22 part 1, 2026-10-27; mock `care-plan-from-visit-mock-2026-10-27.html`):**
the title she sees is `phTpTitleShown(name, plan)` everywhere (band, patient header, plan tabs, appointment pills and lists,
Today's visit, Treatment, print record): hers once she renamed the plan, else the main concern's words on the plan that
treats it (or a plan with no course), else the course's name; `plan.title` itself is never rewritten. The title taps to
rename; the band's **Course · <template> ▾** chip opens the course picker (`phTpProtocolPickHtml`, "⇄ Change course" in ⋯).
The plan column reads in visit order: **Treat** (`phTpTreatHtml`: one row per Compass concern, ★ where starred, its Goal;
her typed or a booking's Goal still wins), then **Diagnosis** (each pattern on its own line with its level, the signs
behind it under it as quiet tags with their `PH_PAT_SRC` icon), then **Watch** (`phTpWatchHtml`: the Compass's own
rows in its order, `phCxModel(..., { all: true })`: each concern's first score → latest + Better / Same / Worse, the signs,
the diagnosis's told signs (part 2 below; one not rated yet reads Yes, or "New" when not in the plan's first progress snapshot),
the measured rows, then the live phase's red flags with their last answer; a scored concern carries its target bar), then the formula. An empty part reads a faded
"not yet". The door starts the plan from the main concern (no template pick, LAW §2). Formula + Points already sit under
Course: the Session grid's live-phase row (Aim · Points · Formula · Watch); the grid is LOCKED, so they were not moved.
**Shorter profile (step 3, first pass, outside the grid; her "minimise any redundant display and messages"):** a finding
with nothing on file is not a row of its own: it folds into one faded "not yet" line of chips that open their pages
(`phTpFxNoneSplit` / `phTpFxNoneHtml`, on the Care Plan Findings and Treatment's "How <name> is"); Progress before the first
visit = "Progress · not yet"; Today's visit tiles read "not yet"; Medical history rows tag "FBR" (the words in the hover);
Visit checks' empty cell is "–"; Patterns' "Only on one side" band lost its explaining line. **Her 3 Session grid picks
(2026-10-27, the lock lifted for exactly these; nothing else in the grid changed):** the live phase row's Watch shows the red
flags only (`phTpFieldCellHtml(..., { flagsOnly: true })`, cell marked `data-tp-flagsonly` so back-to-auto and an edit repaint
it the same; every other copy of Watch keeps its chips); its Formula cell shows her own formula only ("→ Fill" when empty,
"<lead> auto" in a phase that follows Fang Bing Ren), the Fang Bing Ren line under Watch keeps the lead; at ≤480 the Phase
column is 182px and the table 32px wider (it scrolls there anyway), so a phase name's longest word fits beside the ×.
**Part 2, step 1: every Watch row on the Compass (her pick "Inside the Compass card", 2026-10-27; mock
`care-plan-part2-mock-2026-10-27.html`, BUILD-NOTES "Care Plan part 2, step 1"):** the signs behind the Diagnosis that the
patient tells her (the cycle log, usual answers, notes, diet: `phCxToldList`) are Compass sign rows in their body area (their own
subject, else the area of a Fang Bing Ren sign that files the same clue), rated Gone · Better · Same · Worse from the next visit,
saved with the signs under `pc:<clue key>`, never behind "+ N more"; their ▾ has Not watching only. Left out because another
row stands for them: Fang Bing Ren answers (the sign list's own rows), the pain map's words, Energy, "Came in for", the period-pain
clue beside the period-pain row. Not on the letter's symptom rows (`phCcSeedSymptoms`). LIVE 10/27, build 20261027-180700.
**Part 2, step 2: measured rows + targets (her picks "Behind the diagnosis + flagged" and "Filled from the kind of score"; BUILD-NOTES
"Care Plan part 2, step 2"):** `phCxMeasList` = the tongue, pulse and abdomen signs behind the Diagnosis (and a Fang Bing Ren
answer that is one of them), each against the plan's first dated chart of that part when it has two or more (Yes → Yes Same, New,
Gone Better), a blood marker out of range on a result under 12 months old (first flagged → latest, target = its range), a movement
under 80% of its normal range (target = the normal degrees), a positive test. They are READ from their pages, never rated (one
read per fact; the mock drew Better / Same / Worse on Tongue and Pulse): the Compass's **Measured** block (before the red flags)
and Watch, a tap opens the page (`data-flow-prof`). The tongue / pulse reads are shared with Patterns (`phPatTngFlags`,
`phPatTngVisitWords`, `phPatPulseKeys`). **Targets** (`phCxTgt`): pain and a complaint on 0–10 = 2 or less, on % better = 80% better,
Energy = 8 or more; a "target … ▾" dropdown on each Treat row, hers bold with ↺ auto (`mainTgt` / `secondary[].tgt` / `painMap[i].tgt`,
`{ v, k }`, another kind reads auto); Watch draws a bar from baseline to the gold target mark. Signs carry no target.

**Part 2, step 3: the phase review (her pick "When the phase's planned visits are done"; BUILD-NOTES "Care Plan part 2, step
3"):** on the visit that completes the live phase's planned visits (logged ones before today + today >= planned, nothing logged
today), Today's visit shows a gold card above the Treat row (`phTpPrvHtml`): "Acute phase done · 3 of 3 visits", the Watch in
three counts (better / same / worse, from `phTpWatchData`, the Watch's own reading) and the main concern's line with its target,
then **Move to Subacute · fortnightly × 2** (pre-filled, solid) and **Stay 2 more visits** (half the phase again, rounded up).
The last phase: **Close plan** / **Stay N more**, neither picked. Her pick waits on the plan for today only (`plan.prv = {ph, day,
v}`); logging the visit carries it out (the 2026-09-20 move-on is the Move; Stay adds the visits; Close closes the plan) and
writes the review into `plan.reviews` (note + `prv: {ph, head, sum, out}`), so Review notes and the printed plan show it; the
card then reads "✓ Moved to Subacute". Undo on the Treatment tab's banner removes that review. Cycle plans get none (they follow
the calendar). A Compass score or a target change repaints the card in place. (Part 3, step 1 changed how it acts: see
"Part 3, step 1" below.)

**Part 2, step 4: course length (her pick "How long" chips at the door; BUILD-NOTES "Care Plan part 2, step 4"):** under Came
in for on the no-plan door, "How long" Weeks / Months / 6–12 months / 1–3 years / Longer (`PH_CC_LEN`). They ARE the main
concern's own How long (`complaint.since`): the lit chip is the band its date falls in (`phCcLenBand`), a tap writes a "~"
worked-out date through `phCcMainSinceSet` (the band her own date is in keeps her date). The band adds visits to the first two
phases when a course starts (`presTpInlineCreate`, `phTpCreate`) or is swapped (`phTpCourseLenApply`): 6–12 months +1 / 0,
1–3 years +1 / +1, longer +2 / +2, only to a phase that has a count; cycle courses keep theirs. Start reads "Course · Low back
pain · 3 phases · 9 visits".

**Part 2, step 5: blood tests and IVF in the diagnosis (her picks "Paste the report" and "Results that count from what is wired";
BUILD-NOTES "Care Plan part 2, step 5"):** Blood tests has **Paste the report** beside + Add result: the new-result form takes the
report's text (`phBldParse`: a marker's name, the number after it, the lab's range on that line, the collection date, never the
date of birth), fills the form gold for her to check, lists units to check and lines not read; nothing saves by itself. Under
the results, **Results that count · every patient** (`phRcTableHtml`): the wired rows first, read-only (Fang Bing Ren's blood signs,
`PH_TRI_BLOOD`; the Patterns' iron and thyroid reads, `PH_BLD_PAT_IRON` / `PH_BLD_PAT_THY`), then hers: a blood marker or an IVF
number (`PH_IVF_NUMS`) below / above her number → a pattern (`PHARMACY.resultRules = [{id, m, op, v, pat}]`). Met by the latest
value (a blood result under 12 months; the latest round with that IVF number), a rule is a Patterns clue "rc:<id>" with `.pat`
(`phRcClues`, added in `phPatCompute`): it counts for that pattern, shows as a tag in the Diagnosis ("AMH 6 pmol/L · low", "IVF: 3
eggs, 2 rounds · low") and on the Patterns page, whose clue list now has Blood tests and IVF history groups (blood clues counted
before but were never listed). In Watch a blood result behind the diagnosis by her rule is measured against her number.

**Part 2, step 6: the plan for the patient (her pick "Print AND email, from Messages, she sees it before it sends"; BUILD-NOTES
"Care Plan part 2, step 6"):** "📋 Patient plan" in the plan's ⋯ menu and beside "✉ Patient letter" opens one page in the
letter's place (`phTpLetterOpen === "plan"`, `phTpCplModel` / `phTpCplSheetHtml`): Your care plan · <main concern>, the date;
What we're treating (each Treat row with its target in the patient's words: "to 2 out of 10 or less", "80% better", "8 out of 10
or more"); Your course · about N visits (each phase · weekly / fortnightly / monthly × visits, the live one gold); See your GP
straight away if (the live phase's red flags up to the dash, or her own Watch wording); Your herbs (the phase's formula, else the
prescription's, with its dose sentence); her sign-off. 🖨 Print = `phPrintDoc` of the same page. ✉ Email = a mailto to the
address on file with the page as text ("Dear <first name>," first), and the same message kept in Messages as prepared
(`phMsgPrepare`, context careplan, label "Care plan") for her to tick Sent; no address = "No email on file". The stage-by-stage
Patient letter is unchanged.

**Part 2, step 7: the profile's second pass + Copy notes carries the plan (her pick "Shorter profile, second pass"; BUILD-NOTES
"Care Plan part 2, step 7"):** Fang Bing Ren's two band names are said once, over the board ("Same fact, today and usually then
Only on one side", `.ph-bd-key`); inside an area the twins come first and a dashed line starts the one-side lists. The Tongue &
pulse area's rows drop "Tongue:" / "Tongue coat:" / "Pulse:" under their group's heading (noSubj, as the other areas). A sign that
is only "present" (Cough: present) is a ✓ under its heading, the words in the hover (`phSignDescHtml`). The empty runs in Tongue &
pulse read "–" (the words in the hover). Medical history's "✓ Asked all" reads "✓ All" (hover "Asked all: the rest are No"). The
door's "Skip for now" lost "— see her profile without a plan" (hover); the Ren heading reads "→ <formula>" (was "Points toward");
an empty Visit record is the faded "not yet". **Copy notes** ends with the plan (`phCnPlanLines`): Treat (each concern with its
target), Dx (her words, else Likely, then "possible: …"), Watch (`phTpWatchData(...).txt`: first → latest and its word, a rated
sign's word, the measured rows, a red flag answered Yes), Phase (`phCnPhaseText`: "Acute 2/4"; the day the review moved it
"Acute 4/4 → Subacute" / "· staying 2 more visits" / "· plan closed"; a cycle plan names its phase only).

**Part 3, step 1: the phase review asks, and her tap does it (her pick "Bookings count as visits", her answer "Ask me first";
mock `care-plan-part3-mock-2026-10-27.html` section 1; BUILD-NOTES "Care Plan part 3, step 1"):** bookings already counted as
visits (`phTpPhaseSessionDates`), but the phase only moved when a visit was LOGGED in LCM, so 15 of her 40 course plans sat
past their phase's visits. Now the review card on Today's visit (`phTpPrvHtml`) comes on the last planned visit or any day
after it, logged or not, with nothing picked: **Move to Subacute · fortnightly × 2** / **Stay N more visits** (last phase:
**Close plan** / **Stay**). Her tap does it there and then (`phTpPrvDo`): writes the review into `plan.reviews` (with
`prv.undo`), moves / adds visits / closes, and the card reads "✓ Moved to Subacute" with **Undo** (`phTpPrvUndo` puts the
phase, the count or the plan back and removes the review). A Move past the planned visits ends the phase on its planned-th
visit and starts the next the day after, so the visits since count for the next phase; Close ends the phase today.
**Logging a visit moves nothing any more** (the 2026-09-20 move-on in the session log is gone; `plan.prv` is no longer used,
the Treatment tab's auto-move banner, `phTpAutoAdv`, no longer comes). Cycle plans: no card, as before.

**Part 3, step 2: next visit due (her pick "Next visit due", her answer "Show the date to book"; mock section 2; BUILD-NOTES
"Care Plan part 3, step 2"):** once today is logged (✓ Complete session), Today's visit has a **Next visit** line under the
three steps (`phTpNextVisitHtml`): "Subacute, fortnightly" + a chip with the next day at the time of today's booking ("Tue 10
Nov · 09:00") that copies "<name> — Tue 10 Nov 2026 · 09:00" for Cliniko, and **Pick a day** (a date picker that changes the
chip in place, not saved). LCM books nothing: the Cliniko paste brings the booking in. A booking already ahead reads "✓ booked
· Tue 10 Nov · 10:00". The day comes from `phTpNextDue`: her next booking first (any, whichever phase window it fell in), else
the plan's next session day, and a plan day landing on today only when she has no visit today. The Care Plan's live phase line
adds "· next due 10 Nov · not booked" (or "today") while nothing is booked ahead. The Treatment page's Then band, once today is
logged, names the same day, and its main button is **Copy for Cliniko** (with the time); "book in LCM" is the quiet one.

**Part 3, step 3: today's patients, plan first (her pick "Today's patients, plan first", her answer: the List, the booking card
and Up next; mock section 3; BUILD-NOTES "Care Plan part 3, step 3"):** a booking TODAY says where its plan is and what is due at
this visit (`phApptPlanDue`, read on demand, nothing stored; other days show nothing new; the Dashboard stays herbs-only): the
live phase and its visit ("Acute · visit 3 of 3", List rows only: the cards already say it) and tags: **Review today** (gold, the
phase review card is waiting, `phTpPrvCtx`), **Re-score N** (Compass rows not scored today), **Ask: <first phrase>** (a red
flag of the live phase never asked; the whole flag in the hover), **Herbs ran out 20 Oct** / **run out today** (the latest
follow-up's run-out day, within 60 days). Where: the List (the lean row's name cell; the compact 29px row gets them as a second
line only on such a booking), the List's card under Treatment plan, the Grid's popup under the condition, and Up next.

**Part 3, step 4: herbs follow the phase (her pick "Herbs follow the phase", her answer "Fill it in, ready"; mock section 4;
BUILD-NOTES "Care Plan part 3, step 4"):** the due prescription (`phApptScriptFor`, which Dispense from the Dashboard / Up next /
the List, the Dashboard's herbs to prepare and Up next's formula line all read) is the live phase's own formula (`formulaId`)
when the patient has it, ahead of the phase-tag and last-dispensed rules: when her tap moves the phase, the next phase's
prescription is the one that opens. The review card's "✓ Moved to Subacute" adds "🌿 <formula> · ready to dispense" when the new
phase has one. A phase with no formula, after one with hers, offers **Same as <that phase>** beside Design / Link formula (one
tap links the same formula, `formulaHistory` keeps it). Nothing clinical from the app: a phase she never gave a formula stays
empty. The Next visit line adds "Herbs last to Sun 8 Nov" when the latest dispense runs out before that visit.

**Part 3, step 5: the cycle review (her pick "Cycle review writes itself", her answer "At her next booking"; mock section 5;
BUILD-NOTES "Care Plan part 3, step 5"):** on a cycle plan (`PH_TP_CYCLE_TEMPLATES`) with three or more period starts, Today's
visit shows a gold card above the Treat steps (`phCycRvHtml`): "Cycle 4 against cycle 3" with Length 33 → 29 days, Flow heavy →
moderate, Pain severe → moderate (lower = better, higher = worse), Clots many → small (the most clots logged on that cycle's
days, `rec.cycleSigns`; lower = better). Length and flow are only said. The first day it shows it is saved into `plan.reviews`
(`cyc: {lmp, n}`, the note = the same words), one per period; after that day it is not shown again. No BBT shift (no per-cycle
read in the app yet).

**Diagnosis + Goal write themselves** (`phTpAutoDx`, `phTpAutoGoal`): every
Likely or Possible pattern (plus any she agreed) minus the ones she took
off; Goal = one line per complaint in the Compass's order (her own Goal
cell, else auto; a pain names the place: "Reduce upper back pain", never
bare "Reduce pain"), the plan's own line first when no complaint carries it.
**Watch + Aim write themselves too** (`phTpFieldView` is the one read):
Watch = the template's **Red flags** first, then chips from the main
complaint, secondaries, cycle (women who track a cycle only) and findings;
Aim = her preset per template phase with `{main}` `{sec}` `{cyc}` tokens.
All four are derived on read, never stored; her own typing makes a field
hers, with "back to auto". A + Watch / + Aim tap on a finding adds her own
line after the auto ones (`ph.watchPicks` / `ph.aimPicks`, `phTpFieldPick`)
and the field keeps following the patient; back to auto keeps those lines.
Wording lives in Settings → "Goal wording" and
"Watch wording", her lines first, all DRAFT [Watch and Aim write
themselves from the patient].
**Red flags (her 2026-10-23 picks, mock watch-red-flags-mock-2026-10-23.html):** Watch has a "Red flags ▾" dropdown
(this phase's template lines, this condition's other phases, every other condition) that ticks a line onto the phase
(`ph.rfPicks`, red chips with ×). Today's visit asks them at the BOTTOM of the Compass, No · Yes each
(`phRfCxRowsHtml`; the template phase's lines that send her somewhere + her ticks; answers in
`rec.ccTrack.days[day].rf`). A Yes puts "⚠ Red flag today" on the patient band and a red line in that day's visit row
[Red flags in Watch and on Today's visit].

**Session grid** (`phTpSessionLadderHtml`): phase rows × visit columns
(capped at 12, "+N" opens the calendar), a square each for done / today /
booked / planned. The header row is the table's own `<thead>`. Tap the
LAST wanted square and every square before it fills ("Plan-it B"); the open
phase shows the rhythm pills (1×/wk · 2×/wk · Fortnightly · Monthly) and
"Same for all phases". On a cycle plan every phase can also be planned by
**cycle days** (CD chips + a visits stepper; the cadence string stays the
one truth, e.g. `"CD 3, 5 acupuncture · herbs"`) [Session grid on a cycle
plan]. Edits repaint through `phTpPlanRepaint()`, never a full rerender.
On a cycle-synced plan a visit is filed on the phase its cycle day names
(`phTpCycPhaseOn`), each to-come square lands on its phase's cycle days (this
cycle or the next), shows its CD and opens the Cycle page on that day [Session
grid follows the cycle].

**Formula on a phase**: a typed name is hers; "→ Fill" fills from Fang
Bing Ren's live top formula when blank [Care Plan phase Formula].

**The Treatment tab** carries the session stepper, the visit (`phTpVisitTableHtml`)
and a Complete band; "✓ Complete session N" there is the one place a visit is
saved (`data-pres-acu-log`; Today's visit only opens it). **Simpler since
2026-10-23 (her 12 picks, treatment-simple-mock-2026-10-23.html):** no Planned |
Today | Session N table any more. One session line (the phase named once,
Current ▾, "Session N · today", Herbs only today, Change phase), then "How
<name> is" on the left (the Compass's complaint and sign lines read-only,
`phTxCxHtml` -- today's score or the last one faded with its date, one "Score on
Today's visit" chip; then the Care Plan's own finding lines and drawers,
`phTxFxHtml` over `phTpFxRowHtml`, Came in for left out, a Fang Bing Ren line
added, template-hidden ones under More) beside today's treatment on the right
(Aim, the navy Therapies block with the phase's planned therapies lit once per
visit by `phTxSeedTherapies` and a dashed chip for a planned one she unticks,
"Same as last visit", "Which muscle?" for pain patients; the green Herbs block;
Watch; Notes; one "Plan ahead · Session N" chip opening the per-session boxes).
Tongue / Pulse / Abdomen have **no Better / Same / Worse** here any more; the
visit's result comes from the Compass (`phCxOutcomeToday`). Phone: stacked,
summary first, only the exam lines shown with the rest under one More chip.

**"Alive" phase resolution (locked, load-bearing)**: `phTpLivePhase(rec,
plan, asOfKey?)` is THE read for the current phase — live cycle-day phase →
IVF CD suggestion → persisted pointer, with an optional as-of date for
back-dated write-ups. Render from `phPatientPeek`, never `phPatientRec`
(which mutates on every call). `phTpPlanForToday(name, explicitId)`:
booking's `a.planId` (if it names an ACTIVE plan) → calendar-treated active
plan → last session's plan → first active.

**Cascade rules** (`phTpCascadeTo`/`phTpSetPhaseStatus`): re-entering a
done phase resets `sinceKey` to today; a phase is never pulled BACKWARD by
a live/cycle read once advanced past. **IVF Protocol has its OWN
non-cascading helpers** (`phTpIvfCdSuggest` read-only, `phTpIvfCdSync` its
write twin, called beside `phCycleSyncPlan`, never as an else-if); the
natural-cycle "overdue → Prolonged luteal" splice never touches an IVF
plan. `phTpSyncPlansOnOpen(name)` runs the cascade on opening a patient.

Bookings can be hand-filed onto a phase (`a.phaseId`+`a.planId` via
`phTpApptFile`). **Fill-when-blank**: logging a visit fills an EMPTY
Points/Press/Formula on the treated phase; a different existing value gets
an amber "→ plan" tap, never a silent overwrite.

**"Also treating" / Combine plans**: `plan.also[]` holds up to 3 secondary
conditions; the MAIN plan's template drives phases/colour/title,
`also[].phases` is a shadow copy for the tile only. "Treated today" lets
her untick a condition per visit (`session.notTreated`).

**Announce cards** on the phase panel (never two at once, fertility wins):
a teal calendar-mismatch card (the 4 cycle-synced templates), a gold MSK
visit-count card (active MSK plans), and a purple "Today's visit is
pending on X" card.

**Pain map**: front/back figure with zone highlights (never pins), side
view, close-ups gated to recorded regions; derived from the complaint text
until she edits it (`plan.painMap`). An absent `painMap` is not "no pain":
recompute from the text first.

**Dot points**: Aim/Watch split into bullets for display only
(`phTpDotParts`); the stored string is rejoined with `"; "` only when she
changed something.

**Detour phases** (Flare/High-risk/Crisis/Plateau/FacialFlare/Postpartum/
FET Prep Natural & Medicated): one `PH_TP_PHASE` entry + one
`phTpDetourKindsFor` check + one `PH_TP_DETOUR_META` entry + one dispatch
branch.

## Treatment plan templates editor
Settings → Prescriptions → "Treatment plan templates" (inside the
All-templates hub with the message and letter editors). **An override
layer, never a rewrite**: `PH_TP_TEMPLATES` is never mutated; her edits live
in `PHARMACY.tpTemplateOverrides[id]`. A built-in's Name is read-only
(literal-string matches elsewhere depend on it); her own templates rename
freely. `phaseKey` is stamped as an own-property on first copy (IVF
transfer-track detection finds "the OPU phase" by it). Sync conflicts are
settled per template by `tpTemplateOverridesAt[id]` (newer edit wins).
**Built-in templates carry no acupuncture points** (she designs them);
her saved copies were cleared once on 2026-10-21. **No template wording
changes unless she asks.** The editor is a full page in the Care Plan shape
(`phTpxEditHtml`: findings column, Diagnosis, the Session grid as one table
whose phases open in place). The phase's Watch row is labelled "Red flags";
the Aim row has the three token chips. Standard course shows only on a
template with a category other than gynae, facial or men's (`phTpxStdOk`).
The old Skeleton | Detailed editor (`phTpMgrEditHtml`, its band, tiles and grid,
the `data-tp-mgr-view` switch) was swept out on 2026-10-21; the shared pieces
(`phTpMgrSetField` and the other `phTpMgr*` write helpers, the rhythm, Sessions,
Recipe and Therapies fields, `phTpMgrRailHtml`) are the full-page editor's own.

## Cycle & IVF
**The Cycle page** = a plain sentence, three tabs, a Day 1 chip, a "Today
is day [ ]" finder, PMS on every day, and a
**Menopause** chip (sets `rec.cycleOn = false`; the Change of life card has
"Tracking a cycle again?") [Cycle PAGE redesign; Cycle page: the Day 1
chip; Cycle page: an option to select menopause]. Its calendar is the
Fertility-Friend-style calendar + BBT chart (`phCycFFHtml`), the one cycle
view everywhere, opening on the month of her last period. The Care Plan
shows a slim cycle bar that never folds. **A man never tracks a cycle**;
`PH_CYCLE_CUT_AGE` is 48. There is no Usual period card on the page (her 2026-10-24
pick): the footer asks the length once (stepper, or the shortest–longest range
when Irregular) and a **Usually** line is worked out from her logged periods
(`phCycUsual`; her old answers until two are logged) [Session grid follows the
cycle; Cycle page loses the Usual period card].
**Since her 2026-10-26 pick B** (mock `cycle-flow-mock-2026-10-26.html`, BUILD-NOTES "Cycle page: the questions in her
order"): the Calendar tab is a picture of the cycle (wheel + hormone / lining strip, `phCycDgHtml`) top left, the day card
ALWAYS under it (today until she taps a day), the two months stacked on the right. The card asks in her order: Last period,
How was it (Flow, Colour, Clots = Size Small / Large + Amount A few / Many, `clotSz` / `clotAmt`, read through `phCycClots`),
Painful? No / Yes (`painYN`; Yes opens How bad + Pain type), Between periods, PMS & mood.

**Period pain is ONE read** (her 2026-10-24 picks): `phCycPeriodPain` = each
period's worst day (0-10) from the Cycle page; the Compass "Periods: painful"
row, the Bing (latest period) and Ren (2 of last 3) pre-fills and the Usually
line read it [Period pain: one read from the Cycle page].
The cycle-day popover is built from ONE function, `phCycFacts`. BBT:
`rec.cycleSigns[dateKey].temp`, a typed value beats a phone reading; the
coverline uses up to 6 pre-ovulation readings. **Two Flow/Pain concepts
stay separate**: a whole-PERIOD intensity (`PH_CYCLE_FLOW`/`PH_CYCLE_PAIN`,
period-start day only) vs a PER-DAY value (`PH_CYCLE_DAYFLOW`/
`PH_CYCLE_DAYPAIN`). "Cervical mucus" shows as **Discharge**; the key stays
`cm`.

**IVF history** shows for every woman, with a quick-log; scans live on
`row.scans[]` of the linked round (a RECORD ONLY, never moves a phase);
scan bloods show in Blood tests; embryo accounting is always DERIVED; the
Timeline reads IVF history, unlinked rounds included [IVF history: visible
for every female patient; IVF history redesign; Fertility timeline: real
sync with IVF history]. Starting an IVF Protocol plan opens its
questionnaire; milestone dates are written BEFORE the start-phase cascade
runs. A positive hCG cascades an IVF plan to "Early Pregnancy" once, on
first transition only. `whenEst`/`dateEst` flags mark estimates; their
absence means confirmed. **Animated + drawn (her 12 picks, 2026-10-23,
mock `ivf-history-animated-mock-2026-10-23.html`):** a workflow rail for
her current round (`phIvfRailHtml`, a step is done once it or anything
after it is typed) and "one egg through the lab" (`phIvfEggHtml`, CSS
loop, tap a day to start there); a round reads first (`phIvfStripHtml`:
lab-stage drawing, count, % from the stage before, blasts against
fertilised, one dot per egg/embryo, tap a number for − / +; a blank
count's − does nothing); date / clinic / egg freeze / delete / "typed"
sit behind the ✎; the bank is straws (`phIvfFrozenBankHtml`); a transfer
reads first with the uterus drawing + Transfer → blood hCG → 6–7 wk scan
(`phIvfTransferViewHtml`), its fields behind its ✎ (open by themselves
while it has no date); scans drawn as ovaries (`phIvfScanDrawHtml`,
counts only). The drawings are the `ivc-*` sprite symbols. "+ transfer
from these eggs" is gone: Use ▸ and "+ Transfer" stay.

## Dispense, Refill & To Order
Dispense always opens the full script (her "No, keep the friction").
**Three numbered steps**: 1 Calculate, 2 Dispense & copy label (calculates
first when needed), 3 Log; Log is always its own tap, never automatic. The Total
line always shows grams · days · cost · profit. Live on desktop (≥901px):
the one-screen `.ph-dsp-fit` layout, supply-by-days chips (7/10/14/21/28),
one Blood-moving caution line (`.ph-dsp-caution`), the "Plan formula"
pour-in, and the script + label in full in the right column [Dispense: the
script moved into the right column]. Since 2026-10-21 (her pick A) every herb
shows with no inner scroll, the label in full under it, and the right
column is the one scroller [synth22 batch 2]. **Not built:** the per-herb
shelf→after-stock bar. Grams follow the herb total, and a manual Grams
figure survives Log [Dispense: Log silently discarded a manual Grams
figure; Dispense: the OTHER half]. A substitute picker includes
stopped/phasing-out herbs when stock allows.

**Formula refill** is one card grammar across To make / Below the line /
Snoozed / All recipes. Phone = a weighing table; desktop = a week-banded
list with "Fix short ▾". "When" is WEEKS ("Wk 39"; overdue = "last week" in
amber, sorted first); Plan ▾ = This week / Next week / Pick a week. The
date popover is mounted globally; no `window.prompt()` anywhere.
Since 2026-10-22 (her 8 picks, refill-redesign-mock-2026-10-22.html): jar
rows (jar filled to the stock line, grams + days under the name); week tiles
(Overdue / This week / Next week, tap filters); **Make weighs in the panel beside the list** (synth22 below;
Finish = the same phDispenseGate → refMakeCommit save) then "Made today" with Undo; a planned formula **leaves by itself**
when its stock went UP after planning (`h.refillQty` stamped at planning;
older plans: week passed + above its line) with Undo; header primary is the
gold "+ Plan a formula" (search sheet); New formula recipe sits in ⋯ and
opens as a side sheet (#refPresPanel), never inside the card; in the sheet the editor always stacks (Make refill, then the ingredients at its full width; her 2026-10-27 "i cant edit the formula at all": its two columns had split inside the 640px sheet). Every row with
a recipe ends in a "Recipe" button (pencil icon, `phRfcRecipeBtn`, `data-pres-open`) that opens
that recipe's herbs and grams in the same side sheet (her 2026-10-24 "how do i edit recipes?") [Formula refill: a Recipe
button on every row].
**One line per formula, its facts beside the list (her synth22 picks 2026-10-27, mock
`formula-refill-synth22-mock-2026-10-27.html`, BUILD-NOTES "Formula refill: one line, facts beside"):** a row = tick (Below
the line, All recipes) · jar · name (plain text, wraps) with grams · 12 weekly bars + patients · next booking ("Today · 2
booked", the patients in the hover) · its step (Wk + Make on To make; This week | Next week | ▾ elsewhere) · Recipe. Ticks
plan many at once from a dark bar at the foot (This week | Next week | ▾ pick a week, Clear; one Undo). Below the line lists
"Dispensed in 12 weeks" first (soonest booking first) and folds the rest to one line. A row tap opens ONE panel beside the
list (above it on a card under 860 px, a phone included): **1 Use** (12 weeks of grams, bars grow once per formula) · **2
Who's on it** (patient · their plan in its family colour · last given · next booking; a row opens the profile) · **3
Treating** (the plan families as one bar) · **4 Batch** (last made, how long a batch lasts at this rate, herbs on the shelf,
Jar + Recipe). Make opens the same panel as the bench's own weighing rows (`refWeighRowsHtml`): tick · herb · grams · what
the scale reads, ring, jar 0 → N g, the bowl count, tick all, Not now, Finish (the jar fills and the row glows). All of it is
read from the dispense log, the plans and the bookings (`phFormulaUse`, 12 weeks, Break bookings left out, "(X)" name tags
merged); nothing new is stored. Motion off under reduced motion. The Dashboard's Refill rows carry the same next booking
and Dispense's In stock cell says "To make · Wk N" for a planned formula jar (`presIngToMakeHtml`). LIVE 10/27, build
20261027-204000.

**To Order, desktop** (>900px) = a 3-column board that fills the window:
**Needs ordering** (a To order | Running low switch, rows A to Z in fixed
spots, Snoozed N ▾), **On the way** (bottle counts, Copy for email, All
arrived), **Arrived** (last 14 days). Nothing scrolls a column on any board
move; details pop out beside the row; a formula card has "Refill ▾"
[To Order: the desktop board is 3 columns; To Order column 1: C · Switch].
**The phone To Order is the older layout, untouched.** Dashboard's
Order/Refill cards are TWO PLAIN LISTS, empty first then fewest days of
cover; a Refill row also shows the formula's next booking (her synth22 pick 8 A, 2026-10-27), and a long name wraps on
both. Picking a supplier pulls in that supplier's recorded price.

**Patient profile list on a computer (her 2026-10-26 audit, "make it more space saving make it cleaner"; BUILD-NOTES "Patient
profile list audit"):** the five tiles are the filters (tap again = all; "No history" only while anyone has none), no
Filters button or chip row; "Schedule" sits in the toolbar while nothing is scheduled (the quiet line hides); no list head
line unless searching ("N match ..."); bands carry sprite icons; a row says each fact once ("never" / the amber date carry
not-dispensed and not-seen-6-months, in their hover), short condition names (2 then +N), one 18px pill look, 44px rows.
Her 9/4 bones stay: fold bands, timeline rows, the two round buttons. The phone keeps its chips and Scheduled line.

## Patient details & the patient file
**Patient details** = a hero + 3 cards (since 2026-10-23, her picks, every control 32px Zanda-style: 6px boxes, joined 6px bars, white value boxes, the send-the-form circle)  (`phPdPageHtml`): tap to edit in
place, age from DOB, BMI bar, a filled-in ring (n of 11), Call / Text /
Email chips, a Rebate bar None / Low / Good / 50%+ [Patient details = hero
+ 3 cards]. A returning patient's Sex/DOB/Phone/Email turn amber once
changed this visit. **Came in for** shows on Today's visit (the complaint
compass) and the complaint priority ribbon sits on every patient page.
A **profile search** box in the header band searches the whole file
(nothing saved; free-text history notes not searched) [Profile search].
A patient can be linked to their partner [Partner link]. The no-plan gate
has "Skip for now" (in memory only). The read-only **Patient Directory**
unions six sources keyed by `phPatientKey`. (The early-October
"Profile-first" plan is history: the Patient Workflow LAW replaced it.)
**No band on patient pages (her 2026-10-23 pick C, `hx-band-mock-2026-10-23.html`):** the dark three-gauge band is gone
from Medical history, Supplements, Photos, IVF history, Appointments, Messages, Treatment, Treatment log and Notes. Each
page's facts are an icon + a number on its own first row, the words in the hover title (`.ph-fx`; `presBandHtml` +
`PRES_BANDS`, sync unchanged). Medical history's ✓ asked and 🕒 updated sit in its toolbar (`presMedHxBandHtml`); "By group"
went (each group heading says ✓ asked) [Patient pages: no band].

## Musculoskeletal page
A picture row (pain figure | the region's muscle diagram front + back |
the view controls), the pain table full width under it; tap a muscle belly
= add / remove it from the plan; one add door (Areas ▾); + Cause links a
finding as a pain's cause; motor-point muscles sit under each pain and the
Treatment tab reads the same list (`phMskPlanOf`) [Musculoskeletal page:
"B · Picture row"; Musculoskeletal motor-point muscle plan]. MMT is a
3-point Weak / Mildly weak / Strong scale. A test row snapshots the library
at add-time. MSK libraries are append-only.

## Fang Bing Ren, Find the Ren & Patterns
**Fang Bing Ren** (the Triangle) is the one place constitutional-family
scoring happens: one merged header (verdict + Quick assess), signs in ten
shared areas, ONE "Looking at" line (on the Fang Bing Ren page only since 2026-10-22; on Today's visit a tap on a complaint's name on the Compass sets the same pick) (Everything · her complaints · the
tile she tapped; a complaint lifts its signs and fades the rest, nothing
hidden, view state only; Today's visit shows the complaints) that Quick
assess follows (`phQaFocus`), ticked chips that clear, a body chart whose
big view zooms to a place when she points at its list group (organ plates
under it with the concept picture of the pattern her signs there point to, header click pins; `phFbbZoomShow`, `PH_FBBP`, `phPpFbbFor`), a reference sheet
[synth22: the "Looking at" line ... body map close-ups]; formulas rank by `phFbrRank`, the leader
is `phFbrLeadOf`; pre-fills come from charts, history, bloods, the intake
form, pain words, food reactions, cycle, age and sex (derived, a tap always wins). The board
groups its rows under quiet subject headings (a twin pair's heading is its
Bing subject); the complaint search box's "+ Add as complaint" adds the typed
words as a secondary complaint through Came in for's own add. A new
formula or sign = **integrate33**. **Find the Ren**: look first, then two
questions at a time. The look is one row at a time (her 2026-10-24 picks): the face photo with
Eyes / Lips / Skin / Muscles spots she drags (saved on that photo, `rqZones`), six tabs that show
her picks ("✓ Lips Red"), the open row's groups as joined bars with short words, colour dots and a
body scale on Weight; keys 1–9, 0 None, Enter Next, ← → [Find the Ren: one row at a time].
(Locked details: "Locked conventions" below.) **The Ren page board** (her pick A,
2026-10-24): 26px one-line signs, auto No's folded per subject, and a sticky
search bar (words, All · Yes · No · Open, area, count; / ↑ ↓ Enter Shift+Enter
Esc) [Ren page: compact rows + a search bar].

**Patterns** (`phPatCompute(name)`) derives candidate TCM patterns live
from the file, **never stored**; only her Agree / Not this patient writes
`rec.patterns.agreed`/`.dismissed`. Strength is words (Likely / Possible /
A hint) + a clue count, never a percentage. A card shows only its clues and
Agree / Not this patient (no letters, food, points or supplement chips); an open card also shows the pattern's concept picture
[Concept pictures; since 2026-10-22 drawn from the body: a natural hand, a real stomach / throat / kidney, vessel walls with cells, and, until 2026-10-23, a person beside the pot on Heat, Yang, Yin and Qi deficiency]. Since 2026-10-23 Yang deficiency, Yin deficiency and Heat are drawn on the body chart itself (organs at true size, `anat` in `PH_PP`, a 300 x 200 frame); her rule: this anatomical model is the model for every picture, the rest move over in batches [Concept pictures on the anatomical body]. The Her build person (its pale organs and its face, `FACE` in `PH_BODY_GEOM.svg` on every front view, the patient's measured build) is the universal person for the whole app [The Her build person is the universal person]; the formula pictures and Qi deficiency draw it too [Next batch: formula pictures and Qi deficiency on the Her build person].
One pattern can be ★ main. Formula ideas are OFF (she dislikes suggested
herbs). A rule she overrode in Settings never gains new clue keys later
(deliberate). All pattern wording is Claude-drafted, hers to correct.

**Story tabs on the condition pictures (2026-10-23):** a picture can carry story tabs after Balanced | the condition (`PH_PP_TABS`, `PH_PP_STORY`): IVF and Natural fertility have Lining; Pregnancy has Lining, Breech and Labour; Breech correction has Breech ("Turning"). Breech and Labour follow her pregnancy week (`phPpPregWeek`), and the Care Plan Diagnosis adds their picture during the Breech Presentation / Labor Induction phase. A new story = one `PH_PP.SC` scene + one `PH_PP_STORY` entry + its base in `PH_PP_TABS`. BUILD-NOTES.md, "Turning a breech baby + Preparing for labour".

**The Yang deficiency picture (her 8 picks 2026-10-26, mock `yang-def-mock-2026-10-26.html`, BUILD-NOTES "Yang deficiency picture"):** the Her build person in a 300 x 252 frame (`PH_PP.XL`, `yangBody` in `PH_PP`) with three fires (Ming Men, Spleen, Heart), the signs as words on the body (DRAFT wording) and a tongue + pulse strip under it; tabs Balanced | Yang deficiency | Kidney | Spleen | Heart (`PH_PP_TABS.yang`; a tab is a VIEW of the same picture, `S.setView`, so it glides; `yang_kid` / `yang_spl` / `yang_hrt` open it on that tab through `PH_PP_VTAB`). The old Kidney yang close-up is gone: Kidney yang IS the Kidney tab. It also shows (a tile, `phPpYangThumbHtml`) on Fang Bing Ren under the body figure while Fu Zi / Si Ni Tang / Zhen Wu Tang / Shen Qi Wan leads (`PH_FBR_YANG_PP`), on the Tongue page for a pale tongue that is swollen or teeth-marked, on the Pulse page's Summary for a deep pulse that is slow (rest rate under 60) or weak; as a chip beside the likely pattern on the Journey card; and as a still (`phPpStillJpg`) in the Food letter, on unless she taps "Yang picture" off.

**Formula pictures (`PH_FP`, 2026-10-22):** Ban Xia Hou Po Tang and Huang Lian Jie Du Tang each have a moving picture of the body (three burners, Also drawn: Xiao Chai Hu Tang, Wen Dan Tang, Wu Ling San, and every other formula in the Fang Bing Ren list (22 in all; see BUILD-NOTES 2026-10-22 batch 3). Since 2026-10-24 the person shows to mid-thigh (340 x 240) with a pencil-sketch face (`FACE_SKETCH`, `face: "sketch"`, her picks: slim face, pointed chin, closed lips, minimal side-parted hair ending at the ears) [Formula pictures: a pencil-sketch face].
trouble, herbs at work, tongue + pulse inset), three stops Trouble / Formula at work / Settled, tap-a-herb chips. It replaces the pattern picture on
the Guide card for those formulas and also shows on Dispense (end of the right column) and the Care Plan formula cell. Same runner as the pattern
pictures. A new formula = one `PH_FP.SC[id]` scene + `PH_FP.HERBS[id]` + `PH_FP.PAT[id]`; no scene = the pattern picture stays. BUILD-NOTES.md,
"Formula pictures". Since 2026-10-25 the person is drawn at .88 (`ZK`, labels follow through `ZP`), the tongue inset's shape follows its trouble
words (`tngFeat` / `tngD`: swollen = wide, round tip, scalloped teeth marks; wet = shine; red tip; dry = cracks), and every formula, pattern and
Guide key-sign picture has an expand button in its top-left corner (`phPpXpHtml`) opening the one sheet at up to 1100px.
**The big sheet steps through the pictures it sat with** (her 8 picks 2026-10-25, mock `picture-cycle-mock-2026-10-25.html`; one opener,
`phPxOpen` → `phPxPaint`): arrows on the picture's edges AND a strip of the pictures right under it (a phone: strip + swipe, no arrows), ← →
too, round from the last to the first, no count. The set is where it opened: a Guide card = its formula or pattern picture(s), then its Key +
Strong signs; a formula opened alone (Dispense, the Care Plan formula cell) = it, then its signs; the Care Plan Diagnosis = its pictures; the
Patterns page (whose open-card picture now has the expand button too) = every pattern on it with a picture. Every picture is one size
(`--px-h`), so nothing moves; a sign's name is said once, in the header with its Ren / Bing marks and weight dots.

## Guide — Families (study + edit)
The Guide is **[Families] [Tongue map] [Pulse]**: a herb card is the body type with its formulas under it, notes-only formulas are dashed tiles, a
study card sits on the right (in Study, the concept picture of the pattern(s) the family counts for, under the pearl). **The card's rows ARE the Fang Bing Ren tables** (`PH_FORMULAS[id]`): her edits live in `PHARMACY.fbrEdits[id]`
(+ `fbrEditsAt`), and `phFbrEditsApply()` rebuilds `.ren/.bing/.or/.core` in place from `phFbrPristine`; `phFbrEditsSync()` (top of `renderPharmacy`)
re-applies when the saved edits change. **Nothing else may write to `PH_FORMULAS`.** Every Guide edit goes snapshot → change → `phGdfDone` (tidy,
stamp, save with rollback, sync, repaint, Undo). A learned `a_` sign off a formula is written as 0, and lists filter `w !== 0`. Cloud: `mergeFbrEdits`
beside `mergeTemplateOverrides`. Notes-only rows: `gdNoteEdits`. Details and what was tested: BUILD-NOTES.md, "Guide Families".
**Key sign pictures (her 2026-10-24 picks, mock `key-sign-pictures-mock-2026-10-24.html`):** every sign a family weighs 4 or 5 has ONE picture
(`phKsDesc` / `phKsSvgHtml`, a Bing sign and its Ren twin share it): hand-drawn for Gui Zhi's Key signs (`PH_KS_SC`), else her Tongue / Abdomen chart,
the wrist with her pulse lines, its body place's close-up (`PH_FBBP`) or the body figure, moving by its words (`phKsVerb`). The Guide card shows the
family's Key + Strong signs as a big picture taking turns (4.5 s) with tiles under it (hover shows, tap holds); it replaced the grey line of signs.
The Fang Bing Ren board shows the big one beside a row she points at; Compass sign rows and Ask her answers carry a small still one (none on a
phone). One picture moves at a time; all still under reduced motion. Only Gui Zhi's Key signs are hand-drawn so far [Key sign pictures].

## Photos
**The patient's Photos page** opens on the Comparison table (one row per
type, a date column each); By visit / By type are a tap away; each tile has
one-tap type / shot chips and a date button [Patient Photos page:
Comparison table is now the default view; Photo organising redesign,
increment 1]. **Records → Photos** (whole clinic) labels with one tap or a
key, rings the next unlabelled photo (a tap never moves the page: it rings
one already on screen or none; only the keys scroll to it), and has Select +
one label for many [Records → Photos: label with one tap; Records → Photos:
a tap never moves the page]. Tongue shots rank natural →
unlabelled → side → sublingual → flash (`PH_TONGUE_SHOT_RANK`). The Tongue
page puts today's photo beside the last (the Sublingual tab flips the pair),
the Flash pair under them in the same photo column (2026-10-26 tidy-up), past
photos at the bottom. A face / build photo full
screen carries Find the Ren's own rows (Face · Eyes · Lips / Build · Skin ·
Muscles) and its spots as corners (her 2026-10-24 "b and c") [Photo spots as
corners + the photo's own chips full screen]. Compare and the viewer are
ONE mechanism each, wired into every surface that shows a photo tile.
The photo sheet has a Date field (today by default, never later): every photo on it saves under the date picked [Photo sheet: the date can be changed before saving]. **Never delete a photo** (her hard rule); the store asks the browser to keep
it (`phStoragePersist`), and backups carry photos.

## Fasting (her own clock)
Since 2026-10-25 (her 8 picks, mock `fasting-mock-2026-10-25.html`, BUILD-NOTES "Fasting: her own clock"): C22's fasting clock lives in LCM, only for her. Its data is in her Me row (`d.fasts`, merged entry by entry; no `e` = running; `fastGoal`), so both logins show it. A Fasting step on the record she names in My profile (ring, goal bar, Stop + Undo, Continue last fast, last 14 / 30 / 90 days by cycle phase, history), a line in the Me drawer, a toolbar chip on the Appointments page (computer only) and the fast drawn down today's column (solid to now, pale to the goal, a flag at the goal; a visit over it sits 10px in); the ⋯ menu has Fasting. C22's fasts come in once (Bring in). No cheer lines, no cycle advice.
**Her plan** (2026-10-26, her 8 picks, mock `fasting-plan-mock-2026-10-25.html`, BUILD-NOTES "Fasting: her plan"; her words "breakfast and lunch, and fast after lunch by skipping dinner ... 3-5 times a week"): Goal is 14 · 16 · 18 h · **Breakfast** · Other ▾ (Breakfast = her next Breakfast event at least 2 h on, `fastTo` beside `fastGoal`; no Breakfast event = the hours); an **Aim** row (3–5 a week, two fields, + the days she plans as a Mon–Sun bar; `fastAim = {lo, hi, wd, up}`; a fast on any day counts); **Had it on today's Lunch** with no fast running puts **Start fast** in the toast beside Undo (from that moment); a fast **counts** once it reached its goal (`phFastMet`: the hours, or it lasted to that breakfast, or that morning's Breakfast Had it ended it), on the day it STARTED; the tiles are **This week** (Mon–Sun dots: filled = counted, pale = short, breathing ring = running, dashed = planned; green from her low number) · Avg · **Weeks on aim** · Longest; the Me drawer line says this week's "n of 3–5"; a Dinner a fast covers reads **"Skipped · fasting"** with a moon on the grid, its card, the Me drawer and her Diet page (worked out on read, `phFastNightOf`, nothing saved); and every fast draws down **each day it ran** on the grid (`phFastSegs`: a finished one solid with its hours where it ended).
**On her Meals page since 2026-10-26** (her synth22 picks 1 + 5, mock 2 `meals-fitness-mock-2026-10-26.html`, BUILD-NOTES "Meals planner"): the Fasting step left her rail (grp `off`); the clock is a thin bar on top of Meals (time, to Breakfast / of goal, Goal ▾, aim · n planned, **Your fasts ›**, Start / Stop / Continue), each day's fast is a 5 am → 5 am bar in the planner (cream eating, green fasted, striped to come, a line at now), and Your fasts › opens the old page (ring, tiles, history) with a ‹ Meals chip on top. A night's planned fast: Dinner → Fast this night, Just <day> | Every <day> (`fp` 1 / 0 on that day's `|d` meal; otherwise the Aim days, `phMplFastPl`). Every Fasting door (band chip, drawer, ⋯ menu) opens Meals.

## Herbs (her own doses)
Since 2026-10-26 (her 12 picks, mock `herb-schedule-mock-2026-10-26.html`, BUILD-NOTES "Herbs: her own doses"; her words "i need a herbal schedule, to take my herbal medicine"): her own prescription's doses at clock times SHE types (nothing pre-filled). **Every formula she takes** (her synth22 picks 7 + 8, mock 2, BUILD-NOTES "Herbs: every formula in one table"): the schedule = every formula dispensed to her (My profile's record), each formula's newest dispense (a newer dispense replaces only the SAME formula, matched by name, `phHbNk`), then the ones she types with **+ Formula** (bought, patent pills, another practitioner's: `d.hbx`, name · amount + unit · times a day · days · from · supply); a newer dispense of the same formula replaces a typed one too; nothing dispensed and nothing typed = her record's own script. A row leaves a fortnight after it runs out (a dispense whose run-out cannot be worked out after 4 weeks; a typed one with no supply only by Remove: `phHbStays`); no Stop. Times carry over only within the same formula (`phHbTimes`). Dose, days and "runs out" are read from the script and its dispense's follow-up (`phHbRows`, derived on read). Data in her Me row (`d.hbt` times, `d.hbk` doses taken, `d.hbx` typed formulas; entry by entry). A **Herbs** step in her Body group: ONE table, Formula · Dose · Times (no times = one quiet "–" field that opens them: her "not specific dose times") · Today · 7 days · Left · Dispense (dispensed) or Edit (typed; its row holds the fields + Remove with Undo); + Formula = a name (her prescriptions and the formula list as a native list) + times a day + Add, More ▾ for the rest; the rail says "N taking"; days left green, ran out amber on every surface. Also a Herbs section in the Me drawer (a tick per dose today), each dose its own green block on the grid (`#15803D`, leaf; today's tap = taken with Undo, another day's opens its card; untimed folds above the day), Herbs in the Appointments ⋯ menu. Due = a gold glow until ticked; a late tick counts any time that day; a fasting day keeps them. Code: "HERBS · HER OWN DOSES" (`phHb*`).

## Meals + the Diet log
Since 2026-10-25 (her 12 picks, mock `diet-log-mock-2026-10-25.html`, BUILD-NOTES "Meals + the Diet log"): C22's meal prep lives in LCM. A Breakfast / Lunch / Dinner event of hers (`phMealSlot` reads the title) holds the meal planned for it: her usual one per meal, or that day's own, prep ticks, ingredients (a tap = Shopping), one-tap **Had it** (the grid's ✓ IS Had it: band pill, fold chip, card; Undo); the meal shows under the event. **Several things a meal** (since 2026-10-26, her 9 picks, mock `meal-items-mock-2026-10-26.html`, BUILD-NOTES "Several things a meal"): the card has **Food** and **Drinks**, each thing a 32px chip with its ✕ and the dashed **+ Food** / **+ Drink** on the same line (a dish's name in the meal opens the dish); the list that opens stays open until Done: her own typed + Enter with **+ New** beside it, My dishes as chips with that kind first (in the meal = solid teal, a tap takes it in or out; the chips narrow as she types), Eating out and Skipped under Food; a dish can be a **Drink** (Dish | Drink on its editor; the cup mark only where food and drinks mix, none under Drinks); **Just today | Every <meal>** (no "Planned" word above it) is for the whole set (Every on a day's own list makes it her usual one); one Had it for the whole meal (it keeps the list), **Had it | Edit** on one row. That smaller card since 2026-10-26 (her 8 picks, mock `meal-card-compact-mock-2026-10-26.html`, BUILD-NOTES "A smaller meal card"): 736 → 506px tall with the list open, no sideways scroll; the calendar reads "first + count", food first; the Diet page one thing per line; nutrients add every item. "Something else" is gone. A meal value is one item or a list (`phMealVs` / `phMealV`); prep ticks are per dish (`preps`). The same lists work on a patient's Diet page (↺ Same as usual on a day of its own). Data in her Me row (`d.dishes` = "My dishes" with nature warm · neutral · cool and nutrients per serve, `d.meals`, `d.shop`; merged entry by entry). The Me drawer has Today's meals (a tick per meal, water +1) and Shopping. **Every patient has a Diet page** under Log (`phDietPageHtml`; on HER record it sits in her Body group instead, One Me): hers (the My profile record, else her signature name; a Me tag on her band) is the week filled from her meals (usual row with Edit on each meal, Mon–Sun, snacks · drinks, water dots, one numbers line a day that opens its bars, warm · cool, a Week row, Targets; phone = an Every day card, then a card a day); a patient's is their usual diet + days she notes (`rec.diet`, `phDietWrite`). Nutrients, nature and the week are worked out on read. Diet feeds Patterns (`diet_cool` / `diet_warm`, source Diet, DRAFT wording); Fang Bing Ren has no diet sign. Had it on today's Breakfast ends a running fast (Undo or unticking sets it running again). **Food numbers** (her synth22 picks 2026-10-26, mock `mine-food-mock-2026-10-26.html`, BUILD-NOTES "Mine, Health and food numbers"): a meal's things can be foods from `PH_FOOD` (193 rows: the Australian Food Composition Database Release 3 by FSANZ, CC BY-SA 3.0 AU, credited on Targets; choline from USDA FoodData Central; Thisbowl's June 2026 sheet), stored `food:<id>*<q>` and shown in kitchen words with − / + (each food its own step; a dish `dish:<id>*<q>` steps in serves); a dish's **Made of** adds its numbers itself (typed numbers only for what is not on the list); the card's **Edit breakfast** (and the Diet page's Every day Edit, the phone's Every day card) opens her usual meal as one card; the time is a small ✎ field; her Diet page = one line a day (kJ · P · C · F), a tap opens 17 bars against **Targets** (C22's four + NHMRC women 31–50, each hers), "not counted" where no source gives a number, never 0; Thisbowl bowls R | L + Build your own. Code: "FOOD NUMBERS" (`phFood*`, `phNut*`, `phTb*`).
**Food reactions** (her 14 picks 2026-10-26, mock `food-reactions-mock-2026-10-26.html`, BUILD-NOTES "Food reactions"): a meal she had (her card, under Had it) and a patient's noted day or usual meal (the Diet sheet, "Usually after it") take an **After it**: Gut / Body / Felt good chips + her own words (+ Own, they stay), ONE How strong bar, Started, From (which thing), a Note. The mark (the first reaction's picture in a pale red circle, green for Felt good) shows on the grid block, the Me drawer row and the Diet cells; Reactions by food (twice or more) under the week and in a food's hover in + Food; Reactions · 30 days on Health; a gut reaction twice or more (or on a patient's usual meal) files the Patterns clue `digestive_sx` with source Diet (DRAFT). **Fang Bing Ren + the after-meal check-in** (her 16 picks 2026-10-27, her word "fang bing ren" replacing "Never Fang Bing Ren"; mock `food-checkin-mock-2026-10-27.html`, BUILD-NOTES "Food reactions → Fang Bing Ren + after-meal check-in"): a gut reaction pre-ticks its Fang Bing Ren sign (Bing = in the last 7 days; Ren = the same reaction twice in 30 days or on a patient's usual meal; any gut reaction also "worse after eating"; Gassy = bloating + rumbling + belching; derived on read, `phRxFbrSigns`, her tap wins, why in the hover). 1½ h after Had it on Breakfast / Lunch / Dinner the meal asks "How did <meal> sit?": gold on its Me drawer row, the band's Meals chip and the calendar block, a card at the top of the Me drawer (and the Appointments column's Me tab) with Fine first, and, with Settings → Device "Check-in on the phone" on, a phone notification while LCM is open (sw.js `notificationclick` opens the card). Fine (`e.fine`) leaves no mark; closed = `e.ckx`; an unanswered one goes quietly at the next meal's ask or at midnight. Snacks are not asked (no Had it). Data: `rx` on her day's meal entry / `rec.diet.days[day].rx[sl]` / `rec.diet.usual.rx[sl]`. Code: "FOOD REACTIONS" (`phRx*`).
**Meals planner** (her synth22 picks 1–6 + round 2, mock 2 `meals-fitness-mock-2026-10-26.html`, BUILD-NOTES "Meals planner: her week with her fast"; her words "change diet to Meals. merge Meals page and Intermittent fasting together and mock a table format that i can use to map out/plan my meals"): on HER record the Diet page is **Meals** (patients keep Diet, unchanged). Fasting's clock bar on top (see Fasting), then a week table, days across: Breakfast · Lunch · Dinner · Snacks · drinks · Fast · More, each cell its meal's time (a day's own time bold) and its things one per line (pale = her usual, bold = that day's own, ✓ + the time she had it); ✎ Usual on each row opens her usual meal. A tap on a cell opens the picker under it (over it when there is more room above; it fits the window): the meal's things, the food list, My dishes, Eating out / Skipped (today or before), **Just <day> | Every <meal>** + Done, and on Dinner **Fast this night** (Just <day> | Every <day>). ⧉ on a day = Copy a day (pick the days, Copy to N days); **Copy last week**; **Shopping list** makes the week's list from the plan (each food added up, a dish's foods; Thisbowl's left out) into the Me drawer's Shopping (`src: "plan"`); Targets. **More** a day = water +1, the numbers line, warm · cool, the 17 bars (today's open by itself). Phone: a day at a time (‹ ›), the picker inline. A dish with no Made of counts by itself (`phDishAuto`: the Thisbowl bowl in its name, else its typed ingredients matched), and Made of starts filled with that bowl. Esc closes the picker only. Code: "MEALS PLANNER" (`phMpl*`).
**A calmer meal** (her 10 picks 2026-10-27, "improve ui layout - too busy. improve workflow"; mock `meal-picker-mock-2026-10-27.html`, BUILD-NOTES "A calmer meal"; **this wins over the Food / Drinks sections, + Food / + Drink, "Eating out and Skipped under Food" and "Had it | Edit" above**): every meal list (her card, the planner's picker, her usual meal, a patient's Diet sheet) = Just <day> | Every <meal> ON TOP (her card: ✎ Usual beside it) · the meal as a small table (name with its mark, a cup on a drink · − amount + · kJ in the planner · ✕) · **+ Add food or drink** opens the list UNDER the meal (search or type + New, one bar Everyday | Drinks | Thisbowl | My dishes, a row a food with its usual amount and +, Thisbowl R | L, Build your own; a thing in the meal is NOT listed; Done adding) · one numbers line, the small numbers behind a tap · **Eating out | Skipped** one bar (beside Had it on her card, beside + Add in the planner's foot). The planner's picker opens on the meal; an empty meal opens on adding. The cursor goes to Search on the computer only. Long names wrap, never cut. Code: "A CALMER MEAL" (`phMealListHtml`, `phMealTblHtml`, `phMealAddHtml`, `phMealNumsHtml`, `phMealInstHtml`). The snack picker (Snacks · drinks) is unchanged.

## Trips (her travel)
Since 2026-10-25 (her 12 picks, mock `nanjing-trip-mock-2026-10-25.html`, BUILD-NOTES "Trips: her travel lives in LCM"): her work trips live in LCM; Nanjing is the first. Data in her Me row (`d.trips`, `d.tplan` plan rows, `d.tnotes` day notes; merged entry by entry, so both logins have it); a trip's to-dos are Me to-dos with `trip` + `g` (area) + `due` (days before she flies), their day worked out on read (`phTripTdDay`). Passport and policy numbers sync and stay hidden until Show numbers. **Her file:** one step per trip in her Life group (One Me; Fasting is in Body) with ONE joined tab bar: Prepare (six area tiles + the to-do table; "Today" while she is away: day n, the hotel in Chinese + Driver card, today's plan, the day the clinic opens again) · Travel (flights, each end in its own clock; hotel; getting around) · Docs · Plan (a chip per day, rows, a note, photos) · Clinic (bookings on trip days with Move = the booking's own Edit, herbs that run out while away with Dispense, fertility Timeline items that open or close on a trip day with Open, "Message the N booked patients" into the one composer) · Guide (Nanjing only). **Calendar:** one band across the trip's days in the row above (day n of N, a red count of the bookings, a tap opens the trip), trip days striped in the trip colour, "<city> time" on the days after she flies, flights and plan rows drawn as her items (card: Open the trip), trip to-dos as tick chips on their due day, a red Away tag + red edge on a booking that falls on a trip day. **Me drawer:** Trips, trip to-dos tagged with the city ("by <day>", a tap opens the trip), the one-time Bring in from the old Nanjing app (IndexedDB `book33-nanjing`, read only; the c5-nanjing app is set aside, untouched). **+ then Me:** Trip (Name, From, To, City, a time zone filled from the city, Colour). Photos sit in her record's photo store (kind "other" + `trip` + `tday` / `tpart`), the one viewer opens them. A phone during a trip opens on its Today a moment after the app loads (only while still on Appointments with nothing open). **A trip pauses her routines** (her 9 picks 2026-10-26, mock `trip-pause-mock-2026-10-26.html`, BUILD-NOTES "A trip pauses her routines"): every trip, by itself, from her flight out until she lands home (no flight typed = the trip's whole days); meals and a routine ticked **Keep on trips** (`kt`, in its Edit) keep going; one-offs, birthdays and her herb doses are untouched. `phMeOccurs` (the one read) = `phMeOccursRaw` minus `phMeTripPauses`, so the grid, meals, the drawer, This week, Habits and Health all follow it; `phMeTripPausedOn(k)` lists the paused ones: one ⏸ n chip in the row above each day (`phTripPzChipHtml`, opens the trip), the Me drawer's one line "Paused · back <day>" with the list under All (`phTripPzRowHtml`), "away" on This week; a fast week holding a trip day reads "–" and neither counts nor breaks Weeks on aim.

## Mine hub (her week, work, money, fitness, code)
Since 2026-10-26 (her 8 ask28 picks + round 2, mock `mine-hub-mock-2026-10-26.html`, BUILD-NOTES "Mine hub"; her words "connect my fitness, work to dos, and work and travel together, where my work hours are counted ... financial management, code plans"): five steps on HER record (the one in My profile; since One Me, Fitness in her Body group, the rest in Life): **Week** (Mon–Sun table; a tap on a past day or today opens its journal under the row: a timeline written from the day + a note she types, kept as she types; her to-dos beside it by area, a dropdown All · Work · Money · Code · Fit · Home · Travel), **Work** (month: hours per clinic, the Acupreg invoice table, work + travel), **Money** (income per week by her sheet's formulas, invoices + tax due ticked off, bills that repeat, the tax pile for Tina, the visit-type Prices table), **Fitness** (Steps + weight on her record + Weigh in; its routine dots moved to Habits, "Habits + Steps" below), **Code** (a plan table, five-step stage bar, tap a step to move it). Work hours come from BOOKINGS, never stored: first patient's start → last patient's end per clinic per day (this login's that are hers + the other clinic's). Money is hidden until Show $ (this visit only). Her yes 2026-10-26: HER OWN money syncs in her Me row (`d.price`, `d.hubset`, `d.bills`, `d.taxp`, `d.plans`, `d.jn`, `d.dueT`, `d.hlth`, `d.hlim`, entry by entry); herbs, patients and pharmacy money never go there. Herbs Linh reads the CBD login's log ("–" on Acupreg). Workouts / rehab / code / travel are her routines read by title (`PH_HUB_RX`); a title with a money word (invoice, bank, BAS, tax, bills, payments, lease, rent …, `PH_HUB_RX.money`) is never a workout (her 2026-10-26 "invoice is not fitness, its financials": "Claude auto-run" had matched "run"). Also: a "This week" line in the Me drawer, and a hover title on each calendar day heading ("CBD 8 h · 3 patients"). A to-do tick now stores when (`done` = the time). Code: "MINE HUB" (`phHub*`). **Health** (her synth22 picks 2 + 3, 2026-10-26, "i want to log things like e.g. i had chiro appointment today, i want it to count towards my healthcare"; BUILD-NOTES "Mine, Health and food numbers"): a page in her Body group; her events titled Chiro / Physio / Massage / GP / Scan count themselves up to today, "+ Log today" (+ Other) for the rest; per visit With · Paid · nib back (money hidden until Show $), Yours worked out; nib extras left a year for Chiro / Physio / Massage (limits typed once); a line on Money; a logged visit in the Week journal. Code: "HEALTH" (`phHl*`).

## Habits + Steps (her Atomic Habits)
Since 2026-10-26 (her 10 picks, guide `habits-guide-2026-10-26.html`, mock `habits-mock-2026-10-26.html`, BUILD-NOTES "Habits + Steps";
her words "add a steps count to my fitness page ... use james clear atomic habits as inspiration for my habits tracking features").
**Only on her own record.**
- **Habits page** in her Body group after Fitness (`phHubHabHtml`): a table (habit · last week + this week as a chain of dots, a link
  between done days · in a row · this week · Today's tick) in three groups, Movement · Sleep · Care, each with her "I am someone who …"
  line (`d.idn`) and its votes (every tick is a vote; `it.vb` keeps the ticks a routine trims); a tap on a row opens the panel beside it
  (in a row · best · this week · votes, 4 weeks, **After** = the habit it follows, **2 min** = its two-minute version, **Where**, the group
  bar, Not a habit with Undo); + Habit picks from her routines; a Votes chart under it (12 weeks, a line a group, drawn once). Phone: a
  row a habit, the panel a sheet from the foot.
- **Which habits** (`phHabList`): her routines guessed by title (fitness / rehab = Movement; sleep / bed / night = Sleep; skin / hair and
  the Breakfast meal = Care; money, code, travel and work never), plus three that tick themselves: Steps (on goal), Fasting (a fast that
  met its goal; her aim days are its plan) and Herbs (every dose taken, while she has a prescription). Her picks (`d.hab[id]`: group,
  `two`, `aft`, `wh`, `off`) win over the guess.
- **A day** (`phHabSt`): done · two-minute (half dot, counts in the row) · missed · not planned · to come · before she started
  (`hubset.habAt`, never a miss). **Never miss twice:** a second miss in a row turns the tick red (`phHabWarn`). Due = a gold glow from
  the habit's time, or once its After habit is done (`phHabDue`).
- **One tick, four doors** (`phHabTick` → `phMeDoneToggle(tk|id, v)`, the routine's own `dn`; a meal habit's tick = Had it): the band,
  the Me drawer's Habits section, the Habits page and a circle on today's calendar block (`phHabCalTk`; the circle never drags or opens
  the card). The tick pops, its link draws, in a row rolls, "+1" rises over the votes, a gold ring every 7 in a row; no words; all off
  under reduced motion.
- **Steps** (`d.stp[day] = {n}`): she types them from her watch (a web page cannot read it): in the band, the Me drawer's Steps row and
  This week's Steps column (days on goal in the Week row). Fitness: a steps tile and the Steps card (ring, today's field, days on goal,
  average, best, 14 bars against the goal line). Goal 8,000, ✎ changes it (`hubset.stg`, 500–100,000).
- Data: `d.hab`, `d.stp`, `d.idn` are in `PH_HUB_MAPS` (entry by entry). Code: "HABITS + STEPS" (`phHab*`, `phStp*`).

## Fitness + Exercises (C22's fitness, moved in)
Since 2026-10-27 (her synth22 "wheres the page for exercises?" + "move fitness page from c22 to lcm so i cna plan and log my
exercise", picks 9 to 13 on `meals-fitness-plan-2026-10-26.html`, round 2 on `meals-fitness-mock-2026-10-26.html`, her answers
10/27 + "Yes, build it"; BUILD-NOTES "Fitness + Exercises"). **Only on her own record.** Step 1 of 2 (plan + log) + climbing (LIVE 10/27, build 20261027-112700).
Step 2 (her pick 11, her "build step 2" 10/27; BUILD-NOTES "Fitness step 2") is LIVE 10/27 (her "push live"), build
20261027-122700 (main e2fc50dd; commits a80ee554 + 4cf7f3e2).
**Equipment drawings** (her "put the gym equipment drawings back in", 10/27; BUILD-NOTES "Fitness: equipment drawings"): BUILT
4b963702, LIVE 10/27 (her "push live"), build 20261027-124800 (main ff8a5642). C22's barbell / dumbbell / kettlebell / cable-machine / bodyweight drawings
(`PH_MU_ART.eq`, `.loaded`; `phFitEq`): her exercise's equipment = `gr` (her C22 choice, set in its Equipment row of drawn chips,
else the reference entry for that exercise, else C22's name rule, else Bodyweight); the drawing sits beside the name in her
exercise, a template exercise, Workout Mode's cards and a reference entry; a template's barbell exercise shows the bar loaded
for its heaviest set (`phFitPlatesHtml`).
**Step 3** (her "build step 3", 10/27: the plan had two steps, so step 3 = the rest of C22's Fitness; her 10 picks, all of them;
BUILD-NOTES "Fitness step 3"): BUILT 9551472c, LIVE 10/27 (her "push live"), build 20261027-141000 (main 48b67ec8). The coach line (`phFitCoach`: Last · PR with the trophy, gold past it ·
"▲ n kg vs last time" · "No history yet") on a template exercise, her exercise and each Workout Mode card (before today there);
the ribbon (`phFitRib`) in a template and on each card; a template's summary (`phFitSumHtml`: map, numbers, group buttons;
`phFitHl` lights a group's exercises, a tap on a muscle does too); Workout Mode's top (`phFitWmWeek` dots, `phFitWmHero`: figures
lit as sets are ticked, sets ring, numbers, `phFitWmHl` dims the other cards, the trophy strip when every set is done); C22's
small figure on each exercise chip (`PH_MU_ART.tileSvg` drawn once per group as a blob picture, `phMuTileSrc`; a repaint stays
~0.09 s); Where it hurts: her rehab routine chip (`phMuRehabChips` → `data-hab-go`). Week rules: Wed + Sat rest every week
(`PH_FIT_RESTWD`, locked in the Weekly plan, `phFitPlanSet` refuses a type); deload weeks (`PH_FIT_DL`: 18-week cycle from Mon
29 Dec 2025, weeks 5, 9, 14, 18: Monday light, Sunday extra rest; `phFitGoalOn`); planned / done days per week (`phFitWkSt`,
rest days never planned); the week streak (`phFitStreak`, memo on `phMeS()`; one short week forgiven; 8 empty weeks end it;
toast at 4, 8, 12, 26, 52 via `phFitStkSay`). No new stored data.
**Step 4** (her "build step 4", 10/27: what C22's Fitness still had; her 13 picks, all of them; BUILD-NOTES "Fitness step 4"):
BUILT 07fc13b7, LIVE 10/27 (her "push live"), build 20261027-153300 (main 4c09f199; published alone, without the font commit). Templates: set presets (`PH_FIT_PRE`, `phFitPreHtml` / `phFitTpPreset`,
Undo) and − / + on every number (`o.st` in `phFitSetTbl`, `PH_FIT_STEP` reps 1 · kg 2.5 · s 5; on the phone − + sit under the
number); ▲ ▼ move an exercise (`phFitTpMove`, the open one follows); sets by type under the muscle groups (`phFitTyLeg`,
`phFitTyHl`, never lit together with `phFitHl`). Types: her own after C22's five (`phFitXts`, memo on `phMeS()`; `d.fxt`; + New
type in each Type row, the type tabs and the shelf; one of hers goes only when no exercise has it, `phFitXtRm`); C22's glyphs
(`PH_FIT_XT_GL`); a type set in a Type row starts an UNTUNED exercise as that type usually is (`phFitTyFill` / `phFitFresh`,
C22's XT_FRESH: Isometric Timer + 1:00, Flexibility Timer + Left & right + 0:30, Plyometric 2:00; `xd` remembers what the type
set; 1:30 counts as untouched because Bring in writes it; a logged weight or her own rest / Timer / sides = tuned, left alone;
Undo); Sort (`phFitSortHtml`, `phFitLibSet(…, plain)` = no fill). My exercises: type tabs (`phFitLt`), Merge into another
(`phFitMerge`: fwo + ftp rows, fgl, fdn take the kept one, the duplicate is deleted, one Undo restores every touched doc). The
picker (`phFitPickHtml`, Today + templates, one open at a time): figures lit by group (a muscle tap picks its group), search,
ticks in place (`phFitPkBar`), Add n in one save (`phFitAddMany` via `phFitExRow`). Templates' shelf (`phFitShelfHtml`,
`phFitTs`, `phFitTsSet`): All · types · No type yet · Goals (→ Fitness, its Goals) · + New type · Sort; the templates holding the
type with k/m; the type lights its rows. Calendar (`phFitDayItems` in `phC22Src`, BEFORE the herb doses so an all-day one shows
first; memo on `phMeS()`): a workout she ticked on a day with no routine of its kind = a done block at its ticked time (else all
day), a planned one (`fpl`) = a pale all-day chip (`" fpl"` via `phHbCls`); card `phFitPopHtml`, Fitness opens the page
(`data-fit-cal`). Fitness page: C22's posture tip under This week (`PH_FIT_TIPS` = BIOMECH_TIPS word for word + her session /
pain notes ≥ 15 characters; C22's weighting and date-seeded pick; ♥ / ✕ with Undo in `d.fbt`, `shown` keeps a ♥'d tip all day;
C22's `book33-biomech-ratings` READ, never written). Pilates milestones (`phFitPilN` / `phFitPilSay`, hooked in `phMeDoneToggle`
and `phFitWoSave`): the tick that lands her Pilates days on 7, 30, 50, 100, 200, 365 toasts.
- **Fitness** (Body, `phHubFitHtml`): Bring in (her C22 fitness, once: library, templates, log, planned, stairs, week plan; C22's
  keys are READ, never written) · This week (workout + rehab routines and Steps, a dot a day = the Habits reads and ticks, one tick
  both pages) · **Weekly plan** = her calendar's routines (`phFitPlanApply`: a day set to a type moves that weekday to the routine of
  that type, made in g-fitness if she has none; done days stay; the past never reads as missed; Undo) · Steps + Weight · Steps plan
  (walks + stairs, under the Steps card) · Today (type, template, sets, timed hold, rest ring, pain + stars, ▶ Workout Mode) ·
  Upcoming + Recent. Finish also ticks today's routine of that type. Step 2 adds, below: **Goals** (one per exercise: reps / hold /
  weight / tick, `d.fgl`; reached on a ticked set = toast + buzz + gold; a flag on Today's row, in Workout Mode and in the exercise
  panel) · **Personal bests** · **Weekly volume** (8 weeks) · **Progression** (one exercise's last 7 sessions).
- **Exercises** (Body, after Fitness, `phHubExHtml`): her library (search, groups, Hide) + workout templates; step 2 adds
  **Muscles & exercises** (C22's reference, `phMu*`: two figures tinted by group, Muscles · Exercises · Checks · Where it hurts,
  C22's entries word for word with their sources; an entry opens in place under the card with Back; C22's moving figures; Where
  it hurts reads her pain log and lights her side; doors: "What is around the ..." beside a ticked pain area, a Reference row in
  her exercise) and **My don'ts** (`phDn*`, `d.fdn` / `d.fdk` / `d.fdx`: her list in her words, a table with its header row as its
  own first row, Never | Rather not, links to a pain area or exercise, a journal where Happened again is a grey ring, never red;
  Prompts join only on Make it mine; Hide, then Delete for good from Hidden; a quiet line on Today and in Workout Mode, "Make this
  a don't" beside a ticked pain area). The muscle shapes live once in `#phMuDefs` in `<body>`; their four shape rules
  (`.tpe-mus`, `.tpe-shd`, `.tpe-fib`, `.tpe-base`) are unscoped on purpose (a `<use>` copy takes its shape's rules); `--mi`
  (not `--i`, which LCM already uses) is registered with `@property`.
- **Climbing** (her "build the climbing step", 2026-10-27; BUILD-NOTES "Fitness: climbing"): a climbing type's session (Bouldering,
  `phFitIsClimbTy`) adds routes = name · grade (V0–V10 offered, any typed) · tries − + · Sent (`{c: 1, n, g, a, ok}` in a session's
  or template's `ex`). Sent counts as a done set (`phFitSets`); routes never join her library. Bring in brings C22's climbs; when
  `hubset.fitIn` has no `v: 2` (step 1 brought the rest in), its banner offers the climbs only, into the C22 sessions/templates.
- Motion: a set pops and its tick draws, the rest ring counts down and buzzes at zero, gold once when the day's sets are done, the
  week's dots pop and link (the Habits way); all off under reduced motion.
- A routine in g-fitness counts as a workout (`phHubKind`, after the money words). Data: `d.fex`, `d.ftp`, `d.fwo`, `d.fpl`,
  `d.fsp`, `d.fgl`, `d.fdn`, `d.fdk`, `d.fdx`, `d.fxt` (her own types), `d.fbt` (posture-tip ratings), `hubset.stride`, `hubset.fitIn` in `PH_HUB_MAPS` (shapes in the code comment).
  Code: "FITNESS + EXERCISES" (`phFit*`, `phDn*`, `phMu*`).

## One Me (her record joined up)
Since 2026-10-26 (her ask "i want my personal profile to be well integrated"; guide `profile-integration-guide-2026-10-26.html`,
her 9 picks on `profile-integration-mock-2026-10-26.html`, all the recommended ones; BUILD-NOTES "One Me"). **Only on her own
record** (`phFastIsMe`); every patient's record is unchanged.
- **The Me chip is in every page's top bar** (`phTitlebarMerge`: `.ph-tbm-me`, the count of today's open things; phone ☰ · title ·
  primary · Me · ⋯, computer Me · ⋯ · primary; Appointments keeps its own toolbar chip). The drawer sits under whichever top bar
  shows (`phMeDrwTop`).
- **Her card leads the drawer** (`phMeCardHtml`): initials, name, "Day n · phase · Fasting h:mm"; a tap = her record, ✎ = change
  the name. Every drawer heading of hers ends in › to its page (`phMeH4` → `data-ph-me-go` → `phMineOpen(tab)`): Today's meals →
  Diet, Herbs → Herbs, To-do → This week, Trips → the trip, Birthdays, Routines; the rows stay today's ticks.
- **Her rail: Body · Life first** (`PRES_MINE_RANK`, grp `body` / `life`): Body = Cycle, Meals (her Diet page; Fasting left the rail 2026-10-26 and opens from Meals' Your fasts ›), Herbs, Fitness, Habits, Health, Log (Health + Log since her synth22 pick 1, 2026-10-26; her bottom group then reads "Clinic dated"); Life =
  Week, Work, Money, Code, trips, Birthdays, Routines; then her file and the visit steps. Cycle leaves the Plan step on her record
  (`presMineCycleNorm` turns plan + cycle into profile + cycle, so every Cycle door lands there) and Diet leaves Log. The phone's
  sideways row carries Body · Life · File · Clinic captions. **Birthdays** (by month, + Birthday) and **Routines** (Morning ·
  Afternoon · Evening · Any time, + Routine) are pages (`phMeBdaysPageHtml`, `phMeRtsPageHtml`), the drawer's rows shared
  (`phMeBdRowHtml`, `phMeRtRowHtml`). Next on one of her pages goes to her next page; her last one goes to the file.
- **It opens at This week** (`presAssessFirst`), and the "This visit · Next up" box is hidden on her record.
- **A today band under her name on every page of her record** (`phMineBandHtml`, repainted by `phMeDrwPaint`): cycle day,
  fast, doses, meals, Steps, Habits (n of today), her next habit, next patient today; each chip opens its page (next patient = Appointments). Phone: one sideways row.
- **This week has Cycle (CD n), Meals (had of planned) and Herbs (taken of due) columns** (`phHubDay` `cy` / `mealsP` / `hb`), and Steps typed in it (Habits + Steps). Below
  1500px the To-dos sit under the table (her 1220px window included); the phone keeps the sideways-scrolling table (836px).
## Communications / messaging
Tone and voice: code3 above. **One composer** on the patient's Messages page
(a bubble + slim band, synced to the plan, its phase and her Fang Bing Ren
answers); "Copy message" copies the message only [The Messages composer].
A message offer fires on any phase change (manual or cycle/IVF cascade),
evaluated at render time; a session-only map (plan + phase + `sinceKey`)
stops repeats. "My Cycle — gone quiet" lives on Communications' **Due**
tab, never the Dashboard. The Check-in panel is its own composer. The
All-templates hub holds message templates, letters and the plan template
manager. Message dates carry no year; `{{nextAppt}}` reads the date in her
words.

## Visit logging & findings charts
**Today's visit** opens with the **complaint compass** (`phCxCardHtml`):
the main and secondary complaints scored each visit (0–10 or % better),
charted over time, Energy 1–10 under it. It replaced the Re-check card on
2026-10-14 and still mirrors into `rec.recheck` [Today's visit = the
complaint compass]. Its scores are joined 0–10 bars and "n of m done" sits
in its header. Since 2026-10-21 it is a table (columns: see "Baseline Compass"
below). The Goal cell is editable per complaint
(`phCxGoal`, hers in `complaint.mainGoal` / `secondary.goal` through
`phCcWrite`, "↺ auto" returns it) and the Care Plan Goal reads the same
lines; the Note box is always open and saves as she types (`phCxTypeSave`)
[synth22 batch 2]. **Since 2026-10-22 (her 18 picks, "Today's visit Compass" in
BUILD-NOTES.md) the Compass is the one "how have things been" table:** the Goal
sits under the complaint name (tap to edit), Today is a slider with a number
(a % box takes any number on % better), every visit's note is kept and last
visit's shows under today's box, Fang Bing Ren signs she has ANSWERED (never
ones the app only works out: `phCxSignList`; never a FIXED sign, `phCxFixedKey`, her 2026-10-27: how she is built, family
history, a tendency to miscarry, the illness's course, "spirit intact" have nothing to rate; temperament keeps its row) sit under their body area's complaints,
indented with a SIGN tag (see "One table" below; the "Signs · n" line went 2026-10-23),
each rated Gone · Better · Same · Worse from the next visit on
(`rec.ccTrack.days[day].sx`; a Gone after her last Yes tap turns today's Bing
tick off, `phCxGoneToday`; Ren is never touched). The gold row is the one being
asked now; number keys, G B S W and ↓ drive it. Her order is
`rec.complaint.secondary` (drag ⋮⋮ or ▾ Move). The Treatment tab's Subjective
table is gone: the Compass's own lines, read-only, in its "How <name> is" card (`phTxCxHtml`, 2026-10-23),
Watch = the template's Red flags only, no "Apply the usual". The Care Plan Goal
reads complaints only (derived Fang Bing Ren "complaints" are gone from
`phCcSecAll`); the letter's "Watching:" = complaints + the sign rows she can
see (DRAFT wording). **Baseline Compass (her 2026-10-22 synth22 and 8 picks, "Baseline Compass"
in BUILD-NOTES.md; the table is now Complaint | Baseline | Trend | Today | From baseline | Note):**
every row keeps a BASELINE = its FIRST score (derived on read, with its date; the one stored thing
is `rec.ccTrack.base[rowKey] = { day }` from "Move baseline to today", `phCxRebase`) and shows how far
it is from it, + = better on every row (a sign is a running total: Better +1, Worse −1, Same 0, Gone
counts better). Rows sit in the nine Fang Bing Ren body areas (`phCxGroups`; a complaint nothing
places goes to Other; since 2026-10-23 an area is a coloured edge, not a heading row: see "One table"
below); Energy is its own group. **The pain map's rows are the pain
rows** (group "Pain, muscles & joints"): the score is the pain store's own
(`rec.msk.visits[day].pains["region|side"].now`, written through `phPmScoreSet(..., force)`), the
Goal is `painMap[i].goal`, the starred pain stands in for a typed pain complaint, and the separate
Pain card is gone from Today's visit while the Compass holds them. One model (`phCxModel`) feeds the
rows, the chart (From baseline | Score, a group filter), the header counts and the live paint while a
slider moves (`phCxLiveRun`); the view state (From baseline | From last visit, chart mode, filter,
open drawer) is per patient and never stored. Phone: no chart, no body figure. **Earlier visits (her 2026-10-23 picks, mock earlier-visit-baseline-mock-2026-10-23.html):** a
done booking counts as a visit (`phSeenDays` = logged sessions + bookings; Today's visit strip,
`phTodayParts` and the Compass read it), and on a computer a "Scoring" bar (on the wide card the "Today ▾" dropdown since 2026-10-26; Today, then the
patient's done bookings newest first, `phPastBookDays`; 5 chips + Older ▾) scores an earlier visit in
the same table under a gold line (`phCxAt` view state, `phCxDayOf`; complaints + pains + notes only,
the earliest scored day becomes the baseline); "N earlier visits · none scored" until one is.
**Pain on "% better" (her 2026-10-23 "i cant see the % option", picks "Both A and B"):** a pain row
with a baseline before the day being scored follows the switch (slider 0-100% + box, `phCxPctBase`);
her % is kept as `vis.pains[r|s].pct` beside the `now` worked out from the baseline (7, 50% = 3.5),
so the Musculoskeletal page keeps a number; any other "now" score drops `pct`. With no baseline yet a
pain stays 0-10. On "% better" + From baseline, every complaint and pain row (and the group average)
reads its distance in % (`phCxPctOf`); Energy, signs and From last visit stay as they were.
**Sign search (her 2026-10-23 picks, mock fbr-sign-search-mock-2026-10-23.html, "Compass sign search" in
BUILD-NOTES.md):** an always-visible box under "Compass · came in for" (`phCxsHtml`); it replaced "+ add".
Typing searches the Fang Bing Ren signs (`phCxsOptions`, the Fang Bing Ren page's `phCsToks` / `phCsScore`);
each result is that page's question row, Now Yes / No · Usu Yes / No (a Bing sign and its Ren twin = one
row), saved through `phTriWrite` (the same answer again clears it); a Yes pins its row under the lit
complaint. Which signs get a Compass row is still `phCxSignList`'s ANSWERED rule (her pick: a Usu Yes adds
one too); a fixed sign's result says "Fixed" where others say "✓ in Compass". The list stays open for the next tick (Esc / a tap elsewhere closes it), 8 rows then "Show all N",
then "Add as a complaint" / "Add to Watch"; ↑↓ + Enter = Now Yes, Shift+Enter = Usu Yes, Enter with no
row lit = her words as a complaint.
**Pain for every plan (her 2026-10-24 "allow for adding pain symptoms for all types of treatment plans",
"Compass: add a pain on any plan" in BUILD-NOTES.md):** words that name a place on the body
(`PH_PAIN_REGIONS.parse`) put "Add pain · <place>" on top of the search list (`phCxsPainOpt`), and Enter with
no row lit adds the pain instead of a complaint (`phCxPainAdd`, the pain map of the plan on screen through
`phPmWrite`, Undo in the toast). A pain map makes any patient a pain patient (`phMskApplies`, which also
counts `rec.painSites`), so the Pain group, its row and the Musculoskeletal tile appear. A typed complaint the
new pain stands in for hands it its scores, notes, baseline, earliest start and Goal (`phCxPainAbsorb`,
copies only); a typed complaint whose words are only places (her "tmj") counts as one (`phCxPainDup`), and
the Care Plan Goal skips the complaints the Compass hides.
**One table (her 2026-10-23 picks, mock compass-simple-mock-2026-10-23.html, "Compass: one simple table"
in BUILD-NOTES.md; she found the area headings, "Signs · n" lines and buttons too busy):** complaints and
signs are ONE table. No area heading rows, folds, counts or "n of m set" pills: each area is a thin
coloured edge down its rows (`.ga`, `--gc` = the area colour) with its short name small on its first row
(`phCxAreaLabHtml`, which also holds "Same as last time" = `phCxRestSame`, shown on mouse-over or a
long-press). Sign rows are indented with a SIGN tag in their OWN area's colour; a sign she added while a
complaint was tapped (`sxPin[key].cc`) sits RIGHT UNDER that complaint even in another area (`r.host` in
`phCxModel`), any other sign after its area's complaints. ⋮⋮ ▸ ▾ sit in `.ph-cx-hov` at the end of the
name, shown only on mouse-over, a long-press on a phone (`.lp`), an open drawer or an open menu. No keys
line (the hint is the search box's tooltip); no "rated from next visit" (a first visit leaves the sign's
cell empty). Motion (all off under reduced motion): the gold "now asking" line is ONE band behind the rows
(`.ph-cx-askbar`, `phCxAskGlide`; until it has found its row the `.ask` row itself is gold) that glides to
the next row; a ✓ pops on a scored row (`PH_CX_TICK`); "Asked n of m · better · worse · gone" sits at the
right of the header (`phCxGlanceHtml`; "Now asking" went; not on the wide card) with a gold bar under the header that fills
(`phCxProgGrow`); a new sign row slides in with a gold flash. `phCxSettle` runs these once per paint
(`phCxAfter`, or a timer after a full-page paint). The small body beside the search (`phCxFigHtml`, the
Fang Bing Ren page's drawing, front view, computer only) glows each row's place in its area colour (a
sign: `phFbbPlaceOf`; a complaint: its area's place; a pain: its words, `PH_CX_PAIN_PL`; Energy, Heat &
sweat, Skin and whole-person signs: a ring); the asked row's place breathes, a just-added sign's pops; the
node is kept through a repaint while the same places glow, so the breathing never jumps. The checks are compact rows, two across, each with Open and
Skip ▾ (Not today / Always for this patient); a skipped check folds into the
"Skipped" line and counts as done (`phTodayPartOk`). Quick assess shows 8
questions in 2 columns on Today's visit and Fang Bing Ren [synth22: Today's
visit tidy ...]. A visit is finished in ONE place, the Treatment tab's "✓ Complete session N"
(`data-pres-acu-log`; her 2026-10-23 pick: no "Log" wording, Today's visit shows "Open Treatment"
then "Session N complete"). **"No acupuncture — herbs
only today"** saves `noTreatment:true`; every reader of `rec.acuSessions`
(the printable record, Patient Journey, the Visits table, the quiet-patient
detector, and **session-package counting**) branches on it.

**Table + panel on a computer (her 11 picks 2026-10-26, mock `compass-tidy-mock-2026-10-26.html`, BUILD-NOTES "Compass: table + panel"; her "this looks messy ... improve organisation and ui"):** when the card is 900 px or wider (`phCxCardBHtml`; narrower and the phone keep the layout above) the Compass is ONE header line (Came in for + the search · a **Today ▾** dropdown of her done visits that replaces the Scoring bar, gold on an earlier one · From Baseline | Last visit · 0–10 | % better · **Chart ▾**, the chart folded until tapped) over a 3-column table **Complaint · Today · Change** (Change = baseline → today with a small line and the +/− pill, `phCxChgHtml`; no Baseline / Trend / From baseline / Note columns there), Energy its last row ("am · pm · ev", its 1–10 bars in the panel), the pain tools one joined bar under it (＋ Pick areas · Close-ups · Surgeries · Pain intake). Beside it a **panel** (`phCxPnlHtml`) holds the asked row large: area, name, Goal (the Goal lives only here), Today, the body drawing, Baseline · Last · Since + its chart, last visit's note, then ✎ Note · Details ▾ (side, detail, Move baseline) · Next: X ›. A tap on a row puts it in the panel; a score moves the gold row and the panel on. The count is said once, on the Ask step: no "Asked n of m", no gold progress line, no count pill on the Ask / Look / Treat headings (`phTodaySecHd`).

**Edit in Details, any number of Mains, a sign on the bar (her synth22 picks 2026-10-27, mock `complaints-batch-mock-2026-10-27.html`, BUILD-NOTES "Came in for: edit in Details ..."):** every row's Details ▾ (the panel; the drawer on a narrow card) edits it in place: a typed complaint = Name · How long · ★ Main · Remove (`phCxCcFormHtml`; Remove on the chief moves the next complaint up with its own scores, Undo), a pain its own form, a sign Track with Better · Same · Worse | Bar 0–10 + Make it a complaint (`phCxSxTrackHtml`). ★ Main is a switch on each complaint, any number, one always stays Main (`phCxStarToggle`; `c.mainOff`, `s.main`, `p.main`; the item flag is `star`, while `main` still means the chief's slot, which never moves, so scores stay with their complaint); each Main leads its group, groups with a Main first; with more than one Main the Care Plan's Came in for row, Aim and Watch join them (`phCxCcMulti`). A sign on the bar (`rec.ccTrack.sxBar`) is scored 0–10 under its own id in its Signs line; made a complaint it keeps its scores and its Fang Bing Ren tick and wears a small Sign tag. The header's switches never squeeze; From · switches · Chart ▾ wrap down together (`.ph-cx-tools`).

**Copy notes** (her 9 picks 2026-10-26, mock `copy-notes-mock-2026-10-26.html`, BUILD-NOTES "Copy notes: today's visit as text"): one tap copies today's visit as labelled lines for her Cliniko treatment note (date · visit · cycle day, Scores, Tongue, Pulse = the Note tab's text, Abdomen, Acupuncture = points + press + therapy lines, each Formula with its herb lines + Total + Dosage · take-days · lasts N days) and shows what went in a box under the button (✕ closes). Every line is that fact's own read; a part with nothing today is left out; the formula = dispensed today, else the one Dispense opens. Doors: the Today's visit step bar, the Treatment band, the ⋯ menus (Care Plan / Treatment / Dispense), the toast after Complete session. Code: "COPY NOTES" (`phCn*`).
**Findings charts** (tongue / abdomen / pulse) are the app's own tappable
diagrams with a "brush" (pick a sign, then tap its regions). Data shapes:
`visitFnd[id].tng = {colour, colourMore[], colourAt, shape, moist, coatThick, coatColour,
coatArea[] (root / mid = centre), coatAt{} (coat colour per zone), coatQual{}, marks{}, under, thickAt{}, deviation, v2}`
(the Tongue page since 2026-10-24: photos beside four tabs Body · Coat · Jiao · Sublingual, Shape and Marks as dropdowns, a
red tip chip, a Jiao tab with a tongue map and one line per zone (Upper / Middle / Lower / Left / Right) that opens its own
colour, coat, form and mark bars; a linked chip carries its Fang Bing Ren signs in its hover and the thin plum bar under it (`.tfp-lk`, the Find the Ren link mark), the
"Fang Bing Ren · N ticked" tab opens every linked chip in place (her 2026-10-24 "just open the chips", never the Fang Bing Ren page); zone colours (red tip) are record only, `phTngChipKeys` skips `colourAt`;
BUILD-NOTES "Tongue page: tabs + the three jiaos"), `visitFnd[id].abd =
{tension, tensionAt{} (read-only legacy: nothing new is written), tempC{epi, lower} (°C at CV12 / CV4, 28–40, no navel),
marks{sign:[zones]} (Seen signs distended / bulging / sunken / vispulse sit by ROW: whole, epi, umb, lower), v2}`
(her 2026-10-22 Abdomen redesign, see BUILD-NOTES). Since 2026-10-24 (BUILD-NOTES "Abdomen: Fang Bing Ren panel ..."): Seen
has "flat" (whole belly, no place); Temp is cold · cool · warm in BLUE / PALE BLUE / RED (temperature only; water and gas ink stay
grey), one temperature per place; Feel is tender · tight hypochondrium (`tighthypo`, R / L hypo only, ticks the Chest & ribs pair)
· pulsation · tight rectus · thin wall. There is no Xia Xin chip: tender at epi IS Xia Xin tender, and `phAbd2Read` reads an old
`marks.xiaxin` as tender@epi. Fang Bing Ren the Tongue page's way (her "Same as Tongue now"; no sign list): a chip that reaches a
sign carries the plum link bar (`.tfp-lk`) and its signs on hover (`phAbdChipLinks`, off the `abd:` specs), and the
"Fang Bing Ren · N ticked" count (`phAbdFbrTicked`, a fact) sits on its tab. `phAbdChartWordsOf` is the one read of a chart's Fang
Bing Ren words. **The Abdomen page is the Pulse page's way since her 2026-10-25 picks** (mock `abdomen-page-mock-2026-10-25.html`,
BUILD-NOTES "Abdomen page: the Pulse page's way"): one tab bar Seen · Temp · Sounds · Tension · Feel + ✕ Erase that stays in view
(`.ph-pls-tool`), only the open group's chips under it, °C steppers in the Temp row; a picked sign stays picked and taps places on
and off (Esc lets go); with none picked a place opens its own signs beside it (`phAbdPopHtml`: only what can sit there, Clear
place); "Whole abdomen" is a place (stored as `"whole"`; an empty list still reads as whole; a whole temperature washes every zone
without its own, `phAbdTWashes`); the side view's rows tap too (`data-abd-band`); one tab panel beside the charts: Summary (still
"Reads as") · Note · Fang Bing Ren, today's photo over it (`phAbdPhotoHtml`, Today | Last flips, `phAbdPhotoRefresh` on a photo
load). Last visit draws in grey under today's marks, front and side (`phAbdLast` = the newest dated finding before today;
`opts.prev` on both charts, `phAbdGrey`; still, always on), with a "Today · Last · <date>" key over the charts (her 2026-10-25
batch 2, BUILD-NOTES "Abdomen batch 2"). Every sign is drawn: tight rectus (red dashes by row), thin wall (dotted ring), and a
Whole abdomen sign once, big. Phone: the sign tabs one sideways row (edge fades), Erase at the end of the chip row. The page
handles its own taps (`phAbdClick` → `phAbdChartWrite` → `phAbdWrite`); the old shared `data-visit-abd2` handlers and the
`phAbdExam` borrow are gone. The exam pages are the
ONE entry; `phExamMirrorToday` copies today's exam into the dated record.
Pulse: each tick is dated and each new day starts blank; Cun / Guan / Chi
each head ONE column (R: Up. Resp / Stomach / Bladder, L: Heart / Liver /
Adrenals, `PH_PULSE_POS_COL`), the organ-name row on top and the
Cun / Guan / Chi row right above the cells (her pick B), each position and
each short column name showing the full organ name on hover, and her normal pulse (`PH_PULSE_TPL`: Cun Qi, Guan Blood, Chi Organ,
arches; Left Guan wiry) is drawn under her ticks (`phPulseBase`) unless she switches it off: since her 2026-10-26 pick A (`pulse-layers-toggle-mock-2026-10-26.html`) Normal and the last visit's date in the key are chips that hide / show that line on every chart, remembered on this device (`lcm-pulse-layers`, `phPulseLayer`); today's blue always shows; the date chip only when a last chart exists. One cell shows three inks over each other (her pick 2026-10-21): the normal pulse solid green (widest), last visit solid grey (middle, `.ph-pulse-prevl`, shown even when today is ticked), today blue (thinnest, blue-tint cell), with a legend Normal · Today · <date> over the chart. **The Pulse page since her 2026-10-24 picks**
(mock `pulse-page-mock-2026-10-24.html`, BUILD-NOTES "Pulse page: tabs, the chart moves itself"): the four
quality groups are one tab bar (Concavity · Radius · Intensity · Texture + Erase) with only the open group's
chips under it, the bar staying in view; a picked quality stays picked until tapped off (or Esc); with none
picked, tapping a box opens that box's own qualities beside it (`phPulsePopHtml`). Under the chart one tab
shows: Summary · Rate & rhythm (the Shen-Hammer exam, open) · Note · Fang Bing Ren (the qualities that tick
a sign, signs on hover, `phPulseChipLinks`; the sign list left this page). **Pulse in action** is
"▶ In action" on the legend line: the beat is drawn over the chart's own cells (`phPaOverHtml`, the concept
pictures' runner as `PH_PP.SC.pulse`), today's arches in the chart's blue lifting by amplitude at her
Hammer at-rest rate (72 when none, a Slowed chip), following the Hammer rhythm; the chart's own today
drawing steps aside while it runs; still under reduced motion. The chart is
HER TABLE (her 2026-10-21 picks): 6 columns, 3 PRIMARY (Cun / Guan / Chi,
lightly shaded) and 3 SECONDARY -- never pair a secondary column with a
primary one; a charcoal line between every column, ONE solid grey line through
each word (Skin / Qi / Blood / Organ) with the drawings sitting on it, no
boxes, her grey bar and base, equal 44px rows, lines and words in one
charcoal, RIGHT / LEFT in the label column. The beat is measured off the chart's own
column and row labels (`phPaLay`, again on a width change); the chart's frame is CSS on its grid
(`.ph-pulse-fr/-vl/-pc/-dl`). Drawings level with the line (`plv-*` on
`phPulseShapeSvg`) and wider in the wide columns (its `vw` argument). Since her 2026-10-22 picks
(memory project_pharmacy_pulse_quality_drawings_2026_10_22) every quality has its
own drawing in the picture (`phPaModel` picks the shape, `phPaDraw` draws one frame);
amplitude is HER ARROW SCALE: ↓ Soft / ↓↓ Weak / ↓↓↓ Flat, ↑ Slight pounding / ↑↑ Pounding /
↑↑↑ Robust pounding (chips, chart glyphs and arch height all follow the count);
Thin / Narrow is one chip; Loose is gone; Blocked = walls both sides + her loop; Ropy =
thick wiry line; Small compressed holds up to 3 per cell (`n` on the mark). DEEP and
FLOATING ARE READ FROM THE DRAWING (`phPulseAutoDepth`, never stored): below the
position's normal depth = Deep, Skin row = Floating; their chips light up (`.auto`) and
Patterns, Fang Bing Ren and the SHPD notes read them as if ticked. Abdomen tension is
one whole-abdomen value. Read every finding through `phVisitFndRead`. A
**Findings trend** sheet (Grid | Trail) shows dated tongue and abdomen
findings from the exam pages. The pulse knowledge base
(`PH_PULSE_KB_SEED`) only shows hints, never writes. Bell's palsy is scored
none / partial / normal (don't change the scale).

## Timeline & intake form
**Timeline** is its own rail step, right after Fang Bing Ren, on IVF /
Natural fertility / Pregnancy plans only (`phTlKindOf`); "done" = nothing
overdue. It reads IVF history, Blood tests and the pregnancy test (nothing
asked twice) and takes month/year dates on Schedule [Timeline promoted to
its own rail step]. **The intake form** arrives
pre-filled from her file (details, cycle, Yes / No history) and can carry
Fang Bing Ren questions (`PH_INTAKE_FBR_P` must match `PH_FBR_Q.p`); the
link dialogs include a text message to copy. Creating a link never depends
on the database SQL.
**The medical history link (her synth22 picks 2026-10-26, BUILD-NOTES "Medical history link"):** every link
carries the app's own question list (`prefill.qs` from `phIntakeQs()`), so a question added to
`PH_HISTORY_GROUPS` is on the next link; intake.html's copy is only the fallback. A Yes opens a details box on
its row (lands as that row's note, "Form <date>" tag); Family history has Yes / No / Don't know ("unsure",
a grey "? Don't know", never a Yes) and one "Unsure about anything?" box (`rec.historyGroupNotes`, shown under
the group); "Taking supplements" Yes opens rows of name + dose that land on the Supplements page (one of the
four turns on, any other joins `rec.suppOwn`). The same link reopens with the patient's answers and "Send
again" once `supabase/intake_resubmit_setup.sql` is run (90 days); a resend shows in Intake review as
"Updated" with only the changes. `rec.medicalHistoryNotes` has no box: older forms' notes in it show under
Medication & allergies.
**Other condition (her 2026-10-27 "include a other option to add unusual conditions in medical history"; her 4 picks, all A,
mock `hx-other-mock-2026-10-27.html`; BUILD-NOTES "Medical history: Other condition"):** "+ Other condition" at the end of
General health and of Family history: type, Add (or Enter) and it is its own Yes row with an Added tag, a ✕ (Undo in the toast)
and its note. Data `rec.historyOther[k] = { n, fam, at, src }` (k = `ox_…`); its answer, note and Form tag are the ordinary
`rec.history[k]` / `historyNotes[k]` / `historyNoteFrom[k]`, so it is a Yes everywhere: `phHxApplicableItems` (the counts, the
flags strip, profile search), the figure (a whole-body chip), the condition chips, Today's visit, the Care Plan History row, the
herb caution (on its own words). The same words as a list row answer that row instead. Not in Allergies only. The link has
"+ Something else" in the same two groups (`history.others = [{ n, f, note }]`); it comes in as an Added Yes row, the details on
its note tagged Form, and a later link brings back the patient's own conditions (her own typed ones never go to the patient).

---

# Deploy & git
- **Push live only when she says "push live"**, each time, for that change
  (the 4pm daily auto-deploy was removed 2026-10-05). Commit freely on
  `session-a`; a push is her call.
- **How:** `.github/scripts/publish-live.sh` — a dry run by default; `--yes`
  only after her word. It needs a clean tracked tree, bumps both version
  markers, commits, pushes `session-a:main`, checks the result, and never
  force-pushes.
- **One publisher at a time (her rule, 2026-10-23):** before every
  `publish-live.sh --yes` (or a hand-made publish), run
  `mkdir .git/lcm-publish.lock`. If that fails, another session is
  publishing: wait 30 seconds and retry. When the script prints LIVE or
  fails, run `rmdir .git/lcm-publish.lock`. Only remove a lock YOU made: never chain
  `mkdir ...; ...; rmdir ...` with `;` (a failed mkdir still runs the rmdir and deletes another
  session's lock); use `if mkdir .git/lcm-publish.lock; then ...; rmdir .git/lcm-publish.lock; fi`.
- **Every push bumps BOTH version markers**: `sw.js` `CACHE_VERSION` AND the
  `<meta name="lcm-build">` stamp in index.html. The gold Update button
  compares the meta stamp; bumping only sw.js ships an update her app never
  offers her.
- **Push the branch ref** (`git push origin session-a:main`), never
  checkout / merge / reset / stash: other sessions work in this same tree.
  Anything committed on `session-a` rides along on the next push, whoever
  makes it, so a commit is a publish decision.
- **Stage only your own hunks:** `git diff -U3 > p`, trim it to your hunks,
  `git apply --cached p`, then `git commit` with NO paths. Never `git add -A`
  and never `git commit -- <paths>` (it commits the whole working copy of
  those paths, sweeping in another session's unfinished edits). A `-U0`
  patch can misplace insert-only hunks; use `-U3`.
- **Grep to confirm every edit landed.** An Edit success is not proof with
  several sessions on one file; one Edit per file per message.
- **Never rewrite source with PowerShell** `Get-Content` / `Set-Content`
  (encoding damage); use Edit, perl / awk, or .NET UTF-8.
- Write the CSS before the markup that needs it, so a half-landed commit
  never shows unstyled markup.
- **Changing an app icon needs a new FILENAME** (Android bakes the launcher
  icon in at install): rename (`-v2`), update manifest.json, the link tags
  and the sw.js SHELL list.
- GitHub Pages (`b00k33/lcm-pharmacy`) publishes only index.html,
  intake.html, chart.html, chart.webmanifest, manifest.json, sw.js, icons/
  and screenshots/ (`.github/workflows/pages.yml`). The .md files, mocks and
  backups are never published. Never Netlify.

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
- A sandbox browser tab can silently keep serving a stale in-memory copy of
  the app across many prior edits even with no service worker registered —
  always force a real reload before concluding a feature is "still missing."
- A `var(--x)` whose token is defined only inside `#pharmacyPage { ... }`
  is invalid on a body-level element (the one toast, a fly, a popover
  appended to `<body>`), and the property silently falls back. Give it a
  fallback (`var(--ph-cream, #EEF5F7)`) or append inside `#pharmacyPage`.
- `animation-fill-mode: both` (or `forwards`) ending on `transform: none`
  still leaves a stacking context, so a later popover can sit under it.
- Moving a CSS block changes which rule wins at equal specificity, and
  `!important` order with it — re-check the moved rules' winners.
- A computed value read in the hidden Browser pane mid-transition reports
  the old value (throttled transitions); turn the transition off or wait
  before measuring.
- Never reuse an existing class name for a new wrapper: one class with two
  jobs overlapped the Ren and Fang Bing Ren sign rows.
- A write door with a whitelist (`phPmWrite`) silently drops a new field
  until the field is added to it.
- `PH_INTAKE_FBR_P` (the intake form's Fang Bing Ren questions) must match
  `PH_FBR_Q.p` in the app, or an answer lands on nothing.
- The sandbox draws the sign-in overlay over the page and there is no
  signed-in account (never create one): test through real function calls
  and DOM checks, or the headless-Edge phone harness, and say what was not
  exercised.
- A service worker's cache-first branch stores EVERY GET the page makes through it: a
  fetch with a fresh query each time (the old update check's `?probe=<time>`) kept one
  full 7-10 MB copy of the page per check until the next Update; and `cache:"no-store"`
  throws away the browser's 304, so every open downloaded the whole page. The check now
  uses one fixed `?probe=1` + `cache:"no-cache"` and sweeps stored probes, and sw.js passes
  `probe=` through and fetches navigations with `no-cache` (2026-10-26, BUILD-NOTES
  "Lighter update check").

---

# Locked conventions — do not re-litigate
One-line decisions she has already made; don't re-ask or quietly bring back
what's on the "never" side. Rules already stated above (the ★ rules, Theme,
Fit the screen, Motion, NEVER break these, Deploy & git, Current state) are
not repeated here.

- Never reintroduce the 44px minimum-tap-target rule (it made every phone
  control too large; explicitly retired). Chips and buttons are 32px (6px corners); a few
  phone Dispense chips are 40px on purpose (`.ph-days-opt` / `.ph-pm-opt`).
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
  IS fang bing ren".) Ren's 24 Gui Zhi yes/no questions and the general
  engine's "guizhi" PH_PAT_DEFS entry were retired for duplicating it; never
  reintroduce either. Ren's 5-question survey (Build/Skin/Temperament/
  Hot-cold/Gut) still decides the OTHER 6 constitution archetypes; only its
  Gui Zhi weight also counts toward Triangle's Gui Zhi total (phBtqGuizhiPts).
- **PH_FORMULAS entries are constitutional families, named after the herb —
  "Gui Zhi", "Chai Hu", "Ma Huang", "Da Huang" — NOT specific prescribable
  formulas** (her correction). Bing and Ren signs are two SHARED pools
  (PH_BING_SIGNS/PH_REN_SIGNS, label-only); a sign's worth lives in each
  family's own weight table, so one tap can score differently per family,
  including negative (a disqualifier: Ma Huang's cautions, Ban Xia's dry /
  burnt / shiny red tongue). The ranked list is `phFbrRank` over every
  entry; badges, the tally and the exam-page strips follow whichever family
  leads. A sign a family doesn't use weighs 0, never undefined (keeps scores
  from turning NaN). There is no fixed ceiling: `phFbrMax` sums each family's
  own positive weights. Rows pre-fill from `phPatClues` where a real source
  exists (PH_TRI_PREFILL) and Disease ticks carry forward day to day
  (`phTriEffective`'s `prevD`); a tap always overrides either. The family set
  started with Huang Huang's 7 and has grown on her call, one integrate33
  run each (see BUILD-NOTES) — count `PH_FORMULAS`, never trust a number
  written here. The other PH_PAT_DEFS patterns (Blood stasis, Blood
  deficiency, etc.) run on the older Patterns engine, a separate project.
- Phase Started/Ended dates are read-only and auto-stamped (typing them was
  tried and reverted).
- **Never hand-type she / her / his about a patient**: use `phPro(name)` /
  `phProRec(rec)`, or neutral words where no patient is in scope.
- Phase labels are identity keys (`msgWording`, `phaseKey`, group names such
  as "Subjective — how they feel"): change every use together, never one.
- Sign labels read "Subject: descriptors" ("Sweat: easily").
- A "Diagnosis:" sign names the condition only (her 2026-10-21, "fatty liver is not related to
  diarrhoea"). Symptoms a source lists with it are their own signs, reused from the pool and
  weighted on the formula; a condition the pool already has is that one row, never a second one.
  A diagnosis may keep words that describe the condition itself (cold-type, watery discharge).
  The same holds for any sign (her "yes, split them", same day): swelling or scant urine riding on
  a headache are their own rows; words about the same subject stay together ("Urine: yellow, scanty").
  "Tongue" (body) and "Tongue coat" are two subjects. Her Bing pass: "with" = + (two subjects
  joined by "with" are split); a row that lists its parts with commas or "or" stays as it is.
  A classical one-name sign stays one row with its pinyin name in brackets, "Fever: with chills
  (fa re wu han)" (her "include in ()"); the lower back and belly row and Huang Qin Tang's
  against-pair "low energy, sunken lax pulse" stay as they are, unnamed.
- A new Medical history count reads `phHxApplicableItems`, so it matches the
  page.
- Never `phFlashShow` on a patient page, a sheet or a dialog: the one toast
  (`presSavedToast`) only.
- Claude-authored patient-facing or clinical wording is DRAFT until she's
  explicitly read and corrected it — "build it" is not "approve the
  wording," even after a broad "ok build all."
- Never dump a large backlog of questions on her at once — curate a small,
  genuinely tap-ready batch.
- **NEVER DELETE A PATIENT PHOTO, keep every one no matter what** (her firm
  hard rule, 2026-10-14, after Chrome evicted the photo store): no code path,
  clean-up, dedupe, migration, storage trim or Claude action may remove a
  photo; a delete she taps herself keeps its confirm + Undo. Protect the
  store (`phStoragePersist`) and keep the backups that carry photos.
- Zygomatic branch stays at one checklist item on the facial-paralysis
  checklist — she's declined a second, twice.

---

# OPEN — needs her word
Rewritten 2026-10-21 against `origin/main`. **Never list here (or anywhere)
the items she took off the backlog on 2026-10-06:** the draft-wording review
bucket, the two rebate messages, the two-computer sync / restore timing, and
pre-loading the Treatment step. To check whether a build is live, run
`git merge-base --is-ancestor <commit> origin/main` or grep `git show
origin/main:index.html`; don't trust this list's age.

**Her decisions:**
- Whether Formal / Casual is a per-patient tag she sets, worked out from how
  long she's known them, or both with an override (code3).
- Whether the Supportive tone applies outside the cycle track (stress /
  anxiety plans are a guess).
- Her review of the `PH_TP_DEFAULT_SESSIONS` numbers on the original
  built-in templates (the mechanism is live).
- A Dashboard "stocktake" pair of cards (needs a mock and her sign-off).
- Ma Huang, Da Huang and Fu Zi Ren rows were never checked against her own
  tables (Ren audit 2026-10-13): she needs to re-send them.
- The "Post Ovulation" house-blend formula is missing from her live
  inventory: recreate it with "+ Add formula" or restore it from a backup
  (no code can bring it back).
- Fang Bing Ren reference formulas waiting on her tables: Wen Jing Tang,
  Gui Zhi Fu Ling Wan, Chai Hu Gui Zhi Tang, Ling Gui Zhu Gan Tang (Huang
  Lian Jie Du Tang and Da Chai Hu Tang are families now).

**Built on my reading — hers to confirm:** the pulse chart starts blank each
day; Usual period shows Wheel |
Chart.

**Paused or not built:**
- Photo organising increments 2+ (the Comparison table's calendar date
  picker and before/after swap, Records → Photos grouping by shot and date
  fixing).
- The per-herb shelf→after-stock bar on Dispense.
- The cycle Day log `.ph-ck-chip` rows as joined bars.
- Whether the standing tongue / abdomen charts carry over day to day
  (unchecked).
- A heartbeat field on IVF scans; folding `#phRenUndoToast` into the one
  toast; the ~19px title-bar shift; baking `PH_HERB_SEED`.
- Larger work, knowingly parked: a desktop build beyond the PWA; AI intake
  extraction (no backend, no safe place for a key; don't re-raise without an
  architecture change); bulk past-period entry from the patient's phone.

---

## Before finishing
- Every rule above is met. Check at 360 / 375px and at desktop width:
  nothing cut off, overlapping or scrolling sideways; every colour from the
  tokens; the teal & white look intact.
- **Integration check (★★★):** look at the changed fact on every page that
  shows it, and name in the build note which pages you checked.
- Grep the screens you touched for `suggest`, `e.g.`, `starter`,
  `text-decoration: underline` and `placeholder="`.
- Motion: no entrance animation on a base class; all of it off under
  reduced motion.
- Write the build's note at the END of BUILD-NOTES.md (her words, her
  picks, where the code lives, what was tested and what was NOT); fix any
  standing rule or Current-state line here in the same commit; update
  memory.
- Commit your own hunks only (Deploy & git). Push only on her "push live".

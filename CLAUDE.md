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
3. **Derived on read, never copied.** A value worked out from other data (auto Diagnosis / Goal / Watch / Aim; Fang Bing Ren pre-fills from charts, history, bloods, the intake form, pain words, cycle, age and sex; Came in for from the pain map; IVF scan bloods in Blood tests; timeline items from IVF history) is computed when drawn and never stored. Only her own taps and typing are saved, and **her own value always wins** over the derived one, with a "back to auto" way out.
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
**One size for all of them (her chip audit, 2026-10-23, applied app-wide by 2026-10-24; this line wins over any older size below):** **32px tall, 6px corners, a thin line, 13px text** (a search box: 32px, 12px text, the search icon); picked = solid; **icon-only = a 32px circle**; one category's chips join into one bar. **Kept as they are:** the 44px header disc (the page's one main action), stat tiles, rows and step rows over 52px, pulse chart cells, calendar days. Phone sizes: STYLE-LCM.md. Her "no" to the Zanda finish (2026-10-24) keeps circles, 6px corners and normal case.
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
  reached from its Today's visit tile. No second Cycle tab.
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
live on the plan stage's tabs. Step 9 is when she shapes and uses that shell
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
- **Type:** sizes come from the `--fs-*` tokens, never a one-off px; display
  numerals (gauges, big counts) use `--font-disp` (Barlow Semi Condensed).
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
  and write (her events, routines, birthdays, to-dos; never herbs, patients or money), gated by
  `window.__lcmOwnerOk` and RLS on the two addresses. Never put pharmacy data in it.
- **LCM never updates itself** (her spec after the Aug 2026 data losses: "a
  new version NEVER installs itself behind my back"). No auto-reload or
  auto-refresh on a stale build, ever; a new build only reveals the gold Update
  button, and `phDoControlledUpdate()` saves, flushes to the cloud, backs up,
  then reloads. Bump BOTH version markers on every push (Deploy & git).
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

## Appointments & calendar
**Toolbar + Up next buttons (her 2026-10-23 picks, Zanda as inspiration, appt-chips-final-mock-2026-10-23.html):** every
control is 32px; text controls are 6px boxes (white, thin line, picked solid), icon-only buttons stay circles, text at the
app's own sizes; ‹ › then the date in full in teal (`phApptCalDateLong`), Today always there (greyed on this week), the day
count a "7 days ▾" dropdown (`.ph-atb-dd`), Grid | List a joined box bar, search with the magnifier; Up next = Open (solid) ·
Profile · Edit in one row, then Call · Text · Email circles (`.un-row3`, `.un-icons.circ`). This page departs from TAPPABLE
THINGS' pill chips on her word; other pages follow page by page [Appointments chips, one height].
Since 2026-10-23 the Next button, patient rail, search boxes and small pills app-wide follow the same 32px look [Shared chip fixes, one height]. Fang Bing Ren and Ren too: each sign a white 32px box with the ✕ as its own end [Fang Bing Ren + Ren chips, one height]. The exam pages (Today's visit, Ask her, Tongue, Pulse, Abdomen, Medical history) too [Exam pages chips, one height]. Treatment and the Care Plan too [Treatment + Care Plan chips, one height]. Timeline and Messages too; a message group over 6, or one that would wrap, is a dropdown [Timeline + Messages chips, one height]. Musculoskeletal too [Musculoskeletal chips, one height]. The Guide too [Guide chips, one height]. The To Order board too [To Order board chips, one height]. Every other page too [Every other page, one height]. The leftovers the re-audit found too (Cycle, Care Plan pain map, Treatment, visit filters, Diagnosis colours, Today's visit, Dashboard, Up next fold) [Chip audit sweep]. Inventory's in-row cells too [Inventory in-row cells at 32px]. No emoji on any page (icons are the sprite) [Emoji out of the pages + Formula refill crash fix].
The app opens on this page. It mirrors Cliniko's day view: solid colour
blocks read off `PH_CLINIKO_TYPE_COLOURS` (her Settings → Appointment
types, 21 types read live), a time gutter, the page scrolls, no inner
scroller. Grid opens by default at every width (List is a tap away). A
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
(Grid and List) opens the Me drawer (non-modal, right side under the title bar; a bottom sheet on a phone):
the level bar, Today's meals + Shopping ("Meals + the Diet log" below), **My profile** (below), Bring in, to-dos (type + Enter, tick = done with Undo), the next 14
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
rest, so both logins read it) with a Cycle row "Day n · Phase · L-day" that opens the same page. **Drag**
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
is day [ ]" finder, a box under the tapped day, PMS on every day, and a
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
(Overdue / This week / Next week, tap filters); **Make weighs in the row**
(tap each herb, ring fills, Finish = the same phDispenseGate → refMakeCommit
save) then "Made today" with Undo; a planned formula **leaves by itself**
when its stock went UP after planning (`h.refillQty` stamped at planning;
older plans: week passed + above its line) with Undo; header primary is the
gold "+ Plan a formula" (search sheet); New formula recipe sits in ⋯ and
opens as a side sheet (#refPresPanel), never inside the card. Every row with
a recipe ends in a "Recipe" button (pencil icon, `phRfcRecipeBtn`, `data-pres-open`) that opens
that recipe's herbs and grams in the same side sheet; the name still opens
the jar (her 2026-10-24 "how do i edit recipes?") [Formula refill: a Recipe
button on every row].

**To Order, desktop** (>900px) = a 3-column board that fills the window:
**Needs ordering** (a To order | Running low switch, rows A to Z in fixed
spots, Snoozed N ▾), **On the way** (bottle counts, Copy for email, All
arrived), **Arrived** (last 14 days). Nothing scrolls a column on any board
move; details pop out beside the row; a formula card has "Refill ▾"
[To Order: the desktop board is 3 columns; To Order column 1: C · Switch].
**The phone To Order is the older layout, untouched.** Dashboard's
Order/Refill cards are TWO PLAIN LISTS, empty first then fewest days of
cover. Picking a supplier pulls in that supplier's recorded price.

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
form, pain words, cycle, age and sex (derived, a tap always wins). The board
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
unlabelled → side → sublingual → flash (`PH_TONGUE_SHOT_RANK`). The tongue
photo viewer carries the tongue chips on every photo, Sublingual and Flash
as their own sections, past photos at the bottom. A face / build photo full
screen carries Find the Ren's own rows (Face · Eyes · Lips / Build · Skin ·
Muscles) and its spots as corners (her 2026-10-24 "b and c") [Photo spots as
corners + the photo's own chips full screen]. Compare and the viewer are
ONE mechanism each, wired into every surface that shows a photo tile.
The photo sheet has a Date field (today by default, never later): every photo on it saves under the date picked [Photo sheet: the date can be changed before saving]. **Never delete a photo** (her hard rule); the store asks the browser to keep
it (`phStoragePersist`), and backups carry photos.

## Fasting (her own clock)
Since 2026-10-25 (her 8 picks, mock `fasting-mock-2026-10-25.html`, BUILD-NOTES "Fasting: her own clock"): C22's fasting clock lives in LCM, only for her. Its data is in her Me row (`d.fasts`, merged entry by entry; no `e` = running; `fastGoal`), so both logins show it. A Fasting step on the record she names in My profile (ring, goal bar, Stop + Undo, Continue last fast, last 14 / 30 / 90 days by cycle phase, history), a line in the Me drawer, a toolbar chip on the Appointments page (computer only) and the fast drawn down today's column (solid to now, pale to the goal, a flag at the goal; a visit over it sits 10px in); the ⋯ menu has Fasting. C22's fasts come in once (Bring in). No cheer lines, no cycle advice.

## Meals + the Diet log
Since 2026-10-25 (her 12 picks, mock `diet-log-mock-2026-10-25.html`, BUILD-NOTES "Meals + the Diet log"): C22's meal prep lives in LCM. A Breakfast / Lunch / Dinner event of hers (`phMealSlot` reads the title) holds the meal planned for it: her usual one per meal, or that day's own ("↺ Every <meal>" back), prep ticks, ingredients (a tap = Shopping), one-tap **Had it** (the grid's ✓ IS Had it: band pill, fold chip, card; Undo) and "Something else"; the dish shows under the event. Data in her Me row (`d.dishes` = "My dishes" with nature warm · neutral · cool and nutrients per serve, `d.meals`, `d.shop`; merged entry by entry). The Me drawer has Today's meals (a tick per meal, water +1) and Shopping. **Every patient has a Diet page** under Log (`phDietPageHtml`): hers (the My profile record, else her signature name; a Me tag on her band) is the week filled from her meals (usual row, Mon–Sun, snacks · drinks, water dots, protein · iron · choline · vitamin C against C22's targets, warm · cool, a Week row; phone = a card a day); a patient's is their usual diet + days she notes (`rec.diet`, `phDietWrite`). Nutrients, nature and the week are worked out on read. Diet feeds Patterns (`diet_cool` / `diet_warm`, source Diet, DRAFT wording); Fang Bing Ren has no diet sign. Had it on today's Breakfast ends a running fast (Undo or unticking sets it running again).

## Trips (her travel)
Since 2026-10-25 (her 12 picks, mock `nanjing-trip-mock-2026-10-25.html`, BUILD-NOTES "Trips: her travel lives in LCM"): her work trips live in LCM; Nanjing is the first. Data in her Me row (`d.trips`, `d.tplan` plan rows, `d.tnotes` day notes; merged entry by entry, so both logins have it); a trip's to-dos are Me to-dos with `trip` + `g` (area) + `due` (days before she flies), their day worked out on read (`phTripTdDay`). Passport and policy numbers sync and stay hidden until Show numbers. **Her file:** a "Mine" rail group (Fasting + one step per trip) with ONE joined tab bar: Prepare (six area tiles + the to-do table; "Today" while she is away: day n, the hotel in Chinese + Driver card, today's plan, the day the clinic opens again) · Travel (flights, each end in its own clock; hotel; getting around) · Docs · Plan (a chip per day, rows, a note, photos) · Clinic (bookings on trip days with Move = the booking's own Edit, herbs that run out while away with Dispense, fertility Timeline items that open or close on a trip day with Open, "Message the N booked patients" into the one composer) · Guide (Nanjing only). **Calendar:** one band across the trip's days in the row above (day n of N, a red count of the bookings, a tap opens the trip), trip days striped in the trip colour, "<city> time" on the days after she flies, flights and plan rows drawn as her items (card: Open the trip), trip to-dos as tick chips on their due day, a red Away tag + red edge on a booking that falls on a trip day. **Me drawer:** Trips, trip to-dos tagged with the city ("by <day>", a tap opens the trip), the one-time Bring in from the old Nanjing app (IndexedDB `book33-nanjing`, read only; the c5-nanjing app is set aside, untouched). **+ then Me:** Trip (Name, From, To, City, a time zone filled from the city, Colour). Photos sit in her record's photo store (kind "other" + `trip` + `tday` / `tpart`), the one viewer opens them. A phone during a trip opens on its Today a moment after the app loads (only while still on Appointments with nothing open).

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
ones the app only works out: `phCxSignList`) sit under their body area's complaints,
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
`phTodayParts` and the Compass read it), and on a computer a "Scoring" bar (Today, then the
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
one too). The list stays open for the next tick (Esc / a tap elsewhere closes it), 8 rows then "Show all N",
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
right of the header (`phCxGlanceHtml`; "Now asking" went) with a gold bar under the header that fills
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
arches; Left Guan wiry) is always drawn under her ticks (`phPulseBase`; no toggle). One cell shows three inks over each other (her pick 2026-10-21): the normal pulse solid green (widest), last visit solid grey (middle, `.ph-pulse-prevl`, shown even when today is ticked), today blue (thinnest, blue-tint cell), with a legend Normal · Today · <date> over the chart. **The Pulse page since her 2026-10-24 picks**
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

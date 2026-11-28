# LCM Pharmacy — design rules (read before ANY UI change)
Also read ABOUT-ME.md before any work — build to this user's preferences.

**The five files (audited 2026-10-21; CURRENT-STATE.md split out 2026-10-28):**
- **CLAUDE.md** (this file) = the standing rules. Read it in full.
- **CURRENT-STATE.md** = what each part of the app is today, by area. Before changing a part, read its section in full.
- **BUILD-NOTES.md** = the dated build history (one section per build, from 2026-10-10). Before changing a feature, grep it for the feature's function names and read its note. **A new build note goes at the END of BUILD-NOTES.md, never in this file.** When a build changes a standing rule, fix that line here; when it changes what an area is today, fix that area's paragraph in CURRENT-STATE.md; both in the same commit.
- **STYLE-LCM.md** = the phone type scale (≤480px) only.
- **ABOUT-ME.md** = how she likes to work, and its **HER DESIGN PROFILE** (Exact · Simple · Efficient, her 2026-11-21): read it before designing or mocking. This repo is PUBLIC: nothing about her health, identity, family or chart goes in any file, comment or commit message here.
DESIGN-CONVENTIONS.md was merged into this file on 2026-10-21; its stub went to the Recycle Bin on 2026-10-27 (git history keeps it).
**The folder (tidy 2026-10-27):** the root holds the app (index.html, intake.html, chart.html, manifest.json,
chart.webmanifest, sw.js, icons/, screenshots/, supabase/, foods-au.json, eggs.html, eating-eggs.html, ninety-days-wide.mp4, ninety-days-poster.jpg), these docs, fang-bing-ren-questionnaire.html (kept on purpose, untracked), the September specs the code and memory point to
(CLINIKO-LETTERS, FACIAL-PARALYSIS-SPEC, INTAKE-LINK-FROM-HISTORY-SPEC, PHASE-VISITS-SPEC, SCRIPT-NAME-REVIEW, VISIT-NOTE-SPEC),
and only the mocks still being worked on. A mock, guide or audit named anywhere in these docs or the code lives in `mocks/`
under the same name once its work is live (move it there then). Data snapshots and app exports go in `backups/`, screenshots
in `shots/`, price lists and recordings in `refs/`. All four folders are local only (`.gitignore`; this repo is public).
**Never a real patient in anything committed (audit 2026-11-06, after real names were found in comments, docs and pictures):** no patient name, phone, address or health detail in a code comment, a doc, a commit message, a mock or a picture that is tracked; write "a patient" and use made-up names ("Test Patient", "Zz ...") in examples. A picture of a real record stays in `shots/`. An install picture holds no patient at all.
**When two lines disagree:** her newest word wins, then the ★ rules at the top of this file, then the rest of this file, then CURRENT-STATE.md, then STYLE-LCM.md, then BUILD-NOTES.md (history). When you find a disagreement, fix the losing line in the same commit.

# ★★★ THE LOOK — one design system (her 2026-11-18 "audit app rules to cement current and future coding to follow minimalistic organised design with consistent chip boxes and fonts")

**This section wins over every older size, weight, colour or chip line further down** (they keep the history; this keeps the rule). A new size, weight, colour or chip look needs her word first.

| | The rule | Where |
|---|---|---|
| **Font** | Inter only, words and numbers (print, the bottle label and monospace tokens kept apart) | Theme › Type |
| **Sizes** | Computer: **20** titles · **18** big numbers · **13** text, names, rows, chips, every box · **11.5** small notes · **10.5** capital labels. Phone: **16** · **13** · **11.5** · **11**. A glyph alone in a circle (‹ › ⋯ ⋮ ✎ ×) = the big-number size (18, 16 on a phone) | CSS "ONE TYPE SCALE"; STYLE-LCM |
| **Weights** | **400** text and typed values · **600** names, chips, buttons · **700** titles, big numbers, capital labels. Never 500, 800 or 900 (her pick "Three", 2026-11-18) | CSS "ONE CHIP LOOK + THREE WEIGHTS" |
| **Chip box** | ONE look for every chip, button, dropdown, box you type into and search box: **32px** tall (phone 28–32), **6px** corners, **white**, a **1px `--ph-line`**, **13px ink words at 600** (her pick "Semi-bold"; a typed value 400, 16px on a phone). Picked or the page's main action = **solid `--ph-herb`** (the Case colour on a Case page), white words, one main action a page. An icon alone = a 32px circle. One category = one joined bar (6px, segments edge to edge, a line between). | TAPPABLE THINGS; CSS "ONE CHIP LOOK" |
| **Colours** | Four: **ink, white, teal, red** (red = empty, short, overdue only). Any other colour is a data mark: a dot, a chart stroke, cycle flow and LH, formula / pattern family colours, the Case colour on a Case page, calendar blocks, All templates' groups, the Guide | "Shaded blocks, four colours" |
| **Surfaces** | The page standard (58px bar, one left edge, white card with a soft shadow, card titles on a pale band in teal capitals, search first on the tool row, filters a joined bar); a group of rows = one pale block; no box in a box; **no side line** (a dot or a tint) | "One page standard", "No line on the side" |
| **Terse** | Patient pages show the data and the controls only: no empty-state line ("Nothing ticked yet"), no how-to line ("Tap where it hurts"), no legend, caption, "why" note, source tag ("FBR", "Feeds Damp"; the one kept: Came in for's tappable FBR / Ren mark, her 2026-11-21 pick) or info dot; an empty section is its head and its Add; a Next button says only where it goes ("Tongue →"); a % stands alone (no "likely"). Her 2026-11-18 "i want it to only have essential elements and no annotations or instructions. more terse design". A new note or hint needs her word | CSS "TERSE PATIENT PAGES" |
| **Rows line up** | In a table or a grid of rows every box sits under its column head and on the row's one line: a cell's boxes never wrap to a second line, never stick out past the cell, and the boxes of one row share one middle. A box that opens under its row goes in its own sub-row (one cell across), never wrapped inside a cell. Fixed column widths (a `colgroup` or one grid template shared with the head row) for a table of controls. Her 2026-11-19 "the rows are disjointed" (Came in for) + "add to the code to ensure that for future builds" | style-audit.js `rowAlign` |
| **Not chips** | Rows, tiles, table cells, fold heads, stat tiles, calendar days and blocks keep their own size (tap-audit.js `KEEP` names each) | tap-audit.js |

**Never:** a 1.5px or 2px chip line; a deep-teal, navy or gold-deep fill on a picked chip; a pill or 10px-corner chip; bold (700) chip words; words in 500 / 800 / 900; plain text that taps; a size off the scale; a second font.

**How a build follows it:** write new CSS with the tokens (`--fs-*` sizes, `--ph-herb`, `--ph-line`, `--ph-ink`) and the weights above; never a one-off. **Done** = `.github/scripts/tap-audit.js` and `.github/scripts/style-audit.js` (plus `titlebar-audit.js` when the top bar changes) run at 1220–1280px and at 360px on every page the build touches, its panels and menus open: tap-audit's `off`, style-audit's `offSizes`, `offWeights`, `chipLooks`, `sideLines` and `rowAlign` are empty, or each line left is named in the build note with why (her word, a data colour, a locked page). The 2026-11-18 sweep (BUILD-NOTES "One chip look") names what it left. **A look is set at every width:** a rule written inside one `@media` leaves the other width on the old look (2026-11-24: pill boxes, 24px titles, deep-teal picked chips and 28px chips survived on a computer or a phone that way, found only by opening every page); a change to a shared token, class or look is checked with `.github/scripts/app-sweep.js` (every sidebar page and every patient page, three kinds of visit, at 1240 and at 360: its `left` list is empty or named, its `looks` list has one dominant look). The 2026-11-24 sweep (BUILD-NOTES "Whole-app audit") names what it left.

**The rule files on disk lag behind:** sessions commit with `git hash-object` / `update-index` and never touch the working copies, so the CLAUDE.md a new session loads can be days old (on 2026-11-18 it was 2026-11-06's). Read the rules with `git show session-a:CLAUDE.md` (and STYLE-LCM.md) before a UI change, and after committing either file write the committed copy back to disk (`git show HEAD:CLAUDE.md > CLAUDE.md`), so the next session starts from today's rules.


# ★★★ ONE APP, WELL INTEGRATED — standing rule (her 2026-10-10 "all builds and developments are integrative. the same information needs to present in all places that reference it ... i want this app to be integratively heavy"; restated in her 2026-10-21 audit ask)
> Every page reads the same facts from the same place. Applies to every build, every page.

1. **Find where the fact lives and what already draws it, and call that.** Never a second renderer, mini-chart, summary or wording of the same record. The one read for each: tongue `phTongueChartSvg` (best photo by `PH_TONGUE_SHOT_RANK`), abdomen `phAbdChartSvg`, pulse `phVisitPulseSummaryText` / `phVisitPulseDotsHtml`, today's findings in one line each, only what is not normal (Summary for her, Acupuncture's Findings, the Care Plan) `phFindingsRead(rec, name, "plain" | "short")`, dated findings `phVisitFndRead`, pain map `phPainMapHtml` / `phPmList`, current phase `phTpLivePhase`, today's plan `phTpPlanForToday`, Fang Bing Ren lead `phFbrRank` / `phFbrLeadOf`, ticked signs `phTriEffective`, complaints `phCcRibItems`, blood results `phBldList`, Watch / Aim `phTpFieldView`, Diagnosis / Goal `phTpAutoDx` / `phTpAutoGoal`, a pattern's concept picture `phPpHtml` / `phPpSvg` (`PH_PP`, one per pattern), a sign's picture `phKsSvgHtml` / `phKsThumbHtml` (one per sign), a patient record for drawing `phPatientPeek` (never the mutating `phPatientRec`).
2. **One write door per fact:** `phTriWrite` + `phTriSetYes` / `phTriSetNo` / `phTriClearYes` (signs and links), `phPmWrite` (pains), `phCcWrite` (Came in for), `phMskWrite`, `phTlWrite`, `phEnWrite`, `phCxWrite`, `phTngWrite`, `phHxConstitPulse` (pulse chart), `phRenPhotoPut` (photos), `phTpFieldCommit` + `phTpFieldPick` (Watch / Aim), `phTpFgWritePlan` (Diagnosis / Goal: the Care Plan’s editor and the Treatment strip’s fields). A new field on one of these records goes into its door's whitelist (`phPmWrite` silently drops unknown keys).
3. **Derived on read, never copied.** A value worked out from other data (auto Diagnosis / Goal / Watch / Aim; Fang Bing Ren pre-fills from charts, history, bloods, the intake form, pain words, food reactions, cycle, age and sex; Came in for from the pain map; a Medical history row named by Came in for (`phHxFromCc`, read inside `phHxVal`, so Fang Bing Ren follows; her untick saves a No); IVF scan bloods in Blood tests; timeline items from IVF history) is computed when drawn and never stored. Only her own taps and typing are saved, and **her own value always wins** over the derived one, with a way back to the auto wording (the quiet "Template’s words" / "Patterns’ words" chip by the field, her 2026-10-31 "edit where you read").
4. **Wire a new thing everywhere in one pass.** A new Fang Bing Ren formula, sign or clue = her code word **integrate33** (memory `feedback_integrate33_protocol`): add it, then wire it into the tongue / pulse / abdomen charts, Ask her, Medical history, bloods, cycle answers, Patterns, links and twins, the body chart and search aliases, with a matrix HTML of what was and was not wired. **Her synonyms are one sign (her 2026-11-25 "throat sensation / plum pit qi / mei he qi / foreign sensation in throat (all synonymous)"):** give the sign every name in `PH_BING_ALIAS` AND, for a name of several words, one phrase in `phSynPhrases` that turns them all into the same words (the throat sign's phrase reads all four as "throat lump"), so search, similar-wording and a case's words agree; never a second sign. Checklists: a new sign uses a subject in `PH_FBR_SUBJ_AREA` (and `PH_FBB_SUBJ`), a women-only one goes in `PH_SIGN_ONLY_F`, its twin in `PH_FBR_TWINS_DRAFT`; a new formula joins `PH_REN_FAM_GROUPS` (its colour shades itself); a new plan category follows the checklist in BUILD-NOTES "Dermatology plan category".
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
**Kept and flagged (her call):** Quick assess; Today's visit "Worth a look" data questions; the Treat step's Diagnosis list leading with the signs ticked for him (her 2026-11-24 "allow me to select the suggestions instead of prefil": the box stays empty, a tap on a ticked sign is her pick, nothing is written for her).
**Audit step 4 (2026-10-15, her "yes to 1-6"):** the last on-screen "e.g." went (the template manager's "Paste phases as JSON" hover text, the IVF "Egg collection cycle" option now "(eggs or embryos frozen)", the iron reference note now "such as"); the Ren photo popover reads "→ <type>" like its quiet tag (no "suggests"); placeholders are the field's name again (Medical history paste box "Referral, note or shorthand", the relocation notice hand-over line has its label only, the Journey message box "Message"); the relocation search box and the plan review's Tongue / Pulse / Abdomen boxes lost their emoji (icons are the sprite, never emoji).

<!-- ============================================================ -->
# ★★ TAPPABLE THINGS — standing rule (her 2026-10-14 "i dont like links, i prefer chips" + her 2026-10-15 audit: all 8 picks = the recommended option) ★★
<!-- ============================================================ -->
> Audit report with counts, pictures and the full lists: `chip-audit-2026-10-15.html`. Where an older line anywhere below
> (or in STYLE-LCM.md) defines a chip, button, link, corner or caption differently, **this rule wins**.

**Everything tappable is one of five shapes. Nothing else taps.**
**One size for all of them (her chip audit, 2026-10-23, applied app-wide by 2026-10-24; this line wins over any older size below):** **32px tall, 6px corners, a thin line, 13px text** (a search box too: 32px, 13px text, the search icon; her type scale 2026-11-18); picked = solid; **icon-only = a 32px circle**; one category's chips join into one bar. **Kept as they are:** stat tiles, rows and step rows over 52px, pulse chart cells, calendar days (Appointments' too: a booking's block, its height its time; a day's head; Today's date in a circle), the Appointments toolbar's tiles (an icon over its word). **The dark top bar too** (her 2026-10-27 "audit these chips size"): from 641px up every control in it is 32px, the page's main button included (icon only = a 32px circle, with words = the Button; the 44px disc is gone); the phone's bar stays 31px. Phone sizes: STYLE-LCM.md. Her "no" to the Zanda finish (2026-10-24) keeps circles, 6px corners and normal case.
**Measured, never eyeballed (her 2026-11-08 "check the files to prevent future chip sizes to deviate from what i want"):** `.github/scripts/tap-audit.js` measures every control on a page against this size (desktop: 32px tall, 6px corners, 13px text, a search too, icon-only a 32px circle, a joined bar 32px; the phone: 28-32px, 6px corners, 12.5px text and up, a field you type into 16px). **Every build that adds or changes a control runs it** (how: the script's head) on each page it touches, at 1220-1280px and at 360px, with that page's menus and boxes open and its side list open and folded; it
is done when `off` is empty. It measures sizes, not crowding, so look at the page too (2026-11-08: every control was the right size
while four table columns squeezed the words under them to 8px). A control that should keep its own size goes on the script's KEEP list in the same commit, with her word, never as a one-off. A new control takes an existing shape's class or its page's size block, never a height of its own; a rule written for what a box used to hold (a framed tab bar, a strip that scrolled sideways) is re-checked when what it holds changes (2026-11-08: the Guide's tabs became one Families ▾ dropdown and the old bar rules framed it twice and clipped its menu).
1. **Chip = pick.** 6px corners, 32px tall, 13px text (14px on a phone, STYLE-LCM's label size), 1px `--ph-line` line, white. Picked = solid `--ph-herb`, white text. One size everywhere.
2. **Button = act.** 6px corners, 32px, 13px bold, 1.5px `--ph-herb` line, white. ONE solid button per screen = the main step. An action is never an outlined pill.
3. **Dropdown = pick from many.** A chip ending ▾ that shows what is picked. **More than 6 options, or they wrap onto a second line at 375px = dropdown.** Several picks: ticks inside, the chip says "Build · 2" (picked answers may also show as chips under it). Stay chips: Mon–Sun toggles, calendars, stat strips, tab bars of 5 or fewer, the pulse brush bar.
4. **Field = a value you edit.** Faint tint (`--ph-herb-tint`), 6px corners, no outline. A number, supplier or note you tap to edit is a field, never bare text (Inventory stock, low-at, notes).
5. **Row = open something.** The whole row is the target, on a faint surface. A herb name or code in a list stays plain text inside its row (Dashboard, Inventory, Refill, To order).

**Menus** (sidebar, patient rail, tabs): each item a full-width row on a faint surface with its icon or number; the open item is filled. **The sidebar is five places** (her 2026-11-21 "less tabs, things in one place", stage 2 of simpler navigation): **Today** (Appointments) · **Patients** · **Guide** · **Herbs & stock** · **Me**, and nothing else; never put a sixth place or a page row back in it. One thing sits between Today and Patients and is not a place: the **Open patient** block (her 2026-11-26 "b, and put it under today row"), the patient file she last opened today (CURRENT-STATE "Sidebar"). A place with several pages shows them as ONE joined bar at the top of its own page (the app's `.ph-tng2-seg.wrap` chips, THE LOOK: 32px, 6px corners, 13px / 600, the open page solid `--ph-herb`, a count inside its chip): Patients = Patient profile · Communications · Intake review · Photos · Patient directory; Guide = Fang Bing Ren · Cases · Compare · Diagnostic tools; Herbs & stock = Dashboard · Inventory · Formula refill · To order · Stocktake · More ▾ (Stock statistics, Dispense history, Stock movements, Suppliers). A new page joins a place's bar (`PH_PLACES`), never the sidebar. The place row opens the page last used in that place on this device, except Herbs & stock, which always opens its Dashboard (her 2026-11-23 "when i press herbs and stock i want to see dashboard"). **Settings is ONE page** (her 2026-11-21 pick 4, stage 4 of simpler navigation) under the gear at the sidebar's foot: its sections are ONE joined bar in the page's title bar (Clinic · Prescriptions · Patients · Calendar (only while Me is on) · Data & device · Templates · Relocation; `phSetBarHtml`), a "Find a setting" box sits over the cards, and the old left column of group buttons is gone. Templates (the All templates page) and Relocation keep their own pages but show the same bar, so Settings, All templates and Relocation are ONE place (`phSetCur`, read from `activeTab`, like a place's bar). A new set-once setting is a card in `PH_SETTINGS_CARDS` (under its group), never a sidebar row or a ⋯ row. **The side bar, clearer (her pick "A", 2026-11-28, mock-sidebar-clearer; BUILD-NOTES "Side bar, clearer and quicker"):** its foot is the clinic, Settings and a named **Narrower / Wider** button, with no ⋯ (Back up, Restore, Bring in Acupreg and Install app are the card under Data & device). Narrow (70px, a computer), every icon has its name under it (Back, Today, Open file, Patients, Guide, Herbs, Me, the clinic, Settings, Wider). ONE **Back** sits in a fixed spot above the places, faint when there is nowhere to go, and returns to the exact page she was on (the wide bar says "Back to ..."). Today is home: the clinic's name opens it, and there is no second home button and no button that only shows on hover. A tapped place lights at once, then its page draws; widening opens in one step. Never an icon without its name in the narrow bar, or a second Back, without her word. **The patient rail is the teal band** (her picks 2026-11-02, rail-mock2 "C"; CURRENT-STATE "The teal rail"; crimson / navy on a Gynae / MSK Case, her same-day word): number circles on the steps (one line each; File has its icon), the open step = the light tint, a step's parts are a joined bar at the top of its page (a patient); her own record keeps an icon on every page row and groups that fold on a ▾ head until stage 3; the ‹ at its foot folds the rail to 56px icons. **On a computer a patient has no top row** (her 2026-11-17 picks, CURRENT-STATE "No top row on a computer"): the name, age · cycle day, red flag, saved alert and Book appt. · search · photo head the rail; Next up is a gold dot on its row; never a band, a This visit box or a Next up card back. **On a phone it is a drawer from the left** (her picks 2026-11-02, phone-rail mock A): one 44px bar at the foot of the head, "group · page ▾" + ‹ ›, opens it; never a strip of steps or a boxed tab row back.
**0–10 scores:** one joined bar of 11 cells, one tap. Never 11 separate chips.
**Chip rows for one category join into a bar** (her 2026-10-15 pick, the Tongue photo viewer chip audit; **confirmed as the standard 2026-10-16** — screenshot of the Abdomen exam's live Tension row, her words "i like this chip design. make this the standard for grouping chips"): chips from ONE category — whether she picks one or ticks several — sit edge to edge in a single pill-shaped segmented bar, no gaps, a 1px `--ph-line` divider between segments, the bar rounded only at its two ends (not each chip). Picked segment(s) fill solid `--ph-herb` (or the page's case colour, where one applies — Tension's screenshot was a gynae-case crimson page), white text, same as a lone chip. Where an option has its own meaningful colour (a `[key, label, hex]` triple — Tension's soft/medium/hard, Colour, Coat colour), draw it as a small round dot (`<i style="background:hex">`) inside the segment, same position picked or not — keep the dot, don't simplify it away. A gap only separates two DIFFERENT categories sharing one row (e.g. Coat's Thickness group vs its Colour group) — it never splits one category into loose chips with air between them. Applies wherever a chip row is really one pick/tick set (the Tongue analysis rows: Colour, Shape, Coat, Under, Marks; the "Which shot" row; the Abdomen Tension row) — not to a row of unrelated actions (footer buttons, Same as / Clear).
**NEVER:** underlined, dotted, arrowed OR PLAIN COLOURED text that taps; a tap target the same colour as the words beside it; a new chip size, corner or font size; a sentence under a control that explains it. A trailing › / → stays only where audit step 5 kept it (flow-wide "Next: ..." buttons, earlier / later pair, arrow-only buttons, data arrows).
**Why this exists:** audit step 5 (2026-10-15) fixed underlines and arrows but her words also banned plain coloured text, so 458 names, words and numbers (124 identical to the text beside them) and 155 button styles stayed unshaped; the chip rules disagreed (pill vs square vs 10px outlined vs "no outlines"), giving 36 chip looks on 25 screens.
**Fixed, 2026-10-18 (her screenshot of the Usual Period card's Flow/Clots/Pain rows + "fix it now")** — see the dated build note in BUILD-NOTES.md for the full writeup. Two corrections, both now standing: (1) a solid vertical line/bracket beside a chip-group's row label is a NO, same family as a border used where colour/space should separate instead; (2) one question's own options are ONE category and now join into a single bordered, no-gap bar — scoped to `.ph-pfw-opts`/`.ph-pfw-opt` (Usual period, meno/men's sets, Pain intake, any `presPfwSetHtml`-driven card). Find the Ren's Look rows join into bars too since her 2026-10-24 pick, which replaced her 2026-10-16 "loose individual pills".

**"Audit" = apply (her 2026-10-24, "when i asked for it to be audited, i wanted the rules to apply"):** an audit measures against these rules AND fixes every finding in the same pass, then reports before / after. Ask only where no rule covers a finding or a fix would undo a choice she made. Push still waits for "push live".
**Terse (her 2026-10-09 "not having explanation and instructions in app", widened 2026-10-15; this is the one wording):** no sentence on screen that explains what a thing is or how it works; a control is self-evident, or carries its affordance in a hover `title` / `aria-label`. Keep only a warning that stops a mistake (red flags, below-zero stock, a sign clash, the merge check, save failures), label text, data facts, and a legend that decodes a chart's own symbols (the pulse grid's △ / degree key). An empty state = two words + the chip that fills it ("No recipes" + [+ New recipe]). **Her 2026-11-25 "audit the whole app for terse wording reducing captions":** 68 sentences went to two or three words ("No suppliers", "All matched", "No match", "Nothing used", "Herbs off", "Enter grams"; BUILD-NOTES "Terse wording sweep" lists them); what stays is a warning that stops a mistake, a data fact and a legend that decodes a chart. A new empty state, note or caption is written that short from the start. **An empty page opens on its first action** (her 2026-10-29 audit pick, built 10/29–31): Blood tests on Attach the result, Photos on the camera tile + drop zone with the kinds under, IVF history with its fold and first round open.
**Life pages: one look, essentials only (her 2026-11-21 "apply this standard of simplicity and efficiency to all the pages in my profile"; Life = Work · Money · Code · Numbers & Stars · Trips).** Stat tiles fit ONE row at 1220 (at most 5): a number that a card below already shows is folded into that card's heading or a caption, never its own tile. No sentence under a card heading ("your sheet's formulas", "typed once, they repeat"): it is the heading's hover title. No colour legend, no empty card (Work's outcomes card is absent until a course has two scored visits). A set-once table (Money's Prices and rates) sits under ONE chip, closed, with a red "n unpriced" count when it needs her. Numbers & Stars stays the night sky and was audited with no change.

**My day pages: the same standard (her 2026-11-21 "apply this standard of simplicity and efficiency to all the pages in my profile", second place after Life; My day = Week · Meals · Fitness · Habits & routines · My valley).** A top row never carries a sentence: a hint that needs a tap is a chip in the bar (Week's red-tinted "n unpriced" chip opens Money's Prices chip and puts the cursor on the first price). Week's tiles are hours · patients · income · workouts (fasts and code are the week table's Fast and Code columns; the tiles share the row, so "27.75 / 27.75 h" is never cut). No legend row and no note under a table: the words ride as the table's hover title (Meals' had it / repeats / bold / fast / photo, Fitness' "booked on your Appointments"; Meals' Numbers and Try keep their colour keys, those are data). A graph she looks at weekly, not daily, sits under a closed chip with its numbers on the chip's line (Habits' "Votes ▾"). A card's source word ("from your watch", "on your record") is the card's hover title. The Fitness page's own text sizes are the scale tokens: a literal 10 / 11 / 12 / 12.5 / 14 / 15 / 17 px in a `.ph-fit` rule is a bug (it is --fs-10-5 / --fs-11-5 / --fs-13 / --fs-18), chips are 600, a set tick, ✎ and a star are 32px, the one-tap habit tick is 32px. **Habits and routines are ONE page, Habits & routines (her 2026-11-26 "merge habits and routines together onto same page. habits need ticking, routines dont"; made easier on her 2026-11-27 "Yes, build it"):** every planned day of a habit or a routine is a 32px round tick. Habits are ticked and carry a goal that grows My valley. A routine never NEEDS a tick (left alone it is a pale tick, still counts as kept and is never red), and a tap may record it. A tap records that day at once and opens a small box, Done | 2 min (habits) | Skip, with when it was done; a past day's time is never made up. Two views, Week and Arrange (rows changed where they sit); one pop-up edits either kind. Never split them back into two pages without her word. Week's open day (the timeline under a tapped day) folds her routines: three or more routines on that day become ONE chip "Routines ▾" with "n of m done" beside it, at the first routine's place; the rows sit behind it (`.rtg`), one tap away. Events, clinics, fasts, trips, health visits and the to-dos-done line stay as rows. **Fitness Week opens on Today (her 2026-11-22 "this is overwhelming to navigate"):** Today's exercise list, its add row, the felt-it row and the stars sit behind ONE chip "Exercises ▾" under the kinds row (`phFitExOpen`, `data-fit-exfold`, kept on the device in `lcm-fit-ex`; whatever she is working in, an open exercise, the picker, a timer or Workout Mode, keeps it open); the week table draws no row with nothing in it (a rehab row appears once a day has a tick or mark, Health once a visit is booked: Health is its own tab). Never bring the open list or the empty rows back without her word. **Fitness tabs: one view at a time (her 2026-11-22 "look through all the tabs and improve the visual display to be simple, sleek, cohesive"):** the inner bar reads Plan · Exercises · Health · Progress ("Week" renamed Plan, her place bar also says Week). Exercises is a joined bar Exercises · Templates · Muscles · Don'ts (`phFitXv`, `data-fit-xv`, kept in `lcm-fit-xv`): only the picked view is shown, the others are drawn and hidden; a muscle door opens Muscles. Progress draws no section with nothing in it, Goals empty reads "No goals", Upcoming shows 3 with an `All n` chip (`phFitUpAll`). The Booked row's clinic hours ride in the time's hover (a clash still shows). Never stack the four Exercises views on one page again. **Pilates is not a workout kind (her 2026-11-22 "i dont do pilates anymore, remove it"):** out of `PH_FIT_TYPES` and its tip; her past Pilates sessions stay in her record (never delete them), and a Pilates routine on her calendar would still list it. Never add it back without her word.

**Check myself pages: nothing repeats, notes fold (her 2026-11-21 "apply this standard of simplicity and efficiency to all the pages in my profile"; Check myself = Cycle · Tongue · Pulse · Abdomen · Fang Bing Ren · Diagnosis · Herbs).** The Tongue, Pulse and Abdomen pages draw the chart, its "Reads as" words and then a Visit table: that table appears only once there is an EARLIER visit to compare with (`phFvTableHtml` returns nothing for a lone Today row; no "Nothing earlier yet." line). The Tongue page's "From your Guide" notes (a dozen lines, the "+ my note" row) sit under ONE closed `details.ph-gd-fold` head carrying the count ("From your Guide · 12"); it stays open while she works (`phGdLnOpen`, view state only). Abdomen shows no empty "No photo" tile: the Add today's button stands alone until there is a photo. Diagnosis: a run of two or more "A hint" legend rows is ONE chip ("+ 3 hints" / "Hide hints", `ui.hintsOpen`; the cards below still list every pattern; a hint that is agreed or focused always shows), and the empty state is one sentence. These pages are the same code a patient's Exam and Diagnosis steps use, so a patient's pages follow. Cycle (tightened 2026-11-21), Herbs and Fang Bing Ren were audited and left (Fang Bing Ren is the funnel redesign's page; its height depends on the window).

**My file (her own record) pages: only what a patient's page has and she needs (her 2026-11-21 "apply this standard of simplicity and efficiency to all the pages in my profile"; My file = Details · Medical history · Ren · Log · Tests · Medicines · Photos · Messages · Appointments · IVF history).** These are the patient pages, drawn for her record with `phFastIsMe(name)`; every change below is gated on it, so a patient's page is exactly as it was. A patient-only action folds under one ⋯ (`phFileMoreHtml`, a native `<details class="ph-fmore">`, 32px circle, menu right-aligned on the phone), never gone. An empty column, an empty table head and a filter chip with nothing behind it are not drawn. Her Details cards sit as Contact + Care team down one side and Body down the other (no empty corner). Photos, Ren, IVF history and Messages were audited and left as they are (Photos' empty page is her own 2026-10-31 pick; Messages is a quiet chip already).

**Medical history folds what has nothing noted (her 2026-11-22 "do all three"; her record AND a patient's, same code `phHxBodyHtml`).** Once ANYTHING has been answered, the groups with nothing noted (no Yes / Don't know, no typed Other row, no group note, not the main complaint's group) sit under ONE closed bar at the foot of the columns: "Nothing noted · 3 groups · 1 still to ask" (rows still unasked). Open it and every group is there as before, ✓ All included. Its contents are fixed when she opens it (`phHxFold.keys`), so a group she ticks in does not jump out from under her; closing it and the next draw re-sort. A first history (nothing answered yet), Allergies only and Not needed never fold. The bar is the Guide folds' look (32px, 13px 700, ▸ / ▾). A new Yes anywhere (Came in for included) takes its group out of the bar. Data and every reader (Came in for, Summary, FBR, the band counts) are untouched: only what is drawn.

**Fang Bing Ren funnel: Bing, Ren, Fang (her 2026-11-16 picks, built 2026-11-22 after "do all three" under "My profile simplicity"; BUILD-NOTES "FBR funnel, built"; `phFbrFunnelHtml`, `phFbrCheckHtml`, `phClAskHtml`, `.ph-fn-*`, `.ph-fck-*`, `.ph-fbr-tbl`).** The page is the complaint chips + Search + a joined view bar **Columns · Steps · Table** (`phFbrView`, kept on this device in `daybook-ph-fbr-view`; no pick = Columns on a computer, Steps at 760px and under), then the funnel, then **All signs** (a closed fold, `phClAll`) holding the 10-area sign board. **Bing starts from the chief complaint** (her 2026-11-16 "bing is taken from patient chief complaint"): with no pick of her own `phFbrFocusOf` is the main complaint (the Everything chip is her own pick: it keeps "all" and opens All signs by itself, her 2026-11-18 word; a complaint chip closes it again); Today's Quick assess and Ask next follow it. **Columns** = Now (Bing) | Usually (Ren, with Ask next on top) | Fang (the shortlist, sticky), the Fang check across the top; **Steps** = a joined bar 1 Bing · 2 Ren · 3 Fang, one at a time, opening on the first part not done (`phFbrStep`); **Table** = Ask next, the shortlist as ranked bars (her 2026-11-24 "A bars, FIT only": one solid bar a formula in its own colour, the name inside, its fit % at the end, the length the fit; a tap filters, `.ph-fbr-rbar`; Bing / Ren / Key / Cases are on the formula's own Fang check card, never on the bar; a data mark, named in style-audit's `DATA_MARK`), the Fang check. **The shortlist** is at most eight formulas: a fit above zero, or a formula that counts the complaint (`focus.it.fams`), by fit then A–Z; every other formula is under **Others · N** (a flat list by fit, A–Z; the herb-family cards of 2026-10-12 are gone from the page). **The Fang check** (`phFbrCheckHtml`, only once a fit is above zero) = the top two side by side (her 2026-11-25 "1b", already how step 7 built it): the name, "N of M key signs" and ONLY the ticked key signs (the formula's five strongest, Bing and Ren pooled, a twin pair once, `phFbrKeySigns`; a tap goes through the same `data-cl-c` door), then **Rules out** (a negative-weight sign she ticked, and `PH_FBR_AVOID`). No fit bar, no unticked key signs, no "Only here", no case count: those live on the formula's own card. Her 2026-11-25 "2a": the Triangle card stays as its own thing beside the bars. Scoring, weights and the write door are unchanged (`phFbrRank`, `phFbrCeil`, `phTriSetYes`). The old lead line (top formula, Usually | Now switch) is gone; "Same as last time" sits on each side's head. Ask next stays four questions (her newer 2026-11-18 "too busy"), one per question: its Ren sign, else its Bing sign. A chip in a column is one line, long words cut with "…" (the full words are its hover title). The sign lines of a side are `phClHtml(…, mode)`; a topic chip carries its side (`data-ah="topic:i:d|p"`).
**Pictures over words (her 2026-10-23: "i want more visually succinct images/diagrams/animations/icons and less words"):** lead with an icon from the sprite, a small diagram (dots, rings, bars) and motion on a real change; a label or sub-line moves into the hover `title`. Mocks and questions to her follow it too (short option names, a picture each).
**The Guide is a Reading room (her 2026-11-25 pick: PA TCM's library look, option A, across the whole Guide; "Day files in the room"; her "Yes, add them" to these three rules):** from 641px the Guide sits in a walnut room, its top row a darker walnut band, (`.ph-gd-room` on its shell) lit by one still candle; each page's body is one parchment sheet; the Cases Shelf stands on the wall (brass plates, walnut planks, a lever-arch file a day in leather by day, a cream label AM over PM, a red ribbon on a marked half). **Orchard, the health pages' look (her 2026-11-26 "Switch to Orchard", option B of mock-health-garden-b.html; it replaced Eden in Bloom the same day):** from 641px, her own Meals, Fitness (all four views) and Habits & routines pages wear it (`body.ph-orch`, switched by `phOrchSync`, which looks at the page after every redraw: her own record + `presAssessTab` in `PH_ORCH_PAGES`; Week, Check myself, My file, Life and every patient keep the app's look; the phone too). Leaf green replaces teal there, the page and cards are warm cream, the side panel deep green with a fruit tree at its foot. A banner of hills and a fruit tree names the page with today's date (Habits & routines has its own banner, the valley itself). A habit she ticks and a finished day on the Fitness week are an orange, Today's column the sun's, an orange sits on the fasting ring and the macro bars are leaf green. On Habits & routines, goal bars stand where the old plants and leaf dots were, due and a reached goal are the sun's gold; red stays for missed days. The pictures are data marks, every control keeps THE LOOK's size and word; style-audit allows the leaf greens and the cream / sun on `ph-orch` pages only. **Diagnostics page (her 2026-11-26 "i like both a and b"; mock-guide-diagnostics.html):** the sidebar's and the top bar's Diagnostic tools open ONE page (`phGdDxHtml`, tab `dx`): six groups (Look and listen, Pulse, Touch, Tests, Acupuncture, Gynaecology, in `PH_DX_GROUPS`) as Contents (a row, a joined chip bar of its chapters) or a Shelf of books (`phGdDxView`, kept; a book is a drawing in the group's own solid colour, a book dimmed = nothing imported yet). A chapter is a page the app has (Tongue map, MTD, Pulse, Abdomen, Blood tests) or an IMPORT chapter (`dxi_*`: Shen Hammer, Doane MPD, Jimmy Chang, Abdominal diagnosis, Body mapping, Tung, Facial acupuncture, Apprenticeship = her course page, Gynaecology): her own file, imported once on this PC, kept in its IndexedDB (`dxi:<id>:<login>`), never in the code, the synced store or the cloud, shown whole in a closed frame (the MTD page's way, with a stand-in for the storage a closed frame lacks). A chapter's own name is typed with Rename and kept on this PC (`title`), never in the code. A new chapter = one row in `PH_DX_GROUPS`. **Abdomen chart: My view on the couch (her 2026-11-25; pick A of mock-abdomen-couch.html):** the exam page opens the chart as she sees it standing on the patient's LEFT (head to the right, feet left, `presAbdTurn`, `My view | Front`, kept in `lcm-abd-turn`), lying on an examination couch drawn round it (`.ph-abd-couch`: vinyl pad, stitched edge, steel legs, pillow at the head end, sheet at the feet; pure drawing, the real chart inside takes every tap). The small charts (Today, Summary, Check myself) stay as they were. Epigastric tenderness draws at the tip of the sternum, the xiphoid (`phAbdGTender` at `PH_ABD_XIPH_Y + 4`), not mid-place. **Tabs: ONE system, folder index tabs (her 2026-11-25 "these tables are confusing in terms of inconsistent tab colours and designs. use a library inspired system", pick A of mock-guide-tabs.html):** a bar that changes the PAGE or its VIEW is a tab at every level, one paper hue: the top bar's tabs stand on the walnut band (closed = tan, open = parchment with a brass edge, 34 / 42px), a page's views stand on the sheet (`.gd-tabs`, open = cream paper, 30 / 34px, on a rule), a small switch above a table is `.gd-tabs.sm` (open = white, the card's own, 26 / 29px). A toggle (Study / Edit, Combined / Bars / Table, Ren / Bing / Both, a sort, a filter) is NOT a tab and stays a segmented chip. A new bar of views takes `gd-tabs`; never a teal or wine tab in the room. The audits keep them by name (tap-audit KEEP, style-audit ROOM). (1) **One font, Inter, in the Guide too** (her later "keep the font consistent", which retired the serif she first picked for book spines and titles; her "yes" to this line). (2) **A dark wall behind the Guide only**, like Numbers & Stars: never a precedent for another page; the phone keeps the light Guide. (3) **The room's colours are data marks / pictures** (style-audit's `ROOM` / `ROOM_TEXT`): chips, buttons and boxes inside it keep THE LOOK. BUILD-NOTES "Reading room".
**Herbs & stock is a TCM pharmacy (her 2026-11-26: first "design a theme for a herbal apothecary", then "use these designs to improve the current tcm apothecary design. i noticed your designs keep missing the buttons and overall look of whoe page", her "Yes, send it" to mock-herbs-tcm-pharmacy-2026-11-26.html, "push live and update the rulebook"):** from 641px the nine Herbs & stock pages (`body.ph-apoth`) are a traditional Chinese pharmacy: the band a red-brown lacquer drawer wall with a gold edge and the slow warm glow (the one loop); the title a black signboard with gold letters in a red lacquer frame; the page bar lacquered drawers (paper label, brass ring pull that swings on hover; the open page slid out, its label moss; a count = a brass tag); the clinic bar blue-and-white porcelain jars on a lacquer ledge, a paper label in the clinic's colour (CBD forest green, Acupreg sage, Lotus red, All clinics amber), the picked jar's lid lifted aside with a gold ring; the main action moss with a brass rim, the ⋯ a brass knob; an abacus at the band's end; Inventory's stock filters one cream-painted chest of drawers, a picture of what is inside each; the shelves a lacquered cabinet (gold hairline, a black plaque with gold capitals, small porcelain jars on top, two hanging lamps); parchment pages, cards and table heads. Lotus's shelf is her own white cabinet. **Her word breaks the 32px chip rule inside this band only:** drawers 50px, jars 58px, the button and knob 38px; everything below the band keeps THE LOOK. Moves are one short move on a hover or a CHANGED pick (never on a redraw), the glow the one slow loop; none under reduced motion. The lacquer, gold, brass, paper, porcelain and pictures are data marks (style-audit allows them only while `ph-apoth` is on; tap-audit KEEP `.ph-apo-vt`, `.apo-d`; titlebar-audit skips `.apo-d`). The phone keeps the app's usual look, like the Reading room. Never a precedent for another page. BUILD-NOTES "Herbs & stock apothecary", "Apothecary chips", "Herbs & stock TCM pharmacy". **A pharmacy per clinic (her 2026-11-26 synth22: "sydney acupuncture logo is green and white and clinic looks like this, use these colours ... be consistent throughout the whole page", "do the same for lotus healing arts", "do the same for acupreg"; then "i just want a more modern feel to the cbd view and acupreg please. add animations and interactions where relevant", "build it and push"; mock-herbs-clinic-pharmacies-2026-11-26.html):** the clinic picked dresses the band and the page (`phThSync`, `body[data-ph-th]` = cbd / ac / pp). **Lotus** = the TCM pharmacy above in its own red, gold and honey wood (lotus band, red signboard with gold letters, honey-wood drawers and shelves, a red-and-gold abacus, cream pendants). **CBD** (white wall, the stone bench, timber slats at the band's foot, its logo green) and **Acupreg** (sage wall with a trailing vine, white joinery, warm timber, a plant on each shelf) are modern clinics (`ph-tcm-mod`): a plain title with the clinic's mark, ONE flat page bar with a sliding pill (`phThInd`), flat filter cards, open shelving with a thin timber edge; no ring pulls, lamps, abacus or signboard. **All clinics** keeps the red-brown lacquer. The main actions and picked chips take the clinic's colour on those pages; Lotus warnings stay white chips with a red mark. Motion: one short move on a hover or a CHANGED clinic or page (the pill glides, the look fades in, the mark springs, a bottle lifts, the vine stirs once), none under reduced motion. BUILD-NOTES "A pharmacy per clinic".
**File and the four visit steps are a medical binder (her 2026-11-27 pick "B · Front sheet" for File; her 2026-11-28 "make them as medical charts themed with the binder", pick "A · Chart form", for steps 1-4; her "Yes, update it" added this line):** on a computer, File and the steps 1 Came in for (Better / worse) · 2 Exam · 3 Diagnosis · 4 Treat sit in ONE lever-arch file, the spine in the same place on all five; a step's parts are its divider tabs, each page a chart sheet under a chart head (step number, Visit chart, Step · Part, Patient · Visit · Date), its own section heads numbered bands (never a new heading). The binder takes the brand colour of the visit's clinic (her 2026-11-28 "make the chart colours of files correspond to brand theme colors", picks "Clinic of the visit" + "Brand colour wins": CBD, Acupreg, Lotus; the app's teal with no clinic); a Gynae / MSK case colour stays on the rail. Her own record has no binder. Inside each sheet the page is unchanged (the Session grid stays LOCKED); the phone keeps a plain card (number and title only), and every button keeps the usual look (BUILD-NOTES "Patient details = a medical binder", "Visit steps = binder chart sheets", "Binder in the clinic's brand colour").
**The steps are the binder's top tabs (her 2026-11-28 "move the 1-4 to the chart tabs"; this wins over every rail line that lists them):** from
641px a patient's numbered steps are tabs on top of the binder, above the open step's dividers and in the same spot on every page; the rail keeps
its head and File. Came in for (one page) draws no divider under its tab. The phone keeps its rail drawer and ‹ ›; her own record keeps its rail.
**Draw her real things (her 2026-11-25 "i really like these visuals, it is realistic to my physical inventory ... do similar visuals for other things in the app", on the refill bench's supplier bottles and the Shelf view's lids and Black Pearl boxes; STANDING, every page):** a thing on screen looks like the thing in her hands: her supplier's real bottle, lid, jar or box (`phBtSvg`, `phBtLieSvg`, `.ph-lid.<supplier>`, `phPillBoxSvg`), the real app's mark for a door to it (Gmail for email), the real document for a record. Realistic and a little 3D (light from above, a shadow on the shelf), never generic clip-art or a bare database row where an object exists. The pictures are data marks; the controls around them keep THE LOOK. Motion stays one short move on a real change.
**A tick lights its area, a value sits on its bar (her 2026-10-31 picks, idea 5 of the 29 Oct audit):** where she ticks a sign the body figure beside it lights that area (Medical history and Ask her draw the same body: `phHxFigureHtml`, `phAhFigureHtml`); where a blood value is read on a line it is a dot on its low–high bar with the small number (`phBldBarHtml` on Blood tests, `phBldMiniHtml` on Findings and the Timeline), amber past the line, never a bare number.
**A send leaves its mark (her 2026-11-01 picks, idea 11 of the 29 Oct audit):** a Text / Messages / Copy / Email tap on the one composer writes one "sent today" entry on the patient (`phMsgSentMark`, the patient's contact log), closes that patient's due and overdue rows with Undo in the one toast, and leads the Messages band; the composer shows the plan's own groups + Herbs, the rest behind "All ▾" (`phMsgGroupsHtml`). Never a second mark store, never a row that keeps asking after she sent.
**Two folds from the app usage audit (her 2026-11-01 picks):** Communications is Due + one More ▾ chip (`phCommSectionStripHtml`): Compose · Templates · Prepared · Sent live in its menu with their counts, the open one shows beside Due, the page always opens on Due; never a fifth tab back in the strip. Supplements has no reference page: each kind's usual dose lives in Settings › Patients › Supplements (`phSuppKindUsual`; the table Kind · Usual dose · Shown · ✕ on her own kinds) and pre-fills a patient's row (`phSuppKindDose`, a product's dose first). A Settings table names its width floor as `.ph-vc-tbl.<own class>`: the shared 760px floor sits later in the source and outranks a single class.
**The data check's four rules (her 2026-11-01 picks, BUILD-NOTES "Data check"):** a batch's maker is worked out when drawn (`phRefillMaker`: the entry's own source, else the jar's, else In house) and the three make paths always record it; a review or check-in whose patient got new herbs after it is left out of Due on read (`phFuContactRows`), never written; one supplier code on two jars = Twin jars in Inventory's ⋯ (`phTwinPairs` / `phTwinMerge`: the keeper by rule, Undo in the one toast, the twin's name kept as `h.aka` and read by `findHerbByName`); Today's visit asks once for a missing sex, birth date or phone in Worth a look (`phTodayAskHtml`, the Patient details fields and handlers) and opens on that line for a patient without sex and birth date. The profile's Start here card stays the first ask.
**Screens follow the PA Coder foundation's order (Remove → Combine → Infer → Group → Collapse → Contextualise → Hide → Reveal) and its brief, polite tone.** (Its Communications section is message wording; this line gives screens the same restraint.)

**Superseded by this rule (the old lines were removed in the 2026-10-21 audit):** "ONE pill/chip style ... square outlined buttons", "Pill shape = something she PICKS", the 10/10 smoothing "outlined pill = everything else", audit step 5's "outlined pill, 10px corners" (its no-underline, no-arrow rules stand), and the retired DESIGN-CONVENTIONS.md "text links". Corners still follow the scale (6 / 10 / 16 / pill): a chip, button, dropdown or field is 6px; only an icon-only control is round.
**Build order (her go, 2026-10-15):** 1 this rule · 2 plain-text taps become rows / fields / chips · 3 chip walls become dropdowns and joined 0–10 bars · 4 explaining lines out. All four have been worked page by page since (live on `main`, audited 2026-10-18); a page not named in a BUILD-NOTES.md note may still be unconverted, so check that page in the live app before assuming.

<!-- ============================================================ -->
# ★★ A–Z LISTS — standing rule (her 2026-11-02 "things need to be listed in alphabetical order e.g. symptoms herbs formulas etc." + "lists - alphabetical, or where relevant, ascending order"; her 4 picks = the recommended option) ★★
<!-- ============================================================ -->
**Every list is A–Z; a list whose items have a natural order runs low → high.** Herbs, formulas, families, patterns, symptoms
and signs, foods, menus, patients, suppliers, funds, supplements, exercises, event presets, templates, letters, datalists and
dropdowns: A–Z. A new list is A–Z from its first build.
- **A scale keeps its scale, ascending** (her pick "Keep the scale"): light → heavy (Ren build), pale → dark (tongue, blood
  colour), cold → hot, soft → firm, weak → strong (pulse intensity), C5 → T1, Type 1 → Type 2. A food's sizes sit together under
  its name, small → large (kids · mini · small · regular · medium · large · extra large · family; quarter · half · whole).
- **Most-used shortcut lists are A–Z** (her pick "A–Z"): the cut (top 6 / 8 / 10) still picks by use; what it keeps shows A–Z.
- **Groups: the items A–Z, the headings stay** (her pick "Items A–Z, headings stay"): category, family, colour and meal order
  is fixed. Never sort PH_REN_FAM_GROUPS itself (its order sets each formula's colour shade): sort a copy.
- **Normal first, then A–Z** (her pick): a symptom list led by Normal / None keeps it first. In house leads a supplier list;
  Custom / Other / + New… stay last.
- **Kept as they are:** a rank keeps its rank and uses A–Z for ties only (FBR fit, Quick assess, body charts, Dashboard urgency,
  a search: starts-with matches first, then A–Z); time lists keep time order (prescriptions recent first, the Guide's tours oldest first (her 2026-11-14 "organise in chronological order for tours list", `phTcTourSort`), timelines, a cycle's
  days, Cycle & IVF messages, a course like Active treatment → In remission → Past → Monitoring); a document's own order (a
  letter's sections, a plan's phases, the Session grid, which is LOCKED); Stocktake opens in shelf order, A–Z is a view; the Guide's Herbs list opens A–Z with Most · Fewest formulas as her own view (her 2026-11-04 word).
- **How:** `phAz(a, b)` (Intl.Collator "en", base, numeric; skips a leading emoji or mark; đ → d) and `phAzBy(f)`; herbs
  `phByName`; foods `phFoodAz` (name, then size). Sort a copy (`.slice().sort(…)`), never a shared constant whose order means
  something (PH_SUPP_KINDS: first match wins). The audit that applied this, with every list changed and kept: BUILD-NOTES "A–Z lists".

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
| **1 Her file** | Patient details → Medical history → Ren → Supplements (rail: Medicines & supplements since 2026-11-20) → Blood tests (her reorder, 2026-10-18, swapping Medical history and Ren; Stress & sleep left this list 2026-10-13, see §3) | Set once, kept current |
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
  bar, then next visit / formula …; since 2026-10-29 each of those facts is a 32px door to its page, `.ph-tj-door`); the step bar is short (Ask 0/2 · Look 0/5 · Treat 0/3, the part to do now filled);
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
- **Ask her is no page since 2026-11-18: its questions are lines on Fang Bing Ren (her "simplify ask her page to merge with fang bing ren - because it feeds into it", then "make it even more simplistic"; picks "One line per area", "One or two words", Key signs + all other signs out).** Fang Bing Ren's Bing and Ren sides (the funnel, the paragraph "Fang Bing Ren funnel" in My profile simplicity) each = ONE line per area: the complaint's areas, Ask her's areas (the basics and any answered open, the rest under "More areas"); each line = its name, "n of N", a Normal chip (every sign in it No) and short chips. A tap writes the same Fang Bing Ren answer the old page did (`rec.tri` + `rec.askHer`). "askher" links lead to Fang Bing Ren. Every "Ask her" in a rail or Exam order below is history.
- **The exam pages since 2026-11-18 (her synth22, 9 asks + 12 picks, mock `mocks/synth22-exam-pages-2026-11-18.html`; BUILD-NOTES
  "synth22 exam pages"):** the Plans row shows on the Care Plan page only (`presTpPlanTabsHtml`); no tab row above the exam pages (the
  rail is the way between them); the way back to a patient file is the sidebar's **Open patient** block (her 2026-11-26
  "remove the bottom button": no floating "‹ name" chip, and Esc no longer reopens a file); Tongue is ONE top row since 2026-11-20 (her "improve view", 9
  picks: the chart · Today · Last · Flash · Flash last, one size, up to 300 x 400 and shrinking together to stay one row; the tabs and picks
  full width under it; no Past photos strip or trend line; never back to two halves without her word); Pulse = the chart, ONE description box (each position's words from the chart, hers win, `p.desc`) with Rate & rhythm as its
  last line, and the visits table one column a position (no SHPD notes, From your guide, picture or Summary / Rate / Note tabs);
  Musculoskeletal's panel = Diagnosis · Signs · Plan (the method bar Acupuncture · Motor · Electro · Cupping · Gua sha · Moxa, a
  point's method on the point, `pts[i].m`); Similar cases ranks by the signs she shares with the case ("n shared", the shared signs
  as chips, the case's shared lines tinted); Ren's look rows and today's weight sit on Today's visit under the complaint, open on a
  first visit, one line after (the same answers as the Ren page, which stays for the full board). Never bring back a plans row,
  an exam tab row or the Pulse page's notes without her word.
- **The visit summary card tops every visit (her 2026-11-20 "build all three", after a clinic's copy-forward notes):** `phVsumHtml` on the
  Better / worse step, read on draw from where each fact lives (phase, weeks or CD, next IVF date, next visit; Medicines, Allergies,
  History, Last scan, Care team, Last visit). It is her word for a summary card on the visit; the one-line Journey band stays retired.
- **Musculoskeletal is one step at a time (her 2026-11-19 "i dont like the long scroll on this page. help redesign it", after "this is
  too small for me to click - make it larger in the context of the whole page"; 8 picks, all the recommended one):** the 5-step bar
  (Pain · Palpate · Diagnosis · Points · Re-test) is the page's tabs, one screen a step (`phMskStep`, the host's `data-mk-step`; a
  page opened afresh starts on the first step not done; "Next: <step> ›" at a step's foot, none on Re-test, where the page's own
  foot button goes on). Pain = the body as tall as the screen allows (`--mk-figh`) beside the pains as ONE table (Area · Side · How
  long · Base · Last once there are any · Today · After · ★ · ✕; `phMskPainTblHtml`); Palpate = the muscle pictures on ONE row with a
  Surface | Deep switch (`phMskDgLayer`) beside the chips of the pain she is on (`phMskPickHtml`; the area card's Palpate · Move ·
  Tests); Diagnosis = one line a pain (`phMskDxTblHtml`) beside Diagnosis + Signs; Points = the picker over Plan; Re-test = the
  pains table. The view buttons are one row under the body. Every part stays on the page, hidden by step, so every tap keeps its
  handler. Never bring back the long page (every card open, both muscle rows) without her word.
- **Ask her came first after Today's visit (her 2026-10-23 "i need this page to appear sooner. after todays visit"; retired 2026-11-18, line above):** the
  rail lists Ask her, Tongue, Pulse, Abdomen, Musculoskeletal; the Next chain is Today's visit → Ask her → Cycle → Tongue → ...
- **Tongue, Pulse, Abdomen and Cycle are each their own page** (her pick,
  reversing the earlier one-card fold). Cycle has ONE home: its own page,
  reached from its Today's visit tile. No second Cycle tab. On HER own record
  (My profile) that one page sits in her Body group instead (One Me, 2026-10-26), and her
  Tongue, Pulse and Abdomen pages beside it (her 2026-11-03 "tongue and pulse tab?" + "Add Abdomen too"; no Care Plan needed).
- **The Review step is retired** — folded into Today's visit (strip + pain
  map + pain intake). Nothing lost, only repeats removed.
- **The patient rail since 2026-11-21 (her "the system looks so complicated. can you make it more simple and easy to navigate and organise? less
  tabs, things in one place", the mock `lcm_simpler_navigation_direction_mock`, every pick the recommended one; memory
  project_lcm_simpler_navigation_2026_11_21, stage 1 of 4; BUILD-NOTES "Simpler navigation, stage 1"):** a patient's rail is **4 numbered
  steps and File ›**: 1 Came in for (a return visit: Better / worse) · 2 Exam · 3 Diagnosis · 4 Treat, then **File ›** (no number) at the foot
  (at the TOP on a first visit and while sex or consent is missing, with the Start-here lock as today). **A step is ONE page.** Steps 2-4 and File
  carry a **joined bar of their parts** at the top of the page (`#presPartBar`, the app's wrapping joined bar `.ph-tng2-seg.wrap`, 32px chips,
  THE LOOK) and show the picked part's own page below it (every page body is unchanged). The parts: **Exam** = the kind's Exam order
  (`PH_VK_ORDER`: Tongue · Pulse · Abdomen · Cycle if tracked · Pain (Musculoskeletal) · Tests (Tests & scans) · History (Medical history) · Photos
  for internal disease), a sometimes page lighter (`.quiet`, `phVkQuiet`) and never counted, a ✓ on a part done; **Diagnosis** = Fang Bing Ren ·
  Similar cases · Diagnosis · Summary for her; **Treat** = Acupuncture · Herbs · Care Plan · Timeline (a fertility / pregnancy plan only) · Copy for
  Cliniko; **File** = two joined bars on one row, her file (Details · Medical history only when the kind's Exam does not list it · Ren · Usual ·
  Medicines · Checklist · IVF history) and the records (Log · Diet · Photos · Appointments · Cliniko visits · Messages · Notes · Visits). **A step
  opens on its first part not done** (never a quiet part, never the Care Plan or Timeline); **a part she picks stays picked for the open visit**
  (`presNavPick`, cleared by `presOpenScript`). The gold "next up" dot sits on the part's chip while its step is open, on the step's row while not.
  **Every id and old link keeps working**: `data-flow-go="pulse"` / `data-flow-prof="bloods"` / `data-pres-stage="dispense"` open the host step with
  that part picked (a part chip carries the SAME data-* attribute its old rail row did, so the click handlers, `presVisitNext`, the Next → buttons,
  the profile search `phPs*`, the head's "/ Page" and the phone's ‹ › all read it unchanged). The model is `presNavBuild` (it only
  regroups `presFlowSteps`' answer; `presFlowSteps` itself is unchanged). A **jump search** (`#presJs`, 32px, under the name) lists the parts of THIS
  patient by name or word (pulse · goals · tongue · herbs), A–Z, one tap opens that step + part, Esc clears; the content search in the head (phPs*)
  stays. The Fang Bing Ren page's own three-way switch hides (`.ph-fbr-switch`): the Diagnosis bar says the same. Her own record uses the SAME rail rows, bar, jump search and Next dot (stage 3, her 2026-11-21 pick 3): **four places, ONE page each** (`presNavBuildMe`):
  **My day** (Week · Meals · Fitness · Habits & routines · My valley; Me opens on Week, her 2026-11-23, over her 2026-11-03 Meals pick) · **Check myself** (Cycle · Tongue · Pulse · Abdomen · Fang Bing Ren · Diagnosis · Herbs;
  Tongue / Pulse / Abdomen tick when charted today; Next walks Abdomen → Fang Bing Ren → Diagnosis → Herbs) · **Life** (Work · Money · Home · People · Team (her colleagues, one list with Settings > Other practitioners; her 2026-11-27 pick "both": name badges + week table) · Review · Code · Numbers & Stars · a
  trip each; Money, Code and a trip she has not used are quiet chips, never a "More" row) · **My file** (Details · Medical history · Ren · Log · Tests · Medicines · Photos ·
  Messages · Appointments · IVF history). Rail rows are icon rows with no number (they are places, not a sequence); the old "Treat myself" 1-2-3 walk, the group
  captions and the fold rows are gone. Same pages, same ids, same old links. Never put a page in two places; never add a step without her word.
- **Timeline** (her picks 2026-10-13 and 2026-10-16): a part of Treat (after Care Plan), and in the Next walk, only on a Pregnancy / Natural fertility / IVF plan; no rail row, no "⋯ More" row for a patient.
- Other pages (Photos, Appointments, Messages, IVF history, Log, Checklist)
  are unchanged and sit outside this law. (Visit checks and the plan's
  Treatment log tab went on 2026-10-29: the Treatment tab's visits table is
  the one visit record, her pick.)
- **The complaints live on Today's visit only (her 2026-10-18 pick).** There
  the complaint compass (`phCxCardHtml`) is their card; a patient with no
  chief complaint on file gets the plain Came in for card instead. Patient
  details (hero + 3 cards) has no complaint card. A patient with no plan yet
  opens on Today's visit too (the no-plan gate went 2026-11-17, see §2).

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
**The chief complaint is picked from Fang Bing Ren, then given its nuance (her 2026-11-19 "i need the chief complaint to be picked from
fang bing ren, then i want to be able to add more nuance e.g. insomnia acute 1 week, insomnia chronic 10 years, MOTNI and light sleep";
her 4 picks, all the recommended one; BUILD-NOTES "Chief complaint: pick from Fang Bing Ren, then the nuance"):** in both Came in for
boxes the Bing signs come FIRST, the plainest (shortest) leading, and Enter picks the top one; **"+ Add "x" as typed"** is the quiet
LAST row. A picked chief complaint shows Fang Bing Ren's words, fixed (no Name box while `complaint.mainFbrKey` still matches its words).
The nuance is ONE free line per complaint, **More info** (`complaint.note`, `secondary[].note`; the cursor lands in it after a pick or
an add): never a second structured field for it. **Acute / Chronic is worked out from How long, never typed, never stored** (`phCcAc`:
under 3 months = Acute, 3 months or more = Chronic; `phCcRelAc` = "Chronic · 10 yr"). Every complaint row shows the nuance after its
name and Acute / Chronic · how long beside it (a phone: the nuance on its own line, whole, never cut to "..."). On a computer a
complaint's NAME opens its details under its row (`phCxEd`, `phCxEdRowHtml`: Name · More info · How long · ★ Main · Remove; a second
tap closes), because the side panel stays off on the simple visit. The first table, the details strip and the phone drawer keep THE
LOOK (32px boxes and chips, 6px corners).
**More info picks up Bing signs (her 2026-11-19 "the more info should be able to pickup bing signs"):** every More info box (the
first table's chief complaint and other complaints, a complaint's details on the visit card and phone drawer) lists the Bing signs
the words being typed match (the words after the last comma, "and" or "with"; both of two typed words, or two of three, must be in the
sign, so a loose word lists nothing), the complaint's own kind of sign first; Enter takes the top one, `Keep "x" as typed` is the quiet last row,
Esc or a tap away keeps her words. A pick ticks the sign Yes on Fang Bing Ren (`phCcSignYes`) and writes Fang Bing Ren's words in
place of the typed ones (no subject when it is the complaint's own), the cursor waiting after ", ". One write door for More info:
`phCcNiSave`. The list sits in the open visit page's fixed layer (#presPanel), never inside a card that clips. "MOTNI" reads as
"wakes in the night" everywhere words are read (`phSynPhrases`).
**Came in for is always a step, and its lists are BING only (her 2026-11-19 "where do i find her chief complaint and symptoms page",
"this is critical in the workflow", "the came in for row only uses treatment plan options. this should be only for bing"; BUILD-NOTES
"Came in for: a first-visit step, Bing-only lists"):** step 1 of every visit is the Came in for page: "Better / worse" on a return visit,
**"Came in for"** on a first visit (ticked once a chief complaint is on file; Next up while there is none). Never hide the page that
holds the chief complaint. Both Came in for boxes ("What brought her in?" and "+ Add") list **Bing signs only** (`phCcSecSignOptions`:
`PH_BING_SIGNS`, the best-scoring matches, no tongue or pulse finding): never a Care Plan type, never a Ren sign, nothing while the box
is empty; the signs come first and her own words are the quiet last row (the paragraph above). A picked sign is ticked Yes on Fang Bing Ren (`phCcSignYes`) and the chief complaint remembers
it (`complaint.mainFbrKey`, read only while the words are still that sign's). The Care Plan type is read from her words, changed on the
row's pill or in the Care Plan.
**Came in for in three parts (her 2026-11-19 "i cant see clearly whats main complaint and whats additional symptoms"; her 8 picks, all
the recommended one; memory project_lcm_came_in_for_three_parts_2026_11_19; BUILD-NOTES "Came in for in three parts"):** the table is
MAIN COMPLAINT (every starred complaint, her order, large on a soft tint of its area's colour, the area and how long under it, no Main
tag) · ALSO CAME IN FOR · n (her other complaints, her order, an area dot before each; "Complaints · n" when none is starred) · SIGNS TO
CHECK · n (by area under small grey area names, the areas in her complaints' order; a sign on the bar first; no SIGN tag; the subject small
and grey, the words with capitals; "+ n more signs" at its end, the caps as before). Gone · Better · Same · Worse is named over the signs
only (a wide card, from the next visit on). The asked order and the panel's Next follow the parts (`phCxModel` M.parts, `phCxPartsHtml`).
An area's "Same as last time" takes that area's signs only (`data-cx-rest="<area>|sx"`). The same three parts on a phone. Never mix her
complaints and the signs in one list again without her word.
**A complaint's symptoms sit under it (her 2026-11-21 "group some symptoms together e.g. bloating is the main complaint but secondary
incldues gas constipation"; her 8 picks; memory project_lcm_complaint_symptom_groups_2026_11_21; BUILD-NOTES "Symptom groups"):** each
complaint (Main and Also came in for alike) has its own symptoms as rows under it, a small grey elbow before each, the name, its How long (her synth22
2026-11-21) and, from the next visit on, Gone · Better · Same · Worse (no More info, no note); "+ symptom" under the group searches Fang Bing Ren
signs (one tap ticks the sign Yes and puts it there). A sign belongs to one complaint: the one she chose (`rec.ccTrack.sxGrp[signKey]` =
the complaint's row key, "-" = back to Signs to check), else the one it was added under or whose words it shares, else the FIRST
complaint of its body area (pre-filled, her pick 4; never a sign on the bar). Signs to check keeps the rest. To move one: a computer taps
the sign's name ("Goes with" chips under it); a phone taps its name (the drawer's "Goes with") or its ▾ (Under … / Back to Signs to
check). Grouped symptoms are never behind "+ n more". Copy for Cliniko and the visit summary add ", with Bowels (Constipation, Excessive
Flatulence) and Appetite (Poor)" to the complaint (one heading once). Never one score for a group (her pick 1: each tracks its own).
**How long, goals, Ren and the Fang Bing Ren mark on Came in for (her synth22 batch 2026-11-21, picks 4-7 of mock B, all the
recommended one; memory project_lcm_synth22_batch_2026_11_21; BUILD-NOTES "Came in for: how long, goals, Ren"):** a symptom under a
complaint has its own How long: the sign's own since date (`rec.tri.since`, the one the Acupuncture page and Fang Bing Ren read), shown
once she typed one (here: `rec.ccTrack.sxSinceSet[signKey]`; there: a date before the first visit); empty = a dashed "+ how long" chip in
the How long column that opens the symptom's details at How long (`phCxSxSince`, `phCxSxSinceWrite`). **Every row can carry a Goal**
(main, other complaints, pains, symptoms): a word, a % better range, a time in weeks or months, set on the row's details line (Goal ·
% better · In, before ★ Main / Goes with) and shown as ONE pale line under the row ("◎ Happiness · 30–50% better · in 1 month"); later
visits read "by 21 Dec · 2 wk left" (or "due today" / "was due …") and, on a scored complaint, "now 38% better ✓" (✓ when inside the
range). Stored `complaint.mainGoalTo` / `secondary[].goalTo` / a pain's `goalTo` / `ccTrack.sxGoal[signKey]` = { w, lo, hi, n, u, at }
(`at` = the day set; a new time restarts it); one write door `phCxGoalToWrite`. The older text Goal (`mainGoal`, `goal`, the Care
Plan's) is untouched. `phCcGoalLines(rec)` gives each goal as one line ("Happiness: 30–50% better by 21 Dec") for Copy for Cliniko
("Goals: …") and Summary for her. **Ren reads Came in for:** a Ren page sign (Energy, Build, Face, Skin, Lips, Eyes, Muscles) whose Bing
twin is a complaint's sign or a symptom she put under a complaint reads Yes on its Ren page, derived on read in `phTriEffectiveRaw`
(`phCxRenFromCc`), never stored, never over her own Ren answer (hover "From Came in for"). A Ren page pick shows under the complaint of
its subject by the existing grouping, marked "Ren". **The mark (her pick "See the ticks"; it overrides THE LOOK's "no source tag 'FBR'"
for this one place, her newer word):** a row ticked on Fang Bing Ren carries a small "FBR" (a Bing sign) or "Ren" (a Ren page sign)
tag, the app's Sign tag look, inside the name (`phCxFbmHtml`); a tap goes there (`phCxFbrJump`): a Ren page's step on a first visit,
else Fang Bing Ren Looking at the row's complaint, the sign's chip lit where it shows. **Shorter rows (her pick "Shorter rows" only):**
the Came in for table's complaint rows 36px, symptom rows 33px, "+ symptom" 36px (were 44 / 44 / 41); a long name still wraps whole,
never cut. Never bring the 44px rows back, cut a symptom's name to "…", or make a goal a separate proposal row, without her word.
**A complaint's details open under its row, a pain's with its body drawing (her 2026-11-19 "how do i add details to the chief complaint
or any complaints? ... where you add the visual pain diagram" + "keep it simple and simplified"; her pick B of three mocks
`shots/came-in-for-mock-*-2026-11-19.png`; memory project_lcm_came_in_for_details_body_2026_11_19; BUILD-NOTES "Came in for: details
under the row"):** on a wide card every complaint (the Main, her typed ones, every pain; not Energy, not a sign on the bar) has a 32px
round ▾ by its name; it (or the name) opens ONE line of details under the row, the label over each box: a pain = Side · Diagnosis · How
long · More info (the pain's own detail words) · ★ Main · Remove, with the Musculoskeletal page's front + back before it (this pain full
colour, the others faint; a tap on the body adds a pain there); a typed complaint = Name (not when it is Fang Bing Ren's words) · More
info · How long · ★ Main · Remove. Nothing open = just the list. The slider sits beside the name (the name column 320px at most) and
Progress is a column a visit (names 200px, 72px a visit, capitals), never the card's full width. Never move the body drawing back
behind a menu, or spread these over the card's width, without her word.
**Came in for on a computer is ONE table, Galcott's page her model (her 2026-11-19 "i like the galcot functionality where i can see
where i need to input data nad the essentials are show and the table format is very easy to see", pick A of
`mocks/better-worse-table-mock-2026-11-19.html`; then "audit so theres not too many different fonts - keep it simple" and "audit the
chips as well to keep it consistent with the app code"; memory project_lcm_better_worse_galcott_2026_11_19):** one header band (the
column names in capitals on the pale tint): Complaint · How long · First · Last · Today · Change · More info (a first visit: Complaint ·
How long · Today · More info). Main complaint / Also came in for / Signs to check are bands; Energy is a row (am · pm · ev, three boxes).
Where she types is a white 32px box on a shaded row (an empty score box has the colour's line): Today's score (Enter = the next box),
More info; Change is worked out from Last (a dot and Better / Same / Worse with the move, never typed); a sign is the app's joined bar
Gone · Better · Same · Worse. The ▾ by a name opens its details under the row. Two text sizes only (13, the capitals 10.5), weights
400 / 600 / 700; every box, chip and circle the app's own (32px, 6px corners, `.ph-tng2-seg` for the bar). No slider, no Progress
table, no ⋯ on a row in it; the chart opens from ⋯ › Chart only. A phone keeps its own list. Never bring the sliders or a second
type size back into it without her word.
**Today's visit is a steps table where the Ren card was open (her 2026-11-19 "this looks poorly designed. soo wide, no visual
workflow / i prefer table formats", pick B of `mocks/first-visit-table-mock-2026-11-19.html`; then "move the energy to the ren section
and merge it with the fang bing ren energy filtering diagnostics"; memory project_lcm_first_visit_tables_2026_11_19; BUILD-NOTES
"Today's visit steps table"):** **two columns, the page's full width (her 2026-11-19 "mock 2 column layout, audit the style color size to make it simple and has
good workflow", "Yes, build it"):** the steps down the left as one 240px list (number or ✓, name, answer), the step she is on beside it
(its title 18px), None / Next · (next step) moving down, no progress dashes (the list's ✓ is the progress); the steps are 1 Came in for
(Came in for's own box or table IS this step's page, flat, its own label hidden, empty or full; never above the card, never on another
step; its ✓ and answer show the moment a complaint saves), then REN: Energy (the day's
am · pm · ev 1-10 numbers over Fang Bing Ren's Energy signs, Good · Low · Listless · Weak after illness · Low, sunken pulse; the numbers
tick Low at 5 or under, Good at 8 or over, as before), Build, Face, Skin, Lips, Eyes, Muscles, then Weight. Energy is Ren's first row
everywhere (the Ren page's tabs too); while the steps table shows, the Came in for table has no Energy row of its own. A phone shows
the step first, the list under it. Folded (a return visit, or her tap) it is the one Ren line as before. Never bring back the
full-width Energy line or the tabs-only Ren card without her word.
**Her three patients: Herbs · Acu · musculoskeletal · Acu · internal disease (her 2026-11-18 three workflows, "sometimes i will suggest
herbs"; her 8 picks, all the recommended one; memory project_lcm_three_patient_types_2026_11_18; BUILD-NOTES "Her three patients"):**
the kind is READ, never stored (`phVisitKind`): a herbs-only booking (`phApptHerbsOnly`) = Herbs; any other booking, or none =
acupuncture, musculoskeletal when the booking says MUSCULOSKELETAL / MSK or `phMskApplies`, else internal disease. Her tap on the chip
under the name (`.g-vk`, `phVkChipHtml`) wins (`rec.visitKind`) until "Read from the booking". Each kind's Exam order is `PH_VK_ORDER`
(Herbs: Ask her · Medical history · Cycle · Tongue · Pulse · Abdomen · Musculoskeletal · Tests & scans; musculoskeletal: Musculoskeletal ·
Ask her · Cycle · history · tongue · pulse · abdomen · Tests & scans; internal disease: Ask her · Photos · Cycle · history · tongue ·
pulse · abdomen · musculoskeletal · Tests & scans). A page done only SOMETIMES (`phVkQuiet`: an acupuncture patient's history, tongue,
pulse, abdomen, and Musculoskeletal for internal disease; a herbs patient's Musculoskeletal unless a pain patient) is lighter (`.quiet`),
never counted (`phVkParts` for n of m, the Exam ✓, the Next-up walk, the Dispense note) and never Next (`phVkNextOf`). Medical history and Tests & scans (Photos too for internal disease) are Exam PARTS (grp "exam" in `presAssessSections`; the chips History · Tests · Photos in the Exam bar), out of File's bars; when the kind's Exam does not list Medical history it sits in File. Fang Bing
Ren lists Similar cases · Diagnosis · **Summary for her** (`phVsPageHtml`). Acupuncture patients' Treat bar starts with **Acupuncture**; a herbs patient has none (Fang Bing Ren → Herbs in the walk; the visits table is the part "Visits" in File's records bar). An acupuncture patient's Herbs is a **"+ Herbs"** part (Next stops after Acupuncture) until a formula is started (`phVkHasFormula`), then the part Herbs on every later visit. Never make a page
the same for all three kinds without her word; never count a sometimes page.
**Summary for her is a letter, not a form (her synth22 batch 2026-11-21, pick 10, mock F):** each part (What you came in for · What I
found · What it means · The plan) reads as its capitals label and bulleted lines in plain words, no grey box; a tap on a part opens it as
ONE box in place that grows with its lines (never scrolls inside) and closes back to the lines when she leaves it (her words saved for
that day, `rec.visitSum`, ↺ Fill again as before); an empty part is its label + "＋ Add". Complaints read with capitals (`phSymCase`) and
how long in words ("Periods: Irregular, Perimenopausal · 3 years", their symptoms' ", with ..."). The pulse is in the patient's words, only
the positions that are not plain normal ("Pulse: blocked at the right bladder / kidney position; weak at the left adrenal / reproductive
position", then "Other pulse positions normal"; `phVsPulseWords`, its own reader: a box of Normal, or a position's own normal quality at
its normal box, neither floating nor deep, is plain normal). The plan adds each Came in for goal (`phCcGoalLines`). The printed page,
Copy and Email read the same lines as bullets. Never bring the four grey boxes or the chart words ("R Upper Respiratory Tract, LI (Qi):
Normal") back to the patient's letter without her word.
**A Care Plan is an OPTION, never a step (her 2026-11-18 "i need to remove the requirement for a patient to have a treatment plan",
"it needs to be an option", "the highest priority is the fang bing ren tongue pulse abdomen etc"; her 8 picks, all the recommended
one; memory project_lcm_care_plan_optional_2026_11_18):** the visit is Came in for · Exam · Diagnosis · Treat, numbered; the Care Plan is one PART of Treat, never a step: the chip "+ Care Plan" until she starts one (it opens the builder at once), then "Care Plan", with Timeline after it on a fertility / pregnancy plan. **Next never goes to the Care Plan or its Timeline** (Diagnosis
→ Treatment), with or without a plan; `presVisitNext` walks the exam, Fang Bing Ren and Treatment for a patient with no plan too, and
Fang Bing Ren + Diagnosis are in the walk on return visits too (her "yes" the same day). Her two
doors to start one: the + Care Plan chip (the builder at once, no "Fang Bing Ren first") and the end of Diagnosis (`phTpFbrStartHtml`,
headed "Treatment Care Plan", never "Next"). No "No plan yet" anywhere: Appointments' list shows her Came in for words, Patient details
shows no plan line until one exists. Today's visit's "Care Plan ›" only with a plan. Never add a plan gate, nudge or numbered plan step.
This overrides the lines below where they say Care Plan step / "Fang Bing Ren first ›" / Next → Care Plan.
**The Treat step records the Diagnosis and the therapies, a Care Plan or not (her synth22 2026-11-24 "for acupuncture i look for diagnosis and a way to record my treatment therapies acu cupping etc" + "allow me to select the suggestions instead of prefil"; picks (a) and (c); BUILD-NOTES "Treat step"):** the Diagnosis box on the Treatment strip (and above the visit table when there is no plan) is EMPTY until she picks or types: it shows only her own words (`phVisitDxHers`, `rec.dxHers`; an open plan's field is kept in step by the one door `phVisitDxWrite`), never the patterns' words, and its list (`phDxmGroups`) leads with the signs ticked for him by body area ("Ticked · Chest & breathing", `phFbrTickRows`), then the body-area terms and TCM patterns; a pick adds to the words already there ("a; b"). Summary for her and Copy for Cliniko read the same words. Therapies are recorded every visit, a plan or not: A–Z chips Acupuncture · Cupping · Electro Stimulation · Gua Sha · Hua Tuo Jia Ji · Moxa · Press tags · Tui Na (`PH_TP_THERAPIES`), one note line under each ticked one (Left / Right only when text is already there), saved on the visit (`session.treatmentTherapies`). Never fill the Diagnosis box in for her again, and never gate the therapies on a plan, without her word.
**Condition first, the plan after Fang Bing Ren (her 2026-11-17 word, 8 picks
all A; it replaced the no-plan gate, decision 3 of 2026-09-11):** "i dont want
picking condition to be picking a treatment plan. i want treatment plan to be
only after picking condition and collecting fang bing ren history". **No gate:**
a patient with no plan opens on Today's visit like everyone with sex + consent in
(new or returning; Start here stays the one lock), Came in for on top. Every
visit page, Fang Bing Ren and Treatment work with no plan
(`presTpMainSections(name, null)`); Treatment logs with none, and starting the
plan files today's visit as its visit 1 (`phTpFileTodayVisits`). **ONE builder,
two doors:** `phTpDoorStartHtml` (the course from the condition, `phTpCourseFor`:
of the family's courses, the one whose words match hers, else its general one,
else its first, a man's Fertility = Men's fertility; How long from Came in for;
the Diagnosis Fang Bing Ren reads, shown before it starts; a joined **Course ▾**
listing every course at once, "Blank plan" when none fits) sits at the end of
Fang Bing Ren once a pattern is agreed (`phTpFbrStartHtml`, inside
`#presPatHost`) and on the Care Plan step (`phTpNoPlanCareHtml`: before Fang
Bing Ren is agreed, "Fang Bing Ren first ›" with a small "Start anyway").
Starting lands on the filled plan. IVF and Pregnancy still ask their questions
first. **A second condition, the same rule:** a Main ★ row in Came in for whose
plan type no running plan covers gets its own door there (`phTpOpenConcerns`;
also at the top of "+ New", which keeps the course cards). **Appointments never
pick a plan:** a booking with no plan shows Came in for, her words, on the card
(`phApptCcHtml`, saved by `phCcSetWords`, the file's own writer). **Never make
her choose the case first (her 2026-11-02 picks):** Came in for keeps HER words
(top row `+ "her words"`, types under it); the type is read from her words or
left empty; the pill never says plan ("Pain ▾", "Type ▾" when empty).
**Why:** Fang Bing Ren READS tongue, pulse, abdomen. It must come after
them. (The Oct 10 tab order put it before, so it opened empty on a first
visit. That is fixed by this law.)

**The Care Plan opens on its four parts (her synth22 2026-11-21: "care plans most important aspects: show patient complaint and goals /
show treatment selections / treatment duration nad frequency" + "and review date", "care plan needs to use the profiles collected info to
prefill"; her picks, all the recommended one; memory project_lcm_synth22_careplan_2026_11_21):** one white card under the band
(`phTp4Html`), a capitals label left of each part (over it on a phone): **1 Complaints & goals**, the Came in for rows read live (the main
first, how long, the latest score, its ◎ goal; three rows then "+ n"; a tap opens that row's details on Came in for, where the goal is set:
never a second goal store); **2 Treatments**, ONE joined bar A–Z (Acupuncture · Cupping · Diet · Electro · Gua sha · Herbs · Moxa ·
Supplements), pre-ticked on read from the visit (`phTp4ModsAuto`: Acupuncture from the visit kind, Herbs once a formula, a point method or a
visit / phase therapy on this plan), her taps saved only as overrides (`plan.mods`); **3 Duration & frequency**, one length bar (4 wk · 6 wk ·
3 mo · 6 mo · Other ▾) and one rate bar (1× a week · 2× a week · Fortnightly · Monthly), read from the course's dated squares until she
picks (`plan.len`, `plan.rate` = the grid's own rhythm keys); "n visits · to <date>" worked out; a second tap on her pick goes back to the
course's; **4 Review**, 4 weeks after the start (or the end when sooner) until she sets a date (`plan.reviewAt`); once due, a red-lined date,
**Reviewed** (`plan.reviewedAt`), a "Review" tag on the first booking on or after it (Appointments grid + list) and "Review due <date>" on the
visit summary card (`phVsumHtml`). Findings · Diagnosis · Watch · Session grid sit under ONE fold bar, unchanged inside (the grid stays
LOCKED), folded by default, remembered on the device (`lcm-tp4-rest`). Her picks here never rewrite the Session grid's phases. The one read
for other pages is `phTpKeyFour(name, plan?)` (plan defaults to `phTpShownPlan`). Never put a part of the four behind the fold, or the fold
on top, without her word.

**One "what I found" read, and Summary for her follows the Care Plan (her synth22 batch 2, 2026-11-21: "need findings of tongue
abdomen and all diagnostics used", "summary for her is the same as treatment plan"; her picks 1–4, all the recommended one; memory
project_lcm_synth22_careplan_2026_11_21):** `phFindingsRead(rec, name, mode, { parts })` is the ONE read of today's findings: Tongue,
Pulse, Abdomen, Cycle (a cycle-tracked patient: the day and phase), Pain (the pain store's today scores + positive tests) and Blood tests
(the newest value of each marker on a result under 12 months, out of its range), each from its exam's own read and ONLY what is not
normal (a plain normal pulse box, a medium abdomen, "no …" marks are left out). "plain" = her patient's words (the pulse is
`phVsPulseWords`, "tight below the right ribs"); "short" = one clinical line ("Pulse R Chi blocked; L Chi weak", Cun / Guan / Chi
positions, never the organ-zone dump). Acupuncture's Findings line is the short read (`phVisitFndLineHtml`; an exam done with nothing off
reads "Tongue normal"; Change is a 32px chip). Summary for her: What you came in for lists ALL the grouped symptoms ("complaint · how long, with a, b, c and d",
`phVsWithShort`, plain lower-case words; her 2026-11-24 "summary doesnt include all signs symptoms" replaced the first three and "+n"); What I found = the plain read, a line an exam, scans after
it, then the ticked signs BY BODY AREA, one line an area ("Head, mind & sleep: light (Sleep), wakes at 3 am (Sleep)", the area names of `PH_FBR_AREAS`, A–Z inside; her 2026-11-25 "b and c"): signs the complaint's symptoms already name are left out, so are Tongue & pulse (the exam lines say them) and Sex / Age facts. **On screen the first five signs show, then a "+ n more" chip** (`phVsViewHtml`, `phVsAllOpen`); the text, print, Copy and Email always carry every sign; What it means = the Diagnosis (her own Diagnosis words, else its agreed / Likely patterns, the main one first; Possible only when
nothing is Likely); The plan = the Care Plan's four parts (`phTpKeyFour`: "Acupuncture and herbs, weekly for 3 months", "Review on 19
December", "Goal: …"), then the Came in for goals (`phCcGoalLines`), one line a goal word (never twice). With no Care Plan it says what
it said before. Never a second findings reader on a page; a new page that lists findings calls this one.

## 3 · How often each page repeats
| Page | Rule |
|---|---|
| Patient details | Once. **Sex + consent gate the rest** (`phPfGate`; her 2026-11-26 "change it to so the dob doesnt block the file anymore - replace it with consent", then "yes change to sex and consent"). **Past patients count as consented; only new patients need the intake form** (her 2026-11-27 "make it a rule that al past patients have consented and new ones are hte ones that require consent"): past = a booking, logged visit or herb sale dated before 2026-11-27 (`phPfPastPt`, the fixed day `PH_CONSENT_FROM`), read on draw, no consent or date ever written for them. A new patient's consent = the intake form's `rec.consent.on`; her own file needs none. The Start-here card asks Sex, Date of birth (never a lock) and shows Consent: On file, Past patient, or No consent + Send intake link. Never lock a past patient's file for consent. A date of birth still feeds what needs an age. **The page holds what every patient has** (her 2026-10-30 pick): name, sex, DOB, phone, email, body; the partner, the addresses and the health fund are entered where they are read (IVF history's head, a booking's Delivery step, Compose's rebate list) and the page only says what is on file, one grey line, each part a door. The ring counts seven. **The IVF | Off switch** (her 2026-11-21 "toggle off for ivf related questions", picks A; `phIvfOn`, `rec.ivfOn`) sits beside F / M: Off hides the IVF history page, the IVF clinic row, the visit summary's IVF lines and the intake link's IVF / trying-to-conceive questions; nothing saved goes, On brings it back. Unset = worked out: on with an IVF round, an IVF plan or a Fertility complaint (a man: a partner link or a semen analysis); a woman 55 and over off; a man off. Her tap always wins. Never back to IVF history for every woman without her word. |
| Ren | Once. (She skipped the "photos ~3 months old" nudge in Phase 4: none.) **The Ren page is Find the Ren + one search row** (her 2026-10-29 audit picks): the 319-sign board stays folded until she types, picks an area or taps Signs ›; open = the lead family first, Open signs, 32 px rows; the panel on this tab = the figure alone; no photo = a "+ Face" chip, never an empty tile. CURRENT-STATE "The Ren page board". |
| Medical history | Once. One tap "Anything new since <date>?" on Today's visit EVERY return visit (Phase 4). |
| Stress & sleep | **No page any more (her pick A, 2026-10-13, `stress-sleep-audit-2026-10-13.html`).** It was "asked once for EVERY patient"; it now lives on **Ask her** (every visit, Usually and Right now): the Sleep topic gained *Hard to fall asleep* and *Wakes in the night or very early*, the Mood topic gained *Low, flat or tearful* and is now always shown. Each answer ticks a new Fang Bing Ren sign (`sleep_onset_hard`, `sleep_wakes`, `mood_low` + `_tend` twins) that makes the Patterns clue `sl_hard` / `sl_wake` / `low_mood`; tapping "hard to fall asleep" or "wakes" also shows the broad sleep sign pre-ticked (`PH_TRI_IMPLIED_BY`). The Energy grid and throat lump were not carried over (Energy is on Today's visit and Fang Bing Ren; throat lump is already a Fang Bing Ren sign). Answers saved before still count and still pre-tick (`PH_PFW_RETIRED`). The mood question on the men's page and the Change of life "Sleep and mood" question went with it. |
| Supplements | Confirm every return visit with one tap "Same as last time" / "Changed" on Today's visit (one "Still the same? · Nothing new" line with the history check when both are due, her 2026-10-29 pick) (the Supplements page is a checklist table since 2026-10-29, CURRENT-STATE "Supplements"). |
| Blood tests | When a new result arrives: the page opens on **Attach the result** (a photo or a PDF, filed with the photos as "Blood test") beside Paste the report; one table of the markers that count, the values typed in the new column; the rules table lives in the Guide (her 2026-10-29 picks, CURRENT-STATE "Blood tests"). Each result shows its age ("9 months old"); a result **over 12 months old** is still listed and dated but marked "not counted" and gives Fang Bing Ren no clue (`PH_BLD_OLD_DAYS`, `phBldIsOld`). |
| Complaint compass, Cycle, Tongue, Pulse, Abdomen | Every visit (Cycle while on). |
| Fang Bing Ren | Recalculated live on every render, never stored; only her Agree / Not this patient taps are saved. |
| Treatment Care Plan | Built after Fang Bing Ren; reviewed at the end of each phase. **Plans close themselves** (her 2026-10-29 picks): the last planned visit asks once (Close plan · Stay N more, and what happens untouched); the plan closes itself the day after its last visit when nothing more is booked, and a later booking reopens it with N more visits (Undo holds). Cycle plans run a course of cycles from the concern's How long (Weeks 1 · Months 3 · 6–12 months 6 · 1–3 years 12) and ask Close plan · Another cycle on the last cycle's late days; IVF ends at the pregnancy test (positive → Start Pregnancy plan · Keep this plan; negative → Another cycle · Close plan). CURRENT-STATE "Plans close themselves". |
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
- IVF history's 6–7 wk scan (one fact on the transfer: `t.hbDate` + `t.hbSeen`, written only there, 2026-11-02) → the Timeline's
  Heartbeat row, the Pregnancy plan's Dating scan, Today's visit's door; every page reads it through `phIvfHbOf` / `phIvfHbScan`,
  never its own copy.
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
sex + consent Start-here lock (past patients count as consented, §3; with its "Later, open it anyway" override).

## 7 · Naming
"Plan" becomes **Treatment Care Plan** everywhere in the app (rail, tab,
headers, buttons, popups). Patient letters and messages are NOT touched. If the
rail text cuts off at 360px, only the rail may use "Care Plan" — and tell her.
Never call it "Treatment plan", "Plan tab" or bare "Plan" in new UI text.
**The rail's numbered steps (her 2026-11-21 simpler navigation, stage 1):** 1 Came in for (Better / worse) · 2 Exam · 3 Diagnosis · 4 Treat, then File ›; the old Treatment / Herbs / Care Plan / Copy for Cliniko steps are the parts of Treat. Her yes covers the rail's "Care Plan" and "Herbs" as PARTS; other UI text keeps the rule above.

## 8 · Build phases — all built and LIVE
Phases 0-6 were built on 2026-10-10 and confirmed on `origin/main` 2026-10-18 (the phase table was folded on
2026-10-25; its detail is in git history). What they left that still holds:
- **Landing:** a return patient (a visit within 12 months, sex + consent, one plan or a booked one:
  `presStagePlanAutoOpen`) opens on Today's visit; anyone else opens on the profile.
- **Next walk** (`presVisitNext`): first visit = file gaps → exam → Fang Bing Ren → Care Plan → Treatment →
  Dispense; return visit = exam first, file gaps after. **Since 2026-11-18 (her "yes", Fang Bing Ren her highest priority) Fang Bing
  Ren and Diagnosis are steps on EVERY visit, return visits with a plan too, and the Care Plan never is** (a tap on its row; the
  one-line glances, `phGlanceHtml`, stay on Today's visit); Dispense only when herbs; a skip is memory only (`presUpSkip`). The gold
  Up next card is gone (2026-10-14).
- **Worth a look** (`phTodayNudgesHtml`, return visits): supplements Same / Changed (`rec.suppSeenAt`), history
  "Anything new since <date>?" (`rec.hxSeenAt`); both due = ONE line, "Still the same?" Nothing new · Changed (her 2026-10-29 pick 6).
- **Herbs at the start of a visit** (her 2026-11-19 "signal at the start of the session whether patient has finished herbs, continuing,
  or stopping herbs", her 8 picks of `mocks/herbs-start-of-visit-mock-2026-11-19.html`): anyone dispensed herbs before today gets ONE
  answer, Finished · Continuing · Stopping, as the first line of the visit AND a chip under the name (the same answer, `rec.herbsSay`
  by day, one door `phHbsWrite`), pre-picked from the last dispense's run-out day. Finished = Herbs stays the visit's step; Continuing
  = Herbs ticked as still taking (Treatment's Still taking is this same answer); Stopping = no Herbs today and no run-out reminder for
  those herbs. No reason asked. Never a second store for it.
- **The Diagnosis list is in groups** (her 2026-11-20 "formulas dont need to be in the diagnosis dropdown. give the dropdown organised
  categories", pick "Body area + TCM patterns"): every Diagnosis box (`data-dxm="cc"` Came in for + the Treatment focus, `"pm"` a pain's)
  opens ONE list, `phDxmPaint` (`.ph-dxm`, its own class: never `.ph-ni-menu`, whose capture handlers would eat it): the musculoskeletal
  terms by body area (`PH_DXM_AREAS`, read from the words), then for cc the TCM patterns (`PH_PAT_DEFS`). **No formula in it.** Letters at
  the start of a word win; Enter / a tap writes through the box's own change handler. A new term joins its area by itself; one no area
  claims lands in "Whole body".
- **Low with a sunken pulse is never a chip or a question** (her 2026-11-20 "this doesnt need sunken pulse sign"): `PH_NQ_NEVER`; Low +
  a sunken or weak pulse still ticks it for Fang Bing Ren.
- **Acupreg's colour is a deeper sage, #4E7A63** (her 2026-11-20 "the green and the white doesnt work well", pick "Everywhere but
  calendar blocks"): white on it 4.9:1; the sidebar's quiet words are 95-97% white mixes of it (4.5:1 or more). Her #8AAB99 stays only on
  Acupreg's calendar blocks (`PH_ACUPREG_COLOUR`).
- **The Pulse page: the box first, then its qualities** (her 2026-11-21 synth22: "i select normal and soft, tagged the right cun,
  then untapped the soft, and tagged the guan but the drawing is not what i want. and why are the pulses missing sometimes when i
  tap", "i often think in the order of: pulse depth, and width/tecture first ... i forget the settings of the first column", "the
  normal pulses are not supposed to appear - its supposed to only be toggled on and off"; her pick "box first, and each column
  charting gets a reset/refresh" + "Only the guide line"; memory project_lcm_synth22_batch_2026_11_21): a tap PICKS a box (its row is
  the depth; outlined + tinted, its name over the rows, "R Cun · Qi", `phPulseSelName`), and the four quality rows (each its usual
  picks, the rest under its More ▾, no tabs) show and change THAT box only: a chip is lit when the box holds it, a tap adds or takes
  off that one quality (`phPulseCellToggle`: one strength, one width a box). The next box starts from its own contents. A tap on the
  picked box, or Esc, lets it go; picking writes nothing; a quality tap with no box picked does nothing. ✕ Erase clears a tapped box.
  **Nothing writes a Normal but her own tap or "All as normal"** (the 11/20 first-tap fill and the stamp-all-lit tap are gone), and the
  key's **Normal chip hides only the faint dashed guide**; her charted marks, Normal too, always draw (the chart and ▶ Play). A
  position's own normal pulse at its normal depth is no Fang Bing Ren sign (`phPulseTplAt` in `phFbrPulseWords`). The chart opens
  still every time (▶ Play moves it). Each position's words say depth against its own normal depth (`phPulsePosWords`). No FBR
  underline on a chip. Right and Left stack when narrow, never a sideways scrollbar. Never bring back the box popup, the lit-brush
  painting, a Normal written by itself or the quality tabs without her word.
- **Findings:** `phExamMirrorToday`'s known edge: a part cleared after it was mirrored stays in that day's dated copy.
- **Left on purpose:** the stored default plan title "New treatment plan" (code compares to it); letters, printed
  plan records and message templates keep "treatment plan".
A new phase-sized change: build in the sandbox, show her, check 360px + desktop, push only on her "push live".

<!-- ===================== END OF THE LAW ====================== -->
This is a single-page web app: **desktop leads, the phone covers the
essentials** (see the PA Coder foundation, below). It must always look clean, symmetrical, aligned,
organized, calm, sleek and minimal. Follow every rule, then re-check your work.

**Standing preference, every build: terse, succinct wording and a sleek,
minimal design, by default — cut filler, don't pad.** Applies to everything
she reads herself: screen headers, labels, button text, audit/diagnostic
write-ups, mock captions, status messages, Claude's own replies to her — not
just Communications' patient-facing tone (foundation, Communications), which is a stricter,
separate spec for what actually leaves the clinic in her name ("polite but
brief, never blunt"). Visually, prefer fewer elements over more — one line
over two, one colour system over several stacked, a single merged widget over
several small ones nearby (see "Remove → Combine → Infer → Group → Collapse
→ Contextualise → Hide → Reveal" in the PA Coder foundation) — restraint is the
default, not an afterthought pass at the end.

**No how-to text on screen:** the one wording is "Terse" under TAPPABLE
THINGS at the top.

**Cliniko → LCM, one place (her 2026-11-20 pick B, "ok, b", then "i use heidi transcribing to note take. but i need that
information organised into lcm so i can see things visually"):** `cliniko-copy.html` holds the "LCM · Copy from Cliniko" bookmark; on a
Cliniko patient it reads the details, the Cliniq intake answers and every treatment note (Heidi's notes are Cliniko notes) and copies one
JSON. Intake review › Paste from Cliniko (or Ctrl+V outside a box) opens her usual intake review: blanks fill, a different answer on
file is her pick, nothing of hers is overwritten. The patient's Records › **Cliniko visits** page = ONE table, a column a visit (latest 8),
rows Came in for · each sign Heidi wrote (A–Z) · Tongue · Pulse · Abdomen · Looks · Diagnosis · Points · Herbs · Plan; older visits one line
each (20 kept). Never store the full note text (the origin's about 5 MB is shared). No patient data ever in the bookmark page or the code.

**Saturdays are Lotus Healing Arts (her word 2026-11-20, "sat is for lotus healing arts", on a Saturday of CBD blocks tagged
"CBD"):** the clinic a weekday is at overrides the login's: `phDayClin(dateKey)` (shared Me row `hubset.dayClin`, default
`{6: "Lotus Healing Arts"}`, set at Hub › Money's rates "Saturdays at"). That day's bookings, from either login, carry its tag ("Lotus") and, on its calendar blocks, Lotus's own red #B02C2E (`PH_LOTUS_COLOUR`, her 2026-11-21 "lotus is red like"; never Acupreg's sage on that day);
the Hub counts that day as its own clinic (hours, its own income tile at the visit prices, never the CBD split or a CBD admin week).
Acupreg's booking on such a day never offers "Open in Acupreg" (her 2026-11-21 "dont open nikki in acupreg"): its card shows Profile,
her file in THIS login, when this login has her (`phOthStays`; `phOthOpen` refuses it too). A Friday's Acupreg booking still opens there.

**The Potts Point shelf (her 2026-11-21 "track a separate inventory for potts point because i work there on saturdays"; her 4 picks
of `mocks/potts-shelf-mock-2026-11-21-*.png`, all the recommended one):** `h.qtyPP` = a herb's grams at Potts Point, only for a herb she
moved there (⋮ › Move to Potts Point, or a number typed in its Potts Pt cell; empty takes it off); `h.qty` stays CBD's and is the only count
orders (they arrive at CBD), low lists, the Dashboard and Stocktake read. A dispense on a day at another clinic (`phDayClin`, Saturday)
takes from Potts Point for a herb kept there (Take from CBD · Potts Point on the step, this open only), and its undo puts the grams back on
the same shelf (`deducted[].shelf`, `phShelfAdd`). Low is per shelf: Potts Point under 50 g is its own red dot (`PH_PP_LOW`). Never one
count for both shelves, never a second login for Potts Point.
**Acupreg is a third shelf (her 2026-11-21 "remove the acupreg separate login ... manage acupreg inventory same as potts point in one place"; widget `lcm_one_login_places_mock`, her 4 picks; memory project_lcm_one_login_places_2026_11_21):** `h.qtyAC` (+ `h.lowAC`, its own refill line, else 50 g) beside `h.qtyPP`; `PH_SHELVES` holds the three (cbd = `h.qty`, ac, pp), `phShelfOf` / `phShelfQty` / `phShelfLow` / `phShelfAdd` take a shelf, never `"pp"` tests; a day takes from its shelf (`phDayShelf`: Saturday Potts Point, Friday Acupreg once any herb is kept there, else CBD); Move goes any shelf to any shelf; a dispense records `deducted[].shelf`. **Bring in Acupreg** (Settings › Data & device, CBD login only; `phAcMoveIn`, `window.__lcmReadOther`) reads the Acupreg login row once, read only, then ADDS: its herbs onto the Acupreg shelf (a matched herb fills a blank only, an unmatched one is added with `qty: null`), its patients (`rec.places = ["Acupreg"]`; a same-name patient is left alone and listed in `PHARMACY.acMovedIn.pairs`) and its bookings (`place: "Acupreg"`); a backup downloads first and counts are checked after. Never a delete or an overwrite there; the old login is removed only after her yes on the check. **Same-name patients** (`phAcPairsOpen`, the sheet after Bring in Acupreg or a second run): lists, per patient on both logins, the blank fields and list entries (new id) Acupreg's copy holds that this one lacks, and fills ONLY those (`phAcFill`, per patient or all; a backup downloads first); never an overwrite. **Place** is read, never stored: `phApptPlaceOf` (a booking's own `place`, else Saturday = Lotus, else Friday = Acupreg once Bring in Acupreg has run, else the login's clinic); the calendar paints an Acupreg booking in its sage on any login (`phCkStyle(service, day, a)`); the Patient directory shows a patient's places (their bookings + `rec.places`) with a Place bar; the Both-clinics overlay never draws a booking already here. **Acupreg orders its own:** To order has an Acupreg tab (herbs on the shelf at or under their own `lowAC`, A-Z; Low at is a field; Arrived adds grams to the Acupreg shelf); CBD's order pipeline is untouched. **Photos need no copy:** the photos live in this device's IndexedDB (`lcm-ren-photos`), shared by both logins on a device; the cloud bucket is only a relay inbox (the ~52 files under the Acupreg login's folder may be unreceived Acupreg photos: never delete them). Not built yet: removing the location switcher and the saved Acupreg login (only after her yes).

**Stock is never mixed (her 2026-11-23 "i cannot have mixed inventory in the 3 places"; audited 2026-11-28; this wins over the two paragraphs
above):** every stock read or write is ONE clinic's shelf, with no fallback and no Take-from tap: a dispense and its not-enough-stock box,
a batch, an order, a delivery, a count, a typed number, a move, an edit form opened on a stock page, a delete and its Undo. Every
grams change is a Stock movements line that knows its clinic (`entry.shelf`; a move `from` / `to`); one door takes an entry's grams back or
puts them again (`phEntryStock`), never a second copy of that arithmetic. A figure about one clinic's jars reads that clinic's entries only
(`phLogShelf` / `phLogOn`).

**Schedule from the open prescription (her 2026-11-21 synth22 "how do schedule dispense?" → "yes add schedule button"; mock D of
`lcm_synth22_careplan_summary_findings_schedule_mocks`):** the open prescription's dark band carries **Schedule** (the calendar icon +
the word, the band's own 32px look) before the dashed +; a phone has it as the band ⋯'s first item (one-row header law). A tap opens
the schedule-a-dispense form in the app's one sheet (`.ph-lk-sheet`, `#phSchedSheet`) OVER the prescription, this prescription preset
(`schedFormPresetId`), so she never leaves it; the dose card's ⋯ More › Schedule goes to the same sheet. Once the prescription has a
dispense scheduled and not yet dispensed the button reads its date ("5 Dec", "+1" for more) and opens that entry (the queue's own
row, `schedRowHtml`) with "+ Schedule another". One form store and one queue (`PRESC.scheduled`): the Patient profile page's
Scheduled dispenses is the same list. Never a second schedule form or a second store.

**Each finger is its own pain area (her synth22 2026-11-21 "patient described right hand middle finger pain but i cant input it"; pick
"each finger", no joints):** `finger_index` · `finger_middle` · `finger_ring` · `finger_little` beside `thumb` in PH_PAIN_REGIONS (front
+ back spots on the figure's hand), the Areas list (Shoulder & arm: Wrist · Hand · Thumb · Index · Middle · Ring · Little finger · All
fingers), the hand close-up (`PH_PM_HAND_AT`, each on handDigits' own axis; palm and back mirror as before), the side view and the
Musculoskeletal region (wrist). Add pain reads "middle finger", "ring finger", "index / pointer finger", "forefinger", "little finger",
"pinky / pinkie" (plurals too), and a named finger wins over "hand" / "fingers" in the same words ("right hand middle finger" = Right
middle finger only). The old `fingers` area (all fingers) stays for saved pains and a whole-hand complaint. Never joints without her word.

**Supplements lists only what she takes (her synth22 2026-11-21 pick, mock C):** the Supplements table is the supplements she takes now
(✓ rows only); everything else is ONE "Add" row of chips above it (stopped ones first, then the kinds with her products, then the
four seed kinds; eight at most, A–Z), the rest in More ▾, then + Add (any name, the table's "Other supplement" box). A chip or a
More ▾ pick starts it today through the tick door (`data-supp-tick`); ✓ in the table stops it (it leaves the table and leads the
Add chips, "Stopped <date>" on hover). No solid chip repeats a ✓ row. Every box in the table is a plain 6px field that grows with its
words (never a pill); a taken name is 600 ink. The add row of Medicines and Supplements spans the table (no lone "+" in Taking).
A patient's Dose pre-fills a DOSE, never advice: her Settings usual dose or her product's dose, else a seed only when it holds a number
(`phSuppKindDose`; Iron's seed words "Per the ferritin result ..." are advice, so Iron starts empty). Never bring back the full
checklist of every kind or the solid taken chips without her word.

**The rail's steps are bands (her synth22 2026-11-21 pick D-A, "make the numbered steps more obvious"):** each numbered step
(.ph-flow-step) sits on its own band a shade deeper than the rail (`color-mix(in srgb, var(--ph-herb) 62%, #000)`, so a Case or
Acupreg rail keeps its hue), its number (or a done step's ✓) in a WHITE circle with the rail's colour; the open step keeps the pale
selected look with a solid circle; its pages are indented 20px under it; quiet pages stay faint (her 11/18 rule). The mini rail
(56px) and the phone drawer keep their own look (no band in mini). Never go back to plain step rows or gold done circles without her word.

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
  stats is fine — that's an accent, not dark mode; so is the patient rail's
  teal band, her pick 2026-11-02, which takes a Gynae / MSK Case's colour like
  the rest of the panel). **One page she asked to be dark:** Numbers & Stars is a
  night sky (her 2026-11-16 word and 8 picks; the hand block "NUMBERS & STARS: THE
  NIGHT SKY" before `</style>`, scoped `#presPanel:has(.ph-ns)`, BUILD-NOTES "Numbers &
  Stars night sky"). Never a precedent for another page.
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
  the visits table's "better" cell (Treatment), the abdomen chart's green mark, the
  follicular segment's pale fill on the cycle bars and calendars, and the
  pale outline of the visit table's square action buttons all read it. Never a raw
  green hex for any of those again. Kept raw on purpose: the Dispense
  head and jar art above. **No herb colour coding** (her 2026-11-28 "remove the herb colour coding", then
  "Yes, remove them"): the herb green `#15803D` is gone from the visit table's herb cell (THE LOOK), the herb tracker,
  her dose blocks (`PH_HB_COL`), the appointment herb badge and the herb icons, all the app teal now; never a herb
  green again without her word (a clinic's brand colour is not herb coding), Acupreg's `#8AAB99`, the Cliniko type colours and
  the Cycle page's own palette (`--cp-*`; her 2026-11-19 pick C "reduce colours":
  red for the period, teal for fertile + ovulation, a pale grey luteal, white other days, the band and boxes white).
- **Case / category colour families**, one per condition, each with `-tint` /
  `-card` / `-deep` / `-press` / `-solid`; reuse one before inventing a new
  one: Musculoskeletal `--ph-msk*`, Gynaecology `--ph-gyn*`, Stress
  `--ph-purple*`, Metabolic `--ph-metab*`, Acute `--ph-acute*` (browner than
  the status amber), Facial `--ph-facial*`, Dermatology `--ph-derm*` (clay),
  Men's health `--ph-mens*` (indigo). Only gynae and MSK recolour the patient
  panel (`.case-gyn` / `.case-msk`, both the `--ph-green*` and `--ph-herb*`
  token families).
- **Superseded in part on 2026-11-18:** the UI is now FOUR colours, ink, white, teal and red (gold is a light teal; "Shaded blocks, four colours" under Fit the screen); the paragraph below says gold where the token now draws light teal, and its marks follow the same four.
- **The colour law (her word 2026-11-02: "black for text, 2-3 colours for ui, and other colors kept as accents"):**
  WORDS ARE INK: `--ph-ink` / `--ph-soft` / `--ph-faint`, white (or `--ph-struct-lbl`) only on a surface she kept dark.
  Never a teal, status, gold or Case token on a `color:` of text — not a heading, a chip's word, a pill, a date, a count,
  a nav label, a flag. THE UI IS THREE COLOURS: teal (lines, fills, the picked state), white (surfaces, chips, pills, cards)
  and gold (counts, the one primary disc, the one gold card). EVERYTHING ELSE IS A MARK, never a word: a state word gets a
  6px `::before` dot (`--ph-dot` carries its colour: `--ph-zero` empty / overdue, `--ph-low` low / due / draft, `--ph-blue`
  plan / restock, `--ph-good` better, `--ph-phaseout`, `--ph-stopped`); a band gets the same dot, first in its row (never a side line, her 2026-11-03 word); a chart its stroke.
  A tinted state pill or chip is the standard chip (white + hairline + dot); a solid dark one keeps white words only where she
  kept the surface dark. Kept by her picks: the Case colour on the patient rail, ‹ and tab lines; solid calendar blocks; the
  dark heads, cards and bands; All templates' coloured groups; the Guide; the Dispense head and jar art (the herb-row green went on her 2026-11-28 word).
  The sweep that applied it and the hand block "COLOUR AUDIT 2026-11-02" (before `</style>`) are in BUILD-NOTES "Colour
  audit (2026-11-02)". A new rule follows the law by hand; outlined buttons' words are ink (teal stays on the line).
  Kept by her word 2026-11-20: Inventory rows washed by their active supplier (Koda faded green, GMP lighter green, KPC faded
  yellow, Evergreen faded orange, made in house white; `phInvSupRowCls`).
- **Her Body pages are one app (her 2026-11-02 "make these pages have a consistency where they look like the come from the
  same app"; her 8 picks):** Cycle · Meals · Herbs · Fitness · Habits use the app's shapes in the page colour (`--ph-herb`, her
  record's Case colour), never a status green, C22's green or black: Buttons 6px with the colour's line (words ink), ONE solid per
  page; every bar a joined 6px bar with a line between segments (Fitness' workout kinds and body areas too, from 641px; they wrap
  as chips on the phone); every ‹ › a 32px circle on the colour's line; a section's name is the capitals label (10.5px, 11px on
  the phone; Habits' head is its count "n of m today", the rail names the page); today = the gold tint, no left line; **no
  frames** (the record card is the frame; space and labels group; one exception, her 2026-11-03 pick: Meals' week is ONE box,
  its bar on top with the views as tabs, see "Meals week box" in BUILD-NOTES). Data colours stay (cycle phases, food rings, habit dots, gym
  booking colours). The hand block "Body pages, one look" (before `</style>`); `.ph-cp` is shared, so a patient's Cycle page
  wears the same shapes in the patient's colour. BUILD-NOTES "Body pages, one look".
- **Contrast:** text on a tinted card uses the family's `-press` step when
  `-deep` fails 4.5:1. Hover lifts (brighter), never deepens. Never mix toward
  a pale tint to make a "stronger" fill (tints have almost no chroma).
  Amber, red, blue and teal are never TEXT colours (the law above); `--ph-low-press`
  and the other `-press` steps stay for marks and lines. Every text colour is solid, never a token at reduced opacity on a
  label; a count badge on a solid chip darkens it (`rgba(0,0,0,.2)`), never a
  white wash; a count badge on a light surface is gold with ink digits. Fang Bing Ren trait bars are one teal (an nth-of-type
  fade), the leader gold, labels ink or white by the bar (her pick 5, 2026-11-02); their colours pick white or ink by luminance (0.207) and
  a formula shade in the dead band is nudged out (`phFbrShadeFormulas`).
  Measured app-wide 2026-10-25: every text 4.5:1 (BUILD-NOTES "Readable text"); re-measured 2026-11-02 after the law (no
  coloured word, nothing under 3:1).
- **Type scale (her 2026-11-18 audit, picks "Yes, 5 sizes" + "Phone too"):** on a computer every word is one of FIVE sizes: **20** titles · **18** big numbers (and the patient's name heading the rail) · **13** text (names, rows, buttons, chips, every box incl. search) · **11.5** small notes (dates, counts) · **10.5** capital labels (column names, card titles). The phone (≤640px) has FOUR: **16** titles, big numbers and anything typed into · **13** text, chips, buttons · **11.5** small notes · **11** capital labels (STYLE-LCM). The old one-per-literal `--fs-*` tokens point at these (CSS "ONE TYPE SCALE", the two  token maps); a new text uses one of them, never a new size; drawing labels under 9.5px keep their own.
- **Type:** sizes come from the `--fs-*` tokens, never a one-off px. **One font on screen: Inter** (her 2026-10-27
  "i dont like this font" about Barlow Semi Condensed on the Care Plan title; her pick "Inter on screen"): words
  AND numbers, `--font-body`; `--font-disp` stays only as an alias of it. Every control inherits it (no browser
  Arial), SVG labels and canvas text name Inter, herb codes and supplier tags are Inter with `tabular-nums`. Never
  load or name a second screen font. Kept apart on purpose: printed letters and records (Georgia, print only), the
  bottle label text and its template, and copy-paste text or template tokens (monospace). Fitness joined too (her
  "Inter there too", same day): `--font-c22` is an alias of `--font-body`, Manrope is no longer loaded. LIVE 10/27, build 20261027-154200.
- **Icons:** one family, the app's own sprite (`<svg><use href="#i-...">`) —
  never emoji, never a second icon set. Swept 2026-10-31 (BUILD-NOTES "Emoji sweep"): emoji stay only in patient
  messages and letters, printed sheets (a print window has no sprite), the cycle chart's day marks and her clinic-move
  task icons. Inside a JS string write `<svg class=icn aria-hidden=true><use href=#i-x></use></svg>` (no quotes).

## Fit the screen
- Check every screen at desktop (1280px) and phone (~360-375px) width:
  nothing wider than the screen, nothing cut off, overlapping or scrolling
  sideways. A wide table scrolls inside its own card.
- **Be space saving**: mobile screen space is scarce — compact stat rows over
  tall tile blocks, one-line rows, tight paddings, no duplicated numbers, the
  first screen should carry real work. Never trim real data to save space
  (counts stay), trim the chrome around it.
- **Vertical space first, every page, desktop and phone** (her 2026-11-13: "add a rule to prioritis vertical space saving for the
  whole app", after the Guide's formula table went to two columns for "as many symptoms on page as possible"). When a layout
  choice trades height against anything else (a picture's size, a label on its own line, a heading row, one column or two),
  take the one that shows more rows on a screen. In practice:
  - one line per item: a read-only line 22-26px; a row holding a 32px control is 36px (tap-audit sizes still rule);
  - a group's name is a band or a prefix on its rows, never a spacer row; "or" / "and" is a tag on the row, never its own line;
  - an empty section shrinks to its one action (Patient profile's "+ Schedule a dispense"), or hides if the bar already has it;
  - never repeat on the page what the bar already says (the day, the patient's name);
  - a list of short groups in a wide box goes into two columns of cards (a container query; one column under about 460px);
  - measure before / after (the page's height in px, or rows on a 900px screen) and write the numbers in the build note.
  Her own dated picks stay as they are unless she says otherwise (the phone's patient herb line wraps to two lines, her
  2026-09-07; the locked session grid). The 2026-11-13 audit and its numbers: BUILD-NOTES.md "Vertical space audit".
- **The Cycle page's Calendar tab (her 2026-11-21 "improve this view, make it more space saving"; her 8 picks, option C; memory
  project_lcm_cycle_space_saving_2026_11_21; BUILD-NOTES "Cycle page space saving"):** ONE head line (‹ Today › CD n · phase, then
  Ovulated · Period; the cycle day said once); the Period group folds to its title on a day with no bleeding and nothing of it
  logged (one tap opens it, for spotting; a period day or a logged day is always open); PMS & mood is ONE joined field (no Mood / Gut /
  Body words; its pictures kept, more rows instead); the Note and the Fang Bing Ren strip sit under the month; the month's days are
  44px. Day card 783 -> 461px at 1440 (619 with Period open). Never back to two head lines or three PMS bars without her word.
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
  add a `@media (max-width: 640px)` block elsewhere; the one exception is the dated standard blocks at the very end of the main style, "ONE TYPE SCALE" and "ONE CHIP LOOK + THREE WEIGHTS", which carry their own phone halves), plus `window.innerWidth <= 640`
  branches in the relevant render functions. Desktop is untouched by any of this:
  1. Header is ONE row: ☰ · title · the page's one primary action · ⋯. Every
     other action, the gold Update button and the location switcher live in
     the ⋯ sheet (`phMoreSheetOpen`). Never add a second row or action.
  2. No bottom verb bar, no FAB, no footer band. ☰ is the only nav. The bar and its ⋯ dot are gone at 641-900 too (her 2026-11-18
     pick A, "Like the phone", after the sidebar became Me · Patients · Guide): no width shows `#phMobileTabbar`.
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
  management, i rely on appointments page to organise appointments"). **Since
  her 2026-11-19 picks it is ONE table** ("make the dashboard more simple", pick A of
  `mocks/dashboard-simple-mock-2026-11-19.html`, her 8 picks all the recommended one):
  the search, the filters ONE joined bar (All · To order · To refill · Empty) and two
  chips (Count formulas n · Count herbs) on one tool row; then one white card, Code ·
  Herb · Kind · Left · Days · Next, **each herb once** (what Urgent stock, Order these
  and Refill these formulas listed), empty first then fewest days, Next = Order (bought)
  or Refill (made here); a row has no buttons and opens its **Plan line** under it (the
  old Plan ▾ items as chips, Made [g] ✓ for a jar made here, Edit); Going out today is
  a band on top of the table on days there are some; End of day is the bar's one
  button from 4 pm. A phone draws the same table as Herb · Left · Next. Never bring
  back the Urgent stock card, the two Order / Refill cards, a second listing of one herb
  or buttons on a row without her word. NO patient lists, NO week calendar, no month view, no "Recent
  activity" feed, no Monday bands — several sections have been explicitly
  removed on her word (Communications-due strip, a day-list, a chart); don't
  add any section back without a mock and her sign-off. **Dashboard stays
  herbs-only** — any "who needs contact"/triage widget belongs on
  Communications' Due tab, never the Dashboard.
- **Consistency across pages is MY job to enforce before she ever notices** —
  a header variant, button shape, or spacing rule that exists on one page
  only is a bug even if it works. Every page goes through
  `phShellHead(title, "N things", strip?)` + `PH_TOPBAR_ACTIONS`; never
  hand-build a page-only header or override `.ph-shell-titlebar` locally.
  **The head is Cliniko's (her synth22 picks 2026-11-01, Cliniko look):** a
  light band (the struct tokens inside `.ph-shell-topblock`), and on a
  computer the page's actions are ONE joined bar (`.ph-tbm-bar`): the first
  non-ghost verb first and solid, up to three more with their words, any
  others in the bar's own ⋯. The phone keeps one row: ☰ · title · the one
  main disc · ⋯. Calendar blocks take Cliniko's clear colours
  (`phCkClear`; Break alone keeps `phCkTone`), a past day stays full colour
  with its ticks, and the name comes first. **Her own events on the calendar are shades of ONE slate** (her 2026-11-19 "more
  monochromatic and less colour diverse", pick B of `mocks/my-events-monochrome-mock-2026-11-19.html`): a shade a group, deep to
  pale (Fitness, Work, Home, Self-care, Together, Meals), a hand-picked colour follows the look; the patients keep their Cliniko
  colours, Me's own pages keep the group colours, birthdays stay coral. Never bring the six group colours back to the calendar
  without her word.
  **Her own blocks show ONE picture, no words** (her 2026-11-21 "personal blocks only shown by an image/icon", pick A of widget
  `lcm_my_events_icons_only_mock`; bigger since her same-day "make the pictures a bit bigger. improve visual", widget
  `lcm_own_blocks_bigger_pictures_mock`): the slate block keeps its shade, one 24px picture at the TOP CENTRE in a soft round badge
  (36px, the picture's own colour at 16%; a short block takes the biggest badge that fits, the picture never under 18px), on every
  day of a repeating block; anything overlapping lower down never covers it; no name, no time (her mouse
  resting on it says the name; a tap opens its card); week, day and the phone alike. The picture comes from the words of the title
  (`PH_C22_PICS`: Travel = train, a drive = car, a flight = plane, bus, Gym = dumbbell, Shoulder Rehab = a person stretching a band,
  Hair wash = shower, Haircare / skincare = hair and soap, Break Fast = bowl, an invoice = receipt, Code = brackets), else its
  group's glyph, else the calendar one; a title starting with an emoji shows the emoji. **Her 2026-11-24 "these icons are not consistent and look busy", then "i want both. icon with caption" (mock `mock-own-blocks-icons.html`): ONE look, picture AND word.** Each block shows ONE quiet line picture and the title's first word (emoji dropped) on one row, left, no round badge: the picture 18px (14px for the 16-grid `i-c22-*` family, so the stroke matches), the word 11.5px at 600, cut with an ellipsis; a phone's narrow column keeps the picture alone. An emoji-led title joins the line family (its other words' picture, else `PH_C22_EMOPIC`, else a white silhouette); the words block of a medical visit is unchanged. The calendar's leaf dose marks and today's habit tick circles stay (working controls, not decoration). The two-looks switch built first (Settings > Calendar > "Words, not pictures") was removed the next day on this word. Never bring the round badge or a coloured emoji back to the calendar without her word.
  **The SIDEBAR carries today's clinic logo (her 2026-11-25 "on a sydney acupuncture day, use the logo in column as a location indicator. do same for acupreg and lotus"; "the left left column" was the sidebar, after the calendar head, a day column and the hours column were wrong readings; her screenshot "this column"):** `#phSbLoc` (`.ph-sb-loc`), a 58px strip right under the clinic's name (her "put it under linh chinese medicine"), above Find a page, with NO box (her "i like a"): the logo is drawn straight on the dark teal in its own colours (her "use the logo colours", then "3 looks good, just make it a little bigger to be read"): the emblem in its colour (Sydney #6FCB79, Lotus #F2C14E, Acupreg #8FD0B4), the words white (Lotus cream #FFF1CF), strokes thickened a hair; its left edge at 14px, left-aligned, contained in 228 x 58. The minimised sidebar shows the emblem alone in a 38px square (Sydney's leaf, Lotus' flower on the teal; Acupreg's curl in white on the sage tile). The knock-out PNGs are made from the logos' own files (alpha from the ink, dilated one pixel at 50%); redo them the same way, never a CSS filter. `phLocId(key)` reads the clinic from `phApptPlaceOf` for TODAY (CBD / Acupreg / Lotus; a custom clinic and an unbooked Sunday show none), `phSbLocPaint()` repaints with the place rows and every minute (a new day, data arriving). The tile hides while Find a page filters; the drawer shows the full logo. Pictures are PNGs inside the stylesheet (data URIs, `--lf` full, `--le` emblem). The calendar (head, day columns, hours column) carries no logo; never put one there without her word.
  **One page standard (her 4 picks, 2026-11-18, "the pages within that group look different"):** on a
  computer every list page has a 58px top bar, its content 16px under it at the one left edge, the search a
  280px white box FIRST on the tool row, the filters ONE 32px joined bar (picked = solid teal, count inside),
  the list in ONE white card (16px corners, the soft shadow, column names inside), card titles a pale band
  with teal capitals, an empty list one quiet line. CSS block "ONE PAGE FRAME"; a new page follows it.
  **Her body photos sit on her own Body card (her 2026-11-19 "put my body photos relating to my body measurements", her 8 picks of
  `mocks/body-card-photos-mock-2026-11-19.html`):** on her own record only, under the readings: the first photo beside the newest, the
  kg and fat change between them, then a column a day (photo · kg · fat, the reading within 7 days), a tap picks the day on the left;
  covered until Show; Front with the views as one bar; a camera square for today. The same photos as Meals › Body (never a second store).
  Never on a patient's card without her word.
  **Patient profile on a computer is ONE table (her 2026-11-19 "make this view more simple -use apps codes", then "one table, i dont
  need fang bing ren cycle prescription columns"; `mocks/patient-list-simple-mock-2026-11-19.html`):** Patient · Age · Last · Booked ·
  Grams, the bands (Booked today · Dispensed today · Drafts · Older) its group rows; the whole row opens the patient, no buttons, chips,
  herb line or formula on a row; the five tiles are the joined filter bar after the search; the bar's Dosage & markup, Find duplicates,
  Send intake link and Send chart link live in its ⋯ (`more: true`). Never bring the row buttons, the tiles or those columns back
  without her word. The phone keeps its own list.
  **Appointments › List on a computer is the same table, full width (her 2026-11-19 "i like that table for the appointment list
  viewing", pick A of `mocks/appointments-list-table-mock-2026-11-19.html`):** Time · Patient · Age · Last · Prescription · Fang Bing
  Ren · Cycle · Grams, a day a group row (a tap = the day summary), free gaps and the Now line as thin rows; a tap on a booking opens
  its popup, as on the grid. The card beside the list is gone. 900px and under keep their own list.
  **Summary + Goal, and only the columns with something in them (her 2026-11-19 "make this page more simple, allow the list to
  include appointment treatment goals and summary column especially in acupreg", pick A of
  `mocks/appointments-summary-goal-mock-2026-11-19.html`, her 8 picks all the recommended one):** the columns are Time · Patient ·
  Age · Last · Prescription · Fang Bing Ren · Cycle · Summary · Goal · Grams, and a column empty for every row on screen drops out
  (Acupreg: Time · Patient · Age · Cycle · Summary · Goal). Summary = the booking's own words, else her last, else the record; Goal =
  the plan's goal (`phApptBrief`, the popup's words). Her own day list ("Fri 20 Nov · Zanda", then "12:00–12:30  Name: words") pasted
  into Add appointments puts the words on that booking's Summary (`phApptParseSummary`). The practitioner chips show only when two or
  more people are booked in the days shown (a chip at 0 hides), and the rows drop their name tag then. Today's IVF work is one slim
  line. Never bring back an always-empty column or the Zanda / Cliniko source tag on a row without her word.
  **ONE LIST LOOK on every page (her 2026-11-19 "audit all pages to give it these elements to keep design consistent with code and
  simplicity"; CSS block "ONE LIST LOOK"):** on a computer a page's bar is its one main action + ⋯ (every other action in the ⋯;
  `keep: true` in `PH_TOPBAR_ACTIONS` is the only way one stays beside it); tiles that filter are ONE joined bar (`phShellStripHtml`
  draws it whenever a tile has role="button"; a plain count follows as words; tiles that only count, as on Dispense history and Stock
  statistics, stay tiles); every list table's head is the pale band with teal capitals (`.rtn-table`, `.ph-ost-tbl`, the sheets'
  `.ph-ds-cols`); a list sits in the white card; a row's ⋮ × ✎ show on the row she points at or tabs into; no "wider than the
  screen" line. A new page or table follows it.
  **Shaded blocks, four colours (her 2026-11-18 on Formula refill: "use block shading to make it look less busy and use less colours", then "keep to only black white teal and red"):** a group of rows is ONE pale block (`.ph-rfc-blk`, `--ph-cream`, 12px corners), its rows sit inside with no lines between them and turn white when hovered or open; the one solid colour is the teal action (Make), every other fill is white or the block's shade. On that page the only colours are ink, white, teal and red (red = empty, short, overdue: the Overdue dot, the red jar, Fix short); gold and amber are out of it (CSS "black, white, teal and red only", end of the Formula refill rules). The weighing panel names the herb to weigh next in one box (`.wnx`). **App-wide (her "yes", 2026-11-18, to "blocks and four colours everywhere"):** the colour tokens now carry the four colours: `--ph-low*` is red, `--ph-gold*` is a light teal (`#7FB8CB`, tint `#EEF5F7`; the names are old), `--ph-good*` and `--ph-blue*` are teal, and the old gold, amber and green hex literals were swapped the same way. So a count badge, the Update button, a today tint, a low-stock dot and a better mark are teal or red now, never gold, amber or green. **Kept by her earlier picks, not swept:** the Case colours on a patient (Gynae crimson, MSK navy and the other families), All templates' coloured groups, calendar and Cliniko type colours, Acupreg's sage, the Dispense head and jar art, her herb-row green, data colours (cycle phases, food rings, habit dots). A new rule uses the tokens and these four colours; a fifth colour needs her word. Blocks (`.ph-rfc-blk` and the page frame's cards) are the grouping on a page that has groups; a Formula refill's look is the model. **Measured, never eyeballed:** `.github/scripts/style-audit.js` (`lcmStyleAudit({root})` in the sandbox, the page drawn; head to the script) lists every text size off the scale, every fill or word outside ink / white / teal / red (`{palette:"app"}` also lets gold through) and every coloured line down one side; run it with tap-audit on every page a build touches.
- **TOP BAR: every control in a page's bar sits on one centre line** (her 2026-11-09 "see the problem? fix it and prevent from happening in the future": the Guide's bar had Me 8px
  lower than Families, the search box and the Learned pill, because the head beside it kept the 16px bottom margin of the days it was its own row). The bar centres its children, so
  a vertical margin or padding on one of them moves the box it centres and the controls inside look off. A page's head cluster that rides in the bar (`.ph-gd-head`, `.ph-widget-head`,
  any new one) carries NO vertical margin or padding of its own: the guard `.ph-shell-titlebar > :not(h1) { margin-block: 0 }` and `> div { padding-block: 0 }` (in the shell CSS beside
  `.ph-tbmerge`) holds it, and a control keeps the 32px chip size (the Learned pill too). **Measured, never eyeballed:** `.github/scripts/titlebar-audit.js` (`lcmTitlebarAudit()`
  in the sandbox, the page drawn; head to the script) lists any control whose centre is off its row's line by more than 1px, a single row off the bar's centre, or a vertical margin
  on a wrapper. Run it on every page whose bar you touch, at 1220-1280px and at 360px, with its menus open: `off` is empty.
- **Information in a REAL table, not a sheet of sub-rows/steppers**, is the
  default for any multi-item editor — one row per item, one column per
  field, hairline cells, labels repeated per group. **A merged widget's
  header row must be the table's own `<thead>` — never split a header off
  into a separate div above the table** (hit repeatedly on the Treatment
  Plan Session grid; her explicit, repeated complaint every time it drifted).
  Give a data table `table-layout: fixed` and a `<colgroup>` (or declared
  widths), so the first column read cannot take the space a later select or
  action cell needs. Rows alternate a faint tint; the row she is on gets a
  tint alone, never a line on its side (her 2026-11-03 word, under "Separation
  & grouping"; her 2026-11-02 "Tint only" on the Compass's asked row came first).
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
  shapes were left as they are). Text boxes read `--field-radius`, `--field-radius-sm` and `--field-radius-area`, which are
  all 6px since 2026-11-24 (they were a pill, 10px and 16px, so a computer drew pill boxes beside 6px ones); a value she
  taps to edit follows TAPPABLE THINGS' Field shape (6px, tinted), and TAPPABLE wins where the two disagree. One type scale
  and three weights: THE LOOK at the top.
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
- **No line on the side of a box** (her 2026-11-03: "i hate this design with
  line on side of box. remove it all from the app", her picture the Booked
  today band). No coloured stripe or bar down the left or right edge of a box,
  row, card, band, block, chip, quote, notice or menu item: not a
  `border-left`, not an `inset Npx 0` box-shadow, not a `::before` bar. A
  state or category the line carried shows as the colour law's dot (bands,
  outcomes, visit dates, family and area heads) or the row's light tint (the
  row she is on, missed, unfinished). Kept: chart and connector lines (a goal
  line, timeline spines, step connectors), a table's split, dividers, and top
  or bottom lines. The sweep: BUILD-NOTES "No side lines".
- **Say a fact once.** A fact shown near the top of a page (a phase or cycle
  day in the band) is not repeated in a section header below it; if two places
  would say the same thing, drop the second or make it say something new.

## Components — one system, no one-offs
- Tappable things: the five shapes of TAPPABLE THINGS at the top. (The older
  "pills pick, square outlined buttons act" split is retired.)
- One card style, one sheet, one toast, one undo, one compare, one message
  kind per job (★★★ rule 5). Screens with different jobs can look different
  inside the same system, but never a second look for the same job.
- One case search, one case view: Cases, a patient's Similar cases and the profile search read a
  case's lines by one rule (`phTcSxHitsQ`, `phSynHas`), and Similar cases shows the Cases case page
  itself (her 2026-11-17 picks). Never a second search or a second case page; cases are evidence,
  ordered, never labelled a pick.

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
- **One short move per change, and no mark that loops** (her 2026-11-17 "audit
  the app - some of the appointment animations are laggy. make it more simple";
  BUILD-NOTES "Appointments: simpler motion"). A change moves once, about 0.2 s,
  on `transform` and `opacity` only, as one piece (the whole grid, the card):
  never every block or row on its own in a stagger, never a copy flying across
  the page, never `top` / `left` / `width` / `height` / `box-shadow` / `filter`
  animated, never a wait before the new thing paints. A mark that waits for her
  (a due dose, the next step, a running fast) is a still ring, never an
  `infinite` pulse. A tap that changes one small thing touches only that thing
  (the card's open state lights Next on the toolbar, it does not work the
  toolbar out again).
- **Every animation is off under `prefers-reduced-motion: reduce`**, in the
  CSS and through `phTpReduceMotion()` in JS. Add it with the motion, not after.
- Anything timed in a hidden tab needs a `setTimeout` way out
  (`requestAnimationFrame` barely fires there).
- **A film or a moving picture writes only what changed, and rests** (her
  2026-11-06 "when i play the video on my desktop the app feels laggy").
  Never set `textContent` / `innerHTML` on every frame: the same words written
  again still count as a change to the page, and each one wakes every
  page-wide watcher. Keep the last value and compare (`setA` / `setS` in the
  triangle film, `op`, `phKsOp`). About 30 frames a second; nothing drawn
  while paused, ended or out of view. The page-wide watchers ask
  `phMutOwn(recs, level)` first: a new self-animating region joins its one
  selector, and a picture added inside a player is mounted by the code that
  adds it. Measure frames and script time before and after (BUILD-NOTES
  "Films: lighter on the page" says how).
- Motion never costs her scroll position or an open edit (see "Navigation
  continuity" in the PA Coder foundation).

## Status colours — quiet and consistent
- **Since 2026-11-18 the colours below are THE LOOK's four** (the tokens were re-pointed: amber and orange draw red, green and blue
  draw teal, gold a light teal); the shapes and the order below still stand.
- The inventory status counts (Zero / Low / Phasing out / Temporarily
  stopping) are a compact, aligned set of small chips of equal height — not
  loud full-width solid bars. One clear colour each: zero = red, low =
  amber/yellow, phasing out = soft orange/bronze, temporarily stopping =
  neutral grey. Same size, same shape, evenly spaced.

## Stock level bar
- Show the stock-level bar in its OWN column with a % label, never squashed
  under the stock number. % = stock vs the "low at" reorder line, capped at
  100%; teal at/above the line, red below it (THE LOOK's four colours; it read green / amber / red before 2026-11-18). Same treatment
  on the main Herbal Inventory table. **To Order** (her Cliniko Products pick
  4, 2026-11-02): the bar sits before the grams on one line in its Stock
  column, the % in the hover; never under the number.

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
- **Opening never waits on the cloud when the device holds the pharmacy** (her 2026-10-30 "i want it to operate without
  internet including opening"). No internet, a failed cloud request, or no answer for `OPEN_HANG_MS` = in on this device's
  copy (`openLocalNow`, `bootFetch`); a token refresh that failed for want of a network is never "signed out" (INITIAL_SESSION
  with no session is ignored, `netFail`), so never `screenAuth()` for it. After that early entry the cloud catches up only
  through `resumeCloud()`, never `go()` (`go()` sets `lastPushed` and would mark her offline edits as already sent;
  `openedLocal`). Test after any sync or boot change (BUILD-NOTES "Opens without internet"): the harness copy
  (`mocks/offline-open-harness.html` in the head of an index.html copy) in `?m=off`, `?m=lie` and `?m=late&after=5000`, with
  an expired and a fresh saved sign-in: in within 2 s, no sign-in wall after 30 s, and `late` reaches GET + POST settings with
  no cover; a signed-out device online still shows sign-in. The test store must hold `lcm-sync-base`: since the 2026-11-06 audit a copy with no merge base has
  never agreed with a cloud row (the app's seed, or something written after a clear), so it is "holds nothing" and adopts the row whole, never merges.
- **The written-from-the-record summaries never read each other in a circle** (her 2026-10-27 freeze: "Loading your
  pharmacy..." then Chrome's "Page Unresponsive", on her real records only). The booking brief (`phApptBrief`), the Care
  Plan's auto diagnosis and goal (`phTpAutoDx`, `phTpAutoGoal`), the complaints (`phCxItems`, `phCcRibItems`, `phCcAuto`)
  and the pain map (`phPmList`) read one another: a new read from one into another must never lead back to itself.
  `phPmComplaint` asks `phApptBrief(a, plan, true)` for the complaint only; `phTpAutoMemoGet` answers empty for a key
  still being worked out (`phTpAutoBusy`). Test: a made-up patient with two open Care Plans, no pain map and a booking
  today must open (BUILD-NOTES "The freeze on load").
- **Speed foundations** (her 2026-11-17 "audit the codes and foundations", BUILD-NOTES "Speed audit"; measured on her own
  records, nothing she sees changed): a page change never calls `savePharmacy()` (it wrote the whole 3 MB store and the sync
  sent a full round trip); a page draw never parses the stored copy (`currentLocationLabel` reads it again only when it changed);
  a patient page draw runs under `phTriMemoDraw` (each Fang Bing Ren / clue answer once per draw). In that memo a key carries
  the record object (`phTriRecId`), a list comes out as copies (a reader marks clues), the write doors (`phTriWrite`,
  `phCxWrite`) run with it off and empty it, saves empty it, the two timed memos start empty each draw, and a draw that
  changed the open record is drawn again on the settled record. A count kept between draws keys on `phDataRev` (saves,
  `phDefer`, storage events) + the day + the PHARMACY / PRESC objects. Layout: read every size first, then write; write a
  style only when it changes (`phDsResizeApply`). Test: the same page text before and after on her records, every main page
  and every patient step (first draw and again).
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
- **Study library** (`phStu*`: her study entries, typed in a trip session's Study row; step 1a saved 2026-11-06). Her study words are private and are not clinic data: they live only in IndexedDB `lcm-study` and localStorage `lcm-study-outbox`, never in `lcm-me`, a `daybook*` key, the clinic's cloud row, the backup file, a console log, a mock, a note file or this repo. Never read, copy or quote her entries; test with made-up entries marked made up. The box is only ever a new entry; a row is changed where it sits; the store is never written before it has been read; "One copy on this device" is worked out by `phStuOneSet`, never set by hand. After any edit near it, on the test copy: type in the box, repaint (`phTripRepaint()`) mid-sentence, Ctrl+Enter, open a row, Backspace it to nothing (it must hold its words), reload, and check that both copies hold the entries.
- **Fang Bing Ren key check** (`phFbrKeyCheck()` returns the weights whose sign is in no pool; warns in console on load. It must be `[]`: read it on the test copy after any edit to `PH_REN_SIGNS`, `PH_BING_SIGNS` or a family's table. A row left at the end of a `//` comment once dropped a sign for three days.)
- **End of day self-check** (`phEodSelfCheck()` warns in console on load if
  broken): (1) before 16:00 the Dashboard's End of day button (its bar's one action, since
  2026-11-19) is absent, at/after 16:00 present; (2) the generated Cliniko prompt lists exactly as
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

## PA Coder foundation (herbal pharmacy)

The standing brief for whoever builds LCM. It holds the rules of five retired personas (desktop product designer, product intelligence, communications, mobile design, visual teaching) under plain headings; the code words are gone and every rule is kept. It sits UNDER her design profile (ABOUT-ME.md: Exact · Simple · Efficient), THE LOOK, the other ★ rules and the build gate (the tap, style, title-bar and voice audits empty at 1220 and 360; push only on "push live"). Where it disagrees with them, they win; the known tensions are listed at the end.

### Role: a consultant, not an order-taker
- She speaks in ordinary words, never pixel specs. Diagnose the problem behind the words, make the sensible professional call where she has not specified, and never make her micromanage or repeat herself.
- **Translate the feeling:**
  - "Messy" → hierarchy, spacing, density, grouping, competing elements, load.
  - "Too many buttons" → which actions earn permanent space, which go contextual.
  - "Faster" → fewer clicks, better defaults, shortcuts, bulk actions, search, automation.
  - "More compact" or "smaller" → remove, combine, group, collapse, contextualise, hide, before any shrinking.
  - "Premium" → type, spacing, hierarchy, restraint, consistency.
  - "Annoying" → investigate the interaction; do not restyle.
  - "Why do I select this again" → missing state, duplicate input, poor default, lost context.
  - "Doesn't feel smart" → missing inference, automation or memory.
  - "Clunky" → the cause, not the symptom.
  - "Too much on screen" → progressive disclosure.
  - "I don't want to repeat myself" → a system rule, not a one-off.
  - "Everything accessible" → contextual actions, drawers, menus; never everything at once.
- **Claude advises, she decides.** When approaches differ: name the problem and the trade-off briefly, recommend one with the reason, say so when her proposal is worse, then follow her call. Unsure = state the decision, recommend, ask ONE focused question; never guess silently.
- **Questions.** For a significant redesign ask at least 8 (15–30 for a large one), in batches, only those that change the decision: what she wants, how she does it now, what is slow, frequent versus rare, always visible versus hidden, one click away, automatable, to keep. Skip the ask when good practice already answers it.
- **Bring expertise unasked.** A prescription screen is also formula and herb search, dose entry, quantity, previous prescriptions, stock, substitutions, printing, safety checks, confirmations, keyboard flow and bulk actions. Say so in chat when a substantial workflow gain exists; never put it on screen as a suggestion.
- **Learn from corrections at system level.** Ask what changed, why, and where else it applies. A repeated ask (less clutter, more compact, better hierarchy, fewer permanent controls, less decoration) is a standing rule to apply unasked. Never bring back what she rejected without a compelling reason. Each round should need less input from her.
- **Her newest answer wins, at once**, even over one she gave minutes ago; never relitigate it.
- **A "what about X" mid-design is probing, not objecting.** Answer with layers (a baseline that works everywhere, a richer behaviour added where the device supports it: tap always works, hover only under `@media (hover: hover) and (pointer: fine)`) or a control that adapts to state (the day arrows page by day when collapsed, by week when open).
- **Two visible controls on one handler = propose removing one** (the Day FAB). Read both handlers before claiming it; apply app-wide, not only on the screenshotted page.
- **A change that does not look different** (a dead label made tappable, a default flipped, an order that changes only under conditions she lacks) is flagged up front as "looks identical until you tap it"; if a screenshot cannot show it, say so.
- **"Audit" or "improve"** (not "redesign") = a few concrete, shippable fixes with visible proof, not a findings list or a question battery.
- **Her real usage beats the default.** When she says how she uses a page, check that its default view, filter and tab match; fix a mismatch rather than leave it configurable.
- **Calibration (her 2026-08-30 answers):**
  - Pre-fill silently when confident; ask one question when unsure.
  - Ask before saving a correction as a new standing default.
  - Offer to make a repeated manual choice the default ("you always do X: make it the default?"); never learn it quietly.
  - A dose or quantity may pre-fill silently on a clear repeat; no stricter rule for health fields.
  - Disclosure depth is "whatever fits the content", no fixed tap count.
  - "Clunky": fix that instance fast and narrow unless it clearly touches a shared pattern.

### Workflow and desktop
- **Workflow first, UI second.** The chain is patient → assessment → prescription → dispensing → communication → follow-up, with stock, orders, suppliers, substitutions, doses, history, notes, payments and shipping around it. Inventory, prescriptions and patients are one product: the opportunity is the links (patient → prescription → formula → herbs → stock → dispensing → order → communication → history). Remove friction between steps, not only prettify pages.
- **Clinical flow without interruption:** find the patient → history → assess → prescribe → modify the formula → check stock → dispense → communicate → complete. Reuse information, pre-fill, remember preferences, surface relevant history in context, never ask twice.
- **Desktop leads, mobile covers the essentials** (her words; asked, not assumed). In the room she is on a desktop or laptop, even mid-consult. Deep clinical work (building a plan, designing a formula, the full pulse or tongue chart) is desktop-first and may ship with no phone treatment: note the gap in passing, add phone support only on her ask. Schedule, check-in and logging features still get full mobile care.
- **Desktop design:** a professional desktop application, not a phone app stretched wide. Dense but readable, multi-column, persistent contextual navigation, keyboard shortcuts, search, command actions, bulk operations, resizable panels, tables, side panels, split views, drawers, hover and right-click actions. No oversized mobile cards.
- **Space is a resource.** Maximum useful information at minimum load, in this order: Remove → Combine → Infer → Group → Collapse → Contextualise → Hide → Reveal, before adding UI. Compact is not cramped.
- **Rooms, drawers, cupboards, hidden doors.** Main rooms are simple, drawers hold useful tools, cupboards deeper resources, hidden doors the powerful functions; she need not see everything to know it exists. Show the most important decision first; a feature is not better because every option shows. Simple surface, deep functionality.
- **One design system** for type, spacing, colour, icons (one family), buttons, forms, tables, navigation, cards, panels, modals, drawers, states (empty, error, confirm) and corners (THE LOOK holds the numbers). Reuse components; consistent is not identical: a prescription, an inventory and a patient screen have different jobs inside one system.
- **Think journeys.** Where she came from, what she is doing, the likeliest next action, whether it can happen in place. Intent → Context → Action → Result → Next, never Screen → Form → Save → Screen → Form → Save; carry context forward.
- **The productivity test:** can a practitioner do this faster, more accurately, with less effort? If not, keep improving. The finish: professional, fast, calm, organised, space-efficient, easy to learn, very efficient for an expert.

### Product intelligence: the app understands intent
- **Never ask what the app can know.** Infer → Pre-fill → Confirm → Remember, not Ask → Re-enter → Confirm → Repeat. Pre-fill the editable value; never a suggestion chip or text (NO SUGGESTIONS). Example: "Sunday 30 August · 7pm" plus "Weekly" means every Sunday at 7pm.
- **For each feature ask:** what the user knows, what the app knows, what can be inferred, what decision she truly needs to make, what is asked needlessly, what should happen automatically, stay editable, be remembered. Never build a form because the model has many fields; bridge what the record needs and what she must consciously give.
- **Inferred is not chosen.** Defaults come from context, previous input, established behaviour and domain logic. Her override becomes an explicit preference and is never silently overwritten by the original inference.
- **Think at system level.** Ask how a behaviour should work app-wide, not only how one screen looks; a better pattern found once becomes the reusable pattern.
- **Walk the workflow before building:** what she knows, what the app knows, what happens by itself, what she decides, what comes next, whether it can be anticipated, whether a mistake can be undone, what the empty, unusual and returning states look like. Design them on purpose.
- **Diagnose before patching:** what happened, why, what she expected, what the app failed to understand, whether it is isolated or a system problem; fix the pattern. When the same complaint returns on what looks like the same feature (three times: "a widget under the calendar", from different Cycle render paths), check for a DIFFERENT code path producing the symptom before patching again.
- **Her goal:** *"I want an application where I repeatedly think 'Oh, that's exactly what I would have wanted it to do.' And when I correct it, I want the application to become better at understanding my intentions rather than requiring me to repeat myself. I describe the destination. You understand the intention, determine the best route, and build the experience intelligently."*

### Navigation continuity and layout stability
- The interface never jumps, jerks, teleports or rebuilds itself between pages, tables or records. She should feel "I moved deeper", never "a different application appeared".
- **Avoid:** layout shifts, elements moving after load, changing sidebar widths, jumping buttons, content at changing heights, needless full reloads, abrupt replacement, inconsistent transitions, losing scroll, filters or selection.
- **Use:** stable containers, reserved space for dynamic content, persistent navigation, drawers for light secondary information, detail panels, contextual drill-down, kept scroll, filters and selection, skeletons where needed.
- **Motion** shows spatial relationships (a list opens into its item, a row opens in place) and never decorates. Before a new page ask "can this be revealed in the current context?"; a page that is needed keeps the visual language of the one before.
- **House rule:** every feature inside a long scrollable page (Treatment Plan, Dispense, Cycle, Settings' template editors, Patterns, Photos) repaints through its host's scoped, in-place refresh, never a full `renderPresPanel()` or `renderPharmacy()`, which reset `scrollTop` to 0 (the root cause of the Cycle, Constitution / Examine and IVF history "jumps to top"). A new sub-tab or handler in an existing host uses that host's refresh; a new host gets one from the start.

### Mobile surfaces
- The phone owns Appointments, the Dashboard, quick check-in, the at-the-door card and Communications' Due tab; its laws are under "Fit the screen" and STYLE-LCM.md, unchanged by the desktop-leads scope.
- Judge a phone screen as a mobile consultant would: simple primary surface, deeper functions by contextual actions and disclosure, comfortable tap targets, readable, accessible.

### Communications (everything patient-facing)
- **Scope:** SMS, email and letters that leave the clinic in her name. This governs tone and structure, not clinical content.
- **Her voice:** *"note my style of communications. im never completely blunt, im more polite but brief and succinct."* A short message cuts length, never warmth: keep the greeting, a soft prompt instead of a bare instruction, and the name sign-off. That is why the short register is **Casual**, not Blunt.
- **Tones:**
  - **Formal**: professional and detailed; the default for someone recently met (about six weeks), though the real driver is closer to who the patient is than how long she has known them (unresolved: flag, do not guess).
  - **Casual**: same content, brief; the default once she knows them; still polite.
  - **Supportive**: a layer ON TOP of Formal or Casual, never a third option, for cycle, fertility and other hard journeys ("they are often on a tough journey and need alot of support and encouragement"). One sparing, purposeful emoji per message. It is a removable add-on, never woven through the sentence: the emoji plus one extra encouraging line are the ONLY difference between a tone's base and its +Supportive version, for every pair. Offered at every moment.
- **BBT add-on:** a third, independent removable line, only on Period and Ovulation, only for patients who track BBT (`rec.tracksBbt`, a tick on the Contact card): *"If you're tracking your BBT, send me a screenshot of your chart when you get a chance."* It goes BEFORE the sign-off; every body ends `{{me}}`. Past about 400 characters a quiet "Long message · N characters" note shows (her phone's box gets an inner scrollbar); never shorten her confirmed wording to fix it.
- **Menses-signs reminder:** permanent inside Period-Formal (base and +Supportive), not a toggle; Casual does not carry it.
- **IVF protocol** adds Post-OPU, Pre-ET and Post-ET (the wait, replacing Luteal) in the full Formal / Casual × base / Supportive grid; Menstruation and Follicular have their own IVF wording.
- **Confirmed register; match it for anything new:**
```
Period, Casual (base):
"Hi [name], just checking if your period started yet? How's the flow/pain
this time? Let me know. See you [date]. Linh"

Period, Casual + Supportive:
"Hi [name] 🌸 has your menstrual period started? How's the flow/pain this
time? Let me know. See you [date]. Thinking of you. Linh"
```
- **Where the words live:** seeded into `PHARMACY.msgTemplates` by a stable key from `PH_CODE3_MSG_SEEDS` (the identifier keeps its old name; renaming it is code churn), e.g. `period-formal-sup`, `luteal-casual`, `opu-formal`; editable in Communications › Templates, where "+ New" works like the Treatment Plan template manager's. **Patient-facing wording is written into a file the moment she confirms it; a conversation is not a save** (confirmed wording once existed only in a transcript and was lost when the context compacted).
- **A late period is not the two-week wait.** `phTpCycleCompute` never bounds `day`, so a long cycle reads `phaseKey: "luteal", overdue: true`. `phCkPick` then swaps to the Period message, and its reason line names the real day count. IVF is excluded (after a transfer the same reading really is the wait; asking a transfer patient about her period is the worst message on the list), so Post-ET still wins.
- **Rebates are a mailing segment:** `rec.insuranceGood` (tick) and `rec.insuranceNote` feed Compose's "+ Add everyone with good rebates (N)". Ticked = good, unticked = NOT RECORDED, not poor; no third state. No rebate wording exists (she took both messages off the backlog 2026-10-06): never draft or raise them.
- **"Lives out of town"** (`rec.livesOutOfTown`) drops the return-visit clause from outgoing messages and shows "out of town" for "not booked" on her screens; confirmed for Check-in, Rebook, Acupuncture follow-up, Gone-quiet and Review (2026-10-01).
- **Open:** the Formal / Casual tag and Supportive outside the cycle track are in OPEN at the end. The phase → message wiring is built (CURRENT-STATE.md); this section is the voice and content spec.

### Visual teaching (explanatory pictures)
- **When:** an image whose job is to teach a concept, for her own study and the Guide. Routine icons and UI decoration are not this: "make it more visual" does not mean add icons; ask what the text says that a picture could show.
- **The visual IS the explanation.** The 2-second test: can someone grasp the core idea before reading the caption? Show relationships (cause → effect, before / after, blocked → flowing, healthy → dysfunctional), not lists of facts or symptom checklists. One primary idea, one dominant visual, clear hierarchy. Show, don't label.
- **Metaphors must carry meaning** (Qi stagnation = traffic jam, Blood xu = depleted reservoir); never generic "Asian TCM" decoration (dragons, calligraphy, random characters, needles everywhere). Legible at phone size. Simplify: remove → combine → simplify → visualise → label only if necessary.
- **Her calibration (2026-08-31):**
  - Format: hand-built SVG for mechanisms and flows, an AI illustration only where a human figure truly carries the idea.
  - Human figures: case by case.
  - Placement: a key visual inside the relevant card, plus a fuller library for the set.
  - Audience: her own study and recall, not patient handouts, unless she says otherwise.
  - A before / after toggle (healthy ↔ dysfunctional) beats a static image when feasible.
  - No pilot concept chosen yet: wait for her to name a topic.
- **Learn from corrections** as everywhere ("too much text" means more visual next time).

### Process for a change
1. **Understand** what she is trying to do. 2. **Ask** (8+ when it genuinely needs it). 3. **Diagnose** the real problem. 4. **Recommend** with the trade-offs. 5. **Design.** 6. **Mock** before any significant visual change goes live. 7. **Implement** after approval. 8. **Test:** workflow, usability, responsiveness, consistency, function, edge, error, empty and loading states, data integrity. 9. **Review the wider system** for inconsistencies the change created.
- **A mock is the app's own thing:** real tokens and fonts, delivered as a published Artifact or in the Browser pane (a pasted link or a screenshot alone repeatedly failed to reach her; confirm she can see it).
- **Options are mocked at the options stage:** with more than one real layout direction, build them side by side in the same turn, never as text bullets to picture or deferred until she narrows.
- **Approving a direction is not approving the result;** nothing significant goes live unreviewed.
- **When a rule blocks what she asked for:** show both, one following the rule and one following her ask, side by side, with the trade named. Do not silently override the rule or refuse the ask.

### Where this foundation yields (tensions, flagged)
- **Question count.** "Ask 8+" gives way to her working posture and ask28: ask her TASTE only (the visual first), decide competence calls yourself; never spend questions on what expertise settles.
- **Expertise unasked vs NO SUGGESTIONS.** Frequently-used formulas, substitutions and the like go in chat as advice; the screen shows data and her own pre-filled values, and Dispense never proposes a formula.
- **Hidden doors vs Terse.** Depth hides, core never does (the chief complaint page, the cycle for a menstruating patient); no hint, legend or how-to text to announce a hidden door.
- **Supportive emoji vs "icons are the sprite, never emoji".** Patient messages and letters are the one exemption.
- **"Clunky = fix fast and narrow" vs "a repeat report = wrong layer".** Fix the instance first; on the second report check for another code path or a system cause.
- **Visual teaching vs terse patient pages.** Teaching pictures belong to her study and the Guide, not to the patient pages' essentials-only rule.

---

# Current state, by area → CURRENT-STATE.md
What each part of the app is today lives in **CURRENT-STATE.md** (moved out 2026-10-28, her pick). Before changing a part,
read its section there in full. When a build changes a part, rewrite that part's paragraph there (current, not a log).

---

# Deploy & git
- **Push live only when she says "push live"**, each time, for that change
  (the 4pm daily auto-deploy was removed 2026-10-05). Commit freely on
  `session-a`; a push is her call.
- **How:** `.github/scripts/publish-live.sh` — a dry run by default; `--yes`
  only after her word. It builds the publish commit from session-a's
  COMMITTED index.html and sw.js, never the working copy (2026-10-28: its old
  `git add index.html` swept another session's unfinished build live in
  136b4716), re-checks that the commit changes the two stamp lines and
  nothing else, moves session-a only if no one committed meanwhile, pushes
  exactly that commit to main as a fast-forward, checks the result, and
  never force-pushes. Open edits stay local, so the tree need not be clean
  (the dry run lists them); it stops if anything is staged. It then writes
  the new stamp value into the working copy in place, nothing else.
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
  patch can misplace insert-only hunks; use `-U3`. **The patch's base is the HEAD
  of staging time** (2026-11-02: a build copy taken from an older HEAD, diffed
  against the newer HEAD, carried away 206 lines six commits had added in
  between, 4d59d067; 9df94e11 restored them): re-apply your fragments to a fresh
  `git show HEAD:index.html` copy right before `git apply --cached`, never diff
  an old build copy against the current HEAD.
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
  intake.html, chart.html, chart.webmanifest, manifest.json, sw.js, icons/,
  screenshots/, foods-au.json, eggs.html, eating-eggs.html and the film's two files, ninety-days-wide.mp4 and ninety-days-poster.jpg (`.github/workflows/pages.yml`). The .md files, mocks and
  backups are never published. Never Netlify.
- **eggs.html is made, never edited:** after any change to the EGGS code (or the Iron parts it borrows) run
  `perl .github/scripts/make-eggs-page.pl` from the repo root and commit eggs.html with it. If the Meals body's drawing changes,
  refresh `.github/scripts/eggs-body.svg` (the painted body, enough iron) the same way.
- **eating-eggs.html is made, never edited:** after any change to EATING EGGS, the Meals body or the body drawing run
  `perl .github/scripts/make-eating-eggs-page.pl` from the repo root and commit eating-eggs.html with it.

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
- `TODAY` is one Date object every page reads; `phTodayRoll` moves it to the real day in place past midnight (a minute's tick, or waking), and the repaint waits while she types or a
  card is open (audit 2026-11-06). Never hold a copy of it in module state, and never store the object itself. A check that must be right this second still calls `phLiveToday()`.
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
- A grid with no column template makes one auto track, and an auto track grows to its widest row's min-content (a nowrap
  label): every row then widens with it and runs past the box (2026-11-19: a long Care Plan phase name pushed the patient rail's
  rows about 35px under the page). Give a one-column grid `grid-template-columns: minmax(0, 1fr)` (the rail's `.ph-rail-in` has it).
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
- `#pharmacyPage .dn` is a bare global rule (10px, inline-block): a new `.dn` anywhere, a tspan too, inherits it. Grep a short class name before using it.
- A sign picture's own step (`P.step`) rewrites its svg's class line: show or hide a picture by inline style, never a class. A `requestAnimationFrame` time can fall before the `performance.now()` taken in the tap that woke it: floor a step's dt at 0, or the motion runs backwards.
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
- A cloned SVG keeps its ids, and `url(#id)` resolves to the FIRST element with that id in the document (the original), so the
  copy paints only while the original is drawn; a copy placed outside the original's container also loses every rule scoped to it (an
  SVG shape whose only fill came from such a rule paints black). Give a copy its own ids (`phSvgOwnIds`) and diff its computed
  styles against the original (BUILD-NOTES "MSK Enlarge: the back figure drawn black").
- `renderPharmacy` sets the page's action cluster (`phTopbarActionSet`) before the page draws its own bar, so the cluster
  lands whole only through `phMobileDedupeTitles` at the end of every render path (the remembered merge, 2026-11-01); a render
  path that skips that call gets its disc from the 0 ms retry instead, and its bar grows after paint. A page that rebuilds its own
  bar with `innerHTML` wipes the cluster; the shell's `#pharmacyPage` observer puts it back in the same task, before paint (a removed
  `.ph-tbmerge` with none left, 2026-11-01): never add a page-level heal or a timed re-merge.
- **A list that opens from a control inside `.ph-cmp` is cut to that card.** `.ph-cmp` is `overflow: hidden`, so an absolutely placed
  menu (`.ph-cmp-addl`) shows only the part inside the card's own box: on a bare one-row bar (Cases) that was a 34px sliver (her
  2026-11-22 phone picture). Give the card `overflow: visible` where it holds a menu (`.tcd-top > .ph-cmp`, `.ph-tc-flat`). And never
  right-align a list to its button without opening it at 360px and 1220px: a list wider than the room left of its button starts off
  the page (BUILD-NOTES "Cases: the Condition ▾ / Formula ▾ list").

---

# Locked conventions — do not re-litigate
One-line decisions she has already made; don't re-ask or quietly bring back
what's on the "never" side. Rules already stated above (the ★ rules, Theme,
Fit the screen, Motion, NEVER break these, Deploy & git, and CURRENT-STATE.md) are
not repeated here.

- Guide family cards tell one story (her "i like it", 2026-11-04): a herb family
  plays only the person, never pathology; a formula plays Person → Trouble →
  Formula at work → Settled (CURRENT-STATE, "The card's picture"). Her like did
  not sign off the words: `PH_FS_WORK`, `PH_FS_PAIRW`, `PH_FS_ALLW` stay DRAFT.
- The formula film is a live drawing on the card, never a video on the site (her picks, 2026-11-05): the camera glides, labels stay on the body, the Calm pace. Real
  videos are local files only: `refs/films/`, wide, never committed or published (her "store some videos locally so it doesnt overwhelm the site").
  The site carries one film file, the wide Ninety Days; the tall copy is off it.
- One face, her graphite sketch (her "make the visuals consistent", 2026-11-05):
  every face comes from `PH_BODY_GEOM.face` (`art`, `plain`, `live`; woman and
  man, no hair). Never draw a face of its own, never colour or flat vector
  (CURRENT-STATE, "The one face").
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
  from turning NaN). A family is scored against its 8 strongest signs, at least 24 (`phFbrCeil`, her pick "Build 8 strongest" 2026-11-17), never its whole list; `phFbrMax` still sums a whole list where a total is wanted. Rows pre-fill from `phPatClues` where a real source
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
- **Shown with capitals, saved as written** (her 2026-11-09 "give symptoms words capitalised first letter except
  conjunctions"; then "yes keep them small too"): wherever a symptom's words are listed, `phSymCase` gives every word a capital
  and keeps a conjunction, an article or a short preposition small unless it leads ("Flushed or Red", "Sensitive to Cold",
  "Pain on Pressure"; the list: and or but nor yet so if than because although though while when whether unless until as
  whereas, a an the, to of at in on by for with from per into). Draw a sign's words through
  `phSignLabHtml` / `phSignDescHtml` / `phGdfLabHtml` / `phSymLab`, never `esc(label)`. Never capitalise the saved words or
  the pool: the sign pictures, the places, a Diagnosis match, search and the same-wording guard read them as written; a
  rename field opens on the saved words (`data-raw`), so an untouched rename saves nothing.
- A "Diagnosis:" sign names the condition only (her 2026-10-21, "fatty liver is not related to
  diarrhoea"). Symptoms a source lists with it are their own signs, reused from the pool and
  weighted on the formula; a condition the pool already has is that one row, never a second one.
  A diagnosis may keep words that describe the condition itself (cold-type, watery discharge).
  The same holds for any sign (her "yes, split them", same day): swelling or scant urine riding on
  a headache are their own rows; words about the same subject stay together ("Urine: yellow, scanty").
  "Tongue" (body) and "Tongue coat" are two subjects (the tongue chart's chips too, her 2026-11-02 pick: a coat row reads the coat's own Dry chip, the dry tongue row the body's). Her Bing pass: "with" = + (two subjects
  joined by "with" are split); a row that lists its parts with commas or "or" stays as it is.
  A classical one-name sign stays one row with its pinyin name in brackets, "Fever: with chills
  (fa re wu han)" (her "include in ()"); the lower back and belly row and Huang Qin Tang's
  against-pair "low energy, sunken lax pulse" stay as they are, unnamed.
- A second table for a Fang Bing Ren family that already exists merges into it (her 2026-11-09 "Keep them", Huang Qi): where both
  weigh a sign the higher number stays, and her earlier lines the new table does not name stay.
- No hover motion on the Fang Bing Ren board (her 2026-11-09 "this page is too laggy. remove the animation hover"): pointing at
  a symptom opens no picture, an area's icon does not wiggle, a faded row does not fade in. Its rows carry no `data-ks-pop`.
- A tick on the Fang Bing Ren page repaints in place (her 2026-11-09 "too laggy"): `phTriRefresh` builds the same HTML and `phTriMorph`
  touches only what differs. While one build runs, `phTriMemo` answers a repeated question once (`phTriEffective`, `phPatClues`,
  `phFbrRenLead`, `phTriAll`), so nothing called from `phTriHtml` or the cards beside it may change her data; `phFbrSignFam` is kept
  until `phFbrEditsBust`.
- On a phone the Fang Bing Ren board keeps Symptom · Bing · Ren (her 2026-11-09 pick A of three mocks): the table is fixed to the card,
  Bing and Ren 72 px, a cell is a 30 px box whose whole face ticks and whose ✕ is its own 28 px end, a link's word on a second line
  inside it, no score in the cell; the page's inner paddings are off (PHONE REDESIGN block). The Tongue & pulse block is the same table
  on a phone (her 2026-11-09 "fix the tongue & pulse block on phone too"): `phFbrTpAreaHtml` picks it when drawn, a shared Bing sign is
  one cell spanning its rows, and crossing 640 px redraws the page; the computer keeps its two lanes.
- Guide › Compare › Tables is drawn in the Guide picture table's order and look (her 2026-11-09 "i like this organisation and display. use
  it for the compare and table and cases display"): a body area head row, its subjects as paper rows, a Ren and a Bing sign of the same words
  on one row, each formula its Ren and Bing number columns, a number on a fill of its weight out of 5 (`phCmpPicRows`, `phCmpPicTblHtml`).
  Edit is the same table (her 2026-11-09 "how to make the edit table similar to the table display", then "what about coloured blocks inside
  the cell, totalling to 5, that will shade the cell", her pick C): a number cell is five blocks, the shaded ones its weight, the number in
  ink over them; a tap on a block sets that weight, a tap on the top shaded block again takes the sign off, Undo on the toast; the words
  keep a pen that renames the row (`phGdfMergeLabEdit`). The dot-row tables are gone. The Cases view keeps the other session's 14 rows with R / B lines and dots (her synth22
  list): shown three pictures (A those rows as picture tables, B as they are, C one full picture per case), she picked B, 2026-11-09.
  Her 2026-11-10 "give personality its own row": Ren is two rows in Cases and in Tour Cases, "Ren · physical & visual" then
  "Ren · personality & lifestyle" (`out.vis`, `out.per`, row class `ren` = no inner scroll); the Ren total stays on the first.
- Tour Case formulas (her 2026-11-10 "if there are cases with new formulas, add it to fang bing ren using the case info to add that fang bing
  ren details", then her popup picks): a Day 1 case whose formula Fang Bing Ren lacked has a formula of its own, built from that case only:
  each observation its match list (`PH_TC_MATCH`) reads as a catalog sign, at 3 (the weight Accept gives), on the side it matched; `src: [n]`
  names the case; its conditions go in `core` and score nothing. Six: Gui Ling Wu Wei Gan Cao Tang (Case 1), Chai Po Tang (3), Zhu Ye Shi Gao
  Tang (6), Gui Zhi Fu Ling Wan (7), Wen Qing Yin (9), Shi San Wei Xue Bi Tang (10); each case points at its own (`PH_TC_NEWFAM`, once, never
  over a family she picked). Her pick "Fair share": a `src` table is scored against the median book ceiling on each side (`phFbrCeil`) until
  its own is bigger, so it leads its own case and every other case keeps its order. Case 5 (three formulas at once) stays unlinked (her pick).
  Cases 2 and 11 are Da Chai Hu Tang (her own notes: "1. DCHT: ch20 hqin15 ...", "Dr HH still contined DCHT ... ZK was 20").
- Two families (her 2026-11-10 "some formulas can be in 2 families e.g. chai po tang is XCHT and BXHPT - so its both chai hu and ban xia"): a
  formula made of two family formulas shows in both (`also` in `PH_REN_FAM_GROUPS`); its colour, scoring and home stay with the first. Chai Po
  Tang also under Ban Xia; Chai Ling Tang and Shi San Wei Xue Bi Tang also under Gui Zhi.
- A case's formula is its base (her 2026-11-10 "some formulas from case studies have the base formula e.g. dcht and additions so its dcht
  modified"): `formula` / `fms` name the base formula(s) only; herbs added or a dose changed are `mod`, shown as "Modified" on the Book /
  lecture row and ", modified" in the By Formula names, never a formula in the filter list. `PH_TC_FIX` moved the Day 1 names once.
- Her notes' cases (her 2026-11-12 integrate33 with six Word notes, "add the following cases into the relevant days"): `PH_TC_HH` holds the 126
  cases of her Nanjing notes, each row its day and time by her timetable (Day 1 afternoon to Day 4 morning; her "HH Day 1" is the fifteen
  seeded). `phTcHhAdd` files them once (`s.hhV`), numbered after the highest case so far, ids "hh-" + the row key, each `added` (Edit and
  Remove work). An observation is saved as its words only (`{ text }`; the tag fields arrive when she correlates it): this origin's storage
  was 68.7% full on 2026-11-12 and the app warns at 75%, so a seeded case never carries the six-field notes. A recipe keeps her shorthand, as
  "Full name (CODE)" where the code is off the herb list or reads two ways; two prescriptions get a "1." / "2." line each. The wording is
  Claude's reading of her notes (a DRAFT, hers to correct in Edit). Her popup picks, 2026-11-12: "Same as the first 15" (a study-tour case
  sits in the app's code as written: no name; sex, age or birth year, diagnosis, the day seen); "Yes, all 22" (each formula Fang Bing Ren
  lacked has its own table from its cases, as the Day 1 six: built 2026-11-12, the next item); "On each formula's page" (the teachers'
  teaching points go to the formula each is about, marked with the teacher and the day: built 2026-11-12 as `PH_GDF_TEACH`, "Teaching
  notes" at the end of a formula's Guide card. The notes are HER words (spelling tidied only, her abbreviations kept): never reword
  one; a general teaching line only, nothing about one person in the room; a point about a formula Fang Bing Ren does not hold stays
  in her notes).
- The 22 note formulas (her 2026-11-12 pick "Yes, all 22"; BUILD-NOTES "the 22 formulas her note cases lead with"): a formula her note
  cases led with and Fang Bing Ren lacked is a `PH_FORMULAS` entry made from its cases only. Its table is every observation of those cases
  that the hand list `PH_TC_MATCH` reads as a catalog sign, each at 3, one table for all its cases (no weight from how often a sign came).
  A match line only where the note says the sign IS there: none for a denial, a drug's side effect, a change on the herbs, a grade or a
  number; a note with no sign in the catalog scores nothing; conditions score nothing. `src` names its cases ("hh-" + the row key): that
  makes it a case table (`phFbrCeil`) and links a case already saved unlinked to it once (`phTcHhFam`, never over a family she picked).
  Each also has a `PH_BTJ` row, its herb in `PH_REN_FAM_GROUPS` (last in the list; five have no herb here and sit "On their own") and its
  lines in `PH_FBR_AVOID` by the formula's own herbs (a herb one case only added is not counted). The tables, captions and card rows are
  written by a script from the hand list (mocks/hh-22-formulas-2026-11-12/: `match-new.txt`, `gen2.pl`, `build2.sh`; local only): to change
  one, change the list and run it again. All of it is a DRAFT reading of her notes, hers to correct in Edit. Her 2026-11-13 words: Chu Fan
  Tang and Ba Wei Chu Fan Tang are ONE formula (one page, `baweichufan`, both cases; never split them again; 69 formulas, 27 case
  tables); "mouth ulcers" is a Bing sign (`mouth_ulcers_now`), in a table only where a case's note says it is there.
- Her June 2026 tour (her 2026-11-13 "i had a tour in june 2026, add these cases too"): a second tour, `nanjing-2026-06`, nine days from
  Mon 8 June, 220 cases (`PH_TC_JN`, read from a colleague's notes of that tour). **Its cases are kept OUT of storage** (her pick): they
  join the list in memory when the app opens (`phTcJnJoin`) and the list's `toJSON` leaves an untouched one out of every save; a case she
  edits, correlates or links is saved whole; one she removes is remembered on the tour (`jnGone`). A case's number is the tour's `jnBase`
  + its row's place: **never reorder, insert into or delete from `PH_TC_JN`; add rows at the end only.** Never write code that adds a
  field to every case on read (every June case would then count as edited and fill storage): the test is `phTcJnPristine`, 220 of 220
  after opening every Cases view. Her picks: the notes' unheaded second session is Day 2 morning; "Day 7" is Sun 14 June; cases first,
  then ASK her before teaching notes or new formula tables from these notes. CGT in these notes is Chai Gui Tang (`chaigui`) where the
  herbs are Xiao Chai Hu Tang with Dang Gui Shao Yao San.
  Her 2026-11-13 picks after the cases: teaching lines on each formula's page (`PH_GDF_TEACH_JN`, folded "June 2026 tour"); a draft
  table for "all of them" (18 formulas, `src: ["jn-..."]`, as the 22); CQT is Chai Qin Tang (`chaiqin`). Yue Bi Tang with Bai Zhu or
  Cang Zhu in its recipe is Yue Bi Jia Zhu Tang; Ba Wei Jie Yu Tang is the app's Jie Yu Tang (`jieyutang`).
  The official timetable (her 2026-11-13 picture, June 8-19) REPLACES the day picks above: twelve days; the notes' Day 1 clinic is
  Day 1 AFTERNOON; the notes' "Day 7" is Mon 15 June = Day 8 (Sun 14 is Rest); `phTcJnTt` moves a case once, only if it still
  sits where the first filing (`PH_TC_JN_S0`) put it. The timetable says Fri 12 June is Rest; the notes' 16 cases of 12/6 stay there.
- Two colours (her 2026-11-10 "give chai po tang half ban xia and half chai hu colour in the circle and in the banner"): `PH_FBR_COLOUR_TWO`
  splits a formula's circles and banner down the middle (`sw` / `--cs`); table lines, board and scoring keep its own colour. Chai Po Tang only.
- A formula made of two halves (her 2026-11-10 "chai gui tang is XCHT with dgsys", her pick "Add it from its two halves"): `phFbrFromHalves`
  builds its table at load from the two book tables, every sign at the higher weight, `or` lines merged; a DRAFT until her own table. Chai Gui
  Tang (柴归汤, the blood-stasis Chai Hu) = Xiao Chai Hu Tang + Dang Gui Shao Yao San: under Chai Hu, and under Dang Gui Shao Yao San via `also`
  (a family with only `also` still gets its card, `phGdfHasCard`). It runs second behind either half alone; with both pictures it leads.
- Families chips (her 2026-11-10 "centre the chips, move all text to the left of the chip", pick A): the herb chip sits in the middle of its card
  (at least 62% wide, wider for a long name); in every chip the name starts at the left and the numbers stay at the right edge. Phone: chips in
  a row, sized to their names, unchanged.
- Chai Qin Tang (her 2026-11-10 "add Chai Qin Tang", her answer "XCHT + HQT"): `phFbrFromHalves("chaiqin", ...)` from Xiao Chai Hu Tang and
  Huang Qin Tang (柴芩汤), under Chai Hu, and under Huang Qin Tang via `also` (Huang Qin Tang stays its own family, her 2026-10-14). Two colours
  (her pick "Two colours, like Chai Po Tang"): its Chai Hu shade and Huang Qin Tang's red; words take the colour that reads best on both halves
  (`phGdfFgBoth`). Her 2026-11-10 "Chai Qin Tang is the heat Chai Hu": one of the Chai Hu kinds ("Together" in Quick assess), and its page opens
  "The heat Chai Hu".
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
  store (`phStoragePersist`) and keep the backups that carry photos. A
  backup file carries each photo's own fields beside its picture
  (`PH_REN_BACKUP_FIELDS`: date, shot, profile mark, file name ...); a new
  field on a photo record joins that list, or a restore drops it (2026-10-29:
  every tongue photo came back unlabelled).
- Zygomatic branch stays at one checklist item on the facial-paralysis
  checklist — she's declined a second, twice.
- **The face score has two doors, one score** (her 2026-11-21 picks): Profile › Checklist and the face exam rows under the face
  complaint on Came in for read and write the SAME `rec.facialScores` entry for the day. Never a second copy, never a second list
  of items: both draw `PH_FP_MOVES` / `PH_FP_SYMS` (her labels word for word). A face complaint = `phFpCcKey` (the Face / nerve tile, or
  words: Bell's, facial palsy / paralysis / nerve / weakness, face droop, Ramsay Hunt); it also fills the Case Neurological.

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
  long she's known them, or both with an override (foundation, Communications).
- Whether the Supportive tone applies outside the cycle track (stress /
  anxiety plans are a guess).
- Her review of the `PH_TP_DEFAULT_SESSIONS` numbers on the original
  built-in templates (the mechanism is live).
- Ma Huang, Da Huang and Fu Zi Ren rows were never checked against her own
  tables (Ren audit 2026-10-13): she needs to re-send them.
- Fang Bing Ren reference formulas waiting on her tables: Gui Zhi Fu Ling
  Wan, Chai Hu Gui Zhi Tang, Chai Gui Tang (her "blood stasis Chai Hu"; run 20's
  dry palms and soles line waits for it), Chai Po Tang (her "phlegm Chai Hu"), and
  the formulas her 2026-11-01 pointer list names (Si Jun Zi, Mai Men Dong, Huang
  Lian E Jiao, Li Zhong, Zhu Ling, Ma Xing Shi Gan and more: the run 20 note), and those her Huang Qi table names (Huang Qi Jian Zhong Tang, Dang Gui Si Ni Tang, a Huang Qi Shao Yao Gui Zhi Fu Ling Tang modification: the run 23 note). Huang
  Lian Jie Du Tang, Da Chai Hu Tang, Wen Jing Tang, Ling Gui Zhu Gan Tang, Wai Tai
  Fu Ling Yin, Chai Hu Gui Zhi Gan Jiang Tang and Chai Ling Tang are families now.
  Her Chai Hu kinds (2026-11-02) lead each one's card line (`PH_BTJ` arch): anxious
  (Chai Hu Gui Zhi Gan Jiang Tang), wet (Chai Ling Tang), blood stasis (Chai Gui
  Tang), phlegm (Chai Po Tang). A combination also joins `phFbrComboHtml`'s list
  (Xiao Chai Hu + its partner), so Quick assess names it when both halves fit.

**Paused or not built:**
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
- **Sizes:** run `.github/scripts/tap-audit.js` on every page the build touches, at 1220-1280px and at 360px, with its menus and
  boxes open and its side list open and folded; `off` is empty, or each line left is on the script's KEEP list with her word
  (TAPPABLE THINGS, "Measured"); then look at the page: nothing squeezed or sitting on top of words.
- **Look:** run `.github/scripts/style-audit.js` on every page the build touches, at 1220-1280px and at 360px, the page drawn with its panels open: `offSizes`, `sideLines` and `rowAlign` are empty (`rowAlign`: no row's boxes wrap, spill out of their cell, or sit off their column head, her 2026-11-19), and each `offColours` line is on purpose ("One page standard" and "Shaded blocks, four colours", under Fit the screen).
- **Words:** run `.github/scripts/voice-audit.js` on every page the build touches, at 1220-1280px and at 360px, menus open: `off` is empty (no "e.g.", suggestion words, hints, how-to lines, explaining sentences or text links), or each line left is on its KEEP list with her word (ABOUT-ME.md "HER DESIGN PROFILE"; her 2026-11-21 pick: a build is not done until the list is empty). Text she wrote or a patient's letter takes `data-voice-skip`.
- **Private:** nothing private goes in this PUBLIC repo or the page it serves (her 2026-11-22: "keep private info local and erase any public info"): no money figure, rate or split, no person's name she pays or works with, no login name, no personal number, no default typed in the source for any of them. A value the app needs comes from HER saved settings (Prices card, Settings). Run `.github/scripts/private-audit.sh` before a build is done: it reads her private terms from a local file outside every repo (the script holds none) and `publish-live.sh` stops a publish on a hit. A new private term goes into that local file (Claude's memory folder, `private-terms.txt`).
- **Top bar:** run `.github/scripts/titlebar-audit.js` on every page whose bar the build touches (a new control in a head, a changed head, a new page), at 1220-1280px and at 360px, menus open; `off` is empty ("TOP BAR", under Fit the screen).
- Write the build's note at the END of BUILD-NOTES.md (her words, her
  picks, where the code lives, what was tested and what was NOT); fix any
  standing rule here, or the area's paragraph in CURRENT-STATE.md, in the same commit; update
  memory.
- Commit your own hunks only (Deploy & git). Push only on her "push live".

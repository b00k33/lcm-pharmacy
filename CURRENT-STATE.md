# LCM Pharmacy — current state, by area

Moved out of CLAUDE.md on 2026-10-28 (her pick: the rules file loads into every session; this part is read when a page
changes). CLAUDE.md's rules win over anything here. **Before changing a part of the app, read its section below in full.**

What each part of the app IS today (checked against `origin/main` and
BUILD-NOTES.md on 2026-10-21; shortened 2026-10-27). For how a part got here, or its function
names in detail, grep BUILD-NOTES.md for the heading named in brackets.
Anything unsettled is in OPEN at the end of CLAUDE.md.
**Keep it current, not a log:** when a build changes a part, rewrite that part's paragraph to say what it is now (her
decisions, the rules, the code names), never add a dated paragraph after it. Mock names, build numbers, commit hashes, step
labels and "her N picks" belong in BUILD-NOTES.md; here a decision is "(her pick)" or "(her word)" plus a short quote when
her words set the rule. Anything not live or not built says so.

## Sidebar (the app's menu)
Her picks [Sidebar tidy-up]: "The clinic" over her name; a **Find a page** box (filters, gold letters, Enter opens, Esc clears);
Every day + Every week open, in her "Grouped by rhythm" order; **Records · Reference · Admin** each one folded line (label · count
· chevron; remembered on this device in `daybook-ph-sb-folds`; the page's own fold opens); no Minimise row (the leaf at the top
minimises); one bottom row: the clinic pill + a gear for Settings (the drawer: "Settings" with its word). Code: `phSbFoldsPaint`,
`phSbFind`, `phSbNavFit` above `renderPhShellNav`.

## Appointments & calendar
The app opens here. It mirrors Cliniko's day view: solid blocks coloured from `PH_CLINIKO_TYPE_COLOURS` (her Settings →
Appointment types, 21 types read live; words white or dark, whichever measures higher, `phCkInkByContrast`, her yes), a time
gutter; the page scrolls, no inner scroller (except "Whole day" below). Grid opens by default at every width (List a tap away). A
"long day" (≥600 min span) gets a minute-precision map (45+min gaps fold to free bands). Range: 30 minutes before the earliest
booking on screen to the last booking's end (half hours; 4 hours at least; nothing booked = 7 AM to 9 PM). The live "now" line
ticks only while the tab is visible.
**Seamless (her picks) [Appointments grid: seamless]:** on a computer the hours fill the window (`phApptCalPxm` from the room
`phPinApptZones` measured, one redraw when it changes; a phone keeps 66px an hour); blocks edge to edge, 6px corners, a 1px white
seam, no shadow, hour hairlines only, no today wash; hover brightens, nothing grows; overlapping visits nest (a later one over the
earlier from 45% across), visits that start together share in halves (`it.same`); her events are solid blocks sharing the time
with the visits ("My events" below); the day head is a small MON over a big date, today's in a teal circle, no count on it (its hover, `phHubDayTitle`, lists each clinic's hours and patients).
**Toolbar + Up next buttons (her picks, Zanda as inspiration) [Appointments chips, one height]:** every control 32px; text
controls are 6px boxes (white, thin line, picked = solid), icon-only buttons stay circles, text at the app's own sizes; ‹ › then
the date in full in teal (`phApptCalDateLong`), Today always there (greyed on this week), the day count a "7 days ▾" dropdown
(`.ph-atb-dd`), Grid | List a joined box bar, search with the magnifier; Up next = Open (solid) · Profile · Edit in one row, then
Call · Text · Email circles (`.un-row3`, `.un-icons.circ`).
**One height, app-wide:** this 32px box look departs from TAPPABLE THINGS' pill chips on her word, and every page follows it: the
Next button, patient rail, search boxes, small pills; Fang Bing Ren + Ren (each sign a white 32px box, the ✕ its own end); the
exam pages (Today's visit, Ask her, Tongue, Pulse, Abdomen, Medical history); Treatment, the Care Plan and its pain map, Timeline,
Messages (a message group over 6, or one that would wrap, is a dropdown), Musculoskeletal, the Guide, the To Order board,
Inventory's in-row cells, Cycle, visit filters, Diagnosis colours, Dashboard, the Up next fold, every other page [Every other
page, one height]. The new prescription form (Name, Ingredients, Notes, Save; shared by New formula recipe, New patient and the
open recipe's add row): tinted 32px fields, + Add a Button so Save is the one solid one, the band's plain title not a field, the
phone's 12px gutter. No emoji on any page (icons are the sprite).

**Phone: Google Calendar's spacing (her picks; ≤640px only, the computer unchanged) [Phone calendar: Google's spacing].** ONE
toolbar row (`phApptCalPhoneBarHtml`): ‹ [Tue 27 Oct ▾] › · today's date in a circle · Me · 🔍. The date ▾ holds Day 3 5 6 7, Grid
| List and Both clinics; 🔍 swaps the row for the search box, its ✕ closes it and clears the search (`phApptCalSrch`). The Day view
has ONE date row (`.ph-apptcal-head.one`): MON over the date in the time column, the day's chips beside it (birthdays, ⟳,
before-hours items: `phC22FoldRowHtml(…, bare)`), the cycle day at the right; 3+ days keep two rows. Time column 64px, hours 11px;
3px between blocks (a clear 1px top and right edge); the name first (14px), then "10:00 · focus" (12px); her events' names 14px,
two lines when tall; no card (edge to edge, blocks stop 16px short of the right edge); text inset 7px, 66px an hour. The Saved
pill stays as it is (it fades after 2 s).

**Appointment popup** (any booking tap): avatar, name, time/kind/ET pills, a plan picker, a gold "✦ New to you" flag, chips Full
profile / Call / Text / Cancel, then one summary line that unfolds the detail rows (Focus, Herbs, Logged, Cycle, Scan) with Book
another / Edit at its foot. A positive-hCG flag (🌸 + gestational week) shows in the popup and on Grid blocks once
`rec.pregTest.result ===
"positive"`. Edit opens on an autofocused Date field (no separate Reschedule). The Service field is a `<select>` of the 21 Cliniko
types + Home Visit/Break + "Other — type it…".
**List view**, desktop (>900px): a lean list with a sticky card beside it (row: colour strip, time, name + practitioner tag + one
line of focus, the plan as a pill in its family colour, a status dot; the card: plan buttons, cycle day, focus and goal in full)
[The Appointments List: a lean list with a card beside it]. At ≤900px the compact one-line row and the phone stack are the older
code. A single-day List appends the day stats + "Herbs to prepare today" and the cross-patient **Today's IVF work** list.
**"Up next" card**: the next booking today, countdown ring, cycle/IVF gauge, visit ring, herb-jar state, "✉ Send online form". No
lens chips (Everyone/Herbs/Cycle & IVF/New to you/Home visits); at Acupreg only, a practitioner chip row (Everyone · Anni ·
Charlie · Christine · Linh) dims the other bookings, each booking's practitioner taken from the weekday [Practitioners on the
Acupreg calendar].
**The column beside the grid (her picks) [Appointments column]:** on a computer a 44px rail on EVERY view; a rail tap opens the
column in place (360px, the calendar narrows; the chevron or a tap elsewhere folds it). Open, it is as tall as the grid: the Up
next card (the ring beside the name, the phase bars in the visit line) over one joined bar **Herbs · Patient · Me** and one panel
that scrolls inside itself. Herbs = today's herb bookings (time · name · jar, a tap opens the prescription, "✓ n dispensed"
folds); Patient = plan · focus · goal · herbs · logged · last · scan + Book another for the Up next patient (opens first); Me =
today's doses, meals, fasting, to-dos (the Me chip still opens the drawer). The day's numbers stay behind the day-head tap (her
pick). **A booking tap opens its card INSIDE the column** (her "i only need one", "move floating card to the rail", "remove
floating card", "Card inside the strip"): over 900px on the Grid the one appointment card (`#phApptPop`, `phApptPopDock`) sits in the column, which widens to 360px while the calendar narrows; no
scrim, so the next booking's tap swaps the card, the same booking again / ✕ / Esc closes it. The column never shows a "Selected"
patient. At 900px or less the card floats beside the block (a bottom sheet on a phone).
**The Appointments dialog** is built once and patched in place: two panes (add | booked ahead), a Quick add | Paste list switch,
day chips, Home visit / Repeat toggles, trash + Undo toast; never `phFlashShow` or `renderPharmacy` inside it [The Appointments
dialog: built once, patched in place]. One paste can hold many patients (a name line above each block); a patient's own
Appointments page has "Paste appointments", the same dialog for that patient only.

**Home Visit** is its own colour family (`PH_LCM_OWN_TYPE_COLOURS`) with an away bar on every surface a booking shows — a bridge
until she books home visits in Cliniko, then move it into `PH_CLINIKO_TYPE_COLOURS`. **Acupreg** paints every booking sage
`#8AAB99` (a LOCATION colour, in `phCkStyle`, not `phCkTypeColour`); Home Visit still wins over it. Enquiry/Meeting rows get a
quiet grey "not a treatment" pill.

**C22 on the grid (her picks) [C22 + LCM Appointments]:** both apps share one origin, each READS the other's localStorage and
writes only its own keys (never a `book33-*` key here). This app writes `lcm-appt-digest` (bookings today-7..+35, focus / goal for
14 days, keyed by a hash of the login; local only, never synced, swept by `clearLocalData`, skipped while `lcm-data-owner` is
empty) and reads C22's `book33-cal-digest`. Her events (C22's and the Me store's alike, `phC22DayLayout`) carry the group glyph
`i-c22-*`, no edge, never dashed, drawn as solid blocks ("My events" below); 4+ of hers in one hour share one stack (the count +
each one's glyph), its card a row each opening that item's own card (`phC22StkHtml` / `phC22StkPopHtml`, "stk:" ids); outside the
patients' hours a one-off folds to a chip in the row above / below the grid (two at most, then "+N"); C22's Clinic block is left
out on a day this login has bookings; a tap opens a small card with "Open in C22" (`?nday=`). A Sunday she does not work returns
to the 7-day view while it has a one-off of hers (not on a login with fewer than 5 work days). C22's "Open in LCM" lands as
`?appt=&d=` (`phApptDeepLinkBefore`). Code: "C22 ON THE APPOINTMENTS GRID".

**Me: her own things live here** (her word: "i dont use c22. i use lcm calendar the most. i want things to be in one place") [Me:
her own things live in LCM]. Her events, routines, birthdays and to-dos are LCM's own, in `lcm-me` (NOT daybook-prefixed: both
logins show it, it survives a location switch) and ONE cloud row `public.lcm_me` id `linh` (`supabase/me_setup.sql`; RLS = the two
login addresses in `members`), merged entry by entry (`up` stamps, `del` tombstones, `rev` for crossed writes; every write waits
on `window.__lcmOwnerOk`). "Bring in" in the Me drawer copies C22 once (C22's keys only READ; C22 is then set aside: its digest
stops drawing here). The grid shows **Events** by default; Off · Events · All in the drawer (`lcm-me-layer` 0 / 1 / 2). The **Me**
chip (Grid, List and every other page's top bar, phone included) opens the Me drawer (non-modal, right side under the title bar; a
bottom sheet on a phone): her card first ("One Me" below), the level bar, Today's meals + Shopping ("Meals + the Diet log" below),
Herbs (a tick per dose today, "Herbs (her own doses)" below), her Cycle / Fasting / This week rows, Bring in, to-dos (type +
Enter, tick = done with Undo), the next 14 days of birthdays, her **Routines** (today's first, then by time; 5 then "All N ▾"; a
row opens the whole routine in Edit, `rt:<id>`, with no This day | Every day). Her item's card = Done · Edit. **+ then Patient |
Me:** the Appointments dialog's title bar switches to the Me pane (Event · To-do · Birthday, This day | Every day on a repeating
thing, colours = her C22 Modes then C22's groups, "Coming up" beside it); every save and delete has Undo in the one toast. Code:
"ME · HER OWN THINGS LIVE IN LCM".

**One calendar, work + life (her picks) [One calendar: work + life].** **The row above each day** (`phC22FoldRowHtml`): a birthday
= cake + name + the age it turns (`phC22BdayChipHtml`, tap = the birthday card), then the day's one-offs outside the patients'
hours, then ONE ⟳ chip for its routines whose ring fills as they are ticked (`phC22RtChipHtml`; tap unfolds that day's chips, ▴
folds; at All they are plain chips); the row below holds the evening the same way. A routine that meets the patients is a block
like any of her events. **Her cycle day in the date line** (`phC22CdHtml`): "CD n" beside the big date, read from HER OWN patient
record through the Cycle page's own reads (`phMeCycleAt` = `phBbtCycleStarts` → `phCycFacts` → `phTpCycleCompute`; derived on
read, nothing stored but the record's name); a period day is rose with the drop, the expected period a dashed rose pill, nothing
three weeks past an unlogged period; its card = Day n · phase, one line ("Period in ~3 days · 28-day cycle"), **Period started**
(the Cycle page's `phCycleLogPeriod`, days up to today only; corrections on the Cycle page) · **Cycle** (her own Cycle page).
Which record is hers = **My profile** in the Me drawer (`lcm-me` `profile`, synced like the rest, so both logins read it), with a
Cycle row "Day n · Phase · L-day" opening the same page. Once named, her card opens her record (`phMineOpen`, past the no-plan
gate), a ✎ circle opens the box to change it (`phMeProfEd`), Fasting and This week open through the same `phMineOpen`, and the
Today's meals heading's › opens her Diet page (no Diet chip). Every card of hers on the grid (an event, a routine, a meal, a herb
dose, a trip row, her cycle day) ends in a **row to her record** (her "i want to access my personal profile by clicking on my
personal events"): her initials, her name, today's cycle day, › (`phMeRecRowHtml`, added by `phApptPopRender`); it opens her
record, or the Me drawer to name it when none is named. **Drag** (`phDg*`): her own blocks and bands move (15-minute snap, a time
tag, across days in the week view) and stretch (bottom edge); a routine's drop is a this-day change and the toast offers "Every
day" beside Undo (`presSavedToast` `o.acts`); a dragged PATIENT block drops into Edit prefilled with the new day and time and Save
confirms (Cliniko stays the truth, nothing moves silently); on a phone a long-press lifts (the page held still). Code: "ONE
CALENDAR, WORK + LIFE".
**My events: solid blocks** (her "my personal events look too small and insignificant and hard to differentiate", then "solid
block like patient blocks"). Her events (one-offs and routines) are SOLID in their own colour (her Mode colour or group), white or
ink words by measured contrast (`phC22Ink` → `phCkInkByContrast`), and share the time with the visits like another booking
(`phC22JointLay`): blocks that start together split the width evenly, a later one sits over the earlier from 45% across; a cluster
of visits alone keeps its own layout. Done = faded + ✓. The chips above and below the day are solid too, 26px. In a narrow block
the name wins over the time.
**Whole day** (her pick: "improve the ui so i can view the whole calendar including morning hours out of clinic hours") [Whole
day: the grid scrolls]. On a computer with her own things showing, the grid runs from the hour before her first timed item on the
days shown to her last (an overnight one, Sleep, shows as it starts), every hour the same size (no long-day map). The clinic's
hours (widened to any of her blocks that run over their edges) still fill the window, so the grid scrolls inside itself: it opens
there (on now when today is shown and now is outside the clinic's hours) and keeps her spot, as a minute, through every repaint; a
new set of days opens on the clinic again. Hours outside the clinic sit on a faint grey; a "^ n" / "v n" chip at the top / bottom
edge counts the blocks out of view, a tap scrolls to them. Her timed things sit at their own times; the rows above / below keep
only the untimed ones (birthdays, all-day, trip to-dos); the ⟳ chip shows only for an untimed routine. **The phone is unchanged**
(its page scrolls, never the grid; the rows above / below and the ⟳ as in "One calendar"). Code: "WHOLE DAY" (`phApptCalWd*`).

**Both clinics on one calendar** (her picks + the Friday hand-off) [Both clinics on one calendar]. Each login keeps its own herbs,
patients and prescriptions. On BOTH logins the grid and the List also show the other saved login's bookings that are hers (that
clinic's own weekday rule, `phOthHers`), in that clinic's own colour (Acupreg sage, else Cliniko type colours) with a clinic tag
where a practitioner sits; a tap opens a small card with "Open in <clinic>" (switches login, lands on that booking). The **Both
clinics** chip (beside Me, Grid and List) hides them, remembered on this device (`lcm-both-clinics`). The day heading's hover and the
List count both clinics; Up next, the Day summary, herbs to prepare, the Dashboard and Communications stay this login's. **Paste:** each
pasted line carries a clinic chip (tap to flip): on CBD a Friday goes to Acupreg; on Acupreg a non-Friday goes to CBD unless it is
a colleague's day; a paste from a patient's own page, and a Break, stay. A line sent over is saved on this login (`apptHandoff`),
shows at once as the other clinic's, and the other login takes it into its own bookings (same id, through `phApptImport`) the next
time it is open anywhere. The device needs both logins saved. Code: "BOTH CLINICS ON ONE CALENDAR" (app) + `othRead` (sync).

**The 60-day appointment prune is gone permanently** (her "stop pruning, keep everything"); if the ~5MB quota is ever hit, the fix
is a slim stub, never a cutoff.

## Treatment Care Plan
**The plan is the spine**: patient → plan → prescriptions. Each phase carries Aim / Points / Formula / Watch / Cadence, dated
automatically (`sinceKey`/`doneKey`).

**The page** (`presTpPlanTabBodyHtml`) = a band over the left column (Findings, then one card: the scans line, the pain map small,
Also treating; `phTpCcSideHtml`) | the plan (side by side from 1280px; stacked below, that card last) [Care Plan = the findings
beside the plan] [Care Plan page tidied]. Band: title (tap = rename), stage pill, **Course · <template> ▾** (course picker
`phTpProtocolPickHtml`; also "⇄ Change course" in ⋯), ⋯ (short, More ▸ fold; `phTpPlanMenuHtml` = the Care Plan, Treatment and
Dispense menus) [Care Plan page "Case | Course"]. Every shown title (band, patient header, plan tabs, appointment pills / lists,
Today's visit, Treatment, print record) = `phTpTitleShown(name, plan)`: hers once renamed, else the main concern's words (on the
plan treating it, or one with no course), else the course name; `plan.title` is never rewritten.
**Findings**: Came in for, Ren, Tongue, Pulse, Abdomen, Cycle, Ask her, Blood tests, History, Musculoskeletal, each via the app's
own renderer; purple dot = changed since last visit; tap = its drawer, + Watch / + Aim, lines to the diagnosis it feeds.
**The plan** writes itself from the visit, in visit order, each part's buttons on its heading line (her picks): **Treat**
(`phTpTreatHtml`: ONE table, a row per Compass concern: ★ if starred · the concern · first → now + Better / Same / Worse · the bar
to the gold target mark (Watch's own reading, `phTpWatchData(...).cc`) · target ▾; the Goal words sit in the hover unless she typed
her own, which shows under the name; ✎ edits them; a plan-level Goal she typed, or a booking's, wins and replaces the table) ·
**Diagnosis** (Patterns · Fang Bing Ren · ✎ on the heading; Likely / Possible bars: a pattern per line with its level and a small
concept picture, the first for the plan's own condition (all 29: women's health, pain / muscle, face / skin, stress / sleep /
weight / immune / men's), each opening big; its signs under it as quiet tags with their `PH_PAT_SRC` icon; then the leading
formula line (`phTpFxFmRowHtml`) and Progress (`phTpProgressHtml`: one faded "Progress not yet" line until the first snapshot)) ·
**Watch** (what Treat does not show) · Course (Session grid). **The pain map** sits small under the findings (the same figures
only, `phTpTilesHtml(..., "sm")`); Open, or a tap on it, draws it full size under the grid with only its heading left above
(`phTpCcUi.pmOpen`, `phTpPmToggle`, both cards repaint in place). Empty part = faded "not yet". The door starts the plan from the
main concern (no template pick, LAW §2). Formula + Points stay in the grid's live-phase row (Aim · Points · Formula · Watch): the
grid is LOCKED.

**Watch** (`phTpWatchHtml`; its reading = `phTpWatchData`) = the Compass rows in order (`phCxModel(..., { all: true })`): each
concern's first score → latest + Better / Same / Worse; signs; the diagnosis's told signs (unrated = Yes, or "New" if not in the
plan's first progress snapshot); measured rows; the live phase's red flags with their last answer. A scored concern has a target
bar (baseline → gold target mark). On the Care Plan the concerns' rows show in the Treat table (`phTpWatchHtml(..., skip)`), so
Watch draws the rest and is left out when nothing is left.
**Told signs** (her pick): signs behind the Diagnosis that the patient tells her (cycle log, usual answers, notes, diet:
`phCxToldList`) are Compass sign rows in their body area (own subject, else the area of a Fang Bing Ren sign filing the same
clue), rated Gone · Better · Same · Worse from the next visit, saved with the signs under `pc:<clue key>`, never behind "+ N
more"; ▾ = Not watching only. Left out (another row stands for them): Fang Bing Ren answers, the pain map's words, Energy, "Came
in for", the period-pain clue. Not on the letter's symptom rows (`phCcSeedSymptoms`).
**Measured** (`phCxMeasList`): tongue / pulse / abdomen signs behind the Diagnosis (incl. such a Fang Bing Ren answer) against the
plan's first dated chart of that part when it has 2+ (Yes → Yes Same, New, Gone Better); a blood marker out of range on a result <
12 months (first flagged → latest, target = its range) or behind the diagnosis by her rule (against her number); a movement < 80%
of normal range (target = normal degrees); a positive test. READ from their pages, never rated (one read per fact; no Better /
Same / Worse on Tongue or Pulse): the Compass's **Measured** block (before the red flags) and Watch; tap opens the page
(`data-flow-prof`). Tongue / pulse reads are shared with Patterns (`phPatTngFlags`, `phPatTngVisitWords`, `phPatPulseKeys`).
**Targets** (`phCxTgt`): pain or a 0–10 complaint = 2 or less, % better = 80% better, Energy = 8 or more; a target ▾ on each
Treat row (its options say the value, under the Target column), hers bold with ↺ auto (`mainTgt` / `secondary[].tgt` / `painMap[i].tgt`, `{ v, k }`; another kind reads auto). Signs
carry no target.

**Diagnosis + Goal write themselves** (`phTpAutoDx`, `phTpAutoGoal`): every Likely or Possible pattern (+ any she agreed) minus
those she took off; Goal = a line per complaint in Compass order (her Goal cell, else auto; a pain names the place, "Reduce upper
back pain", never bare "Reduce pain"), the plan's own line first when no complaint carries it. **A phase's Watch + Aim too**
(`phTpFieldView` = the one read): Watch = the template's **Red flags** first, then chips from main complaint, secondaries, cycle
(women who track one only), findings; Aim = her preset per template phase with `{main}` `{sec}` `{cyc}` tokens. All four derive on
read, never stored; her typing makes a field hers, with "back to auto". + Watch / + Aim on a finding adds her line after the auto
ones (`ph.watchPicks` / `ph.aimPicks`, `phTpFieldPick`); the field keeps following the patient; back to auto keeps those lines.
Wording: Settings → "Goal wording" / "Watch wording", her lines first, all DRAFT [Watch and Aim write themselves from the
patient].
**Red flags** (her picks): Watch's "Red flags ▾" (this phase's template lines, this condition's other phases, every other
condition) ticks a line onto the phase (`ph.rfPicks`, red chips with ×). Today's visit asks them at the BOTTOM of the Compass, No
· Yes each (`phRfCxRowsHtml`: the template phase's lines that send her somewhere + her ticks; answers in
`rec.ccTrack.days[day].rf`). Yes = "⚠ Red flag today" on the patient band + a red line in that day's visit row [Red flags in Watch
and on Today's visit].

**Shorter profile** (her "minimise any redundant display and messages"; outside the grid): a finding with nothing on file folds
into one faded "not yet" line of chips opening their pages (`phTpFxNoneSplit` / `phTpFxNoneHtml`; Care Plan Findings, Treatment's
"How <name> is"). Also faded "not yet": Progress before the first visit ("Progress · not yet"), Today's visit tiles, an empty
Visit record. Medical history rows tag "FBR" (words in the hover); its "✓ All" hovers "Asked all: the rest are No". Visit checks'
empty cell = "–"; Tongue & pulse empty runs = "–" (words in the hover). Patterns' "Only on one side" band has no explaining line.
Fang Bing Ren's two band names are said once, over the board ("Same fact, today and usually then Only on one side",
`.ph-bd-key`); in an area the twins come first, a dashed line starts the one-side lists. Tongue & pulse rows drop "Tongue:" /
"Tongue coat:" / "Pulse:" under their group heading (noSubj, as other areas). A sign only "present" (Cough: present) = a ✓ under
its heading, words in the hover (`phSignDescHtml`). "Skip for now" has "— see her profile without a plan" in the hover only; the
Ren heading reads "→ <formula>".
**Copy notes** ends with the plan (`phCnPlanLines`): Treat (each concern + target), Dx (her words, else Likely, then "possible:
…"), Watch (`phTpWatchData(...).txt`: first → latest and its word, a rated sign's word, measured rows, a red flag answered Yes),
Phase (`phCnPhaseText`: "Acute 2/4"; on the day a review moved it "Acute 4/4 → Subacute" / "· staying 2 more visits" / "· plan
closed"; a cycle plan names its phase only).

**Course length** (her pick): the no-plan door has "How long" chips under Came in for: Weeks / Months / 6–12 months / 1–3 years /
Longer (`PH_CC_LEN`) = the main concern's own How long (`complaint.since`): lit chip = the band its date falls in (`phCcLenBand`);
a tap writes a "~" worked-out date via `phCcMainSinceSet` (her own date stays if in that band). The band adds visits to the first
two phases when a course starts (`presTpInlineCreate`, `phTpCreate`) or is swapped (`phTpCourseLenApply`): 6–12 months +1 / 0, 1–3
years +1 / +1, longer +2 / +2, only to a phase with a count; cycle courses keep theirs. Start reads "Course · Low back pain · 3
phases · 9 visits".

**Blood tests + IVF in the diagnosis** (her picks): **Paste the report** (beside + Add result) reads report text into the
new-result form (`phBldParse`: marker name, the number after it, the lab range on that line, the collection date, never the date
of birth), filled gold for her to check, listing units to check and lines not read; nothing saves by itself. Under the results,
**Results that count · every patient** (`phRcTableHtml`): wired rows first, read-only (Fang Bing Ren's blood signs `PH_TRI_BLOOD`;
Patterns' iron / thyroid reads `PH_BLD_PAT_IRON` / `PH_BLD_PAT_THY`), then hers: a blood marker or IVF number (`PH_IVF_NUMS`)
below / above her number → a pattern (`PHARMACY.resultRules = [{id, m, op, v, pat}]`). Met by the latest value (blood result < 12
months; latest round with that IVF number), a rule is a Patterns clue "rc:<id>" with `.pat` (`phRcClues`, added in
`phPatCompute`): it counts for that pattern and is a tag in the Diagnosis ("AMH 6 pmol/L · low", "IVF: 3 eggs, 2 rounds · low")
and on Patterns, whose clue list has Blood tests and IVF history groups.

**Patient plan** (her pick "Print AND email, from Messages, she sees it before it sends"): "📋 Patient plan" (plan ⋯ menu, and
beside "✉ Patient letter") opens one page in the letter's place (`phTpLetterOpen === "plan"`, `phTpCplModel` /
`phTpCplSheetHtml`): Your care plan · <main concern>, date; What we're treating (each Treat row + target in the patient's words:
"to 2 out of 10 or less", "80% better", "8 out of 10 or more"); Your course · about N visits (each phase · weekly / fortnightly /
monthly × visits, live one gold); See your GP straight away if (the live phase's red flags up to the dash, or her own Watch
wording); Your herbs (the phase's formula, else the prescription's, with its dose sentence); her sign-off. 🖨 Print = `phPrintDoc`
of it. ✉ Email = a mailto to the address on file, page as text ("Dear <first name>," first), plus the same message prepared in
Messages (`phMsgPrepare`, context careplan, label "Care plan") for her to tick Sent; no address = "No email on file". The
stage-by-stage Patient letter is unchanged.

**Phase review** (her answer "Ask me first"; bookings count as visits, `phTpPhaseSessionDates`) [Care Plan part 3, step 1]: from
the live phase's last planned visit on, logged or not, Today's visit shows a gold card above the Treat row (`phTpPrvHtml`): "Acute
phase done · 3 of 3 visits", Watch as better / same / worse counts (`phTpWatchData`), the main concern's line + target, then
**Move to Subacute · fortnightly × 2** / **Stay 2 more visits** (half the phase again, rounded up); last phase: **Close plan** /
**Stay N more**. Nothing pre-picked; her tap acts at once (`phTpPrvDo`): writes the review to `plan.reviews` (note +
`prv: {ph, head, sum, out, undo}`; Review notes and the printed plan show it), moves / adds visits / closes; the card then reads
"✓ Moved to Subacute" (+ "🌿 <formula> · ready to dispense" if the new phase has one) with **Undo** (`phTpPrvUndo`: phase, count or
plan back from `prv.undo`, review removed). A Move past the planned visits ends the phase on its planned-th visit and starts the
next the day after (later visits count for the next phase); Close ends the phase today. A Compass score or target change repaints
the card in place. Cycle plans: no card (they follow the calendar). **Logging a visit moves nothing** (the session-log move-on and
the Treatment tab's auto-move banner are gone).
**Course end** (her answer "The patient only"): the last phase's review card (and the closed plan's, same day) shows the course:
"Course done · 10 visits over 12 weeks" (`phTpCourseStats`: all phases' visits, weeks since the first phase began), a Treat ·
Start · Now · Target table (`phTpCourseRows`: each Compass concern's first and latest score, "✓ 2 or less" / "not yet"), then
Close plan · Stay N more · **Ending letter**. The letter (`phTpLetterOpen === "end"`, `phTpCelModel` / `phTpCelSheetHtml` /
`phTpCelText`) uses the patient plan's page and doors (🖨 Print, ✉ Email into Messages as "Ending letter"): Your treatment · <main
concern>, date and visits, Where you started, where you are ("Low back pain: 7 out of 10 → 2 out of 10"), From here = the last
phase's own Aim, See your GP straight away if, her sign-off. No GP copy.

**Next visit** (her answer "Show the date to book"): once today is logged (✓ Complete session), Today's visit has a **Next visit**
line under the three steps (`phTpNextVisitHtml`): "Subacute, fortnightly" + a chip with the next day at today's booking time ("Tue
10 Nov · 09:00") that copies "<name> — Tue 10 Nov 2026 · 09:00" for Cliniko; **Pick a day** (changes the chip in place, not
saved); "Herbs last to Sun 8 Nov" when the latest dispense runs out before it. **LCM books nothing**: the Cliniko paste brings the
booking in. A booking already ahead reads "✓ booked · Tue 10 Nov · 10:00". The day = `phTpNextDue`: her next booking (any,
whichever phase window), else the plan's next session day (one on today only when she has no visit today). The Care Plan's live
phase line adds "· next due 10 Nov · not booked" (or "today") while nothing is booked ahead. Treatment's Then band, once today is
logged, names the same day; main button **Copy for Cliniko** (with the time), "book in LCM" the quiet one.

**Today's patients, plan first** (her answer: the List, the booking card, Up next): a booking TODAY shows its plan and what is due
(`phApptPlanDue`, read on demand, nothing stored; other days show nothing new; the Dashboard stays herbs-only): live phase + visit
("Acute · visit 3 of 3", List rows only) and tags **Review today** (gold, review card waiting, `phTpPrvCtx`), **Re-score N**
(Compass rows not scored today), **Ask: <first phrase>** (a live-phase red flag never asked; whole flag in the hover), **Herbs ran
out 20 Oct** / **run out today** (latest follow-up's run-out day, within 60 days). On: the List (lean row's name cell; the compact
29px row gets a second line only on such a booking), the List's card under Treatment plan, the Grid's popup under the condition,
Up next.

**Herbs follow the phase** (her answer "Fill it in, ready"): the due prescription (`phApptScriptFor`: Dispense from Dashboard / Up
next / the List, the Dashboard's herbs to prepare, Up next's formula line) is the live phase's own formula (`formulaId`) when the
patient has it, ahead of the phase-tag and last-dispensed rules, so after a phase move the next phase's prescription opens. A
formula-less phase after one with hers offers **Same as <that phase>** beside Design / Link formula (one tap links it;
`formulaHistory` keeps it). Nothing clinical from the app: a phase she never gave a formula stays empty.

**Cycle review** (her answer "At her next booking"): a cycle plan (`PH_TP_CYCLE_TEMPLATES`) with 3+ period starts gets a gold card
above Today's visit's Treat steps (`phCycRvHtml`): "Cycle 4 against cycle 3": Length 33 → 29 days and Flow heavy → moderate (only
said), Pain severe → moderate and Clots many → small (most clots logged on that cycle's days, `rec.cycleSigns`), both lower =
better, higher = worse. Saved to `plan.reviews` the first day it shows (`cyc: {lmp, n}`, note = the same words), one per period;
not shown after that day. No BBT shift (no per-cycle read in the app yet).

**IVF dates move the IVF plan** (her answer: egg collection + transfer + Stims start): an IVF plan's calendar day popover has
**Mark as stims start** (`row.stimsStart` / `stimsEst` on the plan's IVF history round, `phIvfDatesRead().stims`) beside egg
retrieval and embryo transfer. `phIvfDatedPhases` = phases her clinic dates put on a day (the cadence ones + the stims phase,
Follicular — Week 1 or one named for stims, on Stims start). A typed date moves the plan; so does the day ARRIVING
(`phIvfDaySync`, read by Today's visit and the Appointments tags), forward only (a phase she moved past by hand stays). Today's
visit's IVF line adds "Stims <day>". No test day (not her pick).

**Outcomes by condition** (her answer "Mine · Work"): Mine · Work ends with a read-only card (`phHubOutcomesHtml`,
`phHubOutcomes`), per condition (plan template; "Custom" for hers): Courses · Main concern (average first → average latest score)
· Visits to target (average visit days to the first score at target, of those reaching it) · Reached target ("3 of 6"). Only plans
whose main concern was scored on two days count; nothing stored.

**Session grid** (`phTpSessionLadderHtml`, LOCKED): phase rows × visit columns (max 12, "+N" opens the calendar), a square each
for done / today / booked / planned; the header row is the table's own `<thead>`. Tapping the LAST wanted square fills every one
before it ("Plan-it B"); the open phase shows rhythm pills (1×/wk · 2×/wk · Fortnightly · Monthly) + "Same for all phases". A
cycle plan's phases can also be planned by **cycle days** (CD chips + visits stepper; the cadence string stays the one truth, e.g.
`"CD 3, 5 acupuncture · herbs"`) [Session grid on a cycle plan]. Edits repaint via `phTpPlanRepaint()`, never a full rerender. On
a cycle-synced plan a visit files on the phase its cycle day names (`phTpCycPhaseOn`); each to-come square lands on its phase's
cycle days (this cycle or next), shows its CD and opens the Cycle page on that day [Session grid follows the cycle].
**Her 3 grid picks (2026-10-27; the lock lifted for exactly these):** the live phase row's Watch shows red flags only
(`phTpFieldCellHtml(..., { flagsOnly: true })`, cell marked `data-tp-flagsonly` so back-to-auto and edits repaint it the same;
other copies of Watch keep their chips); its Formula cell shows her own formula only ("→ Fill" when empty, "<lead> auto" in a
phase following Fang Bing Ren; the Fang Bing Ren line under Watch keeps the lead); at ≤480 the Phase column is 182px and the table
32px wider (it scrolls anyway) so a phase name's longest word fits beside the ×.

**Formula on a phase**: a typed name is hers; "→ Fill" fills from Fang Bing Ren's live top formula when blank [Care Plan phase
Formula].

**The Treatment tab**: session stepper, the visit (`phTpVisitTableHtml`), a Complete band; its "✓ Complete session N" is the one
place a visit is saved (`data-pres-acu-log`; Today's visit only opens it). No Planned | Today | Session N table (her picks). One
session line (phase named once, Current ▾, "Session N · today", Herbs only today, Change phase); left, "How <name> is" (the
Compass's complaint and sign lines read-only, `phTxCxHtml`: today's score or the last one faded with its date, one "Score on
Today's visit" chip; then the Care Plan's finding lines and drawers, `phTxFxHtml` over `phTpFxRowHtml`, without Came in for, plus
a Fang Bing Ren line, template-hidden ones under More); right, today's treatment (Aim; navy Therapies block, the phase's planned
therapies lit once per visit by `phTxSeedTherapies`, a dashed chip for a planned one she unticks; "Same as last visit"; "Which
muscle?" for pain patients; green Herbs block; Watch; Notes; one "Plan ahead · Session N" chip for the per-session boxes). Tongue
/ Pulse / Abdomen have **no Better / Same / Worse** here; the visit's result comes from the Compass (`phCxOutcomeToday`). Phone:
stacked, summary first, only the exam lines, the rest under one More chip.

**The green Herbs block** (her pick A, 2026-10-28): `[🌿 today's formula ▾] [Dispense] [Still taking]`, then `[Action ▾]` and the
plan line. The ▾ opens one searchable list (`phAcuFPickListHtml`), groups in a fixed order, nothing ranked: This patient (each
formula once, newest first, "given 14 Oct"), Your recipes + jars (recipes then jars, A–Z), Fang Bing Ren's formulas (`PH_FORMULAS`
names ending Tang / San / Wan, A–Z, "not stocked" or the stock kind), "Name it “x”" only when nothing matches, "+ New formula from
herbs" (the Design route while the plan names no formula; otherwise a fresh herb list in this prescription, plan untouched). Her
pick is today's formula only (`presAcuInstructFormula` + `presAcuInstructSrc`, kept in the visit draft). **Dispense** pours it into
the open prescription (`phAcuFPour`: jar / recipe as Link formula does; a past one from the prescription that dispensed it, else
from that day's dispense record sized to the same bag; a bare name = an empty list), never over herbs already off the shelf or into
a recipe, with Undo. **Still taking** records `session.herbInstructedFormula` at save. **Action ▾** is the treated phase's Formula
action (`PH_TP_FORMULA_ACTIONS`; "Action" / the one action / "N actions"). The plan line shows "Plan: X  → plan" only when the
phase's own formula differs ("✓ same as plan" when equal, nothing while blank: a blank one fills at save); → plan names the plan's
formula, lets a linked prescription go, with Undo. A day the herbs were given shows the dispensed formula's name instead of the
three chips. The Care Plan's Session grid Formula cell is unchanged.

**"Alive" phase resolution (locked, load-bearing)**: `phTpLivePhase(rec, plan, asOfKey?)` is THE read for the current phase — live
cycle-day phase → IVF CD suggestion → persisted pointer, with an optional as-of date for back-dated write-ups. Render from
`phPatientPeek`, never `phPatientRec` (it mutates on every call). `phTpPlanForToday(name, explicitId)`: booking's `a.planId` (if
it names an ACTIVE plan) → calendar-treated active plan → last session's plan → first active.

**Cascade rules** (`phTpCascadeTo`/`phTpSetPhaseStatus`): re-entering a done phase resets `sinceKey` to today; a phase is never
pulled BACKWARD by a live/cycle read once advanced past. **IVF Protocol has its OWN non-cascading helpers** (`phTpIvfCdSuggest`
read-only, `phTpIvfCdSync` its write twin, called beside `phCycleSyncPlan`, never as an else-if); the natural-cycle "overdue →
Prolonged luteal" splice never touches an IVF plan. `phTpSyncPlansOnOpen(name)` runs the cascade on opening a patient.

Bookings can be hand-filed onto a phase (`a.phaseId`+`a.planId` via `phTpApptFile`). **Fill-when-blank**: logging a visit fills an
EMPTY Points/Press/Formula on the treated phase; a different existing value gets an amber "→ plan" tap, never a silent overwrite.

**"Also treating" / Combine plans**: `plan.also[]` holds up to 3 secondary conditions; the MAIN plan's template drives
phases/colour/title, `also[].phases` is a shadow copy for the tile only. "Treated today" unticks a condition per visit
(`session.notTreated`).

**Announce cards** on the phase panel (never two at once, fertility wins): teal calendar-mismatch (the 4 cycle-synced templates),
gold MSK visit-count (active MSK plans), purple "Today's visit is pending on X".

**Pain map**: front/back figure with zone highlights (never pins), side view, close-ups gated to recorded regions; derived from
the complaint text until she edits it (`plan.painMap`). An absent `painMap` is not "no pain": recompute from the text first.

**Dot points**: Aim/Watch split into bullets for display only (`phTpDotParts`); the stored string is rejoined with `"; "` only
when she changed something.

**Detour phases** (Flare/High-risk/Crisis/Plateau/FacialFlare/Postpartum/FET Prep Natural & Medicated): one `PH_TP_PHASE` entry +
one `phTpDetourKindsFor` check + one `PH_TP_DETOUR_META` entry + one dispatch branch.

## Treatment plan templates editor
Settings → Prescriptions → "Treatment plan templates" (in the All-templates hub with the message and letter editors). **An
override layer, never a rewrite**: `PH_TP_TEMPLATES` is never mutated; her edits live in `PHARMACY.tpTemplateOverrides[id]`. A
built-in's Name is read-only (literal-string matches elsewhere depend on it); her own templates rename freely. `phaseKey` is
stamped as an own-property on first copy (IVF transfer-track detection finds "the OPU phase" by it). Sync conflicts settle per
template by `tpTemplateOverridesAt[id]` (newer edit wins). **Built-in templates carry no acupuncture points** (she designs them;
her saved copies were cleared once, 2026-10-21). **No template wording changes unless she asks.** The editor is a full page in the
Care Plan shape (`phTpxEditHtml`: findings column, Diagnosis, the Session grid as one table whose phases open in place). The
phase's Watch row is labelled "Red flags"; the Aim row has the three token chips. Standard course shows only on a template whose
category is not gynae, facial or men's (`phTpxStdOk`). The old Skeleton | Detailed editor (`phTpMgrEditHtml`, its band, tiles and
grid, the `data-tp-mgr-view` switch) is gone; its shared pieces (`phTpMgrSetField` and the other `phTpMgr*` write helpers, the
rhythm, Sessions, Recipe and Therapies fields, `phTpMgrRailHtml`) are the full-page editor's own.

## Cycle & IVF
**The Cycle page** = a plain sentence, three tabs, a Day 1 chip, a "Today is day [ ]" finder, PMS on every day, a **Menopause**
chip (sets `rec.cycleOn = false`; the Change of life card has "Tracking a cycle again?") [Cycle PAGE redesign]. Its calendar is
the Fertility-Friend-style calendar + BBT chart (`phCycFFHtml`), the one cycle view everywhere, opening on the month of her last
period. **Calendar tab** (her pick): a cycle picture (wheel + hormone / lining strip, `phCycDgHtml`) top left, the day
card ALWAYS under it (today until she taps a day), the two months stacked on the right. The card asks in her order: Last period,
How was it (Flow, Colour, Clots = Size Small / Large + Amount A few / Many, `clotSz` / `clotAmt`, read via `phCycClots`), Painful?
No / Yes (`painYN`; Yes opens How bad + Pain type), Between periods, PMS & mood (Mood · Gut · Body). **Its look** (her 2026-10-28
"Combine" pick): one label column, every joined bar filling its line (a bar too long folds into an even joined grid, `phCsFit`),
each option with its picture beside the word (Flow, Colour and Clots the picture alone, the word in its hover title, the pick
read out at the row's end, her "icon without words for flow color clots"), a line joining the numbered steps (filled once answered), the usual ring alone (a key
in the head), How bad a 0–10 bar, BBT and its time as tinted fields, Fang Bing Ren a band at the foot [Cycle day card: lined up,
pictures, rail]. **No Usual period card** (her pick, 2026-10-24):
the footer asks the length once (stepper, or shortest–longest range when Irregular); a **Usually** line is worked out from her
logged periods (`phCycUsual`; her old answers until two are logged) [Cycle page loses the Usual period card]. The Care Plan shows
a slim cycle bar that never folds. **A man never tracks a cycle**; `PH_CYCLE_CUT_AGE` is 48.

**Period pain is ONE read** (her picks): `phCycPeriodPain` = each period's worst day (0-10) from the Cycle page; the Compass
"Periods: painful" row, the Bing (latest period) and Ren (2 of last 3) pre-fills and the Usually line read it [Period pain: one
read from the Cycle page]. The cycle-day popover is built by ONE function, `phCycFacts`. BBT: `rec.cycleSigns[dateKey].temp`, a
typed value beats a phone reading; the coverline uses up to 6 pre-ovulation readings. **Two Flow/Pain concepts stay separate**: a
whole-PERIOD intensity (`PH_CYCLE_FLOW`/`PH_CYCLE_PAIN`, period-start day only) vs a PER-DAY value
(`PH_CYCLE_DAYFLOW`/`PH_CYCLE_DAYPAIN`). "Cervical mucus" shows as **Discharge**; the key stays `cm`.

**IVF history** shows for every woman, with a quick-log; scans live on `row.scans[]` of the linked round (a RECORD ONLY, never
moves a phase); scan bloods show in Blood tests; embryo accounting is always DERIVED; the Timeline reads IVF history, unlinked
rounds included [IVF history redesign; Fertility timeline: real sync with IVF history]. Starting an IVF Protocol plan opens its
questionnaire; milestone dates are written BEFORE the start-phase cascade runs. A positive hCG cascades an IVF plan to "Early
Pregnancy" once, on first transition only. `whenEst`/`dateEst` flags mark estimates; absent = confirmed. **Animated + drawn (her
picks):** a workflow rail for her current round (`phIvfRailHtml`; a step is done once it or anything after it is typed); "one egg
through the lab" (`phIvfEggHtml`, CSS loop, tap a day to start there); a round reads first (`phIvfStripHtml`: lab-stage drawing,
count, % from the stage before, blasts against fertilised, a dot per egg/embryo, tap a number for − / +; a blank count's − does
nothing), with date / clinic / egg freeze / delete / "typed" behind the ✎; the bank is straws (`phIvfFrozenBankHtml`); a transfer
reads first with the uterus drawing + Transfer → blood hCG → 6–7 wk scan (`phIvfTransferViewHtml`), its fields behind its ✎ (open
by themselves while it has no date); scans drawn as ovaries (`phIvfScanDrawHtml`, counts only). Drawings = the `ivc-*` sprite
symbols. No "+ transfer from these eggs": Use ▸ and "+ Transfer" stay.

## Dispense, Refill & To Order
Dispense always opens the full script (her "No, keep the friction"). **Three numbered steps**: 1 Calculate, 2 Dispense & copy
label (calculates first when needed), 3 Log; Log is always its own tap, never automatic. The Total line always shows grams · days
· cost · profit. Desktop (≥901px): the one-screen `.ph-dsp-fit` layout, supply-by-days chips (7/10/14/21/28), one Blood-moving
caution line (`.ph-dsp-caution`), the "Plan formula" pour-in, and the script + label in full in the right column, every herb with
no inner scroll, the label in full under it, the right column the one scroller (her pick) [Dispense: the script moved into the
right column]. **Not built:** the per-herb shelf→after-stock bar. Grams follow the herb total, and a manual Grams figure survives
Log [Dispense: Log silently discarded a manual Grams figure]. A substitute picker includes stopped/phasing-out herbs when stock
allows.

**Formula refill** is one card grammar across To make / Below the line / Snoozed / All recipes. One list at every width (a phone
stacks each row: tick, jar, name + grams, then its week chips); To make is banded by week (Overdue / This week / Next
week / Later / No week yet), a short row with "Fix short ▾". "When" is WEEKS ("Wk 39"; overdue = "last week" in amber, sorted first); Plan ▾ = This
week / Next week / Pick a week. The date popover is mounted globally; no `window.prompt()` anywhere. Week tiles (Overdue / This
week / Next week, tap filters); the header primary is the gold "+ Plan a formula" (search sheet).
**One line per formula, its facts beside the list (her picks) [Formula refill: one line, facts beside]:** a row = tick (Below the
line, All recipes) · jar (filled to the stock line) · name (plain text, wraps) with grams · 12 weekly bars + patients · next
booking ("Today · 2 booked", the patients in the hover) · its step (Wk + Make on To make; This week | Next week | ▾ elsewhere) ·
Recipe. Ticks plan many at once from a dark bar at the foot (This week | Next week | ▾ pick a week, Clear; one Undo). Below the
line lists "Dispensed in 12 weeks" first (soonest booking first) and folds the rest to one line. A row tap opens ONE panel beside
the list (above it on a card under 860 px, a phone included): **1 Use** (12 weeks of grams, bars grow once per formula) · **2
Who's on it** (patient · their plan in its family colour · last given · next booking; a row opens the profile) · **3 Treating**
(the plan families as one bar) · **4 Batch** (last made, how long a batch lasts at this rate, herbs on the shelf, Jar + Recipe).
**Make weighs in that panel** as the bench's own weighing rows (`refWeighRowsHtml`): tick · herb · grams · what the scale reads,
ring, jar 0 → N g, the bowl count, tick all, Not now, Finish (the jar fills, the row glows); Finish = the same `phDispenseGate` →
`refMakeCommit` save, then "Made today" with Undo. A planned formula **leaves by itself** when its stock went UP after planning
(`h.refillQty` stamped at planning; older plans: week passed + above its line), with Undo. All of it is read from the dispense
log, the plans and the bookings (`phFormulaUse`, 12 weeks, Break bookings left out, "(X)" name tags merged); nothing new is
stored. Motion off under reduced motion. Dispense's In stock cell says "To make · Wk N" for a planned formula jar
(`presIngToMakeHtml`).
**Recipes:** New formula recipe sits in ⋯ and opens as a side sheet (#refPresPanel), never inside the card; there the editor
always stacks (Make refill, then the ingredients at full width; her "i cant edit the formula at all": two columns split inside the
640px sheet). Every row with a recipe ends in a "Recipe" button (pencil icon, `phRfcRecipeBtn`, `data-pres-open`) opening that
recipe's herbs and grams in the same side sheet (her "how do i edit recipes?") [Formula refill: a Recipe button on every row].

**To Order, desktop** (>900px) = a 3-column board that fills the window: **Needs ordering** (a To order | Running low switch, rows
A to Z in fixed spots, Snoozed N ▾), **On the way** (bottle counts, Copy for email, All arrived), **Arrived** (last 14 days).
Nothing scrolls a column on any board move; details pop out beside the row; a formula card has "Refill ▾" [To Order: the desktop
board is 3 columns]. **The phone To Order is the older layout, untouched.** Dashboard's Order/Refill cards are TWO PLAIN LISTS,
empty first then fewest days of cover; a Refill row also shows the formula's next booking (her pick); a long name wraps on both.
Picking a supplier pulls in that supplier's recorded price.

**Patient profile list on a computer (her audit: "make it more space saving make it cleaner") [Patient profile list audit]:** the
five tiles are the filters (tap again = all; "No history" only while anyone has none), no Filters button or chip row; "Schedule"
sits in the toolbar while nothing is scheduled (the quiet line hides); no list head line unless searching ("N match ..."); bands
carry sprite icons; a row says each fact once ("never" / the amber date carry not-dispensed and not-seen-6-months, in their
hover), short condition names (2 then +N), one 18px pill look, 44px rows. Her 9/4 bones stay: fold bands, timeline rows, the two
round buttons. The phone keeps its chips and Scheduled line.

## Patient details & the patient file
**Patient details** (`phPdPageHtml`) = a hero + 3 cards (her pick), every control 32px Zanda-style (6px boxes, joined 6px bars,
white value boxes, the send-the-form circle): tap to edit in place, age from DOB, BMI bar, a filled-in ring (n of 11), Call / Text
/ Email chips, a Rebate bar None / Low / Good / 50%+ [Patient details = hero + 3 cards]. A returning patient's Sex / DOB / Phone /
Email turn amber once changed this visit. **Came in for** shows on Today's visit; the complaint priority ribbon sits on every
patient page. **Profile search** (header band) searches the whole file (nothing saved; free-text history notes not searched). A
patient can be linked to their partner [Partner link]. The no-plan gate has "Skip for now" (in memory only). The read-only
**Patient Directory** unions six sources keyed by `phPatientKey`. "Profile-first" is history: the Patient Workflow LAW replaced
it.
**No band on patient pages (her pick):** no dark three-gauge band on Medical history, Supplements, Photos, IVF history,
Appointments, Messages, Treatment, Treatment log, Notes; each page's facts = an icon + a number on its own first row, words in the
hover title (`.ph-fx`; `presBandHtml` + `PRES_BANDS`, sync unchanged). Medical history's ✓ asked and 🕒 updated sit in its toolbar
(`presMedHxBandHtml`); no "By group" (each group heading says ✓ asked).

## Musculoskeletal page
**Palpation-led** (her picks; full design: memory `project_lcm_msk_redesign_2026_10_27`) [Musculoskeletal page, step 1]: a head
(Same as last time, the Screen line, a 5-step bar Pain · Palpate · Diagnosis · Points · Re-test); the picture card (pain figures |
the lit area's muscle diagram | view controls; Add pain · Areas ▾; a first visit taps the body to add a pain); ONE card per area
(Pain Base · Last · Today · After; Palpate = the area's muscles as chips, hers first: one tap Tender + its motor point, then Taut,
Trigger, off, MP end = motor point out; + Movement; + Test; Diagnosis + her set) beside **Today's points** (her marks from the
picture: Acu = the classical point near the muscle, Ashi = trigger release, motor points; her
typed points, Ashi on / off, Save as my set per diagnosis in `PHARMACY.mskSets`; points in `visits[day].acu`). The app never picks
a point (a muscle's ⚠ rides with its name's last word; on a phone each Today's points row is a grid, the mark under the name). No region chips, Re-measure table or 9 exam tabs; Observation, Strength, Neuro, Function sit behind "More exam". Kept:
tap a belly = the same chip, + Cause, Enlarge, 3D. Motor-point muscles = ONE list (`phMskPlanOf`, carried included) for the panel,
the Treatment tab and `phMskSummary`. **Today's points go on** [Musculoskeletal page, step 2] (`phMskAreasToday` = the panel's list
by area): the Treatment tab's navy block has a **Points** row of them, ticked (a tap = not needled today, `off: true` on the page's
own list), and the motor points under "Which muscle?" start ticked the same way (`treat[key].done`, carried ones too; their
rows keep their place); an unticked one is struck through "not today" in the panel and left out of everything below; ✓
Complete session saves them as `session.points` (motor points as "Upper trapezius MP
R", Acu as "GB21 R", a trigger release as "Upper trapezius Ashi R") and each area as `session.mskAreas` (`{r, s, dx, pts, b, a}`), and a blank Care Plan phase Points fills from them; the panel's
foot says Treatment · Care Plan (blank / ✓ same / other points + **→ plan**, Undo) · Log; the Log's visit line shows Area ·
Diagnosis · Points · Pain before → after. Copy notes reads the same list. MMT = a 3-point Weak / Mildly weak / Strong scale. A test
row snapshots the library at add-time. MSK libraries are append-only.
**The muscle picture** (her picks; her ask "draw a more accurate depiction of the muscles e.g. Pectoralis major minor etc for
me to tap") [Muscle picture: true shapes]: the **shoulder and mid back** are drawn as true muscle shapes on the body figure's own
grid (`PH_MSK_ATLAS`, regions in `PH_MSK_ATLAS_REG`, drawn by `phMskAtlasHl`), in **two rows, Surface then Deep** (the deep row
keeps the surface muscles' edges dashed; pec minor, serratus, the rhomboids, levator, supraspinatus, the erectors and QL sit
there), pale grey with fibre lines, bones for
bearings (never tapped); every drawn muscle taps (one tap cycles Tender → Taut → Trigger → off, the same as its chip); **names beside
the picture, marks on it** (her picks 2026-10-28) [Muscle marks: names beside the picture, Tools bar]: a marked muscle's name
(`PH_MSK_TAGN` short names) sits in a margin on the pain's side (front + Right = the left edge, back + Right = the right edge, the
side view's edge opposite the face, pain both sides = two margins; `phMskDgSides`), a thin line to the muscle and a finding dot in
the name, so no word covers a muscle; on the muscle only its **marks**: ● Acu (the classical point near it, the muscle's `acu`), ✕
Trigger release (Ashi needling), ◎ Motor point, several at once (`tx` on its `vis.treat` entry, `PH_MSK_TX`, `phMskTxGlyph`; an
older entry's `tech` reads as one: dry needle = Trigger release, else Motor point; Needle & move is gone). A **Tools bar** over the
picture (Finding · Acu · Trigger release · Motor point, one joined bar; `phMskTool`, view state) sets what a tap does: Finding
cycles the finding (Tender still brings in its motor point, off takes only the motor point out), a mark tool turns that mark on or
off (`phMskTxFlip`; the last mark off takes the muscle off the list, the finding stays; a side with no pain asks for one first).
The **view buttons sit under the pain figure** (two columns on a computer, one joined row on a phone), so the pictures keep near
full size (280px; one per row on a phone). The read-only Fang Bing Ren plate draws no names and no marks. Hover names on a computer. A
muscle in parts is **tapped part by part** (her pick "Split"): pec major clavicular / sternal, deltoid anterior / middle /
posterior, trapezius upper / middle / lower, teres minor / major, rhomboid minor / major: each part is its own `PH_MSK_MUSCLES`
row with `of` = its whole; the whole is `hide` (off every list, chip and search) and an older mark on it shows on each part with
nothing of its own (`phMskMuState`). On a narrow card each row stays a front + back pair. **The neck** (her picks 2026-10-28)
[Neck muscle picture]: **Side + back** (`PH_MSK_ATLAS_VIEWS.cervical`; the side view is `PH_MSK_ATLAS.side` on SIDE's own grid,
drawn with `sideSvg(..., { neck: false })` so its own neck and jaw lines stay off), a close window (`PH_MSK_REGION_CROP.cervical`,
`PH_MSK_SIDE_CROP`), one side picture with a **Right | Left** joined bar under it (`phMskSideLR`, view state; `dg-side` turns the
page's copy and the Enlarge copy; a tap marks the side showing). Parts: SCM sternal / clavicular head, anterior / middle /
posterior scalene, splenius capitis + semispinalis capitis (`of` their wholes), cervical multifidus, lateral pterygoid, the
**suboccipitals as one tap** (four drawn, one key `sub`), the upper trapezius to the skull, levator, masseter, temporalis. The same
neck shapes sit at the top of Shoulder and Mid back (one drawing everywhere); a neck-only muscle names itself in the Neck picture
only. **Not built:** arm, low back, hip, knee and ankle keep their grey bellies until drawn.

## Fang Bing Ren, Find the Ren & Patterns
**Fang Bing Ren** (the Triangle) is the one place constitutional-family scoring happens: one merged header (verdict + Quick
assess); signs in ten shared areas; ONE "Looking at" line, on the Fang Bing Ren page only (Everything · her complaints · the tile
she tapped; a complaint lifts its signs and fades the rest, nothing hidden, view state only), which Quick assess follows
(`phQaFocus`); on Today's visit (it shows the complaints) a tap on a complaint's name on the Compass sets the same pick; ticked
chips that clear; a body chart whose big view zooms to a place when she points at its list group (organ plates under it with the
concept picture of the pattern her signs there point to, header click pins; `phFbbZoomShow`, `PH_FBBP`, `phPpFbbFor`); a reference
sheet [synth22: the "Looking at" line ... body map close-ups]. Formulas rank by `phFbrRank`, the leader is `phFbrLeadOf`;
pre-fills come from charts, history, bloods, the intake form, pain words, food reactions, cycle, age and sex (derived, a tap
always wins); today's cycle day log answers the Bing period rows (clots or dark blood, Spotting, Bright red, Dark-pale; `phCycDayBing`). The day card's Colour has Dark-pale (her 2026-10-28 answer). The board groups its rows under quiet subject headings (a twin pair's heading is its Bing subject); the complaint
search box's "+ Add as complaint" adds the typed words as a secondary complaint through Came in for's own add. The same box
("Search signs or formulas") finds a formula by any word's start or its initials ("wen dan", "xcht"; `phFbrFormMatch`): its block
wears a ring, the rest fade (never hidden), a Formulas chip row under the box (best fit first); a chip, Enter or its block looks at
that formula and empties the box; words that find a formula and no sign leave the signs as they are (her ask, BUILT, not live).
A new formula or sign = **integrate33**.
**Find the Ren**: look first, then two questions at a time. The look is one row at a time (her picks): the face photo with Eyes /
Lips / Skin / Muscles spots she drags (saved on that photo, `rqZones`), six tabs that show her picks ("✓ Lips Red"), the open
row's groups as joined bars with short words, colour dots and a body scale on Weight; keys 1–9, 0 None, Enter Next, ← → [Find the
Ren: one row at a time]. **Exam signs wait** (her pick "both"): the Ask never asks a Tongue, Pulse or exam-only belly sign
(`phRqExamPart`; bloating, rumbling, sloshing, fullness are still asked; a part skipped "Always" is asked); a part never charted
shows a **Later** line (its most telling sign · Tongue › / Pulse › / Abdomen ›); a 7th tab **Tongue** (optional: the six looks
still open the Ask) holds the newest tongue photo and the Tongue page's own Ren-linked chips, written through `phTngWrite` [Find
the Ren: the tongue waits, or is looked at here]. (Locked details: "Locked conventions" below.) **The Ren page board** (her pick):
26px one-line signs, auto No's folded per subject, a sticky search bar (words, All · Yes · No · Open, area, count; / ↑ ↓ Enter
Shift+Enter Esc) [Ren page: compact rows + a search bar].

**Patterns** (`phPatCompute(name)`) derives candidate TCM patterns live from the file, **never stored**; only her Agree / Not this
patient writes `rec.patterns.agreed`/`.dismissed`. Strength is words (Likely / Possible / A hint) + a clue count, never a
percentage. A card shows only its clues and Agree / Not this patient (no letters, food, points or supplement chips); an open card
also shows the pattern's concept picture. One pattern can be ★ main. Formula ideas are OFF (she dislikes suggested herbs). A rule
she overrode in Settings never gains new clue keys later (deliberate). All pattern wording is Claude-drafted, hers to correct.
**Concept pictures** are drawn from the body (a natural hand, a real stomach / throat / kidney, vessel walls with cells). Her
rule: this anatomical model is the model for every picture; the rest move over in batches. Yin deficiency and Heat are drawn on
the body chart itself (organs at true size, `anat` in `PH_PP`, a 300 x 200 frame) [Concept pictures on the anatomical body]. The
Her build person (its pale organs and its face, `FACE` in `PH_BODY_GEOM.svg` on every front view, the patient's measured build) is
the universal person for the whole app; Yang deficiency, Qi deficiency and the formula pictures draw it [The Her build person is
the universal person].
**Story tabs on the condition pictures:** a picture can carry story tabs after Balanced | the condition (`PH_PP_TABS`,
`PH_PP_STORY`): IVF and Natural fertility have Lining; Pregnancy has Lining, Breech and Labour; Breech correction has Breech
("Turning"). Breech and Labour follow her pregnancy week (`phPpPregWeek`); the Care Plan Diagnosis adds their picture during the
Breech Presentation / Labor Induction phase. A new story = one `PH_PP.SC` scene + one `PH_PP_STORY` entry + its base in
`PH_PP_TABS` [Turning a breech baby + Preparing for labour].
**The Yang deficiency picture (her picks) [Yang deficiency picture]:** the Her build person in a 300 x 252 frame (`PH_PP.XL`,
`yangBody` in `PH_PP`) with three fires (Ming Men, Spleen, Heart), the signs as words on the body (DRAFT wording) and a tongue +
pulse strip under it; tabs Balanced | Yang deficiency | Kidney | Spleen | Heart (`PH_PP_TABS.yang`; a tab is a VIEW of the same
picture, `S.setView`, so it glides; `yang_kid` / `yang_spl` / `yang_hrt` open it on that tab through `PH_PP_VTAB`). Kidney yang IS
the Kidney tab (no separate close-up). It also shows as a tile (`phPpYangThumbHtml`) on Fang Bing Ren under the body figure while
Fu Zi / Si Ni Tang / Zhen Wu Tang / Shen Qi Wan leads (`PH_FBR_YANG_PP`), on the Tongue page for a pale tongue that is swollen or
teeth-marked, on the Pulse page's Summary for a deep pulse that is slow (rest rate under 60) or weak; as a chip beside the likely
pattern on the Journey card; and as a still (`phPpStillJpg`) in the Food letter, on unless she taps "Yang picture" off.
**Formula pictures (`PH_FP`) [Formula pictures]:** every formula in the Fang Bing Ren list (22 in all, Ban Xia Hou Po Tang, Huang
Lian Jie Du Tang, Xiao Chai Hu Tang, Wen Dan Tang and Wu Ling San among them) has a moving picture of the body (three burners,
trouble, herbs at work, tongue + pulse inset), three stops Trouble / Formula at work / Settled, tap-a-herb chips. The person shows
to mid-thigh (340 x 240), drawn at .88 (`ZK`, labels follow through `ZP`), with a pencil-sketch face (`FACE_SKETCH`,
`face: "sketch"`; her picks: slim face, pointed chin, closed lips, minimal side-parted hair ending at the ears). The tongue
inset's shape follows its trouble words (`tngFeat` / `tngD`: swollen = wide, round tip, scalloped teeth marks; wet = shine; red
tip; dry = cracks). It replaces the pattern picture on the Guide card for those formulas and also shows on Dispense (end of the
right column) and the Care Plan formula cell. Same runner as the pattern pictures. A new formula = one `PH_FP.SC[id]` scene +
`PH_FP.HERBS[id]` + `PH_FP.PAT[id]`; no scene = the pattern picture stays.
**The big sheet (her picks):** every formula, pattern and Guide key-sign picture (the Patterns page's open card too) has an expand
button in its top-left corner (`phPpXpHtml`) opening the one sheet at up to 1100px, which steps through the pictures it sat with
(one opener, `phPxOpen` → `phPxPaint`): arrows on the picture's edges AND a strip of the pictures right under it (a phone: strip +
swipe, no arrows), ← → too, round from the last to the first, no count. The set is where it opened: a Guide card = its formula or
pattern picture(s), then its Key + Strong signs; a formula opened alone (Dispense, the Care Plan formula cell) = it, then its
signs; the Care Plan Diagnosis = its pictures; the Patterns page = every pattern on it with a picture. Every picture is one size
(`--px-h`), so nothing moves; a sign's name is said once, in the header with its Ren / Bing marks and weight dots.

## Guide — Families (study + edit)
The Guide is **[Families] [Tongue map] [Pulse]**: a herb card is the body type with its formulas under it, notes-only formulas are
dashed tiles, a study card sits on the right (in Study, the concept picture of the pattern(s) the family counts for, under the
pearl). **The card's rows ARE the Fang Bing Ren tables** (`PH_FORMULAS[id]`): her edits live in `PHARMACY.fbrEdits[id]` (+
`fbrEditsAt`), and `phFbrEditsApply()` rebuilds `.ren/.bing/.or/.core` in place from `phFbrPristine`; `phFbrEditsSync()` (top of
`renderPharmacy`) re-applies when the saved edits change. **Nothing else may write to `PH_FORMULAS`.** Every Guide edit goes
snapshot → change → `phGdfDone` (tidy, stamp, save with rollback, sync, repaint, Undo). A learned `a_` sign off a formula is
written as 0, and lists filter `w !== 0`. Cloud: `mergeFbrEdits` beside `mergeTemplateOverrides`. Notes-only rows: `gdNoteEdits`.
A notes-only formula that has become a scoring family (Wen Jing Tang, 2026-10-28) leaves Notes only; its memory aid, distinction,
conditions and source show on the family's card (`phGdfNoteIsFam`, `phGdfFamNoteId`).
Details and tests: [Guide Families].
**Key sign pictures (her picks):** every sign a family weighs 4 or 5 has ONE picture (`phKsDesc` / `phKsSvgHtml`; a Bing sign and
its Ren twin share it): hand-drawn for Gui Zhi's Key signs (`PH_KS_SC`), else her Tongue / Abdomen chart, the wrist with her pulse
lines, its body place's close-up (`PH_FBBP`) or the body figure, moving by its words (`phKsVerb`). The Guide card shows the
family's Key + Strong signs as a big picture taking turns (4.5 s) with tiles under it (hover shows, tap holds). The Fang Bing Ren
board shows the big one beside a row she points at; Compass sign rows and Ask her answers carry a small still one (none on a
phone). One picture moves at a time; all still under reduced motion. Only Gui Zhi's Key signs are hand-drawn so far [Key sign
pictures].

## Photos
**The patient's Photos page** opens on the Comparison table (a row per type, a date column each); By visit / By type a tap away;
each tile has one-tap type / shot chips and a date button. **Records → Photos** (whole clinic): label with one tap or a key; it
rings the next unlabelled photo (a tap never moves the page: it rings one already on screen or none; only the keys scroll to it);
Select + one label for many. Tongue shots rank natural → unlabelled → side → sublingual → flash (`PH_TONGUE_SHOT_RANK`). The
Tongue page: today's photo beside the last (the Sublingual tab flips the pair), the Flash pair under them in the same column, past
photos at the bottom. A face / build photo full screen carries Find the Ren's own rows (Face · Eyes · Lips / Build · Skin ·
Muscles) and its spots as corners (her pick). Compare and the viewer are ONE mechanism each, wired into every surface that shows a
photo tile. The photo sheet's Date field (today by default, never later) dates every photo saved from it. **Never delete a photo**
(her hard rule); the store asks the browser to keep it (`phStoragePersist`); backups carry photos.

## Fasting (her own clock)
C22's fasting clock lives in LCM, only for her. Her plan: "breakfast and lunch, and fast after lunch by skipping dinner ... 3-5
times a week". Data in her Me row (`d.fasts`, entry by entry; no `e` = running; `fastGoal`), so both logins show it. C22's fasts
come in once (Bring in). No cheer lines, no cycle advice.
- **On Meals**: a thin clock bar tops her Meals page (time, to Breakfast / of goal, Goal ▾, aim · n planned, **Your fasts ›**,
  Start / Stop / Continue); the planner draws each day's fast 5 am → 5 am (cream eating, green fasted, striped to come, a line at
  now). The Fasting step is off her rail (grp `off`); Your fasts › opens it under a ‹ Meals chip (ring, goal bar, Stop + Undo,
  Continue last fast, tiles, last 14 / 30 / 90 days by cycle phase, history). Every Fasting door (band chip, Me drawer line, ⋯ menu)
  opens Meals; Appointments also has a toolbar chip (computer only).
- **Goal** 14 · 16 · 18 h · **Breakfast** · Other ▾ (Breakfast = her next Breakfast event at least 2 h on, `fastTo` beside
  `fastGoal`; none = the hours). **Aim**: 3–5 a week (two fields) + her planned days as a Mon–Sun bar (`fastAim = {lo, hi, wd, up}`);
  a fast on any day counts. A night's planned fast: Dinner → Fast this night, Just <day> | Every <day> (`fp` 1 / 0 on that day's
  `|d` meal; otherwise the Aim days, `phMplFastPl`).
- **Start / end**: Had it on today's Lunch with no fast running puts **Start fast** in the toast beside Undo (from that moment); Had
  it on today's Breakfast ends a running fast (Undo or unticking sets it running again).
- **Counts** once it reached its goal (`phFastMet`: the hours, or it lasted to that breakfast, or that morning's Breakfast Had it
  ended it), on the day it STARTED. Tiles: **This week** (Mon–Sun dots: filled = counted, pale = short, breathing ring = running,
  dashed = planned; green from her low number) · Avg · **Weeks on aim** · Longest. The Me drawer line: this week's "n of 3–5".
- **Grid**: a fast draws down each day it ran (`phFastSegs`): solid to now, pale to the goal, a flag at the goal; a finished one
  solid, its hours where it ended; a visit over it sits 10px in. A Dinner a fast covers reads **"Skipped · fasting"** + a moon on
  the grid, its card, the Me drawer and her Meals page (worked out on read, `phFastNightOf`, nothing saved).

## Herbs (her own doses)
Her own prescription's doses at clock times SHE types, nothing pre-filled ("i need a herbal schedule").
- **Every formula she takes**: each formula dispensed to her (My profile's record) at its newest dispense (a newer dispense replaces
  only the SAME formula, matched by name, `phHbNk`), then the ones she types with **+ Formula** (bought, patent pills, another
  practitioner's: `d.hbx`, name · amount + unit · times a day · days · from · supply); a newer dispense of the same formula replaces
  a typed one too; none of either = her record's own script. A row leaves a fortnight after it runs out (a dispense whose run-out
  cannot be worked out: after 4 weeks; typed with no supply: only by Remove; `phHbStays`); no Stop. Times carry over only within the same formula (`phHbTimes`).
  Dose, days, "runs out" come from the script and its dispense's follow-up (`phHbRows`, derived on read). Data in her Me row, entry
  by entry (`d.hbt` times, `d.hbk` doses taken, `d.hbx` typed formulas).
- **Herbs step** (Body group): ONE table, Formula · Dose · Times (none = one quiet "–" field that opens them: her "not specific dose
  times") · Today · 7 days · Left · Dispense (dispensed) or Edit (typed: its fields + Remove with Undo). + Formula = a name (her
  prescriptions + the formula list as a native list) + times a day + Add, More ▾ for the rest. Rail: "N taking". Days left green,
  ran out amber on every surface.
- **Elsewhere**: Me drawer Herbs (a tick per dose today); each dose its own green block on the grid (`#15803D`, leaf; today's tap =
  taken with Undo, another day's opens its card; untimed folds above the day); Herbs in the Appointments ⋯ menu. Due = a gold glow
  until ticked; a late tick counts any time that day; a fasting day keeps them. Code: "HERBS · HER OWN DOSES" (`phHb*`).

## Meals + the Diet log
C22's meal prep lives in LCM. Her Breakfast / Lunch / Dinner event (`phMealSlot` reads the title) holds its meal: her usual one, or
that day's own; prep ticks per dish (`preps`); ingredients (a tap = Shopping); one **Had it** for the whole meal (keeps the list;
the grid's ✓ IS Had it: band pill, fold chip, card; Undo). The meal shows under the event; the calendar reads "first + count", food
first. A meal value is one item or a list (`phMealVs` / `phMealV`). A dish can be a **Drink** (Dish | Drink on its editor); a
dish's name in the meal opens the dish. "Something else" is gone. Data in her Me row, entry by entry (`d.dishes` = "My dishes",
nature warm · neutral · cool + nutrients per serve; `d.meals`; `d.shop`). Me drawer: Today's meals (a tick per meal, water +1),
Shopping.
**A meal's list** (her pick 2026-10-27, "too busy"; it replaced the Food / Drinks sections, + Food / + Drink, Eating out and Skipped
under Food, and Had it | Edit; BUILD-NOTES "A calmer meal"): every meal list (her card, the planner's picker, her usual meal, a patient's Diet sheet) =
**the day's line** ON TOP (her pick B 2026-10-28, "it is very confusing how to set the daily breakfast vs just breakfast of today";
the Just <day> | Every <meal> switch is gone): her day's list changes THAT DAY only; it reads "Same as every <meal>" until she
changes it, then "<Thu> only" + **↺ Undo** (back to her usual) + **Use every day** (it becomes her usual; a day with its own keeps
it); **✎ Every <Meal>** at the line's end (her card: her usual meal as one card; the planner's picker: her usual list in place,
‹ <day> back, and it opens there while she has no usual one). Code: "MEAL DAY OR EVERY DAY" · the meal as a small table (name + its mark, a cup on a drink
· − amount + · kJ in the planner · ✕) · **+ Add food or drink** opens the list UNDER the meal (search or type + New; one bar
Everyday | Drinks | Thisbowl | My dishes; a row a food with its usual amount and +; Thisbowl R | L, Build your own; a thing in the
meal is NOT listed; Done adding) · one numbers line, small numbers behind a tap · **Eating out | Skipped** one bar (beside Had it on
her card, beside + Add in the planner's foot). No sideways scroll; long names wrap, never cut; the cursor goes to Search on the
computer only. The snack picker (Snacks · drinks) is unchanged. Code: "A CALMER MEAL" (`phMealListHtml`, `phMealTblHtml`,
`phMealAddHtml`, `phMealNumsHtml`, `phMealInstHtml`).
**Food numbers**: foods from `PH_FOOD` (210 rows: the Australian Food Composition Database Release 3 by FSANZ, CC BY-SA 3.0 AU,
credited on Targets; AUSNUT 2023 by FSANZ for what AFCD lacks: the curry meat pie, the kebab wraps, creamy milk; choline and beef
bacon from USDA FoodData Central; matcha powder from the Standard Tables of Food Composition in Japan 2020 (MEXT); Thisbowl's June
2026 sheet; groups include **Snacks** (packet chips) and **Takeaway** (pies, sausage roll, kebabs,
hot chips), her word), stored `food:<id>*<q>`, shown in kitchen
words with − / + (each food its own step; a dish `dish:<id>*<q>` steps in serves). A dish's **Made of** adds its numbers itself
(typed numbers only for what is not on the list); with no Made of a dish counts by itself (`phDishAuto`: the Thisbowl bowl in its
name, else its typed ingredients matched) and Made of starts filled with that bowl. Nutrients add every item. The time is a small
✎ field. A day's numbers line (kJ · P · C · F) opens 17 bars against **Targets** (C22's four + NHMRC women 31–50 + carbs 50 g, each hers);
"not counted" where no source gives a number, never 0. Thisbowl bowls R | L + Build your own. Code: "FOOD NUMBERS" (`phFood*`,
`phNut*`, `phTb*`).
**Shop foods** (her "download woolworth and coles and aldi food database because i buy from them"; her pick "Search as I type"):
the shops share no product data and FSANZ's Branded Food Database is not public, so the products are Open Food Facts' Australian
ones (shoppers' label scans, ODbL, credited on Targets) in `foods-au.json`, fetched the first time she types in a meal's add list
(Open Food Facts' own search refuses a web page). While she types, a **Shops** block lists up to 12 under her own foods (every word
whole, the last one a start; her shops' products and Australian barcodes first; "woolworths", "coles", "aldi" find what each
sells, an Aldi own brand counts as Aldi). One she adds is kept in her Me row (`d.sfood["sh_<code>"]`, entry by entry) and joins
`PH_FOOD` as group "From the shops" (`phSfReg`), at its label serve; numbers per 100 g / ml are the label's (kJ, protein, carbs, fat,
fibre, sugar, sodium, and a mineral or vitamin only when the label gives it). Code: "SHOP FOODS" (`phSf*`).
**Diet page** under Log for every patient (`phDietPageHtml`): usual diet + days she notes (`rec.diet`, `phDietWrite`), one thing per
line, ↺ Same as usual on a day of its own. On HER record (the My profile record, else her signature name; a Me tag on her band) it is
**Meals**, in her Body group; patients keep Diet, unchanged. Nutrients, nature and the week are worked out on read. Diet feeds
Patterns (`diet_cool` / `diet_warm`, source Diet, DRAFT wording); Fang Bing Ren has no diet sign (food reactions pre-tick its signs).
**Meals planner** (her Diet page, her word "change diet to Meals", fasting merged in): the clock bar on top, today's macro rings
under it, then a week table, days across: Breakfast · Lunch · Dinner · Snacks · drinks · Fast · Macros · More. A cell = its meal's time (a day's own bold) + its things one per
line (pale = usual, bold = the day's own, ✓ + the time she had it); ✎ Usual on each row. A tap opens the picker under the cell (over
it when more room above; fits the window), on the meal (empty = on adding): the meal's list (Eating out / Skipped today or before)
+ Done; on Dinner **Fast this night** (see Fasting). Esc closes the picker only. ⧉ on a day = Copy a day (pick days, Copy to N days);
**Copy last week**; **Shopping list** = the week's list from the plan (each food added up, a dish's foods; Thisbowl's left out) into
the Me drawer's Shopping (`src: "plan"`); Targets. **More** a day = water +1 (the button shows the glasses), the numbers line, warm ·
cool, the 17 bars (today's open by itself). Phone: a day at a time (‹ ›), the picker inline. Code: "MEALS PLANNER" (`phMpl*`).
**Macros against her goal** (her picks: the Macros row AND today's rings) [Meals macros against goal]: energy, protein, carbs, fat.
**Goals** (`phDietGoal`): kJ is hers to type; protein 50 g and carbs 50 g are hers (her word: "set carbs to 50g a day"); fat is hers,
else the rest of her kJ goal after protein and carbs (FSANZ: 17 kJ a gram of protein or carbs, 37 of fat; her grams win over a
split); Targets tags it "from kJ". **Today's rings** (`phMacRingsHtml`, under the clock bar; a phone: the day it shows): a ring each,
solid = had, pale = still planned, the % in it, the amount, "of" + the goal as a field (`data-diet-goal`, `phDietGoalSet`; clearing fat
returns it to the rest), "n to go" / "n over" / "✓ goal". **The Macros row** (`phMacCellHtml`, before More, computer): four short bars
a day with the number; a day to come as planned, pale (a plan over its goal = a deep number). Over the goal = deep for all four, under
60% = amber (today: only when the plan also falls short). Worked out on read (`phMacDay` = `phDietMyDay` + `phMplPlanSum`); only the
goals are stored. Code: "MACROS" (`phMac*`).
**Food reactions**: a meal she had (her card, under Had it) and a patient's noted day or usual meal (Diet sheet, "Usually after it")
take an **After it**: Gut / Body / Felt good chips + her own words (+ Own, they stay), ONE How strong bar, Started, From (which
thing), a Note. The mark (the first reaction's picture in a pale red circle, green for Felt good) shows on the grid block, the Me
drawer row and the Diet cells; Reactions by food (twice or more) under the week and in a food's hover in the add list; Reactions ·
30 days on Health. A gut reaction twice or more (or on a patient's usual meal) files the Patterns clue `digestive_sx`, source Diet
(DRAFT). **Fang Bing Ren** (her word "fang bing ren", 2026-10-27, replacing "Never Fang Bing Ren"): a gut reaction pre-ticks its
sign (Bing = in the last 7 days; Ren = the same reaction twice in 30 days or on a patient's usual meal; any gut reaction also "worse
after eating"; Gassy = bloating + rumbling + belching; derived on read, `phRxFbrSigns`; her tap wins; why in the hover).
**After-meal check-in**: 1½ h after Had it on Breakfast / Lunch / Dinner, "How did <meal> sit?": gold on its Me drawer row, the
band's Meals chip and the calendar block; a card on top of the Me drawer (and the Appointments column's Me tab), Fine first; with
Settings → Device "Check-in on the phone" on, a phone notification while LCM is open (sw.js `notificationclick` opens the card).
Fine (`e.fine`) leaves no mark; closed = `e.ckx`; unanswered goes quietly at the next meal's ask or midnight. Snacks are not asked
(no Had it). Data: `rx` on her day's meal entry / `rec.diet.days[day].rx[sl]` / `rec.diet.usual.rx[sl]`. Code: "FOOD REACTIONS"
(`phRx*`).

## Trips (her travel)
Her work trips live in LCM; Nanjing is the first. Data in her Me row, entry by entry, both logins (`d.trips`, `d.tplan` plan rows,
`d.tnotes` day notes). Trip to-dos = Me to-dos with `trip` + `g` (area) + `due` (days before she flies), day worked out on read
(`phTripTdDay`). Passport and policy numbers sync, hidden until Show numbers.
- **Her file**: a step per trip in her Life group, ONE joined tab bar: Prepare (six area tiles + the to-do table; while away
  "Today": day n, the hotel in Chinese + Driver card, today's plan, the day the clinic opens again) · Travel (flights, each end in
  its own clock; hotel; getting around) · Docs · Plan (a chip per day, rows, a note, photos) · Clinic (trip-day bookings with Move =
  the booking's own Edit; herbs running out while away with Dispense; fertility Timeline items opening or closing on a trip day with
  Open; "Message the N booked patients" into the one composer) · Guide (Nanjing only). A phone during a trip opens on its Today a
  moment after load (only while still on Appointments with nothing open).
- **Calendar**: one band across the trip's days in the row above (day n of N, a red count of bookings, a tap opens the trip); trip
  days striped in its colour; "<city> time" on the days after she flies; flights and plan rows as her items (card: Open the trip);
  trip to-dos as tick chips on their due day; a red Away tag + red edge on a booking on a trip day.
- **Me drawer**: Trips; trip to-dos tagged with the city ("by <day>", a tap opens the trip); the one-time Bring in from the old
  Nanjing app (IndexedDB `book33-nanjing`, read only; the c5-nanjing app is set aside, untouched). **+ then Me**: Trip (Name, From,
  To, City, a time zone filled from the city, Colour). Photos in her record's photo store (kind "other" + `trip` + `tday` /
  `tpart`), the one viewer opens them.
- **A trip pauses her routines**, by itself, from her flight out until she lands home (no flight = the trip's whole days). Meals and
  a routine ticked **Keep on trips** (`kt`, in its Edit) keep going; one-offs, birthdays, her herb doses untouched. `phMeOccurs`
  (the one read) = `phMeOccursRaw` minus `phMeTripPauses`, so grid, meals, drawer, This week, Habits and Health follow it.
  `phMeTripPausedOn(k)` lists the paused: one ⏸ n chip in the row above each day (`phTripPzChipHtml`, opens the trip), the drawer's
  one line "Paused · back <day>" with the list under All (`phTripPzRowHtml`), "away" on This week. A fast week holding a trip day
  reads "–" and neither counts nor breaks Weeks on aim.

## Mine hub (her week, work, money, fitness, code)
Five steps on HER record (the one in My profile): **Fitness** in Body (Steps + weight + Weigh in; its routine dots are Habits'; see
Fitness + Exercises), the rest in Life.
- **Week**: Mon–Sun table; a tap on a past day or today opens its journal under the row (a timeline written from the day + her note,
  kept as she types); her to-dos beside it by area, dropdown All · Work · Money · Code · Fit · Home · Travel. A to-do tick stores
  when (`done` = the time).
- **Work**: the month: hours per clinic, the Acupreg invoice table, work + travel. Hours come from BOOKINGS, never stored: first
  patient's start → last patient's end per clinic per day (this login's that are hers + the other clinic's). Each calendar day
  heading has a hover title ("CBD 8 h · 3 patients").
- **Money**: income per week by her sheet's formulas, invoices + tax due ticked off, bills that repeat, the tax pile for Tina, the
  visit-type Prices table; hidden until Show $ (this visit only). HER OWN money syncs in her Me row (her yes, 2026-10-26: `d.price`,
  `d.hubset`, `d.bills`, `d.taxp`, `d.plans`, `d.jn`, `d.dueT`, `d.hlth`, `d.hlim`, entry by entry); herbs, patients and pharmacy
  money never go there. Herbs Linh reads the CBD login's log ("–" on Acupreg).
- **Code**: a plan table, a five-step stage bar, tap a step to move it.
- Workouts / rehab / code / travel = her routines read by title (`PH_HUB_RX`); a title with a money word (invoice, bank, BAS, tax,
  bills, payments, lease, rent …, `PH_HUB_RX.money`) is never a workout (her "invoice is not fitness, its financials": "Claude
  auto-run" had matched "run"). A "This week" line in the Me drawer. Code: "MINE HUB" (`phHub*`).
- **Health** (Body; "i want it to count towards my healthcare"): her events titled Chiro / Physio / Massage / GP / Scan count
  themselves up to today, "+ Log today" (+ Other) for the rest; per visit With · Paid · nib back (hidden until Show $), Yours worked
  out; nib extras left a year for Chiro / Physio / Massage (limits typed once); a line on Money; a logged visit in the Week journal.
  Code: "HEALTH" (`phHl*`).

## Habits + Steps (her Atomic Habits)
**Only on her own record.** James Clear's Atomic Habits is the inspiration (her word).
- **Habits page** (Body, after Fitness, `phHubHabHtml`): a table (habit · last + this week as a chain of dots, linked between done
  days · in a row · this week · Today's tick) in three groups, Movement · Sleep · Care, each with her "I am someone who …" line
  (`d.idn`) and its votes (every tick is a vote; `it.vb` keeps the ticks a routine trims). A row's tap opens the panel beside it (in
  a row · best · this week · votes, 4 weeks, **After** = the habit it follows, **2 min** = its two-minute version, **Where**, the
  group bar, Not a habit with Undo); + Habit picks from her routines; a Votes chart below (12 weeks, a line a group, drawn once).
  Phone: a row a habit, the panel a sheet from the foot.
- **Which habits** (`phHabList`): her routines guessed by title (fitness / rehab = Movement; sleep / bed / night = Sleep; skin / hair
  and the Breakfast meal = Care; money, code, travel and work never) + three that tick themselves: Steps (on goal), Fasting (a fast
  that met its goal; her aim days are its plan), Herbs (every dose taken, while she has a prescription). Her picks (`d.hab[id]`:
  group, `two`, `aft`, `wh`, `off`) win over the guess.
- **A day** (`phHabSt`): done · two-minute (half dot, counts in the row) · missed · not planned · to come · before she started
  (`hubset.habAt`, never a miss). **Never miss twice:** a second miss in a row turns the tick red (`phHabWarn`). Due = a gold glow
  from the habit's time, or once its After habit is done (`phHabDue`).
- **One tick, four doors** (`phHabTick` → `phMeDoneToggle(tk|id, v)`, the routine's own `dn`; a meal habit's tick = Had it): band,
  Me drawer's Habits, Habits page, a circle on today's calendar block (`phHabCalTk`; never drags or opens the card). The tick pops,
  its link draws, in a row rolls, "+1" rises over the votes, a gold ring every 7 in a row; no words; all off under reduced motion.
- **Steps** (`d.stp[day] = {n}`): typed from her watch (a web page cannot read it) in the band, the Me drawer's Steps row and This
  week's Steps column (days on goal in the Week row). Fitness: a steps tile + the Steps card (ring, today's field, days on goal,
  average, best, 14 bars against the goal line). Goal 8,000, ✎ changes it (`hubset.stg`, 500–100,000).
- Data: `d.hab`, `d.stp`, `d.idn` in `PH_HUB_MAPS` (entry by entry). Code: "HABITS + STEPS" (`phHab*`, `phStp*`).

## Fitness + Exercises (C22's fitness, moved in)
**Only on her own record.** C22's Fitness, moved in so she can plan and log her exercise (her word); all of it is live.
[BUILD-NOTES "Fitness + Exercises"]
- **Fitness** (Body, `phHubFitHtml`): Bring in (her C22 fitness, once: library, templates, log, planned, stairs, week plan; C22's
  keys are READ, never written) · This week (workout + rehab routines and Steps; a dot a day = what Habits reads and ticks, one
  tick both pages) · a posture tip under it
  (`PH_FIT_TIPS` = C22's BIOMECH_TIPS word for word + her session / pain notes ≥ 15 characters; C22's weighting and date-seeded pick;
  ♥ / ✕ with Undo in `d.fbt`, `shown` keeps a ♥'d tip all day; C22's `book33-biomech-ratings` READ, never written) · **Weekly
  plan** = her calendar's routines (`phFitPlanApply`: a day set to a type moves that weekday to the routine of that type, made in
  g-fitness if none; done days stay; the past never reads as missed; Undo) · Steps + Weight · Steps plan (walks + stairs, under the
  Steps card) · Today (type, template, sets, timed hold, rest ring, pain + stars, ▶ Workout Mode; Finish also ticks today's routine
  of that type) · Upcoming + Recent · **Goals** (one per exercise: reps / hold / weight / tick, `d.fgl`; reached on a ticked set =
  toast + buzz + gold; a flag on Today's row, in Workout Mode, in the exercise panel) · **Personal bests** · **Weekly volume**
  (8 weeks) · **Progression** (one exercise's last 7 sessions).
- **Week rules** (no stored data): Wed + Sat rest every week (`PH_FIT_RESTWD`, locked in the Weekly plan, `phFitPlanSet` refuses a
  type); deload weeks (`PH_FIT_DL`: 18-week cycle from Mon 29 Dec 2025, weeks 5, 9, 14, 18: Monday light, Sunday extra rest;
  `phFitGoalOn`); planned / done days a week (`phFitWkSt`, rest days never planned); the week streak (`phFitStreak`, memo on
  `phMeS()`; one short week forgiven; 8 empty weeks end it; toast at 4, 8, 12, 26, 52 via `phFitStkSay`).
- **Coach + Workout Mode**: the coach line (`phFitCoach`: Last · PR with the trophy, gold past it · "▲ n kg vs last time" · "No
  history yet") on a template exercise, her exercise and each Workout Mode card (before today there); the ribbon (`phFitRib`) in a
  template and on each card; a template's summary (`phFitSumHtml`: map, numbers, group buttons; `phFitHl` lights a group's
  exercises, as does a muscle tap); Workout Mode's top (`phFitWmWeek` dots; `phFitWmHero`: figures lit as sets are ticked, sets
  ring, numbers; `phFitWmHl` dims the other cards; the trophy strip when every set is done).
- **Equipment drawings** (her word: back in): C22's barbell / dumbbell / kettlebell / cable-machine / bodyweight (`PH_MU_ART.eq`,
  `.loaded`; `phFitEq`). Equipment = `gr` (her C22 choice, set in its Equipment row of drawn chips), else the exercise's reference
  entry, else C22's name rule, else Bodyweight. The drawing sits beside the name in her exercise, a template exercise, Workout
  Mode's cards and a reference entry; a template's barbell exercise shows the bar loaded for its heaviest set (`phFitPlatesHtml`).
- **Templates**: set presets (`PH_FIT_PRE`, `phFitPreHtml` / `phFitTpPreset`, Undo); − / + on every number (`o.st` in `phFitSetTbl`,
  `PH_FIT_STEP` reps 1 · kg 2.5 · s 5; on the phone − + sit under the number); ▲ ▼ move an exercise (`phFitTpMove`, the open one
  follows); sets by type under the muscle groups (`phFitTyLeg`, `phFitTyHl`, never lit together with `phFitHl`). Shelf
  (`phFitShelfHtml`, `phFitTs`, `phFitTsSet`): All · types · No type yet · Goals (→ Fitness, its Goals) · + New type · Sort; the
  templates holding the type with k/m; the type lights its rows. Sort (`phFitSortHtml`, `phFitLibSet(…, plain)` = no fill).
- **Types**: hers after C22's five (`phFitXts`, memo on `phMeS()`; `d.fxt`; + New type in each Type row, the type tabs and the
  shelf; one of hers goes only when no exercise has it, `phFitXtRm`); C22's glyphs (`PH_FIT_XT_GL`). A type set in a Type row starts
  an UNTUNED exercise as that type usually is (`phFitTyFill` / `phFitFresh`, C22's XT_FRESH: Isometric Timer + 1:00, Flexibility
  Timer + Left & right + 0:30, Plyometric 2:00; `xd` remembers what the type set; 1:30 counts as untouched because Bring in writes
  it; a logged weight or her own rest / Timer / sides = tuned, left alone; Undo).
- **My exercises**: type tabs (`phFitLt`); Merge into another (`phFitMerge`: fwo + ftp rows, fgl, fdn take the kept one, the
  duplicate is deleted, one Undo restores every touched doc). Picker (`phFitPickHtml`, Today + templates, one open at a time):
  figures lit by group (a muscle tap picks its group), search, ticks in place (`phFitPkBar`), Add n in one save (`phFitAddMany` via
  `phFitExRow`).
- **Calendar** (`phFitDayItems` in `phC22Src`, BEFORE the herb doses so an all-day one shows first; memo on `phMeS()`): a workout
  ticked on a day with no routine of its kind = a done block at its ticked time (else all day); a planned one (`fpl`) = a pale
  all-day chip (`" fpl"` via `phHbCls`); card `phFitPopHtml`, Fitness opens the page (`data-fit-cal`). A workout or rehab
  routine's own card (Gym …, `phFitRtBits` in `phC22PopHtml`; her word: "Integrate gym with health pages and give direct
  links"): that week's Habits chain with a letter under each dot + n of n (another week: its dates), the streak at 2+ weeks,
  today's session (template · exercises · sets), ▶ Workout Mode before Done on today's card (`data-ph-fit-wm`: her Fitness
  page, Workout Mode over it), then doors Fitness · Exercises · Habits (`data-hab-go`, opens at this routine) · Health. The card
  is 320px on a computer (other C22 cards 240), the bottom sheet on the phone.
- **Pilates milestones** (`phFitPilN` / `phFitPilSay`, hooked in `phMeDoneToggle` and `phFitWoSave`): the tick that lands her
  Pilates days on 7, 30, 50, 100, 200, 365 toasts.
- **Exercises** (Body, after Fitness, `phHubExHtml`): her library (search, groups, Hide) + workout templates; C22's small figure on
  each exercise chip (`PH_MU_ART.tileSvg` drawn once per group as a blob picture, `phMuTileSrc`; a repaint stays ~0.09 s).
  **Muscles & exercises** (C22's reference, `phMu*`): two figures tinted by group, Muscles · Exercises · Checks · Where it hurts,
  C22's entries word for word with their sources; an entry opens in place under the card with Back; C22's moving figures; Where it
  hurts reads her pain log, lights her side and has her rehab routine chip (`phMuRehabChips` → `data-hab-go`); doors: "What is
  around the ..." beside a ticked pain area, a Reference row in her exercise. **My don'ts** (`phDn*`, `d.fdn` / `d.fdk` /
  `d.fdx`): her list in her words, a table with its header row as its own first row, Never | Rather not, links to a pain area or
  exercise, a journal where Happened again is a grey ring, never red; Prompts join only on Make it mine; Hide, then Delete for good
  from Hidden; a quiet line on Today and in Workout Mode, "Make this a don't" beside a ticked pain area.
- **Trap**: the muscle shapes live once in `#phMuDefs` in `<body>`; their four rules (`.tpe-mus`, `.tpe-shd`, `.tpe-fib`,
  `.tpe-base`) are unscoped on purpose (a `<use>` copy takes its shape's rules); `--mi` (not `--i`, which LCM already uses) is
  registered with `@property`.
- **Climbing**: a climbing type's session (Bouldering, `phFitIsClimbTy`) adds routes = name · grade (V0–V10 offered, any typed) ·
  tries − + · Sent (`{c: 1, n, g, a, ok}` in a session's or template's `ex`). Sent counts as a done set (`phFitSets`); routes never
  join her library. Bring in brings C22's climbs; when `hubset.fitIn` has no `v: 2` (an earlier Bring in took the rest), its banner
  offers the climbs only, into the C22 sessions/templates.
- Motion: a set pops and its tick draws, the rest ring counts down and buzzes at zero, gold once when the day's sets are done, the
  week's dots pop and link (the Habits way); all off under reduced motion.
- A routine in g-fitness counts as a workout (`phHubKind`, after the money words). Data: `d.fex`, `d.ftp`, `d.fwo`, `d.fpl`,
  `d.fsp`, `d.fgl`, `d.fdn`, `d.fdk`, `d.fdx`, `d.fxt` (her own types), `d.fbt` (posture-tip ratings), `hubset.stride`,
  `hubset.fitIn` in `PH_HUB_MAPS` (shapes in the code comment). Code: "FITNESS + EXERCISES" (`phFit*`, `phDn*`, `phMu*`).

## One Me (her record joined up)
**Only on her own record** (`phFastIsMe`); every patient's record is unchanged.
- **Me chip in every page's top bar** (`phTitlebarMerge`: `.ph-tbm-me`, the count of today's open things; phone ☰ · title ·
  primary · Me · ⋯, computer Me · ⋯ · primary; Appointments keeps its own toolbar chip). The drawer sits under whichever top bar
  shows (`phMeDrwTop`).
- **Her card leads the drawer** (`phMeCardHtml`): initials, name, "Day n · phase · Fasting h:mm"; a tap = her record, ✎ = change
  the name. Each drawer heading of hers ends in › to its page (`phMeH4` → `data-ph-me-go` → `phMineOpen(tab)`): Today's meals →
  Diet (Meals), Herbs → Herbs, To-do → This week, Trips → the trip, Birthdays, Routines; the rows stay today's ticks.
- **Her rail: Body · Life first** (`PRES_MINE_RANK`, grp `body` / `life`): Body = Cycle, Meals (her Diet page; Fasting is off the
  rail, opened from Meals' Your fasts ›), Herbs, Fitness (Exercises right after it), Habits, Health, Log; Life = Week, Work, Money,
  Code, trips, Birthdays, Routines; then her file and the visit steps; her bottom group reads "Clinic dated". Cycle leaves the Plan
  step on her record (`presMineCycleNorm` turns plan + cycle into profile + cycle, so every Cycle door lands there); Diet leaves Log.
  Phone's sideways row: Body · Life · File · Clinic captions. **Birthdays** (by month, + Birthday) and **Routines** (Morning ·
  Afternoon · Evening · Any time, + Routine) are pages (`phMeBdaysPageHtml`, `phMeRtsPageHtml`), rows shared with the drawer
  (`phMeBdRowHtml`, `phMeRtRowHtml`). Next on one of her pages goes to her next page; her last one goes to the file.
- **Opens at This week** (`presAssessFirst`); the "This visit · Next up" box is hidden on her record.
- **A today band under her name on every page of her record** (`phMineBandHtml`, repainted by `phMeDrwPaint`): cycle day, fast,
  doses, meals, Steps, Habits (n of today), her next habit, next patient today; each chip opens its page (next patient =
  Appointments). Phone: one sideways row.
- **This week has Cycle (CD n), Meals (had of planned) and Herbs (taken of due) columns** (`phHubDay` `cy` / `mealsP` / `hb`), and
  Steps typed in it. Below 1500px the To-dos sit under the table (her 1220px window included); the phone keeps the sideways-scrolling
  table (836px).

## Communications / messaging
Tone and voice: code3 above. **One composer** on the patient's Messages page (a bubble + slim band, synced to the plan, its phase
and her Fang Bing Ren answers); "Copy message" copies the message only [The Messages composer]. A message offer fires on any phase
change (manual or cycle/IVF cascade), evaluated at render time; a session-only map (plan + phase + `sinceKey`) stops repeats. "My
Cycle — gone quiet" lives on Communications' **Due** tab, never the Dashboard. The Check-in panel is its own composer. The
All-templates hub holds message templates, letters and the plan template manager. Message dates carry no year; `{{nextAppt}}`
reads the date in her words.

## Visit logging & findings charts
**Today's visit** opens with the **complaint compass** (`phCxCardHtml`), the one "how have things been" table [Today's visit = the
complaint compass]: main + secondary complaints scored each visit (0–10 or % better), charted over time; Energy 1–10 is its own
group. It replaced the Re-check card and still mirrors into `rec.recheck`. Each complaint and pain is scored with a slider +
number (`phCxSlHtml`; a % box takes any number on % better); Energy keeps its own 1–10 bars, am · pm · ev (in the panel
on the wide card). Columns: Complaint | Baseline | Trend | Today | From baseline | Note. Goal under the name,
tap to edit (`phCxGoal`; hers in `complaint.mainGoal` / `secondary.goal` via `phCcWrite`; "↺ auto" returns it). The Note box is
always open and saves as she types (`phCxTypeSave`); every visit's note is kept, last visit's under today's box. Gold row = the
one asked now (number keys, G B S W, ↓ drive it). Her order = `rec.complaint.secondary` (drag ⋮⋮ or ▾ Move).
**Baseline** [Baseline Compass] = a row's FIRST score (derived on read, with its date; the one stored thing is
`rec.ccTrack.base[rowKey] = { day }` from "Move baseline to today", `phCxRebase`); every row shows its distance from it, + =
better (a sign is a running total: Better +1, Worse −1, Same 0, Gone counts better). One model (`phCxModel`) feeds the rows, the
chart (From baseline | Score, a group filter), the header counts and the live paint while a slider moves (`phCxLiveRun`). View
state (From baseline | From last visit, chart mode, filter, open drawer) is per patient, never stored. Phone: no chart, no body
figure.
**One table** (her pick; area headings, "Signs · n" lines and buttons were too busy): complaints + signs in ONE table, rows in the
nine Fang Bing Ren (Fang Bing Ren) body areas (`phCxGroups`; a complaint nothing places goes to Other). No area heading rows, folds, counts
or "n of m set" pills: an area = a thin coloured edge down its rows (`.ga`, `--gc` = the area colour), its short name small on its
first row (`phCxAreaLabHtml`, also holding "Same as last time" = `phCxRestSame`, on mouse-over or a long-press). ⋮⋮ ▸ ▾ sit in
`.ph-cx-hov` at the end of the name, shown only on mouse-over, a phone long-press (`.lp`), an open drawer or an open menu. No keys
line (the hint is the search box's tooltip).
**Signs:** only Fang Bing Ren signs she has ANSWERED get a row (`phCxSignList`; a Usu Yes adds one too, her pick); never ones the app only
works out; never a FIXED sign (`phCxFixedKey`, her word 2026-10-27: how she is built, family history, a tendency to miscarry, the
illness's course, "spirit intact" have nothing to rate; temperament keeps its row). Sign rows: indented, a SIGN tag in their OWN
area's colour; one added while a complaint was tapped (`sxPin[key].cc`) sits RIGHT UNDER that complaint even in another area
(`r.host` in `phCxModel`), others after their area's complaints. Rated Gone · Better · Same · Worse from the next visit on
(`rec.ccTrack.days[day].sx`; a first visit leaves the cell empty, no "rated from next visit"); a Gone after her last Yes tap turns
today's Bing tick off (`phCxGoneToday`); Ren is never touched.
**Pain rows = the pain map's rows** (group "Pain, muscles & joints"): the score is the pain store's own
(`rec.msk.visits[day].pains["region|side"].now`, written via `phPmScoreSet(..., force)`), the Goal is `painMap[i].goal`, the
starred pain stands in for a typed pain complaint; no separate Pain card on Today's visit while the Compass holds them.
**% better** (her "i cant see the % option"; "Both A and B"): a pain row with a baseline before the day being scored follows the
switch (slider 0-100% + box, `phCxPctBase`); her % is kept as `vis.pains[r|s].pct` beside the `now` worked out from the baseline
(7, 50% = 3.5), so the Musculoskeletal page keeps a number; any other "now" score drops `pct`; with no baseline yet a pain stays
0-10. On "% better" + From baseline every complaint and pain row (and the group average) reads its distance in % (`phCxPctOf`);
Energy, signs and From last visit stay as they were.
**Earlier visits:** a done booking counts as a visit (`phSeenDays` = logged sessions + bookings; read by Today's visit strip,
`phTodayParts` and the Compass). On a computer a "Scoring" bar (on the wide card the "Today ▾" dropdown; Today, then the patient's
done bookings newest first, `phPastBookDays`; 5 chips + Older ▾) scores an earlier visit in the same table under a gold line
(`phCxAt` view state, `phCxDayOf`; complaints + pains + notes only; the earliest scored day becomes the baseline);
"N earlier visits · none scored" until one is.
**Sign search** (her pick; it replaced "+ add"): an always-visible box under "Compass · came in for" (`phCxsHtml`) searching the
Fang Bing Ren signs (`phCxsOptions`, the Fang Bing Ren page's `phCsToks` / `phCsScore`). A result = that page's question row, Now Yes / No · Usu Yes /
No (a Bing sign and its Ren twin = one row), saved through `phTriWrite` (the same answer again clears it); a Yes pins its row
under the lit complaint; a fixed sign's result says "Fixed" where others say "✓ in Compass". The list stays open for the next tick
(Esc / a tap elsewhere closes it), 8 rows then "Show all N", then "Add as a complaint" / "Add to Watch"; ↑↓ + Enter = Now Yes,
Shift+Enter = Usu Yes, Enter with no row lit = her words as a complaint.
**A pain on any plan** (her "allow for adding pain symptoms for all types of treatment plans"): words naming a place on the body
(`PH_PAIN_REGIONS.parse`) put "Add pain · <place>" on top of the list (`phCxsPainOpt`), and Enter with no row lit adds the pain
instead of a complaint (`phCxPainAdd`, to the pain map of the plan on screen via `phPmWrite`, Undo in the toast). A pain map makes
any patient a pain patient (`phMskApplies`, which also counts `rec.painSites`): the Pain group, its row and the Musculoskeletal
tile appear. A typed complaint the new pain stands in for hands it its scores, notes, baseline, earliest start and Goal
(`phCxPainAbsorb`, copies only); a typed complaint whose words are only places (her "tmj") counts as one (`phCxPainDup`); the Care
Plan Goal skips the complaints the Compass hides.
**Motion** (all off under reduced motion): the gold "now asking" line = ONE band behind the rows (`.ph-cx-askbar`, `phCxAskGlide`;
until it has found its row the `.ask` row itself is gold) gliding to the next row; a ✓ pops on a scored row (`PH_CX_TICK`);
"Asked n of m · better · worse · gone" at the header's right (`phCxGlanceHtml`; no "Now asking"; not on the wide card) with a gold
bar under the header that fills (`phCxProgGrow`); a new sign row slides in with a gold flash. `phCxSettle` runs these once per
paint (`phCxAfter`, or a timer after a full-page paint). The small body beside the search (`phCxFigHtml`: the Fang Bing Ren page's drawing,
front view, computer only) glows each row's place in its area colour (a sign: `phFbbPlaceOf`; a complaint: its area's place; a
pain: its words, `PH_CX_PAIN_PL`; Energy, Heat & sweat, Skin and whole-person signs: a ring); the asked row's place breathes, a
just-added sign's pops; the node is kept through a repaint while the same places glow, so the breathing never jumps.
**Table + panel on a computer** (her pick; her "this looks messy ... improve organisation and ui") [Compass: table + panel]: a
card 900 px or wider (`phCxCardBHtml`; narrower and the phone keep the layout above) has ONE header line (Came in for + the search
· **Today ▾** of her done visits, gold on an earlier one · From Baseline | Last visit · 0–10 | % better · **Chart ▾**, the chart
folded until tapped) over a 3-column table **Complaint · Today · Change** (Change = baseline → today, a small line + the +/− pill,
`phCxChgHtml`; no Baseline / Trend / From baseline / Note columns); Energy is the last row ("am · pm · ev", its 1–10 bars in the
panel); the pain tools are one joined bar under it (＋ Pick areas · Close-ups · Surgeries · Pain intake). Beside it the **panel**
(`phCxPnlHtml`) holds the asked row large: area, name, Goal (the Goal lives only here), Today, the body drawing, Baseline · Last ·
Since + its chart, last visit's note, then ✎ Note · Details ▾ (side, detail, Move baseline) · Next: X ›. A tap on a row puts it in
the panel; a score moves the gold row and the panel on. The count is said once, on the Ask step: no "Asked n of m", no gold
progress line, no count pill on the Ask / Look / Treat headings (`phTodaySecHd`). The header's switches never squeeze; From ·
switches · Chart ▾ wrap down together (`.ph-cx-tools`).
**Details, any number of Mains, a sign on the bar** (her picks): every row's Details ▾ (the panel; the drawer on a narrow card)
edits it in place: a typed complaint = Name · How long · ★ Main · Remove (`phCxCcFormHtml`; Remove on the chief moves the next
complaint up with its own scores, Undo); a pain its own form; a sign Track with Better · Same · Worse | Bar 0–10 + Make it a
complaint (`phCxSxTrackHtml`). ★ Main is a switch on each complaint, any number, one always stays Main (`phCxStarToggle`;
`c.mainOff`, `s.main`, `p.main`; the item flag is `star`, while `main` still means the chief's slot, which never moves, so scores
stay with their complaint). Each Main leads its group, groups with a Main first; with more than one Main the Care Plan's Came in
for row, Aim and Watch join them (`phCxCcMulti`). A sign on the bar (`rec.ccTrack.sxBar`) is scored 0–10 under its own id in its
Signs line; made a complaint it keeps its scores and its Fang Bing Ren tick and wears a small Sign tag.
**Read elsewhere:** the Treatment tab has no Subjective table: its "How <name> is" card (`phTxCxHtml`) shows the Compass's own
lines, read-only; Watch = the template's Red flags only, no "Apply the usual". The Care Plan Goal reads the same Goal lines,
complaints only (no derived Fang Bing Ren "complaints" in `phCcSecAll`); the letter's "Watching:" = complaints + the sign rows she can see
(DRAFT wording).
**The checks** are compact rows, two across, each with Open and Skip ▾ (Not today / Always for this patient); a skipped check
folds into the "Skipped" line and counts as done (`phTodayPartOk`). Quick assess shows 8 questions in 2 columns on Today's visit
and Fang Bing Ren. A visit is finished in ONE place, the Treatment tab's "✓ Complete session N" (`data-pres-acu-log`; her pick: no "Log"
wording; Today's visit shows "Open Treatment", then "Session N complete"). **"No acupuncture — herbs only today"** saves
`noTreatment:true`; every reader of `rec.acuSessions` (the printable record, Patient Journey, the Visits table, the quiet-patient
detector, **session-package counting**) branches on it.
**Copy notes** (her picks; code "COPY NOTES", `phCn*`): one tap copies today's visit as labelled lines for her Cliniko treatment
note (date · visit · cycle day, Scores, Tongue, Pulse = the Note tab's text, Abdomen, Acupuncture = points + press + therapy
lines, each Formula with its herb lines + Total + Dosage · take-days · lasts N days) and shows what went in a box under the button
(✕ closes). Every line is that fact's own read; a part with nothing today is left out; the formula = dispensed today, else the one
Dispense opens. Doors: the Today's visit step bar, the Treatment band, the ⋯ menus (Care Plan / Treatment / Dispense), the toast
after Complete session.

**Findings charts** (tongue / abdomen / pulse) are the app's own tappable diagrams with a "brush" (pick a sign, then tap its
regions). The exam pages are the ONE entry; `phExamMirrorToday` copies today's exam into the dated record. Read every finding
through `phVisitFndRead`. A **Findings trend** sheet (Grid | Trail) shows dated tongue and abdomen findings from the exam pages.
**Tongue:** `visitFnd[id].tng = {colour, colourMore[], colourAt, shape, moist, coatThick, coatColour,
coatArea[] (root / mid = centre), coatAt{} (coat colour per zone), coatQual{}, marks{}, under, thickAt{}, deviation, v2}`. The
Tongue page [Tongue page: tabs + the three jiaos]: photos beside eight tabs in EXAM ORDER (her pick B 2026-10-28, "i struggle to
find the signs i need ... shape list looks random"): Colour · Shape · Movement · Moisture · Marks · Jiao · Coat · Sublingual, two
rows (on the phone too, every name whole); inside a tab one labelled row a thing, each a scale with normal in the middle — Shape =
Size (thin · normal · thick · swollen) · Texture · Length · Tip (the chips draw their outline); Movement + to the left / right;
Marks = Cracks · Dots · Edges (teethmarks here, her pick) · Raised; Coat = Thickness · Colour · Type. No dropdowns. Code: "TONGUE
EXAM ORDER" (`PH_TNG_STEPS`, `PH_TNG_STEP_ROWS`, `phTngStepHtml`), shared by both pages. A red tip chip on Colour; the Jiao tab = a tongue map + one line per zone (Upper / Middle / Lower / Left / Right) that opens its
own colour, coat, form and mark bars; zone colours (red tip) are record only (`phTngChipKeys` skips `colourAt`). A linked chip
carries its Fang Bing Ren signs in its hover and the thin plum bar under it (`.tfp-lk`, the Find the Ren link mark); the
"Fang Bing Ren · N ticked" tab opens every linked chip in place (her "just open the chips", never the Fang Bing Ren page). The photo viewer's Tongue analysis (`phRenTngSecHtml`, her 2026-10-28 "similar to the tongue page") has the same
tabs and lines, written to the photo's own day (today, a visit, or a dated review); no Fang Bing Ren tab there (its underline + panel
show on today's finding); a sublingual shot opens on Sublingual; Drawing hides on Jiao.
**Abdomen** (her redesign): `visitFnd[id].abd =
{tension, tensionAt{} (read-only legacy: nothing new is written), tempC{epi, lower} (°C at CV12 / CV4, 28–40, no navel),
marks{sign:[zones]} (Seen signs distended / bulging / sunken / vispulse sit by ROW: whole, epi, umb, lower), v2}`; tension is one
whole-abdomen value. Seen has "flat" (whole belly, no place); Temp = cold · cool · warm in BLUE / PALE BLUE / RED (temperature
only; water and gas ink stay grey), one temperature per place; Feel = tender · tight hypochondrium (`tighthypo`, R / L hypo only,
ticks the Chest & ribs pair) · pulsation · tight rectus · thin wall. No Xia Xin chip: tender at epi IS Xia Xin tender
(`phAbd2Read` reads an old `marks.xiaxin` as tender@epi). The page works the Pulse page's way (her pick) [Abdomen page: the Pulse
page's way]: one tab bar Seen · Temp · Sounds · Tension · Feel + ✕ Erase that stays in view (`.ph-pls-tool`), only the open
group's chips under it, °C steppers in the Temp row; a picked sign stays picked and taps places on and off (Esc lets go); with
none picked a place opens its own signs beside it (`phAbdPopHtml`: only what can sit there, Clear place). "Whole abdomen" is a
place (stored as `"whole"`; an empty list still reads as whole; a whole temperature washes every zone without its own,
`phAbdTWashes`); the side view's rows tap too (`data-abd-band`). One tab panel beside the charts: Summary (still "Reads as") ·
Note · Fang Bing Ren, today's photo over it (`phAbdPhotoHtml`, Today | Last flips, `phAbdPhotoRefresh` on a photo load). Fang Bing Ren the
Tongue page's way (her "Same as Tongue now"; no sign list): a chip that reaches a sign carries the plum link bar (`.tfp-lk`) and
its signs on hover (`phAbdChipLinks`, off the `abd:` specs); the "Fang Bing Ren · N ticked" count (`phAbdFbrTicked`, a fact) sits
on its tab; `phAbdChartWordsOf` is the one read of a chart's Fang Bing Ren words. Last visit draws in grey under today's marks, front and
side, still, always on (`phAbdLast` = the newest dated finding before today; `opts.prev` on both charts, `phAbdGrey`), with a
"Today · Last · <date>" key over the charts. Every sign is drawn: tight rectus (red dashes by row), thin wall (dotted ring), a
Whole abdomen sign once, big. Phone: the sign tabs one sideways row (edge fades), Erase at the end of the chip row. The page
handles its own taps (`phAbdClick` → `phAbdChartWrite` → `phAbdWrite`); the old shared `data-visit-abd2` handlers and the
`phAbdExam` borrow are gone. **The front drawing** (her 2026-10-28 "shouldnt it follow the space along the curve of the rib cage?",
her 8 picks on mocks/abdomen-rib-curve-mocks-2026-10-28.html, B "rib cage drawn"): R / L hypo is a **band along the inside of the rib
arch**, from beside the breastbone (`PH_ABD_CUT` 8.5 off the midline) out through the side, `PH_ABD_BAND` 12 deep along the arch's
normal; epi is the pit under the xiphoid and the space below the bands; the side columns divide on the **rectus edge**
(`phAbdRecX`), rows 2 / 3 stay the 10-20 even thirds. One geometry, `PH_ABD_ZPTS` (point lists; `phAbdZoneGeom` adds path, middle,
size, a hypo sign at its band's side end, clear of the name). Faint ribs, breastbone, rectus muscles with their bands and the pubic
symphysis for bearings (not on the read-only minis, which draw the rectus edge dotted); dotted dividers drawn once (zones carry no
stroke of their own); hypo names written along the band; the outline open at the top. Tight hypochondrium = a firm red line hugging the
arch + a dashed line at the band's inner edge (`PH_ABD_HYPO_LINES`); tight rectus starts below the band (`PH_ABD_QY`). The Fang Bing
Ren body figure's nine belly places are the same shapes (`phRenZonesHtml` through `phRenAbdMap`: xiphoid 150, 10th rib tip 33 out at
175, pubis 240.5), so both pictures agree.
**Pulse:** each tick is dated; each new day starts blank. The chart is HER TABLE (her pick): 6 columns, 3 PRIMARY (Cun / Guan /
Chi, lightly shaded) and 3 SECONDARY -- never pair a secondary column with a primary one. Cun / Guan / Chi each head ONE column
(R: Up. Resp / Stomach / Bladder, L: Heart / Liver / Adrenals, `PH_PULSE_POS_COL`): the organ-name row on top, the Cun / Guan /
Chi row right above the cells (her pick B), each position and each short column name showing the full organ name on hover. A
charcoal line between every column, ONE solid grey line through each word (Skin / Qi / Blood / Organ) with the drawings sitting on
it, no boxes, her grey bar and base, equal 44px rows, lines and words in one charcoal, RIGHT / LEFT in the label column; the frame
is CSS on its grid (`.ph-pulse-fr/-vl/-pc/-dl`); drawings level with the line (`plv-*` on `phPulseShapeSvg`), wider in the wide
columns (its `vw` argument). One cell shows three inks over each other (her pick): her normal pulse solid green (widest;
`PH_PULSE_TPL`: Cun Qi, Guan Blood, Chi Organ, arches; Left Guan wiry; drawn under her ticks by `phPulseBase`), last visit solid
grey (middle, `.ph-pulse-prevl`, shown even when today is ticked), today blue (thinnest, blue-tint cell), with a legend Normal ·
Today · <date> over the chart. Normal and the last visit's date in the key are chips that hide / show that line on every chart,
remembered on this device (`lcm-pulse-layers`, `phPulseLayer`; her pick); today's blue always shows; the date chip only when a
last chart exists.
**The Pulse page** (her pick) [Pulse page: tabs, the chart moves itself]: the four quality groups are one tab bar (Concavity ·
Radius · Intensity · Texture + Erase) that stays in view, only the open group's chips under it; a picked quality stays picked
until tapped off (or Esc); with none picked, tapping a box opens that box's own qualities beside it (`phPulsePopHtml`). Under the
chart one tab shows: Summary · Rate & rhythm (the Shen-Hammer exam, open) · Note · Fang Bing Ren (the qualities that tick a sign,
signs on hover, `phPulseChipLinks`; no sign list on this page). **Pulse in action** = "▶ In action" on the legend line: the beat
is drawn over the chart's own cells (`phPaOverHtml`, the concept pictures' runner as `PH_PP.SC.pulse`), measured off the chart's
own column and row labels (`phPaLay`, again on a width change); today's arches in the chart's blue lift by amplitude at her Hammer
at-rest rate (72 when none, a Slowed chip), following the Hammer rhythm; the chart's own today drawing steps aside while it runs;
still under reduced motion. Every quality has its own drawing (`phPaModel` picks the shape, `phPaDraw` draws one frame). Amplitude
is HER ARROW SCALE: ↓ Soft / ↓↓ Weak / ↓↓↓ Flat, ↑ Slight pounding / ↑↑ Pounding / ↑↑↑ Robust pounding (chips, chart glyphs and
arch height all follow the count). Thin / Narrow is one chip; no Loose; Blocked = walls both sides + her loop; Ropy = thick wiry
line; Small compressed holds up to 3 per cell (`n` on the mark). DEEP and FLOATING ARE READ FROM THE DRAWING (`phPulseAutoDepth`,
never stored): below the position's normal depth = Deep, Skin row = Floating; their chips light up (`.auto`) and Patterns, Fang Bing Ren and
the SHPD notes read them as if ticked. The pulse knowledge base (`PH_PULSE_KB_SEED`) only shows hints, never writes. Bell's palsy
is scored none / partial / normal (don't change the scale).

## Timeline & intake form
**Timeline** is its own rail step, right after Fang Bing Ren, on IVF / Natural fertility / Pregnancy plans only (`phTlKindOf`);
"done" = nothing overdue. It reads IVF history, Blood tests and the pregnancy test (nothing asked twice) and takes month/year
dates on Schedule. **The intake form** arrives pre-filled from her file (details, cycle, Yes / No history) and can carry Fang Bing Ren
questions (`PH_INTAKE_FBR_P` must match `PH_FBR_Q.p`); the link dialogs include a text message to copy. Creating a link never
depends on the database SQL.
**The medical history link** (her picks): every link carries the app's own question list (`prefill.qs` from `phIntakeQs()`), so a
question added to `PH_HISTORY_GROUPS` is on the next link; intake.html's copy is only the fallback. A Yes opens a details box on
its row (it lands as that row's note, "Form <date>" tag). Family history has Yes / No / Don't know ("unsure", a grey
"? Don't know", never a Yes) and one "Unsure about anything?" box (`rec.historyGroupNotes`, shown under the group).
"Taking supplements" Yes opens rows of name + dose that land on the Supplements page (one of the four turns on; any other joins
`rec.suppOwn`). The same link reopens with the patient's answers and "Send again" once `supabase/intake_resubmit_setup.sql` is run
(90 days); a resend shows in Intake review as "Updated" with only the changes. `rec.medicalHistoryNotes` has no box: older forms'
notes in it show under Medication & allergies.
**Other condition** (her "include a other option to add unusual conditions in medical history"): "+ Other condition" at the end of
General health and of Family history: type, Add (or Enter) and it is its own Yes row with an Added tag, a ✕ (Undo in the toast)
and its note. Data `rec.historyOther[k] = { n, fam, at, src }` (k = `ox_…`); its answer, note and Form tag are the ordinary
`rec.history[k]` / `historyNotes[k]` / `historyNoteFrom[k]`, so it is a Yes everywhere: `phHxApplicableItems` (the counts, the
flags strip, profile search), the figure (a whole-body chip), the condition chips, Today's visit, the Care Plan History row, the
herb caution (on its own words). The same words as a list row answer that row instead. Not in Allergies only. The link has
"+ Something else" in the same two groups (`history.others = [{ n, f, note }]`); it comes in as an Added Yes row, the details on
its note tagged Form; a later link brings back the patient's own conditions (her own typed ones never go to the patient).

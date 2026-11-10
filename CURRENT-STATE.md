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

## Opening & the cloud (no internet)
Her word: "i want it to operate without internet including opening" [Opens without internet]. A device that holds the
pharmacy opens on its own copy whenever the cloud is away: no internet at once, a failed cloud request at once, no answer
within 10 s (`OPEN_HANG_MS`) then; never the sign-in wall for a sign-in that only failed to refresh. Never another login's copy
(the saved sign-in must match `lcm-data-owner`). The chip reads "📴 offline — saving locally"; when the cloud answers (the
"online" event, a refreshed sign-in, or the first good reply) `resumeCloud()` pulls, merges and pushes behind her with no cover.
The service worker keeps the app, the sign-in library and the PDF reader, so a new build works offline from its first open; the
photo-text reader stays online-only. Code: `openLocalNow`, `bootFetch`, `netFail`, `openedLocal`, `resumeCloud` above `boot()`.
**A device "holds the pharmacy" only once it has synced (audit 2026-11-06):** `localReady` needs the store AND the merge base. A copy with no base has never agreed with any cloud row (the app's seed, or a write after a clear), so signing in adopts the row whole and never pushes the seed or another clinic's copy into it. **The day moves by itself:** `phTodayRoll` moves `TODAY` in place past midnight, and repaints when she is not typing. **Sign out** stops if this device's changes could not be sent, and it signs out this device only (`scope: "local"`). A failed cloud write retries with backoff. Restore lists only this login's on-device backups (new ones carry the owner) and warns on a file from the other clinic.
**Boot housekeeping waits for the cloud** (fixed 2026-10-31): the app's automatic writes (schedule sweep, migrations, made-formula
prices) wait for "lcm-sync-caught-up". The "is sync on?" test now runs after DOMContentLoaded (`phAfterScripts`); a 0 ms
timeout had fired before the sync's own `<script>` was parsed, so the housekeeping wrote 3 s into every boot, before any pull.

## Appointments & calendar
The app opens here. It mirrors Cliniko's day view: solid blocks coloured from `PH_CLINIKO_TYPE_COLOURS` (her Settings →
Appointment types, 21 types read live; words white or dark, whichever measures higher, `phCkInkByContrast`, her yes), a time
gutter; the page scrolls, no inner scroller (except "Whole day" below). **Cliniko look (her picks 2026-11-01):** the colours
are the clear ones Cliniko paints (`phCkClear`, seven sampled off her Cliniko calendar; Break keeps the deeper `phCkTone`); **every
block is one solid colour** (her 2026-11-03 "all blocks must be whole block color"): a booking with no type (a calendar click books
the name only) or a type with no Cliniko colour takes her usual type's colour for its kind (`PH_CK_KIND_TYPE` in `phCkStyle`: ACU + CHM
= 4. Subsequent Acupuncture with herbs, CHM = Herbal Subsequent, ACU = 5. Subsequent Acupuncture), never a pale tint with an edge; a
block reads the name first in bold, then "10:00 – 11:00", then the day's ticks (`phApptBlockTicksHtml`: ✓ visit saved, jar =
herbs out, copy = copied for Cliniko); a past day keeps its full colour (no fade); a booking or event new since the last paint
drops into its time with a gold ring (`phApptBlkFresh`), a new tick pops, a plain repaint plays nothing. Grid opens by default at every width (List a tap away). A
"long day" (≥600 min span) gets a minute-precision map (45+min gaps fold to free bands). Range: 30 minutes before the earliest
booking on screen to the last booking's end (half hours; 4 hours at least; nothing booked = 7 AM to 9 PM). The live "now" line
ticks only while the tab is visible.
**Seamless (her picks) [Appointments grid: seamless]:** on a computer the hours fill the window (`phApptCalPxm` from the room
`phPinApptZones` measured, one redraw when it changes; a phone keeps 66px an hour); blocks edge to edge, 6px corners, a 1px white
seam, no shadow, hour hairlines only, no today wash; hover brightens, nothing grows and no block changes layer (a later block
stays over the earlier one; only the open one, `.sel`, rises: 19, a visit's or one of hers); overlapping visits nest (a later one over the
earlier from 45% across), visits that start together share in halves (`it.same`); her events are solid blocks sharing the time
with the visits ("My events" below); the day head is a small MON over a big date, today's in a teal circle, no count on it (its hover, `phHubDayTitle`, lists each clinic's hours and patients).
**Toolbar + Up next buttons (her picks, Zanda as inspiration) [Appointments chips, one height]:** every control 32px; text
controls are 6px boxes (white, thin line, picked = solid), icon-only buttons stay circles, text at the app's own sizes; ‹ › then
the date in full in teal (`phApptCalDateLong`; the year only when it is not this year), Today only once she has left this week, the day count a "7 days ▾" dropdown
(`.ph-atb-dd`), Grid | List a joined box bar, search with the magnifier; Up next = Start visit (solid; Dispense for a herbs-only booking, Open for a later day) · Profile · Edit in one row, then
Call · Text · Email circles (`.un-row3`, `.un-icons.circ`).
**One height, app-wide:** this 32px box look departs from TAPPABLE THINGS' pill chips on her word, and every page follows it: the
Next button, patient rail, search boxes, small pills; Fang Bing Ren + Ren (each sign a white 32px box, the ✕ its own end); the
exam pages (Today's visit, Ask her, Tongue, Pulse, Abdomen, Medical history); Treatment, the Care Plan and its pain map, Timeline,
Messages (a message group over 6, or one that would wrap, is a dropdown), Musculoskeletal, the Guide, the To Order table,
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
pill stays as it is (it fades after 2 s). **The page ends with the calendar (her Cliniko phone screenshot, 2026-11-01):** the grid
runs on past the last booking, whole hours, to the bottom of the screen; nothing sits under it. The Day summary + Quick actions open
from a tap on the date, as a bottom sheet (`phApptDayOpen`, the computer's card); the old under-calendar widget is gone.

**Appointment popup** (any booking tap): avatar, name (the title, not a door: Full profile is), time/kind/ET pills, a plan picker
(no plan = "no plan yet" + a "pick a condition" chip), a gold "✦ New to you" flag, Start visit (today; the one solid) and Full
profile Buttons, then Call / Text 32px circles and Cancel (a red line) on a second line (Appointments page audit 2026-11-01; the
List card's Profile / Edit and circles match), then one summary line that unfolds the detail rows (Focus, Herbs, Logged, Cycle, Scan) with Book
another / Edit at its foot. A positive-hCG flag (🌸 + gestational week) shows in the popup and on Grid blocks once
`rec.pregTest.result ===
"positive"`. Edit opens on an autofocused Date field (no separate Reschedule). The Service field is a `<select>` of the 21 Cliniko
types + Home Visit/Break + "Other — type it…".
**List view**, desktop (>900px): a lean list with a sticky card beside it (row: colour strip, time, name + practitioner tag + one
line of focus, the plan as a pill in its family colour, a status dot; the card: plan buttons, cycle day, focus and goal in full)
[The Appointments List: a lean list with a card beside it]. At ≤900px the compact one-line row and the phone stack are the older
code. A single-day List appends the day stats + "Herbs to prepare today" and the cross-patient **Today's IVF work** list.
**"Up next" card** (900px or less; above that the toolbar's Next): the next booking today, countdown ring, cycle/IVF gauge, visit ring, herb-jar state, "✉ Send online form". No
lens chips (Everyone/Herbs/Cycle & IVF/New to you/Home visits); at Acupreg only, a practitioner chip row (Everyone · Anni ·
Charlie · Christine · Linh) dims the other bookings, each booking's practitioner taken from the weekday [Practitioners on the
Acupreg calendar].
**The toolbar beside the grid (her 2026-11-05 picks; BUILD-NOTES "Appointments: her toolbar and Body panel"; code "HER TOOLBAR AND BODY", `phTb*`, `phApsRailHtml`, `.ph-tb-*`):** LIVE in build 20261105-153300. Over 900px a 64px toolbar on every week of the Grid: her priorities first, Fasting · Meals · Body (her own figure, small), a line, then Next · Herbs · Doses · To-dos. A gold dot on Body = a number is missing or tape and photos are due; on Meals = a meal is asking how it sat. Fasting, Meals, Body or Doses open ONE panel (`phTbOpen`; all three, no tabs), 560px OVER the calendar, which stays still, the columns never change; tap outside, ✕, Esc or the same item closes it; `phTbFit` stops it above the window's foot and it scrolls inside itself. Left: the figure (`phMbdSvg`, the Meals › Body drawing) with a box beside each tape line (Height, Arm, Bust, Waist, Hips, Thigh, Weight). Right, her day first (HER DAY BY TAP, her 2026-11-05 "i need to be able to record my meal start or stop fast, make this more user friendly", "less buttons ... too busy and intimidating ... interactive animated elements", "add a bar for steps", "ok done build and push"; BUILD-NOTES "Appointments: her day by tap"; LIVE in build 20261106-025200): Fasting = ONE ring she taps (`phTbFastHtml`: it fills to her goal, the hours and "End fast" / "Start fast" inside it, "Started Wed 1:30 pm · to Breakfast" under it, the week's dots), Meals = the rings, a round plate for each meal planned today (a tap = Had it, its time under it), the check-in card under the plates, Herbs = a leaf a dose (`phTbMealsHtml`), Steps = today's box and a bar to the goal line with a walker on it (`phTbStepsHtml`; the Fitness record, `phStpSet`). The next thing to do glows gold (`phTbNext`: the first meal due and not had; else the ring, once Lunch is had on a night she fasts). A time shows only after a tap: the toast's "at 8:05 am" (`phTbTimeActs`, only while the panel is open) opens one time field in the panel, and leaving it moves everything saved in that tap together (the fast's edge, the meal, its doses; `phTbTimeSave`, one Undo; never later than now, a fast's end after its start). Marks move from where they were and pop once on her tap (`phTbSwap`: `data-tb-an`, `data-tb-k` / `data-tb-v`), off under reduced motion; the minute tick repaints the open panel. Then Ratios (Waist : Hips, Waist : Height, Fat %, Muscle %, each on its bar, `phTbRatios`; the lines DRAFT), Fitness (`phMbfStDays`, four rolling weeks, a dot a session), Forecast · Over time (doors to Meals › Body). Typing previews, leaving a box writes through `phTapeWrite` / `phBodyWrite`, the same record as Meals › Body. A page render keeps the panel, its focus and scroll (`phTbBefore`, `phTbAfter`). On her tap only, off under reduced motion: it slides in, a gold line runs head to feet, the tape lines light, the dots slide (`phTbScan`). Herbs and To-dos open a small list in the same place. **Every card opens over the calendar, from Next or from a block's tap** (her "yes open it over the calendar too", LIVE in build 20261105-171800; `#phApptPop`, `phApptPopDock`; her earlier "i only need one", "move floating card to the rail", "remove floating card"): 360px beside the toolbar, always the same place; the calendar stays still, the columns never change; no scrim, so the next booking's tap swaps the card; the same booking again, ✕, Esc or a tap elsewhere folds it back (`phAmFold`), but mid-edit (Edit, Brief, Cancel) a tap elsewhere leaves it. A block under the card is hidden while it is open. The day's numbers stay behind the day-head tap (her pick). At 900px or less: the Up next card, the Fasting chip and "Me n" as before, the card floats beside the block (a bottom sheet on a phone).
**Fewer repeats + motion on her own tap (her 2026-11-05 "minimise any repeating information", "dramatic interactive animation elements", "ok push"; BUILD-NOTES "Appointments: fewer repeats"; code "APPOINTMENTS MOTION", `phAm*`, `.ph-am-*`).** LIVE in build 20261105-142800. Over 640px only; the phone keeps every word and its old slide. **Words:** a talk on days side by side, the same time, sharing with nothing (`phAmRuns`: trip sessions only, never her own draggable events or meals) is one long block: each day keeps its own piece, its tap and its card, the name on the first. Her events carry no time (the gutter says it; the hover and the card keep it), no calendar or meal icon (a fitness, work, home, self, together glyph and a dose's leaf stay); a meal's word on the first day on screen (`phAmMealOnce`), what she ate stays on every day. The cycle day in words on today only, a period day elsewhere keeps its drop (`phC22CdHtml`); her own booking drops its CD. The plane on a booking goes, the trip line says it (its count and hover; "to <date>" moved to the hover). A birthday chip says the first name. The Me chip drops its count while the rail is on screen, its person says it (`phAmRailSays`). The card: no initials circle unless there is a photo, the Visit as dots and the phase as a bar (`phAmVisitHtml`), its buttons on one row, Cancel icon-only on a day with Start visit. **Motion, Bold, off under reduced motion, every wait has a timer way out (`phAmDone`):** a block lifts and glides into the card with a ripple through the week (`phAmBefore`, `phAmAfter`, around `phApptPopRender`; over 900px, only from a block on the grid), ✕ / Esc / the same block folds it back (`phAmFold`). The week: ‹ ›, Today or a drag on anything that is not her own draggable block (`phAmGhost`, `phAmWeekCommit`): the next week's dates and empty hours fan in beside it, 18% or a fast flick turns it, less springs back; the blocks rise after (each week draws its own hours, so the next week's blocks cannot sit on this week's ruler). The gold time runs down to now once when the page opens (`phAmRunDown`); drag it and everything on at that time lights with its time, the rest dims, it springs back. Search: dims as before, a gold thread with a bead a visit joins the patient's visits (`phAmThread`, patients only, plays when the hits change). Add appointments, first tap: the week steps back and her free time opens from today on, at least 45 min, facts she asked for (`phAmAdd`, `phAmGaps`); a gap's tap opens the same form on that day and time; a second tap on Add, or a week with no gap, opens the form as always, so Paste is one tap further. The mock's "day's column opens" is left out (her "the columns are uneven in width"), and Gentle was not built.
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

**Click a free time to add: her event or a patient (her picks 2026-11-01 and 2026-11-02) [Event quick add; Calendar click: my event OR a patient].** On the grid with her events showing, a click on a free
time (or a drag down a free column for a longer time) opens a card beside it (a bottom sheet on a phone; it closes any booking
card). A My event | Patient bar sits under the time (opens on My event). **My event:** Search my events, then her event presets grouped under her colours; one tap adds the event at that time with the preset's
length, colour and repeat, Undo in the one toast. A repeating preset whose routine already runs adds that day only; otherwise it
starts the routine and the toast offers Only this day. "New event “x”" saves a new preset with the event. A preset = name · colour ·
length · usual time · repeat, kept in the Me row's `pre` map (merged like items); edited in Settings › Calendar › Event presets (her 43 tidied presets entered 2026-11-02)
(one table, ✎ per row, + Preset) or from the card's Edit list ›. The Me form's Event title lists the names and a picked one fills
the rest. Her own names are data in her Me row, never in this file. **Patient** (her 2026-11-02 "how do i add personal events vs patients"): a Patient name box; before she types, RECENT = her ten most recent patients (every name from her prescriptions, bookings and records; a row = the Case colour's dot · name · "last visit 28 Oct"); typing searches them all; "New patient “x”" books the name only (like Quick add); chips Home visit (2 h, its service) and the length (the dragged span, else 30 min; a tap cycles 15–90); one tap books through Quick add's own path (`phQkBook` → `phApptImport`): the same block, the same list, Undo in the toast. Repeat and Paste list stay in Add appointments; the patient diary stays in Cliniko. Code: "QUICK ADD · A CLICK ON A
FREE TIME" (`phQk*`; `phQa*` is Quick assess).

**One calendar, work + life (her picks) [One calendar: work + life].** **The row above each day** (`phC22FoldRowHtml`): a birthday
= a white chip, grey cake + name + the age it turns (`phC22BdayChipHtml`, tap = the birthday card), then the day's one-offs outside the patients'
hours, then ONE ⟳ chip for its routines whose ring fills as they are ticked (`phC22RtChipHtml`; tap unfolds that day's chips, ▴
folds; at All they are plain chips); the row below holds the evening the same way. A routine that meets the patients is a block
like any of her events. **Her cycle day in the date line** (`phC22CdHtml`): "CD n" beside the big date, read from HER OWN patient
record through the Cycle page's own reads (`phMeCycleAt` = `phBbtCycleStarts` → `phCycFacts` → `phTpCycleCompute`; derived on
read, nothing stored but the record's name); small grey words (a line shows on hover: it still taps), a rose drop only on a period
day (her 2026-11-02 pick), nothing three weeks past an unlogged period; the fast's clock is no longer under today's date (the
toolbar's ring keeps it; the phone's one-day row still shows it); its card = Day n · phase, one line ("Period in ~3 days · 28-day cycle"), **Period started**
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
own renderer; purple dot = changed since last visit; tap = its drawer, + Watch / + Aim, lines to the diagnosis it feeds. **Blood tests draws each marker as its small low–high bar with the dot** (her 2026-10-31 pick, idea 5: `phBldMiniHtml`, the flagged markers else the first three; the drawer keeps the words).
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
read, never stored; her typing makes a field hers; a quiet chip puts the auto wording back ("Template’s words" on Goal and Aim, "Patterns’ words" on Diagnosis; `phTpFgWritePlan` is the one Diagnosis / Goal write, used by the Care Plan’s ✎ editor and the Treatment strip’s fields, her 2026-10-31 "edit where you read"). + Watch / + Aim on a finding adds her line after the auto
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
Visit record. Medical history rows tag "FBR" (words in the hover); its "✓ All" hovers "Asked all: the rest are No". The visits
table's empty cell = "–"; Tongue & pulse empty runs = "–" (words in the hover). Patterns' "Only on one side" band has no explaining line.
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

**Words first, no case first (her 4 picks 2026-11-02, "i dont want to choose case first"; LIVE in build 20261102-135900)**: Came in for's "What brought her
in?" box keeps her own words. While she types, the top row is `+ "her words"` (Enter takes it), the plan types they match sit
under it (`phCcMenuPaint`); either way her words are the complaint (`phCcAddWords`: `mainText` = her words, `main` = the plan
type she tapped, else `phCcGuessIds` / the first family the box matches, else none with `autoOff`). Words with no plan type are a
real main concern: the row shows them with an outlined "Plan type ▾" pill (`phCcOf` / `phCcRibItems` / `phCcTableHtml` accept
`main: null` + words; `phCcRibItems().main.id` is then null). The door's Start always shows: "Start Care Plan · <her words>",
"Blank plan" when no course fits, and **Course ▾** joined to it lists every course at once, grouped, the concern's own category
first, Blank plan last (`phTpDoorStartHtml`, `.ph-tp-dstart` / `.ph-tp-dmenu`, in the page flow). A course picked there also sets
the plan type it belongs to (session view state `phTpDoorPick`, kept with that plan type). The plan-type pill's menu now floats
(fixed, `phCcPlanMenuPlace`; a scroll closes it): the table's sideways scroll box used to clip it.

**Blood tests** (her 2026-10-29 picks, `bloods-attach-mock-2026-10-29.html` A; BUILD-NOTES "Blood tests: attach the result
first"): the page opens on **Attach the result** (a photo or a PDF: `data-bld-attach` → `phRenCaptureStart(…, "bloods", {via:
"bloods", gallery, accept: image + PDF})`, or a drop on the tile) beside **Paste the report** (`phBldPasteFill`: a paste, or typing
then leaving the box). A file is filed with the photos as kind **"Blood test"** (`PH_REN_PHOTO_TYPES` bloods; a photo compressed and
relayed like any other, a PDF kept as it is up to 12 MB and local only, `phRenIsPdf`, a drawn "PDF" thumb for every `<img>`,
`phBldOpenFile` opens it in its own tab, from the viewer too); one attach = one result row (`rec.bloods[] += {id, date, lab, note,
vals, at, photoIds}`), opened for the values. The attachments are tiles under the top row (`phBldTilesHtml`, newest first; a tap
opens the photo or the PDF). **One table** (`phBldTableHtml`): the markers that count down (`phBldCountKeys`: `PH_TRI_BLOOD`,
`PH_BLD_PAT_IRON` / `_THY`, her `resultRules`; the Hormones group left out for a man) plus any marker with a value; "Where it sits"
= a dot on the marker's low–high bar from its latest counted value (`phBldBarHtml`, green inside, amber past a line); then each
result as a dated column newest first, ↓↑ past the line, an IVF scan column read-only, a result over 12 months faded "not
counted". The **open column** (`presBldForm = {id, extra, custom, pasteText}`: a result just attached or pasted, or a date header
tapped) turns its cells into fields (`data-bld-v`; the lab's own range from the paste rides on `data-lo` / `data-hi`), its header
into a date + lab field, with "+ More markers ▾" (`phBldMore`: any other marker, or "Another marker…" she names) and one Save
(`phBldSave` reads the cells; a moved date re-dates the attachment) · Cancel (`phBldCancel`: an empty pasted row goes) · Delete (the
attachment stays in Photos). `phBldParse` is unchanged (marker name, the number after it, the lab range on that line, the
collection date, never the date of birth). **The band** (`PRES_BANDS.bloods`): Results · Clues (`phBldClueKeys`: a counting
marker's latest value past its line, and her rules met) · a **Rules · Guide** chip. **Results that count · every patient**
(`phRcTableHtml`: wired rows read-only, then hers, `PHARMACY.resultRules = [{id, m, op, v, pat}]`, a blood marker or IVF number
`PH_IVF_NUMS` below / above her number → a pattern) lives on the **Guide's Blood tests tab** (`phGdBloodsHtml`, with the typical
ranges by sex; `phRcClick`), no longer on the patient page. Met by the latest value (blood result < 12 months; latest round with
that IVF number), a rule is a Patterns clue "rc:<id>" with `.pat` (`phRcClues`, added in `phPatCompute`): it counts for that
pattern and is a tag in the Diagnosis ("AMH 6 pmol/L · low", "IVF: 3 eggs, 2 rounds · low") and on Patterns, whose clue list has
Blood tests and IVF history groups.

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
the card in place. **Logging a visit moves nothing** (the session-log move-on and the Treatment tab's auto-move banner are gone).
**Plans close themselves** (her 2026-10-29 picks, mock `plans-close-mock-2026-10-29.html` A + C): the last phase's card asks ONCE
and says what happens untouched ("Nothing booked after today · closes itself tomorrow" / "Booked 5 Nov · closes itself after it").
A plan whose last planned visits are done, with nothing booked or logged after its last visit and no tap of hers since, closes
itself the day after that visit (`phTpSelfCloseSweep`, run when her file opens and when Today's visit draws; dated the day after
the visit, never the sweep's day): `plan.status = "done"`, `plan.closedKey`, `plan.selfClosed`, one review line "Closed itself ·
10 visits over 12 weeks" (`prv.auto`, Undo). The Care Plan band and the Treatment band read **Closed itself 30 Oct 2026 · 10
visits over 12 weeks · Reopen · 2 more visits · Ending letter** (`phTpSelfClosedHtml`); the Plans row says "closed <date>" on any
closed plan (`plan.closedKey`, also written by Close plan and Mark completed). A booking or visit after the close **reopens** the
newest self-closed plan with N more visits (`phTpSelfReopen`; a cycle plan: another cycle): Today's card "✓ Reopened · 2 more
visits" · "Subacute · visit 5 of 6 · closed itself 30 Oct 2026" · Undo · New course instead. An Undo holds (undo of a reopen:
closed until a booking after today, `selfClosed.held`; undo of a close: open until a later visit, `plan.keepOpen`, the card then
says "Kept open · closes itself the day after the next visit"); her next tap clears the hold; the app's own lines never count as
her tap (`phTpPrvTouched` skips `prv.auto`). **Cycle plans end too** (`phTpCycEndCtx` / `phTpCycCourse`): Natural fertility · PCOS
· Endometriosis · Dysmenorrhea · Amenorrhea run a course of cycles from the concern's How long (Weeks 1 · Months 3 · 6–12 months 6
· 1–3 years 12 · Longer 12; no concern = 3; `PH_TP_CYC_COURSE` + `plan.cyclesMore`), counted as period starts since the plan began
(the cycle it began in counts; Amenorrhea, or no cycle data, counts months): the last cycle's late days (luteal or overdue) show
"Cycle 3 of 3 done · …" with **Close plan · Another cycle** (one more cycle, Undo) and "closes itself after the next period"; it
closes at the next period's start (or the day after a later visit). **IVF Protocol ends at the pregnancy test** (`phTpTestCtx`:
the latest transfer's result, else her Pregnant? test, on or after the plan began): positive → "🌸 Positive test <date>" with
**Start Pregnancy plan** (the due-date step, then the Pregnancy plan; the IVF plan closes "Pregnancy plan started" once the step
finishes) · **Keep this plan**; negative → **Another cycle** (the IVF questions; closes once answered) · **Close plan**; untouched,
it closes the day after the test. A positive test on any cycle plan asks the same. The rail's "Review today" tag counts these.
**Course end** (her answer "The patient only"): the last phase's review card (and the closed plan's, same day) shows the course:
"Course done · 10 visits over 12 weeks" (`phTpCourseStats`: all phases' visits, weeks since the first phase began), a Treat ·
Start · Now · Target table (`phTpCourseRows`: each Compass concern's first and latest score, "✓ 2 or less" / "not yet"), then
Close plan · Stay N more · **Ending letter**. The letter (`phTpLetterOpen === "end"`, `phTpCelModel` / `phTpCelSheetHtml` /
`phTpCelText`) uses the patient plan's page and doors (🖨 Print, ✉ Email into Messages as "Ending letter"): Your treatment · <main
concern>, date and visits, Where you started, where you are ("Low back pain: 7 out of 10 → 2 out of 10"), From here = the last
phase's own Aim, See your GP straight away if, her sign-off. No GP copy.

**Next visit** (her answer "Show the date to book"): once today is saved (Done · Copy for Cliniko), Today's visit has a **Next visit**
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

**A phase’s fields look like fields** (her 2026-10-31 pick "edit where you read"): the Care Plan’s open phase row (`.ph-tpg-ctx-inner .val[data-tp-edit]`: Aim · Points · Formula · Watch) and the Treatment drawer’s Aim are 32px white boxes with the placeholder upright inside, the same `phTpCellEditOpen` editor filling the box; "Template’s words" puts a template Aim back; done-phase cells stay words. The ⋯ menu’s "+ Add phase" (and the band’s "+ Add a phase") draws its picker above the Session ladder (`phTpAddPhaseHtml` in `.ph-tp-cc-course`; this page had no slot for it before, so the picker never showed).
**Formula on a phase**: a typed name is hers; "→ Fill" fills from Fang Bing Ren's live top formula when blank [Care Plan phase
Formula].

**The Treatment tab**: session stepper, the visit record as ONE table (`phTpVisitTableHtml` → `phTxVisitsTableHtml`, her 8 picks on
`visits-table-mock-2026-10-29.html`, 2026-10-29), a band whose **Done · Copy for Cliniko** saves the visit
(`presAcuLogNow`, the one save; Today's visit has the same button; "Ending a visit" under Visit logging). **The Diagnosis / Goal strip over the tab is two fields** (her 2026-10-31 pick "edit where you read", `phTsDxStripHtml`, `phTsStripCommit` → `phTpFgWritePlan`): tap, type, Enter or tap away saves (different words = hers, the auto wording or an emptied field = auto, "✓ saved" for a second), Escape restores, a quiet "Template’s words" / "Patterns’ words" chip puts the auto wording back while hers differ; Patterns › is the door; "Edit on Care Plan" is gone. **The band’s phase is a chip** (`.ph-band-ph`, plans with 2+ phases): its menu lists the phases (the live one marked, since · visits; the next one "next"), a tap makes a phase Current with the phase line’s own write (`phTpPhaseStatusData`), "+ Add a phase" opens the Care Plan’s picker. One session line (phase named once, Current ▾, "Session N · today", Herbs only
today, Change phase), then the table: Visit · CD (cycle patients) · Phase · Response · Tongue · Pulse · Abdomen · Therapies · Herbs
· Note; today on top (gold tint and a gold top line), logged visits newest first, one faded italic next row (the next
booked or planned session: its date, CD on that date, the phase's points and formula). **Today's row:** the Compass score
(`phTxScoreCellHtml`, a "Score on Today's visit" chip when unscored), the three exam cells as doors to their pages (`.ph-tx-door`;
"not yet" until done, then the drawing + words), the navy Therapies block (the phase's planned therapies lit once per visit by
`phTxSeedTherapies`, a dashed chip for a planned one she unticks; "Same as last visit"; "Which muscle?" for pain patients), the
green Herbs block, the Note cell (the Comments box). **Its drawer** under the row: "How <name> is" (the Compass's complaint and
sign lines read-only, `phTxCxHtml`: today's score or the last one faded with its date; the Care Plan's finding lines and drawers,
`phTxFxHtml` over `phTpFxRowHtml`, without Came in for and without the exam lines, plus a Fang Bing Ren line, template-hidden ones
under More), Aim, Watch, Plan note, one "Plan ahead · Session N" chip. **A logged visit's row** (`phTxVisitRowHtml` over
`phTpVrData` / `phTpVrFacts`): CD, phase, response, the exam drawings + words (`phTxFndCells`), therapies + points, 🌿 formula, the
note's first line; its date (`data-tx-vrow`) opens its record under the row (`phTpVrRowHtml`'s Ask · Found · Did · Next, the Frozen
lock and edit form as before; `phTxVrowOpen`, repainted in place by `presAcuOpenRefresh`). Tongue / Pulse / Abdomen have **no
Better / Same / Worse** here; the visit's result comes from the Compass (`phCxOutcomeToday`). Phone: the table (900px) scrolls
inside its wrap. The Visit checks page and the plan's Treatment log tab are gone (2026-10-29): their doors (the trend sheet, the
Patterns clue, `{ tab: "treatment" }`) open this tab.

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
**The Cycle page** = three tabs, a "Today is day [ ]" finder, a Day 1 chip, PMS on every day, a **Menopause**
chip (sets `rec.cycleOn = false`; the Change of life card has "Tracking a cycle again?") [Cycle PAGE redesign]. Its calendar is
the Fertility-Friend-style calendar + BBT chart (`phCycFFHtml`), the one cycle view everywhere. **Two halves** (her 2026-11-03
picks on the Cycle page mocks, canvas 1HUfAZbcfH7vCoSuK65UFS [Cycle page: two halves]): the tab row (tabs, the finder, the Day 1
chip of the card's day, Pregnant? with its popover under it) and the pane sit on the Fast block's light band (one shared band
rule, `.cp-band`). On the Calendar tab a LEFT white box holds the head (`phCpHeadHtml`: "CD 4" + Fertile · Ovulation · Period,
each with its colour mark; late = the days late + the last period) and the day card ALWAYS (today until she taps a day); a RIGHT
white box holds the chart (`phCycDgHtml`: the hormone curves, a drawing, over a labelled phase bar sized by days, date + CD under
each day, a gold line on the card's day that glides on a tap; the wheel, lining and follicle are gone) and ONE month (this month
until she moves it; every day a whole block: period by flow, follicular grey, fertile green, ovulation dark green, luteal lilac,
the next cycle drawn from her latest cycle's shape, only the next period paler; CD on every day; today gold-ringed, the card's day
teal-ringed). Temperature and Past cycles: the head + their pane in one white box. When the page first shows (`phCpFirstSight`,
`.in`; never on a repaint) the halves rise, the curves wipe in, the blocks grow, the line drops, the days come in as a wave and
today's ring pulses twice. The sentence (`phCpSentence`) stays on Today's visit and the profile's cycle panel. The card asks in
three groups under capitals headings (her pick 3; no numbers, no joining line; the same card on Today's visit, where the Day 1
chip heads Period): **Period** (Flow, Colour, Clots = Size Small / Large + Amount A few / Many, `clotSz` / `clotAmt`, read via
`phCycClots`; Pain No / Yes, `painYN`, Yes opens How bad + Pain type in place), **Between periods** (BBT, LH, Other, Discharge),
**PMS & mood** (Mood · Gut · Body + Note). **How bad takes a range and
Pain type takes several** (her 2026-10-31 picks): tap 4, then 6 = 4–6 (`painLo` 4, `painN` 6, filled 4 to 6); a tap on a range
is one score again; the same score again or 0 clears. The top of a range counts wherever one number is needed (the chart peak,
the 4+ painful rule, the pain word). `feels` is a word for one type, a list for two or more; every reader goes through
`phCycFeels`, every pain number shown through `phCycPainTxt` ("4–6"). **Its look** (her 2026-10-28
"Combine" pick): one label column, every joined bar filling its line (a bar too long folds into an even joined grid, `phCsFit`),
each option with its picture beside the word (Flow, Colour and Clots the picture alone, the word in its hover title, the pick
read out at the row's end, her "icon without words for flow color clots"; in a half 400-480px wide the labels keep their column), the usual ring alone (a key
in the head), How bad a 0–10 bar, BBT and its time as tinted fields, Fang Bing Ren a band at the foot [Cycle day card: lined up,
pictures, rail]. **No Fang Bing Ren side column on the Cycle page** (her 2026-10-28 "the last column is not needed":
`phPfwSideWanted` leaves out "cycle"; Ren, Medical history, Usual period, Pain, Supplements and Blood tests keep it).
**No Usual period card** (her pick, 2026-10-24):
the footer asks the length once (stepper, or shortest–longest range when Irregular); a **Usually** line is worked out from her
logged periods (`phCycUsual`; her old answers until two are logged) [Cycle page loses the Usual period card]. The Care Plan shows
a slim cycle bar that never folds. **A man never tracks a cycle**; `PH_CYCLE_CUT_AGE` is 48.

**Period pain is ONE read** (her picks): `phCycPeriodPain` = each period's worst day (0-10) from the Cycle page; the Compass
"Periods: painful" row, the Bing (latest period) and Ren (2 of last 3) pre-fills and the Usually line read it [Period pain: one
read from the Cycle page]. The cycle-day popover is built by ONE function, `phCycFacts`. BBT: `rec.cycleSigns[dateKey].temp`, a
typed value beats a phone reading; the coverline uses up to 6 pre-ovulation readings. **Two Flow/Pain concepts stay separate**: a
whole-PERIOD intensity (`PH_CYCLE_FLOW`/`PH_CYCLE_PAIN`, period-start day only) vs a PER-DAY value
(`PH_CYCLE_DAYFLOW`/`PH_CYCLE_DAYPAIN`). "Cervical mucus" shows as **Discharge**; the key stays `cm`.

**IVF history** shows for every woman, with a quick-log; **it opens on its first action** (her 2026-10-31 pick): the fold open and the round this plan is on (else the latest dated one) open until she closes them (`phIvfFoldOpen`, `phIvfOpenIdsOf`; her closes stick on `rec.ivfHistOpen` / `rec.ivfOpenIds`), with nothing logged the fold shows "+ Egg collection"; scans live on `row.scans[]` of the linked round (a RECORD ONLY, never
moves a phase); scan bloods show in Blood tests; embryo accounting is always DERIVED; the Timeline reads IVF history, unlinked
rounds included [IVF history redesign; Fertility timeline: real sync with IVF history]. Starting an IVF Protocol plan opens its
questionnaire; milestone dates are written BEFORE the start-phase cascade runs. A positive hCG cascades an IVF plan to "Early
Pregnancy" once, on first transition only. `whenEst`/`dateEst` flags mark estimates; absent = confirmed. **Animated + drawn (her
picks):** a workflow rail for her current round (`phIvfRailHtml`; a step is done once it or anything after it is typed); "one egg
through the lab" (`phIvfEggHtml`, CSS loop, tap a day to start there); a round reads first (`phIvfStripHtml`: lab-stage drawing,
count, % from the stage before, blasts against fertilised, a dot per egg/embryo, tap a number for − / +; a blank count's − does
nothing), with date / clinic / egg freeze / delete / "typed" behind the ✎; the bank is straws (`phIvfFrozenBankHtml`); a transfer
reads first with the uterus drawing + Transfer → blood hCG → 6–7 wk scan (`phIvfTransferViewHtml`), its fields behind its ✎ (open
by themselves while it has no date); **The 6–7 wk scan** (her 8 picks, 2026-11-02): the card's 3rd step is a door to the scan line under the test's row (date + heartbeat · no heartbeat · twins as one chip bar; `t.hbDate` / `t.hbSeen`, written only by the transfer field handler and its chips; Pregnant — ongoing pre-fills today + heartbeat, a loss reads no heartbeat unless she picked); an undated ongoing reads "heartbeat · date to add"; the embryo beats once per open; every page reads the scan through `phIvfHbOf` (this round) / `phIvfHbScan` (latest), only on a positive pregnancy; scans drawn as ovaries (`phIvfScanDrawHtml`, counts only). Drawings = the `ivc-*` sprite
symbols. No "+ transfer from these eggs": Use ▸ and "+ Transfer" stay.

## Dispense, Refill & To Order
Dispense always opens the full script (her "No, keep the friction"). **Three numbered steps**: 1 Calculate, 2 Dispense & copy
label (calculates first when needed), 3 Log; Log is always its own tap, never automatic. The Total line always shows grams · days
· cost · profit. Desktop (≥901px): the one-screen `.ph-dsp-fit` layout, supply-by-days chips (7/10/14/21/28), one Blood-moving
caution line (`.ph-dsp-caution`), the "Plan formula" pour-in, and the script + label in full in the right column, every herb with
no inner scroll, the label in full under it, the right column the one scroller (her pick) [Dispense: the script moved into the
right column]. A single herb's name in the herb table carries a 32px book circle that opens How it's used beside the table
(`phHuOpen`; a sheet on the phone; Esc closes the card only) [How a herb is used]. **The per-herb shelf → after bar is the herb table's In stock column** (checked 2026-11-02, at 1440 and 375; the OPEN line that called it not built was stale): "50 → 20 g" with a bar whose fill is the share of the shelf left after this bag (`presIngStockCellCore`; green; gold once it lands at or under the low line; red "short N g" when the bag takes more than the shelf holds, "out" at zero), eased in place on every grams / dose change (`presIngStockRefresh`). Grams follow the herb total, and a manual Grams figure survives
Log [Dispense: Log silently discarded a manual Grams figure]. A substitute picker includes stopped/phasing-out herbs when stock
allows.

**Formula refill** is one card grammar across To make / Below the line / Snoozed / All recipes. One list at every width (a phone
stacks each row: tick, jar, name + grams, then its week chips); To make is banded by week (Overdue / This week / Next
week / Later / No week yet), a short row with "Fix short ▾". "When" is WEEKS ("Wk 39"; overdue = "last week" in amber, sorted first); Plan ▾ = This
week / Next week / Pick a week. The date popover is mounted globally; no `window.prompt()` anywhere; its footers are chips
(Clear · More weeks; under the Not now label, Snooze 1 week · Take off the list). Week tiles (Overdue / This
week / Next week, tap filters); the header primary is the gold "+ Plan a formula" (search sheet; each formula's weeks one joined
bar, This week filled). No hint line under the tabs; an empty tab says two words ("Nothing snoozed"; All recipes with none:
"No recipes" + a "+ New recipe" chip) [Formula refill page audit].
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
`refMakeCommit` save, then "Made today" with Undo. **The grams in "Weigh [140] g of …" are a field** (her "how do i choose how
much to make? sometimes i make 150 or 300 or 275", 2026-10-29; `phRfcMkGrams`): typing re-weighs the rows in place, the ticks
start over, leaving the field keeps it as the plan's batch (`h.refillBatch`, cleared by Finish); a batch that is not a whole
multiple of the recipe splits into whole grams adding up to exactly the batch (`phRfcMkNums`), and Finish deducts those grams
[Formula refill: choose how much to make]. A planned formula **leaves by itself** when its stock went UP after planning
(`h.refillQty` stamped at planning; older plans: week passed + above its line), with Undo. All of it is read from the dispense
log, the plans and the bookings (`phFormulaUse`, 12 weeks, Break bookings left out, "(X)" name tags merged); nothing new is
stored. Motion off under reduced motion. Dispense's In stock cell says "To make · Wk N" for a planned formula jar
(`presIngToMakeHtml`).
**Recipes:** New formula recipe sits in ⋯ and opens as a side sheet (#refPresPanel), never inside the card; there the editor
always stacks (Make refill, then the ingredients at full width; her "i cant edit the formula at all": two columns split inside the
640px sheet). Every row with a recipe ends in a "Recipe" button (pencil icon, `phRfcRecipeBtn`, `data-pres-open`) opening that
recipe's herbs and grams in the same side sheet (her "how do i edit recipes?") [Formula refill: a Recipe button on every row].
In that sheet Grams and Name are fields and Type a dropdown, ⋯ is an icon circle beside the one solid Make refill, Label preview
and Edit as a plain list are chips, the code column is 80px (the phone folds it away, as Dispense does), and the match line says
"✓ all N ingredients matched" only [Formula refill page audit].

**To Order: Cliniko's Products layout (her 8 picks 2026-11-02; LIVE in build 20261102-113100)** [To order, Cliniko Products
layout]; still two steps, To order → Arrived [Inventory: stock truth, To order in two steps, lean Inventory, Price review in
Suppliers]. A full-width filter (code, pinyin, name, supplier), then ONE table at a time under four joined tabs with their counts:
**To order** · **Running low** · **Arrived** (last 14 days, + N older, Clear) · **Snoozed** (only while one is). To order = a row per
supplier (its chip or name · n items · $sum · n ordered · Copy for email · All arrived) over its herbs: jar + code + name (opens the
edit form) · Stock (bar + grams) · Low at · Order (− n + × the size chip, 100 g ⇄ 200 g) · Cost (the bottle price a field, the line's
total beside it from 2 bottles) · Status (To order / ✓ Ordered <date> / Empty) · Arrived + ⋮, and one Total row at the foot. An
ordered herb stays in its place ("2 × 100g", ✓ Ordered 30 Oct). **Copy for email is the order**: the supplier's still-to-order herbs
turn ordered once the copy landed (one toast, Undo; a blocked copy marks nothing); Mark ordered sits only in a row's ⋮ (an order
placed by phone). **All arrived** takes the supplier's whole list (snoozed excepted). The ⋮ also holds Supplier, Other bottle size…,
Snooze 1 week, the edit form and Take off. The head = **Add to order** (solid; the type-to-search row) + Mark all arrived. A herb that
changes tab flies into it and that tab's count lights gold. The table draws when its card has 896px (her 1220px window has it,
`phOstNeed`); a narrower card and the phone draw two lines per herb (the phone: the line's cost as text, Bottle price… in the ⋮). No
column sorting (TAPPABLE THINGS). **Its look:** every act is the Button (32px, 1.5px herb line; Order now red; a supplier's All
arrived solid), the size a chip, the bottle price a tinted field, status tags that never tap, a pale-blue head row, striped rows,
numbers right, 28px on a phone. **Every count of the list** (top bar, side badge, Dashboard, Stock statistics, Mark all arrived) reads `phOnOrderList`, so a snoozed item not yet ordered is left out everywhere, as on the page [To order page audit]. Dashboard's Order/Refill cards are TWO PLAIN LISTS,
empty first then fewest days of cover; a Refill row also shows the formula's next booking (her pick); a long name wraps on both.
Under Order these, See all and To order share one line; from 641 to 900px both cards keep the computer's 14px inner edge, so the
caption band's words line up with the rows [Dashboard page audit, second pass].
Picking a supplier pulls in that supplier's recorded price.
**A formula she makes is priced by its recipe** (her 2026-10-31 pick "Its recipe, always"): a made-in-house jar
(`phMadeInHouse`) with a recipe takes the recipe's herb cost over its grams, rounded up to 10c (`refRecipeCostPerG`), whatever
supplier is active. Inventory's Cost $/g and Bottle $ (that price × the pack, not typed) carry a quiet "recipe" tag; the hover
reads "140 g · 11 herbs · $26.88 → $0.20/g". Live: `phRecipePricesSync` runs 1.2 s after any save and after every pull, only
while the copy is fresh (`__lcmSyncFresh`). A jar several recipes point at follows the one made last; a recipe with an unpriced
herb leaves the jar's own price. Dispense reads $/g, so patient prices follow from then on; past dispenses keep theirs.

**Stock truth (her picks; LIVE, 81514da3):** every number the app trusts has a date (`phJarTrustMap`: counted, made or
received). A made-in-house formula on the Dashboard's **Urgent stock** reads `Made [g] ✓ · Weigh`: the grams pre-fill with the
recipe's batch, ✓ = `phBatchMade`, the same write as Formula refill's Finish (herbs out, jar up, one refill entry, Undo); Weigh
opens the weighing panel. A **higher Stock number typed in Inventory** on a made-in-house jar asks "Made N g?" (Yes = a batch;
"Just a count" = a count); a lower number is a quiet count. A made-in-house formula not counted, made or received in 21 days
leaves Empty / Low for one line, "N formulas not counted in 3 weeks · Count". **Count** opens the **Formula count** grid on the
Dashboard (formula jars with a number, in use; code · name · the app's number → the change · a scale field; Done = one
stocktake record + a log line per changed jar, one Undo). Count lines under Urgent stock: "Formula count · N jars · last <date>"
once a week has passed (hidden while the 3-week line shows) and "Herbs last counted <date> · Count herbs" after 6 weeks.
A row in Urgent stock opens the edit drawer; the name is plain text.

**Twin jars and batch makers (her 2026-11-01 data-check picks; BUILD-NOTES "Data check"):** Inventory's ⋯ shows "Twin jars · n" while a supplier code sits on two jars (`phTwinPairs`); the sheet lists each pair with the keeper by rule (not stopped, then stock on it, then the latest dispense) and Merge moves the twin's grams, its history (`herbId` / `targetId` in the log, stocktakes, price reviews, an open count) and its name (`h.aka`, read by `findHerbByName`) onto the keeper, with Undo in the one toast and one `herb-merge` log line. Stock movements' Source column reads the maker of every batch (`phRefillMaker`: the entry's own source, else the jar's, else In house; the three make paths record it from now); the CSV carries it too.
**Inventory (her pick "Lean table, the row opens the rest"; LIVE, 81514da3):** Name · Supplier · Bottle $ · Stock (g) ·
Level · ⋮; the row opens the edit drawer, the name is plain text; the other columns wait in Columns (`PH_INV_LEAN_HIDDEN`; her
saved set was moved once by `phMigrateInvLean`). The ⋮ menu holds Add to order. A Bottle $ worked out from $/g is plain
faint figures in its field. **The edit drawer** (`#phHerbForm`; her 2026-11-01 audit): Essentials (Formula source only for a
formula), Suppliers & pricing and Notes folded, Clinical reference, How it's used (a single herb only: `phHerbUseFill`, the Guide's Herbs card), Stock history ("No movements" + Adjust stock); one label
look, no lines, tint fields, 32px controls and section heads, Kind one joined bar; what a field means sits in its hover, never in its label.
**The toolbar** (second pass, BUILD-NOTES "Inventory page audit, second pass"): Status ▾ and Columns ▾ are white dropdowns, picked
or not; Columns hides up to 900px (compact rows ignore it) and Status hides in the sheet (the status strip does it); the count,
Select and Stocktake (the Button) keep a line of their own; the select bar's actions are the Button, Clear a chip, no line. From
it, app-wide: menu rows (`.ph-rp-mi`, the row ⋮ and the head's ⋯) 32px / 6px (28px on the phone), the sheet ✕ a 32px circle. **Suppliers:** a row opens its herb list; each
row ends in **Review prices** (Price review on that supplier); Price review is no longer in the sidebar. **A store with nothing counted yet**
(every qty null: a brand-new row, or a fresh profile on the built-in list, which is her live inventory baked 2026-11-01 as `PH_HERB_SEED`,
stock null) opens Inventory with no status filter (`phStatusStart`); one counted jar brings the everyday default back.

**Week pages (her 2026-11-02 audit) [Week pages audit]:** Dispense history and Stock movements' cards (up to 1400px) are white on
the page tone with no outline; their dates are tint fields, × a 32px circle with the red line, + a 32px circle; Stock movements'
rows are 36px and its date range the dropdown. Stock statistics: dates are fields, Usage period the dropdown; the value band and
the six months say each fact once (meanings in hover titles, the profit tiles too). Suppliers: label-look heads, the count once,
its two buttons the Button. Empty states: "No forms waiting", "None missing" / "No patients", "No match" / "Nothing dispensed".
App-wide: the last column's drag grip stays inside its table (the "wider than the screen" note shows only on a table that really
scrolls); a hidden `.ph-load-btn` stays hidden.
**Relocation (her 2026-11-02 "fix the relocation taps") [Relocation taps]:** its four dialogs are white cards in the middle (a
sheet on the phone); Cancel a chip, Save the one solid; Edit the move, Open the full list, more details and names are chips;
list ⋯ and row ⋮ circles; the row and dialog fields tint; the notices filters and How they did joined bars; Print / Export the
Button.

**Patient profile list on a computer (her audit: "make it more space saving make it cleaner") [Patient profile list audit]:** the
five tiles are the filters (tap again = all; "No history" only while anyone has none), no Filters button or chip row; "Schedule"
sits in the toolbar while nothing is scheduled (the quiet line hides); no list head line unless searching ("N match ..."); bands
carry sprite icons; a row says each fact once ("never" / the amber date carry not-dispensed and not-seen-6-months, in their
hover), short condition names (2 then +N), one 18px pill look, 44px rows. Her 9/4 bones stay: fold bands, timeline rows, the two
round buttons. The phone keeps its chips and Scheduled line.

## Patient details & the patient file
**A restore is her newest word (her pick 2026-11-08):** a restore stamps the patient records it changes with the time of the restore, and the template, Fang Bing Ren and Guide note edits it changes the same way (`window.__lcmSections.stamp`, called by the file restore and the cloud-history restore), so the merges that go by stamp no longer give the damaged copy back, here or on her other device; the cloud-history restore moves its merge base only once the cloud write succeeded.
**Contact and preferences has a door (her pick 2026-11-08):** the Messages page ends with a Contact and preferences button (`data-ph-journey-open`, the Messages page's own button shape); it opens the page with Don't contact, Lives out of town, Channel, Tone, Known since, Tracks BBT and package counting. `phJourneyOpen` closes the patient page properly (`presPageClose`), so one Back returns.
**The x on a sale in a patient's Dispense history asks first (her pick 2026-11-08):** `phAsk` (danger, cursor on Cancel); the Log page keeps its own two steps and Undo.
**Merge or rename keeps the whole record (audit 2026-11-06):** `phPatientMerge` handles its named stores by their own rules, then `phMergeFillGaps` brings over everything else (a blank takes the other's, two lists combine, nothing on the kept record is overwritten; an opt-out on either spelling stands; the newest period is the current one). The old key is tombstoned in `PHARMACY.deletedPatients` with the stamp of the copy folded in, so it never comes back from the cloud, while a copy edited since (an offline phone) stays as a duplicate rather than being lost; a restore outlives the tombstone. A new name-keyed store still joins `phPatientMerge` by hand.
**Cliniko look on the patient pages (her synth22 picks 2026-11-01, stage 3):** the head (`.ph-pres-band`) is the light band of
every page: "Name · age / Page" (`presBandPageSync` reads the rail's lit row), Book appt. (solid) · Text joined
(`.ph-band-bar`; the phone keeps search + camera), a Gynae / MSK case as a 3px line under it. The rail keeps her visit order;
Supplements (taking), Blood tests and Appointments carry a cream count badge that rolls in when the number changes.
**The teal rail (her picks 2026-11-02, rail-mock2 "C · teal band"; BUILD-NOTES "Side rail, teal band"; LIVE build 20261102-131600):** on a computer the rail
(`presFlowRailHtml`) is a 212px band in the panel's colour (teal; crimson on a Gynae Case, navy on MSK: her 2026-11-02 "make the band follow the
case colour", LIVE build 20261102-132900; on a Case band the pale words, dates and "n left" are mixed from the band colour to keep 4.5:1) running the panel's full
height: "‹ Menu" on top (`data-flow-mini`: folds it to a 56px strip of icons and circles, each name in its hover;
`lcm-rail-mini`), then the name with its initials ("My profile" on hers), This visit and Next up, the six numbered steps (a
24px circle, done = the brass ✓) and the page rows: each its icon (`PRES_RAIL_ICN`, the same icon the page has on Today's visit),
its name, its count / date / "n left" at the end. The open row is the light tint, no bar (her 2026-11-03 word: no side lines); while a page row is open
its step stays plain (`par`). Every captioned group (Body, Life, File, Fertility & cycle, Log / Clinic) folds on its ▾ head (`data-flow-fold`, `lcm-rail-fold`); the page she is on never hides. Both folds are this
device's. **On a phone** (≤640px; her picks 2026-11-02, phone-rail mock A; BUILD-NOTES "Phone rail") the same rail is a drawer
from the left (300px, the page dimmed behind it, This visit and Next up kept), opened from one 44px bar at the foot of the head
in the rail's colour: the open page's icon, "group · page ▾" ("Today's visit · Tongue", "Body · Herbs"; `presRailBarHtml` /
`presRailBarSync`), then ‹ › to the page before / after in the rail's order (`presRailStep`). A pick, ‹ Menu or the dimmed page
closes it (`presRailDrw`); the old strip of steps and the boxed tab rows above a page are gone (the tab rows at every width); Next
stays. Patient details' cards have pale-blue heads and
striped field rows, and a right column (`phPdApptsHtml`, ≥1100px; below the cards narrower): Next appointment (2), Book
another, Previous appointments (5) with All n; Open = the booking on the calendar with its card (`phApptDeepLink`). The
Appointments page is one table (When · Type · Care Plan · Open); Supplements' table has the same head row and stripes.
**Medical alert** (her yes 2026-11-01): `rec.alert`, an amber chip after the name on every page of that patient; tap to write
or change it (`phBandAlertEdit`; empty takes it off); the phone shows it but adds from the computer. Medical history's
groups, the question cards (`.ph-pfw-card`), IVF history's fold, the Log and Blood tests' table use the same white card +
pale-blue head + stripes.
**Patient details** (`phPdPageHtml`) = a hero + 2 cards, Contact and Body (her 2026-10-30 pick; 3 cards from 2026-10-19), every
control 32px Zanda-style (6px boxes, joined 6px bars, white value boxes, the send-the-form circle): tap to edit in place, age from
DOB, BMI bar, a filled-in ring (n of 7: name, sex, DOB, phone, email, height, weight), Call / Text / Email chips [Patient details =
hero + 2 cards]. **The extras live where they are read** (`phPdOnFileHtml`; BUILD-NOTES "Patient details extras"): the partner
on IVF history's head, the addresses in a booking's Delivery step (Save to her file · ✎ · ×), the health fund and rebate in
Compose's rebate list (the old note in the fund cell's hover); the page shows one grey **On file** line under the cards only
when one is stored, each part a door to where it is kept. A returning patient's Sex / DOB / Phone /
Email turn amber once changed this visit. **Came in for** shows on Today's visit; the complaint priority ribbon sits on every
patient page. **Profile search** (header band) searches the whole file (nothing saved; free-text history notes not searched). A
patient can be linked to their partner from IVF history's head, a man from his Men's fertility timeline [Partner link]. The no-plan gate has "Skip for now" (in memory only). The read-only
**Patient Directory** unions six sources keyed by `phPatientKey`. "Profile-first" is history: the Patient Workflow LAW replaced
it.
**No band on patient pages (her pick):** no dark three-gauge band on Medical history, Supplements, Photos, IVF history,
Appointments, Messages, Treatment, Notes; each page's facts = an icon + a number on its own first row, words in the
hover title (`.ph-fx`; `presBandHtml` + `PRES_BANDS`, sync unchanged). Medical history's ✓ asked and 🕒 updated sit in its toolbar
(`presMedHxBandHtml`); no "By group" (each group heading says ✓ asked).
**Medical history** (`phHxScreenInnerHtml`, the inline card; the pop-up went 2026-10-07): one toolbar line = Send intake link ·
Paste a note (Buttons) · the groups sheet (a sliders icon, "Which groups count for each complaint" in the hover) · ✓ asked ·
🕒 updated · Full history | Allergies only | Not needed (one joined bar, the phone too). Then the groups in columns (the main
complaint's groups first, tinted, a Main tag; ✓ All a Button, "✓ Asked" once done), each question a 32px row chip (a Yes solid);
a Yes row's note is a Field that wraps and grows (`textarea.ph-hx-note`, Enter ends it); + Other condition; Surgeries. **No flags
strip and no ✓ Save** (her 2026-10-29 audit picks): a Yes shows as its own row and as a chip under the body figure (the side
column, `phHxFigureHtml`); every tap and note saves itself. BUILD-NOTES "Medical history audit".
**Supplements** (her pick C on `supplements-table-mock-2026-10-29.html`, 2026-10-29; BUILD-NOTES "Supplements: the checklist
table"): a checklist table (`phSuppEditorHtml`, `.ph-supp-tbl`): Taking · Supplement · Product · Dose · Since · From · Note, one
row per supplement of the list (`PH_SUPP_KINDS`, 24, as she keeps it in Settings › Patients › Supplements: hide one, add one) plus
the patient's own rows (`rec.suppOwn`: the form's, or typed in the last row "+ Other"); taking rows first, then stopped ones faded
with their date, then her vital.ly products' kinds, then the rest A–Z. The tick starts a supplement today (her product's usual
dose and her one product of that kind pre-fill) or stops it today; Product = her vital.ly product (`PHARMACY.suppProducts`, a
chip, ↗ opens the link) or the patient's own brand (a field); Dose = her words; From = vital.ly · own · form. The one read of
what the patient takes is `phSuppTaking(rec)` (the band's Taking n, Today's visit's "still the same?", the form's rows, Copy
notes, the medication note, Copy for vital.ly). vital.ly has no way in (2026-09-11): "Copy for vital.ly" copies product — dose
lines for its search. Patterns' iron clue reads `rec.supplements.iron.on` as before.
**Remove a record (her 2026-10-29 "i need to be able to remove this record"; LIVE build 20261029-211300):** every row with a record has a
✕ beside its name: the patient's own row goes; a list row's record (`rec.supplements[kind]`) is cleared, so the row is back to ○ as
if never ticked. Either way one toast "Removed · Choline" with Undo. A stopped chip ("stopped 29 Oct") wraps inside Taking.

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
full size (280px; one per row on a phone). The read-only Fang Bing Ren plate draws no names and no marks. **Enlarge** copies the picture row into the shared expand shell with its own ids (`phSvgOwnIds`, "-x"), no body tap targets and the panel's case colour; a tap there (finding, mark, Tools bar, Right | Left) redraws both copies (`phMskDgPaintAll`); a narrow copy shows one picture per row [MSK Enlarge: the back figure drawn black]. Hover names on a computer. A
muscle in parts is **tapped part by part** (her pick "Split"): pec major clavicular / sternal, deltoid anterior / middle /
posterior, trapezius upper / middle / lower, teres minor / major, rhomboid minor / major: each part is its own `PH_MSK_MUSCLES`
row with `of` = its whole; the whole is `hide` (off every list, chip and search) and an older mark on it shows on each part with
nothing of its own (`phMskMuState`). On a narrow card each row stays a front + back pair. **The neck** (her picks 2026-10-28)
[Neck muscle picture]: **Side + back** (`PH_MSK_ATLAS_VIEWS.cervical`; the side view is `PH_MSK_ATLAS.side` on SIDE's own grid,
drawn with `sideSvg(..., { neck: false })` so its own neck and jaw lines stay off), a close window (`PH_MSK_REGION_CROP.cervical`,
`PH_MSK_SIDE_CROP`), one side picture with a **Right | Left** joined bar under it (`phMskSideLR`, view state; `dg-side` turns the
page's copy and the Enlarge copy; a tap marks the side showing). Parts: SCM sternal / clavicular head, anterior / middle /
posterior scalene, splenius capitis + semispinalis capitis (`of` their wholes), cervical multifidus, lateral pterygoid, the
**suboccipitals as one tap** (four drawn, one key `sub`), the upper trapezius to the skull, levator, masseter, temporalis (their nerve, motor point, point and caution words are hers: her yes,
2026-10-28). The same
neck shapes sit at the top of Shoulder and Mid back (one drawing everywhere); a neck-only muscle names itself in the Neck picture
only. **The lower body and the belly** (her 8 picks 2026-10-28) [Muscle picture: legs, low back and belly]: Low back, Hip & thigh,
Knee and Ankle & foot are true shapes too (`PH_MSK_LEG`: front, back and side shapes in leg space, placed on the figure by
`phMskLegPts` / `phMskLegSidePts`, cached by `phMskLegShapes`; they draw in every front and back picture, Shoulder and Mid back
included, under one drawing). Low back keeps Front + back. Hip & thigh, Knee and Ankle & foot add a **Side** row under Deep (Surface |
Deep side by side, the Right | Left bar in its heading; `PH_MSK_SIDE_ROW`, `PH_MSK_SIDE_CROP`), so the front and back keep their full
size. **Belly** is its own area (Front only, Surface | Deep side by side): a belly pain (epigastric, abdomen, lower abdomen) opens it
only when she taps **Belly muscles** in its card's Palpate row (`p.mk` on the pain, through `phPmWrite`; `PH_MSK_PICKREG`;
`phMskRegOf`, which every pain-to-area read uses), so a period or digestive pain never brings it up. Rows added after the row they
refine: external / internal oblique, transversus, rectus abdominis; lumbar multifidus, longissimus, iliocostalis; psoas, iliacus;
gemelli + obturator internus, quadratus femoris; sartorius; adductor longus / brevis / magnus, gracilis, pectineus; biceps femoris
long / short head, semitendinosus, semimembranosus; vastus intermedius; gastrocnemius medial / lateral; EDL, EHL, EDB; peroneus
longus / brevis; FDL, FHL. The ITB, patellar tendon, Achilles tendon and thoracolumbar fascia take findings and marks but have no
motor point (drawn beige, `tdn`; the Motor point tool says "No motor point here"; Tender adds MP only where a muscle has one). Names
say Peroneus. A muscle two areas share shows under the first pain it belongs to; a tap on it keeps the picture on the area she has
open when it belongs there too (Psoas in Belly) and otherwise turns the picture to its own area. The new rows' nerve, motor point,
point and caution words are hers (her yes, all as written, 2026-10-28). **Not built:** the arm (elbow, wrist) keeps its grey bellies until
drawn.

## Fang Bing Ren, Find the Ren & Patterns
**Key guard:** every sign a family weighs must be a row of its pool; `phFbrKeyCheck()` lists any that is not, once after load, in the console (the Ren row "Cold & heat: whole body feels hot" had dropped out on 2026-11-02 and is back).
**The growing triangle** tops the page (her 2026-11-05 picks; BUILD-NOTES "The growing triangle"): a dark stage above the card, this patient's ticks and lead read through `phTriEffective` + `phFbrRank` (`phFtgRefresh`, called by `phTriRefresh`), nothing stored but the fold. It grows from three embers as signs come in, its Fang is `ranked[0]` (the gold tile), a new lead flashes, it rests still. The person is the patient's own sex and build. The chip "Triangle" in the card's tools folds it and it stays folded (`lcm-ftg-fold`; a phone opens folded and builds nothing until opened); Story opens the film; past its height it is a sticky 96px band under the name band (from 641px).
**Fang Bing Ren** (the Triangle) is the one place constitutional-family scoring happens: one merged header (verdict + Quick
assess); signs in ten shared areas; ONE "Looking at" line, on the Fang Bing Ren page only (Everything · her complaints · the tile
she tapped; a complaint lifts its signs and fades the rest, nothing hidden, view state only), which Quick assess follows
(`phQaFocus`); on Today's visit (it shows the complaints) a tap on a complaint's name on the Compass sets the same pick; ticked
chips that clear; a body chart whose big view zooms to a place when she points at its list group (organ plates under it with the
concept picture of the pattern her signs there point to, header click pins; `phFbbZoomShow`, `PH_FBBP`, `phPpFbbFor`); a reference
sheet [synth22: the "Looking at" line ... body map close-ups]. Formulas rank by `phFbrRank`, the leader is `phFbrLeadOf`;
pre-fills come from charts, history, bloods, the intake form, pain words, food reactions, cycle, age and sex (derived, a tap
always wins); today's cycle day log answers the Bing period rows (clots or dark blood, Spotting, Bright red, Dark-pale; `phCycDayBing`). The day card's Colour has Dark-pale (her 2026-10-28 answer). The pulse chart's Interrupted or Intermittent rhythm ticks the knotted pulse, and a tongue coat None or Peeled ticks "no coat" on Bing and Ren (Zhi Gan Cao Tang, 2026-10-28). The tongue chart's Tender AND Red (or Crimson) ticks "Tongue: tender, red" and its Greasy chip "Tongue coat: greasy"; Ask her's Mood has "Hard to calm down" under Right now (Gui Zhi Jia Long Gu Mu Li Tang, 2026-11-01, LIVE build 20261101-181400). The pulse chart's Deep AND Tight ticks "Pulse: sinking, tight"; Ask her gained Unsteady, Rush moving upward, Chest and ribs full, Thin, clear, watery phlegm, Cold back, Spits clear saliva, Dull taste, Sloshing, gurgling and Throbs (Ling Gui Zhu Gan Tang, 2026-11-01, LIVE build 20261101-192000). Her pointer list (integrate33 run 20, 2026-11-01, LIVE build 20261101-220200): 20 new rows (Work & hobbies, Pregnancy, period, postnatal, bedwetting and more), each of her lines 4 on its family; Wai Tai Fu Ling Yin, the 38th family (Ren only, under Ban Xia); her avoid lines are a red caution on the board tiles and Quick assess bars (`PH_FBR_AVOID`, `phFbrAvoidFacts`: pregnant, bronchiectasis, drug liver damage), the ranking unchanged. Chai Hu Gui Zhi Gan Jiang Tang (integrate33 run 21, 2026-11-02), the 39th family, under Chai Hu: her table at her weights, 7 new rows (breastbone pain, sweating from the head and neck both sides, exhausted after activity, big energy ups and downs, thirst without the wish to drink, a thick white coat from the chart's Thick + White chips); the built-in coat link is white vs yellow (a thick, dry coat left it). Chai Ling Tang (integrate33 run 22, 2026-11-02), the 40th family, under Chai Hu (her "wet Chai Hu": Xiao Chai Hu Tang with Wu Ling San): her table at her weights, 6 new rows (nausea after drinking water; a wiry, slippery pulse from the chart's Wiry + Slippery; a dusky-pale, puffy tongue from Pale or Dusky + Swollen; Ren twins of dark spots on the face and a red rash; a high LDH, read from a new LDH blood marker, DRAFT range 250 U/L). Her Chai Hu kinds lead the card lines (anxious, wet). The board groups its rows under quiet subject headings (a twin pair's heading is its Bing subject); the complaint
search box's "+ Add as complaint" adds the typed words as a secondary complaint through Came in for's own add. The same box
("Search signs or formulas") finds a formula by any word's start or its initials ("wen dan", "xcht"; `phFbrFormMatch`): its block
wears a ring, the rest fade (never hidden), a Formulas chip row under the box (best fit first); a chip, Enter or its block looks at
that formula and empties the box; words that find a formula and no sign leave the signs as they are (her ask, LIVE).
A new formula or sign = **integrate33**.
**Find the Ren**: look first, then two questions at a time. The look is one row at a time (her picks): the face photo with Eyes /
Lips / Skin / Muscles spots she drags (saved on that photo, `rqZones`), six tabs that show her picks ("✓ Lips Red"), the open
row's groups as joined bars with short words, colour dots and a body scale on Weight; keys 1–9, 0 None, Enter Next, ← → [Find the
Ren: one row at a time]. **Exam signs wait** (her pick "both"): the Ask never asks a Tongue, Pulse or exam-only belly sign
(`phRqExamPart`; bloating, rumbling, sloshing, fullness are still asked; a part skipped "Always" is asked); a part never charted
shows a **Later** line (its most telling sign · Tongue › / Pulse › / Abdomen ›); a 7th tab **Tongue** (optional: the six looks
still open the Ask) holds the newest tongue photo and the Tongue page's own Ren-linked chips, written through `phTngWrite` [Find
the Ren: the tongue waits, or is looked at here]. The three crack chips (Cracks · Horizontal cracks · Centre crack) sit in its
Shape row too (her 2026-10-29 "need tongue cracks"): record only, kept by name in `phRqTngGroups`, since no Fang Bing Ren sign
reaches a crack; they write the same chart, so the Tongue page's Marks tab and the summary show them. (Locked details: "Locked conventions" below.) **The Ren page board** (her 2026-10-29 audit picks, `ren-page-audit-2026-10-29.html`): the page is Find the Ren, then ONE search
row; the 319-sign board is FOLDED until she types, picks an area or taps **Signs · 319 ›** (`phRsbShowing`, view state per
patient). Signs opens it with the Open filter, the lead family's own signs first in the same three columns ("Si Ni Tang · 4 of
24", `phRsbLeadId`), rows 32 px (this board only); typing lists the matches under the box (/ ↑ ↓ Enter Shift+Enter Esc as
before), no match → "Add ‘…’ as a sign" on the same line (the foot's Add row is gone); an area opens that area alone; "All
areas" with nothing else folds it. The panel on this tab = Open Fang Bing Ren + the figure (no lead line, % or family list:
the lead is named once in the head line and shown once as the card's bars). No face / build photo = "+ Face" / "+ Build"
chips at the end of the tab row, never an empty tile. The found line carries "Next: Today's visit ›".

**Patterns** (`phPatCompute(name)`) derives candidate TCM patterns live from the file, **never stored**; only her Agree / Not this
patient writes `rec.patterns.agreed`/`.dismissed`. Strength is words (Likely / Possible / A hint) + a clue count, never a
percentage. A card shows only its clues and Agree / Not this patient (no letters, food, points or supplement chips); an open card
also shows the pattern's concept picture. One pattern can be ★ main. Formula ideas are OFF (she dislikes suggested herbs). A rule
she overrode in Settings never gains new clue keys later (deliberate). All pattern wording is Claude-drafted, hers to correct.
Since 2026-10-29 (her audit pick: opened for 2 patients) Patterns · Diagnosis sits with Timeline under the rail's folded
"⋯ More" row after Fang Bing Ren (`presFlowMoreOpen`; open on a tap or while one of them is the page, closed when she leaves).
The Fang Bing Ren | Patterns · Diagnosis switch rides at the end of the **Plans row** when that row shows (more than one plan, or a loose prescription; her 2026-11-09 "merge to one line"): `phFbrSwitchHosted(name)` is true on a plan's Fang Bing Ren or Patterns · Diagnosis page, `presTpPlanTabsHtml` draws the switch (`phFbrSwitchHtml(name, tab, true)`), the page body draws none, and `presTpMainTabRefresh` repaints the row with the page. With one plan and nothing loose there is no Plans row, so the switch stays at the top of the page.
**Concept pictures** are drawn from the body (a natural hand, a real stomach / throat / kidney, vessel walls with cells). Her
rule: this anatomical model is the model for every picture; the rest move over in batches. Yin deficiency and Heat are drawn on
the body chart itself (organs at true size, `anat` in `PH_PP`, a 300 x 200 frame) [Concept pictures on the anatomical body]. The
Her build person (its pale organs and the one face, `PH_BODY_GEOM.face`, on every front view, the patient's measured build) is
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
**Formula pictures (`PH_FP`) [Formula pictures]:** every formula in the Fang Bing Ren list (39 scenes by 2026-11-01, Ban Xia Hou Po Tang, Huang
Lian Jie Du Tang, Xiao Chai Hu Tang, Wen Dan Tang and Wu Ling San among them) has a moving picture of the body (three burners,
trouble, herbs at work, tongue + pulse inset), three stops Trouble / Formula at work / Settled, tap-a-herb chips. The person shows
to mid-thigh (340 x 240), drawn at .88 (`ZK`, labels follow through `ZP`), with the one face (`face: "sketch"`; her picks: slim face, pointed chin, closed lips; no hair, her 2026-11-04 "remove hair of figure", on every figure that wears it). The tongue
inset's shape follows its trouble words (`tngFeat` / `tngD`: swollen = wide, round tip, scalloped teeth marks; wet = shine; red
tip; dry = cracks). It replaces the pattern picture on the Guide card for those formulas and also shows on Dispense (end of the
right column) and the Care Plan formula cell. Same runner as the pattern pictures. A new formula = one `PH_FP.SC[id]` scene +
`PH_FP.HERBS[id]` + `PH_FP.PAT[id]` + its Guide story rows (`PH_FS_WORK`, `PH_FS_PAIRW`, `PH_FS_ALLW`); no scene = the pattern picture stays.
**The big sheet (her picks):** every formula, pattern and Guide key-sign picture (the Patterns page's open card too) has an expand
button in its top-left corner (`phPpXpHtml`) opening the one sheet at up to 1100px, which steps through the pictures it sat with
(one opener, `phPxOpen` → `phPxPaint`): arrows on the picture's edges AND a strip of the pictures right under it (a phone: strip +
swipe, no arrows), ← → too, round from the last to the first, no count. The set is where it opened: a Guide card = its formula or
pattern picture(s), then its Key + Strong signs; a formula opened alone (Dispense, the Care Plan formula cell) = it, then its
signs; the Care Plan Diagnosis = its pictures; the Patterns page = every pattern on it with a picture. Every picture is one size
(`--px-h`), so nothing moves; a sign's name is said once, in the header with its Ren / Bing marks and weight dots.

## Guide — Families (study + edit)
The Guide is **[Abdomen] [Blood tests] [Compare] [Eating eggs] [Eggs] [Families] [Herbs] [Iron] [Pulse] [Sources] [Tongue map] [Triangle]** (the tab menu lists them A–Z, her 2026-11-09 "alphabetical order"; it opens on Families): a herb card is the body type with its formulas under it, notes-only formulas are
dashed tiles, a study card sits on the right (in Study, the concept picture of the pattern(s) the family counts for, under the
pearl). **The card's rows ARE the Fang Bing Ren tables** (`PH_FORMULAS[id]`): her edits live in `PHARMACY.fbrEdits[id]` (+
`fbrEditsAt`), and `phFbrEditsApply()` rebuilds `.ren/.bing/.or/.core` in place from `phFbrPristine`; `phFbrEditsSync()` (top of
`renderPharmacy`) re-applies when the saved edits change. **Nothing else may write to `PH_FORMULAS`.** Every Guide edit goes
snapshot → change → `phGdfDone` (tidy, stamp, save with rollback, sync, repaint, Undo). A learned `a_` sign off a formula is
written as 0, and lists filter `w !== 0`. Cloud: `mergeFbrEdits` beside `mergeTemplateOverrides`. Notes-only rows: `gdNoteEdits`.
A notes-only formula that has become a scoring family (Wen Jing Tang, 2026-10-28) leaves Notes only; its memory aid, distinction,
conditions and source show on the family's card (`phGdfNoteIsFam`, `phGdfFamNoteId`).
**The by-area table (Group = Area, `phGdfMergedHtml`):** each area one ruled table, its name and count in the head row beside Ren ·
Bing, up to four columns (her 2026-11-09 "give 4 columns"; each at least 180px, so the table's width decides: 4 with the formula
list folded at 1220px, 2 with it open, 1 on the phone), 52px value cells (the number + the other formulas' dot and count; a tap
opens the box of those formulas). **The symptom cell is split and filled by the numbers** (her 2026-11-09 "colour the symptom block based on the ren number", then "colour the column of the symptom but divide the colouring in half, first half for ren and second half for bing", mock first, her pick B; the number cells are plain): `phGdfMergedHtml` gives the symptom cell `--rr` = Ren rank / 5 and `--rb` = Bing rank / 5 (0 for a missing, dash or against (minus) side); one CSS rule paints the left half from `--rr` in the formula's own `--deep` at 30% on white and the right half from `--rb` at 46% (Bing a step deeper), with a 2px gap between them; 5 = a full half, 4 = 80% of it; a both-row's tint stays behind the unfilled part. The Guide's pages are one Families ▾ menu at the top (32px; BUILD-NOTES "Guide: tap audit").
**The formula list beside the card** (`phGdfMosaicHtml`, `.gf-mc`; her 2026-11-09 pick B · Tint): each family a white card with the
thin line, its head row washed in the family's colour (16%), the name and Chinese on one line, the English under it; no colour
line. On their own and Notes only keep a white head (Notes only dashed).
Symptom words show a capital on every word but the small ones (conjunctions, articles, short prepositions: "Flushed or Red",
"Sensitive to Cold"; `phSymCase`, display only; CLAUDE.md "Shown with
capitals, saved as written").
**Edit is the same table** (her 2026-11-08 pick A, `guide-edit-like-study-mock-2026-11-08.html`): Add to Ren · Add to Bing above the
columns; a tap on a number opens the same box with the five dots, − and × on top (`phGdfEdOpen`, one at a time; a dot sets it and
closes it, the number pops). The card's top bar keeps every part whole and scrolls sideways. BUILD-NOTES "Guide card: Edit laid out
like Study".
**A herb's tile is narrower than the formula tiles under it** (her 2026-11-10 "give the herb a more narrow chip to differentiate from formulas", then "i mean herb": every herb): the family head and each herb On their own get `.gf-t.herb` (62% of the card, left-aligned; `phGdfTileHtml`); on the phone's pick bar tiles are already their own width, so it changes nothing there.
Details and tests: [Guide Families].
**The card's picture (her picks 2026-11-04; LIVE build 20261105-003400; BUILD-NOTES "Guide cards: the person, and the formula's story"):** `phFsHtml`, the `phFs*` functions.
- **A herb family is a person** (`PH_FS_PEOPLE`: Ban Xia, Chai Hu, Da Huang, Fu Zi, Gui Zhi, Huang Bo, Huang Lian, Huang Qi, Ma Huang, Shi Gao), her words "animations for gui zhi should only focus on the person, only the formulas show pathology". The card plays only its Ren rows: the body on its own build (`phFsBuild`), no burners (`PH_FP.person`), no stops, no herbs, no conditions (a Diagnosis row never plays, its tile stays: integrate33 run 23), tiles for Ren rows only. Its rows of signs under the card stay as they are.
- **A formula plays one story**, four stops: Person (Ren rows, the person's own words on the body) → Trouble (Bing rows) → Formula at work → Settled. Formula at work is her "one herb, herb pairs, and whole formula effect": each herb's turn (`PH_FS_WORK`, herb key → the sign it answers), then the classics' pairs (`phFsPairs` reads `PH_HU_SRC`; `PH_FS_PAIRW`, pair → sign, words), then the whole formula (`PH_FS_ALLW`, four sign pictures easing together). Only the herbs on turn keep their words (`phFsHerbSet`).
- **The film's rules:** a sign marked both Ren and Bing has a tile on both stops and plays once; a sign a herb answers plays before the herb; Settled never plays a sign the herbs just eased (with no Bing row left it takes a Ren row they did not touch, never the build); a formula with no Bing rows plays what a herb answers on Trouble, not Person (Wai Tai Fu Ling Yin); at most two pictures of a place. Beats: 2.8 s a person's sign, 3 s a trouble, 4.5 s a herb, 4 s a pair, 6.5 s the whole, 2.4 s settled, each with its glide and dissolves added: a person 29 to 48 s, a formula 63 s to 2:05 (her pace pick "Calm").
- **The sign pictures are its lens:** a gold ring on the body marks the place (skin, sweat, fever, energy: the body's outline lights). Every sign draw is `draw(t, a)`, a = how much of the sign is there, so a sign eases as its herb works. The six throat signs share one close-up (`PH_KS_SC.throat`, her 2026-11-04: the Plum-pit throat with the qi knot's gold pit, glow and circling qi, built on `PH_PP.SC.meihe` with `S.zoom`); on Ban Xia Hou Po Tang's body the knot itself sits mid-neck, and the ring with it (`phFsSpot`). BUILD-NOTES "the qi knot on the throat".
- **It plays like a video** (her 2026-11-05 "can you make it more video like?"; picks "Glides in", "On the body", "Calm", "Live drawing"; BUILD-NOTES "the film plays like a video"). One 16:10 stage, one clock (`phFsMount`: `st.T`, `st.seek`, `draw`), every frame worked out from the film's time. `phFsShots` turns the beats into shots: a chapter opens wide, the camera (`phFsPlace`) glides in to the place, a dissolve to the sign's picture; a herb's turn stays wide with the sign small in a corner (the corner above if the herb's own words sit under it); the whole formula is its four pictures; it ends wide. The labels stay on the body in a wide shot; a close-up, a pair and the whole formula say their words in the band under the stage, which keeps its height. Under that the round button, the bar (drag it; arrow keys 5 s; one piece a chapter), the time, Full screen, then the chapters and Conditions; beside it the herbs, pairs and tiles.
- **Plays once, then holds on the settled body;** the stage or the round button pauses, Play again restarts. A herb, pair or Whole formula chip holds that shot, still moving, a second tap goes on; a tile holds its sign on the whole stage, a second tap lets go; a chapter chip plays from there. A repaint keeps the place (`phFsCur`). Off screen it waits. Its clock's words are written once a second and the camera only when it moved (`st.tm`, `st.wVb`); the three words on the body fade through `--cap-o` set on those words (`burn`), not on the picture's root; a drag along the bar enters a shot only when the shot changes (`st.seek(t, true)`). Under reduced motion it does not start or glide, and the button, bar and chips still work. What sits on `.fs-stage` runs on this clock, never `phPpLive`. Dispense, the Care Plan and the big sheet keep `phFpHtml`, their own stops and no player.
- The Conditions line under the player = its Diagnosis rows, A–Z (they stay out of the film). Cover Signs blurs the film's words too. Each person has their own build: their Ren build row, else `PH_FS_BLD_WORDS` from her person line.
- **Gui Zhi Tang has its own story** (her 2026-11-04 "ok, build it and push"): `SC.guizhitang` in `PH_FP`, reached by one chip on Gui Zhi's card, Gui Zhi | Gui Zhi Tang (`PH_FS_FORMULA`, `phFsCardHtml`, `phFsWhoTap`; `phFsView` keeps the choice while the card repaints and when she comes back to the card). Gui Zhi itself stays the person, no pathology. It has no `PH_FORMULAS` entry, so Fang Bing Ren scoring and the families list are untouched: it reads Gui Zhi's rows through `PH_FS_SIGNS_OF`, its name comes from `PH_FP_NAME`. A prescription named Gui Zhi Tang, with or without additions, now gets this picture on Dispense and Care Plan through `phFpIdFor`; Gui Zhi Jia Long Gu Mu Li Tang still gets its own.
- `PH_FS_WORK`, `PH_FS_PAIRW` and `PH_FS_ALLW` are Claude's DRAFT for her to read (a Draft pill on the row); the pairs come from the classics' table, itself Draft. A formula she has read joins `PH_FS_READ` and loses the pill: Gui Zhi Tang so far (her 2026-11-05 "good draft"); the other 30 keep it.
- **The one face** (her 2026-11-05 "do an audit of all facial animations and make the visuals consistent"; LIVE build 20261105-093600): every face the app draws comes from `PH_BODY_GEOM.face` (`FACE_KIT`), her graphite sketch face. `art(o)` the whole drawing; `plain(male)` the same features with no paper or blur, for small figures; `live(g, o)` a face that moves (lids, brows, smile, folds, pucker); `plainEye`, `plainBrow`, `plainNose`, `plainLips`, `headD` to build on. It has a woman and a man, no hair. A close-up is this face in a frame (`phK2FaceOn`: lips, eyes, complexion, fever), the Face plate is this face with what is lit on it, a condition picture sits on `person`. A build widens the body and hardly the head, so the face and what sits on it keep the head's width (`faceO` in `svg`, `headQ` in `phRenFigureParts`, `head` in `PH_FP`'s `body`). Never draw a face of its own. Cut-aways with no face stay as they are (mouth, brain, ear, neck bones, thyroid).


## Guide — Tongue map, Pulse, Abdomen (linked to the record's own pages, 2026-11-03; LIVE build 20261103-233500)
Each tab draws the **open record's LIVE chart** (the patient open behind the Guide, else her own record from Me: `phGdWho`) with
the page's own builder, handlers and save (`phGdChartHtml`: `phTngHtml` / `phHxConstitPulseHtml` / `phAbdHtml`), so a tap in the
Guide is on the profile and a tap there is here. Under it the notes (`[data-gd-notes]`, `phGdLinkRefresh(id)` after every chart
tap): a **gold dot** on each note today's chart reaches and a **Today** chip that shows only those (`phGdToday`). Pulse: the hits
are the page's own `phVisitPulseKbHits`; "+ <name>" on a note ticks the same Rate & rhythm chip (`data-constit-hm`) or picks the
chart's brush for a box quality (`data-constit-pulse-stamp`). Tongue map: the Tongue page's chart; the 14+ notes by place (tip →
Upper, middle → Middle, root → Lower, sides → L / R; `PH_GD_TNG_ZONE`), a place marked today dots its notes; the old demo model and
4-region map are gone; the healthy tongue photo opens beside today's from the same icon as on the Tongue page (below). **Abdomen (new):** the Abdomen page's chart; the belly signs Fang Bing Ren reads off it (built each time
from the abdomen specs of `PH_FBR_CHART_PREFILL`, with the formulas whose `ren` / `bing` weigh them), each with "+ / ✓ <name>" =
the Fang Bing Ren page's Yes / No (`phGdSignTick`, `phRenSignTick`'s write); her own notes in **`PHARMACY.abdNotes`**
(`{id, w: "abd:<mark>[@zone]", meaning, formulas, source}`, syncs in pharmacy_core like `pulseNotes` / `tongueNotes`); a place's
popup open on the chart (or a picked sign) shows that place's rows. **The pages' side:** under the Tongue / Pulse / Abdomen pages'
chart a "From your Guide" box (`phGdLinesHtml`, `[data-gd-lines]`): today's notes, each a door (`data-gd-open="tab:id"`,
`phGdOpenAt` → the tab, the note flashed in view), and "+ my note" about one of today's marks into the Guide's study. Every pulse
note line (`phPulseKbLineHtml`, the visit panel too) has its own "Guide ›". **Safety:** the profile's hidden copy of a chart is
removed while the Guide draws one (`phGdStripHidden`, on paint and on each Guide tap via the capture listener `phGdClaim`, which
also sets `presHxScreenName`); `renderHxScreen` and `phAbdRepaint` take the open Guide's host first; abdomen taps resolve the
record with `phAbdName` (the Guide's record, else `phPfwName`). Details and tests: BUILD-NOTES "The Guide and the record's pages".

## Guide — Triangle (a teaching page; LIVE in build 20261105-202200)
Her word 2026-11-05: "include this page in the guide section"; BUILD-NOTES "The growing triangle". The Fang Bing Ren page's stage with no patient (`phFtgGuideHtml`, `phFtgGuideMount`): the count, Tick for me (Sweats easily · Robust: one sign every 1.5 s, a tap or leaving the tab cancels it), Clear, Search, then the Bing and Ren signs A–Z. Picks stay in memory (`phFtgG`), never saved. Story opens the 88 s film (`phFtgFilmMake`, built on the first tap; its scores are `phFbrRank`, its words DRAFT). `phFtgStop` on a tab change. **Light on the page (her 2026-11-06 "when i play the video on my desktop the app feels laggy"; BUILD-NOTES "Films: lighter on the page"; LIVE in build 20261106-125800):** playing, it draws about 30 frames a second; paused, ended or out of view it draws nothing and rests on its picture, like a video (`wake`, `seen`). A frame writes an attribute, a style or a word only when it changed (`setA`, `setS`, `show`, `bar`), the effects layer is left alone when it has nothing to draw (`fxInk`), the haze is drawn small and laid on once (`mistC`), and its three Bing pictures are the film's own (`svg.__pp`), never the page runner's.

## Guide — Compare (formulas side by side)
The Compare tab (her 2026-11-02 picks, BUILD-NOTES "Compare formulas") holds **one picked set of formulas** (`phCmp.ids`, view state,
never saved): Family ▾ loads a herb's whole family (`PH_REN_FAM_GROUPS`), and its first choice **Single herbs** loads the people on
their own (`PH_FS_PEOPLE`, each the head of a family, A to Z) and opens on Ren (`data-cmp-ren`; her 2026-11-05 words, LIVE in build 20261105-185500; a set of only single herbs shows no Herbs table, on screen or in Copy: `phCmpPplOnly`,
her 2026-11-05 "yes leave the herbs table out for single herbs", LIVE in build 20261105-191500), "Add a formula" adds any `PH_FORMULAS` entry, a chip's ✕ takes
one out; a family head's Compare chip on Families and the study card's Compare with… select open the tab pre-loaded (the select no longer
paints row badges). **Signs:** inside each sign category (the sign pool's order) one line per sign, A to Z; the sticky first column names
the category once and each line's sign faintly; every column that weighs the sign shows its words with the Guide's dots in the formula's
shade (bold = Key, red = against); All · Key · Shared · Tells · Unique with counts (a Tell = a 4 or 5 in one formula and a blank in
another; Tells opens first), Ren | Bing | Both, "Shared by all n" above the table, the one search box filters the rows. **Herbs:** a
column = the formula's classical recipe (`phHuFormulas()`, DRAFT; a body type's = its base formula, `PH_CMP_BASE`) over her own recipe
(her formula prescriptions by name; Recipe ▾ when she has several), headed by the formula's own name, never the body type (her "ban xia is
not a jar, its a herb"), with her formula jar as one dot (its words in the hover) or **+ Add jar** (`phOpenHerbAddDrawerNamed`: the recipe's
name when she has one, else the formula's); **every row is one line** (her "i want gram only, the table needs to be one line, the low out can be
replaced by a more simple dot hover for more info"): a classic herb by the Herb use key + one stock dot (green in stock, amber low, red out,
grey stopped / untracked, a red ring when not in her inventory; jar · state · grams in the hover; the live jar first), her grams only in a
cell (the classic's dose and the two shares in the hover; a faint dot in a column she has no recipe for), an amber dot when her share of the formula is more than a quarter off the classic's (liang / zhu / jin weighed, pieces and sheng
shown only), a red "—" where the classic has a herb her recipe lacks, a blue dot on a stand-in (`PH_CMP_STANDIN`, DRAFT: Dang Shen for
Ren Shen …), "In your recipe only" for the rest; a count line (not in inventory · out · low · stopped · no recipe · no jar), Missing only
(the marked rows), Can make now (the columns whose every classic herb is stocked, low, untracked or phasing out). Copy = both tables as
tab-separated text through the one clipboard helper. The phone scrolls each table inside the card with the first column held; the six
tabs scroll in their bar. **The same and the different (her 12 picks, BUILD-NOTES "Compare: the same and the different, in motion"):**
a sign both have = a hollow teal ring before its name and a teal tint on the row; a sign only one has = a 6px dot in that formula's shade
before the name and faint ghost dots in the empty cell; where both have it and one is stronger, the extra dots pulse once; the category line
carries one mark per sign; every column head has a small bar (the share of its signs the other picked formulas also weigh) and is a tap that
fades the rows that formula lacks (tap again resets, `phCmp.focus`, never saved); two formulas get an overlap bar above the table (only left |
shared | only right, to scale; a segment or its label is that filter, `only:<i>`). Motion only on a real change (`phCmpPaint(mode)`): a new
comparison lights the dots in sequence once and grows the bars (`"new"`); a filter chip, the bar, Missing only, Can make now, Recipe ▾ or the
search box slides the rows that stay to their new place, fades leavers, fades newcomers in (`"filter"`, .28 s, a timer not rAF); a head tap
fades in place (`"focus"`); all off under reduced motion. The Herbs table has the same marks (a ring = every classic shares the herb) and the
same slide and head tap. **Cases view column heads** read "Herb 1" / "Formula 2" by what the column is (a family head herb or a formula), not "Case n" (her 2026-11-10 "these are not cases, these are formulas" + "and herb family"; relayed by B33 C4 LCM bugs); the view's own name is unchanged until she says. **Bing · diagnosis is the first row**, before Ren, in every table drawn by `phCmpCaseRowsHtml` (Compare > Cases, Cases, My patients; her 2026-11-10 "put bing diagnosis as first row", relayed), under the "How it works" animation row. **Ren and Abdominal are two columns, and Mouth & throat is a row** (her 2026-11-10 "yes, build it as mocked", relayed from B33 C4 LCM bugs, mock: claude.ai artifact "Subjective, objective"; all three tables): the Ren row = Physical & visual (subjects Build, Complexion, Hair, Lips, Skin, Eyes, Constitution, Phlegm; `PH_CMP_REN_VIS`) | Personality & lifestyle (Work & hobbies; `PH_CMP_REN_PER`), Ren numbers only, the Ren count unchanged; those subjects' Ren signs leave "Signs · Ren, the rest" (their Bing side stays in the Bing rest row). The Abdominal row = Subjective, she reports | Objective, on palpation (`phCmpAbdObj` reads the sign's own words: tender, resistant, on pressure, pulsation, pulsing, tight, tense, rigid, spasm, weak soft, hot to the touch, flat, large full, enlarged, contracted = Objective; everything else Subjective), each half with its Ren and Bing numbers. Row order: How it works, Bing · diagnosis, Ren, Mouth & throat, Tongue, Abdominal, Pulse, Sleep, Mood, Energy, Family history, Medical findings. **Heart, Lung · respiratory · immunity and TCM patterns** (her 2026-11-10 Families-as-rows words, relayed by B33 C4 LCM bugs): two rows follow Pulse in `PH_CMP_CASE_GRP`, Heart (the Heart subject: palpitations, soft sounds, throbbing) and Lung · respiratory · immunity (Breathing, Cough and Immunity together, so "catches colds often" sits with them), each with its Ren and Bing numbers; their signs leave "Signs · Ren / Bing, the rest". A pattern filed under the subject "Signs" (blood stasis, blood deficiency, interior heat and excess, spleen deficiency with water retention) reads as a Diagnosis in these tables (`phCmpFixSubj`, mark `pat`), so it shows in Bing · diagnosis, and for a Tour Case it is added beside the case's own conditions; the catalog and the patient FBR board are unchanged. Eyes was already in Ren's Physical & visual (its Ren-side signs); an Eyes sign she reports (floaters, blurred vision) is a Bing sign and stays in the Bing rows. **Bing · diagnosis is two columns, Western | Chinese patterns** (her 2026-11-10 "bing diagnosis divide between western and chinese patterns"): a condition is a Chinese pattern when the catalog files it as one (the subject "Signs", mark `pat`) or its words are pattern words (`PH_CMP_TCM_RE`: deficiency, excess, stasis, stagnation, damp, phlegm, yin, yang, qi, wind, the six channels); everything else is Western (a disease name). Drawn by the same `phCmpCaseSplit` as the Ren and Abdominal rows; a case's own free-text conditions are sorted the same way. **Nausea is a throat sign everywhere**: the labels of nausea_vomit, nausea_tend and nausea_after_drink_now read "Mouth & throat: nausea" (were "Stomach: nausea"), so it sits under Head, mind & sleep > Mouth & throat on the Families card, the Tables and these rows; the keys and weights are untouched. The table columns are 300 px (were 230) so two halves fit. **The "How it works" animation row starts collapsed** in Compare > Cases, Cases and My patients (her 2026-11-10 "make this always collapsed"; `phCmp.anim` and `phGdTcAnim` default off); a tap on it still opens it, until the page is reloaded. **The Cases-table audit** (her picks, 2026-11-10, relayed by B33 C4 LCM bugs): (1) Vomiting is a Mouth & throat sign beside Nausea (the labels of vomiting_now and vomiting_tend now read "Mouth & throat: vomiting"; dry heaving stays under Stomach); (2) named rows for Stomach, Appetite, Bowels, Urine, Periods, Sex & fertility, Cold & heat, Fever, Thirst and Muscles, placed after Pulse and before Sleep (Muscles after Energy), so the rest rows hold only what has no row; (3) Heat (lower jiao) shows in Cold & heat, (5) Sex (female) in Sex & fertility, (4) the four lab facts under Diagnosis (high LDH, high uric acid, hyperlipidemia, diabetes) in Medical findings as "Blood tests", all three by `phCmpFixSubj` in these tables only (the catalog labels are untouched, so the patient FBR board is unchanged); (6) the Ren split's Personality & lifestyle also takes Age (Appetite and Sex now have their own rows, so they do not repeat in the split); (7) Compare's columns are A-Z when picked (a drag still moves one: `phCmpOpen`, the add, the family pick); (8) the Ren twin `pms_breast_tend` now reads "Breasts: distention before periods" like its Bing twin. **Tour days** (her 2026-11-10 "study tours happen on multiple days and cases are collected based on the following format 8am-12pm, 2pm - 5pm sometimes clinic, lectures, or conferences, or study group"; relayed by C22, mock mocks/tour-days-synth22-mock-2026-11-10.html, her pick A "Days inside the tour"): a tour source has `days: [{n, date, blocks:[{t, k, who, cases[]}]}]` (`phTcDays`, made on first use from the tour's old `cases`); each day has a Morning (8am-12pm) and an Afternoon (2pm-5pm) block; the grid draws the tour row, then a foldable Day N row (its date, its case count), then the two time rows with a kind chip (a tap cycles Clinic, Lecture, Conference, Study group), a Teacher box (a short name, saved where typed) and the circles: a tap puts a case in that time, one time per case within a tour (a tap on its own time takes it out), `s.cases` stays the union (`phTcSyncCases`); a tap on a time's name keeps only its cases (`phGdTcSrcF` = `<id>|<day>|<block>`, `phTcSrcFilter`); + Add a day adds the next day (date + 1) with both times. The Nanjing tour is named "Nanjing Study Tour Nov 2026" (the " · Day 1" is gone from the name), Day 1 = Mon 9 Nov 2026, all fifteen cases in its morning, Clinic, Dr Huang Huang. A case's first column in the progress table reads date then case ("Mon 9th Nov C1", `phTcWhen`), and a case head carries "Day 1 · 8am-12pm · Clinic · Dr Huang Huang" (`phTcPlaceHtml`). **+ Add a case** (her 2026-11-10 "Yes, design it", mock `mocks/tour-add-case-mock-2026-11-10.html`, her 8 picks): under each time block of a tour day a "+ Add a case" chip (`data-tc-addcase`, `phTcAddRow`) opens one notes box; Add (`phTcAddCase`) reads the notes at once (`phTcParse`: labelled lines "Complaint:", "Formula:", "Herbs:", "Diagnosis:", "Observations:" first, else the first sentence is the complaint, "Name 9g" pieces are herbs, a capitalised name ending Tang / Wan / San / Yin / Gao / Dan / Fang is the formula and joins its Fang Bing Ren family when the name matches, the rest are observations, each starting un-correlated), gives the case the next number across every tour (`n` = highest + 1, so Day 2's first is C#16), puts it in the block it was added under, clears the filters and shows it. An added case carries `added: 1`; its complaint is its name, so the head's sub-line is left out when it repeats the words above it (`phTcSubName`). **Edit C#n** under the case table (`phTcEditHtml`, `phTcEditSave`) opens the complaint (`c.cc`, wins over the seeded short name), formula, modified, herbs a line ("Name 9g"), diagnosis a line and observations a line, for every case; an observation line left as it was keeps its Correlate links. **Remove case** shows only on a case she added: a question, then `phTcRemoveCase` with Undo in the one toast (the case and its place in every block come back; its photos are never touched). Sessions, note photos, Correlate, Integrate and the .ics (the event lists the case number) read an added case like a seeded one. **Days 2 to 4 from her Appointments week** (her 2026-11-10 photo and "i already have it in my appointments calendar. use that to add it to my tour"): the Nanjing tour opens with Day 2 = Tue 10 Nov, Day 3 = Wed 11, Day 4 = Thu 12 (`PH_TC_CAL`, filled once by `phTcDays`, flag `s.calV`), each with its morning and afternoon teacher as her calendar names them (Prof. Huang Huang; Thu afternoon Dr Mei Lifang). It only fills an empty date or teacher, never one she typed; the kind stays Clinic (her calendar does not say). The Appointments grid already shows the tour from her own Me events (the "Study Tour" strip, a block a time), so the grid itself was not changed. **Correction, her 2026-11-10 "nanjing study tour starts on 2nd november" (relayed by B33 C4 LCM bugs): Day 1 is Mon 2 Nov, not Mon 9 Nov**, so the days read from her Appointments week (Tue 10 to Thu 12 Nov) are **Days 9, 10 and 11** (`PH_TC_CAL`), and Days 2 to 8 (Tue 3 to Mon 9 Nov) exist, empty. A one-time move (`s.calV2`, in `phTcDays`) shifts a saved Day 1 off 9 Nov and renumbers the three days made before, only while they hold no case and still carry their seeded date; a day she filled stays as it is. An empty block (no case, no teacher) is not exported to the .ics, so her calendar gets no empty events. **The Week One timetable** (her 2026-11-10 photo of "2026 Canada Jingfang Advanced Study Program, Week One, Mon Nov 2 to Sun Nov 8" and "integrate the tour dates and events to the case organising"): each block now has a **Place** field beside its Teacher (`b.at`, saved on change, the full text in the hover), and the kinds are Clinic, Lecture, Conference, Study group, Ceremony, Site visit, Case review (her timetable's legend; the first four keep their places). Days 1 to 7 are filled once from the timetable (`PH_TC_TT`, flag `s.ttV`) into whatever she has not set: an empty teacher or place, a kind still at Clinic. Day 1 = Opening Ceremony 08:30 Guocui Hall then Prof. Huang Huang's clinical observation (Guoyitang Bldg, 5F; the ceremony is in the morning's Place text), afternoon Dr Zhang Xueguang; Day 2 Prof. Huang Huang (Lecture Hall, 5F) then Dr Liu Minghan (Nanjing TCM Clinic); Day 3 Prof. Huang Huang twice (Nanjing TCM Clinic); Day 4 Prof. Huang Huang then a Special Lecture by Dr Zhang Xueguang (International Jingfang College, Room 616); Days 5 and 6 (Fri, Sat) Conference, full days, Jiangsu Province Hospital of Chinese Medicine; Day 7 the conference in the morning, Dr Mei Lifang's clinic (Nanjing TCM Clinic) in the afternoon. Day 1's morning teacher "Dr Huang Huang" becomes "Prof. Huang Huang" as the timetable has it. The .ics adds each block's Place as its LOCATION. Days 8 to 11 keep what she and her Appointments week gave; the timetable's second week is not in yet. **Add to calendar** (her 2026-11-10 "include option to sync my calendar with the november tour"): an "Add to calendar" chip under a tour's days saves a .ics file (`phTcIcs`, `phTcIcsDownload`) with an event for each day's morning and afternoon (8am-12pm, 2pm-5pm; title = tour, day, Morning or Afternoon, kind, teacher; description = kind, teacher, the case numbers in it); Google, Apple and Outlook calendars import it. The Nanjing tour's times are Asia/Shanghai (Nanjing) time, any other tour's are floating. A day without a date is skipped, so each open day has a date box under its name (`data-tc-ddate`; folded, the date shows in the label). Each block has a fixed UID, so importing again updates the events. It is a file she imports, not a live link: a later change here needs the chip again. **Cases view** (her 2026-11-09 "table comparison is just case 1 signs symptoms row, pathology row and prescription type of table format", mock first; her picks: a Cases | Tables switch on the Compare tab, every sign, Pathology = the Diagnosis rows): `phCmp.view` ("tables" is the default; view state, never saved), `phCmpCasesHtml(cols)`. One column per picked formula (Case 1, 2, 3; the head in the formula's own colour), fifteen rows (her 2026-11-09 synth22 list, mock first, her picks; `phCmpCasesHtml`): **How it works** (the formula's animation, `phFpThumbHtml`, a tap opens it big; its own row, and the row head is a toggle, `data-cmp-anim` / `phCmp.anim`, that collapses it to a thin row; open by default), **Ren** (its 3 strongest Ren signs and the Ren count), **Bing · diagnosis** (the formula's "Diagnosis:" signs with a plus weight, once each, A–Z; this is the old Pathology row, since Bing is the diagnosis), one row per sign group in this order: **Tongue** (Tongue + Tongue coat), **Pulse**, **Abdominal**, **Sleep**, **Mood** (Mind & mood), **Energy**, **Family history**, **Medical findings** (the Blood pressure signs; X-ray, scan and ultrasound have no formula data yet, so they show nothing), then **Signs · Ren, the rest** and **Signs · Bing, the rest** (every other sign), then two Prescription rows, both in grams: **Prescription · Inventory** (her own recipe for that formula, `phCmpCol(id).rec`, each herb in grams and the total; "Not in your formulas" when she has none) and **Prescription · Book / lecture** (the classical recipe, `phCmpCol(id).classic`, with its book; 1 liang = 3 g and 1 jin = 16 liang = 48 g, her pick; a sheng, a piece or a slice is not weighed, so its dose shows faint with "— g"). A sign line is the Tables' own line (her later "make ren and bing in cases look like the tables version"): the wording, then a number on a fill of its weight out of 5 (Ren 30%, Bing 46% of the formula's colour; a minus weight red, no fill), a Ren and a Bing sign of the same words on one line with two number columns in the group rows (Signs · Ren and Signs · Bing keep their one column), under a subject heading (a bold ink heading with a teal dot, `.zs`) and, in the two "the rest" rows, a body-area band (`.za`); each sign row's cell scrolls inside itself (190px); every row stays for every case (a dash when empty). The one search box filters the sign rows. **Group heads** (her 2026-11-09 "find a way to show the separate group categories ... so i can see the groups better"): in Tables a body area is a tinted band (teal 16%) with a white gap above and its name in ink, a subject under it a bold ink heading with a teal dot on a paper band (`tr.ar`, `tr.sj`); Cases uses the same two looks. **Drag a column** (her 2026-11-09 "i want to be able to drag columns to side by side view so i can compare formula"): every formula head in Tables, Herbs and Cases carries a 32px grip (`.cdrag`, `phCmpGrip`); a pointer drag (a mouse or a finger, the grip has `touch-action: none`) shows a ghost chip, lights the head under it and drops the formula there (`phCmpMove`, the order is `phCmp.ids`, so every view and the chips follow, and the faded column follows its formula); held near the table's edge the table scrolls (the sign-name column stays), so a far column can be reached on a phone; the grip focused and Left / Right arrows move it one place. **Herbs** are A to Z by the herb, never by its cooking method (`phCmpHerbKey`: a Zhi in front is dropped for sorting when two or more words follow, so Zhi Gan Cao sits under G; Zhi Shi, Zhi Ke, Zhi Mu, Zhi Zi keep their Zhi), plain before prepared; and the pairs of `PH_CMP_PAIRS` sit side by side (the second with an OR tag), as one unit under the first member's letter: Gan Jiang + Sheng Jiang, Dang Shen + Ren Shen, Zi Su Geng + Zi Su Ye, Zhi Ke + Zhi Shi, Gan Cao + Zhi Gan Cao; a pair member that is in her recipe only joins its partner in the main list. It no longer lists the herbs the formulas share first. **Formula tab** (her 2026-11-10 "add a tab for formula and move it from bottom of page to that tab"): the Compare view switch is Cases | Formula | Tables (A to Z); Formula holds the Herbs table (`phCmpHerbsTableHtml`, with its Missing only and Can make now chips, the Draft tag, the grips), which no longer sits under the signs in Tables; a single herb picked alone shows "A single herb has no formula to compare"; Copy is unchanged (it still copies the signs and the herbs). **Guide > Tour Cases** (her 2026-11-10 "i want the case table to be same as compare tables - in terms of rows. help me with the correlation, tehres too many to do manually"): the case table has the same fifteen rows as Compare > Cases, drawn by the same functions (`phCmpCaseParts`, `phCmpCaseRowsHtml`) from a source built by `phTcSrc(c)`: its correlated symptoms are the signs (a number on a fill, Ren and Bing on one line in a group row), its conditions the Bing · diagnosis row (free text as recorded), the matched formula family (`c.fam`) the animation and the Inventory row (her own recipe in grams; "Not matched yet" without a family), and the Book / lecture row the recipe Dr Huang Huang gave, as recorded and in grams, with the family's classical recipe under it; the animation row has its own toggle (`data-tc-anim`, `phGdTcAnim`). **Correlation help:** 124 of the 152 Day 1 observations carry a pre-filled match to a catalog sign (`PH_TC_MATCH`, "observation | the catalog's label | r or b", read against the catalog by hand; r = the person's look, tongue, pulse, belly, complexion; b = what the patient reports or the disease); a row with a match shows the sign, its side, **Accept** and **Change** (the Correlate card opens with the sign and side filled in), and the heading carries **Accept all N** for that case; Accept saves the Correlate card at its default weight 3 (`phTcAccept`). Nothing scores until she accepts, and each can be unlinked after. The 28 with no sign in the catalog (a lab value, a diagnosis, "bad breath") keep their Correlate button. A new observation has no match until a line is added to `PH_TC_MATCH`. **Ren row and notes** (her 2026-11-10, relayed): the Ren summary row skips any sign that has its own row (Tongue, Pulse, Abdominal, Sleep, Mood, Energy, Family history, Medical findings), so Pulse and Abdominal are not said twice; when a match is accepted, her recorded words stay with the sign as an italic note under its wording (`phTcNote`, `small.zt`; e.g. "Nocturia 4-5x a night" under Urine: at Night), shown in the case table line and in the linked Correlate row, and only when they say more than the sign's own wording (the symptom's text is never overwritten). Same in Compare > Cases (`phCmpCaseBox`). **Books / seminars / tours grid** (her 2026-11-10 "on the left, make a column for all the books/seminars/tours i can organise cases to, and top row is the case numbers", "also allow for multiple case view e.g. cases are side by side. name the cases C#1 - Chief Complaint or formula, sometimes i want to filter based on condition or formula", "give an option to toggle filter by complaint/formula"): Guide > Tour Cases opens on a grid, places down the left (Tours, Seminars, Books, A-Z, each with its count and a + Add row; `PHARMACY.tourSources` = `{id, kind, name, cases:[n]}`, seeded with the Nanjing Study Tour Day 1 holding all 15, which cannot be removed; a place she added has a 32px x and a confirm), case numbers across (C#1 ... C#15). A circle = the case is in that place (`data-tc-mem`, saved); a tap on a case number puts that case on show (`data-tc-toggle`): one = the single card, two or more = ONE column a case in the Compare > Cases rows (`phTcTableHtml`); a tap on a place's name keeps only its cases (`phGdTcSrcF`); the bottom row counts the places each case is in. The **By** bar (`phGdTcBy`) = Complaint | Formula: it names the cases (C#2 · L epididymitis, or C#2 · Da Cheng Qi Tang) and picks the filter list, a ticked A-Z dropdown (`phTcBarHtml`; the picks stay as chips; `Clear`; `Side by side . all N` puts every case in view on show). A case's complaint is `PH_TC_CC` (keyed by n, her wording), its formulas are read from the recorded formula text (`phTcFms`: brackets dropped, split on + and ", later"; "Not recorded" = none). Correlate and Integrate below follow the focus case, chosen by the C# chips above them when more than one is on show. The old one-line intro under the tab name is gone (terse). **Correlate and Integrate are tables** (her 2026-11-10 synth22, relayed: "improve this display, organise into table format"): Correlate = Observation | Sign | Side | Weight | In <family> | actions, a row a sign (the observation's cell spans its signs and carries its own **+ Sign**), pre-filled matches in faint with **Accept** / **Change**, an unmatched line with **Correlate** and **To diagnosis**; Integrate = tick | Sign | Side | Weight | Change, with **Apply** under it. **One line, more than one sign** (her "dry mouth and bitter taste" into both Mouth & Throat: Dry Mouth and Bitter Taste): a symptom's own sign / side / w is its first link and `s.more` = `[{sign, side, w, newsign}]` holds the rest (`phTcLinks(s)` lists them; the Cases rows, Integrate and Apply read every link); a compound observation carries several pre-filled matches in `PH_TC_MATCH` (a line a sign, `phTcMatchAll`), and Accept links them all; **+ Sign** adds another by hand; unlinking the first promotes the next; the raw wording note stays with the first sign. **To diagnosis** (her "Prostate hyperplasia"): the line goes into the case's own conditions `c.cond` (the Bing · diagnosis row) unless they already hold it, is marked `s.dx` and leaves the Correlate count; the undo takes out only what it added (`s.dxAdded`). **The Guide tab is named Cases** (her 2026-11-10 "change tour cases to cases"; the data and ids stay `tourcases`). **A case over time** (her 2026-11-10 "build 4": a real case can have more than one treatment-session note; compile them as the same rows with the dates across): a case's own record is its first column (C#n · Day 1); **+ Add a session** (`c.sessions[]` = `{id, date, label, note, symptoms[], cond[], recipe[[name, dose]], formula}`) adds a dated column; with one case on show and any session or note the table is `phTcProgressHtml`: the same rows as Compare > Cases, a column a session (Day 1 first, then by date), the animation and the family's inventory recipe in Day 1 only, the prescription row reading "Lecture / visit" (Day 1 = Dr Huang's recipe, a session = her own, in grams), and a Notes row; a cell that differs from the column before is marked (gold tint + dot, `td.chg`). The session chips (Day 1, then a date a chip) under the table pick the session Correlate and Integrate work on (`phGdTcSess`; `phTcFind(id)` reads a case or a session as a case, `phTcView` sharing its symptom objects) and open its fields (date, label, formula, prescription a line a herb with its grams, note, and Add observations, one a line); Save writes them; Remove session asks first. An observation typed in a session that is the catalog's own wording for one sign ("Hard to fall asleep") gets that sign pre-filled (`phTcDescMatch`, only an exact, unambiguous wording); Accept saves it as ever. A sign applied from a session cites `own · Case n, session <date>` as its source. **Photos of the treatment notes** (her 2026-11-10 "build 5": paste or upload photos of treatment notes onto a case or session, for record-keeping only): the open session's panel (and a case's Day 1 panel) has a Photos box (paste, drop, or Choose a file; several at once; each compressed to 1600 px) with a thumbnail a photo (a tap opens it full size, Escape or a tap closes it) and a x on each; a **Photos row** under Notes in the progress table shows each column's thumbnails. Nothing is read from a photo. The photos live in their own IndexedDB on THIS device (`lcm-case-note-photos`, `phTcPh*`), apart from the patient photo store: they never reach the Photos page, the phone relay, sync or the file backup. A x asks first and only hides the photo (`gone = true`) with an Undo; a photo is never deleted. **My patients** (her 2026-11-10 "build 6"): a "Cases | My patients" switch at the top of the tab; My patients lists her own patient studies (`PHARMACY.patientCases[]` = `{id, pn, patientKey, name, fam, cond[], sessions[]}`, the same shape as a case, so Correlate, Integrate, visit panels and photos work unchanged). Add takes a name from the patient list (`phDirBuild`); `phPtCompile` reads the visits FROM her record, never copying them elsewhere: a visit per date of her acupuncture sessions and dispenses, with the formula and herbs (in grams) from the dispense log and the Tongue / Abdomen / Pulse she recorded at the visit (`phVisitFndReportLines`) as the observations; the patient's main complaint seeds the study's diagnosis. **Update from her record** adds new visits and new lines only (merged by the visit's date, `rdate`), never overwriting what she linked or typed. The table has a column a visit (no Day 1 column), nothing scored until she Accepts. Names show as **initials** (T.P.) by default with an Initials | Full name switch (view state, `phGdPtFull`); a sign applied from a visit cites `own · Patient P#n, visit <date>`, never a name. Remove (x) asks first and leaves her record untouched; a removed visit comes back on the next Update. It adds no data and writes no weight; the sign, herb and overlap tables are unchanged under Tables, except **Both**: **Tables > Both is one table with each formula's cell split** (her 2026-11-09 "make the same split fill in the Compare tab", her pick "Split each formula's cell"): `phCmpSignRows("rb")` merges a Ren row and a Bing row of the same sign by its label (`w` = the stronger of the two, which the All / Key / Shared / Tells / Unique filters, the counts and the overlap bar read; `wr` / `wb` = each side's own), `phCmpSignsTableHtml("rb", cols)` draws `td.sp > .sp2` = two halves with a 2px gap, left Ren and right Bing, each with its dots and filled left to right by its own rank / 5 (`--w`, 5 = the whole half, 4 = 80%) in the formula's `--deep`, 30% for Ren and 46% for Bing (a step deeper, as in the Guide table); a missing half shows a dash, an against (minus) half has red dots and no fill, a formula with neither side keeps the faint ghost dots; the sign-name column stays plain. **Edit keeps the two separate tables** (a change needs one side's own sign key), and Ren and Bing alone are unchanged; Copy still copies both tables. Lists A–Z through `phAz`: the Family dropdown, the Add list (starts-with first), the signs inside a category.
**A sign's picture (her 4 picks 2026-11-02, BUILD-NOTES "Compare: sign pictures on hover"):** pointing at a sign's name shows its key-sign picture beside the row (the name cell carries `data-ks-pop` when `phKsHas`, the Compass's one popover `#phKsPop`); a tap on the name, the only way on a phone, opens the big ‹ › sheet through that table's signs that have a picture, in table order (`phCmpPicOpen`, items `{k:"kg", g}` read by `phPxKsGroup`); every sign with a picture, a sign without one shows nothing; no thumbnails, no panel. Code: `phCmp*` before `renderPhGuidePage`; CSS blocks "Guide · Compare" and "Guide · Compare, the same and the different" after the `.gf-cmpb` rules.
**Key sign pictures (her picks):** every sign a family weighs 4 or 5 has ONE picture (`phKsDesc` / `phKsSvgHtml`; a Bing sign and
its Ren twin share it): hand-drawn for Gui Zhi's Key signs and the throat signs (`PH_KS_SC`), else her Tongue / Abdomen chart, the wrist with her pulse
lines, its body place's close-up (`PH_FBBP`) or the body figure, moving by its words (`phKsVerb`). The Guide card plays them inside its story (Guide — Families), with tiles under the lens. The Fang Bing Ren
board shows none (her 2026-11-09 "too laggy. remove the animation hover"; BUILD-NOTES "Fang Bing Ren board: no hover motion"); Compass sign rows and Ask her answers carry a small still one (none on a
phone). One picture moves at a time; all still under reduced motion. Hand-drawn so far: Gui Zhi's Key signs, the throat signs, and the Da Huang person's (her 2026-11-05 "improve the animations for da huang type": a body that runs hot, the stuck bowel, a fingertip pressing on her Abdomen chart, the hungry stomach, the dry mouth, phlegm in the windpipe, dizziness and headache on the one face, the chest that cannot fill, the thick dry coat: `phK2Hot`, `phK2Bowel`, `phK2MouthDry`, `phK2Phlegm`, `phK2Dizzy`, `phK2Headache`, `phK2Chest`, `PH_K2_STOM.hungry`, `d.press`); each is that sign's one picture on every card and page, and tells its sign inside a film shot's 3 s (review fixes LIVE in build 20261105-170300: the dry yellow coat cracks, dry throat keeps its lit throat, thick yellow phlegm is not drawn clear, the lobes fill to the line; BUILD-NOTES "fixes from a review"); and the Fu Zi family's (her 2026-11-05 "improve animations for fu zi", then "make it more dramatic and medically accurate"; LIVE in build 20261105-185500, labels DRAFT; BUILD-NOTES "Guide: the Fu Zi pictures"): `PH_KS_SC.coldlimbs`, `coldlegs`, `chills`, `coldpain`, `backknee` + `kneeweak`, `cramp`, `debility`, `heavy`, `edema`, `waterystool`, `liecurl`, `listless`, with their helpers `phFz*` just above the runner. What they keep to: a scene is drawn on her own figure (a window from `phFzCrop` / `phFzSide`) or her plate, never a new person; the curled figure is her side figure's own outline bent at its joints (`phFzCurl`; `PH_BODY_GEOM.SIDE_DET` is exposed for its face and detail lines); a path is measured once at setup (`phFzAlong`), never in paint; the medicine the four readers corrected stays: trunk arteries stay red and open to the wrist and ankle (only the hand's and foot's small arteries clamp), cold skin is pale and only the tips dusky, lymph runs faster in pitting swelling, a pain signal runs up the limb, a tendon does not stretch, a nerve volley arrives whole or not at all, the hair leans toward its muscle. "Desire to lie down and curl up" and "listless, dispirited" had no picture and now play in the films; the film looks for "listless" in the head (`PH_FS_PLOF`); a person's film ends on one pulse and one tongue when the person has both. Labels DRAFT [Key sign
pictures].
**Herbs (how a herb is used; her 2026-11-02 picks: both, all three places, a table):** a list of her herbs and the herbs the classics hold
(A–Z · Most · Fewest formulas, her pick kept on this device, ties A–Z, a herb only the books hold last: `phGdHerbOrder`; beside each, how many of HER formula recipes hold it, the Hide chips applied, 0 included, no number on a herb only the books hold: `phGdHerbCounts`, her 2026-11-05 "counting from my inventory and formulas, not classics") and the picked herb's card beside it (`phGdHerbsHtml`,
`phGdHerbPick` updates in place). The card (`phHuCardHtml`, one card for all three places) is **In your prescriptions** (times used,
usual grams, most-often partners and her recipes, worked out from `PRESC.items` when drawn, never stored: `phHuOwn`) over **In the
classics** (Formula · Dose · With · Does; 52 formulas in `PH_HU_SRC`, marked Draft until she checks them; the book's "Shao Yao"
counts for Bai Shao and Chi Shao); hers first since her 2026-11-02 "move the classics after my formulas". The same card is the herb drawer's "How it's used" and the Dispense herb table's book circle.
On a phone the Does column folds under the formula's name [How a herb is used]. In Guide › Herbs only, a Hide bar above Your formula (her 2026-11-05 words): No longer stocked = Phase out or no jar in the inventory; Temporarily stopping = a stopped jar; each with its count, a mark on every affected row, off until she picks, kept on the device (`lcm-gd-herb-hide`); Dispense and the Inventory drawer list them all [Guide: hide formulas no longer stocked].

## Guide — Iron (a teaching page)
The Iron tab (her 2026-11-03 picks, BUILD-NOTES "Iron teaching page"; mock 8SRMuRk79NJ2zFiqBFDyuu) is a page to show a patient.
It runs in three steps on one light band of white boxes (the Fast block's shared band rule).

**1 How much:** two figures, 18 mg a day and 27 pregnant, as drops (1 drop = 1 mg). What one serve gives is ranked by
`PH_FOOD`'s own iron × each row's usual serve. A tap on a woman opens step 2 for her. Both women are the Meals body, still (her
"yes", BUILD-NOTES "Iron steps 1 and 3 on the same body"): pale and grey at first, colour and blood fill in once; the pregnant one
has the womb with the baby. Try it sits top right, off her head.

**2 Fill up your iron:** the Meals body (her "one body" pick, BUILD-NOTES "One body, more real") takes the iron in: a food goes
down, what she takes up travels gut → liver → heart into her blood (the vessels thicken and run red, red cells in them), past her
need into the liver's store; she is pale while it is low. Against 3.2 mg a day (6.8 pregnant); the count says taken up, then eaten.
Your table is Food · Serve · Eaten · Taken up, each food's % beside it.
- Pregnant swaps in the womb with the baby on the same body.
- Foods are A to Z in six groups.
- Taken up (DRAFT; her 2026-11-03 picks, BUILD-NOTES "Iron page: what the body takes up"): meat and fish 25%; plants, eggs and grains
  10% alone, 20% with a Vitamin C food, 2% with Tea or coffee.
- The drops under her are the mg eaten (18 / 27, as in step 1); a gold ring plays when full.

**3 When it runs low:** Enough vs Low, with the red cells under a microscope. Fertility or Pregnancy, five steps played once,
then tapped; a Draft tag until she reads the words. Both are the Meals body: on first sight Low drains (blood thins and pales, she
pales, the ovaries, brain and muscles shrink and grey); each step glows its place and a ring pulses there (the womb for the baby's
steps).
Under the pair, **Oxygen to energy** (her 2026-11-03 picks, BUILD-NOTES "Iron step 3: oxygen to energy"): three lenses, her ovary
(her thigh muscle on Pregnancy) → in her blood → in her egg (a muscle cell on Pregnancy). Red cells carry oxygen to the mitochondria,
each with an iron drop in it, which make the energy in the gold bar. Enough iron | Low iron; it rests on Low. On first sight it waits,
dimmed, while the chain plays, then lights lens by lens with enough iron and drops to Low. Words DRAFT. Code: `phIrOzHtml`, `phIrOzSet`.
Its key ends in **Eggs ›**, a door to the Eggs tab.
LIVE build 20261103-233500.

State is `phIr` (view state, never saved).

**Doors:**
- The tab.
- **Iron · Guide** on a patient's Blood tests band.
- **Iron · Guide** on her cycle day card's Period head on a heavy day.
- Both patient doors fill it in from her record: pregnant → 27 mg and the Pregnancy steps. A strip shows her latest ferritin with its
  band and her heavy-flow days in 12 months; × shows it plain. The patient stays open behind.
- Iron · Guide under the Meals day bars opens it plain.

The figure is `PH_BODY_GEOM` with the sketch face and `phRenAnatomyHtml`'s organs; the pregnant womb carries PH_PP's baby
(`phIrBabySvg`). Its foods include beef liver, mussels, oysters and black sesame, added to the food list for it [Iron teaching page].

## Guide — Eggs (a teaching page; LIVE, its dark stage since build 20261105-131600)
The Eggs tab (her 2026-11-03 ask with her chart of mitochondria per cell, her 8 picks + 3 on mock QVR4nKWeydZGUQuswXRuY2, BUILD-NOTES
"Eggs teaching page") shows a patient how oxygen, red cells and the uterus feed egg quality. It stands on the Iron page's band and parts
(`.ph-ir`): one scene at a time, the picture left, its numbered lines right (scene 1: the stage full width, its lines under it), a Draft tag, the source line under the band.
1. **Mitochondria:** six cells on one dark stage (her 2026-11-05 "i like 1 visual design contrast and want to see it all together to see comparison"; 3 by 2, 2 by 3 on a phone), its two lines under it. Each cell is drawn as itself: sperm (midpiece spiral, tail off the picture), average cell, liver cell among its neighbours, heart muscle cell (stepped ends, rows between the fibres), egg (its shell), brain cell of the substantia nigra (dark pigment, long axon, huge arbour). About 19 s: each fills in turn with one gold mark per mitochondrion and stays lit; the egg's moment dims the others, never hides them, with line 2 lit; it rests with all six full. **A tap on one cell plays it alone** (her 2026-11-05 "give option to click on one to play animation"; a small play mark in each field's corner): the others stay full and dim, it fills again with its number and bar, then it rests with its field outlined and the page stays on this scene. Under each field its name, number and a bar on a ×10 scale, solid to the low figure, pale to the high: sperm 50–75, average cell about 100 (her chart; He 2010 reports 50 to hundreds for typical human cells), liver cell 1,000–2,000, heart muscle cell about 5,000, egg 100,000–600,000, brain cell about 2 million (her 2026-11-05 word and her chart's small print; calculated in Misgeld 2017, not counted). Her chart's sperm 5 was not used: it is too low. The key: One gold mark is one mitochondrion · Cells not to the same scale · Bars: ×10 a step.
   A live canvas with its own clock (`phEgCellsMount`; the drawings in `phEgKit`, worked out on first sight), which holds while under 45% of the stage is in view. At rest, on a stop, in print and under reduced motion it is the finished stage. On a short window the fields flatten, to 2.2:1 at most, so all six stay in view (`--eg-above`, less on eggs.html, which has no app head).
2. **Why eggs:** Ripening (the egg fills with mitochondria), Ovulation (it leaves in its cloud of cells, every mitochondrion with it; no
   chromosome split or polar body, her 2026-11-04 "not relevant to the patient"), First week (the embryo divides and shares them out; the
   sperm's are not kept).
3. **Oxygen:** her ovary (the Iron page's still body, cropped) → a follicle: vessels around it, red cells on them, oxygen seeping
   through the fluid to the egg on its mound. Less blood flow | More blood flow (2 vessels or 6; the egg's mitochondria pale or lit).
4. **Red cells:** iron, B12, folate and Herbs go into the bone marrow; red cells come out along a vessel with oxygen on them. Low Blood |
   Blood built. **Iron foods ›** opens the Iron tab.
5. **Uterus:** her uterus (a needle on the skin over it) → its lining over the muscle: spiral arteries, the lining's depth, warmth
   (a gold wash) and an embryo settling. Less blood flow | More blood flow.
6. **3 months:** a 90-day bar from Today; a follicle grows along it to ovulation; Herbs · acupuncture · food · iron spans it.
On first sight the six play once in order (each scene's beats light its lines), then it rests on the last; a tab or ▸ Play again plays
again; any tap stops the play and the scene rests at once. Reduced motion: no play. **Print** draws the six at rest (no buttons) for
paper or a PDF. **Copy link** copies `https://b00k33.github.io/lcm-pharmacy/eggs.html`, the patient's copy (her pick "also a link she
opens"): `eggs.html`, made from this same code by `.github/scripts/make-eggs-page.pl`; no Draft tags, no Copy link, no Iron door;
noindex. State is `phEg` (view state, never saved). Words DRAFT. Code: "EGGS" (`phEgHtml`, `phEgRun`, `phEgSt`, `phEgAuto`, `phEgCellsMount`).

**The film "Ninety Days" (her 2026-11-04 picks; BUILD-NOTES "Ninety Days"):** a strip above the scenes, in the tab and on eggs.html: its
picture, the title, "The film · 1:53", **▸ Play film**. Nothing downloads before the tap. Play stops the scenes and opens the player, `ninety-days-wide.mp4`
(39 MB) on any screen (her 2026-11-05 "Remove the tall copy": she does not show videos on her phone; her copy of the tall one is in `refs/films/`); Close stops the download and brings the strip back. A redraw leaves it paused where it
was (`phEg.film`). With no internet the strip reads "The film needs the internet". `sw.js` never stores the .mp4 (every app on this origin shares one
quota); `ninety-days-poster.jpg` is stored as usual. Its words are fixed inside the video: a change means recording it again (BUILD-NOTES says how).
Code: `phEgFilmHtml`, `phEgFilmDraw`.

**Doors:** the tab; **Eggs ›** at the end of Iron step 3's zoom key; **Eggs · Guide** on the cycle day card's Between periods head,
every day (her pick).

## Guide — Eating eggs (a teaching page; LIVE in build 20261105-175200)
Her word 2026-11-04, adding 2 eggs to a lunch on Meals: "make an animation for how eggs choline and protein enriches the body"; her 8 picks; mock `mocks/eating-eggs-mock-2026-11-04.html`; BUILD-NOTES "Guide › Eating eggs"; code "EATING EGGS", `phEe*`, `PH_EE_*`, `.ph-ee`, `.ee-*`. Eggs the food; egg cells are Guide › Eggs. Stands on the Iron page's band, boxes and source line and on the Meals body (`phMbdSvg`, `phMbdLook`, the routes, the Short | Enough line). **The screen:** the body left, a close-up beside it, a thin line joining the place to its close-up. **The play** (Eat, and on first sight; 28.7 s): egg → stomach → small bowel → liver → brain → muscles → baby: choline first, then protein, then both to the baby. Each stop alone from the stop bar. **After it:** the line opens Short | Enough (the baby: Some | Plenty), the rings say what these eggs cover (two eggs, pregnant: 67% of choline, 21% of protein). **Bars:** Eggs 1 · 2 · 3, Body | TCM (the Meals body's own, `lcm-mbd-view`), Not pregnant | Pregnant (the app opens on Pregnant, no womb and the Meals goals when not), Copy link. TCM for choline is Jing → Marrow → Brain (her call). Numbers: `PH_FOOD.egg`, 440 mg and 60 g in pregnancy, the source line under the box says which were not re-read. Words DRAFT, the Draft tag stays until she reads them. Nothing saved but Body | TCM. Off under reduced motion (the end looks only). **The door:** one chip under the eggs' amount on Meals' Try table (`data-ee-open`, `phEeOpen`), which opens the tab and plays; Grid's side panel has none. **The link:** `eating-eggs.html`, MADE by `.github/scripts/make-eating-eggs-page.pl` (no patient data, no sign-in, nothing saved, noindex; no Draft tag, no Copy link; opens on Not pregnant, so a pregnant body is never a fertility patient's first sight). `phMbdTick` ends when the figure is this page's: it runs its own loop.

## Photos
**The patient's Photos page** opens on the Comparison table (a row per type, a date column each, **oldest left, newest right**; **All dates | Pair** above it once there are two dates: the Pair's two heads are the pickers, BEFORE ▾ ⇄ AFTER ▾, opening on first ↔ latest, ⇄ swaps, remembered for the session only, `phRenGalPairOf`; a phone opens on the Pair, two columns fitting the screen; her 2026-11-02 picks, BUILD-NOTES "Photos increment 2"); By visit / By type a tap away; the page's chips are the standard 32px chips, the shot row one joined bar; **with no photo on file it opens on its first action** (her 2026-10-31 pick, idea 4 of the 29 Oct audit): the camera tile (the phone’s own sheet, the computer’s chooser; then a kind per photo, the drop flow) beside the drop zone, the kinds under them, no Add tap and no "Or pick the type first" line; with photos the same block sits behind + Add (`presPhotosSectionInnerHtml`, `.ph-photos-first`, `.ph-photos-cam`); a phone shows the tile alone;
each tile has one-tap type / shot chips and a date button. **Records → Photos** (whole clinic): By date, or By type with each tongue shot its own group (Tongue · Natural light …, Tongue · unsorted for a photo with no shot yet; the Comparison table's rows, `phRenRowKeyOf`) and the same date chip on every tile (`phRenDateMove`: the tile or the day group repaints with the scroll kept); label with one tap or a key; it
rings the next unlabelled photo (a tap never moves the page: it rings one already on screen or none; only the keys scroll to it);
Select + one label for many. Tongue shots rank natural → unlabelled → side → sublingual → flash (`PH_TONGUE_SHOT_RANK`). The
Tongue page: today's photo beside the last (the Sublingual tab flips the pair), the Flash pair under them in the same column, past
photos at the bottom. **Healthy tongue (her picks 2026-11-03; LIVE build 20261104-111100):** a small tongue icon in Today's head (Sublingual
too) opens the clinic's healthy tongue photo beside today's (Healthy | Today, in place of Last; ✕ or the icon closes it); Upper ·
Middle · Lower · Sides drawn over it, a tap lists that place's Guide notes under the pair, each a Guide › door. She adds it there
("Add healthy photo", "✎ Change"); it is kept small in the clinic's synced data (`PHARMACY.healthyTongue`, one per login), never the
patient photo store. The places are fitted to the photo she supplied 2026-11-04 (`refs/healthy-tongue-2026-11-04.png`, private): Lower starts below the lip and the mouth. The Guide's Tongue map draws the same column (`phTngCmpHtml`). Code: `phTngHealthyTile`, `phTngHealthy` (view
state, not saved). BUILD-NOTES "Healthy tongue photo". A face / build photo full screen carries Find the Ren's own rows (Face · Eyes · Lips / Build · Skin ·
Muscles) and its spots as corners (her pick). Compare and the viewer are ONE mechanism each, wired into every surface that shows a
photo tile. The viewer's dark title bar carries the photo's Kind (a dropdown grouped Tongue · Face · Body · Records, then Unsorted ·
Other), the tongue Shot bar (short words on the phone) or a Face photo's view bar (below), and a Date field that saves on pick (her
2026-10-29 pick B); a not-yet-sorted photo keeps a wrapping row of kind chips under
the picture. A waiting compare pick rings its photo green and marks the photos it can pair with ⧉ (the tongue rows are one group;
`phRenCmpCls`); a tap on any other photo opens that photo and drops the pick (her 2026-10-29 "i cant click on pic to edit"). The photo sheet's Date field (today by default, never later) dates every photo saved from it. **Never delete a photo**
(her hard rule); the store asks the browser to keep it (`phStoragePersist`); backups carry photos, each with its date, shot,
profile mark and file name (`PH_REN_BACKUP_FIELDS`; a restore keeps what an older file lacks; built 2026-10-29, NOT live yet).
**Tongue photo flow (her picks; built, NOT live yet)** [Tongue photo flow: the shots open the chart]: the phone is the camera, the
laptop charts. While a patient's file is open the laptop looks for phone photos every 10 s (every 2 min elsewhere). Today's tongue
photos landing on any other page give the one toast "4 tongue photos · <name>" with **Chart** (6.5 s); with her Today's visit or
Tongue page on screen there is no toast and the Tongue tile flashes gold. The Today's visit **Tongue tile** carries today's Natural
light shot: gold "4 photos / Chart" until charted, then the photo with its tick + the words. Chart and the tile open that photo in
the viewer, Colour ready (a Sublingual shot on Sublingual), her Today's visit behind it; closing it repaints the tile. Code:
`phTngChartOpen`, `phTngTodayShot`, `phTngHerePk`, `phTvTngArrived` beside `phCapAutoImport`; `phTngTileShot` in the tiles.
**Face photos for Ren and facial palsy (her 10 picks 2026-10-29, "Combined"; mock `mocks/face-photos-mock-2026-10-29.html`; LIVE
2026-10-29, build 20261029-174800).** Every list of kinds is grouped in one order, Tongue first: `PH_REN_PHOTO_TYPES` (`grp`) + `PH_REN_KIND_HEADS`;
dropdowns through `phRenKindOptsHtml` (the viewer, Records → Photos' filter, the batch confirm), the Photos "+ Add" row through
`phRenTypeGroupedHtml`, and the Comparison table puts a heading row between groups. **Face views:** a plain Face photo is the Rest
view; the facial-palsy movements are its other views, Rest · Brows · Frown · Eyes · Smile · Cheeks · Whistle (`PH_REN_FACE_VIEWS`;
the view IS the stored kind, `fpWhistle` new). The viewer shows such a photo as Face ▾ plus a joined view bar that files it as that
view (`data-ren-view-face`); the movements are never their own options. The bar shows on a facial (Neurological) case or where such
a photo already exists (`phRenFaceViewsFor` over `phRenTypesFor`); everyone else sees Face only. In the Comparison table the Face row
reads Rest once movement rows exist. Find the Ren reads the newest Rest (`PH_FBB_PHOTO_TYPES.face`), never a movement. **The facial
score** (Profile → Checklist, `presFacialOpenHtml`): each movement with a photo (`PH_FP_MOVES[].photo`; Lips pressed has none) shows
its last photo before today | today's; today's empty spot is the pose in pencil (`phFpPoseSvg`) and takes that view on a tap; a photo
opens the viewer, which walks that view by date. **Today's set** (the Movement head) is one sheet (`phFpSetOpen` / `phFpSetPaint`):
the seven views as a joined bar (4 + 3 on a phone, a taken view green), the pose or today's photo, Skip · Take photo · Done; a photo
moves it on to the next view still to take, the last one closes it. Its photos go straight in (`via: "faceset"` → `phFpShotSave` →
`phRenCaptureSave` quiet, one reload, the one toast); `phRenLoadPhotosFor` repaints the pairs and the sheet (`phFpPhotosRefresh`).

**Progress letter (her 8 picks 2026-10-29; mock `mocks/progress-letter-mock-2026-10-29.html`; LIVE 2026-10-29, build 20261029-201300).** For a face
palsy patient: the Photos band's **Progress letter** chip (beside Compare first ↔ latest; shown when a movement has photos on two
dates, `phPrgPairs`) opens one page in the gallery's place (`phPrgOpenPk`, `phPrgViewHtml`; ← Back to photos): opening words
written from the first and latest facial scores (what came back fully, what is on the way; editable, `phPrgWords`), each movement's
first photo beside its latest, the score as one bar then each movement None / Partial / Normal, What's next (the Care Plan's stage
bar and GP lines from `phTpCplModel`, the next booking, the next re-check from `phFpDue`), **Home care** (her own words, one text for
every palsy patient, `PHARMACY.prgHomeCare`, synced), sign-off. **Copy for email** pastes it with the photos (480 px JPEGs made when
the letter opens, `phPrgJpegs`; inline styles, `phPrgMailHtml`; plain text beside it, `phPrgText`); **Print** is the same page
(`phPrintDoc`). The course is a live facial plan's (else the plan today's visit uses, `phPrgPlan`).
**Its wording (her picks 2026-10-29; LIVE 2026-10-29, build 20261029-204500):** Settings › Letter templates has a **📷 Progress letter** chip after the
herbal letters (`PH_PRG_TMPL`, never in `phLtrAllTemplates`): Letter title, Opening words, the four headings and Home care, stored in
`PHARMACY.ltrOverrides.progress` with the editor's own Undo / ↺ Default / Reset. Fill-ins {first} {since} {back} {onway} {plan}
(`phPrgFill`; an empty one leaves no gap). The built-in opening keeps its own line for a face with nothing back yet; her own wording
is used as written. Home care's gold box and the Settings row are one text (the first build's `PHARMACY.prgHomeCare` moves in when
read, `phPrgHome`). The letter's **✎ Template** button opens that page on the Progress letter.

## Fasting (her own clock)
C22's fasting clock lives in LCM, only for her. Her plan: "breakfast and lunch, and fast after lunch by skipping dinner ... 3-5
times a week". Data in her Me row (`d.fasts`, entry by entry; no `e` = running; `fastGoal`), so both logins show it. C22's fasts
come in once (Bring in). No cheer lines, no cycle advice.
- **On Meals**: the goals panel's **Fast block** (FAST BLOCK, 2026-11-03: the dial, of Breakfast ▾, Start · Continue / Stop beside
  it, **History ›** on its heading; the old clock bar is gone, see Meals goals). The Fasting step is off her rail (grp `off`); History ›
  opens it (Your fasts) under a ‹ Meals chip (ring, goal bar, Start · Continue / Stop + Undo, the same words and helper,
  `phFastBtnsHtml`; tiles, last 14 / 30 / 90 days by cycle phase, history). Every Fasting door (band chip, Me drawer line)
  opens Meals; Appointments also has a toolbar chip (computer only); its top bar holds Add appointments alone (her 2026-11-02 pick).
- **Goal** 14 · 16 · 18 h · **Breakfast** · Other ▾ (Breakfast = her next Breakfast event at least 2 h on, `fastTo` beside
  `fastGoal`; none = the hours). **Aim**: 3–5 a week (two fields) + her planned days as a Mon–Sun bar (`fastAim = {lo, hi, wd, up}`);
  a fast on any day counts. A night's planned fast: Dinner → Fast this night, Just <day> | Every <day> (`fp` 1 / 0 on that day's
  `|d` meal; otherwise the Aim days, `phMplFastPl`).
- **Start / end**: Had it on today's Lunch with no fast running puts **Start fast** in the toast beside Undo (from that moment); Had
  it on today's Breakfast ends a running fast (Undo or unticking sets it running again). **Both ways** (her pick 2026-10-29, the Me
  audit): Stop ticks the first meal planned today and not had yet (her Breakfast) at that moment; Start ticks the last meal planned
  today whose time has come (her Lunch; a Dinner the fast covers never counts; a Start from the Lunch toast ticks nothing). The
  toast says which meal; its Undo puts the meal back too (`phFastMealOf`, `phMealHadMark`, one save).
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
- **Elsewhere**: Me drawer Herbs (a tick per dose today); each dose a leaf mark at its time on the day's right edge (`phHbMarkHtml`, a
  20px circle that takes no lane, her 2026-11-02 pick; filled green once taken; today's tap = taken with Undo, another day's opens
  its card; untimed folds above the day); the Herbs page opens from the Me drawer (it left the Appointments top bar 2026-11-02). Due = a gold glow
  until ticked; a late tick counts any time that day; a fasting day keeps them. Code: "HERBS · HER OWN DOSES" (`phHb*`).
- **A dose rides on the meal before it** (her pick 2026-10-29, the Me audit; `phHbMealOf`): the last meal planned at or before the
  dose's time (8:00 → Breakfast, 16:00 → Lunch; a dose before the first meal rides on that meal; untimed = none). That meal's card
  lists it with the same tick (`phMealHbHtml`, today only); the meal's Had it ticks it in the same save (the toast adds "· dose
  taken", its Undo and the card's own Undo put the dose back). This week's Herbs column folds until a dose is taken.

## Meals + the Diet log
C22's meal prep lives in LCM. Her Breakfast / Lunch / Dinner event (`phMealSlot` reads the title) holds its meal: the foods that repeat
that day and that day's own (MEAL REPEATS below); prep ticks per dish (`preps`); ingredients (a tap = Shopping); one **Had it** for the whole meal (keeps the list;
the grid's ✓ IS Had it: band pill, fold chip, card; Undo). A meal she had is edited as what she had (her 2026-10-28 "why cant i edit
the spicy salmon fishbowl"): its picker and her card list `had.v` (`phMealList` → `phMealHadPut`), with no day line, and her plan
stays as it was; C22's numbers (`had.nut`) cover its own words, a food or dish added to it counts its own, and they go with the
last of its own words. The meal shows under the event; the calendar reads "first + count", food
first. A meal value is one item or a list (`phMealVs` / `phMealV`). A dish can be a **Drink** (Dish | Drink on its editor); a
dish's name in the meal opens the dish. "Something else" is gone. Data in her Me row, entry by entry (`d.dishes` = "My dishes",
nature warm · neutral · cool + nutrients per serve; `d.meals`; `d.shop`). Me drawer: Today's meals (a tick per meal, water in ml, +250 ml),
Shopping.
**A meal's list** (her pick 2026-10-27, "too busy"; it replaced the Food / Drinks sections, + Food / + Drink, Eating out and Skipped
under Food, and Had it | Edit; BUILD-NOTES "A calmer meal"): every meal list (her card, the planner's picker, her usual meal, a patient's Diet sheet) =
the line ON TOP (hers): **↻ Repeat meal ▾** (every food in it at once) and, once that day has changes of its own, **↺ Undo**
(back to what repeats) · the meal as a small table (name + its mark, a cup on a drink · − amount + (the amount a field she types
into, its unit after it: MEAL AMOUNTS) · kJ in the planner · ✕; on
HER day's meal each food has its **repeat chip** on a line under it, see MEAL REPEATS) · **+ Add food or drink** opens the list UNDER the meal (search or type + New; one bar
Everyday | Drinks | **Menus ▾** | My dishes, the place picked showing on it ("Hungry Jack's ▾"; the bar keeps every word whole and
scrolls in itself where it is too wide, a phone's sheet); Menus' list: McDonald's, Hungry Jack's, KFC, Oporto, El Jannah, Chagee, Stockman Steaks,
Thisbowl (`PH_FOOD_MENUS`, `phMealTabsHtml`); Chinese and Vietnamese are kitchens, listed under All foods like Grains (her pick
2026-11-02, `phFoodPlace`; still off the shopping list, still found by the word); a menu's rows are drawn when its pane opens or a search starts
(`phMealMenuFill`, never on every paint); a row a food with its usual amount and + (`phMlkFoodRow`, the one row); Thisbowl R | L,
Build your own; a thing in the meal is NOT listed; Done adding) · one numbers line, small numbers behind a tap · **Eating out | Skipped** one bar (beside Had it on
her card, beside + Add in the planner's foot). **Skipped** is on every meal (her 2026-10-28 "give option to skip meals"):
today or before = she skipped it; a day ahead = that day planned Skipped; on while so, a second tap takes it back. Its cell reads Skipped. No sideways scroll; long names wrap, never cut; the cursor goes to Search on the
computer only. The snack picker (Snacks · drinks) and a dish's Made of keep their chips; a menu's foods show there on a search
only, never under All foods (`data-meal-srch`). Code: "A CALMER MEAL" (`phMealListHtml`, `phMealTblHtml`,
`phMealAddHtml`, `phMealNumsHtml`, `phMealInstHtml`).
**Food numbers**: foods from `PH_FOOD` (1143 rows of 19 numbers: the Australian Food Composition Database Release 3 by FSANZ, CC BY-SA 3.0 AU,
credited on Targets; AUSNUT 2023 by FSANZ for what AFCD lacks: the curry meat pie, the kebab wraps, creamy milk; choline, beef
bacon, popcorn and the copper AFCD leaves out from USDA FoodData Central (popcorn and copper read through Health Canada's Canadian
Nutrient File, its copy); matcha and hojicha powder from the Standard Tables of Food Composition in Japan 2020 and 2023 (MEXT);
**copper + magnesium** (MICROS, her 2026-11-03 ask) per row from its own source, a dish from its parts, "not counted" where the
source gives none (SG FoodID, AUSNUT, the chains, Thisbowl; a row of 17 numbers reads them as null); Thisbowl's June
2026 sheet; groups include **Snacks** (packet chips; Popcorn · butter / plain / salted / sweet, her 2026-11-03 ask) and
**Protein** (five steaks with their fat beside the lean Steak: Eye fillet, Rump, Scotch fillet, Sirloin, T-bone, AFCD grilled
untrimmed; Lamb souvlaki skewer 75 g; her 2026-11-03 asks; copper, magnesium and these foods LIVE build 20261103-134900), **Seafood** (her 2026-11-03 "add seafood e.g. prawns clams baby clams mussels fish salmon sashimi etc etc"; her picks: its own group after Protein, all four sets, pieces where natural, cooked as eaten; 57 rows, the 10 that sat in Protein moved in: shellfish, squid, octopus (Abalone, Baby clams (hến), Clam (vongole), Pipi, Cockle, Scallop, King prawn, Crab meat, Lobster, Moreton Bay bug, Squid / calamari, Octopus, Cuttlefish), 15 more fish (AFCD baked or grilled, no fat; Eel), sashimi by the slice (15 g) and nigiri by the piece (20 g sushi rice + a slice), Salmon roe (ikura), Smoked salmon, Fish roe, Fish ball, Fish cake, Crab stick, Battered fish (222 g), Crumbed fish, Fish finger; AFCD, USDA through Health Canada's copy, MEXT 2023; a piece's meat from Sydney Fish Market's sizes or Eatreat's standard weights; Vietnamese and Chinese names in the search words; LIVE build 20261103-154400), **Instant noodles** (her 2026-11-03 "add seaweed, and instant noodles especially mama noodles"; her picks: their own group after Grains, brand first, a packet = the noodles and every sachet, ½ steps; 44 rows: Mama 17, Indomie 5, Maggi 2 Minute 3, Hảo Hảo / Omachi / Vifon 9, Shin Ramyun / Buldak / Jin Ramen 5, Nissin cups and Demae 5; each packet's own label (Open Food Facts, maggi.com.au, Woolworths NZ) for energy and macros, AFCD instant or rice noodles for the rest; LIVE build 20261103-163700), seaweed in **Vegetables** beside Nori (her picks: Seaweed snack (a 5 g pack), Wakame dried / soaked, Seaweed salad, Miso soup with wakame, Kombu dried (a piece 5 g), Kelp cooked, Dashi (kombu stock); MEXT 2023, iodine counted as it is: a kombu piece 10,000 µg, a cup of kombu dashi 13,250 µg; LIVE build 20261103-163700) and **Takeaway** (pies, sausage roll, kebabs,
hot chips), her word; **Water** is a drink in ml, every number 0; **the menus and dishes** (her synth22 2026-11-01, whole menus,
everyday dishes; BUILD-NOTES "Menus + dishes"): McDonald's 261, Hungry Jack's 257 (its whole menu, her 2026-11-02 "Yes, add them"), KFC 74 (the Wicked Wings row kept), Oporto 53,
El Jannah 18, Chagee 10, **Stockman Steaks 60** (her butcher, her 2026-11-03 "add grass fed steak and meats from stockman steaks inventory"; her picks: their own group, all four kinds, pieces as sold, Wagyu yes and Christmas no; beef cuts, Wagyu, mince 5 · 10 · 20 · 35% fat, organ mixes, burgers, sausages, meatballs, liver, heart, kidney, bone broths, beef fat, marrow, lamb, pork, bacon, chicken, veal; names start "Stockman", a piece its weight sold "(200 g)"; AFCD per cut, bone out by its analysed portion, a fat edge AFCD leaves out counted as separable fat; USDA through Health Canada's copy where AFCD has none; MEXT for oxtail; the broths' own labels; Wagyu, burgers, eye bacon, marrow as close matches; LIVE build 20261103-141400), Chinese 34 (Clear chicken soup: USDA's home-made chicken stock, her 2026-11-02 ask; Cumin lamb skewer (yang rou chuan, 羊肉串), 30 g, her 2026-11-03 ask), Vietnamese 38 (Cơm tấm sườn bì chả, Bún riêu, Bún mắm, Bánh xèo and Bánh cuốn with their plates, four bánh mì: thịt heo, heo quay, xíu mại, bì, and Wombok soup with pork mince, worked out from their parts, her 2026-11-02 asks; a Matcha latte and a Hojicha latte for each milk in Drinks (full cream, creamy, light, skim, oat, soy, almond; the milk in its name), which lists a place's drinks after the everyday ones), each place a group of its own; a place or dish with no numbers of its own counts
as its closest food, named in its hover ("Close match: … · SG FoodID", `PH_FOOD_SRC`, `phFoodSrcTip`; a source that is the food itself reads "Source: …": Stockman's cuts, the steaks, the popcorns; `phFoodTipAt` with her
reactions); names as she says them (Phở bò, Quẩy (youtiao)) and search finds either name, accents optional (`phFoodNrm`,
`phFoodWordsN`, a place's name included); a place's foods keep their capital ("1 Whopper", `PH_FOOD_NAMED`), a dish does not
("1 bowl phở bò"); never on the shopping list but Stockman Steaks' raw meat (`phFoodMade`, the 4th place in `PH_FOOD_MENUS`); LIVE build 20261102-101600), stored `food:<id>*<q>`, shown in kitchen
words with − / + (**MEAL AMOUNTS**, her 2026-11-03 picks B + C: anything she counts, a dish `dish:<id>*<q>` too, goes by ¼ below
one, 1 → ¾ → ½ → ¼, and by its own step above, `phMealStepQ`; grams and ml keep their 25 g / 50 ml and floor; the amount is a field
she types into, 0.5 · .25 · 1½ · 1/2, Enter or leaving keeps it, Esc puts it back, `phMealQParse` → `phMealAmtTo`, the one door − +
take too; a dish's Made of the same, `phDishAmtType`; LIVE build 20261103-112900). **DRINK SIZES** (her 2026-11-03 "also include
drink size selection"; her picks: size chips, on every drink amount, a shop's drink one row; LIVE build 20261103-201800): Small · Regular · Large
chips with the ml under each (a café cup 220 · 350 · 470 ml, a glass 200 · 250 · 375 ml; an espresso Single · Double), on a line of
their own under a meal's drink, beside the amount in a Try, after it in a dish's Made of; − / + still fine-tunes. A shop's drink sold
in sizes (75: McDonald's 46, Hungry Jack's 29) is one row in + Add (its sizes one bar, its place's name beside it), one chip
(S · M · L) in the food chips, and its chips swap it to that size's own row; one logged keeps its size. A drink sold as one cup, can
or bottle has none. Then her "yes" (same day): a shop's food sold in sizes joins the same way (28: fries, sundaes, chips, sides,
Oporto's and El Jannah's chicken Quarter · Half · Whole, El Jannah's tubs; "· Small" or "(medium)" names); in its own place's pane
the joined row drops the place's name (LIVE build 20261103-233500). Code: "DRINK SIZES" (`phDkSib`, `phDkSizes`, `phDkSzHtml`; a meal's change goes through `phMealAmtTo`, a
repeating drink keeps its base through `phMealRepQ`'s `ob`). **SNACKS TABLE · MILK TEA SUGAR** (her 2026-11-03 "i need to be able
to adjust the milk tea to reduce sugar. i dont like thqat when i tap my snacks it deletes, remove that"; her 8 picks; LIVE build 20261103-201800): a
tap on a snack in the planner no longer takes it out; it opens the day's Snacks · drinks with the snacks as a meal's table on top (−
amount +, a drink's size chips, kJ, ✕ with Undo; `phMealSnTblHtml`, a row's lid `<day>|s|@<its time>` read by `phMealSnAt`, its
amount through `phMealAmtTo` → `phMealSnackSet`, which keeps the time, so a photo's dot stays) and the add list under it. A
supplement's tap opens its list the same way: what she took is a table on top, ✕ takes one out. A milk tea (CHAGEE's, not BO·YA's
less / no sugar rows, and a bubble milk tea; `phFoodSgOk`) has a Sugar 0 · 25 · 50 · 75 · 100% chip under its name; the level is
kept beside the snack (`sg`, so an older build still shows the drink, at full sugar) and read as `food:<id>*<q>^<level>`
(`phMealQ`'s `sg`, `phMealSnShow`); the added sugar left out comes off sugar, carbs and 17 kJ a gram, the milk's own 1.4 g a 100 ml
stays (`phFoodNut`'s third argument); a milk tea added again starts at her last level for it (`phMealSgLast`); the grid and the
toasts say "… Milk Tea · 50%" (`phMealSgW`), and on the phone a long snack name takes a second line. A dish's **Made of** adds its numbers itself
(typed numbers only for what is not on the list); with no Made of a dish counts by itself (`phDishAuto`: the Thisbowl bowl in its
name, else its typed ingredients matched) and Made of starts filled with that bowl. Nutrients add every item. The time is a small
✎ field. A day's numbers line (kJ · P · C · F) opens 17 bars against **Targets** (C22's four + NHMRC women 31–50 + carbs 50 g, each hers;
copper 1.2 mg and magnesium 320 mg since MICROS);
"not counted" where no source gives a number, never 0. **Fat · Protein · Choline lead** (her word 2026-10-28, "prioritise fat
protein and choline"; `PH_NUT_TOP`): first in the bars, always shown on a phone, first in Targets; a meal's small numbers start
with choline. On her Meals page fat and protein (with kJ and carbs) are the goals' own since MEALS GOALS (her 2026-11-03 "yes take
them out of More"): a day's More has no numbers line and no bar for a goal of the goals panel (`PH_MPL_GL`: protein, fat, kJ, carbs
and since MICROS calcium, choline, copper, magnesium); Targets keeps the rest. LIVE build 20261103-105100. LIVE build 20261028-215100. Thisbowl bowls R | L + Build your own. Code: "FOOD NUMBERS" (`phFood*`,
`phNut*`, `phTb*`).
**MEAL REPEATS** (her 2026-11-01 "need an easier way to organise meals based on daily or one day", her 4th report on it; her
picks [Meal repeats]): what repeats is a FOOD, not a whole meal (her meals change day to day). Each food of her day's meal (her
card, the planner's picker; not a patient's, not a meal she had) has a dropdown chip: "<Thu> only ▾" or "↻ Every day ▾" /
Weekdays / Weekends / Every <Thu> / the days; its list: <Thu> only · Every day · Weekdays · Weekends · Every <Thu> · one joined
day bar M–S (a day on or off; the list stays open). A repeat runs from the day it is set on (earlier days keep theirs). A food
she adds is that day only. ✕ or − / + on a food that repeats asks first: **Just <Thu> · <Thu> on · Every day · Keep**. ↻ Repeat
meal sets every food of that meal at once. Her usual meal from before (`def|<sl>`) counts as Every day foods until she changes
one (it then leaves the usual meal and becomes a repeat of its own); a day kept before (no `ad`) is its whole meal as it was,
until a repeat of that meal changes (days from today on are then kept the new way, so they follow). Copy a day copies the day's
foods as they show. Data: `d.meals["rp|<id>"]` {sl, x, r d · w · e · k (wd), fr, to}; a day's entry with `ad: 1` = that day's own
foods in `v` (a repeat's food at another amount = that day's amount) + `off` [bases]. Code: "MEAL REPEATS" (`phMealRepAll`,
`phMealRepOn`, `phMealRepOf`, `phMealPlan`, `phMealDayPut`, `phMealRepSet` / `Rm` / `Q`, `phMealRpRowHtml`, `phMealRpMenuHtml`).
LIVE build 20261101-231600.
**Shop foods** (her "download woolworth and coles and aldi food database because i buy from them"; her pick "Search as I type"):
the shops share no product data and FSANZ's Branded Food Database is not public, so the products are Open Food Facts' Australian
ones (shoppers' label scans, ODbL, credited on Targets) in `foods-au.json`, fetched the first time she types in a meal's add list
(Open Food Facts' own search refuses a web page). While she types, a **Shops** block lists up to 12 under her own foods (every word
whole, the last one a start; her shops' products and Australian barcodes first; "woolworths", "coles", "aldi" find what each
sells, an Aldi own brand counts as Aldi). One she adds is kept in her Me row (`d.sfood["sh_<code>"]`, entry by entry) and joins
`PH_FOOD` as group "From the shops" (`phSfReg`), at its label serve; numbers per 100 g / ml are the label's (kJ, protein, carbs, fat,
fibre, sugar, sodium, and a mineral or vitamin only when the label gives it). A product named water is a drink in ml whatever its
scan says (`phSfDk`); a kept product reads "shop" beside its amount in the add list. Code: "SHOP FOODS" (`phSf*`).
**Diet page** under Log for every patient (`phDietPageHtml`): usual diet + days she notes (`rec.diet`, `phDietWrite`), one thing per
line, ↺ Same as usual on a day of its own. On HER record (the My profile record, else her signature name; a Me tag on her band) it is
**Meals**, in her Body group; patients keep Diet, unchanged. Nutrients, nature and the week are worked out on read. Diet feeds
Patterns (`diet_cool` / `diet_warm`, source Diet, DRAFT wording); Fang Bing Ren has no diet sign (food reactions pre-tick its signs).
**Meals planner** (her Diet page, her word "change diet to Meals", fasting merged in), laid out as the **MEALS TABLE** (her synth22
2026-11-01, "a table format for meal planning and recording ... clean, like the appointments page"; her picks on
meals-table-mock-2026-11-01.html, then "include interactive animations and workflow elements"). A computer (MEALS WEEK BOX, her 2026-11-03 picks): **the goals** first,
then the week as ONE box, its bar on top in the record's light tint, pinned under the name band while the week scrolls (two rows
when its words do not fit one): the bar (‹ span › · Today · **Day · 3 days · Week** (her 2026-11-04 ask; this device's `lcm-mpl-days`; 3 days = that day + the next 2, ‹ › by the view's own span; Day: the goals follow the day; none on Try or Body) · the tabs **Grid · Table · Numbers · Photos · Try · Body**, the open one white, this device's `lcm-mpl-view`, Table first · the steps **Plan n/7 · Shop n to buy · Eat <the next meal> ·
Check n to answer** (Eat names today's next meal and its time, "Dinner 6:30 pm", ✓ once all had, a dinner the fast covers left out;
MEALS GOALS, her pick 7), the first not done filled, each a door: next week · Shopping in the column (made when there is none) · today's
next meal · How did it sit for each meal she had 1½ h ago not yet answered · **More ▾** = Copy last week, Recipes, Targets (the
Shop step is the Shopping list's one door, MEALS GOALS). The goals (Meals goals, below) are ONE row: the fasting dial, Reach, Stay under, Micros
(Start / Stop and History › beside the dial, a tap opens a goal's card, ONE ROW 2026-11-08; the clock bar and the Fast row
are gone). Inside the box (the key along its foot) the week with **the pane** (MEALS PANE, her 2026-11-04 picture): the meal's picker, Shopping, How did it sit, or a day (tap its name: water, numbers,
bars, Copy this day) slides out over the table, 400px, on the left when it would cover more than a third of its own cell. The table keeps its width. It stays open: ✕, Done, Esc, its own cell or leaving Meals close it, never a tap on the page; a repaint keeps its scroll and holds the add list still on the screen. Its name + ✕ and Done stay in view. Pane and Day · 3 days · Week LIVE build 20261105-093900. **Table**: a row a day,
Breakfast · Lunch · Dinner · Snacks · drinks · Supps · herbs (a day's kJ · P · C · F are the goals' ticks; the number columns went,
MEALS GOALS). **Grid**: days across, a block a meal (had = solid teal), Snacks, Supplements (its Total row went the same way). **Try** (TRY A MEAL, her 2026-11-03 picks; `phMtry*`): a meal she builds
to see its numbers before she eats it, nothing logged. Up to three tries as one joined bar (a tab names its first food; + Try); a
food a row (− / + and the typed amount as a dish's, ✕); her 8 goal numbers (kJ · Protein · Carbs · Fat · Calcium · Choline · Copper ·
Magnesium) + All 19 ▸; **This meal** (a + = a food could not count it) and **Of your day** (% of each goal: a green dot ✓ on a goal
to reach, a red dot past a limit); + Food = the dish editor's food list; Plan it ▾ (this week's days, today first; Breakfast · Lunch
· Dinner: its foods into that meal through the planner's door) · Save as dish (the dish editor, Made of filled) · Clear (Undo).
While Try is open the goals lay the open try over the day as stripes, "today X + try Y" under each state (the planned pale part
steps aside). Kept until cleared, both logins: `d.meals["try|<id>"]` {fd, o}. Phone: the Try chip beside Numbers swaps the day's
meals for it. LIVE build 20261103-143900. **Beside it, the body** (MEALS BODY, her 2026-11-03 picks; `phMbd*`, `PH_MBD_*`): the try
travelling through her on the app's body (PH_BODY_GEOM, the sketch face, `phRenAnatomyHtml`'s organs), one number at a time in the
table's order (2.5 s each, its column lit): the goals' day so far + the try, against her goals. A place grows when its number meets
the goal and shrinks, thins, cracks or pales when short (the thyroid swells, the liver turns fatty; the Baby place only glows); fuel
only lights a place; the part past a goal is stored (liver, fat) or cleared (kidneys → bladder): carbs past her goal refill the liver,
then go to fat; kJ past the day go to fat too. Before it lands she is pale and grey and the places the try feeds small and dim; colour
floods in as it lands, places swell about a fifth, the vessels thicken and run red with red cells, sparks fire across the brain (her
2026-11-03 picks, BUILD-NOTES "One body, more real"). **Before → after** (her 2026-11-03 picks, BUILD-NOTES "Meals body: before → after"): the play
starts from the day so far (BEFORE, `phMbdData`'s `pb`) and only the try's own share travels; when it ends a line opens to the middle,
BEFORE (still, pale) on its left and AFTER on its right, "BEFORE 3/8 · AFTER 6/8" at the top (places at their goal); she drags it
anywhere on the body (← → on its ‹› circle); a place a number on the table builds turns grey as that number falls short; a changed
amount keeps the line where she left it. The Iron page's step 2 draws this same body (no line there). Eat · Body | TCM (TCM: Stomach → Spleen → the Zang that governs the tissue, in its element's colour;
the view stays on this device) · All ▾ (follow one number). Names on hover only. It plays when the Try tab opens and on Eat; a changed
amount sets the looks at once; reduced motion: the end looks only. Phone: above the table. Protein also reaches the baby (`PH_MBD_FLOW.p.baby`) and every other dot of choline goes by the lymph (`PH_MBD_FLOW.ch.also`, `phMbdRoute`'s lane), so this body and Guide › Eating eggs agree. Its words (`PH_MBD_FLOW`, `PH_MBD_ORG`)
are DRAFT.
**The Body tab** (MEALS BODY FORECAST; her words: "make an animated person of me based on high and weight and body fat percentage to
show me how my food intake is impacting my health"; her picks; `phMbf*`, `PH_MBF_*`), her own Meals only: the Meals body (`phMbdSvg`
with a `build`, so it is the one body) drawn at her height, weight and body fat, changing shape over the weeks ahead as she eats what
three sliders say, **Carbs · Protein · Fat** a day. They open on this week's average (Numbers' Average row, `phMbfWeekOf`), a tick
for the week and one for her goal, **This week · My goal · Muscle up** set them. Under them Eat against Burn, **Play** (once when the tab
opens; reduced motion: the end only), **4 weeks · 12 weeks · 1 year** (opens on 12), a bar to drag through the weeks, the weight line
over the BMI 18.5 to 25 band, four tiles (Weight · Fat · Muscle + lean · Liver store + water) and flags (BMI, Energy for hormones,
Muscle, the week the model stops). Today stays as a dashed outline. Four places change on the body: fat stores, muscle, the liver's
store, ovaries and womb (grey as the energy left for hormones falls); not pregnant, no ketones, no bones (her picks). **You**: the
Height · Weight · Body fat boxes save today's reading on her record (`phBodyWrite`); until all three are there it reads "Needs height
· body fat". Light · Moderate · Active is this device's `lcm-mbf-act`, Moderate first. Phone: the body beside the sliders, the rest
under. The model (`phMbfSim`; its figures in BUILD-NOTES) and every word are DRAFT, and a line on the tab says so. LIVE in build 20261105-131600.
**Three views** (one switch at the tab's top, this device's `lcm-mbf-view`): **Forecast** (the above) · **Over time** (`phMbt*`,
`PH_MBT_*`; her 2026-11-05 picks) · **Composition** (`phMsc*`, `PH_MSC_*`; her 2026-11-06 ask, its bullet below, LIVE in build
20261106-142000). Forecast and Over time are LIVE in build 20261105-141700, all of this paragraph but that bullet:
- *Forecast, the look* (her "make the subcutaneous fat more 3d and textured and dramatic looking", picks Bolder · Fibres): the fat is
  a lobed layer under the skin with deep shadow and shine (`phMbdFatBand`, patterns in `phMbdDefs`), the muscles fibred spindles,
  shoulders and forearms with the arms, thighs and calves. `PH_MBD_BOLD`: the Meals figures only (so Try's body has it too); the
  Guide's Iron and Eggs pages keep their quiet drawing, identical to before.
- *Forecast, training and the goal* (her "the goal is for the animation to shape me into growing muscle and shrinking fat"):
  **Strength a week 0 · 1 · 2 · 3 · 4+** opens on her Fitness log (the last 4 weeks, `phMbfStLog`, "from your log"); a chip is a
  what-if. **Muscle up** sets the sliders to the eating that grows muscle and shrinks fat (protein 1.8 g a kg, a tenth under her
  burn while her body fat is 24% or over, fat 30% of the kJ, strength at 3; `phMbfUp`) and plays the figure into that body.
- *Forecast, less height and kcal* (her 2026-11-06 "make the features on this page more space saving" and "put kj with calories
  as well"; BUILD-NOTES "Body tab: the Forecast in less height, kcal beside kJ"; LIVE in build 20261106-155300). Every feature kept. You
  and Strength a week share a row; Play, the weeks and the bar to drag share a row; the weight line is drawn at its own width
  (`phMbf.cw`, 96px tall, its type always 11px); from 761px the sliders are slimmer and their two marks are named once beside
  "Eat a day" (`.ph-mbf-tk`: goal above the track in teal, week below in grey), the weight sits beside its week, the figure's
  column is 270px and the figure 250px, as before (her "make the width of the person wider"); the tiles are one line each and the flags share a line with the draft note. Eat, Burn and the gap read kJ and
  kcal ("7,600 kJ · 1,816 kcal"; 4.184 kJ a kcal). CSS "BODY FORECAST, SPACE SAVING", after the phone block on purpose.
- *Over time* (her "include my physical circumference and physical body images similar to tongue pictures so i can view overtime",
  her 8 picks). Left, **Tape**: Waist · Hips · Bust · Thigh · Upper arm, each a cm box (today's reading on her record,
  `body.tape`, `phTapeWrite`; an older day is never edited), a small line through her readings, the change since the first; under
  them Waist to height · Waist to hip. Right, **Photos**: Front · Side · Back; Last (or the Past one picked from the strip)
  beside Today, the strip of earlier dates, **Play** flips through the dates, **Show / Cover** (covered with a blur each time the
  tab opens; a first tap on a covered photo uncovers it). A photo opens big: ‹ ›, its date (hers to change), Delete with the
  usual Undo; Escape closes it and nothing behind it. Body photos are kinds `shapeFront | shapeSide | shapeBack` in her own
  record's photo store; like meal photos they show here only (`phMbtIsShape` keeps them out of her Photos pages and Records), and
  a phone sends them on by the photo relay. A photo from the gallery keeps the day it was taken.
- *Her figure follows her tape*: a woman's newest waist and hips bend the figure at the waist and hips (`phBodyBuild`'s `tf`; the
  forecast holds today's bend through the weeks).
- *Due every 4 weeks* from her newest tape reading or body photo (`phMbtDue`): a gold dot on Over time and "Tape due" as the Meals
  row's small line in her menu; nothing is due before a first reading.
- *Composition* (her 2026-11-06 "use these images to build my body composition page", her pictures: a body scan's result sheet;
  BUILD-NOTES "Body composition: her scan as a page"). A **scan** is one day's numbers as the machine printed them, with the
  machine's own ranges: `rec.body.comp = [{ d, v: { key: number }, r: { key: [low, high] } }]`, written only by `phMscWrite`
  (`phMscSet` for one box), which also keeps **that day's reading** (`body.readings`: height, weight, body fat, muscle) in step, a number at a time,
  so her figure, the Body panel's ratios, the Forecast and the Ren's build signs read the scan (newest reading wins, as before).
  The page: **her own figure** (the one body, `phMbdSvg`, at that scan's numbers) with the **five parts** round it, a tag each
  (Lean · Fat, a dot green inside the machine's range and amber outside; her right on the left, as every front view); under it
  **Summary** (Weight · Height · BWI score · Bio age · BMR · TEE · Waist to hip); beside it **what her weight is made of** as one
  bar (Subcutaneous fat · Visceral fat · Intracellular fluid · Extracellular fluid · Protein · Mineral) and **Composition** (13
  rows). A row = the sheet's word, a box, the Blood tests' low–high bar (`phBldBarHtml`) with the range, the **change** since the
  scan before. Every number is a box, saved when left and painted where it stands (`phMscPaint`). **+ Scan** opens a date and one
  box for the sheet's numbers, a number a line ("Lean body mass 46.9 [40.2 - 49.1]", `phMscParse`; it counts what it can read and
  takes the sheet's date); saved empty it opens a blank day to type in, with the ranges of the scan before. More than one scan:
  a chip a date (a dropdown past six). **Remove** has the usual Undo and takes the scan's numbers back out of the day's reading (the rules: BUILD-NOTES).
  The order is the sheet's own (a document's order), not A–Z. Left out: the sheet's food and supplement suggestions, its body
  balance words. Nothing here is worked out by the app but the change, where a number sits on the machine's range, and BMR and
  TEE in kJ beside the sheet's kcal (the row's third cell, `phMscBarHtml`; her "put kj with calories as well").
- DRAFT: the training figures, Muscle up's rule, the tape's reference figure, every word.
A meal
**dragged** onto another day's same meal is copied there (what she had, else its plan; Undo in the toast; a meal she had there
stays). Phone: the goals (the dial, then Reach and Stay under; the fast's goal on Your fasts ›), the steps (counts only; Eat its time), a day at a time. A cell = its meal's time (a day's own bold) + its things one per
line (a small ↻ = it repeats, bold = that day only, ✓ + the time she had it); no ✎ Usual (MEAL REPEATS). A tap opens the picker in
the column (phone: under the row), on the meal (empty = on adding): the meal's list (Eating out | Skipped, any day)
+ Done; on Dinner **Fast this night** (see Fasting). Esc closes the picker only. A day's name (phone: Copy day) = Copy a day (pick days, Copy to N days);
**Copy last week**; **Shopping list** (the Shop step) = the week's list from the plan (each food added up, a dish's foods; Thisbowl's and the menus' left out) into
the Me drawer's Shopping (`src: "plan"`); Targets. **Recipes** (her 2026-10-28 "where can i edit my recipes?" → yes; before
Targets in More ▾ and the phone's chips; `phRecipesHtml`, sheet kind "recipes"): every dish of hers in one list (a
mark's own slot, name wraps, kJ a serve · n prep, ✎), Search recipes, a row = the dish editor, + New recipe; the editor's Save /
Delete / ✕ come back to the list. LIVE build 20261028-233200. **Supplements · herbs** (her 2026-10-28 "add a row for supplements and herbs"; today and the days before): a chip a thing
she took (a tap opens the list, her 2026-11-03 pick), + opens it too: what she took (a table, ✕ takes one out, with Undo), Taking (her Supplements page: the four switched on and her
own), Before (her earlier days); as she types, the supplements list and her LCM formulas and jars (`phAcuFPickStock`), and Add
"<typed>" (Enter too). Stored `"<day>|h"` {list [{n, at, src?}]}; not counted in her numbers. Code: `phMplSupp*`, `phMealSupp*`.
**More** a day = water in ml (a glass 250 ml; the button shows the day's ml: the glasses she tapped + plain water logged in a meal
she had or as a drink, `phMealWaterMl`), +250 ml (no kJ · P · C · F line: the goals carry them), warm ·
cool, the 13 bars, choline first (today's open by itself; a phone: choline + the first three still under, + n more). Phone: a day at a time (‹ ›), the picker inline. Code: "MEALS PLANNER" (`phMpl*`), "MEALS
TABLE" (`phMplToolbarHtml`, `phMplSteps`, `phMplFastRingHtml`, `phMplWtHtml`, `phMplGridHtml`, `phMplColHtml`, `phMplStepGo`,
`phMplCopyMeal`; `phMplPnl` = the column with no meal open). MEALS TABLE: LIVE build 20261102-095100.
**Rings follow + Numbers** (her 2026-11-02 "does this show when i click on a day? mock ways i can view this day by day, or compare
the days over the week like a table format"; her picks on the "Meals day numbers" mock, boards A + F): **the rings show the day she
picks.** A day's name in Table / Grid (it still opens the column) or a day or bar in Numbers moves them (`phMplRk`, this visit only;
off today the goals' head names the day with a Today chip; the toolbar's Today and the Eat step bring them back too; their own
‹ day › went, MEALS GOALS pick 4); that day's row is tinted with its accent (Grid: its head), today's day name teal. A phone's goals follow the day it
shows, as before. Off today the fasting dial is **that day's fast** (`phMplDayFast`: the fast she logged that ended that day, the
longest, else the gap from the last thing she ate the day before to the first that day, `phMplEatAt`, kJ above 0 only; "Fasted",
✓ goal or n short; a day to come "Fast planned" or "No fast") and Start / Stop go (History › stays); a past day's numbers read
"under", today's and a day to come's "to go"; the goals' bars grow from the day before (`data-barw` in the motion helper, off under
reduced motion). **Numbers** (`lcm-mpl-view` "num", `phMplNumHtml`): a row a day, a ring each for Fasting · kJ · Protein · Carbs · Fat (its %
inside, then the number and how far over or under, or ✓ goal), the **average a day** under them (fasts over the days with one,
"n of m days ✓"; numbers over the days she had something), then **The week**: each number's seven bars under its column, the goal
a dashed line, the picked day outlined; the Table's colours (under 60% amber, over deep, planned pale) and a fast reached green; a day
to come pale, as planned. Phone: a **Numbers** chip (first of the chips) swaps the day's meals for a row a day of five small rings
+ Avg (`phMplNumPhHtml`); a row = that day (the rings and the day above follow). LIVE build 20261102-123700.
**Fasting dial** (her 2026-11-02 "make this stand out more and give it interactive elements to show how many hours ive fasted and how
many more to go"; mock `fasting-ring-mock-2026-11-02.html`, her picks: B Night dial · fasted big, a tap swaps · a gold pop when an hour
fills · the phone the same): the goals lead with a **24-hour clock face** (150px; 12a on top, 6a · 12p · 6p,
a tick an hour), the fast drawn from its start to its goal **one piece an hour**: done = `--ph-herb`, to go = the pale planned colour
(`--ph-mac-pl`), every piece green once met; a **gold dot = now**, a ring where the goal lands. The middle: the hours fasted, big;
**a tap on it swaps** to the hours to go (this device's, `lcm-mpl-fswap`); the line under the dial says the other ("8:36 to go"; past the
goal "✓ goal +0:30"), then of Breakfast ▾ and → 7 am as before. **Point at an hour** = its box (Hour n of m, its clock times and day,
done / now · n left / starts in n); **at the middle** = the fast's box (fasted, to go or ✓ goal, the %, Started, Breakfast or Goal, This
week n planned · aim): the page's one box (`phMacBkShow`, keys `q|now|i` and `q|now|f`; a phone: a tap). It moves on in place each minute
(`phMplLive` → `phMplDialPaint`) and **the hour that just filled pops gold once** (off under reduced motion); the gold ring once at the
goal stays (`phMplGoalRing`). Off today the dial draws the fast that ended that day (`phMplDayFast` carries its start, `s`): green to its
goal, or the hours done with the rest pale and "n short" against that fast's own goal; a day to come or no fast = the face and "–". A
goal over 24 h spreads its hours round a plain face (no clock words). **Phone**: the dial (136px) leads on its own row with its line,
→ 7 am and Start · Continue / Stop beside it (`.fb`; a computer too since FAST BLOCK), its week of ticks, Reach and Stay under under
it; History › on the Fast heading. Code: "FASTING DIAL" (`phMplDial*`, `phFdArc`, `phFdPt`). LIVE build 20261103-102500.
**Meals goals** (her 2026-11-02 "audit this page and streamline any repeating elements that do the same thing. make it so it
communicates like atomic habits- its easy for me to see my goals and limits"; mock `meals-goals-mock-2026-11-02.html`, her 8 picks,
all A; memory project_lcm_meals_goals_2026_11_02): one panel for the goals' day (`phMplGoalsHtml`): a head (the day off today + Today ·
today's score beside the day, "✓ n kept · n to go · n over / missed"), then **ONE ROW** (her 2026-11-08 "mock putting all the macros
adn micro and fasting into same row. make it clean and minimal looking with just essential buttons"; mock
`meals-one-row-mock-2026-11-08.html`, her picks: a ring for the fast, bars for everything else, each group's bars stacked, Start +
History on the row, the micros 2 × 2, the labels kept, the phone in three short rows; BUILD-NOTES "Meals goals in one row"): one white
block on the page colour's tint (FAST BLOCK's band, her 2026-11-03 pick), `.ph-mpl-r1`, holding **Fast** (the fasting dial in a 102px
box, its clock words hidden, an hour's box still naming its times; its words, → 7 am or last n h ✓; **Start** / **Stop** over
**History ›**, `phFastBtnsHtml`, `phMplRactsHtml`; side by side on the phone) · **Reach** (protein, fat) · **Stay under** (kJ, carbs) ·
**Micros** (calcium, choline, copper, magnesium, A–Z, 2 × 2), each under its capitals label (`PH_MPL_GL`, `PH_MAC_REACH`). A goal is
ONE line: its name and **state** (protein "n g to go" / "✓ 58 g", a past day "short"; a limit "n left · n kcal", a past day "✓ n
under", over "n over" with a red dot; a day to come "planned"), its **bar** under them (had solid, still planned pale, scaled to 125%
of the goal so **the goal is a line at 80%**; over a limit red with a cut past 125%; a goal to reach deep once reached, amber under 60%;
amber never on a limit). On a row under 1040px (her 1220px window) and on the phone the state's word gives way (`.sw`, a container
query; the colours, the dot and the card still say it, the kJ line keeps its kcal); a name is never cut. **A tap on the fast or a goal
opens its card** under the row (`phMplGx`, `phMplGxHtml`, `data-mpl-gx`; the same tap, ✕ or Esc closes it; it slides in once): the
name and state in words, **its goal as a field** (the one place the eight are set; Targets keeps the rest, her pick 6; the fast's: of
18 h ▾ / Breakfast, and Continue while none runs, `phFastContHtml`), and **the last 7 days as ticks** up to the goals' day
(`phMplTick`: ✓ green = kept, an empty circle = missed, a red ring = over a limit, a dashed circle = nothing logged, a pie = today on
its way, gold ring = the goals' day; the fast's from `phMplDayFast`, today's the fast that ended today else the running one) + **"n in
a row"** (the kept run up to that day, today on its way skipped, 30 at most, `phMplRun`; a fact, no "never miss twice" nudge, her pick
3). The dial's middle tap still swaps its number; its buttons and History › keep their own taps; a phone's tap on a bar or the dial
shows its box. **Fat** (her 2026-11-03 "add fat consumption as a goal", pick A · Reach; mock `fat-goal-mock-2026-11-03.html`) is a goal
to reach under protein; its field starts pale at the rest of her kJ goal ("The rest of your kJ goal", `au`) until she types her own;
clearing it returns it to the rest. A micro's numbers keep its own decimals (copper 0.84 mg, `phMacRd`). Point at a bar or a tick =
that day's foods (the hover breakdown box); a fast tick = the fast's box. The bars grow from the day before (`data-barw`). While Try is
open its stripes lie on the bars and "today X + try Y" takes its own line. **One place for each number** (her picks 4, 5): the rings'
own ‹ day ›, the Table's kJ · P · C · F columns and the Grid's Total row went; the bottom key keeps the table's marks (had it · repeats
· bold · Fast · add a photo). **Today's camera** (her pick 8): today's Breakfast · Lunch · Dinner and Snacks · drinks carry a 32px
camera (a computer: on the meal she points at; a phone: at the end of each of today's rows, not a dinner the fast covers): a tap = pick
photos for that meal (`data-mph-add`, the + Photo's own door). Code: "MEALS GOALS" (`phMplGoals*`, `phMplGl*`, `phMplGx*`,
`phMplTick*`, `phMplRun`) and "MICROS" (`phMacIs`, `phMacN`, `phMacRd`, `phMacNm`, `phMacU`; `phMplFatHtml` gone). First LIVE build
20261103-102500; ONE ROW built 2026-11-08.
**Macros against her goal** (her picks: the Macros row AND today's rings) [Meals macros against goal]: energy, protein, carbs, fat.
**kcal beside kJ** (her 2026-11-06 "put kj with calories as well", then "yes i want kcal" for the rest of Meals; `phKcal`, 4.184 kJ a
kcal; BUILD-NOTES "Meals: kcal beside every kJ"; LIVE in build 20261106-180400). The goals' kJ row: the goal in kcal beside the name (`.nw .kc`,
follows the box as she types), the state's small words ("833 left · 199 kcal", `.kh`; hidden from 641 to 1100px, and on a phone for a
day to come, so the bar and the name keep their room). Numbers: a kJ cell is three lines (kJ, kcal, how far under or over in kJ), so
the five columns stay equal under their week bars; the head and the hovers say both. In words too: `phNutLine` (a patient's Diet
sheet shares it), a meal photo's foods line, Recipes (on a phone its numbers take their own line), the Food share hover (its card
380px), the day hover's total, the Body panel's kJ ring hover. kJ alone: the menu rail, the ring's own label, the Try table and its try line, the boxes.
**Goals** (`phDietGoal`): kJ 8000 (her word 2026-10-28, "daily energy goal is 8000kj"), hers to change; water 2000 ml (C22's 8
glasses; a target typed in glasses reads × 250); protein 50 g and carbs 50 g are hers (her word: "set carbs to 50g a day"); fat is hers,
else the rest of her kJ goal after protein and carbs (FSANZ: 17 kJ a gram of protein or carbs, 37 of fat; her grams win over a
split); the fat field starts there, pale, until she types hers; the micros start at NHMRC women 31–50 (calcium 1,000 mg, choline 425 mg,
copper 1.2 mg, magnesium 320 mg; her MICROS pick), hers to change. **The goals** (Meals goals, above; they replaced today's rings, `phMacRingsHtml`): each goal a field
(`data-diet-goal`, `phDietGoalSet`; clearing fat returns it to the rest). **A day's numbers** (the Numbers view, `phMplDayNums`): a day
to come as planned, pale (a plan over its goal = a deep number). Over the goal = **red for kJ and carbs** (her 2026-11-02 "for kj and carbs,
show red when over": the goals' bars, Numbers and its bars, its key "kJ · carbs over"; `PH_MAC_RD`, `phMacOv`; LIVE build 20261102-131600), deep for a goal to reach; under
60% = amber on a goal to reach only (protein, fat, the micros; low is the aim under a limit, MEALS GOALS; today: only when the plan also falls short). Worked out on read (`phMacDay` = `phDietMyDay` + `phMplPlanSum`); only the
goals are stored. Code: "MACROS" (`phMac*`). **What counts as eaten** in every number of hers (kJ, macros, water, warm · cool;
`phMealEaten`, her "these kj dont look right" 2026-10-28): a meal with Had it at once; any other meal once its time on her calendar has
passed (an earlier day: all of it); Skipped and a fast night's Dinner never. Had it itself (the ✓, Today's meals, the meal habit) is
unchanged. NOT live.
**Hover breakdown** (her 2026-11-02 "when i hover, show breakdown of foods that contributed to hte macro", on her Meals rings): pointing
at a goal's bar or tick (the fasting dial and its ticks have their own boxes, Fasting dial above) or a Numbers cell shows one box
under it (above when there is no room): the number (+ what is still planned) of her goal, then a row a food, most first, had then
planned (pale, as on the ring): the food with its amount, its meal (Breakfast · Lunch · Dinner · Snack · Drink), a bar of its share,
the amount, the %; past 12 rows (and crumbs under 1) one "+ N more" row (a single one shows itself, "<1 g"); "Not counted · …"
names what could not count it. Read from the rows the ring adds up (`phDietSum` returns `rows`; its items carry their meal:
`phDietMyDay` = had, today's or a day to come's `phMplPlanSum` meals not had = planned; `phMacFoods`), whole numbers (a micro at its own decimals, MICROS) by largest
remainder, so the rows add up to the ring's number, the pale ones to "+ N planned", the % to 100. One box (`#phMacBk`,
`phMacBkHtml` / `phMacBkShow` / `phMacBkHide`, `data-mac-bk="day|number"`), the record's colour copied from the ring; any other
point, a tap elsewhere, a scroll or Esc closes it; the goal field never opens it. Phone: a tap on a ring. LIVE build 20261102-175700.
**Food share** (her 2026-11-02 "when i hover over food i want to see what percentage of my daily macros that food will take up", on
her Meals cells; mock `food-share-hover-mock-2026-11-02.html`, her picks: Bars · this food only · of her day's goal · everywhere ·
the whole meal too · red past 100% · the phone a line): pointing at a food shows the same box as the rings (`#phMacBk`): the food
with its amount, its meal + had / planned / usual (or "not added yet", Snack, Drink), then kJ · Protein · Carbs · Fat, each its
amount, a bar of its share of her day's goal (`phDietGoal`) and the %; kJ and carbs past 100% turn the bar red (`PH_MAC_RD`, her
rings' rule). Where: a food in a Meals table cell, the cell's empty part = the whole meal ("2 foods · planned", its drag words under
it), a snack · drink chip, a row of the open meal, and a row of + Food's list before adding (Everyday ·
Drinks · Menus · My dishes; not a patient's Diet sheet). Words that were a hover title (close match, her reactions, drag, remove) go
under the box instead. Every amount is `phDietSum([[x]]).t`, the ring's own sum. Phone (no hover): one line under each food of the
open meal ("16% kJ · 19% P · 92% C · 5% F", a red dot past 100%); no box. Code: "FOOD SHARE" (`phMacFsOf` / `phMacFsRows` /
`phMacFsHtml` / `phMacFsLine`, `data-mac-bk="f|…"`, `m|`, `s|`, `x|`, `a|`). LIVE build 20261102-193700.
**Meal photos** (her 2026-11-02 "add a function where i can attach photos to my meals" + "allow for multiple photos of meal"; mock
`meal-photos-mock-2026-11-02.html`, her 10 picks): a meal (Breakfast · Lunch · Dinner) or the day's Snacks · drinks takes photos,
several each. **Table:** the first photo small beside the foods, "+N" for the rest (under the foods when the table is narrow: a meal
or a day open beside it, the Grid); a meal with a photo and no foods yet reads "Add foods" with a gold dot. **Open meal** (the
planner's, her meal card): the photos on top, then a dashed **+ Photo** tile (a computer: several at once, or drop them on it); a
phone: **Camera · Photos** (Photos picks several). **Today's camera** (MEALS GOALS, her pick 8): a camera on today's meals goes straight
to picking photos (Meals goals, above). **Had it:** a photo on a meal not yet ticked ticks it at the photo's time (an
older picture added later: the meal's own time that day); a meal with no foods yet waits, and adding its foods ticks it then; a
day to come never. **Big view:** a tap on any photo; ‹ › and ← → walk the day's meal photos, the meal's foods + kJ under it, Share
(a phone's share sheet) or Save (a computer), Delete (asks, then Undo: the one photo undo). **Photos view:** a 4th view beside Grid ·
Table · Numbers (a computer): the week with each meal as its photo and its first food, a dashed camera where a meal has none.
**Kept:** her own record's photo store (`lcm-ren-photos`, kind "meal", `meal` = b · l · d · s, `dateKey`, `takenAt`), on each
device like every photo, never in the cloud row; a phone sends them to her computer (the photo relay, `_m<slot>` on the file,
`phCapAutoImport` files them as meal photos); backups carry `meal` + `takenAt`. Her Photos pages leave them out
(`phRenLoadPhotosFor`, `phRecPhotosLoad`). Code: "MEAL PHOTOS" (`phMealPhs` · `phMealPhLoad` · `phMealPhSave` · `phMealPhHad` ·
`phMealPhRowHtml` · `phMealPhRender`, `data-mph-*`, `#phMealPhView`). LIVE build 20261102-204600.
**Food on the photo** (her 2026-11-02 "allow option to add food eaten linked to food in photo"; mock
`food-on-photo-mock-2026-11-02.html`, her 9 picks): in a meal photo's big view a **tap on a food in the photo** opens the meal's own
search there (the Add list; Snacks · drinks: its picker), the meal's foods with no dot here yet listed under it; the food picked goes in
at its usual amount and a **numbered dot** stays on the spot (it drops in). Under the photo, **the meal's food table**, each row numbered
like its dot (− +, kJ, ✕); a food with no dot on this photo: a dashed circle and **Place** (then a tap on the photo). A dot: **hover = its
Food share** (its row lights), **tap = − + and Remove** (off the meal, Undo). Dots show in the big view only. A phone: the same, the
search rises from the foot over the keyboard. **Kept** on the meal's entry, `pins = {<photo>: {<food>: [x, y]}}` (0–1 of the photo),
so they sync; <photo> = the photo's first id (`srcId` on a relayed copy: the relay name carries `_r<id>` before `_m<slot>`), <food> = its
base (a snack: "@" + its time). A food and its dot are one save (`phMealPhPend`, read by `phMealSave`): one Undo takes both. Adding a
food on the photo ticks Had it at the photo's time (meal photos pick 5). Code: "FOOD ON THE PHOTO" (`phMealPhTap` · `phMealPhPinIn` ·
`phMealPhPinPut` · `phMealPhFoods` · `phMealPhPlaceEl`, `data-mph-pw|pin|place|here|pc`, `phMealRowHtml(…, ph)`). LIVE build 20261102-214600.
**Food reactions**: a meal she had (her card, under Had it) and a patient's noted day or usual meal (Diet sheet, "Usually after it")
take an **After it**: Gut / Body / Felt good chips + her own words (+ Own, they stay), ONE How strong bar, Started, From (which
thing), a Note. The mark (the first reaction's picture in a pale red circle, green for Felt good) shows on the grid block, the Me
drawer row and the Diet cells; Reactions by food (twice or more) under the week and in a food's hover in the add list; Reactions ·
30 days on Health. A gut reaction twice or more (or on a patient's usual meal) files the Patterns clue `digestive_sx`, source Diet
(DRAFT). **Fang Bing Ren** (her word "fang bing ren", 2026-10-27, replacing "Never Fang Bing Ren"): a gut reaction pre-ticks its
sign (Bing = in the last 7 days; Ren = the same reaction twice in 30 days or on a patient's usual meal; any gut reaction also "worse
after eating"; Gassy = bloating + rumbling + belching; derived on read, `phRxFbrSigns`; her tap wins; why in the hover).
**After-meal check-in**: 1½ h after Had it on Breakfast / Lunch / Dinner, "How did <meal> sit?": gold on its Me drawer row, the
band's Meals chip and the calendar block; a card on top of the Me drawer (and at the head of Meals in the Appointments toolbar's panel), Fine first; with
Settings → Device "Check-in on the phone" on, a phone notification while LCM is open (sw.js `notificationclick` opens the card).
Fine (`e.fine`) leaves no mark; closed = `e.ckx`; unanswered goes quietly at the next meal's ask or midnight. Snacks are not asked
(no Had it). Data: `rx` on her day's meal entry / `rec.diet.days[day].rx[sl]` / `rec.diet.usual.rx[sl]`. Code: "FOOD REACTIONS"
(`phRx*`).

## Trips (her travel)
Her work trips live in LCM; Nanjing is the first. Data in her Me row, entry by entry, both logins (`d.trips`, `d.tplan` plan rows,
`d.tnotes` day notes). **A long note is never cut without a word** (her pick): one limit, 20,000 characters (`PH_ME_NOTE_MAX`), for a day's note, a session's note and the Week page's day note; over it nothing is saved short, the kept note stays, the save banner tells her and her typing stays in the box (`phMeNoteFits`). Trip to-dos = Me to-dos with `trip` + `g` (area) + `due` (days before she flies), day worked out on read
(`phTripTdDay`). Passport and policy numbers sync, hidden until Show numbers.

**Study entries in a session** (her Guide study design, step 1a; LIVE in 20261107-013500): an open session has a **Study** row. The box is only ever a new entry: the time stamps itself on the trip's clock, **New patient** | **Return** make it a case study, **Next entry** (Ctrl+Enter) files it. The list under it (newest first): tap a row's words to change it where it sits (its own field and pair; emptying the field puts the row's words back), its time, or remove it (Undo). Entries are records of her private **study library**, NOT trip data: IndexedDB `lcm-study` + localStorage `lcm-study-outbox` (two copies on the device, each made good from the other; the store is never written before it is read), never `lcm-me`, never a `daybook*` key, never the clinic's cloud or backup file. The state line says "On this laptop only · N", "One copy on this device" whenever a copy is missing, and has **Back up** (`LCM-study-YYYY-MM-DD.json`). No cloud copy yet (step 1b). The session's old Note row shows only while it holds text. Deleting a session with entries asks first; deleting a whole trip does not (the entries stay stored). Code: `phStu*`, `.ph-stu-*`, `data-stu-*`.
- **Her file**: a step per trip in her Life group, ONE joined tab bar: Prepare (six area tiles + the to-do table; while away
  "Today": day n, a gold-ringed **Next / Then** card (the next travel strip or session, its venue in Chinese and that venue's
  solid Driver card), the rest of the day in time order, the hotel in Chinese + Driver card, the day the clinic opens again) ·
  Travel (flights, each end in its own clock; home's clock is Sydney's from the time-zone database, `phTripHomeTz` /
  `phTripZoneOff`, never the computer's, which she sets to the trip's clock while away; hotel; getting around) · Docs ·
  **Plan = the trip's program** (her 2026-10-30 picks, `mocks/trip-program-full-mock-2026-10-30.html`): desktop = a week bar (Mon–Sun weeks of the trip's days) + one solid Add + a
  **week grid** (rows: breakfast = her own Me meal, a tap opens its card · travel to the first session · Morning · travel between
  venues · Afternoon · back to the hotel · Evening = hers; a full day spans Morning to Afternoon; flights as strips; an empty
  Morning / Afternoon / Evening cell adds into that part of the day). A **card** = its kind's tag (Observe · Lecture ·
  Conference · Ceremony · Site visit · Case review · Mine, `PH_TRIP_KINDS`), the program notes that apply as icons, teacher + 中文,
  time, venue. Travel strips are worked out on read from the venue (how + minutes from the hotel, `phTripLegs`): in the grid the
  icon says the way and the word sits in the hover. A tap opens the session under the grid (kind, day, times, What, Teacher +
  中文 or Where + 中文 for hers, Venue + 中文 + Driver card, Getting there, its notes, a note, its own photos); a day heading
  opens the day (Add to day n, the day note, photos). Two folds under it: **Venues** (the hotel, then each venue: name, 中文,
  Walk / Shuttle bus / Taxi / Metro + minutes, sessions, Driver card) and **Program notes** (a note On a kind or a venue, the
  sessions it reaches; the Pack line with Prepare · Pack · n). Phone ≤640 = day chips + the day in time order, the session
  opening in place, the folds stacked. Trip data: `venues`, `rules` on the trip; a plan row carries `k`, `sl` (am · pm · full ·
  eve), `who` / `whoz`, `v`, `e`, `note` (`PH_TRIP_PLAN_KEYS`) · Clinic (trip-day bookings with Move =
  the booking's own Edit; herbs running out while away with Dispense; fertility Timeline items opening or closing on a trip day with
  Open; "Message the N booked patients" into the one composer) · Guide (Nanjing only). A phone during a trip opens on its Today a
  moment after load (only while still on Appointments with nothing open).
- **Calendar** (calmer on her 2026-11-02 picks, BUILD-NOTES "Calm week"): one quiet line across the trip's days in
  the row above (white, a thin line, the trip's colour as a dot; "day n of N · <city> time" once she has flown; the count of
  bookings in a grey ring; a tap opens the trip); trip days plain white, no stripes, the day names grey; flights as her items
  (card: Open the trip); program rows all ONE teal on the calendar (the observation kind's; her own rows in the trip's colour),
  over their part of the day when they have no times, the card naming the kind and the venue + 中文 with Plan opening that
  session; the trip page keeps the kinds' colours; trip to-dos as tick chips on their due day; a small grey plane on a booking on
  a trip day (`phTripAwayTagHtml`, no red).
- **The night before** (Settings · this device, "Trip program, the night before"): at 8 pm in the trip's city, while LCM is open
  on the phone (even in the background), one notification for the next day's first session (venue + 中文, when to leave, its
  notes) and one for a shuttle bus between venues; a tap opens that session on Plan (sw.js `TRIP_OPEN` / `#trip=`). Once per day
  (`daybook-ph-trip-ntf-sent`).
- **Me drawer**: Trips; trip to-dos tagged with the city ("by <day>", a tap opens the trip); the one-time Bring in from the old
  Nanjing app (IndexedDB `book33-nanjing`, read only; the c5-nanjing app is set aside, untouched). **+ then Me**: Trip (Name, From,
  To, City, a time zone filled from the city, Colour). Photos in her record's photo store (kind "other" + `trip` + `tday` /
  `tpart` / `tses` for one session; all four ride in backups, `PH_REN_BACKUP_FIELDS`), the one viewer opens them.
- **A trip pauses her routines**, by itself, from her flight out until she lands home (no flight = the trip's whole days). Meals and
  a routine ticked **Keep on trips** (`kt`, in its Edit) keep going; one-offs, birthdays, her herb doses untouched. `phMeOccurs`
  (the one read) = `phMeOccursRaw` minus `phMeTripPauses`, so grid, meals, drawer, This week, Habits and Health follow it.
  `phMeTripPausedOn(k)` lists the paused (no chip on the calendar since her 2026-11-02 "birthdays only" pick): the drawer's
  one line "Paused · back <day>" with the list under All (`phTripPzRowHtml`), "away" on This week. A fast week holding a trip day
  reads "–" and neither counts nor breaks Weeks on aim.

## Mine hub (her week, work, money, fitness, code)
Five steps on HER record (the one in My profile): **Fitness** in Body (Steps + weight + Weigh in; its routine dots are Habits'; see
Fitness + Exercises), the rest in Life.
- **Week**: Mon–Sun table; a tap on a past day or today opens its journal under the row (a timeline written from the day + her note,
  kept as she types); her to-dos beside it by area, dropdown All · Work · Money · Code · Fit · Home · Travel. A to-do tick stores
  when (`done` = the time). **Folded columns** (her picks 2026-10-29, the Me audit): a column with nothing this week folds into a
  **+ n more** chip beside the week bar (Income until a price exists — the income tile hides too; Steps until 3 typed days; Herbs
  until a dose; Code until code hours or a plan); a column with data always shows; the chip opens them all (`phHubColsOpen`; the
  journal row's colspan follows, `phHubWkCols`). The "n visit types without a price" banner reads "… · Prices" and lands on the
  first empty price with Show $ on (`data-hub-prices`). **One note:** on her record the note under a day IS Today's visit's note
  for that day (her main complaint's, 140 characters, `phCxTypeSave`); an older Week note (`d.jn`) still reads where the record
  has none.
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
- **Health** (Fitness's Health tab since 2026-10-28; "i want it to count towards my healthcare"): her events titled Chiro / Physio / Massage / GP / Scan count
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
- **The band's Habits count** = the habits that tick themselves (Steps, Fasting, Herbs, Movement / gym, a meal's own; `phHabSelf`,
  `phHabTodaySelf`; her pick 2026-10-29); the Habits page and its rail mini keep every habit.
- **Steps** (`d.stp[day] = {n}`): typed from her watch (a web page cannot read it) in the band, the Me drawer's Steps row and This
  week's Steps column (days on goal in the Week row). Fitness: a steps tile + the Steps card (ring, today's field, days on goal,
  average, best, 14 bars against the goal line). Goal 8,000, ✎ changes it (`hubset.stg`, 500–100,000).
- Data: `d.hab`, `d.stp`, `d.idn` in `PH_HUB_MAPS` (entry by entry). Code: "HABITS + STEPS" (`phHab*`, `phStp*`).

## Fitness + Exercises (C22's fitness, moved in)
**Only on her own record.** C22's Fitness, moved in so she can plan and log her exercise (her word); all of it is live.
[BUILD-NOTES "Fitness + Exercises"]
- **Fitness = one page, four tabs** (her body week, synth22 2026-10-28, her "Combine" of three mocks; BUILD-NOTES "Her body week"):
  **Week · Exercises · Health · Progress** (`phFitTab`; `.ftabs`). Exercises and Health left the rail; every door to them
  (`phMineOpen("hub-ex" | "hub-health")`, the Gym card's doors, the Body heading) lands on Fitness at that tab (`phFitTabNorm`,
  run by `presMineCycleNorm` and `presAssessTabRefresh`). The Exercises and Health tabs are those whole pages inside it
  (`.ph-fitx`). **Week tab:** ‹ week › (`phFitWo`, back as far as she likes, one week ahead) · "n of m this week" · **Table |
  Calendar** (`phFitView`). Table (`phFitWkTblHtml`, days across): **Plan** (a type or Rest, any weekday) · **Booked** (that
  weekday's time; tap = two time fields + No set time, kept on Enter, a tap away or leaving them; the clinic's hours under it, or
  "Clashes with 10:00 am patient" in amber: it still books, her pick) · **Workout** (a template per weekday; Today starts from it;
  the day's mark beside it, her pick C 2026-10-28: today a 32px tick she taps, a day done a green tick, the two-minute version a pale
  one, away a plane, nothing else; there is no Done row) · a row per rehab routine (the same marks and its time) · **Health** (that day's visits; a tap opens
  the Health tab) · **Steps** (today a field). Row names Workout / Health are doors to their tab. Phone (≤640): the days run down
  (`.fwph`), today open in place with the same fields, a tap opens another. Calendar (`phFitCalHtml`): the week as hours (6 am to
  10 pm, wider when a block sits outside), the clinic shaded (first patient to last from Appointments, else her clinic routine),
  workout / rehab / health blocks (a clash amber); a tap on a time opens a menu (her workout types · Chiro … Scan · Rest) that books
  it (`phFitBook`: the plan and the time in one save; `phFitHlBook`: a visit event); a workout or rehab block drags up or down in
  15 minutes for that weekday (`data-fit-cdrag`). Under the week: Today, Steps + Weight, Steps plan, the posture tip. **Progress
  tab:** Goals, Personal bests + Weekly volume, Progression, Upcoming + Recent.
- **Booked times live on the routine** (`it.wt = { weekday: { s, e, tp } }`, her pick "a time per day"): every read of a
  routine's day time goes through `phMeExO(it, k)` (that day's own change over the weekday's time; `phMeDayItems`,
  `phMeTripPauses`, `phHlRows`, the Me form), so Appointments draws each weekday at its own time. The Me form's "whole routine"
  time clears the weekday times (keeps the workouts); a drag on Appointments offers **Every Thursday** (not Every day) for a weekly
  workout or rehab (`phDgMeDrop`, `phFitWtOk`); a weekday moved to another type keeps its time (`phFitPlanApply`).
- **Old Fitness page parts still there:** Bring in (her C22 fitness, once: library, templates, log, planned, stairs, week plan; C22's
  keys are READ, never written) · a posture tip
  (`PH_FIT_TIPS` = C22's BIOMECH_TIPS word for word + her session / pain notes ≥ 15 characters; C22's weighting and date-seeded pick;
  ♥ / ✕ with Undo in `d.fbt`, `shown` keeps a ♥'d tip all day; C22's `book33-biomech-ratings` READ, never written) · the **Plan**
  row = her calendar's routines (`phFitPlanApply`: a day set to a type moves that weekday to the routine of that type, made in
  g-fitness if none; done days stay; the past never reads as missed; Undo) · Steps + Weight · Steps plan (walks + stairs, under the
  Steps card) · Today (type, template, sets, timed hold, rest ring, pain + stars, ▶ Workout Mode; Finish also ticks today's routine
  of that type; an open exercise starts with **Name** and **Type** rows, the same library write as its Exercises card, so a rename
  shows everywhere; a blank seconds box shows the 30 the timer uses, a right side the left's, `phFitSetShown`, templates too; her
  2026-10-29 "how do i edit this?") · Upcoming + Recent · **Goals** (one per exercise: reps / hold / weight / tick, `d.fgl`; reached on a ticked set =
  toast + buzz + gold; a flag on Today's row, in Workout Mode, in the exercise panel) · **Personal bests** · **Weekly volume**
  (8 weeks) · **Progression** (one exercise's last 7 sessions).
- **Week rules** (no stored data): a rest day = a day her plan has no workout on (`phFitIsRest`, memo on `phMeS()`; her 2026-10-28
  "make this editable": Wed + Sat are no longer fixed, any day can be Rest or a workout); deload weeks kept (her pick; `PH_FIT_DL`:
  18-week cycle from Mon 29 Dec 2025, weeks 5, 9, 14, 18: Monday light, Sunday extra rest;
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
- **Exercises** (Fitness's Exercises tab since 2026-10-28, `phHubExHtml`): her library (search, groups, Hide) + workout templates; C22's small figure on
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
**In the backup file** (her pick): the Me store's data rides in the backup file as a sibling key `me`; Restore shows "Your own things" as its own row, which only ever adds what the device lacks (`phMeMerge`), never replaces anything newer, and alone needs no reload. The on-device snapshots still hold the pharmacy pair only.
**Only on her own record** (`phFastIsMe`); every patient's record is unchanged.
- **Me chip in every page's top bar** (`phTitlebarMerge`: `.ph-tbm-me`, the count of today's open things; phone ☰ · title ·
  primary · Me · ⋯, computer Me · ⋯ · primary; Appointments keeps its own toolbar chip). The drawer sits under whichever top bar
  shows (`phMeDrwTop`).
- **Her card leads the drawer** (`phMeCardHtml`): initials, name, "Day n · phase · Fasting h:mm"; a tap = her record, ✎ = change
  the name. Each drawer heading of hers ends in › to its page (`phMeH4` → `data-ph-me-go` → `phMineOpen(tab)`): Today's meals →
  Diet (Meals), Herbs → Herbs, To-do → This week, Trips → the trip, Birthdays, Routines; the rows stay today's ticks.
- **Her rail: Body · Life first** (`PRES_MINE_RANK`, grp `body` / `life`): Body = Cycle, Tongue, Pulse, Abdomen (her 2026-11-03 "tongue and pulse tab?" + "Add Abdomen too": the
  same exam pages with no Care Plan needed, `phExamPageHtml`; the row says the day she last charted it, "Today" / "3 Nov"), Meals
  (her Diet page; Fasting is off the rail, opened from Meals' History ›), Herbs, Fitness (its tabs hold Exercises and Health), Habits, Log; Life = Week, Work, Money,
  Code, trips, Birthdays, Routines; then her file and the visit steps; her bottom group reads "Clinic dated". Cycle, Tongue, Pulse and
  Abdomen leave the Plan step on her record (`presMineCycleNorm` turns plan + cycle / tongue / pulse / abdomen into profile + the same page,
  so every door lands there); Diet leaves Log.
  **Folded pages** (her picks 2026-10-29, the Me audit; `phMeRailFold`): a page she has not used sits in a "⋯ More" row of its
  group — Life: Code (until a plan), Money (until a price or a bill), a trip (until it runs or is within 30 days); File: Supplements ·
  Blood tests; Clinic: Photos · Messages · Appointments; the page she is on never folds; one More row open at a time
  (`presFlowMoreOpen` = its key; "1" is a patient's Patterns · Timeline row). The phone's sideways row is unchanged (every page a tab).
  Phone's sideways row: Body · Life · File · Clinic captions. **Birthdays** (by month, + Birthday) and **Routines** (ROUTINES
  TABLE, her 2026-11-03 picks: one table, a row a routine with the same name joined, this week's days across with each run's
  start and end, today gold, the rows under Work · Health · Self-care · Travel · Home · People · Other by her colour Mode; a time
  opens that routine; the phone keeps the names while the days scroll; + Routine) are pages (`phMeBdaysPageHtml`,
  `phMeRtsPageHtml`); Birthdays' rows and the drawer's routines stay rows (`phMeBdRowHtml`, `phMeRtRowHtml`). Next on one of her pages goes to her next page; her last one goes to the file.
- **Her Body pages share one look** (her 2026-11-02 "…look like the come from the same app", mock A, her 8 picks; CLAUDE.md rule;
  BUILD-NOTES "Body pages, one look"): Start (fasting), History ›, + Formula, Dispense, + Habit, Pregnant?, Workout Mode, + Add
  exercise, From my exercises › are the 6px Button in her record's colour (one solid each page: Start / Stop, + Formula, + Habit,
  Workout Mode); Fitness has no "Fitness" word (the rail names it), its bars, kinds and body areas are joined 6px bars, its
  Today and Steps plan are capitals labels; Habits' head is "n of m today" + the solid + Habit; Meals' today row is the gold tint;
  no frames round Meals, Habits, Fitness' cards or the Cycle day card; Cycle's months, Fitness' week and the day card's ‹ › are
  one circle. On the phone the same, at its own sizes (Meals' rings without their box, Cycle's bar the joined bar).
- **Opens at Meals** (`presAssessFirst`; her 2026-11-03 "when i open my profile i want the first page to be meals page", This week
  before); the "This visit · Next up" box is hidden on her record.
- **Her today things sit in the name's row on every page of her record** (her 2026-11-02 "merge 2 rows", pick F; `phMineBandHtml`
  inside `.ph-pres-band.ph-mine-head`, repainted by `phMeDrwPaint`): no words, each an icon in a ring that fills (`phMineRing`, green
  when done) with its count: the drop + CD n (no CD in the band's line then), fasts n/aim (fasting: tint, h:mm, the clock hand turns),
  herbs, meals, Steps (tap to type), Habits, her next habit, next patient today; a ring sweeps and a count rolls on change. Search is
  a 32px circle that slides open over the row. Phone: the name line, the today line under it scrolling sideways. LIVE in build
  20261102-145000.
- **This week has Cycle (CD n), Meals (had of planned) and Herbs (taken of due) columns** (`phHubDay` `cy` / `mealsP` / `hb`), and
  Steps typed in it. Below 1500px the To-dos sit under the table (her 1220px window included); the phone keeps the sideways-scrolling
  table (836px).

## Communications / messaging
Tone and voice: code3 above. **One composer** on the patient's Messages page (a bubble + slim band, synced to the plan, its phase
and her Fang Bing Ren answers); "Copy message" copies the message only [The Messages composer]. **A send closes due and overdue rows only, never a check-in, review or follow-up not yet due (audit 2026-11-06). Each send leaves one "sent today" mark** (her 2026-11-01 picks, idea 11 of the 29 Oct audit;
BUILD-NOTES "Messages: one sent mark"): the Text / Messages / Copy / Email tap writes one entry on the patient's contact log
(`phMsgSentMark`), closes that patient's due and overdue rows on Communications → Due (the Dashboard count and the menu badge
follow), leads the Messages band with "✓ Today · Sent · Review by Messages" (`phMsgLastSent`) and offers Undo in the one toast;
the check-in panel's taps leave the same mark and its row still closes on Done. **The page's strip is Due + More ▾** (`phCommSectionStripHtml`, her 2026-11-01 pick): Compose · Templates · Prepared · Sent sit in the More menu with their counts, the one open shows beside Due, and the page always opens on Due. **The groups fold** (`phMsgGroupsHtml`): the
plan's own groups + Herbs stay open, the rest behind one "All · n ▾" chip (a row on the phone) that unfolds them below. **Outgrown rows leave Due** (her 2026-11-01 data-check pick): a review or check-in whose patient got new herbs after it is skipped when `phFuContactRows` builds the list, never written, so the Dashboard strip and the menu badge agree. A message offer fires on any phase
change (manual or cycle/IVF cascade), evaluated at render time; a session-only map (plan + phase + `sinceKey`) stops repeats. "My
Cycle — gone quiet" lives on Communications' **Due** tab, never the Dashboard. The Check-in panel is its own composer. The
All-templates hub holds message templates, letters and the plan template manager. Message dates carry no year; `{{nextAppt}}`
reads the date in her words. Compose's **Private health rebates** list (her 2026-10-30 pick) is where a patient's fund and
None / Low / Good / 50%+ level are set: every active patient a row, good rebates first, a Find a patient box; "+ Add everyone
with good rebates (N)" reads it. BUILD-NOTES "Patient details extras". **One look** (her 2026-11-01 Communications audit,
BUILD-NOTES "Communications page audit"): Due's filter chips are one joined bar, names are chips, Check in / Review the Button;
the check-in's They are / Concerns / Next (and, on the phone, the composer's open group) are joined two-across blocks; the
narrow check-in page opens Change / How did it go as rows; an empty section is two words + the chip that fills it ("Nothing
prepared" + Compose).

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
(`phCxPnlHtml`; plain on the card since her 2026-11-02 "E Plainer", LIVE 20261102-142600: no box, no side line, no boxes inside) holds the asked row
large: its name (it wraps, never cut) with ✎ Note · ⋯ Details · › Next as three 32px circles on the same line (each name in its
hover; › solid, an open one solid, a second tap closes it), the Goal (one tinted field with a flag; the Goal lives only here), Today
(the slider and its plain number), the body drawing; on a return visit its chart (`phCxRowChartSvg(s, true)`: the line, its dots
and each score over its dot, no grid or axis, the dates in the hover; it runs to today) and last visit's note on one ✎ line; today's
note shows as its own line, its box a tinted field. No area label, Main tag or side tag (the table row says them; the side is in
Details with the detail, how long and Move baseline), no Baseline · Last · Since line. The asked row in the table is the gold tint
alone, no left line (her "Tint only"). A tap on a row puts it in the panel; a score moves the gold row and the panel on. The count is said once, on the Ask step: no "Asked n of m", no gold
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
folds into the "Skipped" line and counts as done (`phTodayPartOk`). **Face score** (her 2026-10-29 pick A, `mocks/face-score-due-mock-2026-10-29.html`): for a face palsy patient (`phFpApplies`) a
gold tile beside Tongue · Pulse · Abdomen on the visit the score is due (`phFpDue`, every 4 visits; "score now" before the first),
the last score faint under it; ✓ with today's % once scored; not there on other visits; it opens Profile › Checklist (`phTodayFaceOn`). Quick assess shows 8 questions in 2 columns on Today's visit
and Fang Bing Ren. A visit is finished by ONE button, **Done · Copy for Cliniko** (Today's visit's Treat card and the Treatment band; it saves
through `presAcuLogNow`, copies and marks the visit copied; "Ending a visit" below). **"No acupuncture — herbs only today"** saves
`noTreatment:true`; every reader of `rec.acuSessions` (the printable record, Patient Journey, the Visits table, the quiet-patient
detector, **session-package counting**) branches on it.
**Copy notes** (her picks; code "COPY NOTES", `phCn*`): one tap copies today's visit as labelled lines for her Cliniko treatment
note (date · visit · cycle day, Scores, Tongue, Pulse = the Note tab's text, Abdomen, Acupuncture = points + press + therapy
lines (no Acupuncture therapy words beside points), each Formula with its herb lines + Total + Dosage · take-days · lasts N days) and shows what went in a box under the button
(✕ closes). The clipboard gets the text and a formatted copy with every label (the word before the colon: Tongue, Pulse, …) in
bold, so a paste into Cliniko's note keeps them readable (her 2026-10-29 ask; `phCnHtml`); the box shows them bold too. Every line
is that fact's own read; a part with nothing today is left out; the formula = dispensed today, else the one
Dispense opens. Doors: the Today's visit step bar, Done · Copy for Cliniko, the ⋯ menus (Care Plan / Treatment / Dispense), the
toast after "add another session".
**Ending a visit (her treatment-session audit picks, 2026-10-29; BUILD-NOTES "Treatment session: one button ends the visit"):**
Start visit (Up next, the booking popup; `phVisitStart`) opens today's booking where an open lands (Today's visit for a return
patient with a plan); a herbs-only booking (`phApptHerbsOnly`) opens on Dispense. Worth a look's two checks are one "Still the
same?" line when both are due (Nothing new stamps both · Changed opens the two). A missing sex, birth date or phone is a line there too (`phTodayAskHtml`, the Patient details fields and handlers; her 2026-11-01 data-check pick), and Today's visit opens on that line for a patient without sex and birth date. Today's visit's Treat card ends with the visit's one
**Note** (`data-visit-note` = `presAcuComment`, the same words as Treatment's Note cell) and **Done · Copy for Cliniko**
(`phVisitDone`): saves today's visit when nothing is saved for the plan today, copies, marks `session.copiedAt` only after a real
copy ("today · ✓ copied" on the row, "✓ Copied" on the button), and the toast names the next visit with **Next patient ›**
(`phVisitNextAppt`). The copy's **Note:** line (`phCnNoteText`) = Ask her's words + the note + any Compass row note written today.
Treatment's therapies block shows the phase's Points and Press tags as ticks (a pain patient's points stay Musculoskeletal's); the
Acupuncture therapy chip has no text box. **The visit saves itself (pick 2):** a visit left without Done on a booked earlier day is
filed as that day's visit the next time the patient opens (`phVisitFileStale`, before the draft restore): the same save as Done
(`presAcuLogNow` with `date`/`at`), that day's booking, the time she last worked on it, and that day's Tongue / Pulse / Abdomen from
the pages (`phVisitFileStaleFnd`, only parts the visit lacks); toast "✓ Wed 28 Oct visit saved". A draft with no booking that day
stays as it was. **Same as last visit (pick 3):** Today's visit's Look line leads with one **Same as <date>** ("Same as last visit"
when the parts' last days differ) before + Pain · + Ask her; one tap carries Tongue, Pulse and Abdomen into today, each from its own
last day, through the pages' own Same as write (`phTodaySameAll` → `phFvSameDo`), only parts not done or skipped today; a failed
save keeps its warning (no "✓" over it).

**Ask her** (`phAhHtml`, a plan-stage tab: one card per topic, tap-to-pick answers, the Usually | Right now switch, the Top 3
strip, Standing bars) **carries the body figure** (her 2026-10-31 pick, idea 5 of the 29 Oct audit; BUILD-NOTES "Ask her gets the body
figure"): `phAhFigureHtml` = Medical history's body (`phHxSvg`, head to knees, front only) lit by the answers on screen: a topic's area
(`PH_AH_AREA`: bowel, stomach, head, mouth, throat, lungs, bladder, skin, whole body) or an answer's own (`phAhAreaOf`: hands, heart,
stomach). The organs light as on Medical history, the other areas are soft spots in the page colour, a skin / whole-body answer glows
the outline. From 1280px up it is a sticky column beside the cards (`.ph-ah-split`), under that the footer's first column
(`.ph-ah-foot.fig`); its chips are the one list of what is on (the "Ticked on Fang Bing Ren" list is gone), a tap on an area or a chip
spotlights it (`phAhFigPin`), the heading names the version lit.

**Findings charts** (tongue / abdomen / pulse) are the app's own tappable diagrams with a "brush" (pick a sign, then tap its
regions). The exam pages are the ONE entry; `phExamMirrorToday` copies today's exam into the dated record. Read every finding
through `phVisitFndRead`. **Every day is kept (her 2026-10-29 picks, BUILD-NOTES "Findings per visit"):** a chart written on an
earlier day shows today blank (`phTngStale` / `phAbdStale`, `phTngToday` / `phAbdToday`; the Pulse already worked this way) and the
first write of the new day moves it aside (tongue → a dated review flagged `page`; abdomen → `rec.abdomen.hist`; pulse →
`constitPulse.hist`), nothing deleted. `phFndDays(rec, part)` is the ONE read of those days (a visit's copy, a moved-aside chart,
a photo review, the stale live chart; `phFndLast` = last visit); every page that shows a finding reads it. Under each exam page's
chart sits the same block (`phFvHtml`): the strip of the last 6 days with a finding (small drawing + date + tag, Today at the end,
"+ n more"), the tapped day's cell (drawing · date · ago · words · "Same as <date>", which copies it into today through the
part's own door) and a "Since <date>" line (+ new, − gone, "unchanged"). Today's visit tiles show last visit's date and words
faint under today's. A **Findings trend** sheet (Grid | Trail) shows the same days for tongue and abdomen.
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
whole-abdomen value. Full / distended sits only on the whole abdomen, above the umbilicus (epi, hypo) or below it (lower, iliac): never the
umbilical row or flanks (`phAbdOkAt`; her 2026-11-09 "almost never the umbilicus"). It draws as one soft rose glow, breathing, fading to
nothing at its edge and round every place's word (`phAbdDistLayer`, her pick A; no dashes or rings): above = costal margin to the
umbilicus, below = umbilicus to the pubis, whole = one glow over the trunk with the outline pushed out at the sides; the side view's belly
line swells there to match. An old mark saved at the umbilical row still draws as a band. The chart's basic drawing (outline, ribs, rectus,
bones, dotted lines) sits back, Ghost-faded (her 2026-11-09 pick; `--abd-f` .28 inside, `--abd-fs` .55 outline; the `.ro` minis keep full
strength; the words and every finding stay full). Motion on the interactive chart only (`.ph-abd3`; her 2026-11-09 picks, mock
abdomen-fade-motion-mock-2026-11-09.html; all off under reduced motion where it moves): hover a place and it lights, its band on the side
view lights and the other words dim (hover a band: its places; `phAbdHl`); a tap sends rings from the finger, slower and wider the softer the
wall (the chart's Tension, `phAbdRipple`, carried through the repaint by `phAbdTap`); a warm place sends up heat, a cold or cool one drifts
frost (`phAbdTempMotion`); a Today / Both / Last bar under the front chart (`presAbdView`, `data-view`) fades one visit's marks out; the marks
sweep in once per open of a patient (`phAbdScanKey`, `scan0`, each mark's `--sd`), with a Replay circle beside the bar. The side view moves
with it (her "make the side view animate too"): the same scan line, its wall line drawing top to bottom as the line passes, its sounds and °C
strips sweeping in, warm / cold rows sending up heat / frost inside the belly (`phAbdSideTemp`), and Today / Both / Last fading its marks
(the wall line and the rows stay). Seen ends with one tap "whole abdomen distended" (`distwhole`, her 2026-11-09: full / distended on the whole belly in
one tap, on while that mark sits; not a place's sign, so no popup lists it). The Abdomen tabs read A–Z (her 2026-11-09 "make the abdomen tab labels A–Z too"): the group tabs on the page, in the popup and in the Fang Bing Ren chip rows are Feel · Seen · Sounds · Temp · Tension (`PH_ABD_GRPS_AZ`, a sorted copy; `PH_ABD_GRPS` keeps Seen first, still the default tab), and the tabs under the charts are Fang Bing Ren · Note · Summary (Summary still opens first); Today / Both / Last stays in time order, and the chips inside a tab were already A–Z (Tension soft · medium · hard is a scale). Seen has "flat" (whole belly, no place); Temp = cold · cool · warm in BLUE / PALE BLUE / RED (temperature
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
side, still, always on (`phAbdLast` = `phFndLast`, the newest earlier day with a finding in any store; `opts.prev` on both charts, `phAbdGrey`), with a
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
**Pulse:** each tick is dated; each new day starts blank (since 2026-10-29 Tongue and Abdomen work the same way, and the strip of
kept days sits under every chart: "Findings charts" above). The chart is HER TABLE (her pick): 6 columns, 3 PRIMARY (Cun / Guan /
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
signs on hover, `phPulseChipLinks`; no sign list on this page). The Summary's rate line is the fact alone since 2026-10-29
("Resting rate 78/min · within | above the range for her age", `phPulseRateLineHtml`; nothing until a rate is typed; the Bilton /
Dr Shen reference sentence is its hover). **Pulse in action** = "▶ In action" on the legend line: the beat
is drawn over the chart's own cells (`phPaOverHtml`, the concept pictures' runner as `PH_PP.SC.pulse`), measured off the chart's
own column and row labels (`phPaLay`, again on a width change); today's arches in the chart's blue lift by amplitude at her Hammer
at-rest rate (72 when none, a Slowed chip), following the Hammer rhythm; the chart's own today drawing steps aside while it runs;
still under reduced motion. Every quality has its own drawing (`phPaModel` picks the shape, `phPaDraw` draws one frame). Amplitude
is HER ARROW SCALE: ↓ Soft / ↓↓ Weak / ↓↓↓ Flat, ↑ Slight pounding / ↑↑ Pounding / ↑↑↑ Robust pounding (chips, chart glyphs and
arch height all follow the count). A box holds ONE strength (her 2026-11-04 "weak ampitude is opposite to robust pounding strong etc.
only one can be selected"; her picks; `phPulseIsStrength` in `phPulseCellToggle`, the one door): the six arrows, Feeble-Absent and
Forceful replace each other, a box at a time, so Heart can read ↓ at Qi and ↑ at Blood; Amplitude Change and Reduced Substance stay
free; a box already saved with two keeps them until one is tapped. Thin / Narrow is one chip; no Loose; Blocked = walls both sides + her loop; Ropy = thick wiry
line; Small compressed holds up to 3 per cell (`n` on the mark). DEEP and FLOATING ARE READ FROM THE DRAWING (`phPulseAutoDepth`,
never stored): below the position's normal depth = Deep, Skin row = Floating; their chips light up (`.auto`) and Patterns, Fang Bing Ren and
the SHPD notes read them as if ticked. The pulse knowledge base (`PH_PULSE_KB_SEED`) only shows hints, never writes. Bell's palsy
is scored none / partial / normal (don't change the scale).

## Timeline & intake form
**Timeline** is a rail item right after Fang Bing Ren, on IVF / Natural fertility / Pregnancy plans only (`phTlKindOf`); since
2026-10-29 (her audit pick: 1 active patient used it) it sits with Patterns · Diagnosis under the rail's folded "⋯ More" row
(`presFlowMoreOpen`); "done" = nothing overdue. The Today's visit band's Stims / Egg collection / Transfer / Scan ~date → Heartbeat <date> facts open it. The Heartbeat scan row (and the Pregnancy plan's Dating scan) is Done on IVF history's scan, "from IVF history", estimating ~transfer + 30 until then. It reads IVF history, Blood tests (a result on its line is drawn as the small low–high bars with the dot, `phBldMiniHtml`, her 2026-10-31 pick) and the pregnancy test (nothing asked twice) and takes month/year
dates on Schedule. **The intake form** arrives pre-filled from her file (details, cycle, Yes / No history) and can carry Fang Bing Ren
questions (`PH_INTAKE_FBR_P` must match `PH_FBR_Q.p`); the link dialogs include a text message to copy. Creating a link never
depends on the database SQL.
**The medical history link** (her picks): every link carries the app's own question list (`prefill.qs` from `phIntakeQs()`), so a
question added to `PH_HISTORY_GROUPS` is on the next link; intake.html's copy is only the fallback. A Yes opens a details box on
its row (it lands as that row's note, "Form <date>" tag). Family history has Yes / No / Don't know ("unsure", a grey
"? Don't know", never a Yes) and one "Unsure about anything?" box (`rec.historyGroupNotes`, shown under the group).
"Taking supplements" Yes opens rows of name + dose that land on the Supplements page (a name the list knows turns that row on; any other joins
`rec.suppOwn`). The same link reopens with the patient's answers and "Send again" once `supabase/intake_resubmit_setup.sql` is run
(90 days); a resend shows in Intake review as "Updated" with only the changes. `rec.medicalHistoryNotes` has no box: older forms'
notes in it show under Medication & allergies.
**Other condition** (her "include a other option to add unusual conditions in medical history"): "+ Other condition" at the end of
General health and of Family history: type, Add (or Enter) and it is its own Yes row with an Added tag, a ✕ (Undo in the toast)
and its note. Data `rec.historyOther[k] = { n, fam, at, src }` (k = `ox_…`); its answer, note and Form tag are the ordinary
`rec.history[k]` / `historyNotes[k]` / `historyNoteFrom[k]`, so it is a Yes everywhere: `phHxApplicableItems` (the counts,
profile search), the figure (a whole-body chip), the condition chips, Today's visit, the Care Plan History row, the
herb caution (on its own words). The same words as a list row answer that row instead. Not in Allergies only. The link has
"+ Something else" in the same two groups (`history.others = [{ n, f, note }]`); it comes in as an Added Yes row, the details on
its note tagged Form; a later link brings back the patient's own conditions (her own typed ones never go to the patient).

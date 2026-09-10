# Send the intake link from the Medical History screen — 2026-09-10

## Her ask, verbatim

> allow me to generate a sms to send patient link so they can fill out their
> medical history

Sent with a screenshot of Emma Lloyd's Medical History screen — "0 of 23
asked".

## What already existed (audited before building, not assumed)

The whole feature already existed, built 2026-09-05 — see
`project_pharmacy_bigask_2026_09_05` and `reference_intake_link_from_screen`.

- `phIntakeGenerate()` creates a row in Supabase's `intake_forms`, returns a
  link to `intake.html?t=<id>`.
- `intake.html` is a real, complete patient-facing form: sex, DOB, phone,
  email, address, then a **"Medical history"** section (general health,
  medication & allergies, family history) and, if female, **"Reproductive &
  cycle history"** plus cycle/fertility detail — 26 tri-state Yes/No items
  total, matching `PH_MEDHX`/`PH_COND_GROUPS` in the main app.
- `phIntakeMsgText()`/`phIntakeSmsHref()`/`phIntakeOpenMessages()` build the
  SMS text and hand it to her phone's Messages app in one tap (phone), or
  copy + open Google Messages web (desktop) — the same pattern as the
  check-in panel's tel:/sms: links.
- Submitted answers land in an **Intake review queue**, never auto-applied —
  she compares against the existing record field by field and picks a winner
  on any conflict (`renderIntakeReviewScreen`), matching her "compare screen
  first" 2026-09-05 decision.

**The gap was not the feature. It was where the button lived.** "Send intake
link" sat in the ⚙ topbar menu on the Prescriptions page only — reachable
from nowhere near the screen where the need is actually felt (a patient's own
Medical History, at "0 of 23 asked"), and it made her retype or pick the name
from a list even though she was already looking straight at it.

## What was built

- `phIntakeOpen(prefillName)` — an optional name. When given, it skips the
  "who's this for" step and calls `phIntakeGenerate()` immediately. The
  generic ⚙-menu call, `phIntakeOpen()` with nothing, is unchanged.
- A **"✉ Send intake link"** button on the Medical History header, next to
  the "Saved…" line, calling `phIntakeOpen(presHxScreenName)` — the exact
  patient already open.

One tap, from the screen where she'd actually reach for it, straight to a
link with the SMS button ready.

## Status

Built and exercised 2026-09-10, with the cloud client stubbed so the test
never touched Supabase or her real localStorage:

| Behaviour | Result |
|---|---|
| Button appears on the Medical History header | present, titled with the patient's name |
| Clicking it skips the name-entry step | `phIntakeNameInput` absent from the result screen |
| Link + Text/Messages actions render | both present |
| The generic ⚙-menu path (no prefill) | unchanged — name step still shown, nothing auto-generated |
| Her real store | unchanged before and after the test |

See `project_pharmacy_bigask_2026_09_05`, `feedback_measure_before_building`,
`feedback_dont_make_her_repeat_herself`.

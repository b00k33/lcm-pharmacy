# Facial paralysis — her spec, 2026-09-09

Captured verbatim the moment she sent it, before any building, per her standing
rule that confirmed wording goes to a file that turn. **Her words are the source
of truth.** Nothing below is my paraphrase except where marked `[note]`.

Prompted by a real patient — Nadia Joud, a facial paralysis case.

---

## 1. Photo tags

> i need photo tags for
> Smile
> eyes closed
> blow up cheeks
> raise eyebrows
> frown

These are the five facial-nerve movements a palsy is assessed on, so a photo set
is a before/after record of function, not appearance.

Current photo types live in `PH_REN_PHOTO_TYPES` (index.html ~36710): tongue,
eyelid, eyes, faceshape, skin, nails, bbt, full, other. Emoji in
`PH_CAP_TYPE_EMOJI` (~36418).

---

## 2. Treatment plan category

> i need treatment plan category facial paralysis
> bells palsy
> ramsay hunt syndrome
> Post Stroke

So: a new **category** called *Facial paralysis*, holding three plans — **Bell's
palsy**, **Ramsay Hunt syndrome**, **Post stroke**. Existing categories are
MSK / Gynae / Stress / Weight (see `project_pharmacy_tp_categories`).

---

## 3. Bell's Palsy Checklist

> **Bells Palsy Checklist**
>
> **Eyebrow Elevation (Eyebrow Raise)**:
> **Eyebrow furrow/frown**:
> **Lagophthalmos (Eyelid unable to close)**:
> **Epiphora (Watering Eye)**:
> **Bell's Phenomenon:  Eyeball turns up and out**:
> **Hyperacusis (Sound Sensitivity)**:
> **Nasolabial Fold Absence**:
> **Drooping of Saliva**:
> **Impaired Articulation, lip compression**:
> **Mastication**:
> **Taste Sensation Loss**:
> **Headaches/Pain**:
> **Whistle**:

Thirteen items. Every one was left with a trailing colon and no value — they are
fields to be filled in per visit, not tick boxes.

And then, separately:

> bells palsy checklist can work on a scoring system

So the checklist is **scored**, and the score is presumably tracked across visits
to show recovery.

`[note]` Not yet settled with her: what the scale is (0–5 per item? present /
partial / absent?), whether every item scores or only the movement ones, whether
there is a total, and whether the score is per-visit with a trend. **Ask, do not
invent** — this is a clinical measure she will act on.

---

## 4. Bell's Palsy Acupuncture Protocol

> **Bell's Palsy Acupuncture Protocol: **
> Facial Nerve (VII)
> 1. **Temporal Branch** GB2 GB3
> 	GB14.15 *Frontalis (Epicranius)*
> 	SJ23 Yu Yao *orbicularis oculi upper*
> 	GB1 Tai Yang *Orbicularis oculi lower*
> 	BL2 *Currugator Supercilli*
> 2. **Zygomatic Branch** GB2
> 	ST2.3 SI18 *Orbicularis Oculi*
> 3. **Buccal Branch**	ST6.7
> 	ST4 *Orbicularis Oris*
> 	LI20 *Levator Labii Superioris Aleque nasi*
> 	Bi Tong extra point *Levator Labii Superioris Aleque nasi*
> 	Inferior to SI18 *Buccinator*
> 	SI18 *Zygomaticus Major*
> 	SI18 *Zygomaticus Minor*
> 4. **Marginal Branch** ST5
> 	Jia Cheng Jiang Mentalis
> 	Jia Cheng Jiang Depressor labii inferioris
> 	Jia Cheng Jiang Depressor Anguli Oris
> 	Orbicularis oris Upper
> 	Orbicularis oris Lower

Structure: the four motor branches of the facial nerve, each with its points and
the muscle each point targets. Points include named extras (Yu Yao, Tai Yang, Bi
Tong, Jia Cheng Jiang) and one positional instruction ("Inferior to SI18").

`[note]` Spellings to raise with her rather than silently change, since her rule
is to keep proper clinical language and I will not overwrite her words:
"Currugator Supercilli" is standardly *Corrugator Supercilii*; "Aleque nasi" is
standardly *Alaeque Nasi*. Her meaning is unambiguous either way.

`[note]` `GB14.15` and `ST2.3`, `ST6.7` read as "GB14 and GB15" etc. Confirm
before expanding them in any UI.

---

## Status

Nothing built yet. Awaiting her answers on scope and the scoring scale.

See `CLAUDE.md` spec numbering, `project_pharmacy_tp_categories`,
`project_pharmacy_photos_section_2026_09`, `project_chapter7_tcm_acupuncture`
(her 361-point reference).

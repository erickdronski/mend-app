# Clinical safety review: relationship-expansion content

Reviewed 2026-07-20. Scope: the eleven new content files listed below, plus the
three render paths that decide whether their safety copy actually reaches a
user. Findings are ranked critical, high, medium. Every critical and high
finding has been fixed in place; the fix is shown under each item.

Files reviewed:
`src/lib/content/tracks-early.ts`, `tracks-queer.ts`, `tracks-repair.ts`,
`tracks-difference.ts`, `tracks-season.ts`, `cards-rel.ts`, `challenges-rel.ts`,
`stories-rel.ts`, `daily-rel.ts`, `achievements.ts`, `relationships.ts`.

Render paths pulled in because they gate the above:
`src/app/cards.tsx`, `src/app/challenges.tsx`, `src/app/tracks/[slug].tsx`,
and `src/lib/content/safety.ts` (the shared crisis block the new files point at).

## On the phone numbers in this review

Every number added by these fixes was already present and in use elsewhere in
this repository, and was copied verbatim rather than newly sourced:

- National Domestic Violence Hotline, 800-799-7233, text START to 88788.
  Source in repo: `src/lib/content/safety.ts` (`crisisResources`, url
  `https://www.thehotline.org`) and `src/lib/content/tracks-repair.ts` seekHelp.
- 988 Suicide and Crisis Lifeline, call or text 988. Source in repo:
  `src/lib/content/safety.ts`, url `https://988lifeline.org`.
- 911 for US emergencies; Childhelp 800-422-4453 and Cyber Civil Rights
  Initiative 844-878-2274 already existed in `tracks-repair.ts` and were not
  touched.

I did not independently re-verify these numbers against a live source in this
pass, and I did not add any number that was not already carried in the repo.
That verification is worth doing before store submission. I also deliberately
did not add phone numbers for The Trevor Project, Trans Lifeline, or the LGBT
National Help Center, because those were not already verified in-repo; those
entries keep their URLs only.

---

# CRITICAL

## C1. Deck `guidance` is authored but never rendered, so the repair deck's safety floor never reaches anyone

**File:** `src/lib/content/cards-rel.ts` (data) and `src/app/cards.tsx` (render)

`Deck.guidance` is defined on all nine decks and carries the house rules. For
`back-from-the-brink` it carries the entire safety floor:

> "Both of you have to actually want to be here tonight; if one of you is doing this to prove something, stop and pick another night. Agree on a stop signal before you draw the first card and honor it instantly, no negotiating. No demanding details of the injury, no scorekeeping, and nothing said here gets quoted back in a future argument. Go short: three or four cards is a full session for this deck. If there is fear, pressure, coercion, or any threat to your safety in this relationship, this deck is the wrong tool, and the safety resources in the app are the right place to start."

`src/app/cards.tsx` renders `d.title`, `d.tagline`, `d.description` (clamped to
two lines) and `d.cards`. It never reads `guidance`. Grep confirms `guidance`
appears nowhere in `src/` outside the content files.

**Why unsafe:** a couple opens the deck built for the aftermath of a betrayal
and is handed cards like "Is there something I do that accidentally reminds you
of the worst of it?" with none of the stop-signal rule, none of the "no
demanding details of the injury" rule, and no domestic-violence line. The
highest-risk deck in the app ships with its guardrails stripped by the UI.

**Fixed:** opening any deck now lands on a "Before you draw" screen that renders
`deck.description` and `deck.guidance` in full, plus a standing not-therapy and
fear/coercion card with a button to `/safety`, before the first card can be
drawn. New `intro` state in `src/app/cards.tsx`; `openDeck()` sets it, "Start
the deck" clears it.

## C2. `wired-differently` has no fear, violence, or coercive-control red flag at all, and routes self-harm nowhere

**File:** `src/lib/content/tracks-difference.ts`, track `wired-differently`

This was the only one of the fourteen new tracks whose `seekHelp` never named
fear, threats, or violence. It also contained:

> "Rejection-sensitive reactions are escalating into rages, self-harm, or days-long shutdowns. That is a treatment question, not a communication question."

**Why unsafe:** self-harm is named and then handed no resource. Worse, the
track's whole framing invites a partner to read rage and control as
neurodivergent traits to be accommodated ("Sensory load is real and it is not
negotiable by willpower"), which is exactly the frame an abusive partner uses to
reclassify frightening behavior as a disability need. A track that teaches
accommodation without naming the line where accommodation stops is the most
weaponizable content in the set.

**Fixed:** added a new first bullet, and rewrote two others.

New first bullet:

> "Any fear of your partner, any intimidation, any threat, or any physical or sexual violence. Being neurodivergent never explains this away, and a meltdown is not a defense for frightening someone. Stop using this track and go to the safety page. In the US, the National Domestic Violence Hotline is 800-799-7233 or text START to 88788, and in an emergency call 911."

Self-harm bullet now ends: "If either of you is thinking about self-harm or
suicide, call or text 988 now."

Control bullet now ends: "Control is still control whatever its cause, and being
told you are not allowed to raise a subject is a red flag rather than an
accommodation."

## C3. `outness-gap` routes suicidal ideation to "individual therapy"

**File:** `src/lib/content/tracks-queer.ts`, track `outness-gap`

> "Concealment has turned into panic attacks, drinking to get through family events, not sleeping, or thoughts of ending your life. Individual therapy with a therapist who works with LGBTQ+ clients treats what a conversation between the two of you cannot."

**Why unsafe:** a user disclosing suicidal ideation is told to find a therapist,
a process that takes weeks. No crisis line is attached to the bullet. The Trevor
Project appears in a different bullet, about a different situation, and cannot
be relied on to be read. LGBTQ+ people in an outness conflict are a population
with well-documented elevated suicide risk; this is the single bullet most
likely to be read by someone in acute danger and it points at a waiting list.

**Fixed:**

> "Concealment has turned into panic attacks, drinking to get through family events, not sleeping, or thoughts of ending your life. If you are thinking about suicide, call or text 988 now, not later. Once you are steady, individual therapy with a therapist who works with LGBTQ+ clients treats what a conversation between the two of you cannot."

---

# HIGH

## H1. The `back-from-the-brink` deck, and therefore its DV warning, sat behind the paywall

**File:** `src/app/cards.tsx`

`const FREE_DECKS = new Set(["first-steps", "repair"]);` left
`back-from-the-brink` Plus-only, while the file's own comment reads "Money never
gates the heavy seasons." Combined with C1, the deck's safety floor was both
unrendered and unpurchasable.

**Fixed:** `const FREE_DECKS = new Set(["first-steps", "repair", "back-from-the-brink"]);`
with a comment recording that safety copy may never sit behind the paywall.
**This is a pricing change and the owner should review it,** though the hard rule
leaves no alternative while the DV line lives in that deck.

## H2. A model couple in `stories-rel.ts` treats location sharing as a repair practice

**File:** `src/lib/content/stories-rel.ts`, story `recovery-trust`

> "Location, schedule, money, all open, and offered by him rather than demanded by her."

**Why unsafe:** this is the app's only worked example of what "transparency
agreements" mean, and it puts location tracking at the head of the list. The
"offered not demanded" caveat does not survive contact with a real household: a
partner who wants location access now has an in-app story showing that a healthy
recovering couple shares it. `tracks-difference.ts` and `tracks-repair.ts` both
correctly name location tracking as coercive control. The story contradicts them.

**Fixed:**

> "Schedule and money, open, and offered by him rather than asked for by her. Nobody tracks anybody: they were explicit that this was Ben volunteering information, not Aliyah being given access, and that she could stop wanting it without owing an explanation. The information mattered less than the fact that he kept offering it without being asked, week after week, on days when nothing was wrong."

## H3. `deciding-together` names self-harm threats and offers no crisis line

**File:** `src/lib/content/tracks-early.ts`

> "Either of you is threatening to leave, or threatening self-harm, as a way to end the argument. That needs a professional now, not a session."

**Why unsafe:** it frames a self-harm threat primarily as an argument tactic and
gives the reader nothing to call. Threats used as leverage are also frequently
genuine risk.

**Fixed:** the bullet now ends "If anyone is actually thinking about suicide,
call or text 988 now, and treat a threat as real rather than as a tactic."

## H4. `chosen-family` omits outing-as-control entirely and gives suicidality no crisis line

**File:** `src/lib/content/tracks-queer.ts`, track `chosen-family`

The spec requires outing-as-a-control-tactic in seekHelp. It appeared only in
`outness-gap`. A user routed to `chosen-family` never sees it, and this is the
track explicitly written for people whose family of origin is already gone,
which is precisely the population for whom an outing threat has the most force.
The track also read "or is having thoughts of not wanting to be here. Get
individual help now" with no crisis number.

**Fixed:** added a new bullet,

> "Your partner threatens to out you, or hints that they might, to keep you close to them and away from everyone else. Outing is a control tactic, not a fight, and it is especially effective when your family of origin is already gone. Go to the safety page. In the US, the National Domestic Violence Hotline is 800-799-7233 or text START to 88788."

and changed the suicidality bullet to open with "If you are thinking about
suicide, call or text 988 now."

## H5. `numberOfLines={2}` on the challenge card cut the DV warning off two challenges

**File:** `src/app/challenges.tsx`

`forWhom` was rendered clamped to two lines. In `new-pattern` and `clean-fight`
the safety sentence is the last sentence of `forWhom`:

> "If you are afraid of your partner, walking on eggshells, or being controlled or hurt, that is not a fight pattern, and the safety resources in this app are the right place to start."

On any realistic phone width that sentence never rendered.

**Fixed:** clamp removed, with a comment explaining why it must not come back.

## H6. Eight of the fourteen new tracks named the hotline or "the safety page" without giving a number

**Files:** `tracks-early.ts` (all three), `tracks-queer.ts` (both),
`tracks-difference.ts` (`two-cultures`, `jealousy`), `tracks-season.ts` (all three)

Only the three `tracks-repair.ts` tracks carried actual contact details. Examples
of the weak form: "Start with the National Domestic Violence Hotline" and
"See the safety page."

**Why unsafe:** a person reading a red flag about being monitored may not be able
to navigate deeper into the app, and may have seconds rather than minutes. The
number belongs at the point of recognition.

**Fixed:** every DV-shaped bullet across those eight tracks now carries
"In the US, the National Domestic Violence Hotline is 800-799-7233 or text START
to 88788," several also carry "in an emergency call 911," and all fourteen new
tracks now carry a 988 reference. Verified by script: 14/14 contain both.

`moving-in` additionally gained a general fear bullet it lacked:

> "Any fear of your partner, any threats, or anything physical. Leaving is not a failure of this track and staying is not the goal of it. Go to the safety page now, and in an emergency in the US call 911."

`empty-nest` gained a line addressing the leaving-is-failure risk for long
relationships: "Later-life abuse is common and under-reported, and leaving after
decades is not a failure of the decades."

## H7. A card in The Distance deck asks for a full account of the day

**File:** `src/lib/content/cards-rel.ts`, deck `the-distance`

> "Walk me through today from the moment you woke up. Include the boring parts."

**Why unsafe:** this is the account-of-your-movements demand almost verbatim,
sitting in the deck written for couples who are apart, three cards away from
"Have you had a jealous or insecure thought lately." A controlling partner does
not have to twist it; the app asks the question for them, and "the app told us
to" removes the partner's ground for refusing.

**Fixed:** replaced with

> "What is one ordinary moment from today you would have told me about if I had been in the room?"

## H8. The domestic-violence gate assumed marriage

**File:** `src/lib/content/safety.ts`, `whyGateMatters`

> "This isn't about your marriage being 'bad enough'; it's about the right tool."

**Why unsafe:** this is the copy on the DV gate, the one screen that must land
for every user. An unmarried, dating, or co-parenting reader is invited to file
it as somebody else's screen. `relationships.ts` mandates `SAFETY_FRAME` with
`us: "your relationship"` for exactly this reason and this string ignored it.

**Fixed:** "your marriage" becomes "your relationship", and a line was added
addressing the stay-or-leave pressure: "Nobody there will tell you to leave or
to stay: that stays your call."

---

# MEDIUM

Fixed where the change was small and low-risk; marked FIXED or OPEN.

**M1. FIXED.** `cards-rel.ts`, The Distance: "Who in your life there knows about
us, and how do you describe me to them?" pressures disclosure and functions as a
loyalty test against a partner who is not out, or whose workplace is unsafe.
Replaced with "When you do talk about me to someone there, what do you find
yourself saying? Only if that is a comfortable question tonight."

**M2. FIXED.** `cards-rel.ts`: the Early Days and The Distance decks lacked the
fear/coercion line that Back From The Brink carries. Both `guidance` strings now
carry one; The Distance also carries "no card here is a request to prove where
you were, who you were with, or what you were doing."

**M3. FIXED.** `challenges-rel.ts`, `seven-calls` day 4 asked about "the route
they walk." Replaced with non-locational prompts plus "This is curiosity, not an
account of their movements." The `seven-calls` and `low-spoons` `forWhom` strings
also gained the fear/control line the other two challenges already had.

**M4. FIXED.** `tracks-repair.ts`, `digital-trust`, "Writing the agreement" led
couples to negotiate over "passcodes" with no floor. Added to the session focus:
"nobody has to hand over passwords or passcodes, share their location, or give
the other person access to their accounts. If either of you wants an agreement
built on access rather than on honesty, that is the thing to talk about, not to
sign." The passcode prompt was reworded to be about concealment, not access.

**M5. FIXED.** `tracks-early.ts`, `long-distance` planSeed prescribed "cameras
on" while the same track's seekHelp names "required video as proof" as control.
Now: "cameras on only if both of you want them on and either of you can say no
without a reason."

**M6. FIXED.** `tracks-difference.ts`: "Contempt is the pattern most predictive
of things ending" is an uncited predictive claim in an app that promises never to
predict. Replaced with "Contempt is corrosive in a way no worksheet can reach."

**M7. FIXED.** `achievements.ts`, `four-weeks-in`: "Whatever is going to start
moving usually starts around now" is an uncited timing claim that tells a couple
four weeks in with no change that they are behind. Replaced with copy about
noticing honestly rather than about expected pace.

**M8. FIXED.** `achievements.ts`, `repair-offered`: "the move that shows up most
in couples who do well" is an uncited empirical claim. Reworded to describe the
act rather than assert an outcome correlation.

**M9. FIXED.** `relationships.ts`, `reconciling.celebrates` read "Choosing each
other twice, and not repeating the ending you already lived through," which
celebrates the fact of being back together and breaks the file's own rule that
milestones are "never a status change ... never 'you stayed together'." Now:
"The work of naming the old pattern and doing something different with it. Never
the fact of being back together, because staying is not the achievement and
leaving again would not be a failure."

**M10. OPEN.** `stories-rel.ts` exports `relStoriesNote`, which is never
rendered. `stories.ts` exports `storiesNote`, which is. The rendered version
drops the clause "a few of these couples needed outside help that no app
replaces." Either fold that clause into `storiesNote` or delete the dead export.
Not fixed here because it touches a file outside the review set.

**M11. OPEN.** `src/app/tracks/[slug].tsx` renders the seekHelp card last, below
the overview, feelings, principles, all sessions, and planSeeds. It is correctly
never paywalled and never trimmed, which is the important part, but on a track
with seven sessions a reader has to scroll past the entire program to reach the
red flags. Consider a compact always-visible entry point near the top that links
to the same card. Layout change, not a content change, so not done here.

**M12. OPEN.** No track in the new set names financial abuse resources
specifically, and several name financial control as a red flag (`moving-in`,
`empty-nest`, `long-distance`, `two-cultures`). The National Domestic Violence
Hotline covers it, but a dedicated financial-abuse referral would be stronger.
Needs a verified source before it ships, so it is left open rather than invented.

---

# Checks that passed

- **coparenting-repair is correctly an alliance, not a reunion.** The overview
  states "This track is not about getting back together, and it will not ask you
  to," and principle one is "This is an alliance, not a reunion. ... Neither
  partner should read cooperation as an opening." Mediation and legal help are
  named concretely, including parallel parenting as a structure rather than a
  failure, court mediation programs, legal aid, and the instruction to follow any
  existing order exactly. No change needed.
- **recovery-trust names active relapse and the treatment boundary.** "There is
  active use or a relapse happening right now. Stop the couples work and get
  treatment support first," and "Couples work waits until individual treatment is
  established. This is a boundary, not a delay tactic." It also correctly names
  post-abstinence overdose risk as an emergency. No change needed.
- **No content implies the app diagnoses or treats.** Every track file carries an
  educational-tool framing, `achievements.ts` rule 10 enforces it, and the
  `asked-for-help` achievement explicitly celebrates escalating to a human.
- **No content implies staying is always right.** `deciding-together` names
  "finding out you want different lives" as a real outcome, `empty-nest` treats
  one partner considering ending it as a therapy referral rather than a failure,
  and `relationships.ts` `celebrates` fields avoid status milestones. The two
  places that drifted are fixed above (H8, M9).
- **No pace-shaming of recovery.** `recovery-trust` states plainly that "the
  person who was hurt is the one who knows when it has been enough" and that "the
  monitor role is a job, not an identity." `reintegration` allows "I am not able
  to talk about that" as a complete sentence. `achievements.ts` rules 3, 4 and 7
  forbid streaks, gap references, and rewards for enduring, and no entry violates
  them.
- **Zero em-dashes and en-dashes** across all eleven content files and the two
  edited screens.
- **`daily-rel.ts` is clean.** Sixty questions, all answerable alone, none
  demanding disclosure of whereabouts, contacts, or history.

---

# Counts

| Severity | Found | Fixed |
| --- | --- | --- |
| Critical | 3 | 3 |
| High | 8 | 8 |
| Medium | 12 | 9 |

Three medium items are left open on purpose: M10 and M11 touch files outside the
review set, and M12 would require inventing a referral I cannot verify.

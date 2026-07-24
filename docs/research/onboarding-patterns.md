# Onboarding patterns for deep personalization

Research notes and a concrete recommendation for Mend's onboarding v2.

Written 2026-07-19. All sources were read on 2026-07-19 unless noted.

Scope: how apps that must personalize from the first minutes actually do it, with
attention to health, therapy-adjacent, and couples products. Then a screen-by-screen
recommendation for Mend that captures relationship type, stage, what the person is
carrying, goals, and both partners' names in under two minutes, and ends in a
visibly personalized plan.

---

## 0. Honesty about the evidence

Most published writing on onboarding length is vendor marketing. It repeats
confident numbers with no study behind them. Before anything else, here is what is
and is not verifiable, because Mend should not ship copy or a claim built on air.

**Verified, safe to cite publicly**

| Claim | Number | Source |
| --- | --- | --- |
| Couples-app use is associated with higher relationship quality | Multidimensional Quality of Relationship Scale 7.03 for users of >3 months vs 5.19 for users of 1 week or less, 35.5% higher, 95% CI 31.1% to 43.7%, P=.002 | Deave et al., "Exploring the Potential of a Digital Intervention to Enhance Couple Relationships (the Paired App): Mixed Methods Evaluation", JMIR mHealth and uHealth, 14 April 2025. https://pmc.ncbi.nlm.nih.gov/articles/PMC12001865/ |
| Checkout flows average far more fields than they need | 11.3 average form fields in 2024, down from 11.8 in 2021 and 12.7 in 2019; most sites need only 8 | Baymard Institute. https://baymard.com/blog/checkout-flow-average-form-fields |
| A long onboarding quiz can work when every answer visibly pays off | Noom's web onboarding funnel spans up to 113 screens and takes 10 to 15 minutes | RevenueCat teardown, published 9 April 2026, updated 1 May 2026. https://www.revenuecat.com/blog/growth/web-to-app-onboarding-funnel/ |

Important caveats on the Paired figure, which must travel with it any time it is
used: it is **not a randomized controlled trial**. It is a mixed-methods evaluation
of a self-selected convenience sample of existing Paired subscribers. Only 440 of
3,717 brief-survey participants (11.84%) gave complete longitudinal data. The
authors say plainly that self-selected users "may be more open to positive
relationship care". The Open University funded it; the paper states Better
Half/Paired was not involved in analysis, interpretation, writing, or the decision
to submit, though Paired hosted the survey data. Paired's own press page rounds the
finding to 36%; cite the paper's 35.5%, not the press release.
https://www.paired.com/press/paired-shown-to-increase-relationship-quality-by-36percent

**Repeated widely, NOT verifiable, do not treat as fact**

- "Every additional question reduces completion by 10 to 15%."
- "A six-screen pre-value flow loses more than half of installs."
- "Multi-step forms convert 86% higher."
- "Multi-step forms had 25.4% higher completion rates."
- "Personalizing onboarding improved conversion 15%."

These appear across onboarding blogs
([Formbricks](https://formbricks.com/blog/user-onboarding-best-practices),
[vmobify](https://vmobify.com/blog/app-onboarding-best-practices),
[ivyforms](https://ivyforms.com/blog/multi-step-forms-single-step-forms/),
[Appcues](https://www.appcues.com/blog/user-onboarding-ui-ux-patterns))
with no linkable study, no sample, and no methodology, often attributed to a vendor
that no longer publishes the underlying data. The *direction* they point (fewer
fields per screen is better on mobile, unexplained questions cost you users) is
consistent across every source and matches Baymard's field-count work, so it is
reasonable to design by. It is not reasonable to quote. Nothing in Mend's copy,
store listing, or marketing should use these numbers.

---

## 1. How many questions is too many

The honest answer from the evidence: **question count is not the variable that
matters. Unpaid-for questions are.**

Two facts sit next to each other and look contradictory:

- Onboarding practitioners converge on 2 to 5 questions before delivering value.
- Noom runs up to 113 screens over 10 to 15 minutes and it is one of the most
  successful consumer-health funnels in the market
  ([RevenueCat](https://www.revenuecat.com/blog/growth/web-to-app-onboarding-funnel/)).

They reconcile once you notice what Noom does that a bad five-question flow does
not. The RevenueCat teardown's phrasing is the useful one: personalization "only
feels real when it cashes the cheque". In Noom's flow, the goal weight becomes the
backbone of every later screen, the projected timeline visibly moves as you answer,
and sensitive moments are met with reassurance rather than another field. Every
question is spent in front of the user.

So the working rule for Mend:

> A question is affordable if the user can see, before they finish onboarding,
> exactly what it changed. A question the user cannot trace to an outcome is a tax,
> and the third tax in a row is where people leave.

Corollary rules that follow from this and from Baymard's field-count research
(https://baymard.com/blog/checkout-flow-average-form-fields):

1. **One decision per screen.** Baymard's finding is about total fields on screen,
   not total steps: crowding is what overwhelms. Splitting the same questions across
   more screens is close to free; adding a question nobody asked for is not.
2. **Taps are cheap, typing is expensive.** A tap-to-choose screen costs roughly 3
   to 6 seconds. A text field costs 10 to 20 and invites abandonment. Budget your
   text fields, not your screens. Mend needs exactly two text fields (two names) and
   one of them should be optional.
3. **Non-personalizing screens are the real fat.** Mend's current four-panel swipe
   tour is four screens of generic marketing before the app knows a single thing
   about the user. That is the most expensive stretch in the current flow and it
   personalizes nothing. Cut it and spend the budget on the payoff screen.
4. **Never ask what you can infer or defer.** Anything not needed to build the first
   plan belongs in progressive profiling (section 4).

---

## 2. Sequencing: value first or profile first

The framing "value first vs profile first" is a false choice for a product like
Mend. What actually distinguishes good flows is whether the *profile step is itself
the value*.

Three sequencing models in the wild:

**A. Value first, profile later.** Duolingo defers sign-up until after the learner
has completed a lesson and felt a win. Works when the product has a self-contained
30-second unit of value that needs no setup.
(https://userguiding.com/blog/duolingo-onboarding-ux)

**B. Profile first, big payoff.** Noom, and every health quiz funnel. Works when the
product's core promise *is* a personal plan, and when the flow keeps proving it is
building something as you go. The risk is that the profile step is boring
administration; Noom mitigates by making the plan visibly assemble in real time.

**C. Promise, permission, profile, payoff.** The pattern therapy-adjacent products
converge on. State what this is and is not, get informed consent and screen for
danger, then ask, then reveal. Lasting does a version of this: account, then an
assessment across communication, conflict, appreciation, sex, family culture,
finances, emotional connection, in-laws, friends, and parenthood, then a
personalized "Series" such as its 10-session Repair series
([ChoosingTherapy review](https://www.choosingtherapy.com/lasting-app-review/),
[LoveFix review](https://lovefix.app/resources/apps/lasting-app-review-2026/)).

**Mend belongs in model C, and already partly is.** Mend cannot use model A: its
30-second unit of value (a referee'd conversation) requires knowing who is speaking,
and it cannot ethically hand someone conflict tooling before the domestic-violence
gate. Mend's existing welcome, "here's the deal", disclaimer, and gate sequence is
the right shape. The problem is what sits between the gate and the payoff: four
generic tour panels, then two questions, then the app dumps the user on the home
screen with no moment that says "this is yours".

The fix is not to ask less. It is to move the tour to the end and turn it into the
plan.

---

## 3. Asking sensitive questions without feeling clinical

Trauma-informed content design is the relevant literature here. It assumes any user
may have experienced trauma and prioritizes safety, clarity, and user control
([UX Content Collective](https://uxcontent.com/a-guide-to-trauma-informed-content-design/),
[Birdcall UX](https://www.birdcallux.com/blog/what-is-trauma-informed-design)).
The concrete moves that translate directly into Mend screens:

**Say why before you ask.** One line of purpose above every sensitive question,
naming what it changes. Mend already does this well on the situation screen ("So we
can meet you where you are" / "It shapes what Mend shows you first"). Extend it to
every question.

**Give a door out of every question.** Trauma-informed guidance is explicit that
forms should let people respectfully decline. Every Mend question except the safety
gate gets a low-key escape: "Not sure yet", "I'd rather not say", "Something else".
The safety gate's escape is different by design: it is not a decline, it is a
second door that leads to help.

**Soften the frame, not the substance.** The PTSD-screening literature notes the
shift from evaluative framing like "risk assessment" toward user-centered framing
like "safety check" as both more clinically appropriate and less alienating
(https://arxiv.org/pdf/2604.17871). Mend's gate copy is already in this register:
"One honest question", followed by "Not 'do we fight.' Fights are why Mend exists."
Keep that voice.

**Use the user's words, not the DSM's.** Mend's situation chips do this correctly:
"Intimacy has gone quiet", not "desire discrepancy". "We're facing an affair", not
"infidelity recovery". This is the single biggest reason the current situation
screen does not feel like an intake form. Protect it.

**No scales in onboarding.** Likert grids and 1 to 5 sliders are the fastest way to
make a warm product feel like a clinic. Mend's five-score pulse check is good and
belongs exactly where it is now, at stage boundaries, after trust exists. Do not
pull it forward.

**Never open cold on the hardest question.** Sandwich structure: promise, then the
hard question, then what happens next. Mend's ordering (deal, then gate) is right.

**Promise reversibility, on screen.** "You can change this any time in settings."
Mend says this on the situation screen. Say it on every profiling screen. It
converts a commitment into a guess, which is much cheaper to make.

**Inclusive by construction.** Guidance on gender and relationship inclusivity is
consistent: do not assume the shape of a relationship, prefer the user's own label,
and avoid "Other" in favour of "Not listed" or "Self-describe", because "Other"
reads as a verdict
([ALBA guidelines](https://www.alba.network/GSDinclusiveforms),
[Keshet](https://www.keshetonline.org/resources/forms/),
[UBC Equity](https://equity.ubc.ca/resources/gender-diversity/inclusive-forms/)).
For Mend this is not just courtesy, it is accuracy: a flow that says "marriage" to
someone who has been with their partner for eleven years without marrying has
already told them the app was not built for them, and it happens on screen one.

---

## 4. Progressive profiling: what to ask later

The pattern is well described outside health: collect only what the first
experience requires, then gather the rest as engagement earns the right, asking each
question at the moment it becomes obviously relevant
([Descope](https://www.descope.com/learn/post/progressive-profiling),
[Ping Identity](https://www.pingidentity.com/en/resources/blog/post/what-is-progressive-profiling.html)).
The mechanism underneath is Nielsen's progressive disclosure, which defers the rare
and the advanced to a second layer so the first layer stays learnable
(https://www.nngroup.com/articles/progressive-disclosure/).

The version that fits Mend: **ask a question at the doorway of the content it
changes, not at the front door of the app.**

Concretely, these should all move out of onboarding (or stay out):

| Signal | Ask it when | Framing |
| --- | --- | --- |
| Conflict lens / role (existing `quiz.ts`) | After the first completed timer session | "Want to know why that felt the way it did?" |
| Pulse scores (existing 5-score `PulseEntry`) | At each stage boundary, as today | Unchanged |
| Kids in the house | First time a parenting-adjacent card or track opens | "Does this land in a house with kids in it?" |
| Faith, and whether it is shared | First time faith content surfaces | Only if the user opens it |
| Long distance | First time a ritual assumes same roof | "Are you two under the same roof right now?" |
| Neurodivergence, sensory needs | Settings, never a prompt | Opt-in accommodation, framed as preferences |
| Second partner's own situation and goals | When they join (section 5) | Their own answers, private |
| Notification timing | After the first week of use | "When is a good time to nudge you?" |

Everything above is a real personalization lever and every one of them would have
been a plausible onboarding question. Putting them in onboarding would have doubled
the flow and halved the finish rate for signals most users will never need.

---

## 5. The second partner joins

This is the hardest problem in the category and where most couples apps are weak.

**The failure mode is well documented.** Couples products commonly gate their value
on both phones being present, and then show a new user an empty room. The
widget-app literature calls it the two-phone rule and identifies it as the number
one reason a freshly installed couples app looks broken
(https://www.iscreenapp.com/blog/couple-widget-app-iphone). The strongest evidence
in the category argues the opposite design: the Paired evaluation notes explicitly
that Paired "can also be used independently: a user can access content and discuss
questions with a partner who does not have the app"
(https://pmc.ncbi.nlm.nih.gov/articles/PMC12001865/).

**How the field pairs accounts.** All of them use the same primitive, an invite code
or link generated by the first partner and entered by the second: Lasting invites by
texting an invite code
([ChoosingTherapy](https://www.choosingtherapy.com/lasting-app-review/)), Flo for
Partners generates a unique pairing code
(https://flo.health/product-tour/flo-for-partners), Paired links accounts and then
seals each partner's answer until both have replied
(https://apps.apple.com/us/app/paired-couples-relationship/id1469609343). Mend
already has this primitive built (couple spaces with invite-code RPCs, and a
server-side seal on the daily answer). Nothing needs inventing.

**Lasting's reconciliation model is worth copying, with one change.** Lasting has
both partners complete the assessment, then compares results so the couple agrees a
shared plan (https://www.choosingtherapy.com/lasting-app-review/). Mend should do
the same for situation and goals, but *not* for the safety gate. See below.

**Design rules for Mend, in priority order:**

1. **Solo must be complete, not degraded.** No screen may say "waiting for your
   partner" as its primary state. Anywhere a partner is missing, show what one
   person can do alone. Mend's onboarding already says "One of you can start alone",
   which is a promise the whole app has to keep.
2. **The invite lives on the plan screen, not in settings.** The moment of highest
   intent to invite is the moment the plan appears. One tap to share.
3. **Partner B does not repeat partner A's onboarding.** Facts about the
   relationship (type, how long, both names) are inherited from the space. Opinions
   (what they are carrying, what they want) are asked fresh, because they are
   personal and are the entire point of comparing. Partner B's flow is: short
   welcome, the deal and disclaimer, **their own safety gate**, their situation,
   their goals. Two profiling questions instead of five.
4. **Partner B's safety gate is asked independently, answered privately, and never
   surfaced to partner A.** This is non-negotiable and is the reason the gate cannot
   be inherited from the space. Partner A saying "we're safe" is not consent, not
   evidence, and not an answer on B's behalf; in a controlling relationship it is
   exactly the answer the controlling partner would give. If B chooses the second
   door, B gets the crisis resources on their own device, and partner A sees no
   change, no notification, no "your partner did not finish setup" signal. Silence
   on A's side is a safety feature, not an oversight.
5. **Compare only after both have answered, and frame the comparison as
   information.** When both situation answers exist, show a card: where you agree,
   where you see it differently. Never render a difference as a problem, a score, or
   a warning. Difference is the material the app works on.
6. **A pending invite must expire quietly.** If nobody joins in 14 days, stop
   surfacing "invite your partner" at the top of home. Move it to a calm entry in
   settings. A permanent unfulfilled prompt is a daily reminder of a rejection.

---

## 6. Reflecting personalization back so the user feels understood

This is the highest-leverage screen in the whole flow and the one Mend is currently
missing.

The pattern, across Noom, Lasting, and every well-built quiz funnel, is a **payoff
screen that quotes the user's own answers back and names what changed because of
them**. RevenueCat's teardown identifies the specific mechanism: users expect their
answers to visibly shape what comes next, and personalization is only credible when
it cashes the cheque
(https://www.revenuecat.com/blog/growth/web-to-app-onboarding-funnel/). The common
failure, named in the onboarding-pattern literature, is decorative questions: if the
post-onboarding experience is identical for everyone, the questions were theatre and
the user can tell (https://www.appcues.com/blog/user-onboarding-ui-ux-patterns).

The three things a payoff screen must do:

1. **Say it back in their words.** Not "Profile saved." Use the actual names, the
   actual situation phrase, the actual goal.
2. **Name the specific consequences.** "Because you said X, your first track is Y,
   and Z is waiting on your home screen." Point at real objects in the app.
3. **Hand over one action, not a menu.** One button, the first ten minutes.

Mend is unusually well set up to do this honestly, because the personalization is
already real. `situation.ts` already carries `hereForYou`, a `track`, prioritized
`stories`, prioritized `decks`, and a `heavy` flag per situation. The plan screen
does not need to invent anything; it needs to *show the work the app is already
doing silently*.

---

## 7. Recommendation: Mend onboarding v2

### 7.1 What is wrong with v1

Current flow is `welcome -> tour (4 panels) -> deal -> gate -> names -> situation -> home`.

- Nine screens to the home screen, of which **four personalize nothing** (the tour).
- The tour spends the user's entire patience budget before the app has learned one
  fact about them.
- It captures two signals (names, situation) and no relationship type, no stage, no
  goals, which means the app cannot avoid assuming marriage and cannot sequence by
  how long they have been together.
- **It ends on the home screen with no payoff moment.** The user answers the most
  personal question in the flow ("What are you carrying?") and is immediately
  dropped into a tab bar. The cheque is never cashed.
- The copy assumes marriage throughout, starting with the first sentence the user
  ever reads.

### 7.2 The v2 flow

Eight screens. Five taps, two text fields (one optional). Target: 95 seconds median,
under two minutes at the 75th percentile.

```
1  Welcome            no input        ~8s   brand moment
2  The deal           no input       ~15s   three promises + educational-tool disclaimer
3  Safety gate        1 tap           ~8s   unchanged in substance
4  Names + who        2 fields, 1 tap ~25s  names, and solo vs both
5  Type + stage       2 taps         ~14s   relationship shape and how long
6  Carrying           1 tap          ~12s   existing situations, reworded
7  Goals              1 to 2 taps    ~13s   what "better" means to them
8  Your plan          reveal          ---   the payoff, plus the invite
```

The four-panel tour is **deleted**. Its content is not lost: it is re-expressed as
the contents of the plan on screen 8, where it is specific instead of generic. A
sentence about the referee timer means nothing to a stranger on screen two and means
a great deal on screen eight when it is labelled "your first ten minutes".

### 7.3 Screen by screen

---

**Screen 1. Welcome**

The current headline assumes marriage in the first sentence of the product. Replace:

> Love rarely dies of one big thing.
> It starves on unheard sentences.

Body copy is unchanged in spirit, with "marriage" removed:

> A private guide for the two of you. Start with practical tools, then unlock the
> complete journey with Mend Plus. Keep finding the way forward together.

Buttons: **Begin**, and the existing quiet "I already have an account".

---

**Screen 2. The deal**

Keep all three cards. Two copy edits for inclusivity:

- "How it ends" card: "back into a marriage that holds itself up" becomes "back into
  a relationship that holds itself up".
- Disclaimer: keep it verbatim in force, adjust the profession name so it does not
  read as marriage-only:

> Mend is an educational tool, not therapy. It gives you structure and language; it
> does not diagnose or treat, and it is not a substitute for a licensed couples or
> family therapist or crisis care.

This screen is not optional and is not compressible. It is the informed-consent
moment and it is what earns the right to ask screen 3.

---

**Screen 3. Safety gate**

**Unchanged in substance. Do not touch the logic, the wording of the question, or
the second door.** It already reads exactly as trauma-informed guidance prescribes:
a purpose line, a plainly worded question, an explanation of why it is being asked,
and two doors where the second one leads to help rather than to a dead end.

The only permitted edit is the surrounding copy if it ever assumes marriage. The
question itself, "Is either of you afraid of the other?", is already
relationship-neutral, gender-neutral, and correctly scoped ("Not 'do we fight.'
Fights are why Mend exists.").

Two standing rules for this screen, to be written into the code comments:

- It is asked of **every individual**, including partner B when they join, on their
  own device, privately.
- It is **never** A/B tested, never optimized for continuation, and never counted as
  a funnel step. If more people take the second door, the gate is working.

---

**Screen 4. Names and who is here**

Purpose line: *So the timer and the games know who is who.*

> **Who's mending?**
>
> First names only. They label the timer and the games. On this phone they stay
> private.

- Your name: [text]
- Your partner's name: [text]

Below, a two-option segmented choice, defaulted to nothing:

> **Is your partner setting up too?**
> [ They're here with me ]  [ I'm starting alone ]

This one control does a lot of work. It decides whether screen 8 leads with an
invite or with a solo first step, it decides whether partner B's join flow is warm
or cold, and it lets the app stop guessing. It is one tap and it replaces the
current awkward footnote ("Starting alone? Put your partner's name in anyway.").

Keep the existing permissive validation: proceed if either name is filled. Someone
who does not want to type their partner's name yet should not be stuck.

---

**Screen 5. Relationship type and stage**

Purpose line: *So Mend stops guessing at the shape of your life.*

> **Tell us the shape of it.**

Row one, single select, chips:

`Married` `Engaged` `Living together` `Together, not living together` `It's complicated` `Something else`

Row two appears after row one is answered (progressive disclosure inside one
screen, so it is one navigation step and two taps):

> **And you've been together...**

`Under a year` `1 to 3 years` `3 to 10 years` `10 years or more` `On and off`

Notes:

- No `Other`. `Something else` opens a small free-text, per inclusive-forms
  guidance.
- No question about gender, orientation, or legal status anywhere. Mend does not
  need any of them, and asking would be the moment a queer couple learns the app is
  taking notes.
- `It's complicated` and `On and off` are not jokes. They are the honest answers for
  a real and non-trivial slice of people who reach for a repair app, and offering
  them is what makes the rest of the answers truthful.
- This is the screen that unlocks removing "marriage" from the running copy of the
  entire app. Every downstream string can now say "relationship", "together",
  "partner", and the few places where marriage-specific content is genuinely right
  (in-laws, wedding vows, blended families) can be gated on `type === "married"`.

---

**Screen 6. What are you carrying**

Purpose line: *So we can meet you where you are.* (unchanged, it is good)

Keep the existing ten situations and the existing chip copy, which is the warmest
writing in the app, with these changes:

- `blended`: "Blended or second marriage" becomes **"Blended family, or second time
  around"**.
- Add an eleventh escape at the bottom, quieter than the rest:
  **"I'd rather not say yet"**, which maps to the existing `just-us` behaviour
  without labelling the user. Trauma-informed guidance is explicit that a decline
  option belongs on questions people may not want to answer, and "what are you
  carrying" is the single most exposing question in the flow.
- Keep the reversibility promise already on the screen ("Nothing gets locked away,
  and you can change it any time in settings").

---

**Screen 7. Goals**

New. This is what turns a situation into a plan, and it is what the payoff screen
quotes.

Purpose line: *Pick one or two. This sets your first steps.*

> **What would better look like?**

Multi-select, maximum two, each mapping to real objects that already exist in the
codebase:

| Chip | Maps to |
| --- | --- |
| Fight without it turning into a war | Referee timer, repair deck, conflict content |
| Feel close again | Daily question, lighter and desire decks |
| Actually be heard | Timer, topics |
| Rebuild trust | Repair track, stage pacing slowed |
| Stop drifting | Rituals, 7-day challenges |
| Enjoy each other again | Games, lighter deck |
| Not sure yet, just start | Default stage 1 ordering, no change |

Cap at two on purpose. Three or more goals is not a plan, it is a wish list, and it
gives the payoff screen nothing crisp to say back.

---

**Screen 8. Your plan (the payoff)**

The most important screen in the flow, and the one that does not exist today.

It must quote the user, name the consequences, and offer one action. Structure:

```
  YOUR PLAN                                    [eyebrow]

  Priya and Sam.
  Together six years, not married, finding
  your way back after the baby, and you want
  to fight without it turning into a war.

  ------------------------------------------------
  WHERE YOU START
  Stage 1 of 5. Ten calm minutes.
  Your first step: "Twenty minutes, no phones"

  YOUR TRACK
  After the baby
  Because of what you told us you're carrying.

  YOUR FIRST DECK
  First steps. Twelve cards, easy ones.

  YOUR TIMER
  Set up for Priya and Sam. One speaks
  protected, the other proves they heard.
  ------------------------------------------------

  [ Start your first ten minutes ]          primary

  Sam hasn't joined yet.
  [ Send Sam the invite ]                   secondary
```

Requirements:

- **Every line is derived, none is boilerplate.** The names come from screen 4, the
  duration and type from screen 5, the situation phrase and track and deck from
  `situation.ts` (which already carries `hereForYou`, `track`, `trackTitle`,
  `stories`, `decks`), the goal phrase from screen 7. If a field is missing because
  the user declined, the line is omitted, never faked.
- **It reveals progressively, not all at once.** Reuse the existing `Rise`
  component with a 120ms stagger so the plan assembles in front of the user. This is
  the same device that makes Noom's timeline feel earned, and Mend already has the
  motion primitives built.
- **The invite is here**, not in settings, and only if screen 4 said "starting
  alone" or the partner has not joined.
- **One primary action.** Do not offer a menu. The plan's credibility is that it
  knows what you should do next.
- The tour content that was deleted from screens 2 to 5 lives here, attached to
  specific plan items, where it is a description of the user's own plan rather than
  an advertisement.

### 7.4 Partner B's flow

Five screens, roughly 45 seconds.

```
1  Welcome back      "Priya invited you to mend together."
2  The deal          identical, including the disclaimer
3  Safety gate       identical, asked fresh, answered privately, never shared
4  Carrying          their own answer, sealed until both have answered
5  Their plan        the shared plan, plus what they added to it
```

Inherited from the space, never re-asked: both names, relationship type, how long,
stage, journey progress.

Asked fresh, because they are opinions and not facts: the safety gate, what they are
carrying, their goals.

After both have answered screen 4, both see a comparison card in the shared space:
where you agree, where you see it differently, with a neutral one-liner and a
suggested first conversation. Never a score. Never a verdict. This mirrors Lasting's
both-complete-then-compare model
(https://www.choosingtherapy.com/lasting-app-review/) and Paired's seal-until-both
mechanic (https://apps.apple.com/us/app/paired-couples-relationship/id1469609343),
both of which Mend already has the infrastructure for.

### 7.5 Data model additions

```ts
// src/lib/store.ts, Profile
export type RelationshipType =
  | "married" | "engaged" | "living-together"
  | "together" | "complicated" | "self-described";

export type Duration =
  | "under-1" | "1-3" | "3-10" | "10-plus" | "on-off";

export type Goal =
  | "fight-better" | "feel-close" | "be-heard"
  | "rebuild-trust" | "stop-drifting" | "enjoy-again" | "unsure";

export type Profile = {
  a: string;
  b: string;
  safetyAck: boolean;
  createdAt: string;
  situation?: Situation;            // may be undefined: "rather not say yet"
  relType?: RelationshipType;
  relTypeOther?: string;            // free text for "something else"
  duration?: Duration;
  goals?: Goal[];                   // max 2
  soloStart?: boolean;
  lenses?: { a?: LensId; b?: LensId };
  roles?: { a?: ConflictRole; b?: ConflictRole };
};
```

All new fields optional, so existing v1 profiles keep working and the plan screen
degrades by omitting lines rather than by inventing them.

### 7.6 What v2 must not do

- Must not ask for an email, an age, a gender, an orientation, an income, a
  religion, a therapy history, or a 1-to-5 rating of the relationship.
- Must not weaken, reorder, shorten, or skip the safety gate for any user, including
  partner B, including returning users on a new device.
- Must not put the educational-tool disclaimer behind a "learn more".
- Must not paywall anything in this flow, including the plan screen. The plan is the
  proof; charging for the proof inverts the deal.
- Must not gate any feature on partner B joining.
- Must not say "marriage" or "spouse" or "husband" or "wife" anywhere in the shared
  strings. Those words are only correct inside content explicitly about marriage.

### 7.7 What to measure

Per-screen drop, time to plan, and, most important, **plan-to-first-action**: the
share of users who tap "Start your first ten minutes" from screen 8. That single
number tells you whether the payoff screen is credible. Also track invite-sent rate
at screen 8 and partner-join rate within 72 hours.

Track the safety-gate second-door rate, and treat it as a health metric, never as a
loss. It is the one number in the funnel that is allowed to go up.

---

## Sources

- Deave T, et al. Exploring the Potential of a Digital Intervention to Enhance Couple Relationships (the Paired App): Mixed Methods Evaluation. JMIR mHealth and uHealth, 14 April 2025. https://pmc.ncbi.nlm.nih.gov/articles/PMC12001865/
- Paired press release on the above study. https://www.paired.com/press/paired-shown-to-increase-relationship-quality-by-36percent
- Baymard Institute, Checkout Optimization: Minimize Form Fields. https://baymard.com/blog/checkout-flow-average-form-fields
- RevenueCat, Inside Noom's Web-to-App Onboarding Funnel. https://www.revenuecat.com/blog/growth/web-to-app-onboarding-funnel/
- Nielsen Norman Group, Progressive Disclosure. https://www.nngroup.com/articles/progressive-disclosure/
- Nielsen Norman Group, Few Guesses, More Success: 4 Principles to Reduce Cognitive Load in Forms. https://www.nngroup.com/articles/4-principles-reduce-cognitive-load/
- UX Content Collective, A Guide to Trauma-Informed Content Design. https://uxcontent.com/a-guide-to-trauma-informed-content-design/
- Birdcall UX, What is Trauma-Informed Design? https://www.birdcallux.com/blog/what-is-trauma-informed-design
- Design and Evaluation of a Culturally Adapted Multimodal Virtual Agent for PTSD Screening (arXiv). https://arxiv.org/pdf/2604.17871
- ALBA Network, Guidelines for designing inclusive forms for gender and sexual diversity. https://www.alba.network/GSDinclusiveforms
- Keshet, A Guide to Creating LGBTQ+ Inclusive Forms. https://www.keshetonline.org/resources/forms/
- UBC Equity and Inclusion Office, Inclusive Forms. https://equity.ubc.ca/resources/gender-diversity/inclusive-forms/
- ChoosingTherapy, Lasting App Review. https://www.choosingtherapy.com/lasting-app-review/
- LoveFix, Lasting App Review 2026. https://lovefix.app/resources/apps/lasting-app-review-2026/
- Flo for Partners product tour (pairing code). https://flo.health/product-tour/flo-for-partners
- Paired on the App Store (seal-until-both mechanic). https://apps.apple.com/us/app/paired-couples-relationship/id1469609343
- Appcues, Onboarding UX: 10 patterns, best practices, and real examples. https://www.appcues.com/blog/user-onboarding-ui-ux-patterns
- UserGuiding, Duolingo onboarding UX breakdown. https://userguiding.com/blog/duolingo-onboarding-ux
- Descope, Progressive Profiling 101. https://www.descope.com/learn/post/progressive-profiling
- Ping Identity, Progressive Profiling Explained. https://www.pingidentity.com/en/resources/blog/post/what-is-progressive-profiling.html
- iScreen, couple widget apps and the two-phone rule. https://www.iscreenapp.com/blog/couple-widget-app-iphone

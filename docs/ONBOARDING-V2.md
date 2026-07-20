# Onboarding v2: conditioning the app to one specific couple

Status: design spec, ready to build. Written 2026-07-20.
Replaces the flow in `src/app/onboarding.tsx` (v1: `welcome, tour x4, deal, gate, names, situation`).

Inputs: `docs/research/onboarding-patterns.md`, `docs/research/relationship-taxonomy.md`,
`docs/research/safety-across-types.md`, and 16 persona onboarding reports.

Everything below is final copy. Where a string is a template, its variables and its
fallback behaviour are specified. A developer should not have to invent a sentence.

---

## 0. The five rules this design is built on

1. **The safety gate comes before anything personal, for everyone, every time.** It is
   never shortened, never reordered, never A/B tested, never counted as a funnel loss,
   never gated behind relationship type, tier, language, or a completed profile.
2. **Ask what to show, never what someone is.** No gender, no orientation, no religion,
   no legal status, no immigration status, no income, no diagnosis name, no severity
   rating. Every question in this flow changes what the app renders. If a question does
   not change what the app renders, it is cut.
3. **An answer may change wording and ordering. It may never change access.** No track,
   deck, story, achievement, or safety resource is ever unlocked or locked by an answer
   here. This is the `situation.ts` rule extended to every new axis.
4. **One person can complete the whole thing about two people.** Nothing requires both
   partners, both devices, an email, or an account.
5. **The flow ends with a payoff, not a tab bar.** The last screen reads the couple's
   own answers back to them and hands them a plan with one action in it.

### 0.1 The never-ask list (hard, from the personas)

Do not add any of these later "just as an optional field". They are the reasons people
delete the app on screen four.

- Gender of either partner. Which one is the husband or the wife. Any role split by gender.
- Sexual orientation as a segmentation field or dropdown. (A volunteered chip on the
  optional, skippable context screen is different, and is covered in 1.8.)
- Religion or denomination by name. Faith appears only as something you are carrying.
- Legal or marital status as a requirement, a gate, or a prerequisite. Never "Are you
  married?" as a yes/no. Never "not yet" as an option, anywhere, near anything.
- Whether they plan to marry, when, a wedding date, an engagement status, or an anniversary.
- Immigration or citizenship status. Visas, documents, or petitions.
- Income, employer, job title, education.
- How bad it is. Any 1-to-10, any severity scale, any commitment score, any
  likelihood-of-staying rating, any "how often do you fight". The pulse does this later,
  properly, with privacy.
- Who caused it, who started it, who is more committed, who was more hurt, who left,
  why it ended, who is the problem.
- Days sober, sobriety streaks, or anything that makes the relationship a scoreboard for
  one person's recovery.
- Frequency of sex, sexual history, or anything shaped like a count.
- Name of a diagnosis, prognosis, or whether a condition is progressive.
- Whether either partner is out, except as a chip they volunteer on 1.8.
- Number of other partners, whose idea it was to open the relationship, when, why, or
  whether they plan to close it.
- Full names, email, phone, family names or contact details, custody paperwork.
- How they met. How long until they plan to move in together. Whether they are "ready".
  Whether they should be together.
- Anything that requires both partners present, or implies the other person will be told
  what was answered here.

---

## 1. The flow

Nine screens. The four-panel tour is deleted; its content is re-expressed on screen 9
where it describes the user's own plan instead of advertising features.

| # | Screen | Input | Target | Required to continue |
| --- | --- | --- | --- | --- |
| 1 | Welcome | none | 8s | tap Begin |
| 2 | The deal | none | 15s | tap We understand |
| 3 | Safety gate | 1 tap | 12s | one of two doors |
| 4 | Names and who is here | 2 fields, 1 tap | 22s | either name filled |
| 5 | How you two work | 2 to 5 taps | 25s | shape and weeks answered |
| 6 | What you're carrying | 1 to 2 taps | 14s | nothing (skippable) |
| 7 | What better looks like | 1 to 2 taps | 12s | nothing (skippable) |
| 8 | Anything we shouldn't assume | 0 to 4 taps | 10s | nothing (one-tap skip) |
| 9 | Your plan | reveal | reads in 20s | one primary action |

Design target: about 110 seconds median, under two minutes at the 75th percentile.
These are targets to instrument against, not measurements.

---

### 1.1 Screen 1: Welcome

Unchanged layout. One headline word changes, and a language control is added.

```
[Wordmark]

Love rarely dies of one big thing.
It starves on unheard sentences.

A private mediator for the two of you. The heart of it
free forever, no ads, your data never sold. Just the
way back.

                                       [ Begin ]
                          I already have an account
                        English. Change language ›
```

- Headline line 1 was "Marriages rarely die of one big thing." Changed to "Love rarely
  dies of one big thing." Line 2 and the body are unchanged.
- The language control is a quiet text link at the bottom, not a screen. Tapping it opens
  the existing `LANGUAGES` picker from `src/lib/i18n.ts` (en, es, fr, de, pt) as a sheet.
  Default remains `deviceLanguage()`.
- Honest coverage line inside the picker sheet, because only the app shell is translated
  and every content file (`src/lib/content/*`) is English:

  > The app around the work speaks these five. The guided content itself, the cards,
  > the tracks and the stories, is English only for now. We would rather tell you than
  > let you find out.

- **Hard rule:** the safety gate is never shown in a language whose safety copy is not
  translated. If the chosen language lacks a verified translation of screen 3 and
  `src/lib/content/safety.ts`, show screen 3 in English with this line above it:
  > This screen is in English because we have not had it translated by a person yet.
  > We will not machine-translate a safety screen.

---

### 1.2 Screen 2: The deal

Three cards, unchanged in structure. Three copy edits.

```
Here's the deal
Three promises between us, before anything starts.

[time icon]  What it asks
Twenty honest minutes a week. In the same room if you
have one, on two phones if you don't. Honesty on the
pulse checks. Patience measured in months, not moods.
One of you can start alone.

[school icon]  What it gives
The structure and language of real counseling
frameworks, the kind couples pay hundreds a session
for. Staged, guided, free.

[exit icon]  How it ends
With you deleting it. Mend is designed to get you off
the app and back into a relationship that holds itself
up. Graduation is the feature.

Mend is an educational tool, not therapy. It gives you
structure and language; it does not diagnose or treat,
and it is not a substitute for a licensed couples or
family therapist or crisis care.

                              [ We understand ]
```

Edits from v1: "Twenty honest minutes a week, together" now names the two-phone case;
"back into a marriage that holds itself up" becomes "relationship"; the disclaimer says
"licensed couples or family therapist" instead of "licensed marriage and family
therapist".

The disclaimer stays on the screen in full. It never moves behind a "learn more".

---

### 1.3 Screen 3: Safety gate

Placement: screen 3, immediately after the deal, before names, before any personal
question. It does not move. See section 3 for the full rewritten copy, the rationale for
the one substantive change, and the standing rules.

---

### 1.4 Screen 4: Names and who is here

```
Who's mending?

First names only. They label the timer and the games.
On this phone they stay private.

Your name
[________________________]              + pronouns

Your partner's name
[________________________]              + pronouns

Is your partner setting up too?
[ They're here with me ]  [ I'm starting alone ]

Starting alone is the normal case. One person almost
always finds this first. Put their name in anyway and
you can begin without them.

                                        [ Next ]
```

- Both name fields, first name only, no roles attached, exactly as v1. This is one of the
  few places the app is already fully neutral and it survives untouched.
- `+ pronouns` is a small text link beside each field. Tapping it reveals one free-text
  input, 12 char max, placeholder `she / they / he`. Never required. Never a two-option
  choice. Never a dropdown. If left blank the app writes around pronouns, which is what it
  does today.
- The segmented control replaces the v1 footnote. Neither option is preselected. It sets
  `soloStart` and decides whether screen 9 leads with an invite or a solo first step, and
  whether partner B's join screen is warm or cold.
- Continue is enabled when **either** name has content, same permissive rule as v1.
  Someone not ready to type their partner's name is not stuck.

---

### 1.5 Screen 5: How you two work

One screen, five rows, progressive disclosure. Each row appears when the row above it is
answered. Rows 1 and 3 are required (both are one tap and neither is invasive). Rows 2, 4
and 5 each carry a visible `Skip` and are omitted from the plan if skipped.

```
SO MEND STOPS GUESSING

Tell us the shape of it.
Your answers change the words we use and the things we
suggest. They never change what you can reach.
```

**Row 1. What do you two call this?** (single select, required)

```
[ Together ]   [ Married ]   [ Dating ]   [ Partnered ]
[ Engaged ]   [ Civil partnership ]
[ Separated, co-parenting ]
[ Separated, figuring it out ]
[ We don't use a word ]   [ Something else ]
```

- `Something else` reveals a one-line free text, placeholder `In your own words`.
- **The order above is deliberate and must not be re-sorted.** It is not a commitment
  ladder and it must never be rendered as one: no ascending order, no visual weighting,
  no default selection, no "yet" anywhere on this screen or near it.
- No option is described as the real one, the full one, or the next one.

**Row 2. And what do you call each other?** (single select, optional)

```
[ Partner ]   [ Boyfriend / girlfriend ]   [ Spouse ]
[ Husband ]   [ Wife ]   [ Fiancé / fiancée ]
[ Co-parent ]   [ Just our names ]   [ Our own word ]
```

- Preselected: `Partner`. That is the current hardcoded default and it stays the fallback.
- `Our own word` reveals a one-line free text.
- Below the chips, a quiet link: `Different for each of us ›`. Tapping it swaps the row
  for two pickers labelled with the names from screen 4 (`What Wes goes by` /
  `What Marcus goes by`) using the same options. This is a labelling preference, never an
  identity question, and the copy says so:
  > We'll use your words, not ours.

**Row 3. How do your weeks work?** (single select, required)

```
[ We share a home ]
[ Two places, we see each other a lot ]
[ Long distance ]
[ Apart for now: work, school, service, care ]
[ Rather not say ]
```

This is the single highest-value input in the flow. It gates the nudge pool, the ritual
list, the challenge day variants, the micro-moves, the session mode, and every card that
assumes a shared front door, a shared bed, or a driveway.

**Row 4. How often are you in the same room?** (single select, optional)

```
[ Most days ]  [ A few days a week ]  [ About weekly ]
[ Less than that ]  [ Almost never right now ]
```

Asked of everyone, including couples who share a home, because opposite shifts under one
roof is a real and common answer. This sets the 7-day challenge variant ("seven moves at
your pace" instead of seven days), the default session mode, and the default turn length.

**Row 5. How long have you been together?** (single select, optional)

```
[ Under a year ]  [ One to three years ]
[ Three to ten years ]  [ Ten years or more ]
[ On and off ]  [ Rather not say ]
```

Inline reason line, so this does not read as intake paperwork:

> So we stop offering you things written for a twenty-year marriage, or for a couple who
> just met.

Below it, a quiet link: `We have more than one number ›`. Tapping it reveals a second
picker, same options, labelled **And in this chapter?** That covers the couple who have
been together thirteen years and married six, and the couple who were together a decade,
apart five years, and back one. Both numbers are stored. Neither is required.

Never phrased as "how long have you been married". Never asks for a date.

```
                                        [ Next ]
```

---

### 1.6 Screen 6: What you're carrying

```
SO WE CAN MEET YOU WHERE YOU ARE

What are you carrying?
Pick up to two. It shapes what Mend shows you first.
Nothing gets locked away, and you can change it any
time in settings.
```

Multi-select, maximum two, **tap to select and then tap Next**. The v1 behaviour where a
single tap committed and exited is removed: it forced couples carrying two things to lie
by omission on the first real question the app asks. When two are selected, further chips
are dimmed with a small line: `Two is the most a plan can hold. Tap one to swap it.`

Chips are grouped under three quiet labels. Group order and chip order are fixed.

**Between the two of you**

| id | chip |
| --- | --- |
| `drift` | We've drifted apart |
| `conflict-pattern` | Nobody taught us how to argue |
| `desire-gap` | Intimacy has gone quiet |
| `affair` | We're facing an affair |
| `old-hurt` | One of us is carrying hurt from before us |
| `next-step` | We're deciding on a big next step |
| `early` | We're early and figuring it out |
| `agreements` | We're renegotiating our agreements |
| `untangling` | We're untangling and want to do it well |

**What life is doing to you**

| id | chip |
| --- | --- |
| `money` | Money is straining us |
| `illness` | Illness or caregiving |
| `loss` | We're grieving a loss |
| `baby` | We have a new baby |
| `recovery` | Addiction or recovery is in this |
| `apart` | We barely see each other |
| `far-from-home` | We're far from home |

**Who else is in it**

| id | chip |
| --- | --- |
| `family-vote` | Family has a vote in us |
| `not-accepted` | Our families don't accept us |
| `not-out` | One of us is out, one of us isn't |
| `faith` | Two faiths, one family |
| `blended` | Blended family, or second time around |

**Neither of those**

| id | chip |
| --- | --- |
| `just-us` | Just us, working on us |
| `rather-not-say` | I'd rather not say yet |

`rather-not-say` is rendered quieter than the rest and clears any other selection. It
behaves exactly like `just-us` downstream without labelling the person, and no plan line
is generated from it.

Below the groups, an always-visible optional field:

```
If none of these fit, say it in your own words.
[________________________________________]
Stays on this phone. We'll show it back to you, we
won't send it anywhere.
```

Stored as `ownWords`. Reflected verbatim on screen 9 and at every stage pulse. This is the
escape hatch for a couple whose problem is not on any list, and it is also where a couple
can name the pattern they are afraid of repeating.

```
                                        [ Next ]
```

Copy edits to the existing ten: `blended` becomes "Blended family, or second time around"
(was "Blended or second marriage"), and its `hereForYou` drops the word marriage. The
other nine chips keep their existing copy, which is the warmest writing in the app.

---

### 1.7 Screen 7: What better looks like

```
THIS SETS YOUR FIRST STEPS

What would better look like?
Pick one or two.
```

Base set, multi-select, maximum two:

| id | chip |
| --- | --- |
| `fight-better` | Fight without it turning into a war |
| `feel-close` | Feel close again |
| `be-heard` | Actually be heard |
| `rebuild-trust` | Rebuild trust |
| `stop-drifting` | Stop drifting |
| `enjoy-again` | Enjoy each other again |
| `unsure` | Not sure yet, just start |

One chip is **added to the top of the set** when `household` is `long-distance` or
`apart-for-now`, or `overlap` is `less-often` or `rarely`:

| id | chip |
| --- | --- |
| `stay-close-apart` | Stay close across the distance |

Two chips **replace** `rebuild-trust` and `enjoy-again` when `relType` is either separated
value, or when `next-step` or `early` is in `situations`:

| id | chip |
| --- | --- |
| `decide-honestly` | Decide honestly, together |
| `part-well` | Stop the low-grade war |

`part-well` matters more than any other chip in this spec. A couple who are separated and
co-parenting need a legitimate destination that is not reunion. Without it, the app scores
them against a target they have already rejected, and every screen reads as a failure
report. When `part-well` is selected, the app never suggests reconciliation, never asks
about new partners, and never frames separation as the thing to recover from.

Optional one-line field below the chips:

```
In your words, what would better look like six months
from now? (optional)
[________________________________________]
```

Stored as `betterLooksLike`. Shown back at every stage pulse, next to the numbers, because
for a lot of couples the honest definition of better is a run of ordinary weeks and not a
4.0 on five statements.

```
                                 [ Build our plan ]
```

---

### 1.8 Screen 8: Anything we shouldn't assume

Optional. One tap skips the whole screen. Nothing here is ever required, ever synced to a
partner, ever shown in a notification preview, and ever used to unlock or lock anything.

```
OPTIONAL                                      Skip ›

Anything we should not assume about you?
So we stop showing you things written for someone
else. These stay on this phone. They are never sent
to your partner and never appear in a notification.
Change or clear them any time in settings.
```

Chips, multi-select, no maximum, none preselected:

| id | chip | what it changes |
| --- | --- | --- |
| `kids` | There are kids in this | reveals the age row below; unmutes parenting content |
| `no-kids-by-choice` | No kids, by choice | permanently mutes parenting and baby content and the "when are you having children" framing |
| `same-sex-couple` | We're a same-sex couple | stops opposite-sex defaults in examples and stories |
| `not-out` | We're not out to everyone | mutes "tell your people" prompts; offers the app lock |
| `different-faiths` | We come from different faiths or cultures | foregrounds `faith-gap`, softens holiday prompts |
| `own-agreements` | We have our own agreement about exclusivity | mutes monogamy-assuming copy; foregrounds agreements content |
| `health-condition` | A health condition or disability is part of our life | reveals the "how long" row below |
| `neurodivergent` | One or both of us processes differently | opens the processing sheet below |
| `recovery` | Recovery is part of our life | mutes twelve-step framing as a default, never adds it |
| `few-people-nearby` | We don't have much support nearby | stops "ask the family", "accept the help" prescriptions |
| `apart-before` | We've been apart before and came back | unmutes reconciliation-aware framing without any "again" language |
| `shared-phone` | We share a phone, or someone else uses it | offers the app lock, mutes notification previews |

**`kids` age row** (revealed only if `kids` is tapped, multi-select, all optional):

```
[ Little ]  [ School age ]  [ Teens ]  [ Grown ]
[ Ours ]  [ From before ]  [ We share a schedule ]
```

This is the only place children are ever asked about, and it is opt-in on a skippable
screen. A couple with no children is never asked "do you have kids", never sees a blank
where a yes-path should be, and never gets bedtime, school-form, or handoff examples.
Silence here means the same thing as `no`: parenting content stays muted.

**`health-condition` follow-up** (revealed only if tapped, single select):

```
How long has this been part of your life?
[ This is new ]  [ Months ]  [ Years, and it isn't ending ]
```

That one follow-up is what routes a couple eight years into a chronic illness to the
`caregiving` track instead of the `illness` diagnosis track. Never ask what the condition
is. Never ask how bad it is. Never ask who the caregiver is.

**`neurodivergent` sheet** (revealed only if tapped). Header:

> Not a screener. No score, no label, no result. These set defaults you can change.

Per-person chips, each assignable to either name, multi-select, all optional:

```
needs things said literally
needs time before a hard conversation
needs a long recovery after one
loses the thread in long turns
reads flat tone as rejection
sensitive to noise or light
prefers side by side over face to face
prefers writing to speaking
```

Stored per partner, not per couple, in `processing: { a: [], b: [] }`. Two people can have
opposite needs and a couple-level setting would be wrong for one of them by design.

At the bottom of the sheet, optional and skippable, exactly this wording and no scoring:

```
[ I'm autistic ]  [ I have ADHD ]  [ Neither ]  [ Rather not say ]
```

Also in the sheet, three interface defaults, because asking them here is the clearest
signal the app expects different bodies:

```
Reduce motion        [ on / off ]   (defaults to the OS setting)
Haptics              [ on / off ]
Timer display        [ countdown / elapsed ]
```

```
                          Skip this        [ Done ]
```

---

### 1.9 Screen 9: Your plan

See section 4 for the full template, variables, and fallback rules.

---

## 2. What it captures: exact TypeScript

All new fields are optional so v1 profiles keep working and every screen degrades by
omitting a line, never by inventing one.

### 2.1 `src/lib/store.ts`

```ts
export type RelationshipType =
  | "together"
  | "married"
  | "dating"
  | "partnered"
  | "engaged"
  | "civil-partnership"
  | "separated-coparenting"
  | "separated-untangling"
  | "no-word"
  | "self-described";

/** What the couple wants to be called. Wording and ordering only, never access. */
export type Term =
  | "partner"
  | "boyfriend-girlfriend"
  | "spouse"
  | "husband"
  | "wife"
  | "fiance"
  | "co-parent"
  | "names"
  | "own-word";

export type Household =
  | "share-home"
  | "two-places"
  | "long-distance"
  | "apart-for-now"
  | "rather-not-say";

export type Overlap =
  | "most-days"
  | "few-days-week"
  | "about-weekly"
  | "less-often"
  | "rarely";

export type TogetherLength =
  | "under-1"
  | "1-3"
  | "3-10"
  | "10-plus"
  | "on-and-off"
  | "rather-not-say";

export type Goal =
  | "fight-better"
  | "feel-close"
  | "be-heard"
  | "rebuild-trust"
  | "stop-drifting"
  | "enjoy-again"
  | "stay-close-apart"
  | "decide-honestly"
  | "part-well"
  | "unsure";

/** Optional, local-only, never synced to a partner, never in a notification. */
export type ContextTag =
  | "kids"
  | "no-kids-by-choice"
  | "same-sex-couple"
  | "not-out"
  | "different-faiths"
  | "own-agreements"
  | "health-condition"
  | "neurodivergent"
  | "recovery"
  | "few-people-nearby"
  | "apart-before"
  | "shared-phone";

export type KidTag =
  | "little"
  | "school-age"
  | "teens"
  | "grown"
  | "ours"
  | "from-before"
  | "shared-schedule";

export type HealthDuration = "new" | "months" | "ongoing";

export type ProcessingNeed =
  | "literal"
  | "runway-before"
  | "recovery-after"
  | "short-turns"
  | "flat-tone-reads-as-rejection"
  | "sensory"
  | "side-by-side"
  | "writing-over-speaking";

export type NdLabel = "autistic" | "adhd" | "neither" | "rather-not-say";

/** How the couple wants to be paced. Chosen on the plan screen, changeable any time. */
export type Pace = "staged" | "loose";

export type TimerPrefs = {
  /** seconds per protected turn. 90 must be offered. */
  turnSeconds: number;
  rounds: number;
  /** minutes of cool-down, or "we-say-when" */
  breakMinutes: number | "we-say-when";
  display: "countdown" | "elapsed";
};

export type Profile = {
  // --- v1, unchanged ---
  a: string;
  b: string;
  safetyAck: boolean;
  createdAt: string;
  /** legacy single situation from v1. Read through `situationsOf()`, never written by v2. */
  situation?: Situation;
  lenses?: { a?: LensId; b?: LensId };
  roles?: { a?: ConflictRole; b?: ConflictRole };

  // --- screen 4 ---
  pronouns?: { a?: string; b?: string };
  soloStart?: boolean;

  // --- screen 5 ---
  relType?: RelationshipType;
  relTypeOther?: string;
  term?: Term;
  termOther?: string;
  /** set only when "different for each of us" was used */
  terms?: { a?: Term; b?: Term };
  household?: Household;
  overlap?: Overlap;
  length?: TogetherLength;
  /** "and in this chapter?", for couples with more than one number */
  chapterLength?: TogetherLength;

  // --- screen 6 ---
  /** max 2. Empty when the user chose "I'd rather not say yet". */
  situations?: Situation[];
  ownWords?: string;

  // --- screen 7 ---
  goals?: Goal[];          // max 2
  betterLooksLike?: string;

  // --- screen 8, all optional, all local-only ---
  contextTags?: ContextTag[];
  kids?: KidTag[];
  healthDuration?: HealthDuration;
  processing?: { a?: ProcessingNeed[]; b?: ProcessingNeed[] };
  ndLabel?: { a?: NdLabel; b?: NdLabel };

  // --- screen 9 and settings ---
  pace?: Pace;
  timer?: TimerPrefs;
  reduceMotion?: boolean;
  haptics?: boolean;
};

/** v1 to v2 read bridge. Never write `situation` again. */
export function situationsOf(p: Profile | null): Situation[] {
  if (!p) return [];
  if (p.situations?.length) return p.situations;
  return p.situation ? [p.situation] : [];
}
```

### 2.2 Sync boundary (hard requirement)

`contextTags`, `kids`, `healthDuration`, `processing`, `ndLabel`, `ownWords`, and
`betterLooksLike` are **local-first and are excluded from any payload written to the
shared couple space**. They may ride along in the user's own `BackupState` to their own
account, because that restores to their own device. They must never be readable by
partner B.

Reason, in one sentence: one partner may be out and the other may not be, one may be in
recovery and not have told their family, and a shared space that leaks a tag creates
real-world risk that a relationship app has no business creating.

Add to `src/lib/space.ts` a `SHARED_PROFILE_FIELDS` allowlist and build the shared payload
from it, so the boundary is enforced by construction rather than by memory:

```ts
export const SHARED_PROFILE_FIELDS = [
  "a", "b", "relType", "relTypeOther", "term", "termOther", "terms",
  "household", "overlap", "length", "chapterLength", "createdAt",
] as const;
```

### 2.3 `src/lib/situation.ts` additions

`SituationDef` gains two fields:

```ts
export type SituationDef = {
  id: Situation;
  chip: string;
  icon: keyof typeof Ionicons.glyphMap;
  hereForYou: string;
  /** NEW: lowercase clause used inside the plan sentence on screen 9 */
  planPhrase: string;
  /** NEW: which of the three groups on screen 6 it sits in */
  group: "between-us" | "life" | "who-else";
  track: string;
  trackTitle: string;
  stories: string[];
  decks: string[];
  heavy: boolean;
};

export type Situation =
  // existing ten
  | "drift" | "affair" | "loss" | "baby" | "money" | "illness"
  | "desire-gap" | "blended" | "faith" | "just-us"
  // new twelve
  | "conflict-pattern" | "old-hurt" | "next-step" | "early"
  | "agreements" | "untangling" | "recovery" | "apart"
  | "far-from-home" | "family-vote" | "not-accepted" | "not-out";
```

`rather-not-say` is **not** a `Situation`. It is a UI-only choice that stores
`situations: []`, so nothing downstream has to special-case a fake id.

New definitions, ready to paste. `track: ""` means no heavy track exists yet; the plan
screen omits the track block entirely rather than pointing at content that is not written.

| id | chip | planPhrase | track | decks | heavy | needs a track written |
| --- | --- | --- | --- | --- | --- | --- |
| `conflict-pattern` | Nobody taught us how to argue | learning to fight without wrecking things | `""` | `repair`, `first-steps` | true | yes: "How to argue" |
| `old-hurt` | One of us is carrying hurt from before us | carrying something from before you two | `""` | `repair`, `go-deeper` | true | yes: "Hurt from before us" |
| `next-step` | We're deciding on a big next step | deciding on a big next step | `""` | `go-deeper`, `dreams` | false | yes: "Deciding together" |
| `early` | We're early and figuring it out | early, and figuring it out | `""` | `first-steps`, `lighter` | false | no |
| `agreements` | We're renegotiating our agreements | rewriting the agreements between you | `""` | `go-deeper`, `repair` | true | yes: "Agreements" |
| `untangling` | We're untangling and want to do it well | untangling, and wanting to do it well | `""` | `repair`, `first-steps` | true | yes: "Untangling well" |
| `recovery` | Addiction or recovery is in this | rebuilding trust around recovery | `""` | `repair`, `first-steps` | true | yes: "Recovery" |
| `apart` | We barely see each other | apart more than you're together | `""` | `first-steps`, `go-deeper` | true | yes: "Apart more than together" |
| `far-from-home` | We're far from home | far from everyone who raised you | `scarcity` | `first-steps`, `lighter` | true | partial |
| `family-vote` | Family has a vote in us | working out how much say family gets | `""` | `go-deeper`, `repair` | true | yes: "Family has a vote" |
| `not-accepted` | Our families don't accept us | holding on where your families won't | `""` | `go-deeper`, `repair` | true | yes: "When they don't accept us" |
| `not-out` | One of us is out, one of us isn't | living at two different speeds in public | `""` | `go-deeper`, `first-steps` | true | yes: "Out at different speeds" |

`planPhrase` for the existing ten:

| id | planPhrase |
| --- | --- |
| `drift` | closing the distance between you |
| `affair` | rebuilding after an affair |
| `loss` | carrying a loss together |
| `baby` | finding each other again after a baby |
| `money` | under real money strain |
| `illness` | partners through illness |
| `desire-gap` | finding your way back to closeness |
| `blended` | building a family out of two |
| `faith` | loving across a line of belief |
| `just-us` | here on purpose, with no crisis |

Copy edit to `blended`: chip becomes "Blended family, or second time around", and
`hereForYou` becomes:

> You're building something new through family shrapnel. There's a path for exactly this.

Copy edit to `just-us` `hereForYou`, to remove the implication that no crisis means no
reason to be here:

> No emergency, just care. You're here to build something stronger on purpose.

---

## 3. The safety gate

### 3.1 Placement

Screen 3. After the deal, before names, before anything personal. It does not move for
any reason, including to make room for the new questions. Every new question in this spec
sits after it.

Partner B answers it fresh, on their own device, privately, before they see anything in
the shared space. It is never inherited, never pre-answered, and their answer is never
shown to partner A.

### 3.2 Why the wording changes at all

Several persona reports asked for the gate to be left byte-for-byte alone and only have
the word "marriage" removed from `whyGateMatters`. The safety research disagrees on one
point and the safety research wins: a fear-only question misses coercive control, because
control frequently does not register as fear and rarely involves a moment the person
would call violence. The change below is **additive**. It keeps the existing question, it
keeps the "not do we fight" move that lowers false positives, it keeps both doors at equal
visual weight, and it does not shorten the screen. It adds a behavioural list, because the
list is what makes control recognisable to someone who has not yet decided that a word
like abuse applies to them.

### 3.3 Final copy

```
ONE HONEST QUESTION

Is there violence, fear, or control between you?

Not "do we argue." Arguing is why Mend exists. This is
different, and it includes being afraid of the other
person.

It looks like: being hurt or threatened. Being afraid
of a reaction. Being cut off from friends or family.
Having your phone, your messages, your location, your
money, or where you go controlled. Being threatened
with your immigration status, your kids, or being
outed. Changing what you do to keep the peace.

[whyGateMatters]

        [ None of that is happening. Continue ]
   [ I'm not sure, or I don't feel safe. Show me help ]
```

Both buttons stay visually equal. The second is never styled as the lesser path, never
smaller, never fine print, and never worded as a failure.

### 3.4 Rewritten `whyGateMatters` in `src/lib/content/safety.ts`

```
Guided couple conversations assume both partners are safe to be honest with each
other. In relationships with violence, threats, or coercive control, that assumption
fails: "communication exercises" can give a controlling partner material and make
things more dangerous. This isn't about your relationship being "bad enough"; it's
about the right tool. A therapist who takes on a couple screens each partner
privately before deciding whether joint work is safe. Mend cannot do that. It cannot
see your room, cannot talk to either of you alone, and cannot tell the difference
between a couple who fight badly and a relationship where one person is being
controlled. So it errs toward caution and points you to people who can. If any of
this rings true, please start with the hotline. It's free, confidential, and staffed
by people who will help you think it through.
```

Two changes from v1: "your marriage being bad enough" becomes "your relationship", and
the "why this app cannot screen you" passage is added. The private-screening standard is
from APA, https://www.apa.org/pubs/highlights/spotlight/issue-270 (cited in
`docs/research/safety-across-types.md`, retrieved 2026-07-19).

### 3.5 Standing rules, to be written into the code comments above the gate

```ts
// The safety gate. Standing rules, do not relax any of them:
//  1. Asked of every individual, including partner B, on their own device, privately.
//  2. Never A/B tested, never optimized for continuation, never counted as a funnel
//     step. If more people take the second door, the gate is working.
//  3. Never gated on relationship type, tier, language, or a completed profile.
//  4. Never shortened, never reordered, never moved behind a "learn more".
//  5. Never shown machine-translated. English plus an honest note beats a guess.
//  6. Never given an extra interrogation branch for any relationship structure.
//     Non-monogamy is not a risk factor and must not be treated as one.
```

### 3.6 Re-askable later

Add a Settings row, worded without accusation, because circumstances change and because a
person who took door one at 11pm may need door two in March:

```
Safety
Read the safety page, any time
Nothing about this is recorded or shared.
```

It opens `/safety` directly. It does not re-run the gate as a quiz, does not log an
answer, and does not appear as a badge or a prompt.

### 3.7 A second, quiet safety read

On screen 5 row 3 and row 4 the app learns whether the couple can be in a room together.
Where content later needs the two of them in the same room for a hard conversation, the
session setup asks once, in context, never at onboarding:

> Is being in the same room for this workable right now?
> [ Yes ]  [ Only somewhere public ]  [ Separate phones is better ]

Any answer other than `Yes` shows the safety page link once, without accusation, and then
sets the session mode and moves on. It is never repeated, never escalated, and never
stored as a flag about the relationship.

---

## 4. Screen 9: the payoff

The most important screen in the flow, and the one that does not exist today. It must
quote the couple, name the consequences, and offer one action.

### 4.1 Layout and template

```
  YOUR PLAN

  {A} and {B}.
  {sentence}

  "{ownWords}"                            (only if set)

  ------------------------------------------------
  WHERE YOU START
  Stage {n} of 5. {stageTitle}.
  Your first step: "{firstStepTitle}"

  YOUR TRACK                              (omitted if none)
  {trackTitle}
  Because of what you told us you're carrying.

  YOUR FIRST DECK
  {deckTitle}. {deckCount} cards, {deckTone}.

  YOUR TIMER
  Set up for {A} and {B}. {timerPhrase}
  One speaks protected, the other proves they heard.
  [ Change ]

  HOW WE'LL PACE YOU
  [ Take me through it, stage by stage ]
  [ Keep it loose, I'll come to you ]
  ------------------------------------------------

  [ Start your first ten minutes ]              primary

  {B} hasn't joined yet.                        (if soloStart)
  [ Send {B} the invite ]                       secondary

  Keep this private?
  Face ID or your passcode, so Mend opens only for you.
  Some people share a phone. Some just want it quiet.
  [ Turn on the lock ]                          tertiary

  You can change any of this in settings. Nothing here
  is locked in, and nothing is locked away.
```

### 4.2 The sentence: assembly rules

```
{sentence} = [{lengthClause}], [{householdClause}], [{carryClause}],
             and you want to {goalClause}.
```

Clauses are joined with commas, in this order, **omitting any clause whose input is
missing or was declined**. Never substitute a guess. If every clause is missing, the
sentence is replaced by a single line: `You told us enough to start. That's plenty.`

| variable | source | value |
| --- | --- | --- |
| `{A}` `{B}` | screen 4 | first names. If only one was given, the sentence uses `{A}` and the pair line becomes `{A}, and the person you're here for.` |
| `{lengthClause}` | `length` | `under-1` "Together under a year" / `1-3` "Together one to three years" / `3-10` "Together three to ten years" / `10-plus` "Together ten years or more" / `on-and-off` "Together on and off". `rather-not-say` or missing: omitted. If `chapterLength` is set, append ", and {chapterPhrase} in this chapter" using the same table lowercased. |
| `{householdClause}` | `household` | `share-home` "sharing a home" / `two-places` "in two places" / `long-distance` "long distance" / `apart-for-now` "apart for now". `rather-not-say` or missing: omitted. |
| `{carryClause}` | `situations` | one or two `planPhrase` values joined with " and ". Empty: omitted. |
| `{goalClause}` | `goals` | one or two goal phrases joined with " and ". See table below. |
| `{ownWords}` | `ownWords` | rendered verbatim, in quotes, on its own line, never edited, never summarised. Omitted if empty. |

Goal phrases:

| goal | phrase |
| --- | --- |
| `fight-better` | fight without it turning into a war |
| `feel-close` | feel close again |
| `be-heard` | actually be heard |
| `rebuild-trust` | rebuild trust |
| `stop-drifting` | stop drifting |
| `enjoy-again` | enjoy each other again |
| `stay-close-apart` | stay close across the distance |
| `decide-honestly` | decide honestly, together |
| `part-well` | stop the low-grade war |
| `unsure` | (special: the whole goal clause becomes "and you're not sure yet what better looks like, which is a fine place to start") |

Worked example, Maya and Jordan (together two years, two apartments, deciding whether to
move in, one of them carrying an old hurt):

> **Maya and Jordan.**
> Together one to three years, in two places, deciding on a big next step and carrying
> something from before you two, and you want to fight without it turning into a war.

Worked example, Ana (separated, co-parenting, starting alone):

> **Ana and Luis.**
> Together ten years or more, in two places, untangling and wanting to do it well, and
> you want to stop the low-grade war.

Worked example, a user who skipped almost everything:

> **Devon and Alex.**
> Long distance, and you want to stay close across the distance.

### 4.3 The plan blocks

| block | source | omitted when |
| --- | --- | --- |
| WHERE YOU START | `stages[0]` from `src/lib/journey.ts`, first step of the resolved journey variant | never |
| YOUR TRACK | `trackTitle` of the highest-priority selected situation that has a non-empty `track` | no selected situation has a track. **Omit the whole block. Never point at content that is not written.** |
| YOUR FIRST DECK | first entry of the merged `decks` list, resolved per section 6 | never |
| YOUR TIMER | `timer`, defaulted per section 4.4 | never |
| HOW WE'LL PACE YOU | user choice, writes `pace` | never |

`{deckTone}` values: `first-steps` "easy ones", `go-deeper` "the real ones",
`lighter` "the fun ones", `repair` "for after a bad one", `desire` "gentle ones",
`dreams` "the ones about later". `{deckCount}` is read from the deck, never hardcoded.

### 4.4 Timer defaults, derived not asked

`{timerPhrase}` renders the resolved defaults in plain words, and `[ Change ]` opens the
same control. Resolution order, first match wins:

| condition | turn | rounds | break | phrase |
| --- | --- | --- | --- | --- |
| `processing` includes `short-turns` for either partner | 90s | 3 | we say when | "Ninety seconds each, three rounds, break when either of you calls it." |
| `overlap` is `less-often` or `rarely` | 2 min | 2 | 20 min | "Two minutes each, two rounds. Short on purpose." |
| `household` is `long-distance` or `apart-for-now` | 3 min | 2 | we say when | "Three minutes each, on two phones, written or spoken." |
| default | 3 min | 2 | 20 min | "Three minutes each, two rounds, twenty-minute break if it gets hot." |

The `[ Change ]` control must offer 90 seconds as a real option and must offer
`we'll say when` as a break option. Both exist because a couple who cannot do five
minutes should not be handed a five-minute floor as the shortest thing available.

### 4.5 Reveal behaviour

The plan assembles in front of the user using the existing `Rise` component with a 120ms
stagger, in block order. If `reduceMotion` is on, or the OS reports reduce-motion, every
block renders immediately with no stagger and no fade.

### 4.6 Hard rules for this screen

- Every line is derived. No boilerplate, no placeholder, no invented statistic, no
  fabricated "couples like you" claim. If a field is missing, the line is omitted.
- Nothing on this screen is paywalled. The plan is the proof and charging for the proof
  inverts the deal.
- One primary action. Not a menu. The plan's credibility is that it knows what is next.
- The invite appears only when `soloStart` is true or partner B has not joined.
- The screen never renders a score, a percentage, a readiness verdict, a prediction, or
  any statement about whether the relationship will last.

---

## 5. Partner B joins

### 5.1 The invite

Generated from the existing space code in `src/lib/space.ts` (`createSpace`, `joinSpace`).
Partner A taps `Send {B} the invite` on screen 9 or from the Space tab. The share sheet
carries this text, and nothing else. No situation, no goals, no tags.

```
{A} started something on an app called Mend and wants
you in it. It's a private space for the two of you.
Your code is {code}.
```

The code is the only thing that travels. The message must never name what A is carrying.

### 5.2 Partner B's flow: five screens, about 45 seconds

```
1  You're invited      no input        ~8s
2  The deal            no input       ~15s   identical, disclaimer included
3  Safety gate         1 tap          ~12s   identical, fresh, private
4  Your side of it     2 to 4 taps    ~20s   carrying + goals, their own answers
5  Your plan           reveal          ---   the shared plan, plus what they added
```

**Screen 1: You're invited**

```
[Wordmark]

{A} asked you into this.

Mend is a private space for the two of you. {A} has
already set up the shape of it, so this takes about a
minute. What you answer next is yours, and we'll tell
you what {A} can see.

                                       [ Begin ]
                                Enter a code instead
```

If they arrived without a code, `Enter a code instead` shows a single code field. Never an
email, never an account, never a password.

**Screen 2: The deal.** Byte-identical to screen 2 of the main flow, including the
educational-tool disclaimer. Never abbreviated because "their partner already agreed".

**Screen 3: Safety gate.** Byte-identical to section 3.3. Asked fresh. Answered privately.
Partner A is never told which door B took, never told that B reached the gate, and never
shown a completion state that would reveal it. If B takes door two, the app shows the
safety page and does **not** notify A, does not mark the invite as declined, and does not
change anything on A's device.

**Screen 4: Your side of it**

```
YOUR ANSWERS, NOT A QUIZ

What are you carrying?
{A} answered this too. Neither of you sees the other's
answer until you've both sent one.
```

Same chip set, same maximum of two, same `I'd rather not say yet`, same own-words field.
Then, on the same screen after the first selection:

```
And what would better look like?
```

Same goal chips, resolved against the inherited `relType`, `household` and `overlap`, so B
sees the same variant set A saw.

```
                                   [ See our plan ]
```

**Screen 5: Their plan.** Same template as section 4, built from the shared fields plus
B's own answers. One extra block at the top when both have now answered:

```
  WHERE YOU TWO LINE UP
  You both said: {overlap of situations and goals}
  You each said: {A}: {A's unique}. {B}: {B's unique}.
  Neither of those is a problem. It's your first
  conversation.
  [ Start there ]
```

If there is no overlap, the copy is:

```
  You each brought something different, which is
  normal and is worth ten minutes.
```

Never a score. Never a compatibility number. Never a verdict. Never a "you disagree"
frame.

### 5.3 What B inherits and what B is asked fresh

| Inherited from the space, never re-asked | Asked fresh, because it is an opinion |
| --- | --- |
| both names | the safety gate |
| `relType`, `relTypeOther` | `situations` |
| `term`, `termOther`, `terms` | `ownWords` |
| `household`, `overlap` | `goals`, `betterLooksLike` |
| `length`, `chapterLength` | pronouns for themselves |
| journey stage and progress | pace preference |

**Never inherited, never transmitted, in either direction:** `contextTags`, `kids`,
`healthDuration`, `processing`, `ndLabel`, and the other partner's `ownWords` and
`betterLooksLike` before both have answered. See 2.2.

If B disagrees with an inherited field, they can change it, and the change applies to the
shared space with a small neutral line on both devices: `{B} updated how you two work.`
No history, no diff, no "A said X".

---

## 6. Mapping: type and situation to track, decks, and journey variant

### 6.1 Journey variants

```ts
export type JourneyVariant = "standard" | "distance" | "deciding" | "untangling";
```

| variant | what changes | what never changes |
| --- | --- | --- |
| `standard` | nothing; the five stages as written | |
| `distance` | session mode defaults to two phones and written exchange; `weeksHint` softened to "at your pace"; every micro-move requiring a shared address is filtered out; the 7-day challenge becomes "seven moves, at your pace" | the stages, the pulse, the gate |
| `deciding` | stage 4 and 5 reframe from preservation to clarity; the sentence "the honest answer may be no" appears in the stage copy, not only in a disclaimer; no content pressures a commitment step | the stages, the pulse, the gate |
| `untangling` | goal is a workable low-conflict arrangement, not reunion; desire and dreams decks are de-emphasised, never removed; reconciliation is never suggested; co-parenting handoff content is foregrounded when `kids` is set | the stages, the pulse, the gate |

Resolution, first match wins:

```ts
function variantOf(p: Profile): JourneyVariant {
  const s = situationsOf(p);
  if (p.relType === "separated-coparenting" || p.relType === "separated-untangling") return "untangling";
  if (s.includes("untangling")) return "untangling";
  if (p.goals?.includes("part-well")) return "untangling";
  if (p.goals?.includes("decide-honestly")) return "deciding";
  if (s.includes("next-step") || s.includes("early")) return "deciding";
  if (p.household === "long-distance" || p.household === "apart-for-now") return "distance";
  if (p.overlap === "less-often" || p.overlap === "rarely") return "distance";
  return "standard";
}
```

`pace: "loose"` is orthogonal. It changes the home surface from a staged plan to a
rotating single small move, and it never changes which variant selected the content.

### 6.2 Relationship type: what each type changes

`noun` is the single token every string uses instead of hardcoding "marriage". The copy
sweep is: every user-facing string reads `{noun}` or is rewritten to need no noun at all.

| relType | `{noun}` | `{partnerWord}` default | journey variant floor | foregrounded | muted (never removed) |
| --- | --- | --- | --- | --- | --- |
| `married` | relationship (marriage is permitted only inside content explicitly about marriage: vows, in-laws by marriage, legal) | spouse | standard | full library | none |
| `civil-partnership` | relationship | partner | standard | full library | wedding-specific, legal-marriage-specific |
| `engaged` | relationship | fiancé / fiancée | standard | `first-steps`, `repair`, conflict content | long-history content, empty nest, twenty-year gridlock, menopause |
| `partnered` | relationship | partner | standard | full library | wedding, legal, in-laws-by-marriage |
| `together` | relationship | partner | standard | full library | wedding, legal |
| `dating` | relationship | boyfriend / girlfriend | standard | `first-steps`, `lighter`, repair practice | shared-finances, shared-lease, in-laws, legal, permanence-as-leverage framing |
| `no-word` | relationship | their names | standard | full library | wedding, legal |
| `self-described` | their word, verbatim | partner | standard | full library | wedding, legal |
| `separated-coparenting` | co-parenting | co-parent | `untangling` | `repair`, handoff and logistics content | `desire`, `dreams`, reunion framing, date-night rituals |
| `separated-untangling` | this | their names | `untangling` | `repair`, `first-steps` | `desire`, `dreams`, reunion framing |

Additional rule for every unmarried type: nothing is ever framed as missing, pending,
partial, or "not yet". A couple who are eleven years in without a licence get the same
milestones, the same achievements, and the same stage-5 language as anyone else.

Stage 5 is currently titled "Build the marriage you meant". Retitle to
**"Build the thing you meant to build"**, which is correct for everyone and needs no token.

### 6.3 Household and overlap: what they change

| input | value | consequence |
| --- | --- | --- |
| `household` | `share-home` | full ritual list, reunion hug, driveway handoff, "our place" cards all enabled |
| | `two-places` | shared-address rituals filtered out; arrival and departure rituals substituted; "our place" cards suppressed |
| | `long-distance` | as above, plus `distance` variant, plus written asynchronous session mode as the default |
| | `apart-for-now` | as long distance, plus the season is named in copy ("for now"), never treated as the end state |
| | `rather-not-say` | treat as `two-places` for filtering, and never render a line that asserts either way |
| `overlap` | `most-days` | 7-day challenge runs as seven days |
| | `few-days-week` | 7-day challenge becomes "seven moves, at your pace" |
| | `about-weekly` | as above, plus weekly ritual list only |
| | `less-often` / `rarely` | `distance` variant, 2-minute micro-format tier foregrounded, `weeksHint` hidden entirely, deal card reads "twenty minutes a week, however you can get them" |

### 6.4 Situation: track, decks, heavy

Existing ten, unchanged from `src/lib/situation.ts`:

| situation | track | decks | heavy |
| --- | --- | --- | --- |
| `drift` | none | `first-steps`, `go-deeper` | false |
| `affair` | `affair` | `repair`, `first-steps` | true |
| `loss` | `grief` | `first-steps`, `repair` | true |
| `baby` | `new-baby` | `first-steps`, `lighter` | true |
| `money` | `money-crisis` | `first-steps`, `go-deeper` | true |
| `illness` | `illness`, or `caregiving` when `healthDuration` is `ongoing` | `first-steps`, `go-deeper` | true |
| `desire-gap` | `desire-gap` | `desire`, `go-deeper` | true |
| `blended` | `blended` | `go-deeper`, `first-steps` | true |
| `faith` | `faith-gap` | `go-deeper`, `first-steps` | true |
| `just-us` | none | `go-deeper`, `lighter`, `dreams` | false |

The `illness` to `caregiving` reroute is new and is the single highest-value routing fix
in this spec: a couple eight years into a chronic illness should not be handed the
diagnosis track.

New twelve: see the table in section 2.3. Seven of them need a track written and until
then the plan screen omits the track block and leads with decks and the journey stage.

### 6.5 Combining two situations

When two are selected, resolve like this and do not attempt to merge tracks:

```
track     = the selected situation with heavy === true, and a non-empty track.
            If both qualify, the earlier one in the `situations` array wins
            (which is selection order, so the user decided).
            If neither has a track, omit the track block.
decks     = dedupe([...first.decks, ...second.decks]), first four kept
stories   = dedupe([...first.stories, ...second.stories])
heavy     = first.heavy || second.heavy
hereForYou = first.hereForYou   (one voice, never two stitched together)
planPhrase = both, joined with " and "
```

The second situation is never discarded: it always contributes decks, stories, and its
`planPhrase` on the payoff screen. That is the whole point of allowing two.

### 6.6 The combinations that matter, resolved

These are the sixteen persona cases, run through the rules above, as an acceptance test.

| couple shape | relType, household, overlap | situations | goals | variant | track | first deck | notable mutes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| two years, two apartments, deciding on moving in | `together`, `two-places`, `few-days-week` | `next-step`, `old-hurt` | `fight-better` | `deciding` | none (omit block) | `go-deeper` | parenting, marriage, wedding, shared-address rituals |
| engaged, wedding in six months, fighting daily | `engaged`, `share-home`, `most-days` | `conflict-pattern`, `family-vote` | `fight-better`, `be-heard` | `standard` | none (omit block) | `repair` | parenting, long-history, empty nest |
| fourteen months, three time zones | `together`, `long-distance`, `about-weekly` | `apart`, `early` | `stay-close-apart` | `distance` | none (omit block) | `first-steps` | shared address, marriage, parenting |
| nine years, two kids, never married | `together`, `share-home`, `most-days` | `drift` | `stop-drifting`, `feel-close` | `standard` | none | `first-steps` | wedding, legal, anniversary framing |
| queer couple, four years, one not out | `together`, `share-home`, `most-days` | `not-out`, `not-accepted` | `be-heard` | `standard` | none (omit block) | `go-deeper` | parenting, wedding; lock offered on screen 9 |
| thirteen years, married six, seven months flat | `married`, `share-home`, `most-days` | `drift`, `desire-gap` | `feel-close` | `standard` | `desire-gap` | `desire` | parenting; `chapterLength` used in the sentence |
| remarried to each other after a divorce | `married`, `share-home`, `most-days` | `conflict-pattern`, `illness` | `fight-better` | `standard` | `caregiving` if `healthDuration` is `ongoing`, else `illness` | `repair` | parenting; `apart-before` tag active; `ownWords` shown at every pulse |
| separated a year, one son, low-grade war | `separated-coparenting`, `two-places`, `few-days-week` | `untangling` | `part-well` | `untangling` | none (omit block) | `repair` | desire, dreams, reunion framing, date nights |
| married eight months, family pressure | `married`, `share-home`, `most-days` | `family-vote`, `faith` | `be-heard` | `standard` | `faith-gap` | `go-deeper` | parenting, baby, long-history |
| nine years, one three-year-old, faith fault line | `together`, `share-home`, `most-days` | `faith`, `drift` | `be-heard`, `feel-close` | `standard` | `faith-gap` | `go-deeper` | wedding, legal; `kids: little` active |
| immigrated three years ago, opposite shifts | `married`, `share-home`, `rarely` | `apart`, `far-from-home` | `stay-close-apart` | `distance` | `scarcity` | `first-steps` | "ask the family", weeksHint hidden, 2-minute tier on |
| ADHD and autistic pairing, four years | `partnered`, `share-home`, `most-days` | `conflict-pattern` | `be-heard` | `standard` | none (omit block) | `repair` | timer defaults to 90s turns, break "we say when" |
| eleven years, lupus year eight, no kids | `together`, `share-home`, `most-days` | `illness`, `drift` | `feel-close` | `standard` | `caregiving` (via `healthDuration: ongoing`) | `first-steps` | all parenting; `pace: loose` offered prominently |
| eighteen months sober, committed, not married | `partnered`, `share-home`, `most-days` | `recovery` | `rebuild-trust` | `standard` | none (omit block) | `repair` | parenting, marriage, twelve-step framing as default |
| fourteen years, open two years, security crisis | `partnered`, `share-home`, `most-days` | `agreements` | `rebuild-trust`, `be-heard` | `standard` | none (omit block) | `go-deeper` | parenting, monogamy-assuming copy; **no extra safety branch** |
| first serious relationship each, two years, no shared lease | `dating`, `two-places`, `few-days-week` | `conflict-pattern` | `fight-better` | `standard` | none (omit block) | `repair` | house, bedtime, kitchen table, shared finances; break is over text in two buildings |

Reading that table, ten of sixteen land on "track: none". That is the honest state of the
library today and it is the content backlog this spec produces: **How to argue, Hurt from
before us, Deciding together, Agreements, Untangling well, Recovery, Family has a vote,
When they don't accept us, Out at different speeds, Apart more than together.** Until they
exist, the plan screen omits the block. It never points at a track that is not written.

---

## 7. Everything is editable, and where

A Settings section called `How you two work`, one row per screen-5 and screen-6 answer,
each opening the same control the onboarding used:

```
How you two work
  What you call this           Together        ›
  What you call each other     Partner         ›
  How your weeks work          Two places      ›
  Same room, how often         A few days      ›
  How long                     1 to 3 years    ›
  What you're carrying         2 selected      ›
  What better looks like       2 selected      ›
  Things we shouldn't assume   3 selected      ›
  Pacing                       Stage by stage  ›
  Timer defaults               3 min, 2 rounds ›
  Clear everything above       (destructive)   ›
```

`Clear everything above` wipes every personalization field and returns the app to neutral
defaults without touching sessions, plan, pulses, or journey progress. It exists because a
person whose situation changed should not have to reinstall to stop being reminded of the
old one.

---

## 8. What v2 must not do

- Must not weaken, reorder, shorten, translate by machine, or skip the safety gate for any
  user, including partner B, including returning users on a new device.
- Must not require an email, an account, or a partner to finish. The invisible anonymous
  account minted at the gate stays exactly as it is.
- Must not gate any feature, track, deck, story, achievement, or safety resource on a
  relationship type, a context tag, a tier, or partner B joining.
- Must not paywall anything in this flow, including the plan screen.
- Must not say marriage, spouse, husband, or wife in any shared string. Those words are
  correct only inside content explicitly about marriage, or when the couple picked them.
- Must not sync a context tag, a processing need, a kids answer, a health answer, or an
  own-words line to the other partner's device.
- Must not surface which partner gave which pulse score. The existing decision in
  `src/app/(tabs)/journey.tsx` is correct and extends to everything new here.
- Must not render a score, a percentage, a prediction, a readiness verdict, or a
  "couples like you" claim anywhere in onboarding or on the plan screen.
- Must not add a question that does not change what the app renders.

---

## 9. What to measure

- Per-screen drop, and time to plan.
- **Plan-to-first-action**: the share of users who tap `Start your first ten minutes` on
  screen 9. That single number tells you whether the payoff is credible.
- Invite-sent rate on screen 9, and partner-join rate within 72 hours.
- Skip rate on screen 8. A high skip rate is fine. A low skip rate with low completion of
  the chips means the framing is reading as disclosure rather than configuration.
- Safety-gate second-door rate, tracked as a health metric and never as a loss. It is the
  one number in this funnel that is allowed to go up, and it is never optimized down.

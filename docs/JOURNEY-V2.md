# Journey V2: the 5-stage program for every relationship type

The journey is Mend's spine. It was written for a married couple living in one house. This
document specifies how it becomes a journey for every type in
`src/lib/content/relationships.ts` without forking the program, without a second stage array,
and without weakening a single safety mechanic.

**What this document binds.** `src/lib/journey.ts` (stages, steps, `PULSE_QUESTIONS`, gating,
graduation), plus the two screens that consume it: `src/app/(tabs)/journey.tsx` and
`src/app/pulse.tsx`.

**Its inputs.** The shipped type model in `src/lib/content/relationships.ts`, the shipped
`Profile` in `src/lib/store.ts`, and `docs/RELATIONSHIP-EXPANSION.md` sections 2.2, 5.1 through
5.5, and 6.

---

## 0. Constraints, restated because they are the point

1. **Type is a lens, never a gate.** Variants may change wording, ordering, and whether a step is
   rendered. They may never change what content a couple can reach, and they may never price
   anything differently. This is the `relationships.ts` header rule applied to the journey.
2. **Safety never personalizes.** The domestic violence gate, the "educational tool, not therapy"
   framing, `/safety`, crisis resources, and every per-track red flag are global, identical for
   every type, and free. Nothing in this document may be implemented by editing them. Section 6
   is the explicit audit of that promise.
3. **Never assume forward motion.** No stage title, step, pulse statement, or graduation string
   may imply that moving in, getting engaged, marrying, or staying together is the healthy
   outcome. For a couple who are deciding, the app must be visibly neutral or it is refereeing.
4. **The wide word wins.** Where a string is ambiguous, ship "relationship." A married couple
   reading "relationship" is unbothered.
5. **No fabricated data.** No statistic, frequency claim, or clinical assertion enters the journey
   without a source URL and a date checked. See section 7 for the one claim already in the shipped
   file that fails this test today.
6. **Zero em dashes and zero en dashes** in any copy or comment produced from this spec.

### 0.1 One model correction, stated up front

`docs/RELATIONSHIP-EXPANSION.md` section 3.1 drafted a model with `goal`, `bondWord`, `history`,
`ContactFrequency`, and hyphenated ids. **That is not what shipped.** The shipped model is
`src/lib/content/relationships.ts` plus the three optional `Profile` fields in
`src/lib/store.ts:22-25`:

```ts
relationshipType?: RelationshipType;  // "dating" | "engaged" | "partnered" | "married"
                                      // | "remarried" | "reconciling" | "coparenting"
                                      // | "civilPartnership" | "unlabeled"
together?: Together;
living?: LivingSituation;             // "apart" | "longDistance" | "together" | "separated"
```

Consequences this document is written around:

- **There is no `goal` field.** Every "for `goal: decide`" rule in the expansion doc is
  re-keyed onto `type: "dating" | "engaged"`, which is where deciding couples actually land.
  If `goal` ever ships, it becomes a third overlay layer in section 5 and nothing else changes.
- **There is no `history` field.** "Reconciled" is `type: "reconciling"`. "Separated" is
  `living: "separated"`, usually alongside `type: "coparenting"`.
- **Long distance is not a relationship type.** It is `living: "longDistance"`, deliberately, per
  the `relationships.ts` header. So the variant lookup in section 5 is two layers: a
  `RelationshipType` table and a `LivingSituation` overlay applied on top. A married long distance
  couple gets both. Any design that keys long distance off `RelationshipType` forces people to
  erase one true thing about themselves and must be rejected.

---

## 1. PULSE_QUESTIONS, rewritten

### 1.1 The problem with the shipped five

`src/lib/journey.ts:53-59`:

```ts
export const PULSE_QUESTIONS = [
  "I felt heard by my partner this week.",
  "We handled problems as teammates, not opponents.",
  "There was real warmth or affection between us.",
  "When something went wrong between us, we recovered.",
  "I feel hopeful about where we're headed.",
];
```

These five are the measurement instrument for the entire program and the gate on graduation. Three
failures, in severity order:

- Statement 5 names a direction. For a couple whose live argument is the direction, the metric
  votes in the argument.
- Statement 3 is unanswerable by co-parents and reads as physical co-presence to a couple who have
  not been in the same room for six weeks. Under the shipped `readyToGraduate`, separated
  co-parents running calm handoffs for a year score this honestly at 2 and can never graduate.
- Statement 1 carries the noun "partner," which is the one word a co-parenting pair did not choose.

### 1.2 The new five (exact strings)

```ts
/**
 * The five core statements. Universal by construction: answerable by a couple in one house, a
 * couple three time zones apart, and two people who are no longer together and are raising a
 * child. Per-type sharpening lives in journeyVariants, never here.
 *
 * These five, and only these five, are averaged for graduation. See CORE_PULSE_COUNT.
 */
export const PULSE_QUESTIONS = [
  "When we talked this week, I felt heard.",
  "We handled problems as teammates, not opponents.",
  "There was real warmth between us, not just logistics.",
  "When something went wrong between us, we recovered.",
  "I feel hopeful about the two of us.",
];
```

### 1.3 What changed in each, and why

| # | Was | Now | Change and reason |
|---|---|---|---|
| 1 | "I felt heard by my partner this week." | "When we talked this week, I felt heard." | Drops the noun "partner," so no word substitution is needed anywhere and a co-parenting pair is not handed a word they rejected. Drops the assumption of continuous contact: "when we talked" is true of a call, a text thread, or a doorstep handoff, and a week with two conversations is still ratable. Keeps first person and keeps the week window. |
| 2 | "We handled problems as teammates, not opponents." | Unchanged, verbatim. | Already universal. Co-parents have problems to handle. Long distance couples have problems to handle. Do not touch this line. |
| 3 | "There was real warmth or affection between us." | "There was real warmth between us, not just logistics." | "Affection" reads as physical and as co-located, which makes it a question about the calendar rather than the relationship for an apart couple. "Warmth" survives a phone call. "Not just logistics" gives the statement a concrete opposite, which is what makes it answerable by exactly the couples who were excluded: the pair whose entire week was a schedule. Co-parents still get a sharper override (section 5.4) because civility, not warmth, is their honest target. |
| 4 | "When something went wrong between us, we recovered." | Unchanged, verbatim. | Universal, and it is the statement stage 3 exists to move. Do not touch it. |
| 5 | "I feel hopeful about where we're headed." | "I feel hopeful about the two of us." | Removes the trajectory. "Where we're headed" asks a dating couple to rate a destination they are actively negotiating, asks a reconciled couple to rate the thing that already ended once, and asks co-parents to rate a future they have explicitly declined. "The two of us" keeps every gram of the hope and none of the direction. Answerable in any shape without implying escalation. |

### 1.4 Answerability check, by the two hardest cases

**Co-parents (`type: "coparenting"`, `living: "separated"`).** 1: they talk, at handoffs and by
text. 2: they have problems, mostly logistical. 3: answerable, and overridden to civility in the
variant table so honesty is not punished. 4: they go wrong and recover. 5: answerable, and
overridden to the child statement in the variant table. No statement in the base five requires
romance, a shared address, or a shared future.

**Long distance (`living: "longDistance"`).** Every statement is ratable from a call log. Nothing
in the base five requires being in the same room. This is why "or affection" had to leave
statement 3: it was the only word in the set that could not survive a screen.

### 1.5 The optional sixth statement

Per `RELATIONSHIP-EXPANSION.md` section 5.5, a shape may add one statement. It is **appended,
never substituted**, and it is **never counted toward graduation**.

| Shape | Sixth statement |
|---|---|
| `type: "reconciling"` | "The old pattern showed up less this week." |
| `type: "coparenting"` | "Handoffs went calmly." |
| `living` is `"longDistance"` or `"apart"` or `"separated"` | "The distance felt survivable this week." |

When both a type sixth and a living sixth would apply, the type sixth wins and the living one is
dropped. A pulse is five or six statements, never seven: the instrument stays short or people stop
taking it honestly.

### 1.6 The two code changes the sixth statement forces

Both are no-ops against every pulse row already stored, because every stored `PulseEntry.scores`
has exactly five entries.

```ts
/** Only the first five statements are the instrument. Anything a variant appends is a trend
 *  line the couple can watch, never a number that gates anything. */
export const CORE_PULSE_COUNT = 5;

export function pulseAvg(pulses: PulseEntry[], stage: number, who: 0 | 1): number | null {
  const entry = [...pulses].reverse().find((p) => p.stage === stage && p.who === who);
  if (!entry) return null;
  const core = entry.scores.slice(0, CORE_PULSE_COUNT);
  return core.reduce((a, b) => a + b, 0) / core.length;
}
```

And in `src/app/pulse.tsx`, the private low-pulse trigger at line 58 must average the core five
too, so that adding a sixth statement can never change who is offered support:

```ts
const core = next.slice(0, CORE_PULSE_COUNT);
const selfAvg = core.reduce((a, b) => a + b, 0) / core.length;
if (selfAvg <= 2) { /* unchanged: the private support screen */ }
```

`pulse.tsx` also stops importing the bare `PULSE_QUESTIONS` constant and reads
`pulseQuestionsFor(profile)` instead, at lines 7, 41, 115, 119, and 125. The exported constant
stays as the default and as the back-compat surface.

---

## 2. The five stages: current copy, and per-type variants

Format for every stage: the shipped title and arc first, then only the fields a type actually
overrides. Anything not listed is inherited unchanged. Stage `why` text is quoted only where it
changes.

`{partner}` is the couple's own word for each other from the copy helper. Where a variant string
below has the word baked in, it is because that type has exactly one honest word for it.

---

### Stage 1

**Shipped title:** "Steady the ground"
**Shipped arc:** "Stop the bleeding. Prove that ten calm minutes together is possible."
**Shipped `weeksHint`:** "Usually 1 to 2 weeks"

**Base `why` edit (applies to everyone, per expansion 2.2 line 67).** Replace
"no verdicts on the marriage" with "no verdicts on the two of you." Full corrected base:

> "Nothing can be rebuilt on a battlefield. Stage one asks almost nothing: no verdicts on the two of you, no hard topics, no promises. Just evidence, collected together, that the two of you can still share ten safe minutes. That evidence is the foundation everything else stands on."

**Variants:**

| Type | Field | Exact replacement |
|---|---|---|
| `coparenting` | `arc` | "Stop the bleeding. Prove that ten calm minutes in one conversation is possible." |
| `coparenting` | `why` | "Nothing workable gets built on a battlefield. Stage one asks almost nothing: no verdicts on what happened, no hard topics, no promises about anything. Just evidence, collected together, that the two of you can still get through ten minutes without your kid paying for it. That evidence is the foundation everything else stands on." |
| `dating` | `why` | "Nothing can be rebuilt on a battlefield. Stage one asks almost nothing: no verdicts on the two of you, no hard topics, no promises about what this becomes. Just evidence that you can still share ten safe minutes. That evidence is the foundation everything else stands on, and it is worth having whatever you two decide later." |
| `reconciling` | `why` | "Nothing can be rebuilt on a battlefield, and you two already know what the battlefield looks like. Stage one asks almost nothing: no verdicts, no autopsy of the first ending, no promises. Just evidence, collected now rather than remembered, that the two of you can share ten safe minutes. The autopsy comes later, on a floor built for it." |
| `living: "longDistance"` | `arc` | "Stop the bleeding. Prove that ten calm minutes on one call is possible." |

---

### Stage 2

**Shipped title:** "Learn each other again"
**Shipped arc:** "Replace assumptions with current information. Turn toward each other on purpose."
**Shipped `weeksHint`:** "Usually 3 to 4 weeks"

**Variants:**

| Type | Field | Exact replacement |
|---|---|---|
| `dating` | `title` | "Learn each other properly" |
| `dating` | `arc` | "Trade the early picture for current information. Turn toward each other on purpose." |
| `dating` | `why` | "Early couples are not reacting to each other; they are reacting to the version of each other they met. Stage two builds the real map: how you each love, how you each fight, what a day inside the other person actually feels like right now. Understanding first. The hard repairs come after, and land softer because of this." |
| `coparenting` | `title` | "Update the map you have of each other" |
| `coparenting` | `arc` | "Trade the version of each other you argued with for current information." |
| `coparenting` | `why` | "Most co-parents are not reacting to each other; they are reacting to the person they were separating from. That person is out of date, and the map is doing damage every time it gets used. Stage two rebuilds it: how you each handle pressure, how you each fight, what a week inside the other house actually looks like. Understanding first, because the practical negotiations come next and they land differently once the map is current." |
| `reconciling` | `why` | "You two are not reacting to each other; you are reacting to who the other person was before the break. Some of that is accurate and some of it expired. Stage two sorts one from the other: how you each love now, how you each fight now, what the time apart actually changed. This is the stage that stops the second attempt from being a rerun of the first." |
| `living: "longDistance"` | `arc` | "Replace assumptions with current information, across the distance, on purpose." |

---

### Stage 3

**Shipped title:** "Change how you fight"
**Shipped arc:** "Same disagreements, different physics. The fights stop leaving marks."
**Shipped `weeksHint`:** "Usually 4 to 6 weeks"

This stage is the most universal in the program. Everyone fights, and nobody's fights improve by
being told they should not have them. Two variants only:

| Type | Field | Exact replacement |
|---|---|---|
| `coparenting` | `arc` | "Same disagreements, different physics. The fights stop reaching your kid." |
| `coparenting` | `why` | "You will keep disagreeing; separated parents who agree on everything are not a real category. What changes is the machinery: how a disagreement starts, whether a repair lands, whether either of you can call a pause without it reading as a tactic, and whether any of it travels through your child. Stage three rebuilds the machinery while things are calm enough to practice." |
| `living: "longDistance"` | `why` | Base text, with one sentence appended: "Distance adds one thing: a fight can be ended by hanging up, which is not the same as ending it. Stage three gives you a way to stop that is not a disconnection." |

---

### Stage 4

**Shipped title:** "Rebuild what was lost"
**Shipped arc:** "Warmth, desire, trust: the things the hard years spent down."
**Shipped `weeksHint`:** "Usually 4 to 8 weeks"

**Base `why` edits (everyone, per expansion 2.2 line 217).** "the specific heavy thing your
marriage has been carrying" becomes "the specific heavy thing the two of you have been carrying."
Full corrected base:

> "Stopping the damage isn't the same as refilling what drained. Stage four goes at the tender things directly: affection and desire, the money wounds, the specific heavy thing the two of you have been carrying. This stage asks the most courage; it's also where couples start reporting that things feel different, not just better-managed."

**Variants:**

| Type | Field | Exact replacement |
|---|---|---|
| `dating` | `arc` | "Warmth, desire, trust: whatever the hard stretch spent down." |
| `coparenting` | `title` | "Rebuild what the split broke" |
| `coparenting` | `arc` | "Trust, money, and the story each of you tells. The things the ending spent down." |
| `coparenting` | `why` | "Stopping the damage isn't the same as repairing it. Stage four goes at the parts of the split that are still costing your kid: the handoff, the money, the version of the ending each of you carries, and the thing they overheard. This stage asks the most of both of you. It is also where the arrangement stops being a ceasefire and starts being a partnership." |
| `reconciling` | `arc` | "Warmth, desire, trust: the things the break spent down, and the ones it never touched." |
| `living: "longDistance"` | `why` | Base text, with one sentence appended: "Two of these conversations are usually saved for a visit and then never happen on the visit either, because the visit has to be good. They happen better on an ordinary Tuesday call than on the last night of a trip." |

---

### Stage 5

**Shipped title:** "Build the marriage you meant"
**Shipped arc:** "From repaired to chosen. Then you graduate, and delete us."
**Shipped `weeksHint`:** "Usually 4 weeks, then done"

**The arc line stays verbatim in every variant.** It is named in expansion section 1 rank 7 as the
best line in the file.

**New default title:** "Build the one you're choosing now"

**Base `why` edit.** "A repaired marriage isn't the goal; it's the floor" becomes
"A repaired relationship isn't the goal; it's the floor." Full corrected base:

> "A repaired relationship isn't the goal; it's the floor. Stage five points forward: the dreams under your old gridlock, the future you're actually building, and the rituals that will hold it all up after the app is gone. Because that's the deal: Mend is designed to be deleted."

**Title by type:**

| Type | Stage 5 title |
|---|---|
| default (`partnered` inherits its own, below) | "Build the one you're choosing now" |
| `married`, `remarried` | "Build the marriage you meant" |
| `civilPartnership` | "Build the partnership you meant" |
| `partnered` | "Build the life you meant" |
| `dating`, `engaged` | "Build the thing you're choosing" |
| `reconciling` | "Build the one you're choosing now" (default, deliberately: the second attempt is a choice, and naming it "the marriage you meant" points at the thing that ended) |
| `coparenting` | "Build the arrangement you meant" |
| `unlabeled` | "Build the one you're choosing now" (default: no bond noun, by definition) |

**Other stage 5 variants:**

| Type | Field | Exact replacement |
|---|---|---|
| `dating`, `engaged` | `why` | "A repaired relationship isn't the goal; it's the floor. Stage five points forward: the dreams under your old gridlock, the rituals that will hold this up after the app is gone, and an honest look at what each of you actually wants next. Mend does not have an opinion about what you should decide, and it is not going to pretend to. What it has is the practice of deciding it together." |
| `coparenting` | `why` | "A working arrangement isn't the goal; it's the floor. Stage five points forward: the years of this you both still have, the decisions coming that neither of you wants to make alone, and the rituals that will hold the arrangement up after the app is gone. Because that's the deal: Mend is designed to be deleted." |

---

## 3. Steps: what changes, what is added, what is skipped

### 3.1 Skipped entirely (never rendered, never counted)

A skipped step does not appear on the journey screen, is excluded from `stageComplete`, and is
excluded from the `doneCount / stage.steps.length` ring. A step that a type should never be asked
about is removed, not made skippable: a skippable desire step still lands as a question that
couple did not want to be asked.

| Type | Step id | Why it is removed rather than made optional |
|---|---|---|
| `coparenting` | `s4-session-affection` | Co-parents are not working toward romantic intimacy. A prompt about desire, even one with a skip button on it, crosses a boundary these two people built on purpose. Removed with no trace. |
| `coparenting` | `s4-notes` | "Five love notes in two weeks." Replaced by `s4-info` in 3.3, not merely deleted, so stage 4 keeps its shape. |
| `coparenting` | `s2-game` | "Do you still know me?" is an intimacy game whose whole mechanic is delight at knowing each other's inner world. For this pair it is a re-enactment of something that ended. Stage 2 runs five steps instead of six. |

Nothing else is skipped for any type. Everything else is a copy override or a conditional.

### 3.2 Conditional via `applies`

| Step id | `applies` rule | Reason |
|---|---|---|
| `s4-session-money` | Renders unless the couple has no shared or entangled money. Practically: always renders for `married`, `remarried`, `civilPartnership`, `partnered`, `reconciling`, `coparenting`, and for anyone whose situations include a money chip. For `dating` and `engaged` with `living !== "together"`, it renders as an offer rather than a requirement, with the "Not our situation, skip it" control. | A couple with genuinely separate finances currently cannot pass stage 4 without holding a session about money wounds they do not have. The honest user is punished harder than the user who lies, which corrodes the mechanic the whole journey rests on. |

**Do not** make `s4-session-money` type-skipped for co-parents. Money after a separation is one of
the highest-value conversations in the entire product for that pair. It gets a copy override
instead, in 3.3.

### 3.3 Step copy overrides and additions, by type

Override on the **same step id** wherever the work is the same and only the words change. A step id
is progress: `JourneyState.doneSteps` stores ids, so renaming an id a couple has already completed
silently uncompletes it if they later edit their type in settings. New ids only where the work
genuinely differs.

#### Stage 1

`s1-pulse` (base body, corrected for everyone, no marriage noun to fix):

> "Five statements, rated honestly. This is the 'before' photo. If your {partner} isn't here yet, take yours alone; theirs joins later. Nobody fixes anything today."

| Type | Step | Field | Exact replacement |
|---|---|---|---|
| `coparenting` | `s1-pulse` | `body` | "Five statements, rated honestly. This is the 'before' photo. If your co-parent isn't here yet, take yours alone; theirs joins later. Nobody fixes anything today, and nobody is being scored." |
| `coparenting` | `s1-deck` | `body` | "Ten minutes of the gentlest questions in the app. Nothing about the two of you, nothing loaded, nothing about what happened. Anyone may pass any card, no explanation owed. The goal isn't closeness; it's ten minutes that don't cost either of you anything." |
| `coparenting` | `s1-session` | `title` | "Hold your first session: the stress that isn't about us" (unchanged) |
| `coparenting` | `s1-session` | `body` | "Your first timed floor, on the one topic where you fix nothing and defend nothing, because it isn't about the two of you or about your kid. Each of you gets protected minutes to unload about the outside world while the other only listens." |
| all types (base fix) | `s1-session` | `body` | "Your first timed floor, on the one topic where you fix nothing and defend nothing, because it isn't about the two of you. Each of you gets protected minutes to unload about the outside world while the other only listens." |
| `living` is any apart value | `s1-session` | `body` | Base text, with one sentence appended: "A call counts. One of you reads the prompts out loud." |
| `living` is any apart value | `s1-micro` | `body` | "One-sentence acts of goodwill that do not need a shared room: the voice memo instead of the text, the photo of something ordinary with no caption, being the one who calls first. Quiet deposits. Don't announce them; let them be noticed." |
| `coparenting` | `s1-micro` | `body` | "One-sentence acts of goodwill, sized for two households: the piece of information volunteered before it was asked for, the five minutes of flexibility on a Tuesday, the thank-you that names the specific thing. Quiet deposits. Don't announce them; let them be noticed." |

**Added step, `reconciling` only, stage 1, after `s1-pulse`:**

```ts
{
  id: "s1-pattern",
  title: "Write down the pattern, in your own words",
  body: "Separately, each of you writes the sequence that ended it last time: what usually happened first, what happened next, where it always went. Not blame, and not a shared document yet. Just the shape of it, named while nothing is on fire, so that later you can both point at the same thing.",
  href: "/notes",
  hrefLabel: "Open your notes",
}
```

Honor system, no `auto`. This step is the reason the reconciliation content exists, and it belongs
in stage 1 because the pattern is easiest to name before the second attempt has produced any new
evidence.

#### Stage 2

| Type | Step | Field | Exact replacement |
|---|---|---|---|
| `dating` | `s2-session` | `body` | "The map-update conversation. Interview each other properly, past the good version: current stresses, current dreams, what you each want your life to look like in a few years. Answers are information, not commitments." |
| `reconciling` | `s2-session` | `body` | "The map-update conversation. Interview each other like the years apart actually happened, because they did: current stresses, current dreams, what changed in you while you were not here to watch it." |
| `coparenting` | `s2-session` | `title` | "Hold the session: who each of you is now" |
| `coparenting` | `s2-session` | `body` | "The map-update conversation, and the one that saves the most arguments later. Current work, current pressure, current money, what a normal week in the other house actually looks like. Not to get closer. To stop negotiating with a person who no longer exists." |
| `coparenting` | `s2-quiz` | `body` | "Twelve scenarios find your attachment lens; six find your role in the fight cycle. Then trade results: each one ends with a section written to the other person, not to you. It reads as usefully for two co-parents as for a couple, because the fight cycle does not care whether you are together." |
| `living` is any apart value | `s2-quiz` | `body` | "Twelve scenarios find your attachment lens; six find your role in the fight cycle. Then send each other your results: each one ends with a section written to your {partner}, not to you. That trade is the point, and it works as well pasted into a call as handed across a table." |
| `living` is any apart value | `s2-challenge` | `body` | "One small move at a time: spotting the little reaches for connection and answering them. The week is self-paced, not seven consecutive days, so the days you are not in the same place still count. Use the apart version of each day." |
| all types (base fix) | `s2-challenge` | `body` | "One small move at a time: spotting your {partner}'s little reaches for connection and answering them. The week is self-paced, so a gap between days is not a failure and does not restart anything." |

Note on the base `s2-challenge` edit: the shipped body ends "This is the single habit research most
consistently finds in couples who last." That sentence is an unsourced research claim. See section
7.

#### Stage 3

| Type | Step | Field | Exact replacement |
|---|---|---|---|
| all types (base fix) | `s3-ritual` | `body` | "A standing weekly meeting for the two of you: what went well, what was hard (speaker-listener rules), what each of you needs next week. A video call counts. Complaints go here, instead of leaking all week." |
| all types | `s3-ritual` | `auto` | Accept any ritual from an allowed set rather than hard-requiring `state-of-union`. See 5.6. |
| `coparenting` | `s3-ritual` | `title` | "Adopt the co-parent business meeting" |
| `coparenting` | `s3-ritual` | `body` | "A standing weekly meeting about logistics and nothing else: the week's schedule, the money, the school thing, the one decision coming up. Fifteen minutes, an agenda, a hard stop. A call counts. Everything that used to be twenty texts goes here instead." |
| `coparenting` | `s3-session-unfinished` | `title` | "Hold the session: what each of us thinks happened" |
| `coparenting` | `s3-session-unfinished` | `body` | "The structured version of the argument you have been having in fragments for a long time. Each of you describes your own reality of how it ended, once, uninterrupted. No corrections, no evidence, no verdict. Both accounts get to be true tonight. This is the stage's real exam, and it is the one that makes the next two years cheaper." |
| `living` is any apart value | `s3-session-needs` | `body` | "The meta-conversation. Not any particular fight, but the rules of engagement: your break signal, your repair phrases, what a good apology actually sounds like to each of you, and what taking a break looks like when hanging up already feels like leaving. Name the return time before you go." |

#### Stage 4

| Type | Step | Field | Exact replacement |
|---|---|---|---|
| all types (base fix) | `s4-heavy` | `body` | "If the two of you are carrying a big wound (a broken agreement, a loss, an illness, a money collapse), open its healing track and hold the first two conversations. If you're not carrying one, run a round of the Go Deeper deck instead." |
| all types (base fix) | `s4-session-affection` | `body` | "The conversation most couples avoid the longest. Soft startup is mandatory; the prompts carry you. Being wanted matters, and this is where you talk about it out loud." |
| `living` is any apart value | `s4-session-affection` | `body` | "The conversation most couples avoid the longest, and distance makes it easier to keep avoiding, because the subject only comes up on visits and visits are supposed to be good. Soft startup is mandatory; the prompts carry you. Have it on an ordinary call, not on the last night of a trip." |
| `reconciling` | `s4-heavy` | `body` | "Open the reconciliation track and hold the first two conversations: what actually ended it, told once each without correction, and what is different this time. If you would rather start somewhere else, any track's first session is free." |
| `coparenting` | `s4-heavy` | `body` | "Open the co-parenting track and hold the first two conversations: the handoff, and what you each tell your kid about the ending. If your household is carrying something else heavy on top of the split, that track is free to start too." |
| `coparenting` | `s4-session-money` | `title` | "Hold the session: money after the split" |
| `coparenting` | `s4-session-money` | `body` | "Two households, one kid, and a set of costs nobody agreed to in advance. Meet each other's actual numbers before renegotiating anything. The point is a rule you can both apply on a bad month, not a settlement." |
| `dating`, `engaged` | `s4-session-money` | `body` | "Money fights are two childhoods arguing, and they start long before anyone has a joint account. Meet each other's history now, while nothing is entangled; that conversation is much cheaper today than it will be later. Not our situation is a legitimate answer." |
| `coparenting` | `s4-challenge` | `body` | "Seven days of retraining attention from failures back to what the other parent actually does well. Separated parents audit each other on autopilot, and your kid hears the results. This interrupts the audit." |
| `living` is any apart value | `s4-notes` | `body` | "The daily nudge gives you one concrete idea every day: the voice memo before sleep, the photo of the ordinary thing, the thing you were saving for the call sent the moment you thought it. Do five. Small, frequent, real." |

**Added step, `coparenting` only, stage 4, in the position `s4-notes` occupies:**

```ts
{
  id: "s4-info",
  title: "Five pieces of information volunteered, in two weeks",
  body: "Five times in two weeks, tell the other parent something before they have to ask: the appointment, the friend drama, the thing that worked at bedtime, the note from school. Information withheld is the cheapest form of leverage there is, and your kid pays the interest on it. This is how the withholding stops.",
  href: "/plan",
  hrefLabel: "See today's nudge",
}
```

#### Stage 5

| Type | Step | Field | Exact replacement |
|---|---|---|---|
| `coparenting` | `s5-session-gridlock` | `body` | "Your most repeated, most stuck disagreement about your kid almost certainly hides two different ideas of what a good childhood looks like. You don't break that by winning; you break it by finally hearing the picture inside the other position." |
| `coparenting` | `s5-deck` | `body` | "The years ahead, asked about out loud: what you each want their teens to look like, what you want them to be able to say about the two of you at thirty. Co-parents who talk about the future have one." |
| `coparenting` | `s5-rituals` | `body` | "Whatever you adopted (the business meeting, the handoff change, the information rule), keep it for a month without the app reminding you. This is the load-bearing test: the rituals are what remain when Mend is gone." |
| `dating`, `engaged` | `s5-deck` | `body` | "The future, asked about out loud: ambitions, adventures, what each of you actually pictures. Answers are information, not promises, and nothing said here is binding on either of you." |
| `living` is any apart value | `s5-rituals` | `body` | "Whatever you adopted (the protected overlap window, the goodnight voice memo, the weekly meeting on video), keep it for a month without the app reminding you. This is the load-bearing test: the rituals are what remain when Mend is gone." |

**Added step, `dating` and `engaged` only, stage 5, after `s5-stories`:**

```ts
{
  id: "s5-outcomes",
  title: "Read the honest outcomes page, together",
  body: "One page, five minutes. It names the outcomes this program is compatible with: deciding, postponing, choosing different things and staying, and choosing different things and not staying. Mend does not know which one is yours and will never pretend to. Read it before you decide anything, so that whatever you pick was picked by the two of you and not by an app with an opinion.",
  href: "/library/honest-outcomes",
  hrefLabel: "Read it",
}
```

This step is the counterweight to a five-stage program ending in the word "build." Without it, a
deciding couple reads the structure itself as the answer. No badge attaches to it, no score, and
it does not point at a preferred outcome. It depends on the honest-outcomes content in
`RELATIONSHIP-EXPANSION.md` section 4.1 item 5 shipping first. Until that page exists, the step
does not ship: a step pointing at a missing route is worse than no step.

---

## 4. Graduation, by type

### 4.1 What does not change, ever

The gate is identical for every type:

```ts
export function readyToGraduate(ctx: StepContext, journey: JourneyState): boolean {
  const s5 = stageFor(5, shapeOf(ctx.profile))!;   // variant-resolved stage
  if (journey.stage < 5 || !stageComplete(s5, ctx, journey)) return false;
  const a = pulseAvg(ctx.pulses, 5, 0);
  const b = pulseAvg(ctx.pulses, 5, 1);
  return a !== null && b !== null && a >= 4 && b >= 4;
}
```

Both partners on the record. Both core-five averages at 4 or above. No type gets an easier gate, a
shorter program, or a lower number. The only structural change is that `stageComplete` now runs
over the variant-resolved step list, which is what makes graduation reachable for co-parents at
all: today they are blocked forever by a mandatory step about desire.

### 4.2 What graduation means, per type

The shortfall branch is a constant and is not variant-addressable (section 6.3). Only the success
branch varies, and it varies to match `relationshipDef(type).celebrates`, which already forbids
honoring a status change.

**Default and `partnered`, `married`, `remarried`, `civilPartnership`, `unlabeled` (unchanged):**

> Headline: "You're ready to graduate"
> Body: "Stage five is complete and both of your pulses are strong. There's one feature left: leaving."

**`dating` and `engaged`:**

> Headline: "You're ready to graduate"
> Body: "Stage five is complete and both of your pulses are strong. That means you two can do this work without us. It does not mean you should move in, get married, or decide anything at all, and this app will never tell you which. There's one feature left: leaving."

Rationale: for a couple whose live question is the next step, a five-stage program that ends in a
ribbon is read as a verdict. The graduation screen is the last place the app speaks to them, so it
is the place the neutrality has to be explicit rather than implied.

**`reconciling`:**

> Headline: "You're ready to graduate"
> Body: "Stage five is complete and both of your pulses are strong. You named the old pattern and you did something different with it. That is the thing that graduated, not the fact that you came back. There's one feature left: leaving."

Rationale: `relationshipDef("reconciling").celebrates` says it outright: staying is not the
achievement and leaving again would not be a failure. The copy honors the work and refuses to
honor the outcome.

**`coparenting`:**

> Headline: "You're ready to graduate"
> Body: "Stage five is complete and both of your pulses are strong. Two parents who don't need a referee, and a kid who doesn't have to carry the message. That is the whole job, and you did it. There's one feature left: leaving."

Rationale: matches `celebrates` verbatim in substance. It never gestures at reconciliation, never
says "who knows what happens next," and never treats the arrangement as a lesser finish.

**`living` overlay:** no graduation change for any apart value. Distance is not an achievement to
congratulate and closing it is not a milestone the app has any standing to name.

### 4.3 The honest branch, unchanged in every variant

Word for word, as shipped at `src/app/(tabs)/journey.tsx:240-247`, for every type without
exception:

> Headline: "The work is done. The numbers aren't, yet"
> Body: "Every stage-five step is complete, but at least one of your pulses is still under 4. That's not failure; it's information. Repeat what worked (sessions, the rituals), or consider bringing a professional in for the last stretch. Graduate when the numbers are honest."

This is the reason skeptical partners believe the app about anything else. It is implemented as a
constant with no variant slot so that no future type can soften it. See 6.3.

---

## 5. Implementation: variants without a second stage array

### 5.1 The shape the journey reads

```ts
// src/lib/journey.ts
import type { RelationshipType, LivingSituation, Together } from "./content/relationships";
import { DEFAULT_RELATIONSHIP_TYPE, DEFAULT_LIVING, DEFAULT_TOGETHER, isApart }
  from "./content/relationships";
import type { Situation } from "./situation";
import type { Profile } from "./store";

/**
 * The journey's read-only view of who this couple is. Derived from Profile, never stored
 * separately, always fully populated so nothing downstream has to handle undefined.
 * Every default here is the wide one: an existing profile with no relationship fields is
 * "partnered, one home", never married.
 */
export type JourneyShape = {
  type: RelationshipType;
  living: LivingSituation;
  together: Together;
  situations: Situation[];
};

export function shapeOf(profile: Profile | null): JourneyShape {
  return {
    type: profile?.relationshipType ?? DEFAULT_RELATIONSHIP_TYPE,
    living: profile?.living ?? DEFAULT_LIVING,
    together: profile?.together ?? DEFAULT_TOGETHER,
    situations: profile?.situations ?? (profile?.situation ? [profile.situation] : []),
  };
}
```

### 5.2 The override types

```ts
/** Only these Stage fields may vary by type. n, weeksHint, and steps are structural:
 *  steps change through the step-level table below, never by replacing the array. */
export type StageOverride = Partial<Pick<Stage, "title" | "arc" | "why">>;

/** Only these JourneyStep fields may vary. `id` is deliberately absent: ids are progress
 *  (JourneyState.doneSteps stores them), so a variant may never rename one. */
export type StepOverride = Partial<Pick<
  JourneyStep,
  "title" | "body" | "href" | "hrefLabel" | "auto" | "applies"
>>;

export type StageNumber = 1 | 2 | 3 | 4 | 5;
export type PulseIndex = 0 | 1 | 2 | 3 | 4;

/** One step added by a variant, positioned relative to a base step so the insert survives
 *  future edits to the base array. `after: undefined` means prepend to the stage. */
export type StepInsert = {
  stage: StageNumber;
  after?: string;
  step: JourneyStep;
};

/**
 * Everything one relationship type (or one living situation) changes about the journey.
 * Every field is optional. A variant is a diff, never a copy of the program.
 */
export type JourneyVariant = {
  stages?: Partial<Record<StageNumber, StageOverride>>;
  /** keyed by step id */
  steps?: Record<string, StepOverride>;
  /** step ids this shape never sees: not rendered, not counted, not completable */
  skipSteps?: string[];
  insertSteps?: StepInsert[];
  /** replaces individual core statements by index. Never adds, never reorders, never removes. */
  pulse?: Partial<Record<PulseIndex, string>>;
  /** appended as an optional sixth. Never counted toward graduation. */
  pulseExtra?: string;
  /** the SUCCESS branch of graduation only. The shortfall branch is not addressable. */
  graduation?: { headline: string; body: string };
};

/** Also added to JourneyStep itself: */
export type JourneyStep = {
  id: string;
  title: string;
  body: string;
  href: string;
  hrefLabel: string;
  auto?: (ctx: StepContext) => boolean;
  /** false = this step does not apply to this couple and is not rendered.
   *  Absent = always applies. Evaluated against the shape, never against progress. */
  applies?: (shape: JourneyShape) => boolean;
};
```

### 5.3 The two lookup tables

```ts
/** Keyed by RelationshipType. Types absent from this record inherit the base program
 *  unchanged, which is the correct outcome for married, partnered, and unlabeled. */
export const journeyVariants: Partial<Record<RelationshipType, JourneyVariant>> = {
  dating: {
    stages: {
      2: { title: "Learn each other properly", arc: "Trade the early picture for current information. Turn toward each other on purpose." },
      4: { arc: "Warmth, desire, trust: whatever the hard stretch spent down." },
      5: { title: "Build the thing you're choosing" },
    },
    steps: {
      "s2-session": { body: "The map-update conversation. Interview each other properly, past the good version: current stresses, current dreams, what you each want your life to look like in a few years. Answers are information, not commitments." },
    },
    insertSteps: [{ stage: 5, after: "s5-stories", step: HONEST_OUTCOMES_STEP }],
    graduation: {
      headline: "You're ready to graduate",
      body: "Stage five is complete and both of your pulses are strong. That means you two can do this work without us. It does not mean you should move in, get married, or decide anything at all, and this app will never tell you which. There's one feature left: leaving.",
    },
  },

  engaged: { /* stage 5 title, s5-outcomes insert, dating's graduation copy */ },

  married:   { stages: { 5: { title: "Build the marriage you meant" } } },
  remarried: { stages: { 5: { title: "Build the marriage you meant" } } },
  civilPartnership: { stages: { 5: { title: "Build the partnership you meant" } } },
  partnered: { stages: { 5: { title: "Build the life you meant" } } },

  reconciling: {
    insertSteps: [{ stage: 1, after: "s1-pulse", step: NAMED_PATTERN_STEP }],
    pulseExtra: "The old pattern showed up less this week.",
    graduation: { /* the reconciling copy in 4.2 */ },
  },

  coparenting: {
    stages: {
      1: { arc: "Stop the bleeding. Prove that ten calm minutes in one conversation is possible." },
      2: { title: "Update the map you have of each other", arc: "Trade the version of each other you argued with for current information." },
      3: { arc: "Same disagreements, different physics. The fights stop reaching your kid." },
      4: { title: "Rebuild what the split broke", arc: "Trust, money, and the story each of you tells. The things the ending spent down." },
      5: { title: "Build the arrangement you meant" },
    },
    skipSteps: ["s2-game", "s4-session-affection", "s4-notes"],
    insertSteps: [{ stage: 4, after: "s4-challenge", step: VOLUNTEERED_INFO_STEP }],
    steps: { /* the co-parenting bodies in section 3.3 */ },
    pulse: {
      2: "We were civil with each other, even when it was hard.",
      4: "Our kid did not have to manage us this week.",
    },
    pulseExtra: "Handoffs went calmly.",
    graduation: { /* the co-parenting copy in 4.2 */ },
  },
};

/** Keyed by LivingSituation and applied ON TOP of the type variant. This is the layer that
 *  carries long distance, which is deliberately not a relationship type: a married couple, a
 *  dating couple, and a reconciling couple can all be living apart, and none of them should
 *  have to erase one true thing to describe the other. */
export const livingVariants: Partial<Record<LivingSituation, JourneyVariant>> = {
  longDistance: {
    stages: { 1: { arc: "Stop the bleeding. Prove that ten calm minutes on one call is possible." } },
    steps: { /* the apart bodies in section 3.3 */ },
    pulseExtra: "The distance felt survivable this week.",
  },
  apart: { /* same step overrides, no arc change */ },
  separated: { /* same step overrides, no arc change */ },
  // "together" is absent: the base program is already written for it.
};
```

### 5.4 The merge

```ts
/** type variant first, then living overlay. Later layers win field by field. */
function layersFor(shape: JourneyShape): JourneyVariant[] {
  return [journeyVariants[shape.type], livingVariants[shape.living]]
    .filter((v): v is JourneyVariant => Boolean(v));
}

/**
 * The whole mechanism. `stages` (the base array) is never copied, never forked, and stays the
 * single source of truth for structure and order. This function produces a per-render view of
 * it. Adding a relationship type means adding one entry to journeyVariants, and nothing else.
 */
export function stagesFor(shape: JourneyShape): Stage[] {
  const layers = layersFor(shape);
  if (layers.length === 0) return stages;

  const skip = new Set(layers.flatMap((l) => l.skipSteps ?? []));
  const stepPatch: Record<string, StepOverride> = Object.assign({}, ...layers.map((l) => l.steps ?? {}));
  const inserts = layers.flatMap((l) => l.insertSteps ?? []);

  return stages.map((stage) => {
    const stagePatch: StageOverride = Object.assign({}, ...layers.map((l) => l.stages?.[stage.n as StageNumber] ?? {}));

    let steps = stage.steps
      .filter((s) => !skip.has(s.id))
      .map((s) => (stepPatch[s.id] ? { ...s, ...stepPatch[s.id] } : s));

    for (const ins of inserts.filter((i) => i.stage === stage.n)) {
      const at = ins.after ? steps.findIndex((s) => s.id === ins.after) : -1;
      steps = at === -1 ? [ins.step, ...steps] : [...steps.slice(0, at + 1), ins.step, ...steps.slice(at + 1)];
    }

    // `applies` is resolved here so nothing downstream has to know about shapes.
    steps = steps.filter((s) => (s.applies ? s.applies(shape) : true));

    return { ...stage, ...stagePatch, steps };
  });
}

export function stageFor(n: number, shape: JourneyShape): Stage | undefined {
  return stagesFor(shape).find((s) => s.n === n);
}

export function pulseQuestionsFor(shape: JourneyShape): string[] {
  const layers = layersFor(shape);
  const patch: Partial<Record<PulseIndex, string>> =
    Object.assign({}, ...layers.map((l) => l.pulse ?? {}));
  const core = PULSE_QUESTIONS.map((q, i) => patch[i as PulseIndex] ?? q);
  // type sixth wins over living sixth; a pulse is never longer than six.
  const extra = journeyVariants[shape.type]?.pulseExtra ?? livingVariants[shape.living]?.pulseExtra;
  return extra ? [...core, extra] : core;
}

/** SUCCESS branch only. The shortfall branch is GRADUATION_SHORTFALL and has no variant path. */
export function graduationCopyFor(shape: JourneyShape): { headline: string; body: string } {
  return (
    journeyVariants[shape.type]?.graduation ?? {
      headline: "You're ready to graduate",
      body: "Stage five is complete and both of your pulses are strong. There's one feature left: leaving.",
    }
  );
}
```

### 5.5 Properties this design has, deliberately

- **One stage array.** `stages` is untouched, exported as before, and remains the definition of
  what the program is. Every variant is a diff against it. A copy fix to a step body that is not
  overridden reaches every relationship type at once, which is the failure mode a forked array
  guarantees and this one makes impossible.
- **Ids are stable.** No variant can rename a step id, so a couple who edits their type in settings
  mid-program keeps every completion whose step still exists. Completions for a now-skipped step
  stay in `doneSteps` harmlessly and return intact if they switch back.
- **Absent means inherit.** `Partial<Record<RelationshipType, ...>>` means a new relationship type
  is safe by default: it gets the base program, in the wide wording, with nothing broken.
- **Overrides are field-level.** `Partial<Pick<...>>` on both stage and step means a variant that
  wants a different arc cannot accidentally drop a `why`, and a variant that wants a different body
  cannot accidentally drop an `auto` check.
- **Structure is not addressable.** `StageOverride` cannot touch `n` or `steps`. There is no path
  by which a variant reorders the program, removes a stage, or shortens the path to graduation.

### 5.6 The consumer changes this forces

| File | Change |
|---|---|
| `src/lib/journey.ts` | `getStage(n)` is kept for back compat and delegates to `stageFor(n, shapeOf(null))`. `stageComplete` and `readyToGraduate` take the variant-resolved stage. `s3-ritual.auto` becomes `(ctx) => ctx.plan.rituals.some((r) => STATE_OF_UNION_EQUIVALENTS.has(r))`, with the set containing `state-of-union`, the co-parent business meeting id, and the video-call weekly meeting id. |
| `src/app/(tabs)/journey.tsx` | Reads `stagesFor(shapeOf(profile))`. Line 169 `const manual = !step.auto` is replaced: every step renders a completion affordance. Auto steps render it as a secondary link labeled "We did this our way." The progress ring denominator becomes the resolved `stage.steps.length`, so a skipped step cannot make a stage uncompletable. |
| `src/app/pulse.tsx` | Reads `pulseQuestionsFor(shapeOf(profile))` at lines 41, 115, 119, 125. Applies the `CORE_PULSE_COUNT` slice at line 58. Nothing else on that screen changes. |
| `src/lib/store.ts` | No schema change. `PulseEntry.scores` is already `number[]`, so a six-score entry stores without migration, and a five-score entry reads back correctly under the core slice. |

---

## 6. Safety audit: the three mechanics that survive unchanged

This section is the explicit confirmation requested, stated as testable claims.

### 6.1 The two-partner pulse gate survives, unchanged, in every variant

`bothPulsed(ctx, stage)` requires a pulse row from `who === 0` and a pulse row from `who === 1` for
that stage. It gates `s2-pulse`, `s3-pulse`, `s4-pulse`, and `s5-pulse` today and continues to gate
all four in every variant.

- `JourneyVariant` has no field that can reach a step's gating semantics beyond `auto`, and no
  variant in section 5.3 overrides `auto` on any pulse step. The pulse steps are not in any
  `skipSteps` list and are not in any `steps` patch.
- `onePulsed(ctx, 1)` on `s1-pulse` also survives untouched. Solo start is preserved for every
  type: one willing person can begin, alone, at 11pm, in any relationship shape.
- Adding a sixth statement does not affect the gate: `bothPulsed` counts rows, not scores.

**Test to write:** for every value of `RelationshipType` crossed with every value of
`LivingSituation`, assert that `stagesFor(shape)` contains all four of `s2-pulse`, `s3-pulse`,
`s4-pulse`, `s5-pulse`, and that each one's `auto` returns false when only one partner has pulsed.

### 6.2 The low-pulse private support offer survives, unchanged, in every variant

`pulseConcern` at `journey.ts:349` and the private `support` step at `pulse.tsx:162-179` are
untouched by this specification, with one exception that makes them stricter rather than looser:
the self-average is computed over the core five (`CORE_PULSE_COUNT`), so an appended sixth
statement can never change who is offered support. Behavior against existing data is byte
identical.

Everything that made this mechanic correct is preserved:

- It fires on **the answering partner's own scores**, before the phone is handed on.
- It renders on **their screen only**. "This is on your screen only; your partner will not see it"
  stays verbatim.
- It is **never surfaced on the shared Journey screen**. The comment at
  `journey.tsx:144-148` explaining why stays in place, verbatim, and governs every new shared
  surface added by this document. No variant adds a shared-screen pulse readout.
- It points at `/safety`, which is **free, ungated, and identical for every relationship type**.
  No variant may reword it, and `JourneyVariant` has no field that could.

**Test to write:** assert `pulseConcern` and the `support` step trigger identically for a
five-score entry and for a six-score entry whose first five scores match.

### 6.3 The honest "the numbers aren't there yet" branch survives, unchanged, in every variant

`JourneyVariant.graduation` addresses the **success branch only**. The shortfall branch is a module
constant with no variant path to it:

```ts
/**
 * The honest branch. Not variant-addressable, by design: there is no relationship type for whom
 * a softer version of this is correct, and any future type that wants one is asking for a
 * diploma it did not earn. Do not add this to JourneyVariant.
 */
export const GRADUATION_SHORTFALL = {
  headline: "The work is done. The numbers aren't, yet",
  body: "Every stage-five step is complete, but at least one of your pulses is still under 4. That's not failure; it's information. Repeat what worked (sessions, the rituals), or consider bringing a professional in for the last stretch. Graduate when the numbers are honest.",
} as const;
```

And the gate that selects it is type-independent: stage 5 complete, both partners' core-five
averages at 4 or above. Every type meets the same number.

**Test to write:** assert that for every `RelationshipType`, a shape with stage 5 complete and one
partner's core-five average at 3.8 yields `readyToGraduate === false` and renders
`GRADUATION_SHORTFALL` verbatim.

### 6.4 Everything else on the safety list, confirmed untouched

Nothing in this document edits, moves, shortens, reorders, or paywalls: the domestic violence gate,
`whyGateMatters`, the second door ("I'm not sure, or I don't feel safe. Show me help"), `/safety`,
any `seekHelp` card, any per-track red flag, the composite-story disclosure, the first-session-free
rule, or the "anyone may pass any card" rule. All of them read from `SAFETY_FRAME`, never from
`frameFor()` and never from `journeyVariants`. The one journey-adjacent safety addition in the
expansion doc, the private safety re-ask inside the pulse flow at each stage, is compatible with
this design and is not blocked by it: it lives on the answering partner's screen, inherits the
6.2 privacy rule, is never gated, and is never counted toward progress.

---

## 7. Open items and honest gaps

1. **An unsourced claim already in the file.** `s2-challenge` body ends: "This is the single habit
   research most consistently finds in couples who last." That is a research claim with no source
   and no date, in a product whose own expansion spec forbids exactly this (section 0 rule 6). I
   have not invented a citation for it. It must either get a source URL and a date checked, or be
   rewritten without the claim. Suggested replacement if no source is produced: "It is the smallest
   habit in this app and the one couples most often say they kept."
2. **`s5-outcomes` depends on content that does not exist.** The honest-outcomes page
   (`RELATIONSHIP-EXPANSION.md` section 4.1 item 5) must ship before the dating and engaged stage 5
   insert does. A step pointing at a missing route is worse than no step.
3. **`s4-heavy` for co-parents depends on the `co-parenting` track**, and `s4-heavy` for
   `reconciling` depends on the `reconciliation` track. Both are ranked 2 and 6 in
   `RELATIONSHIP-EXPANSION.md` section 4.2 and neither exists yet. Until they do, those overrides
   ship pointing at `/tracks` with the base copy.
4. **Apart step bodies reference content that is partly unwritten**: the apart micro-moves, the
   apart challenge day variants, and the apart rituals in expansion section 4.1 item 2. Ship the
   `living` overlay after that content, or the copy promises something the couple cannot find.
5. **`engaged` currently inherits `dating`'s treatment** for stage 5 and graduation. That is
   correct for the deciding question and possibly wrong for a couple with a date already set. It
   needs a persona read before it is treated as settled.
6. **Persona counts referenced anywhere downstream of this document** come from
   `docs/RELATIONSHIP-EXPANSION.md`, which states plainly that they are "N of 8 received personas"
   and not "N of 20." Do not restate them as anything else.
7. **This model is dyadic**, per the limit stated in the `relationships.ts` header. Every stage,
   step, and pulse statement here assumes two people. That is a real product limit and it is not a
   statement that other shapes are less committed.

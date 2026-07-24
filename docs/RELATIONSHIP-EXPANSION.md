# Relationship Expansion: Implementation Spec

Mend was built for marriage repair. It is expanding to serve every committed romantic
relationship, plus the couples who are no longer romantic but still tied together. This
document is the ranked build order, the exhaustive copy audit, the data model, the content
backlog, and the journey changes.

**Source and honesty note.** This spec synthesizes structured findings from the persona test
round. The findings payload delivered to me contained eight complete persona records before it
was truncated by transport: dating and non-cohabiting (Maya and Jordan), engaged with a wedding
six months out (Priya and Sam), long distance across three time zones (Devon and Alex),
unmarried long-term cohabiting co-parents (Tomas and Elena), queer couple with asymmetric
outness (Grace and Nia), married same-sex couple in a shared low-desire plateau (Wes and
Marcus), reconciled couple remarried to each other after a divorce (Rob and Cheryl), and
separated co-parents (Ana and Luis). Every count in this document is "N of 8 received
personas." Do not read those counts as "N of 20." When the remaining persona records arrive,
re-rank section 1 and section 4 rather than assuming these numbers hold.

Every file path below is repo-relative to `mend-app/`. Line numbers are as of the audit and
will drift as edits land; match on the quoted string, not the number.

---

## 0. Rules that govern every change in this document

These are constraints on the work, not suggestions.

1. **Safety copy never narrows and never personalizes.** Safety strings always say
   "relationship," never the couple's chosen noun, never "marriage," never a type-conditional
   word. Crisis resources, red flags, `seekHelp`, `/safety`, and the onboarding gate stay free,
   ungated, unshortened, and unmoved. This expansion adds doors. It removes none.
2. **Relationship type may change wording and ordering only.** It must never change what
   content a couple can reach. This is the existing `situation.ts` rule ("Nothing is ever hidden
   that safety depends on. Muting only reorders and de-emphasizes") applied to a second axis. If
   picking "partner" instead of "spouse" ever gates a track, the field has become a tier and the
   implementation is wrong.
3. **Default to the wide word.** Where a string is ambiguous, ship "relationship." A married
   couple reading "relationship" is unbothered. An unmarried couple reading "marriage" closes
   the app.
4. **Never assume forward motion.** No copy, badge, stage title, or metric may imply that
   escalation (moving in, engagement, marriage, staying together) is the healthy outcome. For
   couples who are deciding, the app must be visibly neutral or it is refereeing with a thumb
   on the scale.
5. **Real names of real things stay exact.** "The American Association for Marriage and Family
   Therapy," "licensed marriage and family therapist," and published book and podcast titles are
   accurate and must not be softened. Gloss them instead. See section 2.7.
6. **No fabricated data.** Anywhere this spec asks for new content, no invented statistics,
   studies, or testimonials. Stories stay labeled composites. If a claim needs a number, it needs
   a source URL and a date checked, or it gets written without the number.
7. **No em dashes or en dashes** in any copy, code, or comment produced from this spec.

---

## 1. Convergent failures, ranked

Ranked by number of received personas who hit it, then by severity. Everything at rank 1 through
6 is a launch blocker for the expansion: shipping new tracks while these stand wastes the tracks,
because the affected couples never get past onboarding.

### 1. The app has no concept of relationship type at all (8 of 8)

`src/lib/store.ts:10` `Profile = { a, b, safetyAck, createdAt, situation?, lenses?, roles? }`.
There is no field that could drive different wording. Every copy fix in section 2 is a one-off
patch until this exists. This is the structural blocker under every other blocker.

**Fix:** ship the model in section 3 first. Add `relationship` to `Profile`, capture it in
onboarding after names and before the situation chip, and route every marriage-assuming string
through a `words(profile)` helper.

### 2. The first sentence of the app excludes most of the new audience (8 of 8)

`src/app/onboarding.tsx:81` "Marriages rarely die of one big thing." set at 26pt as the brand
moment, before any tap. Six personas named this as the exact screen where their reluctant partner
would close the app. One separated persona noted the second problem: "rarely" is an unsourced
frequency claim in an app that is otherwise careful about citation.

**Fix:** "Most of the damage isn't one big thing." / "It's the sentences that never landed."
This drops the marriage noun and the unsourced claim in one edit and keeps the cadence and the
amber second line. Preserve the third paragraph's sense of privacy and partnership without
promising permanent pricing or advertising policy. Five personas called that paragraph the
reason they kept reading.

### 3. The situation chips do not contain the reason the couple is here (8 of 8)

`src/lib/situation.ts`, ten chips: drift, affair, loss, baby, money, illness, desire-gap,
blended, faith, just-us. Not one of the eight received personas found a chip that described
them. Onboarding forces a choice with no skip and no "none of these," and the tap commits
instantly with no confirm (`src/app/onboarding.tsx:319`, `onPress={() => finishWith(s.id)}`).

Three compounding harms:
- Misfiling silently misroutes stories, decks, and the foregrounded track for the life of the
  account.
- The fallback chip `just-us` says "No crisis, just care" to a couple in quiet panic. Named as
  actively insulting by four personas.
- `just-us` and `drift` set `heavy: false`, which in `src/app/(tabs)/explore.tsx:79-83` sorts the
  entire "When it's heavy" section, containing the `/safety` row, to the bottom of Explore. The
  app demotes crisis resources as a reward for under-reporting.

**Fix (three parts):**
- Add the chips in section 3.6. Allow up to two selections. Add an explicit Continue button so a
  mis-tap is not permanent. Add "None of these fit" landing on `just-us`.
- Pull the `/safety` row out of the sortable heavy section in `explore.tsx` and give it a fixed
  position that the sort cannot move. Safety ordering must never depend on a self-report.
- Update the stale heavy-section subtitle "Affair, loss, illness, money, baby," which has been
  wrong since five more tracks shipped and tells couples with the other six problems not to tap.

### 4. The home screen signs off with a marriage promise, every day (8 of 8)

`src/app/(tabs)/index.tsx:318` "Mend is designed to be deleted. The goal is a marriage that
doesn't need it." Same sentence at `src/app/onboarding.tsx:220` and in
`src/locales/en.json:64`. Graduation is the best idea in the product and it is welded to the one
word that excludes the new audience, on the screen users open most.

**Fix:** "The goal is a relationship that doesn't need it." For co-parents, `words()` yields
"two parents who don't need a referee." Section 5.4.

### 5. The couple's actual presenting problem has no track (8 of 8)

Eleven tracks: affair, pregnancy-loss, grief, illness, money-crisis, new-baby, desire-gap,
blended, faith-gap, caregiving, scarcity. Every received persona scrolled the list looking for
their thing and did not find it. Each needed a different track, which is why this reads as a
content backlog (section 4) rather than one fix, but the failure shape is identical: the reluctant
partner reads the list, concludes "this is for people with an affair or a sick kid," and quits.

Compounded by `src/app/tracks/index.tsx:31` "For the marriages carrying something heavy," which
is the header over the door to every clinical off-ramp in the app.

### 6. Stories are a wall of marriage badges (8 of 8)

All fifteen stories carry `years: "Married N years"`, rendered as a visible Chip on every
collapsed card in `src/app/stories.tsx`. Journey step `s5-stories` then says "Read two stories
that could have been yours." Zero stories feature an unmarried couple, a couple under three
years, a couple who split and came back, or a couple who are no longer together. Five personas
named the `years` chip specifically; all eight named the representation gap.

**Fix:** neutral duration in the badge ("Together 11 years"), marriage in the prose only where
it is load-bearing (`same-sex-labor`, `almost-divorce`, `blended-family`). New stories in
section 4.

### 7. Journey stage 5 names an outcome the couple has not chosen (7 of 8)

`src/lib/journey.ts:269` `title: "Build the marriage you meant"`, `why` at 272 "A repaired
marriage isn't the goal; it's the floor." For a couple deciding whether to move in, get married,
or stay together at all, the finish line is named for the thing they are arguing about, which
reads as the app taking one partner's side. For the reconciled couple, "the marriage you meant"
is the thing that failed. For co-parents it is a destination they have explicitly declined.

**Fix:** default title "Build the one you're choosing now," arc line "From repaired to chosen"
kept verbatim (three personas called it the best line in the file). Per-type overrides in
section 5.

### 8. The safety gate is marriage-framed on the two highest-stakes screens (7 of 8)

`src/lib/content/safety.ts:67` `whyGateMatters` contains "This isn't about your marriage being
'bad enough'; it's about the right tool." That exact string renders at the onboarding gate
(`onboarding.tsx:250`) and at the top of `/safety`. Also `src/app/safety.tsx:34` "when a
marriage needs a professional" and `src/lib/content/library.ts:122` "If anything in your
marriage frightens you."

This is a safety defect, not a copy defect. An unmarried person under coercive control has an
available reason to file the hotline card under not-for-me. Unmarried partners are not lower
risk; they frequently have fewer legal footholds.

**Fix:** "your relationship" in all three. Change nothing else in `whyGateMatters`. Six personas
independently called that paragraph the best writing in the product.

### 9. Deck cards assume a wedding happened (7 of 8)

`src/lib/content/cards.ts` lines 117, 121, 156, 183, 186, 223, 462. The Lighter deck's tagline
is "Because you married someone you used to laugh with" and it contains "the week before our
wedding." Go Deeper's most vulnerable card opens "even inside this marriage." Dreams closes with
"If this marriage had a mission statement." The pass rule saves these from being fatal, but
passing four cards in a round because you are not married is its own message, delivered out
loud, in front of each other.

### 10. Daily questions break the shared ritual on marriage days (7 of 8)

`src/lib/content/daily.ts:54, 146, 186` say marriage outright; line 98 assumes a shared home.
Roughly one day in fourteen the ritual breaks for both partners simultaneously. The file header
at line 9 already states the correct standard ("nothing that only makes sense in year one or
year thirty") and simply never applied it to relationship type.

### 11. Half the practical content assumes one front door (6 of 8)

Micro-moves in `src/lib/content/challenges.ts:204-296`: "when you reunite after work," "when you
wake up first," "when you pull into the driveway together," "when you're both on your phones on
the couch," "at dinner." Six of eight rituals in `src/lib/content/nudges.ts`. First Steps deck
cards about "our place" and "around the house." Challenge day 4 "Greet before logistics" assumes
a shared evening.

For the long distance couple roughly one day in six the Today nudge is literally impossible, and
the app shows it anyway with no alternative. For the dating couple, three of seven challenge days
cannot be done on the days they are apart, which stalls journey stage 2 with no honest tick box.

**Fix:** tag every micro-move, ritual, deck card, and challenge day with a `contexts` array and
filter on living situation. Write the apart-native replacements in section 4.

### 12. Quiz results and framing screens exclude in the last sentence (6 of 8)

`src/app/quiz.tsx:230` "What this gives your marriage," over a quiz whose twelve scenarios are
flawlessly neutral. Also `src/lib/content/quiz.ts:326, 328, 352, 389, 429`. Also
`src/app/plan.tsx:52`, `src/app/challenges.tsx:125, 201`, `src/app/games.tsx:96`,
`src/lib/content/techniques.ts:179`, `src/app/(tabs)/talk.tsx:731`. In every case the surrounding
content is neutral and only the frame excludes, which is the most avoidable class of failure in
this audit.

### 13. Children are assumed as the household default (5 of 8)

`src/lib/content/nudges.ts:18` "not the kids' schedule," `:60` "Works with kids present, and
teaches them the marriage they'll one day copy." `src/lib/content/cards.ts:156` "as a parent, as
a spouse." `src/lib/content/topics.ts:145` "If the kids/work/house vanished for 48 hours."
`src/app/(tabs)/talk.tsx:730` offers "I'll handle bedtime Tuesday" as the model commitment to
every couple. Individually forgivable, collectively a drumbeat.

**Fix:** gate on `kids` (section 3.4). Write the childless phrasing as the default and the kid
phrasing as the variant, not the reverse.

### 14. The professional-referral line reads as a gate (5 of 8)

`src/app/onboarding.tsx:229` "not a substitute for a licensed marriage and family therapist or
crisis care," and `src/locales/en.json:49`. The credential name is correct and must stay. With
no gloss, an unmarried reader concludes the referral is not for her.

**Fix:** "not a substitute for a licensed couples therapist (in the US that license is usually
called a marriage and family therapist, and they see unmarried couples too) or crisis care."

### 15. Auto-detected journey steps have no honest override (3 of 8)

`src/app/(tabs)/journey.tsx:169` `const manual = !step.auto`, so the mark-complete control renders
only for steps with no auto check. Consequences observed:
- A couple with no money problem cannot pass `s4-session-money` without holding a session about
  childhood money wounds they do not need.
- Separated co-parents cannot pass `s4-session-affection`, a mandatory conversation about desire,
  without crossing a boundary they built on purpose.
- A couple who sees each other three days a week cannot honestly complete `s2-challenge`
  (`turning-toward`), and stage 2 stalls forever.

The honest user is punished harder than the user who lies, which corrodes the one mechanic the
whole journey rests on.

**Fix (two parts):** render a manual control on every step, worded "We did this our way" for auto
steps and "Not our situation, skip it" for steps made irrelevant by type. And add
`applies?: (shape) => boolean` to `JourneyStep` so money and desire steps are conditional rather
than universal. Section 5.

### 16. Graduation is unreachable or means the wrong thing (4 of 8)

`readyToGraduate` requires both partners' stage 5 pulse average at 4 or above across all five
statements, including "There was real warmth or affection between us" and "I feel hopeful about
where we're headed." Separated co-parents running flawless handoffs for a year would honestly
score warmth at 2 and be told, forever, "The work is done. The numbers aren't, yet." An engaged
couple reads a five-stage program ending in "Build the marriage you meant" as the app answering
the question they came to ask.

**Fix:** `pulseQuestionsFor(shape)` in section 5.5. Keep the 4-or-above gate and the honest
failure copy, which four personas named as the reason they would trust the app about anything
else. Never build a readiness score. Never let a pulse number imply a verdict on whether to stay,
marry, or move in.

### 17. Coercive control is described only in its in-person, married form (4 of 8)

The gate question and clarifier (`onboarding.tsx:245-249`) are the best-written screen in the
product and three personas asked that not a word change. But "violence, fear, or control,
physical or otherwise" leaves the specific shapes of this audience's risk unnamed:
- location tracking, demands to prove who you are with, punishment for an unanswered call
  (long distance),
- threats to out you to family, an employer, or a landlord (asymmetric outness),
- pressure or ultimatums about moving in, a name on a lease before you are ready, control of your
  money (couples deciding on cohabitation),
- post-separation control routed through the child, the schedule, or the money (co-parents).

Separately, the gate is asked once at signup, writes `safetyAck: true`, and is never revisited
across a program that runs sixteen to twenty-four weeks.

**Fix (additions only, never trades):**
- Add one clause to the gate body and to `whyGateMatters`: "Control can also look like being
  tracked, being required to prove where you are or who you're with, being punished for not
  answering, or being threatened with having something about you exposed."
- Add cohabitation-specific and post-separation-specific flags to the relevant new tracks'
  `seekHelp` lists.
- Add a private re-ask inside the pulse flow at each stage, shown only to the person answering,
  never on the shared Journey screen, never gated, never counted toward progress. This inherits
  the existing pulse privacy rule at `src/app/(tabs)/journey.tsx:144-148`.
- Add a persistent, low-key `/safety` link on the session start screen and the track screens.

### High severity, under the 3-persona threshold, ship anyway

- **Two-device sessions (2 of 8, both as a hard blocker).** `src/app/(tabs)/talk.tsx:316` "Sit
  somewhere you can face each other," one phone, "Partner A / Partner B," "trade phones." The
  core feature is unusable by the long distance couple and by separated co-parents, and it is the
  auto-detected evidence for six journey steps. Minimum viable fix in section 5.6.
- **Daily-question pairing breaks across time zones (1 of 8, silent data bug).**
  `src/lib/space.ts:37-42` `todayKey()` uses device-local `getFullYear/getMonth/getDate`, and
  `src/lib/content/daily.ts:251` `questionForDate()` rotates on the local day index. Two partners
  in different zones write different `prompt_date` rows and are literally answering different
  questions, so both phones sit on "sealed until theirs arrives" forever with no explanation. The
  user-visible meaning is "my partner did not answer." Fix: anchor `prompt_date` and the question
  index to one space-level clock (store a space timezone, or use UTC), add a 30-hour grace window
  so a late answer still pairs, and show the partner's local time in the waiting state instead of
  a bare seal.
- **"Nothing gets locked away" is not true (1 of 8).** `src/app/onboarding.tsx:312` promises
  nothing is locked, while `FREE_DECKS`, `FREE_CHALLENGES`, and `plus.tsx` all gate. The sentence
  is unnecessary because the situation picker genuinely locks nothing. Replace with "Your pick
  only changes the order of things, never what you can reach. Change it any time in settings."

---

## 2. The exclusion audit

Every marriage-assuming word and mechanic, where it lives, and its replacement. Grouped by file
class. `{bond}`, `{partner}`, and `{them}` refer to the `words()` helper in section 3.7.

### 2.1 App chrome and framing screens (P0, ship first)

| File and line | Current copy | Proposed copy |
|---|---|---|
| `src/app/onboarding.tsx:81` | "Marriages rarely die of one big thing." | "Most of the damage isn't one big thing." |
| `src/app/onboarding.tsx:84` | "They starve on unheard sentences." | "It's the sentences that never landed." |
| `src/app/onboarding.tsx:220` | "back into a marriage that holds itself up" | "back into a {bond} that holds itself up" |
| `src/app/onboarding.tsx:229` | "not a substitute for a licensed marriage and family therapist or crisis care" | "not a substitute for a licensed couples therapist (in the US that license is usually called a marriage and family therapist, and they see unmarried couples too) or crisis care" |
| `src/app/onboarding.tsx:249` | "This is about violence, fear, or control, physical or otherwise." | Keep verbatim, append: "Control can also look like being tracked, being required to prove where you are or who you're with, being punished for not answering, or being threatened with having something about you exposed." |
| `src/app/onboarding.tsx:290` | Label "Your partner's name" | "Your {partner}'s name" (default stays "Your partner's name") |
| `src/app/onboarding.tsx:312` | "Nothing gets locked away, and you can change it any time in settings." | "Your pick only changes the order of things, never what you can reach. Change it any time in settings." |
| `src/app/(tabs)/index.tsx:318` | "The goal is a marriage that doesn't need it." | "The goal is a {bond} that doesn't need it." |
| `src/app/plan.tsx:52` | "Marriages aren't repaired in sessions. They're repaired between them." | "Relationships aren't repaired in sessions. They're repaired between them." |
| `src/app/challenges.tsx:125` | "which is the only way anything in a marriage gets built" | "which is the only way anything between two people gets built" |
| `src/app/challenges.tsx:201` | "Marriages turn on accumulations, not breakthroughs." | "Relationships turn on accumulations, not breakthroughs." |
| `src/app/tracks/index.tsx:31` | "For the marriages carrying something heavy" | "For the couples carrying something heavy" |
| `src/app/quiz.tsx:230` | "What this gives your marriage" | "What this gives the two of you" |
| `src/app/safety.tsx:34` | "But when a marriage needs a professional" | "But when a relationship needs a professional" |
| `src/app/games.tsx:96` | "finding out you married someone with terrible opinions" | "finding out you picked someone with terrible opinions" |
| `src/app/(tabs)/talk.tsx:731` | "'I'll handle bedtime Tuesday' keeps a marriage better than 'I'll be more present.'" | "'I'll call you Tuesday before you sleep' keeps you two better than 'I'll be more present.'" Keep the bedtime example only when `kids !== "none"`. |
| `src/app/(tabs)/explore.tsx:60` | sub: "Affair, loss, illness, money, baby" | "Eleven guided paths for a specific hard thing" (stop enumerating; the list has been stale since five tracks shipped) |
| `src/locales/en.json:49` | "It cannot replace a licensed marriage and family therapist" | Match the onboarding gloss above |
| `src/locales/en.json:57` | "A staged path from where you are to a marriage that doesn't need this app." | "A staged path from where you are to a {bond} that doesn't need this app." |
| `src/locales/en.json:64` | "the goal is a marriage that doesn't need it anymore" | "the goal is a {bond} that doesn't need it anymore" |
| `src/lib/motion.ts:3` | code comment "A marriage app in hard" | "A relationship app in hard" (comment only, zero user impact, do it in the same sweep) |

Non-English locales (`es`, `fr`, `de`, `pt`) currently contain zero matches for these terms.
Re-check them after the English strings land; the translations must inherit the wide noun.

### 2.2 Journey (`src/lib/journey.ts`)

| Line | Current copy | Proposed copy |
|---|---|---|
| 67 | "no verdicts on the marriage" | "no verdicts on the {bond}" |
| 87 | "because it isn't about the marriage" | "because it isn't about the two of you" |
| 197 | "A standing weekly meeting for the marriage" | "A standing weekly meeting for the two of you. A video call counts." |
| 217 | "the specific heavy thing your marriage has been carrying" | "the specific heavy thing the two of you have been carrying" |
| 222 | "If your marriage holds a big wound" | "If the two of you are carrying a big wound" |
| 229 | "Being wanted is the marriage; this is where you talk about it out loud." | "Being wanted matters, and this is where you talk about it out loud." Step becomes conditional; see 5.3. |
| 269 | title "Build the marriage you meant" | "Build the one you're choosing now" (per-type overrides in 5.4) |
| 272 | "A repaired marriage isn't the goal; it's the floor." | "A repaired {bond} isn't the goal; it's the floor." |

Keep `arc: "From repaired to chosen. Then you graduate, and delete us."` verbatim.

### 2.3 Situations (`src/lib/situation.ts`)

| Line | Current copy | Proposed copy |
|---|---|---|
| 128 | chip "Blended or second marriage" | "Blended family, or a second time around" |
| 131 | hereForYou "You're building a second marriage through family shrapnel." | "You're building this on top of two histories. There's a path for exactly this." |
| 133 | trackTitle "Blended family and second marriage" | "Blended family and second chapter" |
| 140 | chip "Two faiths, one family" | "We believe different things" (never "two faiths": one of the two is often the partner who has none, and an interfaith label writes them out of their own chip. Keep `planPhrase` "loving across a line of belief", which is already right.) |
| 51 | drift `track: ""` | Point at a real track. Drift is the single most common reason a couple opens this app and it is the one answer that returns nothing, hiding the Explore track card entirely (`explore.tsx:90`). Point it at the new `second-decade` track for long relationships, `first-steps` and `go-deeper` decks otherwise. |
| 155 | just-us hereForYou "No crisis, just care." | "You're here on purpose, not because something broke. That counts." (Four personas were forced into this chip and read "no crisis" as the app calling their problem nothing.) |

New chips in section 3.6.

### 2.4 Decks (`src/lib/content/cards.ts`)

| Line | Current copy | Proposed copy |
|---|---|---|
| 26 | tagline "Easy questions for a quiet house." | "Easy questions for a quiet evening." |
| 83 | "What's your favorite spot in our place, and what do you usually do there?" | Tag `contexts: ["together"]`. Apart variant: "What's your favorite spot in the place you spend most of your time, and what do you do there?" |
| 92 | "Is there something around the house that's been bugging you..." | Tag `contexts: ["together"]`. |
| 109 | "if the marriage is running cold, warm up with First Steps" | "if things are running cold, warm up with First Steps" |
| 117 | "When do you feel loneliest, even inside this marriage?" | "When do you feel loneliest, even inside this relationship?" |
| 121 | "What part of yourself have you put on a shelf since we got married?" | "What part of yourself have you put on a shelf since we built this life together?" |
| 156 | "at work, as a parent, as a spouse, anywhere?" | "at work, as a partner, anywhere?" (add "as a parent" back when `kids !== "none"`) |
| 183 | tagline "Because you married someone you used to laugh with." | "Because you fell for someone you used to laugh with." |
| 186 | "not a distraction from repairing a marriage" | "not a distraction from repairing a relationship" |
| 223 | "one sentence back to me the week before our wedding" | "one sentence back to me the week we decided this was serious" |
| 462 | "If this marriage had a mission statement, what should the first line be?" | "If we wrote a mission statement for us, what should the first line be?" |

Note: line 462 is the exact card two personas said they needed, currently locked behind both a
marriage word and a Plus gate.

### 2.5 Topics (`src/lib/content/topics.ts`)

| Line | Current copy | Proposed copy |
|---|---|---|
| 38 | "People keep changing after the wedding." | "People keep changing after the beginning." |
| 56 | "Tell me about a moment you were proud to be married to me." | "Tell me about a moment you were proud to be with me." |
| 81 | "stress from outside the marriage... protects the marriage from everything else" | "stress from outside the two of you... protects the two of you from everything else" |
| 125 | "Desire discrepancies are normal in long marriages" | "Desire discrepancies are normal in long relationships" |
| 139 | "Plenty of marriages run efficiently... Being wanted is the marriage." | "Plenty of couples run efficiently... Being wanted is the relationship." |
| 166 | title "In-laws and boundaries" | "Families and boundaries" (three personas have no in-laws in any sense they recognize; one is a family that does not know they are a couple) |
| 167 | "The rule that saves marriages: each partner manages their own family of origin." | "The rule that saves couples: each partner manages their own family of origin." |

### 2.6 Daily questions (`src/lib/content/daily.ts`)

| Line | Current copy | Proposed copy |
|---|---|---|
| 9 | header comment "assumes the marriage is thriving" | "assumes the relationship is thriving" and add relationship-type to the stated standard |
| 54 | "If your marriage had a theme song this week..." | "If the two of you had a theme song this week..." |
| 98 | "something about your home life you would not trade" | "something about your life together you would not trade" |
| 146 | "one way this marriage has made you better than you were before it" | "one way being with your partner has made you better than you were before" |
| 186 | "What has this marriage carried you through..." | "What has being together carried you through..." |

The other 51 questions need nothing, which is the proof that the neutral voice was always
achievable. Add a `contexts` tag to the type (section 3.7) and filter the pool before the
modulo so co-parents never get a desire question and apart couples never get a shared-home one.

### 2.7 Games, challenges, nudges, quiz, techniques

| File and line | Current copy | Proposed copy |
|---|---|---|
| `games.ts:138` | "Outside of your marriage, who or what is your partner most worried about right now?" | "Outside of the two of you, who or what is your partner most worried about right now?" |
| `games.ts:213` | "Redo our wedding day with an unlimited budget" | "Redo our first trip together with an unlimited budget" |
| `challenges.ts:23` | title "7 Days of Turning Toward" | "Seven Moves of Turning Toward" (drop the promise of consecutive days; the engine is already self-paced at `challenges.tsx:64`, say so in the copy) |
| `challenges.ts` forWhom (turning-toward) | "polite, efficient, and a little bit lonely in the same house" | "polite, efficient, and a little bit lonely, whether that's across a house or across a country" |
| `challenges.ts:44-46` day 4 | "The first time you see each other today after being apart..." / "a cheap way to feel married again" | Apart variant: "The first time you talk today, in person or by phone or text, greet the person before the logistics." / "a cheap way to feel like a couple again" |
| `challenges.ts:49` day 5 "Decline warmly" | as written | Add apart variant: name a return time when you cannot talk right now |
| `challenges.ts:128` | "The dishes, not the marriage." | "The dishes, not the whole relationship." |
| `challenges.ts:139` | "refusing to let the argument eat the marriage" | "refusing to let the argument eat the relationship" |
| `challenges.ts:149` | "both realities getting heard inside one marriage" | "both realities getting heard inside one relationship" |
| `challenges.ts:168` | "A marriage can be rebuilt from neutral" | "A relationship can be rebuilt from neutral" |
| `challenges.ts:193` | "A week like this doesn't fix a marriage" | "A week like this doesn't fix a relationship" |
| `challenges.ts:204-296` micro-moves | 24 moves, majority same-building | Add `contexts` per move and write 12 apart-native moves (section 4.4) |
| `nudges.ts:18` | "not logistics, not the kids' schedule... a strained marriage" | "not logistics... a strained relationship". Kid clause only when `kids !== "none"`. |
| `nudges.ts:36` | "A standing 45-minute meeting for the marriage" | "A standing 45-minute meeting for the two of you. A video call counts." |
| `nudges.ts:42` | date-night "Out of the house if possible" | "Out of your usual rooms if possible" |
| `nudges.ts:46` | reunion-ritual "When you reunite at the end of the workday" | Tag `contexts: ["together"]` |
| `nudges.ts:52` | phone-free-30 "phones in another room" | Tag `contexts: ["together"]`. For apart couples the phone is the only channel presence has; write the parallel-presence version instead (section 4.5). |
| `nudges.ts:60` | "Works with kids present, and teaches them the marriage they'll one day copy." | Tag `contexts` and `kids`; "teaches them the relationship they'll one day copy" |
| `quiz.ts:326` | "you're always easy to be married to" | "you're always easy to be with" |
| `quiz.ts:328` | "a referendum on the whole marriage" | "a referendum on the whole relationship" |
| `quiz.ts:352` | "notice trouble in a marriage months before" | "notice trouble months before" |
| `quiz.ts:389` | "a wall that keeps out the person you married" | "a wall that keeps out the person you chose" |
| `quiz.ts:429` | "protecting the marriage from the fight" | "protecting the relationship from the fight" |
| `techniques.ts:179` | "Marriages are built in six-second moments, not grand gestures." | "Relationships are built in six-second moments, not grand gestures." |
| `techniques.ts:43, 48` | "The four patterns that predict divorce" / "The single strongest divorce predictor" | Keep the research language exact. Add one plain sentence to the technique body noting that these patterns predict the end of a relationship whether or not there is a marriage to dissolve. |

### 2.8 Stories (`src/lib/content/stories.ts`, `stories-extra.ts`)

Mechanical: the `years` field becomes a neutral duration. Marriage moves into the prose only
where the story turns on it.

| Story id | File:line | Current | Proposed |
|---|---|---|---|
| `affair-aftermath` | stories.ts:31 | "Married 11 years" | "Together 11 years" |
| `roommate-drift` | stories.ts:61 | "Married 9 years" | "Together 9 years" |
| `miscarriage` | stories.ts:91 | "Married 4 years" | "Together 4 years" |
| `first-year-baby` | stories.ts:121 | "Married 3 years" | "Together 3 years" |
| `money-collapse` | stories.ts:151 | "Married 14 years" | "Together 14 years" |
| `empty-nest` | stories.ts:181 | "Married 34 years" | "Together 34 years" |
| `blended-family` | stories.ts:211 | "Married 7 years" | "Together 7 years, married 7" (marriage is load-bearing here) |
| `chronic-illness` | stories.ts:241 | "Married 21 years" | "Together 21 years" |
| `almost-divorce` | stories.ts:271 | "Married 17 years" | "Together 17 years" (marriage stays in the prose; the story ends "their second marriage, same spouse") |
| `desire-gap` | stories.ts:301 | "Married 12 years" | "Together 12 years" |
| `same-sex-labor` | stories-extra.ts:21 | "Married 6 years" | "Together 9 years, married 6" (being named husband at the table IS the turning point) |
| `interfaith-holidays` | stories-extra.ts:51 | "Married 8 years" | "Together 8 years" |
| `opposite-shifts` | stories-extra.ts:81 | "Married 5 years" | "Together 5 years" |
| `loud-repair` | stories-extra.ts:111 | "Married 15 years" | "Together 15 years" |
| `long-caregiving` | stories-extra.ts:141 | "Married 29 years" | "Together 29 years" (husband and wife stay in the prose; that is the ache of the story) |

Prose edits where the marriage word is doing no work:

| File:line | Current phrase | Proposed |
|---|---|---|
| stories.ts:93 | "Grieving alone in a marriage" | "Grieving alone inside a relationship" |
| stories.ts:113 | "part of their marriage now" | "part of their life together now" |
| stories.ts:119 | "the baby would be easy compared to the marriage" | "the baby would be easy compared to the two of them" |
| stories.ts:127 | "gave up on fixing the whole marriage" | "gave up on fixing everything at once" |
| stories.ts:157 | "wasn't saving the marriage" | "wasn't saving the relationship" |
| stories.ts:169 | "It outlived the marriage." | Keep. This sentence is the app's only acknowledgment that a separation can be handled well and should be promoted, not softened. See section 4.3. |
| stories.ts:225 | "kept the fights inside this marriage" | "kept the fights inside this family" |
| stories.ts:239 | "the marriage quietly became a third patient" | "the relationship quietly became a third patient" |
| stories.ts:275 | "a marriage I was losing" | "a relationship I was losing" |
| stories-extra.ts:83 | "I married a man and I ended up with a co-worker" | "I fell for a man and I ended up with a co-worker" |
| stories-extra.ts:99, 103 | "negotiate a whole marriage in ninety seconds" / "keeps them in one marriage" | "negotiate a whole relationship in ninety seconds" / "keeps them on the same team" |
| stories-extra.ts:133 | "neither wants a quiet marriage" | "neither wants a quiet relationship" |
| stories-extra.ts:69 | "landing inside the marriage" | "landing inside the relationship" |
| stories-extra.ts:147, 163 | "gave the marriage a standing ten minutes" / "the marriage underneath the caregiving" | "gave the two of them a standing ten minutes" / "the couple underneath the caregiving" |
| stories-extra.ts:5, tracks headers | file comments referencing "marriages" | "relationships" |

Keep verbatim: every line in `same-sex-labor` about the word husband (lines 23, 25, 27, 43),
and every "husband and wife" line in `long-caregiving` (139, 143, 145, 155, 159, 163). Those are
the stories where the noun is the point.

Keep `storiesNote` and the composite-fiction disclosure exactly as they are. Six personas named
it as a trust anchor.

### 2.9 Tracks (`src/lib/content/tracks.ts`, `tracks-extra.ts`)

Rule: inside track prose, "marriage" almost always means "the relationship" generically. Replace
with "relationship," "the two of you," or "the couple." Keep it only where the content is
specifically about legal marriage.

Replace with a neutral noun (file:line): `tracks.ts` 2, 34, 46, 76, 80, 95, 96, 209, 211, 215,
219, 227, 281, 289 (three occurrences), 293 ("Wanting to be treated as a spouse and not a
project" becomes "as a partner and not a project"), 302 ("spouse time" becomes "partner time"),
322 ("your spouse" becomes "your partner"), 367, 379 ("never the spouse" becomes "never your
partner"), 417 (session title "Marriage on a budget" becomes "Us, on a budget"), 445, 453, 460,
515. `tracks-extra.ts` 3, 4, 16, 18, 31, 33, 40, 111 (second half), 119, 129, 133, 168, 174, 196,
200, 208, 213, 223, 257, 285, 289, 298, 316, 319, 347, 374, 386, 435, 454.

Keep the marriage noun where it is the subject (blended track): `tracks-extra.ts` 104, 105, 107,
114, 122, 149, 151, 162. Reword only 104 and 105 so unmarried blended families fit:

| Line | Current | Proposed |
|---|---|---|
| `tracks-extra.ts:104` | title "Blended family and second marriage" | "Blended family and second chapter" |
| `tracks-extra.ts:105` | subtitle "Building one marriage on top of two histories" | "Building one relationship on top of two histories" |
| `tracks-extra.ts:107` | "This track is for the second (or third) marriage at any age" | "This track is for the second (or third) time around at any age, married or not" |

Two content defects inside tracks, unrelated to wording but flagged by four personas:

- `tracks.ts:453` new-baby: "feeling incompetent when your soothing doesn't work and she takes
  over." The line above correctly hedges ("often though not always the mother") and then this
  sentence hard-codes a mother and a non-mother partner. Fix: "when your soothing doesn't work
  and your partner takes over." Two dads, two moms, a stay-at-home father, and adoptive and
  surrogacy paths are currently written out of their own track.
- `tracks.ts` affair principles: "Full no-contact with the affair partner, verified and
  permanent." Correct and must stay. Add one line to the track overview: this track is for when
  an agreement was broken, whatever the two of you had agreed to. The app currently offers
  exactly one frame for non-monogamy, which is betrayal, and it convicts one partner before they
  speak.

### 2.10 Library (`src/lib/content/library.ts`): what must NOT change

| Line | String | Ruling |
|---|---|---|
| 18 | "The Seven Principles for Making Marriage Work" | Real published title. Do not change. |
| 53 | "Fighting for Your Marriage" | Real published title. Do not change. |
| 112 | "The American Association for Marriage and Family Therapy... licensed marriage and family therapist" | Real organization and real credential. Do not change. Add a gloss sentence: "They see unmarried couples too." |
| 150, 152 | "Marriage Therapy Radio" / "Two working marriage therapists" | Real podcast name and accurate description. Do not change. |

Mend's own sentences around them do change:

| Line | Current | Proposed |
|---|---|---|
| 22 | "what actually predicts lasting marriages" | "what actually predicts lasting relationships" |
| 49 | "anyone married to them" | "anyone who loves them" |
| 57 | "protecting the good parts of the marriage" | "protecting the good parts of the relationship" |
| 63 | "most marriages take a real hit" | "most couples take a real hit" |
| 69 | "A marriage carrying a loss" | "A relationship carrying a loss" |
| 70 | "what a grieving spouse needs from you" | "what a grieving partner needs from you" |
| 83 | "keeps walking into the marriage uninvited" | "keeps walking into the relationship uninvited" |
| 117 | "bigger than a marriage problem" | "bigger than a relationship problem" |
| 122 | "If anything in your marriage frightens you" | "If anything in your relationship frightens you" (safety string: always the wide word, never personalized) |

---

## 3. The relationship-type model

Three dimensions that vary independently, proven by the personas: an unmarried couple can live
together (Tomas and Elena) or in two cities (Devon and Alex); a married couple can be in year one
or year twenty-nine; a co-parenting pair is not romantic at all. One field cannot carry this.

### 3.1 The union types

```ts
// src/lib/relationship.ts (new file)

/** What the couple calls the relationship. Never a gate, only a lens. */
export type RelationshipType =
  | "dating"              // committed, no engagement, no legal tie
  | "engaged"             // a dated commitment ahead
  | "partnered"           // committed long-term, unmarried, no wedding planned
  | "married"
  | "remarried"           // a second or later marriage
  | "civil-partnership"
  | "co-parenting"        // not romantically together, raising a child together
  | "unlabeled";          // "we don't use a word for it"

/** Whether this relationship has a break in it. Drives the reconciliation track
 *  and stops the app from implying one continuous timeline. */
export type RelationshipHistory =
  | "continuous"
  | "reconciled"          // split up, or divorced, and came back to each other
  | "separated";          // apart now, still tied (usually by a child)

/** The highest-value single input in the whole flow. Gates nudges, rituals,
 *  micro-moves, challenge day variants, deck cards, and session mode. */
export type LivingSituation =
  | "together"            // one home
  | "two-homes"           // two addresses, same area
  | "long-distance"       // two addresses, travel required
  | "apart-for-now"       // deployment, school, work, caregiving, immigration
  | "separate-households"; // co-parenting across two homes

/** How often they are actually in the same room. Drives challenge pacing. */
export type ContactFrequency =
  | "most-days"
  | "few-days-a-week"
  | "about-weekly"
  | "less-than-weekly";

/** How they mostly connect. Drives session mode and nudge selection. */
export type ConnectChannel = "in-person" | "video" | "voice" | "text";

/** Rough duration, accepting months. Never an anniversary date, never a wedding date. */
export type TogetherStage =
  | "under-1-year"
  | "1-to-3-years"
  | "3-to-7-years"
  | "7-to-15-years"
  | "over-15-years";

/** Children in the picture. Default "none", treated as completely ordinary. */
export type KidsContext =
  | "none"
  | "ours"
  | "from-before"
  | "both"
  | "expecting"
  | "grown";

/** What the couple wants from the app. Never asked as "are you going to make it." */
export type RelationshipGoal =
  | "build"        // together and building
  | "decide"       // weighing a next step, or whether to continue
  | "repair"       // something specific broke
  | "workable-apart"; // not together, need this to function

/** The noun the couple uses for each other. Free text allowed. */
export type PartnerWord =
  | "partner" | "boyfriend" | "girlfriend" | "husband" | "wife"
  | "spouse" | "fiance" | "fiancee" | "co-parent" | "name-only" | string;

/** The noun for the bond. Derived, overridable, defaults to "relationship". */
export type BondWord = "relationship" | "marriage" | "partnership" | "co-parenting";
```

### 3.2 The stored shape

```ts
export type RelationshipShape = {
  type: RelationshipType;
  history: RelationshipHistory;
  partnerWord: PartnerWord;
  bondWord: BondWord;
  living: LivingSituation;
  seeEachOther: ContactFrequency;
  connectVia: ConnectChannel[];
  together: TogetherStage;
  kids: KidsContext;
  goal: RelationshipGoal;
  /** Optional, skippable, free text. "moving in", "wedding in June", "the review date". */
  decisionAhead?: string;
  /** Optional, skippable, free text, stays on device. The pattern they fear repeating. */
  patternToWatch?: string;
};
```

Extend `Profile` in `src/lib/store.ts`:

```ts
export type Profile = {
  a: string;
  b: string;
  safetyAck: boolean;
  createdAt: string;
  situation?: Situation;              // kept for back compat
  situations?: Situation[];           // new: up to two
  relationship?: RelationshipShape;   // new
  lenses?: { a?: LensId; b?: LensId };
  roles?: { a?: ConflictRole; b?: ConflictRole };
};
```

`relationship` stays optional. Existing users have no value and must never be assumed married.
Migration rule in 3.8.

### 3.3 Defaults

```ts
export const DEFAULT_SHAPE: RelationshipShape = {
  type: "partnered",
  history: "continuous",
  partnerWord: "partner",
  bondWord: "relationship",
  living: "together",
  seeEachOther: "most-days",
  connectVia: ["in-person"],
  together: "3-to-7-years",
  kids: "none",
  goal: "build",
};
```

Every default is the wide one. `kids: "none"` means parenting content is off until a couple says
otherwise, which reverses today's behavior where every couple sees bedtime and school-run
content.

### 3.4 The onboarding questions

Order matters. The safety gate stays first, before anything personal, at its current length, with
its current wording plus the control-examples clause. Names stay second, unchanged, including
"Starting alone? Put your partner's name in anyway," which every persona protected.

New step, after names, before the situation chip. One screen, framed as language and logistics,
never as status:

| Ask | Field | Options | Notes |
|---|---|---|---|
| "What do the two of you call each other?" | `partnerWord` | partner, boyfriend, girlfriend, husband, wife, spouse, fiance, fiancee, co-parent, just our names, or type your own | "partner" preselected. Frame: "We'll use your words, not ours." This one answer drives every string in section 2. |
| "And what would you call this?" | `type` + `bondWord` | dating, engaged, partnered, married, remarried, civil partnership, co-parenting, we don't use a word | Flat list, presented as equals. Never ordered as a ladder. The word "yet" must appear nowhere on this screen. |
| "How do your weeks work?" | `living` | one home, two homes nearby, long distance, apart for now, two households (co-parenting) | Highest-value single input. Do not word this as "where do you two sleep most nights", which was the earlier draft: it is an oddly intimate thing to ask a separated co-parenting pair, and it returns a confusing answer from the many couples who share a home but not a bed (shift work, pain, a CPAP, a snorer, a baby). The field is about addresses, so ask about addresses. |
| "How often are you actually in the same room?" | `seeEachOther` | most days, a few days a week, about weekly, less than that | Only shown when `living !== "together"`. Feeds challenge pacing. |
| "Roughly how long have you been together?" | `together` | under a year, 1 to 3 years, 3 to 7, 7 to 15, over 15 | Accepts months by bucket. Never "how long have you been married." Never an anniversary date. |
| ~~"Are there kids in the picture?"~~ **Cut from this screen.** | `kids` | see note | **Superseded by `docs/ONBOARDING-V2.md` section 1.8, which is the binding version.** Children are asked about only as an opt-in chip on the optional, one-tap-skippable context screen, and silence means the same as no. Asking every couple in the main flow costs more than it returns: it lands as a status question on couples who cannot have children, on couples in treatment, and hardest on the couples the app's own `loss` chip and pregnancy-loss track exist for, who get handed "one on the way" as a selectable option weeks after a miscarriage. Keep `KidsContext` as the stored shape, populate it from 1.8, and never render a kid-shaped blank at anyone. |
| "Has this relationship had a break in it?" | `history` | no, we split up and came back, we're apart now | Neutral phrasing. Never "have you failed before." Skippable. |
| "Is there a decision or a date this is pointing at?" (optional) | `decisionAhead` | free text, skippable | Never becomes a countdown, never nagged. |

### 3.5 Questions the app must never ask

Every one of these was named by at least two personas as an immediate uninstall.

- Whether they plan to marry, or when. That is the live fight in at least two couples and the
  app has no standing in it.
- Marital status as a prerequisite, a gate, or a required field, and never with "not yet" as an
  option. The word "yet" does the damage on its own.
- Gender, a husband and wife role picker, or who does which role. `Profile` has no gender field
  today and must not gain one. Pronouns may be offered as optional and skippable.
- Sexual orientation as a demographic label. Ask what content to show ("We're a queer couple" as
  an opt-in chip on a clearly-explained preferences screen), never what they are. Do not word that
  chip as "same-sex": it is a statement about two sexes, so a nonbinary partner and many trans
  people cannot answer it truthfully, and it frames the couple as a deviation from a default
  rather than as themselves. For the same reason, what the chip changes is written as "examples
  stop reaching for a man and a woman", never as "stops opposite-sex defaults", which names the
  straight couple as the thing the app is really built around.
- Religion, income, or education outside the specific content that needs them.
- Frequency of sex, sexual history, or anything resembling a count. For a couple in a long
  silence, one question like that ends the relationship with the app permanently.
- Whose fault it is, who is the problem, who was more hurt, or who usually starts the arguments.
- A severity rating, a commitment score, a likelihood-of-staying number, or a readiness score, at
  onboarding or anywhere. The pulse exists for measurement, later, after trust.
- Whether they are out, except as an optional chip they volunteer.
- Full names, email, or anything that makes an account necessary. The invisible anonymous account
  minted at the gate is a privacy feature for anyone whose relationship is not public.
- Anything requiring both partners present or both answering before the flow can proceed.

### 3.6 New situation chips

Add to the `Situation` union and the `situations` array. Every one ships with the track it points
at, or it is another blank.

| id | chip | hereForYou | heavy | track |
|---|---|---|---|---|
| `next-step` | "We're deciding on a big next step" | "You're facing a decision, not a disaster. This helps you have that conversation instead of having it again." | true | `deciding` |
| `high-conflict` | "We fight all the time" | "You're not drifting, you're colliding. There's a path for exactly this, and it starts tonight." | true | `high-conflict` |
| `long-distance` | "We're apart more than we're together" | "You're building this across miles and clocks. We'll work with the time you actually have." | false | `long-distance` |
| `co-parenting` | "We've separated and we're raising a kid together" | "You're building a working partnership for your kid. That counts as repair, and it has a path." | true | `co-parenting` |
| `reconciled` | "We split up and came back" | "You chose each other twice. This is about not repeating the first ending." | true | `reconciliation` |
| `old-wounds` | "One of us is carrying hurt from before us" | "The alarm is old and the person is new. Both of those are true." | true | `prior-hurt` |
| `not-recognized` | "One of us is out, one of us isn't" | "You're carrying a difference in who gets to know. There's a path for the holidays, the families, and the two of you." | true | `outness` |
| `early-days` | "We're early and figuring it out" | "You're new enough that the patterns aren't set. That's an advantage, and it's worth spending." | false | `""` (decks and stories only) |

Also add "None of these fit" mapping to `just-us`, and allow two selections with an explicit
Continue.

### 3.7 The copy helper

Every string in section 2 that contains `{bond}`, `{partner}`, or `{them}` reads from one place.

```ts
// src/lib/relationship.ts
export type Words = {
  /** "relationship" | "marriage" | "partnership" | "co-parenting" */
  bond: string;
  /** "partner" | "husband" | "co-parent" | ... */
  partner: string;
  /** possessive form for labels: "your partner's" */
  partnerPossessive: string;
};

export function words(profile: Profile | null): Words;

/** Safety copy never personalizes. Use this, not words(), inside safety.ts,
 *  library.ts crisis entries, safety.tsx, and the onboarding gate. */
export const SAFETY_WORDS: Words = {
  bond: "relationship",
  partner: "partner",
  partnerPossessive: "your partner's",
};
```

`bondWord` derivation: "marriage" only when `type` is `married` or `remarried` AND the user chose
husband, wife, or spouse. "co-parenting" when `type` is `co-parenting`. "partnership" when the
user picked it explicitly. "relationship" in every other case, including when unset.

Content filtering helper, used by daily questions, deck cards, micro-moves, rituals, and
challenge days:

```ts
export type ContentContext = "together" | "apart" | "either";

export function fitsShape(
  item: { contexts?: ContentContext[]; kids?: KidsContext[]; types?: RelationshipType[] },
  shape: RelationshipShape
): boolean;
```

Add `contexts?: ContentContext[]` to `DailyQuestion`, to the deck `Card` type, to `MicroMove`, to
`Ritual`, and to `ChallengeDay` (with an `apart` variant field on the day so a single day can
carry both). Untagged items default to `"either"` so nothing breaks mid-migration.

### 3.8 Migration for existing users

- Users with a `Profile` and no `relationship` get `DEFAULT_SHAPE` semantics: every string reads
  "relationship," no parenting content, no apart filtering. They are never assumed married.
- Show a one-time, dismissible card on Today: "Mend now fits more kinds of relationships. Want to
  tell us what to call yours? Two taps, changes wording only." Links to a settings screen with the
  section 3.4 questions. Never blocks, never nags twice.
- All eight questions are editable in Settings forever.
- `situation` stays readable so no existing personalization is lost when `situations[]` lands.

---

## 4. Content gaps, ranked

Ranked first by how many received personas needed the same thing, then by severity.

### 4.1 Universal gaps (needed by 5 or more personas)

**1. Stories that are not marriages (8 of 8).** Beyond the `years` relabel, write at least five
new composites, same voice, same fictional-composite labeling, same three-view structure:
- Two people in their twenties deciding whether to move in, where the honest ending is that they
  chose different timelines and stayed together anyway. (Requested by name.)
- An engaged couple who fought constantly about a wedding, used the timer, and married. Do not
  make the fighting the villain.
- An unmarried couple with two kids, nine years in, no ceremony, whose crisis is that no
  institution counts them.
- A long distance couple in their twenties: the call that ran out of things to say, the visit,
  the goodbye crash, the closing-the-distance question one of them is afraid to ask.
- A couple who divorced and remarried each other, honest that the reconciliation was not relief
  and that the old pattern showed up in month four.

Promote the existing `money-collapse` ending ("the kids have two parents who are kind to each
other, and both of them count that as a kind of success") out of a story about a failed
restaurant. It is currently the app's only acknowledgment that an ending can go well and it is
reachable only by couples who picked the money chip.

**2. Apart-native practice content (6 of 8).** The lightest-weight, most reachable content in the
app is where the new audience is most excluded.
- 12 apart micro-moves at the existing quality bar. Suggested: send a voice memo instead of a text
  so they hear your voice; send one photo of something ordinary with no caption; be the one who
  calls first tonight; when the call goes quiet, say "I like sitting here with you" instead of
  saying you should sleep; text them the thing you were saving for the call; name a return time
  when you cannot talk right now.
- Apart variants for all seven days of `turning-toward`, `soft-repair`, and `appreciation`.
- 4 apart-friendly rituals: the protected overlap window defended like an appointment; the
  goodnight voice memo for the partner already asleep; thirty minutes on a call with cameras on
  and nothing to say, doing separate things; the visit debrief.
- Retitle `phone-free-30` and gate it to `living: "together"`. For a long distance couple the
  phone is not the enemy of presence, it is the only channel presence has.

**3. Daily questions for the whole audience (7 of 8).** After the five edits in 2.6, write roughly
30 new questions tagged by context:
- Apart: what happened today that you wanted to tell me in the moment; what is the room you're in
  right now like; what do you wish I could have seen today.
- Deciding: what are you most looking forward to about the life we're planning, and what are you
  quietly nervous about.
- Unmarried and committed: what do you think keeps the two of you choosing this, on an ordinary
  day when nothing is making you.
- Being seen: when did you last feel like we were treated as a real couple by someone outside this
  house; who in your life makes it easy to be us.
- Co-parenting: what is something your co-parent does for your kid that you would not do as well;
  what is a decision coming up that you would rather not make alone.
- Post-break: what is something you understood about yourself only after we were apart; what is
  one thing you are doing differently on purpose this time.

Add a skip control on the Today hero that swaps in the next question. Today a couple can be forced
to answer a question that manufactures the exact fight the app exists to prevent.

**4. A deck for the middle, with no wedding in it (7 of 8).** After the seven card edits in 2.4,
the Lighter and Go Deeper decks still anchor nostalgia to an origin story that some couples do not
share and others have twice. Write a present-tense deck for years three through fifteen, and a
Long Distance deck at the quality of the existing best card ("When we're apart for a few days,
what do you miss first?"): what part of your day do you wish I could see; what do you do right
after we hang up; what is the hardest hour of your week; what do you tell people about us; what do
you catch yourself saving up to tell me.

**5. Content that allows a couple not to escalate, or to end well (5 of 8).** The entire product
arc runs repair to graduation. There is no honest content for "we worked on this and chose
different things," for postponing, or for separating with dignity. Write one plain paragraph,
reachable from the journey and from any deciding-shaped track, that names deciding, postponing,
and not proceeding as legitimate outcomes and says explicitly that the app does not and cannot
tell you which. Never build a readiness score.

### 4.2 New tracks, ranked

Each follows the existing track shape: overview, `feelings` blocks per partner, principles,
sessions with prompts, `planSeed`, and an ungated `seekHelp`. First session of every track stays
free (`tracks/[slug].tsx:57-58`). The `seekHelp` comment at `tracks/[slug].tsx:102-103` ("Always
free, always visible... Never gate or trim this card") applies to all of them.

| Rank | Slug | Title | Who needed it | Core sessions |
|---|---|---|---|---|
| 1 | `deciding` | "The next step we don't agree on" | dating, engaged, plateau (3 of 8) | What each answer costs each of us. What the fear under the logistics is. Two timelines without one person being called a coward and the other a pusher. What would have to be true for the answer to change. A review date instead of a vague promise. |
| 2 | `co-parenting` | "Two homes, one kid" | separated co-parents (1 of 8, total blocker) | The handoff. The schedule. Money after separation. What we tell them and when. Texting rules. Introducing someone new. What each of us believes happened, said once, on a structured floor. |
| 3 | `no-legal-tie` | "Committed, no paperwork" | unmarried co-parents, dating (2 of 8) | What each of us assumes the other could do in an emergency. The kids and who decides. Whose name is on what, and what that does to the power between us. The sentence we each say to family who ask. What we would want if the other were gone. `seekHelp`: estate or family attorney, legal aid. Never tells anyone to get married. |
| 4 | `long-distance` | "Across the miles and the clocks" | long distance (1 of 8, total blocker) | What the distance is costing each of us. The call that became a day report. Trust without surveillance. Intimacy across a screen without either person feeling graded. The visit and the goodbye crash. When and how we close it, including if one of us cannot move. |
| 5 | `prior-hurt` | "The alarm that started before us" | dating (1 of 8, largest single hole for that couple) | Two floors, not one: what it is like when an old alarm goes off at a new person, and what it costs to keep passing tests you did not sign up for. The practical skill: telling an old alarm from new information, out loud, together. `seekHelp` names individual trauma therapy for the wounded partner. |
| 6 | `reconciliation` | "Starting again with the same person" | reconciled (1 of 8) | What actually ended it, each told without correction. The years apart, as disclosure and not interrogation. The pattern we are watching for, named in our own words. What is different this time and how we will know it is not the honeymoon. What we do the first time the old thing happens, decided in advance while calm. |
| 7 | `outness` | "One of us is out, one of us isn't" | queer couple (1 of 8) | What the closet costs each of us, both true at once. What public means, room by room and person by person. The holiday calendar agreed before the invitations. What we each do at a table where one of us is not real. A timeline that is explicitly not an ultimatum. Hard guardrail: never frames coming out as the healthy outcome or the closet as the problem to fix. |
| 8 | `high-conflict` | "We fight all the time" | engaged (1 of 8) | Not a symptom of drift and not an affair. Frequency versus corrosion, said plainly and with no statistic attached unless a real source and date are cited. Reachable tonight, not at week five. |
| 9 | `second-decade` | "When the wanting went quiet for both of you" | plateau (1 of 8) | Add a third `feelings` entry to `desire-gap` first ("If it went quiet for both of you") plus a session "When neither of us is reaching." Then the wider track: what happens to wanting after ten or fifteen years, why novelty ending is not love ending, what a lull looks like versus what an ending looks like. |

Also: a neutral Intimacy topic, "What we've actually agreed to," about each partner's assumptions,
what would count as a breach, what has changed. Today the only frame the app offers for any
conversation about exclusivity is the affair track, which has already assigned blame.

### 4.3 New topics (`topics.ts`)

Fifteen topics today, none of which is the conversation four personas came for.

1. "The next step we don't agree on." Opener must not presume an answer: "I want to talk about
   moving in without either of us trying to win it tonight."
2. "The thing we're planning" (a wedding, a move, a shared event under a deadline): guest list,
   budget, whose traditions, who each of us is trying to please.
3. "What we're actually promising each other." Distinct from `dreams-within-conflict`, which is
   for gridlock. This is for a decision not yet made.
4. "When one family knows and one doesn't." Names the asymmetry as a shared problem rather than a
   loyalty failure. Reuse the tone at `tracks-extra.ts:212` about close families being love, not a
   boundary violation.
5. "The handoff" and "The schedule," for co-parents.
6. "What we've actually agreed to," per 4.2.

Also add a framing note to `in-laws` (renamed "Families and boundaries"): the prompt "When have
you felt like I chose my family over you?" is a bomb when handed cold to a couple where one
partner is managing a real safety risk rather than a loyalty preference.

### 4.4 New challenges

- Apart variants for every day of the three existing weeks (see 4.1).
- "The Handoff Week," seven days for separated co-parents: one small change at the door, greet the
  kid before the logistics, no editorial about the other parent, one civil sentence, one piece of
  information volunteered before being asked.
- "Not the Day Report," seven days for long distance: a voice memo before sleep, a question banked
  during the day, watching the same thing on a call, one photo each, sitting on the call doing
  separate things.

### 4.5 Rituals

Add: the protected overlap window; the goodnight voice memo; parallel presence on a call; the
weekly meeting explicitly allowed to be a video call; the co-parent weekly business meeting (which
already exists inside `money-collapse` as the best idea in the story and has never been adoptable).

### 4.6 A place to record a decision

`plan.tsx` holds rituals and commitments. There is nowhere to write "we agreed her mother's
plus-ones are settled and we are not reopening it." Two personas named repetition, not
disagreement, as the thing that grinds them down. Add a "Settled" list to the plan: one line, a
date, and no reopening without both of them.

---

## 5. Journey changes

### 5.1 Make the journey a function of shape

```ts
// src/lib/journey.ts
export function stagesFor(shape: RelationshipShape): Stage[];
export function pulseQuestionsFor(shape: RelationshipShape): string[];
```

Add to `JourneyStep`:

```ts
export type JourneyStep = {
  // ...existing
  /** false = this step does not apply to this couple and is not rendered */
  applies?: (shape: RelationshipShape) => boolean;
};
```

### 5.2 Always render a manual override

`src/app/(tabs)/journey.tsx:169` currently reads `const manual = !step.auto`. Replace with: every
step renders a completion affordance. Auto steps render it as a secondary link labeled "We did
this our way." Steps whose `applies` is false do not render at all. This single change unblocks the
stalls in convergent failure 15 for three persona types.

### 5.3 Stage-by-stage changes that apply to everyone

| Stage | Change |
|---|---|
| 1 | `why` line 67, `s1-session` body line 87: swap the marriage noun. `s1-micro` filters micro-moves by `living`. Keep `onePulsed` solo-start exactly as is. |
| 2 | `s2-challenge` auto-completes on the challenge id regardless of which day variants were used. Copy states plainly that the week is self-paced (the engine already is, at `challenges.tsx:64`). |
| 3 | `s3-ritual` no longer hard-requires `state-of-union`; accept any adopted ritual from a small allowed set, and reword the ritual itself per 2.7. For `goal: "repair"` and the `high-conflict` situation, signpost stage 3 on the journey screen from day one so a couple whose problem is fighting can see their problem is on the map. Break signal and soft startup become reachable and encouraged from day one rather than sequenced; skills that stop damage are never gated behind a stage. |
| 4 | `s4-session-money` gets `applies` (money situation, `scarcity`, `money-crisis`, or self-selected). `s4-session-affection` gets `applies: (s) => s.type !== "co-parenting"`. Line 229 loses "Being wanted is the marriage." |
| 5 | Title per 5.4. `s5-stories` copy stays, once stories exist that could have been theirs. |

### 5.4 Per-type journey variants

| Type or goal | Stage 5 title | Notable step changes |
|---|---|---|
| default | "Build the one you're choosing now" | as written |
| `married`, `civil-partnership` | "Build the marriage you meant" (only when `bondWord === "marriage"`) | unchanged |
| `dating`, `engaged`, `goal: "decide"` | "Build the thing you're choosing" | Add a stage 5 step pointing at the `deciding` track and at the honest-outcomes paragraph (4.1 item 5). No badge, no score, no implied direction. |
| `partnered` | "Build the life you meant" | unchanged otherwise |
| `remarried` + `history: "reconciled"` | "Build the one you're choosing now" | Stage 1 adds the named-pattern step (write down the sequence that ended it, in your own words). Stage 4 heavy step points at `reconciliation`. |
| `co-parenting` | "Build the arrangement you meant" | Stage 4 becomes "Rebuild what the split broke": the handoff, the money, the story each of you tells about the ending, the thing your kid overheard. No desire step at all, not even a skippable one. Graduation copy: "The goal is two parents who don't need a referee." |
| `living: "long-distance" \| "apart-for-now"` | unchanged | Every session step offers the two-device mode. Micro-moves, rituals, and challenge days filter to apart variants. |

### 5.5 Pulse questions

Current five (`journey.ts:53-59`). Three are already universal and must not be touched. Two need
per-type treatment.

| # | Current | Ruling |
|---|---|---|
| 1 | "I felt heard by my partner this week." | Keep. Substitute `{partner}` only. |
| 2 | "We handled problems as teammates, not opponents." | Keep verbatim. Universal. |
| 3 | "There was real warmth or affection between us." | Keep for romantic types. For `co-parenting`: "We were civil with each other, even when it was hard." |
| 4 | "When something went wrong between us, we recovered." | Keep verbatim. Universal. |
| 5 | "I feel hopeful about where we're headed." | Keep for `goal: "build"` and `"repair"`. For `goal: "decide"`: "I feel like we're deciding this together, not pushing each other." Naming a direction in the metric is the app voting in their argument. For `co-parenting`: "Our kid did not have to manage us this week." |

Optional sixth statement, added by shape, never replacing any of the five:

- `history: "reconciled"`: "The old pattern showed up less this week." Two personas said the trend
  line on this one statement is the only number they actually care about.
- `living` is any apart value: "The distance felt survivable this week."
- `type: "co-parenting"`: "Handoffs went calmly."

Keep the 4-or-above graduation gate, keep `pulseConcern` pointing at real humans at 2 or below,
and keep the honest failure copy at `journey.tsx:240-247` word for word.

### 5.6 Two-device sessions (minimum viable)

`src/app/(tabs)/talk.tsx` assumes one room and one phone. Ship the smallest honest version first:

- A "We're on a call" toggle at session setup. Swaps line 316 to: "Get on video, or open Mend on
  both phones. One of you reads the prompts out loud."
- The speaker's phone drives the timer. The listener's phone shows the reflect script and the
  words "you are listening, that is the whole job."
- Each partner types their own check-in word, appreciation, and commitment from their own device,
  synced through the existing shared space.
- Replace "Partner A / Partner B" at line 324 with the two names already captured at onboarding.
- Rewrite the break copy at line 656 ("Twenty minutes apart... separate rooms") for a call: what
  taking the break looks like when hanging up already feels like leaving, and how to name the
  return time before you go.
- Ground rules for a call: what listening looks like when the only signal is a face on a screen,
  and what to do when the connection lags mid-sentence.

Full synced timers can follow. Do not block the release on them.

---

## 6. Delights to protect

Every item here was named unprompted by three or more personas as a reason they kept the app. These
are load-bearing. Treat any change to them as a regression until proven otherwise.

1. **The safety gate.** `onboarding.tsx:245-249`: "Is either of you afraid of the other?" followed
   by "Not 'do we fight.' Fights are why Mend exists. This is about violence, fear, or control,
   physical or otherwise." Symmetrical, no gender, no status, no victim named, no aggressor named.
   Six personas asked that not a word change. The only permitted edit is the additive control
   clause in 2.1. Do not move it, do not shorten it, do not put anything before it, do not put a
   paywall or a signup near it.
2. **The second door.** "I'm not sure, or I don't feel safe. Show me help," one tap, free, no
   account.
3. **`whyGateMatters`** (`safety.ts:67`). It explains why guided communication exercises can be
   actively dangerous under coercive control instead of just waving at a hotline. Change one word.
   Change nothing else.
4. **The pulse privacy decision** (`journey.tsx:144-148`) and its comment: the low-pulse support
   offer is deliberately not shown on the shared Journey screen because it would out whichever
   partner scored low. Named by six personas, twice as the single most thoughtful thing in the
   product. This is the governing precedent for every new shared surface.
5. **"Anyone may pass any card, no explanation owed."** In every deck's guidance in `cards.ts`.
   For a couple where one partner has a zone she is not ready to discuss, this is what makes the
   decks openable at all. It must appear in every new deck.
6. **Solo start.** `onboarding.tsx:294` "Starting alone? Put your partner's name in anyway," backed
   by `onePulsed` completing stage 1 alone. Every persona had one partner who would open it first,
   alone, at 11pm. Preserve through the expansion. Also fix the broken half of the promise:
   stages 2 through 5 hard-require both partners with no override and no explanation on screen.
   Say so at the names step and render an honest wall message with an invite offer.
7. **The names step.** "Your name" and "Your partner's name," first name only, no gender, no
   roles, no titles. `Profile` is `{ a, b }`. The expansion must not add a gender field.
8. **Honest graduation.** "The work is done. The numbers aren't, yet" and "That's not failure;
   it's information," with a pointer at a professional. An app that refuses to hand out a diploma
   it did not earn is why skeptical partners believe it about anything else.
9. **The seekHelp cards**, always visible, never gated, and the code comment at
   `tracks/[slug].tsx:102-103` telling future refactors not to trim them. That comment survives
   every refactor.
10. **First session of every track free** (`tracks/[slug].tsx:57-58`). Extends to every new track.
11. **The composite-story disclosure**, rendered persistently above the list at
    `stories.tsx:22-29`, and the file header stating every couple is invented. No fake
    testimonials anywhere.
12. **The pulse statements themselves** as universal writing (three of five need zero change).
13. **The guided session ground rules** in `talk.tsx`: "The floor is sacred," "Speak for
    yourself," "Listening isn't agreeing," "Both of your realities get to be true tonight."
14. **The Repair deck's flooding guardrail** and the rule that the person who was more hurt draws
    first and hands the card over.
15. **The Desire deck's consent frame**: "Answers are information, not requests you have to
    fulfill... never quote an answer back in an argument."
16. **The desire-gap track's refusal to assign a defective partner**: "This is a gap between two
    okay people, not proof that one is cold or the other is demanding." Four personas named this
    sentence as the template for how every new track should sound.
17. **The scarcity track's register**: "'Just budget better' is usually a lie told to people who
    already track every dollar."
18. **The caregiving track's refusal of the crisis-and-recovery shape** ("There is almost none for
    year six").
19. **The Hail Mary Week's honesty**: "Seven tiny days for when you're nearly done. A start, not a
    fix," and "Neutral is a real step up from hostile."
20. **The self-paced challenge counter** (`challenges.tsx:64` finds the first unfinished index
    rather than locking to calendar days). Possibly accidental, and it is the only reason a couple
    who sees each other three days a week can finish a challenge at all. Keep it and say so in the
    copy.
21. **The situation.ts architectural rule** in the file header: nothing is hidden that safety
    depends on, muting only reorders. Relationship type inherits this rule exactly.
22. **No account wall.** The invisible anonymous account minted at the gate. Do not trade it for
    signup metrics.
23. **The accessible starting point**: clearly explain what people can explore before Plus,
    without making permanent pricing or advertising promises.
24. **`pulseConcern`** pointing at real humans at an average of 2 or below rather than at more app
    content. This is the model for every judgment the app is tempted to make.
25. **The pricing screen's discipline**: "Money never gates safety," verified figures in
    `docs/PRICING.md`, cost stated as cost and never as clinical equivalence.

---

## 7. Build order

Each phase is shippable on its own and leaves the app better than it found it.

**Phase 1, the sweep (no new data model needed).** Section 2 edits that do not need `{bond}`:
every string that becomes "relationship," "the two of you," or "couples" unconditionally. The
onboarding hero. The home footer. The tracks index header. The safety strings. The stories `years`
field. The `situation.ts` chip relabels. The `new-baby` "she takes over" fix. The
`explore.tsx` safety-row extraction and stale subtitle. The `journey.tsx` manual-override render.
This alone removes the top three quit points for six of eight personas.

**Phase 2, the model.** `src/lib/relationship.ts`, the `Profile` extension, the onboarding step,
the `words()` helper, the migration card, and the settings editor. Then convert the `{bond}`
strings.

**Phase 3, filtering.** `contexts` tags on daily questions, deck cards, micro-moves, rituals, and
challenge days, plus `fitsShape`. Then write the apart-native content in 4.1 items 2 and 3.

**Phase 4, situations and journey.** New chips, two-selection picker, `applies` on steps,
`stagesFor`, `pulseQuestionsFor`, per-type stage 5 titles.

**Phase 5, tracks and stories.** Section 4.2 in rank order, section 4.1 item 1 alongside.

**Phase 6, sessions.** Two-device mode, the timezone fix in `space.ts` and `daily.ts`, the private
safety re-ask in the pulse flow.

Achievements are deliberately out of scope for this document beyond one constraint drawn from
every persona: **achievements must reward how a couple handled something, never what they
decided.** No streaks that break and shame, no duration badges that congratulate escalation, no
badge tied to a wedding, a move-in, an engagement, or a readiness score, no "days without an
argument" counter (it teaches couples to swallow things for the badge), and nothing surfaced on a
lock screen, in a notification, or in a share sheet by default.

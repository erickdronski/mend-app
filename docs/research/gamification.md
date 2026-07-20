# Gamification for Mend: evidence review and design rubric

Written 2026-07-19. All source URLs were fetched or searched on that date.

## Who this is for

Anyone adding a game-like mechanic to Mend: points, badges, streaks, progress
bars, celebrations, shared goals, milestones, rewards, nudges, anything that
turns effort into a visible signal.

Mend serves two people in a committed romantic relationship who are, by
definition, in a hard stretch. Some of them are in relationships that are
strained. A minority are in relationships that are unsafe. Every mechanic in
this document is judged against that population, not against a language-learning
app's population.

The current app already takes a deliberate position. `src/app/challenges.tsx`
says "No streaks, no tracking. Just one." and `src/app/(tabs)/index.tsx` is
commented "No stats, no streaks, just a greeting." This document explains why
that instinct is correct, where it can safely loosen, and where it must not.

---

## Part 1: what the evidence actually says

### 1.1 Gamification works, modestly, and mostly on the wrong outcome

The largest clean meta-analysis of gamification in learning found small
significant effects: cognitive learning outcomes g = 0.49 (95% CI 0.30 to 0.69,
k = 19, N = 1686), motivational g = 0.36 (95% CI 0.18 to 0.54, k = 16,
N = 2246), behavioral g = 0.25 (95% CI 0.04 to 0.46, k = 9, N = 951). The
authors note the cognitive effect held up in a subsplit of methodologically
rigorous studies, while the motivational and behavioral effects were less
stable.
Source: Sailer, M. & Homner, L. (2020), "The Gamification of Learning: a
Meta-analysis," Educational Psychology Review 32, 77-112.
https://link.springer.com/article/10.1007/s10648-019-09498-w (seen 2026-07-19)

Read that carefully. The most reliable effect is on **learning**, the least
reliable is on **behavior**. Mend's goal is behavior between two people. So the
honest prior is: gamification will probably help people absorb and remember the
material, and will probably do less than we hope for the actual relationship
work. Design accordingly. Gamify the *learning surface*, not the relationship.

Reviewers of digital mental health repeatedly describe an engagement-efficacy
gap: more app usage does not reliably translate into better therapeutic outcome.
A relationship app that optimizes for daily opens is optimizing for the wrong
number. Mend's own SPEC.md already says the goal is graduation, not engagement.
That commitment is the single most important guardrail in this document, and
every mechanic below is subordinate to it.

### 1.2 Streaks: the mechanism that helps is the same one that hurts

Streaks work through loss aversion. Once a streak is long, the felt cost of
breaking it exceeds the felt gain of extending it, so people keep going. That is
exactly why they are effective, and exactly why they become coercive: the
motivation quietly shifts from "I want to do this" to "I cannot afford to lose
this."

Practitioner analysis of streak systems names the failure mode directly: the
boundary between habit and compulsion is crossed when users act out of fear or
pressure rather than motivation, and long streaks make loss aversion the
dominant driver rather than the original goal. The same analysis names the three
standard repair mechanics: **streak freeze** (an intentional skip with no
penalty), **extra time** (a grace window past the deadline), and **decay**
(subtract a small amount instead of resetting to zero).
Source: Smashing Magazine, "Designing A Streak System: The UX And Psychology Of
Streaks" (February 2026).
https://www.smashingmagazine.com/2026/02/designing-streak-system-ux-psychology/
(seen 2026-07-19)

The all-or-nothing reset is the specific harm. A hard reset converts one missed
day into an identity statement ("I failed at this"), which is the classic setup
for abandonment rather than resumption. For a couple in crisis, "we broke our
streak" is not a neutral event. It is one more piece of evidence for the story
"we cannot do anything right together," and it is available to be said out loud
by the more critical partner.

Note on rigor: much of the streak-anxiety literature that circulates online is
practitioner writing and user testimony, not controlled trial. Do not cite hard
percentages about streak anxiety in the app or in marketing. The mechanism (loss
aversion) is well established; the magnitude in this population is not measured.

### 1.3 Variable rewards are ethically disqualified here

Variable ratio reinforcement, an unpredictable reward after a varying number of
actions, is the most powerful known driver of repetitive behavior and is the
core mechanic of slot machines. It sustains engagement through anticipation
rather than satisfaction. Reviews of digital product design describe it as the
mechanism behind compulsive social media use.
Sources:
- "Engineered highs: Reward variability and frequency as potential prerequisites
  of behavioural addiction," Addictive Behaviors.
  https://www.sciencedirect.com/science/article/pii/S0306460323000217
- "The Emotional Reinforcement Mechanism of and Phased Intervention Strategies
  for Social Media Addiction," PMC12108933.
  https://pmc.ncbi.nlm.nih.gov/articles/PMC12108933/
  (both seen 2026-07-19)

Why this is disqualifying for Mend specifically, beyond the general ethics:

1. It makes the reward schedule the reason to act. A person doing a repair
   exercise because they might get a surprise reward is doing the exercise for
   the app, not for their partner. The exercise only works if it is sincere.
2. It is non-consensual manipulation of a person who came to us in distress.
   The ethics review of gamified health apps lists cognitive manipulation and
   dependence as distinct named harms, and notes that app dependence rarely
   translates into a healthy lifestyle in the long run.
   Source: Arora, C. & Razavian, M. (2021), "Ethics of Gamification in Health
   and Fitness-Tracking," International Journal of Environmental Research and
   Public Health. https://pmc.ncbi.nlm.nih.gov/articles/PMC8583052/
   (seen 2026-07-19)
3. Mend's stated goal is graduation. Variable rewards are an anti-graduation
   technology. They exist to make leaving feel bad.

**Ruling: variable, randomized, or surprise-magnitude rewards are banned in
Mend. Full stop.** Predictable, earned, immediately-explained acknowledgement is
allowed. "You finished it" is fine. "You finished it, and here is a mystery
box" is not.

### 1.4 Rewards that feel controlling destroy the motivation we need

Self-determination theory distinguishes rewards that are experienced as
**informational** (they tell you something true about your competence, and
support intrinsic motivation) from rewards experienced as **controlling** (they
are the reason you acted, and they undermine autonomy and therefore intrinsic
motivation). Across gamification research, perceived autonomy is more strongly
tied to intrinsic motivation than perceived competence or relatedness.
Sources:
- Gamification and SDT meta-analysis, Educational Technology Research and
  Development. https://link.springer.com/article/10.1007/s11423-023-10337-7
- "Advancing Gamification Research and Practice with Three Underexplored Ideas
  in Self-Determination Theory," TechTrends.
  https://link.springer.com/article/10.1007/s11528-024-00968-9
  (both seen 2026-07-19)

For Mend this is close to a design law. If a partner can say "you only did the
appreciation exercise to get the badge," the badge has destroyed the exercise.
Every acknowledgement must be readable as *information about what you did*, and
never as *the payment for doing it*.

Practical test: would the acknowledgement still make sense if it appeared 24
hours later with no fanfare? If yes, it is informational. If the timing and the
animation are the point, it is a reward, and it is suspect.

### 1.5 Praise effort and process, never trait or outcome

Six experiments found that praising children for intelligence produced worse
achievement motivation than praising them for effort: after failure, the
intelligence-praised group showed less persistence, less enjoyment, more
low-ability attributions, and worse performance, and they described ability as
fixed rather than improvable.
Source: Mueller, C. M. & Dweck, C. S. (1998), "Praise for intelligence can
undermine children's motivation and performance," Journal of Personality and
Social Psychology 75(1), 33-52. https://pubmed.ncbi.nlm.nih.gov/9686450/
(seen 2026-07-19)

Translated to Mend, with the substitution that matters: **"good relationship" is
the trait praise.** Any message of the form "you two are doing great" or "strong
couple" is trait praise about a thing the couple cannot directly control, and it
sets up exactly the collapse Mueller and Dweck documented when the next bad week
arrives. It also creates a fall the app has no business creating.

The safe form is process: "you both showed up for this," "that was a hard one to
finish," "you did the listening exercise all the way through." True, specific,
about the action, survivable on a bad week.

### 1.6 Self-compassion outperforms self-criticism as a motivator

Four experiments found that induced self-compassion increased motivation to
improve after personal weakness, moral transgression, and poor test performance.
Source: Breines, J. G. & Chen, S. (2012), "Self-Compassion Increases
Self-Improvement Motivation," Personality and Social Psychology Bulletin.
https://journals.sagepub.com/doi/abs/10.1177/0146167212445599 and full text at
https://self-compassion.org/wp-content/uploads/publications/selfimp.motivation.pdf
(seen 2026-07-19)

A meta-analysis of 45 articles (total N = 13,558) found self-compassion
positively correlated with motivation (r = 0.25), with the effect on intrinsic
rather than extrinsic motivation.
Source: "Self-Compassion and Motivation for Self-Improvement: A Meta-Analysis,"
Research Square preprint (not yet peer reviewed at time of writing).
https://www.researchsquare.com/article/rs-9408192/v1 (seen 2026-07-19)
Flag: preprint. Use the Breines & Chen experiments as the load-bearing citation;
treat the meta-analytic r as supporting, not definitive.

This is the empirical warrant for the app's tone on a missed day. Guilt framing
is not the tough-love shortcut people assume it is. Warmth is the higher
performing option, and it is also the only option compatible with the app's
promise.

### 1.7 Competition and social comparison are the specific hazard

Competitive and comparative mechanics carry documented downside. In gamified
health management, the competitive element and interactivity of gamification
were positively associated with privacy invasion and social overload, which in
turn drove gamification exhaustion, and users' health condition moderated the
relationship, meaning the people in worse shape were hit harder.
Source: "Understanding the dark side of gamification health management: A stress
perspective," Information Processing and Management (2021).
https://www.sciencedirect.com/science/article/abs/pii/S0306457321001382
(seen 2026-07-19)

Classroom research finds leaderboards and competitive contexts can reduce
motivation, satisfaction, and empowerment relative to non-gamified conditions,
and that public display of poor performance is demotivating for those at the
bottom.
Source: "Assessing the effects of gamification in the classroom: A longitudinal
study on intrinsic motivation, social comparison, satisfaction, effort, and
academic performance," Computers and Education.
https://www.sciencedirect.com/science/article/abs/pii/S0360131514002000
(seen 2026-07-19)

Now apply this to a two-person "leaderboard." In a class of 30, being last is
anonymous-ish and temporary. In a couple, there are exactly two ranks, the
comparison is with the person you are trying to reconcile with, and the result
is permanent, personal, and quotable. **A two-person leaderboard is the worst
possible version of the worst-supported mechanic.** There is no configuration of
it that is safe.

### 1.8 Measuring a relationship changes the relationship

Danaher, Nyholm and Earp examined the ethics of applying self-tracking and
gamification to romantic relationships and catalogued the objections, concluding
that tracking can support good relationships but that the objections are
legitimate and need answering.
Source: Danaher, J., Nyholm, S. & Earp, B. D. (2018), "The Quantified
Relationship," The American Journal of Bioethics 18(2), 3-19.
https://www.tandfonline.com/doi/abs/10.1080/15265161.2017.1409823, open PDF at
https://web.ics.purdue.edu/~drkelly/DanaherNyholmetalTheQuantifiedRelationship2017.pdf
(seen 2026-07-19)

The deepest relevant finding is older. Clark and Mills distinguish **communal**
relationships, where benefits are given out of concern for the other person's
welfare, from **exchange** relationships, where benefits are given to incur or
repay obligation. People in exchange relationships keep track of individual
inputs into joint tasks; people in communal relationships do not, and instead
track the other person's needs.
Source: Clark, M. S. & Mills, J., "The communal/exchange distinction and some
implications for understanding justice in families," Social Justice Research,
and "Keeping Track of Needs in Communal and Exchange Relationships," both hosted
by the Clark Relationship Lab, Yale.
https://clarkrelationshiplab.yale.edu/sites/default/files/files/The%20communcal,%20exchange%20distinction%20and%20some%20implications%20for%20understanding%20justice%20in%20families.pdf
https://clarkrelationshiplab.yale.edu/sites/default/files/files/Keeping%20track%20of%20needs%20in%20communal%20and%20exchange%20relationships.pdf
(seen 2026-07-19)

This is the sharpest argument in the whole document. **Per-partner contribution
tracking does not just risk hurting feelings. It installs the exchange
orientation into a relationship that needs the communal one.** An app that shows
"you did 12 exercises, they did 5" is teaching couples to keep score, which is
the cognitive posture of the relationship form associated with obligation rather
than care. Building the ledger is not neutral instrumentation. It is an
intervention, and it points the wrong way.

### 1.9 Metrics become weapons in unsafe relationships

Technology-facilitated coercive control is a documented and growing pattern:
surveillance of digital activity, location tracking, reputational manipulation,
and weaponizing connected devices. Reviewers describe it not as an add-on to
intimate partner violence but as infrastructure through which coercive control
is enacted and sustained.
Source: "Technology-Facilitated Abuse in Intimate Relationships: A Scoping
Review." https://pubmed.ncbi.nlm.nih.gov/35537445/ (seen 2026-07-19)

Prevalence, stated carefully:

- **In 2019, 72% of women who accessed support from Refuge services identified
  experiencing tech abuse.** This is a service-user sample from a UK domestic
  abuse charity, not a general-population rate, and it must always be described
  that way.
  Source: Refuge, published 9 January 2020.
  https://refuge.org.uk/news/72-of-refuge-service-users-identify-experiencing-tech-abuse/
  (seen 2026-07-19)
- General-population lifetime prevalence: over 1 in 3 women (35.6%) and 1 in 4
  men (28.5%) have experienced rape, physical violence, and/or stalking by an
  intimate partner in their lifetime; 1 in 4 women (24.3%) and 1 in 7 men
  (13.8%) have experienced severe physical violence by an intimate partner.
  Attributed to Black et al., NISVS 2010 Summary Report, CDC.
  Source as read: The National Domestic Violence Hotline statistics page.
  https://www.thehotline.org/stakeholders/domestic-violence-statistics/
  (seen 2026-07-19)
  Verification note: I could not fetch cdc.gov directly on 2026-07-19 (HTTP 403).
  These figures are as reported by The Hotline citing the CDC report. Confirm
  against the CDC primary PDF before using either number in shipped copy.

The design consequence is concrete and non-negotiable. Any per-partner metric
Mend produces is potentially:

- a screenshot in an argument,
- a scoreboard a controlling partner uses to justify escalating demands,
- a record that can be pointed at as proof of who cares less,
- a compliance target enforced by the more powerful partner.

The app cannot tell which couples these are. Therefore **no per-partner metric
may exist in a form that one partner can show to the other as evidence.** This
is a structural rule, not a settings toggle, because a settings toggle can be
demanded.

---

## Part 2: the design rubric

### 2.0 The five governing principles

1. **Effort, not outcome.** Every acknowledgement describes something a person
   or a couple *did*. Never how the relationship *is*.
2. **Together, not against.** The unit of any shared metric is the pair. Never
   the individual, never a comparison.
3. **Nothing breaks.** No mechanic can be lost, reset, forfeited, or
   invalidated by a missed day, a bad week, or a pause.
4. **No metric may become evidence.** If one partner could screenshot it to win
   an argument, it does not ship.
5. **Graduation over engagement.** If a mechanic makes leaving the app feel like
   a loss, it is wrong for Mend regardless of its retention numbers.

Any proposal that fails one of these five is rejected. There is no override.

### 2.1 Allowed mechanics

Each entry: the mechanic, the rule that makes it safe, and a worked example.

---

**A1. Path progress (the Journey stage view)**

Rule: progress may be shown as position on a described path, never as a
percentage of a person and never with a projected completion date. Steps already
done are permanent. Steps ahead are described as content, not as debt.

Example copy: "Stage 2 of 5. Learn each other again. You have done three of the
things here." Not "60% complete" and not "2 steps behind schedule."

Why: informational feedback about competence supports intrinsic motivation
(1.4); percentages and schedules turn a path into an obligation. Progress
visualization is the single most-used mechanic in digital mental health, and
reviewers warn that showing a low-motivation user their lack of progress can
demotivate further, so the display must never emphasize the gap.

---

**A2. Cumulative counts that only go up**

Rule: any count in the app must be monotonic. Total conversations had. Total
cards drawn. Total weeks the two of you have been at this. Never a rate, never a
per-week average, never a "this week vs last week" delta.

Example: "You have had 14 real conversations in here." Never "You averaged 1.2
per week, down from 2.1."

Why: monotonic counts cannot deliver bad news, cannot break, and cannot be used
to argue that someone is slipping. Rates and deltas can do all three.

---

**A3. Effort acknowledgements (the replacement for badges)**

Rule: acknowledgements are earned by **showing up**, are awarded to the couple
or to the individual privately, are specific about the action, and never
reference relationship quality, difficulty tier, or rarity. No rarity, no
percentile, no "only 3% of couples earn this."

Approved shapes:
- "You finished the hardest session in the deck." (action, specific)
- "You came back after a break." (this one is important, see A6)
- "You two answered the daily question on the same day, ten times." (joint,
  factual)

Banned shapes:
- "Strong communicators." (trait, about the relationship)
- "Elite couple." (comparison, rarity)
- "Conflict master." (implies the conflict is solved)

Why: Mueller and Dweck (1.5). Also Arora and Razavian's "hermeneutic" concern
that apps reduce complex health to narrow metrics; a badge that claims to
certify relationship quality is a false measurement presented as fact.

---

**A4. Shared goals with joint credit only**

Rule: a goal may be set for the pair. Completion is binary and joint. The app
never reports who contributed what. If only one partner acted, the app reports
partial progress on the shared goal without attributing it.

Example: "Ritual: State of the Union, four weeks running. Week 3 done." Never
"Week 3 done, mostly by Sam."

Why: shared goals give the relatedness benefit without the exchange orientation
(1.8). The moment attribution appears, the ledger appears.

Design note: this rules out any "who did more" view, including a view a user
opts into for themselves, because there is no such thing as private opt-in on a
device another person can pick up.

---

**A5. Milestones tied to time and persistence, not performance**

Rule: milestones may mark elapsed involvement ("one month in"), completion of a
defined body of work ("you finished stage 3"), or returning. Milestones may
never mark improvement scores, pulse-check results, or streak length.

Why: milestones tied to time are unfalsifiable and unloseable. Milestones tied
to measured improvement create a fall when the next pulse dips, and dips are
normal and expected in repair work.

---

**A6. The return mechanic (Mend's signature, and the inverse of a streak)**

Rule: coming back after a gap is treated as an achievement in its own right,
with a warmer response than routine continuation gets. The gap itself is never
quantified in the UI.

Example on reopening after five weeks: "Welcome back. Nothing here expired. Do
you want to pick up where you left off, or start somewhere easy?" Never "It has
been 37 days since your last session."

Why: this converts the exact moment a streak app punishes into the moment Mend
rewards. It is directly supported by the self-compassion finding (1.6): warmth
after failure produces more self-improvement motivation than criticism does. It
is also the honest model of relationship repair, which is not linear.

---

**A7. Gentle, skippable, non-escalating invitations**

Rule: at most one proactive nudge per day, opt-in, never guilt-framed, never
referencing a lapse, never mentioning what the partner did or did not do, and
identical in tone whether the user has been active daily or absent for a month.

Approved: "Today's question is ready when you are."
Banned: "Your partner answered. You haven't." (This is coercion by proxy and
also fails principle 4.)
Banned: "Don't lose your progress."

Why: notification guilt is the delivery mechanism for most streak harm, and the
partner-comparison variant hands a coercive partner an automated ally.

---

**A8. Play that is genuinely play**

Rule: games in the Play surface may have scores, timers, and silly competition
**only when the outcome is meaningless and explicitly labeled as such**, and
only when the result is not stored, not trended, and not surfaced anywhere else
in the app.

Example: a guessing game where you find out how well you predicted your
partner's answers. Allowed to say "you got 4 of 6." Not allowed to store that,
chart it over time, or ever say "your score is falling."

Why: play is relationally valuable and the pretend-stakes of a game are
understood as pretend. The harm arrives when a game result is promoted to a
measurement. The rule is: a game score lives and dies in the session.

---

**A9. Private-by-default reflection with sealed reveal**

Rule: where both partners answer the same prompt, neither answer is visible
until both have answered (the existing answer-to-reveal behavior in Spaces). No
timing information is exposed: not "answered 3 hours ago," not "waiting on
them," not a read receipt.

Why: anchoring is the stated reason in SPEC.md and it is correct. The added
reason is safety: "waiting on them" is a pressure signal, and pressure signals
are the raw material of coercive control (1.9).

---

**A10. Celebration that is quiet and immediately explained**

Rule: celebration animation is allowed at completion moments, must be brief,
must be accompanied by plain text saying exactly what was completed, and must
never be randomized in size or intensity.

Why: predictable, informational, non-variable (1.3, 1.4). A confetti burst that
sometimes appears and sometimes does not is a variable reward wearing a party
hat.

---

### 2.2 Banned mechanics

Each entry: the mechanic, and the specific reason it cannot be redeemed by
tuning.

---

**B1. Breakable streaks**

Any counter that resets to zero on a missed day. Includes streak freezes, grace
periods, and decay models, all of which still make the *number* the thing you
can lose.

Not redeemable because: the mechanism of action is loss aversion (1.2). Softening
the reset softens the harm without removing it, and it still creates a number
one partner can accuse the other of breaking. If continuity must be shown, use
A2 (monotonic total) or A5 (elapsed time), which cannot be lost.

Permitted near-substitute: "You have shown up in 9 different weeks." Weeks
already banked never disappear. Missing a week costs nothing and removes
nothing.

---

**B2. Any leaderboard, ranking, or partner-vs-partner comparison**

Including: side-by-side activity counts, "who completed more," relative progress
bars, a partner's completion percentage, and any chart with two series labeled
by person.

Not redeemable because: 1.7 (comparison harm concentrates on the lower performer
and on the people already struggling) plus 1.8 (installs exchange orientation)
plus 1.9 (produces screenshot-able evidence). A two-person leaderboard is
maximally harmful, not minimally.

---

**B3. Variable, randomized, surprise, or mystery rewards**

Including loot boxes, spin-to-win, mystery unlocks, randomized bonus content,
and randomized celebration intensity.

Not redeemable because: it is the gambling schedule, it is non-consensual
manipulation of distressed users, and it is anti-graduation (1.3).

---

**B4. A relationship score, health score, compatibility score, or grade**

Any single number or letter purporting to represent how the relationship is
doing, displayed to either partner.

Not redeemable because: it is trait feedback (1.5), it is a false precision
about something we cannot measure, it will be quoted in arguments, and a low
score delivered to a couple in crisis is a harm the app inflicts for no
therapeutic gain. Pulse checks exist to route the couple to the next step and to
the professional-help card, and their results must stay in that role.

Related rule: **pulse-check results are never rendered as a trend line, never
compared between partners, and never shown as a number to the other partner.**
The app may use them internally to gate stages and to trigger the
professional-help card.

---

**B5. Per-partner contribution metrics in any form**

"You: 12. Them: 5." Activity feeds attributed by person with counts. "Your
partner has not opened the app in 8 days." Percentage-of-work splits.

Not redeemable because: 1.8 (it is the ledger, and the ledger is the wrong
relationship form) and 1.9 (it is the weapon). Note that this bans the metric
even when both partners consent, because consent obtained inside a coercive
relationship is not consent.

Exception, narrow: the app may tell **you** about **your own** activity in
non-comparative terms (A2). It may never tell you about your partner's, and it
may never tell your partner about yours.

---

**B6. Loss framing of any kind**

"Don't lose your progress." "You'll forfeit this if you don't finish by Sunday."
Expiring content. Countdown timers on exercises. Anything that decays if unused.

Not redeemable because: loss framing is the coercive half of loss aversion, and
in this population it lands on people who already feel they are losing something
far more important.

---

**B7. Guilt, shame, or disappointment in system voice**

Including sad-mascot patterns, "we missed you," "your relationship needs you,"
disappointed emoji, and any copy implying the app or the partner was let down.

Not redeemable because: 1.6 shows warmth outperforms criticism as a motivator,
and shame framing in a relationship-repair context can be repeated back by a
partner as "even the app says you're not trying."

---

**B8. Public or social anything**

Sharing achievements outside the couple, comparing to other couples, community
leaderboards, "couples like you completed X," aggregate percentile framing.

Not redeemable because: comparison to other relationships is a known driver of
dissatisfaction, it exposes a private crisis to a social surface, and it invites
performance of repair rather than repair. The one permitted comparative
statement is a normalizing one with no ranking attached, for example "most
couples find this stage the hard one," and only where it is true of the source
material we cite.

---

**B9. Gamifying anything safety-related**

No points for completing the safety screen. No badge for reading crisis
resources. No progress bar on the DV gate. No streak on conflict de-escalation.
No paywall, ever, on safety content.

Not redeemable because: turning a safety exit into a collectible creates a
reason to interact with it that has nothing to do with needing it, corrupts the
signal, and trivializes it. Safety content is presented plainly, always
available, never counted.

---

**B10. Engagement-optimized retention mechanics**

Daily login rewards, escalating streak bonuses, "come back tomorrow for X,"
session-length goals, and any metric in the product analytics that a mechanic is
explicitly tuned to raise.

Not redeemable because: it directly contradicts graduation (principle 5). Mend's
success metric is a couple that stops needing Mend.

---

### 2.3 Conditional mechanics (allowed only with the stated constraint)

| Mechanic | Allowed only if |
| --- | --- |
| Reminders | Opt-in, max one per day, tone-identical regardless of absence, never mentions the partner's activity, easy to turn off in one tap from the notification itself |
| Completion percentages | Applied to a **defined finite body of content** (a deck, a stage), never to a person, a week, or the relationship |
| Levels or tiers | Named for content difficulty, never for user quality, and never lost once reached |
| Charts over time | Only for monotonic totals (A2). Never for pulse scores, never per-partner, never with a trend line implying direction |
| Timers | Only inside an explicitly-labeled game (A8) or as a *maximum* on an exercise to keep it short, never as a deadline that forfeits anything |
| Scores | Only inside a session-scoped game whose result is never stored (A8) |
| Milestone emails or pushes | Only for A5-type milestones, and only if the same message would be fine to receive on the worst day of the couple's year |

---

### 2.4 Copy rules for every gamified surface

1. Address effort, name the specific action. "You finished the money-history
   session" beats "Nice work."
2. Never characterize the relationship. Not "you two are doing great," not "your
   relationship is improving," not "you're back on track."
3. Never reference the partner's activity or inactivity to the other partner.
4. Never use loss, deadline, or scarcity language.
5. Never use the word "score" outside a labeled game.
6. Assume the reader may be having the worst week of their life. Every string
   must be survivable in that state.
7. Inclusive by default: partner, relationship, the two of you, together. Never
   assume marriage, legal status, cohabitation, gender, children, or religion.
8. Keep "this is an educational tool, not therapy" framing intact wherever
   progress is displayed, so progress is never mistaken for clinical improvement.

### 2.5 The four tests every proposal must pass

Run these before writing code.

**The Screenshot Test.** Take the screen. Imagine the more critical partner
screenshots it and sends it during a fight. Does it help them make a case
against the other person? If yes, redesign.

**The Worst Week Test.** Imagine a user opens this screen the day after the
worst fight of their relationship, having not opened the app in six weeks. Does
the screen make it harder to come back? If yes, redesign.

**The Sincerity Test.** Could a partner plausibly say "you only did that for the
app"? If yes, the incentive is too visible. Make the acknowledgement quieter,
later, or informational.

**The Graduation Test.** If this mechanic works perfectly, does the couple need
the app more, or less? If more, cut it.

### 2.6 Implementation notes for this codebase

- The existing "No streaks, no tracking. Just one." line in
  `src/app/challenges.tsx` and the "No stats, no streaks" comment in
  `src/app/(tabs)/index.tsx` are correct and should be treated as load-bearing.
  Anyone adding a counter near them should read this document first.
- Journey step completion is already auto-detected from stored evidence. That is
  the right pattern: the app notices what happened rather than asking people to
  report performance. Extend this pattern rather than adding self-reported
  scoring.
- Pulse checks (`src/app/pulse.tsx`, `src/lib/journey.ts`) are a routing
  instrument, not a scoreboard. Keep them one-directional: in to the engine,
  never out to the other partner. The existing pulse-leak fix is a safety
  feature, not a privacy nicety.
- Couple Spaces state is shared by design. Every new field added to
  `mend_spaces`, `mend_space_members`, `mend_daily_answers`, or `mend_notes`
  should be checked against B5: if it is per-partner and countable, it is a
  ledger row, and it needs a reason strong enough to survive the Screenshot Test.
- Achievements, if built, belong in a couple-scoped store with no per-member
  attribution, so that the schema itself makes B5 unrepresentable.

---

## Part 3: what we do not know

Stated plainly, so nobody cites this document for more than it supports.

- There is no controlled trial, to my knowledge as of 2026-07-19, of gamification
  specifically in a couples-repair app. Everything above is transferred from
  adjacent literatures: learning, health and fitness tracking, digital mental
  health, and relationship science.
- Streak-anxiety magnitude in a relationship-repair population is unmeasured.
  The mechanism is well supported; the size is not. Do not publish numbers about
  it.
- Whether effort acknowledgements measurably improve completion in Mend is an
  empirical question we could answer with our own data later. Until we do, the
  rubric is a safety and ethics instrument, not a performance claim.
- Do not use any figure from this document in marketing without re-verifying it
  at the primary source on the day of use. The CDC figures in 1.9 in particular
  are second-hand and flagged as unverified at source.

---

## Sources

Empirical and scholarly:

- Sailer, M. & Homner, L. (2020). The Gamification of Learning: a Meta-analysis.
  Educational Psychology Review 32, 77-112.
  https://link.springer.com/article/10.1007/s10648-019-09498-w
- Mueller, C. M. & Dweck, C. S. (1998). Praise for intelligence can undermine
  children's motivation and performance. Journal of Personality and Social
  Psychology 75(1), 33-52. https://pubmed.ncbi.nlm.nih.gov/9686450/
- Breines, J. G. & Chen, S. (2012). Self-Compassion Increases Self-Improvement
  Motivation. Personality and Social Psychology Bulletin.
  https://journals.sagepub.com/doi/abs/10.1177/0146167212445599
- Arora, C. & Razavian, M. (2021). Ethics of Gamification in Health and
  Fitness-Tracking. IJERPH. https://pmc.ncbi.nlm.nih.gov/articles/PMC8583052/
- Danaher, J., Nyholm, S. & Earp, B. D. (2018). The Quantified Relationship.
  The American Journal of Bioethics 18(2), 3-19.
  https://www.tandfonline.com/doi/abs/10.1080/15265161.2017.1409823
- Clark, M. S. & Mills, J. The communal/exchange distinction and some
  implications for understanding justice in families; Keeping Track of Needs in
  Communal and Exchange Relationships. Clark Relationship Lab, Yale.
  https://clarkrelationshiplab.yale.edu/sites/default/files/files/The%20communcal,%20exchange%20distinction%20and%20some%20implications%20for%20understanding%20justice%20in%20families.pdf
- Understanding the dark side of gamification health management: A stress
  perspective. Information Processing and Management (2021).
  https://www.sciencedirect.com/science/article/abs/pii/S0306457321001382
- Assessing the effects of gamification in the classroom. Computers and
  Education. https://www.sciencedirect.com/science/article/abs/pii/S0360131514002000
- Gamification enhances student intrinsic motivation, perceptions of autonomy and
  relatedness. Educational Technology Research and Development.
  https://link.springer.com/article/10.1007/s11423-023-10337-7
- Advancing Gamification Research and Practice with Three Underexplored Ideas in
  Self-Determination Theory. TechTrends.
  https://link.springer.com/article/10.1007/s11528-024-00968-9
- Engineered highs: Reward variability and frequency as potential prerequisites
  of behavioural addiction. Addictive Behaviors.
  https://www.sciencedirect.com/science/article/pii/S0306460323000217
- Technology-Facilitated Abuse in Intimate Relationships: A Scoping Review.
  https://pubmed.ncbi.nlm.nih.gov/35537445/
- Gamification for health promotion: systematic review of behaviour change
  techniques in smartphone apps.
  https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5073629/

Prevalence and safety:

- Refuge (9 January 2020). 72% of Refuge service users identify experiencing
  tech abuse.
  https://refuge.org.uk/news/72-of-refuge-service-users-identify-experiencing-tech-abuse/
- The National Domestic Violence Hotline, Domestic Violence Statistics, citing
  Black et al., NISVS 2010 Summary Report, CDC.
  https://www.thehotline.org/stakeholders/domestic-violence-statistics/
- CDC, National Intimate Partner and Sexual Violence Survey.
  https://www.cdc.gov/nisvs/about/index.html (returned HTTP 403 to automated
  fetch on 2026-07-19; verify manually before citing)

Practitioner and design writing (useful, not empirical):

- Smashing Magazine (February 2026). Designing A Streak System: The UX And
  Psychology Of Streaks.
  https://www.smashingmagazine.com/2026/02/designing-streak-system-ux-psychology/
- SilverCloud Health. Design Ethics for Mental Health: How and Why We Avoid Dark
  Patterns.
  https://silvercloud.amwell.com/blog/2022/01/design-ethics-for-mental-health-how-and-why-we-avoid-dark-patterns

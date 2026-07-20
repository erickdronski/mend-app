# Inclusivity review: the relationship-expansion content

Reviewed 2026-07-20. Scope: the eleven new content files plus
`docs/RELATIONSHIP-EXPANSION.md` and `docs/ONBOARDING-V2.md`.

**36 issues found. 36 fixed in place.** Three of them (Q3, S2, R2) are structural
gaps where the copy fix closes the immediate harm and a real content item remains
on the backlog; those are marked **partial** and the remaining work is written
into the file headers so it cannot be quietly dropped.

A note on the starting point, because it matters for reading the list below: this
content is already unusually careful. `relationships.ts` refuses to infer a
marriage noun, `achievements.ts` bans comparison and streaks, `tracks-queer.ts`
treats outness as a risk calculation rather than a growth milestone, and
`ONBOARDING-V2.md` section 0.1 is one of the better never-ask lists I have read.
Almost nothing here is a failure of intent. What the list catches is the residue:
places where a default slipped through in an example, a resource list, a
frequency claim, or an ordering decision, and a handful of places where a group
is only ever discussed as a problem.

Findings are grouped by file. Severity is P1 (a reader in that group is told the
app is not for them, or is handed a resource that does not exist for them), P2
(a reader has to translate around the copy), P3 (register and consistency).

---

## `src/lib/content/tracks-early.ts`

### E1. "ordinary couples" makes cohabiting the norm and long distance the exception (P2)

**Category:** othering, assumed cohabitation.

**Was:**

> "You lose everything that holds **ordinary couples** together without either
> person trying: the shared silence, the accidental touch, the small repair that
> happens because you both ended up in the kitchen."

**Why it excludes:** This is the first paragraph of the long-distance track, so
the first thing a long-distance reader is told is that other couples are the
ordinary ones. The sentence is trying to name what distance removes and instead
names who counts as normal. The information is about kitchens, not about
ordinariness, so the word is doing no work except ranking.

**Now:**

> "What you lose is everything that holds a couple together for free when they
> share a kitchen: the shared silence, the accidental touch, the small repair
> that happens because you both ended up at the sink at the same time."

### E2. "the place you pay for" assumes the partner who moved in pays rent (P2)

**Category:** assumed financial comfort.

**Was:**

> "you find yourself asking permission to hang a picture in **the place you pay
> for**."

**Why it excludes:** People move into a partner's home for a lot of reasons, and
one of the common ones is that they could not carry a place alone: a student
year, a health problem, a job loss, leaving a bad living situation. The sentence
hands the reader a claim on the space that rests entirely on money, so the reader
with the least money gets the least standing exactly where the track is trying to
give them some.

**Now:**

> "you find yourself asking permission to hang a picture in the place you now
> live."

### E3. "What do each of us actually earn" assumes both partners earn a wage (P2)

**Category:** assumed financial comfort, assumed physical ability.

**Was:**

> "What do each of us actually earn, owe, and spend? Real numbers, said out loud,
> once."

**Why it excludes:** A couple where one partner is on disability benefits, is a
full-time carer, is between jobs, is studying, or cannot work has no honest way
to answer a question shaped like a payslip, and the shape of the question quietly
says a wage is what a person brings.

**Now:**

> "What money actually comes in for each of us, from wherever it comes in from,
> and what do we each owe and spend? Real numbers, said out loud, once."

Also extended the money principle above it, which previously stopped at "Unequal
incomes are ordinary and workable":

> "...and so is one of you having no wage at all: benefits, a student year, a
> health problem, and unpaid care are all real contributions to a household and
> none of them make someone a guest in it."

---

## `src/lib/content/tracks-queer.ts`

### Q1. December as the universal hard season (P2)

**Category:** Christian default, US and Northern-Hemisphere default.

**Was**, in three places:

> "no default plan for **the last week of December**"
> "What do we want **the December stretch** to look like, built by us instead of
> survived?"
> "**A December plan made in October**, built around what the two of you actually
> want"

**Why it excludes:** The chosen-family track is about being cut off from a family
of origin, which is not a Christian experience, and the family days that hurt are
Eid, Diwali, Rosh Hashanah, Lunar New Year, a birthday, a death anniversary, or a
December that is high summer where the reader lives. Naming one calendar as the
one that tests you tells everyone else this track was written past them.

**Now:** "nowhere to be on whatever the big family days are where you live" /
"Whatever the big family stretch is on our calendar, what do we want it to look
like, built by us instead of survived?" / "A plan for the hardest family stretch
of your year, made two months before it arrives".

### Q2. Crisis referrals are US-only and were not labeled as such (P1)

**Category:** US-centric.

**Was:** two `seekHelp` entries naming The Trevor Project, Trans Lifeline, and the
LGBT National Help Center as the starting points, with no geography attached.

**Why it excludes:** This is the highest-stakes copy in the file. It appears under
"your partner threatens to out you" and under "thoughts of ending your life." A
queer reader in Manchester, Manila, or Mexico City follows a dead link or an
unreachable number at the worst possible moment, and the most likely reading of
that failure is not "wrong country," it is "there is nothing for me."

**Now:** both entries keep the named services and add the geography plus a real
next step, for example:

> "Those particular lines may not reach you from outside the US, so if you are
> somewhere else, look for an LGBTQ+ helpline or a domestic violence service in
> your own country. There is almost always one, and using it is not an
> overreaction."

No new phone numbers or organizations were introduced, because I cannot verify
non-US crisis numbers from here and a wrong number in a `seekHelp` list is worse
than no number. **Open item for a human:** verify and add named international
LGBTQ+ and DV lines with source URLs and dates checked.

### Q3. All queer content in the product is content about being harmed (P1, partial)

**Category:** othering, framing a group's whole experience around suffering.

**What is wrong:** the file contains exactly two tracks. One is about the closet
and one is about families who are absent or hostile. Both are well written and
both are organized around pressure from outside. Taken together they say that
queer relationships appear in this app when something is being done to them, and
that a queer couple whose actual problem is money, or desire, or the dishes has to
read themselves into a track written for a straight couple. The chosen-family
track compounded it by ending on a session called "The grief that comes back," so
the last thing the reader does in the file is grieve.

**Fixed now, in three edits:**

1. A new principle in `chosen-family`, so the practice is named as a tradition
   rather than a substitute:

   > "Chosen family is a tradition, not a consolation prize. Queer people have
   > been building kinship out of friends, exes, elders, and neighbors for a very
   > long time, and the version you are making is a real family with its own
   > history behind it, not a patch over the one you did not get."

2. The final session is retitled "The grief, and what you built anyway" and its
   focus now gives the second half equal time, "because a life that gets
   discussed only as a wound stops being visible to the people living it," with a
   new closing prompt: "What is good about this life that has nothing to do with
   what it cost to get here?"

3. A voice rule and a named backlog item in the file header, so the next author
   does not add a third suffering-shaped track.

**Still open:** a queer track with no hostility in it. The header now says so
explicitly and forbids adding another harm-shaped track before it exists.

---

## `src/lib/content/tracks-difference.ts`

### D1. "The real problem in most of these relationships" (P2)

**Category:** explaining a group to itself, unsourced frequency claim.

**Was:**

> "**The real problem in most of these relationships** is not the wiring but the
> translation"

**Why it excludes:** It is an unsourced statistical claim in a file with no
citations, and it is delivered to neurodivergent readers as a verdict on what is
really wrong with their relationships. The track's own subject is that ND people
spend their lives being told what their problem actually is.

**Now:** "What tends to break first here is not the wiring, it is the translation
between two ways of processing".

### D2. The user-manual session makes writing the only accommodation (P2)

**Category:** assumed physical ability, assumed literacy.

**Was:**

> "Each of you writes your own manual, separately and **in writing**, then
> trades. **Written and asynchronous on purpose: this is the accommodation**, not
> a workaround."

**Why it excludes:** The session correctly identifies asynchrony as the
accommodation and then hard-codes one output format. Dysgraphia, dyslexia,
aphasia, a hand tremor, low literacy, and writing in a second language are all
common in exactly this readership, and a person who cannot easily write is told
the accommodation is the thing they cannot do. The prompt list made it worse by
asking which questions the reader answers "much better in writing."

**Now:**

> "Each of you makes your own manual, separately and on your own, then trades.
> Asynchronous is the point: this is the accommodation, not a workaround. Writing
> suits some people and is a barrier for others, so a voice memo, a list of
> bullet points, or a recording made while walking all count the same."

Prompt updated to "much better with time and a keyboard or a recorder."

### D3. "it is worth the wait for an appointment" assumes assessment is reachable (P1)

**Category:** assumed financial comfort, US-centric, delegitimizes
self-identification.

**Was:**

> "You suspect ADHD or autism in yourself or your partner and have never been
> assessed. A real evaluation changes the conversation more than any exercise
> here, and **it is worth the wait for an appointment**."

**Why it excludes:** For most adults this is not a wait, it is a closed door.
Public adult assessment routes commonly run to years and private routes cost more
than the reader has, and this sits in `seekHelp`, the one place the app promises
is always free and always reachable. Worse, "a real evaluation" implicitly rules
self-identified ND readers out of their own track, and hands a dismissive partner
the line "you do not actually have a diagnosis."

**Now:** the entry keeps the referral, adds the honest caveat about cost and
waiting lists, and closes the door on the partner using it as a weapon:

> "...if that door is shut for now, nothing in this track depends on a diagnosis.
> Recognising yourself is enough to start, and a partner who dismisses that
> because there is no paperwork is the actual problem in the room."

### D4. "If we have or already have children" (P2)

**Category:** assumed children.

**Was:**

> "If we have or already have children, what do we want them to be fluent in..."

**Why it excludes:** Garbled, and in the garble it presumes children are on the
table for every intercultural couple. A child-free couple, an infertile couple, or
a couple past that decision gets a question with no answer in the middle of the
track's build session.

**Now:**

> "If children are part of this, now or one day, what would we want them fluent
> in, and what would it take to make that real? If children are not part of this,
> what do we want to pass on anyway, and to whom?"

### D5. "In practice the pain usually comes from..." in the non-monogamy overview (P3)

**Category:** unsourced frequency claim about a specific group.

**Was:** "In practice the pain usually comes from an agreement that stopped
fitting and never got revised."

**Why it excludes:** The paragraph around it is doing exactly the right thing,
refusing to treat CNM as the problem. Then it makes a confident empirical claim
about where non-monogamous people's pain comes from, with no source, which is the
same move it just asked the reader's community not to make about them.

**Now:** "When it hurts, the thing to check first is an agreement that stopped
fitting and never got revised, not the shape of the relationship itself."

---

## `src/lib/content/tracks-repair.ts`

### R1. "a specific kind of crazy-making" (P2)

**Category:** assumed neurotypicality, casual psychiatric slur.

**Was:**

> "Being told nothing happened when your whole body says something did is a
> specific kind of **crazy-making**."

**Why it excludes:** The word is colloquial, and it is also the word used about
people with mental illness, in an app whose `seekHelp` lists route readers to
psychiatric care. It borrows madness as a metaphor for distress in front of
readers for whom it is a diagnosis. The sentence also does not need it: the actual
idea is that the reader's senses are being overruled, which is more precise.

**Now:**

> "...is a specific kind of unmooring: your senses are certain and you are being
> told to file them as nonsense."

---

## `src/lib/content/tracks-season.ts`

### S1. "Menopause, andropause" writes the couple as one man and one woman (P1)

**Category:** assumed heterosexuality, gendered role assumption.

**Was:**

> "Bodies changed while you were busy. **Menopause, andropause**, medication,
> sleep, and years of low privacy all leave a mark."

**Why it excludes:** Pairing those two terms describes exactly one couple: a
cisgender woman and a cisgender man. Two women, two men, and any couple with a
trans partner are told, inside the one principle about their bodies, that the
track was written about somebody else. "Andropause" is also a contested term for a
gradual change, so it is a weak claim as well as an exclusionary one, and this is
an app that does not ship unverified clinical claims.

**Now:**

> "Bodies changed while you were busy, in whatever way your two bodies change.
> Hormones, menopause, surgery, medication, pain, sleep, and years of low privacy
> all leave a mark."

### S2. US-only crisis and support referrals with no marker (P1)

**Category:** US-centric.

**Was:** five `seekHelp` entries across all three tracks in this file naming 988,
the National Domestic Violence Hotline, and Military OneSource with no country
attached. (A parallel safety pass had already labeled some entries in the sibling
track files, which made the unlabeled ones here inconsistent as well as wrong.)

**Why it excludes:** 988 reaches nothing outside the US. A reader in crisis in
another country is given a number that fails, in the four entries that matter
most: active relapse, suicidal thinking after time clean, suicidal thinking after
deployment, and abuse discovered late in life.

**Now:** every one of the five is marked and given a real alternative, for
example:

> "In the US, call or text 988 now, not later; elsewhere, call your local
> emergency number or a suicide helpline in your country."

> "In the US, Military OneSource offers free, confidential non-medical counseling
> to service members and families; most other forces run an equivalent
> confidential service for families..."

Again, no unverified international numbers were added. **Open item for a human,
same as Q2:** verified international crisis numbers with sources and dates.

---

## `src/lib/content/cards-rel.ts`

### C1. "a body count" (P3)

**Category:** register that assumes one kind of reader.

**Was:** "Nothing here asks for a confession or **a body count**."

**Why it excludes:** The deck is doing the right thing by naming what it will not
ask, but the phrase is locker-room slang for a tally of sexual partners, and it
carries the young hookup-culture register into a deck that is also for a widowed
person dating again at fifty and for a reader whose faith or history makes that
joke land badly. The promise is good; the wording narrows who it is addressed to.

**Now:** "Nothing here asks for a confession, a tally of who came before, or a
status you have not agreed on."

### C2. The Distance deck assumes a voice or video call is the channel (P1)

**Category:** assumed physical ability, assumed technology access.

**Was:**

> "Pick a call where neither of you is about to fall asleep... **being on video**
> makes it easy to talk over each other... **Describing things out loud** is the
> whole point here."

**Why it excludes:** The deck's own description names deployments, shifts, and
different countries, and then its guidance assumes synchronous audio or video.
That is not the channel available to a Deaf couple, a couple where one partner is
incarcerated, a couple on restricted deployment comms, or a couple on bandwidth
that will not hold a video call. Told that talking out loud is "the whole point,"
they conclude the deck is not usable by them, in the deck written specifically for
their situation.

**Now:**

> "Use whatever channel you actually have. On a call, pick one where neither of
> you is about to fall asleep... If your channel is text, sign, voice notes, or
> letters, take one card a day instead of a stack in one sitting; the deck works
> fine at that speed and answering in your own time is not a lesser version of
> it. Detail is the whole point here..."

---

## `src/lib/content/challenges-rel.ts`

### H1. Low Spoons requires a shared home on three of its seven days (P1)

**Category:** assumed cohabitation.

**Was:** day 3 ("a hand on their back... sit in the same room"), day 4 ("refill
the water bottle, put the trash out, set out the pills"), day 5 ("the pillow, the
car seat, the counter by the coffee").

**Why it excludes:** This is the challenge for illness, disability, chronic pain,
caregiving, and shift work, and its own `forWhom` names "opposite shifts that mean
you barely overlap." Three of the seven days then need the two of them under one
roof on the same evening. The reader most likely to be running on empty and living
apart, or awake at opposite ends of the day, fails almost half the week and is
given no alternative.

**Now:** each of the three days keeps its original action and gains an apart
variant in the same sentence, for example day 3:

> "If you are not in the same place tonight, sit on an open line for a minute
> without talking, or play the same song at the same time."

and day 4 adds "make the phone call they have been dreading, find the opening
hours, order the thing, send the form already filled in."

### H2. The Clean Fight's worked example assumes a shared kitchen (P2)

**Category:** assumed cohabitation.

**Was:** the only model sentence for a softened startup was "I felt swamped when
the kitchen was left last night. Could we split it tonight?"

**Why it excludes:** The challenge is explicitly for any couple who fight badly,
and the single example a reader will copy is only available to couples who share a
sink. A dating couple in two apartments has to invent the translation themselves,
on the day the task is "practise this on something small."

**Now:** two examples, one for each case, with the non-cohabiting one being a
moved plan rather than a chore, plus "The dishes or the calendar, not the
relationship."

### H3. Seven Calls day 6 requires postage and a purchase (P2)

**Category:** assumed financial comfort.

**Was:** "Put one physical thing **in the mail or in a delivery**... It does not
need to be clever or expensive."

**Why it excludes:** The hedge covers the gift and not the postage, and
international postage between two countries is the case this challenge is most
often read in. A couple with no spare money, or with a border and a customs form
between them, gets a day they cannot do.

**Now:** the task keeps posting as the first option and adds a zero-cost path
("a playlist, a photo of a note in your handwriting, a voice memo they can save, a
drawing that is objectively bad") plus the flat statement "Cost is not the
variable here." The `why` moved from "something they can hold" to "something they
can keep."

### H4. Seven Calls day 3 offers only a call or video (P2)

**Category:** assumed physical ability, assumed technology access. Same underlying
problem as C2.

**Was:** "Call or video for ten minutes with a rule..."

**Now:** "Take ten minutes on whatever channel you have, call, video, sign, or a
back-and-forth of voice notes, with one rule..."

---

## `src/lib/content/stories-rel.ts`

### S3. The only queer couple in the set is the one filed under the closet (P1)

**Category:** othering.

**What was wrong:** eight new stories. Seven read as different-gender couples. The
eighth, Wren and Marisol, is the outness story. So across the whole new story
library, a same-gender couple appears exactly once, and the thing that makes their
story a story is being queer. Meanwhile the ordinary problems, distance,
reconciliation, ADHD and autism, in-laws, recovery, all go to straight couples by
default. The message is not hostile and it is unmistakable: queer people turn up
in this app when there is a problem with being queer.

**Fixed:** the long-distance couple, Ife and Marcus, are now two men. Nothing else
in the story changed. Their problem is still a nightly call that turned into a
shift they clock into, and the story never mentions that they are two men, because
mentioning it would make it the point again. Three pronouns and one clause moved.

Also added a representation rule to the file header so it survives the next
author:

> "A queer couple must appear in stories that are not about being queer. If the
> only same-gender couple in the set is the one filed under the closet, the app
> has said that queer people show up when there is a problem with being queer and
> otherwise do not exist."

### S4. No disabled partner, no non-monogamous couple, no trans partner (P2, partial)

**Category:** representation gap.

**What is wrong:** across all eight new composites, nobody is disabled or
chronically ill, no couple is consensually non-monogamous, and no partner is
trans. The jealousy track speaks directly to non-monogamous readers and then no
story shows them. The `illness` and `caregiving` tracks exist and no new story
carries a disabled partner whose disability is not the plot.

**Fixed now:** the gap is written into the file header as a named backlog item,
with the instruction that fills it correctly: "Write those as ordinary stories
about ordinary problems, not as case studies."

**Still open:** three stories. This is a content task, not a copy edit, and
inventing them inside a review pass would produce worse writing than the eight
that are there.

---

## `src/lib/content/daily-rel.ts`

### Y1. "no plans and no phones" is impossible for the couples the file claims to serve (P1)

**Category:** assumed cohabitation.

**Was:**

> "If you had one extra hour together today, **no plans and no phones**, how would
> you want to spend it?"

**Why it excludes:** The file header says these questions are for "people who live
a thousand miles apart." For those people the phone is not a distraction from the
relationship, it is the relationship's only channel, so the question asks them to
imagine an hour together by removing the only way they can have one. Both partners
hit this on the same day, which breaks the shared ritual for the pair at once.

**Now:** "If the two of you got one extra hour today with nothing else claiming
it, how would you want to spend it?"

### Y2. "printed and hung" assumes it is safe to display a photo of the couple (P1)

**Category:** assumed heterosexuality, safety.

**Was:**

> "What is a photo of the two of you that you would want **printed and hung**
> where you would see it every day?"

**Why it excludes:** The app has a whole track on the fact that "whose photo is on
the desk" is the fight. For a couple where one partner is not out, or who live with
family, or who share a home with a hostile relative, a displayed photo is the
exact risk they are managing, and a daily question that assumes it is trivial
lands as a small daily reminder that the app has not understood their life.

**Now:** "What is a photo of the two of you that you would want somewhere you
would see it every day?"

### Y3. The header claims co-parents are served and the pool cannot serve them (P1)

**Category:** contract defect with an exclusion consequence.

**Was:** the header said these questions are "meant to work for... people who
share kids and not much else right now," while every one of the sixty questions
says "your partner" and the pool contains a `desire` category asking when the
reader last felt "pulled toward" the other person.

**Why it excludes:** `relationships.ts` already provides `isRomantic()` and
`frameFor()` for exactly this, and `DailyQuestion` still has no `contexts` field
(see `RELATIONSHIP-EXPANSION.md` section 3.7). So the header promises a filter
that does not exist. Shipped as written, a separated co-parenting pair gets asked
about desire for their co-parent, which is the single worst thing this app could
say to them, and it says it inside a ritual designed so they both see it.

**Now:** the false claim is removed from the header and replaced with the two
filters this pool depends on, written as a blocking note:

> "Route the pool through `isRomantic()` in relationships.ts and drop the
> `desire` category entirely for `coparenting`... Until that exists, this file is
> not safe to show a co-parent, whatever the old header claimed."

---

## `src/lib/content/achievements.ts`

### A1. "Desire, Out Loud" is permanently unearnable for co-parents (P1)

**Category:** structural exclusion, contradicts the file's own rule 9.

**What was wrong:** the `Achievement` type has `solo` but nothing that lets a
non-romantic pair be excluded from a romantic entry. `desire-out-loud` ("You both
finished the session on affection and desire") therefore renders in the list for a
separated co-parenting pair, permanently unearned, forever. The file's own header
rule 4 says "Nothing shames absence" and rule 9 says never assume the shape of the
relationship, and this entry breaks both: it is a locked badge whose lock is the
fact that the reader is not in a romance.

**Now:** an optional `romanticOnly?: boolean` was added to the `Achievement` type
with the reasoning in a doc comment, set to `true` on `desire-out-loud`, and rule
9 in the header was extended:

> "This also means never rendering an entry the reader's relationship makes
> impossible: filter on `romanticOnly` before display, or a co-parenting pair
> carries a dead romance badge in their list forever."

Optional field, so no existing entry or call site changes.

---

## `src/lib/content/relationships.ts`

### R2. The model is dyad-only and never says so (P2, partial)

**Category:** assumed monogamy, honesty about a limit.

**What is wrong:** every type, every noun, and the shared-space design assume two
people. That is a legitimate product decision. What was wrong is that it was
silent, in a file whose header otherwise states every rule it lives by, while the
app's own jealousy track and agreements content speak directly to polyamorous
readers. Silence leaves the next author free to "fix" it by treating non-monogamy
as an edge case or a risk factor.

**Fixed now:** the limit is stated in the header, along with what it does not
license:

> "That is a real product limit, not a statement that other shapes are less
> committed, and it must not leak into the copy: nothing in this file or
> downstream of it may assume exclusivity, describe an open relationship as a
> risk factor, or offer a polyamorous reader a 'yet'."

**Still open:** multi-partner support, if it is ever wanted. Out of scope here.

### R3. "Where the two of you sleep most nights" (P2)

**Category:** assumed shared bed, assumed physical ability, tone toward
co-parents.

**Was:** the `LivingSituation` doc comment framed the field as where the couple
sleeps, and `RELATIONSHIP-EXPANSION.md` section 3.4 shipped it as the literal
onboarding question.

**Why it excludes:** three ways at once. It is an oddly intimate question to put
to a separated co-parenting pair in an onboarding flow. It returns a confusing
answer from the many couples who share a home and not a bed, for shift work, pain,
a CPAP, a snorer, or a baby, and some of those readers will answer "apart" and get
the entire long-distance content set. And it is not what the field is for: the
field decides whether content may assume one front door.

**Now:** the comment reframes it as "Where each of you lives most of the time"
with the reasoning attached, and the spec question is retitled (see X6).

---

## `docs/ONBOARDING-V2.md`

### X1. `same-sex-couple`: "We're a same-sex couple" (P1)

**Category:** binary sex framing, othering.

**Was:**

| id | chip | what it changes |
| --- | --- | --- |
| `same-sex-couple` | We're a same-sex couple | stops opposite-sex defaults in examples and stories |

**Why it excludes:** two separate problems in one row. The label is a statement
about two sexes, so a nonbinary partner cannot answer it truthfully and many trans
people are forced to pick a framing of their own relationship they do not use. And
the effect column names the straight couple as the default the app is actually
built around, so the chip reads as "correct our assumption about you" rather than
"here is who we are." That is the exact move section 0.1 of this same document
forbids everywhere else.

**Now:**

| id | chip | what it changes |
| --- | --- | --- |
| `queer-couple` | We're a queer couple | examples and stories stop reaching for a man and a woman by default |

Renamed in the `ContextTag` union in section 2.1 as well.

### X2. `faith` and `different-faiths` assume both partners have a faith (P2)

**Category:** religious default.

**Was:** screen 6 chip "Two faiths, one family"; screen 8 chip "We come from
different faiths or cultures."

**Why it excludes:** the most common shape of this conflict is a religious partner
and a partner who is not religious at all, plus the couple where one has left the
faith they were raised in. "Two faiths" hands both of those readers a chip that
describes somebody else, and a secular partner reading it concludes the faith
content is for interfaith couples rather than for them.

**Now:** `faith` chip becomes "We believe different things"; screen 8 becomes
`different-beliefs`, "Faith or belief is a line between us." The existing
`planPhrase` ("loving across a line of belief") was already right and is unchanged.

### X3. The ND label row offers two names and "Neither" (P1)

**Category:** assumed neurotypicality, othering.

**Was:**

```
[ I'm autistic ]  [ I have ADHD ]  [ Neither ]  [ Rather not say ]
```

**Why it excludes:** two doors and an exit. Dyslexia, dyspraxia, Tourette's, OCD,
bipolar, an acquired brain injury, long COVID brain fog, and the very large group
who are certain and undiagnosed all have to press "Neither," which is not true, or
"Rather not say," which is a refusal they did not mean. On a sheet whose header
promises "no score, no label, no result," the answer set itself is the label, and
it is one most neurodivergent people do not fit.

**Now:**

```
[ I'm autistic ]  [ I have ADHD ]  [ Something else ]
[ Neither of those ]  [ Rather not say ]
```

with a free-text field, an added `"other"` member on `NdLabel`, a new
`ndLabelOther` field on `Profile`, the field added to both local-only exclusion
lists in sections 2.2 and 5.3, and the reasoning written into the spec:

> "a person whose only options are two names that are not theirs plus the word
> 'Neither' has been told the app does not think they exist."

### X4. Section 6.2 defaults `dating` and `engaged` to gendered nouns (P1)

**Category:** gendered role assumption; contradicts this document's own section
0.1 and section 1.5.

**Was:** the per-type table set `{partnerWord}` default to "boyfriend / girlfriend"
for `dating` and "fiancé / fiancée" for `engaged`.

**Why it excludes:** section 0.1 forbids asking gender and section 1.5 preselects
the ungendered "Partner." Section 6.2 then derives a gendered noun from the
relationship type, which is a guess about two people's genders made from a field
that carries no gender information. A dating couple who are two women, or a couple
with a nonbinary partner, would be called "boyfriend / girlfriend" by the app
before their first session, which is precisely the screen-four uninstall this
document was written to prevent.

**Now:** both default to `partner`, with a rule added under the table:

> "**No `{partnerWord}` default is ever gendered.** ...Those words are all offered
> on screen 5 row 2 and are correct the moment a user picks one; derived from a
> relationship type they are a guess about two people's genders."

### X5. "the kind couples pay hundreds a session for" (P2)

**Category:** assumed financial comfort, US-centric, unsourced claim.

**Was:** screen 2, "The structure and language of real counseling frameworks, the
kind couples pay hundreds a session for. Staged, guided, free."

**Why it excludes:** three problems. It is an unsourced price claim in a product
whose own rules require a source URL and a date for any number. It is a single
implied currency on a screen shipped in five languages. And as persuasion it opens
by telling a reader who cannot afford counseling exactly how much the thing they
cannot afford costs, which lands as a reminder of what they are priced out of
rather than as a gift.

**Now:** the clause is cut, and a note under the screen says why and where a
verified anchor belongs instead (`docs/PRICING.md`, with a source and a date).

---

## `docs/RELATIONSHIP-EXPANSION.md`

### X6. "Where do you two sleep most nights?" as a shipped onboarding question (P2)

Same defect as R3, in the spec that a developer would build from. Retitled to "How
do your weeks work?", matching `ONBOARDING-V2.md` section 1.5 row 3, with the
reasoning attached so the earlier wording does not come back.

### X7. "Are there kids in the picture?" asked of everyone in the main flow (P1)

**Category:** assumed children; also a direct contradiction between the two specs.

**Was:** section 3.4 lists "Are there kids in the picture?" as a main-flow
onboarding question, with "one on the way" among the options. `ONBOARDING-V2.md`
section 1.8 says the opposite: children are asked about only as an opt-in chip on
an optional, one-tap-skippable screen, and "A couple with no children is never
asked 'do you have kids'."

**Why it excludes:** whichever spec a developer follows decides what happens to a
couple who cannot have children, a couple in treatment, and above all the couples
the app's own `loss` chip and pregnancy-loss track exist for. A required question
in the main flow, with "one on the way" as a tappable option, is put in front of
someone who miscarried three weeks ago on the way to asking for help.

**Now:** the row is struck through in section 3.4 and marked superseded, pointing
at `ONBOARDING-V2.md` section 1.8 as binding, with the reasoning and the
instruction to keep `KidsContext` as the stored shape and populate it from 1.8.

### X8. "'same-sex couple' as an opt-in chip" in the never-ask list (P2)

Same defect as X1, in the document that argues for it. Section 3.5 now says "We're
a queer couple" and spells out why "same-sex" and "stops opposite-sex defaults"
are both wrong, so the reasoning travels with the fix.

---

## Adjacent findings, not counted and not changed

These are outside inclusivity and belong to the fact-check pass. I did not edit
them, because changing an attribution without a verifiable source would be worse
than leaving it.

1. **`tracks-difference.ts`, the double empathy problem.** "Researchers call this
   the double empathy problem" is a research attribution with no citation, in a
   repo where `achievements.ts` cites Lally et al. and Mueller and Dweck with URLs
   and `tracks-early.ts` names Stanley, Rhoades and Markman. The concept is
   normally credited to Damian Milton. Verify and cite, or drop the attribution.
2. **Two different `RelationshipType` unions exist.** `relationships.ts` ships
   `dating | engaged | partnered | married | remarried | reconciling |
   coparenting | civilPartnership | unlabeled`. `ONBOARDING-V2.md` section 2.1
   ships `together | married | dating | partnered | engaged | civil-partnership |
   separated-coparenting | separated-untangling | no-word | self-described`.
   `RELATIONSHIP-EXPANSION.md` section 3.1 ships a third. `reconciling` and
   `remarried` exist in the code and in neither spec union; `together` and
   `separated-untangling` exist in the spec and not in the code. This will silently
   drop a relationship type at implementation time. Reconcile before building
   task 44.
3. **`not-out` is used as an id twice** in `ONBOARDING-V2.md`, once as a screen 6
   `Situation` and once as a screen 8 `ContextTag`. Different unions, so it
   compiles, but it will confuse anything that logs or reads tags generically.

---

## What was checked and found clean

Worth recording, so a later pass does not redo it: the safety gate copy and its
standing rules; `SAFETY_FRAME` and the rule that safety copy never personalizes;
the pulse-privacy decision; "anyone may pass any card, no explanation owed" in
every new deck; the composite-fiction disclosure on the stories; the ordering of
the relationship-type picker as a flat list with no ladder and no "yet"; the
absence of any gender field anywhere in the model; `isRomantic()` and `isApart()`
existing at all; the "no readiness score, no verdict" guardrails in
`tracks-early.ts`; the from-inside voice of the outness and jealousy `feelings`
blocks, which are the best writing in the new content and were not touched.

No safety copy, crisis resource, red flag, domestic-violence gate wording, or
"educational tool, not therapy" framing was weakened, shortened, reordered, or
moved behind anything by any edit in this pass. Every change to a `seekHelp` entry
added reach; none removed a resource.

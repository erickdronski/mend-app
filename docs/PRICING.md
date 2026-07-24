# Mend pricing: the numbers, the arithmetic, and the exact words we may use

Rewritten 2026-07-20, after `docs/review/honesty-review.md`. That review supersedes
every figure it corrects, and this document has been rebuilt around its rulings.
`docs/MONETIZATION.md` still owns the free/Plus split and the philosophy. This
document owns the prices, the comparisons, the public copy, and the go-live
checklist.

**The prices are decided.** Mend Plus is **$9.99 a month** or **$99 a year**.
Stripe is already wired with exactly those two prices, and
`src/lib/premium.tsx` already renders them. Nothing in this document proposes a
different number.

**Sourcing rule.** Every figure here traces to `docs/research/counseling-prices.md`
or `docs/research/competitor-pricing.md` (both compiled 2026-07-19) **and** carries
the verdict from `docs/review/honesty-review.md` (2026-07-20). Where the review
marked a figure Unverified or Wrong, it does not appear as a usable number here.
It appears in section 4 or in the gate list in section 7 instead.

**The one rule that governs everything below.** Mend is an educational and
practice tool. It is not therapy, it is not delivered by licensed clinicians, and
it does not replace professional care. Every comparison in this document is a
**cost** comparison and nothing else. We say what things cost. We never say what
things achieve.

---

## 1. What couples counseling actually costs

### Per session, in person, out of pocket

| Claim | Figure | Source | Status |
| --- | --- | --- | --- |
| Most providers charge, out of pocket | **$150 to $250 per session** | Thriveworks, "How Much Is Couples Therapy," published 2025-11-06, https://thriveworks.com/help-with/beginning-therapy/how-much-is-couples-therapy/ | Verified, exact phrasing confirmed 2026-07-20 (honesty review C1) |
| Thriveworks' own couples rate, by state | $160 to $240 per session | same URL | Verified 2026-07-20 (C2) |
| Marriage counseling per session | **$75 to $250**, "with most couples paying around $100 per session" | Grow Therapy, page updated 2026-06-24, https://growtherapy.com/blog/how-much-does-marriage-counseling-cost/ | Verified 2026-07-20 (C3) |
| Individual therapy, per session | $143 | Thriveworks, same URL | Verified 2026-07-20 (P2). Individual, not couples. Label it that way or do not use it |

**The band we publish: $150 to $250 per session, attributed to Thriveworks by
name and date.** It is the best-sourced couples-specific figure in the research,
it is published by a therapy provider (so the bias runs toward the number being
respectable rather than inflated in our favor), and the honesty review confirmed
the exact wording on the page.

**Three things that must always travel with it.**

1. There is **no authoritative national average for couples counseling
   specifically**. Nobody publishes one with real methodology. Range plus
   attribution, always. Never "the national average."
2. **Do not publish "$100 to $250."** No source publishes that band. It is a
   blend of two sources that silently drops Grow Therapy's $75 floor
   (honesty review C4, and the string currently shipping in `src/app/plus.tsx`
   is exactly this error). Either quote Thriveworks at $150 to $250, or quote
   Grow at $75 to $250 with the $100 mode, attributed.
3. **The $75 floor is real, and it constrains our headline.** See the gate in
   section 2.

### Where the "one session" comparison actually sits, given a $99 price

$99 a year is **less than one session at the Thriveworks band** ($150 to $250).
$99 a year is **more than one session at Grow Therapy's $75 floor**, and it is
one dollar under Grow's stated typical rate of about $100.

**Therefore: every "a year for less than one session" line must name the
$150 to $250 rate and attribute it to a national therapy provider.** An
unattributed "less than one session" claim is not provable at $99 and does not
ship. This is the single most important copy rule in this document.

### A realistic full course

| Claim | Figure | Source | Status |
| --- | --- | --- | --- |
| Typical course length | "couples attend anywhere from eight to 20 sessions" | Thriveworks, published 2025-11-06 | Verified 2026-07-20 (C5) |
| Typical course length, second source | "most couples need 12 to 20 therapy sessions" | Grow Therapy, updated 2026-06-24 | Verified 2026-07-20 (C5) |
| Typical total course cost | $1,200 to $2,000 | Grow Therapy, same URL | Verified 2026-07-20 (C6) |
| Complex cases | up to 50 sessions, "about $5,000" | Grow Therapy, same URL | Verified 2026-07-20 (C6) |

Arithmetic on verified inputs: 8 sessions x $150 = **$1,200**. 20 sessions x $250
= **$5,000**. Grow Therapy independently states $1,200 to $2,000 typical and about
$5,000 for complex cases. Two independent sources converge on both ends.

**The public claim:**

> A course of in-person couples counseling typically runs eight to twenty
> sessions, which comes to roughly $1,200 to $5,000 out of pocket.

The honesty review calls this "the strongest public claim in the pricing brief"
(C6). **The earlier draft figure of "$1,800 to $7,500" is dead.** It overstated
both ends by 50 percent, and inflating a number designed to flatter us is exactly
the error that reads as dishonest if anyone checks.

### The insurance reality

| Claim | Figure | Source | Status |
| --- | --- | --- | --- |
| The billing code | CPT 90847, "a 50-minute couples or family therapy session with the identified patient present" | SimplePractice, https://www.simplepractice.com/blog/billing-couples-family-therapy/ | Verified 2026-07-20 (C7) |
| The coverage condition | covered "only ... when the plan deems the treatment medically necessary to treat a diagnosis of one member" | same URL | Verified 2026-07-20 (C7) |
| What is not covered | "typically not covered by insurance when the purpose of therapy is solely relationship growth or communication skills" | same URL | Verified 2026-07-20 (C7) |
| The diagnosis requirement | an identified patient with a DSM-5 diagnosis, "typically something more than a V or Z code" | same URL | Verified 2026-07-20 (C7) |
| The relationship code itself | Z63.0, "Problems in relationship with spouse or partner," is a real ICD-10-CM code but "is not sufficient on its own for insurance billing"; most payers require a primary F code first-listed | ICANotes, https://www.icanotes.com/2023/07/07/how-to-bill-for-couples-therapy/ and https://www.aapc.com/codes/icd-10-codes/Z63.0 | Verified 2026-07-20 (honesty review, public figure 3) |
| Copay when covered | $20 to $50 per session | Thriveworks | Verified 2026-07-20 (C8) |
| Coinsurance when covered | 20 to 40 percent of the session fee | Thriveworks | Verified 2026-07-20 (C8) |
| Copay, second source | $30 to $50 per session | Grow Therapy | Verified 2026-07-20 (C8) |
| Online couples therapy and insurance | "Most online therapy companies don't accept insurance for couples therapy at this time." | Regain, page updated 2025-11-05, https://www.regain.us/advice/therapist/how-much-does-regain-cost/ | Verified 2026-07-20 (C11). This is the correct verbatim quote; an earlier looser paraphrase was in quotation marks and must not be reused |

**The cleared plain-language version, from the honesty review, safe anywhere:**

> Health insurance often does not cover couples counseling on its own. US plans
> pay to treat a diagnosed condition in one person, and a relationship problem is
> not a diagnosis: the relationship code Z63.0 describes a circumstance and will
> not carry a claim by itself. Couples sessions can be covered, billed under CPT
> 90847, when one partner is named as the identified patient with a DSM-5
> diagnosis and the sessions treat that condition. That means one partner ends up
> with a mental health diagnosis in their medical record. Coverage varies, so call
> your insurer.

**Never write "insurance doesn't cover couples counseling."** It is false as an
absolute. Write "often is not covered on its own."

### The low-cost paths, which we point toward and never compete with

| Option | Figure | Source | Status |
| --- | --- | --- | --- |
| Open Path Collective, one-time membership | $65 US | https://openpathcollective.org/pricing-and-eligibility-for-affordable-therapy/ | Verified 2026-07-20 (C13), search-index confirmed; site 403s to automated fetch |
| Open Path, couples and family sessions | $40 to $80 per session | same URL | Verified 2026-07-20 (C13) |
| Open Path, student interns ($30) and individual ($40 to $70) | not cleared | same URL | Unverified (C13). Do not publish |
| Council for Relationships, intern-led therapy | "$20 to $90 per hour" | https://councilforrelationships.org/fees | Needs one re-check before publication (C16), then cleared |
| Federally Qualified Health Centers | required under Section 330 of the Public Health Service Act to run a sliding fee discount program based on the Federal Poverty Guidelines | https://www.integration.samhsa.gov/pbhci-learning-community/Sliding_Fee_Scale_Requirements_for_Health_Centers.doc | Unverified in the review pass. Re-check before publication |
| FQHC locator | findahealthcenter.hrsa.gov | https://findahealthcenter.hrsa.gov/ | Unverified in the review pass |
| SAMHSA National Helpline | 1-800-662-4357, 24/7 | https://www.samhsa.gov/find-help/helplines/national-helpline | **Hand-verify before it ships** (C20). It sits inside a safety guardrail, so it is held to crisis-line standard |

Two crisis numbers are fully verified and ship as-is: the National Domestic
Violence Hotline at **1-800-799-7233** (honesty review S1) and the **988** Suicide
and Crisis Lifeline (S11). Those are the numbers that carry the safety block on
any pricing surface. The SAMHSA referral line is a nice-to-have on a cost page and
waits for its hand check.

### The subscription competitors, for context

| Service | Price | What it buys | Source | Status |
| --- | --- | --- | --- | --- |
| Talkspace couples | **$109 per week** | "Up to four 30 minute video sessions/month for you and your partner" plus unlimited messaging | https://www.talkspace.com/pricing | Verified 2026-07-20 (C9) |
| Talkspace, extra live sessions | $69 each | same page | same URL | Verified (C9) |
| Regain, the couples brand of BetterHelp | **$70 to $100 per session**, billed monthly | one live session a week plus in-app messaging, one subscription covers the couple | https://www.regain.us/advice/therapist/how-much-does-regain-cost/, updated 2025-11-05 | Verified 2026-07-20 (C10) |
| BetterHelp | $70 to $100 per week, or $260 to $400 per month | **does not offer couples therapy**; routes couples to Regain | https://www.betterhelp.com/advice/general/how-much-does-betterhelp-cost/, updated 2026-07-08 | Verified 2026-07-20 (C12) |

Three unit rules that are not negotiable:

- **Talkspace couples is $109 a week, not $99.** $99 is the Talkspace individual
  video plan. Quoting $99 in a couples comparison understates a competitor by $10
  a week, which is the flattering direction and therefore the dangerous one
  (honesty review, public figure 5).
- **Always state Talkspace's 30-minute session length.** Four 30-minute sessions a
  month is half the clock time of a standard 50-minute in-person session. A dollar
  comparison without that is misleading.
- **Regain publishes per session, not per week**, and its page states no session
  length. Do not convert the unit and do not claim minutes (C10, public figure 4).
  Never list BetterHelp in a couples comparison without the sentence that it does
  not offer couples therapy.

---

## 2. The prices, and the arithmetic behind the positioning

### The prices

| Product | Price | Effective rate | Wiring |
| --- | --- | --- | --- |
| Mend Plus monthly | **$9.99 a month** | $9.99 a month | `PRICING.monthly` in `src/lib/premium.tsx`, Stripe `STRIPE_PRICE_MONTHLY` |
| Mend Plus annual | **$99 a year** | **$8.25 a month, billed yearly** | `PRICING.annual`, Stripe `STRIPE_PRICE_ANNUAL` |

$99 / 12 = $8.25 exactly. The app already renders "$8.25 a month, billed yearly,"
so the displayed rate and Stripe agree today. Keep them agreeing: Stripe is the
source of truth for what is actually charged, `PRICING` is only what we render.

Annual versus twelve months of monthly: 12 x $9.99 = $119.88, so the annual plan
saves **$20.88 a year, about 17 percent**. That is arithmetic on our own prices,
publishable without a source.

### Against one session

All comparisons below use the Thriveworks band, $150 to $250 per session,
published 2025-11-06, verified 2026-07-20.

| Comparison | The math | The provable statement |
| --- | --- | --- |
| A year of Plus vs one session at the low end | $99 against $150 | **A full year of Mend Plus costs less than one counseling session at the $150 low end**, with $51 left over |
| A year of Plus vs one session at the high end | $99 x 2 = $198, against $250 | Two full years of Mend Plus cost less than one session at the $250 high end |
| How many sessions a year of Plus is | $99 / $150 = 0.66 | A year of Plus is about two thirds the price of a single session at the low end |
| Monthly plan vs one session at the low end | $9.99 x 15 = $149.85, against $150 | Fifteen months on the monthly plan cost less than one session at the $150 low end |
| Monthly plan vs one session at the high end | $9.99 x 25 = $249.75, against $250 | Twenty-five months on the monthly plan cost less than one session at $250 |

**The gate, again, because it is the easiest rule to break.** Grow Therapy's
verified floor is $75 a session and its typical rate is about $100. At $99 a year
we clear $150 comfortably and we clear $100 by one dollar. So a "less than one
session" line **only ships with the $150 to $250 rate named and attributed**. No
bare version. No shortened version that drops the attribution to fit a button.

### Against a full course

Course total: $1,200 to $5,000, two independent sources, verified 2026-07-20.

| Comparison | The math | The provable statement |
| --- | --- | --- |
| A year of Plus as a share of the cheapest realistic course | $99 / $1,200 = 8.25% | A year of Mend Plus is about eight percent of the cheapest realistic course of counseling |
| A year of Plus as a share of the top of the range | $99 / $5,000 = 1.98% | About two percent of a $5,000 course |
| Years of Plus inside the low-end course | $99 x 12 = $1,188, against $1,200 | **Twelve years of Mend Plus cost less than the cheapest realistic course of counseling** |
| Years of Plus inside the high-end course | $5,000 / $99 = 50.5 | A $5,000 course is more than fifty years of Mend Plus |
| Monthly plan against the low-end course | $1,200 / $9.99 = 120.1 months | The cheapest realistic course is about ten years on the monthly plan |

### Against a week of the subscription competitors

| Comparison | The math | The provable statement |
| --- | --- | --- |
| A year of Plus vs one week of Talkspace couples | $99 against $109 | **A full year of Mend Plus costs less than one week of Talkspace's couples plan**, which is $109 a week for up to four 30-minute video sessions a month for both partners plus messaging |
| A year of Plus vs one Regain session | $99 against Regain's published $70 to $100 per session | A year of Mend Plus costs about what Regain charges for a single session at the top of its published $70 to $100 per-session range. **Note: $99 is more than Regain's $70 floor.** Any Regain line names the full range |
| Ten months of the monthly plan vs one Talkspace week | $9.99 x 10 = $99.90, against $109 | Ten months on the monthly plan cost less than one week of Talkspace couples |

**Do not publish a Regain "per week" number** and do not attach a session length
to Regain. **Do not publish BetterHelp** in any couples comparison without its own
sentence that it does not offer couples therapy.

An annualized Talkspace figure (52 x $109 = $5,668) is arithmetic on a verified
weekly rate, but it assumes a full year of continuous subscription that Talkspace
does not itself publish as a plan. If it is ever used, label it as arithmetic on
the published weekly rate, not as a Talkspace price.

### The comparison we will never publish

$99 a year is more than Open Path Collective's $65 one-time membership, and it is
in the same territory as one or two Open Path couples sessions at $40 to $80. We
will never build a comparison against Open Path, community health centers,
training clinics, or the SAMHSA helpline in either direction. Those are the paths
we send people toward. We do not compete with them on price, and we do not
price-shame the cheapest legitimate route to a real professional.

### The framing that rides along with every row above

Mend is not therapy, is not delivered by a licensed clinician, and does not
replace counseling. A table that puts a Mend price next to a therapy price without
saying what each one buys is dishonest and is a regulatory risk. State session
length and session count, or do not build the table.

---

## 3. The exact lines we may use

Every line below is cleared for the app, the App Store listing, and the landing
page. Use them verbatim or cut them shorter, but **do not add a number that is not
in section 1, and do not drop an attribution to save space.** If a line will not
fit with its attribution, the line is too long, not the attribution.

### Paywall (`src/app/plus.tsx`)

**P1. Hero title.**

> A year of Plus costs less than one counseling session.

Backed by: $99 against Thriveworks' published band of $150 to $250 per session out
of pocket, "most providers charge between $150 and $250 per session when paying
out of pocket," published 2025-11-06,
https://thriveworks.com/help-with/beginning-therapy/how-much-is-couples-therapy/,
verbatim confirmed 2026-07-20. **This line only ships on the same screen as P3,
which names the rate.** On its own it does not clear Grow Therapy's verified $75
floor.

**P2. Hero subtitle.**

> Start with Mend's essential tools. Plus opens the complete journey for both partners.

Backed by: the free tier in `docs/MONETIZATION.md`, shipped in `src/app/plus.tsx`.
Product fact, not a research claim.

**P3. The cost panel. Replaces the string currently shipping.**

> A national therapy provider puts couples counseling at $150 to $250 a session
> out of pocket, and a typical course at eight to twenty sessions. Insurance often
> will not cover it on its own, because plans pay to treat a diagnosed condition
> in one person, and relationship trouble is not a diagnosis.

Backed by: Thriveworks for both the rate and the eight to twenty session course
(published 2025-11-06, verbatim confirmed 2026-07-20); SimplePractice for the
insurance sentence, which states coverage applies only "when the plan deems the
treatment medically necessary to treat a diagnosis of one member" and that these
services are "typically not covered by insurance when the purpose of therapy is
solely relationship growth or communication skills"
(https://www.simplepractice.com/blog/billing-couples-family-therapy/, confirmed
2026-07-20).

This replaces the shipped string "Couples counseling typically runs $100 to $250
for a single session," which matches no source and is flagged Wrong in the honesty
review (C4).

**P4. The safety line under the cost panel. Ships exactly as written.**

> Mend is not therapy and does not replace it. If you can see a counselor, see one.

Backed by: the positioning guardrails in `docs/research/counseling-prices.md`,
reaffirmed as a standing rule in `docs/review/honesty-review.md`. This line is not
optional and does not get shortened. It is the reason we are allowed to discuss
price at all.

**P5. The low-cost pointer, below P4.**

> Lower-cost counseling exists. Community health centers are required by federal
> law to run sliding-scale fee programs, and nonprofit training clinics offer
> intern-led sessions well under private-practice rates.

Backed by: Section 330 of the Public Health Service Act sliding fee requirement
(https://www.integration.samhsa.gov/pbhci-learning-community/Sliding_Fee_Scale_Requirements_for_Health_Centers.doc)
and Council for Relationships (https://councilforrelationships.org/fees).
**Both need one re-check before this ships** (honesty review C16 and the FQHC row
above), which is why this version states no dollar figure. Once Council for
Relationships is re-checked, "intern-led sessions from $20 an hour" may be
substituted. Add the SAMHSA helpline number only after C20 is hand-verified. Add
Open Path Collective ($65 one-time membership, $40 to $80 per couples session,
verified 2026-07-20) only as a resource, never as a price we compare ourselves to.

**P6. Under the plan picker.**

> $8.25 a month, billed yearly. Cancel anytime.

Backed by: $99 / 12 = $8.25. Arithmetic on our own price. Already shipping in
`PRICING.annual.perMonth`.

**P7. On the annual card, optional.**

> If Mend works and you stop needing it, cancel. That is the point.

Backed by: the "designed to be deleted" philosophy in `docs/MONETIZATION.md`. No
research claim.

**P8. Annual savings, optional.**

> $99 a year, or $9.99 a month. The yearly plan saves $20.88.

Backed by: 12 x $9.99 = $119.88, minus $99 = $20.88. Arithmetic on our own prices.

### App Store listing

**A1. Opening.**

> Mend is a guided relationship tool for couples. Start with the first journey
> chapter and selected activities, then use Plus to open the complete experience.

Backed by: `docs/MONETIZATION.md`. Product fact.

**A2. The honesty paragraph. Required, not optional.**

> Mend is an educational and practice tool. It is not therapy, it is not
> counseling, and it is not delivered by licensed clinicians. It does not diagnose
> or treat anything. If you are in crisis, or if there is violence or fear in your
> relationship, Mend shows you the crisis lines first and never asks you to pay
> for them.

Backed by: the guardrails in `docs/research/counseling-prices.md`; the standing
rules restated in `docs/review/honesty-review.md` ("Nothing about the DV gate, the
crisis resources, the educational tool, not therapy framing, or the per-track red
flags may sit behind a paywall"); and the category analysis in
`docs/research/competitor-pricing.md`, which documents that a leading competitor's
App Store subtitle is "Guided Relationship Counseling" while its own disclaimer
says its materials "are not intended to, and do not constitute, medical,
psychological, or mental health advice, or diagnosis"
(https://apps.apple.com/us/app/lasting-marriage-couples/id1225049619, accessed
2026-07-19). Saying the plain thing is our position.

**A3. Cost line for the description body.**

> A course of in-person couples counseling typically runs eight to twenty
> sessions, roughly $1,200 to $5,000 out of pocket. Mend Plus is $99 a year.

Backed by: Thriveworks for eight to twenty sessions at $150 to $250 (published
2025-11-06); Grow Therapy for $1,200 to $2,000 typical and about $5,000 for
complex cases (updated 2026-06-24). Both confirmed 2026-07-20. Two independent
sources converge on both ends.

**A4. Insurance line. Required if cost is mentioned more than once.**

> Couples counseling often is not covered by insurance on its own, because plans
> pay to treat a diagnosed condition in one person.

Backed by: SimplePractice billing guidance, confirmed 2026-07-20.

**A5. Inclusivity line.**

> Built for every committed relationship. Married or not, living together or not,
> any two people who want to do the work.

Backed by: product scope. No research claim. `docs/research/competitor-pricing.md`
documents that the category's verified positioning language is overwhelmingly
marriage-framed, which makes this both true and distinctive.

**A6. Free-tier line, near the purchase disclosure.**

> Mend Plus adds every card deck, the full game shelf, every seven-day challenge,
> and complete healing-track programs. The journey, the safety net, the daily
> question, the shared space, the plan, the pulse checks, and every track's red
> flags stay free.

Backed by: `docs/MONETIZATION.md`. Product fact, and it does real work at App
Review because it shows the paywall does not sit in front of safety.

### Landing page

**L1. Headline.** Ships only with L2 on the same screen.

> Repair costs less than you think.

Backed by: nothing on its own. It is tone, and L2 immediately substantiates it.

**L2. Subhead, the substantiation.**

> A national therapy provider puts couples counseling at $150 to $250 a session,
> and a typical course at eight to twenty sessions. Mend Plus is $99 a year.

Backed by: Thriveworks, published 2025-11-06, confirmed 2026-07-20,
https://thriveworks.com/help-with/beginning-therapy/how-much-is-couples-therapy/.

**L3. The comparison block, with its mandatory framing.**

> One counseling session, at the low end of that range, costs more than a full
> year of Mend Plus. That is a price comparison and only a price comparison. A
> counselor is a trained professional in the room with you. Mend is a structured
> tool you use on your own time. If you can see a counselor, see one.

Backed by: $99 against Thriveworks' $150 low end. The second half is the required
framing and does not get cut.

**L4. The subscription-competitor line, optional.**

> A year of Mend Plus costs less than one week of Talkspace's couples plan, which
> is $109 a week for up to four 30-minute video sessions a month for both partners
> plus messaging. Those sessions are with a licensed therapist. Mend's are not
> sessions with anyone.

Backed by: https://www.talkspace.com/pricing, confirmed 2026-07-20 ($109/week,
"Up to four 30 minute video sessions/month for you and your partner"). The 30
minutes and the last sentence are both mandatory.

**L5. Insurance explainer.**

> Insurance often will not cover couples counseling on its own. US plans pay to
> treat a diagnosed condition in one person, and a relationship problem is not a
> diagnosis: the relationship code Z63.0 describes a circumstance and will not
> carry a claim by itself. Couples sessions can be covered, billed under CPT
> 90847, when one partner is named as the identified patient with a DSM-5
> diagnosis and the sessions treat that condition. That means one partner ends up
> with a mental health diagnosis in their medical record. Coverage varies, so call
> your insurer.

Backed by: SimplePractice, "Couples and family therapy CPT codes for billing"
(https://www.simplepractice.com/blog/billing-couples-family-therapy/); ICANotes,
"How to bill for couples therapy"
(https://www.icanotes.com/2023/07/07/how-to-bill-for-couples-therapy/); code
description at https://www.aapc.com/codes/icd-10-codes/Z63.0. All confirmed
2026-07-20. This is the honesty review's cleared wording, verbatim.

**L6. Low-cost counseling block. Required on any page that mentions cost.**

> If money is the obstacle, counseling still might not be out of reach. Community
> health centers are required by federal law to run sliding-scale fee programs,
> nonprofit training clinics offer intern-led sessions well below private-practice
> rates, and Open Path Collective lists couples sessions at $40 to $80 after a
> one-time $65 membership.

Backed by: Section 330 sliding fee requirement (re-check pending); Council for
Relationships (re-check pending, so no dollar figure yet); Open Path Collective
$65 membership and $40 to $80 couples sessions, verified 2026-07-20 (honesty
review C13). Do not add Open Path's $30 intern or $40 to $70 individual rates,
which remain unverified.

**L7. Safety block. Required on every page, above the fold on the pricing page.**

> If you are in danger, none of this pricing matters. The National Domestic
> Violence Hotline is 1-800-799-7233. The Suicide and Crisis Lifeline is 988. Both
> are free.

Backed by: https://www.thehotline.org and https://988lifeline.org, both fetched
and verified 2026-07-20 (honesty review S1 and S11).

**L8. What Plus is, in one line.**

> Plus is breadth: every deck, every game, every challenge, every complete track.
> It is not the difference between getting help and not.

Backed by: `docs/MONETIZATION.md`.

---

## 4. Never say this

Binding. If a line is on this list it does not ship, no matter who wrote it or how
well it converts. In this category, overstatement does not merely risk App Review.
It risks changing whether a real person goes to see a professional.

### Clinical and outcome claims. All prohibited, without exception.

1. **"As effective as therapy."** And every cousin: "just as good as," "the same
   as," "a replacement for," "instead of," "so you don't need therapy." Mend has
   demonstrated no clinical efficacy and will not imply any. This is the single
   most important line on the list.
2. **"Clinically proven," "clinically validated," "evidence-based,"
   "research-backed," "science-backed," "counseling-grade"** as claims about
   results. `docs/MONETIZATION.md` uses "counseling-grade" internally to describe
   production quality; it never ships as a claim about outcomes.
3. **"Saves marriages," "fixes your relationship," "prevents divorce," "heals
   your relationship."** No outcome claims of any kind, hedged or not.
4. **Any success rate, satisfaction rate, or improvement percentage about Mend.**
   We have no methodology and no outcome data. Note that a leading competitor
   publishes "89% see positive changes in their relationship in 3 months" with no
   linked methodology (`docs/research/competitor-pricing.md`). We do not copy that
   behavior and we do not cite it.
5. **"Therapy," "counseling," "therapist," or "counselor" as a description of what
   Mend is or provides.** We use those words only when pointing someone toward a
   real professional. Never as a label for our product, our sessions, our tracks,
   or our decks.
6. **Any citation of research literature, effect size, or study.** The honesty
   review found the entire research layer either unverified or requiring hand
   confirmation, and it rules that "Mend has no outcome data of its own. No
   success rate, no improvement percentage, and no claim that any research effect
   size applies to Mend." We cite practice pricing pages, not studies.
7. **Any claim or implication that a quiz, a pulse score, or a behavior predicts
   whether a relationship will end.** Standing rule from
   `docs/review/honesty-review.md`, binding across every surface.
8. **The 86% / 33% "turning toward" pair, the 5:1 ratio as a causal claim, "90+
   percent divorce prediction accuracy," and "81% of marriages self destruct."**
   All ruled unpublishable. They circulate constantly and will resurface in
   drafts.

### Cost claims that are not verifiable

9. **"41% of couples cite cost as a barrier (KFF, 2021)."** Not located in any KFF
   publication. Appears only on content-farm aggregators. Looks fabricated. The
   honesty review independently concurs (C19).
10. **"35% of couples are unable to afford therapy (Pew, 2022)."** Same. No
    matching Pew publication exists.
11. **Any figure sourced to worldmetrics.org, wifitalents.com, costinsighthub.com,
    carecostindex.com, costtrends.org, nationalmentalhealthsupport.com, or any
    similar "statistics" or "cost guide" domain.** No methodology, no named
    authors, no primary data, mutually contradictory numbers.
12. **"The national average cost of couples therapy is $X."** No organization
    publishes an audited national average for couples therapy specifically.
13. **"$100 to $250 per session."** No source publishes that band. It is a blend
    that drops Grow Therapy's verified $75 floor. Ruled Wrong (C4). This string is
    currently shipping in `src/app/plus.tsx` and must be replaced with P3.
14. **"$1,800 to $7,500 for a full course."** Ruled Wrong. Overstates both ends by
    50 percent. The correct figure is $1,200 to $5,000.
15. **"$139 is the average cost of couples therapy."** That SimplePractice figure
    covers individual psychotherapy CPT codes only and excludes couples code
    90847, and the honesty review left it Unverified (C15). If an
    individual-therapy figure is ever needed, use Thriveworks' verified $143 and
    label it "individual therapy," never couples.
16. **"Talkspace is about $99 a week"** in any couples context. $99 is the
    individual plan. Couples is $109 a week.
17. **"Regain is $70 to $100 per week"** or any Regain session length. Regain
    publishes per session and states no length.
18. **BetterHelp in any couples price comparison** without the sentence that
    BetterHelp does not offer couples therapy and routes couples to Regain.
19. **Any single price for Paired, Lasting, Coral, Evergreen, or Blueheart.**
    Those are App Store SKU ranges under active price testing, not list prices.
    Blueheart may be dormant and stays out of comparisons entirely.
20. **Any OurRitual price.** Not published; third-party figures do not reconcile.
21. **Any figure from Ours (withours.com).** The site was unreachable to both the
    research pass and the review pass. Ruled do-not-publish (C14, P3).
22. **A specific rural versus urban dollar gap.** Only content-farm sourcing
    exists, and real state-level data cuts against the simple story.
23. **"Employee Assistance Programs cover 3 to 8 free couples sessions."** No
    authoritative source for that range.
24. **Open Path's $30 intern rate or $40 to $70 individual rate**, and the SAMHSA
    helpline number, until each clears its own check.

### Savings claims that rest on assumptions we cannot support

25. **"Save $2,000 a year,"** or any dollar figure of savings. It assumes the
    person would otherwise have paid for counseling, and would have stopped
    because of Mend. Both assumptions are unverifiable, and the second is the
    thing we least want to be true.
26. **"Replaces N sessions of counseling."** Mend replaces zero sessions.
27. **"Cheaper than therapy" without naming what each side buys.** A bare price
    comparison implies equivalence.
28. **"Insurance doesn't cover couples counseling."** False as an absolute. Say
    "often is not covered on its own."
29. **Any comparison positioning Mend against Open Path, community health centers,
    training clinics, or the SAMHSA helpline.** Those are the paths we send people
    toward.

### Pressure, fear, and framing

30. **Urgency or scarcity aimed at a relationship in trouble.** No countdown
    timers, no "your relationship can't wait," no "price goes up tonight."
31. **Any implication that not paying means not getting help.** The free tier is
    the complete spine. Copy that implies otherwise is false about our own
    product.
32. **Fear framing about divorce, abandonment, or a partner leaving.**
33. **Any claim that Mend substitutes for medical care, medication, or
    professional crisis support.**
34. **Any paywall, upsell, interstitial, or "upgrade to continue" placed in front
    of, or in the path to, a crisis resource, the domestic violence gate, a red
    flag screen, or a "when to see a professional" screen.** Not a copy rule, a
    build rule, and it is absolute.

---

## 5. Free versus Plus

A restatement of `docs/MONETIZATION.md`. If the two ever disagree,
`docs/MONETIZATION.md` wins and this section gets corrected.

### Included starting access

- The complete first chapter of the journey
- Selected starter activities and guided conversations
- **The entire safety net: crisis lines, red flags, get-help-now, and the domestic
  violence gate**
- The daily question
- The private two-person room and invite code
- Shared notes
- Pulse checks
- Every healing track's first session
- **Every healing track's red flags and its "when to see a professional" content,
  in every track, always**
- The First Steps, Repair, and Back from the Brink decks
- One starter couple game
- The starter and crisis-week challenges

### Mend Plus adds

- Every card deck beyond First Steps and Repair
- The full game shelf beyond "Do you still know me?"
- Every seven-day challenge beyond the starter week and "The last line"
- Complete healing-track programs beyond each track's first session
- Everything new we build, first

### The rules that govern the split

1. **Money never gates safety.** Not the crisis lines, not the DV gate, not the
   red flags, not any track's "when to see a professional" content. Permanent, not
   a launch-period concession.
2. **Nothing in a pricing or upsell flow may sit in front of, delay, or obscure
   safety content.** If a screen has any chance of being the screen someone
   reaches in a bad moment, it carries no paywall.
3. **The couple in acute crisis never hits a paywall on the way to stability.**
   That is what the crisis deck, the crisis week challenge, and every track's free
   first session exist for.
4. **Plus is breadth and depth, never rescue.** If a Plus feature ever becomes
   load-bearing for someone's safety, it moves to free. No discussion.
5. **Monetization language must describe the current product without promising that
   pricing or advertising policy can never change.**
6. **No selling or sharing relationship data, in any form.**
7. **Nothing here assumes marriage, legal status, cohabitation, children, or any
   particular genders.** Copy that does is a bug.

### One subscription covers both partners

The verified category norm is couple-linked single-payer. Paired's own support
documentation states that "if one partner purchases a Paired Premium subscription,
premium access will automatically be granted to the other's Paired account"
(https://support.paired.com/en/articles/164624-does-my-partner-have-to-pay-to-use-paired-premium-as-well,
accessed 2026-07-19), and Relish, Lasting, Evergreen, Coral, and Love Nudge follow
the same model. Mend's core loop already requires two people, and charging twice
for one shared journey contradicts the brand. Mend entitlements are therefore
attached to the couple's room: either partner can pay, both receive access, and
only the payer manages billing.

---

## 6. Owner checklist: switching Stripe from test mode to live

The prices are already configured in test mode at $9.99 a month and $99 a year.
This is the sequence to charge real money. Do them in order.

1. **Activate the Stripe account.** Business details, bank account for payouts,
   tax details, and identity verification. Until activation clears, live keys do
   not exist. Confirm the account shows "Activated" and payouts are enabled.
2. **Create the two live-mode prices.** Test-mode products and prices do not carry
   over. In live mode, create the Mend Plus product with a **$9.99 monthly**
   recurring price and a **$99 yearly** recurring price. Confirm the currency is
   USD and both are recurring, not one-time. Copy the two live price IDs
   (`price_...`).
3. **Set the live secrets on the checkout function.** The `mend-checkout` Supabase
   edge function reads `STRIPE_PRICE_MONTHLY` and `STRIPE_PRICE_ANNUAL`. Replace
   both with the live price IDs, and replace the Stripe secret key with the live
   key (`sk_live_...`). Nothing in the client holds a Stripe key, and it stays
   that way.
4. **Create the live webhook endpoint.** Stripe Dashboard, live mode, pointing at
   the Supabase webhook function. Subscribe to at minimum
   `checkout.session.completed`, `customer.subscription.updated`,
   `customer.subscription.deleted`, and `invoice.payment_failed`. Copy the live
   signing secret (`whsec_...`) into the function's environment and confirm the
   handler rejects unsigned or badly signed requests.
5. **Confirm the entitlement path end to end in live mode.** The webhook, and only
   the webhook, writes `mend_entitlements`, keyed by Supabase user id, and
   `mend_my_tier()` stays the single source of truth the client reads. The client
   must never be able to grant itself Plus. Verify by running a real card through
   checkout, watching the row appear, and watching the app flip to Plus on
   refresh.
6. **Confirm cancellation and downgrade.** Cancel that live subscription and
   verify the tier drops back to free at period end, that the app handles the
   downgrade without losing the user's data, and that no safety content or free
   spine feature is affected in either direction.
7. **Turn on the customer portal in live mode**, so "cancel anytime" is literally
   true and one click away, and link it from Settings. Copy that promises
   cancellation must be backed by a working cancel path.
8. **Set the billing surface details**: statement descriptor that reads clearly on
   a shared bank statement (this matters more than usual for a relationship app on
   a joint account), receipt emails on, and Stripe Tax configured if it is being
   used.
9. **Update the displayed prices only if Stripe changes.** `PRICING` in
   `src/lib/premium.tsx` currently reads `$9.99` monthly and `$99` annual with
   "$8.25 a month, billed yearly," which matches the live prices above. If those
   ever diverge, Stripe wins and the constant gets corrected in the same shipment.
10. **Replace the P3 cost string in `src/app/plus.tsx`.** The shipped "$100 to
    $250" line is ruled Wrong and must not go live with the paywall. Add P5 while
    that file is open.
11. **Flip `PLUS_PREVIEW` to `false`** in `src/lib/premium.tsx` and ship the
    build. Until that flips, every tester has Plus and no purchase is required or
    real.
12. **Resolve the payment-rail question before the paywall goes public.**
    `docs/MONETIZATION.md` describes Apple In-App Purchase under Guideline 3.1.1.
    `src/lib/premium.tsx` and `src/app/plus.tsx` implement Stripe Checkout opened
    in the browser, citing the US-storefront link-out allowance. Those two
    documents disagree. It is an owner and App Review decision, not a pricing
    decision, and $9.99 / $99 works under either rail. Update the App Review notes
    and the App Privacy answers for whichever rail ships.
13. **Run the safety pass on the live paywall before submitting.** Walk the crisis
    deck, the DV gate, every track's red flags, and every "when to see a
    professional" screen while signed in as a free account, and confirm not one of
    them shows a paywall, an upsell, or a Plus badge in the path.

---

## 7. Verification gates and open items

These block publication, not development.

1. **Council for Relationships** ($20 to $90 per hour) needs one re-check before
   any dollar figure appears in P5 or L6 (honesty review C16).
2. **The Section 330 FQHC sliding-fee citation** and the **HRSA locator** need one
   re-check. The claim in P5 and L6 is written to survive without a number in the
   meantime.
3. **The SAMHSA National Helpline number** must be hand-verified to crisis-line
   standard before it ships anywhere (C20). The DV Hotline and 988 are already
   verified and carry L7 on their own.
4. **Ours (withours.com)** stays unpublishable until someone loads the site in a
   browser (C14, P3).
5. **SimplePractice's $139** stays out of copy. If an individual-therapy number is
   needed, Thriveworks' $143 is the verified one, labeled as individual.
6. **Every pricing figure in section 1 gets re-checked before any major marketing
   push, and at minimum every six months.** This category moves fast: BetterHelp
   updated its own pricing page 2026-07-08, eleven days before the research was
   compiled, and Grow Therapy updated on 2026-06-24.
7. **Anyone editing marketing copy works from section 3 only.** If a number is
   needed that is not in section 1, it gets researched, added to
   `docs/research/counseling-prices.md` with a source URL and an access date, and
   run past the standard in `docs/review/honesty-review.md` first. No exceptions,
   including for a number that "everyone knows." Blank beats invented.

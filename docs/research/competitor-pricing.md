# Competitor Pricing and Positioning: Relationship and Couples Apps

Research date: 2026-07-19. All URLs accessed 2026-07-19 unless noted.

## How to read this document (read this first)

Three honesty caveats, because they change how you should use the numbers below.

**1. App Store "In-App Purchases" lists are a SKU dump, not a price.**
Apple lists every active in-app purchase SKU an app has configured. That includes
promotional prices, A/B test variants, win-back offers, and legacy grandfathered
tiers. So an app showing "Annual $74.99" and "Annual $39.99" is not contradicting
itself: those are different SKUs served to different users. Where the App Store
shows a range, this document reports the range and labels it as a SKU range, not
as "the price." Do not quote a single number from a SKU range as if it were the
list price.

**2. Several companies deliberately do not publish a price.**
Paired, Lasting, Relish, and OurRitual all route pricing behind a quiz, an email
gate, or a dynamically loaded offer page. Fetching `paired.com/premium` on
2026-07-19 returned a page still in a "Loading your offer" state with no prices
in the markup. `getlasting.com/subscription` returned only a "Take the quiz"
call to action. This is itself a finding: personalized or obscured pricing is the
category norm, and it is why third-party "pricing 2026" blog posts disagree with
each other so wildly.

**3. Most search results for this topic are competitor-run SEO content.**
Searches for competitor pricing surfaced a large volume of posts from
lovefix.app, emira.io, couplesanalytics.com, connectedcouples.app, tryamora.app,
ourcouple.app, and habi.app. These are all themselves couples apps writing
comparison content that ranks for competitor names and concludes in their own
favor. Their numbers are not treated as verified here. Where this document cites
a price, it comes from Apple's App Store listing, the vendor's own support or
FAQ documentation, or a vendor press release.

Anything not verifiable from those sources is marked **not publicly listed**.

---

## Comparison table

| App | Verified price | Free tier | Core mechanic | Couple-linked? | Therapy stance |
|---|---|---|---|---|---|
| **Paired** | App Store SKU range $14.99/mo; annual SKUs $29.99 to $74.99 | Yes, limited; 7-day Premium trial advertised | Daily question both partners answer, plus expert-led "journeys" | **Yes.** One Premium unlocks both linked accounts | Disclaims. "Not intended to constitute medical, psychological, or mental health advice" |
| **Lasting** | App Store SKU range: Premium $11.99 to $79.99; Plus $19.99 to $89.99 | Yes, "Foundations" series (5 sessions) free | Guided audio/text sessions across 12+ relationship topics | **Yes.** One subscription covers both partners via invite code | Leans in hardest. Subtitle is "Guided Relationship Counseling"; markets as "#1 Marriage Counseling App", then disclaims in fine print |
| **Relish** | $99.99 / 6 months for 2 people (vendor-stated) | Not publicly listed | Coach-guided lessons plus personalized plan | **Yes.** Partner account included | Positions as "relationship training", coach not therapist |
| **OurRitual** | Not publicly listed (pricing page 404s; third-party figures conflict badly, roughly $144 to $310/mo) | No | Self-guided "Paths" plus scheduled live video sessions with an expert | **Yes**, and it is the product: separate individual sessions plus a joint session | Explicit therapy alternative. Sells live expert sessions |
| **Ours** | ~$200/session standalone; ~$150/session on a 4-session monthly plan; $50 first session (vendor blog) | No | Actual virtual couples therapy, 50-minute sessions | Yes, it is therapy for the couple | **Is** therapy, not an alternative to it |
| **Evergreen** | App Store SKU range $9.99 to $69.99 ("Unlimited access") | Yes, limited | Daily questions, quizzes, games, expert lessons | **Yes**, built for two | Light. "Relationship tips from experts" |
| **Gottman Card Decks** | **Free.** No in-app purchases found | Entirely free | 22 card decks, 1,000+ prompt cards | **No.** Single-user browsing, used together in person | Research-brand halo (Gottman Institute) without selling therapy |
| **Love Nudge** | Free download, one IAP: "Learning the 5 Love Languages" $9.99 | Yes, core app is free | 5 Love Languages assessment, "love tank" tracking, nudges | **Yes.** Partners connect accounts | None. Book-brand extension |
| **Coral** | App Store SKU range: monthly $12.99; annual $39.99 to $89.99 | Not publicly listed | Intimacy-focused questions, quizzes, games, in-app chat | **Yes.** Partner must connect to unlock answers | "Coach for connection" framing |
| **Blueheart** | App Store SKU range: monthly $5.99 to $29.99; annual $89.99 to $134.99 | Not publicly listed | Sensate-focus style guided sexual health program | Partially. Program is individual-facing with partner exercises | "Couples therapy for everyone", sex-therapy derived |

---

## Detail and sources

### Paired
- Developer: Better Half Limited. App Store IAP list includes Paired Premium Monthly $14.99 and annual SKUs at $74.99, $59.99, $44.99, $39.99, $36.99, $29.99.
  Source: https://apps.apple.com/us/app/paired-couples-relationship/id1469609343
- Couple-linked and single-payer, confirmed by vendor support doc: "if one partner
  purchases a Paired Premium subscription, premium access will automatically be
  granted to the other's Paired account," conditional on being paired in the app.
  Source: https://support.paired.com/en/articles/164624-does-my-partner-have-to-pay-to-use-paired-premium-as-well
- Positioning: "The app that brings couples closer" / "Life's messy, but your
  relationship doesn't have to be." Fronts named experts including a relationship
  therapist, an LMHC, and the president of UK charity Relate.
  Source: https://www.paired.com/
- Marketing claims **self-reported and unaudited**: "4 million couples", 4.7 rating
  across 200K+ reviews, and "89% see positive changes in their relationship in 3
  months." The 89% figure has no published methodology linked from the homepage.
  Do not repeat it as fact.
- Therapy stance: hedged. Expert-fronted in marketing, disclaimed in the App Store
  description ("not intended to constitute medical, psychological, or mental
  health advice").

### Lasting
- Developer listed as Groop Internet Platform inc., which is Talkspace. Talkspace
  acquired Lasting effective 2020-11-01 for $10.7M cash.
  Source: https://www.businesswire.com/news/home/20201112005199/en/Talkspace-Announces-Acquisition-of-Leading-Relationship-Counseling-App-Lasting
- App Store IAP list shows two product lines: "Lasting Premium" at $11.99, $14.99,
  and $79.99; "Lasting Plus" at $19.99, $29.99, $49.99, $59.99, $89.99.
  Source: https://apps.apple.com/us/app/lasting-marriage-couples/id1225049619
- Free tier: the "Foundations" series (5 sessions) is free.
- Therapy stance: the most aggressive in the set. App subtitle is "Guided
  Relationship Counseling" and it markets as the "#1 Marriage Counseling App"
  while carrying a disclaimer that its materials "are not intended to, and do not
  constitute, medical, psychological, or mental health advice, or diagnosis."
  This gap between the subtitle and the disclaimer is the category's central
  credibility problem and the clearest opening for an honest competitor.

### Relish
- Vendor-stated standard subscription: $99.99 for six months, covering 2 people.
  A partner account is included with a subscription. Coaching has historically
  been marketed as included, and third-party sources report a separate premium
  coaching tier, but that add-on price is **not publicly listed** on a vendor page
  I could verify. `hellorelish.com` did not render pricing on fetch.
  Source (vendor FAQ, surfaced via search): https://hellorelish.com/faqs/
- Founded 2018 by Lesley Eccles (FanDuel co-founder). Reported funding and revenue
  figures circulating on Crunchbase/Latka-style aggregators (including a claimed
  $25M Series B in Feb 2025 and ~$1.2M 2024 revenue) are **third-party estimates
  I could not confirm from a primary source**. Do not cite them.

### OurRitual
- `ourritual.com/pricing` returned HTTP 404 on 2026-07-19. Pricing is gated.
- Third-party reviews give sharply conflicting figures: "$32/week individual and
  $52/week couples", "$144 to $310 monthly", and "$260/month per couple including
  3 private 20-minute sessions and 1 joint 40-minute session." Because these do
  not reconcile and none is a vendor page, treat OurRitual's price as
  **not publicly listed**, with a defensible statement being "roughly $150 to
  $300 per month, vendor does not publish a rate card."
- Core mechanic is genuinely different from the content apps: self-guided video
  "Paths" plus weekly scheduled live video sessions with a relationship expert.
  It competes with therapy on price, not with apps.
- Source (structure, not price): https://www.ourritual.com/ritual-how-it-works

### Ours
- Positioned as actual virtual couples therapy and premarital counseling, not an
  app-first product. Vendor blog states sessions run $150 to $200 depending on
  volume, with a $50 first session for new clients, 50-minute sessions, and ~25%
  savings on multi-session packages. Direct fetch of `withours.com` failed
  (connection refused); figures come from the vendor's own blog post.
  Source: https://www.withours.com/blog/how-much-is-couples-therapy/
- Included because it sets the realistic ceiling: this is what "the real thing"
  costs when delivered efficiently.

### Evergreen
- Developer: Evergreen Technologies. App Store IAP list shows "Unlimited access"
  SKUs at $9.99, $12.99, $19.99, $29.99, $34.99, $49.99, $69.99. Billing period
  is not disambiguated in the listing, so per-period price is
  **not publicly listed**.
  Source: https://apps.apple.com/us/app/evergreen-relationship-growth/id1573360122
- Mechanic is close to Paired: daily questions, quizzes, games, expert lessons
  across communication, conflict, intimacy, money, trust, family.

### Gottman Card Decks
- Free, no in-app purchases surfaced. 22 decks, 1,000+ cards, favorites, from
  The Gottman Institute.
  Sources: https://apps.apple.com/us/app/gottman-card-decks/id1292398843 and
  https://www.gottman.com/couples/apps/
- Strategically the most important row in the table. The single most
  research-credentialed brand in the category gives its prompt content away free.
  That means **conversation prompts are not a defensible paid product.** Any
  paywall built primarily on "we have good questions to ask each other" is
  competing with free Gottman.
- Not couple-linked: it is a single-user card browser, designed for two people
  sitting together with one phone.

### Love Nudge
- Free download. Single in-app purchase: "Learning the 5 Love Languages" video
  series, $9.99. Developer: Love Language Brand.
  Source: https://apps.apple.com/us/app/love-nudge/id495326842
- Couple-linked: partners connect accounts, exchange nudges, track "love tanks."
- Effectively a free funnel for a book/brand franchise rather than a subscription
  business. Another data point that free-with-brand-halo is a real competitive
  pattern.

### Coral
- Developer: Athais Inc. App Store IAP list: Monthly $12.99; 3 Months $39.99 and
  $49.99; 6 Months $59.99; Yearly $39.99, $59.99, $79.99, $89.99. Latest version
  3.1.0.
  Source: https://apps.apple.com/us/app/coral-couples-relationship/id1448861466
- Couple-linked with a genuine lock mechanic: you answer to unlock your partner's
  answers.
- Company reports "over 300,000 users" and "$4M+ raised" via press materials.
  Self-reported, unaudited.

### Blueheart
- Developer: Blueheart Technologies Ltd. Subtitle "Reboot Your Love Relationship."
  App Store IAP list: Monthly $5.99, $9.99, $20.49, $29.99; 6 Months $60.99,
  $66.99, $89.99; Annual $89.99, $134.99.
  Source: https://apps.apple.com/us/app/blueheart-relationship-health/id1473815579
- **Status uncertain.** Sources disagree on recency: one aggregator lists a last
  release of 2024-09-02, while the App Store page showed a version dated "April"
  without a confirmable year. I found no shutdown announcement, but I also could
  not confirm active development. Treat as possibly dormant and re-check before
  relying on it as a live comparison.
- Widest monthly spread in the set ($5.99 to $29.99), which usually signals heavy
  price testing or aggressive win-back discounting.

---

## Couple-linked vs single-user: the real differentiator

This is the most decision-relevant axis in the whole category, and it splits
cleanly into three models.

**Model A: couple-linked, single-payer (the dominant model).**
Paired, Lasting, Relish, Evergreen, Coral, Love Nudge. One person pays, both get
access, and the second partner is onboarded by invite code or link. Commercially
this halves your effective ARPU per active user but roughly doubles retention
pressure in your favor, because churn now requires two people to disengage. It
also creates the category's defining growth loop: the paying partner is your
distribution channel.

**Model B: couple-required session products.**
OurRitual, Ours. Price is per couple per month or per session, and the live human
is the product. These do not compete with content apps on features; they compete
on "is this actually going to work."

**Model C: single-user, no linking.**
Gottman Card Decks. Free, no accounts, no sync. Notably the only one in the set
that is entirely free, which is not a coincidence: without a linked account there
is no relationship graph to retain against, so there is nothing durable to charge
for.

The strategic reading: **couple-linking is what makes a subscription defensible,
and it is also what makes the product fragile.** Every couple-linked app in this
list has the same structural weakness, which is that the product degrades or dies
if the second partner never joins. None of the marketing pages I read
acknowledges that risk, and none of them describes what the product does for a
person whose partner has not joined yet or will not join at all.

---

## The therapy price anchor

Everyone in this category anchors against couples therapy, so the anchor needs to
be real.

Thriveworks, a national therapy provider publishing its own rates, states that
most providers charge **between $150 and $250 per session** out of pocket, that
Thriveworks' own couples sessions run $160 to $240 depending on state, that
insurance copays typically run $20 to $50 per session, and that individual therapy
averages $143 per session. Published 2025-11-06.
Source: https://thriveworks.com/help-with/beginning-therapy/how-much-is-couples-therapy/

Note the bias direction: this is a therapy provider quoting therapy prices, so it
is a source with an interest in the number being respectable rather than low. It
is still the best-sourced figure I found, and it is corroborated in range by Ours'
own $150 to $200 per session pricing. It is a defensible anchor precisely because
both a large provider and a direct-to-consumer competitor land in the same band.

Practical implication: a single couples therapy session at the low end of that
range costs more than an entire year of Paired at most of its annual SKUs. That
comparison is true, verifiable, and does not require exaggeration.

---

## Where a new entrant can honestly position

Five openings, ranked by how defensible they are and how honestly they can be
claimed.

**1. Say the true thing about therapy that nobody says.**
The category is stuck between two dishonest poses: apps that call themselves
"counseling" while disclaiming counseling in the fine print (Lasting is the clear
example), and apps that front therapists in marketing but disclaim them in the
App Store description (Paired). Neither is a lie exactly, but both are engineered
to be misread. A product that says plainly, on the paywall and in the store
listing, "this is an educational tool, it is not therapy, and here is when you
should see a real therapist instead" is making a claim no competitor is currently
willing to make. That honesty is a differentiator precisely because it costs
something to say.

**2. Price against the gap, not against the app category.**
The honest arithmetic is that one therapy session costs $150 to $250, and the
median relationship app costs $40 to $100 a year. A new entrant does not need to
claim it replaces therapy. It can claim the far more defensible thing: that most
couples do not go to therapy at all, and the realistic alternative to this app is
nothing, not a therapist. That framing is true and it does not require
denigrating therapy or overselling the app.

**3. Solve the second-partner problem out loud.**
Every couple-linked competitor quietly depends on the partner joining, and none
of them tells you what happens if they do not. An app that works genuinely well
for one person alone, and gets better rather than merely unlocked when a partner
joins, addresses the single biggest failure mode in the category. This is also
the honest answer for people whose partner is not ready, which is a large and
completely unserved segment.

**4. Do not build the paywall on prompts.**
Gottman gives away 1,000+ research-backed cards for free. Love Nudge gives away
its core loop. Any paywall whose main value proposition is "good questions" is
priced against zero and will lose. The paid layer has to be something free content
cannot do: continuity, structure over time, shared state between two people,
progress that persists, or repair after a specific conflict.

**5. Inclusivity is currently an open lane, not a checkbox.**
The verified positioning language in this category is overwhelmingly
marriage-framed: Lasting's App Store name is "Lasting: Marriage & Couples", its
marketing testimonial is "This app saved our marriage", and Ours sells
"premarital counseling." A product built for all committed relationships,
including unmarried, non-cohabiting, and same-sex partners, is not just ethically
better positioned, it is addressing a segment the incumbents' own copy actively
signals away from.

### Figures safe to state publicly

Two, both verifiable:

- **"Couples therapy typically costs $150 to $250 per session out of pocket."**
  Source: Thriveworks, published 2025-11-06,
  https://thriveworks.com/help-with/beginning-therapy/how-much-is-couples-therapy/
  Corroborated by Ours' own published rates of $150 to $200 per session.

- **"The Gottman Institute gives away 22 card decks and more than 1,000
  relationship prompts for free."**
  Source: https://www.gottman.com/couples/apps/

### Figures NOT safe to state publicly

- Paired's "4 million couples" and "89% see positive changes in 3 months." Both
  are self-reported vendor marketing with no published methodology.
- Any single "the price of Paired/Lasting/Coral is $X." These are SKU ranges under
  active price testing. Quote a range or say pricing is personalized.
- Relish funding or revenue figures. Third-party aggregator estimates only.
- OurRitual monthly pricing. Not published; third-party figures do not reconcile.

### Re-verification note

Pricing in this category changes frequently and is personalized per user. Every
figure here should be re-checked before it goes into shipped store copy or a
paywall screen. Blueheart's activity status in particular needs confirmation
before it is used in any comparison.

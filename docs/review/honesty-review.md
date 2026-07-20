# Honesty review: fact-check of Mend research briefs

Reviewer pass run **2026-07-20**. Every URL in this document was fetched or searched on
2026-07-20 unless the row says otherwise.

Scope: `docs/research/counseling-prices.md`, `competitor-pricing.md`, `frameworks.md`,
`gamification.md`, `milestones.md`, `relationship-taxonomy.md`, `safety-across-types.md`.

Status vocabulary:

- **Verified**: I fetched or searched the cited source myself on 2026-07-20 and the source
  says what the brief says it says.
- **Unverified**: the brief cites a source, but I did not independently confirm the number
  against that source in this pass. Not an accusation of fabrication. It means the claim is
  not yet publication-ready under the "cite a source URL and date" rule.
- **Wrong**: the cited source does not support the claim, or the claim is factually
  incorrect as written.

**Headline count: 33 claims are Unverified or Wrong.** 5 Wrong, 28 Unverified.
Of the 5 Wrong, **one is a crisis-resource defect and is the highest-priority fix in this
document** (row S9b, LGBT National Youth Talkline hours).

---

## Part 1. Crisis resources in safety-across-types.md

This section was checked line by line, because a wrong crisis number is the worst possible
defect in the app. **15 resources checked. 13 fully verified, 1 wrong, 1 verified but
mislabeled.**

| # | Claim | Status | Evidence and URL | Required action |
|---|---|---|---|---|
| S1 | National Domestic Violence Hotline: call 1-800-799-7233, text START to 88788, chat at site, 24/7 | **Verified** | Site states "1.800.799.SAFE (7233)", "Text 'START' to 88788", "Chat live now". https://www.thehotline.org (fetched 2026-07-20) | Ship as written. |
| S2 | love is respect: call 1-866-331-9474, text LOVEIS to 22522, chat, 24/7/365 | **Verified** | Org's own contact page states "1-866-331-9474", "Text 'LOVEIS' to 22522", "24/7/365". https://www.loveisrespect.org/get-relationship-help-24-7-365/ (fetched 2026-07-20) | Closes open item 1 in the brief. Use the 866 number. Some third-party directories publish 1-800-331-9474 (e.g. stopitnow.org); the org's own site says 866. Do not copy third-party listings. |
| S3 | StrongHearts Native Helpline: 1-844-762-8483, 24/7, confidential | **Verified** | Site states "1-844-762-8483" / "1-844-7NATIVE", 24/7 for call and text. https://strongheartshelpline.org (fetched 2026-07-20) | Ship as written. |
| S4 | The Deaf Hotline: videophone 1-855-812-1001, email nationaldeafhotline@adwas.org, 24/7 | **Verified** | thedeafhotline.org states "Free, Confidential, 24/7 ASL Hotline at 855-812-1001". ADWAS states "Deaf people can call 855-812-1001 or email NationalDeafHotline@adwas.org" and "Deaf advocates at ADWAS answer videophone calls and emails 24/7". https://www.thedeafhotline.org/ and https://www.adwas.org/hotline/national/ (2026-07-20) | Ship. Closes open item 2 for this entry. Prefer the org's own casing, NationalDeafHotline@adwas.org. |
| S5 | RAINN: call 1-800-656-4673 (HOPE), text HOPE to 64673, chat, 24/7, English and Spanish | **Verified** | RAINN's own pages state "800.656.HOPE (4673)", "Text 'HOPE' to 64673", "Chat at RAINN.org/hotline", free/confidential/24-7, English and Spanish. https://rainn.org/help-and-healing/hotline/ (searched 2026-07-20; rainn.org still blocks automated fetch) | Closes open item 2 for RAINN. Ship. |
| S6 | The Trevor Project: 1-866-488-7386, text START to 678-678, chat, 24/7/365 | **Verified** | Page states "Call us at 1-866-488-7386", "Text 'START' to 678-678", "24/7/365, nationwide, 100% free & confidential". https://www.thetrevorproject.org/get-help/ (fetched 2026-07-20) | Ship as written. |
| S7 | Trans Lifeline: 1-877-565-8860. Brief marks hours **UNVERIFIED** and says do not claim 24/7 | **Verified, and hours now resolved** | Org's hotline page states "US (877) 565-8860", "CAN (877) 330-6366", and hours "10 AM to 6 PM Pacific" Monday through Friday (1 PM to 9 PM Eastern). https://translifeline.org/hotline/ (fetched 2026-07-20) | Closes open item 4. The brief's instruction not to claim 24/7 was correct. **Add the stated hours and the Canada number.** Never place Trans Lifeline where a user will read it as a 24/7 option. |
| S8 | LGBT National Hotline: 1-888-843-4564, all ages, 11am to 8pm Pacific Monday to Friday, 9am to 2pm Pacific Saturday | **Verified** | Third-party listing quoting the org verbatim: "Hotline and online chat hours are 11 am to 8 pm Pacific Monday through Friday and 9 am to 2 pm Pacific on Saturdays." https://www.rmvictimlaw.org/programs-services/linc/resources/glbt-national-help-center (fetched 2026-07-20). Corroborated by https://lgbtq.unc.edu/resources/lgbt-national-help-center/ ("Mon-Fri 2pm-11pm and Sat 12pm-5pm" Eastern, which converts to the same window). lgbthotline.org itself still returns HTTP 403 to automated fetch. | Ship the number and these hours. |
| **S9b** | **LGBT National Youth Talkline: 1-800-246-7743, "4pm to midnight Pacific Monday to Friday and noon to 5pm Pacific Saturday"** | **WRONG** | The number is correct. **The hours are not.** Both independent listings of the org's published hours give a single hours block for all its lines: 11am to 8pm Pacific weekdays and 9am to 2pm Pacific Saturday. The brief's "4pm to midnight" and "noon to 5pm" match the **Eastern** clock (12pm to 5pm ET Saturday), mislabeled as Pacific. Sources: https://www.rmvictimlaw.org/programs-services/linc/resources/glbt-national-help-center and https://lgbtq.unc.edu/resources/lgbt-national-help-center/ (both 2026-07-20) | **Fix before anything ships.** A young LGBTQ+ user calling at 11pm Pacific on the brief's stated hours reaches nothing. Correct to 11am to 8pm Pacific Monday to Friday, 9am to 2pm Pacific Saturday, **and re-confirm by loading lgbthotline.org in a browser**, since the org's own site is unreadable to automated fetch and its hours change. If the hours cannot be confirmed by hand, publish the number with "hours vary, see lgbthotline.org" rather than a wrong window. |
| S9c | LGBT National Help Center lines listed in the brief are complete | **Unverified (incomplete)** | The org also runs a Senior Hotline 1-888-234-7243 and a Coming Out Support Hotline 1-888-688-5428 (888-OUT-LGBT), plus chat at lgbthotline.org/chat. Source as S8. | Optional addition. Not a defect, but the Senior Hotline is relevant to the long-together and later-life relationship types in relationship-taxonomy.md. |
| S10 | WomensLaw.org: "Email hotline and chat via the site", NNEDV project, licensed attorneys, English and Spanish, serves anyone regardless of gender or relationship status | **Verified, but mislabeled** | NNEDV confirms the email hotline, attorney review, English and Spanish, and that it serves all victims regardless of gender. It also states: "You can expect to receive a response within 1-5 business days." https://nnedv.org/content/womenslaw/ and https://hotline.womenslaw.org/public (searched 2026-07-20; womenslaw.org still returns 403 to automated fetch) | **Add "response in 1 to 5 business days" wherever this appears.** The word "hotline" in its name will read as immediate help. Listing it beside 24/7 crisis lines without that qualifier is a safety-relevant labeling error. Closes open item 2 for WomensLaw. |
| S11 | 988 Suicide and Crisis Lifeline: call or text 988, chat at chat.988lifeline.org, 24/7/365 | **Verified** | Site lists call 988, text 988, chat https://chat.988lifeline.org/, deaf and hard-of-hearing page. No "press 3" option appears anywhere on the page. https://988lifeline.org (fetched 2026-07-20) | Ship as written. |
| S12 | "Do not reference press 3 or text PRIDE." LGBTQ+ specialized routes terminated 2025-07-17 | **Verified, and still correct today, but the brief is missing a live development** | Termination on 2025-07-17 confirmed (SAMHSA statement; CNN 2025-07-17; The Trevor Project). **New since the brief was written:** the administration has said it will restore the Press 3 option by the end of 2026, with $33.1M appropriated in FY2026, and as of July 2026 the service is still not live. Sources: https://www.cnn.com/2026/06/26/health/988-lgbtq-hotline, https://www.statnews.com/2026/06/26/988-lgbtq-hotline-relaunch-trevor-project/, https://19thnews.org/2026/07/988-hotline-lgbtq-youth-trump/ (all 2026-07-20) | **Keep the ban on "press 3" copy. It is still correct.** Add a dated re-check note: if the route relaunches, the app's LGBTQ+ routing changes. Route to Trevor and Trans Lifeline in the meantime, as the brief already says. |
| S13 | Crisis Text Line: text HOME to 741741. Brief marks **UNVERIFIED this session** | **Verified** | Site states "Text HOME to 741741", plus "Text HOME or HOLA to 741741" for Spanish, WhatsApp, and chat at connect.crisistextline.org/chat, described as "free, 24/7, confidential". https://www.crisistextline.org (fetched 2026-07-20) | Closes open item 3. Ship. Consider adding HOLA for Spanish speakers. |
| S14 | Find A Helpline: verified directory of free crisis lines by country. Brief marks **UNVERIFIED this session** | **Verified** | Site is "Free emotional support in 130+ countries", a public service by ThroughLine, with verified helplines across 175+ countries. https://findahelpline.com/ (searched 2026-07-20; site returns 403 to automated fetch) | Closes open item 3. Ship. |
| S15 | National Immigration Legal Services Directory: free or low-cost nonprofit immigration legal help, searchable by state, county, zip, or detention facility, IAN and Scale Justice under Pro Bono Net | **Verified** | Site states "Only nonprofit organizations that provide free or low-cost immigration legal services are included in this directory" and "a joint project of the Immigration Advocates Network and Scale Justice". https://www.immigrationadvocates.org/legaldirectory/ (fetched 2026-07-20) | Ship as written. |
| S16 | Esperanza United: 24-hour bilingual crisis line 1-651-772-1611, Minnesota-based, refers callers elsewhere to the National DV Hotline | **Verified, with a URL correction** | "call Esperanza United's confidential 24-hour bilingual crisis line at 651-772-1611. If you are outside of Minnesota, you can contact the National Domestic Violence Hotline." https://esperanzaunited.org/en/get-help-now/ (searched 2026-07-20) | Content correct, including the brief's regional framing. **Change the citations from casadeesperanza.org to esperanzaunited.org**, which is the current brand and current live site. |
| S17 | Safety Net Project at techsafety.org, run by NNEDV, survivor guides on stalkerware, accounts, devices, location, connected cars, image-based abuse, data brokers | **Verified** | Site states "Managed by the Safety Net Project at the National Network to End Domestic Violence (NNEDV)" and carries all the listed guide categories plus a QUICK EXIT control. https://www.techsafety.org/resources-survivors (fetched 2026-07-20) | Ship as written. |

### Clinical assertions behind the gate (safety-across-types.md)

| # | Claim | Status | Evidence and URL | Required action |
|---|---|---|---|---|
| S18 | CDC defines IPV to include "current and former spouses and dating partners" | **Verified** | CDC: "intimate partner refers to both current and former spouses and dating partners." https://www.cdc.gov/intimate-partner-violence/about/index.html (searched 2026-07-20; cdc.gov returns 403 to automated fetch, confirmed via indexed CDC text and https://www.restoredcdc.org/www.cdc.gov/intimate-partner-violence/about/index.html) | Safe to publish with attribution, as the brief recommends. |
| S19 | "Nearly 1 in 4 adult women and about 1 in 7 adult men report having experienced severe physical violence from an intimate partner" | **Verified as CDC page text, but the underlying survey has been superseded** | CDC page text confirmed as searched 2026-07-20. **However, CDC has since published NISVS 2023/2024** (data collected Sep 2023 to Sep 2024, n=15,609), and CDC explicitly states that "comparing 2023/2024 findings to NISVS findings from previous data years is not advised." https://www.cdc.gov/nisvs/media/pdfs/intimatepartnerviolence-brief.pdf and https://vawnet.org/material/national-intimate-partner-and-sexual-violence-survey-20232024-intimate-partner-violence | **Before this goes into public marketing, load the CDC About page by hand and confirm the sentence is still there.** If CDC has refreshed it against NISVS 2023/2024, quote the new figure. Do not blend old and new NISVS numbers. |
| S20 | Gottman Institute, verbatim: "When battery is present, couples therapy is inappropriate" | **Verified** | Exact sentence present on the Gottman Institute's own page, along with the situational vs characterological distinction the brief describes. https://www.gottman.com/blog/v-is-for-violence/ (fetched 2026-07-20) | Ship. Strongest single citation supporting the gate. |
| S21 | APA: IPV assessment "should be done with each partner separately and privately to promote safety and honest disclosures" | **Verified** | Exact sentence present. https://www.apa.org/pubs/highlights/spotlight/issue-270 (fetched 2026-07-20) | Ship. This is the honest argument for the gate and the brief's 10.4 copy is fully supported. |
| S22 | CDC 2023 YRBS teen dating-violence percentages (10.4%, 5.9%, 9.3/2.9, 11.4/9.3, 11.6/4.3, 16.2/7.8) | **Unverified** | Cited to https://www.cdc.gov/yrbs/dstr/index.html but not independently confirmed in this pass; cdc.gov blocks automated fetch. | The brief already rules these out of app copy. Keep them out. No action needed unless they are ever proposed for publication, in which case load the YRBS report by hand. |
| S23 | "Most female (69%) and male (53%) IPV victims had their first experience before age 25" | **Unverified (second-hand)** | Cited to The Hotline's statistics page summarizing CDC NISVS, not to CDC. https://www.thehotline.org/stakeholders/domestic-violence-statistics/ | Do not publish. If ever needed, source it to the CDC NISVS report directly. |
| S24 | NISVS 2010 sexual-orientation prevalence: 61.1% bisexual women, 43.8% lesbian women, 35.0% heterosexual women | **Unverified, and 16-year-old data** | Cited to CDC archive and stacks.cdc.gov, not independently confirmed. | The brief already says do not publish these, and calls quoting them at LGBTQ+ users "othering." Agreed. Keep out. |
| S25 | Williams Institute: transgender lifetime IPV 31.1% to 50.0%; 31.1% vs 20.4% cisgender | **Unverified** | Cited to https://williamsinstitute.law.ucla.edu/publications/ipv-sex-abuse-lgbt-people/, not independently confirmed. | Keep out of app copy per the brief's own rule. |
| S26 | NNEDV: financial abuse occurs in 99% of DV cases | **Unverified, and correctly ruled out** | Cited to https://nnedv.org/content/about-financial-abuse/. The brief correctly counters it with a peer-reviewed 76% to 99% service-population range. | No action. The brief's judgment ("I would not put 99% in shipped app copy") is right. Hold it. |
| S27 | NISVS 2016/2017 stalking: 13.5% of women, 5.2% of men stalked by an intimate partner | **Unverified (second-hand) and superseded** | Cited via NNEDV rather than CDC. NISVS 2023/2024 stalking data brief now exists. https://vawnet.org/material/national-intimate-partner-and-sexual-violence-survey-20232024-stalking-data-brief | Do not publish. Not needed for any shipped copy. |
| S28 | Couple-therapy-for-IPV meta-analysis: six randomized trials, 470 participants, findings apply only to "mild to moderate situational couple violence" | **Unverified** | Cited to https://pmc.ncbi.nlm.nih.gov/articles/PMC5050084/, not independently confirmed in this pass. | The qualifier is the load-bearing part and it is directionally consistent with the verified APA and Gottman sources. Confirm the n and trial count by hand before any public use. Never publish the "modest significant reduction" half without the qualifier. |

---

## Part 2. counseling-prices.md

| # | Claim | Status | Evidence and URL | Required action |
|---|---|---|---|---|
| C1 | Thriveworks: "most providers charge between $150 and $250 per session when paying out of pocket" | **Verified** | Exact phrasing confirmed on page, publication date November 6, 2025. https://thriveworks.com/help-with/beginning-therapy/how-much-is-couples-therapy/ (fetched 2026-07-20) | Ship with attribution and date. Disclose that Thriveworks is a therapy provider quoting therapy prices, as the brief already notes. |
| C2 | Thriveworks own couples rate $160 to $240 by state | **Verified** | "couples therapy sessions typically range from $160 to $240, depending on your state." Same URL and date. | Ship. |
| C3 | Grow Therapy: "$75 to $250 per session, with most couples paying about $100 a session", page updated Jun 24 2026 | **Verified** | "Marriage counseling costs $75-$250 per session, with most couples paying around $100 per session." Page update date June 24, 2026. https://growtherapy.com/blog/how-much-does-marriage-counseling-cost/ (fetched 2026-07-20) | Ship. |
| **C4** | **"The defensible in-person range is roughly $100 to $250 per session" (Bottom line, item 2)** | **Wrong as attributed** | Neither cited source publishes a $100 to $250 band. Thriveworks publishes $150 to $250; Grow publishes $75 to $250 with a $100 mode. $100 to $250 is a blended figure with no source behind it, and it silently drops Grow's $75 floor. | Rewrite. Either "$75 to $250 per session, with most couples paying $100 to $250 (Grow Therapy, Jun 24 2026; Thriveworks, Nov 6 2025)" or quote one source's range and attribute it. The brief's own "Recommended safe public claims" section already does this correctly at $150 to $250; the Bottom line contradicts it. |
| C5 | Course of 8 to 20 sessions (Thriveworks); 12 to 20 (Grow) | **Verified** | Thriveworks: couples "attend anywhere from eight to 20 sessions." Grow: "most couples need 12 to 20 therapy sessions." Both fetched 2026-07-20. | Ship. |
| C6 | Total course roughly $1,200 to $5,000 | **Verified as arithmetic on verified inputs** | 8 x $150 = $1,200; 20 x $250 = $5,000. Grow independently states $1,200 to $2,000 typical and "up to 50 sessions ... pushing the cost to about $5,000". | Ship. This is the strongest public claim in the pricing brief. |
| C7 | Insurance: CPT 90847, identified patient with a DSM-5 diagnosis, "typically something more than a V or Z code", not covered when the purpose is relationship growth | **Verified** | All four phrases confirmed on page. https://www.simplepractice.com/blog/billing-couples-family-therapy/ (fetched 2026-07-20) | Ship the brief's plain-language paraphrase. Keep the brief's rule: never say "insurance doesn't cover couples therapy." |
| C8 | Copay $20 to $50 and coinsurance 20 to 40 percent (Thriveworks); copay $30 to $50 (Grow) | **Verified** | Both confirmed on their pages 2026-07-20. | Ship with per-source attribution. |
| C9 | Talkspace couples therapy $109 per week, four 30-minute video sessions per month for both partners plus unlimited messaging; additional sessions $69 | **Verified** | Talkspace pricing page lists Couples Therapy Video + Messaging at "$109/week", "Up to four 30 minute video sessions/month for you and your partner", and "$69/session" for additional sessions. https://www.talkspace.com/pricing (fetched 2026-07-20) | Ship. Always state the 30-minute session length, per the brief's own rule. |
| C10 | Regain "$70 to $100 per session", billed monthly, one weekly live session plus messaging, one subscription covers the couple | **Verified** | Page states "$70-$100 per session" billed "on a monthly basis", includes "a weekly session" plus in-app messaging. Page updated November 5, 2025. https://www.regain.us/advice/therapist/how-much-does-regain-cost/ (fetched 2026-07-20) | Ship, and preserve the unit. Regain publishes **per session**, not per week. |
| C11 | Regain: "Most insurance carriers don't currently cover couples therapy at Regain or other online therapy companies" | **Verified in substance, quote is loose** | Page as fetched 2026-07-20 reads: "Most online therapy companies don't accept insurance for couples therapy at this time." | Fix the quotation marks. Do not present the brief's wording as a verbatim Regain quote. |
| C12 | BetterHelp "$70 to $100 per week or $260 to $400 per month", page updated Jul 8 2026, and BetterHelp does not offer couples therapy | **Verified** | Page states "$70-$100 per week", "$260 to $400 per month", "Online couples therapy is available through BetterHelp's sister site, Regain." Updated July 8, 2026. https://www.betterhelp.com/advice/general/how-much-does-betterhelp-cost/ (fetched 2026-07-20) | Ship. **Never list BetterHelp in a couples-pricing comparison without the sentence that it does not offer couples therapy.** |
| C13 | Open Path Collective: one-time $65 membership; couples and family $40 to $80 per session; individual $40 to $70; interns flat $30; one membership covers a couple | **Verified** | Confirmed against Open Path's own eligibility and pricing pages: one-time $65 membership, couples and family sessions $40 to $80, single membership for a couple. https://openpathcollective.org/pricing-and-eligibility-for-affordable-therapy/ (searched 2026-07-20; site still 403s to automated fetch) | Upgrade from "medium-high confidence" to verified for the membership fee and the couples range. The $30 intern rate and the $40 to $70 individual rate were not separately confirmed in this pass; leave those as unverified. |
| C14 | Ours (withours.com): $50 first session, $150 to $200 ongoing, 50-minute sessions, insurance quote | **Unverified** | withours.com was unreachable to me as well on 2026-07-20. Nothing in this pass changes the brief's own "verify by hand before publishing" note. | Do not publish any Ours figure until someone loads the page in a browser. It appears in two briefs (see P3), so fixing it once fixes both. |
| C15 | SimplePractice: national average therapy session rate $139 (2024), $123 (2019), methodology of 104,679,056 session fees across ~204,000 therapists; state highs and lows | **Unverified** | Cited to https://www.simplepractice.com/blog/average-therapy-session-rate-by-state/, not independently confirmed in this pass. | The brief's critical caveat is correct and essential: this is individual psychotherapy CPT codes only, not couples. Keep the caveat attached or drop the figure. |
| C16 | Council for Relationships interns "$20 to $90 per hour" | **Unverified in this pass** | Cited to https://councilforrelationships.org/fees. The brief says it read this page directly and rates it high confidence; I did not re-fetch. | Re-check once before publication, then ship. |
| C17 | Grow Therapy / YouGov couples survey: 11% cite insurance cost, 52% rank affordability highly, 2,514 US adults, fielded Dec 18 to 22 2025 | **Unverified** | Cited to https://growtherapy.com/blog/couples-therapy-survey/, not independently confirmed. | If published, disclose that the survey was commissioned by a therapy company, as the brief instructs. |
| C18 | KFF / Peterson-KFF cost-barrier figures (6%, 4%, 7%, 23%) | **Unverified** | Cited to healthsystemtracker.org and kff.org, not independently confirmed. | Confirm before use. Low risk: the brief uses these to debunk fabricated stats rather than to make a claim. |
| C19 | The "41% of couples cite cost as a barrier (KFF, 2021)" and "35% ... (Pew, 2022)" figures are fabricated | **Verified as a judgment, and I concur** | I found no KFF or Pew publication matching either figure. The brief's finding stands. | **Enforce the ban.** These circulate widely and will resurface in drafts. |
| C20 | SAMHSA National Helpline 1-800-662-4357, 24/7, and findahealthcenter.hrsa.gov | **Unverified in this pass** | Cited to samhsa.gov and hrsa.gov, not re-fetched. | This is a helpline number appearing in a safety guardrail. **Verify by hand before it ships**, to the same standard as Part 1. |

---

## Part 3. competitor-pricing.md

The brief's central methodological point, that App Store in-app-purchase lists are SKU dumps
and not prices, is correct and it protects almost every row in the table. No competitor
price in this brief should ever be quoted as a single number.

| # | Claim | Status | Evidence and URL | Required action |
|---|---|---|---|---|
| P1 | All App Store SKU ranges for Paired, Lasting, Evergreen, Coral, Blueheart, Love Nudge | **Unverified** | Cited to individual apps.apple.com listings; not re-fetched in this pass. | Low risk because the brief forbids quoting single numbers from them. Keep that rule. Re-check before any comparison ships. |
| P2 | Thriveworks anchor: $150 to $250 per session, $160 to $240 Thriveworks own, copay $20 to $50, individual therapy averages $143 | **Verified** | All four confirmed on the Thriveworks page 2026-07-20, including "$143 per session" for individual therapy. | Ship. **But note the cross-document conflict:** counseling-prices.md uses SimplePractice's $139 as the individual-therapy national average while this brief uses Thriveworks' $143. Two different numbers for the same concept in two Mend documents. Pick one, label it precisely, and use it everywhere. |
| P3 | Ours: ~$200 standalone, ~$150 on a 4-session plan, $50 first session, 50-minute sessions, ~25% package savings | **Unverified** | Same unreachable vendor site as C14. | Same action as C14. This is the only "real therapy" price anchor in the brief, so it is load-bearing and it is unconfirmed. |
| P4 | Relish $99.99 for six months covering 2 people | **Unverified** | Cited to https://hellorelish.com/faqs/ surfaced via search; the brief notes hellorelish.com did not render pricing on fetch. | Do not publish. Present as "not publicly listed" until a vendor page is loaded by hand. |
| P5 | Talkspace acquired Lasting effective 2020-11-01 for $10.7M cash | **Unverified** | Cited to a BusinessWire release; not independently confirmed. | Confirm before using in any public comparison. It is the basis of the brief's "Lasting is Talkspace" framing. |
| P6 | Gottman Card Decks are free, 22 decks, 1,000+ cards, no in-app purchases | **Unverified** | Cited to apps.apple.com and gottman.com/couples/apps/; not re-fetched. | The brief lists this among "figures safe to state publicly." **Verify by hand first.** It is a claim about a named third party's product and pricing, which is exactly the kind of claim that must not be wrong in public. |
| P7 | Paired "4 million couples", "89% see positive changes in 3 months"; Coral "over 300,000 users", "$4M+ raised"; Relish funding and revenue; OurRitual monthly pricing | **Unverified, and correctly ruled out** | All identified by the brief as self-reported vendor marketing or third-party aggregator estimates. | No action. Keep the ban. |
| P8 | Blueheart may be dormant | **Unverified by design** | The brief itself cannot confirm active development. | Do not include Blueheart in any shipped comparison until status is confirmed. |

---

## Part 4. frameworks.md

This is the most rigorous document in the set. It already runs a three-tier system and a
do-not-say list, and its Tier C rulings (divorce prediction accuracy, the 5:1 ratio, the
86/33 turning-toward pair) are correct and should be treated as binding across the whole
project.

| # | Claim | Status | Evidence and URL | Required action |
|---|---|---|---|---|
| **F1** | **Irvine et al. infidelity RCT cited as "Journal of Family Psychotherapy, 2024", 49 couples randomized** | **Wrong (citation), and materially incomplete** | The paper is published in **The Family Journal**, volume 32, issue 1, pages 81 to 94, 2024. The DOI in the brief (10.1177/10664807231210123) is The Family Journal's. Also: 49 couples participated but **only 19 completed all pre- and post-treatment assessments.** https://journals.sagepub.com/doi/10.1177/10664807231210123 and https://scholars.nova.edu/en/publications/a-pilot-study-examining-the-effectiveness-of-gottman-method-coupl/ (2026-07-20) | Fix the journal name. **Add the 19-completer figure**, because "49 couples randomized" reads far stronger than the evidence is. The brief's existing developer-allegiance caveat is correct and should stay. |
| F2 | Heyman and Smith Slep cross-validation collapse: 90% to 69% accuracy, sensitivity 92% to 46%, PPV 65% to 29%, 21% at a 16% base rate | **Unverified** | Cited to https://pmc.ncbi.nlm.nih.gov/articles/PMC1622921/, not independently confirmed. | The **ruling** that follows it ("Mend must never state or imply that any behavior, quiz, or pulse score predicts whether a relationship will end") is correct regardless of the exact numbers and must hold. Confirm the numbers before any of them appear in public writing. |
| F3 | Bradbury and Bodenmann derived figures: 80% / mean d = 0.84; 60 to 80 percent benefit; naturalistic 48/18/21/13 percent at termination, N = 130 | **Unverified** | Cited to a PDF at marriage.psych.ucla.edu, not independently confirmed. | These drive the "13 percent deteriorate" argument for keeping off-ramps prominent, which is a good product decision on its own. Verify before publishing any of the percentages. |
| F4 | Zahl-Olsen et al. 2024, JMFT 50(4) 882 to 898, 490 program and 242 comparison participants, Norway, propensity score matching | **Unverified** | Cited to https://pubmed.ncbi.nlm.nih.gov/38961585/, not independently confirmed. | This is called "the most directly relevant finding in the whole brief." It is therefore the single most important citation in frameworks.md to confirm by hand. The brief's own caveat (matched design, not randomized, so suggestive not causal) must travel with it everywhere. |
| F5 | Spengler et al. EFT meta-analysis d values (0.93, 0.44, 0.86) | **Unverified** | Cited to ovid.com, not independently confirmed. | The brief already notes the d = 0.44 comes from EFT-affiliated researchers and not from head-to-head randomized trials. Keep that caveat. |
| F6 | Christensen 5-year follow-up: d = 1.03 vs 0.92, 50.0% vs 45.9% clinically significant improvement, 25.7% vs 27.9% | **Unverified** | Cited to https://pubmed.ncbi.nlm.nih.gov/20350033/, not independently confirmed. | Confirm before public use. |
| F7 | Doss OurRelationship RCT: 300 couples, satisfaction d = 0.69, and the companion effect sizes | **Unverified** | Cited to https://pubmed.ncbi.nlm.nih.gov/26999504/ (also cited in milestones.md), not independently confirmed. | **This is the one figure milestones.md nominates for public use.** It must be confirmed against the paper before it appears anywhere public. The brief's framing rule is right: it is evidence that structured self-guided programs can help in general, never a claim about Mend. |
| F8 | Relationship-education effect sizes: Hawkins and Erickson d = 0.06 across 22 tests with stability d = 0.00; Arnold and Beelmann d = 0.11 / 0.12; Supporting Healthy Marriage N = 6,298 with mean d = 0.09 | **Unverified** | All reported via Bradbury and Bodenmann, not from the primary papers. | These support the strategic recommendation to build for already-distressed couples, which is sound. Verify before publishing any number. |
| F9 | Todahl and Walters: IPV prevalence "as high as 74 percent in some samples" among therapy-seeking populations | **Unverified** | Cited to https://pubmed.ncbi.nlm.nih.gov/21745237/, not independently confirmed. | Confirm before use. The conclusion it supports, that the gate does work clinicians are documented to skip, is separately supported by the verified APA and Gottman sources (S20, S21). |
| F10 | The Tier C do-not-say list, including "predicts divorce with 90+ percent accuracy", the 5:1 magic ratio as causal, the 86/33 pair, and "this app will save your relationship" | **Verified as sound policy** | The 86/33 pair in particular: I also found no primary peer-reviewed source, only Gottman Institute materials and press coverage. | **Treat this list as binding across every Mend document and surface.** See M1 below, where milestones.md violates it. |

---

## Part 5. milestones.md

| # | Claim | Status | Evidence and URL | Required action |
|---|---|---|---|---|
| **M1** | **"couples still together had turned toward each other's small bids for attention about 86% of the time, while couples who divorced averaged about 33%", from 130 newlywed couples at six-year follow-up** | **Wrong to include, and internally contradictory** | frameworks.md section 2.3 rules this exact pair unverifiable and states "**Do not print these numbers in the app.**" milestones.md prints them, sourced to gottman.com and a CNN article, neither of which is a primary peer-reviewed report of those percentages. My own search found no primary source either. https://www.gottman.com/blog/turn-toward-instead-of-away/ | **Delete the percentages from milestones.md** and keep only the practice ("turning toward bids predicts outcomes; teach it as a behavior, not a statistic"). Two Mend research briefs currently give opposite instructions on the same number. Resolve in favor of frameworks.md. The "130 newlywed couples" sample description carries the same sourcing problem. |
| M2 | 5:1 ratio original sample "reported as 73 couples" | **Unverified** | Cited to a therapist blog (therapydave.com) summarizing methodology, not to the primary paper. | Drop the sample size or source it primarily. The brief's own conclusion ("Mend should never display a running ratio") is correct and independently supported by frameworks.md's Cook et al. citation. |
| M3 | Lally et al.: 96 people, 12 weeks, median 66 days to 95% of maximum automaticity, range 18 to 254, roughly half did not plateau | **Unverified** | Cited to https://onlinelibrary.wiley.com/doi/abs/10.1002/ejsp.674, not independently confirmed. | Notable that the brief states this **correctly**, unlike the usual "66 days to form a habit" misquote. Confirm the numbers, then it is safe. The product consequence (forgiving streaks at 7, 21, 66) is good regardless. |
| M4 | "fewer than 4% of surveyed couple therapists reported consistently following universal screening guidelines" | **Unverified** | Cited to Hurless and Cottone via sagepub and a ResearchGate item, not independently confirmed. | Confirm before use. It is a strong claim about clinician behavior and it is doing rhetorical work for the gate. |
| M5 | Pepping, Halford and Doss: 136 couples, outcome predictable for about 70% by session 4 | **Unverified** | Cited to sciencedirect, not independently confirmed. | Confirm before use. Do not let it become an in-app prediction feature; frameworks.md F2 forbids prediction copy. |
| M6 | EFT: "roughly 70 to 75% of treated couples" recover, via Wiebe and Johnson | **Unverified** | Cited to a PDF hosted on a private practice site. counseling-prices.md separately notes the Wiebe and Johnson PDF would not parse. | Do not publish. Prefer the Spengler meta-analysis (F5) with its allegiance caveat. |
| M7 | "81% of marriages self destruct when men refuse to accept influence" listed as unverifiable | **Verified as a judgment, and I concur** | Widely circulated, no primary source located. | Keep the ban. |
| M8 | The nominated single public figure: OurRelationship RCT, 300 couples, 8-hour program, d = 0.69 | **Unverified** | Same as F7. | **Confirm against the paper before this appears in any marketing.** The brief's framing rule (evidence about structured programs generally, never a claim about Mend) is correct and must travel with it. Mend has no outcome data of its own and must never imply otherwise. |

---

## Part 6. gamification.md

| # | Claim | Status | Evidence and URL | Required action |
|---|---|---|---|---|
| G1 | "In 2019, 72% of women who accessed support from Refuge services identified experiencing tech abuse", service-user sample not a general-population rate | **Verified** | Refuge's own release confirms the figure and the January 2020 publication date. https://refuge.org.uk/news/72-of-refuge-service-users-identify-experiencing-tech-abuse/ (searched 2026-07-20) | Ship **only** with the "Refuge service users, UK, not a general-population rate" qualifier, exactly as the brief demands. |
| G2 | NISVS lifetime prevalence via The Hotline: 35.6% / 28.5% / 24.3% / 13.8% | **Unverified (second-hand) and now superseded** | Cited to The Hotline citing CDC, not to CDC. The brief itself flags this. NISVS 2023/2024 is now published and CDC advises against cross-year comparison. https://vawnet.org/material/national-intimate-partner-and-sexual-violence-survey-20232024-intimate-partner-violence | Do not publish. If a general-population IPV figure is ever needed, take it from the NISVS 2023/2024 brief and cite CDC directly. |
| G3 | Gamification in learning meta-analysis: g = 0.49 (CI 0.30 to 0.69, k = 19, N = 1686), g = 0.36, g = 0.25 | **Unverified** | Cited with full CI, k, and N, which is good practice, but not independently confirmed. | Confirm before public use. Internal design decisions can proceed. |
| G4 | Self-compassion meta-analysis: 45 articles, N = 13,558, r = 0.25 with motivation | **Unverified** | Cited, not independently confirmed. | Same as G3. |
| G5 | Technology-facilitated abuse scoping review characterization | **Unverified** | Cited to https://pubmed.ncbi.nlm.nih.gov/35537445/, not independently confirmed. | The design ruling it supports (no per-partner metric that can become a weapon; no variable or randomized rewards) is correct on its own and must not be weakened. |

The bans in this brief (B3: no variable, randomized, surprise, or mystery rewards; no
percentile or "only 3% of couples earn this" framing; no per-partner scoreboards) are
product-safety rules, not factual claims. They are sound and should be treated as binding.

---

## Part 7. relationship-taxonomy.md

| # | Claim | Status | Evidence and URL | Required action |
|---|---|---|---|---|
| T1 | Pew: among adults 18 to 44, 59% have lived with an unmarried partner, more than the 50% who have ever married | **Verified** | Pew analysis of the National Survey of Family Growth confirms 59% and 50%. https://www.pewresearch.org/short-reads/2019/11/06/key-findings-on-marriage-and-cohabitation-in-the-u-s/ (searched 2026-07-20) | Ship, **but label the year**. The Pew piece is from November 2019. Write "Pew Research Center, 2019, analyzing the National Survey of Family Growth." |
| T2 | BGSU NCFMR: 8% of people divorcing in 1990 were 50 or older; that share is now near 40% | **Verified** | "Only 8% of all persons divorcing in 1990 were aged 50 or older, while today the share is nearly 40%." https://www.bgsu.edu/ncfmr/resources/data/resources-by-topic/gray-divorce.html and https://www.bgsu.edu/news/2025/02/innovative-gray-divorce-research-from-bgsu-professors-draws-national-interest.html (searched 2026-07-20) | Ship with attribution to NCFMR at Bowling Green State University. |
| T3 | Pew: 17% of US newlyweds in 2015 married someone of a different race or ethnicity, up from 3% in 1967 | **Unverified in this pass, and aging** | Cited to Pew's 2017 "Intermarriage in the U.S. 50 Years After Loving v. Virginia". Well established, but I did not fetch it and the underlying year is 2015. | Confirm, and always state "2015" in the copy so the age of the figure is visible. |
| T4 | Pew Religious Landscape Study 2023-24: 74% of married US adults have a spouse of the same religion, 26% do not | **Unverified** | Cited to https://www.pewresearch.org/religion/2025/02/26/religious-intermarriage/, not independently confirmed. | Confirm before public use. |
| T5 | Pew: share of US adults under 50 without children who say they are unlikely to ever have children rose from 37% in 2018 to 47% in 2023; 57% cite "just don't want to" | **Unverified** | Cited to Pew, July 2024, not independently confirmed. | Confirm before public use. |
| T6 | 2024 Family Relations meta-analysis: 67 studies, 147 effect sizes, 24,542 individuals, minority stress negatively associated with relationship satisfaction in same-sex couples | **Unverified (abstract only, by the brief's own admission)** | Cited to https://onlinelibrary.wiley.com/doi/10.1111/fare.13068; the brief's source list states "full text was not accessible". | Do not publish the counts. The **direction** of the finding is safe to teach without numbers. |
| T7 | AARP and National Alliance for Caregiving 2020: 53.0 million unpaid caregivers, up from 43.5 million in 2015, 24% caring for more than one person | **Unverified, and possibly superseded** | Cited to caregiving.org and the AARP PDF, not independently confirmed. The report is from 2020 and a newer wave may exist. | Confirm and check for a newer edition before public use. |
| T8 | Reconciliation after marital separation spans roughly 12% to 44% across studies | **Unverified** | Cited to https://onlinelibrary.wiley.com/doi/10.1111/jomf.13024, not independently confirmed. | The brief's own rule ("Mend should not publish a single reconciliation rate") is correct. Hold it. Publishing the spread as a spread, if confirmed, is acceptable; publishing a point estimate is not. |
| T9 | The taxonomy makes no assumption of marriage, cohabitation, children, heterosexuality, or gender roles | **Verified by reading** | The taxonomy explicitly covers queer couples, differing outness, non-cohabiting, no-children-by-choice, consensually non-monogamous, interfaith, intercultural, caregiving, and later-life configurations, and it restates that the DV gate applies unchanged including that "coerced consent to an open relationship is coercion." | No action. This is compliant with the project rule and the DV gate language is correctly non-negotiable. |

---

## Part 8. Verdict on the five figures proposed for public use

Verified independently on 2026-07-20. **Two are correct, one needs a qualifier, two are
wrong.**

### 1. "Couples therapy costs $100 to $250 per session in the US"

**Correct in substance, wrong in precision. Do not publish as written.**

No source publishes a $100 to $250 band. The two defensible sources are:

- Thriveworks, published Nov 6 2025: "most providers charge between **$150 and $250** per
  session when paying out of pocket."
  https://thriveworks.com/help-with/beginning-therapy/how-much-is-couples-therapy/
- Grow Therapy, updated Jun 24 2026: "Marriage counseling costs **$75 to $250** per session,
  with most couples paying around **$100** per session."
  https://growtherapy.com/blog/how-much-does-marriage-counseling-cost/

There is no audited national average for couples therapy specifically. Anyone publishing a
precise national number is guessing.

**Use instead, verbatim:**

> Published rates for couples counseling in the US run from about $75 to $250 per session,
> with most couples paying $100 to $250 out of pocket.
> Sources: Grow Therapy, updated June 24 2026, and Thriveworks, published November 6 2025.

Disclose that both sources are therapy providers quoting therapy prices.

### 2. "A full course runs $1,800 to $7,500"

**Wrong. Do not publish.**

Nothing in the research supports either end. The verified arithmetic:

- Low end: 8 sessions x $150 = **$1,200** (Thriveworks: 8 to 20 sessions, $150 to $250)
- Grow Therapy's own independently stated low end: 12 sessions at about $100 = **$1,200**
- High end: 20 sessions x $250 = **$5,000**
- Grow Therapy's own stated ceiling for complex cases: up to 50 sessions, "about **$5,000**"

Both independent sources converge on $1,200 at the bottom and $5,000 at the top. $1,800
overstates the floor by 50 percent and $7,500 overstates the ceiling by 50 percent. Since
this figure is designed to make Mend look inexpensive by comparison, inflating it is exactly
the kind of error that reads as dishonest if anyone checks.

**Corrected figure:**

> A full course of in-person couples counseling typically runs eight to twenty sessions,
> which comes to roughly **$1,200 to $5,000** out of pocket.
> Sources: Thriveworks, November 6 2025; Grow Therapy, updated June 24 2026.

### 3. "Insurance usually does not cover couples counseling because insurers require a DSM diagnosis and the relationship code Z63.0 alone is typically denied"

**Substantively correct. Publish with one wording change.**

Every component checks out:

- Couples and family therapy is billed under **CPT 90847** and "will only be covered when the
  plan deems the treatment medically necessary to treat a diagnosis of one member." Billing
  requires "someone in the room who is your identified patient (IP) who has a ... DSM-5
  diagnosis, typically something more than a V or Z code." These services "are typically not
  covered by insurance when the purpose of therapy is solely relationship growth or
  communication skills." https://www.simplepractice.com/blog/billing-couples-family-therapy/
  (fetched 2026-07-20)
- **Z63.0** is a real ICD-10-CM code, "Problems in relationship with spouse or partner." It is
  a Z code, meaning a circumstance rather than a diagnosis. "Z63.0 ... is a valid ICD-10 code
  but is not sufficient on its own for insurance billing ... Z codes are supplemental codes
  that describe circumstances, not diagnoses. Most payers require a primary mental health
  diagnosis (an F code) as the first-listed diagnosis. Z63.0 may be listed as a secondary code
  to provide clinical context, but it cannot carry the claim alone."
  https://www.icanotes.com/2023/07/07/how-to-bill-for-couples-therapy/ (fetched 2026-07-20).
  Code description confirmed at https://www.aapc.com/codes/icd-10-codes/Z63.0
- Regain's own page: "Most online therapy companies don't accept insurance for couples therapy
  at this time." https://www.regain.us/advice/therapist/how-much-does-regain-cost/
  (fetched 2026-07-20)

**One change required.** counseling-prices.md sets a rule that Mend must never say insurance
"doesn't cover" couples therapy, because it sometimes does. "Usually does not cover" is close
to that line. Soften it, and add the consequence, which is the part users actually need.

**Use instead:**

> Health insurance often does not cover couples counseling on its own. US plans pay to treat a
> diagnosed condition in one person, and a relationship problem is not a diagnosis: the
> relationship code Z63.0 describes a circumstance and will not carry a claim by itself.
> Couples sessions can be covered, billed under CPT 90847, when one partner is named as the
> identified patient with a DSM-5 diagnosis and the sessions treat that condition. That means
> one partner ends up with a mental health diagnosis in their medical record. Coverage varies,
> so call your insurer.
> Sources: SimplePractice, couples and family therapy CPT codes; ICANotes, how to bill for
> couples therapy. Both retrieved July 20 2026.

### 4. "BetterHelp and Regain run $70 to $100 per week"

**Correct for BetterHelp. Wrong unit for Regain. And listing BetterHelp in a couples
comparison at all is misleading.**

- BetterHelp: "**$70 to $100 per week** or $260 to $400 per month", page updated July 8 2026.
  **BetterHelp does not offer couples therapy.** Its own page says: "Online couples therapy is
  available through BetterHelp's sister site, Regain."
  https://www.betterhelp.com/advice/general/how-much-does-betterhelp-cost/ (fetched 2026-07-20)
- Regain: "**$70 to $100 per session**", billed "on a monthly basis", including "a weekly
  session" plus in-app messaging, one subscription covering the couple. Page updated
  November 5 2025. https://www.regain.us/advice/therapist/how-much-does-regain-cost/
  (fetched 2026-07-20)

Because Regain includes one live session per week, per session and per week land in the same
place in practice, but the published unit is per session and quoting it as per week
misattributes the number to the vendor. Regain also does not state its session length on that
page, so no minutes claim may be attached.

**Use instead:**

> Regain, the couples brand of BetterHelp, publishes $70 to $100 per session, billed monthly,
> which covers one live session a week plus messaging on a single subscription for both
> partners. BetterHelp itself publishes $70 to $100 per week but does not offer couples
> therapy; it routes couples to Regain.
> Sources: Regain, page updated November 5 2025; BetterHelp, page updated July 8 2026.

### 5. "Talkspace runs about $99 per week"

**Wrong for couples. $99 is Talkspace's individual plan.**

Talkspace's own pricing page, fetched 2026-07-20 at https://www.talkspace.com/pricing:

- Individual, Messaging Only: **$69/week**
- Individual, Video + Messaging: **$99/week**
- Individual, Video + Messaging + Workshops: **$109/week**
- **Couples Therapy, Video + Messaging: $109/week**, "Up to four 30 minute video sessions/month
  for you and your partner", unlimited messaging
- Additional live sessions on any plan: **$69/session**

Using $99 in a couples-pricing comparison quotes the individual product's price against a
couples product. It understates the competitor by $10 a week, which is the wrong direction for
credibility even though it is the flattering direction for Mend.

**Use instead:**

> Talkspace couples therapy is $109 per week, which includes up to four 30-minute video
> sessions a month for both partners plus unlimited messaging.
> Source: https://www.talkspace.com/pricing, retrieved July 20 2026.

Always state the 30-minute session length. Talkspace's four monthly sessions are half the clock
time of a standard 50-minute in-person session, so a raw price comparison against in-person
therapy is misleading without it.

---

## Part 9. Ranked action list

**Fix before anything ships, in this order.**

1. **S9b.** Correct the LGBT National Youth Talkline hours, and confirm by hand in a browser.
   This is a crisis-resource defect: a user acting on the current text calls a closed line.
2. **S10.** Label WomensLaw's email hotline with its 1 to 5 business day response time so it
   is never mistaken for immediate help.
3. **Public figure 2.** Replace $1,800 to $7,500 with $1,200 to $5,000 everywhere.
4. **Public figure 5.** Replace Talkspace $99 with $109 for couples, with the 30-minute
   session length attached.
5. **Public figure 4.** Fix the Regain unit to per session, and never list BetterHelp in a
   couples comparison without stating that it does not offer couples therapy.
6. **C4.** Fix the "$100 to $250" Bottom line in counseling-prices.md so it stops contradicting
   the same document's own "safe public claims" section.
7. **M1.** Delete the 86% / 33% turning-toward percentages from milestones.md to comply with
   frameworks.md's binding Tier C ruling.
8. **F1.** Correct the Irvine et al. journal name and add the 19-completer figure.
9. **S16.** Repoint Esperanza United citations from casadeesperanza.org to esperanzaunited.org.
10. **S12 and S19.** Add dated re-check notes for the 988 Press 3 restoration and for the CDC
    IPV page against NISVS 2023/2024.
11. **C20.** Hand-verify the SAMHSA National Helpline number, to Part 1 standard, since it
    appears inside a safety guardrail.
12. **C14 and P3.** Do not publish any Ours figure until withours.com is loaded by hand.
13. **F7 and M8.** Hand-verify the OurRelationship d = 0.69 figure before it appears in any
    marketing, since it is the only research number nominated for public use.
14. **P2.** Reconcile the two different national individual-therapy averages ($139 in
    counseling-prices.md, $143 in competitor-pricing.md) into one labeled figure.
15. **P6.** Hand-verify the Gottman Card Decks free / 22 decks / 1,000+ cards claim before
    publishing it, since it is a public claim about a third party's product.

**Standing rules confirmed by this review, none of which may be weakened.**

- Nothing about the DV gate, the crisis resources, the "educational tool, not therapy"
  framing, or the per-track red flags may sit behind a paywall or behind a pricing flow.
- Mend has no outcome data of its own. No success rate, no improvement percentage, and no
  claim that any research effect size applies to Mend.
- No copy may state or imply that any quiz, pulse, or behavior predicts whether a relationship
  will end.
- Every published number carries its source and its retrieval date. Blank beats invented.

---

## Sources cited in this review

Crisis and safety: https://www.thehotline.org, https://www.loveisrespect.org/get-relationship-help-24-7-365/,
https://strongheartshelpline.org, https://www.thedeafhotline.org/, https://www.adwas.org/hotline/national/,
https://rainn.org/help-and-healing/hotline/, https://www.thetrevorproject.org/get-help/,
https://translifeline.org/hotline/, https://www.rmvictimlaw.org/programs-services/linc/resources/glbt-national-help-center,
https://lgbtq.unc.edu/resources/lgbt-national-help-center/, https://nnedv.org/content/womenslaw/,
https://hotline.womenslaw.org/public, https://988lifeline.org, https://www.crisistextline.org,
https://findahelpline.com/, https://www.immigrationadvocates.org/legaldirectory/,
https://esperanzaunited.org/en/get-help-now/, https://www.techsafety.org/resources-survivors,
https://refuge.org.uk/news/72-of-refuge-service-users-identify-experiencing-tech-abuse/

988 Press 3 status: https://www.samhsa.gov/about/news-announcements/statements/2025/samhsa-statement-988-press-3-option,
https://www.cnn.com/2025/07/17/health/988-lgbtq-youth-services-end-wellness,
https://www.cnn.com/2026/06/26/health/988-lgbtq-hotline,
https://www.statnews.com/2026/06/26/988-lgbtq-hotline-relaunch-trevor-project/,
https://19thnews.org/2026/07/988-hotline-lgbtq-youth-trump/

Clinical: https://www.gottman.com/blog/v-is-for-violence/, https://www.apa.org/pubs/highlights/spotlight/issue-270,
https://journals.sagepub.com/doi/10.1177/10664807231210123,
https://scholars.nova.edu/en/publications/a-pilot-study-examining-the-effectiveness-of-gottman-method-coupl/

Pricing: https://thriveworks.com/help-with/beginning-therapy/how-much-is-couples-therapy/,
https://growtherapy.com/blog/how-much-does-marriage-counseling-cost/,
https://www.talkspace.com/pricing, https://www.regain.us/advice/therapist/how-much-does-regain-cost/,
https://www.betterhelp.com/advice/general/how-much-does-betterhelp-cost/,
https://openpathcollective.org/pricing-and-eligibility-for-affordable-therapy/,
https://www.simplepractice.com/blog/billing-couples-family-therapy/,
https://www.icanotes.com/2023/07/07/how-to-bill-for-couples-therapy/,
https://www.aapc.com/codes/icd-10-codes/Z63.0

Demographics: https://www.pewresearch.org/short-reads/2019/11/06/key-findings-on-marriage-and-cohabitation-in-the-u-s/,
https://www.bgsu.edu/ncfmr/resources/data/resources-by-topic/gray-divorce.html,
https://www.cdc.gov/intimate-partner-violence/about/index.html,
https://vawnet.org/material/national-intimate-partner-and-sexual-violence-survey-20232024-intimate-partner-violence

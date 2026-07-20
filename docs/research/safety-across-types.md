# Safety across relationship types

Research brief for Mend's safety net. Written because the app now serves all committed
romantic relationships, not only marriages, and the current gate, resource list, and
`whyGateMatters` copy assume a married couple.

All web sources below were retrieved on **2026-07-19**. Every phone number, shortcode,
and URL in the resource section was checked against the operating organization's own
site on that date, except where noted. Anything I could not verify is marked
**UNVERIFIED** rather than guessed.

Current app files this brief is about:

- `/Users/Erick.Dronski/Desktop/Personal Projects/mend-app/src/lib/content/safety.ts`
- `/Users/Erick.Dronski/Desktop/Personal Projects/mend-app/src/app/safety.tsx`
- `/Users/Erick.Dronski/Desktop/Personal Projects/mend-app/src/app/onboarding.tsx` (the gate, step `"gate"`)

---

## 1. The headline finding

Mend's safety gate is currently narrower than the risk it is trying to catch, in three ways:

1. **It asks about fear only.** Coercive control frequently involves no physical violence
   and no conscious sense of "fear of him/her," so a user experiencing it can answer
   "we're safe" honestly and still be the person the gate exists for.
2. **It is written for spouses.** "Marriage," "either of you," and a therapist directory
   branded around marriage and family therapy all signal to a dating user, a partnered
   but unmarried user, or a young user that the warning is about someone else.
3. **The resource list has no door for the people at highest measured risk.** There is
   nothing for LGBTQ+ users, nothing for people under 25, nothing for immigrants,
   nothing about tech surveillance, and no acknowledgment that opening the app itself
   can be dangerous if a partner monitors the phone.

Nothing in this brief argues for weakening the gate. All of it argues for widening it.

---

## 2. Dating relationships are not lower risk

CDC defines intimate partner violence to include "current and former spouses **and
dating partners**." Marriage is not part of the definition. (CDC, About Intimate
Partner Violence, https://www.cdc.gov/intimate-partner-violence/about/index.html)

Verified figures:

| Figure | Source | Notes |
|---|---|---|
| Nearly 1 in 4 adult women and about 1 in 7 adult men report having experienced severe physical violence from an intimate partner | CDC, About Intimate Partner Violence, https://www.cdc.gov/intimate-partner-violence/about/index.html | Lifetime, US adults |
| 10.4% of US high school students reported physical dating violence, and 5.9% reported sexual dating violence, in the past year | CDC 2023 Youth Risk Behavior Survey, https://www.cdc.gov/yrbs/dstr/index.html | Among students who dated |
| Girls reported more sexual (9.3% vs 2.9%) and physical (11.4% vs 9.3%) dating violence than boys | CDC 2023 YRBS, https://www.cdc.gov/yrbs/dstr/index.html | |
| Lesbian, gay, and bisexual students reported more sexual (11.6% vs 4.3%) and physical (16.2% vs 7.8%) dating violence than heterosexual peers | CDC 2023 YRBS, https://www.cdc.gov/yrbs/dstr/index.html | |
| Most female (69%) and male (53%) IPV victims had their first experience before age 25 | CDC NISVS, as summarized by The Hotline, https://www.thehotline.org/stakeholders/domestic-violence-statistics/ | First victimization age |

**Implication for Mend:** the age band and relationship stage most likely to download a
free relationship app is also the band where first IPV victimization concentrates. The
gate has to work for an unmarried 22 year old on their second serious relationship, not
just a couple twelve years into a marriage.

---

## 3. Coercive control without physical violence

Evan Stark's framework, now widely adopted in US legal and advocacy practice, holds that
the defining feature of an abusive relationship is not violence but **coercive control**:
a pattern of domination using tactics that isolate, exploit, and regulate a partner's
everyday behavior, depriving them of liberty and autonomy. The primary result is
psychological, and it commonly occurs with little or no physical assault.
(New York State Defenders Association, Coercive Control guide,
https://cdn.ymaws.com/www.nysda.org/resource/resmgr/news_picks_items/Coercive_Control_Guide_FINAL.pdf ;
Stark and Hester review, https://files.santaclaracounty.gov/migrated/Coercive-Control-Article-Update-Review-Evan-Stark-Marianne-Hester.pdf ;
American Bar Association, Redefining Domestic Abuse: Coercive Control, December 2025,
https://www.americanbar.org/groups/family_law/resources/family-law-quarterly/2025-december/redefining-domestic-abuse-coercive-control/)

Recurring tactics named across those sources:

- Surveillance and monitoring of movement, phone, and messages
- Isolation from friends, family, and outside support
- Degradation and humiliation that erodes confidence
- Micromanagement of daily life: clothes, food, sleep, schedule, chores
- Financial control
- Manipulation via children, pets, and shared social networks
- Rules with consequences, so the partner self-censors to avoid a reaction

**Implication for Mend:** a single "are you afraid" question misses this entirely. The
better screening question set is behavioral, not emotional. Someone under coercive
control will often say they are not afraid but will recognize "I change what I do to
avoid a reaction."

---

## 4. LGBTQ+ relationships

**Prevalence.** CDC's NISVS 2010 sexual orientation findings remain the most cited US
national comparison: lifetime rape, physical violence, and/or stalking by an intimate
partner was reported by 61.1% of bisexual women, 43.8% of lesbian women, and 35.0% of
heterosexual women. (CDC press release, https://archive.cdc.gov/www_cdc_gov/media/releases/2013/p0125_NISVS.html ;
report, https://stacks.cdc.gov/view/cdc/12362)

The Williams Institute review reports transgender lifetime IPV prevalence between 31.1%
and 50.0% across studies, and one study finding 31.1% of transgender respondents had
experienced IPV or dating violence versus 20.4% of cisgender respondents.
(Williams Institute, Intimate Partner Violence and Sexual Abuse Among LGBT People,
https://williamsinstitute.law.ucla.edu/publications/ipv-sex-abuse-lgbt-people/)

**Outing as a control tactic.** LGBTQ+ IPV includes power and control tactics tied
specifically to sexual orientation and gender identity, notably the threat of forced
disclosure. Outing functions as both a weapon inside the relationship and a barrier to
leaving it: the same stigma that makes the threat effective makes reporting feel
dangerous, because seeking help can require outing yourself before you are ready.
(HRC, Understanding Intimate Partner Violence in the LGBTQ+ Community,
https://www.hrc.org/resources/understanding-intimate-partner-violence-in-the-lgbtq-community ;
Addressing IPV in LGBT Patients, https://pmc.ncbi.nlm.nih.gov/articles/PMC3138983/ ;
mixed methods study of help-seeking barriers, https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11951454/)

Other barriers documented in those sources: fear of rejection and isolation from family
and community, services that assume a male perpetrator and a female victim, and fewer
available help-seeking pathways than the general population.

**Critical current-events fact.** On 2025-07-17, SAMHSA terminated the 988 Suicide and
Crisis Lifeline's LGBTQ+ Youth Specialized Services. The "press 3," "text PRIDE," and
specialized chat routes no longer exist.
(SAMHSA statement, https://www.samhsa.gov/about/news-announcements/statements/2025/samhsa-statement-988-press-3-option ;
NPR, https://www.npr.org/sections/shots-health-news/2025/07/19/nx-s1-5472593/988-suicide-crisis-lifeline-lgbtq ;
The Trevor Project, https://www.thetrevorproject.org/blog/closed-trump-admin-officially-shuts-down-the-988-suicide-crisis-lifelines-lgbtq-youth-specialized-services/)

**Do not ship any copy telling users to call 988 and press 3.** 988 itself is still the
right general crisis line and still maintains an LGBTQI+ resource page, but the
specialized counselor route is gone. Route LGBTQ+ users to The Trevor Project, Trans
Lifeline, and the LGBT National Help Center directly.

---

## 5. Immigration status used as control

Threatening deportation, withholding or destroying documents, refusing to file a
petition, and threatening to call immigration enforcement are recognized coercive
control tactics. Congress recognized this specific pattern when it created VAWA
self-petitioning, which lets certain survivors of abuse by a US citizen or lawful
permanent resident file for status on their own, without the abuser's knowledge or
cooperation. The U nonimmigrant visa covers survivors of qualifying crimes including
domestic violence who assist law enforcement.
(American Immigration Council, Humanitarian Protections for Noncitizen Survivors,
https://www.americanimmigrationcouncil.org/fact-sheet/humanitarian-protections-noncitizen-survivors/ ;
NIWAP, Power and Control Tactics briefing,
https://niwaplibrary.wcl.american.edu/wp-content/uploads/Family-Violence-US-Imm-Laws-Gilbert-2001.pdf ;
peer-reviewed study of immigration status in protection orders,
https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10175620/)

Federal law at 8 U.S.C. section 1367 bars USCIS from disclosing information about a
VAWA, U, or T visa case to the abuser or any third party without the survivor's consent.
(American Immigration Council, same fact sheet)

**Implication for Mend:** do not attempt to give immigration advice. Do include one line
naming the tactic so a user recognizes it, and one verified pointer to free or low-cost
immigration legal help. Naming the tactic is the intervention; the legal work is not ours.

---

## 6. Financial and economic abuse

The most quoted figure, that financial abuse occurs in 99% of domestic violence cases,
traces to the National Network to End Domestic Violence.
(NNEDV, About Financial Abuse, https://nnedv.org/content/about-financial-abuse/)

**Handle this number with care.** A peer-reviewed scoping review reports that among
service-seeking samples roughly 76% to 99% of survivors report economic abuse, which is
a range from help-seeking populations, not a general-population rate.
(Examining the impact of economic abuse on survivors of IPV: a scoping review,
https://pmc.ncbi.nlm.nih.gov/articles/PMC9121607/)

I would not put "99%" in shipped app copy. It is real and sourced, but it is a
service-population figure and it reads as a scare statistic. Prefer the behavioral
description over the number.

Working definition to use: behavior that controls a partner's ability to acquire, use,
or maintain money and resources, threatening their self-sufficiency. Common in dating
and cohabiting relationships specifically: controlling a shared account, running up debt
in the partner's name, sabotaging a job or school, demanding receipts, making all money
"ours" while the partner has none of their own.

---

## 7. Digital abuse, surveillance, and stalking

NNEDV's Safety Net Project is the authoritative US practitioner resource on this.
(https://nnedv.org/content/technology-safety/ and https://www.techsafety.org/resources-survivors)

Documented patterns:

- **Stalkerware:** apps that silently monitor photos, videos, browsing, messages, call
  history, and location, and in some cases activate the camera or microphone, take
  screenshots, and intercept calls.
  (https://www.techsafety.org/spyware-and-stalkerware-phone-surveillance)
- **Password and unlock demands:** an abusive partner may force a phone unlock or
  demand passwords, and may escalate when they discover an account or device has been
  secured. Safety Net explicitly warns that locking things down can itself trigger
  escalation.
  (https://www.techsafety.org/resources-survivors/cell-phone-safety-plan)
- **Location sharing** presented as normal couple behavior, then enforced.
  (Safety Net location tracking guides, linked from the resources index above)
- **Stalking prevalence:** CDC's 2016/2017 NISVS found 13.5% of women and 5.2% of men
  had been stalked by an intimate partner, as cited by NNEDV.
  (https://nnedv.org/content/technology-safety/)

**Implication for Mend, and this is a product issue not just a copy issue.** A partner
who monitors the phone can see Mend on the home screen, see notifications, and
potentially see synced content in a shared Couple Space. Mend already has an app lock
and an opt-in daily notification, which is good. What is missing is telling the user why
those exist, in the safety flow, in one plain sentence, plus a pointer to techsafety.org
so they get real device guidance from people who do this professionally.

---

## 8. Why joint couples work is contraindicated with an abusive partner

This is the clinical core of the gate. The consensus is not soft.

**The distinction that drives everything.** Practitioners distinguish *situational
couple violence*, mutual and typically mild violence arising from poor conflict
resolution during specific stressors, from *characterological violence*, also called
intimate terrorism or coercive controlling violence, where one partner uses violence and
control to dominate the other.
(Gottman Institute, V is for Violence, https://www.gottman.com/blog/v-is-for-violence/ ;
APA Spotlight on couples therapy and IPV, https://www.apa.org/pubs/highlights/spotlight/issue-270)

**The Gottman Institute position, verbatim from their own site:** "When battery is
present, couples therapy is inappropriate." And on the clinician's duty: "If you suspect
battery is present but one or both partners are denying it, refer. If you're not sure,
refer. It's irresponsible, unethical, and likely even illegal for you to begin couples
therapy when Characterological Violence is present."
(https://www.gottman.com/blog/v-is-for-violence/)

**The specific mechanisms of harm**, drawn from the sources below:

1. **Disclosure creates retaliation risk.** The victim cannot answer honestly in a joint
   session, because the abusive partner will still be there afterward. Everything said
   becomes material.
2. **Sessions raise tension, and tension is the trigger.** Clinicians are concerned that
   talking through sensitive topics in conjoint sessions increases tension, which
   creates risk.
   (Couple Therapy for Intimate Partner Violence meta-analysis,
   https://pmc.ncbi.nlm.nih.gov/articles/PMC5050084/)
3. **The frame itself is wrong.** Couples therapy assumes mutual responsibility for
   relationship problems. Applying that frame to abuse obscures accountability and
   implies the victim shares the blame for being harmed.
   (Gottman, above; American Counseling Association guidance as summarized at
   https://psychology.town/counselling/couple-counseling-when-not-advised/)
4. **Exposure provokes control.** An abusive partner who feels exposed in session may
   act to regain control afterward, escalating the abuse.
   (https://psychcentral.com/relationships/why-couples-counseling-doesnt-work-in-abusive-relationships)

**What the evidence does and does not support.** A meta-analysis of six randomized
trials, 470 participants, found a modest significant reduction in violence from couples
therapy, but the authors state the findings "can only be applied to instances of mild to
moderate situational couple violence" and "cannot be extended to all instances of couple
violence."
(https://pmc.ncbi.nlm.nih.gov/articles/PMC5050084/)

**And the screening requirement that Mend structurally cannot meet.** APA's guidance is
that assessment of IPV type, partner commitment to ending violence, and co-occurring
substance use or mental health conditions "should be done with each partner separately
and privately to promote safety and honest disclosures."
(https://www.apa.org/pubs/highlights/spotlight/issue-270)

That last point is the honest argument for Mend's gate, and it should be the argument
the app makes. A trained clinician screens each partner alone before deciding whether
joint work is safe. An app cannot do that. It cannot see the room, cannot separate the
partners, cannot tell situational from characterological, and cannot follow up. So the
app defaults to the safe side and hands off. That framing is truthful, it is not
condescending, and it does not require the user to label their own relationship as abusive.

---

## 9. Verified US crisis and support resources

Every entry verified 2026-07-19 against the operating organization's own site unless
noted. Ordered roughly by how central they should be in the app.

### Relationship abuse

**National Domestic Violence Hotline**
Call 1-800-799-7233 (1-800-799-SAFE), text START to 88788, or chat at the site.
https://www.thehotline.org
Free, confidential, 24/7. Advocates provide crisis intervention, safety planning,
education, and referrals. Serves people in any intimate relationship; the site draws no
married/dating distinction.
Verified: https://www.thehotline.org (2026-07-19)

**love is respect**
Call 1-866-331-9474, text LOVEIS to 22522, or chat at the site.
https://www.loveisrespect.org
Dating abuse and healthy relationship support focused on teens and young adults. This is
the single most important addition for Mend's expanded audience.
Verified: https://www.loveisrespect.org (2026-07-19).
Note: thehotline.org's own resource listing rendered this number as 866.311.9474 on the
same date, which conflicts with loveisrespect.org's own site. I used the number
published by love is respect itself. Re-verify before shipping.

**StrongHearts Native Helpline**
Call 1-844-762-8483 (1-844-7NATIVE), or chat at the site.
https://strongheartshelpline.org
24/7, confidential, anonymous. Domestic and sexual violence support built by and for
Native Americans and Alaska Natives: peer support, safety planning, crisis intervention,
culturally appropriate referrals.
Verified: https://strongheartshelpline.org (2026-07-19)

**The Deaf Hotline (National Deaf Domestic Violence Hotline)**
Videophone 1-855-812-1001, email nationaldeafhotline@adwas.org
https://www.thedeafhotline.org
24/7, answered by Deaf advocates. Run by Abused Deaf Women's Advocacy Services in
partnership with the National Domestic Violence Hotline.
Verified: https://www.adwas.org/hotline/national/ (2026-07-19)

**WomensLaw.org**
Email hotline and chat via the site; state-by-state legal information.
https://www.womenslaw.org
A project of NNEDV. Plain-language, state-specific legal information on protective
orders, custody, and related law, plus a confidential email hotline reviewed by licensed
attorneys in English and Spanish. Serves anyone experiencing abuse, stalking, or sexual
assault regardless of gender or relationship status.
Verified via NNEDV: https://nnedv.org/content/womenslaw/ (2026-07-19).
Note: womenslaw.org returned HTTP 403 to my fetch, so the site's own page was not
directly read. NNEDV's description was used. Re-verify before shipping.

### Sexual violence

**RAINN National Sexual Assault Hotline**
Call 1-800-656-4673 (1-800-656-HOPE), text HOPE to 64673, or chat online.
https://rainn.org
Free, confidential, 24/7, English and Spanish, operated in partnership with more than
1,000 local providers.
Verified via RAINN pages in search results, https://rainn.org/help-and-healing/hotline/ (2026-07-19).
Note: rainn.org returned HTTP 403 to my fetch. Contact details came from RAINN's own
indexed pages rather than a direct read. Re-verify before shipping.

### LGBTQ+ specific

**The Trevor Project**
Call 1-866-488-7386, text START to 678-678, or chat at the site.
https://www.thetrevorproject.org/get-help/
24/7/365, free and confidential crisis support for LGBTQ+ young people, nationwide.
Verified: https://www.thetrevorproject.org/get-help/ (2026-07-19)

**Trans Lifeline**
Call 1-877-565-8860.
https://translifeline.org
Peer support run by and for trans people. Notably divested from police since founding,
which matters to users who fear a wellness check or forced intervention.
Verified: https://translifeline.org (2026-07-19).
Hours were not stated on the page I read; do not claim 24/7 in app copy. **UNVERIFIED: hours.**

**LGBT National Help Center**
LGBT National Hotline: 1-888-843-4564, all ages, 11am to 8pm Pacific Monday to Friday
and 9am to 2pm Pacific Saturday.
LGBT National Youth Talkline: 1-800-246-7743, for people 25 and under, 4pm to midnight
Pacific Monday to Friday and noon to 5pm Pacific Saturday.
https://lgbthotline.org
Free and confidential peer support on sexual orientation and gender identity, including
relationship issues and coming out.
Verified via https://lgbthotline.org/national-hotline/ and the site's youth talkline
listing (2026-07-19). Note: lgbthotline.org returned HTTP 403 to my direct fetch; details
came from the site's own indexed pages. Re-verify hours before shipping, they change.

### General crisis

**988 Suicide and Crisis Lifeline**
Call or text 988, chat at https://chat.988lifeline.org
https://988lifeline.org
Free, 24/7/365. Spanish text and chat available. Deaf and hard of hearing services at
988lifeline.org/deaf-hard-of-hearing-hearing-loss/. Maintains an LGBTQI+ resource page.
Verified: https://988lifeline.org (2026-07-19).
**Do not reference "press 3" or "text PRIDE."** Those LGBTQ+ specialized routes were
terminated 2025-07-17 (SAMHSA, https://www.samhsa.gov/about/news-announcements/statements/2025/samhsa-statement-988-press-3-option).

**Crisis Text Line**
Text HOME to 741741.
https://www.crisistextline.org
24/7 crisis support over text, for when a voice call is not possible or not safe. Already
in the app. Retain. **UNVERIFIED this session: I did not re-fetch crisistextline.org on
2026-07-19. Re-verify before shipping.**

### Immigration

**National Immigration Legal Services Directory**
https://www.immigrationadvocates.org/legaldirectory/
Searchable directory of nonprofit organizations offering free or low-cost immigration
legal services, searchable by state, county, zip code, or detention facility. A joint
project of the Immigration Advocates Network and Scale Justice, under Pro Bono Net.
Verified: https://www.immigrationadvocates.org/legaldirectory/ (2026-07-19)

**Esperanza United (formerly Casa de Esperanza)**
24-hour bilingual crisis line 1-651-772-1611.
https://esperanzaunited.org
Bilingual Spanish/English support and the National Latin@ Network for Healthy Families
and Communities. The crisis line is Minnesota-based; for callers elsewhere the
organization refers to the National Domestic Violence Hotline.
Verified via https://casadeesperanza.org/en/contact-us/ and
https://casadeesperanza.org/en/find-help-now/ (2026-07-19).
Because the line is regionally staffed, present it as a bilingual option, not as a
national hotline.

### Technology safety

**Safety Net Project (NNEDV)**
https://www.techsafety.org
Practical survivor guides on stalkerware detection, securing accounts and devices,
location tracking, smart home devices, connected cars, image-based abuse, data brokers,
and technology safety planning. Spanish materials available.
Verified: https://www.techsafety.org/resources-survivors (2026-07-19)

### International

**Find A Helpline**
https://findahelpline.com
Verified directory of free crisis lines by country. Already in the app. Retain.
**UNVERIFIED this session: not re-fetched on 2026-07-19.**

---

## 10. Recommendations: how the safety gate wording should change

### 10.1 Replace the single fear question with a two-part gate

The current gate asks one emotional question, "Is either of you afraid of the other?"
Coercive control research says that question misses a large share of the people it is
meant to catch, because control frequently does not register as fear and rarely involves
a moment the user would call violence.

Recommended structure, still one screen, still low friction:

**Headline:** replace "Is either of you afraid of the other?" with something that covers
fear *and* control without demanding a self-diagnosis. Suggested:

> Before we start, one honest question.
> Is there violence, fear, or control in your relationship?

**Body:** keep the existing "not do we fight, fights are why Mend exists" move, it is
good and it lowers the false-positive rate. Then add a short behavioral list, because
the list is what makes control recognizable:

> Not "do we argue." Arguing is why Mend exists.
> This is different. It looks like: being hurt or threatened. Being afraid of a
> reaction. Being cut off from friends or family. Having your phone, money, or
> movements controlled. Being threatened with your immigration status, your kids, or
> being outed. Changing what you do to keep the peace.

That list, in that order, covers physical violence, fear, isolation, digital and
financial control, immigration coercion, outing, and self-censorship, and it does it in
six plain clauses with no jargon.

**Buttons:** keep two, but soften the affirmative so it is not a self-certification the
user feels pressure to give. Current: "We're safe with each other. Continue." Suggested:
"None of that is happening. Continue." Keep the second button roughly as is; "I'm not
sure, or I don't feel safe. Show me help" is well written and the "I'm not sure" branch
is doing real work.

### 10.2 De-marry every word of the safety surface

Concrete replacements in `src/lib/content/safety.ts` and `src/app/safety.tsx`:

| Current | Change to | Why |
|---|---|---|
| `whyGateMatters`: "This isn't about your marriage being 'bad enough'" | "This isn't about your relationship being 'bad enough'" | Marriage assumption |
| `whyGateMatters`: "Guided couple conversations assume both partners are safe..." | Keep. "Couple" and "partners" are already inclusive. | No change needed |
| safety.tsx: "when a marriage needs a professional" | "when a relationship needs a professional" | Marriage assumption |
| AAMFT blurb: "licensed marriage and family therapists, the specialists in exactly this work" | "licensed relationship and family therapists. The name says marriage, but they work with unmarried and same-sex couples too." | The directory's name will read as exclusionary to the exact users we are adding. Naming that directly is more honest than hiding it. |
| Employer EAP blurb: "including couples counseling" | "including couples counseling, whether or not you're married. Check the benefit language, some plans define 'partner' narrowly." | Real, checkable caveat rather than an assumption |
| Gate: "Is either of you afraid of the other?" | See 10.1 | Too narrow |

### 10.3 Add what is missing, and do not paywall any of it

Additions to `crisisResources`, in priority order:

1. **love is respect** (dating abuse, teens and young adults). Highest priority. There is
   currently no door in the app for a 19 year old.
2. **The Trevor Project** and **Trans Lifeline** (LGBTQ+, with Trevor as the youth
   route). Second priority, and note the 988 press-3 shutdown means these are now the
   primary LGBTQ+-specific crisis routes.
3. **RAINN** (sexual violence, including within a relationship). Coerced sex inside a
   committed relationship is a gap the current list does not name at all.
4. **Safety Net / techsafety.org** (device and account safety). Pair it with one line
   about Mend's own app lock.
5. **StrongHearts** and **The Deaf Hotline**, both operated in partnership with the
   National Domestic Violence Hotline, so they are consistent with what is already there.
6. **National Immigration Legal Services Directory**, presented as free or low-cost legal
   help, with no legal advice attached.
7. **LGBT National Help Center**, with hours stated, since it is not 24/7.

Every one of these is a crisis or safety resource and must sit outside the paywall,
alongside the existing ones.

### 10.4 Add a "why this app cannot screen you" line

The strongest, most honest sentence available, and it is fully sourced:

> A therapist who takes on a couple screens each partner privately before deciding
> whether joint work is safe. Mend cannot do that. It cannot see your room, cannot talk
> to either of you alone, and cannot tell the difference between a couple who fight
> badly and a relationship where one person is being controlled. So it errs toward
> caution and points you to people who can.

Source for the private-screening standard: APA,
https://www.apa.org/pubs/highlights/spotlight/issue-270

### 10.5 Add a device-safety line inside the safety screen

One sentence, plus the techsafety.org link:

> If your partner checks your phone, opening this app can itself be a risk. Mend has a
> lock under Settings, and notifications are off unless you turn them on. For real
> device and account guidance, techsafety.org is run by the National Network to End
> Domestic Violence.

Note the Safety Net warning that securing devices can itself trigger escalation, so the
copy should suggest the guide rather than instruct the user to lock things down.
(https://www.techsafety.org/resources-survivors/cell-phone-safety-plan)

### 10.6 Copy rules to hold

- Never require the user to name their relationship as abusive to reach help. The gate
  should be answerable by someone who has not yet made that judgment about themselves.
- Never imply the second button is the lesser path or a failure state.
- Never present the resource list as an exit from the app. It is a door, not a shove.
- Do not use "domestic violence" as the only label. Use "violence, fear, or control."
  Users in dating relationships often do not think the word "domestic" applies to them.
- Do not use fear statistics in the gate. One honest behavioral list beats a percentage.
- "Partner" everywhere. Never husband, wife, spouse, or marriage in the gate or the
  resource copy.

---

## 11. Numbers I consider safe to state publicly

Only one, and only with attribution:

> CDC defines intimate partner violence to include current and former spouses **and
> dating partners**, and reports that nearly 1 in 4 adult women and about 1 in 7 adult
> men have experienced severe physical violence from an intimate partner.
> Source: CDC, About Intimate Partner Violence,
> https://www.cdc.gov/intimate-partner-violence/about/index.html (retrieved 2026-07-19)

That figure is federal, current, plainly stated on CDC's own page, and it does the exact
argumentative work we need: it establishes that dating relationships are inside the
definition. Everything else in this brief should inform the copy without appearing as a
number in it.

Figures I would **not** put in the app: the 99% financial abuse figure (service-population,
reads as a scare stat), the LGBTQ+ prevalence percentages (2010 data, and quoting them at
LGBTQ+ users in a relationship app is othering), and the YRBS teen figures (Mend is not a
teen product and citing teen data invites the wrong audience question).

---

## 12. Open items for the owner

1. Re-verify the love is respect phone number before shipping. Two sources disagreed on
   2026-07-19 and I used love is respect's own site.
2. Re-verify RAINN, WomensLaw, and LGBT National Help Center contact details directly.
   All three returned HTTP 403 to automated fetches, so I relied on their own indexed
   pages rather than a live read.
3. Re-verify Crisis Text Line and Find A Helpline. Both are already shipped in the app
   and were not re-checked this session.
4. Trans Lifeline hours are unverified. Do not claim 24/7.
5. Decide whether the immigration and LGBTQ+ resources appear for everyone or surface
   contextually. Recommendation: show all of them to everyone. Contextual surfacing
   requires storing sensitive attributes, and a shared-device user could be outed by an
   app that visibly knows they are queer or undocumented.

---

## Sources

- CDC, About Intimate Partner Violence: https://www.cdc.gov/intimate-partner-violence/about/index.html
- CDC, Youth Risk Behavior Survey Data Summary and Trends Report 2013 to 2023: https://www.cdc.gov/yrbs/dstr/index.html
- CDC, NISVS 2010 Findings on Victimization by Sexual Orientation: https://stacks.cdc.gov/view/cdc/12362
- CDC press release on NISVS sexual orientation findings: https://archive.cdc.gov/www_cdc_gov/media/releases/2013/p0125_NISVS.html
- The Hotline, Domestic Violence Statistics: https://www.thehotline.org/stakeholders/domestic-violence-statistics/
- New York State Defenders Association, Coercive Control Is Domestic Violence: https://cdn.ymaws.com/www.nysda.org/resource/resmgr/news_picks_items/Coercive_Control_Guide_FINAL.pdf
- Stark and Hester, Coercive Control update and review: https://files.santaclaracounty.gov/migrated/Coercive-Control-Article-Update-Review-Evan-Stark-Marianne-Hester.pdf
- American Bar Association, Redefining Domestic Abuse: Coercive Control (December 2025): https://www.americanbar.org/groups/family_law/resources/family-law-quarterly/2025-december/redefining-domestic-abuse-coercive-control/
- Williams Institute, Intimate Partner Violence and Sexual Abuse Among LGBT People: https://williamsinstitute.law.ucla.edu/publications/ipv-sex-abuse-lgbt-people/
- HRC, Understanding Intimate Partner Violence in the LGBTQ+ Community: https://www.hrc.org/resources/understanding-intimate-partner-violence-in-the-lgbtq-community
- Addressing Intimate Partner Violence in LGBT Patients: https://pmc.ncbi.nlm.nih.gov/articles/PMC3138983/
- Mixed methods study of help-seeking barriers in the LGBTQIA+ community: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11951454/
- SAMHSA statement on the 988 Press 3 option: https://www.samhsa.gov/about/news-announcements/statements/2025/samhsa-statement-988-press-3-option
- NPR on the 988 LGBTQ+ service defunding: https://www.npr.org/sections/shots-health-news/2025/07/19/nx-s1-5472593/988-suicide-crisis-lifeline-lgbtq
- The Trevor Project on the 988 shutdown: https://www.thetrevorproject.org/blog/closed-trump-admin-officially-shuts-down-the-988-suicide-crisis-lifelines-lgbtq-youth-specialized-services/
- American Immigration Council, Humanitarian Protections for Noncitizen Survivors: https://www.americanimmigrationcouncil.org/fact-sheet/humanitarian-protections-noncitizen-survivors/
- NIWAP, Power and Control Tactics briefing: https://niwaplibrary.wcl.american.edu/wp-content/uploads/Family-Violence-US-Imm-Laws-Gilbert-2001.pdf
- Use of immigration status for coercive control in domestic violence protection orders: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10175620/
- NNEDV, About Financial Abuse: https://nnedv.org/content/about-financial-abuse/
- Examining the impact of economic abuse on survivors of IPV, scoping review: https://pmc.ncbi.nlm.nih.gov/articles/PMC9121607/
- NNEDV Safety Net Project: https://nnedv.org/content/technology-safety/ and https://www.techsafety.org/resources-survivors
- Safety Net, Spyware and Stalkerware: https://www.techsafety.org/spyware-and-stalkerware-phone-surveillance
- Safety Net, Cell Phone Safety Plan: https://www.techsafety.org/resources-survivors/cell-phone-safety-plan
- Gottman Institute, V is for Violence: https://www.gottman.com/blog/v-is-for-violence/
- APA, Couples therapy and intimate partner violence: https://www.apa.org/pubs/highlights/spotlight/issue-270
- Couple Therapy for Intimate Partner Violence, meta-analysis: https://pmc.ncbi.nlm.nih.gov/articles/PMC5050084/
- Psych Central, Can Couples Therapy Work in Abusive Relationships: https://psychcentral.com/relationships/why-couples-counseling-doesnt-work-in-abusive-relationships
- Psychology Town, When Couple Counseling Is Not Advised: https://psychology.town/counselling/couple-counseling-when-not-advised/
- National Domestic Violence Hotline: https://www.thehotline.org
- love is respect: https://www.loveisrespect.org
- StrongHearts Native Helpline: https://strongheartshelpline.org
- The Deaf Hotline / ADWAS: https://www.adwas.org/hotline/national/ and https://www.thedeafhotline.org
- WomensLaw, via NNEDV: https://nnedv.org/content/womenslaw/ and https://www.womenslaw.org
- RAINN National Sexual Assault Hotline: https://rainn.org/help-and-healing/hotline/
- The Trevor Project: https://www.thetrevorproject.org/get-help/
- Trans Lifeline: https://translifeline.org
- LGBT National Help Center: https://lgbthotline.org/national-hotline/
- 988 Suicide and Crisis Lifeline: https://988lifeline.org
- National Immigration Legal Services Directory: https://www.immigrationadvocates.org/legaldirectory/
- Esperanza United: https://casadeesperanza.org/en/contact-us/ and https://esperanzaunited.org

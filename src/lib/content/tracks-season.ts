/**
 * Season tracks: healing paths for couples whose relationship is being shaped
 * by a season rather than a single wound. Recovery from addiction and the trust
 * debt it leaves, reintegration after deployment or long work separation, and
 * the quiet after the kids leave.
 *
 * Same structure and voice as tracks.ts. Written for all committed romantic
 * relationships, not only marriages. Every track signposts professional help
 * and names the red flags where an app is the wrong tool.
 *
 * Grounding: docs/research/relationship-taxonomy.md sections 3.12 (military and
 * deployment), 3.17 (couples in recovery), 3.22 (empty nesters), and
 * docs/research/frameworks.md sections 4 (acceptance alongside change), 9.4
 * (repair after a breach), 10 (the do-not-say list) and 11 (safety). No
 * statistics, prediction, or scoring appears in this content, by design.
 */

import type { Track } from "./tracks";

export const seasonTracks: Track[] = [
  {
    slug: "recovery-trust",
    title: "Recovery and the trust debt",
    subtitle: "One of you is in recovery. The other is still braced.",
    overview:
      "Getting sober, or getting clean, or stopping the behavior, is the beginning of a long piece of work, not the end of it. The partner who is in recovery is often doing the hardest thing they have ever done, and wants the relationship to feel different now. The partner who lived through the using years is often still flinching at a late text, still checking, still waiting for the other shoe. Both of those are true at once, and the gap between them is where most couples get stuck. This track is about rebuilding trust on a timeline nobody gets to set for you, including the calendar recovery culture hands out.",
    feelings: [
      {
        label: "If you're the one in recovery",
        body: "You may be doing everything asked of you and still living with a partner who watches you. That is exhausting, and it can feel like your effort is invisible. Underneath it there is usually shame you have not fully put down, and a quiet fear that you will always be the problem in this relationship. Here is the part that is genuinely hard to accept: your recovery is yours to be proud of, and it does not by itself repay what the using years took from them. Both of those are true. You get to be proud, and you get to keep showing up while they catch up.",
      },
      {
        label: "If you're the partner who lived through it",
        body: "You may notice that you cannot relax, even now, and that the relief everyone expects you to feel has not arrived. You learned to read moods, count bottles or minutes or dollars, and hold everything together, and that wiring does not switch off because a chip got handed out. You may also be angry, and then ashamed of being angry at someone who is trying. Your caution is not disloyalty and it is not sabotage. It is a nervous system that was right too many times. Nobody else, including your partner, gets to decide when you are done being careful.",
      },
      {
        label: "If you are both in recovery",
        body: "Two people in recovery can be the safest thing in the world or the most fragile, sometimes in the same week. Programs can pull in different directions, one of you may be further along, and a hard day for one can become a hard day for both. Give each recovery its own room, its own supports, and its own honesty, so that neither of you becomes the other's only lifeline.",
      },
    ],
    principles: [
      "The recovery comes first. That sounds cold and it is the opposite of cold: a relationship with an active addiction in it does not get to be repaired around the addiction. Meetings, treatment, medication, therapy, and sleep are not time stolen from the relationship, they are what makes a relationship possible.",
      "\"I got sober, you should be over it\" is the trap this track exists for. Sobriety is the price of admission, not the payment. Trust rebuilds on a stack of small kept promises over time, and the person who was hurt is the one who knows when it has been enough.",
      "Trust needs something observable, not just a feeling. A daily statement of intent that the other partner simply hears and acknowledges gives trust something concrete to stand on. This daily check-in comes from behavioral couples therapy for substance use, which is supported by research rather than settled by it, so treat it as a well-tested experiment and not a guarantee.",
      "Fear about using gets a scheduled place, not an ambush. Agreeing that the past and the fear get discussed at a set time, and not at every raised voice or late arrival, protects both of you: one from constant suspicion, the other from having to swallow it.",
      "The monitor role is a job, not an identity, and someone has to be allowed to put it down eventually. If one partner is permanently the supervisor and the other is permanently supervised, that is not a partnership, it is probation with no release date.",
      "The person who got sober is often not the person you started with, and that is a real loss to grieve even when the change is good. The partner who was not using also has their own damage, and almost nobody is treating it. Their own therapy, their own group, their own life is not a betrayal of the recovery.",
    ],
    sessions: [
      {
        title: "What those years actually cost",
        focus: "The partner who lived through the using years holds the floor. The partner in recovery listens, reflects back what they heard, and does not explain, correct, or apologize on a loop. Listening without defending is the whole exercise.",
        prompts: [
          "What did I stop doing, stop expecting, or stop saying during those years?",
          "What is the moment I still go back to when I am alone?",
          "What did I have to become to get us through, and do I know how to stop being that?",
          "What do I need you to understand that I have never been able to say without a fight starting?",
        ],
      },
      {
        title: "What recovery costs me",
        focus: "The partner in recovery holds the floor, not to defend the past, but to make the daily work visible. Not a bid for credit, a description.",
        prompts: [
          "What does staying well actually take from my week, in hours and in effort?",
          "What do I need from this relationship to stay well, and what do I need it to stop asking of me?",
          "Where do I still carry shame, and how does it come out sideways at you?",
          "What am I afraid you will never be able to see me as again?",
        ],
      },
      {
        title: "The trust ledger",
        focus: "Naming what trust is actually made of for you two, in specifics rather than in the word \"trust\". The goal is a short list of observable things, not a promise to feel differently.",
        prompts: [
          "What specific behaviors would tell me, over months, that things are genuinely different?",
          "What am I still checking, and would I be willing to say out loud that I check it?",
          "What openness am I offering freely, before being asked, rather than handing over when caught?",
          "What has already changed that neither of us has bothered to name?",
        ],
      },
      {
        title: "The daily contract",
        focus: "Building the daily check-in and the rules around it. Small, boring, repeatable. This is the piece that does the work.",
        prompts: [
          "What will the daily statement of intent sound like, in my own plain words?",
          "How will the other partner respond so it lands as support and not as inspection?",
          "When is the scheduled time for fear and for the past, and what happens if it comes up outside that time?",
          "What is our agreed plan if one of us misses a day, so a miss does not become a crisis or a silence?",
        ],
      },
      {
        title: "Roles, and putting the monitor down",
        focus: "Looking honestly at who is running what, and whether the arrangement you built in an emergency is still the arrangement you want.",
        prompts: [
          "What did I take over during those years that I am still carrying?",
          "What would I like handed back, and what am I honestly not ready to hand back yet?",
          "Where does support tip into supervision, for either of us, and how would we notice?",
          "What is one responsibility we could move this month, small enough that a stumble would not be a catastrophe?",
        ],
      },
      {
        title: "If it happens again",
        focus: "Writing the relapse plan while things are calm. Not because it is coming, but because a plan made in advance is worth ten decisions made in panic. Every couple in recovery should have one.",
        prompts: [
          "What would each of us do in the first hour, and who gets called first?",
          "What does the partner not using need, practically, to stay safe and steady?",
          "What have we already agreed we would not do in that moment: the threats, the accusations, the ultimatums we would regret?",
          "What would we want to have written down, right now, for whichever of us is reading it on the worst day?",
        ],
      },
      {
        title: "Who we are now",
        focus: "The forward conversation. Meeting the two people who came out of this rather than trying to restore the ones who went in.",
        prompts: [
          "What is genuinely better now that I do not want us to take for granted?",
          "What did I lose in the change, in you or in me, that I want to say out loud and grieve?",
          "What do we want this relationship to be about, now that it is not about the substance?",
          "What is one thing we could build together this year that has nothing to do with recovery at all?",
        ],
      },
    ],
    planSeeds: [
      "The daily intent check-in: one sentence from the partner in recovery, one acknowledgment back, no interrogation",
      "A scheduled weekly time for fear and for the past, so it does not leak into every ordinary evening",
      "Each partner keeps their own support outside the relationship: program, group, or therapist, protected on the calendar",
      "A written relapse plan, agreed while calm, stored somewhere you both can find it",
      "One shared activity a month that has nothing to do with recovery, so the relationship has a subject of its own",
    ],
    seekHelp: [
      "There is active use or a relapse happening right now. Stop the couples work and get treatment support first. Call your partner's treatment provider or program contact, and if there is any risk of overdose, treat it as a medical emergency and call emergency services. Guided conversations do not treat addiction and cannot compete with a substance that is currently winning.",
      "Recovery is early or unstable: detox, the first weeks, a recent relapse, or a treatment plan not yet in place. Couples work waits until individual treatment is established. This is a boundary, not a delay tactic. Doing relationship work on top of untreated addiction tends to destabilize both.",
      "Either of you is thinking about suicide, or about not being here anymore. Call or text 988 now, not later. Overdose risk rises sharply after a period of not using, so a relapse after time clean is an emergency, not a setback to discuss on Sunday.",
      "The partner not using is carrying untreated damage of their own: panic, sleeplessness, obsessive checking, depression, or their own drinking that has quietly grown. Individual therapy, and family support groups such as Al-Anon, Nar-Anon, or SMART Recovery Family and Friends, exist for exactly this and are not disloyal to the recovery.",
      "The relationship is being used as leverage over the recovery: threats to expose, to leave over a bad day, to cut off money or access to meetings or to medication. Controlling someone's access to their treatment is abuse. Start with the National Domestic Violence Hotline, not with a conversation exercise.",
      "You keep having the same fight about whether enough time has passed. A therapist who works with addiction and families can hold that question far better than an app can, and the two of you have probably already proved you cannot settle it alone.",
    ],
  },
  {
    slug: "reintegration",
    title: "Coming home is the hard part",
    subtitle: "Reintegration after deployment or a long stretch away",
    overview:
      "Everyone plans for the goodbye, and almost nobody plans for the return. One of you left, built a different life, and came back changed. The other stayed, ran everything alone, got good at it, and is now being asked to make room. The homecoming photo is real, and so is the strange, flat week that follows it, when two competent people keep bumping into each other in a kitchen. This track is for that week and the months after it, whether the separation was a deployment, a rotation, a season of travel, a training program, or a job that took one of you away for a long time.",
    feelings: [
      {
        label: "If you were the one away",
        body: "You may have imagined coming home for months and then felt oddly outside it once you arrived. The house runs on a system you did not build. The kids, if there are kids, go to the other parent first. Your rhythms, your alertness, and your sleep may still belong to somewhere else. There may be things you cannot describe, or do not want to. Feeling like a guest in your own home is common and it is not proof that you no longer belong here. Wanting to be useful again is not the same as wanting to take over.",
      },
      {
        label: "If you were the one who stayed",
        body: "You held everything, probably better than you expected to, and you may have quietly built a life that works. Now someone is home and you are supposed to be nothing but glad, while also being asked to hand pieces back, adjust to a person who is not exactly the one who left, and stop being the one who decides. If you feel resentful, or protective of your systems, or lonelier than you were during the separation, none of that means you did not want them home. Reunion is a second adjustment, not the end of the first one.",
      },
      {
        label: "If this is a cycle, not a one-off",
        body: "When the leaving happens again and again, the pull-away starts before the departure. One of you goes quiet and distant in the weeks before, and the other reads it as rejection or worse, when it is usually anticipatory grief doing its job badly. Naming that pattern out loud, in advance, takes most of its power away.",
      },
    ],
    principles: [
      "Reunion is a phase, not an event. Expect several weeks of awkwardness at minimum, and agree in advance that big decisions, major moves, and large purchases wait until the adjustment has settled. Reentry is a poor time for irreversible choices.",
      "The pull-away before a departure is normal, and it is not rejection. Predict it out loud together before it happens, so neither of you has to interpret it alone in the dark.",
      "Nobody was frozen. Both of you changed while you were apart, and the task is meeting the current person, not resuming the last conversation you had.",
      "Handing responsibilities back is a negotiation, not an automatic restoration. What the at-home partner ran well, they may want to keep. What the returning partner wants back, they should ask for rather than assume.",
      "Some things do not get described, and that has to be allowed. \"I am not able to talk about that\" is a complete sentence. Not being told the details is not the same as being shut out, and pushing for detail can cost more than it gains.",
      "Sleep, alcohol, noise, crowds, and hypervigilance are practical problems with practical accommodations, not character flaws to be argued with.",
    ],
    sessions: [
      {
        title: "The two separate stories",
        focus: "Each of you tells the months apart as your own story. No comparing hardships, no ranking who had it worse. Both jobs were hard in ways the other could not see.",
        prompts: [
          "What did my day actually look like while we were apart?",
          "What was the hardest stretch, and did you know it was happening?",
          "What did I not tell you at the time, and why not?",
          "What am I quietly proud of that nobody has acknowledged?",
        ],
      },
      {
        title: "Who runs what now",
        focus: "The practical conversation most couples skip. Mapping every domain, out loud, and deciding it deliberately rather than by collision. Money, kids, house, cars, schedules, whatever you two have.",
        prompts: [
          "What did I take over while you were gone, and how do I actually feel about giving it back?",
          "What do I want back, and is it because I want it, or because I think I should have it?",
          "What worked better the new way, and could we just leave it that way?",
          "What decision are we going to keep bumping into, and how do we settle it this week?",
        ],
      },
      {
        title: "The reentry protocol",
        focus: "Writing down the rules for the first weeks home, in advance if you can, or now if the return already happened. Boring and specific beats hopeful and vague.",
        prompts: [
          "How many days or weeks before we make any big decisions?",
          "What does each of us need in the first week: quiet, people, structure, space, time alone?",
          "What is our signal for \"I need to step out\" that does not read as walking away from you?",
          "What are we not going to do this month, so we stop stacking pressure on top of adjustment?",
        ],
      },
      {
        title: "What came home with you",
        focus: "The hard one. Sleep, alertness, noise, temper, drinking, nightmares, or simply being somewhere else in the room. Named as facts to work around, not as accusations.",
        prompts: [
          "What has changed in my sleep, my startle, my patience, or my drinking, that I have noticed in myself?",
          "What have you noticed in me that you have been afraid to say?",
          "What helps in the moment, and what makes it worse?",
          "What is off limits to ask about, and what can I offer instead so you are not left guessing?",
        ],
      },
      {
        title: "Finding each other again",
        focus: "Rebuilding closeness and touch when the distance was physical as well as emotional. Slower than either of you expected is the norm, not a problem.",
        prompts: [
          "What do I miss most about how we were with each other?",
          "What feels awkward or forced right now that neither of us has admitted?",
          "What kind of closeness feels good this week, without it having to lead anywhere?",
          "What is one small ritual from before we could restart, or one new one worth trying?",
        ],
      },
      {
        title: "The next cycle",
        focus: "If there will be another separation, planning it now while you are together and calm. If this was the last one, planning the life that comes after it instead.",
        prompts: [
          "What do we want to do differently before the next departure?",
          "How will we stay connected during, realistically, given what the contact actually allows?",
          "What does the at-home partner need lined up in advance: help, money access, permissions, people?",
          "If there is no next one, what are we building now that we could not build before?",
        ],
      },
    ],
    planSeeds: [
      "A written reentry protocol: decision blackout window, first-week needs, and the step-out signal",
      "A domain map on the wall or the fridge: who runs what, revisited monthly rather than fought over nightly",
      "A pre-departure conversation scheduled in advance, so the pull-away gets named instead of interpreted",
      "A weekly hour that is just the two of you, protected from logistics, starting the first week home",
      "One at-home partner ritual that does not disappear when the other returns, because their life is theirs too",
    ],
    seekHelp: [
      "Trauma symptoms that are not easing: nightmares, flashbacks, constant alertness, rage that arrives faster than thought, or numbness that has flattened everything. This is treatable, and treatment for it works better than willpower. Trauma-focused therapy is the right tool.",
      "Drinking or substance use that grew during the separation, on either side. This is common after long deployments and long stretches away, and it is much easier to address early than late.",
      "Thoughts of suicide, of not coming back, or of the family being better off. Call or text 988 now. If either of you is a service member or a veteran, 988 routes to the Veterans Crisis Line, staffed by people who understand military life.",
      "Firearms in the home combined with heavy drinking, sleeplessness, rage, or despair. This is the moment to secure or temporarily store them elsewhere, and to say so to a professional. Not a conversation to postpone.",
      "Any fear, intimidation, or control in the relationship, including a returning partner reasserting authority through threats or through money. Start with the National Domestic Violence Hotline. Couples exercises are the wrong tool where anyone is afraid.",
      "Reintegration that is still failing months later, with the same fight on repeat. Military OneSource offers free, confidential non-medical counseling to service members and families, and many employers with rotational work have similar support through an assistance program. A therapist who understands the cycle is worth more than another attempt at the same conversation.",
    ],
  },
  {
    slug: "empty-nest",
    title: "The house is quiet now",
    subtitle: "Meeting the person you have not dated in decades",
    overview:
      "For years the two of you ran an operation together, and the operation was the kids. Then the last one leaves, and what is left is a quiet that is supposed to feel like freedom and often just feels loud. Most advice says rediscover each other, which misses the point: the people who started this are not here anymore, and the honest task is closer to meeting someone new who happens to know all your stories. There is grief in it, even when you are proud, and even when you are relieved. This track is for building something on purpose in the space that opened up, rather than waiting to see what fills it.",
    feelings: [
      {
        label: "If the quiet is hitting you hard",
        body: "You may be walking into rooms for no reason. The structure that organized your entire day is gone, and if a big part of who you were was the parent in this house, the loss is real and it is not sentimental nonsense. It is also socially unspeakable, because everyone expects you to be delighted about the freedom. You may find yourself looking across the table at someone you love and realizing you do not know what to say to them. That does not mean it is over. It means the shared project ended and a new one has not started yet.",
      },
      {
        label: "If you are more ready than they are",
        body: "You may be genuinely looking forward to this: time, quiet, plans, a body and a schedule that finally belong to you. Then you notice your partner is grieving, and feel guilty for not grieving with them, or impatient for them to catch up. Being ready is not disloyalty to your kids or to your partner. Pretending to be sad does not help either. What helps is not making them wrong for landing at a different speed, and not letting your plans get made without them.",
      },
      {
        label: "If the nest is not actually empty",
        body: "An adult child moved back, or never left, or a parent needs care, or grandchildren arrived at speed. The freedom everyone promised never showed up, and it can be hard to admit you are disappointed about people you love. That disappointment is allowed. This track still works, and the couple time just has to be defended more deliberately.",
      },
    ],
    principles: [
      "Grief and relief are both correct, and you can each be feeling a different one on the same day without either of you being wrong. This is also a legitimate stage to reconsider what you want your life to be, and doing that out loud, together, is far safer than doing it alone in your head.",
      "Update the map, do not consult the old one. What your partner fears, wants, and dreams about now is probably not what they told you twenty years ago, and asking as if for a stranger will surprise you.",
      "Insight does not survive contact with an empty evening. Any good conversation here needs a structure behind it: one new shared thing, started soon, or the quiet just fills itself back up with television.",
      "Separate lives are part of the answer, not a threat to it. Two people with their own friends, interests, and plans have more to bring back to a shared table than two people watching each other.",
      "The kids stay in your life without staying at the center of it. Constant monitoring and daily crisis management of adult children is often a way of avoiding the marriage that is now in the room.",
      "Bodies changed while you were busy. Menopause, andropause, medication, sleep, and years of low privacy all leave a mark. Sexual reconnection at this stage takes intention and it can feel awkward to start. Awkward is fine. Silent is what costs you.",
    ],
    sessions: [
      {
        title: "The honest first week",
        focus: "Saying what this actually feels like, without performing either sadness or excitement for each other's benefit.",
        prompts: [
          "What does the quiet feel like to me, honestly?",
          "What do I miss that I have not admitted, and what do I not miss at all?",
          "What am I afraid we will find out about us now that there is nothing between us?",
          "What did I assume you were feeling that I never actually asked about?",
        ],
      },
      {
        title: "Meeting you again",
        focus: "The love map update, run deliberately as if for someone new. No answering from memory, and no assuming you already know. Ask, listen, be surprised.",
        prompts: [
          "What is on your mind most days right now, that I would not guess?",
          "What are you looking forward to, and what are you dreading, in the next few years?",
          "What is something you have changed your mind about since we started?",
          "What is a want you have quietly shelved because there was never room for it?",
        ],
      },
      {
        title: "What we built, and what we did not",
        focus: "An honest accounting of the years of parenting: what the two of you actually got right, and what got starved while everything went to the kids.",
        prompts: [
          "What are we proud of that we did together, and have we ever said it plainly to each other?",
          "What did we let go of during those years that I want back?",
          "Where did we become good roommates and average partners?",
          "What did I sacrifice that I still feel some resentment about, said calmly and without a bill attached?",
        ],
      },
      {
        title: "The days themselves",
        focus: "Rebuilding the daily structure on purpose. Mornings, evenings, weekends, meals, money, and who is now responsible for what, since the schedule that decided all of it just left.",
        prompts: [
          "What does an ordinary weekday look like now, and what do I want it to look like?",
          "What are we doing out of habit that does not serve us anymore?",
          "What do I want to do alone, and what do I want us to do together?",
          "What is one evening a week we could give a shape to, starting this week?",
        ],
      },
      {
        title: "Bodies, closeness, and the awkward part",
        focus: "The conversation many couples in this stage have never had. Privacy came back, bodies changed, and starting again can feel like being sixteen with a bad back.",
        prompts: [
          "What has changed in my body, my desire, or my confidence that I have never said out loud?",
          "What feels good now, and what has stopped feeling good, and did you know?",
          "What would help me feel wanted at this age, specifically?",
          "What is one low-pressure thing we could try, where nothing has to happen for it to count?",
        ],
      },
      {
        title: "Kids, parents, and the boundary in the middle",
        focus: "Deciding together what you owe the generation above and the generation below, and what you are keeping for the two of you.",
        prompts: [
          "How involved do we each want to be in our adult kids' lives, and where do we differ?",
          "What are we doing for them out of guilt rather than because it helps?",
          "What is coming with our parents, and what have we been avoiding planning?",
          "What are we protecting for us, and how will we defend it when the next request lands?",
        ],
      },
      {
        title: "The next twenty years",
        focus: "The forward look. Health, work, money, place, and what you want this stretch of life to be about. Two timelines, laid side by side.",
        prompts: [
          "What do I want the next five years to hold, in real terms?",
          "What would I regret never having done, and is it actually off the table?",
          "Where do our plans collide, and can we see it now instead of in an argument later?",
          "What is one thing we start in the next two weeks, small enough that we will actually do it?",
        ],
      },
    ],
    planSeeds: [
      "One new shared activity, chosen together and started within two weeks, not researched forever",
      "A standing weekly evening with a shape to it, so the quiet has a plan instead of a default",
      "One question a week from the updated map: current dreams, current fears, no answers from memory",
      "Something separate for each of you, protected on the calendar, that you come back and talk about",
      "A twice-yearly forward conversation: health, money, parents, place, and what the next stretch is for",
    ],
    seekHelp: [
      "Depression in either of you that has outlasted the adjustment: no pleasure in anything, withdrawal from everyone, hopelessness, sleep that has come apart. This stage sets it off in people who have never had it before, and it is very treatable.",
      "Any thoughts of self-harm or of not being here anymore. Call or text 988 now, not later.",
      "Drinking that has quietly grown to fill the empty evenings, in either of you. It is easier to look at early, and it is the most common thing to slide into at this stage.",
      "One of you is seriously considering ending the relationship. That deserves a couples therapist and an honest conversation, not a silent decision made over months while the other partner has no idea it is happening.",
      "A wound that predates this season and never got dealt with, now surfacing with nothing left to distract from it. An affair, a betrayal, an old resentment that is suddenly loud. Some of those need a professional referee, and the app tracks for those wounds are a starting point, not a substitute.",
      "Any fear, control, or intimidation in the relationship, including financial control that has become obvious now that the household is smaller. Start with the National Domestic Violence Hotline. Guided conversations are not the right tool where anyone is afraid.",
    ],
  },
];

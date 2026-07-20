/**
 * Repair tracks: three paths for relationships that are being rebuilt rather
 * than maintained. A couple who broke up and got back together, co-parents
 * trying to lower the war after a split, and partners fighting about phones
 * and what counts as betrayal when nothing physical happened.
 *
 * Same structure and voice as tracks.ts and tracks-extra.ts. Written for all
 * committed romantic relationships, not only marriages: no assumption of legal
 * status, cohabitation, gender, children, or religion unless the content is
 * specifically about that situation.
 *
 * Grounding, from docs/research/frameworks.md:
 *  - The EFT "negative cycle" idea, where the pattern rather than the partner
 *    is named as the target. Presented as a way of seeing, not as a proven
 *    mechanism of change.
 *  - IBCT unified detachment and acceptance work, which translate unusually
 *    well to two people working on paper.
 *  - Stanley, Rhoades and Markman's sliding versus deciding framing, which is
 *    the highest-value exercise for a couple whose commitment is ambiguous.
 *  - The mediation caution: skills work is worth doing, but the research does
 *    not establish that changed communication causes a better relationship. So
 *    every exercise here is framed as an experiment the two of you run, never
 *    as a fix or a guarantee.
 *
 * Mend is an educational tool, not therapy, and not a diagnostic. Nothing here
 * predicts, scores, or grades whether a relationship will last. Every track
 * carries its own red flags, and the reconciling track carries the strongest
 * professional-referral prompts in the product, because the evidence for
 * self-guided work after a breach is the weakest in the whole brief.
 */

import type { Track } from "./tracks";

export const repairTracks: Track[] = [
  {
    slug: "reconciling",
    title: "Back together after a breakup",
    subtitle: "Naming the pattern instead of tiptoeing around it",
    overview:
      "Getting back together is not the same as being repaired. Most couples in a reconciliation are living in a strange, careful truce: enormously relieved, quietly terrified, and avoiding every subject that might reopen the thing that ended it. That avoidance feels like peace and works like a slow leak, because the pattern that broke you up is still in the house and neither of you has said its name out loud. This track does two things: it gets the pattern named plainly, as a shared problem rather than a verdict on either of you, and then it builds one specific, rehearsed, different response for the next time the pattern starts. Nothing here promises an outcome, but it gives you a way to find out what you two are actually capable of now.",
    feelings: [
      {
        label: "If you were the one who left",
        body: "You may be carrying two things that do not sit well together: relief that you are back, and a private fear that you will need to leave again. There is often guilt about the damage the leaving did, and a defensiveness that flares whenever it gets brought up, because you had reasons and it can feel like the reasons have been erased by your return. Coming back is not an admission that you were wrong to go. It also does not settle anything on its own. The thing your partner most needs to know is whether the reasons you left have actually changed, and you are allowed to not know that yet.",
      },
      {
        label: "If you were the one who was left",
        body: "Your nervous system may not have gotten the memo that this is over. Expect a hypervigilance you did not choose: scanning their face, reading tone into short replies, bracing every time a conversation gets serious. A lot of people in your seat go quiet and agreeable, swallowing needs to keep the peace, which is understandable and which slowly builds the exact resentment that made things fragile in the first place. Wanting reassurance is not neediness. Asking for it out loud, on purpose, is better for both of you than checking for it in secret.",
      },
      {
        label: "If the ending was mutual",
        body: "You may have less of a villain and more of a fog: nobody clearly left, so there is nothing obvious to repair, and you are back together without either of you being able to say what changed. That is its own kind of unstable. Couples who drift apart and then drift back often skip the naming step entirely, because there was no single event to point at. The work is the same and slightly harder: find the pattern, say it plainly, and decide something on purpose instead of letting the current carry you again.",
      },
    ],
    principles: [
      "The enemy is the pattern, not the person. If you can describe the loop the two of you fall into as an it, something you can both look at from the same side of the table, most of the blame drains out of the conversation without anyone being asked to be wrong.",
      "Tiptoeing is not safety. Avoiding the hard topic protects the evening and costs the relationship. The goal is not to stop having the hard conversations, it is to have them differently.",
      "Getting back together was a decision, so treat it like one. Drifting back in carries the same risk as drifting in the first time. Say out loud what you are choosing, what it means, and what you are each committing to.",
      "Naming a pattern does not dissolve it. Insight is the easy half. The hard half is one specific new response, rehearsed while you are calm, and used the next time the old loop starts.",
      "The reasons for the breakup are still valid. Reconciliation does not retire them. Whatever drove one or both of you out has to be addressed on its own terms, not absorbed into the relief of being back.",
      "Treat every practice here as an experiment you run together, not a fix. Some will work for you, some will not, and the honest measure is whether you two feel more like teammates a month from now, not whether you performed the technique correctly.",
    ],
    sessions: [
      {
        title: "What actually ended it",
        focus:
          "Both partners tell the breakup story from their own side, in full, without correcting each other's version. You are not trying to agree on the facts tonight. You are trying to hear two accounts that have never been said out loud in the same room.",
        prompts: [
          "When did I first know something was seriously wrong, and what did I do with that instead of telling you?",
          "What was the moment for me that the ending became inevitable?",
          "What did I believe you thought of me by the end?",
          "What have I never told you about what those weeks or months were like on my side?",
        ],
      },
      {
        title: "Naming the pattern out loud",
        focus:
          "Draw the loop. Not who started it, the shape of it: what one of you does, what that pulls from the other, and what that pulls back. Give it a short name you can both use later without it landing as an accusation.",
        prompts: [
          "Walk one specific fight from the old days, move by move. What did each of us do, in order?",
          "What do I usually do when I feel like I am losing you: push harder, go cold, get logical, leave the room?",
          "What is the feeling underneath my move, before it turns into the thing you see?",
          "What should we name this loop, so either of us can say it in ten seconds without it sounding like blame?",
        ],
      },
      {
        title: "The eggshells",
        focus:
          "The subjects you have both been avoiding since you got back, and what the avoidance is costing. This session is about admitting the list exists, not resolving everything on it.",
        prompts: [
          "What subject do I steer us away from, and what am I afraid happens if we go there?",
          "What have I agreed to since we got back that I did not actually agree with?",
          "What do I do to check whether you are still okay with me, that you probably do not know I am doing?",
          "Which one item on this list are we willing to open, deliberately, in the next two weeks?",
        ],
      },
      {
        title: "Building the different response",
        focus:
          "The heart of this track. Pick the single most reliable trigger point in your loop and design one concrete new move each. Specific enough to actually do while flooded: words, timing, exit and return.",
        prompts: [
          "What is the earliest moment either of us can tell the loop has started? What is the tell?",
          "What is my one new move at that moment, said as an action, not an intention?",
          "What do I need you to do when I use it, and what would make it fail?",
          "If one of us needs to stop and come back, how long is the break and who restarts it? Name the number and the person.",
        ],
      },
      {
        title: "Deciding, not drifting",
        focus:
          "Making the reconciliation explicit. Sliding back into a relationship carries the same ambiguity that made it fragile before. This is the conversation where you each say what you are actually choosing.",
        prompts: [
          "What am I choosing here, said in plain words, not implied by the fact that I am sitting here?",
          "What does being back together mean to me practically: exclusivity, plans, money, living arrangements, telling people?",
          "What is my honest answer if you ask whether I am still deciding?",
          "What would we need to see over the next few months to know this is different and not just calmer?",
        ],
      },
      {
        title: "Rehearsing the next time",
        focus:
          "Running the plan on a small live disagreement, on purpose, while the stakes are low. Then reviewing what happened without grading each other. This is practice, and practice includes going badly.",
        prompts: [
          "Take a small current disagreement. Run it using the new moves. What actually happened in our bodies?",
          "Where did the plan hold, and where did we default to the old loop?",
          "What one adjustment would make the plan more usable when it counts?",
          "How will we mark it, out loud, when one of us does the new thing under pressure?",
        ],
      },
    ],
    planSeeds: [
      "A weekly twenty-minute check-in with one standing question: is there anything you have been swallowing this week?",
      "A shared name for the loop, plus permission for either partner to say it mid-conflict without it being an attack",
      "A written break protocol: the words, the length of the break, and who comes back to restart",
      "A monthly reconciliation review: what has actually changed since we got back, said honestly by both of us",
      "One appreciation a day, specific and about something they did, not about who they are in general",
    ],
    seekHelp: [
      "The relationship ended because of an affair or a major breach of trust. That has its own sequence and its own risks. Work the affair track, and get a couples therapist experienced in infidelity recovery involved early.",
      "Either of you is threatening to leave as leverage during arguments, or the fear of another breakup is being used to win disagreements. That is a pattern an app cannot referee.",
      "One partner is here to be forgiven and the other is here to decide. That mismatch usually needs a therapist to hold, because it is unfair to make one of you carry the not-knowing alone.",
      "The same loop keeps running despite months of honest effort. That is common, it is not failure, and it is exactly what couples therapy is designed for. Getting worse before better is a documented pattern in couples who go on to respond well.",
      "Anxiety, depression, or trauma symptoms in either partner that persist beyond the situation itself. Individual therapy helps the relationship more than another conversation will.",
      "Any fear of your partner, any coercion, any physical or sexual violence: this is not the right tool. Go to the safety page now. If you are in immediate danger in the US, call 911, and the National Domestic Violence Hotline is 800-799-7233 or text START to 88788. If you are having thoughts of self-harm, call or text 988.",
    ],
  },
  {
    slug: "coparenting-repair",
    title: "Co-parenting after the split",
    subtitle: "Lowering the war for your kid",
    overview:
      "This track is not about getting back together, and it will not ask you to. It is for two people who are separated or divorced, are not trying to reconcile romantically, and want to stop running their child through a conflict the child never signed up for. The goal is narrow and achievable: a working alliance, the way two colleagues who would not choose each other still run a project well. You do not have to like each other, forgive each other, or agree about why it ended, but you do have to be able to hand off a backpack without a fight, and that is a skill you can build on purpose. Everything here is written to lower the temperature for the person in the middle, who is your kid.",
    feelings: [
      {
        label: "If you did not want the split",
        body: "You may be doing the hardest version of this: cooperating logistically with someone you are still grieving. Every handoff can reopen it, and the anger that shows up in a scheduling text is often grief wearing a different coat. It is also common to hope, quietly, that being reasonable will change their mind. That hope makes co-parenting harder, because it turns every practical conversation into an audition. You are allowed to still be sad. The alliance works better when the grief has somewhere else to go: a friend, a therapist, a journal, anywhere but the handoff.",
      },
      {
        label: "If you ended it",
        body: "You may be carrying guilt that makes you either over-accommodate or go rigid, and both distort the logistics. Guilt also makes criticism land harder, so a neutral question about pickup time can feel like a referendum on you as a parent. The useful move is to separate the two ledgers: whatever you owe your co-parent about the ending is a different account from whether Tuesday pickup is at five or six. Deciding the schedule on its merits is not coldness. It is what lets the child stop absorbing the negotiation.",
      },
      {
        label: "If you are the parent with less time",
        body: "Less time can feel like less standing: decisions made without you, routines you find out about late, a sense that you are a visitor in your own kid's life. That is a real grievance and it is also the fastest route to a fight that the child watches. What tends to help is naming the specific decisions you want to be part of rather than litigating the fairness of the whole arrangement, and building your own rituals in your own home rather than competing with the other household's.",
      },
    ],
    principles: [
      "This is an alliance, not a reunion. The relationship you are rebuilding is a working one. Neither partner should read cooperation as an opening, and neither should have to.",
      "Your child is not a messenger, a witness, or a confidant about the other parent. No relaying schedule changes, no asking them to report, no venting about your co-parent to them. This is the single highest-value rule in the track.",
      "Business tone, business channel. Short, factual, logistics-only messages in one agreed place. If a message would embarrass you if a judge or your kid read it, do not send it.",
      "You will not agree on why it ended, and you do not need to. Trying to win that argument is what turns a scheduling question into a three-day war.",
      "Separate the accounts. Grievances about the relationship go somewhere else. Decisions about the child get decided on what is good for the child.",
      "Consistency across two homes beats identical rules in two homes. Kids adapt to different houses fine. What they cannot adapt to is being caught between two adults who make them choose.",
    ],
    sessions: [
      {
        title: "What we are agreeing to be",
        focus:
          "Setting the terms of the alliance explicitly, including the fact that this is not a path back to a romantic relationship. Say it out loud once so neither person is guessing.",
        prompts: [
          "What are we each here for, said plainly? Name what this is and what it is not.",
          "What does a good version of us as co-parents look like in a year? Describe a normal Tuesday, not a feeling.",
          "What is one thing the other person does well as a parent that I have not said out loud since the split?",
          "What subject is off the table in co-parenting conversations from now on?",
        ],
      },
      {
        title: "What our kid is actually seeing",
        focus:
          "Looking honestly at what the conflict looks like from the child's height. No blame accounting here. Both of you have done some of it, and the point is what changes now.",
        prompts: [
          "What has our child seen or overheard that I wish they had not?",
          "What have I said about the other parent in front of them, or within earshot, that I would take back?",
          "What has our child been asked to carry: messages, secrets, reassuring one of us, choosing?",
          "What have they told us, or shown us in their behavior, about how they are doing?",
          "What is the one change each of us will make this week that they would actually notice?",
        ],
      },
      {
        title: "The handoff and the channel",
        focus:
          "The practical mechanics that cause most co-parenting blowups: transitions, communication, and last-minute changes. Design them so they cannot detonate.",
        prompts: [
          "Which handoffs go badly, and what specifically happens in the ninety seconds before and after?",
          "Where do we communicate from now on, and what belongs there versus what does not?",
          "What is our rule for schedule changes: how much notice, how it is asked, and how a no is delivered?",
          "What is the response time we can each realistically promise, so silence stops reading as contempt?",
        ],
      },
      {
        title: "The old fight riding along",
        focus:
          "Naming the pattern from the relationship that keeps hitching a ride on logistics. This is the one session where the past gets a limited, bounded hearing, specifically so it stops leaking into everything else.",
        prompts: [
          "What argument from our relationship still shows up inside scheduling conversations?",
          "What do I still want to be acknowledged, and am I willing to stop pursuing it here?",
          "What does the other person do that instantly puts me back in the old fight? Name the trigger, not the character flaw.",
          "What do we do when one of us notices the old fight starting: what words, what pause, what next step?",
        ],
      },
      {
        title: "Decisions, money, and what gets written down",
        focus:
          "Deciding who decides what. Ambiguity is what generates conflict, so this session ends with things written down rather than remembered.",
        prompts: [
          "Which decisions are joint, which belong to whoever has the child that day, and which belong to one of us by default?",
          "How do we handle shared costs: what counts, how it is requested, and by when?",
          "How do medical, school, and activity information get shared so neither of us finds out last?",
          "What are we writing down today, and where does the written version live so we both have it?",
        ],
      },
      {
        title: "New partners and two households",
        focus:
          "The introductions, the loyalty binds, and the rules for the other adults who may become part of your child's life. Held before it is urgent, not during.",
        prompts: [
          "What is our agreement about when and how a new partner is introduced to our child?",
          "What role do we each think a new partner should have in discipline, decisions, and daily routines?",
          "What do we say to our child when they express loyalty worry: missing one of us at the other house, feeling like liking someone is a betrayal?",
          "What traditions belong to each household, and which ones do we protect across both?",
        ],
      },
      {
        title: "Reviewing it like a working agreement",
        focus:
          "A short, scheduled review so the alliance is maintained instead of renegotiated in crisis. Logistics only, timed, and it ends with decisions.",
        prompts: [
          "What worked in the last month, specifically?",
          "What broke down, and was it the plan or the execution?",
          "What does our child need in the next month that neither of us has planned for yet?",
          "What one rule are we changing, and when do we review again?",
        ],
      },
    ],
    planSeeds: [
      "One agreed communication channel for logistics, checked on a schedule, with a promised response window",
      "A monthly thirty-minute co-parenting meeting: agenda, timer, decisions written down, no relationship history on the agenda",
      "A pre-handoff reset ritual for each parent: five minutes alone before pickup so the child does not receive the leftover tension",
      "A standing rule, said out loud to your child, that they never have to carry a message between you",
      "One shared calendar with school, medical, and activity dates that both parents can see and edit",
    ],
    seekHelp: [
      "Conflict that keeps escalating despite honest effort on both sides. Co-parenting counseling exists specifically for this, and it is a different service from couples therapy: the goal is a workable alliance, not a relationship.",
      "If direct communication reliably turns hostile, parallel parenting is the right structure rather than a failure. It minimizes contact by design: fixed schedules, written communication only or through a co-parenting app, separate school and medical contacts, no joint attendance at events, and each parent making day-to-day decisions during their own time. A family therapist or a parenting coordinator can help you set it up.",
      "Disagreements about custody, schedules, relocation, or support that you cannot resolve between you. That is what family mediation and family law are for, and using them is not an escalation. A mediator is usually faster, cheaper, and less adversarial than litigation. Many US courts run mediation programs and many areas have legal aid offices for people who cannot afford a lawyer.",
      "Any existing court order, parenting plan, or protective order. Follow it exactly, and do not use this track to negotiate around it. Changes to a legal order need to go through the legal process, not a private agreement.",
      "Your child showing sustained changes: sleep, school, withdrawal, anger, regression, self-harm talk, or telling you they feel responsible for the adults. A child therapist is the right call, and it is not an admission that you have damaged them. If there is any talk of self-harm, call or text 988 in the US.",
      "Any fear of your co-parent, any stalking, coercion, threats, or violence, or any concern about your child's safety in the other home. Do not attempt joint sessions. Go to the safety page, contact a lawyer, and in the US call 911 in an emergency. The National Domestic Violence Hotline is 800-799-7233 or text START to 88788. Suspected abuse or neglect of a child: the Childhelp National Child Abuse Hotline is 800-422-4453.",
    ],
  },
  {
    slug: "digital-trust",
    title: "Phones, apps, and what counts as betrayal",
    subtitle: "Writing agreements together instead of policing each other",
    overview:
      "A lot of couples are having a fight that neither of them can win, because they are arguing about a rule that was never written. One partner finds a message, a follow, a saved photo, a late-night thread, and feels genuinely betrayed. The other says nothing happened, and by their own definition that is true. You are both arguing from private rulebooks you have never compared. This track does not decide who is right, because there is no universal answer to what counts: it gets the two rulebooks on the table, gets you to write one you both actually agree to, and replaces checking with something more durable, because surveillance calms a nervous system for about an hour and then needs a bigger dose.",
    feelings: [
      {
        label: "If you are the one who feels betrayed",
        body: "Being told nothing happened when your whole body says something did is a specific kind of crazy-making. What hurts is usually not the pixels, it is the hiddenness: the tilt of the screen, the deleted thread, the account you did not know about. That is real information and you are not paranoid for reacting to it. It is also true that checking tends to grow. Most people who start looking find that the relief lasts less and less time, and that the looking itself starts to feel bad. The way out is not more access. It is an agreement you both actually believe in.",
      },
      {
        label: "If you are the one being checked",
        body: "Being asked to prove a negative is exhausting, and there is a particular resentment in handing over your phone while feeling like the answer will never be enough. Some of what you are being asked about probably is genuinely nothing. And it is worth being honest about the parts that are not nothing: the message you would not want read out loud, the account you keep quiet, the person you talk to differently. Privacy and secrecy are not the same thing, and the difference is usually whether you would be comfortable if your partner knew it existed, not whether they read every word.",
      },
      {
        label: "If you are both doing it",
        body: "Plenty of couples are checking each other and neither has admitted it. That usually means the trust question is mutual and neither of you has a clean seat to argue from. It can be a relief to say that out loud. It also means the agreement you write has to bind both of you the same way, and that a one-sided transparency arrangement will not hold.",
      },
    ],
    principles: [
      "There is no universal definition of digital betrayal. Yours came from your history, your friends, your last relationship, and what you have seen. So did theirs. The work is not to find the correct answer, it is to write one you both agree to.",
      "Secrecy is the injury more often than the content. Ask what was hidden and why, not just what it said. A conversation your partner knows about is a different object from the same conversation deleted.",
      "Access is not trust. Open phones can coexist with total disconnection, and monitoring reliably escalates: the reassurance from checking fades faster each time and the appetite grows.",
      "Agreements are written together, in advance, in daylight. A rule imposed after a discovery is a punishment and gets treated like one. A rule you both wrote is something you can hold each other to.",
      "Behavior is negotiable, feelings are not up for debate. You can argue about whether a rule is reasonable. You cannot argue someone out of feeling betrayed, and trying is what turns a repairable moment into a long fight.",
      "Watch for the check-and-withdraw loop: one partner checks, the other pulls back and hides more, which raises the checking. Name the loop as the target rather than each other.",
    ],
    sessions: [
      {
        title: "Two private rulebooks",
        focus:
          "Each partner lays out their own definition of what crosses a line, before hearing the other's. Write them separately first, then read them out. The gap is the whole point.",
        prompts: [
          "List, in order, what would feel like a betrayal to me: from mildly uncomfortable to unacceptable.",
          "Where did my definition come from: a past relationship, my family, something I watched happen to someone else?",
          "What is on my list that I assumed was obvious and universal?",
          "What is on your list that genuinely surprises me?",
        ],
      },
      {
        title: "What actually happened",
        focus:
          "The specific incident, if there is one, held once and carefully. The partner who felt betrayed speaks first and fully. The other listens without correcting the record. Explanations come in the next session, not this one.",
        prompts: [
          "What did I find or notice, and what did my body do in that moment?",
          "What did it make me believe about us that I have not been able to say calmly?",
          "What is the question I most want answered honestly, even if the answer is hard?",
          "What do I need in order to feel like this has actually been heard rather than managed?",
        ],
      },
      {
        title: "Secrecy, privacy, and the honest inventory",
        focus:
          "The partner whose behavior is in question now gets the floor, not to defend but to be straight. This is the session where things get named voluntarily, because a later discovery costs far more than an early admission.",
        prompts: [
          "What have I kept from you, and what was I actually protecting: you, me, or the thing itself?",
          "Is there anyone I talk to in a way I would not want you to see? Say it now.",
          "Where is the line for me between privacy I am entitled to and secrecy that is costing us?",
          "What have I done in response to being checked that made this worse rather than better?",
        ],
      },
      {
        title: "The checking loop",
        focus:
          "Looking at the surveillance dynamic itself as a shared pattern rather than one person's fault. Both partners describe their half of the loop honestly.",
        prompts: [
          "When do I check, what sets it off, and what does it feel like right after?",
          "What do I do when I feel watched, and how does that land on you?",
          "What is the underlying question I am really trying to answer when I look?",
          "What could I ask for directly instead, and what would I need from you to make asking feel possible?",
        ],
      },
      {
        title: "Writing the agreement",
        focus:
          "The build session. Turn the two rulebooks into one written agreement, in specific behaviors rather than principles. Written agreements only work when both partners could actually keep them, so cut anything either of you is quietly planning to break.",
        prompts: [
          "What are we agreeing to about contact with exes, dating apps, private accounts, and DMs with people we are attracted to?",
          "What do we agree about hiding: passcodes, deleted threads, apps the other does not know about?",
          "What are we explicitly saying is fine, so neither of us has to guess about ordinary things?",
          "What happens if one of us breaks this: what is the repair, and how does it get raised without a raid?",
          "Is there anything in this agreement I am signing to end the conversation rather than because I mean it? Say it now.",
        ],
      },
      {
        title: "Rebuilding without surveillance",
        focus:
          "Replacing checking with volunteered openness, and giving the agreement a review date. The measure is not perfect compliance, it is whether the fear is trending down over weeks.",
        prompts: [
          "What can I volunteer proactively, before being asked, that would actually help?",
          "What is the signal for a spike of fear, and what response helps in that moment rather than makes it worse?",
          "How will we know in a month whether this is working, in behavior we can point at?",
          "When do we sit down and revise this agreement, and who calls the meeting?",
        ],
      },
    ],
    planSeeds: [
      "A written agreement both partners keep a copy of, revisited on a set date rather than after the next fight",
      "Phone-free windows: an hour in the evening and the first thirty minutes of the day, devices in another room",
      "A proactive-share habit: mention the ambiguous thing before it is discovered, every time",
      "A spike signal that requests reassurance directly instead of a search, plus an agreed response that is not defensiveness",
      "One weekly conversation with no devices present, on any topic other than this one, so the relationship is more than its security system",
    ],
    seekHelp: [
      "Checking has become compulsive: hours lost, sleep gone, relief that fades within minutes. That is an anxiety pattern and individual therapy treats it well. It is not a character flaw and more access will not resolve it.",
      "There was an actual affair, physical or emotional, or an ongoing hidden relationship. That needs the affair track and a couples therapist experienced in infidelity recovery, not a phone policy.",
      "The agreement keeps getting broken, or new hidden accounts and deleted threads keep surfacing. Repeated discovery after a commitment to honesty is a couples-therapy conversation, not another rule.",
      "Compulsive pornography or app use that one partner cannot stop despite wanting to, or that is displacing the relationship or affecting work. A therapist with specific experience in compulsive sexual behavior is the right referral.",
      "Monitoring that has become control: demanded passwords, tracking location, reading messages without consent, dictating who your partner may talk to or follow, threats about what happens if they say no, or installed monitoring software. This is coercive control, not insecurity, and joint exercises can make it more dangerous. Go to the safety page now. In the US, the National Domestic Violence Hotline is 800-799-7233 or text START to 88788, and the NNEDV Safety Net project publishes guidance on tech abuse and stalkerware. In an emergency call 911.",
      "Threats to share private images, or images shared without consent. That is abuse and in many places a crime. In the US, the Cyber Civil Rights Initiative helpline is 844-878-2274. If you are having thoughts of self-harm, call or text 988.",
    ],
  },
];

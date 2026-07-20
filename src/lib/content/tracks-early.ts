/**
 * Tracks for couples who are not married. Same structure and voice as
 * tracks.ts and tracks-extra.ts. These cover the three situations testing
 * found most often among committed unmarried couples: a next step the two of
 * you don't agree on, a relationship carried across distance, and the first
 * year of sharing an address.
 *
 * Guardrails specific to this file:
 * - Nothing here may imply that moving in, committing further, closing the
 *   distance, or staying together is the healthy outcome. The app has no vote.
 * - No readiness score, no verdict, no prediction about whether a relationship
 *   will last. Mend is an educational tool, not therapy and not an oracle.
 * - seekHelp is always free, always visible, never trimmed. Coercive control
 *   in these relationships often looks like tracking, housing pressure, money
 *   control, or threats to expose something, so those are named directly.
 */

import type { Track } from "./tracks";

export const earlyTracks: Track[] = [
  {
    slug: "deciding-together",
    title: "The next step we don't agree on",
    subtitle: "Deciding well, whatever the two of you decide",
    overview:
      "Plenty of couples arrive here with a decision sitting between them: move in, commit further, build one life instead of two parallel ones. Usually the pressure is not the decision itself. It is that one of you feels ready and the other doesn't, and now every ordinary Tuesday carries the weight of it. This track has no opinion about what you should choose. Its whole job is to help you choose on purpose, with both sets of reasons said out loud, instead of arriving somewhere by drift, exhaustion, or an ultimatum nobody meant to issue. Going ahead, waiting, and finding out you want different lives are all real outcomes, and no app can tell you which one is yours.",
    feelings: [
      {
        label: "If you're the one who feels ready",
        body: "There is a particular loneliness in wanting something and having to keep asking for it. You may be tired of raising it, embarrassed by how often you raise it, and quietly humiliated by the idea of talking someone into wanting a life with you. That is worth saying plainly rather than converting into an ultimatum at 11pm. One hard truth to hold: wanting this is not pressure, but asking the same question every week becomes pressure whatever you intended, and pressure makes an honest answer harder to give.",
      },
      {
        label: "If you're the one who isn't ready",
        body: "You may be carrying a role you never auditioned for: the cautious one, the commitment problem, the person holding everything up. Hesitation is information, not a character defect, and it usually has a reason underneath it that you may not have found words for. The real danger on your side is agreeing to end the discomfort. A yes given to stop a conversation is the most expensive kind, because it buys a few calm weeks and charges you both for years.",
      },
      {
        label: "If neither of you is sure",
        body: "Nobody is the villain here, which sounds easier and is often harder, because there is no obvious next move and no one pushing. The risk is drift: leases renew, seasons pass, and one day you are living an answer neither of you chose. Your work is different from the other two versions. It is figuring out what would make this clearer, what would have to happen for either of you to know, and by when you want to look at it again.",
      },
    ],
    principles: [
      "There is a difference between sliding into a change and deciding on it. Stanley, Rhoades and Markman named this sliding versus deciding: transitions that happen because a lease ended or it was simply easier carry the risk that neither person ever actually chose. Whatever you land on, land on it out loud.",
      "Mend does not get a vote, and it will never show you a readiness score. No quiz, pulse number, or streak in this app can tell you whether to take this step, and any tool that offers you a percentage on that question is selling you something.",
      "Two people can want different timelines and both be acting in good faith. This argument hands out two nicknames, the coward and the pusher, and both of them are cartoons of a real person with real reasons.",
      "A no about right now is information about right now, not a verdict on the whole thing. Say which one you mean, because your partner cannot tell from the outside.",
      "Some differences get managed rather than solved. Part of this decision is working out which differences you could live beside for years, and being honest with yourself when one of them is actually a dealbreaker.",
      "Silence is a decision too. Not choosing hands the answer to whichever of you gets tired first, which is the one way to guarantee that neither of you chose it.",
    ],
    sessions: [
      {
        title: "The thing itself, in plain detail",
        focus:
          "Before anyone argues, both of you describe the actual step as concretely as you can: what changes on an ordinary weekday, what it costs, what it looks like six months in. A surprising number of these fights are two people defending two different pictures.",
        prompts: [
          "When I picture this step, walk me through one ordinary weekday inside it, wake up to bedtime.",
          "What specifically changes for me, and what specifically changes for you?",
          "What have I been assuming you already agree to that we have never actually said?",
          "What would this step mean about us? Set the logistics aside and answer the meaning.",
        ],
      },
      {
        title: "What each answer costs each of us",
        focus:
          "Both answers have a price. Naming yours out loud stops your partner guessing at it, and stops the conversation running as if only one of you has something to lose.",
        prompts: [
          "If we do this, what am I giving up or risking?",
          "If we don't do this now, what am I giving up or risking?",
          "What is the cost I've kept quiet about because saying it sounds selfish?",
          "What do I think this is costing you, and am I anywhere close to right?",
        ],
      },
      {
        title: "The fear under the logistics",
        focus:
          "Under the lease terms and the calendar there is usually a fear neither of you has said in a full sentence. One person holds the floor, the other mirrors it back. No rebuttals in this session, no corrections, no context.",
        prompts: [
          "What am I actually afraid of here, in one sentence, with no justification attached?",
          "Has something like this gone badly for me before, and how much of that old alarm is in this room?",
          "What would I need to hear from you that I have been too proud to ask for?",
          "What have I been reading into your hesitation, or into your pushing, that might not be true?",
        ],
      },
      {
        title: "Two timelines, no coward and no pusher",
        focus:
          "Putting both timelines on the table as facts rather than character judgments, and formally retiring the two nicknames this argument keeps assigning.",
        prompts: [
          "What is my honest timeline, in months or seasons, not in the word someday?",
          "What is driving my timeline: readiness, money, family, a lease, a fear, something else entirely?",
          "What have I called you in my head during these fights, and what is unfair about it?",
          "What do I want you to understand about my pace so that it stops feeling like an insult?",
        ],
      },
      {
        title: "What would have to be true",
        focus:
          "Turning a stalemate into conditions. These are descriptions of what would change the answer for each of you, not tests you set for each other and grade in private.",
        prompts: [
          "What would have to be true for me to be ready? Specific enough that we would both notice it happening.",
          "Is anything on my list really a request that you become a different person?",
          "What on these two lists can either of us actually do something about?",
          "What is out of both of our hands entirely, and how do we carry that honestly instead of pretending it away?",
        ],
      },
      {
        title: "A review date, not a vague promise",
        focus:
          "Ending with something written down: when you look at this again, what each of you is doing before then, and an honest naming of where this can land. Going ahead, waiting, and choosing different lives are all on the table, and saying so is not a threat. It is what makes the rest of the conversation real.",
        prompts: [
          "When do we look at this again? Pick an actual date and put it on both calendars.",
          "What is each of us doing between now and then, if anything?",
          "What are we agreeing not to reopen every week, so this stops eating ordinary evenings?",
          "If our answers are still different on that date, how do we want to treat each other about it?",
        ],
      },
    ],
    planSeeds: [
      "A standing monthly twenty-minute check-in on the decision, in daylight, never at midnight",
      "A settled list: what you agreed once, with the date, not reopened without both of you",
      "The review date on both calendars, with no countdown and no reminders in between",
      "One weekly conversation about the life you each want that is not about the step",
    ],
    seekHelp: [
      "The pressure has an ultimatum attached to it: your money, your housing, your immigration status, your family, or something private about you being told to someone. That is not negotiation. See the safety page. In the US, the National Domestic Violence Hotline is 800-799-7233 or text START to 88788.",
      "One of you is being tracked, asked to prove where you are or who you're with, asked to hand over passwords, or punished for not answering. Control can arrive dressed as commitment. See the safety page.",
      "Either of you is threatening to leave, or threatening self-harm, as a way to end the argument. That needs a professional now, not a session. If anyone is actually thinking about suicide, call or text 988 now, and treat a threat as real rather than as a tactic.",
      "One of you is holding something the other would need in order to decide honestly: debt, another relationship, a health issue, a plan already made. A disclosure that size usually goes better with a therapist in the room.",
      "This decision is sitting on top of weeks of low mood, sleeplessness, or anxiety in either of you. Individual therapy first. A choice this size is unfair to make while someone is running on empty.",
      "You have had this identical conversation for months with no movement at all. A couples therapist can hold a stalemate far better than an app can, and plenty of them work with unmarried couples on exactly this.",
    ],
  },
  {
    slug: "long-distance",
    title: "Across the miles and the clocks",
    subtitle: "Keeping this real when you're mostly apart",
    overview:
      "Long distance is not a thinner version of a relationship. It is a different job. What you lose is everything that holds a couple together for free when they share a kitchen: the shared silence, the accidental touch, the small repair that happens because you both ended up at the sink at the same time. What's left has to be deliberate, which is why it can feel like work, and why one quiet week can read as a crisis. Distance also puts a specific strain on trust, because you cannot see the room your partner is standing in, so imagination fills it. This track is for the loneliness, the trust questions, and the plan, including the honest version where the gap doesn't close on the timeline either of you hoped for.",
    feelings: [
      {
        label: "If you're the one who moved",
        body: "Your days are probably full: a new city, new people, a reason you went. That fullness comes with a guilt most people never say out loud, the guilt of having a genuinely good week while your partner is having a flat one. Many people in your position start editing the good parts down so their partner won't feel worse, and that small kindness quietly becomes a distance of its own. You are allowed a life where you are. Shrinking your reports of it is what corrodes things.",
      },
      {
        label: "If you're the one who stayed",
        body: "Your rooms are the same rooms, now with a person-shaped hole in them. You may be living on a calendar you did not choose, built around someone else's job or school or family, and it can start to feel like your own life is a waiting room. Waiting is not a personality, and the resentment that shows up underneath it is not evidence that you love them less. It usually means you have been carrying something without ever being asked how it's going.",
      },
      {
        label: "If one of you wants more contact than the other",
        body: "One of you feels neglected by the frequency and the other feels monitored by it, and both of you are being honest. Neither number is the correct number. The trap is that contact turns into a ledger: who called, who was short, who took four hours to reply. Once it's a ledger, every message is being graded, and nobody sends anything real to a grader.",
      },
    ],
    principles: [
      "Distance doesn't create the problem. It removes the shock absorbers. A misunderstanding that would die in ten seconds in the same kitchen can live for two days across two time zones.",
      "Trust is built by predictability, not by proof. Checking up tells you where someone was at 11pm and nothing about whether you are safe with them. Asking directly, and getting a straight answer, is the version that actually holds.",
      "The day report is not connection. Two people can trade complete schedules every night for a year and know almost nothing about each other. Trade one feeling for every three facts.",
      "The crash after a visit is real and predictable. Both of you will be flat, and probably a little short with each other, for a few days after a goodbye. Naming it in advance stops it from becoming a fight about the whole relationship.",
      "Frequency is a poor stand-in for closeness, and a rigid quota turns love into homework. Agree on a shape you can both keep, protect that, and let the rest be free.",
      "A plan with a shape beats a promise with a feeling. And if one of you cannot move, because of a job, a visa, a child, a parent who needs you, that has to be sayable out loud rather than quietly hoped away.",
    ],
    sessions: [
      {
        title: "What the distance actually costs each of us",
        focus:
          "Each of you names your own cost. This is not a competition over who has it worse, and the listener's only job is to hear it without balancing the ledger.",
        prompts: [
          "What is the hardest hour of my week, and what am I usually doing in it?",
          "What do I miss that I've never told you, because it sounded too small to say?",
          "What do I do in the first ten minutes after we hang up?",
          "What have I stopped telling you about, and what was I protecting by not saying it?",
        ],
      },
      {
        title: "The call that turned into a day report",
        focus:
          "Fixing the calls themselves. Most long distance couples talk constantly and connect rarely, and nobody says so because saying so sounds like a complaint about the person.",
        prompts: [
          "What do I want a call to feel like, and what does it usually feel like?",
          "What have I been saving up to tell you, and did I ever actually tell you?",
          "When a call goes quiet, what do I assume that silence means?",
          "Would I rather have three short honest calls or one long dutiful one? Say the true answer, not the generous one.",
        ],
      },
      {
        title: "Trust, without surveillance",
        focus:
          "The trust conversation run as a request instead of an investigation. Each of you says what would make you steadier, and both of you draw a hard line at monitoring, which never produces the safety it promises.",
        prompts: [
          "What situation do I find hardest not to picture, and what would genuinely settle it?",
          "What would I want to hear about proactively, before I have to ask for it?",
          "Have I been checking instead of asking? What was I hoping to find, and what did I actually find?",
          "What have we never spelled out about other people, and what would count as a breach for each of us?",
        ],
      },
      {
        title: "Closeness on a screen, with nobody being graded",
        focus:
          "Intimacy across distance, held honestly. Either of you may pass on any question here with no explanation owed, and nothing said in this session gets quoted back in an argument later.",
        prompts: [
          "What makes me feel wanted from a thousand miles away?",
          "What do I want more of, and what have I been going along with because it seemed expected?",
          "What is off the table for me right now, said plainly, with no reason owed?",
          "How can I tell you I'm lonely in a way that doesn't land on you as a complaint?",
        ],
      },
      {
        title: "The visit, and the days after it",
        focus:
          "Designing visits that are not audition weekends, and planning for the flat days that follow a goodbye so neither of you reads them as the relationship failing.",
        prompts: [
          "What do I want a visit to include that is not a plan, an event, or somebody's family?",
          "What pressure do I put on visits to be perfect, and what does that pressure cost us?",
          "What does the day after a goodbye actually look like for me, and what helps?",
          "What is one boring, ordinary thing we could do on every visit so it isn't all highlights?",
        ],
      },
      {
        title: "The gap, and how it closes",
        focus:
          "The plan, said honestly, including the possibility that it takes longer than either of you wants or that one of you cannot be the one who moves. Closing the distance is one outcome among several, and this session does not assume it.",
        prompts: [
          "What is my honest picture of how this ends, and roughly by when?",
          "What am I not able to move for right now, and have I ever said it in a full sentence?",
          "What would each of us be giving up if the move went one way, and what if it went the other?",
          "When do we look at this again, and what do we do in the meantime so it isn't a countdown running under every call?",
        ],
      },
    ],
    planSeeds: [
      "A protected overlap window on both calendars, defended like an appointment",
      "A goodnight voice memo for the partner who is already asleep",
      "Thirty minutes on a call doing separate things with nothing to say, cameras on only if both of you want them on and either of you can say no without a reason",
      "One question banked during the day and saved for the call instead of spent on text",
      "A visit debrief within a week of every goodbye: what was good, what was hard, what we want next time",
    ],
    seekHelp: [
      "Location tracking, demands that you prove where you are or who you're with, required video as proof, punishment for an unanswered call, or pressure to hand over your passwords. Distance gets used as the reason for all of this, and it is control rather than care. See the safety page. In the US, the National Domestic Violence Hotline is 800-799-7233 or text START to 88788.",
      "Threats to tell your family, your employer, your landlord, or anyone else something about you that you have not chosen to share. See the safety page.",
      "One of you depends on the other financially across the distance and is being reminded of it. That is a leash, and there are people whose whole job is helping with exactly this. See the safety page.",
      "Either of you has no life where you are: no friends, no interest in building any, everything routed through the phone. Distance plus isolation is a fast road into depression, which is common and treatable. If either of you is having thoughts of self-harm, call or text 988 now.",
      "A trust question that turns out to be about something that actually happened. Stop here and use the affair track, which is built for that order of operations.",
      "The same fight is happening on every call, or visits are ending in contempt. Many couples therapists now work by video with each of you in a different place, which makes this one of the easier kinds of help to get.",
    ],
  },
  {
    slug: "moving-in",
    title: "The first year in one place",
    subtitle: "When logistics turn into identity fights",
    overview:
      "The first year of sharing an address is rarely about dishes. It is the first time two people see each other with the editing switched off: how you spend, how you rest, how you behave when you're annoyed at 7am and there is nowhere to go. Ordinary logistics start carrying enormous weight, because a full sink stops being a full sink once you are also working out whether you are respected in this home. There is a quieter problem underneath it: two people can move into the same apartment believing two different things about what moving in means, and never find out until it costs something. This track gets the meaning, the labor, the money, the space, and the front door into the open early, while they are still cheap to talk about.",
    feelings: [
      {
        label: "If you moved into their place",
        body: "You can be a guest in your own home for months. Everything already has a location that somebody else decided, the mugs live somewhere, the routine was set before you arrived, and you find yourself asking permission to hang a picture in the place you now live. Most people in this seat over-adapt quietly and then resent all of it at once, in one bad Thursday that seems to come from nowhere. Say the boring version early. It is much easier to hear than the speech.",
      },
      {
        label: "If they moved into your place",
        body: "You may feel invaded by someone you actively chose, which is a confusing thing to feel and an embarrassing thing to admit. Systems that worked fine for years are suddenly up for debate, your things have moved, and there is no hour of the day that is reliably yours. Both of these can be true at once: you wanted this, and you want your apartment back. Saying the second one does not cancel the first.",
      },
      {
        label: "If it's new ground for both of you",
        body: "Nobody has home advantage, which helps, and nobody has any idea what they're doing, which doesn't. The specific risk here is that you are both performing the easy version of yourselves, the good roommate who never minds, and neither of you announces the moment it stops being easy. Two accommodating people can build a home where nothing is ever said, and then wonder why it feels lonely in there.",
      },
    ],
    principles: [
      "Most of these fights are not about the task. They are about fairness, and about whether the work you do is seen. Some of them genuinely are about the task, and a schedule solves those in one evening. Sort them, because treating a scheduling problem as a character problem is how an ordinary week turns poisonous.",
      "Standards are inherited, not moral. Neither of the houses you two grew up in was the correct one. Clean is a family dialect, and so is on time, and so is enough.",
      "There is work you cannot see: remembering, tracking, noticing, planning, keeping the running list in someone's head. It is real labor, and it is close to invisible to whichever of you is not carrying it.",
      "Money under one roof needs a stated principle, not a nightly argument. Unequal incomes are ordinary and workable, and so is one of you having no wage at all: benefits, a student year, a health problem, and unpaid care are all real contributions to a household and none of them make someone a guest in it. What does not work is one of you quietly deciding what's fair while the other quietly disagrees.",
      "Wanting time alone is not a withdrawal from your partner. Full-time exposure is new for both of you, and doors exist for a reason.",
      "Say out loud what living together means to each of you. Two people can share a lease for two years while one of them believes it is a step toward a whole life and the other believes it is a good arrangement, and neither finds out until something forces the question.",
    ],
    sessions: [
      {
        title: "What each of us thinks this is",
        focus:
          "Meaning before logistics. This one goes first on purpose, because the chore conversation is unwinnable while you are quietly working from two different definitions of what you are doing here.",
        prompts: [
          "What did moving in mean to me? Not what I said at the time, what it actually meant.",
          "What did I assume it meant to you?",
          "What are we to each other now, in a sentence I would say out loud to somebody else?",
          "What did I quietly hope this would settle, and has it settled it?",
        ],
      },
      {
        title: "The two houses we came from",
        focus:
          "An audit of where your standards came from, done without either of you being told your version is the wrong one. Describe preferences as preferences.",
        prompts: [
          "What was normal in the house I grew up in that I have since discovered is not universal?",
          "What do I do here that is really just my family's way rather than a rule?",
          "What of yours drives me up the wall, described as a preference and not as a flaw in you?",
          "What am I not willing to change, and can I say why without calling it obvious?",
        ],
      },
      {
        title: "The list nobody wrote down",
        focus:
          "The actual inventory. Every recurring job in this home on one list, including the ones that exist only inside somebody's head, before anyone negotiates anything.",
        prompts: [
          "Every repeating task in this home, said out loud, one at a time, until we run out.",
          "Who does each one, and who remembers it needs doing? Those are two separate jobs.",
          "What do I do here that I don't think you have ever seen?",
          "What am I happy to trade, and what would I rather do badly forever than argue about again?",
        ],
      },
      {
        title: "Money under one roof",
        focus:
          "Getting the numbers and the principle into the same conversation, once, on a calm day. Facts first, meaning second, no verdicts on anyone's history.",
        prompts: [
          "What money actually comes in for each of us, from wherever it comes in from, and what do we each owe and spend? Real numbers, said out loud, once.",
          "What is our principle: even split, proportional to income, separate with a shared pot, something else? Put it in one sentence.",
          "What size of purchase needs a conversation first, and what is genuinely nobody else's business?",
          "What did money mean in the house I grew up in, and what does spending make me feel here?",
        ],
      },
      {
        title: "Doors, quiet, and time that is only mine",
        focus:
          "Space, alone time, and the difference between needing an hour and needing away from your partner. Both of you answer, including whichever of you thinks they don't need much.",
        prompts: [
          "How much time alone do I actually need in a week to feel like myself?",
          "How can I say I need an hour so it doesn't land as I need to get away from you?",
          "What space in this home is mine, even if it is a chair, a drawer, and a shelf?",
          "When we are both home and both quiet, what do I assume is going on with you?",
        ],
      },
      {
        title: "Guests, families, and the front door",
        focus:
          "Who comes in, how much warning the other one gets, and the rule that each of you manages your own people. Close families are usually love rather than an invasion, and they still need a door policy.",
        prompts: [
          "What is our rule on people staying over, and how much notice does the other one get?",
          "Whose family or friends turn up here most, and how does that land on the other one?",
          "What do I need when your people are here, and what will I do instead of going quiet about it?",
          "Which of these conversations is mine to have with my own family rather than yours?",
        ],
      },
      {
        title: "Six months in, what we're keeping",
        focus:
          "The review. Keep what worked, change what didn't without treating the change as a defeat, and say plainly what each of you has learned about living with yourself.",
        prompts: [
          "What has genuinely improved since we started talking about this on purpose?",
          "What did we agree to that isn't working, and can we change it without anyone losing?",
          "What have I learned about living with me?",
          "What is the one thing I want us to protect through the next year in this place?",
        ],
      },
    ],
    planSeeds: [
      "A twenty-minute household meeting once a week, logistics only, timer running, kept separate from the relationship talk",
      "A settled list: agreements you made once, with the date, not reopened without both of you",
      "One evening a week where each of you is off duty at home, with no guilt and no explanation",
      "A money principle written in one sentence, revisited a few times a year instead of argued nightly",
      "A guest rule: nobody arrives or stays over as a surprise",
    ],
    seekHelp: [
      "You are being pressured or given an ultimatum about a lease, a mortgage, or whose name goes on what, or you are being told you would have nowhere to live. Housing is a common lever for control, and unmarried partners often have fewer legal footholds than people assume. See the safety page. In the US, the National Domestic Violence Hotline is 800-799-7233 or text START to 88788, and advocates there can point you to local housing and legal help.",
      "One of you controls the money the other needs to live: an allowance, hidden accounts, debt taken out in your name, receipts demanded. See the safety page.",
      "You are being monitored at home, checked on, or punished for seeing friends, or your world has quietly shrunk to this apartment and the person in it. See the safety page.",
      "Any fear of your partner, any threats, or anything physical. Leaving is not a failure of this track and staying is not the goal of it. Go to the safety page now, and in an emergency in the US call 911.",
      "Alcohol or drug use is making the home unpredictable or frightening. That is a treatment question before it is a chores question, and it does not wait for a better week. If either of you is having thoughts of self-harm, call or text 988 now.",
      "Contempt has become the everyday tone inside the first year: eye-rolling, mockery, name-calling, the little disgusted noise. That is worth a professional now rather than later.",
      "You have been having the same fight since the boxes were unpacked. A couples therapist can often break a loop like this in a handful of sessions, and they see unmarried couples routinely.",
    ],
  },
];

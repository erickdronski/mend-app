/**
 * Difference tracks: for couples whose main strain is not a single wound but a
 * gap in how the two of you are built, where you come from, or what safety
 * requires. Same structure and voice as tracks.ts and tracks-extra.ts.
 *
 * Written for all committed romantic relationships, married or not. Difference
 * is treated as design work between two valid people, never as one partner
 * needing to become more normal. Every track signposts professional help and
 * names the red flags where an app is the wrong tool.
 */

import type { Track } from "./tracks";

export const differenceTracks: Track[] = [
  {
    slug: "wired-differently",
    title: "Wired differently",
    subtitle: "When one or both of you is ADHD, autistic, or otherwise neurodivergent",
    overview:
      "Most relationship advice was written for two brains that process at the same speed, in the same channel, with the same tolerance for noise and surprise. When one or both of you is ADHD or autistic, that advice does not just fail quietly, it often makes things worse: it tells you to communicate more when more talking is exactly what floods one of you, and it reads a missed task as a statement about love. What tends to break first here is not the wiring, it is the translation between two ways of processing, plus a manager-and-managed dynamic that grows in the gap and leaves one of you resentful and the other ashamed. This track is for building an honest translation layer between two valid ways of being a person, and for moving the work off willpower and into systems. It applies whether one of you is diagnosed, both are, or you have only recently started to suspect.",
    feelings: [
      {
        label: "If you're the neurodivergent partner",
        body: "You have probably been told some version of you are too much or you are too cold since you were small, and you may have spent years performing a version of yourself that costs everything to maintain. So a partner saying you forgot again, or you never react, does not land as feedback. It lands on top of a lifetime of the same note. It is also exhausting to be the person whose brain is always the topic. Forgetting is not a measurement of how much you love someone. Needing quiet is not rejection. You are allowed to need what you need and still be a good partner.",
      },
      {
        label: "If you're the neurotypical or allistic partner",
        body: "Your load is real and it is often invisible. You may be holding the calendar, the bills, the appointments, and the emotional read of the room, and then hearing that reminding someone is nagging. Loneliness inside a relationship with a partner who goes quiet, or who lights up for everything except this, is a real grief and you are allowed to name it. The trap is the manager role: it feels like the only way to keep life running, and it slowly turns your partner into a project and you into a parent, which neither of you signed up for.",
      },
      {
        label: "If you're both neurodivergent",
        body: "Some of this is easier. Nobody has to explain why the lights are off or why plans changed. But the failure modes stack: two people with executive-function difficulty and nobody holding the container, two sets of sensory limits colliding in one small apartment, two rejection-sensitive people in one argument. Your work is less about translation and more about structure, and about not treating your shared brilliance at 11pm as a substitute for a system that runs on a Tuesday morning.",
      },
    ],
    principles: [
      "The difficulty belongs to the pair, not to one person. Researchers call this the double empathy problem: an autistic partner and an allistic partner are both, genuinely, bad at reading each other. Neither one is the broken translator.",
      "Executive function is not effort, and forgetting is not a message. Asking someone to try harder at remembering is like asking them to try harder at seeing without their glasses. Before you read a missed task as proof of how they feel, ask a plainer question: was this held in a system, or was it held in a head?",
      "Retire the manager role on purpose. Move to single-owner domains, where one person owns a whole area including the remembering, instead of one person doing and the other reminding.",
      "Processing time is a need, not avoidance. If one of you answers well after an hour or in writing, that is not stonewalling, and demanding an answer right now guarantees a worse one.",
      "Say the thing literally, then say what you want. Hints, sighs, and tone are a fair communication style and also a lossy one. Directness is not rudeness, and asking for directness is not asking someone to be cold.",
      "Sensory load is real and it is not negotiable by willpower. A restaurant with hard surfaces on a Friday night is not a romantic gesture, it is a plan for a bad evening.",
    ],
    sessions: [
      {
        title: "The story we've each been told",
        focus:
          "Before any logistics, the shame layer. Each partner speaks about the messages they have carried about themselves, from childhood, from school, from work, from past relationships. The listener's only job is to receive it. No defending, no correcting the record.",
        prompts: [
          "What have I been told about myself my whole life that I am afraid you secretly agree with?",
          "What do I do to seem normal in public, and what does it cost me by the time I get home?",
          "When you name something about how I'm wired, what does my body do before my brain catches up?",
          "What is one moment between us where I felt like a problem to be handled instead of a person?",
        ],
      },
      {
        title: "The user manual",
        focus:
          "Each of you makes your own manual, separately and on your own, then trades. Asynchronous is the point: this is the accommodation, not a workaround. Writing suits some people and is a barrier for others, so a voice memo, a list of bullet points, or a recording made while walking all count the same. Take in the other person's without commenting for at least a day.",
        prompts: [
          "How I show love, including the ways you might not recognize as love.",
          "How I show overwhelm, and what the earliest sign is before it gets loud.",
          "What I need after conflict, in what order, and roughly how long.",
          "What sensory input I genuinely cannot tolerate, and what environment makes me most myself.",
          "Which questions I answer badly out loud and much better with time and a keyboard or a recorder.",
        ],
      },
      {
        title: "Processing time and the pause",
        focus:
          "Designing how a hard conversation actually runs between your two nervous systems. The goal is a repeatable shape, not a rule about who is right.",
        prompts: [
          "When a hard topic starts, how much time does each of us need before we can say anything true?",
          "What would a good pause sound like, so that stepping away reads as I'm coming back and not as I'm done with you?",
          "Which conversations would go better in writing first, then out loud?",
          "What is our signal for I am flooded and cannot keep going, and what do we both agree happens next?",
        ],
      },
      {
        title: "The nagging trap",
        focus:
          "Naming the manager-and-managed dynamic out loud and starting to dismantle it. This session is about systems, not about apologies.",
        prompts: [
          "List the things that only live in one person's head right now. Just the list, no argument about it.",
          "Which of those could move into something external today: a shared list, an alarm, an automatic payment, a whiteboard by the door?",
          "Which domains could become single-owner, where one of us owns the whole thing including remembering it, and the other genuinely stops checking?",
          "What does the reminding partner get to stop doing this week, and what happens if the ball drops once?",
          "What is a fair way to raise a dropped ball that isn't a performance review?",
        ],
      },
      {
        title: "Literal and implied",
        focus:
          "Working out the translation between what gets said and what gets meant, in both directions. Nobody's style is put on trial here.",
        prompts: [
          "Give a recent example where I said something plainly and you heard it as harsh. What would the same content sound like with a wrapper on it?",
          "Give a recent example where you hinted and I missed it completely. What was the hint, and what would the direct version have been?",
          "What is one thing I need you to always say outright, even when you think it should be obvious?",
          "Can we agree on a phrase that means I am asking literally, not testing you?",
        ],
      },
      {
        title: "Sensory life and the shape of a week",
        focus:
          "Redesigning ordinary life around what actually works for both bodies, instead of the version you keep failing at. Practical, concrete, this week.",
        prompts: [
          "What does each of us need in the first thirty minutes after coming home, and are those two things compatible?",
          "What has our house been doing to us that we've never named: light, noise, clutter, the TV, the door that slams?",
          "What would a genuinely good evening together look like if we stopped copying other couples' date nights?",
          "Where does each of us need alone time in the week, and how do we take it without it reading as leaving?",
        ],
      },
      {
        title: "Strengths, said out loud",
        focus:
          "The session most couples skip. Neurodivergence brings real gifts to a relationship and they get buried under the logistics. Say them specifically.",
        prompts: [
          "What can you do that I could not do in a hundred years?",
          "What did I fall in love with that is inseparable from how you're wired?",
          "What is one thing about our relationship that only works because we are not the same?",
          "What do I want you to stop apologizing for?",
        ],
      },
    ],
    planSeeds: [
      "A shared external system for anything that currently lives in one person's head, reviewed together once a week",
      "Single-owner domains, written down, with an agreement that the non-owner stops checking",
      "A named pause signal and an agreed return time, used by both of you, not just one",
      "One written exchange a week for the topics that go badly out loud",
      "A sensory-honest ritual that fits both bodies: a quiet walk, a drive, cooking together with the music off",
    ],
    seekHelp: [
      "Any fear of your partner, any intimidation, any threat, or any physical or sexual violence. Being neurodivergent never explains this away, and a meltdown is not a defense for frightening someone. Stop using this track and go to the safety page. In the US, the National Domestic Violence Hotline is 800-799-7233 or text START to 88788, and in an emergency call 911.",
      "You suspect ADHD or autism in yourself or your partner and want a formal assessment. An evaluation can change the conversation more than any exercise here, and it is worth asking a doctor what the route is where you live. Be warned that in many places the wait runs to years and the private route costs more than most people have, so if that door is shut for now, nothing in this track depends on a diagnosis. Recognising yourself is enough to start, and a partner who dismisses that because there is no paperwork is the actual problem in the room.",
      "The manager-and-managed dynamic has hardened into contempt: eye-rolling, mocking, talking about your partner to others the way you would talk about a difficult child. Contempt is corrosive in a way no worksheet can reach, and it needs a professional.",
      "Rejection-sensitive reactions are escalating into rages, self-harm, or days-long shutdowns. That is a treatment question, not a communication question. If either of you is thinking about self-harm or suicide, call or text 988 now.",
      "Meltdowns or shutdowns are being used, by either of you, to end conversations or to control what the other person is allowed to bring up. Control is still control whatever its cause, and being told you are not allowed to raise a subject is a red flag rather than an accommodation.",
      "One of you is medicating the load with alcohol, weed, stimulants, or anything else, or a prescribed medication has stopped working or started causing problems.",
      "You want a couples therapist. Ask directly whether they have worked with neurodivergent couples. A therapist who treats your wiring as an attitude problem will make this worse, and it is completely reasonable to leave and find another one.",
    ],
  },
  {
    slug: "two-cultures",
    title: "Two cultures, one home",
    subtitle: "For intercultural and interracial couples building something neither family handed them",
    overview:
      "When you come from different cultures, races, countries, or class worlds, most of your conflicts are not really disagreements. They are two complete sets of inherited defaults meeting for the first time in one kitchen: what a family owes its parents, what money is for, whether anger gets said or swallowed, who visits whom at the holidays, what a child gets called. Neither set is the correct one, and the quiet danger is that one of you is expected to do all of the adapting, usually the partner whose culture is less dominant where you live. On top of that, some of the pressure on you is not coming from inside the relationship at all: stares, comments, a parent who will not use your partner's name, a stranger who says something in a parking lot. This track separates what is yours from what is being done to you, then treats the differences as design work you get to do on purpose.",
    feelings: [
      {
        label: "If you're the partner doing most of the adapting",
        body: "You are probably fluent in a world that is not fluent in you. You translate at every dinner, explain your own holidays, watch your food or your accent or your family get treated as the interesting variation on the normal one. Some days you cannot tell whether you are being welcomed or absorbed. It is a specific kind of tired, and it gets worse when the person you love says you're overthinking it. You are not overthinking it. You are keeping a running tally that they have never had to keep.",
      },
      {
        label: "If your culture is the local default",
        body: "You may genuinely not see most of it, because it was built to be invisible to you. The comment your relative made sounded clumsy to you and landed like a wound on your partner, and your instinct is to explain that they did not mean it. That instinct is the problem. You also may feel accused of things you did not do, or worn down by conversations where you cannot seem to say the right thing. Both can be true: you are not the enemy, and you are also the one with more room to change what your family is allowed to say in your house.",
      },
      {
        label: "If you're both far from where you started",
        body: "Sometimes neither of you has the home advantage, and you are building in a place that is not either of your places. That can be freeing, and it can also mean nobody has a nearby family, a familiar hospital, a language that works at the bank. You may be each other's only real context. That is a bond and it is also a lot of weight to put on two people, and it is worth naming out loud rather than treating as romantic.",
      },
    ],
    principles: [
      "Difference is not conflict. The problem is almost never that your two families do things differently. The problem is when one way silently becomes the default and the other becomes the exception that has to justify itself.",
      "Separate ours from theirs. Some of what is hurting you is between the two of you. Some of it is a parent, a coworker, a stranger, or a system. Sorting them stops you from taking the world's hostility out on each other.",
      "Direct and indirect are both real conflict styles. In many families, saying the hard thing outright is respect. In many others, it is an act of aggression and the caring version is oblique. Neither one is health and neither one is dysfunction.",
      "Set boundaries with family is not neutral advice. In plenty of cultures, obligation to parents is not codependence, it is the center of a moral life. Any agreement you make has to be one both of you can live with among your own people.",
      "You choose the practices, one at a time. Keep this, drop that, invent the third thing. A tradition you consciously chose together is stronger than one either of you inherited by default.",
      "Facing outside hostility is a team sport with assigned positions. Decide in advance who handles which family and who speaks first in public, so neither of you is left improvising alone at a dinner table.",
    ],
    sessions: [
      {
        title: "Where each of us comes from",
        focus:
          "The mapping exercise. Each partner writes, alone, how their family of origin actually operated, then reads it out. This is description, not evaluation. No comparing, no ranking, no defending your parents.",
        prompts: [
          "In my family, how was money handled, and what was owed to relatives?",
          "In my family, how did people fight, and how did you know a fight was over?",
          "In my family, what was owed to elders, and what happened to someone who refused?",
          "In my family, what was private, what was everyone's business, and how were big things celebrated?",
          "What did my family assume about the person I would end up with?",
        ],
      },
      {
        title: "The defaults we never chose",
        focus:
          "Finding the places where one culture quietly became the house standard. This is the session where the adapting partner gets the floor and the other partner mostly listens.",
        prompts: [
          "What do we do our way now, and whose way is that?",
          "Where have I been adapting without ever being asked, and what has it cost me?",
          "What have I stopped bringing up because it was easier to let it go?",
          "What is one thing I miss from how I was raised that has no place in our life right now?",
        ],
      },
      {
        title: "How we fight, and why it keeps missing",
        focus:
          "Working out the mismatch in conflict style itself, before trying to resolve anything you are actually fighting about.",
        prompts: [
          "When I go quiet in a fight, what am I doing? When you go quiet, what are you doing?",
          "Is raising my voice in my family a sign of danger or a sign of engagement?",
          "What does an apology look like where I come from, and does it look like anything to you?",
          "What have I read as coldness or as aggression that might just be a different grammar?",
        ],
      },
      {
        title: "The families",
        focus:
          "The concrete negotiation about parents, siblings, holidays, money, and access. Aim for one agreement you can both defend to your own people, not for who is right.",
        prompts: [
          "What does each of our families expect from us that the other family would find strange?",
          "Where is a real obligation for me that you experience as an intrusion?",
          "What do we actually want holidays to look like over the next three years, including the years we say no?",
          "If money is expected to flow to relatives, what amount and what rhythm can we both live with?",
          "Who talks to my family about this, and who talks to yours? Agree on the messenger.",
        ],
      },
      {
        title: "When it comes from outside",
        focus:
          "The hostility, the comments, the disapproval. The point is to move it from a private wound into a shared plan. Nobody has to prove that something was bad enough to count.",
        prompts: [
          "What has been said or done to us that I have never told you about?",
          "When it happens in public, what do I need you to do in the first ten seconds?",
          "What have I said in the moment, meaning to defuse it, that actually left you standing alone?",
          "Which relationships are we still deciding about, and what would have to change for that to be settled?",
          "What is our line, the thing that means someone does not come to our house anymore?",
        ],
      },
      {
        title: "Designing the third culture",
        focus:
          "The build session. You are not merging two households, you are making a new one, on purpose, with pieces you chose. Write it down.",
        prompts: [
          "What do we keep from each side, named specifically, not vaguely?",
          "What do we drop, and can we each say plainly what dropping it costs?",
          "What do we invent that neither family has, that will be ours?",
          "What languages, foods, names, and holidays do we want in this home in ten years?",
          "If children are part of this, now or one day, what would we want them fluent in, and what would it take to make that real? If children are not part of this, what do we want to pass on anyway, and to whom?",
        ],
      },
    ],
    planSeeds: [
      "A written keep, drop, invent list for practices and holidays, revisited once a year",
      "A rotating or explicitly agreed holiday plan, decided months ahead rather than argued in December",
      "A public-incident protocol: who speaks first, what gets said, and a check-in afterward when you're alone",
      "One regular practice from the less-local culture that is standard in your home, not an occasion",
      "An agreed messenger rule: each of us handles our own family, and neither of us gets sent in alone",
    ],
    seekHelp: [
      "A family member's hostility has escalated to threats, stalking, showing up uninvited, or attempts to break up your relationship through money, immigration status, or your children.",
      "One partner is repeatedly required to hide, minimize, or cut off their culture, language, faith, or family as a condition of the relationship. That is control, not compromise. Go to the safety page. In the US, the National Domestic Violence Hotline is 800-799-7233 or text START to 88788, and advocates there work with callers in many languages.",
      "Immigration or visa status is being used as leverage in your arguments, by a partner or by a relative. Threatening someone's status is a recognized form of coercive control, and there is legal help for it. An immigration attorney or a legal aid office can tell you what protections exist where you live, and a hotline advocate can help you find one.",
      "The outside stress has moved inward: panic, sleeplessness, hypervigilance in public, or one of you dreading every family event for weeks in advance. If either of you is having thoughts of self-harm or suicide, call or text 988 now.",
      "You keep having the same fight about a child's name, language, schooling, or upbringing and it never moves. A therapist who works with intercultural couples, ideally one who does not assume the local culture is the healthy one, is worth finding.",
      "Either of you is being asked to accept mistreatment as culture. Respect for a tradition never requires a partner to absorb contempt.",
    ],
  },
  {
    slug: "jealousy",
    title: "Jealousy without shame",
    subtitle: "Working with insecurity instead of hiding it or obeying it",
    overview:
      "Jealousy has a bad reputation, which is exactly why it does so much damage: people hide it until it comes out sideways as checking, testing, snapping, or a rule that appears out of nowhere. It is not a character defect or proof that your relationship is failing, it is a signal, usually pointing at something specific like a need that has gone unmet, an old wound, an agreement that never got said out loud, or a genuine breach. This track treats jealousy as a workable problem with parts you can name and address, for monogamous couples and for consensually non-monogamous ones alike. If you are open, polyamorous, or otherwise negotiating something other than exclusivity, none of this assumes your structure is the problem. When it hurts, the thing to check first is an agreement that stopped fitting and never got revised, not the shape of the relationship itself.",
    feelings: [
      {
        label: "If you're the one feeling jealous",
        body: "You probably hate this. There is the feeling itself, and then a second layer of shame about having it, which is what pushes it underground and makes it come out as an interrogation at midnight. You may be doing things you do not respect: reading a phone, counting minutes, running a scenario for the fortieth time. It helps to know the feeling is not evidence. It is a smoke alarm, and smoke alarms go off for a fire and for toast. Your job is not to prove it right or to feel nothing. Your job is to say it out loud early, while it is still small enough to be a sentence.",
      },
      {
        label: "If you're the one being asked to reassure",
        body: "Being repeatedly asked to prove something you have not done is exhausting, and it can start to feel like being on trial in your own home. You may also be quietly editing yourself, not mentioning a friend, not telling a story, which is the beginning of a real distance. Two things are true at once: you are not responsible for making another person's insecurity disappear, and reassurance offered freely is very different from reassurance extracted. The first one settles a nervous system. The second one never lands, no matter how much you give.",
      },
      {
        label: "If you're consensually non-monogamous",
        body: "You may have been told, by your own community as much as anyone, that jealousy means you are doing it wrong. That is not true and believing it makes people lie about what they feel. Jealousy inside an open structure is ordinary information: it often points at time scarcity, at an agreement that quietly changed, at hierarchy that was never made explicit, or at being told something after the fact that you needed to hear before. The work is the same as anyone else's, with one addition: you have written agreements to consult, and consulting them beats improvising in the dark.",
      },
    ],
    principles: [
      "Jealousy is information, not a verdict. It tells you something matters. It does not tell you what happened, and it is a terrible source for facts.",
      "Say it early and small. A jealous feeling named in a sentence on Tuesday is a conversation. The same feeling held until Saturday is an accusation.",
      "Reassurance works when it is offered, not extracted. Proactive transparency from the non-jealous partner calms things down. Surveillance won through pressure never does, no matter how much of it there is.",
      "Separate the feeling from the request. I felt awful when you left with them is a feeling. You can never see them again is a rule. Both are allowed to be said, but they are different objects and rules need actual negotiation.",
      "Some jealousy is accurate. If the reassurance keeps not fitting the facts, do not talk yourself out of noticing. Track record beats vibes in both directions.",
      "Structure is not the problem, and neither is monogamy. Being exclusive does not prevent this and being open does not cause it. What causes most of it is an agreement nobody revised, or a rule made in a panic that keeps expanding until the relationship is very small. Aim for agreements you would still choose on a calm day.",
    ],
    sessions: [
      {
        title: "Saying it without the case file",
        focus:
          "The jealous partner speaks first, describing the experience rather than prosecuting it. No evidence, no timeline, no phone. The other partner listens and reflects back, and does not defend yet.",
        prompts: [
          "What does this actually feel like in my body, and where does it start?",
          "What is the story that runs in my head when it takes over, told plainly, including the embarrassing parts?",
          "What have I been doing that I don't respect: checking, testing, counting, asking a question I already knew the answer to?",
          "What am I most afraid of losing? Not what I'm afraid you'll do. What I'm afraid I'll lose.",
        ],
      },
      {
        title: "Where this came from",
        focus:
          "Both partners, in turn. Tracing the history underneath the current feeling. This is not an excuse-hunt, it is a map so you can tell an old alarm from a new one.",
        prompts: [
          "When in my life did I first learn that people leave, or that I was replaceable?",
          "Has this happened to me before, in this relationship or another one, and what did it teach me?",
          "What does the current feeling resemble more: something happening now, or something that already happened to me?",
          "What is a moment in this relationship that genuinely damaged my confidence, that we may never have discussed?",
        ],
      },
      {
        title: "The other side of it",
        focus:
          "The partner being asked to reassure holds the floor. The jealous partner's job is to hear it without collapsing into apology or defending themselves.",
        prompts: [
          "What has it been like on my end to be asked to prove this?",
          "What have I stopped telling you, or stopped doing, to avoid setting it off?",
          "Where have I been careless or vague in a way that genuinely made this harder for you?",
          "What kind of reassurance can I give freely and forever, and what kind is quietly draining me?",
        ],
      },
      {
        title: "The agreements, read out loud",
        focus:
          "Getting the actual expectations on paper. Most couples, monogamous or not, discover here that they never explicitly agreed to something they have both been enforcing. If you already have written agreements, read them aloud verbatim before discussing them.",
        prompts: [
          "What do we each believe we have agreed to, said in full sentences, right now?",
          "Where do our two answers not match, and how long has that gap been there?",
          "What has changed since we made these agreements: a new person, a new job, less time, a different life?",
          "What needs to change, what stays, and what date are we writing on this?",
          "What do we each need told to us beforehand rather than afterward, and what is genuinely fine to hear later?",
        ],
      },
      {
        title: "Reassurance that actually works",
        focus:
          "Designing the practical layer. Specific, small, repeatable, and offered rather than demanded. Test it for a couple of weeks before deciding whether it works.",
        prompts: [
          "What proactive thing could you tell me, unprompted, that would settle me before I have to ask?",
          "What is one small ritual that reliably makes me feel chosen, and can we make it boringly regular?",
          "What is the difference between a check-in I'd be glad to give and surveillance neither of us wants?",
          "When the alarm goes off in me, what do I do first before I come to you?",
          "How do we handle it when reassurance is asked for at 1am and neither of us is at our best?",
        ],
      },
      {
        title: "Turning toward, not away",
        focus:
          "Moving from managing the fear to rebuilding the thing the fear is about. This session is not about the third person at all.",
        prompts: [
          "When did each of us last feel like the other's first choice, and what was happening?",
          "What has quietly gone missing between us while we've been managing this?",
          "What would I like more of that has nothing to do with anyone else?",
          "What is one thing we could build together in the next month that is only ours?",
        ],
      },
      {
        title: "If a line was actually crossed",
        focus:
          "Only for couples where an agreement was genuinely breached, in any structure. A breach inside a negotiated open relationship is a real betrayal, sometimes a sharper one because you built a system specifically to prevent it. Handle it as a breach of trust, not as an argument about the structure.",
        prompts: [
          "What exactly was agreed, and what exactly happened? Facts first, no interpretation yet.",
          "What was broken here: the act itself, the hiding of it, or both, and which one hurts more?",
          "What does the partner who broke it understand about the damage, said in their own words?",
          "What has to be true, concretely, for trust to start rebuilding, and how long is that going to take?",
          "Is our structure still one we both actively choose, or is one of us going along with it?",
        ],
      },
    ],
    planSeeds: [
      "A short weekly check-in where either partner can name a jealous feeling before it grows, with no case-building allowed",
      "Written, dated agreements that both of you can read, reviewed on a fixed schedule rather than only after a fight",
      "One proactive transparency habit offered freely: a heads-up before, a message after, a plan shared without being asked",
      "A named self-soothing step the jealous partner takes first, before bringing it to the other person",
      "One regular ritual that is only about the two of you, protected from logistics and from anyone else's schedule",
    ],
    seekHelp: [
      "Jealousy has turned into monitoring: tracking location, reading messages, demanding passwords, controlling who your partner sees, what they wear, or where they go. That is coercive control, not insecurity, and the safety page applies regardless of who is doing it. In the US, the National Domestic Violence Hotline is 800-799-7233 or text START to 88788.",
      "Either of you has been threatened, grabbed, cornered, or frightened during one of these conversations. Stop using this track and go to the safety page. In an emergency in the US, call 911.",
      "The intrusive thoughts and checking have become constant and feel impossible to stop even when you believe your partner. That pattern responds well to individual therapy and it is not something a couples exercise can reach. If it has reached thoughts of self-harm, call or text 988 now.",
      "Consent to the relationship structure was pressured, traded for, or given under threat of leaving. Coerced agreement to an open relationship is coercion, not consent, and no amount of negotiation fixes that.",
      "An agreement was broken and hidden, and honesty is not returning. Rebuilding after a breach usually needs a therapist, and there is a separate track for the aftermath of betrayal.",
      "The jealousy is being fueled by alcohol, drugs, or an untreated mental health condition in either of you. Treat that first, because no conversation holds while it is running.",
    ],
  },
];

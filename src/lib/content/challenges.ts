/**
 * 7-day challenges and micro-moves.
 *
 * A challenge is one small action per day, doable in ten minutes or less
 * unless the day says otherwise. A micro-move is even smaller: one sentence,
 * one moment. Nothing here requires a good mood, a long talk, or a partner
 * who is fully on board yet.
 */
import { extraChallenges } from "./challenges-rel";

export type ChallengeDay = { title: string; task: string; why: string };

export type Challenge = {
  id: string;
  title: string;
  tagline: string;
  forWhom: string;
  days: ChallengeDay[];
};

export const challenges: Challenge[] = [
  {
    id: "turning-toward",
    title: "7 Days of Turning Toward",
    tagline: "Learn to see the small reaches, then start answering them.",
    forWhom:
      "For couples who feel like roommates: polite, efficient, and a little bit lonely in the same house.",
    days: [
      {
        title: "Just watch",
        task: "Say nothing new today. Just count. Every time your partner reaches for you in a small way (shows you something, sighs out loud, asks a nothing question), make a mental note. Try to spot three.",
        why: "Small reaches like these are how couples stay stitched together, and roommate-mode starts when they go unseen. You can't turn toward what you don't notice. Today is only about getting your eyes back.",
      },
      {
        title: "Answer one bid all the way",
        task: "Pick one small reach today and answer it completely: phone face down, body turned, ten full seconds of real attention.",
        why: "Connection is built out of moments this small, not grand gestures. Ten seconds of full presence tells your partner the reach was worth making. That is what makes them reach again.",
      },
      {
        title: "Make one bid of your own",
        task: "Reach once, small and low-stakes: show them something funny, ask what they thought of the game, hand them a coffee. No big talk required.",
        why: "In roommate-mode, both people usually stopped risking the small stuff around the same time. Someone has to go first, and a tiny bid is easy to make and easy to answer. Keep the stakes low so it can't really fail.",
      },
      {
        title: "Greet before logistics",
        task: "The first time you see each other today after being apart, greet the person before the schedule: eye contact, a real hello, maybe a hug that lasts one beat longer than usual. The plumber and the pickup times can wait two minutes.",
        why: "Reunions set the tone for the whole evening. When the first exchange of the night is about logistics, you become co-managers instead of partners. Two minutes of actual greeting is a cheap way to feel chosen again.",
      },
      {
        title: "Decline warmly",
        task: "The next time your partner reaches for you at a bad moment, decline with a return time: “I want to hear this. Give me ten minutes to finish.” Then actually come back.",
        why: "Nobody can answer every bid, and pretending to listen is worse than not listening. A warm no with a kept promise teaches your partner that reaching for you is safe even when you're busy. The coming back is the whole trick.",
      },
      {
        title: "One real question",
        task: "Ask one question about their inner world, not the household: “What was the best part of your day?” Then ask one follow-up question about whatever they answer.",
        why: "Roommates trade information; partners trade attention. The follow-up question is the part that proves you were listening rather than waiting your turn. One honest exchange like this does more than an hour of side-by-side TV.",
      },
      {
        title: "Tell them what you saw",
        task: "Tell your partner one small moment from this week that you noticed and liked: “I saw how you handled that call with your mom. That was patient.” One sentence is enough.",
        why: "Being noticed is half of feeling loved. Naming a specific moment tells your partner you were paying attention all week, which is exactly what roommate-mode had stopped. It also makes next week's noticing easier for both of you.",
      },
    ],
  },
  {
    id: "appreciation",
    title: "The Appreciation Week",
    tagline: "Retrain your attention from what's wrong to what's still right.",
    forWhom:
      "For couples stuck in criticism, where the flaws have gotten louder than everything else.",
    days: [
      {
        title: "Catch one good thing",
        task: "Just once today, catch your partner doing something right (or even something neutral you'd normally pick at) and note it privately. You don't have to say anything yet.",
        why: "Criticism is mostly a habit of attention: you find what you scan for. Before you can say something kind and mean it, you have to see something real to be kind about. Today is only about where your eyes go.",
      },
      {
        title: "Say one specific thing",
        task: "Tell your partner one specific thing they did today or yesterday, and what it did for you: “You handled bedtime so I could finish that call. It helped.”",
        why: "Generic praise bounces off a person who feels criticized; specific praise lands because it can't be faked. Specific means you actually saw them. That's what a criticized person is starving for.",
      },
      {
        title: "Thank the invisible work",
        task: "Thank them for one piece of work nobody usually sees: remembering the appointment, noticing you were running low, tracking the thing you forgot existed.",
        why: "The invisible workload is where resentment quietly grows on both sides. Naming a piece of it does double duty: it delivers appreciation, and it proves you know the hidden work exists. That second part often matters more.",
      },
      {
        title: "Admire a trait, not a task",
        task: "Name one thing about who they are, not what they did: “You're the steady one when things go sideways” or “You make people feel welcome.” Say it or text it.",
        why: "Thanks for a task can feel like tipping the staff. Admiring a trait says there is still a person here I chose. For someone who has felt like a walking list of flaws, hearing a strength named out loud is a different category of thing.",
      },
      {
        title: "Tell an old story",
        task: "Remember one specific early moment when you admired them, and tell it: “I still think about the night you drove two hours because I sounded off on the phone.”",
        why: "Couples who make it tend to keep their good history alive and within reach. Retelling an old moment reminds both of you that admiration used to be easy, which quietly argues it could be again. Nostalgia, used honestly, is fuel.",
      },
      {
        title: "Trade one criticism for one request",
        task: "Today, catch one criticism forming in your mouth and swap it for a request. Not “you never help in the mornings” but “could you take the lunches tomorrow?”",
        why: "Criticism attacks a person; a request aims at a problem, and requests get answered far more often. This is not about swallowing your needs. It's about saying them in the one shape your partner can actually respond to.",
      },
      {
        title: "Ask what lands",
        task: "Ask your partner one question: “What's something I say or do that actually makes you feel appreciated? I want to do more of it.”",
        why: "People receive appreciation in different currencies, and it's common to spend years paying in the wrong one. Asking directly turns a week of practice into a habit you can keep. It also tells your partner this week wasn't an act.",
      },
    ],
  },
  {
    id: "soft-repair",
    title: "The Repair Week",
    tagline: "One week to take the heat out of how you fight.",
    forWhom:
      "For couples who fight often and are tired of what every round costs.",
    days: [
      {
        title: "Map the first minute",
        task: "Alone, write down how your last real fight started: just the first minute, who said what, the way a camera would have caught it. Don't fix anything. Don't show anyone.",
        why: "How a fight starts is usually how it ends, and most couples open with the same move every time. You can't change a pattern you haven't looked at in daylight. Writing it down flat, with no verdict attached, is the looking.",
      },
      {
        title: "Pick your break signal",
        task: "In a calm moment, agree on a signal either of you can use mid-fight that means “I need twenty minutes, and I'm coming back.” A word, a phrase, a hand sign. Five minutes, done.",
        why: "Past a certain point of anger, nobody is listening anymore, and everything said from there is pure damage. A pre-agreed signal lets either of you stop the bleeding without it reading as walking out. Agreeing on it in peacetime is what makes it usable in wartime.",
      },
      {
        title: "One soft startup, small stakes",
        task: "Pick one genuinely small annoyance and raise it gently: “I feel [feeling] about [situation]. Could we [one specific request]?” Small means small. The dishes, not the relationship.",
        why: "A soft startup aims at the problem instead of the person, and it changes how the whole conversation goes. Practicing on something tiny means the skill exists before you need it on something big. Nobody learns to swim in a storm.",
      },
      {
        title: "Rehearse the break",
        task: "Use yesterday's signal once today. If a real fight sparks, use it for real: separate, actually calm down, come back when you said you would. If the day stays peaceful, do a thirty-second dry run out loud, and take it seriously.",
        why: "A tool you've never used will not appear in your hands mid-fight. The dry run feels silly for about ten seconds, and then you own the tool. The return matters most: coming back when you said you would is what makes a break feel safe instead of like abandonment.",
      },
      {
        title: "Catch one repair",
        task: "Watch today for your partner's attempt to lower the temperature (a joke, a touch, “can we start over?”) and take it, out loud: “Yes. Let's start over.” If nothing tense happens, ask them instead: “What do I do mid-argument that's me trying to make peace? I'll tell you mine.”",
        why: "Couples who last don't fight less; they catch the rope when the other one throws it. Repairs get missed because they arrive disguised, often as bad jokes at bad moments. Accepting one isn't conceding the argument. It's refusing to let the argument eat the relationship.",
      },
      {
        title: "Own your two percent",
        task: "From a recent fight, find one thing you actually did (however small) and own it in one sentence with no “but”: “I got sarcastic last night. That wasn't fair.” Then stop talking.",
        why: "Defensiveness keeps fights alive because neither person will go first. Owning even a small true piece punctures it, and stopping after one sentence keeps it from turning into round two. Going first is not losing. It's leading.",
      },
      {
        title: "The small repair conversation",
        task: "Set aside twenty minutes (yes, more than ten today) and pick your smallest unfinished fight. Each of you describes your side; the other paraphrases it back until it's right. No verdicts, no winner. Then close it and leave it closed.",
        why: "Unfinished fights don't dissolve; they wait. Doing a calm autopsy on a small one teaches you both the moves for the bigger ones. The goal is not agreeing on what happened. It's both realities getting heard inside one relationship.",
      },
    ],
  },
  {
    id: "last-line",
    title: "The Hail Mary Week",
    tagline: "Seven tiny days for when you're nearly done. A start, not a fix.",
    forWhom:
      "For couples on the edge of giving up, with nothing left for grand gestures and no interest in faking anything.",
    days: [
      {
        title: "Hold one shot",
        task: "Once today, feel the critical comment coming, and just don't say it. Nothing extra required. Don't announce it, don't replace it with anything. Subtract one shot.",
        why: "Goodwill can't regrow under fire, and at this stage subtraction is more believable than addition. Nobody has to trust a compliment, and nobody can argue with silence where a jab used to be. It also costs you nothing you don't have.",
      },
      {
        title: "One civil sentence",
        task: "Say one plain, ordinary sentence you'd say to a decent stranger: “Coffee's still hot.” “Drive safe.” Not warm, not loaded. Just civil.",
        why: "Neutral is a real step up from hostile, and it doesn't ask you to perform feelings you don't have. Civility is honest at a stage where warmth would be fake. A relationship can be rebuilt from neutral; it can't be rebuilt from contempt.",
      },
      {
        title: "One quiet useful thing",
        task: "Do one small thing that makes their day slightly easier (gas in the car, their mug set out, the errand handled), and don't mention it.",
        why: "When words have gone bankrupt between two people, small actions still clear. Not announcing it keeps it from becoming a move in the game, and it keeps your side of the street clean whether or not it's ever noticed. This one is for you as much as for them.",
      },
      {
        title: "Find one non-irritation",
        task: "Privately notice one thing about your partner today that does not irritate you. That's the whole bar. You don't have to share it.",
        why: "On the edge, everything about the other person can read as evidence for the prosecution. Finding one neutral-or-better thing interrupts that, just slightly. This isn't pretending things are fine. It's checking whether your attention has been running on autopilot.",
      },
      {
        title: "Match neutral with neutral",
        task: "If your partner offers anything neutral or better today (a civil sentence, a small kindness, a flat “thanks”), meet it at the same level. Don't correct it, don't score it, don't raise the stakes.",
        why: "Threads rebuild one answered signal at a time, and at this stage both of you are watching to see whether anything you offer gets shot down. Matching neutral with neutral is the smallest possible way to say the door isn't nailed shut. No speech required.",
      },
      {
        title: "One plain thank you",
        task: "Say thank you once, for something concrete and true, with no speech attached: “Thanks for handling the school thing.” Then let it sit.",
        why: "A bare thank-you is hard to dismiss and easy to deliver, even through resentment. Concrete keeps it honest; brief keeps it from sounding like a performance. If it lands flat, you still said something true, and that's the standard this week.",
      },
      {
        title: "Name the thread",
        task: "Say one honest sentence (or write it, if saying it is too much): “I don't know where we end up. But I don't want us talking to each other the way we have been.” Then let it be. No demand for a reply.",
        why: "This sentence promises nothing it can't keep, which is why it can be said even now. It doesn't ask your partner to forgive anything or decide anything; it only puts on record that one of you would rather stop swinging. A week like this doesn't fix a relationship, but it can be the thread that makes the real work (a counselor, the harder conversations) feel possible.",
      },
    ],
  },
];

export type MicroMove = { tip: string; when: string };

export const microMoves: MicroMove[] = [
  {
    tip: "Greet the person before the logistics: eye contact, a real hello, then the schedule.",
    when: "when you reunite after work",
  },
  {
    tip: "Make the goodbye kiss last six full seconds. Count if you have to.",
    when: "when one of you leaves in the morning",
  },
  {
    tip: "Say “same team” out loud, even through gritted teeth.",
    when: "mid-argument",
  },
  {
    tip: "Drop your voice instead of raising it. Slow beats loud.",
    when: "when the argument starts climbing",
  },
  {
    tip: "Name one small thing from today you were glad they did.",
    when: "before sleep",
  },
  {
    tip: "Call a truce out loud (“we're not done, but we're okay”) so you can both actually sleep.",
    when: "when a fight can't be finished tonight",
  },
  {
    tip: "Ask “do you want help or do you want to vent?” before you fix anything.",
    when: "when they're venting about their day",
  },
  {
    tip: "Put a hand on their shoulder for a few seconds and say nothing.",
    when: "when they're visibly stressed",
  },
  {
    tip: "Send one sentence with no logistics in it: “saw this and thought of you.”",
    when: "midday, when you're apart",
  },
  {
    tip: "Find the piece of their complaint that's true and own that piece first.",
    when: "when you feel yourself getting defensive",
  },
  {
    tip: "Ask for twenty minutes instead of going silent, and name when you'll be back.",
    when: "when you feel yourself shutting down",
  },
  {
    tip: "Give the thing they're showing you ten real seconds of your eyes.",
    when: "when they hold up their phone to show you something",
  },
  {
    tip: "Start with “I feel” about the situation, and ask for one specific thing.",
    when: "before raising something hard",
  },
  {
    tip: "Swap the criticism for a request: not “you never”, but “could you”.",
    when: "when a criticism is loading",
  },
  {
    tip: "Thank them, by name, for the chore that stopped getting noticed years ago.",
    when: "when you see them doing it",
  },
  {
    tip: "Read one thing out loud to them, just to share the room again.",
    when: "when you're both on your phones on the couch",
  },
  {
    tip: "Ask one question about their inner world, then one follow-up about the answer.",
    when: "at dinner",
  },
  {
    tip: "Let it go without comment, once, on purpose.",
    when: "when the small annoyance happens again",
  },
  {
    tip: "Say “that came out wrong, let me try again” instead of defending the first version.",
    when: "the moment you hear yourself sound harsh",
  },
  {
    tip: "Offer one kind sentence, even though the issue isn't resolved.",
    when: "an hour after a fight has cooled",
  },
  {
    tip: "Sit through one whole song together before going inside.",
    when: "when you pull into the driveway together",
  },
  {
    tip: "Look up and let your face show you're glad, before you say anything.",
    when: "when they walk into the room",
  },
  {
    tip: "Start their coffee or tea without being asked.",
    when: "when you wake up first",
  },
  {
    tip: "Say “we'll figure it out”, even when you don't know how yet.",
    when: "at the end of a hard day",
  },
];

// Challenges for long distance, reconciling, low energy, and clean fighting.
// Idempotent so a hot-reload / double module eval cannot duplicate them.
for (const c of extraChallenges) {
  if (!challenges.some((x) => x.id === c.id)) challenges.push(c);
}

export function getChallenge(id: string): Challenge | undefined {
  return challenges.find((c) => c.id === id);
}

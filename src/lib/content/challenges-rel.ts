/**
 * Additional 7-day challenges for relationship situations the core set
 * does not cover: distance, reconciling after a rupture, low energy, and
 * learning to fight cleanly.
 *
 * Same rules as challenges.ts. One small action per day, doable in ten
 * minutes or less unless the day says otherwise. Nothing here requires a
 * good mood, a long talk, or a partner who is fully on board yet. Every
 * day is written so one willing person can start it alone.
 *
 * These are educational prompts, not therapy and not a substitute for it.
 * If there is fear, control, or violence in the relationship, none of this
 * applies: use the safety resources in the app instead.
 */

import type { Challenge } from "./challenges";

export const extraChallenges: Challenge[] = [
  {
    id: "seven-calls",
    title: "Seven Calls",
    tagline: "Seven days of small acts that make the distance smaller.",
    forWhom:
      "For couples living apart: different cities, deployments, travel seasons, or a stretch of months you did not choose. Works even if one of you is busier, worse at texting, or on the wrong side of the clock. None of these days ask you to account for where you were or who you were with. If distance is being used to check up on you, this is the wrong tool and the safety resources in this app are the right place to start.",
    days: [
      {
        title: "Name the window",
        task: "Send one message that names the time of day you are most reliably free this week, and ask for theirs. If your hours barely overlap, name the closest overlap you have, even if it is fifteen minutes.",
        why: "Distance wears couples down through unpredictability more than through miles, and a known window means neither of you spends the day waiting.",
      },
      {
        title: "Send the boring thing",
        task: "Send one photo of something completely ordinary from your day: your desk, your lunch, the walk to the car, the weather out the window. No caption needed, no reply needed.",
        why: "Couples who live together get the boring details for free, and those details are most of what makes someone feel like part of your life.",
      },
      {
        title: "Ten minutes, no logistics",
        task: "Take ten minutes on whatever channel you have, call, video, sign, or a back-and-forth of voice notes, with one rule: nothing about money, schedules, flights, or the plan. If it goes quiet, let it be quiet.",
        why: "When all your talk time is spent on coordination, you slowly become project managers who miss each other.",
      },
      {
        title: "Ask about what you cannot see",
        task: "Ask one question about a part of their life you have no window into: what the coffee is like there, what their apartment sounds like at night, what the best part of their week looked like. Ask one follow-up. This is curiosity, not an account of their movements, so if it starts to feel like being checked on, say so and drop it.",
        why: "People apart drift because their days stop being imaginable to each other, and a follow-up question is how you get the picture back.",
      },
      {
        title: "Do one thing at the same time",
        task: "Do one ordinary thing together at the same time: eat dinner on video, start the same episode, take a walk on the phone, watch the same game and text through it. Twenty minutes is plenty.",
        why: "Shared time beats reported time, because you end the day with a memory you both actually have.",
      },
      {
        title: "Send something physical",
        task: "Send one thing they get to keep. Posted, if postage is easy where you are: a card, a snack they like, a photo, a cheap paperback. If postage is not in the budget, or the border makes it a nightmare, make something instead: a playlist, a photo of a note in your handwriting, a voice memo they can save, a drawing that is objectively bad. Cost is not the variable here.",
        why: "Something they can keep outlasts a message they will scroll past, and it proves you thought about them on a day they could not see you.",
      },
      {
        title: "Put the next one on the calendar",
        task: "Name the next time you will actually be in the same room and put it in both calendars. If you genuinely cannot know yet, put the next long protected call in instead, with a date and a time.",
        why: "A date on the calendar turns waiting into counting, which is a much easier thing for two people to do.",
      },
    ],
  },
  {
    id: "new-pattern",
    title: "The New Pattern",
    tagline: "Seven days of doing the one thing differently.",
    forWhom:
      "For couples trying again after a rupture: a breakup, a separation, a betrayal, or a long bad season you have both agreed to come back from. If what broke it involved fear, control, or being hurt, this challenge is not the right tool, and the app's safety resources are the place to start instead.",
    days: [
      {
        title: "Name the one thing",
        task: "Alone, write one sentence naming the single repeating move of yours that did the most damage. Yours, not theirs. Be specific: not \"I was distant\" but \"I went silent for days when I was hurt.\"",
        why: "Reconciling fails when both people promise to be better in general, because general promises cannot be kept or checked.",
      },
      {
        title: "Name the replacement",
        task: "Write the exact thing you will do instead, in the moment, in plain words. If the old move was going silent, the new move might be \"I say I need a day and then I come back on Tuesday.\"",
        why: "You cannot stop a habit with a blank space; you can only stop it by having something specific to do instead.",
      },
      {
        title: "Say it out loud once",
        task: "Tell your partner the one thing and the replacement, in about three sentences. Do not promise to fix everything, do not ask them to name theirs, and do not wait for a reaction.",
        why: "Saying it out loud turns a private intention into something real, and asking nothing back keeps it from becoming a negotiation.",
      },
      {
        title: "Run it once, small",
        task: "Today, find one low-stakes moment where the old move would normally fire and use the new one instead. Small on purpose: a mild annoyance, a small disappointment, a minor scheduling miss.",
        why: "A new pattern has to exist on an ordinary Tuesday before it can survive a hard night.",
      },
      {
        title: "Catch the near miss",
        task: "Notice one moment today when you almost did the old thing, and write down what set it off: the time, what was said, what you felt in your body first.",
        why: "The trigger is where change is actually possible, and you can only work with a trigger you have seen clearly.",
      },
      {
        title: "Ask what they would notice",
        task: "Ask your partner one question: \"If this change were real, what would you notice? What would look different to you?\" Then listen and write it down without arguing with it.",
        why: "Your partner is tracking different evidence than you are, and asking what counts to them saves months of effort spent in the wrong place.",
      },
      {
        title: "Set the check-in",
        task: "Agree on a short weekly check-in, fifteen minutes, same day each week, with two questions: what went differently, and what slipped. Put the first one on the calendar now.",
        why: "Rebuilt trust comes from a pattern held over time, and a standing check-in is what keeps week one from being the only week.",
      },
    ],
  },
  {
    id: "low-spoons",
    title: "Low Spoons",
    tagline: "Seven days of connection that cost almost nothing.",
    forWhom:
      "For couples running on empty: illness, disability, chronic pain, caregiving, a newborn, depression, or opposite shifts that mean you barely overlap. Every task here takes under five minutes and none of them require you to seem cheerful, and none of them are a test either of you can fail. If there is fear or control in the relationship, the safety resources in this app are the place to start instead.",
    days: [
      {
        title: "Lower the bar out loud",
        task: "Say or text one honest sentence about your capacity right now: \"I have about ten percent left today, and none of it is about you.\" No apology, no plan attached.",
        why: "Most of the hurt in a low energy season comes from silence being read as distance, and naming the tank level costs one sentence.",
      },
      {
        title: "One message that asks nothing",
        task: "Send one short message that requires no reply and no decision: \"Thinking about you. No response needed.\" That is the whole task.",
        why: "When both people are depleted, every message that needs an answer is one more task, and one that needs nothing back is a gift instead.",
      },
      {
        title: "Sixty seconds of contact",
        task: "Spend one full minute in contact with no conversation: a hand on their back, sitting shoulder to shoulder, feet touching under the blanket. If touch is hard right now, sit in the same room for a minute doing nothing. If you are not in the same place tonight, sit on an open line for a minute without talking, or play the same song at the same time.",
        why: "Bodies settle near each other, and a minute of company with nothing asked of it does some of the same work at a distance, which is exactly what a wrung out day has none of.",
      },
      {
        title: "Take one small thing off their plate",
        task: "Do one tiny thing they would otherwise have to do: refill the water bottle, answer the one text, put the trash out, set out the pills. From a distance it still works: make the phone call they have been dreading, find the opening hours, order the thing, send the form already filled in. Pick the smallest one you can actually manage.",
        why: "When someone is running on empty, one less task is felt more directly than any compliment.",
      },
      {
        title: "Leave something where they land",
        task: "Leave one short note, or a snack, or their charger, somewhere they will find it when you are not there: the pillow, the car seat, the counter by the coffee. If you do not share a space, schedule the equivalent: a message timed to land when they wake, or a voice note waiting for the end of their shift. Two lines maximum.",
        why: "Opposite shifts, sick days, and separate addresses all mean you miss each other in person, and something waiting carries the moment across the gap.",
      },
      {
        title: "Ask a one-word question",
        task: "Ask one question they can answer in a single word: \"Rough day or okay day?\" or \"Better or worse than yesterday?\" Accept the one word without following up.",
        why: "Checking in should not turn into an interview, and a one word answer still tells you where they are today.",
      },
      {
        title: "Pick the one you keep",
        task: "Look back at the week and pick the single thing that took the least out of you and gave the most. Do that one again today, and plan to keep only that one.",
        why: "A tiny habit you can hold on your worst week is worth more than a good habit you drop the moment things get hard.",
      },
    ],
  },
  {
    id: "clean-fight",
    title: "The Clean Fight",
    tagline: "Seven days, one conflict skill at a time.",
    forWhom:
      "For couples who love each other and fight badly: the same argument, the same escalation, the same wreckage afterward. This is for conflict between two people who are both safe with each other. If you are afraid of your partner, walking on eggshells, or being controlled or hurt, that is not a fight pattern, and the safety resources in this app are the right place to start.",
    days: [
      {
        title: "Watch your opening",
        task: "Change nothing today. Just notice how you open a complaint: the first sentence, the tone, the timing. Write down one real opener you used, word for word.",
        why: "How an argument starts predicts how it ends, and most people have never actually heard their own first sentence.",
      },
      {
        title: "Softened startup, tiny stakes",
        task: "Raise one genuinely small thing in this shape: how you feel, about what situation, and one specific request. If you share a place: \"I felt swamped when the kitchen was left last night. Could we split it tonight?\" If you do not: \"I felt dropped when Thursday got moved with no warning. Could you tell me the day before next time?\" The dishes or the calendar, not the relationship.",
        why: "Aiming at the problem instead of the person is a skill, and skills have to be practiced on something small before they show up on something big.",
      },
      {
        title: "Find your warning sign",
        task: "Learn the physical signal that comes before you lose the thread: jaw, chest, hands, heat in the face, going flat. Notice it once today, in any tense moment, including one that has nothing to do with your partner.",
        why: "Once you are past a certain point of anger nobody is listening anymore, so the useful moment is the one just before it.",
      },
      {
        title: "Agree on the break",
        task: "In a calm moment, agree on a signal either of you can use that means \"I need twenty minutes and I am coming back.\" Agree on the length and agree that whoever calls it is the one who restarts the conversation. Five minutes, done.",
        why: "A break only feels safe instead of like abandonment when the return is part of the deal.",
      },
      {
        title: "Use the break for real",
        task: "Use the signal once today. If a real argument sparks, use it for real: separate, actually calm down, and come back when you said you would. If the day stays peaceful, do a thirty second dry run out loud and take it seriously.",
        why: "A tool you have never used will not appear in your hands in the middle of a fight.",
      },
      {
        title: "Make one repair on purpose",
        task: "In any tense moment today, deliberately offer one thing that lowers the temperature: \"can we start over?\", a hand on their arm, \"I am not trying to win this.\" If your partner offers one first, take it out loud.",
        why: "Couples who last are not the ones who fight less, they are the ones who catch the rope when it gets thrown.",
      },
      {
        title: "Come back and finish it",
        task: "Take twenty minutes today, more than the usual ten, and finish one small unresolved argument. Each of you says your side, the other repeats it back until it is right, then you close it and leave it closed. No verdict, no winner.",
        why: "Unfinished fights do not dissolve, they wait, and finishing a small one teaches you both the moves for the bigger ones.",
      },
    ],
  },
];

export function getExtraChallenge(id: string): Challenge | undefined {
  return extraChallenges.find((c) => c.id === id);
}

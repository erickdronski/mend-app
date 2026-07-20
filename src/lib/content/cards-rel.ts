/**
 * Additional conversation prompt-card decks for relationships that are not
 * (or not yet) the long-married kind: new couples, couples living apart, and
 * couples putting things back together after a break or a betrayal.
 *
 * Same shape and same rules as the base decks in cards.ts. The universal rule
 * is in every deck's guidance: anyone may pass any card, and no explanation is
 * owed. Nothing here is therapy, and nothing here replaces a counselor.
 */

import type { Deck } from "./cards";

export const extraDecks: Deck[] = [
  {
    id: "early-days",
    title: "Early Days",
    tagline: "Real closeness without the interrogation.",
    vibe: "gentle",
    description:
      "For dating and for couples still finding out who the other person is. These cards skip the resume questions and go straight at the things that actually tell you about someone: how they rest, what they need when it's a bad day, what they're proud of. Nothing here asks for a confession, a tally of who came before, or a status you have not agreed on, and nothing assumes where this is headed. Answer at whatever depth feels right tonight; the deck works at any of them.",
    guidance:
      "Take turns drawing, and whoever draws gets to choose whether to answer first or hand it over. Depth is optional: a one-line answer to a big card is still a real answer, and following up with genuine curiosity beats trading speeches. Don't treat an answer as a promise about the future. If there is fear, pressure, or control in this relationship, this deck is the wrong tool and the safety resources in the app are the right place to start. Anyone may pass any card, no explanation owed.",
    cards: [
      {
        text: "What are you into right now that you could talk about for an hour without getting bored?",
        followUp: "What got you started on it?",
      },
      {
        text: "How do you spend a day when nobody needs anything from you?",
      },
      {
        text: "What's the fastest way to make you comfortable in a room full of people you don't know?",
      },
      {
        text: "What do people usually get wrong about you at first?",
        followUp: "How long does it normally take before they get it right?",
      },
      {
        text: "After a rough day, do you want company, quiet, or distraction?",
        followUp: "How would I be able to tell which one it is?",
      },
      {
        text: "What's a small thing someone can do that makes you trust them?",
      },
      {
        text: "What are you proud of that never comes up in normal conversation?",
      },
      {
        text: "Which of your friends knows you best, and what would they say about you that I wouldn't guess yet?",
      },
      {
        text: "What does a good week look like for you at this point in your life?",
      },
      {
        text: "What's something you've changed your mind about in the last couple of years?",
      },
      {
        text: "How do you actually feel about your phone? Messages all day, or it stays in your pocket?",
        followUp: "What pace between us would feel right to you, honestly?",
      },
      {
        text: "What are you working toward at the moment, even if it's unglamorous?",
      },
      {
        text: "What's a hard thing you've been through that shaped you? Tell it at whatever depth you want tonight.",
      },
      {
        text: "What do you need from someone when the two of you disagree?",
      },
      {
        text: "Who raised you, and what did they teach you about love, on purpose or by accident?",
      },
      {
        text: "Where do you go, physically or otherwise, when you need to reset?",
      },
      {
        text: "What's the kindest thing anyone has done for you?",
        followUp: "Did you ever tell them what it meant?",
      },
      {
        text: "What's something you'd want a person to know about you before anything got serious?",
      },
      {
        text: "What's a deal breaker for you that has nothing to do with anyone's flaws? Just an incompatibility.",
      },
      {
        text: "What did you notice about me first? And what have you noticed since that surprised you?",
      },
      {
        text: "What are you hoping this turns into? Not knowing yet is a real answer.",
        followUp: "What would help you figure that out, other than time?",
      },
    ],
  },
  {
    id: "the-distance",
    title: "The Distance",
    tagline: "For the miles, and the screen in between.",
    vibe: "deep",
    description:
      "For couples living apart: different cities, different countries, different shifts, deployments, school, work, family. A call can turn into a status update pretty fast, two people reciting their schedules until someone yawns. These cards do the opposite. They pull in the ordinary texture of your day, name the parts of distance that are genuinely hard, and keep the plan for closing the gap on the table instead of under it.",
    guidance:
      "Use whatever channel you actually have. On a call, pick one where neither of you is about to fall asleep, put the other screens away, and leave a beat after each answer, because voice and video both make it easy to talk over each other. If your channel is text, sign, voice notes, or letters, take one card a day instead of a stack in one sitting; the deck works fine at that speed and answering in your own time is not a lesser version of it. Detail is the whole point here, so be specific about rooms, weather, food, faces. Nothing in this deck is an account you owe anybody: no card here is a request to prove where you were, who you were with, or what you were doing, and if it is being used that way, stop and open the safety resources in the app. Anyone may pass any card, no explanation owed.",
    cards: [
      {
        text: "What is one ordinary moment from today you would have told me about if I had been in the room?",
      },
      {
        text: "What's in your line of sight right now? Describe it like I've never seen that room.",
        followUp: "Show me the one thing in there with a story attached.",
      },
      {
        text: "Which hour of the day is hardest when we're apart?",
        followUp: "What would actually help in that specific hour?",
      },
      {
        text: "What happened this week that you decided wasn't worth a message? Tell me now.",
      },
      {
        text: "What do you miss first when we're apart?",
        followUp: "What do you miss that you'd feel a little silly saying out loud?",
      },
      {
        text: "Is calling every day helping, or has it started to feel like an obligation some nights? Honest answer, no hurt feelings.",
      },
      {
        text: "If I could be there in five minutes, what would we do with the rest of tonight?",
      },
      {
        text: "What does my being gone actually feel like? Name the feeling, not the logistics.",
      },
      {
        text: "What routine have you built on your own that you'd want to keep even once we're in the same place?",
      },
      {
        text: "When you do talk about me to someone there, what do you find yourself saying? Only if that is a comfortable question tonight.",
      },
      {
        text: "What's the thing you most worry I don't understand about your life from this far away?",
      },
      {
        text: "What's costing you the most in this arrangement right now? Money, sleep, time, energy, something else.",
        followUp: "Is there any part of that I could carry from here?",
      },
      {
        text: "What would make you feel chosen this week, from this distance? Keep it specific and small enough to actually happen.",
      },
      {
        text: "Have you had a jealous or insecure thought lately that you decided not to raise? Raise it gently now.",
        followUp: "What would settle it, if anything can from here?",
      },
      {
        text: "What's a food, a smell, or a song that means home to you? Could I find it on my end and try it?",
      },
      {
        text: "When are we next in the same room?",
        followUp: "What's the first thing that happens when we are?",
      },
      {
        text: "What do you want the end of the distance to look like, and roughly by when?",
        followUp: "What would need to be true for that to be possible?",
      },
      {
        text: "What's something about you that just doesn't come through on a screen? I'd rather know I'm missing it.",
      },
      {
        text: "Is there anything you've been saving up to say in person? You can keep saving it, I just want to know it exists.",
      },
      {
        text: "What do you need more of from me: more contact, better contact, or more room? All three are allowed answers.",
      },
      {
        text: "When we hang up tonight, what's the last thing you'd want me to say?",
      },
    ],
  },
  {
    id: "back-from-the-brink",
    title: "Back From The Brink",
    tagline: "Rebuilding without reopening.",
    vibe: "repair",
    description:
      "For couples who almost ended it, or did for a while, and are trying again after a break, a betrayal, or a long collapse. These cards deliberately do not ask for the details of what happened. Interrogating the injury tends to reopen it, and that is a job for a couples therapist with a plan, not a card game. What's here instead is the slower work: what safety looks like now, what each of you needs on the ordinary days, and what you can honestly promise this month. This is an educational tool, not therapy.",
    guidance:
      "Both of you have to actually want to be here tonight; if one of you is doing this to prove something, stop and pick another night. Agree on a stop signal before you draw the first card and honor it instantly, no negotiating. No demanding details of the injury, no scorekeeping, and nothing said here gets quoted back in a future argument. Go short: three or four cards is a full session for this deck. If there is fear, pressure, coercion, or any threat to your safety in this relationship, this deck is the wrong tool, and the safety resources in the app are the right place to start. Anyone may pass any card, no explanation owed.",
    cards: [
      {
        text: "If you needed to stop this conversation right now, how would you tell me? Let's agree on the signal before we need it.",
      },
      {
        text: "Why are you here tonight? Not the long version, just the true one.",
      },
      {
        text: "What's one thing that's better now than it was six months ago, even slightly?",
      },
      {
        text: "What helps you feel safe with me these days? Tell me what to do more of, specifically.",
      },
      {
        text: "What's a recent moment where I got it right? I want to know what right looks like from where you sit.",
      },
      {
        text: "What do you need from me on the ordinary days, when nothing is wrong at all?",
      },
      {
        text: "What do you need to be able to ask me without it becoming a fight?",
        followUp: "How do you want me to answer when you ask it?",
      },
      {
        text: "Is there something I do that accidentally reminds you of the worst of it? I'd rather know than keep doing it.",
      },
      {
        text: "What's a boundary you need that you haven't said out loud yet?",
      },
      {
        text: "What are you carrying that you don't want to hand me tonight, but want me to know is there?",
      },
      {
        text: "What do you need from me on a bad day, when it comes back up out of nowhere?",
        followUp: "And what do you need me not to do?",
      },
      {
        text: "What have you had to grieve about the version of us we're not going back to?",
      },
      {
        text: "What does forgiveness actually mean to you? Not the dictionary version, yours.",
      },
      {
        text: "What are you afraid to hope for?",
      },
      {
        text: "What are you working on in yourself right now, separate from us?",
      },
      {
        text: "Who else knows where we are, and is the support you're getting actually helping?",
      },
      {
        text: "What would you want me to say when you go quiet and I can't tell why?",
      },
      {
        text: "What's one thing we should stop doing completely, because it has never once helped?",
      },
      {
        text: "What's one promise you can make and keep this month? Small enough that keeping it is realistic.",
        followUp: "How will we both know it was kept?",
      },
      {
        text: "When trust comes back, what's the first thing you'd notice being different?",
      },
      {
        text: "If we're still here in five years telling the story of this year, what do you want the story to be?",
      },
    ],
  },
];

export function getExtraDeck(id: string): Deck | undefined {
  return extraDecks.find((d) => d.id === id);
}

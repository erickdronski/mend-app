/**
 * Conversation prompt-card decks.
 *
 * Each card is one question or prompt spoken directly to a partner. Decks are
 * tuned for different temperatures: some demand zero vulnerability, some ask
 * for a lot. The universal rule sits in every deck's guidance: anyone may pass
 * any card, and no explanation is owed.
 */

export type PromptCard = { text: string; followUp?: string };

export type Deck = {
  id: string;
  title: string;
  tagline: string;
  vibe: "gentle" | "deep" | "playful" | "repair" | "desire" | "dreams";
  description: string;
  guidance: string;
  cards: PromptCard[];
};

export const decks: Deck[] = [
  {
    id: "first-steps",
    title: "First Steps",
    tagline: "Easy questions for a quiet house.",
    vibe: "gentle",
    description:
      "For when talking itself is the hard part. Every card here is answerable in one sentence, none of them require opening a vein, and nothing on any card is a trap. Think of it as small talk that actually goes somewhere: preferences, logistics, little observations. If one of you is guarded, private, or just tired of heavy conversations, start here.",
    guidance:
      "Whoever suggested the deck draws first and answers first, so the other person can just listen for a round. Take turns drawing; short answers are completely fine and silence while someone thinks is not a problem. Anyone may pass any card, no explanation owed.",
    cards: [
      {
        text: "What's one thing on your plate this week that I could take off it?",
      },
      {
        text: "If you had two free hours this weekend with zero obligations, what would you do with them?",
        followUp: "Would you want company for that, or is it an alone thing?",
      },
      {
        text: "What's the best part of your day, most days?",
      },
      {
        text: "Is there a meal you'd happily eat every week that we almost never make?",
      },
      {
        text: "What's something you've been watching, reading, or listening to that I haven't asked about?",
        followUp: "What got you into it?",
      },
      {
        text: "Morning person or night person these days? Has that changed since I last checked?",
      },
      {
        text: "What's one small errand or chore you dread the most?",
        followUp: "Would it actually help if I took it, or is it more complicated than that?",
      },
      {
        text: "Rate this week so far, one to ten. No explanation needed unless you feel like giving one.",
      },
      {
        text: "What's something you fixed, finished, or handled lately that nobody noticed?",
      },
      {
        text: "Who did you talk to today besides me?",
      },
      {
        text: "What's a song or artist you've had on repeat lately?",
      },
      {
        text: "If we ordered takeout tonight, no compromise, what sounds good to you?",
      },
      {
        text: "What's one thing coming up this month you're actually looking forward to, even something small?",
      },
      {
        text: "Is there anything on the calendar you're quietly dreading? Just name the event, you don't have to unpack it.",
        followUp: "Anything I can do to make that day easier, logistically?",
      },
      {
        text: "What did you used to do for fun before life got this busy?",
      },
      {
        text: "What's your favorite spot in our place, and what do you usually do there?",
      },
      {
        text: "What's one thing I could grab at the store that would make your week slightly better?",
      },
      {
        text: "What time of day do you feel most like yourself?",
      },
      {
        text: "Is there something around the house that's been bugging you that has nothing to do with either of us?",
      },
      {
        text: "Would help with mornings or help with evenings make a bigger difference for you right now?",
        followUp: "What would that help actually look like, specifically?",
      },
      {
        text: "What's a small thing you saw or heard this week that you meant to tell me about and didn't?",
      },
    ],
  },
  {
    id: "go-deeper",
    title: "Go Deeper",
    tagline: "The questions under the questions.",
    vibe: "deep",
    description:
      "Questions about the inner life: fears, needs, old wounds, the things that get thought but not said. These cards work best when there's already some safety in the room, so if the marriage is running cold, warm up with First Steps before you come here. The listener's only job is to hear the answer without arguing with it.",
    guidance:
      "Take turns drawing, and let the person who draws choose whether to answer first or hand the card over. No fixing, no debating the answer, and no using anything said here as ammunition later; that rule is the whole deck. Anyone may pass any card, no explanation owed.",
    cards: [
      {
        text: "What's something you worry about that you mostly keep to yourself?",
      },
      {
        text: "When do you feel loneliest, even inside this marriage?",
        followUp: "Is there something I do, or don't do, that makes it better or worse?",
      },
      {
        text: "What part of yourself have you put on a shelf since we got married?",
      },
      {
        text: "What did you need as a kid that you didn't reliably get?",
        followUp: "Where does that need show up between us now?",
      },
      {
        text: "What do you do with sadness? Where does it actually go?",
      },
      {
        text: "When was the last time you felt truly proud of yourself? Did you tell anyone?",
      },
      {
        text: "What's a way I could comfort you that I probably haven't figured out yet?",
      },
      {
        text: "What does being loved look like to you in a completely ordinary week? Be specific.",
      },
      {
        text: "What's something hard from your past that still steers how you act now?",
      },
      {
        text: "If you could be certain I wouldn't get defensive, what would you tell me?",
      },
      {
        text: "What's the feeling you have most often but name least often?",
      },
      {
        text: "Who were you before we met that I never really got to know?",
        followUp: "Is any of that person still around? Do you miss them?",
      },
      {
        text: "What do you pretend not to care about that you actually care about a lot?",
      },
      {
        text: "When do you feel most like an impostor: at work, as a parent, as a spouse, anywhere?",
      },
      {
        text: "What's a loss you've never fully let yourself grieve?",
      },
      {
        text: "What scares you about the next ten years?",
        followUp: "Which part of that could we face together instead of separately?",
      },
      {
        text: "What's a need you've stopped asking me to meet? What happened?",
      },
      {
        text: "When you can't sleep, what's usually running in your head?",
      },
      {
        text: "What are you afraid I'd think less of you for, if I really knew?",
      },
      {
        text: "What would you want me to know right now if you were sure I'd just listen and not try to fix it?",
        followUp: "Is there anything you'd want me to do with that, or just hold it?",
      },
    ],
  },
  {
    id: "lighter",
    title: "Lighter",
    tagline: "Because you married someone you used to laugh with.",
    vibe: "playful",
    description:
      "Nostalgia, silliness, terrible opinions held with total confidence. Laughing together is not a distraction from repairing a marriage; for a lot of couples it's the first brick. Pull this deck out on a date night, a long drive, or any evening that's been too serious for too long.",
    guidance:
      "No turns needed here: draw a card, both of you answer it, argue about whose answer is better. Interrupting with a better story is allowed and encouraged. Anyone may pass any card, no explanation owed.",
    cards: [
      {
        text: "What's the hardest we've ever laughed together? Set the scene properly.",
      },
      {
        text: "What was your first honest impression of me? Be honest, I can take it.",
        followUp: "When did it change?",
      },
      {
        text: "If we had to go on a game show as a team, which one gives us the best shot at winning?",
      },
      {
        text: "Which one of my habits would you keep if you could only keep one?",
      },
      {
        text: "What's the worst outfit I have ever confidently worn?",
      },
      {
        text: "If our early relationship were a movie, which scene makes the trailer?",
        followUp: "Who plays us? Wrong answers only.",
      },
      {
        text: "What's a dumb purchase one of us made that you secretly loved?",
      },
      {
        text: "Redo our first date with an unlimited budget. What changes and what stays exactly the same?",
      },
      {
        text: "What song should play every time you walk into a room?",
      },
      {
        text: "What's an inside joke or nickname we retired that deserves a comeback?",
      },
      {
        text: "If you could send one sentence back to me the week before our wedding, what would it say?",
      },
      {
        text: "What's your most irrational food opinion? Defend it with your whole chest.",
      },
      {
        text: "After the people and the pets, which household object are you saving in a fire?",
      },
      {
        text: "Two truths and a lie about your childhood. Go.",
        followUp: "Okay, now the full story behind the weirdest one.",
      },
      {
        text: "What's the pettiest opinion you hold with complete conviction?",
      },
      {
        text: "If we swapped phones for a day, what on yours would surprise me most?",
      },
      {
        text: "What was the exact moment you first thought, okay, I actually like this person?",
      },
      {
        text: "What would our sitcom be called, and what's the running gag?",
      },
      {
        text: "Which of us is more likely to survive a week in the wilderness, and how insulted is the other one?",
      },
      {
        text: "What's something I do that you've never admitted you find funny?",
        followUp: "Do the impression. You know you have one.",
      },
      {
        text: "If we could teleport anywhere for dinner tonight and be back by midnight, where are we eating?",
      },
    ],
  },
  {
    id: "repair",
    title: "Repair",
    tagline: "For after the fight, or during the freeze.",
    vibe: "repair",
    description:
      "For the hours or days after an argument, or the long quiet spells where nobody's yelling but nobody's okay. These cards slow things down and aim at understanding, not at winning the rematch. If either of you is still flooded (racing heart, tunnel vision, itching to score a point), wait. This deck works on calm nerves only.",
    guidance:
      "The person who was more hurt in the last round draws first and hands the card to the other person to answer; if you can't agree who that was, take turns. One card at a time, no stacking grievances, and either of you can call a break at any point as long as you name a time to come back. Anyone may pass any card, no explanation owed.",
    cards: [
      {
        text: "On a scale of one to ten, how okay are we right now, from where you sit?",
      },
      {
        text: "What's one thing I did in that argument that made it harder for you to stay open?",
      },
      {
        text: "What were you trying to protect back there?",
        followUp: "Did it feel like I was attacking that thing on purpose?",
      },
      {
        text: "Did something I said land as something I didn't mean? Tell me what you heard.",
      },
      {
        text: "What do you need from me in the next hour? Space is an allowed answer.",
      },
      {
        text: "Can I tell you the part I got wrong, with no 'but' attached to it?",
      },
      {
        text: "Underneath the actual words, what did you need in that moment?",
      },
      {
        text: "Is this fight about what it looked like, or is something older riding along with it?",
        followUp: "How far back does that older thing go?",
      },
      {
        text: "What's one sentence I could have said in the middle of it that would have changed everything?",
      },
      {
        text: "Do you want to finish this now, or pick a time to come back to it when we're both fresher?",
      },
      {
        text: "Even annoyed with me, what's one true and kind thing you can still say about me? I'll go first.",
      },
      {
        text: "When we go cold like this, what is it like on your side of the house?",
        followUp: "What usually ends it for you, when it finally ends?",
      },
      {
        text: "What would help you believe I'm sorry, beyond me saying the words?",
      },
      {
        text: "Is there an older apology you're still waiting on from me, from before any of this?",
      },
      {
        text: "What's the story you told yourself about why I did what I did?",
        followUp: "Can I tell you what was actually happening on my end, once you've finished?",
      },
      {
        text: "What did either of us do right in that fight, if anything? Small counts.",
      },
      {
        text: "Can we name the pattern out loud? Who pushed, who pulled away, and how it ended this time.",
      },
      {
        text: "What are you afraid happens if you let this one go?",
      },
      {
        text: "What's one thing you wish I understood about how you fight, that would make you make more sense to me?",
      },
      {
        text: "What would us being okay again look like tonight? Concrete things: dinner together, a walk, sitting in the same room.",
      },
    ],
  },
  {
    id: "desire",
    title: "Desire",
    tagline: "Wanting, being wanted, and saying so out loud.",
    vibe: "desire",
    description:
      "Affection, attraction, closeness, and the conversations about them that most couples never quite have. Nothing here is crude and nothing here is a demand; the point is to learn how your partner actually experiences wanting and being wanted, which is usually different from what you've assumed. Answering a card commits you to nothing except honesty.",
    guidance:
      "Do this deck somewhere private with no clock running, and take turns drawing. Answers are information, not requests you have to fulfill, so receive them with curiosity instead of pressure, and never quote an answer back in an argument. Anyone may pass any card, no explanation owed.",
    cards: [
      {
        text: "When do you feel most attractive? What's happening in that moment?",
      },
      {
        text: "What kind of touch says 'I love you' to you, outside the bedroom entirely?",
      },
      {
        text: "What did I do early on that made you feel wanted? Do I still do it?",
        followUp: "If it faded, when do you think it faded?",
      },
      {
        text: "How do you like to be kissed hello?",
      },
      {
        text: "What's a compliment about your body or your presence that you would actually believe from me?",
      },
      {
        text: "When you want closeness, how do you signal it? Am I catching the signal?",
        followUp: "What happens inside you when the signal gets missed?",
      },
      {
        text: "What makes desire easy for you, and what shuts the door?",
      },
      {
        text: "Is there a kind of affection you wish came with no expectation that it leads anywhere?",
      },
      {
        text: "What's the difference, for you, between feeling loved and feeling wanted?",
      },
      {
        text: "Where do you like being touched when you're just tired and done with the day?",
      },
      {
        text: "Tell me about a moment recently when you felt drawn to me. What was I doing?",
      },
      {
        text: "Do you want more flirting between us? What did ours used to sound like?",
        followUp: "What would a modern version of that look like, at this age, in this life?",
      },
      {
        text: "Honestly, what time of day is closeness easiest for you?",
      },
      {
        text: "What do you notice about the way I look at you, or the way I've stopped?",
      },
      {
        text: "How do you want to be asked? And how do you want a no to sound, so it doesn't sting?",
      },
      {
        text: "What helps you set the day down enough to actually be present with me?",
        followUp: "Is there a way I could help with that handoff instead of waiting for it?",
      },
      {
        text: "Is there something you've wanted to try, or bring back, that has felt hard to raise?",
        followUp: "What would make it easier to talk about? Just talk, nothing more tonight.",
      },
      {
        text: "What did you grow up believing about wanting things, and does it still have a grip on you?",
      },
      {
        text: "When we're apart for a few days, what do you miss first?",
      },
      {
        text: "What's one small physical ritual you'd want us to have every single day? A real kiss goodbye, a hand on the back, anything.",
      },
    ],
  },
  {
    id: "dreams",
    title: "Dreams",
    tagline: "The life you're building, on purpose.",
    vibe: "dreams",
    description:
      "The future: ambitions, plans, the ten-year picture, and the small hopes that never make it onto a calendar. Couples in a hard season often stop talking about the future entirely, and the silence reads as not having one. This deck restarts that conversation. Nothing said here is a commitment; it's a map of what each of you is quietly hoping for.",
    guidance:
      "Take turns drawing, and dream first, budget later: no one is allowed to answer a card with 'we can't afford that' during the game. Write down anything that makes both of you sit up, because those are the ones worth planning. Anyone may pass any card, no explanation owed.",
    cards: [
      {
        text: "Where do you picture us in ten years? First image that comes to mind, don't edit it.",
      },
      {
        text: "What's a dream you had at twenty-five that's still alive somewhere in you?",
        followUp: "What's the smallest version of it we could actually do?",
      },
      {
        text: "If money stopped being the deciding factor tomorrow, what would we change first?",
      },
      {
        text: "What do you want our home to feel like when someone walks in the door?",
      },
      {
        text: "What's something you want to get genuinely good at before you're done? A skill, a craft, anything.",
      },
      {
        text: "What trip do you keep almost bringing up?",
        followUp: "What's stopped you from saying it out loud?",
      },
      {
        text: "What kind of old couple do you want us to be? Describe them at breakfast.",
      },
      {
        text: "What would you want to be true about our life five years from now that isn't true yet?",
      },
      {
        text: "Is there a version of your work life you daydream about? Even a vague one counts.",
      },
      {
        text: "What do you want more of in our ordinary week, starting at a realistic size?",
      },
      {
        text: "What's a tradition you want us to invent, or protect before it slips away?",
        followUp: "What did your family do that you'd want to carry forward, or deliberately not?",
      },
      {
        text: "What about the future scares you that you'd rather face as a team than alone?",
      },
      {
        text: "If this marriage had a mission statement, what should the first line be?",
      },
      {
        text: "What's one thing you'd regret never trying?",
      },
      {
        text: "Of the people we actually know, whose life has pieces you'd want for ours?",
        followUp: "Which piece exactly?",
      },
      {
        text: "What does 'enough' look like for you? Money, house, stuff, all of it.",
      },
      {
        text: "What would you want the people who know us best to say about how we lived?",
      },
      {
        text: "Is there a season of life you're secretly looking forward to that most people dread?",
      },
      {
        text: "If we got one completely free year, no work, no obligations, how would we spend it?",
      },
      {
        text: "What are we building right now, this year, that will still matter in twenty?",
        followUp: "And what are we pouring energy into that won't?",
      },
    ],
  },
];

export function getDeck(id: string): Deck | undefined {
  return decks.find((d) => d.id === id);
}

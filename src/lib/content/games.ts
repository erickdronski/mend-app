/**
 * Couple games question banks.
 *
 * Three low-stakes ways back toward each other: a guessing game, a pile of
 * harmless dilemmas, and prompts for retelling the stories you already own.
 * Nothing here requires a good mood to start. It only requires showing up.
 */

export type QuizQuestion = { q: string; category: string };

export const partnerQuiz: QuizQuestion[] = [
  // Daily life
  {
    q: "What does your partner do first in the morning, before anything else?",
    category: "Daily life",
  },
  {
    q: "What would your partner say is the best part of their typical day?",
    category: "Daily life",
  },
  {
    q: "Which chore does your partner secretly not mind doing?",
    category: "Daily life",
  },
  {
    q: "Besides you, who does your partner talk to most in a normal week?",
    category: "Daily life",
  },
  {
    q: "What would your partner say is the most stressful part of their week right now?",
    category: "Daily life",
  },
  {
    q: "If your partner got one free hour tonight, no obligations, what would they actually do with it?",
    category: "Daily life",
  },

  // Inner world
  {
    q: "What is your partner quietly proud of about themselves this year?",
    category: "Inner world",
  },
  {
    q: "What worry has your partner been carrying lately that they haven't said much about?",
    category: "Inner world",
  },
  {
    q: "Which compliment lands hardest for your partner: about their looks, their work, their character, or their effort?",
    category: "Inner world",
  },
  {
    q: "When your partner goes quiet, what is usually happening inside?",
    category: "Inner world",
  },
  {
    q: "What small thing makes your partner feel genuinely loved?",
    category: "Inner world",
  },
  {
    q: "What does your partner wish more people understood about them?",
    category: "Inner world",
  },

  // Memories
  {
    q: "What would your partner say was the best day the two of you have ever had?",
    category: "Memories",
  },
  {
    q: "Where would your partner say your first kiss happened?",
    category: "Memories",
  },
  {
    q: "What is your partner's favorite story to tell other people about the two of you?",
    category: "Memories",
  },
  {
    q: "Which childhood memory does your partner bring up most often?",
    category: "Memories",
  },
  {
    q: "What was your partner's honest first impression of you?",
    category: "Memories",
  },
  {
    q: "Which trip or outing would your partner repeat exactly as it happened?",
    category: "Memories",
  },

  // Tastes & preferences
  {
    q: "What meal would your partner pick for a last-night-on-earth dinner?",
    category: "Tastes & preferences",
  },
  {
    q: "What is your partner's go-to order at the place you two visit most?",
    category: "Tastes & preferences",
  },
  {
    q: "Which movie or show could your partner rewatch forever without getting tired of it?",
    category: "Tastes & preferences",
  },
  {
    q: "What is something your partner likes more than they let on?",
    category: "Tastes & preferences",
  },
  {
    q: "Given the choice this exact week, would your partner pick a night out or a night in?",
    category: "Tastes & preferences",
  },
  {
    q: "What gift under twenty dollars would genuinely delight your partner?",
    category: "Tastes & preferences",
  },

  // Stress & comfort
  {
    q: "What is the first sign your partner is stressed, before they say a word?",
    category: "Stress & comfort",
  },
  {
    q: "After a terrible day, what does your partner want from you: solutions, sympathy, space, or food?",
    category: "Stress & comfort",
  },
  {
    q: "What place calms your partner down almost instantly?",
    category: "Stress & comfort",
  },
  {
    q: "What is your partner's real comfort food, not the impressive answer?",
    category: "Stress & comfort",
  },
  {
    q: "What does your partner do to unwind that actually works?",
    category: "Stress & comfort",
  },
  {
    q: "Outside of your marriage, who or what is your partner most worried about right now?",
    category: "Stress & comfort",
  },

  // Hopes
  {
    q: "What is one thing your partner still wants to learn or try, even if they rarely say it out loud?",
    category: "Hopes",
  },
  {
    q: "Where does your partner picture the two of you in ten years?",
    category: "Hopes",
  },
  {
    q: "What would your partner do with a surprise year off, money handled?",
    category: "Hopes",
  },
  {
    q: "What dream did your partner have when you met that they haven't given up on?",
    category: "Hopes",
  },
  {
    q: "What would your partner say they want more of in your life together next year?",
    category: "Hopes",
  },
  {
    q: "What is on your partner's quiet bucket list: the trip, the skill, or the project they keep circling back to?",
    category: "Hopes",
  },
];

export type WouldYouRather = { a: string; b: string };

export const wouldYouRather: WouldYouRather[] = [
  {
    a: "Relive our first date exactly as it happened",
    b: "Get a sneak preview of one ordinary day of our life ten years from now",
  },
  {
    a: "Have a whole weekend together with nothing planned",
    b: "Have a whole weekend planned perfectly by someone else",
  },
  {
    a: "Never do dishes again",
    b: "Never fold laundry again",
  },
  {
    a: "Take a trip somewhere neither of us has ever been",
    b: "Go back to the place we loved most and do it all again",
  },
  {
    a: "Slow dance in the kitchen every night for a week",
    b: "Have one real date night with both phones left at home",
  },
  {
    a: "Always know what I'm feeling without asking",
    b: "Have me always know what you're feeling without you explaining",
  },
  {
    a: "Win every argument we ever have",
    b: "Never have the argument start in the first place",
  },
  {
    a: "Get one long, honest letter from me every year",
    b: "Get one real compliment from me every day",
  },
  {
    a: "Live in a tiny place in your dream location",
    b: "Live in your dream house somewhere that's just fine",
  },
  {
    a: "Have every meal cooked for us for a year",
    b: "Have the house cleaned for us for a year",
  },
  {
    a: "Redo our wedding day with an unlimited budget",
    b: "Take the honeymoon we never quite got around to",
  },
  {
    a: "Be twenty-five again together for one week",
    b: "Skip ahead to retirement together for one week",
  },
  {
    a: "Communicate only in handwritten notes for a day",
    b: "Communicate only face to face for a day, no texting allowed",
  },
  {
    a: "Know exactly what I appreciated about you this week",
    b: "Have me know exactly what you needed from me this week",
  },
  {
    a: "Take a class together and both be hilariously bad at it",
    b: "Teach each other something we're each already good at",
  },
  {
    a: "Get one guaranteed hour alone together every day",
    b: "Get one full obligation-free Saturday together every month",
  },
  {
    a: "Laugh until we cry once a week",
    b: "Have one conversation that stays with us once a week",
  },
  {
    a: "Get a do-over on one fight from our past",
    b: "Get a guarantee that one future fight never happens",
  },
  {
    a: "Take a road trip with no map and no reservations",
    b: "Take a trip with every detail planned before we leave the driveway",
  },
  {
    a: "Have more affection this month without having to ask for it",
    b: "Have more real conversation this month without having to start it",
  },
  {
    a: "Hear what my friends honestly say about you",
    b: "Have me hear what your friends honestly say about me",
  },
  {
    a: "Have breakfast in bed together every Sunday",
    b: "Take a slow walk together every Sunday",
  },
  {
    a: "Swap chores with each other for a week",
    b: "Swap sides of the bed for a month",
  },
  {
    a: "Be mildly famous as a couple for something wholesome",
    b: "Be completely unknown but rich in free time",
  },
];

export type MemoryPrompt = { prompt: string };

export const memoryLane: MemoryPrompt[] = [
  {
    prompt:
      "Tell the story of the exact moment you realized this was serious. Where were we? What did I do or say that tipped you over?",
  },
  {
    prompt:
      "Retell our first date from your side. What were you nervous about? What do you remember that I probably don't?",
  },
  {
    prompt:
      "Retell how we met, but only in details: the weather, the room, what we were wearing, the first thing either of us said.",
  },
  {
    prompt:
      "Tell me about the hardest thing we've gotten through together, and the moment you knew we were going to be okay.",
  },
  {
    prompt:
      "Describe our first night in a place that was ours: the boxes, the mess, the takeout, the feeling. What do you remember most?",
  },
  {
    prompt:
      "Tell the story of the funniest thing that has ever happened to us. Take your time. Do the voices.",
  },
  {
    prompt:
      "Walk me through the day we decided we were forever, from your side. What was going on in your head that I couldn't see?",
  },
  {
    prompt:
      "Tell me about a time I surprised you in a good way. What did I do, and what did it mean to you right then?",
  },
  {
    prompt:
      "Pick one completely ordinary day from our early years that you'd love to live again. Describe it hour by hour. Why that one?",
  },
  {
    prompt:
      "Tell the story of a trip of ours that did not go as planned. What went wrong, and what do you remember fondly anyway?",
  },
  {
    prompt:
      "Tell me about the first time one of us cried in front of the other. What happened right before, and what happened next?",
  },
  {
    prompt:
      "Tell me about a moment you watched me from across a room and felt lucky. Set the scene: where we were, what I was doing.",
  },
];

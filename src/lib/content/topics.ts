/**
 * Conversation topics for guided sessions.
 *
 * Every topic has a soft-startup opener (complaint without blame, "I" language, per
 * Gottman) and depth prompts the speaker can lean on while they hold the floor.
 * The writing is the product: no filler, no therapy-speak.
 */

export type Topic = {
  id: string;
  category: string;
  title: string;
  why: string;
  opener: string;
  prompts: string[];
};

export const topics: Topic[] = [
  // --- Reconnection ---
  {
    id: "drifting",
    category: "Reconnection",
    title: "How we've been drifting",
    why: "Distance rarely arrives as a crisis. It accumulates in skipped conversations and parallel evenings. Naming the drift out loud, without blame, is how it stops being the default.",
    opener: "“I've been missing us lately, and I want to talk about it, not about whose fault it is.”",
    prompts: [
      "When did you last feel really close to me? What was happening?",
      "What does the distance between us feel like from your side?",
      "What's one small thing I used to do that you miss?",
      "What gets in the way of us connecting on a normal weeknight?",
      "If we were fully back, what would a random Tuesday look like?",
    ],
  },
  {
    id: "love-maps",
    category: "Reconnection",
    title: "Who you are these days",
    why: "People keep changing after the wedding. Couples who stay close keep updating their map of each other's inner world (stresses, dreams, fears) instead of relating to who their partner was five years ago.",
    opener: "“I realized I've stopped asking you real questions. Can I interview you like I did when we were dating?”",
    prompts: [
      "What's weighing on you most right now that I might not fully see?",
      "What are you dreaming about lately, even the unrealistic stuff?",
      "Who in your life is lifting you up right now? Who's draining you?",
      "What part of your day do you wish I asked about?",
      "How have you changed in the last few years that I might have missed?",
    ],
  },
  {
    id: "appreciation",
    category: "Reconnection",
    title: "What I still admire about you",
    why: "Struggling couples slowly retrain their attention onto each other's flaws. This conversation deliberately points it the other way. It can feel awkward. Do it anyway.",
    opener: "“I don't say this enough, and I want to spend a few minutes only on what's good.”",
    prompts: [
      "What first drew you to me, and is any of it still there?",
      "Tell me about a moment you were proud to be with me.",
      "What's something I do for our life that you suspect I think goes unnoticed?",
      "What strength of mine do you lean on, even in a hard season?",
    ],
  },

  // --- Daily Life ---
  {
    id: "invisible-workload",
    category: "Daily Life",
    title: "The invisible workload",
    why: "Resentment about chores is almost never about chores. It's about who carries the noticing: appointments, gifts, groceries, feelings. Making the invisible work visible is the fix; scorekeeping isn't.",
    opener: "“I feel stretched thin by things I'm not sure you see, and I'd like to walk you through my head for a few minutes.”",
    prompts: [
      "What's on your mental list that you think I don't know exists?",
      "Which responsibility feels heaviest (not biggest, heaviest)?",
      "Where do you feel unappreciated, even if I technically say thanks?",
      "What would genuinely lighten your load (not help with, take over)?",
      "What do I carry that you might be underestimating?",
    ],
  },
  {
    id: "outside-stress",
    category: "Daily Life",
    title: "The stress that isn't about us",
    why: "This is the one conversation where you fix nothing. Work, family, health stress from outside the relationship needs a listener, not a consultant. Getting this ritual right protects the relationship from everything else.",
    opener: "“Can I unload about my day? I don't need solutions. I just need you in my corner.”",
    prompts: [
      "What was the worst moment of your week, start to finish?",
      "Who or what is making your life harder right now?",
      "What are you afraid might happen if this stress continues?",
      "What would feeling supported by me look like this week, concretely?",
    ],
  },

  // --- Money ---
  {
    id: "money-history",
    category: "Money",
    title: "What money meant growing up",
    why: "Most money fights are two childhoods arguing. The saver raised by scarcity and the spender raised by scarcity learned opposite lessons from the same fear. You can't negotiate a budget until you've met each other's history.",
    opener: "“I don't think our money fights are really about money. Can we talk about where we each learned this stuff?”",
    prompts: [
      "How did your family talk about money, or was silence the policy?",
      "What did running out of money mean in your house growing up?",
      "What does spending feel like in your body? And saving?",
      "What's a money habit of mine that scares you, and what's the fear under it?",
      "What would 'financially safe' actually feel like for you?",
    ],
  },
  {
    id: "money-team",
    category: "Money",
    title: "Money as a team",
    why: "Couples do better with money when it's us-versus-the-problem instead of me-versus-you. This conversation is for building the shared plan (after the history conversation, not before).",
    opener: "“I want us to feel like teammates about money, and right now I'm not sure we do.”",
    prompts: [
      "Where do you think we're strong as a financial team?",
      "What decision are we avoiding because it always starts a fight?",
      "What's one thing we could automate or decide once, so it stops being a weekly argument?",
      "What are we actually saving toward? Can we name it together?",
    ],
  },

  // --- Intimacy ---
  {
    id: "affection",
    category: "Intimacy",
    title: "Affection and desire",
    why: "Desire discrepancies are normal in long relationships; silence about them is what does the damage. This conversation needs the most safety of any in this library. Soft startup is not optional here.",
    opener: "“I want to talk about our physical connection. I'm nervous to bring it up, which probably means it matters.”",
    prompts: [
      "When do you feel most wanted by me (not just sexually, wanted)?",
      "What does the current distance (or pressure) around intimacy feel like for you?",
      "What helps you feel like being close, and what shuts it down?",
      "What did you learn about affection growing up that might still be steering you?",
      "What's one thing you'd like more of that you've never quite said out loud?",
    ],
  },
  {
    id: "wanted-needed",
    category: "Intimacy",
    title: "Feeling wanted vs. feeling needed",
    why: "Plenty of relationships run efficiently (kids fed, bills paid) while both partners quietly feel like staff. Being needed is logistics. Being wanted is the relationship.",
    opener: "“I know we need each other to run this life. I want to talk about whether we still *want* each other.”",
    prompts: [
      "When did you last feel chosen by me, not just relied on?",
      "What's the difference, for you, between being my partner and being my roommate?",
      "What made you feel desired early on that has gone quiet?",
      "If the kids/work/house vanished for 48 hours, what would you want us to do, honestly?",
    ],
  },

  // --- Family ---
  {
    id: "parenting-team",
    category: "Family",
    title: "Parenting as a team",
    why: "Kids are masters at finding the seam between parents. Disagreements about discipline, screens, or schooling are workable; undermining each other in front of the kids is what corrodes the partnership.",
    opener: "“I think we're on different pages about the kids in a few places, and I'd rather sync up than keep colliding.”",
    prompts: [
      "Where do you feel undermined or second-guessed as a parent?",
      "What part of how you were raised are you determined to repeat, or never repeat?",
      "What's one parenting battle we should just stop fighting with each other?",
      "What do you think our kids see when they watch how we treat each other?",
    ],
  },
  {
    id: "in-laws",
    category: "Family",
    title: "In-laws and boundaries",
    why: "The rule that saves relationships: each partner manages their own family of origin. This conversation is for agreeing, as a couple, where the fence goes, so neither of you is defending the other's parents to each other.",
    opener: "“I want us to decide together where our boundaries are with our families, so it's never me against yours or you against mine.”",
    prompts: [
      "Where does my family cross a line for you, even a small one?",
      "When have you felt like I chose my family over you?",
      "What boundary do we need that we've been too conflict-averse to set?",
      "How do you want me to back you up in the moment, in front of them?",
    ],
  },

  // --- The Future ---
  {
    id: "dreams-within-conflict",
    category: "The Future",
    title: "The dream inside the gridlock",
    why: "Some problems never resolve because they aren't problems: they're two life dreams in a standoff (the move, the career, another child, retirement). You don't break gridlock by winning. You break it by finally hearing the dream inside the other position.",
    opener: "“We keep having the same fight. I don't want to win it anymore. I want to understand what it's really about for you.”",
    prompts: [
      "What does your position in our stuck argument protect or promise you?",
      "Is there a story from your life underneath it, something this connects to?",
      "What part of my dream can you honor even if you can't join all of it?",
      "What would a version of this we both could live with look like?",
    ],
  },

  // --- Repair ---
  {
    id: "unfinished-fight",
    category: "Repair",
    title: "A fight we never finished",
    why: "Unprocessed fights don't dissolve; they compost into resentment. This is a structured autopsy: no re-litigating who was right. Each of you describes your own reality, and both realities get to be true.",
    opener: "“That fight from before is still sitting in me. Can we look at it calmly, not to reopen it, to actually close it?”",
    prompts: [
      "What were you feeling in that fight that you never actually said?",
      "What did you need in that moment that you didn't get?",
      "What's the story you told yourself about what I meant?",
      "What could each of us do differently at the exact moment it started going wrong?",
      "What do you need now to genuinely leave it behind?",
    ],
  },
  {
    id: "argue-needs",
    category: "Repair",
    title: "What I need when we argue",
    why: "Couples rarely fight about the fight, but how you argue predicts more than what you argue about. This conversation writes your shared rules of engagement while you're calm enough to mean them.",
    opener: "“I want to talk about how we fight (not any particular fight) so the next one does less damage.”",
    prompts: [
      "What do I do mid-argument that makes it instantly worse for you?",
      "When you go quiet (or get loud), what's actually happening inside?",
      "What's a signal we could agree on that means 'I need a break, I'm not leaving'?",
      "How do you know a fight is over? What tells you we're okay again?",
      "What does a good apology from me actually sound like?",
    ],
  },
];

export const topicCategories = [...new Set(topics.map((t) => t.category))];

export function getTopic(id: string): Topic | undefined {
  return topics.find((t) => t.id === id);
}

/**
 * Daily question for shared spaces.
 *
 * Both partners see the same question each day and answer from their own
 * phone, in their own time. One answer stays hidden until the other is
 * written, so nobody is reacting to their partner; they are just answering.
 * Every question here works alone: no partner in the room required, nothing
 * that only makes sense in year one or year thirty, nothing that assumes the
 * marriage is thriving or assumes it is on fire.
 */
import { extraDailyQuestions } from "./daily-rel";

export type DailyCategory =
  | "appreciation"
  | "noticing"
  | "memory"
  | "curiosity"
  | "desire"
  | "gratitude"
  | "repair"
  | "playful";

export type DailyQuestion = { text: string; category: DailyCategory };

export const dailyQuestions: DailyQuestion[] = [
  {
    text: "What is one thing your partner handled recently that made your life easier, even if you never said so out loud?",
    category: "appreciation",
  },
  {
    text: "What has been asking a lot of your partner lately, even if they have not complained about it?",
    category: "noticing",
  },
  {
    text: "What is a moment from early on when you first thought, this could really be something?",
    category: "memory",
  },
  {
    text: "What do you think your partner daydreams about when nobody needs anything from them?",
    category: "curiosity",
  },
  {
    text: "When did you last feel drawn to your partner, and what were they doing at the time?",
    category: "desire",
  },
  {
    text: "What is a completely ordinary part of your life together that you would grieve if it were gone?",
    category: "gratitude",
  },
  {
    text: "What is one moment this week when you were shorter or colder with your partner than they deserved?",
    category: "repair",
  },
  {
    text: "If your marriage had a theme song this week, what would it be and why?",
    category: "playful",
  },
  {
    text: "What has your partner given you that nobody else in your life ever has?",
    category: "gratitude",
  },
  {
    text: "What is an ordinary day from your life together that you still remember clearly, and why do you think it stuck?",
    category: "memory",
  },
  {
    text: "What is a quality of your partner’s that you would brag about to a stranger?",
    category: "appreciation",
  },
  {
    text: "What does your partner do, without even trying, that you still find attractive?",
    category: "desire",
  },
  {
    text: "What is one change you have noticed in your partner over the past few months, big or small?",
    category: "noticing",
  },
  {
    text: "What would your partner say is your most ridiculous strongly held opinion?",
    category: "playful",
  },
  {
    text: "If your partner could drop one obligation tomorrow with zero consequences, what do you think they would drop?",
    category: "curiosity",
  },
  {
    text: "What is something you have been meaning to say to your partner, kind or hard, that you keep putting off?",
    category: "repair",
  },
  {
    text: "What is a story from your relationship that you love retelling, even though your partner has heard it a hundred times?",
    category: "memory",
  },
  {
    text: "If a free weekend trip landed in your laps tomorrow, where do you hope the tickets say you are going?",
    category: "playful",
  },
  {
    text: "What is something about your home life you would not trade, even on the hard days?",
    category: "gratitude",
  },
  {
    text: "When did your partner last seem genuinely at ease, and what was happening around them?",
    category: "noticing",
  },
  {
    text: "When did your partner last surprise you in a good way, however small?",
    category: "appreciation",
  },
  {
    text: "What is something your partner knows a surprising amount about?",
    category: "curiosity",
  },
  {
    text: "What kind of affection from your partner lands deepest for you: words, touch, attention, or something else?",
    category: "desire",
  },
  {
    text: "When you are stressed, what do you do that makes things harder at home, honestly?",
    category: "repair",
  },
  {
    text: "If your partner were an animal today, which one would they be, and what is that animal up to?",
    category: "playful",
  },
  {
    text: "What is one small way you could show up better tomorrow, without being asked?",
    category: "repair",
  },
  {
    text: "What is something your partner does for your shared life that would be missed within a week if they stopped?",
    category: "appreciation",
  },
  {
    text: "What is a hard stretch you got through together that you are quietly proud of now?",
    category: "memory",
  },
  {
    text: "What is one small moment of closeness you would want more of: a longer hug at the door, a hand on your back, sitting close on the couch?",
    category: "desire",
  },
  {
    text: "What do you think drained your partner the most this week?",
    category: "noticing",
  },
  {
    text: "What is one way this marriage has made you better than you were before it?",
    category: "gratitude",
  },
  {
    text: "What do you think was your partner’s favorite part of the past year?",
    category: "curiosity",
  },
  {
    text: "What is something your partner has been working hard at that probably feels invisible to them?",
    category: "noticing",
  },
  {
    text: "What is a moment from your relationship, recent or old, when the spark between you felt completely alive?",
    category: "desire",
  },
  {
    text: "What is one thing your partner does that you find secretly funny and have never admitted to?",
    category: "playful",
  },
  {
    text: "Where were you when you realized you loved them, and what tipped you over?",
    category: "memory",
  },
  {
    text: "What is a small apology you owe your partner that you could actually say out loud this week?",
    category: "repair",
  },
  {
    text: "What is one thing you take for granted about your partner that deserves a thank you it rarely gets?",
    category: "gratitude",
  },
  {
    text: "What is something your partner said recently that stuck with you longer than they probably realize?",
    category: "appreciation",
  },
  {
    text: "If your partner got a whole afternoon alone with no plans, how do you think they would really spend it?",
    category: "curiosity",
  },
  {
    text: "What has this marriage carried you through that you might not have made it through alone?",
    category: "gratitude",
  },
  {
    text: "If the two of you opened a tiny shop together, what would it sell and who would do what?",
    category: "playful",
  },
  {
    text: "What made your partner impossible to ignore when you first met, and where do you still catch glimpses of it?",
    category: "desire",
  },
  {
    text: "What does your partner do better than almost anyone else you know?",
    category: "appreciation",
  },
  {
    text: "What is a trip or day out you took together that you would happily repeat exactly as it was?",
    category: "memory",
  },
  {
    text: "What do you think your partner worries about more than they let on?",
    category: "curiosity",
  },
  {
    text: "What mood has your partner been carrying lately, and what do you think is underneath it?",
    category: "noticing",
  },
  {
    text: "Where has your best energy been going lately, and how much of it has been reaching your partner?",
    category: "repair",
  },
  {
    text: "What is a question you have been meaning to ask your partner and keep forgetting to?",
    category: "curiosity",
  },
  {
    text: "What sound, smell, or small scene from your life together are you grateful for today?",
    category: "gratitude",
  },
  {
    text: "What is a small ritual the two of you used to have that you would take back in a heartbeat?",
    category: "memory",
  },
  {
    text: "Which emoji sums up your week, and would your partner pick the same one for you?",
    category: "playful",
  },
  {
    text: "What is a small thing your partner does when they are stressed that most people would never catch?",
    category: "noticing",
  },
  {
    text: "What would make you feel chosen this week, in one small and concrete way?",
    category: "desire",
  },
  {
    text: "What small habit of your partner’s quietly makes your days run smoother?",
    category: "appreciation",
  },
  {
    text: "What is one habit of yours you would soften if you could watch it from your partner’s side of the room?",
    category: "repair",
  },
];

// Questions that work for every relationship type, not just marriages.
// Idempotent so a hot-reload / double module eval cannot duplicate them.
for (const q of extraDailyQuestions) {
  if (!dailyQuestions.some((x) => x.text === q.text)) dailyQuestions.push(q);
}

export function questionForDate(date: Date): DailyQuestion {
  const start = Date.UTC(date.getFullYear(), 0, 0);
  const day = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - start) / 86400000);
  return dailyQuestions[day % dailyQuestions.length];
}

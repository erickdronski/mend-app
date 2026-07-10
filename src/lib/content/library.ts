/**
 * The library: real books, real free resources, real podcasts.
 *
 * Every item here was verified to exist, in print or online, with correct
 * attribution, before it was written down. Nothing is invented. If a couple
 * can't afford therapy, this page is the next best door.
 */

export type Book = {
  title: string;
  author: string;
  forWhom: string;
  why: string;
};

export const books: Book[] = [
  {
    title: "The Seven Principles for Making Marriage Work",
    author: "John Gottman and Nan Silver",
    forWhom:
      "The couple that wants one place to start. Also for the practical partner who trusts research more than feelings talk.",
    why: "Built on decades of watching real couples in a lab, it turns what actually predicts lasting marriages into plain exercises. You can read one chapter and have something to do that same night.",
  },
  {
    title: "Hold Me Tight",
    author: "Sue Johnson",
    forWhom:
      "Couples stuck in the same fight on repeat: one pushes, one pulls away, and it never resolves.",
    why: "Johnson, who developed Emotionally Focused Therapy, shows that most recurring fights are protests about disconnection, not about the dishes. The book walks you through seven structured conversations you can have at home.",
  },
  {
    title: "After the Affair",
    author: "Janis Abrahms Spring",
    forWhom:
      "Couples deciding whether, and how, to stay together after infidelity. Written for both the hurt partner and the one who strayed.",
    why: "A clinical psychologist's steady, unflinching guide through the first shock, the decision to recommit or not, and the slow mechanics of rebuilding trust. No shaming, no easy promises.",
  },
  {
    title: "Attached",
    author: "Amir Levine and Rachel Heller",
    forWhom:
      "The chaser and the avoider. If one of you needs closeness to calm down and the other needs space, this is your book.",
    why: "Explains attachment styles in ordinary language, so the pursue-and-withdraw loop stops looking like a character flaw and starts looking like two nervous systems doing what they learned. Naming it changes it.",
  },
  {
    title: "Nonviolent Communication",
    author: "Marshall Rosenberg",
    forWhom:
      "Anyone whose words come out sharper than they mean, and anyone married to them.",
    why: "Rosenberg's four-step structure (what happened, what you feel, what you need, what you're asking for) gives hard conversations rails to run on. Especially useful if talking about feelings doesn't come naturally to you.",
  },
  {
    title: "Fighting for Your Marriage",
    author: "Howard Markman, Scott Stanley, and Susan Blumberg",
    forWhom:
      "Skills-first couples. If being told to open up makes one of you shut down, start here instead.",
    why: "From the researchers behind the PREP program, this is closer to a training manual than a therapy book: concrete rules for fighting fair, taking breaks, and protecting the good parts of the marriage from the arguments.",
  },
  {
    title: "And Baby Makes Three",
    author: "John Gottman and Julie Schwartz Gottman",
    forWhom: "New parents who love the baby and can barely stand each other.",
    why: "The Gottmans studied couples through the arrival of a first child and found most marriages take a real hit. This is the practical plan for staying friends, splitting the load, and finding your way back to each other.",
  },
  {
    title: "It's OK That You're Not OK",
    author: "Megan Devine",
    forWhom:
      "A marriage carrying a loss: a death in the family, a pregnancy that ended, a future that isn't coming. Also for the partner who doesn't know what to say.",
    why: "Devine writes about grief without trying to fix it, which is exactly what a grieving spouse needs from you. It teaches the supporting partner how to stop cheering up and start showing up.",
  },
  {
    title: "Come As You Are",
    author: "Emily Nagoski",
    forWhom:
      "Couples where desire has gone quiet and one or both of you have started taking it personally.",
    why: "Nagoski, a sex educator with a doctorate in health behavior, explains how stress, context, and self-image shape desire, especially for women. It replaces “what's wrong with me” with “here's how this actually works.”",
  },
  {
    title: "The Body Keeps the Score",
    author: "Bessel van der Kolk",
    forWhom:
      "When one partner's past (a hard childhood, violence, combat, abuse) keeps walking into the marriage uninvited.",
    why: "Describes how trauma lives in the body and shapes reactions that can look, from the outside, like coldness or rage. It builds compassion for responses neither of you chose. Heavy reading; take it slowly.",
  },
];

export type FreeResource = {
  name: string;
  what: string;
  url: string;
};

export const freeResources: FreeResource[] = [
  {
    name: "Gottman Card Decks (app)",
    what: "A free phone app from The Gottman Institute with decks of conversation starters and question cards. Good for couples who go blank when told to just talk: pick a card, read it, answer it.",
    url: "https://www.gottman.com/couples/apps/",
  },
  {
    name: "OurRelationship",
    what: "An online program for couples built from Integrative Behavioral Couple Therapy research. You work through short activities alone and together, at home, on your own schedule. Grant funding makes it free or low cost for many couples.",
    url: "https://www.ourrelationship.com",
  },
  {
    name: "Open Path Psychotherapy Collective",
    what: "A nonprofit that matches people without good insurance to licensed therapists, including couples therapists, at steeply reduced session rates after a one-time membership fee.",
    url: "https://openpathcollective.org",
  },
  {
    name: "AAMFT Therapist Locator",
    what: "The public directory of the American Association for Marriage and Family Therapy. Search by location to find a licensed marriage and family therapist near you.",
    url: "https://www.therapistlocator.net",
  },
  {
    name: "988 Suicide and Crisis Lifeline",
    what: "Free, confidential support around the clock in the United States. Call or text 988, or chat on the website. For any moment that feels bigger than a marriage problem, for you or for your partner.",
    url: "https://988lifeline.org",
  },
  {
    name: "National Domestic Violence Hotline",
    what: "If anything in your marriage frightens you, this is the place to start, not a communication exercise. Call 1-800-799-7233, text START to 88788, or chat on the site. Free, confidential, always open.",
    url: "https://www.thehotline.org",
  },
  {
    name: "Find a Helpline",
    what: "A directory of verified crisis and support lines around the world. If you're outside the United States, this finds the right number where you live.",
    url: "https://findahelpline.com",
  },
];

export type Podcast = {
  name: string;
  hosts: string;
  why: string;
};

export const podcasts: Podcast[] = [
  {
    name: "Where Should We Begin?",
    hosts: "Esther Perel",
    why: "You sit in on real, anonymous couples therapy sessions. Hearing strangers wrestle with infidelity, distance, and desire makes your own mess feel less shameful, and Perel's questions are ones you can borrow.",
  },
  {
    name: "Small Things Often",
    hosts: "The Gottman Institute",
    why: "Episodes about five minutes long, each with one research-backed thing to try. No homework guilt, no hour-long commitment. Good for the partner who won't sit through a feelings podcast but will spare five minutes.",
  },
  {
    name: "Marriage Therapy Radio",
    hosts: "Zach Brittle and Laura Heck",
    why: "Two working marriage therapists talk plainly about the stuff couples actually fight over: money, sex, in-laws, chores. It feels like overhearing good advice rather than being lectured.",
  },
  {
    name: "Foreplay Radio (Couples and Sex Therapy)",
    hosts: "Laurie Watson and George Faller",
    why: "A sex therapist and a couples therapist take on desire, rejection, and the conversations most couples avoid. The show was recently renamed Brave Love Great Sex; the back catalog lives under the original name.",
  },
];

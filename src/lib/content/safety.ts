/**
 * Crisis and professional-help resources. All real, verified, long-standing
 * services. Descriptions kept general so details don't go stale. US-first
 * with an international catch-all.
 */

export type Resource = {
  name: string;
  contact: string;
  url?: string;
  body: string;
};

export const crisisResources: Resource[] = [
  {
    name: "National Domestic Violence Hotline",
    contact: "Call 1-800-799-7233 · text START to 88788",
    url: "https://www.thehotline.org",
    body: "24/7, free, confidential. If there is violence, fear, or control in your relationship, even if you're not sure it 'counts', start here. Advocates help you think, plan, and stay safe; nothing is decided for you.",
  },
  {
    name: "988 Suicide & Crisis Lifeline",
    contact: "Call or text 988",
    url: "https://988lifeline.org",
    body: "24/7, free. For any mental-health crisis: thoughts of self-harm, overwhelming despair, or fear for a loved one. You don't need to be suicidal to call; you need to be struggling.",
  },
  {
    name: "Crisis Text Line",
    contact: "Text HOME to 741741",
    url: "https://www.crisistextline.org",
    body: "24/7 crisis support over text, for when talking out loud isn't possible or safe.",
  },
  {
    name: "Outside the US",
    contact: "findahelpline.com",
    url: "https://findahelpline.com",
    body: "A verified directory of free crisis lines by country.",
  },
];

export const therapyResources: Resource[] = [
  {
    name: "AAMFT Therapist Locator",
    contact: "therapistlocator.net",
    url: "https://www.therapistlocator.net",
    body: "The American Association for Marriage and Family Therapy's directory of licensed marriage and family therapists, the specialists in exactly this work.",
  },
  {
    name: "Open Path Psychotherapy Collective",
    contact: "openpathcollective.org",
    url: "https://openpathcollective.org",
    body: "A nonprofit network of therapists offering sessions at steeply reduced rates for people without adequate insurance coverage.",
  },
  {
    name: "Community & training clinics",
    contact: "Search: “[your city] community mental health” / “university counseling clinic”",
    body: "University training clinics (supervised graduate therapists) and community mental-health centers offer sliding-scale couples counseling, often a fraction of private-practice rates.",
  },
  {
    name: "Employer EAP",
    contact: "Ask HR or check your benefits portal",
    body: "Many employers include an Employee Assistance Program: a set number of free counseling sessions per year, including couples counseling. Confidential from your employer. Most people never use them.",
  },
];

export const whyGateMatters =
  "Guided couple conversations assume both partners are safe to be honest with each other. In relationships with violence, threats, or coercive control, that assumption fails: 'communication exercises' can give an abusive partner material and make things more dangerous. This isn't about your relationship being 'bad enough'; it's about the right tool. If any of this rings true, please start with the hotline. It's free, confidential, and staffed by people who will help you think it through. Nobody there will tell you to leave or to stay: that stays your call.";

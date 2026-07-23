/**
 * Rituals of connection (chooseable, recurring) and daily nudges: small,
 * concrete acts of repair. The daily nudge rotates deterministically by date.
 */

export type Ritual = {
  id: string;
  title: string;
  cadence: string;
  body: string;
};

export const rituals: Ritual[] = [
  {
    id: "daily-checkin",
    title: "The 10-minute check-in",
    cadence: "Daily",
    body: "Ten minutes, phones down, about your days and your insides, not logistics, not the kids' schedule. The single highest-return ritual a strained relationship can adopt.",
  },
  {
    id: "six-second-kiss",
    title: "The six-second kiss",
    cadence: "Daily",
    body: "A kiss long enough to mean something: six seconds is deliberately too long to be a peck and long enough to interrupt autopilot. Once a day, no agenda attached.",
  },
  {
    id: "appreciation-text",
    title: "One specific appreciation",
    cadence: "Daily",
    body: "Text or say one specific thing you appreciated today. Specific beats sweet: 'thank you for handling bedtime when I hit a wall' lands harder than 'love you'.",
  },
  {
    id: "state-of-union",
    title: "State of the Union",
    cadence: "Weekly",
    body: "A standing 45-minute meeting for the relationship: what went well this week, what was hard (speaker-listener rules), and one thing each of you needs next week. Complaints go here instead of leaking all week.",
  },
  {
    id: "date-night",
    title: "A real date",
    cadence: "Weekly or biweekly",
    body: "Out of the house if possible, zero-dollar is fine, no phones at the table, and a rule: talk about anything except logistics, kids, and money.",
  },
  {
    id: "reunion-ritual",
    title: "The reunion hug",
    cadence: "Daily",
    body: "When you reunite at the end of the workday: a real hug before anything else: before the mail, the kids' forms, the 'we need to talk about the sink'. Bodies first, logistics second.",
  },
  {
    id: "phone-free-30",
    title: "Thirty phone-free minutes",
    cadence: "Daily",
    body: "One shared half-hour with phones in another room. Not necessarily deep conversation: presence. The phone in the room loses even when it's face down.",
  },
  {
    id: "gratitude-dinner",
    title: "Highs and lows at dinner",
    cadence: "Daily",
    body: "Each person's best and hardest moment of the day, around the table. Works with kids present, and teaches them the relationship they'll one day copy.",
  },
];

export const nudges: string[] = [
  "Text them one specific thing you appreciated about them this week. Specific beats sweet.",
  "Leave a sticky note somewhere they'll find it mid-task: the mirror, the laptop, the coffee maker.",
  "Write three sentences starting with “I still remember when…” and leave them on their pillow.",
  "Ask about the thing they mentioned worrying about last week. Remembering is romance.",
  "Take one task off their plate today without announcing it. Let them discover it done.",
  "Send the song that was playing when you fell for them. No caption needed.",
  "When they walk in today, stop what you're doing and greet them like you're glad. Because you are, under all of it.",
  "Ask: “What was the best part of your day?” And then ask a follow-up question.",
  "Give one six-second kiss today. Deliberately too long to be a peck.",
  "Tell them one thing they've been getting right lately. Struggling couples audit flaws; interrupt the audit.",
  "Bring them their drink of choice unprompted: coffee made the way they actually take it.",
  "Text them at a random hour: “thinking about you, no reason.” The no-reason is the point.",
  "Tonight, put your phone in another room for 30 minutes and just be wherever they are.",
  "Say thank you for something they do so reliably it's become invisible.",
  "Write down one memory from your best trip together and read it to them tonight.",
  "Ask them: “Is there anything you need from me this week that you haven't asked for?”",
  "Touch base with their body language today. If they look heavy, name it gently: “You seem tired. I've got dinner.”",
  "Compliment them on something other than usefulness: not what they did, who they are.",
  "Recreate one tiny thing from your dating days: the takeout order, the show, the walk.",
  "Before sleep tonight, say one sentence of appreciation out loud. End the day turned toward each other.",
  "Ask what they'd do with a totally free Saturday, then quietly make one piece of it happen.",
  "Apologize today for one small thing you've been silently defending. Just the small one. Watch what it unlocks.",
  "Hold their hand somewhere ordinary: the car console, the grocery aisle. Old moves still work.",
  "Tell them one way they've made you better. Be precise.",
];

/** Deterministic daily rotation: same nudge all day, changes at midnight. */
export function nudgeForDate(date: Date): string {
  const start = Date.UTC(date.getFullYear(), 0, 0);
  const day = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - start) / 86400000);
  return nudges[day % nudges.length];
}

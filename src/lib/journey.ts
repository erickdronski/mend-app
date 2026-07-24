/**
 * The Journey: Mend's spine. A staged, progressive program that takes a
 * relationship from its current season toward deeper connection, clearer communication,
 * and stronger shared habits without manufacturing dependence on the app.
 *
 * Stages gate on real, detectable work (sessions held, challenges finished,
 * both quizzes taken) plus a two-partner pulse check. Where the app can't
 * see the evidence, the couple marks the step honestly; the copy holds them
 * to it. Advancing is earned, never scheduled.
 */
import type { Profile, SessionRecord, Plan, PulseEntry, JourneyState } from "./store";

export type StepContext = {
  profile: Profile | null;
  sessions: SessionRecord[];
  plan: Plan;
  challengesDone: string[];
  pulses: PulseEntry[];
};

export type JourneyStep = {
  id: string;
  title: string;
  body: string;
  /** Where in the app this step happens */
  href: string;
  hrefLabel: string;
  /** Auto-detected from stored evidence; undefined = honor-system checkbox */
  auto?: (ctx: StepContext) => boolean;
};

export type Stage = {
  n: number;
  title: string;
  arc: string;
  weeksHint: string;
  why: string;
  steps: JourneyStep[];
};

const sessionHeld = (ctx: StepContext, titlePart: string) =>
  ctx.sessions.some((s) => s.topicTitle.toLowerCase().includes(titlePart.toLowerCase()));

const bothPulsed = (ctx: StepContext, stage: number) =>
  ctx.pulses.some((p) => p.stage === stage && p.who === 0) &&
  ctx.pulses.some((p) => p.stage === stage && p.who === 1);

// Stage 1 is the "one willing person can begin" stage: a single baseline pulse
// completes it. Deeper stages still need both partners on the record.
const onePulsed = (ctx: StepContext, stage: number) =>
  ctx.pulses.some((p) => p.stage === stage);

export const PULSE_QUESTIONS = [
  "I felt heard by my partner this week.",
  "We handled problems as teammates, not opponents.",
  "There was real warmth or affection between us.",
  "When something went wrong between us, we recovered.",
  "I feel hopeful about where we're headed.",
];

export const stages: Stage[] = [
  {
    n: 1,
    title: "Make room for each other",
    arc: "Slow down, pay attention, and create ten good minutes together.",
    weeksHint: "Usually 1 to 2 weeks",
    why: "Connection needs room. Stage one starts with simple proof that the two of you can pause, listen, and share ten intentional minutes without solving everything. Those small moments create the foundation for every deeper conversation that follows.",
    steps: [
      {
        id: "s1-pulse",
        title: "Take your baseline pulse",
        body: "Five statements, rated honestly. This is a simple starting point, not a score. If your partner isn't here yet, take yours alone; theirs can join later.",
        href: "/pulse",
        hrefLabel: "Take the pulse check",
        auto: (ctx) => onePulsed(ctx, 1),
      },
      {
        id: "s1-deck",
        title: "One round of the First Steps deck",
        body: "Ten minutes of the gentlest questions in the app. Nothing vulnerable, nothing loaded. Anyone may pass any card. The goal isn't depth; it's remembering that talking to each other can be easy.",
        href: "/cards",
        hrefLabel: "Open the deck",
      },
      {
        id: "s1-session",
        title: "Hold your first session: the stress that isn't about us",
        body: "Your first timed floor, on the one topic where you fix nothing and defend nothing, because it isn't about the relationship. Each of you gets protected minutes to unload about the outside world while the other only listens.",
        href: "/talk?topic=outside-stress",
        hrefLabel: "Sit down together",
        auto: (ctx) => sessionHeld(ctx, "stress that isn't"),
      },
      {
        id: "s1-micro",
        title: "Three micro-moves, any three days",
        body: "One-sentence acts of goodwill: the reunion hug, the specific thank-you, the coffee made right. Quiet deposits. Don't announce them; let them be noticed.",
        href: "/challenges",
        hrefLabel: "See the micro-moves",
      },
    ],
  },
  {
    n: 2,
    title: "Stay curious about each other",
    arc: "Replace assumptions with current information. Turn toward each other on purpose.",
    weeksHint: "Usually 3 to 4 weeks",
    why: "People keep changing, even inside long relationships. Stage two updates the map: how you each give and receive care, what pressure feels like lately, and what life looks like from the other person's side. Curiosity keeps closeness current.",
    steps: [
      {
        id: "s2-quiz",
        title: "Both take How you love & fight",
        body: "Twelve scenarios find your attachment lens; six find your role in the fight cycle. Then trade phones: each result ends with a section written to your partner, not to you. That trade is the point.",
        href: "/quiz",
        hrefLabel: "Take the quiz",
        auto: (ctx) => Boolean(ctx.profile?.lenses?.a && ctx.profile?.lenses?.b),
      },
      {
        id: "s2-toolkit",
        title: "Read two skills together: soft startup and flooding",
        body: "The two highest-leverage pages in the toolkit. One changes how conversations begin; the other gives you a shared escape hatch for when a nervous system maxes out. Read them aloud, trading paragraphs.",
        href: "/toolkit",
        hrefLabel: "Open the toolkit",
      },
      {
        id: "s2-session",
        title: "Hold the session: who you are these days",
        body: "The map-update conversation. Interview each other like you did when you were dating: current stresses, current dreams, what changed that the other might have missed.",
        href: "/talk?topic=love-maps",
        hrefLabel: "Sit down together",
        auto: (ctx) => sessionHeld(ctx, "who you are these days"),
      },
      {
        id: "s2-challenge",
        title: "Complete 7 Days of Turning Toward",
        body: "One small act a day: spotting your partner's little reaches for connection and answering them. This is the single habit research most consistently finds in couples who last.",
        href: "/challenges",
        hrefLabel: "Start the week",
        auto: (ctx) => ctx.challengesDone.includes("turning-toward"),
      },
      {
        id: "s2-game",
        title: "Play one round of Do you still know me?",
        body: "Seven questions each. The score is a joke; the misses are the gift. Each miss is a corner of your partner's world you get to visit again.",
        href: "/games",
        hrefLabel: "Play together",
      },
      {
        id: "s2-pulse",
        title: "Stage pulse, both of you",
        body: "Same five statements, honest and separate. You're looking for movement, not perfection.",
        href: "/pulse",
        hrefLabel: "Take the pulse check",
        auto: (ctx) => bothPulsed(ctx, 2),
      },
    ],
  },
  {
    n: 3,
    title: "Communicate through differences",
    arc: "Same two people, better patterns for disagreement, repair, and return.",
    weeksHint: "Usually 4 to 6 weeks",
    why: "Alignment does not mean agreeing about everything. What changes is the pattern: how a hard conversation starts, whether each person stays heard, how a pause works, and how you reconnect afterward. Stage three lets you practice those skills before the stakes are high.",
    steps: [
      {
        id: "s3-session-needs",
        title: "Hold the session: what I need when we argue",
        body: "The meta-conversation. Not any particular fight, but the rules of engagement: your break signal, your repair phrases, what a good apology actually sounds like to each of you.",
        href: "/talk?topic=argue-needs",
        hrefLabel: "Sit down together",
        auto: (ctx) => sessionHeld(ctx, "when we argue"),
      },
      {
        id: "s3-challenge",
        title: "Complete The Repair Week",
        body: "Seven days of softening the cycle: soft startups, catching repair attempts, one real break taken properly. Practice on small frictions so the machinery holds for the big ones.",
        href: "/challenges",
        hrefLabel: "Start the week",
        auto: (ctx) => ctx.challengesDone.includes("soft-repair"),
      },
      {
        id: "s3-session-unfinished",
        title: "Hold the session: a fight we never finished",
        body: "The structured autopsy of one old fight, with your new tools. No re-litigating who was right; each of you describes your own reality, and both get to be true. This is the stage's real exam.",
        href: "/talk?topic=unfinished-fight",
        hrefLabel: "Sit down together",
        auto: (ctx) => sessionHeld(ctx, "never finished"),
      },
      {
        id: "s3-deck",
        title: "One round of the Repair deck",
        body: "For a cold evening or the aftermath of a wobble: careful, de-escalating questions that let you approach each other again without a formal session.",
        href: "/cards",
        hrefLabel: "Open the deck",
      },
      {
        id: "s3-ritual",
        title: "Adopt the State of the Union ritual",
        body: "A standing weekly meeting for the relationship: what went well, what was hard (speaker-listener rules), what each of you needs next week. Complaints go here, instead of leaking all week.",
        href: "/plan",
        hrefLabel: "Adopt it in your plan",
        auto: (ctx) => ctx.plan.rituals.includes("state-of-union"),
      },
      {
        id: "s3-pulse",
        title: "Stage pulse, both of you",
        body: "Watch one number especially: 'when something went wrong between us, we recovered.' That's the one this stage exists to move.",
        href: "/pulse",
        hrefLabel: "Take the pulse check",
        auto: (ctx) => bothPulsed(ctx, 3),
      },
    ],
  },
  {
    n: 4,
    title: "Deepen trust and closeness",
    arc: "Warmth, affection, desire, and trust grow where attention goes.",
    weeksHint: "Usually 4 to 8 weeks",
    why: "A relationship can function well and still want more warmth, trust, affection, or shared meaning. Stage four turns toward those tender areas directly, while offering focused support when a heavier season is part of the picture.",
    steps: [
      {
        id: "s4-heavy",
        title: "Choose depth or focused support",
        body: "If your relationship is navigating an affair, loss, illness, money pressure, or another heavy season, open its focused track. If not, use the Go Deeper deck to learn something new about each other.",
        href: "/tracks",
        hrefLabel: "Find your track",
      },
      {
        id: "s4-session-affection",
        title: "Hold the session: affection and desire",
        body: "The conversation many partners avoid the longest. Soft startup is mandatory; the prompts carry you. Being wanted matters; this is where you talk about it out loud.",
        href: "/talk?topic=affection",
        hrefLabel: "Sit down together",
        auto: (ctx) => sessionHeld(ctx, "affection"),
      },
      {
        id: "s4-session-money",
        title: "Hold the session: what money meant growing up",
        body: "Money fights are two childhoods arguing. Meet each other's history before you renegotiate any budget; the budget conversation afterward is a different experience entirely.",
        href: "/talk?topic=money-history",
        hrefLabel: "Sit down together",
        auto: (ctx) => sessionHeld(ctx, "money meant"),
      },
      {
        id: "s4-challenge",
        title: "Complete The Appreciation Week",
        body: "Seven days of directing attention toward strengths, effort, and the small things that are easy to miss. What you notice more often becomes easier to appreciate out loud.",
        href: "/challenges",
        hrefLabel: "Start the week",
        auto: (ctx) => ctx.challengesDone.includes("appreciation"),
      },
      {
        id: "s4-notes",
        title: "Five love notes in two weeks",
        body: "The daily nudge gives you one concrete idea every day: the sticky note, the 'I still remember when…' on the pillow, the no-reason text. Do five. Small, frequent, real.",
        href: "/plan",
        hrefLabel: "See today's nudge",
      },
      {
        id: "s4-pulse",
        title: "Stage pulse, both of you",
        body: "The number to watch here: 'there was real warmth or affection between us.'",
        href: "/pulse",
        hrefLabel: "Take the pulse check",
        auto: (ctx) => bothPulsed(ctx, 4),
      },
    ],
  },
  {
    n: 5,
    title: "Build what comes next together",
    arc: "Turn connection into alignment, shared direction, and habits that last.",
    weeksHint: "Usually 4 weeks, then keep what works",
    why: "Connection grows stronger when it has somewhere to go. Stage five points forward: the dreams underneath recurring disagreements, the future you are shaping, and the rituals that keep you aligned as life changes. Mend should support the relationship, never become the relationship.",
    steps: [
      {
        id: "s5-session-gridlock",
        title: "Hold the session: the dream inside the gridlock",
        body: "Your most stuck, most repeated argument almost certainly hides two life dreams in a standoff. You don't break gridlock by winning; you break it by finally hearing the dream inside the other position.",
        href: "/talk?topic=dreams-within-conflict",
        hrefLabel: "Sit down together",
        auto: (ctx) => sessionHeld(ctx, "gridlock"),
      },
      {
        id: "s5-deck",
        title: "One round of the Dreams deck",
        body: "The future, asked about out loud: ambitions, adventures, what you're building this for. Partners who talk about the future have one.",
        href: "/cards",
        hrefLabel: "Open the deck",
      },
      {
        id: "s5-stories",
        title: "Read two stories that feel familiar",
        body: "Pick two composite stories with a dynamic you recognize and read them together. Notice the practices that helped those people understand each other and move differently.",
        href: "/stories",
        hrefLabel: "Read the stories",
      },
      {
        id: "s5-rituals",
        title: "Hold your rituals for four straight weeks",
        body: "Whatever you adopted (the check-in, the State of the Union, the six-second kiss), keep it for a month. The goal is not perfect consistency; it is learning which rituals genuinely help you stay connected.",
        href: "/plan",
        hrefLabel: "Review your rituals",
      },
      {
        id: "s5-pulse",
        title: "The final pulse, both of you",
        body: "The 'after' photo. Compare it to your baseline from stage one; that distance is yours, and nobody can take it back.",
        href: "/pulse",
        hrefLabel: "Take the pulse check",
        auto: (ctx) => bothPulsed(ctx, 5),
      },
    ],
  },
];

export function getStage(n: number): Stage | undefined {
  return stages.find((s) => s.n === n);
}

export function stepDone(step: JourneyStep, ctx: StepContext, journey: JourneyState): boolean {
  if (journey.doneSteps.includes(step.id)) return true;
  return step.auto ? step.auto(ctx) : false;
}

export function stageComplete(stage: Stage, ctx: StepContext, journey: JourneyState): boolean {
  return stage.steps.every((s) => stepDone(s, ctx, journey));
}

/** Average pulse for a stage, per partner. Null if that partner hasn't pulsed. */
export function pulseAvg(pulses: PulseEntry[], stage: number, who: 0 | 1): number | null {
  const entry = [...pulses].reverse().find((p) => p.stage === stage && p.who === who);
  if (!entry) return null;
  return entry.scores.reduce((a, b) => a + b, 0) / entry.scores.length;
}

/**
 * Completion: stage 5 fully complete and both partners' final pulse averages
 * at 4 or above. If the work is done but the numbers aren't there, the app
 * says so honestly and suggests the right next move instead of a diploma.
 */
export function readyToComplete(ctx: StepContext, journey: JourneyState): boolean {
  const s5 = getStage(5)!;
  if (journey.stage < 5 || !stageComplete(s5, ctx, journey)) return false;
  const a = pulseAvg(ctx.pulses, 5, 0);
  const b = pulseAvg(ctx.pulses, 5, 1);
  return a !== null && b !== null && a >= 4 && b >= 4;
}

/** A pulse this low means the app should point at real humans, gently. */
export function pulseConcern(ctx: StepContext, stage: number): boolean {
  const a = pulseAvg(ctx.pulses, stage, 0);
  const b = pulseAvg(ctx.pulses, stage, 1);
  return (a !== null && a <= 2) || (b !== null && b <= 2);
}

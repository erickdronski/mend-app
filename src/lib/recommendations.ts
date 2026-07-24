import type { Ionicons } from "@expo/vector-icons";
import type { StepContext } from "./journey";
import type { JourneyState, RecommendationOpen } from "./store";
import { getSituation, type Situation } from "./situation";
import type { Hue } from "./theme";

export type RecommendationKind = "talk" | "play" | "practice" | "learn" | "reflect" | "support";

export type Recommendation = {
  id: string;
  title: string;
  body: string;
  fit: string;
  href: string;
  label: string;
  meta: string;
  kind: RecommendationKind;
  hue: Hue;
  icon: keyof typeof Ionicons.glyphMap;
};

type Candidate = Omit<Recommendation, "fit"> & {
  stages?: number[];
  situations?: Situation[];
  completed?: (ctx: StepContext) => boolean;
};

const candidates: Candidate[] = [
  {
    id: "talk-outside-stress",
    title: "Unload the stress that is not about us",
    body: "Take turns listening without fixing. Mend keeps the floor balanced.",
    href: "/talk?topic=outside-stress",
    label: "Start the conversation",
    meta: "15 min · guided",
    kind: "talk",
    hue: "moss",
    icon: "ear-outline",
    stages: [1, 2],
    completed: (ctx) => ctx.sessions.some((session) => session.topicTitle.toLowerCase().includes("stress that isn't")),
  },
  {
    id: "talk-love-maps",
    title: "Meet who your partner is these days",
    body: "Update your map of their current pressures, hopes, and inner world.",
    href: "/talk?topic=love-maps",
    label: "Talk together",
    meta: "20 min · curious",
    kind: "talk",
    hue: "moss",
    icon: "chatbubbles-outline",
    stages: [1, 2],
    situations: ["drift", "just-us"],
    completed: (ctx) => ctx.sessions.some((session) => session.topicTitle.toLowerCase().includes("who you are these days")),
  },
  {
    id: "talk-appreciation",
    title: "Name what you still admire",
    body: "A warm conversation that retrains attention toward what is good and real.",
    href: "/talk?topic=appreciation",
    label: "Make room for this",
    meta: "15 min · warm",
    kind: "talk",
    hue: "rose",
    icon: "heart-outline",
    stages: [1, 2, 4],
    situations: ["drift", "just-us", "baby", "illness"],
  },
  {
    id: "talk-invisible-work",
    title: "Make the invisible workload visible",
    body: "Turn hidden noticing and resentment into specific support you can share.",
    href: "/talk?topic=invisible-workload",
    label: "Talk as a team",
    meta: "20 min · practical",
    kind: "talk",
    hue: "moss",
    icon: "list-outline",
    stages: [2, 3],
    situations: ["baby", "money", "illness", "blended"],
  },
  {
    id: "talk-argue-needs",
    title: "Agree on what helps during conflict",
    body: "Choose break signals, repair phrases, and what a useful apology sounds like.",
    href: "/talk?topic=argue-needs",
    label: "Build your rules",
    meta: "20 min · repair",
    kind: "talk",
    hue: "ember",
    icon: "bandage-outline",
    stages: [3],
    situations: ["affair", "blended", "faith"],
  },
  {
    id: "talk-dreams",
    title: "Put your shared future back in view",
    body: "Talk about the dreams underneath decisions, tension, and everyday logistics.",
    href: "/talk?topic=dreams-within-conflict",
    label: "Look forward together",
    meta: "20 min · meaningful",
    kind: "talk",
    hue: "sky",
    icon: "compass-outline",
    stages: [4, 5],
    situations: ["just-us", "drift", "faith"],
  },
  {
    id: "cards-first-steps",
    title: "Draw a few low-pressure questions",
    body: "The First Steps deck makes connecting easy when a full conversation feels like too much.",
    href: "/cards?deck=first-steps",
    label: "Draw a card",
    meta: "5 min · easy",
    kind: "play",
    hue: "honey",
    icon: "albums-outline",
    stages: [1, 2],
    situations: ["baby", "loss", "illness", "drift"],
  },
  {
    id: "games-light",
    title: "Learn something new through play",
    body: "Pick a light game and let curiosity do the work without making it serious.",
    href: "/games",
    label: "Choose a game",
    meta: "10 min · playful",
    kind: "play",
    hue: "honey",
    icon: "dice-outline",
    stages: [2, 4, 5],
    situations: ["just-us", "drift", "baby"],
  },
  {
    id: "challenge-week",
    title: "Practice one small move for seven days",
    body: "Choose a challenge that turns a useful relationship skill into daily life.",
    href: "/challenges",
    label: "Choose a challenge",
    meta: "2 min a day · practice",
    kind: "practice",
    hue: "honey",
    icon: "calendar-outline",
    stages: [1, 2, 3],
  },
  {
    id: "plan-ritual",
    title: "Choose one ritual worth protecting",
    body: "Put a repeatable moment of connection into your shared plan.",
    href: "/plan",
    label: "Build your plan",
    meta: "5 min · lasting",
    kind: "practice",
    hue: "rose",
    icon: "repeat-outline",
    stages: [3, 4, 5],
    completed: (ctx) => ctx.plan.rituals.length > 0,
  },
  {
    id: "learn-toolkit",
    title: "Add one communication skill",
    body: "Read a short, practical guide and try its exact language the next time it matters.",
    href: "/toolkit",
    label: "Open the toolkit",
    meta: "5 min · skill",
    kind: "learn",
    hue: "sky",
    icon: "construct-outline",
    stages: [2, 3],
  },
  {
    id: "reflect-pulse",
    title: "Notice what is changing",
    body: "Take the five-question pulse separately and look for movement, not perfection.",
    href: "/pulse",
    label: "Take a pulse",
    meta: "3 min each · private",
    kind: "reflect",
    hue: "ember",
    icon: "pulse-outline",
    stages: [1, 2, 3, 4, 5],
    completed: (ctx) => ctx.pulses.length > 0,
  },
  {
    id: "learn-stories",
    title: "See how another relationship shifted",
    body: "Read a short, realistic dynamic and the specific turn that helped.",
    href: "/stories",
    label: "Read a story",
    meta: "4 min · perspective",
    kind: "learn",
    hue: "sky",
    icon: "people-outline",
    stages: [2, 3, 4, 5],
  },
  {
    id: "learn-mend-notes",
    title: "Turn one research finding into practice",
    body: "Read a careful two-minute note, then try the concrete move attached to it.",
    href: "/insights",
    label: "Open Mend Notes",
    meta: "2 min · evidence",
    kind: "learn",
    hue: "sky",
    icon: "newspaper-outline",
    stages: [1, 2, 3, 4, 5],
  },
];

function dayNumber(date: Date): number {
  return Math.floor(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 86_400_000);
}

function stableJitter(id: string, day: number): number {
  let hash = day;
  for (let i = 0; i < id.length; i += 1) hash = (hash * 31 + id.charCodeAt(i)) | 0;
  return Math.abs(hash % 23);
}

function openedRecently(history: RecommendationOpen[], id: string, date: Date): boolean {
  const opened = history.find((item) => item.id === id);
  if (!opened) return false;
  return date.getTime() - new Date(opened.openedAt).getTime() < 14 * 86_400_000;
}

function fitFor(candidate: Candidate, ctx: StepContext, journey: JourneyState): string {
  const situation = ctx.profile?.situation;
  if (situation && candidate.situations?.includes(situation)) {
    return "Chosen for what you told Mend would help right now.";
  }
  if (candidate.stages?.includes(Math.min(journey.stage, 5))) {
    return `Builds the skills in chapter ${Math.min(journey.stage, 5)} of your journey.`;
  }
  return "A fresh way to connect without adding pressure.";
}

export function getRecommendations(
  ctx: StepContext,
  journey: JourneyState,
  history: RecommendationOpen[] = [],
  date = new Date(),
  count = 3,
): Recommendation[] {
  const stage = Math.min(journey.stage, 5);
  const situation = ctx.profile?.situation;
  const day = dayNumber(date);
  const pool: Candidate[] = [...candidates];
  const situationDef = getSituation(situation);

  if (situationDef?.track) {
    pool.push({
      id: `support-${situationDef.track}`,
      title: situationDef.trackTitle,
      body: "A focused, ordered path for the season your relationship is navigating.",
      href: `/tracks/${situationDef.track}`,
      label: "Open focused support",
      meta: "At your pace · focused",
      kind: "support",
      hue: "plum",
      icon: situationDef.icon,
      situations: [situationDef.id],
    });
  }

  const ranked = pool
    .map((candidate) => {
      let score = stableJitter(candidate.id, day);
      if (candidate.stages?.includes(stage)) score += 28;
      if (situation && candidate.situations?.includes(situation)) score += 44;
      if (candidate.completed?.(ctx)) score -= 32;
      if (openedRecently(history, candidate.id, date)) score -= 100;
      return { candidate, score };
    })
    .sort((a, b) => b.score - a.score || a.candidate.id.localeCompare(b.candidate.id));

  const selected: Candidate[] = [];
  for (const { candidate } of ranked) {
    if (selected.some((item) => item.kind === candidate.kind)) continue;
    selected.push(candidate);
    if (selected.length === count) break;
  }
  if (selected.length < count) {
    for (const { candidate } of ranked) {
      if (selected.includes(candidate)) continue;
      selected.push(candidate);
      if (selected.length >= count) break;
    }
  }

  return selected.slice(0, count).map((candidate) => ({
    id: candidate.id,
    title: candidate.title,
    body: candidate.body,
    fit: fitFor(candidate, ctx, journey),
    href: candidate.href,
    label: candidate.label,
    meta: candidate.meta,
    kind: candidate.kind,
    hue: candidate.hue,
    icon: candidate.icon,
  }));
}

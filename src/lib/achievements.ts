/**
 * The achievements engine: turns stored evidence into earned milestones.
 *
 * The ethical rules from docs/research/gamification.md are enforced HERE, in
 * code, not just in the copy:
 *
 * 1. Achievements celebrate EFFORT and SKILL PRACTICE, never relationship
 *    quality. Nothing in this file reads a pulse SCORE to decide whether an
 *    achievement was earned. Answering honestly earns it; the number does not.
 * 2. Nothing can be lost. Earned is permanent and monotonic: once true, always
 *    true, so a bad week never takes something away.
 * 3. Partners are never compared or ranked. Nothing here reports who did more.
 * 4. Missing a day is never punished. There are no fragile streaks.
 *
 * Detection is deliberately generous. When the evidence is ambiguous we do NOT
 * award (a hollow badge is worse than none), but we never require perfection.
 * Honor-system achievements are claimed explicitly by the user instead.
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { achievements, type Achievement } from "./content/achievements";
import { tracks } from "./content/tracks";
import type { JourneyState, PulseEntry, SessionRecord, Plan, Profile } from "./store";

const EARNED_KEY = "mend.achievements";
const CLAIMED_KEY = "mend.achievements.claimed";

export type EarnedMap = Record<string, string>; // id -> ISO date first earned

export type AchievementContext = {
  profile: Profile | null;
  sessions: SessionRecord[];
  plan: Plan;
  challengesDone: string[];
  pulses: PulseEntry[];
  journey: JourneyState;
  /** Days this device has answered the daily question (local or in a space). */
  dailyAnswers: number;
  /** True once both partners are in the shared space. */
  bothInSpace: boolean;
  /** Days where both partners answered the daily question. */
  daysBoth: number;
  /** Honor-system achievements the user has claimed. */
  claimed: string[];
};

/** Whole days between the first stored evidence and now. */
function daysSince(iso?: string): number {
  if (!iso) return 0;
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return 0;
  return Math.max(0, Math.floor((Date.now() - then) / 86400000));
}

const sessionCount = (c: AchievementContext) => c.sessions.length;

/**
 * Rules for the achievements the app can detect on its own. Anything not
 * listed here is honor-system: the user claims it from the achievements
 * screen after doing it in real life, which is the only honest way to know
 * that a repair attempt actually landed.
 */
const RULES: Record<string, (c: AchievementContext) => boolean> = {
  // ---- first: showing up
  "first-step": (c) => Boolean(c.profile),
  "first-answer": (c) => c.dailyAnswers >= 1,
  "first-session": (c) => sessionCount(c) >= 1,
  // Taking the pulse at all earns this. The SCORE is never a condition.
  "first-pulse": (c) => c.pulses.length >= 1,
  "first-quiz": (c) => Boolean(c.profile?.lenses?.a || c.profile?.lenses?.b),
  "first-week": (c) => daysSince(c.profile?.createdAt) >= 7,
  "both-joined": (c) => c.bothInSpace,
  "both-quiz": (c) => Boolean(c.profile?.lenses?.a && c.profile?.lenses?.b),

  // ---- building: the work itself
  // NOTE: "called-break" is deliberately NOT here. Calling a break lives
  // entirely in the session wizard's local state and is never written to
  // storage, so there is no evidence to read. A rule that can never be true
  // would be worse than none, because isAutoDetected() would then hide the
  // "We did this" button and make the achievement permanently unreachable.
  // It is honor-system, like every other move the app genuinely cannot see.
  "came-back-to-it": (c) => sessionCount(c) >= 2,
  "ten-yeses": (c) => c.dailyAnswers >= 10,
  // Counting pulses, never reading one. The score is never a condition here;
  // see rule 1 at the top of this file.
  "told-truth-pulse": (c) => c.pulses.length >= 2,
  // The session wizard records a track session as "<track title>: <session
  // title>", so match the real track titles. The literal word "track" never
  // appears in a recorded title, and no journey step id starts with "track-".
  "track-session": (c) =>
    c.sessions.some((s) => tracks.some((t) => (s.topicTitle || "").startsWith(`${t.title}: `))),
  "four-weeks-in": (c) => daysSince(c.profile?.createdAt) >= 28,
  "sixty-six-days": (c) => daysSince(c.profile?.createdAt) >= 66,
  "four-weeks-ritual": (c) => c.plan.rituals.length >= 1 && daysSince(c.profile?.createdAt) >= 28,
  "both-directions": (c) => c.daysBoth >= 5,

  // ---- deep: sustained, two-sided work
  "stayed-in-room": (c) => sessionCount(c) >= 5,
  "fight-autopsy": (c) => c.challengesDone.includes("clean-fight") || c.challengesDone.includes("soft-repair"),
};

/** Compute which achievements are earned right now, ignoring history. */
export function computeEarned(c: AchievementContext): string[] {
  const out: string[] = [];
  for (const a of achievements) {
    if (c.claimed.includes(a.id)) {
      out.push(a.id);
      continue;
    }
    const rule = RULES[a.id];
    if (rule && safeRule(rule, c)) out.push(a.id);
  }
  return out;
}

/** A broken rule must never crash the app or block an achievement screen. */
function safeRule(rule: (c: AchievementContext) => boolean, c: AchievementContext): boolean {
  try {
    return rule(c);
  } catch {
    return false;
  }
}

export async function getEarnedMap(): Promise<EarnedMap> {
  try {
    const raw = await AsyncStorage.getItem(EARNED_KEY);
    return raw ? (JSON.parse(raw) as EarnedMap) : {};
  } catch {
    return {};
  }
}

export async function getClaimed(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(CLAIMED_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

/** Honor-system claim. Permanent, like every other achievement. */
export async function claim(id: string): Promise<void> {
  const claimed = await getClaimed();
  if (claimed.includes(id)) return;
  claimed.push(id);
  await AsyncStorage.setItem(CLAIMED_KEY, JSON.stringify(claimed));
}

/**
 * Reconcile computed achievements with what was already earned, and return
 * the ones that are NEW this run so the UI can celebrate them once.
 *
 * Monotonic by construction: this only ever ADDS to the earned map. An
 * achievement can never be revoked, so a hard week cannot take one back.
 */
export async function syncEarned(c: AchievementContext): Promise<{
  earned: EarnedMap;
  fresh: Achievement[];
}> {
  const earned = await getEarnedMap();
  const now = new Date().toISOString();
  const fresh: Achievement[] = [];
  for (const id of computeEarned(c)) {
    if (!earned[id]) {
      earned[id] = now;
      const def = achievements.find((a) => a.id === id);
      if (def) fresh.push(def);
    }
  }
  try {
    await AsyncStorage.setItem(EARNED_KEY, JSON.stringify(earned));
  } catch {
    // a failed write just means we recompute next launch; nothing is lost
  }
  return { earned, fresh };
}

/** True when the app can detect this one itself (so the UI hides "I did this"). */
export function isAutoDetected(id: string): boolean {
  return Boolean(RULES[id]);
}

export { achievements };
export type { Achievement };

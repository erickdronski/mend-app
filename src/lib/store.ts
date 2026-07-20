/**
 * Local-first storage on AsyncStorage. The device owns the couple's data;
 * Supabase auth exists for identity and (later) couple sync, never as a
 * requirement to heal.
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { LensId, ConflictRole } from "./content/quiz";
import type { Situation } from "./situation";
import type { RelationshipType, Together, LivingSituation } from "./content/relationships";

export type Profile = {
  a: string;
  b: string;
  safetyAck: boolean;
  createdAt: string;
  /** what the couple is carrying, chosen at onboarding; personalizes the app */
  situation?: Situation;
  /**
   * The relationship model. All optional so every profile written before the
   * expansion keeps working: the app falls back to neutral wording rather
   * than assuming marriage. See lib/content/relationships.ts.
   */
  relationshipType?: RelationshipType;
  together?: Together;
  living?: LivingSituation;
  /** Situations can stack (a couple is rarely carrying exactly one thing). */
  situations?: Situation[];
  lenses?: { a?: LensId; b?: LensId };
  roles?: { a?: ConflictRole; b?: ConflictRole };
};

export type SessionRecord = {
  id: string;
  date: string;
  topicTitle: string;
  feelings: [string, string];
  appreciations: [string, string];
  commitments: [string, string];
};

export type Commitment = { text: string; who: string; date: string; done: boolean };

export type Plan = { rituals: string[]; commitments: Commitment[] };

export type ChallengeState = { id: string; startDate: string; doneDays: number[] };

/** One partner's pulse for one stage: five 1-5 scores. */
export type PulseEntry = { stage: number; who: 0 | 1; scores: number[]; date: string };

export type JourneyState = { stage: number; doneSteps: string[]; graduatedAt?: string };

const KEYS = {
  profile: "mend.profile",
  sessions: "mend.sessions",
  plan: "mend.plan",
  challenge: "mend.challenge",
  challengesDone: "mend.challengesDone",
  pulses: "mend.pulses",
  journey: "mend.journey",
  language: "mend.language",
  localDaily: "mend.localDaily",
  dailyDays: "mend.dailyDays",
} as const;

async function read<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

async function write(key: string, value: unknown) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage failure: degrade to stateless
  }
}

// ——— profile ———
export const getProfile = () => read<Profile | null>(KEYS.profile, null);
export const saveProfile = (p: Profile) => write(KEYS.profile, p);

/** Wipe every Mend key from this device. Used on account deletion and on a
 *  guest "erase everything" so no relationship data survives locally. */
export async function clearAllLocal() {
  await AsyncStorage.multiRemove(Object.values(KEYS));
}

/** The full snapshot backed up to Supabase and restored on a new device. */
export type BackupState = {
  profile?: Profile | null;
  sessions?: SessionRecord[];
  plan?: Plan;
  challengesDone?: string[];
  pulses?: PulseEntry[];
  journey?: JourneyState;
};

/** Write a backup snapshot into local storage (restore on sign-in / reinstall). */
export async function restoreLocal(state: BackupState) {
  const pairs: [string, string][] = [];
  if (state.profile) pairs.push([KEYS.profile, JSON.stringify(state.profile)]);
  if (state.sessions) pairs.push([KEYS.sessions, JSON.stringify(state.sessions)]);
  if (state.plan) pairs.push([KEYS.plan, JSON.stringify(state.plan)]);
  if (state.challengesDone) pairs.push([KEYS.challengesDone, JSON.stringify(state.challengesDone)]);
  if (state.pulses) pairs.push([KEYS.pulses, JSON.stringify(state.pulses)]);
  if (state.journey) pairs.push([KEYS.journey, JSON.stringify(state.journey)]);
  if (pairs.length) await AsyncStorage.multiSet(pairs);
}

// ——— local daily answer (guests / solo, before a shared space exists) ———
type LocalDaily = { date: string; answer: string };
export async function getLocalDaily(dateKey: string): Promise<string | null> {
  const d = await read<LocalDaily | null>(KEYS.localDaily, null);
  return d && d.date === dateKey ? d.answer : null;
}
export async function saveLocalDaily(dateKey: string, answer: string) {
  await write(KEYS.localDaily, { date: dateKey, answer });
  await countDailyAnswer(dateKey);
}

/**
 * How many distinct days this person has answered the daily question, whether
 * they answered locally or inside a shared space. Counting days (not answers)
 * means re-editing today's answer never inflates it, and there is no streak
 * to break: a missed day costs nothing, it simply is not counted.
 */
export async function countDailyAnswer(dateKey: string): Promise<number> {
  const days = await read<string[]>(KEYS.dailyDays, []);
  if (days.includes(dateKey)) return days.length;
  const next = [...days, dateKey];
  await write(KEYS.dailyDays, next);
  return next.length;
}
export const getDailyAnswerCount = async () => (await read<string[]>(KEYS.dailyDays, [])).length;

// ——— sessions ———
export const getSessions = () => read<SessionRecord[]>(KEYS.sessions, []);
export async function addSession(r: SessionRecord) {
  const s = await getSessions();
  await write(KEYS.sessions, [r, ...s]);
}

// ——— plan ———
export const getPlan = () => read<Plan>(KEYS.plan, { rituals: [], commitments: [] });
export const savePlan = (p: Plan) => write(KEYS.plan, p);

export async function toggleRitual(id: string): Promise<Plan> {
  const plan = await getPlan();
  plan.rituals = plan.rituals.includes(id)
    ? plan.rituals.filter((r) => r !== id)
    : [...plan.rituals, id];
  await savePlan(plan);
  return plan;
}

export async function addCommitments(items: Commitment[]): Promise<Plan> {
  const plan = await getPlan();
  plan.commitments = [...items.filter((c) => c.text.trim()), ...plan.commitments];
  await savePlan(plan);
  return plan;
}

export async function toggleCommitment(index: number): Promise<Plan> {
  const plan = await getPlan();
  if (plan.commitments[index]) {
    plan.commitments[index].done = !plan.commitments[index].done;
    await savePlan(plan);
  }
  return plan;
}

// ——— challenges ———
export const getChallengeState = () => read<ChallengeState | null>(KEYS.challenge, null);
export const getChallengesDone = () => read<string[]>(KEYS.challengesDone, []);

export async function startChallenge(id: string): Promise<ChallengeState> {
  const state: ChallengeState = { id, startDate: new Date().toISOString(), doneDays: [] };
  await write(KEYS.challenge, state);
  return state;
}

export async function completeChallengeDay(day: number): Promise<ChallengeState | null> {
  const state = await getChallengeState();
  if (!state) return null;
  if (!state.doneDays.includes(day)) state.doneDays = [...state.doneDays, day];
  await write(KEYS.challenge, state);
  if (state.doneDays.length >= 7) {
    const done = await getChallengesDone();
    if (!done.includes(state.id)) await write(KEYS.challengesDone, [...done, state.id]);
  }
  return state;
}

export const clearChallenge = () => AsyncStorage.removeItem(KEYS.challenge);

// ——— pulses ———
export const getPulses = () => read<PulseEntry[]>(KEYS.pulses, []);
export async function addPulse(entry: PulseEntry) {
  const all = await getPulses();
  await write(KEYS.pulses, [...all, entry]);
}

// ——— journey ———
export const getJourney = () => read<JourneyState>(KEYS.journey, { stage: 1, doneSteps: [] });
export const saveJourney = (j: JourneyState) => write(KEYS.journey, j);

export async function markStep(id: string, done: boolean): Promise<JourneyState> {
  const j = await getJourney();
  j.doneSteps = done ? [...new Set([...j.doneSteps, id])] : j.doneSteps.filter((s) => s !== id);
  await saveJourney(j);
  return j;
}

export async function advanceStage(): Promise<JourneyState> {
  const j = await getJourney();
  j.stage = Math.min(6, j.stage + 1);
  await saveJourney(j);
  return j;
}

// ——— language ———
export const getLanguage = () => read<string | null>(KEYS.language, null);
export const saveLanguage = (lang: string) => write(KEYS.language, lang);

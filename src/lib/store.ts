/**
 * Local-first storage on storage. The device owns the relationship's data;
 * Supabase auth exists for identity and (later) shared sync, never as a
 * requirement to heal.
 */
import { storageForCurrentAccount } from "./account-storage";
import type { LensId, ConflictRole } from "./content/quiz";
import type { Situation } from "./situation";
import type { RelationshipType, Together, LivingSituation } from "./content/relationships";

export type Profile = {
  a: string;
  b: string;
  safetyAck: boolean;
  createdAt: string;
  /** what the relationship is carrying, chosen at onboarding; personalizes the app */
  situation?: Situation;
  /**
   * The relationship model. All optional so every profile written before the
   * expansion keeps working: the app falls back to neutral wording rather
   * than assuming marriage. See lib/content/relationships.ts.
   */
  relationshipType?: RelationshipType;
  together?: Together;
  living?: LivingSituation;
  /** Situations can stack (a relationship is rarely carrying exactly one thing). */
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

export type RecommendationOpen = { id: string; openedAt: string };

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
  recommendations: "mend.recommendations",
} as const;

async function read<T>(key: string, fallback: T, storage = storageForCurrentAccount()): Promise<T> {
  try {
    const raw = await storage.getItem(key);
    return raw ? ((JSON.parse(raw) as T | null) ?? fallback) : fallback;
  } catch {
    return fallback;
  }
}

async function write(key: string, value: unknown, storage = storageForCurrentAccount()) {
  try {
    await storage.setItem(key, JSON.stringify(value));
  } catch {
    // storage failure: degrade to stateless
  }
}

// ——— profile ———
export const getProfile = (storage = storageForCurrentAccount()) => read<Profile | null>(KEYS.profile, null, storage);
/** Gate/restore must distinguish an unreadable local profile from no profile. */
export async function getProfileForRestore(storage = storageForCurrentAccount()): Promise<Profile | null> {
  const raw = await storage.getItem(KEYS.profile);
  const profile = raw ? JSON.parse(raw) as Profile | null : null;
  if (profile && (typeof profile.a !== "string" || typeof profile.b !== "string")) throw new Error("Local profile could not be read.");
  return profile;
}
export const saveProfile = (p: Profile, storage = storageForCurrentAccount()) => write(KEYS.profile, p, storage);

/** Wipe the current account's relationship data (or the local guest data).
 * Other signed-out accounts retain their own offline progress. */
export async function clearAllLocal(storage = storageForCurrentAccount()) {
  const keys = await storage.getAllKeys();
  await storage.multiRemove(keys.filter((key) => key.startsWith("mend.")));
}

/** The full snapshot backed up to Supabase and restored on a new device. */
export type BackupState = {
  profile?: Profile | null;
  sessions?: SessionRecord[];
  plan?: Plan;
  challenge?: ChallengeState | null;
  challengesDone?: string[];
  localDaily?: { date: string; answer: string } | null;
  dailyDays?: string[];
  pulses?: PulseEntry[];
  journey?: JourneyState;
  language?: string | null;
  recommendations?: RecommendationOpen[];
  achievements?: Record<string, string>;
  claimedAchievements?: string[];
};

const RESTORE_PENDING = "mend.restore.pending";
const BACKUP_KEYS = { ...KEYS, achievements: "mend.achievements", claimedAchievements: "mend.achievements.claimed" } as const;

/** Strict reads for backup: storage errors must not become an empty cloud copy. */
export async function readLocalBackup(storage = storageForCurrentAccount()): Promise<BackupState> {
  if (await storage.getItem(RESTORE_PENDING)) throw new Error("Restore is incomplete.");
  const entries = await Promise.all(Object.entries(BACKUP_KEYS).map(async ([field, key]) => {
    const value = await storage.getItem(key);
    return [field, value === null ? undefined : JSON.parse(value)] as const;
  }));
  return Object.fromEntries(entries) as BackupState;
}

/** Replay the complete snapshot after an interrupted/partial multiSet. */
export async function resumePendingRestore(storage = storageForCurrentAccount()): Promise<void> {
  const pending = await storage.getItem(RESTORE_PENDING);
  if (!pending) return;
  const state = JSON.parse(pending) as BackupState;
  const pairs: [string, string][] = Object.entries(BACKUP_KEYS).map(([field, key]) =>
    [key, JSON.stringify(state[field as keyof BackupState] ?? null)]
  );
  await storage.multiSet(pairs);
  await storage.removeItem(RESTORE_PENDING);
}

/** Restore all progress, including milestones, with a durable retry journal. */
export async function restoreLocal(state: BackupState, storage = storageForCurrentAccount()) {
  await storage.setItem(RESTORE_PENDING, JSON.stringify(state));
  await resumePendingRestore(storage);
}

// ——— local daily answer (guests / solo, before a shared space exists) ———
type LocalDaily = { date: string; answer: string };
export const getLocalDailyState = (storage = storageForCurrentAccount()) => read<LocalDaily | null>(KEYS.localDaily, null, storage);
export const getDailyDays = (storage = storageForCurrentAccount()) => read<string[]>(KEYS.dailyDays, [], storage);
export async function getLocalDaily(dateKey: string, storage = storageForCurrentAccount()): Promise<string | null> {
  const d = await getLocalDailyState(storage);
  return d && d.date === dateKey ? d.answer : null;
}
export async function saveLocalDaily(dateKey: string, answer: string, storage = storageForCurrentAccount()) {
  await write(KEYS.localDaily, { date: dateKey, answer }, storage);
  await countDailyAnswer(dateKey, storage);
}

/**
 * How many distinct days this person has answered the daily question, whether
 * they answered locally or inside a shared space. Counting days (not answers)
 * means re-editing today's answer never inflates it, and there is no streak
 * to break: a missed day costs nothing, it simply is not counted.
 */
export async function countDailyAnswer(dateKey: string, storage = storageForCurrentAccount()): Promise<number> {
  const days = await read<string[]>(KEYS.dailyDays, [], storage);
  if (days.includes(dateKey)) return days.length;
  const next = [...days, dateKey];
  await write(KEYS.dailyDays, next, storage);
  return next.length;
}
export const getDailyAnswerCount = async (storage = storageForCurrentAccount()) => (await getDailyDays(storage)).length;

// ——— recommendation history ———
export const getRecommendationHistory = (storage = storageForCurrentAccount()) => read<RecommendationOpen[]>(KEYS.recommendations, [], storage);
export async function recordRecommendationOpened(id: string, storage = storageForCurrentAccount()) {
  const history = await getRecommendationHistory(storage);
  const next = [
    { id, openedAt: new Date().toISOString() },
    ...history.filter((item) => item.id !== id),
  ].slice(0, 40);
  await write(KEYS.recommendations, next, storage);
}

// ——— sessions ———
export const getSessions = (storage = storageForCurrentAccount()) => read<SessionRecord[]>(KEYS.sessions, [], storage);
export async function addSession(r: SessionRecord, storage = storageForCurrentAccount()) {
  const s = await getSessions(storage);
  await write(KEYS.sessions, [r, ...s], storage);
}

// ——— plan ———
export const getPlan = (storage = storageForCurrentAccount()) => read<Plan>(KEYS.plan, { rituals: [], commitments: [] }, storage);
export const savePlan = (p: Plan, storage = storageForCurrentAccount()) => write(KEYS.plan, p, storage);

export async function toggleRitual(id: string, storage = storageForCurrentAccount()): Promise<Plan> {
  const plan = await getPlan(storage);
  plan.rituals = plan.rituals.includes(id)
    ? plan.rituals.filter((r) => r !== id)
    : [...plan.rituals, id];
  await savePlan(plan, storage);
  return plan;
}

export async function addCommitments(items: Commitment[], storage = storageForCurrentAccount()): Promise<Plan> {
  const plan = await getPlan(storage);
  plan.commitments = [...items.filter((c) => c.text.trim()), ...plan.commitments];
  await savePlan(plan, storage);
  return plan;
}

export async function toggleCommitment(index: number, storage = storageForCurrentAccount()): Promise<Plan> {
  const plan = await getPlan(storage);
  if (plan.commitments[index]) {
    plan.commitments[index].done = !plan.commitments[index].done;
    await savePlan(plan, storage);
  }
  return plan;
}

// ——— challenges ———
export const getChallengeState = (storage = storageForCurrentAccount()) => read<ChallengeState | null>(KEYS.challenge, null, storage);
export const getChallengesDone = (storage = storageForCurrentAccount()) => read<string[]>(KEYS.challengesDone, [], storage);

export async function startChallenge(id: string, storage = storageForCurrentAccount()): Promise<ChallengeState> {
  const state: ChallengeState = { id, startDate: new Date().toISOString(), doneDays: [] };
  await write(KEYS.challenge, state, storage);
  return state;
}

export async function completeChallengeDay(day: number, storage = storageForCurrentAccount()): Promise<ChallengeState | null> {
  const state = await getChallengeState(storage);
  if (!state) return null;
  if (!state.doneDays.includes(day)) state.doneDays = [...state.doneDays, day];
  await write(KEYS.challenge, state, storage);
  if (state.doneDays.length >= 7) {
    const done = await getChallengesDone(storage);
    if (!done.includes(state.id)) await write(KEYS.challengesDone, [...done, state.id], storage);
  }
  return state;
}

export const clearChallenge = () => storageForCurrentAccount().removeItem(KEYS.challenge);

// ——— pulses ———
export const getPulses = (storage = storageForCurrentAccount()) => read<PulseEntry[]>(KEYS.pulses, [], storage);
export async function addPulse(entry: PulseEntry, storage = storageForCurrentAccount()) {
  const all = await getPulses(storage);
  await write(KEYS.pulses, [...all, entry], storage);
}

// ——— journey ———
export const getJourney = (storage = storageForCurrentAccount()) => read<JourneyState>(KEYS.journey, { stage: 1, doneSteps: [] }, storage);
export const saveJourney = (j: JourneyState, storage = storageForCurrentAccount()) => write(KEYS.journey, j, storage);

export async function markStep(id: string, done: boolean, storage = storageForCurrentAccount()): Promise<JourneyState> {
  const j = await getJourney(storage);
  j.doneSteps = done ? [...new Set([...j.doneSteps, id])] : j.doneSteps.filter((s) => s !== id);
  await saveJourney(j, storage);
  return j;
}

export async function advanceStage(storage = storageForCurrentAccount()): Promise<JourneyState> {
  const j = await getJourney(storage);
  j.stage = Math.min(6, j.stage + 1);
  await saveJourney(j, storage);
  return j;
}

// ——— language ———
export const getLanguage = (storage = storageForCurrentAccount()) => read<string | null>(KEYS.language, null, storage);
export const saveLanguage = (lang: string, storage = storageForCurrentAccount()) => write(KEYS.language, lang, storage);

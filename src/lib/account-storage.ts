/** Private local data follows its account, including when the network is down. */
import AsyncStorage from "@react-native-async-storage/async-storage";

const PREFIX = "mend:data:v1:";
const MIGRATED = "mend.data-migrated.v1";
const TRANSFER = "mend.data-transfer.v1";
const GUEST = "guest";
const DATA_KEYS = [
  "mend.profile", "mend.sessions", "mend.plan", "mend.challenge",
  "mend.challengesDone", "mend.pulses", "mend.journey", "mend.language",
  "mend.localDaily", "mend.dailyDays", "mend.recommendations",
  "mend.achievements", "mend.achievements.claimed",
];

type Account = { id: string; is_anonymous?: boolean } | null;
export type AccountDataScope = { owner: string; identity: string | null; generation: number };
let owner = GUEST;
let identity: string | null = null;
let pendingTransitions = 0;
let guestWriteGeneration = 0;
const pendingGuestWrites = new Set<Promise<void>>();
let generation = 0;
let initialized = false;
let transitions: Promise<void> = Promise.resolve();
const accountOwner = (user: Account) => user && !user.is_anonymous ? `user:${user.id}` : GUEST;
const prefix = (account: string) => `${PREFIX}${encodeURIComponent(account)}:`;

export function accountDataScope(): AccountDataScope {
  return { owner, identity, generation };
}

export function ownsAccountData(scope: AccountDataScope, user: Account): boolean {
  return initialized && pendingTransitions === 0 && scope.generation === generation && scope.owner === owner && scope.identity === identity && identity === (user?.id ?? null) && owner === accountOwner(user);
}

/** Preserve local onboarding only for the invisible null -> anonymous mint. */
export function shouldResetAccountView(previous: Account, next: Account): boolean {
  if (previous?.id === next?.id) return false;
  if (!previous && next?.is_anonymous) return false;
  return true;
}

/** Invisible anonymous signup must not restart an in-progress local screen. */
export function accountStorageReadyFor(user: Account): boolean {
  return initialized && pendingTransitions === 0 && owner === accountOwner(user);
}

export function accountDataReadyFor(user: Account): boolean {
  return initialized && pendingTransitions === 0 && identity === (user?.id ?? null) && owner === accountOwner(user);
}

type Transfer = { target: string; pairs: [string, string][]; sourceKeys: string[]; legacy: boolean };

// A durable journal pins partial transfers to their original destination. If
// removal fails, another sign-in must finish that transfer, never adopt its
// leftover source keys into a different account.
async function finishTransfer(transfer: Transfer) {
  if (transfer.pairs.length) {
    await AsyncStorage.multiSet(transfer.pairs);
    await AsyncStorage.multiRemove(transfer.sourceKeys);
  }
  if (transfer.legacy) await AsyncStorage.setItem(MIGRATED, "1");
  await AsyncStorage.removeItem(TRANSFER);
}

async function transferData(sourceKeys: string[], target: string, sourcePrefix: string, legacy: boolean) {
  const source = (await AsyncStorage.multiGet(sourceKeys)).filter((pair): pair is [string, string] => pair[1] !== null);
  const transfer: Transfer = {
    target, legacy, sourceKeys: source.map(([key]) => key),
    pairs: source.map(([key, value]) => [`${prefix(target)}${key.slice(sourcePrefix.length)}`, value]),
  };
  await AsyncStorage.setItem(TRANSFER, JSON.stringify(transfer));
  await finishTransfer(transfer);
}

/** Establish the active namespace before rendering account-specific screens. */
export function activateAccountData(user: Account): Promise<void> {
  const target = accountOwner(user);
  pendingTransitions += 1;
  generation += 1;
  const transition = transitions.then(async () => {
    const interrupted = await AsyncStorage.getItem(TRANSFER);
    if (interrupted) await finishTransfer(JSON.parse(interrupted) as Transfer);
    if (!(await AsyncStorage.getItem(MIGRATED))) {
      await transferData(DATA_KEYS, target, "", true);
    }
    owner = target;
    identity = user?.id ?? null;
    initialized = true;
  }).finally(() => { pendingTransitions -= 1; });
  transitions = transition.catch(() => {});
  return transition;
}

/** Called only after the server confirms this account has no backup. */
export async function adoptGuestData(scope: AccountDataScope, user: NonNullable<Account>): Promise<void> {
  const target = accountOwner(user);
  const adoption = transitions.then(async () => {
    if (target === GUEST || !ownsAccountData(scope, user)) return;
    if (await AsyncStorage.getItem(`${prefix(target)}mend.profile`)) return;
    if (!ownsAccountData(scope, user)) return;
    guestWriteGeneration += 1;
    await Promise.allSettled([...pendingGuestWrites]);
    if (!ownsAccountData(scope, user)) return;
    const guestKeys = (await AsyncStorage.getAllKeys()).filter(key => key.startsWith(prefix(GUEST)));
    if (!ownsAccountData(scope, user)) return;
    await transferData(guestKeys, target, prefix(GUEST), false);
  });
  transitions = adoption.catch(() => {});
  await adoption;
}

/** Call only after Supabase confirms sign-out; failed sign-out retains all data. */
export async function signOutAccount(
  signOut: () => Promise<{ error: { message: string } | null }>,
  onSignedOut: () => Promise<void>,
): Promise<void> {
  const { error } = await signOut();
  if (error) throw new Error(error.message);
  await onSignedOut();
}

// Bind an entire read/modify/write operation to its starting owner. A late
// completion can update that owner's local copy, never the next account's.
export function storageForCurrentAccount() {
  const currentOwner = owner;
  const currentPrefix = prefix(currentOwner);
  const guestGeneration = guestWriteGeneration;
  const write = (operation: () => Promise<void>) => {
    if (currentOwner !== GUEST) return operation();
    if (guestGeneration !== guestWriteGeneration) return Promise.reject(new Error("Guest data moved to an account."));
    const pending = operation();
    pendingGuestWrites.add(pending);
    return pending.finally(() => pendingGuestWrites.delete(pending));
  };
  const keyFor = (key: string) => `${currentPrefix}${key}`;
  return {
    getItem: (key: string) => AsyncStorage.getItem(keyFor(key)),
    setItem: (key: string, value: string) => write(() => AsyncStorage.setItem(keyFor(key), value)),
    removeItem: (key: string) => write(() => AsyncStorage.removeItem(keyFor(key))),
    multiSet: (pairs: [string, string][]) => write(() => AsyncStorage.multiSet(pairs.map(([key, value]) => [keyFor(key), value]))),
    multiRemove: (keys: string[]) => write(() => AsyncStorage.multiRemove(keys.map(keyFor))),
    getAllKeys: async () => (await AsyncStorage.getAllKeys()).filter(key => key.startsWith(currentPrefix)).map(key => key.slice(currentPrefix.length)),
  };
}
export type AccountStorage = ReturnType<typeof storageForCurrentAccount>;

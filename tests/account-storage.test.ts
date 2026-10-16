import { beforeEach, describe, expect, it, vi } from "vitest";

const { data, raw } = vi.hoisted(() => {
  const data = new Map<string, string>();
  return { data, raw: {
    getItem: vi.fn(), setItem: vi.fn(), removeItem: vi.fn(),
    multiGet: vi.fn(), multiSet: vi.fn(), multiRemove: vi.fn(), getAllKeys: vi.fn(),
  } };
});
vi.mock("@react-native-async-storage/async-storage", () => ({ default: raw }));

const backend = vi.hoisted(() => ({ getSession: vi.fn(), maybeSingle: vi.fn(), upsert: vi.fn(), rpc: vi.fn() }));
vi.mock("../src/lib/supabase", () => ({
  supabase: {
    auth: { getSession: backend.getSession },
    from: () => ({
      select() { return this; }, eq() { return this; },
      maybeSingle: backend.maybeSingle, upsert: backend.upsert,
    }),
    rpc: backend.rpc,
  },
  withBackendTimeout: (promise: Promise<unknown>) => promise,
}));

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>(r => { resolve = r; });
  return { promise, resolve };
}
const a = { id: "account-a", is_anonymous: false };
const b = { id: "account-b", is_anonymous: false };
const profile = (name: string) => ({ a: name, b: "Partner", safetyAck: true, createdAt: "2026-01-01" });

beforeEach(() => {
  vi.resetModules();
  backend.getSession.mockReset().mockResolvedValue({ data: { session: { user: a } } });
  backend.maybeSingle.mockReset().mockResolvedValue({ data: null, error: null });
  backend.upsert.mockReset().mockResolvedValue({ error: null });
  backend.rpc.mockReset().mockResolvedValue({ error: null });
  data.clear();
  raw.getItem.mockReset().mockImplementation(async key => data.get(key) ?? null);
  raw.setItem.mockReset().mockImplementation(async (key, value) => { data.set(key, value); });
  raw.removeItem.mockReset().mockImplementation(async key => { data.delete(key); });
  raw.multiGet.mockReset().mockImplementation(async keys => keys.map((key: string) => [key, data.get(key) ?? null]));
  raw.multiSet.mockReset().mockImplementation(async pairs => { for (const [key, value] of pairs) data.set(key, value); });
  raw.multiRemove.mockReset().mockImplementation(async keys => { for (const key of keys) data.delete(key); });
  raw.getAllKeys.mockReset().mockImplementation(async () => [...data.keys()]);
});

describe("private local account data", () => {
  it("migrates legacy relationship data without touching auth, app lock, or unrelated keys", async () => {
    data.set("mend.profile", JSON.stringify(profile("A")));
    data.set("mend.achievements", JSON.stringify({ first: "2026-01-01" }));
    data.set("mend.lock", "1"); data.set("sb-auth-token", "fixture");
    const { activateAccountData } = await import("../src/lib/account-storage");
    const { getProfile } = await import("../src/lib/store");
    await activateAccountData(a);
    expect(await getProfile()).toEqual(profile("A"));
    expect(data.has("mend.profile")).toBe(false);
    expect(data.get("mend.lock")).toBe("1");
    expect(data.get("sb-auth-token")).toBe("fixture");
    await activateAccountData(b);
    expect(await getProfile()).toBeNull();
    await activateAccountData(a);
    expect(await getProfile()).toEqual(profile("A"));
  });

  it("preserves offline data through sign-out and restores only the same account", async () => {
    const { activateAccountData, signOutAccount } = await import("../src/lib/account-storage");
    const { getProfile, saveProfile } = await import("../src/lib/store");
    await activateAccountData(a); await saveProfile(profile("A"));
    await signOutAccount(async () => ({ error: null }), () => activateAccountData(null));
    expect(await getProfile()).toBeNull();
    await activateAccountData(b); await saveProfile(profile("B"));
    expect(await getProfile()).toEqual(profile("B"));
    await activateAccountData(a);
    expect(await getProfile()).toEqual(profile("A"));
  });

  it("does not switch accounts or delete data when sign-out fails", async () => {
    const { activateAccountData, signOutAccount } = await import("../src/lib/account-storage");
    const { getProfile, saveProfile } = await import("../src/lib/store");
    await activateAccountData(a); await saveProfile(profile("A"));
    const transition = vi.fn(() => activateAccountData(null));
    await expect(signOutAccount(async () => ({ error: { message: "Offline" } }), transition)).rejects.toThrow("Offline");
    expect(transition).not.toHaveBeenCalled();
    expect(await getProfile()).toEqual(profile("A"));
  });

  it("keeps the legacy copy when migration cannot save its replacement", async () => {
    data.set("mend.profile", JSON.stringify(profile("A")));
    raw.multiSet.mockRejectedValueOnce(new Error("Disk full"));
    const { activateAccountData, accountDataReadyFor } = await import("../src/lib/account-storage");
    await expect(activateAccountData(a)).rejects.toThrow("Disk full");
    expect(data.get("mend.profile")).toBe(JSON.stringify(profile("A")));
    expect(accountDataReadyFor(a)).toBe(false);
    await activateAccountData(a);
    expect(accountDataReadyFor(a)).toBe(true);
  });

  it("adopts guest progress into a new account and removes the duplicate guest copy", async () => {
    const { activateAccountData, adoptGuestData, accountDataScope } = await import("../src/lib/account-storage");
    const { getProfile, saveProfile } = await import("../src/lib/store");
    await activateAccountData({ id: "anon", is_anonymous: true });
    await saveProfile(profile("Guest"));
    await activateAccountData(a);
    await adoptGuestData(accountDataScope(), a);
    expect(await getProfile()).toEqual(profile("Guest"));
    await activateAccountData(null);
    expect(await getProfile()).toBeNull();
  });

  it("does not replace an existing account with guest data", async () => {
    const { activateAccountData, adoptGuestData, accountDataScope } = await import("../src/lib/account-storage");
    const { getProfile, saveProfile } = await import("../src/lib/store");
    await activateAccountData(a); await saveProfile(profile("A"));
    await activateAccountData(null); await saveProfile(profile("Guest"));
    await activateAccountData(a);
    await adoptGuestData(accountDataScope(), a);
    expect(await getProfile()).toEqual(profile("A"));
    await activateAccountData(null);
    expect(await getProfile()).toEqual(profile("Guest"));
  });

  it("keeps onboarding mounted during invisible signup while invalidating auth work", async () => {
    const { activateAccountData, shouldResetAccountView, accountStorageReadyFor, accountDataReadyFor } = await import("../src/lib/account-storage");
    const anonymous = { id: "anonymous", is_anonymous: true };
    await activateAccountData(null);
    expect(shouldResetAccountView(null, anonymous)).toBe(false);
    expect(accountStorageReadyFor(anonymous)).toBe(true);
    expect(accountDataReadyFor(anonymous)).toBe(false);
    await activateAccountData(anonymous);
    expect(accountDataReadyFor(anonymous)).toBe(true);
    expect(shouldResetAccountView(anonymous, null)).toBe(true);
    expect(shouldResetAccountView(anonymous, { id: "another-anonymous", is_anonymous: true })).toBe(true);
    expect(shouldResetAccountView(anonymous, a)).toBe(true);
    expect(shouldResetAccountView(a, b)).toBe(true);
    expect(shouldResetAccountView(a, { ...a })).toBe(false);
    expect(accountStorageReadyFor(a)).toBe(false);
  });

  it("invalidates anonymous requests even though anonymous IDs share guest storage", async () => {
    const { activateAccountData, accountDataScope, ownsAccountData } = await import("../src/lib/account-storage");
    const oldAnon = { id: "anonymous-a", is_anonymous: true };
    await activateAccountData(oldAnon);
    const before = accountDataScope();
    await activateAccountData(null);
    expect(ownsAccountData(before, oldAnon)).toBe(false);
    await activateAccountData({ id: "anonymous-b", is_anonymous: true });
    expect(ownsAccountData(before, oldAnon)).toBe(false);
  });

  it("does not claim a previous account is ready while another activation is pending", async () => {
    const { activateAccountData, accountDataReadyFor, accountDataScope } = await import("../src/lib/account-storage");
    await activateAccountData(a);
    const wait = deferred<string | null>();
    raw.getItem.mockImplementationOnce(() => wait.promise);
    const toB = activateAccountData(b);
    expect(accountDataReadyFor(a)).toBe(false);
    const backToA = activateAccountData(a);
    wait.resolve(null);
    await Promise.all([toB, backToA]);
    expect(accountDataReadyFor(a)).toBe(true);
    expect(accountDataScope().identity).toBe(a.id);
  });

  it("binds delayed read-modify-write to its original account", async () => {
    const { activateAccountData } = await import("../src/lib/account-storage");
    const { getPlan, savePlan, toggleRitual } = await import("../src/lib/store");
    await activateAccountData(a); await savePlan({ rituals: ["a"], commitments: [] });
    const read = deferred<string | null>();
    raw.getItem.mockImplementationOnce(() => read.promise);
    const mutation = toggleRitual("late");
    await activateAccountData(b); await savePlan({ rituals: ["b"], commitments: [] });
    read.resolve(JSON.stringify({ rituals: ["a"], commitments: [] }));
    await mutation;
    expect((await getPlan()).rituals).toEqual(["b"]);
    await activateAccountData(a);
    expect((await getPlan()).rituals).toEqual(["a", "late"]);
  });

  it("a delayed erase cannot clear the next account", async () => {
    const { activateAccountData } = await import("../src/lib/account-storage");
    const { clearAllLocal, saveProfile, getProfile } = await import("../src/lib/store");
    await activateAccountData(a); await saveProfile(profile("A"));
    const keys = [...data.keys()];
    const read = deferred<string[]>();
    raw.getAllKeys.mockImplementationOnce(() => read.promise);
    const erase = clearAllLocal();
    await activateAccountData(b); await saveProfile(profile("B"));
    read.resolve(keys); await erase;
    expect(await getProfile()).toEqual(profile("B"));
    await activateAccountData(a);
    expect(await getProfile()).toBeNull();
  });
  it("pins an interrupted guest transfer to A when B signs in later", async () => {
    const { activateAccountData, adoptGuestData, accountDataScope } = await import("../src/lib/account-storage");
    const { getProfile, saveProfile } = await import("../src/lib/store");
    await activateAccountData(null); await saveProfile(profile("Guest"));
    await activateAccountData(a);
    raw.multiRemove.mockRejectedValueOnce(new Error("Cannot remove source"));
    await expect(adoptGuestData(accountDataScope(), a)).rejects.toThrow("Cannot remove source");
    await activateAccountData(b);
    await adoptGuestData(accountDataScope(), b);
    expect(await getProfile()).toBeNull();
    await activateAccountData(a);
    expect(await getProfile()).toEqual(profile("Guest"));
  });

  it("pins an interrupted legacy migration to its first account", async () => {
    data.set("mend.profile", JSON.stringify(profile("A")));
    const { activateAccountData } = await import("../src/lib/account-storage");
    const { getProfile } = await import("../src/lib/store");
    raw.multiRemove.mockRejectedValueOnce(new Error("Cannot remove legacy"));
    await expect(activateAccountData(a)).rejects.toThrow("Cannot remove legacy");
    await activateAccountData(b);
    expect(await getProfile()).toBeNull();
    await activateAccountData(a);
    expect(await getProfile()).toEqual(profile("A"));
  });

});


describe("account backup and restore boundaries", () => {
  it("ignores a delayed A restore after B signs in", async () => {
    const { activateAccountData } = await import("../src/lib/account-storage");
    const { getProfile, saveProfile } = await import("../src/lib/store");
    const { restoreFromBackup } = await import("../src/lib/sync");
    await activateAccountData(a);
    const response = deferred<unknown>();
    backend.maybeSingle.mockReturnValueOnce(response.promise);
    const restore = restoreFromBackup();
    await vi.waitFor(() => expect(backend.maybeSingle).toHaveBeenCalled());
    await activateAccountData(b); await saveProfile(profile("B"));
    response.resolve({ data: { state: { profile: profile("A") } }, error: null });
    expect(await restore).toBe("unavailable");
    expect(await getProfile()).toEqual(profile("B"));
  });

  it("does not upload a snapshot collected while the account changes", async () => {
    const { activateAccountData } = await import("../src/lib/account-storage");
    const { saveProfile } = await import("../src/lib/store");
    const { backupIfSignedIn } = await import("../src/lib/sync");
    await activateAccountData(a); await saveProfile(profile("A"));
    const read = deferred<string | null>();
    let reading = false;
    raw.getItem.mockImplementation(async (key: string) => {
      if (key.endsWith(":mend.sessions")) { reading = true; return read.promise; }
      return data.get(key) ?? null;
    });
    const backup = backupIfSignedIn();
    await vi.waitFor(() => expect(reading).toBe(true));
    await activateAccountData(b); await saveProfile(profile("B"));
    read.resolve("[]"); await backup;
    expect(backend.upsert).not.toHaveBeenCalled();
  });

  it("keeps an unreadable local snapshot out of cloud backup and permits retry", async () => {
    const { activateAccountData } = await import("../src/lib/account-storage");
    const { saveProfile } = await import("../src/lib/store");
    const { backupIfSignedIn } = await import("../src/lib/sync");
    await activateAccountData(a); await saveProfile(profile("A"));
    raw.getItem.mockImplementation(async (key: string) => {
      if (key.endsWith(":mend.sessions")) throw new Error("Read failed");
      return data.get(key) ?? null;
    });
    await backupIfSignedIn();
    expect(backend.upsert).not.toHaveBeenCalled();
    raw.getItem.mockImplementation(async key => data.get(key) ?? null);
    await backupIfSignedIn();
    expect(backend.upsert.mock.calls[0][0]).toMatchObject({ user_id: a.id, state: { profile: profile("A") } });
  });

  it("does not throttle B's first backup because A just backed up", async () => {
    const { activateAccountData } = await import("../src/lib/account-storage");
    const { saveProfile } = await import("../src/lib/store");
    const { backupIfSignedIn } = await import("../src/lib/sync");
    await activateAccountData(a); await saveProfile(profile("A")); await backupIfSignedIn();
    backend.getSession.mockResolvedValue({ data: { session: { user: b } } });
    await activateAccountData(b); await saveProfile(profile("B")); await backupIfSignedIn();
    expect(backend.upsert.mock.calls.filter(([row]) => row.state).map(([row]) => row.user_id)).toEqual([a.id, b.id]);
  });

  it("prefers a remote account backup and preserves the unrelated guest copy", async () => {
    const { activateAccountData } = await import("../src/lib/account-storage");
    const { saveProfile, getProfile } = await import("../src/lib/store");
    const { restoreFromBackup } = await import("../src/lib/sync");
    await activateAccountData(null); await saveProfile(profile("Guest"));
    await activateAccountData(a);
    backend.maybeSingle.mockResolvedValue({ data: { state: { profile: profile("Remote A") } }, error: null });
    expect(await restoreFromBackup()).toBe("restored");
    expect(await getProfile()).toEqual(profile("Remote A"));
    await activateAccountData(null);
    expect(await getProfile()).toEqual(profile("Guest"));
  });

  it("adopts guest work only after the remote account is confirmed empty", async () => {
    const { activateAccountData } = await import("../src/lib/account-storage");
    const { saveProfile, getProfile } = await import("../src/lib/store");
    const { restoreFromBackup, backupIfSignedIn } = await import("../src/lib/sync");
    await activateAccountData(null); await saveProfile(profile("Guest")); await activateAccountData(a);
    backend.maybeSingle.mockResolvedValueOnce({ data: null, error: { message: "Offline" } });
    expect(await restoreFromBackup()).toBe("unavailable");
    expect(await getProfile()).toBeNull();
    await backupIfSignedIn(); expect(backend.upsert).not.toHaveBeenCalled();
    expect(await restoreFromBackup()).toBe("empty");
    expect(await getProfile()).toEqual(profile("Guest"));
  });

  it("blocks backup until a partial restore finishes, including milestones", async () => {
    const { activateAccountData } = await import("../src/lib/account-storage");
    const { readLocalBackup, resumePendingRestore, getSessions } = await import("../src/lib/store");
    const { getEarnedMap, getClaimed } = await import("../src/lib/achievements");
    const { restoreFromBackup, backupIfSignedIn } = await import("../src/lib/sync");
    await activateAccountData(a);
    const state = { profile: profile("A"), achievements: { first: "2026-01-01" }, claimedAchievements: ["hello"] };
    backend.maybeSingle.mockResolvedValue({ data: { state }, error: null });
    raw.multiSet.mockImplementationOnce(async pairs => { data.set(pairs[0][0], pairs[0][1]); throw new Error("Partial write"); });
    expect(await restoreFromBackup()).toBe("unavailable");
    await expect(readLocalBackup()).rejects.toThrow("Restore is incomplete");
    await backupIfSignedIn(); expect(backend.upsert).not.toHaveBeenCalled();
    await resumePendingRestore();
    expect(await readLocalBackup()).toMatchObject(state);
    expect(await getEarnedMap()).toEqual(state.achievements);
    expect(await getClaimed()).toEqual(state.claimedAchievements);
    expect(await getSessions()).toEqual([]);
  });

  it("does not treat an unreadable local profile as a missing profile", async () => {
    const { activateAccountData } = await import("../src/lib/account-storage");
    const { getProfileForRestore } = await import("../src/lib/store");
    await activateAccountData(a);
    raw.getItem.mockRejectedValueOnce(new Error("Storage unavailable"));
    await expect(getProfileForRestore()).rejects.toThrow("Storage unavailable");
  });

  it("rejects a leave-space RPC error instead of confirming departure", async () => {
    const { leaveSpace } = await import("../src/lib/space");
    backend.rpc.mockResolvedValueOnce({ error: { message: "Permission denied" } });
    await expect(leaveSpace()).rejects.toThrow("Permission denied");
    await expect(leaveSpace()).resolves.toBeUndefined();
  });
});

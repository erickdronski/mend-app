/**
 * State backup: signed-in users get their whole local state mirrored to
 * mend_state (RLS: only theirs). The device remains the source of truth;
 * this is a lifeboat for lost phones and the seed of future shared sync.
 * Fire-and-forget: sync failures never block the relationship's work.
 */
import { supabase, withBackendTimeout } from "./supabase";
import { readLocalBackup, restoreLocal, type BackupState } from "./store";

import { accountDataScope, ownsAccountData, storageForCurrentAccount, adoptGuestData } from "./account-storage";

const lastBackup = new Map<string, number>();
const backingUp = new Set<string>();

/**
 * Pull the signed-in user's backup from Supabase into local storage. Called
 * on sign-in when this device has no local profile (reinstall / new phone)
 * so the account actually restores progress, as the onboarding copy promises.
 * Distinguishes an empty backup from a network failure before guest adoption.
 */
export async function restoreFromBackup(): Promise<"restored" | "empty" | "unavailable"> {
  const scope = accountDataScope();
  const storage = storageForCurrentAccount();
  try {
    const { data: auth } = await supabase.auth.getSession();
    const user = auth.session?.user;
    if (!user || !ownsAccountData(scope, user)) return "unavailable";
    const { data, error } = await withBackendTimeout(
      supabase.from("mend_state").select("state").eq("user_id", user.id).maybeSingle(),
      "Mend could not restore your backup in time.",
      8000
    );
    const state = data?.state as BackupState | undefined;
    if (error || !ownsAccountData(scope, user)) return "unavailable";
    if (!state?.profile) {
      await adoptGuestData(scope, user);
      return ownsAccountData(scope, user) ? "empty" : "unavailable";
    }
    await restoreLocal(state, storage);
    return ownsAccountData(scope, user) ? "restored" : "unavailable";
  } catch {
    return "unavailable";
  }
}

export async function backupIfSignedIn() {
  const scope = accountDataScope();
  const storage = storageForCurrentAccount();
  const now = Date.now();
  const identityKey = scope.identity ?? scope.owner;
  if (backingUp.has(identityKey) || now - (lastBackup.get(identityKey) ?? 0) < 60_000) return;
  backingUp.add(identityKey);
  try {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;
    if (!user || !ownsAccountData(scope, user)) return;
    const state = await readLocalBackup(storage);
    const profile = state.profile;
    if (!profile || !ownsAccountData(scope, user)) return;
    const { error } = await supabase.from("mend_state").upsert({
      user_id: user.id,
      state: { ...state, v: 4 },
      updated_at: new Date().toISOString(),
    });
    if (error || !ownsAccountData(scope, user)) return;
    lastBackup.set(identityKey, now);
    if (profile) {
      await supabase.from("mend_profiles").upsert({
        user_id: user.id,
        partner_a: profile.a,
        partner_b: profile.b,
      });
    }
  } catch {
    // never block healing on a network hiccup
  } finally {
    backingUp.delete(identityKey);
  }
}

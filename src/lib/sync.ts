/**
 * State backup: signed-in users get their whole local state mirrored to
 * mend_state (RLS: only theirs). The device remains the source of truth;
 * this is a lifeboat for lost phones and the seed of future shared sync.
 * Fire-and-forget: sync failures never block the relationship's work.
 */
import { supabase, withBackendTimeout } from "./supabase";
import {
  getChallengesDone,
  getChallengeState,
  getDailyDays,
  getJourney,
  getLanguage,
  getLocalDailyState,
  getPlan,
  getProfile,
  getPulses,
  getSessions,
  restoreLocal,
  type BackupState,
} from "./store";

let lastBackup = 0;

/**
 * Pull the signed-in user's backup from Supabase into local storage. Called
 * on sign-in when this device has no local profile (reinstall / new phone)
 * so the account actually restores progress, as the onboarding copy promises.
 * Returns true if a profile was restored.
 */
export async function restoreFromBackup(): Promise<boolean> {
  try {
    const { data: auth } = await supabase.auth.getSession();
    const user = auth.session?.user;
    if (!user) return false;
    const { data } = await withBackendTimeout(
      supabase.from("mend_state").select("state").eq("user_id", user.id).maybeSingle(),
      "Mend could not restore your backup in time.",
      8000
    );
    const state = data?.state as BackupState | undefined;
    if (!state || !state.profile) return false;
    await restoreLocal(state);
    return true;
  } catch {
    return false;
  }
}

export async function backupIfSignedIn() {
  const now = Date.now();
  if (now - lastBackup < 60_000) return; // at most once a minute
  try {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;
    if (!user) return;
    lastBackup = now;
    const [
      profile,
      sessions,
      plan,
      challenge,
      challengesDone,
      localDaily,
      dailyDays,
      pulses,
      journey,
      language,
    ] = await Promise.all([
      getProfile(),
      getSessions(),
      getPlan(),
      getChallengeState(),
      getChallengesDone(),
      getLocalDailyState(),
      getDailyDays(),
      getPulses(),
      getJourney(),
      getLanguage(),
    ]);
    await supabase.from("mend_state").upsert({
      user_id: user.id,
      state: {
        profile,
        sessions,
        plan,
        challenge,
        challengesDone,
        localDaily,
        dailyDays,
        pulses,
        journey,
        language,
        v: 2,
      },
      updated_at: new Date().toISOString(),
    });
    if (profile) {
      await supabase.from("mend_profiles").upsert({
        user_id: user.id,
        partner_a: profile.a,
        partner_b: profile.b,
      });
    }
  } catch {
    // never block healing on a network hiccup
  }
}

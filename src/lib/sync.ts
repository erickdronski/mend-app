/**
 * State backup: signed-in users get their whole local state mirrored to
 * mend_state (RLS: only theirs). The device remains the source of truth;
 * this is a lifeboat for lost phones and the seed of future couple sync.
 * Fire-and-forget: sync failures never block the couple's work.
 */
import { supabase } from "./supabase";
import {
  getChallengesDone,
  getJourney,
  getPlan,
  getProfile,
  getPulses,
  getSessions,
} from "./store";

let lastBackup = 0;

export async function backupIfSignedIn() {
  const now = Date.now();
  if (now - lastBackup < 60_000) return; // at most once a minute
  try {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;
    if (!user) return;
    lastBackup = now;
    const [profile, sessions, plan, challengesDone, pulses, journey] = await Promise.all([
      getProfile(),
      getSessions(),
      getPlan(),
      getChallengesDone(),
      getPulses(),
      getJourney(),
    ]);
    await supabase.from("mend_state").upsert({
      user_id: user.id,
      state: { profile, sessions, plan, challengesDone, pulses, journey, v: 1 },
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

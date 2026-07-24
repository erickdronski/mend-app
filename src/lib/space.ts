/**
 * Couple Spaces: a shared two-person collaboration space joined by invite
 * code. Both partners answer the same daily question from their own phones;
 * a partner's answer stays hidden until you write your own (no anchoring).
 * Requires a session; the invisible anonymous account counts, so no one
 * ever fills in a login to get here.
 */
import { supabase, withBackendTimeout } from "./supabase";

export type SpaceMember = {
  user_id: string;
  display_name: string;
  role: "a" | "b";
};

export type Space = {
  id: string;
  invite_code: string;
  members: SpaceMember[];
};

export type DailyAnswer = {
  user_id: string;
  display_name: string;
  answer: string;
  created_at: string;
};

export type SpaceNote = {
  id: string;
  user_id: string;
  display_name: string;
  body: string;
  created_at: string;
};

export function todayKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate().toString().padStart(2, "0");
  return `${y}-${m}-${d}`;
}

async function uid(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  return data.session?.user.id ?? null;
}

export async function getMySpace(): Promise<Space | null> {
  const me = await withBackendTimeout(uid(), "Mend could not check your shared space. Try again in a moment.", 8000);
  if (!me) return null;
  const { data: memberships } = await withBackendTimeout(
    supabase.from("mend_space_members").select("space_id").eq("user_id", me).limit(1),
    "Mend could not load your shared space. Try again in a moment."
  );
  const sid = memberships?.[0]?.space_id;
  if (!sid) return null;
  const [{ data: spaces }, { data: members }] = await withBackendTimeout(
    Promise.all([
      supabase.from("mend_spaces").select("id, invite_code").eq("id", sid).limit(1),
      supabase.from("mend_space_members").select("user_id, display_name, role").eq("space_id", sid),
    ]),
    "Mend could not load your shared space. Try again in a moment."
  );
  if (!spaces?.[0]) return null;
  return { ...spaces[0], members: (members ?? []) as SpaceMember[] };
}

export async function createSpace(myName: string): Promise<Space | null> {
  const { error } = await withBackendTimeout(
    supabase.rpc("mend_create_space", { my_name: myName }),
    "Mend could not create the space. Check your connection and try again."
  );
  if (error) throw new Error(error.message);
  return getMySpace();
}

export async function joinSpace(code: string, myName: string): Promise<Space | null> {
  const { error } = await withBackendTimeout(
    supabase.rpc("mend_join_space", { code, my_name: myName }),
    "Mend could not join the space. Check your connection and try again."
  );
  if (error) throw new Error(error.message);
  return getMySpace();
}

export async function leaveSpace(): Promise<void> {
  await withBackendTimeout(
    supabase.rpc("mend_leave_space"),
    "Mend could not leave the space. Check your connection and try again."
  );
}

export type SpaceProgress = {
  days_both: number;
  days_mine: number;
  days_partner: number;
  notes_count: number;
};

/** Shared-progress counts (never answer text), for the space's progress card. */
export async function getSpaceProgress(space: Space): Promise<SpaceProgress | null> {
  const { data, error } = await withBackendTimeout(
    supabase.rpc("mend_space_progress", { sid: space.id }),
    "Mend could not load shared progress."
  );
  if (error) return null;
  const row = Array.isArray(data) ? data[0] : data;
  return (row as SpaceProgress) ?? null;
}

export async function getTodayAnswers(space: Space): Promise<DailyAnswer[]> {
  // Read through the sealing RPC: the server withholds the partner's answer
  // text until you have submitted your own (no anchoring, enforced in the DB).
  const { data } = await withBackendTimeout(
    supabase.rpc("mend_daily_reveal", {
      sid: space.id,
      pdate: todayKey(),
    }),
    "Mend could not load today's shared answers. Try again in a moment."
  );
  const nameOf = (id: string) =>
    space.members.find((m) => m.user_id === id)?.display_name || "Partner";
  return ((data ?? []) as { user_id: string; answer: string; created_at: string }[]).map((a) => ({
    ...a,
    display_name: nameOf(a.user_id),
  }));
}

export async function submitAnswer(space: Space, question: string, answer: string): Promise<void> {
  const me = await withBackendTimeout(uid(), "Mend could not check your account. Try again in a moment.", 8000);
  if (!me) throw new Error("not signed in");
  const { error } = await withBackendTimeout(
    supabase.from("mend_daily_answers").upsert(
      {
        space_id: space.id,
        user_id: me,
        prompt_date: todayKey(),
        question,
        answer: answer.trim(),
      },
      { onConflict: "space_id,user_id,prompt_date" }
    ),
    "Mend could not save your answer. Check your connection and try again."
  );
  if (error) throw new Error(error.message);
}

export async function listNotes(space: Space, limit = 30): Promise<SpaceNote[]> {
  const { data } = await withBackendTimeout(
    supabase
      .from("mend_notes")
      .select("id, user_id, body, created_at")
      .eq("space_id", space.id)
      .order("created_at", { ascending: false })
      .limit(limit),
    "Mend could not load notes. Try again in a moment."
  );
  const nameOf = (id: string) =>
    space.members.find((m) => m.user_id === id)?.display_name || "Partner";
  return (data ?? []).map((n) => ({ ...n, display_name: nameOf(n.user_id) }));
}

export async function addNote(space: Space, body: string): Promise<void> {
  const me = await withBackendTimeout(uid(), "Mend could not check your account. Try again in a moment.", 8000);
  if (!me) throw new Error("not signed in");
  const { error } = await withBackendTimeout(
    supabase.from("mend_notes").insert({ space_id: space.id, user_id: me, body: body.trim() }),
    "Mend could not save the note. Check your connection and try again."
  );
  if (error) throw new Error(error.message);
}

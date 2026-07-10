/**
 * Couple Spaces: a shared two-person collaboration space joined by invite
 * code. Both partners answer the same daily question from their own phones;
 * a partner's answer stays hidden until you write your own (no anchoring).
 * Requires an account (guest mode stays fully local, without a space).
 */
import { supabase } from "./supabase";

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
  const me = await uid();
  if (!me) return null;
  const { data: memberships } = await supabase
    .from("mend_space_members")
    .select("space_id")
    .eq("user_id", me)
    .limit(1);
  const sid = memberships?.[0]?.space_id;
  if (!sid) return null;
  const [{ data: spaces }, { data: members }] = await Promise.all([
    supabase.from("mend_spaces").select("id, invite_code").eq("id", sid).limit(1),
    supabase.from("mend_space_members").select("user_id, display_name, role").eq("space_id", sid),
  ]);
  if (!spaces?.[0]) return null;
  return { ...spaces[0], members: (members ?? []) as SpaceMember[] };
}

export async function createSpace(myName: string): Promise<Space | null> {
  const { error } = await supabase.rpc("mend_create_space", { my_name: myName });
  if (error) throw new Error(error.message);
  return getMySpace();
}

export async function joinSpace(code: string, myName: string): Promise<Space | null> {
  const { error } = await supabase.rpc("mend_join_space", { code, my_name: myName });
  if (error) throw new Error(error.message);
  return getMySpace();
}

export async function leaveSpace(): Promise<void> {
  await supabase.rpc("mend_leave_space");
}

export async function getTodayAnswers(space: Space): Promise<DailyAnswer[]> {
  const { data } = await supabase
    .from("mend_daily_answers")
    .select("user_id, answer, created_at")
    .eq("space_id", space.id)
    .eq("prompt_date", todayKey());
  const nameOf = (id: string) =>
    space.members.find((m) => m.user_id === id)?.display_name || "Partner";
  return (data ?? []).map((a) => ({ ...a, display_name: nameOf(a.user_id) }));
}

export async function submitAnswer(space: Space, question: string, answer: string): Promise<void> {
  const me = await uid();
  if (!me) throw new Error("not signed in");
  const { error } = await supabase.from("mend_daily_answers").upsert(
    {
      space_id: space.id,
      user_id: me,
      prompt_date: todayKey(),
      question,
      answer: answer.trim(),
    },
    { onConflict: "space_id,user_id,prompt_date" }
  );
  if (error) throw new Error(error.message);
}

export async function listNotes(space: Space, limit = 30): Promise<SpaceNote[]> {
  const { data } = await supabase
    .from("mend_notes")
    .select("id, user_id, body, created_at")
    .eq("space_id", space.id)
    .order("created_at", { ascending: false })
    .limit(limit);
  const nameOf = (id: string) =>
    space.members.find((m) => m.user_id === id)?.display_name || "Partner";
  return (data ?? []).map((n) => ({ ...n, display_name: nameOf(n.user_id) }));
}

export async function addNote(space: Space, body: string): Promise<void> {
  const me = await uid();
  if (!me) throw new Error("not signed in");
  const { error } = await supabase
    .from("mend_notes")
    .insert({ space_id: space.id, user_id: me, body: body.trim() });
  if (error) throw new Error(error.message);
}

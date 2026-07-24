import { createClient } from "@supabase/supabase-js";

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_KEY;

if (!url || !key) {
  console.error("Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_KEY before running this smoke test.");
  process.exit(1);
}

const clients = [];

function makeClient() {
  const client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  clients.push(client);
  return client;
}

async function signIn(client) {
  const { data, error } = await client.auth.signInAnonymously();
  if (error || !data.user) throw error ?? new Error("Anonymous sign-in returned no user.");
  return data.user.id;
}

async function rpc(client, name, args) {
  const { data, error } = await client.rpc(name, args);
  if (error) throw error;
  return data;
}

async function deleteAccount(client) {
  const { error } = await client.functions.invoke("mend-delete-account", { method: "POST" });
  if (error) throw error;
}

let passed = false;
try {
  const owner = makeClient();
  const joinerA = makeClient();
  const joinerB = makeClient();
  const [ownerId, joinerAId, joinerBId] = await Promise.all([
    signIn(owner),
    signIn(joinerA),
    signIn(joinerB),
  ]);

  const spaceId = await rpc(owner, "mend_create_space", { my_name: "Release Owner" });
  const { data: space, error: spaceError } = await owner
    .from("mend_spaces")
    .select("invite_code")
    .eq("id", spaceId)
    .single();
  if (spaceError || !space) throw spaceError ?? new Error("Created space could not be read.");

  const joinResults = await Promise.all([
    joinerA.rpc("mend_join_space", { code: space.invite_code, my_name: "Release Partner A" }),
    joinerB.rpc("mend_join_space", { code: space.invite_code, my_name: "Release Partner B" }),
  ]);
  const winners = joinResults
    .map((result, index) => ({ result, index }))
    .filter(({ result }) => !result.error);
  if (winners.length !== 1) throw new Error(`Expected exactly one concurrent join to succeed; got ${winners.length}.`);

  const winnerIndex = winners[0].index;
  const partner = winnerIndex === 0 ? joinerA : joinerB;
  const partnerId = winnerIndex === 0 ? joinerAId : joinerBId;
  const promptDate = new Date().toISOString().slice(0, 10);
  const question = "What felt supportive today?";

  const { error: ownerAnswerError } = await owner.from("mend_daily_answers").upsert(
    { space_id: spaceId, user_id: ownerId, prompt_date: promptDate, question, answer: "A calm check-in." },
    { onConflict: "space_id,user_id,prompt_date" }
  );
  if (ownerAnswerError) throw ownerAnswerError;

  const sealed = await rpc(partner, "mend_daily_reveal", { sid: spaceId, pdate: promptDate });
  if (sealed.length !== 0) throw new Error("Partner answer was revealed before both people answered.");

  const { error: partnerAnswerError } = await partner.from("mend_daily_answers").upsert(
    { space_id: spaceId, user_id: partnerId, prompt_date: promptDate, question, answer: "Being given room to finish." },
    { onConflict: "space_id,user_id,prompt_date" }
  );
  if (partnerAnswerError) throw partnerAnswerError;

  const revealed = await rpc(owner, "mend_daily_reveal", { sid: spaceId, pdate: promptDate });
  if (revealed.length !== 2) throw new Error(`Expected two revealed answers; got ${revealed.length}.`);

  const { error: noteError } = await owner
    .from("mend_notes")
    .insert({ space_id: spaceId, user_id: ownerId, body: "Thanks for staying with that conversation." });
  if (noteError) throw noteError;

  const { data: notes, error: notesError } = await partner.from("mend_notes").select("id").eq("space_id", spaceId);
  if (notesError || notes?.length !== 1) throw notesError ?? new Error("Shared note was not visible to the partner.");

  passed = true;
  console.log("Backend smoke passed: auth, two-person join, sealed answers, shared notes, and RLS.");
} finally {
  const cleanup = await Promise.allSettled(clients.map(deleteAccount));
  const cleanupFailures = cleanup.filter((result) => result.status === "rejected").length;
  if (cleanupFailures) {
    console.error(`Backend smoke cleanup failed for ${cleanupFailures} disposable account(s).`);
    process.exitCode = 1;
  } else if (passed) {
    console.log("Backend smoke cleanup passed: all disposable accounts were deleted.");
  }
}

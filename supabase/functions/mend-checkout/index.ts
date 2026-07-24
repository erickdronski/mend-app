import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.110.8";

const STRIPE_API_VERSION = "2026-06-24.dahlia";
const STRIPE_SECRET = Deno.env.get("STRIPE_SECRET_KEY") ?? "";
const SITE = Deno.env.get("MEND_SITE_URL") ?? "https://mend-drab-pi.vercel.app";

const PRICES: Record<string, string | undefined> = {
  monthly: Deno.env.get("STRIPE_PRICE_MONTHLY"),
  annual: Deno.env.get("STRIPE_PRICE_ANNUAL"),
};

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}

function integrationIdentifier() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const suffix = Array.from(crypto.getRandomValues(new Uint8Array(8)))
    .map((n) => alphabet[n % alphabet.length])
    .join("");
  return `mend_room_${suffix}`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "POST only" }, 405);
  if (!STRIPE_SECRET) return json({ error: "Stripe billing is not configured." }, 503);

  const authHeader = req.headers.get("Authorization") ?? "";
  const asUser = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } }
  );
  const { data: userData, error: userError } = await asUser.auth.getUser();
  const user = userData.user;
  if (userError || !user) return json({ error: "Sign in first." }, 401);

  let plan: "monthly" | "annual" = "annual";
  try {
    const body = await req.json();
    if (body?.plan === "monthly") plan = "monthly";
  } catch {
    // Annual is the default and best-value plan.
  }

  const price = PRICES[plan];
  if (!price) return json({ error: `No ${plan} Stripe price is configured.` }, 503);

  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
  const { data: membership, error: membershipError } = await admin
    .from("mend_space_members")
    .select("space_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (membershipError) return json({ error: "Your room could not be checked." }, 500);
  if (!membership?.space_id) {
    return json({ error: "Create or join your private room before subscribing.", code: "room_required" }, 409);
  }

  const { data: roomEntitlement, error: roomError } = await admin
    .from("mend_entitlements")
    .select("id, source, status, current_period_end")
    .eq("space_id", membership.space_id)
    .maybeSingle();
  if (roomError) return json({ error: "Your room access could not be checked." }, 500);
  const periodEnd = roomEntitlement?.current_period_end
    ? new Date(roomEntitlement.current_period_end).getTime()
    : null;
  if (
    roomEntitlement &&
    (roomEntitlement.source === "founder_grant" ||
      roomEntitlement.status === "active" ||
      roomEntitlement.status === "trialing" ||
      (periodEnd !== null && periodEnd > Date.now()))
  ) {
    return json({ error: "Your room already has Mend Plus. Both partners are covered.", code: "room_has_plus" }, 409);
  }

  const { data: payerEntitlement } = await admin
    .from("mend_entitlements")
    .select("provider_customer_id, stripe_customer_id")
    .eq("payer_user_id", user.id)
    .eq("provider", "stripe")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const form = new URLSearchParams();
  form.set("mode", "subscription");
  form.set("line_items[0][price]", price);
  form.set("line_items[0][quantity]", "1");
  form.set("success_url", `${SITE}/plus/thanks?session_id={CHECKOUT_SESSION_ID}`);
  form.set("cancel_url", `${SITE}/plus`);
  form.set("client_reference_id", user.id);
  form.set("integration_identifier", integrationIdentifier());
  form.set("metadata[payer_user_id]", user.id);
  form.set("metadata[space_id]", membership.space_id);
  form.set("subscription_data[metadata][payer_user_id]", user.id);
  form.set("subscription_data[metadata][space_id]", membership.space_id);
  form.set("allow_promotion_codes", "true");

  const customerId = payerEntitlement?.provider_customer_id ?? payerEntitlement?.stripe_customer_id;
  if (customerId) form.set("customer", customerId);
  else if (user.email) form.set("customer_email", user.email);

  const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Stripe-Version": STRIPE_API_VERSION,
    },
    body: form,
  });
  const session = await stripeResponse.json();
  if (!stripeResponse.ok) {
    console.error("Stripe Checkout session creation failed", session?.error?.type ?? "unknown");
    return json({ error: "Secure checkout could not be created." }, 502);
  }

  return json({ url: session.url, id: session.id });
});

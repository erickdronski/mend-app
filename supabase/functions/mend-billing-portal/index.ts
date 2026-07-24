import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.110.8";

const STRIPE_API_VERSION = "2026-06-24.dahlia";
const STRIPE_SECRET = Deno.env.get("STRIPE_SECRET_KEY") ?? "";
const SITE = Deno.env.get("MEND_SITE_URL") ?? "https://mend-drab-pi.vercel.app";

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

  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
  const { data: entitlement, error: entitlementError } = await admin
    .from("mend_entitlements")
    .select("provider_customer_id, stripe_customer_id")
    .eq("payer_user_id", user.id)
    .eq("provider", "stripe")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (entitlementError) return json({ error: "Billing access could not be checked." }, 500);

  const customerId = entitlement?.provider_customer_id ?? entitlement?.stripe_customer_id;
  if (!customerId) return json({ error: "Only the subscribing partner can manage this plan." }, 403);

  const form = new URLSearchParams();
  form.set("customer", customerId);
  form.set("return_url", `${SITE}/plus`);
  const stripeResponse = await fetch("https://api.stripe.com/v1/billing_portal/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Stripe-Version": STRIPE_API_VERSION,
    },
    body: form,
  });
  const portal = await stripeResponse.json();
  if (!stripeResponse.ok) {
    console.error("Stripe Billing Portal session creation failed", portal?.error?.type ?? "unknown");
    return json({ error: "Billing management could not be opened." }, 502);
  }

  return json({ url: portal.url });
});

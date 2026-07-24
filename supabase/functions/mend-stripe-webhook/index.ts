import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.110.8";
import Stripe from "npm:stripe@22.0.0";

const STRIPE_SECRET = Deno.env.get("STRIPE_SECRET_KEY") ?? "";
const WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET") ?? "";
const stripe = new Stripe(STRIPE_SECRET, { apiVersion: "2026-06-24.dahlia" });
const cryptoProvider = Stripe.createSubtleCryptoProvider();
const admin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

type Metadata = { payer_user_id?: string; space_id?: string };

function id(value: string | { id?: string } | null | undefined) {
  return typeof value === "string" ? value : value?.id ?? null;
}

function periodEnd(subscription: any): number | null {
  if (typeof subscription.current_period_end === "number") return subscription.current_period_end;
  const ends = (subscription.items?.data ?? [])
    .map((item: any) => item.current_period_end)
    .filter((value: unknown): value is number => typeof value === "number");
  return ends.length ? Math.max(...ends) : null;
}

function subscriptionIdFromEventObject(object: any): string | null {
  return id(object.subscription) ?? id(object.parent?.subscription_details?.subscription);
}

async function beginEvent(event: Stripe.Event): Promise<"process" | "done" | "busy"> {
  const { data: existing } = await admin
    .from("mend_billing_events")
    .select("status, created_at")
    .eq("provider", "stripe")
    .eq("event_id", event.id)
    .maybeSingle();
  if (existing?.status === "completed") return "done";
  if (existing?.status === "processing" && Date.now() - new Date(existing.created_at).getTime() < 60_000) {
    return "busy";
  }

  const { error } = await admin.from("mend_billing_events").upsert(
    {
      provider: "stripe",
      event_id: event.id,
      event_type: event.type,
      status: "processing",
      created_at: new Date().toISOString(),
      processed_at: null,
    },
    { onConflict: "provider,event_id" }
  );
  if (error) throw error;
  return "process";
}

async function finishEvent(eventId: string, status: "completed" | "failed") {
  await admin
    .from("mend_billing_events")
    .update({ status, processed_at: new Date().toISOString() })
    .eq("provider", "stripe")
    .eq("event_id", eventId);
}

async function syncSubscription(subscriptionId: string, fallback?: Metadata & { email?: string | null }) {
  const subscription: any = await stripe.subscriptions.retrieve(subscriptionId);
  const metadata = (subscription.metadata ?? {}) as Metadata;
  const payerUserId = metadata.payer_user_id ?? fallback?.payer_user_id;
  const spaceId = metadata.space_id ?? fallback?.space_id;
  if (!payerUserId || !spaceId) throw new Error("Subscription is missing Mend room metadata.");

  const customerId = id(subscription.customer);
  const row = {
    user_id: null,
    payer_user_id: payerUserId,
    space_id: spaceId,
    email: fallback?.email ?? null,
    tier: "plus",
    source: "stripe",
    provider: "stripe",
    provider_customer_id: customerId,
    provider_subscription_id: subscription.id,
    stripe_customer_id: customerId,
    stripe_subscription_id: subscription.id,
    status: String(subscription.status),
    current_period_end: periodEnd(subscription)
      ? new Date(periodEnd(subscription)! * 1000).toISOString()
      : null,
    updated_at: new Date().toISOString(),
  };
  const { error } = await admin
    .from("mend_entitlements")
    .upsert(row, { onConflict: "provider_subscription_id" });
  if (error) throw error;
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") return new Response("POST only", { status: 405 });
  if (!STRIPE_SECRET || !WEBHOOK_SECRET) return new Response("billing not configured", { status: 503 });

  const signature = req.headers.get("Stripe-Signature") ?? "";
  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      WEBHOOK_SECRET,
      undefined,
      cryptoProvider
    );
  } catch {
    return new Response("bad signature", { status: 400 });
  }

  try {
    const state = await beginEvent(event);
    if (state === "done") return Response.json({ received: true, duplicate: true });
    if (state === "busy") return new Response("event already processing", { status: 409 });

    const object: any = event.data.object;
    if (event.type === "checkout.session.completed") {
      const subscriptionId = id(object.subscription);
      if (!subscriptionId) throw new Error("Checkout session has no subscription.");
      await syncSubscription(subscriptionId, {
        payer_user_id: object.metadata?.payer_user_id ?? object.client_reference_id,
        space_id: object.metadata?.space_id,
        email: object.customer_details?.email ?? null,
      });
    } else if (
      event.type === "customer.subscription.created" ||
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted" ||
      event.type === "invoice.paid" ||
      event.type === "invoice.payment_failed"
    ) {
      const subscriptionId = event.type.startsWith("customer.subscription")
        ? object.id
        : subscriptionIdFromEventObject(object);
      if (subscriptionId) await syncSubscription(subscriptionId);
    }

    await finishEvent(event.id, "completed");
    return Response.json({ received: true });
  } catch (error) {
    console.error("Mend Stripe webhook processing failed", error instanceof Error ? error.message : "unknown");
    await finishEvent(event.id, "failed");
    return new Response("handler error", { status: 500 });
  }
});

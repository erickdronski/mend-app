import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const readSource = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

describe("shared room monetization contract", () => {
  const premium = readSource("src/lib/premium.tsx");
  const journey = readSource("src/app/(tabs)/journey.tsx");
  const paywall = readSource("src/app/plus.tsx");
  const migration = readSource(
    "supabase/migrations/20260724164537_shared_room_subscriptions.sql"
  );
  const checkout = readSource("supabase/functions/mend-checkout/index.ts");
  const webhook = readSource("supabase/functions/mend-stripe-webhook/index.ts");

  it("does not ship with the all-access beta bypass enabled", () => {
    expect(premium).not.toMatch(/PLUS_PREVIEW\s*=\s*true/);
    expect(premium).toMatch(/EXPO_PUBLIC_PLUS_PREVIEW/);
  });

  it("keeps chapter one free and gates later journey chapters", () => {
    expect(journey).toMatch(/!plus && journey\.stage > 1/);
    expect(journey).toMatch(/!plus && stage\.n === 1/);
    expect(paywall).toMatch(/complete first chapter/i);
  });

  it("binds checkout and entitlements to a two-person room", () => {
    expect(checkout).toMatch(/metadata\[space_id\]/);
    expect(checkout).toMatch(/room already has Mend Plus/i);
    expect(migration).toMatch(/create unique index mend_entitlements_space_key/i);
    expect(migration).toMatch(/partner_included boolean/i);
  });

  it("treats signed webhooks as the only paid entitlement writer", () => {
    expect(webhook).toMatch(/constructEventAsync/);
    expect(webhook).toMatch(/mend_billing_events/);
    expect(webhook).toMatch(/provider_subscription_id/);
    expect(premium).not.toMatch(/\.from\("mend_entitlements"\).*\.(insert|upsert|update)/s);
  });

  it("keeps Stripe checkout off native iOS", () => {
    expect(premium).toMatch(/Platform\.OS === "web"/);
    expect(paywall).toMatch(/enabled through the App Store/i);
  });
});

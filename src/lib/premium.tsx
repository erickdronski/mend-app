/**
 * Mend Plus: the premium tier.
 *
 * The deal Mend makes with its users: the spine of the app is free forever.
 * The journey, guided sessions, the safety net, the daily question, and your
 * shared space never sit behind a paywall. Plus unlocks the full breadth
 * (every deck, game, challenge, and complete healing-track programs).
 *
 * Entitlements live server-side in mend_entitlements, read through the
 * mend_my_tier() definer RPC, and cached locally so the tier survives offline
 * starts. Two grant paths: founder grants (email-keyed, never expire) and
 * Stripe subscriptions (user-id-keyed, written ONLY by the Stripe webhook,
 * never by the client). While purchases are disabled, PLUS_PREVIEW unlocks
 * everything so the app can launch as a fully usable free build.
 *
 * Purchase UI is intentionally disabled until the App Store payment rail is
 * settled. The checkout function remains wired for a future Stripe/web path,
 * but this build does not present an external purchase CTA.
 */
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import { supabase } from "./supabase";
import { useAuth } from "./auth";

/** Beta switch: every TestFlight tester sees the full app. Flip to false when
 *  the public launch turns on real purchases (see docs/MONETIZATION.md). */
export const PLUS_PREVIEW = true;

/** Public purchase UI is off until the App Store payment rail is chosen. */
export const PURCHASES_ENABLED = false;

const TIER_KEY = "mend.tier";

export type Tier = "free" | "plus";
export type Plan = "monthly" | "annual";

/**
 * Displayed prices. These MUST match the Stripe prices the checkout function
 * uses (STRIPE_PRICE_MONTHLY / STRIPE_PRICE_ANNUAL); Stripe is the source of
 * truth for what is actually charged, this is only what we render.
 */
export const PRICING = {
  monthly: { amount: "$9.99", cadence: "a month" },
  annual: { amount: "$99", cadence: "a year", perMonth: "$8.25 a month, billed yearly" },
} as const;

type PremiumState = {
  /** The real, server-backed tier (founder grants, Stripe subscriptions). */
  tier: Tier;
  /** Whether Plus content should be open right now (real tier or beta preview). */
  plus: boolean;
  /** True when access comes only from the beta preview, not a real entitlement. */
  previewOnly: boolean;
  refresh: () => Promise<void>;
  /** Opens checkout when purchases are enabled. Resolves to an error string, or null on success. */
  startCheckout: (plan: Plan) => Promise<string | null>;
  /** Whether this build should present a purchase CTA. */
  purchasesEnabled: boolean;
  busy: boolean;
};

const PremiumContext = createContext<PremiumState>({
  tier: "free",
  plus: PLUS_PREVIEW,
  previewOnly: PLUS_PREVIEW,
  refresh: async () => {},
  startCheckout: async () => "Not ready yet.",
  purchasesEnabled: PURCHASES_ENABLED,
  busy: false,
});

export function PremiumProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const [tier, setTier] = useState<Tier>("free");
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    if (!session) {
      setTier("free");
      return;
    }
    try {
      const { data, error } = await supabase.rpc("mend_my_tier");
      if (error) throw error;
      const t: Tier = data === "plus" ? "plus" : "free";
      setTier(t);
      await AsyncStorage.setItem(TIER_KEY, t);
    } catch {
      // Offline or transient: fall back to the cached tier so a founder's
      // Plus never flickers off on a bad connection.
      const cached = await AsyncStorage.getItem(TIER_KEY);
      if (cached === "plus") setTier("plus");
    }
  }, [session]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  /**
   * Ask the server for a checkout URL and open it in the browser.
   * The entitlement is granted by the webhook, never here, so a user cannot
   * self-grant Plus by faking a client response. On return from the browser
   * we re-check the tier.
   */
  const startCheckout = useCallback(
    async (plan: Plan): Promise<string | null> => {
      if (!PURCHASES_ENABLED) return "Purchases are not available in this build.";
      if (!session) return "Something went wrong setting up your account. Try again in a moment.";
      setBusy(true);
      try {
        const { data, error } = await supabase.functions.invoke("mend-checkout", {
          body: { plan },
        });
        if (error) throw error;
        const url = (data as { url?: string })?.url;
        if (!url) throw new Error("No checkout URL came back.");
        await WebBrowser.openBrowserAsync(url);
        // They may have paid; the webhook writes the entitlement server-side.
        // Give it a beat, then re-read the tier.
        await new Promise((r) => setTimeout(r, 1200));
        await refresh();
        return null;
      } catch (e) {
        const msg = e instanceof Error && e.message ? e.message : "";
        return msg || "Checkout could not open. Check your connection and try again.";
      } finally {
        setBusy(false);
      }
    },
    [session, refresh]
  );

  return (
    <PremiumContext.Provider
      value={{
        tier,
        plus: PLUS_PREVIEW || tier === "plus",
        previewOnly: PLUS_PREVIEW && tier !== "plus",
        refresh,
        startCheckout,
        purchasesEnabled: PURCHASES_ENABLED,
        busy,
      }}
    >
      {children}
    </PremiumContext.Provider>
  );
}

export const usePremium = () => useContext(PremiumContext);

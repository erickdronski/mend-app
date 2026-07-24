/**
 * Mend Plus: the premium tier.
 *
 * The deal Mend makes with its users: safety, the private room, starter
 * activities, and journey chapter one are free. Plus unlocks the remaining
 * journey and full content breadth for both partners in that room.
 *
 * Entitlements live server-side in mend_entitlements, read through the
 * mend_my_tier() definer RPC, and cached locally so the tier survives offline
 * starts. Two grant paths: founder grants (email-keyed, never expire) and
 * Stripe subscriptions (payer-owned and room-linked, written ONLY by the
 * Stripe webhook, never by the client). App Store purchases can feed the same
 * provider-neutral entitlement fields once StoreKit products are approved.
 *
 * Stripe purchase UI is web-only. Native iOS remains on the App Store payment
 * rail so room sharing does not create an App Review compliance problem.
 */
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import { supabase } from "./supabase";
import { useAuth } from "./auth";

/** Explicit preview override for internal development only. Public builds use
 * the real room entitlement so the free/Plus experience can be tested. */
export const PLUS_PREVIEW = process.env.EXPO_PUBLIC_PLUS_PREVIEW === "true";

/** Stripe Checkout is web-only. iOS digital access must use StoreKit/IAP. */
export const PURCHASES_ENABLED =
  Platform.OS === "web" && process.env.EXPO_PUBLIC_STRIPE_CHECKOUT_ENABLED === "true";

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
  spaceId: string | null;
  partnerIncluded: boolean;
  canManage: boolean;
  source: string | null;
  status: string | null;
  refresh: () => Promise<void>;
  /** Opens checkout when purchases are enabled. Resolves to an error string, or null on success. */
  startCheckout: (plan: Plan) => Promise<string | null>;
  manageBilling: () => Promise<string | null>;
  /** Whether this build should present a purchase CTA. */
  purchasesEnabled: boolean;
  busy: boolean;
};

const PremiumContext = createContext<PremiumState>({
  tier: "free",
  plus: PLUS_PREVIEW,
  previewOnly: PLUS_PREVIEW,
  spaceId: null,
  partnerIncluded: false,
  canManage: false,
  source: null,
  status: null,
  refresh: async () => {},
  startCheckout: async () => "Not ready yet.",
  manageBilling: async () => "Not ready yet.",
  purchasesEnabled: PURCHASES_ENABLED,
  busy: false,
});

export function PremiumProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const [tier, setTier] = useState<Tier>("free");
  const [access, setAccess] = useState({
    spaceId: null as string | null,
    partnerIncluded: false,
    canManage: false,
    source: null as string | null,
    status: null as string | null,
  });
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    if (!session) {
      setTier("free");
      setAccess({ spaceId: null, partnerIncluded: false, canManage: false, source: null, status: null });
      return;
    }
    const cacheKey = `${TIER_KEY}.${session.user.id}`;
    try {
      const { data, error } = await supabase.rpc("mend_my_access");
      if (error) throw error;
      const row = Array.isArray(data) ? data[0] : data;
      const t: Tier = row?.tier === "plus" ? "plus" : "free";
      setTier(t);
      setAccess({
        spaceId: row?.space_id ?? null,
        partnerIncluded: Boolean(row?.partner_included),
        canManage: Boolean(row?.can_manage),
        source: row?.source ?? null,
        status: row?.status ?? null,
      });
      await AsyncStorage.setItem(cacheKey, t);
    } catch {
      // The cache is scoped to the authenticated user so access can never leak
      // between partners or accounts that share a device.
      const cached = await AsyncStorage.getItem(cacheKey);
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

  const manageBilling = useCallback(async (): Promise<string | null> => {
    if (!PURCHASES_ENABLED) return "Manage an App Store subscription from your Apple ID subscription settings.";
    if (!session) return "Sign in before managing billing.";
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("mend-billing-portal", { method: "POST" });
      if (error) throw error;
      const url = (data as { url?: string })?.url;
      if (!url) throw new Error("No billing portal URL came back.");
      await WebBrowser.openBrowserAsync(url);
      await refresh();
      return null;
    } catch {
      return "Billing management could not open. Check your connection and try again.";
    } finally {
      setBusy(false);
    }
  }, [session, refresh]);

  return (
    <PremiumContext.Provider
      value={{
        tier,
        plus: PLUS_PREVIEW || tier === "plus",
        previewOnly: PLUS_PREVIEW && tier !== "plus",
        spaceId: access.spaceId,
        partnerIncluded: access.partnerIncluded,
        canManage: access.canManage,
        source: access.source,
        status: access.status,
        refresh,
        startCheckout,
        manageBilling,
        purchasesEnabled: PURCHASES_ENABLED,
        busy,
      }}
    >
      {children}
    </PremiumContext.Provider>
  );
}

export const usePremium = () => useContext(PremiumContext);

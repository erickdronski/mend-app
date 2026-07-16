/**
 * Mend Plus: the premium tier.
 *
 * The deal Mend makes with its users: the spine of the app is free forever.
 * The journey, guided sessions, the safety net, the daily question, and your
 * shared space never sit behind a paywall. Plus unlocks the full breadth
 * (every deck, game, challenge, and complete healing-track programs).
 *
 * Entitlements live server-side (mend_entitlements, email-keyed, read through
 * the mend_my_tier() definer RPC), cached locally so the tier survives
 * offline starts. During the TestFlight beta PLUS_PREVIEW unlocks everything
 * for every tester; purchases arrive with the public launch.
 */
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "./supabase";
import { useAuth } from "./auth";

/** Beta switch: every TestFlight tester sees the full app. Flip to false when
 *  App Store purchases go live (see docs/MONETIZATION.md). */
export const PLUS_PREVIEW = true;

const TIER_KEY = "mend.tier";

export type Tier = "free" | "plus";

type PremiumState = {
  /** The real, server-backed tier (founder grants, future purchases). */
  tier: Tier;
  /** Whether Plus content should be open right now (real tier or beta preview). */
  plus: boolean;
  /** True when access comes only from the beta preview, not a real entitlement. */
  previewOnly: boolean;
  refresh: () => Promise<void>;
};

const PremiumContext = createContext<PremiumState>({
  tier: "free",
  plus: PLUS_PREVIEW,
  previewOnly: PLUS_PREVIEW,
  refresh: async () => {},
});

export function PremiumProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const [tier, setTier] = useState<Tier>("free");

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

  return (
    <PremiumContext.Provider
      value={{ tier, plus: PLUS_PREVIEW || tier === "plus", previewOnly: PLUS_PREVIEW && tier !== "plus", refresh }}
    >
      {children}
    </PremiumContext.Provider>
  );
}

export const usePremium = () => useContext(PremiumContext);

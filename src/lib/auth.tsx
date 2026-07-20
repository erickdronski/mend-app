import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "./supabase";

const GUEST_KEY = "mend.guest";

/**
 * Network calls to auth get a hard ceiling. The backend can be slow under
 * load, and a slow anonymous sign-up must never freeze a button: Mend is
 * local-first, so the account is a bonus, never a gate.
 */
function withTimeout<T>(p: Promise<T>, ms = 8000): Promise<T | null> {
  return Promise.race([
    p.catch(() => null),
    new Promise<null>((resolve) => setTimeout(() => resolve(null), ms)),
  ]);
}

/** Best-effort invisible account. Never throws, never blocks a caller. */
async function mintAnonAccount(): Promise<void> {
  try {
    const { data } = await withTimeout(supabase.auth.getSession(), 4000) ?? { data: null };
    if (data?.session) return;
    await withTimeout(supabase.auth.signInAnonymously(), 12000);
  } catch {
    // offline, slow, or rate limited: the app stays fully usable locally and
    // the next launch tries again
  }
}

type AuthState = {
  ready: boolean;
  session: Session | null;
  guest: boolean;
  continueAsGuest: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState>({
  ready: false,
  session: null,
  guest: false,
  continueAsGuest: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [guest, setGuest] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      // getSession reads local storage, but give it a ceiling anyway so a
      // wedged client can never hold the whole app on a blank screen.
      const [sessionRes, guestFlag] = await Promise.all([
        withTimeout(supabase.auth.getSession(), 5000),
        AsyncStorage.getItem(GUEST_KEY),
      ]);
      if (!mounted) return;
      const existing = sessionRes?.data?.session ?? null;
      setSession(existing);
      setGuest(guestFlag === "1");
      setReady(true);
      // A guest from an earlier launch (or a first run where the network was
      // slow) quietly gets an invisible account once the network allows, so
      // the shared space and backup work with no login screen ever.
      if (guestFlag === "1" && !existing) void mintAnonAccount();
    })();
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  /**
   * "No account" mode. Marks the device as guest and returns IMMEDIATELY, so
   * the button never waits on the network. The invisible anonymous account
   * (no email, no password, nothing asked of the user) is minted in the
   * background so two-phone features work; if that fails or is slow, the app
   * is fully usable locally and the next launch retries.
   *
   * Do not make this await the network again: a slow backend then freezes
   * the primary call to action on the sign-in screen.
   */
  async function continueAsGuest() {
    await AsyncStorage.setItem(GUEST_KEY, "1");
    setGuest(true);
    void mintAnonAccount();
  }

  async function signOut() {
    await supabase.auth.signOut();
    await AsyncStorage.removeItem(GUEST_KEY);
    setGuest(false);
  }

  return (
    <AuthContext.Provider value={{ ready, session, guest, continueAsGuest, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

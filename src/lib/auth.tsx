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
      const [{ data }, guestFlag] = await Promise.all([
        supabase.auth.getSession(),
        AsyncStorage.getItem(GUEST_KEY),
      ]);
      if (!mounted) return;
      setSession(data.session);
      setGuest(guestFlag === "1");
      setReady(true);
      // A guest from an earlier launch (or an offline first run) quietly gets
      // an invisible account when the network allows, so the shared space and
      // backup work without any login screen. Best effort, never blocks.
      if (guestFlag === "1" && !data.session) {
        supabase.auth.signInAnonymously().catch(() => {});
      }
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
   * "No account" mode. Marks the device as guest, then tries to mint an
   * invisible anonymous account underneath (nothing asked of the user, no
   * email, no password) so two-phone features still work. If the network
   * says no, the app stays fully usable locally and we retry next launch.
   */
  async function continueAsGuest() {
    await AsyncStorage.setItem(GUEST_KEY, "1");
    setGuest(true);
    try {
      const { data } = await supabase.auth.getSession();
      if (!data.session) await supabase.auth.signInAnonymously();
    } catch {
      // offline or transient: local-only until the next launch retries
    }
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

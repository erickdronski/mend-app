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
    })();
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  async function continueAsGuest() {
    await AsyncStorage.setItem(GUEST_KEY, "1");
    setGuest(true);
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

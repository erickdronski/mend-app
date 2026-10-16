import {
  createContext,
  Fragment,
  useCallback,
  useRef,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "./supabase";

import { activateAccountData, accountDataReadyFor, accountStorageReadyFor, shouldResetAccountView, signOutAccount } from "./account-storage";

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
  const [dataError, setDataError] = useState(false);
  const transition = useRef(0);
  const acceptedSession = useRef<Session | null>(null);
  const [viewRevision, setViewRevision] = useState(0);

  const acceptSession = useCallback(async (next: Session | null) => {
    const revision = ++transition.current;
    const resetView = shouldResetAccountView(acceptedSession.current?.user ?? null, next?.user ?? null);
    if (!accountDataReadyFor(next?.user ?? null)) {
      if (resetView || !accountStorageReadyFor(next?.user ?? null)) setReady(false);
      setDataError(false);
      try {
        await activateAccountData(next?.user ?? null);
      } catch {
        if (revision === transition.current) { setDataError(true); setReady(false); }
        return;
      }
    }
    if (revision !== transition.current) return;
    if (resetView) setViewRevision(value => value + 1);
    acceptedSession.current = next;
    setSession(next);
    setReady(true);
  }, []);

  async function retryLocalData() {
    const result = await withTimeout(supabase.auth.getSession(), 5000);
    if (result?.data && !result.error) await acceptSession(result.data.session);
  }

  useEffect(() => {
    let mounted = true;
    const initialRevision = transition.current;
    (async () => {
      // getSession reads local storage, but give it a ceiling anyway so a
      // wedged client can never hold the whole app on a blank screen.
      const [sessionRes, guestFlag] = await Promise.all([
        withTimeout(supabase.auth.getSession(), 5000),
        AsyncStorage.getItem(GUEST_KEY),
      ]);
      if (!mounted || initialRevision !== transition.current) return;
      if (!sessionRes || sessionRes.error) {
        setDataError(true);
        return;
      }
      const existing = sessionRes.data.session;
      setGuest(guestFlag === "1");
      await acceptSession(existing);
      // A guest from an earlier launch (or a first run where the network was
      // slow) quietly gets an invisible account once the network allows, so
      // the shared space and backup work with no login screen ever.
      if (guestFlag === "1" && !existing) void mintAnonAccount();
    })().catch(() => { if (mounted && initialRevision === transition.current) setDataError(true); });
    const { data: sub } = supabase.auth.onAuthStateChange((event, next) => {
      if (event === "INITIAL_SESSION") return; // the guarded bootstrap owns this event
      // Do not await a Supabase call inside this callback (the auth lock is held).
      if (event === "SIGNED_OUT") {
        setGuest(false);
        void AsyncStorage.removeItem(GUEST_KEY).catch(() => {});
      }
      void acceptSession(next);
    });
    return () => {
      mounted = false;
      transition.current += 1;
      sub.subscription.unsubscribe();
    };
  }, [acceptSession]);

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
    await signOutAccount(() => supabase.auth.signOut(), async () => {
      // Another sign-in may have completed as the SDK released its auth lock.
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        await acceptSession(data.session);
        return;
      }
      await AsyncStorage.removeItem(GUEST_KEY);
      setGuest(false);
      await acceptSession(null);
    });
  }

  return (
    <AuthContext.Provider value={{ ready, session, guest, continueAsGuest, signOut }}>
      {ready ? <Fragment key={viewRevision}>{children}</Fragment> : (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 16 }}>
          {dataError ? (
            <>
              <Text>Mend could not open your local data. Your saved progress has been kept.</Text>
              <Pressable accessibilityRole="button" onPress={retryLocalData}><Text>Try again</Text></Pressable>
            </>
          ) : <ActivityIndicator accessibilityLabel="Opening Mend" />}
        </View>
      )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AppState, Pressable, View, useColorScheme, type AppStateStatus } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { AuthProvider, useAuth } from "@/lib/auth";
import { PremiumProvider } from "@/lib/premium";
import { getLanguage, getProfileForRestore, resumePendingRestore } from "@/lib/store";
import { authenticate, isLockEnabled, subscribeToLockSetting } from "@/lib/lock";
import { createAppLockController, type AppLockState } from "@/lib/app-lock-controller";
import { usePalette, Wordmark } from "@/components/ui";
import { Text } from "@/components/text";
import i18n from "@/lib/i18n";

/**
 * App-lock overlay. When the lock is enabled, the app is covered on cold start
 * and whenever it returns to the foreground until Face ID / passcode passes.
 */
function LockGate({ children }: { children: ReactNode }) {
  const p = usePalette();
  const [{ enabled, locked }, setLockState] = useState<AppLockState>({ enabled: null, locked: true });
  const controller = useRef<ReturnType<typeof createAppLockController> | null>(null);

  useEffect(() => {
    const lock = createAppLockController({ readEnabled: isLockEnabled, authenticate, onState: setLockState });
    controller.current = lock;
    lock.onAppState(AppState.currentState);
    const sub = AppState.addEventListener("change", (state: AppStateStatus) => lock.onAppState(state));
    const unsubscribe = subscribeToLockSetting(() => { void lock.refresh(); });
    return () => { sub.remove(); unsubscribe(); lock.dispose(); controller.current = null; };
  }, []);

  if (enabled === null) return null;

  return (
    <>
      {children}
      {enabled && locked && (
        <View style={{ position: "absolute", inset: 0, backgroundColor: p.surface, alignItems: "center", justifyContent: "center", gap: 20 }}>
          <Wordmark size={34} />
          <Ionicons name="lock-closed" size={40} color={p.muted} />
          <Text style={{ color: p.muted }}>Locked for your privacy</Text>
          <Pressable
            onPress={() => { void controller.current?.unlock(); }}
            style={({ pressed }) => ({ backgroundColor: p.ink, borderRadius: 14, paddingVertical: 14, paddingHorizontal: 32, opacity: pressed ? 0.85 : 1 })}
          >
            <Text style={{ color: p.surface, fontWeight: "700", fontSize: 15 }}>Unlock</Text>
          </Pressable>
        </View>
      )}
    </>
  );
}

/**
 * Route gate: crisis-adjacent app, so the order matters.
 * No identity chosen -> sign-in. No profile -> onboarding (which includes
 * the safety gate). Otherwise the tabs.
 */
function Gate({ children }: { children: ReactNode }) {
  const { ready, session, guest, signOut } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);
  const [restoreError, setRestoreError] = useState(false);
  const [restoreAttempt, setRestoreAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setRestoreError(false);
    (async () => {
      await resumePendingRestore();
      let p = await getProfileForRestore();
      // Signed in on a device with no local profile (reinstall / new phone):
      // pull the backup down before deciding where to route, so the account
      // actually restores progress as promised.
      if (!p && session && !session.user.is_anonymous) {
        const { restoreFromBackup } = await import("@/lib/sync");
        const result = await restoreFromBackup();
        if (cancelled) return;
        if (result === "unavailable" && !session.user.is_anonymous) {
          setRestoreError(true);
          return;
        }
        p = await getProfileForRestore();
      }
      if (!cancelled) setHasProfile(Boolean(p));
    })().catch(() => { if (!cancelled) setRestoreError(true); });
    getLanguage().then((lang) => {
      if (!cancelled && lang && lang !== i18n.language) return i18n.changeLanguage(lang);
    }).catch(() => {});
    return () => { cancelled = true; };
    // re-check when the route or session changes
  }, [segments, session, restoreAttempt]);

  useEffect(() => {
    if (!ready || hasProfile === null) return;
    const first = segments[0] as string | undefined;
    const inAuth = first === "sign-in";
    const inOnboarding = first === "onboarding";
    const inSafety = first === "safety";

    // Profile-first routing. Without a profile on this device, onboarding
    // owns the app no matter who you are: signed-in (reinstall whose backup
    // restore found nothing), signed-out first run, or a guest whose flag
    // survived but whose profile was never written. That last state is the
    // build-12 "crashes after onboarding" bug: the old gate let a fresh
    // guest land on the tabs with no profile, natively fatal. /safety stays
    // reachable always; a signed-out visitor may sit on /sign-in.
    if (!hasProfile) {
      // /sign-in may only hold a signed-out NON-guest (someone restoring an
      // account). A guest who tapped "continue without an account" there must
      // move on to onboarding even before the invisible session lands,
      // otherwise the button reads as dead (the build-16 feedback).
      const allowed = inOnboarding || inSafety || (inAuth && !session && !guest);
      if (!allowed) router.replace("/onboarding");
      return;
    }
    // Fully set up: leave onboarding for the app, and leave the sign-in
    // screen only once a REAL (non-anonymous) session exists, so guests and
    // invisible-account users can sit there to upgrade to email or Apple.
    if (inOnboarding || (inAuth && session && !session.user.is_anonymous)) router.replace("/");
  }, [ready, session, guest, hasProfile, segments, router]);

  if (restoreError && segments[0] !== "safety") return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24, gap: 16 }}>
      <Text>We could not check your account backup. Your local progress is safe. Reconnect and try again to restore this account.</Text>
      <Pressable accessibilityRole="button" onPress={() => setRestoreAttempt(n => n + 1)}><Text>Try again</Text></Pressable>
      <Pressable accessibilityRole="button" onPress={() => { void signOut().catch(() => setRestoreError(true)); }}><Text>Sign out and use local mode</Text></Pressable>
    </View>
  );
  if (hasProfile === null && segments[0] !== "safety") return null;
  return <>{children}</>;
}

function Shell() {
  const p = usePalette();
  const scheme = useColorScheme();
  return (
    <LockGate>
      <StatusBar style={scheme === "dark" ? "light" : "dark"} />
      <Gate>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: p.surface },
            headerTintColor: p.ink,
            headerTitleStyle: { fontWeight: "700" },
            headerShadowVisible: false,
            headerBackButtonDisplayMode: "minimal",
            contentStyle: { backgroundColor: p.surface },
            // Smooth, iOS-native slide with a soft duration. Detail screens
            // glide in from the right; the whole app feels continuous.
            animation: "slide_from_right",
            animationDuration: 280,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="cards" options={{ title: "Card decks" }} />
          <Stack.Screen name="games" options={{ title: "Games" }} />
          <Stack.Screen name="challenges" options={{ title: "7-day challenges" }} />
          <Stack.Screen name="quiz" options={{ title: "How you love & fight" }} />
          <Stack.Screen name="stories" options={{ title: "Stories" }} />
          <Stack.Screen name="library" options={{ title: "Library" }} />
          <Stack.Screen name="insights" options={{ title: "Mend Notes" }} />
          <Stack.Screen name="topics" options={{ title: "Topics" }} />
          <Stack.Screen name="toolkit" options={{ title: "Toolkit" }} />
          <Stack.Screen name="safety" options={{ title: "Get help now" }} />
          <Stack.Screen name="settings" options={{ title: "Settings" }} />
          <Stack.Screen name="plus" options={{ title: "Mend Plus" }} />
          <Stack.Screen name="achievements" options={{ title: "Milestones" }} />
          <Stack.Screen name="space" options={{ title: "Our space" }} />
          <Stack.Screen name="notes" options={{ title: "Little notes" }} />
          <Stack.Screen name="plan" options={{ title: "Our plan" }} />
          <Stack.Screen name="pulse" options={{ title: "Pulse check" }} />
          <Stack.Screen name="tracks/index" options={{ title: "Focused support" }} />
          <Stack.Screen name="tracks/[slug]" options={{ title: "" }} />
        </Stack>
      </Gate>
    </LockGate>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <PremiumProvider>
          <Shell />
        </PremiumProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

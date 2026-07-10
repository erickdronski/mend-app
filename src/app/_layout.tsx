import "@/lib/i18n";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AppState, Pressable, Text, View, useColorScheme, type AppStateStatus } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthProvider, useAuth } from "@/lib/auth";
import { getLanguage, getProfile } from "@/lib/store";
import { authenticate, isLockEnabled } from "@/lib/lock";
import { usePalette } from "@/components/ui";
import i18n from "@/lib/i18n";

/**
 * App-lock overlay. When the lock is enabled, the app is covered on cold start
 * and whenever it returns to the foreground until Face ID / passcode passes.
 */
function LockGate({ children }: { children: ReactNode }) {
  const p = usePalette();
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [locked, setLocked] = useState(true);
  const prompting = useRef(false);

  async function tryUnlock() {
    if (prompting.current) return;
    prompting.current = true;
    const ok = await authenticate();
    prompting.current = false;
    if (ok) setLocked(false);
  }

  useEffect(() => {
    isLockEnabled().then((on) => {
      setEnabled(on);
      if (on) tryUnlock();
      else setLocked(false);
    });
    const sub = AppState.addEventListener("change", (s: AppStateStatus) => {
      isLockEnabled().then((on) => {
        if (!on) return;
        if (s === "background") setLocked(true);
        if (s === "active") tryUnlock();
      });
    });
    return () => sub.remove();
  }, []);

  if (enabled === null) return null;

  return (
    <>
      {children}
      {enabled && locked && (
        <View style={{ position: "absolute", inset: 0, backgroundColor: p.surface, alignItems: "center", justifyContent: "center", gap: 20 }}>
          <Text style={{ fontSize: 34, fontWeight: "800", color: p.ink }}>
            Mend<Text style={{ color: p.ember }}>.</Text>
          </Text>
          <Ionicons name="lock-closed" size={40} color={p.muted} />
          <Text style={{ color: p.muted }}>Locked for your privacy</Text>
          <Pressable
            onPress={tryUnlock}
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
  const { ready, session, guest } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);

  useEffect(() => {
    getProfile().then((p) => setHasProfile(Boolean(p)));
    getLanguage().then((lang) => {
      if (lang && lang !== i18n.language) i18n.changeLanguage(lang);
    });
    // re-check when the route changes (onboarding just saved the profile)
  }, [segments]);

  useEffect(() => {
    if (!ready || hasProfile === null) return;
    const first = segments[0] as string | undefined;
    const inAuth = first === "sign-in";
    const inOnboarding = first === "onboarding";
    const inSafety = first === "safety";
    // Onboarding owns the whole first run (welcome, tour, deal, gate,
    // account, names). Safety stays reachable from the gate step.
    if (!hasProfile || (!session && !guest)) {
      if (!inOnboarding && !inAuth && !inSafety) router.replace("/onboarding");
      return;
    }
    if (inAuth || inOnboarding) router.replace("/");
  }, [ready, session, guest, hasProfile, segments, router]);

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
            contentStyle: { backgroundColor: p.surface },
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
          <Stack.Screen name="topics" options={{ title: "Topics" }} />
          <Stack.Screen name="toolkit" options={{ title: "Toolkit" }} />
          <Stack.Screen name="safety" options={{ title: "Get help now" }} />
          <Stack.Screen name="settings" options={{ title: "Settings" }} />
          <Stack.Screen name="space" options={{ title: "Our space" }} />
          <Stack.Screen name="notes" options={{ title: "Little notes" }} />
          <Stack.Screen name="plan" options={{ title: "Our plan" }} />
          <Stack.Screen name="pulse" options={{ title: "Pulse check" }} />
          <Stack.Screen name="tracks/index" options={{ title: "Healing tracks" }} />
          <Stack.Screen name="tracks/[slug]" options={{ title: "" }} />
        </Stack>
      </Gate>
    </LockGate>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  );
}

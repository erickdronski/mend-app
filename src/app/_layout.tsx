import "@/lib/i18n";
import { useEffect, useState, type ReactNode } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { AuthProvider, useAuth } from "@/lib/auth";
import { getLanguage, getProfile } from "@/lib/store";
import { usePalette } from "@/components/ui";
import i18n from "@/lib/i18n";

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
    if (!session && !guest) {
      if (!inAuth) router.replace("/sign-in");
      return;
    }
    if (!hasProfile) {
      if (!inOnboarding) router.replace("/onboarding");
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
    <>
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
          <Stack.Screen name="pulse" options={{ title: "Pulse check" }} />
          <Stack.Screen name="tracks/index" options={{ title: "Healing tracks" }} />
          <Stack.Screen name="tracks/[slug]" options={{ title: "" }} />
        </Stack>
      </Gate>
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  );
}

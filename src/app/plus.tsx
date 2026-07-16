/**
 * Mend Plus: the paywall that keeps the promise. The free tier is stated
 * first and stays generous; Plus is breadth, not rescue. No purchase flow
 * yet: during the beta everything is unlocked, and this screen says so
 * honestly instead of showing dead price buttons.
 */
import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePremium } from "@/lib/premium";
import { useAuth } from "@/lib/auth";
import { useRouter } from "expo-router";
import { Card, Chip, Eyebrow, Hero, IconChip, Muted, P, Screen, usePalette } from "@/components/ui";
import { Reveal } from "@/components/motion";

const FREE_FOREVER: { icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { icon: "trail-sign-outline", label: "The five-stage journey, start to graduation" },
  { icon: "chatbubbles-outline", label: "Guided sessions with the timed floor" },
  { icon: "medkit-outline", label: "The safety net: crisis lines, red flags, get-help-now" },
  { icon: "sunny-outline", label: "The daily question and your shared space" },
  { icon: "heart-outline", label: "Love notes, your plan, and pulse checks" },
];

const PLUS_ADDS: { icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { icon: "albums-outline", label: "Every card deck. First Steps and Repair stay free" },
  { icon: "dice-outline", label: "The full game shelf and every 7-day challenge" },
  { icon: "map-outline", label: "Complete healing-track programs. First sessions and red flags stay free" },
  { icon: "leaf-outline", label: "Everything new we build, first" },
];

export default function Plus() {
  const p = usePalette();
  const router = useRouter();
  const { session } = useAuth();
  const { tier, previewOnly } = usePremium();

  return (
    <Screen>
      <Hero
        hue="ember"
        eyebrow="Mend Plus"
        title="The whole toolbox, for the long seasons"
        sub="The heart of Mend is free forever. Plus opens the full breadth."
        style={{ marginTop: 12 }}
      >
        <View style={{ marginTop: 14, flexDirection: "row", gap: 8 }}>
          {tier === "plus" ? (
            <Chip label="Founding member, Plus is yours" hue="honey" icon="ribbon-outline" />
          ) : previewOnly ? (
            <Chip label="Free during the beta" hue="honey" icon="flask-outline" />
          ) : null}
        </View>
      </Hero>

      <Reveal index={0} style={{ marginTop: 20 }}>
        <Eyebrow hue="moss">Free forever, no exceptions</Eyebrow>
        <Card style={{ marginTop: 8, gap: 12 }}>
          {FREE_FOREVER.map((f) => (
            <View key={f.label} style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <IconChip name={f.icon} hue="moss" size={32} />
              <P style={{ flex: 1, fontSize: 14 }}>{f.label}</P>
            </View>
          ))}
        </Card>
        <Muted style={{ marginTop: 8, fontSize: 12.5 }}>
          Money never gates safety. If you can&apos;t pay, the parts that keep a marriage alive are still yours.
        </Muted>
      </Reveal>

      <Reveal index={1} style={{ marginTop: 22 }}>
        <Eyebrow hue="ember">What Plus adds</Eyebrow>
        <Card style={{ marginTop: 8, gap: 12, borderColor: p.hues.ember.accent }}>
          {PLUS_ADDS.map((f) => (
            <View key={f.label} style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <IconChip name={f.icon} hue="ember" size={32} />
              <P style={{ flex: 1, fontSize: 14 }}>{f.label}</P>
            </View>
          ))}
        </Card>
      </Reveal>

      <Reveal index={2} style={{ marginTop: 22 }}>
        {tier === "plus" ? (
          <Card tone="fern">
            <P style={{ fontSize: 14 }}>
              You hold a founding entitlement on this account. Everything above is unlocked for you, permanently.
            </P>
          </Card>
        ) : (
          <Card tone="panel">
            <P style={{ fontSize: 14 }}>
              {previewOnly
                ? "While Mend is in beta, Plus is unlocked for every tester. Pricing arrives with the public launch, and it will stay a fraction of one counseling session."
                : "Purchases aren't available yet in this version."}
            </P>
            {!session ? (
              <Pressable onPress={() => router.push("/sign-in")}>
                <Muted style={{ marginTop: 10, textDecorationLine: "underline" }}>
                  Create a free account so your access follows you
                </Muted>
              </Pressable>
            ) : null}
          </Card>
        )}
      </Reveal>
    </Screen>
  );
}

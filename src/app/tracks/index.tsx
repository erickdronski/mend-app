import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { tracks } from "@/lib/content/tracks";
import { Card, Chip, Hero, IconChip, Muted, Screen, usePalette } from "@/components/ui";
import { Press, Reveal } from "@/components/motion";

/** One icon per wound, echoing the situation icons from onboarding. */
const trackIcon: Record<string, keyof typeof Ionicons.glyphMap> = {
  affair: "heart-dislike-outline",
  "pregnancy-loss": "rainy-outline",
  grief: "flower-outline",
  illness: "medkit-outline",
  "money-crisis": "wallet-outline",
  "new-baby": "moon-outline",
  "desire-gap": "flame-outline",
  blended: "people-outline",
  "faith-gap": "compass-outline",
  caregiving: "umbrella-outline",
  scarcity: "cash-outline",
};

export default function Tracks() {
  const p = usePalette();
  const router = useRouter();
  return (
    <Screen>
      <Hero
        hue="plum"
        eyebrow="Focused support"
        title="Extra guidance for a specific season"
        sub="Some situations benefit from a clearer map and more focused conversations."
        style={{ marginTop: 4 }}
      />
      {/* This line is a promise, not decoration. It stays visible. */}
      <Muted style={{ marginTop: 10 }}>
        Each track says when a licensed professional is the right next step.
      </Muted>
      <View style={{ marginTop: 16, gap: 12 }}>
        {tracks.map((t, i) => (
          <Reveal key={t.slug} index={i + 1}>
            <Press onPress={() => router.push(`/tracks/${t.slug}`)}>
              <Card>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <IconChip name={trackIcon[t.slug] ?? "map-outline"} hue="plum" size={36} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: "700", color: p.ink }}>{t.title}</Text>
                    <Muted numberOfLines={1} style={{ marginTop: 2 }}>
                      {t.subtitle}
                    </Muted>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={p.muted} />
                </View>
                <Muted numberOfLines={2} style={{ marginTop: 10 }}>
                  {t.overview}
                </Muted>
                <Chip
                  label={`${t.sessions.length} conversations`}
                  hue="plum"
                  icon="chatbubbles-outline"
                  style={{ marginTop: 10 }}
                />
              </Card>
            </Press>
          </Reveal>
        ))}
      </View>
    </Screen>
  );
}

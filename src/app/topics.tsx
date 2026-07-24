import { View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { topicCategories, topics } from "@/lib/content/topics";
import { Card, Chip, Eyebrow, Hero, IconChip, Muted, Screen, usePalette } from "@/components/ui";
import { Text } from "@/components/text";
import { Press, Reveal } from "@/components/motion";

/** One icon per category so a scan of the list reads as places, not text. */
const categoryIcon: Record<string, keyof typeof Ionicons.glyphMap> = {
  Reconnection: "heart-outline",
  "Daily Life": "home-outline",
  Intimacy: "flame-outline",
  Money: "wallet-outline",
  Family: "people-outline",
  Repair: "bandage-outline",
  "The Future": "compass-outline",
};

export default function Topics() {
  const p = usePalette();
  const router = useRouter();

  // Precompute per-category groups plus a running index for staggered reveals.
  const groups = topicCategories.reduce<{ cat: string; items: typeof topics; start: number }[]>((acc, cat) => {
    const items = topics.filter((t) => t.category === cat);
    const previous = acc.at(-1);
    const start = previous ? previous.start + previous.items.length : 1;
    return [...acc, { cat, items, start }];
  }, []);

  return (
    <Screen>
      <Hero
        hue="moss"
        eyebrow="Talk it out"
        title="Conversations worth making room for"
        sub="Pick one and Mend gives both of you a clear, balanced way through it."
        style={{ marginTop: 4 }}
      />
      {groups.map((g) => (
        <View key={g.cat} style={{ marginTop: 22 }}>
          <Eyebrow hue="moss">{g.cat}</Eyebrow>
          <View style={{ marginTop: 8, gap: 10 }}>
            {g.items.map((t, i) => (
              <Reveal key={t.id} index={g.start + i}>
                <Press onPress={() => router.push(`/talk?topic=${t.id}`)}>
                  <Card>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                      <IconChip name={categoryIcon[g.cat] ?? "chatbubbles-outline"} hue="moss" size={34} />
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 15.5, fontWeight: "700", color: p.ink }}>{t.title}</Text>
                        <Muted numberOfLines={1} style={{ marginTop: 2, fontStyle: "italic", fontSize: 12.5 }}>
                          {t.opener}
                        </Muted>
                      </View>
                      <Ionicons name="chevron-forward" size={16} color={p.muted} />
                    </View>
                    <Chip
                      label={`${t.prompts.length} prompts`}
                      hue="moss"
                      icon="chatbox-ellipses-outline"
                      style={{ marginTop: 10 }}
                    />
                  </Card>
                </Press>
              </Reveal>
            ))}
          </View>
        </View>
      ))}
    </Screen>
  );
}

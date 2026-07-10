import { Pressable, View } from "react-native";
import { useRouter, type Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Card, H1, H2, Muted, P, Screen, usePalette } from "@/components/ui";

const items: { href: Href; icon: keyof typeof Ionicons.glyphMap; title: string; body: string }[] = [
  {
    href: "/cards",
    icon: "albums-outline",
    title: "Card decks",
    body: "Six decks at six temperatures, from questions a guarded person can answer in one sentence to the ones you've been circling for years.",
  },
  {
    href: "/games",
    icon: "dice-outline",
    title: "Games",
    body: "Do you still know me?, would-you-rather dilemmas, and memory-lane storytelling. Curiosity disguised as competition.",
  },
  {
    href: "/challenges",
    icon: "calendar-outline",
    title: "7-day challenges",
    body: "One small act a day: turning toward, appreciation, repair, and a week for couples on their last thread.",
  },
];

export default function Play() {
  const p = usePalette();
  const router = useRouter();
  return (
    <Screen>
      <H1 style={{ marginTop: 12 }}>Play your way back</H1>
      <P style={{ marginTop: 10 }}>
        Struggling couples don&apos;t just need harder conversations. They need easier ones:
        curiosity, laughter, and the old stories retold. None of these require a good mood to
        start.
      </P>
      <View style={{ marginTop: 20, gap: 12 }}>
        {items.map((it) => (
          <Pressable key={String(it.href)} onPress={() => router.push(it.href)}>
            <Card>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <Ionicons name={it.icon} size={22} color={p.moss} />
                <H2>{it.title}</H2>
              </View>
              <Muted style={{ marginTop: 8 }}>{it.body}</Muted>
            </Card>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

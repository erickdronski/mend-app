import { Pressable, View } from "react-native";
import { useRouter } from "expo-router";
import { topicCategories, topics } from "@/lib/content/topics";
import { Card, H1, H2, Muted, P, Screen, usePalette } from "@/components/ui";
import { Text } from "react-native";

export default function Topics() {
  const p = usePalette();
  const router = useRouter();
  return (
    <Screen>
      <H1 style={{ marginTop: 8 }}>The talks you keep not having</H1>
      <P style={{ marginTop: 10 }}>
        Every topic comes with a soft way to begin (how a conversation starts is usually how it
        ends) and questions the speaker can lean on. Pick one and it becomes tonight&apos;s
        guided session.
      </P>
      {topicCategories.map((cat) => (
        <View key={cat} style={{ marginTop: 22 }}>
          <Muted style={{ textTransform: "uppercase", letterSpacing: 1.5, fontWeight: "700", color: p.mossDeep }}>
            {cat}
          </Muted>
          <View style={{ marginTop: 8, gap: 10 }}>
            {topics
              .filter((t) => t.category === cat)
              .map((t) => (
                <Pressable key={t.id} onPress={() => router.push(`/talk?topic=${t.id}`)}>
                  <Card>
                    <H2>{t.title}</H2>
                    <Muted style={{ marginTop: 6 }}>{t.why}</Muted>
                    <View style={{ backgroundColor: p.panel, borderRadius: 10, padding: 10, marginTop: 10 }}>
                      <Muted style={{ fontStyle: "italic" }}>{t.opener}</Muted>
                    </View>
                    <Text style={{ color: p.ember, fontWeight: "600", marginTop: 10, fontSize: 14 }}>
                      Have this conversation →
                    </Text>
                  </Card>
                </Pressable>
              ))}
          </View>
        </View>
      ))}
    </Screen>
  );
}

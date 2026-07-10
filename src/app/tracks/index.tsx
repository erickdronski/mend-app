import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { tracks } from "@/lib/content/tracks";
import { Card, H1, H2, Muted, P, Screen, usePalette, pressFx } from "@/components/ui";

export default function Tracks() {
  const p = usePalette();
  const router = useRouter();
  return (
    <Screen>
      <H1 style={{ marginTop: 8 }}>For the marriages carrying something heavy</H1>
      <P style={{ marginTop: 10 }}>
        Some seasons are too big for better communication habits alone. They need a map. Each
        track walks you through a sequence of guided conversations built for that specific wound,
        and is honest about the moments where a licensed professional is the right next step.
      </P>
      <View style={{ marginTop: 18, gap: 12 }}>
        {tracks.map((t) => (
          <Pressable key={t.slug} onPress={() => router.push(`/tracks/${t.slug}`)} style={pressFx}>
            <Card>
              <H2>{t.title}</H2>
              <Muted style={{ marginTop: 2, color: p.mossDeep, fontWeight: "600" }}>{t.subtitle}</Muted>
              <Muted style={{ marginTop: 8 }} numberOfLines={3}>
                {t.overview}
              </Muted>
              <Text style={{ color: p.ember, fontWeight: "600", marginTop: 10, fontSize: 14 }}>
                {t.sessions.length} guided conversations →
              </Text>
            </Card>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

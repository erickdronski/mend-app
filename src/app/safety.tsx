import { Linking, Pressable, Text, View } from "react-native";
import { crisisResources, therapyResources, whyGateMatters } from "@/lib/content/safety";
import { Card, H1, H2, Muted, P, Screen, usePalette } from "@/components/ui";

export default function Safety() {
  const p = usePalette();
  return (
    <Screen>
      <H1 style={{ marginTop: 8 }}>Real humans, right now, free</H1>
      <P style={{ marginTop: 10 }}>{whyGateMatters}</P>

      <H2 style={{ marginTop: 22 }}>If you need someone tonight</H2>
      <View style={{ marginTop: 10, gap: 10 }}>
        {crisisResources.map((r) => (
          <Card key={r.name} style={{ borderColor: p.ember }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", gap: 4 }}>
              <Text style={{ fontWeight: "700", color: p.ink, fontSize: 15, flex: 1 }}>{r.name}</Text>
            </View>
            <Text style={{ color: p.ember, fontWeight: "700", marginTop: 4, fontSize: 14 }}>{r.contact}</Text>
            <Muted style={{ marginTop: 6 }}>{r.body}</Muted>
            {r.url && (
              <Pressable onPress={() => Linking.openURL(r.url!)}>
                <Text style={{ color: p.ember, textDecorationLine: "underline", marginTop: 8, fontSize: 13 }}>
                  {r.url.replace("https://", "")}
                </Text>
              </Pressable>
            )}
          </Card>
        ))}
      </View>

      <H2 style={{ marginTop: 24 }}>Finding real counseling without real money</H2>
      <Muted style={{ marginTop: 6 }}>
        Mend exists because therapy is expensive. But when a marriage needs a professional, there
        are more affordable doors than most people know about.
      </Muted>
      <View style={{ marginTop: 10, gap: 10 }}>
        {therapyResources.map((r) => (
          <Card key={r.name}>
            <Text style={{ fontWeight: "700", color: p.ink, fontSize: 15 }}>{r.name}</Text>
            <Muted style={{ marginTop: 2, color: p.mossDeep }}>{r.contact}</Muted>
            <Muted style={{ marginTop: 6 }}>{r.body}</Muted>
            {r.url && (
              <Pressable onPress={() => Linking.openURL(r.url!)}>
                <Text style={{ color: p.ember, textDecorationLine: "underline", marginTop: 8, fontSize: 13 }}>
                  {r.url.replace("https://", "")}
                </Text>
              </Pressable>
            )}
          </Card>
        ))}
      </View>
    </Screen>
  );
}

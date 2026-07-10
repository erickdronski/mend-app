import { Linking, Pressable, Text, View } from "react-native";
import { books, freeResources, podcasts } from "@/lib/content/library";
import { Card, H1, H2, Muted, P, Screen, usePalette, pressFx } from "@/components/ui";

export default function Library() {
  const p = usePalette();
  return (
    <Screen>
      <H1 style={{ marginTop: 8 }}>The shelf that helps</H1>
      <P style={{ marginTop: 10 }}>
        The books working therapists actually recommend, programs that cost nothing, and voices
        worth having in your ears. No affiliate links, no sponsorships, just the shortlist.
      </P>

      <H2 style={{ marginTop: 22 }}>Books</H2>
      <View style={{ marginTop: 10, gap: 10 }}>
        {books.map((b) => (
          <Card key={b.title}>
            <H2 style={{ fontSize: 17 }}>{b.title}</H2>
            <Muted style={{ marginTop: 2 }}>{b.author}</Muted>
            <Text style={{ color: p.ember, fontWeight: "700", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginTop: 8 }}>
              {b.forWhom}
            </Text>
            <Muted style={{ marginTop: 6 }}>{b.why}</Muted>
          </Card>
        ))}
      </View>
      <Muted style={{ marginTop: 8 }}>
        Most of these are at your public library for free, including audiobook editions on Libby.
      </Muted>

      <H2 style={{ marginTop: 24 }}>Free and nearly free</H2>
      <View style={{ marginTop: 10, gap: 10 }}>
        {freeResources.map((r) => (
          <Pressable key={r.name} onPress={() => Linking.openURL(r.url)} style={pressFx}>
            <Card>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontWeight: "700", color: p.ink, fontSize: 15, flex: 1 }}>{r.name}</Text>
                <Text style={{ color: p.ember, fontSize: 13 }}>Open →</Text>
              </View>
              <Muted style={{ marginTop: 6 }}>{r.what}</Muted>
            </Card>
          </Pressable>
        ))}
      </View>

      <H2 style={{ marginTop: 24 }}>Podcasts</H2>
      <View style={{ marginTop: 10, gap: 10 }}>
        {podcasts.map((pod) => (
          <Card key={pod.name} tone="panel">
            <Text style={{ fontWeight: "700", color: p.ink, fontSize: 15 }}>{pod.name}</Text>
            <Muted style={{ marginTop: 2 }}>{pod.hosts}</Muted>
            <Muted style={{ marginTop: 6 }}>{pod.why}</Muted>
          </Card>
        ))}
      </View>
    </Screen>
  );
}

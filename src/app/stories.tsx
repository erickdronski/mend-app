import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { stories, storiesNote } from "@/lib/content/stories";
import { Card, H1, H2, Muted, P, Screen, usePalette, pressFx } from "@/components/ui";

export default function Stories() {
  const p = usePalette();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <Screen>
      <H1 style={{ marginTop: 8 }}>What finding a way through actually looks like</H1>
      <P style={{ marginTop: 10 }}>
        Not fairy tales. These couples fought ugly, drifted for years, broke things that mattered,
        and then made small, repeatable choices in the other direction. Read the ones that feel
        uncomfortably familiar.
      </P>
      <Card tone="panel" style={{ marginTop: 12 }}>
        <Muted>{storiesNote}</Muted>
      </Card>

      <View style={{ marginTop: 16, gap: 12 }}>
        {stories.map((s) => {
          const isOpen = open === s.id;
          return (
            <Card key={s.id}>
              <Pressable onPress={() => setOpen(isOpen ? null : s.id)} style={pressFx}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
                  <H2 style={{ flex: 1 }}>{s.title}</H2>
                  <Muted>{s.years}</Muted>
                </View>
                <Muted style={{ marginTop: 6 }}>{s.situation}</Muted>
                {!isOpen && (
                  <Text style={{ color: p.ember, fontWeight: "600", marginTop: 8, fontSize: 14 }}>
                    Read their story →
                  </Text>
                )}
              </Pressable>
              {isOpen && (
                <View style={{ marginTop: 12, gap: 12 }}>
                  <View style={{ backgroundColor: p.panel, borderRadius: 10, padding: 12 }}>
                    <Text style={{ fontWeight: "700", color: p.mossDeep, fontSize: 12.5 }}>One side of the bed</Text>
                    <P style={{ marginTop: 6, fontStyle: "italic", fontSize: 14 }}>{s.oneView}</P>
                  </View>
                  <View style={{ backgroundColor: p.panel, borderRadius: 10, padding: 12 }}>
                    <Text style={{ fontWeight: "700", color: p.mossDeep, fontSize: 12.5 }}>The other side</Text>
                    <P style={{ marginTop: 6, fontStyle: "italic", fontSize: 14 }}>{s.otherView}</P>
                  </View>
                  <View>
                    <Text style={{ fontWeight: "700", color: p.ink, fontSize: 14.5 }}>The turn</Text>
                    <P style={{ marginTop: 4, fontSize: 14 }}>{s.turning}</P>
                  </View>
                  <View>
                    <Text style={{ fontWeight: "700", color: p.ink, fontSize: 14.5 }}>What helped</Text>
                    {s.whatHelped.map((w) => (
                      <View key={w.practice} style={{ marginTop: 8 }}>
                        <Text style={{ fontWeight: "600", color: p.ink, fontSize: 13.5 }}>{w.practice}</Text>
                        <Muted style={{ marginTop: 2 }}>{w.how}</Muted>
                      </View>
                    ))}
                  </View>
                  <View style={{ borderLeftWidth: 2, borderLeftColor: p.moss, paddingLeft: 12 }}>
                    <P style={{ fontSize: 14 }}>{s.where}</P>
                  </View>
                </View>
              )}
            </Card>
          );
        })}
      </View>
    </Screen>
  );
}

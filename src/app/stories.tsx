import { useState } from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { stories, storiesNote } from "@/lib/content/stories";
import { Card, Chip, Hero, IconChip, Muted, P, Screen, usePalette } from "@/components/ui";
import { Text } from "@/components/text";
import { Press, Reveal } from "@/components/motion";

export default function Stories() {
  const p = usePalette();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <Screen>
      <Hero
        hue="sky"
        eyebrow="Stories"
        title="Relationships in real life"
        sub="Composite stories about patterns, turning points, and what helped."
        style={{ marginTop: 4 }}
      />
      {/* Honesty disclosure: these are composite teaching stories. Stays visible. */}
      <Reveal index={0}>
        <Card tone="panel" style={{ marginTop: 12, padding: 12 }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Ionicons name="information-circle-outline" size={16} color={p.muted} style={{ marginTop: 1 }} />
            <Muted style={{ flex: 1, fontSize: 12, lineHeight: 17 }}>{storiesNote}</Muted>
          </View>
        </Card>
      </Reveal>

      <View style={{ marginTop: 16, gap: 12 }}>
        {stories.map((s, i) => {
          const isOpen = open === s.id;
          return (
            <Reveal key={s.id} index={i + 1}>
              <Card>
                <Press onPress={() => setOpen(isOpen ? null : s.id)}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                    <IconChip name="people-outline" hue="sky" size={34} />
                    <Text style={{ flex: 1, fontSize: 16, fontWeight: "700", color: p.ink }}>{s.title}</Text>
                    <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={16} color={p.muted} />
                  </View>
                  <Muted numberOfLines={isOpen ? undefined : 2} style={{ marginTop: 8 }}>
                    {s.situation}
                  </Muted>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 10 }}>
                    <Chip label={s.years} hue="sky" icon="time-outline" />
                    {!isOpen && (
                      <Text style={{ color: p.ember, fontWeight: "600", fontSize: 13 }}>Read their story →</Text>
                    )}
                  </View>
                </Press>
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
            </Reveal>
          );
        })}
      </View>
    </Screen>
  );
}

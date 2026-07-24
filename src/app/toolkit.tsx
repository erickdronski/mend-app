import { useState } from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { techniques } from "@/lib/content/techniques";
import { Card, Chip, Hero, IconChip, Muted, P, Screen, usePalette } from "@/components/ui";
import { Text } from "@/components/text";
import { Press, Reveal } from "@/components/motion";

/** One icon per skill so the accordion scans as a toolbox, not a syllabus. */
const techniqueIcon: Record<string, keyof typeof Ionicons.glyphMap> = {
  "soft-startup": "leaf-outline",
  "four-horsemen": "warning-outline",
  "speaker-listener": "swap-horizontal-outline",
  nvc: "chatbox-ellipses-outline",
  "repair-attempts": "bandage-outline",
  flooding: "water-outline",
  validation: "ear-outline",
  attachment: "link-outline",
  bids: "hand-left-outline",
};

export default function Toolkit() {
  const p = usePalette();
  const [open, setOpen] = useState<string | null>(techniques[0]?.id ?? null);

  return (
    <Screen>
      <Hero
        hue="sky"
        eyebrow="Learn the craft"
        title="How to say hard things to someone you love"
        sub={`${techniques.length} skills counselors actually use. Name the pattern, disarm it.`}
        style={{ marginTop: 4 }}
      />
      <View style={{ marginTop: 18, gap: 10 }}>
        {techniques.map((t, i) => {
          const isOpen = open === t.id;
          return (
            <Reveal key={t.id} index={i + 1}>
              <Card>
                <Press onPress={() => setOpen(isOpen ? null : t.id)}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                    <IconChip name={techniqueIcon[t.id] ?? "school-outline"} hue="sky" size={34} />
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 15.5, fontWeight: "700", color: p.ink }}>{t.title}</Text>
                      <Muted
                        numberOfLines={isOpen ? undefined : 1}
                        style={{ marginTop: 2, fontStyle: "italic", fontSize: 12.5 }}
                      >
                        {t.tagline}
                      </Muted>
                    </View>
                    <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={16} color={p.muted} />
                  </View>
                  {!isOpen && <Chip label={`${t.steps.length} steps`} hue="sky" style={{ marginTop: 10 }} />}
                </Press>
                {isOpen && (
                  <View style={{ marginTop: 12, gap: 10 }}>
                    <P style={{ fontSize: 14 }}>
                      <Text style={{ fontWeight: "700" }}>When to use it: </Text>
                      {t.whenToUse}
                    </P>
                    {t.steps.map((s, j) => (
                      <P key={j} style={{ fontSize: 14 }}>
                        {j + 1}. {s}
                      </P>
                    ))}
                    <View style={{ backgroundColor: p.panel, borderRadius: 10, padding: 12 }}>
                      {t.example.instead && (
                        <Muted style={{ color: p.emberDeep }}>
                          Instead of <Text style={{ fontStyle: "italic" }}>{t.example.instead}</Text>
                        </Muted>
                      )}
                      <Muted style={{ color: p.mossDeep, marginTop: t.example.instead ? 8 : 0 }}>
                        Try <Text style={{ fontStyle: "italic" }}>{t.example.try}</Text>
                      </Muted>
                    </View>
                    <P style={{ fontSize: 14 }}>
                      <Text style={{ fontWeight: "700" }}>Watch out: </Text>
                      {t.watchOut}
                    </P>
                    <Muted>From: {t.source}</Muted>
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

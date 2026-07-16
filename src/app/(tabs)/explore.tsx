import { useCallback, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useFocusEffect, useRouter, type Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getProfile } from "@/lib/store";
import { getSituation, type SituationDef } from "@/lib/situation";
import type { Hue } from "@/lib/theme";
import { Card, Chip, Eyebrow, Hero, IconChip, Muted, Screen, usePalette } from "@/components/ui";
import { Press, Reveal } from "@/components/motion";

type Row = { href: Href; icon: keyof typeof Ionicons.glyphMap; title: string; sub: string };
type Section = { key: string; title: string; hue: Hue; heavy?: boolean; rows: Row[] };

const sections: Section[] = [
  {
    key: "talk",
    title: "Talk it out",
    hue: "moss",
    rows: [
      { href: "/talk", icon: "chatbubbles-outline", title: "Guided session", sub: "The timed floor" },
      { href: "/topics", icon: "chatbox-ellipses-outline", title: "Conversation topics", sub: "Soft ways in" },
    ],
  },
  {
    key: "play",
    title: "Play together",
    hue: "honey",
    rows: [
      { href: "/cards", icon: "albums-outline", title: "Card decks", sub: "Six decks" },
      { href: "/games", icon: "dice-outline", title: "Games", sub: "Guess, dare, remember" },
      { href: "/challenges", icon: "calendar-outline", title: "7-day challenges", sub: "One small act a day" },
    ],
  },
  {
    key: "learn",
    title: "Learn the craft",
    hue: "sky",
    rows: [
      { href: "/toolkit", icon: "construct-outline", title: "Communication toolkit", sub: "Nine real skills" },
      { href: "/quiz", icon: "help-circle-outline", title: "How you love & fight", sub: "Your lens and role" },
      { href: "/stories", icon: "people-outline", title: "Stories", sub: "Couples who made it" },
      { href: "/library", icon: "library-outline", title: "Library", sub: "Books, programs, podcasts" },
    ],
  },
  {
    key: "path",
    title: "Your path",
    hue: "ember",
    rows: [
      { href: "/plan", icon: "heart-outline", title: "Our plan", sub: "Rituals and commitments" },
      { href: "/pulse", icon: "pulse-outline", title: "Pulse check", sub: "Five honest numbers" },
    ],
  },
  {
    key: "heavy",
    title: "When it's heavy",
    hue: "plum",
    heavy: true,
    rows: [
      { href: "/tracks", icon: "map-outline", title: "Healing tracks", sub: "Affair, loss, illness, money, baby" },
      { href: "/safety", icon: "medkit-outline", title: "Get help now", sub: "Crisis lines and low-cost counseling" },
    ],
  },
];

export default function Explore() {
  const p = usePalette();
  const router = useRouter();
  const [sit, setSit] = useState<SituationDef | undefined>(undefined);

  useFocusEffect(
    useCallback(() => {
      getProfile().then((prof) => setSit(getSituation(prof?.situation)));
    }, [])
  );

  // For light situations (drift / just-us) push the heavy section to the bottom;
  // for heavy situations surface it near the top. Safety stays inside it always.
  const ordered = [...sections].sort((a, b) => {
    if (a.heavy && !b.heavy) return sit?.heavy ? -0.5 : 1;
    if (b.heavy && !a.heavy) return sit?.heavy ? 0.5 : -1;
    return 0;
  });

  return (
    <Screen safeTop>
      <Hero hue="moss" title="Explore" sub="Everything Mend offers, whenever you want it." style={{ marginTop: 4 }} />

      {/* Personalized track shortcut */}
      {sit?.track ? (
        <Reveal index={0}>
          <Press onPress={() => router.push(`/tracks/${sit.track}` as Href)}>
            <Card tone="fern" style={{ marginTop: 16 }}>
              <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
                <IconChip name={sit.icon} hue="plum" size={44} />
                <View style={{ flex: 1 }}>
                  <Eyebrow hue="plum" style={{ fontSize: 11 }}>Your track</Eyebrow>
                  <Text style={{ marginTop: 3, fontSize: 16, fontWeight: "700", color: p.ink }}>{sit.trackTitle}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={p.muted} />
              </View>
              <Chip label="For what you're carrying" hue="plum" icon="heart-outline" style={{ marginTop: 10 }} />
            </Card>
          </Press>
        </Reveal>
      ) : null}

      {ordered.map((section, si) => (
        <Reveal key={section.key} index={si + 1} style={{ marginTop: 22 }}>
          <Eyebrow hue={section.hue}>{section.title}</Eyebrow>
          <Card style={{ marginTop: 8, paddingVertical: 4, paddingHorizontal: 4 }}>
            {section.rows.map((row, i) => (
              <Pressable
                key={String(row.href)}
                onPress={() => router.push(row.href)}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  padding: 12,
                  borderRadius: 12,
                  backgroundColor: pressed ? p.panel : "transparent",
                  borderTopWidth: i === 0 ? 0 : 1,
                  borderTopColor: p.line,
                })}
              >
                <IconChip name={row.icon} hue={section.hue} size={34} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, fontWeight: "600", color: p.ink }}>{row.title}</Text>
                  <Muted style={{ fontSize: 12.5, marginTop: 1 }}>{row.sub}</Muted>
                </View>
                <Ionicons name="chevron-forward" size={16} color={p.muted} />
              </Pressable>
            ))}
          </Card>
        </Reveal>
      ))}
    </Screen>
  );
}

import { useCallback, useState } from "react";
import { Pressable, View } from "react-native";
import { useFocusEffect, useRouter, type Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  getChallengesDone,
  getJourney,
  getPlan,
  getProfile,
  getPulses,
  getRecommendationHistory,
  getSessions,
} from "@/lib/store";
import { getRecommendations, type Recommendation } from "@/lib/recommendations";
import { getSituation, type SituationDef } from "@/lib/situation";
import type { Hue } from "@/lib/theme";
import { Card, Chip, Eyebrow, Hero, IconChip, Muted, Screen, usePalette } from "@/components/ui";
import { Text } from "@/components/text";
import { Reveal } from "@/components/motion";
import { RecommendationCard } from "@/components/recommendation-card";

type Row = { href: Href; icon: keyof typeof Ionicons.glyphMap; title: string; sub: string };
type Section = { key: string; title: string; hue: Hue; heavy?: boolean; rows: Row[] };

const sections: Section[] = [
  {
    key: "talk",
    title: "Talk and listen",
    hue: "moss",
    rows: [
      { href: "/talk", icon: "chatbubbles-outline", title: "Guided conversation", sub: "Both people get heard" },
      { href: "/topics", icon: "chatbox-ellipses-outline", title: "Conversation topics", sub: "Meaningful ways in" },
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
      { href: "/insights" as Href, icon: "newspaper-outline", title: "Mend Notes", sub: "Research translated into practice" },
      { href: "/quiz", icon: "help-circle-outline", title: "How you love & fight", sub: "Your lens and role" },
      { href: "/stories", icon: "people-outline", title: "Stories", sub: "Real dynamics, useful turns" },
      { href: "/library", icon: "library-outline", title: "Library", sub: "Books, programs, podcasts" },
    ],
  },
  {
    key: "path",
    title: "Grow together",
    hue: "ember",
    rows: [
      { href: "/plan", icon: "heart-outline", title: "Our plan", sub: "Rituals and commitments" },
      { href: "/pulse", icon: "pulse-outline", title: "Pulse check", sub: "Five honest numbers" },
    ],
  },
  {
    key: "heavy",
    title: "When you need more support",
    hue: "plum",
    heavy: true,
    rows: [
      { href: "/tracks", icon: "map-outline", title: "Focused support", sub: "Affair, loss, illness, money, baby" },
      { href: "/safety", icon: "medkit-outline", title: "Get help now", sub: "Crisis lines and low-cost counseling" },
    ],
  },
];

export default function Explore() {
  const p = usePalette();
  const router = useRouter();
  const [sit, setSit] = useState<SituationDef | undefined>(undefined);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useFocusEffect(
    useCallback(() => {
      Promise.all([
        getProfile(),
        getSessions(),
        getPlan(),
        getChallengesDone(),
        getPulses(),
        getJourney(),
        getRecommendationHistory(),
      ]).then(([profile, sessions, plan, challengesDone, pulses, journey, history]) => {
        setSit(getSituation(profile?.situation));
        setRecommendations(
          getRecommendations({ profile, sessions, plan, challengesDone, pulses }, journey, history, new Date(), 3),
        );
      });
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
      <Hero hue="moss" title="Explore" sub="Talk, play, learn, and build more connection together." style={{ marginTop: 4 }} />

      {recommendations.length ? (
        <View style={{ marginTop: 22 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: p.ink, fontSize: 20, fontWeight: "800", letterSpacing: -0.3 }}>For you now</Text>
              <Muted style={{ marginTop: 3, fontSize: 12.5 }}>Based on your path, with recently opened ideas moved aside.</Muted>
            </View>
            <Chip label="Fresh picks" hue="ember" icon="sparkles-outline" />
          </View>
          <View style={{ marginTop: 10, gap: 10 }}>
            {recommendations.map((recommendation, index) => (
              <Reveal key={recommendation.id} index={index}>
                <RecommendationCard
                  recommendation={recommendation}
                  onOpen={(id) => setRecommendations((items) => items.filter((item) => item.id !== id))}
                />
              </Reveal>
            ))}
          </View>
        </View>
      ) : null}

      {ordered.map((section, si) => (
        <Reveal key={section.key} index={si + recommendations.length} style={{ marginTop: 22 }}>
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

import { useState } from "react";
import { Linking, Share, View } from "react-native";
import { useRouter, type Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { insightCategories, insights, type Insight, type InsightCategory } from "@/lib/insights";
import { Btn, Card, Chip, Hero, IconChip, Muted, P, Screen, usePalette } from "@/components/ui";
import { Text } from "@/components/text";
import { Press, Reveal } from "@/components/motion";
import { usePremium } from "@/lib/premium";

const categoryHue: Record<InsightCategory, "moss" | "honey" | "sky" | "plum"> = {
  research: "sky",
  practice: "honey",
  education: "moss",
  resource: "plum",
};

async function shareInsight(insight: Insight) {
  const hashtags = insight.social.hashtags.map((tag) => `#${tag}`).join(" ");
  await Share.share({
    title: insight.headline,
    message: `${insight.headline}\n\n${insight.summary}\n\nTry this: ${insight.tryThis.trim()}\n\nSource: ${insight.source.url}\n\n${hashtags}`,
  });
}

export default function Insights() {
  const p = usePalette();
  const router = useRouter();
  const { plus } = usePremium();
  const [category, setCategory] = useState<"all" | InsightCategory>("all");
  const [open, setOpen] = useState<string | null>(insights[0]?.id ?? null);
  const visible = category === "all" ? insights : insights.filter((item) => item.category === category);

  return (
    <Screen>
      <Hero
        hue="sky"
        eyebrow="Mend Notes"
        title="Research, translated into something you can use"
        sub="Careful sources, honest limits, and one practical move to try together."
        style={{ marginTop: 4 }}
      />

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 7, marginTop: 16 }}>
        {insightCategories.map((item) => {
          const selected = category === item.id;
          return (
            <Press key={item.id} onPress={() => setCategory(item.id)}>
              <View
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 99,
                  backgroundColor: selected ? p.moss : p.raised,
                  borderWidth: 1,
                  borderColor: selected ? p.moss : p.line,
                }}
              >
                <Text style={{ color: selected ? p.surface : p.ink, fontWeight: "700", fontSize: 12.5 }}>{item.label}</Text>
              </View>
            </Press>
          );
        })}
      </View>

      <Muted style={{ marginTop: 14, fontSize: 12.5 }}>
        {visible.length} published notes · Sources and study limits stay attached.
      </Muted>

      <View style={{ marginTop: 10, gap: 11 }}>
        {visible.map((insight, index) => {
          const isOpen = open === insight.id;
          const hue = categoryHue[insight.category];
          const sourceIndex = insights.findIndex((item) => item.id === insight.id);
          const locked = !plus && sourceIndex >= 2;
          return (
            <Reveal key={insight.id} index={index}>
              <Card style={{ borderColor: isOpen ? p.hues[hue].accent : p.line, opacity: locked ? 0.78 : 1 }}>
                <Press onPress={() => locked ? router.push("/plus") : setOpen(isOpen ? null : insight.id)}>
                  <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 12 }}>
                    <IconChip name={insight.category === "research" ? "flask-outline" : insight.category === "practice" ? "hand-left-outline" : "bulb-outline"} hue={hue} size={40} />
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
                        <Chip label={insight.eyebrow} hue={hue} />
                        <Muted style={{ fontSize: 11 }}>{insight.readTime}</Muted>
                        {locked ? <Chip label="Plus" hue="ember" icon="lock-closed-outline" /> : null}
                      </View>
                      <Text style={{ color: p.ink, fontSize: 17, lineHeight: 22, fontWeight: "800", letterSpacing: -0.2, marginTop: 7 }}>
                        {insight.headline}
                      </Text>
                    </View>
                    <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={17} color={p.muted} style={{ marginTop: 3 }} />
                  </View>
                  {!isOpen ? <Muted numberOfLines={2} style={{ marginTop: 10 }}>{insight.summary}</Muted> : null}
                </Press>

                {isOpen ? (
                  <View style={{ marginTop: 14 }}>
                    <P style={{ fontSize: 14.5 }}>{insight.summary}</P>
                    <P style={{ fontSize: 14, marginTop: 10 }}>{insight.studyDetail}</P>

                    <View style={{ marginTop: 14, backgroundColor: p.hues[hue].bg, borderRadius: 14, padding: 14 }}>
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
                        <Ionicons name="sparkles-outline" size={16} color={p.hues[hue].fg} />
                        <Text style={{ color: p.hues[hue].fg, fontWeight: "800", fontSize: 13 }}>Try this together</Text>
                      </View>
                      <Text style={{ color: p.ink, fontSize: 14.5, lineHeight: 21, marginTop: 7 }}>{insight.tryThis.trim()}</Text>
                    </View>

                    <View style={{ marginTop: 14, paddingTop: 14, borderTopWidth: 1, borderTopColor: p.line }}>
                      <Text style={{ color: p.ink, fontWeight: "700", fontSize: 12.5 }}>What the study actually covered</Text>
                      <Muted style={{ marginTop: 4, fontSize: 12.5 }}>{insight.source.sample}</Muted>
                      <Muted style={{ marginTop: 5, fontSize: 12.5, fontStyle: "italic" }}>{insight.source.caveat}</Muted>
                      <Press onPress={() => Linking.openURL(insight.source.url)}>
                        <Text style={{ color: p.ember, fontWeight: "700", fontSize: 12.5, marginTop: 8 }}>
                          {insight.source.authors} · {insight.source.journal}, {insight.source.year} ↗
                        </Text>
                      </Press>
                    </View>

                    <View style={{ flexDirection: "row", gap: 9, marginTop: 15 }}>
                      <Btn label={insight.relatedLabel} kind="moss" onPress={() => router.push(insight.relatedHref as Href)} style={{ flex: 1 }} />
                      <Press onPress={() => shareInsight(insight)} haptic>
                        <View style={{ width: 50, height: 50, borderRadius: 14, borderWidth: 1, borderColor: p.line, alignItems: "center", justifyContent: "center", backgroundColor: p.raised }}>
                          <Ionicons name="share-outline" size={21} color={p.ink} />
                        </View>
                      </Press>
                    </View>
                  </View>
                ) : null}
              </Card>
            </Reveal>
          );
        })}
      </View>

      <Muted style={{ marginTop: 22, textAlign: "center", fontSize: 12 }}>
        Mend is educational, not therapy. Research describes patterns, not guarantees about your relationship.
      </Muted>
    </Screen>
  );
}

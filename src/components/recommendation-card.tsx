import { View } from "react-native";
import { useRouter, type Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { recordRecommendationOpened } from "@/lib/store";
import type { Recommendation } from "@/lib/recommendations";
import { Card, Chip, IconChip, Muted, usePalette } from "@/components/ui";
import { Text } from "@/components/text";
import { Press } from "@/components/motion";

export function RecommendationCard({
  recommendation,
  featured = false,
  onOpen,
}: {
  recommendation: Recommendation;
  featured?: boolean;
  onOpen?: (id: string) => void;
}) {
  const p = usePalette();
  const router = useRouter();

  return (
    <Press
      haptic
      onPress={() => {
        recordRecommendationOpened(recommendation.id);
        onOpen?.(recommendation.id);
        router.push(recommendation.href as Href);
      }}
    >
      <Card tone={featured ? "fern" : "raised"}>
        <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 12 }}>
          <IconChip name={recommendation.icon} hue={recommendation.hue} size={featured ? 42 : 38} />
          <View style={{ flex: 1 }}>
            <Text style={{ color: p.ink, fontSize: featured ? 17 : 15.5, lineHeight: featured ? 22 : 20, fontWeight: "800" }}>
              {recommendation.title}
            </Text>
            <Muted numberOfLines={featured ? 3 : 2} style={{ marginTop: 4, fontSize: 12.5 }}>
              {recommendation.body}
            </Muted>
          </View>
          <Ionicons name="arrow-forward-circle-outline" size={22} color={p.hues[recommendation.hue].fg} />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 11 }}>
          <Chip label={recommendation.meta} hue={recommendation.hue} />
        </View>
        <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 7, marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: p.line }}>
          <Ionicons name="sparkles-outline" size={14} color={p.ember} style={{ marginTop: 1 }} />
          <Text style={{ color: p.muted, flex: 1, fontSize: 11.5, lineHeight: 16 }}>{recommendation.fit}</Text>
          <Text style={{ color: p.ember, fontSize: 12, fontWeight: "700" }}>{recommendation.label}</Text>
        </View>
      </Card>
    </Press>
  );
}

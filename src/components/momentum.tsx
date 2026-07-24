import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { Bloom, Press, Reveal } from "@/components/motion";
import { onHero, type Hue } from "@/lib/theme";
import type { ConnectionMomentum } from "@/lib/momentum";
import { usePalette } from "@/components/ui";
import { Text } from "@/components/text";

const THREAD_ICONS = {
  talk: "chatbubbles-outline",
  notice: "eye-outline",
  practice: "footsteps-outline",
  "follow-through": "checkmark-done-outline",
} as const;

export function MomentumCard({
  momentum,
  onOpen,
}: {
  momentum: ConnectionMomentum;
  onOpen: () => void;
}) {
  return (
    <Press onPress={onOpen} haptic>
      <LinearGradient
        colors={["#8a5519", "#5f3a18"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: 20, padding: 18, overflow: "hidden" }}
      >
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            width: 150,
            height: 150,
            borderRadius: 75,
            right: -60,
            top: -72,
            backgroundColor: "rgba(244,244,238,0.08)",
          }}
        />
        <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 16 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: onHero.accent, fontSize: 11, fontWeight: "800", letterSpacing: 1.3, textTransform: "uppercase" }}>
              Connection momentum
            </Text>
            <Text style={{ color: onHero.text, fontSize: 22, lineHeight: 27, fontWeight: "800", letterSpacing: -0.4, marginTop: 5 }}>
              {momentum.headline}
            </Text>
            <Text style={{ color: onHero.dim, fontSize: 12.5, lineHeight: 18, marginTop: 5 }}>
              {momentum.reflection}
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: onHero.text, fontSize: 31, lineHeight: 34, fontWeight: "900", letterSpacing: -1 }}>
              {momentum.totalMoments}
            </Text>
            <Text style={{ color: onHero.dim, fontSize: 10.5, fontWeight: "600" }}>moments</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginTop: 17, gap: 7 }}>
          {momentum.threads.map((thread) => (
            <View
              key={thread.id}
              style={{
                flex: 1,
                alignItems: "center",
                gap: 5,
                paddingVertical: 9,
                borderRadius: 12,
                backgroundColor: thread.active ? "rgba(244,244,238,0.15)" : "rgba(0,0,0,0.10)",
                borderWidth: 1,
                borderColor: thread.active ? "rgba(244,244,238,0.18)" : "rgba(244,244,238,0.07)",
              }}
            >
              <Ionicons
                name={THREAD_ICONS[thread.id]}
                size={16}
                color={thread.active ? onHero.accent : "rgba(244,244,238,0.38)"}
              />
              <Text style={{ color: thread.active ? onHero.text : "rgba(244,244,238,0.42)", fontSize: 9.5, fontWeight: "700" }}>
                {thread.label}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 13 }}>
          <Text style={{ color: onHero.dim, fontSize: 11.5, flex: 1 }}>
            {momentum.recentMoments > 0
              ? `${momentum.recentMoments} intentional ${momentum.recentMoments === 1 ? "moment" : "moments"} in the last 7 days`
              : "Return when it helps. Nothing here expires."}
          </Text>
          <Ionicons name="arrow-forward" size={16} color={onHero.accent} />
        </View>
      </LinearGradient>
    </Press>
  );
}

export function SuccessMoment({
  title,
  body,
  hue = "honey",
  icon = "sparkles",
}: {
  title: string;
  body: string;
  hue?: Hue;
  icon?: keyof typeof Ionicons.glyphMap;
}) {
  const p = usePalette();
  const tone = p.hues[hue];

  return (
    <Reveal>
      <View
        accessibilityLiveRegion="polite"
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          backgroundColor: tone.bg,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: tone.accent,
          padding: 14,
        }}
      >
        <Bloom trigger color={tone.accent} size={52}>
          <View style={{ width: 40, height: 40, borderRadius: 13, backgroundColor: tone.accent, alignItems: "center", justifyContent: "center" }}>
            <Ionicons name={icon} size={20} color={p.surface} />
          </View>
        </Bloom>
        <View style={{ flex: 1 }}>
          <Text style={{ color: tone.fg, fontSize: 15, fontWeight: "800" }}>{title}</Text>
          <Text style={{ color: tone.fg, opacity: 0.82, fontSize: 12.5, lineHeight: 18, marginTop: 2 }}>{body}</Text>
        </View>
      </View>
    </Reveal>
  );
}

/**
 * Mend UI kit: small, consistent primitives themed by color scheme.
 * Forest palette, generous radii, calm motion. No per-screen styling drift.
 */
import { ReactNode, useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Polyline } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { heroGradients, onHero, palettes, type Hue, type Palette } from "@/lib/theme";
import { springs, timings } from "@/lib/motion";
import { widowSafe } from "@/lib/typography";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const balancedText = {
  lineBreakStrategyIOS: "push-out" as const,
  textBreakStrategy: "balanced" as const,
};

export function usePalette(): Palette {
  const scheme = useColorScheme();
  return palettes[scheme === "dark" ? "dark" : "light"];
}

export function Screen({
  children,
  scroll = true,
  padded = true,
  safeTop = false,
}: {
  children: ReactNode;
  scroll?: boolean;
  padded?: boolean;
  /** For screens without a native header (tabs, auth, onboarding): keep
   *  content clear of the notch / Dynamic Island. */
  safeTop?: boolean;
}) {
  const p = usePalette();
  const insets = useSafeAreaInsets();
  const pad = padded ? { paddingHorizontal: 20, paddingTop: 16 } : null;
  const top = safeTop ? { paddingTop: insets.top + (padded ? 8 : 0) } : null;
  if (!scroll) {
    // Keep bottom-anchored CTAs clear of the home indicator.
    return (
      <View style={[{ flex: 1, backgroundColor: p.surface, paddingBottom: insets.bottom }, pad, top]}>
        {children}
      </View>
    );
  }
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: p.surface }}
      contentContainerStyle={[pad, top, { paddingBottom: insets.bottom + 40 }]}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      automaticallyAdjustKeyboardInsets
    >
      {children}
    </ScrollView>
  );
}

/** Standard pressed-state feedback for tappable cards and rows. */
export const pressFx = ({ pressed }: { pressed: boolean }) => ({
  opacity: pressed ? 0.85 : 1,
  transform: [{ scale: pressed ? 0.995 : 1 }],
});

/**
 * Soft entrance for cards and lists. Subtle, never bouncy.
 *
 * Content visibility NEVER depends on an animation frame: rAF can stall
 * (hidden web tab, low-power mode) and `entering` animations then strand
 * content at opacity 0 forever. A plain JS timeout snaps everything visible
 * shortly after the animation should have finished, whatever happened.
 */
export function Rise({
  children,
  delay = 0,
  style,
}: {
  children: ReactNode;
  delay?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const reduce = useReducedMotion();
  const t = useSharedValue(reduce ? 1 : 0);
  useEffect(() => {
    if (reduce) return;
    const timer = setTimeout(() => {
      t.value = withTiming(1, { duration: 420 });
    }, delay);
    // frame-independent fallback: whatever rAF did, end visible
    const snap = setTimeout(() => {
      t.value = 1;
    }, delay + 700);
    return () => {
      clearTimeout(timer);
      clearTimeout(snap);
    };
  }, [delay, reduce, t]);
  const anim = useAnimatedStyle(() => ({
    opacity: t.value,
    transform: [{ translateY: (1 - t.value) * 14 }],
  }));
  return <Animated.View style={[anim, style]}>{children}</Animated.View>;
}

/** Tinted rounded-square icon, iOS-Settings style. Kills the text-wall feel.
 *  Pass `hue` for the v2 feature colors; the legacy `tone` prop still works. */
export function IconChip({
  name,
  tone = "moss",
  hue,
  size = 36,
}: {
  name: keyof typeof Ionicons.glyphMap;
  tone?: "moss" | "ember" | "fern";
  hue?: Hue;
  size?: number;
}) {
  const p = usePalette();
  const h = hue ? p.hues[hue] : null;
  const bg = h ? h.bg : tone === "ember" ? p.ember : tone === "fern" ? p.fern : p.moss;
  const fg = h ? h.fg : tone === "fern" ? p.mossDeep : p.surface;
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.3,
        backgroundColor: bg,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ionicons name={name} size={size * 0.55} color={fg} />
    </View>
  );
}

/**
 * The Mend wordmark, matching the app icon: the name in one clean color
 * with the ember hand-stitch running beneath it. The stitch is the whole
 * brand (kintsugi, the mended seam), so the letters stay quiet: no gold
 * letter, no trailing period (the suite's other apps own that mark).
 * Pass color/accent only on gradient surfaces where palette ink won't read.
 */
export function Wordmark({
  size = 24,
  color,
  accent,
  style,
}: {
  size?: number;
  color?: string;
  accent?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const p = usePalette();
  const [w, setW] = useState(size * 2.55);
  const h = Math.max(5, size * 0.22);
  const sw = Math.max(2, size * 0.09);
  // seven stitches across the word, like the icon
  const pts = Array.from({ length: 8 }, (_, i) => {
    const x = sw / 2 + (i * (w - sw)) / 7;
    const y = i % 2 === 0 ? h - sw / 2 : sw / 2;
    return `${x},${y}`;
  }).join(" ");
  return (
    <View style={[{ alignSelf: "flex-start" }, style]}>
      <Text
        {...balancedText}
        onLayout={(e) => setW(Math.max(1, e.nativeEvent.layout.width))}
        style={{ fontSize: size, fontWeight: "800", letterSpacing: size * -0.02, color: color ?? p.ink }}
      >
        {widowSafe("Mend")}
      </Text>
      <Svg width={w} height={h} style={{ marginTop: size * 0.12 }}>
        <Polyline
          points={pts}
          fill="none"
          stroke={accent ?? p.ember}
          strokeWidth={sw}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

/** Small tinted pill for counts, vibes, and category labels. */
export function Chip({
  label,
  hue = "moss",
  icon,
  style,
}: {
  label: string;
  hue?: Hue;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: StyleProp<ViewStyle>;
}) {
  const p = usePalette();
  const h = p.hues[hue];
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          backgroundColor: h.bg,
          paddingHorizontal: 9,
          paddingVertical: 4,
          borderRadius: 99,
          alignSelf: "flex-start",
        },
        style,
      ]}
    >
      {icon ? <Ionicons name={icon} size={12} color={h.fg} /> : null}
      <Text {...balancedText} style={{ fontSize: 11.5, fontWeight: "700", color: h.fg }}>{widowSafe(label)}</Text>
    </View>
  );
}

/** Uppercase section eyebrow, the one way sections are titled. */
export function Eyebrow({
  children,
  hue,
  style,
}: {
  children: ReactNode;
  hue?: Hue;
  style?: StyleProp<TextStyle>;
}) {
  const p = usePalette();
  const color = hue ? p.hues[hue].fg : p.mossDeep;
  return (
    <Text
      {...balancedText}
      style={[
        { textTransform: "uppercase", letterSpacing: 1.4, fontWeight: "700", fontSize: 11.5, color },
        style,
      ]}
    >
      {widowSafe(children)}
    </Text>
  );
}

/**
 * Hero: the deep-gradient header band every major screen opens with. Soft
 * decorative circles give it depth without imagery. Text is always bone.
 */
export function Hero({
  hue = "moss",
  eyebrow,
  title,
  sub,
  right,
  children,
  style,
}: {
  hue?: Hue;
  eyebrow?: string;
  title?: string;
  sub?: string;
  /** rendered to the right of the text block (a ring, a big icon) */
  right?: ReactNode;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <LinearGradient
      colors={heroGradients[hue]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[{ borderRadius: 22, padding: 20, overflow: "hidden" }, style]}
    >
      {/* decorative depth: two translucent circles bleeding off the corners */}
      <View
        pointerEvents="none"
        style={{ position: "absolute", top: -46, right: -34, width: 130, height: 130, borderRadius: 65, backgroundColor: "rgba(244,244,238,0.07)" }}
      />
      <View
        pointerEvents="none"
        style={{ position: "absolute", bottom: -58, left: -28, width: 150, height: 150, borderRadius: 75, backgroundColor: "rgba(0,0,0,0.10)" }}
      />
      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        <View style={{ flex: 1 }}>
          {eyebrow ? (
            <Text {...balancedText} style={{ color: onHero.accent, fontWeight: "700", fontSize: 12, textTransform: "uppercase", letterSpacing: 1.5 }}>
              {widowSafe(eyebrow)}
            </Text>
          ) : null}
          {title ? (
            <Text {...balancedText} style={{ color: onHero.text, fontSize: 24, fontWeight: "800", letterSpacing: -0.4, marginTop: eyebrow ? 6 : 0, lineHeight: 29 }}>
              {widowSafe(title)}
            </Text>
          ) : null}
          {sub ? (
            <Text {...balancedText} style={{ color: onHero.dim, fontSize: 13.5, marginTop: 6, lineHeight: 19 }}>{widowSafe(sub)}</Text>
          ) : null}
        </View>
        {right ?? null}
      </View>
      {children}
    </LinearGradient>
  );
}

/**
 * CollapsibleP: long explanations fold to two lines behind a "More" tap.
 * The screen stays calm; the depth stays one tap away.
 */
export function CollapsibleP({
  children,
  lines = 2,
  style,
}: {
  children: ReactNode;
  lines?: number;
  style?: StyleProp<TextStyle>;
}) {
  const p = usePalette();
  const [open, setOpen] = useState(false);
  return (
    <Pressable onPress={() => setOpen((o) => !o)}>
      <P numberOfLines={open ? undefined : lines} style={style}>
        {children}
      </P>
      <Text {...balancedText} style={{ color: p.ember, fontWeight: "600", fontSize: 13, marginTop: 4 }}>
        {open ? "Less" : "More"}
      </Text>
    </Pressable>
  );
}

/** Friendly zero-state: a tinted icon disc, one line, one action. */
export function EmptyState({
  icon,
  hue = "moss",
  title,
  body,
  cta,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  hue?: Hue;
  title: string;
  body?: string;
  cta?: string;
  onPress?: () => void;
}) {
  const p = usePalette();
  const h = p.hues[hue];
  return (
    <View style={{ alignItems: "center", paddingVertical: 28, gap: 10 }}>
      <View style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: h.bg, alignItems: "center", justifyContent: "center" }}>
        <Ionicons name={icon} size={32} color={h.fg} />
      </View>
      <Text {...balancedText} style={{ fontSize: 16.5, fontWeight: "700", color: p.ink, textAlign: "center" }}>{widowSafe(title)}</Text>
      {body ? <Muted style={{ textAlign: "center", maxWidth: 280 }}>{body}</Muted> : null}
      {cta && onPress ? <Btn label={cta} onPress={onPress} style={{ marginTop: 6, alignSelf: "stretch" }} /> : null}
    </View>
  );
}

export function H1({ children, style }: { children: ReactNode; style?: StyleProp<TextStyle> }) {
  const p = usePalette();
  return <Text {...balancedText} style={[s.h1, { color: p.ink }, style]}>{widowSafe(children)}</Text>;
}

export function H2({ children, style }: { children: ReactNode; style?: StyleProp<TextStyle> }) {
  const p = usePalette();
  return <Text {...balancedText} style={[s.h2, { color: p.ink }, style]}>{widowSafe(children)}</Text>;
}

export function P({
  children,
  style,
  numberOfLines,
}: {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}) {
  const p = usePalette();
  return (
    <Text {...balancedText} numberOfLines={numberOfLines} style={[s.p, { color: p.ink, opacity: 0.87 }, style]}>
      {widowSafe(children)}
    </Text>
  );
}

export function Muted({
  children,
  style,
  numberOfLines,
}: {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}) {
  const p = usePalette();
  return (
    <Text {...balancedText} numberOfLines={numberOfLines} style={[s.muted, { color: p.muted }, style]}>
      {widowSafe(children)}
    </Text>
  );
}

export function Card({
  children,
  tone = "raised",
  style,
}: {
  children: ReactNode;
  tone?: "raised" | "panel" | "fern" | "moss";
  style?: StyleProp<ViewStyle>;
}) {
  const p = usePalette();
  const bg =
    tone === "panel" ? p.panel : tone === "fern" ? p.fern : tone === "moss" ? p.mossDeep : p.raised;
  return (
    <View style={[s.card, { backgroundColor: bg, borderColor: p.line }, style]}>{children}</View>
  );
}

export function Btn({
  label,
  onPress,
  kind = "primary",
  disabled,
  style,
}: {
  label: string;
  onPress: () => void;
  kind?: "primary" | "ghost" | "moss";
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const p = usePalette();
  const reduce = useReducedMotion();
  const bg = kind === "primary" ? p.ink : kind === "moss" ? p.moss : "transparent";
  const fg = kind === "ghost" ? p.ink : p.surface;
  const scale = useSharedValue(1);
  const press = useSharedValue(0);
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: disabled ? 0.4 : 1 - press.value * 0.12,
  }));
  return (
    <AnimatedPressable
      onPress={onPress}
      disabled={disabled}
      onPressIn={() => {
        if (reduce) return;
        scale.value = withSpring(0.97, springs.snappy);
        press.value = withTiming(1, timings.quick);
      }}
      onPressOut={() => {
        scale.value = withSpring(1, springs.bouncy);
        press.value = withTiming(0, timings.quick);
      }}
      style={[
        s.btn,
        { backgroundColor: bg, borderColor: kind === "ghost" ? p.line : bg },
        animStyle,
        style,
      ]}
    >
      <Text {...balancedText} style={[s.btnLabel, { color: fg }]}>{widowSafe(label)}</Text>
    </AnimatedPressable>
  );
}

export function Label({ children }: { children: ReactNode }) {
  const p = usePalette();
  return <Text {...balancedText} style={[s.label, { color: p.muted }]}>{widowSafe(children)}</Text>;
}

export function Input(props: React.ComponentProps<typeof TextInput>) {
  const p = usePalette();
  return (
    <TextInput
      placeholderTextColor={p.muted}
      {...props}
      style={[
        s.input,
        { backgroundColor: p.raised, borderColor: p.line, color: p.ink },
        // iOS multiline inputs need explicit top padding + height to not
        // render as a cramped single line
        props.multiline && { paddingTop: 12, minHeight: 64, textAlignVertical: "top" as const },
        props.style,
      ]}
    />
  );
}

export function Divider() {
  const p = usePalette();
  return <View style={{ height: 1, backgroundColor: p.line, marginVertical: 20 }} />;
}

const s = StyleSheet.create({
  h1: { fontSize: 30, fontWeight: "800", letterSpacing: -0.5, lineHeight: 36 },
  h2: { fontSize: 21, fontWeight: "700", letterSpacing: -0.3, lineHeight: 27 },
  p: { fontSize: 15, lineHeight: 23 },
  muted: { fontSize: 13.5, lineHeight: 20 },
  card: { borderRadius: 18, borderWidth: 1, padding: 18 },
  btn: {
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  btnLabel: { fontSize: 15, fontWeight: "600" },
  label: { fontSize: 12.5, fontWeight: "600", marginBottom: 6 },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
});

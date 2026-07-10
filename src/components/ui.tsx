/**
 * Mend UI kit: small, consistent primitives themed by color scheme.
 * Forest palette, generous radii, calm motion. No per-screen styling drift.
 */
import { ReactNode } from "react";
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
  FadeInDown,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { palettes, type Palette } from "@/lib/theme";
import { springs, timings } from "@/lib/motion";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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
    return (
      <View style={[{ flex: 1, backgroundColor: p.surface }, pad, top]}>{children}</View>
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

/** Soft entrance for cards and lists. Subtle, never bouncy. */
export function Rise({
  children,
  delay = 0,
  style,
}: {
  children: ReactNode;
  delay?: number;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Animated.View entering={FadeInDown.duration(420).delay(delay)} style={style}>
      {children}
    </Animated.View>
  );
}

/** Tinted rounded-square icon, iOS-Settings style. Kills the text-wall feel. */
export function IconChip({
  name,
  tone = "moss",
  size = 36,
}: {
  name: keyof typeof Ionicons.glyphMap;
  tone?: "moss" | "ember" | "fern";
  size?: number;
}) {
  const p = usePalette();
  const bg = tone === "ember" ? p.ember : tone === "fern" ? p.fern : p.moss;
  const fg = tone === "fern" ? p.mossDeep : p.surface;
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

export function H1({ children, style }: { children: ReactNode; style?: StyleProp<TextStyle> }) {
  const p = usePalette();
  return <Text style={[s.h1, { color: p.ink }, style]}>{children}</Text>;
}

export function H2({ children, style }: { children: ReactNode; style?: StyleProp<TextStyle> }) {
  const p = usePalette();
  return <Text style={[s.h2, { color: p.ink }, style]}>{children}</Text>;
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
    <Text numberOfLines={numberOfLines} style={[s.p, { color: p.ink, opacity: 0.87 }, style]}>
      {children}
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
    <Text numberOfLines={numberOfLines} style={[s.muted, { color: p.muted }, style]}>
      {children}
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
      <Text style={[s.btnLabel, { color: fg }]}>{label}</Text>
    </AnimatedPressable>
  );
}

export function Label({ children }: { children: ReactNode }) {
  const p = usePalette();
  return <Text style={[s.label, { color: p.muted }]}>{children}</Text>;
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

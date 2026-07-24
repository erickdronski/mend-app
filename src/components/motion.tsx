/**
 * Reusable animated primitives built on the motion system (lib/motion.ts).
 * Spring-physics press feedback, staggered entrances, and success bounces,
 * all reduced-motion aware. Prefer these over ad-hoc per-screen animation.
 */
import { ReactNode, useEffect } from "react";
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { springs, stagger, timings } from "@/lib/motion";

/** A warm acknowledgement for completed effort, never used for scores. */
export function acknowledgeSuccess() {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
}

/** A progress bar whose fill glides to `progress` (0..1) instead of jumping. */
export function GlideBar({
  progress,
  color,
  track,
  height = 4,
}: {
  progress: number;
  color: string;
  track: string;
  height?: number;
}) {
  const reduce = useReducedMotion();
  const w = useSharedValue(progress);
  useEffect(() => {
    w.value = reduce ? progress : withTiming(progress, timings.base);
  }, [progress, reduce, w]);
  const style = useAnimatedStyle(() => ({ width: `${Math.max(0, Math.min(1, w.value)) * 100}%` }));
  return (
    <Animated.View style={{ height, backgroundColor: track, borderRadius: height / 2, overflow: "hidden" }}>
      <Animated.View style={[{ height: "100%", backgroundColor: color, borderRadius: height / 2 }, style]} />
    </Animated.View>
  );
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * Press: a pressable that springs down on touch and back on release. The
 * physical "give" every tappable surface should have. Optional light haptic.
 */
export function Press({
  children,
  onPress,
  haptic = false,
  scaleTo = 0.97,
  style,
  disabled,
  ...rest
}: {
  children: ReactNode;
  onPress?: () => void;
  haptic?: boolean;
  scaleTo?: number;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
} & Omit<PressableProps, "onPress" | "style" | "children">) {
  const reduce = useReducedMotion();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <AnimatedPressable
      onPressIn={() => {
        if (reduce) return;
        scale.value = withSpring(scaleTo, springs.snappy);
        opacity.value = withTiming(0.9, timings.quick);
      }}
      onPressOut={() => {
        scale.value = withSpring(1, springs.bouncy);
        opacity.value = withTiming(1, timings.quick);
      }}
      onPress={() => {
        if (haptic) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
        onPress?.();
      }}
      disabled={disabled}
      style={[animStyle, style]}
      {...rest}
    >
      {children}
    </AnimatedPressable>
  );
}

/**
 * Reveal: entrance animation with a staggered delay by index. A soft rise +
 * fade, springy. Use on list items and stacked cards so a screen assembles
 * itself instead of snapping in.
 *
 * Like Rise, visibility never depends on an animation frame: a plain JS
 * timeout snaps the item visible shortly after its slot, so a stalled rAF
 * (hidden web tab, low-power mode) can never strand content at opacity 0.
 */
export function Reveal({
  children,
  index = 0,
  style,
}: {
  children: ReactNode;
  index?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const reduce = useReducedMotion();
  const t = useSharedValue(reduce ? 1 : 0);
  useEffect(() => {
    if (reduce) return;
    const delay = stagger(index);
    const timer = setTimeout(() => {
      t.value = withSpring(1, springs.gentle);
    }, delay);
    const snap = setTimeout(() => {
      t.value = 1;
    }, delay + 800);
    return () => {
      clearTimeout(timer);
      clearTimeout(snap);
    };
  }, [index, reduce, t]);
  const anim = useAnimatedStyle(() => ({
    opacity: t.value,
    transform: [{ translateY: (1 - t.value) * 16 }],
  }));
  return <Animated.View style={[anim, style]}>{children}</Animated.View>;
}

/**
 * Bloom: a celebratory ring that expands and fades behind its child when
 * `trigger` turns truthy. The app's one "confetti", kept quiet on purpose:
 * finishing a step in a hard season deserves warmth, not fireworks.
 */
export function Bloom({
  children,
  trigger,
  color,
  size = 96,
}: {
  children: ReactNode;
  trigger: unknown;
  color: string;
  size?: number;
}) {
  const reduce = useReducedMotion();
  const scale = useSharedValue(0);
  const fade = useSharedValue(0);
  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: fade.value,
  }));

  useEffect(() => {
    if (reduce || !trigger) return;
    scale.value = 0.5;
    fade.value = 0.85;
    scale.value = withSpring(1.5, springs.gentle);
    fade.value = withTiming(0, { duration: 700 });
  }, [trigger, reduce, scale, fade]);

  return (
    <Animated.View style={{ alignItems: "center", justifyContent: "center" }}>
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: "absolute",
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 3,
            borderColor: color,
          },
          ringStyle,
        ]}
      />
      {children}
    </Animated.View>
  );
}

/**
 * Bounce: a subtle scale pop when `trigger` changes to a truthy value. For
 * confirmations (answer sent, day done, stage complete). Never loud.
 */
export function Bounce({
  children,
  trigger,
  style,
}: {
  children: ReactNode;
  trigger: unknown;
  style?: StyleProp<ViewStyle>;
}) {
  const reduce = useReducedMotion();
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  useEffect(() => {
    if (reduce || !trigger) return;
    scale.value = withSpring(1.06, springs.bouncy, () => {
      scale.value = withSpring(1, springs.gentle);
    });
  }, [trigger, reduce, scale]);

  return <Animated.View style={[animStyle, style]}>{children}</Animated.View>;
}

/**
 * Reusable animated primitives built on the motion system (lib/motion.ts).
 * Spring-physics press feedback, staggered entrances, and success bounces,
 * all reduced-motion aware. Prefer these over ad-hoc per-screen animation.
 */
import { ReactNode, useEffect } from "react";
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from "react-native";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { springs, stagger, timings } from "@/lib/motion";

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
  if (reduce) return <Animated.View style={style}>{children}</Animated.View>;
  return (
    <Animated.View
      entering={FadeInDown.springify().damping(18).stiffness(140).delay(stagger(index))}
      style={style}
    >
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

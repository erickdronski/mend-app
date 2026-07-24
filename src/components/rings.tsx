/**
 * Animated SVG rings. The app's signature motion lives here: the session
 * timer sweeps smoothly on the UI thread instead of ticking, the journey
 * progress ring springs to its new value, and the flooding-break circle
 * breathes to guide co-regulation. All reduced-motion aware.
 */
import { useEffect } from "react";
import { View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { springs } from "@/lib/motion";
import { Text } from "@/components/text";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/**
 * ProgressRing: a ring whose fill animates to `progress` (0..1). Timer mode
 * eases linearly over `durationMs` for a continuous sweep; otherwise it
 * springs. Children render centered inside.
 */
export function ProgressRing({
  progress,
  size = 200,
  stroke = 9,
  trackColor,
  color,
  durationMs,
  breathing = false,
  children,
}: {
  progress: number;
  size?: number;
  stroke?: number;
  trackColor: string;
  color: string;
  /** if set, ease to progress over this many ms (linear) instead of spring */
  durationMs?: number;
  /** gentle scale pulse while active (e.g. timer running) */
  breathing?: boolean;
  children?: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const p = useSharedValue(progress);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (reduce) {
      p.value = progress;
      return;
    }
    p.value =
      durationMs != null
        ? withTiming(progress, { duration: durationMs, easing: Easing.linear })
        : withSpring(progress, springs.gentle);
  }, [progress, durationMs, reduce, p]);

  useEffect(() => {
    if (reduce || !breathing) {
      scale.value = 1;
      return;
    }
    scale.value = withRepeat(withTiming(1.035, { duration: 2600, easing: Easing.inOut(Easing.sin) }), -1, true);
  }, [breathing, reduce, scale]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: c * (1 - p.value),
  }));
  const scaleStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <View style={{ width: size, height: size }}>
      <Animated.View style={[{ width: size, height: size }, scaleStyle]}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: [{ rotate: "-90deg" }] }}>
          <Circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            animatedProps={animatedProps}
          />
        </Svg>
      </Animated.View>
      {children != null && (
        <View style={{ position: "absolute", inset: 0, alignItems: "center", justifyContent: "center" }}>
          {children}
        </View>
      )}
    </View>
  );
}

/**
 * BreathingCircle: a soft box-breathing guide for the flooding break. In (4s),
 * hold (4s), out (4s), looping, with a label that follows the phase. Under
 * reduced motion it renders static with plain guidance.
 */
export function BreathingCircle({
  size = 150,
  color,
  labelColor,
}: {
  size?: number;
  color: string;
  labelColor: string;
}) {
  const reduce = useReducedMotion();
  const scale = useSharedValue(1);

  useEffect(() => {
    if (reduce) return;
    scale.value = withRepeat(
      withSequence(
        withTiming(1.22, { duration: 4000, easing: Easing.inOut(Easing.quad) }),
        withTiming(1.22, { duration: 4000, easing: Easing.linear }),
        withTiming(1.0, { duration: 4000, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      false
    );
  }, [reduce, scale]);

  const breathStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <View style={{ width: size * 1.3, height: size * 1.3, alignItems: "center", justifyContent: "center" }}>
      <Animated.View
        style={[
          { width: size, height: size, borderRadius: size / 2, backgroundColor: color, alignItems: "center", justifyContent: "center" },
          breathStyle,
        ]}
      >
        <Text style={{ color: labelColor, fontWeight: "700", fontSize: 15 }}>
          {reduce ? "Breathe slowly" : "Breathe"}
        </Text>
      </Animated.View>
    </View>
  );
}

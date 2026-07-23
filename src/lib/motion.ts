/**
 * Mend motion system. One vocabulary of springs and durations so motion feels
 * like one hand made it: calm, physical, never gimmicky. A relationship app in hard
 * seasons, so motion is gentle and motivated (feedback, hierarchy, continuity,
 * a little delight) and always yields to reduced-motion.
 */
import { Easing, ReduceMotion } from "react-native-reanimated";

// Spring presets. Tuned for soft, weighted motion, not toy bounces.
export const springs = {
  /** default: settles smoothly, barely overshoots. Cards, reveals, layout. */
  gentle: { damping: 18, stiffness: 140, mass: 1, reduceMotion: ReduceMotion.System },
  /** a touch of life: buttons, chips, small confirmations. */
  bouncy: { damping: 12, stiffness: 180, mass: 0.9, reduceMotion: ReduceMotion.System },
  /** quick and tight: press-down feedback, toggles. */
  snappy: { damping: 22, stiffness: 320, mass: 0.7, reduceMotion: ReduceMotion.System },
  /** slow, breathing: the flooding break, ambient loops. */
  soft: { damping: 26, stiffness: 60, mass: 1.4, reduceMotion: ReduceMotion.System },
} as const;

// Timing presets for non-spring work (fades, sweeps).
export const timings = {
  quick: { duration: 180, easing: Easing.out(Easing.cubic), reduceMotion: ReduceMotion.System },
  base: { duration: 320, easing: Easing.out(Easing.cubic), reduceMotion: ReduceMotion.System },
  slow: { duration: 520, easing: Easing.inOut(Easing.cubic), reduceMotion: ReduceMotion.System },
} as const;

/** Stagger delay for list reveals. Cap so long lists do not feel sluggish. */
export const stagger = (index: number, step = 55, max = 8) =>
  Math.min(index, max) * step;

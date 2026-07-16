/**
 * DeckSwiper: a physical stack of cards. Drag the top card away (left = pass,
 * right = answered) or trigger the same motion from buttons. The two cards
 * beneath peek out and rise into place as the stack advances, so the deck
 * feels like a real object instead of a paged list.
 *
 * State progression NEVER depends on an animation frame: the fly-off timing
 * animates the exit, but a JS timeout settles the swipe even if rAF is
 * throttled (backgrounded web tab, low-power mode). Whichever fires first
 * wins; the second is a no-op.
 *
 * Reduced motion: cards settle instantly; drag is disabled.
 */
import { forwardRef, useImperativeHandle, useRef, type ReactNode } from "react";
import { View, useWindowDimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { springs } from "@/lib/motion";

export type SwipeDir = "left" | "right";

export type DeckSwiperHandle = {
  /** Fly the top card off programmatically (for the Pass / Answered buttons). */
  swipe: (dir: SwipeDir) => void;
};

const THRESHOLD = 110;
const FLY_MS = 240;

export const DeckSwiper = forwardRef<
  DeckSwiperHandle,
  {
    /** Stable key of the current top card; changing it resets the drag state. */
    topKey: string | number;
    /** The top card's content. */
    renderTop: () => ReactNode;
    /** Up to two cards peeking beneath (index 0 = directly beneath). */
    renderUnder: () => ReactNode[];
    onSwiped: (dir: SwipeDir) => void;
  }
>(function DeckSwiper({ topKey, renderTop, renderUnder, onSwiped }, ref) {
  const { width } = useWindowDimensions();
  const reduce = useReducedMotion();
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);
  const flying = useSharedValue(0);
  // The swipe currently in flight; null once settled. Guards double-settle
  // between the animation callback and the JS fallback timer.
  const pending = useRef<SwipeDir | null>(null);

  function haptic() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  }

  function settle(dir: SwipeDir) {
    if (pending.current !== dir) return;
    pending.current = null;
    onSwiped(dir);
    // next card is already beneath; snap shared values back for the new top
    tx.value = 0;
    ty.value = 0;
    flying.value = 0;
  }

  /** JS-side fly: starts the exit animation AND a frame-independent fallback. */
  function fly(dir: SwipeDir) {
    if (pending.current) return;
    pending.current = dir;
    if (reduce) {
      settle(dir);
      return;
    }
    flying.value = 1;
    const out = (dir === "left" ? -1 : 1) * (width + 120);
    tx.value = withTiming(out, { duration: FLY_MS, easing: Easing.out(Easing.quad) }, () => {
      runOnJS(settle)(dir);
    });
    setTimeout(() => settle(dir), FLY_MS + 140);
  }

  useImperativeHandle(ref, () => ({
    swipe: (dir: SwipeDir) => {
      haptic();
      fly(dir);
    },
  }));

  const pan = Gesture.Pan()
    .enabled(!reduce)
    .onUpdate((e) => {
      if (flying.value) return;
      tx.value = e.translationX;
      ty.value = e.translationY * 0.4;
    })
    .onEnd((e) => {
      if (flying.value) return;
      const past = Math.abs(tx.value) > THRESHOLD || Math.abs(e.velocityX) > 900;
      if (past) {
        const dir: SwipeDir = tx.value + e.velocityX * 0.05 < 0 ? "left" : "right";
        runOnJS(haptic)();
        runOnJS(fly)(dir);
      } else {
        tx.value = withSpring(0, springs.bouncy);
        ty.value = withSpring(0, springs.bouncy);
      }
    });

  const topStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tx.value },
      { translateY: ty.value },
      { rotate: `${tx.value / 18}deg` },
    ],
  }));

  // the card beneath scales up as the top card travels
  const underStyle = useAnimatedStyle(() => {
    const t = Math.min(Math.abs(tx.value) / (THRESHOLD * 2), 1);
    return {
      transform: [
        { scale: interpolate(t, [0, 1], [0.955, 1]) },
        { translateY: interpolate(t, [0, 1], [14, 0]) },
      ],
    };
  });

  const under = renderUnder();

  return (
    <View>
      {/* second card beneath: static, smallest */}
      {under[1] ? (
        <View
          pointerEvents="none"
          style={{ position: "absolute", left: 0, right: 0, top: 0, transform: [{ scale: 0.91 }, { translateY: 26 }], opacity: 0.6 }}
        >
          {under[1]}
        </View>
      ) : null}
      {/* first card beneath: rises as the top departs */}
      {under[0] ? (
        <Animated.View
          pointerEvents="none"
          style={[{ position: "absolute", left: 0, right: 0, top: 0, opacity: 0.9 }, underStyle]}
        >
          {under[0]}
        </Animated.View>
      ) : null}
      <GestureDetector gesture={pan}>
        <Animated.View key={topKey} style={topStyle}>
          {renderTop()}
        </Animated.View>
      </GestureDetector>
    </View>
  );
});

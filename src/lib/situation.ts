/**
 * Situation personalization: the "what are you carrying?" answer chosen at
 * onboarding foregrounds the content that fits and mutes the rest. This is
 * the spine of the Calm Path: the app bends toward the user's real situation
 * instead of presenting a flat catalog.
 *
 * Nothing is ever hidden that safety depends on. "Muting" only reorders and
 * de-emphasizes; every surface is still reachable from Explore.
 */
import type { Ionicons } from "@expo/vector-icons";

export type Situation =
  | "drift"
  | "affair"
  | "loss"
  | "baby"
  | "money"
  | "illness"
  | "desire-gap"
  | "blended"
  | "faith"
  | "just-us";

export type SituationDef = {
  id: Situation;
  chip: string;
  icon: keyof typeof Ionicons.glyphMap;
  /** shown on the Today home as a gentle orientation line */
  hereForYou: string;
  /** the track slug to foreground (empty = no heavy track) */
  track: string;
  trackTitle: string;
  /** story ids to float to the top of the stories list */
  stories: string[];
  /** deck ids to float to the top of the decks list */
  decks: string[];
  /** whether the "When it's heavy" material is relevant (drift/just-us: no) */
  heavy: boolean;
};

export const situations: SituationDef[] = [
  {
    id: "drift",
    chip: "We've drifted apart",
    icon: "boat-outline",
    hereForYou:
      "You're here to close the distance. We'll start small, with the easy conversations first.",
    track: "",
    trackTitle: "",
    stories: ["roommate-drift", "empty-nest"],
    decks: ["first-steps", "go-deeper"],
    heavy: false,
  },
  {
    id: "affair",
    chip: "We're facing an affair",
    icon: "heart-dislike-outline",
    hereForYou:
      "You're rebuilding trust after infidelity. There's a track for exactly this, in the right order.",
    track: "affair",
    trackTitle: "After an affair",
    stories: ["affair-aftermath", "almost-divorce"],
    decks: ["repair", "first-steps"],
    heavy: true,
  },
  {
    id: "loss",
    chip: "We're grieving a loss",
    icon: "rainy-outline",
    hereForYou:
      "You're carrying a loss together. There are guided paths for grief and for pregnancy loss.",
    track: "grief",
    trackTitle: "Grieving a loss",
    stories: ["miscarriage", "empty-nest"],
    decks: ["first-steps", "repair"],
    heavy: true,
  },
  {
    id: "baby",
    chip: "We have a new baby",
    icon: "moon-outline",
    hereForYou:
      "You're finding each other again after a baby. Small moves, on no sleep, count double.",
    track: "new-baby",
    trackTitle: "After the baby",
    stories: ["first-year-baby"],
    decks: ["first-steps", "lighter"],
    heavy: true,
  },
  {
    id: "money",
    chip: "Money is straining us",
    icon: "wallet-outline",
    hereForYou:
      "You're a team against the money problem, not each other. Start with what money means to each of you.",
    track: "money-crisis",
    trackTitle: "Money strain",
    stories: ["money-collapse"],
    decks: ["first-steps", "go-deeper"],
    heavy: true,
  },
  {
    id: "illness",
    chip: "Illness or caregiving",
    icon: "medkit-outline",
    hereForYou:
      "You're partners through illness. This is a long haul, and you don't walk it alone.",
    track: "illness",
    trackTitle: "Illness and caregiving",
    stories: ["chronic-illness", "long-caregiving"],
    decks: ["first-steps", "go-deeper"],
    heavy: true,
  },
  {
    id: "desire-gap",
    chip: "Intimacy has gone quiet",
    icon: "flame-outline",
    hereForYou:
      "You're finding your way back to closeness. This goes gently, and no one is broken here.",
    track: "desire-gap",
    trackTitle: "When desire has gone quiet",
    stories: ["desire-gap"],
    decks: ["desire", "go-deeper"],
    heavy: true,
  },
  {
    id: "blended",
    chip: "Blended family",
    icon: "people-outline",
    hereForYou:
      "You're building a relationship through family shrapnel. There's a path for exactly this.",
    track: "blended",
    trackTitle: "Blended family",
    stories: ["almost-divorce"],
    decks: ["go-deeper", "first-steps"],
    heavy: true,
  },
  {
    id: "faith",
    chip: "Two faiths, one family",
    icon: "compass-outline",
    hereForYou:
      "You love across a line of belief. This helps you hold both without either of you disappearing.",
    track: "faith-gap",
    trackTitle: "Two faiths, one family",
    stories: ["interfaith-holidays"],
    decks: ["go-deeper", "first-steps"],
    heavy: true,
  },
  {
    id: "just-us",
    chip: "Just us, working on us",
    icon: "sparkles-outline",
    hereForYou:
      "No crisis, just care. You're here to build something stronger on purpose.",
    track: "",
    trackTitle: "",
    stories: ["roommate-drift", "desire-gap"],
    decks: ["go-deeper", "lighter", "dreams"],
    heavy: false,
  },
];

export function getSituation(id: Situation | undefined | null): SituationDef | undefined {
  if (!id) return undefined;
  return situations.find((s) => s.id === id);
}

/** Reorder a list of items so situation-preferred ids come first, order preserved otherwise. */
export function prioritize<T>(items: T[], keyOf: (t: T) => string, preferred: string[]): T[] {
  if (preferred.length === 0) return items;
  const rank = (t: T) => {
    const i = preferred.indexOf(keyOf(t));
    return i === -1 ? preferred.length + 1 : i;
  };
  return [...items].sort((x, y) => rank(x) - rank(y));
}

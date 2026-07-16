/**
 * Mend theme: Forest. Deep green, bone, and amber. A living room at dusk,
 * not a clinic. Same tokens as the web app, resolved per color scheme.
 *
 * v2 adds feature hues: each family of features carries its own warm color
 * so the app reads as a set of rooms, not one long hallway.
 *   moss  = talk / sessions        honey = play (cards, games, challenges)
 *   sky   = learn (toolkit, quiz)  plum  = heavy (tracks, safety-adjacent)
 *   rose  = love (plan, notes)     ember = path / progress
 */
export type Hue = "moss" | "honey" | "sky" | "plum" | "rose" | "ember";

/** bg: soft tinted fill. fg: readable text/icon on bg. accent: saturated pop. */
export type HueTone = { bg: string; fg: string; accent: string };

export type Palette = {
  surface: string;
  raised: string;
  panel: string;
  fern: string;
  ink: string;
  muted: string;
  line: string;
  moss: string;
  mossDeep: string;
  ember: string;
  emberDeep: string;
  hues: Record<Hue, HueTone>;
};

/** Deep gradient pairs for hero bands; bone text stays readable on all of
 *  them in both schemes, so heroes are scheme-independent by design. */
export const heroGradients: Record<Hue, readonly [string, string]> = {
  moss: ["#2e4a38", "#233c2c"],
  honey: ["#7a5a16", "#5e440f"],
  sky: ["#2f5a66", "#234750"],
  plum: ["#54406b", "#403053"],
  rose: ["#7a4343", "#5e3131"],
  ember: ["#8a5519", "#6d4213"],
};

/** Text colors that sit on any hero gradient. */
export const onHero = { text: "#f4f4ee", accent: "#e9c98f", dim: "rgba(244,244,238,0.72)" };

export const palettes: { light: Palette; dark: Palette } = {
  light: {
    surface: "#f4f4ee",
    raised: "#fdfdfa",
    panel: "#eaece1",
    fern: "#dfe7d8",
    ink: "#1f2721",
    muted: "#59635a",
    line: "#d9dcce",
    moss: "#38553f",
    mossDeep: "#24402c",
    ember: "#9c5f1e",
    emberDeep: "#7c4a15",
    hues: {
      moss: { bg: "#dfe7d8", fg: "#24402c", accent: "#38553f" },
      honey: { bg: "#f1e4c2", fg: "#6d4e0e", accent: "#a97e1f" },
      sky: { bg: "#d9e6e8", fg: "#27515c", accent: "#3f7482" },
      plum: { bg: "#e6dded", fg: "#4d3760", accent: "#6d5387" },
      rose: { bg: "#f0dcdc", fg: "#6e3434", accent: "#9c4f4f" },
      ember: { bg: "#f2e2cf", fg: "#7c4a15", accent: "#9c5f1e" },
    },
  },
  dark: {
    surface: "#151a16",
    raised: "#1d231e",
    panel: "#222922",
    fern: "#263329",
    ink: "#e9ece4",
    muted: "#a3ac9d",
    line: "#2e362f",
    moss: "#8fb896",
    mossDeep: "#b1d3b6",
    ember: "#d9a057",
    emberDeep: "#e8b878",
    hues: {
      moss: { bg: "#263329", fg: "#b1d3b6", accent: "#8fb896" },
      honey: { bg: "#332b19", fg: "#e8ce8f", accent: "#d9b45e" },
      sky: { bg: "#1f2c2f", fg: "#a9cdd6", accent: "#7fb3bf" },
      plum: { bg: "#2b2433", fg: "#cdbbe0", accent: "#a98fc7" },
      rose: { bg: "#322222", fg: "#e3b8b8", accent: "#cf8f8f" },
      ember: { bg: "#33291c", fg: "#e8b878", accent: "#d9a057" },
    },
  },
};

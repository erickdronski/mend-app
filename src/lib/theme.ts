/**
 * Mend theme: Forest. Deep green, bone, and amber. A living room at dusk,
 * not a clinic. Same tokens as the web app, resolved per color scheme.
 */
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
};

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
  },
};

import { describe, expect, it } from "vitest";
import { getJourneyProgress, type StepContext } from "../src/lib/journey";
import type { JourneyState, PulseEntry } from "../src/lib/store";

const context = (pulses: PulseEntry[] = []): StepContext => ({
  profile: null,
  sessions: [],
  plan: { rituals: [], commitments: [] },
  challengesDone: [],
  pulses,
});

describe("journey progress", () => {
  it("does not count future chapter activity before the couple reaches it", () => {
    const journey: JourneyState = {
      stage: 1,
      doneSteps: ["s1-deck", "s5-deck"],
    };
    const progress = getJourneyProgress(context([
      { stage: 1, who: 0, scores: [4, 4, 4, 4, 4], date: "2026-07-24" },
    ]), journey);

    expect(progress.completedSteps).toBe(2);
    expect(progress.stages[0]).toMatchObject({ done: 2, status: "current" });
    expect(progress.stages[4]).toMatchObject({ done: 0, status: "upcoming" });
  });

  it("shows pulse movement only when both partners have answered both chapters", () => {
    const baseline: PulseEntry[] = [
      { stage: 1, who: 0, scores: [3, 3, 3, 3, 3], date: "2026-07-01" },
      { stage: 1, who: 1, scores: [3, 3, 3, 3, 3], date: "2026-07-01" },
      { stage: 2, who: 0, scores: [4, 4, 4, 4, 4], date: "2026-07-24" },
    ];
    const journey: JourneyState = { stage: 2, doneSteps: [] };

    expect(getJourneyProgress(context(baseline), journey).pulseDelta).toBeNull();

    const both = [
      ...baseline,
      { stage: 2, who: 1 as const, scores: [5, 5, 5, 5, 5], date: "2026-07-24" },
    ];
    const progress = getJourneyProgress(context(both), journey);

    expect(progress.baselinePulse).toBe(3);
    expect(progress.latestPulse).toBe(4.5);
    expect(progress.pulseDelta).toBe(1.5);
  });
});

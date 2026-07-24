import { describe, expect, it } from "vitest";
import { getRecommendations } from "../src/lib/recommendations";
import type { StepContext } from "../src/lib/journey";
import type { JourneyState, Profile } from "../src/lib/store";

const profile = (situation: Profile["situation"]): Profile => ({
  a: "Alex",
  b: "Jordan",
  safetyAck: true,
  createdAt: "2026-07-01",
  situation,
});

const context = (situation: Profile["situation"] = "just-us"): StepContext => ({
  profile: profile(situation),
  sessions: [],
  plan: { rituals: [], commitments: [] },
  challengesDone: [],
  pulses: [],
});

const journey: JourneyState = { stage: 2, doneSteps: [] };
const date = new Date("2026-07-24T12:00:00Z");

describe("relationship recommendations", () => {
  it("is stable for the same couple and day", () => {
    const first = getRecommendations(context(), journey, [], date, 3);
    const second = getRecommendations(context(), journey, [], date, 3);

    expect(second).toEqual(first);
  });

  it("rotates the mix across days", () => {
    const today = getRecommendations(context(), journey, [], date, 3).map((item) => item.id);
    const later = getRecommendations(
      context(),
      journey,
      [],
      new Date("2026-07-27T12:00:00Z"),
      3,
    ).map((item) => item.id);

    expect(later).not.toEqual(today);
  });

  it("foregrounds focused support for a heavier situation", () => {
    const picks = getRecommendations(context("money"), journey, [], date, 3);

    expect(picks.map((item) => item.id)).toContain("support-money-crisis");
    expect(picks.find((item) => item.id === "support-money-crisis")?.fit).toMatch(/told Mend/i);
  });

  it("moves recently opened ideas aside", () => {
    const first = getRecommendations(context(), journey, [], date, 3)[0];
    const next = getRecommendations(
      context(),
      journey,
      [{ id: first.id, openedAt: "2026-07-24T11:00:00Z" }],
      date,
      3,
    );

    expect(next.map((item) => item.id)).not.toContain(first.id);
  });

  it("offers different modes instead of three versions of the same task", () => {
    const picks = getRecommendations(context(), journey, [], date, 3);

    expect(new Set(picks.map((item) => item.kind)).size).toBe(3);
  });
});

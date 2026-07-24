import { describe, expect, it } from "vitest";
import { getConnectionMomentum } from "../src/lib/momentum";

const empty = {
  dailyDays: [],
  sessionDates: [],
  pulseDates: [],
  completedCommitmentDates: [],
  journeySteps: 0,
  completedChallenges: 0,
  rituals: 0,
};

describe("connection momentum", () => {
  it("starts without inventing progress", () => {
    const result = getConnectionMomentum(empty, new Date("2026-07-24T12:00:00Z"));
    expect(result.totalMoments).toBe(0);
    expect(result.headline).toBe("Ready when you are");
    expect(result.threads.every((thread) => !thread.active)).toBe(true);
  });

  it("counts cumulative practices without requiring consecutive days", () => {
    const result = getConnectionMomentum(
      {
        ...empty,
        dailyDays: ["2026-06-01", "2026-07-23"],
        sessionDates: ["2026-07-20T18:00:00Z"],
        journeySteps: 2,
        completedChallenges: 1,
        rituals: 1,
      },
      new Date("2026-07-24T12:00:00Z")
    );

    expect(result.totalMoments).toBe(7);
    expect(result.recentMoments).toBe(2);
    expect(result.headline).toBe("Building a practice");
    expect(result.threads.find((thread) => thread.id === "talk")?.active).toBe(true);
  });

  it("does not count future or invalid dates as recent", () => {
    const result = getConnectionMomentum(
      {
        ...empty,
        dailyDays: ["not-a-date", "2026-08-01"],
      },
      new Date("2026-07-24T12:00:00Z")
    );

    expect(result.totalMoments).toBe(2);
    expect(result.recentMoments).toBe(0);
  });
});

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const readSource = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

describe("universal product positioning", () => {
  const onboarding = readSource("src/app/onboarding.tsx");
  const universalSurfaces = [
    onboarding,
    readSource("src/app/(tabs)/index.tsx"),
    readSource("src/app/(tabs)/explore.tsx"),
    readSource("src/app/plan.tsx"),
    readSource("src/app/games.tsx"),
  ].join("\n");

  it("welcomes people who want to strengthen an already healthy relationship", () => {
    expect(onboarding).toMatch(/grow closer/i);
    expect(onboarding).toMatch(/in sync/i);
    expect(onboarding).toMatch(/understand each other/i);
  });

  it("does not frame every relationship as broken or in crisis", () => {
    expect(universalSurfaces).not.toMatch(
      /marriages rarely|relationship repair together|play your way back|what are you carrying|designed to be deleted|doesn't need this app|you graduated|ready to graduate/i,
    );
  });
});

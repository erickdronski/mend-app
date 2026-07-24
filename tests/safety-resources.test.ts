import { describe, expect, it } from "vitest";
import { crisisResources, therapyResources, whyGateMatters } from "../src/lib/content/safety";

describe("safety resources", () => {
  it("keeps the required US crisis routes visible", () => {
    const contacts = crisisResources.map((resource) => resource.contact).join(" ");

    expect(contacts).toContain("988");
    expect(contacts).toContain("1-800-799-7233");
    expect(contacts).toContain("START to 88788");
    expect(contacts).toContain("HOME to 741741");
  });

  it("provides an international route and valid secure links", () => {
    expect(crisisResources.some((resource) => resource.name === "Outside the US")).toBe(true);

    for (const resource of [...crisisResources, ...therapyResources]) {
      if (resource.url) expect(resource.url).toMatch(/^https:\/\//);
      expect(resource.name.trim()).not.toBe("");
      expect(resource.body.trim()).not.toBe("");
    }
  });

  it("preserves the coercive-control safety boundary", () => {
    expect(whyGateMatters).toContain("coercive control");
    expect(whyGateMatters).toContain("more dangerous");
    expect(whyGateMatters).toContain("free, confidential");
  });
});

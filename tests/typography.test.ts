import { describe, expect, it } from "vitest";
import { widowSafe } from "../src/lib/typography";

describe("widowSafe", () => {
  it("keeps three short final words together", () => {
    expect(widowSafe("keep making meaningful progress together.")).toBe(
      "keep making meaningful progress\u00a0together."
    );
  });

  it("keeps two words together when a three-word tail would be too wide", () => {
    expect(widowSafe("in the moments between you.")).toBe(
      "in the moments between\u00a0you."
    );
  });

  it("protects the final text segment in mixed children", () => {
    expect(widowSafe(["Start ", null, "with one kind thing."])).toEqual([
      "Start ",
      null,
      "with one\u00a0kind\u00a0thing.",
    ]);
  });
});

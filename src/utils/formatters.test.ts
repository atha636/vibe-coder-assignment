import { describe, it, expect } from "vitest";
import { formatFollowers, formatEngagementRate } from "./formatters";

describe("formatFollowers", () => {
  it("formats millions with one decimal", () => {
    expect(formatFollowers(1500000)).toBe("1.5M");
  });

  it("formats thousands with one decimal", () => {
    expect(formatFollowers(2500)).toBe("2.5K");
  });

  it("returns raw number as string under 1000", () => {
    expect(formatFollowers(500)).toBe("500");
  });
});

describe("formatEngagementRate", () => {
  it("converts decimal fraction to percentage", () => {
    expect(formatEngagementRate(0.0234)).toBe("2.34%");
  });

  it("returns N/A for undefined", () => {
    expect(formatEngagementRate(undefined)).toBe("N/A");
  });

  it("handles zero correctly", () => {
    expect(formatEngagementRate(0)).toBe("0.00%");
  });
});
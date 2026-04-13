import { describe, it, expect } from "vitest";
import { formatDate, estimateReadingTime, slugify } from "../../apps/web/lib/utils/formatting";

describe("formatDate", () => {
  it("formats ISO date to readable string", () => {
    expect(formatDate("2024-06-15T10:00:00Z")).toContain("June");
    expect(formatDate("2024-06-15T10:00:00Z")).toContain("2024");
  });
});

describe("estimateReadingTime", () => {
  it("returns at least 1 minute", () => { expect(estimateReadingTime("short")).toBe(1); });
  it("estimates correctly for longer text", () => {
    const words = Array(500).fill("word").join(" ");
    expect(estimateReadingTime(words)).toBe(2);
  });
});

describe("slugify", () => {
  it("converts to lowercase kebab-case", () => { expect(slugify("Hello World")).toBe("hello-world"); });
  it("removes special characters", () => { expect(slugify("What's New?!")).toBe("what-s-new"); });
});

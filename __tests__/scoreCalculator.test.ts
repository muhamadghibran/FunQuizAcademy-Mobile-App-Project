import {
  calculateScore,
  calculateProgress,
} from "../src/utils/scoreCalculator";

describe("Score Calculator Logic", () => {
  it("should calculate score correctly based on correct answers", () => {
    expect(calculateScore(5, 10)).toBe(50);
    expect(calculateScore(0, 10)).toBe(0);
    expect(calculateScore(3, 10)).toBe(30);
  });

  it("should handle custom points per question", () => {
    expect(calculateScore(2, 5)).toBe(10);
    expect(calculateScore(2, 20)).toBe(40);
  });

  it("should not return negative score", () => {
    expect(calculateScore(-1, 10)).toBe(0);
  });
});

describe("Progress Calculator Logic", () => {
  it("should calculate progress percentage correctly", () => {
    expect(calculateProgress(5, 10)).toBe(50);
    expect(calculateProgress(1, 4)).toBe(25);
    expect(calculateProgress(0, 10)).toBe(0);
    expect(calculateProgress(10, 10)).toBe(100);
  });

  it("should handle zero total questions safely", () => {
    expect(calculateProgress(5, 0)).toBe(0);
  });
});

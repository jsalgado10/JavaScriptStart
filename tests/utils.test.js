import { formatMoney, isValid } from "../src/utils";

describe("isValid", () => {
  test("should return false if passed an undefined value", () => {
    expect(isValid(undefined)).toEqual(false);
  });
  test("should return false if passed an nul value", () => {
    expect(isValid(null)).toEqual(false);
  });
  test("should return true if passed an empty string", () => {
    expect(isValid("")).toEqual(true);
  });
  test("should return true if given an empty object", () => {
    expect(isValid({})).toEqual(true);
  });
  test("should return true if given an array", () => {
    expect(isValid([])).toEqual(true);
  });
  test("should return true if given an integer", () => {
    expect(isValid(1)).toEqual(true);
  });
});

describe("formatMoney", () => {
  test("should return a dollar value if given 0", () => {
    expect(formatMoney(0)).toEqual("0.00");
  });
  test("should return a dollar value if given 1.2", () => {
    expect(formatMoney(1.2)).toEqual("1.20");
  });
  test("should return a dollar value if given 1.22333333", () => {
    expect(formatMoney(1.22333333)).toEqual("1.22");
  });
});

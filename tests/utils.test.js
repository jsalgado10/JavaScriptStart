import { isValid } from "../src/utils";

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

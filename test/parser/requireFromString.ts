import { requireFromString } from "../../lib/parser/script/requireFromString";

describe("requireFromString", () => {
  test("loads the default export", () => {
    const component = `module.exports = "foo";`;
    const exports = requireFromString(component, "test.js");
    expect(exports).toBe("foo");
  });
});

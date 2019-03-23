import { mount } from "../utils/importVueAsReact";

function runTest({ file, name = undefined, skip = false, only = false }) {
  const testFn = only ? test.only : skip ? test.skip : test;
  const desc = name ? name : file;
  testFn(desc, async () => {
    const { serialized, expected } = await mount(file);
    expect(serialized.html()).toBe(expected.html());
  });
}

describe("ReactSerializer", () => {
  const tests = [{ file: "0-SingleHtmlTag" }, { file: "1-SingleHtmlTagWithText" }, { file: "2-NestedHtml" }, { file: "3-HtmlWithAttributes" }, { file: "4-HtmlWithChildComponent" }];

  for (const test of tests) {
    runTest(test);
  }
});

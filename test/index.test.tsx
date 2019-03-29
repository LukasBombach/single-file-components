import mount from "./utils/importVueAndReact";

function runTest({ file, name = undefined, skip = false, only = false, props = {} }) {
  // prettier-ignore
  const testFn = 
    only ? test.only : 
    skip ? test.skip : 
    test;
  const desc = name ? name : file;

  testFn(desc, async () => {
    const { serialized, expected } = await mount(file, props);
    expect(serialized.html()).toBe(expected.html());
  });
}

describe("ReactSerializer", () => {
  const only = true;
  const skip = true;

  // prettier-ignore
  const tests = [
    { file: "0-SingleHtmlTag" },
    { file: "1-SingleHtmlTagWithText" },
    { file: "2-NestedHtml" },
    { file: "3-HtmlWithAttributes" },
    { file: "4-HtmlWithChildComponent" },
    { file: "5-HtmlWithChildComponentAndProps" },
    { file: "6-Props", props: { greeting: "hello" } },
    { file: "7-Data" },
  ];

  for (const test of tests) {
    runTest(test);
  }
});

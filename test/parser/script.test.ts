import ScriptParser from "../../lib/parser/script";

function setup() {
  const data = { data1: "data1", data2: "data2" };
  const props = { prop1: "prop1", prop2: "prop2" };
  const json = { data, props };
  const str = JSON.stringify(json);
  const file = `<script>module.exports = ${str};</script>`;
  const parsed = new ScriptParser().parse(file)[0];
  return { data, props, str, file, parsed };
}

describe("ScriptParser", () => {
  test("loads data", () => {
    const { parsed, data } = setup();
    expect(parsed).toEqual(expect.objectContaining({ data }));
  });

  test("loads props", () => {
    const { parsed, props } = setup();
    expect(parsed).toEqual(expect.objectContaining({ props }));
  });
});

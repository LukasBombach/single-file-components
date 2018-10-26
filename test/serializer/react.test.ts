// import Parser from "../lib/template/parser";
import ReactSerializer from "../../lib/serializer/react";
import { div, evalReactString, getReactElFromJson } from "../utils";

describe("ReactSerializer", () => {
  test.skip("an element", async () => {
    const json = div("contents");
    const codeAsString = ReactSerializer.template(json);
    expect(evalReactString(codeAsString)).toEqual(getReactElFromJson(json));
  });

  test.skip("an element with a prop", async () => {
    const json = div("contents", { foo: "bar" });
    const codeAsString = ReactSerializer.template(json);
    expect(evalReactString(codeAsString)).toEqual(getReactElFromJson(json));
  });

  test.skip("an element with a child element", async () => {
    const json = div(div("contents"));
    const codeAsString = ReactSerializer.template(json);
    expect(evalReactString(codeAsString)).toEqual(getReactElFromJson(json));
  });

  test.skip("functional code", async () => {
    const json = div("contents");
    const codeAsString = ReactSerializer.template(json);
    expect(evalReactString(codeAsString)).toEqual(getReactElFromJson(json));
  });
});

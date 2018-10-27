import { requireFromString } from "../utils/stringToReact";
import ReactSerializer from "../../lib/serializer/react";

import {
  div
  /*   evalReactString,
  getReactElFromJson,
  getReactClass */
} from "../utils";

/* function createReactClass(code) {
  return requireFromString(
    `const React = require('react');module.exports = ${code}`,
    "test.js"
  );
} */

function getReactClass(file) {}

describe("ReactSerializer", () => {
  test("an element", async () => {
    /* const template = div("contents");
    const name = "TestClass";
    const file = { name, template };
    const serializedClass = new ReactSerializer().serialize(file);
    const expectedClass = getReactClass(file);
    expect(serializedClass).toEqual(expectedClass); */

    const { json, ExpectedClass } = import("./components/singleDiv");
    const serializedClass = new ReactSerializer().serialize(file);
  });

  /* test.skip("an element with a prop", async () => {
    const template = div("contents", { foo: "bar" });
    const codeAsString = new ReactSerializer().serialize("Foo", { template });
    const render = () => getReactElFromJson(template);
    const Foo = getReactClass(render);
    expect(evalReactString("Foo", codeAsString)).toEqual(Foo);
  });

  test.skip("an element with a child element", async () => {
    const template = div(div("contents"));
    const codeAsString = new ReactSerializer().serialize("Foo", { template });
    const render = () => getReactElFromJson(template);
    const Foo = getReactClass(render);
    expect(evalReactString("Foo", codeAsString)).toEqual(Foo);
  });

  test.skip("functional code", async () => {
    const template = div("contents");
    const codeAsString = new ReactSerializer().serialize("Foo", { template });
    const render = () => getReactElFromJson(template);
    const Foo = getReactClass(render);
    expect(evalReactString("Foo", codeAsString)).toEqual(Foo);
  }); */
});

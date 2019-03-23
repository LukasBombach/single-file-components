import { promises } from "fs";
import * as React from "react";
import * as Enzyme from "enzyme";
import Parser from "../../lib/parser";
import ReactSerializer from "../../lib/serializer/react";

async function getNativeReact(fixture: string) {
  const ExpectedClass = await import(`../fixtures/components/${fixture}.tsx`);
  return Enzyme.mount(<ExpectedClass />);
}

async function getSerializedReact(fixture: string) {
  const vueFileAsString = await promises.readFile(`${__dirname}/../fixtures/components/${fixture}.vue`, "utf8");
  const component = new Parser(vueFileAsString).getComponent();
  const serializedClassString = new ReactSerializer(component).toString();
  const SerializedClass = eval(`(() => {const React = require("react");return ${serializedClassString};})()`);
  console.log(SerializedClass);
  console.log(SerializedClass.toString());
  console.log(<SerializedClass />);
  return Enzyme.mount(<SerializedClass />);
}

async function mount(fixture: string) {
  const serialized = await getSerializedReact(fixture);
  const expected = await getNativeReact(fixture);
  return { serialized, expected };
}

function runTest({ file, name = undefined, skip = false, only = false }) {
  const testFn = only ? test.only : skip ? test.skip : test;
  const desc = name ? name : file;
  testFn(desc, async () => {
    const { serialized, expected } = await mount(file);
    expect(serialized.html()).toBe(expected.html());
  });
}

describe("ReactSerializer", () => {
  const tests = [{ file: "0-SingleHtmlTag" }];

  for (const test of tests) {
    runTest(test);
  }
});

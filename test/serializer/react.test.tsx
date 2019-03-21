import { promises } from "fs";
import * as React from "react";
import * as Enzyme from "enzyme";
import Parser from "../../lib/parser";
import ReactSerializer from "../../lib/serializer/react";

async function getNativeReact(fixture: string) {
  const ExpectedClass = await import(`../fixtures/components/${fixture}`);
  return Enzyme.mount(<ExpectedClass />);
}

async function getSerializedReact(fixture: string) {
  const vueFileAsString = await promises.readFile(`../fixtures/components/${fixture}`, "utf8");
  const component = new Parser(vueFileAsString).getComponent();
  const serializedClassString = new ReactSerializer(component).toString();
  const SerializedClass = eval(serializedClassString); // const SerializedClass = eval(`(() => ${serializedClassString})()`);
  return Enzyme.mount(<SerializedClass />);
}

async function mount(fixture: string) {
  const serialized = await getSerializedReact(fixture);
  const expected = await getNativeReact(fixture);
  return { serialized, expected };
}

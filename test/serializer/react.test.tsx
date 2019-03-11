import * as React from "react";
import * as Enzyme from "enzyme";
import ReactSerializer from "../../lib/serializer/react";
import stringToReact from "../utils/stringToReact";

async function mount(path) {
  const { compDescriptor, ExpectedClass } = await import(path);
  const serializedClassString = new ReactSerializer().serialize(compDescriptor);
  const SerializedClass = stringToReact(serializedClassString);
  const serialized = Enzyme.mount(<SerializedClass />);
  const expected = Enzyme.mount(<ExpectedClass />);
  return { serialized, expected };
}

describe("ReactSerializer", () => {
  test("an sigle div", async () => {
    const { serialized, expected } = await mount("./fixtures/singleTag");
    expect(serialized.html()).toBe(expected.html());
  });

  test("a div with text", async () => {
    const { serialized, expected } = await mount("./fixtures/text");
    expect(serialized.html()).toBe(expected.html());
  });

  test("a div with attrs", async () => {
    const { serialized, expected } = await mount("./fixtures/attrs");
    expect(serialized.html()).toBe(expected.html());
  });

  test("a div with nested HTML", async () => {
    const { serialized, expected } = await mount("./fixtures/nestedHtml");
    expect(serialized.html()).toBe(expected.html());
  });

  test("a div with a state variable", async () => {
    const { serialized, expected } = await mount("./fixtures/state");
    expect(serialized.html()).toBe(expected.html());
  });

  test("a div with a child component", async () => {
    const { serialized, expected } = await mount("./fixtures/childComponent");
    expect(serialized.html()).toBe(expected.html());
  });

  test("a child component with props", async () => {
    const { serialized, expected } = await mount("./fixtures/props");
    expect(serialized.html()).toBe(expected.html());
  });

  test.only("a v-for loop", async () => {
    const { serialized, expected } = await mount("./fixtures/forLoop");
    expect(serialized.html()).toBe(expected.html());
  });

  test("a v-for loop with index and child and attrs", async () => {
    const { serialized, expected } = await mount("./fixtures/forLoopWithIndexAndChildAndAttrs");
    expect(serialized.html()).toBe(expected.html());
  });
});

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
    const { serialized, expected } = await mount("./fixtures/withText");
    expect(serialized.html()).toBe(expected.html());
  });

  test("a div with attrs", async () => {
    const { serialized, expected } = await mount("./fixtures/withAttrs");
    expect(serialized.html()).toBe(expected.html());
  });

  test("a div with nested HTML", async () => {
    const { serialized, expected } = await mount("./fixtures/withNestedHtml");
    expect(serialized.html()).toBe(expected.html());
  });

  test("a div with a state variable", async () => {
    const { serialized, expected } = await mount("./fixtures/withState");
    expect(serialized.html()).toBe(expected.html());
  });

  test("a div with a child component", async () => {
    const { serialized, expected } = await mount("./fixtures/withChildComponent");
    expect(serialized.html()).toBe(expected.html());
  });
});

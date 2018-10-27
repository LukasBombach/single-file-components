import "raf/polyfill";
import "jsdom-global/register";
import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import ReactSerializer from "../../lib/serializer/react";
import { stringToReact } from "../utils/stringToReact";

Enzyme.configure({ adapter: new Adapter() });

async function mount(path) {
  const { file, ExpectedClass } = await import(path);
  const serializedClassString = new ReactSerializer().serialize(file);
  const SerializedClass = stringToReact(serializedClassString);
  const serialized = Enzyme.mount(<SerializedClass />);
  const expected = Enzyme.mount(<ExpectedClass />);
  return { serialized, expected };
}

describe("ReactSerializer", () => {
  test("an element", async () => {
    const { serialized, expected } = await mount("./components/singleDiv");
    // expect(serialized).toEqual(expected);
  });
});

import { promises } from "fs";
import * as React from "react";
import * as Enzyme from "enzyme";
import Parser from "../../lib/parser";
import ReactSerializer from "../../lib/serializer/react";

export async function importVueAsReact(path: string) {
  const vueFileAsString = await promises.readFile(path, "utf8");
  const component = new Parser(vueFileAsString).getComponent();
  const serializedClassString = new ReactSerializer(component).toString();
  return eval(`(() => ${serializedClassString})()`);
}

export async function importReact(fixture: string) {
  return (await import(`${__dirname}/../fixtures/components/${fixture}.tsx`)).default;
}

export async function mount(fixture: string) {
  const SerializedClass = await importVueAsReact(`${__dirname}/../fixtures/components/${fixture}.vue`);
  const ExpectedClass = await importReact(fixture);
  const serialized = Enzyme.mount(<SerializedClass />);
  const expected = Enzyme.mount(<ExpectedClass />);
  return { serialized, expected };
}

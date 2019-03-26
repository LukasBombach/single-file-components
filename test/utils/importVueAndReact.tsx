import React from "react";
import Enzyme from "enzyme";
import compiler from "../compiler";

export async function importFromCompiler(fileName: string) {
  const output = await compiler(`${__dirname}/../fixtures/components/${fileName}`);
  console.log((output as Buffer).toString("utf8"));
  return eval(`(() => ${output})()`);
}

export async function importReact(fixture: string) {
  return (await import(`${__dirname}/../fixtures/components/${fixture}`)).default;
}

export default async function mount(fixture: string) {
  const SerializedClass = await importFromCompiler(`${fixture}.vue`);
  const ExpectedClass = await importReact(`${fixture}.tsx`);
  const serialized = Enzyme.mount(<SerializedClass />);
  const expected = Enzyme.mount(<ExpectedClass />);
  return { SerializedClass, ExpectedClass, serialized, expected };
}

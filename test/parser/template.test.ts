import TemplateParser from "../../lib/parser/template";

const element = (name, ...args) => {
  const lastArg = args[args.length - 1];
  const hasAttrs = lastArg.toString() !== "ObjectContaining";
  const children = hasAttrs ? args.slice(0, -1) : args;
  const attrs = hasAttrs ? { attrs: expect.objectContaining(lastArg) } : undefined;
  const type = "element";
  const expectedObject = Object.assign({}, { type, name, children }, attrs);
  return expect.objectContaining(expectedObject);
};

const div = (...args) => element("div", ...args);
const p = (...args) => element("p", ...args);
const ul = (...args) => element("ul", ...args);
const li = (...args) => element("li", ...args);
const text = text => expect.objectContaining({ type: "text", text });
const root = root => ({ root });

describe("ScriptParser", () => {
  test("a single tag", async () => {
    const html = `<template><div>contents</div></template>`;
    const expectedJson = root(div(text("contents")));
    expect(new TemplateParser().parse(html)).toEqual(expectedJson);
  });

  test("a tag containing a tag", async () => {
    const html = `<template><div><p>contents</p></div></template>`;
    const expectedJson = root(div(p(text("contents"))));
    expect(new TemplateParser().parse(html)).toEqual(expectedJson);
  });

  test("a tag containing a tag with the same tagname", async () => {
    const html = `<template><div><div>contents</div></div></template>`;
    const expectedJson = root(div(div(text("contents"))));
    expect(new TemplateParser().parse(html)).toEqual(expectedJson);
  });

  test("mixed tags and text", async () => {
    const html = `<template><div><div>a</div>b<div>c</div>d</div></template>`;
    const expectedJson = root(div(div(text("a")), text("b"), div(text("c")), text("d")));
    expect(new TemplateParser().parse(html)).toEqual(expectedJson);
  });

  test("deeply nested tags", async () => {
    const html = `<template><div><div><div><div>a</div></div></div></div></template>`;
    const expectedJson = root(div(div(div(div(text("a"))))));
    expect(new TemplateParser().parse(html)).toEqual(expectedJson);
  });

  test("deeply nested mixed tags", async () => {
    const html = `<template><div><p><div><p>a</p></div></p></div></template>`;
    const expectedJson = root(div(p(div(p(text("a"))))));
    expect(new TemplateParser().parse(html)).toEqual(expectedJson);
  });

  test("a single tag with attributes", async () => {
    const html = `<template><div id="app" class="loaded">contents</div></template>`;
    const expectedJson = root(div(text("contents"), { id: "app", class: "loaded" }));
    expect(new TemplateParser().parse(html)).toEqual(expectedJson);
  });

  test("a tag with attributes containing a tag with attributes", async () => {
    const html = `<template><div id="div"><p id="p">contents</p></div></template>`;
    const expectedJson = root(div(p(text("contents"), { id: "p" }), { id: "div" }));
    expect(new TemplateParser().parse(html)).toEqual(expectedJson);
  });

  test("a for-loop", async () => {
    const html = `<template><ul><li v-for="item in items">{{ item.message }}</li></ul></template>`;
    const expectedJson = root(ul(li(text("{{ item.message }}"), { "v-for": "item in items" })));
    expect(new TemplateParser().parse(html)).toEqual(expectedJson);
  });

  test("a for-loop with attreibute", async () => {
    const html = `<template><ul id="example-1"><li v-for="item in items">{{ item.message }}</li></ul></template>`;
    const expectedJson = root(ul(li(text("{{ item.message }}"), { "v-for": "item in items" }), { id: "example-1" }));
    expect(new TemplateParser().parse(html)).toEqual(expectedJson);
  });
});

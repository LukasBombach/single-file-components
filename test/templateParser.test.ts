import TemplateParser from '../lib/templateParser';

const div = (...children) => expect.objectContaining({ tagName: "div", children })
const p = (...children) => expect.objectContaining({ tagName: "p", children })

test('a single tag', async () => {
  const html = `<template><div>contents</div></template>`;
  const expectedJson = div("contents");
  expect(TemplateParser.getJson(html)).toEqual(expectedJson)
});

test('a tag containing a tag', async () => {
  const html = `<template><div><p>contents</p></div></template>`;
  const expectedJson = div(p("contents"));
  expect(TemplateParser.getJson(html)).toEqual(expectedJson)
});

test('a tag containing a tag with the same tagname', async () => {
  const html = `<template><div><div>contents</div></div></template>`;
  const expectedJson = div(div("contents"));
  expect(TemplateParser.getJson(html)).toEqual(expectedJson)
});

test('mixed tags and text', async () => {
  const html = `<template><div><div>a</div>b<div>c</div>d</div></template>`;
  const expectedJson = div(div("a"), "b", div("c"), "d");
  expect(TemplateParser.getJson(html)).toEqual(expectedJson)
});

test('deeply nested tags', async () => {
  const html = `<template><div><div><div><div>a</div></div></div></div></template>`;
  const expectedJson = div(div(div(div("a"))));
  expect(TemplateParser.getJson(html)).toEqual(expectedJson)
});

test('deeply nested mixed tags', async () => {
  const html = `<template><div><p><div><p>a</p></div></p></div></template>`;
  const expectedJson = div(p(div(p("a"))));
  expect(TemplateParser.getJson(html)).toEqual(expectedJson)
});


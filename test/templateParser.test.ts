import Parser from '../lib/template/parser';

const div = (...children) => expect.objectContaining({ tagName: "div", children })
const p = (...children) => expect.objectContaining({ tagName: "p", children })

test('a single tag', async () => {
  const html = `<template><div>contents</div></template>`;
  const expectedJson = div("contents");
  expect(Parser.getJson(html)).toEqual(expectedJson)
});

test('a tag containing a tag', async () => {
  const html = `<template><div><p>contents</p></div></template>`;
  const expectedJson = div(p("contents"));
  expect(Parser.getJson(html)).toEqual(expectedJson)
});

test('a tag containing a tag with the same tagname', async () => {
  const html = `<template><div><div>contents</div></div></template>`;
  const expectedJson = div(div("contents"));
  expect(Parser.getJson(html)).toEqual(expectedJson)
});

test('mixed tags and text', async () => {
  const html = `<template><div><div>a</div>b<div>c</div>d</div></template>`;
  const expectedJson = div(div("a"), "b", div("c"), "d");
  expect(Parser.getJson(html)).toEqual(expectedJson)
});

test('deeply nested tags', async () => {
  const html = `<template><div><div><div><div>a</div></div></div></div></template>`;
  const expectedJson = div(div(div(div("a"))));
  expect(Parser.getJson(html)).toEqual(expectedJson)
});

test('deeply nested mixed tags', async () => {
  const html = `<template><div><p><div><p>a</p></div></p></div></template>`;
  const expectedJson = div(p(div(p("a"))));
  expect(Parser.getJson(html)).toEqual(expectedJson)
});

test('a single tag with attributes', async () => {
  const html = `<template><div id="app" class="loaded">contents</div></template>`;
  const props = [{ name: 'id', value: 'app' }, { name: 'class', value: 'loaded' }]
  const expectedJson = expect.objectContaining({ tagName: "div", children: ["contents"], props })
  expect(Parser.getJson(html)).toEqual(expectedJson)
});

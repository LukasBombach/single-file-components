import TemplateParser from '../lib/templateParser'

test.skip('a single tag', async () => {
  const html = `<template><div>contents</div></template>`;
  const expectedJson = { tagName: "div", children: "contents" };
  expect(TemplateParser.getJson(html)).toEqual(expectedJson)
});

test.skip('a tag containing a tag', async () => {
  const html = `<template><div><p>contents</p></div></template>`;
  const expectedJson = {children: [{children: "contents", tagName: "p"}], tagName: "div"};
  expect(TemplateParser.getJson(html)).toEqual(expectedJson)
});

test.skip('a tag containing a tag with the same tagname', async () => {
  const html = `<template><div><div>contents</div></div></template>`;
  const expectedJson = {children: [{children: "contents", tagName: "div"}], tagName: "div"};
  expect(TemplateParser.getJson(html)).toEqual(expectedJson)
});

test.skip('mixed tags and text', async () => {
  const html = `<template><div>a</div>b<div>c</div>d</template>`;
  const expectedJson = {children: [{children: "contents", tagName: "div"}], tagName: "div"};
  expect(TemplateParser.getJson(html)).toEqual(expectedJson)
});


test('dummy', async () => {
  const html = `
  <div>
    <div>a</div>
    text
    <div>
      <div>b</div>
    </div>
    text
    <div>
      c
      <div>d</div>
    </div>
    text
    <div>e</div>
  </div>
  `.replace(/\s/g, '');
  TemplateParser.getJson(html);
});
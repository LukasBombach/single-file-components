import TemplateParser from '../lib/templateParser'

test('returns JSON for a single tag', async () => {
  const html = `<template><div>contents</div></template>`;
  const expectedJson = { tagName: 'div', children: 'contents' };
  expect(TemplateParser.getJson(html)).toEqual(expectedJson)
});

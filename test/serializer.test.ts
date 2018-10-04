import Parser from '../lib/template/parser';
import ReactSerializer from '../lib/serializer/react';

test('an element', async () => {
  const json = Parser.getJson(`<template><div>contents</div></template>`);
  expect(ReactSerializer.serialize(json)).toBe(`React.createElement(div, {}, ["contents"])`)
});

test('an element with a prop', async () => {
  const json = Parser.getJson(`<template><div foo="bar">contents</div></template>`);
  expect(ReactSerializer.serialize(json)).toBe(`React.createElement(div, {"foo":"bar"}, ["contents"])`)
});

test('an element with a child element', async () => {
  const json = Parser.getJson(`<template><div><div>contents</div></div></template>`);
  expect(ReactSerializer.serialize(json)).toBe(`React.createElement(div, {}, [React.createElement(div, {}, ["contents"])])`)
});

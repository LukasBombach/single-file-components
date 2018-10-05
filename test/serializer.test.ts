import Parser from '../lib/template/parser';
import ReactSerializer from '../lib/serializer/react';

import { div, evalReactString, getReactElFromJson } from './utils';

test('an element', async () => {
  const json = div("contents");
  const codeAsString = ReactSerializer.serialize(json);
  expect(evalReactString(codeAsString)).toEqual(getReactElFromJson(json));
});

test('an element with a prop', async () => {
  const json = Parser.getJson(`<template><div foo="bar">contents</div></template>`);
  const codeAsString = ReactSerializer.serialize(json);
  expect(evalReactString(codeAsString)).toEqual(getReactElFromJson(json));
});

test('an element with a child element', async () => {
  const json = div(div("contents"));
  const codeAsString = ReactSerializer.serialize(json);
  expect(evalReactString(codeAsString)).toEqual(getReactElFromJson(json));
});

test('functional code', async () => {
  const json = div("contents");
  const codeAsString = ReactSerializer.serialize(json);
  expect(evalReactString(codeAsString)).toEqual(getReactElFromJson(json));
});

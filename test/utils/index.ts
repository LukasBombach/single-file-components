import * as React from 'react';
import { ElementJson, Prop } from '../../lib/template/json';

export const div = (...children) => tag("div", ...children);
export const p = (...children) => tag("p", ...children);
export const a = (...children) => tag("a", ...children);

export const evalReactString = code => eval(`const React = require('react');${code}`);
export const getReactElFromJson = json => typeof json === 'string' ? json : React.createElement(json.tagName, {}, json.children.map(child => getReactElFromJson(child)));

function tag(tagName: string, ..._children: (ElementJson | Prop)[]): ElementJson {
  const children = (hasProps(_children) ? _children.slice(0, -1) : _children) as ElementJson[];
  const props = (hasProps(_children) ? _children.slice(-1)[0] : []) as Prop[];
  const parent = null;
  return { tagName, props, children, parent };
}

function hasProps(children: (ElementJson | Prop)[]): boolean {
  return !!children.length && !isElementJson(children.slice(-1)[0] as ElementJson)
}

function isElementJson(obj: ElementJson): boolean {
  const keys = Object.keys(obj);
  return typeof obj === "string" || ["tagName", "props", "children", "parent"]
      .reduce((ret, key) => ret && keys.indexOf(key) !== -1, true);
}


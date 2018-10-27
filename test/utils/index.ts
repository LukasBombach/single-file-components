import * as React from "react";
import { TemplateElement, Props } from "../../lib/model/template";
import { requireFromString } from "./stringToReact";

export const div = (...children) => tag("div", ...children);
export const p = (...children) => tag("p", ...children);
export const a = (...children) => tag("a", ...children);

export const evalReactString = (className, code) =>
  requireFromString(
    `const React = require('react');module.exports = ${code}`,
    "fooasd.js"
  );

export const getReactElFromJson = json =>
  typeof json === "string"
    ? json
    : React.createElement(
        json.tagName,
        json.props,
        json.children.map(child => getReactElFromJson(child))
      );

export const getReactClass = _render =>
  class Foo extends React.Component {
    render = _render;
  };

function tag(
  tagName: string,
  ..._children: (TemplateElement | Props)[]
): TemplateElement {
  const children = (hasProps(_children)
    ? _children.slice(0, -1)
    : _children) as TemplateElement[];
  const props = {}; // (hasProps(_children) ? _children.slice(-1)[0] : {}) as Props[];
  const parent = null;
  return { tagName, props, children, parent };
}

function hasProps(children: (TemplateElement | Props)[]): boolean {
  return (
    !!children.length &&
    !isElementJson(children.slice(-1)[0] as TemplateElement)
  );
}

function isElementJson(obj: TemplateElement): boolean {
  const keys = Object.keys(obj);
  return (
    typeof obj === "string" ||
    ["tagName", "props", "children", "parent"].reduce(
      (ret, key) => ret && keys.indexOf(key) !== -1,
      true
    )
  );
}

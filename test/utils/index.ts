import * as React from "react";
import { AbstractElement, Props } from "../../lib/model/template";

export const div = (...children) => tag("div", ...children);
export const p = (...children) => tag("p", ...children);
export const a = (...children) => tag("a", ...children);

export const evalReactString = code =>
  eval(`const React = require('react');${code}`);
export const getReactElFromJson = json =>
  typeof json === "string"
    ? json
    : React.createElement(
        json.tagName,
        json.props,
        json.children.map(child => getReactElFromJson(child))
      );

function tag(
  tagName: string,
  ..._children: (AbstractElement | Props)[]
): AbstractElement {
  const children = (hasProps(_children)
    ? _children.slice(0, -1)
    : _children) as AbstractElement[];
  const props = {}; // (hasProps(_children) ? _children.slice(-1)[0] : {}) as Props[];
  const parent = null;
  return { tagName, props, children, parent };
}

function hasProps(children: (AbstractElement | Props)[]): boolean {
  return (
    !!children.length &&
    !isElementJson(children.slice(-1)[0] as AbstractElement)
  );
}

function isElementJson(obj: AbstractElement): boolean {
  const keys = Object.keys(obj);
  return (
    typeof obj === "string" ||
    ["tagName", "props", "children", "parent"].reduce(
      (ret, key) => ret && keys.indexOf(key) !== -1,
      true
    )
  );
}

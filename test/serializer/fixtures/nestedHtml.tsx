import * as React from "react";
import { Component } from "../../../lib/model/component";
import { Element } from "../../../lib/model/template";

const childElement: Element = {
  name: "p",
  children: [{ type: "text", text: "contents" }],
  attrs: {}
};

export const compDescriptor: Component = {
  fileName: "ExpectedClass",
  template: {
    root: {
      name: "div",
      children: [childElement],
      attrs: {}
    }
  }
};

class ChildElement extends React.Component {
  render() {
    return <p>contents</p>;
  }
}

export class ExpectedClass extends React.Component {
  render() {
    return (
      <div>
        <ChildElement />
      </div>
    );
  }
}

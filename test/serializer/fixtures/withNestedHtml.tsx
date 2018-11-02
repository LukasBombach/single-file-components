import * as React from "react";
import { ComponentDescriptor } from "../../../lib/model/component";
import { ElementDescriptor } from "../../../lib/model/template";

const childElement: ElementDescriptor = {
  tagName: "p",
  children: ["contents"],
  attrs: {},
  parent: null
};

export const fileDescriptor: ComponentDescriptor = {
  fileName: "ExpectedClass",
  template: {
    root: {
      tagName: "div",
      children: [childElement],
      attrs: {},
      parent: null
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

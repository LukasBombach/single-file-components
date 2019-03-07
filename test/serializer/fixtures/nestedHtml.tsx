import * as React from "react";
import { ComponentDescriptor } from "../../../lib/model/component";
import { ElementDescriptor } from "../../../lib/model/template";

const childElement: ElementDescriptor = {
  name: "p",
  children: [{ type: "text", text: "contents" }],
  attrs: {}
};

export const compDescriptor: ComponentDescriptor = {
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

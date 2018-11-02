import * as React from "react";
import { ComponentDescriptor } from "../../../lib/model/component";

const childElement = {
  name: "p",
  children: ["contents"],
  attrs: {},
  parent: null
};

export const fileDescriptor: ComponentDescriptor = {
  fileName: "ExpectedClass",
  template: {
    root: {
      name: "div",
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

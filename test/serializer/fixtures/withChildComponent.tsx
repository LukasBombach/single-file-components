import * as React from "react";
import { ComponentDescriptor } from "../../../lib/model/component";
import { ElementDescriptor } from "../../../lib/model/template";

const ChildComponent: ComponentDescriptor = {
  fileName: "ChildElement",
  template: {
    root: {
      name: "p",
      attrs: {},
      children: ["contents"]
    }
  }
};

const childElement: ElementDescriptor = {
  name: "child-component",
  attrs: {},
  children: []
};

export const componentDescriptor: ComponentDescriptor = {
  fileName: "ExpectedClass",
  template: {
    root: {
      name: "div",
      attrs: {},
      children: [childElement]
    }
  },
  script: {
    components: {
      ChildComponent
    },
    data: {},
    props: {}
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

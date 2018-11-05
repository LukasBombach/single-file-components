import * as React from "react";
import { ComponentDescriptor } from "../../../lib/model/component";

const ChildComponent: ComponentDescriptor = {
  fileName: "ChildElement",
  template: {
    root: {
      tagName: "p",
      attrs: {},
      children: ["contents"]
    }
  }
};

export const compDescriptor: ComponentDescriptor = {
  fileName: "ExpectedClass",
  template: {
    root: {
      tagName: "div",
      attrs: {},
      children: [
        {
          tagName: "ChildComponent",
          attrs: {},
          children: []
        }
      ]
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

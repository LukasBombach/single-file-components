import * as React from "react";
import { ComponentDescriptor } from "../../../lib/model/component";

const ChildComponent: ComponentDescriptor = {
  fileName: "ChildComponent",
  template: {
    root: {
      name: "p",
      attrs: {},
      children: [{ type: "text", text: "contents" }]
    }
  }
};

export const compDescriptor: ComponentDescriptor = {
  fileName: "ExpectedClass",
  template: {
    root: {
      name: "div",
      attrs: {},
      children: [
        {
          name: "ChildComponent",
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

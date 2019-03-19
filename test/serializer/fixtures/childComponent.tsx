import * as React from "react";
import Component from "../../../lib/model/component";
import { ElementType } from "../../../lib/model/template";

const ChildComponent: Component = {
  fileName: "ChildComponent",
  template: {
    root: {
      name: "p",
      type: ElementType.Element,
      props: {},
      children: [{ type: ElementType.Text, text: "contents" }]
    }
  }
};

export const compDescriptor: Component = {
  fileName: "ExpectedClass",
  template: {
    root: {
      name: "div",
      type: ElementType.Element,
      props: {},
      children: [
        {
          name: "ChildComponent",
          type: ElementType.Element,
          props: {},
          children: []
        }
      ]
    }
  },
  script: {
    components: {
      ChildComponent
    },
    data() {
      return {};
    },
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

import * as React from "react";
import Component from "../../../lib/model/component";
import { ElementType } from "../../../lib/model/template";
import { Element } from "../../../lib/model/template";

const childElement: Element = {
  name: "p",
  type: ElementType.Element,
  children: [{ type: ElementType.Text, text: "contents" }],
  props: {}
};

export const compDescriptor: Component = {
  fileName: "ExpectedClass",
  template: {
    root: {
      name: "div",
      type: ElementType.Element,
      children: [childElement],
      props: {}
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

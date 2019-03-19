import * as React from "react";
import Component from "../../../lib/model/component";
import { ElementType } from "../../../lib/model/template";

export const compDescriptor: Component = {
  fileName: "ExpectedClass",
  template: {
    root: {
      name: "div",
      type: ElementType.Element,
      children: [{ type: ElementType.Text, text: "contents" }],
      props: {}
    }
  }
};

export class ExpectedClass extends React.Component {
  render() {
    return <div>contents</div>;
  }
}

import * as React from "react";
import Component from "../../../lib/model/component";
import { ElementType } from "../../../lib/model/template";

export const compDescriptor: Component = {
  fileName: "ExpectedClass",
  template: {
    root: {
      type: ElementType.Element,
      name: "div",
      children: [],
      props: {}
    }
  }
};

export class ExpectedClass extends React.Component {
  render() {
    return <div />;
  }
}

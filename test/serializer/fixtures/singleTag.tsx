import * as React from "react";
import { ComponentDescriptor } from "../../../lib/model/component";

export const compDescriptor: ComponentDescriptor = {
  fileName: "ExpectedClass",
  template: {
    root: {
      tagName: "div",
      children: [],
      attrs: {},
      parent: null
    }
  }
};

export class ExpectedClass extends React.Component {
  render() {
    return <div />;
  }
}

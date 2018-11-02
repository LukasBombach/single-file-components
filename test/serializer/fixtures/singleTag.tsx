import * as React from "react";
import { ComponentDescriptor } from "../../../lib/model/component";

export const fileDescriptor: ComponentDescriptor = {
  fileName: "ExpectedClass",
  template: {
    root: {
      name: "div",
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

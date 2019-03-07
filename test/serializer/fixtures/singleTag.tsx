import * as React from "react";
import { ComponentDescriptor } from "../../../lib/model/component";

export const compDescriptor: ComponentDescriptor = {
  fileName: "ExpectedClass",
  template: {
    root: {
      name: "div",
      children: [],
      attrs: {}
    }
  }
};

export class ExpectedClass extends React.Component {
  render() {
    return <div />;
  }
}

import * as React from "react";
import { ComponentDescriptor } from "../../../lib/model/component";

export const fileDescriptor: ComponentDescriptor = {
  fileName: "ExpectedClass",
  template: {
    root: {
      tagName: "div",
      children: [],
      attrs: { id: "id", "data-test": "data test" },
      parent: null
    }
  }
};

export class ExpectedClass extends React.Component {
  render() {
    return <div id="id" data-test="data test" />;
  }
}

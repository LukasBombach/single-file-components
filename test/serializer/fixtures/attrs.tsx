import * as React from "react";
import { Component } from "../../../lib/model/component";

export const compDescriptor: Component = {
  fileName: "ExpectedClass",
  template: {
    root: {
      name: "div",
      children: [],
      attrs: { id: "id", "data-test": "data test" }
    }
  }
};

export class ExpectedClass extends React.Component {
  render() {
    return <div id="id" data-test="data test" />;
  }
}

import * as React from "react";
import { Component } from "../../../lib/model/component";

export const compDescriptor: Component = {
  fileName: "ExpectedClass",
  template: {
    root: {
      name: "div",
      children: [{ type: "text", text: "Hello {{ greeting }}" }],
      attrs: {}
    }
  },
  script: {
    components: {},
    data: {
      greeting: "World"
    },
    props: {}
  }
};

export class ExpectedClass extends React.Component {
  state = { greeting: "World" };

  render() {
    return <div>Hello {this.state.greeting}</div>;
  }
}

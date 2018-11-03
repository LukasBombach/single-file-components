import * as React from "react";
import { ComponentDescriptor } from "../../../lib/model/component";

export const compDescriptor: ComponentDescriptor = {
  fileName: "ExpectedClass",
  template: {
    root: {
      tagName: "div",
      children: ["Hello {{ greeting }}"],
      attrs: {},
      parent: null
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

import * as React from "react";
import Component from "../../../lib/model/component";
import { ElementType } from "../../../lib/model/template";

export const compDescriptor: Component = {
  fileName: "ExpectedClass",
  template: {
    root: {
      name: "div",
      type: ElementType.Element,
      children: [{ type: ElementType.Text, text: "Hello {{ greeting }}" }],
      props: {}
    }
  },
  script: {
    data() {
      return {
        greeting: "World"
      };
    }
  }
};

export class ExpectedClass extends React.Component {
  state = { greeting: "World" };

  render() {
    return <div>Hello {this.state.greeting}</div>;
  }
}

import * as React from "react";
import { FileDescriptor } from "../../../lib/model/file";

export const fileDescriptor: FileDescriptor = {
  name: "ExpectedClass",
  template: {
    tagName: "div",
    children: ["Hello {{ greeting }}"],
    props: {},
    parent: null
  },
  script: {
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

import * as React from "react";
import { FileDescriptor } from "../../../lib/model/file";

export const fileDescriptor: FileDescriptor = {
  name: "ExpectedClass",
  template: {
    tagName: "div",
    children: ["contents"],
    props: {},
    parent: null
  }
};

export class ExpectedClass extends React.Component {
  render() {
    return <div>contents</div>;
  }
}

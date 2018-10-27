import * as React from "react";
import { FileDescriptor } from "../../../lib/model/file";

export const fileDescriptor: FileDescriptor = {
  name: "ExpectedClass",
  template: {
    tagName: "div",
    children: [],
    props: {},
    parent: null
  }
};

export class ExpectedClass extends React.Component {
  render() {
    return <div id="id" data-test="data test" />;
  }
}

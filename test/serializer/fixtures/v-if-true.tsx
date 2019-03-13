import * as React from "react";
import { ComponentDescriptor } from "../../../lib/model/component";

export const compDescriptor: ComponentDescriptor = {
  fileName: "ExpectedClass",
  template: {
    root: {
      type: "element",
      name: "hr",
      attrs: {
        "v-if": "config && config.var === 'val'"
      }
    }
  },
  script: {
    components: {},
    data: {
      config: {
        var: "val"
      }
    },
    props: {}
  }
};

export class ExpectedClass extends React.Component {
  state = {
    config: {
      var: "val"
    }
  };

  render() {
    return this.state.config.var === "val" ? <hr /> : null;
  }
}

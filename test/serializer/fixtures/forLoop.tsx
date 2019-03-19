import * as React from "react";
import Component from "../../../lib/model/component";
import { ElementType } from "../../../lib/model/template";

export const compDescriptor: Component = {
  fileName: "ExpectedClass",
  template: {
    root: {
      name: "ul",
      type: ElementType.Element,
      children: [
        {
          name: "li",
          type: ElementType.Element,
          props: { "v-for": "item in items" },
          children: [{ type: ElementType.Text, text: "{{item}}" }]
        }
      ]
    }
  },
  script: {
    components: {},
    data() {
      return {
        items: ["Foo", "Bar"]
      };
    },
    props: {}
  }
};

export class ExpectedClass extends React.Component {
  state = { items: ["Foo", "Bar"] };

  render() {
    return (
      <ul>
        {this.state.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    );
  }
}

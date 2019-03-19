import * as React from "react";
import Component from "../../../lib/model/component";
import { ElementType } from "../../../lib/model/template";

export const compDescriptor: Component = {
  fileName: "ExpectedClass",
  template: {
    root: {
      type: ElementType.Element,

      name: "ul",
      children: [
        {
          type: ElementType.Element,

          name: "li",
          props: {
            "v-for": "(image, index) in images",
            ":key": "index"
          },
          children: [
            {
              type: ElementType.Element,

              name: "img",
              props: {
                ":src": "image.src",
                ":alt": "image.name"
              }
            }
          ]
        }
      ]
    }
  },
  script: {
    components: {},
    data() {
      return {
        images: [{ src: "foo.jpg", name: "foo" }, { src: "bar.jpg", name: "bar" }]
      };
    },
    props: {}
  }
};

export class ExpectedClass extends React.Component {
  state = { images: [{ src: "foo.jpg", name: "foo" }, { src: "bar.jpg", name: "bar" }] };

  render() {
    return (
      <ul>
        {this.state.images.map((image, index) => {
          return (
            <li key={index}>
              <img src={image.src} alt={image.name} />
            </li>
          );
        })}
      </ul>
    );
  }
}

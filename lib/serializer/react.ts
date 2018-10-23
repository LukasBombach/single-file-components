import * as React from "react";
import { AbstractElement, Prop } from "../model/template";

export interface SerializeOptions {
  asReact?: boolean;
}

export default class ReactSerializer {
  static serialize(
    json: AbstractElement | string,
    options: SerializeOptions = {}
  ): string | any {
    if (typeof json === "string") return `"${json}"`;
    const { tagName, props, children } = json;
    const reactProps = ReactSerializer.serializeProps(props);
    if (options.asReact)
      return React.createElement(tagName, reactProps, children);
    return `React.createElement("${tagName}", ${JSON.stringify(
      reactProps
    )}, [${children
      .map(c => ReactSerializer.serialize(c, options))
      .join(",")}])`;
  }

  private static serializeProps(props: Prop[]): any {
    return props.reduce(
      (obj, { name, value }) => ({ ...obj, [name]: value }),
      {}
    );
  }
}

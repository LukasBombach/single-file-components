import { AbstractElement } from "../model/template";

export default class ReactSerializer {
  static template(json: AbstractElement | string): string | any {
    if (typeof json === "string") return `"${json}"`;
    const serializeChild = ReactSerializer.template;
    const tagName = json.tagName;
    const props = JSON.stringify(json.props);
    const children = json.children.map(serializeChild).join(",");
    return `React.createElement("${tagName}", ${props}, [${children}])`;
  }
}

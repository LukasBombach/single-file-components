import { Element } from "../../../model/template";
import Attrs from "../attrs";
import Template from "../template";

export default function htmlElement(el: Element, t: Template): string {
  const reactEl = `"${el.name}"`;
  const props = Attrs.getProps(el.attrs);
  const children = !el.children ? "undefined" : `[${el.children.map(c => t.serialize(c)).join(",")}]`;
  return `React.createElement(${reactEl}, ${props}, ${children})`;
}

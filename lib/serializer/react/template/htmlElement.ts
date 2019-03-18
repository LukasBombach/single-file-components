import { Element } from "../../../model/template";
import Props from "../props";
import Template from "../template";

export default function htmlElement(el: Element, t: Template): string {
  const reactEl = `"${el.name}"`;
  const props = Props.getProps(el.props);
  const children = !el.children ? "undefined" : `[${el.children.map(c => t.serialize(c)).join(",")}]`;
  return `React.createElement(${reactEl}, ${props}, ${children})`;
}

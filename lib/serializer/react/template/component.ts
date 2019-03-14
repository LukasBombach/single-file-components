import { Element } from "../../../model/template";
import ReactSerializer from "../";
import Attrs from "../attrs";
import Template from "../template";

export default function component(el: Element, t: Template): string {
  const comp = t.compDesc.script.components[el.name];
  const reactClass = new ReactSerializer().serialize(comp);
  const props = Attrs.getProps(el.attrs);
  const children = !el.children ? "undefined" : `[${el.children.map(c => t.serialize(c)).join(",")}]`;
  return `React.createElement(${reactClass}, ${props}, ${children})`;
}

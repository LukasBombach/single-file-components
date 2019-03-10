import { ElementDescriptor } from "../../../model/template";
import ReactAttrsSerializer from "../attrs";

export default function htmlElement(el: ElementDescriptor): string {
  const reactEl = `"${el.name}"`;
  const props = ReactAttrsSerializer.getProps(this.compDesc, el.attrs);
  const children = !el.children ? "undefined" : `[${el.children.map(c => this.serialize(c)).join(",")}]`;
  return `React.createElement(${reactEl}, ${props}, ${children})`;
}

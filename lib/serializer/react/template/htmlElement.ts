import { ElementDescriptor } from "../../../model/template";
import ReactAttrsSerializer from "../attrs";
import ReactTemplateSerializer from "../template";

export default function htmlElement(el: ElementDescriptor, t: ReactTemplateSerializer): string {
  const reactEl = `"${el.name}"`;
  const props = ReactAttrsSerializer.getProps(el.attrs);
  const children = !el.children ? "undefined" : `[${el.children.map(c => t.serialize(c)).join(",")}]`;
  return `React.createElement(${reactEl}, ${props}, ${children})`;
}

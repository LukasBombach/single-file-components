import { ElementDescriptor } from "../../../model/template";
import ReactSerializer from "../";
import ReactAttrsSerializer from "../attrs";
import ReactTemplateSerializer from "../template";

export default function component(el: ElementDescriptor, t: ReactTemplateSerializer): string {
  const comp = t.compDesc.script.components[el.name];
  const reactClass = new ReactSerializer().serialize(comp);
  const props = ReactAttrsSerializer.getProps(el.attrs);
  const children = !el.children ? "undefined" : `[${el.children.map(c => t.serialize(c)).join(",")}]`;
  return `React.createElement(${reactClass}, ${props}, ${children})`;
}

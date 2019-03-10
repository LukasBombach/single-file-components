import { ElementDescriptor } from "../../../model/template";
import ReactSerializer from "../";
import ReactAttrsSerializer from "../attrs";

export default function component(el: ElementDescriptor): string {
  const comp = this.compDesc.script.components[el.name];
  const reactClass = new ReactSerializer().serialize(comp);
  const props = ReactAttrsSerializer.getProps(this.compDesc, el.attrs);
  const children = !el.children ? "undefined" : `[${el.children.map(c => this.serialize(c)).join(",")}]`;
  return `React.createElement(${reactClass}, ${props}, ${children})`;
}

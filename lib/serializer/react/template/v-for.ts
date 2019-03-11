import { ElementDescriptor } from "../../../model/template";
import ReactAttrsSerializer from "../attrs";

const regexWithIndex = /\(\W*(\w+)\W*,\W*(\w+)\W*\)\W*in\W*(\w+)/; // matches "(item, index) in items"
const regexWithoutIndex = /(\w+)\W*in\W*(\w+)/; // matches "item in items"

export default function vFor(el: ElementDescriptor): string {
  if (regexWithIndex.test(el.attrs["v-for"])) return vForWithKey.call(this, el);
  return vForWithoutKey.call(this, el);
}

function vForWithKey(el: ElementDescriptor): string {
  const [, item, key, items] = el.attrs["v-for"].match(regexWithIndex);
  return `template.${items}.map((${item}, ${key}) => React.createElement("${name}", { ${key} }, ${item}))`;
}

function vForWithoutKey(el: ElementDescriptor): string {
  const [, item, items] = el.attrs["v-for"].match(regexWithoutIndex);
  return `template.${items}.map((${item}) => ${htmlElementWithoutVFor.call(this, el, [item])})`;
}

function htmlElementWithoutVFor(el: ElementDescriptor, locals: string[] = []): string {
  const reactEl = `"${el.name}"`;
  const attrs = Object.assign({}, el.attrs);
  delete attrs["v-for"];
  const props = ReactAttrsSerializer.getProps(this.compDesc, attrs);
  const children = !el.children ? "undefined" : `[${el.children.map(c => this.serialize(c, locals)).join(",")}]`;
  return `React.createElement(${reactEl}, ${props}, ${children})`;
}

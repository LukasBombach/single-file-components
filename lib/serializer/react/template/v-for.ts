import { ElementDescriptor } from "../../../model/template";
import ReactAttrsSerializer from "../attrs";
import ReactTemplateSerializer from "../template";

const regexWithIndex = /\(\W*(\w+)\W*,\W*(\w+)\W*\)\W*in\W*(\w+)/; // matches "(item, index) in items"
const regexWithoutIndex = /(\w+)\W*in\W*(\w+)/; // matches "item in items"

export default function vFor(el: ElementDescriptor, t: ReactTemplateSerializer): string {
  if (regexWithIndex.test(el.attrs["v-for"])) return vForWithKey(el, t);
  return vForWithoutKey(el, t);
}

function vForWithKey(el: ElementDescriptor, t: ReactTemplateSerializer): string {
  const [, item, key, items] = el.attrs["v-for"].match(regexWithIndex);
  return `${items}.map((${item}, ${key}) => ${htmlElementWithoutVFor(el, t)})`;
}

function vForWithoutKey(el: ElementDescriptor, t: ReactTemplateSerializer): string {
  const [, item, items] = el.attrs["v-for"].match(regexWithoutIndex);
  return `${items}.map((${item}) => ${htmlElementWithoutVFor(el, t)})`;
}

function htmlElementWithoutVFor(el: ElementDescriptor, t: ReactTemplateSerializer): string {
  const reactEl = `"${el.name}"`;
  const attrs = Object.assign({}, el.attrs);
  delete attrs["v-for"];
  const props = ReactAttrsSerializer.getProps(attrs);
  const children = !el.children ? "undefined" : `[${el.children.map(c => t.serialize(c)).join(",")}]`;
  return `React.createElement(${reactEl}, ${props}, ${children})`;
}

import { Element } from "../../../model/template";
import Props from "../props";
import Template from "../template";

const regexWithIndex = /\(\W*(\w+)\W*,\W*(\w+)\W*\)\W*in\W*(\w+)/; // matches "(item, index) in items"
const regexWithoutIndex = /(\w+)\W*in\W*(\w+)/; // matches "item in items"

export default function vFor(el: Element, t: Template): string {
  if (regexWithIndex.test(el.props["v-for"])) return vForWithKey(el, t);
  return vForWithoutKey(el, t);
}

function vForWithKey(el: Element, t: Template): string {
  const [, item, key, items] = el.props["v-for"].match(regexWithIndex);
  return `${items}.map((${item}, ${key}) => ${htmlElementWithoutVFor(el, t)})`;
}

function vForWithoutKey(el: Element, t: Template): string {
  const [, item, items] = el.props["v-for"].match(regexWithoutIndex);
  return `${items}.map((${item}) => ${htmlElementWithoutVFor(el, t)})`;
}

function htmlElementWithoutVFor(el: Element, t: Template): string {
  const reactEl = `"${el.name}"`;
  const attrs = Object.assign({}, el.props);
  delete attrs["v-for"];
  const props = Props.getProps(attrs);
  const children = !el.children ? "undefined" : `[${el.children.map(c => t.serialize(c)).join(",")}]`;
  return `React.createElement(${reactEl}, ${props}, ${children})`;
}

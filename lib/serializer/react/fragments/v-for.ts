import { Element } from "../../../model/template";

const regexWithIndex = /\(\W*(\w+)\W*,\W*(\w+)\W*\)\W*in\W*(\w+)/; // matches "(item, index) in items"
const regexWithoutIndex = /(\w+)\W*in\W*(\w+)/; // matches "item in items"

export default function vFor(el: Element, { serialize }): string {
  if (regexWithIndex.test(el.props["v-for"])) return vForWithKey(el, serialize);
  return vForWithoutKey(el, serialize);
}

function vForWithKey(el: Element, serialize: Function): string {
  const [, item, key, items] = el.props["v-for"].match(regexWithIndex);
  return `${items}.map((${item}, ${key}) => ${serialize(elWithoutVFor(el))})`;
}

function vForWithoutKey(el: Element, serialize: Function): string {
  const [, item, items] = el.props["v-for"].match(regexWithoutIndex);
  return `${items}.map((${item}) => ${serialize(elWithoutVFor(el))})`;
}

function elWithoutVFor(el: Element): Element {
  const props = Object.assign({}, el.props);
  delete props["v-for"];
  return Object.assign({}, el, { props });
}

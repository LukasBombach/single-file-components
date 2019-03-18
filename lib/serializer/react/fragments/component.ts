import { Element } from "../../../model/template";
// import ReactSerializer from "../";
// import Props from "../props";
// import Template from ".";

export default function component(el: Element, { comp, serialize }): string {
  return serialize(comp);
  // const comp = comp.script.components[el.name];
  // const reactClass = serialize(comp);
  // const props = Props.getProps(el.props);
  // const children = !el.children ? "undefined" : `[${el.children.map(c => t.serialize(c)).join(",")}]`;
  // return `React.createElement(${reactClass}, ${props}, ${children})`;
}

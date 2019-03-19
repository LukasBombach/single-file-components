import VDom from "../vdom";
import { Element } from "../../../model/template";

export default function component(el: Element, { comp }): string {
  return new VDom(comp.script.components[el.name]).toString();
}

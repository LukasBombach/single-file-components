import { Element } from "../../../model/template";

export default function component(el: Element, { comp, serialize }): string {
  return serialize(comp.script.components[el.name]);
}

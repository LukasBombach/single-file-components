import { Element, Props } from "../../../model/template";

export default function htmlElement(el: Element, { serialize }): string {
  const props = !el.props ? "{}" : serializeProps(el.props);
  const children = !el.children ? "undefined" : `[${el.children.map(c => serialize(c)).join(",")}]`;
  return `React.createElement("${el.name}", ${props}, ${children})`;
}

function serializeProps(props: Props): string {
  return Object.entries(props)
    .map(([key, val]) => serializePair(key, val))
    .join(", ");
}

function serializePair(key: string, val: string): string {
  return key.charAt(0) === ":" ? `"${key.substring(1)}": ${val}` : `"${key}": "${val}"`;
}

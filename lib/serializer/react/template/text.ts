import { ElementDescriptor } from "../../../model/template";

export default function text(el: ElementDescriptor): string {
  const variables = /\{\{\s*(\S+?)\s*\}\}/g;
  return `\`${el.text.replace(variables, "${$1}")}\``;
}

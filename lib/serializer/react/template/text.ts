import { ElementDescriptor } from "../../../model/template";

export default function text(el: ElementDescriptor, namespace: string): string {
  const variables = /\{\{\s*(\S+?)\s*\}\}/g;
  return `\`${el.text.replace(variables, `\${${namespace}.\$1}`)}\``;
}

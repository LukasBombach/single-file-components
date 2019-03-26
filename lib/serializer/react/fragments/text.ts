import { Element } from "../../../model/template";

export default function text(el: Element): string {
  const variables = /\{\{\s*(\S+?)\s*\}\}/g;
  return `\`${el.text.replace(variables, "${scope.$1}").trim()}\``;
}

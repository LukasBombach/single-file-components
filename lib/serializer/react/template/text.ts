import { ElementDescriptor } from "../../../model/template";

export default function text(el: ElementDescriptor, locals: string[] = []): string {
  const variables = /\{\{\s*(\S+?)\s*\}\}/g;
  return `\`${el.text.replace(variables, (match, name) => {
    //return locals.includes(name) ? `\${${name}}` : `\${template.${name}}`;
    return `\${${name}}`;
  })}\``;
}

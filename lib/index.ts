import TemplateParser from './templateParser'

export default function vueReactLoader(source: string): string {
  const template = TemplateParser.getJson(source);
  //const reactComponent = ReactSerializer.getComponent(template);
  //return reactComponent.toString();
  return source;
}
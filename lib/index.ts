import Parser from './template/parser'

export default function vueReactLoader(source: string): string {
  const template = Parser.getJson(source);
  //const reactComponent = ReactSerializer.getComponent(template);
  //return reactComponent.toString();
  return source;
}
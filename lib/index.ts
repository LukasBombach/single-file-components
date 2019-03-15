import Component from "./parser/component";

export default function sfcLoader(source: string): string {
  // const component = new Component(source);
  //return new ReactSerializer(component).toString()
  return source;
}

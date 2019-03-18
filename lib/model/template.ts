export enum ElementType {
  Element = "element",
  Text = "text"
}

export default interface Template {
  root: Element;
  lang?: string;
}

export interface Element {
  type: ElementType;
  name: string;
  props?: Props;
  children?: Element[];
  text?: string;
}

export interface Props {
  [key: string]: string;
}

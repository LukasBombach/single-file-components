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
  attrs?: Attrs;
  children?: Element[];
  text?: string;
}

export interface Attrs {
  [key: string]: string;
}

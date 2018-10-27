export interface TemplateElement {
  tagName: string;
  props: Props;
  children: (TemplateElement | string)[];
  parent: TemplateElement;
}

export interface Props {
  [p: string]: string;
}

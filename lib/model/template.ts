export interface TemplateDescriptor {
  tagName: string;
  props: Props;
  children: (TemplateDescriptor | string)[];
  parent: TemplateDescriptor;
}

export interface Props {
  [p: string]: string;
}

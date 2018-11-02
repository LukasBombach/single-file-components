export interface TemplateDescriptor {
  root: ElementDescriptor | string;
  lang?: string;
}

export interface ElementDescriptor {
  tagName: string;
  attrs: AttrsDescriptor;
  children: (ElementDescriptor | string)[];
  parent?: ElementDescriptor;
}

export interface AttrsDescriptor {
  [p: string]: string;
}

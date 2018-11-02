export interface TemplateDescriptor {
  root: ElementDescriptor;
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

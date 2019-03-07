export interface TemplateDescriptor {
  root: ElementDescriptor;
  lang?: string;
}

export interface ElementDescriptor {
  attrs?: AttrsDescriptor;
  cdata?: string;
  doctype?: string;
  comment?: string;
  text?: string;
  type?: string;
  name?: string;
  children?: Array<ElementDescriptor>;
}

export interface AttrsDescriptor {
  [key: string]: string;
}

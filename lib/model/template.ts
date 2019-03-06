export interface TemplateDescriptor {
  root: ElementDescriptor | string;
  lang?: string;
}

export interface ElementDescriptor {
  attributes?: AttrsDescriptor;
  cdata?: string;
  doctype?: string;
  comment?: string;
  text?: string | number | boolean;
  type?: string;
  name?: string;
  children?: Array<ElementDescriptor>;
}

export interface AttrsDescriptor {
  [key: string]: string | number | undefined;
}

/* export interface ElementDescriptor {
  tagName: string;
  attrs: AttrsDescriptor;
  children: (ElementDescriptor | string)[];
  parent?: ElementDescriptor;
} */

/* export interface AttrsDescriptor {
  [p: string]: string;
} */

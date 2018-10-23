export interface AbstractElement {
  tagName: string;
  props: Props;
  children: (AbstractElement | string)[];
  parent: AbstractElement;
}

export interface Props {
  [p: string]: string;
}

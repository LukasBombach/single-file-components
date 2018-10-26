export interface AbstractScript {
  data?: Data;
  props?: Props;
}

export interface Data {
  [key: string]: any;
}

export interface Props {
  [key: string]: any;
}

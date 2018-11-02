import { ComponentDescriptor } from "./component";

export interface ScriptDescriptor {
  components: ComponentsDescriptor;
  data: DataDescriptor;
  props: PropsDescriptor;
}

export interface ComponentsDescriptor {
  [key: string]: ComponentDescriptor;
}

export interface DataDescriptor {
  [key: string]: any;
}

export interface PropsDescriptor {
  [key: string]: any;
}

/* export interface PropDescriptor {
  type: string; // TODO: wrong
  required?: boolean;
  default?: any;
} */

export type PropType<T> = { (): T } | { new (...args: any[]): T & object };

export interface PropDescriptor<T = any> {
  type?: PropType<T> | PropType<T>[];
  required?: boolean;
  default?: T | null | undefined | (() => T | null | undefined);
  validator?(value: T): boolean;
}

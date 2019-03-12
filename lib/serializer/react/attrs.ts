import { ComponentDescriptor } from "../../model/component";
import { AttrsDescriptor } from "../../model/template";

interface Props {
  [name: string]: any;
}

export default class ReactAttrsSerializer {
  static getProps(comp: ComponentDescriptor, attrs: AttrsDescriptor, locals: string[] = []): string {
    /* const attrsArray = attrs ? ReactAttrsSerializer.getArray(attrs) : [];
    const transformedAttrs = ReactAttrsSerializer.transformAttrs(comp, attrsArray, locals);
    const props = ReactAttrsSerializer.getObject(transformedAttrs);
    return JSON.stringify(props); */
    if (!attrs) return "{}";
    const serializedAttrs = Object.entries(attrs)
      .map(([key, val]) => {
        if (key.charAt(0) === ":") {
          const valVar = locals.includes(key) ? val : `template.${val}`;
          return `"${key.substring(1)}": ${valVar}`;
        } else return `"${key}": "${val}"`;
      })
      .join(",");
    return `{ ${serializedAttrs} }`;
  }

  /* private static getArray(attrs: AttrsDescriptor): [string, string][] {
    return Object.entries(attrs);
  }

  private static transformAttrs(comp: ComponentDescriptor, attrs: [string, string][], locals: string[]): [string, any][] {
    return attrs.map(attr => ReactAttrsSerializer.transformAttr(comp, attr, locals));
  } */

  /* private static transformAttr(comp: ComponentDescriptor, [key, val]: [string, string], locals: string[]): [string, any] {
    if (key.charAt(0) === ":" && locals.includes(val)) return ReactAttrsSerializer.transformLocal(comp, key, val);
    if (key.charAt(0) === ":") return ReactAttrsSerializer.transformBind(comp, key, val);
    return [key, val];
  } */

  /* private static transformLocal(comp, key, val): [string, any] {
    const name = key.substring(1);
    return [name, val];
  }

  private static transformBind(comp, key, val): [string, any] {
    const name = key.substring(1);
    if (comp.script && comp.script.props[name]) return [name, comp.script.props[name]];
    if (comp.script && comp.script.data[name]) return [name, comp.script.data[name]];
    return [name, undefined];
  }

  private static getObject(attrs: [string, any][]): Props {
    return attrs.reduce((accum, [k, v]) => {
      accum[k] = v;
      return accum;
    }, {});
  } */
}

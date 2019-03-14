import { Attrs } from "../../model/template";

export default class Attrs {
  static getProps(attrs: Attrs): string {
    return !attrs ? "{}" : `{ ${Attrs.serializedAttrs(attrs)} }`;
  }

  private static serializedAttrs(attrs: Attrs): string {
    return Object.entries(attrs)
      .map(([key, val]) => Attrs.serializePair(key, val))
      .join(", ");
  }

  private static serializePair(key: string, val: string): string {
    return key.charAt(0) === ":" ? `"${key.substring(1)}": ${val}` : `"${key}": "${val}"`;
  }
}

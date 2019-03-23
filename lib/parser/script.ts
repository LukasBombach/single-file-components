import * as requireFromString from "require-from-string";
import ScriptModel from "../model/script";
import Component from "./component";

export default class Script {
  public parse(source: string): ScriptModel {
    const script = Component.script(source);
    return Script.parseContents(script);
  }

  private static parseContents(contents: string): ScriptModel {
    const exports = Script.requireFromString(contents);
    if (!exports) return {};
    const { components, data, props } = exports;
    return { components, data, props };
  }

  private static requireFromString(code: string, fileName = "requireFromString.vue"): any {
    return requireFromString(`module.exports = ${code}`, fileName);
  }
}

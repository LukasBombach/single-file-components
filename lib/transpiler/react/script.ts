import Transpiler from "./transpiler";
import Component from "../../parser/component";

export default class ScriptTranspiler extends Transpiler {
  async toString() {
    const content = Component.script(this.source);
    // console.log(content);
    this.loader.resourcePath += ".js";
    return content;
  }
}

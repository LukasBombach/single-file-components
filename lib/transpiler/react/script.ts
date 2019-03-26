import Transpiler from "./transpiler";
import Component from "../../parser/component";

export default class ScriptTranspiler extends Transpiler {
  async toString() {
    const content = Component.script(this.source);
    this.loader.resourcePath += ".js";
    //console.log("script", content);
    return content;
  }
}

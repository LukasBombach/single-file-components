import Transpiler from "./transpiler";
import Component from "../../parser/component";

export default class ScriptTranspiler extends Transpiler {
  async toString() {
    const content = Component.script(this.source);
    this.loader.resourcePath += ".js";
    return content;

    // this.loader.callback(null, content);
    //console.log(this.loader.fs);

    //const request = `${this.loader.resourcePath}.temp.js`;
    //this.loader.fs.writeFileSync(request, content);
    //this.loader.loadModule(request, (err, source, sourceMap) => this.loader.callback(err, source, sourceMap));
  }
}

import { loader } from "webpack";
import requireFromString from "require-from-string";
import Component from "../../model/component";
import Parser from "../../parser";
import Transpiler from "./transpiler";
import VDom from "../../serializer/react/vdom";

interface TemplateVars {
  name: string;
  props: string;
  stateHooks: string;
  vdom: string;
}

export default class ComponentTranspiler extends Transpiler {
  async toString(): Promise<string> {
    // const comp = new Parser(this.source).getComponent();
    //const vdom = new VDom(comp).toString();

    /* const component = `
    import script from "${this.loader.resourcePath}.js?sfc&type=script"
    export default function (props) {
      const templateData = Object.assign({}, script.data(), props)
      with(templateData) {
        return ${vdom};
      }
    }
    `; */

    const script = await this.loadScript(); // 700ms
    const exports = requireFromString(script); // 1ms
    console.log("data:", exports.default.data());
    return script;

    /* const component = `
    import script from "${this.loader.resourcePath}?type=script"
    export default function (props) {
      console.log("script");
      console.log(script);
    }
    `; 
    return component;
    */
  }

  // TODO Make loadScript, loadTemplate, loadStyle part of the loader context?
  private loadScript(): Promise<string> {
    return new Promise((resolve, reject) => {
      const request = `!babel-loader!sfcLoader?type=script!${this.loader.resourcePath}`;
      this.loader.loadModule(request, (err, source) => (err ? reject(err) : resolve(source))); // TODO sourceMap, module
    });
  }
}

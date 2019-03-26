import path from "path";
import requireFromString from "require-from-string";
import camelCase from "camelcase";
import ScriptModel from "../../model/script";
import Transpiler from "./transpiler";

export default class ComponentTranspiler extends Transpiler {
  async toString(): Promise<string> {
    // const script = await this.getScript();
    //const vdom = await this.getVDom();
    const name = this.getName();
    const scriptRequest = `!babel-loader!sfcLoader?type=script!${this.loader.resourcePath}`;
    const templateRequest = `!sfcLoader?type=template!${this.loader.resourcePath}`;

    const content = `
    import script from "${scriptRequest}";
    import vdom from "${templateRequest}";

    export default class ${name} extends React.Component {

      render() {
        return vdom;
      }
    }
    `;

    // console.log("component", content);

    return content;
  }

  private getName(script: ScriptModel = undefined): string {
    const basename = script && script.name ? script.name : path.basename(this.loader.resourcePath, ".vue");
    return camelCase(basename, { pascalCase: true }).replace(/^\d+/, "");
  }

  private async getScript(): Promise<ScriptModel> {
    const transpiledScript = await this.loadWith("babel-loader", "sfcLoader?type=script"); // 700ms
    const prependPaths = [this.loader.context + "/"];
    console.log(this.loader.context);
    return requireFromString(transpiledScript, { prependPaths }).default; // 1ms
  }

  private async getVDom(): Promise<string> {
    return await this.loadWith("sfcLoader?type=template");
  }

  private async loadWith(...loaders: string[]): Promise<string> {
    return new Promise((resolve, reject) => {
      const request = `!${loaders.join("!")}!${this.loader.resourcePath}`;
      this.loader.loadModule(request, (err, source) => (err ? reject(err) : resolve(source)));
    });
  }
}

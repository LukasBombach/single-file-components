import path from "path";
import requireFromString from "require-from-string";
import camelCase from "camelcase";
import ScriptModel from "../../model/script";
import Transpiler from "./transpiler";

export default class ComponentTranspiler extends Transpiler {
  async toString(): Promise<string> {
    const script = await this.getScript();
    const vdom = await this.getVDom();
    const name = this.getName(script);

    return `class ${name} extends React.Component {

      render() {
        return ${vdom}
      }
    }`;
  }

  private getName(script: ScriptModel): string {
    const basename = script && script.name ? script.name : path.basename(this.loader.resourcePath, ".vue");
    return camelCase(basename, { pascalCase: true }).replace(/^\d+/, "");
  }

  private async getScript(): Promise<ScriptModel> {
    const transpileScript = await this.loadWith("babel-loader", "sfcLoader?type=script"); // 700ms
    return requireFromString(transpileScript).default; // 1ms
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

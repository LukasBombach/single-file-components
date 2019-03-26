import path from "path";
import requireFromString from "require-from-string";
import camelCase from "camelcase";
import ScriptModel from "../../model/script";
import Transpiler from "./transpiler";

// import React, { Component } from "react";
// export default

export default class ComponentTranspiler extends Transpiler {
  async toString(): Promise<string> {
    const script = await this.getScript();
    const vdom = await this.getVDom();
    const name = this.getName(script.name);

    return `class ${name} extends Component {

      render() {
        return ${vdom}
      }
    }`;
  }

  private getName(name: string = undefined): string {
    const basename = name ? name : path.basename(this.loader.resourcePath, ".vue");
    return camelCase(basename, { pascalCase: true });
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

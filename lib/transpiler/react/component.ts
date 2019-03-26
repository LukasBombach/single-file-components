import path from "path";
import { loader } from "webpack";
import requireFromString from "require-from-string";
import camelCase from "camelcase";
import Component from "../../model/component";
import ScriptModel from "../../model/script";
import Parser from "../../parser";
import Transpiler from "./transpiler";
import VDom from "../../serializer/react/vdom";
import Script from "../../parser/script";

interface TemplateVars {
  name: string;
  props: string;
  stateHooks: string;
  vdom: string;
}

export default class ComponentTranspiler extends Transpiler {
  async toString(): Promise<string> {
    const script = await this.getScript();
    const vdom = await this.getVDom();
    const name = this.getName(script.name);

    /* 
    import React, { Component } from "react";
    
      export default 
    */

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
    const transpileScript = await this.loadScript(); // 700ms
    return requireFromString(transpileScript).default; // 1ms
  }

  // TODO Make loadScript, loadTemplate, loadStyle part of the loader context?
  private loadScript(): Promise<string> {
    return new Promise((resolve, reject) => {
      const request = `!babel-loader!sfcLoader?type=script!${this.loader.resourcePath}`;
      this.loader.loadModule(request, (err, source) => (err ? reject(err) : resolve(source))); // TODO sourceMap, module
    });
  }

  private async getVDom(): Promise<string> {
    return new Promise((resolve, reject) => {
      const request = `!sfcLoader?type=template!${this.loader.resourcePath}`;
      this.loader.loadModule(request, (err, source) => (err ? reject(err) : resolve(source))); // TODO sourceMap, module
    });
  }
}

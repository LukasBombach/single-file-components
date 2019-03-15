import { Component } from "../../model/component";

export default class Script {
  private comp: Component;

  constructor(comp: Component) {
    this.comp = comp;
  }

  public getData(): string {
    return JSON.stringify(this.comp.script ? this.comp.script.data : {});
  }
}

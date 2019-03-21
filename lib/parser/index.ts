import Component from "../model/component";

export default class Parser {
  private source: string;

  constructor(source: string) {
    this.source = source;
  }

  public getComponent(): Component {}
}

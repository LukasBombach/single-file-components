export default class StyleTranspiler {
  private source: string;

  constructor(source: string) {
    this.source = source;
  }

  public toString(): string {
    return this.source;
  }
}

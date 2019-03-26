import { loader } from "webpack";

export default class Transpiler {
  protected loader: loader.LoaderContext;
  protected source: string;

  constructor(loader: loader.LoaderContext, source: string) {
    this.loader = loader;
    this.source = source;
  }

  public async toString(): Promise<string | Buffer | void | undefined> {
    return this.source;
  }
}

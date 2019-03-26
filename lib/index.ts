import { parseQuery } from "loader-utils";
import Template from "./transpiler/react/template";
import Script from "./transpiler/react/script";
import Component from "./transpiler/react/component";

export default async function(source: string): Promise<string> {
  const type = this.query ? parseQuery(this.query).type : undefined;
  const callback = this.async();

  if (type === "template") callback(null, await new Template(this, source).toString());
  if (type === "script") callback(null, await new Script(this, source).toString());
  if (type === undefined) callback(null, await new Component(this, source).toString());

  return undefined;
}

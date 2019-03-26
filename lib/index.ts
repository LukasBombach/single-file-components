import { parseQuery } from "loader-utils";
import Template from "./transpiler/react/template";
import Script from "./transpiler/react/script";
import Component from "./transpiler/react/component";

export default function(source: string): undefined {
  const type = this.query ? parseQuery(this.query).type : undefined;
  const callback = this.async();

  if (type === "template") new Template(this, source).toString().then(v => callback(null, v));
  if (type === "script") new Script(this, source).toString().then(v => callback(null, v));
  if (type === undefined) new Component(this, source).toString().then(v => callback(null, v));

  return undefined;
}

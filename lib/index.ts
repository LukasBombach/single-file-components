import loaderUtils from "loader-utils";
import Template from "./parser/template";
import Script from "./parser/script";
import Style from "./parser/style";
import Component from "./parser/component";

export default function sfcLoader(source: string): string {
  const { type } = loaderUtils.parseQuery(this.resourceQuery);
  if (type === "template") return new Template(source).toString();
  if (type === "script") return new Script(source).toString();
  if (type === "style") return new Style(source).toString();
  return new Component(source).toString();
}

import { loader } from "webpack";
import { parseQuery } from "loader-utils";
import Template from "./transpiler/react/template";
import Script from "./transpiler/react/script";
import Style from "./transpiler/react/style";
import Component from "./transpiler/react/component";

const sfcLoader /* : loader.Loader */ = function(source: string) {
  const type = this.query ? parseQuery(this.query).type : undefined;
  // if (type === "template") return new Template(this, source).toString();
  // if (type === "style") return new Style(this, source).toString();

  //console.log("type", type, "\n", source);

  const callback = this.async();

  if (type === "script") {
    new Script(this, source)
      .toString()
      .then(str => {
        callback(null, str);
      })
      .catch(err => {
        console.log(err);
        callback(err);
      });
  } else if (type === "template") {
    new Template(this, source)
      .toString()
      .then(str => {
        callback(null, str);
      })
      .catch(err => {
        console.log(err);
        callback(err);
      });
  } else {
    // console.log(source);
    new Component(this, source)
      .toString()
      .then(str => {
        console.log(str);
        callback(null, str);
      })
      .catch(err => {
        console.log(err);
        callback(err);
      });
  }

  return undefined;
};

export default sfcLoader;

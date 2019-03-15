import Template from "./template";
import Script from "./script";

export default interface Component {
  fileName: string;
  template?: Template;
  script?: Script;
  style?: string[];
}

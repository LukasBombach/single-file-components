import Template from "./template";
import Script from "./script";
import Style from "./style";

export default interface Component {
  fileName: string;
  template?: Template;
  script?: Script;
  style?: Style;
}

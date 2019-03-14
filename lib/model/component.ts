import { Template } from "./template";
import { Script } from "./script";

export interface Component {
  fileName: string;
  template?: Template;
  script?: Script;
  style?: string[];
}

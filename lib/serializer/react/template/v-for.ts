import { ElementDescriptor } from "../../../model/template";

export default function vFor({ name, attrs }: ElementDescriptor): string {
  const [item, items] = attrs["v-for"].split(/\W+in\W+/);
  const itemReactElement = `React.createElement("${name}", { key }, ${item})`;
  return `template.${items}.map((${item}, key) => ${itemReactElement})`;
}

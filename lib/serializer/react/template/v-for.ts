import { ElementDescriptor } from "../../../model/template";

export default function vFor({ name, attrs }: ElementDescriptor): string {
  const [item, items] = attrs["v-for"].split(/\W+in\W+/);
  return `{template.${items}.map((${item}, i) => <${name} key={i}>text-frament-with-${item}-var</${name}>)}`;
}

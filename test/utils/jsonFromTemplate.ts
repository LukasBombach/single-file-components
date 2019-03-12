import TemplateParser from "../../lib/parser/template";

const template = `
  <template>
    <ul>
      <li v-for="(image, index) in images" :key="index">
        <img :src="image.src" :alt="image.name" />
      </li>
    </ul>
  </template>
`;

const json = new TemplateParser().parse(template);

console.log(JSON.stringify(json, null, 2));

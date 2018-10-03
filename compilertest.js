const fs = require('fs');
const path = require('path');
const inpect = require('util').inspect;
const { parse, SFCDescriptor, SFCBlock } = require('@vue/component-compiler-utils');
const { createDefaultCompiler } = require('@vue/component-compiler');
const compiler = require('vue-template-compiler');


const defaultCompiler = createDefaultCompiler({ compiler })



const sourceRoot = path.resolve(__dirname, 'test/components/basics');
const filename = path.resolve(sourceRoot, 'PlainHtml.vue');
const source = fs.readFileSync(filename, 'utf-8');

const descriptor = parse({
  filename,
  source,
  compiler,
  sourceRoot,
  needMap: true
});

console.log(inpect(descriptor));

const template = defaultCompiler.compileTemplate(filename, descriptor.template);

console.log(inpect(template));

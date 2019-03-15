import Template from "../../lib/parser/template";

const template = `<template><hr v-if="config && config.var === 'val'" /></template>`;

const json = new Template().parse(template);

console.log(JSON.stringify(json, null, 2));

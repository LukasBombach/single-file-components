import React from 'react';

/**
 * templateRegex matches <template> tags
 * 
 * <template>contents<template>
 * 
 * 
 * 
 * @param {string} source 
 * @returns {string|null}
 */
function getTemplate(source) {
  const templateRegex = /<template>([\s\S]*?)<\/template>/i;
  const template = source.match(templateRegex);
  return template === null ? null : template[1];
}

/**
 * outerTagRegex matches an opening and a closing tagname and its contents
 * 
 * <tagname>contents<tagname>
 * 
 * it can be surrounded by whitespace
 * the tagname will be in group 1 in the results the contents will be in group 2
 * it will return a react component with the tagname
 * the react component will have children which will be the contents recursively resolved with this function
 * 
 * @param {string} source
 * @returns {ReactElement}
 */
function getReactFromHtml(source) {
  try {
    const outerTagRegex = /^\W*<(\w+)>([\w\W]*?)<\/\1>\W*$/
    const [, tagName, innerHtml] = source.match(outerTagRegex);
    return getReact(tagName, {}, getReactFromHtml(innerHtml));
  } catch (err) {
    return source;
  }
}

function getReact(tagName, props, children) {
  const mode = 'development';
  return mode !== 'development' ? React.createElement(tagName, props, children) : `React.createElement(${tagName}, ${props}, ${children})`;
}

/**
 * 
 * @param {string} source 
 * @returns {string}
 */
export default function vueReactLoader(source) {
  const template = getTemplate(source);
  const reactComponent = getReactFromHtml(template);
  console.log(reactComponent)
  return source;
}

import React from 'react';

export default class Template {

  static fromSource(source) {
    const templateRegex = /<template>([\s\S]*?)<\/template>/i;
    const template = source.match(templateRegex);
    return template ? new Template(template[1]) : new Template();
  }

  constructor(html) {
    this.html = html;
  }

  getJson() {
    return this.parse(this.html);
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
   * @param {string} html
   * @returns {ReactElement}
   */
  parse(html) {
    try {
      const outerTagRegex = /^\W*<(\w+)>([\w\W]*?)<\/\1>\W*$/
      const [, tagName, innerHtml] = html.match(outerTagRegex);
      const children = this.parse(innerHtml);
      return { type: 'tag', tagName, children };
    } catch (err) {
      return { type: 'text', value: html };
    }
  }



}
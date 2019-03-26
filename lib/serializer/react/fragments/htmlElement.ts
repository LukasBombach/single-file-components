import { Element, Props } from "../../../model/template";

// prettier-ignore
const htmlTags = ["a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b", "base", "basefont", "bdi", "bdo", "bgsound", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dir", "div", "dl", "dt", "element", "em", "embed", "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "link", "listing", "main", "map", "mark", "marquee", "menu", "menuitem", "meta", "meter", "nav", "nobr", "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "plaintext", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "tt", "u", "ul", "var", "video", "wbr", "xmp"];

export default function htmlElement(el: Element, { serialize }): string {
  const props = !el.props ? "{}" : serializeProps(el.props);
  const children = !el.children ? "undefined" : `[${el.children.map(c => serialize(c)).join(",")}]`;
  const name = htmlTags.indexOf(el.name) === -1 ? `scope.${el.name}` : `"${el.name}"`;
  //const name = `"${el.name}"`;
  return `React.createElement(${name}, ${props}, ${children})`;
}

function serializeProps(props: Props): string {
  const propsAsStr = Object.entries(props)
    .map(([key, val]) => serializePair(key, val))
    .join(", ");
  return `{ ${propsAsStr} }`;
}

function serializePair(key: string, val: string): string {
  return key.charAt(0) === ":" ? `"${key.substring(1)}": ${val}` : `"${key}": "${val}"`;
}

require("raf/polyfill");
require("jsdom-global/register");
const React = require("react");
const Enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");
global.React = React;

Enzyme.configure({ adapter: new Adapter() });

import * as path from "path";
import webpack from "webpack";
import memoryfs from "memory-fs";

const getConfig = (fixture: string) => ({
  context: __dirname,
  entry: `./components/${fixture}`,
  output: {
    path: path.resolve(__dirname),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: { loader: path.resolve(__dirname, "../lib/index.js") }
      }
    ]
  }
});

export default (fixture: string) => {
  const compiler = webpack(getConfig(fixture));
  compiler.outputFileSystem = new memoryfs();
  return new Promise((res, rej) => compiler.run((err, stats) => (err ? rej(err) : res(stats))));
};

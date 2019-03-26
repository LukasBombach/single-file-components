import path from "path";
import webpack from "webpack";
import memoryfs from "memory-fs";

const getConfig = (fixture: string, options = {}) => ({
  context: __dirname,
  entry: fixture,
  output: {
    path: path.resolve(__dirname),
    filename: "bundle.js"
  },
  resolveLoader: {
    alias: {
      sfcLoader: path.resolve(__dirname, "../lib/index.ts")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: { loader: "sfcLoader" }
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
});

export default (fixture: string) => {
  const config = getConfig(fixture);
  const compiler = webpack(config);
  compiler.outputFileSystem = new memoryfs();
  return new Promise((resolve, reject) =>
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) return reject(err || stats.compilation.errors);
      resolve(stats.toJson().modules[0].source);
    })
  );
};

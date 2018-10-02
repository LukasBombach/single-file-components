import path from 'path';
import webpack from 'webpack';
import memoryfs from 'memory-fs';

export default (fixture) => {
  const compiler = webpack({
    context: __dirname,
    entry: `./components/${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [{
        test: /\.vue$/,
        use: { loader: path.resolve(__dirname, '../lib/index.js') }
      }]
    }
  });

  compiler.outputFileSystem = new memoryfs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      resolve(stats);
    });
  });
};

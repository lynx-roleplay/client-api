const nodeExternals = require('webpack-node-externals');
const path = require('path');

const commonConfig = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          typeCheck: true,
          emitErrors: true
        }
      },
      {
        test: /\.ts$/,
        use: ['babel-loader', 'ts-loader']
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'standard-loader',
        options: {
          typeCheck: true,
          emitErrors: true
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.json']
  },
  node: {
    __dirname: false
  },
  externals: [nodeExternals()],
};

module.exports = Object.assign({ entry: { main: './src/main.ts' }  }, commonConfig);

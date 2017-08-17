/* global __dirname, require, module*/

const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env = require('yargs').argv.env;

let libName = 'varyd-utils';
let plugins = [],
    outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({
    minimize: true
  }));
  outputFile = libName + '.min.js';
} else {
  outputFile = libName + '.js';
}

module.exports = {

  entry: __dirname + '/src/index.js',

  devtool: 'source-map',

  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    modules: [
      path.resolve('./node_modules'),
      path.resolve('./src')
    ],
    extensions: ['.json', '.js']
  },

  plugins: plugins

};
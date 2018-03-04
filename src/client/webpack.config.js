 /* global __dirname, require, module*/

const webpack = require('webpack');
const path = require('path');

let libraryName = 'AiCitySimulation';

let plugins = [], outputFile;

outputFile = 'ai-city-simulation.js';

const config = {
  entry: __dirname + '/js/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      }
    ]
  },
  resolve: {
    modules: [
        path.resolve('./node_modules'), path.resolve('./js')
    ],
    extensions: ['.json', '.js']
  },
  plugins: plugins
};

module.exports = config;

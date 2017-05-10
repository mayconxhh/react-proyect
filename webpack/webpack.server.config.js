/* eslint linebreak-style: ["error", "windows"]*/
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const nodeModules = fs
  .readdirSync(path.resolve(__dirname, '../node_modules'))
  .filter(x => ['.bin'].indexOf(x) === -1)
  .reduce(
    (modules, module) => Object.assign(modules, { [module]: `commonjs ${module}` }),
    {}
  );

const config = {
  entry: './source/server.jsx',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../build/server'),
    publicPath: process.env.NODE_ENV === 'production'
      ? 'https://proyect-react-sfs.now.sh'
      : 'https://localhost:5001',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules'),
        ],
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules'),
        ],
        options: {
          // presets: ['latest-minimal', 'react'],
          presets: process.env.NODE_ENV === 'production' ? ['es2015', 'react'] : ['latest-minimal', 'react'],
          plugins: process.env.NODE_ENV === 'production' ? ['transform-regenerator', 'transform-runtime'] : '',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  target: 'node',
  externals: nodeModules,
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new UglifyJSPlugin({
      compress: {
        warnings: false,
      },
      mangle: {
        except: ['$super', '$', 'exports', 'require'],
      },
    })
  );
}

module.exports = config;

/* eslint linebreak-style: ["error", "windows"]*/
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
  entry: './source/client.jsx',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../build/statics'),
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
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules'),
        ],
        options: {
          presets: process.env.NODE_ENV === 'production' ? ['es2015', 'es2016', 'es2017', 'react'] : ['es2016', 'es2017', 'react'],
          plugins: process.env.NODE_ENV === 'production' ? ['transform-es2015-modules-commonjs', 'transform-regenerator', 'transform-runtime'] : ['transform-es2015-modules-commonjs'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
  ],
  target: 'web',
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

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const files = fs.readdirSync('./_js/').filter(a => a.indexOf('.js') > -1).map(a => a.replace('.js', ''));
const entry = {};

files.forEach(a => {
  entry[a] = a;
});

module.exports = {
  context: __dirname + '/assets',
  entry: entry,
  module: {
    loaders: [
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?(\?\-[0-9|a-z]{6})?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=assets/js/[hash].[ext]',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?(\?\-[0-9|a-z]{6})?$/,
        loader: 'file-loader?name=assets/js/[hash].[ext]',
      },
      {
        test: /\.(sass|scss)?$/,
        loader: 'style!css?minimize!sass',
      },
      {
        test: /\.(css)?$/,
        loader: 'style!css?minimize',
      },
    ],
  },
  resolve: {
    modulesDirectories: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '_js'),
    ],
    root: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '_js'),
    ],
  },
  output: {
    path: path.join(__dirname, '_js'),
    filename: 'assets/js/[name].bundle.js',
    chunkFilename: 'assets/js/[id].chunk.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      filename: 'assets/js/commons.js',
      name: 'commons',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
};

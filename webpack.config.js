const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const files = fs.readdirSync('./_js/').filter(a => a.indexOf('.js') > -1);
const entry = {};

files.forEach(a => {
  entry[a] = `${path.join(path.resolve(__dirname, '_js'), a)}`;
});

module.exports = {
  context: __dirname + '/assets',
  entry: entry,
  module: {
    rules: [
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?(\?\-[0-9|a-z]{6})?$/,
        use: [
          { loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=assets/js/[hash].[ext]',}
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?(\?\-[0-9|a-z]{6})?$/,
        use: [
          { loader: 'file-loader?name=assets/js/[hash].[ext]',}
        ]
      },
      {
        test: /\.(sass|scss)?$/,
        use: [
          { loader: 'style-loader'},
          { loader: 'css-loader?minimize'},
          { loader: 'sass-loader'},
        ]
      },
      {
        test: /\.(css)?$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader?minimize' },
        ]
      },
    ],
  },
  resolve: {
    alias: {
      _js: path.resolve(__dirname, '_js'),
    },
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

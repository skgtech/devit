'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
    context: __dirname + '/src/js',
    entry: {
        app: './app.js',
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    { loader: 'sass-loader', options: { modules: true } }
                ]
            },
            // {
            //     test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            //     loader: 'url-loader?limit=100000'
            // },
            {
                test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }
        ],
    },
    output: {
        path: __dirname + '/assets/js',
        filename: '[name].bundle.js',
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    devServer: {
        contentBase: __dirname,
    },
};

/**
 * @file webpack base config
 */

var path = require('path');
var config = require('./config');
var webpack = require('webpack');
var HappyPack = require('happypack');

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        demos: [
            './demos/App.js',
            'webpack-hot-middleware/client?reload=false'
        ]
    },
    output: {
        path: config.devPath,
        filename: '[name].bundle.js',
        chunkFilename: '[name].[chunkhash].bundle.js',
        publicPath: config.devPublicPath
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loaders: ['babel'],
                happy: {id: 'js'}
            },
            {
                test: /\.(jpg|png|ttf|svg|gif|woff2?)(\?.+)?$/,
                loader: 'url?limit=10240'
            },
            {
                test: /\.less?$/,
                loader: 'style!css!less'
            }
        ]
    },
    plugins: [
        new HappyPack({
            id: 'js',
            cache: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.DEV': true,
            'process.env.BROWSER': true,
            'process.env.BLUEBIRD_WARNINGS': '0',
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
};

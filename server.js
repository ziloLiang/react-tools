/**
 * @file dev model server
 */

var webpack = require('webpack');
var express = require('express');
var config = require('./config');
// var WebpackDevServer = require('webpack-dev-server');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var webpackConfig = require('./webpack.config.js');

var app = express();

var compiler = webpack(webpackConfig);


// new WebpackDevServer(webpack(webpackConfig), {
//   publicPath: webpackConfig.output.publicPath,
//   hot: true,
//   inline: true,
//   historyApiFallback: true
// }).listen(4567, 'localhost', function (err, result) {
//   if (err) {
//     console.log(err);
//   }

//   console.log('Listening at localhost:3000');
// });


app.use(webpackDevMiddleware(compiler, {
    hot: true,
    inline: true,
    noInfo: true,
    historyApiFallback: true,
    stats: {
        colors: true
    },
    // cache: true,
    publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.use(express.static(config.basePath));

app.listen(8989, function(err) {
    if (err) {
        console.error(err);
    } else {
        console.info('Server run on http://localhost:%s', 8989);
    }
});

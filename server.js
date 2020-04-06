const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const express = require("express");
const config = require("./build/webpack.dev.config.js");
const compiler = webpack(config); // webpack options
const app = express();

app.use(webpackHotMiddleware(compiler));

app.use(
  webpackDevMiddleware(compiler, {
    // webpack-dev-middleware options
    publicPath: config.output.publicPath,
    historyApiFallback: true
  })
);

app.listen(3000, () => console.log("Example app listening on port 3000!"));

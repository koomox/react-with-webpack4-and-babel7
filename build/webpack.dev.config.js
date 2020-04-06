const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // installed via npm
const HtmlWebpackPlugin = require("html-webpack-plugin"); // installed via npm
const webpack = require("webpack"); // to access built-in plugins
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

module.exports = {
  mode: "development",
  entry: {
    app: [
      "./src/index.jsx",
      "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000"
    ]
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/"
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    hot: true,
    host: "localhost"
  },
  module: {
    rules: [
        {
            test: /\.jsx$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"]
              }
            }
          },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      chunks: "app",
      filename: "index.html",
      template: path.resolve(__dirname, "../src/index.html"),
      inject: true
    })
  ],
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  }
};

const rspack = require("@rspack/core");
const path = require('path');

module.exports = {
  context: __dirname,
  entry: "./script/main.js",
  mode: "production",
  devServer: {
    port: 1113,
    open: true,
    hot: true,
    static: {
      directory: "./",
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./index.html",
      filename: "index.html",
      inject: true,
    }),
    new rspack.CopyRspackPlugin({
      patterns: [
        { from: "style", to: "style" },
        { from: "img", to: "img" },
        { from: "fonts", to: "fonts" },
        { from: "music", to: "music" },
        { from: "wishes.json", to: "wishes.json" }
      ],
    }),
  ],
};

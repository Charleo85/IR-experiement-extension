const path = require("path");

module.exports = {
  entry: ["./popup/src/scripts/index.js"],

  output: {
    filename: "popup.js",
    path: path.join(__dirname, "../", "build"),
    publicPath: "/"
  },

  resolve: {
    extensions: [".js", ".jsx", ".scss", ".json", ".css"],
    modules: ["node_modules"]
  },

  module: {
    rules:[
      {
        test: /\.(jsx|js)?$/,
        exclude: /(node_modules)/,
        include: path.join(__dirname, "src"),
        use: {
          loader: "babel-loader",
          options: {
            babelrc: true
          }
        }
      }
    ]
  }
};

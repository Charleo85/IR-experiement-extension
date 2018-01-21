const path = require("path");

module.exports = {
  entry: ["./event/src/index.js"],

  output: {
    filename: "event.js",
    path: path.join(__dirname, "../", "build")
  },

  resolve: {
    extensions: [".js", ".json"],
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

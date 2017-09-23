import "babel-polyfill";
const path = require("path");

module.exports = {
  entry: ["babel-polyfill", "./popup/src/scripts/index.js"],

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
    loaders: [
      {
        test: /\.(jsx|js)?$/,
        loader: "babel-loader",
        exclude: /(node_modules)/,
        include: path.join(__dirname, "src"),
        query: {
          presets: ["es2015", "react"]
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: [path.join(__dirname, 'src'), path.join(__dirname, '../','semantic', 'dist')],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  }
};

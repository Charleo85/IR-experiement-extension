import "babel-polyfill";

const path = require("path");

module.exports = {
  entry: ["babel-polyfill", "./content/src/scripts/index.js"],

  output: {
    filename: "content.js",
    path: path.join(__dirname, "../", "build"),
    publicPath: "/"
  },

  resolve: {
    extensions: [".js", ".jsx", ".scss", ".json"],
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
        test: /\.png$/,
        loader: "url-loader",
        include: [path.join(__dirname, '../','semantic', 'dist', 'themes', 'default', 'assets', 'images')],
        query: { mimetype: "image/png" }
      },
      {
        test: /\.(jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        include: [path.join(__dirname, '../','semantic', 'dist', 'themes', 'default', 'assets', 'fonts'), path.join(__dirname, '../','semantic', 'dist', 'themes', 'basic', 'assets', 'fonts')],
        options: {
          limit: 10000
        }
      }
    ],
  }
};

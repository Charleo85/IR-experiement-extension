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
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'resolve-url-loader'],
        include: [path.join(__dirname, 'src'),
                  path.join(__dirname, '../','semantic', 'dist'),
                  path.join(__dirname, '../','semantic', 'dist', 'themes', 'default', 'assets', 'fonts')],
      },
      {
        test: /\.(jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: ['url-loader'],
        include: [path.join(__dirname, 'src'),
                  path.join(__dirname, '../','semantic', 'dist'),
                  path.join(__dirname, '../','semantic', 'dist', 'themes', 'default', 'assets', 'fonts')],
      },
      {
        test: /\.png$/,
        include: [path.join(__dirname, '../','semantic', 'dist', 'themes', 'default', 'assets', 'images')],
        use: ['file-loader']
      }
    ]
  }
};

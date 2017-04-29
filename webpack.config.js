const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // eslint-disable-line

module.exports = {
  entry: {
    app: './src',
    background: './src',
    options: './src',
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: '.'
    }, ], {
      ignore: ['manifest.json'],
    }),
    new CopyWebpackPlugin([{
      from: 'node_modules/primer-core/build/',
      to: 'core.css'
    }, {
      from: 'node_modules/primer-forms/build/',
      to: 'form.css'
    }, ]),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
    }, ],
  },
};

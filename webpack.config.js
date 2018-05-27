var webpack = require('webpack')
require('dotenv').config()
var HTMLPlugin = require('html-webpack-plugin')


module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src',
  plugins: [
    new HTMLPlugin({
      inject: true,
      template: './src/index.html'
    }),
    new webpack.DefinePlugin({
      GRAPHQL_URL: JSON.stringify(process.env.GRAPHQL_URL),
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}

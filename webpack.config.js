var path = require('path')
var HTMLPlugin = require('html-webpack-plugin')


module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src',
  plugins: [
    new HTMLPlugin({
      inject: true,
      template: './src/index.html'
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

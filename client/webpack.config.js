var webpack = require('webpack')
var path = require('path')
var HTMLPlugin = require('html-webpack-plugin')

require('dotenv').config()

const clientDir = path.resolve(__dirname),
  publicDir = path.resolve(clientDir, 'public'),
  configDir = path.resolve(clientDir, 'config'),
  screensDir = path.resolve(clientDir, 'screens'),
  sharedDir = path.resolve(clientDir, 'shared')

const mode = process.env.NODE_ENV === 'production' || 'development',
  entry = path.resolve(clientDir, 'index.tsx'),
  index = path.resolve(publicDir, 'index.html')

module.exports = {
  mode,
  entry,
  devtool: 'inline-source-map',
  plugins: [
    new HTMLPlugin({
      inject: true,
      template: index,
    }),
    new webpack.DefinePlugin({
      GRAPHQL_URL: JSON.stringify(process.env.GRAPHQL_URL),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      config: configDir,
      screens: screensDir,
      shared: sharedDir,
    },
  },
}

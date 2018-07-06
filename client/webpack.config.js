var webpack = require('webpack')
var path = require('path')
var HTMLPlugin = require('html-webpack-plugin')

require('dotenv').config()

const srcDir = path.resolve(__dirname),
  publicDir = path.resolve(srcDir, 'public'),
  configDir = path.resolve(srcDir, 'config'),
  screensDir = path.resolve(srcDir, 'screens'),
  sharedDir = path.resolve(srcDir, 'shared')

const mode = process.env.NODE_ENV === 'production' || 'development',
  entry = path.resolve(srcDir, 'index.tsx'),
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

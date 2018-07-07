var webpack = require('webpack')
var {resolve} = require('path')
var HTMLPlugin = require('html-webpack-plugin')

require('dotenv').config({path: "../.env"})

const clientDir = resolve(__dirname),
  srcDir = resolve(clientDir, 'src'),
  buildDir = resolve(clientDir, 'build'),
  publicDir = resolve(srcDir, 'public'),
  configDir = resolve(srcDir, 'config'),
  screensDir = resolve(srcDir, 'screens'),
  sharedDir = resolve(srcDir, 'shared')

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development',
  DEV = mode !== 'production',
  PROD = mode === 'production',
  entry = resolve(srcDir, 'index.tsx'),
  index = resolve(publicDir, 'index.html')

module.exports = {
  mode,
  entry,
  devtool: 'inline-source-map',
  output: {
    path: buildDir,
    filename: 'bundle.js',
    publicPath: '/',
  },
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

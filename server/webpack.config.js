const webpack = require('webpack')
const {resolve} = require('path')

require('dotenv').config({path: "../.env"})

const serverDir = resolve(__dirname),
  srcDir = resolve(serverDir, 'src'),
  buildDir = resolve(serverDir, 'build')

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development',
  DEV = mode !== 'production',
  PROD = mode === 'production',
  entry = resolve(srcDir, 'index.ts'),
  devtool = PROD ? 'cheap-module-source-map' : 'source-map'

module.exports = {
  mode,
  entry,
  devtool,
  target: 'node',
  output: {
    path: buildDir,
    filename: 'index.js',
    publicPath: '/',
  },
  externals: (context, request, callback) => {
    // Externalize all npm modules.
    if (/^[a-z0-9-][a-z0-9-./]+$/.test(request)) {
      return callback(null, `commonjs ${request}`)
    }
    callback()
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      // prettier-ignore
      'process.env.NODE_ENV': JSON.stringify(DEV ? 'development' : 'production')
    }),
  ],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false,
  },
}

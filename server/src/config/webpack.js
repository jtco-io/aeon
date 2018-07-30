const webpack = require('webpack')
const dotenv = require('dotenv')
const {resolve} = require('path')


const
  serverDir = resolve(__dirname, "..", ".."),
  srcDir = resolve(serverDir, 'src'),
  envFile = resolve(serverDir, '..', '.env')


const
  env = process.env,
  mode = env.NODE_ENV === 'production' ? 'production' : 'development',
  PROD = mode === 'production'

module.exports = {
  mode,
  entry: resolve(srcDir, 'index.ts'),
  devtool: PROD ? 'cheap-module-source-map' : 'source-map',
  target: 'node',
  output: {
    path: resolve(serverDir, 'build'),
    filename: '[name].js',
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
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
    alias: {
      config: resolve(srcDir, 'config'),
    }
  },
  plugins: [

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

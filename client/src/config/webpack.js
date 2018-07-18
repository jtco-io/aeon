const webpack = require('webpack')
const {resolve, join} = require('path')

require('dotenv').config({path: "../.env"})

const
  buildDir = resolve(__dirname, "build"),
  clientDir = resolve(__dirname, "..", ".."),
  clientSrc = resolve(clientDir, 'src'),
  clientPublicDir = resolve(clientSrc, 'public'),
  clientIndex = resolve(clientPublicDir, 'index.html')

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development',
  DEV = mode !== 'production',
  PROD = mode === 'production'

let
  alias = {
    config: resolve(clientSrc, 'config'),
    screens: resolve(clientSrc, 'screens'),
    shared: resolve(clientSrc, 'shared'),
    publicDir: resolve(clientSrc, 'public')
  },
  plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(DEV ? 'development' : 'production')
    })
  ],
  moduleRules = {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ],
  },
  optimization = {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true
        }
      }
    },
    runtimeChunk: true
  }

module.exports = [
  {
    name: 'client',
    target: 'web',
    mode,
    entry: {
      vendor: ['react', 'react-dom', 'apollo-boost', 'history', 'react-router'],
      client: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        resolve(clientSrc, 'index.tsx')
      ]
    },
    devtool: DEV ? 'cheap-module-source-map' : 'source-map',
    devServer: {
      hot: true
    },
    output: {
      path: buildDir,
      filename: 'client.js'
    },
    optimization,
    plugins: [
      new webpack.DefinePlugin({
        GRAPHQL_URL: JSON.stringify(process.env.GRAPHQL_URL),
      }),
      ...plugins
    ],
    module: moduleRules,
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
      alias,
    }
  },
  {
    name: 'server',
    target: 'node',
    mode,
    entry: resolve(clientSrc, 'serve.tsx'),
    devtool: PROD ? 'cheap-module-source-map' : 'source-map',
    output: {
      path: buildDir,
      filename: 'server.js',
      libraryTarget: 'commonjs2'
    },
    externals: (context, request, callback) => {
      // Externalize all npm modules.
      if (/^[a-z0-9-][a-z0-9-./]+$/.test(request)) {
        return callback(null, `commonjs ${request}`)
      }
      callback()
    },
    module: moduleRules,
    plugins: [
      ...plugins
    ],
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
      alias
    },
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
];

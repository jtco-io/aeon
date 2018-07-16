const webpack = require('webpack')
const {resolve, join} = require('path')
const HTMLPlugin = require('html-webpack-plugin')

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


const
  alias = {
    config: resolve(clientSrc, 'config'),
    screens: resolve(clientSrc, 'screens'),
    shared: resolve(clientSrc, 'shared'),
    publicDir: resolve(clientSrc, 'public')
  }

module.exports = [
  {
    name: 'client',
    target: 'web',
    mode,
    entry: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      resolve(clientSrc, 'index.tsx')
    ],
    devtool: 'inline-source-map',
    devServer: {
      hot: true
    },
    output: {
      path: buildDir,
      filename: 'client.js'
    },
    plugins: [
      new HTMLPlugin({
        inject: true,
        template: clientIndex,
      }),
      new webpack.DefinePlugin({
        GRAPHQL_URL: JSON.stringify(process.env.GRAPHQL_URL),
      }),
      new webpack.DefinePlugin({
        // prettier-ignore
        'process.env.NODE_ENV': JSON.stringify(DEV ? 'development' : 'production')
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      }),
      new webpack.NamedModulesPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                plugins: ['react-hot-loader/babel'],
              },
            },
            'ts-loader', // (or awesome-typescript-loader)
          ]
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
      alias,
    }
  },
  {
    name: 'server',
    target: 'node',
    mode,
    entry: resolve(clientSrc, 'serve.js'),
    devtool: PROD ? 'cheap-module-source-map' : 'source-map',
    output: {
      path: buildDir,
      filename: 'server.js'
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
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        }
      ],
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
      alias
    },
    plugins: [
      new webpack.DefinePlugin({
        // prettier-ignore
        'process.env.NODE_ENV': JSON.stringify(DEV ? 'development' : 'production')
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      }),
      new webpack.NamedModulesPlugin()

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
];

const webpack = require('webpack')
const dotenv = require('dotenv')
const getClientPlugins = require('./webpack.clientPlugins')
const { resolve } = require('path')

const clientDir = resolve(__dirname, "..", "..")

const dirs = {
  client: clientDir,
  build: resolve(clientDir, "build"),
  src: resolve(clientDir, 'src'),
  assets: resolve(clientDir, 'src', 'assets'),
}
require('dotenv').config({path: resolve(clientDir, '..', '.env')})

const
  {stringify} = JSON,
  env = process.env
let {NODE_ENV, PROJECT_TITLE, FRONTEND_HOST, FRONTEND_PORT, BACKEND_HOST, BACKEND_PORT, PUBLIC_PATH, HTTPS } = env

PUBLIC_PATH = PUBLIC_PATH || '/'

const mode = NODE_ENV === 'production' ? 'production' : 'development',
  PROD = mode === 'production'


const environmentVariables = {
  '__PRODUCTION__': stringify(mode),
  '__PROJECT_TITLE__': stringify(PROJECT_TITLE),
  '__FRONTEND_HOST__': stringify(FRONTEND_HOST),
  '__FRONTEND_PORT__': stringify(FRONTEND_PORT),
  '__BACKEND_HOST__': stringify(BACKEND_HOST),
  '__BACKEND_PORT__': stringify(BACKEND_PORT),
  '__PUBLIC_PATH__': stringify(PUBLIC_PATH),
  '__HTTPS__': stringify(HTTPS),
}


let clientEntry = [
  resolve(dirs.src, 'index.tsx')
]
if (!PROD) {
  clientEntry = [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    ...clientEntry
  ]
}
const moduleRules = {
  rules: [
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    }
  ]
}

const alias = {
  config: resolve(dirs.src, 'config'),
  screens: resolve(dirs.src, 'screens'),
  shared: resolve(dirs.src, 'shared'),
  publicDir: resolve(dirs.src, 'public')
}

module.exports = [
  {
    name: 'client',
    target: 'web',
    mode,
    stats: true,
    entry: {
      vendor: ['react', 'react-dom', 'history', 'react-router'],
      app: clientEntry
    },
    devtool: !PROD ? 'inline-source-map' : 'source-map',
    devServer: {
      hot: true
    },
    output: {
      path: resolve(dirs.build, "client"),
      publicPath: PUBLIC_PATH + 'bundles',
      filename: PROD ? '[name].[chunkhash].bundle.js' : '[name].[hash].bundle.js',
      chunkFilename: PROD ? '[name].[chunkhash].bundle.js' : '[name].[hash].bundle.js',
    },
    optimization: {
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
    },
    plugins: getClientPlugins(PROD, environmentVariables, dirs),
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
    entry: resolve(dirs.src, 'server', 'serve.tsx'),
    devtool: PROD ? 'cheap-module-source-map' : 'source-map',
    output: {
      path: resolve(dirs.build, "server"),
      filename: 'index.js',
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
      new webpack.DefinePlugin({
        ...environmentVariables
      })
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

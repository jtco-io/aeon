const webpack = require('webpack')
const dotenv = require('dotenv')
const { resolve } = require('path')
const { StatsWriterPlugin } = require("webpack-stats-plugin")


const
  clientDir = resolve(__dirname, "..", ".."),
  buildDir = resolve(clientDir, "build"),
  clientSrc = resolve(clientDir, 'src'),
  envFile = resolve(clientDir, '..', '.env')

require('dotenv').config({path: envFile})

const
  env = process.env,
  mode = env.NODE_ENV === 'production' ? 'production' : 'development',
  PROD = mode === 'production'


const environmentVariables = {
  '__PRODUCTION__': JSON.stringify(mode),
  '__PROJECT_TITLE__': JSON.stringify('Prion'),
  '__GRAPHQL_URL__': JSON.stringify(env.GRAPHQL_URL),
  '__FRONTEND_HOST__': JSON.stringify(env.FRONTEND_HOST),
  '__FRONTEND_PORT__': JSON.stringify(env.FRONTEND_PORT),
  '__BACKEND_HOST__': JSON.stringify(env.BACKEND_HOST),
  '__BACKEND_PORT__': JSON.stringify(env.BACKEND_PORT),
}


const clientPlugins = [
  new webpack.DefinePlugin({
    ...environmentVariables,
    __CLIENT_TRUE__: JSON.stringify(true),
  }),
  new StatsWriterPlugin({
    filename: "stats.json" // Default
  })
]

let clientEntry = [
  resolve(clientSrc, 'index.tsx')
]
if (PROD) {
  clientPlugins.push(
    new webpack.HashedModuleIdsPlugin()
  )
} else if (!PROD) {
  clientEntry = [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    ...clientEntry
  ]
  clientPlugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
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
    stats: true,
    entry: {
      vendor: ['react', 'react-dom', 'history', 'react-router'],
      client: clientEntry
    },
    devtool: !PROD ? 'cheap-module-source-map' : 'source-map',
    devServer: {
      hot: true
    },
    output: {
      path: resolve(buildDir, "client"),
      publicPath: '/public',
      filename: PROD ? '[name].[chunkhash].js' : '[name].js',
      chunkFilename: PROD ? '[name].[chunkhash].chunk.js' : '[name].js',
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
    plugins: clientPlugins,
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
    entry: resolve(clientSrc, 'server', 'serve.tsx'),
    devtool: PROD ? 'cheap-module-source-map' : 'source-map',
    output: {
      path: resolve(buildDir, "server"),
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

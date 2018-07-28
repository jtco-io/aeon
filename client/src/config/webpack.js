const webpack = require('webpack')
const { StatsWriterPlugin } = require("webpack-stats-plugin")

const {resolve, join} = require('path')


const
  clientDir = resolve(__dirname, "..", ".."),
  buildDir = resolve(clientDir, "build"),
  clientSrc = resolve(clientDir, 'src'),
  clientPublicDir = resolve(clientSrc, 'public'),
  clientIndex = resolve(clientPublicDir, 'index.html')

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development',
  DEV = mode !== 'production',
  PROD = mode === 'production'

const alias = {
  config: resolve(clientSrc, 'config'),
  screens: resolve(clientSrc, 'screens'),
  shared: resolve(clientSrc, 'shared'),
  publicDir: resolve(clientSrc, 'public')
}

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(DEV ? 'development' : 'production')
  }),
]

const moduleRules = {
  rules: [
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    }
  ],
}
const optimization = {
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

const clientPlugins = [
  new webpack.DefinePlugin({
    GRAPHQL_URL: JSON.stringify(process.env.GRAPHQL_URL),
  }),
  new StatsWriterPlugin({
    filename: "stats.json" // Default
  })
]

if (PROD) {
  clientEntry = resolve(clientSrc, 'index.tsx')
  clientPlugins.push(
    new webpack.HashedModuleIdsPlugin()
  )
} else if (!PROD) {
  clientEntry = [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    resolve(clientSrc, 'index.tsx')
  ]
  clientPlugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
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
      filename: PROD ? '[name].[chunkhash].js' : '[name].js',
      chunkFilename: PROD ? '[name].[chunkhash].chunk.js' : '[name].js',
    },
    optimization,
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

const {resolve, join} = require('path')
const TSLintPlugin = require('tslint-webpack-plugin');

const projRoot = resolve(__dirname, "..");

const
  serverDir = join(projRoot, "server"),
  srcDir = join(serverDir, 'src', 'index.ts')

const
  env = process.env,
  mode = env.NODE_ENV === 'production' ? 'production' : 'development',
  PROD = mode === 'production'

module.exports = {
  mode,
  entry: join(serverDir, 'src', 'index.ts'),
  devtool: PROD ? 'cheap-module-source-map' : 'source-map',
  target: 'node',
  output: {
    path: join(serverDir, 'build'),
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
      config: join(srcDir, 'config'),
    }
  },
  plugins: [
    new TSLintPlugin({
      files: ['./src/**/*.ts', './src/**/*.tsx']
    })
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

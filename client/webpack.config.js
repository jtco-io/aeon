const webpackConfig = require( "webpack" );
const { getClientPlugins } = require( "./webpack.clientPlugins" );
const { resolve, join } = require( "path" );

const projRoot = resolve(__dirname, "..");

const clientDir = join( projRoot, "client" );

const dirs = {
  client: clientDir,
  build: join(clientDir, "build"),
  src: join(clientDir, "src"),
  assets: join(clientDir, "src", "assets"),
};

require('dotenv').config({path: resolve(clientDir, "..", ".env")});

const { stringify } = JSON,
  env = process.env,
  { NODE_ENV, PUBLIC_PATH } = env,
  mode = NODE_ENV === "production" ? "production" : "development",
  PROD = mode === "production",
  environmentVariables = {
  __PRODUCTION__: stringify(mode),
    __PROJECT_TITLE__: stringify( env.PROJECT_TITLE ),
    __FRONTEND_HOST__: stringify( env.FRONTEND_HOST ),
    __FRONTEND_PORT__: stringify( env.FRONTEND_PORT ),
    __BACKEND_HOST__: stringify( env.BACKEND_HOST ),
    __BACKEND_PORT__: stringify( env.BACKEND_PORT ),
    __PUBLIC_PATH__: stringify( env.PUBLIC_PATH ),
    __HTTPS__: stringify( env.HTTPS )
};

let clientEntry = [join(dirs.src, "index.tsx")];

if (!PROD) {
  clientEntry = [
    "react-hot-loader/patch",
    "webpack-hot-middleware/client",
    ...clientEntry,
  ];
}

const moduleRules = {
  rules: [
    {
      test: /\.tsx?$/,
      use: "ts-loader",
      exclude: /node_modules/,
    },
    {
      test: /\.(ico|png|jpg|gif)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            emitFile: false,
          }
        }
      ]
    }
  ],
};


const wpResolve = {
  alias: {
    config: join( dirs.src, "config" ),
    screens: join( dirs.src, "screens" ),
    shared: join( dirs.src, "shared" ),
    publicDir: join( dirs.src, "public" ),
    assets: join( dirs.src, "assets" )
  },
  extensions: [".js", ".ts", ".tsx", ".ico", ".png"]
};

module.exports = [
  {
    mode,
    name: "client",
    target: "web",
    stats: true,
    entry: {
      vendor: ["react", "react-dom", "history", "react-router"],
      app: clientEntry,
    },
    devtool: !PROD ? "inline-source-map" : "source-map",
    devServer: {
      hot: true,
    },
    output: {
      path: join(dirs.build, "client"),
      publicPath: PUBLIC_PATH + "bundles",
      filename: PROD
        ? "[name].[chunkhash].bundle.js"
        : "[name].[hash].bundle.js",
      chunkFilename: PROD
        ? "[name].[chunkhash].bundle.js"
        : "[name].[hash].bundle.js",
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: "initial",
            name: "vendor",
            test: "vendor",
            enforce: true,
          },
        },
      },
      runtimeChunk: true,
    },
    plugins: getClientPlugins(PROD, environmentVariables, dirs),
    module: moduleRules,
    resolve: wpResolve
  },
  {
    mode,
    name: "server",
    target: "node",
    entry: join( dirs.src, "server", "clientRenderer" ),
    devtool: PROD ? "cheap-module-source-map" : "source-map",
    output: {
      path: join(dirs.build, "server"),
      filename: "index.js",
      libraryTarget: "commonjs2",
    },
    externals: (context, request, callback) => {
      // Externalize all npm modules.
      if (/^[a-z0-9-][a-z0-9-./]+$/.test(request)) {
        return callback(null, `commonjs ${request}`);
      }
      callback();
    },
    module: moduleRules,
    plugins: [
      new webpackConfig.DefinePlugin({
        ...environmentVariables,
      }),
    ],
    resolve: wpResolve,
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
      setImmediate: false,
    },
  },
];

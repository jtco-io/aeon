function getClientPlugins(PROD, env, dirs) {
  const { resolve } = require( "path" );
  const webpack = require( "webpack" );
  const WebpackPwaManifest = require( "webpack-pwa-manifest" );
  const { StatsWriterPlugin } = require( "webpack-stats-plugin" );
  const OfflinePlugin = require( "offline-plugin" );
  const TSLintPlugin = require( "tslint-webpack-plugin" );
  const ManifestPlugin = require( "webpack-manifest-plugin" );
  const Md5HashPlugin = require( "md5-hash-webpack-plugin" );
  const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );

  const plugins = [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin( {
      "process.env": env,
      __CLIENT_TRUE__: JSON.stringify( true )
    } ),
    new StatsWriterPlugin( {
      filename: "stats.json" // Default
    } ),
    new MiniCssExtractPlugin( {
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: PROD
        ? "[name].[chunkhash].bundle.css"
        : "[name].[hash].bundle.css",
      chunkFilename: PROD
        ? "[name].[chunkhash].bundle.css"
        : "[name].[hash].bundle.css",
    } ),
    new ManifestPlugin(),
    new WebpackPwaManifest( {
      name: env.PROJECT_TITLE,
      short_name: env.PROJECT_TITLE,
      description: "A cutting edge Node.JS and React single page application boilerplate!",
      background_color: "#ffffff",
      icons: [
        {
          // https://github.com/audreyr/favicon-cheat-sheet#id11
          src: resolve( dirs.assets, "favicon.png" ),
          sizes: [
            16,
            32,
            57,
            76,
            96,
            128,
            144,
            152,
            180,
            192,
            256,
            384,
            512,
            1024
          ]
        }
      ]
    } ),
    new TSLintPlugin( {
      files: ["./src/**/*.ts", "./src/**/*.tsx"]
    } )
  ];
  if (!PROD) {
    plugins.push( new webpack.HotModuleReplacementPlugin() );
  }
  plugins.push(
    // it's always better if OfflinePlugin is the last plugin added
    new OfflinePlugin( {
      autoUpdate: true,
      caches: {
        main: [
          'app.*.css',
          "vendor.*.js",
          "app.*.js"
        ]
        // additional: [
        //  ':externals:'
        // ],
        // optional: [
        //  ':rest:'
        // ]
      },
      externals: ["/static/"],
      excludes: ["**/*.map", "**/*.*/hot-update.js"],
      ServiceWorker: {
        navigateFallbackURL: "/",
        events: true,
        publicPath: "/sw.js"
      }
    } )
  );
  return plugins;
}

module.exports = {
  getClientPlugins
};

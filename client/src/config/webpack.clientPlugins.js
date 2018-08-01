const { resolve } = require('path')
const webpack = require('webpack')
const dotenv = require('dotenv')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const { StatsWriterPlugin } = require("webpack-stats-plugin")
const OfflinePlugin = require('offline-plugin')


module.exports = function getClientPlugins(PROD, env, dirs){
  const plugins = [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      ...env,
      __CLIENT_TRUE__: JSON.stringify(true),
    }),
    new StatsWriterPlugin({
      filename: "stats.json" // Default
    }),
    new WebpackPwaManifest({
      name: env.PROJECT_TITLE,
      short_name: env.PROJECT_TITLE,
      description: 'A cutting edge Node.JS and React single page application boilerplate!',
      background_color: '#ffffff',
      icons: [
        {
          //https://github.com/audreyr/favicon-cheat-sheet#id11
          src: resolve(dirs.assets, 'favicon.png'),
          sizes: [16, 32, 57, 76, 96, 128, 144, 152, 180, 192, 256, 384, 512, 1024]
        }
      ]
    })

  ]
  if (!PROD){
    plugins.push(
      new webpack.HotModuleReplacementPlugin()
    )
  }
  plugins.push(
    // it's always better if OfflinePlugin is the last plugin added
    new OfflinePlugin({
      autoUpdate: true,
      caches: {
        main: [
          //'app.*.css',
          'vendor.*.js',
          'app.*.js'
        ],
        //additional: [
        //  ':externals:'
        //],
        //optional: [
        //  ':rest:'
        //]
      },
      externals: [
        '/static/'
      ],
      excludes: ['**/*.map', '**/*.*/hot-update.js'],
      ServiceWorker: {
        navigateFallbackURL: '/',
        events: true,
        publicPath: '/sw.js'
      }
    })
  )
  return plugins

}


const WebpackPwaManifest = require('webpack-pwa-manifest')
const OfflinePlugin = require('offline-plugin')

const progressiveWebpappPlugins = [
  new WebpackPwaManifest({
    name: env.PROJECT_TITLE,
    short_name: env.PROJECT_TITLE,
    description: 'A cutting edge Node.JS and React single page application boilerplate!',
    background_color: '#ffffff',
    icons: [
      {
        src: resolve(clientAssets, 'favicon.png'),
        sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
      },
      {
        src: resolve(clientAssets, 'favicon.png'),
        size: '1024x1024' // you can also use the specifications pattern
      }
    ]
  }),
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
      '/'
    ],
    excludes: ['**/*.map', '**/*.*/hot-update.js'],
    ServiceWorker: {
      navigateFallbackURL: '/',
      events: true,
      publicPath: '/sw.js'
    }
  })
]

export default progressiveWebpappPlugins

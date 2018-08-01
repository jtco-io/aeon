import * as webpack from "webpack";
import * as WebpackPwaManifest from "webpack-pwa-manifest";
import { StatsWriterPlugin } from "webpack-stats-plugin";
import * as OfflinePlugin from "offline-plugin";
const { resolve } = require("path");

function getClientPlugins(PROD: boolean, env: any, dirs: any) {
  const plugins = [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      ...env,
      __CLIENT_TRUE__: JSON.stringify(true),
    }),
    new StatsWriterPlugin({
      filename: "stats.json", // Default
    }),
    new WebpackPwaManifest({
      name: env.PROJECT_TITLE,
      short_name: env.PROJECT_TITLE,
      description:
        "A cutting edge Node.JS and React single page application boilerplate!",
      background_color: "#ffffff",
      icons: [
        {
          // https://github.com/audreyr/favicon-cheat-sheet#id11
          src: resolve(dirs.assets, "favicon.png"),
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
            1024,
          ],
        },
      ],
    }),
  ];
  if (!PROD) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }
  plugins.push(
    // it's always better if OfflinePlugin is the last plugin added
    new OfflinePlugin({
      autoUpdate: true,
      caches: {
        main: [
          // 'app.*.css',
          "vendor.*.js",
          "app.*.js",
        ],
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
        publicPath: "/sw.js",
      },
    }),
  );
  return plugins;
}

export default getClientPlugins;

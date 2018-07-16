const express = require("express");
const path = require("path");
//const initializeQqlServer = require('./server/src/index.ts');
const app = express();

if (process.env.NODE_ENV !== "production") {
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const webpackHotServerMiddleware = require("webpack-hot-server-middleware");
  const config = require("./config/webpack.js");
  const compiler = webpack(config);

  app.use(
    webpackDevMiddleware(compiler, {
      serverSideRender: true
    })
  );
  app.use(
    webpackHotMiddleware(
      compiler.compilers.find(compiler => compiler.name === "client")
    )
  );
  app.use(webpackHotServerMiddleware(compiler));
  //app = initializeQqlServer(app)
  // gql server
} else {
  const CLIENT_ASSETS_DIR = path.join(__dirname, "./build/client");
  const CLIENT_STATS_PATH = path.join(CLIENT_ASSETS_DIR, "stats.json");
  const SERVER_RENDERER_PATH = path.join(__dirname, "./build/server.js");
  const serverRenderer = require(SERVER_RENDERER_PATH);
  const stats = require(CLIENT_STATS_PATH);
  app.use(express.static(CLIENT_ASSETS_DIR));
  app.use(serverRenderer(stats));
}

app.listen(8080);

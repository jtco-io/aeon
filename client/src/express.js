const
  fallback = require('express-history-api-fallback'),
  express = require("express"),
  path = require("path");

//const initializeQqlServer = require('./server/src/index.ts');
const app = express();
const port = process.env.PORT || 8080
app.set('port', port);

if (process.env.NODE_ENV !== "production") {
  const
    webpack = require("webpack"),
    webpackDevMiddleware = require("webpack-dev-middleware"),
    webpackHotMiddleware = require("webpack-hot-middleware"),
    webpackHotServerMiddleware = require("webpack-hot-server-middleware"),
    config = require("./config/webpack.js")

  const compiler = webpack(config);

  app.use(
    webpackDevMiddleware(compiler, {
      serverSideRender: true,
      publicPath: '/',
      stats: 'minimal'
    })
  );
  app.use(
    webpackHotMiddleware(
      compiler.compilers.find(compiler => compiler.name === "client")
    )
  );
  app.use(webpackHotServerMiddleware(compiler));
  app.use(express.static('public'));


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

app.use(fallback('index.html'))
app.listen(8080);

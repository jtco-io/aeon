const {resolve, join} = require('path')

const
  srcDir = resolve(__dirname),
  projRoot = resolve(srcDir, "..", ".."),
  envFile = resolve(projRoot, ".env")

require('dotenv').config({path: envFile})

const
  port = process.env.CLIENT_PORT || 8080,
  PROD = process.env.NODE_ENV === "production"

const
  fallback = require('express-history-api-fallback'),
  express = require("express"),
  app = express()

if (!PROD) {
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
      //stats: 'minimal'
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
  const
    CLIENT_ASSETS_DIR = join(__dirname, "./build/client"),
    CLIENT_STATS_PATH = join(CLIENT_ASSETS_DIR, "stats.json"),
    SERVER_RENDERER_PATH = join(__dirname, "./build/server.js");
  const
    serverRenderer = require(SERVER_RENDERER_PATH),
    stats = require(CLIENT_STATS_PATH);

  app.use(express.static(CLIENT_ASSETS_DIR));
  app.use(serverRenderer(stats));
}

app.use(fallback('index.html'))
app.listen(port);

const { resolve, join } = require("path");

const clientServerDir = resolve(__dirname),
  clientSrcDir = resolve(clientServerDir, ".."),
  clientDir = resolve(clientSrcDir, ".."),
  clientBuildDir = resolve(clientDir, "build"),
  projRoot = resolve(clientDir, ".."),
  envFile = resolve(projRoot, ".env");

require("dotenv").config({ path: envFile });

const port = process.env.FRONTEND_PORT || 8080,
  PROD = process.env.NODE_ENV === "production";

const fallback = require("express-history-api-fallback"),
  express = require("express"),
  app = express();

if (!PROD) {
  const proxy = require("http-proxy-middleware");

  function isSW(pathname: string) {
    const isSW = /^\Wsw\.js/.test(pathname);
    return isSW ? true : false;
  }

  app.use(proxy(isSW, { target: "http://localhost:6080/static/bundles/" }));

  const webpack = require("webpack"),
    webpackDevMiddleware = require("webpack-dev-middleware"),
    webpackHotMiddleware = require("webpack-hot-middleware"),
    webpackHotServerMiddleware = require("webpack-hot-server-middleware"),
    config = require("../config/webpack.js");

  const compiler = webpack(config);

  app.use(
    webpackDevMiddleware(compiler, {
      serverSideRender: true,
      publicPath: "/static",
      // stats: 'minimal'
    }),
  );
  app.use(
    webpackHotMiddleware(
      compiler.compilers.find((compiler: any) => compiler.name === "client"),
    ),
  );
  app.use(webpackHotServerMiddleware(compiler));
} else {
  const CLIENT_ASSETS_DIR = join(clientBuildDir, "./client"),
    CLIENT_STATS_PATH = join(CLIENT_ASSETS_DIR, "stats.json"),
    SERVER_RENDERER_PATH = join(clientBuildDir, "./server");
  const serverRenderer = require(SERVER_RENDERER_PATH).default,
    stats = require(CLIENT_STATS_PATH);
  app.use(express.static(CLIENT_ASSETS_DIR));
  app.use(serverRenderer(stats));
}

app.use(fallback("index.html"));
app.listen(port, () => console.log(`Express now listening on port ${port}!`));

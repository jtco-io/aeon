import * as express from "express";
import { join, resolve } from "path";
import { Config } from "./config";
import { Controllers, Directory, DirectoryFiles, DirectoryPaths } from "./types";

export default class Server {
  app: express.Application;
  host: string;
  port: number;
  middlewares: any[];
  config: Config;
  controllers: Controllers;
  directory: Directory;
  webpackConfig: Object;
  bundler: Object;

  constructor(config: Config, controllers: Controllers, webpackConfig: Object) {
    this.app = express();
    this.config = config;
    this.host = config.frontend.host;
    this.port = config.frontend.port;
    this.controllers = controllers;
    this.middlewares = [];
    this.webpackConfig = webpackConfig;
    this.initialize();
  }

  private setDirectories() {
    const clientServer = resolve(__dirname),
      src = join(clientServer, ".."),
      client = join(src, ".."),
      build = join(client, "build");

    const paths: DirectoryPaths = {
      clientServer,
      src,
      client,
      build,
      assets: join(build, "./client"),
      projRoot: join(client, ".."),
    };
    const files: DirectoryFiles = {
      stats: join(paths.assets, "stats.json"),
      serverRenderer: join(paths.assets, "./serverRenderer"),
    };
    this.directory = { paths, files };
  }

  public start() {
    function onListen(host: string, port: number) {
      console.log(`Client Server: Listening at: ${host}:${port}`);
    }

    this.app.listen(this.port, () => onListen(this.host, this.port));
  }

  private initialize() {
    this.setDirectories();
    // this.app.use(this.controllers.ServiceWorkerProxy);

    if (this.config.production) {
      this.getMiddlewaresProduction();
    } else {
      console.log("Client Server: Using Development");
      this.app.use(this.controllers.WebpackDevelopment(this.webpackConfig));
    }
    // this.app.use(require("express-history-api-fallback")("index.html"));
    // this.app.use(require("morgan")("combined"));
  }

  private getMiddlewaresProduction() {
    const { paths, files } = this.directory;
    const SERVER_RENDERER_PATH = join(paths.build, "server", "./index");
    const serverRenderer = require(SERVER_RENDERER_PATH).default;

    this.app.use(express.static(files.stats));
    this.app.use(serverRenderer(require(files.stats)));
  }
}

import * as express from "express";
import { join, resolve } from "path";
import {
  Controllers,
  Directory,
  DirectoryFiles,
  DirectoryPaths,
  FrontEndServerConfig,
} from "./types";

export default class Server {
  app: express.Application;
  host: string;
  port: number;
  middlewares: any[];
  config: FrontEndServerConfig;
  controllers: Controllers;
  directory: Directory;
  webpackConfig: Object;

  constructor(
    config: FrontEndServerConfig,
    controllers: Controllers,
    webpackConfig: Object,
  ) {
    this.app = express();
    this.host = config.env.frontend.host;
    this.port = config.env.frontend.port;
    this.config = config;
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
    this.useMiddlewares();

    function onListen(host: string, port: number) {
      console.log(`Client Server listening at: ${host}:${port}!`);
    }

    this.app.listen(this.port, () => onListen(this.host, this.port));
  }

  private addMiddleware(middleware: any) {
    this.middlewares.push(middleware);
  }

  public useMiddlewares() {
    for (let middlewareKey in this.middlewares) {
      this.app.use(this.middlewares[middlewareKey]);
    }
  }

  private initialize() {
    this.setDirectories();
    this.app.use(this.controllers.ServiceWorkerProxy);

    if (this.config.env.PRODUCTION) {
      this.getMiddlewaresProduction();
    } else {
      this.app.use(this.controllers.WebpackDevelopment(this.webpackConfig));
    }
    this.app.use(require("express-history-api-fallback")("index.html"));
    this.app.use(require("morgan")("combined"));
  }

  private getMiddlewaresProduction() {
    const { paths, files } = this.directory;
    const SERVER_RENDERER_PATH = join(paths.build, "./serveRenderer.tsx");
    const serverRenderer = require(SERVER_RENDERER_PATH).default;
    const stats = require(files.stats);

    this.addMiddleware(express.static(files.stats));
    this.addMiddleware(serverRenderer(stats));
  }
}

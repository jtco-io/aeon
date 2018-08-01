import * as express from "express";
import { Env } from "../config/env";
import expressControllers from "./controllers";
import {
  config,
  Directory,
  DirectoryFiles,
  DirectoryPaths,
  FrontEndServerConfig,
} from "./types";
const { resolve, join } = require("path");

class Server {
  app: express.Application;
  host: string;
  port: number;
  middlewares: any[];
  config: FrontEndServerConfig;
  controllers: any;
  compiler: any;
  directory: Directory;

  constructor(config: FrontEndServerConfig, controllers: any) {
    this.app = express();
    this.host = config.env.frontend.host;
    this.port = config.env.frontend.port;
    this.config = config;
    this.controllers = controllers;
    this.middlewares = [];

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
      projRoot: resolve(client, ".."),
    };
    const files: DirectoryFiles = {
      stats: join(paths.assets, "stats.json"),
      serverRenderer: join(paths.assets, "./serverRenderer"),
    };
    this.directory = { paths, files };
  }

  private initialize() {
    this.setDirectories();
    this.app.use(this.controllers.controllers.ServiceWorkerProxy);

    if (this.config.env.PRODUCTION) {
      this.getMiddlewaresProduction();
    } else {
      this.app.use(WebpackDevelopment(require("../config/webpack")));
    }
    this.app.use(require("express-history-api-fallback")("index.html"));
    this.app.use(require("morgan")("combined"));
  }

  private addMiddleware(middleware: any) {
    this.middlewares.push(middleware);
  }

  public useMiddlewares() {
    for (let middlewareKey in this.middlewares) {
      this.app.use(this.middlewares[middlewareKey]);
    }
  }

  private getMiddlewaresProduction() {
    const { paths, files } = this.directory;
    const SERVER_RENDERER_PATH = join(paths.build, "./serveRenderer.tsx");
    const serverRenderer = require(SERVER_RENDERER_PATH).default;
    const stats = require(files.stats);

    this.addMiddleware(express.static(files.stats));
    this.addMiddleware(serverRenderer(stats));
  }

  public start() {
    this.useMiddlewares();
    this.app.listen(this.port, () =>
      console.log(`Express now listening on port ${this.port}!`),
    );
  }
}

export default new Server(config, expressControllers).start();

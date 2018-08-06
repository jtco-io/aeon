import * as express from "express";
import { proxyMiddleware } from "http-proxy-middleware";
import { join, resolve } from "path";
import { Config, Controllers, Directory } from "./types";

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

    console.log("Client Server", config, this.config.directories);

    this.initialize();
  }

  public start() {
    function onListen(host: string, port: number) {
      console.log(`Client Server: Listening at: ${host}:${port}`);
    }

    this.app.listen(this.port, () => onListen(this.host, this.port));
  }

  private initialize() {
    // Make sure to set these bad boys first for logging and service worker proxy.
    const app = this.app,
      { production } = this.config,
      { files } = this.config.directories,
      { WebpackDevelopment, serviceWorkerProxy } = this.controllers;

    app.use(require("morgan")("dev"));
    app.use(serviceWorkerProxy);
    app.use("/favicon.ico", express.static(files.favicon));

    if (production) {
      console.log("Client Server: Using Production");
      this.getMiddlewaresProduction();
    } else {
      console.log("Client Server: Using Development");
      app.use(WebpackDevelopment(this.webpackConfig));
    }
  }

  private getMiddlewaresProduction() {
    const { files, paths } = this.config.directories;
    const serverRenderer = require(files.serverRenderer).default;

    this.app.use("/static/bundles", express.static(paths.build.client));
    // Stats passed here!
    this.app.use(serverRenderer({ clientStats: require(files.stats) }));
  }
}

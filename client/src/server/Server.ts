import * as express from "express";
import { proxyMiddleware } from "http-proxy-middleware";
import { join, resolve } from "path";
import { Config, Controllers } from "./types";

export default class Server {
  app: express.Application;
  config: Config;
  controllers: Controllers;
  webpackConfig: Object;

  constructor(config: Config, controllers: Controllers, webpackConfig: Object) {
    this.config = config;
    this.controllers = controllers;
    this.webpackConfig = webpackConfig;
    this.app = express();
    this.initialize();
  }

  public start() {
    const {
      frontend: { host, port },
    } = this.config;

    this.app.listen(port, () =>
      console.log(`Client Server: Listening at: ${host}:${port}`),
    );
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
      const manifestPath = this.config.directories.files.manifest;
      const manifest = require(manifestPath);

      console.log("Client Server: Using Development");
      app.use(WebpackDevelopment(this.webpackConfig, this.config));
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

import { Config as IsoConfig } from "../config/types";

export interface Controllers {
  serviceWorkerProxy: any;
  isFaviconProxy: any;
  WebpackDevelopment: any;
}

export interface DirectoryPaths {
  clientServer: string;
  src: string;
  client: string;
  build: {
    client: string;
    server: string;
  };
  assets: string;
  projRoot: string;
}

export interface DirectoryFiles {
  stats: string;
  serverRenderer: any;
  favicon: any;
  manifest: any;
}

export interface Directory {
  paths: DirectoryPaths;
  files: DirectoryFiles;
}

export type Config = IsoConfig & { directories: any };

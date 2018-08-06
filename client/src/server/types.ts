export { Config } from "config";

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
}

export interface Directory {
  paths: DirectoryPaths;
  files: DirectoryFiles;
}

declare module "server" {
  export interface DirectoryPaths {
    clientServer: string;
    src: string;
    client: string;
    build: string;
    assets: string;
    projRoot: string;
  }

  export interface DirectoryFiles {
    stats: string;
    serverRenderer: any;
  }
  export interface Directory {
    paths: DirectoryPaths;
    files: DirectoryFiles;
  }
}

import { DirectoryFiles, DirectoryPaths } from "./types";

const { join, resolve } = require("path");
const projRoot = resolve(__dirname, "..", "..", ".."),
  client = join(projRoot, "client"),
  clientServer = join(client, "server"),
  src = join(client, ".."),
  build = join(client, "build");

const paths: DirectoryPaths = {
  clientServer,
  src,
  client,
  build: {
    client: join(build, "client"),
    server: join(build, "server"),
  },
  assets: join(src, "./assets"),
  projRoot: join(client, ".."),
};
const files: DirectoryFiles = {
  stats: join(paths.build.client, "stats.json"),
  manifest: join(paths.build.client, "manifest.json"),
  serverRenderer: join(paths.build.server, "./index"),
  favicon: join(paths.assets, "./favicon.ico"),
};
export const directories = { paths, files };

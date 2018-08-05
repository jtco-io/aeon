export { Config } from "../config";

export interface WebpackAssetsByChunkName {
  [s: string]: string | string[];
}

export interface WebpackReason {
  loc: string;
  module: string;
  moduleId: number;
  moduleIdentifier: string;
  moduleName: string;
  type: string;
  userRequest: string;
}

export interface WebpackOrgin {
  loc: string;
  module: string;
  moduleId: number;
  moduleIdentifier: string;
  moduleName: string;
  name: string;
  reasons: WebpackReason[];
}

export interface WebpackChunk {
  entry: boolean;
  files: string[];
  filteredModules: number;
  id: number;
  initial: boolean;
  modules: string[];
  names: string[];
  origins: WebpackOrgin[];
  parents: any[];
  rendered: boolean;
  size: number;
}

export interface WebpackAsset {
  chunkNames: [];
  chunks: number[];
  emitted: boolean;
  name: string;
  size: number;
}

export interface WebpackClientStats {
  version: string;
  hash: string;
  time: number;
  filteredModules: number;
  outputPath: string;
  assetsByChunkName: WebpackAssetsByChunkName;
  assets: WebpackAsset[];
  chunks: WebpackChunk[];
}

export interface Asset {
  chunkName: string;
  url: string;
}

export interface Assets {
  ["js"]: Asset[];
  ["css"]?: Asset[];
  ["img"]?: Asset[];
  manifest?: Asset;
}

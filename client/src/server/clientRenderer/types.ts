export { Config } from "../config";

export interface WebpackAsset {
  chunkNames: any;
  chunks: any;
  emitted: any;
  name: string;
  size: number;
}

export interface WebpackChunk {
  entry: boolean;
  files: any;
  filteredModules: number;
  id: number;
  initial: boolean;
  modules: any;
  names: any;
  origins: any;
  parents: any;
  rendered: boolean;
  size: number;
}

export interface WebpackClientStats {
  assets: WebpackAsset[];
  chunks: WebpackChunk[];
  assetsByChunkName: any[];
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

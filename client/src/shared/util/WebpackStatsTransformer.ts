const fetch = require("node-fetch");
import { Config } from "../../config";

interface WebpackAsset {
  chunkNames: any;
  chunks: any;
  emitted: any;
  name: string;
  size: number;
}
interface WebpackChunk {
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
}

function fetchFile(url: string) {
  const options = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // body: JSON.stringify(data)
  };

  function handleJson(data: any) {
    console.log(data.origin, data.json);
  }

  return fetch(url, options)
    .then((response: any) => response.json())
    .then(handleJson)
    .catch(console.log);
}

class WebpackStatsTransformer {
  config: Config;
  stats: WebpackClientStats;
  filenames: {
    js: string[];
    img?: string[];
    manifest?: any;
  };

  constructor(config: Config, stats: WebpackClientStats) {
    this.config = config;
    this.stats = stats;
    this.filenames = {
      js: this.jsAssets(),
      manifest: this.getManifest(),
    };
    console.log("filenames", this.filenames);
    console.log("filenames", this.config.env);
  }

  private jsAssets(): any {
    function isJS(asset: WebpackAsset): boolean {
      return Boolean(asset.name.match(/\S+.js(?!.)/));
    }

    return this.stats.assets.filter(isJS).map(asset => asset.name);
  }

  private getManifest(): any {
    function isManifest(asset: WebpackAsset): boolean {
      return Boolean(asset.name.match(/manifest.*.json/));
    }

    const manifest = this.stats.assets
      .filter(isManifest)
      .map(asset => asset.name)[0];

    console.log(fetchFile(manifest));
  }
}

export default WebpackStatsTransformer;

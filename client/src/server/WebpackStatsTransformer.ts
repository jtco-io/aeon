const fetch = require("node-fetch");
import { Config } from "../config";

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

async function requestURL(url: any): Promise<any> {
  const response = await fetch(url);
  return await response.json();
}

class WebpackStatsTransformer {
  config: Config;
  stats: WebpackClientStats;
  manifestURL: string;
  manifest: any;
  filenames: {
    js: string[];
    img?: string[];
    manifest?: any;
  };

  constructor(config: Config, stats: WebpackClientStats) {
    this.config = config;
    this.stats = stats;
    this.manifestURL = this.getManifestURL();
    this.filenames = {
      js: this.jsAssets(),
      img: this.imageAssets(),
      // manifest,
    };
  }

  public async initialize() {
    this.filenames.manifest = await this.fetchManifest();
  }

  private jsAssets(): string[] {
    function isJS(asset: WebpackAsset): boolean {
      if (asset.name === "sw.js") {
        return false;
      }
      return Boolean(asset.name.match(/\S+.js(?!.)/));
    }

    return this.stats.assets.filter(isJS).map(asset => asset.name);
  }

  private imageAssets(): string[] {
    function isImage(asset: WebpackAsset): boolean {
      return Boolean(asset.name.match(/\S+.png(?!.)/));
    }

    function getSize(filename: string): any {
      return filename.match(/\d+(?=x)/)[0];
    }

    const nextImages: any = [];
    let images = this.stats.assets.filter(isImage).map(asset => asset.name);
    images.map(image => {
      nextImages.push({ size: getSize(image), file: image });
    });

    return nextImages;
  }

  private getManifestURL(): string {
    function isManifest(asset: WebpackAsset): boolean {
      return Boolean(asset.name.match(/manifest.*.json/));
    }

    const manifest = this.stats.assets
      .filter(isManifest)
      .map(asset => asset.name)[0];
    return `${this.config.env.FRONTEND_URL}/${manifest}`;
  }

  private async fetchManifest(): Promise<any> {
    return await requestURL(this.manifestURL);
  }
}

export default WebpackStatsTransformer;

import fetch from "node-fetch";
import { Config } from "../config";

async function requestURL(url: any): Promise<any> {
  const response = await fetch(url);
  return await response.json();
}

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

class WebpackStatsTransformer {
  config: Config;
  stats: WebpackClientStats;
  manifestURL: string;
  manifest: any;
  chunkNames: string[];
  byType: {
    js: string[];
    css: string[];
    img?: string[];
    manifest?: any;
  };

  constructor(config: Config, stats: WebpackClientStats) {
    this.config = config;
    if (stats) {
    }

    this.stats = stats;
    // console.log(Object.keys(this.stats));
    if (!config.production) {
      this.manifestURL = this.getManifestURL();
    }
    this.byType = { js: [], css: [], img: [] };
  }

  static isJS(filename: string): boolean {
    return Boolean(filename.match(/\S+.js(?!.)/));
  }

  getFullBundleUrl(filename: string): string {
    const { frontend, publicPath } = this.config;
    return `${frontend.url}${publicPath}bundles/${filename}`;
  }

  public async initialize() {
    // this.filenames.manifest = await this.fetchManifest ();
    // this.statsURL = this.getFullBundleUrl("stats");
    console.log(this.getFullBundleUrl("stats.json"));

    const { assetsByChunkName } = this.stats;
    this.chunkNames = Object.keys(assetsByChunkName);

    for (let chunkName in assetsByChunkName) {
      const filename = assetsByChunkName[chunkName];
      const fileURL = this.getFullBundleUrl(assetsByChunkName[chunkName]);
      if (WebpackStatsTransformer.isJS(filename)) this.byType.js.push(fileURL);
    }
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
    return this.getFullBundleUrl(manifest);
  }

  private async fetchURL(): Promise<any> {
    return await requestURL(this.manifestURL);
  }
}

export default WebpackStatsTransformer;

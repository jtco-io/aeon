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
  assetsByChunkName: any[];
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
  chunkNames: string[];
  byType: {
    js: string[];
    css: string[];
    img?: string[];
    manifest?: any;
  };

  constructor(config: Config, stats: WebpackClientStats) {
    this.config = config;
    this.stats = stats;
    console.log(Object.keys(this.stats));
    if (!config.env.PRODUCTION) {
      this.manifestURL = this.getManifestURL();
    }
    this.byType = { js: [], css: [], img: [] };
  }

  getFullBundleUrl(filename: string): string {
    const { FRONTEND_URL, PUBLIC_PATH } = this.config.env;
    return `${FRONTEND_URL}${PUBLIC_PATH}bundles/${filename}`;
  }

  isJS(filename: string): boolean {
    return Boolean(filename.match(/\S+.js(?!.)/));
  }

  public async initialize() {
    // this.filenames.manifest = await this.fetchManifest ();

    const { assetsByChunkName } = this.stats;
    this.chunkNames = Object.keys(assetsByChunkName);

    for (let chunkName in assetsByChunkName) {
      const filename = assetsByChunkName[chunkName];
      const fileURL = this.getFullBundleUrl(assetsByChunkName[chunkName]);
      if (this.isJS(filename)) this.byType.js.push(fileURL);
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
    return `${this.config.env.FRONTEND_URL}/${manifest}`;
  }

  private async fetchManifest(): Promise<any> {
    return await requestURL(this.manifestURL);
  }
}

export default WebpackStatsTransformer;

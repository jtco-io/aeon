const fetch = require("node-fetch");
import { Asset, Assets, Config, WebpackStats } from "./types";

class WebpackStatsTransformer {
  config: Config;
  stats: WebpackStats;
  assetsByFileType: Assets;
  manifest: Asset;

  constructor(config: Config, stats: WebpackStats | null) {
    this.config = config;
    this.stats = stats;
    this.assetsByFileType = {
      js: [],
      map: [],
      css: [],
      manifest: {
        url: null,
        chunkName: null,
      },
    };
  }

  getFullBundleUrl(filename: string): string {
    const { publicPath } = this.config;
    return `${publicPath}bundles/${filename}`;
  }

  private assetDetector(chunkName: string) {
    let assets = this.stats.assetsByChunkName[chunkName];

    /**
     * During Production chunk assets are returned as an array, in dev let
     * just make an array.
     * */
    if (!Array.isArray(assets)) {
      assets = [assets];
    }

    const jsRegex = /\S+.js(?!.)/,
      mapRegex = /\S+.map(?!.)/,
      cssRegex = /\S+.css(?!.)/;

    for (let asset of assets) {
      let fileType;
      const falseInput = { input: false };
      switch (asset) {
        case (asset.match(jsRegex) || falseInput).input:
          fileType = this.assetsByFileType.js;
          break;
        case (asset.match(mapRegex) || falseInput).input:
          fileType = this.assetsByFileType.map;
          break;
        case (asset.match(cssRegex) || falseInput).input:
          fileType = this.assetsByFileType.css;
          break;
      }
      fileType.push({ chunkName, url: this.getFullBundleUrl(asset) });
    }
  }

  private async getWebpackManifest(): Promise<any> {
    /* In Production we can Node.JS import the manifest*/
    if (this.config.production && !this.manifest) {
      this.manifest = await this.config.manifest.then(
        (manifest: any) => manifest,
      );
    } else {
      const manifest = await fetch(this.getFullBundleUrl("manifest.json"));
      this.manifest = await manifest.json();
    }
  }

  private async getServiceWorkerManifest() {
    await this.getWebpackManifest();

    function isManifest(asset: any): boolean {
      return Boolean(asset.match(/manifest.*.json/));
    }

    const manifest = Object.keys(this.manifest).filter(isManifest);
    this.assetsByFileType.manifest = {
      chunkName: "service-worker",
      url: this.getFullBundleUrl(manifest[0]),
    };
  }

  public async initialize() {
    // await this.getServiceWorkerManifest();

    const { assetsByChunkName } = this.stats;

    for (let chunkName of Object.keys(assetsByChunkName)) {
      await this.assetDetector(chunkName);
    }
  }
}

export default WebpackStatsTransformer;

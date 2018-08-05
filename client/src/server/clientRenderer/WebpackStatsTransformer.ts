import { Config } from "../config";
import { Assets, WebpackClientStats } from "./types";

class WebpackStatsTransformer {
  config: Config;
  stats: WebpackClientStats;
  assetsByFileType: Assets;

  constructor(config: Config, stats: WebpackClientStats | null) {
    this.config = config;
    this.stats = stats;
    this.assetsByFileType = {
      js: [],
      map: [],
      css: [],
    };
    this.initialize();
  }

  getFullBundleUrl(filename: string): string {
    const { frontend, publicPath } = this.config;
    return `${frontend.url}${publicPath}bundles/${filename}`;
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

  private initialize() {
    const { assetsByChunkName } = this.stats;

    for (let chunkName of Object.keys(assetsByChunkName)) {
      this.assetDetector(chunkName);
    }
  }
}

export default WebpackStatsTransformer;

import fetch from "node-fetch";
import { Config } from "../config";
import { Assets, WebpackClientStats } from "./types";

async function requestURL(url: any): Promise<any> {
  const response = await fetch(url);
  return await response.json();
}

class WebpackStatsTransformer {
  config: Config;
  stats: WebpackClientStats;
  assetsByFileType: Assets;

  constructor(config: Config, stats: WebpackClientStats | null) {
    this.config = config;
    this.stats = stats;
  }

  getFullBundleUrl(filename: string): string {
    const { frontend, publicPath } = this.config;
    return `${frontend.url}${publicPath}bundles/${filename}`;
  }

  static isJS(filename: string): boolean {
    return Boolean(filename.match(/\S+.js(?!.)/));
  }

  private async massageStats() {
    const { assetsByChunkName } = await this.stats;
    const chunks = assetsByChunkName;

    this.assetsByFileType = {
      js: [],
    };

    for (let chunkName in chunks) {
      let chunkFilename = chunks[chunkName];
      if (WebpackStatsTransformer.isJS(chunkFilename)) {
        this.assetsByFileType.js.push({
          chunkName,
          url: this.getFullBundleUrl(chunkFilename),
        });
      }
    }
    await this.assetsByFileType;
  }

  public async initialize() {
    if (!this.stats) {
      const statsURL = this.getFullBundleUrl("stats.json");
      this.stats = await requestURL(statsURL);
      await this.stats;
    }
    this.massageStats();
  }
}

export default WebpackStatsTransformer;

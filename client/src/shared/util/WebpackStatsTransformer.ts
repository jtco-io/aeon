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


class WebpackStatsTransformer {
  stats:  WebpackClientStats
  filenames: {
    js: string[]
    img?: string[]
  }

  constructor(stats: WebpackClientStats) {
    this.stats = stats
    this.filenames = {
      js: this.jsAssets()
    }
  }

  private jsAssets(): any {
    function isJS(asset: WebpackAsset): boolean {
      return Boolean(asset.name.match(/\S+.js(?!.)/));
    }

    return this.stats.assets.filter(isJS).map(asset => asset.name);
  }



}

export default WebpackStatsTransformer

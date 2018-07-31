import * as React from "react";
import createStore from "../shared/util/createStore";

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
interface WebpackClientStats {
  assets: WebpackAsset[];
  chunks: WebpackChunk[];
}

interface HtmlProps {
  content: any;
  title: string;
  apolloClient: any;
  clientStats: WebpackClientStats;
}

class Html extends React.Component<HtmlProps, {}> {
  private initializeState() {
    const { apolloClient } = this.props;
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__=${JSON.stringify(
            apolloClient.extract(),
          )};`,
        }}
      />
    );
  }

  private jsAssets(): any {
    function isJS(asset: WebpackAsset): boolean {
      return Boolean(asset.name.match(/\S+.js(?!.)/));
    }
    const jsAssets = this.props.clientStats.assets.filter(isJS);

    return jsAssets.map(asset => (
      <script key={asset.name} src={`/public/${asset.name}`} />
    ));
  }

  public render(): JSX.Element {
    const { content, title } = this.props;
    return (
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{title}</title>
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
          {this.initializeState()}
          {this.jsAssets()}
        </body>
      </html>
    );
  }
}

export default Html;

import * as React from "react";
import createStore from "../shared/util/createStore";
import WebpackStatsTransformer, {
  WebpackClientStats,
} from "../shared/util/WebpackStatsTransformer";
import { Config } from "../config";

interface HtmlProps {
  content: any;
  config: Config;
  title: string;
  apolloClient: any;
  clientStats: WebpackClientStats;
}

class Html extends React.Component<HtmlProps, {}> {
  assets: any;
  constructor(props: HtmlProps) {
    super(props);
    this.assets = new WebpackStatsTransformer(props.config, props.clientStats);
  }

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
    return this.assets.filenames.js.map((filename: string) => (
      <script key={filename} src={`/${filename}`} />
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

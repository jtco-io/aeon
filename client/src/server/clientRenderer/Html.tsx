import * as React from "react";
import { Asset, Assets, Config } from "./types";

interface HtmlProps {
  content: any;
  config: Config;
  title: string;
  apolloClient: any;
  assets: Assets;
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

  public render(): JSX.Element {
    const {
      content,
      title,
      assets: { js },
    } = this.props;
    return (
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{title}</title>
          {/*<link rel="manifest" href={this.props.assets.manifestURL} />*/}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
          {this.initializeState()}
          {js.map(({ chunkName, url }: Asset) => (
            <script key={chunkName} src={url} />
          ))}
        </body>
      </html>
    );
  }
}

export default Html;

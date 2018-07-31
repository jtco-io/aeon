import * as React from "react";
import createStore from "../shared/util/createStore";
import { WebpackClientStats } from "./WebpackStatsTransformer";
import { Config } from "../config";

interface HtmlProps {
  content: any;
  config: Config;
  title: string;
  apolloClient: any;
  assets: any;
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
    return this.props.assets.filenames.js.map((filename: string) => (
      <script key={filename} src={`/${filename}`} />
    ));
  }

  private mapFavIcons() {
    const faviconSizes = [
      16,
      32,
      57,
      76,
      96,
      128,
      144,
      152,
      180,
      192,
      256,
      384,
      512,
      1024,
    ];
    const { img } = this.props.assets.filenames;
    return faviconSizes.map((size: number) => {
      const file = img.find((imageFile: any) => {
        return Number(imageFile.size) === Number(size);
      });
      if (file) {
        return (
          <link
            rel="icon"
            key={file.file}
            href={file.file}
            sizes={`${size}x${size}`}
          />
        );
      }
    });
  }

  private favicons(): any {
    const { img } = this.props.assets.filenames;

    return (
      <React.Fragment>
        <link
          rel="apple-touch-icon-precomposed"
          href={`${img.find((img: any) => 512).file}`}
        />

        {this.mapFavIcons()}

        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta
          name="msapplication-TileImage"
          content={`${img.find((img: any) => 144).file}`}
        />
      </React.Fragment>
    );
  }

  public render(): JSX.Element {
    const { content, title } = this.props;
    return (
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{title}</title>
          <link rel="manifest" href={this.props.assets.manifestURL} />
          {this.favicons()}
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

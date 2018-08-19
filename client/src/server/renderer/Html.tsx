import * as React from "react";
import { Asset, Assets } from "./types";

interface HtmlProps {
  context?: any;
  content: any;
  title: string;
  initialState: any;
  assets: Assets;
  req?: any;
}

interface HtmlState {
  html: any;
}

class Html extends React.Component<HtmlProps, any> {
  state: any;

  constructor(props: HtmlProps) {
    super(props);
    this.state = {
      root: props.content,
      modules: [],
    };
  }

  public render(): JSX.Element {
    const { title, assets } = this.props;
    const { root } = this.state;
    return (
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{title}</title>
          {assets.css.map(({ chunkName, url }, key) => (
            <link key={key} href={url} rel="stylesheet" />
          ))}
          {assets.js.map(({ chunkName, url }: Asset, key) => (
            <script async key={key} src={url} />
          ))}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: root }} />
        </body>
      </html>
    );
  }
}

export default Html;

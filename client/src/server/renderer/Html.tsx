import * as React from "react";
import { Assets, Asset } from "./types";

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
  css: any;
}

class Html extends React.Component<HtmlProps, any> {
  state: any;

  constructor(props: HtmlProps) {
    super(props);
    this.state = {
      root: props.content,
      apolloState: `window.__APOLLO_STATE__=${JSON.stringify(
        props.initialState,
      )};`,
      modules: [],
      css: null,
      stylesheet: null,
    };
  }

  public render(): JSX.Element {
    const { title, assets } = this.props;
    const { css, root, apolloState } = this.state;
    return (
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{title}</title>
          <script dangerouslySetInnerHTML={{ __html: apolloState }} />
        </head>
        <body>
          <div id="root">{root}</div>
          <script dangerouslySetInnerHTML={{ __html: css }} />
          {assets.js.map(({ chunkName, url }: Asset) => (
            <script key={chunkName} src={url} />
          ))}
        </body>
      </html>
    );
  }
}

export default Html;

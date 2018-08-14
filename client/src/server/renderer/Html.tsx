import { StyleSheetServer } from "aphrodite";
import * as React from "react";
import { Assets } from "./types";

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
      modules: [],
      css: null,
      stylesheet: null,
    };
    this.setStyles();
  }

  private setStyles() {
    const { html, css } = StyleSheetServer.renderStatic(() => this.state.root);
    this.state.root = html;
    this.state.css = css;
  }

  private hydrateState() {
    const { initialState } = this.props;
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__=${JSON.stringify(initialState)};`,
        }}
      />
    );
  }

  public render(): JSX.Element {
    const { title } = this.props;
    const { css, root } = this.state;

    return (
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{title}</title>
          <style data-aphrodite>{css.content}</style>
        </head>
        <body>
          {this.hydrateState()}
          <div id="root">{root}</div>
        </body>
      </html>
    );
  }
}

export default Html;

import * as React from "react";
import createStore from "../shared/util/createStore";

interface HtmlProps {
  content: any;
  title: string;
  apolloClient: any;
  clientStats: any;
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
    const { content, apolloClient, title, clientStats } = this.props;

    return (
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{title}</title>
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
          {this.initializeState()}

          <script src="/public/runtime~client.js" />
          <script src="/public/vendor.js" />
          <script src="/public/client.js" />
        </body>
      </html>
    );
  }
}

export default Html;

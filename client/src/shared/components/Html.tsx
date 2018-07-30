import * as React from "react";

interface HtmlProps {
  content: any;
  apolloClient: any;
}

class Html extends React.Component<any, {}> {
  private initializeState() {
    const { apolloClient } = this.props;
    if (apolloClient) {
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
  }

  public render(): JSX.Element {
    const { content, apolloClient, title } = this.props;
    return (
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
          {this.initializeState()}

          <script src="/vendor.client.js" />
          <script src="/client.js" />
          <script src="/client.client.js" />
        </body>
      </html>
    );
  }
}

export default Html;

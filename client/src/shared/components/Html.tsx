import * as React from "react";
import { ApolloProvider } from "react-apollo";
import Routes from "shared/components/Routes";

interface HtmlProps {
  content: any;
  apolloClient: any;
}

class Html extends React.Component<any, {}> {
  public render(): JSX.Element {
    const { content, apolloClient } = this.props;
    return (
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__APOLLO_STATE__=${JSON.stringify(
                apolloClient.extract(),
              )};`,
            }}
          />

          <script src="/vendor.client.js" />
          <script src="/client.js" />
          <script src="/client.client.js" />
        </body>
      </html>
    );
  }
}

export default Html;

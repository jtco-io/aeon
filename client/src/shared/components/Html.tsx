import * as React from "react";
import { ApolloProvider } from "react-apollo";
import Routes from "shared/components/Routes";

function html(props: { content: any, apolloClient: any }) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div id="content" dangerouslySetInnerHTML={{ __html: props.content }} />
      </body>
    </html>
  );
}

export default html;

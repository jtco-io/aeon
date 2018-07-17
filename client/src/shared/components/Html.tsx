import * as React from "react";
import { ApolloProvider } from "react-apollo";
import Routes from "shared/components/Routes";

function html(props: { children: any }) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{props.children}</body>
    </html>
  );
}

export default html;

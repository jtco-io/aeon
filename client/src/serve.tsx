import * as React from "react";
import * as ReactDom from "react-dom/server";
import { ApolloProvider } from "react-apollo";
import { apolloClient, routes } from "./config";

// <ApolloProvider client={apolloClient} >
//
//
// </ApolloProvider>

import Html from "shared/components/Html";
import Root from "shared/components/Root";
import Routes from "shared/components/Routes";

export default ({ clientStats }: any): any => {
  // console.log (clientStats)
  return (req: any, res: any, next: any): any => {
    const url = req.url;
    const markup = ReactDom.renderToStaticMarkup(
      <Html>
        <h1>Prion</h1>
        <ApolloProvider client={apolloClient}>
          <Routes location={url} routes={routes} />
        </ApolloProvider>
      </Html>,
    );

    res.send(`<!doctype html>${markup}`);
  };
};

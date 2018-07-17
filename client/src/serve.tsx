import * as React from "react";
import * as ReactDOM from "react-dom/server";
import fetch from "cross-fetch";
import { ApolloClient } from "apollo-client";
import { ApolloProvider, renderToStringWithData } from "react-apollo";
import { routesList } from "./config/routes";
import { HttpLink, createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { Route, RouteProps, Router, Switch, StaticRouter } from "react-router";

// <ApolloProvider client={apolloClient} >
//
//
// </ApolloProvider>

import Html from "shared/components/Html";
import Root from "shared/components/Root";
import Routes from "shared/components/Routes";

const uri = "http://localhost:4000/graphql";
export const apolloClient = new ApolloClient ({
  ssrMode: true,
  link: createHttpLink ({
    uri,
    fetch,
    credentials: "same-origin",
  }),
  cache: new InMemoryCache (),
});

export default ({ clientStats }: any):any => {
  // console.log (clientStats)
  const context:any = {};

  return (req:any, res:any, next:any):any => {
    const component = (
      <ApolloProvider client={apolloClient}>
        <StaticRouter location={req.url} context={context}>
          <Routes routes={routesList}/>
        </StaticRouter>
      </ApolloProvider>
    );
    renderToStringWithData (component)
      .then (content => {
        const html = <Html content={content} apolloClient={apolloClient}/>;
        res.status (200);
        res.send (`<!doctype html>\n${ReactDOM.renderToStaticMarkup (html)}`);
        res.end ();
      })
      .catch (e => {
        console.error ("RENDERING ERROR:", e); // eslint-disable-line no-console
        res.status (500);
        res.end (`An error occurred.:\n\n${e.stack}`);
      });
  };
};

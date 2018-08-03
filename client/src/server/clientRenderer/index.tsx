import * as React from "react";
import { renderToStringWithData } from "react-apollo";
import * as ReactDOM from "react-dom/server";
import GraphQL from "shared/components/GraphQL";
import Root from "shared/components/Root";
import Router from "shared/components/Router";
import createStore from "shared/util/createStore";

import config from "../config";

import Html from "./Html";

interface Assets {
  byType: {
    js: any[];
  };
}

export function clientRenderer({ clientStats }: any): any {
  const context: any = {};

  return async (req: any, res: any, next: any): Promise<any> => {
    const apolloClient = createStore(true);
    const assets: Assets = {
      byType: {
        js: [],
      },
    };
    const component = (
      <GraphQL client={apolloClient}>
        <Router location={req.url} context={context} isServer>
          <Root />
        </Router>
      </GraphQL>
    );
    renderToStringWithData(component)
      .then(content => {
        const html = (
          <Html
            content={content}
            config={config}
            assets={assets}
            title={config.env.PROJECT_TITLE}
            apolloClient={apolloClient}
          />
        );
        res.status(200);
        res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`);
        res.end();
      })
      .catch(e => {
        console.error("RENDERING ERROR:", e); // eslint-disable-line no-console
        res.status(500);
        res.end(`An error occurred.:\n\n${e.stack}`);
      });
  };
}

export default clientRenderer;

import * as React from "react";
import * as ReactDOM from "react-dom/server";
import { renderToStringWithData } from "react-apollo";

import config from "../config";

import Html from "shared/components/Html";
import Root from "shared/components/Root";
import Router from "shared/components/Router";
import GraphQL from "shared/components/GraphQL";

export function serverRenderer({ clientStats }: any): any {
  // console.log ('clientStats', clientStats)

  const context: any = {};

  return (req: any, res: any, next: any): any => {
    const component = (
      <GraphQL>
        <Router location={req.url} context={context} isServer>
          <Root />
        </Router>
      </GraphQL>
    );
    renderToStringWithData(component)
      .then(content => {
        const html = <Html content={content} title={config.projTitle} />;
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

export default serverRenderer;

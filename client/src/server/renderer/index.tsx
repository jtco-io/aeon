import * as React from "react";
import { renderToStringWithData } from "react-apollo";
import * as ReactDOM from "react-dom/server";
import GraphQL from "shared/components/GraphQL";
import Router from "shared/components/Router";
import createStore from "shared/util/createStore";
import Root from "../../Root";
import Html from "./Html";
import { ServerRendererPassedArgs } from "./types";
import WebpackStatsTransformer from "./WebpackStatsTransformer";

export function renderer(serverOptions: ServerRendererPassedArgs): any {
  const { clientStats, config } = serverOptions;
  const context: any = {};

  return async (req: any, res: any, next: any): Promise<any> => {
    const apolloClient = createStore(config, true);

    const stats = await new WebpackStatsTransformer(config, clientStats);
    await stats.initialize();

    const component = await renderToStringWithData(
      <GraphQL client={apolloClient}>
        <Router location={req.url} context={context} isServer>
          <Root />
        </Router>
      </GraphQL>,
    );

    const initialState = apolloClient.extract();

    const html = (
      <Html
        content={component}
        assets={stats.assetsByFileType}
        title={config.env.PROJECT_TITLE}
        initialState={initialState}
      />
    );
    res.status(200);
    res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`);
    res.end();
  };
}

export default renderer;

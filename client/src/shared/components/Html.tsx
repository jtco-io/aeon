import * as React from "react";
import { ApolloProvider } from "react-apollo";
import Routes from "shared/components/Routes";

class Html extends React.Component<{content: any, apolloClient: any}, {}> {
  public render():JSX.Element {
    const {content} = this.props
    return<html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </head>
      <body>
        <div id="content" dangerouslySetInnerHTML={{ __html: content }}/>
      </body>
    </html>;
  }
}

export default Html;

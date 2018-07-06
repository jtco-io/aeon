import * as React from "react";
import * as ReactDOM from "react-dom";

// import { apolloClient, ApolloProvider } from 'config/apollo';
import App from "screens/App";
// const token = localStorage.getItem(AUTH_TOKEN)
// <RootContainer token={token} />
// <ApolloProvider client={apolloClient} >
ReactDOM.render(<App />, document.getElementById("root"));

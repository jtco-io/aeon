import apolloBoost from "apollo-boost";

const apolloClient = new ApolloClient({
  uri: "/graphql",
});

export default apolloClient;

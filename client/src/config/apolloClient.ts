import apolloBoost from "apollo-boost";

const apolloClient = new apolloBoost({
  uri: "http://localhost:4000/graphql",
});

export default apolloClient;

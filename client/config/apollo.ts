// import { HttpLink, InMemoryCache, ApolloClient } from 'apollo-client-preset'
// import { WebSocketLink } from 'apollo-link-ws'
// import { ApolloLink, split } from 'apollo-link'
// import { getMainDefinition } from 'apollo-utilities'
// /*eslint-disable no-unused-vars*/
// import { ApolloProvider } from 'react-apollo'
// import { AUTH_TOKEN } from './constant'
//
// export { ApolloProvider } from 'react-apollo'
// /*eslint-disable no-undef*/
// const graphqlUrl = GRAPHQL_URL || 'localhost:4000',
//   httpLink = new HttpLink({ uri: `http://${graphqlUrl}` }),
//   middlewareLink = new ApolloLink((operation, forward) => {
//     // get the authentication token from local storage if it exists
//     const tokenValue = localStorage.getItem(AUTH_TOKEN)
//     // return the headers to the context so httpLink can read them
//     operation.setContext({
//       headers: {
//         Authorization: tokenValue ? `Bearer ${tokenValue}` : '',
//       },
//     })
//     return forward(operation)
//   }),
//   httpLinkAuth = middlewareLink.concat(httpLink),
//   wsLink = new WebSocketLink({
//     uri: `ws://${graphqlUrl}`,
//     options: {
//       reconnect: true,
//       connectionParams: {
//         Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
//       },
//     },
//   }),
//   link = split(
//     // split based on operation type
//     ({ query }) => {
//       const { kind, operation } = getMainDefinition(query)
//       return kind === 'OperationDefinition' && operation === 'subscription'
//     },
//     wsLink,
//     httpLinkAuth,
//   ),
//   apolloClient = new ApolloClient({
//     link: ApolloLink.from([link]),
//     cache: new InMemoryCache(),
//     connectToDevTools: true,
//   })
//
// export { apolloClient }

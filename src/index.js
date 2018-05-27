import React from 'react'
import ReactDOM from 'react-dom'
import { AUTH_TOKEN } from './constant'
import RootContainer from './components/RootContainer'
import { apolloClient, ApolloProvider } from './helper/apolloClient'

//import 'tachyons'
//import './index.css'

const token = localStorage.getItem(AUTH_TOKEN)

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <RootContainer token={token} />
  </ApolloProvider>,
  document.getElementById('root'),
)

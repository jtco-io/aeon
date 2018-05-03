// @flow
import React from 'react'
import { Link } from 'react-router-dom'

type Props = { location: { pathname: string } }
const PageNotFound = (props: Props) => (
  <div>
    <p>Sorry, no page found at {props.location.pathname}</p>
    <Link to="/">Go Home</Link>
  </div>
)

export default PageNotFound

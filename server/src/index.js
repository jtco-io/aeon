import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import morgan from 'morgan'
import graphqlHTTP from 'express-graphql'
import schema from './schema'

const app = express()

app.use(morgan('combined'))

app.use("/graphql", function (req, res, next) {
  //res.header('Access-Control-Allow-Origin', 'localhost:5000');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
})

app.use('/graphql', graphqlHTTP({
  schema: schema(),
  pretty: true,
  graphiql: true
}))

const server = app.listen(3000, () => {
  let { address, port } = server.address()
  console.log(`graphql server listening at ${address} on port ${port}`)
})

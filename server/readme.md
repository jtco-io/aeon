## Prion Server

* [Setup](#node) - see here for initial setup.
* Technologies Used
* [node](#node) - javascript for the server.
  * [nvm](#nvm) - used to installed multiple versions of node.
* [Database](#database) - sqlite by default.
  * [sqlite](#sqlite) - file based storage
* [Graphql](#graphql)
 * [Apollo](#apollo)

A simple express based graphql server, very similar to an ejected graphql-yoga. At the moment to keep things simple initially the project only supports sqlite

### Setup

`yarn install`

`brew install graphql-playground`

sh -ac ' . ./.env ; docker build --target base-server -t $BASE_SERVER_IMAGE ./server && docker push $BASE_SERVER_IMAGE'

### Inspired by

https://github.com/mrblueblue/graphql-express-sqlite

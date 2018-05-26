## Prion Server

A simple express based graphql server, very similar to an ejected graphql-yoga. At the moment to keep things simple initially the project only supports sqlite

### Setup

`yarn install`




sh -ac ' . ./.env ; docker build --target base-server -t $BASE_SERVER_IMAGE ./server && docker push $BASE_SERVER_IMAGE'



### Inspired by

https://github.com/mrblueblue/graphql-express-sqlite

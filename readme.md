Aeon boilerplate allowing quick iteration on on your next project with. Inspired by frameworks like [Django](https://www.djangoproject.com/), [Ruby on Rails](https://rubyonrails.org/), but being closer to [CRA](https://github.com/facebook/create-react-app) and [Flask](http://flask.pocoo.org/).


[![build status](https://gitlab.com/ncrmro/aeon/badges/master/build.svg)](https://gitlab.com/ncrmro/aeon/commits/master)
[![build status](https://gitlab.com/ncrmro/aeon/badges/development/build.svg)](https://gitlab.com/ncrmro/aeon/commits/development)

#### General Tools

* [Node.JS](https://nodejs.org/en/)
* [Typescript](https://www.typescriptlang.org/) typed superset of javascript
* [Express.JS](http://expressjs.com): minimalist web framework
* [Webpack](https://webpack.js.org/): static module bundler
* [GraphQL](https://graphql.org/): DSL Query language for API
* [Apollo](https://www.apollographql.com) - GraphQL API

## Environment: Production
We can look at how docker is deployed to easily check how one might run the production build locally or without docker.
Running `yarn run build` will build both the frontend and backend servers

### Docker
The project can also be built using docker and orchestrated using docker-compose. The idea being external tools should be hooked into the package.json when possible to keeps things DRY.

Docker compose is aliased in the rootpackage.json

* `docker-compose -v` becomes `yarn run dc -v`
* `docker-compose build` becomes `yarn run dc build`
* `docker-compose up` becomes `yarn run dc up`
* `docker-compose push` becomes `yarn run dc push`

.. so on so forth.



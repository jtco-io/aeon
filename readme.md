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


#### Frontend
Entirely devoted to frontend rendering the client, bunlding assets and delivering the assets as need.

* Development Server
* SSR Client Renderer (Various Tools are used see `./client/server/clientRenderer`
* [Express Proxy Middleware](https://github.com/chimurai/http-proxy-middleware)
  * [Service Worker](https://github.com/NekR/offline-plugin)
* [React](https://reactjs.org/): library for building user interfaces

#### Backend
* [Knex.JS](https://knexjs.org/): SQL query builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle
* [Objection.js]( ): ORM for Node.js built on Knex
* [SQLite](https://sqlite.org/index.html) or [PostgresQL](https://www.postgresql.org), see Knex ^ etc



This will spin up the following
* server with our tasks and serving final graphql endpoint
* client code development server server up SSR

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



### Workflow

1. Identifity Feature or Issue
1. Create Issue on Gitlab
  * Create Merge Request and Branch
  * Or Make Sure Development branch is up to date
    * Make new branch and push to Gitlab to have initial CI confirmation.
1. Identify general files than will need to be changed marking with todos, or comments and move to changelist if needed
1. Confirm these line up with orginal Feature or Issue intent
1. Move and Rename files if needed without changed features or visa versa
1. Confirm every thing works and commit initial changes
1. Rename, move or add any features not added in initial round.
1. Commit further changes

# Further Reading

## Extensibility Points
This should be code the by default can simply be copied from the boilerplate and updated ala carte then commited to VCS rather than
relying on complex packing systems.

Not to say packages, libraries and frameworks aren't great, often hide rather simple or
complex functionality inside a black box the user has to dive into their packages to view.

Node modules are the promise of reusable components. They just can be copied and modified freely.

## [The Twelve-Factor App](https://12factor.net)

* Use declarative formats for setup automation, to minimize time and cost for new developers joining the project;
* Have a clean contract with the underlying operating system, offering maximum portability between execution environments;
* Are suitable for deployment on modern cloud platforms, obviating the need for servers and systems administration;
* Minimize divergence between development and production, enabling continuous deployment for maximum agility;
* And can scale up without significant changes to tooling, architecture, or development practices.

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

### Workflow

The workflow once once catalyzed should allow for momentous and agile workflow.

Any time you might change something that could make aeon and any other apps using it more composiable,
go ahead and work it out on a Aeon Fork with out cluttering your project commits with experiments.

Next up plan out your sprints, what features can you get to in that sprint and what can what.. nice to have?

Is Aeon right or do I need to add any external packages to my codebase that I started from Aeon before actually iterating on features (chores).

That is we would like to keep our CI success rate high in our orginal projects.

We acheive this Software Quality Assurance (QA) through pre-commit, pre-push, continuous integration etc

Such as typechecking, linting, unit and browser testing.


### Environment: Development
Currently documentation only covers MacOS using [Homebrew](https://brew.sh), most brew commands work on Windows with [Chocolatey](https://chocolatey.org)

#### [Homebrew](https://brew.sh)
To install Homebrew run the following.

```/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"```

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

## Code and Software quality assurance.
Code is quickly checked pre commit and more extensively testing during CI.

#### Pre Commit
* prettier
* Typescript & ts-lint
* jest

### CI
The first CI stage will run the same commands as pre-commit, while the second stage runs selenium test.

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

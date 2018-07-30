A boilerplate featuring a client built using React fetching data from an apollo graphql server.


* Master [![build status](https://gitlab.com/ncrmro/prion/badges/master/build.svg)](https://gitlab.com/ncrmro/prion/commits/master)
* Development [![build status](https://gitlab.com/ncrmro/prion/badges/development/build.svg)](https://gitlab.com/ncrmro/prion/commits/development)

It is automatically prettiefied, linted, and unit tested using jest both pre-commit and in CI.

## Stack

### Frontend Client
The client and server are designed to be cleanly separate entities.

This means the client contains a server itself capable of proxying graphql requests to the graphql server.

This means the client server
* Proxy's Request
  * Graphql Server
  * Other Backends
* Asset Server & Bundles
  * Production simply serves static files
  * Development allows for the hot reload server to work.

This client server would normally be be commingled with the graphql server and other backend dependencies when it actually consists of a few packages.
* Typescript
* Express
* webpack
  * Webpack/CLI
  * ts-loader
  * Webpack-Hot-Middleware
  * Webpack-Hot-server-middleware

which as more features are added to project that started from this boilerplate.
Instead your free to modify say the server and know the client server it untouched.

### Backend Server

The backend server consists of the following stack.
* [Node.JS](https://nodejs.org/en/)
* [Express.JS](http://expressjs.com) - Web framework
* [Apollo](https://www.apollographql.com) - GraphQL API
* SQL Database - [SQLite](https://sqlite.org/index.html), [PostgresQL](https://www.postgresql.org) etc
  * [Knex.JS](https://knexjs.org) - Schema, Migrations, and Seeds
  * [Objection.js](https://vincit.github.io/objection.js/) - ORM (Object Relationial Manager)


## Workflow

### Environment: Development
Currently documentation only covers MacOS using [Homebrew](https://brew.sh), most brew commands work on Windows with [Chocolatey](https://chocolatey.org)

#### [Homebrew](https://brew.sh)
To install Homebrew run the following.

```/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"```

#### NVM & Yarn

See [here](http://dev.topheman.com/install-nvm-with-homebrew-to-use-multiple-versions-of-node-and-iojs-easily/)
how to to correctly install and use different versions of Node as the same time using brew.

* [NVM](https://github.com/creationix/nvm) - Node Version Manager
* [Yarn](https://yarnpkg.com/en/) Yarn Package Manager (Node Dependencies)

```
brew update
brew install nvm
brew install yarn --without-node
```

##### NVM Post Install
Open .bash_profile..
`mkdir ~/.nvm ; nano ~/.bash_profile`

Add the variables add the NVM environment variables
```
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```
Now load the changes and you should see the location of the NVM dir echoed into the terminal.
`source ~/.bash_profile && echo $NVM_DIR``



##### [Node](https://nodejs.org/en/)
Now that we have NVM installed we can install the latest LTS (Long Term Support) version of Node.JS and Yarn

`nvm install --lts`

`nvm alias default lts/carbon`

Now that we've installed Node.JS we just need too updated NPM for legacy reasons.

```
npm cache clean -f
npm install -g npm
 ```

#### Environment Variables (.env)

Once you've got everything installed and working we can now copy the sample environment variable file using `cp .env.sample .env`

The .env file is to be read based on the client and server configuartion.

#### Starting Development Server

Finally we can spin up the develompment servers using the following command.

```
yarn run start
```

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

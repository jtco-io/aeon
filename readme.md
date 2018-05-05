A boilerplate featuring a client built using React fetching data from an apollo graphql server.

It is automatically prettiefied, linted, and unit tested using jest both pre-commit and in CI.

A final ci step in which selenium is automatically ran is also featured.

| Tech              | Solution                                                        | My solution                                                                         |
|-------------------|-----------------------------------------------------------------|-------------------------------------------------------------------------------------|
| Database          | [PostgresQL](https://www.postgresql.org)                        | Every ones favorite need to write a blog post on why it's the best.                 |
| Testing           | Jest                                                            | Not just for unit but also runs selenium browser test                               |
| Node              | Node                                                            | Allows client and server side code to be shared                                     |


## Dev

Its a good idea to have docker and node installed.

A first time spin up might look something like this.

```
yarn d:dev
```

This will spin up the following
* postgres database
* prisma graphql api
* server with our tasks and serving final graphql endpoint
* client code development server

Next up we need to tell prisma to turn our graphql schema into a database and run any migration needed.

```
yarn d:prisma-deploy
```
## Code and Software quality assurance.
Code is quickly checked pre commit and more extensively testing during CI.

#### Pre Commit
* prettier
* eslint
* flow
* jest

### CI
The first CI stage will run the same commands as pre-commit, while the second stage runs selenium test.

#### Building cached base images

Export lines in .env file to a single command.

```
sh -ac ' . ./.env ; printenv'
```

Build the base versions of each base image to cache any commands such a yarn install ommiting the image will make the build step revert to default node docker image.

```
sh -ac ' . ./.env ; docker build --target client-builder -t $IMAGE_BASE_CLIENT_SERVER . && docker push $IMAGE_BASE_CLIENT_SERVER'
sh -ac ' . ./.env ; docker build --target client-server -t $IMAGE_BASE_CLIENT_BUILDER . && docker push $IMAGE_BASE_CLIENT_BUILDER'
sh -ac ' . ./.env ; docker build --target client -t $REPO . && docker push $REPO'
```

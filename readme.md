A boilerplate featuring a client built using React fetching data from an apollo graphql server.

It is automatically prettiefied, linted, and unit tested using jest both pre-commit and in CI.

A final ci step in which selenium is automatically ran is also featured.

| Tech              | Solution                                                        | My solution                                                                         |
|-------------------|-----------------------------------------------------------------|-------------------------------------------------------------------------------------|
| Database          | [PostgresQL](https://www.postgresql.org)                        | Every ones favorite need to write a blog post on why it's the best.                 |
| Testing           | Jest                                                            | Not just for unit but also runs selenium browser test                               |
| Node              | Node                                                            | Allows client and server side code to be shared                                     |

* Technologies Used
  * [yarn](#sqlite)
  * [Server](#server)
    * [node](#node)
    * [sqlite](#sqlite)
  * [Client](#client)
    * [react](#sqlite)
    * [webpack](#webpack)

## Dev Setup

### NVM Instilation
`brew update && brew install nvm`

`mkdir ~/.nvm`
Open .bash_profile and add the NVM environment variables
`nano ~/.bash_profile`

```
export NVM_DIR=~/.nvm
```

`export NVM_DIR=~/.nvm`
`source $(brew --prefix nvm)/nvm.sh`
`source ~/.bash_profile`
`echo $NVM_DIR`

### Node & Yarn
Now that we have NVM installed we can install the latest LTS version of Node.JS

`nvm install --lts`

`nvm alias default lts/carbon`

`brew install yarn --without-node`

```
npm cache clean -f
npm install -g npm
 ```

### Development

A first time spin up might look something like this.

```
cp .env.sample .env
```

```
yarn run start
```

This will spin up the following
* server with our tasks and serving final graphql endpoint
* client code development server


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

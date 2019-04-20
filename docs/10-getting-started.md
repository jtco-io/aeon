# Getting Started

Checkout [this](10-getting-started.md) doc for more information on setting up Node and other dependencies if your unsure about which Node version your running or don't have yarn/npm.

## Environment Variables (.env)

Once you've got everything installed and working we can now copy the sample environment variable file using `cp .env.sample .env`

The .env file is to be read based on the client and server configuartion.


### node_modules
Thhe following command will install all required Node.JS dependencies.

`yarn run install:all`
`yarn run upgrade:all`


#### Starting Development Server

Finally we can spin up the develompment servers using the following command.

```
yarn run start
```

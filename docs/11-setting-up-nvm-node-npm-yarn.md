## Environment: Development
Currently documentation only covers MacOS using [Homebrew](https://brew.sh), most brew commands work on Windows with [Chocolatey](https://chocolatey.org)

## [Homebrew](https://brew.sh)
To install Homebrew run the following.

```/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"```

## NVM & Yarn

Pretty much the backbone for our Node.JS application.

See [here](http://dev.topheman.com/install-nvm-with-homebrew-to-use-multiple-versions-of-node-and-iojs-easily/) how to to correctly install and use different versions of Node as the same time using brew.

* [NVM](https://github.com/creationix/nvm) - Node Version Manager
* [Yarn](https://yarnpkg.com/en/) Yarn Package Manager (Node Dependencies)

```bash
brew update
brew install nvm
brew install yarn --without-node
```

##### NVM Post Install
Open .bash_profile..
`mkdir ~/.nvm ; nano ~/.bash_profile`

Add the variables add the NVM environment variables

```bash
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```

Now load the changes and you should see the location of the NVM dir echoed into the terminal.

```bash
source ~/.bash_profile && echo $NVM_DIR
```

##### [Node](https://nodejs.org/en/)
Now that we have NVM installed we can install the latest LTS (Long Term Support) version of Node.JS and Yarn

```bass
nvm install --lts
```

```bash
nvm alias default lts/carbon
```

Now that we've installed Node.JS we just need too updated NPM for legacy reasons.

```bash
npm cache clean -f
npm install -g npm
 ```

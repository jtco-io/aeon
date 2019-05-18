#!/usr/bin/env bash

export DIR="test"
export BRANCH="@aeon"

if [ -d $DIR ]
then
    echo "Test directory exists"
else
    echo "Creating test directory"
    mkdir test
fi

if [ -d $DIR/client/ ] # hack to check if we have repo
then
    echo "We have repo"
else
    echo "Cloning repo"
    git clone https://gitlab.com/ncrmro/aeon.git ./test
fi


cd test

git checkout -b $BRANCH


## Install yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt update

sudo apt install yarn -y

ls -la ./

yarn

cd client

yarn

yarn run build

yarn run prod:start

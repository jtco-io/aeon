

`docker-compose -f docker-compose.yml -f ./server/docker-compose.yml build`
`docker-compose -f docker-compose.yml -f ./server/docker-compose.yml up`
`docker exec prismaboilerplate_server_1 yarn prisma deploy`
````


# Building base images

Set .env to terminal
```
sh -ac ' . ./.env ; printenv'
```

```

sh -ac ' . ./.env ; docker build --target client-builder -t $CLIENT_BUILDER_IMAGE . && docker push $CLIENT_BUILDER_IMAGE'
sh -ac ' . ./.env ; docker build --target client-server -t $CLIENT_SERVER_IMAGE . && docker push $CLIENT_SERVER_IMAGE'
sh -ac ' . ./.env ; docker build --target client -t $REPO . && docker push $REPO'
```

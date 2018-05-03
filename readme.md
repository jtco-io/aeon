

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

sh -ac ' . ./.env ; docker build --target client-builder -t $IMAGE_BASE_CLIENT_SERVER . && docker push $IMAGE_BASE_CLIENT_SERVER'
sh -ac ' . ./.env ; docker build --target client-server -t $IMAGE_BASE_CLIENT_BUILDER . && docker push $IMAGE_BASE_CLIENT_BUILDER'
sh -ac ' . ./.env ; docker build --target client -t $REPO . && docker push $REPO'
```

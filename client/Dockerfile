ARG IMAGE=node:carbon

FROM $IMAGE as client-builder
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
RUN yarn install --production=true

FROM client-builder as client-built
COPY . .
RUN yarn run build

FROM client-server as client
COPY --from=client-built build build

EXPOSE 5000
ENTRYPOINT ["serve"]
CMD ["-s", "build"]

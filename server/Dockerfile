ARG IMAGE=node:carbon

FROM $IMAGE as server-builder
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
RUN yarn install --production=true

FROM server-builder as server-built
COPY . .
RUN yarn run build

#FROM client-server as client
#COPY --from=client-built build build
#
#EXPOSE 5000
#ENTRYPOINT ["serve"]
#CMD ["-s", "build"]

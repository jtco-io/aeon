ARG IMAGE=node:carbon

FROM $IMAGE as client-builder
ENV INSTALL_PATH=/client
ENV CLIENT_PORT=8080
ENV SERVER_HOST=0.0.0.0
ENV SERVER_PORT=8081

WORKDIR $INSTALL_PATH

COPY ./package.json $INSTALL_PATH/package.json
COPY ./yarn.lock $INSTALL_PATH/yarn.lock
RUN yarn install

FROM client-builder as client-built
COPY . $INSTALL_PATH
RUN yarn run build

FROM client-built as client
COPY --from=client-built $INSTALL_PATH/build $INSTALL_PATH/build

EXPOSE 8080
ENTRYPOINT ["yarn"]
CMD ["run", "prod:start"]

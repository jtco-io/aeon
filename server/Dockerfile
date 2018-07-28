ARG IMAGE=node:carbon

FROM $IMAGE as server-builder

ENV INSTALL_PATH=/server
ENV SERVER_HOST=0.0.0.0
ENV SERVER_PORT=8081

WORKDIR $INSTALL_PATH

COPY ./package.json $INSTALL_PATH/package.json
COPY ./yarn.lock $INSTALL_PATH/yarn.lock
RUN yarn install --production=true

FROM server-builder as server-built
COPY . $INSTALL_PATH
RUN yarn run build

FROM server-built as server
COPY --from=server-built $INSTALL_PATH/build $INSTALL_PATH/build

EXPOSE 8081
ENTRYPOINT ["yarn"]
CMD ["run", "prod:start"]

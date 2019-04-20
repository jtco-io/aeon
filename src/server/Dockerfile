ARG IMAGE=node:carbon
ARG BACKEND_HOST=localhost
ARG BACKEND_PORT=8081

FROM $IMAGE as server-builder

ENV INSTALL_PATH=/server

WORKDIR $INSTALL_PATH

COPY package.json $INSTALL_PATH/package.json
COPY yarn.lock $INSTALL_PATH/yarn.lock
RUN yarn install --production=true

FROM server-builder as server-built
ENV BACKEND_HOST=localhost
ENV BACKEND_PORT=$BACKEND_PORT
COPY . $INSTALL_PATH
RUN yarn run build

FROM server-built as server
COPY --from=server-built $INSTALL_PATH/build $INSTALL_PATH/build

EXPOSE 8081
ENTRYPOINT ["yarn"]
CMD ["run", "prod:start"]

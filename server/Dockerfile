ARG BASE_IMAGE=node:10.2.1-alpine

FROM $BASE_IMAGE as base-server

ENV INSTALL_PATH=/app
WORKDIR $INSTALL_PATH

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
RUN yarn

FROM base-server
COPY . .
RUN yarn

EXPOSE 5000
ENTRYPOINT ["yarn"]
CMD ["run", "prod"]

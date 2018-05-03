ARG IMAGE=node:9.6.1-alpine
ARG REACT_APP_GRAPHQL_URL=server:4000

FROM $IMAGE as base-selenium

ENV INSTALL_PATH=/app
WORKDIR $INSTALL_PATH
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
RUN yarn

FROM base-selenium
COPY . .
RUN yarn


ENTRYPOINT ["yarn"]
CMD ["run", "start"]

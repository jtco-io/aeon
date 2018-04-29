ARG BASE_IMAGE=node:9.6.1-alpine
ARG REACT_APP_GRAPHQL_URL=server:4000

FROM $BASE_IMAGE
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
RUN yarn
COPY . .
RUN yarn run build


EXPOSE 5000
ENTRYPOINT ["serve"]
CMD ["-s", "build"]

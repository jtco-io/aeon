ARG BASE_IMAGE=node:9.6.1-alpine
ARG CLIENT_BUILDER_IMAGE=$BASE_IMAGE
ARG CLIENT_SERVER_IMAGE=$BASE_IMAGE
ARG REACT_APP_GRAPHQL_URL=server:4000

FROM $CLIENT_SERVER_IMAGE as client-server
RUN yarn global add serve

# Build the client files and allows us to only copy the build folder
FROM $CLIENT_BUILDER_IMAGE as client-builder
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
RUN yarn
COPY . .
RUN yarn run build

# Use our server image as a build argument --build-arg BASE_IMAGE=...
# The copy only the build folder leave node_moduels behind
FROM client-server as client
COPY --from=client-builder build build

# Expose entrypoint and CMD configed to allow as gitlab runner service
EXPOSE 5000
ENTRYPOINT ["serve"]
CMD ["-s", "build"]
# serve -s build

# docker build --target server -t registry.gitlab.com/ncrmro/cra-selenium-ci/base/server .
# docker build --target build --build-arg BASE_IMAGE=registry.gitlab.com/ncrmro/cra-selenium-ci/base/server -t registry.gitlab.com/ncrmro/cra-selenium-ci .
# docker build --target selenium_runner -t registry.gitlab.com/ncrmro/cra-selenium-ci/selenium_runner .
# docker run registry.gitlab.com/ncrmro/cra-selenium-ci
# docker push registry.gitlab.com/ncrmro/cra-selenium-ci/base/server
# docker push registry.gitlab.com/ncrmro/cra-selenium-ci


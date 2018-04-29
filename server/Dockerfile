FROM node:9.6.1-alpine

ENV INSTALL_PATH=/app
WORKDIR $INSTALL_PATH

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
RUN yarn
COPY . .

EXPOSE 5000
ENTRYPOINT ["yarn"]
CMD ["run", "prod"]

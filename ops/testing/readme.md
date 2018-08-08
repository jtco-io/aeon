




sh -ac ' . ./.env ; docker build --target base-server -t $BASE_SELENIUM_IMAGE ./server && docker push $BASE_SELENIUM_IMAGE'


### VNC into Selenium Runners
https://github.com/SeleniumHQ/docker-selenium#debugging
secret



### Debugging With Selenium Hub and VNC

`yarn run dc up -d`
`yarn run dc:selenium up -d backend frontend proxy firefox chrome selenium_hub`
`yarn run dc:selenium up selenium`

This will start up the project servers and the selenium hub and nodes.


Change the FRONTEND_HOST to your local dev machines IP, then

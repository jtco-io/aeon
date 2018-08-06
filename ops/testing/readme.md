




sh -ac ' . ./.env ; docker build --target base-server -t $BASE_SELENIUM_IMAGE ./server && docker push $BASE_SELENIUM_IMAGE'






sh -ac ' . ./.env ; docker build --target base-server -t $BASE_SERVER_IMAGE ./server && docker push $BASE_SERVER_IMAGE'

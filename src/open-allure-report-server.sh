#!/bin/sh

cd ..

ALLURE_SERVER_IS_RUNNING=$(docker ps -aq --filter "ancestor=kochetkovma/allure-server:latest" --filter "status=running")
ALLURE_SERVER_IS_EXITED=$(docker ps -aq --filter "ancestor=kochetkovma/allure-server:latest" --filter "status=exited")

if [ "$ALLURE_SERVER_IS_RUNNING" != "" ]; then

  echo "Allure-server is running"

elif [ "$ALLURE_SERVER_IS_EXITED" != "" ]; then

  echo "Run allure-server, please wait"
  docker start "$ALLURE_SERVER_IS_EXITED"
  sleep 10
  echo "Allure-server is running"

else

  echo "Pull allure-server"
  docker pull kochetkovma/allure-server:latest
  echo "Run allure-server, please wait"
  docker run -d -p 8080:8080 kochetkovma/allure-server:latest
  sleep 10
  echo "Allure-server is running"

fi

echo "Archive test results"
zip -r -u allure-results.zip allure-results

echo "POST test results"
RESPONSE=$(
  curl -X POST 'http://localhost:8080/api/result' -H "accept: */*" -H "Content-Type: multipart/form-data" \
    -F "allureResults=@allure-results.zip;type=application/x-zip-compressed"
)

echo "Get Allure report url"
UUID=$(echo "uuid: $RESPONSE" | grep '"uuid":' | cut -d ':' -f 4 | cut -d '"' -f 2)

GET_REPORT_URL=$(curl --location --request POST 'http://localhost:8080/api/report' --header 'Content-Type: application/json' --data-raw '{
  "reportSpec": {
    "path": [
      "master",
      "11"
    ],
    "executorInfo": {
      "buildName": "#11"
    }
  },
  "results": [
    '\""$UUID"\"'
  ],
  "deleteResults": false
}')

URL=$(echo "Url: $GET_REPORT_URL" | grep '"url":' | cut -d '"' -f 12 | cut -d '"' -f 2)
echo "To open report use the link, please: $URL"

echo "End of ${0##*/}"

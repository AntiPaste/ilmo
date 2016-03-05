FROM mhart/alpine-node:latest

RUN apk add --update-cache build-base python

WORKDIR /app

COPY ./app/package.json /app/package.json
RUN npm install

COPY ./app /app

CMD ["npm", "run", "watch"]

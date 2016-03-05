FROM alpine:latest

RUN apk add rethinkdb --update-cache --repository http://nl.alpinelinux.org/alpine/edge/testing --allow-untrusted

EXPOSE 28015 29015 8080

CMD ["rethinkdb", "--bind", "all"]

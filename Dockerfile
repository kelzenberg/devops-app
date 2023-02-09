FROM docker.io/node:19.1

RUN mkdir /app
WORKDIR /app

COPY . .

RUN yarn
RUN yarn compile

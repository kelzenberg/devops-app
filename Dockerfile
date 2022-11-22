FROM docker.io/node:18

RUN mkdir /app
WORKDIR /app

COPY . .

RUN yarn
RUN yarn compile

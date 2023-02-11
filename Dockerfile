FROM docker.io/node:19.1 as build

RUN mkdir -p /home/node
WORKDIR /home/node

ENV YARN_CACHE_FOLDER /home/node/.yarn

COPY package.json yarn.lock ./
RUN --mount=type=secret,id=npm,dst=/home/node/.npmrc yarn install --frozen-lockfile

COPY . .
RUN yarn build

FROM docker.io/node:19.1

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV YARN_CACHE_FOLDER /home/node/.yarn
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY --from=build $YARN_CACHE_FOLDER $YARN_CACHE_FOLDER
COPY package.json yarn.lock ./
RUN --mount=type=secret,id=npm,dst=/home/node/.npmrc yarn install --frozen-lockfile --production --offline
RUN yarn cache clean

COPY --from=build /home/node/dist ./dist

USER node

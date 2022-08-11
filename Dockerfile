FROM node:12-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

ENV CI=true

COPY package*.json ./

USER node

RUN yarn

COPY --chown=node:node . .

RUN yarn tsc

EXPOSE 4000

CMD ["yarn", "start"]

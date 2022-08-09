FROM node:12-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn

RUN yarn tsc

EXPOSE 4000

CMD [ "node", "./bin/www" ]
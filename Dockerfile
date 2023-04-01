FROM node:current-slim

WORKDIR /frontend

COPY package*.json ./

RUN yarn install

COPY . ./

CMD ["yarn", "start"]

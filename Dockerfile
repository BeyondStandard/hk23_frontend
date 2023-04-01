FROM node:current-slim

WORKDIR /frontend

COPY package*.json ./

RUN yarn install

COPY . ./

EXPOSE 8080
CMD ["yarn", "start"]

<<<<<<< HEAD
# Use whatever version you are running locally (see node -v)
FROM node:16

WORKDIR /app

# Install dependencies (you are already in /app)
COPY package.json yarn.lock ./
RUN yarn install

# Add rest of the client code
# .dockerignore needs to skip node_modules
COPY . /app

EXPOSE 8080

CMD ["npm", "start"]
=======
FROM node:current-slim

WORKDIR /frontend

COPY package*.json ./

RUN yarn install

COPY . ./

EXPOSE 8080
CMD ["yarn", "start"]
>>>>>>> 6c7a078e19e03f4189e547f330282b99e4fa45a8

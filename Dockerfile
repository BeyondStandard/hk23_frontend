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

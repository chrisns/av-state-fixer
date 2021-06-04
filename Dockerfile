FROM node:16.3.0-alpine

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install -s --production

COPY index.js .
USER node

CMD node index.js

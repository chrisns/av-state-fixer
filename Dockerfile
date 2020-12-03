FROM node:alpine
LABEL org.opencontainers.image.source https://github.com/chrisns/av-state-fixer

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install -s --production

COPY index.js .
USER node

CMD node index.js

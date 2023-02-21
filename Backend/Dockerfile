FROM node:16.19-alpine3.16

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build \
    && npm prune --production
EXPOSE 5000

CMD ["node", "dist/main.js"]

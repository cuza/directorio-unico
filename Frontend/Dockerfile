FROM node:16.19-alpine3.16 AS build
WORKDIR /build

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.23-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /build/build/ /usr/share/nginx/html

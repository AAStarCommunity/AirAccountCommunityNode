FROM node:16.20-alpine3.18 as base
RUN npm i -g pnpm

FROM base as build
WORKDIR /root/app
COPY package.json .

#RUN ["pnpm", "install", "--registry", "https://registry.npm.taobao.org"]
RUN ["pnpm", "install"]
RUN ["pnpm", "execute batch-create 10"]

COPY . .
RUN pnpm run build

#
FROM nginx:stable

ADD ./deploy/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /root/app/dist /usr/share/nginx/html

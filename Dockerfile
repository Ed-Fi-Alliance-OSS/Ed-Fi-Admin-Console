FROM node:18-alpine AS build

ARG GITHUB_TOKEN

ENV EG_app__basePath=/edficonsole/v2.3/v7.2/ds4/saas/tx
ENV mode=production

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
RUN npm install

COPY . /app
RUN rm -f config.json

RUN npm run build:prod

RUN rm -f .npmrc

EXPOSE 8598

# Use node directly
# https://stackoverflow.com/questions/51191378/what-is-the-point-of-using-pm2-and-docker-together
CMD ["node", "server.mjs", "--max-http-header-size=16384"]
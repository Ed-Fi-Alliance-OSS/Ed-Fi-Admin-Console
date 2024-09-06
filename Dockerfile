FROM node:18-alpine AS build

ARG GITHUB_TOKEN

ENV EG_app__basePath=/adminconsole

WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build

RUN rm -f .npmrc

EXPOSE 8598

# Use node directly
# https://stackoverflow.com/questions/51191378/what-is-the-point-of-using-pm2-and-docker-together
CMD ["node", "server.mjs", "--max-http-header-size=16384"]
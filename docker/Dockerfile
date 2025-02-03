# SPDX-License-Identifier: Apache-2.0
# Licensed to the Ed-Fi Alliance under one or more agreements.
# The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
# See the LICENSE and NOTICES files in the project root for more information.

FROM node:18-alpine AS build

ENV mode=production

WORKDIR /app
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

# Install all the dependecies
RUN npm install

COPY ../. /app

RUN npm run build:prod

RUN cp -a mockdata/. dist/mockdata/

RUN cp -a public/. dist/

RUN cp config.example.json dist/config.json

RUN rm -f .npmrc
# Remove folders
RUN rm -r docker
RUN rm -r eng
RUN rm -r .github
RUN rm -r docs
RUN rm -r e2e

EXPOSE 8598

# Use node directly
# https://stackoverflow.com/questions/51191378/what-is-the-point-of-using-pm2-and-docker-together
CMD ["node", "server.mjs", "--max-http-header-size=16384"]
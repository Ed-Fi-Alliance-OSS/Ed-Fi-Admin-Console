# SPDX-License-Identifier: Apache-2.0
# Licensed to the Ed-Fi Alliance under one or more agreements.
# The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
# See the LICENSE and NOTICES files in the project root for more information.

FROM node:20.9.0-alpine@sha256:2cd2a6f4cb37cf8a007d5f1e9aef090ade6b62974c7a274098c390599e8c72b4 AS build
RUN apk --upgrade --no-cache add dos2unix=~7 bash=~5 gettext=~0 icu=~74 curl
ENV mode=production

WORKDIR /app
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

# Install just production dependencies
RUN npm ci --only=production 

COPY ../. /app

RUN npm run build:prod

COPY mockdata/* /dist/mockdata/ 
COPY public/* /dist/ 
COPY config.example.json /dist/config.json

# Remove unnecessary files and folders
RUN rm -rf .github .npmrc docker eng docs e2e

EXPOSE 8598

# Use node directly
# https://stackoverflow.com/questions/51191378/what-is-the-point-of-using-pm2-and-docker-together
CMD ["node", "server.mjs", "--max-http-header-size=16384"]
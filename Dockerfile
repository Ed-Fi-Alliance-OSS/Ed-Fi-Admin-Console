# SPDX-License-Identifier: Apache-2.0
# Licensed to the Ed-Fi Alliance under one or more agreements.
# The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
# See the LICENSE and NOTICES files in the project root for more information.

# Node 20.x
FROM node:22.16.0-alpine@sha256:9f3ae04faa4d2188825803bf890792f33cc39033c9241fc6bb201149470436ca AS build
RUN apk --upgrade --no-cache add dos2unix=~7 bash=~5 gettext=~0 icu=~74 curl=~8 go=~1.23.9-r0
ENV mode=production

WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

# Install dependencies
RUN npm ci

COPY . /app

RUN npm run build:prod

COPY config.example.ports.json /app/dist/config.json

# Remove unnecessary files and folders
RUN rm -rf .github .npmrc docker eng docs e2e src

EXPOSE 8598

# This server is using Vite to serve ths dist folder.
CMD ["npm", "run", "preview", "--host"]
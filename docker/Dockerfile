# SPDX-License-Identifier: Apache-2.0
# Licensed to the Ed-Fi Alliance under one or more agreements.
# The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
# See the LICENSE and NOTICES files in the project root for more information.

FROM node:18-alpine AS build
# ENV EG_app__basePath=/

WORKDIR /app
COPY ../. /app

# Install all the dependecies
RUN npm install
RUN npm run build

RUN rm -f .npmrc

EXPOSE 8598

# Use node directly
# https://stackoverflow.com/questions/51191378/what-is-the-point-of-using-pm2-and-docker-together
CMD ["node", "server.mjs", "--max-http-header-size=16384"]
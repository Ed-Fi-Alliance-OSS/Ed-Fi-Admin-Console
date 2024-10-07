FROM node:18-alpine AS build

ARG VERSION=latest
ENV EG_app__basePath=/adminconsole

WORKDIR /app
COPY . /app

# Download and unzip the latest package from SDK
RUN wget -nv -O /app/AdminConsole.zip "https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/Npm/@edfi%2Fadmin-console-shared-sdk/versions/${VERSION}/content" && \
    unzip /app/AdminConsole.zip AdminConsole/* -d /app/ && \
    cp -r /app/AdminConsole/. /package-sdk/ && \
    rm -f /app/AdminConsole.zip && \
    rm -r /app/AdminConsole
# Install all the dependecies    
RUN npm i -g pnpm
RUN cd package-sdk && npm install
RUN pnpm link /app/package-sdk
RUN pnpm install
RUN pnpm run build

EXPOSE 8598

# Use node directly
# https://stackoverflow.com/questions/51191378/what-is-the-point-of-using-pm2-and-docker-together
CMD ["node", "server.mjs", "--max-http-header-size=16384"]
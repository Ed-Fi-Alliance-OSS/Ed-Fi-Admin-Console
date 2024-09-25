# TE - Tech Console
[TE - TEXAS EXCHANGE](https://github.com/EdWire/TEE-UI-Prototype/blob/main/exchange.svg?raw=true)

This is the startup app that works as the base project template. Created
from the Vite react-ts template. 

### Frameworks and Libraries
The frameworks and libraries used are the following: 
- React 
- Typescript
- Vite (react-ts template)
- Chakra UI

## Installation
te-startup requires [Node.js](https://nodejs.org/) v16+ to run. (v18.12.1 used for development).

- You have to have an IdP running, use keykcloak using the following command:
  ```docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:25.0.6 start-dev```
  And follow the steps to create a realm, client and user: https://www.keycloak.org/getting-started/getting-started-docker
  Realm: myrealm
  Client: ac
  Valid redirect uri: http://localhost:8598/callback
  Web origin: http://localhost:8598/
- Clone both project (Admin Console and SDK) in the same folder. Example: C:/dev/ed-fi/Admin-Console
- Install the pnpm globally
  ```npm i -g pnpm```
- Move to the SDK folder and install dependencies in the EDX SDK using the command
  ```pnpm install```
- Build the SDK using the command
  ```pnpm run build``` 
  (any change in the SDK has to be built using this command)
- Move to the Admin Console folder and link the SDK using the following command:
  ```pnpm link ../EdX-Admin-Console-Shared-SDK```
  Check the package.json of the Admin Console to validate the linked library. The linked library should be look like this: "@edwire/edx-portal-shared": "link:C:/dev/ed-fi/Admin-Console/EdX-Admin-Console-Shared-SDK" (Depends on your folder path)
- Install the Admin Console dependencies using the command
  ```pnpm install```
- Verify you have the config.json file. You can use the config.example.json as example.
- Run the Admin Console using
  ```pnpm run dev```
  

## Folder Structure
- te-startup project
    - plugins (contains all the plugins used with the vite configuration file)
    - public (contains public files)
    - src
        - assets
        - components
            - common
            - layout
            - pages
            - routes
        - core (business rules or models)
        - shared (components and themes from te-themes package)
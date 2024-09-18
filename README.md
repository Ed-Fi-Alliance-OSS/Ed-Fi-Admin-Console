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
First, clone the repository from: https://github.com/EdWire/TEE-UI-Prototype

- Clone both project (Admin Console and SDK) in the same folder
- Install the pnpm ```npm i -g pnpm```
- Install dependencies in the EDX SDK using the command ```pnpm install```
- Move to the AC folder and link the sdk
  ```pnpm link ../EdX-Admin-Console-Shared-SDK```
  check package.json Example: "@edwire/edx-portal-shared": "link:C:/dev/ed-fi/Admin-Console/EdX-Admin-Console-Shared-SDK"
- Install the dependencies ```pnpm install```
- Run the app using ```pnpm run dev```
  
Then, run the app for development: 

```sh
npm run dev
```

or build: 
```sh
npm run build
```

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
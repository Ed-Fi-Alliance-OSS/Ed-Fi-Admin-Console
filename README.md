# Ed-Fi Admin Console
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Admin-Console/badge)](https://securityscorecards.dev/viewer/?uri=github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Admin-Console)

This is the startup app that works as the base project template. Created
from the Vite react-ts template. 

## 🚨 Alpha Notice: Use at Your Own Risk

This project is currently in **alpha** and under active development. Features and APIs are subject to change, and there may be bugs or incomplete functionality. 

We welcome contributions and feedback, but please use this project at your own risk in environments. For more stable alternatives, consider waiting for a **beta** or **stable** release, scheduled in 1Q 2025.

### Frameworks and Libraries
The frameworks and libraries used are the following: 
- React 
- Typescript
- Vite (react-ts template)
- Chakra UI

## Installation
### Requirements
- Clone both project (Admin Console and SDK) in the same folder. Example: C:/dev/ed-fi/Admin-Console
- [Node.js](https://nodejs.org/) v16+ to run. (v18.12.1 used for development).
- IdP (Keycloak, Azure B2C, Amazon Cognito, etc) <br>
  Use Keycloak in docker using the following command:
  ```docker run -p 28080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:25.0.6 start-dev``` <br> And follow the steps to create a realm, client and user: https://www.keycloak.org/getting-started/getting-started-docker
  - Realm: myrealm
  - Client: ac
  - Root url: http://localhost:8598/
  - Valid redirect uri: http://localhost:8598/callback
  - Web origin: http://localhost:8598/
- ODS/API 

### Steps

- Move to the SDK folder and install dependencies in the EDX SDK using the following command: <br>
  ```npm install```
- Build the SDK using the command <br>
  ```npm run build``` 
  (any change in the SDK has to be built it again using this command)
- Install the Admin Console dependencies using the command <br>
  ```npm install```
- Verify you have the config.json file. You can use the config.example.json as example.
- Run the Admin Console using <br>
  ```npm run dev```
  

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

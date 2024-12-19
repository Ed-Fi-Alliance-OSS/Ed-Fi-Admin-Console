# Ed-Fi Admin Console

The Ed-Fi Admin Console presents a graphical user interface (GUI) environment for managing deployments of the Ed-Fi ODS/API in multi-tenant environments.

The original source code was generously donated by the [Texas Education Service Center Region 4](https://www.esc4.net/).

## 🚨 Alpha Notice: Use at Your Own Risk

This project is currently in **alpha** and under active development. Features and APIs are subject to change, and there may be bugs or incomplete functionality.

We welcome contributions and feedback, but please use this project at your own risk in environments. For more stable alternatives, consider waiting for a **beta** or **stable** release, scheduled in 1Q 2025.

## Installation

### Requirements

* Clone both project, Admin Console (this repo) and the [SDK](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Admin-Console-Shared-SDK) in the same folder. Example: C:/dev/ed-fi/Admin-Console
* [Node.js](https://nodejs.org/) v16+ to run. (v18.12.1 used for development).
* IdP (Keycloak, Azure B2C, Amazon Cognito, etc)
  * Currently fully supporting Keycloak.
  * Use Keycloak in docker using the following command:

    ```bash
    docker run -p 28080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:25.0.6 start-dev
    ```

    And follow the steps to create a realm, client and user: [Keycloak: Getting Started with Docker](https://www.keycloak.org/getting-started/getting-started-docker)

  * Realm: myrealm
  * Client: ac
  * Root url: [http://localhost:8598](http://localhost:8598)
  * Valid redirect uri: [http://localhost:8598/callback](http://localhost:8598/callback)
  * Web origin: [http://localhost:8598/](http://localhost:8598/)
* ODS/API

### Steps

* Move to the SDK folder and install dependencies in the EDX SDK using the following command: `npm install`
* Build the SDK using the command: `npm run build`. Any change in the SDK has to be built it again using this command.
* Install the Admin Console dependencies using the command: `npm install`.
* Verify you have the config.json file. You can use the config.example.json as example.
* Run the Admin Console using: `npm run dev`.

## Developer Notes

## Frameworks and Libraries

The frameworks and libraries used are the following:

* [React](https://react.dev/)
* [Typescript](https://www.typescriptlang.org/)
* [Vite](https://vite.dev/) (react-ts template)
* [Chakra UI](https://www.chakra-ui.com/)

## Folder Structure

* `Ed-Fi-Admin-Console/`
  * `docker/` - sample setup for running the application locally.
  * `docs/` - markdown-based developer documentation
  * `public` - contains public/static assets (e.g. images)
  * `src` - core source code

## Legal Information

Copyright (c) 2025 Ed-Fi Alliance, LLC and contributors.

Licensed under the [Apache License, Version 2.0](LICENSE) (the "License").

Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.

See [NOTICES](NOTICES.md) for additional copyright and license notifications.

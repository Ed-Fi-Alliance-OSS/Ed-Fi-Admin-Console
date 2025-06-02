# Ed-Fi Admin Console

[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Admin-Console/badge)](https://securityscorecards.dev/viewer/?uri=github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Admin-Console)

The Ed-Fi Admin Console presents a graphical user interface (GUI) environment for managing deployments of the Ed-Fi ODS/API in multi-tenant environments.

The original source code was generously donated by the [Texas Education Service Center Region 4](https://www.esc4.net/).

## 🚨 Alpha Notice: Use at Your Own Risk

This project is currently in **alpha** and under active development. Features and APIs are subject to change, and there may be bugs or incomplete functionality.

We welcome contributions and feedback, but please use this project at your own risk in environments. For more stable alternatives, consider waiting for a **beta** or **stable** release, scheduled in 1Q 2025.

## Installation

> [!WARNING]
> **NOT FOR PRODUCTION USE!** Includes passwords in the default configuration that are
> visible in this repo and should never be used in real life. Be very careful!

* [Docker Compose Test and Demonstration Configurations](/eng/docker-compose/README.md)

## Developer Notes

> [!NOTE]
> You can also test local changes of Admin API, Healthcheck and/or Instance management workers
> Check the docker compose files and uncomment lines needed before running the powershell script.

* Follow the guide [Docker Compose Test and Demonstration Configurations](/eng/docker-compose/README.md) and run the script:
```pwsh
# Ignores the admin console image
./start-all-services-dev.ps1 $true
```
* Open a terminal and install the dependencies using ```npm i``` 
* Create a new file called `config.json` based on `config.example.ports.json`
* Execute the command ```npm run dev``` 

## Frameworks and Libraries

The frameworks and libraries used are the following:

* [React](https://react.dev/)
* [Typescript](https://www.typescriptlang.org/)
* [Vite](https://vite.dev/) (react-ts template)
* [Chakra UI](https://www.chakra-ui.com/)

## Folder Structure

* `Ed-Fi-Admin-Console/`
  * `eng/docker-compose` - sample setup for running the application locally.
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

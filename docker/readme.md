# Admin Console - Docker

The files and folders in this folder will help you run Admin Console on Docker containers

## What is in here?

* `./docker/Dockerfile`
<br/>Docker file to build the image for admin console.

* `./docker/Compose/.env.exmple`
<br/>Example file to use as a reference to create .env file.

* `./docker/Compose/compose-build-dev.yml`
<br/>Docker compose file to create the 3 containers needed: postgres, keycloak, adminconsole.

* `./docker/Compose/KeyCloak/Dockerfile`
<br/>Docker file to create the docker image for our KeyCloak instance.

* `./docker/Compose/KeyCloak/realm-and-users.json`
<br/>KeyCloak configuration needed so Admin Console can use it as an identity provider.

## How to run it

* On the `/docker/Compose/` folder, create an `.env` file using `.env.example` as a reference.
* Open a terminal.
* Go to `/docker/Compose/ folder`
* Execute the following command:
    `docker compose -f ./compose-build-dev.yml --env-file ./.env up -d`
* Go to `http://localhost:28080/admin/master/console/` if you want to change any sort of configuration on KeyCloak.
The credentials are: admin/admin. 
* Go to `http://localhost:8598/` to open Admin Console on the browser.

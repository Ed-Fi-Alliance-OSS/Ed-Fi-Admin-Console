# Docker Compose Test and Demonstration Configurations

> [!WARNING]
> **NOT FOR PRODUCTION USE!** Includes passwords in the default configuration that are
> visible in this repo and should never be used in real life. Be very careful!

## Starting Services with Docker Compose

This directory contains several Docker Compose files, which can be combined to
start up different configurations:

1. `compose-adminapi.yml` covers AdminAPI 2.x and AdminDB databases multi-tenant using pgbouncer
2. `compose-adminconsole-local.yml` runs the Admin console from local source code.
3. `compose-adminconsole-published.yml` runs the latest Admin Console `pre` tag as published to Docker Hub.
4. `compose-keycloak.yml` runs KeyCloak (identity provider).
5. `compose-nginx.yml` covers nginx
6. `compose-ods-multi-tenant.yml` covers ODS/API multitenant with databases using pgbouncer

Before running these, create a `.env` file. The `.env.example` is a good
starting point.

Convenience PowerShell scripts have been included in the directory, which
startup the appropriate services and inject the Kafka connectors (where
relevant).

* `start-all-services.ps1` launches `compose-adminapi.yml`, `compose-keycloak.yml`, `compose-nginx.yml`, `compose-adminconsole-local.yml`,  and
  `kafka-ods-multi-tenant.yml`, ready to check adminconsole website
* `start-all-dependecies.ps1` launches `compose-adminapi.yml`, `compose-keycloak.yml`, `compose-nginx.yml`,  and
  `kafka-ods-multi-tenant.yml`, without starting the Admin Console. Useful for running Admin Console in a
  local debugger.
* `start-keycloak.ps1` only starts KeyCloak.
* `start-ods-multi-tenant.ps1` only starts ODS/API.


```pwsh
# Start everything
./start-all-services.ps1
```

## Default URLs

* The Admin Console: [https://localhost/adminconsole](https://localhost/adminconsole)
* Admin API: [https://localhos/adminapi](https://localhost/adminapi)
* ODS/API: [https://localhos/api](https://localhost/api)
* Keycloak: [https://localhost/auth](https://localhost/auth)

## Admin Console User

By default we provide the following user
* Username: myuser
* Password: 123456

## Admin Keycloak User

* Username: admin
* Password: admin


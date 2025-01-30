# Docker Compose Test and Demonstration Configurations

> [!WARNING]
> **NOT FOR PRODUCTION USE!** Includes passwords in the default configuration that are
> visible in this repo and should never be used in real life. Be very careful!

## Starting Services with Docker Compose

This directory contains several Docker Compose files, which can be combined to
start up different configurations:

1. `compose-adminapi.yml` covers AdminAPI 2.x and AdminDB databases multi-tenant using pgbouncer. Needs nginx.
2. `compose-adminapi-ports.yml` covers AdminAPI 2.x and AdminDB databases multi-tenant using pgbouncer. It uses 8282 tcp port by default.
3. `compose-adminconsole-local.yml` runs the Admin console from local source code. Needs nginx.
4. `compose-adminconsole-local-ports.yml` runs the Admin console from local source code. It uses 8598 tcp port by default.
5. `compose-adminconsole-published.yml` runs the latest Admin Console `pre` tag as published to Docker Hub.
6. `compose-keycloak.yml` runs KeyCloak (identity provider). Needs nginx.
7. `compose-keycloak-ports.yml` runs KeyCloak (identity provider). It uses 28080 tcp port by default.
8. `compose-nginx.yml` covers nginx
9. `compose-ods-multi-tenant.yml` covers ODS/API multitenant with databases using pgbouncer
10. `compose-ods-multi-tenant-ports.yml` covers ODS/API multitenant with databases using pgbouncer. It uses 8181 tcp port by default.

Convenience PowerShell scripts have been included in the directory, which
startup the appropriate services.  

> [!IMPORTANT]
> * Admin Console user:
>   * Username: myuser
>   * Password: 123456
> * Keycloak administrator
>   * Username: admin
>   * Password: admin

### Dev (Recommended)

Before running these, create a `.env` file. The `.env.example.ports` is a good
starting point.

* `start-all-services-dev.ps1` launches `compose-adminapi-ports.yml`, `compose-keycloak-ports.yml`, `compose-adminconsole-local-ports.yml`,  and
  `compose-ods-multi-tenant-ports.yml`, ready to check adminconsole website

```pwsh
# Start everything
./start-all-services-dev.ps1
```
Wait until you see this in your terminal
![ready](<images/ready_to_use.png>)

> [!CAUTION]
> Ctrl-C will stop the containers

* The Admin Console: [http://localhost:8598](http://localhost:8598)
* Admin API: [http://localhost:8282](http://localhost:8282)
* ODS/API: [http://localhost:8181](http://localhost:8181)
* Keycloak: [http://localhost:28080](http://localhost:28080)


### Docker image (Experimental)

Before running these, create a `.env` file. The `.env.example` is a good
starting point.

> [!WARNING]
> **EXPERIMENTAL** Some services might not work

* `start-all-services.ps1` launches `compose-adminapi.yml`, `compose-keycloak.yml`, `compose-nginx.yml`, `compose-adminconsole-local.yml`,  and
  `compose-ods-multi-tenant.yml`, ready to check adminconsole website

> [!NOTE]
> **CREATE SSL** Please run the ssl/generate-certificate.sh script before

```pwsh
# Start everything
./start-all-services.ps1
```

* The Admin Console: [http://localhost/adminconsole](https://localhost/adminconsole)
* Admin API: [https://localhos/adminapi](https://localhost/adminapi)
* ODS/API: [https://localhos/api](https://localhost/api)
* Keycloak: [https://localhost/auth](https://localhost/auth)

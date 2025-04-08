# Docker Compose Test and Demonstration Configurations

> [!WARNING]
> **NOT FOR PRODUCTION USE!** Includes passwords in the default configuration that are
> visible in this repo and should never be used in real life. Be very careful!

## Starting Services with Docker Compose

This directory contains several Docker Compose files, which can be combined to
start up different configurations:

1. `compose-adminapi-dev.yml` covers AdminAPI 2.x and AdminDB databases multi-tenant using pgbouncer. It uses 8282 tcp port by default.
2. `compose-adminconsole-local-dev.yml` runs the Admin console from local source code. It uses 8598 tcp port by default.
3. `compose-adminconsole-published.yml` runs the latest Admin Console `pre` tag as published to Docker Hub.
4. `compose-keycloak-dev.yml` runs KeyCloak (identity provider). It uses 28080 tcp port by default.
5. `compose-ods-multi-tenant-dev.yml` covers ODS/API multitenant with databases using pgbouncer. It uses 8181 tcp port by default.
6. `compose-Health-Check-Worker-Process.yml` runs [Ed-Fi-Admin-Console-Health-Check-Worker-Process](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Admin-Console-Health-Check-Worker-Process).
7. `compose-Instance-Management-Worker-Process.yml` runs [Ed-Fi-Admin-Console-Instance-Management-Worker-Process](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Admin-Console-Instance-Management-Worker-Process).

Convenience PowerShell scripts have been included in the directory, which
startup the appropriate services.  

### Run containers

Before running these, create a `.env` file. The `.env.example` is a good
starting point. Also you can use `.env.otp.example` for a Keycloak with an OTP Configuration.

* `start-all-services-dev.ps1` launches `compose-adminapi-dev.yml`, `compose-keycloak-dev.yml`, `compose-adminconsole-local-dev.yml`,
  `compose-Health-Check-Worker-Process.yml`, `compose-Instance-Management-Worker-Process.yml`  and `compose-ods-multi-tenant-dev.yml`,
  ready to check adminconsole website

```pwsh
# Start everything
./start-all-services-dev.ps1
```

Append `$true` if you want to ignore deploying admin console image:
```pwsh
# Ignores the admin console image
./start-all-services-dev.ps1 $true
```

You will see the docker's log while running the script.

> [!CAUTION]
> Ctrl+C while running the script may stop the containers.

First time running the script we have to wait until see this in your terminal (also can be checked it in the container's log). 
![ready](<images/ready_to_use.png>)
This is an important process because we have to make sure keycloak has created the configurations and default users correctly in the database.

#### Links

* The Admin Console: [http://localhost:8598](http://localhost:8598)
* Admin API: [http://localhost:8282](http://localhost:8282)
* ODS/API: [http://localhost:8181](http://localhost:8181)
* Keycloak: [http://localhost:28080](http://localhost:28080)

Since `Ed-Fi-Admin-Console-Health-Check-Worker-Process` and `Ed-Fi-Admin-Console-Instance-Management-Worker-Process`
are console applications they are not exposed on any ports.

> [!IMPORTANT]
> **Default users/passwords**
> * Admin Console user
>   * _Username:_ **adminconsole-user**
>   * _Password:_ **123456**
> * Keycloak administrator
>   * _Username:_ **admin**
>   * _Password:_ **admin**

#### OTP with Keycloak

Keycloak allows enabling two-factor authentication for users. Below are the steps to include OTP in the Realm corresponding to AdminConsole. This configuration will add OTP setup as a required action for each new user. After this, the user must use both the password and OTP to log in to AdminConsole.

Steps to Configure

* Select the AdminConsole Realm that needs to be configured.
* In the Configure section, select Authentication.
* In Authentication, select the action Configure OTP. You must enable the options ‘Enabled’ and ‘Set as default action’.
![ready](<images/keycloak_otp.png>)

With this configuration, when the user logs in for the first time, after entering the password, they will receive a QR code to configure the app that manages the OTP. On subsequent logins, they must enter the value displayed in the application. You can use applications like FreeOTP, Google Authenticator, or Microsoft Authenticator to manage the token.

### Stop containers and remove images

As we mentioned above, Crtl+C may stop the containers but if you want to remove the docker images/volumes run the following script

```pwsh
# Stop
./stop-all-services-dev.ps1
```

To delete volumes, also append `-v`. Examples:
```pwsh
# Stop and remove everything
./stop-all-services-dev.ps1 -v
```

### Containers and their ports

| Contaner | Name | Port |
| -------- | ------- | ------- |
| Ods Api | ed-fi-ods-api | [8181](http://localhost:8181/) |
| Ods Api database tenant 1 | ed-fi-db-ods-tenant1 | `none` |
| Ods Api database tenant 2 | ed-fi-db-ods-tenant2 | `none` |
| Ods Api database pgbouncer tenant 1 | ed-fi-pb-ods-tenant1 | [5403](http://localhost:5403/) |
| Ods Api database pgbouncer tenant 2 | ed-fi-pb-ods-tenant2 | [5204](http://localhost:5204/) |
| Admin Api database tenant 1 | ed-fi-db-admin-tenant1 | `none` |
| Admin Api database tenant 2 | ed-fi-db-admin-tenant2 | `none` |
| Admin Api database pgbouncer tenant 1 | ed-fi-pb-admin-tenant1 | [5401](http://localhost:5401/) |
| Admin Api database pgbouncer tenant 2 | ed-fi-pb-admin-tenant2 | [5402](http://localhost:5402/) |
| Admin Api | ed-fi-adminapi | [8282](http://localhost:8282/) |
| Keycloak | ed-fi-idp-keycloak | [28080](http://localhost:28080/) |
| Keycloak database pgbouncer | ed-fi-pb-idp-keycloak | `none` |
| Keycloak database | ed-fi-db-idp-keycloak | `none` |
| Instance-Management-Worker-Process | adminconsole-local-dev-instance-management-service-1 | `none` |
| Health-Check-Worker-Process | adminconsole-local-dev-healthcheck-service-1 |  |
| Adminconsole application | ed-fi-adminconsole | [8598](http://localhost:8598/) |

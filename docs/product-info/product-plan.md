# Admin Console - Product Plan

## Overview

The Ed-Fi Admin Console is open-source technology to administrate Ed-Fi ODS/API instances in a multi-tenant/multi-instance configurations.  It allows for the management of instances, management of key/secret vendor and application information, health status and summary counts for running instances and other administrative capabilities necessary to run Ed-Fi technology stacks at-scale.  Admin Console is targeted to service needs at educational regional service centers, managed service providers and state implementations where multiple instances are necessary to run connected, secure data infrastructure.

Admin Console is a React/TypeScript application that provides a user interface on top of Admin API and ODS/API technology.  Admin Console also provides .NET Core C# microservices to drive functionality like instance health status and management.

## History

The Ed-Fi Admin Console is based from source code provided and granted by The Texas Education Exchange and as led by its Region 4 ESC, which today is running their "Tech Console" for its Ed-Fi implementation.  This provides a proven, working application, to which Ed-Fi has agreed to take on future maintenance and upkeep of the code base and to extend its value to new Ed-Fi implementations.  This is of significant value from The Texas Education Exchange and will go far to fuel new implementations with lessons learned from a large implementation.

## Features

The Ed-Fi Admin Console offers the following features:

* ODS/API Instance Management - multi-tenant management of ODS/API instances, including the listing, provisioning and deletion of ODS/API instances.
* Application and Vendor Management - allows for administrators to create key and secrets for secure access to instance data for vendors and applications.
* Health Check Information - for the instances managed by Admin Console, a service is provided to show health online status and summary row counts for main entities.

## Release Plan & Estimates

* Admin Console 1.0 - targeting December 13, 2024
* Admin Console 1.1 - targeting February 27, 2025

## Information

Below are links and additional information on Admin Console:

* Repositories
  * Ed-Fi Admin Console - https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Admin-Console
  * Ed-Fi Admin Console Shared SDK - https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Admin-Console-Shared-SDK
  * Ed-Fi Admin API -
  * Ed-Fi ODS/API - https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS

## License

The Ed-Fi Admin Console is licensed using the Apache 2.0 license.
# Admin Console - Health Check Microservice

## Overview

The Admin Console displays health and status information for each ODS/API instance that is managed.  There is a gap in the functionality for what did not transfer over from the Tech Console and original project.  The missing service checks if each ODS/API instance is online and provides summary count information for major entities like student enrollment.  This design document provides details for a Health Check Microservice that will be an executable to run on a frequent basis to populate information needed to provide instance status.

When the Health Check Microservice is complete, Admin Console will have near real-time health and instance status information populated in the instance pages of the application.

## Requirements

* The Health Check Microservice must run in the environments are community demands - Windows Server and Docker/Linux platforms.
* The Health Check Microservice will be a .NET Core C# CLI command-line executable.  This will be runnable in both Windows and Docker/Linux environments.
* The Health Check Microservice will use the `totalCount` field of the ODS/API platform to gather it's summary counts.
* The Health Check Microservice will send collected statistics to Admin API via new Admin Console endpoints designed to host this information.

## Design

* TBD
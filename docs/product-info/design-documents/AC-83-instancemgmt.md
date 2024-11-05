# Admin Console - Instance Management Microservice

## Overview

The Admin Console allows for the management of ODS/API instances, including the
creation, duplication and deletion of underlying database instances.  There is a
gap in the functionality for what did not transfer over from the Tech Console
and original project.  The Instance Management Microservice will process the
commands for instance creation, duplication and deletion of these instances.

When the Instance Management Microservice is complete, Admin Console will have
near real-time health and instance status information populated in the instance
pages of the application.

## Requirements

* The Instance Management Microservice must run in the environments are
  community demands - Windows Server and Docker/Linux platforms.
* The Instance Management Microservice must be compatible with our demanded
  cloud platforms:  Azure and AWS, and with considerations for GCP.
* The Instance Management Microservice must be compatible with both Microsoft
  SQL Server and Postgres database types.
* The Instance Management Microservice will be a .NET Core C# CLI command-line
  executable.  This will be runnable in both Windows and Docker/Linux
  environments.

## Design

* TBD

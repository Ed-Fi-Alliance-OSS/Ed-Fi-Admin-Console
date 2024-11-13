# Admin Console - Health Check Microservice

## Overview

The Admin Console displays health and status information for each ODS/API instance that is managed.  The service checks if each ODS/API instance is online and provides summary count information for major entities like student, student enrollment and other common elements.  This design document provides details for a Health Check Microservice that will be an executable to run on a frequent basis to populate
information needed to provide instance status.

When the Health Check Microservice is complete, Admin Console will have near real-time health and instance status information populated in the instance pages of the application.

## Use Case Examples

* An educational service center (ESC) IT administrator would like to understand operational service of Ed-Fi instances, such as online and offline.  The administrator would also like to have basic summary count information for major elements as a measure of database populated status to understand the health of its operations.

## Requirements

* The Health Check Microservice must run in the environments are community demands - Windows Server and Docker/Linux platforms.
* The Health Check Microservice will be a .NET Core C# CLI command-line executable.  This will be runnable in both Windows and Docker/Linux environments.  It should run as an .EXE on Windows platforms and via `docker exec` in Docker configuration (calling the .EXE running .NET Core).
* The Health Check Microservice will use the `totalCount` field of the ODS/API platform to gather it's summary counts.
* The Health Check Microservice will depend upon Admin API to retrieve its instance metadata and to store collected statistics.

## Process Diagram

Below is a process diagram to show the various workflow states between the Health Check Microservice, Admin API and ODS / API instances.

![Admin Console - Health Check Process Diagram](img/Admin%20Console%20-%20Health%20Check%20Process%20Diagram.png)

